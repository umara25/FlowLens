import Database from 'better-sqlite3'
import path from 'path'

// Database file stored in project root
const dbPath = path.join(process.cwd(), 'flowlens.db')

// Create/open database
const db = new Database(dbPath)

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL')

// Create FlowLensLog table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS flowlens_logs (
    id TEXT PRIMARY KEY,
    portal_id TEXT NOT NULL,
    workflow_id TEXT NOT NULL,
    object_type TEXT DEFAULT 'deal',
    object_id TEXT NOT NULL,
    checkpoint TEXT NOT NULL CHECK (checkpoint IN ('START', 'BRANCH', 'ACTION')),
    step_name TEXT NOT NULL,
    step_id TEXT,
    conditions TEXT,
    payload TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_logs_portal_workflow_object 
  ON flowlens_logs(portal_id, workflow_id, object_id);

  CREATE INDEX IF NOT EXISTS idx_logs_created_at 
  ON flowlens_logs(created_at DESC);
`)

export interface FlowLensLog {
  id: string
  portal_id: string
  workflow_id: string
  object_type: string
  object_id: string
  checkpoint: 'START' | 'BRANCH' | 'ACTION'
  step_name: string
  step_id?: string
  conditions?: string // JSON string
  payload?: string // JSON string
  created_at: string
}

export function insertLog(log: Omit<FlowLensLog, 'created_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO flowlens_logs (id, portal_id, workflow_id, object_type, object_id, checkpoint, step_name, step_id, conditions, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  stmt.run(
    log.id,
    log.portal_id,
    log.workflow_id,
    log.object_type,
    log.object_id,
    log.checkpoint,
    log.step_name,
    log.step_id || null,
    log.conditions || null,
    log.payload || null
  )
}

export function getRecentLogs(
  portalId: string,
  workflowId: string,
  objectId: string,
  limit: number = 20
): FlowLensLog[] {
  const stmt = db.prepare(`
    SELECT * FROM flowlens_logs
    WHERE portal_id = ? AND workflow_id = ? AND object_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `)
  
  return stmt.all(portalId, workflowId, objectId, limit) as FlowLensLog[]
}

export function getAllLogsForObject(
  portalId: string,
  objectId: string,
  limit: number = 50
): FlowLensLog[] {
  const stmt = db.prepare(`
    SELECT * FROM flowlens_logs
    WHERE portal_id = ? AND object_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `)
  
  return stmt.all(portalId, objectId, limit) as FlowLensLog[]
}

export default db
