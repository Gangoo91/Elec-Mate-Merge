/**
 * EpaReadinessBreakdown — how the ONE readiness model (src/lib/epa/readiness)
 * is shown: gateway lines met, what to do next, then its three parts — AM2
 * practice, the criteria passed on their own qualification, and the gate.
 *
 * 8 Oct 2026: counts in words, not a weighted score. The "/100" and the
 * "/50 /25 /25" part scores were a blend nobody else sees; the tutor reads
 * "4 of 340 criteria passed" and "0 of 9 gateway lines met", so this does too.
 * Used by the EPA simulator's Readiness tab and the profile sheet, so the
 * learner never sees two different answers.
 */
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COLLEGE_CARD, COLLEGE_LIST, COLLEGE_ROW } from '@/components/college/ui/CollegeUi';
import { EPA_STATUS_LABEL, type EpaReadinessModel } from '@/lib/epa/readiness';
import { EPA_FACTS } from '@/lib/epa/facts';

const SECTION_STATE = {
  ready: 'At the bar',
  practising: 'Practising',
  not_tried: 'Not tried',
} as const;

interface Props {
  model: EpaReadinessModel;
  /** Tap on a "next" item — the page decides where it goes. */
  onNext?: (n: EpaReadinessModel['next'][number]) => void;
  compact?: boolean;
  /** The route summary under the parts. Off where the page already says it. */
  showSummary?: boolean;
}

function Part({
  title,
  done,
  of,
  words,
  children,
}: {
  title: string;
  done: number;
  of: number;
  /** What the count is, e.g. "criteria passed". */
  words: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(COLLEGE_CARD, 'flex flex-col')}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-[16px] font-semibold text-white">{title}</h3>
        <span className="text-[13.5px] tabular-nums text-white">
          <span className="font-semibold">
            {done} of {of}
          </span>{' '}
          {words}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${of > 0 ? Math.round((done / of) * 100) : 0}%` }}
        />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function EpaReadinessBreakdown({ model, onNext, compact, showSummary = true }: Props) {
  const { route } = model;
  return (
    <div className="space-y-6">
      {/* Score + headline */}
      <div className={COLLEGE_CARD}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-elec-yellow">
              {route.assessment} readiness · {EPA_STATUS_LABEL[model.status]}
            </p>
            <p className="mt-1.5 text-[16px] font-semibold leading-snug text-white">
              {model.headline}
            </p>
          </div>
          <p className="shrink-0 text-right text-white">
            <span className="block text-[28px] font-bold leading-none tabular-nums">
              {model.gateway.done} of {model.gateway.of}
            </span>
            <span className="mt-1.5 block text-[12px] font-medium">
              {model.gateway.of > 0 && model.gateway.done >= model.gateway.of
                ? 'Ready for gateway'
                : 'gateway lines met'}
            </span>
          </p>
        </div>
        <p className="mt-3 text-[13px] leading-snug text-white">{EPA_FACTS.whoDecides}</p>
      </div>

      {/* Next: one list, numbered in plain type (no yellow discs). */}
      {model.next.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[17px] font-semibold tracking-tight text-white">Do next</h2>
          <ol className={COLLEGE_LIST}>
            {model.next.map((n, i) => (
              <li key={`${n.kind}-${i}`}>
                <button
                  type="button"
                  onClick={() => onNext?.(n)}
                  disabled={!onNext}
                  className={cn(COLLEGE_ROW, 'disabled:cursor-default')}
                >
                  <span className="w-5 shrink-0 text-[14px] font-semibold tabular-nums text-white">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-[14.5px] font-medium leading-snug text-white">
                    {n.label}
                  </span>
                  {onNext && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {!compact && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <Part
              title={`${route.assessment || 'AM2'} practice`}
              done={model.am2.ready}
              of={model.am2.of}
              words="sections at the bar"
            >
              <ul className="grid grid-cols-1 gap-2">
                {model.am2.sections.map((s) => (
                  <li
                    key={s.key}
                    className="flex items-center justify-between gap-2 text-[13px] text-white"
                  >
                    <span className="min-w-0">
                      {s.key} · {s.title}
                    </span>
                    <span className="shrink-0 font-semibold">
                      {SECTION_STATE[s.status]}
                      {s.last != null ? ` · ${s.last}%` : ''}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] leading-snug text-white">
                A section is at the bar after two Assessment runs in a row at its practice bar.
                {model.am2.lastMock
                  ? ` Last mock day: ${model.am2.lastMock.atBar} of ${model.am2.lastMock.of} at the bar.`
                  : ''}
              </p>
            </Part>

            <Part
              title="Your portfolio"
              done={model.portfolio.signedOff}
              of={model.portfolio.totalACs}
              words="criteria passed"
            >
              {model.portfolio.known ? (
                <>
                  {model.portfolio.evidenced > model.portfolio.signedOff && (
                    <p className="text-[13px] text-white">
                      {model.portfolio.evidenced - model.portfolio.signedOff} more claimed or with
                      your assessor
                    </p>
                  )}
                  {model.portfolio.weakestUnits.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {model.portfolio.weakestUnits.map((u) => (
                        <li key={u.unitCode} className="text-[12.5px] text-white">
                          Unit {u.unitCode}
                          {u.unitTitle ? ` · ${u.unitTitle}` : ''}: {u.covered} of {u.total}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2 text-[12px] leading-snug text-white">
                    Counted against your own qualification’s criteria. Only your assessor can mark a
                    criterion passed.
                  </p>
                </>
              ) : (
                <p className="text-[13px] text-white">
                  Your qualification’s ACs aren’t loaded yet, so the portfolio can’t be counted.
                </p>
              )}
            </Part>
          </div>

          <Part title="Gateway" done={model.gateway.done} of={model.gateway.of} words="lines met">
            <ul className="space-y-2">
              {model.gateway.items.map((i) => (
                <li key={i.key} className="flex gap-2.5">
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      i.done ? 'border-emerald-400 bg-emerald-400' : 'border-white/[0.35]'
                    )}
                  >
                    {i.done && <Check className="h-3 w-3 text-black" strokeWidth={2.5} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium text-white">{i.label}</span>
                    <span className="block text-[12px] leading-snug text-white">{i.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            {/* ELE-1872: gate lines carry a state; the checklist note is for the fallback only. */}
            {!model.gateway.recorded && !model.gateway.items.some((i) => i.state) && (
              <p className="mt-2 text-[12px] leading-snug text-white">
                Nothing recorded yet. Your tutor or assessor ticks these off as they’re confirmed.
              </p>
            )}
          </Part>

          {showSummary && (
            <p className="text-[13px] leading-snug text-white lg:col-span-2">{route.summary}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EpaReadinessBreakdown;
