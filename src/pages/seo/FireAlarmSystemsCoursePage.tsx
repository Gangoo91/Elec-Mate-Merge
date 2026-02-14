import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Flame,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Radio,
  Layers,
  FileCheck2,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Fire Alarm Systems Course | BS 5839 Training';
const PAGE_DESCRIPTION =
  'Comprehensive BS 5839 fire alarm systems training for UK electricians. System categories L1-L5, grades A-F, detector types, zoning, commissioning and maintenance. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Fire Alarm Systems', href: '/training/fire-alarm-systems' },
];

const tocItems = [
  { id: 'why-fire-alarm-training', label: 'Why Fire Alarm Training Matters' },
  { id: 'bs-5839-overview', label: 'BS 5839 Overview' },
  { id: 'system-categories', label: 'System Categories L1-L5' },
  { id: 'system-grades', label: 'System Grades A-F' },
  { id: 'detector-types', label: 'Detector Types and Selection' },
  { id: 'zoning-and-circuits', label: 'Zoning and Circuit Design' },
  { id: 'commissioning', label: 'Commissioning and Handover' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 5839-1 covers fire detection and alarm systems for buildings, while BS 5839-6 covers domestic dwellings — both are essential knowledge for electricians working on fire alarm installations.',
  'System categories range from L1 (full coverage of the entire building) to L5 (engineered system protecting specific risks), with L2 and L3 being the most commonly specified in commercial premises.',
  'System grades range from Grade A (conventional or addressable panel with dedicated wiring) through to Grade F (standalone battery-powered smoke alarms), with each grade specifying different levels of equipment and interconnection.',
  'Detector selection depends on the environment — optical smoke detectors for smouldering fires, ionisation for fast-flaming fires, heat detectors for kitchens and dusty environments, and multi-sensor detectors for mixed-risk areas.',
  'Commissioning a fire alarm system requires systematic verification of every zone, device, cause-and-effect, and sounder level — Elec-Mate walks you through the full commissioning procedure with interactive checklists.',
];

const faqs = [
  {
    question: 'What is the difference between BS 5839-1 and BS 5839-6?',
    answer:
      'BS 5839-1:2017 covers fire detection and fire alarm systems for buildings other than domestic dwellings. It applies to commercial, industrial, and public buildings including offices, factories, shops, hospitals, schools, and hotels. BS 5839-6:2019 specifically covers fire detection and fire alarm systems for domestic dwellings — houses, flats, and houses in multiple occupation (HMOs). The domestic standard is simpler and uses the grading system (A to F) to specify equipment levels. Electricians working on domestic installations need to understand BS 5839-6, while those working on commercial systems need BS 5839-1. Many electricians need to know both.',
  },
  {
    question: 'What system category should be installed in an HMO?',
    answer:
      'Houses in Multiple Occupation (HMOs) typically require at least an LD2 system under BS 5839-6. LD2 covers all escape routes plus rooms or areas that present a high fire risk, such as kitchens, living rooms where occupants may fall asleep, and any room where a fire could start and develop undetected. Some local authorities and housing standards may require LD1 (full coverage) for larger HMOs, particularly those with three or more storeys. The LACORS fire safety guide (now the National Fire Chiefs Council guidance) provides detailed recommendations. Always check with the local authority for specific requirements, as they vary by council and building type.',
  },
  {
    question: 'Can electricians install fire alarm systems?',
    answer:
      'Electricians can install, commission, and maintain fire alarm systems provided they have the appropriate competence. For domestic systems under BS 5839-6, a qualified electrician (Level 3 or equivalent) with knowledge of the standard can design and install systems up to Grade D. For commercial systems under BS 5839-1, third-party certification is typically required — firms should be certificated by a UKAS-accredited body such as BAFE (British Approvals for Fire Equipment) to SP203-1. The Elec-Mate course provides the technical knowledge foundation, though practical experience and potentially additional certification are also needed.',
  },
  {
    question: 'How often do fire alarm systems need servicing?',
    answer:
      'BS 5839-1 requires routine testing weekly (by the building occupier, typically activating a different call point each week), quarterly inspections by a competent person, and annual maintenance and testing of every device by a competent fire alarm engineer. Battery-backed sounders and standby batteries must be tested under load annually. Detectors should be functionally tested at least annually using appropriate test equipment — not just visually inspected. BS 5839-6 domestic systems should be tested weekly by the occupier pressing the test button, with detector heads replaced according to manufacturer recommendations (typically every 10 years for smoke alarms).',
  },
  {
    question: 'What is a cause-and-effect matrix in fire alarm design?',
    answer:
      'A cause-and-effect matrix is a document that defines what happens when each zone or device activates. For example, activation of a smoke detector in Zone 3 (first floor corridor) might trigger: all sounders to alert mode, release of fire doors on the first floor, activation of stairwell pressurisation fans, lift recall to ground floor, and notification to the monitoring centre. The matrix is agreed during the design stage between the fire alarm designer, the building owner, and the fire risk assessor. During commissioning, every combination in the matrix must be tested and verified. This course covers how to read, interpret, and verify cause-and-effect matrices.',
  },
  {
    question: 'What are addressable fire alarm systems?',
    answer:
      'In an addressable fire alarm system, every device (detector, call point, sounder, module) has a unique digital address on the loop circuit. The fire alarm panel communicates individually with each device, meaning it can identify exactly which device has activated — not just which zone. This provides precise location information, faster fault identification, and more flexible zoning. Addressable systems use loop wiring (typically a single pair of fire-rated cable running from the panel through every device and back), compared to conventional systems which use radial zone circuits. Addressable systems are standard for all but the smallest commercial installations.',
  },
];

const modules = [
  {
    title: 'Introduction to Fire Detection and Alarm Systems',
    description:
      'The purpose of fire alarm systems, relevant legislation (Regulatory Reform (Fire Safety) Order 2005), BS 5839-1 and BS 5839-6 overview, and the role of the electrician in fire alarm work.',
  },
  {
    title: 'System Categories and Coverage',
    description:
      'Life protection categories L1 to L5 and property protection categories P1 and P2. How to determine the correct category based on building use, fire risk assessment, and regulatory requirements.',
  },
  {
    title: 'System Grades A to F',
    description:
      'Domestic grading under BS 5839-6. Grade A (conventional panel with dedicated wiring) through Grade F (standalone alarms). Interlinked systems, radio-linked detectors, and Grade D installations for new-build housing.',
  },
  {
    title: 'Detection Devices and Their Applications',
    description:
      'Optical smoke detectors, ionisation detectors, heat detectors (fixed temperature and rate-of-rise), multi-sensor detectors, beam detectors, aspirating systems, and flame detectors. Selection based on environment and fire risk type.',
  },
  {
    title: 'Alarm Devices and Notification',
    description:
      'Sounders, voice alarm systems, visual alarm devices (VADs), fire alarm routing equipment, remote monitoring, and interface with other building systems. BS 5839-1 sounder level requirements (minimum 65 dBA, 75 dBA in sleeping areas).',
  },
  {
    title: 'System Design and Circuit Wiring',
    description:
      'Zoning principles, loop wiring for addressable systems, radial wiring for conventional systems, fire-resistant cable selection (BS 7629, BS 8434), circuit monitoring, and short-circuit isolators.',
  },
  {
    title: 'Installation and Wiring Practices',
    description:
      'Detector spacing and positioning (ceiling coverage, distances from walls and obstructions), call point heights, cable routing and segregation from mains wiring, equipment mounting, and BS 7671 compliance for fire alarm circuits.',
  },
  {
    title: 'Commissioning, Testing, and Maintenance',
    description:
      'Pre-commissioning checks, zone-by-zone verification, cause-and-effect testing, sounder level measurements, documentation and as-built drawings, handover procedures, routine testing schedules, and annual maintenance requirements.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any BS 5839 question in plain English. Get detailed answers on system categories, detector spacing rules, cable specifications, and commissioning procedures.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video explanations of detector types, system wiring, addressable loop architecture, and commissioning techniques — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge after every module with scenario-based questions. Identify system categories, select correct detectors for environments, and verify commissioning procedures.',
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
      'Spaced repetition flashcards covering BS 5839 categories, grades, detector types, cable specifications, and sounder requirements. Study during breaks on site.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations covering all eight modules. Instant marking with detailed explanations for every answer. Track your readiness score over time.',
  },
];

const sections = [
  {
    id: 'why-fire-alarm-training',
    heading: 'Why Fire Alarm Training Matters for Electricians',
    content: (
      <>
        <p>
          Fire alarm systems are a critical life safety installation in every type of building. The{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            Regulatory Reform (Fire Safety) Order 2005
          </SEOInternalLink>{' '}
          places a legal duty on the responsible person (building owner or employer) to ensure
          adequate fire detection and warning is provided. For electricians, fire alarm work
          represents both a significant responsibility and a lucrative specialism.
        </p>
        <p>
          Unlike general electrical installation work, fire alarm systems have their own dedicated
          British Standard — BS 5839 — which sits alongside{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink> for
          the electrical wiring aspects. An electrician who understands both standards can offer a
          complete fire alarm design, installation, commissioning, and maintenance service that is
          in high demand across the construction and facilities management sectors.
        </p>
        <p>
          Fire alarm installation and maintenance commands premium rates. Specialist fire alarm
          engineers typically earn £200 to £350 per day, with demand driven by new-build
          construction, HMO licensing requirements, and the ongoing maintenance obligations under
          the Fire Safety Order. Every commercial building, school, hospital, care home, and HMO
          requires a fire alarm system that is regularly inspected and maintained.
        </p>
      </>
    ),
  },
  {
    id: 'bs-5839-overview',
    heading: 'BS 5839: The Fire Alarm Standard',
    content: (
      <>
        <p>
          BS 5839 is the British Standard for fire detection and fire alarm systems. It is published
          in multiple parts, with the two most important for electricians being BS 5839-1:2017 (for
          non-domestic buildings) and BS 5839-6:2019 (for domestic dwellings). These standards
          define how fire alarm systems should be designed, installed, commissioned, and maintained.
        </p>
        <p>
          BS 5839-1 uses a system of categories to define the extent of detection coverage required.
          Categories beginning with L relate to life protection, while categories beginning with P
          relate to property protection. The appropriate category is determined by the{' '}
          <SEOInternalLink href="/training/asbestos-awareness">
            fire risk assessment
          </SEOInternalLink>{' '}
          for the building.
        </p>
        <p>
          BS 5839-6 uses a simpler grading system (A to F) that defines the type of equipment and
          level of interconnection required. The grade is determined by the building type, number of
          storeys, and whether the property is a new build or existing dwelling.
        </p>
        <SEOAppBridge
          title="Study BS 5839 with AI-powered explanations"
          description="Struggling with the difference between L2 and L3 categories? Not sure which grade applies to a three-storey HMO? Ask the Elec-Mate AI tutor any BS 5839 question and get a clear, detailed answer with regulation references."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'system-categories',
    heading: 'System Categories: L1 to L5 and P1 to P2',
    content: (
      <>
        <p>
          The category system in BS 5839-1 determines which areas of a building require fire
          detection. Choosing the correct category is fundamental to the fire alarm system design.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              L1
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Category L1 — Full Coverage</h3>
              <p className="text-white text-sm leading-relaxed">
                Fire detectors installed throughout all areas of the building, including roof voids,
                floor voids, and cupboards. This provides the highest level of life protection and
                is typically specified for care homes, hospitals, and buildings where evacuation may
                be slow.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              L2
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Category L2 — Enhanced Coverage</h3>
              <p className="text-white text-sm leading-relaxed">
                Detectors in all escape routes plus all rooms that open onto escape routes, plus
                high-risk areas. This is the most commonly specified category for commercial
                premises such as offices, shops, and hotels.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              L3
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Category L3 — Escape Route Protection
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Detectors in all escape routes (corridors, stairwells, landings) to provide early
                warning that an escape route may be affected by fire. The minimum level of automatic
                detection for most buildings.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              L4
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Category L4 — Escape Route Enhancement
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Detectors within the circulation spaces that form part of the escape routes. Similar
                to L3 but focused specifically on circulation areas rather than all escape routes.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
              L5
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Category L5 — Engineered System</h3>
              <p className="text-white text-sm leading-relaxed">
                Detection coverage determined by a fire engineering approach to satisfy specific
                fire safety objectives. Used where standard categories do not apply or where a
                bespoke solution is required based on the fire risk assessment.
              </p>
            </div>
          </div>
        </div>
        <p>
          Property protection categories P1 (full coverage for property protection) and P2 (specific
          high-risk areas for property protection) follow a similar pattern but are designed to
          protect the building fabric and contents rather than occupant life safety.
        </p>
      </>
    ),
  },
  {
    id: 'system-grades',
    heading: 'Domestic System Grades: A to F',
    content: (
      <>
        <p>
          BS 5839-6 uses grades to specify the type and interconnection of fire detection equipment
          in domestic properties. Electricians carrying out{' '}
          <SEOInternalLink href="/training/domestic-installer">
            domestic electrical work
          </SEOInternalLink>{' '}
          must understand these grades, particularly for new-build housing and HMO licensing.
        </p>
        <p>
          <strong>Grade A</strong> requires a conventional or addressable fire alarm panel with
          dedicated fire alarm wiring and commercial-grade detection equipment. This is specified
          for large HMOs and sheltered housing. <strong>Grade B</strong> uses commercial-grade
          components wired to a common power supply but without a central panel.{' '}
          <strong>Grade C</strong> uses domestic mains-powered detectors connected to a dedicated
          circuit in the consumer unit, with interconnection between detectors.
        </p>
        <p>
          <strong>Grade D</strong> is the most common grade for new-build housing — mains-powered
          smoke and heat alarms with battery backup, interlinked so that activation of one alarm
          sounds all alarms in the dwelling. <strong>Grade E</strong> uses mains-powered alarms
          without interconnection. <strong>Grade F</strong> uses standalone battery-powered alarms
          with no interconnection — the minimum provision, typically only acceptable for existing
          dwellings where upgrading is not reasonably practicable.
        </p>
      </>
    ),
  },
  {
    id: 'detector-types',
    heading: 'Detector Types and Selection',
    content: (
      <>
        <p>
          Selecting the correct detector type for each location is critical for both reliable
          detection and avoiding false alarms. The wrong detector in the wrong environment will
          either fail to detect a real fire or cause nuisance activations that lead occupants to
          ignore or disable the system.
        </p>
        <p>
          <strong>Optical (photoelectric) smoke detectors</strong> are the most widely used type.
          They detect visible smoke particles from slow-burning, smouldering fires — the most common
          fire type in domestic and office environments. They are less susceptible to false alarms
          from cooking than ionisation detectors.
        </p>
        <p>
          <strong>Heat detectors</strong> come in two types: fixed-temperature detectors that
          activate when the ambient temperature exceeds a set threshold (typically 57 degrees C or
          90 degrees C), and rate-of-rise detectors that activate when the temperature increases
          rapidly. Heat detectors are used in kitchens, garages, boiler rooms, and dusty or steamy
          environments where smoke detectors would cause false alarms.
        </p>
        <p>
          <strong>Multi-sensor detectors</strong> combine optical smoke sensing with heat sensing in
          a single device. They use algorithms to analyse both inputs simultaneously, providing
          faster detection of real fires while significantly reducing false alarm rates.
          Multi-sensor detectors are increasingly specified for commercial installations where false
          alarms carry fire brigade attendance charges.
        </p>
        <SEOAppBridge
          title="Interactive quizzes on detector selection"
          description="Test your understanding of which detector type suits each environment. Scenario-based questions covering kitchens, corridors, plant rooms, sleeping areas, and dusty environments — with detailed explanations for every answer."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'zoning-and-circuits',
    heading: 'Zoning and Circuit Design',
    content: (
      <>
        <p>
          Fire alarm zoning divides a building into logical areas so that when a device activates,
          the fire alarm panel can indicate the approximate location of the fire. BS 5839-1 sets out
          specific rules for zone design that must be followed.
        </p>
        <p>
          Each zone should cover no more than 2,000 square metres of floor area. A single zone
          should not extend beyond one floor of a building (unless the building is a single open
          area across multiple floors). Stairwells should form their own zone, separate from the
          floors they serve. The total number of zones depends on the building size and layout — the
          aim is to allow the fire brigade and building occupants to quickly identify the location
          of an activation.
        </p>
        <p>
          Circuit design depends on whether the system is conventional or addressable. Conventional
          systems use radial zone circuits — each zone has its own pair of cables running from the
          panel. Addressable systems use loop circuits where a single pair of{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            fire-resistant cable
          </SEOInternalLink>{' '}
          runs from the panel, through every device on the loop, and back to the panel.
          Short-circuit isolators must be fitted at appropriate intervals (typically every 32
          devices or at each floor level) to ensure a cable fault does not disable the entire loop.
        </p>
        <p>
          Cable selection is critical — fire alarm circuits must use fire-resistant cable that
          maintains circuit integrity during a fire. BS 5839-1 requires cables to meet BS 7629 or BS
          8434, providing at least 30 minutes of fire resistance. Standard PVC cables such as twin
          and earth are not acceptable for fire alarm wiring.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'Commissioning and Handover',
    content: (
      <>
        <p>
          Commissioning a fire alarm system is a systematic process that verifies every aspect of
          the system operates as designed. BS 5839-1 Clause 40 sets out detailed commissioning
          requirements that must be completed before the system is handed over to the building
          owner.
        </p>
        <p>
          Pre-commissioning checks include verifying all wiring against the design drawings,
          checking detector and call point positions match the specification, confirming cable types
          and routing comply with the standard, and ensuring the panel is correctly programmed with
          zone assignments and cause-and-effect relationships.
        </p>
        <p>
          The commissioning test itself requires every detector, call point, and module to be
          individually activated and verified. For each device, you must confirm: the correct zone
          is indicated on the panel, the correct cause-and-effect outputs activate (doors release,
          sounders operate, interfaces trigger), and the sounder level meets the minimum
          requirements (65 dBA or 75 dBA in sleeping areas, measured at the pillow position). Sound
          level measurements must be documented.
        </p>
        <p>
          Handover documentation must include the system design certificate, commissioning
          certificate, as-built drawings, zone plan, cause-and-effect matrix, equipment data sheets,
          and the operations and maintenance manual. The building owner or responsible person must
          be trained in the use of the system, including weekly testing procedures, alarm response,
          and when to call for service.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/domestic-installer',
    title: 'Domestic Installer Course',
    description:
      'Part P building regulations, notifiable work, and domestic electrical installation.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description:
      'IET Code of Practice for EV charging, earthing requirements, and load management.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that apply alongside BS 5839 for fire alarm circuit wiring.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate App',
    description:
      'Generate professional fire alarm certificates with Elec-Mate, including commissioning records.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Essential safety training for fire alarm installation work in ceilings and risers.',
    icon: ShieldCheck,
    category: 'Training',
  },
  {
    href: '/training/asbestos-awareness',
    title: 'Asbestos Awareness Course',
    description:
      'Critical awareness for electricians drilling into ceilings and walls during fire alarm installations.',
    icon: AlertTriangle,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Fire Alarm Systems Course — BS 5839 Training',
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

export default function FireAlarmSystemsCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fire Safety Training"
      badgeIcon={Flame}
      heroTitle={
        <>
          Fire Alarm Systems Course: <span className="text-yellow-400">BS 5839 Training</span>
        </>
      }
      heroSubtitle="Master fire detection and alarm systems with comprehensive BS 5839 training. System categories L1-L5, grades A-F, detector types, zoning, commissioning, and maintenance. 8 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={15}
      courseDuration="12 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended"
      courseModules={8}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians looking to specialise in fire alarm installation and maintenance, apprentices studying for their Level 3, and domestic installers expanding into fire detection work"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to specialise in fire alarm systems?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 8 structured modules, interactive quizzes, video content, and an AI tutor for any BS 5839 question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/fire-alarm-systems"
    />
  );
}
