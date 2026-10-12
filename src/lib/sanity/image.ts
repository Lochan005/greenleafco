import { sanityPublicConfig } from '@/lib/sanity/config';
import type { SanityImage } from '@/types/product';

export function sanityImageUrl(
  image: SanityImage | undefined,
  width: number,
  height: number,
): string | undefined {
  const { projectId, dataset } = sanityPublicConfig;
  const reference = image?.asset?._ref;

  if (!projectId || !dataset || !reference) {
    return undefined;
  }

  const match = reference.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/i);
  if (!match) return undefined;

  const [, assetId, dimensions, format] = match;
  const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
  const params = new URLSearchParams({
    w: String(width),
    h: String(height),
    fit: 'crop',
    auto: 'format',
  });

  return `${base}?${params.toString()}`;
}
