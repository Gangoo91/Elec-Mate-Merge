/**
 * BMS Module 5 · Section 6 — Network design and cyber security
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the practical security side of
 * a BMS network at electrician level: why a building control system is worth attacking and what
 * an attack looks like in a plant room, who owns the network and who patches it, keeping the BMS
 * on its own segment, keeping controllers off the public internet, managed remote access instead
 * of ad hoc remote control software or a modem in a panel, default passwords and shared accounts,
 * physical security of panels and network ports, and the security tasks that belong at handover.
 * The old page was titled "Network planning and latency management" and taught an RS-485
 * "120,000 / baud rate" length formula, a "75% rule" for device counts, response-time targets
 * and token-rotation arithmetic, none of it sourced; all of that is gone, and the page now covers
 * the security scope the syllabus assigns to 5.6.
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

const TITLE = 'Network design and cyber security | BMS Module 5.6 | Elec-Mate';
const DESCRIPTION =
  'Keeping a BMS network safe: segregation, no direct internet exposure, managed remote access, default passwords, locked panels and ports, and who owns patching.';

const outcomes = [
  'Explain why a building management system is a realistic target, and describe what an attack on one can do to the plant and the people in the building',
  'Find out who owns, operates and maintains a BMS network before connecting anything to it, and who is responsible for software updates',
  'Describe how a BMS network is kept separate from the office network and the internet, using separate cabling or VLANs on managed switches and a firewall between them',
  'Tell a managed remote access arrangement apart from a risky one, and recognise out-of-band connections such as a mobile modem fitted inside a panel',
  'Deal with default passwords, shared logins and unused network ports as part of normal installation and commissioning work',
  'List the security checks that belong at handover, and say what the electrician can verify and what must be passed to the controls engineer or the client',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A supplier asks for the new chiller controller to be given a public IP address so their engineers can log in directly from their office. What is the right response?',
    options: [
      'Agree, as long as the controller has a strong password set on it first',
      'Agree, but only for the first year while the equipment warranty runs',
      'Decline exposure, and bring them in through the site’s managed route',
      'Decline, and tell them remote support is never allowed on any BMS',
    ],
    correctIndex: 2,
    explanation:
      'Controllers should not be directly reachable from the internet. Remote support is legitimate, so the answer is not a flat refusal; it is to bring the supplier in through the managed route the owner controls, where access can be granted, logged and switched off. A password alone on an exposed controller is a thin defence, and the warranty period changes nothing.',
  },
  {
    id: 2,
    question:
      'You are asked to connect a new BMS head end PC to the building network. Before you plug anything in, what is the most important thing to establish?',
    options: [
      'Who manages the network, and how the BMS is meant to join it',
      'Whether the nearest floor data outlet shows a working link light',
      'Which switch port is physically closest to the plant room',
      'Whether the PC has the latest version of the BMS software installed',
    ],
    correctIndex: 0,
    explanation:
      'A network belongs to someone, and responsibility for a BMS often sits across the facilities manager, the IT team, a landlord and a controls contractor. Agreeing ownership and the connection method first is what stops the BMS ending up on the wrong segment. A link light only proves the cable works.',
  },
  {
    id: 3,
    question:
      'Why does running BMS controllers on the same flat network as the office PCs increase the risk to the plant?',
    options: [
      'Office traffic always slows a BMS so much that the controllers stop responding',
      'BMS protocols cannot physically share a network switch with office equipment',
      'BS 7671 forbids BMS and office equipment from sharing one data network',
      'Anyone who compromises an office PC can then reach the controllers',
    ],
    correctIndex: 3,
    explanation:
      'On a flat network, a foothold on any device gives a route to every other device, so a phishing email on a desk PC becomes a route into the plant. Segregation limits that movement. BMS traffic can share switch hardware if it is properly separated, and BS 7671 does not regulate data network design.',
  },
  {
    id: 4,
    question:
      'During a service visit you find a small mobile data modem cable-tied inside an outstation panel, wired to the controller’s network port. Nobody on site knows about it. What should you do?',
    options: [
      'Leave it alone, as it is very probably the manufacturer’s own monitoring link',
      'Report it to the client and controls contractor so they can decide on it',
      'Unplug it and throw it away, since unknown equipment should not be there',
      'Note it on your job sheet and carry on with the rest of the visit as planned',
    ],
    correctIndex: 1,
    explanation:
      'A modem like that is an out-of-band connection: a route into the system that bypasses every control the owner has. It may be legitimate or it may not, but either way the owner needs to know and decide. Silently removing it could cut off an agreed service; ignoring it leaves an unmanaged way in.',
  },
  {
    id: 5,
    question:
      'At handover, which of these is a security task that should be complete before the system is accepted?',
    options: [
      'Every controller is set to the factory default password so the client can find it in the manual',
      'Defaults replaced, and test accounts and unapproved remote access removed',
      'One shared engineer login created for everybody who will ever work on the system later',
      'All unused network ports left enabled in case they are needed for future expansion work',
    ],
    correctIndex: 1,
    explanation:
      'Handover is the point at which defaults, temporary test accounts and any remote access that is not part of the agreed arrangement should be gone. A shared login removes any record of who did what, and unused ports left live are an easy way in for anyone with a laptop.',
  },
  {
    id: 6,
    question:
      'A building has a BMS installed twelve years ago. The client asks who should be updating its software. What is the best answer?',
    options: [
      'Nobody, because building controllers do not receive software updates',
      'The IT department, because they patch everything that has a network connection',
      'The electrician who installed the panels, because they wired up the controllers',
      'Whoever the owner names, with the arrangement agreed and recorded',
    ],
    correctIndex: 3,
    explanation:
      'Patching a BMS is often nobody’s job by default, which is exactly the problem. Building systems stay in service far longer than office IT, and controllers and head ends do get updates and do go out of support. The owner needs to name who is responsible and how updates are tested. Assuming the IT team does it is a common gap.',
  },
  {
    id: 7,
    question:
      'Which of these is the stronger arrangement for a controls contractor to support a site remotely?',
    options: [
      'A managed gateway, named accounts, multi-factor login, open only when needed',
      'Remote control software on the head end PC, left running so they can log in at any time',
      'A router port forward from the internet to the head end PC, protected by a strong password',
      'A single shared username and password held by both the contractor and the facilities team',
    ],
    correctIndex: 0,
    explanation:
      'Good remote access is brokered, named, strongly authenticated and only open when needed, so it can be monitored and turned off. Always-on remote control software and port forwards both put the BMS directly within reach of the internet, and a shared login means nobody can tell who made a change.',
  },
  {
    id: 8,
    question:
      'Why does the physical security of BMS panels and network outlets matter for cyber security?',
    options: [
      'It does not matter, because cyber security is entirely a software and network matter',
      'Locked panels are only ever needed to protect people from electric shock at live terminals',
      'Hands-on access lets someone plug in a device or reprogram a controller',
      'Panel locks are needed only in buildings that are regularly open to members of the public',
    ],
    correctIndex: 2,
    explanation:
      'Physical access bypasses most network controls. An unlocked panel or a live outlet in a corridor lets someone add their own device, open a new remote connection or change the controller program. Keeping people out of live equipment matters too, but it is not the only reason the panel is locked.',
  },
  {
    id: 9,
    question:
      'A new BMS is being designed with a firewall between the BMS segment and the corporate network. The energy team wants to read meter data. Which approach fits a segregated design best?',
    options: [
      'Open the firewall fully between the two networks so the energy team can query any controller',
      'Move the meters onto the corporate network so they can be read directly',
      'Give the energy team the BMS engineer password so they can log in to the head end',
      'Allow only the specific data the energy team needs, through a defined and controlled route',
    ],
    correctIndex: 3,
    explanation:
      'Segregation does not mean nothing ever crosses the boundary. It means only the flows that are needed cross, in a controlled way, and those flows are written down. Opening the firewall fully or moving devices onto the office network undoes the segregation, and handing out engineer logins gives far more access than reading meters needs.',
  },
  {
    id: 10,
    question:
      'A client asks whether the protocols on their site can be made more secure. What is a fair answer from this page?',
    options: [
      'Secure protocol versions exist; ask the maker what the installed kit supports',
      'Building protocols cannot be secured at all, so the only option is to unplug the network',
      'Any protocol becomes secure as soon as its data cable is run in steel conduit throughout',
      'Protocols are secure by design and need nothing further once the system is commissioned',
    ],
    correctIndex: 0,
    explanation:
      'Many older field protocols were built for closed networks and carry no authentication or encryption. Secure variants and secure transports exist, such as BACnet Secure Connect (BACnet/SC), but what a site can use depends on the installed equipment, so the manufacturer and controls contractor are the people to ask. Containment protects the cable, not the messages on it.',
  },
];

const BMSModule5Section6 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 6"
        title="Network design and cyber security"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How to keep a BMS network separate, locked down and properly owned, and which parts of
          that are the electrician&rsquo;s. It matters on site because whatever you patch in decides
          who can reach the plant.
        </p>

        <TLDR
          points={[
            'A BMS is a set of programmable, networked computers that run plant. If someone else gets control of it, they can stop plant, change setpoints, lock out the operators or watch how the building is used.',
            'Before connecting anything, find out who owns the network, who maintains the BMS and who is responsible for updating its software. On many sites the honest answer is nobody, and that is the first thing to fix.',
            'Keep the BMS on its own network or its own VLAN on managed switches, with a firewall between it and the office network. Controllers should never be directly reachable from the internet.',
            'Remote access is normal and useful, but it should come through one managed route with named accounts, strong login and a record of who connected. Remote control software left open on a PC, port forwards and modems hidden in panels are not managed access.',
            'Change every default password, give each person their own account, disable unused network ports, lock panels and outlets, and make sure all of that is done and recorded at handover.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why it matters</ContentEyebrow>

        <ConceptBlock
          title="A BMS is a computer network that runs plant"
          plainEnglish="Every outstation and head end is a small computer on a network. Anything that can be reached over a network can be misused over a network."
          onSite="When you open a BMS panel, think of the controller as a networked computer with a program in it, not just a box of relays. That changes how you treat its network port and its login."
        >
          <p>
            Earlier sections treated the BMS as plant control, and that is what it is for. Look at
            it from the other direction and it is also a collection of programmable computers joined
            by a network, often linked to the office network, sometimes linked to a supplier’s
            office, and occasionally linked to the open internet by accident. Every one of those
            links is a way in.
          </p>
          <p>
            The harm is practical, not abstract. Someone with access can change setpoints, so a cold
            room warms up overnight and the stock is lost. They can stop plant or run it in a way
            that damages it. They can change the operator passwords so the facilities team cannot
            get back into the head end after a power cut. Malicious software on the BMS PC can lock
            the disk and take the screens away entirely, often because somebody used that PC for web
            browsing or email. And simply reading the data can tell an outsider when a building is
            empty, which rooms are occupied and when the guards do their rounds.
          </p>
          <p>
            Not every loss is deliberate. Cable damage during other works, a failed broadband link
            that stops the out-of-hours engineer logging in, or a contractor who changes a setting
            without telling anyone can all cause the same loss of control. Good network design
            protects against both: it makes deliberate misuse harder, and it makes accidents easier
            to trace and recover from.
          </p>
          <p>
            None of this needs you to become an IT security specialist. Most of the protection on a
            BMS comes from basic, unglamorous habits during installation, commissioning and
            maintenance, and the electrician is on site for many of them.
          </p>
        </ConceptBlock>

        <Pullquote>
          Most BMS security failures are not clever attacks. They are a default password nobody
          changed, a remote link nobody switched off and a panel nobody locked.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Ownership</ContentEyebrow>

        <ConceptBlock
          title="Find out who owns the network, and who patches it"
          plainEnglish="Office IT usually has one team in charge. A BMS often has four or five organisations involved and no one clearly responsible for its security. Ask before you connect."
          onSite="Before you patch a controller or head end into any network, get a name: who manages this network, and who has agreed how the BMS connects to it. If nobody can tell you, stop and raise it."
        >
          <p>
            In an office, one IT team usually looks after every PC, switch and server. A BMS is
            different. It is often run day to day by a facilities manager employed by the owner, the
            tenant or a facilities contractor. The controls contractor maintains it. A landlord may
            be responsible for central plant while tenants control their own floors. The IT team may
            own the switches the BMS traffic runs over and know nothing about the controllers on
            them. Each assumes another is looking after security.
          </p>
          <p>
            For any BMS, someone should be able to answer a short set of questions. What is in the
            system and where is it? Who operates it and who maintains it? Is its software up to
            date, how is it updated, and who checks the update has not broken anything? What else is
            it connected to, inside and outside the building? Does it have remote access, who has
            it, and how is that access given and taken away? Who approves adding new devices or
            connecting it to other systems?
          </p>
          <p>
            Software updates deserve particular attention. Building systems stay in service far
            longer than office IT, so a controller or head end can reach the end of its support long
            before the plant it runs. Head ends run on ordinary operating systems that need regular
            updates. Controllers receive firmware updates when weaknesses are found. If nobody is
            named as responsible, none of that happens. Updating a live controller can also change
            how it behaves, which is why updates should be planned and tested by the controls
            contractor rather than applied on a whim.
          </p>
          <p>
            The electrician’s part is to ask the questions, record the answers on the job, and
            refuse to be the person who quietly connects something to a network nobody has agreed
            to. You are not expected to write the client’s security policy. You are expected not to
            work around one.
          </p>
          <p>
            Where the BMS is shared, for example a landlord’s system serving several tenants, the
            questions get more important, not less. Tenants may want their own access to their
            floors, and every extra user and connection has to be agreed by whoever owns the system.
            Write down which organisation is responsible for which part before you start.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-6-ownership"
          question="A facilities manager tells you that the IT team patches everything, so the BMS must be up to date. What is the sensible view?"
          options={[
            'Accept it, as IT teams look after all networked equipment',
            'Check the BMS kit is on IT’s list, as it is often left off',
            'Update the controller firmware yourself during the visit',
            'Assume BMS controllers never need updates, so it does not matter',
          ]}
          correctIndex={1}
          explanation="BMS controllers and head ends are often missing from IT’s asset list, and controller firmware is usually updated by the controls contractor. The claim needs checking, not accepting. Applying firmware yourself without the controls contractor can stop a working plant. Controllers and head ends do receive updates."
        />

        <SectionRule />
        <ContentEyebrow>Segregation</ContentEyebrow>

        <ConceptBlock
          title="Keep the BMS on its own network"
          plainEnglish="Put the BMS where only the things that need to talk to it can reach it. A separate network, or a separate VLAN on managed switches, with a firewall at the edge, does that."
          onSite="If you are asked to plug a controller into a spare office floor outlet, ask which VLAN that outlet is on. A live office outlet is the wrong network unless the IT team has set it up for the BMS."
        >
          <p>
            The single most useful design decision is keeping BMS traffic apart from everything
            else. On a flat network, where every device can reach every other device, a problem
            anywhere becomes a problem everywhere. A malicious email opened on a reception PC, or a
            contractor’s infected laptop plugged into a meeting room outlet, gives a route straight
            to the controllers. Separating the networks means a compromise in one place stays in
            that place.
          </p>
          <p>
            There are two common ways to do it. The first is a physically separate network: its own
            switches and its own cabling, with nothing else on it. The second is a virtual network,
            or VLAN, on managed switches, where the BMS shares the switch hardware and the
            structured cabling but its traffic is kept apart from office traffic by the switch
            configuration. Unmanaged switches cannot do this, which is one reason a cheap switch
            tucked into a panel is a weakness as well as a reliability risk.
          </p>
          <p>
            Where the BMS has to exchange data with other networks, the connection goes through a
            firewall that allows only the specific traffic that is needed and blocks everything
            else. Energy reports for the finance team, alarm emails, links to a lighting or access
            control system: each is a defined flow, written down and allowed on purpose. Larger
            sites often go further and split the BMS itself into zones, so the lighting system, the
            HVAC controllers and the metering do not all sit on one segment.
          </p>
          <p>
            BACnet adds one detail worth recognising. BACnet/IP uses broadcast messages to find
            devices, and broadcasts do not cross from one IP subnet to another on their own, so
            sites spanning more than one subnet use BACnet broadcast management devices (BBMDs) to
            pass them across. A BBMD set up carelessly can carry BACnet traffic further than
            intended, including out of the BMS segment. Its configuration belongs to the controls
            engineer, but you should know it exists and that it is part of the security picture.
          </p>
          <p>
            For the electrician, segregation shows up as very ordinary decisions: which outlet a
            controller is patched to, which switch port a gateway goes into, and whether the label
            on the patch panel matches what the network drawing says. Get the network drawing or
            port schedule from the controls contractor before you patch anything, and update it if
            what you install differs. An as-fitted record that matches reality is what lets the next
            person keep the segregation intact.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026"
          clause="Regulation 444.4.10"
          meaning="BS EN 50174-1, BS EN 50174-2 and BS EN 50310 shall be applied to control, signalling and communication circuits within a building. The structured cabling a segregated BMS network runs on is designed, installed and separated from power cabling under those standards, not by a rule of thumb."
          cite="Regulation 444.4.10"
        />

        <InlineCheck
          id="bms-5-6-segregation"
          question="Which of these actually keeps BMS traffic separate from office traffic when both run through the same switches?"
          options={[
            'Giving BMS devices their own IP address range on the same LAN',
            'Putting BMS ports on their own VLAN on managed switches',
            'Hanging the BMS off its own unmanaged switch on the office LAN',
            'Using screened patch leads for every BMS connection',
          ]}
          correctIndex={1}
          explanation="A VLAN on managed switches keeps the traffic apart through the switch configuration. A different address range on the same flat LAN still leaves every device reachable. An unmanaged switch cannot separate anything. Screened leads help with noise, not with who can talk to the controllers."
        />

        <CommonMistake
          title="Fixing a communication fault with a cheap switch and a spare outlet"
          whatHappens="A new fan coil controller on a refurbished floor will not talk to the head end. To get it working before the end of the day, a small unmanaged switch is dropped into the ceiling void and patched to the nearest office floor outlet. The controller appears on the head end, the job is signed off, and the BMS now has a back door onto the office network that no drawing shows."
          doInstead="Find out why the controller is not reaching the BMS network and fix that, or stop and ask the controls contractor and the IT team which network and VLAN it should be on. Any switch added to a BMS network should be agreed, managed and recorded. A connection that works is not the same as a connection that is right."
        />

        <SectionRule />
        <ContentEyebrow>The internet</ContentEyebrow>

        <ConceptBlock
          title="Controllers should never be directly on the internet"
          plainEnglish="If a controller can be reached from anywhere in the world, someone will find it. Services exist that search the internet for exactly this kind of device."
          onSite="If someone asks you to set up a router so a controller or head end can be reached from outside, that is a request for direct exposure. Pass it to the client and the controls contractor rather than doing it."
        >
          <p>
            A controller with a public internet address, or a router rule forwarding traffic from
            the internet to it, can be reached by anyone. Search tools constantly scan the internet
            and catalogue the devices they find, including building controllers, remote access pages
            and industrial protocols. Once a device is in one of those catalogues, finding it takes
            no skill at all. Many BMS controllers were designed for a closed network and were never
            built to face that.
          </p>
          <p>
            Direct exposure usually happens for convenient reasons. A supplier wants to log in from
            their office. A facilities manager wants to check temperatures from home. Someone sets
            up a port forward on the site broadband router during commissioning and nobody removes
            it. The fix is not to ban remote access, which is genuinely useful, but to provide it in
            a managed way, covered in the next block.
          </p>
          <p>
            Watch for connections that do not appear on any drawing. Equipment suppliers sometimes
            fit a mobile data modem inside a panel so they can support their kit without going
            through the site network. That is an out-of-band connection: it bypasses the firewall,
            the segregation and the remote access controls altogether, and the owner may not know it
            is there. Wireless links inside a building are similar. A radio signal does not stop at
            the site boundary, so an insecure wireless bridge between two plant rooms is a network
            edge that a locked door does not protect.
          </p>
          <p>
            If you find a modem, an unexplained router or a wireless device in a BMS panel, record
            what it is, where it is and what it connects to, and report it. It may be legitimate.
            The point is that the owner should be the one who decides.
          </p>
          <p>
            On an existing site, a simple check is worth doing when you take over maintenance. Ask
            how each remote user reaches the BMS and look at the site router or firewall records
            with the person who manages them. If the answer to how the supplier gets in is that
            nobody is quite sure, that is the finding, and it should go to the owner in writing.
          </p>
        </ConceptBlock>

        <Scenario
          title="The modem in the boiler house panel"
          situation="You are replacing a failed power supply in a boiler house control panel at a secondary school. Behind the DIN rail you find a small mobile data router, powered from the panel and patched into the boiler sequence controller’s network port. The site manager has never seen it. The school’s BMS is meant to be reached only through a remote access service the local authority manages."
          whatToDo="Do not remove it, and do not ignore it. Photograph it, note the make and any labels, and trace where its network cable goes. Finish the repair, then report it in writing to the site manager and the controls contractor, explaining that it gives a route into the controller that bypasses the authority’s managed access. Leave the decision about removing, keeping or replacing it with them."
          whyItMatters="An unknown modem is a way into the plant that nobody is watching. It might belong to the boiler manufacturer’s monitoring service, in which case pulling it out could break an agreed contract, or it might be something nobody authorised. Either way, the owner cannot manage a risk they do not know about."
        />

        <SectionRule />
        <ContentEyebrow>Remote access</ContentEyebrow>

        <ConceptBlock
          title="Remote access should come through one managed route"
          plainEnglish="Remote support is fine. What matters is that it comes through one controlled entrance, by named people, with a strong login, only when needed, and with a record of who came in."
          onSite="If the only way the controls contractor can support a site is remote control software running on the head end PC, raise it. That is the arrangement most likely to be left open and forgotten."
        >
          <p>
            Remote access lets the controls contractor fix faults without driving to site, lets the
            facilities team respond out of hours, and lets suppliers support their equipment. It is
            also the most common way into a BMS from outside. The difference between a safe
            arrangement and an unsafe one is almost entirely in how the access is provided and
            managed.
          </p>
          <p>
            A sound arrangement has a single route in, usually a VPN or a secure remote access
            gateway that sits in its own protected segment between the outside world and the BMS.
            Outside users connect to that gateway, and the gateway relays the connection on. The BMS
            itself never accepts connections straight from the internet. Ideally connections are set
            up from the inside outwards, so no inbound port is left open on the site’s internet
            connection.
          </p>
          <p>
            On top of the route, the people. Each remote user has their own named account, not a
            shared one. Login uses multi-factor authentication, so a stolen password alone is not
            enough. Access can be switched on when a job needs it and switched off afterwards,
            rather than left open around the clock. Every session is logged, so if a setpoint
            changes at three in the morning there is a record of who was connected. And when a
            contractor’s engineer leaves, or the contract ends, their access is removed.
          </p>
          <p>
            The arrangements to be wary of are the ones that skip the route. Remote control software
            installed directly on the head end PC and left running. A port forward on the broadband
            router. A single shared login that the contractor, the facilities team and a former
            employee all know. Each of these may have been set up with good intentions, and each
            puts the BMS within reach of anyone who finds it.
          </p>
          <p>
            Plan for the remote link failing, too. If the out-of-hours response relies on logging in
            remotely, a broadband outage means nobody can see the alarms. The owner should know what
            happens then, which usually means someone attending site.
          </p>
          <p>
            Contracts matter here as well. Suppliers sometimes write a requirement for permanent
            remote access into their maintenance agreement. The owner should understand why it is
            needed and whether the same support can be given through the site’s managed route,
            rather than accepting a separate, always-open connection because it was in the small
            print.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving the commissioning remote access in place"
          whatHappens="During commissioning, the controls engineer installs remote control software on the head end PC and adds a port forward on the site router so they can finish the graphics from their office. The job is handed over, everyone moves on, and both stay in place for years. The login is the one written on the commissioning sheet in the panel."
          doInstead="Treat any temporary remote access as part of the commissioning kit that has to be removed before handover, along with test accounts and default passwords. If the client needs remote access long term, it should be set up through their managed route, with named accounts and strong login, and recorded in the handover documents."
        />

        <InlineCheck
          id="bms-5-6-remote"
          question="Why is it better for remote access to be switched on only when a job needs it, rather than left available all the time?"
          options={[
            'Because remote sessions use up the controllers’ memory if they stay open',
            'Because it shortens the time in which anyone could try to use that way in',
            'Because the site broadband connection cannot carry BMS data around the clock',
            'Because remote access is only permitted during normal working hours',
          ]}
          correctIndex={1}
          explanation="A route that is closed most of the time can only be misused in the short windows when it is open, and those windows are known and can be watched. The other options are not real limits: controllers are not filled up by an idle connection, and there is no rule restricting remote access to working hours."
        />

        <SectionRule />
        <ContentEyebrow>Passwords and accounts</ContentEyebrow>

        <ConceptBlock
          title="Change every default, and give everyone their own login"
          plainEnglish="Factory passwords are printed in manuals that anyone can download. If a device still has one, it effectively has no password at all."
          onSite="When you power up a new controller, network switch, meter or gateway, assume it has a factory login. Make sure the commissioning plan includes changing it, and that the new credentials go to the owner, not into a notebook in the van."
        >
          <p>
            Almost every networked device leaves the factory with a default username and password.
            They are published in installation manuals and collected online, so a device still using
            them can be taken over by anyone who can reach it. That applies to controllers, head
            ends, network switches, gateways, meters with network ports and the web pages of
            lighting and access control systems. No device on a BMS network should be left on its
            default credentials, and especially not anything that can be reached from another
            network.
          </p>
          <p>
            Shared logins are the next problem. If everyone on the job uses the same engineer
            account, there is no way to tell who changed a schedule or disabled an alarm, and no way
            to remove one person’s access without changing it for everyone. Each user should have
            their own account, with access limited to what their job needs. An operator who adjusts
            setpoints does not need to be able to edit control strategies or add users.
          </p>
          <p>
            Passwords should be strong and not shared, and users should log out when they finish,
            particularly on a head end PC in a shared office. Where the system supports it,
            multi-factor login stops one leaked password being enough. The owner should have a
            simple written policy for BMS passwords, covering how they are created, where they are
            stored and who holds the master credentials.
          </p>
          <p>
            Network hardening follows the same idea. Turn off the services a device does not need,
            and disable network ports on switches that are not in use, so a spare port is not an
            open invitation. A disabled port can be enabled in minutes when it is actually needed.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-6-defaults"
          question="A new network meter has been commissioned and is reading correctly. Its web page still accepts the login printed in the installation manual. What is the position?"
          options={[
            'It is acceptable, because the meter is on the BMS network rather than the internet',
            'It is acceptable until the first annual service, when it can be changed',
            'It only matters if the meter controls plant rather than measuring it',
            'It is not finished: the default credentials need replacing before handover',
          ]}
          correctIndex={3}
          explanation="A default login is public knowledge, so the device is effectively unprotected to anyone who can reach it, including anyone who gets onto the BMS network. Being off the internet reduces the risk but does not remove it. Meter data matters too: altered readings can mislead energy decisions and billing."
        />

        <Scenario
          title="Locked out after a power cut"
          situation="A distribution warehouse loses its incoming supply overnight. When power returns, the BMS head end PC restarts but nobody can log in. The only administrator account was a shared one, and its password was changed months ago by an engineer who has since left the facilities contractor. The plant is running on its last settings, but nobody can change a schedule, clear an alarm or see what is happening."
          whatToDo="Get the controls contractor to recover access by the manufacturer’s approved method, then rebuild the accounts properly: one named account per person, an administrator account whose credentials the owner holds and stores securely, and a written process for removing access when someone leaves. Check that the controllers themselves are not still on their factory logins while you are at it."
          whyItMatters="A single shared login is a single point of failure, whether the person who changed it meant harm or not. With named accounts and owner-held credentials, losing one person never means losing the building."
        />

        <SectionRule />
        <ContentEyebrow>Physical security</ContentEyebrow>

        <ConceptBlock
          title="Lock the panels and look after the network ports"
          plainEnglish="If someone can get their hands on the equipment, most of the network protection does not matter. They can plug in, reconnect or reprogram from the panel itself."
          onSite="Before you leave a plant room, check the panels are shut and locked, unused network outlets are not live, and no spare patch leads are left plugged into switch ports."
        >
          <p>
            Physical access beats most network security. Someone standing at an open outstation
            panel can plug a laptop into the controller’s service port and change its program. They
            can add their own device to the network, such as a small wireless router that gives them
            a way back in later. They can fit a counterfeit or tampered component. A live data
            outlet in a corridor or meeting room on the BMS VLAN gives the same access without even
            opening a panel.
          </p>
          <p>
            So the basics matter. Outstation panels and network cabinets are kept locked, with keys
            controlled rather than left in the door. Plant rooms are not used as storage that
            everyone has access to. The BMS server or head end PC is somewhere secure, not on an
            open desk in a public area. Data outlets that are not needed are disconnected at the
            patch panel or disabled on the switch. Where the network supports it, switch ports can
            be set to accept only known devices, so a strange laptop plugged in gets nothing.
          </p>
          <p>
            Visiting contractors are part of the physical picture. Maintenance staff, plant
            suppliers and other trades often have access to plant rooms with little supervision.
            That is normal on a building site and in a working building, which is why the panels
            themselves need to be secure rather than relying on the room.
          </p>
          <p>
            Physical security also covers the cable route. Damage to an unprotected BMS data cable
            during other works can take out control of a whole area, just as surely as an attack.
            Containment, labelling and records showing where BMS cabling runs all help.
          </p>
          <p>
            Much of this sits squarely with the electrician. You fit the panels, terminate the
            outlets, patch the switches and hand over the keys. Before you leave a job, walk the BMS
            equipment as an outsider would: which panels open without a key, which outlets are live,
            and what could someone plug in without being noticed.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-6-physical"
          question="A plant room is locked, but the outstation panels inside it are left unlocked with the keys hanging in the doors. Is that good enough?"
          options={[
            'Yes, because the plant room door is the security boundary that matters',
            'Yes, as long as the controllers are on their own VLAN',
            'No, because many people with plant room access are not meant to touch the controls',
            'No, because BS 7671 requires every BMS panel to be locked at all times',
          ]}
          correctIndex={2}
          explanation="Maintenance staff, plant suppliers and other trades routinely get into plant rooms, often unsupervised. The panel lock is what keeps them away from the controller’s service port and the network. A VLAN does nothing against someone standing at the controller, and the requirement here comes from good practice, not a BS 7671 regulation."
        />

        <SectionRule />
        <ContentEyebrow>Protocols and handover</ContentEyebrow>

        <ConceptBlock
          title="Older protocols trust everyone, so the network has to do the protecting"
          plainEnglish="Most field protocols were designed for closed networks and do not check who is sending a message. Newer secure versions exist, but on existing sites the network around the protocol does most of the work."
          onSite="When a client or designer mentions secure protocols, the question to ask is what the installed equipment supports. That is a question for the manufacturer and the controls contractor, not something to assume."
        >
          <p>
            The protocols in Sections 5.2 to 5.4 were mostly designed when building control networks
            were closed and trusted. A standard Modbus or BACnet message carries no proof of who
            sent it and is not encrypted, so any device that can reach a controller can usually read
            from it and often write to it. That is why segregation and remote access control matter
            so much: on many sites they are the only protection the controllers have.
          </p>
          <p>
            Secure versions are arriving. BACnet now has{' '}
            <strong>BACnet Secure Connect (BACnet/SC)</strong>, the secure transport for BACnet. It
            carries BACnet messages over encrypted, authenticated connections using device
            certificates and a central hub, so it does not depend on broadcasts or a trusted flat
            network. It needs controllers and head ends that support it, and someone to manage and
            renew the certificates. Other industrial protocols have secure variants as well. Moving
            to them depends on whether the installed controllers support them, so on most existing
            sites it is a planned upgrade over time, raised with the manufacturer and controls
            contractor, rather than a setting someone switches on. Where an insecure protocol has to
            stay, the protection around it should be deliberate and written down.
          </p>
          <p>
            Handover is where security either gets finished or gets forgotten. Before the system is
            accepted, default passwords should be replaced with site-specific ones, test accounts
            removed, and any remote access that is not part of the agreed arrangement disabled. The
            physical security of panels and network equipment should be checked. The owner should
            receive an up-to-date record of what is installed, including makes, models, locations
            and software versions, so that when a weakness is announced in a particular controller
            they can tell whether it affects them. Arrangements for updating the software, and for
            being told when equipment goes out of support, should be agreed and recorded.
          </p>
          <p>
            Finally, the owner should know what happens if the BMS has to be cut off from the
            outside world, whether because of an attack elsewhere or a failure. Can the plant run
            safely on local control? Who attends site if remote support is no longer possible? Those
            answers belong in the handover documents, and plant that matters should be designed so
            it can keep running when the network is disconnected. Backups of the controller
            strategies and the head end, kept offline and proved by a restore, are what let a site
            recover after ransomware or a failed controller (Section 7.4 covers keeping a true
            copy).
          </p>
          <p>
            The electrician can verify a good part of this list personally: panels locked, keys
            handed over and recorded, unused outlets disconnected, no stray switches or modems in
            panels, and labels matching the network drawings. The rest, such as passwords, accounts,
            firewall rules and remote access, is for the controls contractor and the owner to
            confirm. Your job is to make sure it has been asked and answered, not assumed.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-6-handover"
          question="Why should the handover documents include the make, model, location and software version of each controller?"
          options={[
            'So the owner can see quickly if a newly published weakness affects them',
            'So the controls contractor can size the controller power supplies',
            'So the electrical installation certificate can list every controller',
            'So the warranty period for each controller can be worked out later',
          ]}
          correctIndex={0}
          explanation="When a security weakness is published for a particular controller or software version, the owner needs to know at once whether they have it and where it is. That is why the page lists these items under handover security tasks. Power supply sizing and electrical certification do not depend on software versions. Warranty is a contract matter, not the reason the record is asked for."
        />

        <FAQ
          items={[
            {
              question: 'Is cyber security really part of an electrician’s job on a BMS?',
              answer:
                'Not the policy or the firewall configuration, which belong to the owner, the IT team and the controls contractor. But many of the habits that matter happen during installation and service: which outlet a controller is plugged into, whether a panel is locked, whether a default password gets changed, and whether you report a modem that should not be there. Those are on you.',
            },
            {
              question: 'Can a BMS share network switches with the office network?',
              answer:
                'It can, if the switches are managed and the BMS is on its own VLAN with a firewall controlling what crosses between the two. Whether to share or build a separate network is a decision for the owner, their IT team and the controls designer. Sharing an unmanaged switch, or simply plugging into a live office outlet, is not segregation.',
            },
            {
              question: 'The client wants to check the heating from their phone. Is that wrong?',
              answer:
                'Not at all. Remote access is useful. It just needs to come through a managed route, such as a VPN or the manufacturer’s secure remote service set up for the site, with the client’s own account and strong login, rather than through a port forward or a controller with a public address.',
            },
            {
              question: 'What should I do if I find a default password still in use?',
              answer:
                'Do not change it on the spot unless that is part of your agreed work, because the new credentials have to be recorded and handed to the right people or nobody will be able to log in. Report it in writing to the client and the controls contractor so it is changed properly and recorded.',
            },
            {
              question: 'Who is responsible for updating BMS software?',
              answer:
                'Whoever the owner has named and contracted to do it, which is usually the controls contractor for controllers and head end software. The important thing is that someone is named, that updates are tested before they go on to a live system, and that the owner is told when equipment reaches the end of its support.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A BMS is a network of programmable computers running plant. Misuse can stop plant, change setpoints, lock operators out or reveal how the building is used.',
            'Responsibility for a BMS is often split across several organisations. Find out who owns the network and who updates the software before connecting anything.',
            'Keep the BMS on its own network or VLAN on managed switches, with a firewall allowing only the flows that are needed.',
            'Controllers should never be directly reachable from the internet. Watch for out-of-band links such as modems inside panels and insecure wireless bridges, and report them.',
            'Remote access should come through one managed route, with named accounts, multi-factor login, access only when needed and a log of every session.',
            'Change every default password, give each person their own account, disable unused ports and lock panels and network cabinets.',
            'At handover, defaults, test accounts and unapproved remote access should be gone, and the owner should have an accurate equipment record and agreed update arrangements.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5-section-5"
          prevLabel="Gateways and integration"
          nextHref="/study-centre/upskilling/bms-module-6"
          nextLabel="Module 6: Alarms, data and monitoring"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section6;
