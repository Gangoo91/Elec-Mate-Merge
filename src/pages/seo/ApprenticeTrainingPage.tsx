import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Award,
  BrainCircuit,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  FolderOpen,
  Clock,
  Users,
  Layers,
  Target,
  FileCheck,
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does an electrical apprenticeship take to complete?',
    answer:
      'A standard electrical installation apprenticeship in England takes between three and four years. This includes achieving the Level 2 Diploma in Electrical Installation, the Level 3 Diploma in Electrical Installation, functional skills in maths and English (if not already held), and the End Point Assessment (EPA). The AM2 practical assessment is typically taken towards the end of the programme. Some apprentices with prior qualifications or experience may complete in less time through accelerated pathways.',
  },
  {
    question: 'What is the AM2 assessment and how do I prepare for it?',
    answer:
      'The AM2 (Achievement Measurement 2) is a practical assessment run by the JIB and NET (National Electrotechnical Training) that tests your ability to carry out electrical installation work safely and competently. It is a two-day assessment covering single-phase installation, three-phase installation, fault diagnosis, safe isolation, and inspection and testing. Elec-Mate provides AM2 preparation resources including simulated scenarios, step-by-step procedure guides, common fault patterns, and timed practice sessions that mirror the real assessment format.',
  },
  {
    question: 'What is the 20% Off-the-Job Training requirement?',
    answer:
      'Under the apprenticeship funding rules in England, at least 20% of an apprentice\'s paid working hours must be spent on off-the-job training (OJT). This includes college attendance, online learning, study time, workshops, and any training that develops knowledge, skills, and behaviours required by the apprenticeship standard but is not part of normal day-to-day duties. Elec-Mate includes a built-in OJT hours tracker that logs your learning time automatically, generates reports for your employer and training provider, and ensures you meet the 20% minimum.',
  },
  {
    question: 'How does the EPA (End Point Assessment) work for electrical apprentices?',
    answer:
      'The End Point Assessment is the final stage of your apprenticeship, carried out by an independent assessment organisation. For the Installation Electrician / Maintenance Electrician standard, the EPA typically consists of a practical assessment (similar to the AM2), a knowledge test covering BS 7671 and electrical science, and a professional discussion based on your portfolio of evidence. Elec-Mate\'s EPA simulator uses AI grading to give you realistic practice across all three components, with detailed feedback on areas for improvement.',
  },
  {
    question: 'Can I use Elec-Mate alongside my college course?',
    answer:
      'Absolutely. Elec-Mate is designed to complement your college or training provider course, not replace it. Many apprentices use the platform to revise topics covered in class, practise with additional questions beyond their course materials, track their OJT hours, build their portfolio evidence, and prepare for the AM2 and EPA. Your employer or training provider can also view your progress reports to support your development reviews. The 7-day free trial lets you try everything before committing.',
  },
];

const features = [
  {
    icon: Layers,
    title: 'Level 2 & 3 Courses',
    description:
      'Structured course content covering the full Level 2 and Level 3 Diploma in Electrical Installation syllabuses. Every unit mapped to the apprenticeship standard.',
  },
  {
    icon: Target,
    title: 'AM2 Preparation',
    description:
      'Dedicated AM2 preparation modules with simulated practical scenarios, fault-finding exercises, safe isolation procedures, and timed assessment practice.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Graded EPA Simulator',
    description:
      'Practice End Point Assessment scenarios with AI that grades your responses, identifies weak areas, and provides detailed feedback matching real EPA marking criteria.',
  },
  {
    icon: FolderOpen,
    title: 'Portfolio Tracking',
    description:
      'Digital portfolio builder to capture evidence of competence. Photograph work, log site activities, link evidence to apprenticeship standard criteria, and export for assessment.',
  },
  {
    icon: Clock,
    title: 'OJT Hours Management',
    description:
      'Automatic off-the-job training hours tracking. Logs study time, generates weekly and monthly reports, calculates your 20% target, and alerts if you are falling behind.',
  },
  {
    icon: BarChart3,
    title: 'Progress Dashboard',
    description:
      'Visual progress tracking across every module, unit, and assessment area. See exactly where you stand and what to focus on next. Share progress with your employer.',
  },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Electrical Apprentice Training Online - Level 2, 3 & AM2',
  description:
    'Complete electrical apprentice training platform covering Level 2 & 3 Diplomas, AM2 preparation, EPA simulator with AI grading, portfolio tracking, and OJT hours management.',
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
    logo: 'https://elec-mate.com/logo.jpg',
  },
  educationalLevel: 'Beginner to Intermediate',
  inLanguage: 'en-GB',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'P3Y',
  },
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    validFrom: '2024-01-01',
    description: '7-day free trial, then from £4.99/month',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
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

export default function ApprenticeTrainingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'Electrical Apprentice Training Online | Level 2, 3 & AM2',
    description:
      'Complete electrical apprentice training platform. Level 2 & 3 courses, AM2 preparation, EPA simulator with AI grading, portfolio tracking, and OJT hours management.',
    schema: {
      '@type': 'Course',
      name: 'Electrical Apprentice Training Online',
      description:
        'Level 2 & 3 Diploma courses, AM2 preparation, EPA simulator with AI grading',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://elec-mate.com',
      },
      educationalLevel: 'Beginner to Intermediate',
    },
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://elec-mate.com/',
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
                name: 'Electrical Apprentice Training',
                item: 'https://elec-mate.com/training/electrical-apprentice',
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <GraduationCap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              Level 2, Level 3 & AM2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Electrical Apprentice
            <br />
            <span className="text-yellow-400">Training Online</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete training platform for electrical apprentices. Level 2
            and Level 3 courses, AM2 preparation, AI-graded EPA simulator,
            portfolio tracking, and off-the-job training hours management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signup"
              className="h-14 px-10 inline-flex items-center justify-center text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform"
            >
              Start 7-Day Free Trial
            </a>
            <span className="text-white text-sm">
              From £4.99/mo after trial — cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* The Apprenticeship Pathway */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Electrical Apprenticeship Pathway
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Becoming a qualified electrician through an apprenticeship is the
              most established route into the trade in the United Kingdom. The
              pathway is structured to take you from complete beginner to
              competent professional over three to four years, combining
              practical on-site experience with theoretical knowledge gained
              through college or online study.
            </p>
            <p>
              The standard apprenticeship pathway follows a clear progression:
              you begin with the Level 2 Diploma in Electrical Installation,
              advance to the Level 3 Diploma, complete the AM2 practical
              assessment, pass your End Point Assessment (EPA), and achieve your
              JIB grading as a qualified Installation Electrician or Maintenance
              Electrician. Each stage builds on the last, and Elec-Mate supports
              you through every step of this journey.
            </p>
          </div>

          {/* Pathway Steps */}
          <div className="mt-8 space-y-4">
            {[
              {
                step: '1',
                title: 'Level 2 Diploma in Electrical Installation',
                description:
                  'Foundation knowledge covering electrical science, health and safety, installation methods, and basic wiring systems. Typically completed in the first year.',
              },
              {
                step: '2',
                title: 'Level 3 Diploma in Electrical Installation',
                description:
                  'Advanced training in design, inspection and testing, fault diagnosis, BS 7671 wiring regulations, and special installations. Completed over years two and three.',
              },
              {
                step: '3',
                title: 'AM2 Practical Assessment',
                description:
                  'Two-day practical assessment covering single-phase and three-phase installation, safe isolation, fault finding, and inspection and testing to industry standards.',
              },
              {
                step: '4',
                title: 'End Point Assessment (EPA)',
                description:
                  'Independent assessment consisting of a practical test, knowledge exam, and professional discussion with portfolio evidence review.',
              },
              {
                step: '5',
                title: 'JIB Grading',
                description:
                  'Upon successful completion, you receive your JIB ECS card as an Installation Electrician or Maintenance Electrician, confirming your status as a qualified professional.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                  <span className="text-yellow-400 font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
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

      {/* Level 2 Detail */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Level 2 Diploma: Building Your Foundation
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Level 2 Diploma in Electrical Installation (often the City &
              Guilds 2365-02 or equivalent) is your starting point. This
              qualification covers the fundamental knowledge and skills every
              electrician needs before progressing to more advanced work. It is
              typically studied during the first year of your apprenticeship
              alongside practical experience on site.
            </p>
            <p>
              Core units include electrical science and principles (Ohm's law,
              Kirchhoff's laws, power factor, impedance), health and safety in
              electrical installation (risk assessment, safe working practices,
              PPE requirements), electrical installation technology (cable types,
              containment systems, wiring methods), and basic installation
              practice (terminations, connections, circuit testing).
            </p>
            <p>
              Elec-Mate's Level 2 content breaks each unit into bite-sized
              lessons with worked examples, interactive diagrams, and practice
              questions. The AI study assistant helps you understand difficult
              concepts like AC circuit theory by explaining them in practical
              terms related to real installations you will encounter on site. You
              can study on your phone during quiet moments at work or at home in
              the evening, building your knowledge steadily without falling
              behind.
            </p>
          </div>
        </div>
      </section>

      {/* Level 3 Detail */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Level 3 Diploma: Advancing Your Skills
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Level 3 Diploma in Electrical Installation (City & Guilds
              2365-03 or equivalent) builds significantly on your Level 2
              foundation. This is where you develop the depth of knowledge and
              practical competence required to work independently and take
              responsibility for the quality and compliance of your own
              installations.
            </p>
            <p>
              Key areas at Level 3 include electrical installation design
              (calculating cable sizes, applying correction factors, determining
              protective device ratings), inspection and testing of electrical
              installations (initial verification, periodic inspection, test
              sequences and expected results), fault diagnosis and rectification
              (systematic approaches to identifying and repairing faults), and
              the full application of BS 7671:2018+A3:2024 wiring regulations.
            </p>
            <p>
              Level 3 also introduces special installations and locations
              covered by Part 7 of BS 7671, including bathrooms (Section 701),
              swimming pools (Section 702), construction sites (Section 704),
              agricultural premises (Section 705), solar PV systems (Section
              712), and electric vehicle charging (Section 722). Elec-Mate
              provides dedicated modules for each special location with
              regulation references, installation diagrams, and scenario-based
              practice questions.
            </p>
            <p>
              At this stage, the AI study assistant becomes particularly
              valuable for working through design calculations. You can input a
              scenario such as "I need to size a cable for a 32A ring final
              circuit in a domestic property with 30 metres of cable run and
              thermal insulation at one cross point" and receive a step-by-step
              calculation following the adiabatic equation and the tabulated
              values from BS 7671 Appendix 4.
            </p>
          </div>
        </div>
      </section>

      {/* EPA Section */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            End Point Assessment: How It Works
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The End Point Assessment (EPA) is the final gateway of your
              apprenticeship. It is carried out by an independent End Point
              Assessment Organisation (EPAO) and is designed to confirm that you
              have achieved the knowledge, skills, and behaviours defined in the
              apprenticeship standard. For the Installation Electrician /
              Maintenance Electrician standard (ST0215), the EPA typically
              comprises three components.
            </p>
            <p>
              The first component is a practical assessment, similar in format
              to the AM2, where you demonstrate your ability to install, test,
              and commission electrical circuits under timed conditions. The
              second is a knowledge test covering BS 7671, electrical science,
              installation design principles, and health and safety legislation.
              The third is a professional discussion, where an assessor reviews
              your portfolio of evidence and asks questions about your
              on-the-job experiences, problem-solving approaches, and
              professional development.
            </p>
            <p>
              Elec-Mate's EPA simulator replicates all three components. The AI
              grading system assesses your practical scenario responses against
              the same criteria used by real EPAOs, provides detailed feedback on
              each knowledge question with regulation references, and conducts a
              simulated professional discussion that challenges you to articulate
              your competence clearly. This means you arrive at your real EPA
              having practised the exact format multiple times, with a clear
              understanding of what the assessors are looking for.
            </p>
          </div>
        </div>
      </section>

      {/* OJT Section */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Off-the-Job Training Hours: Meeting the 20% Requirement
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Under the apprenticeship funding rules set by the Education and
              Skills Funding Agency (ESFA), every apprentice must spend a
              minimum of 20% of their paid working hours on off-the-job training
              (OJT). This is a mandatory requirement, and failure to meet it can
              result in funding being withdrawn from your employer and training
              provider.
            </p>
            <p>
              Off-the-job training includes any learning activity that
              contributes to achieving the apprenticeship standard but takes
              place away from your normal day-to-day work duties. This
              encompasses college or training centre attendance, online study
              sessions, workshops, shadowing experienced electricians in a
              learning context, attending trade shows or CPD events, and
              structured self-study using approved resources.
            </p>
            <p>
              Keeping accurate records of OJT hours is essential but often
              overlooked until it becomes a problem at progress reviews.
              Elec-Mate's OJT hours management feature solves this by
              automatically logging your study time on the platform, allowing you
              to manually add hours from college attendance or other training
              activities, calculating your running total against the 20% target
              based on your contracted hours, generating formatted reports for
              your employer and training provider, and sending alerts when you
              are at risk of falling below the minimum. This means no more
              scrambling to fill in a paper logbook before your quarterly review.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Portfolio Evidence Tracking
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Your portfolio of evidence is a critical part of the apprenticeship
              and EPA process. It demonstrates the breadth and depth of your
              practical experience, linking real work activities to the
              knowledge, skills, and behaviour requirements of the apprenticeship
              standard. A well-organised portfolio makes a strong impression
              during the professional discussion component of your EPA.
            </p>
            <p>
              Elec-Mate's portfolio tracker lets you capture evidence directly
              from your phone on site. Photograph completed work, log the
              details of each installation or task, tag the evidence against
              specific criteria from the apprenticeship standard, and add
              reflective notes about what you learned. Over time, the platform
              builds a comprehensive, well-structured portfolio that clearly
              demonstrates your progression from novice to competent
              professional.
            </p>
            <p>
              The AI assistant can review your portfolio entries and suggest
              areas where you might be missing evidence, ensuring you have
              coverage across all the required criteria before your EPA. It can
              also help you write better reflective statements by prompting you
              with questions like "What specific regulation did this work comply
              with?" or "What would you do differently if you encountered this
              scenario again?"
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Built for Apprentices
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            Every tool an electrical apprentice needs, from day one of Level 2
            through to EPA and JIB grading.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left touch-manipulation h-auto min-h-[44px]"
                >
                  <span className="font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-yellow-400 shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">Level 2 & 3</p>
              <p className="text-sm text-white">Full Diploma Coverage</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <FileCheck className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">AM2 + EPA</p>
              <p className="text-sm text-white">Assessment Preparation</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">430+</p>
              <p className="text-sm text-white">UK Electricians</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Start your apprenticeship journey"
        subheading="Join 430+ UK electricians and apprentices learning smarter. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:hidden" />
    </PublicPageLayout>
  );
}
