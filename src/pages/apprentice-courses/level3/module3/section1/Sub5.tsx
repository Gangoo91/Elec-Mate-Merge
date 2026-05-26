/**
 * Module 3 · Section 1 · Subsection 5 — Measuring instruments
 * Maps to C&G 2365-03 / Unit 302 — supplementary depth (instrument selection)
 *
 * Primary AC mapping is via layered 2357 Unit 609 ELTK08 / AC 2.3:
 *   AC 2.3 — "identify appropriate electrical instruments for the measurement and calculation of different electrical values"
 * Unit 302 LOs cover the underlying maths/electrical principles; instrument
 * selection is grounded in the layered 2357 Unit 609 syllabus.
 *
 * Right instrument for the right quantity. CAT ratings, true-RMS vs averaging, and how
 * to read a Megger MFT, a clamp meter and a power-quality analyser without lying to
 * yourself about the result.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Measuring instruments | Level 3 Module 3.1.5 (AC 1.1, 2.3) | Elec-Mate';
const DESCRIPTION =
  'Voltmeter, ammeter, multimeter, MFT, clamp meter, power-quality analyser and oscilloscope. Right instrument, right CAT rating, right reading.';

const checks = [
  {
    id: 'l3-m3-1-5-cat',
    question:
      'You are testing at the origin of an installation (cut-out). What CAT rating should the meter be?',
    options: [
      'CAT III 300 V',
      'CAT II 300 V',
      'CAT IV 600 V',
      'Any CAT rating',
    ],
    correctIndex: 2,
    explanation:
      "CAT IV is for measurements at the origin of the installation — utility connection, supply tails. CAT III is for distribution boards downstream. Using a lower-CAT meter at the origin risks the meter exploding if there's a transient overvoltage on the supply.",
  },
  {
    id: 'l3-m3-1-5-true-rms',
    question:
      'You are clamping a current that includes harmonic distortion (LED loads, VFDs). Which type of meter gives the correct reading?',
    options: [
      'Average-responding multimeter',
      'True-RMS multimeter',
      'Analogue moving-coil meter',
      'Any digital multimeter',
    ],
    correctIndex: 1,
    explanation:
      'A true-RMS meter calculates RMS from the actual waveform. An average-responding meter assumes a pure sine wave and reads low (often 10-30 %) on distorted waveforms. With modern non-linear loads always use true-RMS.',
  },
  {
    id: 'l3-m3-1-5-clamp',
    question:
      "A standard clamp meter shows 0 A on a 32 A radial that you know is loaded. The likely cause:",
    options: [
      'Boosting optical signal strength without converting to electrical',
      'You are clamping ALL the conductors of the circuit (line + neutral) so the fields cancel',
      'All connections secure, covers replaced, no tools left, all tests complete',
      'Verify all results are within limits and calculations are correct',
    ],
    correctIndex: 1,
    explanation:
      'Clamp meters work by sensing the magnetic field around a conductor. If you clamp line AND neutral together, equal-and-opposite currents cancel and you get zero. Clamp ONE conductor at a time. (Or use the trick to find earth-leakage by clamping line+neutral together — anything that doesn\'t balance is leakage.)',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A voltmeter is connected:',
    options: [
      'In series with the load',
      'In parallel across the load',
      'Between live and earth only',
      'In the neutral conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Voltmeters have very high internal resistance and connect across (parallel to) the component being measured.',
  },
  {
    id: 2,
    question: 'An ammeter is connected:',
    options: [
      'Between live and earth',
      'In parallel across the load',
      'In series with the load',
      'Anywhere in the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Ammeters have very low resistance and go in series so the circuit current flows through them. (Clamp meters are different — they sense the field around a conductor without breaking it.)',
  },
  {
    id: 3,
    question: 'CAT IV 600 V means the meter is rated for:',
    options: [
      'Up to 600 V transients only',
      '600 V at any installation point',
      'The maximum DC voltage is 600 V',
      '600 V at the supply origin (CAT IV)',
    ],
    correctAnswer: 3,
    explanation:
      'CAT IV is for measurements at the source/origin. The 600 V is the working voltage; the rating includes withstand against the impulses typical at that point in the system.',
  },
  {
    id: 4,
    question: 'Insulation resistance test voltage for a 230/400 V circuit (BS 7671 Table 64):',
    options: [
      '500 V dc',
      '250 V dc',
      '1000 V dc',
      '2500 V dc',
    ],
    correctAnswer: 0,
    explanation:
      'For circuits up to 500 V (excluding SELV/PELV), test at 500 V dc. The minimum acceptable reading is 1.0 MΩ.',
  },
  {
    id: 5,
    question:
      'You need to measure earth fault loop impedance Zs. Which instrument?',
    options: [
      'Clamp meter',
      'Loop tester',
      'Megger insulation tester',
      'Multimeter on Ω range',
    ],
    correctAnswer: 1,
    explanation:
      'A loop tester injects a known load briefly and measures the volt-drop to calculate Zs. Multimeter ohms cannot do this — it can\'t energise the live supply.',
  },
  {
    id: 6,
    question: 'Power factor is most accurately measured with:',
    options: [
      'Voltmeter',
      'Ammeter',
      'Power-quality analyser',
      'Megger',
    ],
    correctAnswer: 2,
    explanation:
      'A PQ analyser captures voltage AND current waveforms simultaneously, calculating cos φ, harmonics, true power, apparent power, etc. A clamp meter with PF function gives an approximation; a true PQ analyser gives data you can act on.',
  },
  {
    id: 7,
    question: 'An oscilloscope shows you:',
    options: [
      'Dusts, fumes, and chemical vapours',
      'Polarised Light Microscopy',
      'Check for proper sealing and protection',
      'The voltage waveform shape vs time',
    ],
    correctAnswer: 3,
    explanation:
      'An oscilloscope traces the actual waveform — sine, square, distorted, transient. Used for fault-finding, EMC investigation, and verifying inverter outputs. Not a daily install tool but essential in commissioning.',
  },
  {
    id: 8,
    question: 'When should you proof-test a meter on a known supply before and after use?',
    options: [
      'Before AND after every isolation procedure',
      'Manufacturing plants, factories, and heavy industry',
      'Automatic failure for unsafe practice',
      'O₂ at 20.8%, LEL at 0%, CO at 0 ppm, H₂S at 0 ppm',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 / safe isolation procedure: prove the meter on a known live source BEFORE testing for absence of voltage, then prove again AFTER. This catches a meter that has failed during the isolation check — the worst time to find out.',
  },
];

const faqs = [
  {
    question: "What's the difference between a multimeter and an MFT?",
    answer:
      "A multimeter (DMM) measures V, I, R, continuity and sometimes capacitance. An MFT (multifunction tester — Megger, Fluke, Kewtech etc.) bundles in continuity (R1+R2, R2), insulation resistance (500 V/1000 V dc), loop impedance (Zs, Ze, ZdB), prospective fault current, and RCD trip-time/trip-current testing. The MFT is what you use for initial verification and EICRs; the multimeter is for general fault finding.",
  },
  {
    question: 'Do I need true-RMS for everything?',
    answer:
      "Yes for any modern install. LED drivers, VFDs, computer PSUs and inverters all draw distorted current waveforms. Average-responding meters assume a pure sine and read low. True-RMS isn't more expensive these days — make it your default.",
  },
  {
    question: 'Why does my clamp meter read different from the MFT line current?',
    answer:
      "Two reasons. First, the clamp meter calibration class might be 2 % whereas the MFT is 1 %. Second, the loads are time-varying — by the time you walk to the cupboard, the load has changed. Take both readings simultaneously if you need to compare.",
  },
  {
    question: 'When does an analogue meter still beat a digital one?',
    answer:
      "When you need to spot a slow trend or a flicker. The needle of a moving-coil meter moves smoothly, so you can see a voltage drifting up or down. A digital reading flickers and is harder to interpret in real time. Most fault-finding electricians have one of each in the van.",
  },
  {
    question: 'Are all my instruments calibrated?',
    answer:
      "They should be. NICEIC and other accreditation bodies require annual calibration to a UKAS-traceable standard. Calibration cert lives in the van or office. An out-of-cal meter invalidates every test you signed off using it.",
  },
  {
    question: 'What is a power-quality analyser used for?',
    answer:
      "PQ analysers log voltage and current over hours or days, capturing dips, swells, harmonics, transients, flicker and unbalance. Used when a customer reports unexplained tripping, motor failures or sensitive equipment damage. The analyser shows whether the supply is the cause.",
  },
];

export default function Sub5() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 5"
            title="Measuring instruments"
            description="Voltmeter, ammeter, multimeter, MFT, clamp meter, PQ analyser, oscilloscope. Pick the right tool, with the right CAT rating, and read it correctly."
            tone="yellow"
          />

          <TLDR
            points={[
              'Voltmeter goes in parallel; ammeter goes in series. Get this swapped and you blow the meter or short the circuit.',
              'CAT III for distribution-level testing; CAT IV for the supply origin. Wrong CAT = potential meter explosion in a transient.',
              'True-RMS meters read distorted waveforms accurately; average-responding meters read low on modern non-linear loads.',
              'MFT does insulation, continuity, loop and RCD; multimeter does V/I/R; PQ analyser logs over time. Pick the right tool.',
              'Always proof-test the meter on a known live source before AND after isolation work (GS38).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the correct instrument for each electrical quantity (V, I, R, Zs, IR, pf, harmonics).',
              'Choose the correct CAT rating for the test location.',
              'Distinguish true-RMS from average-responding meters and explain when each fails.',
              'Demonstrate the GS38 safe isolation proof-test sequence.',
              'Read insulation resistance, loop impedance and current measurements with correct units.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Voltmeters and ammeters — fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Voltmeter in parallel, ammeter in series"
            plainEnglish="A voltmeter measures the potential difference across a component, so it sits in parallel. An ammeter measures the current flowing through, so it sits in series. Get the connection wrong and you either short the supply (ammeter in parallel) or read nothing (voltmeter in series)."
          >
            <p>
              Voltmeters have very high internal resistance (tens of MΩ) so they don't draw
              significant current. Ammeters have very low internal resistance so the voltage drop
              across them is negligible.
            </p>
            <p>
              Modern multimeters combine both — switch the function and re-arrange the leads.
              Most failures from this come from leaving the leads in the A jacks, switching to V,
              and connecting across a live circuit. The low-impedance A circuit becomes a short
              across the supply. Bang.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Clamp meters — measure current without breaking the circuit"
            plainEnglish="A clamp meter has two jaws that close around a single conductor. The current produces a magnetic field, the jaws sense it, and the meter reads the current. No need to disconnect anything."
            onSite="Clamp ONE conductor only — line OR neutral, not both. If you clamp both, the equal and opposite currents cancel and you read zero. Useful trick: clamp line+neutral together to detect earth-leakage current — anything other than zero is leakage."
          >
            <p>
              AC-only clamps use a current transformer in the jaws. They cannot read DC. AC/DC
              clamps use a Hall-effect sensor — more expensive, used for inverter output, EV
              charging and PV string testing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>CAT ratings — survive the transient</ContentEyebrow>

          <ConceptBlock
            title="Where in the system are you testing?"
            plainEnglish="The further upstream (closer to the supply transformer), the bigger the energy of any transient. CAT II is fixed loads behind a socket; CAT III is at the distribution board; CAT IV is at the meter and incoming supply."
            onSite="Always check the CAT rating printed on the meter and the leads. A CAT II 600 V meter clamped onto a CAT IV location may explode in a transient — and that\'s not hyperbole, the IEC 61010 standard exists because meters DID explode."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CAT I</strong> — protected electronic circuits inside equipment.
              </li>
              <li>
                <strong>CAT II</strong> — single-phase appliances and outlets at the end of a
                circuit (washing machine, kettle).
              </li>
              <li>
                <strong>CAT III</strong> — distribution wiring, DBs, motor circuits, fixed
                installations.
              </li>
              <li>
                <strong>CAT IV</strong> — origin of the installation, supply tails, meter
                position, outdoor underground or overhead lines.
              </li>
            </ul>
            <p>
              The CAT rating is paired with a voltage (CAT III 600 V, CAT IV 1000 V). Both
              numbers matter — voltage is the steady working voltage, CAT is the impulse withstand
              category at that location.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61010-1:2010+A1:2019 — Safety requirements for electrical equipment for measurement, control, and laboratory use"
            clause="Measuring circuits used for mains measurement shall be classified as CAT II, III or IV depending on the location of measurement. CAT IV applies at the source of the low-voltage installation."
            meaning={
              <>
                The CAT rating isn\'t just marketing — it\'s a tested impulse withstand. Buy meters
                rated for the highest-CAT location you ever work at. CAT IV 1000 V is a sensible
                default for installation electricians; never use CAT II for fixed-wiring work.
              </>
            }
            cite="Source: BS EN 61010-1:2010+A1:2019 (Safety requirements for measuring equipment)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.2.1"
            clause="During erection and on completion of an installation or an addition or alteration to an installation, and before it is put into service, appropriate inspection and testing shall be carried out by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. Appropriate certification shall be issued in accordance with Chapter 64."
            meaning={
              <>
                Reg 134.2.1 is the verification anchor — the duty to inspect and test before
                putting the installation into service. Every test in that verification (continuity,
                insulation resistance, polarity, Z<sub>s</sub>, RCD operation) is read from the
                instruments covered in this Sub. The competence Reg 134.2.1 assumes includes
                knowing your meter&apos;s CAT rating, true-RMS behaviour and accuracy class —
                otherwise the certificate is built on values you cannot defend.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 134.2.1 — additions and alterations to an installation."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (Insulation resistance, redrafted in A4:2026)"
            clause="Regulation 643.3 has been redrafted in A4:2026. The requirements for testing insulation resistance where equipment is likely to influence the verification test or be damaged have been clarified, and reference is made to a 250 V DC test following the connection of equipment. The requirements for RCD testing have also been changed: Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted, and regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify effectiveness."
            meaning={
              <>
                Reg 643.3 is the test that pulls a Megger MFT through its full range. The
                instrument has to deliver 500 V DC for a normal LV test, drop to 250 V DC where
                sensitive equipment is connected (LED drivers, SPDs, electronic controls), and
                read insulation in megohms accurately. The A4:2026 redraft also simplified RCD
                verification to a single AC test at IΔn — no more 1/2 IΔn or 5 IΔn sequence.
                Knowing the MFT is doing what it claims — and reading correctly through its lead
                resistance and zeroing — is part of the L3 measurement competence the regulation
                expects.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.3 (insulation resistance, redrafted in A4:2026)."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>True-RMS vs average-responding</ContentEyebrow>

          <ConceptBlock
            title="Modern loads are NOT pure sine waves"
            plainEnglish="An average-responding meter assumes the waveform is a perfect sine and applies a fixed correction (multiplied by 1.11). A true-RMS meter calculates the actual heating value from the waveform. On distorted waveforms — LED drivers, VFDs, switching power supplies — the average-responding meter reads low, sometimes by 30 % or more."
            onSite="If you measure 8 A on a circuit feeding a row of LED downlights with an average-responding meter, the actual current might be 11 A. Cable sized for 8 A is now overloaded and may overheat without tripping."
          >
            <p>
              The shorthand on the meter is usually "True RMS" or "TRMS" printed near the model
              number. If it doesn\'t say so, assume it\'s average-responding.
            </p>
            <p>
              For modern installs (anything with LED, VFD, EV charging, inverter, computer load)
              true-RMS is essential. It costs an extra £30-£50 over an averaging meter and pays
              for itself the first time it stops you under-sizing a cable.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The MFT and other dedicated testers</ContentEyebrow>

          <ConceptBlock
            title="One instrument for the whole verification"
            plainEnglish="The Multifunction Tester (Megger MFT-1741, Fluke 1664, Kewtech KT64 etc.) bundles continuity, insulation resistance, loop impedance, prospective fault current and RCD trip testing into one box, with auto-test sequences."
          >
            <p>What an MFT measures (each at the correct test voltage and current):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity (R1+R2, R2)</strong> — low-current 4-wire test, displays in Ω
                with milliohm resolution.
              </li>
              <li>
                <strong>Insulation resistance (IR)</strong> — 250 V, 500 V or 1000 V dc test
                voltage, displays MΩ or GΩ.
              </li>
              <li>
                <strong>Loop impedance (Zs, Ze, Z<sub>dB</sub>)</strong> — high- or low-current
                pulse to measure loop with the supply live.
              </li>
              <li>
                <strong>Prospective fault current (PSCC, PEFC)</strong> — calculated from loop and
                supply voltage.
              </li>
              <li>
                <strong>RCD trip time and trip current</strong> — injects a known fault current at
                ½×, 1× or 5× the rated trip current, measures time to trip.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Power-quality analyser — when the supply itself is the suspect"
            plainEnglish="When customers complain that \'computers keep crashing' or 'lights flicker when the lift starts', a multimeter snapshot won't catch the cause. A PQ analyser logs voltage, current, harmonics and transients over hours or days."
            onSite="Common findings: 7 % voltage dip when the air-con compressor starts (acceptable); 11th harmonic at 18 % from VFD loads (causes neutral overheating); transient overvoltages from a faulty lift contactor. The analyser provides the evidence for the remedial work."
          >
            <p>
              Standards to know: BS EN 50160 (voltage characteristics of public supply) and BS EN
              61000-4-30 (PQ measurement methods). UK supply must stay within ±10 % of nominal,
              with limits on harmonic distortion, flicker and short interruptions.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Insulation resistance test — voltage, minimum value, and what failure means"
            plainEnglish="The MFT applies a DC voltage between conductors and earth (or between conductors). Healthy insulation lets almost no current flow, giving a high resistance reading (MΩ or GΩ). A low value means damage, moisture or wear in the insulation."
            onSite="BS 7671 Table 64 sets the test voltage by circuit type. A 230 V or 400 V circuit is tested at 500 V dc with a minimum acceptable reading of 1.0 MΩ. SELV circuits at 250 V dc, minimum 0.5 MΩ. HV equipment may be tested at 1000 V or 2500 V."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SELV / PELV</strong> — 250 V dc test, min 0.5 MΩ.</li>
              <li><strong>LV up to 500 V</strong> (230/400 V) — 500 V dc test, min 1.0 MΩ.</li>
              <li><strong>LV 500–1000 V</strong> — 1000 V dc test, min 1.0 MΩ.</li>
              <li>Disconnect electronics (LED drivers, EVSE, surge protection) before test — 500 V dc will destroy them.</li>
            </ul>
            <p>
              Practical interpretation: a brand-new circuit reads &gt;200 MΩ typically. A reading
              between 1 and 20 MΩ is the warning zone — investigate before energising. Below 1 MΩ
              fails BS 7671. Below 0.5 MΩ on a healthy-looking install often means a forgotten
              electronic load left in the circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Resolution, accuracy and calibration class"
            plainEnglish="A meter that displays 1.234 V isn't necessarily accurate to ±0.001 V. RESOLUTION is what the display can show; ACCURACY is how close that reading is to the true value, set by the calibration class."
            onSite="A class 2 % MFT loop tester reading Z_s = 0.45 Ω could actually be anywhere from 0.441 to 0.459 Ω. For values close to the limit (e.g. Z_s allowed = 0.46 Ω), you need to add the meter's accuracy as a margin — the design value should sit comfortably inside accuracy + safety factor."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Resolution</strong> = smallest displayed step (3½-digit DMM = 1999 counts).</li>
              <li><strong>Accuracy</strong> = ± (% of reading + n digits). Cheap clamp ±2 % + 5 digits; lab DMM ±0.05 % + 1 digit.</li>
              <li><strong>Calibration class</strong> = traceable to UKAS standard. Class 1 = ±1 %, class 2 = ±2 %.</li>
              <li><strong>Calibration interval</strong> = annual for installation work; six-monthly for high-stakes verification.</li>
            </ul>
            <p>
              Worked example: Z_s reading 0.42 Ω on a ±2 % + 1 digit meter at 0.01 Ω resolution.
              Tolerance = (0.02 × 0.42) + 0.01 = 0.0184 Ω. So actual Z_s could be 0.40 to 0.44 Ω.
              For BS 7671 verification you accept the worst-case reading (0.44 Ω) when comparing
              to the limit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Skipping the meter proof-test on safe isolation"
            whatHappens={
              <>
                Apprentice tests the dead circuit, gets 0 V, removes the lock-off, starts work.
                Three minutes in, they touch a \'dead' line conductor and get a shock. The meter
                had developed an internal fault during the test — common after a transient knocks
                the input protection.
              </>
            }
            doInstead={
              <>
                GS38 sequence: prove the meter on a KNOWN live source (proving unit, or another
                live circuit), test the suspected dead circuit (should read 0 V), then re-prove on
                the known source to confirm the meter still works. If step 3 fails, treat step 2
                as suspect and re-test before working.
              </>
            }
          />

          <Scenario
            title="Choosing the right instrument for a power-quality investigation"
            situation={
              <>
                Customer reports unexplained MCB trips on a kitchen ring (32 A type B). They\'ve
                added two combi-microwaves, a coffee machine and a bank of LED downlights since
                the install. Multimeter reading at the DB shows 28 A line current. The MCB still
                trips intermittently.
              </>
            }
            whatToDo={
              <>
                A multimeter snapshot only tells you steady-state. Use a clamp meter with min/max
                logging for an hour — captures the inrush current when the microwave starts.
                Likely peak: 60+ A for &lt;100 ms. A type B MCB will trip at 3-5× rated current,
                so 96-160 A. The instantaneous trip threshold is 96 A. Inrush from cold-magnetron
                microwaves easily hits this.
                <br />
                Solution: change to type C MCB (5-10× rated, 160-320 A trip), or split the load
                across two circuits.
              </>
            }
            whyItMatters={
              <>
                Without the right instrument you\'d never see the inrush spike. The maths
                (rated × multiplier = trip threshold) is the same as on every other circuit; you
                just need a logging meter to capture the transient.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltmeter parallel, ammeter series. Clamp meter clamps ONE conductor.',
              'CAT IV at the supply origin; CAT III at distribution; CAT II at appliances. Match meter to location.',
              'True-RMS for modern non-linear loads (LED, VFD, inverter); averaging meters under-read distorted waveforms.',
              'MFT for initial verification and EICR; multimeter for fault-finding; PQ analyser for supply investigations.',
              'GS38 proof-test sequence: live → dead → live again. Never skip the second proof.',
              'Calibration certificate is mandatory for accreditation work — keep it current and traceable.',
            ]}
          />

          <Quiz title="Measuring instruments knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 Energy and efficiency
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — DC and AC theory advanced
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
