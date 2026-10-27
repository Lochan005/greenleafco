/** Partner lists for the Who We Serve brand gallery. */
export type PartnerCategoryId =
  | 'hospitality'
  | 'retail-commerce'
  | 'specialty-institutional';

export interface PartnerBrand {
  id: string;
  name: string;
}

export interface PartnerCategory {
  id: PartnerCategoryId;
  title: string;
  brands: PartnerBrand[];
  /** When set, only this many brands show until the visitor expands the list. */
  initialVisibleCount?: number;
  expandLabel?: string;
}

/** Filename under `/public/partners/` when an authentic logo is added. Keyed by brand `id`. */
export const partnerLogoFiles: Partial<Record<string, string>> = {
  // Example: 'pizza-4ps': 'pizza-4ps.svg',
};

export function partnerLogoSrc(brandId: string): string | undefined {
  const filename = partnerLogoFiles[brandId];
  if (!filename) return undefined;
  return `/${['partners', filename].map((segment) => encodeURIComponent(segment)).join('/')}`;
}

/** Minimum hospitality partners before expand; gallery rounds up to full grid rows. */
export const hospitalityInitialVisibleCount = 9;

export function partnerGridVisibleCount(
  total: number,
  minimum: number,
  columnCount: number,
): number {
  if (minimum >= total) return total;
  const filledRows = Math.ceil(minimum / columnCount);
  return Math.min(total, filledRows * columnCount);
}

export const partnerCategories: PartnerCategory[] = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    initialVisibleCount: hospitalityInitialVisibleCount,
    expandLabel: 'View all hospitality partners',
    brands: [
      { id: 'pizza-4ps', name: 'Pizza 4Ps' },
      { id: 'copper-and-clove', name: 'Copper and Clove' },
      { id: 'order-4-health', name: 'Order 4 Health' },
      { id: 'amintiri-cafe', name: 'Amintiri Cafe' },
      { id: 'vanamo-global-eats-and-caffeinary', name: 'Vanamo Global Eats and Caffeinary' },
      { id: 'locolane', name: 'Locolane' },
      { id: 'the-scene', name: 'The Scene' },
      { id: 'spectracolare', name: 'Spectracolare' },
      { id: 'panetteria', name: 'Panetteria' },
      { id: 'comedor', name: 'Comedor' },
      { id: 'ban-pad-thai', name: 'Ban Pad Thai' },
      { id: 'the-fresh-factory', name: 'The Fresh Factory' },
      { id: 'mon-cheri-resto-cafe', name: 'Mon Cheri Resto Cafe' },
      { id: 'social', name: 'Social' },
      { id: 'smoke-house-deli', name: 'Smoke House Deli' },
      { id: 'maffei-kitchen', name: 'Maffei Kitchen' },
      { id: 'mannheim-craft', name: 'Mannheim Craft' },
      { id: 'lupa', name: 'Lupa' },
      { id: 'pet-people-cafe', name: 'Pet People Cafe' },
      { id: 'phobidden-fruit', name: 'Phobidden Fruit' },
      { id: 'coffee-tattva', name: 'Coffee Tattva' },
    ],
  },
  {
    id: 'retail-commerce',
    title: 'Retail & Commerce',
    brands: [
      { id: 'namdhari', name: 'Namdhari' },
      { id: 'blinkit-gourmet', name: 'Blinkit Gourmet' },
      { id: 'swiggy', name: 'Swiggy' },
      { id: 'flipkart-minutes', name: 'Flipkart Minutes' },
      { id: 'blinkit', name: 'Blinkit' },
    ],
  },
  {
    id: 'specialty-institutional',
    title: 'Specialty & Institutional',
    brands: [
      { id: 'city-greens', name: 'City Greens' },
      { id: 'local-ferment-co', name: 'Local Ferment Co' },
      { id: 'single-thread-catering', name: 'Single Thread Catering' },
    ],
  },
];
