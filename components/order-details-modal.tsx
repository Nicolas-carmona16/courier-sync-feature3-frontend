"use client"

import { useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { SatisfactionSurvey } from "@/components/satisfaction-survey"
import { useAuth } from "@/hooks/use-auth"

export interface OrderDetails {
  id: string
  title: string
  status: string
  customer: string
  address: string
  eta: string
  items: { name: string; qty: number; price: string }[]
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: OrderDetails
}

export function OrderDetailsModal({ open, onOpenChange, order }: Props) {
  const { session } = useAuth()
  const total = useMemo(() => {
    return order.items.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")) * item.qty, 0)
  }, [order.items])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{order.title}</DialogTitle>
          <DialogDescription>Pedido #{order.id} · {order.status}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cliente: {order.customer}</p>
              <p className="text-sm text-gray-500">Dirección: {order.address}</p>
              <p className="text-sm text-gray-500">ETA: {order.eta}</p>
            </div>
            <Badge variant="outline" className="text-courier-navy border-courier-navy">
              {order.status}
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cant.</TableHead>
                <TableHead>Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right font-semibold text-courier-navy">Total: ${total.toFixed(2)}</div>

          {order.status === "Entregado" && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-black mb-2">Encuesta de satisfacción</h4>
              <SatisfactionSurvey storageKey={`order-${order.id}-${session?.email || "demo"}`} />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
