export default function Pagination({ page, totalPages, onPage }) {
  return (
    <div className="flex items-center gap-2">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <span className="text-sm">Página {page} de {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  );
}