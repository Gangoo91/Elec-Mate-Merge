import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wifi,
  Settings,
  Building2,
  PoundSterling,
  FileCheck2,
  ClipboardCheck,
  Zap,
  AlertTriangle,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Data & Network', href: '/data-network' },
  { label: 'Data Cabling Installation', href: '/guides/data-cabling-installation' },
];

const tocItems = [
  { id: 'cable-categories', label: 'CAT5e, CAT6, and CAT6A Compared' },
  { id: 'cable-testing', label: 'Cable Testing & FLUKE Certification' },
  { id: 'patch-panels', label: 'Patch Panel Installation' },
  { id: 'structured-cabling', label: 'Structured Cabling Standards (ISO/IEC 11801)' },
  { id: 'server-room', label: 'Server Room Cabling' },
  { id: 'cable-management', label: 'Cable Tray & Management' },
  { id: 'costs', label: 'Costs per Point (£60–£150)' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CAT6 is the current standard for new commercial data cabling installations in the UK, supporting 1Gbps to 100 metres and PoE/PoE+ for IP phones, cameras, and access control readers. CAT6A supports 10Gbps and is preferred for backbone runs, server rooms, and future-proofing.',
  'All installed structured cabling must be certified using a cable certifier (such as a FLUKE Networks DSX or Versiv) that tests and reports against the relevant ISO/IEC 11801 or TIA-568 standard. The certification report is the primary quality document for the installation.',
  'ISO/IEC 11801 (and its UK equivalent BS EN 50173) defines the structured cabling system architecture: horizontal cabling from the floor distribution point (FDP) to the work area outlet, backbone cabling between floors, and the equipment room. Maximum horizontal run: 90 metres of permanent link cable.',
  'Server room cabling requires structured planning — colour coding by system, labelling at every termination point, and separation of power and data cables (minimum 200mm separation from high-voltage cables). A well-cabled server room dramatically reduces fault-finding time.',
  'Data cabling costs in the UK range from £60 to £150 per outlet point fully installed, depending on build type, cable category, distance from the distribution point, and access difficulty. Server room patching and structured cabling projects carry different cost structures.',
];

const faqs = [
  {
    question: 'What is the difference between CAT5e, CAT6, and CAT6A?',
    answer:
      'CAT5e (Category 5e) supports 1Gbps to 100 metres and was the standard for data cabling through the 2000s. It is still found in existing installations but is not recommended for new work. CAT6 (Category 6) also supports 1Gbps to 100 metres but with improved crosstalk performance, and supports 10Gbps to 55 metres. CAT6 is the minimum recommended category for new commercial installations. CAT6A (Category 6A Augmented) supports 10Gbps to 100 metres and has significantly better alien crosstalk performance. CAT6A is recommended for backbone runs, server rooms, PoE++ applications, and any installation where longevity matters. CAT7 and CAT8 exist but are rarely specified in UK commercial installations — CAT6A meets most requirements at lower cost.',
  },
  {
    question: 'What is FLUKE certification for data cabling?',
    answer:
      'FLUKE certification refers to testing structured cabling installations using a FLUKE Networks cable certifier (such as the DSX-600 or Versiv platform) to verify that the installation meets the performance requirements of the specified category (CAT6, CAT6A) per ISO/IEC 11801 or TIA-568. The certifier measures insertion loss, NEXT (Near-End Crosstalk), FEXT (Far-End Crosstalk), return loss, propagation delay, and delay skew, comparing each result to the pass/fail limits of the standard. The certifier generates a report for each cable link with pass/fail status. FLUKE certification reports are the primary quality deliverable for a data cabling installation and should be provided at handover.',
  },
  {
    question: 'What is the maximum cable run length for data cabling?',
    answer:
      'ISO/IEC 11801 and TIA-568 define a maximum permanent link length of 90 metres for horizontal cabling (from the floor distribution point to the work area outlet). This allows for up to 10 metres of patch cable at each end (FDP patch cord and user patch cord), giving a total channel length of 100 metres. For runs exceeding 90 metres, options include: installing an additional distribution point (intermediate distribution frame, IDF) closer to the outlets; using active equipment (a network switch) at the remote end; or using fibre optic cable for the longer run with a media converter at the outlet.',
  },
  {
    question: 'What structured cabling standard applies in the UK?',
    answer:
      'ISO/IEC 11801 (Information Technology — Generic Cabling for Customer Premises) is the international standard for structured cabling. Its UK/European equivalent is BS EN 50173, published by BSI. For most UK commercial projects, either standard is acceptable — check the tender specification. The standard defines Classes of transmission performance (Class D for CAT6, Class EA for CAT6A) and the architecture of the cabling system (horizontal cabling, backbone cabling, equipment rooms, work area outlets). For US government and some international clients, TIA-568 (Telecommunications Industry Association) may be specified instead.',
  },
  {
    question: 'Do I need to separate data cables from power cables?',
    answer:
      'Yes. BS EN 50174-2 (Installation and operation of communications cabling) specifies minimum separation distances between data cabling and power cables. For unscreened (UTP) data cable running parallel to unscreened power cable: 200mm minimum separation. For screened (STP/FTP) data cable: 100mm minimum separation. For data cable crossing power cable at 90 degrees: no separation required. In practice, run data cable on dedicated cable tray or basket tray separate from power cable containment. Label all cable tray and trunking clearly by system.',
  },
  {
    question: 'How much does data cabling cost per point in the UK?',
    answer:
      'Data cabling costs in the UK typically range from £60 to £150 per outlet point (a single RJ45 outlet), fully installed and certified. The wide range reflects: building type (new build vs retrofit in a listed building), cable category (CAT6 vs CAT6A), distance of cable run, access difficulty (concrete floors vs suspended ceiling), number of outlets on the project (larger projects attract lower unit costs), and whether containment (trunking/conduit) is included or separate. Server room structured cabling and patch panel installation is priced per port or per patch panel rather than per outlet, typically at £8–£20 per port including patch panel, patch cord, labelling, and certification.',
  },
  {
    question: 'What is a patch panel and why is it used?',
    answer:
      'A patch panel is a passive termination and management device mounted in a comms cabinet or rack. All horizontal data cables are terminated at the back of the patch panel using 110-style IDC (Insulation Displacement Connector) termination. The front of the patch panel provides RJ45 ports that are connected to the network switch using short patch cords. The patch panel provides a structured, labelled termination point for all cables — making moves, adds, and changes straightforward without disturbing the permanent cable infrastructure. Patch panels are available in 12, 24, and 48-port configurations. Use keystone patch panels for flexibility — individual ports can be replaced without replacing the whole panel.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cctv-installation-electrical',
    title: 'CCTV Installation Electrical Requirements',
    description: 'CAT6 for PoE cameras, cable run limits, IP ratings, and NVR power requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/building-management-system',
    title: 'Building Management Systems',
    description: 'BACnet/IP and Modbus TCP network requirements for BMS installations.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/access-control-installation',
    title: 'Access Control Installation',
    description: 'CAT6 for IP access control readers and video intercom systems.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/smart-lighting-control',
    title: 'Smart Lighting Control Systems',
    description: 'DALI, KNX, and Lutron systems — network infrastructure requirements.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote data cabling projects accurately with the Elec-Mate quoting tool.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'cable-categories',
    heading: 'CAT5e, CAT6, and CAT6A Compared',
    content: (
      <>
        <p>
          The category of data cable specified determines the performance ceiling of the cabling
          system for its entire service life — often 15–25 years. Specifying the wrong category
          is an expensive mistake that cannot be corrected without re-cabling.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT5e — legacy, not recommended for new work</strong> — rated for 1Gbps
                to 100 metres (Class D, ISO/IEC 11801). Adequate for voice and basic data but
                does not support 10Gbps at any practical distance. Meets the minimum PoE standard
                (802.3af, 15.4W) but marginal for PoE+ (802.3at, 30W) on long runs. Suitable
                only for like-for-like replacement in existing CAT5e installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6 — current standard for commercial installations</strong> — rated for
                1Gbps to 100 metres and 10Gbps to 55 metres (Class E, ISO/IEC 11801). The
                minimum category for new commercial data cabling in the UK. Supports PoE and
                PoE+ reliably. Available in UTP (Unscreened Twisted Pair), FTP (Foiled Twisted
                Pair), and STP (Shielded Twisted Pair) variants. UTP is standard for most
                commercial applications; screened cable is used in high-interference environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6A — future-proof choice</strong> — rated for 10Gbps to 100 metres
                (Class EA, ISO/IEC 11801). The recommended category for server rooms, backbone
                runs, PoE++ applications (IEEE 802.3bt, 90W), and any installation intended to
                last more than ten years. CAT6A cable is thicker than CAT6 (7–8mm OD vs 6mm)
                and requires 40% larger conduit fill allowance. Specify CAT6A for data centres,
                healthcare, education, and future-proofed commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fibre optic — for backbone and long runs</strong> — multimode fibre
                (OM3 or OM4) for in-building backbone runs up to 300–550 metres at 10Gbps.
                Single-mode fibre for inter-building links and runs over 550 metres. Fibre is
                immune to electromagnetic interference, has no practical length limit for most
                building applications, and is increasingly cost-competitive with copper for
                backbone infrastructure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a rule: specify CAT6 as the minimum for all new work, and CAT6A wherever the
          project budget allows or where 10Gbps to the desktop is a near-term requirement.
        </p>
      </>
    ),
  },
  {
    id: 'cable-testing',
    heading: 'Cable Testing and FLUKE Certification',
    content: (
      <>
        <p>
          Every installed data cabling link must be tested and certified before handover. This
          is not optional — it is the only way to verify that the installation meets the
          performance standard specified and provides a formal record of compliance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What FLUKE certification tests</strong> — a cable certifier such as the
                FLUKE Networks DSX-600 or Versiv platform tests each link against the pass/fail
                limits for the specified category. Key parameters tested: insertion loss (signal
                attenuation), NEXT (Near-End Crosstalk — interference between cable pairs at
                the transmit end), PS-NEXT (Power Sum NEXT — combined crosstalk from all pairs),
                FEXT and PS-FEXT (Far-End Crosstalk), return loss, propagation delay, and delay
                skew. Every parameter must pass for the link to receive a pass result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permanent link vs channel testing</strong> — the permanent link test
                measures from the patch panel port to the work area outlet socket, excluding
                patch cords. This is the correct test for verifying the installed cabling
                infrastructure. Channel testing includes patch cords at both ends and is used
                to verify end-to-end performance after the network is live. Always perform
                permanent link testing at handover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure causes and remediation</strong> — the most common causes of
                certification failure are: incorrect termination (pairs split at punch-down,
                excessive untwisting — maximum 13mm untwisted pair at termination for CAT6),
                damaged cable (kink, crush, or over-tight cable tie), incorrect category of
                patch panel or outlet, and too-tight bend radius. Most failures can be remediated
                by re-terminating the faulty end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification report</strong> — the certifier generates a report for
                every tested link showing all measured parameters, pass/fail status, and the
                test standard applied. Provide the full certification report to the client
                at handover. Store the original certification data on a USB drive or in the
                cloud — the client may need it for insurance, future maintenance, or resale.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'patch-panels',
    heading: 'Patch Panel Installation',
    content: (
      <>
        <p>
          The patch panel is the heart of the data cabling distribution system. Correct installation
          and labelling of the patch panel determines how usable and maintainable the cabling
          infrastructure is for its entire service life.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rack and cabinet layout</strong> — position patch panels at the top of
                the rack (1U per 24 ports). The network switch sits below the patch panel,
                with patch cord management panels (1U cable managers) between each patch panel
                and its associated switch. Cable managers prevent patch cord spaghetti and allow
                individual cords to be traced and replaced without disturbing adjacent ports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination technique</strong> — punch down each pair onto the IDC
                connectors in the correct colour sequence (T568B is standard in the UK). Do
                not untwist more than 13mm of pair at the termination point for CAT6 (8mm for
                CAT6A). Use the punch-down tool's correct blade depth — too shallow and the
                conductor does not make contact; too deep and the insulation is cut back
                excessively. Cut the tail off each conductor cleanly after punch-down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labelling</strong> — every port on the patch panel and every corresponding
                outlet in the work area must carry a unique, permanent label. The label scheme
                should follow ISO/IEC 14763-2 (Part 2 of the structured cabling planning and
                installation standard). A simple convention: floor number, room number, outlet
                number (e.g., 02-14-A for floor 2, room 14, outlet A). Label both the faceplate
                and the cable at the patch panel end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding</strong> — use colour-coded patch cords and keystone
                inserts to distinguish systems: blue for data, yellow for voice/SIP, red for
                management, orange for fibre patch cords, and grey for PoE-powered devices
                (IP cameras, access control readers). Colour coding dramatically reduces
                errors during moves, adds, and changes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'structured-cabling',
    heading: 'Structured Cabling Standards (ISO/IEC 11801)',
    content: (
      <>
        <p>
          ISO/IEC 11801 defines the architecture of a generic structured cabling system suitable
          for voice, data, and building automation services. Its UK equivalent is BS EN 50173.
          Following the standard ensures the cabling system is suitable for any application
          regardless of the network equipment technology in use at the time of installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Horizontal cabling</strong> — cabling from the floor distribution point
                (FDP or IDC cabinet) to the work area outlet. Maximum permanent link length
                90 metres. Each outlet typically serves one or two RJ45 sockets. Horizontal
                cabling must run in dedicated data cable containment (cable tray, basket tray,
                or data-rated trunking), not shared with power cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backbone cabling</strong> — cabling between the main distribution frame
                (MDF, in the main comms room or server room) and the floor distribution frames
                (FDFs) on each floor. For in-building backbone, use multimode fibre (OM3 or
                OM4) or CAT6A copper. Maximum backbone length depends on the cabling class —
                up to 90 metres for copper backbone in Class EA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment rooms and distribution points</strong> — the main comms room
                (MER or server room) houses the MDF and main network equipment. Each floor has
                a telecommunications room (TR) or FDF cabinet housing the floor switch and
                patch panels. Cable routes from each TR to work area outlets must be planned
                to stay within the 90-metre horizontal cable limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work area outlets</strong> — each work area outlet should have a minimum
                of two RJ45 sockets (data and voice, or two data). Face plates should be
                flush-mounted in floor boxes or wall boxes. Use screened face plates in
                high-interference environments. Keystone-style outlets allow individual ports
                to be replaced without replacing the face plate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'server-room',
    heading: 'Server Room Cabling',
    content: (
      <>
        <p>
          Server room cabling requires a higher level of organisation and discipline than general
          office cabling. A well-cabled server room is clean, fully documented, and allows faults
          to be isolated in minutes. A poorly cabled server room is a liability — difficult to
          maintain and prone to errors during changes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured approach</strong> — all cables in the server room must be
                fully labelled at both ends with permanent, machine-printed labels. Every patch
                cord must be the correct length — not coiled excess. Use pre-terminated patch
                cords (not field-terminated) for consistency. Velcro cable ties (not plastic
                cable ties) allow cable management to be adjusted without cutting and replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot aisle/cold aisle cable routing</strong> — in data centres and larger
                server rooms, cable management must work with the hot/cold aisle cooling
                architecture. Run data cables overhead in a raised cable management system above
                the cold aisle. Power cables run separately — typically under floor in a raised
                floor environment or overhead on the opposite side.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separation of power and data</strong> — maintain a minimum 200mm
                separation between unscreened data cables and power cables throughout the
                server room. Use separate overhead basket tray runs for power and data. Where
                they must cross, cross at 90 degrees to minimise inductive coupling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>As-built documentation</strong> — provide a complete as-built schedule
                of all cables — patch panel port number, cable label, destination port, cable
                category, and test result (pass/fail with certifier result file reference).
                The as-built document is an essential operational tool. Update it after every
                move, add, or change.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Tray and Cable Management',
    content: (
      <>
        <p>
          Correct cable containment and management protects cables from physical damage, maintains
          the bend radius required for performance, and makes the installation look professional
          and maintainable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable tray and basket tray</strong> — use perforated cable tray (steel
                or stainless for heavy loads) or wire mesh basket tray for data cable runs in
                ceilings, risers, and server rooms. Basket tray is preferred for data cabling
                as it provides good airflow and easy access. Size the tray for a maximum 40%
                fill factor — the cables should not be stacked more than two layers deep.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bend radius</strong> — the minimum bend radius for CAT6 UTP is four
                times the cable diameter (approximately 24mm for a 6mm cable). For CAT6A,
                the minimum bend radius is eight times the cable diameter (approximately 64mm).
                Never cable-tie cables to the point where the bend radius is violated — this
                causes permanent performance degradation visible in certification test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable ties — velcro preferred</strong> — use velcro cable ties or
                hook-and-loop straps rather than plastic cable ties on data cable bundles.
                Plastic cable ties tightened too far crush the cable, permanently degrading
                crosstalk performance. If plastic ties are used, they should be hand-tight only —
                never tightened with a tool on data cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit for exposed runs</strong> — where cables are exposed in accessible
                areas (below 2.1 metres from floor level), run in conduit or surface trunking.
                Use a minimum 25mm conduit for up to four CAT6 cables; 32mm for up to eight.
                Never exceed 40% conduit fill. Pull strings should be left in all conduit runs
                after installation to allow future cable additions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Data Cabling Costs per Point (2026)',
    content: (
      <>
        <p>
          Data cabling is priced per outlet point (a single RJ45 socket) for general office
          cabling, and per port for server room and structured cabling projects. Prices below
          are for UK commercial installations including materials, labour, containment, and
          FLUKE certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6 outlet point (new build)</strong> — £60–£90 per outlet in a new
                build where cable runs are straightforward, ceilings are accessible, and there
                is no disruption to the occupied space. Includes cable, keystone outlet, face
                plate, patch panel termination, labelling, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6 outlet point (retrofit)</strong> — £90–£150 per outlet in an
                occupied retrofit where cables must be chased into walls, routed around
                obstructions, and installation is more time-consuming. Suspended ceiling access
                is easier than solid ceiling; open-plan offices are easier than cellular offices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6A outlet point</strong> — add £10–£20 per outlet over CAT6 prices
                for the higher cable and outlet cost. CAT6A containment may cost slightly more
                due to larger cable diameter requiring larger conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Server room structured cabling</strong> — £8–£20 per port for patch
                panel installation, labelling, and certification. Overhead cable management
                systems (ladder rack, basket tray) cost £15–£40 per linear metre installed.
                Fibre optic backbone termination: £15–£30 per fibre terminated and polished,
                plus OTDR test.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Larger projects attract economies of scale — a 200-outlet project costs less per outlet
          than a 20-outlet project. Request a site survey before quoting — cable run distances,
          access routes, and wall/ceiling construction significantly affect cost.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Data Cabling Work',
    content: (
      <>
        <p>
          Data cabling is a natural adjacency for electricians — the skills (cable installation,
          containment, termination) are closely related, and many clients prefer a single
          contractor for electrical and data work. Investment in a FLUKE cable certifier (£2,000–
          £5,000) opens a recurring stream of data cabling projects that carry good margin.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Data Cabling Projects Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build accurate quotes for data cabling projects — cable, outlets, patch
                  panels, containment, and certification — all in a professional PDF quote
                  with itemised materials and labour. Send the quote directly from your phone
                  before leaving the site survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Bundle with CCTV and Access Control</h4>
                <p className="text-white text-sm leading-relaxed">
                  Data cabling projects often occur alongside{' '}
                  <SEOInternalLink href="/cctv-installation-electrical">
                    CCTV installation
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/access-control-installation">
                    access control wiring
                  </SEOInternalLink>
                  . All three systems use CAT6 and the same cable containment — offer a bundled
                  low-voltage installation service to win more of the project value.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage data cabling and low-voltage projects with Elec-Mate"
          description="Quote, invoice, and track data cabling installations alongside your electrical work. Professional PDF quotes in minutes. Join UK electricians using Elec-Mate. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DataCablingInstallationPage() {
  return (
    <GuideTemplate
      title="Data Cabling Installation UK | CAT6 & Network Wiring Guide"
      description="Data cabling installation guide for the UK. CAT5e vs CAT6 vs CAT6A explained, FLUKE cable certification, patch panel installation, ISO/IEC 11801 structured cabling standards, server room cabling, cable tray management, and costs per point (£60–£150)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Data & Network Guide"
      badgeIcon={Wifi}
      heroTitle={
        <>
          Data Cabling Installation UK:{' '}
          <span className="text-yellow-400">CAT6 & Network Wiring Guide</span>
        </>
      }
      heroSubtitle="The complete UK guide to data cabling installation — CAT5e, CAT6, and CAT6A compared, FLUKE certification, patch panel installation, ISO/IEC 11801 structured cabling standards, server room cabling, cable management, and 2026 costs per outlet point."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Data Cabling Installation"
      relatedPages={relatedPages}
      ctaHeading="Quote Data Cabling Projects with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote and manage data cabling, CCTV, and low-voltage installations. Professional PDF quotes in minutes. 7-day free trial."
    />
  );
}
