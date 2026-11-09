/** Partner lists for the Who We Serve brand gallery. */
export type PartnerCategoryId =
  | 'hospitality'
  | 'retail-commerce'
  | 'specialty-institutional';

export type PartnerBentoShape = 'square' | 'wide' | 'tall' | 'feature';

export interface PartnerBrand {
  id: string;
  name: string;
  /** Bento collage footprint; defaults to 'square' (1×1). */
  shape?: PartnerBentoShape;
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
  // Hospitality
  'pizza-4ps': 'Pizza 4Ps.jpg',
  'copper-and-clove': 'Copper n Cloves.jpg',
  'order-4-health': 'Order 4 health.jpg',
  'amintiri-cafe': 'amintiri cafe.png',
  'vanamo-global-eats-and-caffeinary': 'Vanamo.jpg',
  locolane: 'Locolane.jpg',
  panetteria: 'Panetteria.png',
  'ban-pad-thai': 'ban pad thai.jpg',
  'the-fresh-factory': 'the fresh factory.png',
  'mon-cheri-resto-cafe': 'mon cheri resto.jpg',
  social: 'social.jpg',
  'smoke-house-deli': 'smoke house deli.png',
  'maffei-kitchen': 'maffei kitchen.jpg',
  'mannheim-craft': 'mannheim.jpg',
  'pet-people-cafe': 'pet people cafe.jpg',
  'phobidden-fruit': 'phobidden fruit.jpg',
  'coffee-tattva': 'coffee tattva.jpg',

  // Retail & Commerce
  namdhari: 'namdhari.jpg',
  swiggy: 'swiggy.png',
  'flipkart-minutes': 'flipkart minutes.jpg',
  blinkit: 'blinkit.jpg',

  // Specialty & Institutional
  'city-greens': 'city greens.jpg',
  'local-ferment-co': 'local ferment co.png',
  'single-thread-catering': 'single thread catering.jpg',
};

export function partnerLogoSrc(brandId: string): string | undefined {
  const filename = partnerLogoFiles[brandId];
  if (!filename) return undefined;
  return `/${['partners', filename].map((segment) => encodeURIComponent(segment)).join('/')}`;
}

/**
 * Initial hospitality count (~9 brands) chosen so the bento collage packs
 * cleanly into a 12-unit desktop footprint (3 rows × 4 columns).
 */
export const hospitalityInitialVisibleCount = 9;

export const partnerCategories: PartnerCategory[] = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    initialVisibleCount: hospitalityInitialVisibleCount,
    expandLabel: 'View all hospitality partners',
    brands: [
      { id: 'pizza-4ps', name: 'Pizza 4Ps', shape: 'feature' },
      { id: 'copper-and-clove', name: 'Copper and Clove', shape: 'square' },
      { id: 'order-4-health', name: 'Order 4 Health', shape: 'square' },
      { id: 'amintiri-cafe', name: 'Amintiri Cafe', shape: 'square' },
      {
        id: 'vanamo-global-eats-and-caffeinary',
        name: 'Vanamo Global Eats and Caffeinary',
        shape: 'square',
      },
      { id: 'locolane', name: 'Locolane', shape: 'wide' },
      { id: 'the-scene', name: 'The Scene', shape: 'square' },
      { id: 'spectracolare', name: 'Spectracolare', shape: 'square' },
      { id: 'panetteria', name: 'Panetteria', shape: 'square' },
      { id: 'comedor', name: 'Comedor', shape: 'square' },
      { id: 'ban-pad-thai', name: 'Ban Pad Thai', shape: 'tall' },
      { id: 'the-fresh-factory', name: 'The Fresh Factory', shape: 'wide' },
      { id: 'mon-cheri-resto-cafe', name: 'Mon Cheri Resto Cafe', shape: 'square' },
      { id: 'social', name: 'Social', shape: 'feature' },
      { id: 'smoke-house-deli', name: 'Smoke House Deli', shape: 'tall' },
      { id: 'maffei-kitchen', name: 'Maffei Kitchen', shape: 'square' },
      { id: 'mannheim-craft', name: 'Mannheim Craft', shape: 'square' },
      { id: 'lupa', name: 'Lupa', shape: 'square' },
      { id: 'pet-people-cafe', name: 'Pet People Cafe', shape: 'wide' },
      { id: 'phobidden-fruit', name: 'Phobidden Fruit', shape: 'square' },
      { id: 'coffee-tattva', name: 'Coffee Tattva', shape: 'square' },
    ],
  },
  {
    id: 'retail-commerce',
    title: 'Retail & Commerce',
    brands: [
      { id: 'namdhari', name: 'Namdhari', shape: 'wide' },
      { id: 'blinkit-gourmet', name: 'Blinkit Gourmet', shape: 'square' },
      { id: 'swiggy', name: 'Swiggy', shape: 'tall' },
      { id: 'flipkart-minutes', name: 'Flipkart Minutes', shape: 'wide' },
      { id: 'blinkit', name: 'Blinkit', shape: 'square' },
    ],
  },
  {
    id: 'specialty-institutional',
    title: 'Specialty & Institutional',
    brands: [
      { id: 'city-greens', name: 'City Greens', shape: 'wide' },
      { id: 'local-ferment-co', name: 'Local Ferment Co', shape: 'square' },
      { id: 'single-thread-catering', name: 'Single Thread Catering', shape: 'square' },
    ],
  },
];
