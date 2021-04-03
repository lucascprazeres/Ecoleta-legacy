import knex from '../../database/connection';
import ip from 'ip';

import { Item } from "../../interfaces/Item";
import { IItemsRepository } from '../IItemsRepository';

export class ItemsRepository implements IItemsRepository {
  async all(): Promise<Item[]> {
    const items = await knex('*').from('items');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://${ip.address()}:3333/uploads/${item.image}`,
      }
    });

    return serializedItems;
  }
}