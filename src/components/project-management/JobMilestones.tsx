import { useState, useEffect, useCallback } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  name: string;
  stage_key: string;
  sort: number;
  completed_at: string | null;
}

interface JobMilestonesProps {
  projectId: string;
  /** Don't seed stages onto finished work — render only what exists. */
  projectStatus?: string;
}

/**
 * Electrical-stage milestones (ELE-1359): First fix → Second fix → Testing →
 * Certs, seeded by job type. Tap a stage to mark it done — progress is real
 * work stages, not task counts.
 */
export const JobMilestones = ({ projectId, projectStatus }: JobMilestonesProps) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any;
      let { data } = await sb
        .from('job_milestones')
        .select('id, name, stage_key, sort, completed_at')
        .eq('project_id', projectId)
        .order('sort');
      if ((!data || data.length === 0) && projectStatus !== 'completed' && projectStatus !== 'cancelled') {
        // First visit on a live job: seed the trade-appropriate stage set
        await sb.rpc('seed_job_milestones', { p_project_id: projectId });
        ({ data } = await sb
          .from('job_milestones')
          .select('id, name, stage_key, sort, completed_at')
          .eq('project_id', projectId)
          .order('sort'));
      }
      setMilestones((data || []) as Milestone[]);
    } catch (err) {
      console.error('Failed to load milestones:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId, projectStatus]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (m: Milestone) => {
    if (busy) return;
    setBusy(m.id);
    const next = m.completed_at ? null : new Date().toISOString();
    // optimistic
    setMilestones((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, completed_at: next } : x))
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('job_milestones')
        .update({ completed_at: next })
        .eq('id', m.id);
      if (error) throw error;
    } catch {
      setMilestones((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, completed_at: m.completed_at } : x))
      );
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return (
      <div className={cn(PANEL, 'flex items-center justify-center py-5')}>
        <Loader2 className="h-4 w-4 animate-spin text-white/40" />
      </div>
    );
  }
  if (milestones.length === 0) return null;

  const done = milestones.filter((m) => m.completed_at).length;
  const pct = Math.round((done / milestones.length) * 100);

  return (
    <div className={cn(PANEL, 'overflow-hidden')}>
      <div className="flex items-center justify-between px-4 pt-3.5 sm:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          Job stages
        </p>
        <p className="text-[12px] font-semibold text-white/70 tabular-nums">
          {done}/{milestones.length} · {pct}%
        </p>
      </div>
      {/* progress track */}
      <div className="mx-4 sm:mx-5 mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            pct === 100 ? 'bg-emerald-400' : 'bg-elec-yellow'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* tappable stages */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none px-4 sm:px-5 py-3">
        {milestones.map((m) => {
          const isDone = !!m.completed_at;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggle(m)}
              disabled={busy === m.id}
              className={cn(
                'flex-shrink-0 h-10 px-3 rounded-full border text-[12px] font-medium touch-manipulation inline-flex items-center gap-1.5 transition-colors',
                isDone
                  ? 'bg-emerald-500/[0.10] border-emerald-500/[0.25] text-emerald-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/70 active:bg-white/[0.07]'
              )}
            >
              {isDone && <Check className="h-3.5 w-3.5" />}
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobMilestones;
