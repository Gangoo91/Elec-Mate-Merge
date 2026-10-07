import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useIqaFindings — list + create + close findings raised by IQAs.
   Realtime-subscribed.
   ========================================================================== */

export type FindingType = 'commendation' | 'observation' | 'action' | 'concern';
export type FindingStatus = 'open' | 'in_progress' | 'closed' | 'escalated';
export type FindingSeverity = 'minor' | 'major' | 'critical';

export interface IqaFinding {
  id: string;
  college_id: string | null;
  iqa_id: string | null;
  iqa_name_snapshot: string | null;
  assessor_id: string | null;
  assessor_name: string;
  observation_id: string | null;
  /** Hard FK to college_iqa_samples.id when the finding was promoted
   *  from a sample verdict. Lets the plan page list "findings raised
   *  from this sample" + powers click-through audit traceability. */
  sample_id: string | null;
  finding_type: FindingType;
  severity: FindingSeverity | null;
  description: string;
  status: FindingStatus;
  action_plan: string | null;
  due_date: string | null;
  resolution_notes: string | null;
  closed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface NewIqaFinding {
  iqa_id?: string | null;
  assessor_id?: string | null;
  assessor_name: string;
  observation_id?: string | null;
  sample_id?: string | null;
  finding_type: FindingType;
  severity?: FindingSeverity | null;
  description: string;
  action_plan?: string | null;
  due_date?: string | null;
}

/* The database stores capitalised labels (CHECK constraints):
     finding_type: 'Good Practice' | 'Area for Improvement' | 'Action Required' | 'Concern'
     status:       'Open' | 'Closed'
   The UI works in the lower-case keys above. This is the ONE place the two
   are mapped, both ways. */
const TYPE_TO_DB: Record<FindingType, string> = {
  commendation: 'Good Practice',
  observation: 'Area for Improvement',
  action: 'Action Required',
  concern: 'Concern',
};
const TYPE_FROM_DB: Record<string, FindingType> = {
  'good practice': 'commendation',
  commendation: 'commendation',
  'area for improvement': 'observation',
  observation: 'observation',
  'action required': 'action',
  action: 'action',
  concern: 'concern',
};
const STATUS_TO_DB: Record<FindingStatus, string> = {
  open: 'Open',
  in_progress: 'Open',
  escalated: 'Open',
  closed: 'Closed',
};

export function findingTypeToDb(t: FindingType): string {
  return TYPE_TO_DB[t] ?? 'Area for Improvement';
}
export function findingTypeFromDb(v: unknown): FindingType {
  return (
    TYPE_FROM_DB[
      String(v ?? '')
        .trim()
        .toLowerCase()
    ] ?? 'observation'
  );
}
/** The database only has Open and Closed; anything else reads as open. */
export function findingStatusFromDb(v: unknown): FindingStatus {
  return String(v ?? '')
    .trim()
    .toLowerCase() === 'closed'
    ? 'closed'
    : 'open';
}
/** Case-insensitive "is this finding still open". */
export function isFindingOpen(f: { status: unknown }): boolean {
  return findingStatusFromDb(f.status) !== 'closed';
}

function normalise(row: Record<string, unknown>): IqaFinding {
  return {
    ...(row as unknown as IqaFinding),
    finding_type: findingTypeFromDb(row.finding_type),
    status: findingStatusFromDb(row.status),
  };
}

const COLS =
  'id, college_id, iqa_id, iqa_name_snapshot, assessor_id, assessor_name, observation_id, sample_id, finding_type, severity, description, status, action_plan, due_date, resolution_notes, closed_at, created_at, updated_at';

export function useIqaFindings() {
  const [findings, setFindings] = useState<IqaFinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_iqa_findings')
      .select(COLS)
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setFindings(((data ?? []) as Record<string, unknown>[]).map(normalise));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('iqa_findings'))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_iqa_findings' }, () =>
        fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  const create = useCallback(async (input: NewIqaFinding) => {
    const { data: userData } = await supabase.auth.getUser();
    let collegeId: string | null = null;
    if (userData.user?.id) {
      collegeId = await getMyCollegeId(userData.user.id).catch(() => null);
    }
    const { error: insErr } = await supabase.from('college_iqa_findings').insert({
      college_id: collegeId,
      iqa_id: input.iqa_id ?? null,
      assessor_id: input.assessor_id ?? null,
      assessor_name: input.assessor_name,
      observation_id: input.observation_id ?? null,
      sample_id: input.sample_id ?? null,
      finding_type: findingTypeToDb(input.finding_type),
      severity: input.severity ?? null,
      description: input.description,
      status: STATUS_TO_DB.open,
      action_plan: input.action_plan ?? null,
      due_date: input.due_date ?? null,
    });
    if (insErr) throw insErr;
  }, []);

  const close = useCallback(async (id: string, resolutionNotes: string) => {
    const { error: updErr } = await supabase
      .from('college_iqa_findings')
      .update({
        status: STATUS_TO_DB.closed,
        closed_at: new Date().toISOString(),
        resolution_notes: resolutionNotes.trim() || null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error: delErr } = await supabase.from('college_iqa_findings').delete().eq('id', id);
    if (delErr) throw delErr;
  }, []);

  return { findings, loading, error, refresh: fetch, create, close, remove };
}
