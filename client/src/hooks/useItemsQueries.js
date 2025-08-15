import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/items';

export function useItemsList(params) {
  return useQuery({ queryKey: ['items', params], queryFn: () => api.listItems(params), keepPreviousData: true });
}
export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.createItem, onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }) });
}
export function useUpdateItem(id) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.updateItem(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['items'] }); qc.invalidateQueries({ queryKey: ['item', id] }); }
  });
}
export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteItem, onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }) });
}
export function useItem(id) {
  return useQuery({ queryKey: ['item', id], queryFn: () => api.getItem(id), enabled: !!id });
}