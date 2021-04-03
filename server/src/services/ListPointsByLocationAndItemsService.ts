import { inject, injectable } from "tsyringe";
import { IListPointsDTO, IPointsRepository } from "../repositories/IPointsRepository";

@injectable()
export class ListPointsByLocationAndItemsService {
  constructor(
    @inject("PointsRepository")
    private pointsRepository: IPointsRepository,
  ){}
  
  async execute({ city, uf, items }: IListPointsDTO) {
    const points = await this.pointsRepository.listByLocationAndItems({
      city,
      uf,
      items,
    });

    return points;
  }
}