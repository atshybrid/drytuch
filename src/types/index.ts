export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color: string;
  image: string;
  description: string;
  productCount?: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  weight: string;
  image: string;
  images?: string[];
  description: string;
  nutrition?: Record<string, string>;
  tags?: string[];
  bestSeller?: boolean;
  featured?: boolean;
  trending?: boolean;
  origin?: string;
  shelfLife?: string;
  ingredients?: string;
  benefits?: string[];
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest';
