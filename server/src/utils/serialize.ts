import { Item } from "../interfaces/Item";
import { Point } from "../interfaces/Point";

export function getItemsWithImageUrl(items: Item[]) {
  return items.map((item: Item) => ({
    ...item,
    image_url: `http://localhost:3333/uploads/${item.image}`,
  }));
}

export function getPointsWithImageUrl(points: Point[]) {
  return points.map((point: Point) => ({
    ...point,
    image_url: `http://localhost:3333/uploads/point_images/${point.image}`,
  }));
}

export function parseItemsIntoNumbers(items: string) {
  return items
    .split(',')
    .map(item => Number(item.trim()))
}