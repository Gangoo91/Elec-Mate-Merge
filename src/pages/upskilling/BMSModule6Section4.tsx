/**
 * BMS Module 6 · Section 4 — Energy monitoring and reporting
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches how meter data held by a
 * BMS becomes decisions: what Approved Document L (England, 2021 edition in force, paras
 * 6.72–6.73; 2026 edition paras 5.84–5.85 from 24 March 2027) expects a building automation and control system to do with energy data, where that data
 * comes from (the sub-meters of Section 4.5), reading a load profile, finding baseload and
 * out-of-hours waste, comparing like with like (degree days at concept level only), spotting
 * efficiency losses, and reporting to the client in a way that gets acted on. The old page
 * ("Event triggers and auto-reporting") had the BMS recalling lifts, releasing doors and
 * notifying the fire brigade, and quoted savings it could not support. Both are gone: fire
 * actions belong to the fire system (Section 6.5), and this page carries no savings figures.
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

const TITLE = 'Energy monitoring and reporting | BMS Module 6.4 | Elec-Mate';
const DESCRIPTION =
  'Turning BMS meter data into decisions: what Approved Document L expects, baseload and out-of-hours waste, comparing like with like, and reporting to the client.';

const outcomes = [
  'Explain what Approved Document L expects a building automation and control system to do with energy data',
  'Trace a meter reading from the sub-meter to the BMS and check that the scaling is right',
  'Read a daily load profile and pick out the baseload and the out-of-hours consumption',
  'Compare consumption fairly, allowing for weather, occupancy and the day of the week',
  'Recognise the patterns that point to a loss of efficiency in heating, ventilation or cooling plant',
  'Put together an energy report a client can act on, with each finding tied to an action and an owner',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Approved Document L (England, 2021 edition), which of these is a BACS installed to para 6.72 expected to do with energy use?',
    options: [
      'Send a monthly energy bill to each tenant in the building',
      'Switch off all plant whenever the building is unoccupied',
      'Monitor, log and analyse it continuously',
      'Store readings locally and print them for the log book',
    ],
    correctIndex: 2,
    explanation:
      'Para 6.72 (para 5.84 in the 2026 edition, from 24 March 2027) lists continuous monitoring, logging, analysis and the ability to adjust energy use, alongside benchmarking, detecting efficiency losses and telling the person responsible. Switching everything off when empty sounds efficient, but frost protection and essential systems may need to run, and the paragraph does not say that.',
  },
  {
    id: 2,
    question:
      'The BMS shows an electricity sub-meter reading lower than the meter display by a steady, whole-number factor. What is the most likely cause?',
    options: [
      'The units-per-pulse value in the BMS is wrong',
      'The meter is faulty and needs replacing urgently',
      'The BMS trend log interval has been set too long',
      'The meter is wired on a different phase to the outstation',
    ],
    correctIndex: 0,
    explanation:
      'A steady, whole-number ratio between the BMS and the meter display almost always means the units-per-pulse (or register scaling) was entered wrongly. A faulty meter would not usually be out by a neat factor, and a long logging interval changes the resolution of the trend, not the total.',
  },
  {
    id: 3,
    question: 'What does the baseload of a building tell you?',
    options: [
      'The highest demand the supply has to carry',
      'The energy used by the heating plant alone',
      'The average consumption across a whole year',
      'What the building draws when at rest',
    ],
    correctIndex: 3,
    explanation:
      'Baseload is the floor of the profile: what the building draws overnight and at weekends when nobody is working. The peak is the opposite end of the profile. Some baseload is genuine (servers, fridges, frost protection); the job is to find the part that is not.',
  },
  {
    id: 4,
    question:
      'Gas use in January is far higher than in October. Before calling it a problem, what should you do first?',
    options: [
      'Report the increase from the two raw totals',
      'Allow for the colder weather using degree days',
      'Assume the boilers need servicing and raise a job',
      'Ignore it, as winter gas use is always higher',
    ],
    correctIndex: 1,
    explanation:
      'Heating demand follows the weather, so a cold month will use more gas in a healthy building. Normalising against degree days lets you see whether use per unit of cold weather has changed. Ignoring it entirely is the tempting wrong answer: a real fault can hide inside a seasonal rise.',
  },
  {
    id: 5,
    question:
      'A trend shows heating valves and cooling valves in the same zone both open for long periods. What does that point to?',
    options: [
      'The zone is holding its setpoint correctly',
      'Heating and cooling are fighting each other',
      'The outside air sensor has failed open circuit',
      'The meters for the zone are wired in reverse',
    ],
    correctIndex: 1,
    explanation:
      'Heating and cooling at the same time in the same space is a classic efficiency loss: one system is undoing the other. It often comes from setpoints with no gap between them or a valve passing when shut. A held setpoint tells you nothing about how much energy it took to hold it.',
  },
  {
    id: 6,
    question:
      'When looking for wasted energy, why is half-hourly data from a sub-meter more useful than a monthly total?',
    options: [
      'It shows when energy is used, so night and weekend use stand out',
      'It is more accurate, because each half-hourly reading is calibrated',
      'It is required for billing, as suppliers no longer take monthly reads',
      'It removes the need to compare against weather or occupancy',
    ],
    correctIndex: 0,
    explanation:
      'Interval data shows the shape of the day and week, so plant running overnight, at weekends or through holidays shows up straight away, where a monthly total hides it. It is no more accurate per reading than the meter itself. Billing arrangements are not the reason, and you still need weather and occupancy to judge what the figures should be.',
  },
  {
    id: 7,
    question:
      'Night-time electricity use in an office has crept up over several months with no change in hours. Where do you look first?',
    options: [
      'Schedules, holiday calendars and overrides',
      'The calibration of the boiler flow sensor',
      'The outside air temperature sensor calibration',
      'The power factor of the incoming supply',
    ],
    correctIndex: 0,
    explanation:
      'A rising night load with unchanged occupancy usually means something is running when it should not: a schedule edited and never put back, a holiday calendar not loaded, or plant left in Hand. The outside sensor matters for heating, but it would not usually drive a steady creep in electrical baseload.',
  },
  {
    id: 8,
    question:
      'Which part of a monthly energy report tells the reader how far the figures can be trusted?',
    options: [
      'A data health note on meters offline, gaps and resets',
      'A summary of consumption for the period by end use',
      "A list of last month's actions and whether they held",
      'A comparison of this month against the same month last year',
    ],
    correctIndex: 0,
    explanation:
      'Meters offline, gaps in the data and register resets all make the numbers less reliable, so a good report says so. The summary, follow-up and comparison are all useful, but each relies on the data being sound.',
  },
  {
    id: 9,
    question:
      'Why should renewable generation be metered separately from the building consumption?',
    options: [
      'Because the generation must be billed to the network operator',
      'So that it can be switched off from the BMS at night',
      'Because generation meters must use M-Bus',
      'So its output is visible and does not hide changes in demand',
    ],
    correctIndex: 3,
    explanation:
      'Approved Document L asks for renewable outputs to be monitored separately. If generation simply nets off the incoming meter, a sunny week can mask rising consumption. Separate metering lets you see both sides of the balance.',
  },
  {
    id: 10,
    question:
      'You have installed and wired a new heat meter onto the BMS. What proves the data is usable?',
    options: [
      'The point shows a live value on the graphics page',
      'BMS and meter register agree, and it is recorded',
      'The comms light on the outstation is flashing steadily',
      'The meter maker has supplied a calibration certificate',
    ],
    correctIndex: 1,
    explanation:
      'A value on screen only proves something is arriving. Comparing the BMS figure with the meter register, over a period long enough to see it move, proves the scaling and units are right. Record it, because every report built on that meter depends on it.',
  },
];

const BMSModule6Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 4"
        title="Energy monitoring and reporting"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Meter data is only useful when it leads to a decision. This page covers how to turn the
          readings into decisions, and how to report them so someone acts.
        </p>

        <TLDR
          points={[
            'Approved Document L (England, 2021 edition, in force now) expects a building automation and control system to continuously monitor, log and analyse energy use, benchmark the building, detect efficiency losses and tell the person responsible.',
            'The data starts at the sub-meters from Section 4.5. If the scaling is wrong at the meter, every chart and report downstream is wrong too.',
            'The load profile tells the story. Baseload and out-of-hours consumption are where most avoidable waste shows up first.',
            'Compare like with like: allow for weather (degree days), occupancy and the day of the week before calling something a fault.',
            'A good report is short, specific and owned: each finding has a likely cause, an action and a name against it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What the regulations expect</ContentEyebrow>

        <ConceptBlock
          title="Approved Document L asks the BACS to do something with the data, not just hold it"
          plainEnglish="If the building is big enough to need a BACS, that system has to watch the energy, keep a record, make sense of it and tell someone when things are drifting."
          onSite="When you hear a client say the BMS 'does the energy', ask who reads it and what happened the last time it flagged something. That answer tells you whether the requirement is being met in practice."
        >
          <p>
            You met the threshold in Section 1.5: in England, a new building with a space heating or
            air-conditioning system whose effective rated output is greater than 180 kW should have
            a building automation and control system (BACS). In an existing building of that size, a
            BACS that is being installed or replaced should follow the same specification. This page
            is about what that specification asks the system to do with energy.
          </p>
          <p>
            Paragraph 6.72 of the 2021 edition, which is in force now, sets out four things (from 24
            March 2027 the 2026 edition takes effect, and the same list becomes para 5.84). The
            system should comply with BS EN ISO 16484. It should continuously monitor, log and
            analyse energy use, and allow it to be adjusted. It should benchmark how efficiently the
            building performs, pick up any fall in the efficiency of the heating, ventilation and
            cooling plant, and tell whoever runs the building or its facilities where things could
            be done better. And it should talk to the connected building services across different
            manufacturers.
          </p>
          <p>
            Notice the verbs. Collecting readings is only the first of them. The system is expected
            to analyse, detect and inform, which means somebody has to set it up to compare the
            readings against something and to send the result to a person who can act. A BMS full of
            meter points with no targets, no alarms and no reports does not meet the spirit of the
            paragraph, however many points it has.
          </p>
          <p>
            Paragraph 6.73 (5.85 in the 2026 edition) adds a sense check: the control capabilities
            should suit the building, how it is expected to be used and the services fitted. A small
            office does not need the analysis set-up of a hospital, but it does need enough to
            answer the question &ldquo;where is the energy going, and is that changing?&rdquo;
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L, Volume 2 (England), 2021 edition (in force now)"
          clause="Para 6.72(b) and (c), in summary: the BACS should keep watching, recording and analysing energy use and let it be adjusted; benchmark how efficient the building is; pick up falling efficiency in the HVAC plant; and tell the person who manages the building or facilities where improvement is possible."
          meaning="Energy data on a BMS has to lead somewhere. The system needs targets or benchmarks to compare against, a way of spotting drift, and a route to a named person. A note to the paragraph confirms that a BS EN 15232 Class A system satisfies it. From 24 March 2027 the 2026 edition takes effect: the same rules move to paras 5.76, 5.77, 5.84 and 5.85, and the note names BS EN ISO 52120-1 Class A instead, the standard that has already replaced EN 15232."
          cite="ADL Vol 2 (2021) paras 6.66, 6.67, 6.72, 6.73; from 24 March 2027, ADL Vol 2 (2026) paras 5.76, 5.77, 5.84, 5.85"
        />

        <InlineCheck
          id="bms-6-4-adl"
          question="Under Approved Document L (2021 edition) para 6.72, a new office's BACS logs every meter continuously, but its reports and alerts go to nobody. Which expectation is it failing?"
          options={[
            'Logging energy use continuously',
            'Recording every sub-meter reading',
            'Informing the person responsible',
            'Keeping the data at the head end',
          ]}
          correctIndex={2}
          explanation="Para 6.72 (5.84 in the 2026 edition, from 24 March 2027) expects the system to analyse energy use, detect falling efficiency and tell whoever runs the building where things could improve. Logging and recording are covered here. What is missing is the link to a person, and data that never leaves the head end cannot meet that."
        />

        <SectionRule />
        <ContentEyebrow>Where the data comes from</ContentEyebrow>

        <ConceptBlock
          title="Sub-meters first: the BMS is only as good as the meters behind it"
          plainEnglish="The BMS does not measure energy itself. It reads the meters you fitted in Section 4.5, and it trusts whatever number they give it."
          onSite="Before you build any report, walk the meter schedule. Every meter should have a location, a label, what it serves, how it talks to the BMS and the scaling used. Gaps in that list are gaps in the report."
        >
          <p>
            Section 4.5 covered why buildings are sub-metered and how the meters connect: pulse
            outputs into digital inputs, M-Bus and Modbus meters read over a network, and CTs
            feeding electricity meters. Approved Document L para 5.17 sets the aim (para 4.19 in the
            2026 edition, from 24 March 2027). In new buildings, or where fixed building services
            are provided or extended, each fuel should be sub-metered by use (heating, lighting,
            cooling and so on) well enough that at least 90% of its yearly consumption can be put
            down to a particular use. Each tenant&rsquo;s use should be measured. Renewable outputs
            should be monitored separately. And where the total useful floor area is above 1000 m²,
            meters should be read and their data collected automatically.
          </p>
          <p>
            That last point is usually where the BMS comes in. It is already on site, already
            networked and already logging, so it is the natural place to collect meter readings. But
            it only ever sees what the meter sends, translated by whatever scaling somebody typed
            in.
          </p>
          <ul>
            <li>
              <strong>Pulse meters</strong> send a pulse for a fixed quantity of energy or volume.
              The BMS counts pulses and multiplies by the units-per-pulse value. Enter that value
              wrongly and every reading is out by the same factor.
            </li>
            <li>
              <strong>Network meters</strong> (M-Bus, Modbus) send register values. The register has
              to be the right one (energy, not power), in the right units, with the right
              multiplier. A meter that reports power in one register and accumulated energy in
              another is easy to map the wrong way round.
            </li>
            <li>
              <strong>CT-connected meters</strong> depend on the CT ratio being set in the meter and
              the CTs fitted the right way round on the right phases. A CT on the wrong phase or
              reversed gives numbers that look plausible and are wrong.
            </li>
          </ul>
          <p>
            Accumulating meters also roll over or reset. A meter replaced on a Tuesday, or a
            register that wraps back to zero, appears in the data as a huge negative or positive
            step. Analysis software will treat that as real consumption unless somebody marks it.
          </p>
          <p>
            <strong>Your part as the electrician.</strong> Good energy data is built at
            installation, not at the head end.
          </p>
          <p>
            On a typical job the electrician fits the meters and CTs, runs the pulse or bus wiring
            back to the outstation, and is often there when the points are first brought up. Each of
            those steps decides whether the data is trustworthy.
          </p>
          <ul>
            <li>
              Fit CTs on the right phases, the right way round, with the ratio recorded and set in
              the meter.
            </li>
            <li>
              Label meters to match what they actually serve. A meter labelled &ldquo;lighting level
              2&rdquo; that also feeds a heater battery will mislead every report.
            </li>
            <li>
              Record the units-per-pulse value, or the register and multiplier for network meters,
              on the meter schedule.
            </li>
            <li>
              Check the BMS value against the meter register at commissioning, over a period long
              enough to see both move, and record both readings.
            </li>
            <li>
              Tell the controls engineer about any meter that is replaced, so the jump in the data
              can be marked and the scaling checked.
            </li>
          </ul>
          <p>
            The analysis, targets and reporting usually sit with the controls engineer or an energy
            manager. Your job is to make sure what they analyse is real.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Trusting a meter point because it shows a number"
          whatHappens="A heat meter is wired, the point appears on the graphics, and the job is signed off. Months later the client's energy report shows the heating using a fraction of what the gas bill says. The units-per-pulse value was left at the controller's default, and a year of data is unusable."
          doInstead="At commissioning, read the meter register, note the BMS value, let the meter run, then read both again. The change on each should match. Record the scaling, the readings and the date on the meter schedule so the next person can trust the point or find the error."
        />

        <SectionRule />
        <ContentEyebrow>Reading the profile</ContentEyebrow>

        <ConceptBlock
          title="Interval data turns a monthly total into a story"
          plainEnglish="A monthly bill tells you how much. A half-hourly profile tells you when, and when is where the clues are."
          onSite="Pull up a week of interval data for the main incomer and the biggest sub-meters. Put the working days side by side. Anything that does not match the building's hours is your first list of questions."
        >
          <p>
            Energy monitoring and targeting has long worked from meter readings taken at intervals
            anywhere from half-hourly to monthly. Monthly readings are fine for tracking a year;
            they are useless for finding a fan that runs all night. For that you need short
            intervals, which the BMS can log as trends in the same way it logs temperatures (Section
            6.2).
          </p>
          <p>
            Plot a working day of interval data for a typical office and the shape is predictable.
            Consumption is low overnight, rises as plant starts ahead of occupancy, sits at a
            working level through the day, then falls away in the evening as plant and lighting
            switch off. Weekends should look like an extended night.
          </p>
          <p>Three features are worth reading on every profile:</p>
          <ul>
            <li>
              <strong>The floor</strong> (baseload) &mdash; what the building draws when it is at
              rest.
            </li>
            <li>
              <strong>The shoulders</strong> &mdash; when consumption rises in the morning and when
              it falls in the evening, compared with the hours the building is actually used.
            </li>
            <li>
              <strong>The peak</strong> &mdash; the highest demand, and what was running when it
              happened.
            </li>
          </ul>
          <p>
            None of these needs special software. A BMS trend of a meter point, viewed with a
            sensible time axis, will show all three.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsPowerFactorBill}
          topic="Watch · what the meter data is really telling you"
          caption="Energy reports are built from meter readings, and not every reading is kilowatt-hours. Watch for why reactive power shows up on a commercial bill, and think about which sub-meter readings a BMS would need to explain it."
        />

        <SectionRule />
        <ContentEyebrow>Baseload</ContentEyebrow>

        <ConceptBlock
          title="Baseload: the part of the bill that runs while everyone sleeps"
          plainEnglish="Look at what the building uses in the small hours of a Sunday. Some of that has to be there. The rest is waste that runs every single night."
          onSite="Ask the facilities manager for a walk round after hours. Fans you can hear, warm radiators, lit corridors and humming plant rooms tell you more than any chart."
        >
          <p>
            Baseload is the lowest level the profile settles to when the building is empty. Some of
            it is genuine and expected: comms rooms and servers, fridges and freezers, security
            systems, emergency lighting charging, frost protection when it is cold enough to call
            for it, and the BMS itself. The question is never &ldquo;is there a baseload?&rdquo; but
            &ldquo;is everything in it supposed to be there?&rdquo;
          </p>
          <p>
            Because baseload runs through every night and every weekend, a small unnecessary load in
            it adds up over a year in a way that a short daytime peak does not. That makes the floor
            of the profile one of the first places to look.
          </p>
          <p>
            Sub-meters let you split the baseload. If the main incomer floor is high, check which
            sub-meters are not dropping overnight. A lighting sub-meter that stays up points to
            lighting; a mechanical services board that stays up points to fans or pumps. That
            narrows a building-wide question to one distribution board and its schedule.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-4-baseload"
          question="The main incomer floor overnight is high. The lighting sub-meter drops right down at night but the mechanical services sub-meter does not. What is the sensible next step?"
          options={[
            'Replace the main incomer meter as faulty',
            'Check the lighting schedules and occupancy sensors',
            'Check the fans and pumps on that board',
            'Report the overnight baseload as normal',
          ]}
          correctIndex={2}
          explanation="The sub-meters have done their job: lighting is behaving, and the load that stays on is on the mechanical services board. That points to fans, pumps or other plant on that board running out of hours, so their schedules, run status and any overrides are where to look."
        />

        <SectionRule />
        <ContentEyebrow>Out-of-hours waste</ContentEyebrow>

        <ConceptBlock
          title="Most out-of-hours waste comes from a short list of causes"
          plainEnglish="When plant runs at night, it is usually because someone told it to and nobody told it to stop."
          onSite="Before blaming a controller, check the head end for anything in Hand or overridden. An override left on from a commissioning visit or a fault call is the most common find."
        >
          <p>
            When the profile shows consumption outside the building&rsquo;s hours, the cause is
            usually one of these, and most of them are things you met in Module 3:
          </p>
          <ul>
            <li>
              <strong>Schedules that do not match the building.</strong> Time programmes set at
              handover and never changed when the hours did, or a schedule extended for one late
              event and never put back.
            </li>
            <li>
              <strong>Holiday calendars not loaded.</strong> Bank holidays and closure periods
              treated as normal working days.
            </li>
            <li>
              <strong>Overrides and Hand selections left on.</strong> Plant put in Hand at the
              starter panel or overridden at the head end during a fault visit, and left that way.
            </li>
            <li>
              <strong>Optimum start set too early.</strong> Plant starting well before it needs to,
              often because the learned start time was never checked.
            </li>
            <li>
              <strong>Plant fighting itself.</strong> Heating and cooling serving the same space at
              the same time, or a frost protection routine running pumps when it is not cold.
            </li>
            <li>
              <strong>Lighting held on.</strong> Presence detectors with long time-outs, cleaners
              switching everything on, or a lighting override from the BMS left active.
            </li>
          </ul>
          <p>
            The fix for most of these is a setting, not a part. That is why the analysis matters: it
            turns a vague &ldquo;the bills are high&rdquo; into a specific change at a specific
            point.
          </p>
        </ConceptBlock>

        <Scenario
          title="The school that never went to sleep"
          situation="A secondary school's facilities manager asks you to look at the electricity. The BMS has sub-meters on lighting, the kitchen and two mechanical services boards. Weekday nights look reasonable, but every weekend the profile stays almost at its weekday daytime level. Nothing has changed in the timetable."
          whatToDo="Compare a weekend against a weekday night, board by board. The lighting and kitchen meters drop at weekends; one mechanical board stays up. On the head end, the sports hall air handling unit is following a schedule set up for a lettings programme that ended last term, and its weekend periods were never removed. Agree the correct hours with the facilities manager, change the schedule, and watch the next weekend's profile to confirm the board drops."
          whyItMatters="The waste was invisible on the monthly bill and obvious on a weekend profile split by sub-meter. The fix took minutes. Confirming it on the next weekend's data closes the loop, and is the evidence the client needs that the change worked."
        />

        <SectionRule />
        <ContentEyebrow>Comparing like with like</ContentEyebrow>

        <ConceptBlock
          title="A number on its own means nothing; it needs something fair to compare against"
          plainEnglish="Energy use goes up in a cold month and in a busy month. Before calling a rise a fault, take out the things you would expect to change it."
          onSite="When someone says 'it used more than last year', the first question is 'was last year as cold, and as busy?'"
        >
          <p>
            Para 6.72 asks the system to benchmark the building and detect losses in efficiency.
            Both depend on comparing fairly. A raw comparison of this January against last July
            proves nothing, because the building had very different jobs to do.
          </p>
          <p>Three things account for most of the honest variation:</p>
          <ul>
            <li>
              <strong>Weather.</strong> Heating demand follows how cold it is outside, and cooling
              demand follows how warm. The usual way of allowing for this is degree days: a measure
              of how far, and for how long, the outside temperature sat below (for heating) or above
              (for cooling) a base temperature over a period. Comparing energy per degree day,
              rather than raw energy, takes much of the weather out of the comparison.
            </li>
            <li>
              <strong>Occupancy and use.</strong> A term week and a holiday week in a school, or a
              full and half-let office, will not use the same energy. Comparing against occupancy,
              opening hours or similar measures of activity makes the comparison fairer.
            </li>
            <li>
              <strong>Calendar.</strong> Compare a Monday with a Monday and a weekend with a
              weekend. A month with five weekends is not the same as one with four.
            </li>
          </ul>
          <p>
            Monitoring and targeting software, or the analysis features of the BMS, can normalise
            consumption in this way and compare it against targets. You do not need to do the
            arithmetic by hand, but you do need to know it is happening, because a comparison that
            ignores weather will raise false alarms in winter and hide faults in a mild spell.
          </p>
          <p>
            Fixed loads such as lighting and small power do not follow the weather, so weather
            normalisation belongs on the heating and cooling meters, not the whole building. That is
            another reason sub-metering by end use pays off.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Reporting a winter rise as a fault, or a mild-month dip as a saving"
          whatHappens="A monthly report compares raw gas use with the month before. In autumn it flags every rise as a problem, and the client stops reading the alerts. In spring it shows falling use and credits a recent controls change, when the weather did the work."
          doInstead="Normalise heating and cooling meters against degree days before comparing, compare matching periods, and say in the report how the comparison was made. Leave weather-independent loads such as lighting as straight comparisons against hours of use."
        />

        <Pullquote>
          The question is never &ldquo;did we use more?&rdquo; It is &ldquo;did we use more than the
          weather and the occupancy explain?&rdquo; Only the second one finds faults.
        </Pullquote>

        <InlineCheck
          id="bms-6-4-likeforlike"
          question="Which meter is it most sensible to normalise against heating degree days?"
          options={[
            'The gas meter serving the boilers',
            'The lighting sub-meter for level 2',
            'The comms room small power sub-meter',
            'The kitchen small power sub-meter',
          ]}
          correctIndex={0}
          explanation="Heating degree days describe how cold it has been, so they explain changes in heating energy. Lighting, comms and kitchen loads are driven by hours and activity rather than outside temperature, so normalising them against degree days would distort the picture rather than clarify it."
        />

        <SectionRule />
        <ContentEyebrow>Spotting efficiency losses</ContentEyebrow>

        <ConceptBlock
          title="Drift is the signal: plant that slowly needs more energy to do the same job"
          plainEnglish="A building rarely fails all at once. It gets a little worse each month. Fair comparisons over time are how you catch that before it shows up as a complaint."
          onSite="When an energy alarm comes in, open the trends for the plant behind that meter before going to site. The energy data says something changed; the plant trends usually say what."
        >
          <p>
            Para 6.72(c) asks the system to notice when the heating, ventilation and cooling plant
            is becoming less efficient. In practice that means watching normalised consumption over
            time and flagging when it moves away from what is expected. The approved
            document&rsquo;s own description of automatic monitoring and targeting includes alarms
            for out-of-range values: the energy equivalent of the alarms in Section 6.1.
          </p>
          <p>The patterns that most often point to a real loss:</p>
          <ul>
            <li>
              <strong>A baseload that creeps up</strong> month on month with no change in use.
            </li>
            <li>
              <strong>Heating energy per degree day rising</strong> &mdash; the plant needs more
              energy for the same weather, which can point to a passing valve, a fouled heat
              exchanger or controls hunting.
            </li>
            <li>
              <strong>Heating and cooling in the same period</strong> in the same zone, which shows
              up when both meters and both sets of valve positions are trended side by side.
            </li>
            <li>
              <strong>A sub-meter that stops changing</strong> &mdash; either the plant is off or,
              more often, the meter or its communications have failed. Flat data is a fault too.
            </li>
          </ul>
          <p>
            The energy data rarely names the faulty component. What it does is tell you which meter,
            which time of day and which period, so that the plant trends from Section 6.2 can do the
            rest.
          </p>
        </ConceptBlock>

        <Scenario
          title="Heating energy climbing in a mild autumn"
          situation="An office's monthly report shows gas use per heating degree day rising for the third month running. Occupancy and hours have not changed, and nobody has complained about comfort. The BMS has an alarm on the normalised figure, which has now triggered."
          whatToDo="Open the trends behind the gas meter. Boiler run hours are up overnight, and one air handling unit's heating coil return temperature stays warm with its valve commanded shut. Raise the passing valve with the mechanical contractor, and check that the overnight boiler running is a demand from that coil rather than a schedule change. After the repair, compare the normalised figure for the following weeks against the months before the rise."
          whyItMatters="The raw gas total would have looked normal for the time of year, because autumn always uses more than summer. Only the comparison per degree day showed the plant needed more energy for the same weather, and the trends turned that into a specific valve."
        />

        <InlineCheck
          id="bms-6-4-drift"
          question="An energy meter on an air handling unit has shown exactly the same reading for a fortnight, though the unit runs every weekday. What is the most likely explanation?"
          options={[
            'The unit has become far more efficient',
            'The meter or its comms link has failed',
            'The degree day data has not been updated',
            'The baseload has fallen to zero at night',
          ]}
          correctIndex={1}
          explanation="A unit that runs every weekday must consume energy, so a flat reading means the data has stopped, not the consumption. Treat flat data as a fault: check the meter, its wiring or bus connection, and the point on the outstation. Degree days would affect a normalised figure, not the raw meter reading."
        />

        <SectionRule />
        <ContentEyebrow>Reporting to the client</ContentEyebrow>

        <ConceptBlock
          title="A report is only useful if someone does something because of it"
          plainEnglish="Short, specific, and with a name next to every action. Nobody acts on forty pages of charts."
          onSite="Ask the client who will read the report and what they can change. A facilities manager can fix a schedule; a finance director wants to know whether last quarter's changes held."
        >
          <p>
            Para 6.72 ends with informing the person responsible about opportunities to improve.
            That is a reporting job, and it is where a lot of good monitoring is wasted. A report
            the client can act on usually has:
          </p>
          <ul>
            <li>
              <strong>A short summary</strong> &mdash; consumption for the period by end use,
              compared fairly with the previous period or the target.
            </li>
            <li>
              <strong>Exceptions, not everything</strong> &mdash; the meters and periods that moved,
              with the profile or trend that shows it.
            </li>
            <li>
              <strong>A likely cause and an action</strong> for each exception, with who will do it.
            </li>
            <li>
              <strong>Follow-up on last time&rsquo;s actions</strong> &mdash; did the schedule
              change hold, did the baseload come down?
            </li>
            <li>
              <strong>Data health</strong> &mdash; meters offline, gaps, resets, anything that makes
              the numbers less reliable.
            </li>
          </ul>
          <p>
            Keep claims honest. Report what the meters show, before and after a change, over
            comparable periods. Do not put a percentage saving or a pound figure on a change unless
            it has been measured that way, and say how it was measured.
          </p>
          <p>
            For a new building above 1000 m² of useful floor area, the log book has to carry a
            forecast of how much energy the building will really use, split by fuel, and para 5.17
            asks for metering that lets forecast use be compared with in-use energy. That gives the
            first years of reporting a ready-made comparison: is the building using what the design
            said it would?
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-4-report"
          question="Your monthly report finds a ventilation schedule running at weekends. What should the report say about it?"
          options={[
            'That the BMS cut energy use by a set percentage',
            'Nothing until the exact cost has been worked out',
            'Only that weekend consumption looked high this month',
            'The evidence, the cause, the action and the owner',
          ]}
          correctIndex={3}
          explanation="A useful finding names the evidence, the cause, the action and the owner, so it can be closed and checked next month. Inventing a percentage is exactly what a report must not do, and waiting for an exact cost delays a fix that is already clear."
        />

        <FAQ
          items={[
            {
              question: 'Do I need special energy software, or can the BMS do this?',
              answer:
                'Many BMS head ends can trend meters, compare against targets and raise alarms, and that covers much of para 6.72. Larger estates often add dedicated monitoring and targeting software that reads the BMS data. Either way, the principles on this page are the same: good meters, fair comparisons and reports someone acts on.',
            },
            {
              question: 'Is a BMS required in every building I work on?',
              answer:
                'No. In England, Approved Document L calls for a BACS in a new building where the heating or air-conditioning system has an effective rated output greater than 180 kW (para 6.66 of the 2021 edition; 5.76 from 24 March 2027). Smaller buildings still need sub-metering under para 5.17, and below the threshold para 6.68 says centralised controls to switch things off when not needed should be considered.',
            },
            {
              question: 'What are degree days, in plain terms?',
              answer:
                'A running measure of how cold (or warm) it has been. Each day adds an amount depending on how far the outside temperature sat below a base temperature for heating, or above it for cooling. Dividing heating energy by heating degree days lets you compare a cold month with a mild one fairly.',
            },
            {
              question: 'Who should get the energy reports?',
              answer:
                'Whoever can act on them, which para 6.72 frames as whoever is responsible for managing the building or its facilities. In practice that is usually the facilities manager, with a summary for whoever holds the budget. Agree the recipients and the format at handover so the reports do not go to a mailbox nobody reads.',
            },
            {
              question: 'The BMS energy figures do not match the utility bill. Which is right?',
              answer:
                'Start by assuming neither. Check the scaling of the main meter point against the fiscal meter, look for gaps, resets and meters offline in the period, and make sure the dates line up. Once the main meter matches, the sub-meters can be checked against it.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Approved Document L para 6.72 (2021 edition) expects a BACS to monitor, log, analyse, benchmark, detect efficiency losses and inform the responsible person. Data with no route to a person does not do that.',
            'The BMS trusts its meters. Wrong pulse values, wrong registers and reversed CTs give plausible numbers that are wrong. Prove each meter against its register at commissioning.',
            'Read the profile: baseload, shoulders and peak. Baseload runs every night and weekend, so waste there adds up.',
            'Most out-of-hours waste is a setting: schedules, holiday calendars, overrides left on, optimum start, plant fighting itself.',
            'Compare like with like. Normalise heating and cooling against degree days, allow for occupancy, and compare matching days.',
            'Report exceptions with a cause, an action and an owner, follow up last time’s actions, and never put a saving figure on a change that was not measured that way.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6-section-3"
          prevLabel="Graphics and dashboards"
          nextHref="/study-centre/upskilling/bms-module-6-section-5"
          nextLabel="Fire alarm and life safety interfaces"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section4;
