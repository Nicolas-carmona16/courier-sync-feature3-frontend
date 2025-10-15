import { useQuery } from '@apollo/client'
import { 
  GET_ROLES, 
  GET_DEPARTAMENTOS, 
  GET_CIUDADES_BY_DEPARTAMENTO,
  SEARCH_CIUDADES 
} from '@/lib/graphql/queries'
import { 
  Rol, 
  Departamento, 
  Ciudad, 
  RolPage, 
  DepartamentoPage, 
  CiudadPage 
} from '@/lib/graphql/types'

export function useRoles(page = 0, size = 100) {
  return useQuery<{ roles: RolPage }, { page: number; size: number }>(GET_ROLES, {
    variables: { page, size },
    fetchPolicy: 'no-cache',
  })
}

export function useDepartamentos(page = 0, size = 100) {
  return useQuery<{ departamentos: DepartamentoPage }, { page: number; size: number }>(GET_DEPARTAMENTOS, {
    variables: { page, size },
    fetchPolicy: 'no-cache',
  })
}

export function useCiudadesByDepartamento(idDepartamento: string, page = 0, size = 100) {
  return useQuery<{ ciudadesByDepartamento: CiudadPage }, { idDepartamento: string; page: number; size: number }>(GET_CIUDADES_BY_DEPARTAMENTO, {
    variables: { idDepartamento, page, size },
    skip: !idDepartamento,
    fetchPolicy: 'no-cache',
  })
}

export function useSearchCiudades(q?: string, page = 0, size = 100) {
  return useQuery<{ searchCiudades: CiudadPage }, { q?: string; page: number; size: number }>(SEARCH_CIUDADES, {
    variables: { q, page, size },
  })
}
