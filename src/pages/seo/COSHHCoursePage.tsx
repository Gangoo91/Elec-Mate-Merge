import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  ShieldCheck,
  FlaskConical,
  Skull,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'COSHH Course | Control of Substances Training';
const PAGE_DESCRIPTION =
  'Online COSHH training for UK electricians. Control of Substances Hazardous to Health Regulations 2002, COSHH assessments, chemical safety, PPE selection, and emergency procedures. 5 modules with video lessons, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'COSHH', href: '/training/coshh' },
];

const tocItems = [
  { id: 'what-is-coshh', label: 'What Is COSHH?' },
  { id: 'hazardous-substances', label: 'Hazardous Substances Electricians Encounter' },
  { id: 'coshh-assessments', label: 'COSHH Assessments' },
  { id: 'control-measures', label: 'Control Measures and PPE' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'COSHH stands for Control of Substances Hazardous to Health — the COSHH Regulations 2002 require employers to assess and control exposure to hazardous substances in the workplace.',
  'Electricians regularly encounter hazardous substances including PVC solvent cement, flux, cable lubricant, resin compounds, spray paints, and cleaning solvents that can cause skin irritation, respiratory problems, and long-term health effects.',
  'A COSHH assessment must be carried out before using any hazardous substance — this involves identifying the substance, understanding the hazard, assessing who could be exposed and how, and putting control measures in place.',
  'The hierarchy of control for COSHH follows: eliminate, substitute, enclose, ventilate, safe systems of work, and personal protective equipment (PPE) as a last resort.',
  'Safety data sheets (SDS) must be available for every hazardous substance on site and provide essential information about hazards, first aid measures, handling, storage, and disposal requirements.',
];

const faqs = [
  {
    question: 'Is COSHH training a legal requirement for electricians?',
    answer:
      'Yes. Under the Control of Substances Hazardous to Health Regulations 2002, employers must provide adequate information, instruction, and training for employees who work with or may be exposed to hazardous substances. Electricians regularly use substances such as PVC solvent cement, flux, adhesives, sealants, cleaning solvents, and spray paints — all of which fall within the scope of the COSHH Regulations. Self-employed electricians have an equivalent duty under the Health and Safety at Work etc. Act 1974 to ensure they understand the risks and use appropriate controls.',
  },
  {
    question: 'What substances do electricians commonly encounter on site?',
    answer:
      'Electricians work with a wide range of hazardous substances. PVC solvent cement (used for conduit joints) contains volatile organic compounds that can cause dizziness, headaches, and respiratory irritation. Flux used for soldering contains zinc chloride or resin which produces toxic fumes. Cable-pulling lubricants, resin compound for cable terminations, spray paints for marking, isopropyl alcohol for cleaning contacts, expanding foam sealants containing isocyanates, and dust from drilling into concrete, brick, and plasterboard are all commonly encountered. On older sites, electricians may also be exposed to lead paint dust or asbestos fibres.',
  },
  {
    question: 'What is a COSHH assessment and who is responsible for it?',
    answer:
      'A COSHH assessment is a documented evaluation of the risks posed by hazardous substances in a specific work activity. It identifies the substances involved, the hazards they present (from the safety data sheet), who could be exposed and how (inhalation, skin contact, ingestion), the likelihood and severity of harm, and the control measures needed to reduce risk to an acceptable level. The employer is legally responsible for carrying out COSHH assessments. However, on multi-trade construction sites, the principal contractor typically coordinates COSHH assessments and self-employed electricians must carry out their own assessments for substances they bring to site.',
  },
  {
    question: 'How long does the Elec-Mate COSHH course take?',
    answer:
      'The COSHH course contains 5 modules and typically takes around 4 hours to complete. The course is self-paced, so you can study during breaks on site, at home in the evening, or whenever suits your schedule. Each module includes video content, written guidance, and an interactive quiz. The AI study assistant is available throughout to answer any questions. On completion of all five modules and the final assessment, you receive a downloadable CPD certificate.',
  },
  {
    question: 'What are the GHS hazard symbols I need to know?',
    answer:
      'The Globally Harmonised System (GHS) uses nine standard hazard pictograms displayed as red diamond-shaped symbols on product labels. The symbols most relevant to electricians are: the exclamation mark (irritant, harmful), the corrosion symbol (corrosive to skin, eyes, or metals), the health hazard symbol (serious long-term health effects such as respiratory sensitisation), the flame symbol (flammable liquids and gases), and the skull and crossbones (acute toxicity). Understanding these symbols allows you to quickly identify the hazards of any substance before you open the container.',
  },
  {
    question: 'Does COSHH training count towards CPD for electricians?',
    answer:
      'Yes. COSHH training counts as valid CPD activity and is recognised by competent person schemes including NICEIC, NAPIT, and ELECSA. The course includes a downloadable completion certificate that you can add to your CPD portfolio. Elec-Mate automatically tracks your CPD hours within the platform and sends renewal reminders when your training needs refreshing.',
  },
];

const modules = [
  {
    title: 'Introduction to COSHH Legislation',
    description:
      'The Control of Substances Hazardous to Health Regulations 2002, the Health and Safety at Work etc. Act 1974, employer and employee duties, the role of the HSE, and how COSHH applies specifically to electrical installation work.',
  },
  {
    title: 'Identifying Hazardous Substances',
    description:
      'Types of hazardous substances (chemicals, biological agents, dust, fumes, vapours), GHS hazard symbols and labelling, reading safety data sheets (SDS), and specific substances electricians encounter on site.',
  },
  {
    title: 'Carrying Out COSHH Assessments',
    description:
      'Step-by-step process for completing a COSHH assessment: identifying substances, evaluating hazards, assessing exposure routes and likelihood, determining control measures, recording the assessment, and reviewing periodically.',
  },
  {
    title: 'Control Measures and PPE',
    description:
      'The hierarchy of control applied to COSHH: elimination, substitution, engineering controls (LEV), administrative controls, and PPE. Selecting the right respiratory protection, gloves, and eye protection for electrical work scenarios.',
  },
  {
    title: 'Emergency Procedures and First Aid',
    description:
      'What to do in the event of a spill, splash, inhalation incident, or skin contact. First aid for chemical burns, eye contamination, and inhalation of fumes. Spill containment, reporting incidents, and RIDDOR requirements.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any COSHH question in plain English. Get instant answers about specific substances, control measures, PPE selection, and regulatory requirements.',
  },
  {
    icon: FlaskConical,
    title: 'Substance Identification',
    description:
      'Learn to read GHS labels and safety data sheets. Interactive exercises covering the hazardous substances electricians encounter most frequently on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Complete COSHH assessments, select appropriate control measures, and demonstrate understanding of emergency procedures.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Complete the course on your phone, tablet, or desktop. Study during breaks on site, at home, or on the commute. Progress syncs across all your devices automatically.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering GHS symbols, substance hazards, control measures, PPE types, and emergency procedures for rapid recall.',
  },
  {
    icon: FileCheck2,
    title: 'CPD Certificate',
    description:
      'Downloadable CPD certificate on successful completion of all five modules. Automatically recorded in your Elec-Mate CPD portfolio with renewal reminders.',
  },
];

const sections = [
  {
    id: 'what-is-coshh',
    heading: 'What Is COSHH?',
    content: (
      <>
        <p>
          COSHH stands for Control of Substances Hazardous to Health. The COSHH Regulations 2002
          require employers to prevent or adequately control employee exposure to hazardous
          substances in the workplace. These regulations apply to a vast range of substances — from
          industrial chemicals and biological agents to common construction materials that produce
          harmful dust or fumes.
        </p>
        <p>
          For electricians, COSHH is directly relevant to your daily work. Every time you open a tin
          of PVC solvent cement, apply flux before soldering, use spray paint to mark cable routes,
          or drill into concrete producing silica dust, you are working with substances that fall
          within the scope of the COSHH Regulations. Without proper awareness and controls, repeated
          exposure to these substances can cause serious health problems including dermatitis,
          occupational asthma, chemical burns, and long-term respiratory disease.
        </p>
        <p>
          The COSHH Regulations sit within the broader framework of UK health and safety law. The{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            BS 7671 wiring regulations
          </SEOInternalLink>{' '}
          address electrical safety, but your overall wellbeing on site depends equally on
          understanding chemical and substance hazards. COSHH training is not optional — it is a
          legal requirement for anyone who uses or may be exposed to hazardous substances at work.
        </p>
        <SEOAppBridge
          title="Study COSHH with Elec-Mate's AI tutor"
          description="Ask questions about specific substances, get help completing COSHH assessments, and test your knowledge with interactive quizzes. All 46+ courses included in your subscription."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'hazardous-substances',
    heading: 'Hazardous Substances Electricians Encounter',
    content: (
      <>
        <p>
          Electricians work with a surprising number of hazardous substances during typical
          installation and maintenance work. Understanding what you are handling and the risks
          involved is the first step towards protecting yourself.
        </p>
        <p>
          <strong>PVC solvent cement</strong> is used daily for joining plastic conduit and
          trunking. It contains volatile organic compounds (VOCs) including tetrahydrofuran and
          cyclohexanone that evaporate rapidly, producing vapours that can cause dizziness,
          headaches, nausea, and irritation of the eyes, nose, and throat. Prolonged or repeated
          exposure without adequate ventilation can lead to liver and kidney damage.
        </p>
        <p>
          <strong>Soldering flux</strong> used for terminating cables contains zinc chloride or
          rosin which produces toxic fumes when heated. Inhalation of soldering fumes can cause
          occupational asthma — a condition that, once developed, means permanent sensitivity and
          potentially the end of soldering work. Electricians carrying out{' '}
          <SEOInternalLink href="/training/inspection-testing">
            inspection and testing
          </SEOInternalLink>{' '}
          work should also be aware of flux residues on older installations.
        </p>
        <p>
          <strong>Drilling dust</strong> from concrete, brick, and blockwork contains respirable
          crystalline silica. Long-term exposure to silica dust causes silicosis — an irreversible
          lung disease. Even short-term high-level exposure can cause immediate respiratory
          problems. Every electrician who drills holes, chases walls, or cuts channels needs to
          understand the risks of construction dust.
        </p>
        <p>
          <strong>
            Cable-pulling compounds, resin termination kits, expanding foam sealants, and adhesives
          </strong>{' '}
          all present their own chemical hazards. Some expanding foam sealants contain isocyanates —
          one of the leading causes of occupational asthma in the UK. The{' '}
          <SEOInternalLink href="/training/asbestos-awareness">
            asbestos awareness course
          </SEOInternalLink>{' '}
          covers another critical substance hazard for electricians working in pre-2000 buildings.
        </p>
      </>
    ),
  },
  {
    id: 'coshh-assessments',
    heading: 'How to Carry Out a COSHH Assessment',
    content: (
      <>
        <p>
          A COSHH assessment is the cornerstone of substance safety on site. It is a systematic
          process of identifying hazardous substances, evaluating the risks they present, and
          determining the controls needed to protect workers. The COSHH Regulations require that
          assessments are carried out before any work with hazardous substances begins.
        </p>
        <p>
          <strong>Step 1 — Identify the hazardous substances.</strong> List every substance you will
          use or encounter during the work activity. Include substances you bring to site (solvent
          cement, flux, spray paint) and substances generated by the work itself (dust, fumes,
          vapours). Obtain the safety data sheet (SDS) for every manufactured product.
        </p>
        <p>
          <strong>Step 2 — Evaluate the hazards.</strong> The SDS provides detailed information
          about the dangers of each substance, including GHS classification, hazard statements
          (H-phrases), and precautionary statements (P-phrases). Determine the routes of exposure:
          inhalation, skin contact, eye contact, or ingestion.
        </p>
        <p>
          <strong>Step 3 — Assess who is at risk and how.</strong> Consider not only the person
          using the substance but anyone else who could be exposed — other workers in the area,
          building occupants, or members of the public. Assess the duration, frequency, and level of
          exposure.
        </p>
        <p>
          <strong>Step 4 — Determine control measures.</strong> Apply the hierarchy of control:
          eliminate the substance if possible, substitute with a less hazardous alternative, use
          engineering controls (local exhaust ventilation), implement safe working procedures, and
          provide appropriate PPE as a last line of defence.
        </p>
        <p>
          <strong>Step 5 — Record, implement, and review.</strong> Document the assessment, ensure
          all workers understand the controls, and review the assessment regularly or whenever
          circumstances change. Recording your{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">CPD activities</SEOInternalLink>{' '}
          including COSHH training demonstrates ongoing professional competence.
        </p>
      </>
    ),
  },
  {
    id: 'control-measures',
    heading: 'Control Measures and PPE Selection',
    content: (
      <>
        <p>
          The hierarchy of control is the fundamental principle for managing exposure to hazardous
          substances. PPE should always be the last resort, not the first option. Understanding this
          hierarchy is essential for completing COSHH assessments correctly.
        </p>
        <p>
          <strong>Elimination</strong> means removing the need for the hazardous substance entirely.
          For example, using push-fit conduit fittings instead of solvent-welded joints eliminates
          the need for PVC solvent cement altogether.
        </p>
        <p>
          <strong>Substitution</strong> means replacing a hazardous substance with a less dangerous
          alternative. Water-based adhesives can sometimes replace solvent-based products, and
          mechanical fixings can replace chemical anchors.
        </p>
        <p>
          <strong>Engineering controls</strong> include local exhaust ventilation (LEV) to capture
          fumes at source, dust extraction systems on power tools, and enclosed processes. When
          soldering in confined spaces, portable fume extraction units protect against flux fume
          inhalation.
        </p>
        <p>
          <strong>PPE selection</strong> must match the specific hazard. Nitrile gloves resist
          solvents better than latex. Safety goggles (not just glasses) are needed when there is a
          splash risk. FFP3 respirators are required for silica dust exposure. Half-face respirators
          with A1 organic vapour cartridges protect against solvent fumes. The Elec-Mate course
          covers PPE selection for every common electrical scenario.
        </p>
        <p>
          Whether you are working on a{' '}
          <SEOInternalLink href="/training/domestic-installer">
            domestic installation
          </SEOInternalLink>{' '}
          or a large commercial project, the same COSHH principles apply. The scale may differ but
          the duty to assess and control remains the same.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-procedures',
    heading: 'Emergency Procedures',
    content: (
      <>
        <p>
          Despite best efforts at prevention, incidents involving hazardous substances can occur.
          Knowing the correct emergency response could prevent a minor incident from becoming a
          serious injury.
        </p>
        <p>
          <strong>Skin contact:</strong> Remove contaminated clothing immediately and flush the
          affected skin with large quantities of clean water for at least 15 minutes. Do not use
          solvents to remove chemicals from skin — this can increase absorption. Check the SDS for
          any substance-specific first aid measures.
        </p>
        <p>
          <strong>Eye contact:</strong> Irrigate the affected eye with clean water or eyewash
          solution for at least 15 minutes, holding the eyelids open. Do not rub the eye. Seek
          medical attention immediately for any corrosive substance splash.
        </p>
        <p>
          <strong>Inhalation:</strong> Move the affected person to fresh air immediately. If they
          are having difficulty breathing, call 999 and administer oxygen if available and trained
          to do so. Solvent vapours and fumes from{' '}
          <SEOInternalLink href="/training/fire-safety">fire-related incidents</SEOInternalLink> can
          both cause acute respiratory problems.
        </p>
        <p>
          <strong>Spillage:</strong> Ventilate the area, prevent the spill from spreading (use
          absorbent materials or bunds), and keep ignition sources away from flammable substances.
          Refer to the SDS for specific spill response guidance. Report all incidents and near
          misses as required under RIDDOR where applicable.
        </p>
        <SEOAppBridge
          title="Interactive emergency procedure scenarios"
          description="The Elec-Mate COSHH course includes scenario-based assessments where you practise responding to chemical spills, splash injuries, and inhalation incidents. Build confidence in your emergency response before you need it for real."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/asbestos-awareness',
    title: 'Asbestos Awareness Course',
    description:
      'Another essential substance hazard course for electricians working in pre-2000 buildings.',
    icon: AlertTriangle,
    category: 'Training',
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Using hazardous substances at height adds compound risks that require additional controls.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/first-aid',
    title: 'First Aid Course',
    description:
      'First aid for chemical burns, eye contamination, and inhalation complements COSHH training.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-safety',
    title: 'Fire Safety Course',
    description:
      'Flammable substances on site create fire risks covered in the fire safety course.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'COSHH training counts towards your CPD requirements for NICEIC, NAPIT, and ELECSA.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Combine chemical and electrical safety awareness for comprehensive site protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'COSHH Course — Control of Substances Hazardous to Health Training',
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

export default function COSHHCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={Skull}
      heroTitle={
        <>
          COSHH Course: <span className="text-yellow-400">Control of Substances Training</span>
        </>
      }
      heroSubtitle="Essential COSHH training for UK electricians. Learn to identify hazardous substances, carry out COSHH assessments, select appropriate PPE, and respond to chemical emergencies. 5 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={9}
      courseDuration="4 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prerequisites — suitable for all electricians and apprentices"
      courseModules={5}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios. Renewal reminders included."
      courseWhoIsItFor="All electricians, electrical apprentices, site supervisors, and anyone who uses or may be exposed to hazardous substances during electrical installation and maintenance work"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Know your substances — protect your health"
      ctaSubheading="Join 430+ UK electricians training smarter with Elec-Mate. 5 focused modules, interactive quizzes, AI study assistant, and CPD certificate. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/coshh"
    />
  );
}
