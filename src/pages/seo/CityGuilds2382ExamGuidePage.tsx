import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileCheck2,
  Award,
  Zap,
  Calculator,
  Target,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'C&G 2382 Exam Guide', href: '/guides/city-guilds-2382-exam-guide' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the 2382 Exam?' },
  { id: 'exam-format', label: 'Exam Format and Structure' },
  { id: 'open-book', label: 'Open Book — What You Can Bring' },
  { id: 'study-tips', label: 'Study Tips That Actually Work' },
  { id: 'common-fail-areas', label: 'Common Fail Areas' },
  { id: 'preparation-timeline', label: 'Preparation Timeline' },
  { id: 'on-the-day', label: 'On the Day' },
  { id: 'after-passing', label: 'After Passing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The City & Guilds 2382 is the 18th Edition Wiring Regulations exam (BS 7671:2018+A3:2024). It is a requirement for most electricians working in the UK and is needed to join a competent person scheme such as NICEIC, NAPIT, or ELECSA.',
  'The exam is multiple choice, open book. You can take your copy of BS 7671 and the IET On-Site Guide into the exam. Tabbing and highlighting are permitted, but no loose notes or post-its.',
  'Common fail areas include Appendix 4 cable sizing questions, earth fault loop impedance calculations, discrimination between protective devices, and regulation cross-referencing under time pressure.',
  'Most candidates who fail do so because they run out of time — practise navigating BS 7671 quickly, not just reading it cover to cover.',
  'Passing the 2382 does not qualify you to work as an electrician on its own. It is a knowledge-based qualification that is combined with practical qualifications (2365, 2357, or NVQ Level 3) and the AM2 assessment.',
];

const faqs = [
  {
    question: 'How many questions are on the City & Guilds 2382 exam?',
    answer:
      'The 2382-22 exam (18th Edition with Amendment 3) consists of 60 multiple-choice questions. You have 2 hours to complete the exam. The pass mark is 60% — that means you need to get at least 36 out of 60 correct. Every question has four possible answers (A, B, C, D) and only one is correct. There is no negative marking, so if you are unsure, always make your best guess rather than leaving a question blank.',
  },
  {
    question: 'Is the 2382 exam open book?',
    answer:
      'Yes. You can bring your personal copy of BS 7671:2018+A3:2024 (the 18th Edition Wiring Regulations) and the IET On-Site Guide into the exam. You are allowed to highlight text, use coloured tabs, and write notes directly on the pages of the book. However, you cannot bring loose notes, post-it notes sticking out of the book, separate reference sheets, or any electronic devices. Some training centres provide copies if you do not have your own, but using your own tabbed and highlighted copy gives you a significant advantage.',
  },
  {
    question: 'How long should I study for the 2382 exam?',
    answer:
      'Most training providers offer a 3 to 5 day classroom course, but the classroom time alone is not enough for most people. Plan for at least 2 to 4 weeks of additional self-study after the course. If you are studying independently without a classroom course, allow 6 to 8 weeks of regular study (at least an hour a day). The key is not just reading the regulations but practising finding information quickly under time pressure. Use past papers and mock exams to build speed.',
  },
  {
    question: 'What happens if I fail the 2382 exam?',
    answer:
      'If you fail, you can resit the exam. Most training providers charge a resit fee (typically between 50 and 100 pounds). There is no mandatory waiting period — you can resit as soon as the next available exam slot, though it is worth taking at least a week to focus on the areas you struggled with. Your training provider can usually tell you which sections you scored lowest on. Many candidates pass on their second attempt after focusing their revision on weak areas.',
  },
  {
    question: 'Do I need the 2382 to work as an electrician?',
    answer:
      'The 2382 is not a legal requirement to work as an electrician, but it is a practical requirement for almost all electrical work in the UK. You need it to join any competent person scheme (NICEIC, NAPIT, ELECSA, STROMA), and most employers require it. It is also needed for the ECS (Electrotechnical Certification Scheme) card, which is required for site access on most commercial and industrial jobs. If you are a qualified electrician with an older edition (16th or 17th), you need to update to the 18th Edition to maintain your competent person scheme membership.',
  },
  {
    question: 'What is the difference between the 2382-22 and the old 2382-18?',
    answer:
      'The 2382-18 covered BS 7671:2018 (the original 18th Edition). The 2382-22 covers BS 7671:2018+A3:2024, which includes all three amendments to the 18th Edition. Amendment 3 introduced significant changes including updated requirements for AFDDs (arc fault detection devices), solar PV and battery storage installations, prosumer installations, and updated Appendix 4 tables. If you passed the 2382-18, you do not need to resit the 2382-22 unless your competent person scheme requires it, but the C&G 2382-22 is the current version and is what training providers now deliver.',
  },
  {
    question: 'Can I take the 2382 exam online?',
    answer:
      'City & Guilds offers the 2382 as both a centre-based exam (at a training provider or college) and an online proctored exam that you can take from home. For the online version, you need a computer with a webcam, a stable internet connection, and a quiet room. You can still use your physical copy of BS 7671 — the proctor will ask you to show it on camera. Many candidates prefer the centre-based exam because the environment is more controlled and distractions are minimised, but the online option is convenient if you do not have a training centre nearby.',
  },
  {
    question: 'Is the 2382 harder than the 2391?',
    answer:
      'They test different things. The 2382 is a knowledge exam about the Wiring Regulations — it tests whether you can find and interpret regulations in BS 7671. The 2391 (Inspection and Testing) is more practical and calculation-heavy — it tests whether you can carry out initial verification and periodic inspection, interpret test results, and complete certification. Most electricians find the 2391 harder because it requires both theoretical knowledge and practical application. However, the 2382 should not be underestimated — the time pressure and the need to navigate BS 7671 quickly trip up many candidates.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Comprehensive guide to the 18th Edition Wiring Regulations covered in the 2382 exam.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Prepare for the AM2 practical assessment — the next step after passing your 2382.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Practise Appendix 4 cable sizing calculations — the most common fail area in the 2382.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types Explained',
    description: 'Understand which ECS card you can apply for after passing the 2382.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for the C&G 2391 — often taken alongside or after the 2382.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/city-guilds-2396-design-course',
    title: 'C&G 2396 Design Course',
    description: 'Electrical design qualification that builds on 2382 knowledge.',
    icon: Target,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is the City & Guilds 2382 Exam?',
    content: (
      <>
        <p>
          The City & Guilds 2382 is the industry-standard exam on{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024 — the 18th Edition Wiring Regulations
          </SEOInternalLink>
          . It is the qualification that proves you understand the regulations governing electrical
          installations in the UK.
        </p>
        <p>
          Almost every electrician in the UK needs it. You cannot join a competent person scheme
          (NICEIC, NAPIT, ELECSA, or STROMA) without it. Most employers require it. The ECS
          (Electrotechnical Certification Scheme) card requires it. If you want to self-certify
          your own work under Part P of the Building Regulations, you need it.
        </p>
        <p>
          The current version is the 2382-22, which covers the 18th Edition including Amendment 3
          (published in 2024). If you hold an older version (2382-18 or 2382-15), you may need to
          update depending on your competent person scheme requirements.
        </p>
        <p>
          This guide covers the exam format, what you can bring into the exam, study tips from
          electricians who have passed, the most common fail areas, and what to do after you pass.
        </p>
      </>
    ),
  },
  {
    id: 'exam-format',
    heading: 'Exam Format and Structure',
    content: (
      <>
        <p>
          The 2382-22 exam is a multiple-choice, open-book examination. Here are the key details:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>60 multiple-choice questions</strong> — each question has four answer
                options (A, B, C, D). Only one answer is correct.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2 hours (120 minutes)</strong> — that is 2 minutes per question on average.
                Some questions take 30 seconds (if you know the regulation number), others take 4 to
                5 minutes (calculation questions). Time management is critical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass mark: 60%</strong> — you need at least 36 out of 60 correct. There is
                no negative marking, so always answer every question.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open book</strong> — you can take BS 7671 and the IET On-Site Guide into the
                exam. More on this below.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Questions are drawn from across the entire BS 7671, but certain sections are tested more
          heavily: Part 4 (Protection for Safety), Part 5 (Selection and Erection of Equipment),
          Part 6 (Inspection and Testing), and the Appendices (especially Appendix 4 for cable
          sizing).
        </p>
      </>
    ),
  },
  {
    id: 'open-book',
    heading: 'Open Book — What You Can Bring',
    content: (
      <>
        <p>
          The 2382 is an open-book exam, which means you can bring reference materials into the exam
          room. This is a significant advantage — but only if you know how to use your books
          efficiently.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What You CAN Bring</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>BS 7671:2018+A3:2024 (your own copy)</li>
              <li>IET On-Site Guide (your own copy)</li>
              <li>Highlighting and underlining in the books</li>
              <li>Coloured tabs attached to pages</li>
              <li>Notes written directly on the pages</li>
              <li>A basic (non-programmable) calculator</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What You CANNOT Bring</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Loose notes or separate sheets of paper</li>
              <li>Post-it notes sticking out of books</li>
              <li>Other IET publications (Guidance Notes, etc.)</li>
              <li>Electronic devices (phones, tablets, smartwatches)</li>
              <li>Programmable or scientific calculators</li>
              <li>Notes written on tabs (tabs for marking only)</li>
            </ul>
          </div>
        </div>
        <p>
          The most effective approach is to tab the key sections you know you will need to find
          quickly: Appendix 4 tables, Part 4 (especially Chapter 41 for disconnection times), Part
          6 (inspection and testing), and the index. Use different colour tabs for different
          sections. Highlight key regulation numbers so they stand out on the page.
        </p>
      </>
    ),
  },
  {
    id: 'study-tips',
    heading: 'Study Tips That Actually Work',
    content: (
      <>
        <p>
          The 2382 is a navigation exam as much as a knowledge exam. You do not need to memorise
          every regulation — you need to find the right regulation quickly under time pressure.
          Here is what works:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Tab Your Book Before You Study</h4>
                <p className="text-white text-sm leading-relaxed">
                  Set up your tabs on day one — not the day before the exam. Use your tabbed book
                  throughout your study so you become familiar with finding information quickly.
                  Colour code: yellow for Part 4, blue for Part 5, green for Part 6, red for
                  Appendices.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Do Mock Exams Under Timed Conditions</h4>
                <p className="text-white text-sm leading-relaxed">
                  This is the single most important study technique. Set a timer for 2 hours and
                  complete a full 60-question mock. If you cannot finish in time, you need to work on
                  your navigation speed. Most training providers supply mock papers. Aim to complete
                  at least three full mock exams before the real thing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Learn the Appendix 4 Tables</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing questions using Appendix 4 appear in almost every exam paper. Practise
                  the method: determine the design current, select the protective device rating,
                  apply correction factors (Ca, Cg, Ci, Cf), calculate the tabulated current (It),
                  and read the table to find the minimum cable size. Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to check your manual calculations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Understand, Do Not Just Memorise</h4>
                <p className="text-white text-sm leading-relaxed">
                  The exam tests understanding of the regulations, not rote memorisation. If you
                  understand why a regulation exists (for example, why maximum disconnection times
                  differ between TN and TT systems), you can reason through questions even if you
                  cannot find the exact regulation quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-fail-areas',
    heading: 'Common Fail Areas',
    content: (
      <>
        <p>
          Training providers consistently report the same areas tripping up candidates. Focus your
          revision on these:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Appendix 4 cable sizing calculations</strong> — applying correction factors
                in the wrong order, using the wrong table for the installation method, or
                misreading the cable current ratings. Practise until the process is automatic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs) values</strong> — knowing where to find
                maximum Zs values in the tables, understanding the relationship between Zs and
                disconnection time, and calculating Zs from Ze and R1+R2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discrimination between protective devices</strong> — understanding when
                discrimination (selectivity) is required and how to verify it using time-current
                characteristics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special locations (Part 7)</strong> — bathrooms, swimming pools, construction
                sites, agricultural installations. These have specific additional requirements that
                override or supplement the general regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time management</strong> — spending too long on difficult questions and not
                having time for easier ones at the end. If a question is taking more than 3 minutes,
                mark it and move on. Come back to it if you have time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'preparation-timeline',
    heading: 'Preparation Timeline',
    content: (
      <>
        <p>
          Whether you are attending a classroom course or studying independently, here is a
          recommended preparation timeline:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6 to 8 weeks before:</strong> Buy BS 7671 and the On-Site Guide. Start
                tabbing and familiarising yourself with the layout. Read through Parts 1, 2, and 3
                to understand the scope and definitions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4 to 6 weeks before:</strong> Work through Parts 4, 5, and 6 in detail.
                Practise Appendix 4 cable sizing calculations. If attending a classroom course, this
                is when the course typically runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2 to 4 weeks before:</strong> Start doing mock exams under timed conditions.
                Review Part 7 (Special Locations). Refine your tabs based on which regulations you
                struggled to find during mocks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Final week:</strong> Do at least two more timed mock exams. Focus on your
                weakest areas. Make sure your tabs are secure and your highlighting is clear. Get a
                good night's sleep before the exam.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'on-the-day',
    heading: 'On the Day',
    content: (
      <>
        <p>
          Practical advice for exam day:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Arrive early. You need time to settle in, set up your books, and calm any nerves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Read every question carefully before looking at the answers. Misreading the question
                is a common cause of lost marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Answer the questions you know first. This builds confidence and banks marks early.
                Mark difficult questions and return to them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Never leave a question blank. There is no penalty for a wrong answer, so an educated
                guess gives you a 25% chance versus 0% for a blank.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Keep an eye on the clock. At the halfway point (60 minutes), you should have
                completed at least 30 questions. If not, pick up the pace.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-passing',
    heading: 'After Passing — What Next?',
    content: (
      <>
        <p>
          Congratulations — you have passed the 2382. Here is what typically comes next in your
          electrical career:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Apply for Your ECS Card</h4>
                <p className="text-white text-sm leading-relaxed">
                  The 2382 is one of the qualifications needed for an{' '}
                  <SEOInternalLink href="/guides/ecs-card-types-explained">
                    ECS card
                  </SEOInternalLink>
                  . Combined with your practical qualifications and the AM2, you can apply for a
                  full Installation Electrician card — your ticket to working on commercial and
                  industrial sites.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Take the 2391 (Inspection and Testing)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The C&G 2391 is the natural next step after the 2382. It builds on your knowledge
                  of BS 7671 and teaches you how to inspect and test electrical installations, and
                  how to complete EICs and EICRs. Many electricians take the 2382 and 2391 within
                  a few months of each other.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Join a Competent Person Scheme</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the 2382 and the right combination of practical qualifications, you can apply
                  to join{' '}
                  <SEOInternalLink href="/guides/competent-person-scheme-guide">
                    NICEIC, NAPIT, ELECSA, or STROMA
                  </SEOInternalLink>
                  . This allows you to self-certify your own electrical work under Part P of the
                  Building Regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Study smarter with Elec-Mate"
          description="Elec-Mate's training modules cover BS 7671 regulation by regulation, with interactive quizzes, flashcards, and AI-powered explanations. Build the knowledge you need for the 2382 and beyond."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2382ExamGuidePage() {
  return (
    <GuideTemplate
      title="City & Guilds 2382 Exam Guide | 18th Edition Exam Tips UK"
      description="Complete guide to the City & Guilds 2382 18th Edition exam. Exam format, open book rules, study tips, common fail areas, preparation timeline, and what to do after passing. Updated for BS 7671:2018+A3:2024."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          City & Guilds 2382 Exam Guide:{' '}
          <span className="text-yellow-400">How to Pass the 18th Edition</span>
        </>
      }
      heroSubtitle="Everything you need to know about the C&G 2382-22 exam — the 18th Edition Wiring Regulations qualification. Exam format, open book rules, proven study tips, common fail areas, and your next steps after passing."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the 2382 Exam"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the 2382 with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for exam preparation, cable sizing practice, and career development. 7-day free trial, cancel anytime."
    />
  );
}
