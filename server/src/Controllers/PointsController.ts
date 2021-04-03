import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPointsByLocationAndItemsService } from "../services/ListPointsByLocationAndItemsService";
import { ShowPointService } from "../services/ShowPointService";
import { CreatePointService } from "../services/CreatePointService";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const listPointsByLocationAndItems = container.resolve(
      ListPointsByLocationAndItemsService,
    )

    const points = await listPointsByLocationAndItems.execute({
      city: String(city),
      uf: String(uf),
      items: String(items),
    })

    return response.json(points);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const showPoint = container.resolve(ShowPointService);

    const point = await showPoint.execute(id);

    return response.json(point);
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
      items
    } = request.body;
    const image = request.file.filename

    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({
      name,
      email,
      image,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    })

    return response.json(point);
  }
}

export default PointsController;