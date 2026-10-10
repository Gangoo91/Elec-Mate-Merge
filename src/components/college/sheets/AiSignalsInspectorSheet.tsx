import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
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
  ac?: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
  };
  otj?: {
    total_minutes: number;
    required_minutes: number | null;
    pct: number | null;
    source?: string;
  };
  portfolio?: {
    items: number;
    submissions: number;
    iqa_verified: number;
    awaiting_review: number;
    requires_action: number;
  };
  mocks_count?: number;
  observations_count?: number;
  facets_pulled?: number;
  agreement_note?: string | null;
}

export function AiSignalsInspectorSheet({ open, onOpenChange, judgement }: Props) {
  const signals = (judgement?.signals_used ?? {}) as unknown as SignalsShape;
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Why the risk flags fired"
      title="What did the AI see?"
      description="The exact evidence base that drove this verdict. Use this to decide whether to co-sign or override."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      footer={
        <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'w-full')}>
          Close
        </button>
      }
    >
      {!judgement ? (
        <p className="text-[14px] text-white lg:col-span-2">No AI judgement to inspect yet.</p>
      ) : (
        <>
          <div className="lg:col-span-2">
            <Banner judgement={judgement} />
          </div>

          <div className="space-y-6">
            {signals.ac && (
              <SignalSection label="AC coverage">
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
              </SignalSection>
            )}

            {signals.otj && (
              <SignalSection label="OTJ hours">
                <div className="text-[13px] text-white">
                  <span className="font-semibold">{Math.round(signals.otj.total_minutes / 60)}h</span>
                  {signals.otj.required_minutes ? (
                    <>
                      {' '}
                      of {Math.round(signals.otj.required_minutes / 60)}h planned
                      {signals.otj.pct != null && (
                        <span className="ml-2 tabular-nums">({signals.otj.pct}%)</span>
                      )}
                    </>
                  ) : (
                    ' recorded · no planned total on the gateway checklist'
                  )}
                  {signals.otj.source && <div className="mt-0.5 text-[12px]">From: {signals.otj.source}</div>}
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      (signals.otj.pct ?? 0) >= 80
                        ? 'bg-emerald-400'
                        : (signals.otj.pct ?? 0) >= 50
                          ? 'bg-orange-300'
                          : 'bg-red-400'
                    )}
                    style={{ width: `${Math.min(100, signals.otj.pct ?? 0)}%` }}
                  />
                </div>
              </SignalSection>
            )}

            {signals.portfolio && (
              <SignalSection label="Portfolio">
                <Numbers
                  rows={[
                    ['Items', signals.portfolio.items],
                    ['Submissions', signals.portfolio.submissions],
                    [
                      'IQA verified',
                      signals.portfolio.iqa_verified,
                      signals.portfolio.iqa_verified > 0 ? 'emerald' : null,
                    ],
                    [
                      'Awaiting review',
                      signals.portfolio.awaiting_review,
                      signals.portfolio.awaiting_review > 0 ? 'amber' : null,
                    ],
                    [
                      'Requires action',
                      signals.portfolio.requires_action,
                      signals.portfolio.requires_action > 0 ? 'red' : null,
                    ],
                  ]}
                />
              </SignalSection>
            )}
          </div>

          <div className="space-y-6">
            <SignalSection label="Engagement evidence">
              <Numbers
                rows={[
                  ['Mock simulator runs', signals.mocks_count ?? 0],
                  ['Observations on file', signals.observations_count ?? 0],
                ]}
              />
            </SignalSection>

            <SignalSection label="BS 7671 retrieval">
              <p className="text-[13px] text-white">
                <span className="font-semibold tabular-nums">{signals.facets_pulled ?? 0}</span>{' '}
                facet{(signals.facets_pulled ?? 0) === 1 ? '' : 's'} retrieved and offered to the model.
              </p>
              {(judgement.citations ?? []).length > 0 && (
                <p className="mt-1 text-[12px] text-white">
                  {(judgement.citations ?? []).length} cited in the verdict.
                </p>
              )}
            </SignalSection>

            {signals.agreement_note && (
              <SignalSection label="AI on prior verdicts">
                <p className="text-[13px] leading-snug text-white">{signals.agreement_note}</p>
              </SignalSection>
            )}

            <details className="border-t border-white/[0.08]">
              <summary className="flex min-h-11 cursor-pointer items-center pt-3 text-[13px] font-medium text-white touch-manipulation">
                Raw signals JSON
              </summary>
              <pre className="overflow-x-auto whitespace-pre-wrap pb-2 text-[12px] text-white">
                {JSON.stringify(judgement.signals_used, null, 2)}
              </pre>
            </details>
          </div>
        </>
      )}
    </FormSheet>
  );
}

function Banner({ judgement }: { judgement: EpaJudgement }) {
  return (
    <div>
      <div className="text-[13px] font-medium text-white">{judgement.source_name_snapshot ?? 'Mate AI'}</div>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[22px] font-semibold capitalize leading-none text-white">
          {judgement.verdict.replace('_', ' ')}
        </span>
        {judgement.predicted_grade && (
          <span className="text-[15px] font-semibold capitalize text-white">{judgement.predicted_grade}</span>
        )}
        {judgement.confidence != null && (
          <span className="text-[13px] tabular-nums text-white">{judgement.confidence}% sure</span>
        )}
      </div>
    </div>
  );
}

function SignalSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/[0.08] pt-4">
      <h3 className="mb-2 text-[14px] font-semibold text-white">{label}</h3>
      {children}
    </section>
  );
}

type Tone = 'emerald' | 'amber' | 'red' | null;

function Numbers({ rows }: { rows: Array<[string, number, Tone?]> }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
      {rows.map(([label, value, tone]) => (
        <li key={label} className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] text-white">{label}</span>
          <span
            className={cn(
              'text-[14px] font-semibold tabular-nums',
              tone === 'emerald' && 'text-emerald-300',
              tone === 'amber' && 'text-orange-300',
              tone === 'red' && 'text-red-300',
              !tone && 'text-white'
            )}
          >
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
