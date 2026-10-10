/**
 * BMS Module 1 · Section 2 — What a BMS controls and connects to
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page walks the systems a BMS meets in a
 * real building — HVAC and heating plant, lighting, metering, blinds, power systems, and the
 * life-safety and security systems — and hangs all of it off one question: does the BMS
 * control this, or only watch it? The old page carried invented savings percentages, £/m² costs
 * and payback periods, a fixed minimum cable separation wrongly attributed to BS 7671, and taught
 * the BMS as the path for fire shutdown and door release. All of that is gone. Fire, lifts and
 * access are taught as monitor-only; segregation is taught as BS 7671 Regulation 528.1 plus
 * Regulation 444.4.10, with no distance quoted.
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

const TITLE = 'What a BMS controls and connects to | BMS Module 1.2 | Elec-Mate';
const DESCRIPTION =
  'The systems a BMS runs and the ones it only watches: HVAC, heating, lighting, metering, blinds, generators, UPS, lifts, access and fire, and why the difference matters.';

const outcomes = [
  'List the building services a BMS typically controls, and the ones it typically only monitors',
  'Explain why packaged plant such as boilers and chillers keeps its own controls, and what the BMS adds on top',
  'Describe how a BMS handles lighting, metering and blinds, and what happens to each if the BMS fails',
  'Explain why fire, lift and access systems are monitored by the BMS rather than controlled by it',
  'Recognise the physical interface between a BMS and another system: enable contacts, status and fault contacts, meter pulses and data links',
  'Apply the control-or-monitor question on site before wiring anything between two systems',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A gas-fired boiler has its own burner controller. What does the BMS normally do with that boiler?',
    options: [
      'Takes over flame supervision and ignition from the burner controller',
      'Sends an enable and reads back status, faults and temperatures',
      'Nothing, because packaged boilers are never connected to a BMS',
      'Modulates the gas valve directly from an analogue output',
    ],
    correctIndex: 1,
    explanation:
      'The manufacturer’s controls look after safe firing; the BMS decides when the boiler should be available and watches what it does. Taking over flame supervision is the tempting wrong answer, but combustion safety stays with the boiler’s own controller, not with a building-wide system.',
  },
  {
    id: 2,
    question:
      'External blinds on a sunny façade lower automatically, and the lights in the offices behind them then switch on full. What is the design missing?',
    options: [
      'A wind sensor to retract the blinds before they are damaged',
      'Coordination so the blinds and lighting work together',
      'A faster blind motor so the blinds lower more quickly',
      'A separate outstation for the blinds on each façade',
    ],
    correctIndex: 1,
    explanation:
      'Blind control should be coordinated with lighting and HVAC, so that closing the blinds does not simply switch the lights on and open the heating valves. A wind sensor protects the blinds in high wind but does nothing for this problem. Motor speed and outstation layout do not change how the systems interact.',
  },
  {
    id: 3,
    question:
      'The access control system logs staff badging in on the second floor. Which use of that data by the BMS fits UK practice?',
    options: [
      'Bringing the floor’s heating on as an occupancy signal',
      'Releasing the floor’s exit doors when the fire alarm sounds',
      'Deciding which staff badges can open the floor’s doors',
      'Locking the floor’s doors when the building is empty',
    ],
    correctIndex: 0,
    explanation:
      'The BMS can see door status and use access data as an occupancy signal, for example to bring a floor’s heating on when people arrive. The access system decides who can open which door and when doors lock. The fire system decides when doors release in an emergency. The BMS watches those systems; it does not act for them.',
  },
  {
    id: 4,
    question:
      'The BMS outstation serving a floor of offices fails overnight. What should still be possible with a well-designed lighting system the next morning?',
    options: [
      'Nothing, as the lights stay off until the BMS is repaired',
      'Only the emergency lighting will work',
      'The lights can be operated locally, by hand',
      'The lights come on and cannot be switched off',
    ],
    correctIndex: 2,
    explanation:
      'Good practice is that local switches can override BMS lighting control and that lighting can be operated manually if the BMS fails. Emergency lighting has its own supply and does not depend on the BMS at all, so “only the emergency lighting” describes a badly designed system, not a good one.',
  },
  {
    id: 5,
    question: 'An electricity sub-meter is wired to a BMS digital input. What is it sending?',
    options: [
      'A 4–20 mA signal proportional to the instantaneous current',
      'A mains-voltage signal whenever the load is on',
      'Pulses, each representing a fixed quantity of energy',
      'A volt-free contact that opens when the meter has a fault',
    ],
    correctIndex: 2,
    explanation:
      'A pulse output closes once per fixed unit of energy; the outstation counts the pulses, keeps a running total and scales it into kWh. A meter may also have a fault contact, but that is not how consumption reaches the BMS on a pulse input.',
  },
  {
    id: 6,
    question:
      'Which of these is a genuine control job a BMS commonly does on the electrical side of a building?',
    options: [
      'Shedding low-priority loads under a demand limit',
      'Starting the standby generator when the mains fails',
      'Switching the UPS to bypass during a fault',
      'Tripping the incoming supply when an earth fault occurs',
    ],
    correctIndex: 0,
    explanation:
      'Load shedding and demand limiting are classic BMS functions: watch demand, predict it, switch off lower-priority loads, restore them later. Generator starting and UPS bypass belong to those systems’ own controls, and fault protection belongs to protective devices. The BMS watches those; it does not do them.',
  },
  {
    id: 7,
    question:
      'You are asked to connect a standby generator to the BMS. Which set of points is the sensible scope?',
    options: [
      'A start command, a stop command and a speed setpoint',
      'An output that closes the changeover switch on mains failure',
      'A remote emergency stop wired from the BMS head end',
      'Running, common fault, mains-fail and fuel level, read only',
    ],
    correctIndex: 3,
    explanation:
      'The generator’s own controller and the transfer switch handle starting and changeover. The BMS earns its place by reporting what the set is doing so someone acts on it. A start command can be added for a test routine where the specification asks for it, but changeover and emergency stop are not BMS jobs.',
  },
  {
    id: 8,
    question:
      'A chiller shows "running" on the BMS graphic, but the chilled water is warm. What is the most likely gap in the points?',
    options: [
      'The chiller has no BMS enable signal',
      'The graphic shows the command, not proof of running',
      'The chiller is sitting on the wrong BACnet network',
      'The BMS is controlling the chiller compressor directly',
    ],
    correctIndex: 1,
    explanation:
      'If the only point is the command, the graphic is telling you what the BMS asked for, not what the plant did. A proper strategy reads back a separate status or proof point and alarms when the expected response does not arrive in time. A network fault would normally show as lost communications, not a confident “running”.',
  },
  {
    id: 9,
    question:
      'On an England non-domestic project with heating plant over 180 kW, the specification asks for a BACS that can talk to services from different manufacturers. Where does that requirement come from?',
    options: [
      'BS 7671 Regulation 528.1',
      'Approved Document L, Volume 2',
      'The lift manufacturer’s warranty terms',
      'BS 7671 Section 557',
    ],
    correctIndex: 1,
    explanation:
      'Approved Document L Volume 2 asks for a building automation and control system above 180 kW effective rated output, and its specification includes interoperability across different technologies and manufacturers. Regulation 528.1 is about segregating voltage bands, and Section 557 covers auxiliary circuits. Both are wiring rules, not system requirements.',
  },
  {
    id: 10,
    question:
      'You are running BMS field cabling in the same trunking route as lighting circuits. What does BS 7671 actually require?',
    options: [
      'A fixed minimum separation distance set out in BS 7671 itself',
      'Nothing, because control cables are exempt from BS 7671',
      'Only that the BMS cable is screened and earthed at both ends',
      'Band I and Band II segregated, or a permitted method',
    ],
    correctIndex: 3,
    explanation:
      'Regulation 528.1 requires Band I and Band II circuits to be segregated or to use one of the permitted methods, such as a separate compartment or insulation rated for the highest voltage present. BS 7671 does not set a separation distance of its own; for control and communication cabling inside buildings, Regulation 444.4.10 points you to BS EN 50174-1 and BS EN 50174-2.',
  },
];

const BMSModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 2"
        title="What a BMS controls and connects to"
        backTo="/study-centre/upskilling/bms-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          A BMS touches most of the services in a building, but it does not run all of them. This
          page sorts out which systems it controls, which it only watches, and why the line sits
          where it does.
        </p>

        <TLDR
          points={[
            'A BMS controls the plant that makes the indoor environment: heating, cooling, ventilation, pumps and, often, lighting and blinds.',
            'Packaged plant such as boilers and chillers keeps its own safety controls. The BMS enables it, reads it back and raises alarms.',
            'Fire, lifts, access and security are monitored, not controlled. The fire system carries out its own life-safety actions.',
            'Metering, generators and UPS are mostly read-only points that tell people what is happening, plus jobs like load shedding.',
            'Before you wire anything between two systems, ask: is this link meant to control, or only to monitor?',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The one question to ask</ContentEyebrow>

        <ConceptBlock
          title="Control or monitor: every connection is one or the other"
          plainEnglish="Some systems the BMS runs. Others it just keeps an eye on and reports. Knowing which is which tells you what the wiring is allowed to do."
          onSite="Before you terminate a single core between a BMS panel and someone else’s equipment, find out whether that link is a command or a status. If nobody can tell you, stop and ask."
        >
          <p>
            Section 1.1 described the BMS as a head end and a set of outstations wired to points out
            in the building. This section is about what those points are connected to. The honest
            answer is: almost everything with a power supply and a fault light, but in two very
            different ways.
          </p>
          <p>
            <strong>Control</strong> means the BMS decides. It switches a fan on, opens a valve,
            changes a setpoint, dims a row of lights. If the BMS logic is wrong, the plant does the
            wrong thing.
          </p>
          <p>
            <strong>Monitor-only</strong> means the BMS watches. It reads status and alarm signals
            from another system, shows them on the graphics, logs them and sends alarms to the right
            people. Nothing it does can change how that other system behaves.
          </p>
          <p>Most buildings sort out roughly like this:</p>
          <ul>
            <li>
              <strong>Usually controlled:</strong> air handling units, fan coil units, pumps,
              heating and chilled water circuits, ventilation fans, often lighting, often blinds.
            </li>
            <li>
              <strong>Enabled and supervised:</strong> packaged boilers, chillers and heat pumps,
              which have their own controllers. The BMS says when, the plant decides how.
            </li>
            <li>
              <strong>Monitored only:</strong> fire detection, lifts, access control, intruder
              alarms, CCTV, generators, UPS, emergency lighting, specialist alarms such as fridges
              and medical gas.
            </li>
            <li>
              <strong>Read for data:</strong> energy, gas, water and heat meters.
            </li>
          </ul>
          <p>
            The middle category is the one people forget, and it is where a lot of site arguments
            start. It is not full control and it is not just a status light.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-2-sort"
          question="Which of these connections is a control link rather than a monitoring one?"
          options={[
            'A volt-free contact from the lift controller showing out of service',
            'A fire alarm relay showing the panel is in alarm',
            'A BMS output opening the heating valve on an AHU coil',
            'A pulse output from the main electricity meter',
          ]}
          correctIndex={2}
          explanation="Driving the AHU heating valve is the BMS deciding what plant does, so it is control. The lift and fire contacts only tell the BMS what those systems are doing, and the meter pulse is data. All three are inputs to the BMS; only the valve is an output."
        />

        <Pullquote>
          A BMS can show you everything in the building. That does not mean it should be allowed to
          drive everything in the building.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Heating, ventilation and air conditioning</ContentEyebrow>

        <ConceptBlock
          title="HVAC is the core job"
          plainEnglish="Keeping rooms at the right temperature, with enough fresh air, at the right times, is what a BMS was invented for. Everything else is added on."
          onSite="On a typical commercial job, most of the points on the schedule will be HVAC: temperatures, valve outputs, fan and pump starts, run and fault statuses."
        >
          <p>
            The plant that creates the indoor environment is what the BMS controls most directly. On
            a typical building that means:
          </p>
          <ul>
            <li>
              <strong>Air handling units (AHUs):</strong> supply and extract fans, heating and
              cooling coil valves, dampers, filters, frost protection. Often the biggest single
              block of points on a job.
            </li>
            <li>
              <strong>Fan coil units (FCUs)</strong> and other terminal units, each with its own
              small controller holding a room or zone at setpoint.
            </li>
            <li>
              <strong>Pumps:</strong> circuit pumps on heating and chilled water, often in
              duty/standby pairs, sometimes on variable speed drives.
            </li>
            <li>
              <strong>Heating and chilled water circuits:</strong> mixing and zone valves that set
              the flow temperature each part of the building gets.
            </li>
            <li>
              <strong>Ventilation:</strong> toilet and kitchen extract, car park fans, and fresh air
              dampers that open further as room air quality falls, often judged by CO2.
            </li>
          </ul>
          <p>
            Around that plant, the BMS runs the routines covered later in the course: time
            programmes, optimum start, frost protection, duty rotation, and the readings it needs to
            do all that: temperatures, pressures, humidity, CO2.
          </p>
          <p>
            It also keeps a record. Hours run and number of starts on each item of plant are logged
            so maintenance can be planned on actual use rather than on the calendar, and any
            monitored value can be given an alarm limit so faults are flagged rather than
            discovered.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Packaged plant: the BMS says when, the plant decides how"
          plainEnglish="A boiler or chiller arrives with its own brain. The BMS does not replace that brain; it tells the plant when it is wanted and listens to what it reports."
          onSite="Find the BMS terminals in the boiler or chiller control panel before you go looking for anything else. The manufacturer will have marked a remote enable input and volt-free status and fault outputs."
        >
          <p>
            Boilers, chillers and most heat pumps come with controls fitted by the manufacturer.
            Those controls look after the things that can go badly wrong: burner sequencing and
            flame supervision on a boiler, compressor protection and refrigerant pressures on a
            chiller. The BMS does not take those over, and should not.
          </p>
          <p>What the BMS typically adds on top:</p>
          <ul>
            <li>
              <strong>An enable or on/off command</strong> to the plant controller, usually a
              volt-free contact closing across the manufacturer’s remote enable terminals.
            </li>
            <li>
              <strong>Status and fault signals</strong> back from the plant: running, common fault,
              sometimes individual alarms.
            </li>
            <li>
              <strong>Monitoring values:</strong> flow and return temperatures, hours run, and on
              some plant electrical load or fuel use.
            </li>
            <li>
              <strong>Sequencing:</strong> on multi-boiler or multi-chiller plant, deciding how many
              units run and rotating which one leads so they wear evenly.
            </li>
          </ul>
          <p>
            Larger packaged plant may also offer a data connection (BACnet or Modbus, covered in
            Sections 5.2 and 5.3), which gives the BMS many more readings over one cable. That is a
            richer view of the plant. It is still the plant’s own controller doing the protecting.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-2-packaged"
          question="A chiller is already enabled and read back by the BMS on hardwired contacts. It also offers a Modbus connection. What does adding that link give the BMS?"
          options={[
            'Control of the compressors in place of the chiller’s controller',
            'Many more readings over one cable; the chiller still protects itself',
            'Fire shutdown of the chiller, routed through the outstation',
            'Nothing extra, as Modbus carries only the common fault signal',
          ]}
          correctIndex={1}
          explanation="A data connection gives the BMS a much richer view of the plant over one cable, but the chiller’s own controller still does the protecting. The BMS does not take over the compressors. Fire shutdown belongs to the fire alarm system, not the BMS. And a Modbus link carries far more than a single fault signal."
        />

        <SectionRule />
        <ContentEyebrow>Lighting</ContentEyebrow>

        <ConceptBlock
          title="Lighting: controlled, but never trapped"
          plainEnglish="The BMS can switch and dim lights on a timetable, by daylight and by occupancy. People must still be able to turn them on if the BMS is down."
          onSite="When you wire lighting into a BMS, check how the circuits behave with the outstation powered off. If the answer is ‘dark and no way to switch them’, that is a design problem to raise, not a feature."
        >
          <p>
            Lighting is often under BMS control, either directly through outstation outputs and
            relays, or through a dedicated lighting control system (commonly DALI) that the BMS
            talks to. The usual routines are:
          </p>
          <ul>
            <li>switching internal and external lighting to a time programme;</li>
            <li>
              dimming or switching internal lighting from daylight sensors, with a delay so it does
              not flicker on and off as clouds pass;
            </li>
            <li>switching off lighting in spaces the occupancy detectors say are empty;</li>
            <li>switching external lighting from an outdoor photocell.</li>
          </ul>
          <p>
            Two rules sit around that. First, local switches and the operator at the head end should
            both be able to override what the BMS has done. Second, if the BMS fails, the lighting
            should still be workable by hand. A lighting scheme that depends on the BMS to come on
            at all has handed a single point of failure to a system that was never meant to carry
            it.
          </p>
          <p>
            <strong>Emergency lighting</strong> sits apart. It has its own supply and its own
            testing regime. The BMS, or a DALI system reporting to it, may monitor the fittings and
            their test results, but it plays no part in making them work. Section 4.1 covers
            lighting control and DALI in detail.
          </p>
          <p>
            One wiring point catches people out. Self-contained emergency luminaires take their
            charging supply from the local lighting circuit, unswitched. If a BMS or
            lighting-control relay switches that supply off with the normal lighting, every
            emergency fitting on it thinks the mains has failed and runs its battery down. Keep the
            emergency fittings&rsquo; permanent supply ahead of any BMS or lighting-control
            switching, as the emergency lighting design shows.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-2-lighting"
          question="Office lights dimmed from a daylight sensor keep switching on and off as clouds pass. What is most likely missing from the set-up?"
          options={[
            'A delay before the lights respond to daylight changes',
            'An outdoor photocell wired in place of the room sensor',
            'An occupancy detector added to the same circuits',
            'A separate emergency lighting supply to each fitting',
          ]}
          correctIndex={0}
          explanation="Daylight dimming or switching needs a delay so the lights do not flicker on and off every time a cloud passes. An outdoor photocell is used for external lighting. Occupancy detection deals with empty rooms, not clouds. Emergency lighting has its own supply and has nothing to do with this."
        />

        <SectionRule />
        <ContentEyebrow>Metering and the electrical supply</ContentEyebrow>

        <ConceptBlock
          title="Meters, generators and UPS: read far more than driven"
          plainEnglish="Meters do not get controlled. They get read, and the BMS turns those readings into totals, trends and reports. Standby power is much the same: watched closely, driven by its own controls."
          onSite="Pulse outputs are volt-free contacts, polarity sometimes matters, and the pulse value has to be entered at the outstation. Write the pulse value on the meter label and the record sheet, or the totals will be wrong for years."
        >
          <p>
            Electricity, gas, water and heat meters connect to the BMS in two main ways. The
            simplest is a <strong>pulse output</strong>: a contact that closes once for every fixed
            quantity of energy or volume. The outstation counts the pulses, keeps a running total
            and scales it into proper units. The other way is a <strong>data connection</strong>,
            usually M-Bus or Modbus, which can carry readings such as power, voltage and cumulative
            energy from many meters over one cable.
          </p>
          <p>
            On new work in England, Approved Document L Volume 2 expects energy sub-metering in new
            buildings, and in existing ones whenever fixed building services are added or extended.
            The aim is that at least 90% of the yearly energy use of every fuel can be put against
            an end use: heating, lighting, cooling and so on. It also asks for each tenant’s use to
            be measured, renewable outputs to be monitored separately, and, in buildings over 1000
            m² of total useful floor area, automatic meter reading and data collection. In practice
            that collection is often done by the BMS.
          </p>
          <p>
            The BMS uses meter data for monitoring and reporting, and sometimes for control.{' '}
            <strong>Load shedding</strong> is the classic example: the BMS watches electrical demand
            over each metering interval, predicts whether it will go over a set limit, and switches
            off lower-priority loads in groups to keep under it, restoring them once demand falls.
            Each load can be given a maximum time off and a minimum time on, so nothing is left off
            long enough to cause a problem.
          </p>
          <p>
            <strong>Generators and UPS</strong> sit in the same read-mostly family. A standby
            generator has a controller that starts it on mains failure, brings it up to speed and
            works with the transfer switch to pick up the load. A UPS has its own electronics
            deciding when to run from battery and when to go to bypass. Those are the systems that
            keep power on. The BMS is not in that chain.
          </p>
          <p>What the BMS usefully does is report. Typical points include:</p>
          <ul>
            <li>generator running, common fault, mains failed, on load;</li>
            <li>fuel tank level and low-fuel alarm;</li>
            <li>UPS on battery, on bypass, battery low, common alarm;</li>
            <li>energy readings from the generator or UPS output, if metered.</li>
          </ul>
          <p>
            One link goes the other way. The BMS itself needs power to keep reporting during an
            outage, so it is good practice for the head end, the outstations and the network
            equipment to be supplied from a UPS. Otherwise the system that should tell you the mains
            has failed goes dark at the same moment.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-2-metering"
          question="A gas meter pulse output is wired to the BMS, but the monthly totals are ten times what the supplier bills. What is the first thing to check?"
          options={[
            'Whether the meter needs a 4–20 mA signal instead',
            'Whether the BMS is controlling the gas valve',
            'The pulse value entered in the outstation',
            'Whether the cable is segregated from lighting circuits',
          ]}
          correctIndex={2}
          explanation="The outstation only counts pulses; it relies on the pulse value it has been given to turn them into units. A wrong pulse value gives totals that are consistently out by a fixed factor. Interference could add stray counts, but it would not produce a neat ten-times error."
        />

        <SectionRule />
        <ContentEyebrow>Blinds and shading</ContentEyebrow>

        <ConceptBlock
          title="Blinds: control with a weather eye"
          plainEnglish="Motorised blinds can be driven by the BMS or by their own shading controller, using the sun and the wind to decide where they should be."
          onSite="Blind motors are usually small loads switched in groups, with the decisions coming from a roof weather station. Make sure the wind sensor is actually wired and working, because that input is protecting the blinds."
        >
          <p>
            On buildings with motorised external or internal blinds, the shading system is often
            linked to the BMS, either through outstation outputs or through a dedicated shading
            controller with a data connection. The logic usually draws on a roof-mounted weather
            station reading temperature, sunlight, wind and rain.
          </p>
          <ul>
            <li>
              <strong>Sun and glare:</strong> lowering blinds on the façade the sun is on, cutting
              solar gain and the cooling load that goes with it.
            </li>
            <li>
              <strong>Wind:</strong> retracting external blinds in high wind so they are not
              damaged.
            </li>
            <li>
              <strong>Coordination:</strong> working with lighting and HVAC, so that closing the
              blinds does not simply switch on the lights and open the heating valves.
            </li>
          </ul>
          <p>
            The sensors that feed this, especially solar sensors, have to go on the right façade for
            the zone they serve. A solar sensor on the north wall telling the south blinds what to
            do is a common commissioning fault. Section 4.4 covers blinds and shading in more depth.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Fire, lifts, access and security</ContentEyebrow>

        <ConceptBlock
          title="Life safety and security: the BMS watches, other systems act"
          plainEnglish="The fire alarm shuts down the plant and releases the doors. The lift controller runs the lift. The access system decides who gets in. The BMS shows you what all of them are doing."
          onSite="If you are asked to put a fire or lift action through a BMS output, do not just wire it. Raise it with the designer and the fire alarm or lift contractor, because the answer is almost always that their system should do it."
        >
          <p>
            A BMS can be the one screen where facilities staff see the whole building, including
            systems it has no business controlling. Typical monitor-only connections are:
          </p>
          <ul>
            <li>
              <strong>Fire detection and alarm:</strong> fire, fault and pre-alarm status, often
              zone by zone.
            </li>
            <li>
              <strong>Lifts:</strong> running, out of service, fault, sometimes position.
            </li>
            <li>
              <strong>Access control and intruder alarms:</strong> door forced, door held open,
              system fault, set and unset states.
            </li>
            <li>
              <strong>CCTV:</strong> system health and alarm events.
            </li>
            <li>
              <strong>Specialist alarms:</strong> cold rooms and fridges, medical gas plant,
              temperature-controlled storage.
            </li>
          </ul>
          <p>
            <strong>Fire.</strong> In UK practice, the actions taken when the fire alarm operates
            (shutting down air handling plant, releasing held-open doors and locked exit doors,
            running smoke control fans) are driven by the fire detection and alarm system and its
            own interfaces. The BMS monitors the fire alarm status and may do non-life-safety
            follow-up, such as raising an alarm to the facilities team or logging which plant
            stopped. There should be a clear break between the two systems so that nothing on the
            BMS side can compromise the fire system.
          </p>
          <p>
            <strong>Lifts.</strong> The BMS connection to a lift controller should be restricted to
            monitoring, with no possible route for the BMS to influence how the lift operates.
          </p>
          <p>
            <strong>Access.</strong> The access system decides who can open which door, and the fire
            system decides when doors release in an emergency. The BMS can see door status and use
            access data as an occupancy signal, for instance bringing a floor’s heating on when the
            first person badges in.
          </p>
          <p>Section 6.5 covers fire alarm interfaces and how they are tested.</p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-2-fire"
          question="When the fire alarm operates, an AHU must stop. Which arrangement follows UK practice?"
          options={[
            'The BMS reads the fire alarm status and stops the AHU in software',
            'The AHU stops only once the BMS operator has acknowledged the fire alarm',
            'The fire system’s own interface stops it; the BMS reports it',
            'The AHU keeps running so that smoke is cleared from the building',
          ]}
          correctIndex={2}
          explanation="Fire shutdown is a life-safety action, so it is carried out by the fire alarm system through its own interface. The BMS sees the fire signal and the plant status and can log and report them. Leaving the stop to BMS software makes the safety action depend on a system that was not designed or tested for it."
        />

        <CommonMistake
          title="Giving the BMS a way into the lift controls"
          whatHappens="To save energy at night, a spare BMS output is wired to the lift controller&rsquo;s out-of-service input on a time schedule. Now the BMS can take a lift out of service, and so can a wrong schedule, a forced point or a strategy reloaded from an old backup, at a time when someone is relying on that lift. The lift contractor has no record that the link exists."
          doInstead="Keep the BMS link to a lift to monitoring: running, fault, out of service. Any change to how the lift operates belongs to the lift contractor&rsquo;s own controls. If a specification asks for a BMS command into a lift, raise it in writing with the designer before you wire anything."
        />

        <SectionRule />
        <ContentEyebrow>What the connection actually is</ContentEyebrow>

        <ConceptBlock
          title="The interface: contacts, signals and data links"
          plainEnglish="Whatever the system, the link to the BMS is one of a handful of things: a contact the BMS closes, a contact the BMS reads, a signal it measures, or a data cable."
          onSite="Label both ends of every interface with what it means: ‘AHU1 enable from BMS’, ‘Boiler 2 common fault to BMS’. An unlabelled pair of cores between two panels is a fault-finding afternoon waiting to happen."
        >
          <p>
            You will meet the same few physical interfaces over and over, whatever the system on the
            other end:
          </p>
          <ul>
            <li>
              <strong>Enable or command contact:</strong> the BMS closes a volt-free contact, often
              through an interposing relay, across the other system’s remote enable terminals. This
              is control.
            </li>
            <li>
              <strong>Status and fault contacts:</strong> the other system closes or opens a
              volt-free contact that the BMS reads on a digital input. This is monitoring.
            </li>
            <li>
              <strong>Analogue signals</strong>: 0–10 V or 4–20 mA, for things like valve positions
              and speed references. Covered in Section 2.1.
            </li>
            <li>
              <strong>Pulse inputs:</strong> from meters, counted by the outstation.
            </li>
            <li>
              <strong>Data links:</strong> BACnet, Modbus, M-Bus, KNX, LonWorks or DALI, carrying
              many points over one connection. Covered in Sections 5.2 to 5.4.
            </li>
          </ul>
          <p>
            A good strategy never trusts a command on its own. When the BMS starts a fan or a pump,
            it should read back a separate signal proving the plant actually responded (a current
            switch, a pressure switch, a run contact) and raise an alarm, or bring on the standby
            unit, if that proof does not arrive within a set time. A graphic showing the command
            alone tells you what the BMS asked for, not what happened.
          </p>
          <p>
            Volt-free contacts matter because the two systems usually run at different voltages and
            come from different contractors. A volt-free contact lets one system signal the other
            without connecting their supplies together. It does not make isolation simple: the
            contact still carries whichever system&rsquo;s voltage is wired across it. A
            &lsquo;volt-free&rsquo; contact in a chiller panel can be live from the BMS, and an
            interposing relay contact in the BMS panel can be live from the chiller. Section 1.6
            covers this.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Trusting the command instead of the proof"
          whatHappens="A pump is wired with a BMS start output and nothing else. The graphic shows it green and ‘running’ because the BMS has asked it to run. The pump’s overload has tripped, the heating circuit is cold, and nobody finds out until the occupants complain, because the BMS was only ever reporting its own instruction."
          doInstead="Treat every command as needing a separate proof: a run contact from the starter, a current switch, or a differential pressure switch across the pump or fan. Check it is on the points schedule, wire it, and make sure the strategy alarms or brings on the standby unit when the proof does not follow the command."
        />

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1 requires Band I and Band II circuits not to share a wiring system, and neither to share one with a circuit above low voltage, unless one of the permitted methods is used. Regulation 444.4.10 requires BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for bonding networks) to be applied to control, signalling and communication cabling inside buildings."
          meaning={
            <>
              <p>
                BMS field wiring is often Band I running alongside Band II lighting and power. Keep
                them segregated, or use a permitted method, for example a separate compartment of
                trunking, or insulating everything for the highest voltage present.
              </p>
              <p>
                BS 7671 does not give a separation distance of its own. Where distances apply to
                control and communication cabling, they come from the BS EN 50174 series that
                Regulation 444.4.10 points to. Section 2.6 covers control wiring in detail.
              </p>
            </>
          }
          cite="BS 7671:2018+A4:2026 Regulations 528.1 and 444.4.10"
        />

        <Scenario
          title="A generator, a BMS and a request that sounds reasonable"
          situation="You are second-fixing BMS interfaces in a new office block. The standby generator and its changeover panel have been installed by a specialist. The site manager asks you to wire a BMS output into the changeover panel ‘so the BMS can switch over to the generator if the mains goes’, and to bring the generator’s fault and running contacts back to the outstation while you are there."
          whatToDo="Wire the status points (running, common fault, mains failed, fuel level) to BMS digital and analogue inputs, as they are monitoring and are almost certainly on the points schedule. Do not wire a BMS output into the changeover panel. Check the points schedule and the generator specialist’s drawings: the changeover is handled by the generator controller and the transfer switch. Raise the request in writing with the designer so the decision is recorded."
          whyItMatters="Standby power exists for exactly the moment when other systems may not be working. Putting the BMS into the changeover path adds a dependency on an outstation, its power supply and its software to a function that already has its own dedicated control. The monitoring points, on the other hand, are what make sure someone knows the generator ran, failed, or is low on fuel."
        />

        <FAQ
          items={[
            {
              question: 'Is a BMS the same thing as the fire alarm panel, just bigger?',
              answer:
                'No. They are separate systems, usually installed and maintained by different contractors. The fire alarm system detects fire and carries out the life-safety actions. The BMS runs the building’s environmental plant and may monitor the fire alarm’s status so facilities staff see everything on one screen.',
            },
            {
              question:
                'Can I just put a boiler on a BMS output instead of using its own controls?',
              answer:
                'No. The boiler’s own controls handle firing and safety and must stay in charge of them. The BMS gives an enable signal to the manufacturer’s remote enable terminals and reads back status and faults. Wiring around the boiler controls removes protection the boiler relies on.',
            },
            {
              question: 'Does every BMS control lighting?',
              answer:
                'Not always. On many buildings lighting is run by its own lighting control system, often DALI, and the BMS either talks to it over a data link or only reads its status. Where the BMS does control lighting, the lights should still be operable locally if the BMS fails.',
            },
            {
              question: 'Who decides what is controlled and what is only monitored?',
              answer:
                'The designer, through the points schedule and the description of operation, agreed with the contractors for the other systems. As the electrician you wire to that schedule. If an interface you are asked to install would let the BMS drive a fire, lift or standby power function, raise it in writing rather than deciding on the spot.',
            },
            {
              question: 'Why do meters go on the BMS if nobody controls them?',
              answer:
                'Because the readings are the point. Approved Document L Volume 2 asks for energy sub-metering by end use and by tenant on new work, and on larger buildings for automatic meter reading. The BMS is often what collects, totals and trends that data, and it can use it for jobs like load shedding.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Ask of every connection: does the BMS control this, or only monitor it?',
            'The BMS controls HVAC plant directly, and often lighting and blinds.',
            'Boilers, chillers and other packaged plant keep their own safety controls; the BMS enables them and reads them back.',
            'Fire, lifts, access and security are monitor-only. The fire system carries out fire actions through its own interfaces.',
            'Generators and UPS are watched, not driven, and the BMS itself should be on a UPS so it keeps reporting.',
            'Meters are read by pulse or data link; get the pulse value right or every total will be wrong.',
            'BS 7671 Regulation 528.1 requires Band I and Band II to be segregated or to use a permitted method; it sets no distance of its own.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-1-section-1"
          prevLabel="What a building management system is"
          nextHref="/study-centre/upskilling/bms-module-1-section-3"
          nextLabel="Why buildings have one"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule1Section2;
