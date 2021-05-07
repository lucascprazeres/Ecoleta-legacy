import { Request, Response } from "express";

import { ItemsRepository } from "../repositories/ItemsRepository";

const itemsRepository = new ItemsRepository();

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await itemsRepository.all();

    return response.json(items);
  }
}

export default ItemsController;
