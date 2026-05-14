import type { Operacao } from '../types/Operacao'

const BRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

function situacaoBadge(situacao: string): string {
  const s = (situacao ?? '').toLowerCase()
  if (s.includes('contratado')) return 'bg-green-100 text-green-700'
  if (s.includes('liquidado')) return 'bg-blue-100 text-blue-700'
  if (s.includes('análise') || s.includes('analise')) return 'bg-yellow-100 text-yellow-700'
  if (s.includes('inadimplente')) return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-600'
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded" />
        </td>
      ))}
    </tr>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  operacoes: Operacao[]
  loading: boolean
  onVer: (id: number) => void
  onEditar: (id: number) => void
  onExcluir: (id: number) => void
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OperacaoTable({ operacoes, loading, onVer, onEditar, onExcluir }: Props) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {['#', 'Empresa', 'UF', 'Setor BNDES', 'Valor Contratado', 'Data', 'Situação', 'Ações'].map(
              (col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ),
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : operacoes.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-16 text-center">
                <span className="text-4xl block mb-3">📋</span>
                <p className="text-gray-500 text-sm">
                  Nenhuma operação encontrada com os filtros aplicados.
                </p>
              </td>
            </tr>
          ) : (
            operacoes.map((op, idx) => (
              <tr
                key={op.id}
                className={`hover:bg-blue-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                {/* # */}
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{op.id}</td>

                {/* Empresa */}
                <td className="px-4 py-3 text-gray-800 font-medium max-w-[200px] truncate">
                  {op.cliente}
                </td>

                {/* UF */}
                <td className="px-4 py-3 text-gray-700">{op.uf}</td>

                {/* Setor BNDES */}
                <td className="px-4 py-3 text-gray-700 max-w-[160px] truncate">
                  {op.setorBndes || '—'}
                </td>

                {/* Valor Contratado */}
                <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                  {BRL(op.valorContratadoReais)}
                </td>

                {/* Data */}
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {op.dataDaContratacao ? op.dataDaContratacao.split('T')[0] : '—'}
                </td>

                {/* Situação */}
                <td className="px-4 py-3">
                  {op.situacaoDoContrato ? (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${situacaoBadge(op.situacaoDoContrato)}`}
                    >
                      {op.situacaoDoContrato}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>

                {/* Ações */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onVer(op.id)}
                      className="text-blue-600 hover:text-blue-800 transition text-xs font-medium"
                    >
                      👁 Ver
                    </button>
                    <button
                      onClick={() => onEditar(op.id)}
                      className="text-gray-600 hover:text-gray-800 transition text-xs font-medium"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => onExcluir(op.id)}
                      className="text-red-600 hover:text-red-800 transition text-xs font-medium"
                    >
                      🗑 Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
