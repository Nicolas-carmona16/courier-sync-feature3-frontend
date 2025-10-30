"use client"

import { useState, useEffect } from "react"
import { graphqlRequest } from "@/lib/api-client"
import { GET_ROLES, GET_DEPARTAMENTOS, GET_CIUDADES_BY_DEPARTAMENTO, SEARCH_CIUDADES } from "@/lib/graphql/queries"
import type { RolPage, DepartamentoPage, CiudadPage } from "@/lib/graphql/types"

export function useRoles(page = 0, size = 100) {
  const [data, setData] = useState<RolPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ roles: RolPage }>(GET_ROLES, { page, size })
        setData(result.roles)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [page, size])

  return { data, loading, error }
}

export function useDepartamentos(page = 0, size = 100) {
  const [data, setData] = useState<DepartamentoPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDepartamentos = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ departamentos: DepartamentoPage }>(GET_DEPARTAMENTOS, { page, size })
        setData(result.departamentos)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartamentos()
  }, [page, size])

  return { data, loading, error }
}

export function useCiudadesByDepartamento(idDepartamento: string, page = 0, size = 100) {
  const [data, setData] = useState<CiudadPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!idDepartamento) return

    const fetchCiudades = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ ciudadesByDepartamento: CiudadPage }>(GET_CIUDADES_BY_DEPARTAMENTO, {
          idDepartamento,
          page,
          size,
        })
        setData(result.ciudadesByDepartamento)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCiudades()
  }, [idDepartamento, page, size])

  return { data, loading, error }
}

export function useSearchCiudades(q?: string, page = 0, size = 100) {
  const [data, setData] = useState<CiudadPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCiudades = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await graphqlRequest<{ searchCiudades: CiudadPage }>(SEARCH_CIUDADES, { q, page, size })
        setData(result.searchCiudades)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCiudades()
  }, [q, page, size])

  return { data, loading, error }
}
