"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackLink } from "@/components/back-link"
import { CourierLogo } from "@/components/courier-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { validateForm, type ValidationErrors } from "@/components/form-validation"
import { useUpdateUsuario } from "@/hooks/use-usuario"
import { useRoles, useDepartamentos, useCiudadesByDepartamento } from "@/hooks/use-reference-data"
import { Usuario } from "@/lib/graphql/types"

export default function EditProfilePage() {
  const router = useRouter()
  const [updateUsuario] = useUpdateUsuario()
  const [userData, setUserData] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idDepartamento: "",
    idCiudad: "",
    idRol: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  // Data hooks (depend on formData)
  const { data: rolesData } = useRoles()
  const { data: departamentosData } = useDepartamentos()
  const { data: ciudadesData } = useCiudadesByDepartamento(formData.idDepartamento || "")

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserData(user)
        setFormData({
          fullName: user.nombre,
          email: user.correo,
          phone: user.telefono,
          address: user.detalleDireccion,
          idDepartamento: user.idDepartamento,
          idCiudad: user.idCiudad,
          idRol: user.idRol,
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/profile')
      }
    } else {
      router.push('/profile')
    }
  }, [router])

  // Reset ciudad when departamento changes
  useEffect(() => {
    if (formData.idDepartamento) {
      setFormData(prev => ({ ...prev, idCiudad: "" }))
    }
  }, [formData.idDepartamento])

  const validationRules = {
    fullName: {
      required: true,
      minLength: 2,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
    idDepartamento: {
      required: true,
    },
    idCiudad: {
      required: true,
    },
    idRol: {
      required: true,
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

    if (!userData) return

    const validationErrors = validateForm(formData, validationRules)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      const result = await updateUsuario({
        variables: {
          input: {
            idUsuario: userData.idUsuario,
            nombre: formData.fullName,
            correo: formData.email,
            telefono: formData.phone,
            detalleDireccion: formData.address,
            idCiudad: formData.idCiudad,
            idDepartamento: formData.idDepartamento,
            idRol: formData.idRol,
          }
        }
      })

      if (result.data?.updateUsuario) {
        // Update stored user data
        localStorage.setItem('currentUser', JSON.stringify(result.data.updateUsuario))
        router.push("/profile")
      }
    } catch (error: any) {
      console.error("Update error:", error)
      const errorMessage = error.graphQLErrors?.[0]?.message || "Error al actualizar el perfil. Intenta nuevamente."
      setErrors({ general: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  if (!userData) {
    return (
      <div className="courier-layout">
        <div className="courier-two-column">
          <div>
            <BackLink href="/profile">Volver al perfil</BackLink>
            <CourierLogo subtitle="Editar perfil" />
            <div className="text-center py-10">
              <p className="text-gray-600">Cargando...</p>
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

          <CourierLogo subtitle="Editar perfil" />

          <div className="mb-10">
            <div className="flex items-center gap-3 text-2xl font-semibold mb-3">👤 Editar Perfil</div>
            <p className="text-gray-600 mb-8">Actualiza tu información personal</p>

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
                  <small className="text-gray-500 text-sm">
                    Ingresa exactamente 10 dígitos sin espacios ni símbolos
                  </small>
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
                  <Label htmlFor="departamento" className="text-black font-semibold">
                    Departamento
                  </Label>
                  <Select value={formData.idDepartamento} onValueChange={(value) => handleInputChange("idDepartamento", value)}>
                    <SelectTrigger className={errors.idDepartamento ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentosData?.departamentos.content.map((depto) => (
                        <SelectItem key={depto.idDepartamento} value={String(depto.idDepartamento)}>
                          {depto.nombreDepartamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.idDepartamento && <p className="text-red-500 text-sm">{errors.idDepartamento}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad" className="text-black font-semibold">
                    Ciudad
                  </Label>
                  <Select 
                    value={formData.idCiudad} 
                    onValueChange={(value) => handleInputChange("idCiudad", value)}
                    disabled={!formData.idDepartamento}
                  >
                    <SelectTrigger className={errors.idCiudad ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciudadesData?.ciudadesByDepartamento.content.map((ciudad) => (
                        <SelectItem key={ciudad.idCiudad} value={String(ciudad.idCiudad)}>
                          {ciudad.nombreCiudad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.idCiudad && <p className="text-red-500 text-sm">{errors.idCiudad}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rol" className="text-black font-semibold">
                    Tipo de usuario
                  </Label>
                  <Select value={formData.idRol} onValueChange={(value) => handleInputChange("idRol", value)}>
                    <SelectTrigger className={errors.idRol ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {rolesData?.roles.content.map((rol) => (
                        <SelectItem key={rol.idRol} value={String(rol.idRol)}>
                          {rol.nombreRol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.idRol && <p className="text-red-500 text-sm">{errors.idRol}</p>}
                </div>
              </div>

              <div className="flex gap-5">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-courier-navy hover:bg-blue-800 text-white"
                >
                  {isLoading ? "Guardando..." : "Guardar cambios"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile">Cancelar</Link>
                </Button>
              </div>
            </form>
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
