import type { APIRoute } from 'astro';
import { RESEND_API_KEY, RESEND_FROM_EMAIL, WHOLESALE_EMAIL } from 'astro:env/server';
import { createResendQuoteSender } from '@/lib/server/quote/email';
import { handleQuoteRequest } from '@/lib/server/quote/handler';

export const prerender = false;

const sendQuote = createResendQuoteSender({
  apiKey: RESEND_API_KEY,
  wholesaleEmail: WHOLESALE_EMAIL,
  fromAddress: RESEND_FROM_EMAIL,
});

export const ALL: APIRoute = ({ request }) => handleQuoteRequest(request, sendQuote);
