"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"
import { validateForm, type ValidationErrors } from "@/components/form-validation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would authenticate here
      console.log("Login attempt:", formData)

      // Redirect to profile on success
      router.push("/profile")
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ general: "Error al iniciar sesión. Intenta nuevamente." })
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

          <CourierLogo subtitle="Inicio de sesión" />

          <h2 className="text-2xl font-semibold text-black mb-5">Comenzar</h2>

          <p className="text-gray-600 leading-relaxed">
            Bienvenido, por favor inicia sesión para poder darte una experiencia personalizada en nuestro servicio de
            envíos.
          </p>
        </div>

        {/* Right Column */}
        <div className="courier-card">
          <h3 className="text-xl font-semibold text-black mb-2">Realiza el ingreso</h3>
          <p className="text-gray-600 mb-8">Inicia sesión en CourierSync para comenzar</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg">{errors.general}</div>
            )}

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
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black font-semibold">
                Contraseña
              </Label>
              <PasswordInput
                id="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-courier-navy hover:bg-blue-800 text-white py-4 text-lg disabled:opacity-50"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
