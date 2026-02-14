import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  ShieldCheck,
  Sun,
  Lightbulb,
  BarChart3,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Energy Efficiency Course | Electrical & Building Services';
const PAGE_DESCRIPTION =
  'Energy efficiency training for UK electricians. Part L Building Regulations, LED lighting design, power factor correction, voltage optimisation, EPC ratings, and energy auditing. 7 modules with video lessons, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Energy Efficiency', href: '/training/energy-efficiency' },
];

const tocItems = [
  { id: 'why-energy-efficiency', label: 'Why Energy Efficiency Matters' },
  { id: 'part-l-regulations', label: 'Part L Building Regulations' },
  { id: 'lighting-efficiency', label: 'Lighting Efficiency and LED Design' },
  { id: 'power-quality', label: 'Power Factor and Power Quality' },
  { id: 'energy-auditing', label: 'Energy Auditing Skills' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Energy efficiency is now a core competency for electricians — Building Regulations Part L 2021 sets strict limits on energy consumption for new buildings and major renovations, and electricians must understand how their installations affect overall building performance.',
  'LED lighting design is one of the most impactful energy efficiency measures electricians can recommend — correctly designed LED schemes can reduce lighting energy consumption by 60-80% compared to fluorescent and halogen systems.',
  'Power factor correction saves commercial clients significant money on electricity bills — a poor power factor (below 0.95) results in reactive power charges from energy suppliers that can add thousands of pounds to annual bills.',
  'Energy Performance Certificates (EPCs) are legally required for all buildings sold or let in the UK — electricians who understand EPC methodology can recommend improvements that genuinely raise a property rating.',
  'Voltage optimisation, smart lighting controls, solar PV integration, and building management systems represent growing revenue streams for electricians who upskill in energy efficiency.',
];

const faqs = [
  {
    question: 'Why should electricians learn about energy efficiency?',
    answer:
      'Energy efficiency is no longer a specialist niche — it is mainstream electrical work. Building Regulations Part L 2021 sets strict energy performance targets for all new buildings and major renovations. Electricians are responsible for installing the systems that consume the most energy: lighting, heating controls, EV chargers, and power distribution. Clients increasingly ask for energy-saving recommendations, and electricians who can provide informed advice win more work and command higher rates. The push towards net zero by 2050 means demand for energy-efficient electrical installations will only increase.',
  },
  {
    question: 'What does Part L of the Building Regulations cover?',
    answer:
      'Part L (Conservation of Fuel and Power) sets minimum energy performance standards for buildings. Part L 2021 introduced significantly tighter requirements. For electricians, the key areas are: maximum lighting power density (watts per square metre) for commercial and domestic lighting installations, minimum efficacy requirements for light sources (lumens per watt), requirements for lighting controls (occupancy sensing, daylight dimming, time scheduling), metering and monitoring provisions for larger installations, and the requirement that fixed building services (including electrical installations) do not use more energy than necessary. Compliance with Part L is checked as part of the building control sign-off process.',
  },
  {
    question: 'What is power factor and why does it matter?',
    answer:
      'Power factor is the ratio of real power (kW) to apparent power (kVA) in an AC circuit. A power factor of 1.0 means all the power drawn from the supply is doing useful work. A power factor below 1.0 means the installation is drawing more current than necessary, resulting in higher cable losses, increased demand on transformers, and reactive power charges from the electricity supplier. Commercial and industrial electricity tariffs include reactive power charges when the power factor falls below 0.95. Power factor correction (typically using capacitor banks) reduces these charges and improves the efficiency of the entire installation. Electricians who can identify poor power factor and recommend correction measures provide genuine value to commercial clients.',
  },
  {
    question: 'How does LED lighting design differ from traditional lighting?',
    answer:
      'LED lighting design requires a different approach from traditional lamp-for-lamp replacement. Key differences include: colour temperature selection (warm white 2700-3000K for domestic, neutral white 4000K for commercial), colour rendering index (CRI 80+ for general areas, CRI 90+ for retail and healthcare), lumen output and distribution (LEDs are directional, so luminaire optic design matters), driver compatibility with dimming systems (DALI, 1-10V, trailing-edge phase dimming), thermal management (LED performance degrades with heat), and glare control (UGR rating for office environments). The course covers lumen method calculations, lighting layouts, and compliance with CIBSE lighting guides and Part L requirements.',
  },
  {
    question: 'What is an Energy Performance Certificate (EPC)?',
    answer:
      'An Energy Performance Certificate (EPC) rates the energy efficiency of a building from A (most efficient) to G (least efficient). EPCs are legally required whenever a building is constructed, sold, or let. The certificate shows the current rating and a potential rating that could be achieved with recommended improvements. From 2025, rented properties in England and Wales must achieve a minimum EPC rating of C (with some exemptions). Electricians can contribute to improving EPC ratings through LED lighting upgrades, smart heating controls, solar PV installation, and improved metering. Understanding the EPC methodology helps electricians recommend measures that will genuinely improve the rating rather than guessing.',
  },
  {
    question: 'Does this course count towards CPD?',
    answer:
      'Yes. Energy efficiency training is highly relevant CPD activity and is recognised by all major competent person schemes including NICEIC, NAPIT, and ELECSA. Understanding energy efficiency regulations and technologies is increasingly expected as part of electrician professional competence. The course includes a downloadable CPD certificate on completion, and Elec-Mate automatically tracks your CPD hours within the platform.',
  },
];

const modules = [
  {
    title: 'Energy Efficiency Fundamentals',
    description:
      'Energy consumption in buildings, the UK net zero target, the role of electricians in reducing energy use, energy units and measurement, and the business case for energy efficiency improvements.',
  },
  {
    title: 'Building Regulations Part L',
    description:
      'Part L 2021 requirements in detail. Maximum lighting power densities, minimum luminous efficacy, lighting controls requirements, metering provisions, and the interaction between Part L and BS 7671.',
  },
  {
    title: 'LED Lighting Design and Efficiency',
    description:
      'LED technology, colour temperature, CRI, driver types, dimming compatibility, lumen method calculations, lighting layouts for compliance with Part L and CIBSE guides, and retrofitting existing installations.',
  },
  {
    title: 'Smart Lighting Controls',
    description:
      'DALI lighting control, occupancy sensing (PIR, microwave, ultrasonic), daylight harvesting, time scheduling, scene control, and emergency lighting integration. Commissioning smart lighting systems.',
  },
  {
    title: 'Power Factor and Power Quality',
    description:
      'Power factor explained, measuring power factor, reactive power charges, capacitor bank sizing and installation, harmonic distortion from LED drivers and VFDs, and power quality monitoring.',
  },
  {
    title: 'Renewable Energy Integration',
    description:
      'Solar PV system overview, battery storage basics, EV charger load management, voltage optimisation, and how these technologies integrate with the building electrical installation.',
  },
  {
    title: 'Energy Auditing and EPCs',
    description:
      'Carrying out a basic energy audit, identifying energy waste, EPC methodology and ratings, recommending cost-effective improvements, and presenting findings to clients. Assessment and CPD certificate.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any energy efficiency question in plain English. Get instant answers on Part L compliance, lighting calculations, power factor correction, and EPC improvements.',
  },
  {
    icon: Lightbulb,
    title: 'LED Design Calculations',
    description:
      'Step-by-step lumen method calculations, luminaire selection guides, and lighting layout exercises. Learn to design compliant, efficient lighting schemes from scratch.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Visual dashboards show your strengths and areas for improvement across all seven modules. Focus your study time where it matters most.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based assessments after every module. Calculate lighting densities, size capacitor banks, assess EPC improvements, and demonstrate regulatory knowledge.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Complete the course on your phone, tablet, or desktop. Study during breaks on site, at home, or on the commute. Progress syncs across all your devices automatically.',
  },
  {
    icon: FileCheck2,
    title: 'CPD Certificate',
    description:
      'Downloadable CPD certificate on successful completion of all seven modules. Automatically recorded in your Elec-Mate CPD portfolio.',
  },
];

const sections = [
  {
    id: 'why-energy-efficiency',
    heading: 'Why Energy Efficiency Matters for Electricians',
    content: (
      <>
        <p>
          The UK has committed to achieving net zero carbon emissions by 2050. Buildings account for
          approximately 40% of the UK's total energy consumption, and electrical systems — lighting,
          heating controls, power distribution, and plug loads — are responsible for a large
          proportion of that energy use. This means electricians are on the front line of the net
          zero transition.
        </p>
        <p>
          Building Regulations Part L 2021 introduced significantly tighter energy performance
          standards for new buildings. The Future Homes Standard, expected to take effect in 2025,
          will push requirements even further. For electricians, this means that energy-efficient
          design is no longer optional — it is a compliance requirement that affects every
          installation you carry out.
        </p>
        <p>
          Beyond compliance, energy efficiency represents a major commercial opportunity. Clients
          are increasingly aware of their energy costs and carbon footprint. Electricians who can
          recommend and install energy-saving measures — LED lighting upgrades, smart controls,{' '}
          <SEOInternalLink href="/training/renewable-energy">
            renewable energy systems
          </SEOInternalLink>
          , and power factor correction — win more work, command premium rates, and build stronger
          client relationships. The{' '}
          <SEOInternalLink href="/training/bms-building-management-systems">
            BMS course
          </SEOInternalLink>{' '}
          covers the building automation systems that tie energy efficiency measures together.
        </p>
        <SEOAppBridge
          title="46+ courses including energy efficiency"
          description="Elec-Mate gives you access to every course on the platform — energy efficiency, renewable energy, BMS, and all the core electrical qualifications. One subscription covers everything."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'part-l-regulations',
    heading: 'Part L Building Regulations',
    content: (
      <>
        <p>
          Part L of the Building Regulations (Conservation of Fuel and Power) is the primary
          regulatory driver for energy efficiency in UK buildings. The 2021 edition introduced
          substantial changes that directly affect electrical installations.
        </p>
        <p>
          <strong>Lighting power density limits</strong> set maximum watts per square metre for
          different building types and room uses. Office general areas are limited to 8 W/m2,
          corridors and circulation to 6 W/m2, and warehouses and storage to 4 W/m2. These limits
          apply to the total installed lighting load, including all luminaires, and electricians
          must calculate compliance as part of their design.
        </p>
        <p>
          <strong>Minimum luminous efficacy</strong> requirements specify that light sources must
          achieve a minimum of 80 lumens per watt for general lighting. This effectively mandates
          LED technology for all new installations, as no other commercially available technology
          consistently achieves this efficacy.
        </p>
        <p>
          <strong>Lighting controls</strong> are now mandatory in many commercial settings.
          Occupancy-based switching or dimming, daylight-responsive dimming, and time scheduling are
          required to prevent lighting energy being wasted in unoccupied or daylit spaces.
          Electricians installing commercial lighting must understand{' '}
          <SEOInternalLink href="/training/smart-home-automation">
            smart control systems
          </SEOInternalLink>{' '}
          and their commissioning requirements.
        </p>
        <p>
          <strong>Metering and monitoring</strong> provisions require that energy use can be
          monitored in buildings above a certain size. This includes sub-metering of lighting
          circuits, small power circuits, and other significant loads. Electricians must allow for
          metering points in their distribution board designs and understand how data from these
          meters feeds into the building's energy management strategy.
        </p>
      </>
    ),
  },
  {
    id: 'lighting-efficiency',
    heading: 'Lighting Efficiency and LED Design',
    content: (
      <>
        <p>
          Lighting accounts for approximately 20% of electricity consumption in commercial buildings
          and 15% in domestic properties. Upgrading to LED technology is one of the most
          cost-effective energy efficiency measures available, with typical payback periods of 1 to
          3 years for commercial retrofits.
        </p>
        <p>
          Effective LED lighting design goes far beyond swapping old lamps for LED equivalents. The
          directional nature of LED light means that luminaire selection, optic design, and spacing
          calculations are critical for achieving uniform illumination without glare. Colour
          temperature selection affects both visual comfort and energy perception — warm white
          (2700-3000K) creates a relaxed atmosphere suitable for domestic and hospitality settings,
          while neutral white (4000K) provides a bright, productive environment for offices and
          retail.
        </p>
        <p>
          <strong>Colour rendering index (CRI)</strong> measures how accurately a light source
          reveals the true colours of objects. A CRI of 80+ is acceptable for general areas, but
          retail displays, healthcare environments, and art galleries require CRI 90+ or higher.
          Specifying the wrong CRI can result in complaints and costly replacements.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          help ensure your LED lighting circuits are correctly designed for both efficiency and
          compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'power-quality',
    heading: 'Power Factor and Power Quality',
    content: (
      <>
        <p>
          Power factor is one of the most overlooked aspects of energy efficiency in electrical
          installations. A poor power factor means the installation draws more current from the
          supply than necessary, resulting in higher losses in cables and transformers, increased
          demand on the supply infrastructure, and direct financial penalties from energy suppliers.
        </p>
        <p>
          Most commercial and industrial electricity tariffs include a reactive power charge when
          the power factor falls below 0.95 (or sometimes 0.90). For a medium-sized commercial
          building, reactive power charges can amount to several thousand pounds per year — a cost
          that can be largely eliminated by installing power factor correction equipment.
        </p>
        <p>
          <strong>Capacitor banks</strong> are the most common method of power factor correction.
          They supply reactive power locally, reducing the reactive current drawn from the supply.
          Sizing requires measurement of the existing reactive power demand using a power quality
          analyser. The capacitor bank is typically installed at the main switchboard and controlled
          by an automatic power factor controller that switches capacitor steps to maintain the
          target power factor.
        </p>
        <p>
          <strong>Harmonic distortion</strong> is an increasingly important power quality issue as
          more non-linear loads (LED drivers, variable frequency drives, switch-mode power supplies)
          are connected to building installations. High harmonic distortion can cause overheating of
          neutral conductors, transformer derating, and interference with sensitive equipment. The{' '}
          <SEOInternalLink href="/tools/power-factor-calculator">
            power factor calculator
          </SEOInternalLink>{' '}
          helps electricians assess and quantify power quality issues.
        </p>
      </>
    ),
  },
  {
    id: 'energy-auditing',
    heading: 'Energy Auditing Skills',
    content: (
      <>
        <p>
          An energy audit is a systematic assessment of how energy is used in a building, where it
          is wasted, and what measures can be implemented to reduce consumption. Electricians who
          can carry out basic energy audits add significant value to their services and open up new
          revenue streams.
        </p>
        <p>
          The audit process begins with data gathering — electricity bills (to establish baseline
          consumption and costs), building plans (to understand the installed systems), and
          operational schedules (to identify when and where energy is used). Site walkthrough
          surveys then identify energy waste: lights left on in unoccupied areas, inefficient lamp
          types, poor power factor, oversized motors, and missing or poorly configured controls.
        </p>
        <p>
          Measurement and verification using portable instruments — power loggers, lux meters,
          thermal cameras, and power quality analysers — provides the data needed to quantify
          savings from proposed measures. Presenting findings in a clear, client-friendly report
          with estimated costs, savings, and payback periods is essential for securing approval for
          improvement works.
        </p>
        <p>
          Energy Performance Certificates (EPCs) provide a standardised framework for rating
          building energy performance. Electricians who understand the EPC methodology can make
          targeted recommendations that improve ratings efficiently. With minimum EPC requirements
          tightening for rented properties, this is a growing market for electricians across the UK.
        </p>
        <SEOAppBridge
          title="Energy efficiency training with practical exercises"
          description="The Elec-Mate course includes practical exercises where you carry out simulated energy audits, calculate lighting densities, size capacitor banks, and recommend EPC improvements. All supported by the AI study assistant."
          icon={Sun}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description:
      'Solar PV, battery storage, and heat pump integration complement energy efficiency skills.',
    icon: Sun,
    category: 'Training',
  },
  {
    href: '/training/bms-building-management-systems',
    title: 'BMS Course',
    description:
      'Building management systems are the central control platform for energy-efficient buildings.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/smart-home-automation',
    title: 'Smart Home Automation Course',
    description:
      'Smart controls for lighting, heating, and power contribute to domestic energy efficiency.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/ev-charging',
    title: 'EV Charging Course',
    description:
      'EV charger load management and solar integration are key energy efficiency topics.',
    icon: Zap,
    category: 'Training',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'Energy efficiency training is highly valued CPD activity for competent person schemes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Minimising voltage drop reduces energy waste in cable runs across any installation.',
    icon: ShieldCheck,
    category: 'Tool',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Energy Efficiency Course — Electrical & Building Services',
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

export default function EnergyEfficiencyCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="CPD Training"
      badgeIcon={Sun}
      heroTitle={
        <>
          Energy Efficiency Course:{' '}
          <span className="text-yellow-400">Electrical & Building Services</span>
        </>
      }
      heroSubtitle="Comprehensive energy efficiency training for UK electricians. Part L compliance, LED lighting design, power factor correction, smart controls, and energy auditing. 7 modules with video content, practical exercises, and AI-powered study tools."
      readingTime={12}
      courseDuration="10 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended"
      courseModules={7}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios."
      courseWhoIsItFor="Qualified electricians, electrical designers, and energy consultants looking to add energy efficiency skills to their practice and comply with Part L 2021 requirements"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Future-proof your career with energy efficiency skills"
      ctaSubheading="Join 430+ UK electricians training smarter with Elec-Mate. 7 in-depth modules, practical exercises, AI study assistant, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/energy-efficiency"
    />
  );
}
