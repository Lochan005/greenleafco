import {
  configuredSiteOrigin,
  productionSiteOrigin,
} from '@/lib/seo/siteOrigin';

/**
 * Canonical site origin for dynamic server routes (sitemap, robots).
 * Uses runtime `process.env` on Vercel.
 */
export function resolveSiteOrigin(request: Request): string {
  const processValue = process.env.PUBLIC_SITE_URL;

  if (import.meta.env.PROD) {
    return productionSiteOrigin(processValue);
  }

  return (
    configuredSiteOrigin(processValue) ??
    new URL(request.url).origin.replace(/\/$/, '')
  );
}
