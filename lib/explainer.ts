import { FlowLensLog } from './db'

export interface ExplanationResult {
  summary: string
  likely_cause: string
  evidence: string[]
  where: {
    checkpoint: string
    stepName: string
    timestamp: string
  } | null
  fix: string[]
  debug: {
    rules_hit: string[]
    missing_data: string[]
  }
}

interface ParsedCondition {
  property: string
  op: string
  value: unknown
  result?: boolean
  actual?: unknown
}

/**
 * Rule-based explanation generator for workflow debugging
 * Analyzes checkpoint logs to determine why a workflow didn't behave as expected
 */
export function generateExplanation(
  logs: FlowLensLog[],
  dealData?: Record<string, unknown>,
  userExpectation?: string
): ExplanationResult {
  const rulesHit: string[] = []
  const missingData: string[] = []
  const evidence: string[] = []
  const fixes: string[] = []

  // Sort logs by timestamp (oldest first for analysis)
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  // Find specific checkpoint types
  const startLog = sortedLogs.find(l => l.checkpoint === 'START')
  const branchLogs = sortedLogs.filter(l => l.checkpoint === 'BRANCH')
  const actionLogs = sortedLogs.filter(l => l.checkpoint === 'ACTION')

  // RULE 1: No logs at all
  if (logs.length === 0) {
    rulesHit.push('NO_LOGS')
    return {
      summary: 'No workflow execution logs found for this deal.',
      likely_cause: 'The workflow either never ran for this deal, or instrumentation is missing. The deal may not have met the enrollment criteria.',
      evidence: [
        'No checkpoint logs exist for this deal + workflow combination',
        'Workflow may not be enrolled for this deal',
        'Custom code actions may not be set up in the workflow'
      ],
      where: null,
      fix: [
        'Verify the deal meets the workflow enrollment criteria',
        'Check that the workflow is active and published',
        'Ensure custom code actions are added at START, BRANCH, and ACTION checkpoints'
      ],
      debug: { rules_hit: rulesHit, missing_data: ['all_logs'] }
    }
  }

  // RULE 2: Has START but no BRANCH logs
  if (startLog && branchLogs.length === 0) {
    rulesHit.push('START_NO_BRANCH')
    evidence.push(`Workflow started at ${startLog.created_at}`)
    evidence.push('No branch checkpoint was reached')
    
    return {
      summary: 'Workflow started but exited before reaching any branch conditions.',
      likely_cause: 'The workflow may have an early exit condition, or the branch checkpoint instrumentation is missing.',
      evidence,
      where: {
        checkpoint: 'START',
        stepName: startLog.step_name,
        timestamp: startLog.created_at
      },
      fix: [
        'Check if there are conditions between START and the first branch that might cause early exit',
        'Verify branch checkpoint custom code is in place',
        'Review workflow execution history in HubSpot'
      ],
      debug: { rules_hit: rulesHit, missing_data: ['branch_logs'] }
    }
  }

  // RULE 3: Branch condition failed
  const failedBranch = branchLogs.find(log => {
    if (!log.conditions) return false
    try {
      const conditions = JSON.parse(log.conditions) as ParsedCondition | ParsedCondition[]
      const condArray = Array.isArray(conditions) ? conditions : [conditions]
      return condArray.some(c => c.result === false)
    } catch {
      return false
    }
  })

  if (failedBranch) {
    rulesHit.push('BRANCH_CONDITION_FAILED')
    
    let failedCondition: ParsedCondition | null = null
    try {
      const conditions = JSON.parse(failedBranch.conditions!) as ParsedCondition | ParsedCondition[]
      const condArray = Array.isArray(conditions) ? conditions : [conditions]
      failedCondition = condArray.find(c => c.result === false) || null
    } catch {
      // ignore parse errors
    }

    if (failedCondition) {
      evidence.push(`Condition failed: ${failedCondition.property} ${failedCondition.op} ${JSON.stringify(failedCondition.value)}`)
      if (failedCondition.actual !== undefined) {
        evidence.push(`Actual value was: ${JSON.stringify(failedCondition.actual)}`)
      }
      fixes.push(`Update the deal's "${failedCondition.property}" field to meet the condition`)
      fixes.push('Or modify the workflow branch condition if the current logic is incorrect')
    }

    evidence.push(`Branch "${failedBranch.step_name}" evaluated to false`)

    return {
      summary: `The workflow took an unexpected branch path because a condition was not met.`,
      likely_cause: failedCondition 
        ? `The condition "${failedCondition.property} ${failedCondition.op} ${JSON.stringify(failedCondition.value)}" evaluated to false.`
        : 'A branch condition evaluated to false, preventing the expected path.',
      evidence,
      where: {
        checkpoint: 'BRANCH',
        stepName: failedBranch.step_name,
        timestamp: failedBranch.created_at
      },
      fix: fixes.length > 0 ? fixes : [
        'Review the branch condition in your workflow',
        'Check if the deal properties meet the expected criteria'
      ],
      debug: { rules_hit: rulesHit, missing_data: missingData }
    }
  }

  // RULE 4: Action checkpoint exists but might have failed
  const lastAction = actionLogs[actionLogs.length - 1]
  if (lastAction) {
    let actionPayload: Record<string, unknown> | null = null
    try {
      if (lastAction.payload) {
        actionPayload = JSON.parse(lastAction.payload)
      }
    } catch {
      // ignore
    }

    // Check for error indicators in payload
    if (actionPayload && (actionPayload.error || actionPayload.status === 'failed')) {
      rulesHit.push('ACTION_FAILED')
      evidence.push(`Action "${lastAction.step_name}" recorded an error`)
      if (actionPayload.error) {
        evidence.push(`Error: ${JSON.stringify(actionPayload.error)}`)
      }

      return {
        summary: 'An action in the workflow failed to execute properly.',
        likely_cause: `The action "${lastAction.step_name}" encountered an error during execution.`,
        evidence,
        where: {
          checkpoint: 'ACTION',
          stepName: lastAction.step_name,
          timestamp: lastAction.created_at
        },
        fix: [
          'Check the action configuration in the workflow',
          'Verify any referenced properties or associations exist',
          'Review HubSpot workflow error logs for more details'
        ],
        debug: { rules_hit: rulesHit, missing_data: missingData }
      }
    }
  }

  // RULE 5: Has START and BRANCH but no ACTION
  if (startLog && branchLogs.length > 0 && actionLogs.length === 0) {
    rulesHit.push('NO_ACTION_REACHED')
    evidence.push(`Workflow started at ${startLog.created_at}`)
    evidence.push(`${branchLogs.length} branch checkpoint(s) recorded`)
    evidence.push('No action checkpoint was reached')

    const lastBranch = branchLogs[branchLogs.length - 1]

    return {
      summary: 'Workflow reached branch conditions but no action was executed.',
      likely_cause: 'The workflow path taken did not lead to any actions, or action checkpoint instrumentation is missing.',
      evidence,
      where: {
        checkpoint: 'BRANCH',
        stepName: lastBranch.step_name,
        timestamp: lastBranch.created_at
      },
      fix: [
        'Verify the branch path leads to an action in the workflow',
        'Add action checkpoint instrumentation if missing',
        'Check if conditional logic is preventing action execution'
      ],
      debug: { rules_hit: rulesHit, missing_data: ['action_logs'] }
    }
  }

  // RULE 6: Everything looks normal - workflow completed
  if (startLog && actionLogs.length > 0) {
    rulesHit.push('WORKFLOW_COMPLETED')
    evidence.push(`Workflow started at ${startLog.created_at}`)
    evidence.push(`${branchLogs.length} branch checkpoint(s) recorded`)
    evidence.push(`${actionLogs.length} action checkpoint(s) recorded`)
    
    const lastLog = sortedLogs[sortedLogs.length - 1]

    return {
      summary: 'The workflow appears to have completed successfully.',
      likely_cause: 'Based on the checkpoint logs, the workflow executed through START, branches, and actions without detected failures.',
      evidence,
      where: {
        checkpoint: lastLog.checkpoint,
        stepName: lastLog.step_name,
        timestamp: lastLog.created_at
      },
      fix: [
        'If the outcome was still unexpected, check the specific action results in HubSpot',
        'Review whether the correct branch path was taken',
        'Verify the action produced the expected side effects'
      ],
      debug: { rules_hit: rulesHit, missing_data: missingData }
    }
  }

  // Fallback: unclear situation
  rulesHit.push('UNCLEAR')
  return {
    summary: 'Unable to determine a clear cause from the available logs.',
    likely_cause: 'The checkpoint logs are incomplete or in an unexpected state.',
    evidence: [`Found ${logs.length} log entries but pattern doesn't match known scenarios`],
    where: logs.length > 0 ? {
      checkpoint: logs[0].checkpoint,
      stepName: logs[0].step_name,
      timestamp: logs[0].created_at
    } : null,
    fix: [
      'Ensure all three checkpoint types (START, BRANCH, ACTION) are instrumented',
      'Review the raw logs for unexpected patterns',
      'Check workflow configuration in HubSpot'
    ],
    debug: { rules_hit: rulesHit, missing_data: ['complete_instrumentation'] }
  }
}
