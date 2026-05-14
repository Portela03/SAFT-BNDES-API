import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarOperacao } from '../api/operacaoApi'
import type { OperacaoCreateRequest } from '../types/Operacao'

interface ToastState {
  message: string
  type: 'success' | 'error'
}

export interface NovaOperacaoViewModel {
  submitting: boolean
  toast: ToastState | null
  handleSubmit: (data: OperacaoCreateRequest) => Promise<void>
  clearToast: () => void
}

export function useNovaOperacaoViewModel(): NovaOperacaoViewModel {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleSubmit = async (data: OperacaoCreateRequest) => {
    setSubmitting(true)
    try {
      const created = await criarOperacao(data)
      setToast({ message: 'Operação cadastrada com sucesso!', type: 'success' })
      setTimeout(() => navigate(`/operacoes/${created.id}`), 1500)
    } catch {
      setToast({ message: 'Erro ao criar operação. Verifique os campos e tente novamente.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return { submitting, toast, handleSubmit, clearToast: () => setToast(null) }
}
