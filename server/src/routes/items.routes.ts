import { Router } from "express";
import ItemsController from "../controllers/ItemsController";

const itemsRoutes = Router();

const itemsController = new ItemsController();

itemsRoutes.get('/', itemsController.index);

export { itemsRoutes };