"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@apollo/client"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SEARCH_USUARIOS } from "@/lib/graphql/queries"
import { Usuario } from "@/lib/graphql/types"
import { useAuth } from "@/hooks/use-auth"
import { recordAudit } from "@/lib/audit"

export default function DashboardPage() {
  const router = useRouter()
  const { session, isAdmin, isAgent, loading, user } = useAuth()

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
      <div className="courier-layout">
        <div className="courier-two-column">
          <div>
            <CourierLogo subtitle="Acceso al panel" />
            <p className="text-gray-600">Redirigiendo al inicio de sesión...</p>
          </div>
        </div>
      </div>
    )
  }

  const users: Usuario[] = data?.searchUsuarios?.content || []
  const total = data?.searchUsuarios?.pageInfo?.totalElements ?? users.length

  return (
    <div className="courier-layout">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <CourierLogo subtitle={isAdmin ? "Panel de administración" : "Panel de agente"} />
          <div className="text-right">
            <p className="text-sm text-gray-600">Sesión: {session.email}</p>
            <p className="text-sm text-gray-500">Roles: {session.roles.join(", ")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes totales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-courier-navy">{loadingUsers ? "..." : total}</p>
              <p className="text-gray-500 text-sm">Datos provenientes del backend seguro.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Encuestas recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-courier-orange">–</p>
              <p className="text-gray-500 text-sm">Integraremos métricas en tiempo real.</p>
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

        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Datos sensibles (solo admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Ciudad</TableHead>
                    <TableHead>Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.idUsuario}>
                      <TableCell>{u.nombre}</TableCell>
                      <TableCell>{u.correo}</TableCell>
                      <TableCell>{u.nombreCiudad}</TableCell>
                      <TableCell>{u.nombreRol}</TableCell>
                    </TableRow>
                  ))}
                  {!loadingUsers && users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-gray-500">
                        No hay clientes disponibles.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <p className="text-xs text-gray-500 mt-2">
                Acceso cifrado via Bearer token. Todas las consultas quedan registradas localmente.
              </p>
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
              <Button onClick={() => router.push("/profile")} className="bg-courier-navy text-white">
                Ir a mi perfil
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
