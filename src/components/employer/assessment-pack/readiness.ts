/**
 * Readiness before a scheme assessment (ELE-2069): the real gaps in the
 * firm's own records, each with the page that fixes it. Nothing estimated:
 * a gap is only raised from data we hold.
 */
import type { AssessmentPackData, PackPerson, PackQualification } from './types';
import { checkInsurance } from '@/components/employer/compliance/insurance';
import type { ComplianceDocument } from '@/hooks/useComplianceDocuments';
import { money } from '@/components/employer/compliance/insurance';
import type { Scheme } from './schemes';

export type GapArea =
  | 'Registration'
  | 'Qualified Supervisor'
  | 'Competence'
  | 'Instruments'
  | 'Certificates'
  | 'Part P'
  | 'Complaints'
  | 'Insurance'
  | 'Policies'
  | 'Health and safety';

export interface Gap {
  key: string;
  area: GapArea;
  text: string;
  /** red = an assessor would raise it; volt = tidy before the visit. */
  tone: 'red' | 'volt';
  fixLabel: string;
  route: string;
}

const REGS = ['18th_edition', 'cg_2382_22', 'eal_18th_edition'];
const INSPECTION = [
  '2391_52',
  '2391_51',
  '2391_50',
  '2394',
  '2395',
  'eal_inspection_testing',
  'eal_initial_verification',
  'eal_periodic_testing',
];

const has = (q: PackQualification[], codes: string[], words: RegExp) =>
  q.some(
    (x) =>
      (x.training_status == null || x.training_status === 'Completed') &&
      (codes.includes(x.code) || words.test(`${x.code} ${x.label}`))
  );

export const hasRegs = (p: PackPerson) => has(p.qualifications, REGS, /18th|2382|bs ?7671/i);
export const hasInspection = (p: PackPerson) =>
  has(p.qualifications, INSPECTION, /2391|2394|2395|inspection|initial verification/i);

const isApprentice = (p: PackPerson) => /apprentice/i.test(`${p.team_role} ${p.role}`);
const isSub = (p: PackPerson) => /subcontractor/i.test(`${p.team_role}`);
const isOperative = (p: PackPerson) => !isApprentice(p) && !isSub(p);

export const qsPeople = (d: AssessmentPackData) =>
  d.team.filter(
    (p) => p.is_principal_qs || /^qs$/i.test(p.team_role ?? '') || /^qs$/i.test(p.role ?? '')
  );

const addDaysIso = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const member = (p: PackPerson) => `/employer?section=elecid&member=${p.id}`;

export function findGaps(d: AssessmentPackData, today: string, scheme: Scheme): Gap[] {
  const gaps: Gap[] = [];
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  const f = d.firm;

  // Registration
  if (!f?.registration_scheme || !f?.registration_number) {
    gaps.push({
      key: 'reg-missing',
      area: 'Registration',
      text: 'Your scheme and registration number are not set, so they are missing from every certificate.',
      tone: 'red',
      fixLabel: 'Add it in settings',
      route: '/settings',
    });
  } else if (f.registration_expiry && f.registration_expiry < today) {
    gaps.push({
      key: 'reg-lapsed',
      area: 'Registration',
      text: `Your ${f.registration_scheme} registration shows as lapsed on ${f.registration_expiry}.`,
      tone: 'red',
      fixLabel: 'Update it',
      route: '/settings',
    });
  }

  // Qualified Supervisor
  const qs = qsPeople(d);
  if (!qs.length && !f?.owner_is_qs) {
    gaps.push({
      key: 'qs-none',
      area: 'Qualified Supervisor',
      text: 'No Qualified Supervisor is named. Mark the QS on the team, or say the owner is the QS.',
      tone: 'red',
      fixLabel: 'Set the QS',
      route: '/employer?section=settings',
    });
  }
  const inspector = (f?.inspector_name ?? '').trim().toLowerCase();
  const fromSettings = (f?.inspector_qualifications ?? []).join(' ');
  for (const p of qs) {
    const isInspector = !!inspector && p.name.trim().toLowerCase() === inspector;
    const settingsRegs = isInspector && /18th|2382|bs ?7671/i.test(fromSettings);
    const settingsIT =
      isInspector && /2391|2394|2395|inspection|initial verification/i.test(fromSettings);
    if (!hasRegs(p) && !settingsRegs)
      gaps.push({
        key: `qs-regs-${p.id}`,
        area: 'Qualified Supervisor',
        text: `${p.name} is the QS but has no current BS 7671 (18th Edition) qualification on record.`,
        tone: 'red',
        fixLabel: 'Add the certificate',
        route: member(p),
      });
    if (!hasInspection(p) && !settingsIT)
      gaps.push({
        key: `qs-it-${p.id}`,
        area: 'Qualified Supervisor',
        text: `${p.name} is the QS but has no inspection and testing qualification (such as 2391) on record.`,
        tone: 'red',
        fixLabel: 'Add the certificate',
        route: member(p),
      });
  }

  // Competence
  for (const p of d.team.filter(isOperative)) {
    if (qs.includes(p)) continue;
    if (!p.qualifications.length) {
      gaps.push({
        key: `comp-none-${p.id}`,
        area: 'Competence',
        text: `${p.name} has no qualifications on record.`,
        tone: 'volt',
        fixLabel: 'Add them',
        route: member(p),
      });
      continue;
    }
    if (!hasRegs(p))
      gaps.push({
        key: `comp-regs-${p.id}`,
        area: 'Competence',
        text: `${p.name} is missing the 18th Edition (BS 7671) on record.`,
        tone: 'volt',
        fixLabel: 'Add it',
        route: member(p),
      });
    const expired = p.qualifications.filter((q) => q.expiry && q.expiry < today);
    if (expired.length)
      gaps.push({
        key: `comp-exp-${p.id}`,
        area: 'Competence',
        text: `${p.name}: ${expired.map((q) => q.label).join(', ')} expired.`,
        tone: 'volt',
        fixLabel: 'Renew',
        route: member(p),
      });
  }

  // Instruments
  const kitSerials = new Set(
    d.instruments.map((i) => (i.serial ?? '').replace(/\s/g, '').toUpperCase()).filter(Boolean)
  );
  const onCerts = Array.isArray(f?.testing_instruments)
    ? (f!.testing_instruments as { make?: string; model?: string; serial_number?: string }[])
    : [];
  if (!d.instruments.length && !onCerts.length) {
    gaps.push({
      key: 'kit-none',
      area: 'Instruments',
      text: 'No test instruments in the kit register, so there is no calibration record to show.',
      tone: 'red',
      fixLabel: 'Add your tester',
      route: '/employer?section=kit',
    });
  }
  for (const c of onCerts) {
    const s = (c.serial_number ?? '').replace(/\s/g, '').toUpperCase();
    if (s && !kitSerials.has(s))
      gaps.push({
        key: `kit-untracked-${s}`,
        area: 'Instruments',
        text: `${[c.make, c.model].filter(Boolean).join(' ') || 'An instrument'} (serial ${c.serial_number}) is on your certificates but not in the kit register, so its calibration is not tracked.`,
        tone: 'volt',
        fixLabel: 'Add it to the kit register',
        route: '/employer?section=kit',
      });
  }
  for (const i of d.instruments) {
    const due = i.next_calibration;
    if (!due)
      gaps.push({
        key: `kit-nodate-${i.id}`,
        area: 'Instruments',
        text: `${i.name} has no calibration due date.`,
        tone: 'volt',
        fixLabel: 'Record its calibration',
        route: `/employer?section=kit&tool=${i.id}`,
      });
    else if (due < today)
      gaps.push({
        key: `kit-overdue-${i.id}`,
        area: 'Instruments',
        text: `${i.name} is out of calibration since ${due}.`,
        tone: 'red',
        fixLabel: 'Record its calibration',
        route: `/employer?section=kit&tool=${i.id}`,
      });
    else if (due <= in30)
      gaps.push({
        key: `kit-soon-${i.id}`,
        area: 'Instruments',
        text: `${i.name} is due calibration on ${due}.`,
        tone: 'volt',
        fixLabel: 'Book it',
        route: `/employer?section=kit&tool=${i.id}`,
      });
  }

  // Certificates and QS
  const returned = d.qs_reviews.filter((q) => q.status === 'returned').length;
  if (returned)
    gaps.push({
      key: 'qs-returned',
      area: 'Certificates',
      text: `${returned} ${returned === 1 ? 'certificate is' : 'certificates are'} still returned by the QS for changes.`,
      tone: 'volt',
      fixLabel: 'Open QS reviews',
      route: '/employer?section=qsreviews',
    });
  const pending = d.qs_reviews.filter((q) => q.status === 'pending').length;
  if (pending)
    gaps.push({
      key: 'qs-pending',
      area: 'Certificates',
      text: `${pending} ${pending === 1 ? 'certificate is' : 'certificates are'} waiting for QS sign-off.`,
      tone: 'volt',
      fixLabel: 'Open QS reviews',
      route: '/employer?section=qsreviews',
    });
  if (!d.certificates.length)
    gaps.push({
      key: 'certs-none',
      area: 'Certificates',
      text: 'No completed certificates in this period, so there is nothing to sample.',
      tone: 'volt',
      fixLabel: 'Change the period',
      route: '',
    });

  // Part P: the law gives 30 days (reg 20(3)); NAPIT asks for 21.
  const shift = 30 - scheme.partPDays;
  const lateBy = (deadline: string) => {
    const d0 = new Date(`${deadline}T00:00:00`);
    d0.setDate(d0.getDate() - shift);
    return d0.toISOString().slice(0, 10) < today;
  };
  const ppLate = d.certificates.filter(
    (c) =>
      c.part_p &&
      ['pending', 'in-progress', 'overdue'].includes(c.part_p.status) &&
      c.part_p.deadline &&
      lateBy(c.part_p.deadline)
  );
  if (ppLate.length)
    gaps.push({
      key: 'pp-late',
      area: 'Part P',
      text: `${ppLate.length} notifiable ${ppLate.length === 1 ? 'job was' : 'jobs were'} not notified within ${scheme.partPDays} days${scheme.partPDays < 30 ? ` (${scheme.name} rule; the law allows 30)` : ''}.`,
      tone: 'red',
      fixLabel: 'Open Testing',
      route: '/employer?section=testing',
    });
  const ppNoRef = d.certificates.filter(
    (c) => c.part_p?.status === 'submitted' && !c.part_p.reference
  ).length;
  const ppNone = d.certificates.filter(
    (c) =>
      c.part_p_verdict === 'yes' && !c.part_p && c.issued_on < addDaysIso(today, -scheme.partPDays)
  ).length;
  if (ppNone)
    gaps.push({
      key: 'pp-none',
      area: 'Part P',
      text: `${ppNone} notifiable ${ppNone === 1 ? 'job has' : 'jobs have'} no Part P notification on record.`,
      tone: 'red',
      fixLabel: 'Open Testing',
      route: '/employer?section=testing',
    });
  if (ppNoRef)
    gaps.push({
      key: 'pp-noref',
      area: 'Part P',
      text: `${ppNoRef} Part P ${ppNoRef === 1 ? 'notification has' : 'notifications have'} no scheme reference recorded.`,
      tone: 'volt',
      fixLabel: 'Open Testing',
      route: '/employer?section=testing',
    });

  // Complaints
  const openLate = d.complaints.filter(
    (c) =>
      !c.closed_on &&
      ((c.response_due && c.response_due < today) ||
        (c.kind === 'data_protection' &&
          !c.acknowledged_on &&
          new Date(`${c.received_on}T00:00:00`).getTime() + 30 * 86400000 < Date.now()))
  );
  if (openLate.length)
    gaps.push({
      key: 'complaints-late',
      area: 'Complaints',
      text: `${openLate.length} ${openLate.length === 1 ? 'complaint is' : 'complaints are'} past the reply date.`,
      tone: 'red',
      fixLabel: 'Open the log',
      route: '/employer?section=compliance&complaints=1',
    });
  if (!d.policies.some((p) => /complain/i.test(p.name)))
    gaps.push({
      key: 'complaints-procedure',
      area: 'Policies',
      text: 'No written complaints procedure in your policies. Assessors ask for the procedure as well as the log.',
      tone: 'volt',
      fixLabel: 'Open policies',
      route: '/employer?section=policies',
    });

  // Health and safety policy statement (EAS 15.5.8, NICEIC AC 6.1(i))
  if (!d.policies.some((p) => /health\s*(&|and)\s*safety/i.test(p.name)))
    gaps.push({
      key: 'hs-policy',
      area: 'Health and safety',
      text: 'No health and safety policy statement in your policies. Every scheme asks for one.',
      tone: 'red',
      fixLabel: 'Adopt one',
      route: '/employer?section=policies',
    });

  // Scheme insurance minimums: £2m public liability; £250k PI with EICRs.
  const docs = d.documents as unknown as ComplianceDocument[];
  const pl = docs.find((x) => x.insurance_kind === 'public_liability' && x.cover_amount != null);
  if (pl && pl.cover_amount! < scheme.plMinimum)
    gaps.push({
      key: 'ins-pl-low',
      area: 'Insurance',
      text: `Public liability cover ${money(pl.cover_amount)} is under the ${scheme.name} minimum of ${money(scheme.plMinimum)}.`,
      tone: 'red',
      fixLabel: 'Open it',
      route: `/employer?section=compliance&doc=${pl.id}`,
    });
  const doesEicr = d.certificates.some((c) => c.report_type === 'eicr');
  const pi = docs.find((x) => x.insurance_kind === 'professional_indemnity');
  if (doesEicr && !pi)
    gaps.push({
      key: 'ins-pi-missing',
      area: 'Insurance',
      text: `You issue EICRs, so ${scheme.name} asks for at least ${money(scheme.piMinimumWithEicr)} professional indemnity. None is on file.`,
      tone: 'red',
      fixLabel: 'Add it',
      route: '/employer?section=compliance',
    });
  else if (doesEicr && pi?.cover_amount != null && pi.cover_amount < scheme.piMinimumWithEicr)
    gaps.push({
      key: 'ins-pi-low',
      area: 'Insurance',
      text: `Professional indemnity ${money(pi.cover_amount)} is under the ${money(scheme.piMinimumWithEicr)} asked for with periodic inspection.`,
      tone: 'red',
      fixLabel: 'Open it',
      route: `/employer?section=compliance&doc=${pi.id}`,
    });

  // Insurance
  const employs = d.team.some((p) => !p.is_owner && !isSub(p));
  for (const c of checkInsurance(d.documents as unknown as ComplianceDocument[], {
    employsPeople: employs,
  })) {
    if (!c.problem) continue;
    if (c.kind !== 'public_liability' && c.kind !== 'employers_liability' && c.tone !== 'red')
      continue;
    gaps.push({
      key: `ins-${c.kind}`,
      area: 'Insurance',
      text: `${c.label}: ${c.problem.charAt(0).toLowerCase()}${c.problem.slice(1)}.`,
      tone: c.tone === 'red' ? 'red' : 'volt',
      fixLabel: c.doc ? 'Open it' : 'Add it',
      route: c.doc
        ? `/employer?section=compliance&doc=${c.doc.id}`
        : '/employer?section=compliance',
    });
  }

  return gaps;
}
