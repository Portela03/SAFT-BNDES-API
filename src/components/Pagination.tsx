interface Props {
  page: number           // 0-based
  totalPages: number
  totalElements: number
  size: number
  onPageChange: (page: number) => void
}

function pageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i)

  const pages: (number | '...')[] = [0]

  if (current > 2) pages.push('...')

  const start = Math.max(1, current - 1)
  const end = Math.min(total - 2, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 3) pages.push('...')

  pages.push(total - 1)
  return pages
}

export default function Pagination({ page, totalPages, totalElements, size, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const from = page * size + 1
  const to = Math.min((page + 1) * size, totalElements)
  const items = pageRange(page, totalPages)

  const btnBase =
    'min-w-[36px] h-9 px-2 rounded-md text-sm font-medium transition flex items-center justify-center'

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white rounded-b-xl">
      {/* Info text */}
      <p className="text-sm text-gray-500">
        Mostrando{' '}
        <span className="font-medium text-gray-700">{from.toLocaleString('pt-BR')}</span>
        {' – '}
        <span className="font-medium text-gray-700">{to.toLocaleString('pt-BR')}</span>
        {' de '}
        <span className="font-medium text-gray-700">{totalElements.toLocaleString('pt-BR')}</span>
        {' resultados'}
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className={`${btnBase} border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ← Anterior
        </button>

        {/* Page numbers */}
        {items.map((item, idx) =>
          item === '...' ? (
            <span key={`dot-${idx}`} className="px-1 text-gray-400 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item as number)}
              className={`${btnBase} border ${
                item === page
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {(item as number) + 1}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`${btnBase} border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          Próxima →
        </button>
      </div>
    </div>
  )
}
