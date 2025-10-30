"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-courier-navy mb-4">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="text-3xl font-bold text-courier-navy">Panel de Control</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total de Envíos</h3>
            <p className="text-3xl font-bold text-courier-navy">1,234</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Envíos Pendientes</h3>
            <p className="text-3xl font-bold text-courier-orange">45</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Clientes Activos</h3>
            <p className="text-3xl font-bold text-courier-green">892</p>
          </div>
        </div>
      </main>
    </div>
  )
}
