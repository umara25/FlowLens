# FlowLens

Workflow debugging for HubSpot. Understand why workflows fail with real-time insights and actionable fixes.

## Overview

FlowLens is a debugging tool that helps HubSpot users understand why their workflows did not execute as expected. It uses lightweight instrumentation logs combined with CRM context to provide clear explanations of workflow behavior.

## Features

- **Checkpoint Logging**: Track workflow execution at critical points (start, branch, action)
- **Branch Tracing**: Understand which path a workflow took and why
- **Smart Explanations**: Get plain-English explanations of workflow failures with suggested fixes
- **Real-time Monitoring**: View workflow logs as they happen
- **HMAC Validation**: Secure webhook endpoints with signature verification

## Prerequisites

- Node.js 18+
- A HubSpot account with workflows
- A HubSpot Private App with CRM read permissions

## Installation

```bash
git clone https://github.com/umara25/FlowLens.git
cd FlowLens/my-app
npm install
```

## Configuration

Create a `.env.local` file in the project root:

```env
# Required: Secret for validating webhook signatures
FLOWLENS_HMAC_SECRET=your-secret-key-here

# Required: HubSpot Private App access token
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional: Default workflow ID
FLOWLENS_WORKFLOW_ID=123456789
```

### Generating an HMAC Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Creating a HubSpot Private App

1. Go to Settings > Integrations > Private Apps in your HubSpot account
2. Create a new private app
3. Add the following scopes:
   - `crm.objects.deals.read`
   - `crm.objects.contacts.read` (optional, for associations)
4. Copy the access token to your `.env.local` file

## Instrumenting Your Workflow

Add Custom Code actions to your HubSpot workflow at key checkpoints:

### 1. Workflow Start

```javascript
const axios = require('axios');
const crypto = require('crypto');

exports.main = async (event) => {
  const body = JSON.stringify({
    portalId: event.origin.portalId.toString(),
    workflowId: "YOUR_WORKFLOW_ID",
    objectType: "deal",
    objectId: event.object.objectId.toString(),
    checkpoint: "START",
    stepName: "Workflow Started",
    payload: { enrollmentSource: event.origin.enrollmentSource }
  });

  const signature = crypto.createHmac('sha256', 'YOUR_HMAC_SECRET')
    .update(body).digest('hex');

  await axios.post('https://your-domain.com/api/log', body, {
    headers: {
      'Content-Type': 'application/json',
      'x-flowlens-signature': signature
    }
  });

  return { outputFields: {} };
};
```

### 2. Branch Checkpoint

```javascript
const axios = require('axios');
const crypto = require('crypto');

exports.main = async (event) => {
  const body = JSON.stringify({
    portalId: event.origin.portalId.toString(),
    workflowId: "YOUR_WORKFLOW_ID",
    objectType: "deal",
    objectId: event.object.objectId.toString(),
    checkpoint: "BRANCH",
    stepName: "Check Deal Stage",
    conditions: {
      property: "dealstage",
      operator: "EQ",
      value: "closedwon",
      result: event.inputFields.dealstage === "closedwon"
    }
  });

  const signature = crypto.createHmac('sha256', 'YOUR_HMAC_SECRET')
    .update(body).digest('hex');

  await axios.post('https://your-domain.com/api/log', body, {
    headers: {
      'Content-Type': 'application/json',
      'x-flowlens-signature': signature
    }
  });

  return { outputFields: {} };
};
```

### 3. Action Checkpoint

```javascript
const axios = require('axios');
const crypto = require('crypto');

exports.main = async (event) => {
  const body = JSON.stringify({
    portalId: event.origin.portalId.toString(),
    workflowId: "YOUR_WORKFLOW_ID",
    objectType: "deal",
    objectId: event.object.objectId.toString(),
    checkpoint: "ACTION",
    stepName: "Create Task",
    payload: { taskType: "follow_up", assignee: "owner" }
  });

  const signature = crypto.createHmac('sha256', 'YOUR_HMAC_SECRET')
    .update(body).digest('hex');

  await axios.post('https://your-domain.com/api/log', body, {
    headers: {
      'Content-Type': 'application/json',
      'x-flowlens-signature': signature
    }
  });

  return { outputFields: {} };
};
```

## API Reference

### POST /api/log

Receives checkpoint logs from HubSpot workflows.

**Headers:**
- `Content-Type: application/json`
- `x-flowlens-signature: <HMAC-SHA256 signature>`

**Body:**
```json
{
  "portalId": "123456",
  "workflowId": "789",
  "objectType": "deal",
  "objectId": "456",
  "checkpoint": "START | BRANCH | ACTION",
  "stepName": "Human readable step name",
  "stepId": "optional-step-id",
  "conditions": {},
  "payload": {}
}
```

**Response:**
```json
{ "ok": true, "id": "log-uuid" }
```

### GET /api/explain

Analyzes logs and returns an explanation for workflow behavior.

**Query Parameters:**
- `portalId` (required): HubSpot portal ID
- `workflowId` (required): Workflow ID to analyze
- `dealId` (required): Deal ID to analyze
- `expectation` (optional): What the user expected to happen

**Response:**
```json
{
  "summary": "Brief explanation",
  "likely_cause": "Most probable reason",
  "evidence": ["Evidence point 1", "Evidence point 2"],
  "where": {
    "checkpoint": "BRANCH",
    "stepName": "Check Deal Stage",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "fix": ["Suggested fix 1", "Suggested fix 2"],
  "debug": {
    "rules_hit": ["BRANCH_CONDITION_FAILED"],
    "log_count": 3
  }
}
```

## Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

For webhook testing, use a tunneling service like ngrok:

```bash
ngrok http 3000
```

## Deployment

Deploy to Vercel, Railway, or any platform that supports Next.js:

```bash
npm run build
npm start
```

Ensure your environment variables are configured in your deployment platform.

## Explanation Logic

FlowLens uses rule-based analysis to determine why a workflow may not have executed as expected:

| Condition | Likely Cause |
|-----------|--------------|
| No logs found | Instrumentation missing or record never met enrollment criteria |
| Only START log | Workflow exited before reaching branch checkpoint |
| BRANCH with failed condition | Record did not meet branch criteria |
| No ACTION after BRANCH | Workflow stopped before action step |
| ACTION without expected outcome | Action may have failed or been skipped |

## Project Structure

```
HubSpot Projec/
├── my-app/                       # Next.js backend + landing page
│   ├── app/
│   │   ├── api/
│   │   │   ├── log/route.ts      # Webhook endpoint for logs
│   │   │   └── explain/route.ts  # Explanation endpoint
│   │   ├── docs/page.tsx         # Documentation page
│   │   ├── features/page.tsx     # Features page
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   ├── lib/
│   │   ├── db.ts                 # SQLite database operations
│   │   ├── hmac.ts               # HMAC signature utilities
│   │   └── explainer.ts          # Explanation logic
│   └── .env.local                # Environment variables
│
└── hubspot-extension/            # HubSpot UI Extension
    ├── hubspot.config.yml        # HubSpot CLI config
    └── src/app/
        ├── app.json              # Extension definition
        └── extensions/
            └── FlowLensCard.jsx  # Sidebar card component
```

## HubSpot UI Extension

The `hubspot-extension/` folder contains the HubSpot UI Extension that adds a FlowLens debugging card to Deal records in HubSpot.

See `hubspot-extension/README.md` for setup instructions.

## License

MIT

## Author

Built by Umar Ahmer
