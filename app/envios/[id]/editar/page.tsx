"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from "lucide-react"
import Link from "next/link"

const statuses = ["Pendiente", "En camino", "Entregado", "Cancelado", "Listo para salir"]
const agents = ["agente.carlos", "agente.juarez", "admin.lopez", "agente.mendez"]

const mockHistory = [
  {
    timestamp: "12/10/2025 01:09",
    user: "agente.carlos",
    field: "Estado",
    previousValue: "En camino",
    newValue: "Entregado",
    observations: "Entregado a portería",
  },
  {
    timestamp: "13/10/2025 15:45",
    user: "admin.lopez",
    field: "Observaciones",
    previousValue: "-",
    newValue: "Demora por lluvia",
    observations: "Reactivación cliente",
  },
  {
    timestamp: "13/10/2025 13:35",
    user: "agente.juarez",
    field: "Agente responsable",
    previousValue: "agente.mendez",
    newValue: "agente.carlos",
    observations: "Reasignación de zona",
  },
  {
    timestamp: "12/10/2025 18:23",
    user: "admin.lopez",
    field: "Dirección",
    previousValue: "Calle 20 #15-45 Torre B",
    newValue: "Carrera 21 #16-10 Apto 9D",
    observations: "Actualización por Cliente",
  },
  {
    timestamp: "12/10/2025 14:22",
    user: "agente.carlos",
    field: "Estado",
    previousValue: "Pendiente",
    newValue: "En camino",
    observations: "Paquete despachado",
  },
]

export default function EditarEnvioPage() {
  const params = useParams()
  const router = useRouter()
  const [clientName, setClientName] = useState("Ramiro Ramirez")
  const [status, setStatus] = useState("Entregado")
  const [deliveryDate, setDeliveryDate] = useState("12/10/2025 14:20")
  const [deliveryAddress, setDeliveryAddress] = useState("KR 78A #27-60")
  const [responsibleAgent, setResponsibleAgent] = useState("agente.carlos")
  const [observations, setObservations] = useState("Entregado a portería")
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const handleSave = () => {
    console.log("[v0] Saving shipment changes:", {
      clientName,
      status,
      deliveryDate,
      deliveryAddress,
      responsibleAgent,
      observations,
    })
    router.push("/envios")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <Link href="/envios" className="flex items-center gap-2 text-gray-600 hover:text-courier-navy mb-4">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="text-3xl font-bold text-courier-navy">Detalle de Envío</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">ID de Envío: {params.id}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente asociado</label>
              <div className="bg-gray-200 px-4 py-2 rounded">{clientName}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Envío</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Envío</label>
              <div className="bg-gray-200 px-4 py-2 rounded">{deliveryDate}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de Entrega</label>
              <div className="flex items-center gap-2">
                {isEditingAddress ? (
                  <Input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    onBlur={() => setIsEditingAddress(false)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="flex-1 border border-gray-300 px-4 py-2 rounded">{deliveryAddress}</div>
                    <button onClick={() => setIsEditingAddress(true)}>
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agente Responsable</label>
              <Select value={responsibleAgent} onValueChange={setResponsibleAgent}>
                <SelectTrigger>
                  <SelectValue />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
              <div className="flex items-center gap-2">
                <Textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="flex-1"
                  rows={1}
                />
                <Pencil className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-courier-navy text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Fecha y Hora</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Usuario Responsable</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Campo Modificado</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Valor Anterior</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Valor Nuevo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Observaciones (Opcional)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockHistory.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{entry.timestamp}</td>
                      <td className="px-4 py-3 text-sm">{entry.user}</td>
                      <td className="px-4 py-3 text-sm">{entry.field}</td>
                      <td className="px-4 py-3 text-sm">{entry.previousValue}</td>
                      <td className="px-4 py-3 text-sm">{entry.newValue}</td>
                      <td className="px-4 py-3 text-sm">{entry.observations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave} className="bg-gray-500 hover:bg-gray-600 text-white">
            Guardar cambios
          </Button>
          <Link href="/envios">
            <Button variant="outline">Historial de Cambios</Button>
          </Link>
          <Link href="/envios">
            <Button variant="outline">Cerrar</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
