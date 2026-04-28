/**
 * Module 3 · Section 3 · Subsection 2 — Star and delta calculations (AC 2.8)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.8
 *   AC 2.8 — "calculate values of voltage and current in star and delta connected systems"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 7.8
 *   AC 7.8 — "calculate values of voltage and current in star and delta connected systems"
 *
 * The √3 maths in detail. Worked examples for sizing 3-phase loads, choosing supplies and
 * checking volt drop across a 3-phase distribution.
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
  'Star and delta calculations | Level 3 Module 3.3.2 (AC 2.8) | Elec-Mate';
const DESCRIPTION =
  'V_line = √3 × V_phase (star). I_line = √3 × I_phase (delta). 3-phase power = √3 × V_L × I_L × cos φ. Worked examples for real loads.';

const checks = [
  {
    id: 'l3-m3-3-2-power',
    question:
      'A 3-phase load draws 22 A line current at 400 V line, pf = 0.85. Real power consumed:',
    options: ['8.8 kW', '12.96 kW', '15.25 kW', '17.6 kW'],
    correctIndex: 1,
    explanation:
      'P = √3 × V_L × I_L × cos φ = 1.732 × 400 × 22 × 0.85 = 12 957 W ≈ 12.96 kW.',
  },
  {
    id: 'l3-m3-3-2-current',
    question:
      "A 7.5 kW (output) motor at 400 V 3-phase, η = 90 %, pf = 0.86. Line current is approximately:",
    options: ['7.5 A', '12.5 A', '14.0 A', '21.7 A'],
    correctIndex: 2,
    explanation:
      'P_input = 7500 / 0.9 = 8333 W. I_L = P / (√3 × V_L × cos φ) = 8333 / (1.732 × 400 × 0.86) = 8333 / 595.6 = 14.0 A.',
  },
  {
    id: 'l3-m3-3-2-delta',
    question:
      'A delta-connected load with phase current 10 A. Line current is:',
    options: ['5.77 A', '10 A', '17.32 A', '30 A'],
    correctIndex: 2,
    explanation: 'I_line = √3 × I_phase = 1.732 × 10 = 17.32 A in delta.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a balanced star system, line voltage equals:',
    options: ['Phase voltage', '√3 × phase voltage', '2 × phase voltage', 'Phase voltage / √3'],
    correctAnswer: 1,
    explanation: 'V_line = √3 × V_phase. Vector sum of two phase voltages 120° apart.',
  },
  {
    id: 2,
    question: 'In a balanced delta system, line current equals:',
    options: ['Phase current', '√3 × phase current', '2 × phase current', 'Phase current / √3'],
    correctAnswer: 1,
    explanation: 'I_line = √3 × I_phase. Vector sum of two winding currents at the line node.',
  },
  {
    id: 3,
    question: '3-phase real power formula:',
    options: ['V × I', 'V × I × cos φ', '√3 × V_L × I_L × cos φ', '√3 × V_phase × I_phase'],
    correctAnswer: 2,
    explanation:
      'P = √3 × V_line × I_line × cos φ — for any balanced 3-phase load, regardless of star or delta connection.',
  },
  {
    id: 4,
    question:
      'A balanced 3-phase load: line voltage 400 V, line current 30 A, pf 1.0. Apparent power:',
    options: ['12 kVA', '20.8 kVA', '36 kVA', '40 kVA'],
    correctAnswer: 1,
    explanation: 'S = √3 × V_L × I_L = 1.732 × 400 × 30 = 20 784 VA ≈ 20.8 kVA.',
  },
  {
    id: 5,
    question: 'Same load as Q4 with pf 0.7. Real power:',
    options: ['12 kW', '14.5 kW', '20.8 kW', '8 kW'],
    correctAnswer: 1,
    explanation: 'P = S × pf = 20.8 × 0.7 = 14.56 kW.',
  },
  {
    id: 6,
    question:
      'A 3-phase motor draws 25 A line on 400 V, pf 0.8, η 85 %. Mechanical output power:',
    options: ['11.8 kW', '13.86 kW', '14.7 kW', '17.32 kW'],
    correctAnswer: 0,
    explanation:
      'Input = √3 × 400 × 25 × 0.8 = 13 856 W. Output = 13 856 × 0.85 = 11 778 W ≈ 11.8 kW.',
  },
  {
    id: 7,
    question:
      "A 3-phase delta load with line voltage 400 V and phase impedance 30 Ω. Line current is:",
    options: ['7.7 A', '13.3 A', '23.1 A', '40 A'],
    correctAnswer: 2,
    explanation:
      'I_phase = V_phase / Z = 400 / 30 = 13.33 A. I_line = √3 × I_phase = 1.732 × 13.33 = 23.09 A.',
  },
  {
    id: 8,
    question:
      "A 3-phase star load: line voltage 400 V, phase impedance 25 Ω. Line current is:",
    options: ['9.24 A', '16 A', '24 A', '32 A'],
    correctAnswer: 0,
    explanation:
      'V_phase = 400 / √3 = 230.9 V. I_phase = I_line = V_phase / Z = 230.9 / 25 = 9.24 A.',
  },
];

const faqs = [
  {
    question: 'Why is the formula different for star and delta in some places but the same for power?',
    answer:
      "Voltage and current relationships ARE different (line vs phase). But power is in watts no matter how you connect — the same actual energy flows. P = √3 × V_L × I_L × cos φ works for both because √3 × V_L × I_L = 3 × V_phase × I_phase (same total) in both cases.",
  },
  {
    question: 'What does "line" actually mean — between which conductors?',
    answer:
      "Line voltage = between any two of the three line conductors (L1-L2, L2-L3, L1-L3 — all 400 V in UK). Line current = current in any one of the three line conductors (the one a clamp meter would read). Phase quantities are inside the load (star: line-to-neutral; delta: between two lines as seen by the winding).",
  },
  {
    question: 'How do I check power factor on a 3-phase load with a clamp?',
    answer:
      "A basic clamp meter measures current only. To get pf you need a clamp meter with a voltage input and pf calculation, or a power-quality analyser. Single line measurement isn't enough on a 3-phase load — pf can vary across phases on an unbalanced load.",
  },
  {
    question: "Can I run a 3-phase motor on single-phase if I add a phase converter?",
    answer:
      "Yes, with an inverter/VFD. The drive rectifies single-phase to DC, then synthesises three-phase output. Practical up to about 4 kW on a typical 32 A single-phase supply (because the input current is roughly 6× the output 3-phase line current). Beyond that you really need 3-phase supply.",
  },
  {
    question: 'Why does my 3-phase install show different currents on each phase?',
    answer:
      "Because the loads aren't perfectly balanced. Each line carries only the loads connected to it. Sub 3.6 covers neutral current and load balancing. As a rule of thumb: keep each line within 10 % of the average for the install.",
  },
  {
    question: 'Where does the √3 actually come from in the maths?',
    answer:
      "From the phasor diagram. Two phase voltages 120° apart vector-sum to a magnitude √3 times the phase. The cos(30°) = √3/2 in the projection comes out exactly. It's not a fudge factor — it's geometry.",
  },
];

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 2"
            title="Star and delta calculations"
            description="The √3 maths in full. Sizing 3-phase loads, calculating line currents, checking power, and reading transformer plates fluently."
            tone="yellow"
          />

          <TLDR
            points={[
              'Star: V_line = √3 × V_phase; I_line = I_phase.',
              'Delta: V_line = V_phase; I_line = √3 × I_phase.',
              '3-phase real power: P = √3 × V_L × I_L × cos φ.',
              '3-phase apparent power: S = √3 × V_L × I_L. Reactive: Q = √3 × V_L × I_L × sin φ.',
              "Line current from motor plate: I_L = P_input / (√3 × V_L × cos φ); P_input = P_output / η.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply V_line = √3 × V_phase to any star-connected system.',
              'Apply I_line = √3 × I_phase to any delta-connected system.',
              'Calculate 3-phase real, reactive and apparent power.',
              'Determine line current from motor plate kW, efficiency and power factor.',
              'Calculate phase impedance from line voltage and line current for star or delta loads.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Star — voltage transforms, current does not</ContentEyebrow>

          <ConceptBlock
            title="V_line = √3 × V_phase; I_line = I_phase"
            plainEnglish="In star, the same current flowing in a winding flows out through the line conductor. But the line-to-line voltage is the vector sum of two phase voltages 120° apart, so it is √3 times bigger than each phase voltage."
            onSite="UK 3-phase: 400 V line / 230 V phase. Plug a single-phase appliance between L1 and N: 230 V. Connect a 3-phase load between L1, L2, L3: each winding sees 400 V if delta, 230 V if star."
          >
            <p>Worked example — star-connected heater bank:</p>
            <p>
              A 3-phase 400 V star load with each phase impedance 50 Ω.
              <br />
              V_phase = 400 / √3 = 230.9 V.
              <br />
              I_phase = V_phase / Z = 230.9 / 50 = 4.62 A.
              <br />
              I_line = I_phase = 4.62 A.
              <br />
              Total power (resistive): P = 3 × V_phase × I_phase = 3 × 230.9 × 4.62 = 3201 W ≈
              3.2 kW.
              <br />
              Same answer using the line formula: P = √3 × V_L × I_L = 1.732 × 400 × 4.62 = 3199
              W ≈ 3.2 kW.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Delta — current transforms, voltage does not</ContentEyebrow>

          <ConceptBlock
            title="V_line = V_phase; I_line = √3 × I_phase"
            plainEnglish="In delta, each winding sees the full line-to-line voltage. But each line conductor carries the vector sum of two winding currents 120° apart — √3 times each winding current."
          >
            <p>Worked example — delta-connected motor (steady-state):</p>
            <p>
              A 3-phase 400 V delta motor with each winding impedance 30 Ω at running speed.
              <br />
              V_phase = V_line = 400 V.
              <br />
              I_phase = V_phase / Z = 400 / 30 = 13.33 A.
              <br />
              I_line = √3 × I_phase = 1.732 × 13.33 = 23.09 A.
            </p>
            <p>
              The clamp meter reads 23 A on each line conductor; each winding actually only
              carries 13.3 A. Both numbers are correct — they are measured in different places.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>3-phase power formulas</ContentEyebrow>

          <ConceptBlock
            title="The same three formulas for any balanced 3-phase load"
            plainEnglish="Real, reactive and apparent power all use line voltage and line current — multiplied by √3 because three lines carry the load. Power factor cos φ then converts apparent to real."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P (W) = √3 × V_L × I_L × cos φ</strong> — real power, what the meter charges.</li>
              <li><strong>S (VA) = √3 × V_L × I_L</strong> — apparent power, what the cable carries.</li>
              <li><strong>Q (VAr) = √3 × V_L × I_L × sin φ</strong> — reactive power, oscillating in inductance/capacitance.</li>
            </ul>
            <p>
              Triangle relationship (next Sub): S² = P² + Q². pf = P / S = cos φ.
            </p>
            <p>Worked example — sizing supply for a 3-phase 22 kW input motor at pf 0.85:</p>
            <p>
              I_L = P / (√3 × V_L × cos φ) = 22000 / (1.732 × 400 × 0.85) = 22000 / 588.9 = 37.4 A.
              <br />
              Cable: 10 mm² 4-core SWA gives I_z ≈ 60 A clipped. 50 A 3-pole MCB type C.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 433 (Protection against overload current)"
            clause="The rated current or current setting of the protective device shall be greater than or equal to the design current of the circuit, and shall not exceed the lowest of the current-carrying capacities of any of the conductors of the circuit."
            meaning={
              <>
                For a 3-phase motor, the design current I_b is the steady-state line current
                calculated above (37.4 A in our example). The protective device rating must be
                ≥ I_b but ≤ I_z. For motors, also consider starting current (4-7× I_b for DOL) —
                use Type C or D MCBs to ride the inrush.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 433.1.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.1 (Motor circuit current rating)"
            clause="All equipment, including cable, of every circuit carrying the starting, accelerating and load currents of a motor shall be suitable for a current at least equal to the full-load current rating of the motor when rated in accordance with the appropriate British or Harmonized Standard. Where the motor is intended for intermittent duty and frequent stopping and starting, account shall be taken of any cumulative effects of the starting periods upon the temperature rise of the equipment of the circuit."
            meaning={
              <>
                Star/delta and three-phase motor calcs feed straight into Reg 552.1.1: cable, MCB
                and contactor must carry the full-load running current AND survive the starting
                surge. DOL inrush at 4–7× FLC, soft-starter inrush at 2–3× FLC, VFD inrush close
                to FLC. On intermittent-duty plant (compressors, hoists) the cumulative thermal
                effect of frequent restarts can dominate sizing — the cable de-rates as the
                duty-cycle factor reduces.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 552.1.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.2 (Motor overload protection)"
            clause="Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor. This requirement does not apply to a motor incorporated in an item of current-using equipment complying as a whole with an appropriate British or Harmonized Standard."
            meaning={
              <>
                Above 0.37 kW the motor circuit needs dedicated overload protection — a thermal
                overload relay, electronic motor protection, or the integral protection in a VFD
                or soft-starter. The MCB on its own protects the cable, not the motor windings.
                On a stalled rotor a 7.5 kW motor can sit at locked-rotor current (5–7× FLC) for
                tens of seconds without tripping a Type C MCB; the overload relay's I²t curve
                catches it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 552.1.2."
          />

          <SectionRule />

          <CommonMistake
            title="Forgetting the √3 in 3-phase calculations"
            whatHappens={
              <>
                Sum says: 3-phase 400 V load drawing 30 A, pf 1.0. Apprentice writes P = V × I =
                400 × 30 = 12 kW. Real answer = √3 × 400 × 30 = 20.8 kW. Drives the cable size
                wrong.
              </>
            }
            doInstead={
              <>
                Three-phase has THREE lines doing the work, not one. Always multiply by √3
                (≈ 1.732) when going from V_line × I_line to power. Mnemonic: "Three phases need
                root three." Single-phase is the special case where √3 is not there.
              </>
            }
          />

          <Scenario
            title="Sizing a sub-main for a 3-phase distribution board"
            situation={
              <>
                A 3-phase 4-wire sub-DB feeds a workshop with: 3 × 5.5 kW lathes (input ~6.5 kW
                each at pf 0.85), 1 × 11 kW grinder (input ~12 kW at pf 0.82), 18 kW resistive
                heating. Diversity factor 0.7 for the lathes. Calculate I_b for the sub-main and
                pick a cable.
              </>
            }
            whatToDo={
              <>
                Lathe load with diversity: 3 × 6.5 × 0.7 = 13.65 kW at pf 0.85.
                <br />
                Grinder: 12 kW at pf 0.82.
                <br />
                Heater: 18 kW at pf 1.0.
                <br />
                Per-load line current:
                <br />
                — Lathes: I = 13650 / (1.732 × 400 × 0.85) = 23.2 A.
                <br />
                — Grinder: I = 12000 / (1.732 × 400 × 0.82) = 21.1 A.
                <br />
                — Heater: I = 18000 / (1.732 × 400 × 1.0) = 26.0 A.
                <br />
                Total approximated as straight sum (worst-case PF blend): 23.2 + 21.1 + 26.0 ≈ 70 A.
                <br />
                Cable: 25 mm² 4-core SWA (clipped, 90 °C XLPE) gives I_z ≈ 100 A. 80 A 3-pole MCB
                Type C. Volt-drop check separate.
              </>
            }
            whyItMatters={
              <>
                Mixing kW, pf and √3 across multiple loads is the daily 3-phase design routine.
                Per-load line currents, not total kW, drive the cable size — because the cable
                only sees current, not power.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — translating the maths to site work</ContentEyebrow>

          <ConceptBlock
            title="Phase impedance from a clamp meter reading"
            plainEnglish="If you can clamp the line current and you know the supply voltage, you can back-calculate the per-phase impedance — useful for spot-checking what a load really is when there is no plate or the plate is illegible."
            onSite="Common job: customer installs a 3-phase heater bank, no plate, won't tell you the rating. Clamp each line at full load: 18 A. Voltmeter L-L: 400 V. Star or delta? Open the cover and check. If star: V_phase 230 V, Z_phase = 230/18 = 12.8 Ω. If delta: V_phase 400 V, I_phase = 18/√3 = 10.4 A, Z_phase = 400/10.4 = 38.5 Ω."
          >
            <p>The two formulas:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Star:</strong> Z_phase = (V_L / √3) / I_L.</li>
              <li><strong>Delta:</strong> Z_phase = V_L / (I_L / √3) = √3 × V_L / I_L.</li>
            </ul>
            <p>
              For a star-delta swap on the same load, line current changes by a factor of 3
              (delta line current is 3× the star line current at the same line voltage). That is
              why DOL star-delta starting limits inrush to one-third.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading the motor plate — kW is OUTPUT, not input"
            plainEnglish="A 3-phase motor plate gives mechanical output (shaft power) in kW. Electrical input is always more, by 1/η. Ignoring efficiency understates the line current and undersizes the cable and protection."
            onSite="Pull the rating plate of any IEC induction motor: kW (output), V (line), A (line), pf, η, RPM. Always do P_input = P_output / η first, THEN apply I_L = P_input / (√3 × V_L × cos φ). Modern IE3/IE4 motors run at η = 0.9-0.95 — old IE1 motors can be 0.78-0.85."
          >
            <p>
              Worked: 11 kW IE3 motor, 400 V, pf 0.86, η 0.91.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P_input = 11000 / 0.91 = 12 088 W.</li>
              <li>I_L = 12 088 / (1.732 × 400 × 0.86) = 12 088 / 595.6 = 20.3 A.</li>
              <li>Cable: 4 mm² 4-core SWA (clipped, 90 °C XLPE) — I_z ≈ 32 A. 25 A 3P MCB Type C.</li>
              <li>Starting current (DOL): 6× = 122 A for 1-3 s. Type C ride-through OK.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="3-phase volt drop — the per-line vs line-to-line trap"
            plainEnglish="Volt-drop tables (BS 7671 Appendix 4) give mV/A/m. For 3-phase the value listed is line-to-line drop. So you only multiply by I_L and L once — you do NOT also multiply by √3. The √3 is already inside the table value."
            onSite="Triple-counting √3 is one of the most common L3 mistakes. Apprentice does (mV/A/m × I_L × L) × √3 — gets a number 73 % too high, picks an oversize cable. Designer rejects the design. Always read the column header on the volt-drop table to see whether single-phase or 3-phase value is given."
          >
            <p>Worked — 25 mm² 4-core SWA, 80 m run, I_b = 70 A on a 3-phase circuit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From BS 7671 Appx 4: 3-phase mV/A/m at 70 °C ≈ 1.5 (illustrative).</li>
              <li>Volt-drop = 1.5 × 70 × 80 / 1000 = 8.4 V.</li>
              <li>As % of 400 V line-to-line: 8.4 / 400 = 2.1 % &lt; 5 % limit. PASS.</li>
            </ul>
            <p>
              On a 3-phase + N circuit serving single-phase final circuits, you may also need to
              check the L-N drop separately if the loads are unbalanced.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Star-delta starting — why inrush drops to one-third"
            plainEnglish="At start, the motor is wired in star — each winding sees only V_line / √3. Current per winding is one-third of what delta start would draw, so line inrush is also one-third. Once the motor is up to speed, contactor switches it to delta for full torque."
            onSite="Star-delta is found on motors typically 5.5 kW and above where DOL inrush would trip the upstream protection or cause a noticeable voltage dip. Apprentice job is to check the timer setting (typically 3-7 s for the star-to-delta transition) and check the motor really is dual-voltage rated (400 V delta / 690 V star). A 400 V-only motor cannot star-delta start on a UK supply — it will undervolt and overheat."
          >
            <p>
              Why one-third:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In delta, V_phase = 400 V. Locked-rotor I_phase ≈ V/Z_lr.</li>
              <li>In star, V_phase = 400/√3 = 231 V. I_phase = 231/Z_lr — that is 1/√3 of delta phase current.</li>
              <li>I_line in star = I_phase = (1/√3) × delta I_phase.</li>
              <li>I_line in delta = √3 × delta I_phase.</li>
              <li>Ratio: star I_line / delta I_line = (1/√3) / √3 = 1/3.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Sanity check — three lines should read within 10 % of each other"
            plainEnglish="On a healthy balanced 3-phase load, clamp readings on L1, L2, L3 should agree to within ~10 %. Bigger differences mean either the load is genuinely unbalanced (single-phase loads concentrated on one line) or there is a fault (open winding, broken delta, lost neutral)."
            onSite="The 10 % rule is the fastest first-look diagnostic on a 3-phase install. If L1 is reading 22 A, L2 is 23 A, L3 is 6 A — you are not balanced; you have lost a phase somewhere upstream OR a winding has gone open. Trace from the load back to the supply checking each terminal."
          >
            <p>What different patterns mean:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>All three within 10 %</strong> → balanced, healthy.</li>
              <li><strong>Two equal, one near zero</strong> → lost phase OR open delta winding.</li>
              <li><strong>One high, two low</strong> → unbalanced single-phase loading; rebalance.</li>
              <li><strong>All three reading high steady-state</strong> → overload or undervoltage; check supply.</li>
              <li><strong>Wildly oscillating</strong> → motor stalling, drive instability, harmonic resonance.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Star: V_line = √3 × V_phase; I_line = I_phase.',
              'Delta: V_line = V_phase; I_line = √3 × I_phase.',
              'Real power: P = √3 × V_L × I_L × cos φ. Apparent: S = √3 × V_L × I_L.',
              'Line current from motor plate: I_L = (P_output / η) / (√3 × V_L × cos φ).',
              'Cable sees line current; check Iz ≥ Ib ≥ In (BS 7671 §433).',
              "Diversity factors apply per-load type then sum line currents — don't sum kW first.",
            ]}
          />

          <Quiz title="Star and delta calculations knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Single vs three-phase
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 kW, kVAr, kVA and the power triangle
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
