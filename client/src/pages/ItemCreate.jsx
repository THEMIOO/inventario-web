import ItemForm from '../components/ItemForm';
import { useCreateItem } from '../hooks/useItemsQueries';
import { useNavigate } from 'react-router-dom';

export default function ItemCreate() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateItem();

  const onSubmit = async (values) => {
    const form = new FormData();
    for (const [k, v] of Object.entries(values)) {
      if (k === 'foto' && v && v.length) form.append('foto', v[0]);
      else if (v !== undefined && v !== null) form.append(k, v);
    }
    await mutateAsync(form);
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Crear artículo</h2>
      <ItemForm defaultValues={{ cantidad: 0, precio: 0 }} onSubmit={onSubmit} submitting={isPending} />
    </div>
  );
}