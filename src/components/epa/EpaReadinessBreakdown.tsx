/**
 * EpaReadinessBreakdown — how the ONE readiness model (src/lib/epa/readiness)
 * is shown: the score, what to do next, then its three parts — AM2 practice,
 * the portfolio on their own qualification's ACs, and the sign-offs.
 * Used by the EPA simulator's Readiness tab and the profile sheet, so the
 * learner never sees two different answers.
 */
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  AM2_WEIGHT,
  EPA_STATUS_LABEL,
  GATEWAY_WEIGHT,
  PORTFOLIO_WEIGHT,
  type EpaReadinessModel,
} from '@/lib/epa/readiness';
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
}

function Part({
  title,
  score,
  of,
  children,
}: {
  title: string;
  score: number;
  of: number;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-white">{title}</h3>
        <span className="font-mono text-[13px] tabular-nums text-white">
          {score} / {of}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${Math.round((score / of) * 100)}%` }}
        />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function EpaReadinessBreakdown({ model, onNext, compact }: Props) {
  const { route } = model;
  return (
    <div className="space-y-4">
      {/* Score + headline */}
      <div className={cn('rounded-2xl border border-white/[0.14] p-4 sm:p-5', CARD_SURFACE)}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white">
              {route.assessment} readiness · {EPA_STATUS_LABEL[model.status]}
            </p>
            <p className="mt-1.5 text-[14px] leading-snug text-white">{model.headline}</p>
          </div>
          <p className="shrink-0 font-mono text-[34px] font-bold leading-none tabular-nums text-white">
            {model.score}
            <span className="text-[14px] font-medium"> /100</span>
          </p>
        </div>
        <p className="mt-3 text-[12px] leading-snug text-white">{EPA_FACTS.whoDecides}</p>
      </div>

      {/* Next */}
      {model.next.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Do next</h2>
          {model.next.map((n, i) => (
            <button
              key={`${n.kind}-${i}`}
              type="button"
              onClick={() => onNext?.(n)}
              disabled={!onNext}
              className={cn(
                'flex min-h-[48px] w-full items-center gap-3 rounded-xl border border-white/[0.16] px-4 py-2.5 text-left touch-manipulation',
                onNext && 'hover:border-elec-yellow'
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-[12px] font-bold text-black">
                {i + 1}
              </span>
              <span className="text-[14px] font-medium leading-snug text-white">{n.label}</span>
            </button>
          ))}
        </div>
      )}

      {!compact && (
        <>
          <Part
            title={`${route.assessment || 'AM2'} practice`}
            score={model.am2.score}
            of={AM2_WEIGHT}
          >
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {model.am2.sections.map((s) => (
                <li
                  key={s.key}
                  className="flex items-center justify-between gap-2 text-[13px] text-white"
                >
                  <span className="min-w-0 truncate">
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

          <Part title="Your portfolio" score={model.portfolio.score} of={PORTFOLIO_WEIGHT}>
            {model.portfolio.known ? (
              <>
                <p className="text-[13px] text-white">
                  {model.portfolio.evidenced} of {model.portfolio.totalACs} ACs evidenced ·{' '}
                  {model.portfolio.signedOff} signed off
                </p>
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
                  Counted against your own qualification’s ACs, unit by unit. Signed-off ACs count
                  in full, evidenced ones half.
                </p>
              </>
            ) : (
              <p className="text-[13px] text-white">
                Your qualification’s ACs aren’t loaded yet, so the portfolio can’t be counted.
              </p>
            )}
          </Part>

          <Part title="Sign-offs" score={model.gateway.score} of={GATEWAY_WEIGHT}>
            <ul className="space-y-2">
              {model.gateway.items.map((i) => (
                <li key={i.key} className="flex gap-2.5">
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      i.done ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.35]'
                    )}
                  >
                    {i.done && <Check className="h-3 w-3 text-black" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium text-white">{i.label}</span>
                    <span className="block text-[12px] leading-snug text-white">{i.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            {!model.gateway.recorded && (
              <p className="mt-2 text-[12px] leading-snug text-white">
                Nothing recorded yet — your tutor or assessor ticks these off as they’re confirmed.
              </p>
            )}
          </Part>

          <p className="text-[12px] leading-snug text-white">{route.summary}</p>
        </>
      )}
    </div>
  );
}

export default EpaReadinessBreakdown;
