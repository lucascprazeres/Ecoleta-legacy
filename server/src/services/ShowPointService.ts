import { inject, injectable } from "tsyringe";
import { AppError } from "../errors/AppError";
import { IPointsRepository } from "../repositories/IPointsRepository";

@injectable()
export class ShowPointService {
  constructor(
    @inject("PointsRepository")
    private pointsRepostitory: IPointsRepository
  ) {}

  async execute(id: string) {
    const point = await this.pointsRepostitory.findById(id);

    if (!point) {
      throw new AppError("Point not found", 404);
    }

    return point;
  }
}