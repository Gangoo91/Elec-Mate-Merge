/**
 * BMS Module 6 · Section 3 — Graphics and dashboards
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what a head-end graphic is
 * actually for (a window into what the controllers believe, and a place to adjust and
 * override), what makes one usable on site (a schematic that matches the installed plant, live
 * values with units, command and status shown separately, consistent status and alarm colours,
 * overrides that cannot hide, sensible navigation and access levels), how dashboards differ for
 * the facilities manager, the controls engineer and the energy manager, and how an electrician
 * uses graphics when commissioning and fault finding without trusting them blindly. The old
 * page ("BMS Dashboards and Visualisation") was a generic feature list with a quick-reference
 * card, a "300 mm"-style cabling checklist bolted on, and claims about dashboards "saving"
 * energy. That is all gone; the page now stays on the head end and how to use it well.
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

const TITLE = 'Graphics and dashboards | BMS Module 6.3 | Elec-Mate';
const DESCRIPTION =
  'What a BMS head-end graphic is for, what makes one usable, dashboards for different users, and how to use graphics when commissioning and fault finding.';

const outcomes = [
  'Explain what a head-end graphic shows, and why it shows what the controller believes rather than what the plant is doing',
  'Judge whether a plant graphic is usable: schematic, live values, units, status, alarms and overrides',
  'Tell a commanded state from a proven state on a graphic, and say why the difference matters',
  'Describe how dashboards should differ for a facilities manager, a controls engineer and an energy manager',
  'Use the graphics as part of point-to-point checks during commissioning',
  'Use a graphic as the first step of fault finding, then confirm at the controller and the field device',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A graphic shows a supply fan with spinning blades and the word RUNNING. What has that actually told you?',
    options: [
      'That the fan motor is turning at its design speed',
      'That the drive has confirmed the fan is delivering air',
      'Whatever point the animation is linked to',
      'That the fan has passed its proving check since start-up',
    ],
    correctIndex: 2,
    explanation:
      'An animation is only as honest as the point behind it. If it is linked to the start command, it spins whenever the controller asks for the fan, running or not. If it is linked to a proving input such as a differential pressure switch, it tells you air is moving. You have to find out which before you trust it.',
  },
  {
    id: 2,
    question:
      'Which of these makes a plant graphic most useful to someone who has never seen the plant room?',
    options: [
      'It follows the installed schematic, with units on every value',
      'Every available point is shown on one page, so nothing is hidden from view',
      'Each item of plant has its own colour so it stands out',
      'The graphic uses a three-dimensional model of the plant room',
    ],
    correctIndex: 0,
    explanation:
      'A stranger reads a graphic against the plant, so it has to match the plant, and every number needs a name and a unit to mean anything. Cramming every point on one page buries the important ones, and decorative colour fights with the colours that are meant to signal status and alarms.',
  },
  {
    id: 3,
    question:
      'A heating pump was replaced with a twin-head set last year. The graphic still shows one pump. Why is this more than a cosmetic problem?',
    options: [
      'The controller cannot run the second head until the graphic is redrawn',
      'People misread status, and a failed standby head goes unseen',
      'The pump will default to manual whenever the graphic is opened',
      'It is only cosmetic, as the controller logic is unaffected',
    ],
    correctIndex: 1,
    explanation:
      'The controller may well be running the duty and standby heads correctly, but nobody looking at the graphic can see which head is running or whether the standby has failed. A graphic that no longer matches the plant hides faults and sends people to the wrong place. The tempting answer — "only cosmetic" — ignores that people make decisions from that page.',
  },
  {
    id: 4,
    question:
      'On a well-built graphic, how should a point that has been put into manual override look?',
    options: [
      'Exactly the same as in automatic, so the page stays clean',
      'Hidden from the operator level so it cannot be undone by mistake',
      'Shown only in the alarm list, not on the plant graphic itself',
      'Marked on the graphic and listed on an override summary',
    ],
    correctIndex: 3,
    explanation:
      'Overrides are the thing most likely to be left on and forgotten, so they must stand out where people look and be gathered in one place where someone can review them. Hiding them, or making them look normal, is how a fan ends up running all weekend for months.',
  },
  {
    id: 5,
    question:
      'Why should points that come from real field inputs, such as a frost thermostat or a proving switch, be read-only on the graphics?',
    options: [
      'Because field inputs update too slowly to be written to',
      'Because the wiring already writes it, and two writers conflict',
      'Because read-only points use less network capacity on the bus',
      'Because operators are not trained to change digital points',
    ],
    correctIndex: 1,
    explanation:
      'The input gets its value from the wiring. If the graphic can also write to it, two sources fight over one point and one of them wins unpredictably. The rule is one writer per point. Where an operator genuinely needs to force something, that should be a proper override with its own flag, not a write over a live input.',
  },
  {
    id: 6,
    question:
      'Which dashboard content best suits an energy manager rather than a controls engineer?',
    options: [
      'Valve positions and loop outputs for each air handling unit',
      'A list of every controller with its communication status',
      'The full alarm history with acknowledgement times by operator',
      'Consumption by meter, compared across days and hours',
    ],
    correctIndex: 3,
    explanation:
      'An energy manager is asking where the energy goes and when. Meter data compared over time answers that. Loop outputs and controller comms are the engineer’s working tools, and the alarm history serves the facilities team; both would bury the energy picture.',
  },
  {
    id: 7,
    question:
      'During point-to-point testing you trip the frost thermostat at the coil. What should you be checking on the graphic?',
    options: [
      'That the right named point changes on the right graphic',
      'That the graphic refreshes faster than the trend log interval set',
      'That the frost point turns green, because green means safe',
      'Nothing — graphics are checked separately after handover',
    ],
    correctIndex: 0,
    explanation:
      'Point-to-point testing proves the whole chain: field device, wiring, controller input, point name and the graphic that displays it. A swapped input, a wrong label or a graphic linked to the wrong point all show up here and nowhere else as cheaply. Graphics are part of commissioning, not an afterthought.',
  },
  {
    id: 8,
    question: 'From an alarm in the alarm list, what should a well-built head end let you do?',
    options: [
      'Jump straight to the graphic of the plant concerned',
      'Reset the tripped plant directly from the alarm list',
      'Delete the alarm once the operator has read it',
      'Print the alarm with the full point history attached',
    ],
    correctIndex: 0,
    explanation:
      'Good navigation links every alarm to the graphic of the plant concerned, so the operator sees the context at once. Resetting latched plant is usually done at the plant after finding the cause. Deleting alarms loses the record, which must stay in the log.',
  },
  {
    id: 9,
    question:
      'A tenant complains it is cold. The graphic shows the zone at setpoint and the heating valve open. What should you do next?',
    options: [
      'Tell the tenant the system shows it is working',
      'Raise the setpoint from the graphic and close the job',
      'Replace the zone sensor, as it must be reading high',
      'Measure the room and check the valve at the plant',
    ],
    correctIndex: 3,
    explanation:
      'The graphic shows what the controller believes. A sensor in the wrong place, a valve commanded open but stuck shut, or a point linked to the wrong zone would all give this picture. Confirm with your own instrument and eyes before changing anything; raising the setpoint just hides the fault.',
  },
  {
    id: 10,
    question: 'Why do sites commonly give different user levels different access on the head end?',
    options: [
      'So only trained, authorised people can change or override',
      'Because each user level needs its own licence from the manufacturer',
      'So that the graphics load faster for users with fewer pages',
      'Because a facilities manager may only view graphics, never alarms',
    ],
    correctIndex: 0,
    explanation:
      'A hierarchical password scheme limits who can change what. Viewing, acknowledging alarms, changing setpoints and editing strategy carry very different risks, so they sit at different levels. It is about preventing misuse and mistakes, not licensing or speed, and facilities staff normally do handle alarms.',
  },
];

const BMSModule6Section3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 3"
        title="Graphics and dashboards"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Most people meet the BMS through its graphics. This page covers how to read them, and how
          to tell when a graphic is wrong.
        </p>

        <TLDR
          points={[
            'A head-end graphic is a window into the controllers. It shows what they believe, which is not always what the plant is doing.',
            'A usable graphic matches the installed plant, gives every live value a name and a unit, and shows status, alarms and overrides so they cannot be missed.',
            'Command and status are different points. A fan that is asked to run and a fan that is proven to be running should never look the same.',
            'Different people need different views: the facilities manager wants what needs attention, the engineer wants the loops, the energy manager wants the meters.',
            'For an electrician the graphic is a test instrument — use it to prove points during commissioning and as the first step in fault finding, then confirm in the field.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What the graphic is for</ContentEyebrow>

        <ConceptBlock
          title="A window into the controllers, not into the plant room"
          plainEnglish="The graphic is a drawing of the plant with numbers and symbols that update from the controllers. It shows what the controllers have been told by their inputs and what they are asking the outputs to do."
          onSite="Before you trust any graphic, ask two questions: which point is this symbol linked to, and is that point a measurement, a command or a calculated value?"
        >
          <p>
            The head end (often still called the central station) is the computer, server or web
            interface where people view the BMS. Its graphics are drawings of the building services
            — a plant room, an air handling unit, a floor plan — with live values and states laid
            over them. Those values come from the outstations and controllers over the network. The
            head end itself normally does very little controlling; the strategies run in the
            controllers, which carry on whether anyone is looking or not.
          </p>
          <p>The head end gives people three things:</p>
          <ul>
            <li>
              <strong>Visibility</strong> — what the plant is doing now, what it was doing earlier
              (through trends, covered in the last section), and what has gone wrong (through
              alarms, covered in 6.1).
            </li>
            <li>
              <strong>Adjustment</strong> — changing setpoints, time programmes and other settings
              without opening a panel.
            </li>
            <li>
              <strong>Manual override</strong> — forcing an item of plant on, off or to a position,
              for maintenance, testing or a short-term need.
            </li>
          </ul>
          <p>
            The important word is <em>believe</em>. Every symbol on a graphic is linked to a data
            point in a controller. A temperature is whatever the sensor input is reading, right or
            wrong. A fan symbol spins because a point says it should. If the sensor has drifted, the
            cable is on the wrong terminal or the symbol was linked to the wrong point when the
            graphic was drawn, the graphic will show a confident, tidy and wrong picture.
          </p>
          <p>
            Graphics are normally drawn from the control schematics in the design documents. Those
            schematics show what each point is and where it sits on the plant, and the graphics
            engineer builds the screen from them. So a good graphic starts with a good schematic and
            an accurate points schedule, both of which come up again in Section 7.1 (Design
            documents).
          </p>
        </ConceptBlock>

        <Pullquote>
          The graphic shows you what the controller believes. Your job is to find out whether the
          controller is right.
        </Pullquote>

        <InlineCheck
          id="bms-6-3-believes"
          question="The graphic shows a chilled water valve at 100% open. Which statement is safest?"
          options={[
            'The valve is fully open',
            'Chilled water is flowing through the coil at full rate',
            'The actuator has proved its full-open position back to the controller',
            'The controller is asking for it fully open — that is all',
          ]}
          correctIndex={3}
          explanation="Many valve actuators on a BMS have a command signal and no position feedback, so the figure on the graphic is usually the controller's output. A seized valve, a slipped linkage or a dead actuator would show exactly the same. Only a feedback point, or your own eyes on the actuator, tells you where it really is."
        />

        <SectionRule />
        <ContentEyebrow>What makes a graphic usable</ContentEyebrow>

        <ConceptBlock
          title="It has to match the plant that is actually installed"
          plainEnglish="If the drawing on the screen does not look like the pipework and ductwork in front of you, nobody can use it to find anything."
          onSite="When plant is changed — a pump set replaced, a coil added, a zone split — the graphic and the points schedule need updating as part of the same job. Ask who is doing it before you leave site."
        >
          <p>
            A plant graphic should follow the installed schematic: the same items of plant, in the
            same order along the water or air path, with sensors drawn where they really are. A
            supply air temperature sensor drawn upstream of the heating coil when it is fitted
            downstream will mislead the next person who tries to work out why the air is cold.
          </p>
          <p>Things that make a graphic match the plant:</p>
          <ul>
            <li>
              Plant drawn in flow order — for an air handling unit, typically fresh air intake,
              dampers, filters, coils, fan, then out to the duct.
            </li>
            <li>
              Every item labelled with the same reference used on the drawings, the panel and the
              plant itself — not a nickname only the installer knows.
            </li>
            <li>
              Duty and standby plant shown as separate items, each with its own status, so you can
              see which one is running and whether the other is available.
            </li>
            <li>
              Abbreviations and names that are the same on the graphics, the points schedule and the
              alarm text. A frost stat called <em>FRS</em> on one page and <em>Frost T</em> on
              another wastes time and causes mistakes; checking that consistency is a recognised
              commissioning step.
            </li>
          </ul>
          <p>
            Graphics drift out of date for a simple reason: plant gets changed by trades who do not
            touch the BMS, and nobody tells the controls contractor. The controller may be
            reprogrammed and work perfectly while the graphic still shows the old arrangement.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Live values need a name, a unit and a setpoint beside them"
          plainEnglish="A bare number on a screen means nothing. Say what it is, what unit it is in, and what it is supposed to be."
          onSite="If you find a value on a graphic with no unit, check the points schedule. A pressure in pascals and one in kilopascals can look alike on a crowded page."
        >
          <p>
            Every live value on a graphic should answer three questions without the reader having to
            hunt: what is this, in what unit, and what should it be? In practice that means:
          </p>
          <ul>
            <li>
              <strong>A label</strong> that says which measurement it is — supply air temperature,
              return water temperature, duct static pressure.
            </li>
            <li>
              <strong>A unit</strong> — °C, %RH, Pa, kPa, l/s, kW. Percentages need saying what they
              are a percentage of: valve open, fan speed, damper position.
            </li>
            <li>
              <strong>The setpoint</strong> next to the measured value it controls, so the
              difference between the two can be seen at a glance.
            </li>
            <li>
              <strong>The control output</strong> for that loop where it helps — the valve or fan
              speed the controller is asking for — so you can see whether the loop is working hard
              or idling.
            </li>
          </ul>
          <p>
            Values should also show when they cannot be trusted. Most head ends can flag a point
            that has lost communication, one that is overridden, or one whose sensor has failed open
            or short circuit. A graphic that just keeps showing the last good number with no flag is
            dangerous: a temperature that has not moved for two days looks perfectly reasonable
            until you notice it has not moved.
          </p>
          <p>
            Update speed matters too. Values travel from sensor to controller and controller to head
            end, and the time that takes is something commissioning should check. A graphic that
            lags well behind the plant will catch you out when you are testing.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Command and status are two different points"
          plainEnglish="Telling a fan to run and knowing it is running are separate things. A good graphic shows both, and shows clearly when they disagree."
          onSite="Look at what drives the animation. If the fan spins as soon as the start command goes out, the graphic will look fine with the motor isolated at the local isolator."
        >
          <p>
            For a fan or pump there are usually at least two digital points. The{' '}
            <strong>command</strong> is the output the controller sends to the starter or drive. The{' '}
            <strong>status</strong> is an input that comes back to prove the plant responded — an
            auxiliary contact on the contactor, a run relay on the drive, or, better, a differential
            pressure or flow switch that proves air or water is actually moving.
          </p>
          <p>
            Those prove different things. An auxiliary contact proves the contactor pulled in; it
            does not prove the belt is on the fan. A differential pressure switch across the fan
            proves air is moving. Knowing which one the site uses tells you how much to read into a
            green fan symbol.
          </p>
          <p>A well-built graphic shows:</p>
          <ul>
            <li>Commanded on and proven running — normal running.</li>
            <li>Commanded off and proven stopped — normal off.</li>
            <li>Commanded on but not proven — a fail to start, normally alarmed after a delay.</li>
            <li>
              Commanded off but still proven running — a stuck contactor, a hand position on the
              starter, or a status input wired to the wrong thing.
            </li>
          </ul>
          <p>
            The last two are exactly the conditions you want to catch, and a graphic that animates
            from the command alone cannot show either of them.
          </p>
        </ConceptBlock>

        <Scenario
          title="The supply fan that was always running"
          situation="A school office is stuffy every morning. The head end shows the air handling unit supply fan spinning, green and labelled running from the start of the occupied period. The caretaker is adamant the BMS is fine because the screen says so."
          whatToDo="Go to the plant before touching any setting. At the unit the fan is stationary. At the panel the start relay is energised and the contactor is in, but the drive shows a trip. Back at the head end, look at what the fan animation is linked to: it is the start command, not the drive run relay, and the differential pressure switch input is not on the graphic at all. Read and record the drive's fault code and find out why it tripped before anyone resets it. Then reset it with the person responsible for the plant, and report the graphic to the controls contractor so the animation is relinked to the proving input and a command and status mismatch alarm is added."
          whyItMatters="The graphic was not lying about the controller — the controller really was asking for the fan. It was showing the wrong point as if it proved the plant. Once a graphic is linked to proof of running, the same fault would raise an alarm the first morning instead of turning into weeks of complaints."
        />

        <InlineCheck
          id="bms-6-3-command-status"
          question="A pump is commanded off on the graphic but its status shows running. Which of these is a likely cause?"
          options={[
            'The pump is working normally',
            'The starter is in Hand, or a contactor has stuck in',
            'The time programme has ended earlier than expected',
            'The return water temperature sensor has failed',
          ]}
          correctIndex={1}
          explanation="Off command with a running status means something other than the controller is keeping the pump on: a hand position on a hand/off/auto switch, a welded or stuck contactor, or a status input wired to the wrong contact. The time programme only changes the command, and a temperature sensor has nothing to do with this mismatch."
        />

        <SectionRule />
        <ContentEyebrow>Colour, alarms and overrides</ContentEyebrow>

        <ConceptBlock
          title="Colour should mean one thing, everywhere on the site"
          plainEnglish="If red means fault on one page, it must mean fault on every page. Colour is a signal, not decoration."
          onSite="Ask for the site's colour legend, or find it on the graphics. If there is none, that is worth raising at handover, because people will guess."
        >
          <p>
            Colour is the fastest way to draw the eye, which is why it has to be used sparingly and
            consistently. A common simple convention is green for running, red for a fault and grey
            for off. Some sites go further and shade floor plans by what the zone is doing, for
            example warm colours where heating is active and cool colours where cooling is active,
            with a fault colour that overrides both.
          </p>
          <p>
            There is no single scheme every site uses, and some older systems use red for running
            and green for stopped, which is the convention on many motor control panels. What
            matters is that:
          </p>
          <ul>
            <li>the scheme is the same across every graphic on the site;</li>
            <li>it is written down where operators can see it;</li>
            <li>alarm and fault colours are not reused for anything decorative;</li>
            <li>
              colour is never the only cue — a word or symbol such as <em>FAULT</em>, <em>OFF</em>{' '}
              or <em>HAND</em> goes with it, because not everyone sees colour the same way and
              screens in plant rooms are often poor.
            </li>
          </ul>
          <p>
            Alarms on graphics work best when an item of plant in alarm is marked on its own
            graphic, the overview page shows that something below it is in alarm, and the alarm list
            links straight to the graphic of the plant concerned. The alarm priorities,
            acknowledgement and escalation themselves were covered in 6.1.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Overrides must be impossible to miss"
          plainEnglish="Anything forced on, off or to a fixed value from the head end should look different from normal, and there should be one place that lists every override in force."
          onSite="Before you leave site, check the override summary and clear anything you set. If you must leave one in, record why, who agreed it and when it should come out."
        >
          <p>
            Head-end overrides are useful. You can run a pump for a flushing exercise, hold a valve
            open while balancing, or keep a hall heated for an evening event without anyone visiting
            the plant. The trouble is that they stay put. An override does not get tired or go home,
            and the person who set it often does.
          </p>
          <p>
            A good graphic marks every overridden point clearly — a different colour, a symbol, a
            word such as <em>MAN</em> or <em>OVR</em> — and the head end keeps a summary page of all
            points currently in override. Some sites add an alarm, or a report, for any override
            that has been in place longer than they consider reasonable. Without those, the first
            sign of a forgotten override is often the energy bill or a comfort complaint months
            later.
          </p>
          <p>
            A related trap is a sensor value overridden to a fixed number to get a loop running
            during commissioning. The graphic shows a sensible temperature, the plant runs, and the
            real sensor may never be checked again.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Overriding from the graphic and walking away"
          whatHappens="During a fault visit an engineer forces a heating pump on from the head end to keep a building warm while a sensor is replaced. The sensor is fitted, the job is signed off, and the override stays. The pump runs day and night through the summer, and because the graphic shows it as simply running, nobody notices until a bearing fails."
          doInstead="Treat every override as something you have borrowed. Record it when you set it, check the override summary before you leave, and hand the system back in automatic. If an override has to stay, agree it with the site, note the reason and a review date in the BMS log book, and tell the person responsible for the system."
        />

        <SectionRule />
        <ContentEyebrow>Getting around the system</ContentEyebrow>

        <ConceptBlock
          title="Navigation: overview, system, plant, point"
          plainEnglish="You should be able to get from the site overview to the exact point you want in a few obvious clicks, and back again."
          onSite="Try the navigation yourself at handover as if you were a new caretaker. If you cannot find the boiler house from the home page without help, neither will they."
        >
          <p>
            Most sites arrange graphics as a hierarchy. A site or building overview shows each
            system with a summary status. From there you drill into a system — heating, chilled
            water, ventilation, lighting — and then into individual plant items. Floor plans with
            clickable zones are another route in, which suits people who think in rooms rather than
            in plant.
          </p>
          <p>Things that make navigation work:</p>
          <ul>
            <li>
              From any alarm in the alarm list, a link straight to the graphic of the plant
              concerned, so the operator sees the context at once.
            </li>
            <li>
              A consistent way back up — a home button and a breadcrumb or back link in the same
              place on every page.
            </li>
            <li>
              Links that follow the plant: from the boiler graphic to the heating circuits it
              serves, from an air handling unit to the zones it supplies.
            </li>
            <li>
              From any point, a quick route to its trend, its alarm settings and, where the user is
              allowed, its override.
            </li>
            <li>From any alarm, a direct jump to the graphic of the plant concerned.</li>
            <li>
              A few, well-filled pages rather than one huge page with every point on it. Too much on
              one screen means the important value is the hardest one to find.
            </li>
          </ul>
          <p>
            Graphics are increasingly viewed in a web browser, including on tablets and phones. That
            is convenient on site, but a page designed for a large monitor can be unreadable on a
            phone, so it is worth checking how the important pages look on the devices people
            actually use.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Who can change what"
          plainEnglish="Looking at the BMS and changing it are very different things. Most systems use user levels and passwords so people can only do what they are trained and authorised to do."
          onSite="Never use somebody else's login, and never leave the head end logged in at a high access level when you walk away from it."
        >
          <p>
            A head end normally has a hierarchy of user levels protected by passwords. A typical
            split looks like this, though the names and boundaries vary between systems:
          </p>
          <ul>
            <li>
              <strong>View only</strong> — see graphics, values and trends.
            </li>
            <li>
              <strong>Operator</strong> — also acknowledge alarms, adjust time programmes and
              setpoints within set limits.
            </li>
            <li>
              <strong>Engineer</strong> — also override plant, change control parameters and alarm
              settings.
            </li>
            <li>
              <strong>Administrator or programmer</strong> — edit strategies, graphics, users and
              system settings.
            </li>
          </ul>
          <p>
            Graphics should respect those levels. A setpoint shown to a view-only user should be
            read-only to them. Points that come straight from field inputs — a frost thermostat, a
            proving switch, a sensor — should be read-only to everyone, because the wiring is
            already writing that value. Letting the head end write to the same point as the field
            input means two writers fighting over one value, with unpredictable results. The rule
            worth remembering is one writer per point.
          </p>
          <p>
            Every change made at the head end should be logged with who made it and when. That
            record is often the quickest answer to the question &ldquo;what changed?&rdquo; when a
            building suddenly starts misbehaving.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Dashboards for different people</ContentEyebrow>

        <ConceptBlock
          title="One building, three different screens"
          plainEnglish="A dashboard is a summary page built for a particular person's job. The facilities manager, the controls engineer and the energy manager all look at the same BMS but need different answers from it."
          onSite="When someone says the BMS is useless to them, ask what question they are trying to answer. Often the data is there but nobody built the page that answers their question."
        >
          <p>
            Plant graphics show the system as it is built. Dashboards turn it around and show what a
            particular person needs to know, pulled from many systems onto one page. A good
            specification describes graphics and dashboards for the different levels of staff who
            will use them, rather than one set of screens for everyone.
          </p>
          <p>
            <strong>The facilities manager</strong> wants to know what needs attention today. Their
            dashboard is usually a short list: active alarms by priority, items of plant in fault or
            override, zones out of their comfort band, and perhaps occupancy against the time
            programmes. Little detail, quick links to the problem, and nothing that needs a controls
            background to understand.
          </p>
          <p>
            <strong>The controls engineer</strong> wants to see how the system is working. Their
            pages are the plant graphics themselves plus summaries that help diagnose: loops with
            their setpoint, measured value and output side by side, controllers and their
            communication status, overrides in force, points in fault, and quick access to trends.
          </p>
          <p>
            <strong>The energy manager</strong> wants to know where the energy goes and when. Their
            dashboard is built around meters: consumption by building, by system and by time of day,
            comparisons with previous periods, and use outside occupied hours. That is the subject
            of the next section.
          </p>
          <p>
            Some buildings add a fourth audience — tenants or occupants — with a simple page for
            their own area, perhaps with limited adjustment of their own setpoint. Those pages need
            access control so one tenant cannot see or change another&rsquo;s space.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-3-dashboards"
          question="The facilities manager says the head end is too complicated to use. What is the most useful response?"
          options={[
            'Give them the engineer login so they can see everything',
            'Arrange more training on the plant graphics',
            'Find out what they need daily and get a dashboard built for it',
            'Turn off the less important alarms so that the screens are quieter',
          ]}
          correctIndex={2}
          explanation="The plant graphics are an engineer's tool. A facilities manager needs a summary of what needs attention, built around their questions. Handing over an engineer login adds risk, training does not change a page that was never designed for them, and silencing alarms hides problems rather than making them clearer."
        />

        <ConceptBlock
          title="KPIs and summaries only help if the data underneath is right"
          plainEnglish="A dashboard figure is often calculated from several points. If one of those points is wrong, the headline number is wrong, and it looks just as convincing."
          onSite="When a dashboard figure looks odd, trace it back to the points it is built from before arguing about what it means."
        >
          <p>
            Dashboards lean heavily on calculated values: a building&rsquo;s total consumption added
            up from sub-meters, a count of zones out of band, a percentage of plant available. Each
            one is only as good as its inputs. A meter with the wrong pulse value, a sub-meter left
            out of a total, or a zone sensor that has failed and is reading a fixed value will all
            produce a clean-looking dashboard figure that is simply wrong.
          </p>
          <p>
            That is why it matters that the points are proven before anyone builds conclusions on
            them, and why a dashboard should make it easy to drill down from any figure to the
            points behind it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Using graphics on the job</ContentEyebrow>

        <ConceptBlock
          title="Commissioning: the graphic is part of what you are proving"
          plainEnglish="When you test a point, you are proving the whole chain from the field device to the graphic. If any link is wrong — wiring, input, name or graphic — this is the cheapest time to find it."
          onSite="Work in pairs where you can: one at the device, one at the head end or a laptop on the controller, talking by phone or radio. Record each result as you go."
        >
          <p>
            Point-to-point testing (covered fully in Section 7.5, Commissioning) means operating
            each field device and confirming the right point responds. For the electrician, the
            graphic is the easiest place to watch that response, and the graphics themselves are
            part of what is being accepted. In practice:
          </p>
          <ul>
            <li>
              <strong>Digital inputs</strong> — operate the device (trip the frost thermostat, open
              the filter switch, pull the auxiliary contact) and check the right point changes on
              the right graphic, with the right name and the right state shown.
            </li>
            <li>
              <strong>Analogue inputs</strong> — compare the graphic value with a calibrated
              instrument at the sensor. Check the unit and the scaling, not just that the number
              moves.
            </li>
            <li>
              <strong>Digital outputs</strong> — override the output from the head end, under the
              agreed permit and with plant safe to run, and confirm the plant responds and the
              status comes back.
            </li>
            <li>
              <strong>Analogue outputs</strong> — drive the output through its range and watch the
              valve or damper move the right way, fully open and fully shut where the graphic says
              it is.
            </li>
          </ul>
          <p>
            Beyond individual points, commissioning should confirm that every graphic page loads and
            shows live data, that names and abbreviations are consistent between graphics and text,
            that alarms display and link correctly, and that password levels work as intended. Hard
            copies or screenshots of the graphics normally go into the handover documents.
          </p>
          <p>
            And when the testing is done, every override you used goes back to automatic. A
            commissioning override left in is still an override.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Fault finding: start at the graphic, finish in the field"
          plainEnglish="The graphic is the quickest place to start because it shows the whole system at once. It is never the place to finish, because it can be wrong."
          onSite="A clamp meter or thermometer of your own beats any number on a screen. Use the graphic to decide where to go, then measure."
        >
          <p>
            Faced with a complaint — too hot, too cold, plant not running — the head end lets you
            narrow things down before you pick up a tool. A useful order:
          </p>
          <ul>
            <li>
              <strong>Look at the plant graphic.</strong> Are the measured value and setpoint where
              you would expect? What is the controller asking the valve or fan to do?
            </li>
            <li>
              <strong>Look for flags.</strong> Any override, hand indication, point in fault or lost
              communication on this plant or the plant that serves it?
            </li>
            <li>
              <strong>Compare command and status.</strong> If the controller is asking for something
              and the plant is not proving it, the fault is between the output and the plant.
            </li>
            <li>
              <strong>Check the trend.</strong> When did it start, and what else changed at the same
              time? Trends were covered in the last section.
            </li>
            <li>
              <strong>Confirm in the field.</strong> Measure the real temperature, see the real
              valve position, check the real starter. That is where you find out whether the
              controller&rsquo;s belief was right.
            </li>
          </ul>
          <p>
            The pattern you are looking for is a mismatch. Graphic says open, actuator is shut.
            Graphic says room is warm, your thermometer says it is not. Graphic says running, motor
            is still. Each mismatch tells you which link in the chain to look at next. Section 7.7
            (Fault finding on a BMS) builds this into a full fault-finding method.
          </p>
        </ConceptBlock>

        <Scenario
          title="A cold classroom that looks fine on screen"
          situation="A teacher reports a classroom has been cold all week. On the head end, the zone temperature sits on its setpoint and the radiator valve output is low, as if the room needs no heat. The value has barely moved for days."
          whatToDo="Note the flat line and check the trend: the zone value stopped changing on the day the complaints started. Take your own thermometer into the room — it is well below setpoint. At the room sensor you find it has been moved behind a cupboard next to a warm riser during a refurbishment. Report the relocation to the site and the controls contractor, agree a proper sensor position, and once it is moved check the graphic tracks your thermometer as the room warms."
          whyItMatters="Every link in the chain was working except the first one. The controller was faithfully controlling the temperature it was given. Only by leaving the screen and measuring in the room did the real fault show up — and a value that stopped moving was the clue on the graphic all along."
        />

        <InlineCheck
          id="bms-6-3-fault-order"
          question="During point-to-point testing of a duct temperature sensor, what proves the analogue input is right?"
          options={[
            'The graphic value moves when you warm the sensor',
            'It matches a calibrated reference, in the right unit',
            'The point name matches the one on the points schedule',
            'The value holds steady over several minutes',
          ]}
          correctIndex={1}
          explanation="An analogue input is proved by comparing the graphic value with a calibrated instrument at the sensor, and by checking the unit and scaling. A value that moves only proves something is connected. A correct name proves the label, and a steady value proves nothing about accuracy."
        />

        <FAQ
          items={[
            {
              question: 'Do I need to be able to draw BMS graphics as an electrician?',
              answer:
                'Usually not. Graphics are built by the controls contractor or system integrator in the manufacturer’s software. What you do need is to read them confidently, know which point a symbol is showing, and use them to prove your wiring during commissioning and to start fault finding.',
            },
            {
              question: 'The graphic and my meter disagree. Which one do I believe?',
              answer:
                'Your calibrated instrument at the device, every time — then work out why the BMS disagrees. Common reasons are a sensor in the wrong place, the wrong sensor type or scaling set in the controller, a point overridden to a fixed value, a cable on the wrong input, or a graphic linked to the wrong point.',
            },
            {
              question: 'Can I override plant from the head end to test my work?',
              answer:
                'Only with the access level and permission to do so, and with the plant safe to run under whatever permit or isolation arrangement is in place. Record the override, and put the point back to automatic before you leave. Safety devices that are hardwired upstream of the BMS will still act whatever you do at the head end, which is how it should be.',
            },
            {
              question: 'Why does the same site look different on a laptop and on the wall screen?',
              answer:
                'Many head ends are now web-based and scale their pages to the screen. Some graphics were drawn for one screen size and do not scale well. That is a quality issue worth raising, especially for pages people use on tablets in the plant room.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A graphic shows what the controllers believe. Treat it as a strong lead, not proof.',
            'Usable graphics match the installed plant, label every value with a unit, and put setpoint and output beside the measured value.',
            'Command and status are separate points. Animation should follow proof of running, and a mismatch should alarm.',
            'Colour must mean the same thing everywhere on the site, be written down, and never be the only cue.',
            'Overrides must be visible on the graphic and on a summary page — and cleared before you leave.',
            'Dashboards should answer each user’s questions: attention for the facilities manager, loops for the engineer, meters for the energy manager.',
            'In commissioning and fault finding, start at the graphic and finish with your own measurement in the field.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6-section-2"
          prevLabel="Trend logging"
          nextHref="/study-centre/upskilling/bms-module-6-section-4"
          nextLabel="Energy monitoring and reporting"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section3;
