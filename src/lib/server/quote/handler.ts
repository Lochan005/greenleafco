import { passesQuoteAntiSpam } from './antiSpam.ts';
import type { QuoteSender } from './email.ts';
import { validateQuoteSubmission } from './validation.ts';
import type { QuoteApiResponse } from '@/types/quote';

export const MAX_QUOTE_BODY_BYTES = 16 * 1_024;

const INVALID_REQUEST_MESSAGE = 'We could not process this request. Please check the form and try again.';
const TEMPORARY_FAILURE_MESSAGE =
  'Quote requests are temporarily unavailable. Please try again later.';

function json(body: QuoteApiResponse, status: number, extraHeaders?: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

async function readBoundedBody(request: Request): Promise<string | null> {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_QUOTE_BODY_BYTES) {
    return null;
  }

  if (!request.body) {
    return '';
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    byteLength += value.byteLength;
    if (byteLength > MAX_QUOTE_BODY_BYTES) {
      await reader.cancel();
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(body);
  } catch {
    return '';
  }
}

export async function handleQuoteRequest(
  request: Request,
  sendQuote: QuoteSender,
  now = Date.now(),
): Promise<Response> {
  if (request.method !== 'POST') {
    return json(
      { ok: false, message: 'Method not allowed.' },
      405,
      { Allow: 'POST' },
    );
  }

  const mediaType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return json({ ok: false, message: 'Content type must be application/json.' }, 415);
  }

  const body = await readBoundedBody(request);
  if (body === null) {
    return json({ ok: false, message: 'Request body is too large.' }, 413);
  }

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return json({ ok: false, message: INVALID_REQUEST_MESSAGE }, 400);
  }

  const validation = validateQuoteSubmission(input);
  if (!validation.success) {
    return json(
      {
        ok: false,
        message: 'Please review the highlighted fields and try again.',
        fieldErrors: validation.fieldErrors,
      },
      400,
    );
  }

  if (!passesQuoteAntiSpam(validation.antiSpam, now)) {
    return json({ ok: false, message: INVALID_REQUEST_MESSAGE }, 400);
  }

  try {
    const result = await sendQuote(validation.quote);

    if (result === 'unavailable') {
      return json({ ok: false, message: TEMPORARY_FAILURE_MESSAGE }, 503);
    }

    if (result === 'failed') {
      return json({ ok: false, message: TEMPORARY_FAILURE_MESSAGE }, 502);
    }
  } catch {
    return json({ ok: false, message: TEMPORARY_FAILURE_MESSAGE }, 502);
  }

  return json(
    {
      ok: true,
      message:
        'Thanks. Your enquiry has been received. Our wholesale team will get back to you shortly.',
    },
    200,
  );
}
