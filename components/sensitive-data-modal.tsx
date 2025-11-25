"use client"

"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const demoSensitiveUsers = [
  {
    nombre: "Admin Demo",
    correo: "admin@demo.com",
    telefono: "3000000000",
    direccion: "Calle 123",
    documento: "CC 123456789",
    rol: "ADMIN",
  },
  {
    nombre: "Agente Demo",
    correo: "agente@demo.com",
    telefono: "3110000000",
    direccion: "Carrera 45",
    documento: "CC 987654321",
    rol: "AGENTE",
  },
  {
    nombre: "Cliente Demo",
    correo: "cliente@demo.com",
    telefono: "3200000000",
    direccion: "Avenida 10 #45",
    documento: "CC 555555555",
    rol: "CLIENTE",
  },
  {
    nombre: "Cliente Frecuente",
    correo: "frecuente@demo.com",
    telefono: "3211112233",
    direccion: "Calle 80 #25",
    documento: "CC 444333222",
    rol: "CLIENTE",
  },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SensitiveDataModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return demoSensitiveUsers.filter(
      (u) =>
        u.nombre.toLowerCase().includes(q) ||
        u.correo.toLowerCase().includes(q) ||
        u.telefono.includes(q) ||
        u.rol.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Datos sensibles de clientes</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Buscar por nombre, correo, teléfono o rol"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="overflow-auto max-h-80 border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.correo}>
                    <TableCell>{u.nombre}</TableCell>
                    <TableCell>{u.correo}</TableCell>
                    <TableCell>{u.telefono}</TableCell>
                    <TableCell>{u.direccion}</TableCell>
                    <TableCell>{u.documento}</TableCell>
                    <TableCell>{u.rol}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      Sin resultados para “{query}”.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-gray-500">
            Estos datos se muestran solo en demo para admins. En producción se protegen con autorización y cifrado.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
