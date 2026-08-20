/**
 * ApprenticeWageChecker — instant "what should I be paid?" answer for
 * /guides/apprentice-electrician-salary.
 *
 * The queries landing on that page are lookups the SERP now part-answers, so
 * the page offers the two-tap version: pick your situation, see the hourly
 * rate. Every figure is grounded in this page's own body copy — statutory
 * rates from 1 April 2026 (£8.00 apprentice; £10.85 ages 18–20; £12.71 NLW
 * 21+) and the JIB Industrial Determination stage rates from 5 January 2026
 * (£8.16/£10.60/£13.05/£14.03 national; £9.14/£11.88/£14.62/£15.72 London).
 * Do not add figures the page body does not state.
 */
import { useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';

type Path = 'jib' | 'statutory';
type Stage = 0 | 1 | 2 | 3;
type AgeBand = 'under19' | '19-20' | '21plus';

const JIB_NATIONAL = ['£8.16', '£10.60', '£13.05', '£14.03'];
const JIB_LONDON = ['£9.14', '£11.88', '£14.62', '£15.72'];

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `h-11 rounded-xl border px-3 text-sm transition-colors touch-manipulation ${active ? chipOn : chipOff}`;

function statutoryRate(age: AgeBand, firstYear: boolean): { rate: string; why: string } {
  if (age === 'under19') {
    return {
      rate: '£8.00',
      why: 'The apprentice minimum wage rate applies to all apprentices aged under 19, whatever year they are in (from 1 April 2026).',
    };
  }
  if (firstYear) {
    return {
      rate: '£8.00',
      why: 'Apprentices aged 19 or over are on the apprentice rate for the first year of the apprenticeship only (from 1 April 2026).',
    };
  }
  if (age === '19-20') {
    return {
      rate: '£10.85',
      why: 'From the second year onwards at ages 18–20 you are entitled to the age-group minimum wage (from 1 April 2026).',
    };
  }
  return {
    rate: '£12.71',
    why: 'From the second year onwards at 21 or over you are entitled to the National Living Wage (from 1 April 2026).',
  };
}

export default function ApprenticeWageChecker() {
  const [path, setPath] = useState<Path>('jib');
  const [stage, setStage] = useState<Stage>(0);
  const [london, setLondon] = useState(false);
  const [age, setAge] = useState<AgeBand>('under19');
  const [firstYear, setFirstYear] = useState(true);
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'apprentice_wage_checker', page: window.location.pathname });
  };

  const jibRate = (london ? JIB_LONDON : JIB_NATIONAL)[stage];
  const statutory = statutoryRate(age, firstYear);

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        What should you be paid?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Pick your situation and see the hourly rate that applies in 2026.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Employer type">
        <button
          type="button"
          aria-pressed={path === 'jib'}
          onClick={() => {
            setPath('jib');
            markUsed();
          }}
          className={chip(path === 'jib')}
        >
          JIB-registered employer
        </button>
        <button
          type="button"
          aria-pressed={path === 'statutory'}
          onClick={() => {
            setPath('statutory');
            markUsed();
          }}
          className={chip(path === 'statutory')}
        >
          Statutory minimum
        </button>
      </div>

      {path === 'jib' ? (
        <>
          <div className="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="JIB stage">
            {[0, 1, 2, 3].map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={stage === s}
                onClick={() => {
                  setStage(s as Stage);
                  markUsed();
                }}
                className={chip(stage === s)}
              >
                Stage {s + 1}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Rate area">
            <button
              type="button"
              aria-pressed={!london}
              onClick={() => {
                setLondon(false);
                markUsed();
              }}
              className={chip(!london)}
            >
              National standard
            </button>
            <button
              type="button"
              aria-pressed={london}
              onClick={() => {
                setLondon(true);
                markUsed();
              }}
              className={chip(london)}
            >
              JIB London rate area
            </button>
          </div>
          <div role="status" className="mt-4 rounded-xl border border-white/[0.14] bg-white/[0.04] p-4">
            <p className="text-2xl font-bold text-elec-yellow">
              {jibRate}
              <span className="text-base font-semibold text-white"> per hour</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              JIB Industrial Determination rate from 5 January 2026. One rate covers all your hours,
              including off-the-job training days. Stage rises are linked to passing your
              qualifications as well as time served.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Age band">
            {(
              [
                ['under19', 'Under 19'],
                ['19-20', '19–20'],
                ['21plus', '21+'],
              ] as [AgeBand, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={age === key}
                onClick={() => {
                  setAge(key);
                  markUsed();
                }}
                className={chip(age === key)}
              >
                {label}
              </button>
            ))}
          </div>
          {age !== 'under19' && (
            <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Apprenticeship year">
              <button
                type="button"
                aria-pressed={firstYear}
                onClick={() => {
                  setFirstYear(true);
                  markUsed();
                }}
                className={chip(firstYear)}
              >
                First year
              </button>
              <button
                type="button"
                aria-pressed={!firstYear}
                onClick={() => {
                  setFirstYear(false);
                  markUsed();
                }}
                className={chip(!firstYear)}
              >
                Second year onwards
              </button>
            </div>
          )}
          <div role="status" className="mt-4 rounded-xl border border-white/[0.14] bg-white/[0.04] p-4">
            <p className="text-2xl font-bold text-elec-yellow">
              {statutory.rate}
              <span className="text-base font-semibold text-white"> per hour</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">{statutory.why}</p>
            <p className="mt-2 text-sm leading-relaxed text-white">
              This is the legal floor, not the going rate — many electrical employers, particularly
              JIB-registered contractors, pay significantly above it.
            </p>
          </div>
        </>
      )}

      <p className="mt-3 text-xs leading-relaxed text-white">
        Statutory rates apply from 1 April 2026 and are reviewed every April; JIB rates are set by
        the JIB Industrial Determination from 5 January 2026.
      </p>
    </div>
  );
}
