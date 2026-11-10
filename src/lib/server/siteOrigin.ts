/**
 * Canonical site origin for dynamic server routes (sitemap, robots).
 * Uses runtime `process.env` so Vercel env updates apply without relying on a stale build-time value.
 */
export function resolveSiteOrigin(request: Request): string | undefined {
  const fromEnv = process.env.PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  if (import.meta.env.DEV) {
    return new URL(request.url).origin.replace(/\/$/, '');
  }

  return undefined;
}
