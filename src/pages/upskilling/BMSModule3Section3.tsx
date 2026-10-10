/**
 * BMS Module 3 · Section 3 — Time and occupancy
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches how a BMS decides when plant should
 * run: weekly time programmes, exception schedules and calendars for holidays, occupied and
 * unoccupied modes with night setback, optimum start and optimum stop (what they compute, what
 * the operator can adjust, how they go wrong), occupancy detection and what a presence signal
 * can and cannot tell the controls, timed occupancy overrides, and how to check all of it at
 * commissioning and on a service visit. The old page carried a mounting-height table, sensor
 * ranges, warm-up times, a tariff table, an outdoor CO2 figure, CO2 bands and several savings
 * percentages with no source; all of those are gone. Demand-controlled ventilation and load
 * shedding moved to 3.4, where they belong.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Time and occupancy | BMS Module 3.3 | Elec-Mate';
const DESCRIPTION =
  'How a BMS decides when plant runs: weekly programmes, holidays and exception schedules, optimum start and stop, presence detection and timed overrides.';

const outcomes = [
  'Explain what a time programme actually writes to the plant, and why it switches modes rather than relays',
  'Set out how exception schedules and calendars handle holidays, closures and special events, and which one wins',
  'Describe what optimum start and optimum stop calculate, and name the settings an operator can adjust',
  'Say what a presence detector can and cannot tell a BMS, and where occupancy control suits the plant',
  'Recognise a well-made occupancy override and the faults a badly made one leaves behind',
  'Check time control on site: clock, programmes, holidays, optimiser behaviour and trended start times',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A BMS time programme for an office AHU changes to "occupied" at 07:30. What is it most likely doing at that moment?',
    options: [
      'Closing a relay that wires straight to the fan motor contactor',
      'Sending a mains signal to the fan isolator in the plant room',
      'Writing an occupied state that the AHU strategy then acts on',
      'Resetting the fan run hours so the duty fan rotates',
    ],
    correctIndex: 2,
    explanation:
      'A schedule normally writes a value, such as occupied or unoccupied, into the control strategy. The strategy then decides what the fans, valves and dampers do, with its interlocks still in charge. Wiring the schedule straight to a contactor would bypass that logic, which is exactly what a well-built system avoids.',
  },
  {
    id: 2,
    question:
      'A school heating plant ran all through half-term. The weekly programme is correct. Where do you look first?',
    options: [
      'The exception schedule or calendar for the break',
      'The boiler flow temperature sensor and its wiring',
      'The weather compensation curve in the heating strategy',
      'The fire alarm interface relay in the plant room',
    ],
    correctIndex: 0,
    explanation:
      'The weekly programme only knows days of the week. Closures such as half-term are carried by exception schedules or calendars, which take precedence on the dates they cover. If those dates were never entered, or were last year’s, the weekly pattern simply carries on. A sensor fault would not make the plant follow an occupied pattern.',
  },
  {
    id: 3,
    question: 'What does optimum start calculate?',
    options: [
      'The earliest time the boilers are permitted to fire each morning',
      'The fixed pre-heat period entered by the commissioning engineer',
      'The latest time the heating can be switched off before people leave',
      'The latest start that still hits target conditions at occupancy',
    ],
    correctIndex: 3,
    explanation:
      'Optimum start works backwards from the occupancy time and starts the plant as late as it can while still reaching the target conditions when people arrive. A fixed pre-heat period is exactly what it replaces. The latest switch-off before people leave describes optimum stop, which looks for the earliest off time, not the latest.',
  },
  {
    id: 4,
    question:
      'An optimiser brings the heating on at its maximum pre-heat limit every single morning, mild weather or cold. What is the most useful first check?',
    options: [
      'Raise the maximum pre-heat limit so it has more time',
      'Check the space and outside sensors it relies on',
      'Disable optimum start and fit a fixed early start',
      'Replace the controller, as the algorithm has failed',
    ],
    correctIndex: 1,
    explanation:
      'The optimiser can only be as good as the temperatures it is fed. A space sensor in a cold spot, or an outside sensor reading wrongly, will convince it the building is always far from target. Raising the limit or fitting a fixed start hides the fault and costs energy; replacing the controller is a guess.',
  },
  {
    id: 5,
    question: 'What does optimum stop do at the end of the day?',
    options: [
      'Holds the plant on until the last person has badged out',
      'Stops all plant the moment the occupied period ends',
      'Switches off early while conditions stay within limits',
      'Drops the space setpoint gradually through the afternoon',
    ],
    correctIndex: 2,
    explanation:
      'Optimum stop uses the stored heat (or coolth) in the building, switching off at the earliest time that still keeps conditions within the pre-set limits until the occupied period ends. It does not follow badge data, and it does not wait for the end of occupancy, which would waste the run-down time it is there to use.',
  },
  {
    id: 6,
    question:
      'When a meeting room presence detector clears, the controls wait a hold-off period before dropping to standby. Why?',
    options: [
      'So the lighting has time to switch off before the heating',
      'So a person sitting still is not left in a cooling room',
      'So the BMS can count how many people have left the room',
      'So the detector has time to recalibrate after each use',
    ],
    correctIndex: 1,
    explanation:
      'Presence detectors can miss somebody sitting still at a desk. The hold-off period stops the room dropping back to standby around a person who is still there. A detector cannot count people, and it does not recalibrate between uses.',
  },
  {
    id: 7,
    question:
      'Why is presence-based switching usually a poor fit for underfloor heating in a heavy screed?',
    options: [
      'Presence detectors respond too slowly for heating control',
      'The floor reacts too slowly to follow people',
      'The screed stops the detector seeing people near the floor',
      'Underfloor heating has no valve that a BMS can switch',
    ],
    correctIndex: 1,
    explanation:
      'A heavy floor takes hours to warm up and cool down, so people have left before it responds. Detectors respond in seconds, and underfloor zones have actuated valves the BMS can switch. The issue is the physics of the emitter, which is why time programmes and optimum start suit it better.',
  },
  {
    id: 8,
    question:
      'The cleaners press the "extend" button on a room controller at 18:00. In a well-made strategy, what happens?',
    options: [
      'The room stays in occupied mode until somebody presses it again',
      'It goes occupied for a set time, then drops back',
      'The whole building switches to occupied for the rest of the night',
      'The weekly programme is permanently amended to finish later',
    ],
    correctIndex: 1,
    explanation:
      'An occupancy override should be timed and reset itself. A latching override that waits for somebody to cancel it is how plant ends up running every night for months. It should also be scoped to the zone it serves, not the whole building, and it should never edit the weekly programme.',
  },
  {
    id: 9,
    question:
      'You are checking time control on a service visit. Which check should come before any of the others?',
    options: [
      'Walk-test every presence detector in the building',
      'Trend the optimiser start times for the last month',
      'Confirm the controller clocks show the right time',
      'Print the weekly programmes and get the client to sign them',
    ],
    correctIndex: 2,
    explanation:
      'Every schedule, exception and optimiser decision hangs off the clock. If the time or date is wrong, or a clock change was missed, everything downstream will look wrong for reasons that have nothing to do with the programmes. Check the clock first, then the schedules, then the optimiser.',
  },
  {
    id: 10,
    question:
      'A client asks you to "just put the AHU in Hand" so the meeting room is ventilated for an evening event. What is the better answer?',
    options: [
      'Add a one-off exception for that date and zone through the BMS',
      'Put the AHU in Hand at the panel and leave a note on the door',
      'Change the weekly programme to finish later every weekday',
      'Bridge the presence detector input so the room reads occupied',
    ],
    correctIndex: 0,
    explanation:
      'A one-off event is exactly what exception schedules are for: it runs on that date, then the normal programme returns without anybody having to remember. Hand at the panel bypasses the strategy and relies on a note. Changing the weekly programme wastes energy every other evening, and bridging an input leaves a fault for the next engineer.',
  },
];

const BMSModule3Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 3"
        title="Time and occupancy"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Time programmes, holidays, optimisers, presence and the override button decide when plant
          runs at all. The cheapest energy is the energy a building never uses, so these are the
          first controls to check on site.
        </p>

        <TLDR
          points={[
            'A time programme is the first and simplest control on any plant. It switches the strategy between modes such as occupied and unoccupied; the strategy then drives the plant.',
            'Holidays, closures and one-off events live in exception schedules and calendars, which take precedence over the weekly pattern on the days they cover.',
            'Optimum start brings plant on as late as it can while still reaching target conditions at occupancy. Optimum stop switches off as early as it can while conditions hold until the end.',
            'A presence detector tells the BMS somebody is there, not how many. It suits fast-acting plant, not heavy slow emitters.',
            'Overrides should be timed and reset themselves. A latching override is one of the commonest reasons plant runs all night.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Time programmes</ContentEyebrow>

        <ConceptBlock
          title="The time programme is the first control on every plant"
          plainEnglish="Before any loop controls a temperature, something has to decide whether the plant should be running at all. On a BMS that is the time programme."
          onSite="When a client says the heating is on when nobody is in, look at the time programme before you look at a single valve or sensor."
        >
          <p>
            Every control loop from Section 3.2 assumes the plant is running. The time programme
            sits above those loops and decides whether they are in play. It is the oldest function a
            BMS has and still one of the most valuable, because plant that is off uses nothing,
            however badly its loops are tuned.
          </p>
          <p>
            A programme switches plant according to a set of on and off times, and most allow
            several operating periods in each 24 hours. A canteen extract might run for breakfast
            and again for lunch, with an off period in between. A boiler plant might have one long
            heating period on weekdays, a shorter one on Saturday and nothing on Sunday.
          </p>
          <p>
            The usual structure is a <strong>weekly schedule</strong>: seven slots, one for each
            day, each holding a list of times and the value to apply at each time. Monday at 06:30
            becomes occupied, Monday at 18:00 becomes unoccupied, and so on through the week. In
            BACnet, the Schedule object is built exactly this way, with a weekly schedule of seven
            day slots, each holding pairs of time and value.
          </p>
          <p>
            Time programmes can also be made conditional. A frost routine, for example, may run
            plant during an unoccupied period if outside conditions fall below a limit. That is the
            subject of Section 3.5; for now, notice that a schedule is not always the last word on
            whether plant runs.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="A schedule writes a mode, not a relay"
          plainEnglish="The schedule tells the strategy 'the building is in use now'. The strategy decides what that means for each fan, pump and valve."
          onSite="If you find a schedule output wired straight to a motor starter, ask why. It usually means somebody bypassed the strategy, and with it the interlocks."
        >
          <p>
            On a properly built system, the schedule does not switch a contactor. It writes a value
            into the control strategy, typically an occupied or unoccupied state, sometimes a
            setpoint, sometimes an enable. In BACnet terms, the Schedule object holds a list of
            references to properties in other objects and writes to them when its value changes.
            Some devices can only write to objects inside themselves; others can write across the
            network to other controllers.
          </p>
          <p>
            That matters to you for two reasons. First, the strategy keeps control of the sequence:
            in cold weather the AHU first gets heat to the coil (heating valve open, coil pump
            running), then opens its dampers and proves them open, then starts the extract and
            supply fans and proves airflow, whatever time it is. Fans never start against closed
            dampers, and outside air is never drawn across a cold coil. Second, when a plant item
            will not start on time, the fault may be in the schedule, in the link between schedule
            and strategy, or in the strategy itself. Knowing that the schedule writes a value tells
            you where to look: is the value changing at the right time, and is anything reading it?
          </p>
          <p>
            Most strategies have more than two modes. A common set is occupied, unoccupied and a
            pre-occupancy or optimiser mode that runs before people arrive. Some add a reduced or
            standby mode for lightly used periods. The description of operation for the job is the
            place to find which modes exist and what each one does to each item of plant.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-3-schedule"
          question="An AHU follows its schedule to occupied at 07:00, but the supply fan does not start until 07:04. The schedule is correct. What is the most likely explanation?"
          options={[
            'The schedule is running four minutes slow and needs adjusting',
            'The strategy is running its start-up sequence first',
            'The supply fan contactor is sticking and needs replacing',
            'The head end has lost communication with the controller',
          ]}
          correctIndex={1}
          explanation="The schedule writes occupied; the strategy then starts the plant in its own sequence, which may include getting heat to the coil, opening and proving dampers and proving the extract fan before the supply fan is allowed to run. A short, consistent delay after the mode change is usually the sequence doing its job. Check the description of operation before chasing a fault."
        />

        <SectionRule />
        <ContentEyebrow>Holidays and exceptions</ContentEyebrow>

        <ConceptBlock
          title="Exception schedules and calendars carry everything the week cannot"
          plainEnglish="The weekly pattern only knows Monday to Sunday. Bank holidays, half-terms, closures and one-off evening events have to be told to the BMS separately."
          onSite="Ask the client who owns the holiday list, and when they last updated it. If the answer is nobody, you have probably found your out-of-hours running."
        >
          <p>
            A good time programme can handle variations beyond the ordinary week: day and night,
            weekends, holidays, seasonal changes, clock changes and manual extensions for people
            working late. The weekly pattern covers the first two. The rest need something else.
          </p>
          <p>
            That something is the <strong>exception schedule</strong> (the name varies by
            manufacturer: holiday programme, special days, event schedule). It holds entries for
            particular dates or date ranges and, on those dates, it takes precedence over the weekly
            pattern. Bank holidays get an unoccupied entry. The Christmas closure gets a date range.
            An open evening gets an occupied period on one date.
          </p>
          <p>
            Many systems also use <strong>calendars</strong>: a list of dates that are either active
            or not, which several schedules can refer to. Build one calendar called &ldquo;School
            closed&rdquo;, point the heating, ventilation and hot water schedules at it, and the
            term dates only have to be entered once. BACnet has a Calendar object for exactly this,
            and its date lists can hold single dates, date ranges and repeating patterns such as the
            second Tuesday of every month, so a recurring event does not have to be re-entered each
            year.
          </p>
          <p>
            Where two exceptions land on the same day and time, the system needs a rule for which
            wins. In BACnet each special event carries a priority for this purpose. Other systems
            have their own rule, and you should know what it is on the system in front of you before
            you add an entry.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Clock changes and keeping time"
          plainEnglish="If the controller thinks it is an hour earlier than it is, every schedule is an hour wrong, and none of them looks wrong on screen."
          onSite="On a service visit, read the time and date on the head end and on each outstation you open. It takes seconds and rules out a whole class of fault."
        >
          <p>
            Every schedule, every exception and every optimiser hangs off the controller clock. The
            programmes need to cope with the change to and from British Summer Time, and the clocks
            need to agree with each other. A controller that has drifted, lost its time after a
            power cut, or was set up with the wrong clock-change rule will run perfectly correct
            programmes at the wrong time.
          </p>
          <p>
            Networked systems usually keep time centrally: the head end or a time server sends the
            time out and the controllers follow it. BACnet includes services for time
            synchronisation, including one in UTC, for this job. Standalone controllers, and older
            outstations on their own, may keep their own time and need checking individually.
          </p>
          <p>
            Checking the accuracy of the time clock is the first software check on any time-related
            complaint. It is quick, and if you skip it you can spend an hour reading programmes that
            are entirely correct.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-3-exceptions"
          question="A college wants its heating off for every half-term, Easter and summer break. Which approach needs the least re-entry and is least likely to be missed?"
          options={[
            'Edit the weekly programme to unoccupied at the start of each break',
            'Ask the caretaker to switch the plant to Off at the panel on the last day of term',
            'Disable the heating schedule at the head end at the end of each term',
            'One closure calendar holding the term dates, referenced by each schedule',
          ]}
          correctIndex={3}
          explanation="A shared closure calendar puts the dates in one place, applies them to every schedule that refers to it, and lets the weekly programme take over again automatically when the dates end. Editing the weekly programme or disabling schedules relies on somebody remembering to put it back, and Off at the panel bypasses the frost routine."
        />

        <Scenario
          title="Half-term, and the heating that never knew"
          situation="A primary school rings in the week after half-term. The energy bill shows heating ran every weekday during the break. The site manager is sure the BMS has a holiday programme, because the contractor set it up when the system was installed a few years ago."
          whatToDo="Start with the clock: confirm the outstation and head end show the right date and time. Then open the exception schedule or calendar that the heating schedule refers to. The likely finding is a list of term dates from the year of installation, with nothing since. Trend the boiler enable or the heating mode over the half-term week to prove what happened, rather than relying on the bill. Agree with the school who will supply next year’s term dates and who will enter them, enter the dates you have now, and check the heating, ventilation and hot water schedules all point at the same calendar."
          whyItMatters="Exception schedules are the part of time control most likely to go stale, because the weekly programme keeps working and nothing alarms. Nobody notices until the bill arrives. A calendar with an owner and a date in their diary is worth more than any optimiser."
        />

        <SectionRule />
        <ContentEyebrow>Occupied, unoccupied and setback</ContentEyebrow>

        <ConceptBlock
          title="Unoccupied does not always mean off"
          plainEnglish="Outside working hours the heating may still run, just to a lower target. That is night setback, and it is different from switching off."
          onSite="When you find heating running at night, check whether it is holding a setback temperature or running to the daytime setpoint. One is a strategy; the other is a fault."
        >
          <p>
            When the schedule drops a zone to unoccupied, the strategy usually does one of two
            things with the heating. It may switch it off and leave a frost routine to protect the
            building and plant. Or it may hold a lower setpoint overnight, called{' '}
            <strong>night setback</strong>, so the building does not cool so far that it cannot
            recover by morning. Heavy buildings and those with long, cold mornings often use
            setback; lighter buildings often do not need it.
          </p>
          <p>
            Building regulations expect this kind of control on larger heating plant. In England,
            the 2021 edition of Approved Document L Volume 2, in force now, says that boiler systems
            over 100 kW should have optimum start/stop control with either night setback or frost
            protection outside occupied periods (para 6.7). From 24 March 2027 the 2026 edition
            keeps this as para 5.11, for new boiler plant in existing buildings. The Scottish
            non-domestic compliance guide recommends optimum start/stop with night set-back or frost
            protection as part of its minimum controls package for new boiler plant from 100 kW to
            500 kW, and includes it for larger plant too.
          </p>
          <p>
            Cooling and ventilation have their own unoccupied behaviour. Ventilation is often off,
            or on a reduced rate, outside occupied hours. Some strategies run a night purge in
            summer, bringing in cool outside air overnight to take heat out of the structure before
            the next day. All of these are triggered by the same schedule changing mode; what
            differs is what the strategy does with that mode.
          </p>
          <p>
            Hot water is the exception to &ldquo;off when empty&rdquo;. Calorifier temperatures,
            circulation pumps and any pasteurisation routine are set by the site&rsquo;s Legionella
            risk assessment and water safety plan, which follow the HSE Approved Code of Practice L8
            and HSG274. Never put domestic hot water plant on a setback or a shorter time programme
            to save energy without the person responsible for water safety agreeing it in writing.
          </p>
        </ConceptBlock>

        <Pullquote>
          The weekly programme keeps working whether or not anybody looks after it. The holiday list
          does not. Most out-of-hours waste is a calendar nobody owns.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Optimum start and stop</ContentEyebrow>

        <ConceptBlock
          title="Optimum start: as late as possible, but warm on time"
          plainEnglish="Instead of starting the heating at the same early time every day, the controller works out how late it can leave it and still have the building comfortable when people arrive."
          onSite="Trend the optimiser start time alongside outside temperature for a fortnight. Starts should move earlier on cold mornings and later on mild ones. If they never move, something is wrong."
        >
          <p>
            A fixed early start is the simple answer to a cold building: start the boilers at 05:00
            every day and the offices will be warm by 08:00. On a cold Monday in January that might
            be about right. On a mild day in April it wastes hours of heating that the building did
            not need.
          </p>
          <p>
            <strong>Optimum start</strong> is a control routine that starts the plant at the latest
            time it can while still achieving the specified conditions at the start of the occupied
            period. It looks at how far the space is from its target, and usually at the outside
            temperature, and works out the pre-heat (or pre-cool) time needed. A device or routine
            that does this is often called an <strong>optimiser</strong>.
          </p>
          <p>
            Most optimisers learn. Each morning the routine compares when the space actually reached
            its target with when it should have, and adjusts its own calculation to reduce the error
            next time. A newly commissioned optimiser, or one whose learning has been reset, will
            take a while to settle. That is normal, and worth explaining to the client before they
            ring about it.
          </p>
          <p>
            During the pre-heat period the optimiser normally overrides the weather compensation, so
            the plant can run hard to recover the building. Once occupancy starts, or after a set
            time, control is handed back to the normal compensated routine. Optimum start can be
            applied to the building as a whole or to individual zones, which matters on a site where
            a sunny south side and a shaded north side warm at very different rates.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Optimum stop: use the heat already in the building"
          plainEnglish="The building stays warm for a while after the heating goes off. Optimum stop switches off early enough to use that, without letting the last hour go cold."
          onSite="If occupants complain that the last hour of the day is cold, look at the optimum stop target and its time limit before touching the heating setpoint."
        >
          <p>
            <strong>Optimum stop</strong> is the other end of the day. It switches the plant off at
            the earliest time it can while making sure conditions in the space will not drift beyond
            pre-set limits before the occupied period ends. The building&rsquo;s own stored heat
            carries it through the last part of the day.
          </p>
          <p>
            How much this achieves depends on the building. A heavy building with plenty of mass can
            coast for a long time; a lightweight one cools quickly and will give optimum stop little
            to work with. The routine learns this in the same way optimum start does.
          </p>
          <p>
            Be clear about what optimum stop is applied to. It makes sense for heating and cooling,
            where the building stores energy. It does not suit every item of plant: ventilation that
            is there to supply fresh air to people still in the building is a different question,
            and the description of operation should say which plant follows the optimiser and which
            follows the occupied period.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The settings an operator can change, and why each one matters"
          plainEnglish="An optimiser has a handful of adjustable settings. Most optimiser complaints come down to one of them being set badly, or to a sensor feeding it bad information."
          onSite="Before you change any optimiser setting, write down what it was. If the change does not help, you need to be able to put it back."
        >
          <p>Typical adjustable settings on an optimum start and stop routine include:</p>
          <ul>
            <li>
              <strong>Target temperature for optimum start</strong>, the condition the space should
              reach by the start of occupancy.
            </li>
            <li>
              <strong>Maximum pre-heat or pre-cool period</strong>, the earliest the optimiser is
              allowed to start the plant, however cold it is. This stops a faulty reading or an
              extreme morning running the plant half the night.
            </li>
            <li>
              <strong>Target temperature for optimum stop</strong>, the lowest the space should
              reach before occupancy ends.
            </li>
            <li>
              <strong>Minimum space temperature out of hours</strong>, the setback or frost
              protection level held while unoccupied.
            </li>
            <li>
              <strong>Separate time and temperature limits</strong> for the start and stop routines,
              so each can be adjusted independently.
            </li>
            <li>
              <strong>Enable or disable self-learning</strong>, useful while commissioning or after
              a sensor change, so the routine does not learn from bad data.
            </li>
            <li>
              <strong>Handover time to weather compensation</strong> after occupancy starts.
            </li>
          </ul>
          <p>
            The optimiser is only as good as its inputs. A space sensor sited near a cold external
            door, or above a radiator, or an outside sensor in direct sun, will give it a picture of
            the building that is not true, and it will act faithfully on that picture. Sensor siting
            from Section 2.4 is not a separate subject; it is why optimisers behave or misbehave.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-3-optimum"
          question="An office complains that it is cold at 08:00 on Monday mornings only. Tuesday to Friday are fine. Which optimiser setting is the most likely culprit?"
          options={[
            'The optimum stop target temperature is set too low',
            'The weather compensation handover time is too long',
            'Self-learning has been disabled for the whole week',
            'The maximum pre-heat period is capping the start',
          ]}
          correctIndex={3}
          explanation="After a weekend off, the building is much colder than it is on a weekday morning, and needs a longer pre-heat. If the maximum pre-heat period caps the start too late, the optimiser cannot start early enough on Monday however hard it tries. The stop target affects the end of the day, not Monday morning, and disabled learning would affect every day, not one."
        />

        <CommonMistake
          title="Fixing a cold Monday by moving the occupancy time earlier"
          whatHappens="The client complains about cold Monday mornings. Somebody changes the weekly programme so the occupied period starts at 06:00 instead of 08:00. Monday improves, but now the optimiser aims for comfort two hours early every day, the ventilation and lighting follow the earlier time, and the building runs for an extra ten hours a week that nobody is in it for."
          doInstead="Leave the occupancy times matching when people actually arrive, and find out why the optimiser cannot recover from the weekend. Check the space and outside sensors it uses, trend Monday starts against the maximum pre-heat limit, and, if the limit is the cap, raise it for that zone. Fix the cause in the optimiser, not by lying to it about when the building is in use."
        />

        <SectionRule />
        <ContentEyebrow>Presence and occupancy</ContentEyebrow>

        <ConceptBlock
          title="A presence signal says someone is there, not how many"
          plainEnglish="A presence detector answers a yes-or-no question. If the controls need to know how busy a space is, they need a different input."
          onSite="Most detectors you wire into a BMS give a volt-free contact or a network value: occupied or not. Wire it, label it and prove it on a walk test like any other digital input."
        >
          <p>
            Time programmes control to when a building is <em>expected</em> to be used. Occupancy
            control responds to whether it actually is. A meeting room booked all day but used for
            an hour, or an office floor that is empty on Fridays, is heated and ventilated on a
            schedule regardless. Presence detection lets each space drop back when nobody is there.
          </p>
          <p>
            The usual input is an infrared or similar presence detector, often the same detector the
            lighting uses, shared with the BMS through a contact or over a network. It tells the
            controls whether the space is occupied. It does not tell them how many people are in it.
            Where ventilation needs to rise and fall with the number of people, the level of
            occupancy comes from something else, typically CO2 measurement or access control data.
            That is demand-based control, and it is the subject of Section 3.4.
          </p>
          <p>
            In a typical room strategy, presence moves the zone between a comfort setting and a
            standby setting. Standby is not off: the room holds a setpoint a little away from
            comfort so it can recover quickly when someone walks in. When the detector clears, the
            controls usually wait for a hold-off period before dropping back, so that somebody
            sitting still at a desk does not have the heating turned down around them.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Match occupancy control to how fast the plant responds"
          plainEnglish="Occupancy control only helps if the plant can react before the people have gone. Fast plant suits it. Slow plant does not."
          onSite="When a specification asks for presence control on every zone, check what the emitters are. If they are in a screed, raise it with the designer."
        >
          <p>
            A fan coil unit or a VAV box can change the conditions in a room within minutes. Tie it
            to a presence detector and the room responds while people are still there to notice.
            Underfloor heating in a heavy screed, or a wall heating system, can take hours to warm
            up or cool down. Switching it on presence achieves very little, because the people have
            left long before the floor reacts. Those systems are better served by good time
            programmes and optimum start.
          </p>
          <p>
            BS EN ISO 52120-1 reflects this. Its functions describe room control in levels, from no
            automatic control, through central and individual room control, to individual modulating
            control that communicates with the BACS and responds to occupancy. The occupancy level
            is not normally applied to slow-reacting emitters with a lot of thermal mass. More
            broadly, the standard&rsquo;s higher efficiency classes reward controls that follow
            actual use: ventilation on a fixed schedule sits in a lower class than ventilation
            driven by presence, which in turn sits below ventilation driven by measured demand.
          </p>
          <p>
            For you, the practical point is this: schedule, presence and demand are three rungs on
            the same ladder. Each step tracks real use more closely, and each needs more devices,
            more wiring and more careful commissioning to deliver it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-3-occupancy"
          question="A designer wants each meeting room's ventilation to rise as more people come in. The rooms already have ceiling presence detectors for the lighting. Is that enough?"
          options={[
            'Yes, the presence detector gives the number of people in the room',
            'Yes, provided the detectors are set to their maximum sensitivity',
            'No, it only gives occupied or not; scaling needs CO2 or similar',
            'No, presence detectors can only ever be used for lighting control',
          ]}
          correctIndex={2}
          explanation="A presence detector answers yes or no. It can bring the ventilation on when somebody is in the room, but it cannot scale the rate with the number of people. That needs a measure of occupancy level, such as CO2, which is covered in Section 3.4. There is no rule restricting detectors to lighting; sharing them with the BMS is common."
        />

        <SectionRule />
        <ContentEyebrow>Overrides</ContentEyebrow>

        <ConceptBlock
          title="The extend button: timed, local, and resets itself"
          plainEnglish="People will always work late. A good override lets them extend the occupied period for their own area, for a while, and then puts everything back without anyone having to remember."
          onSite="When you find plant running out of hours, look for a forgotten override before you look for a programme fault. Overrides left on are one of the commonest causes."
        >
          <p>
            Time programmes need a way to cope with the unplanned: the team working late on a bid,
            the cleaners who start after the offices close, the evening meeting nobody told the
            facilities manager about. That is the job of the <strong>occupancy override</strong>,
            often a button on a room sensor or controller, sometimes a switch on a panel, sometimes
            a command from the head end.
          </p>
          <p>A well-made override has three properties:</p>
          <ul>
            <li>
              <strong>It is timed.</strong> Pressing it puts the zone into occupied mode for a set
              period, and then the zone drops back on its own. A presence button that resets
              automatically after a set time is the classic arrangement.
            </li>
            <li>
              <strong>It is local.</strong> It brings on the zone that needs it and the central
              plant that zone depends on, not the whole building.
            </li>
            <li>
              <strong>It is visible.</strong> The head end shows which zones are in override and
              until when, so an operator can see at a glance why plant is running.
            </li>
          </ul>
          <p>
            A latching override, one that stays on until somebody cancels it, fails the first test
            and is how plant ends up running every night for months. If you are wiring a switch that
            the strategy reads as an override, check with the controls engineer whether it is
            expected to be momentary (a push button) or maintained (a latching switch). The
            difference changes how the strategy treats it, and a maintained contact on an input
            written for a push button will hold the zone on indefinitely.
          </p>
          <p>
            Overrides at the panel are a different matter. A Hand position on a starter, or a point
            forced at the head end, bypasses the schedule and often the strategy too. Those belong
            to commissioning and fault finding, and Section 3.5 deals with them and their risks in
            full.
          </p>
        </ConceptBlock>

        <Scenario
          title="The cleaners’ switch that ran the AHU all winter"
          situation="An office has a key switch by the reception desk labelled 'Out of hours'. The cleaners use it to bring the ground floor lighting and ventilation on in the evening. The facilities manager notices the ground floor AHU on the energy trend running every night until morning, and has asked you to replace the switch because it must be faulty."
          whatToDo="Prove the switch before replacing it. Trend or watch the digital input on the BMS as you operate the switch: it changes state correctly. Then look at what the strategy does with it. You find the strategy treats the input as a maintained override, holding the zone occupied for as long as the contact is closed, and the cleaners leave the key turned when they go. Talk to the controls engineer: the fix is either a momentary switch with a timed override in the strategy, or the strategy changed to start a timed period on each operation. Agree it, change it, then test the full sequence and confirm the zone drops back on its own."
          whyItMatters="The switch was never faulty. Replacing it would have changed nothing and the waste would have carried on. Overrides fail in the gap between the device and what the strategy expects of it, which is why the electrician and the controls engineer need to agree how each one behaves."
        />

        <SectionRule />
        <ContentEyebrow>Checking time control</ContentEyebrow>

        <ConceptBlock
          title="Commissioning and service checks that catch most problems"
          plainEnglish="Time control goes wrong quietly. Nothing alarms when a holiday is missing or an optimiser has stopped learning. You find it by checking on purpose."
          onSite="Ask for the client's real occupancy times in writing at commissioning. Programmes entered from a guess are the start of most complaints."
        >
          <p>
            At commissioning, every timed routine needs checking for sensible on and off times, not
            just for being present. The default times a controller ships with, or the times a
            strategy was tested with in the office, are rarely the times the building is actually
            used. Get the real occupancy times from the client and enter those.
          </p>
          <p>On a service visit, or when chasing a complaint about time control, work in order:</p>
          <ul>
            <li>
              <strong>The clock.</strong> Time and date correct on the head end and on the
              outstations, and the clock change rule right.
            </li>
            <li>
              <strong>The time schedules.</strong> Weekly programmes match how the building is
              really used now, not how it was used at handover.
            </li>
            <li>
              <strong>Exceptions and calendars.</strong> Dates present for the coming year, and
              every schedule that should refer to the closure calendar actually does.
            </li>
            <li>
              <strong>Overrides.</strong> No zones sitting in override with no end time, and no
              points forced at the head end that should have been released.
            </li>
            <li>
              <strong>Optimum start and stop.</strong> Trend the start times against outside
              temperature. They should move with the weather and stay inside the pre-heat limit.
              Check the space reaches target at occupancy, not an hour before or after.
            </li>
            <li>
              <strong>Start-up and plant protection.</strong> Many strategies apply minimum on and
              off times, or a maximum number of starts per hour, to protect plant from short
              cycling. If a schedule or override appears not to act straight away, one of these may
              be holding it.
            </li>
          </ul>
          <p>
            Trend logs are the evidence for all of this. A trend of plant enable, zone mode and
            space temperature over a week tells you more about time control than any amount of
            reading programmes, and it is the record you need when you report back to the client.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Answering a time complaint by changing the setpoint"
          whatHappens="A client says the offices are cold first thing. The setpoint is raised a couple of degrees. The building is still cold at 08:00, because the problem was when the plant started, not what it was aiming for, and now it is too warm by mid-morning and the cooling starts fighting the heating."
          doInstead="Separate 'when' from 'how much'. If the space reaches its setpoint later than occupancy starts, the problem is in time control: the clock, the schedule, the optimiser or its sensors. If it never reaches the setpoint at all, it is a capacity or loop problem from Section 3.2. A trend of space temperature against the occupancy time tells you which within a minute."
        />

        <FAQ
          items={[
            {
              question: 'Is optimum start the same as a fixed early start with a thermostat?',
              answer:
                'No. A fixed early start brings the plant on at the same time every day and lets the thermostat stop it once warm. Optimum start calculates a different start time each day from how cold the building is and how cold it is outside, and learns from how well it did yesterday. On mild days it starts much later, which is where it earns its keep.',
            },
            {
              question: 'Who should enter the holiday dates, me or the client?',
              answer:
                'Whoever has been agreed in writing, and it should be agreed at handover. The client knows the dates; the controls engineer knows the system. Often the controls engineer sets up a closure calendar and trains the client to keep it up to date. What matters is that somebody owns it, because a stale holiday list is one of the commonest causes of out-of-hours running.',
            },
            {
              question: 'Can I share the lighting presence detectors with the BMS?',
              answer:
                'Often, yes, and it is common practice. The detector may have a second volt-free contact, or the lighting control system may pass occupancy to the BMS over the network. Agree with the lighting and controls engineers which device owns the signal and what hold-off time each system applies, so lighting and HVAC do not drop back at different times for the same empty room.',
            },
            {
              question: 'Does Approved Document L require optimum start?',
              answer:
                'For boiler systems over 100 kW, the 2021 edition of Approved Document L Volume 2 in England, in force now, says they should have optimum start/stop control with either night setback or frost protection outside occupied periods (para 6.7). From 24 March 2027 the 2026 edition keeps this as para 5.11, for new boiler plant in existing buildings. Approved Document L is statutory guidance, not law in itself. Other parts of the document call for time control on many other systems, such as seven-day time control on local and centralised electrically heated hot water. The Scottish compliance guide has its own minimum controls packages for boilers. Always check the version that applies to the job.',
            },
            {
              question: 'Why does the heating start at a different time every day?',
              answer:
                'Because the optimiser is working. It calculates the start from how far the building is from its target and from the outside temperature, so cold mornings start earlier and mild ones later. If the start never changes, or always sits at the maximum pre-heat limit, that is the time to investigate.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'The time programme decides whether plant runs at all, which makes it the most valuable control on most buildings. Check it before chasing loops and sensors.',
            'A schedule writes a mode such as occupied or unoccupied into the strategy. The strategy, with its interlocks and start-up sequence, drives the plant.',
            'Holidays and one-off events belong in exception schedules and shared calendars, which override the weekly pattern on their dates. Somebody has to own the dates.',
            'Optimum start comes on as late as it can and still reaches target at occupancy; optimum stop goes off as early as it can and still holds conditions to the end. Both learn, and both are only as good as their sensors.',
            'Presence tells the BMS someone is there, not how many. It suits fast-acting plant such as fan coils, not heavy floors.',
            'Overrides should be timed, local and visible. A latching override is a common cause of plant running all night.',
            'Domestic hot water is not put on setback or shorter hours to save energy without the agreement of whoever is responsible for the Legionella water safety plan.',
            'On any time complaint: clock first, then schedules, exceptions, overrides and the optimiser, with trends as your evidence.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3-section-2"
          prevLabel="Control loops"
          nextHref="/study-centre/upskilling/bms-module-3-section-4"
          nextLabel="Demand-based control and load management"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section3;
