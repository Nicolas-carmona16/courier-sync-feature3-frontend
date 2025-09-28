import Link from "next/link"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your auth system
  const userData = {
    fullName: "Nombre Apellido",
    email: "correo@email.com",
    phone: "+57 302 545 4545",
    address: "Carrera 23 # 43 - 23 Medellín Antioquia",
    registrationDate: "12/09/2025",
  }

  return (
    <div className="courier-layout">
      <div className="courier-two-column">
        {/* Left Column */}
        <div>
          <BackLink href="/">Volver al inicio</BackLink>

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
                <div className="courier-info-value">{userData.fullName}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">✉️ Correo Electrónico:</div>
                <div className="courier-info-value">{userData.email}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">🔒 Contraseña:</div>
                <div className="courier-info-value">••••••••••••••</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📞 Número de Teléfono:</div>
                <div className="courier-info-value">{userData.phone}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📍 Dirección:</div>
                <div className="courier-info-value">{userData.address}</div>
              </div>

              <div className="courier-info-item">
                <div className="courier-info-label">📅 Fecha de registro</div>
                <div className="courier-info-value">{userData.registrationDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="courier-sidebar">
          <h3 className="text-xl font-semibold text-black mb-3">Datos Personales</h3>
          <p className="text-gray-600 leading-relaxed mb-10">
            Tu información personal está protegida y solo se utiliza para mejorar tu experiencia en CourierSync. Puedes
            editar estos datos en cualquier momento.
          </p>

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
