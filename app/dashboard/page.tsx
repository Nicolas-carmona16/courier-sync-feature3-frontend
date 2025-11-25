"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@apollo/client"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navbar } from "@/components/navbar"
import { SatisfactionSurvey } from "@/components/satisfaction-survey"
import { SEARCH_USUARIOS } from "@/lib/graphql/queries"
import { Usuario } from "@/lib/graphql/types"
import { useAuth } from "@/hooks/use-auth"
import { recordAudit } from "@/lib/audit"
import { SensitiveDataModal } from "@/components/sensitive-data-modal"

export default function DashboardPage() {
  const router = useRouter()
  const { session, isAdmin, isAgent, loading } = useAuth()
  const isClient = session && !isAdmin && !isAgent
  const [openSensitive, setOpenSensitive] = useState(false)

  const { data, loading: loadingUsers } = useQuery(SEARCH_USUARIOS, {
    variables: { q: "", page: 0, size: 10 },
    skip: !session,
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    if (session) {
      recordAudit(session, "VIEW_DASHBOARD", `Roles: ${session.roles.join(",")}`)
    }
  }, [session])

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login")
    }
  }, [loading, session, router])

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="courier-layout">
          <div className="courier-two-column">
            <div>
              <CourierLogo subtitle="Acceso al panel" />
              <p className="text-gray-600">Redirigiendo al inicio de sesión...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const users: Usuario[] = data?.searchUsuarios?.content || []
  const total = data?.searchUsuarios?.pageInfo?.totalElements ?? users.length

  return (
    <>
      <Navbar />
      <div className="courier-layout pt-10">
        <div className="max-w-6xl w-full space-y-6">
          <div className="flex items-center justify-between">
            <CourierLogo subtitle={isAdmin ? "Panel de administración" : isAgent ? "Panel de agente" : "Panel de cliente"} />
            <div className="text-right">
              <p className="text-sm text-gray-600">Sesión: {session.email}</p>
              <p className="text-sm text-gray-500">Roles: {session.roles.join(", ")} </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => router.push("/orders")} className="bg-courier-navy text-white">
              Ver pedidos
            </Button>
            <Button variant="outline" onClick={() => router.push("/profile")}>
              Ver perfil
            </Button>
            <Button variant="ghost" onClick={() => router.push("/")}>
              Ir al inicio
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios totales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-courier-navy">1k</p>
                <p className="text-gray-500 text-sm">activos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Satisfacción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-bold text-courier-green">4.8/5</p>
                <p className="text-gray-500 text-sm">Promedio demo (últimos pedidos).</p>
                <p className="text-xs text-gray-400">Cumple WCAG: alto contraste y foco visible.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accesos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-courier-green">Auditado</p>
                <p className="text-gray-500 text-sm">Acciones registradas con usuario y hora.</p>
              </CardContent>
            </Card>
          </div>

          {isClient && (
            <Card>
              <CardHeader>
                <CardTitle>Pedido de prueba</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pedido #CS-001</p>
                    <p className="text-lg font-semibold text-black">Combo demo domicilio</p>
                    <p className="text-sm text-gray-600">Entregado a Cliente Demo</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">Entregado</span>
                </div>
                <SatisfactionSurvey storageKey={session.email || session.username || "cliente-demo"} />
                <div className="text-sm text-gray-500">
                  ¿Quieres más pedidos de prueba?{" "}
                  <Button variant="link" className="p-0 h-auto text-courier-navy" onClick={() => router.push("/orders")}>
                    Ir a pedidos
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isAgent && !isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Acceso de agente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  Como agente puedes ver y editar datos de clientes, pero no configuraciones administrativas.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => router.push("/orders")} className="bg-courier-navy text-white">
                    Ver pedidos asignados
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/profile")}>
                    Editar perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Datos sensibles (solo admin)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">
                  Información sensible de clientes (dirección, documento, teléfono). Disponible solo para admins.
                </p>
                <Button className="bg-courier-navy text-white" onClick={() => setOpenSensitive(true)}>
                  Ver datos sensibles
                </Button>
                <p className="text-xs text-gray-500">
                  Acceso cifrado via Bearer token. Todas las consultas quedan registradas localmente.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <SensitiveDataModal open={openSensitive} onOpenChange={setOpenSensitive} />
    </>
  )
}
