import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Cable,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Wifi,
  Home,
  Network,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Data Cabling Course | Cat 6 & Fibre Optic Training';
const PAGE_DESCRIPTION =
  'Comprehensive data cabling training for UK electricians. Cat 5e, Cat 6, Cat 6A copper cabling, single-mode and multimode fibre optics, structured cabling standards, termination, testing, and certification. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Data Cabling', href: '/training/data-cabling' },
];

const tocItems = [
  { id: 'why-data-cabling', label: 'Why Data Cabling Training Matters' },
  { id: 'copper-cabling', label: 'Copper Cabling Standards' },
  { id: 'fibre-optics', label: 'Fibre Optic Fundamentals' },
  { id: 'structured-cabling', label: 'Structured Cabling Design' },
  { id: 'termination-testing', label: 'Termination and Testing' },
  { id: 'poe-networks', label: 'PoE and Network Infrastructure' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cat 6 cable supports frequencies up to 250 MHz and is the minimum standard for new installations — Cat 6A extends this to 500 MHz and supports 10 Gigabit Ethernet over the full 100-metre permanent link distance.',
  'Fibre optic cabling comes in two main types: single-mode (OS1/OS2) for long-distance backbone runs and multimode (OM3/OM4/OM5) for shorter data centre and building backbone connections — understanding when to specify each type is essential.',
  'Structured cabling follows the EN 50173/ISO 11801 star topology with horizontal cabling from floor distributors to telecommunications outlets, and backbone cabling connecting floor distributors to the building distributor.',
  'Every data cable installation must be tested and certified using a channel or permanent link adapter — a simple continuity or wire map test is not sufficient. Fluke DSX CableAnalyzer or equivalent is the industry standard tool.',
  'Power over Ethernet (PoE) is driving increased demand for data cabling as Wi-Fi access points, IP cameras, VoIP phones, and LED lighting systems all require Cat 6/6A connections with PoE support.',
];

const faqs = [
  {
    question: 'Do I need a separate qualification to install data cabling?',
    answer:
      'There is no legal requirement for a specific data cabling qualification in the UK, but competence is expected. The main industry body is the Telecommunications Industry Association (TIA) internationally and the Building Industry Consulting Service International (BICSI) which offers the Registered Communications Distribution Designer (RCDD) and Installer (INST) certifications. Many clients and main contractors require installers to hold a City & Guilds 3667 (Structured Cabling) or equivalent qualification. This Elec-Mate course provides the theoretical knowledge of copper and fibre cabling standards, termination techniques, and testing procedures. For formal certification, hands-on practical training with a BICSI or manufacturer-accredited provider is additionally recommended.',
  },
  {
    question: 'What is the difference between Cat 6 and Cat 6A cable?',
    answer:
      'Cat 6 cable supports frequencies up to 250 MHz and can deliver 10 Gigabit Ethernet (10GBASE-T) over short distances (up to 55 metres), but is rated for 1 Gigabit Ethernet over the full 100-metre permanent link. Cat 6A (Augmented Category 6) supports frequencies up to 500 MHz and delivers 10 Gigabit Ethernet over the full 100-metre permanent link. Cat 6A cable has improved alien crosstalk (AXT) performance due to tighter twist rates and often includes an overall foil shield (F/UTP). Cat 6A is the recommended minimum for new installations, particularly where PoE, Wi-Fi 6/6E access points, or future-proofing for higher network speeds are considerations. The cable is thicker and has a larger bend radius than Cat 6, which must be factored into containment sizing.',
  },
  {
    question: 'Can electricians install fibre optic cabling?',
    answer:
      'Yes, electricians can and do install fibre optic cabling. The physical installation — routing cables through containment, pulling through ducts, and securing at termination points — uses the same skills as copper cabling. Fibre termination (splicing and connectorisation) requires additional specialist skills and equipment. Fusion splicing uses a machine that aligns and melts the glass fibres together, while mechanical splicing uses an alignment sleeve. Pre-terminated fibre assemblies (pre-made patch leads and trunk cables with factory-fitted connectors) are increasingly popular as they eliminate the need for on-site splicing. This course covers both termination methods and the theory behind fibre optic transmission.',
  },
  {
    question: 'What testing is required for data cable certification?',
    answer:
      'Data cable certification requires testing with a field tester capable of measuring performance parameters defined in EN 50173 (or TIA-568 for projects specifying US standards). The key parameters tested include wire map (correct pin-to-pin connectivity), insertion loss (signal attenuation), near-end crosstalk (NEXT), power sum NEXT (PSNEXT), return loss, propagation delay, delay skew, and for Cat 6A, alien crosstalk (AXT). Testing is performed using either a permanent link adapter (testing the fixed cabling only) or a channel adapter (testing the complete channel including patch leads). Each test result is compared against the pass/fail limits for the specified category. The tester generates a certificate for each link that must be provided to the client as part of the handover documentation.',
  },
  {
    question: 'What is structured cabling and why does it matter?',
    answer:
      'Structured cabling is a standardised approach to building telecommunications infrastructure defined by EN 50173 (European) and ISO/IEC 11801 (international). It specifies a hierarchical star topology with three subsystems: backbone cabling (connecting building and floor distributors), horizontal cabling (connecting floor distributors to telecommunications outlets at workstations), and work area cabling (patch leads connecting devices to outlets). The key benefit is vendor independence — a properly installed structured cabling system supports any network technology (Ethernet, Wi-Fi, VoIP, CCTV, building management) without rewiring. It also simplifies moves, adds, and changes (MACs) as users relocate within a building. For electricians, structured cabling work commands premium rates and provides steady demand from office fit-outs, new-build commercial projects, and data centre construction.',
  },
  {
    question: 'How does Power over Ethernet affect cabling requirements?',
    answer:
      'Power over Ethernet (PoE) delivers DC power alongside data over the same Cat 5e/6/6A cable. The latest standard, IEEE 802.3bt (Type 4 / 4PPoE), delivers up to 90W at the power sourcing equipment (PSE), with approximately 71W available at the powered device after cable losses. PoE generates additional heat in cable bundles, which can raise conductor temperature and increase insertion loss. For PoE installations, especially in large bundles, Cat 6A cable is recommended as its superior performance margins accommodate the temperature rise. EN 50174-2 provides guidance on derating factors for PoE bundles. Cable pathway sizing should account for the additional heat dissipation requirements — avoid tightly packed, unventilated cable trays for high-power PoE deployments.',
  },
];

const modules = [
  {
    title: 'Introduction to Data Cabling',
    description:
      'Overview of the data cabling industry, career opportunities for electricians, relevant standards (EN 50173, ISO 11801, TIA-568), and the structured cabling model.',
  },
  {
    title: 'Copper Cable Types and Specifications',
    description:
      'Cat 5e, Cat 6, Cat 6A, and Cat 8 cable construction. UTP, FTP, S/FTP shielding configurations. Performance parameters: bandwidth, insertion loss, crosstalk, return loss.',
  },
  {
    title: 'Fibre Optic Fundamentals',
    description:
      'Light transmission principles, single-mode (OS1/OS2) and multimode (OM1-OM5) fibres, connector types (LC, SC, MTP/MPO), cable construction, and bend radius requirements.',
  },
  {
    title: 'Structured Cabling Design',
    description:
      'Star topology architecture, horizontal and backbone subsystems, telecommunications rooms, equipment rooms, entrance facilities, and pathway sizing calculations.',
  },
  {
    title: 'Copper Termination Techniques',
    description:
      'RJ45 jack termination (T568A and T568B wiring), patch panel punchdown, cable preparation and pair management, maintaining twist rates, and shielded termination.',
  },
  {
    title: 'Fibre Optic Termination and Splicing',
    description:
      'Fusion splicing principles and equipment, mechanical splicing, pre-terminated assemblies, fibre preparation and cleaving, splice enclosures, and patch panel management.',
  },
  {
    title: 'Testing, Certification, and Documentation',
    description:
      'Field tester operation (Fluke DSX, VIAVI), permanent link versus channel testing, interpreting test results, pass/fail criteria, certification reports, and as-built documentation.',
  },
  {
    title: 'PoE, Wi-Fi, and Active Equipment',
    description:
      'Power over Ethernet standards (802.3af/at/bt), PoE switch selection, Wi-Fi access point placement, IP camera cabling, VoIP deployments, and network rack/cabinet installation.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any data cabling question in plain English. Get clear answers on cable specifications, termination techniques, testing parameters, and structured cabling standards.',
  },
  {
    icon: Network,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of RJ45 termination, patch panel punchdown, fibre splicing, cable testing procedures, and rack installation techniques.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge with scenario-based questions on cable selection, termination standards, test result interpretation, and structured cabling design.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course with reminder notifications.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering cable categories, fibre types, connector specifications, test parameters, and standards references.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length assessments covering all eight modules. Instant marking with detailed explanations for every answer. Track your readiness score over time.',
  },
];

const sections = [
  {
    id: 'why-data-cabling',
    heading: 'Why Data Cabling Training Matters for Electricians',
    content: (
      <>
        <p>
          Data cabling is one of the fastest-growing specialisms for electricians in the UK. Every
          new office fit-out, commercial building, school, hospital, and data centre requires
          structured cabling infrastructure. The explosion of IoT devices, Wi-Fi access points, IP
          security cameras, and PoE-powered equipment means demand for competent data cable
          installers continues to accelerate.
        </p>
        <p>
          For electricians already skilled in cable routing, containment installation, and building
          infrastructure, data cabling is a natural extension. The physical installation skills
          transfer directly — the additional knowledge required covers cable specifications,
          termination techniques, testing procedures, and the structured cabling standards that
          govern design and installation quality.
        </p>
        <p>
          Data cabling work commands premium rates. A competent data cabling installer can charge
          £250 to £400 per day, with large commercial projects providing weeks or months of
          sustained work. Combining data cabling with{' '}
          <SEOInternalLink href="/training/smart-home-automation">
            smart home automation
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/training/fire-alarm-systems">fire alarm systems</SEOInternalLink>{' '}
          creates a compelling multi-discipline service offering that differentiates you from
          general electrical contractors.
        </p>
      </>
    ),
  },
  {
    id: 'copper-cabling',
    heading: 'Copper Cabling Standards',
    content: (
      <>
        <p>
          Copper twisted-pair cable remains the foundation of building network infrastructure. The
          cable categories defined in EN 50173 and TIA-568 specify performance requirements at
          increasing frequencies, with each higher category supporting faster data transmission
          rates.
        </p>
        <p>
          <strong>Cat 5e</strong> (Category 5 enhanced) supports up to 100 MHz and is rated for
          Gigabit Ethernet (1000BASE-T). While still functional, Cat 5e is considered legacy and is
          not recommended for new installations. <strong>Cat 6</strong> supports up to 250 MHz and
          delivers 1 Gigabit Ethernet reliably, with limited 10 Gigabit support over short
          distances. <strong>Cat 6A</strong> (Augmented Category 6) supports up to 500 MHz and
          delivers 10 Gigabit Ethernet (10GBASE-T) over the full 100-metre permanent link — this is
          the recommended minimum for all new commercial installations.
        </p>
        <p>
          Cable construction varies by shielding type. UTP (Unshielded Twisted Pair) relies solely
          on the twist rate of each pair to reject electromagnetic interference. F/UTP (Foiled
          Unshielded Twisted Pair) adds an overall foil shield for improved alien crosstalk
          performance. S/FTP (Screened Foiled Twisted Pair) adds both an overall braid shield and
          individual pair foil shields — used in high-interference environments and data centres.
          Shielded cables require grounded termination hardware and correct bonding to achieve their
          specified performance.
        </p>
        <SEOAppBridge
          title="Learn cable specifications with AI-powered explanations"
          description="Not sure whether to specify Cat 6 or Cat 6A for your project? Confused about shielding types? Ask the Elec-Mate AI tutor and get clear, practical guidance with standards references."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'fibre-optics',
    heading: 'Fibre Optic Fundamentals',
    content: (
      <>
        <p>
          Fibre optic cables transmit data as pulses of light through glass or plastic fibres,
          achieving vastly higher bandwidths and longer distances than copper cables. Fibre is
          immune to electromagnetic interference, does not conduct electricity (eliminating earth
          loop and lightning concerns), and provides inherent security as the signal cannot be
          tapped without detection.
        </p>
        <p>
          <strong>Single-mode fibre</strong> (OS1 for indoor, OS2 for outdoor) has a very small core
          diameter (9 micrometres) that allows only one mode of light to propagate. This enables
          transmission distances of tens of kilometres without amplification, making it the standard
          for campus backbones, wide area networks, and telecommunications. Single-mode uses laser
          light sources and is more expensive to terminate than multimode.
        </p>
        <p>
          <strong>Multimode fibre</strong> has a larger core (50 or 62.5 micrometres) that allows
          multiple modes of light to propagate. OM3 supports 10 Gigabit Ethernet to 300 metres, OM4
          extends this to 400 metres, and OM5 adds support for wavelength division multiplexing for
          future-proofed data centre deployments. Multimode uses lower-cost LED or VCSEL light
          sources and is the standard for building backbone and{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">data centre</SEOInternalLink>{' '}
          interconnections within a single building or campus.
        </p>
        <p>
          Common fibre connector types include LC (Lucent Connector, the most widely used in modern
          installations), SC (Subscriber Connector, common in older installations and
          telecommunications), and MTP/MPO (Multi-fibre Push On, used for high-density data centre
          trunk cables carrying 12 or 24 fibres in a single connector).
        </p>
      </>
    ),
  },
  {
    id: 'structured-cabling',
    heading: 'Structured Cabling Design',
    content: (
      <>
        <p>
          Structured cabling follows the hierarchical star topology defined in EN 50173 and ISO/IEC
          11801. The standard specifies three cabling subsystems: backbone cabling (connecting
          building and campus distributors), horizontal cabling (connecting floor distributors to
          telecommunications outlets), and work area cabling (patch leads and equipment cords).
        </p>
        <p>
          The horizontal cabling subsystem connects each telecommunications outlet (TO) back to the
          floor distributor (FD) using a dedicated cable run. The maximum permanent link length is
          90 metres, with an additional 10 metres allowed for patch leads and equipment cords at
          each end (giving a total channel length of 100 metres). Each outlet should be served by a
          minimum of two cables — one for data and one for voice or a future service.
        </p>
        <p>
          Floor distributors (comms rooms or telecoms closets) house the patch panels, network
          switches, and PoE power sourcing equipment for their floor. They require adequate space
          for equipment racks (typically 42U floor-standing cabinets), cooling, power (UPS-backed
          dedicated circuits), and cable management. Building distributors serve as the central
          point where backbone cables from each floor converge, along with external service provider
          connections and core network equipment.
        </p>
        <p>
          Pathway design — cable trays, baskets, conduit, and trunking — must accommodate the cable
          fill ratio specified in the standards (typically 40% to 60% of cross-sectional area to
          allow for future additions and adequate ventilation). Separation from power cables must
          comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            BS 7671 Chapter 52
          </SEOInternalLink>{' '}
          electromagnetic compatibility requirements.
        </p>
      </>
    ),
  },
  {
    id: 'termination-testing',
    heading: 'Termination and Testing',
    content: (
      <>
        <p>
          Correct termination technique is critical to achieving the specified cable category
          performance. Poor termination is the most common cause of test failures on data cabling
          installations. The key principles are: maintain pair twist as close to the termination
          point as possible (no more than 13mm untwisted for Cat 6), use the correct wiring standard
          throughout (T568A or T568B — never mix within an installation), and dress cables neatly
          without kinking, crushing, or exceeding the minimum bend radius.
        </p>
        <p>
          For Cat 6A terminated cables, the increased frequency (500 MHz) makes termination quality
          even more critical. Many Cat 6A systems use toolless jack modules with built-in wire
          management that maintains pair twist within the connector body. Shielded systems require
          the drain wire or foil to make reliable 360-degree contact with the jack or patch panel
          shield connection — a poor shield termination can cause worse performance than an
          unshielded system.
        </p>
        <p>
          Testing and certification is mandatory for every installed link. A Level III field tester
          (such as the Fluke DSX-5000 or VIAVI CertiFiber) measures all required performance
          parameters and compares results against the pass/fail limits for the specified category.
          The test report for each link becomes part of the handover documentation and serves as the
          installation warranty evidence. For fibre optic installations, Tier 1 testing (insertion
          loss per link) is the minimum requirement, with Tier 2 testing (OTDR trace showing the
          entire fibre path) recommended for backbone and campus connections.
        </p>
      </>
    ),
  },
  {
    id: 'poe-networks',
    heading: 'Power over Ethernet and Network Infrastructure',
    content: (
      <>
        <p>
          Power over Ethernet (PoE) is transforming the role of data cabling from a passive
          connectivity medium to an active power delivery system. The latest IEEE 802.3bt standard
          (Type 4 / 4PPoE) delivers up to 90W of DC power over all four pairs of a Cat 5e/6/6A
          cable, enabling powered devices including Wi-Fi 6E access points, PTZ security cameras,
          LED lighting panels, digital signage, and point-of-sale terminals.
        </p>
        <p>
          For electricians, PoE creates significant opportunities. Every Wi-Fi access point, IP
          camera, and VoIP phone in a modern building requires a data cable run back to a PoE switch
          — this is data cabling work, not traditional electrical work. The combination of
          electrical installation skills (for the switch room power supply, UPS, and earthing) and
          data cabling skills (for the horizontal cabling, termination, and testing) makes
          electricians uniquely well-positioned to deliver complete PoE infrastructure projects.
        </p>
        <p>
          PoE considerations for cable installers include: specifying Cat 6A for runs where large
          cable bundles carry PoE (the additional heat generated by power delivery raises conductor
          temperature and increases insertion loss), ensuring adequate ventilation in cable
          pathways, verifying that patch panels and outlets are rated for PoE power levels, and
          confirming that the PoE switch budget provides sufficient power for all connected devices
          including future expansion.
        </p>
        <SEOAppBridge
          title="Calculate PoE power budgets with interactive tools"
          description="Use the Elec-Mate PoE calculator to plan switch power budgets, estimate cable temperature rise in bundles, and verify that your cabling infrastructure supports the required power delivery."
          icon={Network}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/smart-home-automation',
    title: 'Smart Home Automation Course',
    description:
      'Smart home installations depend on reliable data cabling infrastructure for network connectivity.',
    icon: Home,
    category: 'Training',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description: 'IP-based fire alarm systems and networking integration for building management.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations covering electromagnetic compatibility and data cable separation requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description:
      'Smart EV chargers require data connectivity for load management and billing systems.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/electrical-science-fundamentals',
    title: 'Electrical Science Fundamentals',
    description:
      'The electrical theory foundation for understanding PoE power delivery and cable performance.',
    icon: ShieldCheck,
    category: 'Training',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate cable sizes for power circuits that supply network equipment rooms and switch cabinets.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Data Cabling Course — Cat 6 & Fibre Optic Training',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT12H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DataCablingCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Training"
      badgeIcon={Cable}
      heroTitle={
        <>
          Data Cabling Course: <span className="text-yellow-400">Cat 6 & Fibre Optic Training</span>
        </>
      }
      heroSubtitle="Master data cabling with comprehensive training covering Cat 5e, Cat 6, Cat 6A copper cabling, single-mode and multimode fibre optics, structured cabling design, termination, testing, and certification. 8 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={13}
      courseDuration="12 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 2 electrical qualification or equivalent practical experience recommended"
      courseModules={8}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians expanding into data cabling, apprentices looking to add network infrastructure skills, and existing data cable installers seeking to formalise their knowledge"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to add data cabling to your skill set?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 8 structured modules covering copper and fibre cabling, structured design, termination, and testing. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/data-cabling"
    />
  );
}
