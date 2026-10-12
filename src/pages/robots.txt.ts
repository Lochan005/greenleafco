import type { APIRoute } from 'astro';
import { PUBLIC_SITE_URL } from 'astro:env/client';

export const GET: APIRoute = () => {
  const baseUrl = PUBLIC_SITE_URL?.replace(/\/$/, '');
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
