import { getJournalSlugs, getProductSlugs } from '@/lib/sanity/content';
import { journalEnabled } from '@/lib/seo/site';
import type { APIRoute } from 'astro';
import { PUBLIC_SITE_URL } from 'astro:env/client';

export const prerender = false;

const staticPaths = [
  '/',
  '/products',
  '/who-we-serve',
  '/about',
  '/sustainability',
  ...(journalEnabled ? ['/journal'] : []),
  '/request-a-quote',
];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ request }) => {
  const [productSlugs, journalSlugs] = await Promise.all([
    getProductSlugs(),
    journalEnabled ? getJournalSlugs() : Promise.resolve([]),
  ]);
  const baseUrl = (PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, '');
  const paths = [
    ...staticPaths,
    ...productSlugs.map(({ slug }) => `/products/${slug}`),
    ...(journalEnabled ? journalSlugs.map(({ slug }) => `/journal/${slug}`) : []),
  ];
  const urls = paths
    .map((path) => `<url><loc>${escapeXml(`${baseUrl}${path}`)}</loc></url>`)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    },
  );
};
