import knex from "../database/connection";

interface IListPointsDTO {
  city: string;
  uf: string;
  items: string;
}

interface ICreatePointDTO {
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string; // '0,1,2'...
}

export class PointsRepository {
  async listByLocationAndItems({ city, uf, items }: IListPointsDTO) {
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://localhost:3333/uploads/${point.image}`,
      };
    });

    return serializedPoints;
  }

  async findById(id: string) {
    const point = await knex("points").where("id", id).first();

    if (!point) {
      throw new Error("Point not found.");
    }

    const serializedPoint = {
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    };

    /*
      SELECT * FROM items
      JOIN point_id on items.id = point_items.item_id
      WHERE point_items.point_id = (id)
    */

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return {
      point: serializedPoint,
      items,
    };
  }

  async create({
    name,
    image,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  }: ICreatePointDTO) {
    const trx = await knex.transaction();

    const point = {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return {
      id: point_id,
      ...point,
    };
  }
}
