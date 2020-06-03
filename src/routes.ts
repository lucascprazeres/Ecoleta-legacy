import express from 'express';

import PointsController from './Controllers/PointsController';
import ItemsController from './Controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

export default routes;
