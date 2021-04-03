import { inject, injectable } from "tsyringe";
import { Item } from "../interfaces/Item";
import { IItemsRepository } from "../repositories/IItemsRepository";

@injectable()
export class ListItemsService {
  constructor(
    @inject("ItemsRepository")
    private itemsRepository: IItemsRepository
  ) {}
  async execute(): Promise<Item[]> {
    const items = await this.itemsRepository.all();

    return items;
  }
}