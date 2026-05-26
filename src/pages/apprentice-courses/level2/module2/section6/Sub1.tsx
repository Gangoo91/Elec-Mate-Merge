/**
 * Module 2 · Section 6 · Subsection 1
 * Unit 202 LO6 — AC 6.1 + 6.2
 * Why electronics matters on site + the resistor as a component.
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
import { ResistorSymbol } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Why electronics matters on site + the resistor (6.1) | Level 2 Module 2.6.1 | Elec-Mate';
const DESCRIPTION =
  'Every modern installation has electronics inside it — RCDs, AFDDs, smart sockets, EV chargers, LED drivers. Start here: why an electrician needs the basics, and the humble resistor.';

const checks = [
  {
    id: 'electronics-vs-electrical',
    question: 'What is the practical difference between electrical and electronic kit on site?',
    options: [
      'Electrical runs on AC, electronic runs on DC — that’s the whole story.',
      'Electrical moves big power; electronic uses small signals to control or sense.',
      'Electrical work is a trade; electronic work is just IT.',
      'Electronic kit is always low voltage and doesn’t need testing.',
    ],
    correctIndex: 1,
    explanation:
      'Electrical = moving power to do work (run a motor, heat a kettle). Electronic = small signals that sense, switch or control. Inside a smart RCBO you’ve got both — the contacts switch the load, the electronics decide when.',
  },
  {
    id: 'resistor-colour-bands',
    question: 'A resistor has bands brown-black-red-gold. What’s the value and tolerance?',
    options: [
      '1 kΩ ± 5%',
      '100 Ω ± 5%',
      '10 Ω ± 5%',
      '10 kΩ ± 10%',
    ],
    correctIndex: 0,
    explanation:
      'Brown=1, black=0, red=×100, gold=±5%. So 10 × 100 = 1,000 Ω = 1 kΩ, ±5%. The tolerance band tells you the actual value sits between 950 Ω and 1,050 Ω.',
  },
  {
    id: 'series-parallel-combine',
    question: 'Two 10 Ω resistors in parallel give what total resistance?',
    options: [
      '5 Ω',
      '10 Ω',
      '20 Ω',
      '0 Ω',
    ],
    correctIndex: 0,
    explanation:
      'Two equal resistors in parallel halve. R = (R1 × R2) / (R1 + R2) = 100/20 = 5 Ω. Series adds, parallel reduces — same rule that runs through every circuit on Module 2.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why does a Level 2 electrician need to know basic electronics?',
    options: [
      'Personalisation (it is all my fault), pervasiveness (it will affect everything), and permanence (it will last forever)',
      'Because every modern board, smart switch, RCD, AFDD and EV charger has electronics inside that you’ll have to fault-find or replace.',
      'The employer, self-employed person, or person in control of the premises where work is carried out',
      'Energise the install in a controlled manner — main switch on, RCBOs on one at a time — then proceed to live testing (Ze, Zs, RCD operation, prospective fault current).',
    ],
    correctAnswer: 1,
    explanation:
      'Pull the cover off any consumer unit fitted in the last few years and you’ll see chips, capacitors and tiny relays. You won’t design them, but you need to know what each part does so you can swap or fault-find safely.',
  },
  {
    id: 2,
    question: 'What does a resistor do in a circuit?',
    options: [
      'Any person who may need assistance to evacuate the building',
      'Swap conductors into correct terminals',
      'Limits current and drops voltage in a controlled way.',
      'Light levels, control functionality, and energy consumption',
    ],
    correctAnswer: 2,
    explanation:
      'A resistor opposes current flow. Push current through it and you get a voltage drop (V = IR) and a bit of heat. That’s how LED drivers limit current to the LED, how voltage dividers feed sensors, and how every test instrument scales its inputs.',
  },
  {
    id: 3,
    question: 'What’s the unit of resistance and its symbol?',
    options: [
      'Ampere (A)',
      'Volt (V)',
      'Watt (W)',
      'Ohm (Ω)',
    ],
    correctAnswer: 3,
    explanation:
      'Ohms, written with the Greek capital omega Ω. 1 Ω = the resistance that drops 1 V when 1 A flows. Same Ohm’s law from LO4 — it doesn’t change just because the resistor is a component you can hold.',
  },
  {
    id: 4,
    question: 'A 4-band resistor reads yellow-violet-orange-gold. What is it?',
    options: [
      '47 kΩ ± 5%',
      '4.7 kΩ ± 5%',
      '470 kΩ ± 5%',
      '4.7 MΩ ± 5%',
    ],
    correctAnswer: 0,
    explanation:
      'Yellow=4, violet=7, orange=×1,000, gold=±5%. So 47 × 1,000 = 47,000 Ω = 47 kΩ. Same code on every resistor in every kit you’ll ever open.',
  },
  {
    id: 5,
    question: 'Three resistors in series: 100 Ω, 220 Ω, 330 Ω. Total resistance?',
    options: [
      '220 Ω',
      '650 Ω',
      '100 Ω',
      '550 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Series resistance just adds. 100 + 220 + 330 = 650 Ω. Same rule as series circuits in Section 4 — only difference is now you’re adding component-level values rather than cable resistances.',
  },
  {
    id: 6,
    question: 'Why are most resistors specified with a power rating (e.g. 0.25 W, 0.5 W, 1 W)?',
    options: [
      'Dim lights, especially at the end of the circuit',
      'To record what was visually inspected and the outcome',
      'To stop them overheating and going open-circuit when current flows.',
      'Reporting of Injuries, Deaths and Dangerous Occurrences Regulations',
    ],
    correctAnswer: 2,
    explanation:
      'Resistance × current² = heat. Run too much current through an undersized resistor and it cooks. On a board you’ll often see one charred resistor — that’s usually a clue something else has failed and overdriven it.',
  },
  {
    id: 7,
    question: 'What does “tolerance” mean on a resistor?',
    options: [
      'A hard-wired communication system or intrinsically safe radio',
      'Generic Emergency Evacuation Plan — a template plan for visitors or occasional users',
      'Only use reply-all when your response is genuinely relevant to everyone on the thread',
      'How much the actual value can vary either side of the marked value.',
    ],
    correctAnswer: 3,
    explanation:
      'A 100 Ω ±5% resistor will measure anywhere between 95 Ω and 105 Ω and still be in spec. That’s why two boards with identical resistors can read slightly differently on a meter.',
  },
  {
    id: 8,
    question: 'On a smart RCBO PCB, you see a resistor with a burnt mark. What’s the right next step?',
    options: [
      'Quarantine the device, order a replacement RCBO, and treat it as a failed component (not a repair).',
      'A visitor sign-in system, escorted evacuation, and checking the visitor log at the assembly point',
      'The tower must be immediately taken out of use and reduced to a compliant configuration or dismantled entirely',
      'Allowing multiple people to apply their own padlocks to one isolation point',
    ],
    correctAnswer: 0,
    explanation:
      'You don’t repair safety-critical devices on the PCB. The burn means something else has failed — fixing the symptom can leave the actual fault live. Replace the device and report it to the manufacturer.',
  },
];

const faqs = [
  {
    question: 'Why do I need to learn this if I’m never going to design electronics?',
    answer:
      'Because the kit you install IS electronics. Smart RCBOs, AFDDs, EV chargers, LED drivers, occupancy sensors, smart meters — all of it. You won’t draw the schematics, but you’ll have to fault-find replacements, read the manufacturer’s tech note, and explain to the customer why one device won’t talk to another. The basics give you the vocabulary.',
  },
  {
    question: 'Where am I most likely to see resistors on site?',
    answer:
      'On nearly every PCB you ever open. Inside an LED downlight driver they limit current. Inside a smart switch they form voltage dividers feeding the chip. Inside test instruments they scale your meter’s inputs. You won’t pick them by colour code on the van, but recognising one when a customer’s board is open in front of you is part of looking competent.',
  },
  {
    question: 'What’s the difference between a fixed resistor and a variable resistor (potentiometer)?',
    answer:
      'Fixed = one value, soldered in. Variable (potentiometer or “pot”) has a wiper you can turn — you’ll see them as the volume knob inside an old amplifier or as the dimmer adjustment inside a wall plate. Same component, different mechanical packaging.',
  },
  {
    question: 'Do I need to memorise the colour code for the exam?',
    answer:
      'Yes — City & Guilds expect you to recognise the four-band code and read a value when given the colours. See the dedicated ConceptBlock above ("The colour code in one rude sentence") for the BB ROY mnemonic and a worked example. Once it’s in your head it stays there for life.',
  },
  {
    question: 'Are component values the same as cable resistance?',
    answer:
      'Same physics, different scale. A 1 mm² cable might be 0.018 Ω/m. A resistor on a board is sized in ohms or kilo-ohms — thousands of times bigger. The maths is identical (V = IR, series adds, parallel reduces) but the application is different. One carries load current, one shapes a small signal.',
  },
  {
    question: 'Why do I see resistors marked SMD or “surface mount” inside modern kit?',
    answer:
      'Surface-mount devices are the tiny black or beige rectangles soldered straight onto the board, usually with three numbers stamped on top instead of colour bands. The numbers work the same way — first two are digits, third is the multiplier. So “472” means 47 × 10² = 4.7 kΩ. You don’t solder these on site, but recognising them helps when you’re explaining a swap-out.',
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 1"
            title="Why electronics matters on site + the resistor"
            description="Every modern board, every AFDD, every smart switch has electronics inside. You don’t need to design them — you need to recognise the parts and know what each one does. Start with the resistor."
            tone="emerald"
          />

          <TLDR
            points={[
              'If you’ve fitted anything made after about 2010, you’ve installed electronics — even a “plain” RCBO has a chip, a coil and a few resistors inside.',
              'A resistor opposes current. Same Ohm’s law as Section 4 (V = IR), now applied to a component you can hold between your fingers.',
              'Read the colour bands once and you’ll read every resistor on every board for the rest of your career.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why a Level 2 electrician needs a working knowledge of electronic components.',
              'Tell the difference between electrical (power) and electronic (signal/control) work.',
              'Identify a resistor on a PCB and read its value from the four-band colour code.',
              'Apply Ohm’s law to a single resistor — calculate V, I or R given the other two.',
              'Combine resistors in series and parallel using the standard formulas.',
              'Recognise where resistors live in real on-site kit (LED drivers, smart relays, test instruments).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="Walk into any consumer unit fitted in the last decade — it’s a circuit board with breakers attached"
            plainEnglish="The “simple” switchgear era is over. Even the cheapest new RCBO has electronics inside making the trip decision."
            onSite="When a customer’s smart RCBO trips repeatedly and you can’t see a fault, the answer is rarely “a loose connection”. It’s usually the electronics seeing something the old MCB couldn’t — a leakage current, an arc signature, or a drift in the supply."
          >
            <p>
              Up to about 2010, most of the kit a Level 2 apprentice met on site was electromechanical
              — coils, contacts, springs, levers. You could open a contactor and see exactly what
              was switching what. From around BS 7671 Amendment 3 onwards (and especially since
              AFDDs, smart RCBOs and EV chargers became mainstream), nearly every protective device
              has a small PCB inside making decisions about when to open the contacts.
            </p>
            <p>
              You won’t design any of this kit, and you won’t repair the boards. But when a
              customer’s AFDD keeps tripping, when a smart switch refuses to pair, when an EV
              charger throws an obscure fault code — the engineer who can talk about resistors,
              capacitors, diodes and relays in plain English is the one who fixes the job. The
              one who can’t calls the manufacturer and waits.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Electrical vs electronic — same physics, different job"
            plainEnglish="Electrical = move power so something does work. Electronic = small signals that sense, switch or decide."
          >
            <p>
              Electrical engineering is about moving real power — kilowatts of it — into motors,
              heating elements, lamps and sockets. The conductors are big, the voltages are mains
              level, the protective devices break fault currents in the kiloamp range.
            </p>
            <p>
              Electronic engineering uses tiny currents (often microamps) and tiny voltages (often
              3.3 V or 5 V on a chip) to sense things, decide things and switch larger circuits on
              and off. The two live side by side inside almost every modern device. A smart RCBO
              has the electronic side watching the leakage current and the electrical side
              breaking a 230 V circuit when it tells it to.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The resistor — your first component</ContentEyebrow>

          <ConceptBlock
            title="What it actually does"
            onSite="Inside an LED downlight driver, a resistor in series with the LED limits the current to the few tens of milliamps the chip is rated for. Without it, the LED flashes once and dies."
          >
            <p>
              A resistor opposes the flow of current. Push a voltage across it and a current flows;
              the bigger the resistance, the smaller the current. Same Ohm’s law you saw in
              Section 4:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">V = I × R</p>
            <p>
              In real circuits resistors do four main jobs: <strong>limit current</strong> (so a
              delicate component doesn’t cook), <strong>drop voltage</strong> in a controlled way
              (so a 5 V chip can read a 12 V signal safely), <strong>divide voltage</strong> (two
              resistors in series let you tap a precise fraction of a supply), and{' '}
              <strong>turn current into heat</strong> (deliberately, in heating elements;
              accidentally, when something fails).
            </p>
            <div className="flex justify-center pt-2">
              <ResistorSymbol label="Fixed resistor (IEC symbol)" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The colour code in one rude sentence"
            plainEnglish="Memorise one daft phrase and you’ve got the digit-to-colour map for life."
            onSite="Every electrician on site who can still read a resistor in their fifties learnt it the same way — one mnemonic, one afternoon, never forgotten."
          >
            <p>
              Old-school resistors carry coloured bands instead of printed numbers. To read the
              value you have to remember which colour means which digit. The trick is a daft phrase
              the whole trade has used for decades:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">
              BB ROY of Great Britain Very Good Wife
            </p>
            <p>
              Each letter is a colour, and each colour is a digit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B</strong> — Black — 0</li>
              <li><strong>B</strong> — Brown — 1</li>
              <li><strong>R</strong> — Red — 2</li>
              <li><strong>O</strong> — Orange — 3</li>
              <li><strong>Y</strong> — Yellow — 4</li>
              <li><strong>G</strong> — Green — 5</li>
              <li><strong>B</strong> — Blue — 6</li>
              <li><strong>V</strong> — Violet — 7</li>
              <li><strong>G</strong> — Grey — 8</li>
              <li><strong>W</strong> — White — 9</li>
            </ul>
            <p>
              Worked example with a real four-band part — <em>brown, black, red, gold</em>. Run it
              through the mnemonic: brown = 1, black = 0, red = ×100, gold = ±5%. So the value is
              10 × 100 = 1,000 Ω = <strong>1 kΩ ±5%</strong>. The actual resistance will measure
              somewhere between 950 Ω and 1,050 Ω on a meter.
            </p>
            <p>
              Spend ten minutes saying it out loud once. Once it’s in your head it stays there for
              life — and you’ll be the apprentice who can read a resistor without reaching for the
              phone.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading the colour code"
            plainEnglish="Four bands. First two = digits. Third = multiplier. Fourth = tolerance."
          >
            <p>
              Most through-hole resistors carry four coloured bands. You read them with the gold or
              silver tolerance band on the right.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bands 1 + 2</strong> — first two significant digits. Black 0, Brown 1, Red 2,
                Orange 3, Yellow 4, Green 5, Blue 6, Violet 7, Grey 8, White 9.
              </li>
              <li>
                <strong>Band 3</strong> — multiplier (×1, ×10, ×100, ×1k, ×10k…). Same
                colour-to-number scheme as the digits.
              </li>
              <li>
                <strong>Band 4</strong> — tolerance. Gold = ±5%, silver = ±10%, no band = ±20%.
                Tighter tolerances (brown ±1%, red ±2%) live on five-band precision parts.
              </li>
            </ul>
            <p>
              Worked example: <em>red, red, brown, gold</em> = 2, 2, ×10, ±5% = 220 Ω ±5%. The
              actual value sits somewhere between 209 Ω and 231 Ω.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60617 / IEC 60417 — Graphical symbols for diagrams"
            clause="Standard graphical symbols are used in electrotechnical documentation to represent components, equipment and circuit elements. The rectangular box symbol denotes a resistor; the zig-zag form remains acceptable in older drawings but the rectangle is preferred in current standards."
            meaning={
              <>
                Every UK schematic you read in 2026 uses the IEC rectangle for a resistor. American
                schematics still use the old zig-zag. Same component, two drawings — recognise both
                and you won’t freeze when you open a manual translated from the wrong continent.
              </>
            }
            cite="Verbatim wording paraphrased from BS EN 60617 — see BSI for the full symbol library."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 332.1 (EMC) (paraphrased)"
            clause="All electrical equipment forming part of an electrical installation shall meet the appropriate electromagnetic compatibility (EMC) requirements and shall be in accordance with the relevant EMC standard. Equipment not meeting EMC standards shall not be used in installations."
            meaning={
              <>
                Every electronic device you fit (including the ones full of resistors and small
                transistors) has to be EMC compliant — meaning it doesn’t spit electromagnetic
                noise into the supply or the air. The CE/UKCA mark on the kit is the manufacturer
                saying it meets the BS EN 61000 series. If you fit unmarked or grey-import kit and
                it interferes with the customer’s smart meter or radio, that’s on you.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 3, Chapter 33, Regulation 332.1 and Section 444 for the full EMC guidance."
          />

          <SectionRule />

          <ContentEyebrow>Series and parallel — same rules, smaller scale</ContentEyebrow>

          <ConceptBlock
            title="Series adds, parallel reduces"
            onSite="A 12 V LED strip running off a 24 V supply needs roughly half the voltage dropped somewhere. A resistor in series with the strip does that — and then the maths tells you how warm it’ll get."
          >
            <p>
              Resistors in <strong>series</strong> just add up:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">
              R total = R₁ + R₂ + R₃ …
            </p>
            <p>
              Resistors in <strong>parallel</strong> always give a total smaller than the smallest
              one in the bunch. For two:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">
              R total = (R₁ × R₂) / (R₁ + R₂)
            </p>
            <p>
              For more than two, use the reciprocal form: 1/R = 1/R₁ + 1/R₂ + 1/R₃ … then flip
              the answer. Two equal resistors in parallel always halve. Three equal ones third.
              Quick mental check before you reach for the calculator.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Power rating — the bit apprentices forget"
            plainEnglish="A resistor can handle so much heat. Push more through and it cooks."
          >
            <p>
              Every resistor has a power rating — usually printed on the body or quoted in the
              datasheet. Common values for through-hole parts are 0.25 W, 0.5 W and 1 W. The power
              dissipated is:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">
              P = I² × R   or   P = V² / R
            </p>
            <p>
              Worked example: 100 Ω resistor with 0.1 A through it. P = 0.1² × 100 = 1 W. A
              quarter-watt part will char black inside seconds. A 1 W or 2 W part will run warm and
              live a long life. When you spot a charred resistor on a board, the resistor isn’t
              usually the original fault — it’s the symptom of something downstream pulling more
              current than the design intended.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.resistors.url}
            title={videos.resistors.title}
            channel={videos.resistors.channel}
            duration={videos.resistors.duration}
            topic="Resistors · Unit 202 LO6.1"
            caption="Optional deeper dive — Engineering Mindset walks through the colour code, the maths and the real-world packaging in about 10 minutes. Worth a watch on the bus."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Real on-site applications</ContentEyebrow>

          <ConceptBlock
            title="Where you actually meet resistors"
            onSite="Take the cover off any cheap LED downlight driver. Count the resistors. There’ll be at least three or four — current limit, voltage divider, feedback loop. Same architecture in any branded part."
          >
            <p>
              The resistor is the most common component in electronics, full stop. Every PCB has
              dozens. The ones you’re likely to encounter on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LED drivers</strong> — current-limiting resistor in series with the LED
                string keeps the current at the rated value.
              </li>
              <li>
                <strong>Smart switches and dimmers</strong> — voltage dividers feed the on-board chip
                a small, safe sample of mains voltage so it can detect zero-crossings.
              </li>
              <li>
                <strong>Test instruments</strong> — the input divider on every multimeter and clamp
                meter is built from precision resistors. That’s why dropping a meter often kills
                its calibration.
              </li>
              <li>
                <strong>Heating elements</strong> — your kettle, immersion, towel rail. A resistor
                turning electrical energy into heat on purpose, sized for hundreds or thousands of
                watts.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating a burnt resistor as the fault, not the symptom"
            whatHappens={
              <>
                Customer’s LED downlight driver dies. You open it, see a black resistor, source
                a replacement, solder it in, plug it back in. Three days later it’s dead again.
                Now the customer thinks you’ve botched it.
              </>
            }
            doInstead={
              <>
                A charred resistor on a safety-critical or factory-built PCB is almost always
                downstream of the actual failure. Replace the whole sealed unit (driver, RCBO,
                smart switch — whatever it is) and recycle the dead one. We don’t repair
                manufacturer-sealed boards on site, and we don’t replace component-level parts
                on a protective device.
              </>
            }
          />

          <Scenario
            title="Customer asks why their LED downlights flicker on the cheapest dimmer"
            situation={
              <>
                You’ve fitted a row of dimmable LED downlights on what the customer thought was a
                “proper” dimmer they bought online. They flicker. They claim “the lights are
                broken” and want them swapped.
              </>
            }
            whatToDo={
              <>
                Explain it in component terms. The dimmer relies on the load looking like a
                resistive heater. LEDs aren’t resistive — there’s a small driver inside each
                fitting full of resistors and capacitors that confuses the dimmer’s timing
                circuit. Fit a proper trailing-edge LED dimmer rated for the actual load. Lights
                aren’t broken; the dimmer was the wrong tool.
              </>
            }
            whyItMatters={
              <>
                Knowing what’s inside the fitting (a small electronic driver, not a bare bulb) lets
                you give the customer a real answer instead of replacing kit until something works.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.11 (Good workmanship and proper materials)"
            clause="Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers’ instructions."
            meaning={
              <>
                Even at apprentice level, the rule is: don’t component-repair safety devices.
                Reg 134.11 ties you to the manufacturer’s instructions for every piece of kit
                you fit — and no manufacturer of an RCBO, AFDD or smart switch publishes
                "instructions" for desoldering a resistor on the PCB. Pull a component off and
                resolder a new one and you’ve gone outside the manufacturer’s assembly — the
                device’s third-party certification (BS EN 61009, BS EN 62606) no longer applies.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.11."
          />

          <ConceptBlock
            title="Where this all lands — Subsection 6.6"
            plainEnglish="The resistor isn’t just a textbook exercise — it’s the building block underneath every protective device on a modern board."
          >
            <p>
              The resistor concepts here will reappear in every later Sub — but they REALLY come
              together in Subsection 6.6, where you’ll see resistors inside the smart RCBO, AFDD
              and SPD circuits on a real consumer unit. Same colour code, same series/parallel
              maths, same power rating logic — applied to the actual kit you’ll be opening on the
              tools.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Modern installations are full of electronics — RCDs, AFDDs, EV chargers, smart switches all have PCBs inside.',
              'Electrical work moves real power; electronic work uses small signals to sense, switch and decide. Both live inside the same kit.',
              'A resistor opposes current. Same Ohm’s law you already know — V = IR, just applied to a discrete component.',
              'Read the four-band colour code with the gold band on the right: digit, digit, multiplier, tolerance.',
              'Series resistors add. Parallel resistors always come out smaller than the smallest one in the group.',
              'Don’t repair component-level on safety-critical PCBs — replace the whole device and feed back to the manufacturer.',
            ]}
          />

          <Quiz title="Resistors and on-site electronics — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section5/5-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.6 Sine waves — peak, RMS, frequency
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Diodes and rectifiers
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
