import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

//Middleware para expor as imagens do backend, para que possam ser acessadas pelo frontend
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); //Dessa forma, o frontend vai precisar apenas fazer um get na /files/NOME_DA_IMAGEM

//Middleware responsável em fazer a tratativa de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
