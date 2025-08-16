import { Item } from '../models/Item.js';
import { buildQuery } from '../utils/apiFeatures.js';
import { config } from '../config/env.js';

// '/uploads/x.jpg' -> 'http://localhost:4000/uploads/x.jpg'
const toAbsolute = (url) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const prefix = config.publicBaseUrl.replace(/\/$/, '');
  return `${prefix}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const listItems = async (req, res) => {
  const { page = '1', limit = '10', q = '', sort } = req.validatedQuery || {};
  const pageNum = Math.max(parseInt(page, 10), 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10), 1), 100);

  const baseQuery = buildQuery(Item, { q, sort });
  const [items, total] = await Promise.all([
    baseQuery.skip((pageNum - 1) * limitNum).limit(limitNum).lean(),
    buildQuery(Item, { q, sort }).countDocuments()
  ]);

  const normalized = items.map(it => ({ ...it, fotoUrl: toAbsolute(it.fotoUrl) }));
  res.json({ data: normalized, page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) });
};

export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: 'No encontrado' });
  res.json({ ...item, fotoUrl: toAbsolute(item.fotoUrl) });
};

export const createItem = async (req, res) => {
  const payload = req.validatedBody;
  if (req.file) {
    payload.fotoUrl = toAbsolute(`/uploads/${req.file.filename}`);
  }

  const exists = await Item.findOne({ codigo: payload.codigo });
  if (exists) return res.status(409).json({ message: 'Código ya existe' });

  const item = await Item.create(payload);
  res.status(201).json({ ...item.toObject(), fotoUrl: toAbsolute(item.fotoUrl) });
};

export const updateItem = async (req, res) => {
  const payload = req.validatedBody;
  if (req.file) {
    payload.fotoUrl = toAbsolute(`/uploads/${req.file.filename}`);
  }

  const updated = await Item.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).lean();
  if (!updated) return res.status(404).json({ message: 'No encontrado' });
  res.json({ ...updated, fotoUrl: toAbsolute(updated.fotoUrl) });
};

export const deleteItem = async (req, res) => {
  const deleted = await Item.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};

export const updateStock = async (req, res) => {
  const { cantidad } = req.body;
  if (typeof cantidad !== 'number' || cantidad < 0) return res.status(400).json({ message: 'cantidad inválida' });

  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    { $set: { cantidad } },
    { new: true, runValidators: true }
  ).lean();

  if (!updated) return res.status(404).json({ message: 'No encontrado' });
  res.json({ ...updated, fotoUrl: toAbsolute(updated.fotoUrl) });
};