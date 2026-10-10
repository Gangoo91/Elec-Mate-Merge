/**
 * BMS Module 7 · Section 6 — Handover
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches handover as a formal acceptance
 * with evidence behind it: what acceptance needs, the O&M information and building log book
 * Approved Document L expects the owner to receive, as-fitted drawings and the points
 * schedule, software backups and passwords, training the people who will run the system,
 * defects and aftercare (including the soft landings approach), and what the electrician
 * hands over for their own work. The old page carried invented training durations, a
 * "30-day phone support" suggestion, an insurance-invalidation quiz answer and sales advice;
 * all of that is gone, and every duty on this page is tied to a source line in the notes.
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

const TITLE = 'Handover | BMS Module 7.6 | Elec-Mate';
const DESCRIPTION =
  'Handing over a BMS: acceptance and evidence, O&M information and the building log book, as-fitted drawings, backups and passwords, training, defects and aftercare.';

const outcomes = [
  'Explain what has to be in place before a BMS is formally accepted, and how partial acceptance should be recorded',
  'Describe what Approved Document L expects the building owner to receive, including the building log book',
  'List the controls documents a client needs to run and maintain the system: as-fitted drawings, points schedule, configuration records',
  'Hand over software backups and access safely, with default passwords changed and named user accounts',
  'Plan training around the people who will actually run the building, and record that it happened',
  'Say what the electrician delivers at handover for their own work, and how it ties into the controls documents',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Final acceptance of a BMS normally comes later than acceptance of the commissioning. What does it usually need in addition?',
    options: [
      'The building in use, training done and a defects period agreed',
      'A second full round of point-to-point tests witnessed by the client',
      'A notice from building control approving the BMS strategy',
      'A signed statement that no alarms have occurred for a month',
    ],
    correctIndex: 0,
    explanation:
      'Final acceptance normally needs the building to be in use, the documentation delivered, the training done and a defects rectification period agreed. A full repeat of point-to-point testing is not the norm, building control does not approve a BMS strategy, and an alarm-free month is not an acceptance criterion.',
  },
  {
    id: 2,
    question:
      'In England, where does Approved Document L say the operating and maintenance instructions for fixed building services should be given to the owner?',
    options: [
      'In a building log book, which may refer to the O&M manuals',
      'On the head-end graphics, so the operator can always find them',
      'Only to building control, who pass them on when asked',
      'In the health and safety file, which replaces the log book',
    ],
    correctIndex: 0,
    explanation:
      'Approved Document L says the operating and maintenance instructions go to the owner in a building log book. The log book can draw on or point to other documents such as the O&M manuals or the health and safety file, but it does not get replaced by them. Graphics are not a substitute for written information.',
  },
  {
    id: 3,
    question:
      'Which item does Approved Document L specifically say should be included in the information given to the owner, alongside the operating information?',
    options: [
      'The controls contractor’s software licence agreement',
      'A copy of the completed commissioning records',
      'The tender price breakdown for the controls package',
      'The manufacturer’s marketing brochure for the controllers',
    ],
    correctIndex: 1,
    explanation:
      'The completed commissioning records are named in the guidance as part of what the owner receives. They prove the system was set to work and tested. A licence agreement may well be handed over too, but it is not what the guidance lists, and prices and brochures have no place in the log book.',
  },
  {
    id: 4,
    question:
      'At handover the head end still logs in with the manufacturer’s default username and password. What should happen?',
    options: [
      'Leave it, because the client can change it whenever they like',
      'Write the default details in the O&M manual so nobody gets locked out',
      'Change it after the defects period, once the system has settled down',
      'Change it before go-live and give each user a named account',
    ],
    correctIndex: 3,
    explanation:
      'Default credentials should be replaced before the system is put into service, and each user should have their own named login. Default passwords are widely published and are a well-known way into building systems. Recording them in the manual just makes the weakness permanent.',
  },
  {
    id: 5,
    question:
      'Why should a controls engineer prove a software backup by restoring it, rather than just confirming the file exists?',
    options: [
      'Because restoring it is the only way to update the controller firmware',
      'Because a backup that will not restore is useless when needed',
      'Because the client will not pay until a restore has been witnessed on site',
      'Because backups are deleted automatically unless they are restored',
    ],
    correctIndex: 1,
    explanation:
      'A file can be present, named sensibly and still be incomplete, corrupt or for the wrong version. The only proof is a restore. Firmware updates are a separate job, and payment terms vary by contract, so neither is the reason.',
  },
  {
    id: 6,
    question:
      'Why should operator training explain what Hand/Off/Auto switches and software overrides do?',
    options: [
      'An override left on is the commonest way performance drifts',
      'Operators need it to change the strategy when the engineer is away',
      'Operators are expected to rewire starters when a switch fails',
      'Overrides are the quickest way to save energy in a busy building',
    ],
    correctIndex: 0,
    explanation:
      'An override left on is the commonest way a building’s performance drifts, so operators need to know what Hand/Off/Auto switches and software overrides do and why they must be released. Operators are not trained to change the strategy or rewire starters, and overrides waste energy far more often than they save it.',
  },
  {
    id: 7,
    question:
      'A BMS is handed over in January. Why is a review in the first summer worth planning into aftercare?',
    options: [
      'Because cooling could not be fully proved under winter conditions',
      'Because Approved Document L requires every BMS to be recommissioned each summer',
      'Because the controllers need their clocks resetting by hand for British Summer Time',
      'Because trend logs are deleted after a few months unless someone reviews them',
    ],
    correctIndex: 0,
    explanation:
      'Seasonal plant only shows how it really behaves in the season it is built for. A winter handover leaves cooling, free cooling and summer setpoints largely unproved, so a first-year review is planned to catch them. There is no blanket summer recommissioning rule, and clock changes are handled by the time settings, not by a visit.',
  },
  {
    id: 8,
    question:
      'An electrician wired the BMS panels and field devices. Which handover item is theirs to provide?',
    options: [
      'The controls strategy description and the head-end graphics',
      'The trend log configuration and the alarm priority settings',
      'Certificate and test results for the wiring, and labels',
      'The operator training plan for the estates team',
    ],
    correctIndex: 2,
    explanation:
      'The electrician certifies the electrical work they installed and leaves panels, cables and devices labelled so they match the drawings and points schedule. Strategies, graphics, trends, alarms and operator training are the controls specialist’s deliverables, even when the electrician helps.',
  },
  {
    id: 9,
    question:
      'A temperature sensor label reads "TS3" but the points schedule calls the same device "AHU2-SAT". What is the real problem?',
    options: [
      'Nothing, as long as the sensor reads correctly on the head-end graphic',
      'Nobody tracing a fault can match the device to its point on screen',
      'The sensor will not be recognised by the controller until the label is changed',
      'The label colour must match the cable colour or the panel will fail inspection',
    ],
    correctIndex: 1,
    explanation:
      'Labels exist so the next person can get from a point on the screen to a device on the wall, and back, without guessing. A mismatch costs time on every fault. The controller does not read the label, so the sensor still works, which is why the problem often goes unnoticed until someone needs it.',
  },
  {
    id: 10,
    question:
      'Some controllers on a refurbishment are an old range the manufacturer no longer supports with security updates, and replacing them is outside the budget. What should happen at handover?',
    options: [
      'Leave them off the as-fitted drawings so they do not draw any attention',
      'Disconnect them from the network until the client finds the money to replace them',
      'Say nothing, because they were existing equipment and not part of the job',
      'Identify them and have the client sign off the risk and a replacement plan',
    ],
    correctIndex: 3,
    explanation:
      'Where the security baseline cannot be met for a genuine reason, the remaining risk should be written down and acknowledged by the client, with a horizon for replacement. Hiding or ignoring the equipment leaves the client exposed without knowing it, and disconnecting it may stop the plant it controls.',
  },
];

const BMSModule7Section6 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 6"
        title="Handover"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          What the client needs on the day the system becomes theirs, how acceptance is recorded,
          and what you hand over for your own part of the work.
        </p>

        <TLDR
          points={[
            'Handover is a formal acceptance, not the day the van leaves. It needs the criteria met, the evidence supplied and a signed record, with anything outstanding written down.',
            'In England, Approved Document L expects the owner to get operating and maintenance information in a building log book, including the completed commissioning records.',
            'The controls information that keeps a BMS maintainable is the as-fitted drawings, a points schedule that matches the labels on site, and the configuration records.',
            'Backups that have been proved by restoring them, default passwords changed, and named accounts for every user are part of handover, not an afterthought.',
            'Training is for the people who will run the building, on their own system. Defects and the aftercare period are planned, including a look at the seasons the commissioning could not prove.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What handover actually is</ContentEyebrow>

        <ConceptBlock
          title="Acceptance needs three things: criteria met, evidence supplied, sign-off recorded"
          plainEnglish="The client is not just being given the keys. They are agreeing, in writing, that the system does what was asked and that they have what they need to run it."
          onSite="If the handover meeting ends with a handshake and no signature, it has not finished. Ask who signs, and what they are signing against, well before the day."
        >
          <p>
            By the time you reach handover, the system has been installed, point-to-point tested and
            functionally tested (Section 7.5). Handover is the step where the client formally takes
            it on. Done properly, it rests on three things being in place together.
          </p>
          <ul>
            <li>
              <strong>The acceptance criteria are met.</strong> Whatever the specification said the
              system must do has been shown to work, to the pass mark the project set.
            </li>
            <li>
              <strong>The evidence is supplied.</strong> A pack showing how each criterion was
              proved: witnessed test sheets, the points schedule with results against every point,
              screenshots of working graphics, training attendance records.
            </li>
            <li>
              <strong>The sign-off is recorded.</strong> Who accepted it, on what date, with what
              conditions, and which items are carried into the defects period.
            </li>
          </ul>
          <p>
            Final acceptance normally needs the building to be in use, the documentation delivered,
            the training done and a defects rectification period agreed. The people signing at each
            stage differ (a site manager for installation, a commissioning manager or the
            client&rsquo;s representative for commissioning, the client for final acceptance), and
            those roles should be fixed in the project plan, not discovered on the day.
          </p>
          <p>
            <strong>Partial acceptance is fine, if it is written down.</strong>
          </p>
          <p>
            Programmes slip and clients need their buildings. It is common for a system to be
            accepted into use with some items still open, such as a chiller waiting on a replacement
            board or a set of meters not yet integrated. That is acceptable, provided the
            outstanding items, the person responsible for each and a target completion date are
            listed and agreed at the moment of acceptance.
          </p>
          <p>
            What goes wrong is the informal version: &ldquo;we&rsquo;ll sort the rest out after
            you&rsquo;ve moved in.&rdquo; Months later nobody agrees on what &ldquo;the rest&rdquo;
            was, whether it was in the price, or who should pay to finish it. Undocumented partial
            acceptance is a well-known source of disputes. In practice, every open item needs three
            things written next to it: what it is, who owns it, and the date it will be done.
          </p>
          <p>
            Where criteria are not met at the handover date, the usual routes are: a short, defined
            period to put it right and re-test; acceptance with the failed items completed during
            the defects period, sometimes with money held back; or, rarely, agreeing to accept a
            lower standard of system for a reduced price. Whichever is chosen, it is agreed between
            client, consultant and contractor and recorded at the time.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-6-partial"
          question="A client accepts a BMS into use with the boiler sequencing still to be finished. What must be recorded at that moment?"
          options={[
            'Only that the system was accepted, with the date',
            'The outstanding item, who will complete it and the target date',
            'The engineer’s estimate of how long the boilers will last',
            'Nothing yet, because the item will appear on the snagging list later',
          ]}
          correctIndex={1}
          explanation="Partial acceptance holds up only when each open item is listed with an owner and a target date, agreed at the time. Recording the acceptance alone hides what was left, and leaving it to a later snag list is how disputes start."
        />

        <SectionRule />
        <ContentEyebrow>What the owner must be given</ContentEyebrow>

        <ConceptBlock
          title="Approved Document L: operating information, in a building log book"
          plainEnglish="In England the building regulations expect the owner to be handed enough information to run the building without wasting energy, collected in a log book."
          onSite="The log book is usually compiled by the main contractor or a specialist, but the controls section is only as good as what you give them. Find out early who is writing it and what format they want."
        >
          <p>
            Regulation 40 of the Building Regulations 2010 puts a duty on the person carrying out
            the work: no later than five days after it is completed, they must give the owner enough
            information about the building, its fixed services and how they must be maintained for
            the building to be run without using more fuel and power than is reasonable. A BMS is a
            fixed building service, and on most non-domestic buildings it is the thing that decides
            how much energy everything else uses.
          </p>
          <p>
            Approved Document L Volume 2 (England) is the statutory guidance on how to meet that
            duty. The 2021 edition is the one in force now, and this is in its Section 9 (paragraphs
            9.1 to 9.12). The 2026 edition takes effect on 24 March 2027 (24 September 2027 for
            higher-risk building work), and from then the same guidance is in its Section 8. The
            guidance says:
          </p>
          <ul>
            <li>
              Operating and maintenance instructions go to the owner in a{' '}
              <strong>building log book</strong>. The log book may refer to other documents such as
              the O&amp;M manuals or the health and safety file rather than repeat them.
            </li>
            <li>
              The information should let the building be run efficiently, covering the building, the
              services in it, and what those services need by way of maintenance.
            </li>
            <li>
              It should include <strong>a copy of the completed commissioning records</strong>.
            </li>
            <li>
              On a new building with a BACS (building automation and control system), the owner
              should also be told about its <strong>energy performance</strong>.
            </li>
            <li>
              For work on existing buildings, the information is added to a new or existing log
              book, including any newly installed energy meters. On a first fit-out of a shell and
              core building, the log book is updated.
            </li>
          </ul>
          <p>
            Approved Document L also expects a notice of completion of commissioning to go to the
            building control body and the owner, confirming the plan was followed and the systems
            perform reasonably as designed. Wales and Scotland have their own guidance documents;
            check the version that applies where you are working.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Volume 2 (England, 2021 edition, in force now)"
          clause="In a new building whose space heating or air-conditioning system has an effective rated output above 180 kW, a BACS should be installed (paragraph 6.66). In an existing building of that size, a BACS that is being replaced or installed should meet the same specification (paragraph 6.67). Either way it should fully comply with BS EN ISO 16484, continuously monitor, log and analyse energy use, detect losses of efficiency and work with equipment from different manufacturers (paragraph 6.72), with control capabilities that suit the building and its use (paragraph 6.73). From 24 March 2027 the 2026 edition carries the same guidance at paragraphs 5.76, 5.77 and 5.84 to 5.85."
          meaning="On larger buildings the BMS is there partly because the guidance expects it, and its job includes energy monitoring. Approved Document L is statutory guidance, not law in itself, but following it is the usual way to show the regulations are met. That is why the handover information must explain how to use the BMS to run the building efficiently, not just how to log in."
          cite="ADL Vol 2 (2021) paragraphs 6.66, 6.67, 6.72 and 6.73; 2026 edition paragraphs 5.76, 5.77, 5.84 and 5.85 from 24 March 2027"
        />

        <ConceptBlock
          title="The O&M manual: written for the person who will open it in a hurry"
          plainEnglish="The manual is what the estates engineer reaches for when the heating has stopped at seven in the morning. Write it, and organise it, for that moment."
          onSite="Before you hand it over, take one real fault, such as a boiler not enabling, and see whether the manual gets you from the symptom to the right panel and point. If it does not, neither will anyone else."
        >
          <p>For the controls package, a useful O&amp;M manual usually holds:</p>
          <ul>
            <li>
              <strong>A description of operation</strong> for each plant item, in plain language,
              matching what the software actually does after commissioning, not what the design
              intended before it (Section 7.1).
            </li>
            <li>
              <strong>Setpoints, time schedules and limits</strong> as left at handover, and which
              of them the operator may change.
            </li>
            <li>
              <strong>Alarm list</strong> with what each alarm means and what to do about it.
            </li>
            <li>
              <strong>Manufacturer documentation</strong> for every controller, sensor, actuator and
              drive installed, including protocol statements such as the PICS (protocol
              implementation conformance statement) for each BACnet device.
            </li>
            <li>
              <strong>Maintenance requirements</strong>: what needs checking, how often, and by
              whom.
            </li>
            <li>
              <strong>Contacts</strong> for the controls contractor, out-of-hours support and the
              manufacturer.
            </li>
          </ul>
          <p>
            Increasingly the manual is delivered electronically with a searchable index. Whatever
            the format, agree it with the client before you start writing, and index the evidence so
            that each acceptance criterion can be traced to the record that proves it.
          </p>
          <p>
            Keep the manual consistent with everything else in the handover. If a setpoint was
            changed during commissioning, the manual, the points schedule and the controller should
            all show the new value. A manual that disagrees with the system teaches the operator to
            distrust both.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="As-fitted drawings and the points schedule"
          plainEnglish="The drawings and the points schedule must describe what is on the wall now, not what was on the design drawing a year ago."
          onSite="Keep a red pen on the drawings from the first day of installation. Every moved device, extra junction box or changed cable route gets marked as it happens, not remembered at the end."
        >
          <p>
            Design drawings show intent. As-fitted (or as-built) drawings show reality, and only the
            second is any use to the engineer who arrives two years later. For a BMS the set
            normally includes panel wiring diagrams, field wiring schedules, control schematics,
            network or communications drawings showing every controller and its address, and device
            location drawings.
          </p>
          <p>
            The <strong>points schedule</strong> is the spine of the whole system. It lists every
            physical and software point, with its name, address, type, engineering units, scaling
            and alarm limits. At handover it should match three other things exactly: the labels on
            site, the names in the controllers and the names on the graphics (Section 7.3). It is
            normally handed over as an editable spreadsheet so the client can keep it current.
          </p>
          <p>
            Alongside the points schedule, the alarm and trend log configuration should be recorded:
            which points are trended, how often, and what each alarm limit and priority is. Without
            that record, nobody can tell later whether a changed limit was a deliberate decision or
            a mistake.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Re-issuing the design drawings and calling them as-fitted"
          whatHappens="The handover deadline arrives, the marked-up sets are scattered across three site boxes, and the design drawings are re-issued with a new revision letter and the words 'as fitted' in the title block. Two years on, an engineer chasing a dead sensor finds it was moved during installation and its cable now runs a different route to a different panel."
          doInstead="Collect red-pen mark-ups as the job goes, from every trade, and have them drawn up before handover. Check a sample against site: open a panel, pick a few devices, and confirm the drawing, the points schedule and the label all agree. If the drawings are not ready, record them as an open item with a date rather than issuing something false."
        />

        <InlineCheck
          id="bms-7-6-asfitted"
          question="Which of these is the clearest sign that a set of drawings is not truly as-fitted?"
          options={[
            'The drawings are delivered as PDFs rather than on paper',
            'The title block shows the controls contractor’s logo and revision letter',
            'A controller address on the drawing differs from the device',
            'The drawings include a key to the symbols used',
          ]}
          correctIndex={2}
          explanation="As-fitted means the drawings record what is actually installed and configured. A mismatch between a drawing and the device itself proves the drawing was not updated. File format, logos and symbol keys say nothing about accuracy."
        />

        <SectionRule />
        <ContentEyebrow>Software, backups and passwords</ContentEyebrow>

        <ConceptBlock
          title="The software is part of the installation, so it gets handed over too"
          plainEnglish="If the controllers lost their programs tomorrow, could someone put them back exactly as they were? If the answer depends on one engineer’s laptop, the handover is not finished."
          onSite="Ask the client where they want the backups kept and who should hold them. A copy that only exists with the installer is no use to the client if the installer goes out of business."
        >
          <p>
            A BMS is as much software as hardware. The controller strategies, the head-end database,
            the graphics, the schedules and the alarm configuration are all part of what the client
            paid for. At handover they should receive:
          </p>
          <ul>
            <li>
              <strong>Backups of every controller strategy</strong> and of the head-end
              configuration, labelled with the date and the version that is actually running
              (Section 7.4).
            </li>
            <li>
              <strong>Proof that a backup restores.</strong> A file that has never been restored is
              a hope, not a backup. A restore test before handover, and at least yearly after it, is
              good practice.
            </li>
            <li>
              <strong>The engineering tools and licences</strong> needed to open and edit those
              files, or a clear statement of who holds them and on what terms. Clients are often
              surprised to discover they own the plant but cannot change a single line of logic.
            </li>
          </ul>
          <p>
            <strong>Passwords and access: change the defaults, name the users.</strong>
          </p>
          <p>
            Building systems are a known target, and default credentials are a well-known way in.
            Before the system goes into service:
          </p>
          <ul>
            <li>
              Every manufacturer default username and password, on controllers, routers, gateways
              and the head end, is changed.
            </li>
            <li>
              Users log in with their own <strong>named accounts</strong>, not a shared
              &ldquo;admin&rdquo; login, and operator actions are logged so a changed setpoint can
              be traced to a person.
            </li>
            <li>
              The BMS network is kept separate from the corporate and tenant networks, and nothing
              is reachable directly from the internet. Remote access, where needed, goes through a
              secure route agreed with the client&rsquo;s IT team.
            </li>
            <li>
              Any equipment that no longer gets security updates from its manufacturer is identified
              at handover, with a planned replacement date.
            </li>
          </ul>
          <p>
            Sometimes a part of this cannot be achieved for a genuine reason, such as legacy plant
            on a refurbishment. In that case the remaining risk is written down and acknowledged by
            the client at handover, ideally with a date by which it will be dealt with. Section 5.6
            covers the network side in more depth.
          </p>
          <p>
            How the credentials themselves change hands matters too. They do not belong on a label
            inside a panel door or in a printed manual that anyone can pick up. Hand the
            administrator details over by whatever secure route the client&rsquo;s IT team
            specifies, get a signature for them, and let the manual say only where credentials are
            held and who manages them.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Handing over with the factory login still active"
          whatHappens="The commissioning engineer used the default admin account throughout the job because it was quick. At handover the client gets a head end that still accepts the published default details, everyone on site shares one login, and nobody can tell who changed the heating schedule last Tuesday."
          doInstead="Change every default credential before the system goes live, set up named accounts with sensible permission levels for each operator, and pass the administrator details to the client through a route their IT team approves. Record in the handover pack that it has been done."
        />

        <SectionRule />
        <ContentEyebrow>Training the people who will run it</ContentEyebrow>

        <ConceptBlock
          title="Train the operators, on their own system, and prove it worked"
          plainEnglish="The best-commissioned BMS in the country will be put into Hand and left there if the people running it do not understand it."
          onSite="Find out who the operators really are. On many sites it is a maintenance contractor’s engineer, not the client’s own staff, and they may start after you have left."
        >
          <p>
            Training is aimed at the people who will live with the system: the estates or facilities
            team, the maintenance contractor&rsquo;s engineers, and sometimes a help desk who take
            the first call. Each group needs something different, so plan the sessions around them
            rather than giving one talk to everyone.
          </p>
          <p>For operators, the core is:</p>
          <ul>
            <li>logging in, finding their way round the graphics and reading a plant page</li>
            <li>acknowledging alarms, understanding what each priority means, and who to call</li>
            <li>changing setpoints and time schedules within the limits they are allowed</li>
            <li>finding and reading trend logs to answer &ldquo;what happened overnight?&rdquo;</li>
            <li>
              what Hand/Off/Auto switches and software overrides do, and why an override left on is
              the commonest way a building&rsquo;s performance drifts
            </li>
          </ul>
          <p>
            Hands-on sessions on their own graphics work far better than slides. The test of
            training is not that it was delivered but that each operator can show they can navigate
            the system and manage alarms. Keep an attendance record with names, dates and topics; it
            forms part of the evidence pack and it tells the next engineer who was trained on what.
          </p>
          <p>
            Plan for repeat sessions. Staff change, and much of what people learn in the week of
            handover is forgotten by the time the first unusual fault turns up.
          </p>
        </ConceptBlock>

        <Pullquote>
          A BMS nobody understands gets overridden, and a building run on overrides loses most of
          what the BMS was installed to do.
        </Pullquote>

        <InlineCheck
          id="bms-7-6-training"
          question="What is the best evidence that BMS training has been effective?"
          options={[
            'The training slides are included in the O&M manual',
            'The session ran for the full time set aside in the programme',
            'The client’s facilities manager has signed to say training took place',
            'Each operator has shown they can use the system and handle alarms',
          ]}
          correctIndex={3}
          explanation="Effective training is measured by what the operators can do afterwards. Slides, time spent and a manager’s signature only show that a session happened, not that the people running the building can use the system."
        />

        <SectionRule />
        <ContentEyebrow>Defects and aftercare</ContentEyebrow>

        <ConceptBlock
          title="The defects period and the first year"
          plainEnglish="Handover is not the end of your involvement. The first year shows up the problems that commissioning in one season could not."
          onSite="Diary the seasonal visits at handover, while everyone still has the contract in front of them. If they are left to be arranged later, they rarely happen."
        >
          <p>
            Most contracts include a <strong>defects rectification period</strong> after handover,
            during which the contractor puts right faults in their work. For a BMS the defects that
            show up in this period tend to be:
          </p>
          <ul>
            <li>
              seasonal sequences that could not be fully proved at commissioning, such as cooling
              and free cooling after a winter handover, or frost and heating sequences after a
              summer one
            </li>
            <li>
              control loops that were tuned on a light load and hunt when the building fills up
            </li>
            <li>schedules that do not match how the occupants really use the building</li>
            <li>sensors that drift or were placed where they read the wrong thing</li>
            <li>overrides put on during commissioning and never taken off</li>
          </ul>
          <p>
            Good aftercare plans for this. Reviewing the system through the first year, at least
            once a quarter so that each season is seen, catches most of it. The first planned
            maintenance visit usually takes longer than later ones because the engineer is checking
            the handover documents against how the system actually runs, which is one more reason
            why accurate documents save the client money.
          </p>
          <p>
            <strong>Soft landings: staying involved after the keys change hands.</strong>
          </p>
          <p>
            Soft landings is a way of running a project so that handover is a gradual transition
            rather than a cliff edge. It starts early, with the client&rsquo;s operators involved in
            design reviews and briefed before completion, and carries on after handover with the
            team on hand to fine-tune the building, review how it is performing against what was
            intended, and fix the problems occupants actually notice.
          </p>
          <p>
            For a BMS that means the controls engineer looking at real trend data once the building
            is occupied, adjusting schedules and setpoints to how it is really used, and checking
            that the operators are coping. Even where the contract does not use the term, the habits
            are worth adopting: a walk round with the operators a few weeks after occupation, a look
            at the trends together, and a short list of adjustments agreed and done. Where a project
            adopts it formally, the extra aftercare is set out in the contract; where it does not,
            the same habits still make for a better handover and fewer call-outs.
          </p>
        </ConceptBlock>

        <Scenario
          title="A school handed over in February"
          situation="A secondary school extension is handed over in February with a new BMS controlling heating, ventilation and some comfort cooling in the IT suite. Heating sequences were witnessed and passed. The cooling could only be run briefly on a mild day, and nobody saw it under real load. The school’s site manager is the only trained operator."
          whatToDo="Record the cooling sequence as an open item at acceptance, with the controls contractor named as owner and a target date in early summer. Diary a first-year review for June, when the IT suite will be warm, and repeat it in the autumn when heating restarts. Offer a second training session for the caretaker who covers the site manager’s absence, and add both sessions to the attendance record."
          whyItMatters="If the cooling is simply assumed to work, the first anyone hears of a fault is a hot IT suite in the summer term, long after the contractor has left site and the question of who pays has become an argument. A written open item, a planned seasonal review and a second trained operator turn that into a routine visit."
        />

        <SectionRule />
        <ContentEyebrow>The electrician&rsquo;s deliverables</ContentEyebrow>

        <ConceptBlock
          title="Certify your work, label everything, and mark up the drawings"
          plainEnglish="The controls specialist hands over the software and the strategy. You hand over proof that the wiring is safe and correct, and a site where every cable and device can be identified."
          onSite="Walk the panels with the points schedule in your hand before handover. Every terminal, cable and field device should be findable from the schedule, and every label should agree with it."
        >
          <p>
            On many BMS projects the electrician installs the panel supplies, the field wiring, the
            containment and sometimes the panels themselves, while a controls specialist programs
            and commissions. Your handover deliverables are:
          </p>
          <ul>
            <li>
              <strong>Electrical certification for the work you installed</strong>: the appropriate
              BS 7671 certificate for the panel supplies and any final circuits, with its schedules
              of inspections and test results. Remember that electronic controllers, sensors and
              drives may need disconnecting before insulation resistance testing, and record what
              was disconnected.
            </li>
            <li>
              <strong>Records for the control and signal wiring</strong>: continuity and termination
              checks from point-to-point testing (Section 7.5), and any screen earthing arrangements
              as installed.
            </li>
            <li>
              <strong>Labelling</strong>: panels, outgoing ways, terminals, cables at both ends and
              field devices, all using the names in the points schedule. Labels should be durable,
              readable and fixed where they will survive the plant being maintained.
            </li>
            <li>
              <strong>Marked-up drawings</strong>: your red-pen record of cable routes, junction
              boxes, device positions and anything that changed from the design, passed to whoever
              produces the as-fitted set.
            </li>
          </ul>
          <p>
            None of this is glamorous, and all of it is what the next engineer depends on. A fault
            on a BMS is often a wiring fault; a well-labelled installation with honest drawings
            turns a day of tracing into a few minutes with a meter.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Labelling to your own system instead of the points schedule"
          whatHappens="The electrician labels sensors and cables with their own numbering, TS1, TS2, C14, which made sense during installation. The controls engineer names the same points AHU1-SAT and AHU1-RAT on the head end. At handover nothing on site matches anything on screen, and the first fault takes hours to trace."
          doInstead="Get the points schedule before second fix and label everything with the names it uses. If names change during commissioning, update the labels to match before handover. One naming system, used on the labels, the drawings, the controllers and the graphics."
        />

        <InlineCheck
          id="bms-7-6-electrician"
          question="Before an insulation resistance test on the supply wiring to a BMS panel, what should you do with the controllers and electronic devices?"
          options={[
            'Disconnect any that could be damaged, and record what you disconnected',
            'Leave them connected so the test proves the whole installation at once',
            'Test at a higher voltage so that the electronics are fully proved as well',
            'Skip the insulation resistance test because the panel contains electronics',
          ]}
          correctIndex={0}
          explanation="Electronic equipment can be damaged by the test voltage or can give a false low reading, so it is disconnected or otherwise protected, and the record says what was done. Skipping the test leaves the wiring unproved, and a higher voltage makes the risk to the electronics worse."
        />

        <FAQ
          items={[
            {
              question: 'Is the building log book my job as the electrician?',
              answer:
                'Usually not to compile. The log book is normally put together by the main contractor or a specialist on their behalf. Your job is to supply accurate, timely information for your part of the work, such as certificates, test results and marked-up drawings, so that the controls and electrical sections are right.',
            },
            {
              question: 'What is the difference between an O&M manual and the log book?',
              answer:
                'The O&M manual is the detailed technical record of the installed systems. The building log book is the owner’s guide to running the building efficiently, and Approved Document L allows it to refer to the O&M manuals rather than copy them. In practice the log book is shorter and points into the manuals for detail.',
            },
            {
              question: 'Who owns the BMS software after handover?',
              answer:
                'It depends on the contract, and it should be settled before handover rather than after. The client should at least receive backups of what is running and know who holds the tools and licences needed to change it. If they cannot edit their own strategies without going back to one contractor, they should know that on the day they accept the system.',
            },
            {
              question: 'How do I hand over a system when the plant is not all finished?',
              answer:
                'Accept what is complete and list everything that is not, with an owner and a target date for each item, signed at the time of acceptance. Record any seasonal sequences that could not be proved as open items too, and diary the visits to prove them. What you must avoid is an informal promise to finish things later with nothing written down.',
            },
            {
              question: 'The client wants the passwords written in the O&M manual. Should I?',
              answer:
                'No. Anyone who picks up the manual would then have full access to the building’s plant. Hand the administrator credentials over through a route the client’s IT team approves, get a signature to show they received them, and note in the manual where credentials are held and who manages them.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Handover is a formal acceptance: criteria met, evidence supplied, sign-off recorded. Any partial acceptance lists each open item, its owner and a date.',
            'In England the person doing the work must give the owner enough information to run the building efficiently within five days of completion, gathered in a building log book that includes the commissioning records.',
            'As-fitted drawings, the points schedule and the alarm and trend configuration must describe what is really installed, and the names must match the labels on site.',
            'Hand over proven backups, change every default password before go-live, and give each user a named account.',
            'Train the people who will actually run the building, on their own system, and record who was trained on what.',
            'Plan the defects period and first-year reviews so every season is seen; soft landings habits make handover a transition rather than a cliff edge.',
            'The electrician delivers certificates and test records for their work, consistent labels, and honest marked-up drawings.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-5"
          prevLabel="Commissioning"
          nextHref="/study-centre/upskilling/bms-module-7-section-7"
          nextLabel="Fault finding on a BMS"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section6;
