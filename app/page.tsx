import Link from "next/link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="courier-layout">
      <div className="courier-two-column">
        {/* Left Column */}
        <div>
          <CourierLogo />

          <h2 className="text-4xl font-bold text-black leading-tight mb-5">Bienvenido a tu plataforma de entregas</h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            CourierSync te permite gestionar tus datos personales de forma segura y eficiente. Mantén tu información
            actualizada para un servicio óptimo.
          </p>

          <div className="courier-stats">
            <div className="courier-stat-item">
              <div className="text-3xl font-bold text-courier-green mb-1">100%</div>
              <div className="text-sm text-gray-600">Seguro</div>
            </div>
            <div className="courier-stat-item">
              <div className="text-3xl font-bold text-courier-orange mb-1">24/7</div>
              <div className="text-sm text-gray-600">Disponible</div>
            </div>
            <div className="courier-stat-item">
              <div className="text-3xl font-bold text-courier-navy mb-1">+1K</div>
              <div className="text-sm text-gray-600">Usuarios</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="courier-card">
          <h3 className="text-xl font-semibold text-black mb-2">Comenzar</h3>
          <p className="text-gray-600 mb-8">Inicia sesión o regístrate</p>

          <div className="space-y-4">
            <Button asChild className="w-full bg-courier-navy hover:bg-blue-800 text-white py-4 text-lg">
              <Link href="/login">Iniciar sesión</Link>
            </Button>

            <div className="text-center text-gray-500 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative bg-white px-4">
                <span>o</span>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full border-courier-green text-courier-green hover:bg-courier-green hover:text-white py-4 text-lg bg-transparent"
            >
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
