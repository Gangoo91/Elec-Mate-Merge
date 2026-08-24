/**
 * RcdTripTimeChecker — instant "what's the maximum trip time?" for
 * /guides/rcd-testing-procedure.
 *
 * WHY THIS AND NOT A TITLE REWRITE
 * That page already carries the numbers in its title and is correct for
 * A4:2026, yet it converts at 0.35% on 9,516 impressions. Its query set is
 * almost entirely per-rating lookups — "30ma rcd trip times", "100ma rcd trip
 * time", "300ma rcd trip times" — and the phrasing reveals the misconception
 * driving them: people expect the permitted time to change with the rating.
 *
 * It does not. Since Amendment 4 deleted Table 3A of Appendix 3, the required
 * verification is a single AC test at IΔn whatever the device rating or type,
 * and the acceptance time is the same 300 ms for any general (non-delay) RCD —
 * 30 mA, 100 mA, 300 mA or 500 mA alike. Only Type S differs (130–500 ms).
 *
 * So the tool's job is to answer the lookup AND correct the assumption behind
 * it, which is the one thing a SERP snippet cannot do well. Changing the rating
 * deliberately leaves the headline number unchanged and says so.
 *
 * EVERY figure is grounded in this page's own body copy, which is sourced from
 * the NOTE to Regulation 643.7.1 and the NOTE to Regulation 643.8:
 *   general (non-delay)  300 ms max at IΔn
 *   Type S               130 ms min – 500 ms max at IΔn
 *   device standards     BS EN 61008/61009: 40 ms at 5×IΔn general,
 *                        50–200 ms Type S — device characteristics, NOT tests
 *                        BS 7671 requires. Never present these as the limit.
 * Do not add a figure the page body does not state.
 */
import { useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import { AlertTriangle } from 'lucide-react';

type Rating = 30 | 100 | 300 | 500;
type Kind = 'general' | 'typeS';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `flex min-h-11 items-center justify-center rounded-xl border px-3 text-center text-sm leading-tight transition-colors touch-manipulation ${
    active ? chipOn : chipOff
  }`;

export default function RcdTripTimeChecker() {
  const [rating, setRating] = useState<Rating>(30);
  const [kind, setKind] = useState<Kind>('general');
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'rcd_trip_time_checker', page: window.location.pathname });
  };

  const isS = kind === 'typeS';
  const headline = isS ? '130 – 500 ms' : '300 ms';
  const headlineLabel = isS
    ? `Type S at IΔn (${rating} mA) — must not trip faster than 130 ms`
    : `General (non-delay) at IΔn (${rating} mA) — maximum`;

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-white lg:text-[17px]">
        What is the maximum trip time?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Pick the device and see the time BS 7671 accepts — and the test that actually applies since
        Amendment 4.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">
              Rated residual operating current (IΔn)
            </legend>
            <div className="grid grid-cols-4 gap-2">
              {([30, 100, 300, 500] as Rating[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={rating === r}
                  onClick={() => {
                    setRating(r);
                    markUsed();
                  }}
                  className={chip(rating === r)}
                >
                  {r} mA
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">Device type</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['general', 'General (non-delay)'],
                  ['typeS', 'Type S (time-delayed)'],
                ] as [Kind, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={kind === key}
                  onClick={() => {
                    setKind(key);
                    markUsed();
                  }}
                  className={chip(kind === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* The correction is the point of the tool, so it sits with the
              controls rather than being buried under the answer. */}
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
            <p className="flex items-start gap-2 text-[13px] leading-relaxed text-white">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              <span>
                Changing the rating does not change the time. The acceptance time is the same for a
                30 mA and a 300 mA general device — the rating sets the current you test{' '}
                <em>at</em>, not the time allowed.
              </span>
            </p>
          </div>
        </div>

        <div role="status" aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-4 lg:p-5">
            <p className="text-[12px] font-medium uppercase tracking-wider text-white">
              Maximum permitted trip time
            </p>
            <p className="mt-1 text-4xl font-bold text-elec-yellow">{headline}</p>
            <p className="mt-1 text-sm leading-relaxed text-white">{headlineLabel}</p>

            <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  The test to run
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white">
                  One alternating-current test at IΔn ({rating} mA), whatever the device type — AC,
                  A, F or B. Run it on both half-cycles (0° and 180°) and record the longer time.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  Where the figure comes from
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white">
                  {isS
                    ? 'The NOTE to Regulation 643.7.1 gives 130 ms minimum to 500 ms maximum for a Type S. The lower bound matters as much as the upper one — a Type S that trips too fast has lost its discrimination with the device downstream.'
                    : 'The NOTE to Regulation 643.7.1 (fault protection) and the NOTE to Regulation 643.8 (additional protection) both give 300 ms for a general non-delay device.'}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white">
                  Not the ½× and 5× tests
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white">
                  Amendment 4 deleted Table 3A of Appendix 3, so the half-rated and five-times tests
                  are no longer part of the required verification. BS EN 61008/61009 still quote{' '}
                  {isS ? '50 to 200 ms' : '40 ms'} at five times rated current, but that describes
                  how the device is built — not a test BS 7671 asks you to record.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white">
            Test equipment to BS EN 61557-6. Operate the integral test button as well, to confirm the
            test facility works (Regulation 643.10).
          </p>
        </div>
      </div>
    </div>
  );
}
