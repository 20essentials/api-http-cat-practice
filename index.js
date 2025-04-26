import { LIST_ERRORS_HTTP } from './modules/error.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'node:path';

const app = express();
app.use(cors());
app.use(helmet());
const port = process.env.PORT ?? 8000;
const __dirname = import.meta.dirname;
const imageBasePath = join(__dirname, 'images');

app.get('/:statusCode', (req, res, next) => {
  const statusCode = Number(req.params.statusCode);
  const existObject = LIST_ERRORS_HTTP.some(el => el.statusCode === statusCode);
  if (!existObject) return next();
  const image = join(imageBasePath, `${statusCode}.jpg`);
  res.status(200).sendFile(image);
});

app.use((_, res) => {
  const image404 = join(imageBasePath, '404.jpg');
  res.status(404).sendFile(image404);
});

app.listen(port, () => {
  console.log(`Server Open in http://localhost:${port}`);
});
