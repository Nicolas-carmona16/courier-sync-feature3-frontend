"use client"

import { useState, useEffect } from "react"
import { graphqlRequest } from "@/lib/api-client"
import {
  CREATE_USUARIO,
  UPDATE_USUARIO,
  DELETE_USUARIO,
  GET_USUARIO_BY_ID,
  SEARCH_USUARIOS,
} from "@/lib/graphql/queries"
import type { CreateUsuarioInput, UpdateUsuarioInput, Usuario, UsuarioPage } from "@/lib/graphql/types"

export function useCreateUsuario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createUsuario = async (variables: { input: CreateUsuarioInput }) => {
    setLoading(true)
    setError(null)
    try {
      const data = await graphqlRequest<{ createUsuario: Usuario }>(CREATE_USUARIO, variables)
      return { data }
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return [createUsuario, { loading, error }] as const
}

export function useUpdateUsuario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateUsuario = async (variables: { input: UpdateUsuarioInput }) => {
    setLoading(true)
    setError(null)
    try {
      const data = await graphqlRequest<{ updateUsuario: Usuario }>(UPDATE_USUARIO, variables)
      return { data }
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return [updateUsuario, { loading, error }] as const
}

export function useDeleteUsuario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteUsuario = async (variables: { id: string }) => {
    setLoading(true)
    setError(null)
    try {
      const data = await graphqlRequest<{ deleteUsuario: boolean }>(DELETE_USUARIO, variables)
      return { data }
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return [deleteUsuario, { loading, error }] as const
}

export function useUsuario(id: string) {
  const [data, setData] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchUsuario = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ usuarioById: Usuario }>(GET_USUARIO_BY_ID, { id })
        setData(result.usuarioById)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [id])

  return { data, loading, error }
}

export function useSearchUsuarios(q?: string, page = 0, size = 10) {
  const [data, setData] = useState<UsuarioPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ searchUsuarios: UsuarioPage }>(SEARCH_USUARIOS, { q, page, size })
        setData(result.searchUsuarios)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [q, page, size])

  return { data, loading, error }
}
