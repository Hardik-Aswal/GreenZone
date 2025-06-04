export interface ProductDetail {
  id: string;
  title: string;
  brand: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: string;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  delivery: {
    standard: string;
    express?: string;
  };
  seller: string;
  warranty: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}
