import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  BookOpen,
  BrainCircuit,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Shield,
  Zap,
  Clock,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does it take to complete the 18th Edition course online?',
    answer:
      'Most electricians complete the BS 7671 course content in 20 to 40 hours of study, depending on prior experience. Because Elec-Mate is entirely self-paced, you can fit sessions around your working day. Our AI study assistant identifies weak areas early, so you spend less time on topics you already understand and more on the sections that need attention. Many users pass within four to six weeks of starting.',
  },
  {
    question: 'Does this course cover Amendment 3:2024 (A3:2024)?',
    answer:
      'Yes. Our content is fully updated for BS 7671:2018+A3:2024, which was published on 31 July 2024. Amendment 3 introduces Regulation 530.3.201 covering requirements for bidirectional and unidirectional protective devices, particularly relevant for solar PV and battery storage installations. Every quiz and practice exam in Elec-Mate reflects the latest regulation text.',
  },
  {
    question: 'Is online 18th Edition training accepted by NICEIC and NAPIT?',
    answer:
      'Elec-Mate is a study and revision platform, not a certification body. You still need to sit the City & Guilds 2382-22 exam (or equivalent) at an approved test centre. However, our comprehensive course material, AI-powered revision tools, and realistic practice exams prepare you thoroughly for that exam. Many users report passing first time after studying with Elec-Mate.',
  },
  {
    question: 'What is included in the subscription for the 18th Edition course?',
    answer:
      'Your subscription includes full access to all seven parts of BS 7671 study material, hundreds of practice questions mapped to the exam syllabus, an AI study assistant that answers your regulation queries in plain English, progress tracking dashboards, spaced-repetition flashcards, and timed mock exams. Everything starts with a 7-day free trial at no cost, then from just £4.99 per month.',
  },
  {
    question: 'What is the difference between the 17th and 18th Edition wiring regulations?',
    answer:
      'The 18th Edition (BS 7671:2018) replaced the 17th Edition (BS 7671:2008+A3:2015) on 1 January 2019. Key changes include updated requirements for arc fault detection devices (AFDDs) in Regulation 421.1.7, new surge protection requirements under Section 534, revised consumer unit metal enclosure rules, additional requirements for electric vehicle charging in Section 722, and updated special installation rules for solar PV systems. Amendment 2 (2022) and Amendment 3 (2024) have further refined these areas.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any BS 7671 question in plain English and get an instant, regulation-referenced answer. Our AI understands context, cross-references related clauses, and explains complex topics step by step.',
  },
  {
    icon: ClipboardCheck,
    title: 'Practice Exams',
    description:
      'Hundreds of multiple-choice questions modelled on the City & Guilds 2382-22 exam. Timed mock tests replicate real exam conditions so there are no surprises on test day.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Visual dashboards show your strengths and weak areas across all seven parts of BS 7671. Focus your revision where it matters most and track improvement over time.',
  },
  {
    icon: Zap,
    title: 'Spaced Repetition',
    description:
      'Flashcards powered by proven spaced-repetition algorithms ensure you remember key regulations long after you close the app. Perfect for retaining tricky numbering.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Access all course material on your phone, tablet, or desktop. Study during breaks on site, on the commute, or at home. Your progress syncs across every device automatically.',
  },
  {
    icon: Shield,
    title: 'Amendment 3 Updated',
    description:
      'Fully updated for BS 7671:2018+A3:2024 including the new Regulation 530.3.201 for bidirectional protective devices. Stay current with the latest requirements.',
  },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: '18th Edition Course Online - BS 7671 Training',
  description:
    'Comprehensive online training for BS 7671:2018 + Amendment 3:2024. AI-powered study assistant, practice exams, and progress tracking for UK electricians.',
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
    logo: 'https://elec-mate.com/logo.jpg',
  },
  educationalLevel: 'Professional',
  inLanguage: 'en-GB',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT40H',
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

export default function EighteenthEditionCoursePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: '18th Edition Course Online | BS 7671 Amendment 3 Training',
    description:
      'Study BS 7671:2018 + Amendment 3:2024 online. AI-powered study assistant, practice quizzes, and progress tracking. From £4.99/mo with 7-day free trial.',
    schema: {
      '@type': 'Course',
      name: '18th Edition Course Online',
      description:
        'BS 7671:2018 + Amendment 3:2024 training with AI study assistant',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://elec-mate.com',
      },
      educationalLevel: 'Professional',
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
                name: '18th Edition Course',
                item: 'https://elec-mate.com/training/18th-edition-course',
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
              Updated for Amendment 3:2024
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            18th Edition Course Online
            <br />
            <span className="text-yellow-400">BS 7671 Training</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Master BS 7671:2018 + Amendment 3:2024 with an AI-powered study
            platform built specifically for UK electricians. Practice exams,
            regulation search, progress tracking, and more.
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

      {/* What Is the 18th Edition */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the 18th Edition Wiring Regulations?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The 18th Edition of the IET Wiring Regulations, officially titled
              BS 7671:2018, is the national standard for electrical installation
              in the United Kingdom. Published jointly by the Institution of
              Engineering and Technology (IET) and the British Standards
              Institution (BSI), it sets out the rules that every electrical
              installation must follow to ensure safety, reliability, and
              compliance with UK law.
            </p>
            <p>
              BS 7671 is often referred to as the "brown book" due to its
              distinctive cover. It replaced the 17th Edition (BS 7671:2008) on
              1 January 2019 and has since been amended twice in its main cycle:
              Amendment 1 (2020), Amendment 2 (2022), and most recently
              Amendment 3 (2024). Every practising electrician, electrical
              engineer, and installation designer in the UK needs a thorough
              working knowledge of this standard.
            </p>
            <p>
              The standard is divided into seven parts covering general rules,
              definitions, assessment of general characteristics, protection for
              safety, selection and erection of equipment, inspection and
              testing, and special installations or locations. Together, these
              parts form a comprehensive framework that governs everything from
              domestic rewires to large commercial installations.
            </p>
          </div>
        </div>
      </section>

      {/* Amendment 3:2024 */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Changed in Amendment 3:2024?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671:2018+A3:2024 was issued on 31 July 2024 as a free PDF
              supplement to the existing standard. Unlike previous amendments
              that required purchasing a new edition, A3:2024 is a focused
              update that adds a single but significant new regulation:
              Regulation 530.3.201.
            </p>
            <p>
              Regulation 530.3.201 introduces requirements for the selection and
              erection of bidirectional and unidirectional switching and
              protective devices. This is directly relevant to the growing
              number of installations that involve energy generation and storage,
              particularly solar photovoltaic (PV) systems and battery energy
              storage systems (BESS). As more homes and businesses install solar
              panels and battery storage, the flow of electricity is no longer
              simply one-directional from the grid to the consumer. Current can
              now flow in both directions, and protective devices must be
              suitable for this scenario.
            </p>
            <p>
              The amendment clarifies that where a protective device may carry
              current in both directions, it must be rated and suitable for
              bidirectional operation, or alternatively, separate unidirectional
              devices must be installed for each direction of current flow.
              Electricians working on solar PV, battery storage, electric
              vehicle charging with vehicle-to-grid (V2G) capability, or any
              installation with embedded generation need to understand these
              requirements thoroughly.
            </p>
            <p>
              A further amendment, Amendment 4, is expected in 2026 and will
              likely address additional areas related to emerging technologies
              and installation practices.
            </p>
          </div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Needs the 18th Edition Qualification?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Every electrician working in the UK needs to hold the 18th Edition
              qualification, formally known as the City & Guilds 2382-22 (or
              equivalent awards from EAL and other awarding bodies). This
              qualification is a prerequisite for joining a competent person
              scheme such as NICEIC, NAPIT, ELECSA, or BRE, and is required for
              Part P compliance when carrying out notifiable electrical work in
              domestic properties in England and Wales.
            </p>
            <p>
              Beyond qualified electricians, the 18th Edition is also essential
              for electrical designers, consulting engineers, electrical
              contractors managing installation teams, building control
              officers, and anyone involved in the specification or approval of
              electrical installations. Apprentices working towards their Level 3
              Diploma in Electrical Installation will study BS 7671 as a core
              part of their training.
            </p>
            <p>
              If you hold a 17th Edition certificate, you must update to the
              18th Edition to maintain your competent person scheme membership.
              Most schemes require the update within a set timeframe of a new
              edition being published. Studying online allows you to prepare at
              your own pace without losing days on site.
            </p>
          </div>
        </div>
      </section>

      {/* What the Course Covers */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Does the Course Cover?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Elec-Mate 18th Edition course covers all seven parts of
              BS 7671:2018+A3:2024 in structured, easy-to-follow modules. Each
              module breaks down the regulation text into plain English
              explanations with practical examples drawn from real-world
              installations.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  part: 'Part 1',
                  title: 'Scope, Object & Fundamental Principles',
                },
                { part: 'Part 2', title: 'Definitions' },
                {
                  part: 'Part 3',
                  title: 'Assessment of General Characteristics',
                },
                { part: 'Part 4', title: 'Protection for Safety' },
                {
                  part: 'Part 5',
                  title: 'Selection & Erection of Equipment',
                },
                { part: 'Part 6', title: 'Inspection & Testing' },
                {
                  part: 'Part 7',
                  title: 'Special Installations or Locations',
                },
              ].map((item) => (
                <div
                  key={item.part}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                    <BookOpen className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-400 text-sm">
                      {item.part}
                    </p>
                    <p className="text-white text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>
              Part 4 (Protection for Safety) and Part 5 (Selection & Erection)
              typically form the bulk of exam questions, so our content goes
              deeper here with worked examples covering earth fault loop
              impedance calculations, disconnection times, RCD selection, cable
              sizing considerations, and the application of diversity factors.
              Part 7 covers special locations including bathrooms, swimming
              pools, construction sites, agricultural premises, marinas, solar
              PV installations (Section 712), and EV charging (Section 722).
            </p>
          </div>
        </div>
      </section>

      {/* Online vs Classroom */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Online Study vs Classroom Courses
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Traditional classroom-based 18th Edition courses typically run
              over three to five days and cost between £250 and £400, plus travel
              and time off work. While classroom training offers face-to-face
              interaction with a tutor, it forces you into a fixed schedule and
              pace that may not suit everyone.
            </p>
            <p>
              Studying online with Elec-Mate offers several distinct advantages.
              You study at your own pace, revisiting difficult sections as many
              times as needed. Our AI study assistant is available around the
              clock to answer questions instantly, something no classroom tutor
              can match. You can study on your phone during breaks on site, on a
              tablet at home, or on a desktop when you have a longer session.
              Your progress is tracked and synced across all devices.
            </p>
            <p>
              The cost difference is substantial. At just £4.99 per month with a
              7-day free trial, you get access to the full course plus all of
              Elec-Mate's other tools including EICR certification software,
              cable sizing calculators, and the electrician's AI assistant. Most
              users complete their 18th Edition preparation within one to two
              months, making the total cost a fraction of a classroom course.
            </p>
            <p>
              Remember that whether you study online or in a classroom, you will
              still need to sit the formal exam (such as City & Guilds 2382-22)
              at an approved test centre. What matters is how well prepared you
              are when you walk into that exam room, and that is where
              Elec-Mate's targeted revision tools, spaced repetition system, and
              realistic mock exams give you a genuine edge.
            </p>
          </div>
        </div>
      </section>

      {/* How AI Helps */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How the AI Study Assistant Helps You Learn
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate's AI study assistant is purpose-built for BS 7671
              training. Unlike generic AI chatbots, it has been trained on the
              full text of BS 7671:2018+A3:2024, Guidance Notes 1 through 8,
              the IET On-Site Guide, and thousands of exam-style questions with
              detailed explanations.
            </p>
            <p>
              When you ask a question like "What size RCD do I need for a
              bathroom circuit?", the AI does not just give you a number. It
              explains the relevant regulations (Regulation 701.411.3.3 for
              additional protection, Section 411 for automatic disconnection),
              the reasoning behind the requirement, and common installation
              scenarios where the answer might differ. It references the exact
              regulation numbers so you can look them up in your copy of
              BS 7671.
            </p>
            <p>
              The AI also adapts to your learning level. If you are an
              experienced electrician updating from the 17th Edition, it focuses
              on what has changed. If you are an apprentice encountering these
              regulations for the first time, it provides more foundational
              context. This personalised approach means you spend your study time
              efficiently, covering ground you actually need rather than sitting
              through material you already know.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Everything You Need to Pass
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            A complete study toolkit designed around how electricians actually
            learn and revise.
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
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">430+</p>
              <p className="text-sm text-white">UK Electricians</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <ClipboardCheck className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">2,500+</p>
              <p className="text-sm text-white">Practice Questions</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">7 Parts</p>
              <p className="text-sm text-white">Full BS 7671 Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Ready to master BS 7671?"
        subheading="Join 430+ UK electricians studying smarter with AI. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:hidden" />
    </PublicPageLayout>
  );
}
