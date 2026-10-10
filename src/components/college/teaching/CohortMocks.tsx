/**
 * Mock exams by cohort (ELE-1763).
 *
 * Learners sit mock exams in the app on their own. This brings those results
 * to their tutor: per learner, mocks sat in the last 90 days, average, pass
 * rate, last attempt and direction of travel; for the class, the topics it
 * answers worst, which is what a tutor plans the next session from.
 *
 * One server call, get_cohort_mock_summary(p_cohort): null means every cohort
 * the signed-in tutor teaches. Only attempts made in the app count.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { FormSheet } from '@/components/forms/FormSheet';
import { COLLEGE_CARD, COLLEGE_LINK } from '@/components/college/ui/CollegeUi';
import { StatusChip, plural } from '@/components/college/teaching/TeachingKit';

export interface CohortMockLearner {
  roll_id: string;
  user_id: string;
  name: string;
  cohort_id: string;
  attempts_90: number;
  avg_90: number | null;
  pass_rate_90: number | null;
  last_at: string | null;
  attempts_all: number;
  recent_avg: number | null;
  prior_avg: number | null;
  trend: 'up' | 'down' | 'flat' | null;
}
export interface CohortMockTopic {
  topic: string;
  learners: number;
  answered: number;
  got_right: number;
  pct: number;
}
export interface CohortMockSummary {
  cohorts: string[];
  hidden: number;
  totals: {
    learners: number;
    active_90: number;
    attempts_90: number;
    none_in_28_days: number;
    falling: number;
  };
  learners: CohortMockLearner[];
  topics: CohortMockTopic[];
}

export function useCohortMockSummary(cohortId: string | null = null) {
  return useQuery({
    queryKey: ['college', 'cohort-mocks', cohortId ?? 'mine'],
    staleTime: 60_000,
    queryFn: async (): Promise<CohortMockSummary> => {
      const { data, error } = await supabase.rpc(
        'get_cohort_mock_summary' as never,
        { p_cohort: cohortId } as never
      );
      if (error) throw error;
      return data as unknown as CohortMockSummary;
    },
  });
}

const DAY = 86_400_000;
const quietDays = (l: CohortMockLearner) =>
  l.last_at ? Math.floor((Date.now() - new Date(l.last_at).getTime()) / DAY) : null;

function lastSat(l: CohortMockLearner): string {
  const d = quietDays(l);
  if (d === null) return 'No mock sat yet';
  if (d === 0) return 'Last mock today';
  if (d === 1) return 'Last mock yesterday';
  if (d < 14) return `Last mock ${d} days ago`;
  if (d < 60) return `Last mock ${Math.round(d / 7)} weeks ago`;
  return `Last mock ${new Date(l.last_at as string).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
}

/** Who needs a word first: falling, then gone quiet, then lowest average. */
function needsAttention(a: CohortMockLearner, b: CohortMockLearner) {
  const rank = (l: CohortMockLearner) =>
    l.trend === 'down' ? 0 : (quietDays(l) ?? 999) >= 28 ? 1 : 2;
  return rank(a) - rank(b) || (a.avg_90 ?? -1) - (b.avg_90 ?? -1) || a.name.localeCompare(b.name);
}

export function mocksHeadline(d: CohortMockSummary | undefined, label: string): string {
  if (!d) return '';
  const t = d.totals;
  if (t.learners === 0) return `No learners with an app account in ${label} yet.`;
  if (t.attempts_90 === 0)
    return `Nobody in ${label} has sat a mock exam in the app in the last 90 days.`;
  const weak = d.topics.slice(0, 3).map((x) => `${x.topic} (${x.pct}%)`);
  const parts = [
    `${plural(t.attempts_90, 'mock')} sat by ${t.active_90} of ${t.learners} in ${label} in the last 90 days.`,
  ];
  if (weak.length)
    parts.push(`Weakest ${weak.length === 1 ? 'topic' : 'topics'}: ${weak.join(', ')}.`);
  const flags = [
    t.falling ? `${t.falling} falling` : null,
    t.none_in_28_days ? `${t.none_in_28_days} with no mock in four weeks` : null,
  ].filter(Boolean);
  if (flags.length) parts.push(`${flags.join(', ')}.`.replace(/^./, (c) => c.toUpperCase()));
  return parts.join(' ');
}

function TopicBar({ t }: { t: CohortMockTopic }) {
  return (
    <li className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 text-[13.5px] leading-snug font-semibold text-white">
          {t.topic}
        </span>
        <span className="shrink-0 text-[12.5px] tabular-nums text-white">
          {t.pct}% right · {plural(t.learners, 'learner')}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
        <div
          className={cn(
            'h-full rounded-full',
            t.pct >= 75 ? 'bg-emerald-400' : t.pct >= 60 ? 'bg-sky-400' : 'bg-orange-400'
          )}
          style={{ width: `${Math.max(t.pct, 3)}%` }}
        />
      </div>
    </li>
  );
}

function TrendChip({ l }: { l: CohortMockLearner }) {
  if (l.trend === 'down') return <StatusChip tone="action">Falling</StatusChip>;
  if (l.trend === 'up') return <StatusChip tone="done">Improving</StatusChip>;
  if ((quietDays(l) ?? 999) >= 28) return <StatusChip tone="action">Gone quiet</StatusChip>;
  if (l.trend === 'flat') return <StatusChip>Steady</StatusChip>;
  return null;
}

function CohortMocksSheet({
  open,
  onOpenChange,
  data,
  label,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  data: CohortMockSummary;
  label: string;
}) {
  const navigate = useNavigate();
  const learners = useMemo(() => [...data.learners].sort(needsAttention), [data.learners]);
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Mock exams"
      title={label.replace(/^./, (c) => c.toUpperCase())}
      description={mocksHeadline(data, label)}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
        <section>
          <h3 className="mb-2 text-[15px] font-semibold text-white">
            Learners, who needs a word first
          </h3>
          <ul className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.10]">
            {learners.map((l) => (
              <li key={l.roll_id}>
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/college?section=student360&studentId=${encodeURIComponent(l.roll_id)}#mocks`
                    )
                  }
                  className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] leading-snug font-semibold text-white">
                      {l.name}
                    </span>
                    <span className="block text-[12.5px] text-white">
                      {l.attempts_90 > 0
                        ? `${plural(l.attempts_90, 'mock')} in 90 days · average ${l.avg_90}% · ${l.pass_rate_90}% passed`
                        : 'No mocks in the last 90 days'}
                      {' · '}
                      {lastSat(l)}
                    </span>
                  </span>
                  <TrendChip l={l} />
                </button>
              </li>
            ))}
          </ul>
          {data.hidden > 0 && (
            <p className="mt-2 text-[12.5px] text-white">
              {plural(data.hidden, 'learner')} left out: you can’t see their record.
            </p>
          )}
        </section>
        <section>
          <h3 className="mb-2 text-[15px] font-semibold text-white">By topic, weakest first</h3>
          {data.topics.length === 0 ? (
            <p className="text-[13px] text-white">
              Topic results start with mocks sat from 7 October 2026.
            </p>
          ) : (
            <ul className="space-y-3">
              {data.topics.slice(0, 12).map((t) => (
                <TopicBar key={t.topic} t={t} />
              ))}
            </ul>
          )}
          <p className="mt-4 text-[12.5px] leading-relaxed text-white">
            From mock exams learners sit in the app in the last 120 days. Improving or falling
            compares their last three mocks with the three before, by five points or more.
          </p>
        </section>
      </div>
    </FormSheet>
  );
}

export function CohortMocksCard({
  cohortId = null,
  label,
  title = 'Mock exams in your classes',
}: {
  cohortId?: string | null;
  label?: string;
  title?: string;
}) {
  const { data, isLoading, error } = useCohortMockSummary(cohortId);
  const [open, setOpen] = useState(false);
  if (data && data.cohorts.length === 0) return null; // not a tutor of a cohort yet
  const who = label ?? (cohortId ? 'this class' : 'your cohorts');

  return (
    <motion.section variants={itemVariants} className={COLLEGE_CARD} data-testid="mocks-card">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-1 text-[13.5px] leading-snug text-white">
        {isLoading
          ? 'Reading the mock exams your learners have sat…'
          : error
            ? 'Could not read mock results just now.'
            : mocksHeadline(data, who)}
      </p>
      {data && data.topics.length > 0 && (
        <ul className="mt-4 space-y-3">
          {data.topics.slice(0, 3).map((t) => (
            <TopicBar key={t.topic} t={t} />
          ))}
        </ul>
      )}
      {data && data.learners.length > 0 && (
        <>
          <button type="button" className={cn(COLLEGE_LINK, 'mt-2')} onClick={() => setOpen(true)}>
            See every learner
          </button>
          <CohortMocksSheet open={open} onOpenChange={setOpen} data={data} label={who} />
        </>
      )}
    </motion.section>
  );
}
