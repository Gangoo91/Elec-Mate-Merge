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
  { id: 'a4-2026-updates', label: 'A4:2026 Design Updates' },
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
  'BS 7671:2018+A4:2026 introduced three changes designers must now address: arc fault detection devices (AFDDs) recommended for AC final circuits (Reg 421.1.7), mandatory 30 mA RCD protection on domestic lighting circuits (Reg 411.3.4), and a design requirement to consider surge protective devices in accordance with Section 534.',
  'A key distinction-level exam point: the tabulated maximum Zs values in BS 7671 Table 41.3 are calculated at operating temperature. On-site cold-measured Zs must not exceed 80% of the tabulated value (the GN3 site limit). For a 32 A Type B MCB the tabulated max Zs is 1.37 Ω — so the maximum acceptable cold-measured site reading is 1.10 Ω.',
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
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Practise the cable sizing calculations that form a major part of the 2396 exam.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
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
            BS 7671:2018+A4:2026
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
                  BS 3036 rewirable fuses (Cf). Voltage drop calculations for long cable runs. Where
                  cables are buried in or pass through thermal insulation, consult the Appendix F
                  tables in the IET On-Site Guide for the appropriate Ci correction factors — these
                  directly determine whether a larger cable cross-section is required (OSG Reg 2.6).
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
                <div className="mt-3 rounded-xl bg-white/[0.06] border border-white/10 p-4">
                  <p className="text-white text-xs font-semibold mb-2 uppercase tracking-wide">
                    Key design threshold: maximum Zs
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed">
                    BS 7671 Table 41.3 gives maximum earth fault loop impedance (Zs) values at
                    operating temperature. Example: a 32 A Type B MCB has a tabulated max Zs of 1.37
                    &Omega; (Reg 411.4.204(a)). On-site cold-measured Zs must not exceed 80% of this
                    tabulated value — the GN3 site limit — giving a maximum acceptable cold-measured
                    reading of 1.10 &Omega;. This distinction between designed Zs and site-measured
                    Zs is a common exam and interview question.
                  </p>
                </div>
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
    id: 'a4-2026-updates',
    heading: 'A4:2026 Design Updates — What Changed for Designers',
    content: (
      <>
        <p>
          The 2396 exam is now set against BS 7671:2018+A4:2026. Three A4 changes are directly
          relevant to electrical installation designers and are likely to feature in exam scenarios:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Arc Fault Detection Devices — Reg 421.1.7
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Regulation 421.1.7 recommends the installation of arc fault detection devices
                  (AFDDs) in AC final circuits of a fixed installation to mitigate the risk of fire
                  due to arc fault currents. The wording is advisory rather than mandatory — it uses
                  &apos;recommending&apos; rather than &apos;shall&apos; — but designers should
                  consider AFDDs and document their decision, particularly for domestic
                  installations where cables may be concealed or routed through combustible
                  materials.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  30 mA RCD Protection for Domestic Lighting — Reg 411.3.4
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Regulation 411.3.4 requires that, within domestic (household) premises, additional
                  protection by an RCD with a rated residual operating current not exceeding 30 mA
                  shall be provided for AC final circuits supplying luminaires. This is a mandatory
                  requirement — note the word &apos;shall&apos;. Domestic lighting circuits must now
                  be protected by a 30 mA RCD or RCBO, not just an MCB. This changes the consumer
                  unit design for new domestic installations and rewires.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Surge Protective Devices — Section 534
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Section 534 sets out requirements for the selection and installation of surge
                  protective devices (SPDs). Designers must now assess whether SPD protection is
                  required and document that assessment. Where SPDs are installed, Regulation
                  534.4.5.2 requires that operation of an overcurrent protective device caused by
                  SPD failure must not interrupt continuity of supply to the connected equipment —
                  this determines how SPDs must be arranged relative to their backup overcurrent
                  protection.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-white/70 mt-2">
          Last reviewed for BS 7671:2018+A4:2026 (effective January 2026).
        </p>
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
          description="Elec-Mate's cable sizing calculator, voltage drop calculator, and AI circuit designer help you design installations that comply with BS 7671."
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
      title="City & Guilds 2396 Design Course | Electrical Design"
      description="Complete guide to the City & Guilds 2396 Electrical Installation Design qualification. Course content, exam format, prerequisites, career benefits…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
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
