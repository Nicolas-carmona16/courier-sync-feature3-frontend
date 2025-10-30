export interface Shipment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  deliveryAddress: string
  status: "Pendiente" | "En camino" | "Entregado" | "Cancelado" | "Listo para salir"
  deliveryDate: string
  responsibleAgent: string
  observations: string
  createdAt: string
  updatedAt: string
}

export interface ShipmentHistory {
  id: string
  shipmentId: string
  timestamp: string
  responsibleUser: string
  modifiedField: string
  previousValue: string
  newValue: string
  observations: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  document: string
  status: "Activo" | "Inactivo"
  createdAt: string
  updatedAt: string
}

export interface ClientHistory {
  id: string
  clientId: string
  timestamp: string
  responsibleUser: string
  modifiedField: string
  previousValue: string
  newValue: string
  observations: string
}
