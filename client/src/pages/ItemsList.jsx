import { useState } from 'react';
import { useItemsList } from '../hooks/useItemsQueries';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { deleteItem } from '../api/items';
import { useNavigate } from 'react-router-dom';

export default function ItemsList() {
  const navigate = useNavigate();
  const [params, setParams] = useState({ page: 1, limit: 10, q: '', sort: '-createdAt' });
  const { data, isLoading } = useItemsList(params);

  const onSearch = (q) => setParams(p => ({ ...p, page: 1, q }));
  const onPage = (page) => setParams(p => ({ ...p, page }));

  const onEdit = (row) => navigate(`/edit/${row._id}`);
  const onDeleteRow = async (row) => {
    if (confirm(`¿Eliminar ${row.nombre}?`)) {
      await deleteItem(row._id);
      setParams(p => ({ ...p })); // refetch
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <SearchBar onSearch={onSearch} defaultValue={params.q} />
        <button onClick={() => navigate('/create')} className="bg-green-600 text-white px-4 py-2 rounded">Nuevo artículo</button>
      </div>

      {isLoading ? <div>Cargando...</div> : (
        <>
          <Table rows={data?.data ?? []} onEdit={onEdit} onDelete={onDeleteRow} />
          <div className="flex justify-end">
            <Pagination page={data.page} totalPages={data.totalPages} onPage={onPage} />
          </div>
        </>
      )}
    </div>
  );
}