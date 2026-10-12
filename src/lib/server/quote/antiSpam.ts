import type { ValidatedQuoteSubmission } from './validation.ts';

export const MINIMUM_COMPLETION_TIME_MS = 2_500;
export const MAXIMUM_FORM_AGE_MS = 24 * 60 * 60 * 1_000;

type AntiSpamFields = Pick<ValidatedQuoteSubmission, 'website' | 'formStartedAt'>;

export function passesQuoteAntiSpam(
  fields: AntiSpamFields,
  now = Date.now(),
): boolean {
  if (fields.website) {
    return false;
  }

  const elapsed = now - fields.formStartedAt;
  return elapsed >= MINIMUM_COMPLETION_TIME_MS && elapsed <= MAXIMUM_FORM_AGE_MS;
}
