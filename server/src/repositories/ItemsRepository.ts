import knex from "../database/connection";
import { IItem } from "../interfaces";

export class ItemsRepository {
  async all(): Promise<IItem[]> {
    const items = await knex("*").from("items");

    const serializedItems = items.map((item) => {
      return {
        id: item.id as number,
        title: item.title as string,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return serializedItems;
  }
}
