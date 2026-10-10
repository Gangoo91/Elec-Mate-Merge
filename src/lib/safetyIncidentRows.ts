/* ==========================================================================
   A worker's safety report as a Site Safety record (ELE-2031).

   Worker Tools → Reports files a near miss or an incident against a firm job.
   Since ELE-2031 that is the worker's own Site Safety record, the same rows
   the Electrical Hub's near-miss register and accident book use:

     near miss, or an incident where nobody was hurt  → near_miss_reports
     somebody was hurt                                → accident_records

   employer_job_id links it to the firm; the server trigger
   (safety_set_employer_scope) sets employer_id and checks the worker is on
   that job, and safety_notify_firm_incident rings the office bell once.
   ========================================================================== */

/** A moment as London date (YYYY-MM-DD) and time (HH:MM). */
export function londonParts(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(Number.isNaN(d.getTime()) ? new Date() : d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
  const hour = get('hour') === '24' ? '00' : get('hour');
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${hour}:${get('minute')}` };
}

/** What kind of no-injury incident it was (near_miss_reports.incident_kind). */
export type WorkerIncidentKind =
  | 'near_miss'
  | 'property_damage'
  | 'faulty_equipment'
  | 'unsafe_practice'
  | 'other';

/** The outbox payload for a safety report (target set = the Site Safety path). */
export interface WorkerSafetyPayload {
  target: 'near_miss' | 'accident';
  jobId: string;
  jobTitle?: string | null;
  employeeId: string;
  reporterName?: string | null;
  /** The worker form's own scale. */
  workerSeverity: 'minor' | 'moderate' | 'critical';
  description: string;
  location?: string | null;
  incidentKind?: WorkerIncidentKind;
  injuredName?: string | null;
  injuredEmployeeId?: string | null;
  injuryType?: string | null;
  bodyPart?: string | null;
}

const NEAR_MISS_SEVERITY = { minor: 'low', moderate: 'medium', critical: 'critical' } as const;
const ACCIDENT_SEVERITY = { minor: 'minor', moderate: 'moderate', critical: 'major' } as const;

const CATEGORY: Partial<Record<WorkerIncidentKind, string>> = {
  faulty_equipment: 'tool_equipment',
  unsafe_practice: 'worksite_hazard',
};

/** The table and row for one report. `photos` are visual-uploads paths. */
export function workerSafetyRow(
  p: WorkerSafetyPayload,
  opts: { id: string; userId: string; createdAt: string; photos: string[] }
): { table: 'near_miss_reports' | 'accident_records'; row: Record<string, unknown> } {
  const when = londonParts(opts.createdAt);
  const location = p.location?.trim() || p.jobTitle?.trim() || 'On site';
  const reporter = p.reporterName?.trim() || 'Team member';

  if (p.target === 'accident') {
    const severity = ACCIDENT_SEVERITY[p.workerSeverity] ?? 'minor';
    // Same rule as the accident book: a major injury is reportable without delay.
    const reportable = severity === 'major';
    return {
      table: 'accident_records',
      row: {
        id: opts.id,
        user_id: opts.userId,
        employer_job_id: p.jobId,
        injured_name: p.injuredName?.trim() || reporter,
        injured_employee_id: p.injuredEmployeeId || null,
        incident_date: when.date,
        incident_time: when.time,
        location,
        injury_type: p.injuryType || 'other',
        body_part: p.bodyPart || 'multiple',
        severity,
        incident_description: p.description,
        recorded_by: reporter,
        photos: opts.photos,
        is_riddor_reportable: reportable,
        riddor_deadline: reportable ? when.date : null,
        created_at: opts.createdAt,
      },
    };
  }

  const kind = p.incidentKind ?? 'near_miss';
  const severity = NEAR_MISS_SEVERITY[p.workerSeverity] ?? 'medium';
  return {
    table: 'near_miss_reports',
    row: {
      id: opts.id,
      user_id: opts.userId,
      employer_job_id: p.jobId,
      incident_date: when.date,
      incident_time: when.time,
      location,
      reporter_name: reporter,
      category: CATEGORY[kind] ?? 'other',
      incident_kind: kind,
      severity,
      description: p.description,
      photos: opts.photos,
      status: 'open',
      follow_up_required: severity === 'critical',
      created_at: opts.createdAt,
    },
  };
}
