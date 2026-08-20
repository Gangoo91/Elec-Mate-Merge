/**
 * TapShockChecker — two-tap triage for /guides/electric-shock-from-tap.
 *
 * Searchers arrive mid-scare ("why am I getting a shock from my tap") and the
 * SERP part-answers the theory; the page offers what a snippet cannot — pick
 * where you feel it and how strongly, get the likely cause and the exact
 * next action. EVERY cause and action line is taken from this page's own body
 * copy: hot-tap-only → failed immersion element (most common, isolate that
 * circuit); cold/any metalwork → appliance live-to-earth fault or missing
 * main bonding; widespread → broken PEN on a PME supply (most dangerous);
 * 999 for injuries; never reproduce advice the body does not carry.
 */
import { useRef, useState } from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { trackSeoToolUsed } from '@/lib/analytics-events';

type Where = 'hot' | 'cold' | 'everywhere';
type Strength = 'tingle' | 'shock';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `min-h-11 rounded-xl border px-3 py-2 text-left text-sm transition-colors touch-manipulation ${active ? chipOn : chipOff}`;

const VERDICTS: Record<Where, { headline: string; detail: string }> = {
  hot: {
    headline: 'Hot tap only points at the immersion heater',
    detail:
      'The most common cause is a failed immersion heater element energising the water and pipework. Switch off the immersion heater circuit at the consumer unit — isolating that circuit may make the rest of the installation safe to use temporarily — and call a qualified electrician to test it before switching back on.',
  },
  cold: {
    headline: 'Live pipework beyond the hot system',
    detail:
      'A shock from the cold tap or sink points at a live-to-earth fault feeding the pipework — typically a faulty appliance on the water connection (washing machine, dishwasher) — or missing or disconnected main protective bonding to the water pipes. Switch off at the consumer unit main switch and call a qualified electrician; do not switch back on until the fault is found.',
  },
  everywhere: {
    headline: 'Widespread live metalwork is the most dangerous case',
    detail:
      'Tingling from all taps, radiators and pipework on a PME (TN-C-S) supply can mean a broken PEN conductor on the DNO supply — dangerous voltage on all bonded metalwork. Switch off at the main switch, stop touching metalwork, and call a qualified electrician immediately.',
  },
};

export default function TapShockChecker() {
  const [where, setWhere] = useState<Where | null>(null);
  const [strength, setStrength] = useState<Strength | null>(null);
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'tap_shock_checker', page: window.location.pathname });
  };

  const verdict = where ? VERDICTS[where] : null;

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Where are you feeling it?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Two taps to the likely cause and the immediate action.
      </p>

      <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Where the shock is felt">
        {(
          [
            ['hot', 'Hot tap only'],
            ['cold', 'Cold tap, kitchen sink or one area'],
            ['everywhere', 'All taps, radiators and pipework'],
          ] as [Where, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={where === key}
            onClick={() => {
              setWhere(key);
              markUsed();
            }}
            className={chip(where === key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="How strong it feels">
        {(
          [
            ['tingle', 'A slight tingle'],
            ['shock', 'A definite shock'],
          ] as [Strength, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={strength === key}
            onClick={() => {
              setStrength(key);
              markUsed();
            }}
            className={chip(strength === key)}
          >
            {label}
          </button>
        ))}
      </div>

      {verdict && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-orange-300" aria-hidden />
          <div>
            <p className="font-semibold leading-snug text-white">{verdict.headline}</p>
            <p className="mt-1 text-sm leading-relaxed text-white">{verdict.detail}</p>
            <p className="mt-2 text-sm leading-relaxed text-white">
              Never ignore it, even a mild tingle — the fault will not fix itself, and what starts
              as a tingle can become a life-threatening shock as the insulation deteriorates.
            </p>
          </div>
        </div>
      )}

      {strength === 'shock' && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4"
        >
          <PhoneCall className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
          <p className="text-sm leading-relaxed text-white">
            <span className="font-semibold">Anyone injured? Call 999.</span> Electric shock can
            cause burns, cardiac arrhythmia and loss of consciousness — get checked even if you
            feel fine, because the effects can be delayed.
          </p>
        </div>
      )}
    </div>
  );
}
