/**
 * Pre-start checks and firm checklists (ELE-1826).
 *
 * The office builds templates (Safety → Checklists) and attaches them to jobs;
 * the crew answer them on the job page. Every write goes through an RPC that
 * stamps who/when/where; the database refuses a worker's own clock-in while a
 * required before-start item is outstanding (guard_timesheet_prestart).
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useMemo } from 'react';
import { submitWorkerAction, holdPhoto, clipWords, type OutboxOp } from '@/lib/workerOutbox';
import { OFFLINE_FIRST, offlineSnapshot } from '@/lib/workerOfflineCache';
import { useWorkerOutbox } from '@/hooks/useWorkerOutbox';

export type ChecklistItemType = 'tick' | 'photo' | 'signature' | 'number' | 'yes_no' | 'rams';
export type ChecklistPhase = 'before' | 'after';

export interface ChecklistItem {
  key: string;
  label: string;
  type: ChecklistItemType;
  phase: ChecklistPhase;
  required: boolean;
  hint?: string;
  unit?: string;
  signer?: 'worker' | 'customer';
  countersign?: boolean;
}

export interface ChecklistTemplate {
  id: string;
  employer_id: string | null;
  name: string;
  description: string | null;
  job_type: string | null;
  items: ChecklistItem[];
  auto_all_jobs: boolean;
  auto_label_ids: string[];
  library_key: string | null;
  source_template_id: string | null;
  is_archived: boolean;
  updated_at: string;
}

export interface JobChecklist {
  id: string;
  name: string;
  template_id: string | null;
  attached_via: 'manual' | 'label' | 'all_jobs';
  created_at: string;
  items: ChecklistItem[];
}

export interface ChecklistResponse {
  id: string;
  job_checklist_id: string;
  item_key: string;
  subject_employee_id: string | null;
  employee_id: string | null;
  mine: boolean;
  done_by_name: string | null;
  satisfied: boolean;
  value_bool: boolean | null;
  value_number: number | null;
  value_text: string | null;
  photos: string[];
  signature_data: string | null;
  signer_name: string | null;
  note: string | null;
  lat: number | null;
  lng: number | null;
  accuracy_m: number | null;
  location_status: 'captured' | 'denied' | 'unavailable' | null;
  completed_at: string;
  countersigned_by_name: string | null;
  countersigned_at: string | null;
  countersign_signature: string | null;
  needs_countersign: boolean;
}

export interface ChecklistCrewMember {
  employee_id: string;
  name: string;
  team_role: string | null;
  is_apprentice: boolean;
  outstanding: string[];
  unsigned_packs: string[];
  signed_packs: { title: string; at: string }[];
}

export interface JobChecklistDetail {
  job: {
    id: string;
    title: string;
    location: string | null;
    client: string | null;
    status: string | null;
    employer_id: string;
  };
  is_office: boolean;
  me: {
    employee_id: string;
    name: string;
    is_apprentice: boolean;
    outstanding: string[];
    unsigned_packs: string[];
  } | null;
  can_countersign: boolean;
  completion_outstanding: string[];
  checklists: JobChecklist[];
  crew: ChecklistCrewMember[];
  responses: ChecklistResponse[];
}

export interface ChecklistOverviewJob {
  job_id: string;
  title: string;
  location: string | null;
  client: string | null;
  status: string | null;
  start_date: string | null;
  checklist_count: number;
  checklist_names: string[] | null;
  completion_outstanding: string[];
  crew: { employee_id: string; name: string; outstanding: string[] }[];
  awaiting_countersign: number;
  last_activity: string | null;
  open_count: number;
}

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = (name: string, args: Record<string, unknown> = {}) =>
  supabase.rpc(name as never, args as never);

export const CHECKLIST_KEYS = {
  templates: ['checklist-templates'] as const,
  overview: ['checklist-overview'] as const,
  // 'job-checklists' is also what the worker outbox refreshes once a queued answer lands.
  job: (jobId: string) => ['job-checklists', jobId] as const,
};

/** Human message from a Supabase/PostgREST error. */
export function checklistErrorMessage(e: unknown, fallback = 'Something went wrong'): string {
  const msg = (e as { message?: string } | null)?.message;
  return msg && msg.trim() ? msg : fallback;
}

/** Is this the database's "pre-start checks not done" refusal? */
export function isPrestartRefusal(e: unknown): boolean {
  const err = e as { hint?: string; message?: string } | null;
  return err?.hint === 'PRESTART_INCOMPLETE' || /pre-start checks first/i.test(err?.message ?? '');
}

export function useActingFirm() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-firm', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

/* ── Office ─────────────────────────────────────────────────────────────── */

/** The firm's own templates plus the Elec-Mate library (employer_id null). */
export function useChecklistTemplates() {
  const { data: firm } = useActingFirm();
  return useQuery({
    queryKey: [...CHECKLIST_KEYS.templates, firm],
    enabled: !!firm,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_checklist_templates' as never)
        .select(
          'id, employer_id, name, description, job_type, items, auto_all_jobs, auto_label_ids, library_key, source_template_id, is_archived, updated_at'
        )
        .or(`employer_id.is.null,employer_id.eq.${firm}`)
        .eq('is_archived', false)
        .order('name');
      if (error) throw error;
      const rows = (data as unknown as ChecklistTemplate[]) ?? [];
      return {
        firm: rows.filter((t) => t.employer_id !== null),
        library: rows.filter((t) => t.employer_id === null),
      };
    },
  });
}

export function useFirmChecklistOverview(includeClosed = false) {
  const { data: firm } = useActingFirm();
  return useQuery({
    queryKey: [...CHECKLIST_KEYS.overview, firm, includeClosed],
    enabled: !!firm,
    queryFn: async () => {
      const { data, error } = await rpc('get_firm_checklist_overview', {
        p_employer: firm,
        p_include_closed: includeClosed,
      });
      if (error) throw error;
      return (data as unknown as ChecklistOverviewJob[]) ?? [];
    },
  });
}

export interface SaveTemplateInput {
  id: string | null;
  name: string;
  description: string;
  jobType: string;
  items: Array<Partial<ChecklistItem>>;
  autoAllJobs: boolean;
  autoLabelIds: string[];
}

export function useChecklistOfficeActions() {
  const qc = useQueryClient();
  const { data: firm } = useActingFirm();
  const refresh = (jobId?: string) => {
    qc.invalidateQueries({ queryKey: CHECKLIST_KEYS.templates });
    qc.invalidateQueries({ queryKey: CHECKLIST_KEYS.overview });
    if (jobId) qc.invalidateQueries({ queryKey: CHECKLIST_KEYS.job(jobId) });
  };

  const save = useMutation({
    mutationFn: async (input: SaveTemplateInput) => {
      const { data, error } = await rpc('save_checklist_template', {
        p_id: input.id,
        p_employer: firm,
        p_name: input.name,
        p_description: input.description,
        p_job_type: input.jobType,
        p_items: input.items,
        p_auto_all_jobs: input.autoAllJobs,
        p_auto_label_ids: input.autoLabelIds,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: () => refresh(),
  });

  const archive = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await rpc('archive_checklist_template', { p_id: id });
      if (error) throw error;
    },
    onSuccess: () => refresh(),
  });

  const copyLibrary = useMutation({
    mutationFn: async (libraryId: string) => {
      const { data, error } = await rpc('copy_library_checklist_template', {
        p_library_id: libraryId,
        p_employer: firm,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: () => refresh(),
  });

  const attach = useMutation({
    mutationFn: async ({ jobId, templateId }: { jobId: string; templateId: string }) => {
      const { data, error } = await rpc('attach_checklist_to_job', {
        p_job: jobId,
        p_template: templateId,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: (_d, v) => refresh(v.jobId),
  });

  const detach = useMutation({
    mutationFn: async ({ id }: { id: string; jobId: string }) => {
      const { error } = await rpc('detach_job_checklist', { p_job_checklist: id });
      if (error) throw error;
    },
    onSuccess: (_d, v) => refresh(v.jobId),
  });

  return { save, archive, copyLibrary, attach, detach };
}

/* ── Shared: one job's checks ───────────────────────────────────────────── */

export function useJobChecklistDetail(jobId: string | null | undefined) {
  return useQuery({
    queryKey: CHECKLIST_KEYS.job(jobId ?? ''),
    enabled: !!jobId,
    staleTime: 15 * 1000,
    // ELE-1828: the job page and the clock-in gate open with no signal, from the
    // copy kept on this phone the last time it loaded.
    ...OFFLINE_FIRST,
    queryFn: () =>
      offlineSnapshot(`job-checklists:${jobId}`, async () => {
        const { data, error } = await rpc('get_job_checklist_detail', { p_job: jobId });
        if (error) throw error;
        return data as unknown as JobChecklistDetail;
      }),
  });
}

/** A checklist answer still on this phone (queued, not yet at the server). */
export interface PendingCheck {
  opId: string;
  jobChecklistId: string;
  itemKey: string;
  satisfied: boolean;
  summary: string;
}

/**
 * The worker's view of one job's checks: the server copy (or the phone's copy
 * offline) with the answers still waiting in the outbox laid over it, so ticks
 * made with no signal count straight away, including for the clock-in gate.
 * The server gate still decides: queued answers send before the clock-in.
 */
export function useMyJobChecks(jobId: string | null | undefined) {
  const query = useJobChecklistDetail(jobId);
  const { pending } = useWorkerOutbox();
  const view = useMemo(() => {
    const detail = query.data;
    const mine = pending.filter((o) => o.jobId === jobId);
    const pendingChecks = new Map<string, PendingCheck>();
    for (const op of mine.filter((o) => o.kind === 'checklist_item')) {
      const pc = pendingFromOp(op);
      if (pc) pendingChecks.set(`${pc.jobChecklistId}:${pc.itemKey}`, pc);
    }
    // RAMS signed offline: the Sign-offs outbox label is "Sign-off · <pack title>".
    const signingPacks = new Set(
      mine.filter((o) => o.kind === 'pack_signoff').map((o) => o.label.replace(/^Sign-off · /, ''))
    );
    const unsignedPacks = (detail?.me?.unsigned_packs ?? []).filter((t) => !signingPacks.has(t));
    const outstanding: string[] = [];
    if (detail?.me) {
      for (const c of detail.checklists) {
        for (const item of c.items) {
          if (item.phase !== 'before' || !item.required) continue;
          if (item.type === 'rams') {
            if (unsignedPacks.length)
              outstanding.push(`Sign the RAMS: ${unsignedPacks.join(', ')}`);
            continue;
          }
          const p = pendingChecks.get(`${c.id}:${item.key}`);
          const done = p
            ? p.satisfied
            : !!findResponse(detail, c.id, item, detail.me.employee_id)?.satisfied;
          if (!done) outstanding.push(item.label);
        }
      }
    }
    return { pendingChecks, unsignedPacks, outstanding };
  }, [query.data, pending, jobId]);
  return { ...query, ...view };
}

function pendingFromOp(op: OutboxOp): PendingCheck | null {
  const params = (op.payload as { params?: Record<string, unknown> }).params;
  if (!params) return null;
  const value = (params.p_value ?? {}) as { answer?: string; number?: number };
  const kind = (op.payload as { itemType?: string }).itemType;
  const satisfied = kind === 'yes_no' ? value.answer === 'yes' : true;
  const photos = ((params.p_photos as string[]) ?? []).length + (op.photos?.length ?? 0);
  const summary =
    kind === 'yes_no'
      ? value.answer === 'yes'
        ? 'Yes'
        : 'No'
      : kind === 'number'
        ? String(value.number ?? '')
        : kind === 'photo'
          ? photos === 1
            ? '1 photo'
            : `${photos} photos`
          : kind === 'signature'
            ? params.p_signer_name
              ? `Signed by ${String(params.p_signer_name)}`
              : 'Signed'
            : 'Done';
  return {
    opId: op.id,
    jobChecklistId: String(params.p_job_checklist),
    itemKey: String(params.p_item_key),
    satisfied,
    summary,
  };
}

export interface RecordItemInput {
  jobId: string;
  /** For the outbox's second line. */
  jobTitle?: string | null;
  itemType?: ChecklistItemType;
  /** Photos kept on the phone (no signal when taken); the outbox uploads them. */
  heldFiles?: File[];
  /** What the worker sees in the outbox if it has to wait for signal. */
  itemLabel?: string;
  jobChecklistId: string;
  itemKey: string;
  answer?: 'yes' | 'no';
  number?: number;
  photos?: string[];
  signature?: string | null;
  signerName?: string | null;
  note?: string | null;
  fix?: {
    status: 'captured' | 'denied' | 'unavailable';
    lat?: number;
    lng?: number;
    accuracy?: number;
  } | null;
}

export function useChecklistCrewActions() {
  const qc = useQueryClient();
  const refresh = (jobId: string) => {
    qc.invalidateQueries({ queryKey: CHECKLIST_KEYS.job(jobId) });
    qc.invalidateQueries({ queryKey: CHECKLIST_KEYS.overview });
  };

  const record = useMutation({
    // Never paused by React Query when offline: the outbox is the queue.
    networkMode: 'always',
    mutationFn: async (i: RecordItemInput) => {
      const value: Record<string, unknown> = {};
      if (i.answer) value.answer = i.answer;
      if (i.number !== undefined) value.number = i.number;
      const params = {
        p_job_checklist: i.jobChecklistId,
        p_item_key: i.itemKey,
        p_value: value,
        p_photos: i.photos ?? [],
        p_signature: i.signature ?? null,
        p_signer_name: i.signerName ?? null,
        p_note: i.note ?? null,
        p_lat: i.fix?.status === 'captured' ? i.fix.lat : null,
        p_lng: i.fix?.status === 'captured' ? i.fix.lng : null,
        p_accuracy: i.fix?.status === 'captured' ? i.fix.accuracy : null,
        p_location_status: i.fix?.status ?? null,
        // The phone's time: an answer queued in a basement keeps when it was given.
        p_answered_at: new Date().toISOString(),
      };
      const photos = await Promise.all((i.heldFiles ?? []).map(holdPhoto));
      // Through the worker outbox (ELE-1828): with no signal the answer waits on
      // the phone, queued before the clock-in it unlocks, so the server's gate
      // sees it first. A refusal comes back as OutboxRefusedError (plain English).
      const { result } = await submitWorkerAction({
        kind: 'checklist_item',
        label: `Check · ${clipWords(i.itemLabel ?? 'pre-start')}`,
        detail: i.jobTitle ?? null,
        jobId: i.jobId,
        photos,
        payload: { params, itemType: i.itemType ?? null },
      });
      return result;
    },
    onSuccess: (_d, v) => refresh(v.jobId),
  });

  const clear = useMutation({
    mutationFn: async ({ responseId }: { responseId: string; jobId: string }) => {
      const { error } = await rpc('clear_my_checklist_item', { p_response: responseId });
      if (error) throw error;
    },
    onSuccess: (_d, v) => refresh(v.jobId),
  });

  const countersign = useMutation({
    mutationFn: async ({
      responseId,
      signature,
    }: {
      responseId: string;
      jobId: string;
      signature?: string | null;
    }) => {
      const { error } = await rpc('countersign_checklist_item', {
        p_response: responseId,
        p_signature: signature ?? null,
      });
      if (error) throw error;
    },
    onSuccess: (_d, v) => refresh(v.jobId),
  });

  return { record, clear, countersign };
}

/* ── Pure helpers used by both sides ───────────────────────────────────── */

export const ITEM_TYPE_LABEL: Record<ChecklistItemType, string> = {
  tick: 'Tick',
  photo: 'Photo',
  signature: 'Signature',
  number: 'Number',
  yes_no: 'Yes / no',
  rams: 'RAMS signed',
};

/** The answer to one item for one person (before) or the job (after). */
export function findResponse(
  detail: JobChecklistDetail,
  checklistId: string,
  item: ChecklistItem,
  employeeId: string | null
): ChecklistResponse | undefined {
  return detail.responses.find(
    (r) =>
      r.job_checklist_id === checklistId &&
      r.item_key === item.key &&
      (item.phase === 'before'
        ? r.subject_employee_id === employeeId
        : r.subject_employee_id === null)
  );
}

/** One line describing an answer: "Yes", "12 circuits", "2 photos", "Signed by Mrs Patel". */
export function answerSummary(item: ChecklistItem, r: ChecklistResponse | undefined): string {
  if (!r) return '';
  switch (item.type) {
    case 'tick':
      return 'Done';
    case 'yes_no':
      return r.value_text === 'yes' ? 'Yes' : 'No';
    case 'number':
      return `${r.value_number ?? ''}${item.unit ? ` ${item.unit}` : ''}`.trim();
    case 'photo':
      return r.photos.length === 1 ? '1 photo' : `${r.photos.length} photos`;
    case 'signature':
      return r.signer_name ? `Signed by ${r.signer_name}` : 'Signed';
    default:
      return '';
  }
}

export function stampLine(r: ChecklistResponse): string {
  const when = new Date(r.completed_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
  const where =
    r.location_status === 'captured'
      ? `location to ${Math.round(Number(r.accuracy_m ?? 0))} m`
      : r.location_status === 'denied'
        ? 'location off'
        : 'no location';
  return [r.done_by_name, when, where].filter(Boolean).join(' · ');
}
