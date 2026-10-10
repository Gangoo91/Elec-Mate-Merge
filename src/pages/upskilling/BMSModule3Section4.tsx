/**
 * BMS Module 3 · Section 4 — Demand-based control and load management
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the idea of supplying what
 * the building actually needs rather than what the plant was sized for: variable speed fans and
 * pumps and what they control on (differential pressure, duct pressure, pressure reset),
 * stepped multi-speed pumps, CO2 and air-quality ventilation control, and electrical demand
 * limiting with load shedding, restoration and load cycling. It closes on how to prove it all
 * works. The old page carried invented savings percentages, response-time figures, "ROI in
 * 3–6 months" claims and a data-centre case study with made-up kW and pound figures; all of it
 * has been dropped. The Approved Document L variable speed thresholds are now taught from the
 * 2026 England edition, and life-safety loads are kept out of shed groups per the fire-priority
 * principle.
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

const TITLE = 'Demand-based control and load management | BMS Module 3.4 | Elec-Mate';
const DESCRIPTION =
  'How a BMS matches plant output to real demand: variable speed fans and pumps, pressure control and reset, CO2 ventilation control, and electrical load shedding.';

const outcomes = [
  'Explain the difference between running plant to its design maximum and running it to measured demand',
  'Describe how a variable speed drive on a fan or pump is controlled from a BMS, and what it controls on',
  'Tell constant and proportional differential pressure pump control apart, and say why sensor position matters',
  'Explain how CO2 or air-quality sensors drive ventilation, and where those sensors should go',
  'Describe how demand limiting predicts, sheds and restores loads, and which loads must never be in a shed group',
  'Plan the checks that prove demand-based control and load shedding actually work on site',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An office AHU supply fan runs at full speed from 07:00 to 19:00 every weekday, whatever the floors are doing. What is missing from its control?',
    options: [
      'A time schedule, so it knows when the building is open',
      'A second fan, so the duty can be shared',
      'A link from fan speed to a measure of real need',
      'A faster outstation, so the loop can respond in time',
    ],
    correctIndex: 2,
    explanation:
      'It already has a time schedule, which is why it stops at 19:00. What it lacks is a measured variable such as duct pressure, flow or air quality that lets the output follow the load. A second fan or a faster controller changes nothing if the command is still "full speed whenever open".',
  },
  {
    id: 2,
    question:
      'A heating pump holds a constant differential pressure measured across the pump itself. As zone valves close, what happens?',
    options: [
      'It slows, but keeps the full-load pressure difference',
      'The pump speeds up to keep the flow rate constant',
      'The pump stops, because the BMS sees no demand',
      'The pressure across the pump falls in step with the load',
    ],
    correctIndex: 0,
    explanation:
      'Constant differential pressure control slows the pump as valves close, which saves power, but it keeps the full-load pressure difference across the pump. Letting that pressure fall as the load falls is proportional differential pressure control, which allows a further cut in speed.',
  },
  {
    id: 3,
    question:
      'Why are two-port valves (or PICVs) normally part of a variable speed pumping system?',
    options: [
      'They stop the pump from cavitating at low speed',
      'They let the drive run without a speed reference signal',
      'They are the only valves that accept a 0–10 V signal',
      'Their closing makes the system flow follow demand',
    ],
    correctIndex: 3,
    explanation:
      'A variable speed pump only saves anything if the flow the system needs actually changes. Two-port valves throttle and close as their loads are satisfied, so the system flow falls and the pump can slow. Many valve types take 0–10 V; that is not the reason.',
  },
  {
    id: 4,
    question:
      'Under Approved Document L (England), a pump on a closed-loop variable volume circuit needs a variable speed controller when its motor is rated above what?',
    options: ['250 W', '750 W', '1100 W', '2200 W'],
    correctIndex: 1,
    explanation:
      'A closed-loop water pump in a variable volume system with a motor rated above 750 W should have a suitable variable speed controller, either fitted to it or controlling it (paragraph 6.43 of the 2021 edition in force now; 5.49 from 24 March 2027). 1100 W is the threshold for general air distribution fans, which is the figure people mix up with it.',
  },
  {
    id: 5,
    question:
      'A classroom CO2 sensor has been fitted on the wall right beside the supply air grille. What will the ventilation control most likely do?',
    options: [
      'Over-ventilate, because the sensor reads high all day',
      'Under-ventilate, as it sees supply air, not room air',
      'Work normally, because CO2 mixes evenly within seconds',
      'Shut the AHU down on a sensor fault alarm',
    ],
    correctIndex: 1,
    explanation:
      'A sensor washed by incoming fresh air reads lower than the room the pupils are breathing, so the control thinks the space needs less air than it does. Room sensors belong on an open wall at breathing height, and duct sensors in the extract, close to the room outlets.',
  },
  {
    id: 6,
    question: 'What does CO2 measured in an occupied room actually tell the BMS?',
    options: [
      'Roughly how many people are using the space',
      'Whether the room temperature is comfortable',
      'Whether the heating plant is burning cleanly',
      'How much fresh air the AHU has been designed for',
    ],
    correctIndex: 0,
    explanation:
      'People breathe out CO2, so its concentration rises with the number of occupants and falls as fresh air dilutes it. That makes it a stand-in for occupancy and ventilation need. It says nothing about comfort temperature, combustion or the design air volume.',
  },
  {
    id: 7,
    question:
      'A demand-limiting routine is set up on a site supplied on a maximum demand tariff. What does it base its decision to shed on?',
    options: [
      'The instantaneous current on the main incomer at that second',
      'A fixed time of day agreed with the facilities manager',
      'The outside air temperature and the heating curve',
      'Predicted demand at the end of the metering interval',
    ],
    correctIndex: 3,
    explanation:
      'The supplier charges on demand measured over its metering interval, so the routine tracks that interval and forecasts where the total will end up. Shedding on an instantaneous spike would throw loads off for nothing; shedding on a clock ignores what the building is drawing.',
  },
  {
    id: 8,
    question: 'Which of these loads should never be placed in a BMS load-shed group?',
    options: [
      'External feature lighting on a timer',
      'A smoke control fan that the fire strategy relies on',
      'An electric towel rail circuit in staff toilets',
      'A domestic hot water immersion heater with stored capacity',
    ],
    correctIndex: 1,
    explanation:
      'Fire and life-safety plant is driven by the fire system and its own interfaces, and a fire signal must take priority over every automatic command. Putting a smoke fan where a cost-saving routine can stop it breaks that rule. The other three can tolerate a short interruption.',
  },
  {
    id: 9,
    question:
      'A demand-limiting routine has a two-stage alarm. What do the two stages tell the operator?',
    options: [
      'First that the limit may be exceeded, then that it has been',
      'First that a load has been shed, then that it has been restored',
      'First that the meter pulse is lost, then that the BMS is offline',
      'First that the tariff has changed, then that the limit needs resetting',
    ],
    correctIndex: 0,
    explanation:
      'The first stage warns that the predicted demand is heading over the limit, so somebody can act. The second says the limit has actually been exceeded. Shedding and restoring are the routine’s normal work, not alarm stages.',
  },
  {
    id: 10,
    question:
      'You are witnessing a load-cycling routine on an air handling unit. What is the most important thing to check while it runs?',
    options: [
      'That the drive display shows the expected frequency',
      'That every contactor in the panel has been labelled',
      'That the routine runs at the same time every day',
      'That room conditions stay within their limits',
    ],
    correctIndex: 3,
    explanation:
      'Load cycling only earns its place if the occupants do not notice it. The proof is in the room conditions, logged while the plant is cycled off and on. Labels and drive displays matter, but they do not show whether the strategy has made the space worse.',
  },
];

const BMSModule3Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 4"
        title="Demand-based control and load management"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Making plant follow the real load, and keeping the site under its electrical limit when
          everything wants to run at once. Plant is sized for the worst day of the year and spends
          most of its life doing far less, so this is where much of a building&rsquo;s energy is won
          or lost.
        </p>

        <TLDR
          points={[
            'Demand-based control means the plant output follows a measured need (pressure, flow, CO2, occupancy) instead of running at its design maximum whenever the building is open.',
            'Variable speed drives on fans and pumps are the main tool. The BMS enables the drive and the drive (or the BMS) trims speed to hold a pressure or flow setpoint.',
            'Where the pressure is measured, and whether its setpoint falls with the load, decides how much the drive can actually slow down.',
            'CO2 and air-quality sensors let ventilation follow how many people are in a space, but only if they are sited where they read the room.',
            'Load shedding watches demand over the supplier metering interval, sheds low-priority loads before the limit is breached and brings them back afterwards. Life-safety plant is never in a shed group.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The idea</ContentEyebrow>

        <ConceptBlock
          title="Supply what is needed, not what the plant can give"
          plainEnglish="Most of the time the building needs a fraction of what the plant was designed for. Demand-based control lets the plant notice that and turn itself down."
          onSite="When you look at a strategy, ask one question of every fan and pump: what measured value makes this go faster or slower? If the answer is nothing, it is running to a clock, not to demand."
        >
          <p>
            Heating, cooling and ventilation plant is selected for design conditions: the coldest
            morning, the hottest afternoon, every desk and meeting room full. Those conditions
            happen for a handful of hours a year. For the rest of the time the plant is at part
            load, and the question is whether its controls know that.
          </p>
          <p>
            It helps to think of control as a ladder. At the bottom, nothing controls the plant and
            it simply runs. One rung up, somebody switches it by hand. Then a time schedule starts
            and stops it, which is what Section 3.3 covered. Above that, presence detection runs it
            only when somebody is actually there. At the top, the output is varied continuously by a
            measurement of need: how many people are in the space, how good the air is, how much
            water or air the terminal units are asking for.
          </p>
          <p>
            An air handling unit with only a time schedule still delivers enough air for every room
            at full occupancy for the whole of the occupied day. Give it flow or pressure control,
            and the air volume follows what the connected rooms are taking, so the fan draws less
            power at part load. The same is true of a pump serving valves that open and close
            through the day.
          </p>
          <p>
            This is also how the performance of building controls is now described. BS EN ISO
            52120-1 sorts building automation and control into efficiency classes, from A (high
            energy performance) down to D (not energy efficient). Ventilation is a good illustration
            of the difference: a fixed-schedule system with no occupancy or CO2 input sits at the
            lower end, occupancy-based control sits higher, and zone ventilation driven by CO2 or
            air-quality sensors is the kind of function associated with Class A.
          </p>
        </ConceptBlock>

        <Pullquote>
          A schedule tells the plant when the building is open. Demand-based control tells it how
          much of the building is actually being used.
        </Pullquote>

        <InlineCheck
          id="bms-3-4-ladder"
          question="An extract fan in a meeting room runs whenever a PIR sees movement, and stops ten minutes after the room empties. Which rung of the ladder is that?"
          options={[
            'Time control',
            'Manual control',
            'Presence control',
            'Demand control on air quality',
          ]}
          correctIndex={2}
          explanation="It runs on presence: someone is there, so it runs. It does not vary its output with how many people are in the room or how stale the air has become, which is what a CO2 or air-quality input would add. That is the next rung up."
        />

        <SectionRule />
        <ContentEyebrow>Variable speed fans and pumps</ContentEyebrow>

        <ConceptBlock
          title="Why speed control is the big lever"
          plainEnglish="Slow the motor down and it does less work. Fans and pumps are where most of the electrical energy in an HVAC system goes, so that is where speed control pays."
          onSite="When you are wiring a drive, you are wiring the single piece of equipment most likely to decide how much electricity that plant room uses. Treat its control wiring with the same care as its power wiring."
        >
          <p>
            A variable speed drive (VSD, also called an inverter or a variable frequency drive) sits
            between the supply and an AC motor. It changes the motor speed by changing the frequency
            of the supply it feeds to the motor, and it adjusts voltage and current to control
            torque. To the BMS it is just another final control element, in the same family as a
            valve actuator or a damper motor.
          </p>
          <p>
            The old way of reducing the flow from a fixed-speed fan or pump was to throttle it: a
            damper or valve partly closed in front of a motor still turning at full speed. The motor
            keeps working against the restriction, and much of the energy goes into pushing against
            a part-closed blade rather than moving air or water. Reducing the speed instead takes
            the energy out at source.
          </p>
          <p>
            For fans and centrifugal pumps, the power drawn falls away much more steeply than the
            speed does. A modest cut in speed gives a large cut in power, which is why a fan
            spending most of its day at reduced speed uses far less electricity than one throttled
            to the same flow. You do not need the maths to use this on site; you need to know that a
            drive held at full speed by a bad setpoint or a forced override throws most of the
            benefit away.
          </p>
          <p>
            The Building Regulations expect speed control on larger fans and pumps. In the 2021
            England edition of Approved Document L, the one in force now (paragraphs 6.42, 6.43,
            6.48 and 6.49; 5.48, 5.49, 5.52 and 5.53 from 24 March 2027), variable volume systems
            should use variable speed glandless circulators; a water pump on a closed-loop variable
            volume circuit with a motor rated above 750 W should have a suitable variable speed
            controller, either fitted to it or controlling it; and fans for general air distribution
            rated above 1100 W should have variable speed drives. Air handling systems are also
            expected to have a specific fan power, when running at 25% of design flow, no worse than
            their figure at full design flow. Put simply, the fan must stay efficient when it is
            turned down. Wales and Scotland carry the same pump and fan thresholds; the Scottish
            guidance adds that the fan provision does not apply to smoke control fans that only run
            in abnormal circumstances.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsVsd}
          topic="Watch · what is inside the drive"
          caption="Watch how the drive turns a fixed supply into a variable frequency for the motor. Then picture the BMS end of it: an enable contact, a 0–10 V speed reference, and run and fault signals coming back."
        />

        <ConceptBlock
          title="How the BMS talks to a drive"
          plainEnglish="The BMS tells the drive to run, tells it how fast, and listens for whether it is running and whether it has tripped."
          onSite="Check whether the speed reference comes from a BMS analogue output or from the drive's own internal PID loop with a sensor wired straight to it. It changes where you look when the fan hunts."
        >
          <p>
            A hardwired drive interface usually has four parts. A digital output from the BMS closes
            a volt-free contact into the drive's run input to enable it. An analogue output sends
            the speed reference, commonly 0–10 V DC, where 0 V means zero speed and 10 V means full
            speed. A run status and a fault (trip) signal come back to digital inputs. Many sites
            also bring back the actual speed or frequency as an analogue input, so the head end
            shows what the fan is doing, not just what it was told.
          </p>
          <p>
            The same information can travel over a network instead. Most drives have a Modbus or
            BACnet port, and a single comms cable can carry the run command, the speed reference,
            the status, the fault code and readings such as motor current and energy used. That is
            more information for less wire, but if the comms link fails the drive needs a defined
            behaviour, which is a decision for the controls engineer and the mechanical designer.
          </p>
          <p>
            There are two common ways to close the loop. In the first, the BMS outstation runs the
            PI loop: it reads the pressure sensor, compares it with the setpoint and drives the 0–10
            V output. In the second, the pressure sensor is wired to the drive and the drive's own
            PID function holds the setpoint, with the BMS only enabling it and perhaps writing a new
            setpoint. Both work. What matters is that everyone on the job knows which one has been
            built, because fault finding starts in a different place for each.
          </p>
          <p>
            Section 2.7 covered the panel side of this: interposing relays, Hand/Off/Auto and why
            safety stops sit upstream of the BMS. Nothing about demand-based control changes those
            rules. A drive turned down to save energy must still do what the fire strategy says the
            moment the fire signal arrives: stop, for most supply and extract fans; run, for smoke
            control fans, which are a separate design. A hardwired safety must stop it through the
            drive&rsquo;s hardwired enable or a contactor, whatever the speed reference says.
          </p>
          <p>
            The power side has its own rules. A drive can produce smooth DC and high-frequency
            residual currents, so if the circuit has RCD protection, confirm the RCD Type the drive
            maker requires before you select it. Use the motor cable type and screen termination the
            drive maker specifies, usually a screened cable with the screen bonded all the way round
            at both glands, and keep it away from control and data cables. If there is a local
            isolator between the drive and the motor, follow the maker&rsquo;s instructions: many
            require an early-break auxiliary contact into the drive so the motor is never switched
            under load.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-4-drive-points"
          question="The head end shows an AHU supply fan as running at full speed, but the fan is clearly turning slowly. Which extra point would have shown the problem straight away?"
          options={[
            'A second run enable output',
            'An actual speed or frequency feedback input',
            'A duplicate fault input from the drive',
            'A Hand/Off/Auto status input',
          ]}
          correctIndex={1}
          explanation="Without feedback, the head end can only show what the BMS asked for. An analogue input carrying the drive's actual speed or output frequency shows what the fan is really doing, so a lost or wrongly scaled speed reference stands out at once."
        />

        <SectionRule />
        <ContentEyebrow>What the drive controls on</ContentEyebrow>

        <ConceptBlock
          title="Holding a pressure: pumps and fans"
          plainEnglish="The pump does not know how much heat the building needs. It watches a pressure difference, and the valves out on the system decide the rest."
          onSite="Find the differential pressure sensor before you assume anything about the strategy. Across the pump, across a branch, or at the far end of the system: each one tells you something different. On an AHU that never leaves full speed, check the duct pressure setpoint and sensor position before you blame the drive."
        >
          <p>
            On a variable flow heating or chilled water system, the terminal units are fed through
            two-port control valves, often pressure-independent control valves (PICVs). As each area
            reaches its setpoint, its valve closes down. The flow the system needs falls, and the
            pressure difference across the pipework starts to rise. A differential pressure sensor
            sees that rise, and the controller slows the pump to bring it back to setpoint. PICVs
            are popular in exactly these systems because they compensate for pressure changes on
            their own and stop one area robbing another as the pump speed moves.
          </p>
          <p>
            The simplest version measures differential pressure across the pump and holds it
            constant. The pump slows as valves close, which saves power, but it keeps the full-load
            pressure difference even when hardly anything is open.
          </p>
          <p>
            The better version lets that pressure fall as the load falls, either by measuring out in
            the system where the pressure is lowest (often called the index circuit) or by reducing
            the setpoint in proportion to flow. At low load the pump only has to make enough
            pressure for what is actually open, so it can run slower still and draw less power. This
            is proportional differential pressure control, and many modern circulators offer it as a
            built-in mode.
          </p>
          <p>
            For the electrician, the practical point is the sensor. A differential pressure
            transmitter fitted in the wrong place, piped the wrong way round, or with one impulse
            line blocked will feed the loop a false picture, and the pump will either race or starve
            the far end of the building.
          </p>
          <p>
            <strong>Fans work the same way.</strong> In a variable air volume system, each zone has
            a VAV box with a damper that opens and closes to meet its own temperature. The supply
            fan is controlled from a static pressure sensor in the main duct, or from a measured air
            flow, so that as the boxes throttle back the fan speed follows them down. At part load,
            the electrical power at the fan falls.
          </p>
          <p>
            Pressure reset is the refinement. A fixed duct pressure setpoint has to be high enough
            for the worst-placed box at full load, which means most of the time it is higher than
            anything needs. With reset, the BMS watches the box damper positions and lowers the
            pressure setpoint until at least one box is close to fully open. The fan then runs at
            the lowest speed that still satisfies every zone.
          </p>
          <p>
            Reset strategies are where integration matters. The AHU controller needs to read the VAV
            boxes, which usually means the boxes are on a network and mapped into the same system.
            If that data is missing or stale, a well-written reset routine either holds the pressure
            high or, worse, drops it too far and starves a zone.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Fitting a drive to a system whose flow never changes"
          whatHappens="A pump or fan is given a new variable speed drive, but the system it serves still has three-port valves, open bypasses or dampers that never close. The flow the system needs stays the same all day, the pressure never rises, and the drive sits at or near full speed. The client paid for a drive and sees no difference."
          doInstead="Before the drive goes in, ask what will make the system flow fall at part load: two-port valves or PICVs on the terminals, VAV boxes, closed bypasses. If nothing will, raise it with the mechanical designer. A drive only saves energy when the system downstream can actually ask for less."
        />

        <InlineCheck
          id="bms-3-4-index"
          question="A chilled water pump is on differential pressure control. The sensor is moved from across the pump to the far end of the system. What should the pump do at low load?"
          options={[
            'Run faster, because the far end always reads low',
            'Run at a fixed speed, because the far end does not change',
            'Trip, because the sensor is now out of range',
            'Run slower than before, because less pressure is wasted',
          ]}
          correctIndex={3}
          explanation="Measured at the far end, the loop only holds the pressure the furthest terminal needs. It no longer has to keep the full-load pressure difference across the pump, so as valves close the pump can turn down further. That is the point of moving the sensor."
        />

        <SectionRule />
        <ContentEyebrow>Stepped speed</ContentEyebrow>

        <ConceptBlock
          title="Multi-speed pumps and fans"
          plainEnglish="Not every motor has a drive. Some have a few fixed speeds, and the BMS picks one."
          onSite="On a multi-speed unit, each speed is usually its own BMS output. Check the strategy and the starter interlocks so that two speeds can never be selected at once."
        >
          <p>
            Before drives became cheap, the usual way to give a pump or fan more than one duty was
            to build the motor or its control with a small number of fixed speeds. You will still
            meet these, particularly on older plant, on smaller circulators and on fan coil units,
            where a selector or a set of relays picks low, medium or high.
          </p>
          <p>
            From the BMS point of view, a multi-speed device is a set of digital outputs rather than
            one analogue output. The strategy chooses a speed step from the demand: low when only
            part of the system is calling, high when it all is. It cannot hold an exact pressure,
            and it moves in jumps rather than smoothly, but it still gets the plant off full speed
            for much of the day.
          </p>
          <p>
            The control logic should never be able to energise two speeds together, and there is
            usually a short pause when changing from one to another. Those protections normally live
            in the starter or the unit's own control board, not only in BMS software. When you
            replace or rewire one of these, keep the interlocks intact and confirm each speed output
            switches the speed it is labelled for.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Ventilation on demand</ContentEyebrow>

        <ConceptBlock
          title="CO2 and air-quality control, and where the sensor goes"
          plainEnglish="People breathe out CO2. The more people in a room, the higher it climbs. Measure it, and you know how much fresh air the room needs right now."
          onSite="A ventilation system on CO2 control that runs flat out all day, or never ramps up at all, is usually telling you about the sensor, not the strategy. Stand where the occupants sit and look at it: beside a door, a window or a supply grille, it will lie."
        >
          <p>
            Demand-controlled ventilation varies the fresh air rate according to a measure of need:
            air quality, moisture, occupancy or some other indicator. The most common measure in
            offices, schools and meeting rooms is carbon dioxide. Because occupants breathe it out,
            the CO2 level in a space gives a fair indication of how many people are using it, and
            the BMS can raise or lower the air supply to keep the space properly ventilated.
          </p>
          <p>
            The alternative is a mixed-gas or VOC sensor, which responds to a range of gases,
            including odours and fumes from things like cleaning products. It gives a rough clean or
            dirty indication rather than a people count, and it suits spaces where the pollution is
            not mainly from occupants.
          </p>
          <p>
            Demand control trims the air above a floor; it never removes the floor. The minimum
            ventilation for a space comes from the ventilation design, which in England follows
            Approved Document F. The strategy should hold at least that minimum whenever the space
            is in use, and only add air above it when the sensor calls for more. Setpoints, minimum
            rates and ramp rates are for the mechanical designer and controls engineer to set. Do
            not change them to stop a complaint.
          </p>
          <p>
            The output of a CO2 loop can go to several places: the AHU fan speed, the outside air
            damper position, or a zone VAV box. Often it is combined with temperature, so the zone
            gets more air for whichever need is greater.
          </p>
          <p>
            Demand control sits on top of the time schedule from Section 3.3, not instead of it. The
            schedule still decides when the space can be occupied; the sensor decides how much air
            it gets while it is.
          </p>
          <p>
            <strong>Siting decides whether it works.</strong> A room-mounted air-quality sensor
            should be sited where it represents the air people are actually breathing, typically on
            an open wall between 1.5 m and 1.8 m above the floor. Keep it away from supply
            diffusers, opening windows, doors, and anywhere people lean over it or breathe straight
            on it.
          </p>
          <p>
            A duct-mounted sensor belongs in the extract duct, as near to the room's air outlets as
            you can get it, so it samples air that has just left the space. A sensor in the supply
            duct measures the air the AHU is sending, which says nothing about the room.
          </p>
          <p>
            CO2 sensors can drift over time. One that reads low will starve the room of fresh air;
            one that reads high will keep the fan running at speed for no reason. Check a doubtful
            sensor against a calibrated instrument in the same spot before you condemn the strategy.
          </p>
        </ConceptBlock>

        <Scenario
          title="The school hall that never ventilated properly"
          situation="A secondary school hall has an AHU with CO2 control. Teachers say it gets stuffy during assemblies and exams, yet the trends show CO2 always low and the fan barely leaving minimum speed. The room sensor was moved during a redecoration and now sits on the wall right beside the main supply grille, at roughly head height for someone standing."
          whatToDo="Confirm the symptom first: compare the BMS reading with a calibrated handheld CO2 instrument held in the seating area during a full assembly. If the handheld reads well above the BMS sensor, the sensor is reading supply air. Agree a new position with the controls engineer (an open wall in the occupied zone, at breathing height, away from the grille), or move to an extract duct sensor close to the room outlets. Re-terminate, check the reading on the head end, then trend it through the next full assembly."
          whyItMatters="Nothing was wrong with the fan, the drive or the strategy. One sensor in the wrong place turned a demand-controlled system into one that under-ventilated a full hall. The same check, comparing the BMS value with a trusted instrument where the people are, finds most demand-control faults quickly."
        />

        <InlineCheck
          id="bms-3-4-co2-duct"
          question="You are asked to fit a duct CO2 sensor for an office AHU's demand control. Where should it go?"
          options={[
            'In the supply duct, just after the AHU fan',
            'In the extract duct, close to the room air outlets',
            'In the fresh air intake, before the filters',
            'In the plant room, beside the outstation',
          ]}
          correctIndex={1}
          explanation="The sensor needs air that has just come out of the occupied space, so it goes in the extract duct close to the room outlets. Supply and intake air tell you about the air going in, not about how many people are in the room."
        />

        <SectionRule />
        <ContentEyebrow>Electrical load management</ContentEyebrow>

        <ConceptBlock
          title="Demand limiting and load shedding, and what you build for it"
          plainEnglish="Some sites pay a penalty when their electrical demand goes over a limit. The BMS can watch the meter, see the limit coming, and switch off unimportant loads for a short while."
          onSite="Load shedding is only as good as the wiring behind it. Every sheddable load needs its own controllable contactor or relay, and every shed point needs to be labelled so that the next person knows the BMS can switch it. Mark the shed groups on the as-fitted drawings too."
        >
          <p>
            Load shedding means switching off selected electrical equipment when the site load is
            heading over a set limit. On larger supplies the charge depends partly on the highest
            demand recorded in a metering period, so a short peak can cost money for a long time.
            Shedding exists to reduce the risk of those maximum demand penalty charges. On many UK
            supplies the limit is the agreed supply capacity, measured in kVA, so poor power factor
            uses up headroom as surely as extra load does. The demand signal you wire should be the
            quantity the tariff actually charges on.
          </p>
          <p>
            A well-built demand-limiting routine works in steps. It monitors electrical demand over
            an interval that matches the supplier's metering. Partway through each interval, it
            predicts whether the total by the end is going to exceed the limit. If it is, it sheds
            loads, or transfers them to another energy source where one exists, to pull the total
            back. When the prediction falls comfortably below the limit, it restores what it shed. A
            two-stage alarm tells the operator first that the limit is likely to be exceeded, and
            second that it actually has been.
          </p>
          <p>
            Loads are arranged in priority groups, so the least important go first and the more
            important go only if that is not enough. Each load or group can be given a maximum
            off-time, so nothing stays off long enough to cause a problem, and a minimum on-time, so
            the same load is not switched in and out every few minutes. The limit and the routines
            are adjusted to suit the supply tariff, so they need revisiting when the contract
            changes.
          </p>
          <p>
            Load cycling is a related, gentler idea: selected plant is switched off for short,
            adjustable periods to save energy, with control limits to stop conditions drifting. Both
            depend on the same thing: knowing which loads can stand a short interruption.
          </p>
          <p>
            Be clear about what load shedding is not. It is a way of managing cost and demand, not a
            form of circuit protection. The supply, the switchgear and every protective device must
            still be designed for the load they can actually see, because a BMS that is offline, in
            Hand or mid-restart will not shed anything at all.
          </p>
          <p>
            <strong>What you build for it.</strong> The routine is software, but what actually works
            on the day is contactors, relays, meters and labels. Demand limiting needs a reliable
            demand signal. That usually means a meter on the main incomer feeding the BMS by pulse
            output or over a network such as Modbus or M-Bus, or current transformers into a power
            meter. Section 4.5 (Metering and sub-metering) covers metering in detail; here the point
            is that the BMS cannot limit what it cannot measure, and a wrongly scaled pulse input
            makes every decision wrong.
          </p>
          <p>
            Each sheddable load needs a way for the BMS to switch it. On a distribution board that
            is normally a contactor controlled through an interposing relay from a BMS digital
            output, with a status contact back so the BMS can see the load really went off and came
            back. For plant with its own controller, such as an AHU or a chiller, the shed command
            may instead be a signal into that controller, which then decides how to unload safely.
          </p>
          <p>
            Think about failure. If the BMS output fails or the outstation loses power, the
            contactor should drop to the state the design wants, which for most sheddable loads is
            "on and running normally". That choice is made with normally closed or normally open
            contacts at the design stage, and it is the electrician who builds it correctly.
          </p>
          <p>
            Grid-facing demand response, where a building trims its load at the request of the
            supplier or network, and dynamic load management across groups of EV chargers use the
            same building blocks. The difference is where the instruction comes from.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Putting the wrong load in a shed group"
          whatHappens="A shed group is built from a circuit list, and someone includes a load because it is big and looks optional: a sprinkler or smoke ventilation supply, a frost protection pump, a lift, a server room cooling unit. The first time the site approaches its limit, the BMS turns it off. At best, someone complains; at worst, life-safety plant has been placed under a cost-saving routine."
          doInstead="Go through every candidate load with the client and the controls engineer before it is wired into a group. Life-safety and fire plant is driven by the fire system and must never be under a shed routine; a fire signal takes priority over everything. Keep sheddable loads on their own clearly labelled contactors, record the groups in the O&M information, and prove each one in testing."
        />

        <InlineCheck
          id="bms-3-4-restore"
          question="A demand-limiting routine shed the staff kitchen water heaters during a peak and never brought them back. Which setting would have prevented that?"
          options={[
            'A higher demand limit',
            'A shorter metering interval',
            'A maximum off-time on that group',
            'A second stage on the alarm',
          ]}
          correctIndex={2}
          explanation="A maximum off-time forces a shed load back on after a set period, whatever the routine is predicting. Raising the limit or changing the interval alters when shedding happens, not whether the load returns, and the alarm only tells the operator."
        />

        <SectionRule />
        <ContentEyebrow>Proving it works</ContentEyebrow>

        <ConceptBlock
          title="Commissioning and checking demand-based control"
          plainEnglish="If you cannot show it on a trend, you cannot say it is working."
          onSite="Ask for trends of speed, pressure and setpoint on the same graph. A drive that sits at one speed all day, whatever the building does, is the quickest fault you will ever find."
        >
          <p>
            Demand-based strategies fail quietly. A fan stuck at full speed still keeps everyone
            comfortable, so nobody rings in; the only sign is a bigger bill. That is why proving
            them means logging and reading trends, not just watching the plant start.
          </p>
          <p>
            For variable speed plant, trend the controlled variable (differential or duct pressure),
            its setpoint and the drive speed together. Close some valves or boxes and watch the
            speed follow. If there is a reset strategy, check the setpoint actually moves. Confirm
            the drive's run and fault signals reach the BMS and that a trip raises the alarm it
            should.
          </p>
          <p>
            For ventilation on CO2 control, log air flow or CO2 levels alongside the damper
            positions and check they respond as the room fills and empties. For load cycling, check
            the off periods and the control limits, and confirm that temperature, humidity and CO2
            stay within their specified limits while the plant cycles. For load shedding, check both
            the shedding and the restoring of each group in turn, against the specification, with
            the status of each contactor confirmed rather than assumed.
          </p>
          <p>
            Record what you leave behind. The setpoints, minimum speeds, shed groups, off-times and
            the demand limit all belong in the commissioning record and the O&amp;M information, so
            that whoever looks at the site next year can tell whether anything has been changed. A
            demand-based strategy that nobody can read back is one that will be overridden at the
            first complaint and never put back.
          </p>
          <p>
            Finally, come back to it. Demand-based control is worth checking again once the building
            is occupied and the seasons have turned, because the loads it was set up against during
            commissioning are rarely the loads it meets in use.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Vol 2 (England, 2021 edition, in force now)"
          clause="In a new building whose heating, air-conditioning or combined plant has an effective rated output above 180 kW, a building automation and control system should be installed (para 6.66). In an existing building above that size, the same specification applies when a BACS is installed or replaced (para 6.67). The system is expected to meet BS EN ISO 16484, monitor, log and analyse energy use continuously, and pick up losses in efficiency (para 6.72)."
          meaning="On larger buildings the control system is expected to notice when demand-based control has stopped working, for example a drive stuck at full speed, rather than leaving it to the next energy bill. From 24 March 2027 these become paras 5.76, 5.77 and 5.84 of the 2026 edition. Approved Document L is statutory guidance, not law in itself. In Wales the threshold is 290 kW, falling to 180 kW from 4 March 2027; in Scotland it is 290 kW."
          cite="ADL Vol 2 2021, paras 6.66–6.67 and 6.72–6.73; 2026 edition (from 24 March 2027) paras 5.76–5.77 and 5.84–5.85"
        />

        <FAQ
          items={[
            {
              question: 'Do I need to understand the drive parameters to wire a VSD for a BMS?',
              answer:
                'You need to know which terminals are the run enable, the speed reference and the status and fault outputs, and what signal type the reference expects. Setting ramp times, minimum and maximum speeds and the drive’s own PID loop is commissioning work, normally done by the controls engineer or the drive supplier. Leave those settings alone unless you have been asked to set them and know what the design wants.',
            },
            {
              question:
                'Why would a pump on differential pressure control run flat out all the time?',
              answer:
                'The usual causes are a setpoint set too high, a sensor sited across the pump instead of out in the system, a blocked or reversed impulse line, three-port valves or open bypasses that stop the system flow from ever falling, or the drive left in Hand at full speed. Trend pressure, setpoint and speed together and the cause normally shows itself.',
            },
            {
              question: 'Is it safe to let the BMS switch off loads automatically?',
              answer:
                'It is, provided the loads have been chosen with care, nothing to do with life safety or fire is ever in a shed group, each group has a maximum off-time, and the contactors fail to the state the design intends. Test shedding and restoring every group before handover.',
            },
            {
              question: 'Is it worth replacing a multi-speed pump with a variable speed one?',
              answer:
                'Often, but it is a mechanical design decision, not an electrical one. A variable speed pump can hold a pressure setpoint smoothly and turn down further, while a stepped pump can only jump between its set speeds. The benefit depends on whether the system flow really varies. Your part is the supply, the isolation, the control wiring and making sure the BMS points are mapped to the new unit.',
            },
            {
              question: 'Can I just turn the CO2 setpoint down if a room feels stuffy?',
              answer:
                'Do not change it on your own. First check whether the sensor is reading the room, by comparing it with a calibrated instrument where the occupants sit. Most stuffy rooms on CO2 control are a siting or drift problem, and changing the setpoint hides the fault while using more energy.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Demand-based control varies plant output with a measured need (pressure, flow, CO2 or occupancy) instead of running at design maximum whenever the building is open.',
            'Variable speed drives are the main lever: the BMS enables the drive, sends a speed reference (often 0–10 V) or setpoint, and reads back run, fault and speed.',
            'In England, fans for general air distribution above 1100 W should have variable speed drives, and closed-loop pumps above 750 W in variable volume systems should have variable speed control.',
            'Proportional or remote differential pressure control lets a pump turn down further than constant pressure across the pump; pressure reset does the same for VAV fans.',
            'CO2 sensors indicate occupancy. Site room sensors on an open wall at 1.5–1.8 m, and duct sensors in the extract close to the room outlets.',
            'Load shedding predicts demand over the supplier metering interval, sheds by priority, restores afterwards and limits off-time. Fire and life-safety plant is never in a shed group.',
            'On fire, a drive does what the fire strategy says: most fans stop, smoke control fans run. Hardwired safeties act through the drive’s hardwired enable or a contactor, not the speed reference.',
            'Prove it with trends: speed, pressure and setpoint together; room conditions during load cycling; shed and restore for every group.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3-section-3"
          prevLabel="Time and occupancy"
          nextHref="/study-centre/upskilling/bms-module-3-section-5"
          nextLabel="Overrides, frost protection and seasonal change"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section4;
