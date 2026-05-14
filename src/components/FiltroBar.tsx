import type { FiltroValues } from '../viewmodels/useOperacoesViewModel'

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const inputCls =
  'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'

interface Props {
  values: FiltroValues
  onChange: React.Dispatch<React.SetStateAction<FiltroValues>>
  onFilter: () => void
  onClear: () => void
  loading: boolean
}

export default function FiltroBar({ values, onChange, onFilter, onClear, loading }: Props) {
  const set = (field: keyof FiltroValues, value: string) =>
    onChange((prev) => ({ ...prev, [field]: value }))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onFilter()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap gap-4 items-end">
      {/* UF select */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Estado (UF)</label>
        <select
          className={`${inputCls} w-32`}
          value={values.uf}
          onChange={(e) => set('uf', e.target.value)}
        >
          <option value="">Todos</option>
          {UFS.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
      </div>

      {/* Setor BNDES */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Setor BNDES</label>
        <input
          className={`${inputCls} w-52`}
          placeholder="Ex: Indústria"
          value={values.setor}
          onChange={(e) => set('setor', e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Valor mínimo */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Valor mínimo (R$)</label>
        <input
          type="number"
          min={0}
          className={`${inputCls} w-44`}
          placeholder="Ex: 100000"
          value={values.valorMinimo}
          onChange={(e) => set('valorMinimo', e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onFilter}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          Filtrar
        </button>
        <button
          onClick={onClear}
          disabled={loading}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Limpar
        </button>
      </div>
    </div>
  )
}
