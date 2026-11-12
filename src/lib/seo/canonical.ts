import { PUBLIC_SITE_URL } from 'astro:env/client';

import { configuredSiteOrigin, productionSiteOrigin } from '@/lib/seo/siteOrigin';

/** Canonical origin with no trailing slash. */
export function siteBaseUrl(): string | undefined {
  const processValue =
    typeof process !== 'undefined' ? process.env.PUBLIC_SITE_URL : undefined;

  if (import.meta.env.PROD) {
    return productionSiteOrigin(processValue, PUBLIC_SITE_URL);
  }

  return configuredSiteOrigin(processValue, PUBLIC_SITE_URL);
}

export function canonicalUrl(pathname: string): string | undefined {
  const base = siteBaseUrl();
  if (!base) {
    return undefined;
  }

  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function absoluteUrl(pathname: string): string | undefined {
  return canonicalUrl(pathname);
}
