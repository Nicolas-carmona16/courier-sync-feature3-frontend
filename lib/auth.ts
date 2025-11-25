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

// Demo por defecto; solo se desactiva con NEXT_PUBLIC_DEMO_MODE="false"
const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false"
const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://back-fab-2025.onrender.com/graphql"

const demoUsers: Record<string, { roles: Role[] }> = {
  "admin@demo.com": { roles: ["ADMIN"] },
  "agente@demo.com": { roles: ["AGENTE"] },
  "cliente@demo.com": { roles: ["CLIENTE"] },
}

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

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message?: string }>
}

interface AuthPayload {
  accessToken: string
  refreshToken?: string
  usuario?: {
    correo?: string
    nombreRol?: string
  }
}

async function executeAuthMutation<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const resp = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })

  const json = (await resp.json()) as GraphQLResponse<T>
  if ("errors" in json && json.errors?.length) {
    throw new Error(json.errors[0]?.message || "Error en autenticación")
  }
  if (!json.data) {
    throw new Error("Respuesta inválida del servidor de autenticación")
  }
  return json.data
}

function buildSession(payload: AuthPayload, fallbackUsername: string): AuthSession {
  const decoded = payload.accessToken ? decodeJwt(payload.accessToken) : null
  const exp = decoded?.exp || Math.floor(Date.now() / 1000) + 900
  const email = payload.usuario?.correo?.toLowerCase() || fallbackUsername.toLowerCase()
  const roles: Role[] = payload.usuario?.nombreRol ? [payload.usuario.nombreRol.toUpperCase()] : ["CLIENTE"]

  return {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    expiresAt: exp,
    email,
    username: email,
    roles,
  }
}

export async function loginWithPassword(username: string, password: string): Promise<AuthSession> {
  if (isDemo) {
    const entry = demoUsers[username.toLowerCase()]
    if (!entry) {
      throw new Error("Usuario demo no reconocido. Usa admin@demo.com o agente@demo.com")
    }
    const now = Math.floor(Date.now() / 1000)
    const session: AuthSession = {
      accessToken: "demo-token",
      refreshToken: "demo-refresh",
      expiresAt: now + 3600,
      email: username.toLowerCase(),
      username,
      roles: entry.roles,
    }
    saveSession(session)
    return session
  }

  const { login } = await executeAuthMutation<{ login: AuthPayload }>(
    `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          refreshToken
          usuario {
            correo
            nombreRol
          }
        }
      }
    `,
    { email: username, password },
  )

  const session = buildSession(login, username)

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
  if (isDemo) {
    const now = Math.floor(Date.now() / 1000)
    const refreshed = { ...existing, expiresAt: now + 3600 }
    saveSession(refreshed)
    return refreshed
  }

  if (!existing.refreshToken) return null
  try {
    const { refreshToken: refreshed } = await executeAuthMutation<{ refreshToken: AuthPayload }>(
      `
        mutation Refresh($token: String!) {
          refreshToken(refreshToken: $token) {
            accessToken
            refreshToken
            usuario {
              correo
              nombreRol
            }
          }
        }
      `,
      { token: existing.refreshToken },
    )

    const updated = buildSession(refreshed, existing.username || existing.email || "usuario")

    saveSession(updated)
    return updated
  } catch (error) {
    console.error("No se pudo refrescar la sesión", error)
    clearSession()
    return null
  }
}
