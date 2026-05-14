import { useNavigate } from 'react-router-dom'
import { useNovaOperacaoViewModel } from '../viewmodels/useNovaOperacaoViewModel'
import OperacaoForm from '../components/OperacaoForm'
import Toast from '../components/Toast'
import type { OperacaoCreateRequest } from '../types/Operacao'

const EMPTY: OperacaoCreateRequest = {
  bndesId: '', cliente: '', cnpj: '', descricaoDoProjeto: '',
  uf: '', municipio: '', municipioCodigo: '', numeroDoContrato: '',
  dataDaContratacao: '', valorContratadoReais: 0, valorDesembolsadoReais: 0,
  fonteDeRecursoDesembolsos: '', custoFinanceiro: '', juros: 0,
  prazoCarenciaMeses: 0, prazoAmortizacaoMeses: 0,
  modalidadeDeApoio: '', formaDeApoio: '', produto: '',
  instrumentoFinanceiro: '', inovacao: '', areaOperacional: '',
  setorCnae: '', subsetorCnaeAgrupado: '', subsetorCnaeCodigo: '',
  subsetorCnaeNome: '', setorBndes: '', subsetorBndes: '',
  porteDoCliente: '', naturezaDoCliente: '',
  instituicaoFinanceiraCredenciada: '', cnpjInstituicaoFinanceiraCredenciada: '',
  tipoDeGarantia: '', tipoDeExcepcionalidade: '', situacaoDoContrato: '',
}

export default function NovaOperacaoPage() {
  const navigate = useNavigate()
  const { submitting, toast, handleSubmit, clearToast } = useNovaOperacaoViewModel()

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nova Solicitação de Financiamento</h1>
        <p className="text-sm text-gray-500 mt-0.5">Preencha os dados da nova operação de financiamento BNDES</p>
      </div>

      <OperacaoForm
        initialData={EMPTY}
        onSubmit={handleSubmit}
        submitting={submitting}
        onCancel={() => navigate('/operacoes')}
      />
    </div>
  )
}
