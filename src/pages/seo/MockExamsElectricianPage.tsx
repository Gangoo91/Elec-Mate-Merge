import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Target,
  Lightbulb,
  BarChart3,
  FileCheck2,
  ListChecks,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Mock Exams for Electricians', href: '/guides/mock-exams-electrician' },
];

const tocItems = [
  { id: 'why-mock-exams', label: 'Why Mock Exams Matter' },
  { id: 'exam-types', label: 'Exam Types and Question Formats' },
  { id: 'eighteenth-edition-mocks', label: '18th Edition Mock Exams' },
  { id: '2391-mock-exams', label: '2391 Inspection and Testing Mocks' },
  { id: 'am2-preparation', label: 'AM2 Practical Assessment Preparation' },
  { id: 'time-management', label: 'Time Management Strategies' },
  { id: 'revision-strategies', label: 'Revision Strategies That Work' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Mock exams are the single most effective way to prepare for any electrician qualification — they expose weak areas, build exam technique, and simulate the time pressure you will face in the real exam.',
  'The C&G 2382 (18th Edition) exam is 60 multiple-choice questions in 2 hours — open book, 60% pass mark. Practising under timed conditions is essential because slow book navigation is the most common reason for failure.',
  'The C&G 2391 (Inspection and Testing) exam tests both theoretical knowledge and practical interpretation of test results, fault diagnosis, and EICR completion — mock exams help you practise the written components before the real thing.',
  'Elec-Mate generates unlimited, AI-powered mock exams tailored to your weak areas, with instant marking, detailed explanations for every answer, and progress tracking across all your attempts.',
  'Effective revision combines mock exams with targeted study — complete a mock, identify the topics you scored lowest on, study those topics, and then complete another mock to confirm improvement.',
];

const faqs = [
  {
    question: 'How many mock exams should I do before the real exam?',
    answer:
      'A minimum of five full-length mock exams is recommended, though most successful candidates complete between eight and twelve. The key is not simply doing the mocks but reviewing every wrong answer thoroughly. After each mock, spend time studying the topics where you lost marks. Then complete another mock to confirm you have improved in those areas. Elec-Mate tracks your performance across all attempts and highlights your weakest topics, so you know exactly where to focus your study time. Space your mocks across your revision period rather than cramming them all into the final week — one or two mocks per week over four to six weeks is more effective than five mocks in two days.',
  },
  {
    question: 'Are online mock exams as good as paper-based ones?',
    answer:
      'Online mock exams have significant advantages over paper-based ones. They provide instant marking, detailed explanations for every answer, and performance tracking over time. Elec-Mate mock exams also adapt to your performance — if you consistently get Chapter 41 questions wrong, the system generates more questions on that topic. However, for the C&G 2382 (18th Edition) exam specifically, you should also practise with your physical copy of BS 7671, because the real exam requires you to navigate the book under time pressure. The ideal approach is to use online mocks for learning and topic coverage, and then complete at least two or three timed mocks using your physical book and a paper answer sheet to simulate real exam conditions.',
  },
  {
    question: 'What topics come up most in electrician exams?',
    answer:
      'For the C&G 2382 (18th Edition), the most frequently examined topics are: Chapter 41 (Protection Against Electric Shock) including ADS, maximum disconnection times, and Zs values; Chapter 43 (Protection Against Overcurrent) including the Ib/In/Iz relationship; Chapter 52 (cable selection, voltage drop, grouping factors); Part 7 special locations (especially Section 701 Bathrooms, Section 704 Construction Sites, and Section 722 EV Charging); and the Appendices (current-carrying capacity tables, maximum Zs values). For the C&G 2391, the most common topics are the testing sequence, insulation resistance minimum values, RCD trip times, earth fault loop impedance calculations, and EICR observation codes.',
  },
  {
    question: 'How do I improve my speed in the exam?',
    answer:
      'Exam speed comes from two things: knowing the book layout and practising under timed conditions. For the C&G 2382, tab your copy of BS 7671 with colour-coded stickers for the key tables — Table 41.1 (disconnection times), Appendix 3 (current-carrying capacity), Appendix 4 (Zs values), Table 52.3 (voltage drop), and each Part 7 section. Practise finding specific regulations until you can locate any table in under 15 seconds. During the exam, answer every question you know immediately without looking anything up, then go back to the questions that require book lookups. This two-pass approach ensures you never lose easy marks by running out of time. Aim to complete the first pass in 45 minutes, leaving 75 minutes for the lookup questions.',
  },
  {
    question: 'What is the pass mark for electrician exams?',
    answer:
      'The C&G 2382 (18th Edition) exam requires 60% — that is 36 correct answers out of 60 multiple-choice questions. The C&G 2391 (Inspection and Testing) written exam also requires 60%. The AM2 practical assessment is marked on a pass/fail basis against specific criteria — there is no percentage score, but you must demonstrate competency in each assessed task. There is no negative marking in any of these exams, so you should never leave a question blank. If you cannot find the answer, eliminate the obviously wrong options and make your best guess from the remaining choices.',
  },
  {
    question: 'Can I use Elec-Mate mock exams on my phone?',
    answer:
      'Yes. Elec-Mate is designed as a mobile-first application, so all mock exams work perfectly on your phone. This means you can practise on the way to site, during breaks, or whenever you have a spare 15 minutes. The app saves your progress automatically, so you can start a mock on your phone and continue it later. Each question includes a detailed explanation, and your performance is tracked across all devices. Many electricians find that doing a few questions on their phone every day is more effective than sitting down for a long study session once a week — the regular repetition helps move knowledge into long-term memory.',
  },
];

const sections = [
  {
    id: 'why-mock-exams',
    heading: 'Why Mock Exams Are the Most Effective Revision Tool',
    content: (
      <>
        <p>
          Mock exams are not just a way to test yourself — they are the most effective revision
          strategy available. Research consistently shows that practice testing produces better
          long-term retention than re-reading notes, highlighting textbooks, or watching videos.
          This is called the "testing effect" — the act of retrieving information from memory
          strengthens the neural pathways that store it.
        </p>
        <p>
          For electrician qualifications specifically, mock exams serve three critical purposes.
          First, they reveal your weak areas — you might think you understand Chapter 41 until a
          mock question exposes a gap in your knowledge of maximum disconnection times for TT
          systems. Second, they build exam technique — learning how to manage time, navigate BS 7671
          quickly, and approach unfamiliar questions under pressure. Third, they reduce exam anxiety
          — by the time you sit the real exam, the format and time pressure feel familiar rather
          than stressful.
        </p>
        <p>
          The most common reason electricians fail their exams is not lack of knowledge — it is poor
          exam technique, particularly time management. Mock exams under timed conditions are the
          only way to develop the speed you need. If you are preparing for the{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            18th Edition exam
          </SEOInternalLink>{' '}
          or the{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            2391 inspection and testing qualification
          </SEOInternalLink>
          , make mock exams the cornerstone of your revision.
        </p>
        <SEOAppBridge
          title="Unlimited AI-powered mock exams"
          description="Elec-Mate generates unlimited mock exams tailored to your weak areas. Instant marking, detailed explanations, and progress tracking. Study smarter, not harder."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'exam-types',
    heading: 'Exam Types and Question Formats',
    content: (
      <>
        <p>
          Different electrician qualifications use different exam formats, and your mock exam
          practice should match the format of the real exam you are preparing for.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ClipboardCheck className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Multiple Choice (C&G 2382)</h3>
              <p className="text-white text-sm leading-relaxed">
                60 questions, 2 hours, open book. Four options per question — one correct, three
                distractors. The distractors are designed to catch common misconceptions, so read
                every option carefully before answering.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <FileCheck2 className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Written + Practical (C&G 2391)</h3>
              <p className="text-white text-sm leading-relaxed">
                Written exam covering design, fault diagnosis, and documentation. Practical
                assessment requiring you to carry out tests on a real installation. Mock exams help
                with the written component — practise interpreting test results and completing
                schedules of inspection.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ListChecks className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Practical Assessment (AM2)</h3>
              <p className="text-white text-sm leading-relaxed">
                Timed practical assessment covering installation, inspection, testing, and fault
                diagnosis. Mock practical scenarios help you practise the sequence and build
                confidence in your hands-on skills.
              </p>
            </div>
          </div>
        </div>
        <p>
          When choosing mock exams, ensure they match your target qualification exactly. A generic
          "electrical exam" mock is less useful than one designed specifically for the C&G 2382 or
          C&G 2391 syllabus.
        </p>
      </>
    ),
  },
  {
    id: 'eighteenth-edition-mocks',
    heading: '18th Edition Mock Exams: What to Expect',
    content: (
      <>
        <p>
          The C&G 2382 exam tests your knowledge of{' '}
          <SEOInternalLink href="/guides/bs-7671-run-through">BS 7671:2018+A3:2024</SEOInternalLink>{' '}
          — the regulations themselves, their application, and the principles behind them. Good mock
          exams should cover the full syllabus with appropriate weighting towards the high-frequency
          topics.
        </p>
        <p>
          <strong>Topic weighting.</strong> Based on analysis of past papers and exam centre
          feedback, the approximate weighting is: Part 1 and Part 2 (scope and definitions) — 10-15%
          of questions; Part 3 (general characteristics) — 5-10%; Part 4 (protection for safety) —
          30-35%; Part 5 (selection and erection) — 20-25%; Part 6 (inspection and testing) —
          10-15%; Part 7 (special installations) — 10-15%.
        </p>
        <p>
          <strong>Question styles.</strong> Expect three main question types: direct knowledge
          questions ("What is the maximum disconnection time for a 32A circuit in a TN system?"),
          application questions ("A 6mm2 cable is installed in a group of three circuits in an
          ambient temperature of 35 degrees Celsius — what is the corrected current-carrying
          capacity?"), and regulation lookup questions ("According to Regulation 411.3.3, what is
          the maximum Zs for a 32A Type B MCB in a TN system?"). Practise all three types.
        </p>
        <p>
          Elec-Mate mock exams for the{' '}
          <SEOInternalLink href="/training/eighteenth-edition-exam-tips">
            18th Edition
          </SEOInternalLink>{' '}
          are designed around the actual exam syllabus, with questions weighted to match the real
          exam. After each mock, the AI highlights your weakest topics and recommends specific
          regulations to review.
        </p>
      </>
    ),
  },
  {
    id: '2391-mock-exams',
    heading: '2391 Inspection and Testing Mock Exams',
    content: (
      <>
        <p>
          The C&G 2391 exam is more demanding than the 2382 because it requires both theoretical
          knowledge and practical application. The written exam tests your ability to interpret test
          results, diagnose faults from measurement data, design circuits, and complete
          certification documentation.
        </p>
        <p>
          <strong>Key topics for 2391 mocks.</strong> The testing sequence (continuity, insulation
          resistance, polarity, earth fault loop impedance, prospective fault current, RCD
          operation), minimum acceptable test values (insulation resistance of 1 megohm at 500V for
          most circuits, RCD trip times of 200ms at rated current and 40ms at five times rated
          current), interpretation of EICR observation codes (C1, C2, C3, FI), and{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR completion</SEOInternalLink>.
        </p>
        <p>
          <strong>Scenario-based questions.</strong> The 2391 exam often presents a scenario — a
          description of an installation with test results — and asks you to interpret the results,
          identify defects, determine observation codes, and recommend actions. Mock exams should
          include these scenario questions so you practise the analytical thinking required.
        </p>
        <p>
          When completing 2391 mock exams, pay attention to the language of your answers. The
          examiners are looking for precise technical language — use BS 7671 terminology, cite
          specific regulation numbers where relevant, and structure your answers clearly.
        </p>
      </>
    ),
  },
  {
    id: 'am2-preparation',
    heading: 'AM2 Practical Assessment Preparation',
    content: (
      <>
        <p>
          The AM2 is the practical assessment required for JIB ECS Gold Card (qualified electrician)
          status. It is a full-day assessment covering installation work, inspection and testing,
          and fault diagnosis. While you cannot practise the AM2 with a written mock exam, you can
          prepare for the knowledge components.
        </p>
        <p>
          <strong>What the AM2 covers.</strong> You will be assessed on: installing a consumer unit
          and circuits to a specification, carrying out initial verification (testing sequence),
          completing an{' '}
          <SEOInternalLink href="/guides/electrical-installation-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          , diagnosing and correcting faults, and demonstrating safe working practices throughout.
        </p>
        <p>
          <strong>How mock exams help.</strong> The knowledge tested in the AM2 overlaps
          significantly with the 2382 and 2391. If you score consistently above 80% on your 18th
          Edition and inspection and testing mock exams, you have a strong knowledge foundation for
          the AM2. Focus your remaining preparation on the practical skills — speed of installation,
          neatness of work, and the testing sequence.
        </p>
        <SEOAppBridge
          title="Track your AM2 readiness"
          description="Elec-Mate tracks your mock exam scores across the 18th Edition and inspection and testing topics that overlap with the AM2. See at a glance whether your knowledge is exam-ready."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'time-management',
    heading: 'Time Management Strategies for Electrician Exams',
    content: (
      <>
        <p>
          Time management is critical in every electrician exam. The C&G 2382 gives you 2 minutes
          per question on average — that sounds generous until you factor in the time needed to
          navigate BS 7671, read the question carefully, evaluate four options, and double-check
          your answer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            The Two-Pass Strategy
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First pass (45 minutes):</strong> Go through every question and answer the
                ones you know immediately without looking anything up. Mark questions you are unsure
                about but do not spend time on them yet. This should get you through 25-35
                questions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second pass (60 minutes):</strong> Go back to the marked questions and use
                your book to find the answers. Prioritise questions where you think you know roughly
                where to look — these are your quickest wins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Final check (15 minutes):</strong> Review any remaining blank questions.
                Make your best guess — there is no negative marking, so a guess is always better
                than blank.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Practise this strategy during every mock exam. Track your first-pass score separately —
          this tells you how much knowledge you have committed to memory versus how much you rely on
          the book. Aim to get at least 36 correct answers (the pass mark) on the first pass alone.
          That way, the second pass is about improving your score, not scrambling to pass.
        </p>
      </>
    ),
  },
  {
    id: 'revision-strategies',
    heading: 'Revision Strategies That Actually Work',
    content: (
      <>
        <p>
          Not all revision strategies are equally effective. Research into learning science
          consistently shows that active recall (testing yourself) and spaced repetition (reviewing
          material at increasing intervals) are far more effective than passive methods like
          re-reading notes or highlighting.
        </p>
        <p>
          <strong>The mock-study-mock cycle.</strong> The most effective revision strategy is:
          complete a mock exam, identify your weakest topics, study those topics intensively, and
          then complete another mock to check improvement. Repeat this cycle throughout your
          revision period. Each cycle targets your remaining weak areas, so your knowledge builds
          efficiently.
        </p>
        <p>
          <strong>Spaced repetition with flashcards.</strong> Elec-Mate flashcards use spaced
          repetition algorithms — questions you get wrong appear more frequently, while questions
          you know well appear less often. This is the most time-efficient way to memorise
          definitions, regulation numbers, and key values. Use flashcards for 10-15 minutes daily in
          the weeks before your exam.
        </p>
        <p>
          <strong>Teach it to someone else.</strong> If you can explain a concept to a colleague, an
          apprentice, or even out loud to yourself, you understand it. If you cannot explain it
          clearly, you need to study it further. Try explaining the difference between basic
          protection and fault protection, or why ADS disconnection times differ between TN and TT
          systems. The{' '}
          <SEOInternalLink href="/guides/bs-7671-run-through">
            BS 7671 run-through guide
          </SEOInternalLink>{' '}
          is a good companion resource for structured topic revision.
        </p>
        <p>
          <strong>Study groups.</strong> If you are studying with others — whether on a{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            training course
          </SEOInternalLink>{' '}
          or informally — test each other with mock questions. Explaining why an answer is wrong is
          just as valuable as explaining why the correct answer is right.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid in Electrician Exams',
    content: (
      <>
        <p>
          Understanding common mistakes helps you avoid them. These are the errors that exam centres
          report most frequently — every one of them is avoidable with proper preparation.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Lightbulb className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Running out of time</h3>
              <p className="text-white text-sm leading-relaxed">
                The number one reason for failure. Candidates spend too long on difficult questions
                early in the paper and rush or skip easier questions at the end. Use the two-pass
                strategy and practise under strict timed conditions.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Lightbulb className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Not reading the question properly
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Exam questions are precisely worded. Missing a key word like "minimum," "maximum,"
                "shall," or "should" can lead you to the wrong answer. Read every question twice
                before selecting your answer.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Lightbulb className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Leaving questions blank</h3>
              <p className="text-white text-sm leading-relaxed">
                There is no negative marking. A blank answer scores zero; a guess has at least a 25%
                chance of being correct. Never leave a question unanswered — eliminate wrong options
                and make your best guess.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Lightbulb className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Not tabbing the book</h3>
              <p className="text-white text-sm leading-relaxed">
                For the open-book 2382 exam, tab stickers on key tables and sections save enormous
                amounts of time. Tab Table 41.1, Appendix 3, Appendix 4, Table 52.3, and every Part
                7 section before the exam.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Lightbulb className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Relying on the book for everything
              </h3>
              <p className="text-white text-sm leading-relaxed">
                The exam is open book, but you cannot look up every answer — there is not enough
                time. You need to memorise the fundamentals (definitions, key principles, common
                values) and use the book only for specific regulation lookups.
              </p>
            </div>
          </div>
        </div>
        <p>
          Mock exams expose these mistakes in a low-stakes environment. If you run out of time in a
          mock, you learn the lesson without failing a real exam. Practise until you consistently
          finish with time to spare. Use the{' '}
          <SEOInternalLink href="/training/study-tips-electrician">
            Elec-Mate study tips guide
          </SEOInternalLink>{' '}
          for more detailed revision advice.
        </p>
      </>
    ),
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/training/eighteenth-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description:
      'Specific advice for the C&G 2382 exam — question analysis, time management, and what to revise.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/training/2391-exam-tips',
    title: '2391 Exam Tips',
    description: 'Preparation strategies for the C&G 2391 written and practical assessments.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/training/am2-preparation',
    title: 'AM2 Preparation Guide',
    description:
      'How to prepare for the AM2 practical assessment — installation, testing, and fault diagnosis.',
    icon: ListChecks,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-run-through',
    title: 'BS 7671 Run-Through',
    description:
      'Part-by-part study guide for BS 7671:2018+A3:2024. Key regulations and exam focus areas.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Structured study course for the C&G 2382 exam with interactive quizzes and AI tutor support.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/study-tips-electrician',
    title: 'Study Tips for Electricians',
    description:
      'Evidence-based revision strategies, memory techniques, and study planning advice for working electricians.',
    icon: Lightbulb,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MockExamsElectricianPage() {
  return (
    <GuideTemplate
      title="Mock Exams for Electricians | Practice Tests & Exam Preparation"
      description="Free mock exams for UK electricians — 18th Edition (C&G 2382), 2391 Inspection and Testing, and AM2 preparation. AI-powered practice questions with instant marking, detailed explanations, and progress tracking."
      datePublished="2025-08-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Exam Preparation"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Mock Exams for Electricians:{' '}
          <span className="text-yellow-400">Practice Tests That Work</span>
        </>
      }
      heroSubtitle="Prepare for the 18th Edition, 2391, and AM2 exams with unlimited AI-powered mock exams. Instant marking, detailed explanations for every answer, and intelligent progress tracking that targets your weak areas."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Mock Exams"
      relatedPages={relatedPages}
      ctaHeading="Start practising with unlimited mock exams today"
      ctaSubheading="Join 430+ UK electricians preparing for their exams with Elec-Mate. AI-powered mock exams that adapt to your weak areas, flashcards with spaced repetition, and structured study courses. 7-day free trial, cancel anytime."
    />
  );
}
