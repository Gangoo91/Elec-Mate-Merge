/**
 * Ported from the English course, combining:
 *   level2/module2/section4/Sub4.tsx
 *   level2/module2/section4/Sub6.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import SeriesParallelCalculators from '@/components/apprentice-courses/SeriesParallelCalculators';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
import {
  SeriesCircuit,
  ParallelCircuit,
  MixedCircuit,
  KirchhoffVoltageLoop,
} from '@/components/study-centre/diagrams';
import { FormulaList } from '@/components/apprentice-courses/FormulaList';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'reduction-order',
    question:
      'You’re reducing a network that has parallel branches in the middle of a series chain. Which do you reduce first?',
    options: [
      'Add all the resistors together first, then divide by how many there are',
      'Reduce the series resistors first, then combine the parallel branches',
      'Start with the largest resistor and work down to the smallest',
      'Reduce the parallel sections first, then add the series resistors to the result',
    ],
    correctIndex: 3,
    explanation:
      'Collapse the parallel sections to a single equivalent resistance first, then you’ve got a clean series chain to add up. Doing it the other way round leaves you with a mess.',
  },
  {
    id: 'two-equal-parallel-shortcut',
    question: 'Two equal 200 Ω resistors in parallel give a total of…',
    options: ['400 Ω', '100 Ω', '200 Ω', '50 Ω'],
    correctIndex: 1,
    explanation:
      'Two equal Rs in parallel = R ÷ 2. So 200 ÷ 2 = 100 Ω. Quick mental shortcut for spot calcs.',
  },
  {
    id: 'mixed-network-total',
    question:
      'Two 10 Ω resistors in parallel, then in series with a 5 Ω resistor. What is the total resistance?',
    options: ['10 Ω', '20 Ω', '25 Ω', '15 Ω'],
    correctIndex: 0,
    explanation:
      'Parallel pair first: (10 × 10) ÷ (10 + 10) = 5 Ω. Then add the series 5 Ω: 5 + 5 = 10 Ω total.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Total resistance of three resistors in series is…',
    options: ['Their product', 'Their sum', 'Their average', 'The smallest one'],
    correctAnswer: 1,
    explanation:
      'Series resistances add directly: Rt = R₁ + R₂ + R₃. Each one fights the current in turn, so they pile up.',
  },
  {
    id: 2,
    question: 'For two resistors in parallel, the equivalent resistance is…',
    options: ['R₁ − R₂', 'R₁ + R₂', '(R₁ × R₂) ÷ (R₁ + R₂)', 'R₁ × R₂'],
    correctAnswer: 2,
    explanation:
      'Product over sum is the two-resistor parallel shortcut. Always less than the smallest branch.',
  },
  {
    id: 3,
    question:
      'When reducing a complex series-parallel network, the recommended order of operations is…',
    options: [
      'Largest resistor first, smallest last',
      'Series first, then parallel',
      'Whichever side has the supply',
      'Parallel first, then series',
    ],
    correctAnswer: 3,
    explanation:
      'Collapse the parallel sections to single equivalent resistors, which leaves a clean series chain to add up. Easier to track and harder to mess up.',
  },
  {
    id: 4,
    question:
      'Three resistors: 20 Ω and 30 Ω in parallel, then in series with 10 Ω. Total resistance?',
    options: ['22 Ω', '60 Ω', '15 Ω', '50 Ω'],
    correctAnswer: 0,
    explanation:
      'Parallel pair: (20 × 30) ÷ (20 + 30) = 600 ÷ 50 = 12 Ω. Then series: 12 + 10 = 22 Ω.',
  },
  {
    id: 5,
    question: 'A voltage divider with a 12 V supply, R₁ = 4 Ω, R₂ = 8 Ω. Voltage across R₂?',
    options: ['6 V', '8 V', '12 V', '4 V'],
    correctAnswer: 1,
    explanation:
      'V₂ = Vs × R₂ ÷ Rt = 12 × 8 ÷ (4 + 8) = 12 × 8 ÷ 12 = 8 V. The bigger resistor takes the bigger share.',
  },
  {
    id: 6,
    question:
      'Current divider: 3 A total flowing into a parallel pair of 6 Ω and 12 Ω. Current through the 6 Ω branch?',
    options: ['1 A', '1.5 A', '2 A', '3 A'],
    correctAnswer: 2,
    explanation:
      'Lower resistance carries more current. I(6 Ω) = Itotal × R(other) ÷ (R(6) + R(other)) = 3 × 12 ÷ (6 + 12) = 36 ÷ 18 = 2 A.',
  },
  {
    id: 7,
    question:
      'You collapse a network and end up with Rt = 75 Ω across a 12 V supply. What is the total current?',
    options: ['900 A', '0.625 A', '6.25 A', '0.16 A'],
    correctAnswer: 3,
    explanation:
      'I = V ÷ R = 12 ÷ 75 = 0.16 A. Every reduction problem ends with one Ohm’s law calc.',
  },
  {
    id: 8,
    question: 'Three identical 30 Ω resistors all in parallel. What is the equivalent resistance?',
    options: ['10 Ω', '15 Ω', '90 Ω', '30 Ω'],
    correctAnswer: 0,
    explanation: 'Identical parallel resistors: Rt = R ÷ n = 30 ÷ 3 = 10 Ω.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why do I always reduce parallel sections first?',
    answer:
      'Because once you’ve collapsed each parallel block into a single equivalent resistor, what’s left is a simple series chain — and series is just addition. If you tried to do it the other way round, you’d still have parallel sections sitting in the middle, and the maths gets ugly fast.',
  },
  {
    question: 'How can the total resistance be smaller than any one branch in a parallel section?',
    answer:
      'Because every branch is another route the current can take. More routes mean less overall opposition. Two 10 Ω resistors in parallel give 5 Ω, three 10 Ω resistors give 3.33 Ω, four give 2.5 Ω. The pattern always heads down.',
  },
  {
    question: 'When should I use the voltage divider rule instead of working out current first?',
    answer:
      'When you only need ONE voltage in a series chain and don’t care about the current. Vx = Vs × Rx ÷ Rt is just Ohm’s law packaged up. For full circuit analysis (every branch, every drop), it’s usually quicker to find the current and then V = I × R for each component.',
  },
  {
    question: 'How does this maths apply to real installations?',
    answer:
      'LED arrays often have resistor networks that mix series-parallel patterns. Control panels, dimmer circuits, and any equipment with internal resistor ladders all use combined networks. Cable runs themselves are series resistance with the load — voltage drop calcs are just this maths applied to copper.',
  },
  {
    question: 'I keep losing track on big networks. Any tips?',
    answer:
      'Draw it out. Put a box around each parallel pair, work out the equivalent, redraw with that single resistor in place. Repeat until you have one final value. Going step-by-step on paper is much faster than trying to do it all at once in your head.',
  },
  {
    question: 'Why does the calculator give a different number than my hand calc?',
    answer:
      'Almost always rounding. Calculators carry full precision; hand calcs usually round each step to 1 or 2 decimals. Try doing the maths without rounding until the very last step. If you’re still out, there’s a unit slip (mA vs A or kΩ vs Ω) hiding somewhere — re-check your conversions.',
  },
];

/* ── Inline check questions ───────────────────────────────────────── */

const checks2 = [
  {
    id: 'series-spot-check',
    question: 'On site, what visual clue most reliably says “this is a series circuit”?',
    options: [
      'Several junction boxes splitting the supply to different loads',
      'Two conductors landing on each terminal at the protective device',
      'A single chain — one cable in, one cable out at each component, no branching',
      'Each load wired straight across the line and neutral rails',
    ],
    correctIndex: 2,
    explanation:
      'Series wiring is a daisy chain — single line through every component in turn, no branching. If you can see junction boxes splitting the supply to different loads, that’s parallel.',
  },
  {
    id: 'kvl-loop-check',
    question:
      'A loop has a 24 V battery, R₁ drops 8 V, R₂ drops 10 V. By Kirchhoff’s voltage law, what does R₃ drop?',
    options: ['6 V', '2 V', '14 V', '24 V'],
    correctIndex: 0,
    explanation:
      'KVL — drops add to the supply. 8 + 10 + R₃ = 24, so R₃ = 6 V. One-line sanity check on every series problem.',
  },
  {
    id: 'mixed-network-strategy',
    question:
      'You meet a network with R₁ in series with [R₂ parallel R₃]. What’s the FIRST step in finding the total resistance?',
    options: [
      'Add R₁ to R₂ first, then deal with R₃ separately',
      'Add all three resistances together as if they were in series',
      'Work out the total current before touching any resistance',
      'Reduce R₂ parallel R₃ to a single equivalent resistor first',
    ],
    correctIndex: 3,
    explanation:
      'Parallel sections collapse first. (R₂ × R₃) ÷ (R₂ + R₃) gives one equivalent. Then add R₁ in series. Going the other way round leaves a parallel block dangling and the maths gets ugly.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'A single path for current with no branching tells you the circuit is…',
    options: ['A radial', 'Series', 'A ring final', 'Parallel'],
    correctAnswer: 1,
    explanation: 'One path = series. Same current flows through every component, no exceptions.',
  },
  {
    id: 2,
    question: 'You can recognise a parallel circuit by…',
    options: [
      'The same current flowing through every component',
      'One open circuit switching off every load at once',
      'Each load operating independently of the others',
      'A single conductor in and out of each component',
    ],
    correctAnswer: 2,
    explanation:
      'Parallel branches are independent. One bulb blows, the others stay lit. That’s the diagnostic clue — and the reason almost every UK final circuit is parallel.',
  },
  {
    id: 3,
    question:
      'A 12 V supply with R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω all in series. The total current is…',
    options: ['0.12 A', '0.06 A', '1.0 A', '0.02 A'],
    correctAnswer: 3,
    explanation: 'Rt = 100 + 200 + 300 = 600 Ω. I = 12 ÷ 600 = 0.02 A (20 mA).',
  },
  {
    id: 4,
    question: 'Two resistors of 6 Ω and 12 Ω wired in parallel give an equivalent resistance of…',
    options: ['4 Ω', '18 Ω', '6 Ω', '2 Ω'],
    correctAnswer: 0,
    explanation:
      'Rt = (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = 4 Ω. Less than the smaller branch, as always.',
  },
  {
    id: 5,
    question:
      'At a socket MCB you find two line conductors and two neutral conductors at the same terminals. This is most likely…',
    options: ['A radial spur', 'A ring final circuit', 'A three-phase circuit', 'A series circuit'],
    correctAnswer: 1,
    explanation:
      'Two conductors at line, two at neutral, two at earth — the circuit leaves the consumer unit and returns to the same protective device. Classic ring final wiring.',
  },
  {
    id: 6,
    question: 'Before opening accessories to trace circuit branches, the FIRST thing you do is…',
    options: [
      'Open every accessory first to see how it is wired',
      'Measure the voltage at each terminal while still live',
      'Carry out safe isolation — prove the tester on a known live source, isolate, lock-off, test dead',
      'Switch off only the lighting circuit and leave the rest live',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation every time — prove the tester, isolate, lock-off, test dead, prove the tester again. No exceptions. Then start tracing.',
  },
  {
    id: 7,
    question:
      'A 24 V supply feeds a series leg of R₁ = 150 Ω + R₂ = 450 Ω, sat in parallel with R₃ = 120 Ω. Total resistance?',
    options: ['120 Ω', '720 Ω', '600 Ω', '100 Ω'],
    correctAnswer: 3,
    explanation:
      'Series leg: 150 + 450 = 600 Ω. Parallel with 120 Ω: (600 × 120) ÷ (600 + 120) = 72000 ÷ 720 = 100 Ω.',
  },
  {
    id: 8,
    question:
      'A 230 V kettle element has resistance ≈ 26.5 Ω. The power it dissipates is approximately…',
    options: ['2.0 kW', '26.5 kW', '8.7 W', '870 W'],
    correctAnswer: 0,
    explanation:
      'P = V² ÷ R = 230² ÷ 26.5 = 52900 ÷ 26.5 ≈ 1996 W ≈ 2 kW. Bang on for a domestic kettle.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'How do I safely identify circuit types on an energised installation?',
    answer:
      'You don’t — you isolate first. Prove your tester on a known source, isolate the circuit at the protective device, lock-off, test dead, prove the tester again. Then trace the wiring with confidence. Trying to trace a live circuit by feel or sight is how people get hurt.',
  },
  {
    question: 'What’s the quickest way to spot a ring final circuit at the consumer unit?',
    answer:
      'Two conductors at the same MCB or RCBO line terminal, two at the neutral bar going to the same circuit, and two at the earth bar. The cable leaves the CU, loops through every socket on the circuit, and comes back to the same protective device. End-to-end resistance test on each conductor with the ring opened gives you the proof.',
  },
  {
    question: 'Why are parallel circuits preferred over series for nearly every install?',
    answer:
      'Three reasons. One — each load needs the full 230 V, parallel gives that. Two — one fault on one branch doesn’t take everything offline. Three — BS 7671 314.1 requires installations to be divided into circuits to limit inconvenience, and parallel is what makes that practical.',
  },
  {
    question: 'Where do I still meet series circuits on site?',
    answer:
      'A switch wired in line with the load it controls is series. Inside LED tape with internal series strings. Decorative festoon strings (still common). Sensing chains in control circuits. Inside cartridge fuses — the element is in series with whatever it’s protecting.',
  },
  {
    question: 'I find a circuit with mixed series and parallel — how do I tackle the maths?',
    answer:
      'Map it out on paper before touching a calculator. Identify each parallel block, collapse it to a single equivalent resistance using product-over-sum or the reciprocal formula. Redraw the simpler circuit. Add the series resistors. Apply Ohm’s law to get the total current. Then work backwards if you need branch currents or individual voltage drops.',
  },
  {
    question: 'How do I sanity-check a multi-step calculation went right?',
    answer:
      'Three quick tests. One — total parallel resistance is always less than the smallest branch. Two — voltage drops in any series chain always sum to the supply (KVL). Three — branch currents in any parallel section always sum to the total (KCL). If any of those are off, find the slip before moving on.',
  },
];

export default function Lesson307E_4_5() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Step-by-step reduction strategy for any network. Collapse the parallel parts first, then
        add the series. One method, every circuit.
      </p>

      <TLDR
        points={[
          'Series resistances add: Rt = R₁ + R₂ + R₃ + … Parallel resistances combine: 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
          'Two-resistor shortcuts: parallel = (R₁ × R₂) ÷ (R₁ + R₂); equal pair = R ÷ 2; n equal = R ÷ n.',
          'Reduction strategy — parallel sections first, series additions second. Repeat until one equivalent value remains, then I = V ÷ Rt finishes the job.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the formulas for total resistance in series and in parallel, and choose the right one for the network in front of you.',
          'Apply product-over-sum, equal-pair and equal-n shortcuts to speed up parallel calculations.',
          'Reduce a mixed series-parallel network step-by-step, redrawing as you go, to a single equivalent resistance.',
          'Use Ohm’s law on the equivalent circuit to find total current, then work backwards to find branch currents and voltage drops.',
          'Apply the voltage divider rule (Vx = Vs × Rx ÷ Rt) and the current divider rule for spot calcs.',
          'Sanity-check every reduction — total parallel R is always less than the smallest branch; total series R is always more than the largest resistor.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The two foundation rules</ContentEyebrow>

      <ConceptBlock
        title="Series — resistances add directly"
        plainEnglish="Components in line, current has to fight through every one. Each resistance piles on top of the last."
      >
        <p>
          <strong>Formula:</strong> Rt = R₁ + R₂ + R₃ + …
        </p>
        <p>
          <strong>Worked check.</strong> Three resistors in series: 100 Ω, 200 Ω, 300 Ω.
          <br />
          Rt = 100 + 200 + 300 = 600 Ω. The total is bigger than the biggest individual resistor —
          true for every series chain.
        </p>
      </ConceptBlock>

      <SeriesCircuit
        voltage="12 V"
        resistors={[
          { label: 'R₁', value: '100 Ω' },
          { label: 'R₂', value: '200 Ω' },
          { label: 'R₃', value: '300 Ω' },
        ]}
        caption="Three series resistors. Rt = 100 + 200 + 300 = 600 Ω. I = 12 ÷ 600 = 0.02 A."
      />

      <ConceptBlock
        title="Parallel — combine the reciprocals"
        plainEnglish="Each branch is another path. More paths mean less overall opposition, so total resistance always drops."
      >
        <p>
          <strong>Formula (general):</strong> 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …
          <br />
          <strong>Two-resistor shortcut:</strong> Rt = (R₁ × R₂) ÷ (R₁ + R₂).
          <br />
          <strong>n equal resistors:</strong> Rt = R ÷ n.
        </p>
        <p>
          <strong>Worked check.</strong> Three branches: 4 Ω, 6 Ω and 12 Ω.
          <br />
          1 ÷ Rt = 1 ÷ 4 + 1 ÷ 6 + 1 ÷ 12 = 3 ÷ 12 + 2 ÷ 12 + 1 ÷ 12 = 6 ÷ 12 = 0.5.
          <br />
          Rt = 1 ÷ 0.5 = 2 Ω. Less than the smallest branch (4 Ω) — correct.
        </p>
      </ConceptBlock>

      <ParallelCircuit
        voltage="12 V"
        resistors={[
          { label: 'R₁', value: '4 Ω' },
          { label: 'R₂', value: '6 Ω' },
          { label: 'R₃', value: '12 Ω' },
        ]}
        caption="Three parallel branches. Equivalent resistance = 2 Ω, total current = 12 ÷ 2 = 6 A."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The reduction strategy</ContentEyebrow>

      <ConceptBlock
        title="Parallel first, series second — every time"
        plainEnglish="Collapse each parallel block into a single resistor. Then you’re left with a clean series chain that just adds up."
      >
        <p>The recipe doesn’t change, no matter how messy the network looks at first:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            Find every parallel section. Reduce each one to a single equivalent resistance using
            the formulas above.
          </li>
          <li>
            Redraw the circuit with those single equivalents in place. You should be looking at a
            series chain or a much simpler network.
          </li>
          <li>Add the series resistances to get the final total Rt.</li>
          <li>
            Use I = Vs ÷ Rt to find the total supply current — this is the current through every
            series resistor in the simplified circuit.
          </li>
          <li>
            Work backwards if you need branch currents or individual voltage drops, using V = I ×
            R or the divider rules.
          </li>
        </ol>
        <p>
          Going parallel-first keeps the bookkeeping clean. Going series-first leaves parallel
          chunks dangling in the middle and the maths balloons.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <ConceptBlock title="Worked example — a real mixed network">
        <p>
          <strong>Given:</strong> 12 V supply. R₁ = 10 Ω in series with a parallel block of R₂ =
          20 Ω, R₃ = 30 Ω and R₄ = 60 Ω.
          <br />
          <strong>Find:</strong> total resistance and the supply current.
        </p>
        <p>
          <strong>Step 1 — three resistors in parallel, all different.</strong> Equal-pair and
          product-over-sum shortcuts don’t fit, so reach for the general reciprocal formula: 1 ÷
          Rt = 1 ÷ R₂ + 1 ÷ R₃ + 1 ÷ R₄. Three different denominators — pick a common one and add.
        </p>
        <p>
          1 ÷ 20 + 1 ÷ 30 + 1 ÷ 60 = 3 ÷ 60 + 2 ÷ 60 + 1 ÷ 60 = 6 ÷ 60.
          <br />
          So 1 ÷ Rt = 6 ÷ 60, which means Rt(parallel) = 60 ÷ 6 = 10 Ω. Less than the smallest
          branch (20 Ω) — sanity check passed.
        </p>
        <p>
          <strong>Step 2 — that gives me a single equivalent.</strong> The whole parallel block
          now collapses to one 10 Ω resistor.
        </p>
        <p>
          <strong>Step 3 — redraw as 10 Ω in series with that equivalent.</strong> R₁ at the
          front, then the 10 Ω I just calculated. A clean two-resistor series chain.
        </p>
        <p>
          <strong>Step 4 — sum them.</strong> Rt = 10 + 10 = 20 Ω. Now Ohm’s law on the whole
          circuit:
          <br />I = Vs ÷ Rt = 12 ÷ 20 = 0.6 A.
        </p>
        <p>
          <strong>Sanity.</strong> Total parallel R (10 Ω) is below the smallest branch (20 Ω) ✓.
          Total series R (20 Ω) is above either component (10 Ω + 10 Ω) ✓. The 0.6 A is a
          believable supply current for a 12 V circuit with modest resistors. All four checks line
          up — the answer is solid.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Worked example 1 — series-then-parallel</ContentEyebrow>

      <ConceptBlock title="A series leg sitting alongside a single resistor">
        <p>
          <strong>Given:</strong> 24 V supply. Branch A is R₁ = 150 Ω in series with R₂ = 450 Ω.
          Branch B is just R₃ = 120 Ω. Both branches sit in parallel across the supply.
          <br />
          <strong>Find:</strong> total resistance, total current and the current in each branch.
        </p>
        <p>
          <strong>Step 1 — reduce the series leg.</strong> R(A) = R₁ + R₂ = 150 + 450 = 600 Ω. Now
          you’ve got two parallel branches: 600 Ω and 120 Ω.
        </p>
        <p>
          <strong>Step 2 — combine the parallel pair.</strong> Rt = (600 × 120) ÷ (600 + 120) =
          72000 ÷ 720 = 100 Ω.
        </p>
        <p>
          <strong>Step 3 — total current.</strong> Itotal = Vs ÷ Rt = 24 ÷ 100 = 0.24 A.
        </p>
        <p>
          <strong>Step 4 — branch currents.</strong> Each branch sees the full 24 V.
          <br />
          I(A) = 24 ÷ 600 = 0.04 A.
          <br />
          I(B) = 24 ÷ 120 = 0.2 A.
        </p>
        <p>
          <strong>Step 5 — sanity check.</strong> Branch currents must sum to total: 0.04 + 0.2 =
          0.24 A ✓. The lower-resistance branch (120 Ω) carries the larger current — also correct.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Worked example 2 — parallel-then-series</ContentEyebrow>

      <ConceptBlock title="A parallel pair feeding a single series resistor">
        <p>
          <strong>Given:</strong> 12 V supply. R₁ = 100 Ω and R₂ = 300 Ω in parallel. That
          parallel block is then in series with R₃ = 50 Ω.
          <br />
          <strong>Find:</strong> total resistance, total current, the voltage across the parallel
          block, and the currents in R₁ and R₂.
        </p>
        <p>
          <strong>Step 1 — collapse the parallel pair.</strong> R(p) = (100 × 300) ÷ (100 + 300) =
          30000 ÷ 400 = 75 Ω.
        </p>
        <p>
          <strong>Step 2 — add the series resistor.</strong> Rt = R(p) + R₃ = 75 + 50 = 125 Ω.
        </p>
        <p>
          <strong>Step 3 — total current.</strong> Itotal = 12 ÷ 125 = 0.096 A. That same current
          flows through R₃ and into the parallel block.
        </p>
        <p>
          <strong>Step 4 — voltage across the parallel block.</strong> V(p) = Itotal × R(p) =
          0.096 × 75 = 7.2 V. (Cross-check: V across R₃ = 0.096 × 50 = 4.8 V, and 7.2 + 4.8 = 12 V
          ✓.)
        </p>
        <p>
          <strong>Step 5 — branch currents.</strong> Both branches see 7.2 V.
          <br />
          I(R₁) = 7.2 ÷ 100 = 0.072 A.
          <br />
          I(R₂) = 7.2 ÷ 300 = 0.024 A.
          <br />
          Check: 0.072 + 0.024 = 0.096 A ✓ — matches the total current.
        </p>
      </ConceptBlock>

      <MixedCircuit
        voltage="12 V"
        caption="What to look at — R₂ and R₃ are the two branches stacked on the right, sharing the same pair of nodes; that’s the parallel block. R₁ is the lone resistor on the left in line with the supply; that’s the series part. Collapse the parallel block to one equivalent first, then add R₁ to get total Rt."
      />

      <SectionRule />

      <ContentEyebrow>Two divider shortcuts worth knowing</ContentEyebrow>

      <ConceptBlock
        title="Voltage divider — find one voltage without solving the current first"
        plainEnglish="In a series chain, each resistor’s voltage share equals its own resistance divided by the total, multiplied by the supply."
      >
        <p>
          <strong>Formula:</strong> Vx = Vs × Rx ÷ Rt.
        </p>
        <p>
          <strong>Worked example.</strong> 12 V supply, R₁ = 4 Ω, R₂ = 8 Ω in series. Find V₂.
          <br />
          Rt = 4 + 8 = 12 Ω. V₂ = 12 × 8 ÷ 12 = 8 V. Check: V₁ = 12 × 4 ÷ 12 = 4 V, total = 12 V
          ✓.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Current divider — find one branch current without solving the total first"
        plainEnglish="In a parallel pair, each branch carries a share of the total inversely proportional to its resistance."
      >
        <p>
          <strong>Formula (two branches):</strong> I(x) = Itotal × R(other) ÷ (Rx + R(other)).
        </p>
        <p>
          <strong>Worked example.</strong> 3 A total flowing into a parallel pair of 6 Ω and 12 Ω.
          Find the current in the 6 Ω branch.
          <br />
          I(6 Ω) = 3 × 12 ÷ (6 + 12) = 36 ÷ 18 = 2 A. Check: I(12 Ω) = 3 × 6 ÷ 18 = 1 A; total 2 +
          1 = 3 A ✓.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Try it yourself</ContentEyebrow>

      <ConceptBlock title="The series and parallel calculator">
        <p>
          Enter your branch values and the calculator returns equivalent resistance for both
          series and parallel arrangements. Use it to verify each step of your manual reduction —
          not as a substitute for the working out. Learning the order matters more than the
          answer.
        </p>
      </ConceptBlock>

      <SeriesParallelCalculators />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it ties to BS 7671</ContentEyebrow>

      <ConceptBlock
        title="Reduction maths underneath voltage drop"
        plainEnglish="A long cable run is a series resistance in front of the load. The cable steals voltage from the load — exactly the same maths as a voltage divider."
      >
        <p>
          On a real install, the conductor’s own resistance is in series with whatever load it
          feeds. Voltage drops along the cable, and the load sees less than the full supply. The
          further you go, or the smaller the cable, the bigger the drop. That limit is set by BS
          7671.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 525 (deemed-compliance limit, ELV lighting)"
        clause="In ELV lighting installations, the voltage drop between the transformer and the furthest luminaire shall not exceed 5 % of the nominal voltage of the ELV installation in order to be deemed to comply with Section 525 of BS 7671."
        meaning={
          <>
            Translation — voltage drop along a cable is series resistance at work. Section 525
            caps how much of the supply you’re allowed to lose before the load. The series and
            parallel reduction maths in this lesson is exactly what cable design software is doing
            under the hood when it sizes conductors against the volt-drop limit.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671 Section 525 and Appendix 4 Table 4Ab for the full text and exact percentage limits."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Doing series and parallel in the wrong order"
        whatHappens={
          <>
            You see a network with R₁ in series with [R₂ in parallel with R₃] and start adding R₁
            + R₂ first. That gives you a number that means nothing — R₁ and R₂ are NOT in series
            with each other when R₃ is sitting in parallel across R₂.
          </>
        }
        doInstead={
          <>
            Always reduce the parallel block first. (R₂ × R₃) ÷ (R₂ + R₃) gives one equivalent
            resistor. THEN add R₁ to that result. Get the order right and the rest is just
            arithmetic.
          </>
        }
      />

      <Scenario
        title="The LED array that won’t hit full brightness"
        situation={
          <>
            You’ve installed a custom LED array with several LEDs in series chains, and those
            chains wired in parallel back to a 24 V driver. The whole thing is dim and the
            supplier’s app says it should pull 1.6 A but you’re measuring 1.0 A.
          </>
        }
        whatToDo={
          <>
            Treat each chain as a series resistance (LED forward voltage drops add up like
            resistor drops in series). Each chain in parallel branches off the 24 V driver.
            Calculate the expected resistance of one chain, divide by the number of chains for the
            equivalent, then I = V ÷ Rt should hit the manufacturer figure. If your hand calc says
            1.6 A but the meter reads 1.0 A, one chain is open (probably a blown LED or a bad
            solder joint) — that branch isn’t pulling its share, the others still work, and total
            current drops. Trace each branch with the array isolated.
          </>
        }
        whyItMatters={
          <>
            The reduction maths gives you the EXPECTED total. The measurement gives you the
            actual. The gap between the two tells you what’s wrong — usually a missing branch or a
            higher-than-spec series resistance somewhere.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Where total resistance shows up on site</ContentEyebrow>

      <ConceptBlock
        title="Three real installer concerns, all the same maths"
        plainEnglish="The reduction strategy you’ve just learned isn’t just exam fodder — it’s how you reason about consumer units, earth fault loops and odd commercial gear like AV systems. Three concrete places it matters."
        onSite="The maths doesn’t change between a textbook problem and a real CU. Resistors become circuits, branches become final circuits, the supply becomes the cut-out. Same formulas, different labels."
      >
        <ul className="space-y-2.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Combining final circuits at the consumer unit (parallel).</strong> Every final
            circuit on the CU is a parallel branch off the same line and neutral bars. Total
            current at the cut-out = sum of every circuit’s current — and the busbar / main switch
            Iz has to exceed that diversity-adjusted total, not just any one circuit’s rating.
            Same KCL you’ll meet later in this lesson, at the consumer-unit scale.
          </li>
          <li>
            <strong>Zs as a series sum (Ze + R1 + R2).</strong> The earth fault loop impedance is
            just resistors in series — the external loop (Ze) plus
            the line conductor’s R1 plus the CPC’s R2. Zs = Ze + R1 + R2, exactly the “series
            resistances add” rule from this lesson. That sum decides whether the MCB trips fast
            enough on an earth fault.
          </li>
          <li>
            <strong>Speaker / AV runs in parallel.</strong> Wire two 8 Ω speakers in parallel to
            the same amp output and the amp now sees (8 × 8) ÷ (8 + 8) = <strong>4 Ω</strong>.
            Halving the impedance the amp sees can push it past its safe load rating and trip the
            protection — or burn the output stage if there isn’t any. Same product-over-sum
            formula you used on resistors a few paragraphs ago.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Two parallel-wired emergency luminaires — one fails"
        situation={
          <>
            A small commercial unit has two emergency-lit twin-spot fittings wired in parallel
            from the same EM supply, drawing roughly the same current each. You’re doing a 6-month
            flick test. One fitting fails to come on. Out of curiosity you clamp the supply
            current at the EM circuit and notice it’s now <strong>lower</strong> than it was when
            both were healthy. The apprentice with you reckons that can’t be right — “surely a
            failed fitting means more resistance, so more current?”
          </>
        }
        whatToDo={
          <>
            Talk it through using parallel maths. Two equal branches in parallel give Rt = R ÷ 2;
            total supply current splits equally between them. Lose one branch completely (open
            circuit) and the parallel network reduces to just the surviving branch — total
            resistance the supply sees has gone <strong>UP</strong>, not down, because you’ve
            removed one of the paths the current was using. By Ohm’s law the supply current at the
            EM circuit therefore <strong>drops</strong> — exactly what the clamp shows.
            Resolution: replace the failed lamp / battery / driver per the manufacturer’s spec,
            retest, current at the supply returns to its previous value.
          </>
        }
        whyItMatters={
          <>
            Intuition says “failed = more resistance = more current”. Wrong for parallel. Losing a
            branch removes one path for current, so total resistance UP and total current DOWN.
            KCL still balances at every node — there’s just less current flowing in total because
            a path has gone. Get this nailed before you start fault-finding parallel circuits or
            you’ll chase the wrong reading.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Series resistances add. Parallel resistances combine via reciprocals (or product-over-sum for two).',
          'Reduction strategy never changes — collapse parallel sections first, then add the series chain.',
          'Total parallel resistance is always less than the smallest branch. Total series resistance is always more than the largest individual resistor. Use these as instant sanity checks.',
          'Voltage divider (Vx = Vs × Rx ÷ Rt) and current divider (Ix = Itotal × R(other) ÷ (Rx + R(other))) are time-saving shortcuts for spot answers.',
          'After reducing, one Ohm’s law calc finishes the job: I = Vs ÷ Rt gives the total current, which is also the current through every series resistor in the simplified circuit.',
          'Cable runs are series resistance in disguise. Voltage drop limits in BS 7671 Section 525 are this maths applied to copper.',
        ]}
      />

      <Quiz
        title="Total resistance — series and parallel knowledge check"
        questions={quizQuestions}
      />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Recognise the circuit type on site, then apply Ohm’s law, series/parallel reduction and
        power formulas end-to-end. Two full multi-step examples and the diagnostic checks2 that go
        with them.
      </p>

      <TLDR
        points={[
          'Series clue: single chain, one cable in/out at each component, all-fail-together. Parallel clue: branches off shared rails, each load independent.',
          'Mixed-network recipe: collapse parallel blocks first, then add the series chain, then I = V ÷ Rt — every time.',
          'Sanity checks2 — KVL: drops in any loop sum to the supply. KCL: branch currents sum to the total. Parallel total < smallest branch. Series total > largest resistor.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Visually identify series, parallel and ring final wiring patterns at the consumer unit and along a circuit.',
          'Compare the strengths and weaknesses of series vs parallel and explain why parallel dominates UK final circuits.',
          'Work end-to-end through a multi-step DC problem — total R, total I, branch currents, individual voltage drops, total power.',
          'Apply Kirchhoff’s voltage and current laws as one-line sanity checks2 on any answer.',
          'Translate a real on-site situation (failed device, intermittent trip, dim load) into the right circuit-analysis approach.',
          'Follow safe isolation as the first step before any tracing or measurement on an installation.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What you already know</ContentEyebrow>

      <ConceptBlock title="Five lessons in, you’ve got the toolkit — this lesson puts it on real circuits">
        <p>
          Ohm’s law (V = I × R) gave you the one equation you’ll use on every problem from here
          on. Series circuits came next — single path, current the same everywhere, voltages add up
          to the supply. Then parallel circuits — shared voltage, branch currents add up to the
          total. Combining the two showed you how to collapse parallel blocks first, then sum the
          series chain. Power added three formulas, same physics — plus the I²R rule that makes
          cable heating bite. This lesson is where it all comes together on the kind of mixed
          circuits you’ll meet on site.
        </p>
        <p className="text-[13px] text-white/75 italic">
          Tool-bag thread: all this maths only matters if you can verify it on a real circuit. The
          MFT you met in the lesson on electrical measuring instruments measures Zs (the field
          version of total
          resistance — Ze + R1 + R2 in series) directly at any socket on the install. That’s the
          practical end of everything in this lesson: paper says one number, MFT says another, and
          the difference is what you fault-find on.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Recognising circuit types on site</ContentEyebrow>

      <ConceptBlock
        title="What gives away a series circuit"
        plainEnglish="A daisy chain — current has only one route. No junctions, no parallel paths, every component takes its share of the supply voltage."
        onSite="Pure series final circuits are rare on a UK install. Most series wiring you’ll meet is a switch in line with one load, decorative lighting, LED tape internals, or sensing chains in control panels."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Single conductor in, single conductor out at every component.</li>
          <li>No junction boxes splitting the supply to multiple loads.</li>
          <li>Failure mode — one open circuit kills the whole lot.</li>
          <li>Voltage drop test reveals different drops at each component.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="What gives away a parallel circuit"
        plainEnglish="Multiple branches off shared line/neutral rails. Each device gets the full supply voltage and works independently of the others."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Junction boxes (or accessory back-boxes) with multiple conductors meeting.</li>
          <li>Each load operates independently — switch one off, others keep working.</li>
          <li>Multiple cables leaving the same supply point.</li>
          <li>Common locations — sockets, lighting points, fixed appliance circuits.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Ring finals vs radials at the consumer unit"
        plainEnglish="Look at the terminations at the protective device. Two conductors at each terminal = ring. One conductor = radial."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Ring final</strong> — two line conductors at the MCB/RCBO terminal, two at
            neutral, two at earth. The circuit loops out and back to the same device. Standard 32
            A for socket rings.
          </li>
          <li>
            <strong>Radial</strong> — single conductors at each terminal. Tree-shaped, with
            branches at accessories rather than at the CU. Various ratings (16 A, 20 A, 32 A)
            depending on the application.
          </li>
        </ul>
        <p>
          End-to-end resistance testing (with the ring opened) confirms the ring really is a
          continuous loop — same value on each leg, equal to the loop resistance from CU back to
          CU.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Worked example 1 — pure series chain with KVL check</ContentEyebrow>

      <ConceptBlock title="12 V supply, three resistors in series — find I, V across each, total power">
        <p>
          <strong>Given:</strong> 12 V supply, R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω, all in series.
          <br />
          <strong>Find:</strong> total resistance, current, voltage across each resistor, total
          power.
        </p>
        <p>
          <strong>Step 1 — total resistance.</strong> Series adds. Rt = 100 + 200 + 300 = 600 Ω.
        </p>
        <p>
          <strong>Step 2 — current.</strong> I = Vs ÷ Rt = 12 ÷ 600 = 0.02 A (20 mA). Same current
          through every component because it’s series.
        </p>
        <p>
          <strong>Step 3 — voltage drops.</strong> V = I × R for each.
          <br />
          V₁ = 0.02 × 100 = 2 V.
          <br />
          V₂ = 0.02 × 200 = 4 V.
          <br />
          V₃ = 0.02 × 300 = 6 V.
        </p>
        <p>
          <strong>Step 4 — KVL sanity check.</strong> Drops should sum to the supply.
          <br />2 + 4 + 6 = 12 V ✓. Maths is consistent.
        </p>
        <p>
          <strong>Step 5 — total power.</strong> Use P = Vs × I on the whole circuit, or sum the
          components.
          <br />
          Whole circuit: P = 12 × 0.02 = 0.24 W.
          <br />
          Per component: P₁ = 0.02² × 100 = 0.04 W, P₂ = 0.02² × 200 = 0.08 W, P₃ = 0.02² × 300 =
          0.12 W. Total = 0.24 W ✓.
        </p>
        <p>
          <strong>Step 6 — sanity.</strong> The biggest resistor (R₃) takes the biggest voltage
          and the most power. Series rule confirmed.
        </p>
      </ConceptBlock>

      <KirchhoffVoltageLoop caption="Kirchhoff’s voltage law — drops around any closed loop sum back to zero. The sanity check that catches arithmetic slips." />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Worked example 2 — mixed network end-to-end</ContentEyebrow>

      <ConceptBlock title="24 V supply with a series leg sitting alongside a parallel resistor">
        <p>
          <strong>Given:</strong> 24 V supply. Branch A is R₁ = 150 Ω in series with R₂ = 450 Ω.
          Branch B is R₃ = 120 Ω. Both branches sit in parallel across the supply.
          <br />
          <strong>Find:</strong> total resistance, total current, branch currents, the voltage
          drops on R₁ and R₂ inside the series leg, and the total power dissipated.
        </p>
        <p>
          <strong>Step 1 — collapse the series leg.</strong> R(A) = R₁ + R₂ = 150 + 450 = 600 Ω.
        </p>
        <p>
          <strong>Step 2 — combine the parallel pair.</strong> Rt = (R(A) × R₃) ÷ (R(A) + R₃) =
          (600 × 120) ÷ (600 + 120) = 72000 ÷ 720 = 100 Ω.
        </p>
        <p>
          <strong>Step 3 — total current.</strong> Itotal = Vs ÷ Rt = 24 ÷ 100 = 0.24 A.
        </p>
        <p>
          <strong>Step 4 — branch currents.</strong> Each branch sees the full 24 V.
          <br />
          I(A) = 24 ÷ 600 = 0.04 A.
          <br />
          I(B) = 24 ÷ 120 = 0.2 A.
          <br />
          KCL check: I(A) + I(B) = 0.04 + 0.2 = 0.24 A ✓ — matches Itotal.
        </p>
        <p>
          <strong>Step 5 — voltage drops inside the series leg.</strong> Same I(A) = 0.04 A flows
          through R₁ and R₂.
          <br />
          V(R₁) = 0.04 × 150 = 6 V.
          <br />
          V(R₂) = 0.04 × 450 = 18 V.
          <br />
          KVL check: 6 + 18 = 24 V ✓ — matches the supply.
        </p>
        <p>
          <strong>Step 6 — total power.</strong> On the whole circuit: P = Vs × Itotal = 24 × 0.24
          = 5.76 W.
          <br />
          Cross-check by branch: P(A) = 24 × 0.04 = 0.96 W, P(B) = 24 × 0.2 = 4.8 W. Total = 0.96
          + 4.8 = 5.76 W ✓.
        </p>
        <p>
          <strong>Step 7 — sanity.</strong> The lower-resistance branch (B at 120 Ω) carries the
          bigger current and dissipates the bigger power. Parallel rule confirmed. Inside the
          series leg, the bigger resistor (R₂ at 450 Ω) takes the bigger voltage drop. Series rule
          confirmed. Both rules holding at once means the answer is solid.
        </p>
      </ConceptBlock>

      <MixedCircuit
        voltage="24 V"
        caption="A mixed network — a series leg in parallel with a single resistor. Reduce parallel first, then add series, then Ohm’s law finishes the job."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>
        Worked example 3 — kitchen extension cable sizing end-to-end
      </ContentEyebrow>

      <ConceptBlock
        title="6 mm² T&E, 28 m run, 32 A radial — pulling the earlier science into the synthesis"
        plainEnglish="One real cable problem, four prior lessons all touched. This is what synthesis means — the same physical cable is the subject of resistivity, voltage drop, thermal effects and power, all at the same time."
        onSite="A real kitchen extension where you’re sizing the run from the new sub-CU back to the main board. Not a textbook resistor — actual T&E carrying actual shower current."
      >
        <p>
          <strong>Given:</strong> 6 mm² T&E copper, route length 28 m, 32 A radial feeding a
          shower. ρ ≈ 0.0172 µΩ·m for copper, mV/A/m for 6 mm² T&E reference method C ≈ 7.3.
        </p>
        <p>
          <strong>Step 1 — cold resistance (resistance and resistivity, R = ρL/A).</strong> Round-trip means out and
          back, so length doubled:
          <br />R = 0.0172e-6 × 28 × 2 ÷ 6e-6 = <strong>0.16 Ω</strong> round-trip at 20°C.
        </p>
        <p>
          <strong>Step 2 — voltage drop at full load (voltage drop, Method B).</strong> Use the mV/A/m
          engineered shortcut, which already bakes in the operating temperature and loop length:
          <br />
          Vd = (7.3 × 32 × 28) ÷ 1000 = <strong>6.54 V</strong> = 6.54 ÷ 230 ={' '}
          <strong>2.85%</strong>. Inside the 5% socket / appliance limit. Pass.
        </p>
        <p>
          <strong>Step 3 — heat dumped in the cable (thermal effects, P = I²R).</strong> Using the cold
          resistance from Step 1:
          <br />P = I² × R = 32² × 0.16 = 1024 × 0.16 = <strong>164 W</strong> dissipated as heat
          in the round-trip of cable. That’s ~5.9 W per metre of round-trip — small per metre,
          real in total. This is the heat budget Cg / Ca derating in Appendix 4 has to keep inside
          the 70°C PVC limit.
        </p>
        <p>
          <strong>Step 4 — power delivered to the load (electrical power, P = V × I).</strong> Shower at
          full draw:
          <br />
          P(load) = V × I = 230 × 32 ≈ <strong>7,360 W</strong> ≈ 9.5 kW with the actual shower
          voltage allowing for Vd. The cable loses 164 W as heat; the load gets the rest. As a
          fraction: 164 ÷ (164 + 7,360) ≈ <strong>2.2%</strong> of the supplied electrical energy
          is wasted heating the cable, the other 97.8% does useful work in the heating element.
        </p>
        <p>
          That single calculation touched <strong>four prior lessons</strong> — resistance from
          ρL/A, voltage drop via mV/A/m, I²R cable heating, and load power from V × I. That’s what
          synthesis means: the cable doesn’t care which lesson it lives in, and neither does the
          customer paying the bill.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Try it yourself</ContentEyebrow>

      <ConceptBlock title="The series and parallel calculator">
        <p>
          Use the calculator below to verify the worked examples step-by-step. Punch in the branch
          resistances at each stage of the reduction and check the equivalent values line up with
          the maths above. The calculator’s for verification — the exam wants you to show the
          working.
        </p>
      </ConceptBlock>

      <SeriesParallelCalculators />

      <SectionRule />

      <ContentEyebrow>Series vs parallel — when each one wins</ContentEyebrow>

      <ConceptBlock
        title="Why parallel dominates final circuits"
        plainEnglish="Independent loads, full voltage, fault tolerance. The regs effectively require it."
      >
        <p>
          <strong>Parallel pros:</strong> each load gets the full supply voltage, one failure
          doesn’t take the others offline, easy to add or remove devices, easy to isolate a single
          point for maintenance.
        </p>
        <p>
          <strong>Parallel cons:</strong> more cable and connections, slightly higher install
          cost, total current goes up as more loads are added (so cable and protective device must
          be sized for the diversity-adjusted total).
        </p>
        <p>
          <strong>Series pros:</strong> simple, low cost, naturally limits current, voltage
          divides predictably across components — useful in control sensing chains and inside
          equipment.
        </p>
        <p>
          <strong>Series cons:</strong> one failure stops every load, voltage shares between
          components rather than each getting full supply, hard to add loads without redesign.
          Unsuitable for almost every UK final circuit on those grounds.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 314.1"
        clause="Every electrical installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault."
        meaning={
          <>
            Translation — split things up so a single fault doesn’t take everything offline. In
            practice that means parallel branches across multiple final circuits, each on its own
            protective device. Series-only final circuits would fail this principle — and that’s a
            big part of why you don’t see them in domestic installs.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 314.1"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Skipping the sanity checks2 because the calculation ‘looks right’"
        whatHappens={
          <>
            You work through a mixed-network problem, get a number, and move on. But you missed a
            unit conversion and your answer is 1000× out. The maths reads fine in isolation —
            until you check it against the supply voltage or the expected current on a real
            install.
          </>
        }
        doInstead={
          <>
            Three sanity checks2 on every multi-step problem. One — KVL: voltage drops in any
            series chain sum back to the supply. Two — KCL: branch currents in any parallel
            section sum back to the total. Three — total parallel resistance is always less than
            the smallest branch. Run those three after every problem and you’ll catch most of your
            own slips before they get into a write-up.
          </>
        }
      />

      <Scenario
        title="The lighting circuit where ‘half the room is dim’"
        situation={
          <>
            A homeowner reports that on one of their downstairs lighting circuits, two of the four
            ceiling lamps are noticeably dimmer than the other two. All four lamps are nominally
            identical. Switching one of the dim lamps off makes the other dim lamp slightly
            brighter.
          </>
        }
        whatToDo={
          <>
            Independent dimming and the “turn one off, the other gets brighter” behaviour points
            at series wiring instead of parallel. Two of the lamps have likely been joined in
            series by mistake (or because of a damaged loop wire), so they share the supply
            voltage instead of each getting full mains. Isolate, prove dead, open the rose on the
            dim lamps and trace. Expect to find the loop-in conductor for one fitting feeding
            straight into another fitting in series, instead of teeing off back to the switch /
            other lamps in parallel. Re-wire so each lamp sits in parallel across the switched
            live and neutral.
          </>
        }
        whyItMatters={
          <>
            Voltage division in series is a feature, not a bug — but on a final lighting circuit
            it’s never what you want. Every lamp should see the full 230 V. Spotting the symptom
            (dim + interactive) before pulling fittings apart saves a lot of blind tracing.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>All the maths from this section in one place</ContentEyebrow>

      <ConceptBlock title="Worth memorising — the DC circuits formula sheet">
        <p>
          Every formula you’ve used across the DC circuit lessons, gathered in one place. Screenshot
          this for revision — these are the eight equations that solve every DC problem at this
          level.
        </p>
      </ConceptBlock>

      <FormulaList
        items={[
          { text: 'Ohm’s law: V = I × R   (rearrange: I = V ÷ R, R = V ÷ I)' },
          { text: 'Series total resistance: Rt = R₁ + R₂ + R₃ + …' },
          { text: 'Parallel total resistance (general): 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …' },
          { text: 'Parallel total (two resistors): Rt = (R₁ × R₂) ÷ (R₁ + R₂)' },
          { text: 'Voltage divider: Vx = Vs × Rx ÷ Rt' },
          { text: 'Current divider (two branches): Ix = Itotal × R(other) ÷ (Rx + R(other))' },
          { text: 'Power: P = V × I   = I² × R   = V² ÷ R' },
          { text: 'Energy: E (kWh) = P (kW) × time (h)' },
        ]}
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Series clues: single chain, one cable in/out, all-fail-together. Parallel clues: branches off shared rails, each load independent.',
          'Reduction strategy never changes — parallel sections first, series additions second, Ohm’s law finishes the job.',
          'KVL and KCL are your two-line sanity checks2. Drops in a loop sum to the supply. Branch currents sum to the total.',
          'Parallel total resistance is always less than the smallest branch. Series total is always more than the largest resistor.',
          'Series shares VOLTAGE; parallel branches share CURRENT. Power follows current in series (biggest R takes most), and follows voltage in parallel (smallest R takes most).',
          'Safe isolation comes BEFORE any tracing or measurement on a real install. Prove the tester, isolate, lock-off, test dead, prove the tester again. No exceptions.',
        ]}
      />

      <Quiz title="Worked DC circuits — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
