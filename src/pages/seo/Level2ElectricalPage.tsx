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
  Layers,
  Award,
  BarChart3,
  Lightbulb,
  Cable,
} from 'lucide-react';

const PAGE_TITLE =
  'Level 2 Electrical Installation Course Online | C&G 2365 | Elec-Mate';
const PAGE_DESCRIPTION =
  'Study for the City & Guilds 2365-02 Level 2 Diploma in Electrical Installation online. AI study assistant, interactive modules covering electrical science, installation methods, earthing and bonding. From £4.99/mo.';

const faqs = [
  {
    question: 'What is the City & Guilds 2365-02 Level 2 qualification?',
    answer:
      'The City & Guilds 2365-02 is the Level 2 Diploma in Electrical Installation. It is the foundation qualification for anyone entering the electrical trade, covering the essential knowledge and skills needed before progressing to Level 3. The qualification includes units on electrical science (Ohm\'s law, Kirchhoff\'s laws, power, impedance), health and safety in the electrical industry, electrical installation technology (cable types, containment, wiring systems), and basic installation practice. It is typically studied during the first year of an electrical apprenticeship or as a standalone course for career changers. The 2365-02 maps to the technical knowledge requirements of the Installation Electrician / Maintenance Electrician apprenticeship standard (ST0215).',
  },
  {
    question: 'Can I study for Level 2 Electrical Installation online?',
    answer:
      'The theoretical content of the Level 2 qualification can be studied online, and many learners choose this route because it allows flexible study around work or other commitments. Elec-Mate provides comprehensive Level 2 course materials with AI-powered explanations, interactive diagrams, worked calculations, and practice questions for every unit. However, the practical assessment components must be completed in person at a registered centre. You will need to demonstrate practical skills such as terminating cables, wiring circuits, and using test instruments under supervised conditions. The best approach is to build your theoretical knowledge online and then attend a training centre for the practical elements.',
  },
  {
    question: 'How long does the Level 2 Electrical Installation course take?',
    answer:
      'As part of an apprenticeship, the Level 2 Diploma is typically completed in the first year, with one or two days per week at college or a training centre and the remainder on site with your employer. As a standalone full-time course, it can be completed in 16 to 20 weeks. Part-time or evening courses may take 9 to 12 months. Online study with Elec-Mate allows you to work through the theoretical content at your own pace, with most learners completing the theory in 8 to 16 weeks alongside their practical training. The total guided learning hours for the 2365-02 are approximately 300 hours.',
  },
  {
    question: 'What career progression is available after Level 2?',
    answer:
      'After completing Level 2, the natural progression is to the Level 3 Diploma in Electrical Installation (C&G 2365-03 or equivalent), which covers advanced topics including circuit design, inspection and testing, fault diagnosis, and the full application of BS 7671. Beyond Level 3, the pathway continues to the AM2 practical assessment, the End Point Assessment (for apprentices), and then professional registration with a competent person scheme. With Level 2 alone, you can work as an electrical operative under supervision, but you cannot work independently or certify your own work. Level 3 combined with the AM2 leads to the JIB Gold Card (Installation Electrician), which is the industry benchmark for a fully qualified electrician.',
  },
  {
    question: 'What maths do I need for the Level 2 Electrical course?',
    answer:
      'You need a solid grasp of GCSE-level mathematics, particularly algebra (rearranging formulae), working with units and prefixes (milliamps, kilowatts, megohms), fractions and decimals, and basic trigonometry for AC circuit theory. The electrical science units at Level 2 require you to apply Ohm\'s law (V=IR), calculate power (P=IV, P=I squared R, P=V squared /R), work with series and parallel resistor combinations, and understand basic AC concepts including frequency, period, and peak versus RMS values. Elec-Mate\'s AI study assistant is particularly helpful here, breaking down each calculation into step-by-step workings and explaining the practical significance of each formula in the context of real installations.',
  },
  {
    question: 'Is Level 2 Electrical Installation enough to work as an electrician?',
    answer:
      'No. Level 2 alone does not qualify you to work as an independent electrician. It provides the foundational knowledge, but you need to progress to Level 3, complete the AM2 practical assessment (or equivalent), and achieve an NVQ Level 3 in Electrical Installation to be recognised as a fully qualified electrician. With Level 2 only, you can work as a supervised electrical operative, carry out basic installation tasks under the direction of a qualified electrician, and continue your training towards Level 3. Many employers and contractors value the Level 2 as evidence of commitment to the trade, even if you have not yet completed the full qualification pathway.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description:
      'Ask questions about any topic in the Level 2 syllabus. The AI explains electrical science concepts, installation methods, and safety requirements in plain language with worked examples.',
  },
  {
    icon: Lightbulb,
    title: 'Electrical Science Modules',
    description:
      'Interactive lessons covering Ohm\'s law, Kirchhoff\'s laws, power calculations, AC theory, impedance, and power factor. Each module includes step-by-step worked examples.',
  },
  {
    icon: Cable,
    title: 'Installation Methods',
    description:
      'Comprehensive coverage of cable types, containment systems, wiring methods, and termination techniques. Visual guides show real-world applications on domestic and commercial sites.',
  },
  {
    icon: ShieldCheck,
    title: 'Health & Safety',
    description:
      'Full coverage of electrical safety legislation, risk assessment, safe isolation procedures, PPE requirements, and the Electricity at Work Regulations 1989.',
  },
  {
    icon: ClipboardCheck,
    title: 'Practice Assessments',
    description:
      'Hundreds of practice questions mapped to each unit of the 2365-02 syllabus. Timed mock assessments simulate the real examination format with instant marking and feedback.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Visual dashboards show your progress across every module and unit. Identify weak areas at a glance and focus your study time where it will have the most impact.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'Level 2 Electrical Installation Course Online - C&G 2365-02',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
  },
  educationalLevel: 'Beginner',
  inLanguage: 'en-GB',
  courseMode: 'online',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT300H',
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
      name: 'Level 2 Electrical Installation',
      item: 'https://elec-mate.com/training/level-2-electrical',
    },
  ],
};

export default function Level2ElectricalPage() {
  useSEO({
    title: 'Level 2 Electrical Installation Course Online | C&G 2365',
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
              C&G 2365-02 Level 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Level 2 Electrical
            <br />
            <span className="text-yellow-400">Installation Course</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Build your foundation in electrical installation. AI-powered study
            materials covering electrical science, health and safety,
            installation methods, earthing and bonding. Start your career in the
            electrical trade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#what-is-level-2"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              What Does Level 2 Cover?
            </a>
          </div>
        </div>
      </section>

      {/* What Is Level 2 */}
      <section id="what-is-level-2" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the Level 2 Diploma in Electrical Installation?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The City & Guilds 2365-02 Level 2 Diploma in Electrical
              Installation is the starting qualification for anyone entering the
              electrical trade. It is the first major stepping stone on the path
              to becoming a fully qualified electrician, providing the
              foundational knowledge in electrical science, safety, and
              installation practice that everything else builds upon.
            </p>
            <p>
              The qualification is designed for electrical apprentices in their
              first year, career changers entering the electrical industry, and
              anyone who wants to develop a thorough understanding of how
              electrical installations work before progressing to more advanced
              study. It is nationally recognised, maps to the apprenticeship
              standard for Installation Electrician / Maintenance Electrician
              (ST0215), and is accepted by employers across the United Kingdom.
            </p>
            <p>
              At Level 2, you are not yet expected to design circuits, carry out
              inspection and testing independently, or work without supervision.
              Instead, the qualification ensures you understand the fundamental
              principles that make electrical installations safe: why we earth
              and bond, how protective devices work, what happens when a fault
              occurs, how to select the correct cable for a given application,
              and how to carry out basic installation work competently and
              safely. This foundation is essential because everything you learn
              at Level 3 and beyond assumes you have mastered these concepts.
            </p>
          </div>
        </div>
      </section>

      {/* Module Breakdown */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Level 2 Module Breakdown
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              The 2365-02 is divided into several core units, each covering a
              critical area of knowledge for an electrical installer. Here is
              what each module covers and why it matters.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Health and Safety in Electrical Installation',
                description:
                  'Covers the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, CDM Regulations 2015, risk assessment procedures, method statements, PPE requirements, manual handling, working at height, and asbestos awareness. This unit ensures you understand the legal framework and practical safety measures that protect you and others on site. You will learn safe isolation procedures — the three-step process of proving your voltage indicator, testing the circuit dead, and re-proving — which forms the basis of all electrical work.',
              },
              {
                step: '2',
                title: 'Electrical Science and Principles',
                description:
                  'Covers atomic theory, electron flow, conductors and insulators, Ohm\'s law, Kirchhoff\'s voltage and current laws, series and parallel circuits, resistance, power and energy calculations, magnetism and electromagnetic induction, AC theory including frequency, period, peak and RMS values, impedance, reactance, and power factor. This is often the most challenging unit for learners without a strong maths background. Elec-Mate\'s AI study assistant breaks every formula down step-by-step and shows how each calculation applies to real installations.',
              },
              {
                step: '3',
                title: 'Electrical Installation Technology',
                description:
                  'Covers cable types and construction (T&E, SWA, MICC, FP cables), cable ratings and current-carrying capacity, containment systems (trunking, conduit, cable tray, basket), wiring systems and methods, accessory types and applications, consumer units and distribution boards, circuit protection (MCBs, RCDs, RCBOs, fuses), and basic circuit configurations (radial, ring, lighting). This unit bridges the gap between theory and practice, showing you what real installations look like and how components are selected.',
              },
              {
                step: '4',
                title: 'Earthing and Bonding',
                description:
                  'Covers the purpose of earthing, types of earthing systems (TN-S, TN-C-S, TT), main protective bonding conductors, supplementary bonding, the earth fault loop path, the role of the circuit protective conductor (CPC), and the relationship between earthing and automatic disconnection of supply. This unit is fundamental to understanding electrical safety — without effective earthing, protective devices cannot operate correctly under fault conditions. You will learn why Regulation 411.3 of BS 7671:2018+A3:2024 requires automatic disconnection of supply as the primary protective measure.',
              },
              {
                step: '5',
                title: 'Basic Installation Practice',
                description:
                  'Covers cable preparation and termination techniques, connection of accessories (sockets, switches, light fittings), basic circuit wiring (ring final circuits, radial circuits, one-way and two-way lighting), use of conduit and trunking, marking and labelling, and basic testing (continuity, insulation resistance, polarity). This practical unit is assessed at a training centre but the underlying knowledge can be thoroughly prepared online.',
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

      {/* Who Is Level 2 For */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Is the Level 2 Course For?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Level 2 Diploma is suitable for several groups of learners.
              Whether you are just starting out or looking to formalise existing
              knowledge, the qualification provides a structured pathway into
              the electrical industry.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>New apprentices:</strong> If you have just started an
                  electrical apprenticeship, the Level 2 Diploma forms the
                  theory component of your first year. College attendance covers
                  the practical elements, while Elec-Mate reinforces the theory
                  so you understand the principles behind what you practise in
                  the workshop and on site.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Career changers:</strong> Adults transitioning from
                  other trades or industries into electrical work often start
                  with the Level 2 as a full-time or part-time course. It
                  provides the foundational knowledge needed to work alongside
                  experienced electricians and begin gaining site experience.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Existing tradespeople:</strong> Plumbers, gas
                  engineers, and other building services professionals sometimes
                  study Level 2 to add electrical skills to their offering.
                  While Level 2 alone does not qualify you to carry out
                  electrical work independently, it gives you a thorough
                  understanding of electrical systems in properties where you
                  already work.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>DIY enthusiasts (knowledge only):</strong> Some
                  individuals study Level 2 to understand the electrical
                  installations in their own properties, even without intending
                  to become professional electricians. This knowledge helps you
                  communicate effectively with electricians and understand the
                  work being carried out.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Electrical Science Deep Dive */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Electrical Science: The Heart of Level 2
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The electrical science unit is the most academically demanding
              part of the Level 2 qualification, and it is also the most
              important. Every calculation you will perform as an electrician —
              from sizing cables to verifying earth fault loop impedance — is
              built on the principles taught in this unit.
            </p>
            <p>
              <strong>Ohm's law</strong> (V = I x R) is the starting point.
              You will use it constantly: to calculate the current flowing in a
              circuit given the voltage and resistance, to determine the voltage
              drop across a cable run, and to verify test results during
              inspection and testing. Elec-Mate's AI assistant can generate
              unlimited practice problems, adjusting the difficulty as your
              confidence grows.
            </p>
            <p>
              <strong>Kirchhoff's laws</strong> extend Ohm's law to complex
              circuits. Kirchhoff's Current Law states that the total current
              entering a junction equals the total current leaving it.
              Kirchhoff's Voltage Law states that the sum of voltage drops
              around any closed loop equals the supply voltage. These laws
              explain how current distributes itself in parallel circuits and
              why adding loads to a ring final circuit affects the current in
              each leg.
            </p>
            <p>
              <strong>AC theory</strong> introduces the additional complexity
              of alternating current. You will learn about frequency (50 Hz in
              the UK), the relationship between peak and RMS values (V_RMS =
              V_peak divided by the square root of 2, giving 230V RMS from
              approximately 325V peak), impedance (the combination of
              resistance and reactance in AC circuits), and power factor (the
              ratio of real power to apparent power). While Level 2 introduces
              these concepts at a foundation level, they become critical at
              Level 3 when you begin designing circuits and selecting protective
              devices.
            </p>
            <p>
              Elec-Mate delivers each of these topics through bite-sized
              lessons with animated diagrams, interactive calculators that let
              you adjust values and see the effect instantly, and practice
              questions that build from simple to complex. The AI study
              assistant explains concepts in practical terms: instead of just
              stating Kirchhoff's Voltage Law as a formula, it shows you a real
              ring final circuit and demonstrates how voltage drops around the
              ring, making the abstract concrete.
            </p>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Career Progression After Level 2
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Level 2 is the beginning of a well-defined career pathway.
              Understanding what comes next helps you plan your training and
              set realistic goals for your professional development.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Level 3 Diploma (C&G 2365-03)',
                description:
                  'Advanced study covering circuit design, inspection and testing, fault diagnosis, BS 7671 application, and special installations. Typically completed in years two and three of an apprenticeship.',
              },
              {
                step: '2',
                title: 'AM2 Practical Assessment',
                description:
                  'The industry-standard practical assessment run by NET/JIB. Demonstrates your ability to install, test, and commission electrical circuits safely and competently.',
              },
              {
                step: '3',
                title: '18th Edition (C&G 2382)',
                description:
                  'The BS 7671:2018+A3:2024 wiring regulations qualification. Required for all practising electricians and updated with each new amendment.',
              },
              {
                step: '4',
                title: '2391-52 Inspection and Testing',
                description:
                  'The qualification to inspect, test, and certify electrical installations. Required for scheme membership and independent certification.',
              },
              {
                step: '5',
                title: 'JIB Gold Card & Scheme Registration',
                description:
                  'With Level 3, AM2, 18th Edition, and the 2391-52, you can apply for the JIB Installation Electrician (Gold Card) and register with NICEIC, NAPIT, or ELECSA.',
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

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            How Elec-Mate Delivers Level 2
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Every tool a Level 2 learner needs to build a rock-solid foundation
            in electrical installation.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Layers className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">36+</p>
              <p className="text-sm text-white">Training Courses</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">70+</p>
              <p className="text-sm text-white">Electrical Calculators</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">8 AI Agents</p>
              <p className="text-sm text-white">Plus 12 AI Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Level 2 Electrical Installation
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
        heading="Start your electrical career today"
        subheading="Join 430+ UK electricians and apprentices learning smarter. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
