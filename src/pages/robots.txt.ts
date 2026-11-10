import { resolveSiteOrigin } from '@/lib/server/siteOrigin';
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const baseUrl = resolveSiteOrigin(request);
  const lines = ['User-agent: *', 'Allow: /'];

  if (baseUrl) {
    lines.push(`Sitemap: ${baseUrl}/sitemap.xml`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
