/**
 * BMS Module 4 · Section 5 — Metering and sub-metering
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches why buildings are sub-metered (so
 * energy can be attributed to an end use, a tenant or a renewable source, and so the BMS can
 * monitor, log and analyse it), what Approved Document L asks for, and the electrician's part:
 * pulse-output meters, Modbus and M-Bus meters, current transformers and the comms wiring that
 * gets readings to the BMS, then proving the numbers at commissioning. It replaces the old
 * "combined HVAC and lighting savings" page, which was built on invented savings percentages,
 * payback periods and a made-up case study; none of those figures survive here.
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

const TITLE = 'Metering and sub-metering | BMS Module 4.5 | Elec-Mate';
const DESCRIPTION =
  'Sub-metering for BMS work: what Approved Document L asks for, pulse, Modbus and M-Bus meters, fitting CTs safely, and proving every meter reads right before handover.';

const outcomes = [
  'Explain why a building is sub-metered, and what the BMS does with the readings',
  'Summarise what Approved Document L (England) expects of a sub-metering system in a non-domestic building',
  'Wire a pulse-output meter to a BMS input and say what has to be set at the controller for the total to be right',
  'Describe how a Modbus or M-Bus meter differs from a pulse meter, and what each needs on the comms side',
  'Install current transformers safely, including why a CT secondary must never be left open-circuit with current flowing',
  'Prove a metering installation at commissioning and record it for handover',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Approved Document L (England), what is the sub-metering of end uses such as heating, lighting and cooling meant to achieve?',
    options: [
      'A separate fiscal meter on every circuit so the supplier can bill each one',
      'Billing of every occupant directly by the energy supplier, floor by floor',
      'At least 90% of each fuel’s yearly use can be put against an end use',
      'A kWh meter on every final circuit above a set current rating',
    ],
    correctIndex: 2,
    explanation:
      'The aim is attribution: enough sub-metering that at least 90% of the yearly consumption of each fuel can be traced to a particular end use. It does not mean a meter on every circuit, and sub-meters are not fiscal meters used by the supplier for billing.',
  },
  {
    id: 2,
    question:
      'A new office over 1000 m² of total useful floor area is being fitted out. What does Approved Document L add for a building of that size?',
    options: [
      'Automatic meter reading and data collection',
      'A heat meter fitted on every radiator circuit in the building',
      'A second incoming supply dedicated to the metering system',
      'Manual meter readings logged weekly by the facilities team',
    ],
    correctIndex: 0,
    explanation:
      'Above 1000 m² of total useful floor area, the guidance expects meters to be read automatically and the data collected, which in practice usually means meters wired back to the BMS or a dedicated energy monitoring system. Manual weekly readings are exactly what it is moving away from.',
  },
  {
    id: 3,
    question:
      'A pulse-output electricity sub-meter has been wired to a BMS counter input. The BMS total climbs steadily but is a fixed multiple below the meter’s own register. What is the most likely cause?',
    options: [
      'The pulse wiring has been run in the same trunking as the supply cable',
      'The meter’s CTs are fitted on the wrong phases',
      'The counter input is wired with the wrong cable colours',
      'The pulse value set at the BMS does not match the meter',
    ],
    correctIndex: 3,
    explanation:
      'A steady, fixed ratio between the two totals points at scaling: each pulse stands for a set quantity, and the controller has been told a different one. Interference or a wiring fault tends to give erratic counts, not a clean multiple. Wrong-phase CTs give a wrong power figure, not a neat ratio against the meter’s own register.',
  },
  {
    id: 4,
    question:
      'Why is a comms meter (Modbus or M-Bus) often preferred to a pulse meter on a new job?',
    options: [
      'It needs no power supply of any kind to work',
      'It reports several values, not just a total',
      'It does not need an address or comms settings',
      'It never needs a gateway or interface to the BMS',
    ],
    correctIndex: 1,
    explanation:
      'A pulse output carries one thing: a count that stands for consumption. A comms meter can be read for energy, power, current, voltage and more from the same device. It still needs an address, it usually needs power, and an M-Bus meter often reaches the BMS through a gateway.',
  },
  {
    id: 5,
    question:
      'You are adding a Modbus RTU meter beyond the old end of an existing RS-485 daisy chain. What should happen to the line termination?',
    options: [
      'Switch in the terminator on every device on the chain',
      'Move it to the new far end and remove it from the old end',
      'Leave it at the old end device and add none at the new meter',
      'Fit one terminator in the middle of the bus to balance it',
    ],
    correctIndex: 1,
    explanation:
      'The serial line guidance puts a line termination near each of the two ends of the trunk and nowhere else. Extending the chain moves the end, so the terminator moves with it. Terminating every device, or leaving the old one in, loads the line and causes intermittent comms faults.',
  },
  {
    id: 6,
    question:
      'A CT-connected meter in a live panel needs replacing. The CT secondary leads go straight to the meter terminals with no shorting link. What is the safe approach?',
    options: [
      'Disconnect the CT leads quickly and tape them before anyone touches them',
      'Fit a fuse in the CT secondary so it is protected while you work',
      'Remove the meter first, then deal with the CT leads afterwards',
      'Isolate the primary, or short the secondary before breaking it',
    ],
    correctIndex: 3,
    explanation:
      'A CT with current in its primary acts as a current source. Open its secondary and it will drive the voltage up as far as it can, which is dangerous and can damage the CT. Either work with the primary dead, or short the secondary first. Fuses are never used in a CT secondary, because a blown fuse is exactly the open circuit you are trying to avoid.',
  },
  {
    id: 7,
    question:
      'On a three-phase CT-connected meter, the power reading on one phase looks wrong while current reads correctly on all three. What is the first thing to check?',
    options: [
      'CT direction, and that each CT pairs with its own phase',
      'The Modbus address set on the meter and on the BMS',
      'The pulse value set on the meter and at the controller',
      'The termination resistors at both ends of the RS-485 bus',
    ],
    correctIndex: 0,
    explanation:
      'Power needs current and voltage from the same phase, with the CT facing the right way. A CT fitted backwards, or a CT on L2 paired with the L3 voltage, gives believable current but a wrong power figure. Address, pulse value and termination affect how the reading gets to the BMS, not what the meter measures.',
  },
  {
    id: 8,
    question:
      'Approved Document L lists ways internal lighting can be metered. Which is one of them?',
    options: [
      'Estimating lighting use from the number of fittings and hours of occupancy',
      'Taking the main incoming meter reading and subtracting assumed small power',
      'A lighting system that calculates energy used and reports it to a BMS',
      'Metering lighting only on the parts of the building controlled by DALI',
    ],
    correctIndex: 2,
    explanation:
      'The options are dedicated lighting circuits each with a kWh meter, a local power meter in or alongside the lighting controllers, or a lighting management system that can work out the energy consumed and make it available to a BMS. Estimates and subtraction are not metering.',
  },
  {
    id: 9,
    question:
      'At commissioning, the sub-meters on a single-tenant building add up to noticeably more than the main incoming meter over the same period. What does that suggest?',
    options: [
      'Nothing; sub-meters always read higher than main meters',
      'The main meter is faulty and should be reported to the supplier',
      'A load is metered twice, or a meter is scaled wrongly',
      'The building has more renewable generation than expected',
    ],
    correctIndex: 2,
    explanation:
      'Sub-meters downstream of a main meter cannot honestly add up to more than it. A total above the main meter usually means a meter is measuring something already counted by another, or one meter’s scaling is wrong. Blaming the fiscal meter first is the expensive mistake.',
  },
  {
    id: 10,
    question:
      'You have added two new sub-meters during an extension to an existing building. What should happen to the building log book?',
    options: [
      'Nothing, as the log book is only written for new buildings',
      'The facilities manager should be told verbally',
      'The meters should be listed on the electrical installation certificate instead',
      'Information about the newly installed meters should be added to it',
    ],
    correctIndex: 3,
    explanation:
      'For work in existing buildings, Approved Document L expects information about any newly installed energy meters to go into a new or existing log book. A verbal handover is lost the day that person leaves, and the electrical certificate is not where an energy manager looks for a meter.',
  },
];

const BMSModule4Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 5"
        title="Metering and sub-metering"
        backTo="/study-centre/upskilling/bms-module-4"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This page covers why a building is split into metered end uses, what the regulations ask
          for, and how the meters you fit get their readings into the BMS. A meter that is wired or
          scaled wrongly gives the energy manager a figure that looks right and is not.
        </p>

        <TLDR
          points={[
            'Sub-metering lets energy be put against an end use, a tenant or a renewable source. Without it, the BMS can show a building’s total but not where it went.',
            'Approved Document L (England) expects new non-domestic buildings and new or extended fixed building services to be sub-metered so at least 90% of each fuel’s yearly use can be attributed, with automatic meter reading above 1000 m².',
            'Meters reach the BMS by pulse output (a count), or by comms such as Modbus or M-Bus (many values from one device). Each has its own set-up traps.',
            'CTs are current sources. Never open-circuit a CT secondary while its primary is carrying current, and never fuse one.',
            'A meter is not finished until its BMS reading has been proved against the meter itself and recorded for handover.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why buildings are sub-metered</ContentEyebrow>

        <ConceptBlock
          title="A total tells you how much; sub-metering tells you where"
          plainEnglish="The main meter says the building used a lot of electricity last night. The sub-meters say it was the chillers, on the third floor, in the tenant’s half."
          onSite="When you see a metering schedule on a job, read it as a map of questions the energy manager wants answered. Every meter on it exists because someone wants to know about one slice of the building."
        >
          <p>
            Every building has at least one <strong>fiscal meter</strong> for each fuel: the
            supplier&rsquo;s meter, used for billing, which belongs to the supplier or their meter
            operator and is not yours to touch. It tells you the total. On its own it cannot tell
            you whether a jump in consumption came from heating, lighting, a server room or a tenant
            who leaves everything on over the weekend.
          </p>
          <p>
            <strong>Sub-meters</strong> sit downstream of the fiscal meter and split that total up.
            They are the building owner&rsquo;s meters, and their job is not billing by the supplier
            but understanding: which end use is consuming what, which tenant is responsible for
            which share, and what the solar panels or CHP unit actually produced.
          </p>
          <p>
            This is where the BMS earns its keep. Approved Document L expects a building automation
            and control system, where one is required, to monitor, log and analyse energy use
            continuously and to spot losses of efficiency. It can only do that with meter data to
            work on. A BMS with no meters connected can tell you a boiler is running; it cannot tell
            you what that is costing, or that the building&rsquo;s overnight baseload has crept up
            since the last fit-out.
          </p>
          <p>
            The classic use of sub-meter data is the <strong>out-of-hours check</strong>. A building
            that is closed should use very little. If the lighting meter shows a steady load at
            three in the morning, something is switched on that should not be, and the meter is the
            only thing that will ever notice.
          </p>
        </ConceptBlock>

        <Pullquote>
          A meter that is installed but not wired back, or wired back but scaled wrongly, is worse
          than no meter at all: it gives people confidence in a number that is not true.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>What Approved Document L asks for</ContentEyebrow>

        <ConceptBlock
          title="Sub-metering is expected, not optional, on new non-domestic work in England"
          plainEnglish="If you build a new non-domestic building, or put in or extend fixed building services in an existing one, the guidance expects a sub-metering system that can account for nearly all of each fuel, by end use."
          onSite="On an extension or refit, the meters are part of the work, not an extra. If the drawings show new heating or lighting but no meters, ask the designer before first fix, not at handover."
        >
          <p>
            Approved Document L Volume 2 (England) covers non-domestic buildings. In the 2021
            edition, the one in force now, paragraph 5.17 deals with energy sub-metering (it becomes
            paragraph 4.19 when the 2026 edition takes effect on 24 March 2027). It applies to new
            buildings, and to existing buildings when fixed building services are provided or
            extended. It sets out what the metering system should achieve, in five parts:
          </p>
          <ul>
            <li>
              <strong>End uses.</strong> Heating, lighting, cooling and the other end-use categories
              are sub-metered so that at least 90% of the annual consumption of each fuel can be
              attributed to a particular end use.
            </li>
            <li>
              <strong>Forecast against actual.</strong> The metering should let the building&rsquo;s
              forecast energy use be compared with what it really uses, and support energy
              reporting. Basing the metering strategy on a design-stage energy forecast is one way
              to meet this.
            </li>
            <li>
              <strong>Tenants.</strong> The energy used by each tenant in the building should be
              measured. If a sub-meter&rsquo;s readings will be used to recharge a tenant, it should
              be a meter approved for billing use, not a general panel meter. Check the metering
              schedule says which meters are for recharging.
            </li>
            <li>
              <strong>Renewables.</strong> The output of any renewable system should be monitored on
              its own.
            </li>
            <li>
              <strong>Automatic reading.</strong> Where the total useful floor area is greater than
              1000 m², automatic meter reading and data collection should be provided.
            </li>
          </ul>
          <p>
            The same document adds metering requirements in specific places: CHP plant metered for
            hours run, electricity generated and fuel supplied, and internal lighting metered by one
            of a set of listed methods (below). From 24 March 2027 the 2026 edition also expects
            buildings to be designed so a smart meter can be installed and commissioned.
          </p>
          <p>
            Wales and Scotland have their own building regulations guidance. The principle is the
            same, but check the document for the nation you are working in rather than assuming the
            English wording applies.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L, Volume 2 (England), 2021 edition"
          clause="Paragraph 5.17: new buildings, and work that provides or extends fixed building services, should have an energy sub-metering system. End uses such as heating, lighting and cooling should be metered so at least 90% of each fuel’s annual use can be attributed; each tenant’s use should be measured; renewable outputs monitored separately; and automatic meter reading and data collection provided where total useful floor area exceeds 1000 m²."
          meaning="When you install or extend heating, cooling, lighting or other fixed services in a non-domestic building in England, the meters that let that energy be attributed are part of the job."
          cite="ADL Vol 2 (2021) para 5.17, see also para 5.8; paras 4.19 and 4.10 in the 2026 edition from 24 March 2027"
        />

        <ConceptBlock
          title="Lighting has its own list of acceptable methods"
          plainEnglish="Lighting energy can be metered with a kWh meter on dedicated lighting circuits, a power meter in or next to the lighting controls, or a lighting control system that works the energy out and passes it to the BMS."
          onSite="This is where your circuit design matters. If a lighting circuit also feeds a few sockets, the lighting meter on it is no longer measuring lighting."
        >
          <p>
            Approved Document L gives three ways to meter internal general and display lighting
            (paragraph 6.61 of the 2021 edition; 5.66 from 24 March 2027):
          </p>
          <ul>
            <li>
              <strong>Dedicated lighting circuits</strong>, each with its own kilowatt-hour meter.
            </li>
            <li>
              <strong>A local power meter</strong> built into, or coupled to, the controllers of a
              lighting management system.
            </li>
            <li>
              <strong>A lighting management system</strong> that can calculate the energy it has
              consumed and make that figure available to a building management system.
            </li>
          </ul>
          <p>
            The first option depends directly on the electrical design. Metering by circuit only
            works if the circuits are separated by end use: lighting on lighting circuits, small
            power on small power circuits, mechanical plant from its own board or ways. Mixing them
            is the quickest way to make a sub-metering system meaningless, and it usually happens on
            site, one convenient spur at a time.
          </p>
          <p>
            The third option ties back to Section 4.1: a lighting control system that reports its
            own energy use is a meter in software, and it still needs proving at commissioning like
            any other.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-5-attribution"
          question="During a refit, a site manager asks you to take a feed for two new sockets from the nearest lighting circuit, which has its own sub-meter. Why is that a problem beyond the usual circuit design questions?"
          options={[
            'Socket outlets cannot legally be connected to a circuit with a meter on it',
            'The lighting meter starts counting small power, so its figure is wrong',
            'The sub-meter will stop recording as soon as a socket load is added',
            'The BMS will raise a nuisance alarm on that lighting circuit every night',
          ]}
          correctIndex={1}
          explanation="The meter keeps working; it just stops meaning what its label says. Sub-metering relies on circuits being split by end use. A socket on a lighting circuit puts small power into the lighting figure, and nobody looking at the BMS will ever know."
        />

        <SectionRule />
        <ContentEyebrow>Pulse-output meters</ContentEyebrow>

        <ConceptBlock
          title="A pulse is a parcel of consumption, and the BMS has to know its size"
          plainEnglish="Each time the meter counts a set amount of energy or water, it closes a contact once. The BMS counts the clicks and multiplies by the size of each one."
          onSite="Before you leave the panel, write the pulse value on the meter schedule and the point label. Nobody can recover it later without going back to the meter."
        >
          <p>
            The simplest way to get a meter into a BMS is its <strong>pulse output</strong>. Gas,
            water, electricity and heat meters can all be fitted with one. Each pulse stands for a
            fixed quantity of whatever the meter measures, and the outstation stores the pulses as a
            running total. The software then scales that count into proper units, kWh or cubic
            metres, so the operator sees consumption rather than a pile of clicks.
          </p>
          <p>
            The scaling is the weak point. The pulse value is set or printed on the meter and has to
            be entered separately at the controller. If the two disagree, the BMS total is wrong by
            a fixed ratio, forever, and it looks perfectly healthy on a trend because it still rises
            and falls at the right times.
          </p>
          <p>Wiring points to watch:</p>
          <ul>
            <li>
              <strong>Output type.</strong> Some pulse outputs are volt-free contacts; many are
              transistor outputs that are sensitive to polarity. Check the meter&rsquo;s terminal
              markings and the controller input type before you connect.
            </li>
            <li>
              <strong>Input type.</strong> Use an input the controller is set up to count. An
              ordinary digital input that is only scanned now and then can miss short pulses, and
              the total quietly under-reads.
            </li>
            <li>
              <strong>Segregation.</strong> Pulse wiring is normally an extra-low voltage signal
              circuit, which puts it in Band I. Keep it out of wiring systems carrying Band II
              circuits unless one of the methods BS 7671 Regulation 528.1 permits is used, and route
              it away from interference sources so noise is not counted as consumption.
            </li>
            <li>
              <strong>Totals do not survive everything.</strong> A pulse count lives in the
              controller. A controller replaced, reloaded or reset can lose it, so the meter&rsquo;s
              own register is always the reference.
            </li>
          </ul>
        </ConceptBlock>

        <CommonMistake
          title="Assuming the pulse value instead of reading it"
          whatHappens="The meter is wired to a counter input and the pulse value is left at whatever the controller strategy defaulted to. The BMS shows consumption that rises and falls with occupancy, so nobody questions it. Months later, an energy report built on it is out by a fixed factor and every decision based on it is wrong."
          doInstead="Read the pulse value from the meter itself (its display, label or set-up menu), enter it at the controller, and then prove it: note the meter register and the BMS total, run a known load or wait for a measurable amount of use, and check both have moved by the same amount."
        />

        <SectionRule />
        <ContentEyebrow>Modbus and M-Bus meters</ContentEyebrow>

        <ConceptBlock
          title="Comms meters report many values from one device"
          plainEnglish="Instead of clicking once per unit, a comms meter answers questions. The BMS asks for energy, power, current or voltage, and the meter replies with the number."
          onSite="Two settings make or break a comms meter: its address, and its comms parameters. Set both before the panel lid goes back on, and write them on the meter schedule."
        >
          <p>
            A pulse output carries one thing, a count. A <strong>comms meter</strong> holds its
            readings in memory and gives them up when asked. One device can report total energy,
            instantaneous power, current and voltage per phase, and more, and the reading comes
            straight from the meter&rsquo;s own register, so there is no pulse scaling to get wrong.
            You will meet two protocols most often on metering:
          </p>
          <ul>
            <li>
              <strong>Modbus RTU</strong> runs over an RS-485 serial line, usually two-wire plus a
              common. Each meter is a slave (server) with its own unique address between 1 and 247,
              and the controller or gateway is the master that polls them in turn. Readings sit in
              16-bit registers; input registers are read-only, holding registers can be read and
              written. Which register holds which value is in the meter maker&rsquo;s register map,
              and the controls engineer needs it.
            </li>
            <li>
              <strong>Modbus TCP</strong> carries the same register model over Ethernet, which puts
              the meter on the building network and brings the network questions in Section 5.6 with
              it.
            </li>
            <li>
              <strong>M-Bus</strong> (meter-bus) is a two-wire bus designed specifically for reading
              utility meters. It is common on heat and water meters. A master unit powers the bus
              and reads each meter by its address, and it usually reaches the BMS through a gateway
              that translates the readings into something the BMS speaks.
            </li>
          </ul>
          <p>
            What the electrician owns here is the physical layer: the right cable, correct polarity
            where the protocol cares, the common connected through, screened cable with the screen
            connected to protective earth at one end of each cable run (unless the designer
            specifies otherwise), and a neat, labelled daisy chain. What the controls engineer owns
            is mapping the registers into BMS points. The two meet at the address and comms
            settings, which must be agreed and recorded.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Wiring an RS-485 metering bus"
          plainEnglish="One cable runs from device to device like a string of beads, with a terminating resistor at each of the two far ends and nowhere else."
          onSite="When you extend an existing bus, the end moves. Move the terminator with it, or switch it off on the old end device and on at the new one."
        >
          <p>
            The Modbus serial line guidance describes a single <strong>trunk cable</strong> with
            devices connected along it, either directly (a daisy chain) or by short drop cables. Its
            key physical rules:
          </p>
          <ul>
            <li>
              <strong>Termination at both ends.</strong> A line termination is fitted near each of
              the two ends of the bus to stop signal reflections. Not at every device, and not in
              the middle.
            </li>
            <li>
              <strong>Biasing in one place.</strong> If any device needs the line polarised, one
              pair of pull-up and pull-down resistors is fitted for the whole bus, not one per
              device.
            </li>
            <li>
              <strong>The common goes everywhere.</strong> A third conductor, the common, links all
              devices. It is connected to protective earth at one point only for the whole bus,
              generally at the master.
            </li>
            <li>
              <strong>Short drops.</strong> Branches off the trunk are kept short; a long spur is a
              reflection waiting to happen.
            </li>
          </ul>
          <p>
            Section 5.3 goes into Modbus properly, including fault finding. For now, the habit to
            build is that a metering bus is a communications cable, not a control wire, and it is
            installed to the comms rules, not to whatever was convenient.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-5-modbus-address"
          question="You fit three new Modbus meters on an existing bus. One of them shows the same readings as an older meter elsewhere on the chain, and both values flicker. What is the likeliest cause?"
          options={[
            'Too many terminators have been switched in along the bus length',
            'The pulse value on the new meter has been set to the wrong figure',
            'The new meter has been left at the same address as the older one',
            'The common conductor has been earthed at the master controller',
          ]}
          correctIndex={2}
          explanation="Every slave on a Modbus serial line needs a unique address. Two meters at the same address both answer the same request, so the master sees colliding or alternating replies. Meters often leave the factory at a default address, which is why this happens so often on extensions."
        />

        <SectionRule />
        <ContentEyebrow>Current transformers</ContentEyebrow>

        <ConceptBlock
          title="A CT turns a large current into a small one the meter can read"
          plainEnglish="The conductor passes through a ring. The ring has many turns of fine wire wound on it, and those turns deliver a small current in proportion to the big one."
          onSite="Check the CT ratio on the label against the meter’s set-up. A meter told it has 200:5 CTs when 400:5 are fitted reads half the real current, and everything downstream inherits the error."
        >
          <p>
            Most sub-meters on larger circuits are <strong>CT-connected</strong>: the meter does not
            carry the load current itself. A current transformer is usually a toroidal iron core
            with the line conductor passing once through the middle as a one-turn primary, and a
            secondary winding of many turns around the core. The ratio is written as full line
            current to the secondary current, usually 5 A or 1 A, so a 400:5 CT delivers 5 A when
            400 A flows in the conductor. The meter has to be set for the same secondary current as
            the CTs fitted.
          </p>
          <p>
            Two styles are common on site. <strong>Solid-core</strong> CTs need the conductor
            threaded through them, so they go in when the cable or busbar is installed or
            disconnected. <strong>Split-core</strong> CTs open and clip round an existing conductor,
            which makes them popular on retrofits; you are still working in a panel, and the usual
            rules on isolation and live working apply.
          </p>
          <p>
            Not every CT delivers a current. Some metering CTs are made to give a small voltage
            output instead and are matched to particular meters. They are not interchangeable with
            current-output CTs; use exactly the type the meter maker specifies.
          </p>
          <p>
            For a power or energy reading, the meter needs current and voltage from the{' '}
            <strong>same phase</strong>, and the CT fitted the <strong>right way round</strong>. CTs
            carry polarity marks for this reason. A CT turned backwards, or a CT on one phase paired
            with the voltage reference from another, still shows a sensible current but a wrong
            power and energy figure for that phase.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Never open-circuit a CT secondary while current flows in the primary"
          plainEnglish="A working CT will push its current through whatever it is connected to. Take away the path and it drives the voltage up trying to push it through air. That voltage can hurt you and can wreck the CT."
          onSite="Before disconnecting anything on a CT circuit, ask: is current flowing in that primary? If it is, short the secondary first. If there is no shorting link, isolate the primary."
        >
          <p>
            An energised CT behaves as a <strong>current source</strong>. Connected to a meter,
            which is close to a short circuit, it works gently, delivering its current with very
            little voltage. Open the secondary circuit and it will develop as much voltage as it can
            in an attempt to keep the current flowing. Because the secondary has many more turns
            than the primary, a CT steps voltage up as it steps current down, and an open-circuited
            CT on a loaded conductor can produce a dangerously high voltage at its terminals.
          </p>
          <p>
            Shorting a CT secondary, on the other hand, does no harm: the current is still limited
            by the ratio. That is why CT circuits are often fitted with{' '}
            <strong>shorting links or test blocks</strong>, so the secondary can be shorted before
            any other wire is disconnected. It is also why you will never see a fuse in a CT
            secondary. A fuse that blows is exactly the open circuit you are trying to avoid.
          </p>
          <p>Practical rules:</p>
          <ul>
            <li>Fit CTs with the primary dead wherever you can.</li>
            <li>
              Connect the secondary leads to the meter, or short them, before the primary is
              energised.
            </li>
            <li>
              To change a meter on a live system, short the CT secondaries at the test block first.
              No test block means isolating the primary.
            </li>
            <li>
              Specify shorting terminals on new CT-connected metering, so the next person has a safe
              way in.
            </li>
          </ul>
        </ConceptBlock>

        <CommonMistake
          title="Landing the CTs and the voltage references in different orders"
          whatHappens="The CTs are fitted L1, L2, L3 at the busbars, but the voltage references are taken from a terminal rail where the phases were wired in a different order. Every phase shows a believable current, so the meter is signed off. The power and energy figures are wrong, and the BMS reports them faithfully for years."
          doInstead="Trace each CT and its voltage reference to the same phase before you terminate, and check the CT faces the way its polarity marks require. Then check each phase on the meter shows a sensible power, not just current, with a known load running."
        />

        <Scenario
          title="Replacing a failed panel meter on a running chiller supply"
          situation="A CT-connected meter on the chiller supply in a plant room has failed, and the client does not want the chiller off during the working day. The CT secondaries run straight from three window CTs to the meter terminals. There are no shorting terminals in the panel, and the meter’s voltage connections are protected at the panel."
          whatToDo="Do not disconnect the CT leads with the chiller running. Agree a short shutdown with the client and the controls contractor so the chiller supply can be isolated, prove it dead, then swap the meter. While it is off, fit shorting terminal blocks in the CT secondaries so this never needs a shutdown again. Before re-energising, check the new meter’s CT ratio setting and phase wiring against the CT labels. Afterwards, check each phase shows a sensible current and power, and confirm the BMS reading matches the meter display."
          whyItMatters="Opening a loaded CT secondary is one of the few routine-looking jobs that can put a dangerous voltage on terminals you expected to be at a few volts. A short planned shutdown costs the client an hour; a mistake here costs much more. Fitting shorting blocks turns a hazardous job into a routine one for whoever comes next."
        />

        <InlineCheck
          id="bms-4-5-ct-fuse"
          question="A colleague suggests fitting a small fuse in each CT secondary lead 'to protect the meter'. Why is that wrong?"
          options={[
            'Fuses add resistance that makes the meter over-read',
            'A blown fuse would leave the CT secondary open-circuit',
            'CT secondary currents are too small to blow any fuse',
            'Fuses are only wrong in the CT on the neutral conductor',
          ]}
          correctIndex={1}
          explanation="A CT secondary is safe shorted and dangerous open. A fuse can only ever fail open, so it converts a harmless fault into the hazardous one. Protection belongs on the meter’s voltage connections, not in the CT circuit."
        />

        <SectionRule />
        <ContentEyebrow>Heat and water meters</ContentEyebrow>

        <ConceptBlock
          title="Heat meters measure flow and temperature difference, and the regulations care about them"
          plainEnglish="A heat meter measures how much water went round and how much hotter the flow was than the return, and works out the heat delivered from the two."
          onSite="You usually wire the heat meter’s power and comms, not the flow sensor. The pipework parts belong to the mechanical installer; agree who does what before either of you starts."
        >
          <p>
            A <strong>heat meter</strong> has three parts: a flow sensor in the pipe, a matched pair
            of temperature sensors on flow and return, and a calculator that combines them into
            energy. Cooling is metered the same way. The calculator is the part you connect: power
            where it needs it, and a pulse output, M-Bus or Modbus connection back to the BMS or
            metering system.
          </p>
          <p>
            Heat meters on <strong>heat networks</strong> (district and communal heating, where one
            heat source serves several buildings or dwellings) fall under the Heat Network (Metering
            and Billing) Regulations 2014. In Great Britain these were partly revoked in January
            2026; in Northern Ireland the original regulations still apply. Under those regulations,
            meters must accurately measure, memorise and display each final customer&rsquo;s
            consumption of heating, cooling or hot water, and since January 2026 heat cost
            allocators no longer count as compliant devices in Great Britain. Those duties sit with
            the heat supplier, not with you, and the rules are expected to change further as heat
            network technical standards are introduced. The practical point for an electrician is
            that a heat meter on a network may be a regulated device, so do not move, swap or
            disconnect one without the operator knowing.
          </p>
          <p>
            Water meters and gas meters usually reach the BMS by pulse output or M-Bus. The same
            rules apply: record the pulse value or the address, and prove the reading.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Proving it and handing over</ContentEyebrow>

        <ConceptBlock
          title="Every meter is proved against itself, and the tree is proved against the main meter"
          plainEnglish="Check each BMS reading against the meter’s own display. Then check that the meters below the main meter add up to no more than it does."
          onSite="Take a photo of each meter display next to the matching BMS screen at the same moment. It is the quickest commissioning record there is."
        >
          <p>
            Commissioning a metering system has two levels. The first is each meter on its own: the
            value on the BMS must match the meter&rsquo;s register, and a pulsed input must be
            processed to show the correct value. That means comparing the two at a start point and
            again after measurable consumption, not just glancing at the BMS to see that a number
            has appeared.
          </p>
          <p>A sensible per-meter check runs like this:</p>
          <ul>
            <li>
              Confirm the meter serves what its label and the schedule say, by tracing it or by
              switching the load and watching the reading respond.
            </li>
            <li>
              On CT-connected meters, check the CT ratio setting against the CT label, and check
              each phase shows a sensible current and a sensible power, not just a total.
            </li>
            <li>
              On pulse meters, note the meter register and the BMS total, let a measurable amount of
              consumption pass, and confirm both moved by the same amount.
            </li>
            <li>
              On comms meters, confirm the BMS point is reading the value you think it is: energy,
              not power; the right phase; the right units.
            </li>
          </ul>
          <p>
            The second is the <strong>meter tree</strong>. Sub-meters are arranged under the main
            meter like branches, and over the same period the meters on a branch cannot honestly add
            up to more than the meter above them. A total that is too high usually means a load is
            counted twice or a meter is scaled wrongly. A total that is too low can be normal, since
            some small loads may be left unmetered, but it should be explainable; a large
            unexplained gap means something significant is not on any meter.
          </p>
          <p>
            Then record it. Each meter needs an entry on the metering schedule: what it serves,
            where it is, its type, its CT ratio, its pulse value or comms address, and the BMS point
            it maps to. Approved Document L expects details of newly installed energy meters to be
            added to the building log book when work is done on an existing building, and the log
            book for a new building larger than 1000 m² carries an energy forecast that the metering
            is there to check against.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-5-prove"
          question="At handover, the BMS shows a value for every new sub-meter. The client asks if the metering is commissioned. What do you still need before you can say yes?"
          options={[
            'Nothing more, because a value showing on the BMS proves the meter works',
            'A screenshot of every BMS meter page saved to the O&M manual',
            'Confirmation that every meter is shown on the as-fitted drawings',
            'Each reading proved against its meter, and the tree against the main',
          ]}
          correctIndex={3}
          explanation="A value on screen proves comms, not accuracy. Scaling, CT ratio and phase errors all produce believable numbers. Proving each meter against its own register, then checking the tree adds up, is what turns installed meters into commissioned ones."
        />

        <FAQ
          items={[
            {
              question: 'Can I put a sub-meter on the supply side of the fiscal meter?',
              answer:
                'No. Everything up to and including the fiscal meter belongs to the supplier or their meter operator. Sub-meters go on the building side, after the main switch, normally at distribution boards or on the outgoing ways that feed each end use.',
            },
            {
              question: 'Pulse or Modbus: which should I fit?',
              answer:
                'Fit what the metering schedule specifies, since the controls engineer will have planned inputs and integration around it. Where you are asked to advise, a comms meter gives more information and no pulse scaling to get wrong, while a pulse output is simple and widely supported. Either is fine if it is set up and proved properly.',
            },
            {
              question: 'Do split-core CTs mean I can fit meters without isolating?',
              answer:
                'They mean the conductor does not need disconnecting. They do not make working inside a live panel safe. Treat a split-core CT installation like any other work in a board: isolate where you can, and where you genuinely cannot, plan the live work properly and short or connect the CT secondary before the jaws close on a loaded conductor.',
            },
            {
              question: 'Who sets the Modbus address and comms settings on a new meter?',
              answer:
                'Agree it before installation. Often the controls engineer issues an address schedule and the electrician sets each meter as it is installed, because the meter is easier to reach then. Whoever does it, the settings go on the metering schedule and on a label at the meter.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Sub-meters split the fiscal meter’s total by end use, tenant and renewable source, so the BMS can monitor, log and analyse where energy goes.',
            'Approved Document L (England) expects sub-metering on new non-domestic buildings and on new or extended fixed building services: at least 90% of each fuel attributable, tenants metered, renewables separate, and automatic reading above 1000 m².',
            'Sub-metering only works if circuits are kept separate by end use. One convenient spur can make a meter meaningless.',
            'Pulse meters need the pulse value matched at the controller; comms meters need a unique address, correct comms settings and a properly terminated bus.',
            'A CT is a current source: never open-circuit its secondary with current in the primary, never fuse it, and fit shorting terminals on new work.',
            'Power readings need each CT the right way round and paired with the voltage from its own phase.',
            'Commissioning means proving each BMS reading against its meter and the meter tree against the main meter, then recording every meter for handover and the log book.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-4-section-4"
          prevLabel="Blinds and shading"
          nextHref="/study-centre/upskilling/bms-module-5"
          nextLabel="Module 5: Networks and protocols"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule4Section5;
