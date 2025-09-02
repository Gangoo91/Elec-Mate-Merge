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