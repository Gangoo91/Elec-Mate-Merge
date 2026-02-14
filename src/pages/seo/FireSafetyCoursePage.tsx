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
  Layers,
  FileCheck2,
  AlertTriangle,
  Heart,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Fire Safety Course | Awareness Training for Electricians';
const PAGE_DESCRIPTION =
  'Fire safety awareness training for UK electricians covering fire triangle theory, extinguisher types, evacuation procedures, hot works permits, and construction site fire prevention. 4 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Fire Safety', href: '/training/fire-safety' },
];

const tocItems = [
  { id: 'why-fire-safety', label: 'Why Fire Safety Training Matters' },
  { id: 'fire-triangle', label: 'The Fire Triangle and Fire Classes' },
  { id: 'extinguisher-types', label: 'Fire Extinguisher Types' },
  { id: 'hot-works', label: 'Hot Works and Electrical Fire Risks' },
  { id: 'evacuation', label: 'Evacuation Procedures' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The fire triangle requires heat, fuel, and oxygen — removing any one element extinguishes the fire. Electricians must understand this principle to select the correct extinguisher and prevent ignition sources during their work.',
  'Electrical fires are classified as fires involving live electrical equipment. Never use water or foam extinguishers on electrical fires — CO2 extinguishers are the correct choice, leaving no residue and posing no electrocution risk.',
  'Hot works permits are mandatory for any electrical work involving heat-generating processes near combustible materials — soldering, brazing, heat shrinking, and grinding on construction sites all require formal hot works procedures.',
  'The Regulatory Reform (Fire Safety) Order 2005 places legal responsibility on the "responsible person" to carry out fire risk assessments and maintain fire safety measures — electricians must understand their role within this framework.',
  'Construction sites present elevated fire risks due to the presence of combustible materials, temporary electrical supplies, hot works, and limited fire detection. Site-specific fire safety plans and regular toolbox talks are essential.',
];

const faqs = [
  {
    question: 'Is fire safety training a legal requirement for electricians?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005 (applicable in England and Wales), the responsible person must ensure that employees receive adequate fire safety training. This includes training on fire risks in the workplace, actions to take on discovering a fire, how to raise the alarm, evacuation procedures, and the use of fire-fighting equipment. For electricians working on construction sites, the Construction (Design and Management) Regulations 2015 also require fire safety measures to be part of the construction phase plan. While there is no single mandated "fire safety certificate" for electricians, employers must demonstrate that their workforce has received appropriate training.',
  },
  {
    question: 'What type of fire extinguisher should I use on an electrical fire?',
    answer:
      'For fires involving live electrical equipment, use a CO2 (carbon dioxide) extinguisher — identifiable by its black label and horn-shaped nozzle. CO2 displaces oxygen to smother the fire and leaves no residue, making it safe for use on electrical equipment without risk of electrocution or damage to sensitive components. Dry powder extinguishers (blue label) can also be used on electrical fires but leave a corrosive residue that may damage equipment. Never use water (red label) or foam (cream label) extinguishers on live electrical equipment as the water conducts electricity. If the power supply can be safely isolated first, the fire is then treated as the appropriate class for the material burning (Class A for solids, Class B for liquids).',
  },
  {
    question: 'What is a hot works permit and when do I need one?',
    answer:
      'A hot works permit is a formal document that authorises work involving open flames, sparks, or significant heat generation in areas where there is a risk of fire. For electricians, hot works permits are typically required for soldering, brazing, using heat guns or heat shrink near combustible materials, grinding or cutting with angle grinders, and using blow torches for lead work. The permit specifies the work area, duration, fire prevention measures (clearing combustible materials, providing fire extinguishers, fire-retardant blankets), and the requirement for a fire watch during and after the work (typically 60 minutes after completion). On construction sites, the principal contractor usually manages the hot works permit system.',
  },
  {
    question: 'What are the main causes of electrical fires?',
    answer:
      'The most common causes of electrical fires include loose connections generating heat through high-resistance joints, overloaded circuits exceeding cable current ratings, damaged or deteriorated cable insulation, incorrect fuse or circuit breaker ratings, arc faults from damaged cables, and poorly maintained electrical equipment. In domestic properties, overloaded socket outlets (extension lead daisy-chaining), electric heaters placed near combustible materials, and faulty appliances are frequent causes. The EICR (Electrical Installation Condition Report) process is specifically designed to identify these fire risks. Electricians carrying out periodic inspection and testing play a critical role in fire prevention.',
  },
  {
    question: 'How often should fire safety training be refreshed?',
    answer:
      'The Fire Safety Order does not specify an exact frequency, but the responsible person must ensure training is repeated periodically and whenever there is a significant change in fire risks, work procedures, or the workplace layout. Most fire safety training providers and industry bodies recommend annual refresher training. On construction sites, fire safety is typically covered during the site induction and reinforced through regular toolbox talks. The Elec-Mate course is available for unlimited revision, allowing you to refresh your knowledge at any time without waiting for formal refresher sessions.',
  },
];

const modules = [
  {
    title: "Fire Safety Legislation and the Electrician's Role",
    description:
      "The Regulatory Reform (Fire Safety) Order 2005, Construction (Design and Management) Regulations 2015, fire risk assessments, the responsible person concept, and the electrician's duty of care on site.",
  },
  {
    title: 'Fire Science, Classes, and Extinguisher Selection',
    description:
      'The fire triangle (heat, fuel, oxygen), fire classes A to F, extinguisher types (water, foam, CO2, dry powder, wet chemical), colour coding, and correct selection for electrical fires.',
  },
  {
    title: 'Fire Prevention in Electrical Work',
    description:
      'Hot works permits, managing ignition sources, cable selection and protection, circuit overload prevention, safe use of temporary electrical supplies on construction sites, and storage of flammable materials.',
  },
  {
    title: 'Emergency Response and Evacuation',
    description:
      'Raising the alarm, evacuation procedures, assembly points, roll call systems, fire warden duties, liaison with the fire service, and RIDDOR reporting for fire-related incidents.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any fire safety question in plain English. Get clear answers on extinguisher selection, hot works procedures, legislation, and risk assessment requirements.',
  },
  {
    icon: Flame,
    title: 'Video Content',
    description:
      'Visual guides covering fire extinguisher operation, evacuation procedures, hot works setup, and real-world case studies of electrical fire incidents.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge with scenario-based questions on extinguisher selection, fire class identification, permit procedures, and emergency response.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete the 4-hour course at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering fire classes, extinguisher colour codes, legislation references, and emergency procedure steps.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Assessments',
    description:
      'Full-length mock assessments covering all four modules. Instant marking with detailed explanations for every answer.',
  },
];

const sections = [
  {
    id: 'why-fire-safety',
    heading: 'Why Fire Safety Training Matters for Electricians',
    content: (
      <>
        <p>
          Electrical faults are one of the leading causes of fire in UK buildings. According to
          government fire statistics, faulty electrical equipment and installations account for
          thousands of dwelling fires each year, with construction sites also experiencing a
          disproportionate number of fire incidents. As the professionals who design, install, and
          maintain electrical systems, electricians have both a unique responsibility and a unique
          ability to prevent electrical fires.
        </p>
        <p>
          Fire safety awareness goes beyond knowing where the nearest exit is. Electricians need to
          understand how their daily work creates fire risks — from soldering joints near
          combustible materials to installing circuits that could overheat if incorrectly rated.
          They also need to know how to respond effectively if a fire does break out, including
          selecting the correct extinguisher for an electrical fire and executing a safe evacuation.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/training/fire-alarm-systems">
            Regulatory Reform (Fire Safety) Order 2005
          </SEOInternalLink>{' '}
          makes fire safety training a legal requirement for all employees in workplaces covered by
          the Order. For electricians, this includes understanding fire risk assessments, hot works
          permits, and their personal responsibility to prevent fires through good workmanship and
          compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>{' '}
          wiring regulations.
        </p>
      </>
    ),
  },
  {
    id: 'fire-triangle',
    heading: 'The Fire Triangle and Fire Classes',
    content: (
      <>
        <p>
          Every fire requires three elements to sustain combustion: heat (an ignition source), fuel
          (a combustible material), and oxygen (from the air). Removing any one of these three
          elements extinguishes the fire. This principle — the fire triangle — is the foundation of
          all fire prevention and fire-fighting strategies.
        </p>
        <p>
          For electricians, the most common ignition sources in their work include overheating
          electrical connections, arc faults, soldering irons, heat guns, angle grinders, and
          temporary lighting. Common fuels on construction sites include timber frameworks,
          insulation materials, cardboard packaging, cable insulation, and solvents. Understanding
          these risks allows you to take practical prevention measures — clearing combustible
          materials before using heat-generating tools, maintaining adequate ventilation, and
          ensuring electrical connections are tight and correctly rated.
        </p>
        <p>
          Fires are classified into six classes based on the fuel involved: Class A (solid materials
          such as wood and paper), Class B (flammable liquids), Class C (flammable gases), Class D
          (metals), Class F (cooking oils and fats), and electrical fires involving live equipment.
          Each class requires a specific type of extinguisher — using the wrong type can be
          ineffective or dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'extinguisher-types',
    heading: 'Fire Extinguisher Types and Selection',
    content: (
      <>
        <p>
          Selecting the correct fire extinguisher is critical, particularly for electricians who may
          encounter fires involving live electrical equipment. The five main types of portable fire
          extinguisher available in the UK are water (red label), foam (cream label), CO2 (black
          label), dry powder (blue label), and wet chemical (yellow label).
        </p>
        <p>
          For electrical fires, the <strong>CO2 extinguisher</strong> is the preferred choice. It
          works by displacing oxygen around the fire, smothering the combustion process. CO2 leaves
          no residue, making it safe for use on electrical equipment, computer servers, and
          distribution boards without causing additional damage. Important safety note: CO2
          extinguishers can cause frostbite if the horn touches the skin, and they reduce oxygen
          levels in enclosed spaces — ventilate the area after use.
        </p>
        <p>
          <strong>Dry powder extinguishers</strong> are effective on electrical fires but leave a
          corrosive powder residue that can damage sensitive equipment. They are best used as a
          multi-purpose extinguisher on construction sites where fires may involve mixed materials.
          <strong>
            {' '}
            Water and foam extinguishers must never be used on live electrical equipment
          </strong>{' '}
          as the water stream conducts electricity and creates an electrocution risk.
        </p>
        <SEOAppBridge
          title="Test your extinguisher knowledge with interactive quizzes"
          description="Scenario-based questions present you with different fire situations and ask you to select the correct extinguisher type. Instant feedback explains why each choice is correct or dangerous."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'hot-works',
    heading: 'Hot Works and Electrical Fire Risks',
    content: (
      <>
        <p>
          Hot works — any process that generates sparks, open flames, or significant heat — require
          formal management on construction sites and in occupied buildings. For electricians, hot
          works activities include soldering and brazing connections, using heat guns for cable
          forming or heat shrink application, cutting cable tray or trunking with angle grinders,
          and using blow torches for lead sheathing or plumbing connections.
        </p>
        <p>
          A hot works permit system requires the electrician to obtain written authorisation before
          starting work, clear all combustible materials within at least 3 metres of the work area,
          have a suitable fire extinguisher immediately available, use fire-retardant blankets or
          screens to contain sparks, and maintain a{' '}
          <SEOInternalLink href="/training/risk-assessment">fire watch</SEOInternalLink> for at
          least 60 minutes after work is completed. The fire watch period is essential because
          smouldering materials may not produce visible flames until well after the hot works
          activity has finished.
        </p>
        <p>
          Electrical installation work also creates fire risks through incorrect cable sizing
          (leading to overheating), loose connections (creating high-resistance hot spots), and
          incorrect protective device selection (allowing sustained overcurrent). The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing process
          </SEOInternalLink>{' '}
          specified in BS 7671 Appendix 4 is a fire prevention measure — every correction factor and
          derating calculation exists to prevent cables from exceeding their safe operating
          temperature.
        </p>
      </>
    ),
  },
  {
    id: 'evacuation',
    heading: 'Evacuation Procedures',
    content: (
      <>
        <p>
          In the event of a fire, the priority is always life safety. Electricians must be familiar
          with the evacuation procedures for every site they work on — this information should be
          communicated during the site induction and displayed on fire action notices throughout the
          building.
        </p>
        <p>
          On discovering a fire: raise the alarm immediately by activating the nearest manual call
          point or shouting "fire." Call 999 (or instruct someone to do so). If the fire is small
          and you have the correct extinguisher, you may attempt to extinguish it — but only if you
          can do so safely and without blocking your escape route. If in any doubt, leave the
          building immediately by the nearest available exit route.
        </p>
        <p>
          During evacuation: do not use lifts, close doors behind you to slow fire spread, assist
          anyone who needs help (but do not put yourself at risk), go directly to the designated
          assembly point, and report to the fire warden for roll call. Do not re-enter the building
          until the fire service has confirmed it is safe to do so. On construction sites, the
          assembly point and roll call procedure should be clearly defined in the construction phase
          plan.
        </p>
        <p>
          Fire wardens (also called fire marshals) are designated personnel responsible for sweeping
          their area during an evacuation, directing occupants to exits, checking that all rooms and
          areas are clear, and reporting the status of their area to the chief fire warden or fire
          service incident commander. Electricians may be asked to take on fire warden duties,
          particularly on smaller sites.
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
      'BS 5839 fire detection and alarm systems — the technical companion to fire safety awareness.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/first-aid-electrical',
    title: 'First Aid for Electricians',
    description:
      'Emergency response skills including burn treatment and CPR for fire and electrical incidents.',
    icon: Heart,
    category: 'Training',
  },
  {
    href: '/training/risk-assessment',
    title: 'Risk Assessment Course',
    description:
      'Identifying fire hazards and implementing control measures as part of workplace risk assessment.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description: 'Safe evacuation from height during fire emergencies and rescue procedures.',
    icon: ShieldCheck,
    category: 'Training',
  },
  {
    href: '/training/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'Arc-rated clothing and flame-resistant workwear that protect against fire and arc flash.',
    icon: HardHat,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that specify fire prevention measures in electrical installation design.',
    icon: BookOpen,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Fire Safety Course — Awareness Training for Electricians',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Beginner',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT4H',
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

export default function FireSafetyCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Training"
      badgeIcon={Flame}
      heroTitle={
        <>
          Fire Safety Course:{' '}
          <span className="text-yellow-400">Awareness Training for Electricians</span>
        </>
      }
      heroSubtitle="Essential fire safety awareness training covering the fire triangle, extinguisher selection, hot works permits, electrical fire prevention, and evacuation procedures. 4 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={8}
      courseDuration="4 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior fire safety training required — suitable for all electricians and apprentices"
      courseModules={4}
      courseCertification="CPD certificate on completion — supports annual fire safety training requirements"
      courseWhoIsItFor="All electricians, electrical apprentices, site supervisors, and contractors who need fire safety awareness for construction sites and occupied premises"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to strengthen your fire safety knowledge?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 4 focused modules covering fire science, extinguisher selection, hot works, and evacuation procedures. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/fire-safety"
    />
  );
}
