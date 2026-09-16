import { CurrencyCode } from '../types';

export const CURRENCY_RATES: Record<CurrencyCode, { rate: number; symbol: string; label: string; prefix: boolean }> = {
  USD: { rate: 1.0, symbol: '$', label: 'USD ($)', prefix: true },
  EUR: { rate: 0.92, symbol: '€', label: 'EUR (€)', prefix: true },
  GBP: { rate: 0.78, symbol: '£', label: 'GBP (£)', prefix: true },
  AUD: { rate: 1.52, symbol: 'A$', label: 'AUD (A$)', prefix: true },
  IDR: { rate: 15850, symbol: 'Rp ', label: 'IDR (Rp)', prefix: true },
};

export function convertFromUSD(amountUSD: number, targetCurrency: CurrencyCode): number {
  const info = CURRENCY_RATES[targetCurrency];
  if (!info) return amountUSD;
  return amountUSD * info.rate;
}

export function formatPrice(amountUSD: number, targetCurrency: CurrencyCode): string {
  const info = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;
  const converted = amountUSD * info.rate;

  if (targetCurrency === 'IDR') {
    // Format in IDR format (thousands separator with dots)
    const rounded = Math.round(converted / 10000) * 10000;
    return `${info.symbol}${rounded.toLocaleString('id-ID')}`;
  }

  // Format in Western currencies
  return `${info.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}
