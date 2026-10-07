import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   ELE-1858 — What Elec-Mate did for the college this month. The page a head
   of department opens in a meeting and at renewal. Every figure is a count
   from the college's own record (get_college_value), this month against the
   month before; nothing is estimated. Download PDF builds the same figures
   server-side (learner-document-pdf, college_value; ELE-2017).
   ========================================================================== */

type Month = {
  hours_verified: number;
  app_learning_hours: number;
  learners_studied: number;
  evidence_assessed: number;
  decision_days: number | null;
  observations: number;
  reviews_held: number;
  messages_answered: number;
  registers_taken: number;
  attendance_rate: number | null;
  quizzes_completed: number;
  quiz_average: number | null;
  at_risk: number;
  at_risk_contacted: number;
};

type Value = {
  month: string;
  previous_month: string;
  to_date: string;
  previous_to_date: string;
  partial: boolean;
  learners: number;
  this: Month;
  last: Month;
};

const HELP: PageHelpContent = {
  id: 'college-value',
  title: 'Your month in numbers',
  what: 'What your staff and learners did in Elec-Mate this month, counted from your own records and set against last month. Use it in team meetings, with governors and at renewal.',
  steps: [
    { title: 'Pick the month', body: 'The arrows step back through earlier months. Each figure compares with the month before it.' },
    { title: 'Read the change', body: 'Green means up on last month, orange means down where down is worse (for decision time, down is better).' },
    { title: 'Download it', body: 'Download PDF gives a clean copy of the month for a meeting pack.' },
  ],
  notes: [
    { title: 'Nothing is estimated', body: 'Every number is a count of real records: hours verified, submissions given a decision, registers taken, messages sent and so on.' },
    { title: 'At-risk learners', body: 'Learners currently flagged high or critical, and how many had contact recorded this month (a note, 1-2-1, concern, flag or intervention).' },
  ],
};

function monthLabel(iso: string) {
  return new Date(`${iso}T12:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function dayLabel(iso: string) {
  return new Date(`${iso}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function shiftMonth(iso: string, by: number) {
  const d = new Date(`${iso}T12:00`);
  d.setMonth(d.getMonth() + by, 1);
  return d.toLocaleDateString('en-CA').slice(0, 8) + '01';
}

type Metric = {
  key: keyof Month;
  label: string;
  unit?: string;
  /** For time-to-decision, lower is better. */
  lowerBetter?: boolean;
  /** A point-in-time figure (risk is flagged "now"): no month-on-month change. */
  noCompare?: boolean;
  sub: (m: Month) => string;
};

const GROUPS: Array<{ title: string; sub: string; metrics: Metric[] }> = [
  {
    title: 'Hours and learning',
    sub: 'Off-the-job time evidenced, and learning measured in the app',
    metrics: [
      { key: 'hours_verified', label: 'Hours verified', unit: 'h', sub: () => 'Verified by a tutor or attested by an employer' },
      { key: 'app_learning_hours', label: 'Learning in the app', unit: 'h', sub: () => 'Measured as it happened' },
      { key: 'learners_studied', label: 'Learners who studied', sub: (m) => `${m.learners_studied} used the app to learn` },
    ],
  },
  {
    title: 'Assessment',
    sub: 'Evidence decided, observations and progress reviews',
    metrics: [
      { key: 'evidence_assessed', label: 'Evidence assessed', sub: () => 'Submissions given a decision' },
      { key: 'decision_days', label: 'Days to a decision', lowerBetter: true, sub: () => 'Average, submission to decision' },
      { key: 'observations', label: 'Observations', sub: () => 'Recorded by assessors' },
      { key: 'reviews_held', label: 'Progress reviews held', sub: () => 'Three-way, with the employer' },
    ],
  },
  {
    title: 'Teaching and support',
    sub: 'Registers, quizzes, messages and contact with learners at risk',
    metrics: [
      { key: 'registers_taken', label: 'Registers taken', sub: (m) => (m.attendance_rate == null ? 'No sessions' : `${m.attendance_rate}% attendance`) },
      { key: 'quizzes_completed', label: 'Quizzes completed', sub: (m) => (m.quiz_average == null ? 'No quizzes' : `Average score ${m.quiz_average}%`) },
      { key: 'messages_answered', label: 'Messages sent', sub: () => 'From tutors to learners' },
      { key: 'at_risk_contacted', label: 'At-risk learners contacted', sub: (m) => `of ${m.at_risk} flagged high or critical now`, noCompare: true },
    ],
  },
];

function fmt(v: number | null, unit = '') {
  if (v == null) return '—';
  return `${Number.isInteger(v) ? v : v.toFixed(1)}${unit}`;
}

function Delta({ now, before, lowerBetter, partial }: { now: number | null; before: number | null; lowerBetter?: boolean; partial?: boolean }) {
  if (now == null || before == null) return <span className="text-[12px] text-white">No comparison</span>;
  const diff = Math.round((now - before) * 10) / 10;
  if (diff === 0) return <span className="text-[12px] text-white">Same as {partial ? 'the same days last month' : 'last month'}</span>;
  const better = lowerBetter ? diff < 0 : diff > 0;
  return (
    <span className={cn('text-[12px] font-semibold', better ? 'text-emerald-400' : 'text-orange-300')}>
      {diff > 0 ? '▲' : '▼'} {Math.abs(diff)} on {partial ? 'the same days last month' : 'last month'}
    </span>
  );
}

export default function CollegeValuePage() {
  const [month, setMonth] = useState<string>(() => new Date().toLocaleDateString('en-CA').slice(0, 8) + '01');
  const [data, setData] = useState<Value | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const thisMonth = new Date().toLocaleDateString('en-CA').slice(0, 8) + '01';
  const pdf = useLearnerDocumentDownload();

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);
    void supabase
      .rpc('get_college_value' as never, { p_college: null, p_month: month } as never)
      .then(({ data: d, error: e }) => {
        if (!live) return;
        if (e) setError(e.message);
        setData((d as unknown as Value) ?? null);
        setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [month]);

  const chart = useMemo(() => {
    if (!data) return [];
    return [
      { label: 'Hours verified', short: 'Hours', now: data.this.hours_verified, last: data.last.hours_verified },
      { label: 'App learning (hours)', short: 'App', now: data.this.app_learning_hours, last: data.last.app_learning_hours },
      { label: 'Evidence assessed', short: 'Evidence', now: data.this.evidence_assessed, last: data.last.evidence_assessed },
      { label: 'Registers', short: 'Registers', now: data.this.registers_taken, last: data.last.registers_taken },
      { label: 'Quizzes', short: 'Quizzes', now: data.this.quizzes_completed, last: data.last.quizzes_completed },
      { label: 'Messages', short: 'Messages', now: data.this.messages_answered, last: data.last.messages_answered },
    ];
  }, [data]);

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Your month in numbers" backTo="/college" trailing={<PageHelpButton help={HELP} compact />} />
      <HubBody hidePushPrompt>
        <CollegePageHeader
          eyebrow="Value report"
          title={`What Elec-Mate did for you in ${monthLabel(month)}`}
          description={
            data
              ? data.partial
                ? `${data.learners} learners on programme. ${monthLabel(month)} so far, to ${dayLabel(data.to_date)}, compared with the same days of ${monthLabel(data.previous_month)} (to ${dayLabel(data.previous_to_date)}). Counted from your own records.`
                : `${data.learners} learners on programme. Every figure is counted from your own records and compared with ${monthLabel(data.previous_month)}.`
              : 'Counted from your own records, compared with the month before.'
          }
          actions={
            <div className="flex items-center gap-2 print:hidden">
              <div className="flex items-center rounded-xl border border-white/[0.14]">
                <button
                  type="button"
                  onClick={() => setMonth((m) => shiftMonth(m, -1))}
                  aria-label="Previous month"
                  className="flex h-11 w-11 items-center justify-center text-white touch-manipulation hover:text-elec-yellow"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[8.5rem] text-center text-[13px] font-semibold text-white">{monthLabel(month)}</span>
                <button
                  type="button"
                  onClick={() => setMonth((m) => shiftMonth(m, 1))}
                  disabled={month >= thisMonth}
                  aria-label="Next month"
                  className="flex h-11 w-11 items-center justify-center text-white touch-manipulation hover:text-elec-yellow disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => void pdf.download({ kind: 'college_value', month })}
                disabled={!data || pdf.busy}
                className={COLLEGE_BTN}
              >
                <Download className="h-4 w-4" aria-hidden />
                {pdf.busy ? 'Making the PDF…' : 'Download PDF'}
              </button>
            </div>
          }
        />

        {error ? (
          <CollegeEmpty title="Couldn't load the figures" body={error} />
        ) : loading && !data ? (
          <div className={cn(COLLEGE_CARD, 'h-64 animate-pulse')} />
        ) : data ? (
          <>
            {GROUPS.map((g) => (
              <section key={g.title} className="space-y-3">
                <CollegeSectionTitle title={g.title} sub={g.sub} />
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn('grid grid-cols-2 items-stretch gap-3', g.metrics.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}
                >
                  {g.metrics.map((m) => (
                    <motion.div
                      key={m.key}
                      variants={itemVariants}
                      className="flex flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5"
                    >
                      <p className="text-[13px] font-medium text-white">{m.label}</p>
                      <p className="mt-2 text-[34px] font-bold leading-none tabular-nums text-white">
                        {fmt(data.this[m.key] as number | null, m.unit)}
                      </p>
                      <p className="mt-2 text-[12.5px] leading-snug text-white">{m.sub(data.this)}</p>
                      <div className="mt-auto pt-3">
                        {m.noCompare ? (
                          <span className="text-[12px] text-white">Contact recorded this month</span>
                        ) : (
                        <Delta now={data.this[m.key] as number | null} before={data.last[m.key] as number | null} lowerBetter={m.lowerBetter} partial={data.partial} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            ))}

            <section className="space-y-3">
              <CollegeSectionTitle title="This month against last" sub={`${monthLabel(month)}${data.partial ? ' so far' : ''} in volt, ${monthLabel(data.previous_month)}${data.partial ? ' (same days)' : ''} in grey`} />
              <div className={COLLEGE_CARD}>
                <div className="-mx-2 h-72">
                  <ResponsiveContainer>
                    <BarChart data={chart} margin={{ top: 8, right: 12, left: -12, bottom: 0 }} barGap={4}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="short" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.95)' }} tickLine={false} axisLine={false} interval={0} />
                      <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.95)' }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
                        labelStyle={{ color: 'white' }}
                        labelFormatter={(_l, p) => (p?.[0]?.payload as { label?: string } | undefined)?.label ?? ''}
                        itemStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="last" name={monthLabel(data.previous_month)} fill="rgba(255,255,255,0.28)" radius={[5, 5, 0, 0]} />
                      <Bar dataKey="now" name={monthLabel(month)} fill="hsl(47 100% 50%)" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </HubBody>
    </HubPage>
  );
}
