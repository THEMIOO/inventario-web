import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { resolveUrl } from '../api/resolveUrl';

const schema = z.object({
  codigo: z.string().min(1, 'Requerido'),
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  descripcion: z.string().max(2000).optional(),
  cantidad: z.coerce.number().int().min(0),
  precio: z.coerce.number().min(0),
  foto: z.any().optional()
});

export default function ItemForm({ defaultValues, onSubmit, submitting, currentImageUrl }) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  useEffect(() => { reset(defaultValues); }, [defaultValues, reset]);

  const fotoFile = watch('foto')?.[0];

  const previewSrc = fotoFile
    ? URL.createObjectURL(fotoFile)
    : (currentImageUrl ? resolveUrl(currentImageUrl) : '');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Código</label>
          <input className="w-full border rounded px-3 py-2" {...register('codigo')} />
          {errors.codigo && <p className="text-red-600 text-sm">{errors.codigo.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input className="w-full border rounded px-3 py-2" {...register('nombre')} />
          {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Cantidad</label>
          <input type="number" className="w-full border rounded px-3 py-2" {...register('cantidad')} />
          {errors.cantidad && <p className="text-red-600 text-sm">{errors.cantidad.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Precio (RD$)</label>
          <input type="number" step="0.01" className="w-full border rounded px-3 py-2" {...register('precio')} />
          {errors.precio && <p className="text-red-600 text-sm">{errors.precio.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Descripción</label>
          <textarea rows={4} className="w-full border rounded px-3 py-2" {...register('descripcion')} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Foto</label>
          <input type="file" accept="image/*" {...register('foto')} />
          {previewSrc && (
            <img src={previewSrc} alt="preview" className="mt-2 h-24 w-24 object-cover rounded"
                 onError={(e)=>{ e.currentTarget.style.display='none'; }} />
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
          {submitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}