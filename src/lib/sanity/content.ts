import {
  allCategoriesQuery,
  allProductsQuery,
  featuredProductsQuery,
  journalEntriesQuery,
  journalEntryBySlugQuery,
  journalSlugsQuery,
  homepageQuery,
  productBySlugQuery,
  productSlugsQuery,
} from '@/lib/sanity/queries';
import { getSanityClient } from '@/lib/server/sanity';
import type { JournalEntry } from '@/types/journal';
import type { Product, ProductCategory } from '@/types/product';
import type { HomepageContent } from '@/types/site';

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  try {
    return await getSanityClient().fetch<T>(query, params);
  } catch (error) {
    console.warn('Sanity content is unavailable; rendering the safe empty state.', error);
    return fallback;
  }
}

export const getCategories = () =>
  fetchFromSanity<ProductCategory[]>(allCategoriesQuery, {}, []);

export const getProducts = () =>
  fetchFromSanity<Product[]>(allProductsQuery, {}, []);

export const getFeaturedProducts = () =>
  fetchFromSanity<Product[]>(featuredProductsQuery, {}, []);

export const getProductSlugs = () =>
  fetchFromSanity<{ slug: string }[]>(productSlugsQuery, {}, []);

export const getProductBySlug = (slug: string) =>
  fetchFromSanity<Product | null>(productBySlugQuery, { slug }, null);

export const getJournalEntries = () =>
  fetchFromSanity<JournalEntry[]>(journalEntriesQuery, {}, []);

export const getJournalSlugs = () =>
  fetchFromSanity<{ slug: string }[]>(journalSlugsQuery, {}, []);

export const getJournalEntryBySlug = (slug: string) =>
  fetchFromSanity<JournalEntry | null>(journalEntryBySlugQuery, { slug }, null);

export const getHomepage = () =>
  fetchFromSanity<HomepageContent | null>(homepageQuery, {}, null);
