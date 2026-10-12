export const businessTypes = [
  'restaurant',
  'hotel-hospitality',
  'retailer',
  'reseller-distributor',
  'other',
] as const;

export type BusinessType = (typeof businessTypes)[number];

export interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  businessType?: BusinessType;
  productsOfInterest?: string;
  quantityRequirement?: string;
  deliveryLocation?: string;
  message?: string;
}

export interface QuoteSubmission extends QuoteRequest {
  website?: string;
  formStartedAt: number;
}

export type QuoteField = keyof QuoteRequest;

export type QuoteApiResponse =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<QuoteField, string>>;
    };
