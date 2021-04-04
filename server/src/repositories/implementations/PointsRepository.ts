import knex from '../../database/connection';
import { v4 as uuidv4 } from 'uuid';

import { IListPointsDTO, ICreatePointDTO, IPointsRepository } from '../IPointsRepository';
import { Point } from '../../interfaces/Point';
import { getPointsWithImageUrl, parseItemsIntoNumbers } from '../../utils/serialize';


export class PointsRepository implements IPointsRepository {
  async listByLocationAndItems({ city, uf, items }: IListPointsDTO) {
    const parsedItems = parseItemsIntoNumbers(String(items));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = getPointsWithImageUrl(points);

    return serializedPoints;
  }

  async findById(id: string): Promise<Point | undefined> {
    const point = await knex('points').where('id', id).first();

    if (!point) {
      return undefined;
    }

    const [ serializedPoint ] = getPointsWithImageUrl([point]);

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return {
      ...serializedPoint,
      items
    }
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
    items
  }: ICreatePointDTO): Promise<Point> {
    const trx = await knex.transaction();

    const point = {
      id: uuidv4(),
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point, 'id');

    const point_id = insertedIds[0] as string;

    const pointItems = parseItemsIntoNumbers(items).map((item_id: number) => {
        return {
          item_id,
          point_id,
        }
      })

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return {
      id: point_id,
      ...point,
    }
  }
}