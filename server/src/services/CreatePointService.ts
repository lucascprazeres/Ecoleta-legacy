import { inject, injectable } from "tsyringe";
import { ICreatePointDTO, IPointsRepository } from "../repositories/IPointsRepository";

@injectable()
export class CreatePointService {
  constructor(
    @inject("PointsRepository")
    private pointsRepository: IPointsRepository
  ) {}
  
  async execute({
    name,
    email,
    whatsapp,
    image,
    latitude,
    longitude,
    city,
    uf,
    items
  }: ICreatePointDTO) {
    const point = await this.pointsRepository.create({
      name,
      email,
      whatsapp,
      image,
      latitude,
      longitude,
      city,
      uf,
      items
    });

    return point;
  }
}