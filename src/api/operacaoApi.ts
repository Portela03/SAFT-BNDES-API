import axios from 'axios'
import type {
  Operacao,
  OperacaoCreateRequest,
  PagedResponse,
  InsightUfTotal,
  TopSetor,
  ImportResult,
  OperacaoFiltros,
} from '../types/Operacao'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ─── Operações ────────────────────────────────────────────────────────────────

export const listarOperacoes = (
  filtros: OperacaoFiltros = {},
): Promise<PagedResponse<Operacao>> =>
  api.get<PagedResponse<Operacao>>('/operacoes', { params: filtros }).then((r) => r.data)

export const buscarOperacao = (id: number): Promise<Operacao> =>
  api.get<Operacao>(`/operacoes/${id}`).then((r) => r.data)

export const criarOperacao = (data: OperacaoCreateRequest): Promise<Operacao> =>
  api.post<Operacao>('/operacoes', data).then((r) => r.data)

export const atualizarOperacao = (id: number, data: OperacaoCreateRequest): Promise<Operacao> =>
  api.put<Operacao>(`/operacoes/${id}`, data).then((r) => r.data)

export const deletarOperacao = (id: number): Promise<void> =>
  api.delete(`/operacoes/${id}`).then(() => undefined)

// ─── Insights ─────────────────────────────────────────────────────────────────

export const totalPorUf = (): Promise<InsightUfTotal[]> =>
  api.get<InsightUfTotal[]>('/insights/total-por-uf').then((r) => r.data)

export const topSetores = (limit = 10): Promise<TopSetor[]> =>
  api.get<TopSetor[]>('/insights/top-setores', { params: { limit } }).then((r) => r.data)

// ─── Importação ───────────────────────────────────────────────────────────────

export const importarCsv = (file: File): Promise<ImportResult> => {
  const form = new FormData()
  form.append('file', file)
  return axios
    .post<ImportResult>('/api/carga', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data)
}

export const importarDoCkan = (resourceId?: string): Promise<ImportResult> => {
  const params = resourceId ? { resourceId } : {}
  return api.post<ImportResult>('/carga', null, { params }).then((r) => r.data)
}
