import { useState } from 'react';
import { ChevronDown, User2, ShieldCheck, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EpaJudgement, EpaSource } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   EpaVerdictHistory — every prior judgement, grouped by source.
   Most recent first per source. Shows supersede chain visually.
   ========================================================================== */

const SOURCE_META: Record<EpaSource, { label: string; icon: React.ComponentType<{ className?: string }>; tint: string }> = {
  learner: { label: 'Learner', icon: User2, tint: 'text-blue-200' },
  tutor: { label: 'Tutor', icon: ShieldCheck, tint: 'text-elec-yellow' },
  ai: { label: 'AI', icon: Bot, tint: 'text-purple-200' },
  employer: { label: 'Employer', icon: User2, tint: 'text-emerald-200' },
};

const VERDICT_LABEL: Record<string, string> = {
  ready: 'Ready',
  almost: 'Almost',
  not_yet: 'Not yet',
  refer: 'Refer',
};

const VERDICT_DOT: Record<string, string> = {
  ready: 'bg-emerald-400',
  almost: 'bg-amber-400',
  not_yet: 'bg-orange-400',
  refer: 'bg-red-400',
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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

  if (all.length === 0) return null;

  // Group by date for cleaner timeline
  const grouped = new Map<string, EpaJudgement[]>();
  for (const j of all) {
    const day = j.created_at?.slice(0, 10) ?? 'unknown';
    const list = grouped.get(day) ?? [];
    list.push(j);
    grouped.set(day, list);
  }

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Verdict history
          </div>
          <span className="text-[10.5px] text-white/45 tabular-nums">
            {all.length} entr{all.length === 1 ? 'y' : 'ies'}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/55 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-white/[0.04]">
          {Array.from(grouped.entries()).map(([day, items]) => (
            <div key={day}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 mb-2 tabular-nums">
                {formatDate(day)}
              </div>
              <ol className="relative border-l border-white/[0.08] pl-4 space-y-3">
                {items.map((j) => {
                  const meta = SOURCE_META[j.source as EpaSource];
                  const Icon = meta.icon;
                  return (
                    <li key={j.id} className="relative">
                      {/* Timeline node */}
                      <span
                        className={cn(
                          'absolute -left-[21px] top-[2px] inline-flex items-center justify-center h-4 w-4 rounded-full border',
                          j.is_current
                            ? 'bg-[hsl(0_0%_8%)] border-white/40'
                            : 'bg-[hsl(0_0%_8%)] border-white/15'
                        )}
                      >
                        <Icon className={cn('h-2.5 w-2.5', meta.tint)} strokeWidth={2.5} />
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn('text-[12px] font-semibold tracking-tight', meta.tint)}>
                          {meta.label}
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 text-[11px] text-white/85 capitalize'
                          )}
                        >
                          <span aria-hidden className={cn('inline-block h-1.5 w-1.5 rounded-full', VERDICT_DOT[j.verdict] ?? 'bg-white/35')} />
                          {VERDICT_LABEL[j.verdict] ?? j.verdict}
                        </span>
                        {j.predicted_grade && (
                          <span className="text-[10.5px] uppercase tracking-[0.06em] text-elec-yellow/85">
                            {j.predicted_grade}
                          </span>
                        )}
                        {j.confidence != null && (
                          <span className="text-[10.5px] text-white/55 tabular-nums">{j.confidence}%</span>
                        )}
                        {j.cosign_kind && (
                          <span
                            className={cn(
                              'inline-flex items-center h-4 px-1.5 rounded-md border text-[9px] font-semibold tracking-[0.06em] uppercase',
                              j.cosign_kind === 'cosigned'
                                ? 'bg-emerald-500/[0.10] border-emerald-400/30 text-emerald-200'
                                : 'bg-orange-500/[0.10] border-orange-400/30 text-orange-200'
                            )}
                          >
                            {j.cosign_kind === 'cosigned' ? 'Co-signed' : 'Override'}
                          </span>
                        )}
                        {!j.is_current && (
                          <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9px] font-semibold tracking-[0.06em] uppercase text-white/50">
                            Superseded
                          </span>
                        )}
                        {j.actual_outcome && (
                          <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-purple-500/[0.10] border border-purple-400/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-purple-200">
                            Actual: {j.actual_outcome}
                          </span>
                        )}
                      </div>
                      {j.source_name_snapshot && (
                        <div className="mt-0.5 text-[10.5px] text-white/45">
                          {j.source_name_snapshot}
                          {j.created_at && (
                            <>
                              <span className="text-white/25 mx-1.5">·</span>
                              <span className="tabular-nums">{formatTime(j.created_at)}</span>
                            </>
                          )}
                        </div>
                      )}
                      {j.rationale && (
                        <p className="mt-1 text-[11.5px] text-white/75 leading-snug line-clamp-3">
                          {j.rationale}
                        </p>
                      )}
                      {j.cosign_rationale && (
                        <p className="mt-1 text-[11.5px] text-white/75 leading-snug italic">
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
