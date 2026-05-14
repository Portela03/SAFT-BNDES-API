import { useState } from 'react'
import type { OperacaoCreateRequest } from '../types/Operacao'

// ── Constants ──────────────────────────────────────────────────────────────
const UFS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA',
  'MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN',
  'RO','RR','RS','SC','SE','SP','TO',
]

// ── Prop types ─────────────────────────────────────────────────────────────
interface Props {
  initialData: OperacaoCreateRequest
  onSubmit: (data: OperacaoCreateRequest) => Promise<void> | void
  submitting: boolean
  onCancel: () => void
}

// ── Validation ────────────────────────────────────────────────────────────
type Errors = Partial<Record<keyof OperacaoCreateRequest, string>>

function validate(form: OperacaoCreateRequest): Errors {
  const errors: Errors = {}
  if (!form.cliente.trim()) errors.cliente = 'Campo obrigatório'
  if (!form.uf) errors.uf = 'Selecione um estado'
  if (form.valorContratadoReais <= 0) errors.valorContratadoReais = 'O valor deve ser positivo'
  return errors
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

// ── Form component ─────────────────────────────────────────────────────────
export default function OperacaoForm({ initialData, onSubmit, submitting, onCancel }: Props) {
  const [form, setForm] = useState<OperacaoCreateRequest>(initialData)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (update: Partial<OperacaoCreateRequest>) => {
    setForm((prev) => {
      const next = { ...prev, ...update } as OperacaoCreateRequest
      if (submitted) setErrors(validate(next))
      return next
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    await onSubmit(form)
  }

  const BASE = 'rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 w-full'
  const cls = (field: keyof OperacaoCreateRequest) =>
    errors[field]
      ? `${BASE} border border-red-500 bg-red-50 focus:ring-red-500`
      : `${BASE} border border-gray-300 focus:ring-blue-500`

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
      {/* ── Seção 1: Dados da Empresa ──────────────────────────────────── */}
      <SectionCard title="Dados da Empresa">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nome da empresa" required error={errors.cliente}>
            <input
              className={cls('cliente')}
              value={form.cliente}
              placeholder="Razão social"
              onChange={(e) => setField({ cliente: e.target.value })}
            />
          </Field>
          <Field label="CNPJ" error={errors.cnpj}>
            <input
              className={cls('cnpj')}
              value={form.cnpj}
              placeholder="00.000.000/0000-00"
              onChange={(e) => setField({ cnpj: e.target.value })}
            />
          </Field>
          <Field label="Estado (UF)" required error={errors.uf}>
            <select className={cls('uf')} value={form.uf} onChange={(e) => setField({ uf: e.target.value })}>
              <option value="">Selecione...</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </Field>
          <Field label="Município" error={errors.municipio}>
            <input
              className={cls('municipio')}
              value={form.municipio}
              onChange={(e) => setField({ municipio: e.target.value })}
            />
          </Field>
          <Field label="Porte do Cliente" error={errors.porteDoCliente}>
            <select
              className={cls('porteDoCliente')}
              value={form.porteDoCliente}
              onChange={(e) => setField({ porteDoCliente: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option>Micro Empresa</option>
              <option>Pequena Empresa</option>
              <option>Média Empresa</option>
              <option>Grande Empresa</option>
            </select>
          </Field>
          <Field label="Natureza do Cliente" error={errors.naturezaDoCliente}>
            <input
              className={cls('naturezaDoCliente')}
              value={form.naturezaDoCliente}
              onChange={(e) => setField({ naturezaDoCliente: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      {/* ── Seção 2: Dados do Financiamento ──────────────────────────── */}
      <SectionCard title="Dados do Financiamento">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Valor Contratado (R$)" required error={errors.valorContratadoReais}>
            <input
              type="number"
              step="0.01"
              min="0"
              className={cls('valorContratadoReais')}
              value={form.valorContratadoReais || ''}
              placeholder="0,00"
              onChange={(e) => setField({ valorContratadoReais: Number(e.target.value) })}
            />
          </Field>
          <Field label="Valor Desembolsado (R$)" error={errors.valorDesembolsadoReais}>
            <input
              type="number"
              step="0.01"
              min="0"
              className={cls('valorDesembolsadoReais')}
              value={form.valorDesembolsadoReais || ''}
              placeholder="0,00"
              onChange={(e) => setField({ valorDesembolsadoReais: Number(e.target.value) })}
            />
          </Field>
          <Field label="Data de Contratação" error={errors.dataDaContratacao}>
            <input
              type="date"
              className={cls('dataDaContratacao')}
              value={form.dataDaContratacao.split('T')[0] ?? ''}
              onChange={(e) => setField({ dataDaContratacao: e.target.value })}
            />
          </Field>
          <Field label="Setor BNDES" error={errors.setorBndes}>
            <input
              className={cls('setorBndes')}
              value={form.setorBndes}
              onChange={(e) => setField({ setorBndes: e.target.value })}
            />
          </Field>
          <Field label="Subsetor BNDES" error={errors.subsetorBndes}>
            <input
              className={cls('subsetorBndes')}
              value={form.subsetorBndes}
              onChange={(e) => setField({ subsetorBndes: e.target.value })}
            />
          </Field>
          <Field label="Produto" error={errors.produto}>
            <input
              className={cls('produto')}
              value={form.produto}
              onChange={(e) => setField({ produto: e.target.value })}
            />
          </Field>
          <Field label="Forma de Apoio" error={errors.formaDeApoio}>
            <input
              className={cls('formaDeApoio')}
              value={form.formaDeApoio}
              onChange={(e) => setField({ formaDeApoio: e.target.value })}
            />
          </Field>
          <Field label="Instrumento Financeiro" error={errors.instrumentoFinanceiro}>
            <input
              className={cls('instrumentoFinanceiro')}
              value={form.instrumentoFinanceiro}
              onChange={(e) => setField({ instrumentoFinanceiro: e.target.value })}
            />
          </Field>
          <Field label="Inovação" error={errors.inovacao}>
            <select
              className={cls('inovacao')}
              value={form.inovacao}
              onChange={(e) => setField({ inovacao: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </Field>
        </div>
      </SectionCard>

      {/* ── Seção 3: Condições do Contrato ───────────────────────────── */}
      <SectionCard title="Condições do Contrato">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Situação do Contrato" error={errors.situacaoDoContrato}>
            <select
              className={cls('situacaoDoContrato')}
              value={form.situacaoDoContrato}
              onChange={(e) => setField({ situacaoDoContrato: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option>Contratado</option>
              <option>Em análise</option>
              <option>Liquidado</option>
              <option>Inadimplente</option>
            </select>
          </Field>
          <Field label="Prazo de Carência (meses)" error={errors.prazoCarenciaMeses}>
            <input
              type="number"
              min="0"
              className={cls('prazoCarenciaMeses')}
              value={form.prazoCarenciaMeses || ''}
              placeholder="Meses"
              onChange={(e) => setField({ prazoCarenciaMeses: Number(e.target.value) })}
            />
          </Field>
          <Field label="Prazo de Amortização (meses)" error={errors.prazoAmortizacaoMeses}>
            <input
              type="number"
              min="0"
              className={cls('prazoAmortizacaoMeses')}
              value={form.prazoAmortizacaoMeses || ''}
              placeholder="Meses"
              onChange={(e) => setField({ prazoAmortizacaoMeses: Number(e.target.value) })}
            />
          </Field>
        </div>
      </SectionCard>

      {/* ── Seção 4: Informações Adicionais ──────────────────────────── */}
      <SectionCard title="Informações Adicionais">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="ID BNDES" error={errors.bndesId}>
            <input
              className={cls('bndesId')}
              value={form.bndesId}
              onChange={(e) => setField({ bndesId: e.target.value })}
            />
          </Field>
          <Field label="Número do Contrato" error={errors.numeroDoContrato}>
            <input
              className={cls('numeroDoContrato')}
              value={form.numeroDoContrato}
              onChange={(e) => setField({ numeroDoContrato: e.target.value })}
            />
          </Field>
          <Field label="Modalidade de Apoio" error={errors.modalidadeDeApoio}>
            <input
              className={cls('modalidadeDeApoio')}
              value={form.modalidadeDeApoio}
              onChange={(e) => setField({ modalidadeDeApoio: e.target.value })}
            />
          </Field>
          <Field label="Custo Financeiro" error={errors.custoFinanceiro}>
            <input
              className={cls('custoFinanceiro')}
              value={form.custoFinanceiro}
              onChange={(e) => setField({ custoFinanceiro: e.target.value })}
            />
          </Field>
          <Field label="Juros (%)" error={errors.juros}>
            <input
              type="number"
              step="0.01"
              min="0"
              className={cls('juros')}
              value={form.juros || ''}
              onChange={(e) => setField({ juros: Number(e.target.value) })}
            />
          </Field>
          <Field label="Fonte de Recurso" error={errors.fonteDeRecursoDesembolsos}>
            <input
              className={cls('fonteDeRecursoDesembolsos')}
              value={form.fonteDeRecursoDesembolsos}
              onChange={(e) => setField({ fonteDeRecursoDesembolsos: e.target.value })}
            />
          </Field>
          <Field label="Área Operacional" error={errors.areaOperacional}>
            <input
              className={cls('areaOperacional')}
              value={form.areaOperacional}
              onChange={(e) => setField({ areaOperacional: e.target.value })}
            />
          </Field>
          <Field label="Tipo de Garantia" error={errors.tipoDeGarantia}>
            <input
              className={cls('tipoDeGarantia')}
              value={form.tipoDeGarantia}
              onChange={(e) => setField({ tipoDeGarantia: e.target.value })}
            />
          </Field>
          <Field label="Tipo de Excepcionalidade" error={errors.tipoDeExcepcionalidade}>
            <input
              className={cls('tipoDeExcepcionalidade')}
              value={form.tipoDeExcepcionalidade}
              onChange={(e) => setField({ tipoDeExcepcionalidade: e.target.value })}
            />
          </Field>
          <Field label="Instituição Financeira Credenciada" error={errors.instituicaoFinanceiraCredenciada}>
            <input
              className={cls('instituicaoFinanceiraCredenciada')}
              value={form.instituicaoFinanceiraCredenciada}
              onChange={(e) => setField({ instituicaoFinanceiraCredenciada: e.target.value })}
            />
          </Field>
          <Field label="CNPJ da Instituição Credenciada" error={errors.cnpjInstituicaoFinanceiraCredenciada}>
            <input
              className={cls('cnpjInstituicaoFinanceiraCredenciada')}
              value={form.cnpjInstituicaoFinanceiraCredenciada}
              onChange={(e) => setField({ cnpjInstituicaoFinanceiraCredenciada: e.target.value })}
            />
          </Field>
          <Field label="Setor CNAE" error={errors.setorCnae}>
            <input
              className={cls('setorCnae')}
              value={form.setorCnae}
              onChange={(e) => setField({ setorCnae: e.target.value })}
            />
          </Field>
          <Field label="Subsetor CNAE" error={errors.subsetorCnaeNome}>
            <input
              className={cls('subsetorCnaeNome')}
              value={form.subsetorCnaeNome}
              onChange={(e) => setField({ subsetorCnaeNome: e.target.value })}
            />
          </Field>
          <Field label="Município (Código IBGE)" error={errors.municipioCodigo}>
            <input
              className={cls('municipioCodigo')}
              value={form.municipioCodigo}
              onChange={(e) => setField({ municipioCodigo: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Descrição do Projeto" error={errors.descricaoDoProjeto}>
          <textarea
            className={`${cls('descricaoDoProjeto')} resize-none`}
            rows={3}
            value={form.descricaoDoProjeto}
            onChange={(e) => setField({ descricaoDoProjeto: e.target.value })}
          />
        </Field>
      </SectionCard>

      {/* ── Actions ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
        >
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
