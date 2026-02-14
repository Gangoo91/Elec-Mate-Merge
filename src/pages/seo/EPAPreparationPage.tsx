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
  MessageSquare,
  FileCheck2,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical EPA Preparation | End Point Assessment Simulator | Elec-Mate';
const PAGE_DESCRIPTION =
  'Prepare for the electrical apprenticeship End Point Assessment with AI-graded simulators. Practice knowledge tests, practical assessments, and professional discussions. ST0215 standard. From £4.99/mo.';

const faqs = [
  {
    question: 'What is the End Point Assessment (EPA) for electrical apprentices?',
    answer:
      'The End Point Assessment (EPA) is the final independent assessment at the end of an electrical apprenticeship in England. It is carried out by an approved End Point Assessment Organisation (EPAO) and is designed to confirm that you have achieved the knowledge, skills, and behaviours defined in the apprenticeship standard. For the Installation Electrician / Maintenance Electrician standard (ST0215), the EPA consists of three components: a practical assessment, a knowledge test, and a professional discussion with portfolio review. You must pass all three components to achieve the apprenticeship. The EPA is separate from the AM2, Level 3, and 18th Edition qualifications — it is an additional, overarching assessment of your readiness to work as a competent professional.',
  },
  {
    question: 'What is the ST0215 apprenticeship standard?',
    answer:
      'ST0215 is the reference number for the Installation Electrician / Maintenance Electrician apprenticeship standard, published by the Institute for Apprenticeships and Technical Education (IfATE). The standard defines the knowledge, skills, and behaviours that an apprentice must demonstrate to be considered occupationally competent. Knowledge areas include electrical science, BS 7671 wiring regulations, health and safety legislation, installation design, inspection and testing, and fault diagnosis. Skills include practical installation, inspection and testing, safe isolation, fault finding, and certification. Behaviours include professionalism, communication, team working, and commitment to continuing professional development. The EPA assesses the apprentice against all of these requirements.',
  },
  {
    question: 'What are the gateway requirements for the EPA?',
    answer:
      'Before you can attempt the EPA, you must pass through the "gateway." The gateway requirements for the Installation Electrician / Maintenance Electrician standard typically include: completion of the Level 3 Diploma in Electrical Installation (or equivalent), achievement of Level 2 Functional Skills in English and maths (if not already held), completion of the AM2 practical assessment, a portfolio of evidence demonstrating on-the-job competence across the apprenticeship standard criteria, confirmation from your employer that you are ready for the EPA, and meeting the minimum 20% off-the-job training hours requirement. Your employer and training provider must agree that you are "at or above the level required" before the EPA can be booked. Elec-Mate helps you track all of these requirements and identify any gaps before you reach the gateway.',
  },
  {
    question: 'How is the EPA graded?',
    answer:
      'The EPA for the electrical apprenticeship standard is graded as Distinction, Pass, or Fail. To achieve a Pass, you must meet the required standard in all three components (practical assessment, knowledge test, and professional discussion). To achieve a Distinction, you must exceed the standard across all components, demonstrating deeper knowledge, more refined practical skills, and stronger professional behaviours. The grading criteria are defined in the EPA assessment plan published by IfATE. A Fail in any single component means you have not achieved the apprenticeship, though most EPAOs allow a resit opportunity for the failed component(s). Elec-Mate\'s EPA simulator mirrors the grading criteria used by real EPAOs so you know exactly what "distinction level" looks like.',
  },
  {
    question: 'How long does the EPA take to complete?',
    answer:
      'The three EPA components are typically completed over one to two days, depending on the EPAO and the scheduling arrangements. The practical assessment takes approximately three to four hours, the knowledge test takes approximately two hours, and the professional discussion takes approximately 45 to 60 minutes. There may be breaks between components. Some EPAOs complete all three components in a single day, while others spread them across two sessions. The total EPA window (from booking to completion) is usually within three months of passing through the gateway. Preparing thoroughly before the gateway ensures you are ready to complete the EPA promptly.',
  },
  {
    question: 'Can I practise for the professional discussion component?',
    answer:
      "Yes, and you should — the professional discussion is the component that many apprentices find most unfamiliar because it is unlike any exam they have taken before. During the discussion, an assessor reviews your portfolio of evidence and asks open-ended questions about your on-the-job experiences, your understanding of technical concepts in context, how you handled challenging situations, and your professional development activities. Elec-Mate's EPA simulator includes an AI-powered professional discussion module that asks questions based on your portfolio entries, evaluates the depth and quality of your responses, and provides feedback on how to articulate your competence more clearly. Practising this format multiple times builds the confidence and fluency that assessors are looking for.",
  },
];

const features = [
  {
    icon: ClipboardCheck,
    title: 'Practical Assessment Simulator',
    description:
      'Timed practical scenarios mirroring the real EPA format. Install, test, and commission circuits under assessment conditions with AI grading against the ST0215 marking criteria.',
  },
  {
    icon: Brain,
    title: 'Knowledge Test Practice',
    description:
      'Hundreds of practice questions covering BS 7671, electrical science, installation design, health and safety, and inspection and testing. Timed mock tests simulate the real exam.',
  },
  {
    icon: MessageSquare,
    title: 'Professional Discussion Prep',
    description:
      'AI-powered professional discussion simulator. The AI asks portfolio-based questions, evaluates your responses, and coaches you to articulate competence clearly and confidently.',
  },
  {
    icon: FileCheck2,
    title: 'Portfolio Review',
    description:
      'The AI reviews your portfolio entries against the apprenticeship standard criteria, identifies gaps in evidence coverage, and suggests additional entries to strengthen your submission.',
  },
  {
    icon: Target,
    title: 'Distinction Criteria Guide',
    description:
      'Clear breakdown of what separates a Pass from a Distinction in each EPA component. Targeted advice on demonstrating the deeper knowledge and behaviours assessors look for.',
  },
  {
    icon: BarChart3,
    title: 'Readiness Dashboard',
    description:
      'Visual tracker showing your readiness across all three EPA components and all gateway requirements. Know exactly when you are ready to book your assessment.',
  },
];

const courseSchema = {
  '@type': 'Course',
  name: 'Electrical EPA Preparation - End Point Assessment Simulator',
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
    'Level 3 Diploma in Electrical Installation, AM2 assessment, and portfolio of evidence',
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
      name: 'EPA Preparation',
      item: 'https://elec-mate.com/training/epa-preparation',
    },
  ],
};

export default function EPAPreparationPage() {
  useSEO({
    title: 'Electrical EPA Preparation | End Point Assessment Simulator',
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
            <span className="text-sm font-medium text-yellow-400">ST0215 EPA Preparation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            End Point Assessment
            <br />
            <span className="text-yellow-400">Simulator</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            AI-graded simulators for all three EPA components: practical assessment, knowledge test,
            and professional discussion. Prepare to pass — or achieve a Distinction — with targeted
            practice and detailed feedback.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#what-is-epa"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              What Is the EPA?
            </a>
          </div>
        </div>
      </section>

      {/* What Is the EPA */}
      <section id="what-is-epa" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the End Point Assessment?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The End Point Assessment (EPA) is the final stage of the electrical apprenticeship in
              England. It is an independent assessment carried out by an approved End Point
              Assessment Organisation (EPAO) — not your training provider or employer. This
              independence ensures that the assessment is impartial and that all apprentices are
              measured against the same national standard.
            </p>
            <p>
              For the Installation Electrician / Maintenance Electrician apprenticeship standard
              (ST0215), the EPA is designed to confirm that you have achieved the full range of
              knowledge, skills, and behaviours defined in the standard. It goes beyond testing
              individual qualifications (Level 3, AM2, 18th Edition) and assesses your overall
              occupational competence — your ability to apply everything you have learned in a
              professional context.
            </p>
            <p>
              The EPA was introduced as part of the reformed apprenticeship standards in England.
              Under the old framework, apprenticeships were assessed through individual
              qualifications alone. The new standards add the EPA as a holistic, summative
              assessment that confirms the apprentice is genuinely ready to work as a competent
              professional. This is a higher bar than simply collecting qualifications, and it is
              why dedicated EPA preparation is so valuable.
            </p>
            <p>
              You cannot attempt the EPA until you have passed through the gateway, which requires
              completion of all mandatory qualifications (Level 3, AM2, functional skills), a
              comprehensive portfolio of evidence, and agreement from both your employer and
              training provider that you are ready. Elec-Mate tracks all of these gateway
              requirements so you know exactly where you stand at every point in your
              apprenticeship.
            </p>
          </div>
        </div>
      </section>

      {/* The 3 EPA Components */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Three EPA Components Explained
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              The EPA for the electrical apprenticeship standard consists of three distinct
              components, each assessing different aspects of your competence. You must pass all
              three to achieve the apprenticeship.
            </p>
          </div>
          <div className="space-y-6">
            {/* Component 1: Practical */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Practical Assessment</h3>
                  <p className="text-white text-sm">Approximately 3-4 hours</p>
                </div>
              </div>
              <div className="space-y-3 text-white leading-relaxed">
                <p>
                  The practical assessment is similar in format to the AM2 but is assessed by the
                  EPAO rather than NET/JIB. You demonstrate your ability to carry out electrical
                  installation work safely, competently, and in accordance with BS 7671:2018+A3:2024
                  under timed conditions.
                </p>
                <p>
                  Typical tasks include installing and wiring a consumer unit, wiring a ring final
                  circuit, installing a lighting circuit (one-way and two-way switching), carrying
                  out safe isolation and fault diagnosis on a pre-built faulty circuit, and
                  performing inspection and testing on your completed work with accurate
                  documentation. Assessors evaluate your workmanship, safety practices, time
                  management, and the accuracy of your test results and certificates.
                </p>
                <p>
                  Elec-Mate's practical assessment simulator presents timed scenarios that mirror
                  the EPA format. The AI grading system evaluates your responses against the same
                  criteria used by real EPAOs, providing detailed feedback on areas for improvement.
                </p>
              </div>
            </div>

            {/* Component 2: Knowledge Test */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Knowledge Test</h3>
                  <p className="text-white text-sm">Approximately 2 hours</p>
                </div>
              </div>
              <div className="space-y-3 text-white leading-relaxed">
                <p>
                  The knowledge test is a written examination covering the theoretical knowledge
                  requirements of the apprenticeship standard. Topics include BS 7671:2018+A3:2024
                  wiring regulations, electrical science and principles, installation design
                  calculations, inspection and testing procedures and documentation, health and
                  safety legislation (Health and Safety at Work Act 1974, Electricity at Work
                  Regulations 1989, CDM Regulations 2015), and fault diagnosis methodology.
                </p>
                <p>
                  The test format typically includes multiple-choice questions, short-answer
                  questions, and scenario-based questions that require you to apply your knowledge
                  to realistic situations. Unlike the Level 3 exams, which test individual units in
                  isolation, the EPA knowledge test can draw on any area of the standard, so your
                  preparation must be comprehensive.
                </p>
                <p>
                  Elec-Mate's knowledge test practice bank includes hundreds of questions covering
                  the full ST0215 standard. Each question includes a detailed explanation of the
                  correct answer with regulation references, and timed mock tests help you build the
                  speed and confidence needed for the real assessment.
                </p>
              </div>
            </div>

            {/* Component 3: Professional Discussion */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Professional Discussion with Portfolio
                  </h3>
                  <p className="text-white text-sm">Approximately 45-60 minutes</p>
                </div>
              </div>
              <div className="space-y-3 text-white leading-relaxed">
                <p>
                  The professional discussion is a structured conversation between you and the
                  assessor, using your portfolio of evidence as the basis for questions. This is not
                  a viva or oral exam — it is a discussion designed to explore the depth of your
                  understanding, your ability to reflect on your experiences, and your professional
                  behaviours.
                </p>
                <p>
                  The assessor will review your portfolio entries and ask questions such as:
                  "Describe a challenging installation you completed and explain how you ensured it
                  complied with BS 7671," "What would you do differently if you encountered this
                  situation again?" and "How do you keep your technical knowledge up to date?" The
                  assessor is looking for evidence of critical thinking, self-awareness,
                  professionalism, and genuine understanding rather than rote-learned responses.
                </p>
                <p>
                  This component is often the one that catches apprentices off guard because it is
                  unlike any exam format they have experienced before. Elec-Mate's AI-powered
                  professional discussion simulator replicates the format, asking portfolio-based
                  questions, evaluating the quality and depth of your responses, and coaching you to
                  express your competence clearly. Practising multiple times transforms an
                  unfamiliar format into a comfortable conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grading Criteria */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            EPA Grading: Pass, Distinction, and Fail
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The EPA is graded overall as Distinction, Pass, or Fail. The grading is determined by
              your performance across all three components, assessed against the criteria published
              in the EPA assessment plan for the ST0215 standard.
            </p>
            <p>
              <strong>Pass:</strong> To achieve a Pass, you must meet the required standard in all
              three components. This means demonstrating competent practical skills, accurate
              knowledge, and appropriate professional behaviours. Your work must be safe, your
              documentation must be accurate, and your professional discussion must demonstrate
              genuine understanding of your role and responsibilities.
            </p>
            <p>
              <strong>Distinction:</strong> To achieve a Distinction, you must exceed the standard
              across all components. In the practical assessment, this means exceptional
              workmanship, efficient time management, and thorough documentation beyond the minimum
              required. In the knowledge test, it means demonstrating deeper understanding — not
              just knowing the correct answer but understanding the reasoning and being able to
              apply it to unfamiliar scenarios. In the professional discussion, it means
              articulating your experiences with insight, demonstrating proactive professional
              development, and showing leadership behaviours such as mentoring others or taking
              initiative on technical challenges.
            </p>
            <p>
              <strong>Fail:</strong> A Fail in any single component means you have not achieved the
              apprenticeship at this attempt. Most EPAOs allow one resit opportunity for the failed
              component(s), which must be taken within a specified timeframe. A resit after failing
              one component can achieve a maximum grade of Pass (Distinction is no longer
              available). This makes first-time preparation crucial, which is exactly what
              Elec-Mate's EPA simulator is designed to deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Gateway Requirements */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Gateway Requirements: Are You Ready?
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Before you can book your EPA, you must pass through the gateway. The gateway is a
              checkpoint that confirms you have completed all the prerequisites and are genuinely
              ready for the final assessment. Here are the requirements you must meet.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Level 3 Diploma in Electrical Installation',
                description:
                  'Completion of the C&G 2365-03 or equivalent, covering circuit design, inspection and testing, fault diagnosis, and BS 7671 application.',
              },
              {
                step: '2',
                title: 'AM2 Practical Assessment',
                description:
                  'Successful completion of the AM2, demonstrating practical competence in installation, testing, and fault finding under timed conditions.',
              },
              {
                step: '3',
                title: 'Level 2 Functional Skills (English & Maths)',
                description:
                  'Achievement of Level 2 Functional Skills in both English and maths, or equivalent qualifications (such as GCSEs at grade 4/C or above).',
              },
              {
                step: '4',
                title: 'Portfolio of Evidence',
                description:
                  'A comprehensive portfolio mapping your on-the-job experience to the apprenticeship standard criteria. Must demonstrate breadth and depth across all knowledge, skills, and behaviour requirements.',
              },
              {
                step: '5',
                title: '20% Off-the-Job Training Hours',
                description:
                  'Documented evidence that you have met the minimum 20% off-the-job training requirement throughout your apprenticeship, as required by the ESFA funding rules.',
              },
              {
                step: '6',
                title: 'Employer and Training Provider Agreement',
                description:
                  'Both your employer and training provider must confirm that you are working at or above the level required by the apprenticeship standard and are ready for the EPA.',
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
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
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
            Complete EPA Preparation Tools
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Simulators for all three EPA components, gateway tracking, and AI-powered coaching to
            help you achieve the best possible grade.
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
              <p className="text-2xl font-bold text-white mb-1">3 Components</p>
              <p className="text-sm text-white">All Simulated with AI</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Target className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">ST0215</p>
              <p className="text-sm text-white">Standard Aligned</p>
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
            Frequently Asked Questions About the Electrical EPA
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
        heading="Ace your End Point Assessment"
        subheading="Join 430+ UK electricians and apprentices preparing for assessments and qualifications. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
