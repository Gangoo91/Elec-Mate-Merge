import { supabase } from '@/integrations/supabase/client';
import { isKnownNonDwelling } from '@/utils/partP';

/**
 * Part P (Building Regulations) notification tracker — the rules.
 *
 * The tracker row (`part_p_notifications`) is opened when a certificate is
 * issued for work the CERTIFICATE says is notifiable, and closed when the
 * electrician submits it (or records on the certificate that they have).
 *
 * Two systems, one truth: `certificateSaysNotifiable` here mirrors
 * `part_p_certificate_verdict` in the database, and every close/reopen on
 * the tracker is written back to the certificate through
 * `record_building_regs_on_certificate`, so the printed document and the
 * to-do list can no longer disagree (ELE-1715).
 */

export type PartPReportType = 'eicr' | 'eic' | 'minor-works' | 'solar-pv' | 'ev-charging';
export type PartPVerdict = 'yes' | 'no' | 'unknown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>;

const truthy = (v: unknown): boolean => v === true || v === 'true';

/** Has the shared Building Regulations section been answered? (A "No" is an answer.) */
const buildingRegsAnswered = (f: FormData): boolean =>
  truthy(f.buildingRegsAnswered) ||
  truthy(f.buildingRegsRequired) ||
  truthy(f.buildingRegsViaScheme) ||
  truthy(f.buildingRegsSubmitted);

/**
 * What does the certificate say about Part P?
 *   'yes'     — notifiable work; the tracker should hold a row.
 *   'no'      — the electrician recorded it as not notifiable, or the
 *               premises is known not to be a dwelling.
 *   'unknown' — the question was never answered.
 *
 * ⚠️ Keep in step with `part_p_certificate_verdict` (SQL).
 */
export const certificateSaysNotifiable = (
  reportType: PartPReportType | string,
  formData: FormData
): PartPVerdict => {
  const f = formData || {};
  if (isKnownNonDwelling(f.installationType ?? f.propertyType)) return 'no';
  if (reportType === 'eicr') return 'no';
  if (reportType === 'minor-works') return truthy(f.partPNotification) ? 'yes' : 'no';
  if (buildingRegsAnswered(f)) return truthy(f.buildingRegsRequired) ? 'yes' : 'no';
  if (reportType === 'eic') {
    const ppc = String(f.partPCompliance || '');
    if (ppc === 'compliant') return 'yes';
    if (ppc === 'nonNotifiable' || ppc === 'notApplicable') return 'no';
  }
  return 'unknown';
};

/** Has the certificate recorded the notification as made? */
export const certificateSaysNotified = (formData: FormData): boolean => {
  const f = formData || {};
  return (
    truthy(f.buildingRegsViaScheme) ||
    truthy(f.buildingRegsSubmitted) ||
    String(f.buildingRegsReference || '').trim().length > 0
  );
};

/** Statuses that mean "nothing left to do". */
export const CLOSED_STATUSES: ReadonlySet<string> = new Set(['submitted', 'cancelled', 'not_required']);

export const isOpenNotification = (n: { notification_status: string }): boolean =>
  !CLOSED_STATUSES.has(n.notification_status);

/** A row shape that carries its certificate (as `useNotifications` returns). */
interface TrackedRow {
  notification_status: string;
  submission_deadline: string | null;
  reports?: { report_type: string; data: FormData | null } | null;
}

/** What the row's certificate says — 'yes' when the certificate isn't loaded. */
export const rowVerdict = (n: TrackedRow): PartPVerdict =>
  n.reports ? certificateSaysNotifiable(n.reports.report_type, n.reports.data || {}) : 'yes';

/** Open, and the certificate never said whether the work was notifiable. */
export const needsAnswerNotification = (n: TrackedRow): boolean =>
  isOpenNotification(n) && rowVerdict(n) === 'unknown';

/** Open, confirmed notifiable, and past its deadline. An unanswered row is never "overdue". */
export const isOverdueNotification = (n: TrackedRow): boolean =>
  isOpenNotification(n) &&
  rowVerdict(n) !== 'unknown' &&
  !!n.submission_deadline &&
  getDaysUntilDeadline(n.submission_deadline) < 0;

/**
 * Legacy keyword test kept for the EIC provider's compliance summary. The
 * tracker no longer uses it: since April 2013 kitchens and outdoor work are
 * not notifiable in England, so a keyword match would open false rows.
 */
export const isNotifiableWork = (
  workType: string,
  location?: string,
  isNewCircuit?: boolean
): boolean => {
  const w = (workType || '').toLowerCase();
  const l = (location || '').toLowerCase();
  if (isNewCircuit) return true;
  if (/new circuit|consumer unit|fuse ?board|board change/.test(w)) return true;
  return /bath|shower|swimming pool|sauna/.test(w) || /bath|shower|swimming pool|sauna/.test(l);
};

/** The day the work finished — the 30-day clock starts the day after. */
export const completionDateOf = (formData: FormData): Date => {
  const f = formData || {};
  const candidates = [
    f.completionDate,
    f.dateOfCompletion,
    f.workDate,
    f.installationDate,
    f.commissioningDate,
    f.inspectionDate,
    f.dateOfInspection,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) {
      const d = new Date(c);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return new Date();
};

/** 30 days from completion, as YYYY-MM-DD. */
export const calculateSubmissionDeadline = (completionDate: string | Date): string => {
  const date = new Date(completionDate);
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/** "Due in 5 days" / "Due today" / "Due tomorrow" / "3 days overdue". */
export const formatDeadlineStatus = (deadline: string): string => {
  const days = getDaysUntilDeadline(deadline);
  if (days > 1) return `Due in ${days} days`;
  if (days === 1) return 'Due tomorrow';
  if (days === 0) return 'Due today';
  const late = Math.abs(days);
  return `${late} ${late === 1 ? 'day' : 'days'} overdue`;
};

export const getDeadlineUrgency = (deadline: string): 'safe' | 'warning' | 'urgent' | 'overdue' => {
  const days = getDaysUntilDeadline(deadline);
  if (days < 0) return 'overdue';
  if (days <= 2) return 'urgent';
  if (days <= 7) return 'warning';
  return 'safe';
};

const WORK_FALLBACK: Record<string, string> = {
  eic: 'New installation or alteration',
  'minor-works': 'Minor works',
  'ev-charging': 'EV charge point installation',
  'solar-pv': 'Solar PV installation',
  eicr: 'Inspection',
};

/** A short description of the work for the tracker row. */
export const describeWork = (reportType: string, formData: FormData): string => {
  const f = formData || {};
  const text = [f.workDescription, f.descriptionOfWork, f.extentOfInstallation, f.workType, f.description]
    .map((v) => (typeof v === 'string' ? v.trim() : ''))
    .find((v) => v.length > 0);
  if (text) return text.length > 120 ? `${text.slice(0, 117)}…` : text;
  return WORK_FALLBACK[reportType] || 'Electrical installation';
};

/** Determine Building Control authority from postcode. */
export const getBuildingControlAuthority = async (postcode: string): Promise<string | null> => {
  if (!postcode) return null;
  const prefix = postcode.trim().toUpperCase().split(' ')[0].replace(/[0-9]/g, '');
  try {
    // The table is not in the generated Database types.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const { data, error } = await db
      .from('building_control_authorities')
      .select('authority_name, postcode_prefixes')
      .contains('postcode_prefixes', [prefix])
      .limit(1)
      .single();
    if (error || !data) return null;
    return (data as { authority_name: string }).authority_name;
  } catch {
    return null;
  }
};

/**
 * The certificate keys the notifications page reads. The hook selects ONLY
 * these from `reports.data` (a certificate averages 87 KB; one user's tracker
 * rows came to 7.6 MB before this), so anything new the card needs goes here.
 */
export const TRACKER_DATA_KEYS = [
  'clientEmail',
  'partPCompliance',
  'partPNotification',
  'buildingRegsAnswered',
  'buildingRegsRequired',
  'buildingRegsViaScheme',
  'buildingRegsSubmitted',
  'buildingRegsReference',
  'installationType',
  'propertyType',
  'completionDate',
  'dateOfCompletion',
  'workDate',
  'installationDate',
  'commissioningDate',
  'inspectionDate',
  'dateOfInspection',
] as const;

export type CreateNotificationResult = {
  success: boolean;
  notificationId?: string;
  /** Why no row was opened. `unanswered` means the certificate never said either way. */
  reason?: 'not_notifiable' | 'unanswered' | 'error';
  error?: string;
};

/**
 * Open (or reconcile) the tracker row when a certificate is issued.
 *
 * Only the certificate decides. If it says the work is not notifiable, an
 * existing open row is closed as not required; if it never answered, nothing
 * is opened and the caller can say so. If the certificate already records
 * the notification as made, the row opens straight into `submitted`.
 */
export const createNotificationFromCertificate = async (
  reportId: string,
  reportType: PartPReportType,
  formData: FormData,
  userId: string
): Promise<CreateNotificationResult> => {
  try {
    const verdict = certificateSaysNotifiable(reportType, formData);

    const { data: existing } = await supabase
      .from('part_p_notifications')
      .select('id, notification_status')
      .eq('report_id', reportId)
      .eq('user_id', userId)
      .maybeSingle();

    if (verdict === 'no') {
      if (existing && isOpenNotification(existing)) {
        await supabase
          .from('part_p_notifications')
          .update({ notification_status: 'not_required' } as never)
          .eq('id', existing.id);
      }
      return {
        success: false,
        reason: 'not_notifiable',
        error: 'The certificate records this work as not notifiable under Part P.',
      };
    }
    if (verdict === 'unknown') {
      return {
        success: false,
        reason: 'unanswered',
        error: 'The certificate does not say whether this work is notifiable.',
      };
    }

    const notified = certificateSaysNotified(formData);
    const nowIso = new Date().toISOString();

    if (existing) {
      if (notified && isOpenNotification(existing)) {
        await supabase
          .from('part_p_notifications')
          .update({
            notification_status: 'submitted',
            submitted_at: nowIso,
            local_authority_submitted: truthy(formData?.buildingRegsSubmitted),
          } as never)
          .eq('id', existing.id);
      } else if (existing.notification_status === 'not_required') {
        await supabase
          .from('part_p_notifications')
          .update({ notification_status: notified ? 'submitted' : 'pending', submitted_at: notified ? nowIso : null } as never)
          .eq('id', existing.id);
      }
      return { success: true, notificationId: existing.id };
    }

    const deadline = calculateSubmissionDeadline(completionDateOf(formData));
    const row = {
      user_id: userId,
      report_id: reportId,
      work_type: describeWork(reportType, formData),
      notification_status: notified ? 'submitted' : 'pending',
      submitted_at: notified ? nowIso : null,
      building_control_authority: formData?.buildingControlAuthority || null,
      submission_deadline: deadline,
      napit_submitted: false,
      niceic_submitted: false,
      local_authority_submitted: notified && truthy(formData?.buildingRegsSubmitted),
    };

    const { data, error } = await supabase
      .from('part_p_notifications')
      .insert(row as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return { success: false, reason: 'error', error: error.message };
    }
    return { success: true, notificationId: (data as { id: string }).id };
  } catch (error) {
    console.error('Exception creating notification:', error);
    return {
      success: false,
      reason: 'error',
      error: error instanceof Error ? error.message : 'Could not create the notification',
    };
  }
};

/**
 * Write the tracker's answer back onto the certificate. Best-effort from the
 * caller's point of view: the tracker row is already updated, so a failure
 * here is reported, not fatal.
 */
export const recordBuildingRegsOnCertificate = async (
  reportId: string,
  answer:
    | { required: true; viaScheme: boolean; direct: boolean; reference?: string | null }
    | { required: false }
): Promise<{ ok: boolean; error?: string }> => {
  // The RPC post-dates the generated Database types (same pattern as the history RPCs).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { error } = await db.rpc('record_building_regs_on_certificate', {
    p_report_id: reportId,
    p_required: answer.required,
    p_via_scheme: answer.required ? answer.viaScheme : false,
    p_direct: answer.required ? answer.direct : false,
    p_reference: answer.required ? answer.reference || null : null,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
};

/** Competent person scheme, as stored on company_profiles.registration_scheme (lower case). */
// Stored in display case — the certificate prints this value verbatim, and
// the page lower-cases it when reading.
export type SchemeValue = 'NAPIT' | 'NICEIC' | 'Stroma' | 'None';
export const SCHEME_OPTIONS: ReadonlyArray<{ value: SchemeValue; label: string }> = [
  { value: 'NAPIT', label: 'NAPIT' },
  { value: 'NICEIC', label: 'NICEIC' },
  { value: 'Stroma', label: 'Stroma' },
  { value: 'None', label: 'Not registered' },
];

/**
 * Save the scheme to the company profile (create the profile if there isn't
 * one yet). Settings reads the same column, so the two never disagree.
 */
export const saveRegistrationScheme = async (
  value: SchemeValue
): Promise<{ ok: boolean; error?: string }> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not signed in' };
  const { data: existing } = await supabase
    .from('company_profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();
  const res = existing
    ? await supabase.from('company_profiles').update({ registration_scheme: value }).eq('user_id', user.id)
    : await supabase
        .from('company_profiles')
        // company_name is NOT NULL; Settings fills it in later.
        .insert({ user_id: user.id, company_name: '', registration_scheme: value } as never);
  if (res.error) return { ok: false, error: res.error.message };
  return { ok: true };
};

/** UK postcode at the end of an address line, if there is one. */
export const postcodeOf = (address: string | null | undefined): string | null => {
  const m = (address || '').match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i);
  return m ? m[1].toUpperCase().replace(/\s+/, ' ') : null;
};

/**
 * The details a scheme portal or Building Notice asks for, in the order the
 * NAPIT / NICEIC forms ask for them, labelled so they paste readably.
 */
export const buildPortalDetails = (n: {
  work_type: string;
  submission_deadline: string | null;
  reports?: {
    certificate_number: string;
    client_name: string | null;
    installation_address: string | null;
    report_type: string;
    data: FormData | null;
  };
}): string => {
  const r = n.reports;
  const postcode = postcodeOf(r?.installation_address);
  const completed = r?.data ? completionDateOf(r.data) : null;
  const fmt = (d: Date | null) =>
    d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const work = n.work_type ? n.work_type.charAt(0).toUpperCase() + n.work_type.slice(1) : '';
  // An address that IS the postcode gets one line, not two.
  const postcodeLine =
    postcode && postcode !== (r?.installation_address || '').trim().toUpperCase() ? postcode : null;
  const lines: Array<[string, string | null | undefined]> = [
    ['Client', r?.client_name],
    ['Installation address', r?.installation_address],
    ['Postcode', postcodeLine],
    ['Certificate', r?.certificate_number],
    ['Certificate type', r ? REPORT_TYPE_LABELS[r.report_type] || r.report_type : null],
    ['Work', work],
    ['Completed', completed ? fmt(completed) : null],
    ['Notify by', n.submission_deadline ? fmt(new Date(n.submission_deadline)) : null],
  ];
  return lines
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`)
    .join('\n');
};

export const REPORT_TYPE_LABELS: Record<string, string> = {
  'minor-works': 'Minor Works',
  eic: 'EIC',
  eicr: 'EICR',
  'ev-charging': 'EV Charging',
  'solar-pv': 'Solar PV',
};

/** Kept for older callers; the card no longer derives status from the three flags. */
export const updateNotificationStatus = (
  napitSubmitted: boolean,
  niceicSubmitted: boolean,
  localAuthoritySubmitted: boolean,
  currentStatus: string
): string => {
  const anySubmitted = napitSubmitted || niceicSubmitted || localAuthoritySubmitted;
  if (anySubmitted) return 'submitted';
  if (currentStatus === 'submitted' || currentStatus === 'in-progress') return 'pending';
  return currentStatus;
};
