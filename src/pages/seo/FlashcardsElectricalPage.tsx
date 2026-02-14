import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Brain,
  GraduationCap,
  Repeat,
  Lightbulb,
  Target,
  Award,
  FileCheck2,
  Clock,
  CheckCircle,
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'Flashcards', href: '/guides/flashcards-for-electrical-exams' },
];

const tocItems = [
  { id: 'why-flashcards', label: 'Why Flashcards Work' },
  { id: 'active-recall', label: 'Active Recall Method' },
  { id: 'spaced-repetition', label: 'Spaced Repetition' },
  { id: 'key-topics', label: 'Key Topics to Cover' },
  { id: 'making-flashcards', label: 'Making Effective Flashcards' },
  { id: 'study-schedule', label: 'Study Schedule' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'digital-flashcards', label: 'Digital Flashcards on Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Flashcards leverage active recall — the most scientifically proven method for long-term memory retention. Actively retrieving information strengthens memory far more than passively re-reading notes.',
  'Spaced repetition (reviewing cards at increasing intervals) means you spend more time on difficult topics and less time on what you already know, making study time more efficient.',
  'For electrical exams, flashcards are ideal for regulation numbers, definitions, maximum values (Zs, insulation resistance), colour codes, testing sequences, and observation code classifications.',
  'The best flashcards have a single, specific question on one side and a concise answer on the other. Avoid putting too much information on one card.',
  'Elec-Mate includes digital flashcard decks for 18th Edition, 2391, AM2, and EPA, with spaced repetition built in to optimise your revision schedule.',
];

const faqs = [
  {
    question: 'How do flashcards compare to reading textbooks for exam revision?',
    answer:
      'Research consistently shows that active recall (which flashcards use) is significantly more effective than passive study methods like re-reading textbooks or highlighting notes. A 2013 meta-analysis by Dunlosky et al. rated practice testing as a "high utility" study technique and re-reading as "low utility." The reason is that actively retrieving information from memory strengthens the neural pathways to that information, making it easier to recall in the future — including in an exam. Textbooks are essential for learning material for the first time, but for revision and retention, flashcards are more effective per hour of study time.',
  },
  {
    question: 'How many flashcards should I make for the 18th Edition exam?',
    answer:
      'A good 18th Edition flashcard deck typically contains 200 to 400 cards. This covers the key regulations, definitions, maximum values, table references, and procedural knowledge you need. You do not need a flashcard for every regulation in BS 7671 — focus on the ones most likely to appear in the exam: Part 4 (protection against electric shock and overcurrent), Appendix 4 (cable sizing), Part 6 (inspection and testing), Part 7 (special installations), and key definitions from Part 2. If you are using Elec-Mate, the pre-built flashcard decks have been curated by qualified electricians to cover the most exam-relevant content.',
  },
  {
    question: 'What is spaced repetition and how does it work?',
    answer:
      'Spaced repetition is a learning technique where you review material at increasing intervals based on how well you know it. If you get a flashcard right, you see it again in 3 days instead of tomorrow. If you get it right again, you see it in a week, then two weeks, then a month. If you get it wrong, it goes back to the beginning of the cycle. This approach is based on the "forgetting curve" — the natural rate at which memory fades over time. By reviewing information just before you would forget it, you strengthen the memory with minimal effort. The result is that you spend most of your study time on the cards you find difficult, and very little time on the ones you already know well.',
  },
  {
    question: 'Should I make my own flashcards or use pre-made ones?',
    answer:
      'Both approaches have value, and the best strategy combines them. Making your own flashcards is itself a learning activity — the process of deciding what to put on the card, formulating the question, and writing the answer reinforces your understanding. However, making hundreds of flashcards from scratch takes time, and there is a risk of missing important topics or including inaccurate information. Pre-made flashcards from a trusted source (like Elec-Mate, which are written by qualified electricians) ensure comprehensive coverage and accuracy. The ideal approach is to start with a pre-made deck and add your own cards for topics you find particularly challenging or for information specific to your training provider.',
  },
  {
    question: 'Can flashcards help with the practical parts of exams like AM2?',
    answer:
      'Flashcards are primarily a tool for knowledge retention — they excel at helping you remember facts, procedures, and values. For practical assessments like the AM2, flashcards can help with the underpinning knowledge: testing sequences, acceptable values, safe isolation steps, certification requirements, and BS 7671 regulation numbers. However, flashcards cannot replace hands-on practice with actual wiring, test equipment, and tools. The AM2 requires you to physically install circuits, carry out testing, and complete paperwork under timed conditions. Use flashcards for the theory, and use training rigs and workshops for the practical. Both are needed.',
  },
  {
    question: 'How long before the exam should I start using flashcards?',
    answer:
      'Start using flashcards at least 4 to 6 weeks before your exam. Spaced repetition needs time to work — the whole point is that intervals between reviews get longer, which means you need several weeks for the spacing to have effect. If you start flashcards the week before the exam, you are essentially cramming, which defeats the purpose. The ideal approach is to start making or studying flashcards as you cover each topic in your course, so by the time the exam approaches, you have already been reviewing the earlier topics for weeks. In the final week before the exam, your flashcard sessions should be focusing mainly on the difficult cards — the ones you keep getting wrong — while the easy ones barely need reviewing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/mock-exams-electrical',
    title: 'Mock Exams for Electricians',
    description:
      'Practice tests for 18th Edition, 2391, AM2, and EPA with detailed answer explanations.',
    icon: Brain,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the IET Wiring Regulations — structure, key sections, and exam tips.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Structured 2391 preparation with courses, quizzes, and progress tracking.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description: 'Detailed guide to the AM2 practical assessment with task breakdowns.',
    icon: Award,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Everything about starting and completing an electrical apprenticeship in the UK.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'End-Point Assessment preparation for Level 3 electrical apprentices.',
    icon: Target,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-flashcards',
    heading: 'Why Flashcards Are the Best Revision Tool for Electricians',
    content: (
      <>
        <p>
          Electrical exams require you to remember a huge amount of specific information: regulation
          numbers, maximum Zs values, minimum insulation resistance readings, definitions,
          procedures, colour codes, and observation code classifications. This is factual knowledge
          that either you know or you do not — and flashcards are the most efficient way to learn
          and retain it.
        </p>
        <p>
          The science behind flashcards is well established. Cognitive psychology research
          consistently shows that two techniques — active recall and spaced repetition — are the
          most effective methods for moving information from short-term to long-term memory. Every
          time you look at a flashcard question and try to recall the answer before flipping the
          card, you are using active recall. Every time you review the card again at the right
          interval, you are using spaced repetition.
        </p>
        <p>
          For electricians studying for the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition (C&G 2382)
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            2391 (Inspection and Testing)
          </SEOInternalLink>
          , the <SEOInternalLink href="/guides/am2-exam-preparation">AM2</SEOInternalLink>, or the{' '}
          <SEOInternalLink href="/guides/epa-preparation">EPA</SEOInternalLink>, flashcards
          transform revision from a passive, frustrating process into an active, efficient one.
        </p>
      </>
    ),
  },
  {
    id: 'active-recall',
    heading: 'Active Recall: The Science Behind Effective Learning',
    content: (
      <>
        <p>
          Active recall is the process of actively stimulating your memory during learning. Instead
          of passively re-reading information, you force your brain to retrieve it from memory. This
          retrieval process strengthens the neural pathways to that information, making future
          recall easier and faster.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works with flashcards:</strong> You see the question side of the
                card. Before flipping, you try to recall the answer. This act of retrieval — even if
                you get it wrong — strengthens the memory. When you flip the card and see the
                answer, it reinforces the correct information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it beats re-reading:</strong> Re-reading creates an illusion of
                knowledge — the information feels familiar because you have just seen it, but that
                familiarity does not mean you can recall it under exam pressure. Active recall tests
                whether you actually know it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The "desirable difficulty" effect:</strong> The effort of trying to recall
                information is what makes the learning stick. If recall feels easy, you are probably
                not learning much. If it feels hard but you eventually get the answer, you are
                strengthening the memory significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electrical exams, active recall is exactly the skill you need. In the exam, you will
          be asked "What is the maximum Zs for a B32 MCB on a TN-S system?" and you need to recall
          the answer from memory (or find it quickly in BS 7671). Flashcards practise exactly that
          skill.
        </p>
      </>
    ),
  },
  {
    id: 'spaced-repetition',
    heading: 'Spaced Repetition: Study Less, Remember More',
    content: (
      <>
        <p>
          Spaced repetition is an evidence-based learning technique that schedules review sessions
          at increasing intervals. Instead of reviewing all your flashcards every day, you review
          each card based on how well you know it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Repeat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New card:</strong> Review tomorrow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Repeat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Got it right once:</strong> Review in 3 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Repeat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Got it right twice:</strong> Review in 1 week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Repeat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Got it right three times:</strong> Review in 2 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Repeat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Got it wrong at any point:</strong> Reset to tomorrow.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This system means you spend most of your study time on the cards you find difficult — the
          topics you keep getting wrong. Cards you know well get pushed further into the future and
          barely take any time. The result is more efficient study: you learn more in less time.
        </p>
        <p>
          Digital flashcard systems (like those in Elec-Mate) handle the spacing algorithm
          automatically. You just do your daily review session, and the system decides which cards
          to show you based on your performance history.
        </p>
      </>
    ),
  },
  {
    id: 'key-topics',
    heading: 'Key Topics to Cover With Flashcards',
    content: (
      <>
        <p>
          Not every piece of electrical knowledge lends itself to flashcards. Flashcards work best
          for discrete facts, definitions, values, and short procedural steps. Here are the key
          topic areas where flashcards are most useful for electrical exams.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 definitions (Part 2):</strong> "What is an exposed-conductive-part?"
                "Define basic protection." "What is the difference between functional earthing and
                protective earthing?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum Zs values:</strong> "What is the maximum Zs for a B32 MCB in a TN-S
                system (0.4s)?" Learn the key values from Table 41.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum insulation resistance values:</strong> "What minimum insulation
                resistance is acceptable for a 230V circuit?" "For SELV/PELV circuits?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    Observation codes:
                  </SEOInternalLink>
                </strong>{' '}
                "What does C1 mean?" "Give an example of a C2 defect." "When would you use FI?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/testing-sequence-guide">
                    Testing sequence:
                  </SEOInternalLink>
                </strong>{' '}
                "What is the correct order of dead tests?" "Which test comes first: continuity of
                protective conductors or insulation resistance?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/earthing-arrangements-explained">
                    Earthing arrangements:
                  </SEOInternalLink>
                </strong>{' '}
                "What are the characteristics of a TN-C-S system?" "What earthing arrangement uses
                an earth electrode?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable colour codes:</strong> "What colour is the neutral in a three-phase
                system?" "What is the harmonised colour for L2?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation numbers:</strong> "Which regulation covers additional protection
                by RCD?" "What does Regulation 411.3.3 require?"
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Pre-built flashcard decks for every electrical exam"
          description="Elec-Mate includes curated flashcard decks for 18th Edition, 2391, AM2, and EPA — written by qualified electricians and covering the topics most likely to appear in your exam. Spaced repetition built in."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'making-flashcards',
    heading: 'How to Make Effective Flashcards',
    content: (
      <>
        <p>
          Not all flashcards are equal. A poorly made flashcard can waste your time or even teach
          you the wrong thing. Here are the principles for making flashcards that actually work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One fact per card.</strong> Each flashcard should test one specific piece of
                knowledge. "What is the maximum Zs for a B32 MCB on a TN-S system at 0.4s?" is a
                good card. "Explain everything about overcurrent protection" is not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be specific.</strong> Vague questions lead to vague answers. "What is
                Regulation 411.3.3?" is better than "What does Part 4 cover?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep answers concise.</strong> The answer side should be brief — a sentence
                or a value, not a paragraph. If the answer needs to be long, break it into multiple
                cards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include the regulation number.</strong> For BS 7671 flashcards, always
                include the regulation number on the answer side. This trains you to associate the
                knowledge with its location in the regulations — essential for the open-book exam.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use both directions.</strong> For definitions, make two cards: one that
                gives the definition and asks for the term, and one that gives the term and asks for
                the definition. This tests both recognition and recall.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'study-schedule',
    heading: 'Building a Flashcard Study Schedule',
    content: (
      <>
        <p>
          Consistency matters more than intensity. A short daily session is far more effective than
          a long session once a week. Here is a practical study schedule for using flashcards
          alongside your other revision.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily:</strong> 15 to 20 minutes of flashcard review. If using spaced
                repetition, the system will determine which cards to show you. This is your minimum
                daily commitment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When learning new topics:</strong> After studying a new topic from your
                textbook or course, create flashcards for the key facts immediately. Then start
                reviewing them the next day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before mock exams:</strong> Do a flashcard review session before each{' '}
                <SEOInternalLink href="/guides/mock-exams-electrical">mock exam</SEOInternalLink>.
                This primes your memory and helps you recall information during the test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On the go:</strong> One of the biggest advantages of digital flashcards is
                that you can review them anywhere — on the train, during a tea break, in the van
                between jobs. These micro-sessions add up.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle is frequency over duration. Five sessions of 15 minutes spread across
          the week will produce better results than one session of 75 minutes. Your brain needs time
          between sessions to consolidate the learning.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid',
    content: (
      <>
        <p>
          Flashcards are simple in concept but easy to use incorrectly. Here are the most common
          mistakes that reduce their effectiveness.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making cards too complex.</strong> A flashcard with 5 bullet points on the
                answer side is not a flashcard — it is a study note. Break complex topics into
                multiple simple cards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not attempting to recall before flipping.</strong> The learning happens
                during the retrieval attempt, not when reading the answer. If you flip the card
                without trying to recall the answer first, you are wasting your time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making too many cards too quickly.</strong> Adding 200 new cards in one day
                creates a backlog that becomes overwhelming. Add 10 to 20 new cards per day maximum,
                and prioritise reviewing existing cards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skipping difficult cards.</strong> The cards you want to skip are the ones
                you need most. If a card is consistently difficult, that is the topic you need to
                study more — not less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only using flashcards.</strong> Flashcards are excellent for factual recall,
                but they do not replace understanding. You need to study the underlying concepts
                first (from your course or textbook), then use flashcards to retain the key facts.
                Combine flashcards with{' '}
                <SEOInternalLink href="/guides/mock-exams-electrical">mock exams</SEOInternalLink>{' '}
                for a complete revision strategy.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'digital-flashcards',
    heading: 'Digital Flashcards on Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate's study centre includes purpose-built flashcard decks for UK electrical
          qualifications. These are not generic flashcards — they are curated by qualified
          electricians specifically for the exams you are sitting.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Exam-Specific Decks</h4>
                <p className="text-white text-sm leading-relaxed">
                  Separate flashcard decks for 18th Edition (C&G 2382), 2391 Inspection and Testing,
                  AM2 preparation, and EPA. Each deck focuses on the topics and question styles most
                  relevant to that specific exam.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Repeat className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Built-In Spaced Repetition</h4>
                <p className="text-white text-sm leading-relaxed">
                  The app automatically schedules your reviews using spaced repetition. You do not
                  need to manage the spacing yourself — just open the app, review the cards it shows
                  you, and the algorithm handles the rest.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Study Anywhere</h4>
                <p className="text-white text-sm leading-relaxed">
                  Digital flashcards on your phone mean you can study anywhere — in the van, on a
                  break, on the train, before bed. Every spare 10 minutes becomes productive
                  revision time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start using flashcards today"
          description="Elec-Mate gives you curated flashcard decks for 18th Edition, 2391, AM2, and EPA, with spaced repetition built in. Study on your phone, track your progress, and pass first time. 7-day free trial."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FlashcardsElectricalPage() {
  return (
    <GuideTemplate
      title="Flashcards for Electrical Exams | Study Tool"
      description="Complete guide to using flashcards for UK electrical exams. Active recall, spaced repetition, key topics for 18th Edition, 2391, AM2, and EPA. How to make effective flashcards and build a study schedule."
      datePublished="2025-03-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Study Tool"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Flashcards for Electrical Exams:{' '}
          <span className="text-yellow-400">The Science-Backed Way to Pass</span>
        </>
      }
      heroSubtitle="Active recall and spaced repetition are the two most effective study techniques ever tested. Flashcards combine both. This guide shows you how to use them for 18th Edition, 2391, AM2, and EPA exams — and why they outperform every other revision method."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Flashcards for Electrical Exams"
      relatedPages={relatedPages}
      ctaHeading="Study Smarter With Digital Flashcards"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for flashcards, mock exams, and structured revision. Spaced repetition built in. Study anywhere on your phone. 7-day free trial, cancel anytime."
    />
  );
}
