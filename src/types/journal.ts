import type { SanityImage } from '@/types/product';

export interface JournalEntry {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  image?: SanityImage;
  body?: unknown[];
  relatedProducts?: {
    name: string;
    slug: string;
  }[];
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
}
