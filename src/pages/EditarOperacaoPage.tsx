import { useNavigate, useParams } from 'react-router-dom'
import { useEditarOperacaoViewModel } from '../viewmodels/useEditarOperacaoViewModel'
import OperacaoForm from '../components/OperacaoForm'
import Toast from '../components/Toast'

export default function EditarOperacaoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { initialData, loading, loadError, submitting, toast, handleSubmit, clearToast } =
    useEditarOperacaoViewModel()

  // ── Loading skeleton ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-8 space-y-6 bg-gray-50 min-h-screen animate-pulse">
        <div className="h-7 w-56 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-10 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ── Load error ──────────────────────────────────────────────────────────
  if (loadError || !initialData) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center space-y-4">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900">Operação não encontrada</h2>
          <p className="text-sm text-gray-500">{loadError ?? 'Erro inesperado ao carregar os dados.'}</p>
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

  // ── View ────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Operação #{id}</h1>
        <p className="text-sm text-gray-500 mt-0.5">Altere os dados da operação de financiamento</p>
      </div>

      <OperacaoForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitting={submitting}
        onCancel={() => navigate(`/operacoes/${id}`)}
      />
    </div>
  )
}
