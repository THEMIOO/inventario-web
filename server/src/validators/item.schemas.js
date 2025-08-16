import { z } from 'zod';

export const createItemSchema = z.object({
  codigo: z.string().trim().min(1).max(50),
  nombre: z.string().trim().min(2).max(120),
  descripcion: z.string().trim().max(2000).optional().or(z.literal('')),
  cantidad: z.coerce.number().int().min(0),
  precio: z.coerce.number().min(0)
});

export const updateItemSchema = createItemSchema.partial();

export const listQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  q: z.string().optional(),
  sort: z.string().optional()
});