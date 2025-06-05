import { ProductDetail, Review } from "./product";
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
  originalPrice?: number;
  discount?: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  subtitle?: string;
  products: ProductDetail[];
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  startingPrice: string;
}
