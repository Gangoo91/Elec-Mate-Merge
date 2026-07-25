// ELE-1158 — late payment chasing letters + statutory interest.
//
// Late Payment of Commercial Debts (Interest) Act 1998 (BUSINESS customers):
//   interest = 8% + the Bank of England base rate "reference rate" — the base
//   rate in force on 31 Dec (for debts falling due 1 Jan–30 Jun) or 30 Jun
//   (for 1 Jul–31 Dec) — plus fixed compensation per invoice.
// CONSUMER customers (homeowners): the 1998 Act does NOT apply. Interest may
//   be claimed under contract terms or s.69 County Courts Act 1984 (8%).
//
// BOE_BASE_RATE verified 2026-07-25 (bankofengland.co.uk — 3.75%, held
// 18 Jun 2026, so the 30 Jun reference rate for H2 2026 is 3.75%).
// Review each January and July when the reference rate resets.

export const BOE_BASE_RATE = 3.75;
export const STATUTORY_RATE_BUSINESS = 8 + BOE_BASE_RATE; // % p.a.
export const STATUTORY_RATE_CONSUMER = 8; // % p.a. — s.69 County Courts Act 1984

export type DebtorType = 'business' | 'consumer';

/** Fixed compensation per invoice under the 1998 Act (business debts only). */
export function fixedCompensation(principal: number): number {
  if (principal < 1000) return 40;
  if (principal < 10000) return 70;
  return 100;
}

export function statutoryRate(debtorType: DebtorType): number {
  return debtorType === 'business' ? STATUTORY_RATE_BUSINESS : STATUTORY_RATE_CONSUMER;
}

export function calcStatutoryInterest(
  principal: number,
  daysOverdue: number,
  debtorType: DebtorType
): number {
  if (principal <= 0 || daysOverdue <= 0) return 0;
  return Math.round(((principal * (statutoryRate(debtorType) / 100) * daysOverdue) / 365) * 100) / 100;
}

export interface LetterParams {
  companyName: string;
  clientName: string;
  invoiceNumber: string;
  invoiceTotal: number;
  amountOutstanding: number;
  dueDate: string; // already formatted for display
  daysOverdue: number;
  debtorType: DebtorType;
  jobTitle?: string;
  jobLocation?: string;
}

/** "for electrical works (Consumer unit upgrade) at 12 High St" — or ''. */
function worksClause(p: LetterParams): string {
  if (!p.jobTitle && !p.jobLocation) return '';
  const what = p.jobTitle ? ` (${p.jobTitle})` : '';
  const where = p.jobLocation ? ` at ${p.jobLocation}` : '';
  return ` for electrical works${what}${where}`;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

const today = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/** Letter 1 — firm but polite payment reminder. */
export function buildReminderLetter(p: LetterParams): string {
  const interest = calcStatutoryInterest(p.amountOutstanding, p.daysOverdue, p.debtorType);
  return `${today()}

Dear ${p.clientName},

RE: Overdue invoice ${p.invoiceNumber} — ${gbp(p.amountOutstanding)} outstanding

Our records show that invoice ${p.invoiceNumber}${worksClause(p)}, due for payment on ${p.dueDate}, remains unpaid ${p.daysOverdue} days after its due date. The outstanding balance is ${gbp(p.amountOutstanding)}.

If payment has been made in the last few days, please accept our thanks and disregard this letter. Otherwise, we would ask that the balance is settled within 7 days of the date of this letter.

Please note that we reserve the right to charge interest on late payment${
    p.debtorType === 'business'
      ? ` under the Late Payment of Commercial Debts (Interest) Act 1998, currently accruing at ${STATUTORY_RATE_BUSINESS}% per annum (approximately ${gbp(interest)} to date), together with the fixed compensation the Act provides`
      : `. Should court proceedings become necessary, we will claim interest under section 69 of the County Courts Act 1984 at 8% per annum, which to date would amount to approximately ${gbp(interest)}`
  }.

We value our relationship and would much rather resolve this simply — if there is a problem with the invoice or you need to discuss payment, please get in touch straight away.

Yours sincerely,

${p.companyName}`;
}

/** Letter 2 — Letter Before Action (final formal step before court). */
export function buildLetterBeforeAction(p: LetterParams): string {
  const interest = calcStatutoryInterest(p.amountOutstanding, p.daysOverdue, p.debtorType);
  const compensation = p.debtorType === 'business' ? fixedCompensation(p.amountOutstanding) : 0;
  const totalClaim = p.amountOutstanding + interest + compensation;

  return `${today()}

Dear ${p.clientName},

LETTER BEFORE ACTION
RE: Invoice ${p.invoiceNumber} — ${gbp(p.amountOutstanding)} outstanding, ${p.daysOverdue} days overdue

Despite previous reminders, invoice ${p.invoiceNumber}${worksClause(p)}, due on ${p.dueDate}, remains unpaid. This letter is formal notice that unless payment is received within ${p.debtorType === 'consumer' ? '30 days' : '14 days'} of the date of this letter, we intend to commence court proceedings to recover the debt without further notice.

The amount claimed will be:

  Principal outstanding:            ${gbp(p.amountOutstanding)}
  Interest to date${
    p.debtorType === 'business'
      ? ` (${STATUTORY_RATE_BUSINESS}% p.a. under the
  Late Payment of Commercial Debts
  (Interest) Act 1998):             ${gbp(interest)}
  Fixed compensation under the Act:  ${gbp(compensation)}`
      : ` (8% p.a. under s.69
  County Courts Act 1984):          ${gbp(interest)}`
  }
  ------------------------------------------------
  Total:                            ${gbp(totalClaim)}

Interest continues to accrue daily until payment is made.${'\u0020'}${
    p.debtorType === 'business'
      ? 'We also reserve the right to claim reasonable costs of recovery under section 5A(2A) of the 1998 Act. '
      : ''
  }Court proceedings would add court fees and may affect your credit record.

Payment should be made using the details on the invoice, quoting reference ${p.invoiceNumber}. A copy of the invoice, and of any quotation or agreement for the works, is available from us on request. If you dispute this debt, please set out your reasons in writing within the period above.

${
    p.debtorType === 'consumer'
      ? `This letter is sent under the Pre-Action Protocol for Debt Claims. The Protocol's Information Sheet and Reply Form are enclosed with the posted copy of this letter (and are available at justice.gov.uk under "Pre-Action Protocol for Debt Claims"); the Financial Statement form can be downloaded from sfs.moneyadviceservice.org.uk. The completed Reply Form should be returned to us at the address shown on the invoice, or by reply to this email. If you return the Reply Form, we will not start proceedings for at least 30 days from receiving it. Interest and charges claimed are itemised above; no other charges have been added.`
      : `If you are a sole trader, the Pre-Action Protocol for Debt Claims applies: you have 30 days to respond and may request the Protocol's Information Sheet and Reply Form, which we will provide.`
  }

We remain willing to discuss reasonable proposals for payment.

Yours sincerely,

${p.companyName}`;
}

/** Plain-English small claims guidance (England & Wales, debts under £10k). */
export const SMALL_CLAIMS_GUIDANCE = [
  'Most unpaid trade invoices under £10,000 go through the small claims track — designed to be used without a solicitor.',
  'Send the Letter Before Action first and allow the full response period — 30 days for individuals and sole traders (the Pre-Action Protocol for Debt Claims), 14 days for companies. Most debts settle at this stage.',
  'Claiming from an individual? Before starting a claim, download the Protocol\u2019s Information Sheet and Reply Form from justice.gov.uk and send them with your letter — courts check this was done.',
  'Claim online at gov.uk/make-court-claim-for-money (Money Claim Online). The court fee depends on the claim size and is added to what the client owes you if you win.',
  'Include the invoice, proof it was sent, your reminders and the Letter Before Action as evidence.',
  'If you win and they still do not pay, you can request enforcement — bailiffs, attachment of earnings, or a charging order.',
] as const;
