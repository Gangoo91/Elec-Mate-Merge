/**
 * ZeQuickChecker — instant Ze verdict for the /guides/ze-values-uk page.
 *
 * The queries that land here are lookups ("max ze for tncs") that Google's
 * AI Overview now answers in the SERP, so the page must offer what the SERP
 * cannot: type a reading, get a verdict. Every figure and every verdict
 * sentence is grounded in this page's own body copy — TN-S 0.80 Ω / TN-C-S
 * 0.35 Ω / TT 21 Ω distributor-quoted typical maxima, the typical measured
 * ranges, the query-the-DNO guidance, and the TT RCD rule (Reg 411.5.3:
 * RA × IΔn ≤ 50 V → ≤1,667 Ω for a 30 mA RCD, <200 Ω practical target).
 * Do not add figures here that the page body does not state.
 */
import { useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { trackSeoToolUsed } from '@/lib/analytics-events';

type System = 'TN-S' | 'TN-C-S' | 'TT';

const SYSTEMS: { key: System; label: string; max: string }[] = [
  { key: 'TN-S', label: 'TN-S', max: '0.80 Ω max' },
  { key: 'TN-C-S', label: 'TN-C-S (PME)', max: '0.35 Ω max' },
  { key: 'TT', label: 'TT', max: '21 Ω max' },
];

interface Verdict {
  tone: 'ok' | 'watch' | 'high';
  headline: string;
  detail: string;
}

function verdictFor(system: System, ze: number): Verdict {
  if (system === 'TN-S') {
    if (ze <= 0.8) {
      return {
        tone: 'ok',
        headline: `${ze} Ω is within the TN-S typical maximum of 0.80 Ω`,
        detail:
          ze < 0.2
            ? 'Below the typical measured range for TN-S (0.20–0.80 Ω) — a strong supply with plenty of Zs headroom on every circuit.'
            : 'Inside the typical measured range for TN-S (0.20–0.80 Ω). Remember the headroom left for R1+R2 shrinks as Ze approaches 0.80 Ω.',
      };
    }
    return {
      tone: 'high',
      headline: `${ze} Ω is above the TN-S typical maximum of 0.80 Ω`,
      detail:
        'The supply earth may be compromised — the TN-S cable sheath corrodes at joints over time. Re-check the test, then query the DNO. A high Ze pushes up Zs on every circuit in the installation.',
    };
  }
  if (system === 'TN-C-S') {
    if (ze <= 0.35) {
      return {
        tone: 'ok',
        headline: `${ze} Ω is within the TN-C-S (PME) typical maximum of 0.35 Ω`,
        detail:
          ze <= 0.25
            ? 'Typical for a modern urban PME supply (most measure 0.15–0.25 Ω; short runs to the transformer read 0.10–0.15 Ω).'
            : 'At the upper end of the typical measured range (0.10–0.35 Ω) but still acceptable.',
      };
    }
    return {
      tone: 'high',
      headline: `${ze} Ω is above the TN-C-S (PME) typical maximum of 0.35 Ω`,
      detail:
        'Possibly a poor neutral connection in the supply cable or a fault on the DNO network. Re-check the test, then query the DNO — the supply earth may be compromised.',
    };
  }
  // TT
  if (ze <= 21) {
    return {
      tone: 'ok',
      headline: `${ze} Ω is at or below the 21 Ω figure used by the BS 7671 tables`,
      detail:
        'A strong result for a TT electrode — typical measured values run from 10 Ω to 200+ Ω depending on soil conditions.',
    };
  }
  if (ze <= 200) {
    return {
      tone: 'watch',
      headline: `${ze} Ω is common for a TT electrode`,
      detail:
        'TT protection relies on the RCD, not the loop impedance: Reg 411.5.3 requires RA × IΔn ≤ 50 V, which allows up to 1,667 Ω with a 30 mA RCD. The lower the electrode resistance the better — below 200 Ω is the practical target.',
    };
  }
  if (ze <= 1667) {
    return {
      tone: 'watch',
      headline: `${ze} Ω is above the 200 Ω practical target`,
      detail:
        'Still within Reg 411.5.3 for a 30 mA RCD (RA × IΔn ≤ 50 V allows up to 1,667 Ω), but improving the electrode — a longer rod, a second rod, or better soil contact — is worthwhile. Electrode resistance also varies with season and soil moisture.',
    };
  }
  return {
    tone: 'high',
    headline: `${ze} Ω exceeds 1,667 Ω — fails the TT RCD rule`,
    detail:
      'Reg 411.5.3 requires RA × IΔn ≤ 50 V; with a 30 mA RCD that means the electrode must not exceed 1,667 Ω. The earth electrode needs improving before the installation can comply.',
  };
}

const TONE_STYLES: Record<Verdict['tone'], { card: string; icon: JSX.Element }> = {
  ok: {
    card: 'border-green-500/30 bg-green-500/10',
    icon: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" aria-hidden />,
  },
  watch: {
    card: 'border-yellow-500/30 bg-yellow-500/10',
    icon: <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-400" aria-hidden />,
  },
  high: {
    card: 'border-orange-500/30 bg-orange-500/10',
    icon: <AlertTriangle className="h-5 w-5 shrink-0 text-orange-300" aria-hidden />,
  },
};

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';

export default function ZeQuickChecker() {
  const [system, setSystem] = useState<System>('TN-C-S');
  const [raw, setRaw] = useState('');
  const usedRef = useRef(false);

  const ze = useMemo(() => {
    const n = Number(raw.replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [raw]);

  const verdict = ze !== null ? verdictFor(system, ze) : null;

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'ze_quick_checker', page: window.location.pathname });
  };

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Check your Ze reading
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Pick the earthing arrangement, type the measured Ze, and get the verdict against the
        distributor-quoted typical maximum.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Earthing arrangement">
        {SYSTEMS.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={system === s.key}
            onClick={() => {
              setSystem(s.key);
              markUsed();
            }}
            className={`h-11 rounded-xl border px-2 text-sm transition-colors touch-manipulation ${
              system === s.key ? chipOn : chipOff
            }`}
          >
            <span className="block leading-tight">{s.label}</span>
            <span className="block text-[11px] leading-tight opacity-80">{s.max}</span>
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[12px] font-medium text-white">Measured Ze (Ω)</span>
        <input
          type="text"
          inputMode="decimal"
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            markUsed();
          }}
          placeholder={system === 'TT' ? 'e.g. 68' : 'e.g. 0.28'}
          aria-label="Measured Ze in ohms"
          className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
        />
      </label>

      {verdict ? (
        <div
          role="status"
          className={`mt-4 flex items-start gap-3 rounded-xl border p-4 ${TONE_STYLES[verdict.tone].card}`}
        >
          {TONE_STYLES[verdict.tone].icon}
          <div>
            <p className="font-semibold leading-snug text-white">{verdict.headline}</p>
            <p className="mt-1 text-sm leading-relaxed text-white">{verdict.detail}</p>
          </div>
        </div>
      ) : (
        raw.trim() !== '' && (
          <p className="mt-3 text-sm text-white" role="status">
            Enter the reading as a number in ohms — for example 0.28 or 68.
          </p>
        )
      )}

      <p className="mt-3 text-xs leading-relaxed text-white">
        These are distributor-quoted typical maximum values used by the BS 7671 tables for supplies
        up to 100 A — not a statutory cap. Ze must always be measured and verified on site.
      </p>
    </div>
  );
}
