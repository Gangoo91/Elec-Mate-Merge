import type { QuoteItem, QuoteSettings } from '@/types/quote';
import { computeQuoteTotals } from '@/utils/quote-calculations';

/**
 * Credit notes — ELE-1704.
 *
 * Once an invoice is sent you cannot simply edit it. If it overcharged, or the
 * job changed, or it went to the wrong person, the correct instrument is a
 * credit note: a separate document that formally reduces or cancels the
 * original. The app has said so in five places and offered no way to do it —
 * `InvoiceItemsStep` twice as a warning, and `mate-documents.ts` three times
 * as a flat refusal ("Cannot amend a paid invoice… Issue a credit note").
 *
 * ## The rules this file exists to hold
 *
 * 1. **A credit note never exceeds what is left to credit.** Crediting £120
 *    of a £100 invoice is not a discount, it is a refund the books cannot
 *    explain. Partial credits accumulate, so the cap is the invoice total
 *    minus everything already credited.
 * 2. **It inherits the invoice's VAT treatment.** A reverse-charge invoice
 *    must be credited under reverse charge, and a zero-rated one at zero. Its
 *    own VAT rate is never chosen afresh, or the credit and the invoice
 *    disagree and the VAT return is wrong.
 * 3. **It states what it credits.** HMRC expects a credit note to identify
 *    the original invoice — number and date. That is not decoration; it is
 *    what makes the pair reconcilable.
 *
 * Quantities are stored POSITIVE with the document typed as a credit, rather
 * than as negative lines on an invoice. A negative quantity leaks into every
 * sum that was written assuming invoices are positive — the dashboards, the
 * "invoiced" figure, the CIS base — and finding all of those later is worse
 * than being explicit now.
 */

export interface CreditNoteLine {
  /** The invoice line this credits. */
  sourceItemId: string;
  description: string;
  /** Positive. The document type carries the sign, not the number. */
  quantity: number;
  unitPrice: number;
  category: QuoteItem['category'];
  /**
   * ELE-888 per-item adjustment, carried from the invoice line.
   *
   * MUST come across. The customer was charged `quantity × unitPrice ×
   * (1 + adj/100)`, so crediting quantity × unitPrice alone refunds a line
   * with a +10% markup 10% short and leaves them out of pocket — quietly,
   * because every figure on the credit note still looks self-consistent.
   */
  itemAdjustmentPercent?: number;
  itemAdjustmentLabel?: string;
}

export interface CreditNoteDraft {
  lines: CreditNoteLine[];
  settings: QuoteSettings;
  /** Ex-VAT value of what is being credited. */
  subtotal: number;
  vatAmount: number;
  /** What the customer's balance falls by. */
  total: number;
  reverseCharge: boolean;
  /**
   * CIS withheld on the credited labour, if the invoice was under CIS.
   *
   * Surfaced rather than dropped: the contractor withheld it on the invoice,
   * so crediting labour has to unwind it too, and a credit note that stayed
   * silent would leave the CIS300 out by exactly this figure.
   */
  cisAmount: number;
  reason: string;
}

export type CreditNoteRefusal =
  | 'nothing-to-credit'
  /**
   * Nothing SELECTED — distinct from nothing LEFT.
   *
   * These two shared a refusal, so unticking every line told the electrician
   * "this invoice has already been credited in full" on a screen that was
   * simultaneously showing them how much was still creditable. One of the two
   * statements had to be wrong, and it was the message.
   */
  | 'no-lines-selected'
  | 'exceeds-remaining'
  | 'no-invoice';

/**
 * ⚠️ Deliberately ONE shape, not a discriminated union.
 *
 * `{ ok: true; draft } | { ok: false; refusal }` is the nicer type and it
 * does not work here: this project sets `strict: false` and
 * `strictNullChecks: false` (tsconfig.app.json / tsconfig.json), and
 * discriminated-union narrowing REQUIRES strictNullChecks. Without it even
 * `if (!r.ok) { r.refusal }` fails to narrow — verified with a minimal
 * two-member union in this exact config. Callers would have to cast at every
 * site, which is worse than optional fields.
 *
 * `remaining` is always present because it is useful either way: on success
 * it is what is left after this credit, on refusal it is what the caller may
 * credit instead.
 */
export interface CreditNoteResult {
  ok: boolean;
  draft?: CreditNoteDraft;
  refusal?: CreditNoteRefusal;
  remaining: number;
}

export const REFUSAL_MESSAGE: Record<CreditNoteRefusal, string> = {
  'nothing-to-credit': 'This invoice has already been credited in full.',
  'no-lines-selected': 'Choose at least one line to credit.',
  'exceeds-remaining': 'A credit note cannot be for more than the amount still outstanding on the invoice.',
  'no-invoice': 'This document is not an invoice, so there is nothing to credit.',
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Sum of credits standing against an invoice.
 *
 * ONE definition, used by the list and by the raise path, because they must
 * agree: the list tells the electrician what is left, the raise path enforces
 * it, and two copies of this rule drifting means the screen says £400 while
 * the save refuses.
 *
 * A VOID note does not count — voiding is how an issued credit note is undone
 * (it is never deleted, so the number stays spent and the trail intact), and
 * a voided credit has given nothing back.
 *
 * A DRAFT one DOES count. It has not reached the customer, but it holds the
 * value: without that, two drafts could each be raised for the full invoice
 * and only fail when the second was issued — long after the electrician
 * believed both were fine.
 */
export const sumCreditsAgainst = (
  rows: { total: number | string | null; status?: string | null }[]
): number =>
  Math.round(
    (rows ?? [])
      .filter((r) => r && r.status !== 'void')
      .reduce((sum, r) => sum + (Number(r.total) || 0), 0) * 100
  ) / 100;

/**
 * What is still creditable on an invoice.
 *
 * Existing credits are summed rather than counted: three £10 credits against
 * a £100 invoice leave £70, and a rule that only looked for "has it been
 * credited" would allow the fourth £100.
 */
export const remainingToCredit = (
  invoiceTotal: number,
  alreadyCredited: number
): number => Math.max(0, round2(invoiceTotal - Math.max(0, alreadyCredited)));

/**
 * Build a credit note against an invoice.
 *
 * `lines` are the portions being credited — the whole invoice for a full
 * credit, or a subset for a partial one. Settings come FROM THE INVOICE so
 * the VAT treatment cannot drift; only the reason is new.
 */
/** The invoice a credit note is raised against. */
export interface CreditableInvoice {
  isInvoice: boolean;
  total: number;
  settings: QuoteSettings | null | undefined;
  items: QuoteItem[];
}

export const buildCreditNote = (
  invoice: CreditableInvoice,
  lines: CreditNoteLine[],
  reason: string,
  /**
   * Sum of credits ALREADY raised against this invoice.
   *
   * Required, not defaulted. A default of 0 fails OPEN — a caller that
   * forgot it could raise the full value again and again, and each credit
   * would look correct on its own. That is the same shape as the winback
   * suppression read in ELE-1768, and the reason this is the one argument
   * with no default.
   */
  alreadyCredited: number
): CreditNoteResult => {
  const remaining = remainingToCredit(invoice.total, alreadyCredited);

  if (!invoice.isInvoice) return { ok: false, refusal: 'no-invoice', remaining };
  if (remaining <= 0) return { ok: false, refusal: 'nothing-to-credit', remaining };

  const usable = lines.filter((l) => l.quantity > 0 && l.unitPrice !== 0);
  if (usable.length === 0) return { ok: false, refusal: 'no-lines-selected', remaining };

  /*
   * Priced through `computeQuoteTotals`, not by hand.
   *
   * It already owns VAT, reverse charge, the discount order and the grant
   * rules, and a credit note that priced itself would be a second opinion on
   * all of them — the one place a disagreement is guaranteed to be noticed is
   * a VAT return.
   */
  const settings: QuoteSettings = {
    ...(invoice.settings as QuoteSettings),
    // A credit is never itself discounted or granted: those already shaped
    // the invoice being credited, and applying them again would credit less
    // than the customer was charged.
    discountEnabled: false,
    discountValue: 0,
    grantEnabled: false,
    grantAmount: 0,
  };

  const asItems: QuoteItem[] = usable.map((l, i) => ({
    id: `credit-${i}`,
    description: l.description,
    quantity: l.quantity,
    unit: 'each',
    unitPrice: l.unitPrice,
    totalPrice: round2(l.quantity * l.unitPrice),
    category: l.category,
    // `computeQuoteTotals` reapplies this via `getItemAdjustedTotal`.
    itemAdjustmentPercent: l.itemAdjustmentPercent,
    itemAdjustmentLabel: l.itemAdjustmentLabel,
  }));

  const totals = computeQuoteTotals(asItems, settings);

  if (round2(totals.total) > remaining) {
    return { ok: false, refusal: 'exceeds-remaining', remaining };
  }

  return {
    ok: true,
    remaining: round2(remaining - round2(totals.total)),
    draft: {
      lines: usable,
      settings,
      subtotal: round2(totals.subtotal),
      vatAmount: round2(totals.vatAmount),
      total: round2(totals.total),
      reverseCharge: totals.reverseCharge,
      cisAmount: round2(totals.cisAmount),
      reason: reason.trim(),
    },
  };
};

/** Every line of an invoice, for a full credit. */
export const creditEverything = (items: QuoteItem[]): CreditNoteLine[] =>
  items
    .filter((i) => (Number(i.quantity) || 0) > 0)
    .map((i) => ({
      sourceItemId: i.id,
      description: i.description,
      quantity: Number(i.quantity) || 0,
      unitPrice: Number(i.unitPrice) || 0,
      category: i.category,
      itemAdjustmentPercent: i.itemAdjustmentPercent,
      itemAdjustmentLabel: i.itemAdjustmentLabel,
    }));

/**
 * The line HMRC expects a credit note to carry.
 *
 * A credit note has to identify the invoice it corrects — number and date —
 * or the pair cannot be reconciled. Kept here rather than in a template so
 * the PDF, the public view and the accounting push all say the same thing.
 */
export const creditNoteReference = (
  invoiceNumber: string | null | undefined,
  invoiceDate: Date | string | null | undefined
): string => {
  const num = (invoiceNumber || '').trim();
  if (!num) return 'Credit note';
  const d = invoiceDate ? new Date(invoiceDate) : null;
  const when =
    d && !isNaN(d.getTime())
      ? ` dated ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
      : '';
  return `Credit note against invoice ${num}${when}`;
};
