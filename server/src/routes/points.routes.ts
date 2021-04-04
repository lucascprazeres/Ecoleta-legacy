import express from 'express';

import { celebrate, Joi } from 'celebrate';

import multer from 'multer';

import PointsController from '../controllers/PointsController';

import multerConfig from '../config/multer';

const pointsRoutes = express.Router();

const upload = multer(multerConfig['points']);

const pointsController = new PointsController();

pointsRoutes.get('/', pointsController.index);
pointsRoutes.get('/:id', pointsController.show);

pointsRoutes.post(
  '/',
  upload.single('image'),
  celebrate(
    {
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

export { pointsRoutes };
