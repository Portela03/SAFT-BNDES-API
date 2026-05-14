import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { useInsightsViewModel } from '../viewmodels/useInsightsViewModel'

const BRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const BRL_BI = (v: number) =>
  `R$ ${(v / 1_000_000_000).toFixed(2).replace('.', ',')} bi`

// Gradient colours for the UF chart (blue-700 → blue-300)
const UF_COLORS = [
  '#1d4ed8', '#2563eb', '#3b82f6', '#4b91f7', '#60a5fa',
  '#74b3fb', '#93c5fd', '#a8d4fe', '#bfdbfe', '#d0e8ff',
]

// ─── Skeleton helpers ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-7 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}

function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
      <div className="h-64 bg-gray-100 rounded-lg" />
    </div>
  )
}

// ─── View ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const vm = useInsightsViewModel()

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Financiamentos BNDES</h1>
        <p className="text-sm text-gray-500 mt-1">Dados do Portal de Dados Abertos do BNDES</p>
      </div>

      {/* Error banner */}
      {vm.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {vm.error}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {vm.loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <SummaryCard
              icon="💰"
              iconBg="bg-blue-100"
              label="Total de Operações"
              value={vm.totalOperacoes.toLocaleString('pt-BR')}
              valueColor="text-blue-700"
            />
            <SummaryCard
              icon="🗺️"
              iconBg="bg-green-100"
              label="Estados Atendidos"
              value={String(vm.estadosAtendidos)}
              valueColor="text-green-600"
            />
            <SummaryCard
              icon="🏭"
              iconBg="bg-yellow-100"
              label="Setores BNDES"
              value={String(vm.setoresAtivos)}
              valueColor="text-yellow-600"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vm.loading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            {/* Gráfico 1 — Top 5 Setores (horizontal BarChart) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-5">
                Top 5 Setores Mais Financiados
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={vm.setorData} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <XAxis
                    type="number"
                    tickFormatter={(v) => BRL_BI(v as number)}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="setor"
                    width={160}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v) => [BRL(v as number), 'Total financiado']}
                    cursor={{ fill: '#eff6ff' }}
                  />
                  <Bar dataKey="total" fill="#1d4ed8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico 2 — Total por UF (vertical BarChart, top 10) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-5">
                Financiamento por Estado (Top 10)
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={vm.ufData} margin={{ top: 4, right: 8 }}>
                  <XAxis dataKey="uf" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(v) => BRL_BI(v as number)}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    formatter={(v) => [BRL(v as number), 'Total financiado']}
                    cursor={{ fill: '#eff6ff' }}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {vm.ufData.map((_, i) => (
                      <Cell key={i} fill={UF_COLORS[i % UF_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Sub-components (presentation only) ───────────────────────────────────────
interface SummaryCardProps {
  icon: string
  iconBg: string
  label: string
  value: string
  valueColor: string
}

function SummaryCard({ icon, iconBg, label, value, valueColor }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center text-2xl shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className={`text-3xl font-bold ${valueColor} mt-0.5`}>{value}</p>
      </div>
    </div>
  )
}
