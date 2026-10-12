import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { passesQuoteAntiSpam } from './antiSpam.ts';
import { validateQuoteSubmission } from './validation.ts';

const validSubmission = {
  name: '  Ada Lovelace  ',
  company: '  Example Kitchens  ',
  email: '  ADA@EXAMPLE.COM  ',
  businessType: 'restaurant',
  website: '',
  formStartedAt: 10_000,
};

describe('validateQuoteSubmission', () => {
  it('normalizes a valid submission', () => {
    const result = validateQuoteSubmission(validSubmission);

    assert.deepEqual(result, {
      success: true,
      quote: {
        name: 'Ada Lovelace',
        company: 'Example Kitchens',
        email: 'ada@example.com',
        businessType: 'restaurant',
      },
      antiSpam: {
        website: undefined,
        formStartedAt: 10_000,
      },
    });
  });

  it('returns useful errors for public fields', () => {
    const result = validateQuoteSubmission({
      ...validSubmission,
      name: '',
      email: 'not-an-email',
    });

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.fieldErrors.name, 'Name is required.');
      assert.equal(result.fieldErrors.email, 'Enter a valid email address.');
    }
  });

  it('rejects overlong and unknown input', () => {
    assert.equal(
      validateQuoteSubmission({
        ...validSubmission,
        message: 'x'.repeat(2_001),
      }).success,
      false,
    );

    assert.equal(
      validateQuoteSubmission({
        ...validSubmission,
        unexpected: 'value',
      }).success,
      false,
    );
  });
});

describe('passesQuoteAntiSpam', () => {
  it('requires an empty honeypot and a plausible completion time', () => {
    assert.equal(
      passesQuoteAntiSpam({ website: undefined, formStartedAt: 5_000 }, 10_000),
      true,
    );
    assert.equal(
      passesQuoteAntiSpam({ website: 'spam', formStartedAt: 5_000 }, 10_000),
      false,
    );
    assert.equal(
      passesQuoteAntiSpam({ website: undefined, formStartedAt: 9_000 }, 10_000),
      false,
    );
  });
});
