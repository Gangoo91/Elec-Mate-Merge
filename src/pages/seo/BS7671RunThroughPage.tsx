import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  BrainCircuit,
  ClipboardCheck,
  BookMarked,
  Target,
  Layers,
  FileCheck2,
  Lightbulb,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'BS 7671 Run-Through', href: '/guides/bs-7671-run-through' },
];

const tocItems = [
  { id: 'what-is-bs-7671', label: 'What Is BS 7671?' },
  { id: 'part-1-scope', label: 'Part 1: Scope and Fundamental Principles' },
  { id: 'part-2-definitions', label: 'Part 2: Definitions' },
  { id: 'part-3-assessment', label: 'Part 3: Assessment of General Characteristics' },
  { id: 'part-4-protection', label: 'Part 4: Protection for Safety' },
  { id: 'part-5-selection', label: 'Part 5: Selection and Erection' },
  { id: 'part-6-inspection', label: 'Part 6: Inspection and Testing' },
  { id: 'part-7-special', label: 'Part 7: Special Installations' },
  { id: 'exam-strategy', label: 'Exam Strategy' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 (the 18th Edition with Amendment 3) is organised into seven parts, plus appendices — understanding the structure is the key to finding regulations quickly in the exam and on site.',
  'Part 1 (Scope, Object, and Fundamental Principles) and Part 2 (Definitions) are foundation knowledge — many exam questions test whether you know what a term means or whether a particular installation falls within scope.',
  'Part 4 (Protection for Safety) is the heaviest exam topic, covering protection against electric shock (Chapter 41), thermal effects (Chapter 42), overcurrent (Chapter 43), voltage disturbances (Chapter 44), and isolation and switching (Chapter 53).',
  'Part 7 (Special Installations or Locations) contains sections that frequently appear in exams — bathrooms (Section 701), swimming pools (Section 702), construction sites (Section 704), agricultural premises (Section 705), and EV charging (Section 722).',
  'Elec-Mate AI tutor can explain any BS 7671 regulation in plain English, cross-reference between parts, and generate practice questions targeted at the areas you find most difficult.',
];

const faqs = [
  {
    question: 'How is BS 7671 structured?',
    answer:
      'BS 7671 is organised into seven main parts: Part 1 (Scope, Object, and Fundamental Principles), Part 2 (Definitions), Part 3 (Assessment of General Characteristics), Part 4 (Protection for Safety), Part 5 (Selection and Erection of Equipment), Part 6 (Inspection and Testing), and Part 7 (Special Installations or Locations). Each part is divided into chapters, and each chapter is divided into sections containing individual regulations. The regulation numbering system follows a logical pattern — for example, Regulation 411.3.3 is in Part 4, Chapter 41, Section 411. Understanding this numbering system is essential for quickly navigating the book during the exam. There are also appendices that contain important reference tables, including maximum earth fault loop impedance values, conductor sizes, and the model forms for certificates and reports.',
  },
  {
    question: 'Which parts of BS 7671 come up most in the exam?',
    answer:
      'Part 4 (Protection for Safety) is the most heavily examined part, particularly Chapter 41 (Protection Against Electric Shock), which covers automatic disconnection of supply (ADS), maximum disconnection times, earth fault loop impedance requirements, RCD protection, and the distinction between basic protection and fault protection. Chapter 43 (Protection Against Overcurrent) is also frequently tested, covering the coordination between cable current-carrying capacity and protective device rating. Part 5 (Selection and Erection) generates many questions on cable selection, current-carrying capacity, voltage drop, grouping factors, and thermal insulation. Part 7 (Special Installations) commonly features questions on bathrooms (Section 701), construction sites (Section 704), and EV charging (Section 722). Part 6 (Inspection and Testing) is tested more in the C&G 2391 exam than the 2382, but knowledge of initial verification and periodic inspection requirements is expected in both.',
  },
  {
    question: 'How should I study BS 7671 for the exam?',
    answer:
      'The most effective approach is structured study combined with regular practice questions. Start by reading each part from beginning to end to understand its scope and purpose — do not try to memorise every regulation, but understand the principles. Then focus on the high-frequency exam topics: Chapter 41 (ADS, disconnection times, Zs values), Chapter 43 (overcurrent protection, In vs Iz vs It), Chapter 52 (cable selection, voltage drop, grouping factors), and Part 7 special locations. Use the book during practice questions — the exam is open book, so you need to practise finding regulations quickly under time pressure. Elec-Mate flashcards and quizzes are designed around the exam syllabus, so the topics you practise are the topics you will see in the exam. Mark key tables with tab stickers so you can find them in seconds: Table 41.1 (maximum disconnection times), Appendix 3 (conductor sizes), and Table 52.3 (rating factors).',
  },
  {
    question: 'What is the difference between the 18th Edition exam and the 2391 exam?',
    answer:
      'The C&G 2382 (18th Edition) exam tests your knowledge of BS 7671 — the regulations themselves, their application, and the principles behind them. It is a 2-hour open-book exam with 60 multiple-choice questions. You need 60% (36 correct answers) to pass. The C&G 2391 (Inspection and Testing) exam tests your ability to carry out inspection and testing of electrical installations, interpret test results, and complete EICR and EIC documentation. It includes both a written exam (design, fault diagnosis, and schedule of inspections) and a practical assessment. The 2391 requires a deeper understanding of Part 6 (Inspection and Testing), the testing sequence, and the ability to identify defects from test results. Most electricians sit the 2382 first and then the 2391. Elec-Mate provides study support and mock exams for both qualifications.',
  },
  {
    question: 'Is the 18th Edition exam open book?',
    answer:
      'Yes. The C&G 2382 (18th Edition) exam is open book — you are permitted to bring your copy of BS 7671 into the exam and use it to look up regulations. However, you may not bring notes, separate index sheets, or any other reference material. You can use tab stickers or page markers to help you navigate the book quickly. The open-book format means you do not need to memorise every regulation number, but you do need to understand the book structure well enough to find the relevant regulation within the time allowed. Many candidates fail because they spend too long searching for regulations — practise with your book until you can find key tables and regulations in under 30 seconds. Elec-Mate mock exams are designed to simulate exam conditions, including the time pressure of finding regulations in the book.',
  },
  {
    question: 'What are the appendices and why are they important?',
    answer:
      'The appendices in BS 7671 contain essential reference data that you will use constantly — both in the exam and in practice. Appendix 1 lists the British Standards referred to in BS 7671. Appendix 3 contains current-carrying capacity tables for different cable types, installation methods, and ambient temperatures — these are the tables you use for cable sizing calculations. Appendix 4 contains tables of maximum earth fault loop impedance (Zs) values for different protective devices and disconnection times — these are essential for verifying that your circuit protection will disconnect quickly enough in the event of an earth fault. Appendix 6 contains the model forms for certificates (EIC, Minor Works Certificate) and reports (EICR, condition report). Appendix 12 is particularly useful for the exam — it contains a quick reference table cross-referencing protective device ratings with cable sizes and maximum Zs values. Tab these appendices in your book before the exam.',
  },
];

const sections = [
  {
    id: 'what-is-bs-7671',
    heading: 'What Is BS 7671 and Why Does It Matter?',
    content: (
      <>
        <p>
          BS 7671 is the national standard for electrical installations in the UK. Published by the
          IET (Institution of Engineering and Technology) and the BSI (British Standards
          Institution), it sets out the rules for the design, erection, and verification of
          electrical installations operating at voltages up to and including 1,000V AC.
        </p>
        <p>
          The current edition is the 18th Edition:{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . The "+A3:2024" indicates that Amendment 3 has been incorporated. Every electrician
          working in the UK must understand BS 7671 — it is tested in the C&G 2382 exam, it governs
          every installation you design and build, and it is the standard against which your work is
          inspected and certified.
        </p>
        <p>
          This run-through study guide walks you through every part of BS 7671, highlighting the key
          regulations, exam focus areas, and practical applications. It is designed as a companion
          to your study — read it alongside your copy of the brown book.
        </p>
        <SEOAppBridge
          title="Ask the AI tutor any BS 7671 question"
          description="Stuck on a regulation? Ask Elec-Mate's AI tutor to explain it in plain English. Get cross-references, worked examples, and exam-style practice questions — all from your phone."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'part-1-scope',
    heading: 'Part 1: Scope, Object, and Fundamental Principles',
    content: (
      <>
        <p>
          Part 1 establishes what BS 7671 covers (and what it does not), its objectives, and the
          fundamental principles that underpin every regulation in the book.
        </p>
        <p>
          <strong>Scope</strong> — BS 7671 applies to the design, erection, and verification of
          electrical installations operating at nominal voltages up to and including 1,000V AC or
          1,500V DC. It covers fixed installations in buildings, temporary installations
          (construction sites, exhibitions), and certain types of external installations. It does
          not cover systems for distribution of electricity to the public (DNO networks), lightning
          protection systems (covered by BS EN 62305), electrical equipment on board ships, offshore
          installations, or mines and quarries (which have their own regulations).
        </p>
        <p>
          <strong>Fundamental principles</strong> — the seven fundamental principles are: protection
          against electric shock, protection against thermal effects, protection against
          overcurrent, protection against fault current, protection against voltage disturbances,
          isolation and switching, and application of protective measures for safety. These
          principles flow through every chapter of the book and are the foundation for all the
          detailed regulations that follow.
        </p>
        <p>
          <strong>Exam tip</strong> — Part 1 questions typically test whether you know the scope of
          BS 7671. Common questions include: "Does BS 7671 apply to [specific situation]?" and
          "Which fundamental principle relates to [specific protection]?" Know the scope boundaries
          and the seven principles.
        </p>
      </>
    ),
  },
  {
    id: 'part-2-definitions',
    heading: 'Part 2: Definitions',
    content: (
      <>
        <p>
          Part 2 contains the definitions of all technical terms used in BS 7671. These definitions
          have specific, precise meanings — do not assume you know what a term means from everyday
          usage.
        </p>
        <p>
          Key definitions to know for the exam include: basic protection (protection against
          electric shock under fault-free conditions), fault protection (protection against electric
          shock under single fault conditions), automatic disconnection of supply (ADS), protective
          conductor, circuit protective conductor (cpc), exposed-conductive-part,
          extraneous-conductive-part, and the difference between isolation and switching.
        </p>
        <p>
          <strong>Exam tip</strong> — definition questions appear regularly. The examiners test
          whether you understand the precise BS 7671 definition, not a general understanding. For
          example, knowing the exact difference between an "exposed-conductive-part" (a conductive
          part of equipment which can be touched and which is not normally live but which can become
          live under fault conditions) and an "extraneous-conductive-part" (a conductive part not
          forming part of the electrical installation but liable to introduce a potential) is
          critical.
        </p>
        <p>
          Spend time reading Part 2 carefully. Mark definitions you find confusing and use the{' '}
          <SEOInternalLink href="/training/eighteenth-edition-course">
            Elec-Mate 18th Edition course
          </SEOInternalLink>{' '}
          flashcards to practise them until they are second nature.
        </p>
      </>
    ),
  },
  {
    id: 'part-3-assessment',
    heading: 'Part 3: Assessment of General Characteristics',
    content: (
      <>
        <p>
          Part 3 covers the information you need to gather before designing an electrical
          installation. This is the assessment stage — understanding the supply characteristics, the
          building use, and the external influences that affect your design decisions.
        </p>
        <p>
          <strong>Chapter 31 — Supply characteristics.</strong> You must determine the nature of the
          supply (single-phase, three-phase), the supply voltage and frequency, the prospective
          fault current at the origin, the type of earthing arrangement (TN-S, TN-C-S, TT, IT), and
          the external earth fault loop impedance (Ze).
        </p>
        <p>
          <strong>Chapter 32 — Classification of external influences.</strong> External influences
          are coded using a three-letter system: the first letter indicates the category (A =
          environment, B = utilisation, C = building construction), the second letter indicates the
          nature of the influence, and the number indicates the class. For example, AD4 indicates
          "presence of water — splashes." These codes determine the minimum IP rating for equipment
          installed in that environment.
        </p>
        <p>
          <strong>Chapter 33 — Compatibility.</strong> The installation must be compatible with
          other installations and equipment connected to the same supply. This includes
          consideration of harmonics, voltage fluctuations, and electromagnetic compatibility.
        </p>
        <p>
          <strong>Exam tip</strong> — expect questions on earthing arrangements (TN-S, TN-C-S, TT)
          and their characteristics, external influence codes, and the information you need to
          obtain before starting a design. Tab the external influences table for quick reference.
        </p>
      </>
    ),
  },
  {
    id: 'part-4-protection',
    heading: 'Part 4: Protection for Safety — The Exam Heavyweight',
    content: (
      <>
        <p>
          Part 4 is the most heavily examined part of BS 7671. It contains the regulations for
          protecting people and property from the hazards created by electrical installations. Focus
          your study time here.
        </p>
        <p>
          <strong>Chapter 41 — Protection against electric shock.</strong> This is the most
          important chapter for the exam. Key topics include: automatic disconnection of supply
          (ADS) as the primary protective measure, maximum disconnection times (Table 41.1), earth
          fault loop impedance requirements (Appendix 3 tables), additional protection by RCDs (30mA
          for socket outlets not exceeding 32A), and the requirements for different earthing
          systems.
        </p>
        <p>
          <strong>Chapter 43 — Protection against overcurrent.</strong> Understanding the
          relationship between cable current-carrying capacity (Iz), nominal protective device
          rating (In), design current (Ib), and tabulated current-carrying capacity (It) is
          essential. The fundamental rule is: Ib ≤ In ≤ Iz.
        </p>
        <p>
          <strong>Chapter 44 — Protection against voltage disturbances.</strong> This covers
          overvoltage protection and undervoltage protection. The{' '}
          <SEOInternalLink href="/training/bs-7671-amendment-3-course">
            Amendment 3 addition
          </SEOInternalLink>{' '}
          on bidirectional devices (Regulation 530.3.201) is relevant here.
        </p>
        <SEOAppBridge
          title="Practise Chapter 41 questions with AI feedback"
          description="Chapter 41 is the most exam-critical chapter. Elec-Mate generates unlimited practice questions on ADS, disconnection times, Zs values, and RCD requirements — with detailed explanations for every answer."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'part-5-selection',
    heading: 'Part 5: Selection and Erection of Equipment',
    content: (
      <>
        <p>
          Part 5 covers the practical rules for selecting and installing equipment — cables,
          switchgear, accessories, and other components. This part translates the protection
          requirements of Part 4 into specific installation rules.
        </p>
        <p>
          <strong>Chapter 52 — Selection and erection of wiring systems.</strong> This is the cable
          selection chapter. Key topics include: current-carrying capacity (using Appendix 3
          tables), correction factors for ambient temperature, grouping, and thermal insulation,
          voltage drop calculations (maximum 3% for lighting, 5% for other circuits from the
          origin), and cable installation methods (reference methods).
        </p>
        <p>
          <strong>Chapter 53 — Switchgear.</strong> Covers the selection of protective devices,
          isolation devices, and switching devices. Regulation 530.3.201 (Amendment 3) on
          bidirectional devices sits in this chapter.
        </p>
        <p>
          <strong>Exam tip</strong> — cable sizing questions are almost guaranteed. Practise the
          full calculation process: determine design current, select protective device rating, apply
          correction factors, look up the minimum cable size from the Appendix 3 tables, and verify
          voltage drop. Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to check your manual calculations during revision.
        </p>
      </>
    ),
  },
  {
    id: 'part-6-inspection',
    heading: 'Part 6: Inspection and Testing',
    content: (
      <>
        <p>
          Part 6 covers the verification of electrical installations — both initial verification
          (before a new installation is put into service) and periodic inspection and testing.
        </p>
        <p>
          <strong>Chapter 61 — Initial verification.</strong> Every new installation, addition, or
          alteration must be inspected and tested before being put into service. The inspection
          verifies that the installation complies with BS 7671, while the testing confirms that the
          installation is safe. The tests must be carried out in a specific sequence: continuity of
          protective conductors, continuity of ring final circuit conductors, insulation resistance,
          polarity, earth fault loop impedance, prospective fault current, and RCD operation.
        </p>
        <p>
          <strong>Chapter 62 — Periodic inspection and testing.</strong> Existing installations must
          be periodically inspected and tested to confirm they remain safe for continued use. The{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">
            EICR (Electrical Installation Condition Report)
          </SEOInternalLink>{' '}
          documents the findings, using observation codes C1 (Danger Present), C2 (Potentially
          Dangerous), C3 (Improvement Recommended), and FI (Further Investigation).
        </p>
        <p>
          <strong>Exam tip</strong> — know the testing sequence and the minimum acceptable values
          for each test. Insulation resistance must be at least 1 megohm for circuits up to 500V.
          RCDs rated at 30mA must trip within 200ms at rated current and 40ms at 5 times rated
          current. These values appear in exam questions regularly.
        </p>
      </>
    ),
  },
  {
    id: 'part-7-special',
    heading: 'Part 7: Special Installations or Locations',
    content: (
      <>
        <p>
          Part 7 contains additional or modified requirements for installations in specific
          locations where the risks are higher than normal. Each section in Part 7 supplements (and
          sometimes modifies) the general requirements in Parts 1 to 6.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <BookMarked className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Section 701 — Bathrooms</h3>
              <p className="text-white text-sm leading-relaxed">
                Zones 0, 1, and 2. IP ratings for equipment in each zone. 30mA RCD protection for
                all circuits. Supplementary bonding requirements. This section appears in almost
                every exam paper.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <BookMarked className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                Section 704 — Construction Sites
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Reduced low voltage systems (110V centre-tapped to earth). 30mA RCD protection.
                Protection against mechanical damage. Regular inspection requirements.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <BookMarked className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Section 722 — EV Charging</h3>
              <p className="text-white text-sm leading-relaxed">
                Dedicated circuit requirements, protective device selection, cable sizing for
                continuous load, PME earthing restrictions, and RCD Type A or Type B requirements
                depending on the charger type.
              </p>
            </div>
          </div>
        </div>
        <p>
          Other sections that appear in exams include Section 702 (Swimming Pools), Section 705
          (Agricultural Premises), Section 708 (Caravan Parks), Section 711 (Exhibitions), and
          Section 753 (Floor and Ceiling Heating). Focus on the sections most relevant to your work,
          but be prepared for questions on any Part 7 section.
        </p>
      </>
    ),
  },
  {
    id: 'exam-strategy',
    heading: 'Exam Strategy: How to Pass the 18th Edition',
    content: (
      <>
        <p>
          The C&G 2382 exam is 2 hours long with 60 multiple-choice questions. You need 36 correct
          answers (60%) to pass. The exam is open book — you can bring your copy of BS 7671 but
          nothing else.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tab your book before the exam.</strong> Use colour-coded tab stickers for
                key tables: Table 41.1, Appendix 3, Appendix 4, Table 52.3, and each Part 7 section.
                Being able to find a regulation in 15 seconds instead of 60 seconds makes a huge
                difference over 60 questions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Answer the easy questions first.</strong> Go through the paper and answer
                every question you know immediately. Then go back and tackle the questions that
                require book lookups. This ensures you do not run out of time on difficult questions
                and miss easy marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise with mock exams under timed conditions.</strong> The exam is about
                speed as much as knowledge. Complete at least 5 full mock papers before the real
                exam, timing yourself strictly. Elec-Mate provides unlimited mock exams with instant
                marking and detailed explanations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not leave any question blank.</strong> There is no negative marking. If
                you cannot find the answer, eliminate the obviously wrong options and make your best
                guess from the remaining choices. A 50/50 guess is better than a blank.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common reason for failure is running out of time because of slow book navigation.
          The second most common reason is not practising enough mock exams. Both are completely
          avoidable with preparation. Use Elec-Mate{' '}
          <SEOInternalLink href="/guides/mock-exams-electrician">mock exams</SEOInternalLink> and
          flashcards consistently in the weeks before your exam.
        </p>
      </>
    ),
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to the 18th Edition — key changes, structure, and practical application.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/eighteenth-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description:
      'Specific exam preparation advice — question analysis, time management, and common pitfalls.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/training/bs-7671-amendment-3-course',
    title: 'Amendment 3 Course',
    description: 'A3:2024 update training — Regulation 530.3.201 and bidirectional devices.',
    icon: BookMarked,
    category: 'Training',
  },
  {
    href: '/guides/mock-exams-electrician',
    title: 'Mock Exams Guide',
    description: 'How to use mock exams effectively for 18th Edition, 2391, and AM2 preparation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 study course — builds on BS 7671 knowledge with practical testing skills.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Full structured study course for the C&G 2382 exam with interactive quizzes and mock exams.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS7671RunThroughPage() {
  return (
    <GuideTemplate
      title="BS 7671 Run-Through Study Guide | 18th Edition Part by Part"
      description="Complete run-through of BS 7671:2018+A3:2024 for UK electricians. Part 1 to Part 7 overview, key regulations, exam focus areas, and study strategy. AI-powered study tools and unlimited mock exams."
      datePublished="2025-07-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Study Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          BS 7671 Run-Through: <span className="text-yellow-400">Part by Part Study Guide</span>
        </>
      }
      heroSubtitle="Walk through every part of BS 7671:2018+A3:2024 with this structured study guide. Key regulations highlighted, exam focus areas identified, and study strategy for the C&G 2382 exam. Use alongside your copy of the brown book."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Studying BS 7671"
      relatedPages={relatedPages}
      ctaHeading="Study BS 7671 smarter with AI-powered tools"
      ctaSubheading="Join 430+ UK electricians preparing for the 18th Edition exam with Elec-Mate. AI tutor, flashcards, unlimited mock exams, and structured study modules. 7-day free trial, cancel anytime."
    />
  );
}
