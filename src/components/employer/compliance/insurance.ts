/**
 * Insurance register (ELE-2076). An insurance policy is a compliance
 * document with insurance_kind set, so the register's reminders
 * (notify_employer_expiries, 30 and 7 days and overdue) and the Overview
 * to-do cover renewals without anything new.
 *
 * Employers' liability: an employer must hold at least £5 million cover
 * (Employers' Liability (Compulsory Insurance) Regulations 1998, reg 3) and
 * display the certificate where employees can read it, electronically if
 * they can reach it (reg 5, as amended 2008). Fines: up to £2,500 for each
 * day without cover, up to £1,000 for not displaying the certificate (HSE).
 * Exempt (HSE40, ELCI Act 1969 s.3, 1998 Regs Sch 2): a family business whose
 * employees are all close relatives, unless it is a limited company; a
 * company whose only employee is the owner holding 50% or more of the
 * shares; most public bodies. We cannot tell from the app, so missing EL
 * cover is "check", not a red failure.
 *
 * Public liability is generally voluntary (HSE40); schemes and main
 * contractors usually ask for it, so missing PL is a prompt, not a breach.
 */
import type { ComplianceDocument, InsuranceKind } from '@/hooks/useComplianceDocuments';

export const EL_MINIMUM = 5_000_000;

export const INSURANCE_KINDS: { kind: InsuranceKind; label: string; hint: string }[] = [
  {
    kind: 'public_liability',
    label: 'Public liability',
    hint: 'Not a legal requirement, but your scheme and most main contractors ask for it.',
  },
  {
    kind: 'employers_liability',
    label: "Employers' liability",
    hint: 'Required by law once you employ someone, unless exempt (for example a family business that is not a limited company). At least £5 million.',
  },
  {
    kind: 'professional_indemnity',
    label: 'Professional indemnity',
    hint: 'Covers design and advice.',
  },
  { kind: 'contract_works', label: 'Contract works', hint: 'The works while you build them.' },
  { kind: 'vehicle', label: 'Vans', hint: 'Fleet or each van.' },
  { kind: 'tools', label: 'Tools', hint: 'Tools and test kit.' },
  { kind: 'other', label: 'Other insurance', hint: '' },
];

export const insuranceLabel = (k?: InsuranceKind | null) =>
  INSURANCE_KINDS.find((x) => x.kind === k)?.label ?? 'Insurance';

/** Did a free-typed title mean a particular cover? For rows saved before the
 *  register had a type. */
export function guessInsuranceKind(doc: ComplianceDocument): InsuranceKind | null {
  if (doc.insurance_kind) return doc.insurance_kind;
  const h = `${doc.title ?? ''} ${doc.category ?? ''}`.toLowerCase();
  if (!h.includes('insur') && !/\b(pl|el|pi)\b/.test(h) && !h.includes('liabil')) return null;
  if (h.includes('employer')) return 'employers_liability';
  if (h.includes('public')) return 'public_liability';
  if (h.includes('professional') || h.includes('indemnity')) return 'professional_indemnity';
  if (h.includes('contract works') || h.includes('contractors all risk')) return 'contract_works';
  if (h.includes('van') || h.includes('vehicle') || h.includes('fleet') || h.includes('motor'))
    return 'vehicle';
  if (h.includes('tool')) return 'tools';
  return 'other';
}

export const money = (n?: number | null) =>
  n == null
    ? ''
    : n >= 1_000_000
      ? `£${(n / 1_000_000).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`
      : `£${n.toLocaleString('en-GB')}`;

export type InsuranceCheck = {
  kind: InsuranceKind;
  label: string;
  doc: ComplianceDocument | null;
  /** What is wrong, in a few words. Null when it is fine. */
  problem: string | null;
  tone: 'red' | 'volt' | 'green' | 'neutral';
  status: string;
};

const today = () => new Date().toISOString().slice(0, 10);

/** One line per cover type: the newest policy of that type and what is wrong. */
export function checkInsurance(
  docs: ComplianceDocument[],
  opts: { employsPeople: boolean }
): InsuranceCheck[] {
  const t = today();
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  return INSURANCE_KINDS.filter((k) => k.kind !== 'other').map(({ kind, label }) => {
    const mine = docs
      .filter((d) => guessInsuranceKind(d) === kind)
      .sort((a, b) => (b.expiry_date ?? '').localeCompare(a.expiry_date ?? ''));
    const doc = mine[0] ?? null;
    if (!doc) {
      if (kind === 'employers_liability' && opts.employsPeople)
        return {
          kind,
          label,
          doc,
          problem: 'Not on file. Required by law unless exempt',
          tone: 'volt',
          status: 'Check',
        };
      if (kind === 'public_liability')
        return {
          kind,
          label,
          doc,
          problem: 'Not on file. Optional, but contractors usually ask for it',
          tone: 'volt',
          status: 'Not on file',
        };
      return { kind, label, doc, problem: null, tone: 'neutral', status: 'Not held' };
    }
    const exp = doc.expiry_date?.slice(0, 10);
    if (exp && exp < t)
      return { kind, label, doc, problem: 'Lapsed', tone: 'red', status: 'Lapsed' };
    if (kind === 'employers_liability' && doc.cover_amount != null && doc.cover_amount < EL_MINIMUM)
      return {
        kind,
        label,
        doc,
        problem: `Cover ${money(doc.cover_amount)} is under the £5m legal minimum`,
        tone: 'red',
        status: 'Under £5m',
      };
    if (kind === 'employers_liability' && doc.cover_amount == null)
      return {
        kind,
        label,
        doc,
        problem: 'Add the cover amount to check the £5m minimum',
        tone: 'volt',
        status: 'Add cover',
      };
    if (!doc.file_url)
      return {
        kind,
        label,
        doc,
        problem: 'No certificate attached',
        tone: 'volt',
        status: 'No certificate',
      };
    if (!exp)
      return { kind, label, doc, problem: 'No renewal date', tone: 'volt', status: 'No date' };
    if (exp <= in30)
      return { kind, label, doc, problem: null, tone: 'volt', status: 'Renews soon' };
    return { kind, label, doc, problem: null, tone: 'green', status: 'In date' };
  });
}
