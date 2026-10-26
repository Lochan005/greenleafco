import { PUBLIC_SITE_URL } from 'astro:env/client';

export const siteName = 'Greenleaf Company';

/** Set to true when the journal should appear in nav, sitemap, and public routes. */
export const journalEnabled = false;

export const wholesalePhone = {
  display: '+91 9972822077',
  href: 'tel:+919972822077',
} as const;

export const primaryNav = [
  { href: '/products', label: 'Products' },
  { href: '/request-a-quote', label: 'Request a Quote' },
] as const;

export const secondaryNav = [
  { href: '/who-we-serve', label: 'Who We Serve' },
  ...(journalEnabled ? [{ href: '/journal' as const, label: 'Journal' as const }] : []),
  { href: '/about', label: 'About' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/request-a-quote', label: 'Request a Quote' },
] as const;

export const productCategories = [
  'Exotic Vegetables',
  'Herbs',
  'Microgreens',
  'Leafy Greens',
  'Seasonal Produce',
  'Specialty Produce',
  "Nature's Sweets",
] as const;

/** Static menu imagery in `/public`, keyed by category title. */
export const categoryMenuImages = {
  'Exotic Vegetables': 'Exotic Vegetables.jpg',
  Herbs: 'Herbs.png',
  Microgreens: 'Microgreens.png',
  'Leafy Greens': 'Leafy Greens.png',
  'Seasonal Produce': 'Seasonal Produce.jpg',
  'Specialty Produce': 'Speciality Produce.jpg',
  "Nature's Sweets": "Nature's Sweets.png",
} as const satisfies Record<(typeof productCategories)[number], string>;

export function publicAssetPath(filename: string): string {
  return `/${encodeURIComponent(filename)}`;
}

/** Fallback catalogue slug when CMS category documents are not yet published. */
export function categoryTitleToSlug(title: string): string {
  return title.toLowerCase().replace(/'/g, '').replaceAll(' ', '-');
}

export function canonicalUrl(pathname: string): string | undefined {
  if (!PUBLIC_SITE_URL) {
    return undefined;
  }

  const base = PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function absoluteUrl(pathname: string): string | undefined {
  return canonicalUrl(pathname);
}
