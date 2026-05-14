import { useEffect, useState } from 'react'
import { totalPorUf, topSetores, listarOperacoes } from '../api/operacaoApi'
import type { InsightUfTotal, TopSetor } from '../types/Operacao'

export interface InsightsViewModel {
  totalOperacoes: number
  estadosAtendidos: number
  setoresAtivos: number
  ufData: InsightUfTotal[]      // top 10 UFs por total, já ordenados
  setorData: TopSetor[]         // top 5 setores
  loading: boolean
  error: string | null
}

export function useInsightsViewModel(): InsightsViewModel {
  const [totalOperacoes, setTotalOperacoes] = useState(0)
  const [ufData, setUfData] = useState<InsightUfTotal[]>([])
  const [setorData, setSetorData] = useState<TopSetor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      totalPorUf(),
      topSetores(5),
      listarOperacoes({ page: 0, size: 1 }),
    ])
      .then(([ufs, setores, page]) => {
        // Sort UFs descending by total, keep top 10
        const top10 = [...ufs]
          .sort((a, b) => b.total - a.total)
          .slice(0, 10)

        setUfData(top10)
        setSetorData(setores)
        setTotalOperacoes(page.totalElements)
      })
      .catch(() => setError('Erro ao carregar dados do dashboard. Verifique se a API está em execução.'))
      .finally(() => setLoading(false))
  }, [])

  return {
    totalOperacoes,
    estadosAtendidos: ufData.length,
    setoresAtivos: setorData.length,
    ufData,
    setorData,
    loading,
    error,
  }
}
