/**
 * BMS Module 4 · Section 1 — Lighting control
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page takes an electrician from plain
 * switching, through 1–10 V analogue dimming, to DALI: what the bus does, the three kinds of
 * device on it, how to wire it (16 V typical bus, 250 mA ceiling across all bus power
 * supplies, 1.5 mm² recommended with 300 m between the two farthest devices, no closed loops,
 * polarity only at bus power supply terminals), addresses, groups and scenes, what DALI-2,
 * D4i and DALI+ add, how DALI monitors self-contained emergency lighting, and how a lighting
 * system hands information to the BMS. The old page carried an invented case study (energy,
 * satisfaction and service-call percentages), an unsourced 1–10 V control current, a blanket
 * "screened cable required, earthed at one end" rule and an unsourced 254-level dimming
 * figure. All of that is gone; every DALI figure now comes from a grepped source line.
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

const TITLE = 'Lighting control | BMS Module 4.1 | Elec-Mate';
const DESCRIPTION =
  'Switching, 1–10 V dimming and DALI for electricians: bus power, wiring limits, addresses, groups and scenes, DALI-2, D4i, emergency tests and links to the BMS.';

const outcomes = [
  'Explain the difference between switched, 1–10 V analogue and DALI digital lighting control, and what each can and cannot tell the BMS',
  'Wire a DALI bus correctly: bus power, total current, cable size, distance between the farthest devices, topology and polarity',
  'Describe the three kinds of DALI device and say why an input device on its own cannot change a light',
  'Use addresses, groups and scenes correctly when reading a lighting control schedule',
  'Say what DALI-2, D4i and DALI+ each add, and why D4i luminaires can overload a bus',
  'Explain how DALI runs and reports emergency lighting tests, and why the BMS is not the emergency lighting’s safety path',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Luminaires from two makers share one 1–10 V control pair. At the same control voltage, one make looks clearly brighter than the other. What is the likeliest reason?',
    options: [
      'The control pair needs changing to a screened cable',
      '1–10 V has no standard dimming curve between makers',
      'One make is taking its control voltage from the mains',
      'The controller output is overloaded by the second make',
    ],
    correctIndex: 1,
    explanation:
      'A 1–10 V controller sets a voltage, but each maker decides how its driver responds to it, so mixed fittings on one pair may not match. Screening the cable changes nothing about that, and an overloaded output would affect every fitting, not one make.',
  },
  {
    id: 2,
    question:
      'Twenty new DALI luminaires are installed and powered, the bus is wired, but every fitting sits at full brightness and the switches do nothing. What is the most likely gap?',
    options: [
      'There is no working application controller, or the bus is not powered',
      'The bus wires are crossed at some of the luminaire terminals',
      'The luminaires need a 1–10 V converter to dim',
      'The switches need to be wired straight to the drivers',
    ],
    correctIndex: 0,
    explanation:
      'Without an application controller nothing sends commands, so the drivers stay at full output. Without a bus power supply there is no communication at all. Crossed wires are not the answer because DALI control gear connections are not polarity sensitive, and switches on DALI are input devices that report to a controller rather than drive lights directly.',
  },
  {
    id: 3,
    question:
      'You are adding bus power supplies to a DALI line. What limit must the combined output of all of them stay within?',
    options: [
      '64 mA, one for each control gear address',
      '16 mA for each device connected',
      'There is no limit as long as the cable is 1.5 mm²',
      '250 mA in total',
    ],
    correctIndex: 3,
    explanation:
      'Added together, the bus power supplies on one bus must not be able to deliver more than 250 mA, and their guaranteed output must still cover what every device draws. There is no fixed allowance per device: each device’s bus current is in its product data. 64 is the number of control gear addresses, not a current, and cable size does not lift the limit.',
  },
  {
    id: 4,
    question:
      'A specification asks for screened data cable on a DALI bus “because it is a data bus”. What does the DALI cable recommendation actually call for?',
    options: [
      'Screened twisted pair, with the screen earthed at both ends',
      '1.5 mm² two-core, with the two bus wires adjacent',
      '0.5 mm² data cable, as long as the run is under 300 m',
      'Bell wire, because the bus only runs at about 16 V',
    ],
    correctIndex: 1,
    explanation:
      'The recommendation is 1.5 mm² two-core with the two wires adjacent, and screening is not part of it. The 300 m figure assumes 1.5 mm² cable. The bus is not SELV: in most control gear the DALI terminals have only basic insulation from the mains, so the pair is wired as mains, never in bell wire or data cable.',
  },
  {
    id: 5,
    question:
      'A mate suggests wiring the DALI bus as a ring, back to the controller, “so a broken cable doesn’t lose half the floor”. What do you tell him?',
    options: [
      'Good idea, a ring is the preferred DALI topology',
      'Fine, but only with 2.5 mm² cable',
      'No, a closed loop should not be used on a DALI bus',
      'Fine, as long as the bus power supply is at the far end',
    ],
    correctIndex: 2,
    explanation:
      'DALI wiring can be daisy-chained, star wired or a mix of the two, but a closed loop should not be used. The ring-final habit from power circuits does not carry over to a control bus.',
  },
  {
    id: 6,
    question: 'Which DALI terminals do you need to watch for polarity?',
    options: [
      'Only DA+ and DA− terminals on devices with a bus power supply',
      'Every terminal on every device, which is why they are colour coded',
      'Only the terminals on input devices such as push-buttons and sensors',
      'None at all, as no DALI device of any kind is polarity sensitive',
    ],
    correctIndex: 0,
    explanation:
      'DALI bus connections are not polarity sensitive, with one exception: devices containing a bus power supply, whose terminals are marked DA+ and DA−. “None” is tempting but misses that exception. Push-buttons and sensors can be wired either way round.',
  },
  {
    id: 7,
    question:
      'A commissioning sheet shows a twin-channel LED driver using two DALI addresses. Why?',
    options: [
      'It is an error, because every driver has exactly one address',
      'It has a built-in bus power supply, which takes its own address',
      'Twin-channel drivers must be split across two separate buses',
      'Each separately controlled output is its own logical unit',
    ],
    correctIndex: 3,
    explanation:
      'Some control gear can use more than one address. A driver with two independently controllable lamp outputs contains two logical units, each with its own address. That matters when you count against the 64 control gear addresses on one bus.',
  },
  {
    id: 8,
    question:
      'A new office uses D4i luminaires, each able to provide bus power, on one DALI line with a central controller that also supplies the bus. What should you check before energising?',
    options: [
      'That every luminaire’s bus supply is enabled, to give spare capacity',
      'That the built-in bus supplies are disabled where the design says',
      'That the bus cable is reduced to 1.0 mm² to limit current',
      'That the luminaires are wired as a closed loop to share the load',
    ],
    correctIndex: 1,
    explanation:
      'D4i luminaires can carry bus power supplies. Put several on a larger DALI system with them all enabled and the 250 mA maximum can be exceeded, so they are likely to need setting to disabled before installation. Check the design and the luminaire data.',
  },
  {
    id: 9,
    question:
      'The BMS shows a DALI emergency luminaire has failed its duration test. What has that test checked?',
    options: [
      'That the lamp lights when the mains is first switched on',
      'That the DALI address of the luminaire is unique',
      'That the battery can run the emergency lamp for its rated duration',
      'That the changeover relay has been wired the right way round',
    ],
    correctIndex: 2,
    explanation:
      'The duration test is the long test: it proves the battery can keep the emergency lamp lit for its full rated time without running flat early. The short function test is the one that checks the lamp, battery, circuit and changeover device work.',
  },
  {
    id: 10,
    question:
      'A client asks whether the BMS can be the thing that turns the emergency lighting on when the power fails. What is the right answer?',
    options: [
      'No, the luminaires change over by themselves; the BMS only watches',
      'Yes, the BMS sends the changeover command over the DALI gateway',
      'Yes, as long as the BMS outstation has its own battery back-up',
      'No, because DALI cannot carry emergency lighting information',
    ],
    correctIndex: 0,
    explanation:
      'Self-contained emergency luminaires change over automatically when their normal supply is lost. DALI can run and report their tests, and the BMS can see that status, but the life-safety action does not depend on either. The last option is wrong because DALI has a dedicated part for emergency control gear.',
  },
];

const BMSModule4Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 1"
        title="Lighting control"
        backTo="/study-centre/upskilling/bms-module-4"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How lighting is switched and dimmed in commercial buildings, how a DALI bus is wired and
          organised, and what the lighting system can tell the BMS.
        </p>

        <TLDR
          points={[
            'There are three common levels of lighting control: switching circuits on and off, 1–10 V analogue dimming of groups, and DALI, a digital two-way bus that addresses each driver.',
            '1–10 V sends a level out and gets nothing back. DALI can query each driver for its level and for faults, which is what makes per-fitting reporting to the BMS possible.',
            'A DALI bus needs power: typically about 16 V, with the combined output of every bus power supply no more than 250 mA. With 1.5 mm² cable, keep the two farthest devices within 300 m. No closed loops.',
            'One bus has 64 addresses for control gear and 64 for control devices. Groups and scenes are set up at commissioning, not by how you wire it.',
            'DALI can run and log emergency lighting tests, but self-contained emergency luminaires change over on their own. The BMS watches; it is not the safety path.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Three levels of control</ContentEyebrow>

        <ConceptBlock
          title="Switching: the BMS turns circuits on and off"
          plainEnglish="The simplest lighting control is a relay or contactor switching a lighting circuit, with the BMS deciding when."
          onSite="When a BMS output switches lighting, it is usually driving the coil of a contactor or interposing relay. The lighting circuit itself is on the contacts, fed from the distribution board. Isolate both before you work on it."
        >
          <p>
            Plenty of commercial lighting is still controlled by switching whole circuits. Car
            parks, plant rooms, external lighting, warehouse bays and corridors are often run this
            way: a time schedule in the BMS, a photocell or a lighting controller energises a
            contactor, and every luminaire on that circuit comes on together.
          </p>
          <p>
            For the BMS this is two points. A <strong>digital output</strong> commands the
            contactor, and ideally a <strong>digital input</strong> from an auxiliary contact proves
            the contactor actually pulled in. Without that feedback the BMS only knows what it asked
            for, not what happened. A stuck contactor or a tripped MCB looks exactly the same as
            lights that are on.
          </p>
          <p>
            Switching is cheap, robust and easy to fault-find. What it cannot do is dim, control one
            fitting on its own, or tell anyone that a single luminaire has failed. Those are the
            reasons the next two methods exist.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="1–10 V: an analogue level for a group of drivers"
          plainEnglish="A pair of control wires carries a DC voltage to the drivers. Change the voltage and the light level follows. Everything on that pair does the same thing."
          onSite="1–10 V drivers are wired with a control pair as well as their supply. Check the driver data for which terminals are which and how the driver is meant to be switched off, because dimming and switching are often handled separately."
        >
          <p>
            Before digital lighting control was common, dimming meant an analogue signal. A
            controller sets a DC voltage on a two-wire control pair, and every driver connected to
            that pair adjusts its output to match. The name tells you the signal range.
          </p>
          <p>The limits are what matter when a BMS is involved:</p>
          <ul>
            <li>
              <strong>One direction only.</strong> The signal goes from the controller to the
              drivers. Nothing comes back, so no driver can report its level, a lamp failure or its
              energy use.
            </li>
            <li>
              <strong>No addressing.</strong> Every driver on a control pair gets the same signal.
              If you want two areas to dim independently, you need two control pairs and two
              outputs, wired that way from the start.
            </li>
            <li>
              <strong>No standard dimming curve.</strong> Drivers from different makers can respond
              differently to the same voltage, so mixed fittings on one pair may not match.
            </li>
            <li>
              <strong>Rewiring to rezone.</strong> Changing which fittings dim together means moving
              cables, because the grouping is in the wiring.
            </li>
          </ul>
          <p>
            Be careful connecting a BMS analogue output. On most 1–10 V systems the drivers supply
            the control current and the controller sinks it, so a 0–10 V output that expects to
            drive a load may not work, and each controller output can only handle a limited number
            of drivers. Check both data sheets, or use an interface module made for the job.
          </p>
          <p>
            None of that makes 1–10 V wrong. For a warehouse aisle or a sports hall dimmed as one
            block, it does the job. It simply stops at &ldquo;set this group to this level&rdquo;.
            DALI does have a device type for converting its commands to a 1–10 V output, which is
            how existing analogue fittings are sometimes brought under a DALI controller.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="DALI: a digital bus that talks both ways"
          plainEnglish="Every driver on a DALI bus has its own address. The controller can tell any one of them, a group or all of them what to do, and ask each one how it is."
          onSite="DALI is a protocol, not a brand. It is based on the international standard IEC 62386, and products from different makers are meant to share one bus. Certification is what makes that work in practice."
        >
          <p>
            DALI stands for Digital Addressable Lighting Interface. It is a two-way digital protocol
            carried on a two-wire bus. The same pair carries the data and also powers some
            low-consumption devices, such as push-buttons and sensors.
          </p>
          <p>Commands on the bus fall into three kinds:</p>
          <ul>
            <li>
              <strong>Control:</strong> go to a level, fade over a set time, recall a scene, switch
              off.
            </li>
            <li>
              <strong>Configuration:</strong> change a fade time, the level stored in a scene, or
              which group a device belongs to.
            </li>
            <li>
              <strong>Query:</strong> ask a driver its current level, or whether its lamp has
              failed.
            </li>
          </ul>
          <p>
            A command can go to one address, to a group, or be broadcast to everything on the bus.
            The query commands are the important difference from 1–10 V: they are how a lighting
            system finds out, fitting by fitting, what is actually happening, and that is what it
            can pass up to the BMS.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-1-feedback"
          question="Which control method lets the lighting system ask an individual driver whether its lamp has failed?"
          options={[
            'Switching the circuit with a contactor and an auxiliary contact',
            '1–10 V dimming with a screened control pair',
            'DALI, using a query command to that driver’s address',
            'Any of them, provided the BMS has a spare digital input',
          ]}
          correctIndex={2}
          explanation="Only DALI addresses individual drivers and lets the controller query them. An auxiliary contact proves a contactor operated, not that every lamp on the circuit works. 1–10 V carries a level out and nothing back, whatever the cable."
        />

        <SectionRule />
        <ContentEyebrow>What is on a DALI bus</ContentEyebrow>

        <ConceptBlock
          title="Three kinds of device, and why the controller matters"
          plainEnglish="A bus power supply makes the bus work. Control gear (drivers) makes the light. Control devices decide what the light should do, or report what is going on."
          onSite="If a new DALI install leaves every fitting at full brightness, look for the application controller and the bus power first. Drivers with nothing telling them what to do just run flat out."
        >
          <p>
            The DALI standard describes three basic kinds of device. One physical product can
            combine more than one of them.
          </p>
          <ul>
            <li>
              <strong>Bus power supply.</strong> The bus has to be powered before anything can
              communicate. It can be a separate module, or built into a controller or a driver.
            </li>
            <li>
              <strong>Control gear.</strong> The devices that power the lamps, most commonly LED
              drivers. They take the mains supply and produce the regulated output for the LEDs, and
              they respond to commands on the bus.
            </li>
            <li>
              <strong>Control devices.</strong> These split into{' '}
              <strong>application controllers</strong>, the part that makes decisions and sends
              commands, and <strong>input devices</strong> such as push-buttons, occupancy sensors,
              light sensors, sliders and rotary controls.
            </li>
          </ul>
          <p>
            The point electricians most often miss is that an input device cannot change a light on
            its own. A DALI push-button or sensor sends an event or a measurement onto the bus; an
            application controller reads it and decides what the drivers should do. Some products
            combine the two, but if there is no controller logic anywhere on the bus, nothing
            happens when the button is pressed, and the luminaires sit at full output.
          </p>
          <p>
            One input device product can contain several &ldquo;instances&rdquo; under a single
            address, for example an occupancy sensor and a bank of push-buttons in one plate.
          </p>
        </ConceptBlock>

        <Scenario
          title="Lights on full, switches dead"
          situation={
            <>
              A small refit of a meeting suite: new DALI luminaires, new DALI push-button plates,
              bus cable run and terminated. The fittings come on at full brightness at power-up and
              none of the buttons does anything. The site manager wants the drivers swapped.
            </>
          }
          whatToDo={
            <>
              Check the basics before any parts are changed. Is there a bus power supply, and is it
              on? Measure the bus at a device: with no communication you would expect it to be
              around 16 V, though it varies. Then find the application controller. On this job the
              controller was on the lighting package drawing but had not been delivered, so the
              buttons were sending events that nothing acted on. Once the controller was fitted and
              the controls engineer had addressed and grouped the devices, it all worked.
            </>
          }
          whyItMatters={
            <>
              On switched lighting a switch breaks a circuit. On DALI, a button only reports that it
              was pressed. Faulting a DALI system like a switched one leads to good drivers being
              thrown away.
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Wiring the bus</ContentEyebrow>

        <ConceptBlock
          title="Bus power and current: one ceiling for the whole bus"
          plainEnglish="The bus runs at roughly 16 V. All the bus power supplies on one bus added together must not give more than 250 mA, and they must give enough for everything connected."
          onSite="Add up the bus supplies before you energise, including any built into controllers or luminaires. Two supplies that each look fine on their own can break the limit together."
        >
          <p>
            With no messages on it, the bus normally sits at about 16 V, but it can sit well above
            or below that, so do not treat 16 V as a pass/fail figure. The bus power supplies
            connected to it provide current both for communication and for the small devices that
            draw their power from the bus.
          </p>
          <p>Two rules follow from that:</p>
          <ul>
            <li>
              <strong>Enough.</strong> The guaranteed output of all the bus power supplies must
              cover the bus current drawn by every device on it. Each device&rsquo;s consumption is
              in its product data.
            </li>
            <li>
              <strong>Not too much.</strong> The combined maximum output of all the bus power
              supplies must not exceed 250 mA. That is the maximum a DALI system allows.
            </li>
          </ul>
          <p>
            That second rule is where problems come from, because bus power supplies hide inside
            other products. Controllers, some drivers and many D4i luminaires can all contain one.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Cable, distance, topology and polarity"
          plainEnglish="Use 1.5 mm² two-core and keep the two farthest devices within 300 m. Daisy-chain or star, never a ring. Only bus power supply terminals care which way round."
          onSite="Run the two bus conductors together, adjacent in the same cable. Do not take one core out on one route and bring the other back another way."
        >
          <p>
            The recommended cable is 1.5 mm² two-core. With that size and the full 250 mA bus
            supply, the distance between the <strong>two devices that are farthest apart</strong> on
            the bus should be no more than 300 m. The two bus wires should be adjacent.
          </p>
          <p>
            That rule is about the farthest pair, not total cable. Put the controller and the bus
            power supply in the middle of a star, with each branch running 100 m out, and any two
            devices are at most 200 m apart, even though the total cable is well over 300 m. Take
            that idea too far, though, and other effects such as cable capacitance start to cause
            trouble. Where that happens depends on the cable, but it is likely to be well beyond 300
            m of total cable.
          </p>
          <p>
            <strong>Topology.</strong> Daisy-chain, star, or a mix of the two are all fine. A{' '}
            <strong>closed loop</strong> should not be used.
          </p>
          <p>
            <strong>Polarity.</strong> DALI bus connections are not polarity sensitive, so on
            drivers, sensors and push-buttons either core can go to either terminal. The exception
            is any device containing a <strong>bus power supply</strong>, where the terminals are
            marked DA+ and DA−. Get those the right way round.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Wiring the DALI bus as a ring"
          whatHappens={
            <>
              Electricians used to ring finals bring the bus back to where it started, thinking it
              gives a second path if a cable is damaged. On DALI a closed loop is not a permitted
              topology, and the system may not communicate reliably.
            </>
          }
          doInstead={
            <>
              Daisy-chain, star, or a mix of the two, ending at the last device. If resilience
              matters, raise it with the designer; do not improvise it in the cable route.
            </>
          }
        />

        <ConceptBlock
          title="The bus and the rest of the installation"
          plainEnglish="The DALI bus runs at about 16 V, but it is not SELV. Treat the pair as part of the mains wiring: mains-rated cable and terminals, and included when you isolate and insulation test."
          onSite="Do not assume the bus is dead because the lighting circuit is off. The bus power supply may be fed from a different circuit, so prove the DALI pair dead as well before you work on it."
        >
          <p>
            On site, the DALI pair usually follows the lighting supply from luminaire to luminaire.
            Although the bus runs at about 16 V, in most control gear the DALI terminals have only
            basic insulation from the mains, so the bus is not SELV. It is treated as if it were at
            mains voltage: cable and terminals rated for the mains. That is why it may run beside
            the mains supply, and is so often run as two extra cores in a five-core mains cable.
            Check the driver and controller data, and follow the design. Do not run DALI in data or
            alarm cable alongside mains because it &ldquo;is only 16 V&rdquo;. Many 1–10 V drivers
            give their control terminals the same basic-only insulation.
          </p>
          <p>
            The same goes for isolation. Switching off the lighting circuit does not necessarily
            make the DALI bus dead, because the bus power supply can be fed separately, and a fault
            can put mains potential on a DALI core. Isolate and prove both before you work on
            either. Before insulation testing, disconnect or protect the drivers, controllers and
            other electronic devices on the circuit.
          </p>
          <p>
            Two parts of BS 7671 frame the wider question of control wiring. Section 557 covers
            auxiliary circuits, which includes control and signalling circuits like a lighting
            control bus. Regulation 528.1 governs when circuits of different voltage bands may share
            a wiring system.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1"
          meaning="Band I and Band II circuits are not to be contained in the same wiring system unless one of the specified methods is adopted, such as insulating every conductor for the highest voltage present, a separate conduit, trunking or ducting system, or, in a multicore cable, an earthed metal screen between the Band I and Band II cores. It is segregate, or use a permitted method; not an absolute ban, and not a distance. For emergency lighting and other safety services, the note to Regulation 528.1 points to BS 5266 and BS 5839 among the codes that give recommendations for separation and segregation."
          cite="Regulation 528.1"
        />

        <InlineCheck
          id="bms-4-1-distance"
          question="A DALI controller and bus supply sit in a riser cupboard. Three branches of 1.5 mm² cable run out from it, each 120 m long. Is the 300 m distance rule met?"
          options={[
            'No, because the total cable is 360 m',
            'Yes, because no two devices are more than 240 m apart',
            'No, because a star layout is not permitted',
            'Yes, because the rule only applies to daisy chains',
          ]}
          correctIndex={1}
          explanation="The 300 m rule is about the two farthest-apart devices. The worst case is the far end of one branch to the far end of another: 120 m plus 120 m is 240 m. Total cable can exceed 300 m, and star wiring is allowed. Very large totals bring cable capacitance into play, so check the design if the layout is extreme."
        />

        <SectionRule />
        <ContentEyebrow>Addresses, groups and scenes</ContentEyebrow>

        <ConceptBlock
          title="How a DALI system is organised"
          plainEnglish="Each device gets an address. Addresses are put into groups that match how the space is used. Scenes store a level in each driver so one command sets a whole room."
          onSite="You do not wire groups. Commissioning software or the controller assigns the addresses and builds the groups. What you can do is record where each luminaire is, so the person commissioning can match addresses to positions."
        >
          <p>On one DALI bus:</p>
          <ul>
            <li>
              <strong>Addresses.</strong> 64 for control gear and another 64 for control devices,
              128 in total. Some control gear uses more than one address: a driver with two lamp
              outputs that can be controlled separately counts as two logical units, and each takes
              its own address.
            </li>
            <li>
              <strong>Groups.</strong> Control gear has 16 groups, and any driver can be in any
              combination of them. Control devices have their own set of groups.
            </li>
            <li>
              <strong>Scenes.</strong> Each driver stores 16 scenes. A scene holds a level, or is
              set to &ldquo;ignore&rdquo;, so one scene command can send every fitting in a room to
              its own preset level while leaving others untouched.
            </li>
          </ul>
          <p>
            Addresses can be assigned automatically by commissioning software or by some
            controllers. The address a driver ends up with has nothing to do with where it sits in
            the cable run, which is why a marked-up layout showing each luminaire&rsquo;s position
            is so useful at commissioning.
          </p>
          <p>
            Rezoning is where DALI earns its keep. When a partition moves, the groups are changed in
            software. On a 1–10 V system the same change means new control cables.
          </p>
        </ConceptBlock>

        <Pullquote>
          On DALI the grouping lives in the software, not in the cable. That is what lets a floor be
          rezoned without anyone lifting a ceiling tile.
        </Pullquote>

        <InlineCheck
          id="bms-4-1-addresses"
          question="An open-plan floor has 70 single-channel DALI drivers. The designer has drawn them all on one bus. What is wrong?"
          options={[
            'Nothing, because a DALI bus has 128 addresses',
            'Nothing, provided the groups are kept to 16',
            'It needs a 1–10 V converter for the extra six',
            'One bus has 64 control gear addresses, so it needs splitting',
          ]}
          correctIndex={3}
          explanation="The 128 is 64 addresses for control gear plus 64 for control devices; drivers can only use the control gear 64. Seventy single-channel drivers need more than one bus. Groups are a separate limit and do not create extra addresses."
        />

        <SectionRule />
        <ContentEyebrow>DALI-2, D4i and DALI+</ContentEyebrow>

        <ConceptBlock
          title="What the newer names mean"
          plainEnglish="DALI-2 is the current certified version and makes mixed brands work together. D4i is DALI inside the luminaire, with data. DALI+ carries DALI commands over wireless and IP networks."
          onSite="On a specification, look for products carrying the DALI-2, D4i or DALI+ logo. Certified products are listed publicly, which is the quickest way to check something will work with the rest of the bus."
        >
          <p>
            <strong>DALI-2</strong> is the current version of the protocol plus a certification
            scheme for products, which started in 2017. The standard was rewritten to be tighter and
            drivers are tested much more thoroughly, so interoperability between brands is better.
            The big change for site work is that control devices are now specified too. Under the
            first version of DALI, controllers, sensors and buttons were proprietary, so they
            generally had to come from one manufacturer. DALI-2 sets requirements for application
            controllers and input devices so different makers can share one bus.
          </p>
          <p>
            <strong>D4i</strong> is DALI inside a luminaire. It makes sure power is available for a
            sensor or wireless node attached to or built into the fitting, and the D4i driver stores
            and reports data in a standard way: luminaire information, energy use and diagnostics
            such as failure conditions and running data. Those data features are defined in their
            own parts of the standard (Part 251 luminaire data, Part 252 energy reporting, Part 253
            diagnostics and maintenance).
          </p>
          <p>
            D4i luminaires can sit on a larger DALI system, but watch the bus power. Many carry a
            bus power supply, and with all of them active the 250 mA maximum can be exceeded. They
            are likely to need their bus supplies set to disabled before installation.
          </p>
          <p>
            <strong>DALI+</strong> keeps the DALI-2 command set but carries it over wireless and
            IP-based networks instead of the two-wire bus. Separately, a nominal 24 V auxiliary
            (AUX) supply is defined for control devices that have no mains supply of their own and
            cannot be powered from the bus, such as a wireless node on a luminaire. AUX supplies are
            not DALI devices and do not connect to the bus.
          </p>
        </ConceptBlock>

        <Scenario
          title="The bus that worked until the last floor was added"
          situation={
            <>
              A fit-out uses D4i luminaires with a central DALI controller that also powers the bus.
              The first rooms commissioned fine. As more luminaires were connected, communication
              became erratic and devices started dropping off.
            </>
          }
          whatToDo={
            <>
              Count the bus power supplies, not just the controller. The luminaire data showed each
              one had an integrated bus supply, and they had been left enabled. Together with the
              controller&rsquo;s supply, the total was well past the 250 mA maximum. The lighting
              engineer set the luminaire supplies to disabled and the bus settled.
            </>
          }
          whyItMatters={
            <>
              Bus power can come from devices you would not think of as power supplies. Checking the
              total before energising is quicker than chasing intermittent faults across a whole
              floor afterwards.
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Emergency lighting on DALI</ContentEyebrow>

        <ConceptBlock
          title="Testing and reporting emergency luminaires"
          plainEnglish="DALI emergency drivers can run their own tests and report the results, so failed batteries and lamps show up on a screen instead of on a clipboard walk-round."
          onSite="The emergency luminaire still changes over on its own when its normal supply fails. DALI and the BMS see what happened; they are not what makes it happen."
        >
          <p>
            A self-contained emergency luminaire carries its own battery and emergency driver, built
            in or fitted alongside, and turns its emergency lamp on by itself when the normal supply
            is lost. DALI has a dedicated part for this control gear (Part 202), which defines two
            tests that can be started by a command or run automatically:
          </p>
          <ul>
            <li>
              <strong>Function test:</strong> a short test, typically under a minute, checking the
              emergency lamp, battery, circuit and changeover.
            </li>
            <li>
              <strong>Duration test:</strong> a longer test, typically one to three hours, checking
              the battery can run the lamp for its rated duration without discharging early.
            </li>
          </ul>
          <p>
            DALI changes how the tests are run and recorded, not what testing is needed. The testing
            regime is set by BS 5266-1, the code of practice for emergency lighting. After a
            duration test the battery is flat until it recharges, so the tests must be staggered,
            for example alternate luminaires on different days, and never run on every luminaire on
            an escape route at once. Otherwise that route has no emergency lighting until the
            batteries recover. Schedule them for when the building is least occupied.
          </p>
          <p>
            Faults and test results are reported to the system, which can pass them on to the BMS or
            a monitoring screen. The modes worth knowing on site:
          </p>
          <ul>
            <li>
              <strong>Inhibit:</strong> mains is on and an inhibit command or input has been
              received. If the mains then fails, the luminaire goes to rest mode instead of
              emergency mode. An inhibit sent as a DALI command times out after a period and the
              luminaire returns to normal; an inhibit held by a hardwired input, or re-sent over and
              over by a controller, stays in force.
            </li>
            <li>
              <strong>Rest:</strong> mains is off and the emergency lamp is off, because the battery
              is discharged, a rest command was sent, or the mains failed while inhibited.
            </li>
            <li>
              <strong>Extended emergency:</strong> after mains returns, the emergency lighting stays
              at emergency level for a set time before going back to normal.
            </li>
          </ul>
          <p>
            Emergency control gear comes in types. Maintained types can also be used as general
            lighting: one type can be dimmed over DALI, another only switched. Other types stay on
            whenever mains is present, or stay off until the mains fails. Centrally supplied
            emergency lighting is covered by a separate part of the standard.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving emergency luminaires inhibited, or forgetting what inhibit does"
          whatHappens={
            <>
              Inhibit is useful when supplies are being switched on and off during a fit-out,
              because it stops the batteries being run down. A single inhibit command over DALI
              times out on its own, but a hardwired inhibit input that is left switched, or a
              controller that keeps re-sending the command, holds it in place. Then a real mains
              failure sends the luminaire to rest instead of lighting the escape route.
            </>
          }
          doInstead={
            <>
              Treat inhibit as a temporary state that someone owns. Agree when it is applied and
              removed, record it, and confirm at handover that no hardwired inhibit input is still
              made and no controller is still sending the command, so no emergency luminaire is
              still inhibited.
            </>
          }
        />

        <InlineCheck
          id="bms-4-1-emergency"
          question="A DALI emergency luminaire is in inhibit mode and the mains supply to it fails. What does it do?"
          options={[
            'Goes into emergency mode as normal',
            'Goes into rest mode, with the emergency lamp off',
            'Starts a duration test',
            'Goes into extended emergency mode',
          ]}
          correctIndex={1}
          explanation="That is what inhibit is for: with inhibit received, a mains failure sends the luminaire to rest mode instead of emergency mode. A DALI inhibit command times out after a period, but a hardwired or repeatedly re-sent inhibit does not, which is why it has to be removed before the building is occupied."
        />

        <SectionRule />
        <ContentEyebrow>Lighting and the BMS</ContentEyebrow>

        <ConceptBlock
          title="What the BMS gets from the lighting system"
          plainEnglish="The lighting controller runs the lights. The BMS usually sits above it, sending schedules and modes and collecting status, faults and energy data."
          onSite="Find out early whether the lighting controller connects to the BMS and who provides that link. It is usually the lighting or controls specialist, but the network connection and its power may be on your drawings."
        >
          <p>
            In most buildings the lighting system has its own controllers that handle the fast,
            local decisions: a button press, a sensor seeing someone walk in, a daylight level
            changing. Those need to happen immediately and should not depend on the BMS network.
          </p>
          <p>
            The BMS connects through an application controller that has the right integration
            features, often called a gateway. Through it the BMS can typically:
          </p>
          <ul>
            <li>
              <strong>Send</strong> time schedules, building modes such as occupied, unoccupied or
              cleaning, and overrides for events.
            </li>
            <li>
              <strong>Read</strong> lamp and driver faults, the status of emergency luminaires and
              their test results.
            </li>
            <li>
              <strong>Log</strong> energy data from drivers that report it, including real power
              used, broken down far more finely than a circuit meter allows.
            </li>
          </ul>
          <p>
            How much of that is available depends on the products specified. Fault and energy
            reporting need drivers and controllers that support them, which is why the specification
            should name the DALI parts required. A 1–10 V or switched system offers none of the
            per-fitting information, however good the BMS above it.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can I mix drivers from different manufacturers on one DALI bus?',
              answer:
                'That is what DALI-2 certification is for. Certified control gear and control devices are tested to work together, and the certified products are publicly listed. With older first-version DALI, controllers and input devices were proprietary, so expect them to have to come from one maker. Check the logo and the listing rather than assuming.',
            },
            {
              question: 'Does the DALI pair need screened cable?',
              answer:
                'The recommendation is 1.5 mm² two-core with the two wires adjacent; screening is not part of it. DALI is not SELV: in most drivers the DALI terminals have only basic insulation from the mains, so the pair is treated as part of the mains wiring, which is why it is often run in the same five-core cable as the supply. Follow the driver data and the design.',
            },
            {
              question: 'How many luminaires can go on one DALI bus?',
              answer:
                'There are 64 control gear addresses. A single-channel driver uses one; a driver with two separately controllable outputs uses two. The bus current also has to stay within what the bus supplies can give, capped at 250 mA in total. Large floors are split across several buses.',
            },
            {
              question: 'Does a DALI emergency system replace routine emergency lighting testing?',
              answer:
                'No. The testing regime is set by BS 5266-1, the code of practice for emergency lighting, and DALI only changes how the tests are run and recorded. Someone still has to act on every failure it reports. Watch the duration tests in particular: after one, the batteries are flat until they recharge, so a system that tests every luminaire on an escape route at once leaves that route without emergency lighting. Stagger the tests, for example alternate luminaires on different days, and schedule them for when the building is least occupied.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Switching is circuit-level on/off. Add an auxiliary contact input if the BMS needs to know the contactor actually operated.',
            '1–10 V sets a level for everything on a control pair and gets nothing back. No addresses, no fault reports, grouping fixed by the wiring.',
            'DALI is a two-way digital bus: control, configuration and query commands to an address, a group or everyone.',
            'Bus power: typically around 16 V, combined bus supply output no more than 250 mA, and enough for every device. Watch for supplies built into controllers and D4i luminaires.',
            '1.5 mm² cable recommended, two farthest devices within 300 m, daisy-chain or star, no closed loops, polarity only at DA+/DA− on bus power supplies. DALI is not SELV: wire, isolate and test the pair as part of the mains.',
            '64 control gear and 64 control device addresses per bus, 16 groups and 16 scenes for control gear. Groups are set in software at commissioning.',
            'DALI emergency gear runs and reports the tests BS 5266-1 calls for, but the luminaire changes over by itself. Stagger duration tests so no escape route is left unlit while batteries recharge. The BMS monitors; it is not the safety path.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-4"
          prevLabel="Module 4: Lighting, access, blinds and metering"
          nextHref="/study-centre/upskilling/bms-module-4-section-2"
          nextLabel="Daylight and presence detection"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule4Section1;
