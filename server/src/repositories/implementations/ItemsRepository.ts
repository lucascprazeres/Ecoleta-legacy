import knex from '../../database/connection';

import { ICreateItemDTO, Item } from "../../interfaces/Item";
import { IItemsRepository } from '../IItemsRepository';

import { getItemsWithImageUrl } from "../../utils/serialize";

export class ItemsRepository implements IItemsRepository {
  async all(): Promise<Item[]> {
    const items = await knex('*').from('items');
  
    const serializedItems = getItemsWithImageUrl(items);

    return serializedItems;
  }
  async findByTitle(title: string): Promise<Item | undefined> {
    const [item] = await knex('items').where('title', title) as Item[];

    return item;
  }
  async create({ image, title }: ICreateItemDTO): Promise<Item> {
    const insertedIds = await knex('items').insert({ title, image });

    const id = insertedIds[0];

    const itemParams = {
      id,
      title,
      image,
      image_url: '',
    }

    const [item] = getItemsWithImageUrl([itemParams]);
    
    return item;
  }
}