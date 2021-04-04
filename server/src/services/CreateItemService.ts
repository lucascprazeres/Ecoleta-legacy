import { inject, injectable } from "tsyringe";
import { AppError } from "../errors/AppError";
import { ICreateItemDTO, Item } from "../interfaces/Item";
import { IItemsRepository } from "../repositories/IItemsRepository";
import { ItemsRepository } from "../repositories/implementations/ItemsRepository";

@injectable()
export class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}
  
  async execute({ title, image }: ICreateItemDTO): Promise<Item> {
    const itemAlreadyExists = await this.itemsRepository.findByTitle(title);

    if (itemAlreadyExists) {
      throw new AppError("Item already exists.", 400);
    }
    
    const item = await this.itemsRepository.create({ title, image });

    return item;
  }
}