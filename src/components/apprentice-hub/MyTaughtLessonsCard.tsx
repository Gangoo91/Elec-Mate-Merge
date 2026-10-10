import { LC_FRAME } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  recordResourceOpen,
  resolveResourceUrl,
  type MyResource,
} from '@/hooks/useMyTutorResources';

/* ==========================================================================
   MyTaughtLessonsCard — what was taught to your class (ELE-1890).

   Every lesson delivered to the learner's cohort (its register was taken),
   newest first: the date, the criteria it covered, whether the learner was
   there (marked present or late), the materials the tutor linked to the
   lesson, and the lesson's quiz when one is set. A learner who missed a
   lesson sees exactly what to catch up on.

   Reads get_learner_taught_lessons() (own record only, security definer).
   ========================================================================== */

interface TaughtRow {
  delivery_id: string | null;
  lesson_plan_id: string;
  title: string;
  delivered_on: string;
  ac_codes: string[] | null;
  kit: string[] | null;
  resources: Array<
    Pick<
      MyResource,
      'id' | 'college_id' | 'title' | 'kind' | 'file_path' | 'external_url' | 'mime_type'
    >
  > | null;
  was_present: boolean;
  quiz_id: string | null;
  quiz_title: string | null;
}

const DATE_FMT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

export function MyTaughtLessonsCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rows, setRows] = useState<TaughtRow[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase
      .rpc('get_learner_taught_lessons' as never, { p_limit: 30 } as never)
      .then(({ data, error }) => {
        if (cancelled) return;
        setRows(error ? [] : ((data ?? []) as unknown as TaughtRow[]));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (rows === null) return null;
  if (rows.length === 0) return null;

  const visible = expanded ? rows : rows.slice(0, 4);
  const missed = rows.filter((r) => !r.was_present).length;

  const open = async (r: NonNullable<TaughtRow['resources']>[number]) => {
    if (opening) return;
    setOpening(r.id);
    try {
      const url = await resolveResourceUrl(r as MyResource);
      if (!url) {
        toast({
          title: 'Could not open this file',
          description: 'Ask your tutor to re-share it.',
          variant: 'destructive',
        });
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      void recordResourceOpen(r.id, r.college_id);
    } finally {
      setOpening(null);
    }
  };

  return (
    <section className={LC_FRAME}>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Taught in class</h2>
          <span className="text-[12px] tabular-nums text-white">
            {rows.length} {rows.length === 1 ? 'lesson' : 'lessons'}
            {missed > 0 && ` · ${missed} missed`}
          </span>
        </div>

        <ul className="-mx-1 mt-3 divide-y divide-white/[0.05]">
          {visible.map((r) => {
            const acs = r.ac_codes ?? [];
            const res = r.resources ?? [];
            return (
              <li key={`${r.lesson_plan_id}|${r.delivered_on}`} className="px-1 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-medium text-white">
                    Taught {DATE_FMT.format(new Date(`${r.delivered_on}T12:00:00`))}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[12px] font-semibold',
                      r.was_present ? 'text-emerald-400' : 'text-orange-400'
                    )}
                  >
                    {r.was_present ? 'You were there' : 'You missed this'}
                  </span>
                </div>
                <p className="mt-0.5 text-[13.5px] font-semibold leading-snug text-white">
                  {r.title}
                </p>
                {acs.length > 0 && (
                  <p className="mt-1 text-[12px] leading-snug text-white">
                    Criteria covered: <span className="tabular-nums">{acs.join(', ')}</span>
                  </p>
                )}
                {!r.was_present && (
                  <p className="mt-1 text-[12px] leading-snug text-white">
                    Catch up with the materials below and ask your tutor about anything you are
                    unsure of.
                  </p>
                )}
                {(res.length > 0 || r.quiz_id) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {res.map((x) => (
                      <button
                        key={x.id}
                        type="button"
                        onClick={() => void open(x)}
                        disabled={opening === x.id}
                        className="inline-flex h-11 max-w-full items-center rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-medium text-white touch-manipulation hover:border-white/[0.3] disabled:opacity-60"
                      >
                        <span className="truncate">{opening === x.id ? 'Opening…' : x.title}</span>
                      </button>
                    ))}
                    {r.quiz_id && (
                      <button
                        type="button"
                        onClick={() => navigate(`/apprentice/college/quiz/${r.quiz_id}`)}
                        className="inline-flex h-11 items-center rounded-xl border border-white/[0.3] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow active:bg-white/[0.06]"
                      >
                        Take the quiz
                      </button>
                    )}
                  </div>
                )}
                {res.length === 0 && (r.kit ?? []).length > 0 && (
                  <p className="mt-1 text-[12px] leading-snug text-white">
                    Used in class: {(r.kit ?? []).join(', ')}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {rows.length > 4 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow active:bg-white/[0.06]"
          >
            {expanded ? 'Show fewer' : `Show all ${rows.length}`}
          </button>
        )}
      </div>
    </section>
  );
}
