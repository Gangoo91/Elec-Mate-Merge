/* ==========================================================================
   employerMoney — one source of truth for employer quote/invoice totals.
   Mirrors the electrician-side maths (src/utils/quote-calculations.ts):
   - VAT on the whole net; £0 when domestic reverse charge applies
     (customer accounts to HMRC — VAT Act 1994, s.55A)
   - CIS deducted from LABOUR lines only, at 20% (registered) or 30%
     (unverified); gross = no deduction
   ========================================================================== */

export interface EmployerLineItem {
  description?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  total?: number;
  /** 'labour' | 'material' — quote builder tags these; legacy items may lack it */
  type?: string;
}

export interface EmployerMoneySettings {
  vatRate: number;
  reverseCharge: boolean;
  cisEnabled: boolean;
  cisRate: number;
}

export interface EmployerTotals {
  subtotal: number;
  labourNet: number;
  vatAmount: number;
  /** VAT the CUSTOMER accounts for under reverse charge (shown, never charged) */
  notionalVat: number;
  cisAmount: number;
  /** gross inc. VAT — what `value`/`amount` stores */
  total: number;
  /** what the client actually pays: total - CIS deduction */
  amountDue: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Labour = explicitly tagged, falling back to time-based units for legacy rows. */
export const isLabourItem = (item: EmployerLineItem): boolean =>
  item.type === 'labour' || (!item.type && (item.unit === 'hour' || item.unit === 'day'));

export function calcEmployerTotals(
  lineItems: EmployerLineItem[],
  settings: EmployerMoneySettings
): EmployerTotals {
  const subtotal = round2(lineItems.reduce((s, i) => s + (Number(i.total) || 0), 0));
  const labourNet = round2(
    lineItems.filter(isLabourItem).reduce((s, i) => s + (Number(i.total) || 0), 0)
  );

  const vatAmount = settings.reverseCharge ? 0 : round2(subtotal * (settings.vatRate / 100));
  const notionalVat = settings.reverseCharge ? round2(subtotal * (settings.vatRate / 100)) : 0;
  const cisAmount = settings.cisEnabled ? round2(labourNet * (settings.cisRate / 100)) : 0;

  const total = round2(subtotal + vatAmount);
  return { subtotal, labourNet, vatAmount, notionalVat, cisAmount, total, amountDue: round2(total - cisAmount) };
}

