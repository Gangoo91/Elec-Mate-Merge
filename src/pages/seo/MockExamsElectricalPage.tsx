import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Target,
  Clock,
  Award,
  Lightbulb,
  FileCheck2,
  Wrench,
  BarChart,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'Mock Exams', href: '/guides/mock-exams-electrical' },
];

const tocItems = [
  { id: 'why-mock-exams', label: 'Why Mock Exams Matter' },
  { id: '18th-edition-mock', label: '18th Edition Mock Exams' },
  { id: '2391-mock', label: '2391 Mock Exams' },
  { id: 'am2-practice', label: 'AM2 Practice and Preparation' },
  { id: 'epa-prep', label: 'EPA Preparation' },
  { id: 'how-to-use', label: 'How to Use Mock Exams Effectively' },
  { id: 'exam-technique', label: 'Exam Technique Tips' },
  { id: 'elec-mate-study', label: 'Study With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Mock exams are the most effective way to prepare for electrical qualifications — they simulate exam conditions, identify weak areas, and build confidence before the real thing.',
  'The 18th Edition exam (C&G 2382) is open-book but time-pressured. Practising with mock exams teaches you where to find answers in BS 7671 quickly, which is the real skill.',
  'The 2391 inspection and testing exam combines written theory with practical assessment. Mock exams help with the written component; practical preparation needs hands-on time with test equipment.',
  'AM2 is a practical assessment — mock exams help with the underpinning knowledge, but you also need to practise the physical installation and testing tasks under timed conditions.',
  'Elec-Mate provides mock exams, flashcards, and structured revision for 18th Edition, 2391, AM2, and EPA — with progress tracking to show you exactly where to focus.',
];

const faqs = [
  {
    question: 'How many mock exams should I do before the real 18th Edition exam?',
    answer:
      'As a minimum, aim for at least 10 full mock exams before sitting the real C&G 2382 exam. This gives you enough practice to become comfortable with the question format, the time pressure, and — most importantly — navigating BS 7671 quickly. The first few mock exams will feel slow and difficult as you learn where to find answers in the regulations. By the time you have done 8 to 10, you should be consistently scoring 70% or above and completing the paper within the time limit. If you are scoring below 65% after 10 mock exams, you need to go back to the study material and revise the topics you are getting wrong before doing more mocks. Quality revision first, then test yourself.',
  },
  {
    question: 'Are free mock exams online reliable?',
    answer:
      'Some free online mock exams are good; many are not. The main problems with poor-quality free mocks are: questions that do not match the real exam format, outdated questions based on the 17th Edition or earlier amendments, incorrect answers, and a lack of explanations for why the correct answer is correct. The best mock exams are those written to mirror the actual City & Guilds question style, referencing specific BS 7671 regulation numbers, and providing detailed explanations. Elec-Mate mock exams are designed to match the real exam format, with answers linked to specific regulations and detailed explanations of the reasoning behind each answer.',
  },
  {
    question: 'Is the 18th Edition exam really open-book?',
    answer:
      'Yes, the C&G 2382 exam is open-book. You are allowed to take your copy of BS 7671 into the exam and refer to it during the test. However, this does not make the exam easy. The time pressure is significant — you have 2 hours for 60 multiple-choice questions, which is only 2 minutes per question. Many questions require you to look up specific regulation numbers, table values, or appendix data. If you cannot navigate BS 7671 quickly, you will run out of time. The exam tests your ability to use the regulations, not just memorise them. Mock exams are essential for developing this navigation skill.',
  },
  {
    question: 'What is the pass mark for the 2391 exam?',
    answer:
      'The C&G 2391 (Inspection and Testing of Electrical Installations) has two written exams and a practical assessment. The pass mark for each written exam is typically 60%, and the practical assessment is pass or fail. The written exams test your knowledge of inspection and testing procedures, the meaning and application of test results, observation code classification, and the completion of certification documents. The practical assessment tests your ability to carry out a periodic inspection and testing of a real installation, including dead testing and live testing, and produce a completed EICR. You must pass all components to achieve the qualification.',
  },
  {
    question: 'How do I prepare for the AM2 practical assessment?',
    answer:
      'The AM2 is a practical assessment that tests your ability to install, inspect, and test electrical installations to BS 7671 standards. It takes place at a JIB-approved assessment centre and typically lasts 1 to 2 days. To prepare, you need hands-on practice with: single-phase installation work (wiring consumer units, ring finals, radial circuits, lighting circuits), safe isolation procedures, dead testing (continuity, insulation resistance, polarity), live testing (earth fault loop impedance, RCD operation, prospective fault current), completing certification documents (EIC), and working to a wiring diagram and specification. Mock exams help with the theory questions that form part of the AM2, but the main preparation is practical. If your employer does not have a training rig, consider booking time at a training centre that offers AM2 practice facilities.',
  },
  {
    question: 'What topics are covered in the EPA for electrical apprentices?',
    answer:
      'The End-Point Assessment (EPA) for the Level 3 Installation Electrician / Maintenance Electrician apprenticeship standard covers all aspects of the apprenticeship. The assessment methods typically include: a multiple-choice knowledge test covering BS 7671, safe working practices, electrical science, and installation methods; a practical skills assessment where you install, test, and commission an electrical installation; a professional discussion with portfolio evidence covering your workplace experience; and in some cases a project or case study. The EPA is designed to confirm that you are occupationally competent — that you can work safely and effectively as a qualified electrician. Revision for the knowledge test should cover all the theory modules from your apprenticeship, with mock exams used to test your understanding.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/flashcards-for-electrical-exams',
    title: 'Flashcards for Electrical Exams',
    description:
      'Use active recall and spaced repetition to lock in key regulations, formulas, and procedures.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the IET Wiring Regulations — structure, key changes, and exam tips.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Structured 2391 preparation with courses, practice questions, and progress tracking.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Detailed guide to the AM2 practical assessment with task breakdowns and scoring criteria.',
    icon: Award,
    category: 'Training',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'End-Point Assessment preparation for Level 3 electrical apprentices.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about starting and completing an electrical apprenticeship.',
    icon: Users,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-mock-exams',
    heading: 'Why Mock Exams Are the Most Effective Study Tool',
    content: (
      <>
        <p>
          Research in educational psychology consistently shows that practice testing — answering
          questions under exam-like conditions — is the most effective method for retaining
          information and performing well in exams. This is called the "testing effect," and it
          outperforms passive study methods like re-reading notes or highlighting textbooks.
        </p>
        <p>For electrical exams specifically, mock exams serve several critical purposes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify weak areas.</strong> You cannot fix what you do not know is broken.
                Mock exams reveal exactly which topics you understand and which need more revision.
                If you consistently get earthing arrangement questions wrong, you know where to
                focus.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build exam technique.</strong> The 18th Edition exam is open-book, but you
                only have 2 minutes per question. Mock exams train you to navigate{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
                quickly and efficiently. This navigation skill is what separates passing from
                failing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduce exam anxiety.</strong> Familiarity breeds confidence. By the time you
                have done 10+ mock exams, the real thing feels like just another practice paper. You
                know the question format, the timing, and the common traps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strengthen memory.</strong> The act of recalling information during a test
                strengthens the neural pathways to that information. Every time you answer a
                question correctly, you make it more likely you will remember the answer in the real
                exam.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '18th-edition-mock',
    heading: '18th Edition Mock Exams (C&G 2382)',
    content: (
      <>
        <p>
          The City & Guilds 2382 exam tests your knowledge and understanding of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          — the IET Wiring Regulations, 18th Edition with Amendment 3. It is a 2-hour, 60-question
          multiple-choice exam. The pass mark is typically 60% (36 out of 60 correct answers).
        </p>
        <p>Key topics covered in mock exams should include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 1 and 2:</strong> Scope, object, and fundamental principles.
                Definitions (live part, exposed-conductive-part, extraneous-conductive-part).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 3:</strong> Assessment of general characteristics — supply
                characteristics, maximum demand, diversity, external influences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 4:</strong> Protection for safety — protection against electric shock,
                overcurrent, overvoltage,{' '}
                <SEOInternalLink href="/guides/earthing-arrangements-explained">
                  earthing arrangements
                </SEOInternalLink>
                , RCD selection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 5:</strong> Selection and erection of equipment — wiring systems, cable
                sizing (Appendix 4), isolation and switching, consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 6:</strong> Inspection and testing — initial verification, periodic
                inspection, certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 7:</strong> Special installations — bathrooms, swimming pools, solar
                PV, EV charging, temporary installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When doing mock exams for the 18th Edition, always time yourself. Two hours for 60
          questions is tight. Practise finding regulation numbers, table values, and appendix data
          quickly. Tab your copy of BS 7671 for fast access to the sections you use most often.
        </p>
        <SEOAppBridge
          title="18th Edition mock exams on your phone"
          description="Elec-Mate's study centre includes mock exams for the C&G 2382, with detailed explanations linked to specific BS 7671 regulation numbers. Track your scores, identify weak areas, and study anywhere."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: '2391-mock',
    heading: '2391 Mock Exams: Inspection and Testing',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            City & Guilds 2391
          </SEOInternalLink>{' '}
          (Initial Verification and Periodic Inspection and Testing) is a more advanced
          qualification that proves your competence to carry out inspection and testing work and
          produce certification documents. The exam has both written and practical components.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written exam topics:</strong> Testing sequence and procedures,
                interpretation of test results, observation code classification (C1, C2, C3, FI),
                completion of certification (EICR, EIC, Minor Works), fault diagnosis, and BS 7671
                Part 6 requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assessment:</strong> You will carry out a periodic inspection and
                testing on a real installation, including continuity of protective conductors,
                insulation resistance, polarity, earth fault loop impedance, RCD operation, and
                prospective fault current. You must then complete an EICR with schedule of test
                results.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Mock exams for the 2391 should test your ability to determine the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          for given scenarios, interpret test results (is a Zs reading of 1.2 ohms acceptable for a
          B32 MCB on a TN-S system?), identify the correct{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>,
          and complete certification documents accurately.
        </p>
      </>
    ),
  },
  {
    id: 'am2-practice',
    heading: 'AM2 Practice and Preparation',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/am2-exam-preparation">AM2</SEOInternalLink> is the
          practical assessment that sits at the end of an electrical apprenticeship. It is
          administered by the JIB (Joint Industry Board) and typically takes 1 to 2 days at an
          approved assessment centre.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation tasks:</strong> You will install a single-phase electrical
                distribution system from a wiring diagram. This typically includes: wiring a
                consumer unit with RCBOs/MCBs, ring final circuit, radial circuit, lighting circuits
                (one-way and two-way switching), and connections to fixed equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation:</strong> You must demonstrate the safe isolation procedure
                correctly — using a voltage indicator compliant with GS38, proving dead on all
                phases, locking off, and posting warning notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> After installation, you carry out the full initial
                verification testing sequence — continuity of protective conductors, ring final
                circuit continuity, insulation resistance, polarity, earth fault loop impedance, RCD
                testing, and prospective fault current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification:</strong> You must complete an Electrical Installation
                Certificate (EIC) with schedule of test results for the installation you have built.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Mock exams help with the theory component of the AM2 (underpinning knowledge questions),
          but the practical preparation requires hands-on practice. If possible, book time at a
          training centre with AM2 practice rigs. Practise under timed conditions — time management
          is one of the most common reasons for AM2 failure.
        </p>
      </>
    ),
  },
  {
    id: 'epa-prep',
    heading: 'EPA Preparation for Apprentices',
    content: (
      <>
        <p>
          The End-Point Assessment (
          <SEOInternalLink href="/guides/epa-preparation">EPA</SEOInternalLink>) is the final
          assessment for electrical apprentices under the apprenticeship standard. It confirms that
          you are occupationally competent — that you can work safely and effectively as a qualified
          electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knowledge test:</strong> Multiple-choice questions covering BS 7671, safe
                working practices, electrical science, installation methods, and fault diagnosis.
                Mock exams are directly relevant here.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical skills assessment:</strong> Installing, testing, and commissioning
                an electrical installation. Similar to the AM2 but assessed under the EPA framework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional discussion:</strong> A structured interview where you discuss
                your workplace experience, using your{' '}
                <SEOInternalLink href="/guides/apprentice-portfolio-guide">
                  apprentice portfolio
                </SEOInternalLink>{' '}
                as evidence. You need to demonstrate understanding, not just describe what you did.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For the knowledge test component, use mock exams that cover the full breadth of the
          apprenticeship syllabus. Do not just focus on BS 7671 — the EPA also tests electrical
          science (Ohm's law, power calculations, impedance), installation methods (cable selection,
          containment systems), and health and safety requirements.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-use',
    heading: 'How to Use Mock Exams Effectively',
    content: (
      <>
        <p>
          Not all mock exam practice is equal. The way you use them matters as much as the number
          you do. Here is a structured approach that maximises the benefit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study first, then test.</strong> Do not jump straight into mock exams
                without revising the material first. Study each topic area, then test yourself on
                it. Doing mock exams without preparation just demonstrates what you do not know — it
                does not teach you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simulate exam conditions.</strong> Time yourself. Do not look up answers
                mid-question (unless it is an open-book exam like the 18th Edition, in which case
                only use BS 7671). Remove distractions. Treat each mock as if it were the real
                thing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review every answer — especially the ones you got right.</strong> After
                completing a mock, review every question. For wrong answers, understand why the
                correct answer is correct. For right answers you guessed, study the topic to make
                sure you actually understand it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Track your scores.</strong> Keep a record of your mock exam scores over
                time. You should see an upward trend. If your scores plateau, it means you are
                hitting the same weak areas — go back and revise those specific topics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Space your practice.</strong> Do not cram 10 mock exams into 2 days before
                the real exam. Spread them out over several weeks, with study and revision between
                each one. This gives your brain time to consolidate the learning.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'exam-technique',
    heading: 'Exam Technique Tips',
    content: (
      <>
        <p>
          Knowing the material is essential — but good exam technique can make the difference
          between passing and failing, especially in time-pressured exams like the 18th Edition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read the question carefully.</strong> Many exam questions are designed to
                trip you up with careful wording. Words like "shall," "should," "may," and "is not
                required" have specific meanings in BS 7671. Read every question twice before
                answering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not spend too long on difficult questions.</strong> If a question is
                taking more than 3 minutes, mark it and move on. Answer the questions you know
                first, then come back to the difficult ones with any remaining time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eliminate wrong answers.</strong> In multiple-choice exams, you can often
                eliminate 1 or 2 obviously wrong answers. This improves your odds even if you are
                not 100% sure of the right answer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tab your BS 7671.</strong> For the 18th Edition exam, use sticky tabs to
                mark the sections you need most frequently: Part 4 (protection), Appendix 4 (cable
                sizing tables), Part 7 (special installations), and the index.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Answer every question.</strong> In multiple-choice exams, there is no
                penalty for guessing. Never leave a question blank — even a guess gives you a 25%
                chance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate-study',
    heading: 'Study With Elec-Mate: Mock Exams, Flashcards, and Progress Tracking',
    content: (
      <>
        <p>
          Elec-Mate's study centre is designed specifically for UK electricians preparing for
          professional qualifications. It combines mock exams with{' '}
          <SEOInternalLink href="/guides/flashcards-for-electrical-exams">
            flashcards
          </SEOInternalLink>
          , structured revision courses, and progress tracking to give you a complete study system.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Mock Exams with Explanations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Multiple mock exams for 18th Edition, 2391, AM2, and EPA. Each question includes a
                  detailed explanation linked to the specific BS 7671 regulation or technical
                  principle. You learn from every question, not just the ones you get wrong.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Progress Tracking</h4>
                <p className="text-white text-sm leading-relaxed">
                  Track your mock exam scores over time and see which topic areas you are strong and
                  weak in. The platform identifies your weak areas and suggests specific revision to
                  fill the gaps.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Structured Revision Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  50+ structured training courses that break down each topic area into manageable
                  modules. Study a topic, then test yourself with the related mock exam questions.
                  The combination of study and testing is proven to be the most effective learning
                  method.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start practising with mock exams today"
          description="Elec-Mate gives you mock exams, flashcards, and structured courses for 18th Edition, 2391, AM2, and EPA. Track your progress, identify weak areas, and study anywhere on your phone. 7-day free trial."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MockExamsElectricalPage() {
  return (
    <GuideTemplate
      title="Mock Exams for Electricians | Practice Tests Online"
      description="Mock exams for UK electricians. Practice tests for 18th Edition (C&G 2382), 2391 Inspection and Testing, AM2 practical assessment, and EPA. Exam technique tips, study strategies, and progress tracking."
      datePublished="2025-02-28"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Exam Preparation"
      badgeIcon={Brain}
      heroTitle={
        <>
          Mock Exams for Electricians:{' '}
          <span className="text-yellow-400">The Fastest Way to Pass</span>
        </>
      }
      heroSubtitle="Practice testing is the single most effective study method for electrical exams. This guide covers mock exams for 18th Edition, 2391, AM2, and EPA — with strategies for using them effectively, exam technique tips, and the tools to track your progress."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Mock Exams for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Practice Exams on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for mock exams, flashcards, and structured revision. Track your scores, identify weak areas, and pass first time. 7-day free trial, cancel anytime."
    />
  );
}
