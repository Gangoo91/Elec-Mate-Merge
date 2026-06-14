import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useSpagCheck, type SpagSourceKind, type SpagLevel } from '@/hooks/useSpagCheck';
import { Pill, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SpagCheckButton — one-tap SpaG check on apprentice text. Pluggable into
   OTJ inbox, portfolio review, ILP reflection, anywhere a tutor sees
   apprentice-written prose that needs to land for ESFA / awarding-body
   evidence.

   ELE-895 (A3).
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

const LEVEL_TONE: Record<SpagLevel, Tone> = {
  distinction: 'emerald',
  merit: 'cyan',
  pass: 'amber',
  developing: 'red',
};

const LEVEL_LABEL: Record<SpagLevel, string> = {
  distinction: 'Distinction',
  merit: 'Merit',
  pass: 'Pass',
  developing: 'Developing',
};

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
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold touch-manipulation transition-colors',
          result
            ? `border-${LEVEL_TONE[result.level_descriptor]}-500/30 bg-${LEVEL_TONE[result.level_descriptor]}-500/10 text-white`
            : 'border-elec-yellow/30 bg-elec-yellow/10 text-elec-yellow hover:bg-elec-yellow/20',
          'disabled:opacity-40',
          className
        )}
      >
        <Sparkles className="h-3 w-3" />
        {checking
          ? 'Checking…'
          : result
            ? `SpaG ${result.spag_score} · ${LEVEL_LABEL[result.level_descriptor]}`
            : 'Check SpaG'}
      </button>
    );
  }

  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/[0.03] p-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCheck}
          disabled={checking}
          className="inline-flex items-center gap-1.5 rounded-full border border-elec-yellow/30 bg-elec-yellow/10 px-3 py-1.5 text-[11px] font-semibold text-elec-yellow hover:bg-elec-yellow/20 disabled:opacity-40 touch-manipulation"
        >
          <Sparkles className="h-3 w-3" />
          {checking ? 'Checking SpaG…' : result ? 'Re-check SpaG' : 'Check spelling & grammar'}
        </button>
        {result && (
          <div className="flex items-center gap-2">
            <Pill tone={LEVEL_TONE[result.level_descriptor]}>
              {result.spag_score} · {LEVEL_LABEL[result.level_descriptor]}
            </Pill>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-white/50 hover:text-white touch-manipulation"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-300">{error}</div>
      )}

      {result && expanded && (
        <div className="mt-3 space-y-3 border-t border-white/10 pt-3">
          {result.overall_feedback && (
            <p className="text-[13px] text-white/80 leading-relaxed">{result.overall_feedback}</p>
          )}
          {result.issues.length > 0 ? (
            <ul className="space-y-2">
              {result.issues.map((issue, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-white/10 bg-black/20 p-2.5 text-[12px]"
                >
                  <div className="flex items-center gap-2">
                    <Pill
                      tone={
                        issue.kind === 'spelling'
                          ? 'red'
                          : issue.kind === 'grammar'
                            ? 'amber'
                            : 'blue'
                      }
                    >
                      {issue.kind}
                    </Pill>
                    <span className="font-mono text-white/80 line-through decoration-red-400/60">
                      {issue.original}
                    </span>
                    <span className="text-white/70">→</span>
                    <span className="font-mono text-emerald-300">{issue.suggestion}</span>
                  </div>
                  <div className="mt-1 text-white/60">{issue.explanation}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-[12px] text-white/50">No material SpaG issues.</div>
          )}
        </div>
      )}
    </div>
  );
}
