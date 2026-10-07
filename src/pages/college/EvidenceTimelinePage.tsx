import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { Bars } from '@/components/college/assessment/AssessmentKit';
import {
  useEvidenceTimeline,
  type EvidenceEvent,
  type EvidenceKind,
  type EvidenceStatus,
} from '@/hooks/useEvidenceTimeline';
import { cn } from '@/lib/utils';
import { ExportPackSheet } from '@/components/portfolio-export/ExportPackSheet';

/* ==========================================================================
   EvidenceTimelinePage — the Ofsted "prove it" view. One per learner.

   Single timeline of every evidence event (ILP, portfolio, quiz, observation,
   OTJ, note, message, EPA judgement) sorted newest first, filterable by
   kind + window, deep-linked to source surfaces. The evidence pack is the
   PDFMonkey one from portfolio-export-pack (ELE-2017), not a browser print.

   Lives at /college/students/:id/evidence. Feeds Compliance Hub's "show me"
   workflow: type a question → land on this page filtered to the right kind.

   7 Oct 2026: rebuilt on the College kit. Figures, evidence by month and by
   kind as charts, kinds as plain chips (colour now only means state: green
   good, orange a concern, volt waiting).
   ========================================================================== */

const KIND_LABEL: Record<EvidenceKind, string> = {
  ilp_goal: 'Learning plan',
  portfolio: 'Portfolio',
  quiz: 'Quiz',
  observation: 'Observation',
  otj: 'Off-the-job',
  note: 'Note',
  message: 'Message',
  epa: 'EPA',
  attendance: 'Attendance',
  iqa: 'IQA',
};

const STATUS_DOT: Record<EvidenceStatus, string> = {
  positive: 'bg-emerald-400',
  neutral: 'bg-white/50',
  concern: 'bg-orange-500',
  pending: 'bg-elec-yellow',
};

const FILTER_KINDS: Array<EvidenceKind | 'all'> = [
  'all',
  'ilp_goal',
  'portfolio',
  'quiz',
  'observation',
  'otj',
  'note',
  'message',
  'epa',
  'iqa',
];

const WINDOWS: { key: number | null; label: string }[] = [
  { key: 30, label: '30 days' },
  { key: 90, label: '90 days' },
  { key: 365, label: '12 months' },
  { key: null, label: 'All time' },
];

const HELP: PageHelpContent = {
  id: 'college-evidence-timeline',
  title: 'Evidence timeline',
  what: 'Everything on record for one learner, newest first: learning plan goals, portfolio, quizzes, observations, off-the-job hours, notes, messages, EPA verdicts and IQA. It is the page to open when someone asks you to prove it.',
  steps: [
    { title: 'Pick a window', body: 'Ninety days shows by default. Widen to twelve months or all time for a full history.' },
    { title: 'Narrow to one kind', body: 'Tap a kind, or a bar in the chart, to see only that evidence.' },
    { title: 'Open the source', body: 'Each row opens where the evidence lives, so you can show the original.' },
    { title: 'Evidence pack', body: 'Evidence pack makes a PDF with every criterion, decision, file and hour, for a handover or an inspector.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Good', body: 'Completed, passed or signed off.' },
    { swatch: 'bg-elec-yellow', label: 'Waiting', body: 'Submitted or in progress, not yet signed off.' },
    { swatch: 'bg-orange-500', label: 'A concern', body: 'Blocked, failed or flagged.' },
  ],
};

const TOOLTIP = {
  contentStyle: {
    backgroundColor: 'hsl(0 0% 8%)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '0.75rem',
    fontSize: 12,
  },
  labelStyle: { color: 'white' },
  itemStyle: { color: 'white' },
  cursor: { fill: 'rgba(255,255,255,0.04)' },
};

export default function EvidenceTimelinePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useEvidenceTimeline(id ?? null);

  const [kindFilter, setKindFilter] = useState<EvidenceKind | 'all'>('all');
  const [windowDays, setWindowDays] = useState<number | null>(90);
  const [packOpen, setPackOpen] = useState(false);

  const inWindow = useMemo(() => {
    if (!data) return [];
    const cutoff = windowDays != null ? Date.now() - windowDays * 86_400_000 : -Infinity;
    return data.events.filter((e) => new Date(e.occurred_at).getTime() >= cutoff);
  }, [data, windowDays]);

  const filtered = useMemo(
    () => (kindFilter === 'all' ? inWindow : inWindow.filter((e) => e.kind === kindFilter)),
    [inWindow, kindFilter]
  );

  const byStatus = (s: EvidenceStatus) => inWindow.filter((e) => e.status === s).length;

  // Evidence by month, last twelve months, oldest first.
  const months = useMemo(() => {
    const now = new Date();
    const out = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString('en-GB', { month: 'short' }), n: 0 };
    });
    for (const e of data?.events ?? []) {
      if (kindFilter !== 'all' && e.kind !== kindFilter) continue;
      const d = new Date(e.occurred_at);
      const m = out.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m.n += 1;
    }
    return out;
  }, [data, kindFilter]);

  const kindRows = FILTER_KINDS.filter((k): k is EvidenceKind => k !== 'all')
    .map((k) => ({ key: k, label: KIND_LABEL[k], n: inWindow.filter((e) => e.kind === k).length, cls: 'bg-white' }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((r) => ({ ...r, cls: r.key === kindFilter ? 'bg-elec-yellow' : 'bg-white' }));

  const generated = data?.generated_at
    ? new Date(data.generated_at).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;
  const windowLabel = WINDOWS.find((w) => w.key === windowDays)?.label.toLowerCase() ?? 'all time';

  return (
    <HubPage ground="landing">
      <div className="print:hidden">
        <HubMasthead section="College" title="Evidence timeline" onBack={() => navigate(`/college/students/${id}`)} />
      </div>
      <HubBody hidePushPrompt>
        <CollegePageHeader
          eyebrow="Evidence"
          title={data?.studentName ? `${data.studentName}’s evidence` : 'Evidence timeline'}
          description={
            <>
              Every evidence point on record, newest first, each linked to its source.
              {generated && <span className="block text-[12.5px]">Gathered {generated}</span>}
            </>
          }
          help={HELP}
          actions={
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button type="button" onClick={refresh} disabled={loading} className={COLLEGE_BTN}>
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              {data?.studentUserId ? (
                <button type="button" onClick={() => setPackOpen(true)} className={COLLEGE_BTN_PRIMARY}>
                  Evidence pack PDF
                </button>
              ) : null}
            </div>
          }
        />

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
            <p className="text-[13.5px] text-white">Couldn’t load the evidence: {error}</p>
            <button type="button" onClick={refresh} className="h-11 px-3 text-[13px] font-semibold text-elec-yellow">
              Try again
            </button>
          </div>
        )}

        {loading && !data && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[92px] animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-3xl bg-white/[0.04]" />
          </div>
        )}

        {data && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 sm:space-y-10">
            <CollegeStats
              items={[
                { label: 'Evidence points', value: String(inWindow.length), sub: `In the last ${windowLabel}`.replace('last all time', 'whole record') },
                { label: 'Good', value: String(byStatus('positive')), sub: 'Completed or signed off', good: byStatus('positive') > 0 },
                { label: 'Waiting', value: String(byStatus('pending')), sub: 'Not signed off yet' },
                { label: 'Concerns', value: String(byStatus('concern')), sub: 'Blocked, failed or flagged', warn: byStatus('concern') > 0 },
              ]}
            />

            <div className="grid grid-cols-1 items-stretch gap-4 print:hidden lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <motion.section variants={itemVariants} className={cn(COLLEGE_CARD, 'h-full')}>
                <CollegeSectionTitle
                  title="Evidence by month"
                  sub={kindFilter === 'all' ? 'Last 12 months, every kind' : `Last 12 months, ${KIND_LABEL[kindFilter].toLowerCase()} only`}
                />
                <div className="-mx-2 mt-4 h-48">
                  <ResponsiveContainer>
                    <BarChart data={months} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="label" tick={{ fill: 'white', fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
                      <YAxis allowDecimals={false} tick={{ fill: 'white', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                      <Tooltip {...TOOLTIP} formatter={(v: number) => [v, 'Evidence points']} />
                      <Bar dataKey="n" fill="hsl(47 100% 50%)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>
              <motion.section variants={itemVariants} className={cn(COLLEGE_CARD, 'h-full')}>
                <CollegeSectionTitle title="By kind" sub={`In the ${windowLabel === 'all time' ? 'whole record' : `last ${windowLabel}`}. Tap to filter.`} />
                <div className="mt-4">
                  {kindRows.length === 0 ? (
                    <p className="text-[13px] text-white">Nothing in this window.</p>
                  ) : (
                    <Bars
                      rows={kindRows}
                      labelWidth="7.5rem"
                      onPick={(k) => setKindFilter(kindFilter === k ? 'all' : (k as EvidenceKind))}
                    />
                  )}
                </div>
              </motion.section>
            </div>

            <section className="space-y-4">
              <CollegeSectionTitle title="Timeline" sub={`${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}, newest first`} />
              <div className="space-y-3 print:hidden">
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Window">
                  {WINDOWS.map((w) => (
                    <button key={w.label} type="button" aria-pressed={windowDays === w.key} onClick={() => setWindowDays(w.key)} className={chipCn(windowDays === w.key)}>
                      {w.label}
                    </button>
                  ))}
                </div>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Evidence kind filter">
                  {FILTER_KINDS.map((k) => {
                    const count = k === 'all' ? inWindow.length : inWindow.filter((e) => e.kind === k).length;
                    return (
                      <button key={k} type="button" role="tab" aria-selected={kindFilter === k} onClick={() => setKindFilter(k)} className={chipCn(kindFilter === k)}>
                        {k === 'all' ? 'Everything' : KIND_LABEL[k]} <span className="tabular-nums">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {filtered.length === 0 ? (
                <CollegeEmpty
                  title="No evidence in this window"
                  body="Widen the window to twelve months or all time, or pick Everything."
                  action={
                    windowDays !== null ? (
                      <button type="button" onClick={() => setWindowDays(null)} className={COLLEGE_BTN}>
                        Show all time
                      </button>
                    ) : undefined
                  }
                />
              ) : (
                <ul className={COLLEGE_LIST}>
                  {filtered.map((evt) => (
                    <li key={evt.id}>
                      <TimelineRow event={evt} onTap={() => navigate(evt.href)} />
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-center text-[12px] text-white">
                {filtered.length} entries, each read from the learner’s record
              </p>
            </section>
          </motion.div>
        )}
      </HubBody>
      {data?.studentUserId ? (
        <ExportPackSheet
          open={packOpen}
          onOpenChange={setPackOpen}
          learnerUserId={data.studentUserId}
          learnerName={data.studentName ?? undefined}
          mode="staff"
          focus="evidence_pack"
        />
      ) : null}
    </HubPage>
  );
}

function TimelineRow({ event, onTap }: { event: EvidenceEvent; onTap: () => void }) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="flex w-full items-start gap-4 px-4 py-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
    >
      <time className="w-14 shrink-0 pt-0.5 text-[12px] font-semibold leading-tight tabular-nums text-white">
        {new Date(event.occurred_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        <span className="block font-normal">{new Date(event.occurred_at).getFullYear()}</span>
      </time>
      <span className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[event.status])} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[14.5px] font-semibold leading-snug text-white">{event.title}</span>
          <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
            {KIND_LABEL[event.kind]}
          </span>
        </span>
        {event.summary && <span className="mt-0.5 block text-[13px] leading-snug text-white">{event.summary}</span>}
        {event.ac_codes && event.ac_codes.length > 0 && (
          <span className="mt-1.5 flex flex-wrap items-center gap-1">
            {event.ac_codes.slice(0, 8).map((ac) => (
              <span key={ac} className="inline-flex h-6 items-center rounded-md border border-white/[0.16] px-1.5 font-mono text-[11px] text-white">
                {ac}
              </span>
            ))}
          </span>
        )}
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white print:hidden" aria-hidden="true" />
    </button>
  );
}
