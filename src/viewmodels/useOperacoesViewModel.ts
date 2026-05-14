import { useCallback, useEffect, useState } from 'react'
import { listarOperacoes, deletarOperacao } from '../api/operacaoApi'
import type { Operacao, OperacaoFiltros } from '../types/Operacao'

// ─── Types exported for the View ─────────────────────────────────────────────

export interface FiltroValues {
  uf: string
  setor: string
  valorMinimo: string
}

export interface OperacoesViewModel {
  operacoes: Operacao[]
  totalElements: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  deleteId: number | null
  deleting: boolean
  filtroValues: FiltroValues
  setFiltroValues: React.Dispatch<React.SetStateAction<FiltroValues>>
  handleFilter: () => void
  handleClear: () => void
  handlePageChange: (page: number) => void
  handleDeleteRequest: (id: number) => void
  handleDeleteCancel: () => void
  handleDeleteConfirm: () => Promise<void>
}

// ─── ViewModel ────────────────────────────────────────────────────────────────

export function useOperacoesViewModel(): OperacoesViewModel {
  const [operacoes, setOperacoes] = useState<Operacao[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [filtros, setFiltros] = useState<OperacaoFiltros>({ page: 0, size: 20 })
  const [filtroValues, setFiltroValues] = useState<FiltroValues>({
    uf: '',
    setor: '',
    valorMinimo: '',
  })

  const load = useCallback((f: OperacaoFiltros) => {
    setLoading(true)
    setError(null)
    listarOperacoes(f)
      .then((page) => {
        setOperacoes(page.content)
        setTotalElements(page.totalElements)
        setTotalPages(page.totalPages)
        setCurrentPage(page.number)
      })
      .catch(() => setError('Erro ao carregar operações. Verifique se a API está em execução.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load(filtros)
  }, [filtros, load])

  const handleFilter = () => {
    setFiltros({
      page: 0,
      size: 20,
      uf: filtroValues.uf || undefined,
      setor: filtroValues.setor || undefined,
      valorMinimo: filtroValues.valorMinimo ? Number(filtroValues.valorMinimo) : undefined,
    })
  }

  const handleClear = () => {
    setFiltroValues({ uf: '', setor: '', valorMinimo: '' })
    setFiltros({ page: 0, size: 20 })
  }

  const handlePageChange = (page: number) => {
    setFiltros((prev) => ({ ...prev, page }))
  }

  const handleDeleteRequest = (id: number) => setDeleteId(id)
  const handleDeleteCancel = () => setDeleteId(null)

  const handleDeleteConfirm = async () => {
    if (deleteId == null) return
    setDeleting(true)
    try {
      await deletarOperacao(deleteId)
      setDeleteId(null)
      load(filtros)
    } catch {
      setError('Erro ao excluir a operação.')
    } finally {
      setDeleting(false)
    }
  }

  return {
    operacoes,
    totalElements,
    totalPages,
    currentPage,
    loading,
    error,
    deleteId,
    deleting,
    filtroValues,
    setFiltroValues,
    handleFilter,
    handleClear,
    handlePageChange,
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
  }
}
