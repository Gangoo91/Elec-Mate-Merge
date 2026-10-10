/**
 * BMS Module 7 · Section 5 — Commissioning
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches commissioning as a sequence
 * with gates: the electrical installation finished, inspected and tested to BS 7671; plant and
 * hardwired safeties ready; pre-commissioning checks of panels, field devices, outstations and
 * wiring; point-to-point testing of every input and output from the field device to the head
 * end; functional testing of the sequences; witnessing and acceptance; seasonal commissioning of
 * whatever the weather would not let you prove; and recording the results so they reach the
 * owner and building control. The old page ("Pre-functional and functional commissioning")
 * quoted supply voltage tolerances as a BS 7671 figure, a sensor accuracy figure, a time to
 * setpoint and typical commissioning durations, none of them sourced; all of that is gone, and
 * its fire alarm test that had the BMS closing dampers has been replaced by the fire alarm system
 * acting with the BMS monitoring.
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

const TITLE = 'Commissioning | BMS Module 7.5 | Elec-Mate';
const DESCRIPTION =
  'BMS commissioning in order: BS 7671 testing, pre-commissioning checks, point-to-point testing, functional tests, witnessing, seasonal work and the records.';

const outcomes = [
  'Put the stages of BMS commissioning in the right order and say what has to be true before each one starts',
  'Carry out pre-commissioning checks on control panels, field devices, outstations and wiring, and record them',
  'Prove every input and output point to point, from the device in the plant room to the reading on the head end',
  'Describe what functional testing proves that point-to-point testing cannot, including interlocks, alarms and power failure',
  'Explain what witnessing and acceptance need: criteria met, evidence supplied and a signed record',
  'Plan for seasonal commissioning and make sure the results end up in the commissioning records the owner keeps',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The BMS engineer wants to start commissioning an AHU next week. Which of these must already be in place?',
    options: [
      'The graphics pages on the head end are finished and approved by the client',
      'The seasonal checks for the cooling coil have been booked for the summer',
      'The power and control wiring is tested, and the plant is ready to run',
      'The owner has received the notice of completion of commissioning',
    ],
    correctIndex: 2,
    explanation:
      'BMS commissioning should only start once the plant it controls has been tested and is ready, and that includes the electrical installation feeding the panels and the control wiring being inspected and tested to BS 7671. Graphics are checked during commissioning, seasonal checks follow it, and the notice comes at the very end.',
  },
  {
    id: 2,
    question: 'How is an energy meter pulse input proved during point-to-point testing?',
    options: [
      'The BMS total is checked against the meter’s own register',
      'The input LED on the outstation is seen to flash with each pulse',
      'The cable from the meter to the panel is tested for continuity',
      'The reading on the head end looks reasonable for the time of day',
    ],
    correctIndex: 0,
    explanation:
      'A pulse input is proved by confirming the pulses are scaled so the BMS shows the same value as the meter. A flashing LED or a continuity test shows pulses arrive, not that each pulse is worth the right amount, and a plausible-looking figure proves nothing.',
  },
  {
    id: 3,
    question:
      'A volt-free contact from a packaged boiler is wired to a BMS digital input. What extra check does point-to-point testing make on it?',
    options: [
      'That the contact changes state at least twice during the test',
      'That the boiler manufacturer has fitted a suppression device across the contact',
      'That the contact carries the same voltage as the BMS input',
      'That it is truly volt-free and rests in its scheduled open or closed state',
    ],
    correctIndex: 3,
    explanation:
      'A contact described as volt-free should have no voltage on it, and its resting state (normally open or normally closed) must match the points schedule, otherwise the BMS will read the status upside down. Finding a foreign voltage on a supposedly volt-free contact is also a safety issue for whoever works on that outstation.',
  },
  {
    id: 4,
    question:
      'Point-to-point testing is complete with every point proved. Why is functional testing still needed?',
    options: [
      'Because point-to-point testing only covers analogue points and never digital ones',
      'Because correct points say nothing about whether the sequences work together',
      'Because functional testing replaces the need to keep point-to-point records',
      'Because the client cannot witness point-to-point testing',
    ],
    correctIndex: 1,
    explanation:
      'Point-to-point testing proves each signal path. Functional testing proves the strategy: interlocks, sequences, changeover on failure, alarms, control loops and restart after a power cut. Every point can be right while the logic that uses them is wrong.',
  },
  {
    id: 5,
    question:
      'How should a software interlock (for example, heating valve only opens when the fan is proved) be tested?',
    options: [
      'By reading the strategy printout and confirming the interlock link is drawn on it',
      'Both ways: it acts when conditions are met, and is blocked when one is missing',
      'By running the plant normally for a day and seeing that nothing goes wrong',
      'By switching the fan to Hand and checking that the valve then opens',
    ],
    correctIndex: 1,
    explanation:
      'An interlock has two jobs, so it needs two tests. Prove the action happens when the conditions are in place, then take a condition away and prove the action is blocked. A day of normal running only ever shows the positive half.',
  },
  {
    id: 6,
    question:
      'Commissioning a new chilled water system in January, you cannot prove the cooling sequences under real load. What is the right approach?',
    options: [
      'Mark the cooling sequences as passed, since all the points are proved',
      'Delay the whole handover until the cooling can be proved in summer',
      'Set the cooling setpoints to the design values and leave them in place',
      'List the unproved items and agree a date to complete them',
    ],
    correctIndex: 3,
    explanation:
      'Unserviceable plant or the wrong season can stop full commissioning. The honest answer is to record which items are outstanding, who owns them and when they will be done, so they come back under seasonal commissioning rather than being quietly signed off.',
  },
  {
    id: 7,
    question:
      'A fire alarm signal is part of the commissioning tests on an AHU. What should the BMS test prove?',
    options: [
      'That the BMS sees the fire signal and cannot restart plant the fire system stopped',
      'That the BMS shuts down the AHU and closes all the fire dampers once the alarm sounds',
      'That the BMS releases the door locks on the escape route when the alarm sounds',
      'That the fire alarm panel can be silenced and reset from the BMS head end',
    ],
    correctIndex: 0,
    explanation:
      'The fire detection and alarm system and its own interfaces carry out the fire actions. The BMS monitors the fire status and must give it priority, so no hand, override or automatic command in the BMS can run plant the fire strategy has stopped. Shutdowns, dampers and door release are carried out by the fire system, not the BMS.',
  },
  {
    id: 8,
    question:
      'To deal with nuisance alarms during commissioning, several BMS alarms were disabled. What must happen before handover?',
    options: [
      'They can stay disabled until the client asks for them',
      'They should be deleted from the strategy to keep the alarm list short',
      'They must be re-enabled, and the alarm tests recorded',
      'They should be re-enabled only on the head end, not at the outstation',
    ],
    correctIndex: 2,
    explanation:
      'Any alarm switched off for commissioning has to go back on, and the alarm tests belong in the records. Use proper inhibit times, set as short as the plant needs to reach its running state, rather than leaving alarms disabled.',
  },
  {
    id: 9,
    question:
      'The client accepts the BMS into use with three alarms still to be configured. What makes that a safe partial acceptance?',
    options: [
      'A verbal agreement with the site manager on the day of acceptance',
      'An email from the controls contractor promising that the items will all be done soon',
      'Nothing; a BMS can only be accepted when every item is complete',
      'A written list of open items, each with an owner and a date, agreed at acceptance',
    ],
    correctIndex: 3,
    explanation:
      'Partial acceptance is workable when the outstanding items, their owners and their dates are written down and agreed at the time. Undocumented partial acceptance is a well-known cause of later disputes about who was meant to finish what.',
  },
  {
    id: 10,
    question:
      'After loop tuning on a heating valve, the engineer has settled on new setpoints and gains. Where do they belong?',
    options: [
      'Only in the controller itself, since that is where the values are used',
      'In the engineer’s own notebook for the next visit',
      'In the commissioning records, which go to the client at handover',
      'On a label fixed inside the outstation door for the next engineer',
    ],
    correctIndex: 2,
    explanation:
      'Every value set during commissioning should be recorded, and the records handed over with the rest of the documentation. If the controller is replaced or reloaded from an old backup, the records are how anyone knows what it should be running.',
  },
];

const BMSModule7Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 5"
        title="Commissioning"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The order a BMS is proved in, what each stage catches, where the electrician fits in, and
          how the results turn into records the owner keeps.
        </p>

        <TLDR
          points={[
            'Commissioning is a sequence with gates. The electrical installation is inspected and tested, the plant is ready, then the BMS is checked, proved point by point, and proved as a working system.',
            'Point-to-point testing proves every input and output from the real field device to the head end. Linking out terminals or watching the screen alone does not count.',
            'Functional testing proves the strategy: interlocks both ways, sequences, changeover, alarms, loop tuning and what happens when the power goes off and comes back.',
            'Witnessing and acceptance need three things: the criteria met, the evidence supplied and a signed record. Anything left over is listed with an owner and a date.',
            'Whatever the season or the plant would not let you prove is written down and brought back later. Every value set and every test result goes into the commissioning records.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Where commissioning sits</ContentEyebrow>

        <ConceptBlock
          title="Commissioning proves the system does what the specification says"
          plainEnglish="Commissioning is checking and adjusting the installed BMS until it works and meets what was asked for, then writing down that it does."
          onSite="Ask for the commissioning programme early and find out which days you are needed. A controls engineer standing in a plant room waiting for an electrician is the most expensive hour on the job."
        >
          <p>
            Commissioning is the testing, inspection and adjustment of an installed BMS to show that
            it works and meets the requirements, which are normally set out in the specification and
            the description of operation you met in Section 7.1. It is not switching the outstations
            on and seeing lights. It ends with evidence: signed sheets that show each point, each
            sequence and each alarm was tried and passed.
          </p>
          <p>
            On most projects the BMS is one of the last trades to finish, because it cannot be
            proved until the plant it controls is running. That puts it at the end of the programme,
            where any earlier slippage lands. When the time gets squeezed the result is familiar: a
            system that half works, wastes energy and throws false alarms, followed by months of
            call-backs costing far more than the time that was saved.
          </p>
          <p>The work runs in a fixed order, and each stage relies on the one before:</p>
          <ol>
            <li>
              <strong>Electrical installation complete and tested:</strong> power to the panels and
              the control wiring inspected and tested to BS 7671.
            </li>
            <li>
              <strong>Plant and safeties ready:</strong> packaged plant commissioned by its
              supplier, hardwired interlocks working, Hand/Off/Auto proved.
            </li>
            <li>
              <strong>Pre-commissioning checks:</strong> panels, field devices, outstations, wiring
              and the loaded software checked against the drawings.
            </li>
            <li>
              <strong>Point-to-point testing:</strong> every input and output proved from the device
              to the head end.
            </li>
            <li>
              <strong>Functional testing:</strong> the sequences, interlocks, alarms and loops
              proved as a working system.
            </li>
            <li>
              <strong>Witnessing and acceptance:</strong> the client sees it work and signs for it.
            </li>
            <li>
              <strong>Seasonal commissioning:</strong> the parts the weather or the plant would not
              let you prove, completed later.
            </li>
          </ol>
          <p>
            Recording results is not a stage at the end. It runs through every stage, which is why
            it gets its own section at the bottom of this page.
          </p>
        </ConceptBlock>

        <Pullquote>
          A point you did not prove is a point you are guessing about. The owner will find out which
          one, usually on the coldest morning of the year.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Before the BMS engineer starts</ContentEyebrow>

        <ConceptBlock
          title="The electrical installation is finished, inspected and tested first"
          plainEnglish="The supplies to the control panels and the wiring to every field device must be finished and tested as an electrical installation before anyone starts proving controls on it."
          onSite="Do your insulation resistance testing before the outstations and field electronics are connected, or disconnect them first. Never put an insulation resistance tester on a bus or sensor cable with controllers, sensors, drives or bus devices connected: the test voltage can destroy transceivers and inputs. Where SELV or PELV signal wiring is insulation tested, BS 7671 Table 64 sets 250 V DC with a minimum of 0.5 MΩ."
        >
          <p>
            The BMS sits on top of an electrical installation: the supplies to the control panels
            and motor control centres, the power to actuators and transmitters, and the control and
            signal wiring out to every field device. That installation is designed, installed,
            inspected and tested to BS 7671 like any other, and certified. Controls commissioning
            should not be the way wiring faults are discovered.
          </p>
          <p>
            Two points are easy to miss. First, the control wiring is part of the installation, so
            it is inspected as well as tested: correct cable types, terminations, identification at
            both ends and segregation from power cables. Second, the order of testing matters on
            controls work. Electronic inputs and outputs do not tolerate the test voltages used on
            power circuits, so plan the testing with the controls contractor and agree what is
            connected when.
          </p>
          <p>
            Alongside the electrical work, the plant must be ready. Packaged plant with its own
            controls, such as boilers and chillers, should already have been tested and commissioned
            by its manufacturer or installer. The hardwired safety interlocks and fail-safe devices
            you met in Module 3 must work on their own. Where local Hand/Off/Auto switches are
            fitted, they are proved in Hand and Off, then left in Auto. Commissioning a BMS against
            plant that is not ready simply proves nothing.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1"
          meaning="A Band I circuit is not to share a wiring system with a Band II circuit unless one of the permitted methods is used, such as insulating for the highest voltage present, a separate conduit, trunking or ducting system, or an earthed metal screen between the Band I and Band II cores of a multicore cable. Pre-commissioning is where you confirm the installed wiring actually followed the method the design chose."
          cite="BS 7671:2018+A4:2026, Regulation 528.1"
        />

        <InlineCheck
          id="bms-7-5-ready"
          question="The controls engineer arrives to start commissioning, but the boiler supplier has not yet commissioned the boilers. What should happen?"
          options={[
            'Commission the BMS anyway and retest later if anything changes',
            'Commission the heating points with the boilers isolated',
            'Ask the electrician to link out the boiler enable signals',
            'Wait until the boilers are commissioned and ready to run',
          ]}
          correctIndex={3}
          explanation="BMS commissioning relies on plant that has been tested and is fit to run. Proving sequences against plant that is not ready gives results that mean nothing and wastes a visit. Linking out signals hides exactly the faults commissioning is meant to find."
        />

        <SectionRule />
        <ContentEyebrow>Pre-commissioning checks</ContentEyebrow>

        <ConceptBlock
          title="Check the installation is fit to be commissioned"
          plainEnglish="Before testing anything, walk the job with the drawings and check everything is there, fitted right, labelled and connected as designed."
          onSite="Most of this list is your work. If the outstation document wallet is empty, the labels are missing or the trunking lids are not cross-referenced, it will be found here, so finish it before the walk-round."
        >
          <p>
            Pre-commissioning is a systematic check of the finished installation to decide whether
            it is ready to be commissioned. It covers the hardware on site and the work done in the
            factory: control panels, packaged controllers and the application software are all
            tested before they arrive, and those test results are part of the record.
          </p>
          <p>
            <strong>Control panels.</strong> A panel should not be accepted on site until it has
            been fully function-tested, ideally with the client watching. Expect checks on the lamp
            test, wired interlocks, signals out of the panel, protective device sizes and overload
            ranges against the drawings, starters energising and tripping with the trip indication
            showing, labelling, terminal numbering, cable identification, earthing of doors and
            gland plates, shrouding of anything that stays live when the panel is isolated, and
            interlocked isolators on doors where dangerous voltages are exposed.
          </p>
          <p>
            <strong>Sensors and actuators.</strong> Right type, right place, right way round, with
            good access and clear identification. A duct sensor in the wrong position or a valve
            actuator mounted where nobody can reach it is a pre-commissioning failure, not a
            commissioning one. Actuators that can be set to more than one mode should be configured
            on site and marked with the setting used.
          </p>
          <p>
            <strong>Outstations.</strong> Correct type and number in the right location, securely
            fixed and identified, every cable terminated and labelled, power available, fuses in,
            all cards and connecting leads in place, and the hardware set up as designed. Inside the
            door there should be a wallet with the wiring diagram, the points schedule, the strategy
            diagram and the description of operation.
          </p>
          <p>
            <strong>Wiring.</strong> Cable as specified, identified at both ends, screens continuous
            and terminated as the manufacturer says, conductors continuous, polarity correct, each
            core landed on the right input or output, terminations tight, no short circuits, power
            and signal cables segregated, and the cables fixed and protected.
          </p>
          <p>
            <strong>Software.</strong> The strategy should have been tested in the factory against
            the functional specification, as Section 7.4 described: realistic setpoints and ranges,
            sensible time schedules, interlocks, default loop settings, sequences, start-up and
            shut-down routines, plant changeover, alarms and graphics. On site it is loaded and
            proved, the reset procedure is proved, and backup copies are kept on site.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Treating pre-commissioning as paperwork"
          whatHappens="The checklists are ticked in the site office from the drawings. On the first commissioning day the engineer finds a sensor fitted in the wrong duct, two outstation cards missing and a screen earthed at both ends. Each fault stops the testing, and the engineer leaves with half the points unproved and another visit to book."
          doInstead="Do the checks at the equipment, with the drawings in your hand, and record what you actually found. A defect found in pre-commissioning costs an electrician an hour; the same defect found during point-to-point testing costs the whole commissioning team their day."
        />

        <SectionRule />
        <ContentEyebrow>Point-to-point testing</ContentEyebrow>

        <ConceptBlock
          title="Every point, proved from the field device to the head end"
          plainEnglish="Take each input and output in turn, make the real device do something, and check the right point shows the right thing at the outstation and on the head end screen."
          onSite="Point-to-point testing is usually a two-person job: the controls engineer at the outstation or laptop, and you at the device with a radio or phone. Agree the order from the points schedule before you start so nobody walks the building twice."
        >
          <p>
            Point-to-point testing works down the points schedule one line at a time. For each point
            the question is the same: when the real thing happens in the plant, does the correct
            point, with the correct name and the correct value, change at the outstation and at the
            head end? It is the stage where the points schedule from Section 7.3 is shown to be
            true.
          </p>
          <p>
            Effort grows steadily with the number of points. Graphics, naming and integration can
            often be set up once and copied across similar plant, but each physical point still has
            to be visited and proved on its own. That is why the points count drives the
            commissioning programme.
          </p>
          <p>The checks differ by point type:</p>
          <ul>
            <li>
              <strong>Digital inputs:</strong> operate the device itself (run the fan, trip the
              overload, open the filter switch) and confirm the status changes on the correct point.
              A volt-free contact must really be volt-free, and it must rest in the open or closed
              state the schedule says so the status is not read upside down.
            </li>
            <li>
              <strong>Digital outputs:</strong> command the output from the BMS and confirm the
              correct item of plant starts or stops, not its neighbour.
            </li>
            <li>
              <strong>Analogue inputs:</strong> compare the BMS reading with a calibrated test
              instrument at the sensor, in place where possible, under normal conditions. The
              specification says whether every sensor is checked or a representative sample.
            </li>
            <li>
              <strong>Analogue outputs:</strong> drive the actuator through its range and watch the
              valve or damper: correct direction, full travel, linkage set for rotation, lift or
              close-off, smooth movement, and, where it has spring return, the correct position when
              its supply is removed.
            </li>
            <li>
              <strong>Meter pulse inputs:</strong> confirm the pulses are scaled so the BMS shows
              the same value as the meter.
            </li>
            <li>
              <strong>Communications:</strong> the links between outstations and the head end, and
              any integrated points from other systems, are checked to report correctly.
            </li>
          </ul>
          <p>
            Each result goes on the point-to-point sheet: the point, what was done, what was seen,
            pass or fail, who tested it and when. A failed point is fixed, retested and recorded
            again, never just corrected and ticked.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-5-p2p"
          question="To save time, the controls engineer suggests proving digital inputs by putting a wire link across each input at the outstation terminals. What does that leave unproved?"
          options={[
            'The outstation input card and its configuration',
            'The cable to the device and the device itself',
            'The point name on the head end graphics',
            'The communications between outstation and head end',
          ]}
          correctIndex={1}
          explanation="A link at the terminals proves the input card, its configuration, the communications and the head end. It proves nothing about the cable run, the terminations at the device or whether the device works and is the right one. Those are exactly the parts the electrician installed, and the ones most likely to be wrong."
        />

        <Scenario
          title="Two AHUs, one plant room, crossed status"
          situation="A plant room holds AHU-1 and AHU-2 side by side. During functional testing both units start and stop correctly from the head end, and both supply fan status points show running when they should. Everyone is ready to sign. Point-to-point testing on the status inputs was skipped because the units seemed to work."
          whatToDo="Prove each status input at the device. Isolate AHU-1's supply fan locally while AHU-2 runs, and watch which status point drops. Here it is AHU-2's, because the two differential pressure switch cables were landed on each other's inputs. With both fans always running together the fault was invisible. Swap the cores, correct the terminal schedule, retest both points with one fan off at a time, and record the fail, the fix and the retest."
          whyItMatters="Left in, a failed fan on AHU-1 would show as running, so no alarm would be raised and any interlock using that status would hold the wrong plant. Point-to-point testing exists for faults that only appear when one item of plant behaves differently from the one next to it."
        />

        <SectionRule />
        <ContentEyebrow>Functional testing</ContentEyebrow>

        <ConceptBlock
          title="Prove the strategy works as a system"
          plainEnglish="With every point proved, run the plant through each mode and failure the description of operation covers, and check it does what the document says."
          onSite="You may be asked to trip overloads, pull fuses or open isolators to simulate failures. Do it under the site's permit system, tell everyone in the plant room first, and put everything back exactly as found."
        >
          <p>
            Point-to-point testing proves the signal paths. Functional testing proves the logic that
            uses them. The description of operation is the test script: each mode and each response
            is tried, and the result is compared with what the document says should happen. The
            application software was tested in the factory, but it still has to be proved on site
            against the real plant.
          </p>
          <ul>
            <li>
              <strong>Software interlocks:</strong> tested positively (the action happens when the
              conditions are in place) and negatively (it cannot happen when one is missing).
            </li>
            <li>
              <strong>Control loops:</strong> tuned so the plant holds steady across its range, with
              the final setpoints and settings recorded for each loop.
            </li>
            <li>
              <strong>Sequencing and changeover:</strong> multiple boilers, pumps or fans switch on
              and off in order, the lead unit rotates, the standby takes over when the duty unit
              trips, and the system does what was specified when the standby fails as well.
            </li>
            <li>
              <strong>Optimisers and compensators:</strong> logged against outside and inside
              temperatures to show they are working and the building is meeting its conditions.
            </li>
            <li>
              <strong>Alarms:</strong> each alarm raised for real, with the right priority, message
              and destination, and the right response when a sensor fails open or short.
            </li>
            <li>
              <strong>Start-up, shut-down and power failure:</strong> the start and stop routines
              leave valves and dampers where they should be, the system behaves as specified when
              the supply is lost and on standby power, the controllers keep their software and data,
              and plant restarts in an orderly way when power returns.
            </li>
            <li>
              <strong>Stand-alone operation:</strong> where the specification asks for it, each
              outstation keeps controlling its plant when the network or head end fails.
            </li>
            <li>
              <strong>Head end:</strong> starts up on its own, clock and calendar set, trend logs
              collecting, passwords working, every graphic page checked.
            </li>
          </ul>
          <p>
            Alarm inhibit times are set during this stage to stop false alarms while plant comes up
            to its running state. Keep them to the minimum the plant needs. Any alarm switched off
            to get through commissioning must be switched back on before the job is finished.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Fire signals: test the priority, not a BMS shutdown"
          plainEnglish="The fire alarm system does the fire actions. The BMS test is that it sees the fire signal and that nothing in the BMS can fight it."
          onSite="When the fire interface is tested, the fire alarm engineer drives the fire actions. Your job is to have proved the fire signal into the BMS input point to point, and to be there when the plant is restored afterwards."
        >
          <p>
            In UK practice the fire detection and alarm system and its own interfaces stop plant,
            release doors and run smoke control. The BMS monitors the fire alarm status and may
            carry out follow-up actions that are not life safety, such as logging the event or
            holding plant off until it is reset.
          </p>
          <p>
            So the functional test of a BMS around fire is twofold. The fire status must reach the
            BMS on the correct point and raise the right alarm. And the fire signal must take
            priority over every manual and automatic command in the plant logic: with the fire
            signal active, try to start the fan from the head end, from a schedule and from any hand
            or override path, and prove that none of them runs plant the fire strategy has stopped.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-5-functional"
          question="The duty pump trips during a functional test and the standby starts as expected. What else should the test cover before that sequence is signed off?"
          options={[
            'Nothing; standby on duty failure is the whole sequence',
            'Checking the duty pump nameplate details against the equipment schedule',
            'Failure of the standby as well, and the alarms each failure raises',
            'Running both pumps together to check the flow',
          ]}
          correctIndex={2}
          explanation="Changeover is only half tested when the standby starts. The sequence should also be tried with the second unit failing, and the alarms each failure raises should be checked for priority, message and destination. That is how you find the strategy that quietly does nothing when both pumps are down."
        />

        <SectionRule />
        <ContentEyebrow>Witnessing and acceptance</ContentEyebrow>

        <ConceptBlock
          title="Someone else watches it pass, and signs for it"
          plainEnglish="Witnessing means the client, or someone acting for them, watches the tests happen. Acceptance means they sign that the system meets what was agreed."
          onSite="On witness days, have the panels open, the drawings to hand, test instruments ready and access arranged. A witnessed test that stalls because a ceiling tile cannot be lifted wastes the time of everyone in the room."
        >
          <p>
            Witnessing is the client or their representative watching tests and checks of the BMS
            hardware and operation before completion. It can happen at several points: a factory
            test of a control panel before it is accepted on site, a sample of points repeated
            during point-to-point testing, and a demonstration of the main sequences and alarms
            before handover. Ideally the person watching is the one who will run the system, which
            is why involving the client&rsquo;s site staff in commissioning pays off at handover.
          </p>
          <p>Formal acceptance of a stage needs three things in place together:</p>
          <ol>
            <li>
              <strong>Criteria met:</strong> every acceptance criterion agreed for the project has
              been shown to pass.
            </li>
            <li>
              <strong>Evidence supplied:</strong> the pack that shows how each criterion was
              checked: witnessed test sheets, the points schedule with results, screenshots of
              working graphics, and certificates.
            </li>
            <li>
              <strong>Sign-off recorded:</strong> a written record of who accepted it, when, any
              conditions, and anything deferred.
            </li>
          </ol>
          <p>
            Partial acceptance, where the building goes into use with items still open, is normal
            and workable as long as each outstanding item, its owner and a target date are written
            down and agreed at the time. Partial acceptances that nobody wrote down are a well-known
            cause of arguments months later about who was meant to finish what.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Seasonal commissioning</ContentEyebrow>

        <ConceptBlock
          title="Finish what the weather would not let you prove"
          plainEnglish="Some things can only be proved in the right season or with real occupants. List them, agree a date, and come back."
          onSite="Before you leave site, make sure the outstanding list names the points and sequences, not just 'cooling'. The engineer who returns in July may not be the one who wrote it."
        >
          <p>
            Full commissioning is often blocked by plant that is out of service or by the season. A
            chiller plant handed over in January cannot be proved against a summer cooling load, and
            heating compensation curves cannot be checked properly in August. Those items should be
            identified, recorded as not fully commissioned, and given a date for completion. The
            specification should allow for this, so it is planned and paid for rather than
            forgotten.
          </p>
          <p>
            There is a second reason to return. Most BMSs are commissioned before the building is
            occupied, with no people, no equipment heat and no real use patterns. Once the building
            is in use, setpoints, schedules and loop settings nearly always need adjusting. That
            fine tuning normally happens during the first year, and reviewing the system in each
            season of that year catches the problems that only show up in one of them.
          </p>
          <p>
            Seasonal visits are commissioning, not maintenance. They are tested and recorded the
            same way, and their results go into the same records so the owner ends up with one
            complete account of how the system was proved.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-5-seasonal"
          question="Why do setpoints and schedules usually need adjusting during the first year, even after thorough commissioning?"
          options={[
            'Because it was commissioned before the building was in normal use',
            'Because controllers drift out of calibration within the first few months',
            'Because the commissioning engineer leaves the default values in place',
            'Because the head end software has to be updated every season',
          ]}
          correctIndex={0}
          explanation="Commissioning usually happens in an empty building. Real occupancy, equipment heat and the way people actually use the space change the loads, so settings chosen at commissioning need refining once the building is in use. That is why fine tuning and seasonal reviews are planned into the first year."
        />

        <SectionRule />
        <ContentEyebrow>Recording the results</ContentEyebrow>

        <ConceptBlock
          title="If it is not recorded, it was not commissioned"
          plainEnglish="Every check, every test and every value you set gets written down, signed, and handed to the owner."
          onSite="Fill in test sheets at the time, at the device, not from memory in the van. Sign and date them, and record fails and retests rather than overwriting them."
        >
          <p>
            Commissioning records are the evidence that the work was done and the reference for
            everyone who maintains the system afterwards. Every variable parameter and switch
            setting chosen during commissioning should be recorded. As stages are completed they are
            signed off, and the checklists are gathered into the commissioning manual that goes to
            the client with the as-fitted drawings.
          </p>
          <p>A complete set usually includes:</p>
          <ul>
            <li>field and communications wiring checklists</li>
            <li>field device checklists</li>
            <li>control panel checklists and overload settings</li>
            <li>outstation and head end checklists</li>
            <li>point-to-point test sheets</li>
            <li>alarm and interlock test records</li>
            <li>control loop tuning records</li>
            <li>start-up and shut-down test records</li>
            <li>environmental performance test records</li>
            <li>the list of items deferred to seasonal commissioning, with owners and dates</li>
          </ul>
          <p>
            Your BS 7671 certificates and schedules for the power and control wiring sit alongside
            these. They are separate documents with a separate purpose, but the controls records
            assume they exist.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The notice of completion of commissioning"
          plainEnglish="Once commissioning is finished, building control and the owner get a notice saying it was done properly. The commissioning records are what back that notice up."
          onSite="You will rarely issue this notice yourself on a BMS job, but your test sheets are part of what it rests on. Make sure they are complete before someone signs a statement that relies on them."
        >
          <p>
            Section 1.5 covered the energy efficiency guidance in Approved Document L. In England, a
            notice of completion of commissioning goes to the building control body and the building
            owner once fixed building services have been commissioned (paragraph 8.7 of the 2021
            edition, which is in force now; paragraph 7.7 of the 2026 edition from 24 March 2027).
            In our words, it confirms three things: the commissioning plan was followed; the systems
            were inspected in a sensible order and to a reasonable standard; and the test results
            show the systems perform reasonably in line with the design, with a written explanation
            for anything that falls short.
          </p>
          <p>
            Read that last point with the seasonal list in mind. Items not yet proved should be
            described honestly, not swept into a notice that says everything passed. The completed
            commissioning records then go into the building log book, which Section 7.6 picks up at
            handover.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is BMS commissioning my job or the controls engineer’s?',
              answer:
                'The controls specialist commissions the BMS: loading software, tuning loops and proving sequences. Your part is an installation that is finished, tested to BS 7671 and ready, then working alongside the engineer during point-to-point testing, operating devices, finding and fixing wiring faults and recording what was done. On smaller jobs those roles can overlap, so agree in writing who does what.',
            },
            {
              question: 'Can point-to-point testing be done before the plant runs?',
              answer:
                'Much of it can. Sensors can be checked against a calibrated instrument, actuators driven through their travel and outputs checked at contactors with the plant made safe. Status inputs that rely on the plant running, such as airflow or pump differential pressure, have to be proved once the plant can run. Mark those points as outstanding rather than passing them.',
            },
            {
              question: 'What if a point fails during a witnessed test?',
              answer:
                'Record it as a fail, find the cause, fix it safely, retest and record the retest. A clear fail-fix-retest trail is worth more to the client than a sheet of ticks, and it is what any later investigation will look for. Never correct a fault and tick the original line as if it passed first time.',
            },
            {
              question: 'Does the client have to accept the system all at once?',
              answer:
                'No. Partial acceptance is common, especially where items are waiting for seasonal commissioning. The outstanding items, who owns each one and a target date must be written down and agreed at the time of acceptance.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Commissioning runs in order: installation tested, plant ready, pre-commissioning checks, point-to-point, functional testing, witnessing, then seasonal work.',
            'The power supplies and control wiring are inspected and tested to BS 7671 before the BMS is commissioned, with electronics protected from insulation test voltages.',
            'Point-to-point testing proves every input and output by operating the real device and seeing the correct point change at the head end.',
            'Functional testing proves interlocks both ways, sequences and changeover, loops, alarms, power failure and restart, and fire priority over every BMS command.',
            'Acceptance needs criteria met, evidence supplied and a signed record; outstanding items are listed with owners and dates.',
            'Items the season or plant would not allow are recorded and completed later, and the first year brings fine tuning in occupation.',
            'Every value set and every test result goes into the commissioning records, which back the notice to building control and the owner.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-4"
          prevLabel="Controller set-up and software"
          nextHref="/study-centre/upskilling/bms-module-7-section-6"
          nextLabel="Handover"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section5;
