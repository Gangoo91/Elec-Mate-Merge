import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useEvidenceSearch,
  type SearchEvidenceKind,
  type SearchMatch,
} from '@/hooks/useEvidenceSearch';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { QBTN, QBTN_PRIMARY, QCARD } from '@/components/college/quality/QualityHubKit';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import {
  InspectorRecordAnswer,
  inspectorQuestions,
  type InspectorQuestionKey,
} from '@/components/college/compliance/InspectorRecordAnswer';
import { useCollegeNation } from '@/hooks/college/useCollegeNation';

/* ==========================================================================
   ShowMePanel: ask an inspection question, see the evidence on record.

   The question goes to ai-evidence-search: a model turns it into a filter
   (focus, risk, time window), the server runs ordinary queries over the
   college's own records, and each matching learner comes back with the
   records that answered it and a link to their evidence. ELE-924 / [G4].

   8 Oct 2026: on the College Hub kit. No purple (not in the palette): the
   landing card surface, chips by border and text only, one solid yellow
   button, all text white. The copy says plainly what it does, with the
   "uses AI" marker because the question is read by a model.

   10 Oct 2026 (ELE-1910): the six questions inspectors ask in an electrical
   department are answered from the record, not by the model
   (InspectorRecordAnswer, college_inspection_answers): co-planning with
   employers, off-the-job hours, under-18s, English and maths, progress
   against the standard, EPA readiness. The free-text search stays for
   anything else, marked as using AI. Every evidence card in its results now
   opens the part of the learner's record it came from.
   ========================================================================== */

const PROMPTS = [
  'Show me struggling learners and our response',
  'How do we evidence British values?',
  'Show me the IQA chain on assessor decisions',
];

/** Where each kind of evidence lives on the learner's record. */
const KIND_AREA: Record<SearchEvidenceKind, string> = {
  ilp_goal: 'ilp',
  portfolio: 'portfolio',
  quiz: 'quizzes',
  observation: 'observations',
  otj: 'otj',
  note: 'notes',
  message: 'notes',
  epa: 'epa',
  iqa: 'assess',
};

/** Evidence kinds are labels, not states: one neutral chip for all. */
const KIND_CHIP = 'border-white/[0.18] text-white';

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
  low: 'border-emerald-400/60 text-emerald-300',
  medium: 'border-white/[0.18] text-white',
  high: 'border-orange-400/60 text-orange-300',
  critical: 'border-orange-400/60 text-orange-300',
};

export function ShowMePanel() {
  const { result, loading, error, lastQuery, search, reset } = useEvidenceSearch();
  const { collegeId } = useCollegeCan();
  const { terms } = useCollegeNation(collegeId);
  const [draft, setDraft] = useState('');
  const [recordQ, setRecordQ] = useState<InspectorQuestionKey | null>(null);

  const handleSubmit = (q?: string) => {
    const target = (q ?? draft).trim();
    if (!target) return;
    setRecordQ(null);
    void search(target);
  };

  return (
    <div className={cn(QCARD, 'overflow-hidden p-0 sm:p-0')}>
      <div className="border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-white">
          Ask an inspection question
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-white">
          The six questions inspectors ask in an electrical department, answered from your own
          records, learner by learner. Tap any line to open the record behind it.
        </p>
        {collegeId && (
          <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
            {inspectorQuestions(terms).map((q) => (
              <button
                key={q.key}
                type="button"
                onClick={() => {
                  reset();
                  setRecordQ(q.key);
                }}
                aria-pressed={recordQ === q.key}
                data-testid={`inspector-q-${q.key}`}
                className={cn(
                  'inline-flex min-h-[44px] items-center rounded-xl border px-3 py-2 text-left text-[13px] font-medium text-white transition-colors touch-manipulation',
                  recordQ === q.key
                    ? 'border-elec-yellow'
                    : 'border-white/[0.14] hover:border-white/[0.3]'
                )}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <h3 className="text-[14px] font-semibold text-white">Or ask your own</h3>
          <UsesAi />
        </div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          A model reads your question and turns it into a filter; the matches are your own records.
        </p>

        {/* Search row: stacked on a phone (field, then a full-width button),
            side by side from sm: up. */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-3 flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1 relative">
            <Search
              className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              aria-hidden="true"
            />
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Escape') {
                  // Escape clears the draft and any result, to start again.
                  if (draft || result) {
                    e.preventDefault();
                    setDraft('');
                    if (result) reset();
                  }
                }
              }}
              placeholder="Type a question about your learners"
              aria-label="Ask an inspection question"
              autoComplete="off"
              spellCheck={false}
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || draft.trim().length < 3}
            className={cn(QBTN_PRIMARY, 'shrink-0')}
          >
            {loading ? 'Searching…' : 'Show me'}
          </button>
        </form>

        {!result && !loading && !recordQ && (
          <div className="mt-3">
            <p className="mb-2 text-[13px] font-semibold text-white">Try one of these</p>
            {/* Example questions: full-width rows on a phone, chips from sm: up. */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-1.5">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setDraft(p);
                    handleSubmit(p);
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-white/[0.14] px-3 text-left text-[13px] font-medium text-white transition-colors touch-manipulation hover:border-white/[0.3] sm:rounded-full"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="border-b border-white/[0.06] px-4 py-3 text-[13px] text-orange-300 sm:px-5">
          {error}
        </div>
      )}

      {recordQ && collegeId && !result && (
        <InspectorRecordAnswer
          collegeId={collegeId}
          question={recordQ}
          terms={terms}
          onClear={() => setRecordQ(null)}
        />
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
          Reading the question and searching your records…
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
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-white">Read as</p>
          <div className="mt-1 text-[13px] text-white leading-snug">{result.interpretation}</div>
          <div className="mt-1 text-[12px] text-white">You asked: &ldquo;{lastQuery}&rdquo;</div>
          <div className="mt-2 flex items-center flex-wrap gap-1.5">
            <FilterChip label={`Focus: ${focusShort(result.focus)}`} />
            {result.risk_filter !== 'any' && (
              <FilterChip label={`Risk: ${riskFilterShort(result.risk_filter)}`} />
            )}
            <FilterChip label={`Last ${recencyShort(result.recency_days)}`} />
            <FilterChip label={`${result.matches.length} of ${result.total_candidates} learners`} />
          </div>
        </div>
        <button type="button" onClick={onReset} disabled={loading} className={QBTN}>
          Clear
        </button>
      </div>

      {result.matches.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 text-center">
          <p className="text-[13px] text-white leading-relaxed max-w-md mx-auto">
            No learners match this question right now. Try a longer window (add &ldquo;in the last
            year&rdquo;) or ask it another way.
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

function FilterChip({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-semibold text-white">
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
      return 'medium or higher';
    case 'high_plus':
      return 'high or critical';
    case 'critical_only':
      return 'critical';
    default:
      return 'any';
  }
}

function recencyShort(days: number): string {
  if (days <= 31) return '30 days';
  if (days <= 92) return '90 days';
  if (days <= 200) return 'six months';
  if (days <= 400) return '12 months';
  return `${days} days`;
}

function MatchRow({ match }: { match: SearchMatch }) {
  const navigate = useNavigate();
  const learnerHref = (area?: string) =>
    `/college?section=student360&studentId=${encodeURIComponent(match.learner_id)}${area ? `#${area}` : ''}`;
  return (
    <div className="flex w-full flex-col items-stretch gap-2 px-4 py-3.5 sm:px-5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        onClick={() => navigate(`/college/students/${match.learner_id}/evidence`)}
        className="-mx-2 flex min-h-[44px] items-start justify-between gap-3 rounded-lg px-2 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
      >
        <div className="min-w-0 flex-1 flex items-center flex-wrap gap-2">
          <span className="text-[14px] font-semibold text-white">{match.learner_name}</span>
          {match.cohort_name && (
            <span className="text-[12px] text-white">· {match.cohort_name}</span>
          )}
          {match.risk_level && (
            <span
              className={cn(
                'inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-semibold',
                RISK_TONE[match.risk_level] ?? 'border-white/[0.18] text-white'
              )}
            >
              {match.risk_level.charAt(0).toUpperCase() + match.risk_level.slice(1)} risk
            </span>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-elec-yellow">
          Evidence
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </motion.button>

      {/* One card per record (ELE-1087); each opens where it lives (ELE-1910). */}
      <div className="flex flex-col gap-1.5">
        {match.evidence.map((ev, i) => (
          <button
            type="button"
            key={`${match.learner_id}-${i}`}
            onClick={() => navigate(learnerHref(KIND_AREA[ev.kind]))}
            className="rounded-xl border border-white/[0.08] px-3 py-2 text-left transition-colors touch-manipulation hover:border-white/[0.2]"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[12px] font-semibold',
                  KIND_CHIP
                )}
              >
                {KIND_LABEL[ev.kind]}
              </span>
              <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-white sm:truncate">
                {ev.title}
              </span>
              <time className="shrink-0 text-[12px] tabular-nums text-white">
                {new Date(ev.occurred_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </time>
            </div>
            {ev.summary && (
              <div className="mt-1 text-[12.5px] leading-snug text-white">
                {ev.summary.replace(/_/g, ' ')}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
