import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ItemsList from './pages/ItemsList';
import ItemCreate from './pages/ItemCreate';
import ItemEdit from './pages/ItemEdit';

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ItemsList />} />
            <Route path="/create" element={<ItemCreate />} />
            <Route path="/edit/:id" element={<ItemEdit />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}