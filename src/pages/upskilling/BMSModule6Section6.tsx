/**
 * BMS Module 6 · Section 6 — Remote access and monitoring
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches why a BMS is watched from
 * off site (alarm notification to a duty person, bureau monitoring, supplier support and
 * diagnostics), how that access is done safely (outbound or brokered connections through a
 * managed gateway, no open inbound ports, one account per person, least privilege, strong
 * authentication, a log of who connected and when, access reviewed and revoked), the service
 * contract that decides who actually responds, and the electrician's part: data outlets,
 * comms cabling under BS 7671 Regulation 444.4.10, and a deliberately chosen supply for the
 * router and outstation comms. It follows 5.6 on network security rather than repeating it.
 * The old page taught GSM/SMS modules as the resilient backup path and carried an invented
 * signal-strength minimum, invented battery hours, invented test intervals and invented
 * escalation timings. All of that is gone; legacy mobile links are mentioned only as
 * something that may stop working.
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

const TITLE = 'Remote access and monitoring | BMS Module 6.6 | Elec-Mate';
const DESCRIPTION =
  'Why a BMS is watched from off site, how remote access is done safely, who responds under a service contract, and what the electrician installs to make it work.';

const outcomes = [
  'Explain what remote monitoring is for: alarm notification, bureau monitoring and supplier support',
  'Describe a safe remote access arrangement: outbound or brokered connections, no open inbound ports, named accounts and a record of every session',
  'Recognise unsafe set-ups on site, such as a port forwarded to a controller, shared logins or a hidden mobile modem in a panel',
  'Read a service contract for the parts that matter: who receives alarms, who responds, what they may change and how access is granted and removed',
  'Install the electrical side properly: data outlets, comms cabling to Regulation 444.4.10, and a supply for the router chosen on purpose',
  'Prove the alarm path end to end at handover, and know who to involve when it fails',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A boiler lockout alarm is raised at 02:00 on a Sunday. What makes remote monitoring useful in that moment?',
    options: [
      'The BMS resets the boiler lockout itself, so nobody needs to be told about it',
      'The building owner no longer needs to keep anyone on call at weekends',
      'A named person is told quickly and can view plant data before going',
      'The alarm is stored safely so the engineer can read it on Monday morning',
    ],
    correctIndex: 2,
    explanation:
      'The value is a prompt, routed notification plus the ability to look at trends and status before travelling. Storing the alarm for Monday is exactly what remote monitoring is meant to avoid. Remote access does not remove the need for someone on call, and a lockout is a safety function the BMS should not be quietly resetting.',
  },
  {
    id: 2,
    question:
      "Three controls suppliers each want to fit their own remote link into a client's BMS. What is the better arrangement?",
    options: [
      'One hardened route from the client that every supplier uses',
      'Let each supplier fit its own link so faults stay separate',
      'Give each supplier a forwarded port on a different number',
      'Let the main contractor share its login with the other two',
    ],
    correctIndex: 0,
    explanation:
      'One client-provided route can be patched, watched and switched off. Several routes from several suppliers cannot. Forwarded ports put the BMS on the internet whatever the number, and a shared login makes the access log meaningless.',
  },
  {
    id: 3,
    question: 'Why should each person who connects remotely have their own account?',
    options: [
      'Because shared accounts run more slowly on most BMS head ends and gateways',
      'Because the BMS can only store one password against each account it holds',
      'Because it allows more people to be logged in to the head end at once',
      'So the log shows who connected, and one person can be removed alone',
    ],
    correctIndex: 3,
    explanation:
      'Named accounts make the access log meaningful and let you revoke one leaver or one contractor cleanly. With a shared login, the log only says "the supplier connected", and removing one person means changing the password for everybody.',
  },
  {
    id: 4,
    question:
      'During a panel upgrade you find a small mobile modem wired into the outstation enclosure. Nobody on site knew it was there. What is the concern?',
    options: [
      'Mobile modems interfere with the outstation clock and corrupt trend logs',
      "It is a hidden way in that bypasses the client's controls and records",
      'It draws more current than the panel supply was designed to provide',
      'It will make the BMS send all its traffic over mobile data instead of the LAN',
    ],
    correctIndex: 1,
    explanation:
      'An unknown modem is an unmanaged way in. Nobody is reviewing who uses it, and it sits outside the firewall and the access log. Report it to the client and the controls contractor and let them decide whether it stays, goes, or is replaced by the approved remote access route. Do not simply unplug it without telling anyone either, because something may depend on it.',
  },
  {
    id: 5,
    question:
      'A remote monitoring contract says the supplier will "monitor alarms". Which question matters most before the client relies on it?',
    options: [
      'Which brand of router and broadband package the supplier prefers to use',
      'Which alarms they act on, at what times, and what they then do',
      'Whether the supplier uses the same graphics package as the site head end',
      'How many engineers the supplier employs nationally and where they are based',
    ],
    correctIndex: 1,
    explanation:
      '"Monitor alarms" can mean anything from a full response service to an inbox nobody reads at night. The contract needs to say which alarms are covered, the hours, who is told, what they are allowed to do remotely and when someone attends. The router brand and company size do not answer that.',
  },
  {
    id: 6,
    question:
      'The broadband line to a site fails on a Saturday night and a chiller trips. What does that tell you about the design?',
    options: [
      'Remote monitoring is pointless on this site and should be taken out',
      'The BMS should have been put directly on the internet as a backup route',
      'Losing the link was foreseeable, so it needs detecting and a fallback',
      'Nothing; a broadband failure is not something a design can plan for',
    ],
    correctIndex: 2,
    explanation:
      'Loss of the link is a known failure mode, and a monitoring service should notice that a site has gone quiet. Putting the BMS on the internet makes it worse, not better. The answer is to plan for it: a link-lost alert at the monitoring end, a resilient supply to the comms equipment and a clear fallback for who goes to site.',
  },
  {
    id: 7,
    question:
      'Which BS 7671 requirement applies to the data cabling you run for BMS comms inside a building?',
    options: [
      'Regulation 444.4.10, which applies BS EN 50174-1 and -2',
      'A fixed separation distance from power cables, set in BS 7671 itself',
      'None at all; data cabling is wholly outside the scope of BS 7671',
      'Regulation 528.1, which bans data cables in containment with power',
    ],
    correctIndex: 0,
    explanation:
      'Regulation 444.4.10 says the requirements of BS EN 50174-1 and -2 (and BS EN 50310 for bonding) are applied to control, signalling and communication circuits within a building. Separation distances come from BS EN 50174-2, so BS 7671 sets no figure of its own. Regulation 528.1 controls how different voltage bands share a wiring system: you segregate them or use a permitted method. It is not an outright ban.',
  },
  {
    id: 8,
    question:
      'The BMS router has been put on a UPS-backed supply so it can send alarms during a mains failure. What else should be checked?',
    options: [
      'That the router is on a socket close to the comms cabinet',
      'That the router shares the boiler supply, so both fail together',
      'That the UPS is switched off overnight to save some energy',
      'That the outstation raising the alarm is just as well supplied',
    ],
    correctIndex: 3,
    explanation:
      'The alarm starts at the outstation. A protected router is no use if the outstation that raises the alarm has gone dark. Section 557 expects an auxiliary supply to be chosen for what the circuit must do, and that applies to every link in the chain.',
  },
  {
    id: 9,
    question: 'At handover, what is the strongest proof that remote alarm notification works?',
    options: [
      "The supplier's screen shows the site as online and receiving data",
      'A real plant alarm is acknowledged by the named responder',
      'The router shows green lights on its power, internet and network ports',
      'The service contract covering alarm monitoring has been signed by both',
    ],
    correctIndex: 1,
    explanation:
      'Only a test from the field end to the person who acts proves the whole chain: point, controller, head end, link, notification service and a human acknowledging it. An online indicator or green lights prove one link in the chain, and a signed contract proves none of it.',
  },
  {
    id: 10,
    question:
      'A contractor’s engineer has left their firm. They still have a remote login to the BMS. Whose job is it to make sure that is removed?',
    options: [
      "Nobody's; remote accounts expire on their own after a period of disuse",
      'The electrician who installed and wired the router in the comms room',
      'The client, via the agreed access process, told by the supplier',
      'The engineer who left, as part of handing back their company equipment',
    ],
    correctIndex: 2,
    explanation:
      'The building owner owns the access arrangements, and a good contract obliges the supplier to tell them about leavers so the account is revoked. Accounts do not tidy themselves up, and the person leaving is not the control. The electrician installs the network point; they do not manage the user list.',
  },
];

const BMSModule6Section6 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 6"
        title="Remote access and monitoring"
        backTo="/study-centre/upskilling/bms-module-6"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Why a BMS is watched from off site, how to let people in without letting everyone in, who
          actually answers the alarm, and what you install to make it all work.
        </p>

        <TLDR
          points={[
            'Remote monitoring earns its place three ways: alarms reach a named person quickly, a bureau or supplier can watch the plant, and support engineers can diagnose without a site visit.',
            'Safe remote access means no open inbound ports. Connections start from inside the site, or go through a managed broker or gateway in a separate, controlled segment.',
            'Every person gets their own account with only the rights they need, strong authentication is used, every session is logged, and leavers are removed.',
            'The service contract decides who responds: which alarms, which hours, who is told, what they may change remotely and when they attend.',
            'Your part is the physical path: data outlets, comms cabling to Regulation 444.4.10, and a supply for the router and comms chosen for what they must keep doing in a fault.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why watch a building from somewhere else</ContentEyebrow>

        <ConceptBlock
          title="Remote monitoring is about getting the right information to the right person in time"
          plainEnglish="A BMS that only shows alarms on a screen in a locked plant room is talking to an empty room most of the week. Remote monitoring makes sure somebody hears it."
          onSite="Ask the facilities manager who gets told when the boiler locks out at night. If the answer is a shrug, the remote side of this BMS is not doing its job, however good the graphics look."
        >
          <p>
            Most buildings are unattended for most of the week: nights, weekends, holidays. Plant
            does not choose to fail during office hours. A BMS can detect a boiler lockout, a frozen
            coil risk, a failed pump or a server room getting too warm within moments, but detection
            is worthless if the alarm sits on a head end screen that nobody looks at until Monday.
          </p>
          <p>Remote monitoring does three distinct jobs, and it helps to keep them separate:</p>
          <ul>
            <li>
              <strong>Alarm notification</strong>. The BMS passes selected alarms to a person who
              can act: a duty engineer, an on-call facilities manager or a security desk. This is
              usually by email, an app notification or a call from a monitoring service. The point
              is that a named human is told, not merely that a message was sent.
            </li>
            <li>
              <strong>Bureau monitoring</strong>. A controls company or a specialist monitoring
              centre watches many sites from one place. Their operators see alarms and trends, deal
              with the routine ones and escalate the rest. For a client with a portfolio of small
              sites and no engineer on each, this is often the only realistic way to have eyes on
              the plant.
            </li>
            <li>
              <strong>Support and diagnostics</strong>. The controls engineer connects in to look at
              trends, check a point, adjust a schedule or a setpoint, or load a corrected strategy.
              A lot of faults can be understood, and some resolved, without a van being sent. When
              someone does have to attend, they arrive knowing what they are walking into.
            </li>
          </ul>
          <p>
            Remote access also feeds the energy work you met in 6.4. The same connection that lets
            an analyst pull trend data for an energy report is the one a support engineer uses to
            fix a schedule that has been running the heating all weekend.
          </p>
          <p>
            <strong>Monitoring is not the same as control.</strong> Looking at the plant from home
            is one thing; changing how it runs from home is another, and it carries more risk.
          </p>
          <p>
            A user who can only view graphics, alarms and trends can do very little harm. A user who
            can override a fan, change a setpoint, alter a time schedule or download a new strategy
            can make the building uncomfortable, waste a great deal of energy, or damage plant. In a
            sensitive building, the wrong change in the wrong place can affect people, not just
            comfort.
          </p>
          <p>
            That is why good systems separate the two. Most remote users get read-only access and
            alarm acknowledgement. A smaller group, normally the controls contractor&rsquo;s
            engineers, get the right to change operating values. Fewer still can change the strategy
            itself. Each level of permission should be something the client has agreed to, not a
            default left over from commissioning.
          </p>
          <p>
            Remember, too, what remote access must never become: the route for anything life-safety.
            As 6.5 set out, fire actions belong to the fire detection and alarm system and its own
            interfaces. A remote user acknowledging a fire alarm status on the BMS has done nothing
            to the fire system, and nobody should design it as if they had.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-6-purpose"
          question="A retail chain has forty small stores with a BMS in each and no engineer on site. Which remote arrangement fits best?"
          options={[
            "An alarm screen in each store manager's office, checked during opening hours",
            "No remote access at all, to keep every store's BMS as secure as possible",
            'Full engineering rights for every store manager on every site in the chain',
            'A bureau that watches all sites and escalates alarms to named people',
          ]}
          correctIndex={3}
          explanation="Bureau monitoring suits a spread-out portfolio: one team watches every site, deals with routine alarms and escalates the rest. Screens in each store depend on someone being there and knowing what to do. Full engineering rights for every manager is far more access than they need."
        />

        <SectionRule />
        <ContentEyebrow>Letting people in safely</ContentEyebrow>

        <ConceptBlock
          title="The rule that does most of the work: no open inbound ports"
          plainEnglish="Nobody on the internet should be able to knock on the BMS front door. Connections either start from inside the building, or go through a guarded middle point that checks who is coming in."
          onSite="If anyone asks you to forward a port on the site router to a controller or the head end, stop. That one change can put the whole BMS on the open internet."
        >
          <p>
            Section 5.6 covered why building systems are a target. Remote access is where that risk
            is greatest, because it is the deliberate hole in the wall. The question is how to make
            the hole small, watched and closable.
          </p>
          <p>
            The old way was to forward a port on the site router straight through to the BMS head
            end or a controller, so the supplier could reach it from their office. That is exactly
            what internet scanning tools are built to find, and they search constantly. Many
            building controllers were never designed to sit exposed like that, and plenty still have
            default passwords or known weaknesses. Changing the port number to an unusual one does
            not hide it; scanners look at every port.
          </p>
          <p>The safer patterns, in plain terms:</p>
          <ul>
            <li>
              <strong>Outbound connections</strong>. A device on site connects out to a monitoring
              or support service. Nothing outside can start a conversation with the BMS; the site
              starts it. Most modern cloud-connected head ends and gateways work this way.
            </li>
            <li>
              <strong>Brokered access through a gateway</strong>. Outside parties connect to an
              intermediate system, the broker, which sits in its own controlled network segment
              between the outside world and the BMS. The broker checks who they are and then relays
              the session to the device they are allowed to reach. The BMS itself is never directly
              reachable from outside.
            </li>
            <li>
              <strong>One route, shared by everyone</strong>. Rather than each supplier bringing
              their own box, link or VPN, the client provides one hardened access route that every
              contractor uses. One route can be patched, watched and switched off; six routes from
              six suppliers cannot.
            </li>
          </ul>
          <p>
            Whatever the route, the broker or gateway itself has to be kept up to date and use
            modern authentication. A neglected gateway is just a different open door.
          </p>
        </ConceptBlock>

        <Pullquote>
          Remote access is a deliberate hole in the wall. The job is to keep it small, to know who
          walks through it, and to be able to shut it quickly.
        </Pullquote>

        <ConceptBlock
          title="Accounts per person, only the rights they need, and a record of every visit"
          plainEnglish="Everybody logs in as themselves, can only touch what their job needs, and leaves a trace. When someone leaves, their access goes with them."
          onSite="If you see a laminated card in the panel with the head end login on it, or hear three firms using the same &lsquo;engineer&rsquo; account, that is worth raising with the client."
        >
          <p>
            The network route is half the picture. The other half is who is allowed through it and
            what they can do once inside. The practices that matter are not complicated:
          </p>
          <ul>
            <li>
              <strong>One account per person</strong>. Not one per company, and never a shared
              &ldquo;admin&rdquo; or &ldquo;engineer&rdquo; login. A named account is what makes the
              log mean something, and it lets you remove one person without changing a password
              everyone else relies on.
            </li>
            <li>
              <strong>Least privilege</strong>. Each account gets only the permissions that role
              needs: view, acknowledge, adjust or engineer. A bureau operator rarely needs to change
              strategies; a tenant almost never needs more than viewing.
            </li>
            <li>
              <strong>Strong authentication</strong>. A good password on its own is no longer enough
              for access from outside. Access from outside should require multi-factor
              authentication on the broker or gateway, ideally a phishing-resistant method such as a
              security key or passkey. An authenticator app is far better than a password alone, but
              its codes and prompts can still be phished.
            </li>
            <li>
              <strong>Logging</strong>. Who connected, when, from where, what they reached and what
              they changed. Many head ends keep an audit trail of operator actions; combined with
              the gateway&rsquo;s session record, it answers the question every client eventually
              asks: &ldquo;who changed that?&rdquo;
            </li>
            <li>
              <strong>Granting, reviewing and revoking</strong>. There should be a written process
              for how access is given, a regular check of who still has it, and a fast way to remove
              it. Some clients go further and switch a supplier&rsquo;s access on only for an agreed
              job and off again afterwards.
            </li>
          </ul>
          <p>
            At handover, default passwords should all have been changed, test accounts removed, and
            any remote connection that is not part of the agreed security arrangement taken out.
            That is a handover task, not an afterthought, and Section 7.6 (Handover) picks it up
            again.
          </p>
          <p>
            <strong>On an existing site, find out what is already connected.</strong> Before you add
            anything, ask how people get in today, who they are, and who decides. On older buildings
            the honest answer is often that nobody knows.
          </p>
          <p>
            Many buildings already have some form of remote connection, added years ago by a
            supplier who has since changed name, been bought, or left the contract. Before you
            extend or replace anything, it is worth the client being able to answer a few plain
            questions:
          </p>
          <ul>
            <li>Does the BMS have remote access at all, and how does it work?</li>
            <li>Which organisations and which individuals can use it today?</li>
            <li>How is access given, how often is the list checked, and how is it removed?</li>
            <li>
              What else does the BMS connect to, inside the building and outside it: the corporate
              network, a supplier&rsquo;s cloud service, an energy bureau?
            </li>
            <li>Who looks after software updates on the head end and any gateway?</li>
          </ul>
          <p>
            You are not expected to answer these yourself. Asking them, and recording what you find
            in the panels you work on, gives the client and their controls contractor what they need
            to decide what stays.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-6-ports"
          question="Which arrangement keeps the BMS off the open internet while still letting the supplier support it?"
          options={[
            'A port forwarded on the site router to the head end, with a long password',
            'The head end PC running free remote desktop software on the office network',
            'The supplier connects to a broker in a separate segment, which relays them',
            'Each controller given its own public IP address so it can be reached directly',
          ]}
          correctIndex={2}
          explanation="A broker means the outside party never reaches the BMS directly; the session is checked and relayed. A forwarded port or public IP exposes the BMS whatever the password, and remote desktop software straight on the head end PC is a route that bypasses the client's controls."
        />

        <CommonMistake
          title="The supplier&rsquo;s own modem, tucked in the panel"
          whatHappens="To make support easy, a supplier fits a small mobile modem or router inside the outstation panel and connects it to the BMS network. It works, so nobody questions it. Years later nobody on site knows it is there, nobody reviews who uses it, and it bypasses the client's firewall and access log altogether. Older units may also stop working without warning as legacy mobile networks are switched off, taking the alarm path with them."
          doInstead="Treat any comms device in a BMS panel as something the client must know about and approve. Ask the controls contractor to use the client's agreed remote access route instead. If you find an unexplained modem during your work, record it and report it to the client and the controls contractor rather than either ignoring it or ripping it out yourself."
        />

        <SectionRule />
        <ContentEyebrow>Who actually answers the alarm</ContentEyebrow>

        <ConceptBlock
          title="Alarm notification only works if the routing matches real people"
          plainEnglish="Decide which alarms leave the building, who they go to at which times, and what happens if that person does not answer."
          onSite="When you are asked to test remote alarms, ask for the routing list first. You need to know who should receive each one, or you cannot tell whether the test passed."
        >
          <p>
            Section 6.1 dealt with alarm priorities inside the BMS. Remote notification adds three
            more decisions:
          </p>
          <ul>
            <li>
              <strong>Which alarms go off site</strong>. Sending every alarm out guarantees that
              people stop reading them. Usually only the higher priorities leave the building out of
              hours, and routine ones wait for the morning review.
            </li>
            <li>
              <strong>Who receives them, and when</strong>. Duty rotas change. A routing list built
              at commissioning with one engineer&rsquo;s mobile number on it will be wrong within
              months unless someone owns keeping it right.
            </li>
            <li>
              <strong>What happens if nobody responds</strong>. An alarm that is not acknowledged
              should escalate to the next person on the list. How long to wait before escalating is
              a decision for the client and their contractor, based on how quickly that piece of
              plant can cause harm.
            </li>
          </ul>
          <p>
            One more failure deserves its own line: <strong>the link itself going down</strong>. If
            the broadband to the site fails, the BMS can raise as many alarms as it likes and nobody
            will hear them. A competent monitoring service treats &ldquo;site has gone quiet&rdquo;
            as an alarm in its own right, so loss of contact is noticed rather than mistaken for a
            calm night.
          </p>
        </ConceptBlock>

        <Scenario
          title="A quiet weekend that was not quiet"
          situation="A small office building has a BMS whose alarms go off site to the controls contractor's monitoring desk. On a Friday evening the broadband line to the building fails. On Saturday the main heating pump trips. The BMS raises the alarm correctly, but it never leaves the building. Staff arrive on Monday to a cold building, and the monitoring desk had seen nothing at all."
          whatToDo="Work through the chain rather than blaming one part. The BMS detected the fault, so the field and controller side worked. The link failed, and nobody was told it had. The fixes sit with different people: the monitoring service sets up a loss-of-contact alarm for the site; the client and contractor agree a fallback for when the link is down; and the electrician makes sure the router and comms equipment are on a supply chosen for what they must keep doing, not a socket that is easily switched off or shared with the plant."
          whyItMatters="Losing remote access to a building because the line has gone down is a recognised risk in building systems security guidance, not a freak event. Designing for it is part of doing remote monitoring properly. If you treat the link as something that never fails, the first time it does fail, everyone thinks the site is fine."
        />

        <ConceptBlock
          title="The service contract is where response is really decided"
          plainEnglish="The technology sends the alarm. The contract decides whether anyone has agreed to do something about it."
          onSite="If you are the electrician on a maintenance contract that includes BMS work, read the BMS parts of the contract. It tells you what you are expected to do and, as importantly, what is someone else's job."
        >
          <p>
            Remote monitoring often sits inside a maintenance or support contract with the controls
            contractor, or with a facilities management company who subcontracts the controls.
            Contract levels vary a great deal, from annual service visits and reactive fault
            response at one end, to regular optimisation reviews and ongoing remote monitoring and
            diagnostics at the other. Neither is wrong; they suit different buildings and budgets.
          </p>
          <p>Whatever the level, a contract that covers remote monitoring should answer:</p>
          <ul>
            <li>Which alarms are monitored, and in which hours.</li>
            <li>
              Who is told, how, and what the agreed response is: phone the client, look remotely, or
              send someone.
            </li>
            <li>What the supplier may change remotely without asking, and what needs approval.</li>
            <li>
              How remote access is granted, reviewed and removed, including telling the client
              promptly when one of their engineers leaves.
            </li>
            <li>
              Who owns and maintains the router, the gateway and the broadband or other link, and
              who notices when it fails.
            </li>
            <li>How remote changes are recorded and reported back to the client.</li>
          </ul>
          <p>
            Response times appear in many contracts, and they are a commercial agreement between the
            parties rather than a figure you will find in a standard. If a client tells you
            &ldquo;the BMS company deals with alarms&rdquo;, the contract is where you check what
            that actually means.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-6-contract"
          question="A client assumes their BMS supplier responds to all alarms around the clock. The contract only covers office-hours reactive response. What follows?"
          options={[
            'The supplier must respond anyway, because the BMS raised the alarm correctly',
            'No one has agreed to respond out of hours; the client must fix that',
            'Remote monitoring makes the wording of the service contract irrelevant',
            'The electrician on site becomes responsible for any out-of-hours alarms',
          ]}
          correctIndex={1}
          explanation="A contract only obliges what it says. If it covers office hours, nobody has agreed to act on a 03:00 alarm. The gap needs closing deliberately, either by extending the contract or by the client putting their own on-call arrangement in place."
        />

        <SectionRule />
        <ContentEyebrow>The electrician&rsquo;s part</ContentEyebrow>

        <ConceptBlock
          title="Network points, comms cabling and who owns the network"
          plainEnglish="You install the physical path: data outlets, cable and containment, and the power. The client's IT team usually decides how that path is configured and secured."
          onSite="Before you terminate a data outlet for the BMS, find out whose network it joins. A point patched into the general office network can undo all the segmentation 5.6 described."
        >
          <p>
            On most jobs, the electrical contractor is asked to provide the cabling that carries BMS
            comms between the head end, the outstations and the outside world. That often means data
            outlets in plant rooms and at panels, cable runs to a communications room, and
            containment shared with or alongside power cabling. Get the physical side right and the
            controls and IT people can do their part properly.
          </p>
          <p>Points worth getting right:</p>
          <ul>
            <li>
              <strong>Know which network each point serves</strong>. BMS traffic is normally kept on
              its own network or segment, separate from the general office network. Label outlets
              and patch panel ports clearly as BMS so nobody patches them into the wrong place
              later.
            </li>
            <li>
              <strong>Follow the cabling standards for comms</strong>. BS 7671 calls up the
              information technology cabling installation standards for control, signalling and
              communication circuits in a building; separation from power cabling is set out there,
              not in BS 7671.
            </li>
            <li>
              <strong>Mind voltage bands in shared containment</strong>. Regulation 528.1 applies
              where comms and low voltage circuits share a wiring system: segregate them, or use one
              of the permitted methods.
            </li>
            <li>
              <strong>Do not configure the network unless that is your job</strong>. Setting up
              routers, firewalls and remote access is for the client&rsquo;s IT team and the
              controls contractor. Your job is to install and test the path they have specified and
              to raise anything that looks wrong.
            </li>
          </ul>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 444.4.10"
          meaning="BS EN 50174-1, BS EN 50174-2 and BS EN 50310 are to be applied for control, signalling and communication circuits within a building. Separation distances between power and data cabling come from BS EN 50174-2; BS 7671 itself does not set a separation figure for this cabling."
          cite="Regulation 444.4.10"
        />

        <ConceptBlock
          title="Power to the router and comms: decide what it must keep doing"
          plainEnglish="The box that sends alarms out is part of the alarm system. If it loses power whenever anything else does, it goes quiet exactly when you need it."
          onSite="Never leave the BMS router plugged into a general socket next to the cleaners&rsquo; kettle. Give it a supply that has been chosen on purpose, and label it so nobody switches it off to free a socket."
        >
          <p>
            Routers, gateways and network switches that carry BMS traffic need power, and where that
            power comes from is a design decision. BS 7671 Section 557 deals with auxiliary circuits
            such as control, signalling and measurement, and expects the supply to be chosen
            according to what the circuit has to do: it may depend on the main circuit or be
            independent of it. Apply the same thinking to the comms equipment.
          </p>
          <p>Questions to settle with the designer or controls contractor:</p>
          <ul>
            <li>
              Should the comms equipment keep running when the plant it monitors loses power? If it
              is there to report that failure, it should not share the plant&rsquo;s supply.
            </li>
            <li>
              Does it need a protected supply, such as a UPS or an essential supply, so that an
              alarm can still be sent during a mains failure? Losing power can disable safety and
              security systems as well as comfort plant, so a resilient supply is worth asking
              about.
            </li>
            <li>
              Is the outstation that raises the alarm supplied to the same standard as the router
              that sends it? A protected router is no use if the outstation has gone dark.
            </li>
            <li>
              Is the supply dedicated, labelled at the board and at the equipment, and on a circuit
              unlikely to be isolated for unrelated work?
            </li>
          </ul>
          <p>
            None of this needs exotic equipment. It needs somebody to ask the question before the
            router ends up on whichever socket was closest.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-6-6-power"
          question="The BMS router is fed from the same distribution board as the boiler plant it monitors. The board trips. What happens to the remote alarm?"
          options={[
            "It is sent from the router's internal memory once the board has been reset",
            'It is sent by the outstation over the mains wiring to the nearest live socket',
            'It is sent normally, because every router has an internal backup battery',
            'It may never leave site, because the sender lost power with the plant',
          ]}
          correctIndex={3}
          explanation="If the comms path shares the plant's supply, a single fault takes out both the plant and the means of reporting it. That is exactly the situation remote monitoring is meant to cover, so the comms supply should be chosen to keep working through it."
        />

        <SectionRule />
        <ContentEyebrow>Proving it works</ContentEyebrow>

        <ConceptBlock
          title="Test the whole chain, from the field device to the person who acts"
          plainEnglish="The only test that counts is a real alarm at the plant reaching the person who is meant to answer it, and that person acknowledging it."
          onSite="Arrange remote alarm tests with the controls contractor and the client in advance. The person receiving the test needs to know it is a test, and you need someone at the far end to confirm it arrived."
        >
          <p>
            Remote notification has many links: the field device or point, the controller, the head
            end or gateway, the network, the router, the external link, the monitoring service or
            notification platform, and finally a person. Each can fail on its own. A green light on
            the router or a site showing &ldquo;online&rdquo; at the monitoring desk proves only one
            link.
          </p>
          <p>A sound end-to-end test, normally led by the controls contractor, covers:</p>
          <ul>
            <li>
              Raising a genuine alarm condition at the field end, safely, rather than only
              simulating it in software.
            </li>
            <li>Confirming it reached each person on the routing list for that alarm and time.</li>
            <li>Confirming the acknowledgement came back and was logged.</li>
            <li>
              Checking escalation by leaving an alarm unacknowledged and seeing it move to the next
              person.
            </li>
            <li>
              Pulling the external link, by agreement, and confirming the monitoring end notices
              loss of contact.
            </li>
          </ul>
          <p>
            Your role is usually to make the electrical and network side available and safe for the
            test: the point is wired, the supply is in place, the outlet is live and patched. How
            often to repeat the test afterwards is for the client and their contractor to agree and
            write into the maintenance arrangements, based on how critical the plant is.
          </p>
        </ConceptBlock>

        <Scenario
          title="An office fit-out with a BMS head end in the comms room"
          situation="You are the electrical contractor on a three-storey office refurbishment. The controls contractor will fit a new head end in the comms room and wants remote monitoring and support. Their engineer asks you to put a double socket and a data outlet in the comms room for 'our router', and says they will 'sort the remote access'."
          whatToDo="Ask three questions before you start. Whose network will the BMS sit on, and has the client's IT team agreed the remote access route? What supply should the router and head end have: does the specification call for a protected or UPS-backed supply? And how will the remote alarms be tested at handover, and who is receiving them? Then install what has been agreed: a dedicated, labelled supply, data outlets labelled as BMS, cabling to Regulation 444.4.10, and voltage bands segregated or treated with a permitted method where they share containment. Record what you have installed so it can go in the handover pack."
          whyItMatters="'We'll sort the remote access' is the moment a supplier's own modem or a forwarded port can sneak in. By asking early you bring the client and their IT team into a decision that is theirs, you make sure the comms equipment is powered properly, and you leave a clear record of the physical path. None of it is controls engineering; all of it is good electrical practice."
        />

        <FAQ
          items={[
            {
              question: 'Is it my job to set up the VPN or remote access software for the BMS?',
              answer:
                'Not usually. Remote access configuration belongs to the client and their IT team, together with the controls contractor. Your job is the physical path and the power. If you are asked to configure a router or open a port, refer it back to whoever owns the network.',
            },
            {
              question:
                'The old BMS used a GSM text-message unit for alarms. Should I replace it like for like?',
              answer:
                'Do not assume it will keep working. Legacy mobile networks are being switched off and older units may stop sending without warning. Raise it with the client and controls contractor so the alarm path can be moved to the agreed, supported route, and make sure loss of that route is itself alarmed.',
            },
            {
              question: 'Can the BMS supplier change settings remotely without telling anyone?',
              answer:
                'Only if the contract allows it. A good contract states what can be changed remotely without approval, what needs the client to agree first, and how changes are recorded and reported. The head end and gateway logs should show who made every change.',
            },
            {
              question: 'What supply should the BMS router be on?',
              answer:
                'One chosen for its function, as Section 557 expects for auxiliary circuits. If the router is there to report plant failures, it should not share the plant supply, and the specification may call for a protected or UPS-backed supply. Make it dedicated and labelled at both ends.',
            },
            {
              question:
                'I found a router in a panel with a sticker giving the login. What should I do?',
              answer:
                'Do not use the login and do not remove the router without agreement. Photograph it, record where it is, and report it to the client and the controls contractor. Shared, written-down logins and unknown routers are both things the client needs to know about.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Remote monitoring is for alarm notification, bureau monitoring and support. Its value is a named person being told in time.',
            'No open inbound ports. Use outbound connections or a managed broker or gateway in a separate segment, ideally one route for every supplier.',
            'One account per person, least privilege, strong authentication, a log of every session, and access reviewed and removed when people leave.',
            'Plan for the link failing: loss of contact should itself be an alarm, and there should be a fallback for who attends.',
            'The service contract decides who responds: which alarms, which hours, what may be changed remotely and how access is controlled.',
            'Your part is the physical path: labelled BMS data outlets, comms cabling to Regulation 444.4.10, voltage bands handled under 528.1, and a router supply chosen on purpose.',
            'Prove it end to end at handover, from a real alarm at the plant to an acknowledgement from the person who acts.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-6-section-5"
          prevLabel="Fire alarm and life safety interfaces"
          nextHref="/study-centre/upskilling/bms-module-7"
          nextLabel="Module 7: Design, installation, commissioning and handover"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule6Section6;
