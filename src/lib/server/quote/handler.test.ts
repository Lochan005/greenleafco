import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { QuoteSender } from './email.ts';
import { handleQuoteRequest, MAX_QUOTE_BODY_BYTES } from './handler.ts';

const now = 20_000;
const validPayload = {
  name: 'Ada Lovelace',
  company: 'Example Kitchens',
  email: 'ada@example.com',
  website: '',
  formStartedAt: now - 5_000,
};

function request(
  body: unknown = validPayload,
  init: { method?: string; contentType?: string } = {},
): Request {
  return new Request('https://example.com/api/quote', {
    method: init.method ?? 'POST',
    headers: {
      'Content-Type': init.contentType ?? 'application/json',
    },
    body: init.method === 'GET' ? undefined : JSON.stringify(body),
  });
}

describe('handleQuoteRequest', () => {
  it('rejects unsupported methods and media types', async () => {
    let calls = 0;
    const sender: QuoteSender = async () => {
      calls += 1;
      return 'sent';
    };
    const methodResponse = await handleQuoteRequest(
      request(undefined, { method: 'GET' }),
      sender,
      now,
    );
    const mediaTypeResponse = await handleQuoteRequest(
      request(validPayload, { contentType: 'text/plain' }),
      sender,
      now,
    );

    assert.equal(methodResponse.status, 405);
    assert.equal(methodResponse.headers.get('allow'), 'POST');
    assert.equal(mediaTypeResponse.status, 415);
    assert.equal(calls, 0);
  });

  it('rejects oversized request bodies', async () => {
    let calls = 0;
    const sender: QuoteSender = async () => {
      calls += 1;
      return 'sent';
    };
    const response = await handleQuoteRequest(
      request({ value: 'x'.repeat(MAX_QUOTE_BODY_BYTES) }),
      sender,
      now,
    );

    assert.equal(response.status, 413);
    assert.equal(calls, 0);
  });

  it('rejects malformed, invalid, and spam submissions', async () => {
    let calls = 0;
    const sender: QuoteSender = async () => {
      calls += 1;
      return 'sent';
    };
    const malformed = new Request('https://example.com/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });

    assert.equal((await handleQuoteRequest(malformed, sender, now)).status, 400);
    assert.equal(
      (await handleQuoteRequest(request({ ...validPayload, email: 'invalid' }), sender, now)).status,
      400,
    );
    assert.equal(
      (await handleQuoteRequest(request({ ...validPayload, website: 'filled' }), sender, now)).status,
      400,
    );
    assert.equal(calls, 0);
  });

  it('returns 503 when delivery is not configured', async () => {
    const sender: QuoteSender = async () => 'unavailable';
    const response = await handleQuoteRequest(request(), sender, now);
    const result = await response.json();

    assert.equal(response.status, 503);
    assert.equal(result.ok, false);
  });

  it('returns success only after confirmed delivery', async () => {
    let calls = 0;
    const sender: QuoteSender = async () => {
      calls += 1;
      return 'sent';
    };
    const response = await handleQuoteRequest(request(), sender, now);
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.equal(result.ok, true);
    assert.equal(calls, 1);
  });
});
