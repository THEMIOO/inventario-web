 

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { resolveUrl } from "../api/resolveUrl"

const schema = z.object({
  codigo: z.string().min(1, "Requerido"),
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  descripcion: z.string().max(2000).optional(),
  cantidad: z.coerce.number().int().min(0),
  precio: z.coerce.number().min(0),
  foto: z.any().optional(),
})

export default function ItemForm({ defaultValues, onSubmit, submitting, currentImageUrl }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const fotoFile = watch("foto")?.[0]

  const previewSrc = fotoFile ? URL.createObjectURL(fotoFile) : currentImageUrl ? resolveUrl(currentImageUrl) : ""

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="bg-secondary p-6">
        <h3 className="text-xl font-heading font-bold text-white">
          {defaultValues?.codigo ? "Editar Producto" : "Nuevo Producto"}
        </h3>
        <p className="text-white/80 font-medium">
          {defaultValues?.codigo ? "Actualiza la información del producto" : "Completa los datos del nuevo producto"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                Código del Producto
              </label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono font-semibold transition-all duration-200"
                {...register("codigo")}
                placeholder="Ej: COMP-001"
              />
              {errors.codigo && <p className="text-destructive text-sm font-medium mt-1">{errors.codigo.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                Nombre del Producto
              </label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-semibold transition-all duration-200"
                {...register("nombre")}
                placeholder="Ej: Laptop Dell Inspiron 15"
              />
              {errors.nombre && <p className="text-destructive text-sm font-medium mt-1">{errors.nombre.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">Cantidad en Stock</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-semibold transition-all duration-200"
                {...register("cantidad")}
                placeholder="0"
                min="0"
              />
              {errors.cantidad && (
                <p className="text-destructive text-sm font-medium mt-1">{errors.cantidad.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">Precio (RD$)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-muted-foreground font-bold">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-semibold transition-all duration-200"
                  {...register("precio")}
                  placeholder="0.00"
                  min="0"
                />
              </div>
              {errors.precio && <p className="text-destructive text-sm font-medium mt-1">{errors.precio.message}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">Descripción</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-all duration-200"
                {...register("descripcion")}
                placeholder="Describe las características principales del producto..."
              />
              {errors.descripcion && (
                <p className="text-destructive text-sm font-medium mt-1">{errors.descripcion.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">Foto del Producto</label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-white file:font-semibold hover:file:bg-secondary/90 transition-all duration-200"
                  {...register("foto")}
                />
                {previewSrc && (
                  <div className="relative">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
                      <img
                        src={previewSrc || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      Vista previa
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-border text-foreground rounded-xl font-heading font-semibold hover:bg-muted transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            disabled={submitting}
            className="bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-heading font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {submitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Guardando...</span>
              </div>
            ) : defaultValues?.codigo ? (
              "Actualizar Producto"
            ) : (
              "Crear Producto"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
