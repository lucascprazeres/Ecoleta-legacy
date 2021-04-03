import knex from '../../database/connection';

import { Item } from "../../interfaces/Item";
import { IItemsRepository } from '../IItemsRepository';

import { getItemsWithImageUrl } from "../../utils/serialize";

export class ItemsRepository implements IItemsRepository {
  async all(): Promise<Item[]> {
    const items = await knex('*').from('items');
  
    const serializedItems = getItemsWithImageUrl(items);

    return serializedItems;
  }
}