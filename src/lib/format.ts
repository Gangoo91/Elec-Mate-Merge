/**
 * Formatting utilities for consistent display across the application
 */

/**
 * Format currency with thousands separators and £ symbol
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format number with thousands separators
 * @param num - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted number string
 */
export function formatNumber(num: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format large currency amounts with smart scaling (k, M, B)
 * @param amount - The amount to format
 * @param decimals - Number of decimal places for scaled values (default: 1)
 * @returns Formatted currency string with scaling
 */
export function formatLargeCurrency(amount: number, decimals: number = 1): string {
  if (amount >= 1000000000) {
    return `£${(amount / 1000000000).toFixed(decimals)}B`;
  } else if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(decimals)}M`;
  } else if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(decimals)}k`;
  } else {
    return formatCurrency(amount, 0);
  }
}

/**
 * Format large numbers with smart scaling (k, M, B)
 * @param num - The number to format
 * @param decimals - Number of decimal places for scaled values (default: 1)
 * @returns Formatted number string with scaling
 */
export function formatLargeNumber(num: number, decimals: number = 1): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(decimals)}B`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}k`;
  } else {
    return formatNumber(num, decimals);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   Time + duration helpers shared across the apprentice college hub and the
   tutor's Student 360 OTJ verification panel. Extracted here so we don't
   maintain five copies of the same logic.
   ────────────────────────────────────────────────────────────────────────── */

/** Minutes → "30m", "1.5h", "12h". 0 / negative returns "0m". */
export function fmtHours(min: number): string {
  if (!min || min < 0) return '0m';
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

/** Hours → "1.5h" / "12h" — for already-decimal hour values. */
export function fmtHoursValue(h: number): string {
  if (h >= 100) return `${Math.round(h)}h`;
  if (h >= 10) return `${h.toFixed(0)}h`;
  return `${h.toFixed(1)}h`;
}

/** Relative date — "today", "yesterday", "3d ago", "2w ago", "12 Apr". */
export function fmtRel(iso: string | null): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const days = Math.round((Date.now() - t) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Relative time — "just now", "5m ago", "2h ago", then falls through to fmtRel. */
export function fmtRelTime(iso: string | null): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const mins = Math.round((Date.now() - t) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return fmtRel(iso);
}

/**
 * Card-style amount: whole pounds unless there are pence (saves card width).
 */
export function formatCardAmount(value: number): string {
  const hasPence = Math.round((value || 0) * 100) % 100 !== 0;
  return formatCurrency(value || 0, hasPence ? 2 : 0);
}

/**
 * Card-style age: Today / Nd ago up to a month, then a short date.
 */
export function formatCardAge(date?: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return '1d ago';
  if (days <= 30) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
