import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.resolve(config.uploadDir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  if (/^image\/(png|jpe?g|webp)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Formato de imagen no soportado'), false);
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });