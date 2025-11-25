"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { SatisfactionSurvey } from "@/components/satisfaction-survey"
import { Usuario } from "@/lib/graphql/types"
import { useAuth } from "@/hooks/use-auth"

export default function ProfilePage() {
  const [userData, setUserData] = useState<Usuario | null>(null)
  const { session } = useAuth()

  useEffect(() => {
    // Get user data from localStorage (in a real app, this would come from auth context)
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  if (!userData) {
    return (
      <div className="courier-layout">
        <div className="courier-two-column">
          <div>
          <BackLink useBack>Volver</BackLink>
            <CourierLogo subtitle="Panel de usuario" />
            <div className="text-center py-10">
              <p className="text-gray-600">No hay datos de usuario disponibles.</p>
              <Link href="/register" className="text-courier-navy hover:underline">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="courier-layout">
      <div className="courier-two-column">
        {/* Left Column */}
        <div>
          <BackLink useBack>Volver</BackLink>

          <CourierLogo subtitle="Panel de usuario" />

          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3 text-2xl font-semibold">👤 Mi Perfil</div>
              <Button asChild className="bg-courier-orange hover:bg-orange-600 text-white">
                <Link href="/profile/edit">✏️ Editar perfil</Link>
              </Button>
            </div>

            <div className="space-y-5">
              <div className="courier-info-item">
                <div className="courier-info-label">👤 Nombre Completo:</div>
                <div className="courier-info-value">{userData.nombre}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">✉️ Correo Electrónico:</div>
                <div className="courier-info-value">{userData.correo}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📞 Número de Teléfono:</div>
                <div className="courier-info-value">{userData.telefono}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📍 Dirección:</div>
                <div className="courier-info-value">{userData.detalleDireccion}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">🏙️ Ciudad:</div>
                <div className="courier-info-value">{userData.nombreCiudad}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">🗺️ Departamento:</div>
                <div className="courier-info-value">{userData.nombreDepartamento}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">👥 Tipo de Usuario:</div>
                <div className="courier-info-value">{userData.nombreRol}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📅 Fecha de registro:</div>
                <div className="courier-info-value">{new Date(userData.fechaRegistro).toLocaleDateString('es-ES')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="courier-sidebar space-y-6">
          <SatisfactionSurvey storageKey={session?.email || session?.username || "perfil-demo"} />

          <div>
            <h3 className="text-xl font-semibold text-black mb-3">Datos Personales</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Tu información personal está protegida y solo se utiliza para mejorar tu experiencia en CourierSync. Puedes
              editar estos datos en cualquier momento.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-5">Estado de la cuenta</h3>

            <div className="space-y-4">
              <div className="courier-info-item">
                <div className="courier-info-label">Estado:</div>
                <StatusBadge variant="active">Activa</StatusBadge>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">Verificación:</div>
                <StatusBadge variant="completed">Completada</StatusBadge>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">Tipo:</div>
                <div className="courier-info-value">Usuario estándar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
