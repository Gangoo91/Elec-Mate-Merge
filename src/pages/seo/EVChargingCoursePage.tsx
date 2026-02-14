import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Car,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Zap,
  Layers,
  FileCheck2,
  PlugZap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'EV Charger Installation Course | IET Code of Practice';
const PAGE_DESCRIPTION =
  'Complete EV charger installation training for UK electricians. IET Code of Practice, Mode 1-4 charging, earthing requirements, PME restrictions, load management, and BS 7671 compliance. 7 modules with video content, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'EV Charger Installation', href: '/training/ev-charger-installation' },
];

const tocItems = [
  { id: 'why-ev-training', label: 'Why EV Charger Training Matters' },
  { id: 'charging-modes', label: 'Charging Modes 1 to 4' },
  { id: 'iet-code-of-practice', label: 'IET Code of Practice' },
  { id: 'earthing-requirements', label: 'Earthing and PME Restrictions' },
  { id: 'load-management', label: 'Load Management and Smart Charging' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (4th Edition, 2020) is the primary reference document for EV charger installations in the UK, supplementing BS 7671.',
  'Mode 3 (dedicated EVSE with control pilot) is the standard for UK domestic and commercial installations — Mode 1 and Mode 2 are not intended as permanent charging solutions.',
  'PME (TN-C-S) earthing systems require additional protective measures for EV charging, including earth electrode installation or use of a charger with PEN fault detection, due to the risk of transferring a PEN conductor fault to the vehicle body.',
  'Load management (static or dynamic) is essential to prevent overloading the supply — the DNO must be notified for installations above 3.68 kW single-phase or 11 kW three-phase under the Electricity Safety, Quality and Continuity Regulations (ESQCR).',
  'OZEV (Office for Zero Emission Vehicles) grants and the Electric Vehicles (Smart Charge Points) Regulations 2021 require all new domestic charge points to have smart functionality.',
];

const faqs = [
  {
    question: 'Do I need special qualifications to install EV chargers?',
    answer:
      'You need to be a competent electrician (typically holding a Level 3 qualification in electrical installation or equivalent) and you must have knowledge of the IET Code of Practice for Electric Vehicle Charging Equipment Installation. Most EV charger manufacturers require installers to complete their specific product training before they will register you as an approved installer. Being registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent) is essential for self-certifying the work under Part P of the Building Regulations, as EV charger installation is notifiable work. The Elec-Mate course provides the technical knowledge foundation — you will also need the manufacturer-specific training for the brands you intend to install.',
  },
  {
    question: 'What is the PME restriction for EV chargers?',
    answer:
      'On a PME (Protective Multiple Earthing) supply — which is the TN-C-S earthing arrangement used by the majority of UK domestic properties — there is a risk that a broken PEN conductor in the supply cable could place a dangerous voltage on the exposed-conductive-parts of the EV charger and, critically, on the vehicle body. Because a person could be touching the vehicle while standing on the ground (providing a path to true earth), this presents a serious electric shock risk. The IET Code of Practice requires one of three solutions: (1) install an earth electrode and use it as the sole means of earthing for the EV circuit, (2) use a charge point with built-in PEN fault detection that will disconnect the supply if a PEN conductor fault is detected, or (3) use protective equipotential bonding to the vehicle — though this is rarely practical. Most modern UK chargers include PEN fault detection as standard.',
  },
  {
    question: 'How long does it take to install a typical domestic EV charger?',
    answer:
      'A standard domestic EV charger installation typically takes 2 to 4 hours for a straightforward installation. This includes: surveying the supply and existing installation, installing a dedicated circuit from the consumer unit (usually 32A radial circuit in 6 mm twin and earth or equivalent), mounting the charge point unit on the external wall near the parking space, cable routing and clipping, earth electrode installation if required, functional testing, commissioning, and completing the electrical installation certificate. More complex installations — where the consumer unit needs upgrading, the cable run is long, or load management devices need fitting — can take a full day. Always allow time for the BS 7671 testing sequence and documentation.',
  },
  {
    question: 'What is dynamic load management for EV chargers?',
    answer:
      'Dynamic load management uses a CT (current transformer) clamp on the incoming supply tails to continuously monitor the total current being drawn by the property. The load management system communicates with the EV charger in real time, automatically reducing the charging current when other loads in the property increase, and increasing the charging current when demand falls. This prevents the total demand from exceeding the supply capacity (typically 60A or 80A for a domestic supply). Without load management, a 7.4 kW charger drawing 32A on a single phase could overload the supply when other heavy loads (electric shower, oven, hob) are also in use. Dynamic load management is strongly recommended by the IET Code of Practice and is a requirement for many OZEV grant-funded installations.',
  },
  {
    question: 'Do I need to notify the DNO when installing an EV charger?',
    answer:
      'Yes, in most cases. Under the Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR), the Distribution Network Operator (DNO) must be notified of any new connection or increase in load above 3.68 kW for single-phase or 11 kW for three-phase supplies. A standard 7.4 kW single-phase domestic charger exceeds the 3.68 kW threshold, so DNO notification is required. Notification can usually be done online through the DNO portal. The DNO may require a supply upgrade if the existing supply cannot support the additional load, which could involve additional cost and lead time. Some charger manufacturers and installation companies handle DNO notification as part of their installation service.',
  },
  {
    question: 'What cable size is needed for a 7.4 kW domestic EV charger?',
    answer:
      'A 7.4 kW single-phase EV charger draws approximately 32A at 230V. The minimum cable size depends on the installation method, cable length, ambient temperature, and whether correction factors for grouping or thermal insulation apply. For a typical domestic installation using standard twin and earth cable clipped direct, 6 mm² is the starting point for short runs (up to approximately 20 metres). For longer cable runs, you must verify that voltage drop does not exceed the BS 7671 limits (typically 3% for lighting, 5% for other circuits). The Elec-Mate cable sizing calculator can determine the correct size for your specific installation, accounting for all applicable correction factors and voltage drop.',
  },
];

const modules = [
  {
    title: 'Electric Vehicle Charging Fundamentals',
    description:
      'EV battery technology overview, charging modes 1 to 4, connector types (Type 1, Type 2, CCS, CHAdeMO), charging power levels, and UK market overview.',
  },
  {
    title: 'The IET Code of Practice',
    description:
      'Detailed coverage of the IET Code of Practice for EV Charging Equipment Installation (4th Edition). Scope, definitions, assessment of supply characteristics, and design considerations.',
  },
  {
    title: 'Earthing Arrangements and PME Restrictions',
    description:
      'TN-S, TN-C-S (PME), and TT earthing systems. The PME risk for EV charging, earth electrode installation, PEN fault detection devices, and protective measures for each earthing arrangement.',
  },
  {
    title: 'Circuit Design and Cable Sizing',
    description:
      'Dedicated circuit requirements, cable selection and sizing for EV circuits, voltage drop calculations, protective device selection (MCB, RCBO, Type A or Type B RCD requirements), and cable routing.',
  },
  {
    title: 'Load Management and DNO Requirements',
    description:
      'Static and dynamic load management systems, CT clamp installation, communication protocols (OCPP), DNO notification requirements, ESQCR regulations, and supply capacity assessment.',
  },
  {
    title: 'Smart Charging and Regulations',
    description:
      'Electric Vehicles (Smart Charge Points) Regulations 2021, OZEV grant requirements, smart functionality (off-peak scheduling, solar integration), OCPP compliance, and cybersecurity considerations.',
  },
  {
    title: 'Installation, Commissioning, and Certification',
    description:
      'Site survey procedures, physical installation steps, BS 7671 testing sequence for EV circuits, commissioning checks, completing the EIC, manufacturer registration, and customer handover.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any EV charging question in plain English. Get instant answers on PME restrictions, cable sizing, load management calculations, and IET Code of Practice requirements.',
  },
  {
    icon: PlugZap,
    title: 'Video Content',
    description:
      'Step-by-step installation videos covering earth electrode installation, CT clamp fitting, cable routing, and commissioning procedures for popular UK charger brands.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Calculate cable sizes, identify earthing requirements, and select the correct protective devices for real-world installations.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set a target date for completing the course and Elec-Mate creates your personal study schedule. Daily progress tracking and reminder notifications keep you on track.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards on charging modes, connector types, earthing arrangements, IET Code of Practice key requirements, and BS 7671 regulations for EV circuits.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations across all seven modules. Instant marking, detailed explanations, and a readiness score that shows when you are fully prepared.',
  },
];

const sections = [
  {
    id: 'why-ev-training',
    heading: 'Why EV Charger Training Matters for Electricians',
    content: (
      <>
        <p>
          The UK government has set a target to end the sale of new petrol and diesel cars by 2035.
          With over 1 million battery electric vehicles already registered on UK roads and numbers
          growing rapidly, the demand for qualified EV charger installers is enormous and will
          continue to increase for at least the next decade.
        </p>
        <p>
          EV charger installation is a high-value specialism for electricians. A typical domestic
          installation charges £800 to £1,500 including the charge point, and an experienced
          installer can complete 2 to 3 installations per day. Commercial installations for
          workplaces, car parks, and fleet depots command even higher fees. The work combines
          standard{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            BS 7671 electrical installation
          </SEOInternalLink>{' '}
          skills with specialist knowledge of the IET Code of Practice, making it ideal for
          qualified electricians looking to increase their earning potential.
        </p>
        <p>
          This Elec-Mate course covers everything you need to know to design, install, commission,
          and certify EV charging installations to current UK standards. From the fundamentals of EV
          charging through to advanced topics like dynamic load management and smart charging
          regulations, every module is designed for practical, real-world application.
        </p>
      </>
    ),
  },
  {
    id: 'charging-modes',
    heading: 'Charging Modes 1 to 4',
    content: (
      <>
        <p>
          IEC 61851-1 defines four charging modes that describe how an electric vehicle communicates
          with and is charged by the supply infrastructure.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Mode 1 — Direct Connection</h3>
              <p className="text-white text-sm leading-relaxed">
                Direct connection to a standard domestic socket outlet without any dedicated control
                or communication. Limited to 8A (1.8 kW). Not recommended for use in the UK and
                essentially obsolete for EV charging.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Mode 2 — Portable EVSE</h3>
              <p className="text-white text-sm leading-relaxed">
                Connection via a portable charging cable with an in-cable control and protection
                device (IC-CPD). Plugs into a standard 13A socket or commando socket. Provides basic
                communication and protection. Typically limited to 2.3 kW (10A). Intended as
                emergency or occasional use — not a permanent charging solution.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Mode 3 — Dedicated EVSE (AC)</h3>
              <p className="text-white text-sm leading-relaxed">
                Permanent wall-mounted or pedestal charging unit with control pilot communication
                between the vehicle and the charger. This is the standard for UK domestic and
                commercial installations. Single-phase units provide up to 7.4 kW (32A), while
                three-phase units can deliver up to 22 kW.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Mode 4 — DC Fast Charging</h3>
              <p className="text-white text-sm leading-relaxed">
                DC rapid and ultra-rapid charging at 50 kW to 350 kW. The AC-to-DC conversion
                happens in the charger rather than the vehicle. Used at motorway service stations
                and public charging hubs. Requires dedicated high-voltage three-phase supply and
                specialist installation by the manufacturer.
              </p>
            </div>
          </div>
        </div>
        <p>
          For UK electricians, Mode 3 installations are the bread and butter of EV charging work.
          This course focuses primarily on Mode 3, covering both single-phase domestic and
          three-phase commercial installations.
        </p>
      </>
    ),
  },
  {
    id: 'iet-code-of-practice',
    heading: 'The IET Code of Practice for EV Charging',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the
          primary reference document for EV charger installations in the UK. Now in its 4th edition
          (2020), it supplements{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink> with
          specific guidance for the unique requirements of EV charging installations.
        </p>
        <p>
          The Code of Practice covers site assessment, supply evaluation, circuit design, earthing
          arrangements, cable selection, load management, testing and commissioning, and
          documentation. It is not a British Standard — it is guidance — but following it
          demonstrates competence and is expected by competent person scheme bodies.
        </p>
        <p>
          Key topics include the assessment of the existing supply capacity (maximum demand
          calculation), the selection of appropriate protective devices (including the requirement
          for Type A or Type B RCD protection to detect DC fault currents from the vehicle's onboard
          charger), and the requirement for dedicated circuits that are not shared with other loads.
        </p>
        <SEOAppBridge
          title="Master the IET Code of Practice with AI-powered explanations"
          description="Not sure about the PME earthing requirements? Need help with a maximum demand calculation for an EV circuit? Ask the Elec-Mate AI tutor any question about the IET Code of Practice and get a clear, referenced answer."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'earthing-requirements',
    heading: 'Earthing and PME Restrictions',
    content: (
      <>
        <p>
          Earthing is arguably the most important and most frequently misunderstood aspect of EV
          charger installation. The IET Code of Practice dedicates significant attention to earthing
          arrangements because the consequences of getting it wrong could be fatal.
        </p>
        <p>
          On a <strong>TN-S</strong> supply (separate neutral and earth conductors back to the
          transformer), standard earthing practices apply. The earth terminal of the EV circuit is
          connected to the main earthing terminal of the installation, which is connected to the
          supply earth conductor. No additional protective measures beyond standard BS 7671
          requirements are needed.
        </p>
        <p>
          On a <strong>TN-C-S (PME)</strong> supply — which is the most common earthing arrangement
          for UK domestic properties — there is a specific risk for EV charging. If the combined
          neutral and earth (PEN) conductor breaks between the property and the transformer, the
          earthing terminal in the property could rise to a dangerous potential. Because an EV user
          may be touching the vehicle body while standing on the ground (true earth), this creates a
          shock path that bypasses the installation's earthing system.
        </p>
        <p>
          On a <strong>TT</strong> supply, the installation relies on a local earth electrode rather
          than the supply earth. For EV charging on TT systems, the earth electrode resistance must
          be low enough to ensure the RCD operates within the required disconnection time. The{' '}
          <SEOInternalLink href="/tools/earth-loop-impedance-calculator">
            earth fault loop impedance
          </SEOInternalLink>{' '}
          must be verified during commissioning.
        </p>
      </>
    ),
  },
  {
    id: 'load-management',
    heading: 'Load Management and Smart Charging',
    content: (
      <>
        <p>
          Load management ensures that the total electrical demand from the property, including the
          EV charger, does not exceed the capacity of the supply. Without load management, a 7.4 kW
          charger drawing 32A on a single-phase supply could overload a 60A or 80A supply when
          combined with other domestic loads.
        </p>
        <p>
          <strong>Static load management</strong> permanently limits the charger output to a level
          that, even with maximum concurrent domestic load, will not exceed the supply capacity.
          This is the simplest approach but limits the charging speed permanently — even when other
          loads are not in use.
        </p>
        <p>
          <strong>Dynamic load management</strong> uses a CT clamp on the incoming supply tails to
          monitor total current in real time. The charger automatically adjusts its output based on
          the available capacity, charging at full speed when other loads are low and reducing speed
          when other loads increase. This maximises charging speed without exceeding the supply
          capacity.
        </p>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 require all new domestic
          charge points to have smart functionality, including the ability to schedule charging for
          off-peak periods, respond to demand-side response signals, and provide usage data to the
          vehicle owner. This integrates with the wider goal of managing electricity grid demand as
          EV adoption increases.
        </p>
        <SEOAppBridge
          title="46+ structured courses including EV charging"
          description="Elec-Mate provides 46+ structured courses with video content, interactive quizzes, progress tracking, and an AI tutor. Study EV charging installation alongside BS 7671, inspection and testing, and dozens more topics — all for one subscription."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'Installation Process',
    content: (
      <>
        <p>
          A typical domestic EV charger installation follows a structured process from initial
          survey through to handover and certification.
        </p>
        <p>
          The <strong>site survey</strong> assesses the existing supply (supply capacity, earthing
          arrangement, available ways in the consumer unit), identifies the optimum charger location
          (proximity to parking space, cable route, structural considerations), and determines
          whether any additional work is needed (consumer unit upgrade, earth electrode
          installation, load management device). The survey should also identify any{' '}
          <SEOInternalLink href="/training/asbestos-awareness">
            asbestos-containing materials
          </SEOInternalLink>{' '}
          that might be disturbed during cable routing.
        </p>
        <p>
          The <strong>electrical installation</strong> includes fitting a dedicated circuit from the
          consumer unit, selecting the correct{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">cable size</SEOInternalLink> for
          the run length and installation method, installing the protective device (typically a 32A
          Type B or Type A RCBO), and mounting and connecting the charge point unit.
        </p>
        <p>
          <strong>Testing and commissioning</strong> follows the standard{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            BS 7671 testing sequence
          </SEOInternalLink>
          : continuity of protective conductors, insulation resistance, polarity, earth fault loop
          impedance, prospective fault current, and RCD operation. The charger's own commissioning
          procedure (Wi-Fi configuration, app setup, load management verification) must also be
          completed.
        </p>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued for the new circuit. Building control notification is required under Part P
          if you are not registered with a competent person scheme.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description:
      'BS 5839 training covering system categories, grades, detector types, and commissioning.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description:
      'Solar PV and battery storage training — the natural partner to EV charging installations.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for EV charger circuits with voltage drop verification.',
    icon: Zap,
    category: 'Calculator',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description: 'The wiring regulations that form the foundation of all EV charger installations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue professional Electrical Installation Certificates for EV charger installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/domestic-installer',
    title: 'Domestic Installer Course',
    description:
      'Part P building regulations and competent person scheme requirements for self-certification.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'EV Charger Installation Course — IET Code of Practice',
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
      courseWorkload: 'PT10H',
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

export default function EVChargingCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Training"
      badgeIcon={Car}
      heroTitle={
        <>
          EV Charger Installation Course:{' '}
          <span className="text-yellow-400">IET Code of Practice</span>
        </>
      }
      heroSubtitle="Master EV charger installation with comprehensive IET Code of Practice training. Charging modes 1-4, earthing and PME restrictions, load management, smart charging regulations, and BS 7671 compliance. 7 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={14}
      courseDuration="10 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended"
      courseModules={7}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians wanting to offer EV charger installation services, apprentices preparing for the growing EV market, and domestic installers expanding their service range"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to install EV chargers?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 7 structured modules, interactive quizzes, video content, and an AI tutor for any EV charging question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/ev-charger-installation"
    />
  );
}
