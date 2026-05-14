import { useNavigate } from 'react-router-dom'
import { useDetalhesViewModel } from '../viewmodels/useDetalhesViewModel'

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function situacaoBadge(situacao: string | null | undefined) {
  const s = (situacao ?? '').toLowerCase()
  if (s.includes('contratado'))
    return 'bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full'
  if (s.includes('liquidado'))
    return 'bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full'
  if (s.includes('análise') || s.includes('analise'))
    return 'bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full'
  if (s.includes('inadimplente'))
    return 'bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full'
  return 'bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full'
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5">{value ?? '—'}</p>
    </div>
  )
}

export default function OperacaoDetalhesPage() {
  const navigate = useNavigate()
  const { operacao, loading, notFound, error } = useDetalhesViewModel()

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-px bg-gray-300" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-36 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── 404 / error ───────────────────────────────────────────────────────────
  if (notFound || error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center space-y-4">
          <div className="text-5xl">{notFound ? '❌' : '⚠️'}</div>
          <h2 className="text-xl font-bold text-gray-900">
            {notFound ? 'Operação não encontrada' : 'Erro ao carregar'}
          </h2>
          <p className="text-sm text-gray-500">
            {notFound
              ? 'Não existe nenhuma operação com o ID informado.'
              : error}
          </p>
          <button
            onClick={() => navigate('/operacoes')}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Voltar para Operações
          </button>
        </div>
      </div>
    )
  }

  if (!operacao) return null

  // ── View ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => navigate('/operacoes')}
          className="hover:text-blue-700 transition"
        >
          Operações
        </button>
        <span>›</span>
        <span className="text-gray-900 font-medium">Detalhes #{operacao.id}</span>
      </nav>

      {/* Main card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{operacao.cliente}</h1>
            {operacao.cnpj && (
              <p className="text-sm text-gray-500 mt-0.5">CNPJ: {operacao.cnpj}</p>
            )}
          </div>
          {operacao.situacaoDoContrato && (
            <span className={situacaoBadge(operacao.situacaoDoContrato)}>
              {operacao.situacaoDoContrato}
            </span>
          )}
        </div>

        {/* Fields grid — 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <Field label="ID do Sistema" value={operacao.id} />
          <Field label="ID BNDES" value={operacao.bndesId} />

          <Field label="Estado (UF)" value={operacao.uf} />
          <Field label="Município" value={operacao.municipio} />

          <Field
            label="Data de Contratação"
            value={
              operacao.dataDaContratacao
                ? new Date(operacao.dataDaContratacao).toLocaleDateString('pt-BR')
                : null
            }
          />
          <Field label="Nº do Contrato" value={operacao.numeroDoContrato} />

          <Field label="Valor Contratado" value={BRL.format(operacao.valorContratadoReais)} />
          <Field label="Valor Desembolsado" value={BRL.format(operacao.valorDesembolsadoReais)} />

          <Field label="Setor BNDES" value={operacao.setorBndes} />
          <Field label="Subsetor BNDES" value={operacao.subsetorBndes} />

          <Field label="Porte do Cliente" value={operacao.porteDoCliente} />
          <Field label="Natureza do Cliente" value={operacao.naturezaDoCliente} />

          <Field label="Inovação" value={operacao.inovacao} />
          <Field label="Forma de Apoio" value={operacao.formaDeApoio} />

          <Field label="Produto" value={operacao.produto} />
          <Field label="Instrumento Financeiro" value={operacao.instrumentoFinanceiro} />

          <Field label="Prazo de Carência (meses)" value={operacao.prazoCarenciaMeses} />
          <Field label="Prazo de Amortização (meses)" value={operacao.prazoAmortizacaoMeses} />

          <Field label="Juros (%)" value={operacao.juros} />
          <Field label="Custo Financeiro" value={operacao.custoFinanceiro} />

          <Field
            label="Instituição Financeira Credenciada"
            value={operacao.instituicaoFinanceiraCredenciada}
          />
          <Field label="CNPJ da Instituição" value={operacao.cnpjInstituicaoFinanceiraCredenciada} />

          <Field label="Modalidade de Apoio" value={operacao.modalidadeDeApoio} />
          <Field label="Área Operacional" value={operacao.areaOperacional} />

          <Field label="Setor CNAE" value={operacao.setorCnae} />
          <Field label="Subsetor CNAE" value={operacao.subsetorCnaeNome} />

          <Field label="Tipo de Garantia" value={operacao.tipoDeGarantia} />
          <Field label="Tipo de Excepcionalidade" value={operacao.tipoDeExcepcionalidade} />
        </div>

        {/* Descrição do Projeto (full width) */}
        {operacao.descricaoDoProjeto && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Descrição do Projeto
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{operacao.descricaoDoProjeto}</p>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/operacoes')}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Voltar
          </button>
          <button
            onClick={() => navigate(`/operacoes/${operacao.id}/editar`)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ✏️ Editar
          </button>
        </div>
      </div>
    </div>
  )
}
