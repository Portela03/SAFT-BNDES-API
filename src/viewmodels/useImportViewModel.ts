import { useState, useRef } from 'react'
import type { RefObject, DragEvent, ChangeEvent } from 'react'
import { importarCsv, importarDoCkan } from '../api/operacaoApi'
import type { ImportResult } from '../types/Operacao'

export interface ImportViewModel {
  file: File | null
  dragging: boolean
  loading: boolean
  result: ImportResult | null
  error: string | null
  fileInputRef: RefObject<HTMLInputElement | null>
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void
  handleDragLeave: () => void
  handleDrop: (e: DragEvent<HTMLDivElement>) => void
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDropZoneClick: () => void
  handleImportCsv: () => void
  handleImportCkan: () => void
  clearResult: () => void
  clearFile: () => void
}

export function useImportViewModel(): ImportViewModel {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.name.toLowerCase().endsWith('.csv')) {
      setFile(dropped)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const handleImportCsv = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await importarCsv(file)
      setResult(res)
    } catch {
      setError('Erro ao importar o arquivo CSV. Verifique o formato e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleImportCkan = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await importarDoCkan()
      setResult(res)
    } catch {
      setError('Erro ao importar do Portal BNDES. Verifique sua conexão e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
    setError(null)
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return {
    file,
    dragging,
    loading,
    result,
    error,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleDropZoneClick,
    handleImportCsv,
    handleImportCkan,
    clearResult,
    clearFile,
  }
}
