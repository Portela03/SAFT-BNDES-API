import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { buscarOperacao } from '../api/operacaoApi'
import type { Operacao } from '../types/Operacao'

export interface DetalhesViewModel {
  operacao: Operacao | null
  loading: boolean
  notFound: boolean
  error: string | null
}

export function useDetalhesViewModel(): DetalhesViewModel {
  const { id } = useParams<{ id: string }>()
  const [operacao, setOperacao] = useState<Operacao | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }
    setLoading(true)
    setNotFound(false)
    setError(null)
    buscarOperacao(Number(id))
      .then(setOperacao)
      .catch((err: unknown) => {
        const status =
          err &&
          typeof err === 'object' &&
          'response' in err &&
          (err as { response?: { status?: number } }).response?.status
        if (status === 404) {
          setNotFound(true)
        } else {
          setError('Erro ao carregar operação. Tente novamente.')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  return { operacao, loading, notFound, error }
}
