import type { QuoteRequest } from '@/types/quote';

const DEFAULT_FROM_ADDRESS = 'Greenleaf Co Website <onboarding@resend.dev>';

export type QuoteDeliveryResult = 'sent' | 'unavailable' | 'failed';
export type QuoteSender = (quote: QuoteRequest) => Promise<QuoteDeliveryResult>;

export interface QuoteEmailConfig {
  apiKey?: string;
  wholesaleEmail?: string;
  fromAddress?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function display(value: string | undefined): string {
  return value || 'Not provided';
}

function quoteEmailText(quote: QuoteRequest): string {
  return [
    'New wholesale quote request',
    '',
    `Name: ${quote.name}`,
    `Company: ${quote.company}`,
    `Email: ${quote.email}`,
    `Phone: ${display(quote.phone)}`,
    `Business type: ${display(quote.businessType)}`,
    `Products of interest: ${display(quote.productsOfInterest)}`,
    `Quantity / requirement: ${display(quote.quantityRequirement)}`,
    `Delivery location: ${display(quote.deliveryLocation)}`,
    `Message: ${display(quote.message)}`,
  ].join('\n');
}

function quoteEmailHtml(quote: QuoteRequest): string {
  const fields: Array<[string, string | undefined]> = [
    ['Name', quote.name],
    ['Company', quote.company],
    ['Email', quote.email],
    ['Phone', quote.phone],
    ['Business type', quote.businessType],
    ['Products of interest', quote.productsOfInterest],
    ['Quantity / requirement', quote.quantityRequirement],
    ['Delivery location', quote.deliveryLocation],
    ['Message', quote.message],
  ];

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0">${escapeHtml(label)}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(display(value))}</td></tr>`,
    )
    .join('');

  return `<h1 style="font-size:20px">New wholesale quote request</h1><table>${rows}</table>`;
}

export function createResendQuoteSender(config: QuoteEmailConfig): QuoteSender {
  return async (quote) => {
    if (!config.apiKey || !config.wholesaleEmail) {
      return 'unavailable';
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // TODO: Set a verified domain address through config before production launch.
          from: config.fromAddress || DEFAULT_FROM_ADDRESS,
          to: [config.wholesaleEmail],
          reply_to: quote.email,
          subject: 'New wholesale quote request',
          text: quoteEmailText(quote),
          html: quoteEmailHtml(quote),
        }),
      });

      return response.ok ? 'sent' : 'failed';
    } catch {
      return 'failed';
    }
  };
}
