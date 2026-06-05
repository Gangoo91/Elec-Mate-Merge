/**
 * Helpers for free-text money inputs (£ amounts with optional pence).
 *
 * Binding a `type="number"` field straight to a numeric state and reparsing on
 * every keystroke (`parseFloat(value) || 0`) collapses partial entries like
 * "19." back to a whole number, so the decimal point can never be typed. These
 * helpers let the field hold the raw string while editing and convert only at
 * the edges.
 */

/** Strip to digits + a single decimal point, capped at two decimal places. */
export const sanitizeMoneyInput = (raw: string): string => {
  let s = raw.replace(/[^0-9.]/g, '');
  const dot = s.indexOf('.');
  if (dot !== -1) {
    s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, '').slice(0, 2);
  }
  return s;
};

/** Parse a sanitised money string to a number, or undefined when empty/incomplete. */
export const parseMoney = (s: string): number | undefined => {
  if (s === '' || s === '.') return undefined;
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

/** Render a stored numeric amount back into editable text (empty when unset). */
export const moneyToText = (n: number | null | undefined): string =>
  n === null || n === undefined ? '' : String(n);
