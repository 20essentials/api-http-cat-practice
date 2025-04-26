import { LIST_ERRORS_HTTP } from './modules/error.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url'; // <- importante para __dirname en ESM

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;

const app = express();
app.use(cors());
app.use(helmet());

const imageBasePath = join(__dirname, 'public', 'images');

// Ruta que acepta /100 o /100.jpg
app.get('/:statusCode(.+)', (req, res, next) => {
  const statusCode = Number(req.params.statusCode.replace('.jpg', ''));
  const existObject = LIST_ERRORS_HTTP.some(el => el.statusCode === statusCode);
  if (!existObject) return next();
  const image = join(imageBasePath, `${statusCode}.jpg`);
  res.status(200).sendFile(image);
});

// Manejo de 404
app.use((_, res) => {
  const image404 = join(imageBasePath, '404.jpg');
  res.status(404).sendFile(image404);
});

// 👇 Solo exportas el handler, no haces app.listen
export default app;
