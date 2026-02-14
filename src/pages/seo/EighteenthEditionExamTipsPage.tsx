import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Brain,
  Clock,
  Target,
  Lightbulb,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  PenTool,
  Award,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: '18th Edition Exam Tips', href: '/guides/18th-edition-exam-tips' },
];

const tocItems = [
  { id: 'exam-format', label: 'Exam Format and Structure' },
  { id: 'key-regulation-areas', label: 'Key Regulation Areas' },
  { id: 'study-strategy', label: 'Study Strategy' },
  { id: 'common-questions', label: 'Common Question Types' },
  { id: 'time-management', label: 'Time Management' },
  { id: 'book-tabs', label: 'Book Tabs and Navigation' },
  { id: 'final-preparation', label: 'Final Preparation Checklist' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The C&G 2382 exam is open-book — knowing where to find regulations quickly is more important than memorising every number.',
  'Part 4 (Protection for Safety) and Part 5 (Selection and Erection of Equipment) make up the bulk of exam questions — prioritise these.',
  'Tab your BS 7671 book methodically: colour-coded tabs for each Part, with sub-tabs for heavily examined regulations and appendix tables.',
  'Practise with timed mock exams to build speed — many candidates know the material but run out of time.',
  'Elec-Mate offers 46+ training courses, flashcards, and timed mock exams that mirror the real C&G 2382 format.',
];

const faqs = [
  {
    question: 'How many questions are on the C&G 2382 exam?',
    answer:
      'The City & Guilds 2382-22 exam consists of 60 multiple-choice questions to be answered in 2 hours. The pass mark is 60%, meaning you need to answer at least 36 questions correctly. The questions cover the full scope of BS 7671:2018+A2:2022, including the IET Wiring Regulations, the On-Site Guide, and Guidance Note 3. Some questions are straightforward recall of regulation numbers, while others require you to interpret tables, calculate values, or apply regulations to scenarios. The exam is open-book, so you can bring your copy of BS 7671 into the exam room. However, you cannot bring in the On-Site Guide, Guidance Notes, or any other supplementary material — only the main BS 7671 book (the "brown book"). Your book can have tabs but no handwritten notes on the pages.',
  },
  {
    question: 'Can I use tabs in my BS 7671 book during the exam?',
    answer:
      'Yes, you are allowed to tab your BS 7671 book for the C&G 2382 exam. This is one of the most important preparation steps you can take. Most exam centres allow adhesive tabs (the small plastic or paper index tabs you can buy from stationers). You should not write on the tabs beyond a brief label such as a regulation number or Part number. You should not write notes on the pages of the book itself. Some centres may check your book before the exam to ensure no notes have been added. The key is to tab strategically: mark the start of each Part, the most commonly examined regulations (such as 411.3.3, 433.1.1, 514.12.1), and the appendix tables you will need to look up during the exam (such as Table 41.2, Table 41.3, and the Ze tables in Appendix 3).',
  },
  {
    question: 'What are the hardest topics on the 18th Edition exam?',
    answer:
      'Most candidates find the following areas most challenging: (1) Disconnection times and the relationship between Zs, In, and protective device characteristics — particularly the tables in Chapter 41 and how they interact with Appendix 3 tables. (2) Cable selection and current-carrying capacity from Appendix 4, including the application of correction factors for grouping, ambient temperature, and thermal insulation. (3) Special locations in Part 7 — particularly bathrooms (Section 701), swimming pools (Section 702), and construction sites (Section 704), where additional requirements modify the general rules. (4) The definitions in Part 2 — the exam often tests whether you understand the precise meaning of terms like "skilled person (electrically)," "arm\'s reach," and "extraneous-conductive-part." (5) Appendix 3 tables for maximum earth fault loop impedance — knowing which table to use for which device type.',
  },
  {
    question: 'How long should I study for the 18th Edition exam?',
    answer:
      "Most training providers recommend a minimum of 3 to 5 days of intensive classroom study, plus additional self-study time. If you are studying independently (distance learning), allow 4 to 8 weeks of regular study, covering a few chapters per week. The total study time depends on your existing knowledge. If you already hold the 17th Edition qualification and have practical experience, you may find 2 to 3 weeks of focused study sufficient. If this is your first time studying the Wiring Regulations, allow at least 6 to 8 weeks. The key is consistent, active study — not just reading but practising with mock questions, testing yourself with flashcards, and timing your regulation lookups. Elec-Mate's study planner can help you structure your revision schedule with daily targets and progress tracking.",
  },
  {
    question: 'Is the 18th Edition exam difficult?',
    answer:
      'The 18th Edition exam has a pass rate of roughly 65 to 75%, depending on the centre and cohort. It is not the hardest exam in the electrical trade (the 2391 inspection and testing exam is generally considered more challenging), but it does require thorough preparation. The main difficulty is not the complexity of individual questions but the breadth of the syllabus — BS 7671 covers a vast range of topics, and any regulation could come up. The open-book format helps, but only if you can navigate the book quickly. Candidates who fail typically either did not study the full scope of the book (focusing too heavily on one Part) or could not find regulations fast enough during the exam. Timed mock exams are essential preparation — they build both knowledge and speed.',
  },
  {
    question: 'What happens if I fail the C&G 2382 exam?',
    answer:
      'If you fail the C&G 2382 exam, you can retake it. Most training providers and exam centres allow you to book a resit, typically after a short waiting period (often 2 to 4 weeks). You will need to pay the resit fee, which varies by centre but is usually between £80 and £150. There is no limit on the number of attempts. When preparing for a resit, focus on the areas where you scored poorly — your results sheet will indicate which sections of the syllabus you struggled with. Use this information to target your revision. Many candidates find that switching study methods for the resit helps: if you studied alone the first time, consider a classroom course, or vice versa. Practising with different sets of mock questions is also valuable, as the real exam draws from a large question bank.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-run-through',
    title: 'BS 7671 Run Through',
    description:
      'Part-by-part breakdown of the Wiring Regulations with exam-relevant sections highlighted.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/2391-exam-tips',
    title: '2391 Exam Tips',
    description: 'Preparation guide for the City & Guilds 2391 Inspection and Testing exam.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-study-tips',
    title: 'Study Tips for Electricians',
    description: 'Active recall, spaced repetition, and flashcard techniques for electrical exams.',
    icon: Brain,
    category: 'Guide',
  },
  {
    href: '/guides/nvq-level-3-electrical',
    title: 'NVQ Level 3 Electrical',
    description: 'What is involved in the NVQ Level 3 and how to build your portfolio of evidence.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/ecs-card-types',
    title: 'ECS Card Types',
    description: 'Which ECS card you need at each stage of your career and how to apply.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study the 18th Edition on Elec-Mate with structured modules, flashcards, and mock exams.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'exam-format',
    heading: 'C&G 2382 Exam Format and Structure',
    content: (
      <>
        <p>
          The City & Guilds 2382-22 is the current 18th Edition IET Wiring Regulations exam. It
          assesses your knowledge of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          — the standard that governs electrical installation work across the UK. Passing this exam
          is a requirement for most electrical qualifications and is essential for anyone working in
          the industry.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>60 multiple-choice questions</strong> covering all Parts of BS 7671,
                including the Appendices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2 hours (120 minutes)</strong> to complete the exam. That works out at 2
                minutes per question — tight if you need to look up regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass mark: 60%</strong> — you need at least 36 correct answers out of 60.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-book exam</strong> — you can bring your copy of BS 7671 with tabs (no
                handwritten notes). You cannot bring in the On-Site Guide or Guidance Notes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The exam is typically taken at a City & Guilds approved centre. Some providers offer the
          exam as part of a classroom course (usually 3 to 5 days), while others offer it as a
          standalone assessment for distance learners. Either way, the exam itself is the same.
        </p>
      </>
    ),
  },
  {
    id: 'key-regulation-areas',
    heading: 'Key Regulation Areas That Come Up Most Often',
    content: (
      <>
        <p>
          While the exam can draw from any part of BS 7671, certain areas appear far more frequently
          than others. Prioritise your study time on these sections:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 4: Protection for Safety</h4>
                <p className="text-white text-sm leading-relaxed">
                  Chapter 41 (protection against electric shock) is the most heavily examined area.
                  Know the disconnection times in Table 41.1, the maximum Zs values in Tables 41.2
                  to 41.4, and the requirements for RCD protection under Regulation 411.3.3. Chapter
                  43 (overcurrent protection) and Chapter 44 (overvoltage protection) also feature
                  regularly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Part 5: Selection and Erection of Equipment
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Chapter 52 (wiring systems) covers cable selection, installation methods, and the
                  correction factors from Appendix 4. Chapter 53 (switching and control) and Chapter
                  54 (earthing and protective conductors) are also frequently tested.{' '}
                  <SEOInternalLink href="/guides/earthing-arrangements-explained">
                    Earthing arrangements
                  </SEOInternalLink>{' '}
                  (TN-S, TN-C-S, TT) are essential knowledge.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 7: Special Locations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Sections 701 (bathrooms), 702 (swimming pools), 704 (construction sites), and 711
                  (exhibitions) are commonly tested. Know the zone requirements for bathrooms, the
                  additional RCD requirements, and the IP ratings needed for each zone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 2: Definitions</h4>
                <p className="text-white text-sm leading-relaxed">
                  Do not skip the definitions. The exam regularly tests whether you understand terms
                  like "skilled person (electrically)," "basic protection," "fault protection,"
                  "extraneous-conductive-part," and "simultaneously accessible." A question might
                  hinge on knowing the exact definition.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Part 1 (Scope, object and fundamental principles), Part 3 (Assessment of general
          characteristics), and Part 6 (Inspection and testing) are also examined but typically
          carry fewer questions. Still, do not ignore them entirely — a few easy marks from these
          sections could make the difference between pass and fail.
        </p>
      </>
    ),
  },
  {
    id: 'study-strategy',
    heading: 'Building an Effective Study Strategy',
    content: (
      <>
        <p>
          The 18th Edition exam rewards structured, active study. Reading the book cover to cover is
          not efficient — BS 7671 has over 500 pages and much of it reads like a legal document. A
          better approach is to study strategically, focusing on understanding and recall.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use active recall.</strong> After reading a section, close the book and
                write down what you remember. Then check. This is far more effective than
                re-reading. Elec-Mate's{' '}
                <SEOInternalLink href="/guides/electrician-study-tips">
                  flashcards tool
                </SEOInternalLink>{' '}
                is designed for exactly this — rapid-fire questions that test your recall of key
                regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apply spaced repetition.</strong> Review material at increasing intervals —
                1 day, 3 days, 7 days, 14 days. This moves information into long-term memory.
                Elec-Mate's study planner automatically schedules your revision sessions based on
                this principle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise with mock exams.</strong> Take full 60-question, 2-hour mock exams
                under timed conditions. This builds both knowledge and exam technique. Elec-Mate
                offers timed mock exams that mirror the real C&G 2382 format, with detailed
                explanations for every answer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study the tables and appendices.</strong> Many exam questions require you to
                look up values from tables — particularly Appendix 3 (maximum earth fault loop
                impedance) and Appendix 4 (current-carrying capacity and voltage drop). Practise
                finding values quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Learn the numbering system.</strong> BS 7671 uses a logical numbering
                system: Part → Chapter → Section → Regulation. Once you understand it, navigating
                the book becomes much faster. For example, 411.3.3 is Part 4, Chapter 41, Section
                411, Regulation 411.3.3.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Study smarter with the Elec-Mate study planner"
          description="Elec-Mate's AI-powered study planner builds a personalised revision schedule for the 18th Edition exam. It tracks your progress across 46+ training courses, flashcards, and mock exams — and tells you exactly what to revise each day."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'common-questions',
    heading: 'Common Question Types You Will See',
    content: (
      <>
        <p>
          Understanding the types of questions that appear on the C&G 2382 exam helps you prepare
          more effectively. Here are the main categories:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation recall:</strong> "According to Regulation 411.3.3, additional
                protection by an RCD with a rated residual operating current not exceeding ___mA
                shall be provided for..." These questions test whether you can find and interpret
                specific regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Table lookups:</strong> "Using Table 41.3, what is the maximum earth fault
                loop impedance for a 32A Type B MCB in a TN system with a 0.4s disconnection time?"
                You need to find the right table, the right row, and read the correct value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scenario-based:</strong> "An electrician is installing a new circuit in a
                bathroom. The socket outlet is located 2.5 metres from the edge of the bath. Which
                zone does this fall within, and what protection is required?" These require you to
                apply multiple regulations together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Definition-based:</strong> "Which of the following is the correct definition
                of an extraneous-conductive-part?" Taken directly from Part 2 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculation-based:</strong> "A circuit is protected by a 20A Type B MCB. The
                design current is 16A. Using Appendix 4, Table 4D5A, what is the minimum cable size
                for installation method C?" You need to apply correction factors and read the
                tables.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best preparation is to practise all question types. Elec-Mate's mock exams include a
          mix of all these formats, with each question linked to the relevant BS 7671 regulation so
          you can review the source material after answering.
        </p>
      </>
    ),
  },
  {
    id: 'time-management',
    heading: 'Time Management in the Exam',
    content: (
      <>
        <p>
          With 60 questions in 120 minutes, you have exactly 2 minutes per question. That sounds
          manageable, but in practice, time pressure is one of the main reasons candidates fail.
          Some questions can be answered in 30 seconds; others require looking up multiple tables
          and applying several steps, which can take 4 to 5 minutes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First pass: answer what you know.</strong> Go through all 60 questions and
                answer every question you can answer immediately — from memory or a quick lookup.
                Mark any questions you are unsure about and move on. This ensures you collect all
                the "easy" marks first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second pass: tackle the harder questions.</strong> Return to the marked
                questions. Now you have the remaining time to look up regulations, cross-reference
                tables, and work through calculations. Prioritise questions where you have a
                reasonable idea of where to find the answer in the book.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never leave a question blank.</strong> There is no negative marking. If you
                have 30 seconds left and three unanswered questions, make your best guess on each
                one. A 25% chance of a correct guess is better than a guaranteed zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time your mock exams.</strong> Practise under real time pressure. If you
                consistently finish mock exams with time to spare, you are in good shape. If you are
                running over, focus on speeding up your book navigation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The candidates who manage time best are those who have practised looking up regulations so
          often that they can find any regulation within 10 to 15 seconds. This is where book tabs
          and familiarity with the numbering system pay off.
        </p>
      </>
    ),
  },
  {
    id: 'book-tabs',
    heading: 'How to Tab Your BS 7671 Book for the Exam',
    content: (
      <>
        <p>
          Tabbing your BS 7671 book is one of the most effective exam preparation activities. A
          well-tabbed book can save 30 to 60 seconds per lookup, which over 60 questions could save
          you 20 to 30 minutes. Here is a systematic approach:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour-code by Part.</strong> Use a different colour tab for each Part of BS
                7671. For example: Part 1 = red, Part 2 = orange, Part 3 = yellow, Part 4 = green,
                Part 5 = blue, Part 6 = purple, Part 7 = pink. Place these on the first page of each
                Part.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-tab high-frequency regulations.</strong> Within Part 4, tab Regulation
                411.3.3 (30mA RCD requirement), Table 41.1 (disconnection times), Tables 41.2–41.4
                (maximum Zs values), and Regulation 433.1.1 (overload protection). These come up in
                almost every exam sitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tab every Appendix.</strong> Appendix 3 (maximum earth fault loop impedance
                tables) and Appendix 4 (current-carrying capacity tables) need their own prominent
                tabs. You will use these multiple times during the exam.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tab Part 7 special locations.</strong> Mark Section 701 (bathrooms), 702
                (swimming pools), 704 (construction sites), and 711 (exhibitions) individually.
                These sections are self-contained and easy to find with a dedicated tab.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tab Regulation 514.12.1.</strong> This one covers warning and information
                notices — it appears on almost every exam paper and is easy to overlook if you have
                not tabbed it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Practise using your tabbed book during mock exams. You will quickly discover if any tabs
          are in the wrong place or if you need additional tabs for regulations you keep searching
          for. The goal is to be able to open your book to any major regulation or table in under 15
          seconds.
        </p>
      </>
    ),
  },
  {
    id: 'final-preparation',
    heading: 'Final Preparation Checklist',
    content: (
      <>
        <p>
          In the final week before your exam, use this checklist to make sure you are fully
          prepared:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Complete at least 3 full timed mock exams (60 questions, 2 hours each). Score 70%+
                consistently before sitting the real exam.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Review all questions you got wrong on mock exams. Find the regulation for each
                correct answer and tab it if you have not already.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Run through your flashcards one final time, focusing on the cards you keep getting
                wrong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Check your BS 7671 book: all tabs in place, no notes written on pages, book is the
                current edition (2018+A2:2022).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Confirm your exam date, time, and venue. Arrive 15 minutes early. Bring photo ID and
                your BS 7671 book. No other materials allowed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Get a good night's sleep. The exam tests focus and speed as much as knowledge —
                being well-rested makes a measurable difference.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Take a timed mock exam on Elec-Mate"
          description="Elec-Mate's 18th Edition mock exams mirror the real C&G 2382 format — 60 questions, 2-hour timer, instant marking, and detailed explanations for every answer. See exactly where you stand before exam day."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EighteenthEditionExamTipsPage() {
  return (
    <GuideTemplate
      title="18th Edition Exam Tips | How to Pass C&G 2382"
      description="How to pass the C&G 2382 18th Edition exam. Covers exam format, key BS 7671 regulation areas, study strategy, book tabs, time management, and common question types. Open-book tips and mock exam advice."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Exam Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          18th Edition Exam Tips: <span className="text-yellow-400">How to Pass C&G 2382</span>
        </>
      }
      heroSubtitle="The C&G 2382 exam is 60 multiple-choice questions in 2 hours, open-book, with a 60% pass mark. This guide covers the exam format, the regulation areas that come up most, how to tab your BS 7671 book, time management strategies, and the study techniques that actually work."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the 18th Edition Exam"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the 18th Edition with Elec-Mate"
      ctaSubheading="46+ training courses, flashcards, timed mock exams, AI tutor, and a study planner that tells you exactly what to revise each day. 7-day free trial, cancel anytime."
    />
  );
}
