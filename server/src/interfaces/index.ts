export interface IItem {
  id: number;
  title: string;
  image_url: string;
}

export interface IPoint {
  id: number;
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  created_at?: Date;
  updated_at?: Date;
  items?: IItem[];
}
