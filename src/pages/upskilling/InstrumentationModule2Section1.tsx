/**
 * Module 2 · Section 1 — Sensor, transducer, transmitter: the words the job uses
 *
 * Rewritten 2026-08-29 as the reference page for the Instrumentation course
 * rebuild. Two things changed, and the second one matters more.
 *
 * 1. STRUCTURE. The page was ~3,600 words of prose in bare <div>s with its own
 *    sticky header on a hardcoded #1a1a1a. It now uses the same learning
 *    primitives every Level 2 and Level 3 page uses, on HubMasthead/HubBody.
 *
 * 2. 🔴 A CORRECTED DEFINITION. The old page taught "a transducer converts one
 *    form of energy into another" and gave a thermocouple as the example. That
 *    is the GENERAL-SCIENCE meaning. In industrial instrumentation — which is
 *    what this course is about — a thermocouple is a PRIMARY SENSING ELEMENT,
 *    and "transducer" is reserved for a device converting one *standardised
 *    instrumentation signal* into another (I/P, P/I, square-root extractor).
 *    A learner who walks onto a plant using the old definition will be
 *    misunderstood. Both meanings are now taught, explicitly labelled, because
 *    the collision is the thing worth knowing.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.6 — terminology cross-checked against the Rosemount 644 transmitter manual
 * and the Endress+Hauser OEM desk reference, both held in ~/Desktop/hav/
 * instrumentation. BS 7671 Section 557 wording verified against bs7671_facets
 * (A4:2026), not recalled.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
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
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Sensor, transducer, transmitter — the words the job uses | Instrumentation Module 2.1 | Elec-Mate';
const DESCRIPTION =
  'The measurement chain from process variable to control room: primary sensing element, transmitter, controller, final control element. Why "transducer" means something different on a plant than in a physics class, and what LRV, URV, zero and span actually set.';

const outcomes = [
  'Name every stage of the measurement chain in the order a signal travels through it',
  'Distinguish a primary sensing element from a transmitter, and say what each one outputs',
  'Use the word "transducer" the way the process industry uses it — and recognise the general-science meaning when you meet it',
  'Read a transmitter nameplate and say what its 4 mA and 20 mA points represent',
  'Work out span from LRV and URV, and explain why re-ranging is not re-calibrating',
  'Decide between an integrated transmitter and a separate sensor-plus-transmitter for a given job',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a process plant, an engineer asks you to "check the transducer on that loop". Following standard industrial usage, what are they most likely pointing you at?',
    options: [
      'The thermocouple in the thermowell',
      'An I/P converter turning the 4–20 mA output into a 3–15 psi air signal',
      'The control valve actuator',
      'The controller faceplate in the control room',
    ],
    correctIndex: 1,
    explanation:
      'In industrial instrumentation a transducer converts one standardised instrumentation signal into another — an I/P or P/I converter, or a square-root extractor. The thermocouple is the primary sensing element. In general science a thermocouple would be called a transducer, which is exactly why the word causes confusion on site.',
  },
  {
    id: 2,
    question: 'What does a transmitter do that a primary sensing element does not?',
    options: [
      'It touches the process directly',
      'It turns a small, non-standard output into a standardised signal that can travel to the control room',
      'It decides what the process should do next',
      'It physically moves the valve',
    ],
    correctIndex: 1,
    explanation:
      'A PSE produces a small and awkward output — tens of microvolts from a thermocouple, a resistance change from an RTD. A transmitter converts that into a standard signal such as 4–20 mA, which survives a long cable run and means the same thing to any receiving device.',
  },
  {
    id: 3,
    question:
      'A temperature transmitter has an LRV of 50 °C and a URV of 250 °C. What is its span, and what does 12 mA represent?',
    options: [
      'Span 250 °C; 12 mA = 125 °C',
      'Span 200 °C; 12 mA = 150 °C',
      'Span 200 °C; 12 mA = 100 °C',
      'Span 300 °C; 12 mA = 150 °C',
    ],
    correctIndex: 1,
    explanation:
      'Span = URV − LRV = 250 − 50 = 200 °C. 12 mA is the midpoint of the 4–20 mA range (50%), so it represents 50 °C + (0.5 × 200 °C) = 150 °C. Note that zero (the LRV) is 50 °C, not 0 °C — the range does not have to start at zero.',
  },
  {
    id: 4,
    question:
      'Which of these is the final control element in a tank level loop that throttles the inlet valve?',
    options: [
      'The differential pressure transmitter',
      'The level controller',
      'The control valve on the inlet line',
      'The operator in the control room',
    ],
    correctIndex: 2,
    explanation:
      'The final control element is the device that directly influences the process. Here that is the control valve. The DP transmitter measures, the controller decides, the valve acts.',
  },
  {
    id: 5,
    question:
      'A smart transmitter is re-ranged from 0–100 °C to 0–200 °C using its HART configurator, with no test equipment applied. What has happened?',
    options: [
      'It has been calibrated, and the calibration certificate remains valid',
      'It has been re-ranged only — no comparison against a known reference was made, so this is not a calibration',
      'Nothing, because re-ranging has no effect on the output',
      'The sensor has been physically replaced',
    ],
    correctIndex: 1,
    explanation:
      'Re-ranging changes what the 4 mA and 20 mA points mean. Calibration is a comparison against a traceable reference to establish error. Changing the range from a handheld does not verify the instrument reads correctly, and it does not renew a calibration certificate.',
  },
  {
    id: 6,
    question:
      'Under BS 7671 Section 557, an instrumentation circuit supplied so that it operates only when the main power circuit is energised is described as:',
    options: [
      'An independent auxiliary circuit',
      'An auxiliary circuit dependent on the main circuit',
      'A SELV circuit',
      'A final circuit',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 557.3.2 concerns auxiliary circuits "dependent on the main circuit" — circuits supplying control and instrumentation equipment whose operation depends on the presence or characteristics of the main power circuit. 557.3.1 requires the designer to assess the function and choose dependent or independent deliberately.',
  },
];

const InstrumentationModule2Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 1"
        title="Sensor, transducer, transmitter"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The vocabulary of the measurement chain — and the one word that means two different things
          depending on who is saying it.
        </p>

        <TLDR
          points={[
            'The chain runs: process variable → primary sensing element → transmitter → controller → final control element. Learn it in that order and every loop diagram reads itself.',
            'A primary sensing element (PSE) touches the process. A thermocouple, an RTD, a Bourdon tube, an orifice plate — these are PSEs.',
            '🔴 On a plant, "transducer" does NOT mean a thermocouple. It means a device converting one standardised signal into another — an I/P converter, a P/I converter, a square-root extractor.',
            "A transmitter turns the PSE's small, awkward output into a standard signal — usually 4–20 mA — that survives the cable run to the control room.",
            'LRV and URV set what 4 mA and 20 mA mean. Span = URV − LRV. Re-ranging is not calibrating.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The chain</ContentEyebrow>

        <ConceptBlock
          title="Everything is a chain from the process to a decision and back again"
          plainEnglish="Something in the plant changes. A device notices. Another device turns that into a signal anyone can read. A controller compares it to what you asked for. Something moves to correct it."
          onSite="When a loop misbehaves, walk the chain in order rather than guessing. Nine times out of ten the fault announces itself the moment you ask 'which link stopped telling the truth?'"
        >
          <p>
            Instrumentation is the science of automated measurement and control, and almost every
            arrangement you meet — a boiler drum, a reactor jacket, a wastewater dosing skid — is
            the same five-part chain wearing different clothes.
          </p>
          <p>
            The <strong>process</strong> is the physical system you are measuring or controlling.
            The <strong>process variable (PV)</strong> is the specific quantity you care about:
            temperature, pressure, level, flow, pH, speed, vibration. The{' '}
            <strong>setpoint (SP)</strong> is the value you want that variable to sit at.
          </p>
          <p>
            Between the process and the decision sit the instruments. Between the decision and the
            process sits the thing that actually moves. Get those two halves straight and the rest
            of this course is detail.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The primary sensing element touches the process"
          plainEnglish="The PSE is the part in the pipe, the tank or the thermowell. It is the only part that physically meets what you are measuring."
          onSite="If you can get a spanner on it and it is wet, hot or in the flow path, you are almost certainly looking at the primary sensing element."
        >
          <p>
            A <strong>primary sensing element (PSE)</strong> directly senses the process variable
            and translates it into an analogue representation — a voltage, a resistance, a force, a
            movement. It does not produce a signal you can send anywhere useful. It produces a
            physical effect.
          </p>
          <p>Common primary sensing elements, and what each one actually gives you:</p>
          <ul>
            <li>
              <strong>Thermocouple</strong> — two dissimilar metals joined at a hot junction
              generate a small DC voltage, typically tens of microvolts per degree.
            </li>
            <li>
              <strong>RTD (e.g. Pt100)</strong> — a platinum element whose resistance rises
              predictably with temperature; 100 Ω at 0 °C for a Pt100.
            </li>
            <li>
              <strong>Bourdon tube</strong> — a curved tube that straightens under pressure, giving
              mechanical movement.
            </li>
            <li>
              <strong>Orifice plate</strong> — a restriction that creates a differential pressure
              related to flow rate.
            </li>
            <li>
              <strong>Strain gauge</strong> — a foil element whose resistance changes as it deforms.
            </li>
            <li>
              <strong>Electrochemical cell</strong> — generates a millivolt signal proportional to
              chemical concentration, as in a pH probe.
            </li>
          </ul>
          <p>
            Notice what these have in common: microvolts, ohms, millimetres of movement. None of it
            will survive 200 metres of cable to a control room, and none of it means anything to a
            controller without interpretation. That is the transmitter's job.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-1-pse"
          question="An orifice plate in a flow line — what is it, in the language of the chain?"
          options={[
            'A transmitter, because it produces a flow signal',
            'A primary sensing element, because it directly senses the process and produces a physical effect',
            'A transducer, because it converts pressure into flow',
            'A final control element, because it restricts the flow',
          ]}
          correctIndex={1}
          explanation="The orifice plate creates a differential pressure related to flow. That differential is a physical effect, not a signal — a DP transmitter is still needed to turn it into 4–20 mA. And although the plate does restrict flow, restricting flow is a side effect of measuring it, not its purpose."
        />

        <SectionRule />
        <ContentEyebrow>The word that trips people up</ContentEyebrow>

        <ConceptBlock
          title="&ldquo;Transducer&rdquo; means two different things — and the plant uses the narrower one"
          plainEnglish="In a physics lesson, a transducer is anything that turns one kind of energy into another — a microphone, a thermocouple, a loudspeaker. On a process plant, the word is reserved for something much more specific."
          onSite="If someone on a plant says &lsquo;check the transducer&rsquo;, do not walk to the thermowell. They mean a signal converter — most often an I/P on the valve."
        >
          <p>
            This is the single most common vocabulary collision in instrumentation, and it is worth
            slowing down for.
          </p>
          <p>
            <strong>In general science</strong>, a transducer is any device converting one form of
            energy into another. Under that definition a thermocouple is a transducer, because it
            converts thermal energy into electrical energy. So is a microphone. So is a loudspeaker.
            This is the definition most people meet first, and it is not wrong — it is just not the
            one used at work.
          </p>
          <p>
            <strong>In industrial instrumentation</strong>, a transducer is a device converting one{' '}
            <em>standardised instrumentation signal</em> into another standardised instrumentation
            signal, or performing some processing on that signal. It is often called a{' '}
            <strong>converter</strong>. The classic examples:
          </p>
          <ul>
            <li>
              <strong>I/P converter</strong> — takes a 4–20 mA electrical signal and produces a 3–15
              psi pneumatic signal. You will find one on almost every pneumatically actuated control
              valve.
            </li>
            <li>
              <strong>P/I converter</strong> — the reverse: 3–15 psi in, 4–20 mA out.
            </li>
            <li>
              <strong>Square-root extractor</strong> — takes the output of a DP transmitter on an
              orifice plate and extracts the square root, because differential pressure is
              proportional to the square of flow rate.
            </li>
          </ul>
          <p>
            Under the industrial definition, the device that senses the process is a{' '}
            <strong>primary sensing element</strong>, not a transducer. The distinction exists
            because the two jobs are genuinely different: one meets the process, the other
            translates between signal standards.
          </p>
        </ConceptBlock>

        <Pullquote>
          A thermocouple is a transducer in a classroom and a primary sensing element on a plant.
          The metal has not changed — the audience has.
        </Pullquote>

        <InlineCheck
          id="ins-2-1-transducer"
          question="Which of these is a transducer in the industrial sense of the word?"
          options={[
            'A Pt100 RTD in a thermowell',
            'A strain gauge bonded to a load cell',
            'An I/P converter mounted on a control valve positioner',
            'A pH electrode in a process stream',
          ]}
          correctIndex={2}
          explanation="The I/P converter takes one standardised signal (4–20 mA) and produces another (3–15 psi). The RTD, strain gauge and pH electrode all sense the process directly, which makes them primary sensing elements — even though a physics textbook would happily call all three transducers."
        />

        <SectionRule />
        <ContentEyebrow>Making the signal travel</ContentEyebrow>

        <ConceptBlock
          title="The transmitter turns an awkward output into a signal that travels"
          plainEnglish="A transmitter is the translator. It takes microvolts or ohms from the sensing element and sends out a standard current that means the same thing to every device down the line."
          onSite="The transmitter is usually the box with the terminals and the display, mounted next to — or directly on top of — the sensing element."
        >
          <p>
            A <strong>transmitter</strong> translates the signal produced by a primary sensing
            element into a standardised instrumentation signal: 4–20 mA DC, 3–15 psi air, or a
            digital fieldbus packet. That signal can then be conveyed to an indicator, a controller,
            or both.
          </p>
          <p>Why bother? Three reasons, and they all matter on a real site:</p>
          <ul>
            <li>
              <strong>Distance.</strong> A thermocouple's tens of microvolts would be swamped by
              noise long before reaching a control room. A 4–20 mA current loop is immune to voltage
              drop along the cable — the same current flows at both ends.
            </li>
            <li>
              <strong>Interchangeability.</strong> Any 4–20 mA input card understands any 4–20 mA
              transmitter. The receiving device does not need to know whether the measurement came
              from a thermocouple, an RTD or a radar level gauge.
            </li>
            <li>
              <strong>Live-zero diagnostics.</strong> The range starts at 4 mA, not 0 mA, on
              purpose. A healthy instrument reading its lowest value still draws 4 mA, so 0 mA is
              unambiguous: the loop is broken. A 0–20 mA range could not tell &ldquo;minimum
              reading&rdquo; from &ldquo;cable cut&rdquo;.
            </li>
          </ul>
          <p>
            That last point is worth committing to memory. It is the reason 4–20 mA has outlived
            almost every other analogue standard, and it is the first thing to check when a reading
            drops to nothing.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="LRV, URV, zero and span — what 4 mA and 20 mA actually mean"
          plainEnglish="A transmitter does not know what temperature is. It knows that one end of its range is 4 mA and the other is 20 mA. You tell it where those ends sit."
          onSite="Two identical transmitters can output completely different currents in the same process, because they have been ranged differently. Always read the range off the nameplate before you conclude anything from the current."
        >
          <p>
            The <strong>lower-range value (LRV)</strong> is the process measurement deemed to be 0%
            of the transmitter's calibrated range — the point at which it outputs 4 mA. The{' '}
            <strong>upper-range value (URV)</strong> is 100%, at which it outputs 20 mA.
          </p>
          <p>
            <strong>Zero</strong> and <strong>span</strong> describe the same thing differently.
            Zero is the beginning point of the range (the same as the LRV). Span is the{' '}
            <em>width</em> of the range:
          </p>
          <p>
            <strong>Span = URV − LRV</strong>
          </p>
          <p>
            Take a temperature transmitter ranged 300 °C to 500 °C. Its LRV is 300 °C and its URV is
            500 °C, so its zero is 300 °C and its span is 200 °C. At 300 °C it outputs 4 mA; at 500
            °C, 20 mA; at 400 °C — the middle of the range — 12 mA.
          </p>
          <p>
            Note that zero does not have to be 0 °C, and frequently is not. A transmitter watching a
            process that never operates below 300 °C would waste most of its resolution if it were
            ranged from zero. This is called <strong>zero elevation</strong> or{' '}
            <strong>suppression</strong> depending on which way it goes, and it is normal practice
            rather than a mistake.
          </p>
        </ConceptBlock>

        <Scenario
          title="A reading that is wrong by exactly a factor you can calculate"
          situation="A replacement DP transmitter is fitted to a tank. The control room shows 60% level when a sight glass shows the tank is about a third full. Nothing is leaking, the loop is healthy and the transmitter reads a steady 13.6 mA."
          whatToDo="Read the range off both transmitters before touching anything. The old one was ranged 0–2500 mmH₂O; the replacement came out of the store ranged 0–1500 mmH₂O. At 13.6 mA the new unit is reporting 60% of 1500 = 900 mmH₂O — which is 36% of the 2500 mmH₂O the control system still believes it is scaled to. Re-range the transmitter to match the loop, then prove it against a reference before signing it off."
          whyItMatters="Nothing here is faulty. The instrument, the cable and the input card are all working perfectly and all telling the truth about different things. This is why 'what is it ranged for?' comes before 'is it broken?' — and why the range belongs on the loop sheet, not just in someone's memory."
        />

        <InlineCheck
          id="ins-2-1-span"
          question="A pressure transmitter is ranged 2 bar to 10 bar. What is its span, and what does it output at 6 bar?"
          options={[
            'Span 10 bar, 12 mA',
            'Span 8 bar, 12 mA',
            'Span 8 bar, 10 mA',
            'Span 12 bar, 14 mA',
          ]}
          correctIndex={1}
          explanation="Span = URV − LRV = 10 − 2 = 8 bar. 6 bar sits exactly halfway between 2 and 10, so the output is halfway between 4 and 20 mA — 12 mA."
        />

        <ConceptBlock
          title="Turndown — how far a transmitter can be ranged before it stops being any good"
          plainEnglish="A transmitter has a widest range it can be set to and a narrowest one. The ratio between them is its turndown, and it is the number that decides whether one unit can cover the job."
          onSite="Turndown is on the datasheet, and it is the first thing to check when someone asks whether a spare from the store will do."
        >
          <p>
            Section 1 established that LRV and URV set what 4 mA and 20 mA mean, and that span is
            the difference between them. What that leaves open is how far you may push it —{' '}
            <strong>turndown</strong>, sometimes called rangedown, is the answer.
          </p>
          <p>
            <strong>
              Turndown is the ratio of the maximum allowable span to the minimum allowable span for
              a particular instrument.
            </strong>
          </p>
          <p>
            Take a pressure transmitter with a maximum calibration range of 0 to 300 psi and a
            turndown of 20:1. The technician may set the span anywhere between 300 psi — a range of
            0 to 300 psi — and 15 psi, a range of 0 to 15 psi. Below that, the manufacturer no
            longer stands behind the performance.
          </p>
          <p>Why it matters in practice, in two directions:</p>
          <ul>
            <li>
              <strong>Stores rationalisation.</strong> A single transmitter with generous turndown
              can cover several duties, so a site holds fewer spares. That is usually the argument
              for buying it.
            </li>
            <li>
              <strong>Accuracy.</strong> Specifications are frequently quoted as a percentage of{' '}
              <em>span</em>, so squeezing a wide-range instrument down to a narrow span makes the
              error a larger share of what you are actually reading. A transmitter ranged near the
              bottom of its turndown is legal, supported, and worse.
            </li>
          </ul>
          <p>
            So the question is never simply &ldquo;can it be ranged for this?&rdquo; It is{' '}
            <strong>&ldquo;can it be ranged for this and still be accurate enough?&rdquo;</strong>{' '}
            Those are different questions, and the second one is the one that gets forgotten when a
            spare is grabbed off the shelf.
          </p>
          <p>
            Put numbers on it. A transmitter quoted at 0.1% of span is holding 0.3 psi on a 300 psi
            span. Range the same unit down to 15 psi and 0.1% of span is 0.015 psi — the
            specification looks better, not worse. But that specification is the <em>reference</em>{' '}
            accuracy, and the other error terms in a datasheet do not all scale with span. Squeeze
            the span far enough and the fixed contributions come to dominate, which is why the
            manufacturer publishes a turndown limit at all rather than letting you range it to
            nothing.
          </p>
          <p>
            The practical habit is simple: check turndown before promising a range, and be
            suspicious of any instrument working near the narrow end of its own limit.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-1-turndown"
          question="A transmitter has a maximum range of 0–300 psi and a turndown of 10:1. What is the narrowest span you may set it to?"
          options={['3 psi', '30 psi', '10 psi', '300 psi']}
          correctIndex={1}
          explanation="Turndown is maximum allowable span divided by minimum allowable span. 300 psi ÷ 10 = 30 psi, so the narrowest supported range is 0–30 psi. Ranging it tighter than that puts you outside what the manufacturer supports — and, because accuracy is usually a percentage of span, makes the reading proportionally worse anyway."
        />

        <SectionRule />
        <ContentEyebrow>How the transmitter is powered</ContentEyebrow>

        <ConceptBlock
          title="Two-wire and four-wire transmitters — count the terminals first"
          plainEnglish="Some transmitters are powered by the very loop they signal on. Others need their own supply. You can tell which by counting terminals, and it changes how you fault-find."
          onSite="Before you break into a loop, know which type you have. Opening a two-wire loop kills the transmitter as well as the signal — the reading does not just stop, the instrument stops."
        >
          <p>
            A <strong>four-wire (self-powered)</strong> transmitter has two terminals for the 4–20
            mA signal and two more for its own power source. The power and the signal are separate
            circuits. These are common where the instrument needs real power — a magnetic flowmeter
            energising its coils, or anything with a heated sensor or a substantial display.
          </p>
          <p>
            A <strong>two-wire (loop-powered)</strong> transmitter has only two terminals. The same
            pair carries the supply <em>and</em> the signal. The transmitter sits in series with the
            supply and the receiving device, and regulates how much current flows around that loop.
          </p>
          <p>
            The consequence of that is worth thinking about carefully. If 4 mA is the minimum the
            loop will ever carry, then{' '}
            <strong>every circuit inside a two-wire transmitter must run on less than 4 mA</strong>{' '}
            — the sensing, the scaling, the display, the lot. To produce a higher reading it does
            not generate current; it shunts additional current through itself. A transmitter drawing
            3.8 mA internally that needs to signal 16 mA will bypass exactly 12.2 mA to make up the
            difference.
          </p>
          <p>
            That tiny power budget is why two-wire transmitters have modest displays and limited
            features, and why the genuinely power-hungry instruments are four-wire. It is not a
            quality difference — it is a physics one.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-1-wiring"
          question="You disconnect one terminal of a two-wire loop-powered transmitter to take a reading. What happens?"
          options={[
            'The signal stops but the transmitter keeps working from its own supply',
            'The transmitter loses power as well, because the signal loop is also its supply',
            'The loop current rises to 20 mA',
            'Nothing — two-wire transmitters have an internal battery',
          ]}
          correctIndex={1}
          explanation="In a two-wire transmitter the same pair carries supply and signal. Break the loop and the instrument is de-energised, not merely disconnected. This is why a loop calibrator that can supply loop power is the right tool, rather than simply breaking in with a meter."
        />

        <SectionRule />
        <ContentEyebrow>One box or two</ContentEyebrow>

        <ConceptBlock
          title="Integrated and modular arrangements — and why both still exist"
          plainEnglish="Sometimes the sensing element and the transmitter are one unit. Sometimes they are separate boxes joined by a cable. Each suits different jobs."
          onSite="Ask what fails, and how you would replace it while the plant is running. That question usually settles the argument faster than a cost comparison."
        >
          <p>
            An <strong>integrated</strong> transmitter houses the sensing element and the
            electronics in a single assembly — a pressure transmitter with its diaphragm and
            electronics in one body, or a smart temperature transmitter mounted in the head of the
            thermowell.
          </p>
          <ul>
            <li>Fewer terminations, so fewer places for moisture and vibration to find a way in</li>
            <li>Calibrated as a matched pair at the factory</li>
            <li>Less cable carrying a weak, noise-prone signal</li>
            <li>Compact where space is tight</li>
          </ul>
          <p>
            A <strong>modular</strong> arrangement keeps them separate: an RTD in the process, a
            remote transmitter on a nearby rack or in a marshalling cabinet.
          </p>
          <ul>
            <li>The electronics can sit outside a hot, vibrating or hazardous location</li>
            <li>Either part can be replaced without disturbing the other</li>
            <li>One transmitter type can serve several sensor types</li>
            <li>Easier access for calibration without shutting the process down</li>
          </ul>
          <p>
            The trade is the cable run between them. A thermocouple extension or a three-wire RTD
            connection carries a fragile signal, and every metre of it is exposed to induced noise
            and lead resistance. That is precisely why head-mounted transmitters became popular:
            they shorten the fragile part of the chain to a few centimetres.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Deciding and acting</ContentEyebrow>

        <ConceptBlock
          title="The controller decides; the final control element acts"
          plainEnglish="The controller compares what it is measuring against what you asked for, and works out what to do. The final control element is the thing that physically does it."
          onSite="In automatic, the controller drives the output. In manual, a person does. Knowing which mode a loop is in explains most 'the valve is not responding' calls."
        >
          <p>
            A <strong>controller</strong> receives the PV signal from a transmitter, compares it to
            the setpoint, and calculates an output to send onward. That output is the{' '}
            <strong>manipulated variable (MV)</strong> — the quantity you adjust in order to
            influence the process variable.
          </p>
          <p>
            A <strong>final control element (FCE)</strong> receives that output and directly
            influences the process. Typically a control valve throttling a flow, a variable-speed
            drive on a motor, or an electric heater.
          </p>
          <p>
            In <strong>automatic mode</strong> the controller generates its output from the
            relationship between PV and SP. In <strong>manual mode</strong> the decision-making is
            bypassed and an operator sets the output directly. A loop sitting in manual is a
            standing signal that somebody did not trust it — worth asking why before you put it back
            in automatic.
          </p>
          <p>
            Module 5 takes this apart properly, including how the controller decides. For now, the
            useful thing is the shape: <strong>measure, decide, act</strong>, with the process
            closing the loop by reacting.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Why a current, not a voltage</ContentEyebrow>

        <ConceptBlock
          title="The signal standards you will meet, and why 4&ndash;20 mA won"
          plainEnglish="A current is the same everywhere in a series loop. A voltage is not — it drops along the cable. That single fact is why the industry settled on a current signal."
          onSite="If a loop reads correctly at the transmitter and wrong at the panel, you are not looking at a current problem. Suspect the sense resistor, the input card, or a second earth."
        >
          <p>Three signal standards account for most of what is installed:</p>
          <ul>
            <li>
              <strong>3&ndash;15 psi pneumatic</strong> — the original. Still found on older plant
              and anywhere a valve is air-actuated. The 3 psi live zero does the same diagnostic job
              as 4 mA.
            </li>
            <li>
              <strong>4&ndash;20 mA DC</strong> — the workhorse. One measurement per loop, immune to
              cable voltage drop, with a live zero.
            </li>
            <li>
              <strong>Digital fieldbus</strong> — HART riding on top of a 4&ndash;20 mA loop,
              Foundation Fieldbus, Profibus PA. Multiple variables and diagnostics over one
              connection. Module 3 covers these.
            </li>
          </ul>
          <p>
            The reason a current beat a voltage is Kirchhoff&rsquo;s current law doing you a favour.
            In a series loop the same current flows at every point, so the reading cannot be
            degraded by resistance in the cable. Send a voltage instead and every metre of
            conductor, every terminal and every slightly corroded connection subtracts a little from
            what arrives.
          </p>
          <p>
            Voltage signals such as 0&ndash;10 V and 1&ndash;5 V do exist, and you will meet them
            inside panels and on building-services equipment where runs are short. A 1&ndash;5 V
            signal is very often just a 4&ndash;20 mA loop read across a precision resistor: 4 mA
            through 250 &Omega; gives 1 V, and 20 mA gives 5 V. Recognising that saves confusion
            when a drawing shows both.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671 Section 557"
          clause="This section of BS 7671 applies to auxiliary circuits, except where those auxiliary circuits are covered by specific product or system standards — for example assemblies built to the appropriate part of the BS EN (IEC) 61439 series."
          meaning={
            <>
              <p>
                Instrumentation, metering, control and signalling circuits are auxiliary circuits.
                Regulation 557.3.1 requires the designer to assess the required function and decide
                deliberately whether the supply is <strong>dependent</strong> on the main circuit or{' '}
                <strong>independent</strong> of it — and to be able to show why.
              </p>
              <p>
                Regulation 557.3.2 concerns the dependent case: a circuit supplying control or
                instrumentation equipment whose operation depends on the presence or characteristics
                of the main power circuit, rather than being fed as a separate independent supply.
              </p>
              <p>
                In practice this is the difference between a loop that dies with the plant and a
                loop that keeps reporting after the main breaker opens. Which you want is a design
                decision, and Section 557 asks you to have made it on purpose.
              </p>
            </>
          }
          cite="Wording verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <CommonMistake
          title="Calling the sensing element a transducer in front of the wrong audience"
          whatHappens="An apprentice is asked to isolate and remove the transducer on a temperature loop. Working from the general-science definition, they go to the thermowell and start withdrawing the sensor from a live process — when the engineer meant the I/P converter on the valve, at the other end of the loop entirely."
          doInstead="Use the plant's vocabulary: primary sensing element for the part in the process, transmitter for the box that produces 4–20 mA, transducer for a signal converter. If there is any doubt, name the device by its tag number and its location rather than its category. A tag number is never ambiguous."
        />

        <CommonMistake
          title="Treating a re-range as a calibration"
          whatHappens="A transmitter is re-ranged from a handheld communicator and the job is closed out as 'calibrated'. No reference was applied, no error was recorded, and the instrument may have been reading 3% high the whole time. The paperwork now says it is good."
          doInstead="Keep the two ideas separate. Re-ranging changes what 4 mA and 20 mA mean and takes seconds from a configurator. Calibration compares the instrument against a traceable reference and records as-found and as-left values. Module 6 covers this properly — but the habit starts here."
        />

        <SectionRule />
        <ContentEyebrow>Working it through</ContentEyebrow>

        <ConceptBlock
          title="Reading a loop the way an instrument technician reads it"
          onSite="Do this walk on the next loop you meet, even a healthy one. Knowing what right looks like is what makes wrong obvious later."
        >
          <p>
            Take a jacketed reactor whose temperature is controlled by throttling cooling water:
          </p>
          <ul>
            <li>
              <strong>Process</strong> — the reactor and its contents.
            </li>
            <li>
              <strong>Process variable</strong> — the temperature inside the vessel.
            </li>
            <li>
              <strong>Primary sensing element</strong> — an RTD in a thermowell through the vessel
              wall. Produces a resistance.
            </li>
            <li>
              <strong>Transmitter</strong> — head-mounted on the thermowell, converting that
              resistance to 4–20 mA. Ranged, say, 20–120 °C, so span is 100 °C.
            </li>
            <li>
              <strong>Controller</strong> — compares the measured temperature to the setpoint and
              calculates an output.
            </li>
            <li>
              <strong>Transducer</strong> — an I/P converter at the valve, turning the controller's
              4–20 mA into 3–15 psi of air.
            </li>
            <li>
              <strong>Final control element</strong> — the control valve on the cooling water line.
            </li>
          </ul>
          <p>
            Seven items, one sentence each, and you have described the loop completely. Every fault
            you will ever chase on it lives in one of those seven boxes or in the wiring between
            them.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is a thermocouple a transducer or a primary sensing element?',
              answer: (
                <>
                  Both, depending on who is asking. In general science it converts thermal energy
                  into electrical energy, which makes it a transducer. In industrial instrumentation
                  it is a primary sensing element, and &ldquo;transducer&rdquo; is reserved for
                  signal converters such as I/P units. On a plant, use the second definition.
                </>
              ),
            },
            {
              question: 'Why does the signal range start at 4 mA rather than 0 mA?',
              answer:
                'So that zero current is unambiguous. A healthy instrument at its lowest reading still draws 4 mA, which means 0 mA can only mean a broken loop, a dead transmitter or a lost supply. This is called a live zero, and it turns the signal itself into a diagnostic.',
            },
            {
              question: 'Can one transmitter serve several sensing elements?',
              answer:
                'Not simultaneously in a conventional 4–20 mA loop — one loop carries one measurement. Multivariable transmitters and digital fieldbus devices can report several variables over one connection, which is one of the main reasons those protocols exist. Module 3 covers the signal types in detail.',
            },
            {
              question: 'Does every loop need a controller?',
              answer:
                'No. Plenty of instruments only indicate or record, and plenty only raise an alarm at a threshold. A loop without a controller and a final control element is a measurement system rather than a control system — still useful, just not closing the loop.',
            },
            {
              question:
                'What is the difference between a transmitter and a transducer, in one line?',
              answer:
                "A transmitter turns a sensing element's raw physical output into a standard signal. A transducer turns one standard signal into a different standard signal.",
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'The chain is process variable → primary sensing element → transmitter → controller → final control element. Learn the order, and loop diagrams stop being intimidating.',
            'The primary sensing element is the only part that touches the process, and it produces a physical effect, not a signal.',
            'On a plant, "transducer" means a signal converter — I/P, P/I, square-root extractor — not a thermocouple. Both definitions are legitimate; only one is used at work.',
            'The transmitter exists to make the measurement travel: immune to voltage drop, interchangeable between devices, and with a live zero that makes a broken loop obvious.',
            'LRV and URV set what 4 mA and 20 mA mean; span is the difference between them. Zero does not have to be zero.',
            'Re-ranging changes what the signal means. Calibration proves the instrument tells the truth. They are not the same job.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 2</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Temperature sensing elements
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section1;
