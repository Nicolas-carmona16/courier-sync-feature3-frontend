"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"

export default function EditPasswordPage() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic here
    console.log("Password change attempt:", passwords)
  }

  // Mock user data
  const userData = {
    fullName: "Nombre Apellido",
    email: "correo@email.com",
    phone: "+57 302 545 4545",
    address: "Carrera 23 # 43 - 23 Medellín Antioquia",
  }

  return (
    <div className="courier-layout">
      <div className="courier-two-column">
        {/* Left Column */}
        <div>
          <BackLink href="/profile">Volver al perfil</BackLink>

          <CourierLogo subtitle="Editar perfil" />

          <div className="mb-10">
            <div className="flex items-center gap-3 text-2xl font-semibold mb-3">👤 Editar Perfil</div>
            <p className="text-gray-600 mb-8">Actualiza tu información personal</p>

            <div className="courier-profile-info mb-10">
              <div>
                <div className="courier-info-item">
                  <div className="courier-info-label">Nombre Completo:</div>
                  <div className="courier-info-value">{userData.fullName}</div>
                </div>

                <div className="courier-info-item">
                  <div className="courier-info-label">Número de Teléfono:</div>
                  <div className="courier-info-value">{userData.phone}</div>
                </div>
              </div>

              <div>
                <div className="courier-info-item">
                  <div className="courier-info-label">Correo Electrónico:</div>
                  <div className="courier-info-value">{userData.email}</div>
                </div>

                <div className="courier-info-item">
                  <div className="courier-info-label">Dirección:</div>
                  <div className="courier-info-value">{userData.address}</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 text-xl font-semibold mb-5">🔒 Cambiar contraseña</div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-black font-semibold">
                    Contraseña actual
                  </Label>
                  <PasswordInput
                    id="currentPassword"
                    placeholder="Ingresa tu contraseña actual"
                    value={passwords.current}
                    onChange={(value) => handlePasswordChange("current", value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-black font-semibold">
                      Nueva contraseña
                    </Label>
                    <PasswordInput
                      id="newPassword"
                      placeholder="Crea una contraseña segura"
                      value={passwords.new}
                      onChange={(value) => handlePasswordChange("new", value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-black font-semibold">
                      Confirmar nueva contraseña
                    </Label>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Confirma la nueva contraseña"
                      value={passwords.confirm}
                      onChange={(value) => handlePasswordChange("confirm", value)}
                    />
                  </div>
                </div>
              </form>

              <div className="courier-alert-info mt-6">ℹ️ No se han detectado cambios en tu información.</div>

              <div className="flex gap-5 mt-8">
                <Button className="bg-gray-500 hover:bg-gray-600 text-white">Guardar cambios</Button>
                <Button variant="outline" asChild>
                  <Link href="/profile/edit">Cancelar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="courier-sidebar">
          <h3 className="text-xl font-semibold text-black mb-3">Consejos para editar</h3>
          <ul className="courier-benefits-list">
            <li>Asegúrate de que tu correo electrónico sea válido</li>
            <li>Incluye el código de país en tu teléfono</li>
            <li>Proporciona una dirección completa</li>
            <li>Usa una contraseña segura y única</li>
            <li>Verifica toda la información antes de guardar</li>
          </ul>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-black mb-3">Seguridad</h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              Todos los cambios son registrados por seguridad. Tu información está protegida y encriptada.
            </p>

            <ul className="courier-benefits-list">
              <li>Las contraseñas se almacenan de forma segura</li>
              <li>Cambios de contraseña requieren verificación</li>
              <li>Acceso monitoreado para mayor seguridad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
