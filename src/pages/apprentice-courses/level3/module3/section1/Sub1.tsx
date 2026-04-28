/**
 * Module 3 · Section 1 · Subsection 1 — Mathematical principles for electrical work (AC 1.1)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.1
 *   AC 1.1 — "identify and apply mathematical principles used in electrical work tasks"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 1.1 — appropriate mathematical principles
 *
 * The maths habits Level 3 takes for granted: indices, scientific notation, transposition,
 * trigonometry for vectors, percentage and ratio. Without these you can't do power-factor
 * triangles, voltage drop, transformer ratios or motor calculations cleanly.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PowerQuickCalc } from '@/components/apprentice-courses/PowerQuickCalc';
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
  'Mathematical principles for electrical work | Level 3 Module 3.1.1 (AC 1.1) | Elec-Mate';
const DESCRIPTION =
  'Indices, scientific notation, transposition, trigonometry and percentage — the maths habits you need before any L3 power, voltage drop or transformer calculation.';

const checks = [
  {
    id: 'l3-m3-1-1-indices',
    question: 'Convert 4.7 × 10⁻³ A to milliamps.',
    options: ['0.47 mA', '4.7 mA', '47 mA', '470 mA'],
    correctIndex: 1,
    explanation:
      '10⁻³ is the milli prefix, so 4.7 × 10⁻³ A = 4.7 mA directly. The exponent is the prefix — milli means 10⁻³, so the number sits unchanged in the new unit.',
  },
  {
    id: 'l3-m3-1-1-transpose',
    question: 'V = IR. Transpose to make R the subject.',
    options: ['R = V × I', 'R = V − I', 'R = V / I', 'R = I / V'],
    correctIndex: 2,
    explanation:
      'Divide both sides by I: V/I = IR/I = R. So R = V/I. Same operation on both sides — the equals sign stays balanced.',
  },
  {
    id: 'l3-m3-1-1-trig',
    question:
      'A power triangle has true power P = 8 kW and apparent power S = 10 kVA. Power factor cos φ = ?',
    options: ['0.6', '0.8', '1.25', '8'],
    correctIndex: 1,
    explanation:
      'cos φ = adjacent / hypotenuse = P / S = 8 / 10 = 0.8. The triangle is right-angled with P along the base and Q vertical; S is the hypotenuse.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Express 0.000045 in scientific notation.',
    options: ['45 × 10⁻⁶', '4.5 × 10⁻⁵', '4.5 × 10⁻⁴', '0.45 × 10⁻⁴'],
    correctAnswer: 1,
    explanation:
      'Scientific notation uses one non-zero digit before the decimal. 0.000045 = 4.5 × 10⁻⁵. Move the decimal point five places right and the exponent is −5.',
  },
  {
    id: 2,
    question: 'Simplify 10³ × 10⁴.',
    options: ['10⁷', '10¹²', '10⁻¹', '20⁷'],
    correctAnswer: 0,
    explanation:
      'Same base, indices add: 10³ × 10⁴ = 10³⁺⁴ = 10⁷. This is how kilo (10³) × kilo (10³) gives mega (10⁶) — kΩ × kΩ in parallel maths, for example.',
  },
  {
    id: 3,
    question: 'Convert 230 V to mV.',
    options: ['0.23 mV', '23 mV', '23 000 mV', '230 000 mV'],
    correctAnswer: 3,
    explanation:
      'milli is 10⁻³, so 1 V = 1000 mV. 230 V × 1000 = 230 000 mV (or 2.3 × 10⁵ mV).',
  },
  {
    id: 4,
    question: 'In a right-angled triangle with adjacent = 3 and opposite = 4, the hypotenuse is:',
    options: ['1', '5', '7', '12'],
    correctAnswer: 1,
    explanation:
      'Pythagoras: h² = 3² + 4² = 9 + 16 = 25 → h = 5. This is the same maths as combining true power and reactive power into apparent power: S² = P² + Q².',
  },
  {
    id: 5,
    question: 'A circuit current rises from 8 A to 10 A. What is the percentage increase?',
    options: ['2 %', '20 %', '25 %', '80 %'],
    correctAnswer: 2,
    explanation:
      'Increase = (10 − 8) / 8 = 2 / 8 = 0.25 = 25 %. Always divide the change by the original value, not the new one.',
  },
  {
    id: 6,
    question: 'Transpose I = V / R to make V the subject.',
    options: ['V = I − R', 'V = I + R', 'V = I × R', 'V = I / R'],
    correctAnswer: 2,
    explanation: 'Multiply both sides by R: I × R = V. So V = IR.',
  },
  {
    id: 7,
    question: 'Which prefix represents 10⁶?',
    options: ['kilo', 'mega', 'milli', 'micro'],
    correctAnswer: 1,
    explanation:
      'mega = 10⁶ (a million). kilo = 10³, milli = 10⁻³, micro = 10⁻⁶. You will see MΩ on insulation tests and MVA on transformer plates.',
  },
  {
    id: 8,
    question: 'On a calculator, sin 30° equals:',
    options: ['0', '0.5', '0.707', '1'],
    correctAnswer: 1,
    explanation:
      'sin 30° = 0.5 exactly. Make sure the calculator is in DEG mode, not RAD — getting that wrong is the most common L3 calculation error.',
  },
];

const faqs = [
  {
    question: 'Why does L3 maths feel so much harder than L2?',
    answer:
      "Because the formulas multiply. L2 was V = IR, P = VI and a few transpositions. L3 mixes them with trigonometry (power factor), exponentials (RC time constants), square roots (3-phase √3), and ratios (transformer turns). The maths itself is GCSE-level, but you have to apply five techniques in one calculation.",
  },
  {
    question: 'Do I really need a scientific calculator?',
    answer:
      "Yes. A standard four-function calculator can't do sin/cos/tan, x² or 10ⁿ. Cheap Casio fx-85 models cover everything you need at L3 and the AM2. Keep one in your study bag and use the same model in the exam — knowing the keys saves you minutes.",
  },
  {
    question: 'How do I know when to use sin, cos or tan?',
    answer:
      "SOH-CAH-TOA. sin = opposite / hypotenuse, cos = adjacent / hypotenuse, tan = opposite / adjacent. In the power triangle the hypotenuse is S (kVA), the adjacent is P (kW), and the opposite is Q (kVAr). Power factor uses cos because P/S is adjacent/hypotenuse.",
  },
  {
    question: 'Is scientific notation just for show, or is it actually useful?',
    answer:
      "It is actually useful. Resistivity is around 1.7 × 10⁻⁸ Ω·m, and insulation resistance is in the GΩ range (10⁹). Trying to write those out long-hand wastes calculator memory and creates errors. Scientific notation keeps the maths tidy.",
  },
  {
    question: 'My answer is right but in the wrong unit — does that lose marks?',
    answer:
      "Yes, every time. The marker grades the unit. 230 mV is not the same as 230 V, and 10 kW is not the same as 10 W. Always state the unit, and double-check it makes physical sense — 230 mV from a power circuit means you have made a mistake.",
  },
  {
    question: 'What is BIDMAS and why does it matter?',
    answer:
      "Brackets, Indices, Division/Multiplication, Addition/Subtraction. The order in which a calculator evaluates a sum. 2 + 3 × 4 = 14, not 20, because × happens before +. On 3-phase power calculations (P = √3 × V × I × cos φ) the wrong order gives an answer that is wildly wrong.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 3 · Section 1 · Subsection 1"
            title="Mathematical principles for electrical work"
            description="The maths habits L3 takes for granted: indices, scientific notation, transposition, trigonometry and percentages. Get these solid first — every other L3 sum depends on them."
            tone="yellow"
          />

          <TLDR
            points={[
              'Indices add when you multiply same-base powers (10³ × 10⁴ = 10⁷) and subtract when you divide. Negative indices flip the number to the bottom of a fraction.',
              'Scientific notation keeps very small or very large numbers manageable. Resistivity 1.7 × 10⁻⁸ Ω·m. Insulation resistance 200 × 10⁶ Ω = 200 MΩ.',
              'Transposition keeps the equation balanced — whatever you do to one side, do to the other. V = IR transposes to R = V/I or I = V/R.',
              'Trigonometry (sin, cos, tan, Pythagoras) underpins every power triangle, vector and phase-angle calculation at L3.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read and write numbers in scientific (standard) form and convert between SI prefixes (μ, m, k, M).',
              'Apply BIDMAS correctly when entering multi-step calculations on a scientific calculator.',
              'Transpose a formula to make any variable the subject without losing track of signs or units.',
              'Use Pythagoras, sin, cos and tan on a right-angled triangle to find missing sides and angles.',
              'Calculate percentage change, percentage error and ratio for typical electrical work tasks.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Indices and scientific notation</ContentEyebrow>

          <ConceptBlock
            title="Indices — the shortcut for very big and very small numbers"
            plainEnglish="An index (or exponent) is the small raised number that says how many times to multiply a base by itself. 10³ is shorthand for 10 × 10 × 10 = 1000."
            onSite="Insulation resistance test results are in megohms (10⁶) or gigohms (10⁹). Without index notation you'd be writing seven or ten zeros every time you wrote a result down."
          >
            <p>The rules you need:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multiplying same base:</strong> add the indices. 10³ × 10⁴ = 10³⁺⁴ = 10⁷.
              </li>
              <li>
                <strong>Dividing same base:</strong> subtract the indices. 10⁵ ÷ 10² = 10⁵⁻² = 10³.
              </li>
              <li>
                <strong>Power of a power:</strong> multiply the indices. (10²)³ = 10²ˣ³ = 10⁶.
              </li>
              <li>
                <strong>Negative indices:</strong> flip to the denominator. 10⁻³ = 1/10³ = 1/1000 = 0.001.
              </li>
              <li>
                <strong>Anything to the power 0 = 1.</strong> 10⁰ = 1, 7⁰ = 1, X⁰ = 1.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Scientific notation — one non-zero digit, then the exponent"
            plainEnglish="A number written as A × 10ⁿ where A is between 1 and 10 (one digit before the decimal) and n is a whole number."
          >
            <p>Worked examples you'll meet at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper resistivity ρ = 0.0000000172 Ω·m = <strong>1.72 × 10⁻⁸ Ω·m</strong>.</li>
              <li>Insulation resistance 200 000 000 Ω = <strong>2 × 10⁸ Ω</strong> = 200 MΩ.</li>
              <li>RC time constant 0.000 47 s = <strong>4.7 × 10⁻⁴ s</strong> = 0.47 ms.</li>
              <li>3-phase transformer rating 1 600 000 VA = <strong>1.6 × 10⁶ VA</strong> = 1.6 MVA.</li>
            </ul>
            <p>
              On a Casio fx-85 you enter scientific notation with the <code>×10ˣ</code> key.
              Typing 1.72 <code>×10ˣ</code> −8 gives 1.72 × 10⁻⁸. It\'s quicker, and the calculator
              keeps full precision instead of rounding zeros.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Transposition — keeping the equation balanced</ContentEyebrow>

          <ConceptBlock
            title="The equals sign is a balance, not an arrow"
            plainEnglish="Whatever operation you do to the left side, do the identical operation to the right side. The two halves stay equal as long as you treat them the same."
            onSite="Voltage drop. Cable selection. Transformer ratios. Every L3 sum requires you to take a printed formula and rearrange it for the unknown — without losing a sign or a square."
          >
            <p>
              Take V = IR. Three variables — V, I, R. The formula gives V if you know I and R. To
              find I or R you have to rearrange. The rule is brutally simple: do the same thing to
              both sides until the variable you want is alone.
            </p>
            <p>
              <strong>To find R:</strong> divide both sides by I. V/I = IR/I → V/I = R. So R = V/I.
            </p>
            <p>
              <strong>To find I:</strong> divide both sides by R. V/R = IR/R → V/R = I. So I = V/R.
            </p>
            <p>
              For more complex formulas the same rule applies, but the operations stack. For
              power dissipated in a resistor:
            </p>
            <p>
              P = I² R → divide by R → P/R = I² → square-root both sides → I = √(P/R).
            </p>
            <p>
              The trick is to undo the operations in reverse order. If the variable is squared and
              multiplied, you divide first then take the root.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <PowerQuickCalc />
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4 (Current-carrying capacity and voltage drop)"
            clause="Voltage drop is determined from the formula given in section 6.1. The values of mV/A/m given in Tables 4D1 to 4J4 of Appendix 4 represent the voltage drop per ampere per metre length of cable."
            meaning={
              <>
                Appendix 4 gives you a formula in mV/A/m. To get the actual voltage drop in volts
                you transpose: V<sub>drop</sub> = (mV/A/m × I × L) / 1000. Get the transposition
                wrong and you\'ll oversize or undersize a cable, which fails the design at the next
                EICR.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Appendix 4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1"
            clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
            meaning={
              <>
                Reg 132.1 places the design duty on one or more <em>skilled persons</em>. At L3
                you sit on the gradient between competent operative and competent designer; the
                maths in this Sub is the toolkit you bring to that designer judgement —
                load calculations, voltage drop, fault current, power-factor triangles,
                transformer ratios. Without confident transposition and trigonometry the
                designer&apos;s output is guesswork dressed up as numbers.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
            clause="Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of an electrical installation. The installation of electrical equipment shall take account of manufacturers&apos; instructions."
            meaning={
              <>
                Reg 134.1.1 is the workmanship rule — the verification step that follows
                design. The maths principles (indices, scientific notation, transposition,
                trigonometry) carry across into the verification: did the chosen cable&apos;s
                resistance match the design assumption? Did the measured Z<sub>s</sub> tally
                with the calculated value? The numbers on the EIC come from the same maths
                you&apos;re practising here — so the verification only stands up if the
                arithmetic does.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 134.1.1 — good workmanship."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Trigonometry — the maths of right-angled triangles</ContentEyebrow>

          <ConceptBlock
            title="SOH-CAH-TOA, and Pythagoras"
            plainEnglish="In a right-angled triangle, the three sides are labelled by their position relative to the angle you\'re working with: opposite (across from the angle), adjacent (next to the angle, not the hypotenuse), and hypotenuse (the long one opposite the right angle)."
          >
            <p>The three trig ratios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>sin θ = opposite / hypotenuse</strong> (SOH)
              </li>
              <li>
                <strong>cos θ = adjacent / hypotenuse</strong> (CAH)
              </li>
              <li>
                <strong>tan θ = opposite / adjacent</strong> (TOA)
              </li>
            </ul>
            <p>And Pythagoras for the sides:</p>
            <p>
              <strong>(hypotenuse)² = (opposite)² + (adjacent)²</strong>
            </p>
            <p>
              Why this matters for L3: the power triangle. P (true power, kW) is the adjacent.
              Q (reactive power, kVAr) is the opposite. S (apparent power, kVA) is the hypotenuse.
              Power factor is cos φ = P/S. So the same maths you used for a 3-4-5 triangle in GCSE
              comes back as kVA, kW and kVAr in §3.
            </p>
            <p>
              Example: an inductive load draws P = 12 kW and Q = 5 kVAr. Apparent power S =
              √(12² + 5²) = √(144 + 25) = √169 = 13 kVA. Power factor cos φ = 12/13 = 0.923.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Using the calculator — DEG vs RAD"
            plainEnglish="Calculators measure angles in degrees (DEG) or radians (RAD). Electrical L3 always uses degrees. If your sin 30° gives -0.988 instead of 0.5, you\'re in radians."
            onSite="Press MODE on a Casio and select Deg. The display will show a small D in the top corner. Get this wrong on the AM2 and every angle calculation falls apart."
          >
            <p>
              The numbers worth remembering by heart for the AM2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>sin 0° = 0, sin 30° = 0.5, sin 45° = 0.707, sin 60° = 0.866, sin 90° = 1</li>
              <li>cos 0° = 1, cos 30° = 0.866, cos 45° = 0.707, cos 60° = 0.5, cos 90° = 0</li>
              <li>tan 0° = 0, tan 45° = 1, tan 90° = undefined (vertical line)</li>
            </ul>
            <p>
              The 0.707 is significant — it\'s 1/√2 and shows up in RMS calculations, single-phase
              vs 3-phase voltage and power factor tables. 0.866 is √3/2 and shows up in 3-phase
              line-to-phase voltage maths.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Percentage and ratio</ContentEyebrow>

          <ConceptBlock
            title="Percentage change — always divide by the original"
            plainEnglish="Percentage change = (new value − old value) / old value × 100. The denominator is the value you started with, not the value you ended with."
            onSite="EICR voltage drop reports list voltage drop as a percentage of nominal — 4 % of 230 V = 9.2 V. Mix the formula up and the report fails verification."
          >
            <p>Worked example: a transformer secondary measures 232 V no load and 220 V full load.</p>
            <p>
              Regulation = (232 − 220) / 232 × 100 = 12 / 232 × 100 = 5.17 %.
            </p>
            <p>
              The 232 V is the open-circuit (no-load) value — the reference. Always divide by the
              starting or reference figure. Get that backwards (12/220) and you\'ll get 5.45 %, which
              is the wrong number.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BIDMAS / BODMAS — calculator order of operations"
            plainEnglish="Brackets, Indices, Division/Multiplication (left to right), Addition/Subtraction (left to right). The order in which a calculator (and the marker) evaluates a sum. Get this wrong and the answer is wildly off, even with the right numbers."
            onSite="Three-phase power: P = √3 × V × I × cos φ. Punching it as √(3 × V × I × cos φ) instead of √3 × V × I × cos φ gives a totally different number. Use brackets to force order."
          >
            <p>Worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 + 3 × 4 = 2 + 12 = 14 (multiplication first, NOT 5 × 4 = 20).</li>
              <li>(2 + 3) × 4 = 5 × 4 = 20 (brackets force the addition first).</li>
              <li>10 ÷ 2 × 5 = 5 × 5 = 25 (division and multiplication left-to-right; NOT 10 / 10 = 1).</li>
              <li>3-phase example: P = 1.732 × 400 × 25 × 0.85 = 14 722 W ≈ 14.72 kW. Calculator does it in order: 1.732 × 400 = 692.8, × 25 = 17 320, × 0.85 = 14 722. Right.</li>
              <li>Wrong order: √(3 × 400 × 25 × 0.85) = √25 500 = 159.7 — completely wrong.</li>
            </ul>
            <p>
              On a Casio fx-85, the previous answer is held in <code>Ans</code>. Build long sums in
              steps using <code>Ans</code> rather than typing one giant expression — easier to
              spot a mistake.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Ratios — turns ratio, gear ratio, transformer ratio"
            plainEnglish="A ratio compares two quantities. Transformer turns ratio N₁ : N₂ might be 50 : 1 — meaning 50 turns on the primary for every 1 turn on the secondary. The ratio is the same whether you call it 50:1 or 100:2 or 5000:100."
          >
            <p>
              For a step-down transformer with N₁ = 1000 primary turns and N₂ = 50 secondary turns,
              the turns ratio is 1000:50, which simplifies to 20:1 (divide both sides by 50).
              That same ratio sets the voltage ratio: V₁/V₂ = N₁/N₂. So 11 000 V primary gives
              11 000 / 20 = 550 V secondary.
            </p>
            <p>
              Ratios stay constant when you scale both sides equally — which is why you can
              simplify them. Don\'t add or subtract numbers from one side without doing it to the
              other.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Mixing units mid-calculation"
            whatHappens={
              <>
                Sum says: voltage drop = (mV/A/m × I × L) / 1000. Apprentice plugs in 18 mV/A/m,
                32 A, 25 m — gets V<sub>drop</sub> = 14.4. Forgets the divide-by-1000 because they
                already think they\'re in volts. Reports 14.4 V drop and oversizes the cable to
                10 mm².
              </>
            }
            doInstead={
              <>
                Write the units beside every number as you enter it. mV × A × m gives you mV·A·m
                in units. Dividing by 1000 (mA per A) and noting that the m cancels gets you to
                volts. The actual drop is 14.4 mV. The job needed 2.5 mm², not 10 mm².
              </>
            }
          />

          <Scenario
            title="Calculating cable size for a 25 m, 32 A radial — full transposition"
            situation={
              <>
                You\'re sizing a 32 A cooker circuit, run length 25 m. The voltage drop limit is
                3 % of 230 V (final circuits). Cable is 6 mm² PVC twin-and-earth. Appendix 4 gives
                mV/A/m = 7.3 for that cable.
              </>
            }
            whatToDo={
              <>
                Maximum allowable drop = 3 % × 230 V = 0.03 × 230 = 6.9 V.
                <br />
                Actual drop = (7.3 × 32 × 25) / 1000 = 5840 / 1000 = 5.84 V.
                <br />
                5.84 V &lt; 6.9 V → 6 mm² is compliant. Move on.
              </>
            }
            whyItMatters={
              <>
                Every step uses the maths in this Sub: percentage (3 % limit), transposition
                (mV/A/m formula), unit conversion (÷ 1000 from mV to V), and comparison. Get any
                one of those wrong and you specify the wrong cable.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Same-base indices add when multiplying, subtract when dividing. Negative indices put the number in the denominator.',
              'Scientific notation = one non-zero digit before the decimal point, then × 10 to a power. Use the calculator’s ×10ˣ key.',
              'Transposition keeps both sides balanced. Undo operations in reverse: divide before square-root, etc.',
              'SOH-CAH-TOA gives sin/cos/tan ratios; Pythagoras gives the hypotenuse. Both come back as the power triangle.',
              'Calculator must be in DEG mode for L3 trig — RAD gives wildly wrong angles.',
              'Percentage change always divides by the original (reference) value, not the new one.',
              'Always carry units through every step. mV is not V; kW is not W. Wrong unit = wrong answer.',
            ]}
          />

          <Quiz
            title="Mathematical principles knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 SI units and prefixes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
