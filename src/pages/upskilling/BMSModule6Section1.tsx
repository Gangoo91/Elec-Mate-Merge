/**
 * BMS Module 6 · Section 1 — Alarms
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches what a BMS alarm is for (to make a
 * person do something), where alarms come from, how priorities are set by consequence and
 * time to act, what makes an alarm useful (clear text, the right value, routed to someone who
 * can act), how nuisance alarms and alarm floods start and how they are designed out, the
 * difference between acknowledging an alarm, resetting the plant and clearing the cause, and
 * how escalation and the alarm log close the loop. The old page put fire alarms, smoke
 * extract, door release and lift recall inside the BMS alarm and integration list, as if the
 * BMS carried out those actions; that is wrong and has gone. Here the BMS monitors the fire
 * alarm system's status and the fire system acts (detail in 6.5). Also dropped: an invented
 * deadband percentage, invented escalation timers, SMS as the escalation route, invented
 * monthly/annual test intervals and a fire cable product name.
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

const TITLE = 'Alarms | BMS Module 6.1 | Elec-Mate';
const DESCRIPTION =
  'BMS alarms for electricians: priorities, nuisance alarms and floods, acknowledge vs reset vs fixing the cause, routing, escalation and the alarm log.';

const outcomes = [
  'Explain what a BMS alarm is for, and tell an alarm apart from an event or a status change',
  'Name the main sources of BMS alarms, from plant trips to failed sensors and run-hour limits',
  'Set an alarm priority by consequence and time to act, rather than by how important the plant looks',
  'Recognise nuisance alarms and alarm floods, and describe the usual ways they are designed out',
  'Distinguish acknowledging an alarm, resetting the plant and clearing the cause, and say who does each',
  'Describe how alarm routing, escalation and the alarm log work, and how to prove them at commissioning',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The head end shows an alarm as unacknowledged but no longer active. What does that mean?',
    options: [
      'The condition has cleared, but nobody has yet seen the alarm',
      'Someone has seen it and the fault is still present',
      'The alarm was inhibited before the condition returned to normal',
      'The plant has reset itself and the alarm can be ignored',
    ],
    correctIndex: 0,
    explanation:
      'Active describes the condition and acknowledged describes the person. Here the condition has gone away, for example after a brief overnight trip, but nobody has looked at it yet. It still needs someone to look, because a trip that comes and goes is often the early sign of a fault that will one day stay.',
  },
  {
    id: 2,
    question:
      'Which question is the best test of whether a point should be configured as an alarm at all?',
    options: [
      'Does somebody need to do something when this happens',
      'Is the plant item expensive to replace if it fails',
      'Does the point already appear on a graphic',
      'Did the points schedule give it an alarm column',
    ],
    correctIndex: 0,
    explanation:
      'An alarm exists to get a person to act. If nobody needs to do anything, it belongs in the event log or a trend, not in the alarm list. Plant cost matters to priority, but a costly item can still produce events that need no action, and a column on the points schedule is not a reason on its own.',
  },
  {
    id: 3,
    question:
      'After a mains failure and restart, the head end shows a long list of alarms: fan fails, pump fails, low temperatures, comms lost to two outstations. What is the most useful first step?',
    options: [
      'Acknowledge everything so the list is clear to work from',
      'Start with the low temperature alarms because occupants will notice those first',
      'Inhibit the whole list until the plant has settled',
      'Find the first alarm in time order and treat the rest as likely consequences',
    ],
    correctIndex: 3,
    explanation:
      'In a flood, most alarms are consequences of one root cause. Sorting by time and finding the first one usually points at that cause. Acknowledging everything throws away the order you need; inhibiting the lot hides anything genuinely new; and the low temperatures will follow the plant once it is running again.',
  },
  {
    id: 4,
    question:
      'A low-temperature alarm on a room sensor comes and goes dozens of times in an afternoon while the reading hovers around the limit. What is the right fix?',
    options: [
      'Lower its priority so it stops interrupting the operator',
      'Add hysteresis or a short delay to the alarm',
      'Inhibit the alarm until the heating season ends',
      'Move the alarm limit so far down that it never triggers',
    ],
    correctIndex: 1,
    explanation:
      'This is a chattering alarm: the value is sitting on the limit. A gap between the raise and clear points, or a short delay, turns dozens of events into one. Lowering the priority or inhibiting it just hides a real signal, and moving the limit out of reach turns a useful alarm into a useless one.',
  },
  {
    id: 5,
    question:
      'The BMS shows a fire alarm status input in alarm. Which statement reflects UK practice?',
    options: [
      'The BMS should now shut down the AHUs and release the doors',
      'The BMS monitors; the fire system and its interfaces act',
      'The operator should reset the fire panel from the head end',
      'The BMS should take control of the fire alarm system',
    ],
    correctIndex: 1,
    explanation:
      'The fire detection and alarm system drives plant shutdown, door release and smoke control through its own interfaces. The BMS monitors the status so the operator knows what is happening, and may carry out non-life-safety follow-up. It is not the life-safety path, and nobody resets a fire panel from the BMS.',
  },
  {
    id: 6,
    question:
      'A chiller produces a "high flow temperature" alarm every morning for the first few minutes after it starts, then the alarm clears by itself. What is the best approach?',
    options: [
      'Delete the alarm, as it clears without anyone doing anything',
      'Raise it to high priority so somebody watches the start-up',
      'Leave it as it is, because the operators will soon learn to ignore it',
      'Mask the alarm during the start-up period, then let it act normally',
    ],
    correctIndex: 3,
    explanation:
      'The water is expected to be warm while the chiller pulls down, so the alarm during start-up tells nobody anything. Masking it for that period keeps the alarm working when it matters — during normal running. Deleting it loses real protection; training people to ignore an alarm is how real ones get missed.',
  },
  {
    id: 7,
    question:
      'Out of hours, a high-priority alarm is sent to the duty engineer but nobody acknowledges it. A well-set-up system should:',
    options: [
      'Send it on to the next person on the list after a set time',
      'Keep repeating it to the same duty engineer until it clears',
      'Lower its priority because it has not been acknowledged',
      'Remove it from the alarm list at the start of the next day',
    ],
    correctIndex: 0,
    explanation:
      'That is escalation: an unacknowledged alarm moves up or along the call list until a person takes ownership. Repeating it to the same person who may be asleep, unreachable or off sick is not escalation. Downgrading or removing it does the opposite of what a high-priority alarm is for.',
  },
  {
    id: 8,
    question:
      'You are asked to reset a pump that keeps tripping on overload so the BMS alarm goes away. What should you do first?',
    options: [
      'Reset it, as the BMS alarm proves the overload is working correctly',
      'Ask the operator to inhibit the alarm so the pump can keep running',
      'Find out why it is tripping before resetting and running it again',
      'Increase the overload setting so it stops tripping on start',
    ],
    correctIndex: 2,
    explanation:
      'Resetting a protective device without finding the cause just restarts the fault. A repeated overload trip points at the motor, the pump, the supply or the setting, and that needs investigating. Inhibiting the alarm hides it, and turning up the overload to suit the symptom removes the protection.',
  },
  {
    id: 9,
    question:
      'Which set of information should every logged alarm carry so it can be analysed later?',
    options: [
      'The graphic it appears on and the colour it is shown in',
      'The point name only, since everything else can be looked up',
      'The cable reference, the outstation number and the panel location',
      'Identity, value, time and date, and acknowledgement status',
    ],
    correctIndex: 3,
    explanation:
      'Identity, value, time and date, and acknowledgement status are what turn a list of alarms into evidence you can review, sort and analyse. Cable and panel references are useful on drawings, but they do not tell you what happened or how quickly anyone responded.',
  },
  {
    id: 10,
    question: 'At commissioning, what proves an alarm is actually working end to end?',
    options: [
      'Creating the real condition at the device and checking what arrives',
      'Checking the alarm exists in the outstation strategy file',
      'Forcing the point in software and watching the graphic change colour',
      'Seeing the alarm on a points schedule the designer has signed',
    ],
    correctIndex: 0,
    explanation:
      'Only a real condition at the device tests the wiring, the input, the limit, the message, the priority and the route together. Forcing a point in software skips the field wiring and the device, and a strategy or a schedule entry only shows the alarm was intended, not that it works.',
  },
];

const BMSModule6Section1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 1"
        title="Alarms"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          A BMS alarm is only worth having if it reaches someone who can act on it, in time, with
          enough information to know what to do. This page covers how to set alarms up so they do
          that, and the habits that stop them turning into noise.
        </p>

        <TLDR
          points={[
            'An alarm is an event a person needs to know about and act on. If nobody needs to act, log it instead.',
            'Priority comes from consequence and time to act. High priority alarms announce themselves; low priority ones wait to be looked at.',
            'Chattering, start-up and consequential alarms bury the real ones. Hysteresis, delays, masking and suppression design them out.',
            'Acknowledge means "I have seen it". Reset puts the plant back. Neither fixes the cause.',
            'Unanswered alarms escalate along a call list, and every alarm is logged with what, value, when and acknowledgement.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What an alarm is for</ContentEyebrow>

        <ConceptBlock
          title="An alarm is a request for a person to do something"
          plainEnglish="Every other point on the BMS controls plant or reports a value. An alarm is the one thing on the system whose job is to change what a human being does next."
          onSite="When someone asks for a new alarm, ask them who will get it and what that person will do. If neither answer comes back quickly, it probably wants to be an event or a trend, not an alarm."
        >
          <p>
            A working definition: an alarm is the BMS telling the operator about something they need
            to be aware of. The key word is <em>need</em>. A fan starting on its time programme is
            something that happened; a fan that was told to start and did not is something somebody
            needs to know about.
          </p>
          <p>That gives three kinds of record that people often lump together:</p>
          <ul>
            <li>
              <strong>Status changes</strong> — a point changing state as expected. A pump starts, a
              valve opens. These are shown on graphics and may be logged, but they are not alarms.
            </li>
            <li>
              <strong>Events</strong> — things worth a record but not a response. An operator
              changes a setpoint, a schedule switches over, a user logs on. These go in the event
              log so you can see later who did what.
            </li>
            <li>
              <strong>Alarms</strong> — abnormal conditions that need a person to look, decide and
              act. These go to the alarm list, are announced according to priority, and wait to be
              acknowledged.
            </li>
          </ul>
          <p>
            Getting this split right is the single biggest thing that decides whether a site trusts
            its alarms. Put every status change in the alarm list and operators learn, quite
            reasonably, that the list is mostly rubbish. That is the moment real alarms start being
            missed.
          </p>
        </ConceptBlock>

        <Pullquote>An alarm that asks nobody to do anything should not be an alarm.</Pullquote>

        <SectionRule />
        <ContentEyebrow>Where alarms come from</ContentEyebrow>

        <ConceptBlock
          title="Five families of alarm you will meet on almost every system"
          plainEnglish="Most BMS alarms come from a handful of sources: plant that tripped or failed to respond, values outside their limits, sensors that have failed, maintenance counters and other systems' alarms passed through."
          onSite="When you wire an input, know which family its alarm belongs to. A trip input, a run-status input and a temperature sensor all need different alarm logic, and the points schedule should say what that is."
        >
          <ul>
            <li>
              <strong>Plant faults from a contact.</strong> A volt-free trip or fault contact from a
              starter panel, a chiller, a boiler or a VSD. The plant has told the BMS it has stopped
              on a fault.
            </li>
            <li>
              <strong>Command and status mismatch.</strong> The BMS commanded a fan to run, but its
              proving input (a differential pressure switch or a current switch) has not come in
              within a set time. The outstation compares what it asked for with what actually
              happened, raises an alarm, and on many systems brings in the standby unit.
            </li>
            <li>
              <strong>Out-of-limits on an analogue value.</strong> A supply air temperature, a flow
              temperature, a pressure or a humidity that has gone above a high limit or below a low
              limit. These are the alarms most likely to chatter, and they need the most care when
              setting up.
            </li>
            <li>
              <strong>Sensor failure.</strong> High and low limits set just outside anything the
              real value could reach. A temperature sensor that suddenly reads far beyond its
              physical range has almost certainly gone open circuit or short circuit, not detected a
              real event.
            </li>
            <li>
              <strong>Maintenance and run-hours.</strong> Run-time counters that raise a service
              alarm when plant reaches a set number of hours, and filter differential pressure
              switches that say a filter is due. These matter, but rarely at three in the morning.
            </li>
          </ul>
          <p>
            A sixth source sits slightly apart: <strong>other systems' alarms</strong>. A BMS is
            often used to monitor the status of separate systems such as medical gas plant,
            generators, lifts, refrigeration or the fire alarm panel. The BMS shows and logs that
            status; it does not take over the other system's job. The fire alarm is the clearest
            case and is covered properly in Section 6.5.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The fire alarm acts. The BMS watches"
          plainEnglish="In UK practice, the fire detection and alarm system shuts down plant, releases doors and runs smoke control through its own interfaces. The BMS only monitors the fire alarm status."
          onSite="If a drawing or a strategy shows the BMS output as the thing that shuts a fan on fire, raise it with the designer before you wire it. The fire stop belongs upstream of the BMS, in the fire system's own interface."
        >
          <p>
            A fire alarm status input on the BMS is there so the operator knows the building is in
            alarm, so the event is logged alongside everything else, and so the BMS can do sensible
            non-life-safety follow-up, such as not trying to restart plant that the fire system has
            stopped. It is not the path by which the building is made safe.
          </p>
          <p>
            Good practice keeps a clear technical break between the fire alarm system and the BMS,
            so nothing on the BMS side can compromise the fire system. In plant logic, a fire signal
            has priority over every other command, including hand and override, so no BMS action can
            run a fan the fire strategy has stopped. Lifts are treated the same way: the BMS may
            monitor them, but must never be able to influence lift controls.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-1-what-is-alarm"
          question="Which of these should be configured as an alarm rather than an event or a status change?"
          options={[
            'The heating pump starting on its normal time programme',
            'An operator changing a room setpoint from the head end',
            'The heating pump commanded on with no flow proved after the set delay',
            'The building switching from occupied to unoccupied mode at the end of the day',
          ]}
          correctIndex={2}
          explanation="A pump commanded to run with no proof of flow is abnormal and needs someone to act. The other three are expected changes or operator actions: worth showing or logging, but not worth interrupting anybody for."
        />

        <SectionRule />
        <ContentEyebrow>Priorities</ContentEyebrow>

        <ConceptBlock
          title="Set priority by consequence and time to act"
          plainEnglish="Ask two things about each alarm: what happens if nobody responds, and how long before that happens? The answers set the priority."
          onSite="On a points schedule, look for an alarm priority column and a short reason. If every alarm is marked high, the schedule has not really been thought about."
        >
          <p>
            Most systems give you several alarm priority levels. The names differ between
            manufacturers and sites, but the idea is the same everywhere: the arrangements for
            dealing with alarms should be graded according to how serious they are. A useful way to
            think about it is in three bands.
          </p>
          <ul>
            <li>
              <strong>High priority</strong> — something will be damaged, a critical area will be
              lost or people will be put at risk if nobody acts soon. Examples: a boiler plant
              lockout on a cold night in a hospital ward block, a server room cooling failure, frost
              protection failing. These announce themselves whatever else is happening on the front
              end, and are routed to whoever is on duty, in hours or out.
            </li>
            <li>
              <strong>Medium priority</strong> — comfort or efficiency is affected and somebody
              should look today. A single fan coil fault, a zone running warm, a duty pump failed
              with the standby running.
            </li>
            <li>
              <strong>Low priority or information</strong> — maintenance due, a filter dirty, a
              run-hour limit reached. These are shown when the operator goes looking, not pushed at
              them.
            </li>
          </ul>
          <p>
            Notice the third example under medium. A duty pump failure on its own sounds serious,
            but if the standby has started and is proven, nothing bad happens if nobody responds for
            a few hours. The same fault with no standby running is high priority. Priority belongs
            to the situation, not to the name of the plant item.
          </p>
          <p>
            The point of grading is that high priority alarms take precedence over everything else
            on the system. When an operator is dealing with a burst of lower priority alarms, the
            critical one must still get through.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Making everything high priority to be safe"
          whatHappens="At handover, nobody wants to be blamed for a missed alarm, so every alarm goes in as high priority. Within weeks the duty phone goes off for dirty filters and run-hour counters. People start silencing it, and the night a boiler locks out, the call is ignored with the rest."
          doInstead="Grade each alarm by consequence and time to act, and write the reason on the points schedule. Keep the high priority list short enough that every call on it is worth getting out of bed for, then review it after the first few months of real use."
        />

        <SectionRule />
        <ContentEyebrow>Making an alarm useful</ContentEyebrow>

        <ConceptBlock
          title="A useful alarm says what, where, how bad and what to do"
          plainEnglish="An alarm that just says 'AHU2 DI-14 ALARM' sends someone hunting. One that says 'AHU2 supply fan failed to start — standby not available, check starter panel MCC-2' sends them to the right place."
          onSite="When you terminate an alarm input, check the point name and description the controls engineer has given it. If it does not match what you actually wired, say so then. Fixing a wrong label after handover is far harder."
        >
          <p>A useful alarm has four things going for it:</p>
          <ul>
            <li>
              <strong>It is actionable.</strong> There is something a person can do about it: go and
              look, reset after finding the cause, call a specialist, or move occupants.
            </li>
            <li>
              <strong>It is clear.</strong> The point name follows the site naming convention, and
              the alarm carries a short text message written for whoever receives it. Good systems
              let the operator attach their own message to each alarm condition, which is where
              local knowledge goes: which panel, which key, who to ring.
            </li>
            <li>
              <strong>It carries the evidence.</strong> The alarm record shows which condition it
              is, the value at the time, the time and date, and whether it has been acknowledged. A
              high temperature alarm that tells you the reading saves a trip to the trend log.
            </li>
            <li>
              <strong>It goes to someone who can act.</strong> Sending a chiller fault to a
              reception screen that nobody watches is not alarm handling. Routing is part of the
              alarm, not an afterthought.
            </li>
          </ul>
          <p>
            Routing usually changes with time of day. During working hours an alarm may go to the
            head end in the engineers' office. Out of hours the same alarm, if it is high priority,
            may go to a duty engineer or a monitoring bureau. Most systems handle this with a time
            programme for where alarms are sent, just like the time programme for the plant.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-1-useful"
          question="Which change would make a 'Boiler 1 fault' alarm most useful to the person who receives it at night?"
          options={[
            'Changing its colour on the graphic from amber to a bright red',
            'Adding text on standby boiler status and where the panel is',
            'Raising it to the highest priority level the system allows',
            'Copying it to every user account set up on the head end',
          ]}
          correctIndex={1}
          explanation="The person receiving it needs to know how serious it is and where to go. Text that answers both saves time and prevents wrong decisions. Colour and blanket priority add no information, and sending it to everyone often means nobody owns it."
        />

        <SectionRule />
        <ContentEyebrow>Nuisance alarms and floods</ContentEyebrow>

        <ConceptBlock
          title="Nuisance alarms teach people to ignore alarms"
          plainEnglish="A nuisance alarm is one that goes off when nothing needs doing. Each one is small; together they train the operators to stop paying attention."
          onSite="If you are on site and hear people say 'oh, that one always does that', write it down. A known nuisance alarm is a fault in the configuration, and it is usually cheap to fix."
        >
          <p>The common types, and what usually cures them:</p>
          <ul>
            <li>
              <strong>Chattering alarms.</strong> An analogue value sits right on its limit and the
              alarm raises, clears, raises again. The cure is hysteresis on the alarm (it raises at
              one value and only clears once the reading has moved back by a clear margin) or a
              short delay, so a brief excursion does not count. The same idea is why mechanical
              process switches have a deadband: one alarm event instead of dozens.
            </li>
            <li>
              <strong>Start-up and changeover alarms.</strong> Supply air or chilled water is
              expected to be off target while plant pulls down after a start. The alarm should be
              masked for that period and then come back into service on its own.
            </li>
            <li>
              <strong>Alarms on plant that is meant to be off.</strong> A low supply temperature
              alarm on an AHU that is switched off for the night is not news. Make the alarm
              conditional on the plant being commanded on and proven running.
            </li>
            <li>
              <strong>Badly sited or failing sensors.</strong> A room sensor in direct sun, next to
              a radiator or in a draught will alarm for reasons that have nothing to do with the
              space. Moving it is the cure; widening the limit to suit is not.
            </li>
            <li>
              <strong>Standing alarms.</strong> Alarms that have been active for weeks because the
              plant is out of service or decommissioned. They clutter the list and make genuine new
              alarms harder to spot. Either repair the plant, or formally take the point out of
              service with a record of why.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Alarm floods: one cause, a hundred messages"
          plainEnglish="When something big happens, like a power cut or an outstation losing communications, every point that depends on it alarms at once. The real cause is in there somewhere, buried."
          onSite="After a shutdown, sort the alarm list by time and look at the first few entries. The root cause is almost always near the top of the earliest alarms, not among the loudest."
        >
          <p>
            A mains failure stops every fan and pump. When power returns, the BMS sees every command
            without a matching status, every temperature drifting, and perhaps communications lost
            to outstations that were slower to restart. The operator faces a screen full of alarms,
            and the one that matters, perhaps a boiler that has locked out and will not restart on
            its own, is somewhere in the middle.
          </p>
          <p>Systems handle floods in a few ways, and the designer chooses which:</p>
          <ul>
            <li>
              <strong>Consequential alarm suppression.</strong> If the AHU supply fan has failed,
              the low supply air temperature alarm from the same AHU is a consequence, not a second
              fault. The logic suppresses it while the parent alarm is active.
            </li>
            <li>
              <strong>Grouping.</strong> "Mains failure, building B" as one alarm, with the detail
              behind it, rather than forty separate fan and pump alarms.
            </li>
            <li>
              <strong>Priority precedence.</strong> High priority alarms are always shown first.
              Lower priority alarms that arrived during the burst are held, stored and shown
              afterwards, not lost.
            </li>
          </ul>
          <p>
            That last point matters. Suppressing or holding an alarm is fine. Losing it is not.
            Whatever the system does to calm a flood, every alarm should still end up in the log in
            the right time order.
          </p>
        </ConceptBlock>

        <Scenario
          title="Monday morning after a weekend power cut"
          situation="A school's supply was off for part of Sunday. When the caretaker opens up on Monday, the BMS head end has a long list of unacknowledged alarms: every AHU and pump failed, low space temperatures across the building, two outstations showing a comms fault, and a boiler lockout. The caretaker has started acknowledging them one at a time from the top of the screen, newest first."
          whatToDo="Stop and sort the list by time. The earliest entries show the mains failure and the outstations going offline. Most later alarms are consequences: plant that stopped when the power went. Check that plant has restarted and proved as the outstations came back. The boiler lockout is different: boilers that lock out often need a manual reset at the boiler after the cause is checked, so it will not clear on its own. Send the heating engineer there first, then work back through the comms faults at the two outstations."
          whyItMatters="Acknowledging alarms newest first, one by one, would have taken a long time and the boiler lockout, the one alarm that needed a person on the spot, would have sat in the middle of the list while the building stayed cold. Afterwards, raise the boiler lockout to high priority with out-of-hours routing, and ask the controls engineer to suppress consequential alarms after a mains failure."
        />

        <InlineCheck
          id="bms-6-1-nuisance"
          question="An AHU's low supply air temperature alarm fires every evening when the AHU switches off on its time programme. What is the right fix?"
          options={[
            'Make the alarm conditional on the AHU being commanded on and proven running',
            'Lower the alarm to information priority so nobody is disturbed',
            'Widen the low limit so it no longer triggers in the evening',
            'Ask the operator to acknowledge it each evening as part of their routine',
          ]}
          correctIndex={0}
          explanation="The alarm is only meaningful when the AHU is supposed to be delivering air. Tying it to the run command and proof keeps it working during the day and silent at night. Lowering priority or widening the limit weakens it while the plant is running, and a nightly acknowledgement trains people to click without reading."
        />

        <SectionRule />
        <ContentEyebrow>Acknowledge, reset, clear</ContentEyebrow>

        <ConceptBlock
          title="Three different actions that people treat as one"
          plainEnglish="Acknowledging says a person has seen it. Resetting puts tripped plant back into service. Clearing the cause fixes the fault. Only the last one actually solves anything."
          onSite="When you are called to an alarm, look at both the alarm state and the acknowledgement state on the head end. 'Acknowledged but still active' means someone saw it and the fault is still there."
        >
          <ul>
            <li>
              <strong>Acknowledge</strong> — an operator confirms they have seen the alarm. On a
              head end it usually stops the sound and changes the alarm from flashing to steady.
              Nothing happens to the plant. The acknowledgement and the user's name and time are
              logged.
            </li>
            <li>
              <strong>The alarm clearing</strong> — the condition behind it goes away. The
              temperature comes back inside its limit, the fan proves, the trip contact returns to
              healthy. Only then does the alarm drop out of the active list.
            </li>
            <li>
              <strong>Reset</strong> — the plant is put back into a state where it can run. A motor
              overload, a boiler lockout or a high-limit thermostat is often latched by design, so
              it stays tripped until someone resets it, frequently at the plant itself rather than
              from the BMS.
            </li>
            <li>
              <strong>Clearing the cause</strong> — finding and fixing why it happened. The blocked
              filter, the failed bearing, the seized valve, the loose terminal.
            </li>
          </ul>
          <p>
            A good head end makes the difference visible. It distinguishes between alarms that are
            still active and alarms that have not yet been acknowledged, because they are not the
            same thing. You can have an unacknowledged alarm whose cause has already cleared (a
            brief trip overnight), and an acknowledged alarm that is still very much live. Both need
            someone to look.
          </p>
          <p>
            Some systems also let suitably authorised operators inhibit or shelve an alarm, for
            instance while plant is under maintenance. That is a legitimate tool, but an inhibit
            removes protection. It should be recorded, time limited where the system allows, and
            checked off when the work is finished.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Resetting until it stays in"
          whatHappens="A pump trips on overload. The BMS alarm goes off, someone resets the overload, the pump runs for a while and trips again. After the third reset someone turns the overload setting up, the alarm stops, and a few weeks later the motor burns out with nothing left to stop it."
          doInstead="Treat a repeated trip as information. Before resetting, check the overload setting against the motor nameplate. With the motor isolated, locked off and proved dead, test its insulation resistance and turn the pump shaft by hand to check for a seized bearing or impeller. Then restore the supply, measure the running current on each phase, and look for an imbalance or a lost phase. Fix the cause, then reset. Never change a protective setting just to stop an alarm."
        />

        <InlineCheck
          id="bms-6-1-ack"
          question="The head end shows an alarm as 'acknowledged, active'. What does that tell you?"
          options={[
            'The fault has been fixed and the alarm is waiting to be deleted',
            'Somebody has seen the alarm, but the condition that caused it is still present',
            'The alarm has been inhibited and is no longer being monitored',
            'The plant has been reset and is waiting to be restarted',
          ]}
          correctIndex={1}
          explanation="Acknowledged means seen; active means the condition is still there. Nothing in that state says anyone has fixed, reset or inhibited anything. It is a fault someone knows about and has not yet resolved."
        />

        <SectionRule />
        <ContentEyebrow>Escalation and logging</ContentEyebrow>

        <ConceptBlock
          title="Escalation makes sure an alarm always lands on a person"
          plainEnglish="If the first person does not respond, the alarm goes to the next one, and the next, until somebody takes ownership."
          onSite="Ask to see the call list behind out-of-hours alarms. Names, numbers and rotas go out of date faster than anything else on a BMS. An escalation path to someone who left last year is no path at all."
        >
          <p>
            Escalation is a simple rule written into the alarm handling: if a high priority alarm
            has not been acknowledged within a set time, send it to the next person or service on
            the list. The time and the list are site decisions, agreed with the client, and they
            should be written down in the operating instructions so everyone knows how it works.
          </p>
          <p>A sound escalation set-up has a few properties:</p>
          <ul>
            <li>
              It covers out-of-hours as well as working hours, and changes over on a time programme.
            </li>
            <li>
              Acknowledgement stops the escalation, so one person taking ownership does not wake the
              whole list.
            </li>
            <li>
              The communication route is tested regularly, end to end. An email, a call-out service
              or an app notification that has quietly stopped working looks exactly like a quiet
              night. Legacy mobile modem links in older systems may stop working altogether as
              networks change, so check what an older site actually relies on.
            </li>
            <li>
              It only carries alarms that justify it. Escalating low priority alarms is a fast way
              to get the whole arrangement switched off.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="The alarm log is the system's memory"
          plainEnglish="Every alarm, every acknowledgement and every clear is recorded with a time stamp. That record is how you find patterns, prove response and improve the set-up."
          onSite="Before you start fault finding on a system you do not know, read the alarm history for that plant. It often tells you what happened, in what order, and how many times."
        >
          <p>
            Alarms and faults are logged when they happen, not on a fixed interval like a trend.
            Each record should carry the condition, the value at the time, the time and date, and
            the acknowledgement status, and it should be stored in a way that lets the alarms be
            analysed alongside other data, including trend logs (Section 6.2) and energy data.
          </p>
          <p>What a good site does with the log:</p>
          <ul>
            <li>
              <strong>Daily review.</strong> Someone looks through the previous day's critical
              alarms, not just the ones that are still on the screen.
            </li>
            <li>
              <strong>Repeat offenders.</strong> The alarms that appear most often are either a real
              recurring fault or a nuisance alarm. Either way, they are where improvement starts.
            </li>
            <li>
              <strong>Response times.</strong> How long between an alarm and its acknowledgement,
              and between acknowledgement and clear. These show whether the arrangements actually
              work.
            </li>
            <li>
              <strong>Periodic checks.</strong> As part of routine maintenance, check alarm
              priorities, messages and routing still make sense, review recently generated alarms,
              and where the BMS shows fire or security system alarms, check the routing of those
              messages with the people responsible for those systems.
            </li>
          </ul>
          <p>
            People need training in all of this too. Anyone who monitors plant through the BMS
            should know how to read the displays, how to acknowledge and cancel alarms properly, and
            what to do after each kind of alarm message. Training records should be kept, and the
            training repeated as staff change.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The electrician's part</ContentEyebrow>

        <ConceptBlock
          title="Proving alarms at commissioning, from the field device to the person"
          plainEnglish="An alarm is only proved when the real condition at the device produces the right message, at the right priority, in the right place."
          onSite="Agree with the controls engineer who is at the panel and who is at the head end before you start. A two-person alarm test with a radio or phone is quicker and catches more than one person walking back and forth."
        >
          <p>
            Much of what makes alarms reliable is set in software, but much of what makes them fail
            is physical. Your part is usually the field end:
          </p>
          <ul>
            <li>
              <strong>Wiring the input the right way round.</strong> For trip and fault inputs, the
              designer will normally choose a contact that is closed when healthy, so a broken wire
              or a lost supply shows as an alarm rather than as healthy. Check the points schedule
              and wire to it; do not swap normally open and normally closed to make a point read
              correctly on the day.
            </li>
            <li>
              <strong>Labelling.</strong> Cores and terminals marked to the point name, so the next
              person can trace an alarm from the screen to the device without guesswork.
            </li>
            <li>
              <strong>Creating the real condition.</strong> Trip the starter, open the volt-free
              contact at the plant, disconnect the sensor at its terminals, or switch off (open) the
              fan's local isolator while the BMS is calling for it to run (only where the isolator
              is rated to switch the motor on load; otherwise stop it at the starter). Forcing the
              point in software proves the software; it does not prove your wiring.
            </li>
            <li>
              <strong>Checking what arrives.</strong> Correct point name, correct message, correct
              priority, correct destination, correct escalation, and a correct entry in the log.
              Then put the condition back and check the alarm clears.
            </li>
            <li>
              <strong>Recording it.</strong> Sign each alarm off on the commissioning sheet. At
              handover, alarm generation, acknowledgement and logging should all have been shown
              working, and operators shown how to manage alarms.
            </li>
          </ul>
          <p>
            Fire alarm interface inputs are tested with the fire alarm engineer present and in line
            with the fire system's own procedures, because operating them can trigger real fire
            system actions. That is covered in Section 6.5.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can I just disable an alarm that keeps going off during my work?',
              answer:
                'Only through the site procedure, and only by someone authorised to do it. Inhibiting an alarm removes protection, so it should be recorded, limited to the work, and re-enabled and checked when you finish. If it keeps going off because of your work, tell the operator before you start rather than leaving them to find out.',
            },
            {
              question:
                'Why does the BMS show the fire alarm status if it is not allowed to act on it?',
              answer:
                'So the operator knows the building is in alarm, the event is logged with everything else, and the BMS can avoid doing anything unhelpful, such as trying to restart plant the fire system has stopped. The fire detection and alarm system and its own interfaces carry out the life-safety actions.',
            },
            {
              question:
                'Who decides alarm limits and priorities, the electrician or the controls engineer?',
              answer:
                'The design and the client set them, and the controls engineer configures them. Your input is valuable, though: you see the plant and the wiring, and you are often first to notice an alarm that does not match what is actually installed. Raise it, do not quietly change it.',
            },
            {
              question: 'Is an alarm that clears itself safe to ignore?',
              answer:
                'No. A trip that comes and goes overnight is often the early sign of a fault that will one day stay. Look at the alarm history and the trend for that point. If it really is meaningless, fix the configuration so it stops; if it is not, you have found a fault before it became a breakdown.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'An alarm exists to make a person act. If nobody needs to act, make it an event or a trend.',
            'Set priority from consequence and time to act, and keep the high priority list short enough to be trusted.',
            'Chattering, start-up, plant-off and standing alarms are configuration faults. Hysteresis, delays, conditions and masking fix them.',
            'In a flood, sort by time and find the first alarm. Suppress consequences, but never lose an alarm from the log.',
            'Acknowledge, reset and clearing the cause are three different actions. Never change a protective setting to silence an alarm.',
            'Escalation needs a current call list and a route tested end to end. The BMS monitors the fire alarm; it never acts for it.',
            'Prove every alarm from the real condition at the field device through to the person who receives it.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6"
          prevLabel="Module 6"
          nextHref="/study-centre/upskilling/bms-module-6-section-2"
          nextLabel="Trend logging"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section1;
