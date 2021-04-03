import { Item } from "./Item";

export interface Point {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  image: string;
  image_url?: string;
  city: string;
  uf: string;
  items?: Item[];
}