/**
 * InsuranceCoverChecker — "what cover do I actually need, and what should it
 * cost?" for /guides/electrician-insurance-uk.
 *
 * That page collects ~18k impressions per 28 days but almost no clicks: it
 * ranks page 2 for commercial-investigation queries ("best public liability
 * insurance for electricians", "best business insurance for electricians")
 * while the page itself is purely informational. This tool answers the
 * decision the searcher is actually making — which policies apply to them and
 * the realistic annual cost — without naming or ranking any insurer.
 *
 * EVERY figure is grounded in this page's own body copy and must stay that way:
 *   PL £2m domestic          £150–£400/yr   · £5m/£10m commercial adds £50–£100
 *   Professional indemnity   £80–£200/yr    (£250,000 cover)
 *   Employers liability      £50–£200/yr    (£10m, 1–3 employees; £5m is the legal minimum)
 *   Tools cover              £100–£300/yr   (£5,000–£10,000 of tools)
 * Do not introduce a number the page body does not state, and never name an
 * insurer, broker or scheme in a comparative way.
 *
 * Layout: single column on mobile (chips, 44px targets, edge-to-edge card),
 * two columns from lg: with the result panel sticky beside the questions.
 */
import { useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import { Check, AlertTriangle } from 'lucide-react';

type Staff = 'sole' | 'employer';
type Work = 'domestic' | 'commercial';
type Tools = boolean;

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `flex min-h-11 items-center justify-center rounded-xl border px-3 text-center text-sm leading-tight transition-colors touch-manipulation ${
    active ? chipOn : chipOff
  }`;

interface Policy {
  name: string;
  level: string;
  low: number;
  high: number;
  why: string;
  legal?: boolean;
}

function buildPolicies(staff: Staff, work: Work, certs: boolean, tools: Tools): Policy[] {
  const out: Policy[] = [];

  out.push(
    work === 'commercial'
      ? {
          name: 'Public liability',
          level: '£5m – £10m',
          low: 250,
          high: 600,
          why: 'Commercial clients and main contractors typically require £5 million or £10 million. Going up from £2 million often adds only £50 to £100 a year, so take the higher level if you do any commercial work.',
        }
      : {
          name: 'Public liability',
          level: '£2m',
          low: 150,
          high: 400,
          why: '£2 million is the standard for domestic work and the minimum most competent person schemes require as a condition of registration.',
        }
  );

  if (staff === 'employer') {
    out.push({
      name: 'Employers liability',
      level: '£5m minimum (£10m typical)',
      low: 50,
      high: 200,
      why: 'A legal requirement under the Employers Liability (Compulsory Insurance) Act 1969 the moment you employ anyone — including an apprentice. The fine is £2,500 for every day you are uninsured.',
      legal: true,
    });
  }

  if (certs) {
    out.push({
      name: 'Professional indemnity',
      level: '£100,000 – £500,000',
      low: 80,
      high: 200,
      why: 'Covers claims arising from certification errors, design work and advice. If you sign EICs, EICRs or Minor Works certificates, other parties rely on them.',
    });
  }

  // The page prices tools cover for ONE band only — "£5,000 to £10,000: £100 to
  // £300 per year". Pricing the other bands would mean inventing figures the
  // page cannot back, so the question is a straight include/exclude and the
  // copy says plainly where the number comes from.
  if (tools) {
    out.push({
      name: 'Tools and equipment cover',
      level: '£5,000 – £10,000 of tools',
      low: 100,
      high: 300,
      why: 'Van insurance usually excludes tools or caps them at £250 to £500, and a multifunction tester alone is £800 to £1,500. This range is for £5,000 to £10,000 of cover — carry substantially more and expect to pay above it.',
    });
  }

  return out;
}

export default function InsuranceCoverChecker() {
  const [staff, setStaff] = useState<Staff>('sole');
  const [work, setWork] = useState<Work>('domestic');
  const [certs, setCerts] = useState(true);
  const [tools, setTools] = useState<Tools>(true);
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'insurance_cover_checker', page: window.location.pathname });
  };

  const policies = buildPolicies(staff, work, certs, tools);
  const low = policies.reduce((s, p) => s + p.low, 0);
  const high = policies.reduce((s, p) => s + p.high, 0);

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-white lg:text-[17px]">
        What cover do you actually need?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Four taps for the policies that apply to your setup and what they should cost a year. No
        sign-up and no quote form — work out what you need first, then go shopping.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        {/* Questions */}
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">Do you employ anyone?</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['sole', 'Just me'],
                  ['employer', 'I employ people'],
                ] as [Staff, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={staff === key}
                  onClick={() => {
                    setStaff(key);
                    markUsed();
                  }}
                  className={chip(staff === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">What work do you take on?</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['domestic', 'Domestic only'],
                  ['commercial', 'Commercial too'],
                ] as [Work, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={work === key}
                  onClick={() => {
                    setWork(key);
                    markUsed();
                  }}
                  className={chip(work === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">
              Do you sign certificates (EIC, EICR, Minor Works)?
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  [true, 'Yes'],
                  [false, 'No'],
                ] as [boolean, string][]
              ).map(([key, label]) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={certs === key}
                  onClick={() => {
                    setCerts(key);
                    markUsed();
                  }}
                  className={chip(certs === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">
              Include cover for your tools?
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  [true, 'Yes'],
                  [false, 'No'],
                ] as [Tools, string][]
              ).map(([key, label]) => (
                <button
                  key={String(key)}
                  type="button"
                  aria-pressed={tools === key}
                  onClick={() => {
                    setTools(key);
                    markUsed();
                  }}
                  className={chip(tools === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Result */}
        <div role="status" aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-4 lg:p-5">
            <p className="text-[12px] font-medium uppercase tracking-wider text-white">
              Your likely annual cost
            </p>
            <p className="mt-1 text-3xl font-bold text-elec-yellow">
              £{low.toLocaleString()} – £{high.toLocaleString()}
              <span className="text-base font-semibold text-white"> a year</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              Excludes van insurance, which runs £600 to £1,500 a year on business use. Every premium
              here is a fully allowable business expense.
            </p>

            <ul className="mt-4 space-y-3">
              {policies.map((p) => (
                <li key={p.name} className="border-t border-white/[0.08] pt-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-start gap-2 text-sm font-semibold text-white">
                      {p.legal ? (
                        <AlertTriangle
                          className="mt-0.5 h-4 w-4 shrink-0 text-orange-300"
                          aria-hidden
                        />
                      ) : (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                      )}
                      <span>
                        {p.name}
                        {p.legal ? (
                          <span className="ml-2 rounded bg-orange-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-orange-300">
                            Legally required
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-elec-yellow">
                      £{p.low}–£{p.high}
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-[13px] leading-relaxed text-white">
                    <span className="font-medium">{p.level}.</span> {p.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white">
            Indicative UK market ranges for a sole trader or small firm, not a quote. Your own
            premium depends on turnover, claims history, the work you take on and your excess.
          </p>
        </div>
      </div>
    </div>
  );
}
