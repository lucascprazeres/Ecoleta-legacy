import { Item } from "../interfaces/Item";

export interface IItemsRepository {
  all(): Promise<Item[]>
}