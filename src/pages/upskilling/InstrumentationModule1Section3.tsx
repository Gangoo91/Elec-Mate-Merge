/**
 * Module 1 · Section 3 — Measurement, indication and control
 *
 * Rewritten 2026-08-29, against the Section 1 exemplar.
 *
 * The old page was ~735 lines of bare <div>s on a hardcoded #1a1a1a under its
 * own sticky header, titled "Measurement vs Control vs Indication". Its bones
 * were right — three roles, open vs closed loop — but it taught them as three
 * columns of bullet lists. Accuracy, precision, resolution and range appeared
 * as four one-line definitions in a grid, which is exactly the treatment that
 * lets a learner leave believing they are the same idea said four ways. It
 * also carried a 10-question quiz keyed on `correctAnswer`, which the Quiz
 * primitive reads perfectly well (`resolveCorrectIndex` prefers it over
 * `correctIndex`) — the quiz was fine; only its framing was thin.
 *
 * The page is now built from the shared learning primitives, and its job has
 * been narrowed. Section 1 already teaches the four boxes, the five terms, the
 * measurement-system-versus-control-system distinction, and what indicators,
 * recorders and switches are. **None of that is re-taught here.** Section 1 is
 * referred back to where it helps and then left alone. This page goes down a
 * level inside each of the three roles instead:
 *
 *   - Measurement — a reading is manufactured by a chain rather than read off
 *     the process; range and span; accuracy vs precision vs resolution vs
 *     repeatability as four genuinely different properties; and the fact that
 *     every value carries an uncertainty whether or not anyone writes it down.
 *   - Indication — local vs remote, why the local reading still earns its
 *     place next to a control room, and alarms and annunciation as a role in
 *     their own right rather than an indicator turned up loud.
 *   - Control — open-loop vs closed-loop and why feedback is the thing that
 *     makes a loop; manual vs automatic; and what the controller is actually
 *     comparing when it computes an error.
 *
 * The through-line: measurement, indication and control fail independently, so
 * a technician who can tell the three apart can split any loop problem in half
 * before touching a tool.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.29 — the heat exchanger loop, the negative-feedback treatment and the
 * "load"/wild-variable idea behind the scenario come from there.
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

const TITLE = 'Measurement, indication and control | Instrumentation Module 1.3 | Elec-Mate';
const DESCRIPTION =
  'The three roles instrumentation performs, taken a level deeper. How a reading is actually manufactured, why accuracy, precision, resolution and repeatability are four different things, what local indication gives you that a control room cannot, and why feedback is what turns control into a loop.';

const outcomes = [
  'Describe a measurement as a chain of conversions, and say what each link can add to the error',
  'State a reading properly — value, units and range — and explain why a number alone is not a measurement',
  'Tell accuracy, precision, resolution and repeatability apart, and say which one a control loop cares about most',
  'Explain what a local indication gives you that the same value on a control room screen cannot',
  'Treat alarms and annunciation as a distinct role, not as indication turned up loud',
  'Distinguish open-loop from closed-loop control, and identify what closes a loop',
  'Say exactly what a controller compares, and what manual mode does and does not switch off',
  'Split a loop complaint between the three roles before reaching for a tool',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An instrument is checked five times at the same condition. It reads 40.2, 40.2, 40.3, 40.2 and 40.2 °C while a trusted reference says 38.0 °C. The instrument is:',
    options: [
      'Accurate but not repeatable',
      'Repeatable but not accurate',
      'Neither repeatable nor accurate',
      'Both repeatable and accurate',
    ],
    correctIndex: 1,
    explanation:
      'The readings cluster tightly, so repeatability is good. They cluster around the wrong value, so accuracy is poor. That is the most workable kind of fault to find, because a consistent offset can be calibrated out — the instrument is telling the same lie every time.',
  },
  {
    id: 2,
    question: 'A display shows a tank level as 3.4172 m. What does the fourth decimal place prove?',
    options: [
      'That the measurement is accurate to a tenth of a millimetre',
      'That the instrument has been calibrated recently',
      'Only that the display has that much resolution',
      'That the transmitter is digital rather than analogue',
    ],
    correctIndex: 2,
    explanation:
      'Resolution is the smallest change an instrument can show. It is a property of the display and the conversion, and it is cheap to add. Accuracy is a property of the whole chain and can only be established against a better reference. A high-resolution display fed by a poor measurement reports a wrong number very precisely.',
  },
  {
    id: 3,
    question:
      'A heating system sets its flow temperature from a measurement of the outside air temperature. With respect to room temperature, this is:',
    options: [
      'Closed-loop, because a temperature is being measured',
      'Open-loop, because the controlled variable is not measured and fed back',
      'Closed-loop, because there is a controller and a final control element',
      'Neither — it is an indication system',
    ],
    correctIndex: 1,
    explanation:
      'Measuring something is not the same as closing the loop. The loop closes only when the controlled variable itself is measured and returned to the controller. Here nothing tells the controller how warm the rooms actually are, so an open window or a room full of people goes uncorrected.',
  },
  {
    id: 4,
    question: 'What does a feedback controller compare?',
    options: [
      'The final control element position against the controller output',
      'The process variable against the setpoint',
      'The process variable against its previous value',
      'The setpoint against the range of the transmitter',
    ],
    correctIndex: 1,
    explanation:
      'The controller compares two numbers — the measured process variable and the setpoint — and the difference between them is the error. Everything else a controller does is a decision about how to turn that error into an output.',
  },
  {
    id: 5,
    question: 'A loop is switched from automatic to manual. What stops happening?',
    options: [
      'The process variable is no longer measured',
      'The final control element no longer responds to the controller output',
      'The controller no longer calculates its output from the error',
      'The indication on the faceplate is no longer updated',
    ],
    correctIndex: 2,
    explanation:
      'Measurement, indication and the link out to the final control element all continue. What manual mode removes is the calculation: the operator writes the output directly, so the error is still visible but nothing acts on it. That is why a loop left in manual sits through a disturbance without correcting.',
  },
  {
    id: 6,
    question:
      'A control room screen and the instrument’s own integral display agree exactly. What has that proved?',
    options: [
      'That the measurement is correct',
      'That the sensing element is in good condition',
      'That the transmission and scaling between the instrument and the screen are sound',
      'Nothing at all',
    ],
    correctIndex: 2,
    explanation:
      'Both figures come from the same sensing element and the same conversion inside the transmitter, so they cannot disagree about the sensor. Their agreement clears only the part of the chain between them — the wiring, the input card and the scaling. Testing the sensor needs an independent measurement.',
  },
];

const InstrumentationModule1Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 3"
        title="Measurement, indication and control"
        backTo="/electrician/upskilling/instrumentation-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Section 1.1 gave you the four boxes. This section opens three of them and looks at what
          actually happens inside.
        </p>

        <TLDR
          points={[
            'A reading is not collected from the process — it is manufactured by a chain of conversions, and any link in that chain can be wrong while every other link looks healthy. A number on its own is not a measurement either: value, units and range together are, because 12 mA means nothing until you know what the instrument is ranged for.',
            'Accuracy, precision, resolution and repeatability are four different properties. Accuracy is closeness to truth; precision is the spread of repeats; resolution is the smallest change that can be shown; repeatability is whether the same condition gives the same answer.',
            'A loop tolerates a known accuracy error far better than poor repeatability. A loop that gets a different number for the same condition will hunt, and tuning cannot fix it.',
            'Local indication is not a leftover from before control rooms. It is the reading that has not travelled, and it is still there when the panel, the network or the plant supply is not.',
            'Alarms are a separate role from indication. An indicator waits to be looked at; an alarm comes and finds you. An alarm that is always on has stopped being either.',
            'Feedback is what makes a loop a loop. Open-loop control decides without ever asking what the process did; closed-loop measures the controlled variable and returns it to the controller.',
            'A controller compares exactly two numbers — process variable and setpoint. Manual mode does not stop the measurement or the indication; it stops the calculation being used.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What a measurement actually is</ContentEyebrow>

        <ConceptBlock
          title="A reading is manufactured, not collected"
          plainEnglish="Nobody ever reads a temperature. They read the end of a chain of conversions that started with a temperature, and every link in it had an opinion."
          onSite="When a number looks wrong, do not ask &lsquo;is the instrument faulty?&rsquo; Ask &lsquo;which link in the chain is lying?&rsquo; They fail one at a time, and the display never says which."
        >
          <p>
            Section 1.1 put a box marked <em>measuring device</em> in the ring and moved on. Inside
            that box there is a sequence, and it is worth walking once slowly, because calibration,
            loop checking and fault finding are all really the business of proving one link of it at
            a time:
          </p>
          <ul>
            <li>
              <strong>The process does something physical.</strong> A fluid gets hotter, a level
              rises, a pressure changes.
            </li>
            <li>
              <strong>A sensing element responds to it.</strong> A thermocouple junction develops a
              small voltage; a resistance thermometer changes resistance; a diaphragm deflects. This
              is the only link that touches the process at all.
            </li>
            <li>
              <strong>That response is converted</strong> into something transmittable — usually an
              electrical signal, historically an air pressure.
            </li>
            <li>
              <strong>The signal is conditioned and scaled.</strong> Amplified, filtered,
              linearised, and compensated for the effect of temperature on the electronics
              themselves.
            </li>
            <li>
              <strong>It travels.</strong> Down a pair of conductors, through terminals, junction
              boxes, glands and an input card.
            </li>
            <li>
              <strong>It is scaled again</strong> in software, from a raw count into engineering
              units, and rendered as characters on a screen.
            </li>
          </ul>
          <p>
            The point of setting it out like that is not the detail — Modules 2 and 3 do the detail
            properly. It is that the tidy figure at the end has passed through six or seven hands.
            Any one of them can be wrong while the rest work perfectly and nothing anywhere reports
            a fault. A number is evidence, not testimony.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The sensing element only ever measures itself"
          plainEnglish="A thermocouple does not measure the fluid. It measures its own junction and reports that honestly. Whether its junction is at the same temperature as the fluid is a separate question — and usually the interesting one."
          onSite="Most &lsquo;faulty instrument&rsquo; calls that turn out to be nothing wrong with the instrument are installation problems: an element not bottomed in its pocket, a tapping in dead fluid, a probe in a pipe that stopped flowing an hour ago."
        >
          <p>
            This is the single most useful idea in measurement, and it is almost never stated
            plainly. Every sensing element reports its own condition. A temperature element reports
            the temperature <em>of the element</em>. A pressure transmitter reports the pressure{' '}
            <em>at its process connection</em>. A level device reports whatever its principle
            actually senses — a head of liquid, a distance to a surface, a capacitance — and we
            agree to call that level.
          </p>
          <p>
            So a measurement is only as good as the assumption that the element and the process
            agree. That assumption breaks in ordinary, physical ways:
          </p>
          <ul>
            <li>
              An element sitting in a thermowell with an air gap beneath it reads slowly and low,
              because it is measuring the pocket rather than the fluid.
            </li>
            <li>
              A probe in a dead leg reads the temperature of a fluid that is going nowhere, not of
              the stream you care about.
            </li>
            <li>
              An impulse line that has blocked, frozen or filled with condensate reports the
              pressure at the blockage — perfectly steadily, indefinitely.
            </li>
            <li>
              A level device set up for one liquid density reports a different level when the
              contents change, without anything being faulty.
            </li>
          </ul>
          <p>
            None of those show up as a fault. They show up as a plausible number, which is
            considerably worse. The habit worth building now is to ask, of any reading, what the
            element is physically in contact with — because that, and not the label on the drawing,
            is what is being measured.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Value, units and range — and the band around all three"
          plainEnglish="&lsquo;Twelve milliamps&rsquo; says a signal is at half scale. It does not say half of what. And whatever the number turns out to be, the true value sits in a band around it."
          onSite="Before arguing about whether a reading is right, find the range. Two people looking at the same 50% signal and assuming different ranges will disagree all afternoon and both be correct."
        >
          <p>Three terms make the rest of the course readable, and they are worth precision:</p>
          <ul>
            <li>
              <strong>Lower range value (LRV)</strong> — the process value the instrument represents
              at the bottom of its output. On a 4&ndash;20 mA loop, the value at 4 mA.
            </li>
            <li>
              <strong>Upper range value (URV)</strong> — the process value represented at the top,
              so the value at 20 mA.
            </li>
            <li>
              <strong>Span</strong> — the difference between them. A transmitter ranged 0&ndash;200
              °C and one ranged 100&ndash;300 °C share a span of 200 °C and mean completely
              different things.
            </li>
          </ul>
          <p>
            A signal carries a proportion; the range converts that proportion into a value. Twelve
            milliamps on the first transmitter above is 100 °C, and on the second it is 200 °C. The
            signal is identical and the wire is identical. Only the agreement about what the signal
            means differs — and that agreement lives in two separate places, the transmitter and the
            receiving system, which is precisely why the two can drift apart.
          </p>
          <p>
            This is why <strong>re-ranging a transmitter is never a local change</strong>. Re-range
            a level transmitter from 0&ndash;3 m to 0&ndash;5 m without changing the range
            configured in the control system and nothing appears to break: the loop runs, the
            display updates, and every number it shows is now wrong. Nobody touched the setpoint,
            and yet the setpoint now means a different level.
          </p>
          <p>
            The second half of stating a reading properly is admitting its uncertainty. When a
            screen shows 62.0 °C, the honest statement is not &ldquo;the temperature is 62.0
            °C&rdquo; but &ldquo;the best estimate is 62.0 °C, and the true value lies in a band
            around it&rdquo;. The band does not go away because the display has no room to show it.
            Manufacturers quote it two ways, and the difference matters:
          </p>
          <ul>
            <li>
              <strong>Percent of span</strong> — a fixed number of engineering units everywhere in
              the range. An instrument ranged 0&ndash;100 bar with an error of 1% of span is out by
              up to 1 bar whether it is reading 90 bar or 3 bar.
            </li>
            <li>
              <strong>Percent of reading</strong> — an error that shrinks as the reading shrinks.
              The same 1% on a reading of 3 bar is 0.03 bar.
            </li>
          </ul>
          <p>
            That is why oversizing an instrument quietly costs you. Fit a 0&ndash;100 bar
            transmitter to a system that runs at 3 bar, on a percent-of-span specification, and the
            uncertainty is a third of the value you are trying to measure. Nothing has failed and
            the instrument is performing to specification. It is simply the wrong instrument, and no
            calibration will rescue it. Choose a range that puts the normal operating point sensibly
            within it, and treat any reading near the bottom of a wide range as approximate until
            proven otherwise.
          </p>
        </ConceptBlock>

        <Pullquote>
          A reading is a claim, not a fact. The whole trade is the business of deciding how much of
          a claim to believe.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Four words that get used as one</ContentEyebrow>

        <ConceptBlock
          title="Accuracy, precision and resolution are three different virtues"
          plainEnglish="Accuracy is being close to the truth. Precision is giving the same answer twice. Resolution is the size of the smallest step the instrument can show. None of them implies another."
          onSite="You cannot assess accuracy by looking at an instrument, however confident its display appears. Accuracy is always a statement about a comparison with something more trustworthy."
        >
          <p>
            The dartboard picture is worn out but it works. Tight group in the bullseye: accurate
            and precise. Tight group in the corner: precise, not accurate. Scattered around the
            bullseye: accurate on average, not precise.
          </p>
          <ul>
            <li>
              <strong>Accuracy</strong> is how close a reading is to the true value. It is not a
              property you can observe in isolation — any statement about accuracy requires a
              comparison against a reference you have more reason to trust, which is the entire
              logic of calibration in Module 6.
            </li>
            <li>
              <strong>Precision</strong> is how tightly repeated readings cluster, regardless of
              where that cluster sits. A precise instrument is confident. Confidence is not
              correctness.
            </li>
            <li>
              <strong>Resolution</strong> is the smallest change the instrument can detect or
              display. It is a property of the presentation and the conversion, and it is cheap.
            </li>
          </ul>
          <p>
            Of the first two failure modes, the dangerous one is precision without accuracy. A
            scattered reading announces itself — operators watch it jump and stop trusting it. A
            rock-steady reading that is 4 °C low announces nothing. It gets believed, written on
            records and used to make decisions, sometimes for years.
          </p>
          <p>
            Resolution used to be self-policing. A dial gauge marked in 2 bar divisions could not
            pretend to know a value to 0.01 bar, because the pointer sat between two lines and
            everyone could see it. Digital displays removed that honesty: 3.4172 m looks like
            knowledge to four decimal places and is nothing of the kind. It is worth separating
            where resolution comes from:
          </p>
          <ul>
            <li>
              <strong>Display resolution</strong> — how many digits the screen shows. Cosmetic with
              respect to truth.
            </li>
            <li>
              <strong>Conversion resolution</strong> — how finely the signal is chopped into steps
              when it is digitised. More bits divide the same span into smaller steps.
            </li>
            <li>
              <strong>Sensor resolution</strong> — the smallest change in the process the element
              responds to at all. Below this, the process moves and nothing happens.
            </li>
          </ul>
          <p>
            Resolution does matter for control: if the smallest change a loop can see is larger than
            the deviation you are holding, the controller is blind inside that band. But it is a
            floor on what you can detect, never a statement about whether what you detect is right.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Repeatability is the one a control loop cares about most"
          plainEnglish="Repeatability asks a narrow question: same condition, same instrument, same direction of approach — does it give the same answer? That is a question about consistency, not about truth."
          onSite="A loop can be run on an instrument with a known offset. It cannot be run on one that answers differently each time it is asked. Tuning never fixes a repeatability problem, because there is nothing stable to tune to."
        >
          <p>
            A steel tape that is three millimetres long over its length is inaccurate and completely
            usable: every measurement is out by the same amount, and you can allow for it. A tape
            that stretches by a different amount each time you pull it is useless, and no amount of
            care with the reading rescues it. Instruments behave the same way, which is why
            repeatability sits at the top of the list for anything feeding a loop.
          </p>
          <p>Two related properties travel with it:</p>
          <ul>
            <li>
              <strong>Hysteresis</strong> — a different reading depending on whether the value was
              approached from above or from below. Mechanical linkages, diaphragms and springs all
              produce it. This is why a proper calibration is performed in both directions: a single
              upward sweep cannot see it.
            </li>
            <li>
              <strong>Drift</strong> — the reading moving over time with nothing in the process
              changing, usually with temperature or with age. Drift is why calibration has an
              interval rather than being done once at commissioning.
            </li>
          </ul>
          <p>
            Now put the four together in the way that matters. A controller acts on the difference
            between the measurement and the setpoint. If the measurement carries a steady offset,
            the loop still holds the process steady — at the wrong value, which an operator quietly
            corrects by trimming the setpoint and which a calibration finds properly. If the
            measurement is not repeatable, the controller sees a changing error where the process is
            not changing, and responds by moving the final control element. The loop creates the
            disturbance it then tries to correct.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-3-repeatability"
          question="A flow transmitter feeding a control loop reads 2% low, consistently, at every flow. Which is worse for the loop: that, or a transmitter accurate on average whose reading wanders by ±2% at a steady flow?"
          options={[
            'The consistent 2% offset, because the loop always controls to the wrong value',
            'The wandering reading, because the controller acts on changes that are not happening',
            'They are equally serious — both are 2% errors',
            'Neither affects the loop; both are calibration issues only',
          ]}
          correctIndex={1}
          explanation="A consistent offset is predictable and correctable — the loop holds steady and a calibration will find it. A wandering reading tells the controller the process is moving when it is not, so the controller moves the valve for no reason and injects a real disturbance into a stable process. Repeatability is the property a loop cannot do without."
        />

        <CommonMistake
          title="Reading a display to more digits than the measurement can justify"
          whatHappens="A technician records a temperature as 71.83 °C from a control system display and treats the second decimal place as meaningful. A drift of a few tenths is then reported as a process change, an investigation starts, and a trend is scrutinised for a pattern that was never in the process — it was in the last digit of a conversion."
          doInstead="Separate resolution from accuracy every time. Ask what the instrument is specified to, and whether that specification is percent of span or percent of reading. Record readings to the number of digits the specification supports, and treat anything finer as an artefact of the display."
        />

        <SectionRule />
        <ContentEyebrow>Indication — who is the number for?</ContentEyebrow>

        <ConceptBlock
          title="Local and remote indication answer different questions"
          plainEnglish="Local indication is a reading where the equipment is. Remote indication is the same value carried somewhere else. They are not two ways of doing one job."
          onSite="If the local reading and the control room reading disagree, that is not a nuisance — it is the most useful thing you will learn all day, because it splits the chain in two."
        >
          <p>
            Section 1.1 introduced indicators as devices that display a measurement for a human to
            read. The distinction that matters in practice is <em>where</em> the human is:
          </p>
          <ul>
            <li>
              <strong>Local indication</strong> — readable by someone standing at the plant item. A
              direct-reading pressure gauge, a dial thermometer in a pocket, a sight glass, or the
              small display built into a transmitter head.
            </li>
            <li>
              <strong>Remote indication</strong> — the value carried by a signal to a panel, a
              control room, or a screen anywhere on a network. The reading has travelled, and
              everything it travelled through is now part of the measurement chain.
            </li>
          </ul>
          <p>
            The obvious argument for remote indication is that one operator can watch a hundred
            values without leaving a chair, see them alongside each other, and see them over time.
            That argument is sound and it is why control rooms exist. What it does not do is retire
            the local reading, for four reasons that come up constantly:
          </p>
          <ul>
            <li>
              <strong>It has not travelled.</strong> A direct-reading gauge is unaffected by wiring,
              an input card, scaling or a configuration change. When it disagrees with the screen,
              the fault lies between the two and you have halved the search.
            </li>
            <li>
              <strong>You cannot be in two places.</strong> Commissioning a valve, cracking a line
              open or starting a pump by hand all need a number where your hands are. Reading it
              back over a radio is slower and adds somebody who can mishear a digit.
            </li>
            <li>
              <strong>It survives what the network does not.</strong> Loss of the control system,
              loss of the panel supply, a comms failure or a plant shutdown can all take the screens
              away. A mechanical gauge is still telling the truth in the dark.
            </li>
            <li>
              <strong>Safety before you open something.</strong> Anyone about to break into a vessel
              or a line wants a reading at the vessel, not a reassurance from a screen in another
              building fed by a signal they have not verified.
            </li>
          </ul>
          <p>
            The reverse warning matters too. A local gauge left isolated, or with its root valve
            shut, is a confident, permanently wrong reading — and the one people trust most, because
            it looks direct.
          </p>
          <p>
            There is a trap inside all this that catches experienced people. An instrument&rsquo;s
            own integral display and the control room screen usually share a sensing element: the
            smart transmitter computes a value, shows it on its own screen, and sends that same
            value down the wires. So when the two agree, what has actually been proved is that the
            wiring is intact, the input card is reading the signal, and the scaling in the control
            system matches the transmitter&rsquo;s range. What has <em>not</em> been proved is
            anything about the sensor: whether the element is in contact with the process, whether
            the impulse line is clear, whether the calibration still holds, or whether the range
            suits the duty. Two displays are not two measurements. An independent check needs a path
            that shares nothing with the first — a separate tapping, a calibrated test instrument,
            or another instrument that ought to move with it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-3-local-remote"
          question="A pressure reading on the control room screen is doubted. The transmitter&rsquo;s integral display shows the same value. A separate mechanical gauge on its own tapping reads 1.4 bar lower. Where is the fault most likely to be?"
          options={[
            'In the wiring between the transmitter and the input card',
            'In the scaling configured in the control system',
            'In the transmitter measurement itself — its sensor, process connection or calibration',
            'In the mechanical gauge, since two devices agree and only one does not',
          ]}
          correctIndex={2}
          explanation="The screen and the integral display share the transmitter’s sensing element and conversion, so their agreement proves only the wiring and the scaling. The mechanical gauge is the one independent measurement in the set. Two readings from a single source do not outvote one reading from another source — though the gauge itself still has to be proved before it is trusted absolutely."
        />

        <SectionRule />
        <ContentEyebrow>Alarms are their own role</ContentEyebrow>

        <ConceptBlock
          title="An indicator waits to be looked at; an alarm comes and finds you"
          plainEnglish="Indication is passive and continuous. Alarming is active and exceptional. That difference in direction is the whole point of it."
          onSite="Count the standing alarms on a panel. Anything permanently lit has stopped being an alarm and become wallpaper — and it will be sat next to the one that matters."
        >
          <p>
            Indication puts a value in front of anyone who chooses to look. Alarming asserts that a
            condition needs human attention now, and makes itself noticed whether or not anyone was
            watching. Those are different jobs, and treating alarms as &ldquo;indication with a
            horn&rdquo; is how alarm systems become useless.
          </p>
          <p>
            <strong>Annunciation</strong> is the mechanism that carries out the second job. Its
            classic form is a fascia of labelled windows above a panel, and the behaviour is worth
            knowing because software alarm systems still imitate it:
          </p>
          <ul>
            <li>
              A window <strong>flashes and an audible sounds</strong> when the condition first
              occurs, so a new alarm is distinguishable from an old one.
            </li>
            <li>
              <strong>Acknowledging</strong> silences the audible and takes the window to steady.
              The operator has said &ldquo;I know&rdquo;, not &ldquo;it is fixed&rdquo;.
            </li>
            <li>
              The window <strong>stays lit while the condition persists</strong>, and clears only
              when the process has returned and the alarm is reset.
            </li>
          </ul>
          <p>
            That sequence exists to answer two questions an indicator cannot: <em>is this new?</em>{' '}
            and <em>has anyone seen it?</em> A screen full of numbers answers neither.
          </p>
          <p>Alarms are generated in two places, and the difference is a design decision:</p>
          <ul>
            <li>
              <strong>From a dedicated switch</strong>, wired to its own input — an independent path
              with its own sensing element, which still operates if the transmitter or the
              controller has failed.
            </li>
            <li>
              <strong>In software</strong>, from a threshold applied to a transmitter&rsquo;s
              signal. It costs nothing to add, which is exactly the problem: alarms that cost
              nothing multiply until an operator facing a real event is reading a list.
            </li>
          </ul>
          <p>
            One more thing follows from alarms being a distinct role. BS 7671 treats instrumentation
            and signalling circuits as auxiliary circuits in Section 557, and Regulation 557.3.1
            asks the designer to assess the required function and choose deliberately whether the
            supply is dependent on the main circuit or independent of it. For an annunciator that is
            not paperwork, it is the question itself: should the alarm panel go dark with the plant
            it is warning you about, or keep telling you what happened? Both answers can be right.
            What the regulation asks is that somebody chose.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Control — what makes a loop a loop</ContentEyebrow>

        <ConceptBlock
          title="Open-loop control decides without ever asking what happened"
          plainEnglish="Open-loop means the output is worked out without reference to the thing being controlled. It can be perfectly good engineering — it simply cannot correct for anything it did not anticipate."
          onSite="To test whether something is open-loop, disturb the controlled variable and watch. If nothing responds, nothing was measuring it."
        >
          <p>
            In open-loop control the controller sets its output from a rule, a schedule, a
            calculation or an operator&rsquo;s hand, and never checks the result. Common forms:
          </p>
          <ul>
            <li>
              <strong>Timed and sequential control</strong> — run the pump for four minutes, then
              open the valve, then start the agitator. Batch sequences and start-up routines are
              full of it.
            </li>
            <li>
              <strong>Fixed output</strong> — a valve set to a position that gave the right answer
              once and has been left there.
            </li>
            <li>
              <strong>Compensation from a different measurement</strong> — an output calculated from
              something related to the controlled variable rather than from the controlled variable
              itself.
            </li>
          </ul>
          <p>
            The third form is where learners get caught, because it involves a measurement and
            therefore looks closed. Weather-compensated heating is the everyday example: the control
            measures outside air temperature and uses it to set the flow temperature into the
            radiators. There is a sensor, a controller and a final control element, and every box
            from Section 1.1 is populated. But nothing measures the temperature of the rooms. Open a
            window, fill the room with people, or leave the sun on one elevation all afternoon, and
            the system carries on doing what the outside temperature told it to do.
          </p>
          <p>
            A domestic toaster is the same idea with less dignity: it runs a timer, knows nothing
            about the colour of the bread, and works perfectly while giving you pale toast from
            frozen bread and black toast from thin bread. None of this makes open-loop wrong. It is
            the right choice when there is no practical measurement of the controlled variable, when
            the relationship really is predictable, or when a sequence rather than a value is what
            you want. What it cannot deal with is <strong>loads</strong>.
          </p>
          <p>
            A load is anything that pushes the process variable around which the loop cannot
            influence. Take a heat exchanger warming a process fluid with steam: the outlet
            temperature is what you want to hold and the steam flow is what you can adjust, so
            everything else affecting that outlet temperature — the flow rate of the incoming fluid,
            its inlet temperature, the steam pressure available, fouling of the tubes — is a load.
            These are sometimes called <strong>wild variables</strong>, because the loop has no
            ability to influence them at all and can only respond to what they do. That is the
            honest justification for closed-loop control: if the steam pressure never varied, the
            incoming flow never changed and the tubes never fouled, you could set the valve by hand
            once and walk away. Control systems exist because loads exist.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Feedback is what closes the loop"
          plainEnglish="Closed-loop means the controlled variable is measured and the measurement goes back to the controller. The signal path returns to where it started — which is why it is drawn as a ring."
          onSite="Trace the path on the drawing with a finger. Process, measuring device, controller, final control element, back into the process. If the finger returns to where it started, the loop is closed. If it stops, it is not."
        >
          <p>
            The elements are the ones Section 1.1 named — the process, the process variable, the
            transmitter, the controller, the final control element and the manipulated variable.
            What makes them a <em>loop</em> rather than a chain is that the last one affects the
            first, and the first is measured again.
          </p>
          <p>
            The specific kind of feedback used for control is <strong>negative feedback</strong>,
            sometimes called degenerative. &ldquo;Negative&rdquo; describes the direction of the
            response, not a fault: whatever the process variable does relative to the setpoint, the
            loop acts in the opposite direction. Process variable rises above setpoint, the loop
            acts to bring it down; process variable sags below, the loop acts to drive it up. The
            action always opposes the deviation, and that is what makes the arrangement stable.
          </p>
          <p>Follow it once through the heat exchanger:</p>
          <ul>
            <li>The flow of unheated fluid increases — a load change nobody asked for.</li>
            <li>
              The outlet temperature falls, because the same steam is now heating more fluid.
              Physics, not a fault.
            </li>
            <li>The transmitter senses the fall and reports it.</li>
            <li>
              The controller sees the process variable below setpoint and calls for more steam.
            </li>
            <li>The valve opens, more heat goes in, and the outlet temperature comes back up.</li>
            <li>The transmitter senses that too, and the cycle continues.</li>
          </ul>
          <p>
            Nobody intervened, and nobody had to know in advance that the flow would change. That is
            the benefit of feedback: it corrects for disturbances that were never anticipated,
            including ones nobody has thought of yet. Its cost is that it can only act{' '}
            <em>after</em> the process variable has already moved. Feedback is inherently a reaction
            to an error that has already happened.
          </p>
          <p>
            And if the feedback is connected the wrong way round, the same mechanism works against
            you. A loop acting in the wrong direction does not merely fail to control — it
            reinforces every deviation and drives the output hard against a limit.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-3-open-closed"
          question="A conveyor oven runs its burners at a fixed firing rate set during commissioning, with a temperature indicator on the front panel for the operator. Is this closed-loop temperature control?"
          options={[
            'Yes — there is a temperature measurement and a heat source',
            'Yes — the operator can see the temperature and intervene',
            'No — the measurement is indicated but never returned to anything that acts on it',
            'No — closed-loop requires a PID controller specifically',
          ]}
          correctIndex={2}
          explanation="Measuring and displaying a value does not close a loop. Nothing takes that reading and acts on it automatically, so the firing rate is unaffected by whatever the temperature does. Add a human who watches the indicator and adjusts the burners and it becomes a loop again — with the operator as the controller — but that is manual control, not automatic control."
        />

        <SectionRule />
        <ContentEyebrow>What the controller is actually doing</ContentEyebrow>

        <ConceptBlock
          title="It compares two numbers, and everything else follows"
          plainEnglish="Process variable and setpoint. The difference between them is the error, and that is the entire input to the decision."
          onSite="When a loop misbehaves, look at those two numbers before anything else. A loop controlling perfectly to a setpoint somebody changed last week is not a fault, and no amount of instrument work will find it."
        >
          <p>
            Strip away the technology and a feedback controller does one thing: it takes the
            measured process variable, takes the setpoint, and works out the difference. That
            difference is the <strong>error</strong>. Everything distinguishing one controller from
            another is a decision about how to turn that error into an output.
          </p>
          <p>Two consequences follow immediately, and both cause real trouble in the field:</p>
          <ul>
            <li>
              <strong>Both numbers must be on the same scale.</strong> Most controllers work
              internally in percent of span, so a setpoint of 50% has no meaning in engineering
              units until the range is known. Change the transmitter range without changing the
              controller&rsquo;s and the setpoint now points at a different physical value while the
              number on the screen has not moved.
            </li>
            <li>
              <strong>The controller cannot see the process.</strong> It sees a number claiming to
              represent the process. If the measurement is wrong, the controller drives the process
              confidently to the wrong place and holds it there — while the display shows it sitting
              exactly on setpoint the whole time.
            </li>
          </ul>
          <p>
            That second point is worth sitting with. A loop reading dead on setpoint is not evidence
            of a healthy process. It is evidence of a healthy relationship between two numbers, one
            of which may be a fiction.
          </p>
          <p>
            The controller also has to know which way to move. <strong>Reverse acting</strong>{' '}
            calculates the error as setpoint minus process variable, so the output rises as the
            process variable falls — the heating case. <strong>Direct acting</strong> raises the
            output as the process variable rises, covering cooling and any loop where more output
            means less of the controlled quantity.
          </p>
          <p>
            The trap is that the correct setting depends on the whole ring, not on whether you are
            heating or cooling. The final control element has its own direction: a valve that opens
            on increasing signal and one that closes on increasing signal — chosen for what each
            should do on loss of air, which is a safety decision — need opposite controller actions
            to achieve the same process result. Two changes of sign cancel; one does not. Get it
            wrong and the symptom is unmistakable: the loop does not drift or oscillate gently, it
            runs the output straight to fully open or fully shut and stays there, because every
            correction enlarges the error that prompted it. How much the output moves for a given
            error is proportional, integral and derivative action, which the control modules later
            in the course take properly.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Manual and automatic — what actually switches"
          plainEnglish="In automatic, the controller computes its output from the error. In manual, the operator writes the output directly. The measurement and the indication carry on either way."
          onSite="A loop in manual is a message from whoever left it there. Find out what it was — an untuned loop, a measurement nobody trusts, or a process problem being nursed by hand."
        >
          <p>
            Section 1.1 introduced the two modes. Here is what changes and what does not, because
            learners routinely assume manual mode disconnects more than it does:
          </p>
          <ul>
            <li>
              <strong>Still happening in manual:</strong> the process variable is measured, the
              signal arrives, the faceplate shows the process variable and the setpoint, the error
              is visible, and the output signal still drives the final control element.
            </li>
            <li>
              <strong>Not happening in manual:</strong> the calculation. The controller stops
              generating its output from the error and takes whatever value the operator sets.
            </li>
          </ul>
          <p>
            So a loop in manual sits through a load change without correcting. The screen shows the
            process variable drifting away from the setpoint, the error growing, and nothing
            happening — confusing if you expect manual to mean &ldquo;disconnected&rdquo; rather
            than &ldquo;deciding by hand&rdquo;.
          </p>
          <p>Two distinctions to keep straight while you are here:</p>
          <ul>
            <li>
              <strong>Manual mode is not a handwheel on the valve.</strong> Manual mode still sends
              a signal that the valve follows. A mechanical override on the valve body moves the
              element in a way the controller cannot see and cannot compensate for.
            </li>
            <li>
              <strong>Manual is not the same as local.</strong> Local versus remote is about where
              the command comes from. Manual versus automatic is about whether the command was
              calculated.
            </li>
          </ul>
          <p>
            One practical detail explains a piece of controller behaviour that otherwise looks odd.
            A controller sitting in manual normally keeps its internal calculation tracking the
            output the operator has set, so that at the moment of switching to automatic the
            calculated output matches the one already in force. Without that, the valve would jump
            the instant the mode changed. That smooth handover is why a controller appears to follow
            the operator while in manual rather than sitting idle.
          </p>
        </ConceptBlock>

        <Scenario
          title="A heat exchanger, a cold morning and a loop in manual"
          situation="A shell-and-tube heat exchanger warms a process fluid using steam. A temperature transmitter (TT) on the outlet reports to a temperature controller (TC) in the control room, which drives a steam control valve (TV) on the inlet. The setpoint is 85 °C. Overnight the upstream unit increased its throughput, so more cold fluid is now passing through the exchanger. The morning shift finds the outlet sitting at 76 °C and the control room screen showing a large error that nothing is correcting."
          whatToDo="Split the problem along the three roles before touching anything. Measurement first: does an independent reading agree that the outlet is at 76 °C? A local dial thermometer or a calibrated test instrument answers that — the transmitter's own integral display does not, because it shares the same sensor. Indication next: the error is displayed and large, so the value is reaching the control system and the comparison is being made. Control last: check the controller mode. A large steady error with a stationary output is the signature of a loop in manual, or of an output sitting hard against a limit."
          whyItMatters="The loop is in manual, left there during a valve repair the previous week. In automatic, the increased cold flow is simply a load change: the outlet temperature falls, the controller sees the process variable below setpoint, and it calls for more steam until the temperature comes back. In manual, the calculation is not used, so the same disturbance produces a permanent deviation and the plant runs cold until somebody notices. Nothing failed and no instrument was faulty. The measurement was right, the indication was right, and the control was switched off — which is exactly why the three roles are worth being able to separate."
        />

        <SectionRule />
        <ContentEyebrow>The three roles fail independently</ContentEyebrow>

        <ConceptBlock
          title="Any one of the three can be wrong while the other two are perfect"
          plainEnglish="Measurement, indication and control are three separate jobs. Faults do not respect the boundary, but diagnosis has to."
          onSite="Before reaching for a tool, decide which of the three you are accusing. It turns a vague complaint into a testable one."
        >
          <p>
            This is the payoff for the whole section. &ldquo;The loop is not working&rdquo; is a
            symptom that could sit in any of three places:
          </p>
          <ul>
            <li>
              <strong>Measurement wrong, everything else fine.</strong> The value is a fiction, so
              the indication faithfully displays a fiction and the controller confidently controls
              to it. Symptom: the screen looks healthy and the process does not. Blocked impulse
              line, element out of its pocket, wrong range, drifted calibration.
            </li>
            <li>
              <strong>Indication wrong, measurement fine.</strong> The process is correct and the
              display is not. Symptom: operators chase a problem that does not exist, or miss one
              that does. Scaling mismatch after a re-range, a failed display, a stale value on a
              screen whose comms have dropped without saying so.
            </li>
            <li>
              <strong>Control wrong, measurement and indication fine.</strong> The number is right,
              it is shown correctly, and nothing sensible is done with it. Symptom: an accurate,
              well-displayed process variable nowhere near setpoint. In manual, action set the wrong
              way, output at a limit, setpoint changed and forgotten, or a final control element not
              following the signal.
            </li>
          </ul>
          <p>A workable order for splitting it:</p>
          <ul>
            <li>
              <strong>Get an independent measurement.</strong> Not a second display of the same
              signal — a genuinely separate path. This settles whether the number is real.
            </li>
            <li>
              <strong>Compare readings along the chain.</strong> Field indication against control
              room indication. Agreement clears the transmission and scaling; disagreement locates
              the fault between the two points.
            </li>
            <li>
              <strong>Check the mode and the setpoint.</strong> Automatic or manual, and what the
              setpoint actually is. Both are free to check and both are common answers.
            </li>
            <li>
              <strong>Check the output is having an effect.</strong> A controller output is a
              command, not a confirmation. A valve that is stuck, has lost its air or is on its
              handwheel will receive the signal and ignore it.
            </li>
          </ul>
          <p>
            Notice how much of that is done before opening anything. Module 8 builds it into a full
            fault-finding method, but the habit starts here: name the role, then test it.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Treating agreement between two displays as proof the reading is good"
          whatHappens="A questioned reading is checked by comparing the control room value against the transmitter's integral display. They match, so the measurement is declared sound and the investigation moves on to the controller and the valve. Hours later the fault turns out to be a blocked impulse line, which both displays had been reporting identically and confidently all along."
          doInstead="Ask where each number originates before comparing them. Two figures derived from one sensing element are one measurement shown twice, and their agreement clears only what lies between them. Prove a measurement with a path that shares nothing with it — a separate tapping, a test instrument, or a related process value that ought to be moving with it and is not."
        />

        <FAQ
          items={[
            {
              question: 'If accuracy is what everyone wants, why is repeatability more important?',
              answer:
                'Because a repeatable instrument with a known error can still run a process. The offset is consistent, so the loop stays stable, an operator can trim the setpoint to allow for it, and a calibration will find and remove it. An instrument that gives different answers for the same condition gives the controller a moving target, so the controller moves the final control element in response to changes that are not in the process. Accuracy is what you correct; repeatability is what you depend on.',
            },
            {
              question:
                'Is an operator watching a display and adjusting a valve by hand a closed loop?',
              answer:
                'Yes, but a manual one. The signal path still returns to where it started — process, measurement, indication, human decision, valve, process — so feedback exists and the person is acting as the controller. What it is not is automatic control. It depends on somebody looking, and it stops the moment attention moves elsewhere.',
            },
            {
              question: 'Why do plants still fit mechanical gauges when everything is on a screen?',
              answer:
                'Because the gauge is the reading that has not travelled. It does not depend on wiring, an input card, scaling, a network or the control system being alive, so it is both a safety reading for anyone working at the plant item and the independent reference that splits a measurement chain in two when the screen is doubted. It has its own failure modes — an isolated gauge is a confident, permanently wrong reading — but it fails for different reasons than the electronics, and that independence is the point.',
            },
            {
              question: 'Can one instrument do all three roles — measure, indicate and control?',
              answer:
                'Yes, and plenty do. A panel-mounted temperature controller senses, displays the value alongside the setpoint, and drives an output. The roles are still worth separating in your head even when they share a housing, because they still fail independently: the sensor can drift while the display works perfectly and the control logic does exactly what it was told.',
            },
            {
              question: 'What is the difference between an alarm and a trip?',
              answer:
                'An alarm asks a person to act. A trip acts without waiting for one, taking the plant or the equipment to a safe state. An alarm belongs to the indication and annunciation role; a trip is a control action with a protective purpose. A given threshold often has both, set at different values, so that somebody gets a chance to intervene before the trip point is reached.',
            },
            {
              question: 'Does a wider measurement range give a better instrument?',
              answer:
                'Usually the opposite, for a given duty. Where an instrument is specified as a percentage of span, the error is a fixed number of engineering units across the whole range, so a wide range applied to a low operating value makes the uncertainty a large fraction of the reading. Choose the range around what the process actually does, and be sceptical of readings sitting near the bottom of a very wide one.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A reading is manufactured by a chain — sensing element, conversion, conditioning, transmission, scaling, display. Any one link can be wrong while the rest look healthy.',
            'The sensing element only ever measures itself. Whether it agrees with the process is an installation question, and usually the interesting one.',
            'Value, units and range together make a measurement. Re-ranging a transmitter without re-ranging the receiving system changes what every number means and breaks nothing visible.',
            'Accuracy is closeness to truth and can only be established against a better reference. Precision is the spread of repeats. Resolution is the smallest change that can be shown. Repeatability is whether the same condition gives the same answer.',
            'Loops tolerate a consistent offset and cannot tolerate poor repeatability — an unrepeatable measurement makes the controller create the disturbance it then corrects.',
            'Local indication has not travelled: it is independent of wiring, cards, scaling and the network, which is what makes it useful for splitting a chain and for safety at the plant item.',
            'An instrument’s integral display and the control room screen share a sensor. Their agreement proves transmission and scaling, and nothing about the measurement.',
            'Alarms and annunciation are a distinct role, answering is this new and has anyone seen it. Standing alarms are not alarms.',
            'Open-loop control never asks what the process did. Feedback — measuring the controlled variable and returning it — is what makes a loop, and negative feedback means the action always opposes the deviation.',
            'A controller compares the process variable with the setpoint and acts on the error. Manual mode stops the calculation, not the measurement, the indication or the output.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 1.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Where and why instrumentation is used
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Standards and traceability
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule1Section3;
