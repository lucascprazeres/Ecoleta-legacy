import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import cors from 'cors';
import path from 'path';
import routes from './routes';

import { errors as validationErrors } from 'celebrate';

import "./container";
import { AppError } from "./errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(validationErrors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error'
  })
})

app.listen(3333, () => {
  console.log(`Server avaliable on http://localhost:3333/\n`);
});