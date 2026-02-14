import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  HardHat,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Users,
  Scale,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'CDM Regulations Course for Electricians | CDM 2015 Training';
const PAGE_DESCRIPTION =
  'CDM 2015 training for UK electricians. Duty holder roles, principal designer and contractor responsibilities, construction phase plans, pre-construction information, and documentation requirements. 6 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'CDM Regulations', href: '/training/cdm-regulations-course' },
];

const tocItems = [
  { id: 'why-cdm-matters', label: 'Why CDM Matters for Electricians' },
  { id: 'duty-holders', label: 'Duty Holders Under CDM 2015' },
  { id: 'principal-designer-contractor', label: 'Principal Designer and Principal Contractor' },
  { id: 'construction-phase-plan', label: 'The Construction Phase Plan' },
  { id: 'documentation', label: 'CDM Documentation' },
  { id: 'electrician-duties', label: 'Your Duties as a Contractor' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Construction (Design and Management) Regulations 2015 (CDM 2015) apply to ALL construction projects in the UK, including domestic work — there is no exemption for small projects or sole traders.',
  'CDM 2015 defines five duty holders: the client, the principal designer, the principal contractor, designers, and contractors — electricians are classified as contractors and have specific legal duties.',
  'As a contractor under CDM 2015, you must plan, manage, and monitor your own work so it is carried out safely, provide relevant information to the principal contractor, comply with the construction phase plan, and ensure your workers are competent and adequately supervised.',
  'The construction phase plan is the central safety document for every project with more than one contractor — it must be in place before the construction phase begins and must be reviewed and updated throughout the project.',
  'Elec-Mate includes AI-powered RAMS (Risk Assessment and Method Statement) generation that aligns with CDM 2015 requirements — create professional safety documentation for every electrical installation project from your phone.',
];

const faqs = [
  {
    question: 'Does CDM 2015 apply to domestic electrical work?',
    answer:
      'Yes. CDM 2015 applies to all construction work in Great Britain, including domestic projects. However, for domestic projects the client duties (which exist for commercial clients) are passed to the contractor or, where there is more than one contractor, to the principal contractor. This means that on a domestic rewire or consumer unit change, you as the electrician are responsible for planning and managing the work safely, even though the homeowner is technically the client. For domestic projects with only one contractor, you do not need to formally appoint a principal designer or principal contractor — but you still need to manage the health and safety risks of your work. If the domestic project involves multiple contractors (for example, an extension with a builder and an electrician), someone must be appointed as principal contractor to coordinate the work.',
  },
  {
    question: 'What is the difference between the principal designer and the principal contractor?',
    answer:
      'The principal designer is responsible for planning, managing, and monitoring the pre-construction phase and coordinating health and safety matters during the design stage. They ensure that designs take account of health and safety, that risks are eliminated or reduced through design decisions, and that pre-construction information is compiled and distributed. The principal designer is typically an architect, building services consultant, or project manager. The principal contractor is responsible for planning, managing, and monitoring the construction phase. They develop the construction phase plan, coordinate the work of all contractors on site, ensure welfare facilities are in place, manage site inductions, and maintain the health and safety file. The principal contractor is typically the main contractor on a multi-contractor project. Both roles are required on projects involving more than one contractor.',
  },
  {
    question: 'What should be in a construction phase plan?',
    answer:
      'The construction phase plan is the key document for managing health and safety during the construction phase. It should include: a description of the project (location, scope of work, key dates), the management structure (duty holders, responsibilities, communication arrangements), arrangements for controlling significant risks (including electrical safety, working at height, confined spaces, asbestos, manual handling, and fire), site rules, emergency procedures, welfare arrangements, site induction arrangements, monitoring and review procedures, and information about known hazards on site (such as existing asbestos, underground services, or overhead power lines). The plan must be proportionate to the size and complexity of the project — for a simple domestic rewire, a concise document covering the key risks is sufficient. For a large commercial installation, the plan will be more detailed.',
  },
  {
    question: 'What are my duties as an electrical contractor under CDM 2015?',
    answer:
      'As a contractor under CDM 2015, your specific duties include: planning, managing, and monitoring your own work and that of any workers under your control to ensure it is carried out safely and without risk to health; not beginning work on a construction site unless satisfied that appropriate welfare facilities are available; providing every worker under your control with suitable site induction, information, instruction, and training; not employing or appointing anyone who does not have (or is not in the process of obtaining) the necessary skills, knowledge, training, and experience; providing the principal contractor with any information relevant to the construction phase plan; complying with directions given by the principal contractor; and ensuring that any design work you carry out complies with CDM requirements for designers. These duties apply whether you are a sole trader doing a domestic consumer unit change or a large contractor with 50 electricians on a commercial project.',
  },
  {
    question: 'Do I need SSSTS or SMSTS for CDM compliance?',
    answer:
      'The SSSTS (Site Supervisors Safety Training Scheme) and SMSTS (Site Management Safety Training Scheme) are not legal requirements under CDM 2015, but they are widely required by principal contractors as a condition of site access. SSSTS is a 2-day course aimed at first-line supervisors — it covers the legal framework, risk assessment, method statements, CDM duties, and the supervisor role in managing safety on site. SMSTS is a 5-day course aimed at site managers and covers the same topics in greater depth, including the management of multiple contractors and complex safety arrangements. Many large construction sites will not allow you through the gate without a valid SSSTS or SMSTS certificate. The Elec-Mate CDM course provides the knowledge foundation, but if you work on construction sites regularly, SSSTS (for supervisors) or SMSTS (for managers) is a strong complement.',
  },
  {
    question: 'What happens if I do not comply with CDM 2015?',
    answer:
      'Non-compliance with CDM 2015 can result in enforcement action by the Health and Safety Executive (HSE). This can include: improvement notices requiring you to take specific actions within a stated timeframe, prohibition notices stopping work immediately where there is a risk of serious personal injury, prosecution in the magistrates court or crown court, and unlimited fines. In serious cases where non-compliance leads to a fatality, individuals can face imprisonment under the Health and Safety at Work etc. Act 1974 or the Corporate Manslaughter and Corporate Homicide Act 2007. Beyond legal consequences, non-compliance can result in losing your CSCS card, being removed from a competent person scheme (NICEIC, NAPIT, ELECSA), and damage to your professional reputation. CDM compliance is not optional — it is a fundamental part of working safely in the construction industry.',
  },
];

const modules = [
  {
    title: 'Introduction to CDM 2015',
    description:
      'What CDM is, its history, why it was introduced, and how the 2015 regulations differ from the earlier CDM 2007. The scope of CDM — which projects it applies to and which it does not.',
  },
  {
    title: 'Duty Holders and Their Responsibilities',
    description:
      'The five duty holder roles: client, principal designer, principal contractor, designers, and contractors. Who appoints whom, when appointments must be made, and what each duty holder must do.',
  },
  {
    title: 'The Construction Phase Plan',
    description:
      'What the construction phase plan must contain, who prepares it, when it must be in place, and how it is maintained and updated throughout the project. Template structures and practical examples.',
  },
  {
    title: 'Pre-Construction Information and the Health and Safety File',
    description:
      'What pre-construction information is, who compiles it, and how it feeds into the design and construction phase plan. The health and safety file — its purpose, contents, and handover to the client.',
  },
  {
    title: 'Risk Assessment and Method Statements Under CDM',
    description:
      'How risk assessments and method statements fit within the CDM framework. Writing effective RAMS for electrical work. Task-specific vs generic assessments. Review and communication procedures.',
  },
  {
    title: 'CDM for Domestic Projects and Small Works',
    description:
      'How CDM applies to domestic clients, single-contractor projects, and small works. Proportionate compliance — what documentation is needed and what is not. Common scenarios for electricians.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any CDM question in plain English. Get detailed answers on duty holder responsibilities, construction phase plans, and how CDM applies to your specific project scenarios.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Clear video explanations of CDM roles, documentation requirements, and practical application for electricians — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your understanding with scenario-based questions. Identify duty holders, determine documentation requirements, and apply CDM to real-world electrical projects.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete CDM training at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering duty holder roles, construction phase plan requirements, documentation types, and key CDM terminology.',
  },
  {
    icon: FileCheck2,
    title: 'AI RAMS Generator',
    description:
      'Elec-Mate AI Health and Safety Agent generates professional risk assessments and method statements aligned with CDM 2015 — create project-specific RAMS from your phone in minutes.',
  },
];

const sections = [
  {
    id: 'why-cdm-matters',
    heading: 'Why CDM Matters for Every Electrician',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 are the primary regulations
          governing health and safety management on construction projects in Great Britain. They
          apply to every construction project — from a domestic consumer unit change to a major
          commercial installation — and every electrician is a duty holder with legal
          responsibilities.
        </p>
        <p>
          Many electricians assume CDM only applies to large construction sites with multiple
          contractors, hard hats, and site cabins. This is wrong. CDM 2015 applies to all
          construction work, including domestic projects. The duties are proportionate — a domestic
          rewire requires less documentation than a hospital installation — but the legal framework
          applies regardless of project size.
        </p>
        <p>
          Understanding CDM is not just about legal compliance. It is about working safely, managing
          risks effectively, and demonstrating professionalism to clients, principal contractors,
          and the HSE. Electricians who understand CDM are more likely to win work on commercial
          projects, pass principal contractor pre-qualification assessments, and avoid enforcement
          action.
        </p>
        <p>
          The Elec-Mate{' '}
          <SEOInternalLink href="/tools/rams-generator">AI RAMS generator</SEOInternalLink> creates
          CDM-compliant risk assessments and method statements for every type of electrical work —
          from domestic installations to commercial fit-outs and industrial projects.
        </p>
      </>
    ),
  },
  {
    id: 'duty-holders',
    heading: 'Duty Holders Under CDM 2015',
    content: (
      <>
        <p>
          CDM 2015 defines five duty holder roles. Each role carries specific legal
          responsibilities. On smaller projects, one person may fulfil multiple roles.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Users className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Client</h3>
              <p className="text-white text-sm leading-relaxed">
                The person or organisation for whom the construction work is being carried out. Must
                make suitable arrangements for managing the project, appoint the principal designer
                and principal contractor (where there is more than one contractor), provide
                pre-construction information, and ensure adequate welfare facilities.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Scale className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Principal Designer</h3>
              <p className="text-white text-sm leading-relaxed">
                Appointed by the client on projects with more than one contractor. Responsible for
                planning, managing, and monitoring the pre-construction phase. Coordinates health
                and safety during design and prepares the health and safety file.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <HardHat className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Principal Contractor</h3>
              <p className="text-white text-sm leading-relaxed">
                Appointed by the client on projects with more than one contractor. Responsible for
                planning, managing, and monitoring the construction phase. Prepares the construction
                phase plan and coordinates all contractors on site.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <FileText className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Designer</h3>
              <p className="text-white text-sm leading-relaxed">
                Anyone who prepares or modifies a design for a building or structure. For
                electricians, this includes designing an electrical installation. Designers must
                eliminate, reduce, or control foreseeable risks through their design decisions.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ShieldCheck className="w-8 h-8 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Contractor</h3>
              <p className="text-white text-sm leading-relaxed">
                Anyone who carries out, manages, or controls construction work. This includes all
                electricians — whether employed or self-employed, sole traders or large companies.
                Contractors must plan, manage, and monitor their own work safely.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'principal-designer-contractor',
    heading: 'Principal Designer and Principal Contractor Explained',
    content: (
      <>
        <p>
          On projects with more than one contractor (which includes most commercial construction
          sites), the client must appoint a principal designer and a principal contractor. These two
          roles are the backbone of CDM health and safety management.
        </p>
        <p>
          The <strong>principal designer</strong> leads the design phase. They coordinate health and
          safety between different designers, ensure designs consider buildability and maintenance
          safety, and compile the pre-construction information pack. For an electrical project
          within a larger building, the principal designer is typically the project architect or
          lead building services consultant. Your electrical design work must comply with their
          coordination requirements.
        </p>
        <p>
          The <strong>principal contractor</strong> leads the construction phase. They prepare and
          maintain the construction phase plan, coordinate all contractors on site (including your
          electrical team), manage site inductions, establish site rules, and ensure welfare
          facilities are adequate. On most sites, this is the main building contractor.
        </p>
        <p>
          As an electrical contractor, you report to and cooperate with the principal contractor.
          You must: attend site inductions and briefings, comply with the construction phase plan
          and site rules, provide information about your work that affects the safety of others,
          submit your{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessments and method statements
          </SEOInternalLink>{' '}
          before starting work, and coordinate your activities with other trades to prevent
          conflicts and hazards.
        </p>
        <SEOAppBridge
          title="Generate CDM-compliant RAMS instantly"
          description="The Elec-Mate AI Health and Safety Agent creates professional risk assessments and method statements tailored to your specific project. CDM-compliant documentation in minutes, not hours."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'construction-phase-plan',
    heading: 'The Construction Phase Plan',
    content: (
      <>
        <p>
          The construction phase plan is the central safety document for any project with more than
          one contractor. It must be prepared by the principal contractor before the construction
          phase begins and must be reviewed and updated throughout the project.
        </p>
        <p>
          The plan must be proportionate to the size and complexity of the project. For a simple
          project, a concise document covering the key arrangements is sufficient. For a complex
          project, the plan will be more detailed and may include appendices for specific high-risk
          activities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">What the Plan Must Cover</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Project description, scope, duration, and key contacts</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Management structure and responsibilities for health and safety</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Arrangements for controlling significant risks — including electrical safety,
                working at height, fire, asbestos, and manual handling
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Site rules, emergency procedures, and first aid arrangements</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Welfare facilities — toilets, washing facilities, rest areas, and drinking water
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Site induction, training, and supervision arrangements</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Monitoring, audit, and review procedures</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'CDM Documentation: What You Need to Provide',
    content: (
      <>
        <p>
          As an electrical contractor, you will be expected to provide documentation to the
          principal contractor and, in some cases, directly to the client. The key documents are:
        </p>
        <p>
          <strong>Risk assessments and method statements (RAMS)</strong> for your electrical work.
          These must be specific to the project and the tasks you will perform — generic RAMS that
          have not been tailored to the site conditions are not acceptable to most principal
          contractors. Your RAMS should cover the significant hazards of your work, the control
          measures you will implement, and the sequence of operations.
        </p>
        <p>
          <strong>Competence evidence</strong> including qualifications (18th Edition, C&G 2391),
          competent person scheme registration (NICEIC, NAPIT, ELECSA), CSCS card details, insurance
          certificates, and any specialist training certificates (
          <SEOInternalLink href="/training/safe-isolation-procedure">
            safe isolation
          </SEOInternalLink>
          , asbestos awareness, working at height).
        </p>
        <p>
          <strong>Information for the health and safety file</strong> including as-built drawings,
          test certificates, operation and maintenance manuals, and any information about residual
          risks that future contractors or the building owner will need. For electrical work, this
          typically includes the Electrical Installation Certificate (EIC), test results,
          distribution board schedules, and cable route drawings.
        </p>
        <p>
          <strong>Accident and incident reports</strong> for any injuries, near misses, or dangerous
          occurrences that happen during your work. These must be reported to the principal
          contractor and, in certain cases, to the HSE under RIDDOR (Reporting of Injuries, Diseases
          and Dangerous Occurrences Regulations 2013).
        </p>
      </>
    ),
  },
  {
    id: 'electrician-duties',
    heading: 'Your Duties as a Contractor Under CDM 2015',
    content: (
      <>
        <p>
          Every electrician — whether a sole trader doing domestic work or an employee of a large
          contracting company — is a contractor under CDM 2015. Your specific duties are set out in
          Part 4 of the regulations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan, manage, and monitor your work</strong> so that it is carried out
                safely and without risk to health. This includes identifying the hazards of your
                electrical work, assessing the risks, and implementing appropriate control measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ensure your workers are competent.</strong> Anyone you employ or
                sub-contract must have the necessary skills, knowledge, training, and experience for
                the work they will perform.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide information, instruction, and training</strong> to your workers,
                including site-specific inductions and task-specific briefings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooperate with the principal contractor</strong> and comply with the
                construction phase plan, site rules, and any reasonable directions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report hazards, near misses, and incidents</strong> to the principal
                contractor. Do not wait for someone else to report — if you see something unsafe,
                report it immediately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These duties apply on every project, regardless of size. On a domestic project where you
          are the only contractor, you are responsible for your own safety management. On a
          multi-contractor site, you work within the framework established by the principal
          contractor — but you remain responsible for managing your own work safely.
        </p>
        <SEOAppBridge
          title="Professional RAMS for every project"
          description="Elec-Mate's AI Health and Safety Agent generates task-specific risk assessments and method statements in minutes. CDM-compliant documentation that principal contractors will accept. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description:
      'Generate professional, CDM-compliant risk assessments and method statements from your phone.',
    icon: FileCheck2,
    category: 'Tool' as const,
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description: 'How to write effective risk assessments for electrical installation work.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/training/site-safety',
    title: 'Site Safety Course',
    description:
      'Comprehensive site safety training covering all hazards electricians face on construction sites.',
    icon: HardHat,
    category: 'Training' as const,
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Work at Height Regulations training — a key CDM risk area for electrical installations.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/safe-isolation-procedure',
    title: 'Safe Isolation Course',
    description:
      'Safe isolation procedure training — essential competence evidence for CDM compliance.',
    icon: AlertTriangle,
    category: 'Training' as const,
  },
  {
    href: '/training/leadership-on-site',
    title: 'Leadership on Site Course',
    description: 'Site supervision training including CDM supervisor duties and safety management.',
    icon: Users,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CDM Regulations Course for Electricians',
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
      courseWorkload: 'PT6H',
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

export default function CDMRegulationsCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={Scale}
      heroTitle={
        <>
          CDM Regulations:{' '}
          <span className="text-yellow-400">CDM 2015 Training for Electricians</span>
        </>
      }
      heroSubtitle="Understand your legal duties under the Construction (Design and Management) Regulations 2015. Duty holder roles, construction phase plans, documentation requirements, and practical application for electrical contractors. 6 modules with quizzes and AI tutor."
      readingTime={13}
      courseDuration="6 hours"
      courseLevel="Intermediate"
      coursePrerequisites="No prior CDM knowledge required — suitable for all electricians working on construction projects"
      courseModules={6}
      courseCertification="CPD certificate on completion — evidence of CDM awareness for principal contractor pre-qualification and scheme assessments"
      courseWhoIsItFor="All electricians working on construction sites, self-employed electricians managing their own health and safety, supervisors with CDM coordinator responsibilities, and contractors preparing for principal contractor pre-qualification assessments"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Understand your CDM duties and work with confidence"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. CDM modules, AI RAMS generator, and an AI tutor for any health and safety question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/cdm-regulations-course"
    />
  );
}
