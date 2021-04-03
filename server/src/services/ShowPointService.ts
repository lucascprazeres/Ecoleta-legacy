import { inject, injectable } from "tsyringe";
import { IPointsRepository } from "../repositories/IPointsRepository";

@injectable()
export class ShowPointService {
  constructor(
    @inject("PointsRepository")
    private pointsRepostitory: IPointsRepository
  ) {}

  async execute(id: string) {
    const point = await this.pointsRepostitory.findById(id);

    return point;
  }
}