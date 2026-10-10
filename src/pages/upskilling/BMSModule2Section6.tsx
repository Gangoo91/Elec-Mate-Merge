/**
 * BMS Module 2 · Section 6 — Control wiring
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the wiring an electrician
 * actually puts in between a BMS controller and its field devices: the 0–10 V and 4–20 mA
 * signal standards (scaling, why a current loop is indifferent to cable resistance, live zero
 * against dead zero and what a broken wire looks like on each), two-wire and four-wire loops,
 * how noise couples into signal cables, screened twisted pair and where the screen is
 * terminated, segregation under BS 7671 Regulation 528.1 (segregate, or use a permitted
 * method) with separation distances left to BS EN 50174-1 and -2 via Regulation 444.4.10, and
 * cable choice, identification and labelling. The old page taught a "300 mm minimum
 * separation" as a BS 7671 rule, invented voltage bands ("high >50 V, low 12–50 V, extra-low
 * <12 V"), shield coverage percentages and cable impedance figures. All of that is gone.
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

const TITLE = 'Control wiring | BMS Module 2.6 | Elec-Mate';
const DESCRIPTION =
  'How 0–10 V and 4–20 mA signals work, why a current loop resists noise, where a cable screen is terminated, and how BS 7671 Regulation 528.1 governs segregation.';

const outcomes = [
  'Convert between a 0–10 V or 4–20 mA signal and the percentage of range it represents',
  'Explain why a current loop is unaffected by cable resistance, and why that makes it the stronger signal over distance',
  'Use the idea of live zero to tell a genuine low reading from a broken wire',
  'Explain how noise gets into signal cables, and what twisting, screening and routing each do about it',
  'Describe Regulation 528.1 as "segregate, or use a permitted method", and say where separation distances for control cabling come from',
  'Identify, terminate and label control cabling so the controls engineer can commission it and the next person can maintain it',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A four-wire, self-powered 4–20 mA transmitter is wired to a controller input that is set to supply loop power. What is the problem?',
    options: [
      'Two sources are now trying to drive one loop',
      'The live zero will move up from 4 mA to 8 mA',
      'The screen must now be earthed at both ends',
      'None, as the input reads current from either source',
    ],
    correctIndex: 0,
    explanation:
      'Only one thing should power a current loop. A four-wire transmitter sources its own current, so an input that also supplies loop power puts two sources on one loop and they fight. Check the input configuration with the controls engineer. The live zero does not move, and screen termination is unrelated.',
  },
  {
    id: 2,
    question:
      'A 4–20 mA sensor is replaced with a 0–10 V version of the same range, on the same long cable run. Which new weakness has been introduced?',
    options: [
      'Voltage dropped or picked up along the cable now changes the reading',
      'The controller can no longer tell a reading of 50% from one of 100%',
      'The cable screen must now be earthed at both ends',
      'The sensor now needs a separate 230 V supply',
    ],
    correctIndex: 0,
    explanation:
      'A voltage input reads whatever voltage arrives at its terminals, so anything lost or added along the conductors shifts the value. A current loop keeps the same current all the way round the circuit, so cable resistance does not change what the controller reads. Nothing about the change affects how the screen is terminated.',
  },
  {
    id: 3,
    question:
      'A 0–10 V outside air temperature input suddenly reads the bottom of its range on a mild afternoon. What should you suspect first?',
    options: [
      'A sudden change in the weather that the trend has not yet caught',
      'The controller has been set to a reverse-acting strategy',
      'The input has drifted out of calibration over the summer',
      'A broken wire or lost supply, as 0 V is also valid',
    ],
    correctIndex: 3,
    explanation:
      'A 0–10 V signal is a dead-zero standard: an open circuit gives 0 V, which the controller reads as a genuine bottom-of-range value. On a mild afternoon that reading is implausible, so check the wiring and the sensor supply before anything else. Calibration drift does not normally produce a sudden jump to one end of the scale.',
  },
  {
    id: 4,
    question:
      'On a two-wire, loop-powered 4–20 mA transmitter, where does the transmitter get the power to work?',
    options: [
      'From a separate mains supply wired to its own terminals',
      'From the loop, through the two signal wires',
      'From an internal battery that the current loop recharges',
      'From the cable screen, which is used as a supply conductor',
    ],
    correctIndex: 1,
    explanation:
      'A two-wire transmitter takes its operating power from the loop it regulates: the supply sits elsewhere in the circuit, often in the controller, and the transmitter sets how much current flows. A four-wire transmitter is the type with a separate supply. The screen is never a working conductor.',
  },
  {
    id: 5,
    question:
      'Why does twisting the two cores of a signal pair reduce interference from a nearby motor cable?',
    options: [
      'Twisting increases the insulation thickness between the two cores',
      'Each twist reverses the loop, so induced voltages cancel',
      'Twisting raises the cable’s resistance so less noise current can flow',
      'Twisting turns the pair into a screen that is earthed through the controller',
    ],
    correctIndex: 1,
    explanation:
      'A changing magnetic field induces a voltage in any loop of conductor. Twisting breaks the pair into many small loops of alternating direction, so the induced effects largely oppose each other. It does nothing to insulation or resistance, and it is not a screen; the screen deals with electric-field (capacitive) coupling.',
  },
  {
    id: 6,
    question:
      'A specification says the screens of BMS analogue cables are to be terminated "in accordance with the controls manufacturer’s instructions". Why is earthing them at both ends usually avoided?',
    options: [
      'Because BS 7671 bans connecting any conductor to earth at two points',
      'Because a screen earthed at both ends stops the cores carrying current',
      'Because it doubles the capacitance between the cores and the screen',
      'Because earth potential differences drive current along it',
    ],
    correctIndex: 3,
    explanation:
      'With a screen connected to earth at both ends, any potential difference between the two earth points pushes current through the screen. That earth loop can put noise into the very signal the screen is meant to protect. It is a signal-integrity reason, not a BS 7671 rule, which is why you follow the manufacturer’s instructions for where the screen is terminated.',
  },
  {
    id: 7,
    question:
      'What is BS 7671 Regulation 528.1 mainly there to prevent when Band I and Band II circuits share a wiring system?',
    options: [
      'Mains cables putting electrical noise on BMS signals',
      'A mains fault putting mains voltage onto ELV conductors',
      'Mains cables overheating from extra cables beside them',
      'Signal cables being mistaken for mains during isolation',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 528.1 is a safety rule. It stops a fault on a mains circuit putting mains voltage onto conductors and terminals that people expect to be at extra-low voltage. Interference is a separate question, dealt with by BS EN 50174-1 and -2 through Regulation 444.4.10. Grouping and identification are covered elsewhere.',
  },
  {
    id: 8,
    question:
      'A client asks you what the minimum gap between the BMS cabling and the mains cabling should be. Where should that figure come from?',
    options: [
      'Regulation 528.1, which sets the distance for each voltage band',
      'A general rule of thumb used by most electrical contractors',
      'BS EN 50174-1 and -2, applied via Regulation 444.4.10',
      'The cable manufacturer’s data sheet for the mains cable',
    ],
    correctIndex: 2,
    explanation:
      'Regulation 444.4.10 requires BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for bonding networks) to be applied to control, signalling and communication circuits in a building, and that is where separation distances are set out. Regulation 528.1 deals with whether bands may share a wiring system, not how far apart they are. A rule of thumb is not a design figure.',
  },
  {
    id: 9,
    question:
      'You need to read the current in a working 4–20 mA loop that feeds a chilled water valve. What should happen before you open the loop to put your meter in series?',
    options: [
      'Nothing, as the reading is only taken for a few seconds',
      'The controls engineer agrees it and holds the plant',
      'The cable screen is disconnected at both ends',
      'The loop is changed over to a 0–10 V signal for the test',
    ],
    correctIndex: 1,
    explanation:
      'Opening the loop drops the current to zero, which the controller sees as a failed or out-of-range signal and may react to. The controls engineer needs to know, and the output or strategy may need holding while you work. A clamp-type milliammeter avoids opening the loop at all. Disturbing the screen has nothing to do with it.',
  },
  {
    id: 10,
    question: 'A multicore signal cable has two spare cores at handover. How should they be left?',
    options: [
      'Cut back flush at both ends so they cannot touch',
      'Full length, identified and safely terminated',
      'Twisted together and connected to the screen',
      'Connected to earth at one end to stop pick-up',
    ],
    correctIndex: 1,
    explanation:
      'Spare cores left full length, identified and safely terminated are the cheapest repair when a core fails or a point is added later. Cutting them back throws that away. Joining them to the screen or to earth turns them into something they were not designed to be.',
  },
];

const BMSModule2Section6 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 6"
        title="Control wiring"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers how to choose, route, screen and label the cable between a BMS
          controller and its field devices. On site, that cable carries a measurement, and how you
          install it decides whether the reading arrives intact.
        </p>

        <TLDR
          points={[
            '0–10 V and 4–20 mA are the two analogue signals you will wire most. Both are straight-line scales; 4–20 mA starts at 4 mA, not zero.',
            'A current loop carries the same current all the way round, so cable resistance does not change the reading. A voltage signal is read at the far end, so losses and pick-up along the cable do.',
            'Live zero is the safety net: a 4–20 mA loop with a broken wire reads well below 4 mA and is obviously faulty. A broken 0–10 V wire reads 0 V, which looks like a real value.',
            'Twisting deals with magnetic pick-up, the screen deals with electric-field pick-up, and routing away from power cables helps both. Terminate screens as the controls manufacturer instructs, typically at one end only.',
            'Regulation 528.1: segregate Band I from Band II, or use a permitted method. Separation distances for control cabling come from BS EN 50174-1 and -2 through Regulation 444.4.10, not from BS 7671.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The two signals</ContentEyebrow>

        <ConceptBlock
          title="0–10 V and 4–20 mA: two ways of saying a percentage"
          plainEnglish="Both signals are just a percentage sent down a pair of wires. One sends it as a voltage, the other as a current."
          onSite="Before you terminate an analogue point, check the points schedule for which signal it is. A 0–10 V output wired to a 4–20 mA input, or the other way round, will not give a sensible reading."
        >
          <p>
            An analogue point carries a value, not a state. A temperature sensor tells the
            controller how warm the duct is; a controller output tells a valve actuator how far to
            open. On BMS work, two signal standards carry most of those values, and you will wire
            both on almost every job.
          </p>
          <p>
            A <strong>0–10 V</strong> signal represents 0% of range at 0 V and 100% at 10 V, with
            everything in between in proportion. It is very common in building heating and cooling
            controls: valve and damper actuators, sensor outputs, and the speed reference to a
            variable speed drive, where 0 V asks for minimum and 10 V for full speed.
          </p>
          <p>
            A <strong>4–20 mA</strong> signal represents 0% at 4 mA and 100% at 20 mA. The span is
            16 mA, not 20, and that catches people out. The quarter points are worth knowing by
            heart because you will use them every time you check a loop:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>4 mA is 0% of range</li>
            <li>8 mA is 25%</li>
            <li>12 mA is 50%</li>
            <li>16 mA is 75%</li>
            <li>20 mA is 100%</li>
          </ul>
          <p>
            To turn any reading into a percentage, take off the bottom of the scale and divide by
            the span. For 4–20 mA that is (reading − 4) ÷ 16. For 0–10 V it is simply the reading ÷
            10. Then apply that percentage to the sensor’s range. A sensor ranged −20 to +40 °C
            reading 12 mA is at 50%, which is halfway along a 60-degree span: +10 °C.
          </p>
          <p>
            The actuator or sensor must match the controller channel it is wired to. Many
            outstations have universal inputs that can be set for either signal type in software,
            but the setting and the wiring have to agree, and the actuator has to be one that
            accepts the signal and supply voltage it is given.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-6-scaling"
          question="A 4–20 mA humidity sensor is ranged 0–100 %RH. The controller input reads 8 mA. What humidity does that represent?"
          options={['40 %RH', '25 %RH', '8 %RH', '50 %RH']}
          correctIndex={1}
          explanation="Take off the 4 mA live zero to get 4 mA, and divide by the 16 mA span: 4 ÷ 16 = 0.25, so 25% of a 0–100 range, which is 25 %RH. The 40 %RH answer comes from dividing 8 by 20 and forgetting the scale starts at 4 mA."
        />

        <SectionRule />
        <ContentEyebrow>Why current travels better</ContentEyebrow>

        <ConceptBlock
          title="Why a current loop does not care about the cable"
          plainEnglish="In a series circuit, the current is the same everywhere. So if the signal is a current, a long or thin cable cannot change it."
          onSite="On a long run, a 0–10 V reading that is a little low at the controller compared with what the device says it is sending is a clue: measure at both ends and compare."
        >
          <p>
            A 4–20 mA loop is a single series circuit: a source, the cable out, the device at the
            other end, and the cable back. In a series circuit there is only one path, so the
            current is identical at every point. Whatever current the transmitter sets is the
            current the controller sees.
          </p>
          <p>
            The device setting the current behaves as a regulated current source. If the cable is
            longer, the connections are a little resistive or the receiving input has a different
            resistance, the source simply adjusts the voltage it needs to keep the current where it
            should be. Changes in wire resistance do not change the value, within the limits of the
            voltage the loop has available.
          </p>
          <p>
            A voltage signal works the other way. The controller reads the voltage across its own
            input terminals, so any voltage lost along the conductors, or any unwanted voltage
            picked up on them, becomes part of the reading. On short runs inside a plant room that
            rarely matters. On a long run past a lot of plant, it can.
          </p>
          <p>
            Inside the controller, a current input is often read by measuring the voltage across a
            precision resistor. A 250 Ω resistor turns 4–20 mA into 1–5 V, which is why you may see
            a resistor fitted across a voltage input to let it accept a current loop. Leave it in
            place: it is part of the measurement, not a forgotten component.
          </p>
        </ConceptBlock>

        <Pullquote>
          A current loop says the same thing at both ends of the cable. A voltage signal says
          whatever is left of it when it arrives.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Live zero and dead zero</ContentEyebrow>

        <ConceptBlock
          title="What a broken wire looks like on each signal"
          plainEnglish="If a 4–20 mA wire breaks, the current drops to nothing, which is outside the normal range and easy to spot. If a 0–10 V wire breaks, the reading drops to 0 V, which is a normal value."
          onSite="When a 0–10 V point sits at exactly zero, or a 4–20 mA point sits well below 4 mA, check the wiring before you believe the reading."
        >
          <p>
            The 4–20 mA standard is called a <strong>live zero</strong> signal because 0% of range
            is a real, flowing current. That gives the controller a simple way to tell a genuine
            bottom-of-range value from a fault. A cut cable, a loose terminal or a dead transmitter
            takes the loop to zero current, which is well below the 4 mA floor, and the controller
            can raise a sensor fault alarm instead of acting on a false value.
          </p>
          <p>
            Some transmitters go further and deliberately drive their output to a set level just
            outside the 4–20 mA band when they detect an internal fault, so the controller can tell
            a failed sensor from an over-range or under-range measurement. Whether a device does
            this, and at what levels, is in its data sheet.
          </p>
          <p>
            0–10 V is a <strong>dead zero</strong> signal. A broken conductor gives 0 V, and 0 V is
            a perfectly valid reading at the bottom of the scale. The controller cannot tell the
            difference from the signal alone. That matters more than it sounds: a valve position
            feedback reading 0% could mean the valve is shut or that the wire is off; an outside air
            sensor reading the bottom of its range could be a hard frost or a cut cable.
          </p>
          <p>
            This is one reason 4–20 mA is often specified for measurements that matter most, and why
            a good controls strategy checks 0–10 V values for plausibility. For you, it means a 0–10
            V point that suddenly reads zero is a wiring question first.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-6-live-zero"
          question="A 4–20 mA return air temperature point reads 0.0 mA on the controller diagnostics. What is the most likely explanation?"
          options={[
            'The return air is at the bottom of the range',
            'The scaling is wrong, though the sensor is fine',
            'The loop is open or the transmitter is dead',
            'The screen is terminated at the wrong end',
          ]}
          correctIndex={2}
          explanation="The bottom of range on a 4–20 mA loop is 4 mA, not zero. No current at all means the circuit is open or nothing is driving it, which is the fault live zero is designed to reveal. A scaling error gives a wrong value, not zero current, and a misplaced screen causes noise rather than a dead loop."
        />

        <SectionRule />
        <ContentEyebrow>Wiring the loop</ContentEyebrow>

        <ConceptBlock
          title="Two-wire and four-wire loops, polarity and power"
          plainEnglish="Something has to power a current loop. Either the loop power comes from the controller and the transmitter just regulates it, or the transmitter has its own supply and drives the loop itself."
          onSite="Read the device’s wiring diagram before you terminate. A loop wired the wrong way round, or powered from two places at once, will not read correctly."
        >
          <p>
            A <strong>two-wire</strong> or <strong>loop-powered</strong> transmitter has only two
            terminals. The loop supply sits elsewhere in the circuit, often inside the controller,
            and the transmitter takes its operating power from the same two wires that carry the
            signal while it regulates how much current flows. Because the transmitter only ever gets
            the current it is passing, it is designed to work on what is available at the bottom of
            the scale.
          </p>
          <p>
            A <strong>four-wire</strong> or <strong>self-powered</strong> transmitter has a separate
            supply pair and drives the signal loop itself, acting as the source. The controller
            input then simply receives the current.
          </p>
          <p>
            Two things follow for the installer. First, <strong>polarity matters</strong>. A current
            loop is DC; the positive and negative terminals at each end have to line up as the
            drawings show. Second, <strong>only one thing powers the loop</strong>. If the
            controller input is set to supply loop power and the transmitter is four-wire and
            sourcing its own current, the two fight each other. Check how the input is configured
            with the controls engineer.
          </p>
          <p>
            A loop-powered transmitter also needs a minimum voltage across its terminals to keep
            working. Each extra item in the loop, such as a local indicator or a long run of thin
            cable, takes some of the voltage the supply has available. Add too much and the
            transmitter can be starved, which tends to show up as a reading that misbehaves near the
            top of the scale. If a design adds devices to an existing loop, that voltage budget is
            the controls engineer’s check to make.
          </p>
          <p>
            For a 0–10 V device, the same discipline applies in a different form: the signal common
            at the device and the signal common at the controller need to be the same reference, and
            the device usually has its own supply pair as well, often sharing that common. Follow
            the manufacturer’s diagram exactly; an extra or missing common link is a classic source
            of an offset reading.
          </p>
          <p>
            Where 24 V AC actuators and sensors share a transformer with the controller, the
            transformer’s reference conductor (often marked G0 or as the 24 V common) must go to the
            same terminal at every device. Swap the two 24 V conductors at one actuator and you put
            AC onto the signal reference. That shows up as offsets or hunting, or damages an input.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Measuring a 4–20 mA loop like a voltage"
          whatHappens={
            <p>
              Someone puts a multimeter set to current straight across the two terminals of a live
              loop, the way they would check a voltage. The meter shorts out the device, the reading
              means nothing, and the controller sees its signal jump. On a loop that drives a valve
              or a drive speed, the plant reacts.
            </p>
          }
          doInstead={
            <p>
              Current is measured in series: open the loop at a terminal and put the meter in the
              circuit, or use a clamp-type milliammeter that reads the loop without opening it.
              Before opening any live loop, tell the controls engineer, because the controller will
              see the signal drop to zero and may act on it. A 0–10 V signal, by contrast, is
              measured across the input terminals with the circuit left intact. Section 7.7 (Fault
              finding on a BMS) covers loop checks in more detail.
            </p>
          }
        />

        <SectionRule />
        <ContentEyebrow>How noise gets in</ContentEyebrow>

        <ConceptBlock
          title="Electric fields, magnetic fields and why analogue suffers most"
          plainEnglish="A power cable lying alongside a signal cable can push some of its own voltage and current into it. The signal cable then carries the reading plus a bit of the power cable."
          onSite="Variable speed drive output cables are the usual suspects on BMS jobs. Keep analogue signal cables well clear of them along their whole run, not just where they leave the panel."
        >
          <p>
            Two conductors that run side by side are coupled in two ways. They form a small
            capacitor, so a changing voltage on one pushes a little current into the other: this is{' '}
            <strong>capacitive</strong> or electric-field coupling, and it gets worse as the voltage
            and frequency on the power cable rise. They also behave like the windings of a loose
            transformer, so a changing current in one induces a voltage in the other: this is{' '}
            <strong>inductive</strong> or magnetic-field coupling, and it gets worse with more
            current and higher frequency.
          </p>
          <p>
            The simplest cure for both is distance. The further apart the two cables, the weaker
            both kinds of coupling. Where a signal cable has to cross a power cable, crossing at
            right angles keeps the coupling small because the two run alongside each other for only
            a short length. Long parallel runs in the same tray are the worst case.
          </p>
          <p>
            Analogue signals suffer most. Every tiny change in an analogue signal means something,
            so any noise added to it is read as a change in temperature, pressure or valve position.
            A digital signal only has to stay clearly above or below its switching thresholds, so it
            shrugs off noise that would visibly upset an analogue one. That is why the network cable
            between controllers is usually less fussy about its surroundings than the analogue pair
            to a sensor in the same tray.
          </p>
          <p>
            Some sources are especially noisy. Drive output cables, motor cables and switching power
            supplies all produce fast-changing voltages and currents. Metal containment that fully
            encloses a cable helps against electric-field coupling, which is one reason drive output
            cables are often run in their own steel conduit or trunking. Open cable tray earths the
            run but does not enclose the cables, so it does not screen them.
          </p>
        </ConceptBlock>

        <Scenario
          title="A supply air temperature that follows the fan speed"
          situation={
            <p>
              On a newly installed air handling unit, the supply air temperature trend shows a
              ripple that gets worse whenever the supply fan drive ramps up, and the heating valve
              hunts as a result. The sensor checks out on the bench. On site, you find its 0–10 V
              cable has been cable-tied to the drive’s motor output cable for several metres along
              the same tray, because it was the tidiest route.
            </p>
          }
          whatToDo={
            <p>
              Reroute the sensor cable away from the drive output cable for its whole length,
              crossing at right angles where the routes have to meet. Confirm the cable is the
              screened twisted pair the specification calls for, that the screen is continuous at
              any joints, and that it is terminated where the controls manufacturer’s instructions
              say. Then ask the controls engineer to watch the trend with the fan running across its
              speed range. If the design allows, a 4–20 mA sensor on that run would also be less
              sensitive to what remains.
            </p>
          }
          whyItMatters={
            <p>
              The sensor was never faulty. Noise from the drive was being read as a real temperature
              change, and the controller was doing its job by chasing it. Replacing the sensor would
              have cost a visit and changed nothing. Cable routing is the electrician’s part of the
              control loop.
            </p>
          }
        />

        <SectionRule />
        <ContentEyebrow>Screens and twists</ContentEyebrow>

        <ConceptBlock
          title="Screened twisted pair, and where the screen is terminated"
          plainEnglish="The twist cancels magnetic pick-up. The screen catches electric-field pick-up and carries it to earth. Each does a job the other cannot."
          onSite="Check the specification and the controls manufacturer’s instructions for where the screen goes before you terminate the first cable, and do every cable the same way."
        >
          <p>
            Signal cables for BMS analogue points are usually{' '}
            <strong>screened twisted pairs</strong>, and each part does something different.
          </p>
          <p>
            The <strong>twist</strong> deals with magnetic pick-up. A changing magnetic field
            induces a voltage in any loop of wire. Twisting turns one long loop into a chain of
            small loops that alternate in direction, so the voltage induced in one is largely
            cancelled by the next. Screening a cable does little against magnetic fields; the twist
            is what handles them.
          </p>
          <p>
            The <strong>screen</strong>, a foil or braid wrapped round the pair, deals with
            electric-field pick-up. Connected to earth, it intercepts the coupling from outside and
            gives it a path to earth instead of into the signal cores. A screen that is not
            connected to anything does very little.
          </p>
          <p>
            Where the screen is connected matters. If it is connected to earth at both ends, and the
            two earth points are not at exactly the same potential, current flows along the screen
            from one end to the other. That is an <strong>earth loop</strong>, and it can put noise
            into the signal the screen is meant to protect. For that reason a signal screen is
            commonly earthed at one end only. Which end, and how, is set by the controls
            manufacturer’s instructions for that equipment, and those instructions are what you
            follow.
          </p>
          <p>
            The exception you will meet most is the variable speed drive. Drive manufacturers
            commonly require the motor cable screen, and often the control cable screens, to be
            bonded at both ends with 360-degree glands or clamps, because at drive switching
            frequencies that is what works. Follow the drive manual for drive cables and the
            controls manufacturer for sensor cables.
          </p>
          <p>
            Two practical points complete the job. The screen must be <strong>continuous</strong>:
            where a cable is jointed in a junction box, the screens of the two cables are joined
            through, not cut back and left. And at the unterminated end, the screen is trimmed and
            insulated so that it cannot touch an earthed enclosure or another terminal, which would
            quietly create the second earth point you were avoiding. Screen continuity is one of the
            standard pre-commissioning wiring checks.
          </p>
          <p>
            Do not confuse a signal screen with the earthed metal screen that Regulation 528.1
            allows as a segregation method in a multicore cable. That screen sits between Band I and
            Band II cores and has to have a current-carrying capacity equivalent to the largest Band
            II core. The foil on a typical instrument pair is there for signal quality and is not
            that.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Earthing every screen at both ends to be safe"
          whatHappens={
            <p>
              An installer used to bonding everything connects each signal screen to the earth bar
              in the outstation panel and to the earth terminal at every field device. On a large
              building the two ends of a long cable can sit on earths at slightly different
              potentials, so current flows along the screens and analogue readings become noisy. The
              fault is intermittent and hard to trace.
            </p>
          }
          doInstead={
            <p>
              Terminate screens exactly as the controls manufacturer’s instructions and the
              specification say, which for analogue signal cables is commonly one end only. Keep the
              screen continuous through every joint and insulate the free end. Signal screens are
              for signal quality; protective earthing of the equipment is done by its own circuit
              protective conductors, and the two jobs should not be mixed up.
            </p>
          }
        />

        <InlineCheck
          id="bms-2-6-screen"
          question="A screened signal cable is jointed in a junction box halfway along its run. How should the screens be treated at the joint?"
          options={[
            'Cut both back and leave them, as the screen only matters at the ends',
            'Connect both to the junction box earth terminal to add an extra earth point',
            'Leave one connected and cut the other back to stop an earth loop forming',
            'Join the screens through and keep them off the box earth',
          ]}
          correctIndex={3}
          explanation="The screen has to be continuous along the whole run, so the two screens are joined through at the joint. Connecting them to the box earth adds a second earth point and can create the earth loop you were avoiding, and cutting either one back leaves part of the run unscreened."
        />

        <SectionRule />
        <ContentEyebrow>Segregation and BS 7671</ContentEyebrow>

        <ConceptBlock
          title="Segregate, or use a permitted method"
          plainEnglish="BS 7671 says signal circuits and mains circuits should not share the same wiring system unless one of a short list of methods is used. It does not give a separation distance."
          onSite="If someone quotes you a separation distance and says it is in BS 7671, ask to see the regulation. Distances for control and data cabling come from BS EN 50174-2, through the design."
        >
          <p>
            Most BMS signal and data wiring is extra-low voltage and falls in voltage Band I; mains
            wiring to plant is Band II. Regulation 528.1 is about safety: it stops a fault on a
            mains circuit from putting mains voltage onto conductors and terminals that people
            expect to be at extra-low voltage. Its rule is that Band I and Band II circuits are not
            contained in the same wiring system unless one of the specified methods is adopted.
          </p>
          <p>The permitted methods that come up on BMS jobs include:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>every cable or conductor insulated for the highest voltage present;</li>
            <li>
              in a multicore cable, every core insulated for the highest voltage present in the
              cable;
            </li>
            <li>
              cables in a separate compartment of a trunking or ducting system, or on cable tray
              with a partition between the bands;
            </li>
            <li>a separate conduit, trunking or ducting system for each band; or</li>
            <li>
              in a multicore cable, an earthed metal screen between the Band I and Band II cores,
              with a current-carrying capacity equivalent to the largest Band II core.
            </li>
          </ul>
          <p>
            Regulation 528.1 ends with one more sentence that matters on BMS work: for SELV and PELV
            circuits, Regulation 414.4 also applies. Most 24 V BMS field wiring is SELV or PELV, and
            Regulation 414.4.2 asks for protective separation between it and other circuits, not
            just basic insulation. So a 24 V pair sharing a cable, compartment or terminal block
            with 230 V needs checking against 414.4.2 as well as 528.1. And the 24 V has to come
            from a proper source: Regulation 414.3 lists a safety isolating transformer to BS EN
            61558-2-6 as one. An ordinary control transformer may not qualify, so check the label.
          </p>
          <p>
            Interference is a separate question from safety. Two cables can satisfy Regulation 528.1
            and still be close enough for one to put noise on the other. For that, Regulation
            444.4.10 requires BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for bonding
            networks) to be applied to control, signalling and communication circuits within a
            building. Separation distances between power cabling and control or data cabling are set
            out in BS EN 50174-2 and should reach you through the design and specification. If they
            have not, ask for them rather than making one up.
          </p>
          <p>
            Control wiring is also covered elsewhere in BS 7671. Section 557 deals with auxiliary
            circuits, which include control, signalling and measurement circuits, and the supply to
            each may be dependent on, or independent of, the main circuit according to its function.
            Section 1.6 covers what that means for isolation.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Regulation 528.1"
          clause="A Band I circuit is not to be contained in the same wiring system as a Band II circuit, and neither is to share a wiring system with a circuit above low voltage, unless one of the specified methods is adopted: for example insulation for the highest voltage present, a separate conduit, trunking or ducting system, or in a multicore cable an earthed metal screen between Band I and Band II cores of current-carrying capacity equivalent to the largest Band II core."
          meaning="Segregate BMS signal wiring from mains wiring, or use one of the permitted methods. The regulation sets no separation distance."
          cite="Paraphrased; verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <RegsCallout
          source="BS 7671:2018+A4:2026 Regulation 444.4.10"
          clause="BS EN 50174-1 and BS EN 50174-2 are to be applied for control, signalling and communication circuits within a building."
          meaning="Separation distances between power cabling and BMS control or data cabling come from BS EN 50174-2, applied through the design. Do not attribute a distance to BS 7671 itself."
          cite="Paraphrased; verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <InlineCheck
          id="bms-2-6-segregation"
          question="Two BMS sensor cables, insulated only for extra-low voltage, run in the same trunking as the three-phase supply to a pump. Which change would bring the arrangement in line with Regulation 528.1?"
          options={[
            'Moving the sensor cables to the far side of the same trunking',
            'Moving the sensor cables into their own separate trunking',
            'Changing the sensor cables to a screened type with a thin foil screen',
            'Fitting cable ties to hold the sensor cables away from the pump supply',
          ]}
          correctIndex={1}
          explanation="A separate trunking system for the Band I circuits is one of the methods Regulation 528.1 permits. Moving cables within the same trunking does nothing in BS 7671 terms, and a thin instrument screen is not the earthed metal screen the regulation describes for multicore cables."
        />

        <SectionRule />
        <ContentEyebrow>Cable and labelling</ContentEyebrow>

        <ConceptBlock
          title="Choosing the cable, terminating it and labelling it"
          plainEnglish="Use the cable the specification calls for, terminate it so it stays put, and label it so anyone can find both ends."
          onSite="If the specification does not say which cable to use for an analogue point or a network run, ask before you pull it. The controls manufacturer often specifies the cable for the network."
        >
          <p>
            BMS wiring uses a handful of cable types, and the specification or the controls
            manufacturer should tell you which goes where:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Analogue inputs and outputs</strong> (0–10 V, 4–20 mA, resistance sensors):
              screened twisted pair, either single pairs or multipair cables with an individual
              screen on each pair.
            </li>
            <li>
              <strong>Digital inputs and outputs</strong> (volt-free contacts, status, enable
              commands): multicore control cable, screened where the specification asks for it.
            </li>
            <li>
              <strong>Field bus and network cables</strong> (RS-485 for Modbus or BACnet MS/TP, KNX,
              Ethernet): the cable type the protocol and the manufacturer specify. These are covered
              in Module 5.
            </li>
            <li>
              <strong>Supplies</strong> to controllers, actuators and plant: ordinary power cables,
              sized and protected as any other circuit.
            </li>
          </ul>
          <p>
            Fire resistance, low smoke or other sheath requirements may apply depending on where the
            cable runs and what it serves. They come from the design; take them from the
            specification.
          </p>
          <p>
            Termination quality matters more on signal wiring than most people expect, because a
            slightly loose connection on a 4–20 mA loop or a 0–10 V pair shows up as a drifting or
            jumping reading rather than an obvious failure. Use ferrules where the terminals call
            for them, keep conductor insulation up to the terminal, and dress cables so the panel
            door does not pull on them.
          </p>
          <p>
            Labelling is what makes the installation maintainable. The standard pre-commissioning
            checks include the cable being the one specified, identified at both ends, with correct
            polarity, the correct input or output, secure termination, screen continuity and
            separation of mains and signal cables. Panel inspections look for numbered terminals,
            numbered cables and labelled equipment that match the drawings. Use the cable and point
            references from the points schedule so the identifier on the cable is the same one the
            controls engineer sees on the head end.
          </p>
          <p>
            Leave spare cores full length, identified and safely terminated, rather than cut back.
            They are the cheapest repair available when a core fails or a point is added later.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-6-labelling"
          question="Which cable identifier is most useful at the controller end of a sensor cable?"
          options={[
            'A colour band that matches the sensor’s manufacturer',
            'The date the cable was installed',
            'The points schedule reference, as at the device',
            'The name of the electrician who terminated it',
          ]}
          correctIndex={2}
          explanation="Using the points schedule reference at both ends ties the physical cable to the drawings and to the point on the head end, so anyone can trace a fault from either direction. Colours, dates and names do not tell the next person which point the cable serves."
        />

        <FAQ
          items={[
            {
              question: 'Is there a minimum distance between BMS cables and mains cables?',
              answer:
                'Not in Regulation 528.1. It requires Band I and Band II circuits to be segregated or to use a permitted method, such as separate containment or insulation for the highest voltage present. For control and communication cabling in buildings, Regulation 444.4.10 calls up BS EN 50174-1 and -2, and separation distances are found there. Take the figure from the design and specification, and query any distance attributed to BS 7671.',
            },
            {
              question: 'Which end of the screen should I earth?',
              answer:
                'The one the controls manufacturer’s instructions and the specification say. Signal screens are commonly earthed at one end only to avoid an earth loop, but which end varies between equipment ranges, so do not assume. Whatever the instruction, keep the screen continuous through joints and insulate the free end.',
            },
            {
              question: 'Can 0–10 V and 4–20 mA cables share a multipair cable?',
              answer:
                'Electrically they are both Band I signal circuits, so Regulation 528.1 does not stop them sharing. Whether the design allows it is a question for the specification and the controls engineer. Individually screened pairs keep the signals from coupling into each other.',
            },
            {
              question:
                'Why does a current loop sometimes read fine at low values but go wrong near the top of its range?',
              answer:
                'A loop-powered transmitter needs a minimum voltage across its terminals. As the current rises towards 20 mA, every resistance in the loop drops more voltage, leaving less for the transmitter. If the loop has too much resistance or too many devices in series, the transmitter runs short near the top of the scale. Tell the controls engineer, who can check the loop’s voltage budget.',
            },
            {
              question: 'Do I need screened cable for volt-free contact inputs?',
              answer:
                'Not always. Digital inputs are much less sensitive to noise than analogue ones, and plain multicore control cable is often specified for them. Follow the specification; if it says screened, use screened, and terminate the screen the same way as the analogue cables.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '0–10 V and 4–20 mA are straight-line scales. For 4–20 mA, percentage = (reading − 4) ÷ 16; 12 mA is 50%.',
            'A current loop is a series circuit, so the current, and the reading, are the same at both ends regardless of cable resistance. A voltage signal can be shifted by losses and pick-up along the cable.',
            '4–20 mA is live zero: a reading near 0 mA means an open loop. 0–10 V is dead zero: a broken wire reads 0 V and looks real.',
            'Route analogue cables away from power and drive cables, cross at right angles, and avoid long parallel runs.',
            'Twisting handles magnetic pick-up; the earthed screen handles electric-field pick-up. Terminate screens as the controls manufacturer instructs, commonly one end only, continuous through joints.',
            'Regulation 528.1: segregate Band I from Band II, or use a permitted method. Separation distances come from BS EN 50174-1 and -2 via Regulation 444.4.10.',
            'Identify every cable at both ends using the points schedule reference, and leave spare cores identified and full length.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-5"
          prevLabel="Controllers and I/O modules"
          nextHref="/study-centre/upskilling/bms-module-2-section-7"
          nextLabel="Motor control and the plant interface"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section6;
