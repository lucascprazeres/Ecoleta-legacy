import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListItemsService } from "../services/ListItemsService";

class ItemsController {
  async index(request: Request, response: Response) {
    const listItems = container.resolve(ListItemsService);

    const items = await listItems.execute();
  
    return response.json(items);
  }
}

export default ItemsController;
