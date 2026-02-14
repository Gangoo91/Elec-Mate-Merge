import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  GraduationCap,
  Layers,
  Repeat,
  Target,
  BookOpen,
  Zap,
  CheckCircle2,
  ClipboardCheck,
  Timer,
  Lightbulb,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/study-centre/apprentice' },
  { label: 'Flashcards', href: '/guides/apprentice-flashcards-tool' },
];

const tocItems = [
  { id: 'why-flashcards', label: 'Why Flashcards Work' },
  { id: 'active-recall', label: 'Active Recall Method' },
  { id: 'spaced-repetition', label: 'Spaced Repetition' },
  { id: 'topic-areas', label: 'Key Topic Areas Covered' },
  { id: 'how-it-works', label: 'How the Flashcard System Works' },
  { id: 'study-strategies', label: 'Study Strategies' },
  { id: 'beyond-flashcards', label: 'Beyond Flashcards' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Active recall — testing yourself on material rather than passively re-reading it — is proven to be 2 to 3 times more effective for long-term retention than traditional revision methods.',
  'Spaced repetition schedules reviews at increasing intervals, ensuring you revisit material just before you would forget it — maximising retention with minimum study time.',
  'Elec-Mate flashcards cover every key topic area for electrical apprentices: BS 7671 regulations, circuit theory, testing procedures, earthing and bonding, protection, and more.',
  'The system tracks your confidence on every card and automatically prioritises the topics you find hardest, so you spend your study time where it matters most.',
  'Flashcards are available offline, so you can revise on the train, on lunch break, or anywhere without a signal — perfect for apprentices who are on site during the day.',
];

const faqs = [
  {
    question: 'How many flashcards are included in Elec-Mate?',
    answer:
      'Elec-Mate includes over 800 flashcards covering the full range of topics for Level 2 and Level 3 electrical apprentices. The cards cover BS 7671 regulations, circuit theory and calculations, earthing arrangements (TN-S, TN-C-S, TT), protective devices (MCBs, RCDs, RCBOs), testing procedures and sequences, cable selection and sizing, special locations (bathrooms, swimming pools, construction sites), safe isolation procedures, and more. New cards are added regularly as the regulations and syllabi are updated. You can also create your own custom flashcards if you want to add notes from your college course or on-site learning.',
  },
  {
    question: 'How does spaced repetition differ from just going through flashcards randomly?',
    answer:
      'Random flashcard review is better than not studying at all, but it wastes time on cards you already know well. Spaced repetition uses an algorithm to schedule each card based on how well you know it. When you see a card, you rate your confidence (easy, good, hard, or again). Cards you find easy are shown less frequently — perhaps once a week, then once a month. Cards you find hard are shown again within hours or the next day. This means you spend the majority of your study time on the material you actually struggle with, rather than comfortably reviewing things you already know. Research consistently shows that spaced repetition produces better long-term retention in significantly less total study time compared to random or sequential review.',
  },
  {
    question: 'Can I use the flashcards offline on site?',
    answer:
      'Yes. Elec-Mate flashcards are cached on your device and work fully offline. This is particularly important for apprentices who spend most of their day on construction sites or in properties where mobile signal is unreliable. You can download your flashcard decks when you have a connection (at home or in college) and then study on your commute, during lunch break, or whenever you have a few minutes spare — regardless of whether you have internet access. Your progress syncs back to the cloud when you reconnect, so nothing is lost.',
  },
  {
    question: 'Are the flashcards aligned with specific qualifications?',
    answer:
      'Yes. The flashcard content is structured to align with the key qualifications in the electrical apprenticeship pathway: City & Guilds 2365 (Electrical Installation), City & Guilds 2382 (18th Edition IET Wiring Regulations), City & Guilds 2391 (Inspection and Testing), and the Level 3 Electrotechnical Apprenticeship. Each flashcard is tagged with the relevant qualification and topic area, so you can filter your revision to focus on a specific exam if needed. For example, if your 2382 exam is next week, you can study only the BS 7671 regulation cards.',
  },
  {
    question: 'How long should I spend on flashcards each day?',
    answer:
      'Consistency matters more than duration. Research on spaced repetition shows that 15 to 20 minutes per day is optimal for most learners. Longer sessions lead to diminishing returns because your brain becomes less effective at encoding new memories after sustained effort. The key is daily practice — doing 15 minutes every day for a month is far more effective than doing 8 hours of cramming the night before an exam. Many apprentices use their commute or lunch break for flashcard review. Elec-Mate tracks your daily study streak to help you build the habit.',
  },
  {
    question: 'Can I create my own flashcards?',
    answer:
      'Yes. In addition to the pre-built flashcard decks, Elec-Mate allows you to create your own custom flashcards. This is useful for adding specific notes from your college course, recording things you learned on site, or creating cards based on past exam questions that you found difficult. Custom cards are integrated into the same spaced repetition system as the pre-built cards, so they benefit from the same intelligent scheduling. Many apprentices find that the act of creating a flashcard — thinking about the question and writing a clear answer — is itself a powerful learning exercise.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/am2-simulator-guide',
    title: 'AM2 Simulator Guide',
    description:
      'Practise for the AM2 practical assessment with timed scenarios and fault diagnosis training.',
    icon: Target,
    category: 'Tool',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation',
    description: 'Complete guide to the End-Point Assessment including knowledge test preparation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about becoming an electrician through the apprenticeship route.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to the IET Wiring Regulations — the core knowledge for every electrician.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order of electrical tests as required by BS 7671.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/guides/level-2-electrical',
    title: 'Level 2 Electrical Course',
    description: 'Study for Level 2 with structured course content on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-flashcards',
    heading: 'Why Flashcards Are the Most Effective Revision Method',
    content: (
      <>
        <p>
          Flashcards are not a new idea. They have been used by students for centuries. But the
          reason they persist — when countless other study methods have come and gone — is that they
          exploit two of the most powerful principles in cognitive science: active recall and spaced
          repetition.
        </p>
        <p>
          Most apprentices revise by re-reading their college notes or textbooks. This feels
          productive because the material seems familiar when you read it again. But familiarity is
          not the same as recall. You might recognise a regulation when you see it on the page, but
          can you recall it from memory when you need it in an exam or on site?
        </p>
        <p>
          Active recall — the act of retrieving information from memory without looking at it —
          forces your brain to strengthen the neural pathways associated with that knowledge. Every
          time you successfully recall something, it becomes easier to recall next time. Every time
          you fail to recall something, the subsequent correction creates a stronger memory trace
          than simply re-reading would.
        </p>
        <p>
          Research published in journals including <em>Science</em> and{' '}
          <em>Psychological Science</em> has consistently shown that retrieval practice (testing
          yourself) produces 2 to 3 times better long-term retention compared to re-reading or
          highlighting. For{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprentices
          </SEOInternalLink>{' '}
          who need to retain large volumes of technical information — regulations, formulas, testing
          procedures, cable ratings — this is not a marginal improvement. It is the difference
          between passing and failing.
        </p>
      </>
    ),
  },
  {
    id: 'active-recall',
    heading: 'Active Recall: How It Works',
    content: (
      <>
        <p>
          Active recall is simple in principle: instead of reading the answer, you see a question
          and try to recall the answer from memory before checking. The flashcard format is the
          perfect vehicle for this.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Front of card: a question or prompt.</strong> For example: "What is the
                minimum insulation resistance for a circuit tested at 500V DC?" or "What does
                Regulation 411.3.3 require for socket outlets rated up to 32A?"
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You attempt to answer before revealing the back.</strong> Think about it.
                Say it out loud or write it down. Struggle with it. The struggle is where the
                learning happens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back of card: the correct answer.</strong> For example: "1 M-ohm minimum (BS
                7671 Table 61)" or "RCD protection with a rated residual operating current not
                exceeding 30 mA."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You rate your confidence.</strong> Did you get it right easily? Mark it
                "easy." Did you struggle but eventually get there? Mark it "good." Did you get it
                wrong? Mark it "again." This rating feeds the spaced repetition algorithm.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The critical element is the attempt to recall before checking. If you flip the card too
          quickly without genuinely trying to retrieve the answer, you are doing passive review —
          and the benefit drops dramatically. Give yourself at least 5 to 10 seconds of genuine
          effort on each card before revealing the answer.
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
          Spaced repetition is the scheduling engine that makes flashcard study efficient. Without
          it, you would waste time reviewing cards you already know well. With it, you focus your
          effort where it is needed most.
        </p>
        <p>
          The concept is based on the "forgetting curve" — the observation that memory of new
          information decays exponentially over time unless it is reinforced. The optimal time to
          review something is just before you would forget it. Review too early and you waste time.
          Review too late and you have to relearn from scratch.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Repeat className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">How the intervals work</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>A new card you get wrong: shown again in the same session.</li>
                <li>A new card you get right: shown again tomorrow.</li>
                <li>A card you get right twice in a row: shown again in 3 days.</li>
                <li>A card you get right three times: shown again in 7 days.</li>
                <li>A card you consistently get right: intervals extend to 14, 30, 60, 90 days.</li>
                <li>A card you get wrong after a long interval: resets to a shorter interval.</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          The result is that within a few weeks, easy cards are barely shown at all, while difficult
          cards appear frequently. Your daily study session automatically focuses on the material
          you find hardest — without you having to decide what to study. The algorithm makes that
          decision for you based on your performance.
        </p>
        <p>
          Elec-Mate uses a modified SM-2 algorithm (the same foundation used by Anki and other
          leading spaced repetition tools) adapted specifically for technical electrical content.
        </p>
      </>
    ),
  },
  {
    id: 'topic-areas',
    heading: 'Key Topic Areas Covered by the Flashcards',
    content: (
      <>
        <p>
          The Elec-Mate flashcard library covers every major topic area in the electrical
          apprenticeship curriculum. Cards are organised into decks by topic and tagged by
          qualification, so you can study broadly or focus on a specific area.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-yellow-400" />
              BS 7671 Regulations
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Key regulation numbers, definitions, requirements for protection against electric
              shock, overcurrent protection, isolation and switching, earthing arrangements, and
              special installations. Aligned with{' '}
              <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                BS 7671:2018+A3:2024
              </SEOInternalLink>
              .
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Circuit Theory and Calculations
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Ohm's law, power formula, voltage drop calculations, diversity factors, maximum
              demand, cable sizing, prospective fault current, earth fault loop impedance, and
              adiabatic equation.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
              Testing Procedures
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Correct testing sequences, instrument settings, acceptable values, recording results,
              and interpreting findings. Covers continuity, insulation resistance, polarity, Zs,
              PFC, and RCD testing.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-yellow-400" />
              Earthing and Protection
            </h3>
            <p className="text-white text-sm leading-relaxed">
              TN-S, TN-C-S, TT, and IT earthing arrangements. Main equipotential bonding,
              supplementary bonding, RCD types (AC, A, B, F), MCB characteristics (B, C, D), and
              discrimination.
            </p>
          </div>
        </div>
        <p>
          Additional topic areas include: cable types and applications, special locations (Section 7
          of BS 7671), safe isolation procedures, consumer unit regulations, electrical science
          fundamentals, and health and safety legislation.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How the Elec-Mate Flashcard System Works',
    content: (
      <>
        <p>
          The flashcard system in Elec-Mate is designed for apprentices who are busy — working on
          site during the day, attending college in the evenings, and trying to fit revision into
          whatever time is left. It needs to be fast, focused, and available offline.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pick a Deck or Study All</h4>
                <p className="text-white text-sm leading-relaxed">
                  Choose a specific topic deck (for example, "BS 7671 Regulations" or "Testing
                  Procedures") or study all decks combined. The spaced repetition algorithm works
                  across all your active decks to prioritise the cards most due for review.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Study Session</h4>
                <p className="text-white text-sm leading-relaxed">
                  Each session shows you cards that are due for review plus a controlled number of
                  new cards (default: 10 new cards per session). Read the question, attempt your
                  answer, reveal the correct answer, then rate your confidence. Sessions typically
                  take 10 to 20 minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Progress Tracking</h4>
                <p className="text-white text-sm leading-relaxed">
                  Track your daily study streak, total cards studied, accuracy rate, and which
                  topics you find most challenging. The dashboard shows your retention rate over
                  time — watch it climb as the spaced repetition effect compounds.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start building your electrical knowledge today"
          description="800+ flashcards covering every key topic for Level 2 and Level 3 apprentices. Spaced repetition, offline access, and progress tracking. 15 minutes a day is all it takes. 7-day free trial."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'study-strategies',
    heading: 'Study Strategies for Apprentice Electricians',
    content: (
      <>
        <p>
          Flashcards work best as part of a broader study strategy. Here are some practical tips for
          getting the most out of your revision time:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study daily, not weekly.</strong> Fifteen minutes every day is far more
                effective than two hours once a week. Spaced repetition only works if you show up
                consistently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use dead time.</strong> Commuting, waiting for materials, lunch breaks —
                these are all opportunities for a quick flashcard session. The app works offline, so
                you do not need a signal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be honest with your ratings.</strong> If you got a card wrong, mark it
                "again" — do not mark it "good" to feel better about your progress. The algorithm
                depends on honest self-assessment to schedule correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connect flashcards to real work.</strong> When you encounter something on
                site that relates to a flashcard topic — for example, you see an RCD trip — make a
                mental note to review those cards. Linking theory to practice strengthens memory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combine with other study methods.</strong> Use flashcards for factual recall
                (regulations, values, definitions) and use practice problems, past papers, and the{' '}
                <SEOInternalLink href="/guides/am2-simulator-guide">AM2 simulator</SEOInternalLink>{' '}
                for applied skills.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'beyond-flashcards',
    heading: 'Beyond Flashcards: The Full Elec-Mate Study Platform',
    content: (
      <>
        <p>
          Flashcards are one component of a comprehensive study approach. Elec-Mate provides a
          complete learning platform for apprentice electricians, including:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 Simulator</strong> — timed practice scenarios for the practical
                assessment, including installation planning, testing sequences, and fault diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured Courses</strong> — 50+ training modules covering Level 2, Level
                3, 18th Edition, and inspection and testing — presented in clear, bite-sized
                sections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AI Revision Assistant</strong> — ask any question about electrical theory,
                BS 7671 regulations, or exam topics and get a clear, regulation-referenced answer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio Builder</strong> — document your on-site work experience and build
                your apprenticeship portfolio with guided templates.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Your complete apprentice study toolkit"
          description="Flashcards, AM2 simulator, structured courses, AI revision assistant, and portfolio builder — all in one app. Everything an apprentice electrician needs to pass their qualifications. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeFlashcardsPage() {
  return (
    <GuideTemplate
      title="Apprentice Flashcards Tool | Electrical Revision"
      description="Electrical apprentice flashcards using active recall and spaced repetition. 800+ cards covering BS 7671, testing procedures, earthing, protection, and circuit theory. Offline access. Free 7-day trial."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Tool"
      badgeIcon={Brain}
      heroTitle={
        <>
          Apprentice Flashcards:{' '}
          <span className="text-yellow-400">The Smartest Way to Revise for Electrical Exams</span>
        </>
      }
      heroSubtitle="Active recall and spaced repetition are proven to be 2 to 3 times more effective than re-reading your notes. Elec-Mate flashcards cover every key topic for Level 2 and Level 3 apprentices — BS 7671, testing, earthing, protection, calculations — and work offline so you can study anywhere."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Flashcards"
      relatedPages={relatedPages}
      ctaHeading="Start Revising Smarter Today"
      ctaSubheading="800+ flashcards with spaced repetition, offline access, and progress tracking. Join hundreds of apprentices building their electrical knowledge 15 minutes at a time. 7-day free trial."
    />
  );
}
