import { useNavigate } from 'react-router-dom'
import { useOperacoesViewModel } from '../viewmodels/useOperacoesViewModel'
import FiltroBar from '../components/FiltroBar'
import OperacaoTable from '../components/OperacaoTable'
import Pagination from '../components/Pagination'

export default function OperacoesPage() {
  const navigate = useNavigate()
  const vm = useOperacoesViewModel()

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operações de Financiamento</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {vm.totalElements.toLocaleString('pt-BR')} operações encontradas
          </p>
        </div>
        <button
          onClick={() => navigate('/operacoes/nova')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Nova Operação
        </button>
      </div>

      {/* Error banner */}
      {vm.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {vm.error}
        </div>
      )}

      {/* Filters */}
      <FiltroBar
        values={vm.filtroValues}
        onChange={vm.setFiltroValues}
        onFilter={vm.handleFilter}
        onClear={vm.handleClear}
        loading={vm.loading}
      />

      {/* Table + Pagination */}
      <div>
        <OperacaoTable
          operacoes={vm.operacoes}
          loading={vm.loading}
          onVer={(id) => navigate(`/operacoes/${id}`)}
          onEditar={(id) => navigate(`/operacoes/${id}/editar`)}
          onExcluir={vm.handleDeleteRequest}
        />
        <Pagination
          page={vm.currentPage}
          totalPages={vm.totalPages}
          totalElements={vm.totalElements}
          size={20}
          onPageChange={vm.handlePageChange}
        />
      </div>

      {/* Delete confirmation modal */}
      {vm.deleteId != null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Confirmar exclusão</h3>
            <p className="text-sm text-gray-600 mt-2">
              Tem certeza que deseja excluir a operação{' '}
              <span className="font-bold text-gray-800">#{vm.deleteId}</span>? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={vm.handleDeleteCancel}
                disabled={vm.deleting}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={vm.handleDeleteConfirm}
                disabled={vm.deleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
              >
                {vm.deleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
