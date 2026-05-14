import { useNavigate } from 'react-router-dom'
import { useImportViewModel } from '../viewmodels/useImportViewModel'

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImportacaoPage() {
  const navigate = useNavigate()
  const vm = useImportViewModel()

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Importar Dados do BNDES</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Carregue operações de financiamento via arquivo CSV ou diretamente do portal
        </p>
      </div>

      {/* ── Cards side by side ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1 — Upload CSV */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Upload de Arquivo CSV</h2>

          {/* Drop zone */}
          <div
            onDragOver={vm.handleDragOver}
            onDragLeave={vm.handleDragLeave}
            onDrop={vm.handleDrop}
            onClick={vm.handleDropZoneClick}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
              ${vm.dragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'}`}
          >
            <input
              ref={vm.fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={vm.handleFileChange}
            />

            {vm.file ? (
              <div className="space-y-1">
                <div className="text-3xl">📄</div>
                <p className="text-sm font-semibold text-blue-700">{vm.file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(vm.file.size)}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); vm.clearFile() }}
                  className="text-xs text-red-500 hover:text-red-700 underline mt-1"
                >
                  Remover arquivo
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl text-blue-400">📁</div>
                <p className="text-sm text-gray-600">
                  Arraste o arquivo CSV aqui ou clique para selecionar
                </p>
                <p className="text-gray-400 text-sm">
                  Formato esperado: CSV com delimitador ; e encoding windows-1252
                </p>
              </div>
            )}
          </div>

          <button
            onClick={vm.handleImportCsv}
            disabled={!vm.file || vm.loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {vm.loading ? 'Importando...' : 'Enviar CSV'}
          </button>
        </div>

        {/* Card 2 — CKAN / Portal BNDES */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">Importar do Portal BNDES</h2>

          <p className="text-sm text-gray-600">
            Baixa automaticamente o arquivo mais recente do Portal de Dados Abertos do BNDES via
            API CKAN.
          </p>

          <div>
            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
              Requer conexão com a internet
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 space-y-1">
            <p className="font-medium text-gray-700">O que será importado:</p>
            <p>• Operações de financiamento direto e indireto</p>
            <p>• Dados atualizados do BNDES Open Data</p>
            <p>• Registros duplicados serão ignorados automaticamente</p>
          </div>

          <div className="flex-1" />

          <button
            onClick={vm.handleImportCkan}
            disabled={vm.loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {vm.loading ? 'Importando...' : 'Importar do BNDES'}
          </button>
        </div>
      </div>

      {/* ── Loading spinner ─────────────────────────────────────────── */}
      {vm.loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-700">Importando dados, aguarde...</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Este processo pode levar alguns minutos dependendo do tamanho do arquivo
            </p>
          </div>
        </div>
      )}

      {/* ── Error banner ────────────────────────────────────────────── */}
      {vm.error && !vm.loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
          <span className="text-red-500 text-xl shrink-0">❌</span>
          <div>
            <p className="text-sm font-semibold text-red-700">Erro na importação</p>
            <p className="text-sm text-red-600 mt-0.5">{vm.error}</p>
          </div>
        </div>
      )}

      {/* ── Result card ─────────────────────────────────────────────── */}
      {vm.result && !vm.loading && (
        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 space-y-5">
          {/* Title */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Importação concluída!</h3>
              {vm.result.message && (
                <p className="text-sm text-gray-500 mt-0.5">{vm.result.message}</p>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 rounded-xl">
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total processado
              </p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {(vm.result.totalImported + vm.result.totalSkipped).toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">registros</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Importados
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {vm.result.totalImported.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">novos registros</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ignorados
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {vm.result.totalSkipped.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">duplicatas</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/operacoes')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Ver Operações
            </button>
            <button
              onClick={vm.clearResult}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Nova Importação
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
