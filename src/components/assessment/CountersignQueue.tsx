/**
 * CountersignQueue — trainee assessors' passes waiting for a qualified
 * assessor (batch 2, 10 Oct 2026). get_countersign_queue() lists the current
 * trainee passes on learners the caller can assess; countersign_decisions()
 * records each countersignature (named, timed, append-only) and only then
 * does the pass count. A trainee sees their own passes here as waiting.
 *
 * Sits on the Portfolios page beside "Waiting for a decision". Renders
 * nothing when the queue is empty.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  QueueGroup,
  QueueRow,
  daysSince,
  waitingLabel,
} from '@/components/college/assessment/AssessmentKit';
import { countersignDecisions } from '@/hooks/portfolio/usePortfolioAcState';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';

export interface CountersignItem {
  decision_id: string;
  learner_id: string;
  learner_name: string;
  college_student_id: string | null;
  qualification_code: string | null;
  unit_code: string;
  ac_code: string;
  ac_text: string | null;
  method: string | null;
  feedback: string | null;
  evidence_item_ids: string[];
  assessor_id: string;
  assessor_name: string | null;
  assessor_qualifications: string[] | null;
  decided_at: string;
  can_countersign: boolean;
}

export function useCountersignQueue(enabled = true) {
  const [items, setItems] = useState<CountersignItem[]>([]);
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    const { data, error } = await supabase.rpc('get_countersign_queue' as never);
    setLoading(false);
    if (!error) setItems((data ?? []) as unknown as CountersignItem[]);
  }, [enabled]);
  useEffect(() => {
    void load();
  }, [load]);
  return { items, loading, refresh: load };
}

/** One row per learner and trainee decision moment: the criteria decided together. */
interface Group {
  key: string;
  learner_name: string;
  college_student_id: string | null;
  assessor_name: string | null;
  decided_at: string;
  can: boolean;
  rows: CountersignItem[];
}

export function CountersignQueue({
  scopeStudentIds,
  className,
}: {
  scopeStudentIds?: Set<string> | null;
  className?: string;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, refresh } = useCountersignQueue();
  const [busy, setBusy] = useState<string | null>(null);

  const groups = useMemo<Group[]>(() => {
    const m = new Map<string, Group>();
    for (const it of items) {
      if (scopeStudentIds && it.college_student_id && !scopeStudentIds.has(it.college_student_id))
        continue;
      const k = `${it.learner_id}|${it.assessor_id}|${it.decided_at.slice(0, 16)}`;
      const g = m.get(k);
      if (g) g.rows.push(it);
      else
        m.set(k, {
          key: k,
          learner_name: it.learner_name,
          college_student_id: it.college_student_id,
          assessor_name: it.assessor_name,
          decided_at: it.decided_at,
          can: it.can_countersign,
          rows: [it],
        });
    }
    return [...m.values()].sort((a, b) => a.decided_at.localeCompare(b.decided_at));
  }, [items, scopeStudentIds]);

  const eligible = groups.filter((g) => g.can);
  const mineWaiting = groups.filter((g) => !g.can);

  const sign = async (ids: string[], key: string) => {
    if (busy) return;
    setBusy(key);
    try {
      const n = await countersignDecisions(ids);
      toast({
        title: `${n} ${n === 1 ? 'pass' : 'passes'} countersigned`,
        description: 'They now count. The learner and the trainee have been told.',
      });
      await refresh();
    } catch (e) {
      toast({
        title: 'Not countersigned',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  if (groups.length === 0) return null;

  const crit = (g: Group) =>
    g.rows
      .slice(0, 3)
      .map((r) => `${r.unit_code} AC ${r.ac_code}`)
      .join(', ') + (g.rows.length > 3 ? ` and ${g.rows.length - 3} more` : '');

  const open = (g: Group) => {
    if (!g.college_student_id) return;
    const acs = g.rows.map((r) => `${r.unit_code}:${r.ac_code}`).join(',');
    navigate(
      `/college?section=student360&studentId=${encodeURIComponent(g.college_student_id)}&ac=${encodeURIComponent(acs)}#assess`
    );
  };

  return (
    <section data-testid="countersign-queue" className={cn('min-w-0 space-y-3', className)}>
      <CollegeSectionTitle
        id="countersign"
        title="Awaiting countersignature"
        sub={
          eligible.length
            ? `Passes recorded by trainee assessors. They do not count until a qualified assessor countersigns them.`
            : 'Your passes are waiting for a qualified assessor. They do not count until then.'
        }
      />
      {eligible.length > 0 && (
        <QueueGroup
          title="To countersign"
          count={eligible.reduce((n, g) => n + g.rows.length, 0)}
          action={
            eligible.length > 1 ? (
              <button
                type="button"
                disabled={!!busy}
                onClick={() =>
                  void sign(
                    eligible.flatMap((g) => g.rows.map((r) => r.decision_id)),
                    'all'
                  )
                }
                className="h-11 rounded-xl border border-white/[0.2] px-3 text-[13px] font-semibold text-white touch-manipulation disabled:opacity-50"
              >
                {busy === 'all' ? 'Countersigning…' : 'Countersign all'}
              </button>
            ) : undefined
          }
        >
          {eligible.map((g) => (
            <li key={g.key}>
              <QueueRow
                name={g.learner_name}
                title={crit(g)}
                body={g.rows[0].feedback ? `“${g.rows[0].feedback}”` : undefined}
                meta={
                  <>
                    <b>{waitingLabel(daysSince(g.decided_at))}</b> · passed by{' '}
                    {g.assessor_name ?? 'a trainee'} (trainee)
                  </>
                }
                kind={g.rows.length === 1 ? '1 criterion' : `${g.rows.length} criteria`}
                onOpen={() => open(g)}
                stackTrailing
                trailing={
                  <button
                    type="button"
                    data-testid="countersign-group"
                    disabled={!!busy}
                    onClick={(e) => {
                      e.stopPropagation();
                      void sign(
                        g.rows.map((r) => r.decision_id),
                        g.key
                      );
                    }}
                    className="h-11 w-full shrink-0 rounded-xl border border-white/[0.2] px-4 text-[13.5px] font-semibold text-white touch-manipulation active:bg-white/[0.06] disabled:opacity-50 sm:w-auto"
                  >
                    {busy === g.key ? 'Countersigning…' : 'Countersign'}
                  </button>
                }
              />
            </li>
          ))}
        </QueueGroup>
      )}
      {mineWaiting.length > 0 && (
        <QueueGroup
          title="Your passes, waiting"
          count={mineWaiting.reduce((n, g) => n + g.rows.length, 0)}
        >
          {mineWaiting.map((g) => (
            <li key={g.key}>
              <QueueRow
                name={g.learner_name}
                title={crit(g)}
                meta={
                  <>{waitingLabel(daysSince(g.decided_at))} · waiting for a qualified assessor</>
                }
                onOpen={() => open(g)}
                action="Open"
              />
            </li>
          ))}
        </QueueGroup>
      )}
    </section>
  );
}
