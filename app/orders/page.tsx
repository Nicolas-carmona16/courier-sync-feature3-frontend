"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BackLink } from "@/components/back-link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SatisfactionSurvey } from "@/components/satisfaction-survey"
import { useAuth } from "@/hooks/use-auth"

const demoOrders = [
  {
    id: "CS-001",
    title: "Combo demo domicilio",
    status: "Entregado",
    customer: "Cliente Demo",
    address: "Avenida 10 #45",
    eta: "Entregado hace 5 min",
  },
  {
    id: "CS-002",
    title: "Pizza margarita",
    status: "En camino",
    customer: "Cliente Demo",
    address: "Calle 80 #25",
    eta: "ETA 12 min",
  },
  {
    id: "CS-003",
    title: "Farmacia express",
    status: "Preparando",
    customer: "Cliente Demo",
    address: "Carrera 50 #22",
    eta: "ETA 20 min",
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const { session } = useAuth()

  const delivered = useMemo(() => demoOrders.filter((o) => o.status === "Entregado"), [])

  return (
    <>
      <Navbar />
      <div className="courier-layout pt-10">
        <div className="max-w-6xl w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <BackLink useBack>Volver</BackLink>
              <h1 className="text-3xl font-bold text-black">Pedidos</h1>
              <p className="text-gray-600">Seguimiento de domicilios y encuesta de satisfacción por pedido.</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              Sesión: {session?.email || "demo"}
              <br />
              Roles: {session?.roles.join(", ") || "DEMO"}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {demoOrders.map((order) => (
              <Card key={order.id} className="border border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{order.title}</CardTitle>
                      <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-500">Entregar a {order.customer}</p>
                      <p className="text-sm text-gray-500">{order.address}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Entregado" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Estado: {order.status} · {order.eta}</p>
                  {order.status === "Entregado" ? (
                    <SatisfactionSurvey storageKey={`order-${order.id}-${session?.email || "demo"}`} />
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="bg-courier-navy text-white">
                        Ver detalles
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => router.push("/dashboard")}>
                        Volver al dashboard
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de satisfacción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold text-courier-green">Entregados: {delivered.length}</p>
              <p className="text-sm text-gray-600">
                Cada pedido entregado incluye encuesta accesible (alto contraste, foco visible, compatible con lector de pantalla).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
