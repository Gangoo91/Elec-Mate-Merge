/**
 * ELE-2034 — the deposit a quote asks for, worked out in the app.
 *
 * A client who signs through the link gets the firm's deposit automatically:
 * accept-quote-public works it out and raises a DEP- invoice. A quote the
 * electrician marks accepted themselves (the client said yes on the phone)
 * never went through that, so converting it billed the full amount with no
 * deposit — about 1,000 manual acceptances since May, not one with a deposit.
 * Stephen Browne (SEB Electrics, 50%) reported it as a regression because his
 * clients had always signed the link until October.
 *
 * The rules are a copy of accept-quote-public's, kept in step by hand:
 *   settings.noDeposit         → no deposit, whatever the default
 *   settings.depositAmount     → that cash amount, capped at the bill
 *   settings.depositPercentage → that share of the bill
 *   company deposit_percentage → the firm's default share
 * "The bill" is the total less any third-party grant (ELE-1571), because a
 * deposit is a share of what the CUSTOMER pays, not of the supply.
 *
 * Pure, so scripts/check-quote-deposit.mjs can test it without React or
 * Supabase. Pennies are rounded exactly as the server rounds them.
 */

export interface QuoteDepositInput {
  total: number | string | null | undefined;
  settings?: Record<string, unknown> | null;
  /** Any of these means a deposit already exists; never ask twice. */
  deposit_required?: boolean | null;
  deposit_invoice_id?: string | null;
  deposit_paid_at?: string | null;
  /** Already invoiced: too late for a deposit. */
  invoice_raised?: boolean | null;
}

export interface QuoteDeposit {
  pennies: number;
  /** £, two decimal places, for display and the invoice row. */
  amount: number;
  /** The share it came from, or null when it was a set cash amount. */
  percent: number | null;
  /** What the customer owes in total (after any grant), in £. */
  payable: number;
}

const num = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

export function quoteDepositDue(
  quote: QuoteDepositInput,
  companyDepositPercentage: number | string | null | undefined
): QuoteDeposit | null {
  if (quote.invoice_raised) return null;
  if (quote.deposit_required || quote.deposit_invoice_id || quote.deposit_paid_at) return null;

  const s = (quote.settings ?? {}) as Record<string, unknown>;
  if (s.noDeposit === true) return null;

  const total = num(quote.total) || 0;
  const grant = s.grantEnabled && num(s.grantAmount) > 0 ? Math.min(num(s.grantAmount), total) : 0;
  const payable = Math.max(0, total - grant);
  if (payable <= 0) return null;

  const cash = num(s.depositAmount);
  if (cash > 0) {
    const capped = Math.min(cash, payable);
    const pennies = Math.round(capped * 100);
    return pennies > 0 ? { pennies, amount: pennies / 100, percent: null, payable } : null;
  }

  const settingsPct = num(s.depositPercentage);
  const profilePct = num(companyDepositPercentage);
  const pct = settingsPct > 0 ? settingsPct : profilePct > 0 ? profilePct : 0;
  if (pct <= 0) return null;

  const pennies = Math.round(payable * 100 * (pct / 100));
  return pennies > 0 ? { pennies, amount: pennies / 100, percent: pct, payable } : null;
}
