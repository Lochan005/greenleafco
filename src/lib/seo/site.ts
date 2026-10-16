import { PUBLIC_SITE_URL } from 'astro:env/client';

export const siteName = 'Greenleaf Company';

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
  { href: '/journal', label: 'Journal' },
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
