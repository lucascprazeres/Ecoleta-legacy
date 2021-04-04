import { Router } from "express";
import { itemsRoutes } from "./items.routes";
import { pointsRoutes } from "./points.routes";

const appRoutes = Router();

appRoutes.use("/items", itemsRoutes);
appRoutes.use("/points", pointsRoutes);

export { appRoutes };