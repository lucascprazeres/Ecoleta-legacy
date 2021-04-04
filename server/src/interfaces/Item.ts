export interface ICreateItemDTO {
  title: string;
  image: string;
}

export interface Item {
  id: number;
  title: string;
  image: string;
  image_url: string;
}