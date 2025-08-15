import { Router } from 'express';
import { listItems, getItem, createItem, updateItem, deleteItem, updateStock } from '../controllers/item.controller.js';
import { validateBody, validateQuery } from '../middlewares/validate.js';
import { createItemSchema, updateItemSchema, listQuerySchema } from '../validators/item.schemas.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.get('/', validateQuery(listQuerySchema), listItems);
router.get('/:id', getItem);
router.post('/', upload.single('foto'), validateBody(createItemSchema), createItem);
router.put('/:id', upload.single('foto'), validateBody(updateItemSchema), updateItem);
router.delete('/:id', deleteItem);
router.patch('/:id/stock', updateStock);

export default router;