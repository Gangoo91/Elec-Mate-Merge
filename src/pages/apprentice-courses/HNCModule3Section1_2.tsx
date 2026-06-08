/**
 * Module 3 · Section 1 · Subsection 2 — Ohm's Law
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The single most-used relationship in building services electrical design — V = IR
 *   sits behind every cable size, every voltage drop check and every Zs verification.
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

const TITLE = "Ohm's Law - HNC Module 3 Section 1.2";
const DESCRIPTION =
  "Master Ohm's Law (V=IR) and its applications in building services: cable sizing, voltage drop calculations, and load analysis for electrical installations.";

const quickCheckQuestions = [
  {
    id: 'ohm-relationship',
    question:
      "According to Ohm's Law, if voltage remains constant and resistance doubles, what happens to current?",
    options: [
      'Current quadruples',
      'Current doubles',
      'Current halves',
      'Current stays the same',
    ],
    correctIndex: 2,
    explanation:
      'From I = V/R, if R doubles while V stays constant, current is halved. This is an inverse relationship between current and resistance.',
  },
  {
    id: 'basic-calculation',
    question: 'A 230V circuit has a load resistance of 23Ω. What current flows?',
    options: [
      '5A',
      '10A',
      '230A',
      '23A',
    ],
    correctIndex: 1,
    explanation:
      "Using I = V/R: I = 230V ÷ 23Ω = 10A. This is a straightforward application of Ohm's Law.",
  },
  {
    id: 'non-ohmic',
    question: "What type of component does NOT follow Ohm's Law?",
    options: [
      'Copper wire',
      'Heating element',
      'Fixed resistor',
      'LED',
    ],
    correctIndex: 3,
    explanation:
      'LEDs are non-linear (non-ohmic) devices - their resistance changes with current. Fixed resistors, copper wire and heating elements are approximately linear (ohmic) devices.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Ohm's Law state?",
    options: [
      'Voltage equals current divided by resistance',
      'Voltage equals current multiplied by resistance',
      'Resistance equals voltage multiplied by current',
      'Current equals voltage multiplied by resistance',
    ],
    correctAnswer: 1,
    explanation:
      "Ohm's Law states V = I × R (Voltage equals Current times Resistance). This fundamental relationship governs all resistive circuits.",
  },
  {
    id: 2,
    question: 'A 2kW heater operates at 230V. What is its operating resistance?',
    options: [
      '115Ω',
      '8.7Ω',
      '26.5Ω',
      '460Ω',
    ],
    correctAnswer: 2,
    explanation:
      'First find current: I = P/V = 2000/230 = 8.7A. Then R = V/I = 230/8.7 = 26.5Ω. Alternatively, R = V²/P = 230²/2000 = 26.45Ω',
  },
  {
    id: 3,
    question:
      'If the voltage across a fixed resistor increases by 50%, what happens to the current?',
    options: [
      'Doubles',
      'Decreases by 50%',
      'Stays the same',
      'Increases by 50%',
    ],
    correctAnswer: 3,
    explanation:
      'For a fixed (ohmic) resistor, current is directly proportional to voltage (I = V/R). If V increases by 50%, current also increases by 50%.',
  },
  {
    id: 4,
    question: "Why do NTC thermistors not follow Ohm's Law exactly?",
    options: [
      'Their resistance changes with temperature',
      '2-3 metres for optimal coverage',
      '"EICR_2024_Thompson_42-High-Street.pdf"',
      'In appropriate conditions to prevent damage',
    ],
    correctAnswer: 0,
    explanation:
      "NTC (Negative Temperature Coefficient) thermistors have resistance that decreases as temperature increases. This non-linear behaviour means they don't follow Ohm's Law strictly.",
  },
  {
    id: 5,
    question: 'A cable with 0.5Ω resistance carries 20A. What is the voltage drop?',
    options: [
      '2.5V',
      '10V',
      '40V',
      '0.025V',
    ],
    correctAnswer: 1,
    explanation:
      "Using V = I × R: V = 20A × 0.5Ω = 10V. This voltage is 'dropped' across the cable resistance.",
  },
  {
    id: 6,
    question: 'What is the maximum voltage drop allowed for power circuits in BS 7671?',
    options: [
      '3%',
      '4%',
      '5%',
      '10%',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 allows a maximum 5% voltage drop for power circuits (11.5V at 230V). Lighting circuits are limited to 3%.',
  },
  {
    id: 7,
    question:
      'A 40m cable run supplies a 13A load. Using 2.5mm² cable (7.41mΩ/m), what is the voltage drop?',
    options: [
      '3.85V',
      '30.8V',
      '15.4V',
      '7.7V',
    ],
    correctAnswer: 3,
    explanation:
      'Total cable length = 40m × 2 = 80m (go and return). R = 80 × 0.00741 = 0.593Ω. Vd = 13 × 0.593 = 7.7V',
  },
  {
    id: 8,
    question: "Which rearrangement of Ohm's Law calculates current?",
    options: [
      'I = V/R',
      'I = R/V',
      'I = VR',
      'I = V + R',
    ],
    correctAnswer: 0,
    explanation: 'Rearranging V = IR gives I = V/R. Current equals voltage divided by resistance.',
  },
  {
    id: 9,
    question:
      'A LED has a forward voltage of 3V and requires 20mA. What series resistor is needed from a 24V DC supply?',
    options: [
      '105Ω',
      '1050Ω',
      '150Ω',
      '1200Ω',
    ],
    correctAnswer: 1,
    explanation: 'Voltage across resistor = 24V - 3V = 21V. R = V/I = 21V / 0.02A = 1050Ω',
  },
  {
    id: 10,
    question: "Why is Ohm's Law important for earth fault loop impedance (Zs) calculations?",
    options: [
      'It determines cable colour',
      'It defines cable sizes',
      'It calculates fault current: If = U₀/Zs',
      'It sets the supply voltage',
    ],
    correctAnswer: 2,
    explanation:
      "Fault current If = U₀/Zs uses Ohm's Law where U₀ is nominal voltage and Zs is earth fault loop impedance. This determines if protective devices will operate fast enough.",
  },
];

const faqs = [
  {
    question: "Why is Ohm's Law so important in electrical engineering?",
    answer:
      "Ohm's Law is the foundation of circuit analysis. Every calculation involving voltage, current and resistance uses this relationship - from sizing cables to determining protective device operation. Understanding V = IR is essential for all electrical work.",
  },
  {
    question: "What is an 'ohmic' versus 'non-ohmic' device?",
    answer:
      "Ohmic devices (like fixed resistors and copper conductors) have constant resistance regardless of voltage or current - they follow Ohm's Law linearly. Non-ohmic devices (LEDs, thermistors, diodes) have resistance that varies with conditions, so their V-I relationship is non-linear.",
  },
  {
    question: "How do I remember the three forms of Ohm's Law?",
    answer:
      "Use the VIR triangle: V at top, I and R at bottom. Cover what you want to find: V = I×R, I = V÷R, R = V÷I. Or remember 'Vodka Is Refreshing' for V = I × R.",
  },
  {
    question: "Does cable temperature affect Ohm's Law calculations?",
    answer:
      'Yes - copper resistance increases with temperature. At 70°C (typical operating temperature), resistance is about 20% higher than at 20°C. BS 7671 tables account for this, but for precise calculations use the 1.2 correction factor.',
  },
  {
    question: 'Why do we multiply cable length by 2 for voltage drop?',
    answer:
      'Current flows out through the line conductor and returns through the neutral (or earth for fault current). Both conductors have resistance, so total cable resistance = resistance per metre × length × 2.',
  },
];

const HNCModule3Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 2"
            title="Ohm's Law"
            description="The fundamental relationship between voltage, current and resistance that governs all electrical circuits"
            tone="purple"
          />

          <TLDR
            points={[
              'You can rearrange V = IR three ways and use it to size a cable, calculate a fault current or pick a current-limiting resistor for an indicator LED.',
              'You can tell ohmic from non-ohmic devices and recognise that LEDs, NTC thermistors and lamp filaments need different treatment.',
              'You can run a voltage-drop check using cable mO/m values, the go-and-return rule and the BS 7671 limits (3 % lighting, 5 % power).',
              'You can compute prospective fault current at a point from I_f = U₀ / Z_s and judge whether the upstream device disconnects in time.',
              'You can apply the temperature correction (≈0.4 % per °C, factor ≈1.2 at 70 °C) when working from a measured 20 °C resistance.',
            ]}
          />

          <RegsCallout
            source="BS 7671 — Appendix 4, Section 6.4 (Voltage drop)"
            clause="The voltage at the terminals of any current-using equipment shall be greater than the lower limit corresponding to the relevant standard. Where the public supply is used, voltage drop within the consumer's installation should not exceed 3 % for lighting and 5 % for other uses of the nominal voltage."
            meaning={
              <>
                Voltage drop is the headline application of Ohm’s law in BS 7671. Use cable
                mV/A/m tables (or the underlying mO/m × length × 2 calculation) and
                check against 6.9 V (lighting) or 11.5 V (power) at 230 V nominal.
              </>
            }
            cite="Source: BS 7671 (latest edition incl. A4:2026) Appendix 4, Section 6.4."
          />

          <LearningOutcomes
            outcomes={[
              "State and apply Ohm's Law in all three forms (V=IR, I=V/R, R=V/I)",
              'Distinguish between ohmic and non-ohmic devices',
              "Calculate voltage drop in cables using Ohm's Law",
              "Apply Ohm's Law to fault current calculations",
              'Design current-limiting circuits for LEDs and sensors',
              'Understand the temperature dependence of resistance',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="V=IR is the master equation. Rearrange it to find current or resistance, and use it for cable sizing, fault current and load analysis."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = I × R</strong> - The fundamental equation
              </li>
              <li>
                Rearranged: <strong>I = V/R</strong> and <strong>R = V/I</strong>
              </li>
              <li>Applies to linear (ohmic) resistive elements</li>
              <li>Foundation for all circuit calculations</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable sizing:</strong> Voltage drop calculations
              </li>
              <li>
                <strong>Load current:</strong> Protection device selection
              </li>
              <li>
                <strong>Fault current:</strong> Earth loop impedance
              </li>
              <li>
                <strong>Controls:</strong> Sensor circuit design
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Ohm's Law Fundamentals">
            <p>
              Georg Ohm discovered in 1827 that current through a conductor is directly proportional
              to the voltage across it, with resistance as the constant of proportionality.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Three Forms of Ohm's Law</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = I × R</strong> — Find voltage
              </li>
              <li>
                <strong>I = V / R</strong> — Find current
              </li>
              <li>
                <strong>R = V / I</strong> — Find resistance
              </li>
            </ul>
            <p className="text-sm font-medium text-white">The VIR Triangle:</p>
            <p>Cover what you want to find — the remaining show the formula. V at the top, I and R at the bottom: V over (I × R).</p>
            <p className="text-sm font-medium text-white">Key Relationships:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Current is <strong>directly proportional</strong> to voltage (double V, double I)
              </li>
              <li>
                Current is <strong>inversely proportional</strong> to resistance (double R, halve I)
              </li>
              <li>
                These relationships only hold for <strong>ohmic (linear)</strong> components
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Ohmic vs Non-Ohmic Devices">
            <p>
              Not all components follow Ohm's Law. Understanding which devices are linear helps you
              know when to apply simple calculations versus when more complex analysis is needed.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Ohmic (Linear) Devices — Resistance remains constant:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fixed resistors</strong> - Carbon, metal film
              </li>
              <li>
                <strong>Copper conductors</strong> - At constant temp
              </li>
              <li>
                <strong>Heating elements</strong> - Approximately
              </li>
              <li>
                <strong>Potentiometers</strong> - At fixed setting
              </li>
            </ul>
            <p>V-I Graph: Straight line through origin</p>
            <p className="text-sm font-medium text-elec-yellow/80">Non-Ohmic (Non-Linear) Devices — Resistance varies with conditions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LEDs</strong> - R drops when forward biased
              </li>
              <li>
                <strong>Thermistors</strong> - NTC: R decreases with temp
              </li>
              <li>
                <strong>Diodes</strong> - High R reverse, low R forward
              </li>
              <li>
                <strong>Lamps</strong> - R increases when hot
              </li>
            </ul>
            <p>V-I Graph: Curved line, slope varies</p>
            <p className="text-sm text-elec-yellow/70">
              <strong>BMS Note:</strong> Temperature sensors often use NTC thermistors (10kΩ at 25°C
              is common). Their non-linear response requires lookup tables or linearisation for
              accurate measurement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Application 1: Cable Voltage Drop">
            <p>
              Every cable has resistance. When current flows, Ohm's Law dictates that voltage is
              dropped across this resistance.
            </p>
            <p>
              <strong>Voltage Drop = I × R<sub>cable</sub> × 2</strong> (×2 accounts for line and
              neutral conductors)
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 20A load, 30m cable run, 2.5mm² copper
              </li>
              <li>Cable resistance: 7.41 mΩ/m</li>
              <li>R<sub>total</sub> = 30m × 2 × 7.41mΩ/m = 0.445Ω</li>
              <li>V<sub>drop</sub> = 20A × 0.445Ω = <strong>8.9V</strong></li>
              <li>As percentage of 230V: (8.9/230) × 100 = <strong>3.9%</strong> ✓ Within 5% limit for power circuits</li>
            </ul>
            <p>
              <strong>BS 7671 Limits:</strong> Lighting circuits: 3% (6.9V) | Other circuits: 5%
              (11.5V)
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application 2: Earth Fault Loop Impedance">
            <p>
              Ohm's Law calculates fault current, which determines if protective devices operate
              fast enough.
            </p>
            <p>
              <strong>I<sub>f</sub> = U₀ / Z<sub>s</sub></strong> — Fault current = Nominal voltage
              ÷ Earth fault loop impedance
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> Z<sub>s</sub> measured = 1.2Ω, U₀ = 230V
              </li>
              <li>Fault current I<sub>f</sub> = 230V / 1.2Ω = <strong>192A</strong></li>
              <li>For a 32A Type B MCB, requires 160A (5× In)</li>
              <li>✓ 192A &gt; 160A, MCB will trip within 0.4s</li>
            </ul>
            <p className="text-sm text-orange-300">
              <strong>Critical:</strong> If Zs is too high, fault current is too low, and the
              protective device may not operate in time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application 3: LED Current Limiting">
            <p>
              LEDs require current-limiting resistors because they are non-ohmic - without
              limiting, current would destroy them.
            </p>
            <p>
              <strong>R = (V<sub>supply</sub> - V<sub>LED</sub>) / I<sub>LED</sub></strong>
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 24V DC supply, green LED (V<sub>f</sub>=2.2V, I=20mA)
              </li>
              <li>Voltage across resistor = 24V - 2.2V = 21.8V</li>
              <li>R = 21.8V / 0.02A = <strong>1090Ω</strong></li>
              <li>Use nearest standard value: <strong>1.1kΩ</strong></li>
              <li>Power dissipation: P = I²R = 0.02² × 1100 = 0.44W</li>
              <li>Use 0.5W or 1W rated resistor</li>
            </ul>
            <p>
              <strong>BMS Application:</strong> Status indicator LEDs on control panels commonly
              use this calculation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Temperature Effects on Resistance">
            <p>
              Conductor resistance increases with temperature. This is important for cable sizing
              and testing.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Temperature Coefficient of Copper</p>
            <p>
              R<sub>t</sub> = R<sub>20</sub> × [1 + α(t - 20)] — Where α = 0.00393/°C for copper
            </p>
            <p className="text-sm font-medium text-white">Practical Implications:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cables at 70°C have ~20% higher resistance than at 20°C</li>
              <li>Use factor of 1.2 to convert measured R to operating R</li>
              <li>BS 7671 tables already account for this in current ratings</li>
              <li>Cold cables have lower resistance - relevant for motor starting</li>
            </ul>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable measured at 20°C: R = 0.5Ω</li>
              <li>Operating at 70°C: R = 0.5 × [1 + 0.00393 × 50]</li>
              <li>R = 0.5 × 1.197 = <strong>0.6Ω</strong></li>
              <li>(Or use quick factor: 0.5 × 1.2 = 0.6Ω)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Ohm's Law Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = IR</strong> — Calculate voltage drop in cables
              </li>
              <li>
                <strong>I = V/R</strong> — Calculate load current or fault current
              </li>
              <li>
                <strong>R = V/I</strong> — Determine load resistance from measurements
              </li>
              <li>Always multiply cable length by 2 for single-phase circuits</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Quick Reference</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power circuits: 5% (11.5V)</li>
              <li>Lighting circuits: 3% (6.9V)</li>
              <li>Formula: Vd = I × R × 2</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common Ohm's Law mistakes"
            whatHappens={
              <>
                Forgetting to double cable length (both conductors carry current). Assuming LEDs are
                ohmic — they need a current-limiting resistor. Not accounting for hot-cable
                resistance. Confusing mΩ with Ω: 7.41mΩ = 0.00741Ω.
              </>
            }
            doInstead={
              <>
                Always ×2 the cable run for Vd. Use the LED current-limiting formula. Apply the 1.2
                factor for 70°C cables. Convert all resistances to Ω before substituting.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Verifying Zs at the furthest socket on a basement plant-room final circuit"
            situation={
              <>
                You have just installed a new 32 A radial circuit in a basement plant room
                feeding a control-panel power supply 28 m from the distribution board on
                4 mm² thermoplastic. The Zs measured at the furthest socket reads 1.10 Ω.
                The protective device is a 32 A Type B MCB.
              </>
            }
            whatToDo={
              <>
                Apply Ohm’s law to the loop: I_f = U₀ / Z_s = 230 / 1.10 ≈ 209 A.
                A Type B MCB needs 5 × I_n = 160 A to disconnect within 0.1 s, so 209 A
                clears the requirement comfortably. Cross-check Z_s against BS 7671 Table 41.3
                (or the 80 % rule of thumb on the manufacturer’s figure) before signing the
                certificate. Record the measured value, the calculated I_f and the disconnection
                time on the schedule of test results.
              </>
            }
            whyItMatters={
              <>
                Ohm’s law is the single calculation that decides whether a fault is cleared
                fast enough to be safe. A circuit that meets voltage drop but fails on Z_s is
                non-compliant and unsafe to energise. As the engineer of record, your name is
                on the certificate — the math has to be defendable.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'V = IR — the master equation. Three rearrangements (V = IR, I = V/R, R = V/I) cover most building services calculations.',
              'Ohmic devices (fixed resistors, copper conductors at constant temperature, heating elements) plot a straight line on V vs I.',
              'Non-ohmic devices (LEDs, NTC thermistors, diodes, lamp filaments) need a current-limiting resistor or a lookup table — not a single R value.',
              'Voltage drop V_d = I × R × 2 for single-phase — the ×2 is the go-and-return path.',
              'BS 7671 Appendix 4 (Section 6.4) limits: 3 % for lighting (6.9 V at 230 V), 5 % for power (11.5 V at 230 V).',
              'Fault current I_f = U₀ / Z_s — the basis for confirming protective device disconnection times to BS 7671 Table 41.3.',
              'Copper resistance rises ≈0.4 % per °C — cable at 70 °C is ≈20 % more resistive than at 20 °C. Apply the 1.2 factor when starting from a 20 °C R₁ measurement.',
              'Convert units before substituting: 7.41 mΩ/m = 0.00741 Ω/m. Mixing mΩ and Ω is the most common source of order-of-magnitude errors.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Voltage, Current, Resistance and Power
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Series Circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_2;
