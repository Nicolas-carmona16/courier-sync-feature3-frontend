"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Pencil, Calendar, X } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const mockClients = [
  {
    id: "1",
    name: "Ramiro Ramirez",
    email: "ejemplo@x.com",
    phone: "+573196564308",
    address: "KR 78A #27-60",
    status: "Completado",
    lastChange: "12/10 01:09",
  },
]

const agents = ["admin.juarez", "agente.carlos", "admin.lopez", "agente.mendez"]
const statuses = ["Pendiente", "En camino", "Completado", "Cancelado", "Inactivo", "Listo para salir"]

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const clearFilters = () => {
    setSearchTerm("")
    setNameFilter("")
    setEmailFilter("")
    setStatusFilter("")
    setAgentFilter("")
    setDateFrom("")
    setDateTo("")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-courier-navy mb-4">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="text-3xl font-bold text-courier-navy">Clientes</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <div className="relative">
                <Input
                  placeholder="Ingrese una búsqueda"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
                {nameFilter && (
                  <button onClick={() => setNameFilter("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
              <div className="relative">
                <Input
                  placeholder="Ingrese una búsqueda"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                />
                {emailFilter && (
                  <button onClick={() => setEmailFilter("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Envío</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un estado..." />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por fecha</label>
              <div className="flex gap-2">
                <Input type="date" placeholder="Desde" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <Input type="date" placeholder="Hasta" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario Responsable</label>
              <Select value={agentFilter} onValueChange={setAgentFilter}>
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
          </div>

          <div className="flex gap-4">
            <Button className="bg-gray-500 hover:bg-gray-600 text-white">Buscar</Button>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-courier-navy text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Correo electrónico</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Dirección</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Último cambio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{client.name}</td>
                    <td className="px-6 py-4 text-sm">{client.email}</td>
                    <td className="px-6 py-4 text-sm">{client.phone}</td>
                    <td className="px-6 py-4 text-sm">{client.address}</td>
                    <td className="px-6 py-4 text-sm">{client.status}</td>
                    <td className="px-6 py-4 text-sm">{client.lastChange}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link href={`/clientes/${client.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/clientes/${client.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/clientes/${client.id}/historial`}>
                          <Button variant="ghost" size="sm">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Button className="bg-gray-500 hover:bg-gray-600 text-white">Añadir Cliente</Button>
          <div className="flex gap-4">
            <Link href="/clientes/historial-cambios">
              <Button variant="outline">Historial de Cambios</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Cerrar</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
