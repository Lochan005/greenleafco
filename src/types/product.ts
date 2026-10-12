export interface ProductCategory {
  id?: string;
  title: string;
  slug: string;
  description?: string;
}

export type ProductAttribute =
  | 'availableNow'
  | 'seasonal'
  | 'hydroponic'
  | 'chefFavourite'
  | 'newArrival';

export type ProductAvailability =
  | 'available-now'
  | 'seasonal'
  | 'enquire'
  | 'unavailable';

export interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category?: ProductCategory;
  shortDescription?: string;
  description?: unknown[];
  primaryImage?: SanityImage;
  gallery?: SanityImage[];
  availability?: ProductAvailability;
  growingMethod?: string;
  badges?: string[];
  suitableFor?: string[];
  packSizes?: string[];
  culinaryUses?: string[];
  storageAndHandling?: string;
  featured?: boolean;
  relatedProducts?: Product[];
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
}
