"use client"

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { AccessibilityToggle } from "@/components/accessibility-toggle"

export function Navbar() {
  const { logout, session } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-courier-navy flex items-center gap-2">
            <span aria-hidden>🚴</span> CourierSync
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-4 text-sm font-medium text-gray-700">
            <Link className="hover:text-courier-navy" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-courier-navy" href="/orders">
              Pedidos
            </Link>
            <Link className="hover:text-courier-navy" href="/profile">
              Perfil
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600 hidden md:inline">
            Sesión: {session?.email || "demo"} · Roles: {session?.roles.join(", ") || "DEMO"}
          </span>
          <AccessibilityToggle />
          <Button variant="outline" onClick={handleLogout} className="text-sm">
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
