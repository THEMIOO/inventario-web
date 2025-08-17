export default function Pagination({ page, totalPages, onPage }) {
  return (
    <div className="flex items-center gap-3">
      <button
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="cursor-pointer  px-4 py-2 bg-secondary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90 transition-colors"
      >
        Anterior
      </button>
      <span className="text-sm font-medium text-foreground px-3">
        Página {page} de {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="cursor-pointer  px-4 py-2 bg-secondary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90 transition-colors"
      >
        Siguiente
      </button>
    </div>
  )
}