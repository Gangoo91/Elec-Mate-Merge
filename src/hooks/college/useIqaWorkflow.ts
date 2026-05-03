/**
 * useIqaWorkflow — persistence + realtime for the IQA Workflow section.
 *
 * Owns three slices of audit-critical state for a single college:
 *   - findings   (college_iqa_findings)
 *   - meetings   (college_standardisation_meetings)
 *   - checklist  (college_iqa_eqa_checklist_items)  — current EQA cycle
 *
 * Plus the college's `next_eqa_visit` (lives on `colleges`).
 *
 * Design notes
 * ────────────
 *  - Optimistic updates on add / update / toggle so the UI feels native.
 *    Rollback on error via React Query's onError handler.
 *  - Realtime postgres_changes on all four sources so collaborative editing
 *    by multiple staff is reflected without manual refresh.
 *  - All mutations resolve a `created_by` from auth.uid() and stamp the
 *    `college_id` from the caller's profile — RLS will reject anything else.
 *  - UK English throughout (organisation, colour, centre).
 */

import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

/* ============================================================
   Types
   ============================================================ */

export type FindingStatus = 'Open' | 'In Progress' | 'Closed';
export type FindingSeverity = 'low' | 'medium' | 'high' | 'critical';
export type FindingType = 'Good Practice' | 'Area for Improvement' | 'Action Required';
export type ChecklistStatus = 'pending' | 'in_progress' | 'complete' | 'not_applicable';
export type MeetingStatus = 'scheduled' | 'held' | 'cancelled';

export interface IqaFinding {
  id: string;
  college_id: string;
  sample_id: string | null;
  area: string | null;
  severity: FindingSeverity | null;
  finding_type: FindingType;
  description: string;
  action_plan: string | null;
  owner_staff_id: string | null;
  due_date: string | null;
  status: FindingStatus;
  resolution_notes: string | null;
  closed_at: string | null;
  assessor_id: string | null;
  assessor_name: string;
  iqa_id: string | null;
  iqa_name_snapshot: string | null;
  observation_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface IqaMeeting {
  id: string;
  college_id: string;
  scheduled_at: string | null;
  date: string | null; // legacy date column, kept for back-compat reads
  duration_min: number | null;
  topic: string;
  agenda: string | null;
  minutes: string | null;
  minutes_url: string | null;
  outcome: string | null;
  decisions: string | null;
  action_items: string[];
  attendee_ids: string[];
  attendees_count: number | null;
  chair_id: string | null;
  status: MeetingStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EqaChecklistItem {
  id: string;
  college_id: string;
  eqa_cycle: string;
  item_label: string;
  status: ChecklistStatus;
  evidence_url: string | null;
  notes: string | null;
  sort_order: number;
  completed_at: string | null;
  completed_by: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewFindingInput {
  finding_type: FindingType;
  description: string;
  area?: string | null;
  severity?: FindingSeverity | null;
  assessor_name?: string;
  assessor_id?: string | null;
  owner_staff_id?: string | null;
  due_date?: string | null;
  action_plan?: string | null;
  sample_id?: string | null;
}

export interface NewMeetingInput {
  topic: string;
  scheduled_at?: string | null;
  duration_min?: number | null;
  agenda?: string | null;
  minutes?: string | null;
  outcome?: string | null;
  decisions?: string | null;
  action_items?: string[];
  attendee_ids?: string[];
  attendees_count?: number;
  chair_id?: string | null;
  status?: MeetingStatus;
}

export interface NewChecklistItemInput {
  item_label: string;
  eqa_cycle?: string;
  sort_order?: number;
  status?: ChecklistStatus;
  notes?: string | null;
  evidence_url?: string | null;
}

/* ============================================================
   Default seed checklist (used the first time a college opens
   the section in a given cycle and has zero items).
   ============================================================ */

const DEFAULT_CHECKLIST_LABELS = [
  'Sampling records up to date',
  'Standardisation minutes filed',
  'Action plan current',
  'Student portfolios quality checked',
  'Assessment decisions verified',
] as const;

const currentCycle = (): string => String(new Date().getUTCFullYear());

/* ============================================================
   Hook
   ============================================================ */

export interface UseIqaWorkflowResult {
  // Data
  findings: IqaFinding[];
  meetings: IqaMeeting[];
  checklist: EqaChecklistItem[];
  nextEqaVisit: string | null;
  cycle: string;

  // Status
  loading: boolean;
  error: string | null;
  canWrite: boolean;

  // Mutations — findings
  addFinding: (input: NewFindingInput) => Promise<void>;
  updateFinding: (
    id: string,
    patch: Partial<NewFindingInput> & { status?: FindingStatus }
  ) => Promise<void>;
  closeFinding: (id: string, resolutionNotes?: string) => Promise<void>;
  reopenFinding: (id: string) => Promise<void>;
  deleteFinding: (id: string) => Promise<void>;

  // Mutations — meetings
  addMeeting: (input: NewMeetingInput) => Promise<void>;
  updateMeeting: (id: string, patch: Partial<NewMeetingInput>) => Promise<void>;
  deleteMeeting: (id: string) => Promise<void>;

  // Mutations — checklist
  addChecklistItem: (input: NewChecklistItemInput) => Promise<void>;
  toggleChecklistItem: (id: string) => Promise<void>;
  updateChecklistItem: (id: string, patch: Partial<NewChecklistItemInput>) => Promise<void>;
  deleteChecklistItem: (id: string) => Promise<void>;
  seedDefaultChecklist: () => Promise<void>;

  // EQA visit date
  setNextEqaVisit: (date: string | null) => Promise<void>;

  // Imperative refresh (rarely needed — realtime covers this)
  refetch: () => Promise<void>;
}

export function useIqaWorkflow(collegeId?: string | null): UseIqaWorkflowResult {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Resolve college from prop or profile fallback
  const resolvedCollegeId = collegeId ?? profile?.college_id ?? null;
  const cycle = currentCycle();

  /* ── Queries ─────────────────────────────────────────────── */

  const findingsQuery = useQuery({
    queryKey: ['iqa-workflow', 'findings', resolvedCollegeId],
    queryFn: async () => {
      if (!resolvedCollegeId) return [] as IqaFinding[];
      const { data, error } = await supabase
        .from('college_iqa_findings')
        .select('*')
        .eq('college_id', resolvedCollegeId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as IqaFinding[];
    },
    enabled: !!resolvedCollegeId,
    staleTime: 30_000,
  });

  const meetingsQuery = useQuery({
    queryKey: ['iqa-workflow', 'meetings', resolvedCollegeId],
    queryFn: async () => {
      if (!resolvedCollegeId) return [] as IqaMeeting[];
      const { data, error } = await supabase
        .from('college_standardisation_meetings')
        .select('*')
        .eq('college_id', resolvedCollegeId)
        .order('scheduled_at', { ascending: false, nullsFirst: false });
      if (error) throw error;
      // Normalise nullable fields to safe defaults
      return ((data ?? []) as unknown[]).map((row) => {
        const r = row as Record<string, unknown>;
        return {
          ...(r as object),
          attendee_ids: Array.isArray(r.attendee_ids) ? (r.attendee_ids as string[]) : [],
          action_items: Array.isArray(r.action_items) ? (r.action_items as string[]) : [],
        } as IqaMeeting;
      });
    },
    enabled: !!resolvedCollegeId,
    staleTime: 30_000,
  });

  const checklistQuery = useQuery({
    queryKey: ['iqa-workflow', 'checklist', resolvedCollegeId, cycle],
    queryFn: async () => {
      if (!resolvedCollegeId) return [] as EqaChecklistItem[];
      const { data, error } = await supabase
        .from('college_iqa_eqa_checklist_items')
        .select('*')
        .eq('college_id', resolvedCollegeId)
        .eq('eqa_cycle', cycle)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as EqaChecklistItem[];
    },
    enabled: !!resolvedCollegeId,
    staleTime: 30_000,
  });

  // Next EQA date is on the colleges row
  const collegeQuery = useQuery({
    queryKey: ['iqa-workflow', 'college', resolvedCollegeId],
    queryFn: async () => {
      if (!resolvedCollegeId) return null;
      const { data, error } = await supabase
        .from('colleges')
        .select('id, next_eqa_visit')
        .eq('id', resolvedCollegeId)
        .maybeSingle();
      if (error) throw error;
      return (data as { id: string; next_eqa_visit: string | null } | null) ?? null;
    },
    enabled: !!resolvedCollegeId,
    staleTime: 30_000,
  });

  // canWrite — staff with IQA / quality_nominee / admin role for this college
  const canWriteQuery = useQuery({
    queryKey: ['iqa-workflow', 'can-write', resolvedCollegeId, user?.id],
    queryFn: async () => {
      if (!resolvedCollegeId || !user?.id) return false;
      const { data: staff } = await supabase
        .from('college_staff')
        .select('role, is_quality_nominee, iqa_qual, status, college_id')
        .eq('user_id', user.id)
        .eq('college_id', resolvedCollegeId)
        .eq('status', 'Active')
        .maybeSingle();
      if (staff) {
        const s = staff as {
          role: string | null;
          is_quality_nominee: boolean | null;
          iqa_qual: string | null;
        };
        if (s.is_quality_nominee || (s.iqa_qual && s.iqa_qual.trim().length > 0)) return true;
        if (s.role === 'admin' || s.role === 'head_of_department') return true;
      }
      const { data: prof } = await supabase
        .from('profiles')
        .select('college_role')
        .eq('id', user.id)
        .maybeSingle();
      const role = (prof as { college_role: string | null } | null)?.college_role ?? '';
      return ['admin', 'iqa', 'lead_iqa', 'quality_nominee'].includes(role);
    },
    enabled: !!resolvedCollegeId && !!user?.id,
    staleTime: 60_000,
  });

  /* ── Realtime ───────────────────────────────────────────── */

  useEffect(() => {
    if (!resolvedCollegeId) return;
    const channel = supabase
      .channel(`iqa-workflow:${resolvedCollegeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_iqa_findings',
          filter: `college_id=eq.${resolvedCollegeId}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: ['iqa-workflow', 'findings', resolvedCollegeId],
          })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_standardisation_meetings',
          filter: `college_id=eq.${resolvedCollegeId}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: ['iqa-workflow', 'meetings', resolvedCollegeId],
          })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_iqa_eqa_checklist_items',
          filter: `college_id=eq.${resolvedCollegeId}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: ['iqa-workflow', 'checklist', resolvedCollegeId, cycle],
          })
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'colleges',
          filter: `id=eq.${resolvedCollegeId}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: ['iqa-workflow', 'college', resolvedCollegeId],
          })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [resolvedCollegeId, cycle, queryClient]);

  /* ── Helpers ────────────────────────────────────────────── */

  const guard = useCallback(() => {
    if (!resolvedCollegeId) {
      throw new Error('No college context — cannot perform IQA action.');
    }
    if (!user?.id) {
      throw new Error('Not signed in.');
    }
    return { collegeId: resolvedCollegeId, userId: user.id };
  }, [resolvedCollegeId, user?.id]);

  const showError = useCallback(
    (title: string, err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast({ title, description: message, variant: 'destructive' });
    },
    [toast]
  );

  /* ── Findings mutations ─────────────────────────────────── */

  const addFindingMutation = useMutation({
    mutationFn: async (input: NewFindingInput) => {
      const { collegeId, userId } = guard();
      const payload = {
        college_id: collegeId,
        sample_id: input.sample_id ?? null,
        area: input.area ?? null,
        severity: input.severity ?? null,
        finding_type: input.finding_type,
        description: input.description.trim(),
        action_plan: input.action_plan?.trim() || null,
        assessor_id: input.assessor_id ?? null,
        assessor_name: input.assessor_name?.trim() || 'Unspecified',
        owner_staff_id: input.owner_staff_id ?? null,
        due_date: input.due_date ?? null,
        status: 'Open' as FindingStatus,
        created_by: userId,
      };
      const { data, error } = await supabase
        .from('college_iqa_findings')
        .insert(payload)
        .select('*')
        .single();
      if (error) throw error;
      return data as unknown as IqaFinding;
    },
    onMutate: async (input) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'findings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaFinding[]>(key) ?? [];
      const optimistic: IqaFinding = {
        id: `optimistic-${crypto.randomUUID()}`,
        college_id: resolvedCollegeId,
        sample_id: input.sample_id ?? null,
        area: input.area ?? null,
        severity: input.severity ?? null,
        finding_type: input.finding_type,
        description: input.description,
        action_plan: input.action_plan ?? null,
        owner_staff_id: input.owner_staff_id ?? null,
        due_date: input.due_date ?? null,
        status: 'Open',
        resolution_notes: null,
        closed_at: null,
        assessor_id: input.assessor_id ?? null,
        assessor_name: input.assessor_name ?? 'Unspecified',
        iqa_id: null,
        iqa_name_snapshot: null,
        observation_id: null,
        created_by: user?.id ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      queryClient.setQueryData(key, [optimistic, ...previous]);
      return { previous, key };
    },
    onError: (err, _input, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not add finding', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'findings', resolvedCollegeId],
        });
      }
    },
  });

  const updateFindingMutation = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<NewFindingInput> & {
        status?: FindingStatus;
        resolution_notes?: string | null;
      };
    }) => {
      guard();
      const dbPatch: Record<string, unknown> = {};
      if (patch.area !== undefined) dbPatch.area = patch.area;
      if (patch.severity !== undefined) dbPatch.severity = patch.severity;
      if (patch.finding_type !== undefined) dbPatch.finding_type = patch.finding_type;
      if (patch.description !== undefined) dbPatch.description = patch.description.trim();
      if (patch.action_plan !== undefined) dbPatch.action_plan = patch.action_plan?.trim() || null;
      if (patch.owner_staff_id !== undefined) dbPatch.owner_staff_id = patch.owner_staff_id;
      if (patch.due_date !== undefined) dbPatch.due_date = patch.due_date;
      if (patch.assessor_name !== undefined)
        dbPatch.assessor_name = patch.assessor_name?.trim() || 'Unspecified';
      if (patch.assessor_id !== undefined) dbPatch.assessor_id = patch.assessor_id;
      if (patch.sample_id !== undefined) dbPatch.sample_id = patch.sample_id;
      if (patch.status !== undefined) {
        dbPatch.status = patch.status;
        if (patch.status === 'Closed') {
          dbPatch.closed_at = new Date().toISOString();
        } else {
          dbPatch.closed_at = null;
        }
      }
      if (patch.resolution_notes !== undefined) dbPatch.resolution_notes = patch.resolution_notes;
      const { error } = await supabase.from('college_iqa_findings').update(dbPatch).eq('id', id);
      if (error) throw error;
    },
    onMutate: async ({ id, patch }) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'findings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaFinding[]>(key) ?? [];
      queryClient.setQueryData<IqaFinding[]>(key, (rows) =>
        (rows ?? []).map((r) =>
          r.id === id
            ? {
                ...r,
                ...patch,
                description: patch.description ?? r.description,
                updated_at: new Date().toISOString(),
                closed_at:
                  patch.status === 'Closed'
                    ? new Date().toISOString()
                    : patch.status && patch.status !== 'Closed'
                      ? null
                      : r.closed_at,
              }
            : r
        )
      );
      return { previous, key };
    },
    onError: (err, _vars, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not update finding', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'findings', resolvedCollegeId],
        });
      }
    },
  });

  const deleteFindingMutation = useMutation({
    mutationFn: async (id: string) => {
      guard();
      const { error } = await supabase.from('college_iqa_findings').delete().eq('id', id);
      if (error) throw error;
    },
    onMutate: async (id) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'findings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaFinding[]>(key) ?? [];
      queryClient.setQueryData<IqaFinding[]>(key, (rows) =>
        (rows ?? []).filter((r) => r.id !== id)
      );
      return { previous, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not delete finding', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'findings', resolvedCollegeId],
        });
      }
    },
  });

  /* ── Meetings mutations ─────────────────────────────────── */

  const addMeetingMutation = useMutation({
    mutationFn: async (input: NewMeetingInput) => {
      const { collegeId, userId } = guard();
      const scheduled = input.scheduled_at ?? new Date().toISOString();
      const payload = {
        college_id: collegeId,
        scheduled_at: scheduled,
        date: scheduled.slice(0, 10),
        duration_min: input.duration_min ?? null,
        topic: input.topic.trim(),
        agenda: input.agenda?.trim() || null,
        minutes: input.minutes?.trim() || null,
        outcome: input.outcome?.trim() || null,
        decisions: input.decisions?.trim() || null,
        action_items: input.action_items ?? [],
        attendee_ids: input.attendee_ids ?? [],
        attendees_count: input.attendees_count ?? input.attendee_ids?.length ?? 0,
        chair_id: input.chair_id ?? null,
        status: input.status ?? ('scheduled' as MeetingStatus),
        created_by: userId,
      };
      const { error } = await supabase.from('college_standardisation_meetings').insert(payload);
      if (error) throw error;
    },
    onMutate: async (input) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'meetings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaMeeting[]>(key) ?? [];
      const scheduled = input.scheduled_at ?? new Date().toISOString();
      const optimistic: IqaMeeting = {
        id: `optimistic-${crypto.randomUUID()}`,
        college_id: resolvedCollegeId,
        scheduled_at: scheduled,
        date: scheduled.slice(0, 10),
        duration_min: input.duration_min ?? null,
        topic: input.topic,
        agenda: input.agenda ?? null,
        minutes: input.minutes ?? null,
        minutes_url: null,
        outcome: input.outcome ?? null,
        decisions: input.decisions ?? null,
        action_items: input.action_items ?? [],
        attendee_ids: input.attendee_ids ?? [],
        attendees_count: input.attendees_count ?? input.attendee_ids?.length ?? 0,
        chair_id: input.chair_id ?? null,
        status: input.status ?? 'scheduled',
        created_by: user?.id ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      queryClient.setQueryData<IqaMeeting[]>(key, [optimistic, ...previous]);
      return { previous, key };
    },
    onError: (err, _input, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not save meeting', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'meetings', resolvedCollegeId],
        });
      }
    },
  });

  const updateMeetingMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<NewMeetingInput> }) => {
      guard();
      const dbPatch: Record<string, unknown> = {};
      if (patch.scheduled_at !== undefined) {
        dbPatch.scheduled_at = patch.scheduled_at;
        if (patch.scheduled_at) dbPatch.date = patch.scheduled_at.slice(0, 10);
      }
      if (patch.duration_min !== undefined) dbPatch.duration_min = patch.duration_min;
      if (patch.topic !== undefined) dbPatch.topic = patch.topic.trim();
      if (patch.agenda !== undefined) dbPatch.agenda = patch.agenda?.trim() || null;
      if (patch.minutes !== undefined) dbPatch.minutes = patch.minutes?.trim() || null;
      if (patch.outcome !== undefined) dbPatch.outcome = patch.outcome?.trim() || null;
      if (patch.decisions !== undefined) dbPatch.decisions = patch.decisions?.trim() || null;
      if (patch.action_items !== undefined) dbPatch.action_items = patch.action_items;
      if (patch.attendee_ids !== undefined) {
        dbPatch.attendee_ids = patch.attendee_ids;
        dbPatch.attendees_count = patch.attendees_count ?? patch.attendee_ids.length;
      } else if (patch.attendees_count !== undefined) {
        dbPatch.attendees_count = patch.attendees_count;
      }
      if (patch.chair_id !== undefined) dbPatch.chair_id = patch.chair_id;
      if (patch.status !== undefined) dbPatch.status = patch.status;
      const { error } = await supabase
        .from('college_standardisation_meetings')
        .update(dbPatch)
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async ({ id, patch }) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'meetings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaMeeting[]>(key) ?? [];
      queryClient.setQueryData<IqaMeeting[]>(key, (rows) =>
        (rows ?? []).map((r) =>
          r.id === id
            ? ({
                ...r,
                ...patch,
                topic: patch.topic ?? r.topic,
                attendee_ids: patch.attendee_ids ?? r.attendee_ids,
                action_items: patch.action_items ?? r.action_items,
                updated_at: new Date().toISOString(),
              } as IqaMeeting)
            : r
        )
      );
      return { previous, key };
    },
    onError: (err, _vars, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not update meeting', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'meetings', resolvedCollegeId],
        });
      }
    },
  });

  const deleteMeetingMutation = useMutation({
    mutationFn: async (id: string) => {
      guard();
      const { error } = await supabase
        .from('college_standardisation_meetings')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async (id) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'meetings', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<IqaMeeting[]>(key) ?? [];
      queryClient.setQueryData<IqaMeeting[]>(key, (rows) =>
        (rows ?? []).filter((r) => r.id !== id)
      );
      return { previous, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not delete meeting', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'meetings', resolvedCollegeId],
        });
      }
    },
  });

  /* ── Checklist mutations ────────────────────────────────── */

  const addChecklistMutation = useMutation({
    mutationFn: async (input: NewChecklistItemInput) => {
      const { collegeId, userId } = guard();
      const payload = {
        college_id: collegeId,
        eqa_cycle: input.eqa_cycle ?? cycle,
        item_label: input.item_label.trim(),
        status: input.status ?? ('pending' as ChecklistStatus),
        sort_order: input.sort_order ?? 0,
        notes: input.notes ?? null,
        evidence_url: input.evidence_url ?? null,
        created_by: userId,
      };
      const { error } = await supabase.from('college_iqa_eqa_checklist_items').insert(payload);
      if (error) throw error;
    },
    onMutate: async (input) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'checklist', resolvedCollegeId, cycle];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<EqaChecklistItem[]>(key) ?? [];
      const optimistic: EqaChecklistItem = {
        id: `optimistic-${crypto.randomUUID()}`,
        college_id: resolvedCollegeId,
        eqa_cycle: input.eqa_cycle ?? cycle,
        item_label: input.item_label,
        status: input.status ?? 'pending',
        evidence_url: input.evidence_url ?? null,
        notes: input.notes ?? null,
        sort_order: input.sort_order ?? previous.length,
        completed_at: null,
        completed_by: null,
        created_by: user?.id ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      queryClient.setQueryData<EqaChecklistItem[]>(key, [...previous, optimistic]);
      return { previous, key };
    },
    onError: (err, _input, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not add checklist item', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'checklist', resolvedCollegeId, cycle],
        });
      }
    },
  });

  const updateChecklistMutation = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<NewChecklistItemInput> & { completed_at?: string | null };
    }) => {
      const { userId } = guard();
      const dbPatch: Record<string, unknown> = {};
      if (patch.item_label !== undefined) dbPatch.item_label = patch.item_label.trim();
      if (patch.status !== undefined) {
        dbPatch.status = patch.status;
        if (patch.status === 'complete') {
          dbPatch.completed_at = new Date().toISOString();
          dbPatch.completed_by = userId;
        } else if (patch.status === 'pending' || patch.status === 'in_progress') {
          dbPatch.completed_at = null;
          dbPatch.completed_by = null;
        }
      }
      if (patch.sort_order !== undefined) dbPatch.sort_order = patch.sort_order;
      if (patch.notes !== undefined) dbPatch.notes = patch.notes;
      if (patch.evidence_url !== undefined) dbPatch.evidence_url = patch.evidence_url;
      if (patch.completed_at !== undefined) dbPatch.completed_at = patch.completed_at;
      const { error } = await supabase
        .from('college_iqa_eqa_checklist_items')
        .update(dbPatch)
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async ({ id, patch }) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'checklist', resolvedCollegeId, cycle];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<EqaChecklistItem[]>(key) ?? [];
      queryClient.setQueryData<EqaChecklistItem[]>(key, (rows) =>
        (rows ?? []).map((r) => {
          if (r.id !== id) return r;
          const next: EqaChecklistItem = {
            ...r,
            ...patch,
            item_label: patch.item_label ?? r.item_label,
            updated_at: new Date().toISOString(),
          };
          if (patch.status === 'complete') {
            next.completed_at = new Date().toISOString();
            next.completed_by = user?.id ?? null;
          } else if (patch.status === 'pending' || patch.status === 'in_progress') {
            next.completed_at = null;
            next.completed_by = null;
          }
          return next;
        })
      );
      return { previous, key };
    },
    onError: (err, _vars, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not update checklist item', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'checklist', resolvedCollegeId, cycle],
        });
      }
    },
  });

  const deleteChecklistMutation = useMutation({
    mutationFn: async (id: string) => {
      guard();
      const { error } = await supabase
        .from('college_iqa_eqa_checklist_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async (id) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'checklist', resolvedCollegeId, cycle];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<EqaChecklistItem[]>(key) ?? [];
      queryClient.setQueryData<EqaChecklistItem[]>(key, (rows) =>
        (rows ?? []).filter((r) => r.id !== id)
      );
      return { previous, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not delete checklist item', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'checklist', resolvedCollegeId, cycle],
        });
      }
    },
  });

  /* ── Next EQA visit ─────────────────────────────────────── */

  const setNextEqaVisitMutation = useMutation({
    mutationFn: async (date: string | null) => {
      const { collegeId } = guard();
      const { error } = await supabase
        .from('colleges')
        .update({ next_eqa_visit: date })
        .eq('id', collegeId);
      if (error) throw error;
    },
    onMutate: async (date) => {
      if (!resolvedCollegeId) return;
      const key = ['iqa-workflow', 'college', resolvedCollegeId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, { id: resolvedCollegeId, next_eqa_visit: date });
      return { previous, key };
    },
    onError: (err, _date, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous);
      showError('Could not save EQA date', err);
    },
    onSettled: () => {
      if (resolvedCollegeId) {
        queryClient.invalidateQueries({
          queryKey: ['iqa-workflow', 'college', resolvedCollegeId],
        });
      }
    },
  });

  /* ── Public surface ─────────────────────────────────────── */

  const findings = useMemo(() => findingsQuery.data ?? [], [findingsQuery.data]);
  const meetings = useMemo(() => meetingsQuery.data ?? [], [meetingsQuery.data]);
  const checklist = useMemo(() => checklistQuery.data ?? [], [checklistQuery.data]);
  const nextEqaVisit = collegeQuery.data?.next_eqa_visit ?? null;

  const loading =
    findingsQuery.isLoading ||
    meetingsQuery.isLoading ||
    checklistQuery.isLoading ||
    collegeQuery.isLoading;

  const error =
    (findingsQuery.error instanceof Error && findingsQuery.error.message) ||
    (meetingsQuery.error instanceof Error && meetingsQuery.error.message) ||
    (checklistQuery.error instanceof Error && checklistQuery.error.message) ||
    null;

  const addFinding = useCallback(
    async (input: NewFindingInput) => {
      await addFindingMutation.mutateAsync(input);
    },
    [addFindingMutation]
  );

  const updateFinding = useCallback(
    async (id: string, patch: Partial<NewFindingInput> & { status?: FindingStatus }) => {
      await updateFindingMutation.mutateAsync({ id, patch });
    },
    [updateFindingMutation]
  );

  const closeFinding = useCallback(
    async (id: string, resolutionNotes?: string) => {
      await updateFindingMutation.mutateAsync({
        id,
        patch: {
          status: 'Closed',
          ...(resolutionNotes !== undefined ? { resolution_notes: resolutionNotes } : {}),
        } as Partial<NewFindingInput> & { status: FindingStatus; resolution_notes?: string },
      });
    },
    [updateFindingMutation]
  );

  const reopenFinding = useCallback(
    async (id: string) => {
      await updateFindingMutation.mutateAsync({ id, patch: { status: 'Open' } });
    },
    [updateFindingMutation]
  );

  const deleteFinding = useCallback(
    async (id: string) => {
      await deleteFindingMutation.mutateAsync(id);
    },
    [deleteFindingMutation]
  );

  const addMeeting = useCallback(
    async (input: NewMeetingInput) => {
      await addMeetingMutation.mutateAsync(input);
    },
    [addMeetingMutation]
  );

  const updateMeeting = useCallback(
    async (id: string, patch: Partial<NewMeetingInput>) => {
      await updateMeetingMutation.mutateAsync({ id, patch });
    },
    [updateMeetingMutation]
  );

  const deleteMeeting = useCallback(
    async (id: string) => {
      await deleteMeetingMutation.mutateAsync(id);
    },
    [deleteMeetingMutation]
  );

  const addChecklistItem = useCallback(
    async (input: NewChecklistItemInput) => {
      await addChecklistMutation.mutateAsync(input);
    },
    [addChecklistMutation]
  );

  const toggleChecklistItem = useCallback(
    async (id: string) => {
      const item = (checklistQuery.data ?? []).find((r) => r.id === id);
      if (!item) return;
      const nextStatus: ChecklistStatus = item.status === 'complete' ? 'pending' : 'complete';
      await updateChecklistMutation.mutateAsync({ id, patch: { status: nextStatus } });
    },
    [checklistQuery.data, updateChecklistMutation]
  );

  const updateChecklistItem = useCallback(
    async (id: string, patch: Partial<NewChecklistItemInput>) => {
      await updateChecklistMutation.mutateAsync({ id, patch });
    },
    [updateChecklistMutation]
  );

  const deleteChecklistItem = useCallback(
    async (id: string) => {
      await deleteChecklistMutation.mutateAsync(id);
    },
    [deleteChecklistMutation]
  );

  const seedDefaultChecklist = useCallback(async () => {
    if (!resolvedCollegeId || (checklistQuery.data ?? []).length > 0) return;
    // Insert all defaults in parallel — server-side updated_at trigger handles
    // ordering, sort_order matches array index.
    await Promise.all(
      DEFAULT_CHECKLIST_LABELS.map((label, idx) =>
        addChecklistMutation.mutateAsync({
          item_label: label,
          sort_order: idx,
        })
      )
    );
  }, [resolvedCollegeId, checklistQuery.data, addChecklistMutation]);

  const setNextEqaVisit = useCallback(
    async (date: string | null) => {
      await setNextEqaVisitMutation.mutateAsync(date);
    },
    [setNextEqaVisitMutation]
  );

  const refetch = useCallback(async () => {
    await Promise.all([
      findingsQuery.refetch(),
      meetingsQuery.refetch(),
      checklistQuery.refetch(),
      collegeQuery.refetch(),
    ]);
  }, [findingsQuery, meetingsQuery, checklistQuery, collegeQuery]);

  return {
    findings,
    meetings,
    checklist,
    nextEqaVisit,
    cycle,
    loading,
    error,
    canWrite: canWriteQuery.data ?? false,
    addFinding,
    updateFinding,
    closeFinding,
    reopenFinding,
    deleteFinding,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    addChecklistItem,
    toggleChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    seedDefaultChecklist,
    setNextEqaVisit,
    refetch,
  };
}

export default useIqaWorkflow;
