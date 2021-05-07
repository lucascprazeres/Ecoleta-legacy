import { Request, Response } from "express";

import { PointsRepository } from "../repositories/PointsRepository";

const pointsRepository = new PointsRepository();

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const points = await pointsRepository.listByLocationAndItems({
      city: String(city),
      uf: String(uf),
      items: String(items),
    });

    return response.json(points);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const { point, items } = await pointsRepository.findById(id);

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;
    const image = request.file.filename;

    const point = await pointsRepository.create({
      name,
      email,
      image,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    });

    return response.json(point);
  }
}

export default PointsController;
