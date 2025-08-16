import { resolveUrl } from '../api/resolveUrl';

export default function Table({ rows, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border rounded bg-white">
      <table className="w-full">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">Foto</th><th className="p-3">Código</th><th className="p-3">Nombre</th>
            <th className="p-3">Cantidad</th><th className="p-3">Precio (RD$)</th><th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id} className="border-t">
              <td className="p-3">
                {r.fotoUrl
                  ? <img src={resolveUrl(r.fotoUrl)} alt={r.nombre} className="h-12 w-12 object-cover rounded"
                         onError={(e) => { e.currentTarget.style.display='none'; }} />
                  : '—'}
              </td>
              <td className="p-3">{r.codigo}</td>
              <td className="p-3">{r.nombre}</td>
              <td className="p-3">{r.cantidad}</td>
              <td className="p-3">{r.precio.toLocaleString()}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onEdit(r)} className="px-3 py-1 border rounded">Editar</button>
                <button onClick={() => onDelete(r)} className="px-3 py-1 border rounded text-red-600">Borrar</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td className="p-4 text-center" colSpan={6}>Sin resultados</td></tr>}
        </tbody>
      </table>
    </div>
  );
}