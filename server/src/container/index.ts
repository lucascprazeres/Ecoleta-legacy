import { container } from "tsyringe";
import { IItemsRepository } from "../repositories/IItemsRepository";
import { ItemsRepository } from "../repositories/implementations/ItemsRepository";
import { IPointsRepository } from "../repositories/IPointsRepository";
import { PointsRepository } from "../repositories/implementations/PointsRepository";

container.registerSingleton<IItemsRepository>("ItemsRepository", ItemsRepository);

container.registerSingleton<IPointsRepository>("PointsRepository", PointsRepository);