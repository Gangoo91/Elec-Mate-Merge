/**
 * BMS Module 4 · Section 3 — Access control interfaces
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what an access control
 * system is made of, what the BMS actually sees of it (door held, door forced, controller and
 * power supply faults, sometimes occupancy), how that information reaches the BMS, why door
 * release on fire belongs to the fire alarm system and the access system's own interface rather
 * than the BMS, and fail-safe versus fail-secure locking as concepts. The old page called
 * BS 7273-4 a legal requirement, quoted lock holding forces, currents and cable cores with no
 * source, claimed a 30% and a 35% energy saving from badge-in triggers, and ran a corporate HQ
 * case study on those invented results. All of that is gone; the case study is replaced by a
 * scenario about a client who asks for a BMS door release button.
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

const TITLE = 'Access control interfaces | BMS Module 4.3 | Elec-Mate';
const DESCRIPTION =
  'What a BMS sees of an access control system, how door status reaches it, why fire door release is not its job, and fail-safe versus fail-secure locking.';

const outcomes = [
  'Name the parts of an access-controlled door and say which system each one belongs to',
  'List the access control points a BMS typically monitors, and explain why they are monitor-only',
  'Describe the two common ways door status reaches a BMS: volt-free contacts and a high-level interface',
  'Explain why door release on fire is carried out by the fire alarm system and the access system, not the BMS',
  'Tell fail-safe from fail-secure locking, and say who decides which a door gets',
  'Plan the interface wiring and testing so the BMS can report on doors without ever being in the release path',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a typical UK commercial building, what is the BMS normally doing with the access control system?',
    options: [
      'Deciding which card holders may pass through each door',
      'Releasing the escape doors when the fire alarm operates',
      'Monitoring door and system status and raising alarms',
      'Switching the supply to the door locks from its outputs',
    ],
    correctIndex: 2,
    explanation:
      'The access system decides who may pass, and the fire alarm system and access interface handle release on fire. The BMS watches door held, door forced, controller and power supply faults, and alarms on them. Switching lock power from the BMS puts it in a path it should never be in.',
  },
  {
    id: 2,
    question: 'A door is fitted with a lock that releases when its power is removed. That lock is:',
    options: [
      'Fail-safe: losing power leaves the door free to open',
      'Fail-secure: losing power keeps the door locked',
      'Fail-safe, but only while its standby battery lasts',
      'Fail-secure, because power has to be applied to unlock it',
    ],
    correctIndex: 0,
    explanation:
      'Fail-safe means the door is free when power is lost: power holds it locked. Fail-secure is the reverse, with power needed to unlock. A standby battery keeps a fail-safe lock locked during a mains failure; it does not change what the lock does when power finally goes.',
  },
  {
    id: 3,
    question:
      'The client asks for a "release all doors" button on the BMS graphic, to be used during a fire. What is the right response?',
    options: [
      'Fit it, provided the BMS output drives an interposing relay',
      'Fit it, but only on the doors that are already fail-safe',
      'Fit it, and record the new button in the fire log book',
      'Decline, and refer it to whoever owns the fire strategy',
    ],
    correctIndex: 3,
    explanation:
      'Release on fire is a life-safety function and belongs to the fire alarm system and the access system interface designed for it. An interposing relay makes the wiring tidy but does not make the BMS a life-safety system. The request is a fire strategy question, so it goes to the person responsible for that strategy.',
  },
  {
    id: 4,
    question:
      'The BMS receives a "tamper" point from the access control system. What has the access system detected?',
    options: [
      'A reader, controller or power supply case has been opened',
      'A door was opened when nothing had released its lock',
      'A card was presented that is not valid for that door',
      'A door was released but stayed open beyond the set time',
    ],
    correctIndex: 0,
    explanation:
      'Tamper means a reader, controller or power supply enclosure has been opened or disturbed. A door opened with no release is door forced, and one left open too long is door held. An invalid card is a transaction the access system handles itself.',
  },
  {
    id: 5,
    question:
      'The access installer says the controller’s alarm outputs switch the panel’s supply voltage. They have to go to BMS digital inputs that expect volt-free contacts. What should you do?',
    options: [
      'Wire them straight in, as the supply is extra-low voltage',
      'Ask for volt-free outputs, or fit an interposing relay',
      'Fit a resistor in series to drop the voltage at the input',
      'Take the BMS input common from the access panel’s 0 V rail',
    ],
    correctIndex: 1,
    explanation:
      'Never bring the access system’s supply into the outstation, or a fault on one system becomes a fault on both. Volt-free relay outputs, or an interposing relay in the access panel, give the BMS a clean contact. Being extra-low voltage does not make it volt-free, and linking the 0 V rails joins the two systems.',
  },
  {
    id: 6,
    question:
      'The access system and BMS are linked by a high-level interface. The BMS supplier says it can also write commands to the doors. What should happen?',
    options: [
      'Keep it read-only unless the designers ask for more in writing',
      'Leave the write function on, as it costs nothing extra',
      'Make the BMS the backup door release if the fire panel fails',
      'Take the access system off the network to avoid conflicts',
    ],
    correctIndex: 0,
    explanation:
      'Being able to write to doors is a security and life-safety decision, not a feature to leave switched on by default. Read-only is the safe starting point. The BMS must never become a fallback release path for fire; that would give a non-life-safety system a life-safety job.',
  },
  {
    id: 7,
    question:
      'A green break-glass unit is fitted beside an access-controlled escape door. What is its job?',
    options: [
      'To send a fire signal to the fire alarm control panel',
      'To ask the BMS to unlock the door on its next scan',
      'To reset the access door controller after a fault',
      'To release the door directly, with no controller involved',
    ],
    correctIndex: 3,
    explanation:
      'The green unit is a manual emergency door release. It works directly on the lock power so that a person can get out even if the controller, the network and the BMS have all failed. It is not a fire alarm call point, which is red, and it has nothing to do with the BMS.',
  },
  {
    id: 8,
    question:
      'Why should a network link between the access control head end and the BMS be treated as a security risk, not just a convenience?',
    options: [
      'A weak point in one system can become a way into the doors',
      'BACnet and Modbus cannot carry door status over a network',
      'The BMS network runs too slowly for door alarms to arrive',
      'The access system loses its card data when the link drops',
    ],
    correctIndex: 0,
    explanation:
      'Linking the two means a weakness in one can become a way into the other, and an attacker who can reach the doors through the BMS has found a convenient route. BACnet and Modbus are often how these links are made. Speed and dropped links are not why it counts as a security matter.',
  },
  {
    id: 9,
    question:
      'During commissioning, who should prove that the escape doors release when the fire alarm operates?',
    options: [
      'The BMS engineer, by forcing the fire input on the outstation',
      'The electrician alone, by isolating the lock power supply',
      'The fire alarm and access engineers, from a real fire device',
      'Nobody, because release on fire is proved at the factory',
    ],
    correctIndex: 2,
    explanation:
      'The cause and effect belongs to the fire alarm system and the access interface, so their engineers prove it, starting from a real device on the fire system. Forcing a BMS input proves nothing about that path, and isolating the lock supply proves the lock, not the interface.',
  },
  {
    id: 10,
    question:
      'The BMS shows "Door 3 controller fault" every night at the same time, then it clears. What is the sensible first step?',
    options: [
      'Trend the point and pass the pattern to the access maintainer',
      'Inhibit the alarm on the BMS so it stops annoying the operators',
      'Replace the BMS input module, because the fault is on the BMS',
      'Rewire the point to come from the fire alarm panel instead',
    ],
    correctIndex: 0,
    explanation:
      'The BMS is reporting something the access system is telling it. A repeating pattern is useful evidence: it may line up with a timed load, a power supply on a time switch, or a scheduled task. Inhibiting it hides the evidence, and the fault is very unlikely to be in the BMS input.',
  },
];

const BMSModule4Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 3"
        title="Access control interfaces"
        backTo="/study-centre/upskilling/bms-module-4"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          What the BMS sees of the doors, how it gets that information, and why it is kept well away
          from releasing them.
        </p>

        <TLDR
          points={[
            'An access control system is a complete system in its own right: readers, door controllers, locks, door contacts, exit buttons, its own power supplies and its own head end.',
            'The BMS typically monitors it: door held open, door forced, controller faults, power supply and battery faults. It may log these and raise alarms. It does not decide who gets in.',
            'Door release on fire is done by the fire alarm system and the access system interface designed for it. The BMS is not in that path, and must not be made a backup for it.',
            'Fail-safe locks release when power is lost; fail-secure locks stay locked. Which a door gets is a fire strategy and security decision, not an installer choice.',
            'Your part is usually the interface: volt-free contacts into BMS inputs, segregated wiring, clear labelling, and testing it alongside the access and fire alarm engineers.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The system on the other side</ContentEyebrow>

        <ConceptBlock
          title="An access-controlled door is a small system of its own"
          plainEnglish="Before you can wire anything to the BMS, know what is on the door and which box owns each part. Almost none of it belongs to the BMS."
          onSite="Walk one door with the access drawings in hand and name every device you can see. It takes five minutes and saves an afternoon of guessing at terminals."
        >
          <p>
            An automatic access control system decides who may pass through a door and when. It has
            its own controllers, its own software and usually its own operator. A typical controlled
            door carries most of the following:
          </p>
          <ul>
            <li>
              <strong>Reader:</strong> card, fob, PIN pad or similar. It reads a credential and
              passes it to the door controller. It does not make the decision.
            </li>
            <li>
              <strong>Door controller:</strong> the local brain, often serving one or a few doors.
              It checks the credential, drives the lock and watches the door.
            </li>
            <li>
              <strong>Lock:</strong> an electromagnetic lock on the frame, an electric strike, or a
              motorised or solenoid lock in the door itself.
            </li>
            <li>
              <strong>Door contact</strong> (door position switch): tells the controller whether the
              door is shut. Every door alarm you will meet on the BMS starts here.
            </li>
            <li>
              <strong>Request-to-exit device:</strong> a push button or sensor on the secure side
              that releases the door for people leaving.
            </li>
            <li>
              <strong>Emergency door release:</strong> usually a green break-glass unit beside
              escape doors, which removes lock power directly so a person can always get out.
            </li>
            <li>
              <strong>Power supply with standby battery:</strong> feeds the controller and locks,
              and keeps the doors working through a mains failure.
            </li>
          </ul>
          <p>
            Above all of that sits the access system&rsquo;s own head end, where card holders are
            enrolled, access levels set and every transaction recorded. The BMS head end is a
            different machine with a different job. On many sites the two are run by different
            contractors under different maintenance contracts.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Monitor, not control: where the BMS fits"
          plainEnglish="The BMS is a window onto the access system. It sees what the doors are doing and tells someone. It does not open them."
          onSite="When a points schedule shows access control points, check the point types. They should almost all be inputs. An output to a door deserves a question before it is wired."
        >
          <p>
            In UK practice the BMS links to security systems such as access control, intruder alarms
            and CCTV mainly as a single place to see what is going on. It brings their status onto
            one screen and one alarm list, so a building operator does not need a separate
            workstation for each system. It does not take over their control functions.
          </p>
          <p>
            That is a deliberate boundary. The access system is designed, installed and maintained
            to security requirements. The fire alarm system is designed to fire safety requirements.
            The BMS is designed for plant, comfort and energy. Each is trusted for its own job, and
            the interfaces between them are kept simple and one-directional so that a fault or a bad
            change in one system cannot stop another doing its job.
          </p>
          <p>
            Where integration is pushed further, at the high end of smart building projects, the
            same principle still applies to anything touching life safety: the BMS monitors it and
            leaves the action to the system built for it.
          </p>
        </ConceptBlock>

        <Pullquote>
          The BMS can tell you a door is open. It should never be the reason a door opens.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>What the BMS sees</ContentEyebrow>

        <ConceptBlock
          title="The usual access control points on a BMS"
          plainEnglish="Mostly alarms and faults. A few points tell the operator a door has been left open or pushed; the rest tell them the access system itself needs attention."
          onSite="Ask the access installer for their output list early. What the BMS can show depends entirely on what the access controller can send."
        >
          <p>The points that typically appear on a BMS from an access system are:</p>
          <ul>
            <li>
              <strong>Door forced:</strong> the door contact opened when the controller had not
              released the lock. Someone has pushed, pulled or broken through.
            </li>
            <li>
              <strong>Door held open:</strong> the door was released properly but has not closed
              within the time set in the access system. Often a wedge, a delivery, or a faulty
              closer.
            </li>
            <li>
              <strong>Controller fault or offline:</strong> the access system has lost contact with
              a door controller, or the controller has reported a fault.
            </li>
            <li>
              <strong>Power supply faults:</strong> mains failed at the access power supply, battery
              low or battery fault. These matter because the doors are running on borrowed time.
            </li>
            <li>
              <strong>Tamper:</strong> a reader, controller or power supply enclosure has been
              opened or disturbed.
            </li>
            <li>
              <strong>Occupancy information:</strong> on some jobs, a count or an occupied flag by
              zone, worked out by the access system from entry and exit events.
            </li>
          </ul>
          <p>
            The BMS can log every one of these, trend them, and route them through its alarm
            handling. What it adds is context: a door held alarm on a plant room door next to a high
            temperature alarm in the same room tells an operator far more than either alarm on its
            own.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-3-held-forced"
          question="The BMS shows 'door held open' on a store room. What has the access system seen?"
          options={[
            'The door was opened without any valid release',
            'The reader has failed and the door cannot be released',
            'The fire alarm has released the door',
            'The door was released properly but has not closed within the set time',
          ]}
          correctIndex={3}
          explanation="Held means a legitimate release followed by the door staying open too long, worked out from the door contact and a timer in the access controller. Opened without a release is 'forced'. A reader fault would show as a fault point, not a held alarm."
        />

        <ConceptBlock
          title="Occupancy from the doors, and why the BMS gets less than you might expect"
          plainEnglish="Card swipes can tell the BMS which areas are in use, so it can run heating, cooling and lighting to suit. The BMS needs to know that a zone is occupied, not who is in it."
          onSite="If a specification asks for card holder names on the BMS, raise it. That is a data protection question for the client, not a wiring detail."
        >
          <p>
            Occupancy routines use some measure of whether a space is in use to drive ventilation,
            temperature and lighting. That measure can come from presence detectors (Section 4.2),
            from carbon dioxide levels, or from access control data. Access data is attractive
            because it already exists and covers the whole building.
          </p>
          <p>
            The catch is that every card transaction records a named person at a place and a time.
            Pulled together over weeks, that becomes a pattern of where people work, when they
            arrive and which rooms are used for sensitive meetings. That is useful to someone
            planning a crime or a protest as much as to a facilities manager. Good practice is to
            keep the transaction data in the access system, at building level, and pass the BMS only
            what it needs: counts or an occupied flag per zone.
          </p>
          <p>
            The same applies to where the data ends up. A BMS that pushes data to a cloud platform
            for analytics should not be carrying a copy of everyone&rsquo;s movements with it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>How the information gets there</ContentEyebrow>

        <ConceptBlock
          title="Hardwired: volt-free contacts into BMS inputs"
          plainEnglish="The access controller closes or opens a relay contact. The BMS reads that contact on a digital input. No voltage passes from one system to the other."
          onSite="Label both ends with the same point name the points schedule uses. Six months later, nobody will remember which relay on which controller was 'spare 3'."
        >
          <p>
            The simplest and most robust link is a set of relay outputs on the access controller,
            each wired as a volt-free contact to a digital input on a BMS outstation. One output per
            condition: door forced, door held, controller fault, power supply fault. The BMS
            supplies its own small sensing voltage to the input; the access system only opens or
            closes the contact.
          </p>
          <p>Three habits make this kind of interface dependable:</p>
          <ul>
            <li>
              <strong>Wire it to fail noisy.</strong> Use contacts that are closed when healthy and
              open on alarm. A cut cable, a loose terminal or a dead access controller then shows up
              as an alarm instead of looking like a quiet, healthy door.
            </li>
            <li>
              <strong>Keep it volt-free.</strong> Never pick up a BMS input from the lock supply or
              any other voltage in the access panel. That brings a foreign voltage into the
              outstation, and a fault on one system becomes a fault on both.
            </li>
            <li>
              <strong>Keep it one-way.</strong> The access system tells the BMS. Nothing comes back.
              If there is a genuine reason for the BMS to send anything to the access system, it is
              a design decision made by the security designer, documented, and never part of a
              life-safety function.
            </li>
          </ul>
          <p>
            Hardwiring is limited by the number of relays and inputs, so it suits a few important
            doors or a handful of summary alarms: &ldquo;any door forced in block A&rdquo; rather
            than one point per door on a large site.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsRelays}
          topic="Watch · How relay contacts work"
          caption="Watch for normally open and normally closed contacts. A door alarm wired through a normally closed contact that opens on alarm is the fail-noisy arrangement described above."
        />

        <ConceptBlock
          title="High-level: a network or gateway interface"
          plainEnglish="Instead of a relay per alarm, the access system shares its door and fault points with the BMS over a network link. More information, less wiring, and more to get right."
          onSite="Ask whether the link is read-only. If nobody knows, find out before handover, not after an incident."
        >
          <p>
            On larger sites the access head end and the BMS are often joined by a software
            interface: a protocol such as BACnet or Modbus, or a gateway provided by one of the
            manufacturers. This can bring every door&rsquo;s status onto the BMS without a relay or
            a cable per point. Section 5.5 covers gateways in general.
          </p>
          <p>Two things follow from using a network link to a security system:</p>
          <ul>
            <li>
              <strong>Direction.</strong> Many of these interfaces can write as well as read. The
              safe default is read-only. If writing is enabled, it should be because the security
              and fire designers asked for a specific function, in writing.
            </li>
            <li>
              <strong>Security.</strong> The access system is a security system. Linking it to the
              BMS network means a weakness in one can become a way into the other, and an attacker
              who can reach the doors through the BMS has found a very convenient route. Section 5.6
              covers network separation and remote access properly.
            </li>
          </ul>
          <p>
            Either way, the electrician&rsquo;s work is usually the cabling and containment to the
            interface point, and the power to the panels. The point mapping belongs to the controls
            and access engineers.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-3-fail-noisy"
          question="A door forced alarm is wired so the contact closes on alarm. The cable is later cut by another trade. What does the BMS show?"
          options={[
            'Door forced, because the contact has now opened',
            'A wiring fault alarm, because the BMS detects the break',
            'Nothing, and a real forced door later raises no alarm',
            'A fire alarm, because the input has gone open circuit',
          ]}
          correctIndex={2}
          explanation="With a close-on-alarm contact, a healthy door and a cut cable both look open circuit, so the BMS cannot tell them apart and the real alarm is lost. That is why the interface should use contacts that are closed when healthy and open on alarm."
        />

        <RegsCallout
          source="BS 7671 Regulation 528.1"
          clause="A Band I circuit shall not be contained in the same wiring system as a Band II circuit, and neither shall be in the same wiring system as a circuit exceeding low voltage, except where specified methods are adopted."
          meaning={
            <>
              <p>
                Access control panels often contain a mains-fed power supply alongside door
                controllers, relay outputs and the cable to your BMS inputs. Keep the interface
                cabling separate from the mains wiring, or use one of the permitted methods: for
                example insulation rated for the highest voltage present, or a separate conduit,
                trunking or ducting system.
              </p>
              <p>
                The interface circuits are auxiliary circuits under Section 557, and BS 7671
                Regulation 444.4.10 calls up BS EN 50174-1 and BS EN 50174-2 (with BS EN 50310 for
                bonding networks) for control, signalling and communication cabling inside a
                building. Separation distances live in BS EN 50174-2; BS 7671 itself does not give
                one.
              </p>
            </>
          }
          cite="Wording verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <SectionRule />
        <ContentEyebrow>Fire and the doors</ContentEyebrow>

        <ConceptBlock
          title="Release on fire belongs to the fire alarm system and the access interface"
          plainEnglish="When the fire alarm goes off, escape doors on access control have to let people out. The fire alarm system tells the access system to release them, through an interface designed for that job. The BMS just watches."
          onSite="If you are asked to wire a fire release, find out who designed the cause and effect and get it in writing. That person, not the BMS points schedule, tells you what goes where."
        >
          <p>
            Fire actions in a UK building (stopping plant, releasing doors, running smoke control)
            are driven by the fire detection and alarm system and its own interfaces. For
            access-controlled doors on escape routes, that usually means an output from the fire
            alarm system, through an interface unit, that removes power from the locks or tells the
            access controllers to release them. Door hold-open devices on fire doors are released
            the same way.
          </p>
          <p>
            The BMS is not in that chain. It may <em>monitor</em> the fire alarm status and the door
            status, and it may carry out follow-up actions that are not life safety, such as putting
            comfort plant into a fire mode or raising alarms to the operator. It does not release
            the doors, and it must not be used as a backup way of releasing them if the proper
            interface fails.
          </p>
          <p>
            The reasons are practical. The fire alarm system is designed, installed, maintained and
            tested to fire safety requirements; the BMS is not. A BMS controller can be offline for
            a software update, in Hand, mid-download or simply faulty. A door that depends on it to
            open in a fire depends on all of those being right at the worst possible moment. Keeping
            a clear separation between fire systems and the BMS protects the integrity of the fire
            system.
          </p>
          <p>
            The interface is normally arranged to fail towards release: if the cable from the fire
            alarm is cut or the interface loses power, the escape doors release rather than stay
            locked. It is the same &lsquo;closed when healthy&rsquo; idea as a plant safety chain,
            and it is one more reason the release must not pass through a BMS output, which fails to
            whatever state it was last in.
          </p>
          <p>
            The BS 7273 series of codes of practice covers the interface between fire detection and
            other systems. The design of that interface is for the fire alarm designer and the
            access system designer to agree. Your job is to install what they specify and to make
            sure nothing you add to the BMS sits in that path.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The emergency door release: the path that relies on nothing"
          plainEnglish="The green break-glass unit by an escape door lets a person release it with their own hand, without any controller, network or BMS being involved."
          onSite="Do not confuse the green emergency door release with a red fire alarm call point. They do different jobs and are wired to different systems."
        >
          <p>
            Even with a fire alarm interface in place, escape doors on access control usually have a
            manual emergency release beside them. It works directly on the lock power, so that if
            every controller and every network in the building has failed, a person standing at the
            door can still get out.
          </p>
          <p>
            The access system normally monitors these units too, and the BMS may receive a summary
            alarm when one is operated. That is the right way round: the release works first and on
            its own, and the information about it travels upwards afterwards.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-3-fire-path"
          question="Which arrangement correctly releases access-controlled escape doors on fire?"
          options={[
            'Fire alarm output to the BMS, which then switches the locks off',
            'Fire alarm interface to the access system; the BMS only monitors',
            'A BMS time schedule unlocks the doors whenever the building is occupied',
            'BMS reads fire status over a gateway and writes an unlock command',
          ]}
          correctIndex={1}
          explanation="The fire alarm system acts through an interface to the access system or the lock supply. The BMS may monitor fire and door status, but it is not in the release chain. Routing release through the BMS, by hardwire or by gateway, gives a non-life-safety system a life-safety job."
        />

        <Scenario
          title="The client wants a 'release all doors' button on the BMS"
          situation="You are finishing the BMS interface on a new office fit-out. During a site meeting the facilities manager asks the controls engineer to add a button to the BMS graphic that releases every access-controlled door, 'so we can let people out in a fire if the panel doesn't'. The controls engineer says it is easy: one BMS output to a relay in the access panel. You have been asked to run the cable."
          whatToDo="Do not run it on the strength of a site meeting. Say plainly that release on fire is the fire alarm system's job through its own interface, and that a BMS release would give a system not designed or tested for life safety a life-safety role. Ask for the request to go to whoever owns the fire strategy and the access system design. If the worry is that the fire interface might fail, the answer is to test and maintain that interface and the green emergency releases, not to add a second path through the BMS. Record the request and your response."
          whyItMatters="A BMS door release looks harmless and convenient. It also creates a way to unlock the building from a network-connected system, and it lets people believe the doors are covered when the BMS is offline, in Hand or mid-update. The fire strategy depends on known, tested paths. An extra one nobody designed weakens both fire safety and security at once."
        />

        <SectionRule />
        <ContentEyebrow>Fail-safe and fail-secure</ContentEyebrow>

        <ConceptBlock
          title="What a lock does when the power goes"
          plainEnglish="Fail-safe: no power, door free. Fail-secure: no power, door still locked. Everything else on this subject follows from those two lines."
          onSite="Before you isolate an access power supply, find out which locks are fail-safe. You may be about to leave an entrance or a secure room open, and someone needs to know."
        >
          <p>Every electric lock has a defined state with no power applied:</p>
          <ul>
            <li>
              <strong>Fail-safe</strong> (power to lock): power holds the door locked. Remove it and
              the door is free. An electromagnetic lock works this way by its nature: no current, no
              magnetic hold.
            </li>
            <li>
              <strong>Fail-secure</strong> (power to release): the door stays locked without power,
              and power has to be applied to release it. Many electric strikes and motorised locks
              can be supplied or set either way.
            </li>
          </ul>
          <p>
            In both cases the mechanical side still matters. A fail-secure door normally still opens
            from the inside by its handle or push bar, because the lock usually only stops entry
            from the secure side. What changes is whether someone outside can get in when the power
            has failed.
          </p>
          <p>
            The standby battery in the access power supply sits across all of this. It keeps
            fail-safe locks locked through a mains failure, for as long as it lasts. When it is
            flat, those doors release. This is why the &ldquo;mains failed&rdquo; and &ldquo;battery
            low&rdquo; points earn their place on the BMS: they warn that the building&rsquo;s
            security is about to change state.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Who decides which a door gets"
          plainEnglish="It is a design decision balancing escape against security. The installer fits what is specified and checks it does what the drawing says."
          onSite="If the lock you have been given behaves differently from the schedule, stop and ask. Swapping a fail-safe lock for a fail-secure one on an escape route is not a like-for-like change."
        >
          <p>
            Escape route doors have to let people out. Doors to server rooms, stores and plant areas
            often have to stay shut. Choosing fail-safe or fail-secure for each door, and the exit
            hardware that goes with it, is the job of the fire strategy and the security designer
            working together. It is recorded in the door schedule and the cause and effect.
          </p>
          <p>For the electrician and the BMS, this changes three practical things:</p>
          <ul>
            <li>
              <strong>Isolation.</strong> Switching off an access power supply can unlock a set of
              doors. Tell the site before you do it.
            </li>
            <li>
              <strong>Alarms.</strong> A power supply alarm on the BMS means different things for
              fail-safe and fail-secure doors. Operators should know which they are looking at.
            </li>
            <li>
              <strong>Testing.</strong> Proving a lock&rsquo;s fail state is part of commissioning
              the access system. Watch it done, and note the result against the door schedule.
            </li>
          </ul>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-3-fail-state"
          question="An access power supply's battery runs flat during a long power cut. What happens to a fail-safe electromagnetic lock?"
          options={[
            'It stays locked until mains returns',
            'It releases, leaving the door free',
            'It switches itself to fail-secure',
            'It sends a door forced alarm',
          ]}
          correctIndex={1}
          explanation="A fail-safe lock needs power to hold. The battery delays the release; it does not prevent it. When the battery is exhausted, the door is free. The power supply alarms on the BMS are the early warning that this is coming."
        />

        <CommonMistake
          title="Using a BMS output to switch lock power"
          whatHappens="To save a relay, a BMS digital output is wired to break the supply to a group of locks, with the idea of unlocking them on a time schedule or from the graphic. Now a BMS strategy download, a controller fault or an operator click can unlock or lock doors with no record in the access system. It also quietly puts the BMS in the path that a fire release or an emergency release depends on."
          doInstead="Leave lock power and lock control entirely to the access system, with fire release through the fire alarm interface and manual release through the green units. If the client wants doors unlocked on a schedule, that is a function of the access system's own timetables. The BMS reads status from volt-free contacts and does nothing to the locks."
        />

        <SectionRule />
        <ContentEyebrow>Testing it with the right people</ContentEyebrow>

        <ConceptBlock
          title="Commissioning the interface without blurring the boundaries"
          plainEnglish="Each system's engineer proves their own system. You prove the link between them, from the real device to the BMS screen."
          onSite="Book the access engineer for your point-to-point test. Without them you can prove the cable, but not that the right relay changes for the right condition."
        >
          <p>A tidy sequence for an access control interface looks like this:</p>
          <ul>
            <li>
              <strong>Before connecting:</strong> confirm the outputs on the access controller are
              volt-free and match the points schedule, insulation-test the interface cable before it
              is terminated at either end, and check the segregation in the panels.
            </li>
            <li>
              <strong>Point-to-point:</strong> with the access engineer, create each real condition
              at the door (open it without a release, hold it open past the timer, open a tamper)
              and confirm the right point changes on the BMS with the right name and the right alarm
              priority.
            </li>
            <li>
              <strong>Fail-noisy check:</strong> lift one interface wire and confirm the BMS goes
              into alarm. If it stays quiet, the contact sense is wrong.
            </li>
            <li>
              <strong>Fire release:</strong> witnessed by the fire alarm and access engineers, from
              a real fire alarm device, with the BMS only observing. Note on the BMS that the fire
              and door status points changed as expected; that is all the BMS proves.
            </li>
          </ul>
          <p>
            Record the results in the BMS commissioning records, cross-referenced to the access and
            fire alarm records, so that whoever maintains each system later can see where their
            responsibility stops.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="When an access alarm keeps appearing on the BMS"
          plainEnglish="The BMS is the messenger. A repeating door or fault alarm is usually telling you something real about the access system."
          onSite="Before anyone inhibits a nuisance door alarm, trend it for a week. The pattern often points straight at the cause."
        >
          <p>
            Door held alarms that repeat at the same doors at the same times usually mean a closer
            that needs adjusting, a door that is propped for deliveries, or a held-open time that
            does not suit how the door is used. Fault alarms that come and go at the same time each
            night can point at a power supply on a time switch, a controller sharing a supply with
            plant that starts on schedule, or a network task that runs overnight.
          </p>
          <p>
            None of those is fixed on the BMS. The BMS&rsquo;s value is the evidence: trends, times
            and patterns that the access maintainer can act on. Inhibiting the alarm on the BMS
            throws that evidence away and leaves a real door problem unwatched. Section 6.1 covers
            alarm handling and nuisance alarms in more depth.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can the BMS ever send anything to the access system?',
              answer:
                'Sometimes, for functions that are not life safety and that the security designer has asked for, such as passing a building mode. It should be documented, deliberate and limited. It should never include fire release, and the safe default for any interface is read-only.',
            },
            {
              question: 'Is it my job to decide whether a door is fail-safe or fail-secure?',
              answer:
                'No. It is set by the fire strategy and the security design and recorded in the door schedule. Your job is to fit what is specified, check it behaves as the schedule says, and raise it if the hardware you have been given does not match.',
            },
            {
              question: 'Does BS 7273 make fire door release a legal requirement?',
              answer:
                'The BS 7273 series is a set of codes of practice covering the interface between fire detection and other systems. Codes of practice are guidance, not law. The design of the release interface is a matter for the fire alarm and access designers, working to the fire strategy.',
            },
            {
              question: 'Why not just give the BMS the card holder data and let it do everything?',
              answer:
                'Because who went where, and when, is personal and security-sensitive information, and the BMS does not need it to run plant. Counts or an occupied flag by zone are enough for heating, cooling and lighting, and keep the sensitive records in the system built to protect them.',
            },
            {
              question:
                'The access installer says their alarm outputs switch the panel supply voltage. Can I wire them straight in?',
              answer:
                'Not to a BMS digital input expecting a volt-free contact. Ask for volt-free relay outputs, or put an interposing relay in the access panel so that only a clean contact reaches the BMS. Never bring the access system’s supply into the outstation.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'An access control system is a complete system with its own controllers, power and head end. The BMS sits beside it, not above it.',
            'The BMS typically monitors door forced, door held, controller, tamper and power supply faults, and may log and alarm on them.',
            'Door release on fire is done by the fire alarm system through its interface with the access system. The BMS is never in that path and never a backup for it.',
            'Fail-safe locks release on loss of power; fail-secure locks stay locked. The choice is a fire strategy and security decision recorded in the door schedule.',
            'Hardwired interfaces use volt-free contacts, closed when healthy and open on alarm, wired one-way and segregated per Regulation 528.1.',
            'High-level interfaces should be read-only by default and treated as a security risk to be managed, not just a convenience.',
            'Access data used for occupancy should reach the BMS as counts or flags by zone, not named transactions.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-4-section-2"
          prevLabel="Daylight and presence detection"
          nextHref="/study-centre/upskilling/bms-module-4-section-4"
          nextLabel="Blinds and shading"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule4Section3;
