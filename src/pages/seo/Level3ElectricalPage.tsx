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
  Target,
  Award,
  BarChart3,
  Search,
  Wrench,
} from 'lucide-react';

const PAGE_TITLE = 'Level 3 Electrical Installation Course Online | Advanced Diploma | Elec-Mate';
const PAGE_DESCRIPTION =
  'Study for the City & Guilds 2365-03 Level 3 Advanced Diploma in Electrical Installation online. Circuit design, inspection and testing, fault diagnosis, BS 7671 special locations. AI study assistant. From £4.99/mo.';

const faqs = [
  {
    question: 'What is the City & Guilds 2365-03 Level 3 qualification?',
    answer:
      'The City & Guilds 2365-03 is the Level 3 Diploma in Electrical Installation, also referred to as the Advanced Diploma. It builds on the Level 2 foundation and covers the advanced knowledge and skills required to work as a competent electrician. Key areas include circuit design and calculation (applying correction factors, cable sizing using the adiabatic equation, protective device selection), inspection and testing of electrical installations, fault diagnosis and rectification, and the detailed application of BS 7671:2018+A3:2024 including Part 7 special installations and locations. The Level 3 Diploma is a core component of the Installation Electrician apprenticeship standard (ST0215) and is required alongside the AM2 for the JIB Gold Card.',
  },
  {
    question: 'What are the prerequisites for the Level 3 Electrical course?',
    answer:
      "You must have completed the Level 2 Diploma in Electrical Installation (C&G 2365-02 or equivalent) before enrolling on the Level 3 course. A good understanding of electrical science fundamentals (Ohm's law, Kirchhoff's laws, AC theory, power calculations) is essential, as Level 3 builds directly on these concepts. You should also be comfortable with algebraic rearrangement and the use of technical data tables. Most apprentices study Level 3 during years two and three of their apprenticeship, gaining practical site experience in parallel. Career changers should ideally have some practical exposure to electrical installation work before starting Level 3.",
  },
  {
    question: 'What special installations does Level 3 cover?',
    answer:
      'Level 3 introduces Part 7 of BS 7671:2018+A3:2024, which covers special installations and locations that require additional protective measures beyond the general requirements. Key sections include: Section 701 (Locations containing a bath or shower — covering IP ratings, zones, supplementary bonding requirements, and restrictions on equipment within zones), Section 702 (Swimming pools and fountains), Section 704 (Construction and demolition site installations), Section 705 (Agricultural and horticultural premises), Section 708 (Caravan and camping parks), Section 711 (Exhibitions, shows, and stands), Section 712 (Solar photovoltaic power supply systems), and Section 722 (Electric vehicle charging installations). Each section specifies additional requirements that must be applied on top of the general regulations.',
  },
  {
    question: 'How does Level 3 prepare me for the AM2?',
    answer:
      'The AM2 practical assessment tests the skills developed during your Level 3 studies. The AM2 requires you to install a consumer unit, wire ring final and radial circuits, install one-way and two-way lighting circuits, carry out safe isolation and fault finding, and complete inspection and testing with accurate documentation. Level 3 provides the underpinning knowledge for every one of these tasks: circuit design principles ensure you understand why circuits are configured as they are, inspection and testing knowledge ensures you can verify your own work, and fault diagnosis skills prepare you for the fault-finding station. Elec-Mate provides dedicated AM2 preparation modules that bridge Level 3 theory to the practical assessment format.',
  },
  {
    question: 'What circuit design calculations are covered at Level 3?',
    answer:
      "Level 3 covers the full circuit design calculation process as specified in Appendix 4 of BS 7671 and the IET On-Site Guide. This includes: determining design current (Ib) from the connected load, selecting the appropriate protective device rating (In) where In must be greater than or equal to Ib, applying correction factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and BS 3036 semi-enclosed fuses (Cc) to determine the required current-carrying capacity (It), selecting the cable size from the appropriate current rating table, verifying voltage drop does not exceed the maximum permitted (typically 3% for lighting or 5% for other circuits), confirming the cable is protected against overload, verifying the earth fault loop impedance (Zs) does not exceed the maximum for the protective device, and checking the cable can withstand the thermal effects of fault current using the adiabatic equation (S = square root of (I squared t / k)). Elec-Mate's 70+ calculators include tools for every one of these steps.",
  },
  {
    question: 'What is the difference between Level 3 and the 18th Edition course?',
    answer:
      'The Level 3 Diploma (C&G 2365-03) is a comprehensive qualification covering the full range of skills and knowledge needed by an electrician, including installation design, practical skills, fault diagnosis, and inspection and testing. It typically takes one to two years to complete. The 18th Edition course (C&G 2382) is specifically focused on BS 7671:2018+A3:2024 wiring regulations. It is a shorter course (typically 3-5 days classroom or 4-8 weeks online) that ensures you understand the current regulations and can apply them in practice. Level 3 includes substantial BS 7671 content, but the 2382 is the dedicated regulations qualification. Most electricians hold both, as the 2382 must be renewed whenever a new edition of BS 7671 is published.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Design Assistant',
    description:
      'Input a circuit scenario and receive step-by-step design calculations. The AI applies correction factors, selects cables from BS 7671 tables, and verifies compliance.',
  },
  {
    icon: Search,
    title: 'Fault Diagnosis Training',
    description:
      'Systematic fault-finding exercises using the half-split method, symptom analysis, and logical elimination. Real-world scenarios covering open circuits, short circuits, and earth faults.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection & Testing',
    description:
      'Full coverage of the GN3 testing sequence with interactive walkthroughs. Learn initial verification and periodic inspection procedures with certification practice.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 Part 7 Modules',
    description:
      'Dedicated modules for every Part 7 special installation: bathrooms, swimming pools, construction sites, agricultural premises, solar PV, EV charging, and more.',
  },
  {
    icon: Target,
    title: 'AM2 Preparation',
    description:
      'Timed AM2 preparation exercises covering consumer unit installation, ring final circuits, lighting circuits, fault finding, and inspection and testing.',
  },
  {
    icon: BarChart3,
    title: 'Progress Dashboard',
    description:
      'Track your progress across every Level 3 module and assessment area. Visual indicators show which topics need more study time before your exam.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'Level 3 Electrical Installation Course Online - C&G 2365-03',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  educationalLevel: 'Intermediate',
  inLanguage: 'en-GB',
  courseMode: 'online',
  coursePrerequisites: 'Level 2 Diploma in Electrical Installation (C&G 2365-02 or equivalent)',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'P2Y',
  },
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
      name: 'Level 3 Electrical Installation',
      item: 'https://elec-mate.com/training/level-3-electrical',
    },
  ],
};

export default function Level3ElectricalPage() {
  useSEO({
    title: 'Level 3 Electrical Installation Course Online | Advanced Diploma',
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
            <span className="text-sm font-medium text-yellow-400">C&G 2365-03 Level 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Level 3 Electrical
            <br />
            <span className="text-yellow-400">Advanced Diploma</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Master circuit design, inspection and testing, fault diagnosis, and BS 7671 special
            locations. The advanced qualification that takes you from apprentice to qualified
            electrician.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#what-is-level-3"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              What Does Level 3 Cover?
            </a>
          </div>
        </div>
      </section>

      {/* What Is Level 3 */}
      <section id="what-is-level-3" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the Level 3 Advanced Diploma?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The City & Guilds 2365-03 Level 3 Diploma in Electrical Installation is the advanced
              qualification that transforms a foundation-level learner into a technically competent
              electrician. Where Level 2 introduces the fundamental principles, Level 3 develops the
              depth of knowledge and practical skill needed to design circuits, inspect and test
              installations independently, diagnose and rectify faults systematically, and apply the
              full scope of BS 7671:2018+A3:2024 including Part 7 special installations and
              locations.
            </p>
            <p>
              The Level 3 Diploma is a substantial qualification, typically studied over one to two
              years alongside practical experience on site. For apprentices, it forms the core of
              years two and three of the apprenticeship programme. The qualification maps directly
              to the technical knowledge requirements of the Installation Electrician / Maintenance
              Electrician apprenticeship standard (ST0215) and is assessed through a combination of
              written examinations and practical assignments.
            </p>
            <p>
              Achieving Level 3 is a major milestone because it is the last knowledge-based
              qualification before the AM2 practical assessment. Once you have Level 3 plus the AM2,
              plus the 18th Edition (C&G 2382), you are eligible for the JIB Installation
              Electrician Gold Card — the industry's benchmark for a fully qualified electrician.
              From there, the path continues to the 2391-52 (Inspection and Testing), scheme
              registration with NICEIC, NAPIT, or ELECSA, and potentially the JIB Approved
              Electrician grading.
            </p>
          </div>
        </div>
      </section>

      {/* Circuit Design */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Circuit Design and Calculation
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Circuit design is one of the most technically demanding areas of the Level 3
              qualification and one of the most important skills you will develop. A properly
              designed circuit is safe, efficient, and compliant with BS 7671:2018+A3:2024. A poorly
              designed circuit can be dangerous, wasteful, and non-compliant — potentially leading
              to overheating, fire, or failure of protective devices under fault conditions.
            </p>
            <p>
              The design process follows a logical sequence. First, determine the design current
              (Ib) from the connected load. For example, a 9.5 kW electric shower on a 230V
              single-phase supply has a design current of approximately 41.3A (I = P / V). Second,
              select a protective device with a nominal rating (In) equal to or greater than Ib — in
              this case, a 45A MCB. Third, apply correction factors to determine the minimum
              tabulated current-carrying capacity (It) the cable must have. These correction factors
              account for ambient temperature (Ca), grouping with other cables (Cg), thermal
              insulation (Ci), and the type of protective device if using BS 3036 semi-enclosed
              fuses (Cc).
            </p>
            <p>
              Fourth, select a cable from the appropriate current rating table in BS 7671 Appendix 4
              that has a tabulated rating equal to or greater than It. Fifth, verify that the
              voltage drop across the cable run does not exceed the maximum permitted value —
              typically 3% of the nominal voltage for lighting circuits (6.9V) or 5% for other
              circuits (11.5V). Sixth, confirm the earth fault loop impedance (Zs = Ze + R1 + R2)
              does not exceed the maximum value for the selected protective device, ensuring
              automatic disconnection within the required time (0.4s for final circuits, 5s for
              distribution circuits). Seventh, check the cable can withstand the thermal effects of
              fault current using the adiabatic equation.
            </p>
            <p>
              Elec-Mate's AI design assistant walks you through each step, pulling values from the
              correct BS 7671 tables and showing you exactly how each correction factor affects the
              final cable size. You can input your own scenarios — "Size a cable for a 32A ring
              final circuit with 28 metres of cable run, three other circuits grouped in the same
              conduit, ambient temperature 35 degrees Celsius" — and receive a fully worked
              calculation with regulation references. This kind of targeted practice is far more
              effective than memorising tables.
            </p>
          </div>
        </div>
      </section>

      {/* Inspection and Testing */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Inspection and Testing at Level 3
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Level 3 introduces the full inspection and testing procedures specified in Chapter 61
              (initial verification) and Chapter 62 (periodic inspection and testing) of BS
              7671:2018+A3:2024, and detailed in Guidance Note 3: Inspection & Testing (GN3, 9th
              Edition).
            </p>
            <p>
              The GN3 testing sequence — continuity of protective conductors, continuity of ring
              final circuit conductors, insulation resistance, polarity, earth fault loop impedance,
              prospective fault current, and RCD testing — is taught with emphasis on both the
              correct procedure and the reasoning behind the test order. You will learn how to use a
              multifunction tester to perform each test, how to interpret the results against the BS
              7671 maximum permitted values, and how to record results accurately on the Schedule of
              Test Results.
            </p>
            <p>
              Visual inspection is covered in detail, including what to look for when assessing an
              installation for compliance with BS 7671. The inspection checklist covers correct
              selection and erection of equipment, cable condition and routing, accessory condition
              and fixings, protective device ratings and coordination, earthing and bonding
              adequacy, labelling and identification, and compliance with any Part 7 special
              requirements applicable to the installation.
            </p>
            <p>
              Elec-Mate provides interactive scenario walkthroughs that simulate both initial
              verification and periodic inspection situations. Each scenario presents you with
              photographs, circuit details, and test results. You must identify defects, assign
              observation codes, determine the overall condition, and complete the relevant
              certification. The AI provides instant feedback on your decisions, citing the relevant
              BS 7671 regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Diagnosis */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Fault Diagnosis and Rectification
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Fault diagnosis is a core skill for any qualified electrician and is tested in both
              the Level 3 examination and the AM2 assessment. The ability to identify a fault
              quickly, safely, and systematically separates competent professionals from those who
              rely on trial and error.
            </p>
            <p>
              Level 3 teaches a structured approach to fault diagnosis. The first step is always
              safe isolation — following the three-step procedure (prove, test, re-prove) to ensure
              the circuit is dead before carrying out any investigation. The second step is to
              gather information: what are the symptoms, when did the fault occur, was anything
              changed recently, and what is the circuit configuration?
            </p>
            <p>
              The third step is systematic testing using logical methods. The half-split method
              divides the circuit into two halves and tests each to determine which half contains
              the fault, then divides the faulty half again, and so on until the fault location is
              identified. This is significantly faster than testing every component in sequence.
              Other diagnostic approaches include comparing measured values against expected values
              (for example, an unexpectedly high R1+R2 may indicate a high-resistance connection),
              visual inspection for signs of damage or deterioration, and insulation resistance
              testing to identify breakdown.
            </p>
            <p>
              Common fault types covered at Level 3 include open circuit faults (broken conductor,
              loose connection, blown fuse), short circuit faults (line-to-neutral or
              line-to-earth), earth faults (insulation breakdown causing current to flow to earth),
              and transient faults (intermittent problems that only occur under certain conditions
              such as thermal expansion or vibration). Elec-Mate presents realistic fault scenarios
              with multiple possible causes, challenging you to apply the systematic approach and
              arrive at the correct diagnosis through logical reasoning rather than guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* Special Installations */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            BS 7671 Part 7: Special Installations and Locations
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Part 7 of BS 7671:2018+A3:2024 specifies additional requirements for installations in
              locations where the risk of electric shock is increased due to environmental
              conditions, the presence of water, reduced body resistance, or other factors. These
              requirements are applied on top of the general regulations — they do not replace them.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '701',
                title: 'Locations Containing a Bath or Shower',
                description:
                  'Defines three zones (Zone 0, Zone 1, Zone 2) around baths and showers with specific IP rating requirements and restrictions on equipment installation. Covers supplementary bonding requirements (where still applicable), SELV limitations, and 30mA RCD protection for all circuits serving the location.',
              },
              {
                step: '704',
                title: 'Construction and Demolition Site Installations',
                description:
                  'Covers requirements for temporary installations on building sites including reduced low voltage (110V centre-tapped to earth), RCD protection, portable equipment requirements, and distribution assembly standards.',
              },
              {
                step: '712',
                title: 'Solar Photovoltaic (PV) Power Supply Systems',
                description:
                  'Covers the installation of solar PV systems including DC circuit protection, string isolation, inverter requirements, earthing of PV arrays, and labelling requirements. Amendment 3 (A3:2024) adds Regulation 530.3.201 covering bidirectional and unidirectional protective devices.',
              },
              {
                step: '722',
                title: 'Electric Vehicle Charging Installations',
                description:
                  'Covers the requirements for EV charging points including dedicated circuit requirements, PME earthing considerations (TT earthing may be required for outdoor charging points), RCD protection, cable sizing for continuous load, and smart charging protocol considerations.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-12 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AM2 and Gold Card */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            From Level 3 to the AM2 and Gold Card
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Level 3 is the final knowledge-based qualification before the AM2 practical
              assessment. The AM2 (Achievement Measurement 2), run by NET (National Electrotechnical
              Training) on behalf of the JIB (Joint Industry Board), is a practical assessment that
              tests your ability to carry out electrical installation work safely, competently, and
              to industry standards within time constraints.
            </p>
            <p>
              The AM2 covers consumer unit installation, ring final circuit wiring, one-way and
              two-way lighting circuit wiring, safe isolation and fault finding on a pre-built
              faulty circuit, and inspection and testing with accurate documentation. Every one of
              these tasks directly applies the knowledge and skills taught at Level 3. Elec-Mate
              provides dedicated AM2 preparation modules with timed exercises, common fault
              patterns, and assessment tips from electricians who have recently passed.
            </p>
            <p>
              Upon passing the AM2 alongside your Level 3 Diploma, NVQ Level 3 in Electrical
              Installation, and the current 18th Edition qualification (C&G 2382), you are eligible
              for the JIB Installation Electrician Gold Card. The Gold Card is the
              industry-recognised credential that confirms you are a fully qualified electrician,
              opening doors to employment with major contractors, self-employment, and progression
              to scheme registration and the Approved Electrician grading.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            How Elec-Mate Delivers Level 3
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Advanced tools for advanced learners. Design calculators, fault diagnosis simulators,
            and AI-powered study across every Level 3 topic.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
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
              <Wrench className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
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
            Frequently Asked Questions About Level 3 Electrical Installation
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
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Advance your electrical career"
        subheading="Join 430+ UK electricians studying for qualifications and building their futures. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
