// GraphQL Types based on backend schemas

export interface Usuario {
  idUsuario: string
  nombre: string
  correo: string
  telefono: string
  fechaRegistro: string
  detalleDireccion: string
  idCiudad: string
  nombreCiudad: string
  idDepartamento: string
  nombreDepartamento: string
  idRol: string
  nombreRol: string
}

export interface CreateUsuarioInput {
  nombre: string
  correo: string
  telefono: string
  fechaRegistro?: string
  detalleDireccion: string
  idCiudad: string
  idDepartamento: string
  idRol: string
}

export interface UpdateUsuarioInput {
  idUsuario: string
  nombre?: string
  correo?: string
  telefono?: string
  fechaRegistro?: string
  detalleDireccion?: string
  idCiudad?: string
  idDepartamento?: string
  idRol?: string
}

export interface Rol {
  idRol: string
  nombreRol: string
}

export interface Departamento {
  idDepartamento: string
  nombreDepartamento: string
}

export interface Ciudad {
  idCiudad: string
  nombreCiudad: string
  idDepartamento: string
  nombreDepartamento: string
}

export interface PageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface UsuarioPage {
  content: Usuario[]
  pageInfo: PageInfo
}

export interface RolPage {
  content: Rol[]
  pageInfo: PageInfo
}

export interface DepartamentoPage {
  content: Departamento[]
  pageInfo: PageInfo
}

export interface CiudadPage {
  content: Ciudad[]
  pageInfo: PageInfo
}
