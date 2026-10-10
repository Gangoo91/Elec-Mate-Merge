/**
 * BMS Module 2 · Section 5 — Controllers and I/O modules
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches what a BMS outstation is and why
 * it carries on running when the network drops, the family of controllers an electrician
 * meets (plant outstations, unitary controllers, stand-alone controllers), how the four point
 * types land on the terminals, universal inputs and the configuration that has to match the
 * wiring, scaling, expanding a controller that has run out of points, powering the controller
 * and its field devices (with Section 557 at the level this page needs), local displays and
 * overrides, and the checks an electrician makes before handing a panel over. The old page
 * listed module types with invented channel counts, relay ratings and converter resolutions,
 * told a "fraction of the cost" case study and offered no power-failure or configuration
 * teaching; all of that is gone.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Controllers and I/O modules | BMS Module 2.5 | Elec-Mate';
const DESCRIPTION =
  'BMS outstations, unitary controllers and I/O modules: how points land on terminals, universal inputs, scaling, expansion, power supplies and power failure.';

const outcomes = [
  'Explain what an outstation is, and why it keeps controlling plant when the network to the head end is lost',
  'Tell a plant outstation, a unitary controller and a stand-alone controller apart, and say how each is switched and supervised',
  'Match each point type (DI, DO, AI, AO, pulse) to the terminals and the input or output setting it needs',
  'Explain why a universal input must be configured to suit what is wired to it, and how scaling turns a signal into a reading',
  'Describe the three ways to add points to a controller that is full, and why spare I/O is planned at design',
  'Check a controller’s supply, battery backup and restart behaviour, and recognise when its supply is dependent on the plant it controls',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'One outstation in a building with several fails completely. What does distributed control mean for the rest of the plant?',
    options: [
      'Only the plant wired to that outstation is affected',
      'All plant stops until the failed outstation is replaced',
      'The head end takes over control of the failed plant',
      'The nearest outstation picks up its inputs and outputs',
    ],
    correctIndex: 0,
    explanation:
      'Each outstation runs its own plant, so a failed outstation affects only the plant wired to it. The head end does not run plant, and a neighbouring outstation cannot read inputs that are not wired to its terminals.',
  },
  {
    id: 2,
    question:
      'On a points schedule, a fan coil unit is shown with its own small networked controller. What is that controller called?',
    options: [
      'A unitary controller, dedicated to one item of plant',
      'A stand-alone controller, with no network connection',
      'The head end, because it is closest to the occupant',
      'An expansion module, because it adds points to the plant room',
    ],
    correctIndex: 0,
    explanation:
      'A unitary controller is a small outstation dedicated to a single item of plant, such as a fan coil unit, and it sits on the communications network. A stand-alone controller is the opposite case: it has no network connection and is usually enabled by a digital output from an outstation.',
  },
  {
    id: 3,
    question:
      'A 4–20 mA duct pressure sensor is wired to a universal input. The head end shows a fixed, nonsensical value. The wiring tests correct. What is the most likely cause?',
    options: [
      'The sensor needs a screened cable and the screen is missing',
      'Universal inputs cannot accept current signals at all',
      'The head end’s graphics have not been refreshed',
      'The input is still configured for a different signal type',
    ],
    correctIndex: 3,
    explanation:
      'A universal input does whatever its configuration tells it to. Left set for voltage or resistance, a current signal will not be read correctly, however good the wiring is. Check the input type in the strategy and any hardware link or switch the manufacturer uses. Screening matters for noise, but it does not produce a fixed, wrong value.',
  },
  {
    id: 4,
    question: 'Why is spare I/O planned into controllers at design stage?',
    options: [
      'So that faulty channels can be swapped without a points schedule',
      'So points can be added later on the same controller',
      'Because a controller must never run with every channel in use',
      'Because unused channels reduce the load on the panel supply',
    ],
    correctIndex: 1,
    explanation:
      'Spare channels mean an extra sensor or command can be added later on the existing controller. Without them, any addition means an expansion module, another outstation or a larger one. Running with every channel used is not forbidden; it simply leaves no headroom.',
  },
  {
    id: 5,
    question:
      'A plant room outstation is full and cannot take expansion modules. The client wants it replaced with a larger one. What should you expect?',
    options: [
      'The new unit loads the old strategy by itself',
      'The strategy moved across, usually with a shutdown',
      'The head end runs the plant while it is swapped',
      'A new points schedule but no change to the strategy',
    ],
    correctIndex: 1,
    explanation:
      'Replacing an outstation means the controls engineer moves the strategy across to the new unit, which usually needs a plant shutdown. A controller does not import a strategy by itself, the head end does not run plant, and the strategy has to be loaded and checked whatever happens to the schedule.',
  },
  {
    id: 6,
    question:
      'After a planned shutdown, an outstation restarts with the wrong time and its schedules have gone. What does this point to?',
    options: [
      'A fault on the network cable to the head end',
      'A flat or failed standby battery in the outstation',
      'A universal input configured for the wrong signal',
      'An override left on at the local display',
    ],
    correctIndex: 1,
    explanation:
      'The standby battery is what holds the clock, the configuration and logged data while mains is off. A controller that comes back with the wrong time and missing settings has lost them during the outage. Battery operation and automatic restart after mains returns are both routine maintenance checks.',
  },
  {
    id: 7,
    question:
      'An outstation is fed from the control circuit inside an air handling unit’s starter panel. What follows from that?',
    options: [
      'Isolating the AHU also isolates the outstation',
      'The outstation will keep running on mains when the AHU is isolated',
      'The outstation has become part of the fire alarm system',
      'The outstation no longer needs a standby battery',
    ],
    correctIndex: 0,
    explanation:
      'Its supply is dependent on that panel, so isolating the AHU also takes out the outstation and any other plant it controls or monitors. Section 557 lets the designer choose a dependent or an independent supply according to function. The point is that the choice is deliberate, and that whoever isolates knows about it.',
  },
  {
    id: 8,
    question:
      'A replacement valve actuator is labelled for a 24 V AC supply and a 0–10 V DC control signal. What must you confirm before connecting it?',
    options: [
      'Only the signal, because every BMS panel provides 24 V AC',
      'Only the supply, because the signal is set in software',
      'That the controller can provide a 4–20 mA output instead',
      'Both the supply voltage and the signal type, separately',
    ],
    correctIndex: 3,
    explanation:
      'Actuators come in mains and 24 V AC versions and in 2-position, 3-position and 0–10 V signal versions. Supply and signal are two separate questions. A 24 V actuator on a mains supply is damaged, and a modulating actuator on an on/off output will never hold a mid position.',
  },
  {
    id: 9,
    question:
      'At handover, the head end shows a supply fan running at a fixed speed whatever the duct pressure does. The loop tuning looks fine. What should you check?',
    options: [
      'Whether the duct pressure sensor is fitted upside down',
      'Whether an override has been left on',
      'Whether the outstation is a unitary controller',
      'Whether the network to the head end is a twisted pair',
    ],
    correctIndex: 1,
    explanation:
      'A point held in override ignores the control loop entirely. Overrides set during commissioning, at the local display or the head end, and never released are a common reason plant looks stuck. Checking that every override is released is part of handover.',
  },
  {
    id: 10,
    question: 'What does a digital output on an outstation normally switch when it starts a pump?',
    options: [
      'The pump motor directly, through the outstation terminals',
      'The pump’s overload relay, to reset it',
      'The coil of an interposing relay, whose contact switches the contactor',
      'The pump’s variable speed drive speed reference',
    ],
    correctIndex: 2,
    explanation:
      'Outstation digital outputs switch plant through an interposing relay and a contactor, so the output carries only a small coil current. The motor current flows through the contactor, never the outstation terminals. A speed reference is an analogue output, not a digital one, and Section 2.7 covers interposing relays in more detail.',
  },
];

const BMSModule2Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 5"
        title="Controllers and I/O modules"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers what a BMS controller does, how its inputs and outputs are set up, how
          it grows, and what keeps it running when the power goes. On site, it is the box all your
          field wiring lands on.
        </p>

        <TLDR
          points={[
            'An outstation is a small computer that holds its own control logic. Once configured it keeps running the plant even if the network to the head end is lost.',
            'Controllers come in sizes: plant outstations with many points, unitary controllers dedicated to one item of plant, and stand-alone controllers with no network at all.',
            'Every field device lands on a channel of the right type. Universal inputs can take several signal types, but only the one they are configured for.',
            'A full controller grows by an expansion board or module, another outstation, or a larger one. Spare I/O planned at design saves all three.',
            'The controller’s supply, battery backup and restart behaviour are part of the installation. Know whether its supply depends on the plant it controls.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What an outstation is</ContentEyebrow>

        <ConceptBlock
          title="A small computer that holds the control logic for its plant"
          plainEnglish="The outstation is the brain in the plant room panel. Sensors and switches feed it, it decides, and its outputs start plant and move valves. The head end only watches and adjusts it."
          onSite="Ask the controls engineer which outstation each item of plant is on before you start. The panel label and the points schedule should agree; if they do not, find out why before you touch anything."
        >
          <p>
            In Section 1.1 you met the three levels of a BMS: management, automation and field. The
            outstation is the automation level made physical. It is a microprocessor-based
            controller, often a DIN-rail unit or a board in a control panel, with screw terminals
            for the field wiring and one or more communication ports for the network.
          </p>
          <p>
            Its software is built from function blocks: schedules, optimisers, compensators, PID
            loops and logic. The controls engineer links those blocks together into a{' '}
            <strong>strategy</strong> for the plant it serves and loads it into the outstation. From
            then on, the outstation holds that logic itself. Every few moments it reads its inputs,
            works through the strategy and updates its outputs.
          </p>
          <p>
            That is why a well-designed BMS is described as having{' '}
            <strong>distributed intelligence</strong>. Control happens out at the outstations, not
            at the central PC. If the network to the head end fails, each outstation carries on
            running its own plant to its own schedules. What you lose is the view: alarms stop
            reaching the head end, trends may have gaps, and nobody can change a setpoint remotely.
          </p>
          <p>
            Distributing control has practical benefits you will see on site. A failed outstation
            affects only the plant wired to it. Field devices are wired to a nearby outstation
            rather than all the way back to one central point, which cuts cabling. And the system
            grows by adding outstations to the network rather than replacing the whole thing.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-5-standalone"
          question="The head end PC in the estates office is switched off for a software upgrade. What happens to the heating in the building?"
          options={[
            'It stops until the head end is back, because the PC runs the schedules',
            'It switches to frost protection only, as a safety default',
            'It carries on under the outstations’ own schedules and loops',
            'It runs flat out, because the outstations lose their setpoints',
          ]}
          correctIndex={2}
          explanation="The outstations hold the strategies, schedules and setpoints, so the plant carries on as normal. Taking the head end down removes monitoring, alarm handling and remote adjustment, not control. This is why the head end can be upgraded without the building going cold."
        />

        <SectionRule />
        <ContentEyebrow>The controller family</ContentEyebrow>

        <ConceptBlock
          title="Plant outstations, unitary controllers and stand-alone controllers"
          plainEnglish="Big controllers run plant rooms. Small networked controllers run one item each, like a fan coil. Stand-alone controllers run on their own and the BMS just turns them on and off."
          onSite="Packaged plant such as a chiller, boiler or heat pump usually arrives with its own controller. Find out early whether the BMS talks to it over a network, enables it with a contact, or both, because that decides what you wire."
        >
          <p>You will meet three kinds of controller on most BMS jobs:</p>
          <ul>
            <li>
              <strong>Plant outstations</strong> sit in plant room and riser panels and serve major
              plant: boilers, pumps, air handling units, chillers. Larger outstations have more
              inputs and outputs and room for more function blocks, so one may run several items of
              plant.
            </li>
            <li>
              <strong>Unitary controllers</strong> are small outstations dedicated to one item of
              plant, such as a fan coil unit, a VAV box or a chilled beam zone. They are on the
              network like any other outstation, and a large building may have a great many of them,
              often mounted on or inside the unit itself.
            </li>
            <li>
              <strong>Stand-alone controllers</strong> are not on the network at all. A boiler’s own
              compensator or a packaged PID controller is set up for its application and left to get
              on with it. The BMS typically enables it with a digital output on a time schedule and
              may read back a run or fault contact.
            </li>
          </ul>
          <p>
            You will also hear about <strong>PLCs</strong>. A programmable logic controller is the
            same idea grown up in industry: inputs, a processor running a program, outputs. On a BMS
            you usually meet them inside packaged plant or on specialist systems, talking to the BMS
            over a network. The wiring principles on this page apply to both.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsPlcBasics}
          topic="Watch · inputs, processor, outputs"
          caption="Watch for the cycle the video describes: read the inputs, run the program, update the outputs. A BMS outstation works the same way, with a strategy of function blocks in place of a ladder program. Notice how the inputs and outputs are grouped on the hardware, because that is how you will find them on an outstation."
        />

        <SectionRule />
        <ContentEyebrow>Points on the terminals</ContentEyebrow>

        <ConceptBlock
          title="Each field device needs a channel of the right type"
          plainEnglish="A switch goes on a digital input, a temperature sensor on an analogue input, a starter&rsquo;s interposing relay on a digital output, a modulating valve on an analogue output. Get the type wrong and it will not work, however neat the wiring."
          onSite="Read the terminal numbers off the points schedule, not off the last panel you wired. Two outstations from the same range can still have their channels in a different order."
        >
          <p>
            Section 2.1 introduced the four point types. On the controller they become groups of
            terminals, usually labelled by type and channel number:
          </p>
          <ul>
            <li>
              <strong>Digital inputs (DI)</strong> read the state of a contact: a run status relay,
              a filter differential pressure switch, a fault contact from a starter, a signal from
              another system. The input must suit the controller’s interface, which on most
              outstations means a volt-free contact.
            </li>
            <li>
              <strong>Digital outputs (DO)</strong> switch plant on and off, normally by energising
              an interposing relay whose contact switches the contactor coil in the starter panel.
              The output carries only a relay coil current; the motor current goes through the
              contactor.
            </li>
            <li>
              <strong>Analogue inputs (AI)</strong> read a continuously varying signal. In building
              services that is usually a resistance from a thermistor or resistance thermometer, a
              0–10 V signal or a 4–20 mA signal.
            </li>
            <li>
              <strong>Analogue outputs (AO)</strong> send a continuously varying command, most often
              0–10 V, to a valve or damper actuator or a speed reference to a drive.
            </li>
            <li>
              <strong>Pulse inputs</strong> count pulses from gas, water and electricity meters. The
              outstation keeps a running total and scales it into units such as cubic metres or
              kilowatt hours.
            </li>
          </ul>
          <p>
            Inside the controller, an analogue input passes through an analogue-to-digital converter
            so the processor can work with it as a number, and an analogue output runs the other way
            through a digital-to-analogue converter. Digital channels usually have a small LED per
            channel. Those LEDs are worth knowing about: they tell you whether the controller sees a
            contact as closed, or is driving an output, before you have opened a laptop.
          </p>
          <p>
            Inputs from other systems arrive the same way. A fire alarm panel, for example, usually
            gives the BMS a volt-free contact that a digital input reads as a status. The fire alarm
            system does the life-safety actions itself, through its own interfaces; the outstation
            input is there so the BMS knows what has happened and can follow up with anything that
            is not life-safety. Wire it as a monitoring point, and do not add BMS logic in the path
            of a fire shutdown.
          </p>
          <p>
            Some outstations also have <strong>soft points</strong> or internal points. These are
            values that exist only in the software, such as a calculated average or an occupancy
            flag. They have no terminal, but they appear on the head end just like a wired point,
            which can catch you out when you go looking for the wire.
          </p>
          <p>
            A digital output is one of a few types, and the datasheet says which. Some give a
            volt-free relay contact, so you provide the supply that the contact switches. Others
            switch a supply provided inside the controller, or switch a supply you bring to a common
            terminal. Each has a rating for voltage and current that is far below what most motors
            draw, which is why outputs switch relay coils rather than plant. An interposing relay
            goes in between whenever the load is beyond the output’s rating or needs a different
            voltage, and on mains-voltage starters that means always. Section 2.7 covers that in
            detail.
          </p>
          <p>
            Outputs are often arranged in groups, with one <strong>common</strong> terminal serving
            several channels. That saves terminals, and it is deliberate: grouping lets different
            supplies feed different groups of outputs. The trap is the reverse case. If two channels
            on the same common need different supplies, for example one switching an extra-low
            voltage relay coil and one switching a mains contactor coil, they cannot share that
            common. Mixing them puts one supply where the other was expected, with results from a
            dead relay to a damaged controller. Mixing them also brings mains onto a terminal block
            that carries SELV or PELV wiring, which breaks the separation those circuits rely on.
            Some controller ranges don&rsquo;t allow mains on any of their outputs for that reason.
            Check the installation instructions before you land 230 V on an outstation, and use an
            interposing relay where in doubt.
          </p>
          <p>
            Analogue inputs have their own version of this. Several channels may share a signal
            reference terminal, and the controller’s reference is not necessarily earth. Land each
            sensor exactly as the terminal diagram shows, and never borrow a common from a different
            group because it is closer.
          </p>
          <p>
            So before you land any supply on an output common, find every channel on that common in
            the controller’s terminal diagram and check what each one is switching. If they need
            different supplies, they need different commons, and the points schedule should be
            changed to suit before you wire, not after.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-5-io-types"
          question="Which channel type should a two-position actuator on a heating valve be wired to?"
          options={[
            'An analogue input, so its position can be read back',
            'A digital output, because it is commanded open or shut',
            'A pulse input, because it moves in steps',
            'An analogue output, because valves are always modulating',
          ]}
          correctIndex={1}
          explanation="A two-position actuator is either open or shut, so it is driven by a digital output. A modulating actuator would need an analogue output, and if position feedback is fitted it would come back on an analogue input. Not every valve is modulating; read the actuator label and the points schedule."
        />

        <SectionRule />
        <ContentEyebrow>Universal inputs and scaling</ContentEyebrow>

        <ConceptBlock
          title="A universal input reads what it is told to expect"
          plainEnglish="Many modern controllers have inputs that can take a resistance sensor, a voltage, a current or a contact. Which one is chosen in the software, and sometimes by a link on the board as well. If the setting does not match the wiring, the reading is wrong."
          onSite="Before you call a sensor faulty, ask the controls engineer what the input is configured as. A mismatch looks exactly like a dead sensor on the head end."
        >
          <p>
            Older outstations had fixed groups of channels: so many resistance inputs, so many
            voltage inputs, so many digital inputs. Many current controllers instead offer{' '}
            <strong>universal inputs</strong>, where each channel can be set up as a resistance,
            voltage, current or digital input. Some can also act as an output. This makes the
            controller more flexible, because the mix of points does not have to be known exactly
            when the hardware is ordered.
          </p>
          <p>
            The flexibility comes with a catch. The channel does not detect what is connected to it.
            It measures what its configuration tells it to measure. A current signal into an input
            set for voltage, or a thermistor into one set for a different sensor curve, gives a
            reading that is wrong, fixed or out of range. Some products also need a jumper, DIP
            switch or plug-in link set on the board to match. Both have to agree with what you have
            wired.
          </p>
          <p>
            Once the signal is read, the software <strong>scales</strong> it into engineering units
            and applies upper and lower limits. If a humidity sensor is set up so that 0 V means 0
            %RH and 10 V means 100 %RH, then 5 V on the terminals should show as 50 %RH on the head
            end. If the meter at the terminals and the head end disagree, the scaling or the
            configuration is wrong, not the sensor.
          </p>
          <p>
            Scaling is also where a 4–20 mA signal earns its keep. Because the range starts at 4 mA
            rather than zero, a reading of no current means the loop is broken, not that the
            measurement is at the bottom of its range. The controller can be set to flag that as a
            sensor fault. Section 2.6 goes into why current loops behave that way.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Swapping a sensor without checking the input it lands on"
          whatHappens="A failed room sensor is replaced with whatever is on the van. It is a different type, or a current-output sensor where the old one was resistance. The wiring is perfect, but the head end now shows a reading that is fixed, nonsense or out of range, and the zone overheats while everyone blames the new sensor."
          doInstead="Match the replacement to the points schedule: sensor type, signal and range. If a different type has to be used, tell the controls engineer so the input configuration and scaling can be changed to suit. Then compare a meter reading at the terminals with the head end before you leave."
        />

        <InlineCheck
          id="bms-2-5-universal"
          question="A 0–10 V sensor scaled 0–100 %RH reads 4 V on your meter at the controller terminals. The head end shows 75 %RH. Where is the fault?"
          options={[
            'In the sensor, because it is reading high',
            'In the cable, because voltage is being lost on the run',
            'In the configuration or scaling of the input',
            'In the head end, because it needs restarting',
          ]}
          correctIndex={2}
          explanation="4 V on a 0–10 V signal scaled 0–100 %RH should show 40 %RH. The terminals already have the true signal, so the sensor and cable have done their job. The difference is being introduced inside the controller, by the wrong input type or the wrong scaling."
        />

        <SectionRule />
        <ContentEyebrow>When the controller is full</ContentEyebrow>

        <ConceptBlock
          title="Three ways to add points, and why spare I/O is cheaper than all of them"
          plainEnglish="If there are no free channels, you can add an expansion board or module, add another outstation, or swap the outstation for a bigger one. Leaving spare channels at the start avoids the problem."
          onSite="When a variation adds sensors or plant, count the free channels of each type on the outstation before you price the wiring. A missing analogue input can turn a simple job into a new panel."
        >
          <p>
            Every controller has a fixed number of channels. When a job adds more points than it has
            free, there are three ways forward:
          </p>
          <ul>
            <li>
              <strong>Add I/O to the existing outstation.</strong> Some controllers accept extra
              boards, or I/O modules that clip on alongside on the DIN rail or connect over a short
              local bus. The processor stays the same; it simply has more terminals.
            </li>
            <li>
              <strong>Add another outstation.</strong> A second controller goes on the network with
              its own I/O, often placed near the plant it serves to keep field cable runs short.
            </li>
            <li>
              <strong>Replace the outstation with a larger one.</strong> The strategy has to be
              moved across, so this is a controls engineer’s job and usually means a plant shutdown.
            </li>
          </ul>
          <p>
            Some small controllers cannot be expanded at all. They are sold with a fixed set of
            channels and no way to add more, which is fine on a packaged unit and a problem on a
            plant room that will change.
          </p>
          <p>
            That is why good specifications ask for <strong>spare I/O</strong> at the outset.
            Industry guidance on delivering BEMS projects suggests leaving roughly 10–20% of
            controller I/O spare on a basic system, and roughly 20–30% where the system is expected
            to integrate other building services and grow. Spare channels are only useful if the
            panel has space and spare terminals for them too, which is where the panel builder and
            the electrician come in.
          </p>
          <p>
            Expansion modules and remote I/O have to be <strong>addressed</strong>. Each one is
            given an address with switches on the module or in software, and the controller must be
            told to expect it. Two modules on the same address, or one left at its factory setting,
            is the commonest reason a new module stays invisible. Section 7.3 (Addressing and point
            mapping) covers addressing on networks in full.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-5-expansion"
          question="Two identical I/O modules are added to a controller. One appears on the head end; the other does not, and the first one’s readings now jump about. What is the likely cause?"
          options={[
            'The second module is faulty and is corrupting the bus',
            'Both modules have been left on the same address',
            'The controller has run out of processing power',
            'The modules need a separate network to the head end',
          ]}
          correctIndex={1}
          explanation="Identical modules often leave the factory with the same address. If both stay on it, the controller cannot tell them apart and readings from the one it does see become unreliable. Set each to the address on the design and the problem clears. Always check addressing before condemning hardware."
        />

        <Scenario
          title="Three new classrooms, and no analogue inputs left"
          situation="A school is adding three classrooms to an existing wing. The design calls for a room temperature sensor and a CO2 sensor in each, plus a modulating valve on a new heating circuit. You arrive to find the wing’s outstation has spare digital channels but every analogue input and output is in use. The panel is tight but has a little rail space."
          whatToDo="Stop and report it before running cable to the panel; this is a design question, not a wiring one. Give the controls engineer the facts: which channels are free, how much rail and terminal space is left, and how far the new rooms are from the panel. They will decide between a clip-on I/O module, a small outstation local to the new rooms or a larger controller. Once decided, wire to the revised points schedule, label every new terminal and cable, and make sure any new module’s address is set as designed before it is powered."
          whyItMatters="Squeezing sensors onto whatever channels happen to be free, such as using a digital input for a sensor, cannot work and wastes a day. A local outstation for the new rooms may save more cable than it costs, and leaves the old panel with headroom. Raising it early means the change is designed, priced and documented rather than discovered at commissioning."
        />

        <SectionRule />
        <ContentEyebrow>Power, batteries and restarting</ContentEyebrow>

        <ConceptBlock
          title="A controller is only as reliable as its supply"
          plainEnglish="The outstation needs a clean, protected supply. Its battery keeps the clock and settings alive through a power cut, and it has to restart properly when the power returns. Field devices often need their own supply as well."
          onSite="Label the controller supply at both ends: the circuit in the distribution board and the terminals in the panel. When someone isolates the panel years from now, they need to know what else it feeds and what feeds it."
        >
          <p>
            Many outstations run on an extra-low voltage supply from a transformer or power supply
            in the panel, fed from a protected circuit. Field devices then need power of their own.
            Valve actuators, for example, come in 230 V AC and 24 V AC versions, driven by
            2-position, 3-position or 0–10 V DC signals. Supply and signal are two separate
            questions on every actuator, and the label answers both. Work out the total load on any
            panel power supply before adding devices to it, and protect each supply as the design
            requires.
          </p>
          <p>
            Every outstation has a way of keeping its memory through a loss of mains, typically a{' '}
            <strong>standby battery</strong> or similar backup. It holds the real-time clock, the
            configuration and the logged data. When it fails, nothing happens until the next power
            cut, and then the controller restarts with the wrong time, missing settings or no
            strategy at all.
          </p>
          <p>
            For that reason, how the BMS behaves when the supply is interrupted is tested at
            commissioning, and checked again at maintenance:
          </p>
          <ul>
            <li>
              the system works as specified when the supply is interrupted and on any standby power;
            </li>
            <li>
              outstations keep their software and data for the specified period without mains;
            </li>
            <li>outstations and plant restart correctly when the supply returns;</li>
            <li>any restart programme, such as staggered plant starts, runs as intended.</li>
          </ul>
          <p>
            A power cut is also when a dependent supply shows itself. If the outstation shares a
            supply with one item of plant, then isolating that plant for maintenance takes out
            control of everything else on the same controller. That might be acceptable for a
            controller serving a single air handling unit; it is rarely acceptable for one running a
            whole plant room.
          </p>
          <p>
            On critical sites, such as hospitals, outstations and the communications network may
            also be backed by a UPS, so that control and monitoring ride through short outages.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Section 557 covers auxiliary circuits, including control, signalling and measurement circuits. The supply to an auxiliary circuit may be dependent on, or independent of, the main circuit, according to the function it has to perform."
          meaning="A BMS controller and its field devices are auxiliary circuits. (Inside a panel built to BS EN 61439, that standard covers the wiring rather than Section 557.) Feeding an outstation from the control circuit of the plant it serves makes it dependent: isolate the plant and the controller goes too. A separate supply keeps it running, but adds a second source in the panel. Either can be right; it must be a decision, and it must be labelled."
          cite="Regulation 557.3.1"
        />

        <Pullquote>
          A controller with a flat battery works perfectly until the first power cut. Test the
          restart before handover, not after the client finds out.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Local displays and access</ContentEyebrow>

        <ConceptBlock
          title="Local displays are useful, and so is knowing what they can change"
          plainEnglish="Many controllers have a screen on the unit or panel door, or a port for a hand-held or laptop. From there you can see live values and, with the right access, override outputs and change settings."
          onSite="If you use a local display to prove an output during testing, write down every override you set and release each one before you leave. An override left on is invisible from the plant room floor."
        >
          <p>
            A local interface, sometimes called an HMI, lets someone at the panel read inputs and
            outputs, see alarms and, depending on their access level, put points into override or
            change setpoints. That is invaluable when commissioning or fault finding, because you
            can watch the controller respond as you operate a switch or meter a signal.
          </p>
          <p>
            Overrides are where it goes wrong. An output forced on at the local display or the head
            end ignores the control loop completely. A pump left forced on runs all weekend; a valve
            left forced shut leaves a zone cold, and the head end may simply show it as running or
            shut. Checking that every override has been released is part of commissioning and
            handover.
          </p>
          <p>
            Controllers are also part of the building’s security. Default manufacturer passwords
            should be changed before handover, firmware kept on a supported version, and physical
            access to panels controlled like any other plant. Section 5.6 (Network design and cyber
            security) covers network security in full; for the electrician, the point is to lock the
            panel and not to leave a controller with its factory password.
          </p>
          <p>
            Keep a copy of the points schedule and strategy diagram with each outstation, usually in
            a pocket on the panel door. The next person to fault-find on it, possibly you, will need
            them.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Proving outputs from the local display and walking away"
          whatHappens="During testing, outputs are forced from the local display to prove each pump and valve. The job finishes, the van leaves, and one pump stays forced on. Nobody notices until the energy bill or a complaint about a noisy plant room at night, and by then nobody knows who set it."
          doInstead="Keep a written list of every override you set, by point name, as you go. Release each one before you leave, then check on the display or head end that no points are left in override. If a point has to stay overridden, tell the building operator and the controls engineer in writing, with the reason."
        />

        <SectionRule />
        <ContentEyebrow>Before you hand the panel over</ContentEyebrow>

        <ConceptBlock
          title="The electrician’s checks on a controller installation"
          plainEnglish="Is it the right controller, in the right place, fixed properly, powered, fused, labelled, with every cable terminated and identified? Those are your checks before the controls engineer starts commissioning."
          onSite="Walk the panel with the points schedule in hand and tick off every terminal. A cable labelled at one end only, or a terminal with nothing on the schedule, will cost someone an hour later."
        >
          <p>
            Before commissioning starts, the installation of each outstation is checked against the
            design. Most of these checks are yours:
          </p>
          <ul>
            <li>
              <strong>Type, size and number</strong> of controllers and modules match the design.
            </li>
            <li>
              <strong>Location</strong> gives safe access at a sensible height, in a suitable
              environment, with the controller securely fixed.
            </li>
            <li>
              <strong>Identification</strong>: the outstation is labelled, and every cable is
              terminated and identified at both the controller and the field device.
            </li>
            <li>
              <strong>Power</strong> is available, with fuses or protective devices fitted as
              designed and the supply labelled.
            </li>
            <li>
              <strong>Hardware configuration</strong>, such as address switches and input links, is
              set as the design requires.
            </li>
            <li>
              <strong>Spare channels</strong> are left clear and recorded as spare on the points
              schedule, so the next person can see what headroom there is without tracing wires.
            </li>
            <li>
              <strong>Records</strong>: the points schedule and strategy diagram are in the panel,
              and any change you made on site is marked up for the as-fitted drawings.
            </li>
          </ul>
          <p>
            Outstation inputs and outputs are electronics. Disconnect them, or follow the
            manufacturer’s instructions, before insulation resistance testing field cables that land
            on them. And if a terminal shows a voltage you did not expect, stop: an output may be
            energised from the controller, or a contact may be carrying a supply from another panel.
          </p>
          <p>
            In service, outstations are checked periodically for the condition of the cabinet, seals
            and cable entries, the local operating environment, battery operation after a mains
            failure, automatic restart, and the state of their inputs and outputs. A clean,
            well-labelled installation makes every one of those visits quicker.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is a BMS outstation the same thing as a PLC?',
              answer:
                'They work on the same principle: read inputs, run a program, update outputs. Outstations are built for building services, with function blocks for schedules, optimisers and compensators and with sensor inputs suited to HVAC. PLCs come from industry and are common inside packaged plant. On site, the wiring rules are much the same; the difference is mainly in who programs them and how.',
            },
            {
              question:
                'Can I just move a sensor to a different spare input if one channel looks dead?',
              answer:
                'Not on your own. The strategy reads a specific channel, so a moved sensor reads nothing until the controls engineer changes the configuration, the scaling and the points schedule. Report the suspect channel with your meter readings and agree the change first, then update the labels and records.',
            },
            {
              question: 'Should the outstation have its own circuit from the distribution board?',
              answer:
                'It depends on the design. Section 557 allows the supply to be dependent on the plant circuit or independent of it, according to function. A separate supply keeps control and monitoring running when one item of plant is isolated, but it also means the panel has more than one source. Follow the design, and label it so the next person knows.',
            },
            {
              question: 'Why does the controller have LEDs on some channels and not others?',
              answer:
                'Digital channels usually have one LED each, showing whether the controller sees an input contact as closed or is driving an output. Analogue channels carry a varying value that an LED cannot show, so you read those with a meter at the terminals or on the display. The LEDs are a quick first check, but the points schedule tells you which channel is which.',
            },
            {
              question: 'What does an electrician do when an expansion module is added?',
              answer:
                'Typically you mount it, power it, wire the bus connection and the field devices to the revised points schedule, set the address switches as designed and label everything. The controls engineer then adds the module to the controller’s configuration and maps its points. Check the address before you power it up.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'An outstation holds its own strategy and keeps running its plant when the network to the head end is lost. That is distributed intelligence.',
            'Plant outstations serve plant rooms, unitary controllers serve single items of plant on the network, and stand-alone controllers are enabled by the BMS but not networked.',
            'Each field device needs the right channel type. Universal inputs only read correctly when their configuration, and any hardware link, matches what is wired.',
            'Scaling turns a signal into a reading. If the terminals and the head end disagree, look at configuration and scaling before blaming the sensor.',
            'A full controller is expanded by extra I/O, another outstation or a larger one. Spare I/O at design, and an address set correctly on every module, avoid most of the pain.',
            'Supply, battery backup and restart behaviour are tested. Know whether the controller’s supply depends on the plant it controls, and label it.',
            'Release every override you set. An output left forced on is invisible until the plant misbehaves.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-4"
          prevLabel="Siting sensors and getting true readings"
          nextHref="/study-centre/upskilling/bms-module-2-section-6"
          nextLabel="Control wiring"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section5;
