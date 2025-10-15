import { gql } from '@apollo/client'

// Queries for Usuario
export const GET_USUARIO_BY_ID = gql`
  query UsuarioById($id: ID!) {
    usuarioById(id: $id) {
      idUsuario
      nombre
      correo
      telefono
      fechaRegistro
      detalleDireccion
      idCiudad
      nombreCiudad
      idDepartamento
      nombreDepartamento
      idRol
      nombreRol
    }
  }
`

export const SEARCH_USUARIOS = gql`
  query SearchUsuarios($q: String, $page: Int, $size: Int) {
    searchUsuarios(q: $q, page: $page, size: $size) {
      content {
        idUsuario
        nombre
        correo
        telefono
        fechaRegistro
        detalleDireccion
        idCiudad
        nombreCiudad
        idDepartamento
        nombreDepartamento
        idRol
        nombreRol
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
      }
    }
  }
`

// Mutations for Usuario
export const CREATE_USUARIO = gql`
  mutation CreateUsuario($input: CreateUsuarioInput!) {
    createUsuario(input: $input) {
      idUsuario
      nombre
      correo
      telefono
      fechaRegistro
      detalleDireccion
      idCiudad
      nombreCiudad
      idDepartamento
      nombreDepartamento
      idRol
      nombreRol
    }
  }
`

export const UPDATE_USUARIO = gql`
  mutation UpdateUsuario($input: UpdateUsuarioInput!) {
    updateUsuario(input: $input) {
      idUsuario
      nombre
      correo
      telefono
      fechaRegistro
      detalleDireccion
      idCiudad
      nombreCiudad
      idDepartamento
      nombreDepartamento
      idRol
      nombreRol
    }
  }
`

export const DELETE_USUARIO = gql`
  mutation DeleteUsuario($id: ID!) {
    deleteUsuario(id: $id)
  }
`

// Mutations for reference data (create if not exists)
export const CREATE_DEPARTAMENTO = gql`
  mutation CreateDepartamento($input: CreateDepartamentoInput!) {
    createDepartamento(input: $input) {
      idDepartamento
      nombreDepartamento
    }
  }
`

export const CREATE_CIUDAD = gql`
  mutation CreateCiudad($input: CreateCiudadInput!) {
    createCiudad(input: $input) {
      idCiudad
      nombreCiudad
      idDepartamento
      nombreDepartamento
    }
  }
`

export const CREATE_ROL = gql`
  mutation CreateRol($input: CreateRolInput!) {
    createRol(input: $input) {
      idRol
      nombreRol
    }
  }
`

// Queries for Roles
export const GET_ROLES = gql`
  query Roles($page: Int, $size: Int) {
    roles(page: $page, size: $size) {
      content {
        idRol
        nombreRol
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
      }
    }
  }
`

// Queries for Departamentos
export const GET_DEPARTAMENTOS = gql`
  query Departamentos($page: Int, $size: Int) {
    departamentos(page: $page, size: $size) {
      content {
        idDepartamento
        nombreDepartamento
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
      }
    }
  }
`

// Queries for Ciudades
export const GET_CIUDADES_BY_DEPARTAMENTO = gql`
  query CiudadesByDepartamento($idDepartamento: ID!, $page: Int, $size: Int) {
    ciudadesByDepartamento(idDepartamento: $idDepartamento, page: $page, size: $size) {
      content {
        idCiudad
        nombreCiudad
        idDepartamento
        nombreDepartamento
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
      }
    }
  }
`

export const SEARCH_CIUDADES = gql`
  query SearchCiudades($q: String, $page: Int, $size: Int) {
    searchCiudades(q: $q, page: $page, size: $size) {
      content {
        idCiudad
        nombreCiudad
        idDepartamento
        nombreDepartamento
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
      }
    }
  }
`
