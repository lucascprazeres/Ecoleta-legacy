import express from 'express';

import { celebrate, Joi } from 'celebrate';

import PointsController from './Controllers/PointsController';
import ItemsController from './Controllers/ItemsController';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      uf: Joi.string().required().max(2),
      city: Joi.string().required(),
      items: Joi.string().required()
    }),
  },
  {
    abortEarly: false,
  }),
  pointsController.create
);

export default routes;
