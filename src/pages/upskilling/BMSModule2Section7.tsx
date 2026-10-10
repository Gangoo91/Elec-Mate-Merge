/**
 * BMS Module 2 · Section 7 — Motor control and the plant interface
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. A new page with no predecessor: it covers the
 * line on the drawing where the BMS outstation meets the starter or motor control panel. It
 * teaches what Hand/Off/Auto actually hands over, how a direct-on-line or star-delta starter and
 * an inverter look from the BMS side, the run, trip and auto-status points that come back,
 * enable versus speed reference on a variable speed drive, why an interposing relay always sits
 * between an outstation output and a contactor, and why fire and safety stops are wired upstream
 * of the BMS so that they work whatever the software is doing. No figures are given that are not
 * in the grounded facts or the source extracts.
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

const TITLE = 'Motor control and the plant interface | BMS Module 2.7 | Elec-Mate';
const DESCRIPTION =
  'Where the BMS meets the starter panel: Hand/Off/Auto, run, trip and auto-status points, enable and speed reference to a drive, interposing relays and fire stops.';

const outcomes = [
  'Explain what each position of a Hand/Off/Auto switch does, and what the BMS is and is not in charge of in Auto',
  'Describe a direct-on-line starter, a star-delta starter and a variable speed drive as the BMS sees them',
  'Choose suitable run, trip and auto-status points, and say what each one actually proves',
  'Wire an enable and a speed reference to a drive and predict what the motor does with each combination',
  'Explain why an outstation output drives an interposing relay rather than a contactor coil',
  'Show where fire and safety stops sit in a starter control circuit so they work in Hand, in Auto and with the BMS dead',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A supply fan selector is turned from Auto to Hand. What has changed in the starter control circuit?',
    options: [
      'The BMS now runs the fan at a fixed speed set on the head end',
      'Nothing, as Hand only changes what the panel lamp shows',
      'The BMS command contact is bypassed and the fan runs from the panel',
      'The overload is bypassed so the fan can be tested at full load',
    ],
    correctIndex: 2,
    explanation:
      'In Hand the selector feeds the contactor coil directly, so the BMS command contact is no longer in the path. The overload and any hard-wired safeties should still be in series. Hand is not a BMS mode at all, which is why the head end may still show the fan as commanded off.',
  },
  {
    id: 2,
    question:
      'The BMS shows a pump commanded on, but its run status has stayed off for longer than the proving delay. What is the most useful thing the BMS can do?',
    options: [
      'Raise a fail-to-start alarm and bring on the standby',
      'Keep the command on and wait, because status points are often slow',
      'Turn the command off and on repeatedly until the status appears',
      'Ignore it, because the trip input has not changed state',
    ],
    correctIndex: 0,
    explanation:
      'A command with no matching status is the classic discrepancy alarm. It catches faults the trip input never sees: a blown control fuse, a selector left in Off, a broken interposing relay. Cycling the command repeatedly can damage plant, and waiting forever hides the fault.',
  },
  {
    id: 3,
    question:
      'A two-speed supply fan is controlled from the BMS through its starter. How many run outputs does the points schedule normally show for it?',
    options: [
      'One run output, with speed chosen at the starter',
      'Two run outputs, one for each of the two speeds',
      'One run output and one 0–10 V speed reference',
      'Two run outputs, one for start and one for stop',
    ],
    correctIndex: 1,
    explanation:
      'A two-speed fan gets two run outputs, one per speed, each switching its own contactor. A 0–10 V speed reference belongs to a variable speed drive. Separate start and stop outputs suit only a panel designed for pulsed control. Choosing speed at the starter would take the decision away from the BMS.',
  },
  {
    id: 4,
    question:
      'An AHU is fitted with EC fans that carry their own motor protection, fed from a distribution board. Where does the BMS run command now usually land?',
    options: [
      'On control terminals in the fan itself',
      'On a contactor in a motor control centre',
      'On the distribution board’s main switch',
      'Nowhere, as EC fans control themselves',
    ],
    correctIndex: 0,
    explanation:
      'EC fans carry their own motor protection, so the MCC contactor and overload are often replaced by a distribution board for power. The run command and fault signal land on terminals in the fan itself. The interface moves rather than disappears, and the BMS still decides when the fan runs.',
  },
  {
    id: 5,
    question:
      'Why does a BMS digital output normally drive an interposing relay rather than the contactor coil?',
    options: [
      'Because BMS outputs can only switch direct current',
      'Because the relay makes the BMS output fail safe on its own',
      'Because the output is not rated to switch the coil circuit',
      'Because the contactor coil would pick up interference from the outstation',
    ],
    correctIndex: 2,
    explanation:
      'Outstation outputs are small switching devices, often at a different voltage from the coil. The interposing relay matches the two, separates the extra-low voltage BMS wiring from the mains coil circuit, and is a cheap plug-in part to replace when it wears. It does not make anything fail safe by itself.',
  },
  {
    id: 6,
    question:
      'A fire alarm has shut down an air handling unit, and the fire signal then clears. How should the restart of the plant be decided?',
    options: [
      'By the BMS installer, setting an automatic restart',
      'By the cause and effect agreed for the fire alarm',
      'Automatically, as soon as the fire contact remakes',
      'By the BMS, restarting at the next time programme slot',
    ],
    correctIndex: 1,
    explanation:
      'The plant should not leap back into life when the fire signal clears unless the fire strategy says so. Whether restart is a manual reset at the panel or a controlled restart is part of the cause and effect agreed with the fire alarm engineer. It is not decided on site by the BMS installer or left to the BMS time programme.',
  },
  {
    id: 7,
    question:
      'A fan has been left in Hand after maintenance. Which BMS point lets the operator see that straight away?',
    options: [
      'The trip input',
      'The speed reference',
      'The command output',
      'The auto-status input',
    ],
    correctIndex: 3,
    explanation:
      'An auto-status point is a contact on the selector that is made only in Auto. When it drops, the BMS knows the plant has been taken out of its hands and can alarm. Trip and run status do not change just because the selector moved to Hand, and the command output only shows what the BMS is asking for.',
  },
  {
    id: 8,
    question:
      'A star-delta starter replaces a direct-on-line starter on a pump. What changes on the BMS side?',
    options: [
      'The BMS needs two outputs, one for star and one for delta',
      'Nothing, as the starter times its own changeover',
      'The BMS must time the star-delta changeover in software',
      'The run status must now come from a current switch',
    ],
    correctIndex: 1,
    explanation:
      'The changeover from star to delta is done inside the starter with its own timer and contactors. The BMS still gives one run command and reads back run and trip. Timing a motor starting sequence in BMS software would make starting depend on the outstation, which is the wrong place for it.',
  },
  {
    id: 9,
    question:
      'You are asked to isolate a BMS control panel. What should you expect because of the interposing relays?',
    options: [
      'Nothing, as the panel isolator makes it all dead',
      'Relay contacts may be fed from another panel',
      'Only the extra-low voltage terminals stay live',
      'The relays hold their last state and restart plant',
    ],
    correctIndex: 1,
    explanation:
      'An interposing relay often switches a coil supply from the starter or MCC, not from the BMS panel, so switching off (opening) the BMS panel isolator can leave its contacts live. Read the drawings, find every supply entering the enclosure, and prove dead at the terminals you will touch.',
  },
  {
    id: 10,
    question: 'During commissioning, what should be proved before the plant is switched to Auto?',
    options: [
      'That the plant runs and stops correctly in Hand and Off',
      'That every speed reference reads 10 V',
      'That the fire alarm can be reset from the BMS head end',
      'That the BMS can start the plant with the selector in Off',
    ],
    correctIndex: 0,
    explanation:
      'Proving Hand and Off first shows the starter, the motor and the safeties work on their own. Only then does switching to Auto test the BMS side. Nothing should be able to start the plant from Off, and resetting the fire alarm is a job for the fire system, not the BMS.',
  },
];

const BMSModule2Section7 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 7"
        title="Motor control and the plant interface"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers the few terminals where the BMS stops and the starter panel starts:
          what crosses that line, what comes back, and what must never depend on it. On site, most
          plant faults and most arguments between contractors start at those terminals.
        </p>

        <TLDR
          points={[
            'In Auto, the BMS gets one job: closing or opening a run command. The starter, the overload and the safeties stay in charge of whether the motor can actually run.',
            'The BMS needs to see three things back: is it running, has it tripped, and is it in Auto. Each needs its own point, and each proves something different.',
            'A drive takes two separate signals: an enable that says run, and a speed reference (often 0–10 V) that says how fast. Stop comes from the enable.',
            'An outstation output never switches a motor, and on mains-voltage starters it does not switch the contactor coil either. It drives an interposing relay, and the relay contact does the work.',
            'Fire and safety stops break the starter control circuit upstream of the Hand/Off/Auto selector, so they work in Hand, in Auto and with the BMS switched off. The BMS only watches.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The line on the drawing</ContentEyebrow>

        <ConceptBlock
          title="Where the BMS ends and the motor panel begins"
          plainEnglish="The BMS decides when a fan or pump should run. The starter panel decides whether it can, and does the heavy switching. They meet at a handful of terminals."
          onSite="On any job with plant, find the interface terminals in the panel first and match them to the points schedule. Most arguments between the electrical and controls contractors start at those terminals."
        >
          <p>
            Fans, pumps and compressors are fed from a starter of some kind: a contactor and
            overload in a motor control centre (MCC), a starter built into a combined control panel,
            or an inverter drive. That equipment carries the motor current, protects the motor and
            the cable, and gives somebody a way to stop it at the panel. The BMS outstation does
            none of that. It sits at extra-low voltage, reads sensors and switches small contacts.
          </p>
          <p>
            Between the two is a short list of signals. A typical points schedule for an air
            handling unit shows it clearly: a fan run output from the outstation to the MCC, a fan
            tripped input coming back from the MCC, and sometimes an access door interlock input
            from contacts on the unit. Two-speed fans get two run outputs, one per speed. Every one
            of those lines on the schedule names the panel it lands in, because that is where you
            will be terminating it.
          </p>
          <p>
            Newer plant is changing the shape of the panel. Electronically commutated (EC) fans and
            pumps carry their own motor protection, so the big MCC with a contactor and overload per
            motor is often replaced by a distribution board for power and a smaller controls
            enclosure for the BMS. The interface does not go away; it moves. The run command and the
            fault signal now land on terminals in the fan or pump itself, and the questions on this
            page apply in exactly the same way.
          </p>
          <p>
            Whoever builds which side, the interface only works if both sides agree on it. One
            terminal rail, numbered on both drawings; every terminal labelled with the point
            reference from the schedule; and one drawing that shows the whole coil circuit from
            control supply to neutral, BMS contact included. When those three exist, a fault at the
            interface takes minutes to find. When they do not, two contractors spend a morning
            pointing at each other&rsquo;s wiring.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Hand, Off and Auto</ContentEyebrow>

        <ConceptBlock
          title="What the selector does, position by position"
          plainEnglish="Hand runs the motor from the panel whatever the BMS thinks. Off stops it whatever the BMS thinks. Auto lets the BMS decide, but only the run decision."
          onSite="Before you touch a plant fault, look at the selector. A fan that 'will not start from the BMS' is very often sitting in Off, and one that 'will not stop' is very often in Hand."
        >
          <p>
            Most starters for building services plant have a three-position selector on the panel
            door. Each position changes where the coil of the contactor gets its supply from:
          </p>
          <ul>
            <li>
              <strong>Hand:</strong> the selector feeds the contactor coil directly. The motor runs
              for as long as the switch is in Hand, and the BMS command contact is simply not in the
              circuit. Used for testing, commissioning and keeping plant going when the BMS is down.
            </li>
            <li>
              <strong>Off:</strong> the coil supply is broken. Nothing the BMS does can start the
              motor. This is the position for a planned stop at the panel, though it is not
              isolation and never a substitute for it.
            </li>
            <li>
              <strong>Auto:</strong> the coil supply passes through the BMS command contact (via an
              interposing relay, covered below). The BMS opens and closes that contact according to
              its time programme and control strategy.
            </li>
          </ul>
          <p>
            The point to hold on to is how little Auto hands over. The BMS gets one permissive in
            series with everything else. It does not take over the overload, the stop button, the
            fire stop or any safety interlock. Those stay in the circuit whatever the selector says,
            and the BMS cannot close a path they have opened. A good panel is drawn so that you can
            point at the coil and trace every contact in series with it; the BMS contact is only one
            of them, and only in the Auto leg.
          </p>
          <p>
            Hand is the position that causes trouble. In Hand the BMS has no control at all: the
            time programme, the frost strategy, the fan proving logic and any load shedding are all
            bypassed. Plant left in Hand after a service runs all night, and the head end may still
            show it as commanded off. That is why the BMS needs to know the selector position, which
            comes in the next section.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-7-hand"
          question="An engineer leaves a heating pump in Hand after a repair. The BMS time programme switches the pump off at 18:00. What happens?"
          options={[
            'The pump stops at 18:00, because the BMS overrides the selector',
            'The pump keeps running, because Hand bypasses the BMS',
            'The pump stops, because Hand times out when the programme changes',
            'The pump trips on overload, because two commands are fighting',
          ]}
          correctIndex={1}
          explanation="In Hand the coil is fed straight from the selector, so the BMS output can open and close as much as it likes with no effect. The pump runs until someone turns the switch. This is the commonest reason for plant running out of hours."
        />

        <Pullquote>
          Auto hands the BMS one contact in a series chain. Everything else in that chain (overload,
          stop button, fire stop, safety interlocks) stays in charge.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Starters as the BMS sees them</ContentEyebrow>

        <ConceptBlock
          title="Direct-on-line, star-delta and inverter: one command in, a few contacts out"
          plainEnglish="However the motor is started, the BMS sees much the same thing: a contact to close for run, and contacts that tell it what happened."
          onSite="Ask for the starter wiring diagram, not just the BMS drawing. You need to see where the BMS contact lands in the coil circuit before you can say the interface is right."
        >
          <p>
            A <strong>direct-on-line (DOL) starter</strong> is a contactor and an overload relay.
            The contactor closes its main contacts to put the motor straight across the supply; the
            overload watches the motor current and, if the motor is working too hard for too long,
            opens a contact in the coil circuit and drops the contactor out. Started from
            pushbuttons, an auxiliary contact on the contactor is wired across the start button so
            the coil holds itself in once released: the seal-in or latching contact. A normally
            closed stop button breaks that hold.
          </p>
          <p>
            With a BMS in charge, the latching is usually not needed in Auto: the BMS command
            contact is a maintained contact, closed for as long as the plant should run. Open it and
            the contactor drops out. That is also why the BMS output must hold its state rather than
            pulse, unless the panel has been designed for pulsed start and stop.
          </p>
          <p>
            A <strong>star-delta starter</strong> starts the motor with its windings in star to
            reduce the starting current, then changes them over to delta to run. That takes extra
            contactors and a timer, all inside the starter. From the BMS side it looks exactly like
            a DOL starter: one run command in, run and trip back. The changeover belongs in the
            starter, where it works the same in Hand and Auto. Never let a strategy try to time a
            motor start in software.
          </p>
          <p>
            An <strong>inverter</strong> (variable speed drive) is different enough to get its own
            section below, because it takes a speed as well as a run command. And on an MCC where
            each starter carries a networked motor management module, the run and stop commands may
            arrive over a network rather than individual wires, but the physical stops and safeties
            should still be hard-wired.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>What comes back</ContentEyebrow>

        <ConceptBlock
          title="Run, trip and auto status: three questions, three points"
          plainEnglish="A command is only what the BMS asked for. The status points are how it finds out what actually happened."
          onSite="When you wire a status point, ask what would make it lie. A contact that reports 'running' when the belt has come off is not proving very much."
        >
          <p>
            Section 2.1 drew the line between a command and a status. At the plant interface that
            difference matters every day, because the BMS will act on what the status points tell
            it. Three are standard for a starter:
          </p>
          <ul>
            <li>
              <strong>Run status:</strong> is the plant actually running? This is what lets the BMS
              spot a fail-to-start, change over to a standby pump, and log run hours.
            </li>
            <li>
              <strong>Trip (or fault) status:</strong> has the overload, the drive or another
              protective device tripped? A trip usually needs a person to reset it at the panel, so
              this is an alarm that sends someone to site.
            </li>
            <li>
              <strong>Auto status:</strong> is the selector in Auto? Taken from a contact on the
              selector itself. When it drops, the BMS knows it is no longer in control and can raise
              a Hand-or-Off alarm instead of chasing a fault that is not there.
            </li>
          </ul>
          <p>
            Run status can come from several places, and each proves something different. An
            auxiliary contact on the contactor proves the contactor pulled in, nothing more. A
            current switch on one of the motor conductors proves the motor is drawing current. A
            differential pressure switch across a fan, or a flow switch in a pipe, proves the air or
            water is actually moving. A snapped fan belt fools the contactor auxiliary every time. A
            current switch catches it only if its trip point has been set above the motor&rsquo;s
            no-load current; left at a low setting it reads &lsquo;running&rsquo; as long as the
            motor turns. The pressure or flow switch proves the air or water itself. Which one is
            right depends on what the strategy needs to be sure of, and a frost strategy or a heater
            that must not run without airflow needs the third kind.
          </p>
          <p>
            The useful logic is the <strong>discrepancy</strong>: commanded on but no run status
            after a proving delay, or running with no command. Either is worth an alarm. It catches
            faults the trip contact never sees: a blown control circuit fuse, a selector in Off, a
            failed interposing relay, a broken wire. Think too about which way round each contact
            works. A trip input that opens on fault will also show a fault if its wire is cut, which
            is usually the safer way to fail.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-7-status"
          question="A fan's run status comes from a contactor auxiliary contact. The belt snaps. What does the BMS see?"
          options={[
            'A trip alarm from the overload',
            'A fail-to-start discrepancy alarm',
            'The auto-status point dropping out',
            'The fan still showing as running',
          ]}
          correctIndex={3}
          explanation="The contactor is still pulled in, so the auxiliary contact still says running. With the belt off the motor may draw less current, not more, so the overload is unlikely to trip. Only a proof of airflow, such as a differential pressure switch across the fan, would catch it."
        />

        <CommonMistake
          title="Treating a contactor auxiliary contact as proof the fan is working"
          whatHappens="An air handling unit has an electric heater battery interlocked in the BMS strategy to 'fan running'. Run status is a spare auxiliary on the fan contactor. The belt fails, the contactor stays in, the BMS still sees the fan running, and the heater keeps firing into still air until its high-limit thermostat trips."
          doInstead="Match the status source to what the strategy needs to prove. Where the question is 'is air moving?', use a differential pressure or airflow switch across the fan, and keep the heater's own airflow and high-limit safeties hard-wired in its contactor circuit, not only in software."
        />

        <SectionRule />
        <ContentEyebrow>Variable speed drives</ContentEyebrow>

        <ConceptBlock
          title="Enable says run, the speed reference says how fast"
          plainEnglish="A drive needs two separate things from the BMS: permission to run, and a number for how fast. Getting them muddled is the commonest drive interface fault."
          onSite="When a drive 'will not stop', check the enable before anything else. Turning the speed reference to zero usually just sends it to minimum speed."
        >
          <p>
            An inverter controls motor speed by varying the frequency of the supply it feeds the
            motor. The drive is fed from its own supply and carries its own motor protection. The
            BMS talks to it through its control terminals, and there are normally two signals:
          </p>
          <ul>
            <li>
              <strong>Enable (run command):</strong> a volt-free contact from the BMS, through an
              interposing relay, onto the drive&rsquo;s run input. Closed means run; open means
              stop. This is a digital output.
            </li>
            <li>
              <strong>Speed reference:</strong> an analogue output from the BMS, most often 0–10 V,
              onto the drive&rsquo;s analogue input. In the simplest set-up 0 V asks for zero speed
              and 10 V for full speed. In practice the drive&rsquo;s own parameters set what each
              end of the scale means, and most building services drives are set with a minimum
              speed.
            </li>
          </ul>
          <p>
            Keep the two jobs apart in your head. The enable is the start and stop. The reference
            only matters while the drive is enabled. A drive enabled with the reference at 0 V will
            usually run at its minimum speed, not stop. So a strategy that tries to stop a fan by
            winding the speed down to zero is wrong, and so is a site test that does the same.
          </p>
          <p>
            Coming back from the drive, you want at least a run status and a fault status, usually
            from the drive&rsquo;s own relay outputs. Many drives also offer a network connection
            (Modbus over RS-485 is common), which can carry the run command, the speed and a great
            deal more: the actual speed, current, and the fault code that tells you why it tripped.
            That is far more information over far fewer wires. It also means a comms failure can
            stop the plant, so the drive needs a defined behaviour on loss of comms, and safety
            stops still go to hard-wired terminals.
          </p>
          <p>
            Two drive features you will meet on HVAC jobs. Many drives have a{' '}
            <strong>Safe Torque Off (STO)</strong> input, a hard-wired safety input that stops the
            drive producing torque. Where the design uses it for an emergency or fire stop, it is
            wired and tested as a safety circuit, not as a BMS point. Many HVAC drives also have a{' '}
            <strong>fire mode</strong>, set in the drive&rsquo;s parameters, which keeps a
            smoke-control fan running on fire and can ignore the drive&rsquo;s own trips. Whether
            either is used is a fire-strategy decision. Never enable fire mode on a fan the strategy
            expects to stop, and remember that STO is not isolation: the drive is still live.
          </p>
          <p>
            The drive&rsquo;s own keypad is a Hand position of its own. Most drives can be switched
            to local (keypad) control, which ignores the BMS enable. Where a fire stop is wired
            through the BMS enable or the drive&rsquo;s run input, local mode can get round it. The
            fire stop has to be wired so that no keypad or local setting can bypass it, and that is
            checked at the fire test with the drive in local as well as remote.
          </p>
          <p>
            The speed reference is a signal cable like any other from Section 2.6: screened, kept
            apart from the drive output cable, and terminated exactly as the drive manufacturer
            shows. Drive output cables are a well-known source of electrical noise, and an
            unscreened 0–10 V reference run alongside one is asking for a hunting fan.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsVsd}
          topic="Watch · what a variable speed drive does to the motor supply"
          caption="Watch for the run command and the speed command arriving as separate signals. That split is the enable and speed reference wiring on this page."
        />

        <InlineCheck
          id="bms-2-7-vsd"
          question="A BMS strategy stops an extract fan out of hours by setting its 0–10 V speed reference to 0 V and leaving the enable closed. What is wrong with that?"
          options={[
            'Nothing, as 0 V always means stop on a drive',
            'The drive will trip on an undervoltage fault at 0 V',
            'The drive will most likely keep the fan at its minimum speed',
            'The reference must be 4 mA, not 0 V, to stop a drive',
          ]}
          correctIndex={2}
          explanation="With the enable closed the drive is told to run, and 0 V on the reference usually maps to the minimum speed in the drive's parameters. The fan keeps turning all night. The strategy should open the enable to stop the fan."
        />

        <SectionRule />
        <ContentEyebrow>Interposing relays</ContentEyebrow>

        <ConceptBlock
          title="Why the outstation output never switches the motor"
          plainEnglish="The BMS output is a small, delicate switch. An interposing relay lets it control something bigger, at a different voltage, from a separate circuit."
          onSite="Interposing relays are usually plug-in parts with an indicator. When a starter will not respond in Auto, the relay LED tells you in seconds whether the BMS is asking, and whether the fault is upstream or downstream of the relay."
        >
          <p>
            An interposing relay does no logic. It sits between two devices that cannot be connected
            directly and lets one drive the other. At the plant interface the mismatch is nearly
            always on the output side: the outstation&rsquo;s digital output is a small relay or
            transistor, often at extra-low voltage, and the thing it needs to control is a contactor
            coil at mains voltage or a drive input with its own internal supply.
          </p>
          <p>Using a relay in between does several jobs at once:</p>
          <ul>
            <li>
              <strong>Rating:</strong> the outstation output only has to energise a small relay
              coil. The relay contact, rated for the job, switches the contactor coil.
            </li>
            <li>
              <strong>Separation:</strong> the outstation&rsquo;s extra-low voltage wiring stays on
              one side of the relay and the coil circuit on the other. That makes segregation of the
              circuits (Regulation 528.1, Section 2.6) straightforward to achieve in the panel.
            </li>
            <li>
              <strong>A cheap part to fail:</strong> relays wear. Changing a plug-in relay is
              quicker and cheaper than replacing an outstation output card.
            </li>
            <li>
              <strong>A clear test point:</strong> the relay sits on the line between the BMS
              contractor&rsquo;s work and the electrical contractor&rsquo;s. Its LED and terminals
              let either of them prove which side the fault is on.
            </li>
          </ul>
          <p>
            If the relay coil runs on DC from a transistor output, it needs a suppression diode
            across it unless one is built in. When the coil de-energises, its collapsing magnetic
            field can generate a voltage spike of hundreds of volts, which will destroy the
            transistor that was switching it. The diode is fitted the opposite way to the supply so
            it only conducts on that spike. Many plug-in relay bases have it already; check before
            adding another.
          </p>
          <p>
            Interposing relays also carry a safe-isolation trap, met first in Section 1.6. The coil
            is fed from the BMS panel, but the contact is usually switching a circuit fed from the
            starter or the MCC. Switch off (open) the BMS panel isolator and those contacts can
            still be live from elsewhere. Read the drawing, find every supply that enters the
            enclosure, and prove dead at the terminals you will touch.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsRelays}
          topic="Watch · how a relay lets a small signal switch a bigger load"
          caption="Watch for the coil and contact being separate circuits. That separation is the whole reason the BMS output drives a relay rather than the contactor."
        />

        <RegsCallout
          source="BS 7671 Section 557"
          clause="Section 557 applies to auxiliary circuits: control, signalling and measurement. The supply for an auxiliary circuit may be dependent on the main circuit or independent of it, according to the function the auxiliary circuit has to perform."
          meaning={
            <>
              <p>
                A starter control circuit and the BMS command that feeds it are auxiliary circuits.
                (Inside a panel built to BS EN 61439, that standard covers the wiring rather than
                Section 557.) The supply decision matters here: a coil circuit fed from the
                starter&rsquo;s own supply dies with the motor feed, while one fed from a separate
                control supply does not.
              </p>
              <p>
                Neither is wrong, but the designer should have chosen on purpose, and you need to
                know which you are looking at before you isolate anything.
              </p>
            </>
          }
          cite="Wording checked against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <CommonMistake
          title="Wiring an outstation output straight to a contactor coil"
          whatHappens="To save a relay, an outstation digital output is wired directly into a 230 V contactor coil circuit. The output contacts are not rated for the coil, mains now sits on the outstation terminal block next to sensor wiring, and when the output eventually welds or burns out the fan either runs for ever or never runs, with an output card to replace."
          doInstead="Drive an interposing relay from the output and switch the coil with the relay contact. Keep the extra-low voltage and mains circuits on opposite sides of the relay, label the relay with the point reference from the schedule, and check whether the relay base needs coil suppression."
        />

        <InlineCheck
          id="bms-2-7-relay"
          question="A fan will not start in Auto. The interposing relay LED is lit, but the contactor has not pulled in. Where is the fault most likely to be?"
          options={[
            'In the BMS strategy, which has not commanded the fan',
            'In the outstation output card, which has failed open',
            'In the speed reference wiring to the fan',
            'Downstream of the relay, on the switched side',
          ]}
          correctIndex={3}
          explanation="A lit LED shows the BMS is asking and the relay coil is energised, so the BMS side is doing its job. The fault is on the switched side: a worn relay contact, the selector not in Auto, a tripped overload, an open safety contact or a blown control fuse. The relay has just halved the search."
        />

        <SectionRule />
        <ContentEyebrow>Safety and fire stops</ContentEyebrow>

        <ConceptBlock
          title="Upstream of the BMS, so they work whatever the BMS does"
          plainEnglish="Anything that stops a motor for safety must break the starter circuit itself. The BMS is told about it; it is never the thing doing the stopping."
          onSite="Test the fire stop with the selector in Hand. If the fan keeps running, the fire contact is on the wrong side of the selector, or only goes to the BMS."
        >
          <p>
            Some stops cannot depend on software. A fire alarm that must shut down an air handling
            unit, an emergency stop, a door interlock on an access panel, a high-limit thermostat on
            a heater battery: each of those has to work when the outstation is powered down,
            crashed, being reprogrammed or has had an output forced by someone on the head end. The
            only way to guarantee that is to wire the stop into the starter control circuit itself.
          </p>
          <p>
            Position matters as much as wiring. The safety contacts should sit in series in the coil
            circuit <strong>upstream of the Hand/Off/Auto selector</strong>, so that they break the
            supply to both the Hand leg and the Auto leg. A fire contact wired only in series with
            the BMS command works in Auto and does nothing in Hand. That is the principle of fire
            priority: a fire signal has to win over every manual and automatic command, and no Hand
            switch, drive keypad or override may run a fan the fire strategy has stopped. The plant
            then does what the fire strategy requires. Most air handling units and fans stop, but
            smoke control fans run, so never assume every fan stops on fire.
          </p>
          <p>
            In UK practice, the fire actions (plant shutdown on fire, door release, smoke control)
            are driven by the fire detection and alarm system through its own interface relays, not
            by the BMS. The BMS typically takes a separate contact so it can <em>monitor</em> the
            fire state: log it, show it on the graphics, stop chasing fail-to-start alarms on plant
            that has been shut down deliberately, and carry out follow-up actions that are not about
            life safety. There should be a clear technical break between the two systems, so that
            nothing done on the BMS can interfere with the fire system.
          </p>
          <p>
            When the fire signal clears, the plant should not leap back into life on its own unless
            the fire strategy says so. How the restart is handled (a manual reset at the panel, or a
            controlled restart) is part of the cause and effect, and is agreed with the fire alarm
            engineer, not decided on site by the BMS installer. Section 6.5 (Fire alarm and life
            safety interfaces) covers the fire interface in more detail.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-7-fire"
          question="On a fire alarm test, every AHU in Auto stops but one supply fan in Hand keeps running. What is the most likely wiring fault?"
          options={[
            'The fire contact is in the Auto leg only, downstream of the selector',
            'The BMS has not been programmed to stop that fan on fire',
            'The fan overload is wired in parallel with the fire contact',
            'The fan run status is taken from a contactor auxiliary',
          ]}
          correctIndex={0}
          explanation="If the fire contact sits only in the Auto leg, Hand bypasses it. It should break the coil supply upstream of the selector so both legs lose it. Programming the BMS to stop the fan is not the answer, because the BMS must not be the life-safety path."
        />

        <Scenario
          title="A fan that would not stop for the fire alarm"
          situation="At the quarterly fire alarm test in an office block, the fire engineer notices that the kitchen extract fan keeps running after the alarm has operated. The BMS head end shows a fire alarm input as active and the fan as commanded off. At the MCC, the extract starter selector is in Hand, left there by a maintenance engineer two weeks earlier."
          whatToDo="Do not fix it in the software. Trace the coil circuit on the starter drawing and on site. Here the fire alarm interface relay contact had been wired into a BMS digital input, and the BMS had been programmed to drop its run command on fire, so the shutdown only worked in Auto. Report it in writing, the same day, to the designer and the person responsible for the fire alarm system: it is a life-safety defect. Once they agree the change, wire the fire interface contact in series in the coil circuit upstream of the selector, keep a separate contact into the BMS for monitoring, and retest in Hand, Off and Auto with the fire alarm engineer witnessing and the cause and effect updated. Add an auto-status point and a Hand-or-Off alarm while you are there."
          whyItMatters="The fire strategy relied on software and on the selector being in Auto, and nobody knew until a test. Wired upstream of the selector, the stop works whatever the BMS or the selector is doing, which is the only way a life-safety action should work."
        />

        <SectionRule />
        <ContentEyebrow>Proving it</ContentEyebrow>

        <ConceptBlock
          title="Prove the panel on its own, then hand it to the BMS"
          plainEnglish="Test the plant from the panel first. If it does not work in Hand, the BMS cannot fix it in Auto."
          onSite="Write down the selector position you found each starter in before you start, and put every one back to Auto, or tell someone in writing why you did not."
        >
          <p>
            The order of testing follows the order of control. A panel should be function-tested
            before it is accepted on site: lamps, wiring interlocks, signals out of the panel, the
            fuse or breaker and overload settings and their labels, the starter energising and
            providing power at its outgoing terminals, and the starter dropping out with its trip
            indication lit when the overload is tripped. Every electromechanical interlock and
            fail-safe device should be checked to show it does what the specification says.
          </p>
          <p>
            Then the Hand and Off functions are demonstrated and proved, and only then is the
            selector put to Auto for BMS commissioning. That sequence tells you, at each step, which
            side of the interface a fault is on. With the plant in Auto, each point is checked end
            to end:
          </p>
          <ul>
            <li>Command the plant on from the head end. Does the right starter pull in?</li>
            <li>Does run status follow, within the proving delay?</li>
            <li>Trip the overload or the drive. Does the trip alarm arrive, on the right point?</li>
            <li>Turn the selector to Hand and to Off. Does auto status drop and alarm?</li>
            <li>
              For a drive, step the speed reference and watch the actual speed follow; then open the
              enable and confirm it stops.
            </li>
            <li>
              Operate each safety and fire stop in Hand and in Auto, and once with the outstation
              powered down.
            </li>
          </ul>
          <p>
            Record what you set and what you found. The point-to-point and functional testing that
            formally signs a BMS off is covered in Section 7.5 (Commissioning); this is the part
            that sits squarely on the electrician&rsquo;s side of the line.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsStarDelta}
          topic="Watch · a star-delta starter"
          caption="This is one of the starters the BMS hands its run command to. Watch the sequence of contactors and the timer, and notice that none of it is the BMS: the BMS only closes the run contact and watches for run and trip."
        />

        <VideoCard
          {...videos.bmsContactors}
          topic="Watch · what the contactor is doing"
          caption="The contactor is what actually switches the motor. The BMS output drives an interposing relay, and that relay switches the contactor coil, never the motor itself."
        />

        <FAQ
          items={[
            {
              question: 'Should the Hand position bypass the BMS safety interlocks too?',
              answer:
                'It should bypass the BMS, because that is its purpose: keeping plant running when the BMS is down. It must not bypass hard-wired safeties. If a safety only exists in BMS software, Hand will bypass it, which is a strong reason to make the important ones hard-wired in the coil circuit upstream of the selector.',
            },
            {
              question:
                'Can I take run status from the drive rather than fitting a pressure switch?',
              answer:
                "A drive's run relay tells you the drive is running the motor, which is better than a contactor auxiliary but still says nothing about the air or water. If the strategy only needs to know the drive is running, it is fine. If something depends on airflow or water flow, such as a heater battery or frost protection, prove the flow itself.",
            },
            {
              question: 'Who wires the interface: the electrician or the controls contractor?',
              answer:
                'It varies by job, which is exactly why the interface terminals and the points schedule need agreeing early. Commonly the electrical contractor builds or installs the starter panel and the controls contractor provides the outstation and its relays, with a defined terminal rail between them. Whatever the split, one drawing should show the whole coil circuit.',
            },
            {
              question: 'Is turning the selector to Off a safe way to work on the motor?',
              answer:
                'No. Off only breaks the coil circuit, so the contactor drops out, but the main contacts, the motor terminals and the control circuit may all still be live. Before working on the motor or the starter, isolate at the proper point, lock it off and prove dead, as you would on any other circuit.',
            },
            {
              question: 'If the drive is on Modbus, do I still need hard-wired terminals?',
              answer:
                'For safety stops, yes. The network can carry the run command, speed and diagnostics, but an emergency stop or fire stop should go to hard-wired terminals that stop the drive whatever the network is doing. Also check what the drive does if comms are lost, and make sure that behaviour has been chosen deliberately.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Hand runs the motor from the panel with the BMS out of circuit; Off stops it; Auto gives the BMS one contact in series with everything else.',
            'Starters look alike to the BMS: one run command in, run and trip back. Star-delta changeover and other starting logic stay inside the starter.',
            'Run, trip and auto status answer three different questions. Choose the run status source to prove what the strategy actually depends on.',
            'A drive needs an enable to run and a speed reference for how fast. Stop it with the enable, not by winding the reference to zero.',
            'Outstation outputs drive interposing relays rather than mains contactor coils. The relay matches ratings, separates circuits and is the easy test point, and its contacts may be live from another supply.',
            'Fire and safety stops break the coil circuit upstream of the Hand/Off/Auto selector. The fire system acts; the BMS monitors.',
            'Prove the panel in Hand and Off first, then commission in Auto, and test every safety stop in every selector position.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-6"
          prevLabel="Control wiring"
          nextHref="/study-centre/upskilling/bms-module-3"
          nextLabel="Module 3: Controlling heating, ventilation and air conditioning"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section7;
