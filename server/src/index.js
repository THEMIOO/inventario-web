import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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

//app.use(helmet());
app.use(
  helmet({
    // Permite que otros orígenes (ej. http://localhost:5173) usen recursos del server
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    // Evita activar COEP que puede bloquear recursos si no traen CORP explícito
    crossOriginEmbedderPolicy: false,
    // En dev, desactiva CSP para no pelear con Vite
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use('/uploads', express.static(path.join(__dirname, '..', config.uploadDir)));
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', config.uploadDir), {
    setHeaders: (res) => {
      // CORP permisivo para que 5173 pueda embeber imágenes de 4000
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      // no es estrictamente necesario para <img>, pero ayuda en algunas herramientas
      res.setHeader('Access-Control-Allow-Origin', config.clientOrigin);
    },
  })
);

app.use('/api/items', itemRoutes);
app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(config.port, () => console.log(`Server http://localhost:${config.port}`));