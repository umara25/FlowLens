import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation - FlowLens",
  description: "Learn how to set up and use FlowLens to debug your HubSpot workflows.",
}

const sections = [
  { id: "overview", title: "Overview" },
  { id: "quickstart", title: "Quick Start" },
  { id: "installation", title: "Installation" },
  { id: "configuration", title: "Configuration" },
  { id: "instrumentation", title: "Workflow Instrumentation" },
  { id: "api-reference", title: "API Reference" },
  { id: "explanation-logic", title: "Explanation Logic" },
  { id: "troubleshooting", title: "Troubleshooting" },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6 max-w-7xl mx-auto">
          <Link href="/" className="text-white font-medium text-sm hover:text-primary transition-colors">
            ← Back to FlowLens
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/features" className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono">
              Features
            </Link>
            <Link href="https://github.com/umara25/FlowLens" target="_blank" className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono">
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border">
          <nav className="sticky top-14 p-6 space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Documentation</p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block py-2 px-3 text-sm text-muted-foreground hover:text-white hover:bg-surface rounded transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-12 lg:px-12 max-w-4xl">
          {/* Overview */}
          <section id="overview" className="mb-16">
            <h1 className="text-4xl font-medium text-white mb-4">FlowLens Documentation</h1>
            <p className="text-lg text-muted-foreground mb-6">
              FlowLens is an AI-powered workflow debugger for HubSpot. It helps you understand why your workflows 
              didn&apos;t behave as expected by capturing checkpoint data and providing intelligent explanations.
            </p>
            <div className="bg-surface border border-border p-6 rounded-lg">
              <h3 className="text-sm font-mono uppercase tracking-wide text-primary mb-2">How it works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Add custom code actions to your HubSpot workflow at key checkpoints</li>
                <li>These actions send execution data to the FlowLens API</li>
                <li>When something goes wrong, query the explain endpoint</li>
                <li>Get a plain-English explanation with evidence and fix suggestions</li>
              </ol>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quickstart" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Quick Start</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-white mb-2">1. Deploy FlowLens</h3>
                <p className="text-muted-foreground mb-3">Clone and deploy the FlowLens backend to your hosting provider.</p>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono text-gray-300">
{`git clone https://github.com/umara25/FlowLens.git
cd FlowLens/my-app
npm install
npm run build
npm start`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">2. Configure Environment</h3>
                <p className="text-muted-foreground mb-3">Set up your environment variables.</p>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono text-gray-300">
{`FLOWLENS_HMAC_SECRET=your-secure-secret
HUBSPOT_ACCESS_TOKEN=your-hubspot-private-app-token`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">3. Instrument Your Workflow</h3>
                <p className="text-muted-foreground mb-3">Add custom code actions to your HubSpot workflow (see Instrumentation section below).</p>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">4. Debug</h3>
                <p className="text-muted-foreground mb-3">When a workflow doesn&apos;t work as expected, call the explain endpoint.</p>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono text-gray-300">
{`GET /api/explain?portalId=123&workflowId=456&dealId=789`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Installation</h2>
            
            <h3 className="text-lg text-white mb-3">Prerequisites</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
              <li>Node.js 18+ installed</li>
              <li>A HubSpot account with workflow access</li>
              <li>A HubSpot Private App with CRM deals read scope</li>
            </ul>

            <h3 className="text-lg text-white mb-3">Local Development</h3>
            <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto mb-6">
              <code className="text-sm font-mono text-gray-300">
{`# Clone the repository
git clone https://github.com/umara25/FlowLens.git
cd FlowLens/my-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# Then start the dev server
npm run dev`}
              </code>
            </pre>

            <h3 className="text-lg text-white mb-3">Production Deployment</h3>
            <p className="text-muted-foreground mb-3">
              FlowLens can be deployed to any Node.js hosting platform. We recommend Vercel for the easiest setup.
            </p>
            <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-gray-300">
{`# Deploy to Vercel
npx vercel

# Or build for other platforms
npm run build
npm start`}
              </code>
            </pre>
          </section>

          {/* Configuration */}
          <section id="configuration" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Configuration</h2>
            
            <h3 className="text-lg text-white mb-3">Environment Variables</h3>
            <div className="space-y-4">
              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-primary font-mono text-sm">FLOWLENS_HMAC_SECRET</code>
                <p className="text-muted-foreground text-sm mt-1">
                  A secret key used to validate incoming webhook requests from your HubSpot workflow custom code.
                  Generate a strong random string for production. Requests must include an <code className="text-gray-300">x-flowlens-signature</code> header
                  containing <code className="text-gray-300">HMAC_SHA256(secret, body)</code>.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-primary font-mono text-sm">HUBSPOT_ACCESS_TOKEN</code>
                <p className="text-muted-foreground text-sm mt-1">
                  Your HubSpot Private App access token. Required for fetching deal data from the HubSpot CRM API.
                  Create a Private App in HubSpot Settings → Integrations → Private Apps with the <code className="text-gray-300">crm.objects.deals.read</code> scope.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-primary font-mono text-sm">FLOWLENS_WORKFLOW_ID</code>
                <span className="text-xs text-muted-foreground ml-2">(optional)</span>
                <p className="text-muted-foreground text-sm mt-1">
                  If you only want to track a single workflow, you can hardcode the workflow ID here.
                </p>
              </div>
            </div>

            <h3 className="text-lg text-white mb-3 mt-8">Creating a HubSpot Private App</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>Go to HubSpot Settings → Integrations → Private Apps</li>
              <li>Click &quot;Create a private app&quot;</li>
              <li>Give it a name like &quot;FlowLens&quot;</li>
              <li>Under Scopes, add <code className="text-gray-300 bg-black px-1 rounded">crm.objects.deals.read</code></li>
              <li>Create the app and copy the access token</li>
              <li>Add the token to your <code className="text-gray-300 bg-black px-1 rounded">.env.local</code> file</li>
            </ol>
          </section>

          {/* Instrumentation */}
          <section id="instrumentation" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Workflow Instrumentation</h2>
            <p className="text-muted-foreground mb-6">
              To capture workflow execution data, add Custom Code actions at three key checkpoints in your HubSpot workflow.
            </p>

            <h3 className="text-lg text-white mb-3">Checkpoint Types</h3>
            <div className="grid gap-4 mb-8">
              <div className="bg-surface border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-mono rounded">START</span>
                  <span className="text-white font-medium">Workflow Entry</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Place at the very beginning of your workflow. Captures when a record enters the workflow.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-mono rounded">BRANCH</span>
                  <span className="text-white font-medium">Before/After Branches</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Place before or after if/then branches. Captures which path was taken and why.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">ACTION</span>
                  <span className="text-white font-medium">Before Key Actions</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Place before important actions like creating tasks, sending emails, or updating records.
                </p>
              </div>
            </div>

            <h3 className="text-lg text-white mb-3">Custom Code Template</h3>
            <p className="text-muted-foreground mb-3">
              Add this as a Custom Code action in your HubSpot workflow. Update the checkpoint type and step name for each placement.
            </p>
            <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto text-sm">
              <code className="font-mono text-gray-300">
{`const axios = require('axios');
const crypto = require('crypto');

exports.main = async (event, callback) => {
  const FLOWLENS_URL = 'https://your-flowlens-url.com/api/log';
  const FLOWLENS_SECRET = 'your-hmac-secret';
  
  const body = JSON.stringify({
    portalId: event.origin.portalId.toString(),
    workflowId: event.origin.workflowId.toString(),
    objectType: 'deal',
    objectId: event.object.objectId.toString(),
    checkpoint: 'START', // Change to 'BRANCH' or 'ACTION'
    stepName: 'Workflow Started', // Describe this checkpoint
    conditions: {
      // For BRANCH checkpoints, include condition details:
      // property: 'dealstage',
      // op: 'EQ',
      // value: 'contractsent',
      // result: true,
      // actual: event.inputFields['dealstage']
    },
    payload: {
      // Any additional context you want to capture
      dealstage: event.inputFields['dealstage'],
      amount: event.inputFields['amount']
    }
  });

  const signature = crypto
    .createHmac('sha256', FLOWLENS_SECRET)
    .update(body)
    .digest('hex');

  try {
    await axios.post(FLOWLENS_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-flowlens-signature': signature
      }
    });
  } catch (err) {
    console.error('FlowLens logging failed:', err.message);
  }

  callback({ outputFields: {} });
};`}
              </code>
            </pre>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">API Reference</h2>

            <div className="space-y-8">
              {/* POST /api/log */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono font-bold rounded">POST</span>
                  <code className="text-white font-mono">/api/log</code>
                </div>
                <p className="text-muted-foreground mb-4">
                  Receives checkpoint logs from HubSpot workflow custom code actions.
                </p>
                
                <h4 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-2">Headers</h4>
                <div className="bg-surface border border-border p-3 rounded-lg mb-4 font-mono text-sm">
                  <div><span className="text-primary">Content-Type:</span> <span className="text-gray-300">application/json</span></div>
                  <div><span className="text-primary">x-flowlens-signature:</span> <span className="text-gray-300">HMAC_SHA256(secret, body)</span></div>
                </div>

                <h4 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-2">Request Body</h4>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm font-mono text-gray-300">
{`{
  "portalId": "123456",        // Required: HubSpot portal ID
  "workflowId": "789",         // Required: Workflow ID
  "objectType": "deal",        // Optional: defaults to "deal"
  "objectId": "456",           // Required: Deal/record ID
  "checkpoint": "START",       // Required: START | BRANCH | ACTION
  "stepName": "Workflow Start",// Required: Human-readable name
  "stepId": "step_1",          // Optional: Workflow step ID
  "conditions": { ... },       // Optional: Branch condition details
  "payload": { ... }           // Optional: Additional context
}`}
                  </code>
                </pre>

                <h4 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-2">Response</h4>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono text-gray-300">
{`{ "ok": true, "id": "uuid-of-created-log" }`}
                  </code>
                </pre>
              </div>

              {/* GET /api/explain */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono font-bold rounded">GET</span>
                  <code className="text-white font-mono">/api/explain</code>
                </div>
                <p className="text-muted-foreground mb-4">
                  Analyzes checkpoint logs and returns an explanation of why the workflow behaved unexpectedly.
                </p>
                
                <h4 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-2">Query Parameters</h4>
                <div className="bg-surface border border-border p-3 rounded-lg mb-4 space-y-2 font-mono text-sm">
                  <div><span className="text-primary">portalId</span> <span className="text-muted-foreground">(required)</span> - HubSpot portal ID</div>
                  <div><span className="text-primary">workflowId</span> <span className="text-muted-foreground">(required)</span> - Workflow ID to analyze</div>
                  <div><span className="text-primary">dealId</span> <span className="text-muted-foreground">(required)</span> - Deal ID to analyze</div>
                  <div><span className="text-primary">expectation</span> <span className="text-muted-foreground">(optional)</span> - What you expected to happen</div>
                </div>

                <h4 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-2">Response</h4>
                <pre className="bg-black border border-border p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono text-gray-300">
{`{
  "ok": true,
  "summary": "Brief summary of what happened",
  "likely_cause": "The most probable reason for the issue",
  "evidence": [
    "Supporting fact 1",
    "Supporting fact 2"
  ],
  "where": {
    "checkpoint": "BRANCH",
    "stepName": "Check Deal Stage",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "fix": [
    "Suggested fix 1",
    "Suggested fix 2"
  ],
  "debug": {
    "rules_hit": ["BRANCH_CONDITION_FAILED"],
    "missing_data": []
  },
  "meta": {
    "logsAnalyzed": 5,
    "dealFetched": true
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Explanation Logic */}
          <section id="explanation-logic" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Explanation Logic</h2>
            <p className="text-muted-foreground mb-6">
              FlowLens uses a rule-based system to analyze checkpoint logs and determine why a workflow didn&apos;t behave as expected.
            </p>

            <h3 className="text-lg text-white mb-3">Detection Rules</h3>
            <div className="space-y-4">
              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-yellow-400 font-mono text-sm">NO_LOGS</code>
                <p className="text-muted-foreground text-sm mt-1">
                  No checkpoint logs found for this deal + workflow. The workflow either never ran, or instrumentation is missing.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-yellow-400 font-mono text-sm">START_NO_BRANCH</code>
                <p className="text-muted-foreground text-sm mt-1">
                  Workflow started but no branch checkpoint was reached. May indicate an early exit or missing instrumentation.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-yellow-400 font-mono text-sm">BRANCH_CONDITION_FAILED</code>
                <p className="text-muted-foreground text-sm mt-1">
                  A branch condition evaluated to false. The explanation includes which condition failed and the actual vs expected values.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-yellow-400 font-mono text-sm">ACTION_FAILED</code>
                <p className="text-muted-foreground text-sm mt-1">
                  An action checkpoint recorded an error in its payload. Indicates the action execution failed.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-yellow-400 font-mono text-sm">NO_ACTION_REACHED</code>
                <p className="text-muted-foreground text-sm mt-1">
                  Workflow reached branch conditions but no action was executed. The taken path may not lead to any actions.
                </p>
              </div>

              <div className="bg-surface border border-border p-4 rounded-lg">
                <code className="text-green-400 font-mono text-sm">WORKFLOW_COMPLETED</code>
                <p className="text-muted-foreground text-sm mt-1">
                  All checkpoints present and no errors detected. The workflow appears to have completed successfully.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-4 pb-2 border-b border-border">Troubleshooting</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-white mb-2">Logs aren&apos;t being captured</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Verify your FlowLens URL is accessible from HubSpot&apos;s servers</li>
                  <li>Check that the HMAC secret matches between your workflow code and environment</li>
                  <li>Look at the custom code action logs in HubSpot for errors</li>
                  <li>Ensure the workflow is active and the record meets enrollment criteria</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">401 Unauthorized errors</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>The HMAC signature doesn&apos;t match - verify your secret is correct</li>
                  <li>Make sure you&apos;re signing the exact JSON body string</li>
                  <li>In development, signature validation is skipped for easier testing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">Deal data not showing in explanations</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Set the <code className="text-gray-300 bg-black px-1 rounded">HUBSPOT_ACCESS_TOKEN</code> environment variable</li>
                  <li>Verify your Private App has the <code className="text-gray-300 bg-black px-1 rounded">crm.objects.deals.read</code> scope</li>
                  <li>Check that the deal ID exists in your portal</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white mb-2">&quot;Unclear&quot; explanations</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Ensure all three checkpoint types (START, BRANCH, ACTION) are instrumented</li>
                  <li>Include condition details in BRANCH checkpoints for better analysis</li>
                  <li>Add meaningful step names to help identify where issues occur</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-border pt-8 mt-16">
            <p className="text-muted-foreground text-sm">
              Built for the HubSpot ecosystem. View the source on{" "}
              <Link href="https://github.com/umara25/FlowLens" className="text-primary hover:underline" target="_blank">
                GitHub
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
