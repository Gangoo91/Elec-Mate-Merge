/**
 * Ported from the English course, combining:
 *   level2/module2/section4/Sub2.tsx
 *   level2/module2/section4/Sub3.tsx
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
  VideoCard,
} from '@/components/study-centre/learning';
import {
  SeriesCircuit,
  KirchhoffVoltageLoop,
  ParallelCircuit,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'series-current-rule',
    question: 'In a series circuit, the current through each component is…',
    options: [
      'Highest at the supply',
      'The same everywhere',
      'Different at every component',
      'Zero in any unused component',
    ],
    correctIndex: 1,
    explanation:
      'One path means one current. Whatever flows through the first component flows through every component after it.',
  },
  {
    id: 'voltage-divider-check',
    question:
      'A 12 V supply across two equal resistors in series. What is the voltage across each?',
    options: ['6 V each', '3 V each', '0 V each', '12 V each'],
    correctIndex: 0,
    explanation:
      'Equal resistors share the supply equally. Two equal Rs on 12 V means 6 V each. The voltages always add up to the supply.',
  },
  {
    id: 'kirchhoff-check',
    question: 'A circuit has a 24 V battery, R₁ takes 8 V, R₂ takes 10 V. What does R₃ take?',
    options: ['2 V', '14 V', '6 V', '24 V'],
    correctIndex: 2,
    explanation:
      'Kirchhoff’s voltage law — the drops add up to the supply. 8 + 10 + R₃ = 24, so R₃ = 6 V.',
  },
  {
    id: 'series-fault-diagnosis',
    question:
      'On a string of festoon lights, the first three lamps work, the rest are dead. What’s the most likely fault?',
    options: [
      'A blown fuse at the supply end of the string',
      'A series break (open circuit) somewhere between lamp 3 and lamp 4',
      'A short circuit across the first three lamps',
      'The supply voltage being slightly too low',
    ],
    correctIndex: 1,
    explanation:
      'Series logic. If everything past a point is dead but everything before it works, the path is broken at that point. Start your testing right where it goes dark.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'A 12 V battery feeds three resistors in series. The drops measure 2 V, 4 V and 6 V. What does Kirchhoff’s voltage law tell you?',
    options: [
      'The current must be different through each resistor',
      'The drops add to 12 V — the supply is fully accounted for, the readings are consistent',
      'Each resistor sees the full 12 V supply',
      'The largest resistor takes the smallest voltage drop',
    ],
    correctAnswer: 1,
    explanation:
      'KVL is bookkeeping. 2 + 4 + 6 = 12 V matches the supply, so every volt the battery puts out is accounted for by a drop. If they didn’t add up, you’d have an arithmetic mistake or a missed drop.',
  },
  {
    id: 2,
    question: 'Three resistors in series: 100 Ω, 200 Ω, 300 Ω. Total resistance?',
    options: ['50 Ω', '100 Ω', '600 Ω', '200 Ω'],
    correctAnswer: 2,
    explanation: 'Series resistances add directly: 100 + 200 + 300 = 600 Ω.',
  },
  {
    id: 3,
    question: 'Voltage across components in a series circuit divides…',
    options: [
      'Inversely with resistance',
      'Equally regardless of resistance',
      'It does not divide — each component sees full voltage',
      'In proportion to each resistance',
    ],
    correctAnswer: 3,
    explanation:
      'The bigger the resistor, the bigger its share of the supply. Voltage divider rule: Vx = Vs × Rx ÷ Rt.',
  },
  {
    id: 4,
    question: 'A 12 V supply, R₁ = 100 Ω, R₂ = 200 Ω in series. What is V₁?',
    options: ['4 V', '6 V', '8 V', '12 V'],
    correctAnswer: 0,
    explanation:
      'V₁ = Vs × R₁ ÷ Rt = 12 × 100 ÷ 300 = 4 V. Check: V₂ would be 8 V, total 12 V. Adds up.',
  },
  {
    id: 5,
    question: 'One component in a series chain fails open circuit. What happens to the others?',
    options: [
      'Current doubles through the rest',
      'All components stop — single path is broken',
      'Voltage divides across the remaining ones',
      'Only that one stops working',
    ],
    correctAnswer: 1,
    explanation:
      'Series = one path. Break the path anywhere and current stops everywhere. That is why old-style fairy lights all went out when one bulb blew.',
  },
  {
    id: 6,
    question: 'To measure the current in a series chain, where does the ammeter go?',
    options: [
      'Across the supply',
      'Across one of the resistors',
      'In series, broken into the chain',
      'Anywhere on the bottom wire',
    ],
    correctAnswer: 2,
    explanation:
      'Ammeters MUST be in series with the load — current has to flow THROUGH the meter. Connecting one across a supply would short it out.',
  },
  {
    id: 7,
    question: 'A 30 V supply across R₁ = 50 Ω and R₂ = 100 Ω in series. What is the current?',
    options: ['0.1 A', '0.6 A', '0.3 A', '0.2 A'],
    correctAnswer: 3,
    explanation:
      'Rt = 50 + 100 = 150 Ω. I = V ÷ R = 30 ÷ 150 = 0.2 A. That same 0.2 A flows through both resistors.',
  },
  {
    id: 8,
    question: 'Where do you actually meet series wiring on a UK installation?',
    options: [
      'A switch wired in line with a single load',
      'A ring final circuit feeding socket outlets',
      'Lighting points wired from a junction box',
      'Two immersion heaters on the same circuit',
    ],
    correctAnswer: 0,
    explanation:
      'A switch in series with the load it controls — that is the simplest series arrangement on every site. Sockets and most lighting are parallel.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why is the current the same all the way through a series circuit?',
    answer:
      'Because there is only one path. Charge cannot pile up or vanish — what enters one component leaves it and goes straight into the next. Like water in a single hose: same flow at every point.',
  },
  {
    question: 'Are most circuits in a house wired in series?',
    answer:
      'No — almost everything in a domestic install is parallel. Sockets, lights, appliances all need the full 230 V each, and they need to keep working when others are off. Series only really shows up for a switch in line with its load, and inside individual fittings (LED strings, control circuits).',
  },
  {
    question: 'What is the voltage divider rule and when do I use it?',
    answer:
      'Vx = Vs × Rx ÷ Rt. Lets you find the voltage across one resistor in a series chain without working out the current first. Handy for control circuits, LED strings and predicting the voltage at a sense point.',
  },
  {
    question: 'Does Kirchhoff’s voltage law work for any closed loop?',
    answer:
      'Yes — that is the whole point. Walk round any closed loop and the supply rises minus the resistor drops sum to zero. Useful sanity check on every series problem.',
  },
  {
    question: 'Why did old fairy lights all die when one bulb blew?',
    answer:
      'Classic series circuit. One bulb open-circuits, the path is broken, no current flows, all the other bulbs go out. Modern LED strings get round it with parallel sets or by shorting failed elements internally.',
  },
  {
    question: 'How does series wiring relate to a long cable run?',
    answer:
      'A long cable acts like a small series resistor before the load. The voltage drops along the cable and the load sees less than the full supply. That is voltage drop — covered properly in its own lesson.',
  },
];

/* ── Inline check questions ───────────────────────────────────────── */

const checks2 = [
  {
    id: 'parallel-voltage-rule',
    question: 'In a parallel circuit, the voltage across each branch is…',
    options: [
      'Divided between the branches',
      'Zero on the unused branches',
      'Equal to the supply voltage on every branch',
      'Different for each branch depending on resistance',
    ],
    correctIndex: 2,
    explanation:
      'Every branch is hard-wired straight across the supply, so each one sees the full supply voltage. That is the whole point of parallel — each load is independent.',
  },
  {
    id: 'parallel-current-divider',
    question:
      'A 24 V supply feeds two branches in parallel: R₁ = 60 Ω and R₂ = 120 Ω. Which branch carries more current?',
    options: [
      'Neither, the supply blocks current to higher R',
      'Both the same — it’s parallel',
      'R₁ — lower resistance pulls more current',
      'R₂ — higher resistance pulls more current',
    ],
    correctIndex: 2,
    explanation:
      'Same voltage on both branches, so I = V ÷ R. Lower R means higher I. R₁ draws 0.4 A, R₂ draws 0.2 A. The smaller resistor always hogs more current.',
  },
  {
    id: 'parallel-failure-mode',
    question:
      'Three lamps are wired in parallel off a 230 V supply. One lamp blows open circuit. What happens to the other two?',
    options: [
      'All three go off — broken path',
      'They glow at half brightness',
      'They go to full mains plus the failed lamp’s share',
      'They keep working as normal',
    ],
    correctIndex: 3,
    explanation:
      'Each branch is independent. One open-circuit branch just stops drawing current. The other two still see the full 230 V and carry on. This is why nearly every UK final circuit is parallel.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'In parallel circuits, the voltage across each branch is…',
    options: [
      'Shared unequally between branches',
      'Equal to the supply voltage',
      'Zero on the unused branches',
      'Only present on the last branch',
    ],
    correctAnswer: 1,
    explanation:
      'Every parallel branch sits directly across the supply, so each one sees the full supply voltage.',
  },
  {
    id: 2,
    question: 'Total current in a parallel circuit equals…',
    options: [
      'The supply voltage divided by the largest R',
      'The smallest branch current',
      'The sum of every branch current',
      'Always 1 A',
    ],
    correctAnswer: 2,
    explanation:
      'Currents split at the junction and add back up at the return junction. Itotal = I₁ + I₂ + I₃ + … (Kirchhoff’s current law).',
  },
  {
    id: 3,
    question: 'For two resistors in parallel, the equivalent resistance formula is…',
    options: ['R₁ − R₂', 'R₁ + R₂', 'R₁ × R₂', '(R₁ × R₂) ÷ (R₁ + R₂)'],
    correctAnswer: 3,
    explanation:
      'Two-resistor shortcut: product over sum. For three or more, use the reciprocal formula 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
  },
  {
    id: 4,
    question: 'Two branches: 2 Ω and 6 Ω in parallel. Equivalent resistance?',
    options: ['1.5 Ω', '4 Ω', '8 Ω', '3 Ω'],
    correctAnswer: 0,
    explanation: 'Rt = (2 × 6) ÷ (2 + 6) = 12 ÷ 8 = 1.5 Ω. Always less than the smallest branch.',
  },
  {
    id: 5,
    question: 'Three identical 60 Ω resistors in parallel give a total resistance of…',
    options: ['60 Ω', '20 Ω', '10 Ω', '180 Ω'],
    correctAnswer: 1,
    explanation:
      'Identical resistors shortcut: Rt = R ÷ n = 60 ÷ 3 = 20 Ω. Three equal paths share the current evenly.',
  },
  {
    id: 6,
    question: 'Add another branch to an existing parallel circuit. What happens overall?',
    options: [
      'Total resistance goes up, total current goes down',
      'Nothing changes — branches are independent',
      'Total resistance goes down, total current goes up',
      'Voltage on existing branches drops',
    ],
    correctAnswer: 2,
    explanation:
      'Another path for current to flow lowers total resistance, so the supply pushes more current overall. Existing branches still see the same voltage and same current.',
  },
  {
    id: 7,
    question:
      'A 12 V supply feeds three parallel branches: 120 Ω, 80 Ω and 240 Ω. What is the total current drawn from the supply?',
    options: ['0.10 A', '0.15 A', '0.60 A', '0.30 A'],
    correctAnswer: 3,
    explanation:
      'I₁ = 12 ÷ 120 = 0.10 A. I₂ = 12 ÷ 80 = 0.15 A. I₃ = 12 ÷ 240 = 0.05 A. Total = 0.10 + 0.15 + 0.05 = 0.30 A.',
  },
  {
    id: 8,
    question: 'Where do you meet parallel wiring on a typical UK domestic install?',
    options: [
      'A ring final circuit serving multiple sockets',
      'Two switches at the top and bottom of a staircase controlling one light',
      'The line and neutral tails between the meter and the consumer unit',
      'A single immersion heater fed by its own dedicated radial',
    ],
    correctAnswer: 0,
    explanation:
      'Sockets on a ring final, lamps on a lighting circuit, every fixed appliance — all parallel off the live and neutral. Each one needs the full 230 V and has to keep working when others switch off.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Why does adding more branches to a parallel circuit lower the total resistance?',
    answer:
      'Each new branch is another path for current. More paths means easier flow, which is the same as less opposition. Total resistance is always lower than the smallest single branch — that always feels backwards at first, but the maths is solid.',
  },
  {
    question: 'How do I check parallel circuit calculations on site?',
    answer:
      'Measure the voltage across each branch — it should equal the supply. Measure each branch current with a clamp meter and check they add up to total current at the supply. If a branch reads zero, that one’s open. If total current is suspiciously high, there’s a fault somewhere drawing more than the design intended.',
  },
  {
    question: 'What happens if one branch in a parallel circuit fails open?',
    answer:
      'Other branches carry on as normal. That’s why a blown bulb in your living room doesn’t kill your kitchen lights, and why one tripped appliance doesn’t shut down the whole socket ring. Independence is the whole reason we use parallel.',
  },
  {
    question: 'What if a branch fails short circuit instead of open?',
    answer:
      'Different story. A short across one branch effectively shorts the whole supply, drawing huge current. The protective device (MCB or fuse) should trip very quickly. If it doesn’t, you’ve got a serious problem.',
  },
  {
    question: 'Can I just add up the resistances like in series?',
    answer:
      'No. Series resistances add directly because current has to fight through them all in turn. Parallel resistances combine using the reciprocal formula because they each give the current another path. Use product-over-sum for two, the reciprocal formula for three or more.',
  },
  {
    question: 'When should I use the current divider rule?',
    answer:
      'When you know the total current and want to find what each branch carries. Ibranch = Itotal × (Rother ÷ (Rbranch + Rother)) for two branches. Easier in most cases though: just calculate I = V ÷ R for each branch, since you know the supply voltage equals every branch voltage.',
  },
];

export default function Lesson307E_4_4() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        One path, one current. Voltage divides between the components in proportion to their
        resistance. Three rules and you can solve any series circuit.
      </p>

      <TLDR
        points={[
          'Series = single path. The same current flows through every component, no exceptions.',
          'Voltage divides between components in proportion to resistance — bigger R takes bigger share. They always add up to the supply.',
          'Total resistance is the sum: Rt = R₁ + R₂ + R₃ + … Add them up, then I = V ÷ Rt gives you the current.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the three series circuit rules: same current, voltages add, resistances add.',
          'Apply the voltage divider rule (Vx = Vs × Rx ÷ Rt) to find any component voltage, including in real-world dividers like thermistor sensors and dimmer pots.',
          'Calculate total resistance, total current and individual voltage drops for a multi-resistor series chain.',
          'Use Kirchhoff’s voltage law as a bookkeeping sanity check — every supply rise accounted for by drops.',
          'Use one-fault-stops-all logic to locate a series break: find the boundary between alive and dead.',
          'Recognise where series effects appear in a UK installation — switches, LED strings, broken CPCs, voltage drop along a cable.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What “series” actually means</ContentEyebrow>

      <ConceptBlock
        title="Series = one single path for current"
        plainEnglish="Components are joined end-to-end in a chain. Current has nowhere else to go — it has to pass through every one of them."
        onSite="Easiest example on site — a light switch wired in series with the lamp it controls. Open the switch, the path is broken, the lamp goes off. Switch and lamp share that single line."
      >
        <p>
          In a series circuit, the components are connected one after another in a single loop
          from the supply, through each component, and back. There are no branches and no
          junctions. Picture it like a single hose threading through a chain of taps — the water
          has to flow through every tap to complete the loop.
        </p>
        <p>That single-path setup gives three rules that hold for every series circuit:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Current is the same everywhere</strong> — I₁ = I₂ = I₃ = Itotal.
          </li>
          <li>
            <strong>Voltages add up to the supply</strong> — V₁ + V₂ + V₃ = Vs.
          </li>
          <li>
            <strong>Resistances add directly</strong> — Rt = R₁ + R₂ + R₃ + …
          </li>
        </ul>
      </ConceptBlock>

      <SeriesCircuit
        voltage="12 V"
        resistors={[
          { label: 'R₁', value: '100 Ω' },
          { label: 'R₂', value: '200 Ω' },
          { label: 'R₃', value: '300 Ω' },
        ]}
        caption="One supply, three resistors, single loop. The same current goes through R₁, R₂ and R₃."
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The maths — total resistance and current</ContentEyebrow>

      <ConceptBlock title="Worked example — three resistors on 12 V">
        <p>
          <strong>Given:</strong> 12 V supply with R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω all in
          series.
          <br />
          <strong>Find:</strong> total resistance, the current and the voltage across each
          resistor.
        </p>
        <p>
          <strong>Step 1 — total resistance.</strong> Add them up.
          <br />
          Rt = R₁ + R₂ + R₃ = 100 + 200 + 300 = 600 Ω.
        </p>
        <p>
          <strong>Step 2 — current.</strong> Use Ohm’s law on the whole circuit.
          <br />I = Vs ÷ Rt = 12 ÷ 600 = 0.02 A (20 mA).
        </p>
        <p>
          <strong>Step 3 — individual voltages.</strong> Same current through each, so V = I × R
          for each one.
          <br />
          V₁ = 0.02 × 100 = 2 V.
          <br />
          V₂ = 0.02 × 200 = 4 V.
          <br />
          V₃ = 0.02 × 300 = 6 V.
        </p>
        <p>
          <strong>Step 4 — sanity check.</strong> The voltages should add up to the supply. 2 + 4
          + 6 = 12 V ✓. The biggest resistor takes the biggest share of the voltage, the smallest
          takes the smallest. Looks right.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The voltage divider rule</ContentEyebrow>

      <ConceptBlock
        title="Vx = Vs × Rx ÷ Rt — the shortcut"
        plainEnglish="Each resistor’s share of the supply equals its own resistance divided by the total resistance, times the supply."
      >
        <p>
          The voltage divider rule lets you skip the current calculation and find the voltage
          across any one resistor directly. It is just Ohm’s law in disguise — but when you only
          need one voltage, it saves a step.
        </p>
        <p>
          <strong>Worked example.</strong> 24 V supply, R₁ = 150 Ω, R₂ = 450 Ω in series. Find V₂.
        </p>
        <p>
          Rt = 150 + 450 = 600 Ω.
          <br />
          V₂ = Vs × R₂ ÷ Rt = 24 × 450 ÷ 600 = 18 V.
          <br />
          Check by working out V₁ as well: V₁ = 24 × 150 ÷ 600 = 6 V. Add them: 6 + 18 = 24 V ✓.
        </p>
        <p>
          The 450 Ω resistor is three times the 150 Ω one, so it takes three times the voltage.
          That ratio holds for every series circuit.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Voltage divider, end to end — from textbook to control panel"
        plainEnglish="Two resistors in series across a supply make a divider. The voltage at the join depends on the ratio of the two resistors. Change one resistor and you change the voltage at the join — that’s how loads of sensors work."
        onSite="Spot a divider on a UFH controller, a thermostat, an LDR daylight switch, a fuel-gauge sender. Two-wire sensor that changes resistance with temperature, light or level — chances are it’s sat in a divider."
      >
        <p>
          <strong>Step one — the textbook case.</strong> A 12 V supply, R₁ = 4 Ω at the top, R₂ =
          8 Ω at the bottom, in series across the supply. Find the voltage at the middle (across
          R₂).
        </p>
        <p>
          Rt = 4 + 8 = 12 Ω.
          <br />
          V₂ = Vs × R₂ ÷ Rt = 12 × 8 ÷ 12 = 8 V.
          <br />
          V₁ = 12 × 4 ÷ 12 = 4 V.
          <br />
          Check: 4 + 8 = 12 V ✓. The 8 Ω resistor is twice the 4 Ω one, so it takes twice the
          voltage.
        </p>
        <p>
          <strong>Step two — the real-world version.</strong> An underfloor heating controller has
          a thermistor (a resistor that changes value with temperature) in series with a fixed
          reference resistor across the controller’s 5 V rail. The controller measures the voltage
          at the join — that voltage IS the temperature reading.
        </p>
        <p>
          Cold floor: thermistor resistance is high → it takes most of the 5 V → the join sits
          near 0 V. Warm floor: thermistor resistance drops → it takes less of the 5 V → the join
          voltage rises. The microcontroller reads that swinging voltage and works out the
          temperature. Same maths as the textbook example, doing real work.
        </p>
        <p>
          <strong>Step three — the dimmer.</strong> A potentiometer is just a divider you can
          adjust by hand. The wiper slides along the resistive track, changing the ratio between
          the top half and the bottom half. A rotary dimmer, a volume knob, a joystick axis — all
          variable voltage dividers. Same Vx = Vs × Rx ÷ Rt rule, just with one of the Rs being a
          moving contact.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Kirchhoff’s voltage law — your sanity check</ContentEyebrow>

      <ConceptBlock
        title="The drops always sum back to the supply"
        plainEnglish="Walk round any closed loop. Add the supply, subtract every resistor drop. You should land back at zero."
      >
        <p>
          Kirchhoff’s voltage law (KVL) says: around any closed loop, the sum of voltage rises
          (from sources) equals the sum of voltage drops (across components). For a simple series
          circuit, that boils down to: V₁ + V₂ + V₃ + … = Vs.
        </p>
        <p>
          If your individual voltages don’t add up to the supply, you’ve made an arithmetic
          mistake somewhere. Use this as a one-line check on every series problem.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="KVL in plain English — the bookkeeping rule"
        plainEnglish="Every volt the supply pushes out has to get used up by something on the way back. Add the rises, subtract the drops, you finish where you started — at zero."
        onSite="When you’re fault-finding with a multimeter, this is the rule you’re unconsciously using. You measure the supply, you measure the drops, the numbers should balance. If they don’t, something’s open, shorted or wrongly identified."
      >
        <p>
          Think of the supply as the bank putting money in. Every resistor drop is a withdrawal.
          Walk all the way round the loop and you should be back to zero — the EMF you started
          with all gets used up by the time you’re back at the start. No volts left over, no volts
          unaccounted for.
        </p>
        <p>
          <strong>Worked example.</strong> 12 V battery feeding three resistors in series. R₁
          drops 2 V, R₂ drops 4 V, R₃ drops 6 V.
        </p>
        <p>
          Add the drops: 2 + 4 + 6 = 12 V. That equals the supply, so the books balance.
          <br />
          Or written as KVL proper: +12 − 2 − 4 − 6 = 0. The +12 is the rise across the battery,
          the negatives are the drops across each resistor. Walk the loop, finish at zero.
        </p>
        <p>
          That’s why the rule is a sanity check: if your three measured drops add to 11 V on a 12
          V supply, you’ve either misread one or there’s a fourth drop you missed (a connector, a
          length of cable, a dirty terminal).
        </p>
      </ConceptBlock>

      <KirchhoffVoltageLoop caption="Battery rises balance the resistor drops. Anywhere round the loop, the voltages sum to zero." />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 525 / Appendix 4 Table 4Ab (voltage drop in consumers’ installations)"
        clause="In ELV lighting installations, the voltage drop between the transformer and the furthest luminaire shall not exceed 5 % of the nominal voltage of the ELV installation in order to be deemed to comply with Section 525 of BS 7671."
        meaning={
          <>
            Voltage drop along a cable is a real-world series circuit at work. The cable’s
            resistance is in series with the load. Section 525 sets limits — typically 3 % for
            lighting and 5 % for other uses on LV, with the 5 % rule above for ELV lighting. Same
            maths you’ve used in the worked examples, just applied to long cable runs.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671 Section 525 and Appendix 4 Table 4Ab for the full text and exact percentage limits."
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>One break, everything dies — the diagnostic insight</ContentEyebrow>

      <ConceptBlock
        title="Break ANY component in a series loop and the whole circuit stops"
        plainEnglish="One path, one current. Break the path anywhere — at any joint, any terminal, any component — and current can’t flow at any point. Every load downstream goes dead at the same instant."
        onSite="This is the first thing your brain should reach for when you find a string of dead loads. Where does the dead bit start? That tells you where the break is."
      >
        <p>
          Old-style Christmas-tree fairy lights were the textbook example — fifty bulbs in series
          across the supply, one bulb blows open, the whole string goes dark. Modern LED strings
          get round it with little shunt diodes that short out a failed bulb, or by wiring the
          string in parallel sets. Same problem, fixed in hardware.
        </p>
        <p>
          The same thing used to plague festoon lighting on building sites. One lamp gets a knock,
          the filament breaks, every lamp from that point on the run goes out. Apprentices got
          sent up the ladder testing every bulb until they found the open one.
        </p>
        <p>
          <strong>Where it really matters — the CPC.</strong> The circuit protective conductor
          (the earth wire) running back to the MET is, electrically, a series path from the
          appliance through every connection back to the main earthing terminal. Break that path
          anywhere — a loose terminal at a JB, a snapped conductor inside a flex, a missing earth
          at a socket — and the earth-fault loop is gone. The whole protective system downstream
          of that break stops working, even though the lights still come on. (BS 7671 543 sets out
          the requirements for protective conductor continuity for exactly this reason.)
        </p>
        <p>
          <strong>The diagnostic insight:</strong> if everything past point X is dead but
          everything before it works, you’ve got a series break upstream of the first dead load.
          Don’t start at the consumer unit and work down — start at the boundary between alive and
          dead, and look for the open circuit there.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[3].id}
        question={checks[3].question}
        options={checks[3].options}
        correctIndex={checks[3].correctIndex}
        explanation={checks[3].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Assuming each component gets the full supply voltage"
        whatHappens={
          <>
            You wire two 12 V LED strips in series across a 12 V supply, expecting both to run
            normally. Instead they both glow at half brightness. You think the supply is faulty.
          </>
        }
        doInstead={
          <>
            In series, the supply DIVIDES between the loads. Two 12 V loads in series need a 24 V
            supply between them. Each load only ever sees the share that its resistance dictates.
            If both should run on 12 V, wire them in parallel, not series.
          </>
        }
      />

      <CommonMistake
        title="The divider works on paper but collapses when loaded"
        whatHappens={
          <>
            You want a 6 V feed for a small bell push from a 12 V supply, so you stick a pair of
            equal resistors in series and tap off the middle. With nothing connected the meter
            reads a clean 6 V. You wire a dimmer or a coil onto that mid-point and the voltage
            drops to half a volt. You scratch your head — the divider rule said 12 × R ÷ (R + R) =
            6 V, so where did it go?
          </>
        }
        doInstead={
          <>
            A divider only behaves while nothing is drawing real current off the mid-point. The
            moment a load hangs off the join, the load sits in PARALLEL with the bottom resistor
            and pulls the equivalent resistance way down — so the top resistor steals most of the
            supply and your tap-off collapses. Dividers are fine for sensing (high-impedance ADCs,
            op-amp inputs) but useless for switching real loads. For a load, use a contactor, a
            relay or a proper regulator — not a series resistor.
          </>
        }
      />

      <Scenario
        title="Why the bedside lamps both went off when one bulb blew"
        situation={
          <>
            A homeowner has wired two table lamps off a single twin socket using a pluggable
            adapter. Both lamps were working fine. One bulb blew, and the second lamp went out at
            the same instant. The homeowner thinks both bulbs failed.
          </>
        }
        whatToDo={
          <>
            You spot they’re wired in series — single line out of the adapter, through one lamp,
            then on to the other. Replace the failed bulb and both will work again. Better still,
            recommend rewiring properly so each lamp runs in parallel from the supply, with its
            own 230 V across it.
          </>
        }
        whyItMatters={
          <>
            A series fault doesn’t isolate to the failed component — it kills the whole chain.
            That is why almost every modern lighting / socket circuit uses parallel wiring (BS
            7671 Reg 314.1 — circuits divided to limit inconvenience).
          </>
        }
      />

      <VideoCard
        {...videos.seriesCircuits}
        topic="DC series circuits"
        caption="Animated walk-through of series circuits, voltage division and what happens when a component fails open. Useful reinforcement after the worked examples."
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Series circuits have one path. Current is identical at every point.',
          'Voltages share out in proportion to resistance and ALWAYS add back to the supply.',
          'Total resistance is the simple sum: Rt = R₁ + R₂ + R₃ + …',
          'Voltage divider rule (Vx = Vs × Rx ÷ Rt) is the shortcut to one voltage without solving the current first — same maths drives sensors, thermistors and dimmers in real installations.',
          'KVL is bookkeeping: every volt the supply rises gets used up by a drop. If your numbers don’t balance, recount.',
          'One open-circuit failure kills the whole chain. Use that — when something past point X is dead, the break is at point X.',
          'A broken CPC is a hidden series fault that leaves the lights on but kills the earth path. BS 7671 Section 543 sets the rules for protective conductor continuity.',
          'Long cable runs introduce series resistance. BS 7671 Section 525 caps the voltage drop allowed.',
        ]}
      />

      <Quiz title="Series circuits knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Multiple paths, one shared voltage. Current splits between the branches and adds back up
        at the junction. Three rules and you can solve any parallel circuit.
      </p>

      <TLDR
        points={[
          'Parallel = multiple paths. Each branch sees the FULL supply voltage — V₁ = V₂ = V₃ = Vs.',
          'Current splits between branches in inverse proportion to resistance, then adds back up: Itotal = I₁ + I₂ + I₃ + …',
          'Total resistance is ALWAYS less than the smallest branch. Add a branch and Rt drops further.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the three parallel circuit rules: same voltage everywhere, currents add, total R always less than the smallest branch.',
          'Calculate branch currents using I = V ÷ R, then sum them to find the total supply current.',
          'Use the product-over-sum formula for two parallel resistors and the reciprocal formula for three or more.',
          'Predict what happens when one branch fails open or short — and why this drives the choice of parallel for nearly every final circuit.',
          'Apply the current divider rule when you know the total current and need a single branch current.',
          'Recognise everyday parallel wiring on a UK install — sockets on a ring final, lamps on a lighting circuit, every fixed appliance.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What “parallel” actually means</ContentEyebrow>

      <ConceptBlock
        title="Parallel = multiple paths sharing the same voltage"
        plainEnglish="Each branch is wired straight across the supply with its own dedicated route home. Current can pick any branch — the easier the path (lower R), the more current takes it."
        onSite="Open up almost any consumer unit and look at a final circuit. Every socket, every lamp, every fixed appliance is wired between the same two conductors (line and neutral). Each one is its own parallel branch off the supply."
      >
        <p>
          In a parallel circuit, components share two common rails — one connected to the supply’s
          positive (or line), one connected to the supply’s negative (or neutral). Each component
          bridges those rails. Current splits between them and rejoins at the return rail.
        </p>
        <p>That arrangement gives three rules that hold for every parallel circuit:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Voltage is the same on every branch</strong> — V₁ = V₂ = V₃ = Vs. Every branch
            sees the full supply voltage.
          </li>
          <li>
            <strong>Currents add to give the total</strong> — Itotal = I₁ + I₂ + I₃ + … Whatever
            leaves the supply is what comes back, split across the branches.
          </li>
          <li>
            <strong>Total resistance is always less than the smallest branch</strong> — extra
            paths reduce overall opposition, not add to it.
          </li>
        </ul>
      </ConceptBlock>

      <ParallelCircuit
        voltage="24 V"
        resistors={[
          { label: 'R₁', value: '120 Ω' },
          { label: 'R₂', value: '80 Ω' },
          { label: 'R₃', value: '240 Ω' },
        ]}
        caption="Three branches across one supply. Each branch sees 24 V — the difference is what each one draws."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The maths — branch currents and total current</ContentEyebrow>

      <ConceptBlock title="Worked example — three branches on a 24 V supply">
        <p>
          <strong>Given:</strong> 24 V supply with three parallel branches: R₁ = 120 Ω, R₂ = 80 Ω,
          R₃ = 240 Ω.
          <br />
          <strong>Find:</strong> each branch current, the total current, and the equivalent
          resistance.
        </p>
        <p>
          <strong>Step 1 — voltage on each branch.</strong> Same as the supply, 24 V on every
          branch.
        </p>
        <p>
          <strong>Step 2 — branch currents.</strong> Use I = V ÷ R for each one.
          <br />
          I₁ = 24 ÷ 120 = 0.2 A.
          <br />
          I₂ = 24 ÷ 80 = 0.3 A.
          <br />
          I₃ = 24 ÷ 240 = 0.1 A.
        </p>
        <p>
          <strong>Step 3 — total current.</strong> Add them up.
          <br />
          Itotal = 0.2 + 0.3 + 0.1 = 0.6 A.
        </p>
        <p>
          <strong>Step 4 — equivalent resistance.</strong> Use Ohm’s law on the whole circuit.
          <br />
          Rt = Vs ÷ Itotal = 24 ÷ 0.6 = 40 Ω.
        </p>
        <p>
          <strong>Step 5 — sanity check.</strong> Rt should be less than the smallest branch (80
          Ω). 40 Ω is well under that, so the answer is consistent. The smallest resistance (80 Ω)
          carries the largest current (0.3 A) — also right.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Equivalent resistance — the two formulas</ContentEyebrow>

      <ConceptBlock
        title="Two resistors: product over sum"
        plainEnglish="For exactly two parallel resistors, multiply them then divide by their sum. Quick mental shortcut for spot calcs."
      >
        <p>
          <strong>Formula:</strong> Rt = (R₁ × R₂) ÷ (R₁ + R₂).
        </p>
        <p>
          <strong>Worked example.</strong> R₁ = 6 Ω, R₂ = 12 Ω in parallel.
          <br />
          Rt = (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = 4 Ω.
        </p>
        <p>
          Notice 4 Ω is less than the 6 Ω branch — every parallel combination ends up smaller than
          the smallest individual branch. That holds every single time.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Three or more resistors: the reciprocal formula"
        plainEnglish="Add up the reciprocals (1 ÷ R for each branch), then take the reciprocal of that total."
      >
        <p>
          <strong>Formula:</strong> 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …
        </p>
        <p>
          <strong>Worked example.</strong> Three branches: 4 Ω, 6 Ω and 12 Ω.
          <br />
          1 ÷ Rt = 1 ÷ 4 + 1 ÷ 6 + 1 ÷ 12 = 3 ÷ 12 + 2 ÷ 12 + 1 ÷ 12 = 6 ÷ 12 = 0.5.
          <br />
          Rt = 1 ÷ 0.5 = 2 Ω.
        </p>
        <p>
          <strong>Identical resistors shortcut.</strong> If every branch is the same, just divide
          by the count: Rt = R ÷ n. Three 60 Ω resistors in parallel give 60 ÷ 3 = 20 Ω. Saves a
          lot of fraction work.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Try it yourself</ContentEyebrow>

      <ConceptBlock title="The series and parallel calculator">
        <p>
          Punch in branch resistances and the calculator returns the equivalent resistance. Use it
          to check your manual maths after you’ve worked through it on paper — not as a
          replacement for understanding the formula.
        </p>
      </ConceptBlock>

      <SeriesParallelCalculators />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <VideoCard
        {...videos.parallelCircuits}
        topic="DC parallel circuits"
        caption="Animated walk-through of parallel circuits, current division and what happens when a branch fails. Useful reinforcement after the worked examples above."
      />

      <SectionRule />

      <ContentEyebrow>Where it ties to BS 7671</ContentEyebrow>

      <ConceptBlock
        title="Why parallel rules nearly every final circuit"
        plainEnglish="Each load needs the full 230 V to work properly, and one fault on one device shouldn’t kill the rest. Parallel gives you both."
      >
        <p>
          Every fixed UK final circuit you’ll wire — sockets on a ring, lamps on a lighting
          circuit, the immersion, the cooker — sits in parallel across the supply. Each accessory
          is its own branch. Each gets the full 230 V it needs. And when one fails or is switched
          off, the others keep going.
        </p>
        <p>
          The regs don’t use the word “parallel” in this context, but the requirement to divide
          installations into circuits comes from a closely related idea — limit the effect of one
          fault.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 314.1"
        clause="Every electrical installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault."
        meaning={
          <>
            Translation — split things up so a single fault doesn’t take everything offline.
            Wiring loads in parallel (and onto separate protective devices) is how the
            installation actually meets this requirement on site. Series-only final circuits fail
            this principle because one failure stops the lot.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 314.1"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Adding parallel resistances like they’re in series"
        whatHappens={
          <>
            You see two 100 Ω resistors in parallel and write Rt = 200 Ω. The maths gets you to a
            current that’s half what the circuit actually draws. Cable selection, fuse rating —
            anything you size off that calc is undercooked.
          </>
        }
        doInstead={
          <>
            For two parallel resistors, use product over sum: Rt = (100 × 100) ÷ (100 + 100) =
            10000 ÷ 200 = 50 Ω. Half the value of one branch — exactly what you’d expect for two
            equal paths. Sanity check: parallel total is ALWAYS less than the smallest branch.
          </>
        }
      />

      <Scenario
        title="The kitchen socket that ‘killed the rest of the ring’"
        situation={
          <>
            A homeowner reports that plugging in a particular toaster trips the kitchen ring and
            takes out every other socket on the circuit. They blame the other sockets. You
            isolate, prove dead and start tracing.
          </>
        }
        whatToDo={
          <>
            Sockets on the ring are in parallel — independent branches off the same line and
            neutral. The other sockets aren’t the problem. The toaster is shorting (or drawing
            fault current) on its own branch, but because every branch sits on the same protective
            device at the consumer unit, that device trips and isolates the whole ring. Test the
            toaster on a known-good socket elsewhere with an in-line tester, or plug a known-good
            appliance into the suspect socket. The fault is in the appliance or that one
            accessory, not the wider ring.
          </>
        }
        whyItMatters={
          <>
            Understanding that branches are independent — but share one upstream protective device
            — is the diagnostic key. The other sockets going off is correct behaviour, not a sign
            they’re all faulty.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 433.4 (parallel conductors)"
        clause="Except for the ring final circuit exception, where a single device protects conductors in parallel and the conductors are sharing currents equally, the value of I to be used in Regulation 433.11 shall be the sum of the current-carrying capacities of the parallel conductors. Where the use of a single conductor is impractical and the currents in the parallel conductors are unequal, the design current and overload-protection requirements shall be considered for each conductor individually."
        meaning={
          <>
            Translation — when conductors themselves are run in parallel (think two singles
            paralleled to share load on a big sub-main), the rated current you use for protection
            sizing is the SUM of each conductor’s capacity. Same parallel maths you’ve been doing
            — total current divides between the conductors based on how evenly they share. 433.4.1
            covers the equal-share case; 433.4.2 covers the unequal-share case (treated
            individually, with a 10 % difference as the threshold per the note).
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671 Reg 433.4 (433.4.1 equal sharing, 433.4.2 unequal sharing) for the full text."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Parallel circuits have multiple paths. Voltage is identical on every branch and equal to the supply.',
          'Currents split between branches in inverse proportion to resistance, then add back up to the total.',
          'Two-resistor shortcut: Rt = (R₁ × R₂) ÷ (R₁ + R₂). Three or more: 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
          'Parallel total is ALWAYS less than the smallest branch. Add another branch and the total drops further.',
          'One open-circuit branch doesn’t affect the others — that’s why nearly every UK final circuit is wired in parallel.',
          'Equivalent resistance × supply voltage gives total current. Use this as a one-line cross-check on every calc.',
        ]}
      />

      <Quiz title="Parallel circuits knowledge check" questions={quizQuestions2} />
    </div>
  );
}
