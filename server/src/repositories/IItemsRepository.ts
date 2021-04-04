import { ICreateItemDTO, Item } from "../interfaces/Item";

export interface IItemsRepository {
  all(): Promise<Item[]>;
  findByTitle(title: string): Promise<Item | undefined>;
  create(data: ICreateItemDTO): Promise<Item>;
}