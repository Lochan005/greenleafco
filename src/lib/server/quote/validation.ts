import {
  businessTypes,
  type BusinessType,
  type QuoteField,
  type QuoteRequest,
} from '../../../types/quote.ts';

export interface ValidatedQuoteSubmission extends QuoteRequest {
  website?: string;
  formStartedAt: number;
}

export type QuoteValidationResult =
  | {
      success: true;
      quote: QuoteRequest;
      antiSpam: Pick<ValidatedQuoteSubmission, 'website' | 'formStartedAt'>;
    }
  | {
      success: false;
      fieldErrors: Partial<Record<QuoteField, string>>;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedFields = new Set([
  'name',
  'company',
  'email',
  'phone',
  'businessType',
  'productsOfInterest',
  'quantityRequirement',
  'deliveryLocation',
  'message',
  'website',
  'formStartedAt',
]);

function readText(
  input: Record<string, unknown>,
  field: QuoteField | 'website',
  maximum: number,
  required = false,
): { value?: string; error?: string } {
  const raw = input[field];
  if (raw === undefined || raw === null || raw === '') {
    return required ? { error: `${field === 'name' ? 'Name' : 'Company'} is required.` } : {};
  }
  if (typeof raw !== 'string') return { error: 'Enter a valid value.' };
  const value = raw.trim();
  if (required && !value) return { error: 'This field is required.' };
  if (value.length > maximum) return { error: 'This value is too long.' };
  return value ? { value } : {};
}

export function validateQuoteSubmission(input: unknown): QuoteValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { success: false, fieldErrors: {} };
  }

  const record = input as Record<string, unknown>;
  if (Object.keys(record).some((field) => !allowedFields.has(field))) {
    return { success: false, fieldErrors: {} };
  }
  const fieldErrors: Partial<Record<QuoteField, string>> = {};
  const name = readText(record, 'name', 100, true);
  const company = readText(record, 'company', 150, true);
  const email = readText(record, 'email', 254, true);
  const phone = readText(record, 'phone', 40);
  const productsOfInterest = readText(record, 'productsOfInterest', 500);
  const quantityRequirement = readText(record, 'quantityRequirement', 500);
  const deliveryLocation = readText(record, 'deliveryLocation', 200);
  const message = readText(record, 'message', 2_000);
  const website = readText(record, 'website', 200);

  const values = {
    name,
    company,
    email,
    phone,
    productsOfInterest,
    quantityRequirement,
    deliveryLocation,
    message,
  };

  for (const [field, result] of Object.entries(values)) {
    if (result.error) fieldErrors[field as QuoteField] = result.error;
  }

  if (email.value && !emailPattern.test(email.value)) {
    fieldErrors.email = 'Enter a valid email address.';
  }

  const businessType =
    typeof record.businessType === 'string' &&
    businessTypes.includes(record.businessType as BusinessType)
      ? (record.businessType as BusinessType)
      : undefined;
  if (record.businessType && !businessType) {
    fieldErrors.businessType = 'Select a valid business type.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  if (
    typeof record.formStartedAt !== 'number' ||
    !Number.isFinite(record.formStartedAt) ||
    record.formStartedAt < 0
  ) {
    return { success: false, fieldErrors: {} };
  }

  const quote: QuoteRequest = {
    name: name.value!,
    company: company.value!,
    email: email.value!.toLowerCase(),
    ...(phone.value && { phone: phone.value }),
    ...(businessType && { businessType }),
    ...(productsOfInterest.value && { productsOfInterest: productsOfInterest.value }),
    ...(quantityRequirement.value && { quantityRequirement: quantityRequirement.value }),
    ...(deliveryLocation.value && { deliveryLocation: deliveryLocation.value }),
    ...(message.value && { message: message.value }),
  };

  return {
    success: true,
    quote,
    antiSpam: {
      website: website.value,
      formStartedAt: record.formStartedAt,
    },
  };
}
