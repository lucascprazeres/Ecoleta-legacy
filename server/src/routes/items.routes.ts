import { Router } from "express";

import multer from "multer";

import { celebrate, Joi } from "celebrate";

import ItemsController from "../controllers/ItemsController";

import multerConfig from "../config/multer";

const itemsRoutes = Router();

const itemsController = new ItemsController();

const upload = multer(multerConfig['items']);

itemsRoutes.get('/', itemsController.index);
itemsRoutes.post('/',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({ title: Joi.string().required() }),
  }),
  itemsController.create
);

export { itemsRoutes };