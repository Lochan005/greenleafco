import { sanityPublicConfig } from '@/lib/sanity/config';
import { SANITY_API_VERSION, SANITY_READ_TOKEN } from 'astro:env/server';
import { createClient, type SanityClient } from '@sanity/client';

export function getSanityClient(): SanityClient {
  const { projectId, dataset } = sanityPublicConfig;

  if (!projectId || !dataset) {
    throw new Error(
      'Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET before querying Sanity.',
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: SANITY_API_VERSION,
    useCdn: !SANITY_READ_TOKEN,
    token: SANITY_READ_TOKEN,
  });
}
