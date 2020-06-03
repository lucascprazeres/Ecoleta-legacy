import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('*').from('items');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })

  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  const {
    name,
    image,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  const insertedIds = await knex('points').insert({
    name,
    image: 'fake-image',
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    }
  })

  await knex('point_items').insert(pointItems);

  return response.json({ success: true });
})

export default routes;
