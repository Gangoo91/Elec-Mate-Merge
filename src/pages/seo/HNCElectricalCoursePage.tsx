import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Award,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  TrendingUp,
  Briefcase,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'HNC Electrical Course | Higher National Certificate Guide';
const PAGE_DESCRIPTION =
  'Complete guide to the HNC in Electrical and Electronic Engineering for UK electricians. Entry requirements, modules, part-time study options, career benefits, and how it compares to NVQ Level 3 and degree pathways. Study support with AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'HNC Electrical', href: '/training/hnc-electrical' },
];

const tocItems = [
  { id: 'what-is-hnc', label: 'What Is an HNC in Electrical Engineering?' },
  { id: 'hnc-vs-degree', label: 'HNC vs Degree' },
  { id: 'entry-requirements', label: 'Entry Requirements' },
  { id: 'core-modules', label: 'Core Modules' },
  { id: 'part-time-options', label: 'Part-Time Study Options' },
  { id: 'career-benefits', label: 'Career Benefits' },
  { id: 'modules', label: 'Study Support Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The HNC (Higher National Certificate) in Electrical and Electronic Engineering is a Level 4 qualification — one level above NVQ Level 3 and one level below a foundation degree — providing a strong academic foundation for career progression into engineering, design, and management roles.',
  'Most HNC programmes can be studied part-time over 2 years (typically one day per week or evening classes), making it accessible for working electricians who want to advance their qualifications without giving up their income.',
  'Core modules typically include engineering mathematics, electrical and electronic principles, engineering design, project management, and a work-based project — the academic rigour develops analytical and problem-solving skills beyond trade-level training.',
  'An HNC opens career pathways into electrical design, building services engineering, project management, and technical sales — roles that are difficult to access with NVQ Level 3 alone and that typically command salaries of £40,000 to £60,000.',
  'Elec-Mate provides study support for HNC students including AI-powered explanations of engineering mathematics, circuit analysis, and electrical principles — the topics that challenge most returning students.',
];

const faqs = [
  {
    question: 'What is the difference between an HNC and an NVQ Level 3?',
    answer:
      'An NVQ Level 3 (such as the C&G 2357 or 2365) is a competence-based vocational qualification at Level 3 on the Regulated Qualifications Framework (RQF). It demonstrates that you can perform electrical installation work to the required standard — it is assessed through practical observation and portfolio evidence. An HNC is an academic qualification at Level 4 — one level higher. It covers the theoretical foundations of electrical engineering: mathematics, circuit theory, control systems, electronics, and engineering design. The HNC is assessed through assignments, exams, and projects that require analytical thinking and technical writing. In career terms, the NVQ Level 3 qualifies you to work as an electrician. The HNC positions you for roles that require deeper technical knowledge — electrical design, building services engineering, technical management, and engineering consultancy. Many electricians hold both: the NVQ for practical competence and the HNC for academic progression.',
  },
  {
    question: 'Can I do an HNC while working full-time as an electrician?',
    answer:
      'Yes. Most colleges and universities offer the HNC in Electrical and Electronic Engineering on a part-time basis, specifically designed for people in employment. Common study patterns include one day per week (day release, where your employer releases you for one day each week), evening classes (typically two evenings per week), or block release (intensive study weeks spread through the year). The part-time HNC typically takes 2 years to complete, compared to 1 year full-time. Some employers will sponsor their electricians through the HNC, covering tuition fees and providing day release. If your employer does not offer sponsorship, you may be eligible for an Advanced Learner Loan to cover the fees. The key challenge for part-time students is time management — balancing a full-time job, study, assignments, and personal life. Elec-Mate study tools help by providing AI-powered explanations and revision support that you can access anytime, anywhere.',
  },
  {
    question: 'What are the entry requirements for an HNC in Electrical Engineering?',
    answer:
      'Entry requirements vary between institutions, but typical requirements include: a Level 3 qualification in electrical installation or a related engineering discipline (NVQ Level 3, C&G 2357, C&G 2365, BTEC Level 3, or A-levels in relevant subjects), GCSE mathematics and English at grade C/4 or above (or Functional Skills Level 2 equivalents), and relevant work experience in the electrical industry. Some institutions accept mature students (typically 21 or over) with significant industry experience in lieu of formal Level 3 qualifications — this is assessed on a case-by-case basis. If your mathematics is below the required standard, some institutions offer a pre-HNC mathematics bridging course. Engineering mathematics is the module that most returning students find challenging, so strong maths foundations are important.',
  },
  {
    question: 'How much does an HNC cost and is funding available?',
    answer:
      'HNC tuition fees typically range from £4,000 to £7,000 for the full programme (part-time over 2 years). Costs vary by institution and region. Funding options include: employer sponsorship (many larger electrical contractors and building services companies fund HNC study for their employees), Advanced Learner Loans (government-backed loans for Level 3 to Level 6 qualifications — you only start repaying when you earn over the threshold, similar to university student loans), and college bursaries or hardship funds for students with financial difficulties. Some institutions charge different fees for day release vs evening study. Always check the total cost including any additional fees for materials, registration, or examination. The return on investment is strong: HNC holders typically command £5,000 to £15,000 more in annual salary than electricians with Level 3 alone, meaning the qualification pays for itself within 1 to 2 years of completion.',
  },
  {
    question: 'Can I progress from an HNC to a degree?',
    answer:
      'Yes. The HNC is designed as a stepping stone in the academic pathway. After completing the HNC (Level 4), you can progress to an HND (Higher National Diploma, Level 5) which typically takes an additional year part-time. From the HND, you can progress to a full Bachelor degree (Level 6) — many universities offer a top-up year that converts an HND into a BEng or BSc. The full pathway is: HNC (1-2 years) then HND (1 year additional) then degree top-up (1 year additional). Alternatively, some universities accept HNC holders directly onto the second year of a part-time degree programme, depending on the modules completed and the grades achieved. For electricians who want to move into chartered engineering, building services design, or senior management, the degree pathway opens doors that are otherwise closed. Elec-Mate supports students at every level with AI-powered study tools.',
  },
  {
    question: 'What career roles can I access with an HNC?',
    answer:
      'The HNC opens doors to roles that require a higher level of technical knowledge than trade-level qualifications provide. These include: electrical design engineer (designing electrical installations for buildings and industrial facilities using software such as Amtech and Dialux), building services engineer (broader building engineering role covering electrical, mechanical, and public health services), project engineer or project manager (managing electrical installation projects from design through to commissioning), technical sales engineer (selling technical products and systems to specifiers and contractors), commissioning engineer (testing and commissioning complex building services and industrial systems), and estimator/quantity surveyor (pricing electrical installation projects). Typical salaries for these roles range from £35,000 to £55,000 at entry level, rising to £50,000 to £75,000 with experience. Some of these roles may also require professional registration with the Engineering Council (EngTech or IEng), for which the HNC provides the academic foundation.',
  },
];

const modules = [
  {
    title: 'Engineering Mathematics for Electricians',
    description:
      'Algebra, trigonometry, calculus, complex numbers, and their application to electrical circuits. This module supports the most challenging aspect of HNC study for returning electricians.',
  },
  {
    title: 'Electrical and Electronic Principles',
    description:
      'DC and AC circuit analysis, network theorems (Kirchhoff, Thevenin, Norton), power in AC circuits, three-phase systems, transformers, and semiconductor devices.',
  },
  {
    title: 'Electrical Installation and Design',
    description:
      'Design calculations for electrical installations — cable sizing, voltage drop, fault current, discrimination, and compliance with BS 7671. Design software introduction.',
  },
  {
    title: 'Control Systems and Automation',
    description:
      'Open-loop and closed-loop control, PID controllers, PLCs, motor control, variable speed drives, and industrial automation. Links to instrumentation and BMS systems.',
  },
  {
    title: 'Engineering Project Management',
    description:
      'Project planning, Gantt charts, critical path analysis, cost control, quality management, risk management, and stakeholder communication. Applicable to electrical contracting projects.',
  },
  {
    title: 'Professional Development and Study Skills',
    description:
      'Academic writing, research methods, referencing, time management, and professional registration pathways (EngTech, IEng). Support for returning students adapting to academic study.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any engineering question in plain English. Get step-by-step explanations of complex algebra, circuit analysis, Thevenin equivalents, and three-phase calculations.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Video explanations of engineering mathematics, AC theory, network theorems, and design calculations — watch on any device between lectures.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your understanding with module-aligned questions. Solve circuit problems, apply network theorems, calculate fault currents, and verify design calculations.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your assignment deadlines and exam dates. Elec-Mate creates a personalised revision schedule so you stay on track throughout the academic year.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering formulas, theorems, component specifications, and key definitions. Perfect for revision during breaks on site.',
  },
  {
    icon: FileCheck2,
    title: 'Calculation Tools',
    description:
      'Elec-Mate includes cable sizing, voltage drop, fault current, and power factor calculators that help you check your HNC assignment calculations.',
  },
];

const sections = [
  {
    id: 'what-is-hnc',
    heading: 'What Is an HNC in Electrical and Electronic Engineering?',
    content: (
      <>
        <p>
          The HNC (Higher National Certificate) in Electrical and Electronic Engineering is a Level
          4 academic qualification. It sits one level above NVQ Level 3 (the standard electrician
          qualification) and one level below a foundation degree. The HNC provides a solid academic
          foundation in engineering principles, mathematics, and design that goes beyond trade-level
          training.
        </p>
        <p>
          The qualification is awarded by Pearson (through the BTEC Higher National framework) and
          is delivered by colleges and universities across the UK. It consists of a set of core and
          specialist modules, typically totalling 120 credits, and is assessed through assignments,
          examinations, and a work-based project.
        </p>
        <p>
          For electricians, the HNC represents a significant step up in technical knowledge. While
          your Level 3 qualification proves you can install, test, and certify electrical
          installations, the HNC develops your ability to analyse circuits mathematically, design
          electrical systems from first principles, understand control theory and electronics, and
          manage engineering projects.
        </p>
        <p>
          This deeper knowledge is valued by employers in building services engineering, electrical
          design consultancies, large contracting companies, and the manufacturing and process
          industries. The HNC is often a minimum requirement for engineering, design, and management
          roles that offer significantly higher salaries than site-based installation work.
        </p>
      </>
    ),
  },
  {
    id: 'hnc-vs-degree',
    heading: 'HNC vs Degree: Choosing the Right Path',
    content: (
      <>
        <p>
          The HNC and a full degree (BEng or BSc in Electrical Engineering) are both academic
          qualifications, but they differ in depth, duration, and career positioning.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HNC (Level 4)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>1 year full-time or 2 years part-time</li>
              <li>120 credits at Level 4</li>
              <li>Practical, industry-focused content</li>
              <li>Lower tuition fees (£4,000-£7,000 total)</li>
              <li>Accessible while working full-time</li>
              <li>Qualifies for EngTech registration</li>
              <li>Can progress to HND and then degree</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">BEng Degree (Level 6)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>3 years full-time or 4-6 years part-time</li>
              <li>360 credits across Levels 4, 5, and 6</li>
              <li>Deeper theoretical and research content</li>
              <li>Higher tuition fees (£27,000+ total)</li>
              <li>More difficult to combine with full-time work</li>
              <li>Qualifies for IEng or CEng registration</li>
              <li>Required for some senior engineering roles</li>
            </ul>
          </div>
        </div>
        <p>
          For most electricians looking to progress their careers, the HNC is the practical first
          step. It delivers a meaningful qualification in a manageable timeframe while you continue
          working. If you decide you want to go further, you can progress to the HND and then to a
          degree — but many electricians find that the HNC alone is sufficient to access the roles
          they want.
        </p>
        <SEOAppBridge
          title="Get AI help with HNC engineering maths"
          description="Engineering mathematics is the module that most returning students find hardest. The Elec-Mate AI tutor explains algebra, trigonometry, calculus, and complex numbers step by step — ask any question, any time."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'entry-requirements',
    heading: 'Entry Requirements for the HNC',
    content: (
      <>
        <p>
          Entry requirements vary between institutions, but the typical minimum requirements for the
          HNC in Electrical and Electronic Engineering are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 qualification</strong> in electrical installation or a related
                engineering discipline. This includes NVQ Level 3, C&G 2357, C&G 2365, BTEC Level 3
                in Engineering, or A-levels including mathematics and a science or technology
                subject.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GCSE mathematics at grade C/4 or above</strong> (or Functional Skills Level
                2 in mathematics). This is essential — the HNC involves significant mathematical
                content and you will need confidence with algebra at minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GCSE English at grade C/4 or above</strong> (or Functional Skills Level 2 in
                English). The HNC requires academic writing skills for assignments and reports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relevant industry experience.</strong> Most part-time programmes expect you
                to be working in the electrical industry. Your workplace provides the context for
                your assignments and your work-based project.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Mature applicants (typically 21 or over) with significant industry experience but without
          formal Level 3 qualifications may be considered on a case-by-case basis. Some institutions
          offer interviews or diagnostic assessments to evaluate readiness. If your mathematics
          needs refreshing, look for institutions that offer a mathematics bridging course before
          the HNC starts.
        </p>
      </>
    ),
  },
  {
    id: 'core-modules',
    heading: 'What You Will Study: Core HNC Modules',
    content: (
      <>
        <p>
          The HNC in Electrical and Electronic Engineering consists of core modules (which all
          students study) and specialist modules (which you choose based on your career interests).
          The core modules provide the essential engineering foundations:
        </p>
        <p>
          <strong>Engineering Mathematics</strong> covers algebra, trigonometry, differentiation,
          integration, complex numbers, matrices, and statistics. These mathematical tools are
          applied to electrical circuit analysis, control systems, and design calculations. This is
          typically the most challenging module for returning students — Elec-Mate AI provides
          step-by-step worked solutions to help you through.
        </p>
        <p>
          <strong>Electrical and Electronic Principles</strong> covers DC and AC circuit analysis in
          depth — Kirchhoff's laws, mesh and nodal analysis, Thevenin and Norton equivalents,
          superposition, AC power (real, reactive, apparent), power factor, three-phase systems,
          transformers, and semiconductor devices (diodes, transistors, op-amps). This extends the{' '}
          <SEOInternalLink href="/training/electrical-science">electrical science</SEOInternalLink>{' '}
          you studied at Level 3 to a much deeper analytical level.
        </p>
        <p>
          <strong>Engineering Design</strong> applies engineering principles to practical design
          problems. For electrical students, this often involves designing an electrical
          installation or system, including calculations, drawings, specification, and compliance
          with <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>.
        </p>
        <p>
          <strong>Managing a Professional Engineering Project</strong> is the capstone module where
          you plan and execute a work-based project that demonstrates your ability to apply
          engineering knowledge to a real problem. This is assessed through a written report and
          presentation.
        </p>
      </>
    ),
  },
  {
    id: 'part-time-options',
    heading: 'Part-Time Study: Making It Work Around Your Job',
    content: (
      <>
        <p>
          The majority of electricians studying for an HNC do so part-time while continuing to work.
          This is the most practical approach — you maintain your income, gain work experience that
          enriches your assignments, and progress your career without a break.
        </p>
        <p>
          Part-time study options typically include day release (one day per week, usually Wednesday
          or Thursday, for 2 academic years), evening study (two evenings per week, typically 6pm to
          9pm, for 2 academic years), or block release (intensive weeks of study spread through the
          year, with periods of full-time work in between).
        </p>
        <p>
          The key to succeeding as a part-time student is time management. You will need to dedicate
          approximately 10 to 15 hours per week to study outside of lectures — reading, completing
          assignments, revising for exams, and working on your project. This is on top of your
          full-time job and any personal commitments.
        </p>
        <p>
          Discuss your plans with your employer before enrolling. Many employers value the HNC and
          will support you with day release, study leave for exams, and potentially fee sponsorship.
          Even if your employer does not offer formal support, they should be aware of your study
          commitments so they can accommodate exam periods and assignment deadlines.
        </p>
        <SEOAppBridge
          title="Study engineering modules on your phone"
          description="Elec-Mate makes HNC study accessible anywhere — commuting, on break, or waiting on site. AI explanations, flashcards, and practice questions for engineering maths, circuit analysis, and electrical principles."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'career-benefits',
    heading: 'Career Benefits: Where the HNC Takes You',
    content: (
      <>
        <p>
          The HNC transforms your career options. While NVQ Level 3 qualifies you for installation
          work, the HNC opens doors to engineering, design, and management roles that offer higher
          salaries, greater variety, and longer career longevity.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <TrendingUp className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Higher Earning Potential</h3>
              <p className="text-white text-sm leading-relaxed">
                HNC holders working in engineering, design, or management roles typically earn
                £40,000 to £60,000 — significantly more than the average electrician salary of
                £33,000 to £38,000. Senior roles with additional experience can reach £60,000 to
                £75,000.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Briefcase className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">New Career Pathways</h3>
              <p className="text-white text-sm leading-relaxed">
                Access roles in electrical design, building services engineering, project
                management, commissioning engineering, technical sales, and estimating — all growing
                fields with strong demand. See the{' '}
                <SEOInternalLink href="/guides/electrical-qualifications-pathway">
                  qualifications pathway guide
                </SEOInternalLink>{' '}
                for the full career map.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Award className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Professional Registration</h3>
              <p className="text-white text-sm leading-relaxed">
                The HNC provides the academic foundation for EngTech (Engineering Technician)
                registration with the Engineering Council through the IET (Institution of
                Engineering and Technology). EngTech demonstrates professional competence and is
                recognised internationally.
              </p>
            </div>
          </div>
        </div>
        <p>
          The HNC also benefits electricians who stay in installation work. The deeper understanding
          of electrical principles, design calculations, and project management makes you a better
          electrician, a more effective supervisor, and a stronger candidate for{' '}
          <SEOInternalLink href="/guides/electrical-specialisations">
            specialist roles
          </SEOInternalLink>{' '}
          in areas such as data centres, industrial control systems, and renewable energy.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Qualifications Pathway Guide',
    description:
      'The complete map of electrical qualifications — from apprenticeship to chartered engineer.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/training/level-3-electrical',
    title: 'Level 3 Electrical Course',
    description: 'NVQ Level 3 study support — the qualification you need before starting the HNC.',
    icon: GraduationCap,
    category: 'Training' as const,
  },
  {
    href: '/guides/career-progression-electrician',
    title: 'Career Progression Guide',
    description:
      'From apprentice to director — career pathways and salary expectations at every stage.',
    icon: TrendingUp,
    category: 'Guide' as const,
  },
  {
    href: '/guides/electrical-specialisations',
    title: 'Electrical Specialisations',
    description: 'Explore specialist career paths that benefit from HNC-level knowledge.',
    icon: Award,
    category: 'Guide' as const,
  },
  {
    href: '/training/electrical-science',
    title: 'Electrical Science Course',
    description: 'Refresh your Level 3 electrical science knowledge before starting HNC study.',
    icon: Calculator,
    category: 'Training' as const,
  },
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'BS 7671 training — the wiring regulations you will apply in your HNC design modules.',
    icon: BookOpen,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'HNC Electrical and Electronic Engineering — Study Guide',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Advanced',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT15H',
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

export default function HNCElectricalCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Higher Education"
      badgeIcon={Award}
      heroTitle={
        <>
          HNC Electrical: <span className="text-yellow-400">Higher National Certificate Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about studying for the HNC in Electrical and Electronic Engineering. Entry requirements, core modules, part-time options, career benefits, and AI-powered study support for the topics that challenge returning students."
      readingTime={14}
      courseDuration="15 hours"
      courseLevel="Advanced"
      coursePrerequisites="NVQ Level 3 or equivalent electrical qualification, GCSE maths and English at grade C/4 or above"
      courseModules={6}
      courseCertification="Elec-Mate CPD certificate for study support modules — the HNC qualification itself is awarded by Pearson through your college or university"
      courseWhoIsItFor="Qualified electricians looking to progress into engineering, design, or management roles, apprentices planning their career pathway, and experienced electricians returning to academic study"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Get the study support you need for your HNC"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. AI-powered explanations for engineering maths, circuit analysis, and electrical principles. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/hnc-electrical"
    />
  );
}
