import { useState } from 'react';
export default function SearchBar({ onSearch, defaultValue = '' }) {
  const [q, setQ] = useState(defaultValue);
  return (
    <div className="flex gap-2">
      <input className="border rounded px-3 py-2 w-full" placeholder="Buscar por código, nombre o descripción..." value={q} onChange={(e) => setQ(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onSearch(q)}>Buscar</button>
    </div>
  );
}