import { container } from "tsyringe";
import { IItemsRepository } from "../repositories/IItemsRepository";
import { ItemsRepository } from "../repositories/implementations/ItemsRepository";

container.registerSingleton<IItemsRepository>("ItemsRepository", ItemsRepository);
