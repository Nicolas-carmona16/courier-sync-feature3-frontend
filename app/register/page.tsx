"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { graphqlRequest } from "@/lib/api-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"
import { validateForm, type ValidationErrors } from "@/components/form-validation"
import { useCreateUsuario } from "@/hooks/use-usuario"
import {
  GET_DEPARTAMENTOS,
  GET_CIUDADES_BY_DEPARTAMENTO,
  GET_ROLES,
  CREATE_DEPARTAMENTO,
  CREATE_CIUDAD,
  CREATE_ROL,
} from "@/lib/graphql/queries"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    departamentoNombre: "",
    ciudadNombre: "",
    rolNombre: "",
  })

  const [createUsuario, { loading: createLoading }] = useCreateUsuario()

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  // Normaliza strings para comparación (quita acentos, trim, minúsculas)
  const normalize = (s: string) =>
    (s ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()

  async function ensureDepartamentoIdSafe(nombre: string): Promise<string> {
    const n = normalize(nombre)
    const list = await graphqlRequest(GET_DEPARTAMENTOS, { page: 0, size: 1000 })
    const found = list?.departamentos?.content?.find((d: any) => normalize(String(d.nombreDepartamento)) === n)
    if (found) return String(found.idDepartamento)
    try {
      const created = await graphqlRequest(CREATE_DEPARTAMENTO, { input: { nombreDepartamento: nombre } })
      return String(created.createDepartamento.idDepartamento)
    } catch (err: any) {
      const msg = err?.message?.toLowerCase?.() || ""
      if (msg.includes("existe") || msg.includes("conflict")) {
        const again = await graphqlRequest(GET_DEPARTAMENTOS, { page: 0, size: 1000 })
        const f2 = again?.departamentos?.content?.find((d: any) => normalize(String(d.nombreDepartamento)) === n)
        if (f2) return String(f2.idDepartamento)
      }
      throw err
    }
  }

  async function ensureRolIdSafe(nombre: string): Promise<string> {
    const n = normalize(nombre)
    const list = await graphqlRequest(GET_ROLES, { page: 0, size: 1000 })
    const found = list?.roles?.content?.find((r: any) => normalize(String(r.nombreRol)) === n)
    if (found) return String(found.idRol)
    try {
      const created = await graphqlRequest(CREATE_ROL, { input: { nombreRol: nombre } })
      return String(created.createRol.idRol)
    } catch (err: any) {
      const msg = err?.message?.toLowerCase?.() || ""
      if (msg.includes("existe") || msg.includes("conflict")) {
        const again = await graphqlRequest(GET_ROLES, { page: 0, size: 1000 })
        const f2 = again?.roles?.content?.find((r: any) => normalize(String(r.nombreRol)) === n)
        if (f2) return String(f2.idRol)
      }
      throw err
    }
  }

  async function ensureCiudadIdSafe(nombre: string, idDepartamento: string): Promise<string> {
    const n = normalize(nombre)
    const list = await graphqlRequest(GET_CIUDADES_BY_DEPARTAMENTO, { idDepartamento, page: 0, size: 1000 })
    const found = list?.ciudadesByDepartamento?.content?.find((c: any) => normalize(String(c.nombreCiudad)) === n)
    if (found) return String(found.idCiudad)
    try {
      const created = await graphqlRequest(CREATE_CIUDAD, { input: { nombreCiudad: nombre, idDepartamento } })
      return String(created.createCiudad.idCiudad)
    } catch (err: any) {
      const msg = err?.message?.toLowerCase?.() || ""
      if (msg.includes("existe") || msg.includes("conflict")) {
        const again = await graphqlRequest(GET_CIUDADES_BY_DEPARTAMENTO, { idDepartamento, page: 0, size: 1000 })
        const f2 = again?.ciudadesByDepartamento?.content?.find((c: any) => normalize(String(c.nombreCiudad)) === n)
        if (f2) return String(f2.idCiudad)
      }
      throw err
    }
  }

  // Reset ciudad cuando cambia el departamento (por nombre)
  useEffect(() => {
    if (formData.departamentoNombre) {
      setFormData((prev) => ({ ...prev, ciudadNombre: "" }))
    }
  }, [formData.departamentoNombre])

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
      pattern: /^\d{10}$/,
      custom: (value: string) => {
        if (!/^\d{10}$/.test(value)) {
          return "Debe ser exactamente 10 dígitos"
        }
        return null
      },
    },
    address: {
      required: true,
      minLength: 10,
    },
    departamentoNombre: {
      required: true,
    },
    ciudadNombre: {
      required: true,
    },
    rolNombre: {
      required: true,
    },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
      const depId = await ensureDepartamentoIdSafe(formData.departamentoNombre.trim())
      const rolId = await ensureRolIdSafe(formData.rolNombre.trim())
      const ciudadId = await ensureCiudadIdSafe(formData.ciudadNombre.trim(), depId)

      const result = await createUsuario({
        input: {
          nombre: formData.fullName,
          correo: formData.email,
          telefono: formData.phone,
          detalleDireccion: formData.address,
          idCiudad: ciudadId,
          idDepartamento: depId,
          idRol: rolId,
        },
      })

      if (result.data?.createUsuario) {
        localStorage.setItem("currentUser", JSON.stringify(result.data.createUsuario))
        router.push("/profile")
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      const errorMessage = error?.message || "Error al crear la cuenta. Intenta nuevamente."
      setErrors({ general: errorMessage })
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
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                <small className="text-gray-500 text-sm">Ingresa exactamente 10 dígitos sin espacios ni símbolos</small>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-black font-semibold">
                  Dirección detallada
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Calle, número, barrio, etc."
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departamentoNombre" className="text-black font-semibold">
                  Departamento (nombre)
                </Label>
                <Input
                  id="departamentoNombre"
                  type="text"
                  placeholder="Ej: Antioquia"
                  value={formData.departamentoNombre}
                  onChange={(e) => handleInputChange("departamentoNombre", e.target.value)}
                  className={errors.departamentoNombre ? "border-red-500" : ""}
                />
                {errors.departamentoNombre && <p className="text-red-500 text-sm">{errors.departamentoNombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudadNombre" className="text-black font-semibold">
                  Ciudad (nombre)
                </Label>
                <Input
                  id="ciudadNombre"
                  type="text"
                  placeholder="Ej: Medellín"
                  value={formData.ciudadNombre}
                  onChange={(e) => handleInputChange("ciudadNombre", e.target.value)}
                  className={errors.ciudadNombre ? "border-red-500" : ""}
                />
                {errors.ciudadNombre && <p className="text-red-500 text-sm">{errors.ciudadNombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rolNombre" className="text-black font-semibold">
                  Tipo de usuario (nombre)
                </Label>
                <Input
                  id="rolNombre"
                  type="text"
                  placeholder="Ej: CLIENTE"
                  value={formData.rolNombre}
                  onChange={(e) => handleInputChange("rolNombre", e.target.value)}
                  className={errors.rolNombre ? "border-red-500" : ""}
                />
                {errors.rolNombre && <p className="text-red-500 text-sm">{errors.rolNombre}</p>}
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
