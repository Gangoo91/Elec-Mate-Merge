/**
 * SpurDecisionChecker — "can I spur off this, and what can I put on it?"
 * for /guides/spur-socket-regulations.
 *
 * WHY THIS SHAPE
 * That page pulls 8,248 impressions and its queries are decision-shaped rather
 * than lookups — "unfused spur", "spur off radial circuit", "how many spurs can
 * you have on a ring main", "spur outlet". People are standing at a socket
 * deciding whether they are allowed to do the thing. So the tool is a decision,
 * not a calculator.
 *
 * The centrepiece is the "spur off a spur" trap, which is the single most
 * common mistake and has a genuinely counter-intuitive answer: taking an
 * UNFUSED spur from a socket that is already on an unfused spur is not
 * permitted, but taking a FUSED spur from that same socket IS — because the
 * FCU provides overcurrent protection for the new cable independently of the
 * circuit. A SERP snippet flattens that into "no"; the tool gets it right.
 *
 * EVERY rule and figure is taken verbatim from this page's own body copy:
 *  · unfused from ring OR radial → one single or one twin socket outlet, or one
 *    item of fixed/permanently connected equipment; cable must be the SAME CSA
 *    as the circuit cable (2.5 mm² T&E for a 32 A ring or 20 A radial)
 *  · fused (FCU, BS 1362 fuse) → multiple outlets up to the fuse rating; cable
 *    after the FCU may be reduced — 13 A → 2.5 mm², 3 A → 1.0 or 1.5 mm²
 *  · no unfused spur from an unfused spur; a fused spur may be taken from any
 *    point on a circuit, including a socket already on an unfused spur
 *  · OSG: total non-fused spurs should not exceed the number of socket outlets
 *    and stationary equipment connected directly in the ring
 * Do not add a rule the page body does not state.
 */
import { useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import { Check, X, AlertTriangle } from 'lucide-react';

type Source = 'ring' | 'radial' | 'unfusedSpur';
type SpurType = 'unfused' | 'fused';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `flex min-h-11 items-center justify-center rounded-xl border px-3 text-center text-[13px] leading-tight transition-colors touch-manipulation ${
    active ? chipOn : chipOff
  }`;

interface Verdict {
  allowed: boolean;
  headline: string;
  why: string;
  canSupply?: string;
  cable?: string;
}

function decide(source: Source, spur: SpurType): Verdict {
  if (source === 'unfusedSpur') {
    return spur === 'unfused'
      ? {
          allowed: false,
          headline: 'Not permitted',
          why: 'BS 7671 and the IET On-Site Guide do not permit a non-fused spur to be taken from another non-fused spur. The cable on the original spur was sized to supply only its intended outlet, so adding a further spur pushes it beyond what it was designed to carry.',
          canSupply:
            'Use a fused connection unit instead, or run the new spur from a socket or junction box connected directly in the circuit.',
        }
      : {
          allowed: true,
          headline: 'Permitted — via an FCU',
          why: 'A fused spur may be taken from any point on a circuit, including a socket that is itself on a non-fused spur. The fuse in the FCU provides overcurrent protection for the new spur cable independently of the circuit.',
          canSupply: 'Multiple outlets or items of equipment, up to the rating of the fuse.',
          cable: 'After the FCU: 13 A → 2.5 mm². 3 A → 1.0 mm² or 1.5 mm².',
        };
  }

  return spur === 'unfused'
    ? {
        allowed: true,
        headline: 'Permitted — one outlet only',
        why: "An unfused spur relies on the circuit's own protective device rather than one of its own, so it is limited to a single point. The rule is the same whether you are spurring from a ring or a radial.",
        canSupply:
          'One single socket outlet, or one twin socket outlet, or one item of permanently connected equipment.',
        cable: `Same cross-sectional area as the circuit cable — typically 2.5 mm² twin and earth for a 32 A ring or 20 A radial.`,
      }
    : {
        allowed: true,
        headline: 'Permitted — multiple outlets',
        why: 'The BS 1362 fuse in the connection unit limits the current independently of the main circuit protection, so the spur is not tied to a single point.',
        canSupply: 'Multiple outlets or items of equipment, up to the rating of the fuse.',
        cable: 'After the FCU the cable may be reduced: 13 A → 2.5 mm². 3 A → 1.0 mm² or 1.5 mm².',
      };
}

export default function SpurDecisionChecker() {
  const [source, setSource] = useState<Source>('ring');
  const [spur, setSpur] = useState<SpurType>('unfused');
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'spur_decision_checker', page: window.location.pathname });
  };

  const v = decide(source, spur);

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-white lg:text-[17px]">
        Can you spur off it?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Two taps for whether the spur is allowed, what it may supply, and the cable size.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">
              What are you connecting to?
            </legend>
            <div className="grid gap-2">
              {(
                [
                  ['ring', 'A socket connected directly in the ring'],
                  ['radial', 'A point on a radial circuit'],
                  ['unfusedSpur', 'A socket that is already on an unfused spur'],
                ] as [Source, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={source === key}
                  onClick={() => {
                    setSource(key);
                    markUsed();
                  }}
                  className={chip(source === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">Type of spur</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['unfused', 'Unfused'],
                  ['fused', 'Fused (FCU)'],
                ] as [SpurType, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={spur === key}
                  onClick={() => {
                    setSpur(key);
                    markUsed();
                  }}
                  className={chip(spur === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3">
            <p className="text-[13px] leading-relaxed text-white">
              <span className="font-semibold text-elec-yellow">How many spurs on a ring? </span>
              BS 7671 sets no specific maximum. The On-Site Guide states the total number of
              non-fused spurs should not exceed the total number of socket outlets and items of
              stationary equipment connected directly in the ring.
            </p>
          </div>
        </div>

        <div role="status" aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          <div
            className={`rounded-xl border p-4 lg:p-5 ${
              v.allowed
                ? 'border-white/[0.14] bg-white/[0.04]'
                : 'border-orange-500/30 bg-orange-500/10'
            }`}
          >
            <p className="flex items-center gap-2 text-[22px] font-bold text-white">
              {v.allowed ? (
                <Check className="h-6 w-6 shrink-0 text-elec-yellow" aria-hidden />
              ) : (
                <X className="h-6 w-6 shrink-0 text-orange-300" aria-hidden />
              )}
              {v.headline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white">{v.why}</p>

            {v.canSupply ? (
              <div className="mt-4 border-t border-white/[0.08] pt-3">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  {v.allowed ? 'It may supply' : 'Do this instead'}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{v.canSupply}</p>
              </div>
            ) : null}

            {v.cable ? (
              <div className="mt-3 border-t border-white/[0.08] pt-3">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  Cable size
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{v.cable}</p>
              </div>
            ) : null}

            <div className="mt-3 flex items-start gap-2 border-t border-white/[0.08] pt-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              <p className="text-[13px] leading-relaxed text-white">
                Issue a Minor Works Certificate either way. In England this is not notifiable unless
                it is in a special location (a room with a bath or shower, or a pool or sauna) or
                involves a new circuit or work at the consumer unit — kitchens were removed from the
                notifiable list in 2013. Wales and Scotland differ.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white">
            Whichever route you take, check voltage drop at the furthest point and that the earth
            fault loop impedance still allows disconnection within the required time.
          </p>
        </div>
      </div>
    </div>
  );
}
