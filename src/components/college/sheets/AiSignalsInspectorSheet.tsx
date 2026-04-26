import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SheetShell, SecondaryButton } from '@/components/college/primitives';
import { Bot, BookOpen, ListChecks, Activity, Briefcase, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   AiSignalsInspectorSheet — surfaces signals_used + citations from a single
   AI judgement so tutors can see exactly what evidence shaped the verdict.
   "Trust but verify" — the AI is no longer a black box.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  judgement: EpaJudgement | null;
}

interface SignalsShape {
  ac?: { total: number; not_started: number; in_progress: number; evidenced: number; assessed: number; confirmed: number };
  otj?: { total_minutes: number; required_minutes: number; pct: number | null };
  portfolio?: { items: number; submissions: number; iqa_verified: number; awaiting_review: number; requires_action: number };
  mocks_count?: number;
  observations_count?: number;
  facets_pulled?: number;
  agreement_note?: string | null;
}

export function AiSignalsInspectorSheet({ open, onOpenChange, judgement }: Props) {
  const signals = ((judgement?.signals_used ?? {}) as unknown) as SignalsShape;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="AI signals inspector"
          title="What did the AI see?"
          description="The exact evidence base that drove this verdict. Use this to decide whether to co-sign or override."
          footer={
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Close
            </SecondaryButton>
          }
        >
          {!judgement ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-6 text-center text-[12.5px] text-white/55">
              No AI judgement to inspect yet.
            </div>
          ) : (
            <>
              <Banner judgement={judgement} />

              {signals.ac && (
                <SignalCard
                  icon={<ListChecks className="h-3.5 w-3.5 text-blue-300" />}
                  label="AC coverage"
                >
                  <Numbers
                    rows={[
                      ['Total tracked', signals.ac.total],
                      ['Not started', signals.ac.not_started, signals.ac.not_started > 0 ? 'red' : null],
                      ['In progress', signals.ac.in_progress],
                      ['Evidenced', signals.ac.evidenced, signals.ac.evidenced > 0 ? 'amber' : null],
                      ['Assessed', signals.ac.assessed, signals.ac.assessed > 0 ? 'emerald' : null],
                      ['Confirmed', signals.ac.confirmed, signals.ac.confirmed > 0 ? 'emerald' : null],
                    ]}
                  />
                </SignalCard>
              )}

              {signals.otj && (
                <SignalCard
                  icon={<Activity className="h-3.5 w-3.5 text-emerald-300" />}
                  label="OTJ hours"
                >
                  <div className="text-[12.5px] text-white/85">
                    <span className="font-semibold">
                      {Math.round(signals.otj.total_minutes / 60)}h
                    </span>{' '}
                    of{' '}
                    <span className="text-white/55">
                      {Math.round(signals.otj.required_minutes / 60)}h target
                    </span>
                    {signals.otj.pct != null && (
                      <span className="ml-2 text-[11px] text-white/55 tabular-nums">({signals.otj.pct}%)</span>
                    )}
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        (signals.otj.pct ?? 0) >= 80 ? 'bg-emerald-400' : (signals.otj.pct ?? 0) >= 50 ? 'bg-amber-400' : 'bg-red-400'
                      )}
                      style={{ width: `${Math.min(100, signals.otj.pct ?? 0)}%` }}
                    />
                  </div>
                </SignalCard>
              )}

              {signals.portfolio && (
                <SignalCard
                  icon={<Briefcase className="h-3.5 w-3.5 text-amber-300" />}
                  label="Portfolio"
                >
                  <Numbers
                    rows={[
                      ['Items', signals.portfolio.items],
                      ['Submissions', signals.portfolio.submissions],
                      ['IQA verified', signals.portfolio.iqa_verified, signals.portfolio.iqa_verified > 0 ? 'emerald' : null],
                      ['Awaiting review', signals.portfolio.awaiting_review, signals.portfolio.awaiting_review > 0 ? 'amber' : null],
                      ['Requires action', signals.portfolio.requires_action, signals.portfolio.requires_action > 0 ? 'red' : null],
                    ]}
                  />
                </SignalCard>
              )}

              <SignalCard
                icon={<Target className="h-3.5 w-3.5 text-purple-300" />}
                label="Engagement evidence"
              >
                <Numbers
                  rows={[
                    ['Mock simulator runs', signals.mocks_count ?? 0],
                    ['Observations on file', signals.observations_count ?? 0],
                  ]}
                />
              </SignalCard>

              <SignalCard
                icon={<BookOpen className="h-3.5 w-3.5 text-blue-300" />}
                label="BS 7671 retrieval"
              >
                <p className="text-[12.5px] text-white/85">
                  <span className="font-semibold tabular-nums">{signals.facets_pulled ?? 0}</span>{' '}
                  facet{(signals.facets_pulled ?? 0) === 1 ? '' : 's'} retrieved and offered to the model.
                </p>
                {(judgement.citations ?? []).length > 0 && (
                  <p className="mt-1 text-[11px] text-white/55">
                    {(judgement.citations ?? []).length} cited in the verdict.
                  </p>
                )}
              </SignalCard>

              {signals.agreement_note && (
                <div className="rounded-2xl border border-purple-500/[0.18] bg-purple-500/[0.04] px-5 py-3">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-purple-300/85 mb-1">
                    AI on prior verdicts
                  </div>
                  <p className="text-[12.5px] text-white/85 leading-snug">{signals.agreement_note}</p>
                </div>
              )}

              <details className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
                <summary className="px-5 py-3 text-[10.5px] uppercase tracking-[0.16em] text-white/55 cursor-pointer touch-manipulation">
                  Raw signals JSON
                </summary>
                <pre className="px-5 pb-4 text-[10px] text-white/65 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(judgement.signals_used, null, 2)}
                </pre>
              </details>
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function Banner({ judgement }: { judgement: EpaJudgement }) {
  return (
    <div className="rounded-2xl border border-purple-500/[0.18] bg-purple-500/[0.04] px-5 py-4 flex items-center gap-3">
      <Bot className="h-5 w-5 text-purple-200 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-200">
          {judgement.source_name_snapshot ?? 'Mate AI'}
        </div>
        <div className="mt-0.5 text-[12px] text-white/85">
          Verdict: <span className="capitalize text-white">{judgement.verdict.replace('_', ' ')}</span>
          {judgement.predicted_grade && (
            <>
              <span className="text-white/25 mx-1.5">·</span>
              <span className="capitalize text-elec-yellow/90">{judgement.predicted_grade}</span>
            </>
          )}
          {judgement.confidence != null && (
            <>
              <span className="text-white/25 mx-1.5">·</span>
              <span className="text-white/85 tabular-nums">{judgement.confidence}% confidence</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SignalCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

function Numbers({
  rows,
}: {
  rows: Array<[string, number, ('emerald' | 'amber' | 'red')?] | [string, number]>;
}) {
  return (
    <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4">
      {rows.map(([label, value, tone]) => (
        <li key={label} className="flex items-baseline justify-between gap-2">
          <span className="text-[11.5px] text-white/65">{label}</span>
          <span
            className={cn(
              'text-[13px] font-semibold tabular-nums',
              tone === 'emerald' && 'text-emerald-300',
              tone === 'amber' && 'text-amber-300',
              tone === 'red' && 'text-red-300',
              !tone && 'text-white/85'
            )}
          >
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
