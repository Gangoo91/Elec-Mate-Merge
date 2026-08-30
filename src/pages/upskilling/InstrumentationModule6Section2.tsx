/**
 * Module 6 · Section 2 — Calibration equipment and reference standards
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. Module 1 Section 4 owns the THEORY of standards: the two
 * kinds, intrinsic standards, the traceability chain, uncertainty growing down
 * it, how much better your kit must be, UKAS and ISO/IEC 17025. This page must
 * NOT re-teach any of that. It owns the KIT — what the instruments actually
 * are, what each one can and cannot establish, and how to choose.
 *
 * 🔴 THE CENTREPIECE is the loop calibrator's three modes, because the
 * distinction is genuinely confusing and it maps exactly onto Module 4
 * Section 1's active/passive source material:
 *
 *   READ     — passive load, measures the current something else is driving
 *   SOURCE   — ACTIVE source: supplies both the information AND the energy.
 *              The loop's own supply is not used.
 *   SIMULATE — regulates the current while relying on the loop's supply, i.e.
 *              behaves exactly like a 2-wire loop-powered transmitter (passive)
 *
 * 🔴 THE SECOND BIG IDEA, and it is 6.1's argument one level down: SIMULATING
 * an input tests everything downstream of the sensor and says nothing about the
 * sensor. A decade box in place of an RTD proves the transmitter converts
 * resistance correctly; it proves nothing about the RTD.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.7.6 (loop calibrators — read, source and simulate modes, the calibrator
 * as active source versus passive load, and simulating 4/8/12/16/20 mA to test
 * cable and receiving instruments) and §2.11 / footnote material on triple
 * points as calibration standards. Brand names in the source are omitted per
 * house style. Extracted to scratchpad/src/m6_loopcal.txt.
 * Held in ~/Desktop/hav/instrumentation.
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Calibration equipment and reference standards | Instrumentation Module 6.2 | Elec-Mate';
const DESCRIPTION =
  'The kit that sits at the bottom of the traceability chain — a loop calibrator’s read, source and simulate modes, pressure and temperature standards, and why simulating an input proves nothing about the sensor.';

const outcomes = [
  '🔴 Distinguish a loop calibrator’s read, source and simulate modes',
  'Say which mode makes the calibrator an active source and which a passive load',
  'Choose the right mode for a given job on a live or dead loop',
  'Explain what a deadweight tester realises pressure from',
  'Say why an ice bath is a temperature reference without being calibrated',
  '🔴 Explain why simulating a sensor input tests the transmitter but not the sensor',
  'State what must be true of the standard before any calibration is valid',
  'Decide what equipment a given calibration actually requires',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A loop calibrator is set to READ and connected in a working 4–20 mA loop. What is it doing electrically?',
    options: [
      'Acting as a passive load, measuring the current something else is driving',
      'Simulating a transmitter',
      'Providing loop power to the transmitter',
      'Supplying the loop current',
    ],
    correctIndex: 0,
    explanation:
      'In read mode the calibrator is simply an ammeter in the loop — a passive load. The transmitter still regulates the current and the loop supply still provides the energy, exactly as Module 4 Section 1 described for any series ammeter.',
  },
  {
    id: 2,
    question: '🔴 What does SOURCE mode do that SIMULATE mode does not?',
    options: [
      'It measures more accurately',
      'It provides the energy as well as the information — the loop’s own supply is not used',
      'It works only on digital instruments',
      'It applies a physical stimulus',
    ],
    correctIndex: 1,
    explanation:
      'In source mode the calibrator is an active source, driving current round the circuit under its own power. In simulate mode it regulates current while relying on an external supply, which is precisely how a two-wire loop-powered transmitter behaves.',
  },
  {
    id: 3,
    question:
      'You need to check a controller and its wiring with the transmitter disconnected, and there is no loop supply available at the panel. Which mode?',
    options: ['READ', 'SIMULATE', 'SOURCE', 'Any of them'],
    correctIndex: 2,
    explanation:
      'With no supply in the circuit, something has to provide the energy. Source mode makes the calibrator an active current source, so it drives the loop on its own. Simulate mode would do nothing, because it depends on a supply that is not there.',
  },
  {
    id: 4,
    question:
      'A two-wire transmitter is removed and the calibrator is put in its place in SIMULATE mode. What is being tested?',
    options: [
      'The process connection',
      'The loop power supply only',
      'The transmitter',
      'Everything downstream of the transmitter — the cable, the input, the display and the control system',
    ],
    correctIndex: 3,
    explanation:
      'The calibrator takes the transmitter’s place and behaves like it, so stepping through 4, 8, 12, 16 and 20 mA exercises the cable and every receiving instrument. What it cannot test is the transmitter, because the transmitter is sitting on the bench.',
  },
  {
    id: 5,
    question: 'Why is a deadweight tester regarded as a primary pressure standard?',
    options: [
      'Because it realises pressure from known mass acting over a known area, rather than by comparison with another gauge',
      'Because it is calibrated annually',
      'Because it is used at national laboratories',
      'Because it is more accurate than a digital gauge',
    ],
    correctIndex: 0,
    explanation:
      'Pressure is force per unit area, so a known mass on a piston of known area produces a pressure that can be calculated rather than compared. Local gravity has to be accounted for, which is exactly the kind of correction that distinguishes a realisation from a reading.',
  },
  {
    id: 6,
    question: 'Why can a properly made ice bath be used as a temperature reference?',
    options: [
      'Because it is calibrated before use',
      'Because a mixture of ice and water at atmospheric pressure sits at a known temperature by physics',
      'Because ice is always at −5 °C',
      'Because water freezes at a different temperature each time',
    ],
    correctIndex: 1,
    explanation:
      'It is a physical realisation, not a comparison. So long as ice and water coexist, the mixture holds essentially 0 °C, which is why it works without any certificate. It depends entirely on being made properly — a slush of finely divided ice, not a few cubes floating in water.',
  },
  {
    id: 7,
    question:
      '🔴 An RTD transmitter is checked by disconnecting the RTD and applying known resistances from a decade box. What has been established?',
    options: [
      'That the installation is correct',
      'That the whole measurement is accurate',
      'That the transmitter converts resistance to output correctly — and nothing at all about the RTD',
      'That the RTD is within tolerance',
    ],
    correctIndex: 2,
    explanation:
      'Simulating an input tests everything after the point of simulation and nothing before it. The transmitter has been calibrated; the sensor has been excluded from the test entirely. A drifted or damaged RTD would pass this check unnoticed.',
  },
  {
    id: 8,
    question: 'Before using any calibrator, what must be true of it?',
    options: [
      'It must be capable of the full range of the instrument',
      'It must have been used recently',
      'It must be the same brand as the instrument',
      'Its own calibration must be current and traceable, and it must be substantially better than the instrument it is checking',
    ],
    correctIndex: 3,
    explanation:
      'A calibration is a comparison, so it is only as good as the thing compared against. Module 1 Section 4 covered both requirements — an unbroken traceability chain, and a standard whose uncertainty is small enough relative to the tolerance being checked.',
  },
];

const InstrumentationModule6Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 2"
        title="Equipment and standards"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Module 1 covered where a standard gets its authority. This is the kit that sits at the
          bottom of that chain, in your hands.
        </p>

        <TLDR
          points={[
            'Module 1 Section 4 owns the theory of standards and traceability. This section is the equipment.',
            'A loop calibrator does three different things, and confusing them wastes a lot of time.',
            'READ — a passive load, measuring current something else is driving.',
            '🔴 SOURCE — an active source, supplying the energy as well as the information. The loop supply is not used.',
            '🔴 SIMULATE — regulates the current while relying on an external supply, exactly like a two-wire transmitter.',
            'So source and simulate map onto Module 3 Section 2’s active and passive outputs — the same distinction, in a test instrument.',
            'Simulate mode replaces the transmitter and exercises the cable, the input card, the display and the control system.',
            'A deadweight tester realises pressure from known mass over a known area, so it is calculated rather than compared.',
            'An ice bath is a temperature reference by physics — ice and water coexisting hold essentially 0 °C, with no certificate involved.',
            '🔴 Simulating an input tests everything after the point of simulation and nothing before it.',
            '🔴 So a decade box in place of an RTD calibrates the transmitter and excludes the sensor entirely.',
            'A calibration is only as good as the standard, so the standard’s own certificate must be current and its uncertainty small enough.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>The instrument you will use most</ContentEyebrow>

        <ConceptBlock
          title="🔴 A loop calibrator does three different jobs"
          plainEnglish="It can watch a loop, drive a loop, or pretend to be a transmitter in a loop. Choosing the wrong one is the commonest way to waste an hour."
          onSite="Decide first whether the loop already has power and a transmitter. That answers which mode you need."
        >
          <p>
            The loop calibrator exists specifically for 4&ndash;20 mA work, and its usefulness comes
            from doing three quite different things with the same two terminals.
          </p>
          <p>
            The distinction between them is electrical, and it is one Module 3 Section 2 already
            established in another context &mdash; whether a device is an{' '}
            <strong>active source</strong> or a <strong>passive load</strong>.
          </p>
          <AppendixTable
            caption="The three modes"
            headers={['Mode', 'Electrically', 'What it is for']}
            rows={[
              [
                'READ',
                'Passive load — an ammeter in the loop',
                'Measuring the current a working loop is carrying',
              ],
              [
                'SOURCE',
                '🔴 Active source — provides the energy as well as the current value',
                'Driving a loop that has no supply of its own',
              ],
              [
                'SIMULATE',
                '🔴 Passive — regulates current, relies on the loop supply',
                'Standing in for a two-wire transmitter that has been removed',
              ],
            ]}
            notes="Source and simulate both let you dial up a current. They differ entirely in where the energy comes from, which decides which one will work."
          />
          <p>
            That last note is the practical crux.{' '}
            <strong>
              Both source and simulate let you set 12 mA. Only one of them will work in any given
              circuit.
            </strong>
          </p>
          <ul>
            <li>
              If the loop <strong>has no supply</strong> &mdash; a bench setup, or a controller
              input you are testing on its own &mdash; you need <strong>source</strong> mode,
              because something must provide the energy.
            </li>
            <li>
              If the loop <strong>has its supply</strong> and you have removed the transmitter, you
              need <strong>simulate</strong> mode, because the calibrator should behave exactly like
              the device it replaced. Putting a second source into a loop that already has one is
              the fault Module 3 Section 2 warned about.
            </li>
          </ul>
        </ConceptBlock>

        <Pullquote>
          Source mode and simulate mode both produce 12 mA. One provides the energy and one borrows
          it, and the circuit decides which of them is the right answer.
        </Pullquote>

        <ConceptBlock
          title="Simulate mode — testing everything except the transmitter"
          plainEnglish="Take the transmitter out, put the calibrator in its place, and step through the range. Whatever the loop does now is the loop's doing, not the transmitter's."
          onSite="The standard way to prove a cable and a receiving instrument in one operation."
        >
          <p>Simulate mode is worth its own treatment because of what it isolates.</p>
          <p>
            With the transmitter disconnected and the calibrator in its place, the calibrator
            regulates the loop current exactly as the transmitter would &mdash; drawing on the same
            loop supply, presenting the same kind of load. The rest of the circuit cannot tell the
            difference.
          </p>
          <p>
            The technique is to step through known values &mdash;{' '}
            <strong>4, 8, 12, 16 and 20 mA</strong>, the values Module 3 Section 2 said were worth
            memorising &mdash; and confirm at each one that the receiving instruments agree.
          </p>
          <p>That single operation exercises a surprising amount of the system:</p>
          <ul>
            <li>The field cable, including every termination along it.</li>
            <li>Any isolator, barrier or splitter in the loop.</li>
            <li>The conversion resistor and the input card.</li>
            <li>
              The controller&rsquo;s ranging, which Module 3 Section 2 showed is where a
              plausible-looking system goes silently wrong.
            </li>
            <li>The display, the trend and any alarm values configured on the way.</li>
          </ul>
          <p>
            🔴 And it establishes nothing whatever about the transmitter, which is sitting on the
            bench. That is the point rather than a limitation &mdash;{' '}
            <strong>the value of the test is that it divides the system cleanly in two</strong>. If
            the loop is faultless with a simulated signal and wrong with the transmitter connected,
            the transmitter is the problem. If it is wrong under simulation, the transmitter never
            was.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-2-mode"
          question="A controller input is being tested on the bench with no transmitter and no loop supply connected. The calibrator is set to SIMULATE and nothing happens. Why?"
          options={[
            'Simulate mode regulates current from an external supply, and there is no supply in the circuit — source mode is needed',
            'The controller input is faulty',
            'Simulate mode only works on digital controllers',
            'The calibrator is faulty',
          ]}
          correctIndex={0}
          explanation="Simulate mode mimics a two-wire transmitter, which is a load that regulates current someone else provides. With no supply present there is nothing to regulate. Source mode makes the calibrator provide the energy itself, which is what this bench setup needs."
        />

        <InlineCheck
          id="ins-6-2-simulate"
          question="A loop is faultless when the calibrator simulates 4, 8, 12, 16 and 20 mA, but reads wrong with the transmitter connected. What has that established?"
          options={[
            'The cable is faulty',
            'Everything downstream of the transmitter is sound, so the fault is the transmitter or its process connection',
            'The controller needs re-ranging',
            'Nothing conclusive',
          ]}
          correctIndex={1}
          explanation="The simulation exercised the cable, isolators, input card, ranging and display, and all of it behaved. The only parts not included in that test were the transmitter and what it is connected to. The test has divided the system in two and told you which half to look in."
        />

        <SectionRule />
        <ContentEyebrow>Applying a real input</ContentEyebrow>

        <ConceptBlock
          title="Pressure standards"
          plainEnglish="Either you generate a pressure you can calculate from first principles, or you generate one and measure it with something better than the instrument you are checking."
          onSite="A hand pump and a good reference gauge covers most work. The deadweight tester is the laboratory end of it."
        >
          <p>
            Section 1 established that calibration requires a known physical input. For pressure
            there are two ways to obtain one.
          </p>
          <p>
            <strong>The deadweight tester</strong> is the more fundamental. Pressure is force per
            unit area, so placing a known mass on a piston of known area produces a pressure that
            can be <em>calculated</em> rather than measured:
          </p>
          <p>
            <strong>pressure = (mass × local gravity) &divide; piston area</strong>
          </p>
          <p>
            That makes it a realisation rather than a comparison, which is what puts it near the top
            of the chain Module 1 Section 4 described. Note the words <strong>local gravity</strong>{' '}
            &mdash; the value varies enough with location to matter at this level of precision,
            which is a good illustration of how much care a genuine realisation demands.
          </p>
          <p>
            <strong>A hand pump with a reference gauge</strong> is the field approach. A screw pump
            or squeeze bulb generates pressure and a calibrated reference instrument measures it, so
            what you are really doing is comparing the instrument under test against a better
            instrument. That is entirely valid provided the reference is genuinely better &mdash;
            which is the accuracy-ratio question Module 1 Section 4 set out.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Temperature standards"
          plainEnglish="A stable, known temperature to put the sensor in. Some come from a certificate and one comes from physics."
          onSite="A dry block is the practical workhorse. An ice bath costs nothing and is remarkably good if made properly."
        >
          <p>
            Three approaches, in ascending order of convenience and descending order of
            independence.
          </p>
          <ul>
            <li>
              <strong>The ice bath.</strong> A mixture of finely divided ice and water at
              atmospheric pressure holds essentially 0 &deg;C for as long as both phases are
              present. This is a <strong>physical realisation</strong> &mdash; it needs no
              certificate because the temperature is set by the physics of the phase change, not by
              a comparison. It is also the standard against which a thermocouple&rsquo;s reference
              junction problem is most easily understood, which Module 2 Section 2 covered.
            </li>
            <li>
              <strong>The stirred liquid bath.</strong> A well-agitated bath gives excellent
              uniformity and stability across a useful range, at the cost of being slow and not very
              portable.
            </li>
            <li>
              <strong>The dry block.</strong> A metal block heated or cooled to a set temperature,
              with holes to accept sensors. Portable, quick and the usual field choice. Its
              limitation is that its accuracy depends on the sensor fitting the hole well and being
              inserted deeply enough &mdash; a poor fit means the sensor is partly measuring the
              air.
            </li>
          </ul>
          <p>
            🔴 The ice bath is worth taking seriously rather than treating as a makeshift. Made
            properly &mdash; a slush of crushed ice with just enough water, not a few cubes floating
            in a beaker &mdash; it is a genuine reference point available anywhere, for nothing.
            Made carelessly it is a container of cold water at an unknown temperature, and it looks
            identical.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Electrical standards"
          plainEnglish="Precise voltages, currents and resistances to feed into an instrument, and precise measurement of what comes out."
          onSite="A process calibrator usually combines several of these in one box, which is why it is the tool most technicians carry."
        >
          <p>
            For instruments whose input is electrical &mdash; a thermocouple transmitter, an RTD
            transmitter, an indicator taking a 4&ndash;20 mA or 1&ndash;5 V input &mdash; the known
            input is itself an electrical quantity.
          </p>
          <ul>
            <li>
              <strong>Millivolt source</strong> &mdash; for thermocouple inputs, generating the
              small voltages Module 2 Section 2 described. Good ones also apply reference junction
              compensation, or let you disable it deliberately.
            </li>
            <li>
              <strong>Resistance source or decade box</strong> &mdash; for RTD inputs, presenting a
              known resistance in place of the sensor.
            </li>
            <li>
              <strong>Current and voltage source and measure</strong> &mdash; the loop calibrator
              functions above, plus precise measurement of what an instrument outputs.
            </li>
          </ul>
          <p>
            Most modern kit combines these into a single <strong>process calibrator</strong> that
            can source one quantity while measuring another &mdash; applying a millivolt input to a
            transmitter and reading its milliamp output simultaneously, which is exactly the
            comparison a calibration needs.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 What simulation excludes</ContentEyebrow>

        <ConceptBlock
          title="Testing after the point of simulation, and nothing before it"
          plainEnglish="Whatever you substitute, you have tested everything downstream of where you plugged in — and excluded everything upstream from the test entirely."
          onSite="Ask what the substitution replaced. That is precisely what has not been checked."
        >
          <p>
            This is Section 1&rsquo;s argument one level down, and it applies to every substitution
            in this section.
          </p>
          <p>
            When an RTD is disconnected and a decade box applies known resistances instead,{' '}
            <strong>the transmitter has been calibrated and the RTD has been excluded</strong>. The
            test proves the transmitter turns a given resistance into the right output. It says
            nothing about whether the RTD in the thermowell actually presents that resistance at the
            temperature it is sitting in, because the RTD was not in the circuit at all.
          </p>
          <p>The same logic runs through the whole toolkit:</p>
          <AppendixTable
            caption="What each substitution tests, and what it excludes"
            headers={['Substitution', 'Tests', '🔴 Excludes']}
            rows={[
              [
                'Decade box for an RTD',
                'The transmitter’s resistance-to-output conversion',
                'The RTD, its leads and its thermal contact',
              ],
              [
                'Millivolt source for a thermocouple',
                'The transmitter, including reference junction compensation',
                'The thermocouple, its extension cable and its junction',
              ],
              [
                'Calibrator simulating a transmitter',
                'Cable, isolators, input card, ranging, display, alarms',
                'The transmitter and the entire process connection',
              ],
              [
                'Dry block with the sensor in it',
                'Sensor and transmitter together',
                'The thermowell, its fit, and where it sits in the process',
              ],
            ]}
            notes="Only the bottom row includes the sensor — and even that excludes the installation, which Section 1 identified as the thing calibration cannot reach."
          />
          <p>
            None of this makes substitution wrong. It is efficient, it is often the only practical
            option, and dividing a system in two is exactly how faults get localised.{' '}
            <strong>
              What matters is knowing which half you just certified, and not claiming the other one.
            </strong>
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Looking after the kit</ContentEyebrow>

        <ConceptBlock
          title="The standard is an instrument too"
          plainEnglish="Everything this course says about instruments drifting, being knocked about and needing checking applies to the thing you check them with."
          onSite="A calibrator lives in a van and gets dropped. It is not exempt from any of it."
        >
          <p>
            It is easy to treat calibration kit as a fixed point of reference, and it is nothing of
            the sort. A process calibrator is an instrument with a sensing front end, an output
            stage and a display, and Module 4 Section 3 applies to it in full: it drifts, it has a
            specification quoted under reference conditions, and it can be knocked out of tolerance.
          </p>
          <p>Three practical consequences:</p>
          <ul>
            <li>
              <strong>It has its own interval.</strong> Its certificate has a date and a validity
              period, and using it beyond that turns every calibration performed with it into an
              unsupported claim.
            </li>
            <li>
              <strong>Its uncertainty is part of your result.</strong> Module 1 Section 4 explained
              how uncertainty accumulates down a chain; your calibration sits one step below your
              calibrator on that chain and inherits everything above it.
            </li>
            <li>
              <strong>It should be treated as delicate.</strong> An instrument dropped in a van is a
              candidate for being out of tolerance long before its certificate expires, and nothing
              on the display will say so.
            </li>
          </ul>
          <p>
            Where a calibrator is suspected of having been damaged, the useful check is a comparison
            against another standard rather than a visual inspection.{' '}
            <strong>
              Two standards that agree are evidence; one standard that looks undamaged is not.
            </strong>
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Trusting a calibrator whose own certificate has lapsed"
          whatHappens={
            <>
              <p>
                A calibration is performed carefully, at five points, up and down, with everything
                recorded properly. The instrument is adjusted to agree with the calibrator and
                signed off.
              </p>
              <p>
                The calibrator itself was last certified two years ago. Whatever it has drifted by
                has now been transferred, deliberately and precisely, into the instrument &mdash;
                and into every other instrument checked with it since.
              </p>
              <p>
                🔴 That is worse than not calibrating at all, because the instrument was probably
                closer to correct before. The paperwork now asserts the opposite, and the error has
                been propagated across a fleet rather than left in one device.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Check the calibrator&rsquo;s certificate before the job, not after. It has a date
                and an interval like anything else, and Module 1 Section 4 explained why an unbroken
                chain is the only thing that gives a comparison meaning.
              </p>
              <p>
                Check its uncertainty against the tolerance you are working to, as well as its date.
                A standard that is not substantially better than the instrument under test cannot
                resolve whether that instrument passes &mdash; Module 1 Section 4 covers the ratio,
                and it is a genuine limit rather than a formality.
              </p>
              <p>
                And record which calibrator was used, with its serial number. If a standard is later
                found to have drifted, the only way to know which work is affected is a record of
                where it was used.
              </p>
            </>
          }
        />

        <Scenario
          title="A temperature loop that passes every check and reads 8 °C low"
          situation={
            <>
              <p>
                A process temperature reads consistently about 8 °C below what an independent probe
                shows. The transmitter has been checked with a decade box at five points and is
                within tolerance. The loop has been proved end to end with a calibrator in simulate
                mode and is faultless.
              </p>
              <p>Both checks passed. The reading is still wrong.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                Read the two tests against the table above and the answer is structural rather than
                mysterious. The decade box test excluded the RTD, its leads and its thermal contact.
                The simulate test excluded the transmitter and the entire process connection.{' '}
                <strong>
                  Between them, the two checks have certified everything except the sensor and its
                  installation
                </strong>
                — which is the only part left.
              </p>
              <p>
                So test the part that has not been tested. Put the RTD itself into a dry block or an
                ice bath, with the transmitter it normally works with, and see whether the pair
                report the known temperature correctly. That is the first test in this investigation
                that includes the sensor.
              </p>
              <p>
                If the sensor and transmitter are correct together, the remaining candidate is the
                installation. On a temperature measurement that usually means insertion depth or
                thermal contact — a sensor not far enough into the thermowell, or a thermowell with
                a poor fit, is partly measuring the pipe wall and the surrounding air rather than
                the process. Module 2 covered why, and Section 1 of this module explained why no
                calibration reaches it.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Two thorough, correctly performed calibrations both passed, and the fault was in the
                gap between what each of them covered. Neither test was wrong; the conclusion drawn
                from them was.
              </p>
              <p>
                The habit worth taking is to state, after any calibration, what it excluded. That
                turns two passing certificates from reassurance into a map of where the fault must
                be.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Choosing what to take</ContentEyebrow>

        <ConceptBlock
          title="Working out what a job actually needs"
          plainEnglish="The instrument under test decides the kit, not the other way round. Two questions settle it."
          onSite="Answer these before travelling. Arriving without the range you need is the commonest wasted journey in this work."
        >
          <p>Two questions determine the equipment for any calibration:</p>
          <ul>
            <li>
              <strong>What is the input?</strong> That decides what you must be able to apply
              &mdash; a pressure, a temperature, a resistance, a millivoltage, a current. Section 1
              established that a calibration is not a calibration without one.
            </li>
            <li>
              <strong>What is the output?</strong> That decides what you must be able to measure
              &mdash; usually a current, sometimes a voltage, sometimes only a display to read.
            </li>
          </ul>
          <p>
            A calibration needs both at once, which is why a process calibrator that sources one
            quantity while measuring another is the tool of choice. Sourcing and measuring in
            sequence with two instruments works and is slower and more error-prone.
          </p>
          <AppendixTable
            caption="Typical requirement by instrument type"
            headers={['Instrument', 'Apply', 'Measure']}
            rows={[
              [
                'Pressure transmitter',
                'Known pressure — hand pump and reference, or deadweight',
                '4–20 mA output',
              ],
              [
                'RTD transmitter',
                'Known resistance, or a real temperature to the sensor',
                '4–20 mA output',
              ],
              [
                'Thermocouple transmitter',
                'Known millivoltage, or a real temperature',
                '4–20 mA output',
              ],
              [
                'Panel indicator',
                'Known current or voltage — calibrator in source mode',
                'The display itself',
              ],
              [
                'Controller input',
                'Known current — source or simulate as the circuit requires',
                'The displayed PV',
              ],
              ['I/P converter', 'Known current', 'Output pressure, against a reference gauge'],
            ]}
            notes="Note the RTD and thermocouple rows offer two options. Applying a resistance or millivoltage tests the transmitter; applying a real temperature tests the sensor with it."
          />
          <p>
            That final note is the section&rsquo;s main idea appearing as a practical choice.{' '}
            <strong>
              The decision about what to apply is a decision about what to include in the test
            </strong>
            , and it should be made deliberately rather than by whatever happens to be in the bag.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can a loop calibrator power a two-wire transmitter?',
              answer:
                'Many can, and it is a distinct function from the three modes described here — the calibrator supplies loop power while simultaneously reading the current the transmitter regulates. It is genuinely useful for bench-testing a transmitter with nothing else connected, because it replaces the whole loop: supply, cable and receiving instrument. Check the instrument actually offers it before relying on it, since not all do.',
            },
            {
              question: 'Is a good multimeter enough for calibration work?',
              answer:
                'For measuring, often yes — Module 4 Section 4 covered what a quality meter can do. What it generally cannot do is source: it will read a milliamp signal but not generate one, and it will not simulate a transmitter. Since calibration requires applying a known input, a meter alone limits you to measuring what an instrument does rather than telling it what to do, which covers only half the job.',
            },
            {
              question: 'How much better does the standard have to be than the instrument?',
              answer:
                'Module 1 Section 4 covers this properly, including why chasing a tolerance tighter than your standard can resolve is futile. The short version is that the standard’s uncertainty must be small enough relative to the tolerance being verified that a pass or fail is genuinely attributable to the instrument. If the two are comparable, the result tells you as much about your standard as about the device.',
            },
            {
              question: 'Does a dry block need to be at exactly the right temperature?',
              answer:
                'It needs to be stable and known, which is not the same as being at a round number. A dry block that has settled at 97.3 °C and reports that accurately is a perfectly good reference point; a block still drifting towards 100 °C is not, whatever it displays. Allowing time to stabilise matters more than hitting a target value, and the better instruments indicate when they are stable rather than leaving you to guess.',
            },
            {
              question: 'Why do some calibrators offer a 25 per cent step function?',
              answer:
                'Because 0, 25, 50, 75 and 100 per cent of a 4–20 mA range are 4, 8, 12, 16 and 20 mA, which is the standard five-point pattern for a calibration check. A step button walks those points without dialling each one, which reduces both the time and the chance of applying a wrong value. Section 3 covers why five points and both directions are the convention.',
            },
            {
              question: 'What should be checked on calibration kit before going out?',
              answer:
                'Certificate in date, batteries good, and the leads — Module 4 Section 4 made the point that leads fail far more often than instruments do, and a lead with a partly broken conductor reads correctly most of the time. It is also worth confirming the ranges you will need are within the instrument’s capability before travelling, particularly for pressure work where the range required is set by the instrument under test rather than by what you usually carry.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 1 Section 4 owns standards and traceability. This section is the equipment that sits at the bottom of that chain.',
            'A loop calibrator does three things: read, source and simulate.',
            'READ is a passive load — an ammeter measuring what something else drives.',
            '🔴 SOURCE is an active source, supplying the energy as well as the value. Use it where the loop has no supply.',
            '🔴 SIMULATE regulates current from an external supply, exactly like a two-wire transmitter. Use it where the loop has its supply and the transmitter is out.',
            'Both produce 12 mA; only one will work in a given circuit, and the circuit decides which.',
            'Simulating 4, 8, 12, 16 and 20 mA exercises the cable, isolators, input card, ranging, display and alarms in one operation.',
            'A deadweight tester realises pressure from mass over area — calculated, not compared — and local gravity matters at that precision.',
            'An ice bath is a reference by physics: ice and water coexisting hold essentially 0 °C, with no certificate involved.',
            'Made carelessly it is cold water at an unknown temperature, and it looks identical.',
            '🔴 Any substitution tests everything downstream of it and excludes everything upstream.',
            '🔴 A decade box calibrates the transmitter and excludes the RTD entirely. State what a test excluded, not just what it covered.',
            'A calibration is only as good as the standard: certificate in date, traceability intact, uncertainty small enough for the tolerance.',
            'Record which calibrator was used and its serial number — otherwise a standard later found to have drifted cannot be traced to the work it affected.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              What calibration is
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibration procedures
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section2;
