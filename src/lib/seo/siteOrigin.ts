/** Primary indexed host when env is missing or points at a deployment URL. */
export const PRODUCTION_SITE_ORIGIN = 'https://www.greenleafcompany.co.in';

function isDisallowedOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname.toLowerCase();
    return host === 'vercel.app' || host.endsWith('.vercel.app');
  } catch {
    return true;
  }
}

/** Normalizes and rejects preview/deployment hosts. */
export function normalizeSiteOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const origin = value.trim().replace(/\/$/, '');
  if (!/^https?:\/\//i.test(origin) || isDisallowedOrigin(origin)) {
    return undefined;
  }

  return origin;
}

export function configuredSiteOrigin(
  processEnvValue?: string,
  astroEnvValue?: string,
): string | undefined {
  return (
    normalizeSiteOrigin(processEnvValue) ?? normalizeSiteOrigin(astroEnvValue)
  );
}

/** Production-safe origin: never `.vercel.app`, always a public domain. */
export function productionSiteOrigin(
  processEnvValue: string | undefined = typeof process !== 'undefined'
    ? process.env.PUBLIC_SITE_URL
    : undefined,
  astroEnvValue?: string,
): string {
  return (
    configuredSiteOrigin(processEnvValue, astroEnvValue) ?? PRODUCTION_SITE_ORIGIN
  );
}
