import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  useJobIdeasForGaps,
  type JobIdea,
  type EvidenceTypeCode,
} from '@/hooks/useJobIdeasForGaps';

/* ==========================================================================
   JobIdeasPanel — proactive AI-generated job ideas for an apprentice's
   current AC gaps. Used in two contexts:

     - Apprentice's "What can I do next?" card (own student_id)
     - Assessor's AC locker drawer "Try this on a job" panel
       (assessor passes the learner's student_id; same edge fn authorises)

   The panel is collapsed by default — calling the AI costs a request, so
   the user explicitly chooses to generate.

   ELE-942 / Assessor pack — Slice 1.
   ========================================================================== */

const TYPE_LABEL: Record<EvidenceTypeCode, string> = {
  photo: 'Photo',
  document: 'Document',
  certificate: 'Certificate',
  test_result: 'Test result',
  witness: 'Witness statement',
  reflection: 'Reflection',
  work_log: 'Work log',
  video: 'Video',
  drawing: 'Drawing',
  calculation: 'Calculation',
};

const TYPE_TONE: Record<EvidenceTypeCode, string> = {
  photo: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  document: 'border-white/[0.16] bg-white/[0.04] text-white',
  certificate: 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow',
  test_result: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
  witness: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
  reflection: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300',
  work_log: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300',
  video: 'border-rose-500/30 bg-rose-500/[0.08] text-rose-300',
  drawing: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300',
  calculation: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
};

const DIFFICULTY_LABEL: Record<JobIdea['difficulty'], string> = {
  novice: 'Novice — early apprentice',
  developing: 'Developing — mid-programme',
  competent: 'Competent — late programme',
};

const DIFFICULTY_TONE: Record<JobIdea['difficulty'], string> = {
  novice: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  developing: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300',
  competent: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
};

interface Props {
  studentId: string;
  /** Optional: limit AI focus to these AC codes (used in the AC locker
      drawer where we already know the AC the assessor is looking at). */
  acCodesFocus?: string[];
  /** Headline. Defaults to "What can I do next?" — assessor surface might
      want to pass "Try this on a job" instead. */
  title?: string;
  /** Whether the panel is visually styled as a primary card on a page (
      bordered + padded) or as an inline section inside another sheet. */
  variant?: 'card' | 'inline';
  /** Optional callback fired when an apprentice taps "Use this idea" —
      future Slice 2 will hook this to a capture sheet. */
  onUseIdea?: (idea: JobIdea) => void;
}

export function JobIdeasPanel({
  studentId,
  acCodesFocus,
  title = 'What can I do next?',
  variant = 'card',
  onUseIdea,
}: Props) {
  const { data, loading, error, generate, reset } = useJobIdeasForGaps();
  const [expandedIdx, setExpandedIdx] = useState<Set<number>>(new Set());

  const handleGenerate = (opts?: { force?: boolean }) => {
    void generate({ student_id: studentId, ac_codes_focus: acCodesFocus, count: 4 }, opts);
  };

  const toggle = (i: number) => {
    setExpandedIdx((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const ideas = data?.ideas ?? [];
  const hasResults = ideas.length > 0;
  const noGaps = data?.note === 'no_gaps';
  const noCoverage = data?.note === 'no_coverage_seeded';

  const wrapperClass = cn(
    variant === 'card'
      ? 'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-5'
      : 'rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] px-4 py-3.5'
  );

  return (
    <div className={wrapperClass}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
            Job ideas
          </div>
          <h3
            className={cn(
              'mt-1 font-semibold text-white tracking-tight leading-tight',
              variant === 'card' ? 'text-[18px] sm:text-[20px]' : 'text-[14px]'
            )}
          >
            {title}
          </h3>
          {variant === 'card' && (
            <p className="mt-1 text-[12px] text-white max-w-prose">
              AI looks at your gaps and suggests jobs you could plan to do at work — each one
              hits multiple criteria. Pick one, capture the evidence on site, upload it.
            </p>
          )}
        </div>
        {!hasResults && !noGaps && !noCoverage && (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={cn(
              'shrink-0 h-10 px-4 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
              loading
                ? 'bg-white/[0.06] text-white opacity-60 cursor-wait'
                : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
            )}
          >
            {loading ? 'Thinking…' : 'Suggest jobs →'}
          </button>
        )}
        {hasResults && (
          <button
            type="button"
            onClick={() => {
              reset();
              setExpandedIdx(new Set());
            }}
            className="shrink-0 text-[11.5px] font-medium text-white hover:text-white touch-manipulation"
          >
            Reset
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-rose-300/30 bg-rose-500/[0.06] px-3 py-2 text-[12px] text-rose-200">
          {error}
        </div>
      )}

      {noGaps && (
        <div className="mt-3 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-2.5 text-[12.5px] text-emerald-200">
          No current gaps — every AC has at least some evidence. Focus on building stronger
          examples for ACs that aren't yet IQA-confirmed.
        </div>
      )}
      {noCoverage && (
        <div className="mt-3 rounded-lg border border-white/[0.10] bg-white/[0.02] px-3 py-2.5 text-[12.5px] text-white">
          This learner doesn't have a coverage map yet — set their course on the identity strip.
        </div>
      )}

      {loading && !hasResults && (
        <div className="mt-4 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-white/[0.04] border border-white/[0.06] animate-pulse"
            />
          ))}
        </div>
      )}

      {hasResults && (
        <div className="mt-4 space-y-3">
          {data?.meta && (
            <div className="text-[11px] text-white">
              Across {data.meta.gaps_total} current gap
              {data.meta.gaps_total === 1 ? '' : 's'} · qualification {data.meta.qualification_code}
            </div>
          )}
          {ideas.map((idea, i) => (
            <IdeaCard
              key={i}
              idea={idea}
              expanded={expandedIdx.has(i)}
              onToggle={() => toggle(i)}
              onUseIdea={onUseIdea ? () => onUseIdea(idea) : undefined}
            />
          ))}
          <button
            type="button"
            onClick={() => handleGenerate({ force: true })}
            disabled={loading}
            className="w-full h-10 rounded-lg border border-white/[0.10] hover:border-white/[0.25] text-[12px] font-medium text-white transition-colors touch-manipulation"
          >
            {loading ? 'Thinking…' : 'Suggest different jobs'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────── one idea card ───────────────── */

function IdeaCard({
  idea,
  expanded,
  onToggle,
  onUseIdea,
}: {
  idea: JobIdea;
  expanded: boolean;
  onToggle: () => void;
  onUseIdea?: () => void;
}) {
  const primaryAcs = idea.ac_coverage.filter((a) => a.strength === 'primary');
  const partialAcs = idea.ac_coverage.filter((a) => a.strength === 'partial');
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-4 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-semibold text-white leading-snug">{idea.title}</div>
            <div className="mt-1 text-[12px] text-white leading-snug italic">
              {idea.when_prompt}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
              <span
                className={cn(
                  'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                  DIFFICULTY_TONE[idea.difficulty]
                )}
              >
                {DIFFICULTY_LABEL[idea.difficulty]}
              </span>
              {idea.estimated_minutes && (
                <span className="text-[10.5px] text-white tabular-nums">
                  ~{idea.estimated_minutes} min
                </span>
              )}
              <span className="text-[10.5px] text-emerald-300 tabular-nums">
                {primaryAcs.length} primary
              </span>
              {partialAcs.length > 0 && (
                <span className="text-[10.5px] text-amber-300 tabular-nums">
                  {partialAcs.length} partial
                </span>
              )}
            </div>
          </div>
          <span
            className={cn(
              'shrink-0 text-white text-[14px] transition-transform pt-1',
              expanded ? 'rotate-180' : ''
            )}
            aria-hidden
          >
            ▾
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 py-3.5 border-t border-white/[0.06] space-y-4">
          {/* Scenario */}
          <p className="text-[13px] text-white leading-relaxed">{idea.scenario}</p>

          {/* AC coverage */}
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white mb-1.5">
              ACs this hits
            </div>
            <ul className="space-y-1.5">
              {idea.ac_coverage.map((a) => (
                <li
                  key={a.ac_code}
                  className="flex items-start gap-2 text-[12px] text-white leading-snug"
                >
                  <span
                    className={cn(
                      'inline-flex items-center h-5 px-1.5 rounded border text-[10px] font-mono font-semibold tabular-nums shrink-0 mt-0.5',
                      a.strength === 'primary'
                        ? 'border-emerald-500/30 bg-emerald-500/[0.10] text-emerald-200'
                        : 'border-amber-500/30 bg-amber-500/[0.06] text-amber-200'
                    )}
                  >
                    {a.ac_code}
                  </span>
                  <span className="flex-1">{a.rationale}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence checklist */}
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white mb-1.5">
              Evidence to capture
            </div>
            <ul className="space-y-1.5">
              {idea.evidence_checklist.map((c, ci) => (
                <li
                  key={ci}
                  className="flex items-start gap-2.5 text-[12.5px] text-white leading-snug"
                >
                  <span
                    className={cn(
                      'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em] shrink-0 mt-0.5',
                      TYPE_TONE[c.type] ?? 'border-white/[0.16] bg-white/[0.04] text-white'
                    )}
                  >
                    {TYPE_LABEL[c.type] ?? c.type}
                  </span>
                  <span className="flex-1">
                    {c.label}
                    {c.required && (
                      <span className="ml-1.5 text-rose-300 text-[10px] font-semibold">
                        REQUIRED
                      </span>
                    )}
                    {c.needs_witness_signature && (
                      <span className="ml-1.5 text-purple-300 text-[10px] font-semibold">
                        SIGNATURE
                      </span>
                    )}
                    {c.guidance && (
                      <div className="mt-0.5 text-[11px] text-white/65 italic">
                        {c.guidance}
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {onUseIdea && (
            <button
              type="button"
              onClick={onUseIdea}
              className="w-full h-10 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
            >
              Use this idea →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
