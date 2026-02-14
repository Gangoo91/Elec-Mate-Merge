import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Sun,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Zap,
  Layers,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Renewable Energy Course | Solar PV & Battery Storage';
const PAGE_DESCRIPTION =
  'Comprehensive solar PV and battery storage training for UK electricians. Inverter types, string design, G98/G99 grid connection, MCS certification, battery technologies, and BS 7671 compliance. 10 modules with video content, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Renewable Energy', href: '/training/renewable-energy' },
];

const tocItems = [
  { id: 'why-renewable-energy', label: 'Why Renewable Energy Training Matters' },
  { id: 'solar-pv-fundamentals', label: 'Solar PV Fundamentals' },
  { id: 'system-design', label: 'System Design and String Sizing' },
  { id: 'inverter-types', label: 'Inverter Types' },
  { id: 'battery-storage', label: 'Battery Storage Systems' },
  { id: 'grid-connection', label: 'G98/G99 Grid Connection' },
  { id: 'installation-safety', label: 'Installation and Safety' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Solar PV systems convert sunlight directly into DC electricity using photovoltaic cells — the DC output must be converted to AC by an inverter before it can be used in the property or exported to the grid.',
  'String design involves calculating the number of panels connected in series to match the inverter input voltage range, accounting for temperature coefficients that affect panel voltage in both summer and winter extremes.',
  'G98 (formerly G83) allows connection of small-scale generation up to 16A per phase (3.68 kW single-phase) with a simple notification to the DNO, while G99 (formerly G59) requires formal application and DNO approval for larger installations.',
  'MCS (Microgeneration Certification Scheme) accreditation is required for installers whose customers want to claim the Smart Export Guarantee (SEG) payments for exported electricity.',
  'Battery storage systems use lithium-ion chemistry (typically LFP or NMC) and require careful consideration of installation location, ventilation, fire risk, and integration with the PV system and grid supply.',
];

const faqs = [
  {
    question: 'Do I need special qualifications to install solar PV systems?',
    answer:
      'You need to be a competent electrician (typically Level 3 qualified) with additional training in solar PV installation. To enable your customers to claim the Smart Export Guarantee (SEG) for exported electricity, your company must be MCS (Microgeneration Certification Scheme) certified. MCS certification requires completion of an approved training course (such as the City & Guilds 2399 or EAL Level 3 Award in Solar PV), registration with a competent person scheme (NICEIC, NAPIT, or equivalent), and evidence of practical installations. The Elec-Mate course provides the technical knowledge foundation that prepares you for the MCS-approved training course.',
  },
  {
    question: 'What is the Smart Export Guarantee (SEG)?',
    answer:
      'The Smart Export Guarantee (SEG) replaced the Feed-in Tariff (FiT) in January 2020. Under the SEG, energy suppliers with more than 150,000 customers must offer a tariff for exported electricity from small-scale renewable generation. SEG rates vary between suppliers (typically 4p to 15p per kWh for solar PV) and can be fixed or variable. To be eligible for the SEG, the installation must be carried out by an MCS-certified installer and the system must be certified to MCS standards. A smart meter capable of recording export data is also required.',
  },
  {
    question: 'What is the difference between G98 and G99?',
    answer:
      'G98 (formerly G83) and G99 (formerly G59) are the Engineering Recommendations that govern the connection of small-scale generation to the distribution network. G98 applies to installations up to 16A per phase (3.68 kW for single-phase, 11.04 kW for three-phase) — these only require a simple notification to the DNO, not a formal application. Most domestic solar PV installations fall under G98. G99 applies to installations above these limits and requires a formal application to the DNO, who will assess the network capacity and may impose conditions or require network reinforcement before the installation can proceed. G99 applications can take 45 to 90 working days to process.',
  },
  {
    question: 'How do battery storage systems work with solar PV?',
    answer:
      'Battery storage systems store excess solar generation during the day for use in the evening when the panels are no longer producing. A typical domestic battery (5 to 13 kWh capacity) can store enough energy to power a home through the evening peak demand period. The battery management system (BMS) controls charging and discharging, ensuring the battery operates within safe temperature and voltage limits. Hybrid inverters combine the solar PV inverter and battery inverter in a single unit, simplifying installation. AC-coupled systems use a separate battery inverter connected to the AC side of the installation, allowing battery storage to be added to existing PV systems without replacing the solar inverter.',
  },
  {
    question: 'What are the fire safety considerations for battery storage?',
    answer:
      'Lithium-ion batteries present a fire risk if they are damaged, overcharged, or operated outside their temperature specifications. Thermal runaway — a self-sustaining exothermic reaction — is the primary concern. Battery systems must be installed in a location with adequate ventilation, away from heat sources and direct sunlight. Most manufacturers specify a minimum distance from combustible materials. Installation in living spaces (bedrooms, living rooms) is generally not recommended. The battery management system (BMS) provides multiple layers of protection including over-voltage, under-voltage, over-temperature, over-current, and short-circuit protection. BS 7671:2018+A2:2022 Section 558 covers requirements for electrical energy storage systems.',
  },
  {
    question: 'Can I add battery storage to an existing solar PV system?',
    answer:
      'Yes. Battery storage can be retrofitted to existing solar PV systems using an AC-coupled configuration. An AC-coupled battery system uses its own battery inverter connected to a spare way in the consumer unit. The battery inverter monitors the output of the existing solar inverter (usually via a CT clamp) and charges the battery when excess generation is detected. This approach does not require any changes to the existing solar PV installation — the battery system operates independently on the AC side. DC-coupled retrofits are also possible but typically require replacing the existing solar inverter with a hybrid inverter, which is more disruptive and costly.',
  },
];

const modules = [
  {
    title: 'Introduction to Renewable Energy',
    description:
      'The UK energy landscape, climate targets, renewable energy technologies overview, government incentives (SEG, ECO), and the role of electricians in the renewable energy sector.',
  },
  {
    title: 'Solar PV Cell Technology',
    description:
      'Photovoltaic effect, monocrystalline vs polycrystalline vs thin-film technologies, cell efficiency ratings, temperature coefficients, degradation rates, and data sheet interpretation.',
  },
  {
    title: 'System Design and String Sizing',
    description:
      'Roof assessment (orientation, pitch, shading analysis), energy yield estimation, string sizing calculations accounting for temperature extremes, MPPT voltage windows, and system simulation tools.',
  },
  {
    title: 'Inverter Technology',
    description:
      'String inverters, micro-inverters, and power optimisers. MPPT operation, conversion efficiency, anti-islanding protection, reactive power control, and inverter selection for different system sizes.',
  },
  {
    title: 'Battery Storage Fundamentals',
    description:
      'Lithium-ion chemistry (LFP vs NMC), battery capacity and depth of discharge, cycle life, battery management systems (BMS), thermal management, and fire safety considerations.',
  },
  {
    title: 'Battery System Design and Integration',
    description:
      'AC-coupled vs DC-coupled systems, hybrid inverters, energy management systems, self-consumption optimisation, time-of-use tariff integration, and backup power functionality.',
  },
  {
    title: 'Grid Connection and DNO Requirements',
    description:
      'G98 and G99 Engineering Recommendations, DNO notification and application procedures, export limitation, anti-islanding requirements, and the Electricity Safety, Quality and Continuity Regulations.',
  },
  {
    title: 'DC Wiring and Safety',
    description:
      'DC isolator requirements, MC4 connector installation, cable sizing for DC circuits, string protection (fuses and diodes), arc fault detection, and BS 7671 Section 712 for PV installations.',
  },
  {
    title: 'Installation, Commissioning, and Certification',
    description:
      'Mounting system installation, cable routing and containment, AC and DC testing procedures, commissioning checks, MCS documentation requirements, and handover procedures.',
  },
  {
    title: 'MCS Certification and Business Development',
    description:
      'The MCS certification process, ongoing compliance requirements, consumer code obligations, SEG registration, marketing your solar PV services, and building a sustainable renewable energy business.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any solar PV or battery storage question. Get instant answers on string sizing, inverter selection, G98/G99 requirements, and MCS certification processes.',
  },
  {
    icon: Sun,
    title: 'Video Content',
    description:
      'Step-by-step video guides covering panel installation, DC wiring, inverter commissioning, battery system setup, and CT clamp configuration for export monitoring.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Calculate string sizes, select appropriate inverters, identify DC safety requirements, and design battery storage systems.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule across all ten modules. Daily progress tracking and automated reminders.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering PV cell technologies, inverter types, battery chemistries, G98/G99 thresholds, and BS 7671 Section 712 requirements.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations across all ten modules. Detailed explanations for every answer, readiness scoring, and focused revision recommendations.',
  },
];

const sections = [
  {
    id: 'why-renewable-energy',
    heading: 'Why Renewable Energy Training Matters for Electricians',
    content: (
      <>
        <p>
          The UK government has committed to achieving net zero carbon emissions by 2050. Solar PV
          and battery storage are central to this target, with the government aiming for 70 GW of
          solar capacity by 2035 (up from approximately 15 GW today). For electricians, this
          represents one of the largest growth opportunities in the industry.
        </p>
        <p>
          Solar PV installation is a high-value specialism. A typical domestic installation (4 kWp
          system with battery storage) charges £8,000 to £14,000, and an experienced two-person team
          can complete one installation per day. Commercial rooftop installations, ground-mounted
          arrays, and battery storage retrofits add further revenue streams. The combination of
          electrical installation skills and specialist solar knowledge means qualified installers
          are in strong demand.
        </p>
        <p>
          This Elec-Mate course covers everything from the fundamentals of photovoltaic technology
          through to advanced system design, battery storage integration, and the{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>{' '}
          requirements for PV installations. Whether you are looking to gain{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD points</SEOInternalLink> or
          preparing for MCS certification, this course provides the knowledge foundation you need.
        </p>
      </>
    ),
  },
  {
    id: 'solar-pv-fundamentals',
    heading: 'Solar PV Fundamentals',
    content: (
      <>
        <p>
          Solar photovoltaic (PV) cells convert sunlight directly into electricity through the
          photovoltaic effect. When photons from sunlight strike the semiconductor material in a PV
          cell, they knock electrons free from their atoms, creating a flow of direct current (DC)
          electricity. Multiple cells are connected in series within a panel (module) to produce a
          useful voltage, typically 30 to 50 volts per panel.
        </p>
        <p>
          <strong>Monocrystalline panels</strong> use cells cut from a single silicon crystal. They
          offer the highest efficiency (typically 20 to 23%) and the best performance in low-light
          conditions, but are the most expensive per watt. <strong>Polycrystalline panels</strong>{' '}
          use cells made from multiple silicon crystals and offer slightly lower efficiency (17 to
          20%) at a lower cost. <strong>Thin-film panels</strong> use a thin layer of photovoltaic
          material deposited on glass or flexible substrate — they are the cheapest but have the
          lowest efficiency (10 to 13%).
        </p>
        <p>
          Panel output is rated under Standard Test Conditions (STC): 1000 W/m² irradiance, 25
          degrees C cell temperature, and AM1.5 spectrum. Real-world output is always lower than STC
          rating due to temperature effects (output decreases as temperature rises), shading,
          soiling, cable losses, and inverter conversion efficiency. A realistic annual yield
          estimate for south-facing panels in the UK is approximately 800 to 1000 kWh per kWp
          installed.
        </p>
      </>
    ),
  },
  {
    id: 'system-design',
    heading: 'System Design and String Sizing',
    content: (
      <>
        <p>
          String sizing is one of the most critical aspects of solar PV system design. Panels
          connected in series form a string, and the string voltage must fall within the operating
          voltage range of the inverter's MPPT (Maximum Power Point Tracker) input under all
          temperature conditions.
        </p>
        <p>
          The key calculation involves the panel's open-circuit voltage (Voc) and its temperature
          coefficient. On a cold winter morning with bright sunshine, the panel temperature could be
          as low as -10 degrees C, causing the voltage to rise significantly above the STC value.
          The string voltage must not exceed the inverter's maximum input voltage under these
          conditions, or the inverter could be damaged. Conversely, on a hot summer day with panel
          temperatures above 60 degrees C, the string voltage drops and must remain above the
          inverter's minimum MPPT voltage for effective tracking.
        </p>
        <p>
          Shading analysis is equally important. Even partial shading of a single cell in a string
          can dramatically reduce the output of the entire string. Micro-inverters and power
          optimisers can mitigate shading effects by allowing each panel to operate at its
          individual maximum power point, independent of other panels in the array.
        </p>
        <SEOAppBridge
          title="AI-powered explanations for solar PV design"
          description="Struggling with string sizing calculations? Not sure how temperature coefficients affect your design? Ask the Elec-Mate AI tutor any solar PV question and get a step-by-step worked example with clear explanations."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'inverter-types',
    heading: 'Inverter Types',
    content: (
      <>
        <p>
          The inverter converts the DC output from the solar panels into AC electricity that can be
          used by the property's loads and exported to the grid. Inverter selection significantly
          affects system performance, reliability, and cost.
        </p>
        <p>
          <strong>String inverters</strong> are the most common type for domestic installations. A
          single inverter converts the DC output from one or more strings of panels. They are
          cost-effective, reliable, and easy to maintain. Modern string inverters achieve conversion
          efficiencies above 97%. The main limitation is that the performance of the entire string
          is limited by the weakest panel — if one panel is shaded or underperforming, all panels in
          the string are affected.
        </p>
        <p>
          <strong>Micro-inverters</strong> are mounted behind each individual panel, converting DC
          to AC at the panel level. This eliminates the string effect — each panel operates
          independently at its maximum power point. Micro-inverters are ideal for roofs with
          multiple orientations or partial shading issues, though they are more expensive per watt
          and involve more components.
        </p>
        <p>
          <strong>Hybrid inverters</strong> combine a solar PV inverter with a battery inverter in a
          single unit. They manage the flow of energy between the solar panels, battery, property
          loads, and grid. Hybrid inverters simplify the installation of combined PV and battery
          storage systems and are increasingly the standard choice for new installations.
        </p>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage Systems',
    content: (
      <>
        <p>
          Battery storage transforms a solar PV system from a daytime-only energy source into a
          round-the-clock energy solution. By storing excess solar generation during the day, the
          battery provides power during the evening peak demand period when electricity tariffs are
          highest and solar generation has stopped.
        </p>
        <p>
          The dominant battery chemistry for domestic storage is lithium-ion, available in two main
          variants. <strong>Lithium Iron Phosphate (LFP)</strong> offers excellent cycle life
          (6,000+ cycles), superior thermal stability, and lower fire risk, but has a slightly lower
          energy density. <strong>Nickel Manganese Cobalt (NMC)</strong> offers higher energy
          density (smaller physical size for the same capacity) but fewer cycle life and slightly
          higher thermal risk. Popular UK battery brands use both chemistries.
        </p>
        <p>
          Key specifications to understand include: <strong>usable capacity</strong> (the actual
          energy available after depth of discharge limits),{' '}
          <strong>continuous power rating</strong>
          (the maximum sustained output in kW), <strong>peak power rating</strong> (short-term
          maximum for startup loads), and <strong>round-trip efficiency</strong> (typically 90 to
          95%, meaning 5 to 10% of stored energy is lost in the charge/discharge cycle).
        </p>
        <p>
          {' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            BS 7671:2018+A2:2022 Section 558
          </SEOInternalLink>{' '}
          covers the wiring regulations for electrical energy storage systems, including
          requirements for disconnection, isolation, marking, and protection against electric shock
          from stored energy.
        </p>
      </>
    ),
  },
  {
    id: 'grid-connection',
    heading: 'G98/G99 Grid Connection',
    content: (
      <>
        <p>
          Any generation equipment connected to the electricity distribution network must comply
          with the relevant Engineering Recommendation — G98 for smaller installations and G99 for
          larger ones.
        </p>
        <p>
          <strong>G98</strong> (formerly G83) applies to installations with a generating capacity up
          to 16A per phase — that is 3.68 kW for single-phase connections and 11.04 kW for
          three-phase connections. G98 installations require only a simple notification to the
          Distribution Network Operator (DNO) within 28 days of commissioning. Most domestic solar
          PV installations (typically 3 to 4 kWp) fall within the G98 threshold.
        </p>
        <p>
          <strong>G99</strong> (formerly G59) applies to installations above the G98 limits. G99
          requires a formal application to the DNO before installation begins. The DNO will assess
          the network capacity at the connection point and may require network reinforcement before
          approving the connection. The application process can take 45 to 90 working days, so it
          must be factored into the project timeline. Commercial rooftop PV installations and larger
          domestic systems with battery storage may exceed the G98 threshold and require G99.
        </p>
        <p>
          Both G98 and G99 require anti-islanding protection — the inverter must automatically
          disconnect from the grid within 0.5 seconds if the grid supply is lost, to prevent the PV
          system from energising the distribution network while engineers may be working on it.
        </p>
      </>
    ),
  },
  {
    id: 'installation-safety',
    heading: 'Installation and Safety',
    content: (
      <>
        <p>
          Solar PV installation involves{' '}
          <SEOInternalLink href="/training/working-at-height">working at height</SEOInternalLink> on
          rooftops, handling DC circuits that cannot be switched off while the panels are exposed to
          light, and connecting to the grid supply. A thorough understanding of the safety risks is
          essential.
        </p>
        <p>
          DC safety is the primary concern specific to solar PV. Unlike AC circuits that can be
          isolated at the consumer unit, PV panels generate voltage whenever light falls on them. A
          typical domestic string voltage can be 300 to 600 V DC, which is potentially lethal. DC
          isolators must be provided at both the array end (on the roof) and the inverter end. Cable
          runs between the roof array and the inverter must use double-insulated solar-rated cable
          (typically 4 mm² or 6 mm² single-core).
        </p>
        <p>
          Before any roof work, assess for the presence of{' '}
          <SEOInternalLink href="/training/asbestos-awareness">
            asbestos-containing materials
          </SEOInternalLink>{' '}
          in the roof structure. Pre-2000 buildings may have asbestos cement roof tiles, soffits, or
          backing sheets that could be disturbed during mounting rail installation.
        </p>
        <p>
          <SEOInternalLink href="/tools/cable-sizing-calculator">Cable sizing</SEOInternalLink> for
          DC circuits follows the same principles as AC circuits but uses DC voltage for the voltage
          drop calculation. BS 7671 Section 712 contains the specific requirements for solar PV
          installations, including isolation, protection, and marking requirements.
        </p>
        <SEOAppBridge
          title="46+ structured courses with progress tracking"
          description="Study solar PV alongside BS 7671, inspection and testing, EV charging, and dozens more courses — all included in your Elec-Mate subscription. Track your progress across every course with visual dashboards and AI-recommended study paths."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description: 'The natural partner to solar PV — install chargers powered by renewable energy.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/domestic-installer',
    title: 'Domestic Installer Course',
    description: 'Part P building regulations for domestic PV and battery storage installations.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate DC and AC cable sizes for solar PV installations with voltage drop verification.',
    icon: Zap,
    category: 'Calculator',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description: 'Section 712 covers the wiring regulations for solar PV installations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate App',
    description: 'Generate professional solar PV installation certificates with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description: 'Essential safety training for rooftop solar PV installation work.',
    icon: ShieldCheck,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Renewable Energy Course — Solar PV & Battery Storage',
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
      courseWorkload: 'PT16H',
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

export default function RenewableEnergyCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Renewable Energy Training"
      badgeIcon={Sun}
      heroTitle={
        <>
          Renewable Energy Course:{' '}
          <span className="text-yellow-400">Solar PV & Battery Storage</span>
        </>
      }
      heroSubtitle="Master solar PV and battery storage installation with comprehensive training. System design, string sizing, inverter types, G98/G99 grid connection, MCS certification, and BS 7671 Section 712 compliance. 10 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={18}
      courseDuration="16 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended"
      courseModules={10}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians wanting to offer solar PV and battery storage installation, apprentices preparing for the renewable energy market, and domestic installers adding solar to their service range"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to enter the renewable energy market?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 10 structured modules, interactive quizzes, video content, and an AI tutor for any solar PV or battery storage question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/renewable-energy"
    />
  );
}
