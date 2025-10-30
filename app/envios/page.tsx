"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Pencil, Calendar, X } from "lucide-react"
import Link from "next/link"

const mockShipments = [
  {
    id: "001034",
    deliveryDate: "12/10/2025 14:20",
    status: "Entregado",
    clientName: "Ramiro Ramirez",
    responsibleAgent: "agente.carlos",
    observations: "Recibido en portería",
  },
  {
    id: "001035",
    deliveryDate: "12/10/2025 15:10",
    status: "En camino",
    clientName: "Juliana Perez",
    responsibleAgent: "agente.juarez",
    observations: "Demora por clima",
  },
  {
    id: "001036",
    deliveryDate: "13/10/2025 09:45",
    status: "Cancelado",
    clientName: "Ana Torres",
    responsibleAgent: "admin.lopez",
    observations: "Cliente no disponible",
  },
]

const agents = ["agente.carlos", "agente.juarez", "admin.lopez", "agente.mendez"]
const statuses = ["Pendiente", "En camino", "Entregado", "Cancelado", "Listo para salir"]

export default function EnviosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const clearFilters = () => {
    setSearchTerm("")
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
          <h1 className="text-3xl font-bold text-courier-navy">Listado de Órdenes/Envíos</h1>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agente Responsable</label>
              <Select value={agentFilter} onValueChange={setAgentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un agente..." />
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID de Envío</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha de Envío</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cliente asociado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Agente responsable</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Observaciones (Opcional)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{shipment.id}</td>
                    <td className="px-6 py-4 text-sm">{shipment.deliveryDate}</td>
                    <td className="px-6 py-4 text-sm">{shipment.status}</td>
                    <td className="px-6 py-4 text-sm">{shipment.clientName}</td>
                    <td className="px-6 py-4 text-sm">{shipment.responsibleAgent}</td>
                    <td className="px-6 py-4 text-sm">{shipment.observations}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link href={`/envios/${shipment.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/envios/${shipment.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
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
          <Link href="/">
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
