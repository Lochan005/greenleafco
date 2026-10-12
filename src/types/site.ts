import type { JournalEntry } from '@/types/journal';
import type { Product, SanityImage } from '@/types/product';

export interface HomepageContent {
  eyebrow?: string;
  heading?: string;
  introduction?: string;
  heroImage?: SanityImage;
  featuredProducts?: Product[];
  featuredJournalEntries?: JournalEntry[];
  quoteCtaHeading?: string;
  quoteCtaText?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
}
