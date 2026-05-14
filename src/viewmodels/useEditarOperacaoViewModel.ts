import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarOperacao, atualizarOperacao } from '../api/operacaoApi'
import type { OperacaoCreateRequest } from '../types/Operacao'

interface ToastState {
  message: string
  type: 'success' | 'error'
}

export interface EditarOperacaoViewModel {
  initialData: OperacaoCreateRequest | null
  loading: boolean
  loadError: string | null
  submitting: boolean
  toast: ToastState | null
  handleSubmit: (data: OperacaoCreateRequest) => Promise<void>
  clearToast: () => void
}

export function useEditarOperacaoViewModel(): EditarOperacaoViewModel {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState<OperacaoCreateRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  useEffect(() => {
    if (!id) {
      setLoadError('ID inválido.')
      setLoading(false)
      return
    }
    buscarOperacao(Number(id))
      .then(({ id: _id, ...rest }) => setInitialData(rest))
      .catch(() => setLoadError('Operação não encontrada.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (data: OperacaoCreateRequest) => {
    if (!id) return
    setSubmitting(true)
    try {
      await atualizarOperacao(Number(id), data)
      setToast({ message: 'Operação atualizada com sucesso!', type: 'success' })
      setTimeout(() => navigate(`/operacoes/${id}`), 1500)
    } catch {
      setToast({ message: 'Erro ao atualizar operação. Tente novamente.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    initialData,
    loading,
    loadError,
    submitting,
    toast,
    handleSubmit,
    clearToast: () => setToast(null),
  }
}
