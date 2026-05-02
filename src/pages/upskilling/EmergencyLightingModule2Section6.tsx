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
    id: 'elm2-s6-monthly',
    question:
      'What is the BS EN 50172:2024 / BS 5266-1:2025 monthly functional test requirement for emergency lighting luminaires?',
    options: [
      'No monthly test required.',
      'A monthly functional test of EVERY emergency luminaire and every emergency exit sign — simulating mains failure (typically by operating a test key switch or by interrupting the supply at the local DB) and confirming each luminaire energises correctly. Test duration is short (5 minutes is the typical figure used to confirm switchover and battery drive-up) and the test is recorded in the logbook for every luminaire. The monthly test is the load-bearing routine maintenance task and is the responsibility of the responsible person under the Regulatory Reform (Fire Safety) Order 2005 article 17.',
      'Annual test only — monthly is excessive.',
      'One luminaire per floor per month is sufficient.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 50172:2024 §7.2 + BS 5266-1:2025 §12 — monthly functional test of every luminaire and every sign. Short duration (typically 5 min) confirms switchover, battery drive-up, lamp / LED operation. Recorded in the logbook by luminaire reference. The monthly cadence is mandatory — not "best practice" but the standard\'s minimum.',
  },
  {
    id: 'elm2-s6-annual',
    question:
      'What is the BS 5266-1:2025 annual full-duration test requirement?',
    options: [
      'Optional.',
      'A full-duration discharge test of EVERY emergency luminaire — battery is exercised for the full rated duration (1 h or 3 h depending on the system). At the end of the duration, illuminance / luminance must remain at least 50 % of the rated value. After the discharge, the system must recharge fully within 24 h. The annual test is the most aggressive battery test in the regime and is the primary mechanism for catching ageing batteries before they fail in service. Recorded in the logbook with start time, end time, and end-of-duration illuminance reading.',
      'Annual visual check only.',
      '15-minute test only.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 50172:2024 §7.3 + BS 5266-1:2025 §12 — annual full-duration test. 1 h or 3 h discharge, 50 % illuminance retained at the end, 24 h recharge confirmation. The annual test catches battery ageing; many failures appear only in the last 30 minutes of a 3 h discharge and are invisible to the monthly 5-minute test.',
  },
  {
    id: 'elm2-s6-responsible',
    question:
      'Under the Regulatory Reform (Fire Safety) Order 2005 article 17, who is responsible for emergency lighting maintenance?',
    options: [
      'The original installer.',
      'The "responsible person" — typically the building owner or operator. Article 17 imposes a duty on the responsible person to ensure that the emergency lighting (along with other fire safety provisions) is subject to a "suitable system of maintenance" and is "maintained in an efficient state, in efficient working order and in good repair". This is a non-delegable duty; the responsible person can subcontract the testing work to a competent person but retains the legal duty for the outcome. Failures are enforced by the Fire and Rescue Service through audit, prohibition notice, or prosecution.',
      'The Fire and Rescue Service.',
      'No specific person.',
    ],
    correctIndex: 1,
    explanation:
      'RRFSO 2005 article 17 — duty on the responsible person to maintain fire safety provisions, including emergency lighting. Non-delegable; the responsible person can hire a competent person for the testing but the legal duty for the outcome stays with them. Enforced by the Fire and Rescue Service (failure → audit, improvement notice, prohibition notice, or prosecution).',
  },
  {
    id: 'elm2-s6-self-test',
    question:
      'What does BS EN 62034 self-test technology offer in terms of routine maintenance?',
    options: [
      'It eliminates the need for any maintenance.',
      'Automatic self-test luminaires perform the monthly functional test and the annual full-duration test internally (without manual intervention) and report status via an LED indicator on the luminaire face or via an addressable network back to a central monitor. The responsible person still retains the article 17 duty and still needs to record the test results in the logbook, but the labour cost of physically performing the tests is virtually eliminated. Self-test is particularly valuable in large premises with many hundreds of luminaires where manual monthly testing of every luminaire is a significant labour burden.',
      'It removes the need for batteries.',
      'It is prohibited under BS 5266-1:2025.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62034 self-test technology automates the test cycle. The luminaire performs the monthly functional test and the annual full-duration test on schedule, without manual operation. Results report via an LED indicator (red / green / amber) or via an addressable network. Logbook entries can be auto-populated from network data. The responsible person\'s legal duty under RRFSO article 17 is unchanged.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS EN 50172:2024 specifies the monthly emergency lighting test. What does the monthly test involve?',
    options: [
      'A check that no luminaire has been removed from the fitting.',
      'A functional test of EVERY emergency luminaire and exit sign — simulating mains failure and confirming each luminaire energises correctly. Typically 5 minutes\' duration to confirm switchover, battery drive-up, and lamp / LED operation. Performed monthly without exception. Recorded in the logbook by luminaire reference. The monthly test is the routine maintenance backbone of the emergency lighting regime.',
      'Annual replacement of all batteries.',
      'Visual check from the doorway.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50172:2024 §7.2 + BS 5266-1:2025 §12 — monthly functional test of every luminaire and sign. Simulated mains failure (test key switch or DB isolation) for typically 5 minutes. Logbook entry per luminaire. The monthly cadence is mandatory.',
  },
  {
    id: 2,
    question:
      'What is the BS 5266-1:2025 annual test requirement?',
    options: [
      '15-minute test only.',
      'Full-duration discharge test of every luminaire — 1 h or 3 h depending on system rating. Illuminance must remain at least 50 % of rated value at the end of the duration. Recharge confirmed within 24 h. The annual test is the primary mechanism for catching ageing batteries — many battery failures appear only in the last 30 minutes of a 3 h discharge and are invisible to the monthly 5-minute test.',
      'Visual inspection only.',
      'Optional.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §12 + BS EN 50172:2024 §7.3 — annual full-duration test. 1 h or 3 h. 50 % illuminance retention at end. 24 h recharge. Catches battery end-of-life that the monthly short-duration test misses.',
  },
  {
    id: 3,
    question:
      'BS 5266-1:2025 §13 specifies the contents of the emergency lighting logbook. Which of the following is NOT part of the logbook?',
    options: [
      'Date and time of every test, with results.',
      'Personal medical records of staff. The logbook is a technical fire safety document containing: dates and times of all tests, results, identity of the person performing the test, identity and competence of the person responsible, list of luminaires by reference / location, list of replaceable components (batteries, lamps, drivers) with installation dates, list of any faults found and remedial actions taken, copies of commissioning records, copies of design and installation record. Personal medical records, HR records, and unrelated facilities records do not belong in the emergency lighting logbook.',
      'List of all luminaires by reference number.',
      'Battery replacement dates.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §13 — logbook contents: test records, fault records, commissioning records, design and installation record, luminaire schedule, battery replacement dates, competence declarations. The logbook is fire-safety-focused and does not include unrelated personal or HR data.',
  },
  {
    id: 4,
    question:
      'How long must emergency lighting test records typically be retained?',
    options: [
      '1 year.',
      '6 years (typical, aligned with the Regulatory Reform (Fire Safety) Order 2005 article 17 enforcement window). Some premises retain records for the lifetime of the installation. Higher-Risk Buildings under the Building Safety Act 2022 retain golden-thread fire safety information for the lifetime of the building. The logbook is part of the building\'s permanent fire safety record and should be transferred with the building on sale or change of management. Loss of the logbook is treated as evidence of failed maintenance.',
      '1 month.',
      'No retention required.',
    ],
    correctAnswer: 1,
    explanation:
      '6 years is the typical retention period aligned with RRFSO 2005 article 17 enforcement window. Higher-Risk Buildings under the Building Safety Act 2022 retain for building lifetime. Logbook is permanent fire safety record; transfers with the building on sale or operational handover.',
  },
  {
    id: 5,
    question:
      'Under the Regulatory Reform (Fire Safety) Order 2005, what enforcement actions can the Fire and Rescue Service take where emergency lighting maintenance has failed?',
    options: [
      'No enforcement.',
      'Range of escalating actions: alteration notice (requiring works to be done before any change), enforcement notice (requiring identified deficiencies to be remediated), prohibition notice (immediate prohibition of use of the premises pending remediation), and prosecution under the Order. Penalties on conviction can include unlimited fines and up to 2 years\' imprisonment for corporate officers. Insurers may also void cover where the responsible person is found to have failed in the article 17 maintenance duty. The escalation depends on the severity of the failure and the responsible person\'s history of compliance.',
      'A polite reminder only.',
      'Tax penalty.',
    ],
    correctAnswer: 1,
    explanation:
      'RRFSO 2005 + Fire and Rescue Services Act 2004 — enforcement: alteration notice, enforcement notice, prohibition notice, prosecution. Unlimited fines and up to 2 years\' imprisonment on conviction. Insurance implications layered on top. Maintenance failure is taken seriously by enforcement authorities, particularly post-Grenfell.',
  },
  {
    id: 6,
    question:
      'BS 5266-1:2025 introduced a new requirement for the person carrying out emergency lighting design and major remedial work. What is it?',
    options: [
      'No requirement.',
      'The person must be a "competent person" — defined as a person with the training, qualifications, and experience to undertake the work. The competence requirement applies both to the original designer (Module 2 §4) and to anyone undertaking subsequent material modifications or major repairs. Acceptable evidence includes IEng / CEng with relevant emergency lighting experience, ICEL qualifications, manufacturer-specific design certification, or documented experience under a chartered engineer. The 2025 edition makes this explicit; previously it was implied by general industry practice.',
      'Anyone may carry out the work.',
      'Only the original installer.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §5.2 — competent person requirement for design and major remedial work. Documented competence; signed declaration as part of the design and installation record. The 2025 edition makes the requirement explicit; pre-2025 it was implied by general industry practice.',
  },
  {
    id: 7,
    question:
      'What is the most common cause of emergency luminaire failure detected at routine testing?',
    options: [
      'Bulb removal by occupants.',
      'Battery end-of-life. Sealed lead-acid (SLA) and nickel-cadmium (NiCd) emergency lighting batteries have typical service life of 4 to 5 years; lithium iron phosphate (LiFePO4) extends to 8 to 10 years. Battery failure typically appears as inability to hold charge for the full rated duration — the luminaire passes the monthly 5-minute test but fails the annual full-duration discharge. Common at end-of-life: reduced terminal voltage under load, internal cell shorting, electrolyte loss. Other common failures (lamp / LED end-of-life, charger fault, supply fault) are less frequent and easier to detect at the monthly test.',
      'Dust accumulation.',
      'Cosmic rays.',
    ],
    correctAnswer: 1,
    explanation:
      'Battery end-of-life is the most common failure mode. Detected at the annual full-duration test (the 5-minute monthly test is too short to expose end-of-life batteries). Plan a battery replacement programme aligned with battery service life (4 to 5 years SLA / NiCd; 8 to 10 years LiFePO4) to pre-empt failures.',
  },
  {
    id: 8,
    question:
      'BS EN 62034 self-test luminaires automate routine testing. What article 17 RRFSO duty remains with the responsible person?',
    options: [
      'None — self-test removes all duty.',
      'The responsible person retains the legal duty under RRFSO 2005 article 17 to ensure the emergency lighting is in efficient working order. Self-test luminaires perform the tests and record results, but the duty to ensure that the test results are reviewed, that any failures are remediated, that records are retained, and that the system as a whole is maintained — that duty is non-delegable. The responsible person can outsource the work to a competent person but cannot outsource the legal responsibility. Self-test reduces labour cost; it does not reduce legal exposure.',
      'Only signage duty.',
      'Only initial purchase duty.',
    ],
    correctAnswer: 1,
    explanation:
      'RRFSO 2005 article 17 imposes a non-delegable duty on the responsible person. Self-test luminaires reduce labour, not legal exposure. Self-test results must be reviewed, faults remediated, records retained — all by or for the responsible person.',
  },
  {
    id: 9,
    question:
      'A facilities manager notices that 15 of 200 emergency luminaires fail the annual full-duration test in 2026. What is the appropriate action?',
    options: [
      'Ignore — the building is mostly compliant.',
      'Document the failure in the logbook, isolate the failed luminaires from the system if necessary, source replacement batteries / luminaires from a competent supplier, schedule the remediation work, retest after replacement, update the logbook with the resolution, and review the maintenance regime to identify why so many failed simultaneously (likely a batch of batteries reaching end-of-life together). Notify the responsible person of the findings and the remediation plan. Failures of more than about 5 % of the system in a single test cycle suggest a systemic issue — possibly a co-installed battery batch — and warrant a comprehensive battery replacement programme rather than a one-by-one fix.',
      'Buy any cheap replacement batteries.',
      'Wait until next year\'s test.',
    ],
    correctAnswer: 1,
    explanation:
      'Document → isolate (if needed) → source replacements → schedule remediation → retest → update logbook → review regime. 7.5 % failure rate suggests systemic issue (batch ageing). Plan comprehensive replacement; do not fix one-by-one and discover the rest fail next year.',
  },
  {
    id: 10,
    question:
      'BS 5266-1:2025 §13 requires the design and installation record to be retained. Where does this fit within the Building Safety Act 2022 regime?',
    options: [
      'It is unrelated to the Building Safety Act.',
      'It forms part of the "golden thread" of fire safety information for Higher-Risk Buildings under the Building Safety Act 2022. The golden thread is the building\'s permanent record of fire safety design, construction, and maintenance — required to be retained for the lifetime of the building, transferred with ownership / management changes, and accessible to the Building Safety Regulator on demand. The emergency lighting design and installation record, plus the ongoing logbook of test results, sits within the golden thread alongside fire risk assessments, fire engineering reports, and other fire safety documentation. For non-Higher-Risk Buildings, the same documents are required by BS 5266-1:2025 but the golden thread terminology does not formally apply — best practice is to retain to the same standard regardless.',
      'Only for residential buildings.',
      'Only for hotels.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 + Building Safety Act 2022 — emergency lighting records form part of the golden thread for Higher-Risk Buildings. Lifetime retention; transferred with ownership; accessible to the Building Safety Regulator. For non-HRB premises the documents are still required by BS 5266-1:2025 but the formal golden-thread regime does not apply (although best practice is to follow the same retention standard).',
  },
];

const EmergencyLightingModule2Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Testing and record keeping | Emergency Lighting Module 2.6 | Elec-Mate',
    description:
      'BS EN 50172:2024 / BS 5266-1:2025 testing regime: daily check, monthly functional test, annual full-duration test, logbook contents, RRFSO 2005 article 17 duties, BS EN 62034 self-test luminaires, retention and enforcement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6"
            title="Testing and record keeping"
            description="The maintenance regime that keeps emergency lighting actually emergency-ready. BS EN 50172:2024 + BS 5266-1:2025 set the testing cadence: daily check (CPS only), monthly functional test of every luminaire and sign, and annual full-duration discharge test. The logbook records every test against every luminaire. The Regulatory Reform (Fire Safety) Order 2005 article 17 puts the legal duty on the responsible person; BS EN 62034 self-test luminaires automate the labour."
            tone="yellow"
          />

          <TLDR
            points={[
              'Daily check (central battery / CPS systems only): visual inspection of CPS indicators and any monitoring panel. Confirms healthy state of central infrastructure. Self-contained luminaire systems do not require a daily check.',
              'Monthly functional test (BS EN 50172:2024 §7.2 + BS 5266-1:2025 §12): every emergency luminaire and exit sign tested by simulated mains failure, typically 5 minutes\' duration. Confirms switchover, battery drive-up, lamp / LED operation. Logged per luminaire.',
              'Annual full-duration discharge test (BS EN 50172:2024 §7.3): every luminaire exercised for full rated duration (1 h or 3 h). Illuminance retained ≥ 50 % at end of duration. Recharge within 24 h. Catches battery end-of-life that the monthly short test misses.',
              'Logbook contents (BS 5266-1:2025 §13): test records, fault records, commissioning records, design and installation record, luminaire schedule, battery replacement dates, competence declarations. Retained typically 6 years (RRFSO article 17 enforcement window) or for building lifetime if a Higher-Risk Building under the Building Safety Act 2022.',
              'Responsible person duties (RRFSO 2005 article 17): non-delegable legal duty to maintain emergency lighting in efficient working order. Subcontract the work to competent persons; the duty stays with the responsible person.',
              'Competent person requirement (BS 5266-1:2025 §5.2): designer and major-remedial-work person must be documented competent. ICEL qualifications, IEng / CEng with relevant experience, manufacturer certifications.',
              'BS EN 62034 self-test luminaires: automate the monthly and annual tests, report status via LED or addressable network. Reduce labour but not legal duty.',
              'Common test failures: battery end-of-life (most common), lamp / LED end-of-life, charger fault, supply fault. Battery typical service life: 4 to 5 years SLA / NiCd, 8 to 10 years LiFePO4. Plan replacement programmes.',
              'Enforcement: Fire and Rescue Service audit, alteration notice, enforcement notice, prohibition notice, prosecution. Unlimited fines and up to 2 years\' imprisonment for corporate officers on conviction.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 50172:2024 / BS 5266-1:2025 testing cadence (daily, monthly, annual) and what each test covers',
              'Perform a monthly functional test and an annual full-duration discharge test on representative luminaires',
              'Maintain a BS 5266-1:2025 §13 logbook and identify the mandatory contents',
              'Apply the Regulatory Reform (Fire Safety) Order 2005 article 17 duties to a real building scenario',
              'Recognise the BS 5266-1:2025 competent-person requirement and the role of the design and installation record',
              'Specify BS EN 62034 self-test luminaires where labour cost of manual testing is high',
              'Diagnose common test failures (battery end-of-life, lamp / LED, charger, supply) and plan remediation',
              'Calculate retention periods for test records and explain the Building Safety Act 2022 golden-thread implications',
              'Explain enforcement actions available to the Fire and Rescue Service and the consequences of maintenance failure',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The testing cadence — daily, monthly, annual</ContentEyebrow>

          <ConceptBlock
            title="Three layers of routine testing"
            plainEnglish="The emergency lighting testing regime under BS EN 50172:2024 and BS 5266-1:2025 has three concentric layers. The innermost is the daily check, which applies only to central battery / CPS systems and is a quick visual inspection of the CPS indicators. The middle layer is the monthly functional test, which applies to every luminaire and exit sign in the system and is the routine maintenance backbone. The outermost is the annual full-duration discharge test, which exercises the batteries for their full rated duration and is the primary mechanism for catching ageing batteries before they fail in service. Each layer catches different failure modes; missing any one creates a maintenance gap."
            onSite="The monthly test is the load-bearing routine. Set a calendar reminder, walk the building with a test key in one hand and a logbook in the other, work through the luminaire schedule, record each test result. The annual is bigger but rarer; the monthly is the rhythm."
          >
            <p>The three test layers in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily check (CPS systems only).</strong> Visual inspection of the central
                battery system: confirm healthy indicator (typically green LED), no fault lights,
                no audible alarms, battery temperature within range. Performed by site staff at
                the start of each working day. Self-contained luminaire systems do not require a
                daily check (no centralised infrastructure to inspect). Records: a daily log entry
                with a tick or note of any issue.
              </li>
              <li>
                <strong>Monthly functional test.</strong> Every emergency luminaire and exit sign
                tested by simulated mains failure. Test key switch operated, or local DB isolated.
                Each luminaire confirmed energising correctly. Typical test duration 5 minutes —
                long enough to verify switchover, battery drive-up, and steady illumination; short
                enough to avoid significant battery drain. Recorded in the logbook by luminaire
                reference. Done monthly without exception.
              </li>
              <li>
                <strong>Annual full-duration discharge test.</strong> Every luminaire held on
                emergency battery for the full rated duration (1 h or 3 h depending on system
                design). Illuminance / luminance must remain at least 50 % of rated value at the
                end of the duration. After discharge, the system must recharge fully within 24 h.
                The annual test is the most aggressive battery test in the regime; many failures
                appear only in the last 30 minutes of a 3 h discharge and are invisible to the
                monthly 5-minute test.
              </li>
              <li>
                <strong>Recharge verification.</strong> After each annual discharge, confirm full
                recharge within 24 h by inspection of CPS / battery management system data, or by
                a follow-up functional test 24 h after the discharge. A system that fails to
                recharge fully within 24 h has a charger or battery problem and is not fit for
                service until rectified.
              </li>
              <li>
                <strong>Test scheduling.</strong> Avoid carrying out the annual full-duration test
                during high-occupancy hours — the test takes the system out of emergency service
                during the discharge, and a coincident mains failure during the test would leave
                no emergency illumination. Best practice is to test out-of-hours or in low-occupancy
                periods, or to test in zones so that any single zone is offline for only a portion
                of the period.
              </li>
              <li>
                <strong>Test records.</strong> Logbook entry per test per luminaire. Date, time,
                luminaire reference, test type (monthly / annual), result (pass / fail), tester
                name. Faults flagged for remedial action.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · §7 (Routine inspection and test)"
            clause={
              <>
                The system shall be subject to routine inspection and test as follows: (a) daily,
                visual inspection of the indicators of any central power supply system to confirm
                normal operation; (b) monthly, simulation of failure of the normal lighting supply
                and verification of the operation of every emergency luminaire and sign for a
                period sufficient to verify their function (typically not less than 5 min); (c)
                annually, simulation of failure of the normal lighting supply and verification of
                the operation of every emergency luminaire and sign for the full rated duration of
                the system. The system shall recover to full charge within 24 h.
              </>
            }
            meaning="Three explicit layers in the standard. Daily for CPS only. Monthly functional, typically 5 minutes per luminaire. Annual full-duration. Recovery within 24 h. The cadence is mandatory; the standard does not permit a longer interval."
          />

          {/* Diagram: testing-regime calendar timeline */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Testing-regime calendar — daily / monthly / annual cadence with self-test option
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Twelve-month calendar timeline showing daily checks every working day for central battery systems, monthly functional tests at the start of each month for every luminaire, annual full-duration discharge test once per year typically out of hours, and the BS EN 62034 self-test option that automates the cadence with results reported via LED indicator or addressable network."
            >
              <text x="410" y="22" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                EMERGENCY LIGHTING TESTING REGIME — daily / monthly / annual
              </text>
              <text x="410" y="38" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 50172:2024 §7 · BS 5266-1:2025 §12 · BS EN 62034 self-test
              </text>

              {/* 12 month timeline */}
              <line x1="60" y1="120" x2="780" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
                const x = 60 + (i * (720 / 11));
                return (
                  <g key={`month-${m}`}>
                    <line x1={x} y1="115" x2={x} y2="125" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
                    <text x={x} y="106" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                      {m}
                    </text>
                  </g>
                );
              })}

              {/* Daily check tick marks (CPS only) */}
              <text x="60" y="148" fill="#22D3EE" fontSize="10" fontWeight="bold">
                Daily check (CPS only)
              </text>
              {Array.from({ length: 60 }, (_, i) => 60 + (i * (720 / 60))).map((x, i) => (
                <line key={`d-${i}`} x1={x} y1="155" x2={x} y2="161" stroke="#22D3EE" strokeWidth="1" />
              ))}
              <text x="780" y="174" textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="9">
                visual indicator check, no luminaire test
              </text>

              {/* Monthly functional test markers */}
              <text x="60" y="202" fill="#A855F7" fontSize="10" fontWeight="bold">
                Monthly functional test (every luminaire + sign, ≈ 5 min)
              </text>
              {Array.from({ length: 12 }, (_, i) => 60 + (i * (720 / 11))).map((x, i) => (
                <g key={`m-${i}`}>
                  <circle cx={x} cy="218" r="6" fill="rgba(168,85,247,0.95)" />
                  <text x={x} y="221" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    M
                  </text>
                </g>
              ))}
              <text x="780" y="240" textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="9">
                BS EN 50172:2024 §7.2 + BS 5266-1:2025 §12
              </text>

              {/* Annual full-duration test marker */}
              <text x="60" y="268" fill="#EF4444" fontSize="10" fontWeight="bold">
                Annual full-duration discharge (1 h or 3 h, every luminaire)
              </text>
              <g>
                <rect x="540" y="280" width="60" height="22" rx="4" fill="rgba(239,68,68,0.85)" />
                <text x="570" y="295" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  ANNUAL
                </text>
              </g>
              <text x="780" y="296" textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="9">
                ≥ 50 % illuminance retained at end · recharge ≤ 24 h
              </text>

              {/* Self-test option box */}
              <rect x="60" y="320" width="720" height="100" rx="10" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.4" />
              <text x="80" y="344" fill="#22D3EE" fontSize="11" fontWeight="bold">
                BS EN 62034 self-test option:
              </text>
              <text x="80" y="362" fill="rgba(255,255,255,0.7)" fontSize="10">
                Automated monthly and annual tests, results via LED indicator or addressable network.
              </text>
              <text x="80" y="380" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reduces labour for monthly testing of large luminaire counts; logbook auto-populated.
              </text>
              <text x="80" y="398" fill="#EF4444" fontSize="10" fontWeight="bold">
                RRFSO 2005 art. 17 duty stays with responsible person — not removed by automation.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Performing the monthly functional test</ContentEyebrow>

          <ConceptBlock
            title="What you actually do, luminaire by luminaire"
            plainEnglish="The monthly functional test is performed by simulating mains failure for typically 5 minutes and confirming each luminaire energises correctly. In practice this means walking the building with a test key (or operating the local DB isolation), starting at one end of the schedule, and ticking each luminaire as you confirm its operation. For self-contained luminaires the test is local: a key switch or push button on each luminaire (or on a circuit-level test point). For central battery / CPS systems the test is at the CPS or at a circuit-level test point. The tester records the result in the logbook against the luminaire reference."
          >
            <p>The practical test sequence for self-contained systems:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule.</strong> Pick a low-occupancy hour. Notify the responsible person
                and any affected occupants. Have the luminaire schedule and the logbook to hand.
              </li>
              <li>
                <strong>Operate the test key.</strong> Turn the key switch (or operate the test
                push button) on the luminaire — or operate the circuit-level test switch on the
                local DB. The luminaire transitions to emergency mode (battery drive).
              </li>
              <li>
                <strong>Verify illumination.</strong> Confirm the luminaire is producing light at
                emergency level. For non-maintained luminaires, the lamp / LED illuminates from
                cold; for maintained luminaires, the lamp / LED stays illuminated through the
                transition.
              </li>
              <li>
                <strong>Hold for typically 5 minutes.</strong> The 5-minute period verifies that
                the battery is supporting the lamp / LED, not just providing initial drive-up.
                Some testers hold for as little as 1 minute (sufficient for switchover verification)
                but 5 minutes is the typical figure.
              </li>
              <li>
                <strong>Restore mains.</strong> Release the test key / restore the DB. Confirm the
                luminaire returns to normal mode. For maintained luminaires the lamp / LED stays
                on; for non-maintained it switches off.
              </li>
              <li>
                <strong>Record.</strong> Logbook entry: date, luminaire reference, result (pass /
                fail), tester name. Failures flagged for remedial action.
              </li>
              <li>
                <strong>Repeat for every luminaire.</strong> The standard is "every luminaire"
                without exception; sample testing is not permitted. For a building with many
                luminaires this is significant labour — see the self-test option below.
              </li>
              <li>
                <strong>Test cycle.</strong> Some installations test all luminaires on a single day
                each month; others split the test across the month (e.g. 25 % per week) to spread
                the labour. Either approach is acceptable; the requirement is that every luminaire
                is tested in each calendar month.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §12.2 (Monthly functional test)"
            clause={
              <>
                Every emergency luminaire and emergency exit sign shall be subject, at intervals
                not exceeding one month, to a functional test simulating failure of the normal
                lighting supply, of duration sufficient to verify the function of the luminaire and
                its supply. The test shall be recorded in the logbook required by §13.
              </>
            }
            meaning={`Every luminaire, every month, no exceptions. The standard does not permit sample testing or longer intervals. The "duration sufficient to verify function" is interpreted as 5 minutes typical; some sources cite 1 minute as a minimum but the practical norm is 5 minutes.`}
          />

          <SectionRule />

          <ContentEyebrow>Performing the annual full-duration test</ContentEyebrow>

          <ConceptBlock
            title="The big one — and the one that catches dying batteries"
            plainEnglish="The annual full-duration test is the most aggressive battery test in the regime. The system is held on emergency battery for the full rated duration (1 h or 3 h) and the illuminance / luminance is measured at the end of the duration to confirm at least 50 % of rated value is retained. The test is the primary mechanism for detecting batteries approaching end-of-life — many batteries pass the monthly 5-minute test but fail in the last 30 minutes of a 3 h discharge because the cell capacity has degraded. Without the annual test, end-of-life batteries continue in service until they actually fail during a real emergency."
          >
            <p>The practical test sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule out-of-hours where possible.</strong> The test takes the system
                out of emergency service during the discharge. A coincident mains failure during
                the test would leave no emergency illumination. Best practice: test out-of-hours
                or in low-occupancy periods, or test in zones so that any single zone is offline
                for only a portion of the rated duration.
              </li>
              <li>
                <strong>Pre-test charge.</strong> Confirm batteries fully charged for at least 24 h
                before the test. Test on a partially-charged battery produces an artificially short
                discharge time and a false fail.
              </li>
              <li>
                <strong>Initiate discharge.</strong> Operate the test key / DB isolation. Start a
                stopwatch (or note the time). Luminaires transition to emergency mode.
              </li>
              <li>
                <strong>Walk the building partway through.</strong> At about 30 minutes (for a 1 h
                test) or 1 hour (for a 3 h test) confirm all luminaires still illuminated. Note
                any that have failed early; these batteries are seriously degraded.
              </li>
              <li>
                <strong>Hold for full rated duration.</strong> 1 h or 3 h. At the end of the
                duration, walk the building with a lux meter / luminance meter. Each luminaire and
                sign must read at least 50 % of rated value.
              </li>
              <li>
                <strong>Restore mains.</strong> Release the test key / DB isolation. System returns
                to normal mode. Begin recharge timing.
              </li>
              <li>
                <strong>24 h recharge confirmation.</strong> 24 hours after restoration, perform a
                short functional test (typically 1 minute) on a sample of luminaires to confirm the
                batteries have recovered. Or, for CPS systems, inspect the battery management
                system data to confirm full recharge.
              </li>
              <li>
                <strong>Record.</strong> Logbook entry per luminaire: date, start time, end time,
                end-of-duration illuminance / luminance reading, recharge confirmation. Failures
                flagged for battery / luminaire replacement.
              </li>
              <li>
                <strong>Battery replacement programme.</strong> Failures detected at the annual
                test typically appear in clusters because batteries installed at the same time age
                at the same rate. A failure rate over about 5 % at one annual test indicates the
                battery population is reaching end-of-life and a comprehensive replacement
                programme should be planned.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §12.3 (Annual full-duration test)"
            clause={
              <>
                Every emergency luminaire and emergency exit sign shall be subject, at intervals
                not exceeding twelve months, to a test of the full rated duration of the
                installation. At the end of the rated duration each luminaire and sign shall
                continue to provide an illuminance or luminance of not less than 50 % of the
                value declared by the manufacturer. After the test, the system shall be confirmed
                to have recharged to full capacity within 24 h. The test results shall be recorded
                in the logbook.
              </>
            }
            meaning="Every luminaire, every 12 months, full rated duration, 50 % illuminance retention, 24 h recharge. The four conditions are concurrent — failing any one is a test fail and triggers remediation. Most failures appear at the end of the duration; the test is calibrated to expose end-of-life batteries."
          />

          <CommonMistake
            title="Annual full-duration test only on a sample of luminaires"
            whatHappens="A facilities manager, faced with the labour of testing 250 luminaires annually for 3 h each, decides to test only 25 % of luminaires each year on a rolling basis. After 4 years every luminaire has been tested annually-equivalent. Logbook shows pass results for the tested luminaires. At a fire risk assessment the auditor identifies the sampling regime. BS EN 50172:2024 §7.3 + BS 5266-1:2025 §12.3 require annual testing of every luminaire — sampling is not permitted. The audit issues an enforcement notice to perform full annual tests on all luminaires. Significant out-of-cycle labour required."
            doInstead="Test every luminaire annually as the standard requires. For large estates where the labour cost is significant, consider BS EN 62034 self-test luminaires that automate the test cycle and report results via an addressable network. Self-test eliminates the manual labour while keeping every luminaire annually tested. The capital cost of self-test luminaires is offset over a few years by labour savings."
          />

          <SectionRule />

          <ContentEyebrow>The logbook — BS 5266-1:2025 §13</ContentEyebrow>

          <ConceptBlock
            title="What goes in the logbook and why it matters"
            plainEnglish="The logbook is the permanent record of the emergency lighting installation. BS 5266-1:2025 §13 specifies the contents in detail. It is not just a test record; it is a comprehensive technical document covering the design, installation, maintenance, and any modifications throughout the life of the system. The logbook is fire-safety-focused and forms part of the building's permanent fire safety information. Loss of the logbook is treated as evidence of failed maintenance under RRFSO 2005 article 17."
          >
            <p>BS 5266-1:2025 §13 logbook contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Design and installation record.</strong> The signed competent-designer
                record covering risk assessment outputs, photometric calculations, luminaire
                schedule, circuit topology, commissioning results, competence declaration. Forms
                the technical baseline of the installation.
              </li>
              <li>
                <strong>Luminaire schedule.</strong> Every luminaire and sign in the system listed
                by reference, location, type, function (escape route / anti-panic / high-risk task /
                exit sign), rated duration, battery type, installation date.
              </li>
              <li>
                <strong>Test records.</strong> Date and time of every test, type (monthly /
                annual), luminaire reference, result (pass / fail), tester name. The bulk of the
                logbook over time.
              </li>
              <li>
                <strong>Fault records.</strong> Any fault found at testing or in service: date
                identified, luminaire reference, nature of fault, remedial action taken, date
                resolved. Cross-reference to test records.
              </li>
              <li>
                <strong>Battery replacement records.</strong> Date and luminaire reference of every
                battery replacement, plus battery type and capacity. Used to plan future replacement
                programmes.
              </li>
              <li>
                <strong>Modification records.</strong> Any changes to the system: new luminaires,
                changes of layout, change of duration, change of luminaire type. Cross-reference
                to design and installation record updates.
              </li>
              <li>
                <strong>Commissioning records.</strong> Original commissioning sheets, including
                illuminance measurements, response time tests, full-duration tests at handover.
              </li>
              <li>
                <strong>Competence declarations.</strong> Designer competence declaration (BS
                5266-1:2025 §5.2), competence of testers / maintainers, contractor accreditations.
              </li>
              <li>
                <strong>Risk assessment outputs.</strong> Fire risk assessment outputs that drove
                the design (anti-panic triggers, high-risk task identification, sleeping-risk).
              </li>
              <li>
                <strong>Manufacturer documentation.</strong> Data sheets, instruction manuals,
                spare parts lists for the installed products. Useful for remedial work years later
                when the original installer is no longer involved.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §13 (Records and logbook)"
            clause={
              <>
                The responsible person shall ensure that a logbook is maintained for the emergency
                lighting installation. The logbook shall include: (a) the date of the
                commissioning of the installation; (b) the date of each periodic inspection and
                test, the result, and the identity of the person carrying out the inspection; (c)
                a record of any defect found and the remedial action taken; (d) the dates of any
                modifications to the installation; (e) the design and installation record required
                by §5.2 and the commissioning record. The logbook shall be retained for the life
                of the installation and made available for inspection by the enforcing authority on
                request.
              </>
            }
            meaning="Logbook is the responsible person's deliverable. Contents are mandatory not optional. Retained for the life of the installation. Available to enforcing authority (Fire and Rescue Service) on request. Loss = evidence of failed maintenance."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>RRFSO 2005 article 17 — the legal duty</ContentEyebrow>

          <ConceptBlock
            title="The non-delegable duty of the responsible person"
            plainEnglish={`The Regulatory Reform (Fire Safety) Order 2005 places the legal duty for fire safety in non-domestic premises on the "responsible person" — typically the building owner or operator (or, where employment relationships exist, the employer). Article 17 of the Order specifically addresses maintenance: the responsible person must ensure the premises and any facilities, equipment and devices provided for the safety of occupants (including emergency lighting) are subject to a "suitable system of maintenance" and are "maintained in an efficient state, in efficient working order and in good repair". The duty is non-delegable; the responsible person can subcontract the testing work to a competent person but retains the legal duty for the outcome. Failures are enforced by the Fire and Rescue Service.`}
          >
            <p>What article 17 means in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>"Suitable system of maintenance".</strong> A documented maintenance regime,
                typically aligned with BS EN 50172:2024 / BS 5266-1:2025. Daily / monthly / annual
                cadence. Logbook recording every action. The system is the regime AND the
                documentation; either alone is insufficient.
              </li>
              <li>
                <strong>"Efficient state, working order and good repair".</strong> The luminaires
                and signs actually work to specification at any time the building is occupied.
                Latent failures (luminaires that have failed quietly between tests) are caught by
                the test cadence; if the cadence is too long the latent failures accumulate.
              </li>
              <li>
                <strong>Non-delegable.</strong> The responsible person can hire a competent person
                to perform the tests, but the legal duty for the outcome stays with the responsible
                person. A maintenance contractor's failure to do their job correctly does not
                exonerate the responsible person; it merely creates a contractual claim against
                the contractor.
              </li>
              <li>
                <strong>Enforced by the Fire and Rescue Service.</strong> Through routine audits
                (visiting the premises, inspecting the logbook, sampling the installation), through
                reactive inspections (responding to occupant complaints or post-incident), and
                through cross-checks with insurers and other regulators.
              </li>
              <li>
                <strong>Enforcement actions, escalating.</strong> Alteration notice (requires works
                before any building change), enforcement notice (requires deficiencies to be
                remedied), prohibition notice (immediate closure pending remediation), prosecution
                under the Order. Penalties on conviction can include unlimited fines and up to 2
                years\' imprisonment for corporate officers.
              </li>
              <li>
                <strong>Insurance implications.</strong> Insurers may require evidence of BS
                5266-1:2025 compliance as a policy condition. Failure to maintain may void cover
                in the event of a fire-related incident, leaving the responsible person personally
                liable for damages.
              </li>
              <li>
                <strong>Higher-Risk Buildings.</strong> Under the Building Safety Act 2022, higher
                duties apply for HRBs (residential buildings 18m+ or 7+ storeys). The Building
                Safety Regulator can intervene in addition to the Fire and Rescue Service. The
                emergency lighting logbook forms part of the building golden thread under the Act.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 17 (Maintenance)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons the
                responsible person must ensure that the premises and any facilities, equipment and
                devices provided in respect of the premises under this Order or, subject to
                paragraph (6), under any other enactment, including any enactment repealed or
                revoked by this Order, are subject to a suitable system of maintenance and are
                maintained in an efficient state, in efficient working order and in good repair.
              </>
            }
            meaning={`The legal text is broad — a "suitable system of maintenance" and "efficient state". BS 5266-1:2025 + BS EN 50172:2024 are the standards by which "suitable" is judged in practice. Compliance with the standards generally satisfies article 17; non-compliance is generally treated as failure of the duty.`}
          />

          <CommonMistake
            title="Outsourced maintenance contract treated as transferring legal duty"
            whatHappens={`A retail park manager engages an emergency lighting maintenance contractor and considers the article 17 duty transferred to the contractor. The contractor performs monthly tests but in year 4 misses the annual full-duration test in two units. A small fire occurs in one of the affected units; investigation shows several emergency luminaires failed because the batteries had not been tested at full duration for over 18 months. The Fire and Rescue Service prosecutes the responsible person (retail park manager). The "the contractor was supposed to do it" defence fails — article 17 is non-delegable. Conviction; substantial fine.`}
            doInstead="Engage competent contractors for the work BUT retain oversight: regular review of the logbook (responsible person reads and signs off the logbook periodically), spot-check of the contractor's work, contract terms requiring evidence of completion, KPI monitoring. The responsible person has the legal duty; the contractor has the contractual duty. The two work together but do not substitute."
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 competent person and the design and installation record</ContentEyebrow>

          <ConceptBlock
            title="Documented competence as a 2025 requirement"
            plainEnglish="BS 5266-1:2025 §5.2 makes the competent-person requirement explicit for emergency lighting design and major remedial work. The 2016 edition implied competence through general industry practice; the 2025 edition specifies it. The competent person must have the training, qualifications, and experience to undertake the work. Acceptable evidence includes IEng / CEng with relevant emergency lighting experience, ICEL (Industry Committee for Emergency Lighting) qualifications, manufacturer-specific design certification, or documented experience under a chartered engineer. The competence is declared in the design and installation record; loss of the record creates a competence-evidence gap."
          >
            <p>How the competent-person requirement applies:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Original design.</strong> The designer of the original installation must
                be a competent person. The design and installation record (BS 5266-1:2025 §13)
                includes a competence declaration signed by the designer.
              </li>
              <li>
                <strong>Major remedial work.</strong> Significant changes to the installation
                (adding luminaires, changing layout, changing duration, changing supply
                architecture) are treated as design changes and require a competent person.
              </li>
              <li>
                <strong>Routine testing and minor maintenance.</strong> Monthly / annual tests
                and like-for-like luminaire / battery replacements do not require the same level of
                design competence. A trained tester with a documented training programme is
                generally sufficient. The responsible person should still satisfy themselves that
                the tester is competent for the specific task.
              </li>
              <li>
                <strong>ICEL qualifications.</strong> The Industry Committee for Emergency Lighting
                offers various levels of certification covering design, installation, and
                maintenance. ICEL membership / certification is the most widely recognised UK
                qualification for emergency lighting work.
              </li>
              <li>
                <strong>IEng / CEng with emergency lighting experience.</strong> Chartered
                engineers (CEng) and incorporated engineers (IEng) with documented project
                experience in emergency lighting are accepted as competent for design.
              </li>
              <li>
                <strong>Manufacturer certifications.</strong> Some manufacturers (Hochiki, Mackwell,
                Whitecroft, etc.) offer product-specific design certifications. Acceptable for
                designs using those products provided the manufacturer\'s scope covers the design
                approach.
              </li>
              <li>
                <strong>Documented experience under a chartered engineer.</strong> A designer
                without formal qualifications can still be competent if they have documented
                project experience under the supervision of a chartered engineer who signs off the
                competence.
              </li>
              <li>
                <strong>Audit trail.</strong> The design and installation record carries the
                competence declaration. Test reports and remedial-work records carry the
                competence of the person performing each action. The audit trail is retained as
                part of the logbook.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.2 (Competent person)"
            clause={
              <>
                Emergency lighting design, installation and major remedial work shall be
                undertaken by a competent person, defined as a person with the training,
                qualifications and experience to undertake the work. The competent person shall
                declare their competence as part of the design and installation record required
                by §13.
              </>
            }
            meaning="Competent person requirement now explicit. Applies to design and major remedial work. Declared in the design and installation record. The 2025 edition formalises a requirement that was previously implicit; pre-2025 records that do not include a competence declaration may need to be supplemented at the next major maintenance cycle."
          />

          <SectionRule />

          <ContentEyebrow>BS EN 62034 self-test luminaires</ContentEyebrow>

          <ConceptBlock
            title="Automating the test labour"
            plainEnglish="BS EN 62034 specifies emergency lighting luminaires with internal monitoring electronics that perform the routine tests automatically. A self-test luminaire runs its own monthly functional test on schedule (typically at a low-traffic time of day), runs its own annual full-duration test on schedule (typically at a low-traffic time of year), and reports the results via an LED status indicator on the luminaire face or via an addressable network back to a central monitoring panel. The labour cost of physically performing the tests is virtually eliminated; the responsible person\'s duty under RRFSO article 17 remains and the test results still need to be reviewed and recorded."
          >
            <p>What self-test offers and what it does not:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Self-test = automated test cycle.</strong> Monthly functional and annual
                full-duration tests run on schedule without manual intervention. Test result
                reported via LED indicator (typically green = pass, red = fault) or via addressable
                network.
              </li>
              <li>
                <strong>Addressable network reporting.</strong> Premium self-test products report
                via DALI, KNX, BACnet, proprietary RF, or proprietary wired bus. A central panel
                shows the status of every luminaire in real time. Logbook entries can be
                auto-populated from the network data.
              </li>
              <li>
                <strong>LED-indicator-only.</strong> Lower-cost self-test products show status only
                by an LED on the luminaire face. The responsible person\'s contractor walks the
                building monthly to read the indicators rather than to perform the tests; still a
                significant labour saving.
              </li>
              <li>
                <strong>RRFSO article 17 duty unchanged.</strong> Self-test reduces labour, not
                legal duty. The responsible person must still review test results, ensure failures
                are remediated, retain logbook records, and demonstrate efficient working order on
                demand.
              </li>
              <li>
                <strong>Cost-benefit.</strong> Capital cost premium is around 20-40 % over
                standard luminaires; payback typically 2-4 years for installations over about 100
                luminaires. Self-test economics improve further at scale.
              </li>
              <li>
                <strong>Network architecture choices.</strong> Self-contained self-test luminaires
                with addressable network reporting are typical for new builds; central battery
                systems with DALI-2 emergency are typical for very large installations. The choice
                depends on building size, refurbishment vs new build, and existing infrastructure.
              </li>
              <li>
                <strong>Test-cycle scheduling.</strong> Self-test luminaires schedule their own
                tests; some products allow the responsible person to choose the test time of day
                and time of year. Annual full-duration tests should be scheduled out-of-hours where
                possible to avoid leaving the system unavailable during a coincident mains failure.
              </li>
              <li>
                <strong>Calibration drift.</strong> Self-test electronics rely on internal sensors
                and clocks; calibration can drift over years. Periodic verification (e.g. every 5
                years) by manual test is good practice to confirm the self-test is producing
                accurate results.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 62034 (Automatic test systems for battery-powered emergency escape lighting)"
            clause={
              <>
                Automatic test systems shall provide testing of the emergency lighting installation
                in accordance with the requirements of BS EN 50172. The system shall verify the
                operation of each luminaire at intervals not exceeding one month and shall verify
                the rated duration of each luminaire at intervals not exceeding twelve months. Test
                results shall be made available for inspection.
              </>
            }
            meaning="BS EN 62034 self-test products meet BS EN 50172 monthly and annual test requirements automatically. Test results must still be available for inspection — typically via the network panel or via the local LED indicator. The standard governs the technical implementation; the responsible person\'s legal duty is independent."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Common failures and remediation</ContentEyebrow>

          <ConceptBlock
            title="What goes wrong, and what to do about it"
            plainEnglish="Emergency luminaires fail in a small number of predictable ways. Battery end-of-life is by far the most common failure and is typically detected at the annual full-duration test. Lamp / LED end-of-life is the next most common and is typically detected at the monthly functional test. Charger faults and supply faults are less frequent and are usually detected at the monthly test. Each failure has a typical remediation path; with a stocked spares programme the remediation can usually be completed within a few days of detection."
          >
            <p>Common failures and remediation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Battery end-of-life — most common.</strong> Detected at the annual
                full-duration test (illuminance fails 50 % retention) or sometimes earlier (the
                luminaire stops energising at the monthly test). Remediation: replace battery
                like-for-like, retest. Typical service life 4-5 years SLA / NiCd, 8-10 years
                LiFePO4.
              </li>
              <li>
                <strong>Lamp / LED end-of-life.</strong> Detected at the monthly test (luminaire
                does not illuminate, or illuminates dimly). Remediation: replace lamp / LED module,
                retest. LED service life is long (typically 50 000+ hours) but defective drivers
                can shorten this; LED + driver typically replaced as a unit.
              </li>
              <li>
                <strong>Charger fault.</strong> Detected at the monthly test (luminaire fails to
                hold charge, or shows fault indicator). Remediation: replace charger module or
                full luminaire, retest. Common in older self-contained luminaires where the
                charger electronics are a separate module.
              </li>
              <li>
                <strong>Supply fault.</strong> Detected at the monthly test (luminaire does not
                respond to test key). Remediation: trace supply, repair or replace. Possible
                causes: tripped MCB, broken cable, blown fuse, faulty test switch.
              </li>
              <li>
                <strong>Physical damage.</strong> Detected at visual inspection or at test (cracked
                housing, water ingress, mechanical damage). Remediation: replace luminaire. More
                common in industrial and external locations.
              </li>
              <li>
                <strong>Sign luminance degradation.</strong> Detected at periodic luminance meter
                check (luminance below 5 cd/m² floor). Remediation: replace LED module or full
                sign. Luminance degradation is gradual and may not appear at functional tests; a
                periodic luminance check (every 1-2 years) catches it.
              </li>
              <li>
                <strong>Spares stock.</strong> Maintain a small stock of replacement batteries /
                LEDs / drivers / luminaires for rapid remediation. Typical stock: 5-10 % of
                installed luminaires for batteries, 2-5 % for full luminaire replacements. Larger
                stock for mission-critical sites.
              </li>
              <li>
                <strong>Batch failures.</strong> Failures often appear in clusters because
                co-installed batteries age at the same rate. A failure rate over about 5 % at one
                annual test indicates a batch ageing event; plan a comprehensive replacement
                programme rather than fixing one-by-one.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A 200-luminaire installation reaches year 5"
            situation="A medium-sized office building was fitted out 5 years ago with 200 self-contained LED emergency luminaires using sealed lead-acid (SLA) batteries with a typical 4-5 year service life. The building has been on a monthly + annual test regime since handover. The 5-year-anniversary annual test is scheduled. The previous annual test (year 4) showed 8 luminaires failing the 50 % retention threshold; those were replaced. The facilities manager is preparing for the year-5 test."
            whatToDo="(1) Plan the test out-of-hours (Saturday morning typical for office). (2) Stock approximately 30 replacement batteries (15 % of installed) — at year 5 the SLA batch is reaching end-of-life and a higher failure rate is expected. (3) Notify the responsible person of the expected failure cluster and propose a comprehensive battery replacement programme over the next 12 months to pre-empt year 6 / 7 failures. (4) Run the test. Likely outcome: 30-50 luminaires fail at year 5 (15-25 % failure rate, consistent with end-of-life of the SLA batch). (5) Replace failed batteries; retest each. (6) Update the logbook with all failures, remediation actions, and the planned 12-month batch replacement programme. (7) At years 6-7, the remaining 150 luminaires receive new batteries on a planned schedule rather than a reactive failure schedule."
            whyItMatters="Batch failures are predictable when batteries are installed simultaneously. Reactive replacement (one-by-one as failures occur) costs more in labour and creates compliance risk between failure and replacement. Planned batch replacement is cheaper per unit and keeps the system reliably above 50 % retention throughout. The annual test is the primary detection mechanism but the responsible person should be planning batch replacement based on installation date, not waiting for the failures to happen."
          />

          <SectionRule />

          <ContentEyebrow>Retention and golden thread</ContentEyebrow>

          <ConceptBlock
            title="How long records are kept and why it matters"
            plainEnglish="Emergency lighting test records have a typical retention period of 6 years, aligned with the Regulatory Reform (Fire Safety) Order 2005 article 17 enforcement window. Some premises retain records for the lifetime of the installation as best practice. Higher-Risk Buildings under the Building Safety Act 2022 are required to retain golden-thread fire safety information for the lifetime of the building. The logbook is part of the building\'s permanent fire safety record and should be transferred with the building on sale or change of management. Loss of the logbook is treated as evidence of failed maintenance under article 17."
          >
            <p>Retention rules and practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>6 years typical.</strong> Aligned with RRFSO 2005 article 17 enforcement
                window. Most premises retain to this standard.
              </li>
              <li>
                <strong>Lifetime of installation — best practice.</strong> Many estate managers
                retain emergency lighting records for the full lifetime of the installation as
                routine practice. Cheap insurance against future enforcement.
              </li>
              <li>
                <strong>Higher-Risk Buildings — lifetime of building.</strong> Building Safety Act
                2022: HRBs must retain golden-thread fire safety information for the lifetime of
                the building. Includes commissioning records, design and installation records,
                test records, and maintenance records. Transferred with ownership.
              </li>
              <li>
                <strong>Digital vs paper.</strong> Either is acceptable provided the records are
                retained in a readable form. Digital records should have backup; paper records
                should be stored securely. Hybrid approach is common — paper test sheets digitised
                periodically.
              </li>
              <li>
                <strong>Building handover.</strong> When a building is sold or management is
                transferred, the logbook should be transferred to the new responsible person. This
                is a frequent failure point — logbooks lost during handover. Maintain handover
                documentation that explicitly transfers the logbook.
              </li>
              <li>
                <strong>Loss of logbook.</strong> Treated as evidence of failed maintenance under
                article 17 enforcement. Recovery requires recreating the records from any
                available data (test certificates, contractor records, manufacturer data) and
                expressly noting the gap. Penalty risk is significant.
              </li>
              <li>
                <strong>Insurance implications.</strong> Insurers may require evidence of BS
                5266-1:2025 compliance as a policy condition. Logbook retention is part of that
                compliance. Loss may void cover.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 + BS 5266-1:2025 · §13 (Retention of records)"
            clause={
              <>
                Records of the emergency lighting installation including the design and
                installation record, the commissioning record and the logbook of routine inspections
                and tests shall be retained for the life of the installation. For Higher-Risk
                Buildings within the meaning of the Building Safety Act 2022, the records form part
                of the building golden thread of fire safety information and shall be retained for
                the life of the building. Records shall be transferred with the building on change
                of ownership or change of management.
              </>
            }
            meaning="Lifetime retention is the BS 5266-1:2025 standard. Higher-Risk Buildings have additional Building Safety Act 2022 obligations. Records transfer with ownership / management. Loss is evidence of failed maintenance."
          />

          <CommonMistake
            title="Logbook lost on building sale"
            whatHappens="An office building is sold to a new owner. The seller passes the keys but the emergency lighting logbook does not transfer (filed in a cabinet that was emptied during the seller\'s move). The new owner commissions a routine fire risk assessment 6 months after acquisition. The assessor requests the emergency lighting logbook. None available. The new owner is treated as the responsible person from the date of acquisition; absence of historical records is treated as evidence of failed maintenance, even though the new owner has been in place only 6 months. Significant remediation effort to commission a fresh full-duration test, full luminaire schedule, and a fresh logbook from scratch. The seller may also face enforcement for the failure to transfer."
            doInstead="On acquisition or transfer of management, formally request the emergency lighting logbook as part of the property handover documents. Confirm receipt before signing off on the transfer. If the logbook is not available, treat that as a known gap and commission a fresh commissioning exercise immediately rather than waiting for a future audit to expose it. Record the gap in writing as evidence of the inherited deficiency."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Enforcement — what happens when maintenance fails</ContentEyebrow>

          <ConceptBlock
            title="Fire and Rescue Service powers"
            plainEnglish="The Fire and Rescue Service is the enforcing authority for the Regulatory Reform (Fire Safety) Order 2005 in most premises. Its powers are graduated. At the lightest end, the FRS can issue an alteration notice (requiring works to be done before any change to the building). More serious is the enforcement notice (requiring identified deficiencies to be remediated by a specified date). The most serious is the prohibition notice (immediate prohibition of use of the premises pending remediation). Beyond notices, the FRS can prosecute under the Order; penalties on conviction can include unlimited fines and up to 2 years\' imprisonment for corporate officers. Insurance implications layer on top."
          >
            <p>The enforcement ladder:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Audit visit.</strong> Routine FRS audits inspect the logbook, sample
                luminaires, observe a test, and check the design and installation record. Most
                premises pass with minor observations. Failure to pass triggers escalating
                enforcement.
              </li>
              <li>
                <strong>Alteration notice.</strong> Requires the responsible person to notify the
                FRS of any proposed alterations to the building before they are made, so the FRS
                can confirm fire safety implications. Issued where a building has fire safety
                concerns that need to be managed during change.
              </li>
              <li>
                <strong>Enforcement notice.</strong> Requires identified deficiencies (e.g. failed
                emergency lighting maintenance, missing logbook, expired battery cohort) to be
                remediated within a specified time. Failure to comply is a criminal offence.
              </li>
              <li>
                <strong>Prohibition notice.</strong> Immediate prohibition of use of all or part of
                the premises. Issued where there is an imminent risk to life — for example, a
                building with no working emergency lighting whatsoever in a multi-storey hotel.
                Prohibition takes effect immediately on service; lifted only on remediation.
              </li>
              <li>
                <strong>Prosecution.</strong> The FRS can prosecute under the RRFSO 2005. Penalties
                on conviction: unlimited fines and up to 2 years\' imprisonment for corporate
                officers (directors, managers, secretaries, similar officers, or persons
                purporting to act in such capacity).
              </li>
              <li>
                <strong>Insurance implications.</strong> Insurers may require evidence of BS
                5266-1:2025 compliance as a policy condition. Failure to maintain may void cover
                in the event of a fire-related incident, leaving the responsible person personally
                liable for damages.
              </li>
              <li>
                <strong>Building Safety Regulator (HRBs).</strong> For Higher-Risk Buildings under
                the Building Safety Act 2022, the Building Safety Regulator has additional
                enforcement powers including the power to issue building completion certificates,
                contravention notices, and to refer matters for prosecution.
              </li>
              <li>
                <strong>Reputational damage.</strong> Enforcement notices are public records.
                Prohibition notices and prosecutions attract media coverage. Reputational damage
                often outweighs the direct financial penalty.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Articles 30, 31, 32 (Enforcement)"
            clause={
              <>
                The enforcing authority may serve an alteration notice, an enforcement notice or a
                prohibition notice on the responsible person where the authority is satisfied that
                the responsible person is failing to comply with this Order. A person guilty of an
                offence under this Order is liable on conviction on indictment to a fine, or on
                summary conviction to a fine. The enforcing authority may institute proceedings for
                an offence under this Order.
              </>
            }
            meaning="Three kinds of notice plus prosecution. Notices are administrative actions; prosecution is criminal. Prosecution typically reserved for serious or repeat failures, or for failures that contributed to a fire incident. Penalties scale with the seriousness of the failure and the responsible person\'s history."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Daily check (CPS only): visual inspection of central infrastructure indicators. Self-contained luminaire systems: no daily check required.',
              'Monthly functional test: every emergency luminaire and exit sign, simulated mains failure typically 5 minutes, every calendar month without exception.',
              'Annual full-duration discharge test: every luminaire, full rated duration (1 h or 3 h), 50 % illuminance retained at end, 24 h recharge confirmation.',
              'Logbook (BS 5266-1:2025 §13): test records, fault records, design and installation record, luminaire schedule, battery replacement dates, competence declarations. Mandatory contents.',
              'Retention: 6 years typical (RRFSO article 17 enforcement window); lifetime of installation best practice; lifetime of building for Higher-Risk Buildings under Building Safety Act 2022.',
              'Responsible person duties (RRFSO 2005 article 17): non-delegable. Subcontract the work, retain the legal duty for the outcome.',
              'Competent person (BS 5266-1:2025 §5.2): designer and major-remedial-work person must be documented competent. ICEL, IEng / CEng with experience, manufacturer certifications.',
              'BS EN 62034 self-test luminaires automate the test cycle. Reduce labour, not legal duty. Cost premium 20-40 %; payback 2-4 years for installations over ~100 luminaires.',
              'Common failures: battery end-of-life (most common, detected at annual test), LED / lamp end-of-life, charger fault, supply fault. Plan batch replacement programmes.',
              'Enforcement (Fire and Rescue Service): alteration notice, enforcement notice, prohibition notice, prosecution. Unlimited fines, up to 2 years\' imprisonment for officers.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How long does the monthly functional test actually need to be — 1 minute or 5 minutes?',
                answer:
                  'BS EN 50172:2024 §7.2 says "duration sufficient to verify the function" without specifying a precise time. 1 minute confirms switchover and initial drive-up; 5 minutes additionally confirms the lamp / LED is being driven steadily by the battery. Industry practice is 5 minutes as the typical figure, on the basis that a luminaire that fails at 3 minutes (battery cell short, driver overheat) would pass a 1-minute test. Some maintenance contractors operate to a 1-minute standard for cost; auditors generally accept either provided the result is recorded.',
              },
              {
                question:
                  'Can I split the annual full-duration test across multiple days for a large site?',
                answer:
                  'Yes — provided every luminaire receives a full-duration test in each 12-month period. Many large sites split by zone: zone 1 in January, zone 2 in February, etc. The test is "annual" in the sense that each individual luminaire is tested at intervals not exceeding 12 months. Splitting reduces the labour burden and reduces the risk of a coincident mains failure leaving a large area unsupported during the test. Document the schedule in the logbook and confirm each luminaire\'s 12-month interval is respected.',
              },
              {
                question:
                  'My luminaire schedule has 250 luminaires. Can I auto-populate the logbook from a self-test network?',
                answer:
                  'Yes — and this is a major advantage of self-test products. The addressable network reports each luminaire\'s test result; the central monitoring panel exports CSV / PDF that becomes the logbook entry. The responsible person reviews and signs off the auto-populated record. Reduces manual transcription error and labour. Confirm at handover that the network export covers all required logbook fields (date, luminaire reference, test type, result, tester / system identity).',
              },
              {
                question:
                  'What is the difference between a fire risk assessment and an emergency lighting test?',
                answer:
                  'Fire risk assessment is a broader exercise covering all fire safety provisions in the building (including emergency lighting). Required under RRFSO 2005 article 9 and reviewed at intervals appropriate to the building (typically annually). Emergency lighting test is a specific technical test of the emergency lighting installation (monthly or annual). The fire risk assessor reviews the emergency lighting test records as one of many inputs to the overall risk assessment. Both are required; neither substitutes for the other.',
              },
              {
                question:
                  'Who can perform emergency lighting testing — does the tester need a specific qualification?',
                answer:
                  'BS 5266-1:2025 requires the tester to be competent for the work undertaken. For routine testing (monthly / annual functional and discharge tests) this is generally a trained tester with documented training. ICEL and other industry bodies offer testing-specific qualifications. For major remedial work (battery replacements at scale, luminaire replacements, modifications) the level of competence required is higher. The responsible person is responsible for satisfying themselves that the tester is competent.',
              },
              {
                question:
                  'How do I justify the cost of self-test luminaires to a cost-conscious client?',
                answer:
                  'Calculate labour cost over 5 years. For a 100-luminaire installation: 100 luminaires × 12 monthly tests × 2 minutes per test × 5 years = 200 hours of labour just for monthly testing, plus the annual full-duration test which is similar magnitude. At maintenance contractor rates, the labour cost over 5 years typically exceeds the capital cost premium of self-test luminaires (20-40 % over standard). Self-test pays back in 2-4 years for installations over about 100 luminaires; payback is faster for larger installations and for buildings with limited night-time access.',
              },
              {
                question:
                  'What happens to ongoing testing during a major refurbishment?',
                answer:
                  'During a refurbishment that takes the building out of occupied use, testing can be paused on the affected zones provided the responsible person has documented the suspension and has plans to bring the zones back into testing on completion. During a refurbishment that keeps the building in occupied use, testing continues on the unaffected zones; the affected zones receive a fresh commissioning at completion of works. The fire risk assessment is updated to reflect the refurbishment. Document everything.',
              },
              {
                question:
                  'Is there a national database of competent persons for emergency lighting?',
                answer:
                  'No single mandated database, but several recognised schemes operate: ICEL (Industry Committee for Emergency Lighting) accreditation, NICEIC and ECA registers (electrical contractors with relevant competence), Fire Industry Association membership, manufacturer-specific design certifications. The responsible person typically asks the contractor for evidence of competence; the contractor produces certificates / membership records. There is no central register comparable to the Building Regulations competent person scheme, but the BS 5266-1:2025 §5.2 requirement is satisfied by any of the above.',
              },
              {
                question:
                  'My monthly test reveals a luminaire failure. What is the time pressure to remediate?',
                answer:
                  'BS 5266-1:2025 does not specify a precise remediation time but the responsible person\'s article 17 duty is to maintain the system in efficient working order. A persistent failure is a failure of duty. Practical remediation: order replacement parts within 1-2 working days, replace within 1 week, retest immediately. If the failed luminaire is critical (e.g. only sign at a final exit), the responsible person should consider supplementary measures (temporary signage, restricted occupancy of the affected zone) until remediation is complete. Document the timeline in the logbook.',
              },
              {
                question:
                  'How does the BS 5266-1:2025 logbook interact with electronic facilities management systems?',
                answer:
                  'Many premises use electronic facilities management (FM) systems for maintenance scheduling, work orders, and asset registers. The BS 5266-1:2025 logbook contents can sit inside the FM system as a structured record set. Acceptable provided: the logbook fields specified in §13 are all present; the records are readable and exportable; the system has appropriate access controls; backups are in place; the records are retained for the required period. Some FM systems integrate with self-test luminaire networks for fully automated record-keeping. The output (printable PDF, CSV) should still be available on demand for FRS audit.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Testing and record keeping — Module 2.6" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.5 Emergency exit signs
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 overview
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

export default EmergencyLightingModule2Section6;
