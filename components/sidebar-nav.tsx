"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Package, Users, ShoppingCart, Truck, Receipt, Settings, LogOut, LayoutDashboard } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Paneles", icon: LayoutDashboard },
  { href: "/productos", label: "Productos", icon: Package },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/ordenes", label: "Órdenes", icon: ShoppingCart },
  { href: "/envios", label: "Envíos", icon: Truck },
  { href: "/transacciones", label: "Transacciones", icon: Receipt },
  { href: "/ajustes", label: "Ajustes", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-courier-navy rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-courier-navy">CourierSync</span>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                isActive ? "bg-courier-navy text-white" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  )
}
