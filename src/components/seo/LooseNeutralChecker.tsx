/**
 * LooseNeutralChecker — tick-the-symptoms triage for
 * /guides/loose-neutral-symptoms.
 *
 * The queries landing there ("loose neutral wire symptoms", "lost neutral")
 * are symptom lookups the SERP now part-answers, so the page offers what a
 * snippet cannot: tick what you're seeing, get a grounded read on whether it
 * fits a loose neutral and what to do next. EVERY symptom, threshold and
 * action line here is taken from this page's own body copy — the 200–260 V
 * swing, the >10 V drop under load, the N–E 2–3 V test, the PME lost-neutral
 * emergency framing, and the 105 DNO emergency number. Do not add claims the
 * page body does not carry.
 */
import { useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, PhoneCall } from 'lucide-react';
import { trackSeoToolUsed } from '@/lib/analytics-events';

const SYMPTOMS = [
  { key: 'flicker', label: 'Lights brighten and dim unpredictably' },
  { key: 'load', label: 'Worse when the kettle, oven or shower runs' },
  { key: 'voltage', label: 'Voltage readings swinging (roughly 200–260 V)' },
  { key: 'appliances', label: 'Appliances erratic — motors fast then slow, electronics resetting' },
  { key: 'tingle', label: 'Tingling from taps, radiators or metal pipework' },
] as const;

type SymptomKey = (typeof SYMPTOMS)[number]['key'];

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';

export default function LooseNeutralChecker() {
  const [ticked, setTicked] = useState<Set<SymptomKey>>(new Set());
  const usedRef = useRef(false);

  const toggle = (key: SymptomKey) => {
    if (!usedRef.current) {
      usedRef.current = true;
      trackSeoToolUsed({ tool: 'loose_neutral_checker', page: window.location.pathname });
    }
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const count = ticked.size;
  const tingle = ticked.has('tingle');

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Does this look like a loose neutral?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Tick everything you are seeing and get a read on whether the pattern fits.
      </p>

      <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Symptoms observed">
        {SYMPTOMS.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={ticked.has(s.key)}
            onClick={() => toggle(s.key)}
            className={`min-h-11 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors touch-manipulation ${
              ticked.has(s.key) ? chipOn : chipOff
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {tingle ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4"
        >
          <PhoneCall className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
          <div>
            <p className="font-semibold leading-snug text-white">
              Tingling from metalwork is treated as a life-threatening emergency
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              On a TN-C-S (PME) supply a lost neutral can put exposed metalwork — taps, radiators,
              pipes — at up to 230 V with respect to true earth. Stop touching metalwork, switch
              off what you can safely reach, and call the National Grid emergency line on 105 and a
              qualified electrician now. If the fault is on the supply side, the repair is the
              DNO&apos;s responsibility.
            </p>
          </div>
        </div>
      ) : count >= 2 ? (
        <div
          role="status"
          className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-orange-300" aria-hidden />
          <div>
            <p className="font-semibold leading-snug text-white">
              That pattern is strongly consistent with a loose neutral
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Voltage fluctuations damage appliances, and arcing at the loose connection can cause
              fire — have it investigated promptly. The electrician&apos;s checks (all covered
              below): L–N at the consumer unit should sit stable near 230 V; a drop of more than
              10 V when a kettle or shower switches in points at a high-resistance neutral; and an
              N–E reading above 2–3 V indicates a neutral fault. If it is on the supply side, the
              DNO repairs it — call 105.
            </p>
          </div>
        </div>
      ) : count === 1 ? (
        <div
          role="status"
          className="mt-4 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-yellow-400" aria-hidden />
          <div>
            <p className="font-semibold leading-snug text-white">
              One symptom on its own is not conclusive
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Loose-neutral symptoms typically worsen when high-power appliances switch on, because
              the load current increases the voltage drop across the loose connection. Watch
              whether that pattern appears — and if more of the symptoms above show up, have the
              installation investigated.
            </p>
          </div>
        </div>
      ) : null}

      <p className="mt-3 text-xs leading-relaxed text-white">
        A checklist is not a diagnosis — the voltage measurements described in this guide, taken by
        a qualified electrician, are what confirm the fault.
      </p>
    </div>
  );
}
