import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
  containerVariants,
} from '@/components/college/primitives';
import {
  useEvidenceTimeline,
  type EvidenceEvent,
  type EvidenceKind,
  type EvidenceStatus,
} from '@/hooks/useEvidenceTimeline';
import { cn } from '@/lib/utils';

/* ==========================================================================
   EvidenceTimelinePage — the Ofsted "prove it" view. One per learner.

   Single timeline of every evidence event (ILP, portfolio, quiz, observation,
   OTJ, note, message, EPA judgement) sorted newest first, filterable by
   kind + window, deep-linked to source surfaces, print-to-PDF for handover.

   Lives at /college/students/:id/evidence. Feeds Compliance Hub's "show me"
   workflow: type a question → land on this page filtered to the right kind.
   ========================================================================== */

const KIND_META: Record<EvidenceKind, { label: string; tone: string; dot: string }> = {
  ilp_goal: {
    label: 'ILP',
    tone: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]',
    dot: 'bg-amber-300',
  },
  portfolio: {
    label: 'Portfolio',
    tone: 'border-blue-300/30 text-blue-200 bg-blue-500/[0.06]',
    dot: 'bg-blue-300',
  },
  quiz: {
    label: 'Quiz',
    tone: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]',
    dot: 'bg-emerald-300',
  },
  observation: {
    label: 'Observation',
    tone: 'border-cyan-300/30 text-cyan-200 bg-cyan-500/[0.06]',
    dot: 'bg-cyan-300',
  },
  otj: {
    label: 'OTJ',
    tone: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]',
    dot: 'bg-emerald-300',
  },
  note: {
    label: 'Note',
    tone: 'border-purple-300/30 text-purple-200 bg-purple-500/[0.06]',
    dot: 'bg-purple-300',
  },
  message: {
    label: 'Message',
    tone: 'border-white/[0.10] text-white/85 bg-white/[0.03]',
    dot: 'bg-white/40',
  },
  epa: {
    label: 'EPA',
    tone: 'border-rose-300/30 text-rose-200 bg-rose-500/[0.06]',
    dot: 'bg-rose-300',
  },
  attendance: {
    label: 'Attendance',
    tone: 'border-white/[0.10] text-white/85 bg-white/[0.03]',
    dot: 'bg-white/40',
  },
  iqa: {
    label: 'IQA',
    tone: 'border-yellow-300/30 text-yellow-200 bg-yellow-500/[0.06]',
    dot: 'bg-yellow-300',
  },
};

const STATUS_DOT: Record<EvidenceStatus, string> = {
  positive: 'bg-emerald-400',
  neutral: 'bg-white/30',
  concern: 'bg-rose-400',
  pending: 'bg-amber-400',
};

const FILTER_KINDS: { key: EvidenceKind | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ilp_goal', label: 'ILP' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'observation', label: 'Observation' },
  { key: 'otj', label: 'OTJ' },
  { key: 'note', label: 'Note' },
  { key: 'message', label: 'Message' },
  { key: 'epa', label: 'EPA' },
  { key: 'iqa', label: 'IQA' },
];

const WINDOWS: { key: number | null; label: string }[] = [
  { key: 30, label: '30d' },
  { key: 90, label: '90d' },
  { key: 365, label: '12mo' },
  { key: null, label: 'All time' },
];

export default function EvidenceTimelinePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useEvidenceTimeline(id ?? null);

  const [kindFilter, setKindFilter] = useState<EvidenceKind | 'all'>('all');
  const [windowDays, setWindowDays] = useState<number | null>(90);

  const filtered = useMemo(() => {
    if (!data) return [];
    const cutoff = windowDays != null ? Date.now() - windowDays * 86_400_000 : -Infinity;
    return data.events.filter((e) => {
      if (kindFilter !== 'all' && e.kind !== kindFilter) return false;
      if (new Date(e.occurred_at).getTime() < cutoff) return false;
      return true;
    });
  }, [data, kindFilter, windowDays]);

  const generated = data?.generated_at
    ? new Date(data.generated_at).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <PageFrame>
      <motion.button
        onClick={() => navigate(`/college/students/${id}`)}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation print:hidden"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to learner
      </motion.button>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Compliance · Evidence pack"
          title={data?.studentName ? `${data.studentName} — evidence chain` : 'Evidence chain'}
          description='Inspector-ready timeline of every evidence point: ILP, portfolio, quizzes, observations, OTJ, notes, messages and EPA judgements. Click any row for source. "Prove it" mode.'
          tone="purple"
          actions={
            <div className="flex items-center gap-3 flex-wrap justify-end print:hidden">
              {generated && (
                <span className="text-[11px] text-white/55 whitespace-nowrap">
                  Generated {generated}
                </span>
              )}
              <button
                onClick={refresh}
                disabled={loading}
                className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <button
                onClick={() => window.print()}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Print evidence pack →
              </button>
            </div>
          }
        />
      </motion.div>

      {error && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200"
        >
          {error}
        </motion.div>
      )}

      {loading && !data && (
        <motion.div
          variants={itemVariants}
          className="py-10 text-center text-[12.5px] text-white/55"
        >
          Loading evidence chain…
        </motion.div>
      )}

      {data && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {/* Filter bar */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-3 py-3 print:hidden"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55 mr-1">
                Window
              </span>
              {WINDOWS.map((w) => (
                <button
                  key={w.label}
                  onClick={() => setWindowDays(w.key)}
                  className={cn(
                    'inline-flex items-center h-7 px-2.5 rounded-md text-[11px] font-semibold transition-colors touch-manipulation',
                    windowDays === w.key
                      ? 'bg-elec-yellow text-black'
                      : 'border border-white/[0.10] text-white/85 hover:bg-white/[0.04]'
                  )}
                >
                  {w.label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-start gap-2">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55 shrink-0 pt-1.5">
                Kind
              </span>
              {/* 10 chips wrap into a 3-row mess on phones. Horizontal-scroll
                  on mobile (snap-start so swipes settle on chip boundaries),
                  flex-wrap on desktop where there's room. */}
              <div
                className="flex items-center gap-1.5 sm:flex-wrap overflow-x-auto -mx-1 px-1 snap-x scrollbar-none"
                role="tablist"
                aria-label="Evidence kind filter"
              >
                {FILTER_KINDS.map((k) => {
                  const count =
                    k.key === 'all' ? data.events.length : data.counts[k.key as EvidenceKind];
                  return (
                    <button
                      key={k.key}
                      type="button"
                      role="tab"
                      aria-selected={kindFilter === k.key}
                      onClick={() => setKindFilter(k.key)}
                      className={cn(
                        'inline-flex items-center shrink-0 gap-1.5 h-7 px-2.5 rounded-md text-[11px] font-semibold transition-colors touch-manipulation snap-start',
                        kindFilter === k.key
                          ? 'bg-elec-yellow text-black'
                          : 'border border-white/[0.10] text-white/85 hover:bg-white/[0.04]'
                      )}
                    >
                      {k.label}
                      <span className="text-[10px] tabular-nums opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
          >
            {filtered.length === 0 ? (
              <div className="py-10 text-center text-[12.5px] text-white/55">
                No evidence in this window. Try widening the window or kind filter.
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.05]">
                {filtered.map((evt) => (
                  <li key={evt.id}>
                    <TimelineRow event={evt} onTap={() => navigate(evt.href)} />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Footer summary */}
          <motion.div
            variants={itemVariants}
            className="text-[10.5px] uppercase tracking-[0.22em] text-white/40 text-center"
          >
            {filtered.length} events · cited from learner record · Ofsted-ready
          </motion.div>
        </motion.div>
      )}
    </PageFrame>
  );
}

function TimelineRow({ event, onTap }: { event: EvidenceEvent; onTap: () => void }) {
  const meta = KIND_META[event.kind];
  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full flex items-start gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
    >
      <div className="flex flex-col items-center gap-0.5 shrink-0 mt-1.5">
        <span className={cn('w-2 h-2 rounded-full', STATUS_DOT[event.status])} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'inline-flex items-center h-5 px-1.5 rounded-md border text-[10.5px] font-semibold whitespace-nowrap',
              meta.tone
            )}
          >
            {meta.label}
          </span>
          <time className="text-[11px] text-white/55 tabular-nums">
            {new Date(event.occurred_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>
        </div>
        <div className="mt-1 text-[14px] font-semibold text-white tracking-tight leading-snug">
          {event.title}
        </div>
        <div className="mt-0.5 text-[12.5px] text-white/85 leading-snug">{event.summary}</div>
        {event.ac_codes && event.ac_codes.length > 0 && (
          <div className="mt-1.5 flex items-center flex-wrap gap-1">
            {event.ac_codes.slice(0, 8).map((ac) => (
              <span
                key={ac}
                className="inline-flex items-center h-5 px-1.5 rounded-md border border-purple-300/30 bg-purple-500/[0.06] text-[10.5px] font-medium text-purple-200 font-mono"
              >
                {ac}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="text-white/40 text-[14px] shrink-0 mt-1.5 print:hidden" aria-hidden="true">
        →
      </span>
    </button>
  );
}
