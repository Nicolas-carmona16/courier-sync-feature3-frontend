import { useMutation, useQuery } from '@apollo/client'
import { 
  CREATE_USUARIO, 
  UPDATE_USUARIO, 
  DELETE_USUARIO, 
  GET_USUARIO_BY_ID,
  SEARCH_USUARIOS 
} from '@/lib/graphql/queries'
import { 
  CreateUsuarioInput, 
  UpdateUsuarioInput, 
  Usuario, 
  UsuarioPage 
} from '@/lib/graphql/types'

export function useCreateUsuario() {
  return useMutation<{ createUsuario: Usuario }, { input: CreateUsuarioInput }>(CREATE_USUARIO)
}

export function useUpdateUsuario() {
  return useMutation<{ updateUsuario: Usuario }, { input: UpdateUsuarioInput }>(UPDATE_USUARIO)
}

export function useDeleteUsuario() {
  return useMutation<{ deleteUsuario: boolean }, { id: string }>(DELETE_USUARIO)
}

export function useUsuario(id: string) {
  return useQuery<{ usuarioById: Usuario }, { id: string }>(GET_USUARIO_BY_ID, {
    variables: { id },
    skip: !id,
  })
}

export function useSearchUsuarios(q?: string, page = 0, size = 10) {
  return useQuery<{ searchUsuarios: UsuarioPage }, { q?: string; page: number; size: number }>(SEARCH_USUARIOS, {
    variables: { q, page, size },
  })
}
