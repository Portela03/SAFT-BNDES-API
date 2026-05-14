interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium max-w-sm
        ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
      <span className="text-base shrink-0">{type === 'success' ? '✅' : '❌'}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/70 hover:text-white text-xl leading-none shrink-0"
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  )
}
