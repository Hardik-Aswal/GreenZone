export interface ProductDetail {
  id: string;
  title: string;
  brand: string;
  originalPrice: number;
  discount: number;
  description: string;
  images: string[];
  features: string[];
  specifications: Record<string, any>;
  category1: string;
  category2: string;
  sector: string;
  material1: string;
  material2: string;
  weight: number;
  inStock: number;
  carbonImpact: number;
  packagingTypeId: string;
  ecoTags: string[];
  supportsEcoPackaging: boolean;
  deliveryType: string[];
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  reviews?: Review[];
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}
export type Product = ProductDetail;
