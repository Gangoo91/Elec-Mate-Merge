/**
 * BMS Module 2 · Section 3 — Actuators, valves and dampers
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the final control devices a
 * BMS output ends up driving: what an actuator does, two-port and three-port valve circuits,
 * pressure independent control valves, the valve words that turn up on schedules (Kvs, PN,
 * differential pressure, close-off, authority, rangeability), dampers, the four ways an actuator
 * is signalled (two-position, 3-point, 0–10 V, network), spring return and fail position, and the
 * commissioning checks an electrician can carry out. The old page taught Cv in US gallons and
 * psi, invented stroke times, power ratings and a "15% energy reduction" case study; all of that
 * has gone. Valve authority is taught as a concept with the one range the source gives.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
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
  RegsCallout,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Actuators, valves and dampers | BMS Module 2.3 | Elec-Mate';
const DESCRIPTION =
  'How BMS outputs move valves and dampers: two-port and three-port circuits, PICVs, valve authority, 0–10 V and 3-point actuators, spring return and commissioning checks.';

const outcomes = [
  'Explain what an actuator does and why it has to be matched to its valve or damper, its supply and its control signal',
  'Tell a two-port throttling circuit from a three-port mixing or diverting circuit, and say what each does to the flow',
  'Describe what a pressure independent control valve adds over a plain two-port valve, and where it is used',
  'Recognise Kvs, PN rating, differential pressure, close-off, let-by, valve authority and rangeability on a valve schedule',
  'Identify two-position, 3-point, 0–10 V and networked actuators and wire each to the right kind of BMS point',
  'Check an actuator at commissioning: direction, full travel, linkage, fail position on loss of power and feedback',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A heating coil is fed through a valve with one inlet and one outlet. As the valve closes, what happens to the water flow in that branch?',
    options: [
      'The flow through the branch falls as the valve throttles it',
      'The flow stays constant because the water is sent round a bypass',
      'The flow reverses direction through the coil',
      'Nothing changes in the branch until the BMS alters the pump speed',
    ],
    correctIndex: 0,
    explanation:
      'A two-port valve is a throttling valve: closing it reduces the flow through the load, so the system flow varies with demand. Keeping the circuit flow constant by sending water round the load is what a three-port diverting arrangement does, not a two-port one.',
  },
  {
    id: 2,
    question: 'What does a three-port mixing valve do?',
    options: [
      'Splits one incoming flow between two outlets',
      'Blends two incoming flows into one outlet',
      'Isolates a zone completely whenever there is no heat demand',
      'Holds the pressure difference across the coil constant',
    ],
    correctIndex: 1,
    explanation:
      'A mixing valve has two inlets and one blended outlet. The diverting valve is the other way round: one inlet split to two outlets. Isolating a zone is a zone valve job, and holding a differential pressure steady is what a PICV regulator does.',
  },
  {
    id: 3,
    question:
      'Why are pressure independent control valves (PICVs) popular on systems with variable speed pumps?',
    options: [
      'They remove the need for any actuator on the valve',
      'They allow the pump to run at one fixed speed all of the time',
      'They hold a steady flow at a given opening as pressure changes',
      'They are the only valve type that can take a 0–10 V signal from the BMS',
    ],
    correctIndex: 2,
    explanation:
      'A PICV combines a control valve with a differential pressure regulator, so a given opening gives the same flow even as the pump speeds up and down and other valves open and close. It still needs an actuator to modulate, and plenty of other valves take 0–10 V.',
  },
  {
    id: 4,
    question:
      'The valve schedule gives a design valve authority of 0.5. What is that number describing?',
    options: [
      'The fraction of its full stroke the actuator is allowed to travel',
      'The control signal voltage at which the valve is half open',
      'The ratio of the largest to the smallest flow the valve can control well',
      'The share of the circuit pressure drop taken across the valve',
    ],
    correctIndex: 3,
    explanation:
      'Authority compares the pressure drop across the valve with the total drop across the whole variable flow section it controls. The ratio of maximum to minimum controllable flow is rangeability, a different property. Authority has nothing to do with signal voltage or stroke limits.',
  },
  {
    id: 5,
    question:
      'A valve schedule gives a close-off pressure for each valve and actuator pair. What does that figure tell you?',
    options: [
      'The highest static pressure the valve body can take',
      'The differential the actuator can shut the valve against',
      'The pressure at which the valve starts to let water by',
      'The pressure drop across the valve when fully open',
    ],
    correctIndex: 1,
    explanation:
      'Close-off is the differential pressure the actuator can shut the valve against. Above it, the valve may not close and water lets by. The body’s static pressure rating is PN, let-by is the symptom rather than a rating, and the fully open pressure drop belongs to Kvs and authority.',
  },
  {
    id: 6,
    question:
      'A spring-return actuator on a frost-protected heating coil valve loses its supply. What should happen?',
    options: [
      'It stays where it was, as spring return only acts on a signal fault',
      'It drives to mid position so that the coil still gets some heat',
      'It locks in place and raises an alarm at the BMS without moving',
      'The spring drives it to its design fail position, open to the coil',
    ],
    correctIndex: 3,
    explanation:
      'The point of spring return is that loss of power drives the device to a known position chosen at design. On a heating coil exposed to cold outside air that is normally the position that protects the coil. Staying put on power loss is what a non-spring-return actuator does.',
  },
  {
    id: 7,
    question:
      'At commissioning, the BMS commands a valve to 100% open and the actuator moves fully closed. What is the most likely cause?',
    options: [
      'The actuator direction is set or wired the wrong way',
      'The valve authority is too low for the circuit it serves',
      'The PN rating of the valve is too low for the system pressure',
      'The rangeability of the valve is less than the design figure',
    ],
    correctIndex: 0,
    explanation:
      'Full movement in the opposite direction to the command is a direction fault: a direct/reverse setting, swapped open and close wires on a 3-point actuator, or a linkage fitted the other way. Authority and rangeability affect how well a valve controls, not which way it goes. PN rating is about pressure, not direction.',
  },
  {
    id: 8,
    question:
      'You are swapping an actuator onto an existing valve body from a different manufacturer. What should you check first?',
    options: [
      'That the new actuator has a higher supply voltage than the old one had',
      'That the valve body has a higher PN rating than the actuator has',
      'That a linkage kit fits and the actuator suits the signal and supply',
      'Nothing, as actuator and valve fittings are standard across all makers',
    ],
    correctIndex: 2,
    explanation:
      'Valve and actuator combinations from different makers often need a linkage kit or adaptor, and the actuator has to match the existing control signal and supply. PN is a valve body pressure rating; it is not compared with the actuator. A higher supply voltage is a fault, not a feature.',
  },
  {
    id: 9,
    question:
      'A smoke control damper is fitted in a ductwork system the BMS also controls. Who drives it during a fire?',
    options: [
      'The BMS, because it already controls the other ductwork dampers',
      'The fire alarm system and its own interfaces; the BMS monitors',
      'Whichever of the two systems happens to send its command last',
      'The building manager, using the override screen at the BMS head end',
    ],
    correctIndex: 1,
    explanation:
      'Fire and smoke control actions are driven by the fire system and its own interfaces, and a fire signal takes priority over every manual and automatic command. The BMS may monitor the damper status, but it is not the life safety path.',
  },
  {
    id: 10,
    question:
      'A modulating actuator has a position feedback signal wired back to the BMS. What is the most useful thing that feedback tells you?',
    options: [
      'The water temperature leaving the coil the valve serves',
      'The flow rate through the valve body, in litres per second',
      'The supply voltage that is reaching the actuator terminals',
      'Whether the device reached the position it was sent to',
    ],
    correctIndex: 3,
    explanation:
      'Position feedback reports where the actuator went, so a stuck valve, slipped linkage or failed motor shows up as a difference between command and feedback. It does not measure temperature or flow; those need their own sensors.',
  },
];

const BMSModule2Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 3"
        title="Actuators, valves and dampers"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The output end of every control loop: the devices that turn a BMS signal into water or air
          actually moving, and how to wire and prove them.
        </p>

        <TLDR
          points={[
            'An actuator turns a BMS output into movement. It has to match three things: the valve or damper it drives, the supply on site, and the control signal from the outstation.',
            'Two-port valves throttle flow, so system flow varies. Three-port valves mix two flows or divert one, so the circuit flow stays broadly constant.',
            'A PICV is a control valve and a differential pressure regulator in one body, so its flow at a given opening does not wander as system pressure changes.',
            'Actuators are driven four ways: two-position (open/shut), 3-point (drive open, drive closed, stop), 0–10 V modulating, or over a network.',
            'Spring return decides where a valve or damper ends up when power is lost. Prove it at commissioning, along with direction, full travel and feedback.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What an actuator is</ContentEyebrow>

        <ConceptBlock
          title="The actuator is the engine; the valve or damper is what it moves"
          plainEnglish="The outstation decides how far a valve should be open. The actuator is the motor that physically gets it there."
          onSite="Every actuator has a label telling you its supply, its signal and its travel. Read it before you connect anything; the mistake most often made with actuators is assuming one is the same as the last."
        >
          <p>
            In a BMS, an <strong>actuator</strong> is the electromechanical device that positions a
            control device, usually a valve or a damper, in response to a signal. Sensors, the
            subject of the last section, tell the outstation what is happening. The actuator is how
            the outstation does something about it. Everything else in a heating or ventilation loop
            exists to work out where the actuator should go.
          </p>
          <p>
            A control valve assembly is two parts. The <strong>valve body</strong> is the cast
            housing and internals the water or steam flows through, shaped to give the flow pattern
            the designer wants. The <strong>actuator</strong> sits on top, takes the control signal
            and moves the valve internals to the position the controller has calculated. A damper is
            the same idea for air: a set of blades in a duct, with an actuator on the spindle.
          </p>
          <p>An actuator has to suit three things at once:</p>
          <ul>
            <li>
              <strong>The device it drives:</strong> the right stroke (linear for a globe valve,
              rotary for a ball, butterfly or damper), and enough force to move it and hold it shut
              against the pressure in the system.
            </li>
            <li>
              <strong>The supply:</strong> commonly 24 V AC from a control transformer in the panel,
              or 230 V AC.
            </li>
            <li>
              <strong>The control signal:</strong> two-position, 3-point, 0–10 V DC, or a network
              connection.
            </li>
          </ul>
          <p>
            Valve bodies and actuators are often bought as matched pairs. Where they come from
            different makers, a linkage kit or adaptor is usually needed to couple them, and that is
            worth knowing before you agree to swap an actuator on a Friday afternoon.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-3-match"
          question="A replacement actuator is needed for a globe valve on a heating circuit. Which kind of movement must the actuator provide?"
          options={[
            'Rotary, a quarter turn on the spindle',
            'Linear, pushing and pulling the stem',
            'Rotary, several full turns of the spindle',
            'Either, as long as the supply voltage matches',
          ]}
          correctIndex={1}
          explanation="A globe valve is a plug and seat moved by a stem, so it needs a linear stroke. Quarter-turn rotary actuators suit ball valves, butterfly valves and dampers. A matching supply voltage is necessary, but it does not make a rotary actuator fit a linear valve."
        />

        <SectionRule />
        <ContentEyebrow>Valve circuits</ContentEyebrow>

        <ConceptBlock
          title="Two-port throttles; three-port mixes or diverts"
          plainEnglish="A two-port valve is a tap on the pipe: shut it and less water flows. A three-port valve is a junction: it decides how the water is shared between the coil and the way round it."
          onSite="Count the pipe connections on the valve body. Two means a throttling circuit and a system whose flow varies with load. Three means mixing or diverting; check the port markings against the schematic before the actuator goes on."
        >
          <p>
            Control valves are grouped by the circuit they sit in. There are three arrangements you
            will meet over and over:
          </p>
          <ul>
            <li>
              <strong>Throttling:</strong> a two-port valve with one way in and one way out. Closing
              it reduces the flow to the load, and so its heat output. The flow round the whole
              system changes as valves across the building open and close.
            </li>
            <li>
              <strong>Mixing:</strong> a three-port valve with two inlets and one blended outlet. It
              controls the load by setting the proportion of each incoming flow, for example hot
              flow and cooler return water, that reaches it.
            </li>
            <li>
              <strong>Diverting:</strong> a three-port valve with one inlet and two outlets. It
              controls the load by sending part of the incoming flow round it instead of through it.
            </li>
          </ul>
          <p>
            The practical difference for a BMS job is what happens to the rest of the system. With
            three-port valves, water keeps circulating whether the load wants it or not, so the pump
            sees a broadly steady flow. With two-port valves, the system flow falls as demand falls,
            which is why two-port systems are normally paired with variable speed pumps that slow
            down as valves close. That pairing is one of the main ways a modern system saves pumping
            energy, and it is the reason the next idea, pressure independence, matters.
          </p>
          <p>
            You will also meet a few special cases. A <strong>zone valve</strong> is typically a
            two-port valve used for on/off control or isolation of a zone. A{' '}
            <strong>six-way valve</strong> lets one coil in a fan coil unit or radiant panel do both
            heating and cooling, switching it between the hot and chilled circuits with one valve
            and actuator.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The valve bodies behind the names"
          plainEnglish="Different jobs use different shapes of valve. You do not have to choose them, but you do need to recognise them when you see one."
        >
          <ul>
            <li>
              <strong>Globe valves</strong> (plug and seat): the workhorse of HVAC control, used
              from boiler and chiller plant down to fan coil units. Precise regulation and happy at
              higher pressures. Linear stroke: the actuator pushes and pulls a stem.
            </li>
            <li>
              <strong>Control ball valves:</strong> a drilled sphere that rotates. Tight shut-off,
              durable, common on terminal units, chilled ceilings and zone control. Rotary stroke.
            </li>
            <li>
              <strong>Butterfly valves:</strong> a disc on a spindle across the pipe. Light and
              cheap for large pipework, used mainly for shutting off flow on plant, such as bringing
              an extra boiler online or switching over storage tank charging.
            </li>
            <li>
              <strong>Magnetic valves:</strong> an electronically controlled magnet positions the
              stem and plug. Fast and accurate, especially at low flows, and used on chilled water,
              low temperature hot water and refrigerant circuits.
            </li>
            <li>
              <strong>Smart valves:</strong> pressure independent control combined with built-in
              sensors and an electronic actuator, connected to the BMS for monitoring and
              adjustment.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Words on the valve schedule</ContentEyebrow>

        <ConceptBlock
          title="Kvs, PN, differential pressure, close-off and let-by"
          plainEnglish="Valve sizing is the mechanical designer's job. These are the words you will see on the schedule, and what each one is protecting against."
          onSite="If a valve will not shut fully, or hunts on part load, the cause is often in this list rather than in your wiring. Knowing the words lets you have the right conversation with the mechanical engineer."
        >
          <p>
            Every control valve and actuator combination has limits that must not be exceeded. The
            schedule will normally give you most of these:
          </p>
          <ul>
            <li>
              <strong>Kvs:</strong> the flow coefficient of the valve, worked out by calculation
              from the load. It is how the designer picks a valve that is big enough to pass full
              flow without being so big that it only controls over the first bit of its travel.
              (Older and American literature uses Cv; ignore it on UK schedules.)
            </li>
            <li>
              <strong>PN rating:</strong> the nominal pressure rating of the valve body. The valve
              must be rated above the highest pressure the system can put on it.
            </li>
            <li>
              <strong>Differential pressure:</strong> not the static pressure in the pipe, but the
              difference between the two sides of the valve while it works. If it is higher than the
              rated maximum for the valve and actuator combination, the actuator may not be able to
              close the valve.
            </li>
            <li>
              <strong>Close-off and let-by:</strong> close-off is the differential the actuator can
              shut the valve against; let-by is water still passing a valve that is meant to be
              shut. A heating coil warming up with its valve at 0% is the classic let-by symptom.
            </li>
            <li>
              <strong>Characteristic:</strong> how flow changes with valve position: linear, equal
              percentage, or modified versions of each. It is chosen to suit the way the load's
              output changes with flow, so that each step of actuator travel gives a roughly even
              step in heat output.
            </li>
            <li>
              <strong>Medium and temperature:</strong> valves are rated for what passes through them
              (potable water, glycol mixes, steam), and actuators for the ambient temperature, and
              often the humidity, around them.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Valve authority and rangeability"
          plainEnglish="Authority is how much say the valve really has over the flow. Rangeability is how small a flow it can still control properly."
          onSite="A valve with poor authority behaves as if it is either shut or fully open: most of the change in flow happens in a small part of its travel. If a loop hunts and the tuning looks sensible, ask whether the valve was sized with an authority figure in mind."
        >
          <p>
            <strong>Valve authority</strong> compares the pressure drop across the valve with the
            total pressure drop across the variable flow section it controls. It is given as a
            decimal between 0 and 1, or a percentage. A higher authority means the valve has more
            control over the flow; a low one means the rest of the circuit dominates and the valve
            struggles to make a difference until it is nearly shut.
          </p>
          <p>
            The usual target range is between <strong>0.5 and 0.7</strong>. Where the design does
            not state one, assuming 0.5 gives good control in most cases without loading the pump
            too heavily. The trade-off is real: a higher authority means a bigger pressure drop
            across the valve, which is more resistance for the pump to push against.
          </p>
          <p>
            <strong>Rangeability</strong> is the ratio between the largest flow a valve controls and
            the smallest flow it can still control accurately and repeatably. For HVAC, a good
            control valve has a rangeability above 50:1. It matters most at part load, when a
            building on a mild day only wants a trickle through each coil.
          </p>
          <p>
            You are not expected to calculate either. You are expected to recognise that a loop
            which will not settle may have a valve problem rather than a wiring or software problem,
            and to say so.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-3-authority"
          question="A valve is replaced with a much larger one 'to be safe'. The loop now swings from cold to hot with very little actuator movement. What has most likely happened?"
          options={[
            'The actuator supply voltage has dropped',
            'The PN rating of the new valve is too high',
            'Its authority over the circuit is now low',
            'The valve’s rangeability has gone up',
          ]}
          correctIndex={2}
          explanation="An oversized valve drops little pressure, so it has low authority, and most of the change in flow happens over a short part of its travel. That is why the loop will not settle. A higher PN rating is harmless, supply voltage does not cause this pattern, and oversizing reduces usable rangeability rather than increasing it."
        />

        <SectionRule />
        <ContentEyebrow>Pressure independent control valves</ContentEyebrow>

        <ConceptBlock
          title="A PICV is a control valve and a pressure regulator in one body"
          plainEnglish="On an ordinary valve, the flow at 50% open changes whenever the pressure in the system changes. A PICV keeps the flow at 50% open the same, whatever the rest of the building is doing."
          onSite="PICVs usually have a pre-setting dial or ring that sets the maximum flow. That is the commissioning engineer's setting. Do not turn it to make the actuator fit, and report it if you find it has been moved."
        >
          <p>
            In a variable flow system, pressure is always shifting. As valves elsewhere in the
            building close, the pump slows down, and the pressure across any one valve rises and
            falls. With a plain two-port valve, that means the flow at a given opening keeps
            changing, so the loop has to keep correcting, and one zone's demand interferes with the
            next.
          </p>
          <p>
            A <strong>pressure independent control valve (PICV)</strong> combines the control valve
            with a differential pressure regulator, so it automatically compensates for those
            pressure changes and keeps a consistent flow for a given opening. That stops terminals
            being oversupplied, stops units interfering with one another, makes balancing easier and
            reduces the number of separate regulating valves the system needs. PICVs are chosen for
            the maximum flow at full load, the minimum pressure they need to work, and the system
            pressure (PN). They are popular wherever variable speed pumps are used: air handling
            units, chilled beams and fan coil units.
          </p>
          <p>
            There are two families. A <strong>mechanical PICV</strong> does its pressure regulation
            without any power, and reacts quickly to pressure changes; you still fit an actuator to
            modulate it. An <strong>electronic PICV</strong> does the same job electronically, and
            needs a lower pressure difference across it to work.
          </p>
          <p>
            One distinction worth knowing: a valve that only limits the maximum flow balances the
            system at full design flow, but not at part load. A true PICV, where both the valve seat
            and the pre-setting are pressure independent, keeps the pressure across its control
            element steady at part load too, which is where a building spends most of its hours.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Dampers</ContentEyebrow>

        <ConceptBlock
          title="Dampers do for air what valves do for water"
          plainEnglish="A damper is a set of blades in a duct that open and close to control how much air gets through. An actuator on the spindle sets the angle."
          onSite="Check the blades through an access panel or by watching the linkage, not just the actuator's pointer. A damper with a slipped clamp shows 100% on the actuator and stays shut."
        >
          <p>
            A <strong>damper</strong>, also called a louvre, is a multi-blade flow control device
            for throttling big volumes of low-pressure air. On an air handling unit you will find
            them on the fresh air intake, the exhaust and the recirculation path, where the BMS uses
            them to set how much outside air the building gets, and in branch ducts where they share
            air between zones.
          </p>
          <p>
            The rules that apply to valves carry straight across. A control damper has to be sized
            to give the control authority the design needs; if it is not, the system can become
            effectively uncontrollable, with all the change in airflow crammed into a few degrees of
            blade movement. Its actuator has to be matched to it: rotary travel, enough torque for
            the blade area and the duct pressure, and the right supply and signal.
          </p>
          <p>
            Many damper actuators carry auxiliary switches or a position feedback signal. On an air
            handling unit sequence, the BMS often waits for a damper to prove open before it allows
            the fan to start.
          </p>
          <p>
            Keep <strong>fire and smoke dampers</strong> separate in your head. They belong to the
            fire strategy. In UK practice, actions such as plant shutdown and smoke control on a
            fire are driven by the fire detection and alarm system and its own interfaces, and a
            fire signal takes priority over every manual and automatic command in the plant logic.
            The BMS may monitor their position and carry out non-life-safety follow-up, but it is
            not the path that makes them operate.
          </p>
        </ConceptBlock>

        <Pullquote>
          A valve or damper with no authority does not control anything. It just decides when the
          system is allowed to go from one extreme to the other.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>How actuators are driven</ContentEyebrow>

        <ConceptBlock
          title="Two-position, 3-point, 0–10 V and networked"
          plainEnglish="Some actuators only open or shut. Some are pushed open or pulled shut a bit at a time. Some are told an exact position by a voltage. Some are told over a data cable."
          onSite="The wiring diagram on the actuator label is the authority. Terminal numbering varies between makers, so do not wire the replacement from memory of the old one."
        >
          <p>
            The control signal type decides which kind of BMS point the actuator needs, which is why
            it matters to the person wiring it:
          </p>
          <ul>
            <li>
              <strong>Two-position (on/off):</strong> power on drives it one way, power off lets it
              return or drives it the other way. Fed from a <strong>digital output</strong>, often
              through an interposing relay. Zone valves and isolating dampers are usually this type.
            </li>
            <li>
              <strong>3-point (floating, raise/lower):</strong> three wires: a common, a drive-open
              and a drive-closed. The BMS uses <strong>two digital outputs</strong>, pulsing one or
              the other to nudge the actuator in the direction it wants. With neither on, the
              actuator stays where it is. The outstation works out the position from how long it has
              driven each way, so it can drift over time unless the actuator is driven to an end
              stop now and then or has position feedback.
            </li>
            <li>
              <strong>Modulating 0–10 V DC:</strong> one <strong>analogue output</strong> gives the
              position directly: one end of the range is closed, the other fully open. The actuator
              has its own positioning circuit, because an electric motor has no idea where its own
              shaft is without one.
            </li>
            <li>
              <strong>Networked (smart) actuators:</strong> connected to the control system over a
              network, not by individual signal cables, and configurable for things such as speed of
              travel. They only work if the actuator speaks a protocol the controller understands;
              check that before anyone orders them.
            </li>
          </ul>
          <p>
            On the supply side, low voltage actuators are commonly 230 V AC and extra-low voltage
            ones 24 V AC, fed from a control transformer in the panel. The control circuits and
            transformer supplying them are auxiliary circuits under BS 7671 Section 557, which is
            why the panel drawings should show where each actuator supply comes from.
          </p>
          <p>
            Many actuators also have a <strong>feedback</strong> output: either end-of-travel
            switches (fully open, fully closed) for a digital input, or a continuous position signal
            for an analogue input. The BMS uses it either to close the loop on position, or as an
            independent check that the device went where it was told.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-3-signals"
          question="The points schedule lists a heating valve with two digital outputs labelled 'open' and 'close', and no analogue output. What type of actuator does it expect?"
          options={[
            'A 0–10 V modulating actuator',
            'A two-position spring-return actuator',
            'A 3-point (floating) actuator',
            'A networked smart actuator',
          ]}
          correctIndex={2}
          explanation="Two switched outputs, one to drive open and one to drive closed, is the 3-point arrangement. A 0–10 V actuator needs one analogue output; a two-position actuator needs one digital output; a networked one needs no individual outputs at all."
        />

        <CommonMistake
          title="Open and close the wrong way round"
          whatHappens="On a 3-point actuator the drive-open and drive-closed wires are swapped at the outstation or the actuator, or a 0–10 V actuator is left on the wrong direct/reverse setting. Every command now moves the valve the opposite way. The loop does the reverse of what it should: as the room gets colder, the heating valve shuts, and the room keeps getting colder."
          doInstead="Before handing a loop to the controls engineer, command each actuator to fully open and fully closed from the BMS and watch the valve or damper itself, not just the indicator. Check the direct/reverse switch or setting against the schedule and record the result on the checklist."
        />

        <SectionRule />
        <ContentEyebrow>When the power goes</ContentEyebrow>

        <ConceptBlock
          title="Spring return and the fail position"
          plainEnglish="Spring return means that if the power goes off, a spring inside the actuator drives the valve or damper to a set position. Without it, the actuator just stops where it is."
          onSite="Look for the spring-return marking on the label, then check the maker's instructions for how the fail direction is set. Depending on the actuator, that can be the way it is mounted rather than anything in the wiring."
        >
          <p>
            A <strong>spring-return</strong> actuator winds up a spring as it moves. If it loses its
            supply, the spring drives the valve or damper to a known position chosen at design. A{' '}
            <strong>non-spring-return</strong> actuator simply stays where it was when the power
            went. Both are legitimate choices; the question is which position is safest for the
            plant.
          </p>
          <p>
            Good practice is to decide the safest failure position from the risk to the plant first,
            and then choose the actuator and its action to suit, rather than letting habit or
            convenience decide. Typical examples:
          </p>
          <ul>
            <li>
              The fresh air damper on an air handling unit closing on power loss, so freezing air is
              not pulled across the coils with the fan stopped.
            </li>
            <li>
              The heating coil valve on the same unit opening to the coil on power loss, so the coil
              keeps getting warm water and does not freeze.
            </li>
            <li>
              A chilled water valve closing on power loss where nothing is lost by stopping cooling.
            </li>
          </ul>
          <p>
            Many actuators also have a <strong>manual override</strong>: a hand crank or a declutch
            lever that disengages the motor so the valve can be moved by hand. It is useful during a
            fault, and a trap afterwards: an actuator left in manual will not respond to the BMS at
            all.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Section 557, auxiliary circuits; Regulation 557.3.1 context"
          meaning="The supply to an auxiliary circuit, such as the control transformer feeding a set of actuators, may be dependent on or independent of the main circuit, chosen according to what the auxiliary circuit has to do. For actuators this is a real decision: if their supply dies with the plant, every spring-return device goes to its fail position at the same moment. That should be intended, not an accident of where the transformer happened to be fed from."
          cite="BS 7671 Section 557"
        />

        <Scenario
          title="An AHU heating coil that froze over a weekend"
          situation="A school's air handling unit tripped on a Saturday night during a cold snap. By Monday the heating coil had split. The frost protection routine in the BMS was correctly programmed, and the fresh air damper actuator was spring return and had closed. The heating valve actuator was a non-spring-return 3-point type, fed from the same control transformer as the fan starter, and that transformer was fed from the AHU panel supply. When the AHU supply breaker tripped, the transformer lost its supply and the valve stayed where the BMS had last left it: almost shut, because the building had been warm on Saturday afternoon."
          whatToDo="Raise it with the designer rather than rewiring it yourself. The options are a spring-return actuator on the heating valve that fails to the coil, or a supply arrangement for the frost-critical actuators and controller that does not disappear when the plant trips, or both. Whichever is chosen, test it: isolate the actuator supply and watch each frost-critical valve and damper go to its fail position. Record the result on the actuator checklist."
          whyItMatters="Frost protection software only works while the controller and actuators have power. The fail position of each actuator, and where its supply comes from, are the protection that remains when everything else has stopped. That is exactly the dependent-or-independent supply decision Section 557 asks somebody to make on purpose."
        />

        <SectionRule />
        <ContentEyebrow>Proving it works</ContentEyebrow>

        <ConceptBlock
          title="Commissioning an actuator: four checks and a feedback test"
          plainEnglish="Command it, watch the real valve or damper, and prove it does what the drawing says, including when the power is pulled."
          onSite="Do these checks with someone at the head end or a laptop on the outstation, and someone at the device. Shouting across a plant room works; assuming does not."
        >
          <p>
            Control of the plant depends on actuators doing what they are told. Before handover,
            each one should be checked and the actuator checklist completed. As a minimum:
          </p>
          <ul>
            <li>
              <strong>Direction and extent:</strong> the actuator moves the right way for the
              command, and travels far enough to give the full required movement of the valve or
              damper, fully open and fully closed.
            </li>
            <li>
              <strong>Linkage:</strong> adjustments for rotation, lift or close-off are set, and the
              clamp or coupling is tight on the spindle.
            </li>
            <li>
              <strong>Fail position:</strong> where spring-return actuators are fitted, isolate the
              supply and confirm the device goes to its intended position.
            </li>
            <li>
              <strong>Smooth movement:</strong> the motor and the device it drives move smoothly and
              repeatably through the whole stroke, with no sticking or juddering.
            </li>
          </ul>
          <p>
            Where position feedback is wired, compare it with the command at a few points across the
            range. A difference between what the BMS asked for and what the actuator reports is the
            fastest way to find a sticking valve, a slipped linkage or a failing motor, both now and
            for the maintenance team later. In service, actuators and their fail-safe operation
            should be checked as part of planned maintenance, starting with the cables for signs of
            damage.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-3-commission"
          question="During commissioning, the BMS shows a damper actuator at 100% and its feedback reads 100%, but there is no airflow. What should you check next?"
          options={[
            'Whether the linkage has slipped on the damper spindle',
            'Whether the actuator expects 2–10 V rather than 0–10 V',
            'Whether the fan proving switch is set too high',
            'Nothing, as matching feedback proves the blades are open',
          ]}
          correctIndex={0}
          explanation="Feedback comes from the actuator, so it proves the actuator moved, not that the blades did. A loose clamp or slipped linkage lets the actuator turn while the damper stays shut. A signal range mismatch would show as a feedback error, and the proving switch only reports the airflow problem; it does not cause it."
        />

        <CommonMistake
          title="Leaving an actuator in manual override"
          whatHappens="During a fault or a flush, someone declutches an actuator and winds the valve open by hand. The job finishes, the override is never re-engaged, and the BMS keeps sending commands to a motor that is no longer connected to the valve. The loop hunts or sits at one extreme, and nobody looks at the actuator because 'the BMS says it is at 30%'."
          doInstead="If you put an actuator into manual, tag it and note it on the job sheet, and re-engage it before you leave. When a loop will not respond, check every actuator in it for override before anyone starts changing the software."
        />

        <FAQ
          items={[
            {
              question:
                'Can I replace a 3-point actuator with a 0–10 V one if that is what the wholesaler has?',
              answer:
                'Not without changing the outstation side. A 3-point actuator uses two digital outputs; a 0–10 V actuator needs one analogue output and the software written for it. If spare analogue outputs exist and the controls engineer changes the point and the program, it can be done. Swapping the actuator alone will leave you with a valve that does not move as the BMS expects.',
            },
            {
              question:
                'Do actuators need their own supply, or can they share the panel transformer?',
              answer:
                'They usually share a control transformer in the panel, sized by the designer for the number of actuators it feeds. The important question is not sharing but dependence: what else loses power at the same time, and what each spring-return actuator does when it happens. That is a design decision under BS 7671 Section 557, so check the drawings rather than tapping a supply wherever is convenient.',
            },
            {
              question: 'Why does a heating coil get warm when its valve is showing closed?',
              answer:
                'Usually let-by. Either the valve is not seating, the differential pressure is beyond what the actuator can close against, or the linkage is not set so the actuator reaches true close. Command it shut, check the actuator reaches its end stop and the stem has fully travelled, and report it if the coil still warms. Do not adjust a PICV pre-setting to cure it.',
            },
            {
              question: 'Is a PICV always better than a standard two-port valve?',
              answer:
                'Not always, but on variable flow systems with variable speed pumps it solves a real problem: flow at a given opening stays put while system pressure moves around it. It is chosen by the mechanical designer for the full-load flow and pressure conditions. From the electrical side it is still a two-port valve with an actuator, and it is wired and commissioned the same way.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'An actuator turns a BMS output into movement and must match the valve or damper, the supply and the control signal.',
            'Two-port valves throttle and give variable system flow; three-port valves mix or divert and keep circuit flow broadly constant.',
            'A PICV holds a steady flow at a given opening as system pressure changes, which is why it suits variable speed pumping.',
            'Valve authority compares the valve pressure drop with the variable flow section it controls; 0.5 to 0.7 is the usual target. Oversized valves control badly.',
            'Two-position needs one digital output, 3-point needs two, 0–10 V needs one analogue output, and smart actuators need a compatible network protocol.',
            'Spring return sets the fail position on loss of power; choose it from the risk to the plant and prove it by isolating the supply.',
            'Fire and smoke dampers belong to the fire system. The BMS monitors them; it is never the life safety path.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-2"
          prevLabel="Sensors"
          nextHref="/study-centre/upskilling/bms-module-2-section-4"
          nextLabel="Siting sensors and getting true readings"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section3;
