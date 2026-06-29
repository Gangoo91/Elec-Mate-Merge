import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm5-s3-cadence',
    question: 'What is the BS EN 50172:2024 / BS 5266-1:2025 testing cadence for an emergency lighting installation?',
    options: [
      'An annual full duration test only, with no shorter-interval checks in between.',
      'Daily indicator check, monthly functional, annual duration and five-yearly photometric.',
      'A single verification at install, then no recurring tests for the life of the system.',
      'A weekly functional test only, replacing the monthly and annual cycles entirely.',
    ],
    correctIndex: 1,
    explanation:
      'Four overlapping cadences: a daily visual check on the central battery panel (or self-test summary indicator) where provided; a monthly functional test on every luminaire; an annual full duration test; and (NEW in BS 5266-1:2025) a five-yearly point-by-point photometric survey on the defined escape route. Each catches a different failure mode — daily catches whole-system fault flags, monthly catches step-change luminaire failures, annual catches battery capacity decay, five-yearly catches gradual lux output decay. Missing any one leaves a category of failure undetected.',
  },
  {
    id: 'elm5-s3-fiveyear',
    question: 'What does the new five-yearly photometric requirement actually verify?',
    options: [
      'The lamp colour temperature against the original commissioning specification.',
      'That the installation still delivers the design lux on the defined escape route.',
      'The battery weight, as an indirect indicator of remaining electrolyte and capacity.',
      'The operation of the local test switch and key-switch at each luminaire position.',
    ],
    correctIndex: 1,
    explanation:
      'The five-yearly photometric is a measurement, not an inspection: point-by-point lux meter readings against the design and the BS EN 1838 minima. It catches gradual luminaire output decay (LED depreciation, optic fogging, lamp ageing), battery capacity loss reducing emergency-mode output, and environmental changes (new partitions, obstructions, finishes) that affect light delivery. The lux meter on the floor of the escape route is the diagnostic instrument — it catches the slow decay of delivered lux that is invisible to the eye and to functional tests.',
  },
  {
    id: 'elm5-s3-tolerance',
    question: 'What is the practical tolerance on monthly functional tests?',
    options: [
      'Any time within the year, provided twelve functional tests are completed in total.',
      'Within the calendar month for which the test is due, ideally on a fixed week.',
      'Within 6 months of the due date, matching a relaxed half-yearly tolerance band.',
      'No tolerance at all — the test must fall on the exact same calendar date each month.',
    ],
    correctIndex: 1,
    explanation:
      'Within the calendar month is the working tolerance. Standard practice is to fix each monthly test to a set week (e.g. first Monday) for predictability; a slip of a few days within the same month is normal, but slipping into the following month is a non-conformance against the 2025 consistency expectation. Self-test systems maintain the schedule automatically; manual testing requires calendar discipline. A test that habitually slips by several weeks eventually misses entire months — the schedule has been lost.',
  },
  {
    id: 'elm5-s3-daily',
    question: 'What is the daily check expected on a central battery installation?',
    options: [
      'A full battery discharge to confirm the rated duration is available that day.',
      'A brief visual check of the panel indicators — green healthy, anything else investigate.',
      'A planned replacement of the central battery cells on a daily rotation schedule.',
      'A point-by-point lux survey of the escape route to confirm delivered illuminance.',
    ],
    correctIndex: 1,
    explanation:
      'The daily check is a brief visual scan of the central battery panel indicators — typically a green "system healthy" LED. If any fault LED shows (charge, battery, supply, communications, or individual circuit fault), the responsible person investigates and arranges remediation. It takes seconds but catches step-change faults early; without it a panel fault might go unnoticed for weeks until the monthly test. It is a duty of the on-site responsible person, recorded in the daily check book. Self-contained installations have no single panel and rely on the monthly walk-through instead.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which set best describes the periodic test cadences for emergency lighting under BS EN 50172 / BS 5266-1?',
    options: [
      'Daily indicator check on the central battery panel; monthly functional test on every luminaire; annual full-duration (typically 3 h) test; five-yearly photometric verification of the escape route.',
      'Weekly functional test of the panel; six-monthly partial-duration test; annual photometric survey; ten-yearly full inspection.',
      'Monthly indicator check; quarterly functional test; annual photometric survey; five-yearly duration test.',
      'Daily duration test; monthly photometric survey; annual indicator check; five-yearly functional test.',
    ],
    correctAnswer: 0,
    explanation:
      'The cadences are daily indicator, monthly functional, annual duration and five-yearly photometric — each catching a different failure mode — plus the underlying BS 7671 periodic inspection on its own cycle.',
  },
  {
    id: 2,
    question: 'Why is the five-yearly photometric (lux) verification of the escape route important?',
    options: [
      'Because the original design calculation must be legally re-issued every five years to remain valid.',
      'Because escape-route widths change over a building\'s life and the survey re-measures them against the fire strategy.',
      'Because the lux meter itself must be re-calibrated on site every five years and the survey is the calibration record.',
      'Because lux output decays over time — LED depreciation, fogged optics, ageing lamps, battery capacity loss and new obstructions all erode delivered light, which the year-zero design calculation cannot capture.',
    ],
    correctAnswer: 3,
    explanation:
      'Delivered lux is a degradable parameter. The design calculation is only a year-zero snapshot; the five-yearly survey verifies the installation still delivers what it was designed to deliver years later.',
  },
  {
    id: 3,
    question: 'A monthly functional test due in March is not carried out until 5 April. How should this be treated?',
    options: [
      'As acceptable, because a monthly test only needs to fall within the same quarter as its due date.',
      'As a non-conformance — the test should have been done within March; the slip and its cause must be recorded in the logbook and corrective action taken.',
      'As acceptable, because the April test simply replaces the missed March one with no record needed.',
      'As grounds to defer the next test by a full year to reset the schedule cleanly.',
    ],
    correctAnswer: 1,
    explanation:
      'Schedule consistency matters: monthly within the calendar month, annual within the 12-month anniversary. A few weeks of drift per cycle compounds and eventually loses the cadence, so the slip is logged as a non-conformance.',
  },
  {
    id: 4,
    question: 'Who carries out the daily indicator check on a central battery installation?',
    options: [
      'The maintenance contractor, who must attend site every working day for this purpose.',
      'A specialist commissioning engineer, because reading the panel status requires manufacturer training.',
      'The on-site responsible person (e.g. building or facilities manager, or a trained delegate), as a brief daily glance at the panel.',
      'Whichever occupant happens to pass the panel, since the check is informal and unrecorded.',
    ],
    correctAnswer: 2,
    explanation:
      'The daily check is a duty of the on-site responsible person, built into daily building rounds — brief but high-leverage. The maintenance contractor attends monthly, annually and five-yearly, not daily.',
  },
  {
    id: 5,
    question: 'For a self-contained luminaire installation with no central battery panel, how is the daily check duty satisfied?',
    options: [
      'By replacing each luminaire battery daily as a precaution against undetected failure.',
      'By running a short duration test each morning on a sample of luminaires.',
      'By the maintenance contractor attending daily, since there is no panel for the responsible person to read.',
      'There is no single panel to check, so the monthly functional test is the routine, backed by user reporting; an addressable self-test controller can restore a daily-check focal point.',
    ],
    correctAnswer: 3,
    explanation:
      'The daily-check duty in BS EN 50172 is specifically for central battery installations. Self-contained systems rely on the monthly cadence and user reporting, with an addressable controller adding daily-check capability where fitted.',
  },
  {
    id: 6,
    question: 'What is the practical scheduling tolerance on the annual duration test?',
    options: [
      'It may be carried out at any convenient point within a rolling two-year window.',
      'It must fall within six months of the previous test to remain valid.',
      'Within the 12-month anniversary of the previous test, with a small documented tolerance — typically fixed to the same calendar month each year.',
      'There is no tolerance: the test must be performed on the exact calendar date each year.',
    ],
    correctAnswer: 2,
    explanation:
      'The working interpretation is the 12-month anniversary with a small tolerance. Scheduling it for the same month every year (e.g. always October) is the simplest way to keep the cadence predictable.',
  },
  {
    id: 7,
    question: 'What does the five-yearly photometric survey involve in practice?',
    options: [
      'A representative photograph of each escape route taken in emergency mode and filed with the logbook.',
      'A point-by-point lux-meter survey of the escape route in emergency mode, on the design grid, with a calibrated meter, recorded against the design value, the commissioning baseline and the BS EN 1838 minima.',
      'A quick walk of the escape route confirming every luminaire illuminates when the supply is interrupted.',
      'A battery-capacity discharge test on each luminaire, logging the run-time achieved against the rated duration.',
    ],
    correctAnswer: 1,
    explanation:
      'It is a real measurement exercise: calibrated meter, design grid, point-by-point, against three references. The output is a tabulated report comparable with the commissioning baseline — the comparison is the diagnostic.',
  },
  {
    id: 8,
    question: 'A photometric survey finds two escape-route points reading 0.6 lx and 0.7 lx, where the design was 1.5 lx and the BS EN 1838 minimum is 1 lx. What is the correct response?',
    options: [
      'Record the readings and re-check at the next five-yearly survey, since one survey could be in error.',
      'Clean the optics on those luminaires and close the action, as dirt is the only plausible cause of a lux drop.',
      'Note the readings as within tolerance, because only one mode of three is below the design figure.',
      'Treat both points as non-compliant (below the BS EN 1838 minimum), investigate the root cause, remediate, re-survey, and inform the responsible person in writing.',
    ],
    correctAnswer: 3,
    explanation:
      'Below the BS EN 1838 minimum is non-compliance. Investigation, remediation and re-survey is the disciplined response; documenting the position to the responsible person discharges the contractor\'s duty.',
  },
  {
    id: 9,
    question: 'How do self-test electronic logs fit into the BS 5266-1 logbook?',
    options: [
      'They wholly replace the logbook, removing the need for any human-led inspection records.',
      'They cannot be used, because the logbook must be a single paper document held on site.',
      'They are downloaded and attached as appendices, forming the logbook together with the competent person\'s review, visual records, photometric results and BS 7671 verification.',
      'They are accepted only as paper printouts, never as the native electronic file.',
    ],
    correctAnswer: 2,
    explanation:
      'Electronic logs are one component of the logbook, ratified by the competent person\'s review and supplemented by the human-led elements. Insurers and fire authorities increasingly prefer them because they cannot be backdated.',
  },
  {
    id: 10,
    question: 'How does the emergency-lighting test regime relate to the BS 7671 EICR cycle?',
    options: [
      'The EICR replaces the emergency-lighting regime once a building reaches a five-yearly inspection point.',
      'They are unrelated and never cross-reference one another in the compliance record.',
      'The emergency-lighting regime applies only abroad, while the EICR is the sole UK requirement.',
      'They are parallel cycles — the lighting regime covers luminaire performance, the EICR covers the underlying wiring — and they cross-reference, both being needed for compliance.',
    ],
    correctAnswer: 3,
    explanation:
      'Parallel, cross-referenced cycles: the lighting regime tests the lighting performance, the EICR assesses the wiring condition. Both apply, both have schedules, and both feed the responsible person\'s evidence pack.',
  },
];

const EmergencyLightingModule5Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Monthly and annual testing requirements | Emergency Lighting Module 5.3 | Elec-Mate',
    description:
      'BS EN 50172:2024 / BS 5266-1:2025 four-cadence testing regime: daily indicator check, monthly functional test, annual 3-hour duration test, and five-yearly photometric verification (NEW 2025).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3"
            title="Monthly and annual testing requirements"
            description="The four-cadence periodic regime that BS EN 50172:2024 and BS 5266-1:2025 require: daily indicator check on central battery panels, monthly functional test on every luminaire, annual full 3-hour duration test, and the five-yearly photometric survey that the 2025 update made explicit. Cadences, tolerances, scheduling, and how the cycles overlap to catch every category of failure."
            tone="yellow"
          />

          <TLDR
            points={[
              'Four-cadence regime: DAILY visual check (central battery panel indicator), MONTHLY functional test (every luminaire), ANNUAL full 3-hour duration test, FIVE-YEARLY photometric verification (NEW 2025).',
              'Each cadence catches a different category of failure. Skipping any one leaves a blind spot.',
              'Daily check is a duty of the on-site responsible person; the maintenance contractor visits monthly / annually / five-yearly.',
              '2025 emphasis on schedule consistency: monthly within calendar month, annual within 12-month anniversary. Slippage compounds.',
              'Five-yearly photometric (NEW 2025) — point-by-point lux meter survey on the defined escape route. Catches gradual lux output decay invisible to functional tests.',
              'Self-test luminaires automate monthly and annual testing; they do not replace the photometric survey, the visual inspection, or the BS 7671 verification.',
              'EICR (BS 7671 periodic inspection) runs on its own cycle in parallel — typically 5-yearly for commercial fixed wiring; both schedules apply.',
              'Logbook records every cadence — paper or electronic — contemporaneous, signed by competent person.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the four periodic test cadences specified by BS EN 50172:2024 / BS 5266-1:2025: daily, monthly, annual, five-yearly',
              'Explain what each cadence is intended to verify and what category of failure it catches',
              'Apply the daily indicator check on a central battery installation, identifying the responsible person duty',
              'Schedule monthly functional tests within the calendar month, with documented tolerance for unavoidable deviations',
              'Schedule annual full duration tests within the 12-month anniversary of the previous duration test',
              'Carry out the five-yearly photometric verification (NEW 2025): calibrated lux meter, design grid, comparison against design / baseline / BS EN 1838 minima',
              'Integrate self-test electronic logs with the human-led elements (visual, photometric, BS 7671) to form the complete BS 5266-1 logbook',
              'Coordinate the emergency lighting cycles with the BS 7671 EICR cycle to ensure both schedules are kept',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four-cadence regime</ContentEyebrow>

          <ConceptBlock
            title="Why four cadences?"
            plainEnglish="Different categories of failure happen at different rates. Step-change failures (a fuse blows, a luminaire dies) can happen any time and need a frequent check to catch them quickly. Gradual battery capacity decay happens slowly and needs an annual full-duration test to expose it. Gradual luminaire output decay (LED depreciation, optic fogging) happens over years and needs a five-yearly survey. The four-cadence regime — daily, monthly, annual, five-yearly — is engineered so that each category of failure has a check whose frequency matches the rate at which the failure occurs. Skipping any cadence leaves that category undetected until something worse exposes it."
            onSite="Think of it as a screen sieve. Daily catches the obvious immediate failures. Monthly catches the step-change failures since the last monthly. Annual catches the slow capacity decay that monthly misses. Five-yearly catches the very slow output decay that annual misses. Each filter has a different mesh size."
          >
            <p>The four cadences and what they catch:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily — visual indicator check.</strong> Central battery panel "system healthy" green LED, or self-test addressable controller summary status. Catches: panel faults, charge faults, supply faults, comms faults flagged in real time. Duty of the on-site responsible person; takes seconds per panel.
              </li>
              <li>
                <strong>Monthly — functional test.</strong> Brief mains-fail simulation, every luminaire observed, fault flags reviewed. Catches: failed luminaires (battery, lamp, electronics), miswiring, self-test fault flags, fault flags raised since last test. Maintenance contractor (or self-test automation).
              </li>
              <li>
                <strong>Annual — full duration test.</strong> Full discharge for rated duration (3 h typical), every luminaire observed at end of test, recovery to ≥ 80% within 24 h confirmed. Catches: gradual battery capacity decay, charger problems, undersized batteries (rare), insulation degradation increasing self-discharge. Maintenance contractor (or self-test automation).
              </li>
              <li>
                <strong>Five-yearly — photometric verification (NEW 2025).</strong> Calibrated lux meter on defined escape route, point-by-point at design grid, comparison to design / baseline / BS EN 1838 minima. Catches: LED output depreciation, optic fogging, environmental changes (new partitions, new finishes), luminaire substitutions that changed performance. Competent person with calibrated meter.
              </li>
            </ul>
            <p>
              The cadences are layered. A failure that happens this week is caught at the next monthly test — within four weeks. A failure that develops over a year is caught at the next annual test — within twelve months. A failure that develops over years is caught at the next five-yearly survey. The system never has more than the relevant cadence period of unverified status.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 12.2 (Periodic inspection cadence)"
            clause={
              <>
                Inspection and testing of the emergency lighting installation shall be carried out at the following intervals: a daily indicator check on central battery panels where provided; monthly functional testing of each luminaire; annual full duration testing of the rated emergency operating time; and at intervals not exceeding five years, photometric verification by point-by-point measurement on the defined escape route.
              </>
            }
            meaning="Four cadences explicitly specified. The five-year photometric is the 2025 emphasis — previous versions were less explicit on the periodic photometric, and many installations skipped it. The 2025 wording removes the ambiguity."
          />

          <RegsCallout
            source="BS EN 50172:2024 · Clause 7.4 (Test records and intervals)"
            clause={
              <>
                Records of all periodic tests shall be maintained including the date of each test, the result, any defects identified, and corrective actions taken. The records shall be kept available for inspection by the responsible person and by the appropriate authorities. Test intervals shall be kept consistent — monthly tests within the calendar month and annual tests within the twelve-month anniversary.
              </>
            }
            meaning="Records are mandated; consistency of intervals is mandated. The clause makes clear that drift in scheduling is itself a non-conformance, separate from any individual test failure."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Testing cadence calendar diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Testing cadence calendar — daily / monthly / annual / five-yearly
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Calendar grid showing the four-cadence testing regime: daily indicator check (every day), monthly functional test (one day per month), annual full duration test (one day per year), and five-yearly photometric survey (NEW 2025) on a five-year cycle."
            >
              {/* Title bar */}
              <rect x="20" y="20" width="780" height="36" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="410" y="44" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                BS EN 50172:2024 / BS 5266-1:2025 · four-cadence testing regime
              </text>

              {/* Daily row */}
              <rect x="20" y="80" width="780" height="80" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="40" y="106" fill="#22C55E" fontSize="12" fontWeight="bold">DAILY</text>
              <text x="40" y="124" fill="rgba(255,255,255,0.7)" fontSize="10">Visual indicator check</text>
              <text x="40" y="138" fill="rgba(255,255,255,0.55)" fontSize="9">central battery panel · system healthy LED</text>
              <text x="40" y="152" fill="rgba(255,255,255,0.55)" fontSize="9">duty of on-site responsible person</text>
              {/* Daily ticks across */}
              {Array.from({ length: 30 }).map((_, i) => (
                <circle key={i} cx={300 + i * 16} cy={120} r="2.5" fill="#22C55E" />
              ))}
              <text x="555" y="140" fill="rgba(34,197,94,0.7)" fontSize="9">~ daily tick</text>

              {/* Monthly row */}
              <rect x="20" y="170" width="780" height="80" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="40" y="196" fill="#22D3EE" fontSize="12" fontWeight="bold">MONTHLY</text>
              <text x="40" y="214" fill="rgba(255,255,255,0.7)" fontSize="10">Functional test (every luminaire)</text>
              <text x="40" y="228" fill="rgba(255,255,255,0.55)" fontSize="9">5-15 min mains-fail simulation</text>
              <text x="40" y="242" fill="rgba(255,255,255,0.55)" fontSize="9">tolerance: within calendar month</text>
              {/* Monthly markers */}
              {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                <g key={i}>
                  <rect x={300 + i * 40} y={200} width="32" height="32" rx="4" fill="rgba(34,211,238,0.12)" stroke="#22D3EE" strokeWidth="1" />
                  <text x={316 + i * 40} y={220} textAnchor="middle" fill="#22D3EE" fontSize="9" fontWeight="bold">{m}</text>
                </g>
              ))}

              {/* Annual row */}
              <rect x="20" y="260" width="780" height="80" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.4" />
              <text x="40" y="286" fill="#A855F7" fontSize="12" fontWeight="bold">ANNUAL</text>
              <text x="40" y="304" fill="rgba(255,255,255,0.7)" fontSize="10">Full duration test (typically 3 h)</text>
              <text x="40" y="318" fill="rgba(255,255,255,0.55)" fontSize="9">recovery ≥ 80% within 24 h · BS EN 50171/50172</text>
              <text x="40" y="332" fill="rgba(255,255,255,0.55)" fontSize="9">tolerance: 12-month anniversary</text>
              {/* Annual markers */}
              {[1,2,3,4,5].map((y, i) => (
                <g key={i}>
                  <rect x={350 + i * 80} y={285} width="48" height="36" rx="4" fill="rgba(168,85,247,0.14)" stroke="#A855F7" strokeWidth="1" />
                  <text x={374 + i * 80} y={300} textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">Y{y}</text>
                  <text x={374 + i * 80} y={314} textAnchor="middle" fill="#A855F7" fontSize="8">3-h dur.</text>
                </g>
              ))}

              {/* Five-yearly row — NEW 2025 */}
              <rect x="20" y="350" width="780" height="100" rx="8" fill="rgba(239,68,68,0.06)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="40" y="376" fill="#EF4444" fontSize="12" fontWeight="bold">FIVE-YEARLY</text>
              <text x="40" y="394" fill="rgba(251,191,36,0.95)" fontSize="10" fontWeight="bold">⚠ NEW emphasis BS 5266-1:2025</text>
              <text x="40" y="410" fill="rgba(255,255,255,0.7)" fontSize="10">Photometric verification</text>
              <text x="40" y="424" fill="rgba(255,255,255,0.55)" fontSize="9">point-by-point lux on defined escape route</text>
              <text x="40" y="438" fill="rgba(255,255,255,0.55)" fontSize="9">vs design · vs baseline · vs BS EN 1838 minima</text>
              {/* Five-year marker */}
              <g>
                <rect x="680" y="370" width="80" height="60" rx="6" fill="rgba(239,68,68,0.18)" stroke="#EF4444" strokeWidth="1.6" />
                <text x="720" y={394} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Y5</text>
                <text x="720" y={410} textAnchor="middle" fill="#EF4444" fontSize="9">photometric</text>
                <text x="720" y={422} textAnchor="middle" fill="#EF4444" fontSize="9">survey</text>
              </g>

              {/* What each catches */}
              <text x="40" y="478" fill="rgba(255,255,255,0.55)" fontSize="9">
                <tspan fill="#22C55E" fontWeight="bold">Daily</tspan> catches step-change panel faults · <tspan fill="#22D3EE" fontWeight="bold">Monthly</tspan> catches step-change luminaire failures
              </text>
              <text x="40" y="494" fill="rgba(255,255,255,0.55)" fontSize="9">
                <tspan fill="#A855F7" fontWeight="bold">Annual</tspan> catches gradual battery capacity decay · <tspan fill="#EF4444" fontWeight="bold">Five-yearly</tspan> catches gradual lux output decay
              </text>
              <text x="40" y="510" fill="rgba(255,255,255,0.55)" fontSize="9">
                Each cadence has a different mesh size — skipping any leaves that category of failure undetected
              </text>
              <text x="40" y="528" fill="rgba(251,191,36,0.7)" fontSize="9" fontWeight="bold">
                Plus parallel BS 7671 EICR cycle (typically 5-yearly for commercial fixed wiring)
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Daily check — the responsible person duty</ContentEyebrow>

          <ConceptBlock
            title="The brief check that catches step-change faults"
            plainEnglish="On a central battery installation, the central battery panel is the diagnostic eye on the system. A green 'system healthy' LED says everything is in normal state; any other indication says something needs investigation. The daily check is a glance at the panel — done as part of the building's daily opening rounds — to catch any new fault flag promptly. Without it, a fault that occurred at the panel just after the last monthly maintenance visit could persist undetected for nearly a month."
          >
            <p>The daily check method:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify the panel.</strong> Central battery panel location is documented; the responsible person knows where it is. Typically in a fire-rated battery room or plant area.
              </li>
              <li>
                <strong>Observe the indicators.</strong> Green "system healthy" LED illuminated. Any amber/red fault LED, audible alarm, or unusual indication is a flag.
              </li>
              <li>
                <strong>Record the check.</strong> A daily check book (paper) or electronic log entry. Date, initials, observation (typically just "Healthy" if all green).
              </li>
              <li>
                <strong>If a fault is flagged.</strong> Note the specific indication (which LED, any text on the panel display). Call the maintenance contractor with the description. Do NOT silence alarms or reset faults without competent advice.
              </li>
              <li>
                <strong>Frequency.</strong> Daily means each business day for offices; each opening day for retail; each shift change for 24-h operations. The intent is that no fault persists more than approximately one day before being noticed.
              </li>
            </ul>
            <p>
              For self-contained installations (no central battery panel), the equivalent is a self-test addressable controller display where one is provided. Where neither is provided, the daily-check duty does not apply in the same form — the monthly cadence becomes the primary check, supplemented by user reporting of any fault-flagged luminaires.
            </p>
          </ConceptBlock>

          <Scenario
            title="Daily check catches an early fault"
            situation="Wednesday morning building opening. The duty manager glances at the central battery panel as part of the daily rounds. The system-healthy LED is no longer green; an amber 'battery fault' LED is illuminated. The panel display reads 'CELL 6 LOW VOLTAGE'."
            whatToDo="Record the observation in the daily check book. Telephone the maintenance contractor with the panel reading. Do not attempt to silence or reset. The contractor schedules a visit, brings replacement cells (or a replacement battery string), tests the battery, replaces the failed cell, retests, and returns the system to 'healthy' state. The fault is documented in the BS 5266-1 logbook with the date noticed (the daily-check date), the date attended, the corrective action, and the post-repair verification. The amber LED is replaced with green; the daily check the next day confirms 'healthy' state."
            whyItMatters="Without the daily check, the fault would have been noticed at the next monthly functional test — up to four weeks later. During that period the battery would have been operating with one failed cell, reducing total capacity. A real mains failure during that period would have found the battery delivering less than rated duration. The daily check turned a potential 4-week deficit into a 1-day deficit."
          />

          <SectionRule />

          <ContentEyebrow>Monthly cadence — within the calendar month</ContentEyebrow>

          <ConceptBlock
            title="The monthly schedule"
            plainEnglish="The monthly functional test is the workhorse cadence. Every luminaire is observed; every fault flag is reviewed; every step-change failure since the last test is caught. The schedule discipline is to keep this on a predictable rhythm — a fixed week of each month, a fixed day where possible — so the cadence is naturally maintained. Slippage of a few days within the same month is normal; slipping into the following month is a non-conformance against the 2025 schedule consistency expectation."
          >
            <p>Monthly schedule discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fix the week.</strong> First Monday of the month is a common choice — predictable, visible in the contract calendar, easy to plan around. Alternatives (last Friday, mid-month) work equally — pick one and stick to it.
              </li>
              <li>
                <strong>Self-test automation.</strong> Self-test luminaires can be programmed to test on a fixed schedule (e.g. test on the 5th of each month, all luminaires staggered through the day). The automation enforces the cadence; the human review is monthly.
              </li>
              <li>
                <strong>Tolerance.</strong> Within the calendar month for which the test is due. A test that slips from late March to early April is a non-conformance — the March cadence has been missed and the April cadence is being moved up to compensate, which compresses the next interval.
              </li>
              <li>
                <strong>Documentation of slippage.</strong> Where a test must slip outside the month (genuine site access denied, unforeseen circumstances), document in the logbook the reason, the corrective action, and the prevention of recurrence. Repeated slippage is a contract issue.
              </li>
              <li>
                <strong>Coordination with other safety system tests.</strong> Where the contractor maintains both fire alarm (BS 5839-1:2025 user / weekly tests) and emergency lighting, the monthly cadences can be aligned for site visit efficiency. Avoid scheduling on the same day as a fire drill (which itself stresses systems).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Annual cadence — within the 12-month anniversary</ContentEyebrow>

          <ConceptBlock
            title="The annual schedule"
            plainEnglish="The annual full duration test is the most time-intensive cadence — a 3-hour discharge plus 24-hour recovery monitoring is a real time commitment. Predictable scheduling is therefore essential. The standard practice is to schedule the duration test for the same calendar month each year (e.g. always October) so the responsible person, the contractor, and the building can plan around it. Slippage by a few weeks within the anniversary month is normal; slipping by months without justification is a non-conformance."
          >
            <p>Annual schedule discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Anchor month.</strong> Pick a month that suits the building (for offices, August is sometimes good — low occupancy through holidays; for retail, the post-Christmas quiet period; for hospitality, low season). Stick to it year on year.
              </li>
              <li>
                <strong>Anchor week / day.</strong> Within the anchor month, pick a week that aligns with low occupancy. The contract calendar carries the date.
              </li>
              <li>
                <strong>Tolerance.</strong> Within the anniversary month is the working tolerance. Slipping by more than one month is a non-conformance against schedule consistency.
              </li>
              <li>
                <strong>Coordination with photometric (in five-year years).</strong> Every fifth year, the photometric survey is also due. Schedule it to fall in the same week as the duration test — same site visit, single planning event, single documentation update.
              </li>
              <li>
                <strong>Coordination with EICR.</strong> The BS 7671 EICR for commercial fixed wiring is typically 5-yearly. Aligning EICR with the five-year photometric is a useful efficiency — same competent person, same visit, single comprehensive documentation update.
              </li>
            </ul>
            <p>
              The annual cadence is the cadence on which the system's substantive verification depends. Slippage compounds; a year of slip is a year of unverified capacity. Keep the schedule.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The new five-yearly photometric verification</ContentEyebrow>

          <ConceptBlock
            title="The 2025 emphasis explained"
            plainEnglish="The five-yearly photometric verification was always implied in BS 5266-1 — the design lux levels had to be maintained, and the only way to verify that was measurement. But the previous edition was less explicit on the periodic schedule, and many installations relied on the design calculation alone after commissioning. The 2025 update closes this gap by stating the five-year cadence explicitly and treating the photometric survey as a primary periodic verification, on the same standing as the duration test."
            onSite="Plan the five-year photometric as you plan the duration test. Calibrated meter, design grid, time on site (typically a half-day for a substantial installation), comparison report against the commissioning baseline. Insurers and fire authorities increasingly look for this evidence."
          >
            <p>The five-yearly photometric in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Calibrated meter.</strong> Lux meter calibrated within the past 12 months (calibration certificate copied into the survey report). Photopic correction; cosine-corrected sensor head. Without calibration, readings are not legally defensible.
              </li>
              <li>
                <strong>System in emergency mode.</strong> Mains off; system on battery; allow 10-15 minutes for stable output before measuring.
              </li>
              <li>
                <strong>Design grid.</strong> Use the design measurement grid (typically points across the non-excluded width of the escape route at 1-2 m intervals along its length, per BS EN 1838:2024; door thresholds; junctions; stair head/foot). Use the same grid as the commissioning survey for direct comparison.
              </li>
              <li>
                <strong>Measurement plane.</strong> Per design — typically 0.2 m above floor for spatial illumination on escape routes. Use the same plane as commissioning.
              </li>
              <li>
                <strong>Three comparisons per reading.</strong> Compare each measured value to (a) the design value, (b) the commissioning baseline, (c) the BS EN 1838 minimum. Each comparison tells a different story.
              </li>
              <li>
                <strong>Below BS EN 1838 minimum.</strong> Non-compliance. Investigate, remediate, re-survey.
              </li>
              <li>
                <strong>Above minimum but below design and below baseline.</strong> Drift. The system is still legally compliant but the trajectory is concerning. Document, schedule investigation (likely lamp/luminaire change at next cycle).
              </li>
              <li>
                <strong>Above minimum but above baseline.</strong> Unusual — could indicate room finish change (e.g. lighter wall paint reflecting more light) or instrumentation difference. Investigate the cause; document.
              </li>
              <li>
                <strong>Output report.</strong> Tabulated readings against the design grid; comparison columns against design, baseline, BS EN 1838; observations; remediation plan if needed; competent person signature.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 12.4 (Photometric verification cycle)"
            clause={
              <>
                Photometric verification shall be carried out at commissioning and at intervals not exceeding five years thereafter, by point-by-point measurement on the defined escape route using a calibrated photometer. The results shall be compared with the original commissioning measurements and with the design illuminance values, and with the minimum illuminances specified in BS EN 1838. Any non-compliance shall trigger investigation and remediation.
              </>
            }
            meaning="The five-year explicit cadence. Calibrated photometer. Three-way comparison: commissioning baseline, design, BS EN 1838 minima. Non-compliance triggers investigation. The clause is firm — the photometric is a periodic verification, not an optional check."
          />

          <CommonMistake
            title="Treating five-yearly photometric as a 'design refresh'"
            whatHappens="The five-year survey reads above BS EN 1838 minima at every point but generally below the design values. The contractor reports 'compliant' and recommends no action. The responsible person files the report. Five years later, the next survey reads at or just above BS EN 1838 — the long-term decay has continued and there is no headroom. The next year, a real emergency finds some points fall below minima during the discharge as battery output fades. The system fails at the worst time."
            doInstead="The five-year survey is a trajectory tool, not just a pass/fail. Below design but above minimum is a flag — the trajectory says decay is happening. Use this survey as the trigger for planned remediation (luminaire upgrade, lamp replacement, optic clean) so the next five-year survey reads near design again. Without that intervention, the trajectory continues to compliance failure."
          />

          <CommonMistake
            title="Skipping the photometric because 'self-test all green'"
            whatHappens="A fully self-test installation has all luminaires reporting healthy at every monthly and annual cadence. The five-year photometric is due. The contractor argues that since self-test is all green, photometric is unnecessary. The responsible person agrees. No photometric is done. Two years later, an incident review finds the LED arrays in the older luminaires have depreciated to ~60% of original output; the escape route is at 0.6 lx (below the 1 lx BS EN 1838 minimum). The self-test could not have caught this — it tests whether the luminaire is operating, not whether it is delivering design lux."
            doInstead="Self-test catches operation; only the lux meter catches output. They are not substitutes. The 2025 standard is explicit: the five-year photometric is a primary periodic verification. Schedule it; carry it out; report against the three references. Skipping it is non-compliance under the 2025 update — it is no longer an acceptable departure."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Self-test integration with the four cadences</ContentEyebrow>

          <ConceptBlock
            title="What automation does"
            plainEnglish="Self-test luminaires and central addressable controllers automate the schedule discipline for monthly and annual testing. The luminaire enters test mode automatically at the scheduled date, runs the test, logs the result, flags any failure. The competent person reviews the log rather than manually performing each test. This is a real efficiency gain — but only the schedule and the test execution are automated. Visual inspection, photometric verification, and BS 7671 verification remain human-led."
          >
            <p>Self-test integration with each cadence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily — controller display.</strong> Where a central addressable controller is provided, the daily check focal point is the controller display rather than (or in addition to) the central battery panel. Same idea — green = healthy, anything else = investigate.
              </li>
              <li>
                <strong>Monthly — automated functional test.</strong> Every luminaire tests itself; the controller logs results; the competent person reviews the controller log monthly. The review confirms (a) every luminaire tested on schedule, (b) every luminaire passed, (c) any failures have follow-up actions logged.
              </li>
              <li>
                <strong>Annual — automated full duration test.</strong> Every luminaire (or central battery, where applicable) runs the full duration; the controller logs results. The competent person reviews the controller log and verifies recovery.
              </li>
              <li>
                <strong>Five-yearly — STILL human-led.</strong> The luminaire cannot measure delivered lux at the floor. The photometric survey is human-led with a calibrated lux meter; self-test does not replace it.
              </li>
              <li>
                <strong>Visual inspection — STILL human-led.</strong> The luminaire cannot see the room around it. Damaged signage, obstructions, label legibility, environmental concerns — all need human eyes.
              </li>
              <li>
                <strong>BS 7671 verification — STILL human-led.</strong> The luminaire is not testing the wiring. Insulation, continuity, polarity, Zs are on the BS 7671 cycle and need a competent electrical inspector with appropriate instruments.
              </li>
            </ul>
            <p>
              Self-test is a multiplier on competent oversight, not a replacement. The competent person reviews the automated log and signs the BS 5266-1 logbook entry; the review is the ratification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Coordinating with the BS 7671 EICR cycle</ContentEyebrow>

          <ConceptBlock
            title="Two parallel periodic regimes"
            plainEnglish="The emergency lighting periodic regime (daily/monthly/annual/five-yearly) covers the emergency lighting performance. The BS 7671 Electrical Installation Condition Report (EICR) cycle covers the underlying electrical wiring. Both apply; both need to be current; insurers and fire authorities want to see both. They cross-reference: the EICR must include the emergency lighting circuits in the inspection scope; the BS 5266-1 logbook references the most recent EICR."
          >
            <p>Coordination of the two cycles:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>EICR cadence.</strong> Typically 5-yearly for commercial fixed wiring (or per the previous EICR's recommended next inspection date — sometimes 3-yearly for higher-risk premises). The EICR competent person determines the next interval.
              </li>
              <li>
                <strong>Five-year photometric coordination.</strong> Schedule the photometric survey to align with the EICR five-year visit where possible. Same competent person, same visit, single comprehensive documentation update.
              </li>
              <li>
                <strong>Annual duration coordination.</strong> The annual duration test does not align with the EICR cycle (which is 5-yearly), but it sits within the maintenance contract calendar. The contractor schedule typically covers monthly functional, annual duration, five-year photometric, and the EICR (in five-year years) as a single contract.
              </li>
              <li>
                <strong>Cross-references in documentation.</strong> The BS 5266-1 logbook should record the most recent EICR date, certificate reference, and recommended next inspection. The EICR records the emergency lighting circuits as part of its scope and references the BS 5266-1 logbook for the periodic test results.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The cumulative compliance picture</ContentEyebrow>

          <ConceptBlock
            title="What the four cadences look like together over time"
            plainEnglish="Run the four cadences in their proper schedule and the result is a continuous compliance evidence trail. Daily checks are recorded each business day; monthly functional tests fill in once a month; annual duration tests fill in once a year; five-yearly photometric surveys fill in every fifth year; the EICR fills in on its own cycle. The logbook becomes a dense, contemporaneous record. After five years, the evidence base is hundreds of daily entries, sixty monthly entries, five annual entries, one photometric entry, and one EICR — and that pattern repeats. The responsible person can demonstrate compliance with the RRO 2005 to anyone who asks."
          >
            <p>The five-year cumulative picture for a typical commercial installation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily indicator checks</strong> — approximately 1,250 entries over five years (250 business days per year × 5). Each is brief but the cumulative record demonstrates continuous oversight.
              </li>
              <li>
                <strong>Monthly functional tests</strong> — 60 entries over five years. Each is a per-luminaire or per-circuit observation. Pattern of results over time tells the story of the installation's condition.
              </li>
              <li>
                <strong>Annual duration tests</strong> — 5 entries over five years. Each is a substantial event with rated-duration verification, recovery confirmation, fault investigation. The pattern catches end-of-life battery cohorts and informs planned replacement.
              </li>
              <li>
                <strong>Five-yearly photometric</strong> — 1 entry per cycle. Survey report with three-way comparison; trajectory of lux output across the cycle is the key insight.
              </li>
              <li>
                <strong>EICR</strong> — typically 1 per cycle (5-yearly for commercial), aligned with the photometric where possible.
              </li>
            </ul>
            <p>
              The aggregated evidence is what insurers, fire authorities, and tribunals will examine if anything goes wrong. A clean run of records, contemporaneously kept, signed by competent persons, is the practical demonstration that the responsible person has discharged their RRO 2005 duties. Gaps in the record, retroactive entries, or missing cadences expose the responsible person and the contracting chain.
            </p>
          </ConceptBlock>

          <Scenario
            title="Auditor reviews five years of records"
            situation="A fire risk assessor is updating the FRA on a five-year-old commercial building. Part of the assessment is the emergency lighting maintenance evidence. The assessor asks for the BS 5266-1 logbook, the controller logs, the photometric survey records, the EICR, and the contractor's annual reports."
            whatToDo="A clean record set produces: 60 monthly functional test entries (no gaps), 5 annual duration test entries (recovery confirmed for each), 1 five-year photometric report (showing trajectory in line with expectations and confirming sub-minimum-free escape route), 1 current EICR (cross-referencing the emergency lighting circuits), daily check book entries (approximately 1,250). The assessor confirms the periodic regime is being run; updates the FRA; closes the file. Time on site for the assessor: under an hour. The cost of running the regime over the five years has paid for itself in the speed and confidence of the assessment."
            whyItMatters="The records ARE the compliance. A perfectly maintained system with no records is regulatorily indistinguishable from a neglected system. Conversely, a system whose records demonstrate the regime even if some failures and remediations have occurred is well positioned — failures handled visibly are normal operational reality and demonstrate the regime is working."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Four cadences: DAILY indicator check, MONTHLY functional test, ANNUAL full duration test, FIVE-YEARLY photometric survey (NEW emphasis 2025).',
              'Each cadence catches a different category of failure. None is optional.',
              'Daily check is a duty of the on-site responsible person on central battery installations. Self-contained without a controller does not have a daily-check duty in the same form.',
              'Monthly tests within the calendar month; annual tests within 12-month anniversary; photometric surveys within 5-year anniversary. Slippage compounds — keep the schedule.',
              'Five-yearly photometric (NEW 2025) is a real measurement exercise: calibrated meter, design grid, three-way comparison (design / baseline / BS EN 1838 minima).',
              'Self-test luminaires automate monthly and annual testing — they do NOT replace photometric, visual inspection, or BS 7671 verification.',
              'BS 7671 EICR cycle runs in parallel — typically 5-yearly for commercial. Align with the five-year photometric where possible for a single comprehensive visit.',
              'Below BS EN 1838 minimum on photometric = non-compliance, investigate and remediate. Below design but above minimum = drift, plan remediation.',
              'Logbook records every cadence with date, result, faults, corrective action, signature. Electronic logs from self-test are valid as components of the logbook.',
              'Schedule consistency is a 2025 emphasis — the cadence itself is part of the compliance evidence, not just the individual test results.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Does the daily check apply to a small self-contained installation in a small office?',
                answer:
                  'Strictly, no — the daily check duty applies to central battery installations where a panel provides system-level indication. A small self-contained installation (perhaps half a dozen luminaires above exits, no central panel) does not have a single point to check. The monthly functional test is the routine cadence; user reporting of any flagged luminaire is the gap-filler. Where a self-test addressable controller is installed, the controller display becomes a daily-check focal point.',
              },
              {
                question: 'Can the monthly test be carried out by the responsible person rather than the maintenance contractor?',
                answer:
                  'Yes, where the responsible person is competent (training, awareness of the test method, ability to identify and record faults) and the system supports it (test facility provided, accessible, safe to operate). Many smaller installations are tested in-house monthly with the contractor visiting only annually. The competence requirement still applies; the responsible person\'s monthly testing is recorded in the logbook with their signature, ratified by the competent person at the annual visit.',
              },
              {
                question: 'What is the relationship between BS 5266-1:2025 and the previous edition for periodic testing?',
                answer:
                  'The cadences themselves are essentially unchanged — daily / monthly / annual were always required by BS EN 50172. The 2025 update tightens the schedule consistency expectation (less drift, more discipline), makes the five-yearly photometric explicit (previously implied), and tightens the documentation expectations. A site that was running a clean previous-edition regime is well-placed; a site that had drifted is now formally non-compliant.',
              },
              {
                question: 'How does the photometric survey handle a building with multiple escape routes?',
                answer:
                  'Each defined escape route is surveyed separately. The survey grid covers the non-excluded width of each route (per BS EN 1838:2024) at 1-2 m intervals along its length, plus key points (door thresholds, junctions, stair heads/feet). Anti-panic open areas are surveyed on a different grid (typically a 0.5-1 m square grid covering the floor area excluding the 0.5 m perimeter strip). High-risk task areas are surveyed at the working plane on the relevant grid. The BS EN 1838 minima differ for each (1 lx escape full width, 0.5 lx anti-panic, 15 lx high-risk) and the survey records against each.',
              },
              {
                question: 'Can a single contractor cover daily checks across multiple buildings on an estate?',
                answer:
                  'No — the daily check is a building-level duty that needs to be done from inside the building each business day. A contractor visiting daily across multiple sites would be impractical. The duty is delegated to the on-site responsible person at each building (typically the building manager). The contractor visits monthly / annually / five-yearly and reviews the daily check logs at each visit.',
              },
              {
                question: 'How long does a typical five-year photometric survey take?',
                answer:
                  'For a substantial commercial installation (200-400 luminaires, multiple escape routes), a survey is typically a half to full day. Time depends on the route length and complexity; a long single-route corridor takes less time than a multi-floor building with many junctions. The output report (tabulated readings, three-way comparisons, observations) takes additional time off-site to compile. Plan a day on site plus half a day for reporting.',
              },
              {
                question: 'What happens if a five-year photometric reveals widespread sub-minimum readings?',
                answer:
                  'The system is non-compliant and remediation is required. Investigate root cause: are the original luminaires at end of life (LED depreciation past 5+ years), have the optics fogged, has the room finish darkened, are there new obstructions? Remediation typically involves luminaire replacement (most common in older LED installations), optic clean, additional luminaires (if obstructions or layout changes are the cause), or in extreme cases a design revision. Update the documentation pack and re-survey after remediation.',
              },
              {
                question: 'Does the EICR cycle replace the BS 5266-1 logbook entries for the BS 7671 verification?',
                answer:
                  'Partially — the EICR is the formal BS 7671 verification document. The BS 5266-1 logbook references the EICR (date, reference, result) as the supporting evidence for the BS 7671 element of the periodic regime. The logbook does not duplicate the EICR\'s detailed test results; it cross-references them. The EICR itself includes the emergency lighting circuits in its scope and any defects identified are remediated under the EICR follow-up.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Practical scheduling for a typical contract</ContentEyebrow>

          <ConceptBlock
            title="A working calendar for a 200-luminaire commercial installation"
            plainEnglish="The four cadences plus the EICR can sound complex. In practice, on a typical commercial site, they collapse into a manageable contract calendar. Here is what it looks like for a 200-luminaire self-test installation with a central addressable controller, on a five-year contract."
          >
            <p>The contract calendar:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily.</strong> Building manager checks the controller display each morning. Green = healthy, anything else = call contractor. Recorded in the daily check book (paper) or the building management electronic system.
              </li>
              <li>
                <strong>Monthly.</strong> First Thursday of each month, contractor visits for 2-3 hours. Reviews the controller log for the previous month's automated functional tests; investigates any flagged faults; replaces any failed batteries on site (carrying spares); updates the BS 5266-1 logbook with the visit summary; signs.
              </li>
              <li>
                <strong>Annual (October each year).</strong> Last Saturday of October, contractor visits for the duration test. Initiated 18:00, runs to 21:00; observers at start, mid-test, end. Recovery monitored to 24 h post-test through Sunday. Logbook updated with the duration test entry and recovery confirmation.
              </li>
              <li>
                <strong>Five-yearly (October of year 5, 10, 15...).</strong> Coordinated with the annual visit. Photometric survey carried out on the Saturday afternoon (system in emergency mode after the duration test, calibrated meter, design grid). Survey report delivered within 2 weeks. EICR also scheduled for the same calendar quarter — separate visit but coordinated documentation update.
              </li>
              <li>
                <strong>Reactive.</strong> Any fault flagged by the responsible person's daily check (or by an occupant's report) triggers an unscheduled visit. Documented as a reactive entry in the logbook with the fault, attendance time, corrective action, verification.
              </li>
            </ul>
            <p>
              Total contractor visits per year: 12 monthly + 1 annual (or combined annual/photometric in five-year years) + reactive as needed. Total contractor on-site hours per year: approximately 30-50 hours for routine cadences. The calendar is predictable, the costs are budgetable, and the compliance evidence trail builds continuously.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Monthly and annual testing requirements — Module 5.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Labelling and records
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule5Section3;
