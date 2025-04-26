import { LIST_ERRORS_HTTP } from "./modules/error.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { join } from "node:path";

const app = express();
app.use(cors());
app.use(helmet());

const __dirname = import.meta.dirname;
const imageBasePath = join(__dirname, "public", "images");

app.get('/:statusCode(.+)', (req, res, next) => {
  let statusCode = req.params.statusCode;

  if (statusCode.endsWith('.jpg')) {
    statusCode = statusCode.replace('.jpg', '');
  }

  statusCode = Number(statusCode);
  const existObject = LIST_ERRORS_HTTP.some(el => el.statusCode === statusCode);
  if (!existObject) return next();

  const image = join(imageBasePath, `${statusCode}.jpg`);
  
  res.type('jpg');
  res.status(200).sendFile(image);
});


app.use((_, res) => {
  const image404 = join(imageBasePath, '404.jpg');
  res.type('jpg');
  res.status(404).sendFile(image404);
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT ?? 8000;
  app.listen(port, () => {
    console.log(`Server Open in http://localhost:${port}`);
  });
}

export default app;
