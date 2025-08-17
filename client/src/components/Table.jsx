"use client"

import { resolveUrl } from "../api/resolveUrl"
import Swal from "sweetalert2"

export default function Table({ rows, onEdit, onDelete }) {
  const handleEdit = async (item) => {
    const result = await Swal.fire({
      title: "¿Editar producto?",
      text: `¿Deseas editar "${item.nombre}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      onEdit(item)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Foto
            </th>
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Precio (RD$)
            </th>
            <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, index) => (
            <tr
              key={r._id}
              className={`hover:bg-muted/30 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
            >
              <td className="px-6 py-4">
                {r.fotoUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
                    <img
                      src={resolveUrl(r.fotoUrl) || "/placeholder.svg"}
                      alt={r.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-sm font-semibold text-foreground bg-muted px-3 py-1 rounded-lg">
                  {r.codigo}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-foreground">{r.nombre}</span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {r.cantidad}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-bold text-lg text-green-600">${r.precio.toLocaleString()}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="px-6 py-12 text-center" colSpan={6}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 00-.707.293h-3.172a1 1 0 00-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-muted-foreground">No hay elementos para mostrar</p>
                    <p className="text-sm text-muted-foreground">Agrega tu primer producto para comenzar</p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
