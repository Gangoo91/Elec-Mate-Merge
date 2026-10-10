/**
 * BMS Module 3 · Section 1 — The plant a BMS runs
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Walks the plant a BMS commands and watches —
 * boilers, heat pumps, chillers, pumps, air handling units and the terminal units at the end of
 * the line (fan coils and VAV boxes) — through one idea: packaged plant keeps its own controller
 * and its own safeties, and the BMS supervises from above with an enable, a setpoint, and a set of
 * status, fault and measured points. The old page carried an invented shopping-centre case study
 * with a "25% reduction" figure, "power varies as the cube of speed" arithmetic, and a list of
 * boiler safeties presented as BMS functions; all gone. Control duties are now tied to the
 * Approved Document L Vol 2 (England, 2026) paragraphs that set them, and the AHU points come
 * from a real points-schedule shape.
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

const TITLE = 'The plant a BMS runs | BMS Module 3.1 | Elec-Mate';
const DESCRIPTION =
  'Boilers, heat pumps, chillers, pumps, AHUs, fan coils and VAV boxes: what each does, what its own controls keep, and what the BMS commands and watches.';

const outcomes = [
  'Trace a building’s heating and cooling from source, through distribution, to the terminal unit in the room',
  'Separate what a packaged boiler, heat pump or chiller controls for itself from what the BMS commands and monitors',
  'Describe the start sequence that proves water flow before a chiller or boiler is allowed to run',
  'Explain duty and standby pumps, changeover on failure, and why run hours are logged',
  'Name the points a BMS typically has on an air handling unit and say what each one tells you',
  'Tell a fan coil unit from a VAV box, and explain how the zones drive the central plant',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A packaged gas boiler is wired to a BMS outstation. Which job stays with the boiler’s own controls rather than the BMS?',
    options: [
      'Supervising flame safety and the firing of the burner',
      'Deciding the time of day the heating comes on',
      'Logging the boiler’s hours run for maintenance',
      'Choosing which boiler leads in a multi-boiler sequence',
    ],
    correctIndex: 0,
    explanation:
      'The manufacturer’s burner controls supervise ignition, flame proving and safe firing. The BMS sits above that: it enables the boiler, decides when heat is needed, sequences several boilers and logs hours run. A BMS that tried to do flame supervision would be doing a safety job in general-purpose software.',
  },
  {
    id: 2,
    question:
      'A chiller strategy has been called by the schedule. The chilled water pump shows running, but the BMS has not switched on the chiller enable output and no fault is shown. What should you check first?',
    options: [
      'The chiller’s refrigerant charge, in case it is low',
      'Proof of chilled water flow from the flow switch',
      'The chiller’s own compressor overload relay',
      'The chilled water flow temperature setpoint',
    ],
    correctIndex: 1,
    explanation:
      'The strategy starts the pump, waits, and only switches on the chiller enable once flow is proved. An enable output that stays off with the pump running points at the flow proving signal. Refrigerant and overload problems are inside the chiller: they would show as a fault on its panel and would not stop the BMS switching its own output. The setpoint changes how hard the chiller works, not whether it is enabled.',
  },
  {
    id: 3,
    question:
      'Under Approved Document L Vol 2 (England, 2021 edition, in force now), a boiler system of more than 100 kW should have optimum start/stop control and which of the following?',
    options: [
      'A dedicated BMS outstation fitted to each individual boiler',
      'A flue gas analyser wired back to the BMS for trend logging',
      'High/low firing, or several boilers in sequence',
      'A fully modulating burner on every boiler in the plant',
    ],
    correctIndex: 2,
    explanation:
      'Paragraph 6.7 asks for optimum start/stop control with night setback or frost protection outside occupied periods, plus either a two-stage high/low firing facility or multiple boilers with sequence control for efficient part-load running. Fully modulating burners come in at the larger end (paragraph 6.8, gas-fired and multi-stage oil-fired boilers over 500 kW), so that option is a tempting overreach. From 24 March 2027 the same rules become paragraphs 5.11 and 5.12, under boilers in existing buildings.',
  },
  {
    id: 4,
    question: 'A duty pump trips. What should a properly configured BMS do with the standby pump?',
    options: [
      'Nothing at all until an operator has acknowledged the alarm',
      'Run it at a reduced speed until the duty pump has been reset',
      'Start it only if the duty pump trip clears within a set time',
      'Start it automatically and alarm the duty pump',
    ],
    correctIndex: 3,
    explanation:
      'Standby plant exists to take over automatically when duty plant fails, with the failure alarmed so somebody fixes it. Waiting for an operator to acknowledge first defeats the point of having a standby, especially out of hours.',
  },
  {
    id: 5,
    question:
      'On an AHU points schedule you find "supply fan run" listed as an output and "supply fan tripped" listed as an input. Why both?',
    options: [
      'The output goes to the fire alarm panel and the input goes to the BMS',
      'One is the BMS command; the other is what the plant reports',
      'They are duplicate points kept on the schedule for redundancy',
      'The input sets the fan speed and the output reads it back again',
    ],
    correctIndex: 1,
    explanation:
      'A command tells the starter what the BMS wants. A status or trip input tells the BMS what actually happened. Without the feedback, the BMS would believe the fan was running because it asked it to, even with the overload tripped.',
  },
  {
    id: 6,
    question:
      'An AHU fan motor rated 1.5 kW is used for general air distribution in a new building in England. What does Approved Document L expect?',
    options: [
      'It should be fitted with a variable speed drive',
      'It should run at fixed speed for stable airflow',
      'It should be switched by the fire alarm only',
      'It should be star-delta started from the BMS',
    ],
    correctIndex: 0,
    explanation:
      'Paragraph 6.49 (5.53 from 24 March 2027) expects variable speed drives on general air distribution fans rated above 1100 W, and 1.5 kW is above that. Star-delta is a starting method, not a way of matching airflow to demand, and the fire alarm stopping a fan is a separate matter from speed control.',
  },
  {
    id: 7,
    question: 'What is the main difference between a fan coil unit and a VAV box?',
    options: [
      'A fan coil heats with water; a VAV box heats with electric elements',
      'A fan coil treats room air itself; a VAV box meters AHU air',
      'A fan coil needs a ducted AHU supply; a VAV box needs none at all',
      'A fan coil varies its airflow with a damper; a VAV box uses a fan',
    ],
    correctIndex: 1,
    explanation:
      'A fan coil has its own fan and water coil and treats the room air itself. A VAV box usually has no fan: it modulates a damper to vary how much conditioned air from the AHU reaches the room. Either can carry water or electric reheat, so the heating medium is not the difference. Option D swaps the two.',
  },
  {
    id: 8,
    question: 'As VAV boxes across a floor close their dampers, what should happen at the AHU?',
    options: [
      'The supply fan stays at full speed and the relief damper opens',
      'The cooling valve opens fully to compensate',
      'The supply fan slows to hold duct pressure at its setpoint',
      'The AHU switches off until every box opens again',
    ],
    correctIndex: 2,
    explanation:
      'The AHU controls supply duct pressure. As boxes close, pressure rises and the fan slows to bring it back down, so the fan only moves the air the rooms are asking for. Running flat out against closing dampers wastes energy and can make the boxes noisy.',
  },
  {
    id: 9,
    question:
      'A new building has an air-source heat pump with gas boilers as back-up. What does Approved Document L expect of their controls?',
    options: [
      'A separate time clock for each heat source',
      'One control system so they operate together',
      'The BMS taking over the heat pump defrost',
      'The boilers always leading, heat pump second',
    ],
    correctIndex: 1,
    explanation:
      'Where a building has other heat sources as well as a heat pump, they should all be brought into a single control system so they work together (paragraph 6.46; 5.4 from 24 March 2027). Separate clocks let them fight each other. Defrost stays with the heat pump’s own controls. Always leading on the boilers throws away the point of the heat pump.',
  },
  {
    id: 10,
    question:
      'A fire alarm activates. Which system should be responsible for stopping the AHU supply fan?',
    options: [
      'The BMS, once it has read the fire alarm status input point',
      'The AHU’s own frost protection thermostat on the coil',
      'The fire alarm system, through its own interface',
      'Whichever operator happens to be logged in at the head end',
    ],
    correctIndex: 2,
    explanation:
      'Plant shutdown on fire is driven by the fire detection and alarm system through its own interfaces. The BMS monitors the fire alarm status and may do non-life-safety follow-up, but it is not the life-safety path, and no BMS hand or override should be able to restart a fan the fire strategy has stopped.',
  },
];

const BMSModule3Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 1"
        title="The plant a BMS runs"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Boilers, heat pumps, chillers, pumps, air handling units and the units in the rooms: what
          each one does, what it controls for itself, and what the BMS is actually there to command
          and watch.
        </p>

        <TLDR
          points={[
            'Most plant arrives with its own controller and its own safeties. The BMS supervises it: enable, setpoint, and a set of status, fault and measured points coming back.',
            'Think in three layers: a source makes heat or cooling, pumps and fans distribute it, and a terminal unit in the room delivers it.',
            'Order matters. Pumps run and water flow is proved before a chiller or boiler is allowed to fire up.',
            'The AHU is the biggest single collection of points on most jobs: temperatures, fan commands and trips, dampers, valves, filters.',
            'The zones drive the plant. When no room is asking for heat or cooling, central plant should be off.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The shape of it</ContentEyebrow>

        <ConceptBlock
          title="Source, distribution, terminal: every system has the same three layers"
          plainEnglish="Something makes the heat or the cooling, something moves it round the building, and something in the room hands it over. Find those three and you can read any plant room."
          onSite="Walk the plant room in the order the energy flows: boiler or chiller, then the pumps and headers, then out to the AHUs and the risers. The points schedule usually follows the same order."
        >
          <p>
            Heating, ventilation and air conditioning plant looks bewildering the first time you
            open a plant room door. It gets much simpler once you sort every item into one of three
            layers.
          </p>
          <ul>
            <li>
              <strong>Sources</strong> make heat or remove it. Boilers and heat pumps on the heating
              side; chillers on the cooling side, with something outside to reject the heat they
              take out of the building (condenser fans, dry coolers or a cooling tower).
            </li>
            <li>
              <strong>Distribution</strong> moves that heat or cooling. Pumps push heating and
              chilled water round closed pipe circuits. Fans in air handling units push air round
              ductwork.
            </li>
            <li>
              <strong>Terminal units</strong> deliver it to the space. Radiators and underfloor
              heating, fan coil units, VAV boxes, chilled beams and the coils inside an AHU itself.
            </li>
          </ul>
          <p>
            Two kinds of medium run through all of this. The <strong>wet side</strong> is the water:
            low temperature hot water for heating, chilled water for cooling. The{' '}
            <strong>air side</strong> is the ventilation: fresh air brought in, conditioned, and
            supplied to rooms, with stale air extracted. An AHU is where the two meet, because its
            coils take heat from, or give heat to, the water circuits.
          </p>
          <p>
            For the BMS, the three layers become a chain of permissions. A terminal unit asks for
            heat. The distribution has to be running to deliver it. The source only needs to run if
            something downstream is asking. Most of the control strategy on a building is that chain
            written down.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Packaged plant keeps its own brain; the BMS supervises"
          plainEnglish="A modern boiler, heat pump or chiller has its own controller inside it. The BMS does not replace that controller. It tells it when to run and what to aim for, and listens to what it reports back."
          onSite="Before you wire anything to a packaged unit, find the manufacturer’s terminal schedule for its BMS connections. It will list exactly which contacts are an enable, which are volt-free status and fault outputs, and which take an analogue setpoint."
        >
          <p>
            The equipment manufacturer supplies controls that look after the machine itself: burner
            sequencing and flame supervision on a boiler, compressor protection and defrost on a
            heat pump, refrigerant pressures and compressor staging inside a chiller. Those controls
            are designed and tested with the machine, and the BMS is not there to second guess them.
          </p>
          <p>What the BMS typically adds is the building-level view:</p>
          <ul>
            <li>
              <strong>An enable or run command</strong>: a digital output, usually through an
              interposing relay, that tells the unit it may run.
            </li>
            <li>
              <strong>A setpoint or reset</strong>: sometimes an analogue output (0–10 V is common),
              sometimes written over a network connection.
            </li>
            <li>
              <strong>Status and fault</strong>: volt-free contacts from the unit telling the BMS it
              is running, or that it has locked out.
            </li>
            <li>
              <strong>Measured values</strong>: flow and return temperatures, and on some plant
              burner status, fuel use or electrical load.
            </li>
            <li>
              <strong>Hours run and number of starts</strong>, logged so maintenance can be planned
              on actual use rather than on the calendar.
            </li>
          </ul>
          <p>
            Larger packaged units increasingly offer all of this over a network interface (BACnet or
            Modbus, covered in Module 5) instead of, or as well as, hardwired contacts. The
            principle does not change: the unit runs itself; the BMS decides when, at what target,
            and in which order alongside everything else.
          </p>
        </ConceptBlock>

        <Pullquote>
          The boiler knows how to burn gas safely. The BMS knows whether anybody in the building
          needs the heat. Keep those two jobs where they belong.
        </Pullquote>

        <InlineCheck
          id="bms-3-1-supervise"
          question="A chiller’s panel offers a volt-free ‘common fault’ contact. What is it for, from the BMS’s point of view?"
          options={[
            'Letting the BMS reset the chiller’s compressor protection remotely',
            'Feeding the chiller’s refrigerant pressure into a BMS control loop',
            'Telling the BMS the chiller has locked out so it can alarm and act',
            'Switching the chiller’s supply off when a fault occurs',
          ]}
          correctIndex={2}
          explanation="A common fault contact is a status input to the BMS. It tells the BMS the unit has stopped on its own protection, so the BMS can raise an alarm, bring on standby plant, or stop asking for cooling that is not coming. The protection itself stays inside the chiller."
        />

        <SectionRule />
        <ContentEyebrow>Heat sources</ContentEyebrow>

        <ConceptBlock
          title="Boilers: enable, sequence, and watch the temperatures"
          plainEnglish="On a commercial heating system the BMS usually decides when the boilers are needed, how many run, and which one goes first. The boilers decide how to fire."
          onSite="Look for the boiler sequence panel or the BMS outputs labelled per boiler. If one boiler always leads and another has a fraction of the hours, the rotation has stopped working or was never set up."
        >
          <p>
            A typical commercial heating plant has two or more boilers feeding a common header, with
            pumps taking heating water out to the building. The BMS routines for boilers are well
            established:
          </p>
          <ul>
            <li>An on/off command to each boiler’s own controller.</li>
            <li>Fault and alarm signals back from each boiler.</li>
            <li>
              Monitoring of burner status, heating flow and return temperatures, hours run, and fuel
              use where it is metered.
            </li>
            <li>Choice of fuel where a plant can burn more than one.</li>
            <li>
              Sequencing: bringing boilers on one at a time as the load rises, and rotating which
              boiler leads so their running time evens out.
            </li>
          </ul>
          <p>
            Approved Document L Vol 2 (England) sets minimum controls for this plant. The 2021
            edition is the one in force now. It says a boiler system above 100 kW should have
            optimum start/stop control that provides night setback or frost protection outside
            occupied periods, plus either a high/low firing facility in the boiler or several
            boilers with sequence control so the plant runs efficiently at part load (paragraph
            6.7). Above 500 kW, gas boilers and oil boilers with more than one firing stage should
            have fully modulating burner controls (paragraph 6.8). From 24 March 2027 the 2026
            edition keeps these rules as paragraphs 5.11 and 5.12, but places them under boilers in
            existing buildings, so they apply to new boiler plant fitted in an existing building.
          </p>
          <p>
            Heating systems should also have weather compensation where it is appropriate and
            technically feasible, so the flow temperature drops as the weather warms (2021 paragraph
            5.11; 4.13 from 24 March 2027).
          </p>
          <p>
            One wiring point is written into the same document: with no call for space heating, the
            controls should leave the heating appliance and its pump both off (paragraph 5.12; 4.14
            from 24 March 2027). Allow for the boiler maker’s pump overrun: most boilers need the
            pump to run on for a set time after the burner stops, to carry away the heat left in the
            heat exchanger. That run-on is normal. A pump circulating all night with no demand is
            not, and is the classic sign that the interlock was missed.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Heat pumps: more of the control lives inside the unit"
          plainEnglish="A heat pump’s own controller handles a lot more than a boiler’s does: defrosting the outdoor coil, protecting itself if airflow or water flow fails, running its fans and pumps. The BMS works with it, not around it."
          onSite="If a heat pump shares a building with boilers or another heat source, ask to see the description of operation that says which source leads and when the other is called. That decision belongs in one control system, not two that fight."
        >
          <p>
            The Approved Document L edition in force now (2021) asks for any outdoor fans to be
            controlled (paragraph 6.45), and, where a building has other heat sources as well as the
            heat pump, for all of them to be brought into a single control system so they operate
            together (paragraph 6.46; 5.4 from 24 March 2027).
          </p>
          <p>
            From 24 March 2027 the 2026 edition adds a table of minimum controls a heat pump unit in
            a new building should have, by type (Table 5.2). Across the types they include
            protection against air or water flow failure, control of outdoor fans, defrost control
            on air-source units, control of the water pumps, and control of the water or air
            temperature delivered. In other words, the essential protection is on board. The same
            table says any extra controls should add function without taking away what the
            manufacturer’s controls already do, including the unit’s ability to modulate. That is
            good practice today: a BMS that simply switches a modulating heat pump on and off at
            full output throws the modulation away.
          </p>
          <p>
            Heat pumps also care more than boilers about the water coming back to them. A poorly
            balanced system returns water hotter than it should, and a heat pump runs less
            efficiently on it. That is one reason commissioning of the hydronic side matters so much
            on heat pump jobs, and Section 2.3 (Actuators, valves and dampers) covers the valves
            that do the balancing.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Cooling</ContentEyebrow>

        <ConceptBlock
          title="Chillers: command, prove the flow, then let it run"
          plainEnglish="A chiller makes chilled water for the building’s cooling coils. The BMS starts the pump first, checks water is really moving, and only then lets the chiller start."
          onSite="The flow switch or differential pressure switch that proves chilled water flow is a small device with a big job. When a chiller ‘will not start’, check that proving signal before anything else."
        >
          <p>
            A chiller removes heat from a chilled water circuit and rejects it outdoors, through
            condenser fans on an air-cooled machine or through a cooling tower or dry cooler on a
            water-cooled one. Like a boiler, a packaged chiller has its own controls that supervise
            the refrigeration plant. The BMS normally provides an on/off command, fault and alarm
            signalling, and monitoring of electrical load, chilled water flow and return
            temperatures, and hours run.
          </p>
          <p>A typical start sequence written into a chiller strategy runs like this:</p>
          <ul>
            <li>
              At the scheduled time, or on demand from the zones, start the chilled water pump.
            </li>
            <li>
              Wait a set delay, then confirm flow from the flow switch or differential pressure
              signal.
            </li>
            <li>Only then switch the chiller to run through its enable contact.</li>
            <li>
              Hold it off when cooling is pointless: for example when no air handling units are
              running, or when the outside air is cool enough not to need it.
            </li>
            <li>
              Alarm on no chilled water flow, on a fault from the chiller panel, and on chilled
              water temperature drifting high.
            </li>
          </ul>
          <p>
            The BMS sequence is good practice, not the protection. What stops an evaporator freezing
            if flow is lost is the chiller’s own flow switch, wired into the safety terminals the
            manufacturer provides. Check that device is fitted and wired; it must not depend on the
            BMS.
          </p>
          <p>
            Where a building has several cooling units, Approved Document L asks for controls that
            keep the combined plant running in its most efficient modes, with central plant
            operating only when the zones need it and off by default (2021 paragraph 6.35). The 2021
            edition sets BS EN 15232 Band C as the minimum for comfort cooling controls. From 24
            March 2027 this becomes paragraph 5.40 and the 2026 edition moves to BS EN ISO 52120-1
            Class C, the standard that has already replaced BS EN 15232.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsHeatPump}
          topic="Watch · a heat pump, one of the plant items a BMS now runs most"
          caption="A heat pump is increasingly the heat source a BMS is enabling and monitoring. As you watch, note the parts that would become BMS points: the run command, the flow temperature it is asked to make, and the fault it reports back."
        />

        <Scenario
          title="The chiller that ‘will not start’ on the first hot morning"
          situation="An office block’s cooling has not run since the autumn. On the first warm morning the BMS head end shows the chiller command on, the chiller status off, and no fault from the chiller panel. The facilities manager calls you because ‘the BMS output must have failed’."
          whatToDo="Work along the sequence rather than straight to the output. Check the chilled water pump: is it commanded, and is its run status back? Then check the flow proving signal at the BMS input and at the device. On this job the duty pump had seized over the winter, standby changeover had never been enabled in the strategy, and with no flow proved the chiller enable was correctly held off. Get the mechanical contractor to free or replace the pump, and raise with the controls engineer that standby changeover is missing."
          whyItMatters="The BMS was doing exactly what it was written to do. A chiller that ran without flow could freeze its evaporator. The real protection against that is the chiller’s own flow switch, wired into the terminals the manufacturer provides. Holding the enable off until flow is proved is the BMS adding good sequencing on top. Reading the sequence first stops you replacing a perfectly good relay, and finds the real gap: a standby pump the logic never used."
        />

        <SectionRule />
        <ContentEyebrow>Distribution</ContentEyebrow>

        <ConceptBlock
          title="Pumps: duty, standby, proving and speed"
          plainEnglish="Most important pumps come in pairs. One runs, one waits. The BMS swaps them over if the running one fails, and rotates them so they wear evenly."
          onSite="On a twin-head pump or a pair of pumps, you will usually wire a run command and a run status or trip for each, plus a common flow proving signal. Label them A and B on both the panel and the drawing, not ‘duty’ and ‘standby’, because those roles swap."
        >
          <p>
            Pumps move water from the sources to the terminal units. Heating circuits, chilled water
            circuits, and sometimes separate primary and secondary circuits each have their own
            pumps, and the BMS looks after them with a handful of routines:
          </p>
          <ul>
            <li>
              <strong>Duty and standby.</strong> When the duty pump fails, the standby starts
              automatically and the failure is alarmed.
            </li>
            <li>
              <strong>Rotation.</strong> Duty changes over on a schedule or on hours run, so both
              pumps share the wear and the standby is known to work.
            </li>
            <li>
              <strong>Proving.</strong> A command alone proves nothing. Run status from the starter
              or drive, and flow or differential pressure from the pipework, tell the BMS the pump
              is genuinely moving water.
            </li>
            <li>
              <strong>Plant protection.</strong> Pumps that sit idle through a season can be run
              briefly on a timed routine so they do not seize.
            </li>
          </ul>
          <p>
            Speed control matters too. In variable volume systems, where two-port valves throttle
            flow at the terminals, Approved Document L expects variable speed glandless circulators
            (2021 paragraph 6.42), and a closed-loop pump with a motor above 750 W should be fitted
            with, or controlled by, a suitable variable speed controller (paragraph 6.43). From 24
            March 2027 these become paragraphs 5.48 and 5.49. The BMS usually gives the drive an
            enable and a speed reference, and reads back its run status and fault.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-1-pumps"
          question="A BMS shows a heating pump commanded on and its run status on, but rooms at the far end of the circuit are cold. Which point would best confirm the pump is actually delivering water?"
          options={[
            'The pump’s run command output at the outstation',
            'A flow switch or differential pressure signal',
            'The pump’s hours run counter on the head end',
            'The boiler’s common fault contact to the BMS',
          ]}
          correctIndex={1}
          explanation="Run status from the starter only proves the motor is energised. A sheared coupling, a closed valve or an air-locked pump can all show ‘running’ with no useful flow. Flow or differential pressure measures what the pump is doing to the water, which is the thing you actually care about."
        />

        <SectionRule />
        <ContentEyebrow>Air handling</ContentEyebrow>

        <ConceptBlock
          title="The air handling unit: the biggest set of points in the building"
          plainEnglish="An AHU draws in outside air, cleans it, heats or cools it, sometimes adds or removes moisture, and blows it through ductwork to the rooms. Almost every one of those steps has a sensor or an actuator on the BMS."
          onSite="Open the points schedule for an AHU and walk the unit with it, inlet to outlet. Put your hand on each sensor and actuator as you go. It is the fastest way to learn a unit and to spot anything missing."
        >
          <p>
            Air flows through an AHU in a fixed order. Outside air comes in through a damper, often
            mixed with some return air from the building through a second damper. It passes through
            filters, sometimes a heat recovery device that takes heat from the extract air, then
            heating and cooling coils fed from the wet side, sometimes a humidifier, and finally the
            supply fan that pushes it into the ductwork. A return or extract fan draws air back.
          </p>
          <p>A points schedule for a mid-sized AHU will usually include points like these:</p>
          <ul>
            <li>
              <strong>Temperatures</strong>: outside air, return air, mixed air (after the mixing
              dampers), supply air, and one or more space temperatures.
            </li>
            <li>
              <strong>Humidity</strong>: outside and return, where humidity is controlled.
            </li>
            <li>
              <strong>Fans</strong>: a run command to each fan (sometimes separate low and high
              speed commands on older two-speed units), a trip or status input from each starter,
              and on a VSD a speed reference and fault.
            </li>
            <li>
              <strong>Dampers</strong>: actuator outputs for fresh air, extract and recirculation.
            </li>
            <li>
              <strong>Valves</strong>: actuator outputs for the heating and cooling coil valves, and
              the humidifier where fitted.
            </li>
            <li>
              <strong>Filters</strong>: a differential pressure switch or sensor across each filter
              bank, to flag when it is dirty.
            </li>
            <li>
              <strong>Safety and interlock status</strong>: frost protection, access door switches,
              and fire alarm status.
            </li>
          </ul>
          <p>
            The mixing dampers are an energy tool in their own right. When the outside air is cool
            enough, the BMS can bring in more of it and use less mechanical cooling: free cooling.
            Heat recovery does the opposite job in winter, and needs its own control so that it does
            not ice up on the extract side in cold weather.
          </p>
          <p>
            Approved Document L adds two expectations you will see on new installations: fans used
            for general air distribution rated above 1100 W should have variable speed drives (2021
            paragraph 6.49), and air handling systems should be able to run at a quarter of design
            flow without the specific fan power getting worse than at full flow (paragraph 6.48).
            From 24 March 2027 these become paragraphs 5.53 and 5.52.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Wiring the AHU frost thermostat as an alarm only"
          whatHappens="The frost thermostat after the heating coil is wired only to a BMS digital input, and the strategy raises an alarm when it opens. On a cold night the heating valve sticks, the frost stat opens and the alarm arrives at three in the morning. Nobody acts on it, the supply fan keeps drawing freezing air across the coil, and by the morning the coil has split."
          doInstead="Wire the frost thermostat into the fan starter’s safety chain so it stops the supply fan directly, with the fresh air damper closing too. Give the BMS a separate monitoring contact so it can alarm, open the heating valve and run the coil pump to recover. Section 3.5 (Overrides, frost protection and seasonal change) and Section 3.6 (Plant safety interlocks and shutdowns) go into this properly."
        />

        <InlineCheck
          id="bms-3-1-ahu"
          question="An AHU’s filter differential pressure point climbs steadily over several weeks, then alarms. What is it telling you?"
          options={[
            'The filter has blown out and air is bypassing it',
            'The filter is loading up and needs changing',
            'The filter has been left out after maintenance',
            'The filter DP tubes have been swapped over',
          ]}
          correctIndex={1}
          explanation="As a filter collects dirt, the pressure drop across it rises, so a slow climb ending in an alarm is normal filter life. A blown-out or missing filter makes the reading fall, not climb. Swapped tubes give a wrong reading from the day they were fitted, not a slow rise over weeks."
        />

        <SectionRule />
        <ContentEyebrow>In the rooms</ContentEyebrow>

        <ConceptBlock
          title="Fan coil units: small, local and numerous"
          plainEnglish="A fan coil is a box in the ceiling or on the wall with a fan and a water coil. It takes room air, heats or cools it, and blows it back out. A floor of offices might have dozens."
          onSite="Fan coils are where electricians spend a lot of hours on fit-outs: a local supply to each unit, a controller, valve actuators and a room sensor. Check whether the fan coil controller is on the BMS network or stand-alone before you start; it changes the cabling."
        >
          <p>
            A fan coil unit sits close to the space it serves. It has a fan, a coil fed with chilled
            water (and either a second coil for heating water or an electric heater), a control
            valve on each water coil, and usually a local controller with a room temperature sensor
            or wall panel. Two-pipe units have one coil that changes between heating and cooling;
            four-pipe units have separate heating and cooling coils and can switch between them room
            by room.
          </p>
          <p>
            Fan coil controllers are commonly networked to the BMS, so the head end can set
            occupancy times, setpoints and limits for each unit and read back what each room is
            doing. That networking is what lets a large building of fan coils behave as one system
            rather than a ceiling full of independent thermostats.
          </p>
          <p>
            Approved Document L expects each control zone, and each terminal unit, to have timing
            and temperature control independent of other zones, and expects the controls to stop
            heating and cooling running at the same time in the same space (2021 paragraph 6.35;
            5.40 from 24 March 2027). On a four-pipe fan coil that means a deadband between the
            heating and cooling setpoints, a point Section 3.2 (Control loops) picks up.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="VAV boxes, and how the rooms drive the plant"
          plainEnglish="A VAV box is a damper in the duct above a room. It opens to let more conditioned air in when the room needs it, and closes down when it does not. The AHU fan follows what all the boxes together are asking for."
          onSite="On a VAV job the most important sensor at the AHU is often the supply duct static pressure sensor. If it is badly sited or its tube is split, every box on the system misbehaves together."
        >
          <p>
            In a variable air volume system the AHU supplies air at a controlled temperature, and
            each zone has a terminal box with a damper (and often an airflow sensor) that varies how
            much of that air reaches the room. Some boxes add a reheat coil for perimeter zones that
            need warming while interior zones need cooling.
          </p>
          <p>
            The link back to the AHU is pressure. As boxes across a floor close their dampers,
            pressure in the supply duct rises, and the AHU’s pressure loop slows the supply fan to
            bring it back to setpoint. So the fan only delivers the air the rooms are actually
            asking for, which is where the energy saving of VAV comes from. Some systems go further
            and reset the duct pressure setpoint based on how far open the boxes are.
          </p>
          <p>
            The same principle runs through the whole page. Approved Document L puts it plainly for
            heating and for cooling: central plant should run only when the zone systems need it,
            and its default state should be off (2021 paragraphs 5.11 and 6.35; 4.13 and 5.40 from
            24 March 2027). The rooms ask; the plant answers. A BMS strategy that runs the chiller
            because it is a weekday, whether or not any zone wants cooling, has the chain the wrong
            way round.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-1-zones"
          question="Every fan coil on a floor has reached setpoint and closed its valves, yet the heating pump and boiler for that floor’s circuit keep running. What has the strategy missed?"
          options={[
            'Zone demand switching off central plant',
            'A higher boiler flow temperature setpoint',
            'A faster fan speed setting on every fan coil',
            'A second heating pump brought on to duty',
          ]}
          correctIndex={0}
          explanation="With every zone satisfied there is no demand, so the boiler and pump should be off. Approved Document L makes that the default and asks for controls wired so no heating demand means no appliance and no pump. Raising temperatures or adding pumps only spends more energy delivering heat nobody wants."
        />

        <SectionRule />
        <ContentEyebrow>Why the BMS ties it together</ContentEyebrow>

        <ConceptBlock
          title="What the electrician actually wires to all this"
          plainEnglish="Across every piece of plant on this page, the BMS needs the same few kinds of signal. Learn the pattern once and every new unit is a variation on it."
          onSite="When a mechanical contractor says ‘the BMS just needs to talk to it’, ask for the list: which commands, which statuses, which faults, which analogues. That list is the cabling and the points schedule."
        >
          <p>
            Strip away the different machines and the interface between plant and BMS is remarkably
            consistent:
          </p>
          <ul>
            <li>
              <strong>Commands</strong> (digital outputs): enable a boiler, chiller or heat pump;
              run a pump or fan. Usually through an interposing relay in the control panel so the
              BMS output never carries the plant’s own load.
            </li>
            <li>
              <strong>Feedback</strong> (digital inputs): run status, trip, common fault, filter
              dirty, flow proved. These are what stop the BMS believing its own commands.
            </li>
            <li>
              <strong>Modulating outputs</strong> (analogue outputs): valve and damper positions,
              VSD speed references, sometimes a setpoint to a packaged unit.
            </li>
            <li>
              <strong>Measurements</strong> (analogue inputs): temperatures, humidity, pressures,
              flow.
            </li>
            <li>
              <strong>Network points</strong>: everything a packaged unit or a fan coil controller
              can share over BACnet or Modbus, which may replace many hardwired points.
            </li>
          </ul>
          <p>
            Section 2.1 (Points: digital and analogue, inputs and outputs) covers each signal type
            in detail. The point for now is that when you look at a new piece of plant, you can ask
            the same five questions and know what to install.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Vol 2 (England, 2021 edition, in force now)"
          clause="Paragraph 6.66: a new building whose space heating or air-conditioning plant has an effective rated output above 180 kW should have a building automation and control system (BACS) installed. Paragraphs 6.72 and 6.73 set out what that system should do. From 24 March 2027 these become paragraphs 5.76, 5.84 and 5.85 of the 2026 edition."
          meaning={
            <>
              <p>
                The plant on this page is what triggers the requirement. Once the heating or
                air-conditioning output passes 180 kW, the building should have a BACS that complies
                with BS EN ISO 16484, continuously monitors, logs and analyses energy use, detects
                losses of efficiency, and works across equipment from different manufacturers.
              </p>
              <p>
                In an existing building above that size, the same specification applies when a BACS
                is installed or replaced (paragraph 6.67; 5.77 from 24 March 2027). Approved
                Document L is statutory guidance, not law in itself. Wales currently uses 290 kW,
                moving to 180 kW from 4 March 2027; Scotland uses 290 kW. Section 1.5 covers the
                detail.
              </p>
            </>
          }
          cite="Approved Document L Vol 2 (England, 2021 edition) paras 6.66–6.67, 6.72–6.73; 2026 edition (from 24 March 2027) paras 5.76–5.77, 5.84–5.85. Welsh and Scottish figures as set out in Section 1.5."
        />

        <FAQ
          items={[
            {
              question: 'If a boiler has its own controls, why does it need a BMS at all?',
              answer:
                'Because the boiler only knows about itself. It does not know whether the building is occupied, whether a second boiler is already running, how many hours each boiler has done, or whether the pumps are proving flow. The BMS adds timing, sequencing, interlocks with the rest of the plant, alarms to somebody who can act on them, and the logging that shows how the plant is really being used.',
            },
            {
              question: 'Should the BMS ever be wired into a boiler’s or chiller’s safety circuit?',
              answer:
                'No. Flame supervision, refrigerant protection and similar safeties belong to the manufacturer’s controls. The BMS connects through the terminals the manufacturer provides for enable, setpoint, status and fault. If you are being asked to link something across a safety circuit to make the BMS work, stop and speak to the controls engineer and the manufacturer.',
            },
            {
              question: 'What is the difference between run status and flow proving?',
              answer:
                'Run status usually comes from the starter or drive and tells you the motor has been energised. Flow proving comes from a flow switch or a differential pressure measurement in the pipework or duct and tells you the fluid is actually moving. A pump with a sheared coupling can show run status with no flow. Where a start sequence depends on flow, it needs the proving signal.',
            },
            {
              question: 'Do fan coils and VAV boxes always have their own controllers?',
              answer:
                'On most modern installations, yes: a small controller at each unit, networked back to the BMS, with a room sensor. Older or simpler installations may wire a few units back to a central outstation instead. Check the drawings and the points schedule before you price the cabling, because the two approaches need very different amounts of it.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Sort plant into source, distribution and terminal. The control strategy is the chain of demand running from the rooms back to the source.',
            'Packaged boilers, heat pumps and chillers keep their own controls and safeties. The BMS enables, sets targets, sequences, and reads status, faults, temperatures and hours run.',
            'Pumps run and flow is proved before a chiller or boiler is enabled. A held-off start with no fault is often the sequence working correctly.',
            'Duty and standby pumps change over automatically on failure, rotate to share wear, and need a proving signal, not just a run status.',
            'An AHU carries the most points: temperatures, fan commands and trips, dampers, coil valves, filter pressure and safety status.',
            'Fan coils treat the room air themselves; VAV boxes vary centrally conditioned air, and the AHU fan follows their combined demand through duct pressure.',
            'Approved Document L (2021 edition in force now; 2026 edition from 24 March 2027) sets the floor: boiler sequencing above 100 kW, VSDs on larger fans and pumps, zone control, no simultaneous heating and cooling, and central plant off when no zone needs it.',
            'The BMS start sequence is good practice, but the protection against no flow is the chiller’s or boiler’s own flow switch, wired into its safety terminals.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3"
          prevLabel="Module 3: Controlling heating, ventilation and air conditioning"
          nextHref="/study-centre/upskilling/bms-module-3-section-2"
          nextLabel="Control loops"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section1;
