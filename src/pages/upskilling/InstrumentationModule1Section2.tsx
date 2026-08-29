/**
 * Module 1 · Section 2 — Where and why instrumentation is used
 *
 * Rewritten 2026-08-29 against the Section 1 exemplar.
 *
 * The old page was ~750 lines of bare <div>s under its own sticky header on a
 * hardcoded #1a1a1a, with four sector sections built almost entirely out of
 * two- and three-column bullet grids. The content underneath was sound — HVAC,
 * process control, BMS, renewables — and it has all been kept. What it lacked
 * was a spine: it listed what each sector measures without ever saying why any
 * of it is worth paying for, so the four sectors read as four unrelated lists.
 *
 * It is now built from the same learning primitives as every other Level 2 and
 * Level 3 page, and it is organised around one argument: the four boxes from
 * Section 1 do not change between sectors. Only the process changes, and with
 * it the consequence of getting the measurement wrong. Each sector is taught
 * as an answer to "what goes wrong here, and what does measuring it buy you?"
 *
 * Every percentage in the old page was stripped. It claimed 20–40% HVAC energy
 * savings, 15–30% BMS bill reductions and 10–20% maintenance savings, and there
 * was no source for any of them — one of them was even a quiz answer. The
 * teaching points survive without the numbers.
 *
 * BS 7671 Section 557 wording carried over from Section 1, verified against
 * bs7671_facets (A4:2026). No other regulation, clause or standard number is
 * cited on this page.
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

const TITLE = 'Where and why instrumentation is used | Instrumentation Module 1.2 | Elec-Mate';
const DESCRIPTION =
  'The same four boxes, four different industries. Where instrumentation actually turns up in the UK — HVAC, process plant, building management systems and renewable generation — and the five reasons anybody pays for an instrument in the first place.';

const outcomes = [
  'Name the four sectors where a UK electrician is most likely to meet instrumentation, and what each one measures',
  'Explain why the same measure → decide → act loop appears in a plant room and on a refinery',
  'Give the five reasons an instrument gets installed, and identify which one applies to a given device',
  'Describe why safety instrumentation is kept separate from control instrumentation',
  'Recognise how sensor placement, not sensor quality, is usually what makes a reading useless',
  'Say where BS 7671 speaks to instrumentation circuits, and what it asks the designer to decide',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A differential pressure sensor is fitted across an air handling unit filter. What is it there to tell you?',
    options: [
      'The temperature of the supply air',
      'How loaded the filter is, and therefore when to change it',
      'The volume of air the fan is moving',
      'Whether the fan motor is drawing rated current',
    ],
    correctIndex: 1,
    explanation:
      'A clean filter offers little resistance, so the pressure drop across it is small. As it loads with dust the drop rises. The reading is a measure of filter condition, not of airflow or temperature — a good example of measuring one quantity to infer something else entirely.',
  },
  {
    id: 2,
    question:
      'Why are safety instrumented functions normally given their own sensors and their own logic solver, separate from the control system?',
    options: [
      'Because safety sensors are more accurate than control sensors',
      'So a fault in the control system cannot also disable the protection against that fault',
      'Because BS 7671 forbids sharing a sensor between two circuits',
      'Purely to make the panel wiring easier to trace',
    ],
    correctIndex: 1,
    explanation:
      'If the same transmitter feeds both the control loop and the trip, a stuck transmitter can drive the process to a dangerous condition and simultaneously hide it from the protection. Independence is the whole point — the safety function must still work when the control system is the thing that has failed.',
  },
  {
    id: 3,
    question:
      'A room temperature sensor is mounted on an internal wall directly above a radiator. What is the likely consequence?',
    options: [
      'The sensor will fail prematurely from heat damage',
      'The sensor reads warm air rising off the radiator, so the room is heated less than it should be',
      'The reading is unaffected because the controller averages it',
      'The sensor will read the outdoor temperature instead',
    ],
    correctIndex: 1,
    explanation:
      'The sensor reports its own local conditions, not the room. Sat in the plume off a radiator it satisfies the setpoint early, the heating cuts back, and the occupants complain the space is cold. Nothing is faulty; the instrument is simply in the wrong place.',
  },
  {
    id: 4,
    question:
      'On a solar PV array, why is an irradiance sensor fitted alongside the power output metering?',
    options: [
      'To measure the DC voltage of each string',
      'To give a reference against which the actual output can be judged',
      'Because irradiance is required for anti-islanding protection',
      'To control the angle of the modules',
    ],
    correctIndex: 1,
    explanation:
      'Output on its own tells you nothing about health — a low figure on a dull day is correct behaviour. Measuring the available irradiance gives you an expected output to compare the real one against, which is how underperformance is detected rather than guessed at.',
  },
  {
    id: 5,
    question:
      'Which of these is a condition-monitoring instrument rather than a control instrument?',
    options: [
      'A control valve positioner on a feedwater line',
      'A room thermostat driving a heating circuit',
      'A vibration probe on a wind turbine gearbox',
      'A level transmitter feeding a tank level controller',
    ],
    correctIndex: 2,
    explanation:
      'The vibration probe does not adjust anything on the machine. It exists to give warning of a developing mechanical fault so the repair can be planned. Condition monitoring is measurement that serves a maintenance decision rather than a control decision.',
  },
  {
    id: 6,
    question:
      'A BMS controls lighting, heating and ventilation across a building. What makes it a BMS rather than a collection of separate controls?',
    options: [
      'The number of sensors installed',
      'The use of 4–20 mA signalling throughout',
      'That the services share a network, a schedule and a common interface',
      'That it is installed in a commercial rather than a domestic building',
    ],
    correctIndex: 2,
    explanation:
      'A BMS is defined by integration. Individually controlled services each do their own job; a BMS lets them share occupancy information, time schedules, trend data and one point of supervision, which is what allows decisions no single controller could make on its own.',
  },
];

const InstrumentationModule1Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 2"
        title="Where and why instrumentation is used"
        backTo="/electrician/upskilling/instrumentation-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Four sectors, one pattern. Where instrumentation actually turns up in UK work, and the
          reasons somebody was willing to pay for each instrument you will find.
        </p>

        <TLDR
          points={[
            'The four boxes from Section 1 do not change between industries. Only the process changes — and with it, what happens when the measurement is wrong.',
            'HVAC and building management is where most UK electricians meet instrumentation first: temperature, humidity, CO2, differential pressure, and a lot of metering.',
            'Process industries — chemicals, pharmaceuticals, food and drink, water, oil and gas — run on pressure, flow, level and composition, with a separate layer of safety instrumentation sitting over the top.',
            'Renewable generation is measurement-heavy because you cannot control the fuel. You measure to know whether the plant is performing, and to keep it inside what the network will accept.',
            'Every instrument is bought for one of five reasons: safety, control, efficiency, evidence, or condition. Work out which one applies and the specification usually writes itself.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The pattern underneath all of it</ContentEyebrow>

        <ConceptBlock
          title="The loop is the same everywhere — only the process changes"
          plainEnglish="A plant room, a brewery and a wind farm all run the same four boxes. What differs is the physical thing being controlled and what it costs you when it goes wrong."
          onSite="When you walk into an unfamiliar sector, do not start by learning the equipment. Start by asking what the process variable is and what happens if it drifts. The equipment then makes sense on its own."
        >
          <p>
            Section 1 ended on four boxes: something senses, something decides, something acts, and
            the process reacts. That is not a simplification for teaching — it genuinely is what
            every system on this page is doing. A hotel plant room holding a flow temperature and a
            refinery holding a column pressure are, structurally, the same machine.
          </p>
          <p>
            What changes between sectors is three things, and they are the things worth paying
            attention to:
          </p>
          <ul>
            <li>
              <strong>The process variable</strong> — a room temperature, a reactor pressure, a tank
              level, a grid frequency. This determines the sensing technology.
            </li>
            <li>
              <strong>The consequence of error</strong> — a cold office, a spoiled batch, a released
              gas cloud, a lost export payment. This determines how much redundancy, accuracy and
              independence anybody is prepared to fund.
            </li>
            <li>
              <strong>The speed of the process</strong> — a building takes hours to change
              temperature; a gas line can over-pressure in seconds. This determines how fast the
              loop has to be and whether a human can be in it at all.
            </li>
          </ul>
          <p>
            That third one is worth sitting with. A great deal of what looks like sector-specific
            practice is just the answer to &ldquo;how long have we got?&rdquo; Where the answer is
            hours, an operator can be part of the loop. Where the answer is seconds, the loop must
            close automatically, and where the answer is milliseconds, it must close in dedicated
            hardware rather than in software that shares a processor with anything else.
          </p>
        </ConceptBlock>

        <Pullquote>
          Nobody buys an instrument because it is interesting. They buy it because somebody worked
          out what not knowing the number was going to cost them.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>HVAC — heating, ventilation and air conditioning</ContentEyebrow>

        <ConceptBlock
          title="The sector where most UK electricians meet instrumentation first"
          plainEnglish="Keeping a building at a comfortable temperature and humidity, with enough fresh air, without burning money doing it. That is four measurements pulling against each other."
          onSite="Plant rooms are the best place to learn on. The processes are slow, the consequences of a mistake are discomfort rather than danger, and every measurement type on this course turns up somewhere in the building."
        >
          <p>
            HVAC is comfort control, and comfort is not one quantity. A space can be at the right
            temperature and still be unpleasant because the humidity is wrong or the air is stale.
            So an HVAC system measures a handful of quantities at once and trades them off:
          </p>
          <ul>
            <li>
              <strong>Temperature</strong> — in the space, in the supply and return ducts, in flow
              and return pipework, and outside. Usually resistance temperature detectors or
              thermistors rather than thermocouples, because the ranges are narrow and the accuracy
              matters more than the extremes.
            </li>
            <li>
              <strong>Relative humidity</strong> — too low and you get static and dry throats, too
              high and you get condensation, mould and unhappy fabric.
            </li>
            <li>
              <strong>Carbon dioxide concentration</strong> — the cheapest proxy for &ldquo;how many
              people are in here and is the air stale?&rdquo; A rising CO2 reading means occupants
              are producing it faster than the ventilation is removing it.
            </li>
            <li>
              <strong>Air pressure and flow</strong> — static pressure in ducts, differential
              pressure across filters and fans, and volume flow through terminal units.
            </li>
            <li>
              <strong>Electrical and thermal energy</strong> — how much the whole arrangement is
              consuming, which is the only way to tell whether any of the above is being achieved
              efficiently.
            </li>
          </ul>
          <p>
            Outdoor temperature deserves a mention on its own, because it is the classic example of
            a measurement that controls nothing directly. It is used for{' '}
            <strong>compensation</strong>: the colder it is outside, the higher the heating flow
            temperature is set, so the system anticipates demand instead of waiting for the space to
            get cold and then reacting. That is a measurement feeding a calculation rather than a
            comparison, and it is where instrumentation starts to get genuinely interesting.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Measuring one thing to learn about another"
          plainEnglish="Some of the most useful readings on a building are not measuring the thing you care about at all. They measure something easier that moves with it."
          onSite="Differential pressure across a filter is the single most useful gauge in most air handling units, and it is routinely ignored until the fan is struggling."
        >
          <p>
            A ventilation filter is a good worked example. What you want to know is how dirty it is.
            There is no dirt sensor. What there is, is the fact that a loaded filter resists airflow
            more than a clean one, so the pressure difference across it rises as it blocks. Fit a
            differential pressure sensor across the filter and you have converted an awkward
            question into a routine one.
          </p>
          <p>
            The same trick appears throughout the sector. Fan and pump duty is inferred from
            differential pressure rather than measured directly. Occupancy is inferred from CO2.
            Coil performance is inferred from the temperature difference across it. Once you start
            looking for it, a surprising fraction of instrumentation is measuring a convenient
            quantity that stands in for an inconvenient one.
          </p>
          <p>
            Two things follow from that, and both matter on site. First, the inference is only as
            good as the assumption behind it — a differential pressure reading across a filter tells
            you nothing useful if the fan speed has changed as well, because both affect it. Second,
            when a system behaves oddly, ask what each reading is actually measuring before you ask
            whether it is accurate. A great many &ldquo;faulty sensor&rdquo; calls turn out to be a
            perfectly healthy sensor reporting something other than what the person reading it
            assumed.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-2-hvac-dp"
          question="A variable air volume box has a differential pressure sensor across an orifice in the duct. What is being determined?"
          options={[
            'The temperature of the air in the duct',
            'The airflow rate through the box',
            'The humidity of the supply air',
            'The condition of the upstream filter',
          ]}
          correctIndex={1}
          explanation="Air passing a restriction produces a pressure drop that varies with flow. Measuring that drop is a standard way of determining flow rate without putting anything in the airstream that would obstruct it. Module 2 covers the flow measurement principle behind it properly."
        />

        <SectionRule />
        <ContentEyebrow>Process control industries</ContentEyebrow>

        <ConceptBlock
          title="Pressure, flow, level and composition — and why those four"
          plainEnglish="Chemicals, pharmaceuticals, food and drink, water treatment, oil and gas. Different products, near-identical instrumentation, because they are all moving fluids around and changing them."
          onSite="On process plant the tag numbers do most of the explaining. Walk a line reading tags and you will have the measurement strategy of the unit in your head before anybody briefs you."
        >
          <p>
            The process industries are what most people picture when they hear the word
            instrumentation, and they are where the discipline&rsquo;s vocabulary comes from. What
            unites them is that they take material in, do something to it, and send it out, with
            fluids moving through vessels and pipework in between. That makes four measurements do
            most of the work:
          </p>
          <ul>
            <li>
              <strong>Pressure</strong> — in reactors and vessels, along pipelines, across filters
              and heat exchangers, and in vacuum systems. Pressure is often the fastest indicator
              that something has gone wrong, because it responds before temperature or composition
              do.
            </li>
            <li>
              <strong>Flow</strong> — raw material feed rates, product output, coolant circulation,
              effluent discharge. Flow is what turns a recipe into a rate, and where two streams
              have to be combined in a fixed proportion it is the only way to do it.
            </li>
            <li>
              <strong>Level</strong> — how much is in the vessel. Level protects equipment from
              running dry and protects the site from overflowing, and on batch plant it is often how
              the batch size is set.
            </li>
            <li>
              <strong>Composition</strong> — pH, conductivity, dissolved oxygen, moisture content,
              gas concentration. These are the measurements that speak directly to product quality,
              and they are usually the hardest to keep trustworthy because the sensor is in contact
              with the product and fouls.
            </li>
          </ul>
          <p>
            Two characteristics of process work change the job compared with building services. The
            first is that the plant is often running continuously and cannot simply be switched off
            for you — permits, isolations and process handovers become part of every task. The
            second is that many measurements are directly tied to product quality or to a regulatory
            record, so calibration is not a maintenance nicety but part of what makes the product
            saleable.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Safety instrumentation is deliberately kept apart"
          plainEnglish="The system that runs the plant and the system that stops the plant are separate on purpose. One is trying to make product; the other is trying to prevent a disaster, and it must still work when the first one has broken."
          onSite="If you are asked to work on a trip or an emergency shutdown function, treat it as a different animal from a control loop. Overriding one to get a plant running is a decision with a paper trail behind it, and it is not yours to make alone."
        >
          <p>
            On process plant you will meet two families of instrumentation that look similar and are
            not. <strong>Control instrumentation</strong> is trying to hold the process where it
            should be — the loops from Section 1. <strong>Safety instrumentation</strong> is trying
            to detect that the process has already left the acceptable region and take it to a safe
            state, usually by shutting something down.
          </p>
          <p>
            The reason they are separated is worth understanding rather than memorising. Suppose a
            single level transmitter feeds both the level controller and the high-level trip. If
            that transmitter sticks — reading a comfortable mid-range value while the vessel
            actually fills — the controller happily keeps the inlet valve open because it believes
            the level is fine, and the trip never fires because it believes the same wrong thing.
            One failure has caused the hazard and concealed it in the same instant. Give the trip
            its own sensing element and its own logic, and that failure mode disappears.
          </p>
          <p>
            You will hear the phrase <strong>safety integrity level</strong> used to describe how
            much reliability a given protective function has been assessed as needing. The practical
            consequence for you is that safety-related loops carry documentation, proof-testing
            intervals and change control that ordinary control loops do not. A &ldquo;quick
            change&rdquo; to a control loop might be a job; the same change to a safety function is
            a project.
          </p>
          <p>
            Alongside the trips sit the detection systems: fire detection, flammable and toxic gas
            detection, and emergency shutdown. These are instrumentation in exactly the sense this
            course means — a sensing element, a signal, a decision and an action — but the action is
            protective rather than corrective.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-2-sis"
          question="A high-level trip on a storage vessel uses the same transmitter as the level control loop. Why is that a poor arrangement?"
          options={[
            'The transmitter will wear out twice as fast',
            'A single transmitter fault can both cause the hazard and prevent it being detected',
            'Two systems cannot electrically share one 4–20 mA signal',
            'The trip would respond more slowly than the control loop',
          ]}
          correctIndex={1}
          explanation="It is a common-cause failure. One stuck transmitter tells the controller everything is fine, so it keeps filling, and tells the trip the same thing, so it never operates. Independent sensing is what stops one fault doing both jobs."
        />

        <Scenario
          title="A pasteuriser, and a valve that exists to say no"
          situation="A dairy pasteuriser heats milk to a required temperature and holds it there long enough to make it safe, before cooling it and sending it to filling. If any milk passes through without reaching that temperature for that time, it is not safe, and there is no way to tell by looking at it afterwards."
          whatToDo="Find the measurement that the safety of the product hangs on. A temperature element in the holding tube reports the milk temperature at the end of the hold. That measurement drives a flow diversion valve: while the temperature is at or above the required value the valve routes milk forward to filling, and the instant it drops below, the valve switches and sends the milk back to be reprocessed. The heating loop itself — steam or hot water modulated to hold the temperature — is a separate, ordinary control loop."
          whyItMatters="Notice the split. The control loop is trying to hold the temperature; the diversion valve is not trying to control anything at all. It exists to make sure that when the control loop fails, unsafe product cannot reach the customer. That is the same control-versus-safety distinction as the trip on a chemical vessel, in a building most people would not think of as hazardous. It is also why the temperature element in that holding tube is calibrated, recorded and treated as a legal record rather than as a maintenance item."
        />

        <SectionRule />
        <ContentEyebrow>Building management systems</ContentEyebrow>

        <ConceptBlock
          title="A BMS is instrumentation plus a network plus a schedule"
          plainEnglish="Take all the separate controls in a building, put them on a common network, give them a shared clock and one screen to look at, and you have a BMS. The integration is the point, not the sensors."
          onSite="Ask to see the BMS graphics on any building you work in. Half an hour on the front end will teach you more about how the building is actually run than a week of reading the O&M manuals."
        >
          <p>
            A building full of individually controlled services works, after a fashion. The heating
            holds its temperature, the lighting responds to its own sensors, the ventilation runs
            its own schedule. What none of them can do is act on information that belongs to another
            service. A <strong>building management system</strong> exists to remove that wall.
          </p>
          <p>
            Once occupancy detection, temperature, CO2, lighting level, meter readings and time
            schedules all live on the same network, decisions become possible that no individual
            controller could make:
          </p>
          <ul>
            <li>
              Ventilation to a meeting room can be driven by the CO2 in that room rather than by a
              fixed rate, so an empty room is not being ventilated as though it were full.
            </li>
            <li>
              Heating can be started early or late based on how cold the building actually is and
              how cold it is outside, rather than at a fixed hour every morning.
            </li>
            <li>
              Lighting can respond to daylight and to occupancy together, so a bright perimeter
              office and a dark internal corridor behave differently.
            </li>
            <li>
              Out-of-hours alarms can distinguish between a plant fault worth calling somebody about
              at 3am and one that can wait for the morning.
            </li>
          </ul>
          <p>
            The services talk to one another over open protocols — <strong>BACnet</strong> and{' '}
            <strong>Modbus</strong> are the two you will meet most in UK commercial buildings, with{' '}
            <strong>KNX</strong> common in lighting and room control. You do not need to be able to
            configure them to work productively around a BMS, but you do need to know that a
            &ldquo;sensor&rdquo; on a BMS graphic may be a physical device wired to a controller, or
            a value arriving over a network from somebody else&rsquo;s equipment. Those two fail in
            completely different ways.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Metering — where the electrician&rsquo;s world overlaps most"
          plainEnglish="You cannot manage what you do not measure. Sub-metering breaks a building's consumption down far enough that you can see which part of it is wasting money."
          onSite="A single incoming meter tells you the building used a lot of electricity. It does not tell you the chiller ran all weekend. Sub-metering is what turns a bill into an action."
        >
          <p>
            Energy metering is the part of building instrumentation that sits most squarely inside
            an electrician&rsquo;s existing competence, and it is worth taking seriously because it
            is often the way into instrumentation work. The incoming supply meter is a settlement
            device. Everything downstream of it is measurement for management.
          </p>
          <p>
            <strong>Sub-metering</strong> means installing meters at points within the installation
            — per floor, per tenancy, per plant item, per distribution board — so consumption can be
            attributed. Electrical sub-meters are typically current-transformer based, sitting on
            the conductors rather than in series with them. Gas, water and heat metering follow the
            same logic with different sensing technology, and heat metering in particular needs two
            temperature sensors and a flow meter working together, since the quantity being recorded
            is energy and not volume.
          </p>
          <p>
            What makes metering instrumentation rather than accounting is what happens to the data.
            Trended against time and against occupancy, a sub-meter reading shows a chiller running
            through a weekend, a fan that never turns down, or an immersion heater somebody wired
            permanently live. Trended against a baseline, it shows whether a change actually
            achieved anything. Metering is measurement in service of a decision, exactly like every
            other instrument on this page — the decision is simply a commercial one.
          </p>
          <p>
            One practical note. Where a meter reading is being used to bill a tenant, the
            requirements on accuracy and on the meter&rsquo;s type become a legal question and not
            an engineering preference. Check before specifying, because a meter that is entirely
            adequate for monitoring may not be acceptable for charging somebody.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Blaming the sensor when the problem is where it is mounted"
          whatHappens="A space temperature sensor is fitted where the containment happened to arrive — above a radiator, next to a door, in direct sun through a south-facing window, or on a wall with an unlagged flow pipe behind it. The occupants complain the room is the wrong temperature. The sensor is swapped, then swapped again, then the controller is suspected, then the valve. Every device tests correct."
          doInstead="Treat sensor location as part of the specification, not part of the first fix. A sensor reports its own immediate environment and nothing else, so it must be somewhere that genuinely represents the quantity being controlled — out of draughts, away from direct sun and heat sources, at occupied height, and not on an external wall. When investigating a complaint, go and look at where the sensor is before you test anything. It is the single most common reason a healthy instrument gives a useless number."
        />

        <InlineCheck
          id="ins-1-2-bms"
          question="A BMS graphic shows a supply air temperature that has not changed in four days, while the plant has been cycling normally. What is the most useful first question?"
          options={[
            'Is the controller setpoint correct?',
            'Is that value a live sensor reading, or a fixed value someone entered?',
            'Should the fan speed be increased?',
            'Has the filter been changed recently?',
          ]}
          correctIndex={1}
          explanation="A value frozen while everything around it moves is the signature of a point that is no longer live — a manual override left in place, a network value that has stopped updating, or a sensor input that has failed to a last-known figure. Establish what the number is before deciding whether it is right."
        />

        <SectionRule />
        <ContentEyebrow>Renewable energy and generation</ContentEyebrow>

        <ConceptBlock
          title="Solar PV — measurement is how you find out you are losing money"
          plainEnglish="A PV array has almost nothing to control. What it has is a strong need to know whether it is producing what it should be, because underperformance is silent."
          onSite="An array with a fault produces less. It does not stop, it does not alarm on its own, and nobody notices unless something is measuring against an expectation."
        >
          <p>
            Photovoltaic generation is an unusual case for this course because the classic control
            loop barely appears. You cannot manipulate the sunlight. The inverter does run a real
            control function internally — continually adjusting its operating point to extract the
            most power available from the array — but at plant level, the instrumentation is
            overwhelmingly about knowing rather than acting.
          </p>
          <p>That gives a fairly consistent set of measurements:</p>
          <ul>
            <li>
              <strong>Irradiance</strong> — how much solar energy is actually falling on the array,
              measured in the plane of the modules. This is the reference the whole assessment hangs
              on.
            </li>
            <li>
              <strong>Module temperature</strong> — PV output falls as cell temperature rises, so a
              hot array producing less than a cool one is behaving correctly. Without this
              measurement you cannot tell that apart from a fault.
            </li>
            <li>
              <strong>String and array currents</strong> — one string producing noticeably less than
              its neighbours under the same conditions localises a problem to a part of the array
              rather than to the array as a whole.
            </li>
            <li>
              <strong>DC and AC power</strong> — either side of the inverter, which gives you
              conversion performance as well as output.
            </li>
            <li>
              <strong>Insulation and earth fault monitoring</strong> — a DC-side safety measurement
              rather than a performance one.
            </li>
          </ul>
          <p>
            Put the first two together with the output and you get the central idea:{' '}
            <strong>expected versus actual</strong>. Given this much irradiance at this module
            temperature, the array ought to be producing roughly this much. When it consistently is
            not, something has changed — soiling, shading from vegetation that has grown, a failed
            string fuse, a degrading module, an inverter derating on temperature. None of those
            announce themselves. The measurement is the only thing that does.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Wind and the grid interface — measuring to control, and measuring to survive"
          plainEnglish="A turbine measures the weather so it can position itself in it, and measures itself so it knows when to stop. Anything that exports to the network also has to keep proving it is behaving."
          onSite="Vibration and oil temperature on a gearbox are not there to control anything. They are there so that a bearing gets changed during a planned shutdown rather than at the worst possible moment."
        >
          <p>
            A wind turbine is a much fuller instrumentation system than a PV array, because there
            genuinely is something to manipulate. Wind speed and direction, measured by an
            anemometer and a wind vane on the nacelle, feed two control actions: yawing the nacelle
            to face the wind, and pitching the blades to regulate how much energy is captured. Below
            a certain wind speed there is not enough energy to be worth generating; above another,
            the loads become damaging and the machine must shut down and park. Both of those
            decisions are made on a measurement.
          </p>
          <p>
            Alongside that sits a substantial layer of <strong>condition monitoring</strong>:
            vibration on the drivetrain and gearbox, temperatures on bearings, generator windings
            and oil, rotor speed, and blade pitch position. None of it controls the machine. All of
            it exists because a nacelle is an expensive place to send a crane, and finding a failing
            bearing early converts an emergency into a scheduled job.
          </p>
          <p>
            Then there is the connection itself. Anything exporting into the network is measured at
            the point of connection for frequency, voltage, power factor and power quality, and it
            must disconnect if the network supply is lost — otherwise it could continue energising a
            section of the network that everybody else believes is dead. The detection of that
            condition, and the resulting disconnection, is a protective instrumentation function in
            exactly the sense described earlier: sense, decide, act. The specific settings and the
            testing regime come from the connection agreement with the network operator, and they
            are not something to assume.
          </p>
          <p>
            The same measurement set turns up on battery storage, on combined heat and power, and
            increasingly on larger commercial PV. Once you are exporting, you are being measured.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Why anyone pays for an instrument</ContentEyebrow>

        <ConceptBlock
          title="Five reasons, and every instrument you meet is one of them"
          plainEnglish="Safety, control, efficiency, evidence, condition. Work out which reason a device was installed for and you know how accurate it needs to be, how often it must be proved, and what happens if it fails."
          onSite="Ask the question out loud on site: what decision does this number feed? If nobody can answer, you have either found an instrument nobody needs or a decision nobody is making."
        >
          <p>
            Sector detail is useful, but it is not what makes someone employable across sectors.
            What does is being able to say why a given instrument exists. There are five answers,
            and they are not equally weighted — the reason determines the whole treatment of the
            device.
          </p>
          <ul>
            <li>
              <strong>Safety</strong> — the instrument exists to prevent harm to people, plant or
              the environment. Gas detection, high-level trips, over-pressure protection,
              loss-of-mains detection. These get independence, documented proof testing and change
              control, and they must fail in a direction that is safe.
            </li>
            <li>
              <strong>Control</strong> — the instrument closes a loop. Its accuracy needs to be good
              enough for the process to be held where it should be, and its speed needs to match the
              process. Most instruments on any plant are here.
            </li>
            <li>
              <strong>Efficiency</strong> — the instrument exists so that the same job can be done
              with less energy, less material or less waste. Metering, CO2-based ventilation,
              outdoor compensation. Nothing breaks if it fails; you simply start paying more without
              knowing why.
            </li>
            <li>
              <strong>Evidence</strong> — the instrument produces a record that somebody outside the
              business relies on. Custody transfer metering, effluent discharge monitoring, batch
              records, tenant billing, export metering. These are where calibration traceability
              stops being good practice and becomes the whole point of the device.
            </li>
            <li>
              <strong>Condition</strong> — the instrument watches a machine rather than a process,
              so that maintenance can be planned. Vibration, bearing temperature, oil condition,
              motor current signature. It controls nothing and it protects nothing directly; it buys
              warning time.
            </li>
          </ul>
          <p>
            The categories overlap, and a single device can serve two of them — a flow meter can
            control a dosing rate and produce a discharge record at the same time. When that
            happens, the more demanding reason wins. An instrument doing a control job and an
            evidence job is treated as an evidence instrument, because that is the requirement that
            is harder to satisfy.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Where the electrician fits</ContentEyebrow>

        <ConceptBlock
          title="What transfers straight across, and what you have to add"
          plainEnglish="Your isolation discipline, wiring practice and fault-finding instinct all carry over intact. What is new is process awareness and a habit of not trusting numbers."
          onSite="The fastest route in for most UK electricians is building services — BMS, metering, HVAC controls — because the electrical content is high and the process content is gentle. Process plant tends to want you to have both."
        >
          <p>
            Nothing in this section replaces what you already know. Safe isolation, cable selection,
            containment, termination quality, testing discipline and the habit of proving dead all
            apply, and on some sites they apply more strictly rather than less. What instrumentation
            adds sits on top:
          </p>
          <ul>
            <li>
              <strong>Signal integrity</strong> — instrument circuits carry information at low
              levels, so screening, segregation from power cabling and single-point earthing of
              screens stop being optional refinements. Module 7 covers this.
            </li>
            <li>
              <strong>Process awareness</strong> — you cannot safely isolate a loop without knowing
              what the plant does when that loop goes away. On a live process, the electrical
              isolation is the easy half.
            </li>
            <li>
              <strong>Scepticism about readings</strong> — a number on a screen is a claim made by a
              chain of devices. Section 1 made this point and this section has now shown it three
              times over: the sensor in the radiator plume, the frozen BMS point, the PV array
              quietly producing less than it should.
            </li>
          </ul>
          <p>
            The regulatory position is worth being precise about. Section 557 of BS 7671 covers
            auxiliary circuits, which include those supplying control equipment, instrumentation,
            metering and signalling — so that is the part of the Wiring Regulations that speaks to
            the circuits in this course. Regulation 557.3.1 requires the designer to assess the
            required function of the auxiliary circuit and decide whether its supply is dependent on
            the main circuit or independent of it.
          </p>
          <p>
            Read that against everything above and it stops being an abstract requirement. A control
            loop on a production line may perfectly reasonably die with the plant. A gas detection
            system, an export meter or a BMS out-of-hours alarm plainly must not. Section 557 does
            not tell you which to pick. It requires that somebody picked, deliberately, and can say
            why.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Specifying an instrument on price and range alone"
          whatHappens="A transmitter is chosen because the range covers the process and the price is competitive. It is installed outdoors on a coastal site, or in a wash-down area, or on a line that is steam-cleaned between batches. Within a year the enclosure has let water in, the display is unreadable, and the reading has drifted. The instrument was never wrong for the measurement — it was wrong for the environment."
          doInstead="Specify against the whole duty, not the measurement alone. Ambient temperature range, ingress protection, wash-down and cleaning regime, vibration, chemical compatibility of wetted parts, and any hazardous area classification all have to be satisfied before the measuring range matters. Then ask the maintenance questions: can it be calibrated in place, can it be removed without shutting the process down, and is anybody going to still be supplying it in ten years. The purchase price is usually the smallest number in that whole assessment."
        />

        <FAQ
          items={[
            {
              question: 'Which of these sectors is the easiest to move into from electrical work?',
              answer:
                'Building services — BMS, HVAC controls and metering — is usually the shortest step. The electrical content is high, the processes are slow and forgiving, the environments are familiar, and much of the work sits in buildings you may already be working in. Process plant tends to expect both electrical competence and process understanding, and often site-specific safety training on top.',
            },
            {
              question: 'Do I need to understand chemistry to work on process plant?',
              answer:
                'Not as a chemist, but you do need to understand what the plant does and what the hazards are. You need to know why a vessel is under pressure, what happens if a level runs low, and which lines contain something you must not open. That understanding is what makes an isolation safe, and it is normally taught as site induction rather than assumed.',
            },
            {
              question:
                'Is instrumentation on renewables different from instrumentation elsewhere?',
              answer:
                'The principles are identical. What differs is the balance: renewables lean heavily towards monitoring and condition measurement rather than closed-loop control, because the energy source cannot be manipulated. Add to that a significant grid-interface layer — frequency, voltage, power quality and loss-of-mains detection — that other sectors do not have.',
            },
            {
              question:
                'Why does the same measurement need different instruments in different industries?',
              answer:
                'Because the duty around the measurement changes. Measuring temperature in an office and measuring it in a furnace are the same quantity with completely different requirements for range, response, materials, ingress protection and mounting. The measuring principle may be shared; the device rarely is.',
            },
            {
              question: 'What actually happens when process instrumentation fails?',
              answer:
                'It depends entirely on which of the five reasons the instrument was there for. An efficiency instrument failing costs money quietly. A control instrument failing upsets the process and usually announces itself. A safety instrument failing may do nothing at all until the day it is needed — which is precisely why those are the ones with proof-testing regimes attached.',
            },
            {
              question:
                'Is condition monitoring really instrumentation, if it does not control anything?',
              answer:
                'Yes. It is measurement feeding a decision, which is the definition from Section 1 — the decision is simply a maintenance one rather than a control one. Indicators and recorders sit in the same category. Not closing a loop does not make a device something other than an instrument.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'The four boxes do not change between sectors. What changes is the process variable, the consequence of getting it wrong, and how fast the process moves.',
            'HVAC measures temperature, humidity, CO2, pressure and flow, and much of it infers what it wants from something easier to measure — filter condition from differential pressure, occupancy from CO2.',
            'Process industries run on pressure, flow, level and composition, with continuous operation and product-quality consequences that make calibration part of the product rather than part of maintenance.',
            'Safety instrumentation is kept independent of control instrumentation so that one failure cannot both cause a hazard and hide it.',
            'A BMS is defined by integration — shared network, shared schedule, shared interface — not by the sensors, and sub-metering is where an electrician most often gets involved.',
            'Renewable generation is monitoring-heavy because the fuel cannot be controlled: measure expected against actual, watch machine condition, and prove behaviour at the grid connection.',
            'Every instrument is installed for one of five reasons — safety, control, efficiency, evidence or condition — and the reason sets the accuracy, the proof-testing and the failure consequences.',
            'A healthy sensor in the wrong place gives a useless number. Check where it is mounted before you doubt what it is made of.',
            'BS 7671 Section 557 covers instrumentation, metering and signalling as auxiliary circuits, and Regulation 557.3.1 requires a deliberate choice between a dependent and an independent supply.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 1.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              What instrumentation is
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Measurement, indication and control
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule1Section2;
