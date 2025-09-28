"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"
import { validateForm, type ValidationErrors } from "@/components/form-validation"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validationRules = {
    fullName: {
      required: true,
      minLength: 2,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 8,
      custom: (value: string) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Debe incluir mayúsculas, minúsculas y números"
        }
        return null
      },
    },
    confirmPassword: {
      required: true,
      custom: (value: string) => {
        if (value !== formData.password) {
          return "Las contraseñas no coinciden"
        }
        return null
      },
    },
    phone: {
      required: true,
      pattern: /^\+?[\d\s-()]+$/,
    },
    address: {
      required: true,
      minLength: 10,
    },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData, validationRules)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would create the account here
      console.log("Registration attempt:", formData)

      // Redirect to profile on success
      router.push("/profile")
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ general: "Error al crear la cuenta. Intenta nuevamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="courier-layout">
      <div className="courier-two-column">
        {/* Left Column */}
        <div>
          <BackLink href="/">Volver al inicio</BackLink>

          <CourierLogo subtitle="Registro de cuenta" />

          <h2 className="text-2xl font-semibold text-black mb-5">¿Por qué registrarse?</h2>

          <ul className="courier-benefits-list">
            <li>Gestión segura de tus datos personales</li>
            <li>Acceso a todas las funcionalidades</li>
            <li>Soporte técnico personalizado</li>
            <li>Actualizaciones automáticas</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="courier-card">
          <h3 className="text-xl font-semibold text-black mb-2">Crear una cuenta nueva</h3>
          <p className="text-gray-600 mb-8">Regístrate en CourierSync para comenzar</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg">{errors.general}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-black font-semibold">
                  Nombre completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black font-semibold">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-semibold">
                  Contraseña
                </Label>
                <PasswordInput
                  id="password"
                  placeholder="Crea una contraseña segura"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <small className="text-gray-500 text-sm">
                  La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números
                </small>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-black font-semibold">
                  Confirmar contraseña
                </Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(value) => handleInputChange("confirmPassword", value)}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black font-semibold">
                  Número de teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-black font-semibold">
                  Dirección
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Incluye ciudad y departamento"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-courier-green hover:bg-green-600 text-white py-4 text-lg disabled:opacity-50"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Al registrarte, aceptas nuestros{" "}
              <Link href="#" className="text-courier-navy hover:underline">
                Términos y Condiciones
              </Link>{" "}
              y nuestra{" "}
              <Link href="#" className="text-courier-navy hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
