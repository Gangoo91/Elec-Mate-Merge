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
  Award,
  Target,
} from 'lucide-react';

const PAGE_TITLE =
  '2391 Inspection and Testing Course Online | C&G 2391-52 | Elec-Mate';
const PAGE_DESCRIPTION =
  'Study for the City & Guilds 2391-52 Inspection and Testing qualification online. AI-powered quiz prep, GN3 testing sequence walkthroughs, mock exams, and practical assessment guidance. From £4.99/mo.';

const faqs = [
  {
    question:
      'What is the difference between 2391-52, 2391-51, and the older 2394/2395?',
    answer:
      'The C&G 2391-52 (Inspection, Testing and Certification of Electrical Installations) is the current combined qualification that covers both initial verification and periodic inspection. It replaced the 2391-51, which itself replaced the older separate qualifications: C&G 2394 (Initial Verification) and C&G 2395 (Periodic Inspection and Testing). The key difference is that the 2391-52 includes a stronger focus on certification and documentation, requiring candidates to demonstrate competence in completing EICs, EICRs, and Minor Works certificates accurately. If you hold both the 2394 and 2395, this is generally considered equivalent to the 2391, though some employers and scheme providers may prefer the newer qualification. All new candidates should take the 2391-52.',
  },
  {
    question:
      'What are the prerequisites for enrolling on the C&G 2391-52 course?',
    answer:
      'To enrol on the 2391-52, you should hold the C&G 2382 (18th Edition IET Wiring Regulations) or equivalent, and ideally have practical experience of electrical installation work. Most training providers also recommend a Level 3 qualification in Electrical Installation (such as the C&G 2365-03 or 2357) or equivalent experience. A solid understanding of BS 7671:2018+A3:2024 is essential, as the 2391-52 builds directly on the regulations covered in the 18th Edition course. Some providers may accept significant industry experience in lieu of formal Level 3 qualifications, but this varies. The written examination and practical assessment both assume familiarity with installation design, cable selection, and protective device coordination.',
  },
  {
    question: 'How is the 2391-52 exam structured?',
    answer:
      'The 2391-52 assessment consists of two main components. The first is a written examination (online multiple-choice and short-answer questions) lasting approximately two hours, covering the theory of inspection and testing, BS 7671 regulation references, safe isolation procedures, testing instrument operation, the GN3 testing sequence, documentation requirements, and observation code assignment. The second component is a practical assessment, typically lasting three to four hours, where you carry out inspection and testing on a real or simulated installation and complete the relevant certification (EIC for initial verification, EICR for periodic inspection). Both components must be passed to achieve the qualification.',
  },
  {
    question:
      'What is the GN3 testing sequence and why does the order of tests matter?',
    answer:
      'GN3 (Guidance Note 3: Inspection & Testing, published by the IET) specifies the correct sequence of electrical tests: continuity of protective conductors, continuity of ring final circuit conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD testing. The order matters because each test validates the safety conditions required for the next. For example, you confirm the earth path is continuous (continuity) before applying high-voltage insulation resistance tests, and you confirm insulation is sound before energising the circuit for live tests like earth loop impedance and RCD testing. Performing tests out of sequence could damage equipment, produce misleading results, or create a safety hazard. Understanding the rationale behind the sequence is heavily tested in both the written and practical components of the 2391-52.',
  },
  {
    question: 'How does Elec-Mate help me prepare for the 2391-52 practical?',
    answer:
      'Elec-Mate provides interactive scenario walkthroughs that simulate both initial verification and periodic inspection scenarios. Each scenario guides you through the visual inspection, the correct testing sequence from GN3, instrument selection and operation, recording test results, identifying defects, assigning observation codes (C1, C2, C3, FI), and completing the relevant certification. The AI study assistant can answer questions about any regulation or procedure in real time, and the mock exam feature includes hundreds of questions covering the full 2391-52 syllabus. The app also includes a pre-assessment checklist covering instrument calibration, GS 38 lead compliance, and documentation preparation so you arrive at the practical fully ready.',
  },
  {
    question:
      'What observation codes are used on an EICR and what do they mean?',
    answer:
      'Observation codes on an Electrical Installation Condition Report (EICR) classify the severity of defects found during periodic inspection. C1 (Danger Present) means there is an immediate risk of injury and the defect requires urgent remedial action. C2 (Potentially Dangerous) means the defect could become dangerous and should be remedied as soon as possible. C3 (Improvement Recommended) identifies areas where the installation does not comply with the current edition of BS 7671 but does not present an immediate danger. FI (Further Investigation) means that a potential defect has been identified but further investigation is needed to determine its nature and severity. The overall assessment of the installation is Satisfactory only if there are no C1 or C2 observations. Correct observation code assignment is a key assessment criterion in the 2391-52 practical.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Quiz Preparation',
    description:
      'Hundreds of 2391-52 practice questions with AI-generated explanations. Each answer includes BS 7671 regulation references and GN3 cross-references for deep understanding.',
  },
  {
    icon: TestTube2,
    title: 'GN3 Testing Sequence',
    description:
      'Interactive walkthroughs of the complete Guidance Note 3 testing sequence. Understand why each test is performed in order and what results to expect at each stage.',
  },
  {
    icon: ClipboardCheck,
    title: 'Certificate Practice',
    description:
      'Practise completing EICs, EICRs, and Minor Works certificates with validation. The app flags missing fields, incorrect entries, and common documentation mistakes.',
  },
  {
    icon: Search,
    title: 'Scenario Walkthroughs',
    description:
      'Realistic initial verification and periodic inspection scenarios. Domestic rewires, commercial fit-outs, and older installations with genuine defects to identify and code.',
  },
  {
    icon: FileCheck2,
    title: 'Observation Code Training',
    description:
      'Learn to assign C1, C2, C3, and FI codes correctly. Scenario-based exercises present real defects and challenge you to classify them with proper justification.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 Regulation Lookup',
    description:
      'Instant access to BS 7671:2018+A3:2024 regulation references. Search by number, topic, or keyword. The AI explains regulations in plain language with practical examples.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: '2391-52 Inspection and Testing Course Online',
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
    'C&G 2382 (18th Edition IET Wiring Regulations) and practical electrical installation experience',
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
      name: '2391 Inspection and Testing',
      item: 'https://elec-mate.com/training/city-guilds-2391',
    },
  ],
};

export default function CityGuilds2391Page() {
  useSEO({
    title: '2391 Inspection and Testing Course Online | C&G 2391-52',
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
              C&G 2391-52 Preparation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Study for the{' '}
            <span className="text-yellow-400">C&G 2391-52</span> Online
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            AI-powered quiz prep, GN3 testing sequence walkthroughs, scenario
            simulations, and certificate practice. Everything you need to pass
            the Inspection and Testing qualification first time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#what-is-2391"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Learn About the 2391-52
            </a>
          </div>
        </div>
      </section>

      {/* What Is the 2391-52 */}
      <section id="what-is-2391" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the C&G 2391-52 Qualification?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The City & Guilds 2391-52, officially titled "Inspection, Testing
              and Certification of Electrical Installations," is the current
              industry-standard qualification for electricians who carry out
              inspection and testing of electrical installations in the United
              Kingdom. It replaced the earlier 2391-51 and, before that, the
              separate 2394 (Initial Verification) and 2395 (Periodic Inspection
              and Testing) qualifications.
            </p>
            <p>
              The 2391-52 demonstrates that you have the knowledge and practical
              skills to carry out two distinct types of inspection and testing.
              The first is initial verification — the inspection and testing of
              new installations or alterations before they are energised and
              handed over to the client. The second is periodic inspection and
              testing — the assessment of existing installations that are already
              in service, to identify deterioration, damage, defects, and
              departures from the current edition of BS 7671:2018+A3:2024.
            </p>
            <p>
              The qualification is essential for any electrician who wants to
              work independently and certify their own installations. Without
              the 2391-52 (or its predecessor equivalents), you cannot join a
              competent person scheme such as NICEIC, NAPIT, or ELECSA as a
              qualified supervisor. Without scheme membership, you cannot
              self-certify notifiable electrical work under Part P of the
              Building Regulations in England and Wales, meaning your clients
              would need to involve their local authority building control for
              every job — an additional cost and delay that most clients will
              not accept.
            </p>
            <p>
              The 2391-52 also underpins your ability to issue Electrical
              Installation Certificates (EICs) for new work and Electrical
              Installation Condition Reports (EICRs) for periodic inspections.
              Since the Electrical Safety Standards in the Private Rented Sector
              (England) Regulations 2020 made five-yearly EICRs mandatory for
              all rented properties, the demand for qualified inspection and
              testing professionals has increased significantly. Holding the
              2391-52 opens a lucrative revenue stream for self-employed
              electricians and small contractors.
            </p>
          </div>
        </div>
      </section>

      {/* Who Needs the 2391-52 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Needs the 2391-52?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The 2391-52 is relevant to several groups within the electrical
              industry. Understanding whether you need it helps you plan your
              career development and training investment effectively.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Electricians seeking scheme registration:</strong> All
                  major competent person schemes (NICEIC, NAPIT, ELECSA, STROMA)
                  require the 2391-52 or equivalent for their Qualified
                  Supervisor role. This is the person who takes technical
                  responsibility for the quality of electrical work carried out
                  by the business.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Electricians wanting to carry out EICRs:</strong> The
                  landlord EICR market is substantial and growing. To carry out
                  periodic inspections professionally and issue EICRs, you must
                  demonstrate competence through the 2391-52. This is both a
                  regulatory expectation and a practical requirement — insurers
                  and letting agents will typically only accept EICRs from
                  2391-52 qualified electricians.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Apprentices completing their training:</strong> Many
                  apprentices take the 2391-52 shortly after completing their
                  Level 3 qualification and AM2 assessment. It is the natural
                  next step to becoming fully independent and is often required
                  by employers before they will allow an electrician to sign off
                  their own work.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Electricians pursuing the JIB Approved Electrician card:</strong> The
                  JIB Approved Electrician grading (often called the Grade Card)
                  requires the 2391-52 in addition to the Gold Card qualifications.
                  It demonstrates a higher level of competence and is increasingly
                  requested on commercial and industrial contracts.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exam Structure */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            2391-52 Exam Structure: Written and Practical
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The 2391-52 assessment is divided into two components, both of
              which must be passed to achieve the full qualification. Understanding
              the structure and marking criteria gives you a significant advantage
              in your preparation.
            </p>
            <p>
              <strong>Component 1: Written Examination.</strong> The written paper
              is a closed-book examination lasting approximately two hours. It
              includes a mixture of multiple-choice questions and short-answer
              questions. Topics covered include safe isolation procedures and
              their regulatory basis (HSE Guidance Note GS 38 and the Electricity
              at Work Regulations 1989), the full GN3 testing sequence with
              rationale for the test order, BS 7671:2018+A3:2024 regulation
              references relevant to inspection and testing (particularly Chapter
              61 for initial verification and Chapter 62 for periodic inspection),
              testing instrument selection, operation, and calibration requirements,
              documentation requirements for EICs, EICRs, Minor Electrical
              Installation Works Certificates, and Schedule of Inspections and
              Test Results, and observation code assignment and overall condition
              assessment.
            </p>
            <p>
              <strong>Component 2: Practical Assessment.</strong> The practical
              assessment lasts approximately three to four hours and is carried
              out at an approved assessment centre. You are presented with one or
              two installations (one for initial verification, one for periodic
              inspection) and must carry out a thorough inspection and testing
              procedure, record your findings accurately, and produce the correct
              certification. Assessors evaluate your safe isolation technique,
              adherence to the GN3 testing sequence, accuracy of instrument
              readings, identification of defects, correct observation code
              assignment, and completeness of documentation.
            </p>
            <p>
              The practical assessment is where many candidates struggle, often
              not because of a lack of knowledge but because of nerves, poor
              time management, or unfamiliarity with the documentation format.
              Elec-Mate addresses all three issues: the scenario walkthroughs
              build confidence through repetition, the timed practice sessions
              develop your pace, and the certificate practice forms ensure you
              can complete every section of every document without hesitation.
            </p>
          </div>
        </div>
      </section>

      {/* Initial Verification vs Periodic I&T */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Initial Verification vs Periodic Inspection and Testing
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A clear understanding of the differences between initial
              verification and periodic inspection is fundamental to the 2391-52.
              While both involve inspection and testing, their purpose, scope,
              and documentation differ significantly.
            </p>
            <p>
              <strong>Initial verification</strong> is carried out on new
              installations or alterations before they are energised and handed
              over to the client. It confirms that the installation has been
              designed, constructed, inspected, and tested in accordance with BS
              7671:2018+A3:2024. The process includes a detailed visual inspection
              against the design documentation (checking cable types, containment,
              accessory ratings, protective device coordination, and general
              workmanship), followed by the full GN3 testing sequence. The
              documentation produced is an Electrical Installation Certificate
              (EIC), which includes the design, construction, and inspection and
              testing sections, plus a Schedule of Inspections and a Schedule of
              Test Results.
            </p>
            <p>
              <strong>Periodic inspection and testing</strong> is carried out on
              existing installations that are already in service. Its purpose is
              to assess the condition of the installation by identifying any
              deterioration, damage, defects, or non-compliance with the current
              edition of BS 7671. This is particularly important because
              installations degrade over time — cable insulation deteriorates,
              connections become loose, accessories suffer wear, and previous
              alterations may not have been carried out competently. The process
              includes a visual inspection (as far as reasonably practicable
              without dismantling the installation beyond what is necessary),
              followed by testing, followed by the identification and coding of
              any observations. The documentation produced is an Electrical
              Installation Condition Report (EICR), which includes observation
              codes (C1, C2, C3, FI) and an overall condition assessment of
              Satisfactory or Unsatisfactory.
            </p>
            <p>
              A key difference in the testing is that periodic inspection may
              involve testing circuits that are already in service, which requires
              careful planning to minimise disruption to the occupants. The extent
              and limitations of the inspection must be agreed with the client
              beforehand and documented on the EICR. Initial verification, by
              contrast, is always carried out before the installation is energised,
              giving the inspector full access to all circuits without concern
              about disruption.
            </p>
          </div>
        </div>
      </section>

      {/* GN3 Testing Sequence */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The GN3 Testing Sequence for the 2391-52
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Guidance Note 3: Inspection & Testing (9th Edition, aligned with
              the 18th Edition of BS 7671) specifies the correct sequence of
              electrical tests. This sequence is not arbitrary — each test
              depends on the results of the previous test to ensure safety and
              accuracy. The 2391-52 exam tests your understanding of both the
              sequence itself and the reasoning behind it.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Continuity of Protective Conductors (R1+R2)',
                description:
                  'Using a low-resistance ohmmeter, measure the continuity of every circuit protective conductor back to the main earthing terminal. This confirms the earth path is intact before any further tests. The R1+R2 value is also used later to verify earth fault loop impedance by calculation.',
              },
              {
                step: '2',
                title: 'Continuity of Ring Final Circuit Conductors',
                description:
                  'For ring final circuits, the three-step cross-connection test confirms that line, neutral, and CPC conductors are all continuous rings without breaks or unauthorised spurs. Measured values at each socket should be consistent, confirming a healthy ring.',
              },
              {
                step: '3',
                title: 'Insulation Resistance',
                description:
                  'Apply 500V DC between live conductors and earth, and between line and neutral, using a calibrated insulation resistance tester. The minimum acceptable value is 1 megohm. This test detects damaged cable insulation, moisture ingress, and contamination before the circuit is energised.',
              },
              {
                step: '4',
                title: 'Polarity',
                description:
                  'Confirm that single-pole switching and protective devices are connected in the line conductor only. Polarity is typically verified during the R1+R2 continuity test using the wander lead method, ensuring all accessories are correctly wired.',
              },
              {
                step: '5',
                title: 'Earth Fault Loop Impedance (Zs)',
                description:
                  'This live test measures the total impedance of the earth fault loop at each circuit endpoint. The measured Zs must not exceed the maximum permitted value for the protective device (per BS 7671 tables) to ensure disconnection within 0.4s for final circuits or 5s for distribution circuits.',
              },
              {
                step: '6',
                title: 'Prospective Fault Current (PSCC/PEFC)',
                description:
                  'Measure the maximum prospective short-circuit current and prospective earth fault current at the origin. The measured values must not exceed the rated breaking capacity of the protective devices installed. This protects against catastrophic device failure under fault conditions.',
              },
              {
                step: '7',
                title: 'RCD Testing',
                description:
                  'Test each RCD at its rated residual operating current (typically 30mA) to confirm operation within 300ms, at five times rated current to confirm operation within 40ms, and at 50% rated current to confirm it does not trip. This is the final test as it requires the circuit to be live and energised.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Elec-Mate Helps */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Helps You Pass the 2391-52
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Studying for the 2391-52 while working full time is the reality
              for most electricians. You need a study method that fits around
              your schedule, delivers targeted content, and builds genuine
              confidence rather than just surface-level familiarity. Elec-Mate
              is designed specifically for this.
            </p>
            <p>
              The AI quiz preparation system generates questions covering the
              entire 2391-52 syllabus, adapting to your performance. When you
              answer incorrectly, the AI does not just tell you the right answer
              — it explains the underlying principle, cites the relevant BS 7671
              regulation, cross-references GN3, and offers a practical example
              to cement your understanding. Over time, the system identifies
              your weak areas and presents more questions in those topics,
              ensuring you spend your limited study time where it has the
              greatest impact.
            </p>
            <p>
              The scenario walkthroughs simulate the practical assessment
              experience. You are presented with a description of an
              installation, photographs of the consumer unit and distribution
              boards, a list of circuits, and a set of test results. You must
              identify which results are acceptable and which indicate a defect,
              assign the correct observation code, determine the overall
              condition assessment, and complete the certification accurately.
              This builds the decision-making skills that separate a confident
              pass from a nervous fail.
            </p>
            <p>
              Elec-Mate includes access to 70 electrical calculators, 8 Elec-AI
              agents plus 12 AI tools, 36 or more training courses, and 8
              certificate types. Whether you need to verify a Zs calculation,
              look up a maximum permitted earth fault loop impedance value, or
              practise completing an EIC from scratch, everything is in one
              platform. The app integrates with Xero and QuickBooks for
              electricians who are already managing their business through
              Elec-Mate, making it a single hub for both professional
              development and daily operations.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* 2391 vs 2394 vs 2395 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            2391-52 vs 2394 vs 2395: Which Do You Need?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              If you are new to inspection and testing qualifications, the
              landscape of qualification numbers can be confusing. Here is a
              clear summary of how they relate to each other and which one you
              should pursue.
            </p>
            <p>
              The <strong>C&G 2394</strong> (Initial Verification of Electrical
              Installations) was a standalone qualification covering the
              inspection and testing of new installations before they were
              energised. It taught candidates how to carry out initial
              verification and complete Electrical Installation Certificates.
              It has been withdrawn and is no longer available to new candidates.
            </p>
            <p>
              The <strong>C&G 2395</strong> (Periodic Inspection and Testing of
              Electrical Installations) was the companion qualification covering
              the inspection and testing of existing installations already in
              service. It taught candidates how to carry out periodic inspections
              and complete Electrical Installation Condition Reports. Like the
              2394, it has been withdrawn.
            </p>
            <p>
              The <strong>C&G 2391-51</strong> combined both areas into a single
              qualification. It was the transitional replacement for the 2394 and
              2395.
            </p>
            <p>
              The <strong>C&G 2391-52</strong> is the current version, with
              enhanced emphasis on certification and documentation accuracy. It
              is the only version available to new candidates. If you hold both
              the 2394 and 2395, most scheme providers consider this equivalent
              to the 2391. However, if you only hold one of the pair, you should
              take the 2391-52 to cover both areas. All new candidates should
              take the 2391-52.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">70+</p>
              <p className="text-sm text-white">Electrical Calculators</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Target className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">8 AI Agents</p>
              <p className="text-sm text-white">Plus 12 AI Tools</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">36+</p>
              <p className="text-sm text-white">Training Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About the C&G 2391-52
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
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
        heading="Pass the 2391-52 with confidence"
        subheading="Join 430+ UK electricians studying for qualifications and growing their careers. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
