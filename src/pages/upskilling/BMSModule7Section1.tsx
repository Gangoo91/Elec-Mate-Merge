/**
 * BMS Module 7 · Section 1 — Design documents
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the three documents an
 * electrician installs and tests a BMS from: the points schedule (I/O list) and what each of
 * its columns means, the schematics and wiring diagrams (plant schematic, panel layout,
 * terminal-by-terminal wiring, cable schedule), and the control philosophy or description of
 * operation, including the actions on failure and the rule that a fire signal beats every
 * manual and automatic command. It then shows how each document is used at first fix, second
 * fix, point-to-point testing and functional testing, and how the set is kept true to what was
 * actually fitted. The old page ("BMS Design Documentation") carried a fan sequence that let a
 * manual override run a fan during a fire alarm, repeated a "300 mm" separation figure as a
 * rule, gave an unsourced "40% spare capacity" trunking figure, and spent a third of its length
 * on network topology, which now lives in Module 5. All of that is gone.
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

const TITLE = 'Design documents | BMS Module 7.1 | Elec-Mate';
const DESCRIPTION =
  'Read a BMS points schedule, schematics and wiring diagrams, and the description of operation, and use them to install, test and keep the record as fitted.';

const outcomes = [
  'Explain what a points schedule is and what each of its usual columns tells the installer',
  'Tell a plant schematic, a panel layout, a wiring diagram and a cable schedule apart, and say what each is for',
  'Read a description of operation and pick out the sequences, interlocks, alarms and actions on failure',
  'Check that a design gives the fire signal priority over every hand, override and automatic command',
  'Use each document at first fix, termination, point-to-point testing and functional testing',
  'Keep the documents true to what was fitted, and say what must be left in the panel and handed over',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The points schedule for an air handling unit lists a "supply fan run" output and a separate "supply fan run status" input. Why are there two points for one fan?',
    options: [
      'One is a spare, kept in case the first point fails in service',
      'The output is for the head end and the input is for the trend log',
      'The output commands the fan; the input proves it responded',
      'BACnet needs every device listed twice, once in each direction',
    ],
    correctIndex: 2,
    explanation:
      'The output tells the starter to run; the input comes back from the plant (an auxiliary contact, a current relay or a pressure switch) to prove it did. Without the status point the BMS only knows what it asked for, not what happened, so it cannot raise a "commanded on, not running" alarm. Neither point is a spare, and the protocol has nothing to do with it.',
  },
  {
    id: 2,
    question:
      'You are second-fixing a duct temperature sensor. Which column of the points schedule tells you which controller terminals to land it on?',
    options: [
      'The controller and channel column',
      'The point name or description column',
      'The range and engineering units column',
      'The comments and notes column',
    ],
    correctIndex: 0,
    explanation:
      'The controller and channel column ties the point to a physical input on a specific outstation, and the wiring diagram turns that into terminal numbers. The point name says what the point is, not where it lands. Units describe the value, and the comment column is for notes, not terminations.',
  },
  {
    id: 3,
    question:
      'Which document should you go to first to find out what the boiler plant is meant to do when the BMS loses communications with its head end?',
    options: [
      'The cable schedule for the boiler house',
      'The panel general arrangement drawing',
      'The points schedule for the boiler plant',
      'The description of operation',
    ],
    correctIndex: 3,
    explanation:
      'Actions on communications failure, BMS failure and power failure are operating requirements, so they belong in the description of operation. The points schedule lists the points but not how they behave, and the panel and cable drawings show hardware, not behaviour.',
  },
  {
    id: 4,
    question:
      'A description of operation says: "In Hand, the supply fan runs regardless of BMS demand." It says nothing more about hand mode. What should you raise before wiring the starter panel?',
    options: [
      'Nothing, because hand mode is a maintenance feature outside the BMS',
      'Whether the fire stop still acts on the fan with it in Hand',
      'Whether the fan should run at full speed or at reduced speed in Hand',
      'Whether the hand position should be removed from the panel entirely',
    ],
    correctIndex: 1,
    explanation:
      '"Regardless" is the dangerous word. A fire signal must take priority over every manual and automatic command, so no hand or override path may run a fan the fire strategy has stopped. Speed in Hand is a fair question but not the safety one, and removing hand is not your call.',
  },
  {
    id: 5,
    question:
      'During point-to-point testing a valve actuator drives closed when the head end commands 100% open. The wiring matches the diagram. What is the right next step?',
    options: [
      'Swap the signal cores at the actuator and then mark up the drawing',
      'Pass the point, because the actuator does move when commanded',
      'Fail it, and check actuator action and point set-up with the engineer',
      'Replace the actuator, because a reversed actuator must be faulty',
    ],
    correctIndex: 2,
    explanation:
      'If the wiring matches the diagram, the likely causes are the actuator direction setting or the way the point is configured, and both need agreeing against the schedule. Swapping cores to make it "work" hides a mismatch and may reverse a spring-return fail position. A point that moves the wrong way is a fail, not a pass.',
  },
  {
    id: 6,
    question:
      'At second fix you land a return air sensor on input 7 because input 5, shown on the schedule, is damaged. What makes this acceptable?',
    options: [
      'Marking up schedule and drawing, and telling the controls engineer',
      'Labelling the cable "IN7" at the controller end of the run only',
      'Writing the change down in your own site diary for the day',
      'Nothing; the point must stay unwired until a new controller comes',
    ],
    correctIndex: 0,
    explanation:
      'The strategy reads input 5, so until the software is changed the BMS will show a dead sensor and a phantom value on input 7. The change has to reach the schedule, the drawing and the controls engineer, and become part of the as-fitted record. A one-end label or a private diary leaves the next person guessing.',
  },
  {
    id: 7,
    question: 'What does a plant schematic show that the points schedule on its own does not?',
    options: [
      'The terminal numbers for every field device on the plant',
      'The cable type and the length needed for each cable run',
      'The alarm priority and the routing set up for each point',
      'Where each point sits relative to the coils, fans and dampers',
    ],
    correctIndex: 3,
    explanation:
      'A schematic places the points on a drawing of the plant, so you can see that the frost thermostat sits after the heating coil and the supply sensor after the fan. That relationship is what the schedule lacks. Terminals are on the wiring diagram, cables on the cable schedule, and alarm routing in the operational schedules.',
  },
  {
    id: 8,
    question:
      'What should be left in the document wallet inside each BMS outstation panel at handover?',
    options: [
      'The tender drawings, so anyone can compare them with what was built',
      'That panel’s as-fitted wiring, points schedule and strategy documents',
      'Only the panel general arrangement drawing, kept at its first issue',
      'The commissioning engineer’s contact details and nothing else',
    ],
    correctIndex: 1,
    explanation:
      'The person who opens that panel in five years needs that panel’s own wiring, its points and the logic that drives them, and they need the versions that match what is installed. Tender drawings describe intent, not what was built, and a contact card is not a record.',
  },
  {
    id: 9,
    question:
      'A functional test of an AHU sequence passes, but the description of operation describes a different start-up order from the one the strategy actually runs. What is the correct outcome?',
    options: [
      'Pass the test, because the plant works and nobody has complained',
      'Change the strategy straight away so that it matches the document',
      'Get the designer to say which is right, and correct the other one',
      'Leave the document alone, because it was the approved tender issue',
    ],
    correctIndex: 2,
    explanation:
      'A functional test proves the plant does what the description says. If the two disagree, either the strategy or the document is wrong, and the designer decides which. Changing the software on your own initiative is as wrong as passing a test that did not follow the written sequence.',
  },
  {
    id: 10,
    question:
      'A points schedule row for a chiller flow temperature has no controller channel and no terminal, because the value is read across the network from the chiller. How should you treat it?',
    options: [
      'As an error, since every point needs a terminal',
      'As a network point, still part of the BMS scope',
      'As a point for the chiller supplier alone to wire',
      'As a spare row that can be deleted at handover',
    ],
    correctIndex: 1,
    explanation:
      'Schedules carry soft, virtual or network points that have no wires at all: setpoints, calculated values and values read from a chiller or meter over a network. They do not appear on your wiring diagram but they are still in scope and still get proved. Treating the row as an error, as someone else’s wiring or as a spare loses a point the strategy needs.',
  },
];

const BMSModule7Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 1"
        title="Design documents"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          The points schedule, the drawings and the description of operation: what each one says,
          how you install and test from it, and how to keep it true once the job changes.
        </p>

        <TLDR
          points={[
            'Three documents define a BMS job: the points schedule (what is connected), the schematics and wiring diagrams (where and how), and the description of operation (what it should do).',
            'Every row on the points schedule is one point. Read its reference, type, signal, range, controller and channel before you pull a cable.',
            'The description of operation is what you test against. It must cover actions on failure, and it must give the fire signal priority over every hand, override and automatic command.',
            'You use the schedule and wiring diagrams at first and second fix, and all three at point-to-point and functional testing.',
            'A document that no longer matches the installation is worse than none. Mark up every change, get it into the master, and leave the as-fitted set in the panel and in the handover.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The document set</ContentEyebrow>

        <ConceptBlock
          title="Three questions, three documents"
          plainEnglish="One list of everything that gets wired, a set of drawings showing where it goes, and a written explanation of how the plant should behave."
          onSite="Before you start a BMS job, ask for all three by name. If any one is missing, you will end up guessing, and guesses become faults at commissioning."
        >
          <p>
            A BMS design answers three questions. <strong>What is connected?</strong> That is the
            points schedule, sometimes called the I/O list or points list.{' '}
            <strong>Where is it, and how is it wired?</strong> That is the schematics, panel
            drawings, wiring diagrams and cable schedule. <strong>What should it do?</strong> That
            is the control philosophy, more often written up as a description of operation or a set
            of operational schedules.
          </p>
          <p>
            Most designs work from the top down. The client and designer agree what the system must
            achieve in broad terms, such as &quot;the heating will use optimum start&quot; or
            &quot;the chillers are inhibited when no air handling units are running&quot;. Those
            statements are then broken down into detailed sequences, and the sequences decide which
            points are needed. So the three documents are not independent: every point on the
            schedule should exist because something in the description of operation needs it, and
            every point should appear on a drawing.
          </p>
          <p>
            You will meet these documents at different levels of detail through a project. At tender
            the points schedule may be indicative, enough to price. By installation it should be
            complete and fixed to controllers and channels. At handover it should describe the
            installation as it was actually left. The names change from company to company, but the
            three questions do not.
          </p>
        </ConceptBlock>

        <Pullquote>
          If a point is on the schedule but on no drawing, or in the logic but on no schedule, the
          design has a hole in it. Find it before you install, not at witness testing.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>The points schedule</ContentEyebrow>

        <ConceptBlock
          title="One row per point, and what each column tells you"
          plainEnglish="A spreadsheet where every sensor, switch, relay output and actuator signal gets its own line, with everything you need to wire it and everything the controls engineer needs to configure it."
          onSite="Print the schedule for the panel you are working on and keep it with the wiring diagram. Tick each row as you terminate it, and write down anything that differs. On a starter panel, expect a run command, a run status and a trip input for each motor; if only the command is listed, ask why."
        >
          <p>
            The points schedule defines the physical scope of the BMS. Each point is described by
            what it does, what it measures or controls, and over what range. Layouts differ, but a
            good schedule carries the same core columns:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Reference or tag.</strong> A short code unique to that point, often built from
              the plant item and the point type (a supply air temperature on an AHU, a fan run
              command, a damper output). It appears on the drawings, on the cable labels and in the
              strategy, so it is the thread that ties every document together. Section 7.3 covers
              naming conventions in depth.
            </li>
            <li>
              <strong>Point name or description.</strong> Plain words: &quot;AHU 1 supply air
              temperature&quot;, &quot;boiler 2 lockout&quot;. This is what the operator will read
              on the head end.
            </li>
            <li>
              <strong>Type.</strong> Input or output, and digital or analogue. A digital input is a
              contact or status (fan tripped, filter dirty). An analogue input is a measurement
              (temperature, pressure, humidity). A digital output switches something (a relay to a
              starter). An analogue output positions something (a valve or damper actuator, a drive
              speed reference).
            </li>
            <li>
              <strong>Signal.</strong> The electrical form of the point: a volt-free contact, a 4–20
              mA loop, a 0–10 V signal, or a resistive sensor of a stated type. This decides the
              cable, the terminal and how you will test it.
            </li>
            <li>
              <strong>Range and units.</strong> The span the signal represents and the engineering
              units, so the controller can turn the raw signal into a value in °C, Pa or %RH. A
              sensor with a different span from the one scheduled will read wrong on perfect wiring.
            </li>
            <li>
              <strong>Controller and channel.</strong> Which outstation and which input or output
              the point lands on. The wiring diagram turns this into terminal numbers.
            </li>
            <li>
              <strong>Reference documents.</strong> The schematic, the motor control centre or panel
              drawing, the wiring diagram and the operational schedule that this point belongs to.
            </li>
            <li>
              <strong>Alarms, trends and comments.</strong> Alarm limits and priority, whether the
              point is logged, and notes such as &quot;volt-free contacts provided by the chiller
              supplier&quot; or &quot;see location plan&quot;.
            </li>
          </ul>
          <p>
            <strong>Command and status are two points, not one.</strong> A common pattern on a
            schedule is a fan with several rows: a run command (digital output), a run status or
            proof of flow (digital input), and a trip or fault (digital input). A two-speed fan adds
            a second command for the other speed. An AHU access door may add an interlock status
            input. Each is a separate pair of cores to a separate terminal.
          </p>
          <p>
            The reason is simple. A BMS output only tells the controller what it asked for. The
            status input tells it what actually happened. Without a status point the BMS cannot tell
            you the fan has stopped on a broken belt or a tripped overload while the command is
            still on. When you wire status points, check on the schedule where the status is meant
            to come from: an auxiliary contact on the contactor proves the contactor pulled in,
            while a differential pressure switch across the fan proves air is moving. They are not
            the same proof.
          </p>
          <p>
            Schedules also carry points that have no wires at all: setpoints, calculated values, and
            values read across a network from a chiller or a meter. These are often called soft,
            virtual or network points. They will not appear on your wiring diagram, but they are
            still part of the scope, and Section 5.5 covers how integrated values arrive.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-1-schedule-columns"
          question="A schedule row reads: reference AHU1-SAT, type AI, signal 0–10 V, controller OS3, channel UI4, with the range set to the span of the sensor the designer specified. The sensor delivered also gives 0–10 V, but over a wider span. What happens if you fit it as is?"
          options={[
            'Nothing, because the signal type matches and the wiring will be correct',
            'The controller will raise a sensor failure alarm as soon as it powers up',
            'The head end shows a wrong temperature, as the scaling expects the old span',
            'The sensor will be damaged by the supply from the controller input',
          ]}
          correctIndex={2}
          explanation="The controller scales the 0–10 V into °C using the range on the schedule. A sensor with a different span gives a believable but wrong reading, which is worse than an obvious fault because nobody questions it. Raise it so either the sensor or the scaling is changed, and record which."
        />

        <SectionRule />
        <ContentEyebrow>Schematics and wiring diagrams</ContentEyebrow>

        <ConceptBlock
          title="Schematics, panel drawings and wiring diagrams"
          plainEnglish="The schematic shows where each point sits on the plant. The panel drawings show what is in the box, the wiring diagrams show every wire to every terminal, and the cable schedule lists every cable end to end."
          onSite="Use the schematic to set out field devices and the wiring diagram to terminate. If either disagrees with the schedule, stop and find out which is right before you fix or land anything."
        >
          <p>
            A control schematic is a simplified picture of one system, such as an air handling unit,
            a boiler circuit or a chilled water loop, drawn the way the plant is laid out, with the
            BMS points marked on it. It is not a wiring drawing and does not try to be. What it does
            show is the relative positions of the points: the frost thermostat after the heating
            coil, the supply air sensor after the fan, the differential pressure switch across the
            filter, the mixing valve on the flow from the boiler header. The points schedule cannot
            show that, and it matters, because the logic depends on each measurement being taken in
            the right place.
          </p>
          <p>
            Schematics are also the starting point for the graphics the operator sees on the front
            end, so a schematic that is wrong tends to produce a graphic that is wrong. When you
            find that a sensor has had to go somewhere other than where it is drawn, the schematic,
            and in time the graphic, need to change with it.
          </p>
          <p>
            Below the schematic sit the electrical drawings. The{' '}
            <strong>panel general arrangement</strong> shows the enclosure, the controllers, the
            power supplies, the relays and the terminal rails, and how the panel is divided. The{' '}
            <strong>wiring diagrams</strong> show each circuit terminal by terminal: the control
            supply and how it is protected, the outstation inputs and outputs, the interposing
            relays between the outstation and the starters, and the field terminals each cable lands
            on. The <strong>cable schedule</strong> lists each cable with its reference, its type,
            where it starts and where it ends.
          </p>
          <p>
            For you, these are the drawings that matter most at second fix. Where a BMS output
            drives a motor starter, the wiring diagram also shows the starter control circuit: where
            the BMS enable contact sits, where the Hand/Off/Auto switch sits, and where any fire
            interface contact breaks the circuit. That last detail is a life-safety point and is
            covered in the next part of this page.
          </p>
          <p>
            Check the drawings for the control supply too. They should show where each control
            circuit takes its supply from, and whether it lives or dies with the plant it serves.
            That choice is a design decision under BS 7671, and the drawings are where you see
            whether somebody made it.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 528.1: a Band I circuit is not to be contained in the same wiring system as a Band II circuit, and neither is to share a wiring system with a circuit above low voltage, unless one of the specified methods is adopted, such as insulating every cable for the highest voltage present, running the circuits in separate conduit, trunking or ducting, or in a multicore cable separating Band I and Band II cores with an earthed metal screen of current-carrying capacity equivalent to the largest Band II core. Section 557 covers auxiliary circuits, whose supply may be dependent on or independent of the main circuit according to their function."
          meaning="A BMS panel and its field cabling mix Band I signal circuits with Band II control and power. The panel layout and cable schedule should show how each cable route is segregated, or which permitted method is being used. The wiring diagram should show where each control supply comes from. If either is missing, ask before you install."
          cite="BS 7671 Regulation 528.1; Section 557 (Regulation 557.3.1)"
        />

        <InlineCheck
          id="bms-7-1-which-drawing"
          question="You need to know which terminal on the outstation the boiler 2 lockout input lands on. Which document gives you that directly?"
          options={[
            'The plant schematic',
            'The wiring diagram for that panel',
            'The description of operation',
            'The head end graphic',
          ]}
          correctIndex={1}
          explanation="The points schedule names the controller and channel, and the wiring diagram turns that into terminal numbers. The schematic shows where the point sits on the plant, the description of operation says what it does, and the graphic shows its value. None of them gives terminals."
        />

        <SectionRule />
        <ContentEyebrow>The description of operation</ContentEyebrow>

        <ConceptBlock
          title="What the plant should do, written down"
          plainEnglish="A plain-language account of how each piece of plant starts, runs, stops, protects itself and raises alarms, in enough detail that you could check the BMS is doing it."
          onSite="Read the description of operation for every item of plant you wire. It tells you why each point exists, and it is the script for functional testing."
        >
          <p>
            The control philosophy states how the buildings and plant are to be controlled. In
            practice it is usually written as a description of operation for each plant item,
            arranged by building, zone or system, numbered, and cross-referenced to the schematics
            and the points schedule. A good one covers:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>zoning and the conditions to be held in each zone;</li>
            <li>time programmes and how occupancy is handled;</li>
            <li>
              plant sequences: what starts first, what proves before the next step, and what holds
              plant off;
            </li>
            <li>interlocks between plant items and inhibits;</li>
            <li>alarm limits, their priority and where each alarm goes;</li>
            <li>actions on start-up, daily shut-down and seasonal shut-down;</li>
            <li>load shedding, where it applies;</li>
            <li>
              actions on communications failure, on BMS failure and on total power failure, and how
              the plant restarts when power returns.
            </li>
          </ul>
          <p>
            Read a sequence the way the controller will. A typical chilled water description says,
            in effect: at the scheduled time, start the chilled water pumps; once flow is proven,
            and after a delay, enable the chiller; control the flow temperature to its setpoint;
            mask the high temperature alarm while the system pulls down; inhibit the chiller when it
            is cold outside or when no air handling unit needs cooling; alarm on loss of flow or a
            chiller fault. Every one of those clauses needs points (a pump command, a flow proof, a
            chiller enable, a temperature, a fault input), and every one is a test.
          </p>
          <p>
            Section 7.2 shows how a sequence like this is turned into control logic. On this page
            the point is to read it: if a clause depends on a point that is not on the schedule, or
            a point on the schedule is used by no clause, raise it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The fire signal beats everything"
          plainEnglish="Whatever else the description says, when the fire alarm says a fan stops, it stops: in Auto, in Hand, under a BMS override, and with the BMS switched off."
          onSite="Look at every fan, damper and AHU description and ask: what happens on fire, and is there any path that could run this plant while the fire strategy wants it stopped? If the answer is yes or unclear, it goes back to the designer."
        >
          <p>
            Fire actions such as plant shutdown, smoke control and door release are carried out by
            the fire detection and alarm system and its own interfaces, not by the BMS. The BMS
            normally monitors fire alarm status and may do non-life-safety follow-up, such as
            logging the event or restarting plant in sequence once the fire system has reset.
            Section 6.5 covers that split in detail.
          </p>
          <p>
            In the design documents this shows up as a priority rule. A fire signal must take
            priority over every manual and automatic command in the plant logic. No hand position,
            no head-end override and no local override path may run a fan that the fire strategy has
            stopped. A description of operation that says &quot;in Hand, the fan runs
            regardless&quot; or &quot;the operator override takes priority over all other
            commands&quot;, and says nothing about fire, is incomplete and potentially dangerous.
          </p>
          <p>
            Check the wiring diagram tells the same story. The fire interface contact should break
            the starter control circuit in a part of the circuit that the Hand/Off/Auto switch and
            the BMS enable cannot bypass. The BMS should get its own separate status contact. If the
            drawing shows the fire contact only in the auto leg, or only as a BMS input, the
            documents and the safety requirement disagree.
          </p>
          <p>
            The description should also say what happens after the fire system resets. Usually the
            plant does not simply leap back on: the BMS sees the fire status clear and restarts
            plant in its normal sequence, or waits for an operator to reset it. Either can be right,
            but it should be written down, because it is one of the things you will test.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="A sequence where the override outranks the fire alarm"
          whatHappens="The description of operation for an AHU lists command priority as: operator override, then time schedule, then fire. It was copied from a template written for a different building. The panel is built to match, with the fire contact in series with the BMS enable only. Months later someone puts the fan into hand during a filter change and leaves it there; a fire alarm operates and the fan keeps running, moving smoke into an escape route."
          doInstead="Treat any priority list that does not put fire at the top as a design query, not a detail. Ask the designer to correct the description so fire stops the plant whatever the mode, and get the starter wiring drawn with the fire contact ahead of the Hand/Off/Auto switch. When it is installed, prove it in Auto, in Hand and under a BMS override with the fire alarm engineer."
        />

        <InlineCheck
          id="bms-7-1-description-gaps"
          question="A description of operation for a boiler plant covers the start sequence, setpoints and alarms in detail. What is the most important thing to check is also there?"
          options={[
            'The colour each point will be shown in on the head end graphic',
            'The manufacturer, model and firmware of each outstation',
            'The name of the engineer who wrote and loaded the strategy',
            'What the plant does on comms, BMS or power failure, and restart',
          ]}
          correctIndex={3}
          explanation="Failure behaviour is the part most often left out, and the part you most need to test. Without it, nobody can say whether a plant that stopped on a power cut and did not restart is a fault or the design. Graphic colours, hardware make and authorship are not operating requirements."
        />

        <SectionRule />
        <ContentEyebrow>Reading the set together</ContentEyebrow>

        <ConceptBlock
          title="A cross-check before you pull a cable"
          plainEnglish="Spend an hour laying the documents side by side before the job starts. Most of the mistakes you would otherwise find at commissioning show up on paper first."
          onSite="Do this check panel by panel, with a highlighter. Anything you cannot reconcile goes on one list to the controls contractor, not into a phone call you will forget."
        >
          <p>
            Each document is usually produced by a different person at a different time, so they
            drift apart. A short cross-check before installation catches most of the drift. Work
            through the panel you are about to wire and ask:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Does every row on the schedule appear on the wiring diagram with a terminal, and on
              the schematic in a position you can actually reach on the plant?
            </li>
            <li>
              Does every point named in the description of operation appear on the schedule? A
              sequence that needs a flow proof the schedule does not list will fail its functional
              test.
            </li>
            <li>
              Does the signal type on each row match the device being supplied? A sensor bought as a
              resistive type will not work on an input configured for 4–20 mA.
            </li>
            <li>
              Where a point comes from someone else&apos;s equipment, such as volt-free contacts in
              a boiler or chiller control panel, does the schedule say who provides them and where
              they are? Interfaces between contractors are where points go missing.
            </li>
            <li>
              For any fire alarm interface, do the documents show the BMS point as a status input
              only, with the stop itself wired into the plant control circuit?
            </li>
            <li>
              Are there channels left over on each controller after every point is allocated? If a
              controller is full on day one, any extra point found on site means extra hardware.
            </li>
          </ul>
          <p>
            None of this is you redesigning the system. It is you making sure the design you have
            been given can be built as drawn. The controls contractor would far rather receive a
            list of queries before you start than a list of faults after you finish.
          </p>
        </ConceptBlock>

        <Pullquote>
          The cheapest place to fix a BMS fault is on paper, before the cable is pulled. The most
          expensive is in an occupied building after handover.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Using the documents to install and test</ContentEyebrow>

        <ConceptBlock
          title="From first fix to functional test"
          plainEnglish="The schedule and drawings tell you what to wire and where. The description of operation tells you what to prove once it is wired."
          onSite="Do not wait for the commissioning engineer to find your mistakes. Check each point against its row as you terminate it, and the job goes much faster later."
        >
          <p>
            <strong>First fix.</strong> Use the schematic and the device location drawings to set
            out field devices so they measure the right thing and can be reached for testing and
            replacement. Use the cable schedule to pull the right cable type on each route,
            segregated as the drawings show.
          </p>
          <p>
            <strong>Second fix.</strong> Terminate from the wiring diagram. Identify each cable at
            both ends with the reference used on the drawings. Check the schedule row as you go: is
            this the right type of point, the right signal, the right channel? Where a device has
            its own settings, such as a sensor span or an actuator direction, set it to match the
            schedule, and mark the as-commissioned setting on the device.
          </p>
          <p>
            <strong>Wiring checks.</strong> Before any point is powered, the usual checks are the
            cable as specified, identified at both ends, screen continuity, conductor continuity,
            correct polarity, the right input or output, secure terminations, and mains and signal
            cables kept apart as designed. Do the continuity and insulation checks with every
            controller and sensor disconnected at both ends of the cable. Never put an insulation
            resistance tester on a bus or sensor cable with devices connected, because the
            transceivers and inputs can be destroyed. Where an insulation test is wanted on SELV or
            PELV signal wiring, BS 7671 Table 64 sets 250 V DC with a minimum of 0.5 MΩ.
          </p>
          <p>
            <strong>Point-to-point testing.</strong> Each physical point is proved individually,
            from the field device to the value or command on the head end. For an input, you create
            a real change at the device and see the right value appear against the right reference.
            For an output, the head end commands it and you see the right device respond the right
            way. The schedule is the checklist: every row gets a result.
          </p>
          <p>
            <strong>Functional testing.</strong> Once the points are proved, the plant is run
            through the description of operation, clause by clause: the start sequence, the
            interlocks, the alarms, the failure actions, the fire stop with the fire alarm engineer,
            and any Hand/Off/Auto switches proved in Hand and Off, then left in Auto. Section 7.5
            covers commissioning in full.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-1-point-test"
          question="During point-to-point testing, how do you prove a fan trip input properly?"
          options={[
            'Operate the real trip at the starter and watch the right point change',
            'Force the point to "tripped" in the software and check the alarm appears',
            'Measure continuity on the cores between the starter and the outstation',
            'Check the input LED on the outstation changes when you link the terminals',
          ]}
          correctIndex={0}
          explanation="Point-to-point testing proves the whole path, from the device in the field to the right reference on the head end. Forcing it in software skips the wiring, continuity skips the device and the software, and linking at the outstation skips the cable and the starter. Each is a useful step, but none proves the point."
        />

        <Scenario
          title="A school heating panel where the schedule and the panel disagree"
          situation="You are wiring a new BMS panel for a secondary school boiler house. The panel came from the controls contractor's workshop. As you terminate, you find the wiring diagram shows the boiler 1 and boiler 2 lockout inputs on terminals that, according to the points schedule, belong to the two pump trip inputs. The panel ferrules match the wiring diagram. The commissioning engineer is due next week."
          whatToDo="Stop terminating that group and do not guess which document is right. Note the conflict on your copies of both documents with the terminal numbers, and send it to the controls contractor the same day. Ask them to confirm which channels the strategy actually reads, and to issue a corrected schedule or drawing. Carry on with the rest of the panel. When the answer comes back, terminate to it, mark up your copies, and make sure the correction is in their master before point-to-point testing."
          whyItMatters="If the lockouts and pump trips are crossed, a boiler lockout could show as a pump fault and send the engineer to the wrong plant, and the logic that holds a boiler off when its pump has tripped may act on the wrong signal. Point-to-point testing would probably catch it, but only if the person testing reads the schedule, and fixing it then costs a visit. Catching it at termination costs a phone call."
        />

        <SectionRule />
        <ContentEyebrow>Keeping them true</ContentEyebrow>

        <ConceptBlock
          title="As fitted, not as designed"
          plainEnglish="By handover, every document should describe what is actually in the building, not what someone intended at the start of the job."
          onSite="Keep one marked-up set on site in red, and do not throw it away until the changes are in the master. Your mark-ups are the only record of what you changed."
        >
          <p>
            Every job changes. A sensor moves because the duct is in the way, a spare channel is
            used because one is damaged, a relay is added, a point is dropped by agreement. Each
            change has to reach every document it touches. A point that moves channel changes the
            schedule, the wiring diagram and, through the controls engineer, the strategy. A sensor
            that moves position changes the schematic and the graphic.
          </p>
          <p>
            The working method is simple. Mark up a site copy as you go, with the date and the
            reason. Pass the mark-ups to whoever holds the master documents, and do not let a change
            go into the controller without the documents following. At the end of the job the
            documentation should reflect the installation as installed, and the commissioning
            records should be filed with the as-fitted drawings.
          </p>
          <p>
            Two places matter most. Each outstation panel should have a document wallet holding that
            panel&apos;s own points schedule and wiring diagram, plus the strategy diagram and the
            functional description for the plant it controls, all as fitted. The handover package
            should hold the record drawings, schematics, points schedules, commissioning records and
            the operating and maintenance manuals. Many clients now ask for the complete points
            schedule as an editable spreadsheet. Section 7.6 covers handover.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="The tender drawings left in the panel"
          whatHappens="The panel wallet still holds the drawings issued at tender. During the job three points moved channel and a relay was added for a new extract fan. Two years later a maintenance electrician replaces a failed input module, rewires it from the wallet drawings, and two sensors swap places on the head end. The building runs on the wrong temperatures for weeks before anyone notices."
          doInstead="Before you leave a panel, check the wallet holds the current as-fitted wiring diagram and points schedule, with the revision matching the master. If your mark-ups have not yet been issued, leave a clearly dated marked-up copy and chase the controls contractor for the formal issue."
        />

        <InlineCheck
          id="bms-7-1-as-fitted"
          question="Which of these best describes an as-fitted points schedule?"
          options={[
            'The schedule issued at tender, signed off by the designer',
            'One that matches the installation and strategy, site changes included',
            'A list of only the points that passed point-to-point testing',
            'The schedule exported from the head end on the day of handover',
          ]}
          correctIndex={1}
          explanation="As fitted means it describes the real installation and the real configuration, changes included. A tender schedule describes intent. A list of passed points hides the ones that failed. An export from the head end shows the software but not the channels, terminals and devices behind it."
        />

        <FAQ
          items={[
            {
              question: 'Is an I/O list the same thing as a points schedule?',
              answer:
                'In everyday use, yes. Some engineers use "I/O list" only for the hard-wired inputs and outputs and "points schedule" for the whole list including network and calculated points. Ask which you have been given, because a pure I/O list will not show values coming over a network from a chiller or meter.',
            },
            {
              question: 'Who is responsible for the design documents, and can I change them?',
              answer:
                'The designer and the controls contractor own them, and the controls contractor usually holds the master. You should not issue new revisions yourself, but you must mark up any change you make on site and pass it to them. If you find a conflict between documents, raise it rather than choosing one.',
            },
            {
              question: 'What if there is no description of operation for the plant I am wiring?',
              answer:
                'Ask for it. Without it nobody can say what a correct functional test looks like, and you cannot check that fire stops the plant in every mode. On a small job it may be a few paragraphs in the specification, which is fine, as long as it covers sequences, alarms, failure actions and fire.',
            },
            {
              question:
                'The points schedule calls for a volt-free contact from a boiler panel. Whose job is it?',
              answer:
                'The schedule or the specification should say. Often the boiler supplier provides the contacts and the electrical or controls contractor wires from them to the outstation. If the schedule is silent, raise it early, because it is easy for each party to assume the other is providing it.',
            },
            {
              question: 'Do I need to understand the logic diagrams too?',
              answer:
                'You need to be able to read them, not write them. Section 7.2 covers function blocks and sequences. For installation and testing, the description of operation, the schedule and the wiring diagrams carry most of what you need.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A BMS job is defined by the points schedule (what), the schematics and wiring diagrams (where and how), and the description of operation (what it should do).',
            'Each schedule row gives the reference, name, type, signal, range, controller and channel. Read it before you pull a cable, and tick it as you terminate.',
            'Command and status are separate points. Proof that plant responded comes from a status input, and the schedule says what kind of proof.',
            'The description of operation is the script for functional testing, and must include failure actions and restart.',
            'Fire beats everything: no hand, override or automatic path may run plant the fire strategy has stopped, and the wiring diagram must show it.',
            'When documents disagree, stop and get the right answer from the controls contractor. Never pick one and carry on.',
            'Mark up every change, get it into the master, and leave the as-fitted set in each panel and in the handover.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7"
          prevLabel="Module 7: Design, installation, commissioning and handover"
          nextHref="/study-centre/upskilling/bms-module-7-section-2"
          nextLabel="Control logic"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section1;
