/**
 * Module 1 · Section 1 — What instrumentation is, and what it is for
 *
 * Rewritten 2026-08-29. First page of the Instrumentation rebuild, and the
 * exemplar the rest of the course is written against.
 *
 * The old page was ~600 lines of prose in bare <div>s under its own sticky
 * header on a hardcoded #1a1a1a. Its content was sound but flat: a definition,
 * a list of example instruments, a paragraph on PLCs and SCADA, and a mention
 * of control loops. It is now built from the same learning primitives every
 * Level 2 and Level 3 page uses, and it earns its length by teaching the
 * vocabulary and the loop rather than listing device types.
 *
 * The through-line: measurement exists to enable control. Everything on this
 * page hangs off that sentence, because it is the thing that makes the rest of
 * the course make sense.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.6 — including the industrial boiler drum example used for the scenario.
 * Cross-checked against the Endress+Hauser OEM desk reference and the
 * Rosemount 644 manual, both held in ~/Desktop/hav/instrumentation.
 * BS 7671 Section 557 wording verified against bs7671_facets (A4:2026).
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
  'What instrumentation is, and what it is for | Instrumentation Module 1.1 | Elec-Mate';
const DESCRIPTION =
  'Instrumentation is the science of automated measurement and control. What gets measured on industrial plant, why measurement exists to serve control, and how a loop closes — from the sensing element in the pipe to the valve that moves.';

const outcomes = [
  'Define instrumentation in one sentence, and say why measurement comes before control',
  'List the quantities industry actually measures, and recognise them on a plant',
  'Describe the measure → decide → act loop and name what closes it',
  'Tell a measurement system apart from a control system, and say when each is enough',
  'Use the terms process, process variable, setpoint, manipulated variable and final control element correctly',
  'Explain what an indicator, a recorder and a process switch each add, and when a switch is the right answer',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which single sentence best describes what instrumentation is?',
    options: [
      'The installation of electrical equipment in industrial buildings',
      'The science of automated measurement and control',
      'The calibration of test meters against traceable standards',
      'The programming of PLCs and SCADA systems',
    ],
    correctIndex: 1,
    explanation:
      'Instrumentation is the science of automated measurement and control. Calibration and PLC programming are activities within it, not definitions of it — and it is not limited to industrial buildings; a home thermostat is a measurement and control system too.',
  },
  {
    id: 2,
    question: 'Why does measurement have to come before control?',
    options: [
      'Because standards require measurement to be commissioned first',
      'Because a controller cannot act on a quantity it has no information about',
      'Because measurement instruments are cheaper to install',
      'It does not — control can be applied without any measurement',
    ],
    correctIndex: 1,
    explanation:
      'If you cannot measure something, there is nothing to compare against a setpoint and nothing to correct towards. Control without measurement is open-loop guessing. This is why the course begins with sensing and works forwards.',
  },
  {
    id: 3,
    question: 'In a tank level loop, which item is the manipulated variable?',
    options: [
      'The level in the tank',
      'The level setpoint entered by the operator',
      'The controller output driving the inlet valve',
      'The 4–20 mA signal from the level transmitter',
    ],
    correctIndex: 2,
    explanation:
      "The manipulated variable is the quantity you adjust in order to influence the process variable — here, the controller output commanding the valve. The tank level is the process variable; the operator's target is the setpoint.",
  },
  {
    id: 4,
    question:
      'A pressure gauge on a compressed-air receiver, with no transmitter and no controller, is:',
    options: [
      'A control system, because pressure is being regulated',
      'A measurement system — it indicates but does not act',
      'A safety instrumented system',
      'Not instrumentation at all',
    ],
    correctIndex: 1,
    explanation:
      'It measures and indicates but nothing acts on the reading automatically, so the loop is not closed. That makes it a measurement system. It is still instrumentation, and for many duties it is entirely sufficient.',
  },
  {
    id: 5,
    question:
      'A process switch is chosen instead of a transmitter for a high-level trip. What is the trade-off?',
    options: [
      'The switch is more accurate but slower to respond',
      'The switch reports only whether a threshold has been crossed, not how far away the level is',
      'The switch needs a 4–20 mA loop and the transmitter does not',
      'There is no trade-off; they do the same job',
    ],
    correctIndex: 1,
    explanation:
      'A switch gives a discrete answer — above or below. It cannot tell you the level is climbing steadily towards the trip point. That simplicity is exactly why switches remain common on trips and alarms, where a definite state is what is wanted.',
  },
  {
    id: 6,
    question:
      'BS 7671 Section 557 requires the designer of an instrumentation circuit to decide one thing in particular. What is it?',
    options: [
      'The cable size, before anything else',
      'Whether the supply is dependent on the main circuit or independent of it',
      'The calibration interval for every instrument on the circuit',
      'Which manufacturer of transmitter will be used',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 557.3.1 requires the designer to assess the required function of the auxiliary circuit and choose a dependent or independent supply accordingly. In practice: does this loop keep reporting when the plant is de-energised, or die with it? Both can be right — Section 557 asks that somebody decided on purpose.',
  },
];

const InstrumentationModule1Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 1"
        title="What instrumentation is, and what it is for"
        backTo="/electrician/upskilling/instrumentation-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The one-sentence definition, the quantities industry actually measures, and why every one
          of them exists to serve a decision.
        </p>

        <TLDR
          points={[
            'Instrumentation is the science of automated measurement and control. Measurement first — you cannot control what you cannot measure.',
            'Industry measures a short list of things: pressure, flow, temperature, level, chemical concentration, position and motion, dimension, count, and electrical quantities.',
            'The shape is always the same: something senses, something decides, something acts, and the process reacts. That last step is what makes it a loop.',
            'A measurement system indicates. A control system closes the loop and acts. Both are instrumentation; only one corrects.',
            'Learn five words now — process, process variable, setpoint, manipulated variable, final control element — and every drawing in this course becomes readable.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The definition</ContentEyebrow>

        <ConceptBlock
          title="Instrumentation is the science of automated measurement and control"
          plainEnglish="Measuring something, and then doing something about it, without a person having to stand there watching."
          onSite="If you can point at a device that measures a quantity, or one that acts on a measurement, you are looking at instrumentation — whether it is on a refinery or a hotel boiler."
        >
          <p>
            That sentence is worth memorising, because it contains the whole discipline in nine
            words. Applications of it surround us: engine management in a car, the thermostat on a
            wall, an aircraft autopilot, the manufacture of pharmaceuticals. The scale changes; the
            idea does not.
          </p>
          <p>
            The first step is always <strong>measurement</strong>. If you cannot measure something,
            it is genuinely pointless trying to control it — there is nothing to compare against a
            target and nothing to correct towards. This is why the course is ordered the way it is:
            sensing, then signals, then control.
          </p>
          <p>
            Once a quantity is measured, a signal representing it is transmitted to something that
            indicates it, records it, or computes with it. If the response is automated, that
            computing device sends a signal onward to a final controlling device, which influences
            the quantity being measured. And so it closes.
          </p>
        </ConceptBlock>

        <Pullquote>
          If you cannot measure it, you cannot control it. Every instrument on a plant exists
          because somebody needed to know a number before they could make a decision.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>What actually gets measured</ContentEyebrow>

        <ConceptBlock
          title="The list is shorter than you would expect"
          plainEnglish="Across every industry, the quantities worth measuring come down to about nine. Learn them and you can walk onto any plant and know roughly what you are looking at."
          onSite="Walk a plant and try to name the measured variable for every instrument you pass. It is a five-minute habit that builds the mental map faster than any diagram."
        >
          <p>
            Whatever the industry — water treatment, food, pharmaceuticals, power generation, oil
            and gas — the measured quantity is usually one of these:
          </p>
          <ul>
            <li>
              <strong>Fluid pressure</strong> — in a vessel, a line, or as a differential across a
              restriction
            </li>
            <li>
              <strong>Fluid flow rate</strong> — volumetric or mass
            </li>
            <li>
              <strong>Temperature</strong> of an object or a medium
            </li>
            <li>
              <strong>Fluid volume stored in a vessel</strong> — what everyone calls level
            </li>
            <li>
              <strong>Chemical concentration</strong> — pH, conductivity, dissolved oxygen, gas
              composition
            </li>
            <li>
              <strong>Machine position, motion or acceleration</strong> — including vibration
            </li>
            <li>
              <strong>Physical dimensions</strong> of an object — thickness, width, profile
            </li>
            <li>
              <strong>Count</strong> — inventory, items produced, pulses
            </li>
            <li>
              <strong>Electrical voltage, current or resistance</strong>
            </li>
          </ul>
          <p>
            Notice that four of those — pressure, flow, temperature and level — account for the
            overwhelming majority of instruments on a typical process plant. Module 2 spends most of
            its time on exactly those four, which is why this list is worth having in your head
            before you get there.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-1-variables"
          question="A vibration probe on a large pump motor. Which measured quantity is that, on the list above?"
          options={[
            'Physical dimension',
            'Machine position, motion or acceleration',
            'Chemical concentration',
            'Count',
          ]}
          correctIndex={1}
          explanation="Vibration is periodic motion, so it sits under position, motion and acceleration. It is normally measured to predict bearing failure before it happens rather than to control anything — a good early example of measurement without control."
        />

        <SectionRule />
        <ContentEyebrow>The shape of every system</ContentEyebrow>

        <ConceptBlock
          title="Something senses, something decides, something acts — and the process reacts"
          plainEnglish="Four boxes in a ring. The measuring device senses the process, the controller decides, the final control device influences the process, and the process reacts — which the measuring device then senses again."
          onSite="When you meet an unfamiliar system, draw the four boxes and fill them in. If you cannot fill one, you have found either the thing you do not yet understand or the reason the system is not working."
        >
          <p>
            Both the measuring device and the final control device connect to a physical system —
            the <strong>process</strong>. In block form:
          </p>
          <ul>
            <li>
              The <strong>measuring device</strong> senses the process
            </li>
            <li>
              The <strong>controller</strong> decides what should happen
            </li>
            <li>
              The <strong>final control device</strong> influences the process
            </li>
            <li>
              The <strong>process</strong> reacts — and the measuring device senses that too
            </li>
          </ul>
          <p>
            The domestic thermostat is the example everyone already owns. The house is the process.
            Its internal air temperature is the quantity under control. The thermostat does two jobs
            at once — sensing and controlling — and the heater or air conditioner is the final
            control device. Its whole purpose is to hold the temperature near a desired value,
            correcting whenever it strays.
          </p>
          <p>
            Industrial systems separate those jobs into distinct devices, and give each one a name.
            Those names are the next thing to learn, and they are worth learning precisely, because
            every drawing and every conversation on a plant assumes them.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Five words that make every drawing readable"
          plainEnglish="Process, process variable, setpoint, manipulated variable, final control element. Learn these five and loop diagrams stop looking like spaghetti."
          onSite="Operators talk in these terms constantly. &lsquo;The PV is swinging&rsquo; and &lsquo;it is sat in manual&rsquo; are precise statements, not slang."
        >
          <ul>
            <li>
              <strong>Process</strong> — the physical system being measured or controlled. A steam
              boiler, a water filtration plant, a metal casting line, a refinery unit.
            </li>
            <li>
              <strong>Process variable (PV)</strong> — the specific quantity being measured.
              Pressure, level, temperature, flow, conductivity, pH, position, speed, vibration.
            </li>
            <li>
              <strong>Setpoint (SP)</strong> — the value you want the process variable to sit at.
              The target.
            </li>
            <li>
              <strong>Manipulated variable (MV)</strong> — the quantity you adjust in order to
              influence the PV. Also used for the controller&rsquo;s output signal, the one
              commanding the final control element.
            </li>
            <li>
              <strong>Final control element (FCE)</strong> — the device that receives that output
              and directly influences the process. Usually a control valve, a variable-speed motor
              drive or an electric heater.
            </li>
          </ul>
          <p>
            Two more worth having early: <strong>automatic mode</strong>, where the controller
            generates its output from the relationship between PV and SP, and{' '}
            <strong>manual mode</strong>, where that decision-making is bypassed and an operator
            sets the output directly. A loop found sitting in manual is usually telling you
            something.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-1-terms"
          question="An operator sets a furnace to hold 780 °C. The thermocouple reads 774 °C. Which is the setpoint?"
          options={[
            '774 °C',
            '780 °C',
            'The difference of 6 °C',
            'Neither — a setpoint is a device',
          ]}
          correctIndex={1}
          explanation="780 °C is the target, so it is the setpoint. 774 °C is the process variable — what is actually happening. The 6 °C between them is the error, which is what the controller acts on."
        />

        <Scenario
          title="A boiler drum, and the four boxes on a real plant"
          situation="An industrial boiler holds water in a steam drum. Too little and the tubes are damaged; too much and water carries over into the steam system. The level has to be held steady while the steam demand swings around during the day."
          whatToDo="Identify the four boxes before anything else. A level transmitter (tagged LT) senses the water level in the drum and reports it as a signal. A level indicating controller (LIC) compares that measurement against the setpoint and calculates what to do. An air-operated control valve on the feedwater line is the final control element. The process — the drum and its water — reacts to the valve position, and the transmitter senses the new level."
          whyItMatters="On an older installation both signals here may be pneumatic: 3–15 psi through metal or plastic tube, with the transmitter itself running on an air supply. Same four boxes, different signal standard. Recognising the shape rather than the technology is what lets you walk onto a plant built in 1975 and one built last year and read both."
        />

        <SectionRule />
        <ContentEyebrow>Measuring without controlling</ContentEyebrow>

        <ConceptBlock
          title="Not every instrument is part of a control loop"
          plainEnglish="Plenty of instruments only tell you something. They do not act, and they are not supposed to."
          onSite="Ask what happens automatically when the reading changes. If the answer is 'nothing, someone looks at it', it is a measurement system — and that may be exactly right for the duty."
        >
          <p>
            A <strong>measurement system</strong> senses and reports. A{' '}
            <strong>control system</strong> also acts. Both are instrumentation, and a great deal of
            what you will meet is the first kind:
          </p>
          <ul>
            <li>
              <strong>Indicators</strong> — display a measurement for a human to read. A pressure
              gauge on a receiver, a local temperature dial, a panel display.
            </li>
            <li>
              <strong>Recorders</strong> — log a measurement over time, so it can be reviewed. Once
              paper chart recorders; now almost always electronic historians. This is how you answer
              &ldquo;what was it doing at three in the morning?&rdquo;
            </li>
            <li>
              <strong>Process switches and alarms</strong> — do not report a value at all. They
              report whether a threshold has been crossed.
            </li>
          </ul>
          <p>
            That last one deserves attention, because it is a genuine design decision rather than a
            cheaper option. A level <em>switch</em> tells you the level is above or below a point. A
            level <em>transmitter</em> tells you where the level actually is. If all you need is a
            high-level trip, the switch is the better answer: fewer failure modes, a definite state,
            and nothing to re-range. If you need to see the level climbing towards that trip, only
            the transmitter will do.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Reading the labels</ContentEyebrow>

        <ConceptBlock
          title="Instrument tags are a language, and you can read them on day one"
          plainEnglish="LT, PIT, FIC. They look like a code because they are one — and it is a simple one. The first letter says what is being measured, the letters after it say what the device does about it."
          onSite="A tag number is the one completely unambiguous way to name a device. &lsquo;The transducer&rsquo; can mean two things; &lsquo;LT-104&rsquo; can only mean one."
        >
          <p>
            Every instrument on a plant carries a tag, and the letters follow a convention set out
            in <strong>ANSI/ISA-5.1, Instrumentation Symbols and Identification</strong>. The scheme
            is simple once you see it:
          </p>
          <ul>
            <li>
              The <strong>first letter</strong> is the measured variable — <strong>L</strong> level,{' '}
              <strong>P</strong> pressure, <strong>T</strong> temperature, <strong>F</strong> flow,{' '}
              <strong>A</strong> analytical, <strong>V</strong> vibration, <strong>Z</strong>{' '}
              position.
            </li>
            <li>
              The <strong>following letters</strong> say what the device does — <strong>T</strong>{' '}
              transmitter, <strong>I</strong> indicator, <strong>C</strong> controller,{' '}
              <strong>S</strong> switch, <strong>R</strong> recorder, <strong>E</strong> element,{' '}
              <strong>V</strong> valve, <strong>Y</strong> converter.
            </li>
            <li>
              <strong>Modifiers</strong> can follow — <strong>H</strong> high, <strong>L</strong>{' '}
              low, and doubled for extremes.
            </li>
          </ul>
          <p>Read a few and the pattern locks in:</p>
          <ul>
            <li>
              <strong>LT</strong> — level transmitter. Senses liquid level and reports it.
            </li>
            <li>
              <strong>FIC</strong> — flow indicating controller. A controller that also displays
              flow to the operator.
            </li>
            <li>
              <strong>PIT</strong> — pressure indicating transmitter. A pressure transmitter with a
              built-in display.
            </li>
            <li>
              <strong>PDT</strong> — pressure differential transmitter. Senses the difference in
              pressure between two points.
            </li>
            <li>
              <strong>TE</strong> — temperature element. The sensing element itself: a thermocouple,
              a thermistor, a bimetallic spring.
            </li>
            <li>
              <strong>TY</strong> — temperature converter. For instance an I/P unit in a temperature
              loop.
            </li>
            <li>
              <strong>LSHH</strong> — level switch, high-high. Detects a dangerously high level and
              typically initiates a shutdown.
            </li>
            <li>
              <strong>VSH</strong> — vibration switch, high. Detects excessive vibration on a
              machine.
            </li>
          </ul>
          <p>
            Look back at the boiler above and the tags now read as sentences: <strong>LT</strong>{' '}
            senses the drum level, <strong>LIC</strong> indicates it and controls on it. Nothing
            else needed explaining.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-1-tags"
          question="You find a device tagged FT-208 on a drawing. Without knowing anything else, what is it?"
          options={['A flow transmitter', 'A fuel tank', 'A flow totaliser', 'A field terminal']}
          correctIndex={0}
          explanation="F is the measured variable — flow. T is the function — transmitter. So FT-208 senses flow and reports it as a signal. The number identifies which one; the letters tell you what it does."
        />

        <SectionRule />
        <ContentEyebrow>Where it all connects</ContentEyebrow>

        <ConceptBlock
          title="Instruments rarely work alone — PLCs, DCS and SCADA"
          plainEnglish="The controller is often not a box on the wall any more. It is a card in a rack, or a function inside a larger system, with a screen somewhere else showing what it is doing."
          onSite="Knowing where the decision is actually made tells you where to look when a loop misbehaves — and who you need to talk to."
        >
          <p>
            A <strong>PLC (programmable logic controller)</strong> is a ruggedised industrial
            computer that takes inputs, runs logic, and drives outputs. Instruments reach it through
            input cards: analogue inputs for 4–20 mA and 0–10 V signals, digital inputs for switch
            contacts, and increasingly digital protocols such as HART or Profibus carrying both the
            measurement and diagnostics.
          </p>
          <p>
            A <strong>DCS (distributed control system)</strong> spreads control across networked
            controllers on a large plant, rather than concentrating it in one place.
          </p>
          <p>
            <strong>SCADA (supervisory control and data acquisition)</strong> sits above both. It
            gathers data from equipment that may be spread across a site or a region, presents it,
            logs it for trending, and manages alarms. Water distribution networks are the classic
            case: dozens of remote sites, one control room.
          </p>
          <p>
            The important point for now is that none of this changes the four boxes. A PLC is just
            where the deciding happens. Module 5 goes into how it decides.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The drawings you will be handed</ContentEyebrow>

        <ConceptBlock
          title="Three documents, three levels of detail — ask for the right one"
          plainEnglish="A plant is drawn three times over, each version showing more than the last. Being handed the wrong one is why some jobs take all morning to start."
          onSite="If you are wiring or fault-finding an individual loop, a P&ID will not have what you need. Ask for the loop sheet by loop number."
        >
          <p>
            The same system is documented at three zoom levels, and knowing which is which saves a
            great deal of wasted time:
          </p>
          <ul>
            <li>
              <strong>Process Flow Diagram (PFD)</strong> — the widest view. Major vessels, main
              flows, the shape of the process. Very few instruments. Useful for understanding what
              the plant is <em>for</em>.
            </li>
            <li>
              <strong>Process and Instrument Diagram (P&amp;ID)</strong> — the working drawing.
              Every instrument as a tagged bubble, every line, every valve. What it deliberately
              does <em>not</em> show is cable types, wire numbers, terminal blocks, junction boxes
              or panel details.
            </li>
            <li>
              <strong>Loop diagram</strong> (or loop sheet) — one loop, in full. Every device with
              its own terminals, wire numbers, terminal block numbers, panel identification, even
              earthing points. The only thing more detailed is the electronic schematic for a single
              instrument.
            </li>
          </ul>
          <p>
            A P&amp;ID will often not show every instrument in a loop — the loop diagram routinely
            reveals devices the P&amp;ID omitted, because they are not interesting at that zoom
            level. That is not an error in the drawing; it is the drawing doing its job.
          </p>
          <p>
            Practically: use the PFD to understand the process, the P&amp;ID to find the instrument,
            and the loop sheet to put a screwdriver on it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What the work actually looks like"
          plainEnglish="Instrument work is less about installing and more about proving. Most of the day is spent establishing whether a number can be trusted."
          onSite="The question that defines the trade is not 'does it work?' but 'how do I know it is telling the truth?'"
        >
          <p>An instrument technician&rsquo;s week tends to be some mixture of:</p>
          <ul>
            <li>
              <strong>Calibration</strong> — proving instruments against a traceable reference and
              recording as-found and as-left values. Module 6.
            </li>
            <li>
              <strong>Fault finding</strong> — walking a loop to find which link stopped telling the
              truth. Module 8.
            </li>
            <li>
              <strong>Commissioning</strong> — proving new loops end to end before a plant runs on
              them.
            </li>
            <li>
              <strong>Loop checking</strong> — confirming that a signal injected at the field end
              arrives at the control system reading what it should.
            </li>
            <li>
              <strong>Installation and termination</strong> — the wiring itself, with the screening
              and segregation the signals demand. Module 7.
            </li>
          </ul>
          <p>
            The electrical fundamentals carry over directly — safe isolation, wiring practice, and
            BS 7671 where the circuits fall under it. What is added is process knowledge and a habit
            of scepticism about readings that no standard electrical qualification teaches.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Coming from the tools</ContentEyebrow>

        <ConceptBlock
          title="What carries over from electrical work, and what does not"
          plainEnglish="Most of your existing skills transfer directly. What is new is not harder — it is a different question being asked of the same wiring."
          onSite="The habits that make you safe on an installation make you safe here. What changes is that a circuit which is electrically perfect can still be telling lies."
        >
          <p>
            Coming into instrumentation from installation work, a great deal transfers untouched:
          </p>
          <ul>
            <li>
              <strong>Safe isolation</strong> — identical discipline, and on a live process plant
              the consequences of getting it wrong are usually larger, not smaller.
            </li>
            <li>
              <strong>Wiring practice</strong> — termination quality, glanding, containment,
              segregation. All of it applies.
            </li>
            <li>
              <strong>BS 7671</strong> where the circuits fall under it — Section 557 being the part
              that speaks directly to this work.
            </li>
            <li>
              <strong>Test discipline</strong> — proving a result rather than assuming it, and
              recording what you found.
            </li>
          </ul>
          <p>What is genuinely new is a shift in the question being asked:</p>
          <ul>
            <li>
              On an installation, the question is largely{' '}
              <em>is this circuit safe and does it work?</em>
            </li>
            <li>
              On a loop, the question is <em>is this circuit telling the truth?</em> — and a loop
              can be electrically faultless while reporting a completely wrong number.
            </li>
          </ul>
          <p>
            That is why calibration, ranging and traceability take up so much of this course. A
            continuity test proves a path exists. It proves nothing at all about whether 12 mA means
            what the control system thinks it means.
          </p>
          <p>
            The other addition is process awareness. You are working on plant that is often running,
            where opening the wrong loop does not trip a breaker — it upsets a batch, spills a tank
            or shuts a line down. Module 8 covers working on live loops properly.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671 Section 557"
          clause="This section of BS 7671 applies to auxiliary circuits, except where those auxiliary circuits are covered by specific product or system standards — for example assemblies built to the appropriate part of the BS EN (IEC) 61439 series."
          meaning={
            <>
              <p>
                Instrumentation, control, metering and signalling circuits are auxiliary circuits,
                so this is the part of BS 7671 that speaks to the work in this course.
              </p>
              <p>
                Regulation 557.3.1 requires the designer to assess the required function of the
                auxiliary circuit and decide deliberately whether its supply is{' '}
                <strong>dependent</strong> on the main circuit or <strong>independent</strong> of
                it. In plain terms: does this loop die when the plant is de-energised, or does it
                keep reporting? Both can be correct. What Section 557 asks is that somebody chose.
              </p>
            </>
          }
          cite="Wording verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <CommonMistake
          title="Treating instrumentation as a smaller version of installation work"
          whatHappens="An electrician approaches a 4–20 mA loop the way they would a lighting circuit — testing continuity with a standard multimeter, breaking into terminals to prove connections, and treating any reading as either present or absent. The loop is disturbed, a live process is upset, and a two-wire transmitter is de-energised in the middle of a batch."
          doInstead="Recognise that instrumentation signals carry information, not power, and that the value matters as much as the presence. A loop calibrator that can source loop power, a HART communicator where fitted, and a loop drawing showing what each signal means are the right tools. Module 7 covers the technique in full."
        />

        <CommonMistake
          title="Assuming a reading is the truth"
          whatHappens="A control room screen shows 62 °C, so 62 °C is taken as fact and a decision is made on it. Nobody asks when the instrument was last proved, what it is ranged for, or whether the sensor is still in contact with the process."
          doInstead="Treat every reading as a claim made by a chain of devices — sensing element, transmitter, wiring, input card, scaling in software. Any one of them can be wrong while all of them appear healthy. This habit of asking 'what would make this number lie?' is most of what separates an instrument technician from someone who reads displays."
        />

        <SectionRule />
        <ContentEyebrow>How the course is built</ContentEyebrow>

        <ConceptBlock
          title="Why the modules run in this order"
          plainEnglish="The course follows the signal. It starts where the process is touched and ends where the fault is found."
          onSite="If a later module stops making sense, the answer is almost always in an earlier one. The order is not arbitrary."
        >
          <p>
            Everything in this course hangs off the chain introduced above, and the modules walk it
            in order:
          </p>
          <ul>
            <li>
              <strong>Module 1 — Introduction.</strong> The vocabulary, the loop, where
              instrumentation is used, and the standards that make a measurement defensible.
            </li>
            <li>
              <strong>Module 2 — Sensors and transducers.</strong> The devices that touch the
              process, and the word that means two different things depending on who is saying it.
            </li>
            <li>
              <strong>Module 3 — Signal types, conditioning and scaling.</strong> How a measurement
              becomes a signal, and what happens to it on the way.
            </li>
            <li>
              <strong>Module 4 — Measurement of electrical quantities.</strong> Where your existing
              electrical knowledge does the heavy lifting.
            </li>
            <li>
              <strong>Module 5 — Control loops and feedback.</strong> How the controller decides,
              and what tuning actually changes.
            </li>
            <li>
              <strong>Module 6 — Calibration methods and standards.</strong> Proving an instrument
              tells the truth, and recording that you did.
            </li>
            <li>
              <strong>Module 7 — Wiring and 4&ndash;20 mA loops.</strong> The practical work:
              screening, segregation, terminations, hazardous areas.
            </li>
            <li>
              <strong>Module 8 — Fault finding and maintenance.</strong> Everything above, applied
              backwards, under time pressure.
            </li>
          </ul>
          <p>
            Two ideas recur from here to the end, and it is worth naming them now so you notice them
            arriving. The first is <strong>uncertainty</strong> — every measurement is an estimate
            with a margin, and pretending otherwise is where most bad decisions start. The second is{' '}
            <strong>the chain</strong> — a reading is the product of several devices in series, any
            one of which can fail quietly while the rest look healthy.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-1-order"
          question="A colleague says a loop 'must be fine, I tested continuity end to end'. What has that actually proved?"
          options={[
            'That the measurement is accurate',
            'That a conductive path exists — nothing about whether the reading is correct',
            'That the transmitter is correctly ranged',
            'That the instrument has been calibrated',
          ]}
          correctIndex={1}
          explanation="Continuity proves a path. It says nothing about whether the sensing element is healthy, whether the transmitter is ranged correctly, or whether the control system is scaled to match. A loop can be electrically perfect and still report a wrong number — which is the distinction this whole course is built around."
        />

        <FAQ
          items={[
            {
              question: 'Is instrumentation only found on large industrial plant?',
              answer:
                'No. A domestic thermostat, a car engine management system and an aircraft autopilot are all measurement and control systems. Industrial plant is where the terminology, the signal standards and the job titles come from, but the principles are identical at every scale.',
            },
            {
              question: 'Do I need to be an electrician to work in instrumentation?',
              answer:
                'Not necessarily, but the overlap is large and growing. Instrument work draws on electrical fundamentals, wiring practice, safe isolation and an understanding of BS 7671 where the circuits fall under it — alongside process knowledge that is not part of a standard electrical qualification.',
            },
            {
              question: 'What is the difference between a sensor and an instrument?',
              answer:
                'A sensor is one component. An instrument is usually a complete device that senses and does something useful with what it senses — displays it, transmits it, or switches on it. Section 2.1 pulls this apart properly, including a word that means two different things depending on who is saying it.',
            },
            {
              question:
                'Why does so much of this course talk about pressure, flow, level and temperature?',
              answer:
                'Because those four account for the overwhelming majority of measurements on a process plant. Get them right and you can work almost anywhere; the more specialised measurements are variations on the same principles.',
            },
            {
              question: 'Is a control loop always automatic?',
              answer:
                'No. A controller can be put in manual, with an operator setting the output directly, and plenty of loops run that way for perfectly good reasons — during commissioning, during a fault, or because the loop has never been tuned properly. Finding a loop in manual is information worth following up.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Instrumentation is the science of automated measurement and control — and measurement comes first, because you cannot control what you cannot measure.',
            'Industry measures about nine things, and four of them — pressure, flow, temperature, level — cover most of what you will meet.',
            'Every system is the same four boxes: something senses, something decides, something acts, and the process reacts.',
            'Process, process variable, setpoint, manipulated variable, final control element. Five words that make drawings readable.',
            'A measurement system indicates; a control system closes the loop. Indicators, recorders and switches are all legitimate instrumentation without controlling anything.',
            'A switch reports a threshold; a transmitter reports a value. Choosing between them is a design decision, not a budget one.',
            'BS 7671 Section 557 treats instrumentation and control circuits as auxiliary circuits, and asks you to choose a dependent or independent supply on purpose.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 1.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 1</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Where and why instrumentation is used
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule1Section1;
