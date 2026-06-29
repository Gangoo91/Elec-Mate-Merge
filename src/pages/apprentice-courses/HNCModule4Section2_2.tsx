/**
 * Module 4 · Section 2 · Subsection 2 — Voltage Drop Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   BS 7671 voltage drop limits (3% lighting, 5% power), the mV/A/m method, three-phase
 *   formulas and motor starting / long-run mitigations.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Voltage Drop Calculations - HNC Module 4 Section 2.2';
const DESCRIPTION =
  'Master voltage drop calculations using the mV/A/m method, BS 7671 limits and three-phase calculations for building services cable sizing.';

const quickCheckQuestions = [
  {
    id: 'vd-limit-power',
    question:
      'What is the maximum permitted voltage drop for power circuits from the origin to the load?',
    options: [
      '4%',
      '5%',
      '6%',
      '3%',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 permits a maximum 5% voltage drop for power circuits (11.5V at 230V). This can be split between the supply and final circuit, typically 2.5% each.',
  },
  {
    id: 'vd-limit-lighting',
    question: 'What is the maximum permitted voltage drop for lighting circuits?',
    options: [
      '3%',
      '4%',
      '5%',
      '6%',
    ],
    correctIndex: 0,
    explanation:
      'Lighting circuits have a tighter 3% limit (6.9V at 230V) to prevent visible flicker and dimming, particularly important for discharge lamps.',
  },
  {
    id: 'mva-m-meaning',
    question: 'What does the mV/A/m value from BS 7671 tables represent?',
    options: [
      'Minimum voltage allowed per metre',
      'Millivolts dropped per amp per metre of cable',
      'Maximum voltage per ampere',
      'Motor voltage at full load',
    ],
    correctIndex: 1,
    explanation:
      'The mV/A/m value is the voltage drop in millivolts for each ampere of current flowing through each metre of cable. It simplifies voltage drop calculations.',
  },
  {
    id: 'three-phase-vd',
    question:
      'For three-phase circuits, why is the voltage drop formula different from single-phase?',
    options: [
      'Three-phase circuits always carry twice the current',
      'The neutral conductor is sized at half the line',
      'No neutral current in balanced loads',
      'The supply voltage is lower for three-phase loads',
    ],
    correctIndex: 2,
    explanation:
      'In balanced three-phase circuits, current returns via the other phases rather than a neutral, so voltage drop is calculated for line voltage using the √3 factor inherently in the tables.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the voltage drop formula for single-phase circuits using the mV/A/m method?',
    options: [
      'Vd = mV/A/m × I × L',
      'Vd = (mV/A/m × I × L) / 1000',
      'Vd = mV/A/m × I × L × 2',
      'Vd = mV/A/m × L / I',
    ],
    correctAnswer: 1,
    explanation:
      'Vd = (mV/A/m × I × L) / 1000. Division by 1000 converts millivolts to volts. The mV/A/m value already accounts for both conductors in single-phase circuits.',
  },
  {
    id: 2,
    question:
      'A 30m single-phase circuit carries 25A using 4mm² cable (mV/A/m = 11). What is the voltage drop?',
    options: [
      '11V',
      '5.5V',
      '8.25V',
      '16.5V',
    ],
    correctAnswer: 2,
    explanation: 'Vd = (11 × 25 × 30) / 1000 = 8250 / 1000 = 8.25V',
  },
  {
    id: 3,
    question: 'For a 230V single-phase circuit, 5% voltage drop equals:',
    options: [
      '13.8V',
      '9.2V',
      '23V',
      '11.5V',
    ],
    correctAnswer: 3,
    explanation:
      '5% of 230V = 0.05 × 230 = 11.5V. This is the maximum permitted drop for power circuits.',
  },
  {
    id: 4,
    question: 'Why might motor starting cause excessive voltage drop?',
    options: [
      'Motors draw 6-8 times full load current during starting',
      'Motors run at a lower power factor when warm',
      'Motors require a higher supply voltage to start',
      'Motors increase the cable resistance during starting',
    ],
    correctAnswer: 0,
    explanation:
      'Direct-on-line motor starting draws 6-8 times full load current. For a motor with Ib = 20A, starting current could be 120-160A, causing proportionally higher voltage drop.',
  },
  {
    id: 5,
    question: 'What happens to voltage drop as cable length increases?',
    options: [
      'It decreases proportionally',
      'It increases proportionally',
      'It increases exponentially',
      'It remains constant',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop is directly proportional to cable length (Vd = mV/A/m × I × L). Doubling the length doubles the voltage drop.',
  },
  {
    id: 6,
    question:
      'For long cable runs exceeding voltage drop limits, which solution is most cost-effective?',
    options: [
      'Use higher supply voltage',
      'Reduce the load',
      'Use a larger cable size',
      'Install multiple parallel cables',
    ],
    correctAnswer: 2,
    explanation:
      "Increasing cable size reduces resistance and therefore voltage drop. While more expensive per metre, it's usually more cost-effective than parallel runs or voltage conversion.",
  },
  {
    id: 7,
    question: 'In three-phase balanced systems, the voltage drop formula uses:',
    options: [
      'Single-phase mV/A/m values',
      'Single-phase values divided by √3',
      'Single-phase values multiplied by 3',
      'Three-phase mV/A/m values from tables',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 provides separate mV/A/m columns for three-phase circuits. These values are typically √3/2 (0.866) times the single-phase values.',
  },
  {
    id: 8,
    question:
      'A cable has mV/A/m values of 4.4 (r) and 0.165 (x). At power factor 0.8, the effective mV/A/m is:',
    options: [
      '3.62',
      '4.57',
      '3.52',
      '4.4',
    ],
    correctAnswer: 0,
    explanation:
      'mV/A/m = (r × cos φ) + (x × sin φ) = (4.4 × 0.8) + (0.165 × 0.6) = 3.52 + 0.099 = 3.62 mV/A/m',
  },
  {
    id: 9,
    question:
      'What is the purpose of the voltage drop limit being split between mains and final circuits?',
    options: [
      'To double the total voltage drop allowed overall',
      'To allow design flexibility while maintaining total compliance',
      'To remove the need to calculate sub-main drop',
      'To allow lighting circuits to use the 5% power limit',
    ],
    correctAnswer: 1,
    explanation:
      'The 5% total can be allocated flexibly (e.g., 2% mains + 3% final, or 3% mains + 2% final) depending on circuit requirements and cable lengths.',
  },
  {
    id: 10,
    question:
      'For a 50m three-phase circuit with 40A load using 10mm² cable (mV/A/m = 3.8 3φ), the voltage drop is:',
    options: [
      '3.8V',
      '76V',
      '7.6V',
      '19V',
    ],
    correctAnswer: 2,
    explanation:
      'Vd = (3.8 × 40 × 50) / 1000 = 7600 / 1000 = 7.6V. At 400V line voltage, this is 1.9% - well within limits.',
  },
];

const faqs = [
  {
    question: 'Why do lighting circuits have stricter voltage drop limits than power circuits?',
    answer:
      'Lighting is sensitive to voltage variations - discharge lamps may flicker or fail to start, and LED drivers may operate inefficiently. The 3% limit ensures reliable lamp operation and consistent light output. Additionally, lighting circuits often have longer cable runs to multiple luminaires.',
  },
  {
    question: 'How do I handle voltage drop for circuits with varying loads?',
    answer:
      'Calculate voltage drop for the maximum design current (Ib). For circuits with diversity applied, use the diversified current. For motor circuits, check both running current (for continuous operation) and starting current (for momentary drop during start-up).',
  },
  {
    question: "What's the difference between tabulated mV/A/m values at column (r) and (x)?",
    answer:
      'Column (r) gives the resistive component and (x) gives the reactive component. For resistive loads (unity power factor), use the (r) value. For reactive loads (motors, transformers), calculate the effective value using: mV/A/m = (r × cos φ) + (x × sin φ).',
  },
  {
    question: 'Can I exceed the 5% voltage drop limit in any circumstances?',
    answer:
      'BS 7671 Appendix 4 Note 3 permits higher limits where the equipment manufacturer confirms acceptable operation. Motor starting transients may temporarily exceed limits. However, sustained operation beyond 5% risks equipment malfunction and should be avoided.',
  },
  {
    question: 'How does temperature affect voltage drop calculations?',
    answer:
      'Cable resistance increases with temperature. BS 7671 mV/A/m values are given at conductor operating temperature (typically 70°C for PVC, 90°C for XLPE). For lightly loaded cables running cooler, actual voltage drop will be slightly less than calculated.',
  },
  {
    question: 'Should I include the neutral conductor in single-phase voltage drop calculations?',
    answer:
      'No, the mV/A/m values in BS 7671 already account for both the line and neutral conductors in single-phase circuits. The value represents the total voltage drop for the complete circuit - do not multiply by 2.',
  },
];

const HNCModule4Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 2"
            title="Voltage Drop Calculations"
            description="Ensuring adequate voltage at the load through proper cable sizing and route planning."
            tone="purple"
          />

          <TLDR
            points={[
              'BS 7671 Appendix 4, Section 6.4 sets the voltage-drop limits: 3% lighting, 5% other circuits, on installations supplied from the public LV network.',
              'V_d = (mV/A/m × I_b × L) / 1000 — the mV/A/m figures come straight from Appendix 4 cable tables and already account for cable type and reference method.',
              'Voltage drop is cumulative — sub-main + final circuit must together stay inside the limit. Allocate ≈ 1–2% to sub-mains, leaving ≈ 3% for the final circuit.',
              'For long runs, motor inrush, EV chargers and other reactive loads, the mV/A/m must be the impedance value (mV/A/m_z), not just resistance.',
              'BS 7671 Reg 525.202 confirms compliance is &lsquo;deemed satisfied&rsquo; when measured V_d at the socket or fixed-equipment terminals does not exceed Appendix 4 limits.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 525.202 (Voltage drop in consumers' installations)"
            clause="The voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment shall not exceed the values stated in Appendix 4, Section 6.4. This requirement is deemed to be satisfied when those values are met."
            meaning={
              <>
                Reg 525.202 makes voltage-drop compliance a measured outcome at the end of the
                cable, not just a calculation. The Appendix 4 limits (3% lighting, 5% other) are
                cumulative from the supply origin to the final outlet. As the designer, your
                budget split — typically 1–2% on the sub-main, 3% on the final circuit — has to
                add up. Long runs, high power-factor loads and grouped circuits all eat the
                budget faster than the basic tables suggest.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 525.202; BS 7671 Appendix 4, Section 6.4."
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 7671 voltage drop limits for different circuit types',
              'Use the mV/A/m method for voltage drop calculations',
              'Calculate voltage drop for single and three-phase circuits',
              'Account for power factor in reactive load calculations',
              'Size cables for long cable runs and motor circuits',
              'Allocate voltage drop between mains and final circuits',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="BS 7671 Voltage Drop Limits">
            <p>
              BS 7671 Appendix 4 specifies maximum voltage drop limits to ensure equipment operates
              correctly and efficiently. These limits apply from the origin of the installation to
              the most distant point.
            </p>
            <p>
              <strong>Permitted voltage drop limits (limit / at 230V / at 400V):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting:</strong> 3% / 6.9V / 12V
              </li>
              <li>
                <strong>Other circuits (power):</strong> 5% / 11.5V / 20V
              </li>
            </ul>
            <p>
              <strong>Allocating voltage drop:</strong> the total permitted drop can be split
              between different parts of the installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sub-main (origin to DB):</strong> 2-3%
              </li>
              <li>
                <strong>Final circuit (DB to load):</strong> 2-3%
              </li>
              <li>Combined total must not exceed 5% (power) or 3% (lighting)</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Allow 2.5% for sub-mains and 2.5% for final circuits as a
              balanced starting point.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="The mV/A/m Method">
            <p>
              BS 7671 Appendix 4 provides mV/A/m values for each cable type and size. This method
              simplifies voltage drop calculations by combining cable resistance and reactance into
              a single value.
            </p>
            <p>
              <strong>Voltage drop formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase:</strong> Vd = (mV/A/m × I × L) / 1000 — result in volts
              </li>
              <li>
                <strong>Three-phase:</strong> Vd = (mV/A/m × I × L) / 1000 — use 3φ column values
              </li>
            </ul>
            <p>
              <strong>Typical mV/A/m values (PVC/copper at 70°C, 2-core 1φ / 3-4-core 3φ /
              typical use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5mm²: 29 / 25 / lighting</li>
              <li>2.5mm²: 18 / 15 / sockets, FCUs</li>
              <li>4mm²: 11 / 9.5 / water heaters</li>
              <li>6mm²: 7.3 / 6.4 / showers, cookers</li>
              <li>10mm²: 4.4 / 3.8 / sub-mains</li>
              <li>16mm²: 2.8 / 2.4 / distribution</li>
              <li>25mm²: 1.75 / 1.5 / main distribution</li>
            </ul>
            <p>
              <strong>Note:</strong> XLPE cables have slightly lower mV/A/m values than PVC due to
              lower resistance at operating temperature.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Three-Phase Calculations">
            <p>
              Three-phase voltage drop calculations use the same formula but with different mV/A/m
              values. The result is the line-to-line voltage drop, which is compared against the
              400V supply.
            </p>
            <p>
              <strong>Three-phase voltage drop:</strong> Vd = (mV/A/m₃φ × IL × L) / 1000, where IL
              is the line current and L is the cable length in metres.
            </p>
            <p>
              <strong>Balanced three-phase:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use 3-core or 4-core cable values</li>
              <li>No neutral current in balanced loads</li>
              <li>Compare drop against 400V line voltage</li>
              <li>5% limit = 20V at 400V</li>
            </ul>
            <p>
              <strong>Unbalanced three-phase:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Neutral carries unbalanced current</li>
              <li>Calculate each phase separately</li>
              <li>Worst-case phase determines cable size</li>
              <li>Consider harmonic currents in neutrals</li>
            </ul>
            <p>
              <strong>Reactive loads — power factor correction:</strong> For inductive loads
              (motors), calculate effective mV/A/m using resistance (r) and reactance (x)
              components: mV/A/m = (r × cos φ) + (x × sin φ). Where cos φ is the power factor; for
              pf = 0.85, sin φ = 0.527.
            </p>
            <p>
              <strong>Design note:</strong> Three-phase mV/A/m values are approximately 0.866 (√3/2)
              times single-phase values due to the phase relationship.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Motor Starting and Long Cable Runs">
            <p>
              Motor starting currents and long cable runs present special challenges for voltage
              drop. These situations often determine the final cable size rather than
              current-carrying capacity.
            </p>
            <p>
              <strong>Motor starting considerations (starting current / voltage drop impact):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct-on-line (DOL):</strong> 6-8 × FLC — highest impact
              </li>
              <li>
                <strong>Star-delta:</strong> 2-3 × FLC — moderate impact
              </li>
              <li>
                <strong>Soft starter:</strong> 2-4 × FLC — controlled
              </li>
              <li>
                <strong>VSD/inverter:</strong> 1-1.5 × FLC — minimal
              </li>
            </ul>
            <p>
              <strong>Long cable run strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Increase cable size:</strong> lower resistance = lower drop (most common
                solution)
              </li>
              <li>
                <strong>Local sub-distribution:</strong> reduce final circuit lengths by adding
                local DBs
              </li>
              <li>
                <strong>Higher voltage distribution:</strong> use 400V 3φ to local transformers
              </li>
              <li>
                <strong>Parallel cables:</strong> two smaller cables share current (complex
                installation)
              </li>
              <li>
                <strong>Copper vs aluminium:</strong> copper has lower resistance per mm²
              </li>
            </ul>
            <p>
              <strong>Motor starting drop example:</strong> 15kW motor, FLC = 26A, 50m cable run,
              10mm² cable (mV/A/m = 3.8).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Running:</strong> Vd = (3.8 × 26 × 50) / 1000 = 4.9V (1.2%)
              </li>
              <li>
                <strong>DOL start (7× FLC):</strong> Vd = (3.8 × 182 × 50) / 1000 = 34.6V (8.7%)
              </li>
              <li>Running voltage drop acceptable; consider soft starter or VSD for starting</li>
            </ul>
            <p>
              <strong>Remember:</strong> Motor starting drops are transient (seconds) and equipment
              may tolerate brief dips. Check manufacturer specifications for minimum starting
              voltage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — single-phase socket circuit:</strong> A 32A radial circuit uses
              4mm² cable for a 35m run. Calculate voltage drop and check compliance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>mV/A/m for 4mm² 2-core = 11</li>
              <li>Vd = (11 × 32 × 35) / 1000</li>
              <li>
                Vd = 12,320 / 1000 = <strong>12.3V</strong>
              </li>
              <li>
                As percentage: (12.3 / 230) × 100 = <strong>5.35%</strong>
              </li>
              <li>Exceeds 5% limit for final circuit</li>
              <li>Solution: upgrade to 6mm² (mV/A/m = 7.3)</li>
              <li>
                Vd = (7.3 × 32 × 35) / 1000 = <strong>8.2V (3.6%)</strong> — within limits
              </li>
            </ul>
            <p>
              <strong>Example 2 — lighting circuit:</strong> A lighting circuit serves luminaires
              45m from the DB. Maximum current 8A. What cable size?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting limit: 3% of 230V = 6.9V maximum</li>
              <li>Try 1.5mm² (mV/A/m = 29): Vd = (29 × 8 × 45) / 1000 = 10.4V — exceeds 3% limit</li>
              <li>Try 2.5mm² (mV/A/m = 18): Vd = (18 × 8 × 45) / 1000 = 6.5V (2.8%) — within 3% limit</li>
              <li>2.5mm² required despite 1.5mm² having adequate current capacity</li>
            </ul>
            <p>
              <strong>Example 3 — three-phase sub-main:</strong> Size a 3-phase sub-main for 80A
              balanced load, 60m length, allocated 2.5% drop.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Maximum Vd = 2.5% of 400V = <strong>10V</strong>
              </li>
              <li>Required mV/A/m = (Vd × 1000) / (I × L)</li>
              <li>
                Required mV/A/m = (10 × 1000) / (80 × 60) = <strong>2.08</strong>
              </li>
              <li>From tables (3φ values): 16mm² = 2.4 mV/A/m (too high), 25mm² = 1.5 mV/A/m (adequate)</li>
              <li>
                Check: Vd = (1.5 × 80 × 60) / 1000 = <strong>7.2V (1.8%)</strong>
              </li>
              <li>Select 25mm² 4-core XLPE/SWA</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Vd = (mV/A/m × I × L) / 1000</strong> — basic voltage drop
              </li>
              <li>
                <strong>Vd% = (Vd / Uo) × 100</strong> — percentage drop
              </li>
              <li>
                <strong>Max mV/A/m = (Vd max × 1000) / (I × L)</strong> — for cable selection
              </li>
              <li>
                <strong>mV/A/m = (r × cos φ) + (x × sin φ)</strong> — power factor adjusted
              </li>
            </ul>
            <p>
              <strong>Building services best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate voltage drop early in design — it often determines cable size</li>
              <li>Consider future load growth when allocating voltage drop budgets</li>
              <li>Use XLPE cables for long runs — slightly better mV/A/m values</li>
              <li>Position distribution boards to minimise final circuit lengths</li>
              <li>Document voltage drop calculations in design records</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Doubling mV/A/m</strong> — values already include both conductors
                </li>
                <li>
                  <strong>Wrong column</strong> — use 1φ values for single-phase, 3φ for three-phase
                </li>
                <li>
                  <strong>Forgetting to convert</strong> — divide by 1000 to get volts
                </li>
                <li>
                  <strong>Ignoring sub-main drop</strong> — total must include all sections
                </li>
              </ul>
            }
            doInstead="Trust the BS 7671 column for the system you have, divide by 1000 once, and always sum the sub-main drop together with the final circuit drop against the 3% / 5% limit."
          />

          <SectionRule />

          <Scenario
            title="Long sub-main to a remote workshop — sizing for a 5% budget"
            situation={
              <>
                A new workshop is being added to an existing site. The 100&nbsp;A 400&nbsp;V
                three-phase sub-main runs 75&nbsp;m from the main switchroom to the workshop DB.
                Connected design current I_b = 80&nbsp;A. The site target is 1.5% V_d on the
                sub-main, leaving 3.5% headroom for the workshop final circuits (a CNC machine
                with a high-inertia motor among them).
              </>
            }
            whatToDo={
              <>
                V_d_max = 1.5% × 400 = 6&nbsp;V. Required mV/A/m = (V_d × 1000) / (I_b × L) =
                (6 × 1000) / (80 × 75) = 1.0&nbsp;mV/A/m. From Appendix 4 Table 4D1B reference
                method E, three-phase XLPE: 25&nbsp;mm² gives ≈ 1.5&nbsp;mV/A/m, 35&nbsp;mm²
                gives ≈ 1.1&nbsp;mV/A/m, 50&nbsp;mm² gives ≈ 0.81&nbsp;mV/A/m. Pick
                50&nbsp;mm². Verify the impedance value (z) — the CNC has a low-pf inrush so
                use the mV/A/m_z column, not just the resistive r column. Document on the cable
                schedule against Reg 525.202.
              </>
            }
            whyItMatters={
              <>
                Reg 525.202 makes the V_d limit a deemed-to-satisfy compliance test. Skimp on
                the sub-main and every final circuit downstream starts with less budget — the
                CNC then sees voltage dips on motor inrush, trips on under-voltage relays, and
                the workshop loses production hours. Larger cable upfront is cheaper than a
                rip-and-replace later.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Appendix 4, Section 6.4 limits: 3% lighting, 5% other for installations supplied from the public LV distribution network.',
              'Reg 525.202 makes V_d compliance a deemed-to-satisfy measured outcome — the limit is cumulative from origin to outlet.',
              'V_d = (mV/A/m × I_b × L) / 1000. mV/A/m comes from Appendix 4 cable tables — pick r (resistance) for unity pf or z (impedance) for reactive loads.',
              'Allocate the budget across the design: typically 1–2% sub-main, leaving ≈ 3% for final circuits.',
              'For motor circuits: include the inrush in the V_d check — voltage dip on starting can drop sensitive equipment off-line elsewhere on the board.',
              'Long runs go thicker than current alone needs — V_d, not thermal capacity, is usually the binding constraint.',
              'Three-phase: V_d uses √3 in the denominator and is per-phase; balance loads to minimise neutral current and per-phase drop.',
              'Always document the V_d figure on the cable schedule alongside I_b, I_n, I_z — it is what verification under Part 6 checks.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Current-carrying capacity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Thermal constraints
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_2;
