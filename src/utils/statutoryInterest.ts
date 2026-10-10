/**
 * ELE-2065 — statutory interest and fixed compensation on a late BUSINESS debt,
 * under the Late Payment of Commercial Debts (Interest) Act 1998.
 *
 * Checked on primary sources, 10 Oct 2026:
 *  - Rate: 8% a year over the Bank of England "official dealing rate" in force
 *    on the reference date before interest starts to run: 30 June for interest
 *    starting 1 July to 31 December, 31 December for 1 January to 30 June.
 *    The Late Payment of Commercial Debts (Rate of Interest) (No. 3) Order 2002
 *    (SI 2002/1675), art. 4:
 *    https://www.legislation.gov.uk/uksi/2002/1675/article/4/made
 *  - Daily interest = debt × rate ÷ 365 (gov.uk worked example: £1,000 at a
 *    0.5% base rate is £85 a year, about 23p a day):
 *    https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt
 *  - Fixed sum for recovery, once per invoice: £40 under £1,000, £70 from
 *    £1,000 to £9,999.99, £100 from £10,000:
 *    https://www.gov.uk/late-commercial-payments-interest-debt-recovery/claim-debt-recovery-costs
 *  - Bank Rate history (3.75% since 18 Dec 2025, held 18 Jun, 30 Jul and
 *    17 Sep 2026): https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp
 *  - Business to business only. It never applies to a consumer, and not where
 *    the contract sets its own late-payment interest rate.
 *
 * Add a row to REFERENCE_RATES each January and July.
 */
// Gap §4.9: this file is the ONE late-payment rate table. latePaymentLetters
// (the Electrical Hub letters, ELE-1158) reads its rate and fixed sums from
// here, so a January/July update is made once.

/** Fixed sum per invoice under the 1998 Act (business debts only). */
export function fixedCompensation(principal: number): number {
  if (principal < 1000) return 40;
  if (principal < 10000) return 70;
  return 100;
}

/** Bank Rate in force on each reference date (30 Jun / 31 Dec), in %. */
export const REFERENCE_RATES: { date: string; rate: number }[] = [
  { date: '2024-06-30', rate: 5.25 },
  { date: '2024-12-31', rate: 4.75 },
  { date: '2025-06-30', rate: 4.25 },
  { date: '2025-12-31', rate: 3.75 },
  { date: '2026-06-30', rate: 3.75 },
];

const DAY = 86_400_000;

/** Midnight UTC of a YYYY-MM-DD (or ISO) date, so day counts never drift by DST. */
function utcDay(d: string | Date): number {
  const s = typeof d === 'string' ? d.slice(0, 10) : d.toISOString().slice(0, 10);
  const [y, m, day] = s.split('-').map(Number);
  return Date.UTC(y, m - 1, day);
}

/** The reference date (and its Bank Rate) for interest starting on `start`. */
export function referenceRateFor(start: string | Date): { date: string; base: number } | null {
  const t = utcDay(start);
  const y = new Date(t).getUTCFullYear();
  const m = new Date(t).getUTCMonth() + 1;
  const refDate = m >= 7 ? `${y}-06-30` : `${y - 1}-12-31`;
  const row = REFERENCE_RATES.find((r) => r.date === refDate);
  return row ? { date: refDate, base: row.rate } : null;
}

/**
 * The Bank Rate to use for interest starting `asOf` (default today): its
 * reference date's rate, or the latest row when the table hasn't been
 * extended yet.
 */
export function currentReferenceRate(asOf: string | Date = new Date()): number {
  return referenceRateFor(asOf)?.base ?? REFERENCE_RATES[REFERENCE_RATES.length - 1].rate;
}

export interface StatutoryClaim {
  principal: number;
  /** The day interest starts: the day after the due date. */
  startsOn: string;
  referenceDate: string;
  baseRate: number;
  /** % a year: 8 + base. */
  rate: number;
  daysLate: number;
  dailyInterest: number;
  interest: number;
  compensation: number;
  total: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The statutory claim on `principal` due on `dueDate`, as at `asOf`.
 * null when it is not late yet, or the reference rate is not in the table.
 */
export function statutoryClaim(
  principal: number,
  dueDate: string,
  asOf: string | Date = new Date()
): StatutoryClaim | null {
  if (!(principal > 0) || !dueDate) return null;
  const due = utcDay(dueDate);
  const now = utcDay(asOf);
  const daysLate = Math.floor((now - due) / DAY);
  if (daysLate <= 0) return null;
  const startsOn = new Date(due + DAY).toISOString().slice(0, 10);
  const ref = referenceRateFor(startsOn);
  if (!ref) return null;
  const rate = 8 + ref.base;
  const daily = (principal * rate) / 100 / 365;
  const interest = r2(daily * daysLate);
  const compensation = fixedCompensation(principal);
  return {
    principal: r2(principal),
    startsOn,
    referenceDate: ref.date,
    baseRate: ref.base,
    rate,
    daysLate,
    dailyInterest: r2(daily),
    interest,
    compensation,
    total: r2(principal + interest + compensation),
  };
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);
const longDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** The claim email, in plain words. Only ever offered for a business customer. */
export function statutoryClaimLetter(p: {
  claim: StatutoryClaim;
  customer: string;
  invoiceNumber: string;
  dueDate: string;
  companyName: string;
}): { subject: string; body: string } {
  const c = p.claim;
  return {
    subject: `Invoice ${p.invoiceNumber}: late payment interest and compensation`,
    body: `Dear ${p.customer || 'Sir or Madam'},

Invoice ${p.invoiceNumber} for ${gbp(c.principal)} was due for payment on ${longDate(p.dueDate)} and is now ${c.daysLate} days late.

As this is a business to business contract, we are entitled under the Late Payment of Commercial Debts (Interest) Act 1998 to claim statutory interest and a fixed sum for the cost of recovering the debt. We are now claiming them:

Amount outstanding: ${gbp(c.principal)}
Statutory interest at ${c.rate}% a year (8% plus the Bank of England base rate of ${c.baseRate}% on ${longDate(c.referenceDate)}) from ${longDate(c.startsOn)}, ${c.daysLate} days: ${gbp(c.interest)}
Fixed compensation: ${gbp(c.compensation)}
Total now due: ${gbp(c.total)}

Interest continues to build at ${gbp(c.dailyInterest)} a day until the debt is paid.

Please pay the total using the details on the invoice, quoting ${p.invoiceNumber}. If you think this is wrong, or you need to talk about paying, please reply to this email.

Yours sincerely,

${p.companyName}`,
  };
}
