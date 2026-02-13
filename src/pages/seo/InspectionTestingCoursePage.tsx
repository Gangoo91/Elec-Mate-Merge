import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  GraduationCap,
  Brain,
  BookOpen,
  ChevronDown,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  TestTube2,
  Search,
  FileCheck2,
} from 'lucide-react';

const PAGE_TITLE =
  'Inspection and Testing Course Online | C&G 2391 Preparation | Elec-Mate';
const PAGE_DESCRIPTION =
  "Study for the C&G 2391 Inspection and Testing qualification online. AI-powered study assistant, mock exams, and practical scenario walkthroughs. From £4.99/mo.";

const faqs = [
  {
    question:
      'What is the difference between C&G 2391, C&G 2394, and C&G 2395?',
    answer:
      'The C&G 2391 (Initial Verification and Certification of Electrical Installations) is the current combined qualification that covers both initial verification of new installations and periodic inspection of existing installations. It replaced the older C&G 2394 (Initial Verification) and C&G 2395 (Periodic Inspection and Testing), which were separate qualifications covering each area individually. The 2394 covered the inspection and testing of new installations before they are energised, while the 2395 covered periodic inspection of installations already in service. If you hold both the 2394 and 2395, this is considered equivalent to the 2391. New candidates should take the 2391 as it covers everything in a single qualification.',
  },
  {
    question: 'Do I need the 2391 to carry out EICRs?',
    answer:
      'Technically, BS 7671 requires that inspection and testing be carried out by a "competent person," and does not specify a particular qualification. However, in practice, the C&G 2391 (or the older 2394/2395 combination) is the recognised standard for demonstrating competence in inspection and testing. Competent person scheme providers such as NICEIC, NAPIT, and ELECSA require their registered members to hold the 2391 (or equivalent) to carry out and sign off EICRs. Without it, you cannot join a scheme, and without scheme membership, you cannot self-certify your own work under Part P of the Building Regulations. For practical purposes, yes — you need the 2391 to carry out EICRs professionally.',
  },
  {
    question: 'How long does the C&G 2391 course take?',
    answer:
      'The duration depends on the training provider and the delivery method. A full-time classroom course typically takes 2-3 weeks. Part-time or evening courses may span 8-12 weeks. Online or blended learning courses can be completed at your own pace, though most candidates take 4-8 weeks of study alongside their regular work. The course includes both a written examination and a practical assessment. The written exam tests your knowledge of inspection and testing procedures, regulations, and documentation. The practical assessment requires you to carry out inspection and testing on a real or simulated installation and produce the correct documentation.',
  },
  {
    question: 'What test instruments do I need for the 2391 practical?',
    answer:
      'For the practical assessment, you will need a calibrated multifunction tester (such as a Megger MFT1741 or Fluke 1664FC) with a current calibration certificate. You will also need a GS 38 compliant voltage indicator (such as a Martindale VI-15000 or Fluke T150), a proving unit, and appropriate test leads. Some assessment centres provide instruments, but most require you to bring your own. Check with your training provider before the assessment date. Elec-Mate includes an instrument checklist and guidance on GS 38 compliance within the 2391 study module.',
  },
  {
    question: 'Can I study for the 2391 online?',
    answer:
      'The theory component of the 2391 can be studied online, and many candidates choose this route because it allows them to study at their own pace around work commitments. Elec-Mate provides AI-powered study materials, mock exam questions, and practical scenario walkthroughs that cover the full 2391 syllabus. However, the practical assessment must be completed in person at an approved assessment centre — there is no online alternative for the practical component. The best approach is to study the theory thoroughly online, then book the practical assessment when you feel confident with the testing procedures and documentation.',
  },
];

const howToSteps = [
  {
    name: 'Start with the GN3 testing sequence',
    text: 'Open the Inspection and Testing study module in Elec-Mate and begin with the GN3 testing sequence. This covers the correct order of tests as specified in Guidance Note 3: continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD testing. Understanding why the tests are done in this order is fundamental to the 2391.',
  },
  {
    name: 'Work through practical scenario walkthroughs',
    text: 'The app presents realistic inspection scenarios — a domestic rewire, a commercial installation, a periodic inspection of an older property. Each scenario walks you through what to inspect, what to test, and how to document your findings. The AI study assistant explains the reasoning behind each step and answers your questions in real time.',
  },
  {
    name: 'Practise completing certificates and reports',
    text: 'Practise filling in EICs and EICRs using the Elec-Mate certificate forms. The 2391 assessment requires you to complete the documentation accurately, so being comfortable with every section of the form before the exam is essential. The app validates your entries and flags any errors or omissions.',
  },
  {
    name: 'Take mock exams under timed conditions',
    text: 'Use the mock exam feature to test your knowledge under realistic time constraints. The questions cover the full syllabus including BS 7671 regulation references, GN3 procedures, testing instrument operation, and documentation requirements. Review your results to identify weak areas that need more study.',
  },
  {
    name: 'Book and prepare for the practical assessment',
    text: 'Once you are confident with the theory, book your practical assessment at an approved centre. Use the Elec-Mate pre-assessment checklist to ensure your test instruments are calibrated, your leads are compliant with GS 38, and you have all the necessary documentation. The app provides a final revision summary covering the most common practical assessment tasks.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description:
      'Ask questions about any regulation, testing procedure, or scenario. The AI study assistant provides detailed explanations with BS 7671 regulation references and practical examples.',
  },
  {
    icon: TestTube2,
    title: 'GN3 Testing Sequence',
    description:
      'Learn the correct order of tests from Guidance Note 3. Interactive walkthroughs explain why each test is performed in sequence and what the results mean.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Exam Questions',
    description:
      'Hundreds of practice questions covering the full 2391 syllabus. Timed mock exams simulate the real written assessment with instant marking and detailed explanations.',
  },
  {
    icon: Search,
    title: 'Scenario Walkthroughs',
    description:
      'Realistic inspection scenarios covering domestic, commercial, and industrial installations. Work through each scenario step by step with AI guidance and feedback.',
  },
  {
    icon: FileCheck2,
    title: 'Certificate Practice',
    description:
      'Practise completing EICs and EICRs accurately. The app validates every field and flags common documentation mistakes before you encounter them in the real assessment.',
  },
  {
    icon: BookOpen,
    title: 'Regulation Lookup',
    description:
      'Instant access to BS 7671 regulation references and GN3 guidance. Search by topic, regulation number, or keyword. The study assistant explains regulations in plain language.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'Inspection and Testing Course - C&G 2391 Preparation',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  educationalLevel: 'Professional',
  inLanguage: 'en-GB',
  courseMode: 'online',
  coursePrerequisites:
    'C&G 2382 (18th Edition IET Wiring Regulations) or equivalent',
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    description: 'From £4.99/month with 7-day free trial',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://elec-mate.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Training',
      item: 'https://elec-mate.com/training',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Inspection and Testing Course',
      item: 'https://elec-mate.com/training/inspection-and-testing',
    },
  ],
};

export default function InspectionTestingCoursePage() {
  useSEO({
    title: 'Inspection and Testing Course Online | C&G 2391 Preparation',
    description: PAGE_DESCRIPTION,
    schema: courseSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...courseSchema,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...breadcrumbSchema,
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <GraduationCap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              C&G 2391 Preparation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Study for the{' '}
            <span className="text-yellow-400">C&G 2391</span> Online
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            AI-powered study assistant, mock exams, scenario walkthroughs, and
            regulation lookup. Everything you need to prepare for the Inspection
            and Testing qualification.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What is the 2391 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the C&G 2391 Qualification?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The City & Guilds 2391 — officially titled "Initial Verification
              and Certification of Electrical Installations" — is the
              recognised qualification for electricians who carry out inspection
              and testing of electrical installations. It demonstrates that you
              have the knowledge and practical skills to inspect new
              installations before they are energised (initial verification) and
              to periodically inspect existing installations that are already in
              service (periodic inspection and testing).
            </p>
            <p>
              The 2391 is a combined qualification that replaced the older C&G
              2394 (Initial Verification) and C&G 2395 (Periodic Inspection and
              Testing). The 2394 covered the inspection and testing required
              before a new installation is connected to the supply — ensuring it
              has been designed, constructed, and tested in accordance with BS
              7671. The 2395 covered the periodic inspection of existing
              installations, identifying deterioration, damage, and departures
              from the current edition of the regulations. The 2391 covers both
              areas in a single qualification.
            </p>
            <p>
              For working electricians, the 2391 is one of the most important
              qualifications after the 18th Edition (C&G 2382) and the Level 3
              NVQ. Without it, you cannot join a competent person scheme
              (NICEIC, NAPIT, ELECSA) as a qualified supervisor, and you cannot
              independently sign off Electrical Installation Certificates (EICs)
              or Electrical Installation Condition Reports (EICRs). If you want
              to work as a self-employed electrician and certify your own work,
              the 2391 is not optional — it is essential.
            </p>
          </div>
        </div>
      </section>

      {/* Why You Need It */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why You Need the 2391 Qualification
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The 2391 is required for several critical career milestones in the
              electrical industry. Understanding these requirements helps you
              plan your career progression effectively.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>NICEIC/NAPIT/ELECSA membership:</strong> All major
                  competent person schemes require the 2391 (or equivalent) for
                  qualified supervisors. Without scheme membership, you cannot
                  self-certify notifiable electrical work under Part P of the
                  Building Regulations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Signing off EICRs:</strong> To issue an Electrical
                  Installation Condition Report, you must be competent in
                  periodic inspection and testing. The 2391 is the standard
                  evidence of this competence. Landlord EICR work is a growing
                  market since the 2020 regulations made them mandatory for
                  rented properties in England.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>JIB Approved Electrician (Grade Card):</strong> The
                  Grade Card requires the 2391 in addition to the Gold Card
                  qualifications. It demonstrates a higher level of competence
                  and is valued by employers in commercial and industrial work.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Career advancement:</strong> Many electrical
                  contracting firms require the 2391 for senior electrician
                  roles, site supervisor positions, and contracts manager
                  positions. It is also valuable for electricians moving into
                  consultancy, training, or compliance roles.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What the 2391 Course Covers
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The 2391 course content covers every aspect of electrical
              inspection and testing that a competent person needs to know. The
              syllabus is divided into several key areas, each of which is
              tested in both the written examination and the practical
              assessment.
            </p>
            <p>
              <strong>Safe isolation procedures</strong> form the foundation of
              all inspection and testing work. Before any dead testing can be
              carried out, the circuit or installation must be safely isolated
              and proved dead using a GS 38 compliant voltage indicator and
              proving unit. The correct procedure is: test the voltage indicator
              on a known live source (or proving unit), test the circuit for
              dead on all conductors, then test the voltage indicator again to
              confirm it is still working. This three-step procedure must be
              followed every time without exception.
            </p>
            <p>
              <strong>Initial verification</strong> covers the inspection and
              testing required before a new installation or alteration is
              connected to the supply. This includes a detailed visual
              inspection of the installation against the design documentation
              and BS 7671 requirements, followed by a sequence of electrical
              tests. The documentation produced is the Electrical Installation
              Certificate (EIC), which confirms that the installation has been
              designed, constructed, inspected, and tested in accordance with BS
              7671.
            </p>
            <p>
              <strong>Periodic inspection</strong> covers the assessment of
              existing installations that are already in service. This involves
              a thorough visual inspection, followed by testing, to identify
              any deterioration, damage, defects, or non-compliance with the
              current edition of BS 7671. The documentation produced is the
              Electrical Installation Condition Report (EICR), which includes
              observation codes (C1, C2, C3, FI) and an overall assessment of
              the installation condition.
            </p>
          </div>
        </div>
      </section>

      {/* GN3 Testing Sequence */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The GN3 Testing Sequence Explained
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Guidance Note 3 (GN3) published by the IET specifies the correct
              sequence of tests for both initial verification and periodic
              inspection. The tests must be carried out in a specific order
              because each test validates the results of the previous one and
              confirms that it is safe to proceed to the next. Understanding
              this sequence is essential for both the 2391 exam and real-world
              practice.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  Continuity of Protective Conductors
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  This test confirms that the circuit protective conductors
                  (CPCs) provide a continuous low-resistance path from every
                  exposed-conductive-part back to the main earthing terminal. A
                  low-resistance ohmmeter is used to measure the R1+R2 value for
                  each circuit. This test is done first because a functioning
                  earth path is essential for safety before any further tests are
                  carried out.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  Continuity of Ring Final Circuit Conductors
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  For ring final circuits, this test confirms that the line,
                  neutral, and CPC are all continuous rings without breaks, and
                  that no interconnections or spurs exist where they should not.
                  The three-step test method (end-to-end, cross-connect, test at
                  each socket) is the standard approach. The measured values at
                  each socket outlet should be reasonably consistent, indicating
                  a healthy ring.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  Insulation Resistance
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  This test applies a DC test voltage (typically 500V for
                  standard 230V circuits) between live conductors and earth, and
                  between line and neutral, to confirm that the insulation of
                  the cables and accessories is in good condition. The minimum
                  acceptable value is 1 megohm, though in practice healthy
                  insulation should read significantly higher. This test is done
                  after continuity tests because it requires the circuit to be
                  isolated and all loads disconnected.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Polarity</h3>
                <p className="text-white text-sm leading-relaxed">
                  This test confirms that single-pole switching and protective
                  devices are connected in the line conductor only, not the
                  neutral. It also confirms that socket outlets are correctly
                  wired (line to the correct terminal, neutral to the correct
                  terminal, earth connected). Polarity is typically confirmed
                  during the R1+R2 continuity test using the wander lead method.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                5
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  Earth Fault Loop Impedance (Zs)
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  This live test measures the total impedance of the earth fault
                  loop for each circuit. The measured Zs value must not exceed
                  the maximum permitted value for the protective device on that
                  circuit (as tabulated in BS 7671). This ensures that in the
                  event of an earth fault, sufficient current will flow to
                  operate the protective device within the required
                  disconnection time (0.4 seconds for final circuits, 5 seconds
                  for distribution circuits).
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                6
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  Prospective Fault Current (PSCC)
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  This test measures the maximum prospective short-circuit
                  current and prospective earth fault current at the origin of
                  the installation. The measured value must not exceed the rated
                  breaking capacity of the protective devices. This is important
                  because if the fault current exceeds the device rating, the
                  device may fail to interrupt the fault safely.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                7
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">
                  RCD Testing
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Residual Current Devices (RCDs) are tested to confirm they
                  operate within the required time at their rated residual
                  operating current. A 30mA RCD protecting a socket outlet must
                  trip within 300ms at the rated current and within 40ms at five
                  times the rated current. The test also confirms the RCD does
                  not trip at 50% of the rated current (to avoid nuisance
                  tripping). This is the final test because it requires the
                  supply to be live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Assessment */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The 2391 Practical Assessment
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The practical assessment is the component that many candidates
              find most challenging. It requires you to demonstrate that you can
              carry out a real inspection and testing procedure on an actual or
              simulated installation, following the correct sequence and
              producing accurate documentation.
            </p>
            <p>
              The practical typically involves two scenarios. The first is an
              initial verification of a newly installed or altered circuit. You
              inspect the installation visually, carry out the full testing
              sequence, and complete an Electrical Installation Certificate
              (EIC) with accurate test results and any observations about
              departures from BS 7671.
            </p>
            <p>
              The second scenario is a periodic inspection of an existing
              installation. You carry out a visual inspection and testing of an
              installation that has been in service, identify any defects or
              non-compliance, assign appropriate observation codes (C1, C2, C3,
              or FI), determine the overall assessment (Satisfactory or
              Unsatisfactory), and complete an Electrical Installation Condition
              Report (EICR).
            </p>
            <p>
              In both scenarios, assessors are looking for several things: that
              you follow the correct testing sequence, that you perform safe
              isolation properly, that your test instrument readings are
              accurate and consistent, that you identify defects correctly, that
              you assign the appropriate observation codes, and that your
              documentation is complete and accurate. Elec-Mate scenario
              walkthroughs simulate both types of assessment so you arrive
              prepared and confident.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Helps */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Helps You Pass the 2391
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Studying for the 2391 alongside a full-time job is challenging.
              You need a study method that fits around your work schedule and
              gives you access to the information you need when you need it.
              Elec-Mate provides exactly that.
            </p>
            <p>
              The AI study assistant is available 24/7 and can answer any
              question about inspection and testing procedures, BS 7671
              regulations, GN3 guidance, or documentation requirements. Unlike
              a textbook, the assistant explains concepts in plain language and
              can give you examples relevant to the specific type of
              installation you are studying. Ask it to explain the difference
              between Zs and Ze, to walk you through the ring final circuit
              continuity test, or to clarify when an FI code is appropriate
              instead of a C2. It responds instantly with clear, regulation-
              referenced answers.
            </p>
            <p>
              The mock exam questions are drawn from the full 2391 syllabus and
              are designed to mirror the style and difficulty of the real
              examination. Each question includes a detailed explanation of the
              correct answer, with references to the relevant regulations and
              guidance notes. Timed practice exams help you build the speed and
              confidence needed for the real assessment.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Prepare for the 2391 Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to build your knowledge and confidence before the
            C&G 2391 examination and practical assessment.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">
                    {step.name}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About the C&G 2391
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Pass the 2391 with confidence"
        subheading="Join 430+ UK electricians studying for qualifications and growing their careers. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
