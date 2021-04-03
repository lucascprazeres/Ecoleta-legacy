import { Point } from "../interfaces/Point";

export interface IListPointsDTO {
  city: string;
  uf: string;
  items: string;
}

export interface ICreatePointDTO {
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string; // '0,1,2'...
}


export interface IPointsRepository {
  listByLocationAndItems(data: IListPointsDTO): Promise<Point[]>;
  findById(id: string): Promise<Point | undefined>;
  create(data: ICreatePointDTO): Promise<Point>
}