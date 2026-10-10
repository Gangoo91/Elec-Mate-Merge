/**
 * BMS Module 1 · Section 3 — Why buildings have one
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the four reasons a client
 * pays for a BMS — comfort, energy, maintenance and compliance — and how the performance of a
 * control system is now described, using the BS EN ISO 52120-1 classes A to D. The old page was
 * built on figures with no source behind them (energy, payback, productivity, maintenance and
 * equipment-life percentages, and a multi-store retail case study with a headline cash saving)
 * and taught EN 15232 as the current standard. Every one of those has gone. Energy is now
 * taught through where waste actually comes from, compliance through the Approved Document L
 * threshold and specification, and performance through the class system that replaced EN 15232.
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

const TITLE = 'Why buildings have one | BMS Module 1.3 | Elec-Mate';
const DESCRIPTION =
  'Why clients pay for a BMS: comfort, energy, maintenance and compliance, the Approved Document L 180 kW trigger, and the BS EN ISO 52120-1 classes A to D.';

const outcomes = [
  'Name the four reasons a building has a BMS and give a site example of each',
  'Explain where energy is wasted in a building without central control, without quoting invented savings figures',
  'Describe how run-hour logging, duty rotation and alarms change the way plant is maintained',
  'State when Approved Document L in England expects a building automation and control system, and what that system should do',
  'Describe the BS EN ISO 52120-1 classes A to D, and say which class is the reference',
  'Explain why your installation and commissioning work decides whether any of these benefits arrive',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A facilities manager asks why the new office needs a BMS when every room already has a thermostat. Which answer is closest to the real reason?',
    options: [
      'Thermostats are not allowed in commercial buildings any more',
      'It links zones and plant on one programme and logs it',
      'A BMS replaces the need for any maintenance contract',
      'A BMS guarantees a fixed percentage cut in the energy bill',
    ],
    correctIndex: 1,
    explanation:
      'Local thermostats each look after one space and keep no record. A BMS ties zones and central plant together on one programme and logs what it did, which is what lets someone manage comfort, energy and maintenance. It does not remove maintenance, and nobody can honestly guarantee a fixed saving before the building is known.',
  },
  {
    id: 2,
    question:
      'In a building where heating and cooling both serve the same open-plan floor, what does Approved Document L expect the controls to do?',
    options: [
      'Run both together so the space reaches setpoint faster',
      'Let the occupants choose which one runs at any time',
      'Run cooling only in summer and heating only in winter by date',
      'Prevent heating and cooling operating at the same time',
    ],
    correctIndex: 3,
    explanation:
      'Heating and cooling fighting each other is one of the classic wastes. The guidance expects the controls to stop both operating simultaneously in the same space. A calendar changeover is a crude way of trying to achieve that, but it is not what the guidance asks for, and it fails on a cold spring morning or a warm autumn afternoon.',
  },
  {
    id: 3,
    question:
      'Two duty and standby pumps share a circuit. Months after handover one has done nearly all the running and the other has barely turned. What should the BMS have been doing?',
    options: [
      'Rotating duty and totalling each pump’s run hours',
      'Running both pumps together permanently to share the load',
      'Alarming only when the duty pump has failed completely',
      'Nothing, because pump duty selection is a manual task',
    ],
    correctIndex: 0,
    explanation:
      'Automatic duty rotation spreads the wear, and run-hour totals tell the maintenance team which machine is due attention. A failure alarm still matters, but on its own it waits until something has already broken. Running both pumps together is not what a duty and standby set is designed for.',
  },
  {
    id: 4,
    question:
      'Under Approved Document L for England, when should a new building have a building automation and control system installed?',
    options: [
      'Whenever the building has more than one floor',
      'Whenever the lighting load is above a set figure',
      'When heating or cooling output is greater than 180 kW',
      'Only when the client asks for one in the specification',
    ],
    correctIndex: 2,
    explanation:
      'The trigger is the effective rated output of the space heating or air-conditioning system (including systems combined with ventilation) being greater than 180 kW. Floor count and lighting load are not the test. The client can always ask for a BMS on a smaller building, but above the threshold the guidance expects one.',
  },
  {
    id: 5,
    question:
      'Which BS EN ISO 52120-1 class is the reference that the others are compared against?',
    options: [
      'Class A, because it is the best',
      'Class C, the standard level',
      'Class D, because it is the starting point',
      'There is no reference class',
    ],
    correctIndex: 1,
    explanation:
      'Class C is the standard, reference level. Class A describes high energy performance automation, Class B advanced, and Class D non energy-efficient. It is tempting to think the scale starts at D, but the comparison point is the ordinary standard installation, which is C.',
  },
  {
    id: 6,
    question:
      'A client says their new system is "EN 15232 Class A". What is the most accurate thing to tell them?',
    options: [
      'EN 15232 is still the current standard, so nothing changes',
      'EN 15232 classes only apply to lighting control',
      'The class letters were scrapped and replaced by a points score',
      'It was replaced by BS EN ISO 52120-1 with classes A to D',
    ],
    correctIndex: 3,
    explanation:
      'The classification has carried on under BS EN ISO 52120-1, with the same idea of classes A to D. EN 15232 should not be presented as the current standard. The classes cover heating, cooling, ventilation, lighting, shading and more, not just lighting.',
  },
  {
    id: 7,
    question:
      'A tenant keeps turning a room setpoint up to 26 °C and leaving it. What does a well set-up BMS commonly do about local adjustments like this?',
    options: [
      'Reset local adjustments on a schedule, often overnight',
      'Lock every room sensor so that nobody can ever adjust it',
      'Remove the room sensor once the tenant has complained',
      'Raise a fire alarm until the setpoint is put back',
    ],
    correctIndex: 0,
    explanation:
      'A scheduled reset lets people adjust their space within reason during the day but stops one change becoming the permanent setting. Locking everything out usually leads to more complaints and portable heaters. A setpoint has nothing to do with the fire alarm system.',
  },
  {
    id: 8,
    question:
      'Approved Document L says a BACS installed under its specification should continuously monitor, log and analyse energy use. Why does that matter to the electrician installing it?',
    options: [
      'It means every circuit must be wired in screened cable',
      'It means the BMS must be powered from a dedicated generator',
      'The points you install are what the monitoring runs on',
      'It means the electrician must write the energy reports',
    ],
    correctIndex: 2,
    explanation:
      'Monitoring and analysis are only as good as the points feeding them. A meter that is not connected, a sensor in the wrong place or a mislabelled point leaves a hole in the data. The reports are the operator’s job, and the guidance says nothing about generators or screening every circuit.',
  },
  {
    id: 9,
    question:
      'A supplier tells your client their BMS will deliver a large, guaranteed cut in energy use. What is the soundest response?',
    options: [
      'Accept it, because percentages like this are fixed by the standard',
      'Ask what it is measured against and how it will be shown',
      'Promise the client an even larger figure to win the work',
      'Tell the client a BMS never saves any energy',
    ],
    correctIndex: 1,
    explanation:
      'Any saving depends on what the building was doing before, how it is used and whether the controls are left working. The useful questions are: compared with what, and how will we see it in the metered data. A BMS can cut waste significantly, so dismissing it outright is as wrong as accepting an unexplained number.',
  },
  {
    id: 10,
    question:
      'On a site visit you find the AHU running at 2 am on a Sunday with the BMS showing it in Hand. What does this tell you about why the building has a BMS?',
    options: [
      'Nothing, because Hand is the normal running state',
      'The BMS has failed and must be replaced',
      'The schedule must be wrong, so rewrite it straight away',
      'The benefits only arrive while plant is left in Auto',
    ],
    correctIndex: 3,
    explanation:
      'The benefits come from the system being in Auto and following its programme. A plant item left in Hand runs regardless of the time schedule. The schedule may be perfectly correct; the fix is to find out why it was put in Hand, deal with that reason, and return it to Auto with the client’s agreement.',
  },
];

const BMSModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 3"
        title="Why buildings have one"
        backTo="/study-centre/upskilling/bms-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The four reasons a client pays for a building management system, the rule that makes it
          expected on larger buildings, and the class system now used to describe how good the
          controls are.
        </p>

        <TLDR
          points={[
            'A building has a BMS for four reasons: comfort, energy, maintenance and compliance. One set of controls serves all four.',
            'Energy is wasted in predictable places: plant running when nobody is in, heating and cooling fighting, central plant on with no demand, and overrides left in place.',
            'Logging run hours, rotating duty plant and raising alarms turns maintenance from waiting for breakdowns into planned work.',
            'In England, Approved Document L expects a building automation and control system where heating or air-conditioning output is greater than 180 kW.',
            'BS EN ISO 52120-1, which replaced EN 15232, grades controls from Class A (high energy performance) to Class D (non energy-efficient), with Class C as the reference.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The four reasons</ContentEyebrow>

        <ConceptBlock
          title="Comfort, energy, maintenance and compliance"
          plainEnglish="People want the building to feel right, the owner wants the bills down, the maintenance team wants to know what is about to fail, and the regulations expect proper controls on bigger plant. A BMS is the one system that answers all four."
          onSite="Ask the client which of the four matters most to them. A hospital estates manager, a school business manager and an office landlord will give you different answers, and that changes what they will notice when you get it wrong."
        >
          <p>
            Every building with heating, cooling, ventilation and lighting needs controlling
            somehow. In a small building that can be a programmer on the boiler, a thermostat on the
            wall and a light switch by the door. As the building grows, the number of zones, plant
            items and people multiplies, and a scatter of standalone controls stops being
            manageable. Nobody can see what is running, nobody knows what was running last night,
            and every fault is found by someone complaining.
          </p>
          <p>
            A building management system pulls those controls onto one network with one programme
            and one record. That single change is what delivers the four benefits clients pay for:
          </p>
          <ul>
            <li>
              <strong>Comfort:</strong> each area held at the right temperature, with fresh air, at
              the times it is used.
            </li>
            <li>
              <strong>Energy:</strong> plant runs only when and where it is needed, and the energy
              use is measured so waste can be found.
            </li>
            <li>
              <strong>Maintenance:</strong> faults are reported as alarms, run hours are counted and
              duty plant is shared out, so work can be planned.
            </li>
            <li>
              <strong>Compliance:</strong> above a certain size of plant, the Building Regulations
              guidance expects a building automation and control system, and says what it should be
              able to do.
            </li>
          </ul>
          <p>
            These are not four separate products. The same temperature sensor that holds an office
            at setpoint also tells the energy report whether heat was wasted overnight, and tells
            the maintenance team when a valve has stuck. That overlap is why one well-installed
            point is worth so much, and why one badly installed point causes trouble in several
            places at once.
          </p>
        </ConceptBlock>

        <Pullquote>
          A BMS does not save energy or keep anyone comfortable by being installed. It does it by
          being left in control, fed with good information and looked at by somebody.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Comfort</ContentEyebrow>

        <ConceptBlock
          title="Comfort is about zones, times and fresh air"
          plainEnglish="Different parts of a building need different things at different times. A south-facing meeting room in July and a north-facing store in January cannot share one thermostat."
          onSite="Most comfort complaints you will be called to are not broken plant. They are a sensor in the wrong place, a zone that covers two very different spaces, or a setpoint someone changed and forgot."
        >
          <p>
            The starting point for comfort is splitting the building into control zones. Approved
            Document L (paragraphs 5.11 and 6.35 of the 2021 edition; 4.13 and 5.40 of the 2026
            edition) asks for separate zones wherever the sun, the way the space is used or the type
            of use is significantly different, and for each zone to have its own control of timing
            and of temperature. A BMS is the natural way to deliver that on a large building,
            because every zone can have its own programme and setpoint while sharing the same
            central plant.
          </p>
          <p>
            Temperature is only part of it. Rooms full of people need fresh air, and how the
            ventilation is decided is one of the clearest differences between a basic and a good
            control system:
          </p>
          <ul>
            <li>
              <strong>Schedule-driven:</strong> the fans run on a fixed time programme, whether the
              room is full or empty.
            </li>
            <li>
              <strong>Occupancy-driven:</strong> presence detection decides whether the space is in
              use, and ventilation follows.
            </li>
            <li>
              <strong>Demand-driven:</strong> CO<sub>2</sub> or air quality sensors measure what the
              room actually needs, and the ventilation rate follows that.
            </li>
          </ul>
          <p>
            Each step up gives better air when the room is busy and less wasted fan power when it is
            not. You will see these three approaches again when we look at how the classes in BS EN
            ISO 52120-1 are defined.
          </p>
          <p>
            Comfort also depends on people being allowed some say. Most systems let occupants nudge
            a setpoint from a room sensor, within limits set on the BMS. A good set-up then resets
            those local adjustments on a schedule, often overnight, so one person&rsquo;s change on
            a cold Tuesday does not quietly become the setting for the rest of the winter.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-3-zones"
          question="A single heating zone covers a glazed south-facing reception and an internal print room. Staff in one are always too hot while staff in the other are too cold. What is the underlying problem?"
          options={[
            'The boiler is too small to serve both spaces',
            'The time schedule suits one space but not the other',
            'Two very different spaces share one control zone',
            'The sensor is being adjusted by occupants too often',
          ]}
          correctIndex={2}
          explanation="Approved Document L asks for separate zones where solar exposure, pattern of use or type of use differ significantly. One sensor cannot satisfy both spaces, wherever it is fitted. A bigger boiler or a different schedule cannot make one room cooler and the other warmer at the same moment."
        />

        <CommonMistake
          title="Curing a comfort complaint by moving the setpoint"
          whatHappens="Staff in one office say it is always cold, so the setpoint for that zone is raised by a few degrees. The real cause is a sensor mounted on a cold external wall beside the door. The room now overheats on sunny afternoons, the radiators run harder than they need to, and the complaints change rather than stop."
          doInstead="Find out what the sensor is actually reading before touching the setpoint. Compare it with a calibrated thermometer at desk height, look at where it is fixed, and check the zone trend. If the sensor is badly sited, it is the sensor that needs to move."
        />

        <SectionRule />
        <ContentEyebrow>Energy</ContentEyebrow>

        <ConceptBlock
          title="Where buildings waste energy, and how controls stop it"
          plainEnglish="Most wasted energy in a building comes from plant running when it does not need to, or two systems working against each other. Controls fix that by switching plant on only for real demand."
          onSite="Walk the plant room at night or at a weekend. Anything running that has no reason to be is the energy case for a BMS in front of you."
        >
          <p>
            You will hear a lot of percentages quoted for BMS energy savings. Treat any figure with
            caution unless someone can tell you what it was measured against and how. The saving in
            a real building depends on how wasteful it was before, how it is used, and whether the
            controls are left alone to do their job. What you can say with confidence is where the
            waste comes from, because it is the same in almost every building:
          </p>
          <ul>
            <li>
              <strong>Plant running when nobody is in.</strong> Heating, cooling and ventilation on
              through nights, weekends and holidays because a timeclock was never set or has
              drifted.
            </li>
            <li>
              <strong>Heating and cooling fighting.</strong> A fan coil cooling a room while the
              perimeter radiators heat it. Approved Document L expects the controls to stop heating
              and cooling running at the same time in the same space.
            </li>
            <li>
              <strong>Central plant running without demand.</strong> Boilers, chillers and pumps
              should run only when the zones are calling for them, and the guidance sets the default
              condition as off.
            </li>
            <li>
              <strong>Flow temperatures higher than needed.</strong> Weather compensation lowers the
              heating flow temperature as it gets milder outside. Approved Document L asks for it on
              heating systems where appropriate and technically feasible.
            </li>
            <li>
              <strong>Overrides nobody remembers.</strong> A pump in Hand, a setpoint raised for a
              cold snap, a zone forced on for an event. Each one runs until someone notices.
            </li>
          </ul>
          <p>
            A BMS tackles every item on that list. It runs time programmes for every zone, links
            central plant to zone demand, interlocks heating against cooling, applies weather
            compensation, and shows overrides on the head end where they can be seen. Just as
            importantly, it measures. Without metered data, nobody can say whether energy use went
            down or up.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving plant in Hand after a fault"
          whatHappens="An AHU trips on a Friday afternoon. To get it going, someone switches it to Hand at the panel. It runs all weekend, and every weekend after, because the BMS can no longer switch it off on its time programme. Months later the client asks why the building is using energy at 3 am on a Sunday."
          doInstead="Treat Hand as a temporary state that someone owns. Record it, tell the client or the controls engineer, fix the fault that caused it, and put the plant back to Auto. If you leave site with anything in Hand, say so in writing."
        />

        <InlineCheck
          id="bms-1-3-waste"
          question="A school&rsquo;s boilers fire every morning at 6 am through the whole summer holiday. Which control feature has most obviously been missed?"
          options={[
            'Weather compensation on the flow temperature',
            'A holiday programme so the heating follows the term calendar',
            'Demand-based ventilation using CO2 sensors',
            'A scheduled overnight reset of room setpoints',
          ]}
          correctIndex={1}
          explanation="The plant is following a normal weekday schedule through a period when the building is empty. A holiday or exception programme is the fix. Weather compensation would only lower the flow temperature, and ventilation and setpoint resets do not stop the boilers firing for an empty school."
        />

        <SectionRule />
        <ContentEyebrow>Maintenance</ContentEyebrow>

        <ConceptBlock
          title="From waiting for breakdowns to planning the work"
          plainEnglish="Without a BMS, plant is maintained by the calendar or when it breaks. With one, the system counts the hours, shares the work between duty and standby, and raises an alarm when something stops behaving."
          onSite="When you wire a run signal, a fault signal or a status contact, you are building the maintenance team&rsquo;s view of that plant. A missing status point means a failure nobody hears about."
        >
          <p>
            Maintenance is the benefit clients notice least at handover and value most a few years
            later. A BMS gives the maintenance team four things they cannot easily get any other
            way:
          </p>
          <ul>
            <li>
              <strong>Run-hour totals.</strong> The outstation keeps a running total of how long
              each item of plant has run, and can raise an alarm when a pre-set figure is reached.
              That is the trigger for servicing by use rather than by date.
            </li>
            <li>
              <strong>Duty rotation.</strong> Where there are duty and standby pumps, fans or
              boilers, the BMS can swap which one leads, so the wear is shared and the standby is
              proven to work.
            </li>
            <li>
              <strong>Alarms.</strong> A fan that was commanded on but has not proved airflow, a
              pump that has tripped, a temperature drifting out of range. Alarms can be sent to the
              head end and to engineers&rsquo; phones, so problems are found before occupants
              complain.
            </li>
            <li>
              <strong>History.</strong> Trend logs show what a piece of plant was doing before it
              failed. That turns a guess into a diagnosis.
            </li>
          </ul>
          <p>
            Many systems can also pass run-time and fault data into the client&rsquo;s maintenance
            or facilities management software, so jobs are raised from real plant condition.
            Sections 6.1 and 6.2 cover alarms and trend logging properly. For now, the point is that
            every one of these features depends on status and fault signals being wired, labelled
            and tested.
          </p>
        </ConceptBlock>

        <Scenario
          title="A standby pump that had never run"
          situation="A heating circuit in an office block has twin pumps on duty and standby. The duty pump fails one winter morning. The BMS changes over to the standby, which turns briefly, seizes and trips. The building goes cold. When the controls engineer looks at the history, the standby pump has hardly run since handover."
          whatToDo="Check whether duty rotation was ever enabled and whether the status and fault signals for both pumps were wired to the BMS and tested. Make sure each pump has a run status, a fault input and a run-hour total on the head end. Once repaired, confirm the changeover works in both directions and that a failed changeover raises an alarm."
          whyItMatters="Duty and standby is only real resilience if the standby gets used and its condition is known. A BMS can rotate duty and count hours automatically, but only if the points exist and have been proved. The electrician who wires and tests those signals is part of making that work."
        />

        <InlineCheck
          id="bms-1-3-run-hours"
          question="The BMS raises an alarm because a supply fan has reached a pre-set number of run hours. What is that alarm for?"
          options={[
            'Telling the operator the fan has failed and must be replaced',
            'Shutting the fan down until a new strategy is loaded',
            'Warning that the fan is drawing too much current',
            'Prompting servicing based on how much the fan has actually run',
          ]}
          correctIndex={3}
          explanation="Run-hour totalisation counts the cumulative running time of each plant item and flags when a set figure is reached, so servicing follows real use rather than the calendar. It is not a failure alarm and it does not stop the fan. Current draw would need a separate measurement."
        />

        <SectionRule />
        <ContentEyebrow>Visibility</ContentEyebrow>

        <ConceptBlock
          title="One place to see the whole building"
          plainEnglish="Without a BMS, finding out what a building is doing means walking round it. With one, the plant, the zones and the alarms are on one screen, and the important messages can reach an engineer wherever they are."
          onSite="The head end is only as truthful as the points behind it. If a graphic shows a pump running because the command is on, rather than because a status contact has proved it, the screen can tell a comfortable lie."
        >
          <p>
            Sitting underneath all four reasons is a simpler one: visibility. The head end that you
            met in Section 1.1 brings every outstation&rsquo;s points onto graphics that show what
            each plant item is doing, what each zone is reading and which alarms are standing.
            Remote access, set up securely, lets engineers and facilities managers check the
            building from elsewhere and receive plant failure notifications on a phone instead of
            waiting for a call from the building.
          </p>
          <p>
            Visibility is also what makes the other benefits last. Controls left alone tend to
            drift: schedules get extended for one event and never put back, setpoints creep, plant
            is left in Hand. On a building with no central view, none of that is seen. On a building
            with a working BMS, it shows up as overridden points, out-of-hours running in the energy
            logs, or alarms that keep repeating.
          </p>
          <p>
            Two cautions. First, a graphic is a picture of the data, not of the plant. Make sure the
            things that matter have genuine status feedback, not just a command echoed back. Second,
            remote access is a security risk if it is set up carelessly. Section 5.6 deals with
            network design and cyber security, and Section 6.6 with remote monitoring.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Compliance</ContentEyebrow>

        <ConceptBlock
          title="When the Building Regulations expect a BMS"
          plainEnglish="On bigger buildings it is not just a good idea. The guidance to the Building Regulations expects a building automation and control system once the heating or cooling plant passes a certain size."
          onSite="The threshold is about the heating or air-conditioning output, not the electrical load. Frost protection heating, domestic hot water and process heating or cooling are not counted towards it."
        >
          <p>
            In England, Approved Document L Volume 2 covers buildings other than dwellings. The 2021
            edition is in force now. The 2026 edition takes effect on 24 March 2027, or 24 September
            2027 for higher-risk building work. Both set the same trigger: if a new building has
            space heating or air-conditioning with an effective rated output greater than 180 kW, a
            building automation and control system should be installed. In an existing building over
            the same threshold, where a system is being installed or replaced, the new system should
            meet the specification paragraphs. The same applies where heating or air-conditioning is
            combined with ventilation.
          </p>
          <p>
            Effective rated output means the total output of the plant that heats or cools the space
            for the comfort of the occupants, based on what is finally installed. The guidance
            leaves out equipment for emergency or occasional backup, frost protection, domestic hot
            water and industrial processes.
          </p>
          <p>
            The thresholds differ across the UK. In Wales the figure is 290 kW now, falling to 180
            kW when the new Welsh Approved Document L takes effect on 4 March 2027. In Scotland the
            non-domestic guidance uses 290 kW. Section 1.5 goes through the standards and
            regulations in detail; this page is about why they exist.
          </p>
          <p>
            Below the threshold, the guidance does not drop the subject. For building services that
            fall outside those paragraphs, it asks for centralised controls to be considered so the
            facilities manager can switch off equipment that is not needed, with automatic control
            and a manual override where that makes sense, and with the power needs of essential
            systems such as life safety kept in mind. Plenty of smaller buildings end up with a
            modest BMS for exactly that reason.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Volume 2 (England)"
          clause="2021 edition paragraphs 6.66 and 6.72 (2026 edition 5.76 and 5.84): where a heating, air-conditioning or combined system has an effective rated output above 180 kW, the guidance expects a BACS to be fitted. That system should fully comply with BS EN ISO 16484; continuously monitor, log and analyse energy use and allow it to be adjusted; benchmark efficiency, detect losses of efficiency in heating, ventilation and air conditioning and tell the person responsible; and interoperate with building services from different manufacturers."
          meaning={
            <>
              <p>
                Read the list as a description of why buildings have a BMS. Monitoring, logging and
                analysing energy is the energy reason. Detecting efficiency losses and informing the
                facilities manager is the maintenance reason. Interoperability is about not locking
                the client into one manufacturer for the life of the building.
              </p>
              <p>
                The 2026 edition notes that a BS EN ISO 52120-1 Class A system meets these
                requirements. The 2021 edition, in force until 24 March 2027, says the same of a BS
                EN 15232 Class A system. Paragraph 6.73 (5.85 in the 2026 edition) adds that the
                control capabilities should suit the building, how it is expected to be used and its
                services.
              </p>
            </>
          }
          cite="ADL Vol 2 (2021) paras 6.66, 6.67, 6.72, 6.73; (2026, takes effect 24 March 2027) paras 5.76, 5.77, 5.84, 5.85"
        />

        <InlineCheck
          id="bms-1-3-threshold"
          question="A new warehouse has 170 kW of space heating for the staff areas and 40 kW of heaters that only keep the racking areas above freezing. Against the England threshold, how should the frost heaters be treated?"
          options={[
            'Added in, giving 210 kW, so a BACS is expected',
            'Left out, as frost heating is not for comfort',
            'Counted at half their rating, as they rarely run',
            'Counted only if on the same distribution board',
          ]}
          correctIndex={1}
          explanation="Effective rated output is the heating or cooling provided for the comfort of occupants. Approved Document L leaves out frost protection, backup-only, domestic hot water and process plant. That leaves 170 kW of comfort heating, which is under the 180 kW trigger, although the client may still choose a BMS. How the heaters are wired makes no difference."
        />

        <SectionRule />
        <ContentEyebrow>Describing performance</ContentEyebrow>

        <ConceptBlock
          title="BS EN ISO 52120-1 and the classes A to D"
          plainEnglish="Rather than arguing about percentages, the industry grades a control system by what it can do. Class A does the most, Class D the least, and Class C is the ordinary standard everything is compared with."
          onSite="If a specification asks for a class, it is asking for a list of functions. You will see it in sensor counts, CO2 detectors, metering and links between systems on the drawings."
        >
          <p>
            For years the classification of building automation for energy performance was set out
            in EN 15232. That standard has been replaced by <strong>BS EN ISO 52120-1</strong>,
            which keeps the idea of classes and applies it to functions across heating, cooling,
            ventilation, lighting and shading, among others. If you see EN 15232 on an older
            specification, it is out of date as a standard. You will still find it named in the 2021
            edition of Approved Document L, which is in force until 24 March 2027; the 2026 edition
            moves to BS EN ISO 52120-1.
          </p>
          <ul>
            <li>
              <strong>Class A:</strong> high energy performance building automation and technical
              building management. Room controls respond to things like occupancy and air quality,
              and different services are co-ordinated with each other.
            </li>
            <li>
              <strong>Class B:</strong> advanced automation with central, co-ordinated management of
              the plant. Room controls can talk to the building automation system.
            </li>
            <li>
              <strong>Class C:</strong> standard automation and control, the reference level.
            </li>
            <li>
              <strong>Class D:</strong> non energy-efficient automation and control.
            </li>
          </ul>
          <p>
            The useful thing about the classes is that each one is defined by functions, not by a
            promise. Ventilation is a good example. A Class C approach can run the fans to a fixed
            schedule; Class B adds occupancy detection; Class A controls ventilation by demand,
            using CO<sub>2</sub> or air quality sensors. Hydronic balancing follows the same
            pattern, from a manual setting at Class C to fully dynamic balancing at Class A.
          </p>
          <p>
            That makes the classes something you can check. If Class A was specified, there should
            be CO<sub>2</sub> sensors linked to the ventilation, trend logs recording energy and
            indoor conditions, and occupancy sensors controlling lighting. If those are missing at
            handover, the building did not get what was paid for. The 2026 edition of Approved
            Document L uses the same language: it notes that a BS EN ISO 52120-1 Class A system
            meets its BACS specification, and asks for comfort cooling controls to meet Class C. The
            2021 edition, in force until 24 March 2027, says the same things in EN 15232 terms.
          </p>
          <p>
            BS EN ISO 16484 is the companion series that deals with the building automation and
            control systems themselves, their products and how they are delivered. Both standards
            are paid-for documents. You do not need to own them to wire a BMS, but you should
            recognise the numbers when they appear on a specification.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Selling a BMS on a percentage"
          whatHappens="An installer quotes a client a headline saving from a brochure. The system goes in, the building is used differently from the brochure example, a few plant items end up in Hand, and the bills fall by less than promised. The client concludes the BMS does not work, and the installer&rsquo;s credibility goes with it."
          doInstead="Talk about what the system will do, not what it will save. Name the functions: zone time and temperature control, heating and cooling interlocked, plant off when there is no demand, metering and alarms. If the client wants a target, agree how it will be measured from metered data after handover, and point to the BS EN ISO 52120-1 class as the description of the controls."
        />

        <InlineCheck
          id="bms-1-3-class"
          question="A specification calls for BS EN ISO 52120-1 Class A. On the drawings, the meeting room ventilation runs on a fixed time schedule with no sensors. What should you raise?"
          options={[
            'Nothing, since a time schedule suits any class',
            'That Class A ventilation follows CO2 or air quality',
            'That presence detection alone is what Class A needs',
            'That the classes cover heating only, not ventilation',
          ]}
          correctIndex={1}
          explanation="A fixed schedule is the Class C approach to ventilation, and presence detection is the Class B approach. Class A controls ventilation by demand, using CO2 or air quality sensors, so the missing sensors are worth raising with the designer before installation. The classes cover ventilation as well as heating."
        />

        <SectionRule />
        <ContentEyebrow>Your part in it</ContentEyebrow>

        <ConceptBlock
          title="Benefits arrive through installation and commissioning, not the brochure"
          plainEnglish="Every reason a building has a BMS depends on the field wiring being right and the system being commissioned and left in Auto. That is where the electrician comes in."
          onSite="At handover, look at the head end with the controls engineer. Check that every plant item you wired shows a status, that alarms come through, and that nothing is sitting in Hand."
        >
          <p>
            None of the four reasons survives poor installation. A temperature sensor fixed above a
            radiator or in direct sun gives the zone the wrong information, and the comfort and
            energy benefits go with it. A meter that is installed but not connected leaves a gap in
            exactly the data Approved Document L asks the system to log and analyse. A fault contact
            wired to the wrong terminal means a failure that never reaches anybody&rsquo;s phone.
          </p>
          <p>
            The practical habits that protect those benefits are covered through the rest of the
            course:
          </p>
          <ul>
            <li>
              Sensors sited where they read the space, not the heat source next to them (Section
              2.4).
            </li>
            <li>
              Control wiring segregated and labelled so it can be traced and tested (Sections 1.6
              and 2.6).
            </li>
            <li>
              Status, fault and metering points wired and proved, not just power to the plant
              (Sections 4.5 and 6.4).
            </li>
            <li>
              Point-to-point testing and handover records that match what is actually installed
              (Sections 7.5 and 7.6).
            </li>
          </ul>
          <p>
            When new buildings have a BACS, Approved Document L also expects information about its
            energy performance to be passed to the building owner. That information is only accurate
            if the system was installed and commissioned the way the drawings say.
          </p>
        </ConceptBlock>

        <Scenario
          title="A BMS that the building had stopped using"
          situation="You are asked to price new lighting in a 1990s office. In the plant room the BMS panel is powered, but the boilers and AHU are switched to Hand at the panel, a timeclock has been added on the side to run the heating, and the head end PC was unplugged years ago. The client says the BMS never worked, so they gave up on it."
          whatToDo="Note what you see and report it to the client separately from the lighting quote. Do not switch anything back to Auto yourself without the client and a controls engineer agreeing, because the plant may have been put in Hand to get round a real fault. Suggest a survey by a controls specialist to find out why it was abandoned: failed sensors, a lost strategy, or a head end that nobody was trained on."
          whyItMatters="This building has paid for comfort, energy, maintenance and compliance benefits and is getting none of them. The plant now runs on a bolt-on timeclock with no zoning, no interlocks and no alarms. Spotting that, and saying so clearly, is often how electricians get involved in BMS work in the first place."
        />

        <FAQ
          items={[
            {
              question: 'How much energy does a BMS actually save?',
              answer:
                'It depends on the building. A wasteful building with plant running all hours can see a big fall; a building that was already well run will see less. Be wary of any percentage that comes without a baseline. The honest answer is that a BMS removes known kinds of waste and measures energy use, so the saving can be shown from metered data rather than claimed.',
            },
            {
              question: 'Is a BMS a legal requirement?',
              answer:
                'Not directly. The legal requirement is Part L of the Building Regulations. Approved Document L is the government’s guidance on meeting it. In England that guidance expects a building automation and control system where heating or air-conditioning output is greater than 180 kW (2021 edition para 6.66, and 2026 edition para 5.76 from 24 March 2027). Wales uses 290 kW until 4 March 2027 and 180 kW after that, and Scotland’s guidance uses 290 kW. A designer can show compliance another way if building control agree. Below those thresholds a BMS is the client’s choice. Standards such as BS EN ISO 52120-1 are voluntary unless a contract or the guidance calls them up.',
            },
            {
              question: 'Is EN 15232 still used?',
              answer:
                'As a standard it has been replaced by BS EN ISO 52120-1, which carries on the idea of classes A to D. You will still see EN 15232 on older specifications, and the 2021 edition of Approved Document L, in force until 24 March 2027, still names it. The 2026 edition moves to BS EN ISO 52120-1. Do not quote EN 15232 as the current standard.',
            },
            {
              question: 'Who decides which BS EN ISO 52120-1 class a building gets?',
              answer:
                'The client and their designer, normally in the specification. The class sets which control functions have to be provided. As the electrician you will not choose it, but it explains why the drawings show the sensors, meters and interfaces they do, and it gives you a way to query a design that looks short of what was asked for.',
            },
            {
              question: 'Does a BMS handle fire shutdown of the air handling plant?',
              answer:
                'In UK practice, fire actions such as plant shutdown and door release are driven by the fire detection and alarm system and its own interfaces. The BMS typically monitors the fire alarm status and may carry out non-life-safety follow-up actions. Section 6.5 covers this interface.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Buildings have a BMS for comfort, energy, maintenance and compliance, and one well-installed point usually serves several of them.',
            'Energy waste comes from plant running unoccupied, heating and cooling fighting, central plant on without demand, high flow temperatures and forgotten overrides.',
            'Run-hour totals, duty rotation, alarms and trend logs let maintenance be planned instead of reactive.',
            'Approved Document L (England) expects a BACS where heating or air-conditioning output is greater than 180 kW, and says it should monitor, log and analyse energy use and detect efficiency losses.',
            'BS EN ISO 52120-1 replaced EN 15232 and grades controls by function: Class A high energy performance, B advanced, C the reference, D non energy-efficient.',
            'Never sell or teach a BMS on an unsourced percentage. Describe the functions and agree how results will be measured.',
            'None of the benefits arrive unless the field wiring is right, the system is commissioned, and plant is left in Auto.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-1-section-2"
          prevLabel="What a BMS controls and connects to"
          nextHref="/study-centre/upskilling/bms-module-1-section-4"
          nextLabel="Where you will meet a BMS"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule1Section3;
