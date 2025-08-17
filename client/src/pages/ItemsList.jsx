"use client"

import { useState } from "react"
import { useItemsList } from "../hooks/useItemsQueries"
import Table from "../components/Table"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import { deleteItem } from "../api/items"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function ItemsList() {
  const navigate = useNavigate()
  const [params, setParams] = useState({ page: 1, limit: 10, q: "", sort: "-createdAt", _refresh: Date.now() })
  const { data, isLoading } = useItemsList(params)

  const onSearch = (q) => setParams((p) => ({ ...p, page: 1, q }))
  const onPage = (page) => setParams((p) => ({ ...p, page }))

  const onEdit = (row) => navigate(`/edit/${row._id}`)

  const onDeleteRow = async (row) => {
    

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar "${row.nombre}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Verde (secondary color)
      cancelButtonColor: "#6b7280", // Gris
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      focusCancel: true,
    })

    if (result.isConfirmed) {
      try {
        
        await deleteItem(row._id)

        // Success message
        await Swal.fire({
          title: "¡Eliminado!",
          text: `"${row.nombre}" ha sido eliminado correctamente.`,
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 2000,
          showConfirmButton: false,
        })

        
        setParams((p) => ({ ...p, _refresh: Date.now() }))
      } catch (error) {
        console.log(" Error deleting item:", error)
        // Error message
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonColor: "#10b981",
        })
      }
    }
  }

  const stats = data?.data
    ? {
        totalProducts: data.data.length,
        totalUnits: data.data.reduce((sum, item) => sum + item.cantidad, 0),
        totalValue: data.data.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
      }
    : { totalProducts: 0, totalUnits: 0, totalValue: 0 }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading font-black text-foreground">GESTIÓN DE INVENTARIO</h2>
            <p className="text-lg text-muted-foreground font-medium">
              Administra tu inventario de productos de manera eficiente
            </p>
          </div>
          <button
            onClick={() => navigate("/create")}
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            AGREGAR PRODUCTO
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-heading font-black text-green-700">{stats.totalProducts}</p>
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Total Productos</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-heading font-black text-blue-700">{stats.totalUnits}</p>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Total Unidades</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-heading font-black text-accent">${stats.totalValue.toLocaleString()}</p>
                <p className="text-sm font-semibold text-accent/80 uppercase tracking-wide">Valor Total</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <SearchBar onSearch={onSearch} defaultValue={params.q} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground font-medium">Cargando...</span>
          </div>
        ) : (
          <>
            <Table rows={data?.data ?? []} onEdit={onEdit} onDelete={onDeleteRow} />
            {data?.totalPages > 1 && (
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex justify-end">
                  <Pagination page={data.page} totalPages={data.totalPages} onPage={onPage} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
