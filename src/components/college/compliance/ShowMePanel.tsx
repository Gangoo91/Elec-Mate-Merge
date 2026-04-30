import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useEvidenceSearch,
  type SearchEvidenceKind,
  type SearchMatch,
} from '@/hooks/useEvidenceSearch';

/* ==========================================================================
   ShowMePanel — the "show me" search bar + result list. Inspector-day mode.

   Type "show me struggling learners and our response" → AI interprets →
   server runs filtered queries → list of matching learners with evidence
   highlights + deep-links to each learner's full evidence chain.

   ELE-924 / [G4].
   ========================================================================== */

const PROMPTS = [
  'Show me struggling learners and our response',
  'How do we evidence British Values',
  'Anyone behind on OTJ?',
  'Recent safeguarding activity',
  'Apprentices ready for EPA',
  'Show me the IQA chain on assessor decisions',
];

const KIND_TONE: Record<SearchEvidenceKind, string> = {
  ilp_goal: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]',
  portfolio: 'border-blue-300/30 text-blue-200 bg-blue-500/[0.06]',
  quiz: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]',
  observation: 'border-cyan-300/30 text-cyan-200 bg-cyan-500/[0.06]',
  otj: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]',
  note: 'border-purple-300/30 text-purple-200 bg-purple-500/[0.06]',
  message: 'border-white/[0.10] text-white bg-white/[0.03]',
  epa: 'border-rose-300/30 text-rose-200 bg-rose-500/[0.06]',
  iqa: 'border-yellow-300/30 text-yellow-200 bg-yellow-500/[0.06]',
};

const KIND_LABEL: Record<SearchEvidenceKind, string> = {
  ilp_goal: 'ILP',
  portfolio: 'Portfolio',
  quiz: 'Quiz',
  observation: 'Observation',
  otj: 'OTJ',
  note: 'Note',
  message: 'Message',
  epa: 'EPA',
  iqa: 'IQA',
};

const RISK_TONE: Record<string, string> = {
  low: 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]',
  medium: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]',
  high: 'border-orange-300/30 text-orange-200 bg-orange-500/[0.06]',
  critical: 'border-rose-300/30 text-rose-200 bg-rose-500/[0.06]',
};

export function ShowMePanel() {
  const { result, loading, error, lastQuery, search, reset } = useEvidenceSearch();
  const [draft, setDraft] = useState('');

  const handleSubmit = (q?: string) => {
    const target = (q ?? draft).trim();
    if (!target) return;
    void search(target);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-purple-300" aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-purple-300">
            Inspector "show me" search
          </span>
        </div>
        <h2 className="mt-1.5 text-[15px] sm:text-[18px] font-semibold text-white tracking-tight leading-snug">
          Ofsted-style question → evidence chain in seconds
        </h2>
        <p className="mt-1 text-[12px] text-white leading-snug">
          Hits real learner data, scoped to your college.
        </p>

        {/* Search row — stacks vertically on mobile (full-width input then
            full-width submit) so the placeholder never truncates. Side-by-
            side from sm: where there's room. */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-3 flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Escape') {
                  // Esc: clear current draft + any prior result so the next
                  // keystroke starts fresh. Familiar inspector flow.
                  if (draft || result) {
                    e.preventDefault();
                    setDraft('');
                    if (result) reset();
                  }
                }
              }}
              placeholder="Ask anything…"
              aria-label="Inspector evidence search — type a natural-language question"
              autoComplete="off"
              spellCheck={false}
              className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-purple-300/30 touch-manipulation"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || draft.trim().length < 3}
            className={cn(
              'inline-flex items-center justify-center h-11 px-4 rounded-xl text-[13px] font-semibold text-black transition-colors touch-manipulation shrink-0',
              loading || draft.trim().length < 3
                ? 'bg-white/[0.05] text-white'
                : 'bg-purple-300 hover:bg-purple-200'
            )}
          >
            {loading ? 'Searching…' : 'Show me →'}
          </button>
        </form>

        {!result && !loading && (
          <div className="mt-3">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white mb-2">
              Try
            </div>
            {/* Prompts — 2-up grid on mobile so we use the full width
                rather than leaving a long ribbon of dead space to the
                right of each chip; flex-wrap on tablet+. */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-1.5">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setDraft(p);
                    handleSubmit(p);
                  }}
                  className="text-left sm:text-center inline-flex items-center sm:h-7 min-h-[36px] sm:min-h-0 px-3 sm:px-2.5 rounded-xl sm:rounded-full text-[12px] sm:text-[11.5px] font-medium border border-white/[0.10] text-white bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.18] transition-colors touch-manipulation"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 sm:px-5 py-3 border-b border-rose-300/20 bg-rose-500/[0.06] text-[13px] text-rose-200">
          {error}
        </div>
      )}

      {result && (
        <ResultsPanel
          result={result}
          lastQuery={lastQuery}
          loading={loading}
          onReset={() => {
            setDraft('');
            reset();
          }}
        />
      )}

      {loading && !result && (
        <div className="px-4 sm:px-5 py-6 text-center text-[12.5px] text-white">
          Interpreting question + scanning evidence…
        </div>
      )}
    </div>
  );
}

function ResultsPanel({
  result,
  lastQuery,
  loading,
  onReset,
}: {
  result: NonNullable<ReturnType<typeof useEvidenceSearch>['result']>;
  lastQuery: string;
  loading: boolean;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-purple-300">
            Interpreted as
          </div>
          <div className="mt-1 text-[13px] text-white leading-snug">{result.interpretation}</div>
          <div className="mt-1 text-[11px] text-white">You typed: "{lastQuery}"</div>
          <div className="mt-2 flex items-center flex-wrap gap-1.5">
            <FilterChip label={`Focus · ${focusShort(result.focus)}`} tone="purple" />
            {result.risk_filter !== 'any' && (
              <FilterChip label={`Risk · ${riskFilterShort(result.risk_filter)}`} tone="amber" />
            )}
            <FilterChip label={`Window · ${recencyShort(result.recency_days)}`} tone="white" />
            <FilterChip
              label={`${result.matches.length} of ${result.total_candidates} learners`}
              tone="white"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="text-[12px] font-medium text-white hover:text-white transition-colors touch-manipulation disabled:opacity-50 whitespace-nowrap"
        >
          Clear ×
        </button>
      </div>

      {result.matches.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 text-center">
          <p className="text-[13px] text-white leading-relaxed max-w-md mx-auto">
            No learners match this question right now. That's not a gap — try widening the window
            (rephrase as "in the last year") or asking a different angle.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.05]">
          {result.matches.map((m) => (
            <li key={m.learner_id}>
              <MatchRow match={m} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type ChipTone = 'purple' | 'amber' | 'white';

const CHIP_TONE: Record<ChipTone, string> = {
  purple: 'border-purple-300/30 text-purple-200 bg-purple-500/[0.06]',
  amber: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]',
  white: 'border-white/[0.10] text-white bg-white/[0.03]',
};

function FilterChip({ label, tone }: { label: string; tone: ChipTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-5 px-1.5 rounded-md border text-[10.5px] font-semibold uppercase tracking-[0.16em]',
        CHIP_TONE[tone]
      )}
    >
      {label}
    </span>
  );
}

function focusShort(focus: string): string {
  return focus.replace(/_/g, ' ');
}

function riskFilterShort(rf: string): string {
  switch (rf) {
    case 'medium_plus':
      return 'medium+';
    case 'high_plus':
      return 'high+';
    case 'critical_only':
      return 'critical';
    default:
      return 'any';
  }
}

function recencyShort(days: number): string {
  if (days <= 31) return '30 days';
  if (days <= 92) return '90 days';
  if (days <= 200) return '6 months';
  if (days <= 400) return '12 months';
  return `${days} days`;
}

function MatchRow({ match }: { match: SearchMatch }) {
  const navigate = useNavigate();
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/college/students/${match.learner_id}/evidence`)}
      className="w-full flex flex-col items-stretch gap-2 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1 flex items-center flex-wrap gap-2">
          <span className="text-[14px] font-semibold text-white">{match.learner_name}</span>
          {match.cohort_name && (
            <span className="text-[11px] text-white">· {match.cohort_name}</span>
          )}
          {match.risk_level && (
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[10.5px] font-semibold uppercase tracking-[0.16em]',
                RISK_TONE[match.risk_level] ?? 'border-white/[0.10] text-white bg-white/[0.03]'
              )}
            >
              {match.risk_level}
            </span>
          )}
        </div>
        <span className="text-purple-300/80 text-[14px] shrink-0">→</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {match.evidence.map((ev, i) => (
          <div
            key={`${match.learner_id}-${i}`}
            className="flex items-start gap-2 text-[12px] text-white leading-snug"
          >
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold uppercase tracking-[0.16em] shrink-0',
                KIND_TONE[ev.kind]
              )}
            >
              {KIND_LABEL[ev.kind]}
            </span>
            <span className="text-white font-medium">{ev.title}</span>
            <span className="text-white">— {ev.summary}</span>
            <time className="text-white tabular-nums shrink-0 ml-auto">
              {new Date(ev.occurred_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </time>
          </div>
        ))}
      </div>
    </motion.button>
  );
}
