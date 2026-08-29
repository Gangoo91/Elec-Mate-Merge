/**
 * Module 2 · Section 2 — Temperature sensors: RTDs, thermistors and thermocouples
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * The old page listed the three device families and what each was "used for",
 * which is the treatment that lets a learner leave able to name them and unable
 * to choose between them. This version is organised around the choice, because
 * that is the decision an instrument person actually makes.
 *
 * Two things are taught here that the old page did not have at all, and both
 * are the sort of thing that produces a wrong reading with no fault anywhere:
 *
 *  1. LEAD RESISTANCE on an RTD. A two-wire RTD adds the resistance of its own
 *     cable to the measurement, and on a 100 Ω sensor that is a large error.
 *     Three- and four-wire connections exist to deal with it, and they deal
 *     with it in genuinely different ways — the three-wire trick only works if
 *     the two current-carrying legs are equal.
 *  2. ALPHA. Two Pt100s can be built to different temperature coefficients and
 *     will disagree in the same process. The "European" 0.00385 value is the
 *     one normally meant, but it is a choice, not a law.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.21, extracted to scratchpad/src/m2s2_temperature.txt. Cross-checked
 * against the Rosemount temperature sensor and 644 transmitter manuals held in
 * ~/Desktop/hav/instrumentation.
 *
 * ⚠️ NO STANDARD NUMBER IS CITED. The tolerance-class standard for industrial
 * platinum thermometers would strengthen the RTD section considerably, but we
 * do not hold it and it is paywalled — so the teaching point is made without
 * it rather than guessed at. See NOTE-instrumentation-sources.md.
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
  'Temperature sensors: RTDs, thermistors and thermocouples | Instrumentation Module 2.2 | Elec-Mate';
const DESCRIPTION =
  'How each temperature sensing element actually works, what lead resistance does to an RTD reading, why two- three- and four-wire connections exist, what alpha means on a Pt100, and how to choose between an RTD, a thermistor and a thermocouple for a given duty.';

const outcomes = [
  'Describe how an RTD, a thermistor and a thermocouple each produce their output',
  'Explain why an RTD is linear and insensitive while a thermistor is sensitive and non-linear',
  'Calculate the error a two-wire RTD connection introduces, and say why it matters on a 100 Ω sensor',
  'Explain how three-wire and four-wire RTD connections cancel lead resistance, and where the three-wire method fails',
  'Say what alpha means on a platinum RTD and why two Pt100s can disagree',
  'Choose between an RTD, a thermistor and a thermocouple for a stated duty, and justify it',
  'Explain what a thermowell does to response time and why that is a trade worth making',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the major difference between a thermistor and an RTD?',
    options: [
      'Thermistors work at higher temperatures',
      'Thermistors are highly sensitive but non-linear; RTDs are relatively insensitive but very linear',
      'RTDs are made of metal oxide and thermistors of pure metal wire',
      'Thermistors require a thermowell and RTDs do not',
    ],
    correctIndex: 1,
    explanation:
      'Linearity is the major difference. Thermistors are made of metal oxide, are highly sensitive and markedly non-linear. RTDs are made of pure metal wire — usually platinum or copper — and are relatively insensitive but very linear. That is why thermistors turn up where high accuracy is not the point, including a great deal of consumer equipment.',
  },
  {
    id: 2,
    question:
      'A Pt100 is connected in two-wire configuration with 1 Ω in each leg of the cable. What error does that introduce?',
    options: [
      'None — the resistances cancel out',
      'The instrument sees 2 Ω more than the sensor, and reads high',
      'The instrument sees 1 Ω more than the sensor, and reads low',
      'It depends entirely on the excitation current',
    ],
    correctIndex: 1,
    explanation:
      'A two-wire connection puts both cable legs in series with the sensing element, so the instrument measures the RTD plus 2 Ω. On a 100 Ω sensor at 0 °C that is a substantial error in the reading direction of "hotter than it really is". Nothing is faulty — the wiring method is simply reporting the cable as well as the process.',
  },
  {
    id: 3,
    question: 'What assumption does the three-wire RTD method depend on?',
    options: [
      'That the excitation current is exactly 1 mA',
      'That the two current-carrying wires have the same resistance as each other',
      'That the RTD is exactly 100 Ω at 0 °C',
      'That the cable run is under 10 metres',
    ],
    correctIndex: 1,
    explanation:
      'The three-wire circuit cancels lead resistance by subtracting the drop measured on one current-carrying wire from the drop measured across the RTD plus the other. That only works if the two current-carrying legs — including every connection and terminal block within them — are genuinely equal. If one has more resistance than the other, an error appears.',
  },
  {
    id: 4,
    question: 'Which connection makes wire resistance genuinely irrelevant?',
    options: ['Two-wire', 'Three-wire', 'Four-wire', 'None — it is always a factor'],
    correctIndex: 2,
    explanation:
      'In a four-wire circuit a true determination of the RTD voltage can be made regardless of how much resistance each wire has, or even if the wire resistances differ from one another. Three-wire is a cost compromise that works only while the two current-carrying legs match; four-wire has no such dependency.',
  },
  {
    id: 5,
    question: 'On a platinum RTD, what does the alpha value describe?',
    options: [
      'The maximum temperature the sensor can withstand',
      'The temperature coefficient of resistance, which depends on the alloying of the metal',
      'The tolerance class of the sensor',
      'The excitation current the instrument must supply',
    ],
    correctIndex: 1,
    explanation:
      'Alpha is the temperature coefficient of resistance, and it varies according to the alloying of the platinum. Reference-grade wire commonly has an alpha of 0.003902; industrial platinum alloy is commonly available at 0.00385 (the "European" value) and 0.00392 (the "American" value), with 0.00385 the one most commonly used.',
  },
  {
    id: 6,
    question:
      'A duty needs measurement in a furnace flue at around 900 °C. Which family is the sensible starting point?',
    options: [
      'A thermistor, because it is the most sensitive',
      'A thermocouple, because the range suits it',
      'A Pt100 RTD, because it is the most linear',
      'Any of the three — temperature range does not affect the choice',
    ],
    correctIndex: 1,
    explanation:
      'Range drives this one. Thermocouples cover the high temperatures that suit furnace and flue work; thermistors are sensitive but suited to narrow, lower ranges; RTDs are the accurate choice over moderate ranges but are not the natural fit at flue temperatures. Range first, then accuracy, then the practicalities of mounting and wiring.',
  },
];

const InstrumentationModule2Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 2"
        title="Temperature sensors"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three families of sensing element, how each one produces its output, and the wiring detail
          that quietly changes the answer.
        </p>

        <TLDR
          points={[
            'RTDs are pure metal wire — usually platinum — and always rise in resistance with temperature. Relatively insensitive, but very linear.',
            'Thermistors are metal oxide, can go either way with temperature, and are highly sensitive but markedly non-linear. Accuracy is not their strong point.',
            'Thermocouples generate their own small voltage from a junction of two dissimilar metals, and cover the widest and highest temperature ranges.',
            '🔴 A two-wire RTD adds its own cable resistance to the reading. On a 100 Ω sensor that is a real error with nothing faulty anywhere — which is why three- and four-wire connections exist.',
            'Alpha is the temperature coefficient of the platinum, and it is a choice. Two Pt100s built to different alpha values will disagree in the same process.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Three ways to sense heat</ContentEyebrow>

        <ConceptBlock
          title="The three families, and what actually distinguishes them"
          plainEnglish="One changes resistance a lot but unpredictably. One changes resistance a little but very predictably. One makes its own voltage."
          onSite="You can usually tell which you are looking at from the wiring: three or four wires to a small element means RTD, two wires in a matched pair with a distinctive plug means thermocouple."
        >
          <p>
            Section 2.1 established that a primary sensing element touches the process and produces
            a physical effect rather than a signal. For temperature, there are three ways of doing
            that, and they differ in ways that decide the job.
          </p>
          <p>
            <strong>Thermistors</strong> are devices made of metal oxide which either increase in
            resistance with increasing temperature — a positive temperature coefficient — or
            decrease with increasing temperature, a negative temperature coefficient.
          </p>
          <p>
            <strong>RTDs</strong> — resistance temperature detectors — are made of pure metal wire,
            usually platinum or copper, and{' '}
            <strong>always increase in resistance with increasing temperature</strong>.
          </p>
          <p>
            The major difference between them is <strong>linearity</strong>. Thermistors are highly
            sensitive and non-linear; RTDs are relatively insensitive but very linear. That single
            trade explains where each one ends up: thermistors are typically used where high
            accuracy is unimportant, and a great deal of consumer equipment uses them for exactly
            that reason. RTDs are what you find where the number has to be trusted.
          </p>
          <p>
            <strong>Thermocouples</strong> are different in kind. Rather than changing resistance, a
            junction of two dissimilar metals generates a small voltage that varies with
            temperature. They are self-powered in the sense that the junction produces the signal —
            it is possible to build a self-powered thermocouple indicator, driving an analogue meter
            movement directly from the junction, though the accuracy of such an arrangement is poor.
          </p>
        </ConceptBlock>

        <Pullquote>
          Sensitive and non-linear, or insensitive and linear. Almost everything about choosing a
          temperature sensor falls out of that one trade.
        </Pullquote>

        <InlineCheck
          id="ins-2-2-families"
          question="A sensing element made of metal oxide whose resistance FALLS as temperature rises. What is it?"
          options={[
            'A platinum RTD',
            'A thermocouple',
            'A thermistor with a negative temperature coefficient',
            'A copper RTD',
          ]}
          correctIndex={2}
          explanation="Metal oxide construction and a falling resistance with rising temperature makes it an NTC thermistor. An RTD is pure metal wire and always rises with temperature; a thermocouple produces a voltage rather than a resistance change."
        />

        <SectionRule />
        <ContentEyebrow>The number on the nameplate</ContentEyebrow>

        <ConceptBlock
          title="Pt100, and what the 100 actually refers to"
          plainEnglish="A Pt100 is a platinum element with a resistance of 100 ohms at 0 °C. The number is a reference point, not a range."
          onSite="If a nameplate says Pt100 and the instrument reads 100 Ω, the process is at 0 °C — not at 100 of anything."
        >
          <p>
            <strong>100 Ω is a very common reference resistance</strong> for industrial RTDs, quoted
            at 0 degrees Celsius. That is where the name comes from: a Pt100 is a platinum element
            reading 100 Ω at 0 °C.
          </p>
          <p>
            From that reference point, the resistance rises predictably with temperature. Two ways
            of getting a temperature from a measured resistance are in normal use:
          </p>
          <ul>
            <li>
              <strong>Calculate it</strong> from the reference resistance and the temperature
              coefficient.
            </li>
            <li>
              <strong>Look it up</strong> in a published table of resistance against temperature for
              that RTD type. Tables capture the nuances of the RTD&rsquo;s non-linearity without any
              mathematical complexity — read across, and interpolate between the two nearest entries
              if the value falls between them.
            </li>
          </ul>
          <p>
            That second point is worth sitting with, because it corrects something the first section
            of this module simplified. An RTD is <em>very linear compared with a thermistor</em>. It
            is not perfectly linear. Over a wide span the curve matters, which is exactly why the
            tables exist and why a smart transmitter holds the characterisation internally.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Alpha — why two Pt100s can disagree"
          plainEnglish="The temperature coefficient of the platinum depends on how the metal is alloyed, and there is more than one industry value in circulation."
          onSite="When a replacement RTD reads differently from the one it replaced over the same process, check alpha before you check anything else."
        >
          <p>
            Platinum is a common wire material for industrial RTD construction, and{' '}
            <strong>
              the alpha value for platinum varies according to the alloying of the metal
            </strong>
            . Alpha is the temperature coefficient of resistance — how much the resistance changes
            per degree.
          </p>
          <ul>
            <li>
              For <strong>reference grade</strong> platinum wire, the most common alpha value is{' '}
              <strong>0.003902</strong>.
            </li>
            <li>
              Industrial-grade platinum alloy RTD wire is commonly available in two coefficient
              values: <strong>0.00385</strong>, the &ldquo;European&rdquo; value, and{' '}
              <strong>0.00392</strong>, the &ldquo;American&rdquo; value.
            </li>
            <li>
              Of those, <strong>0.00385 is the one most commonly used</strong> — including in the
              United States.
            </li>
          </ul>
          <p>
            Both are legitimately Pt100s. Both read 100 Ω at 0 °C. They diverge as the temperature
            moves away from that reference point, because they are rising at different rates. Fit
            one where the transmitter is configured for the other and you have a reading that is
            correct at 0 °C and progressively wrong everywhere else — with no fault to find.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The wiring changes the answer</ContentEyebrow>

        <ConceptBlock
          title="Two-wire RTDs measure the cable as well as the process"
          plainEnglish="An RTD reports a resistance. In a two-wire connection the cable's own resistance is in series with it, so the instrument adds the two together and cannot tell them apart."
          onSite="Two-wire RTD connections are acceptable over very short runs and almost nowhere else. If you find one on a long run, you have probably found the error."
        >
          <p>
            This is the single most important practical point about RTDs, and it catches people who
            are perfectly comfortable with electrical work — because nothing is faulty.
          </p>
          <p>
            The instrument determines temperature from resistance. In a two-wire connection, the
            resistance it sees is the sensing element <em>plus both legs of the cable</em>. Take a
            run with 1 Ω in each leg: the instrument measures the RTD plus 2 Ω, and 2 Ω on a 100 Ω
            reference is not a rounding error. The reading is high, consistently, and the instrument
            has no way of knowing.
          </p>
          <p>
            Note what makes this worse than it sounds. Cable resistance changes with{' '}
            <em>ambient</em> temperature, so the error is not even a fixed offset you could
            calibrate out — it drifts with the weather and with the seasons.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Four-wire: wire resistance stops mattering at all"
          plainEnglish="Push a known current down one pair and measure the voltage on the other. Because the measuring pair carries almost no current, its resistance drops almost no voltage."
          onSite="Four-wire is the reference method. If you need to prove what an RTD is really doing, this is the connection that will tell you."
        >
          <p>
            The four-wire arrangement separates the two jobs. One pair carries the excitation
            current through the sensing element. The other pair measures the voltage developed
            across it, and because the measuring circuit draws essentially no current, the
            resistance of those sensing wires drops essentially no voltage.
          </p>
          <p>
            The consequence is the important part:{' '}
            <strong>
              a true determination of RTD voltage — and therefore RTD resistance — can be made
              regardless of how much resistance each wire has, or even if the wire resistances
              differ from each other
            </strong>
            . Wire resistance becomes genuinely irrelevant rather than merely small.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Three-wire: a compromise, and what it quietly assumes"
          plainEnglish="Three wires cost less than four and cancel most of the lead resistance — but only while the two current-carrying legs are equal to one another."
          onSite="Three-wire is the industrial default. Its assumption fails at terminal blocks and junction boxes, not in the cable itself."
        >
          <p>
            The three-wire connection sits between the two. One meter reads the voltage across the
            RTD <em>plus</em> the bottom current-carrying wire; a second reads the drop across the
            top current-carrying wire alone. Assuming both current-carrying wires have very nearly
            the same resistance, subtracting one from the other yields the voltage across the RTD:
          </p>
          <p>
            <strong>
              V<sub>RTD</sub> = V<sub>meter A</sub> &minus; V<sub>meter B</sub>
            </strong>
          </p>
          <p>
            If the resistances of the two current-carrying wires are precisely identical —{' '}
            <strong>
              and this includes the electrical resistance of any connections within those paths,
              such as terminal blocks
            </strong>{' '}
            — the calculated RTD voltage is the true one and no wire-resistance error appears.
          </p>
          <p>
            If one of those wires has more resistance than the other, it does not. The three-wire
            circuit saves wire cost over a four-wire circuit at the expense of a potential
            measurement error, and its error-cancelling property{' '}
            <strong>hinges on an assumption that may or may not be true.</strong>
          </p>
          <p>
            That is why the practical failure is rarely the cable. It is a corroded terminal, a
            poorly made termination in a junction box, or a repair that put a joint in one leg and
            not the other. The cable is symmetrical; the connections are where symmetry gets lost.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-2-threewire"
          question="A three-wire Pt100 reads correctly at ambient but drifts increasingly wrong as the process heats. A technician finds a badly made joint in ONE of the current-carrying legs. Why does that matter?"
          options={[
            'It adds resistance, and any added resistance is an error',
            'It breaks the assumption that the two current-carrying legs are equal, so the cancellation no longer works',
            'It reduces the excitation current below specification',
            'It has no effect — three-wire connections cancel all lead resistance',
          ]}
          correctIndex={1}
          explanation="Three-wire cancellation works by subtracting the drop on one current-carrying leg from the drop on the other. That is only valid while the two legs — including their terminations — are equal. An extra joint in one leg destroys the symmetry the whole method depends on, and the error appears."
        />

        <ConceptBlock
          title="Self-heating — the measurement warms what it is measuring"
          plainEnglish="To read an RTD's resistance you have to pass current through it. Current through a resistance makes heat, and that heat is inside the thing you are trying to measure."
          onSite="Self-heating gets worse in still air or a dry thermowell, and better where the process is carrying the heat away. The same sensor can behave differently in two installations."
        >
          <p>
            An RTD is a resistance, and the only way to measure a resistance is to pass a known
            current through it and read the voltage. That excitation current dissipates power in the
            element — and the element is a temperature sensor.
          </p>
          <p>
            The result is a small positive error: the RTD reads slightly hotter than the process,
            because it genuinely is slightly hotter than the process. This is{' '}
            <strong>self-heating error</strong>, and it is a property of the measurement rather than
            a fault in it.
          </p>
          <p>Its size depends on two things:</p>
          <ul>
            <li>
              <strong>How much current the instrument uses.</strong> More current gives a larger,
              cleaner signal — and more self-heating. That is a genuine design trade, not an
              oversight.
            </li>
            <li>
              <strong>How well the heat escapes.</strong> An element in a well-fitted thermowell in
              flowing liquid sheds heat readily. The same element in still air, or in a thermowell
              with an air gap around it, does not.
            </li>
          </ul>
          <p>
            The practical lesson is about testing rather than installation. An RTD bench-checked in
            still air behaves differently from the same RTD in a flowing process, so a small
            discrepancy between bench and field is not automatically a fault. It may simply be the
            same sensor losing heat at two different rates.
          </p>
        </ConceptBlock>

        <Scenario
          title="A replacement sensor that reads perfectly at zero"
          situation="A Pt100 on a jacketed vessel is replaced after a failure. Bench-checked in an ice bath before fitting, the new element reads 100 Ω exactly. Installed and running, it reads about 4 °C low at an operating temperature near 150 °C, and the discrepancy grows with temperature."
          whatToDo="Note the shape of the error before touching the wiring: correct at 0 °C, increasingly wrong as temperature rises. That is not lead resistance, which would offset the reading everywhere including the ice bath. It is the signature of a coefficient mismatch. Check the alpha value of the replacement against what the transmitter is configured for — a 0.00392 element read by a transmitter set for 0.00385 behaves exactly like this. Either reconfigure the transmitter or fit the matching element."
          whyItMatters="Both sensors are genuine Pt100s and both are within specification. Nothing has failed. The fault is a mismatch between two legitimate industry conventions, and it is invisible at the one temperature most people bench-check at. Learn the shape of the error and you will diagnose it in a minute rather than an afternoon."
        />

        <SectionRule />
        <ContentEyebrow>The thermocouple problem</ContentEyebrow>

        <ConceptBlock
          title="A thermocouple measures a DIFFERENCE, not a temperature"
          plainEnglish="Wherever two dissimilar metals join, a small voltage appears. There are always two such junctions in a thermocouple circuit, and the meter sees the difference between them."
          onSite="This is the single idea that makes thermocouples make sense. Everything awkward about them follows from it."
        >
          <p>
            In its simplest form a thermocouple is nothing more than a pair of dissimilar-metal
            wires joined at one end. That joint — the one in the process — is the{' '}
            <strong>measurement junction</strong>.
          </p>
          <p>
            But the circuit cannot end there. The two wires have to join something eventually, and
            wherever a thermocouple wire meets the instrument&rsquo;s own wire, another
            dissimilar-metal junction is formed. That is the <strong>reference junction</strong>.
          </p>
          <p>The voltage the instrument sees is the difference between the two:</p>
          <p>
            <strong>
              V<sub>meter</sub> = V<sub>J1</sub> &minus; V<sub>J2</sub>
            </strong>
          </p>
          <p>
            This makes thermocouples <strong>inherently differential sensing devices</strong>: they
            generate a measurable voltage in proportion to the difference in temperature between two
            locations. It is an inescapable fact of thermocouple circuits, and it complicates
            interpreting any voltage you measure from one.
          </p>
          <p>
            Put plainly: a thermocouple cannot tell you how hot the process is. It can only tell you
            how much hotter the process is than the place where its wires were terminated.
          </p>
        </ConceptBlock>

        <Pullquote>
          A thermocouple never tells you a temperature. It tells you a difference — and something
          else has to supply the other half of the sum.
        </Pullquote>

        <ConceptBlock
          title="Thermocouple types — and how to identify one with the labels gone"
          plainEnglish="Different metal pairs give different voltages and suit different temperature ranges. Colour coding varies between countries, so the metals themselves are the identification that always works."
          onSite="Learn the two physical tests: iron rusts and is magnetic, and on a type K it is the NEGATIVE leg that is magnetic. Between them you can identify most of what you will meet."
        >
          <p>
            Thermocouples exist in many types, each a different pair of dissimilar metals. The ones
            you are most likely to meet, identified by their metals rather than their colours:
          </p>
          <ul>
            <li>
              <strong>Type T</strong> — copper positive, constantan negative. Roughly &minus;185 to
              370 °C. The positive leg is visibly copper-coloured against a silver negative.
            </li>
            <li>
              <strong>Type J</strong> — iron positive, constantan negative. Roughly 0 to 760 °C. The
              iron leg is <strong>magnetic and will rust</strong>, which is the easiest
              identification in the field.
            </li>
            <li>
              <strong>Type E</strong> — chromel positive, constantan negative. Roughly 0 to 870 °C.
              The positive leg has a shiny finish against a dull negative.
            </li>
            <li>
              <strong>Type K</strong> — chromel positive, alumel negative. Roughly 0 to 1260 °C, and
              the workhorse of industrial temperature measurement. 🔴 Here the{' '}
              <strong>positive leg is non-magnetic and the negative leg is magnetic</strong> — the
              opposite way round from type J, and a genuinely useful test.
            </li>
            <li>
              <strong>Type N</strong> — nicrosil positive, nisil negative. Roughly 0 to 1260 °C.
            </li>
            <li>
              <strong>Types S and B</strong> — platinum and platinum-rhodium alloys, for the highest
              temperatures. Expensive, and used where nothing cheaper survives.
            </li>
          </ul>
          <p>
            🔴 A warning about colour, because it is the thing most people reach for first.{' '}
            <strong>
              Thermocouple colour coding is not international, and the UK does not use the same
              scheme as the United States.
            </strong>{' '}
            Several national codes exist, they disagree with one another, and there is an
            &ldquo;international&rdquo; code that matches none of them. American reference material
            will tell you the negative conductor is always red; on cable coded to a British or
            European scheme that is simply not true.
          </p>
          <p>
            So treat colour as a hint to be confirmed, never as proof — and on unfamiliar cable,
            confirm it against the specification for the installation you are standing in rather
            than against a table you half remember.
          </p>
          <p>
            What does travel is the metal.{' '}
            <strong>A magnet is a serious diagnostic tool here</strong>: iron on a type J and alumel
            on a type K are both magnetic, and knowing which leg should attract tells you both the
            type and the polarity. Iron also rusts, and copper looks like copper. Those tests work
            on any cable from any country, which is exactly why they are worth learning.
          </p>
          <p>
            Why polarity matters so much follows from the previous block. Reverse the pair and the
            junction voltages subtract in the wrong direction — the instrument still reports a
            temperature, and it is wrong. There is no open circuit and no alarm.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Reference junction compensation — supplying the missing half"
          plainEnglish="Measure how hot the terminals are, look up what voltage that accounts for, and add it back. That is all compensation is."
          onSite="This is why a thermocouple transmitter has a temperature sensor inside it that has nothing to do with your process."
        >
          <p>
            To turn a meter reading into a process temperature, the reference junction&rsquo;s
            contribution has to be added back:
          </p>
          <p>
            <strong>
              V<sub>J1</sub> = V<sub>J2</sub> + V<sub>meter</sub>
            </strong>
          </p>
          <p>Done manually, the procedure is exactly what that equation says:</p>
          <ul>
            <li>
              Place a thermometer near the reference junction — where the thermocouple wire attaches
              to the instrument leads — to find its temperature.
            </li>
            <li>
              Look that temperature up in a thermocouple table for the type in use, to find the
              voltage it accounts for.
            </li>
            <li>Add that voltage to the meter reading.</li>
            <li>
              Take the sum back to the same table and read off the temperature it corresponds to.
              That is the process temperature.
            </li>
          </ul>
          <p>
            Modern transmitters do this continuously and automatically —{' '}
            <strong>reference junction compensation</strong> — which is why a thermocouple
            transmitter contains its own temperature sensor measuring its own terminals. That sensor
            is not measuring your process; it is measuring the half of the sum the thermocouple
            cannot supply.
          </p>
          <p>
            It also explains the <strong>isothermal terminal block</strong> you will find inside a
            thermocouple head: both terminals mounted on a ceramic base, chosen to help equalise the
            temperature between the two blocks while keeping them electrically isolated. If the two
            terminals sat at different temperatures, they would not form one clean reference
            junction, and the compensation would be compensating for the wrong thing.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-2-refjunction"
          question="Why does a thermocouple transmitter contain a temperature sensor of its own?"
          options={[
            'To monitor the transmitter electronics for overheating',
            'To measure the reference junction, so the missing half of the differential measurement can be added back',
            'To provide a backup reading if the thermocouple fails',
            'To compensate for cable resistance',
          ]}
          correctIndex={1}
          explanation="A thermocouple only produces a voltage proportional to the difference between the measurement and reference junctions. The transmitter measures its own terminals — the reference junction — looks up the voltage that accounts for, and adds it back. Without that, the reading would drift every time the panel temperature changed."
        />

        <ConceptBlock
          title="Extension wire, and why ordinary cable will not do"
          plainEnglish="Extending a thermocouple with copper does not lengthen the thermocouple — it just moves the reference junction to wherever the copper starts."
          onSite="Thermocouple extension cable is type-specific and polarity-specific. Getting either wrong produces a plausible, wrong reading rather than an obvious failure."
        >
          <p>
            It follows directly from the differential principle: the reference junction forms
            wherever the thermocouple metals meet a different metal. Join type K wire to ordinary
            copper in a junction box and you have not extended the thermocouple — you have{' '}
            <strong>relocated the reference junction into that junction box</strong>, which is
            neither temperature-controlled nor measured.
          </p>
          <p>
            That is what <strong>thermocouple extension wire</strong> is for: conductors matched to
            the thermocouple type, carrying the millivoltage signal onward without creating a new
            dissimilar-metal junction until it reaches the instrument, where compensation is
            applied.
          </p>
          <p>Two practical consequences:</p>
          <ul>
            <li>
              <strong>Type matters.</strong> Extension cable is specific to the thermocouple type,
              so it has to be identified correctly before anything is connected. Colour coding helps
              once you know which national scheme is in use; the magnet and the appearance of the
              metals settle it either way.
            </li>
            <li>
              <strong>Polarity matters.</strong> Reverse the pair and the junction voltages subtract
              in the wrong direction. The reading will still look like a temperature, which is what
              makes it dangerous.
            </li>
          </ul>
          <p>
            Compare this with the RTD lead-resistance problem earlier in this section. Both are
            wiring issues that produce a wrong number with no component fault — but they fail in
            different directions and for entirely different reasons.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Burnout — what happens when a thermocouple fails open"
          plainEnglish="Thermocouples fail by going open circuit. The instrument has to decide what to report when that happens, and it is a genuine design choice."
          onSite="Know which way your instrument drives on burnout before you need to know. Upscale on a heating loop and downscale on a cooling loop are not equivalent."
        >
          <p>
            Thermocouples are consumable. The junction and the wires degrade in service — type K,
            for instance, is attacked by reducing atmospheres as well as by sulphur — and the usual
            end state is the circuit going <strong>open</strong>. That phenomenon is called{' '}
            <strong>burnout</strong>.
          </p>
          <p>
            An open thermocouple produces no meaningful voltage, so the instrument must decide what
            to report. Instruments typically drive the reading hard in one direction so the failure
            is unmistakable rather than plausible — and which direction is a safety decision, not a
            preference.
          </p>
          <p>
            Think about what each choice means on a real loop. On a heating process controlling to a
            setpoint, a reading that fails <em>upscale</em> tells the controller the process is far
            too hot, and it backs the heat off — safe. A reading that failed downscale would tell it
            the process is cold, and it would apply full heat to a process it can no longer see.
          </p>
          <p>
            The correct choice therefore depends on what the loop does when it believes the reading.
            That is a question about the process, not about the instrument, and it is one worth
            asking before commissioning rather than afterwards.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Getting the sensor into the process</ContentEyebrow>

        <ConceptBlock
          title="Thermowells — protection bought with response time"
          plainEnglish="A thermowell is a closed tube that lets you change the sensor without opening the process. It also puts a lump of metal between the process and the element."
          onSite="If a temperature loop responds sluggishly, ask what the sensor is sitting in before you suspect the electronics. Damping in the transmitter is not the only thing that slows a reading."
        >
          <p>
            Most industrial temperature elements do not touch the process directly. They sit inside
            a <strong>thermowell</strong> — a closed-ended tube penetrating the pipe or vessel,
            sealed against the process and open to atmosphere at the top.
          </p>
          <p>What that buys you:</p>
          <ul>
            <li>
              The sensing element can be withdrawn and replaced without opening the process — which,
              as Module 1 Section 5 set out, is the difference between a routine job and a permit.
            </li>
            <li>The element is protected from pressure, flow-induced stress and corrosion.</li>
          </ul>
          <p>What it costs you:</p>
          <ul>
            <li>
              <strong>Response time.</strong> Heat must now travel through the well wall and any air
              gap before it reaches the element. A well-fitted element in a well-designed well is
              slower than a bare one, and a badly fitted one — loose, or with the element not
              bottomed out — is slower still.
            </li>
          </ul>
          <p>
            On a slow process such as a large vessel, that lag is irrelevant. On a fast one, or on a
            loop that has to control tightly, it is part of the process dynamics and it shows up in
            Module 5 as something you cannot tune your way out of.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Measuring without touching</ContentEyebrow>

        <ConceptBlock
          title="Non-contact sensing — and why the surface matters more than the temperature"
          plainEnglish="An infrared thermometer reads the radiation coming off a surface. How much radiation a surface gives off for a given temperature depends on what it is made of and how it is finished — so the same heat can read very differently."
          onSite="Point one at a shiny stainless pipe and a painted one at the same temperature and you will get two different answers. The pipe has not changed; its surface has."
        >
          <p>
            A <strong>pyrometer</strong> or infrared thermometer measures temperature by the thermal
            radiation an object emits, with no physical contact at all. That is genuinely useful
            where contact is impossible — a moving surface, a furnace interior, live switchgear.
          </p>
          <p>
            Aside from being inherently non-linear, the main disadvantage of non-contact sensors is{' '}
            <strong>inaccuracy</strong>, and the reason is worth understanding rather than
            memorising.
          </p>
          <p>
            The <strong>emissivity factor</strong> varies with the composition of a substance — and
            beyond composition, surface finish and shape also affect how much radiation a sensor
            receives from an object. A more comprehensive measure of an object&rsquo;s
            &ldquo;thermal-optical measureability&rdquo; is <strong>emittance</strong>.
          </p>
          <ul>
            <li>
              A perfect emitter of thermal radiation is a <strong>blackbody</strong>, with an
              emittance of <strong>1</strong>.
            </li>
            <li>
              Every real object has an emittance somewhere <strong>between 1 and 0</strong>.
            </li>
          </ul>
          <p>
            Here is the awkward part. The only certain way to know an object&rsquo;s emittance is to
            test its thermal radiation at a known temperature — which assumes you can measure that
            temperature by direct contact, and that is precisely the thing non-contact measurement
            exists to avoid.
          </p>
          <p>
            It is not hopeless: establish the emittance for a given object <em>once</em>, and any
            non-contact pyrometer can then be calibrated for that object&rsquo;s emittance and used
            without contact from then on. But it does explain why a handheld infrared thermometer
            has an emissivity setting, and why a reading taken without adjusting it is an estimate
            rather than a measurement.
          </p>
          <p>
            There is a further trap. Objects also <strong>reflect and transmit</strong> radiation
            from other bodies, which taints what the sensor receives. The extreme case is trying to
            measure the temperature of a silver mirror with an optical pyrometer — you will largely
            be measuring whatever the mirror is reflecting, not the mirror.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-2-emissivity"
          question="An infrared thermometer reads a polished stainless steel pipe as much cooler than a painted pipe alongside it at the same temperature. Why?"
          options={[
            'The stainless pipe genuinely is cooler because metal conducts heat away',
            'The polished surface has a lower emittance, so it radiates less for the same temperature — and it reflects surroundings',
            'The instrument needs recalibrating',
            'Stainless steel is outside the range of infrared measurement',
          ]}
          correctIndex={1}
          explanation="Emittance depends on composition, surface finish and shape. A polished metal surface emits far less radiation than a painted one at the same temperature, and reflects its surroundings on top of that. The instrument is reporting the radiation it receives perfectly accurately — the mistake is assuming that radiation maps to temperature the same way for every surface."
        />

        <SectionRule />
        <ContentEyebrow>Making the choice</ContentEyebrow>

        <ConceptBlock
          title="How to choose, in the order the questions actually arrive"
          plainEnglish="Range first, because it rules things out. Then accuracy. Then the practical business of mounting it and wiring it."
          onSite="Most selection arguments are settled by the first question. If the range excludes a family, nothing else about it matters."
        >
          <p>
            <strong>1. What is the range?</strong> This eliminates faster than anything else.
            Thermocouples cover the widest and highest ranges, which is why furnace, flue and
            combustion work is thermocouple territory. RTDs are the accurate choice across the
            moderate ranges that cover most process plant. Thermistors are sensitive over narrow,
            lower ranges.
          </p>
          <p>
            <strong>2. How accurate does it need to be?</strong> If the number is going to be
            trusted — used for control, for billing, for a quality record — linearity and stability
            matter, and that argues for an RTD. If it is an indication or an over-temperature check,
            a thermistor may be entirely adequate.
          </p>
          <p>
            <strong>3. How fast does it need to respond?</strong> A small element responds faster
            than a large one, and a bare element faster than one in a thermowell. Ask what the loop
            needs before accepting the standard assembly.
          </p>
          <p>
            <strong>4. How will it be wired, and how far?</strong> This is where the earlier part of
            this section becomes a selection question rather than an installation one. A long RTD
            run pushes you towards three- or four-wire, or towards a head-mounted transmitter that
            converts to 4&ndash;20 mA at the sensor and makes the whole question disappear.
          </p>
          <p>
            <strong>5. Can you touch it at all?</strong> If contact is impossible — a moving
            surface, a rotating kiln, energised equipment — non-contact is the only option, and you
            accept the emittance problem as the price. It is a last resort for accuracy and a first
            resort for access.
          </p>
          <p>
            <strong>6. What does the site already use?</strong> Not a purist consideration, but a
            real one. A site standardised on one type has the spares, the calibration equipment and
            the familiarity. A technically marginal improvement is rarely worth being the only one
            of its kind on the plant.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Treating a two-wire RTD connection as a shortcut with no consequence"
          whatHappens="An RTD is terminated two-wire because only a two-core was pulled, or because the third core was damaged and nobody wanted to re-pull. The loop works, the reading looks plausible, and the error — a couple of degrees on a long run — is absorbed into everyone's expectations. It then drifts with ambient temperature through the year."
          doInstead="Treat the connection method as part of the measurement specification, not as a wiring detail. If the cable will not support three-wire, the honest options are to re-pull it, to fit a head-mounted transmitter so only a 4–20 mA signal travels, or to accept and document the error. Quietly absorbing it is the one option that leaves a wrong number in the control system with nothing to find."
        />

        <CommonMistake
          title="Crimping compression lugs onto solid thermocouple wire"
          whatHappens="Fork or ring terminals are crimped onto thermocouple conductors under a screw head, because that is how the rest of the panel is terminated. It works at first. Months later the loop starts reporting burnout intermittently, then permanently — and the thermocouple is replaced, twice, before anyone looks at the termination."
          doInstead="Thermocouple wire is usually SOLID, not stranded, and compression terminals cannot maintain adequate compression on solid wire of any kind. Over time the wire loosens inside the lug, the circuit degrades, and the receiving instrument concludes the thermocouple has failed open. The correct technique for solid wire under a screw head is to wrap it in a semi-circle and clamp it directly under the screw. Compression terminals are right for stranded wire and wrong here."
        />

        <CommonMistake
          title="Bench-checking a replacement element only at zero"
          whatHappens="A new Pt100 is proved in an ice bath, reads 100 Ω, and is signed off as good. In service it disagrees with the old one, increasingly so as the process heats, and the loop is chased for days."
          doInstead="Check at a second point away from the reference, or at minimum confirm the alpha value on the element against the transmitter configuration. A coefficient mismatch is invisible at 0 °C by definition — both elements are 100 Ω there — so the one temperature most convenient to test at is the one temperature guaranteed not to reveal it."
        />

        <FAQ
          items={[
            {
              question: 'Why is platinum used rather than something cheaper?',
              answer:
                'Because it is very linear and very stable over time, which is what an accurate measurement needs. Copper is also used for RTD construction, but platinum is the common industrial choice where the reading has to be trusted.',
            },
            {
              question: 'Is a Pt100 always 100 Ω?',
              answer:
                'It is 100 Ω at 0 °C — that is the reference resistance the name describes. Above that it reads higher, below it lower. Other reference resistances exist, and a nameplate will tell you which one you have.',
            },
            {
              question: 'If four-wire is better, why is three-wire so common?',
              answer:
                'Cost and cabling. Three-wire saves a core over every run and cancels most of the lead resistance, which is good enough for the great majority of industrial duties. Four-wire is reserved for where accuracy genuinely justifies the extra conductor — and it is the method to reach for when proving what a sensor is really doing.',
            },
            {
              question: 'Can I extend an RTD cable with ordinary cable?',
              answer:
                'You can, but you are adding resistance to the legs — and, in a three-wire circuit, you are adding it asymmetrically if you join one leg and not the others equally. Any extension should keep the legs matched, including the joints themselves.',
            },
            {
              question: 'Does a thermocouple need lead-resistance compensation too?',
              answer:
                'Not in the same way, because a thermocouple produces a voltage rather than a resistance to be measured. It has its own wiring discipline instead — the extension conductors must be of the correct type for the thermocouple, which is a different problem with the same consequence if it is got wrong.',
            },
            {
              question: 'Why do smart transmitters get mounted in the sensor head?',
              answer:
                'To shorten the fragile part of the chain, as Section 2.1 set out. Converting resistance to 4–20 mA at the sensor means only a robust signal travels the long distance, and the lead-resistance question stops applying to the cable run entirely.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'RTDs are pure metal wire and always rise in resistance with temperature: insensitive but very linear. Thermistors are metal oxide, can go either way, and are sensitive but non-linear.',
            'Thermocouples generate their own voltage from a junction of two dissimilar metals, and cover the widest and highest ranges.',
            '100 Ω at 0 °C is the common industrial reference — that is what the 100 in Pt100 means.',
            'An RTD is very linear compared with a thermistor, not perfectly linear. Published tables and smart transmitters exist to handle the curve.',
            'Alpha is the temperature coefficient and depends on how the platinum is alloyed: 0.003902 reference grade, 0.00385 "European" and 0.00392 "American", with 0.00385 most common.',
            'A two-wire RTD adds both cable legs to the measurement, and the error drifts with ambient temperature rather than staying a fixed offset.',
            'Four-wire makes wire resistance irrelevant regardless of how much there is or whether the legs match. Three-wire cancels it only while the two current-carrying legs are equal — including their terminations.',
            'A thermowell buys replaceability and protection, and costs response time. On a fast loop that lag becomes process dynamics you cannot tune away.',
            'Choose in order: range, then accuracy, then response, then wiring distance, then what the site already runs.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Sensor, transducer, transmitter
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Pressure and flow sensors
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section2;
