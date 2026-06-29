/**
 * Module 5 · Section 3 — Using test equipment efficiently
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * Picking the right instrument and the right range — fast, safe and GS38-compliant under the clock.
 */

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  Settings,
  Shield,
  Target,
  Zap,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Using Test Equipment Efficiently | AM2 Module 5.3 | Elec-Mate';
const DESCRIPTION =
  'Choosing the right instrument and range fast — GS38-compliant fault-finding without burning the AM2 clock.';

const AM2Module5Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'safe-isolation',
      question: 'Which tester is used to prove safe isolation?',
      options: [
        'Multifunction tester (MFT)',
        'A two-pole voltage indicator',
        'Insulation resistance tester',
        'Continuity tester',
      ],
      correctIndex: 1,
      explanation:
        'A two-pole voltage indicator is required for safe isolation procedures, not an MFT. This ensures proper Test-Prove-Test sequence.',
    },
    {
      id: 'zero-leads',
      question: 'Why must leads be zeroed before continuity testing?',
      options: [
        'To charge the instrument battery to full before use',
        'To remove the resistance of the leads from the measurement',
        'To set the test current to the required 200 mA',
        'To confirm the leads meet GS38 shrouding requirements',
      ],
      correctIndex: 1,
      explanation:
        'Zeroing (nulling) the test leads removes their resistance from the measurement, ensuring accurate continuity readings.',
    },
    {
      id: 'lamp-disconnection',
      question: 'Why must you disconnect lamps before insulation resistance testing?',
      options: [
        'To reduce the test voltage applied to the circuit',
        'To allow the continuity leads to be zeroed first',
        'To prevent damage to equipment and get accurate results',
        'To ensure the RCD does not trip during the test',
      ],
      correctIndex: 2,
      explanation:
        'Sensitive equipment like lamps can be damaged by high test voltages and will give false low readings during insulation resistance testing.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Which tester is used for safe isolation?',
      options: [
        'Multifunction tester',
        'Two-pole voltage indicator',
        'Continuity tester',
        'Insulation resistance tester',
      ],
      correctAnswer: 1,
      explanation:
        'A two-pole voltage indicator is specifically required for safe isolation procedures to prove circuits are dead.',
    },
    {
      id: 2,
      question: 'How much probe tip should be exposed under GS38?',
      options: [
        '5-10 mm',
        '1-2 mm',
        '2-4 mm',
        'No limit specified',
      ],
      correctAnswer: 2,
      explanation:
        'GS38 requires probe tips to be shrouded with only 2-4 mm of metal exposed for safety.',
    },
    {
      id: 3,
      question: 'Why must continuity leads be zeroed?',
      options: [
        'To set the test voltage to 500 V DC',
        'To charge the instrument before testing',
        'To check the leads are GS38 compliant',
        'To remove lead resistance from measurement',
      ],
      correctAnswer: 3,
      explanation:
        'Zeroing removes the resistance of the test leads themselves from the measurement for accurate results.',
    },
    {
      id: 4,
      question: 'What test would you use to prove a short circuit?',
      options: [
        'Insulation resistance test',
        'Polarity test at each accessory',
        'Earth fault loop impedance (Zs) test',
        'Prospective fault current measurement',
      ],
      correctAnswer: 0,
      explanation:
        'Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings.',
    },
    {
      id: 5,
      question: 'What unit is insulation resistance measured in?',
      options: [
        'Ohms',
        'Megohms (M)',
        'Amperes (A)',
        'Volts (V)',
      ],
      correctAnswer: 1,
      explanation:
        'Insulation resistance is measured in Megohms (M), with minimum 1M required for most circuits.',
    },
    {
      id: 6,
      question: 'What test would you use to identify high resistance joints?',
      options: [
        'Insulation resistance at 500 V DC',
        'Polarity test at the socket outlet',
        'Zs (earth fault loop impedance)',
        'RCD trip-time test at five times IΔn',
      ],
      correctAnswer: 2,
      explanation:
        'Zs testing or continuity testing will reveal high resistance connections as elevated readings.',
    },
    {
      id: 7,
      question: "What's the maximum trip time for a 30 mA RCD at x1 In?",
      options: [
        '40ms',
        '150ms',
        '500ms',
        '300ms',
      ],
      correctAnswer: 3,
      explanation: 'At 1x rated current (30mA), RCDs must trip within 300ms according to BS7671.',
    },
    {
      id: 8,
      question: 'True or false: Taping up damaged test leads is acceptable in AM2.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. Damaged test leads must be replaced, never repaired with tape. This is a serious safety violation.',
    },
    {
      id: 9,
      question: 'Why must you disconnect lamps before insulation resistance testing?',
      options: [
        'To reduce the test voltage to a safe level',
        'To prevent damage and get accurate results',
        'To allow the leads to be zeroed correctly',
        'To stop the RCD tripping during the test',
      ],
      correctAnswer: 1,
      explanation:
        'High test voltages can damage sensitive equipment and connected loads will give false low readings.',
    },
    {
      id: 10,
      question: 'What do assessors expect you to do if you get an unrealistic reading?',
      options: [
        'Record the reading and move on to the next test',
        'Write down the value you expected instead',
        'Re-check instrument settings and connections',
        'Switch to a different instrument without checking',
      ],
      correctAnswer: 2,
      explanation:
        'Always re-check your instrument settings and connections rather than recording false values.',
    },
  ];

  const faqs = [
    {
      question: 'Can I bring my own test equipment?',
      answer:
        "Yes, but it must be GS38 compliant, in-date for calibration, and in good condition. All equipment is checked at registration. Bring spares (leads, fuses, batteries) — kit failure on the day is YOUR problem, not the assessor's.",
    },
    {
      question: 'Do I always use the MFT?',
      answer:
        "Mostly — but safe isolation REQUIRES a separate two-pole voltage indicator. Don't try to prove dead with the MFT's voltage function — it's not what HSE GS38 expects for isolation. MFT for continuity, IR, Zs, RCD; voltage indicator for prove-test-prove.",
    },
    {
      question: 'What if my readings seem unrealistic?',
      answer:
        'Re-check your instrument settings (wrong range), zero/null the leads (continuity), check connection (probes properly seated). Never fake values. Recording exactly 0.00 Ω or exactly 1.0 MΩ flags as a guess to assessors — real measurements have real noise.',
    },
    {
      question: 'How strict are assessors about GS38?',
      answer:
        "Very strict — unsafe equipment use is an instant safety fail. Damaged leads, missing finger barriers, exposed probe tips longer than 4 mm, taping repairs — any of these and the test stops. Replace, don't repair.",
    },
    {
      question: 'Do I lose marks for being slow with instruments?',
      answer:
        'Not directly, but slow instrument work eats your fault-finding time. With 1.5–2 hours and 2 faults to find, fumbling with MFT settings for 5 minutes per test is fatal. Practice until selecting 500 V IR, 200 mA continuity, and Zs no-trip mode is muscle memory.',
    },
    {
      question: "What's the difference between Zs no-trip mode and standard?",
      answer:
        'Zs standard mode injects fault current that will trip RCDs — fine for circuits without RCD protection. Zs no-trip mode uses pulses too short to cause RCD operation, so you can measure Zs on RCD-protected circuits. Picking the wrong mode either trips the RCD on every test or gives an inaccurate reading.',
    },
  ];

  const learningOutcomes = [
    'Select the correct test instrument for different types of faults',
    'Apply GS38 safety requirements when using test probes and leads',
    'Carry out continuity, insulation resistance, polarity, Zs, PSC, and RCD tests safely',
    'Use test results to identify fault types without guesswork',
    'Demonstrate safe, confident handling of instruments to an assessor',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module5"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </Link>

          <PageHero
            eyebrow="Module 5 - Section 3"
            title="Using Test Equipment Efficiently"
            description="In AM2 fault diagnosis, test equipment is your main tool. You will rely on instruments like a multifunction tester (MFT), a continuity tester, an insulation resistance tester, and a voltage indicator to identify faults safely and accurately."
            tone="yellow"
          />

          <TLDR
            points={[
              'Two-pole voltage indicator for safe isolation. MFT for the rest. GS38 leads, shrouded probes, 2–4 mm tip exposed. Anything else is an instant safety fail.',
              'Continuity at 200 mA. IR at 500 V DC. RCD at ×½, ×1, ×5 of IΔn. Zs against BS 7671 maximums. Know your settings cold.',
              'Zero your leads before continuity. Disconnect electronics before IR. Both mistakes give you junk readings and lost marks.',
            ]}
          />

          <div className="space-y-6">
            {/* Introduction */}
            <section className="space-y-3">
              <p className="text-ios-body text-white leading-relaxed">
                Efficient use of test equipment means choosing the right tool for the fault, setting
                it up correctly, applying it safely, and recording results without wasting time or
                guessing.
              </p>
            </section>

            {/* Critical Warning */}
            <CommonMistake
              title="GS38 Safety Compliance"
              whatHappens={
                <>
                  <p className="text-ios-callout text-white mb-3 leading-relaxed">
                    The assessor is watching closely to see if you can handle test equipment in line
                    with GS38 safety requirements. Unsafe equipment use equals instant fail.
                  </p>
                  <p className="text-ios-callout text-white font-medium leading-relaxed">
                    Never tape up damaged leads - replace them. Use only shrouded probes with 2-4mm
                    exposed tips.
                  </p>
                </>
              }
              doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
            />

            {/* Learning Outcomes */}
            <LearningOutcomes outcomes={learningOutcomes} />

            {/* Core Test Instruments */}
            <ConceptBlock title="1. Core Test Instruments in AM2 Fault Finding">
              <p>
                <strong className="text-elec-yellow">Primary Instruments:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Multifunction Tester (MFT):</strong> Combines continuity, insulation
                  resistance, Zs, PSC/PSCC, and RCD functions
                </li>
                <li>
                  <strong>Continuity tester:</strong> Proves open circuits and checks rings/CPCs
                </li>
                <li>
                  <strong>Insulation resistance tester:</strong> Detects short circuits or earth
                  faults
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Safety Equipment:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Voltage indicator (two-pole):</strong> Used for safe isolation and proving
                  circuits live/dead
                </li>
                <li>
                  <strong>Proving unit:</strong> Confirms voltage indicator is working before/after
                  use
                </li>
                <li>
                  <strong>GS38 test leads:</strong> Fused and shrouded for safety
                </li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />

            <RegsCallout
              source="BS 7671 — Regulation 641.x (Continuity of protective conductors)"
              clause="The continuity of every protective conductor, including main and supplementary equipotential bonding conductors, shall be verified by a measurement of resistance."
              meaning={
                <>
                  CPC continuity is a measured test, not a "looks OK" check. On AM2, you'll be
                  expected to null/zero your leads first, then measure R2 (or R1+R2) and record an
                  actual ohms value. A reading of "passed" or "OK" with no number is not a
                  verification — the assessor wants the figure.
                </>
              }
              cite="Reference: BS 7671 Part 6 — Reg 641; IET GN3 (initial verification)"
            />

            {/* GS38 Safety Compliance */}
            <ConceptBlock title="2. Safe Use - GS38 Compliance">
              <p>
                <strong className="text-elec-yellow">Essential GS38 Requirements:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Shrouded probes:</strong> Only 2-4 mm exposed metal tip
                </li>
                <li>
                  <strong>Fused leads:</strong> Test leads must be fused and undamaged
                </li>
                <li>
                  <strong>Finger barriers:</strong> Keep fingers behind probe barriers at all times
                </li>
                <li>
                  <strong>Lead condition:</strong> Never tape up damaged leads - replace them
                  immediately
                </li>
                <li>
                  <strong>Proving sequence:</strong> Always prove tester on a live source before and
                  after use
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Safe Working Practices — Before Testing:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Visually inspect all test equipment</li>
                <li>Check probe shrouds and lead condition</li>
                <li>Verify tester calibration dates</li>
                <li>Test proving unit operation</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Safe Working Practices — During Testing:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Maintain Test-Prove-Test sequence</li>
                <li>Keep leads tidy and untangled</li>
                <li>Never bypass safety features</li>
                <li>Report any equipment faults immediately</li>
              </ul>
            </ConceptBlock>

            {/* Efficient Application of Tests */}
            <ConceptBlock title="3. Efficient Application of Tests">
              <p>
                <strong className="text-elec-yellow">Continuity Testing:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Best for:</strong> Open circuits, broken rings, CPC faults
                </li>
                <li>
                  <strong>Setup:</strong> Always zero leads first
                </li>
                <li>
                  <strong>Current:</strong> Use 200mA test current
                </li>
                <li>
                  <strong>Record:</strong> Actual resistance values in Ohms
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Insulation Resistance:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Best for:</strong> Shorts or earth faults
                </li>
                <li>
                  <strong>Setup:</strong> Disconnect sensitive equipment first
                </li>
                <li>
                  <strong>Voltage:</strong> 500V DC for most circuits
                </li>
                <li>
                  <strong>Minimum:</strong> 1MOhms required (investigate if below 2MOhms)
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Polarity & Zs Testing:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Polarity:</strong> Confirm correct connections at sockets, switches,
                  lighting
                </li>
                <li>
                  <strong>Zs testing:</strong> Identify high resistance faults
                </li>
                <li>
                  <strong>Compare:</strong> Against BS 7671 maximum values
                </li>
                <li>
                  <strong>Safety:</strong> Ensure RCD not bypassed during Zs tests
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">RCD Testing:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>x1 test:</strong> Must trip within 300ms at rated current
                </li>
                <li>
                  <strong>x5 test:</strong> Must trip within 40ms (30mA RCDs)
                </li>
                <li>
                  <strong>x0.5 test:</strong> Should NOT trip (checks over-sensitivity)
                </li>
                <li>
                  <strong>Functional:</strong> Test button operation
                </li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />

            <Scenario
              title="Your IR reading at 500 V looks too low — but is it the circuit or your meter?"
              situation={
                <>
                  You're testing IR L-N on a lighting circuit at the AM2 board. The reading shows
                  0.3 MΩ. Below the 1 MΩ minimum, so technically a fail. But you noticed the LED
                  drivers are still connected. You need to decide: is this an actual short circuit
                  fault, or are the electronics dragging the reading down?
                </>
              }
              whatToDo={
                <>
                  Disconnect the LED drivers (or any electronic accessories) from the circuit, then
                  re-test. BS 7671 specifically calls out that electronics must be disconnected for
                  IR testing because they internally bridge L-N at lower voltages and skew your
                  reading massively. If after disconnection the IR is still &lt; 1 MΩ, you've got a
                  real fault. If it climbs to &gt; 200 MΩ, the drivers were the issue — circuit is
                  fine, no fault.
                </>
              }
              whyItMatters={
                <>
                  On AM2 day this is exactly the kind of trap the assessor watches for. Reporting a
                  "short circuit fault" because you didn't disconnect electronics is a recording
                  error under BS 7671 Reg 642 — and tells the assessor you don't understand what an
                  IR test actually measures. Even if the rig has a deliberate fault elsewhere, you
                  can lose method marks here.
                </>
              }
            />

            <RegsCallout
              source="BS 7671 — Regulation 642.x (Insulation resistance test method)"
              clause="The insulation resistance test shall be carried out at the test voltage and current as specified in Table 64. Equipment which may be damaged by the test voltage shall be disconnected before the test is carried out."
              meaning={
                <>
                  For circuits up to 500 V (everything on AM2), test at 500 V DC. Minimum acceptable
                  IR is 1 MΩ but anything &lt; 2 MΩ should be investigated. Electronics, dimmers,
                  LED drivers, surge protection devices: disconnect them first or you'll get a low
                  reading that isn't a fault. Recording a "fault" that's actually a connected SPD =
                  lost marks and a confused assessor.
                </>
              }
              cite="Reference: BS 7671 Part 6 — Reg 642 / Table 64"
            />

            {/* Common Errors and Assessor Expectations */}
            <ConceptBlock title="4. Common Errors and Assessor Expectations">
              <p>
                <strong className="text-elec-yellow">
                  Common Candidate Errors (NET Guidance):
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Wrong instrument:</strong> Using wrong instrument for fault type (e.g.
                  trying to find open circuit with insulation tester)
                </li>
                <li>
                  <strong>Forgot zeroing:</strong> Not zeroing continuity leads = false readings
                </li>
                <li>
                  <strong>Equipment connected:</strong> Carrying out insulation resistance with
                  lamps/equipment connected = damage or wrong results
                </li>
                <li>
                  <strong>False numbers:</strong> Recording "perfect" numbers instead of measured
                  values
                </li>
                <li>
                  <strong>Unsafe probes:</strong> Using non-GS38 probes (long tips, unsafe)
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Assessors Want to See — Technical Competence:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Choose correct instrument for the fault</li>
                <li>Set the range correctly (e.g. 500V for IR, not 250V)</li>
                <li>Record values realistically, not "book answers"</li>
                <li>Work efficiently without repeated setting changes</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Assessors Want to See — Safety Compliance:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Use safe probe techniques with barriers</li>
                <li>Follow Test-Prove-Test sequence</li>
                <li>Handle equipment professionally</li>
                <li>Report any safety concerns immediately</li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />

            <CommonMistake
              title="Recording 'book answer' values instead of what you actually measured"
              whatHappens={
                <>
                  You write 0.00 Ω for continuity or "1 MΩ" for IR because that's what you remember
                  from college. The assessor knows real measurements have noise — even a perfect
                  connection might read 0.04 Ω after lead nulling. Recording suspiciously perfect
                  numbers tells them you didn't actually do the test.
                </>
              }
              doInstead={
                <>
                  Record what the meter showed. CPC continuity might be 0.18 Ω. IR L-N might be 199
                  MΩ. Zs might be 0.42 Ω. Real numbers, with real units, to the precision your MFT
                  displays. That's verification — that's what BS 7671 Part 6 wants.
                </>
              }
            />

            {/* Advanced Equipment Mastery */}
            <ConceptBlock title="5. Advanced Equipment Mastery">
              <p>
                <strong className="text-elec-yellow">
                  Equipment Calibration — Before Every AM2 Assessment:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Check calibration certificates are current (typically annual)</li>
                <li>Verify battery condition and charge level</li>
                <li>Test all functions on known good circuit</li>
                <li>Inspect leads for damage, kinks, or wear</li>
                <li>Ensure probe shrouds are secure and undamaged</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Professional Equipment Standards:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>CAT III or CAT IV rated test equipment preferred</li>
                <li>Fused test leads with HRC fuses (typically 500mA)</li>
                <li>Digital display with clear readings in all lighting</li>
                <li>Auto-ranging capability for efficient operation</li>
                <li>Data logging capability for record keeping</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Advanced Testing — Temperature Compensation:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Account for conductor temperature effects</li>
                <li>Use correction factors for accurate readings</li>
                <li>Consider ambient temperature variations</li>
                <li>Allow cables to stabilise before testing</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Advanced Testing — Measurement Uncertainty:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Understand instrument accuracy specifications</li>
                <li>Account for +/-5% typical measurement error</li>
                <li>Use multiple readings for critical measurements</li>
                <li>Document measurement conditions</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Common Equipment Problems in AM2:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Erratic readings:</strong> Usually poor connections or battery issues
                </li>
                <li>
                  <strong>Display problems:</strong> Check LCD contrast settings and lighting
                </li>
                <li>
                  <strong>Probe contact issues:</strong> Clean probe tips and check spring pressure
                </li>
                <li>
                  <strong>Auto-ranging delays:</strong> Switch to manual range for faster operation
                </li>
                <li>
                  <strong>Memory errors:</strong> Clear stored data and restart instrument
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Emergency Procedures:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Report equipment faults to assessor immediately</li>
                <li>Have backup equipment ready if permitted</li>
                <li>Know how to switch between different test methods</li>
                <li>Understand manual calculation methods as backup</li>
              </ul>
            </ConceptBlock>

            {/* Industry Standards and Compliance */}
            <ConceptBlock title="6. Industry Standards and Compliance">
              <p>
                <strong className="text-elec-yellow">
                  Legal and Insurance Requirements — Why proper testing matters beyond AM2:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Legal liability:</strong> Duty of care under Health & Safety at Work Act
                </li>
                <li>
                  <strong>Insurance validity:</strong> Claims may be rejected for non-compliant
                  testing
                </li>
                <li>
                  <strong>Professional standards:</strong> IET Code of Practice requirements
                </li>
                <li>
                  <strong>Competency evidence:</strong> Proper records prove professional competence
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">BS EN 61010 (Test Equipment Safety):</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Equipment must be CAT rated for application</li>
                <li>Overvoltage protection essential</li>
                <li>Double insulation or earthing required</li>
                <li>Clear marking and warnings mandatory</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">GS38 Key Requirements:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Probe tips: 2-4mm exposed maximum</li>
                <li>Lead protection: HRC fused at source</li>
                <li>Finger barriers: Prevent accidental contact</li>
                <li>Voltage rating: Adequate for system voltage</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Professional Development Through Testing:
                </strong>
              </p>
              <p>
                Mastering test equipment use in AM2 builds skills essential for career progression:
              </p>
              <p>
                <strong>Technical Skills:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Systematic diagnostic thinking</li>
                <li>Precision in measurement techniques</li>
                <li>Understanding of electrical principles</li>
                <li>Quality assurance mindset</li>
              </ul>
              <p>
                <strong>Professional Skills:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Clear communication with clients</li>
                <li>Accurate record keeping</li>
                <li>Safety-first mentality</li>
                <li>Continuous improvement approach</li>
              </ul>
            </ConceptBlock>

            {/* Practical Tips */}
            <ConceptBlock title="7. Practical Tips for Success">
              <p>
                <strong className="text-elec-yellow">Preparation Tips</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Familiarise with MFT controls before assessment</li>
                <li>Practice until settings are second nature</li>
                <li>Think before you test - which fault type suspected?</li>
                <li>Handle equipment neatly - keep leads tidy</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">During Assessment</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Work circuit by circuit - don't jump around</li>
                <li>Explain what you're doing clearly to assessor</li>
                <li>Record results immediately - don't repeat tests</li>
                <li>Stay calm and methodical under pressure</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Professional Communication</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>"I'm carrying out an insulation resistance test between line and neutral"</li>
                <li>"Reading shows 0.02MOhms indicating a short circuit"</li>
                <li>"Zeroing test leads to remove lead resistance"</li>
                <li>"Proving voltage indicator before isolation"</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Avoid Time Wasters</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Swapping settings repeatedly</li>
                <li>Using wrong test for suspected fault</li>
                <li>Forgetting to disconnect equipment</li>
                <li>Not recording results immediately</li>
              </ul>
            </ConceptBlock>

            {/* Real-World Examples */}
            <ConceptBlock title="8. Real-World Examples">
              <p>
                <strong className="text-elec-yellow">Example 1: Lead Zeroing Error</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Candidate forgot to zero continuity leads before testing.
              </p>
              <p>
                <strong>Result:</strong> Reading showed 0.7Ohms on CPC loop instead of actual
                0.05Ohms.
              </p>
              <p>
                <strong>Outcome:</strong> Assessor flagged as incorrect - marks lost for basic
                error.
              </p>

              <p>
                <strong className="text-elec-yellow">Example 2: Equipment Not Disconnected</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Candidate performed insulation resistance without
                disconnecting lamps.
              </p>
              <p>
                <strong>Result:</strong> Low reading due to lamp circuits, potential equipment
                damage.
              </p>
              <p>
                <strong>Outcome:</strong> Assessor marked down for procedure error and false
                reading.
              </p>

              <p>
                <strong className="text-elec-yellow">Example 3: Professional Practice</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Candidate used correct GS38 leads, proved tester
                before/after use.
              </p>
              <p>
                <strong>Process:</strong> Explained results clearly and demonstrated systematic
                approach.
              </p>
              <p>
                <strong>Outcome:</strong> Full marks for safety compliance and professional method.
              </p>

              <p>
                <strong className="text-elec-yellow">Example 4: Industry Safety Lesson</strong>
              </p>
              <p>
                <strong>Scenario:</strong> In industry, an electrician used damaged probes with
                exposed tips.
              </p>
              <p>
                <strong>Result:</strong> Arc flash occurred causing serious burns and equipment
                damage.
              </p>
              <p>
                <strong>Lesson:</strong> Same unsafe practice in AM2 equals instant fail - safety is
                non-negotiable.
              </p>
            </ConceptBlock>

            <FAQ items={faqs} />

            {/* Summary */}
            <ConceptBlock title="10. Section Summary">
              <p>
                <strong className="text-elec-yellow">Efficient Test Equipment Use Means:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Selecting</strong> the right instrument for the fault
                </li>
                <li>
                  <strong>Using</strong> GS38-compliant probes and safe handling
                </li>
                <li>
                  <strong>Setting up</strong> instruments correctly before testing
                </li>
                <li>
                  <strong>Recording</strong> real results, not guesses
                </li>
                <li>
                  <strong>Working</strong> confidently and neatly under time pressure
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Remember:</strong> Unsafe or sloppy tester use
                can lose you marks - or fail you outright. The assessor is evaluating not just your
                technical knowledge, but your professional competence and safety awareness.
              </p>
            </ConceptBlock>

            <KeyTakeaways
              points={[
                "Voltage indicator for safe isolation (prove-test-prove). MFT for continuity, IR, Zs, RCD. Don't mix the roles.",
                'GS38: shrouded probes, 2–4 mm tip, finger barriers, fused leads. Damaged kit = replace, never repair. No exceptions on AM2 day.',
                'Settings to know cold: 200 mA continuity (zero leads first), 500 V DC IR (disconnect electronics first), Zs against BS 7671 maximums (1.37 Ω for 32A Type B).',
                'RCD test: ×½ should NOT trip, ×1 trips ≤ 300 ms (general purpose), ×5 trips ≤ 40 ms (BS EN 61008/61009 30 mA RCDs).',
                "Record real measurements with real units. 'OK', 'pass', or suspiciously perfect 0.00 / 1.00 numbers fail the verification spirit of BS 7671 Reg 643.",
              ]}
            />

            {/* Quiz Section */}
            <div className="border-t border-white/10 pt-8">
              <Quiz
                title="Test Your Knowledge: Using Test Equipment Efficiently"
                questions={quizQuestions}
              />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/study-centre/apprentice/am2/module5/section2"
                className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  Logical Process
                </div>
              </Link>
              <Link
                to="/study-centre/apprentice/am2/module5/section4"
                className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-black truncate">
                  Proving Rectification
                </div>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section3;
