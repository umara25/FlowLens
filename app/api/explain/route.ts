import { NextRequest, NextResponse } from 'next/server'
import { getRecentLogs } from '@/lib/db'
import { generateExplanation } from '@/lib/explainer'

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

interface HubSpotDeal {
  id: string
  properties: Record<string, string | null>
}

/**
 * Fetch deal data from HubSpot CRM API
 */
async function fetchDealFromHubSpot(dealId: string): Promise<HubSpotDeal | null> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('HUBSPOT_ACCESS_TOKEN not set, skipping deal fetch')
    return null
  }

  try {
    const properties = [
      'dealname',
      'dealstage',
      'amount',
      'pipeline',
      'hs_lastmodifieddate',
      'hs_lastactivitydate',
      'hubspot_owner_id'
    ].join(',')

    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=${properties}`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      console.error('HubSpot API error:', response.status, await response.text())
      return null
    }

    return await response.json() as HubSpotDeal
  } catch (error) {
    console.error('Error fetching deal from HubSpot:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const portalId = searchParams.get('portalId')
    const workflowId = searchParams.get('workflowId')
    const dealId = searchParams.get('dealId')
    const expectation = searchParams.get('expectation') // Optional: what user expected

    // Validate required parameters
    if (!portalId || !workflowId || !dealId) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Missing required query parameters: portalId, workflowId, dealId' 
        },
        { status: 400, headers: corsHeaders }
      )
    }

    // Fetch recent logs for this deal + workflow
    const logs = getRecentLogs(portalId, workflowId, dealId, 20)

    // Optionally fetch deal data from HubSpot for additional context
    const dealData = await fetchDealFromHubSpot(dealId)

    // Generate explanation using rule-based logic
    const explanation = generateExplanation(
      logs,
      dealData?.properties as Record<string, unknown> | undefined,
      expectation || undefined
    )

    return NextResponse.json({
      ok: true,
      ...explanation,
      meta: {
        logsAnalyzed: logs.length,
        dealFetched: !!dealData,
        portalId,
        workflowId,
        dealId
      }
    }, { headers: corsHeaders })
  } catch (error) {
    console.error('Error generating explanation:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
