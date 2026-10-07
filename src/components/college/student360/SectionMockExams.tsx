import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   SectionMockExams — a learner's mock exams, for their tutor (ELE-1815).

   Read through `college_learner_mock_summary` (staff at the learner's college
   only): recent results with pass/fail, accuracy by topic weakest first, and
   how many wrong answers are still on the learner's revision pile. Never the
   answers themselves. Feeds the "are they ready for the AM2/EPA" conversation.
   ========================================================================== */

const supabase = typedSupabase as unknown as SupabaseClient;

interface Summary {
  attempts: {
    exam_slug: string;
    exam_name: string | null;
    percentage: number;
    passed: boolean;
    score: number;
    total_questions: number;
    pass_mark: number;
    created_at: string;
  }[];
  topics: { topic: string; asked: number; answered: number; got_right: number; pct: number }[];
  to_revise: number;
}

const CARD = cn('overflow-hidden rounded-2xl border border-white/[0.14]', CARD_SURFACE);

function paperName(a: Summary['attempts'][number]): string {
  if (a.exam_name) return a.exam_name;
  const m = a.exam_slug.match(/^level(\d)-module\d+-mock(\d+)$/);
  if (m) return `Level ${m[1]} Mock Exam ${m[2]}`;
  return a.exam_slug.replace(/[-_]+/g, ' ').replace(/\b(\w)/g, (c) => c.toUpperCase());
}

function when(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** The learner's mock summary (ELE-1815), shared by the area page and the
 *  overview card's figure (ELE-2015). Null until loaded. */
export function useLearnerMockSummary(userId: string | null) {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Switching learner: never show the last one's results while this loads.
    setData(null);
    setError(false);
    if (!userId) return;
    let cancelled = false;
    supabase
      .rpc('college_learner_mock_summary', { p_learner: userId })
      .then(({ data: d, error: e }) => {
        if (cancelled) return;
        if (e) setError(true);
        else setData(d as Summary);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { data, error };
}

export type LearnerMockSummary = Summary;

export function SectionMockExams({
  id,
  studentName,
  userId,
}: {
  id: string;
  studentName: string;
  userId: string | null;
}) {
  const { data, error } = useLearnerMockSummary(userId);

  if (!userId) return null;
  const first = studentName.split(' ')[0];

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <HubSectionHeading>Mock exams</HubSectionHeading>

      {error ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[13px] text-white">Couldn’t load {first}’s mock exams.</p>
        </div>
      ) : !data ? (
        <div className={cn(CARD, 'h-24 animate-pulse')} />
      ) : data.attempts.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[13px] leading-relaxed text-white">
            {first} hasn’t sat a mock exam in the app yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {/* Recent results */}
          <div className={CARD}>
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
              <div className="text-[13px] font-semibold text-white">Recent results</div>
              <div className="text-[12px] tabular-nums text-white">
                {data.attempts.filter((a) => a.passed).length} of {data.attempts.length} passed
              </div>
            </div>
            <ul className="divide-y divide-white/[0.08]">
              {data.attempts.slice(0, 6).map((a, i) => (
                <li
                  key={`${a.created_at}-${i}`}
                  className="flex items-center gap-3 px-4 py-2.5 sm:px-5"
                >
                  <span
                    className={cn(
                      'inline-flex h-8 min-w-[3rem] items-center justify-center rounded-lg px-2 text-[13px] font-bold tabular-nums text-black',
                      a.passed ? 'bg-emerald-400' : 'bg-orange-400'
                    )}
                  >
                    {a.percentage}%
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold text-white">
                      {paperName(a)}
                    </span>
                    <span className="block text-[12px] text-white">
                      {when(a.created_at)} · {a.score}/{a.total_questions} · pass {a.pass_mark}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/[0.10] px-4 py-3 text-[12.5px] text-white sm:px-5">
              {data.to_revise > 0
                ? `${data.to_revise} wrong ${data.to_revise === 1 ? 'answer' : 'answers'} still on ${first}’s revision pile.`
                : `${first} has nothing waiting on their revision pile.`}
            </div>
          </div>

          {/* Topics */}
          <div className={CARD}>
            <div className="border-b border-white/[0.10] px-4 py-3 sm:px-5">
              <div className="text-[13px] font-semibold text-white">By topic, weakest first</div>
            </div>
            {data.topics.length === 0 ? (
              <p className="px-4 py-4 text-[12.5px] text-white sm:px-5">
                Topic accuracy starts with mocks sat from 7 October 2026.
              </p>
            ) : (
              <ul className="space-y-3 px-4 py-4 sm:px-5">
                {data.topics.slice(0, 8).map((t) => (
                  <li key={t.topic}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-[13px] font-semibold text-white">
                        {t.topic}
                      </span>
                      <span className="shrink-0 text-[12px] tabular-nums text-white">
                        {t.got_right}/{t.answered} · {t.pct}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          t.pct >= 75
                            ? 'bg-emerald-400'
                            : t.pct >= 60
                              ? 'bg-sky-400'
                              : 'bg-orange-400'
                        )}
                        style={{ width: `${Math.max(t.pct, 3)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
