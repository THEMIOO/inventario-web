import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import itemRoutes from './routes/item.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
await connectDB();

// Seguridad y parsers
app.use(helmet());
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(mongoSanitize());
// app.use(xss());
app.use(compression());
app.use(morgan('dev'));

// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', config.uploadDir)));

// Rutas
app.use('/api/items', itemRoutes);
app.get('/health', (_req, res) => res.json({ ok: true }));

// Errores
app.use(errorHandler);

// Listen
app.listen(config.port, () => {
  console.log(`Server escuchando en http://localhost:${config.port}`);
});