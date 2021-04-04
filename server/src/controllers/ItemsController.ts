import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListItemsService } from "../services/ListItemsService";
import { CreateItemService } from "../services/CreateItemService";

class ItemsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(ListItemsService);

    const items = await listItems.execute();
  
    return response.json(items);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;
    const image = request.file.filename;
    
    const createItem = container.resolve(CreateItemService);
    const item = await createItem.execute({ title, image });

    return response.status(201).json(item);
  }
}

export default ItemsController;
