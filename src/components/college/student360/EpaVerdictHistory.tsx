import { useState } from 'react';
import { ChevronDown, User2, ShieldCheck, Bot, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type { EpaJudgement, EpaSource } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   EpaVerdictHistory — every prior judgement, grouped by day.
   Most recent first. Shows the supersede chain.

   Collapsed by default: the current verdicts are already on the cards
   above, so this is the audit trail, not the headline. The card still
   renders when there is nothing in it, saying so — a section that vanished
   made the page look as if the history had failed to load.
   ========================================================================== */

const SOURCE_META: Record<EpaSource, { label: string; icon: LucideIcon }> = {
  learner: { label: 'Learner', icon: User2 },
  tutor: { label: 'Tutor', icon: ShieldCheck },
  ai: { label: 'AI', icon: Bot },
  employer: { label: 'Employer', icon: User2 },
};

const VERDICT_LABEL: Record<string, string> = {
  ready: 'Ready',
  almost: 'Almost',
  not_yet: 'Not yet',
  refer: 'Refer',
};

const CHIP =
  'inline-flex h-5 items-center rounded-md border border-white/[0.14] px-1.5 text-[10px] font-semibold text-white';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export function EpaVerdictHistory({
  current,
  past,
}: {
  current: { learner: EpaJudgement | null; tutor: EpaJudgement | null; ai: EpaJudgement | null };
  past: EpaJudgement[];
}) {
  const [open, setOpen] = useState(false);

  // Combine current + past, sort by created_at desc
  const all = [
    ...([current.learner, current.tutor, current.ai].filter(Boolean) as EpaJudgement[]),
    ...past,
  ].sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));

  // Group by date for cleaner timeline
  const grouped = new Map<string, EpaJudgement[]>();
  for (const j of all) {
    const day = j.created_at?.slice(0, 10) ?? 'unknown';
    const list = grouped.get(day) ?? [];
    list.push(j);
    grouped.set(day, list);
  }

  const count = `${all.length} entr${all.length === 1 ? 'y' : 'ies'}`;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={all.length === 0}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] disabled:hover:bg-transparent sm:px-5"
      >
        <div className="text-[13px] font-semibold text-white">
          Verdict history
          <span className="ml-2 font-normal tabular-nums">
            {all.length === 0 ? 'Nothing recorded yet' : count}
          </span>
        </div>
        {all.length > 0 && (
          <ChevronDown
            className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        )}
      </button>
      {open && all.length > 0 && (
        <div className="space-y-4 border-t border-white/[0.10] px-4 pb-5 pt-4 sm:px-5">
          {Array.from(grouped.entries()).map(([day, items]) => (
            <div key={day}>
              <div className="mb-2 text-[12px] font-semibold tabular-nums text-white">
                {formatDate(day)}
              </div>
              <ol className="relative space-y-3 border-l border-white/[0.25] pl-4">
                {items.map((j) => {
                  const meta = SOURCE_META[j.source as EpaSource];
                  const Icon = meta.icon;
                  return (
                    <li key={j.id} className="relative">
                      {/* Timeline node — volt ring for the current verdict,
                          neutral for the superseded ones. */}
                      <span
                        className={cn(
                          'absolute -left-[25px] top-[1px] inline-flex h-4 w-4 items-center justify-center rounded-full border bg-elec-dark',
                          j.is_current ? 'border-elec-yellow' : 'border-white/[0.25]'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-2.5 w-2.5',
                            j.is_current ? 'text-elec-yellow' : 'text-white'
                          )}
                          strokeWidth={2.5}
                        />
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[12.5px] font-semibold tracking-tight text-white">
                          {meta.label}
                        </span>
                        <span
                          className={cn(
                            'text-[12px]',
                            j.verdict === 'refer' ? 'font-semibold text-red-300' : 'text-white'
                          )}
                        >
                          {VERDICT_LABEL[j.verdict] ?? j.verdict}
                        </span>
                        {j.predicted_grade && (
                          <span className="text-[12px] font-semibold capitalize text-elec-yellow">
                            {j.predicted_grade}
                          </span>
                        )}
                        {j.confidence != null && (
                          <span className="text-[12px] tabular-nums text-white">
                            {j.confidence}%
                          </span>
                        )}
                        {j.cosign_kind && (
                          <span className={CHIP}>
                            {j.cosign_kind === 'cosigned' ? 'Co-signed' : 'Override'}
                          </span>
                        )}
                        {!j.is_current && <span className={CHIP}>Superseded</span>}
                        {j.actual_outcome && (
                          <span className={cn(CHIP, 'capitalize')}>Actual: {j.actual_outcome}</span>
                        )}
                      </div>
                      {j.source_name_snapshot && (
                        <div className="mt-0.5 text-[12px] text-white">
                          {j.source_name_snapshot}
                          {j.created_at && (
                            <>
                              <span aria-hidden="true" className="mx-1.5">
                                ·
                              </span>
                              <span className="tabular-nums">{formatTime(j.created_at)}</span>
                            </>
                          )}
                        </div>
                      )}
                      {j.rationale && (
                        <p className="mt-1 line-clamp-3 text-[12px] leading-snug text-white">
                          {j.rationale}
                        </p>
                      )}
                      {j.cosign_rationale && (
                        <p className="mt-1 text-[12px] italic leading-snug text-white">
                          “{j.cosign_rationale}”
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
