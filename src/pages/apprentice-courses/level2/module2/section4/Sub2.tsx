/**
 * Module 2 · Section 4 · Sub 2 — Series circuits: current and voltage
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.4 / 4.5
 * Polished from relocated content during the Module 2 LO restructure.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { SeriesCircuit, KirchhoffVoltageLoop } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Series circuits — current and voltage | Level 2 Module 2.4.2 (AC 4.4 / 4.5) | Elec-Mate';
const DESCRIPTION =
  'How current and voltage behave in a series circuit. Voltage divider rule, total resistance and worked examples for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'series-current-rule',
    question: 'In a series circuit, the current through each component is…',
    options: [
      'Different at every component',
      'The same everywhere',
      'Highest at the supply',
      'Zero in any unused component',
    ],
    correctIndex: 1,
    explanation:
      'One path means one current. Whatever flows through the first component flows through every component after it.',
  },
  {
    id: 'voltage-divider-check',
    question: 'A 12 V supply across two equal resistors in series. What is the voltage across each?',
    options: ['12 V each', '6 V each', '3 V each', '0 V each'],
    correctIndex: 1,
    explanation:
      'Equal resistors share the supply equally. Two equal Rs on 12 V means 6 V each. The voltages always add up to the supply.',
  },
  {
    id: 'kirchhoff-check',
    question: 'A circuit has a 24 V battery, R₁ takes 8 V, R₂ takes 10 V. What does R₃ take?',
    options: ['2 V', '6 V', '14 V', '24 V'],
    correctIndex: 1,
    explanation:
      'Kirchhoff’s voltage law — the drops add up to the supply. 8 + 10 + R₃ = 24, so R₃ = 6 V.',
  },
  {
    id: 'series-fault-diagnosis',
    question:
      'On a string of festoon lights, the first three lamps work, the rest are dead. What’s the most likely fault?',
    options: [
      'All the dead lamps have blown at once',
      'A series break (open circuit) somewhere between lamp 3 and lamp 4',
      'The supply has dropped to half voltage',
      'The earth is disconnected',
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
      'There is a fourth hidden drop you have missed',
      'The drops add to 12 V — the supply is fully accounted for, the readings are consistent',
      'The battery must actually be 24 V',
      'One of the resistors is faulty',
    ],
    correctAnswer: 1,
    explanation:
      'KVL is bookkeeping. 2 + 4 + 6 = 12 V matches the supply, so every volt the battery puts out is accounted for by a drop. If they didn’t add up, you’d have an arithmetic mistake or a missed drop.',
  },
  {
    id: 2,
    question: 'Three resistors in series: 100 Ω, 200 Ω, 300 Ω. Total resistance?',
    options: ['100 Ω', '200 Ω', '600 Ω', '50 Ω'],
    correctAnswer: 2,
    explanation: 'Series resistances add directly: 100 + 200 + 300 = 600 Ω.',
  },
  {
    id: 3,
    question: 'Voltage across components in a series circuit divides…',
    options: [
      'Equally regardless of resistance',
      'In proportion to each resistance',
      'Inversely with resistance',
      'It does not divide — each component sees full voltage',
    ],
    correctAnswer: 1,
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
      'Only that one stops working',
      'Current doubles through the rest',
      'All components stop — single path is broken',
      'Voltage divides across the remaining ones',
    ],
    correctAnswer: 2,
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
    options: ['0.1 A', '0.2 A', '0.3 A', '0.6 A'],
    correctAnswer: 1,
    explanation:
      'Rt = 50 + 100 = 150 Ω. I = V ÷ R = 30 ÷ 150 = 0.2 A. That same 0.2 A flows through both resistors.',
  },
  {
    id: 8,
    question: 'Where do you actually meet series wiring on a UK installation?',
    options: [
      'Ring final socket circuit',
      'Lighting circuit with multiple lamps in parallel',
      'A switch wired in line with a single load',
      'A ring main',
    ],
    correctAnswer: 2,
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
      'A long cable acts like a small series resistor before the load. The voltage drops along the cable and the load sees less than the full supply. That is voltage drop — covered properly in Sub 6.',
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 2"
            title="Series circuits — current and voltage"
            description="One path, one current. Voltage divides between the components in proportion to their resistance. Three rules and you can solve any series circuit."
            tone="emerald"
          />

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
              In a series circuit, the components are connected one after another in a single
              loop from the supply, through each component, and back. There are no branches
              and no junctions. Picture it like a single hose threading through a chain of
              taps — the water has to flow through every tap to complete the loop.
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
              <br />
              I = Vs ÷ Rt = 12 ÷ 600 = 0.02 A (20 mA).
            </p>
            <p>
              <strong>Step 3 — individual voltages.</strong> Same current through each, so V =
              I × R for each one.
              <br />
              V₁ = 0.02 × 100 = 2 V.
              <br />
              V₂ = 0.02 × 200 = 4 V.
              <br />
              V₃ = 0.02 × 300 = 6 V.
            </p>
            <p>
              <strong>Step 4 — sanity check.</strong> The voltages should add up to the supply.
              2 + 4 + 6 = 12 V ✓. The biggest resistor takes the biggest share of the voltage,
              the smallest takes the smallest. Looks right.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The voltage divider rule</ContentEyebrow>

          <ConceptBlock
            title="Vx = Vs × Rx ÷ Rt — the shortcut"
            plainEnglish="Each resistor’s share of the supply equals its own resistance divided by the total resistance, times the supply."
          >
            <p>
              The voltage divider rule lets you skip the current calculation and find the
              voltage across any one resistor directly. It is just Ohm’s law in disguise — but
              when you only need one voltage, it saves a step.
            </p>
            <p>
              <strong>Worked example.</strong> 24 V supply, R₁ = 150 Ω, R₂ = 450 Ω in series.
              Find V₂.
            </p>
            <p>
              Rt = 150 + 450 = 600 Ω.
              <br />
              V₂ = Vs × R₂ ÷ Rt = 24 × 450 ÷ 600 = 18 V.
              <br />
              Check by working out V₁ as well: V₁ = 24 × 150 ÷ 600 = 6 V. Add them: 6 + 18 =
              24 V ✓.
            </p>
            <p>
              The 450 Ω resistor is three times the 150 Ω one, so it takes three times the
              voltage. That ratio holds for every series circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Voltage divider, end to end — from textbook to control panel"
            plainEnglish="Two resistors in series across a supply make a divider. The voltage at the join depends on the ratio of the two resistors. Change one resistor and you change the voltage at the join — that’s how loads of sensors work."
            onSite="Spot a divider on a UFH controller, a thermostat, an LDR daylight switch, a fuel-gauge sender. Two-wire sensor that changes resistance with temperature, light or level — chances are it’s sat in a divider."
          >
            <p>
              <strong>Step one — the textbook case.</strong> A 12 V supply, R₁ = 4 Ω at the
              top, R₂ = 8 Ω at the bottom, in series across the supply. Find the voltage at the
              middle (across R₂).
            </p>
            <p>
              Rt = 4 + 8 = 12 Ω.
              <br />
              V₂ = Vs × R₂ ÷ Rt = 12 × 8 ÷ 12 = 8 V.
              <br />
              V₁ = 12 × 4 ÷ 12 = 4 V.
              <br />
              Check: 4 + 8 = 12 V ✓. The 8 Ω resistor is twice the 4 Ω one, so it takes twice
              the voltage.
            </p>
            <p>
              <strong>Step two — the real-world version.</strong> An underfloor heating
              controller has a thermistor (a resistor that changes value with temperature) in
              series with a fixed reference resistor across the controller’s 5 V rail. The
              controller measures the voltage at the join — that voltage IS the temperature
              reading.
            </p>
            <p>
              Cold floor: thermistor resistance is high → it takes most of the 5 V → the join
              sits near 0 V. Warm floor: thermistor resistance drops → it takes less of the
              5 V → the join voltage rises. The microcontroller reads that swinging voltage and
              works out the temperature. Same maths as the textbook example, doing real work.
            </p>
            <p>
              <strong>Step three — the dimmer.</strong> A potentiometer is just a divider you
              can adjust by hand. The wiper slides along the resistive track, changing the
              ratio between the top half and the bottom half. A rotary dimmer, a volume knob, a
              joystick axis — all variable voltage dividers. Same Vx = Vs × Rx ÷ Rt rule, just
              with one of the Rs being a moving contact.
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
              Kirchhoff’s voltage law (KVL) says: around any closed loop, the sum of voltage
              rises (from sources) equals the sum of voltage drops (across components). For a
              simple series circuit, that boils down to: V₁ + V₂ + V₃ + … = Vs.
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
              Think of the supply as the bank putting money in. Every resistor drop is a
              withdrawal. Walk all the way round the loop and you should be back to zero —
              the EMF you started with all gets used up by the time you’re back at the start.
              No volts left over, no volts unaccounted for.
            </p>
            <p>
              <strong>Worked example.</strong> 12 V battery feeding three resistors in series.
              R₁ drops 2 V, R₂ drops 4 V, R₃ drops 6 V.
            </p>
            <p>
              Add the drops: 2 + 4 + 6 = 12 V. That equals the supply, so the books balance.
              <br />
              Or written as KVL proper: +12 − 2 − 4 − 6 = 0. The +12 is the rise across the
              battery, the negatives are the drops across each resistor. Walk the loop, finish
              at zero.
            </p>
            <p>
              That’s why the rule is a sanity check: if your three measured drops add to 11 V
              on a 12 V supply, you’ve either misread one or there’s a fourth drop you missed
              (a connector, a length of cable, a dirty terminal).
            </p>
          </ConceptBlock>

          <KirchhoffVoltageLoop caption="Battery rises balance the resistor drops. Anywhere round the loop, the voltages sum to zero." />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 525 / Appendix 4 Table 4Ab (voltage drop in consumers’ installations)"
            clause="In ELV lighting installations, the voltage drop between the transformer and the furthest luminaire shall not exceed 5 % of the nominal voltage of the ELV installation in order to be deemed to comply with Section 525 of BS 7671."
            meaning={
              <>
                Voltage drop along a cable is a real-world series circuit at work. The cable’s
                resistance is in series with the load. Section 525 sets limits — typically 3 %
                for lighting and 5 % for other uses on LV, with the 5 % rule above for ELV
                lighting. Same maths you’ve used in the worked examples, just applied to long
                cable runs.
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
              Old-style Christmas-tree fairy lights were the textbook example — fifty bulbs in
              series across the supply, one bulb blows open, the whole string goes dark. Modern
              LED strings get round it with little shunt diodes that short out a failed bulb,
              or by wiring the string in parallel sets. Same problem, fixed in hardware.
            </p>
            <p>
              The same thing used to plague festoon lighting on building sites. One lamp gets
              a knock, the filament breaks, every lamp from that point on the run goes out.
              Apprentices got sent up the ladder testing every bulb until they found the open
              one.
            </p>
            <p>
              <strong>Where it really matters — the CPC.</strong> The circuit protective
              conductor (the earth wire) running back to the MET is, electrically, a series
              path from the appliance through every connection back to the main earthing
              terminal. Break that path anywhere — a loose terminal at a JB, a snapped
              conductor inside a flex, a missing earth at a socket — and the earth-fault loop
              is gone. The whole protective system downstream of that break stops working,
              even though the lights still come on. (BS 7671 543 sets out the requirements for
              protective conductor continuity for exactly this reason.)
            </p>
            <p>
              <strong>The diagnostic insight:</strong> if everything past point X is dead but
              everything before it works, you’ve got a series break upstream of the first dead
              load. Don’t start at the consumer unit and work down — start at the boundary
              between alive and dead, and look for the open circuit there.
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
                You wire two 12 V LED strips in series across a 12 V supply, expecting both to
                run normally. Instead they both glow at half brightness. You think the supply
                is faulty.
              </>
            }
            doInstead={
              <>
                In series, the supply DIVIDES between the loads. Two 12 V loads in series need
                a 24 V supply between them. Each load only ever sees the share that its
                resistance dictates. If both should run on 12 V, wire them in parallel, not
                series.
              </>
            }
          />

          <CommonMistake
            title="The divider works on paper but collapses when loaded"
            whatHappens={
              <>
                You want a 6 V feed for a small bell push from a 12 V supply, so you stick a
                pair of equal resistors in series and tap off the middle. With nothing connected
                the meter reads a clean 6 V. You wire a dimmer or a coil onto that mid-point and
                the voltage drops to half a volt. You scratch your head — the divider rule said
                12 × R ÷ (R + R) = 6 V, so where did it go?
              </>
            }
            doInstead={
              <>
                A divider only behaves while nothing is drawing real current off the mid-point.
                The moment a load hangs off the join, the load sits in PARALLEL with the bottom
                resistor and pulls the equivalent resistance way down — so the top resistor
                steals most of the supply and your tap-off collapses. Dividers are fine for
                sensing (high-impedance ADCs, op-amp inputs) but useless for switching real
                loads. For a load, use a contactor, a relay or a proper regulator — not a
                series resistor.
              </>
            }
          />

          <Scenario
            title="Why the bedside lamps both went off when one bulb blew"
            situation={
              <>
                A homeowner has wired two table lamps off a single twin socket using a
                pluggable adapter. Both lamps were working fine. One bulb blew, and the second
                lamp went out at the same instant. The homeowner thinks both bulbs failed.
              </>
            }
            whatToDo={
              <>
                You spot they’re wired in series — single line out of the adapter, through one
                lamp, then on to the other. Replace the failed bulb and both will work again.
                Better still, recommend rewiring properly so each lamp runs in parallel from
                the supply, with its own 230 V across it.
              </>
            }
            whyItMatters={
              <>
                A series fault doesn’t isolate to the failed component — it kills the whole
                chain. That is why almost every modern lighting / socket circuit uses parallel
                wiring (BS 7671 Reg 314.1 — circuits divided to limit inconvenience).
              </>
            }
          />

          <VideoCard
            url={videos.seriesCircuits.url}
            title={videos.seriesCircuits.title}
            channel={videos.seriesCircuits.channel}
            duration={videos.seriesCircuits.duration}
            topic={videos.seriesCircuits.topic}
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

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Ohm’s law made simple
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Parallel circuits — current and voltage
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
