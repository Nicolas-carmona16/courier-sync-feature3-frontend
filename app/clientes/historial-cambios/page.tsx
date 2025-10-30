"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Link from "next/link"

const mockHistory = [
  {
    timestamp: "12/10/2025 01:09",
    user: "admin.juarez",
    field: "Correo electrónico",
    previousValue: "juan@mail.com",
    newValue: "juan.p@gmail.com",
    observations: "Cambio por solicitud directa",
  },
  {
    timestamp: "10/10/2025 15:30",
    user: "agente.carlos",
    field: "Estado",
    previousValue: "Inactivo",
    newValue: "Activo",
    observations: "Reactivación cliente",
  },
  {
    timestamp: "05/10/2025 10:05",
    user: "admin.lopez",
    field: "Dirección",
    previousValue: "CR 45 #22-10",
    newValue: "CR 45 #22-15",
    observations: "Actualización reciente",
  },
  {
    timestamp: "02/10/2025 09:15",
    user: "admin.juarez",
    field: "Teléfono",
    previousValue: "+57 3012345678",
    newValue: "+57 3019876543",
    observations: "Corrección de número erróneo",
  },
]

const agents = ["admin.juarez", "agente.carlos", "admin.lopez", "agente.mendez"]
const fields = ["Correo electrónico", "Estado", "Dirección", "Teléfono", "Nombre"]

export default function HistorialCambiosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("")
  const [fieldFilter, setFieldFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const clearFilters = () => {
    setSearchTerm("")
    setUserFilter("")
    setFieldFilter("")
    setDateFrom("")
    setDateTo("")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link href="/clientes" className="flex items-center gap-2 text-gray-600 hover:text-courier-navy mb-4">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="text-3xl font-bold text-courier-navy">Bitácora de Cambios de Envío</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <div className="relative">
                <Input
                  placeholder="Ingrese una búsqueda"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario Responsable</label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un usuario..." />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent} value={agent}>
                      {agent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campo Modificado</label>
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el/los campos..." />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por fecha</label>
              <div className="flex gap-2">
                <Input type="date" placeholder="Desde" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <Input type="date" placeholder="Hasta" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-gray-500 hover:bg-gray-600 text-white">Buscar</Button>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-courier-navy text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha y Hora</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Usuario Responsable</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Campo Modificado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Valor Anterior</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Valor Nuevo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Observaciones (Opcional)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockHistory.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{entry.timestamp}</td>
                    <td className="px-6 py-4 text-sm">{entry.user}</td>
                    <td className="px-6 py-4 text-sm">{entry.field}</td>
                    <td className="px-6 py-4 text-sm">{entry.previousValue}</td>
                    <td className="px-6 py-4 text-sm">{entry.newValue}</td>
                    <td className="px-6 py-4 text-sm">{entry.observations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          <button className="px-3 py-1 text-courier-orange hover:underline">&lt;&lt;</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">&lt;</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">1</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">2</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">3</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">&gt;</button>
          <button className="px-3 py-1 text-courier-orange hover:underline">&gt;&gt;</button>
        </div>

        <div className="flex justify-end">
          <Link href="/clientes">
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
