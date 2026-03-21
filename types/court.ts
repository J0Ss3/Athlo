export type Court = {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  rating?: number;
  imageUrl?: string;
  featured?: boolean;
  popular?: boolean;
};
