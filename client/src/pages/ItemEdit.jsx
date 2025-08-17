import { useParams, useNavigate } from 'react-router-dom';
import { useItem, useUpdateItem } from '../hooks/useItemsQueries';
import ItemForm from '../components/ItemForm';

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useItem(id);
  const { mutateAsync, isPending } = useUpdateItem(id);

  if (isLoading) return <div>Cargando...</div>;

  const defaults = {
    codigo: data.codigo,
    nombre: data.nombre,
    descripcion: data.descripcion || '',
    cantidad: data.cantidad,
    precio: data.precio
  };

  const onSubmit = async (values) => {
    const form = new FormData();
    for (const [k, v] of Object.entries(values)) {
      if (k === 'foto' && v && v.length) form.append('foto', v[0]);
      else form.append(k, v ?? '');
    }
    await mutateAsync(form);
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <ItemForm
        defaultValues={defaults}
        onSubmit={onSubmit}
        submitting={isPending}
        currentImageUrl={data.fotoUrl} // 👈 importante
      />
    </div>
  );
}