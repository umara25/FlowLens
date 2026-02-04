import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { insertLog } from '@/lib/db'
import { verifySignature } from '@/lib/hmac'

interface LogRequestBody {
  portalId: string
  workflowId: string
  objectType?: string
  objectId: string
  checkpoint: 'START' | 'BRANCH' | 'ACTION'
  stepName: string
  stepId?: string
  conditions?: Record<string, unknown>
  payload?: Record<string, unknown>
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    
    // Verify HMAC signature
    const signature = request.headers.get('x-flowlens-signature')
    
    // In development, allow requests without signature for testing
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev && !verifySignature(signature, rawBody)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse the body
    const body: LogRequestBody = JSON.parse(rawBody)

    // Validate required fields
    if (!body.portalId || !body.workflowId || !body.objectId || !body.checkpoint || !body.stepName) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: portalId, workflowId, objectId, checkpoint, stepName' },
        { status: 400 }
      )
    }

    // Validate checkpoint value
    if (!['START', 'BRANCH', 'ACTION'].includes(body.checkpoint)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid checkpoint value. Must be START, BRANCH, or ACTION' },
        { status: 400 }
      )
    }

    // Insert log into database
    const logId = uuidv4()
    insertLog({
      id: logId,
      portal_id: body.portalId,
      workflow_id: body.workflowId,
      object_type: body.objectType || 'deal',
      object_id: body.objectId,
      checkpoint: body.checkpoint,
      step_name: body.stepName,
      step_id: body.stepId,
      conditions: body.conditions ? JSON.stringify(body.conditions) : undefined,
      payload: body.payload ? JSON.stringify(body.payload) : undefined,
    })

    return NextResponse.json({ ok: true, id: logId })
  } catch (error) {
    console.error('Error processing log:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
