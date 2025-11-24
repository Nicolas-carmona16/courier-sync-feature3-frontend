"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface AccessibilityContextValue {
  accessibleMode: boolean
  toggleAccessibleMode: () => void
  setAccessibleMode: (enabled: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined)
const STORAGE_KEY = "couriersync_accessible_mode"

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [accessibleMode, setAccessibleModeState] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (raw === "true") setAccessibleModeState(true)
  }, [])

  // Apply class to html for global styling
  useEffect(() => {
    if (typeof document === "undefined") return
    const html = document.documentElement
    if (accessibleMode) {
      html.classList.add("accessible-mode")
      localStorage.setItem(STORAGE_KEY, "true")
    } else {
      html.classList.remove("accessible-mode")
      localStorage.setItem(STORAGE_KEY, "false")
    }
  }, [accessibleMode])

  const value = useMemo(
    () => ({
      accessibleMode,
      toggleAccessibleMode: () => setAccessibleModeState((prev) => !prev),
      setAccessibleMode: (enabled: boolean) => setAccessibleModeState(enabled),
    }),
    [accessibleMode],
  )

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibilityContext() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error("useAccessibilityContext debe usarse dentro de AccessibilityProvider")
  return ctx
}
