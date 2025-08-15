import { http } from './http';
export const listItems = (params) => http.get('/items', { params }).then(r => r.data);
export const getItem    = (id) => http.get(`/items/${id}`).then(r => r.data);
export const createItem = (data) => http.post('/items', data).then(r => r.data);
export const updateItem = (id, data) => http.put(`/items/${id}`, data).then(r => r.data);
export const deleteItem = (id) => http.delete(`/items/${id}`).then(r => r.data);
export const updateStock = (id, cantidad) => http.patch(`/items/${id}/stock`, { cantidad }).then(r => r.data);