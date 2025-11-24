export type Role = "ADMIN" | "AGENTE" | "DEV" | string

export interface AuthSession {
  accessToken: string
  refreshToken?: string
  expiresAt: number // epoch seconds
  email?: string
  username?: string
  roles: Role[]
}

const STORAGE_KEY = "couriersync_auth_session"

const issuer = process.env.NEXT_PUBLIC_AUTH_ISSUER || process.env.NEXT_PUBLIC_OAUTH2_ISSUER_URI || "http://localhost:8090/realms/couriersync"
const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || process.env.NEXT_PUBLIC_OAUTH2_CLIENT_ID || "couriersync-frontend"
const clientSecret = process.env.AUTH_CLIENT_SECRET

function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1]
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decoded)
  } catch (err) {
    console.error("Failed to decode JWT", err)
    return null
  }
}

export function loadSession(): AuthSession | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch (err) {
    console.warn("Cannot parse auth session", err)
    return null
  }
}

export function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export async function loginWithPassword(username: string, password: string): Promise<AuthSession> {
  const tokenEndpoint = `${issuer.replace(/\/$/, "")}/protocol/openid-connect/token`

  const body = new URLSearchParams({
    grant_type: "password",
    client_id: clientId,
    username,
    password,
  })

  if (clientSecret) {
    body.append("client_secret", clientSecret)
  }

  const resp = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  if (!resp.ok) {
    const errorText = await resp.text()
    throw new Error(`Error de autenticación (${resp.status}): ${errorText}`)
  }

  const data = await resp.json()
  const payload = decodeJwt(data.access_token)
  const exp = payload?.exp || Math.floor(Date.now() / 1000) + 300

  const roles: Role[] = Array.from(
    new Set([
      ...(payload?.realm_access?.roles || []),
      ...(payload?.resource_access ? Object.values(payload.resource_access).flatMap((r: any) => r.roles || []) : []),
    ]),
  ).map((r: string) => r.toUpperCase())

  const session: AuthSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: exp,
    email: payload?.email || payload?.preferred_username,
    username: payload?.preferred_username,
    roles,
  }

  saveSession(session)
  return session
}

export function hasRole(session: AuthSession | null, role: Role): boolean {
  if (!session) return false
  return session.roles.map((r) => r.toUpperCase()).includes(role.toUpperCase())
}

export function isSessionExpired(session: AuthSession | null): boolean {
  if (!session) return true
  const now = Math.floor(Date.now() / 1000)
  return session.expiresAt <= now
}

// Placeholder for refresh token flow (Keycloak)
export async function refreshSession(existing: AuthSession): Promise<AuthSession | null> {
  if (!existing.refreshToken) return null
  const tokenEndpoint = `${issuer.replace(/\/$/, "")}/protocol/openid-connect/token`

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: existing.refreshToken,
  })
  if (clientSecret) body.append("client_secret", clientSecret)

  const resp = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!resp.ok) return null
  const data = await resp.json()
  const payload = decodeJwt(data.access_token)
  const exp = payload?.exp || Math.floor(Date.now() / 1000) + 300
  const roles: Role[] = Array.from(
    new Set([
      ...(payload?.realm_access?.roles || []),
      ...(payload?.resource_access ? Object.values(payload.resource_access).flatMap((r: any) => r.roles || []) : []),
    ]),
  ).map((r: string) => r.toUpperCase())

  const updated: AuthSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: exp,
    email: payload?.email || payload?.preferred_username,
    username: payload?.preferred_username,
    roles,
  }

  saveSession(updated)
  return updated
}
