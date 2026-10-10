import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useToast } from '@/hooks/use-toast';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { EMPLOYER_HOME_KEY } from '@/hooks/useEmployerHome';
import { londonParts } from '@/lib/safetyIncidentRows';

/* ==========================================================================
   The firm's incidents (ELE-1945, ELE-2031).

   One incident model for both hubs: Site Safety's near_miss_reports and
   accident_records. The Employer Hub reads them through get_firm_incidents(),
   which also returns any rows in the older employer_incidents table (live
   builds before ELE-2031 still write there), normalised to one shape.

     source 'near_miss'  near misses and incidents where nobody was hurt
     source 'accident'   injuries (the accident book)
     source 'legacy'     employer_incidents, edited as before

   A worker's own report (filed against a firm job) stays theirs: the office
   reads it, countersigns it and records its follow-up (seen, investigation,
   actions, RIDDOR, close-out) through firm_incident_update(), never by
   editing what the worker wrote. A report the office made itself is the
   firm's, and the office can edit it.
   ========================================================================== */

export type IncidentType =
  | 'near_miss'
  | 'unsafe_practice'
  | 'faulty_equipment'
  | 'injury'
  | 'property_damage'
  | 'environmental'
  | 'security'
  | 'dangerous_occurrence'
  | 'other';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

// 'open' is written by worker-side safety reports — treat it as a first-class
// open state alongside the employer-side vocabulary.
export type IncidentStatus =
  'open' | 'draft' | 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';

export type IncidentSource = 'legacy' | 'near_miss' | 'accident';

export interface Incident {
  id: string;
  source: IncidentSource;
  employer_id: string;
  job_id?: string | null;
  job_title?: string | null;
  /** employer_employees.id (worker reports) or a display name (office reports) */
  reported_by?: string | null;
  reported_by_id?: string | null;
  /** Who reported it, resolved on the server. */
  reporter_name?: string | null;
  reporter_employee_id?: string | null;
  /** The office made this record (it can edit it). False = a worker's own report. */
  firm_made: boolean;
  /** The office may change what the report says (not just its follow-up). */
  can_edit: boolean;
  incident_type: IncidentType;
  title: string;
  description: string;
  location: string;
  date_occurred: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  immediate_action_taken?: string;
  potential_consequences?: string;
  witnesses?: string;
  supervisor_notified?: boolean;
  supervisor_name?: string;
  equipment_involved?: string;
  injuries_sustained?: string;
  first_aid_given?: boolean;
  photos_attached?: boolean;
  follow_up_required?: boolean;
  follow_up_notes?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  /** Storage paths (private visual-uploads) or safety-photos URLs. */
  photos?: string[];
  injured_person?: string | null;
  injured_employee_id?: string | null;
  /** Accident book vocabulary (DigitalAccidentBook), injuries only. */
  injury_type?: string | null;
  body_part?: string | null;
  hospital_visit?: boolean;
  days_off?: number | null;
  root_cause?: string | null;
  investigation_notes?: string | null;
  corrective_actions?: CorrectiveAction[];
  /** Null = nobody in the office has opened it yet. Set by acknowledge_incident(). */
  acknowledged_at?: string | null;
  closed_at?: string | null;
  /** The outcome the reporter is told when the report is closed. */
  closeout_summary?: string | null;
  riddor_category?: RiddorCategory | null;
  riddor_reported_at?: string | null;
  riddor_reference?: string | null;
  /** Site Safety record number, e.g. NM-2026-0012. */
  record_number?: string | null;
  countersigned_name?: string | null;
  countersigned_at?: string | null;
}

export interface CorrectiveAction {
  id: string;
  action: string;
  owner_employee_id?: string | null;
  owner_name?: string | null;
  /** YYYY-MM-DD */
  due_date?: string | null;
  done_at?: string | null;
  done_note?: string | null;
  /** Set when the office un-ticks it; the server keeps a Done otherwise. */
  reopened_at?: string | null;
}

export type RiddorCategory =
  | 'death'
  | 'specified_injury'
  | 'over_7_day'
  | 'non_worker_hospital'
  | 'dangerous_occurrence'
  | 'occupational_disease'
  | 'not_reportable';

export const RIDDOR_CATEGORIES: { value: RiddorCategory; label: string; description: string }[] = [
  {
    value: 'specified_injury',
    label: 'Specified injury',
    description:
      'Fracture (not fingers, thumbs, toes), amputation, serious burn, loss of sight, crush to head or torso, loss of consciousness',
  },
  {
    value: 'over_7_day',
    label: 'Over 7 days off',
    description:
      'A worker is off or on light duties for more than 7 days in a row, not counting the day it happened',
  },
  {
    value: 'non_worker_hospital',
    label: 'Member of the public to hospital',
    description: 'Someone who does not work for you is taken straight to hospital for treatment',
  },
  {
    value: 'dangerous_occurrence',
    label: 'Dangerous occurrence',
    description:
      'A listed near miss, such as electrical short circuit or overload causing fire or explosion',
  },
  { value: 'death', label: 'Death', description: 'Any work-related death' },
  {
    value: 'occupational_disease',
    label: 'Occupational disease',
    description: 'A diagnosed reportable disease, such as hand-arm vibration syndrome',
  },
  {
    value: 'not_reportable',
    label: 'Not reportable',
    description: 'You have checked and none of the above apply',
  },
];

export const INCIDENT_TYPE_LABEL: Record<string, string> = {
  near_miss: 'Near miss',
  unsafe_practice: 'Unsafe practice',
  faulty_equipment: 'Faulty equipment',
  injury: 'Injury',
  property_damage: 'Property damage',
  environmental: 'Environmental',
  security: 'Security',
  dangerous_occurrence: 'Dangerous occurrence',
  incident: 'Incident',
  other: 'Other',
};

/** Accident book injury types (same ids as DigitalAccidentBook). */
export const INJURY_TYPES: { value: string; label: string }[] = [
  { value: 'cut-laceration', label: 'Cut or laceration' },
  { value: 'burn', label: 'Burn (heat or chemical)' },
  { value: 'electric-shock', label: 'Electric shock' },
  { value: 'fracture', label: 'Fracture or break' },
  { value: 'sprain-strain', label: 'Sprain or strain' },
  { value: 'bruise-contusion', label: 'Bruise' },
  { value: 'eye-injury', label: 'Eye injury' },
  { value: 'chemical-exposure', label: 'Chemical exposure' },
  { value: 'fall-injury', label: 'Fall injury' },
  { value: 'crush-injury', label: 'Crush injury' },
  { value: 'head-injury', label: 'Head injury' },
  { value: 'respiratory', label: 'Breathing problem' },
  { value: 'other', label: 'Other' },
];

/** Accident book body parts (same ids as DigitalAccidentBook). */
export const BODY_PARTS: { value: string; label: string }[] = [
  { value: 'head', label: 'Head' },
  { value: 'face', label: 'Face' },
  { value: 'eyes', label: 'Eyes' },
  { value: 'neck', label: 'Neck' },
  { value: 'shoulder', label: 'Shoulder' },
  { value: 'arm', label: 'Arm or elbow' },
  { value: 'hand-fingers', label: 'Hand or fingers' },
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'abdomen', label: 'Abdomen' },
  { value: 'hip', label: 'Hip or pelvis' },
  { value: 'leg', label: 'Leg or thigh' },
  { value: 'knee', label: 'Knee' },
  { value: 'foot-toes', label: 'Foot or toes' },
  { value: 'multiple', label: 'More than one area' },
];

/** The four severities as the accident book names them, for an injury. */
export const INJURY_SEVERITY_LABEL: Record<SeverityLevel, string> = {
  low: 'Minor',
  medium: 'Moderate',
  high: 'Major',
  critical: 'Fatal',
};

const TO_ACCIDENT_SEVERITY: Record<SeverityLevel, string> = {
  low: 'minor',
  medium: 'moderate',
  high: 'major',
  critical: 'fatal',
};

/** near_miss_reports.incident_kind values (database check constraint). */
const NEAR_MISS_KINDS: string[] = [
  'near_miss',
  'unsafe_practice',
  'faulty_equipment',
  'property_damage',
  'environmental',
  'security',
  'dangerous_occurrence',
  'other',
];

/** Near-miss register category for an Employer Hub incident type. */
const NEAR_MISS_CATEGORY: Partial<Record<IncidentType, string>> = {
  faulty_equipment: 'tool_equipment',
  unsafe_practice: 'worksite_hazard',
};

export const isRiddorReportable = (c?: RiddorCategory | null) => !!c && c !== 'not_reportable';

/** HSE deadline from the date it happened. Disease is reported on diagnosis. */
export function riddorDeadline(
  incident: Pick<Incident, 'riddor_category' | 'date_occurred'>
): Date | null {
  const c = incident.riddor_category;
  if (!isRiddorReportable(c) || c === 'occupational_disease') return null;
  const d = new Date(incident.date_occurred);
  d.setDate(d.getDate() + (c === 'over_7_day' ? 15 : 10));
  return d;
}

/** The single next thing the office should do with this report. */
export function incidentNextStep(i: Incident): {
  label: string;
  tone: 'red' | 'amber' | 'emerald';
} {
  const closed = i.status === 'closed' || i.status === 'resolved';
  if (closed) return { label: 'Closed', tone: 'emerald' };
  const today = new Date().toISOString().slice(0, 10);
  if (i.incident_type === 'injury' && !i.riddor_category)
    return { label: 'Decide whether it is RIDDOR-reportable', tone: 'red' };
  if (isRiddorReportable(i.riddor_category) && !i.riddor_reported_at) {
    const d = riddorDeadline(i);
    if (d) {
      const days = Math.ceil((d.getTime() - Date.now()) / 86_400_000);
      return {
        label:
          days < 0
            ? `RIDDOR report ${-days} day${days === -1 ? '' : 's'} late`
            : `Report to HSE within ${days} day${days === 1 ? '' : 's'}`,
        tone: 'red',
      };
    }
    return { label: 'Report to HSE on diagnosis', tone: 'red' };
  }
  if (!i.root_cause) return { label: 'Record what caused it', tone: 'amber' };
  const actions = i.corrective_actions ?? [];
  if (actions.length === 0) return { label: 'Add what will change', tone: 'amber' };
  const open = actions.filter((a) => !a.done_at);
  const overdue = open.filter((a) => a.due_date && a.due_date < today);
  if (overdue.length)
    return {
      label: `${overdue.length} action${overdue.length === 1 ? '' : 's'} overdue`,
      tone: 'red',
    };
  if (open.length)
    return { label: `${open.length} action${open.length === 1 ? '' : 's'} open`, tone: 'amber' };
  return { label: 'Ready to close', tone: 'emerald' };
}

export const isIncidentClosed = (i: Pick<Incident, 'status'>) =>
  i.status === 'closed' || i.status === 'resolved';

export function overdueActions(i: Incident): CorrectiveAction[] {
  const today = new Date().toISOString().slice(0, 10);
  return (i.corrective_actions ?? []).filter(
    (a) => !a.done_at && !!a.due_date && a.due_date < today
  );
}

export type CreateIncidentInput = Omit<
  Incident,
  'id' | 'source' | 'employer_id' | 'created_at' | 'updated_at' | 'firm_made' | 'can_edit' | 'title'
> & { title?: string };
export type UpdateIncidentInput = Partial<CreateIncidentInput>;

/* ── Reading ─────────────────────────────────────────────────────────── */

const str = (v: unknown) => (typeof v === 'string' ? v : '');

/** A short title: the injury and who, or the first sentence of a near miss. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function titleFor(row: any, source: IncidentSource): string {
  if (source === 'accident') {
    const injury = INJURY_TYPES.find((t) => t.value === row.injury_type)?.label ?? 'Injury';
    return row.injured_person ? `${injury} · ${row.injured_person}` : injury;
  }
  if (source === 'near_miss') {
    const text = str(row.description).replace(/\s+/g, ' ').trim();
    const sentence = (text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text).trim();
    if (sentence.length <= 80) return sentence || 'Near miss';
    const cut = sentence.slice(0, 78);
    return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 40)).trimEnd()}…`;
  }
  return str(row.title) || INCIDENT_TYPE_LABEL[row.incident_type] || 'Safety report';
}

/** "Cut or laceration to hand or fingers. <what the book says>" for an accident. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function injuriesFor(row: any, source: IncidentSource): string | undefined {
  if (source !== 'accident') return row.injuries_sustained || undefined;
  const injury = INJURY_TYPES.find((t) => t.value === row.injury_type)?.label ?? 'Injury';
  const part = BODY_PARTS.find((b) => b.value === row.body_part)?.label.toLowerCase();
  const raw = str(row.injuries_sustained);
  const at = raw.indexOf('. ');
  const rest = at === -1 ? '' : raw.slice(at + 2);
  return [`${injury}${part ? ` to ${part}` : ''}`, rest].filter(Boolean).join('. ');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowToIncident = (row: any): Incident => {
  const source: IncidentSource =
    row.source === 'near_miss' || row.source === 'accident' ? row.source : 'legacy';
  const firmMade = !!row.firm_made;
  return {
    id: row.id,
    source,
    employer_id: row.employer_id,
    job_id: row.job_id ?? null,
    job_title: row.job_title ?? null,
    reported_by: row.reported_by ?? null,
    reported_by_id: row.reporter_user_id ?? null,
    reporter_name: row.reporter_name ?? null,
    reporter_employee_id: row.reporter_employee_id ?? null,
    firm_made: firmMade,
    can_edit: source === 'legacy' || firmMade,
    incident_type: String(row.incident_type || 'other')
      .toLowerCase()
      .replace(/\s+/g, '_') as IncidentType,
    title: titleFor(row, source),
    description: str(row.description),
    location: str(row.location),
    date_occurred: row.reported_at || row.created_at,
    severity: String(row.severity || 'low').toLowerCase() as SeverityLevel,
    status: String(row.status || 'open')
      .toLowerCase()
      .replace(/\s+/g, '_') as IncidentStatus,
    immediate_action_taken: row.actions_taken || undefined,
    witnesses: row.witnesses || undefined,
    supervisor_notified: row.supervisor_notified ?? undefined,
    supervisor_name: row.supervisor_name || undefined,
    injuries_sustained: injuriesFor(row, source),
    first_aid_given: row.first_aid_given ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
    photos: Array.isArray(row.photos)
      ? (row.photos as unknown[]).filter((p): p is string => typeof p === 'string' && !!p)
      : [],
    injured_person: row.injured_person ?? null,
    injured_employee_id: row.injured_employee_id ?? null,
    injury_type: row.injury_type ?? null,
    body_part: row.body_part ?? null,
    hospital_visit: row.hospital_visit ?? false,
    days_off: row.days_off ?? null,
    root_cause: row.root_cause ?? null,
    investigation_notes: row.investigation_notes ?? null,
    corrective_actions: Array.isArray(row.corrective_actions) ? row.corrective_actions : [],
    acknowledged_at: row.acknowledged_at ?? null,
    closed_at: row.closed_at ?? null,
    closeout_summary: row.closeout_summary ?? null,
    riddor_category: row.riddor_category ?? null,
    riddor_reported_at: row.riddor_reported_at ?? null,
    riddor_reference: row.riddor_reference ?? null,
    record_number: row.record_number ?? null,
    countersigned_name: row.countersigned_name ?? null,
    countersigned_at: row.countersigned_at ?? null,
  };
};

async function currentFirm(): Promise<{ userId: string; firmId: string } | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { userId: user.id, firmId: (await getActingEmployerId(user.id)) ?? user.id };
}

/** The firm's incidents from every source (managers of the firm only; throws otherwise). */
export async function fetchFirmIncidents(): Promise<Incident[]> {
  const ctx = await currentFirm();
  if (!ctx) return [];
  const { data, error } = await supabase.rpc(
    'get_firm_incidents' as never,
    { p_firm: ctx.firmId } as never
  );
  // Surface real failures: a safety register must never render a reassuring
  // empty state on an RLS or network error.
  if (error) throw error;
  return (Array.isArray(data) ? data : []).map(rowToIncident);
}

const INCIDENT_TABLES = [
  { table: 'employer_incidents' },
  { table: 'near_miss_reports' },
  { table: 'accident_records' },
];

/** Every incident the firm can see: Site Safety records and employer_incidents. */
export function useIncidents() {
  // Live: a worker reporting from site refreshes the list straight away. RLS
  // scopes the realtime events; the refetch goes through the firm RPC.
  useRealtimeInvalidate('incidents', INCIDENT_TABLES, [['incidents']]);
  return useQuery({ queryKey: ['incidents'], queryFn: fetchFirmIncidents });
}

export function useIncident(id: string | undefined) {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: fetchFirmIncidents,
    enabled: !!id,
    select: (rows: Incident[]) => rows.find((r) => r.id === id) ?? null,
  });
}

export function useIncidentsByStatus(status: IncidentStatus) {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: fetchFirmIncidents,
    select: (rows: Incident[]) => rows.filter((r) => r.status === status),
  });
}

export interface IncidentStats {
  total: number;
  open: number;
  resolved: number;
  closed: number;
  nearMisses: number;
  critical: number;
  high: number;
}

export function useIncidentStats() {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: fetchFirmIncidents,
    select: (rows: Incident[]): IncidentStats => ({
      total: rows.length,
      open: rows.filter((i) => !isIncidentClosed(i)).length,
      resolved: rows.filter((i) => i.status === 'resolved').length,
      closed: rows.filter((i) => i.status === 'closed').length,
      nearMisses: rows.filter((i) => i.incident_type === 'near_miss').length,
      critical: rows.filter((i) => i.severity === 'critical').length,
      high: rows.filter((i) => i.severity === 'high').length,
    }),
  });
}

/* ── Writing: shared helpers ─────────────────────────────────────────── */

/** The accident book's own RIDDOR flags, so the Site Safety view agrees. */
function accidentRiddor(input: {
  severity: string;
  days_off: number;
  hospital_visit: boolean;
  incident_date: string;
}) {
  const reportable =
    input.severity === 'fatal' ||
    input.severity === 'major' ||
    input.days_off > 7 ||
    input.hospital_visit;
  let deadline: string | null = null;
  if (input.severity === 'fatal' || input.severity === 'major') deadline = input.incident_date;
  else if (input.days_off > 7) {
    const d = new Date(`${input.incident_date}T12:00:00`);
    d.setDate(d.getDate() + 15);
    deadline = d.toISOString().slice(0, 10);
  }
  return { is_riddor_reportable: reportable, riddor_deadline: reportable ? deadline : null };
}

const FOLLOW_UP_KEYS = [
  'status',
  'root_cause',
  'investigation_notes',
  'corrective_actions',
  'closeout_summary',
  'riddor_category',
  'riddor_reported_at',
  'riddor_reference',
] as const;

/** Office follow-up on a Site Safety record, through the server (firm_* columns). */
async function saveFollowUp(id: string, input: UpdateIncidentInput) {
  const patch: Record<string, unknown> = {};
  for (const k of FOLLOW_UP_KEYS) {
    if (input[k] !== undefined) patch[k] = input[k] ?? null;
  }
  if (patch.riddor_category && !RIDDOR_CATEGORIES.some((c) => c.value === patch.riddor_category))
    throw new Error('Pick one of the RIDDOR decisions in the list.');
  if (Object.keys(patch).length === 0) return;
  const { error } = await supabase.rpc(
    'firm_incident_update' as never,
    { p_id: id, p_patch: patch } as never
  );
  if (error) throw error;
}

const hasContent = (input: UpdateIncidentInput) =>
  Object.keys(input).some(
    (k) =>
      !(FOLLOW_UP_KEYS as readonly string[]).includes(k) &&
      input[k as keyof UpdateIncidentInput] !== undefined
  );

/** What the report says, for a record the office made (near_miss_reports). */
function nearMissContent(input: UpdateIncidentInput) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (input.incident_type !== undefined) {
    // The picker also takes a typed value; anything unknown files as Other.
    row.incident_kind = NEAR_MISS_KINDS.includes(input.incident_type)
      ? input.incident_type
      : 'other';
    row.category = NEAR_MISS_CATEGORY[input.incident_type] ?? 'other';
  }
  if (input.severity !== undefined) row.severity = input.severity;
  if (input.description !== undefined) row.description = input.description;
  if (input.location !== undefined) row.location = input.location || 'Not recorded';
  if (input.date_occurred !== undefined) {
    const p = londonParts(input.date_occurred);
    row.incident_date = p.date;
    row.incident_time = p.time;
  }
  if (input.immediate_action_taken !== undefined)
    row.immediate_actions = input.immediate_action_taken || null;
  if (input.witnesses !== undefined)
    row.witnesses = input.witnesses?.trim()
      ? [{ name: input.witnesses.trim(), contact: '' }]
      : null;
  if (input.supervisor_notified !== undefined) row.supervisor_notified = input.supervisor_notified;
  if (input.supervisor_name !== undefined) row.supervisor_name = input.supervisor_name || null;
  if (input.job_id !== undefined) row.employer_job_id = input.job_id || null;
  if (input.photos !== undefined) row.photos = input.photos ?? [];
  return row;
}

/** What the report says, for an injury the office recorded (accident_records). */
function accidentContent(input: UpdateIncidentInput, current?: Incident) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (input.injured_person !== undefined)
    row.injured_name = input.injured_person?.trim() || 'Not recorded';
  if (input.injured_employee_id !== undefined)
    row.injured_employee_id = input.injured_employee_id || null;
  if (input.injury_type !== undefined) row.injury_type = input.injury_type || 'other';
  if (input.body_part !== undefined) row.body_part = input.body_part || 'multiple';
  if (input.severity !== undefined) row.severity = TO_ACCIDENT_SEVERITY[input.severity] ?? 'minor';
  if (input.injuries_sustained !== undefined)
    row.injury_description = input.injuries_sustained || null;
  if (input.description !== undefined) row.incident_description = input.description;
  if (input.location !== undefined) row.location = input.location || 'Not recorded';
  if (input.date_occurred !== undefined) {
    const p = londonParts(input.date_occurred);
    row.incident_date = p.date;
    row.incident_time = p.time;
  }
  if (input.witnesses !== undefined) row.witnesses = input.witnesses || null;
  if (input.first_aid_given !== undefined) row.first_aid_given = input.first_aid_given;
  if (input.immediate_action_taken !== undefined)
    row.first_aid_details = input.immediate_action_taken || null;
  if (input.hospital_visit !== undefined) row.hospital_visit = input.hospital_visit;
  if (input.days_off !== undefined) {
    row.days_off = input.days_off ?? 0;
    row.time_off_work = (input.days_off ?? 0) > 0;
  }
  if (input.supervisor_notified !== undefined || input.supervisor_name !== undefined)
    row.reported_to = input.supervisor_notified ? input.supervisor_name || 'Supervisor' : null;
  if (input.job_id !== undefined) row.employer_job_id = input.job_id || null;
  if (input.photos !== undefined) row.photos = input.photos ?? [];

  const severity =
    row.severity ?? TO_ACCIDENT_SEVERITY[(current?.severity ?? 'low') as SeverityLevel];
  const days = row.days_off ?? current?.days_off ?? 0;
  const hospital = row.hospital_visit ?? current?.hospital_visit ?? false;
  const date =
    row.incident_date ?? londonParts(current?.date_occurred ?? new Date().toISOString()).date;
  Object.assign(
    row,
    accidentRiddor({ severity, days_off: days, hospital_visit: hospital, incident_date: date })
  );
  return row;
}

/** Legacy employer_incidents row (unchanged from ELE-1945). */
const legacyRow = (input: UpdateIncidentInput) => {
  const extras: string[] = [];
  if (input.equipment_involved) extras.push(`Equipment involved: ${input.equipment_involved}`);
  if (input.potential_consequences)
    extras.push(`Potential consequences: ${input.potential_consequences}`);
  if (input.follow_up_required)
    extras.push(`Follow-up required${input.follow_up_notes ? `: ${input.follow_up_notes}` : ''}`);

  const description = [input.description, extras.length ? extras.join('\n') : null]
    .filter(Boolean)
    .join('\n\n');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (input.title !== undefined) row.title = input.title;
  if (input.description !== undefined || extras.length) row.description = description;
  if (input.incident_type !== undefined) row.incident_type = input.incident_type;
  if (input.severity !== undefined) row.severity = input.severity;
  if (input.status !== undefined) row.status = input.status;
  if (input.location !== undefined) row.location = input.location;
  if (input.date_occurred !== undefined) row.reported_at = input.date_occurred;
  if (input.immediate_action_taken !== undefined) row.actions_taken = input.immediate_action_taken;
  if (input.witnesses !== undefined) row.witnesses = input.witnesses || null;
  if (input.injuries_sustained !== undefined)
    row.injuries_sustained = input.injuries_sustained || null;
  if (input.first_aid_given !== undefined) row.first_aid_given = input.first_aid_given;
  if (input.supervisor_notified !== undefined) row.supervisor_notified = input.supervisor_notified;
  if (input.supervisor_name !== undefined) row.supervisor_name = input.supervisor_name || null;
  if (input.job_id !== undefined) row.job_id = input.job_id || null;
  if (input.photos !== undefined)
    row.photos = input.photos && input.photos.length ? input.photos : null;
  if (input.injured_person !== undefined) row.injured_person = input.injured_person || null;
  if (input.injured_employee_id !== undefined)
    row.injured_employee_id = input.injured_employee_id || null;
  if (input.hospital_visit !== undefined) row.hospital_visit = input.hospital_visit;
  if (input.days_off !== undefined) row.days_off = input.days_off ?? null;
  if (input.root_cause !== undefined) row.root_cause = input.root_cause || null;
  if (input.investigation_notes !== undefined)
    row.investigation_notes = input.investigation_notes || null;
  if (input.corrective_actions !== undefined) row.corrective_actions = input.corrective_actions;
  if (input.closeout_summary !== undefined) row.closeout_summary = input.closeout_summary || null;
  if (input.riddor_category !== undefined) {
    row.riddor_category = input.riddor_category || null;
    row.riddor_reportable = isRiddorReportable(input.riddor_category);
  }
  if (input.riddor_reported_at !== undefined)
    row.riddor_reported_at = input.riddor_reported_at || null;
  if (input.riddor_reference !== undefined) row.riddor_reference = input.riddor_reference || null;
  return row;
};

/** The cached row, or a fresh read, so a write knows which table it is. */
async function findIncident(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
): Promise<Incident> {
  const cached = (queryClient.getQueryData(['incidents']) as Incident[] | undefined)?.find(
    (i) => i.id === id
  );
  if (cached) return cached;
  const fresh = (await fetchFirmIncidents()).find((i) => i.id === id);
  if (!fresh) throw new Error('This report is no longer available.');
  return fresh;
}

async function writeUpdate(current: Incident, input: UpdateIncidentInput) {
  if (current.source === 'legacy') {
    const { error } = await supabase
      .from('employer_incidents')
      .update(legacyRow(input))
      .eq('id', current.id);
    if (error) throw error;
    return;
  }
  if (hasContent(input)) {
    if (!current.can_edit)
      throw new Error(
        'This report belongs to the person who made it. You can add the follow-up and countersign it.'
      );
    const table = current.source === 'accident' ? 'accident_records' : 'near_miss_reports';
    const row =
      current.source === 'accident' ? accidentContent(input, current) : nearMissContent(input);
    const { error } = await supabase
      .from(table as never)
      .update(row as never)
      .eq('id', current.id);
    if (error) throw error;
  }
  await saveFollowUp(current.id, input);
}

async function refetchOne(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
): Promise<Incident> {
  await queryClient.invalidateQueries({ queryKey: ['incidents'] });
  const rows = await queryClient.fetchQuery({
    queryKey: ['incidents'],
    queryFn: fetchFirmIncidents,
  });
  const row = rows.find((r) => r.id === id);
  if (!row) throw new Error('Saved, but the report could not be reloaded.');
  return row;
}

/* ── Mutations ───────────────────────────────────────────────────────── */

/**
 * Log a report from the office. It is filed in Site Safety under the firm:
 * an injury in the accident book, anything else in the near-miss register.
 */
export function useCreateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateIncidentInput): Promise<Incident> => {
      const ctx = await currentFirm();
      if (!ctx) throw new Error('Not authenticated');
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', ctx.userId)
        .maybeSingle();
      const recorder =
        (profile?.full_name as string | undefined)?.trim() ||
        (user?.user_metadata?.full_name as string | undefined) ||
        user?.email ||
        'Office';
      const when = londonParts(input.date_occurred || new Date().toISOString());

      let id: string;
      if (input.incident_type === 'injury') {
        const row = {
          user_id: ctx.userId,
          employer_id: ctx.firmId,
          recorded_by: recorder,
          incident_date: when.date,
          incident_time: when.time,
          ...accidentContent({ ...input, date_occurred: input.date_occurred }),
        };
        if (!row.injured_name) row.injured_name = 'Not recorded';
        if (!row.injury_type) row.injury_type = 'other';
        if (!row.body_part) row.body_part = 'multiple';
        if (!row.incident_description) row.incident_description = input.description || '';
        if (!row.location) row.location = 'Not recorded';
        const { data, error } = await supabase
          .from('accident_records')
          .insert(row as never)
          .select('id')
          .single();
        if (error) throw error;
        id = (data as { id: string }).id;
      } else {
        const row = {
          user_id: ctx.userId,
          employer_id: ctx.firmId,
          reporter_name: recorder,
          status: 'open',
          incident_date: when.date,
          incident_time: when.time,
          follow_up_required: input.severity === 'high' || input.severity === 'critical',
          ...nearMissContent(input),
        };
        if (!row.category) row.category = 'other';
        if (!row.location) row.location = 'Not recorded';
        const { data, error } = await supabase
          .from('near_miss_reports')
          .insert(row as never)
          .select('id')
          .single();
        if (error) throw error;
        id = (data as { id: string }).id;
      }
      // Logged by the office = seen by the office.
      await supabase.rpc(
        'firm_incident_update' as never,
        {
          p_id: id,
          p_patch: { acknowledge: true },
        } as never
      );
      return refetchOne(queryClient, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...EMPLOYER_HOME_KEY] });
      toast({ title: 'Report logged', description: 'It is in the firm’s Site Safety records.' });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      toastTitle: _toastTitle,
      ...input
    }: UpdateIncidentInput & {
      id: string;
      /** Toast on success. false = silent (inline saves show their own state). */
      toastTitle?: string | false;
    }): Promise<Incident> => {
      const current = await findIncident(queryClient, id);
      await writeUpdate(current, input);
      return refetchOne(queryClient, id);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['employer-overview'] });
      queryClient.invalidateQueries({ queryKey: [...EMPLOYER_HOME_KEY] });
      if (vars.toastTitle === false) return;
      toast({ title: vars.toastTitle || 'Saved' });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateIncidentStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: IncidentStatus;
    }): Promise<Incident> => {
      const current = await findIncident(queryClient, id);
      // closed_at / acknowledged_at are stamped on the server.
      await writeUpdate(current, { status });
      return refetchOne(queryClient, id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [...EMPLOYER_HOME_KEY] });
      toast({
        title:
          data.status === 'closed' || data.status === 'resolved'
            ? 'Report closed'
            : data.status === 'investigating'
              ? 'Investigation open'
              : 'Report updated',
      });
    },
    onError: (error) => {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    },
  });
}

/** Delete a report the office made. A worker's own report cannot be deleted here. */
export function useDeleteIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const current = await findIncident(queryClient, id);
      if (!current.can_edit) throw new Error('Only the person who made this report can delete it.');
      const table =
        current.source === 'legacy'
          ? 'employer_incidents'
          : current.source === 'accident'
            ? 'accident_records'
            : 'near_miss_reports';
      const { error } = await supabase
        .from(table as never)
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({ title: 'Report deleted' });
    },
    onError: (error) => {
      toast({ title: 'Not deleted', description: error.message, variant: 'destructive' });
    },
  });
}

/**
 * The office has opened the report. Stamps it as seen once and tells the
 * worker who reported it (server side). Safe to call on every open.
 */
export function useAcknowledgeIncident() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.rpc(
        'acknowledge_incident' as never,
        { p_id: id } as never
      );
      if (error) throw error;
      return data as { ok: boolean; already: boolean };
    },
    onSuccess: (res) => {
      if (res?.already) return;
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
}

/** Countersign (or withdraw) a Site Safety record for the firm. */
export function useCountersignIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ incident, withdraw }: { incident: Incident; withdraw?: boolean }) => {
      if (incident.source === 'legacy') throw new Error('This report cannot be countersigned.');
      const { error } = await supabase.rpc(
        'safety_countersign' as never,
        {
          p_table: incident.source === 'accident' ? 'accident_records' : 'near_miss_reports',
          p_id: incident.id,
          p_withdraw: !!withdraw,
        } as never
      );
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({ title: vars.withdraw ? 'Countersignature withdrawn' : 'Countersigned' });
    },
    onError: (error) => {
      toast({ title: 'Not countersigned', description: error.message, variant: 'destructive' });
    },
  });
}

/** Build the firm's incident report or the pre-filled RIDDOR report. Returns a 1-hour link. */
export async function getIncidentReportPdf(
  incidentId: string,
  kind: 'incident' | 'riddor'
): Promise<string> {
  const { data, error } = await supabase.functions.invoke('generate-incident-report-pdf', {
    body: { incidentId, kind },
  });
  if (error) {
    // supabase-js hides the function's message inside the response body.
    let message = 'The report could not be built. Try again.';
    try {
      const body = await (error as { context?: Response }).context?.json();
      if (body?.error) message = body.error;
    } catch {
      /* keep the default */
    }
    throw new Error(message);
  }
  if (!data?.success || !data?.url)
    throw new Error(data?.error || 'The report could not be built.');
  return data.url as string;
}

const MAX_INCIDENT_PHOTO_BYTES = 10 * 1024 * 1024;

/** Upload a photo for an incident to the private visual-uploads bucket; returns the storage path. */
export async function uploadIncidentPhoto(file: File): Promise<string> {
  if (file.size > MAX_INCIDENT_PHOTO_BYTES) throw new Error('Photo too large (10MB max)');
  if (!file.type.startsWith('image/')) throw new Error('Only images can be attached');
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${user.id}/incidents/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('visual-uploads').upload(path, file);
  if (error) throw error;
  return path;
}

export const newActionId = () =>
  (
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  ).slice(0, 12);
