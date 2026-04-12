import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Ruler,
  FileCheck2,
  Award,
  Zap,
  Calculator,
  Target,
  PenTool,
  ClipboardCheck,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'C&G 2396 Design Course', href: '/guides/city-guilds-2396-design-course' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the 2396?' },
  { id: 'who-needs-it', label: 'Who Needs It?' },
  { id: 'course-content', label: 'Course Content' },
  { id: 'exam-format', label: 'Exam Format' },
  { id: 'prerequisites', label: 'Prerequisites and Entry Requirements' },
  { id: 'career-benefits', label: 'Career Benefits' },
  { id: 'choosing-provider', label: 'Choosing a Training Provider' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The City & Guilds 2396 (Electrical Installation Design) teaches you to design electrical installations from scratch — circuit design, cable sizing, protective device selection, and compliance with BS 7671.',
  'It is aimed at electricians who want to move into design work, take on larger projects, or progress to supervisory and management roles. It is not a basic qualification — you need the 2382 (18th Edition) and ideally the 2391 (Inspection and Testing) first.',
  'The course covers design calculations (cable sizing, voltage drop, fault current, earth fault loop impedance, protective device discrimination), load assessment, circuit arrangements, and documentation.',
  'The exam consists of a written design project — you are given a scenario and must produce a complete electrical installation design with calculations, schedules, and specification. It is not multiple choice.',
  'The 2396 is increasingly valued by employers and clients. It distinguishes you from electricians who install but do not design, and it is essential if you want to tender for larger commercial and industrial projects.',
];

const faqs = [
  {
    question: 'What is the difference between the 2396 and the 2382?',
    answer:
      'The 2382 tests your knowledge of BS 7671 — the Wiring Regulations. It is a multiple-choice exam that checks whether you can find and interpret regulations. The 2396 goes much further: it teaches you to apply BS 7671 to design complete electrical installations. You learn to calculate cable sizes, select protective devices, assess loads, design circuit arrangements, and produce design documentation. Think of the 2382 as knowing the rules and the 2396 as applying the rules to real-world design problems. You need the 2382 before taking the 2396.',
  },
  {
    question: 'How long is the City & Guilds 2396 course?',
    answer:
      'Most training providers deliver the 2396 as a 5-day classroom course, though some offer it over 3 or 4 days with additional self-study. The exam is typically held on the final day or within a few weeks of completing the course. Allow at least 2 to 4 weeks of additional study after the classroom sessions to practise design calculations and prepare for the exam. If you are studying through distance learning, the course typically takes 8 to 12 weeks at 5 to 10 hours per week.',
  },
  {
    question: 'Is the 2396 exam difficult?',
    answer:
      'The 2396 is widely considered one of the more challenging electrical qualifications because it is not multiple choice — you must produce a complete design with calculations. However, it is achievable with proper preparation. The key is practising the calculation methods until they are second nature: cable sizing using Appendix 4 of BS 7671, voltage drop calculations, earth fault loop impedance calculations, and protective device selection. If you can work through a design from a brief to a completed circuit schedule with accurate calculations, you will pass.',
  },
  {
    question: 'Do I need the 2396 to be an electrician?',
    answer:
      'No — the 2396 is not required to work as an electrician or to join a competent person scheme. The core qualifications for a domestic electrician are the 2382 (18th Edition), a practical qualification (2365, 2357, or NVQ Level 3), and the AM2 assessment. However, the 2396 is increasingly expected by employers for electricians working on commercial and industrial projects, and it is essential if you want to design installations rather than just install them. It is also a stepping stone to Level 4 qualifications and supervisory roles.',
  },
  {
    question: 'What qualifications do I need before taking the 2396?',
    answer:
      'You need the City & Guilds 2382 (18th Edition Wiring Regulations) as a minimum. Most training providers also recommend or require the 2391 (Inspection and Testing), because the 2396 builds on the testing and verification concepts covered in the 2391. Practical experience is important too — the 2396 involves real-world design scenarios, and candidates with on-site experience find the course much easier to follow because they can relate the calculations to actual installations.',
  },
  {
    question: 'How much does the 2396 course cost?',
    answer:
      'Prices vary by training provider and location. Expect to pay between 500 and 900 pounds for a classroom course, which typically includes the exam fee. Distance learning options are sometimes cheaper (300 to 600 pounds) but require more self-discipline. Some employers will pay for the course as part of your professional development — it is worth asking. The investment pays for itself quickly if it allows you to take on design work at higher rates.',
  },
  {
    question: 'Can I use a calculator in the 2396 exam?',
    answer:
      'Yes. You will need a basic (non-programmable) calculator for the design calculations. You can also bring your copy of BS 7671 and the IET On-Site Guide, just as with the 2382 exam. Since the 2396 exam is a design exercise rather than multiple choice, you will be working through calculations throughout, so a reliable calculator is essential. Practise using the same calculator you will take into the exam.',
  },
  {
    question: 'Is the 2396 the same as the old 2400?',
    answer:
      'The 2396 replaced the older City & Guilds 2400 (Design and Verification of Electrical Installations). The 2396 focuses specifically on the design element, while the verification element is covered by the 2391. If you hold the old 2400, it is still valid, but you may want to consider updating to the 2396 if your original qualification was based on an older edition of BS 7671.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The prerequisite for the 2396 — the 18th Edition Wiring Regulations exam.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Practise the cable sizing calculations that form a major part of the 2396 exam.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on circuit designs — a core 2396 exam skill.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/level-4-electrical-qualification',
    title: 'Level 4 Electrical Qualification',
    description:
      'The next step up from the 2396 for electricians pursuing design and management careers.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description: 'How the 2396 contributes to meeting Gold Card qualification requirements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'The C&G 2391 — recommended before or alongside the 2396.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is the City & Guilds 2396?',
    content: (
      <>
        <p>
          The City & Guilds 2396 — Electrical Installation Design — is the qualification that
          teaches electricians how to design electrical installations in compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <p>
          While the 2382 teaches you to understand the Wiring Regulations and the 2391 teaches you
          to test and verify installations, the 2396 teaches you to design them. That means
          calculating cable sizes, selecting protective devices, assessing loads, designing circuit
          arrangements, checking voltage drop and earth fault loop impedance, and producing the
          design documentation that a competent electrician can install from.
        </p>
        <p>
          It is a Level 4 equivalent qualification — a significant step up from the Level 3
          qualifications that most electricians hold. It demonstrates that you can think through an
          installation before it is built, not just wire what is on the drawing.
        </p>
      </>
    ),
  },
  {
    id: 'who-needs-it',
    heading: 'Who Needs the 2396?',
    content: (
      <>
        <p>
          The 2396 is not required for every electrician, but it is valuable for several groups:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricians tendering for commercial work</strong> — clients and main
                contractors increasingly expect the electrician to produce the design, not just
                install from someone else's drawings. The 2396 proves you can do both.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricians moving into supervisory roles</strong> — if you are managing
                other electricians or overseeing projects, you need to understand the design as well
                as the installation. The 2396 gives you that capability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed electricians growing their business</strong> — offering design
                and installation as a package commands higher rates and attracts larger projects
                that install-only electricians cannot compete for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricians pursuing the Gold Card</strong> — the{' '}
                <SEOInternalLink href="/guides/gold-card-requirements-electrician">
                  ECS Gold Card
                </SEOInternalLink>{' '}
                requires a design qualification. The 2396 fulfils this requirement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'course-content',
    heading: 'Course Content',
    content: (
      <>
        <p>
          The 2396 covers the complete electrical design process from initial brief to finished
          design documentation. The core topics are:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PenTool className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Load Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Determining the total load for an installation based on connected equipment,
                  diversity factors, and maximum demand. Understanding how to assess loads for
                  different building types — domestic, commercial, industrial.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Ruler className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Selection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Calculating minimum cable sizes using Appendix 4 of BS 7671. Applying correction
                  factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and
                  BS 3036 fuses (Cf). Voltage drop calculations for long cable runs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Protective Device Selection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Selecting MCBs, RCBOs, RCDs, and fuses based on design current, prospective fault
                  current, and disconnection time requirements. Understanding discrimination
                  (selectivity) between upstream and downstream devices.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Circuit Arrangements</h4>
                <p className="text-white text-sm leading-relaxed">
                  Designing circuit layouts for different installation types. Distribution board
                  schedules, sub-main calculations, ring and radial circuit design, three-phase load
                  balancing, and emergency lighting circuits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Design Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Producing the paperwork: circuit schedules, cable schedules, design
                  specifications, and supporting calculations. Understanding what documentation is
                  needed for Building Control, the client, and the installing electrician.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'exam-format',
    heading: 'Exam Format',
    content: (
      <>
        <p>
          The 2396 exam is fundamentally different from the 2382 or 2391 exams. It is not multiple
          choice — it is a design project.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design project</strong> — you receive a scenario describing a building and
                its electrical requirements. You must produce a complete electrical design including
                load assessment, circuit schedules, cable sizing calculations, protective device
                selection, and voltage drop verification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open book</strong> — you can bring BS 7671, the IET On-Site Guide, and a
                basic calculator. The same rules apply as the 2382 regarding tabs and highlighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Show your working</strong> — marks are awarded for the calculation method as
                well as the correct answer. Even if your final cable size is wrong, you can still
                pick up marks for using the correct formula and approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time: approximately 3 hours</strong> — this varies by assessment centre, but
                you will need the full time. Work methodically through the design rather than
                rushing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'prerequisites',
    heading: 'Prerequisites and Entry Requirements',
    content: (
      <>
        <p>The 2396 is not an entry-level qualification. Training providers typically require:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2382</strong> (18th Edition Wiring Regulations) — this is mandatory. You
                must understand BS 7671 before you can design to it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391</strong> (Inspection and Testing) — strongly recommended. The 2396
                references testing and verification concepts covered in the 2391.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical experience</strong> — the course is much easier to follow if you
                have real-world installation experience. Most providers recommend at least 2 years
                of on-site experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Good maths</strong> — the 2396 is calculation-heavy. You need to be
                comfortable with algebra, fractions, and using formulas. If maths is not your
                strength, consider brushing up before starting the course.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'career-benefits',
    heading: 'Career Benefits of the 2396',
    content: (
      <>
        <p>
          The 2396 opens doors that are not available to electricians with only Level 3
          qualifications:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher rates</strong> — electricians who can design and install command
                premium rates compared to those who only install from drawings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger projects</strong> — commercial and industrial clients expect the
                contractor to produce the design. Without the 2396, you cannot credibly tender for
                these projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gold Card eligibility</strong> — the ECS Gold Card requires a design
                qualification. The 2396 ticks that box.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pathway to Level 4</strong> — the 2396 is a stepping stone to the{' '}
                <SEOInternalLink href="/guides/level-4-electrical-qualification">
                  Level 4 electrical qualification
                </SEOInternalLink>
                , which is the HNC equivalent and opens up management and consulting roles.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-provider',
    heading: 'Choosing a Training Provider',
    content: (
      <>
        <p>
          The quality of the training provider matters significantly for the 2396 because it is a
          design-based qualification — you need a tutor who can explain the calculation methods
          clearly and give you practical design exercises to work through.
        </p>
        <p>
          Look for providers who offer small class sizes (fewer than 15 candidates), provide
          practice design exercises with worked solutions, include mock exams as part of the course,
          and have tutors with real-world design experience (not just academic knowledge). Check
          reviews from previous candidates — specifically ask whether the tutor explained the
          Appendix 4 calculation methods clearly and whether the practice exercises were
          representative of the actual exam.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Design With Confidence',
    content: (
      <>
        <p>
          Whether you are studying for the 2396 or already qualified, Elec-Mate gives you the tools
          to design electrical installations accurately and efficiently.
        </p>
        <SEOAppBridge
          title="AI-powered electrical design tools"
          description="Elec-Mate's cable sizing calculator, voltage drop calculator, and AI circuit designer help you design installations that comply with BS 7671. Practise your 2396 calculations or design real projects — all from your phone."
          icon={PenTool}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2396DesignCoursePage() {
  return (
    <GuideTemplate
      title="City & Guilds 2396 Design Course | Electrical Design Qualification UK"
      description="Complete guide to the City & Guilds 2396 Electrical Installation Design qualification. Course content, exam format, prerequisites, career benefits, and how to choose a training provider. Updated 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          City & Guilds 2396:{' '}
          <span className="text-yellow-400">Electrical Installation Design Course</span>
        </>
      }
      heroSubtitle="The design qualification that sets you apart. Learn what the 2396 covers, who needs it, the exam format, prerequisites, career benefits, and how to choose the right training provider."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the C&G 2396"
      relatedPages={relatedPages}
      ctaHeading="Design Electrical Installations With Confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, voltage drop calculations, and AI-powered circuit design. 7-day free trial, cancel anytime."
    />
  );
}
