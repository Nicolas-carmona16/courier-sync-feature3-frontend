"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const statuses = ["Pendiente", "En camino", "Entregado", "Cancelado", "Inactivo", "Listo para salir"]

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
]

export default function EditarClientePage() {
  const params = useParams()
  const router = useRouter()
  const [name, setName] = useState("Ramiro Ramirez")
  const [email, setEmail] = useState("ejemplo@x.com")
  const [phone, setPhone] = useState("+5731X6564XXX")
  const [address, setAddress] = useState("KR 78A #27-60")
  const [status, setStatus] = useState("")
  const [observations, setObservations] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (value: string) => {
    if (value && !value.includes("@")) {
      setEmailError('El correo debe incluir "@"')
    } else {
      setEmailError("")
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    validateEmail(value)
  }

  const handleSave = () => {
    if (emailError) {
      return
    }
    // Save logic here
    console.log("[v0] Saving client changes:", { name, email, phone, address, status, observations })
    router.push("/clientes")
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
          <h1 className="text-3xl font-bold text-courier-navy">Detalle del cliente</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
              <Input
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span className="text-red-500">⊗</span> {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una opción..." />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones (Opcional)</label>
              <Input
                placeholder="Motivo(s) de los/el cambio"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-courier-navy text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Valor Anterior</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Valor Nuevo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Observaciones (Opcional)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockHistory.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
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
          <Link href="/clientes">
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
