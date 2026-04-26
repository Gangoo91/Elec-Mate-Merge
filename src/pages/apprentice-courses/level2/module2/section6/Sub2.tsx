/**
 * Module 2 · Section 6 · Subsection 2
 * Unit 202 LO6 — AC 6.1 + 6.2
 * Diodes and rectifiers — half-wave, full-wave, LEDs, Zeners, on-site uses.
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
import {
  DiodeSymbol,
  LEDSymbol,
  ZenerDiodeSymbol,
  BridgeRectifier,
  HalfWaveRectified,
  FullWaveRectified,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Diodes and rectifiers (6.1/6.2) | Level 2 Module 2.6.2 | Elec-Mate';
const DESCRIPTION =
  'Diodes pass current one way only. Rectifiers turn AC into DC. Inside every charger, EV unit, smart device and AFDD there’s a stack of diodes doing exactly that.';

const checks = [
  {
    id: 'diode-direction',
    question: 'A standard silicon diode is forward-biased. Roughly what voltage drops across it?',
    options: ['0 V', '0.3 V', '0.7 V', '1.5 V'],
    correctIndex: 2,
    explanation:
      'Silicon diodes drop about 0.7 V when conducting forward. Germanium drops about 0.3 V (rare on modern boards). LEDs drop more — typically 1.8–3.4 V depending on colour.',
  },
  {
    id: 'rectifier-output',
    question: 'A bridge rectifier feeds a load from a 230 V AC supply. What does the load see (before smoothing)?',
    options: [
      'Steady DC at 230 V.',
      'AC at 230 V (unchanged).',
      'Pulsating DC — both halves of the AC sine wave folded above the zero line.',
      'Zero — diodes block both directions.',
    ],
    correctIndex: 2,
    explanation:
      'Four diodes in a bridge route current through the load in the same direction on both halves of the AC cycle. The output is pulsating DC (a series of humps). A smoothing capacitor is then needed to give a near-steady DC voltage.',
  },
  {
    id: 'led-protection',
    question: 'Why does an LED almost always need a series resistor (or a current-limited driver)?',
    options: [
      'To make it brighter.',
      'Because the LED itself doesn’t limit current — without something in series, it just self-destructs.',
      'BS 7671 demands it.',
      'To filter out radio interference.',
    ],
    correctIndex: 1,
    explanation:
      'An LED is essentially a low-resistance device once it conducts. Without a resistor or a constant-current driver to limit the current, it will pull as much as the supply gives — and burn out fast.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the basic job of a diode?',
    options: [
      'Stores energy magnetically.',
      'Allows current to flow in one direction only.',
      'Steps voltage up or down.',
      'Stores charge between two plates.',
    ],
    correctAnswer: 1,
    explanation:
      'A diode is the simplest one-way valve in electronics. Forward-biased, it conducts (with about a 0.7 V drop). Reverse-biased, it blocks until you exceed its reverse breakdown voltage.',
  },
  {
    id: 2,
    question: 'On a diode symbol, which way does the arrow point?',
    options: [
      'From cathode to anode.',
      'From anode (positive) to cathode (negative) — the direction conventional current flows when forward-biased.',
      'It doesn’t matter.',
      'Both ways at once.',
    ],
    correctAnswer: 1,
    explanation:
      'The triangle of the symbol points from anode to cathode. The bar at the cathode end is also marked on the physical component, usually as a coloured stripe. Get it the wrong way round and the diode either blocks or fails.',
  },
  {
    id: 3,
    question: 'A half-wave rectifier uses how many diodes?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctAnswer: 0,
    explanation:
      'One diode in series with the load gives half-wave rectification — only the positive half-cycle of the AC reaches the load. Cheap, simple, but inefficient and very “lumpy” DC.',
  },
  {
    id: 4,
    question: 'A full-wave (bridge) rectifier uses how many diodes?',
    options: ['One', 'Two', 'Four', 'Six'],
    correctAnswer: 2,
    explanation:
      'Four diodes in a diamond arrangement. Both halves of the AC cycle drive current through the load in the same direction. Smoother DC, twice the average voltage of half-wave for the same input.',
  },
  {
    id: 5,
    question: 'What is a Zener diode primarily used for?',
    options: [
      'Switching at high speed.',
      'Maintaining a fixed reverse voltage — used as a simple voltage reference.',
      'Generating light.',
      'Rectifying high-current AC.',
    ],
    correctAnswer: 1,
    explanation:
      'A Zener is designed to operate in reverse breakdown at a precise voltage (e.g. 5.1 V, 12 V). Once it breaks down it holds that voltage steady, which makes it useful as a reference or simple regulator.',
  },
  {
    id: 6,
    question: 'You see “1N4007” stamped on a diode. What does that tell you?',
    options: [
      'It’s a 1 W resistor.',
      'It’s a general-purpose silicon rectifier diode rated 1000 V reverse, 1 A forward — common in mains-side circuits.',
      'It’s a Zener with a 47 V breakdown.',
      'It’s an LED with a code for the colour.',
    ],
    correctAnswer: 1,
    explanation:
      '1N400x series diodes are everywhere — chargers, transformers, doorbells, the rectifier section of basic AFDDs. The “4007” suffix is the highest reverse-voltage rating in the series. Recognise the part number and you know what you’re looking at.',
  },
  {
    id: 7,
    question: 'Why is the output of a bridge rectifier usually fed into a capacitor next?',
    options: [
      'To increase the voltage.',
      'To smooth out the pulsating DC into a near-steady DC voltage for the load.',
      'To convert it back to AC.',
      'To rectify it again.',
    ],
    correctAnswer: 1,
    explanation:
      'The bridge gives pulsating DC — a series of humps with gaps at zero. A smoothing capacitor fills in the gaps by holding charge between peaks. Bigger cap = smoother DC = less ripple voltage on the load.',
  },
  {
    id: 8,
    question: 'A customer’s AFDD trips when they plug in their old upright vacuum. Likely cause?',
    options: [
      'Faulty AFDD — replace immediately.',
      'A genuine series arc — worn motor brushes in the vacuum produce small arcs whose current signature is exactly what the AFDD’s electronics are looking for.',
      'Loose neutral somewhere on the circuit.',
      'Too many lights on the same circuit.',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs use a high-speed rectifier, sampling chip and signal-analysis software to detect arc signatures. Brush-type motors produce exactly that signature legitimately. The AFDD isn’t faulty — it’s doing its job. The vacuum needs servicing or replacing.',
  },
];

const faqs = [
  {
    question: 'Where do I actually meet diodes on site?',
    answer:
      'Inside every USB charger (rectifying mains to DC), inside every LED light (the LED itself plus rectifiers in the driver), inside every EV charger (high-current rectification of the AC supply for the car’s onboard charger), and inside every AFDD and smart RCBO (a small rectifier feeding the on-board electronics). Open any one of those and you’ll see diodes — usually black cylinders with a silver band or surface-mount packages on the PCB.',
  },
  {
    question: 'What’s the difference between a rectifier diode and an LED?',
    answer:
      'Same physics — both are diodes, both pass current one way only. A rectifier diode is built to handle real current (1 A, 5 A, sometimes more) and isn’t designed to give off light. An LED is built to release energy as photons when current flows. They’re packaged differently because they do different jobs, but they share the same one-way behaviour.',
  },
  {
    question: 'Why does an LED need a “driver”?',
    answer:
      'Because mains is 230 V AC and an LED wants a small, steady DC current — typically 10–700 mA depending on the size. The driver does three jobs: rectifies AC to DC, drops the voltage to the level the LED needs, and limits the current. Without one, the LED either does nothing (reverse cycle) or explodes (forward cycle).',
  },
  {
    question: 'What does “reverse breakdown” mean and should I worry about it?',
    answer:
      'Push voltage the wrong way through a normal diode and at some point (often hundreds of volts) the diode gives up and starts conducting in reverse — usually destructively. That’s why mains diodes are rated for 1000 V or more, with a safety margin over the 230 V they’ll see. Zener diodes are different — they’re designed to break down at a precise low voltage, on purpose.',
  },
  {
    question: 'Is the silver band on a diode the anode or the cathode?',
    answer:
      'Always the cathode. Same as the symbol — the bar is the cathode side, current flows from anode (no band) to cathode (band). Get this wrong on a board and the diode just blocks instead of conducting. A swap-out test is to put your meter in diode mode and check forward voltage.',
  },
  {
    question: 'Why is full-wave rectification “better” than half-wave?',
    answer:
      'Two reasons. First, you use both halves of the AC cycle so the average DC output is roughly double what half-wave gives. Second, the gaps between pulses are half the width, which means a smaller smoothing capacitor can do the same job. Cheaper or smaller power supplies almost always use full-wave bridges for that reason.',
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 2"
            title="Diodes and rectifiers"
            description="A diode is the simplest one-way valve in electronics. Stack four of them in a bridge and you’ve got a rectifier — the heart of every charger, every LED driver, every AFDD."
            tone="emerald"
          />

          <TLDR
            points={[
              'A diode lets current through one way and blocks it the other. Silicon diodes drop about 0.7 V when conducting.',
              'A rectifier turns AC into DC. Half-wave uses one diode (lumpy output). Full-wave bridge uses four (smoother).',
              'Special diodes: LEDs convert current into light, Zeners hold a precise reverse voltage as a simple regulator.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe how a diode passes current in one direction only and identify the symbol.',
              'State the typical forward voltage drop for silicon (~0.7 V) and germanium (~0.3 V) diodes.',
              'Explain half-wave and full-wave (bridge) rectification, including why full-wave is preferred.',
              'Identify LED and Zener variants and what each is used for.',
              'Recognise rectifier circuits inside chargers, EV equipment and AFDDs on site.',
              'Explain why a smoothing capacitor usually follows a rectifier stage.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The diode itself</ContentEyebrow>

          <ConceptBlock
            title="A one-way valve for current"
            plainEnglish="Forward = on (with a small voltage drop). Reverse = off (until you push it past breakdown, which usually destroys it)."
            onSite="Every charger you’ve ever plugged in starts with a diode bridge. Open one up and the four little black cylinders inside are doing all the heavy lifting."
          >
            <p>
              A diode is built from a junction between two slightly different types of silicon (an
              N-type and a P-type). The result is a component that conducts current freely in one
              direction (forward-biased, anode positive with respect to cathode) and blocks it in
              the other (reverse-biased).
            </p>
            <p>
              When forward-biased, a silicon diode drops about <strong>0.7 V</strong> across itself
              before conducting. That number is worth remembering — it determines the output voltage
              of every rectifier you’ll meet. Germanium diodes drop about 0.3 V but are rare on
              modern kit. Schottky diodes drop around 0.3–0.5 V and are common in switch-mode power
              supplies.
            </p>
            <div className="flex justify-center pt-2">
              <DiodeSymbol label="Standard rectifier diode" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Identifying a real diode"
            onSite="Look for the silver, white or coloured band — that’s the cathode end. Same convention on every through-hole diode in every kit."
          >
            <p>
              Through-hole diodes are little glass or black cylinders with a wire coming out of each
              end. The end with the painted band is the <strong>cathode</strong>. Surface-mount
              diodes have the band marked on the package. The symbol on schematics works the same
              way — the bar is always the cathode.
            </p>
            <p>
              Common part numbers you’ll see on UK boards:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1N400x series (1N4001 to 1N4007)</strong> — general-purpose mains
                rectifiers, rated 1 A, 50 V to 1000 V reverse.
              </li>
              <li>
                <strong>1N5400 series</strong> — 3 A versions of the same family for slightly
                bigger supplies.
              </li>
              <li>
                <strong>1N5817 / 1N5819</strong> — Schottky diodes, low forward drop, used in
                switch-mode supplies.
              </li>
              <li>
                <strong>BAT41, BAT85</strong> — small-signal Schottky for fast switching.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Turning AC into DC</ContentEyebrow>

          <ConceptBlock
            title="Half-wave rectification — the simplest way"
            plainEnglish="Stick a diode in series with the load. The positive half-cycle of the AC gets through; the negative half is blocked."
          >
            <p>
              The simplest possible rectifier is one diode in series with the load. When the AC
              swings positive, the diode conducts and current reaches the load. When the AC swings
              negative, the diode blocks and the load sees nothing. The result is a pulsating DC
              that’s only “on” half the time.
            </p>
            <p>
              Half-wave is cheap and dirty — it wastes half the supply, gives a low average DC
              voltage, and needs a much bigger smoothing capacitor to clean up the gaps. You’ll
              still see it inside very low-cost LED candle bulbs and battery chargers where a few
              flickers don’t matter, but it’s rare on serious kit.
            </p>
            <HalfWaveRectified />
          </ConceptBlock>

          <ConceptBlock
            title="Full-wave (bridge) rectification — the standard"
            plainEnglish="Four diodes in a diamond. Both halves of the AC cycle reach the load in the same direction."
            onSite="The bridge is the bit you find inside every USB charger, every LED driver, every doorbell transformer secondary, and every AFDD/smart-RCBO power supply."
          >
            <p>
              A bridge rectifier uses four diodes arranged so that whichever way the AC swings,
              current always flows through the load in the same direction. The output is still
              pulsating DC, but now there’s a hump for every half-cycle (so 100 humps per second
              from a 50 Hz mains) — twice as often as half-wave, with no gaps.
            </p>
            <p>
              That’s why full-wave rectification is the standard:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Average DC output is roughly double what half-wave gives for the same AC input.
              </li>
              <li>Pulses are twice as frequent, so a much smaller smoothing capacitor will do.</li>
              <li>
                The supply transformer (if there is one) gets used for both halves of the cycle —
                no wasted capacity.
              </li>
            </ul>
            <p>
              Look at the diagram. Top half-cycle of the AC input: current flows through D1 → load
              → D3 back to source. Bottom half-cycle: D2 and D4 take over — but the LOAD still
              sees current flowing the same direction. That’s why a bridge rectifier turns AC into
              pulsing DC.
            </p>
            <BridgeRectifier />
            <FullWaveRectified />
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs) (paraphrased)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents. Arc fault detection devices used to meet the requirements of this Regulation shall conform to BS EN 62606."
            meaning={
              <>
                Every AFDD you fit must be a BS EN 62606 product. Inside one of those, a small
                bridge rectifier feeds a microcontroller which samples the current waveform thousands
                of times a second, looking for the high-frequency hash that an arc fault produces.
                Diodes are the very first stage — they make the AFDD’s electronics possible.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7 for the full text."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Special diodes you’ll meet</ContentEyebrow>

          <ConceptBlock
            title="LEDs — light-emitting diodes"
            onSite="An LED is a diode first, a light source second. Get the polarity wrong and it just won’t work; push too much current through it and it dies in seconds."
          >
            <p>
              An LED is a diode designed so that the energy released when current flows comes out as
              photons rather than heat. The colour depends on the semiconductor material — red and
              infrared LEDs use one mix, blue and white LEDs use another (white LEDs are usually
              blue LEDs with a yellow phosphor coating).
            </p>
            <p>
              Forward voltage drop is higher than a regular silicon diode and depends on colour:
              red ~1.8 V, green ~2.2 V, blue/white ~3.0–3.4 V. Typical forward currents are 10–30 mA
              for indicator LEDs, hundreds of mA for high-power lighting LEDs.
            </p>
            <p>
              Crucially — an LED has almost no internal resistance once it conducts. Without a
              series resistor or (better) a current-limited driver, it self-destructs the moment
              you energise it.
            </p>
            <div className="flex justify-center pt-2">
              <LEDSymbol label="LED — light-emitting diode" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Zener diodes — the deliberate breakdown"
            plainEnglish="A normal diode dies when reverse-biased past breakdown. A Zener is designed to break down at a known voltage and stay there — perfect for a cheap voltage reference."
          >
            <p>
              In reverse mode, a Zener conducts at a precise breakdown voltage — typical values are
              3.3 V, 5.1 V, 9.1 V, 12 V, 15 V, 24 V. Drop more voltage than that across it and it
              starts conducting hard, holding its terminal voltage at the rated value while the
              extra burns off in the resistor in series.
            </p>
            <p>
              You’ll find Zeners used as low-cost voltage references inside cheap power supplies,
              over-voltage clamps on signal lines, and protection for chip inputs. They’re not as
              precise as a proper voltage regulator IC, but they’re cheap, robust and tiny.
            </p>
            <div className="flex justify-center pt-2">
              <ZenerDiodeSymbol label="Zener diode (note bent cathode)" />
            </div>
          </ConceptBlock>

          <VideoCard
            url={videos.diodes.url}
            title={videos.diodes.title}
            channel={videos.diodes.channel}
            duration={videos.diodes.duration}
            topic="Diodes · Unit 202 LO6.1 / 6.2"
            caption="Optional deeper dive — Engineering Mindset shows the P-N junction, the forward/reverse behaviour and the rectifier action with animations. Easier to grasp visually than from the maths."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why this matters on site</ContentEyebrow>

          <ConceptBlock
            title="Inside an AFDD — diodes are stage one"
            onSite="The AFDD’s job is to spot the high-frequency “hash” that comes from a series arc. To do that, its electronics need a clean DC supply. The diode bridge gives them that."
          >
            <p>
              An AFDD is required by BS 7671 Reg 421.1.7 in certain locations and recommended for
              all socket-outlet final circuits in domestic premises. Inside it you’ll find:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A bridge rectifier (four diodes) feeding a small switch-mode power supply for the
                on-board electronics.
              </li>
              <li>
                A current transformer or shunt sampling the load current many thousands of times a
                second.
              </li>
              <li>
                A microcontroller analysing the waveform for the spectral signature of an arc fault
                (random high-frequency noise on top of the 50 Hz fundamental).
              </li>
              <li>
                A trip coil that opens the contacts when the algorithm sees an arc that lasts long
                enough to be real (and not just from a vacuum motor turning on).
              </li>
            </ul>
            <p>
              Modern AFDDs also have to discriminate between “nuisance” arcs (light switches,
              motor brushes) and dangerous ones (loose terminals, damaged cable). That signal
              processing is what costs money — the diodes themselves are pennies.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating an AFDD trip as a faulty AFDD"
            whatHappens={
              <>
                AFDD trips on the customer’s old vacuum. You replace the AFDD with another of
                the same brand. It trips again. Customer is fuming.
              </>
            }
            doInstead={
              <>
                The AFDD is doing its job. Brush motors, hairdryers and old power tools genuinely
                produce arc signatures. Test the appliance on another circuit, document it, and
                educate the customer — the AFDD is detecting a real (low-grade) hazard on their
                appliance, not malfunctioning. If the appliance is the only one tripping, it needs
                servicing or replacing, not the AFDD.
              </>
            }
          />

          <Scenario
            title="“Dad, my downlights are humming when I dim them”"
            situation={
              <>
                Customer rings up — the LED downlights you fitted in the lounge buzz audibly when
                they’re dimmed, but go silent at full brightness. They’re convinced the lamps are
                faulty and want them all swapped under warranty.
              </>
            }
            whatToDo={
              <>
                Check what dimmer is on the wall. Nine times out of ten it’s an old forward-phase
                (leading-edge) dimmer left over from filament days. Forward-phase dimmers chop the
                AC waveform on its way up — that hard cut hits the LED driver’s input diode bridge
                and produces a burst of harmonics every half-cycle. Those harmonics excite the
                little choke inside the dimmer (and sometimes the driver itself) into mechanical
                vibration at exactly the frequencies your ear can hear. Fit a proper trailing-edge
                (reverse-phase) dimmer designed for LEDs, or use lamps marketed as "dimmable" with
                the right driver topology. The hum disappears.
              </>
            }
            whyItMatters={
              <>
                This is the most common "my lights are humming" callout in domestic work. Knowing
                that the diodes inside the LED driver are what make the noise — not the lamp itself
                — turns a swap-out warranty job into a five-minute dimmer change.
              </>
            }
          />

          <Scenario
            title="EV charger throws fault code “DC residual current detected”"
            situation={
              <>
                A 7 kW EV charger you fitted last week throws an error and refuses to charge any
                car. The fault code says “DC residual current detected”. The customer wants it
                fixed before the morning.
              </>
            }
            whatToDo={
              <>
                Don’t panic. The charger has a Type B RCD or built-in DC leakage detection
                because the car’s onboard charger is full of diodes that can rectify a fault
                current to DC, which an ordinary AC RCD can’t see. The detection circuit has
                noticed something. Check the car (some EVs have known DC leakage faults), check the
                charger’s earthing, and only after that consider the unit itself.
              </>
            }
            whyItMatters={
              <>
                Knowing diodes are inside both the charger AND the car is what tells you why the EV
                world demands Type B protection. Without that mental model, the fault code is
                gibberish.
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
            source="BS 7671:2018+A4:2026 — Regulation 722.531.3.101 (EV charging — RCD type)"
            clause="Each AC charging point shall be individually protected by an RCD of at least Type A having a rated residual operating current not exceeding 30 mA. Protection against DC fault currents shall be provided either by an RCD of Type B or by an RCD of Type A in conjunction with a residual direct current detecting device (RDC-DD) complying with BS IEC 62955 that disconnects the supply on detection of a DC residual current of 6 mA or more."
            meaning={
              <>
                Modern EV chargers contain bridge rectifiers (lots of diodes) on the car side. A
                fault on the DC bus can produce smooth DC leakage current that an ordinary AC RCD
                won’t see — and worse, that DC can magnetically saturate the RCD’s sense core and
                blind it to a real AC fault on the same circuit. That’s why Type B (or Type A
                paired with a 6 mA RDC-DD per BS IEC 62955) is the minimum.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 7, Section 722.531.3.101 for the full text and the cross-references to Table 537.4 and BS EN 62423 (Type B RCDs)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A diode is a one-way valve. Silicon drops ~0.7 V forward; reverse blocks until breakdown.',
              'Half-wave rectifier = one diode, simple but inefficient. Full-wave bridge = four diodes, smoother and standard.',
              'Pulsating DC out of a rectifier is almost always smoothed by a capacitor before reaching the load.',
              'LEDs are diodes that emit light — always need current limiting (resistor or driver) or they burn out.',
              'Zener diodes break down at a precise reverse voltage and are used as cheap voltage references.',
              'Every modern protective device — AFDDs, smart RCBOs, EV chargers — depends on diodes to power its on-board electronics.',
            ]}
          />

          <Quiz title="Diodes and rectifiers — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 Resistors and on-site electronics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Capacitors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
