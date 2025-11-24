import { ApolloLink, Observable, Operation } from "@apollo/client"
import { Usuario, Rol, Departamento, Ciudad } from "@/lib/graphql/types"

// Demo por defecto; solo se desactiva con NEXT_PUBLIC_DEMO_MODE="false"
const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false"

const roles: Rol[] = [
  { idRol: "1", nombreRol: "ADMIN" },
  { idRol: "2", nombreRol: "AGENTE" },
  { idRol: "3", nombreRol: "CLIENTE" },
]

const departamentos: Departamento[] = [
  { idDepartamento: "1", nombreDepartamento: "Antioquia" },
  { idDepartamento: "2", nombreDepartamento: "Cundinamarca" },
]

const ciudades: Ciudad[] = [
  { idCiudad: "1", nombreCiudad: "Medellín", idDepartamento: "1", nombreDepartamento: "Antioquia" },
  { idCiudad: "2", nombreCiudad: "Bogotá", idDepartamento: "2", nombreDepartamento: "Cundinamarca" },
]

let usuarios: Usuario[] = [
  {
    idUsuario: "100",
    nombre: "Admin Demo",
    correo: "admin@demo.com",
    telefono: "3000000000",
    fechaRegistro: new Date().toISOString(),
    detalleDireccion: "Calle 123",
    idCiudad: "1",
    nombreCiudad: "Medellín",
    idDepartamento: "1",
    nombreDepartamento: "Antioquia",
    idRol: "1",
    nombreRol: "ADMIN",
  },
  {
    idUsuario: "101",
    nombre: "Agente Demo",
    correo: "agente@demo.com",
    telefono: "3110000000",
    fechaRegistro: new Date().toISOString(),
    detalleDireccion: "Carrera 45",
    idCiudad: "2",
    nombreCiudad: "Bogotá",
    idDepartamento: "2",
    nombreDepartamento: "Cundinamarca",
    idRol: "2",
    nombreRol: "AGENTE",
  },
  {
    idUsuario: "102",
    nombre: "Cliente Demo",
    correo: "cliente@demo.com",
    telefono: "3200000000",
    fechaRegistro: new Date().toISOString(),
    detalleDireccion: "Avenida 10 #45",
    idCiudad: "1",
    nombreCiudad: "Medellín",
    idDepartamento: "1",
    nombreDepartamento: "Antioquia",
    idRol: "3",
    nombreRol: "CLIENTE",
  },
]

const genId = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))

function matchOperation(op: Operation, name: string) {
  return op.operationName === name || op.query.definitions.some((def: any) => def.name?.value === name)
}

function buildPage<T>(items: T[]) {
  return {
    content: items,
    pageInfo: {
      page: 0,
      size: items.length,
      totalElements: items.length,
      totalPages: 1,
    },
  }
}

export function demoMockLink() {
  return new ApolloLink((operation) => {
    return new Observable((observer) => {
      if (!isDemo) {
        observer.error(new Error("Demo mode no está activo"))
        return
      }

      setTimeout(() => {
        try {
          const vars = operation.variables || {}

          // Queries
          if (matchOperation(operation, "Roles")) {
            observer.next({ data: { roles: buildPage(roles) } })
            observer.complete()
            return
          }
          if (matchOperation(operation, "Departamentos")) {
            observer.next({ data: { departamentos: buildPage(departamentos) } })
            observer.complete()
            return
          }
          if (matchOperation(operation, "CiudadesByDepartamento")) {
            const list = ciudades.filter((c) => c.idDepartamento === vars.idDepartamento)
            observer.next({ data: { ciudadesByDepartamento: buildPage(list) } })
            observer.complete()
            return
          }
          if (matchOperation(operation, "SearchCiudades")) {
            const list = ciudades.filter((c) => c.nombreCiudad.toLowerCase().includes((vars.q || "").toLowerCase()))
            observer.next({ data: { searchCiudades: buildPage(list) } })
            observer.complete()
            return
          }
          if (matchOperation(operation, "SearchUsuarios")) {
            const q = (vars.q || "").toLowerCase()
            const list = usuarios.filter((u) => u.nombre.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q))
            observer.next({ data: { searchUsuarios: buildPage(list) } })
            observer.complete()
            return
          }

          // Mutations
          if (matchOperation(operation, "CreateUsuario")) {
            const { input } = vars
            const newUser: Usuario = {
              idUsuario: genId(),
              nombre: input.nombre,
              correo: input.correo,
              telefono: input.telefono,
              fechaRegistro: new Date().toISOString(),
              detalleDireccion: input.detalleDireccion,
              idCiudad: input.idCiudad,
              nombreCiudad: ciudades.find((c) => c.idCiudad === input.idCiudad)?.nombreCiudad || "Ciudad demo",
              idDepartamento: input.idDepartamento,
              nombreDepartamento:
                departamentos.find((d) => d.idDepartamento === input.idDepartamento)?.nombreDepartamento || "Departamento demo",
              idRol: input.idRol,
              nombreRol: roles.find((r) => r.idRol === input.idRol)?.nombreRol || "ROL",
            }
            usuarios = [...usuarios, newUser]
            observer.next({ data: { createUsuario: newUser } })
            observer.complete()
            return
          }

          if (matchOperation(operation, "UpdateUsuario")) {
            const { input } = vars
            const idx = usuarios.findIndex((u) => u.idUsuario === input.idUsuario)
            if (idx >= 0) {
              const updated = { ...usuarios[idx], ...input }
              usuarios[idx] = updated as Usuario
              observer.next({ data: { updateUsuario: usuarios[idx] } })
            } else {
              observer.error(new Error("Usuario no encontrado"))
            }
            observer.complete()
            return
          }

          if (matchOperation(operation, "CreateDepartamento")) {
            const { input } = vars
            const dep: Departamento = { idDepartamento: genId(), nombreDepartamento: input.nombreDepartamento }
            departamentos.push(dep)
            observer.next({ data: { createDepartamento: dep } })
            observer.complete()
            return
          }

          if (matchOperation(operation, "CreateCiudad")) {
            const { input } = vars
            const ciudad: Ciudad = {
              idCiudad: genId(),
              nombreCiudad: input.nombreCiudad,
              idDepartamento: input.idDepartamento,
              nombreDepartamento:
                departamentos.find((d) => d.idDepartamento === input.idDepartamento)?.nombreDepartamento || "Departamento demo",
            }
            ciudades.push(ciudad)
            observer.next({ data: { createCiudad: ciudad } })
            observer.complete()
            return
          }

          if (matchOperation(operation, "CreateRol")) {
            const { input } = vars
            const rol: Rol = { idRol: genId(), nombreRol: input.nombreRol }
            roles.push(rol)
            observer.next({ data: { createRol: rol } })
            observer.complete()
            return
          }

          observer.error(new Error(`Operación no mockeada: ${operation.operationName}`))
        } catch (err) {
          observer.error(err)
        }
      }, 200) // pequeña latencia para simular red
    })
  })
}
