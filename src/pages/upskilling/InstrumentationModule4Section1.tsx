/**
 * Module 4 · Section 1 — Measuring voltage, current and resistance
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Opens Module 4.
 *
 * 🔴 THE FRAMING. Every learner arriving at this module has measured volts,
 * amps and ohms for years, so a page that explains what a voltmeter is wastes
 * their time. What is genuinely new on the instrumentation side is that
 * MEASURING DISTURBS THE THING MEASURED, and each of the three quantities is
 * disturbed by a different mechanism:
 *
 *   - VOLTAGE  — a voltmeter must draw current, so a high-impedance source is
 *                loaded down. On a pH electrode this is catastrophic, not
 *                marginal: 100 mV can read as 3.2 mV.
 *   - CURRENT  — an ammeter must be IN the circuit, so it has to be broken.
 *                On power systems you never break it; you use a CT instead.
 *   - RESISTANCE — an ohmmeter must inject current, and current in a resistance
 *                makes heat. Self-heating is a positive error on RTDs.
 *
 * On installation work a 10 MΩ input is effectively infinite and none of this
 * shows. That is exactly why it catches people crossing over into instruments.
 *
 * 🔴 SAFETY. Never open-circuit an energised CT secondary. A single conductor
 * through the aperture is a one-turn primary, so a CT that steps current DOWN
 * steps voltage UP, and an open secondary is a step-up transformer fed from a
 * line that is already dangerous. This is also why a CT secondary never carries
 * a fuse. This is the most consequential thing on the page.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §4.10 (null-balance measurement, the loading effect and the pH worked
 * example), §21.3.6 (self-heating, Joule's law, the pulsed-current technique)
 * and §25.6.4 (instrument transformer safety, PT and CT source behaviour).
 * Extracted to scratchpad/src/m4_nullbalance.txt, m4_selfheat.txt, m4_ctvt.txt.
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

const TITLE = 'Measuring voltage, current and resistance | Instrumentation Module 4.1 | Elec-Mate';
const DESCRIPTION =
  'Why every measurement disturbs what it measures — voltmeter loading on high-impedance sources, ammeter burden and current transformers, and self-heating when an ohmmeter injects current — plus the CT secondary rule that must never be broken.';

const outcomes = [
  'Explain why a voltmeter loads the circuit it measures, and when that matters',
  'Calculate the loading error on a high-impedance source using a voltage divider',
  'State the swamping rule relating input resistance to source resistance',
  'Describe what a null-balance measurement does that an ordinary voltmeter cannot',
  'Explain why an ammeter must be in the circuit and what its burden costs',
  'Say how a CT and a VT behave, and which behaves as a current source',
  '🔴 State what happens if an energised CT secondary is open-circuited, and why',
  'Explain self-heating in an RTD and the trade-off in reducing excitation current',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A sensor with a 300 MΩ internal resistance produces 100 mV. It is measured with a voltmeter of 10 MΩ input resistance. Roughly what will the voltmeter read?',
    options: ['About 3.2 mV', 'About 100 mV', 'About 97 mV', 'About 50 mV'],
    correctIndex: 0,
    explanation:
      'The source resistance and the meter form a voltage divider, and the meter gets only its share: 100 mV × 10 ÷ (300 + 10) ≈ 3.2 mV. The reading is a few per cent of the truth. Nothing is faulty — the meter is simply far too heavy a load for this source.',
  },
  {
    id: 2,
    question: 'What is the underlying reason a voltmeter loads a circuit at all?',
    options: [
      'Its leads have resistance',
      'It must draw some current in order to register a reading',
      'It converts the voltage to a current internally',
      'Its input capacitance charges from the source',
    ],
    correctIndex: 1,
    explanation:
      'Measuring a voltage means taking a little energy from the circuit to drive the indication. However slight that current, it flows through the source’s own internal resistance and drops some of the voltage you were trying to read. The cure is to make the meter’s resistance as high as possible.',
  },
  {
    id: 3,
    question: 'What does the "swamping" rule say about choosing a voltmeter?',
    options: [
      'The meter’s range should be twice the expected voltage',
      'The meter’s resistance should be roughly equal to the source resistance',
      'The meter’s resistance must far exceed the source resistance, so the loading error becomes negligible',
      'The meter’s resistance should be as low as possible for a stable reading',
    ],
    correctIndex: 2,
    explanation:
      'So long as the meter’s internal resistance overshadows the source’s, the divider gives almost all the voltage to the meter and the error stays small. Modern field-effect transistor inputs reach into the trillions of ohms, which is what makes measuring a pH electrode practical at all.',
  },
  {
    id: 4,
    question: 'Why must an ammeter be connected in series rather than across the circuit?',
    options: [
      'Because current is measured relative to earth',
      'To avoid loading the source',
      'To protect the meter from over-voltage',
      'Because it measures the current passing through it, so the circuit current must be routed through the meter',
    ],
    correctIndex: 3,
    explanation:
      'An ammeter reports what flows through it, so it has to be placed in the path of the current. That is why taking a current reading traditionally means breaking the circuit — and why, on a two-wire loop, doing so de-energises the transmitter, as Module 3 Section 1 covered.',
  },
  {
    id: 5,
    question: 'How does a current transformer behave towards the instrument it drives?',
    options: [
      'As a current source, with the instrument acting as a short circuit',
      'As a resistance proportional to line current',
      'As an open circuit until the instrument draws current',
      'As a voltage source, with the instrument acting as an open circuit',
    ],
    correctIndex: 0,
    explanation:
      'A CT produces a current proportional to the line current, and the ammeter it feeds drops almost no voltage — so from the CT’s point of view the instrument is very nearly a short circuit. A VT is the opposite: it acts as a voltage source into a voltmeter that draws negligible current.',
  },
  {
    id: 6,
    question:
      '🔴 What is the danger in open-circuiting the secondary of a current transformer while the primary circuit is energised?',
    options: [
      'The CT will be destroyed by excessive secondary current',
      'A dangerous voltage develops across the open terminals, because the CT tries to drive its current through a very high resistance',
      'The primary circuit will be interrupted',
      'Nothing — an open CT secondary is the safe state',
    ],
    correctIndex: 1,
    explanation:
      'The CT will attempt to push its proportional current through whatever is in front of it. Faced with an open circuit it generates a very high voltage trying to do so. A CT stepping current down is stepping voltage up, and the primary is a power line that was already dangerous.',
  },
  {
    id: 7,
    question: 'Why is a fuse never fitted in the secondary circuit of a current transformer?',
    options: [
      'Because the CT is protected by the primary-side protection',
      'Because the secondary current is too small to need protection',
      'Because a blown fuse would open-circuit the CT, which is more dangerous than any current it could produce',
      'Because fuses cannot operate at the low voltages involved',
    ],
    correctIndex: 2,
    explanation:
      'A fuse exists to open a circuit, and an open circuit is precisely the state a CT must never be left in. The protection would create the hazard. A short across a CT secondary, by contrast, is its easiest condition — it has to develop almost no voltage to maintain the current.',
  },
  {
    id: 8,
    question: 'Why does measuring an RTD introduce a self-heating error?',
    options: [
      'The element expands as it is measured',
      'The measuring instrument radiates heat onto the sensor',
      'The lead resistance adds to the reading',
      'Current must be passed through the element to measure its resistance, and that current dissipates heat in it',
    ],
    correctIndex: 3,
    explanation:
      'By Joule’s law the excitation current dissipates I²R in the element, warming it above its surroundings. The error is always positive — the reading is high. Reducing the current reduces the heating but also shrinks the signal, which costs signal-to-noise ratio.',
  },
];

const InstrumentationModule4Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 1"
        title="Measuring voltage, current and resistance"
        backTo="/electrician/upskilling/instrumentation-module-4"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          You have measured all three for years. What changes here is that the instrument starts to
          disturb the thing it is reading.
        </p>

        <TLDR
          points={[
            'The instrumentation difference is not the meter — it is that measuring takes something from the circuit, and each quantity is disturbed by a different mechanism.',
            'A voltmeter must draw current, so it loads the source. On a low-impedance power circuit this is invisible; on a pH electrode it is ruinous.',
            'Worked example: a 300 MΩ source producing 100 mV, read on a 10 MΩ meter, shows about 3.2 mV — a few per cent of the truth, with nothing faulty.',
            'The swamping rule: the meter’s resistance must far exceed the source’s. Modern FET inputs reach into the trillions of ohms, which is what makes it workable.',
            'Null-balance measures by comparison and draws no current at balance, which is how precision measurement was done before high-impedance amplifiers existed.',
            'An ammeter has to be in the circuit, which means breaking it — and on a two-wire loop that de-energises the transmitter.',
            'On power systems you never break the circuit. A CT behaves as a current source into what is nearly a short circuit; a VT behaves as a voltage source into an open circuit.',
            '🔴 Never open-circuit an energised CT secondary. Stepping current down means stepping voltage up, and the CT will generate a dangerous voltage trying to push its current through the break.',
            '🔴 That is why a CT secondary never carries a fuse — the protective device would create the hazard.',
            'An ohmmeter injects current, and I²R in an RTD warms it. Self-heating is always a positive error, and reducing the current costs signal-to-noise ratio.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>What actually changes</ContentEyebrow>

        <ConceptBlock
          title="The instrument is part of the circuit"
          plainEnglish="To read something you have to take a little of it. On the circuits you are used to, that little is nothing. On instrument circuits it can be most of the signal."
          onSite="If you have never been caught by this, it is because installation work rarely presents a high-impedance source. Instrumentation is full of them."
        >
          <p>
            Nothing in this section will teach you what a voltmeter is. The purpose is narrower and
            more useful: to show why the habits that serve perfectly on an installation start to
            mislead on instrument circuits.
          </p>
          <p>
            The single idea underneath all of it is that{' '}
            <strong>a measuring instrument is a component in the circuit it is measuring</strong>.
            It has resistance, it takes energy, and it changes conditions by being connected. On a
            230 V final circuit those effects are so small that you can reasonably pretend they do
            not exist. On a millivolt signal from a source of hundreds of megohms, they dominate.
          </p>
          <p>
            Each of the three quantities is disturbed differently, and that is the structure of this
            section:
          </p>
          <AppendixTable
            caption="How measuring disturbs each quantity"
            headers={['Quantity', 'What the instrument must do', 'The error that follows']}
            rows={[
              [
                'Voltage',
                'Draw a small current to drive its indication',
                'Loads the source — the reading is low, sometimes drastically',
              ],
              [
                'Current',
                'Carry the circuit current through itself',
                'Adds burden, and the circuit must be broken to insert it',
              ],
              [
                'Resistance',
                'Inject a current and see what voltage develops',
                'Heats the element — self-heating, always a positive error',
              ],
            ]}
            notes="Three different mechanisms, three different cures. Recognising which one you are fighting is most of the diagnosis."
          />
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Voltage — the loading effect</ContentEyebrow>

        <ConceptBlock
          title="Why a perfectly good voltmeter reads a fraction of the truth"
          plainEnglish="The source has resistance of its own. Connect a meter and the two share the voltage between them, and the meter only shows its own share."
          onSite="Suspect this whenever a millivolt-level reading is low but stable and everything tests fine in isolation."
        >
          <p>
            A number of instrument sensors generate a DC voltage directly, with no supply of their
            own. They are called <strong>potentiometric</strong> sensors &mdash; literally
            voltage-measuring &mdash; and Module 2 met two of the most important: thermocouples and
            pH electrodes.
          </p>
          <p>
            Take the hardest case. A glass pH electrode produces roughly 59 millivolts per pH unit
            away from neutral. It is a voltage, and any voltmeter can read a voltage, so this ought
            to be trivial.
          </p>
          <p>
            It is not, because the glass bulb has an enormous internal resistance &mdash; commonly
            in the hundreds of megohms. A typical digital multimeter presents an input resistance of
            around 10 M&Omega;, and against a source like that the meter is a <em>heavy</em> load.
          </p>
          <p>
            Draw the equivalent circuit and it becomes a voltage divider: the source resistance in
            series with the meter&rsquo;s resistance, with the meter reading only its own share.
          </p>
          <p>
            <strong>
              V<sub>meter</sub> = V<sub>source</sub> × R<sub>meter</sub> ÷ (R<sub>source</sub> + R
              <sub>meter</sub>)
            </strong>
          </p>
          <p>
            Put the numbers in. A 300 M&Omega; source producing 100 mV, measured on a 10 M&Omega;
            meter:
          </p>
          <p>
            100 mV × 10 &divide; (300 + 10) = <strong>3.2 mV</strong>
          </p>
          <p>
            The meter reports about three per cent of what the sensor is actually producing. There
            is no fault anywhere. The meter is accurate, the sensor is healthy, and the answer is
            comprehensively wrong &mdash; because the act of connecting the meter changed the
            circuit.
          </p>
        </ConceptBlock>

        <Pullquote>
          A voltmeter has to draw a little current to work. That current, flowing through the
          source&rsquo;s own resistance, drops part of the very voltage you are trying to read.
        </Pullquote>

        <ConceptBlock
          title="The swamping rule, and why modern meters get away with it"
          plainEnglish="Make the meter's resistance so much bigger than the source's that its share is nearly all of it."
          onSite="Check the input impedance on the data sheet before trusting a millivolt reading from an unfamiliar sensor."
        >
          <p>
            The cure follows directly from the divider. If the current draw is what causes the
            error, minimise it &mdash; which means maximising the meter&rsquo;s internal resistance.
            The ideal voltmeter would have infinite resistance and draw nothing at all.
          </p>
          <p>
            In practice the rule is one of proportion.{' '}
            <strong>
              So long as the meter&rsquo;s internal resistance far overshadows the source&rsquo;s,
              the loading error stays negligible.
            </strong>{' '}
            The term for this is swamping: the meter&rsquo;s resistance swamps the source&rsquo;s,
            and the divider hands over almost everything.
          </p>
          <p>
            Field-effect transistor amplifier inputs made this straightforward. Meters built that
            way can present internal resistances in the trillions of ohms, at which point even a 300
            M&Omega; pH electrode is a light load and the reading is honest.
          </p>
          <p>
            It is worth knowing this was not always available. Before semiconductor amplifiers,
            special <strong>vacuum-tube voltmeters</strong> were used wherever a high-resistance
            potentiometric sensor had to be read, for precisely this reason. Earlier still, an
            unamplified voltmeter needed the current it drew from the circuit in order to move its
            mechanism at all &mdash; without that current it simply would not work.
          </p>
          <p>
            That last constraint sounds like a dead end, and the way round it is elegant enough to
            be worth knowing.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-1-loading"
          question="A thermocouple with about 20 Ω of source resistance is read on a 10 MΩ voltmeter. How much loading error is there?"
          options={[
            'Utterly negligible — the meter’s resistance is around half a million times the source’s',
            'About 5 per cent',
            'It cannot be calculated without knowing the temperature',
            'About 50 per cent — the same problem as the pH electrode',
          ]}
          correctIndex={0}
          explanation="The divider gives the meter 10 000 000 ÷ 10 000 020 of the voltage — a couple of parts per million. This is the point about the swamping rule: the same meter is hopeless on a pH electrode and perfect on a thermocouple, because what matters is the ratio, not the meter alone."
        />

        <ConceptBlock
          title="Null-balance — measuring without taking anything"
          plainEnglish="Instead of reading the voltage, adjust a known voltage until it exactly opposes the unknown one. When nothing flows, the two must be equal."
          onSite="You will not build one, but the principle turns up inside precision references and calibrators, and it explains what 'null' means on older equipment."
        >
          <p>
            The null-balance method sidesteps loading rather than reducing it. A known, adjustable
            voltage is connected in opposition to the unknown one, with a sensitive detector between
            them. The known voltage is adjusted until the detector reads exactly zero.
          </p>
          <p>
            At that point no current flows through the detector, because there is no net voltage to
            drive any. And if no current flows,{' '}
            <strong>nothing is being taken from the source at all</strong> &mdash; so there is no
            loading error, regardless of how high the source resistance is. The unknown voltage must
            equal the known one, because that is the only way the detector could read zero.
          </p>
          <p>
            It is worth carrying because it generalises well beyond voltmeters. Module 2 Section 2
            described a bridge circuit, which is the same idea applied to resistance: adjust until
            balanced, then read the known side. Both are examples of a principle worth having
            &mdash;{' '}
            <strong>
              comparing against a known standard is often more accurate than measuring directly
            </strong>
            , and Module 6 is built on it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Current — you have to be in the circuit</ContentEyebrow>

        <ConceptBlock
          title="An ammeter reports what passes through it"
          plainEnglish="There is no way to measure current from the outside with a conventional meter. The current has to go through the instrument, so the circuit has to be opened."
          onSite="On a live process that is a disturbance, not a test. Module 3 Section 1 covered the alternatives."
        >
          <p>
            Voltage is measured across two points; current is measured through one. That difference
            sounds like a technicality and has large practical consequences.
          </p>
          <p>
            To read a current with a conventional ammeter, the circuit must be broken and the meter
            inserted so the current flows through it. Two costs follow:
          </p>
          <ul>
            <li>
              <strong>Burden.</strong> The meter has some resistance of its own, so inserting it
              adds resistance to the circuit and drops a little voltage. On a current loop, Module 3
              Section 2 showed that this comes straight out of the transmitter&rsquo;s voltage
              budget.
            </li>
            <li>
              <strong>Interruption.</strong> The circuit has to be opened. On a two-wire loop that
              de-energises the transmitter, and on a running process it disturbs control.
            </li>
          </ul>
          <p>
            Module 3 Section 1 gave the alternatives for a signal loop &mdash; clamp-on
            milliammeters, test diodes, shunt resistors. On power circuits the same problem has a
            different and much older answer.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Instrument transformers — measuring what you cannot connect to"
          plainEnglish="You do not put a meter in series with a supply carrying hundreds of amps. A transformer produces a small, proportional copy of it instead."
          onSite="CTs and VTs are how switchgear metering and protection see the system. The instruments themselves never touch the power circuit."
        >
          <p>
            Two devices do this job, and their behaviour is worth stating precisely because the
            safety rules follow directly from it.
          </p>
          <ul>
            <li>
              <strong>Voltage transformers</strong> (VTs, also called potential transformers or PTs)
              produce a stepped-down proportion of the system voltage. A VT{' '}
              <strong>behaves as a voltage source</strong>, and the voltmeter it drives takes
              negligible current &mdash; so the instrument looks like an open circuit to the VT.
            </li>
            <li>
              <strong>Current transformers</strong> (CTs) produce a stepped-down proportion of the
              line current. A CT <strong>behaves as a current source</strong>, and the ammeter it
              drives drops negligible voltage &mdash; so the instrument looks very nearly like a
              short circuit to the CT.
            </li>
          </ul>
          <p>
            Hold those two sentences, because everything dangerous about instrument transformers
            comes out of them. A source is happiest driving the load it was designed for, and each
            of these becomes hazardous when given the opposite.
          </p>
          <p>
            One construction detail matters as much as the electrical behaviour. A CT is typically a
            toroidal core with many secondary turns, and{' '}
            <strong>
              the primary is often just the power conductor passed through the aperture
            </strong>{' '}
            &mdash; a single turn. That is what gives the large step-down ratio for current.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Open-circuiting a CT secondary while the primary is energised"
          whatHappens={
            <>
              <p>
                Disconnecting an ammeter, lifting a link, or removing an instrument from an
                energised CT circuit without first short-circuiting the secondary.
              </p>
              <p>
                The CT does not simply stop. It will attempt to drive its proportional current
                through whatever is in front of it, and faced with an open circuit that means
                generating a very large voltage in the attempt.
              </p>
              <p>
                The reason it goes so high is in the turns ratio. A transformer with more secondary
                turns than primary steps current down &mdash; and steps voltage up by the same
                ratio. With a single conductor through the aperture as a one-turn primary, that
                ratio is large. So{' '}
                <strong>an open-circuited CT behaves as a step-up transformer</strong>, fed from a
                power line that was already at a dangerous voltage.
              </p>
              <p>
                Note how counter-intuitive the safe state is. Short-circuiting a CT secondary is its{' '}
                <em>easiest</em> condition: it produces no more current than it would into any
                normal instrument, and it has to develop almost no voltage to do so. The CT only has
                to work hard when forced to push current through a substantial impedance.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Short the secondary before breaking into the circuit. Purpose-made shorting links
                and test switches exist precisely for this, so an instrument can be removed while
                the CT stays safely loaded.
              </p>
              <p>
                It also explains something that looks like an omission on a drawing:{' '}
                <strong>you will never see a fuse in a CT secondary circuit</strong>. A fuse exists
                to open a circuit, and an open circuit is the one state a CT must never be left in.
                The protective device would be the hazard.
              </p>
              <p>
                The mirror-image rule applies to a VT: never short-circuit its secondary. A VT is
                trying to maintain a substantial voltage, and across a very low resistance that
                means a dangerous current. The two devices are hazardous in opposite directions,
                which is why the absence of a fuse on a CT secondary is deliberate rather than an
                oversight &mdash; overcurrent protection answers a VT&rsquo;s failure mode and
                creates a CT&rsquo;s.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-4-1-ct"
          question="You need to remove a panel ammeter from an energised CT circuit. What do you do first?"
          options={[
            'Isolate the instrument at its terminals and withdraw it',
            'Short-circuit the CT secondary, using the test switch or shorting link provided',
            'Open the CT secondary fuse',
            'Nothing special — the CT output is a low-level signal',
          ]}
          correctIndex={1}
          explanation="A shorted CT secondary is its safest and easiest condition. There is no CT secondary fuse to open, because a fuse would create the very open circuit that is dangerous. Simply withdrawing the instrument leaves the secondary open with the primary energised."
        />

        <SectionRule />
        <ContentEyebrow>Resistance — you have to push current through it</ContentEyebrow>

        <ConceptBlock
          title="Self-heating, and a genuine trade-off"
          plainEnglish="An ohmmeter works by passing a current and seeing what voltage appears. That current makes heat in the thing you are measuring — and if the thing is a thermometer, it reads its own warmth."
          onSite="Affects RTDs and thermistors. The error is always in the same direction: high."
        >
          <p>
            Measuring resistance means injecting a current, and a current in a resistance dissipates
            power according to Joule&rsquo;s law:
          </p>
          <p>
            <strong>P = I&sup2;R</strong>
          </p>
          <p>
            For most resistance measurements that heat is irrelevant. For an RTD or a thermistor it
            is not, because the device is a thermometer: the heat raises its temperature above its
            surroundings, and it faithfully reports the result.{' '}
            <strong>Self-heating is always a positive error</strong> &mdash; the reading is high,
            never low.
          </p>
          <p>
            The obvious cure is to reduce the excitation current, and it works &mdash; but it is a
            trade rather than a fix, and the shape of that trade should be familiar by now:
          </p>
          <ul>
            <li>Less current means less heating, and less error.</li>
            <li>
              But less current means less voltage developed across the element, so the measuring
              circuit must be more sensitive to read it.
            </li>
            <li>
              And a smaller signal means a worse <strong>signal-to-noise ratio</strong> for any
              given amount of induced noise &mdash; which is Module 3 Section 5&rsquo;s problem
              arriving from a new direction.
            </li>
          </ul>
          <p>
            There is a neat way round it. Rather than exciting the element continuously, the current
            can be <strong>pulsed</strong>, with the voltage sampled only during the brief moments
            the element is powered. The element gets a usable excitation current without the average
            heating that would come from applying it all the time.
          </p>
          <p>
            The cost is sample rate, and it is usually affordable: most temperature measurement is
            slow-changing by nature, so a slower sample rate is no real loss. Module 3 Section 4
            covered when a slow sample rate does start to matter. Pulsing also cuts power
            consumption, which is why it turns up in battery-powered instruments.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="And the error you have already met"
          plainEnglish="The leads are in the measurement too. Everything Module 2 said about RTD lead resistance is the same problem in this section's language."
          onSite="Three- and four-wire connections exist to solve exactly this."
        >
          <p>
            Self-heating is the error unique to resistance measurement. The other one is familiar:
            the instrument measures the total resistance of everything between its terminals, and
            attributes all of it to the sensor.
          </p>
          <p>
            Module 2 Section 2 covered lead resistance and the three- and four-wire connections that
            work around it, and Module 3 Section 1 generalised it into the reason a resistance
            signal cannot travel. It belongs here as a reminder rather than a new lesson, because it
            fits the pattern this section is built on: the measuring arrangement is part of the
            measurement.
          </p>
          <p>
            Worth noticing that the two resistance errors pull in opposite directions in one useful
            respect. Lead resistance error is roughly constant for a given installation and can be
            compensated. Self-heating error depends on how well the element can shed heat, so it
            varies with what the sensor is immersed in &mdash; an element in still air self-heats
            far more than the same element in flowing water.
          </p>
        </ConceptBlock>

        <Scenario
          title="A pH reading that is stable, repeatable and far too close to neutral"
          situation={
            <>
              <p>
                A pH loop is being investigated. The control system reports 6.9 pH on a process that
                laboratory samples put at 4.2. The reading is rock steady and repeats perfectly.
              </p>
              <p>
                A technician disconnects the electrode and checks it with a good general-purpose
                multimeter on millivolts. The meter shows a few millivolts, which seems far too
                small, so the electrode is condemned and replaced. The new one behaves identically.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Two electrodes behaving identically is the clue. When a replacement reproduces a
                fault exactly, the fault is usually not in the part that was replaced.
              </p>
              <p>
                The multimeter check is the thing to question. A general-purpose meter presents
                perhaps 10 M&Omega; against an electrode of several hundred megohms, so it reads a
                small fraction of the true output. The electrode was probably healthy and the test
                was incapable of showing it.
              </p>
              <p>
                Note what the loading error does to the <em>value</em>, not just its size. A pH
                electrode produces zero volts at 7 pH and departs from zero either side. Loading
                pulls the measured voltage towards zero, which pulls the indicated pH{' '}
                <strong>towards neutral</strong> &mdash; so a loaded pH measurement always looks
                more neutral than the process really is, and 6.9 against a true 4.2 is exactly that
                signature.
              </p>
              <p>
                Check the electrode with an instrument specified for high-impedance sources, and
                check the transmitter&rsquo;s input specification. If a junction box, a damp
                terminal or a length of unsuitable cable has put a leakage path across the signal,
                that acts as a load too &mdash; and produces the same pull towards neutral.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                A good electrode was scrapped on the evidence of a test that could not have given a
                right answer. The meter was accurate; it was simply the wrong instrument for this
                source, and nothing about it announced that.
              </p>
              <p>
                It also shows why the direction of an error is worth knowing. &ldquo;Reads towards
                neutral&rdquo; is a fingerprint. Recognising it turns a week of substitutions into a
                single sensible question about input impedance.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Putting it to work</ContentEyebrow>

        <ConceptBlock
          title="Two questions before any measurement that matters"
          plainEnglish="What is the source impedance, and can I afford to be in the circuit? Answer those and the right instrument usually picks itself."
          onSite="Thirty seconds of thought before probing beats an afternoon of chasing a reading that was never real."
        >
          <p>
            Everything in this section reduces to a habit, and the habit is two questions asked
            before the probes come out.
          </p>
          <ul>
            <li>
              <strong>What is the source impedance?</strong> If it is low &mdash; a power circuit, a
              transmitter output, a resistor network in a panel &mdash; almost any meter will do. If
              it is high, or you do not know, find out before believing a reading.
            </li>
            <li>
              <strong>Can I afford to be in the circuit?</strong> If the answer is no, either
              because the process is running or because breaking the loop kills the transmitter, the
              question is settled before you start: clamp on, use designed-in test provision, or
              take the measurement somewhere else.
            </li>
          </ul>
          <p>
            The second question has a corollary worth stating plainly, because it is the one that
            gets people hurt.{' '}
            <strong>
              On instrument transformer circuits, the answer is never to simply disconnect
              something.
            </strong>{' '}
            A CT secondary gets shorted before anything is removed, and a VT secondary does not get
            shorted at all.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What this sets up for the rest of Module 4"
          plainEnglish="This section was about the act of measuring. The rest of the module is about the numbers that come out of it."
          onSite="Everything here applies underneath the later sections — a specification is only meaningful if the measurement was valid in the first place."
        >
          <p>The remaining sections build on this one in a definite order:</p>
          <ul>
            <li>
              <strong>Section 2</strong> &mdash; frequency and time, where the quantity is measured
              by counting rather than by comparison, and the errors are of a different kind
              altogether.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; accuracy, resolution and error, which puts numbers
              on how wrong a reading is allowed to be, and separates ideas that get used
              interchangeably and should not be.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; the instruments themselves: multimeters, clamp
              meters and oscilloscopes, and what each is genuinely for.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; interpreting and logging readings, where a single
              measurement becomes a record somebody else will act on.
            </li>
          </ul>
          <p>
            Keep this section&rsquo;s idea in view throughout.{' '}
            <strong>
              A specification on a data sheet describes the instrument, not the measurement.
            </strong>{' '}
            A meter accurate to 0.05 per cent reading three per cent of the truth through a loading
            error is still reporting a number that is 97 per cent wrong, and no amount of accuracy
            in the instrument can rescue it.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'How do I find out my meter’s input resistance?',
              answer:
                'It is on the data sheet, usually quoted as input impedance for the DC volts function — commonly around 10 MΩ for a general-purpose instrument. Meters intended for high-impedance work quote a much higher figure, and some quote different values on different ranges. If a millivolt reading from an unfamiliar sensor matters, look it up before trusting it rather than after.',
            },
            {
              question: 'Does loading affect a 4–20 mA loop?',
              answer:
                'Not in the same way, and that is part of the appeal of the standard. A current loop carries its information in the current, and Module 3 Section 1 showed the current is the same at every point regardless of the resistances around it. What a loop does care about is total burden against available supply voltage, which is a headroom question rather than a loading one.',
            },
            {
              question: 'Is a clamp meter affected by burden?',
              answer:
                'A clamp meter does not sit in the circuit, so it adds no burden and does not need the circuit broken — which is exactly why it is so useful on a live loop. It has its own limitations instead: it must be able to resolve the current in question, which for a 4–20 mA signal means an instrument specified for milliamps rather than a general-purpose clamp built for load currents.',
            },
            {
              question: 'If self-heating is always positive, can I just subtract it?',
              answer:
                'Not reliably, because it is not a constant. How much the element heats depends on how readily it sheds heat into whatever surrounds it, so the same sensor self-heats differently in still air, in flowing water, and in a thermowell filled with paste. That variability is why the practical answers are limiting the excitation current or pulsing it, rather than correcting for it afterwards.',
            },
            {
              question: 'Why is a CT’s safe state a short circuit when that sounds so wrong?',
              answer:
                'Because a CT is a current source, and a current source is happiest into a low impedance. Shorting the secondary does not increase the current — the current is set by the line current and the turns ratio, and it will be no more than it would deliver to a normal instrument. What the short does is relieve the CT of having to develop any voltage. It is the opposite of a voltage source, where a short is the dangerous condition.',
            },
            {
              question: 'Do these effects matter on ordinary installation testing?',
              answer:
                'Rarely, and that is worth saying plainly rather than leaving as an implication. Power circuits are low-impedance sources, so voltmeter loading is negligible; insulation resistance testers are designed around the very high resistances they meet; and clamp meters avoid the ammeter problem entirely. The effects in this section become significant when you move to sensors that produce tiny signals from high source impedances — which is most of what Module 2 covered.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A measuring instrument is a component in the circuit it measures. That is the whole section in one sentence.',
            'A voltmeter must draw current to work, and that current through the source’s own resistance drops part of the voltage you wanted to read.',
            'Loading error is a voltage divider: V_meter = V_source × R_meter ÷ (R_source + R_meter).',
            '🔴 A 300 MΩ source producing 100 mV reads about 3.2 mV on a 10 MΩ meter — three per cent of the truth, with nothing faulty.',
            'The swamping rule: the meter’s resistance must far exceed the source’s. It is a ratio, so the same meter can be perfect on a thermocouple and useless on a pH electrode.',
            'Loading pulls a reading towards zero — on a pH loop that means towards neutral, which is a recognisable fingerprint.',
            'Null-balance draws no current at balance, so it cannot load the source at all. Comparing against a known standard often beats measuring directly.',
            'An ammeter must carry the current, so the circuit has to be broken — which de-energises a two-wire transmitter — and it adds burden.',
            'A VT behaves as a voltage source into an open circuit. A CT behaves as a current source into what is nearly a short circuit.',
            '🔴 Never open-circuit an energised CT secondary. Stepping current down means stepping voltage up, and an open CT is a step-up transformer on a live line.',
            '🔴 A CT secondary carries no fuse, because a blown fuse would create the very open circuit that is dangerous. A VT fails the opposite way, into a short — so the two are protected on opposite principles.',
            'Short the CT secondary — using the test switch or shorting link — before removing an instrument.',
            'An ohmmeter injects current, so P = I²R warms an RTD or thermistor. Self-heating is always a positive error.',
            'Reducing excitation current reduces heating but shrinks the signal and worsens signal-to-noise. Pulsing the current gets both, at the cost of sample rate.',
            'Self-heating varies with what the sensor is immersed in, so it cannot simply be subtracted.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 4.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 4</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Frequency and time
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule4Section1;
