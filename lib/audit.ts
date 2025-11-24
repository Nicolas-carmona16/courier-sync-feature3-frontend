import { AuthSession } from "@/lib/auth"

export interface AuditEntry {
  at: string
  user?: string
  action: string
  details?: string
}

const AUDIT_KEY = "couriersync_audit_log"

export function recordAudit(session: AuthSession | null, action: string, details?: string) {
  if (typeof window === "undefined") return
  const raw = localStorage.getItem(AUDIT_KEY)
  const list: AuditEntry[] = raw ? JSON.parse(raw) : []
  const entry: AuditEntry = {
    at: new Date().toISOString(),
    user: session?.email || session?.username,
    action,
    details,
  }
  list.unshift(entry)
  localStorage.setItem(AUDIT_KEY, JSON.stringify(list.slice(0, 200)))
}

export function readAudit(): AuditEntry[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(AUDIT_KEY)
  return raw ? JSON.parse(raw) : []
}
