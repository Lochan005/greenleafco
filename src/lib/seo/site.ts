import { PUBLIC_SITE_URL } from 'astro:env/client';

export const siteName = 'Greenleaf Co';

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
] as const;

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
