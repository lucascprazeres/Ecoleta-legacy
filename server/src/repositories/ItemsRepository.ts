import knex from "../database/connection";

export class ItemsRepository {
  async all() {
    const items = await knex("*").from("items");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return serializedItems;
  }
}
