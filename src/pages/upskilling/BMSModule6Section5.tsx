/**
 * BMS Module 6 · Section 5 — Fire alarm and life safety interfaces
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. This page carries the course's most important
 * safety message: the fire detection and alarm system, and the interfaces it owns, carry out the
 * life-safety actions (plant shutdown on fire, damper and door release, smoke control, lift
 * actions); the BMS monitors fire alarm status and may only do non-life-safety follow-up such as
 * logging, telling the facilities team and an orderly restart after reset. It teaches interface
 * relays and volt-free signals, the cause and effect matrix as the design document, fire priority
 * over every hand and software command, and joint testing with the fire alarm engineer. The old
 * page had the BMS releasing doors, cutting power to AHUs, driving smoke extract and acting as the
 * life-safety path, plus a "300 mm" separation rule, fire-cable ratings and a fixed annual test
 * interval presented as requirements. All of that is gone.
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

const TITLE = 'Fire alarm and life safety interfaces | BMS Module 6.5 | Elec-Mate';
const DESCRIPTION =
  'Why the fire alarm system, not the BMS, stops plant and releases doors on fire. Interface relays, volt-free signals, cause and effect, fire priority and joint testing.';

const outcomes = [
  'State who carries out life-safety actions on a fire signal, and what the BMS is allowed to do',
  'Describe how a fire alarm interface relay and a volt-free contact connect the fire system to plant and to the BMS',
  'Read a cause and effect matrix and treat it as the design document for every fire action',
  'Explain why no BMS command, hand switch or software override may run plant the fire system has stopped',
  'Wire a fire stop so that it acts upstream of both the Hand and Auto paths in a starter panel',
  'Plan and take part in a joint test with the fire alarm engineer, including reset and restart',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a fire signal, an AHU supply fan has to stop under the fire strategy. What should actually stop it?',
    options: [
      'A BMS software routine that sets the fan command to off when it sees the fire input',
      'The BMS outstation output relay, switched off by a high-priority alarm',
      'A fire alarm interface contact wired into the fan control circuit, independent of the BMS',
      'The facilities team, once the BMS alarm has told them about the fire',
    ],
    correctIndex: 2,
    explanation:
      'The fire detection and alarm system and its own interfaces carry out life-safety actions. The fire interface contact sits in the fan control circuit, so the fan stops even if the BMS is offline, faulty or overridden. A software routine or a BMS output looks tidy but depends on the BMS working at the moment it matters.',
  },
  {
    id: 2,
    question:
      'While the fire signal is present, the BMS drops and holds off its own enables to the AHUs. What is the purpose?',
    options: [
      'To stop the AHUs on fire as the fire strategy requires',
      'So plant does not restart the moment the fire contact remakes',
      'To reset the fire alarm panel once the fans have stopped',
      'To prove to the fire engineer that the BMS has seen the fire',
    ],
    correctIndex: 1,
    explanation:
      'The life-safety stop has already been made by the fire interface contact in the control circuit. Holding the BMS enables off is non-life-safety follow-up, so plant does not leap back to life when the fire contact remakes. The BMS never resets the fire panel, and it is not the means of stopping plant on fire.',
  },
  {
    id: 3,
    question:
      'A starter panel has a Hand/Off/Auto selector. Where should the fire stop contact be wired?',
    options: [
      'In the Auto leg only, so the BMS loses control of the motor on fire',
      'Into a BMS digital input, so the strategy can stop the motor',
      'In series with the BMS enable relay contact',
      'In the common part of the control circuit, so it breaks Hand and Auto alike',
    ],
    correctIndex: 3,
    explanation:
      'A fire stop in the common part of the control circuit breaks both paths, so nobody can run the motor in Hand during a fire. Wiring it in the Auto leg only, or in series with the BMS relay, leaves the Hand position as a live bypass of the fire strategy.',
  },
  {
    id: 4,
    question: 'What is the cause and effect matrix?',
    options: [
      'A BMS graphic showing which fans are running in each zone',
      'The design document setting out what each fire input causes to happen',
      'A list the electrician writes after testing to show what worked',
      'A trend log of fire alarm events kept by the BMS',
    ],
    correctIndex: 1,
    explanation:
      'The matrix is the design document: causes down one side, effects across the other, and a mark wherever a cause must produce an effect. It comes from the fire strategy and the fire alarm designer. It is tested against, not written from what happened on the day.',
  },
  {
    id: 5,
    question:
      'During a joint test, a detector in zone 3 trips the fire panel but AHU-2, which the matrix says must stop, keeps running. What do you do?',
    options: [
      'Add a BMS rule to stop AHU-2 on general fire alarm and retest',
      'Record it as a failed test and find the fault in the fire interface path',
      'Pass the test, because the BMS showed the fire alarm correctly',
      'Ask the client whether AHU-2 really needs to stop',
    ],
    correctIndex: 1,
    explanation:
      'A missing effect is a failed test. The fault is somewhere in the fire interface path: the panel output programming, the interface relay, or the wiring into the starter. Patching it with a BMS rule moves a life-safety action onto the wrong system and hides the real fault.',
  },
  {
    id: 6,
    question:
      'The BMS operator has put AHU-1 into a software hand override at full speed. The fire alarm then operates. What should happen?',
    options: [
      'AHU-1 keeps running because a manual override has the highest priority in the BMS',
      'AHU-1 stops only once the operator removes the override',
      'AHU-1 stops after the BMS times out the override',
      'AHU-1 stops, because the fire stop acts downstream of every BMS command',
    ],
    correctIndex: 3,
    explanation:
      'A fire signal must take priority over every manual and automatic command. Because the fire interface contact breaks the control circuit after the BMS output, nothing the operator does on the head end can keep the fan running. If it could, the installation is wrong.',
  },
  {
    id: 7,
    question:
      'The fire alarm is reset after a false alarm. Which restart behaviour is most sensible for the BMS?',
    options: [
      'Restart plant in a planned, staggered sequence after reset',
      'Restart every fan and pump at once so the building recovers quickly',
      'Keep everything off until the next scheduled occupancy start',
      'Restart plant as soon as the fire signal appears, to clear smoke',
    ],
    correctIndex: 0,
    explanation:
      'An orderly restart after reset is good non-life-safety follow-up. Starting everything at once can cause large inrush and pressure surges; leaving it all off until tomorrow leaves an occupied building without ventilation. Starting plant on the fire signal itself is a life-safety decision the BMS must never make.',
  },
  {
    id: 8,
    question:
      "After every fire drill the fire panel is reset and shows normal, but the BMS still reads 'fire alarm active' and keeps the plant off. Where is the fault?",
    options: [
      'In the fire panel, which has not fully reset',
      'In the BMS status path from the interface',
      'In the fire stop contact in the AHU starter',
      'In the cause and effect matrix for that block',
    ],
    correctIndex: 1,
    explanation:
      'The panel is normal but the BMS input is not, so the problem lies between the interface and the BMS input. Typical causes are status cores landed on a latching contact, or an input configured the wrong way round. The fire stop worked, so the starter contact is not the issue, and the matrix does not change between drills.',
  },
  {
    id: 9,
    question:
      'A client asks for the BMS to be able to silence and reset the fire alarm from the head end, to save walking to the panel. What is the right response?',
    options: [
      'Agree, as long as the BMS user accounts are password protected',
      'Agree, but only during working hours when someone is on site',
      'Wire a BMS output to the panel reset terminal and label it clearly',
      'Decline, and refer it to the fire alarm designer',
    ],
    correctIndex: 3,
    explanation:
      'Controlling the fire system from the BMS breaks the separation that keeps the fire system independent. Any change to how the fire system is operated belongs to the fire alarm designer and whoever is responsible for fire safety in the building. Passwords and labels do not fix the principle.',
  },
  {
    id: 10,
    question:
      'You are asked to swap an AHU starter panel on a live site. What must happen to the fire stop before the job is signed off?',
    options: [
      'It can be retested at the next routine fire alarm service',
      'It is retested with the fire alarm engineer before handback',
      'It is checked by forcing the BMS fire input and watching the fan stop',
      'It needs no test if the cores were marked and reconnected one for one',
    ],
    correctIndex: 1,
    explanation:
      'Any change to either system can break a fire effect, so the effect is proved again with the fire alarm engineer, from a real fire input, against the matrix. Forcing a BMS input tests the BMS, not the fire path. Careful reconnection is good practice, but it is not proof.',
  },
];

const BMSModule6Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 5"
        title="Fire alarm and life safety interfaces"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          When there is a fire, the fire alarm system stops the plant and the BMS only watches. This
          page covers who does what, what the BMS is allowed to do about it, and how you wire and
          test the boundary between the two.
        </p>

        <TLDR
          points={[
            'The fire detection and alarm system, and the interfaces it owns, carry out life-safety actions: stopping plant, releasing doors and dampers, smoke control, lift actions. The BMS does not.',
            'The BMS monitors fire alarm status and may do non-life-safety follow-up: log the event, tell the facilities team, hold its own outputs off and restart plant in order after reset.',
            'The link is a fire alarm interface relay giving volt-free contacts: one set breaks the plant control circuit, another tells the BMS. Nothing flows back from the BMS.',
            'A fire signal takes priority over every hand and automatic command. No BMS override, hand switch or software path may run plant the fire system has stopped.',
            'The cause and effect matrix is the design document. Every effect is proved with the fire alarm engineer, from a real fire input, and again after any change to either system.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Who does what</ContentEyebrow>

        <ConceptBlock
          title="The fire system acts. The BMS watches."
          plainEnglish="When there is a fire, the fire alarm system and the relays it controls do everything that keeps people alive. The BMS is told about it and keeps a record, and that is about all."
          onSite="Before you touch any fire-related wiring in a plant room, ask one question: if the BMS were switched off right now, would this still work? If the answer is no, something is on the wrong side of the line."
        >
          <p>
            In UK practice, the actions a building takes on fire are driven by the fire detection
            and alarm system and its own interfaces. That covers stopping air handling plant that
            could spread smoke, releasing door hold-open devices, releasing doors on escape routes,
            starting smoke control and pressurisation systems, and signalling lift controllers. Each
            of those is a life-safety action, and each is done by the fire system through outputs it
            controls and supervises.
          </p>
          <p>
            The BMS has a different job. It <strong>monitors</strong> the fire alarm, so the
            operator knows the building is in alarm, and it can do things that help but that
            nobody&rsquo;s safety depends on. That split is deliberate. A fire alarm system is
            designed, installed, maintained and tested to its own codes by fire specialists, and it
            is built to keep working through faults that a BMS is not designed to survive. Putting a
            life-safety action through the BMS borrows that action&rsquo;s reliability from a system
            that was never asked to provide it.
          </p>
          <p>
            Integration guidance for building controls has said this for a long time: there should
            be a clean technical break between the fire alarm system and the BMS, and the BMS should
            only monitor the fire system and lift controllers, never influence them. Modern
            integration frameworks still list life safety as a monitor-only system on the BMS.
          </p>
          <p>
            <strong>The codes that govern the fire side.</strong> The fire alarm and the things it
            operates have their own codes of practice, written for fire specialists. You need to
            know they exist and who works to them, not their clause numbers.
          </p>
          <p>
            Fire alarm work in non-domestic buildings follows BS 5839-1, the code of practice for
            fire detection and alarm systems in non-domestic buildings. How a fire alarm signal
            operates other fire protection measures, such as door release, smoke control and
            similar, is covered by the BS 7273 series, the codes of practice for the operation of
            fire protection measures. Both are codes of practice, written to guide designers and
            installers. The fire strategy for the building, and whoever designed the fire alarm
            system, decide what operates what.
          </p>
          <p>
            For an electrician on a BMS job this has a practical meaning. The fire interface is not
            yours to design. You may well install the interface relay, run the cable to the starter
            panel and terminate it, but you do so to the fire alarm designer&rsquo;s drawings and
            the cause and effect matrix. If the drawings do not say where a fire stop goes, you ask;
            you do not invent one.
          </p>
        </ConceptBlock>

        <Pullquote>
          If the BMS were switched off at the moment the fire started, every life-safety action
          would still happen. That is the test of a correct installation.
        </Pullquote>

        <ConceptBlock
          title="The life-safety systems you will find beside BMS plant"
          plainEnglish="Several systems in a plant room or riser look like building services but answer to the fire alarm, not the BMS. Know which they are so you do not wire them to the wrong master."
          onSite="When you survey a plant room or riser, mark on your drawing every device that is driven by the fire system. It is the quickest way to see where a BMS point and a fire interface sit side by side."
        >
          <p>
            Most of these will be wired near BMS equipment, sometimes in the same panel. Each one
            takes its fire instruction from the fire system or from its own dedicated controls:
          </p>
          <ul>
            <li>
              <strong>Air handling plant shutdown.</strong> Supply and extract fans that could move
              smoke through ductwork are stopped by a fire interface contact in their control
              circuit. The BMS sees the result as a status change. Not every fan stops, though.
              Under some fire strategies an AHU or extract fan switches to a smoke-clearance duty
              instead, and some drives have a fire mode that keeps the fan running. The cause and
              effect matrix decides which, and those actions are still driven by the fire system,
              not the BMS.
            </li>
            <li>
              <strong>Fire and smoke dampers.</strong> Where dampers are released or driven on fire,
              the signal comes from the fire system or a dedicated damper control system. The BMS
              may show damper positions; it does not command them on fire.
            </li>
            <li>
              <strong>Door hold-open devices and escape door locks.</strong> Magnetic holders
              release, and access-controlled locks on escape routes free off, through interfaces
              from the fire system. Section 4.3 covers what the access control system and the BMS
              each see.
            </li>
            <li>
              <strong>Smoke control and pressurisation.</strong> Smoke extract fans, smoke vents and
              stair pressurisation systems are life-safety systems with their own controls, started
              by the fire system. They are not BMS plant, even when they look like fans and dampers.
            </li>
            <li>
              <strong>Lifts.</strong> Any fire action on lifts is between the fire system and the
              lift controller. The BMS may show lift status at most; it must have no means of
              influencing lift controls.
            </li>
          </ul>
          <p>
            The common thread is that every one of these must work with the BMS dead. If you find
            any of them depending on a BMS output, treat it as a defect and report it rather than
            leaving it because &ldquo;it has always been like that&rdquo;.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-5-who-acts"
          question="Which of these is a non-life-safety follow-up action that the BMS may carry out on a fire signal?"
          options={[
            'Releasing magnetic door holders on the corridor fire doors',
            'Stopping the kitchen extract fan as required by the fire strategy',
            'Starting the smoke extract fan in the atrium',
            'Raising an alarm on the facilities team’s phones and logging the time',
          ]}
          correctIndex={3}
          explanation="Telling people and keeping a record helps but nobody's safety depends on it, so it suits the BMS. Door holders, plant stops required by the fire strategy and smoke extract are life-safety actions carried out by the fire system and the interfaces it owns."
        />

        <SectionRule />
        <ContentEyebrow>The hardware at the boundary</ContentEyebrow>

        <ConceptBlock
          title="Interface relays and volt-free contacts"
          plainEnglish="The fire panel switches a relay. The relay's contacts are plain switches with no voltage of their own. One contact stops the plant, another tells the BMS. The BMS can read its contact but has no way to work the relay."
          onSite="Label every fire interface contact at both ends, and label the terminals in the starter panel as a fire stop. The next person in that panel needs to know that removing a link there defeats the fire strategy."
        >
          <p>
            The usual link between a fire alarm system and the plant it controls is a{' '}
            <strong>fire alarm interface relay</strong> (often in a small interface unit near the
            plant), switched by an output that the fire panel controls. The relay gives one or more
            sets of <strong>volt-free contacts</strong>: contacts that carry no voltage of their own
            and simply open or close. Whatever circuit they are wired into supplies the voltage.
          </p>
          <p>Those contacts are then used for two quite separate jobs:</p>
          <ul>
            <li>
              <strong>The life-safety effect.</strong> One contact is wired into the control circuit
              of the plant it must stop, typically in the starter or motor control panel. When the
              fire system operates, the contact changes state and the control circuit is broken. The
              motor stops whatever the BMS is asking for.
            </li>
            <li>
              <strong>The status signal.</strong> Another, separate contact is wired to a BMS
              digital input. The BMS reads it as &ldquo;fire alarm active&rdquo; and uses it for
              alarms, logging and its own follow-up.
            </li>
          </ul>
          <p>
            The direction matters. Information flows <em>from</em> the fire system <em>to</em> the
            BMS, never the other way. A volt-free contact also keeps the two systems electrically
            apart: the BMS puts its own small sensing voltage across its contact, and the fire
            system&rsquo;s circuits never see it.
          </p>
          <p>
            Many fire systems supervise the wiring to their own inputs and outputs so that a cut or
            shorted cable shows as a fault at the panel. How that supervision is arranged is part of
            the fire alarm design. Do not add, remove or bridge anything on the fire side of an
            interface unit; that is the fire alarm engineer&rsquo;s circuit.
          </p>
          <p>
            <strong>Fail-safe wiring of the stop contact.</strong> Wire the stop so that a broken
            wire stops the plant, rather than a broken wire stopping the fire signal getting
            through.
          </p>
          <p>
            A fire stop is commonly arranged as a contact that is <strong>closed</strong> in normal
            conditions and <strong>opens</strong> on fire, wired in series in the plant control
            circuit. If the cable is cut, the contact fails, or a terminal works loose, the circuit
            opens and the plant stops. That is a nuisance, but it is a safe nuisance, and it gets
            noticed and fixed.
          </p>
          <p>
            The opposite arrangement, a contact that closes on fire to energise a stop relay, can
            fail without anybody knowing: a broken wire simply means the stop never happens. The
            designer decides the arrangement, but you should recognise both on a drawing and know
            which one fails safe.
          </p>
          <p>
            The control circuit that the fire contact breaks is an auxiliary circuit in BS 7671
            terms (Section 557 covers control, signalling and measurement circuits). Its supply may
            be dependent on, or independent of, the main circuit according to what it has to do, and
            that decision belongs to the designer. Where fire interface wiring and BMS wiring share
            an enclosure, keep them identified and apart from each other and from the power wiring,
            as the designer specifies.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-5-volt-free"
          question="A fire interface relay gives a volt-free contact to a BMS digital input. What does the BMS actually receive?"
          options={[
            'A voltage supplied by the fire panel that the BMS measures',
            'An open or closed contact, read with the BMS input’s own sensing voltage',
            'A data message from the fire panel over the BMS network',
            'A 0–10 V signal proportional to the number of detectors in alarm',
          ]}
          correctIndex={1}
          explanation="A volt-free contact is just a switch. The BMS input supplies its own small sensing voltage and reads whether the switch is open or closed. No voltage comes from the fire panel, and nothing the BMS does can operate that relay."
        />

        <SectionRule />
        <ContentEyebrow>Fire priority</ContentEyebrow>

        <ConceptBlock
          title="A fire signal beats every other command"
          plainEnglish="Once the fire system has stopped a fan, nothing should be able to start it again: not the BMS schedule, not an operator override, not a hand switch on the panel door."
          onSite="Test the Hand position. With the fire signal active, put the starter in Hand. If the motor runs, the fire stop is in the wrong place and the job is not finished."
        >
          <p>
            This is a design principle, and it has no exceptions in plant logic: a fire signal must
            take priority over every manual and automatic command. No hand switch, BMS override or
            software path may run a fan that the fire strategy has stopped.
          </p>
          <p>
            On a typical starter with a Hand/Off/Auto selector, the BMS enable contact sits in the
            Auto leg, and the Hand position bypasses the BMS altogether. That is the point of Hand:
            it lets plant run when the BMS is down. It also means that a fire stop wired in the Auto
            leg, or in series with the BMS enable relay, is bypassed by Hand too. The fire stop
            belongs in the <strong>common</strong> part of the control circuit, ahead of the
            Hand/Off/Auto selector, so that it breaks both paths. Some designs also break the
            circuit after the switch, or use a dedicated contactor; follow the drawing, then prove
            it.
          </p>
          <p>
            Software is the other bypass. A BMS operator can override a point to on, force an
            output, or run plant in a manual mode on the head end. If the fire stop is wired
            downstream of the BMS output, none of that can reach the motor during a fire. If the
            &ldquo;fire stop&rdquo; is only a line in the BMS strategy, all of it can.
          </p>
          <p>
            Variable speed drives need the same thinking. A drive that is stopped only by removing
            the BMS enable or speed reference can still be started from its own keypad. The fire
            stop goes where the drive designer and fire alarm designer have agreed it will stop the
            drive regardless of how it is being commanded.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="The fire stop that only the BMS knows about"
          whatHappens="The fire interface contact is wired to a BMS digital input, and a line in the strategy turns the AHU off when it sees fire. It works on the day of commissioning. Months later the outstation is offline after a power cut, or an operator has put the fan into a head end override, or someone switches the starter to Hand. The fire alarm operates and the fan keeps running, moving smoke around the building."
          doInstead="Wire the fire interface contact into the plant control circuit, ahead of the Hand/Off/Auto selector, so it breaks the circuit whatever the BMS is doing. Give the BMS its own separate contact for status only. Prove it by running the fan in Hand and in a BMS override, then operating a real fire input."
        />

        <InlineCheck
          id="bms-6-5-priority"
          question="With the fire alarm active, you put an AHU starter into Hand and the fan starts. What does that tell you?"
          options={[
            'The fire stop is wired somewhere the Hand position bypasses',
            'The BMS has failed to see the fire input',
            'Hand is meant to override fire, so it is working as designed',
            'The fire panel output has not operated',
          ]}
          correctIndex={0}
          explanation="If Hand can run the fan during a fire, the fire stop is in the Auto leg or in series with the BMS enable, both of which Hand bypasses. It belongs in the common part of the control circuit. Hand overriding fire is never correct."
        />

        <SectionRule />
        <ContentEyebrow>The design document</ContentEyebrow>

        <ConceptBlock
          title="The cause and effect matrix"
          plainEnglish="A grid. Down the side: every fire input that can start something, such as a detector zone or a manual call point. Across the top: everything that can happen. A mark in a square means that input must cause that effect."
          onSite="Get a copy of the current issue of the matrix before you start, and check its revision against the fire alarm engineer's copy. Testing to an old matrix is how wrong effects get signed off."
        >
          <p>
            The <strong>cause and effect matrix</strong> (also called a cause and effect chart or
            schedule) is the design document for every fire action in the building. It is produced
            from the fire strategy by the fire alarm designer, and it is what the installation is
            built and tested against.
          </p>
          <p>
            <strong>Causes</strong> are listed down one side: individual detector zones, manual call
            points, sprinkler flow switches, and anything else that feeds the fire panel.{' '}
            <strong>Effects</strong> run across the top: sound the alarm in a given area, release
            door holders on a floor, stop AHU-1, open a smoke vent, signal the lift controller, and
            so on. A mark where a row meets a column means that cause must produce that effect.
          </p>
          <p>
            Where the BMS appears on a matrix, it should be as an effect of the kind &ldquo;signal
            to BMS&rdquo; or &ldquo;BMS informed&rdquo;: a status the BMS receives, not an action it
            is relied on to perform. If you see a matrix column that reads &ldquo;BMS to stop
            AHU&rdquo; or &ldquo;BMS to release doors&rdquo;, raise it with the designer before you
            wire anything.
          </p>
          <p>
            Changes to the matrix go through the fire alarm designer and whoever is responsible for
            fire safety in the building. They are not edited on site to match what was installed.
            When a building is refitted and an AHU is added or replaced, the matrix should change
            first and the wiring follow it.
          </p>
          <p>
            <strong>Existing buildings: find out what is really there.</strong> In an older
            building, the drawings and the matrix may not match the wiring. Before you change
            anything near a fire interface, trace what is actually installed.
          </p>
          <p>
            Buildings get altered. AHUs are replaced, starter panels swapped, BMS strategies
            rewritten by successive contractors. Over the years the fire stop on a piece of plant
            can migrate from a hardwired contact into a line of BMS code without anybody deciding
            that it should. When you work on an existing system, assume nothing:
          </p>
          <p>
            Before you disconnect anything in a panel with a fire interface, photograph the
            terminals and note core colours and numbers against the drawing. It takes a minute and
            makes your reinstatement provable to the fire alarm engineer at the retest.
          </p>
          <ul>
            <li>
              Trace each fire interface from the interface unit to the plant it controls, and check
              that the contact really is in the plant control circuit, not just on a BMS input.
            </li>
            <li>
              Check where it sits relative to the Hand/Off/Auto selector and any drive keypad.
            </li>
            <li>
              Compare what you find with the current cause and effect matrix. Plant that is not on
              the matrix but has a fire stop, or is on the matrix with no fire stop, both need
              raising.
            </li>
            <li>
              Report anything that relies on the BMS for a life-safety action to the client and the
              building&rsquo;s responsible person (whoever holds the legal duties for fire safety in
              the premises, usually the employer or the person in control of the building) in
              writing, even if it is outside your scope.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>What the BMS does with the signal</ContentEyebrow>

        <ConceptBlock
          title="Useful, non-life-safety follow-up"
          plainEnglish="Once the BMS knows the fire alarm is active, it can help in ways nobody's life depends on: record it, tell people, keep quiet about alarms it expects, and bring the building back in a sensible order afterwards."
          onSite="Look at what the BMS strategy does when the fire input clears. If it restarts everything at once, or never restarts at all, raise it with the controls engineer before handover."
        >
          <p>The fire status input gives the BMS useful work to do, all of it secondary:</p>
          <ul>
            <li>
              <strong>Log the event</strong> with a time, so it sits in the trend history alongside
              plant states. That makes it easy to see later what stopped and when.
            </li>
            <li>
              <strong>Inform the facilities team</strong> through the alarm routes covered in
              Section 6.1, so the people who will have to restart the building know what has
              happened.
            </li>
            <li>
              <strong>Manage its own alarms.</strong> When the fire system stops a floor&rsquo;s
              worth of fans, the BMS will otherwise raise a &ldquo;fan failed&rdquo; alarm for every
              one of them. Suppressing those while the fire input is active stops the real message
              being buried.
            </li>
            <li>
              <strong>Put its own outputs into a known state.</strong> The BMS can drop its own
              enables and hold them off while the fire signal is present. This is not the
              life-safety stop (the fire contact has already done that), but it means plant does not
              leap back to life the moment the fire contact remakes.
            </li>
            <li>
              <strong>Restart in order after reset.</strong> Once the fire alarm has been reset and
              the status input has cleared, the BMS can bring plant back in a planned, staggered
              sequence rather than all at once.
            </li>
          </ul>
          <p>
            None of that may ever be the only thing standing between a fire and an unsafe outcome.
            If you removed every one of those functions, the building would be less convenient to
            run but no less safe.
          </p>
        </ConceptBlock>

        <Scenario
          title="A school where the plant stays off after a fire drill"
          situation="The site manager at a secondary school calls: after every fire drill, the heating and ventilation in one block stay off until someone notices the cold and phones the controls contractor. The fire alarm has been reset each time and the fire panel shows normal. On the BMS head end, the fire status point for that block still reads 'fire alarm active'."
          whatToDo="Start from what the BMS believes. The fire panel is normal but the BMS input is not, so the problem is in the status path, not the fire system. At the outstation, check the input with a meter: is the contact open or closed, and does that match the healthy state on the points schedule? Then go to the interface unit and confirm which contact is wired to the BMS. In a case like this you might find the BMS status cores landed on a latching contact that only clears after a manual reset at the interface, or an input configured the wrong way round. Correct it with the controls engineer, then prove it in a drill with the fire alarm engineer: alarm, plant stops, reset, BMS status clears, plant restarts in its normal sequence."
          whyItMatters="This is a nuisance rather than a danger, because the fire stop itself worked every time. That is the split doing its job. But a BMS that never sees the fire clear leaves an occupied building without heating or ventilation, and gets the interface blamed and fiddled with. Fixing the status path properly stops someone 'helpfully' linking things out."
        />

        <ConceptBlock
          title="Keep the BMS out of the fire system"
          plainEnglish="The BMS can read the fire system. It should never be able to write to it: not silence it, not reset it, not disable a zone."
          onSite="If a fire panel is integrated to the BMS through a gateway or high-level interface, ask the controls engineer to confirm in writing that it is read-only."
        >
          <p>
            Some fire panels can share far more than a single contact with a BMS: zone states,
            device faults, disablements, often through a gateway onto the BMS network. That richer
            picture is useful to an operator, provided it stays a picture. The interface should be
            read-only from the BMS side.
          </p>
          <p>
            The reason is not just electrical. A BMS is reachable by more people, often remotely,
            than a fire panel is. Security guidance for building controls gives exactly this kind of
            example as a threat: someone with remote access triggering false fire alarms and
            disrupting a business. If the BMS cannot write to the fire system, a compromised or
            mis-configured BMS cannot silence, reset or disable it. Section 6.6 picks up remote
            access in more detail.
          </p>
          <p>
            The same applies to the graphics. A fire status shown on a BMS page is for information.
            Make sure it is labelled that way, and that nothing on the page looks like a button that
            acts on the fire system. An operator who thinks they have reset a fire alarm from the
            BMS when they have not is a hazard in their own right.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Testing with the fire alarm engineer</ContentEyebrow>

        <ConceptBlock
          title="Joint testing against the matrix"
          plainEnglish="Fire interfaces are proved by two people together: the fire alarm engineer making real fire inputs, and you (or the controls engineer) watching each effect happen at the plant and on the BMS."
          onSite="Agree the test plan with the fire alarm engineer and the building's responsible person in advance. Occupants, the alarm receiving centre and anyone relying on the plant all need to know before a fire alarm is operated or plant is stopped."
        >
          <p>
            A fire interface is only proved when a <strong>real fire input</strong> produces the{' '}
            <strong>right effect at the plant</strong>. Forcing a BMS input, or switching the
            interface relay by hand, tests only part of the chain. The joint test starts at the fire
            panel and finishes at the motor.
          </p>
          <p>A workable sequence, cause by cause along the matrix:</p>
          <ul>
            <li>
              Before you start, put the plant in its normal running state, including any you can run
              in Hand and in BMS override, so you test the bypasses too.
            </li>
            <li>
              The fire alarm engineer operates the cause: a detector, call point or test input as
              they choose.
            </li>
            <li>
              At each plant item the matrix marks, confirm the effect: the motor actually stops, and
              cannot be restarted in Hand or from the BMS while the fire signal is present.
            </li>
            <li>
              Confirm the BMS shows the fire status, logs it, and does its follow-up as specified.
            </li>
            <li>
              Confirm nothing happens that the matrix does <em>not</em> mark. Unexpected effects are
              faults too.
            </li>
            <li>
              The fire alarm engineer resets the panel. Watch the BMS restart behaviour and check
              plant returns to normal.
            </li>
            <li>Record each result against the matrix, signed by both parties.</li>
          </ul>
          <p>
            Retest whenever either system changes: a new or replaced starter panel, a new AHU, a
            fire panel upgrade, a change to the BMS strategy around the fire input, or a change to
            the matrix. Commissioning records for building services routinely include a line for the
            fire alarm system being proved, and the fire interfaces are part of that.
          </p>
          <p>
            When an effect fails, the test stops for that cause. Record the failure, find the fault
            with the fire alarm engineer (panel output, interface relay, cabling or the termination
            in the starter) and repeat the whole cause once it is fixed. Do not mark a cause as
            passed because the fault was obvious and quickly put right; the record has to show the
            test that actually passed.
          </p>
        </ConceptBlock>

        <Scenario
          title="A starter panel swap in an occupied office"
          situation="You are replacing a failed starter panel for a supply and extract AHU in a city-centre office. The old panel had a fire stop: two cores from a fire interface unit wired across a pair of terminals marked 'FA'. The new panel from the controls contractor has a Hand/Off/Auto selector, a BMS enable relay, and a pair of terminals marked 'fire' in series with the BMS enable contact in the Auto leg."
          whatToDo="Stop before you terminate. Before any fire core is disconnected, ask the fire alarm engineer to put that output into test or disablement under their procedure, and make sure the responsible person and the alarm receiving centre know. The disablement is lifted only after the joint retest. As drawn, Hand would bypass the fire stop. Raise it with the controls contractor and the fire alarm designer, and get the fire terminals moved into the common part of the control circuit ahead of the Hand/Off/Auto selector. Wire the fire core pair there and the separate BMS status contact to its digital input. Then book a joint test: the fire alarm engineer operates a cause the matrix links to this AHU, while you confirm the fans stop in Auto, in Hand, and with a BMS override applied; that the BMS logs the fire status; and that after reset the BMS restarts the AHU in its normal sequence. Record it against the matrix, and only then ask the fire alarm engineer to lift the disablement."
          whyItMatters="Every starter panel swap is a chance to break a life-safety function without anyone noticing, because the fire alarm itself still works perfectly. The fault only shows in a real fire, when a fan nobody expected to be running moves smoke into an escape route."
        />

        <CommonMistake
          title="Bridging a fire stop to get plant running"
          whatHappens="A fire interface contact has failed open, or a cable has been damaged, and the AHU will not start. To get the building ventilated, someone links out the fire terminals in the starter panel 'just for now'. The link is forgotten, and the AHU no longer stops on fire."
          doInstead="Treat an open fire stop as a fire alarm fault, not a plant fault. Report it to the building's responsible person and the fire alarm contractor, who can decide what temporary measures are acceptable under the fire strategy. Never link out a fire stop yourself, and if you find one linked out, report it the same day."
        />

        <InlineCheck
          id="bms-6-5-testing"
          question="Which test best proves a fire stop on an AHU?"
          options={[
            'Forcing the BMS fire input on the head end and watching the fan stop',
            'Pulling the interface relay from its base and watching the fan stop',
            'Checking the fire stop cores for continuity with a multimeter',
            'A real fire input at the panel, with the fan run in Auto then Hand',
          ]}
          correctIndex={3}
          explanation="Only a real fire input, followed all the way to the motor, proves the whole chain. Forcing the BMS input tests only the BMS. Pulling the relay or checking continuity each tests a single piece. Repeating it with the starter in Hand proves the stop cannot be bypassed."
        />

        <FAQ
          items={[
            {
              question:
                'The specification says the BMS shall shut down all AHUs on fire. Should I wire it that way?',
              answer:
                'Raise it before you wire anything. A specification can ask the BMS to drop its own outputs on fire as follow-up, which is fine, but the life-safety stop itself should come from the fire system through an interface contact in the plant control circuit. Ask the designer to confirm where the fire stop is on the drawings and the cause and effect matrix.',
            },
            {
              question: 'Can I install the fire interface relay myself?',
              answer:
                'You may well install and wire it as part of the electrical works, but to the fire alarm designer’s drawings, and the fire side of the interface is the fire alarm engineer’s circuit. They commission and test it with you. Do not alter anything on the fire side of an interface unit.',
            },
            {
              question: 'What if the BMS loses the fire input because of a wiring fault?',
              answer:
                'The plant still stops on fire, because the fire stop does not depend on the BMS. What you lose is the status: no log, no alert, and possibly a bad restart. Treat it as a BMS fault and fix it, but it is not a life-safety failure, which is exactly why the two jobs use separate contacts.',
            },
            {
              question:
                'Can the fire stop and the BMS status come from the same contact if the interface unit only has one?',
              answer:
                'Not as a shortcut. The plant stop and the BMS status are separate jobs and should have separate contacts, so a fault or a change on the BMS side can never affect the fire stop. If the interface unit does not have enough contacts, ask the fire alarm engineer for an additional output or interface relay rather than sharing one.',
            },
            {
              question:
                'How often should the fire interfaces be tested once the building is occupied?',
              answer:
                'Routine testing of the fire alarm system, including the interfaces it operates, is set by the fire alarm maintenance regime and the building’s responsible person, and carried out by the fire alarm engineer. Your part is to make sure plant effects are included in those tests, and to ask for a retest whenever your work touches a fire interface.',
            },
            {
              question: 'Who decides what each fire input does?',
              answer:
                'The fire strategy for the building and the fire alarm designer. Their decisions are written down in the cause and effect matrix. Electricians and controls engineers build to it and test against it; they do not change it.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Life-safety actions on fire are carried out by the fire detection and alarm system and its own interfaces. The BMS monitors and does non-life-safety follow-up only.',
            'An interface relay gives volt-free contacts: one breaks the plant control circuit, another tells the BMS. Information flows from the fire system to the BMS, never back.',
            'A fire signal beats every hand, automatic and software command. Wire the fire stop ahead of the Hand/Off/Auto selector and prove that Hand and BMS overrides cannot run plant during a fire.',
            'The cause and effect matrix is the design document. Build to it, test against it, and send changes through the fire alarm designer.',
            'Prove every fire effect jointly with the fire alarm engineer from a real fire input, and retest after any change to either system.',
            'The BMS should never be able to silence, reset or disable the fire system. Keep any high-level integration read-only.',
            'Never link out a fire stop to get plant running. An open fire stop is a fire alarm fault, reported to the responsible person and the fire alarm contractor.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6-section-4"
          prevLabel="Energy monitoring and reporting"
          nextHref="/study-centre/upskilling/bms-module-6-section-6"
          nextLabel="Remote access and monitoring"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section5;
