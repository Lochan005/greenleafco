import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import {
  PRODUCTION_SITE_ORIGIN,
  configuredSiteOrigin,
} from './src/lib/seo/siteOrigin.ts';
import { defineConfig, envField } from 'astro/config';
import { fileURLToPath } from 'node:url';

const siteUrl = configuredSiteOrigin(process.env.PUBLIC_SITE_URL) ?? PRODUCTION_SITE_ORIGIN;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      SANITY_API_VERSION: envField.string({
        context: 'server',
        access: 'public',
        default: '2026-01-01',
      }),
      SANITY_READ_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      RESEND_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      WHOLESALE_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
