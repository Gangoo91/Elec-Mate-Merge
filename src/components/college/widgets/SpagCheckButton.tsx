import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useSpagCheck, type SpagSourceKind, type SpagLevel } from '@/hooks/useSpagCheck';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/* ==========================================================================
   SpagCheckButton — one-tap SpaG check on apprentice text. Pluggable into
   OTJ inbox, portfolio review, ILP reflection, anywhere a tutor sees
   apprentice-written prose that needs to land for ESFA / awarding-body
   evidence.

   ELE-895 (A3).

   Hub language: the level is a word, not a pill. "Developing" is the one
   that stays red because it is the one that needs work. The compact button
   used to build its classes as `border-${tone}-500/30` — Tailwind never
   generates a class it can't see at build time, so the coloured result
   state was silently unstyled anyway.
   ========================================================================== */

interface Props {
  text: string;
  sourceKind: SpagSourceKind;
  sourceId?: string;
  studentId?: string;
  studentName?: string;
  /** When true, fires the check immediately on mount (use for inbox rows). */
  autoCheck?: boolean;
  /** Persist the check to college_spag_checks? Defaults to true. */
  persist?: boolean;
  /** Render mode — compact (badge only) or full (score + issues collapsible). */
  variant?: 'compact' | 'full';
  /** Optional className applied to the outer container. */
  className?: string;
}

const LEVEL_LABEL: Record<SpagLevel, string> = {
  distinction: 'Distinction',
  merit: 'Merit',
  pass: 'Pass',
  developing: 'Developing',
};

function LevelWord({ level }: { level: SpagLevel }) {
  return (
    <span className={cn('font-semibold', level === 'developing' ? 'text-red-300' : 'text-white')}>
      {LEVEL_LABEL[level]}
    </span>
  );
}

const CHECK_BUTTON =
  'inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.18] px-3 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] disabled:opacity-60';

export function SpagCheckButton({
  text,
  sourceKind,
  sourceId,
  studentId,
  studentName,
  persist = true,
  variant = 'full',
  className,
}: Props) {
  const { check, checking, result, error } = useSpagCheck();
  const [expanded, setExpanded] = useState(false);

  const hasText = text.trim().length >= 20;

  const handleCheck = async () => {
    if (!hasText) return;
    try {
      await check({
        text: text.trim(),
        sourceKind,
        sourceId,
        studentId,
        studentName,
        persist,
      });
      if (variant === 'full') setExpanded(true);
    } catch (_e) {
      /* error captured in hook */
    }
  };

  if (!hasText) return null;

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleCheck}
        disabled={checking}
        className={cn(CHECK_BUTTON, result && 'text-white', className)}
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        {checking ? (
          'Checking…'
        ) : result ? (
          <span className="tabular-nums">
            SpaG {result.spag_score} · <LevelWord level={result.level_descriptor} />
          </span>
        ) : (
          'Check SpaG'
        )}
      </button>
    );
  }

  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl border border-elec-yellow/35',
        CARD_SURFACE,
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Spelling &amp; grammar
        </h3>
        {result && (
          <span className="text-[12px] font-semibold tabular-nums text-white">
            {result.spag_score} · <LevelWord level={result.level_descriptor} />
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.10] px-4 py-2.5 sm:px-5">
        <button type="button" onClick={handleCheck} disabled={checking} className={CHECK_BUTTON}>
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {checking ? 'Checking SpaG…' : result ? 'Re-check SpaG' : 'Check spelling & grammar'}
        </button>
        {result && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="border-t border-white/[0.10] px-4 py-3 text-[12px] font-semibold text-red-300 sm:px-5">
          {error}
        </p>
      )}

      {result && expanded && (
        <>
          {result.overall_feedback && (
            <p className="border-t border-white/[0.10] px-4 py-3.5 text-[12.5px] leading-relaxed text-white sm:px-5">
              {result.overall_feedback}
            </p>
          )}
          {result.issues.length > 0 ? (
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {result.issues.map((issue, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    aria-hidden="true"
                    className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold leading-tight text-white">
                      <span className="font-mono line-through">{issue.original}</span>
                      {' → '}
                      <span className="font-mono">{issue.suggestion}</span>
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white">
                      <span className="capitalize">{issue.kind}</span> · {issue.explanation}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-t border-white/[0.10] px-4 py-3.5 text-[12.5px] text-white sm:px-5">
              No material SpaG issues.
            </p>
          )}
        </>
      )}
    </section>
  );
}
