/**
 * Module 3 · Section 1 — Signal types: voltage, current, resistance, frequency
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Opens Module 3.
 *
 * 🔴 THE FRAMING. The old page listed signal types as four parallel options, as
 * though a designer picks one the way you pick a cable colour. They are not
 * parallel. They sit at different points in the chain and they fail in
 * different ways, and that is the useful thing to teach:
 *
 *   - RESISTANCE is what a sensing element produces. It cannot travel, because
 *     the cable's own resistance joins the measurement (Section 2.2).
 *   - VOLTAGE is what a thermocouple or pH electrode produces, and what a
 *     receiving device ultimately reads. It degrades along a cable.
 *   - CURRENT is what industry transmits, precisely because it does NOT
 *     degrade along a cable.
 *   - FREQUENCY is immune to amplitude corruption altogether, which is why it
 *     survives where the others do not.
 *
 * Taught that way, "why 4-20 mA" stops being a fact to memorise and becomes a
 * conclusion the learner can derive.
 *
 * NAMUR levels are included here rather than left to a wiring module, because
 * they are the logical completion of the live-zero argument Section 2.1 began:
 * if 4 mA proves the loop is alive, values OUTSIDE 4-20 mA can be made to carry
 * diagnostic meaning too.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.13, extracted to scratchpad/src/m3_signals.txt, m3_scaling.txt and the
 * NAMUR table at 13.7.7. Held in ~/Desktop/hav/instrumentation.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
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
  'Signal types: voltage, current, resistance and frequency | Instrumentation Module 3.1 | Elec-Mate';
const DESCRIPTION =
  'Why the four signal types are not parallel choices but different points in the chain, why a current survives a cable run when a voltage does not, what frequency signals are immune to, and how NAMUR levels turn out-of-range currents into diagnostics.';

const outcomes = [
  'Say which signal type belongs at which point in the measurement chain, and why',
  'Explain why resistance cannot be transmitted any distance without error',
  'Explain why a current signal is unaffected by cable resistance where a voltage is not',
  'Describe what makes a frequency signal immune to amplitude corruption',
  'Explain what a live zero buys, and why 0–20 mA was abandoned',
  'State what NAMUR levels add beyond the live zero, and what specific currents indicate',
  'Choose an appropriate signal type for a stated situation and justify it',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why can a resistance signal not be sent any useful distance?',
    options: [
      'The cable’s own resistance is in series with the sensing element, so the receiving device cannot separate the two',
      'Resistance changes with frequency',
      'Resistance signals require a separate power supply',
      'Resistance signals are too weak to detect',
    ],
    correctIndex: 0,
    explanation:
      'The instrument measures total resistance and has no way to tell the sensing element from the wiring. Module 2 Section 2 showed the consequence: 1 Ω per leg on a 100 Ω RTD is a real error. Three- and four-wire connections exist to work around it over short runs, which is why the practical answer is to convert to a transmitted signal at the sensor.',
  },
  {
    id: 2,
    question: 'What makes a 4–20 mA current signal immune to voltage drop along the cable?',
    options: [
      'The current is amplified at intervals along the run',
      'In a series loop the same current flows at every point, so cable resistance cannot change it',
      'The cable is screened',
      'The signal is digital',
    ],
    correctIndex: 1,
    explanation:
      'A series circuit carries the same current everywhere. Cable resistance changes how much voltage the supply must provide to push that current round, but not the current itself — so the value arriving at the receiver is the value the transmitter set.',
  },
  {
    id: 3,
    question: 'What is the diagnostic advantage of a live zero?',
    options: [
      'It halves the power consumption',
      'It makes the instrument more accurate',
      'A healthy instrument at minimum reading still draws 4 mA, so 0 mA can only mean a broken circuit',
      'It allows the signal to be reversed',
    ],
    correctIndex: 2,
    explanation:
      'If the scale started at 0 mA there would be no way to distinguish electrically between a broken wire and a legitimate 0% signal. Starting at 4 mA means the absence of current is unambiguous — it is a fault, not a reading.',
  },
  {
    id: 4,
    question: 'Under NAMUR signal levels, what does an output of 3.7 mA indicate?',
    options: [
      'A measurement over-range',
      'A healthy loop with a slight calibration offset',
      'A normal measurement near the bottom of range',
      'A detected sensing transducer failure, low',
    ],
    correctIndex: 3,
    explanation:
      'NAMUR assigns diagnostic meaning to currents outside 4–20 mA. Between 3.6 and 3.8 mA indicates a detected sensing transducer failure low; at or below 3.6 mA indicates the transducer has failed low. A compliant transmitter limits its output to between 3.8 mA and less than 21 mA when working properly.',
  },
  {
    id: 5,
    question: 'Why is a frequency signal resistant to corruption along a cable?',
    options: [
      'Because the information is carried in the rate of the pulses, not their amplitude — so attenuation and noise do not change the value',
      'Because frequency signals use thicker cable',
      'Because they are transmitted at higher voltage',
      'Because frequency signals are always digital',
    ],
    correctIndex: 0,
    explanation:
      'What matters is how often the transitions occur, not how large they are. A pulse train can be attenuated or have noise added and still be counted correctly, provided the receiver can distinguish the transitions at all. That is a different kind of immunity from the current loop’s.',
  },
  {
    id: 6,
    question:
      'A NAMUR-compliant control system receives a steady 21.5 mA. What should it conclude?',
    options: [
      'The process is at 110% of range',
      'The sensing transducer has failed high, and this is a fault state rather than a measurement',
      'The loop supply voltage is too high',
      'The transmitter needs re-ranging',
    ],
    correctIndex: 1,
    explanation:
      'At or above 21.0 mA indicates a sensing transducer failed high. A NAMUR-compliant system recognises these values as fault states rather than measurements, and may be programmed to act — forcing controllers to manual or initiating a shutdown.',
  },
];

const InstrumentationModule3Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 1"
        title="Signal types"
        backTo="/electrician/upskilling/instrumentation-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Four ways to carry a measurement — and they are not four equivalent choices.
        </p>

        <TLDR
          points={[
            'The four signal types are not parallel options. They sit at different points in the chain, and each fails differently.',
            'RESISTANCE is what a sensing element produces. It cannot travel, because the cable joins the measurement.',
            'VOLTAGE is what a thermocouple or pH electrode generates and what a receiver ultimately reads — and it drops along a cable.',
            'CURRENT is what industry transmits, because in a series loop the same current flows everywhere. Cable resistance cannot change it.',
            'FREQUENCY carries its information in the RATE of pulses, not their size — so attenuation and noise do not alter the value.',
            '🔴 NAMUR extends the live-zero idea: currents outside 4–20 mA are given specific diagnostic meanings, so the signal reports faults as well as measurements.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Not four equal choices</ContentEyebrow>

        <ConceptBlock
          title="Each signal type belongs at a different point in the chain"
          plainEnglish="You do not choose between them the way you choose a cable size. Each one turns up where the physics puts it."
          onSite="Ask where in the chain you are standing and the signal type is usually already decided for you."
        >
          <p>
            The old way of teaching this listed four signal types side by side as though a designer
            picks one. That framing hides the useful structure. Walk the chain from Module 1 Section
            1 and each type appears where it has to:
          </p>
          <ul>
            <li>
              <strong>At the sensing element</strong> — whatever physics produces. An RTD gives a{' '}
              <strong>resistance</strong>. A thermocouple or pH electrode gives a{' '}
              <strong>voltage</strong>. A strain gauge gives a resistance. None of these is a
              choice; it is what the device does.
            </li>
            <li>
              <strong>Across the plant</strong> — a <strong>current</strong>, almost always, for the
              reason this section builds towards.
            </li>
            <li>
              <strong>At the receiving device</strong> — a <strong>voltage</strong> again, because a
              converter reads voltage. The current is passed through a precision resistor to produce
              it.
            </li>
            <li>
              <strong>Wherever counting beats measuring</strong> — a <strong>frequency</strong> or
              pulse train, from turbine meters, encoders and anything that rotates or repeats.
            </li>
          </ul>
          <p>
            So a single measurement can be all four in turn: a resistance at the thermowell, a
            voltage inside the transmitter, a current down the field cable, and a voltage again
            across a sense resistor at the input card. Understanding why each conversion happens is
            more useful than memorising a list.
          </p>
        </ConceptBlock>

        <Pullquote>
          One measurement, four signal types, in the space of fifty metres. Each conversion happens
          because the previous form could not survive the next leg of the journey.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Why resistance stays put</ContentEyebrow>

        <ConceptBlock
          title="A resistance signal cannot leave the sensor"
          plainEnglish="To measure a resistance you have to pass current through it and measure the voltage — and the cable is part of that circuit whether you like it or not."
          onSite="This is why head-mounted transmitters exist. They convert at the sensor so the fragile part of the chain is centimetres rather than metres."
        >
          <p>
            Module 2 Section 2 covered this from the RTD end. From the signal end the point
            generalises:{' '}
            <strong>
              any resistance-based measurement includes the resistance of everything between the
              instrument and the element
            </strong>
            .
          </p>
          <p>
            The receiving instrument has no way to separate the two. It sees a total and attributes
            all of it to the sensor. That is why 1 Ω per leg on a 100 Ω RTD is a genuine error, why
            three-wire and four-wire connections exist, and why the error moves with ambient
            temperature rather than staying a fixed offset you could calibrate out.
          </p>
          <p>
            The practical conclusion is the one worth carrying: <strong>convert early</strong>. A
            head-mounted transmitter turns resistance into 4&ndash;20 mA within the sensor assembly,
            so the resistance signal travels a few centimetres and the robust signal travels the
            distance. The question &ldquo;how long can an RTD cable be?&rdquo; usually has the wrong
            shape — the better question is why the resistance is travelling at all.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Why a current and not a voltage</ContentEyebrow>

        <ConceptBlock
          title="The same current flows at every point in a series loop"
          plainEnglish="Send a voltage and every metre of cable takes a little of it. Send a current and the cable cannot touch it."
          onSite="A loop reading correctly at the transmitter and wrong at the panel is not a current problem. Look at the sense resistor or the input card."
        >
          <p>
            This is the single most important idea in the module, and it is one an electrician
            already half knows from Kirchhoff.
          </p>
          <p>
            <strong>Send a voltage.</strong> The cable has resistance, and the receiving device
            draws some current through it, so a portion of the voltage is dropped along the way.
            What arrives is smaller than what was sent, by an amount depending on cable length,
            conductor size, temperature and the quality of every termination. Two identical
            instruments on different cable runs give different answers.
          </p>
          <p>
            <strong>Send a current.</strong> In a series loop the same current flows at every point.
            Cable resistance changes how much voltage the supply must produce to drive that current
            around the circuit — but not the current itself. Within the loop&rsquo;s voltage budget,
            the value arriving is exactly the value sent.
          </p>
          <p>
            The consequence is worth stating in the terms of the trade: a 4&ndash;20 mA measurement
            is <strong>indifferent to cable length</strong>, up to the point where the supply can no
            longer push 20 mA around the total resistance. Beyond that it does not degrade
            gracefully — it stops reaching 20 mA at all, which is a different and much more visible
            failure than a voltage signal quietly reading low.
          </p>
          <p>
            Voltage signals do still exist — 0&ndash;10 V and 1&ndash;5 V — and they are fine over
            short runs inside a panel or on building services equipment. Section 2 of this module
            shows that a 1&ndash;5 V signal is very often a 4&ndash;20 mA loop read across a 250
            &Omega; resistor, which is the same signal wearing different clothes for the last few
            centimetres of its journey.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-1-current"
          question="A 4–20 mA loop runs 400 metres. What does the extra cable resistance do to the measured value?"
          options={[
            'Nothing to the value — it increases the voltage the supply must provide, and only matters if the supply runs out of headroom',
            'It halves the resolution',
            'It reduces the current in proportion to the length',
            'It adds noise proportional to the distance',
          ]}
          correctIndex={0}
          explanation="The current is the same at every point in a series loop, so the value is unaffected. What the extra resistance consumes is supply voltage. The failure mode, if the run is too long or the loop load too high, is that the supply cannot drive 20 mA — so the signal saturates below full scale rather than reading progressively low."
        />

        <SectionRule />
        <ContentEyebrow>Counting instead of measuring</ContentEyebrow>

        <ConceptBlock
          title="Frequency signals are immune to something the others are not"
          plainEnglish="If the information is in how often something happens rather than how big it is, then making it smaller does not change the answer."
          onSite="Turbine meters, encoders and anything rotating tend to give pulses. Count them and you have the measurement."
        >
          <p>
            A frequency or pulse signal carries its information in the <strong>rate</strong> of
            transitions rather than their amplitude. A turbine flowmeter produces a pulse per blade
            passing; an encoder produces pulses per increment of movement.
          </p>
          <p>That difference buys a specific immunity:</p>
          <ul>
            <li>
              <strong>Attenuation does not matter</strong> — a pulse arriving smaller is still a
              pulse, provided the receiver can still detect the transition.
            </li>
            <li>
              <strong>Amplitude noise does not matter</strong> — noise riding on the signal changes
              its size, not the count.
            </li>
            <li>
              <strong>Resolution is limited by counting, not conversion.</strong> There is no
              analogue-to-digital step to lose information in, which is a genuine advantage over the
              route described in Module 2 Section 5.
            </li>
          </ul>
          <p>
            What it does not buy is immunity to everything. A frequency signal is vulnerable to
            anything that <em>adds or removes transitions</em> — electrical interference producing
            false counts, or a threshold set so that genuine pulses are missed. It fails by counting
            wrongly rather than by reading low, and a count that is wrong is often wrong
            cumulatively.
          </p>
          <p>
            That is why totalised quantities from pulse signals deserve care: an error in a rate
            measurement is transient, but an error in a count is permanent until somebody resets it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-1-frequency"
          question="Which failure mode is a pulse signal MORE vulnerable to than a 4–20 mA signal?"
          options={[
            'Loss of loop supply',
            'Electrical interference creating false transitions, which are counted as real pulses',
            'Cable resistance changing with temperature',
            'Voltage drop along the cable',
          ]}
          correctIndex={1}
          explanation="A pulse signal ignores amplitude, so attenuation and voltage drop are irrelevant. What it cannot ignore is anything that looks like a transition — induced noise can add counts that never happened, and on a totaliser those counts accumulate permanently."
        />

        <SectionRule />
        <ContentEyebrow>Measuring the signal itself</ContentEyebrow>

        <ConceptBlock
          title="How to read a loop current without stopping it"
          plainEnglish="Breaking a loop to put a meter in series is the obvious approach and often the wrong one — on a two-wire transmitter it kills the instrument."
          onSite="Look for the provision that was designed in before improvising. Many loops already have a way to be measured without interruption."
        >
          <p>
            Module 2 Section 1 established that a two-wire transmitter is powered by the loop it
            signals on. The consequence for measurement is direct: breaking the circuit to insert a
            milliammeter de-energises the instrument, and on a running process that is a disturbance
            rather than a test.
          </p>
          <p>Four approaches, each with a different trade:</p>
          <ul>
            <li>
              <strong>A standard milliammeter in series.</strong> Accurate and universally
              available, but requires opening the loop.
            </li>
            <li>
              <strong>A clamp-on milliammeter.</strong> Reads the current without interrupting
              anything, which on a live process is a decisive advantage. Needs an instrument capable
              of resolving milliamps rather than a general-purpose clamp meter built for load
              currents.
            </li>
            <li>
              <strong>Test diodes.</strong> Some installations include diodes specifically so a
              meter can be connected across them and read the loop current without the circuit ever
              being opened.
            </li>
            <li>
              <strong>Shunt resistors.</strong> A precision resistor in the loop develops a small
              voltage proportional to the current, which can be measured with an ordinary voltmeter.
            </li>
          </ul>
          <p>
            The last two matter because they are <em>designed in</em>. Finding test provision on a
            loop tells you somebody expected it to be measured, and using it is preferable to
            inventing a method. Module 7 covers the technique properly; the point here is that the
            signal type dictates how you may interrogate it.
          </p>
          <p>
            One more consequence worth carrying: a voltage measurement across a known resistance is
            often the safest way to establish loop current, and it is why the 250 &Omega;
            relationship in the next section pays off at a terminal block.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-1-measure"
          question="You need to check the current on a live two-wire loop feeding a running control loop. Which approach disturbs the process least?"
          options={[
            'Disconnect the transmitter and simulate the signal',
            'Switch the controller to manual and then break the loop',
            'Use a clamp-on milliammeter, or measure across designed-in test provision',
            'Break the loop and insert a milliammeter in series',
          ]}
          correctIndex={2}
          explanation="Breaking a two-wire loop de-energises the transmitter as well as interrupting the signal. A clamp-on milliammeter, or a voltage measurement across designed-in test diodes or a shunt resistor, obtains the same information without opening the circuit. Putting the controller in manual first is sensible practice, but it does not prevent the transmitter losing power."
        />

        <SectionRule />
        <ContentEyebrow>Making the signal report faults</ContentEyebrow>

        <ConceptBlock
          title="The live zero, and why 0–20 mA was abandoned"
          plainEnglish="Starting the scale above zero means that no current at all is unambiguous — it can only be a fault."
          onSite="Zero milliamps is never a reading. It is a broken circuit, a dead transmitter or a lost supply."
        >
          <p>
            Module 2 Section 1 introduced the live zero. It is worth stating precisely now, because
            the rest of this section is built on it.
          </p>
          <p>
            Suppose the scale started at 0 mA. A loop carrying no current would then mean two
            entirely different things &mdash; the process is at the bottom of its range, or the
            cable is cut &mdash; and{' '}
            <strong>there would be no electrical difference between them whatsoever</strong>. No
            amount of cleverness at the receiving end can separate two states that produce identical
            readings.
          </p>
          <p>
            Starting at 4 mA removes the ambiguity completely. A healthy instrument reporting 0 per
            cent still draws its 4 mA, so an absence of current can only be a broken circuit, a dead
            transmitter or a lost supply. It is never a measurement.
          </p>
          <p>
            The lower-range value is therefore doing two jobs at once: carrying the measurement
            during normal operation, and carrying a fault indication when there is no measurement to
            carry. One pair of wires, two kinds of information, and no extra hardware to achieve it.
          </p>
          <p>
            That is a genuinely elegant piece of design, and the NAMUR standard takes the same idea
            considerably further.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 NAMUR levels — assigning meaning outside the range"
          plainEnglish="If 0 mA can mean 'broken', then other currents outside 4–20 mA can be made to mean other specific faults."
          onSite="A transmitter sitting at 3.7 mA is not slightly under-ranged. It is telling you something specific, and a compliant system will treat it as a fault."
        >
          <p>
            The <strong>NAMUR signal standard</strong> defines specific diagnostic meanings for
            currents lying outside the 4&ndash;20 mA range:
          </p>
          <ul>
            <li>
              <strong>Output ≤ 3.6 mA</strong> — sensing transducer failed low
            </li>
            <li>
              <strong>3.6 mA &lt; output &lt; 3.8 mA</strong> — sensing transducer failed (detected)
              low
            </li>
            <li>
              <strong>3.8 mA ≤ output &lt; 4.0 mA</strong> — measurement under-range
            </li>
            <li>
              <strong>20.5 mA ≤ output &lt; 21.0 mA</strong> — measurement over-range
            </li>
            <li>
              <strong>Output ≥ 21.0 mA</strong> — sensing transducer failed high
            </li>
          </ul>
          <p>
            <strong>
              A healthy NAMUR-compliant transmitter will never leave the band from 3.8 mA up to (but
              not including) 21 mA.
            </strong>{' '}
            It is built so that it cannot. Anything outside that band is therefore not a reading
            taken at an unusual moment — it is a statement that something in the transmitter or the
            wiring has failed.
          </p>
          <p>
            The receiving end matters as much as the transmitting end. NAMUR-compliant control
            systems recognise these values as fault states rather than measurements, and may be
            programmed to act — forcing controllers into manual, initiating automatic shutdown, or
            taking other defined action.
          </p>
          <p>
            Notice the distinction the standard draws, because it is a useful one:{' '}
            <strong>under-range is not the same as failed</strong>. A measurement slightly below its
            configured LRV is a legitimate reading of a process that has gone below where somebody
            expected; a transmitter reporting 3.5 mA has decided its own sensor is broken. Those
            deserve different responses, and the standard makes them distinguishable on a single
            pair of wires.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Reverse action — when 4 mA is the top of the range"
          plainEnglish="Nothing says the low current must mean the low value. Some devices are deliberately configured the other way round, and the reason is usually safety."
          onSite="Check the action before concluding a loop is inverted or faulty. Reverse-acting devices are deliberate and they are on the drawing."
        >
          <p>
            It is natural to assume 4 mA means 0% and 20 mA means 100%. That is the common case, not
            a law, and instruments exist that are deliberately <strong>reverse-acting</strong>: 4 mA
            represents the top of the range and 20 mA the bottom.
          </p>
          <p>
            The per-unit method handles this without modification — you simply put the larger value
            in as LRV<sub>out</sub> and the smaller as URV<sub>out</sub>, and the arithmetic takes
            care of itself. That is another reason to learn the method rather than a fixed formula.
          </p>
          <p>
            The reason reverse action exists is worth understanding, because it connects to the
            failure-direction argument running through this course. Consider a control valve whose
            safe position on loss of signal is <em>closed</em>. Arrange the loop so that a falling
            current closes the valve, and a broken wire — which produces no current at all — drives
            the valve to its safe state automatically.
          </p>
          <p>
            Module 2 Section 2 made the same argument about thermocouple burnout direction, and the
            live zero earlier in this section is a third version of it. One principle, three
            costumes:{' '}
            <strong>arrange things so the failure and the safe condition point the same way</strong>
            .
          </p>
          <p>
            The practical warning is that a reverse-acting loop looks broken to anyone who does not
            know it is reverse-acting. Before concluding that a signal is inverted, check whether it
            is supposed to be.
          </p>
        </ConceptBlock>

        <Scenario
          title="A reading that is out of range, and a reading that is broken"
          situation="Two temperature loops on the same plant are both reporting below their lower range value. One sits steadily at 3.9 mA; the other is pinned at 3.5 mA. An operator reports both as 'reading low' and asks for both instruments to be checked."
          whatToDo="Treat them as two different problems, because NAMUR says they are. The loop at 3.9 mA is under-range — the transmitter is healthy and honestly reporting a process below its configured LRV, so the question is whether the range is right for the duty. The loop at 3.5 mA is below the 3.6 mA threshold: that transmitter has diagnosed its own sensing element as failed, and the reading is not a measurement at all."
          whyItMatters="Both look like 'low' on a screen that only shows engineering units, and both would be chased identically by someone who does not know the levels. Reading the actual milliamp value separates a ranging conversation from a failed sensor — and on a NAMUR-compliant system, the second one may already have driven the controller to manual without anybody noticing why."
        />

        <SectionRule />
        <ContentEyebrow>Turning current into meaning</ContentEyebrow>

        <ConceptBlock
          title="Per unit — the one calculation that converts anything to anything"
          plainEnglish="Convert whatever you have into a fraction between 0 and 1, then convert that fraction into whatever you want. Two steps, and it works for every linear instrument."
          onSite="Learn this once and you will never again need to remember a formula for a particular instrument. It is the same sum every time."
        >
          <p>
            Module 2 Section 1 established LRV, URV and span. This is how you actually use them, and
            it is worth learning as a method rather than as a set of formulas.
          </p>
          <p>
            Any linear instrument can be described as two fractions hinged together. The hinge is
            the <strong>per unit</strong> value — a number from 0 to 1 that says how far up its own
            range the signal has travelled, without reference to what that range measures:
          </p>
          <p>
            <strong>
              per unit = (input &minus; LRV<sub>in</sub>) ÷ (URV<sub>in</sub> &minus; LRV
              <sub>in</sub>)
            </strong>
          </p>
          <p>
            <strong>
              output = per unit × (URV<sub>out</sub> &minus; LRV<sub>out</sub>) + LRV<sub>out</sub>
            </strong>
          </p>
          <p>
            Work a real one. A level transmitter is ranged 400 to 2100 mm, output 4&ndash;20 mA.
            What current corresponds to a level of 820 mm?
          </p>
          <ul>
            <li>
              <strong>Step one &mdash; convert to per unit.</strong> The input span is 2100 &minus;
              400 = 1700 mm. (820 &minus; 400) ÷ 1700 = <strong>0.2471 per unit</strong>, or 24.71%.
            </li>
            <li>
              <strong>Step two &mdash; convert per unit to output.</strong> The output span is 20
              &minus; 4 = 16 mA. (0.2471 &times; 16) + 4 = <strong>7.953 mA</strong>.
            </li>
          </ul>
          <p>
            That is the whole technique. It runs backwards just as well — given a current, subtract
            4, divide by 16 to get per unit, then scale into engineering units.
          </p>
          <p>
            Its real value is that it does not care what the two ends are. Millimetres to milliamps,
            milliamps to percent, percent to psi on an I/P converter, degrees to counts on a PLC
            input. Every one of those is the same two steps with different numbers, which is why{' '}
            <strong>thinking in per unit</strong> is worth more than memorising any individual
            conversion.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-1-perunit"
          question="A pressure transmitter is ranged 0–250 bar with a 4–20 mA output. It is reading 13.2 mA. What is the pressure?"
          options={['132 bar', '165 bar', '206 bar', '143.75 bar']}
          correctIndex={3}
          explanation="Per unit = (13.2 − 4) ÷ 16 = 0.575. Pressure = 0.575 × (250 − 0) + 0 = 143.75 bar. Note that reading 13.2 mA as though it were a straight percentage of 20 mA would give 66%, or 165 bar — which is the error the live zero invites if you forget to subtract it."
        />

        <SectionRule />
        <ContentEyebrow>Which to use when</ContentEyebrow>

        <ConceptBlock
          title="Choosing a signal type, when the choice is genuinely yours"
          plainEnglish="Most of the time the physics or the existing system decides. Where it does not, the questions are distance, what the signal has to survive, and what is at the other end."
          onSite="If you are choosing, you are usually choosing between a current loop and a pulse train. Everything else has already been decided by the sensor."
        >
          <p>
            <strong>Use a current</strong> for essentially all analogue field measurement. Immune to
            cable resistance, with a live zero and universal compatibility. The default, and it
            should take a reason to depart from it.
          </p>
          <p>
            <strong>Use a voltage</strong> where the run is short and inside controlled space —
            within a panel, between adjacent equipment, or on building-services devices designed
            around 0&ndash;10 V. Accept that it degrades with distance.
          </p>
          <p>
            <strong>Use a frequency or pulse</strong> where the sensing principle produces one
            naturally, and particularly where you want to <em>total</em> rather than to read a rate.
            Counting pulses gives an accumulated quantity without the drift an integrated analogue
            signal would collect.
          </p>
          <p>
            <strong>Keep resistance local.</strong> If a sensing element produces a resistance,
            convert it as close to the element as practical.
          </p>
          <p>
            And one constraint that overrides all of the above:{' '}
            <strong>what the receiving device accepts</strong>. An input card is built for a signal
            type, and the elegant choice is worthless if there is nothing at the other end to
            receive it.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Reading a milliamp value as a percentage of range without checking it is in band"
          whatHappens="A technician measures 3.7 mA, calculates that as a slightly negative percentage of range, and reports the process as sitting just below zero. In fact the transmitter is signalling a detected sensor failure, and the process value is unknown."
          doInstead="Check the value is inside 4–20 mA before converting it to engineering units at all. Outside that band the number is not a measurement, and on a NAMUR-compliant instrument it carries a specific meaning worth looking up. Converting a fault code into a process value produces a confident answer about nothing."
        />

        <CommonMistake
          title="Extending a voltage signal because the cable was already there"
          whatHappens="A 0–10 V sensor is reused on a longer run because spare cores were available. The reading is plausible, consistently reads a little low, and is calibrated out at the receiving end. Twelve months later it has drifted again, because the cable resistance changed with the seasons."
          doInstead="Recognise that a voltage signal shares the RTD problem — the cable is part of the measurement. Calibrating out the drop hides it at one temperature and one cable condition. Either convert to a current at the sensor, or accept and document that the measurement is distance-dependent."
        />

        <ConceptBlock
          title="What this section sets up for the rest of the module"
          plainEnglish="Knowing which signal you have tells you what can go wrong with it — and the rest of Module 3 is about exactly those things."
          onSite="Name the signal type first. It narrows the fault list before you touch anything."
        >
          <p>
            The four types fail differently, and the remaining sections take those failures in turn:
          </p>
          <ul>
            <li>
              <strong>Section 3.2</strong> — the standard ranges in detail, and what a device
              actually expects at its terminals.
            </li>
            <li>
              <strong>Section 3.3</strong> — conditioning: filtering a noisy signal, isolating one
              that shares an unwanted path, and amplifying one too small to use.
            </li>
            <li>
              <strong>Section 3.4</strong> — scaling and the errors that enter at each conversion.
              The per-unit method above is the tool that section leans on.
            </li>
            <li>
              <strong>Section 3.5</strong> — signal integrity: noise, ground loops and screening,
              which is where a current loop&rsquo;s immunity finally runs out.
            </li>
          </ul>
          <p>
            One idea binds them, and it is the same one Module 2 closed on. A current loop is immune
            to cable resistance but not to <em>everything</em>. A pulse train is immune to amplitude
            but not to spurious transitions. Every signal type has a specific vulnerability, and
            knowing which one you are carrying tells you what to suspect.
          </p>
          <p>
            So the habit from Module 2 transfers directly:{' '}
            <strong>name what the signal depends on, and you know what will corrupt it.</strong>
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Why 4 mA and 20 mA specifically?',
              answer:
                'The 4 mA lower end gives a live zero and, on a two-wire transmitter, enough current to power the electronics — Module 2 Section 1 covered that constraint. The 20 mA upper end is a practical compromise between a signal robust enough to be measured easily and a current low enough to be safe and economical to supply.',
            },
            {
              question: 'Can I measure loop current without breaking the loop?',
              answer:
                'Yes — a clamp-on milliammeter reads it without interruption, and some installations provide test diodes or shunt resistors specifically so a measurement can be taken without opening the circuit. That matters more than it sounds, because breaking a two-wire loop de-energises the transmitter.',
            },
            {
              question: 'Is a 1–5 V signal a voltage signal or a current signal?',
              answer:
                'Usually a current signal being read as a voltage. Passing 4–20 mA through a 250 Ω resistor produces 1–5 V, so the run is a current loop and only the final few centimetres are a voltage. Recognising that saves confusion when a drawing shows both.',
            },
            {
              question: 'What happens if the loop supply cannot drive 20 mA?',
              answer:
                'The signal saturates below full scale — it simply cannot reach 20 mA. That is a load problem rather than a measurement problem, caused by total loop resistance exceeding what the supply voltage can push against. Module 7 covers loop load calculations.',
            },
            {
              question: 'Do all transmitters follow NAMUR levels?',
              answer:
                'No. It is a defined standard that compliant transmitters and control systems implement deliberately. A non-compliant transmitter may simply saturate at its limits without conveying anything about why. Knowing which you have changes what an out-of-band reading means.',
            },
            {
              question: 'Why does a pulse totaliser need resetting?',
              answer:
                'Because it accumulates. An error in a rate reading passes; an error in a count persists in the total until somebody clears it. That is the trade for having a running quantity rather than an instantaneous one.',
            },
          ]}
        />

        <CommonMistake
          title="Measuring a current loop with a voltmeter across the transmitter"
          whatHappens={
            <>
              <p>
                This one catches people who have spent their career on voltage systems. In a current
                loop the information is in the current, and the voltage at any point in the loop is
                whatever it needs to be to push that current through the resistance in front of it.
              </p>
              <p>
                The voltage across a two-wire transmitter is what is left after every load in the
                loop has taken its share, so it varies with the number of devices, the cable run and
                the supply. Two identical loops reading the same value can show very different
                terminal voltages, and one loop can show the same terminal voltage at two different
                readings.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Measure the current in series, or measure the voltage across a known resistor and
                convert. Across a 250 &Omega; resistor, 4&ndash;20 mA appears as 1&ndash;5 V, and
                each 1 V corresponds to 4 mA. That is a genuine measurement of the signal.
              </p>
              <p>
                A reading taken across the transmitter terminals tells you about the loop supply and
                the burden in front of it &mdash; useful when you are chasing a loop that will not
                drive to 20 mA, but it is not the measurement.
              </p>
            </>
          }
        />

        <KeyTakeaways
          points={[
            'The four signal types are not parallel options — each belongs at a particular point in the chain, and one measurement may be all four in turn.',
            'Resistance cannot travel: the cable joins the measurement and the instrument cannot separate them. Convert at the sensor.',
            'A current is immune to cable resistance because the same current flows everywhere in a series loop. That is the whole argument for 4–20 mA.',
            'A current loop fails visibly — it saturates below full scale when the supply runs out of headroom — rather than quietly reading low as a voltage does.',
            'Frequency signals carry information in the RATE of transitions, so attenuation and amplitude noise do not change the value.',
            'But a pulse signal fails by miscounting, and on a totaliser those errors accumulate permanently.',
            'A live zero means 0 mA can only be a fault: there is no way to confuse a broken wire with a legitimate 0% reading.',
            '🔴 NAMUR extends this — ≤3.6 mA failed low, 3.6–3.8 detected failure low, 3.8–4.0 under-range, 20.5–21.0 over-range, ≥21.0 failed high.',
            'Under-range and failed are different states deserving different responses, and NAMUR makes them distinguishable on one pair of wires.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 3.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 3</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Standard signal ranges
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule3Section1;
