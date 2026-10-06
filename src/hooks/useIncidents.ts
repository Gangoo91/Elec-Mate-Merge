import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useToast } from '@/hooks/use-toast';
import { getActingEmployerId } from '@/lib/actingEmployer';

// Types based on database schema
export type IncidentType =
  | 'near_miss'
  | 'unsafe_practice'
  | 'faulty_equipment'
  | 'injury'
  | 'property_damage'
  | 'environmental'
  | 'security'
  | 'other';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

// 'open' is written by worker-side safety reports (useWorkerSelfService) —
// treat it as a first-class open state alongside the employer-side vocabulary.
export type IncidentStatus =
  'open' | 'draft' | 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  employer_id: string;
  job_id?: string | null;
  /** employer_employees.id (worker reports) or a display name (employer reports) */
  reported_by?: string | null;
  reported_by_id?: string | null;
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
  // Investigation, close-out and RIDDOR (ELE-1945, 6 Oct)
  /** Storage paths in the private visual-uploads bucket. */
  photos?: string[];
  injured_person?: string | null;
  injured_employee_id?: string | null;
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
  'id' | 'employer_id' | 'created_at' | 'updated_at'
>;
export type UpdateIncidentInput = Partial<CreateIncidentInput>;

// witnesses / injuries_sustained / first_aid_given / supervisor_* are live
// first-class columns on employer_incidents — written and read as such.
// Fields the table genuinely lacks (equipment, consequences, follow-up) are
// folded into the description on write. Legacy rows that predate the columns
// keep their detail inside the description text, which still renders.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowToIncident = (row: any): Incident => ({
  id: row.id,
  employer_id: row.employer_id,
  job_id: row.job_id ?? null,
  reported_by: row.reported_by ?? null,
  reported_by_id: row.reported_by_id ?? null,
  // The table defaults ('Near Miss', 'Low', 'Open') predate the hub's
  // lowercase vocabulary; normalise so filters and pills never miss a row.
  incident_type: String(row.incident_type || 'other')
    .toLowerCase()
    .replace(/\s+/g, '_') as IncidentType,
  title: row.title,
  description: row.description || '',
  location: row.location || '',
  date_occurred: row.reported_at || row.created_at,
  severity: String(row.severity || 'low').toLowerCase() as SeverityLevel,
  status: String(row.status || 'open')
    .toLowerCase()
    .replace(/\s+/g, '_') as IncidentStatus,
  immediate_action_taken: row.actions_taken || undefined,
  witnesses: row.witnesses || undefined,
  supervisor_notified: row.supervisor_notified ?? undefined,
  supervisor_name: row.supervisor_name || undefined,
  injuries_sustained: row.injuries_sustained || undefined,
  first_aid_given: row.first_aid_given ?? undefined,
  created_at: row.created_at,
  updated_at: row.updated_at,
  photos: row.photos ?? [],
  injured_person: row.injured_person ?? null,
  injured_employee_id: row.injured_employee_id ?? null,
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
});

const incidentToRow = (input: Partial<CreateIncidentInput>) => {
  // Only fields with no column of their own get folded into the description.
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
  // Structured columns — live on employer_incidents
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

// Fetch all incidents for the current user
export function useIncidents() {
  // Live: a worker reporting an incident (any change to the team's rows) refreshes
  // the employer Safety list instantly — no manual reload. RLS scopes both the
  // refetch and the realtime events to the user's company, so no filter is needed.
  useRealtimeInvalidate('incidents', [{ table: 'employer_incidents' }], [['incidents']]);

  return useQuery({
    queryKey: ['incidents'],
    queryFn: async (): Promise<Incident[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('*')
        .eq('employer_id', (await getActingEmployerId(user.id)) ?? user.id)
        .order('reported_at', { ascending: false });

      // Surface real failures — a safety register must never render a
      // reassuring empty state on an RLS/network error.
      if (error) throw error;
      return (data || []).map(rowToIncident);
    },
  });
}

// Fetch a single incident by ID
export function useIncident(id: string | undefined) {
  return useQuery({
    queryKey: ['incidents', id],
    queryFn: async (): Promise<Incident | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    enabled: !!id,
  });
}

// Fetch incidents filtered by status
export function useIncidentsByStatus(status: IncidentStatus) {
  return useQuery({
    queryKey: ['incidents', 'status', status],
    queryFn: async (): Promise<Incident[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('*')
        .eq('employer_id', (await getActingEmployerId(user.id)) ?? user.id)
        .eq('status', status)
        .order('reported_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(rowToIncident);
    },
  });
}

// Get incident statistics
export function useIncidentStats() {
  return useQuery({
    queryKey: ['incidents', 'stats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user)
        return {
          total: 0,
          open: 0,
          resolved: 0,
          closed: 0,
          nearMisses: 0,
          critical: 0,
          high: 0,
        };

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('status, severity, incident_type')
        .eq('employer_id', (await getActingEmployerId(user.id)) ?? user.id);

      // Surface real failures instead of fabricating an all-zero safety record.
      if (error) throw error;

      // Normalise the legacy capitalised defaults ('Open', 'Low').
      const rows = (data || []).map((i) => ({
        status: String(i.status || '').toLowerCase(),
        severity: String(i.severity || '').toLowerCase(),
        incident_type: i.incident_type,
      }));
      const stats = {
        total: rows.length,
        open: rows.filter((i) => !['resolved', 'closed'].includes(i.status)).length,
        resolved: rows.filter((i) => i.status === 'resolved').length,
        closed: rows.filter((i) => i.status === 'closed').length,
        nearMisses: rows.filter(
          (i) => (i.incident_type || '').toLowerCase().replace(' ', '_') === 'near_miss'
        ).length,
        critical: rows.filter((i) => i.severity === 'critical').length,
        high: rows.filter((i) => i.severity === 'high').length,
      };

      return stats;
    },
  });
}

// Create a new incident
export function useCreateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateIncidentInput): Promise<Incident> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const row = incidentToRow(input);
      if (!row.reported_at) row.reported_at = new Date().toISOString();
      // Record who reported it — employer-side reports come from the logged-in
      // account (worker-side reports write their employer_employees.id instead).
      row.reported_by =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined) ||
        user.email ||
        'Employer';
      row.reported_by_id = user.id;
      // A manager logs it under the firm, not their own id, or the owner
      // never sees it (the column default is only auth.uid()).
      row.employer_id = (await getActingEmployerId(user.id)) ?? user.id;

      const { data, error } = await supabase
        .from('employer_incidents')
        .insert(row)
        .select()
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({
        title: 'Incident reported',
        description: 'The incident has been logged successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Update an existing incident
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
      const { data, error } = await supabase
        .from('employer_incidents')
        .update(incidentToRow(input))
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incidents', data.id] });
      queryClient.invalidateQueries({ queryKey: ['employer-overview'] });
      if (vars.toastTitle === false) return;
      toast({ title: vars.toastTitle || 'Saved' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Update incident status
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
      // closed_at / acknowledged_at / updated_at are stamped by trigger.
      const { data, error } = await supabase
        .from('employer_incidents')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incidents', data.id] });
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
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Delete an incident
export function useDeleteIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('employer_incidents').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({
        title: 'Incident deleted',
        description: 'The incident has been removed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * The office has opened the report. Stamps acknowledged_at once and tells the
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
