"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { apolloClient } from "@/lib/apollo-client"
import { SEARCH_USUARIOS } from "@/lib/graphql/queries"
import { Usuario } from "@/lib/graphql/types"
import {
  AuthSession,
  clearSession,
  hasRole,
  isSessionExpired,
  loadSession,
  loginWithPassword,
  refreshSession,
} from "@/lib/auth"

interface AuthContextValue {
  session: AuthSession | null
  user: Usuario | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
  isAgent: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUserData = async (email?: string) => {
    if (!email) return
    try {
      const { data } = await apolloClient.query({
        query: SEARCH_USUARIOS,
        variables: { q: email, page: 0, size: 5 },
        fetchPolicy: "no-cache",
      })
      const match = data?.searchUsuarios?.content?.find((u: Usuario) => u.correo?.toLowerCase() === email.toLowerCase())
      if (match) {
        localStorage.setItem("currentUser", JSON.stringify(match))
        setUser(match)
      }
    } catch (err) {
      console.error("No se pudo cargar el usuario", err)
    }
  }

  useEffect(() => {
    const existing = loadSession()
    if (!existing) {
      setLoading(false)
      return
    }

    async function hydrate() {
      let active = existing
      if (isSessionExpired(existing)) {
        const refreshed = await refreshSession(existing)
        if (!refreshed) {
          clearSession()
          setLoading(false)
          return
        }
        active = refreshed
      }
      setSession(active)
      await loadUserData(active.email)
      setLoading(false)
    }

    hydrate()
  }, [])

  const login = async (username: string, password: string) => {
    const newSession = await loginWithPassword(username, password)
    setSession(newSession)
    await loadUserData(newSession.email)
  }

  const logout = () => {
    clearSession()
    localStorage.removeItem("currentUser")
    setSession(null)
    setUser(null)
  }

  const isAdmin = useMemo(() => hasRole(session, "ADMIN"), [session])
  const isAgent = useMemo(() => hasRole(session, "AGENTE") || hasRole(session, "AGENT"), [session])

  const value: AuthContextValue = {
    session,
    user,
    loading,
    login,
    logout,
    isAdmin,
    isAgent,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthContext debe usarse dentro de AuthProvider")
  return ctx
}
