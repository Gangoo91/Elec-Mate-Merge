import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  GraduationCap,
  PlayCircle,
  Trophy,
  Users,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical Training Hub | Apprentice, 18th Edition, AM2 and 2391';
const PAGE_DESCRIPTION =
  'Explore Elec-Mate training pages for electrical apprentices and qualified electricians: 18th Edition, AM2, inspection and testing, 2391, Level 2, Level 3, EPA preparation, and the Study Centre.';

const features = [
  {
    icon: GraduationCap,
    title: 'Apprentice entry points',
    description:
      'A clear starting point for Level 2, Level 3, AM2, EPA, portfolio support, and early-career electrician content.',
  },
  {
    icon: ClipboardCheck,
    title: 'Qualified electrician CPD',
    description:
      'Training pages also support inspection and testing, 18th Edition, 2391, and refreshers for experienced users.',
  },
  {
    icon: Brain,
    title: 'Learn and apply',
    description:
      'Study the topic, then apply it through calculators, certificates, and practical site workflows.',
  },
  {
    icon: PlayCircle,
    title: 'Study Centre support',
    description:
      'The training hub should reinforce the Study Centre as a public-facing learning destination, not a hidden feature.',
  },
  {
    icon: Users,
    title: 'Employers and teams',
    description:
      'Training content can support apprentices, supervisors, and employers who want visibility into progress and standards.',
  },
  {
    icon: Trophy,
    title: 'Exam-intent traffic',
    description:
      'AM2, 18th Edition, and 2391 searches are high-value because users often need ongoing support after the first visit.',
  },
];

const trainingCollections = [
  {
    heading: 'Core training pages',
    links: [
      { href: '/training/18th-edition-course', label: '18th Edition Course' },
      { href: '/training/electrical-apprentice', label: 'Electrical Apprentice Training' },
      { href: '/training/am2-exam-preparation', label: 'AM2 Exam Preparation' },
      { href: '/training/inspection-and-testing', label: 'Inspection and Testing' },
    ],
  },
  {
    heading: 'Qualification support',
    links: [
      { href: '/training/city-guilds-2391', label: 'City & Guilds 2391' },
      { href: '/training/level-2-electrical', label: 'Level 2 Electrical' },
      { href: '/training/level-3-electrical', label: 'Level 3 Electrical' },
      { href: '/training/epa-preparation', label: 'EPA Preparation' },
    ],
  },
  {
    heading: 'Study and progression',
    links: [
      { href: '/training/apprentice-portfolio', label: 'Apprentice Portfolio' },
      { href: '/study-centre', label: 'Study Centre' },
      { href: '/tools/ai-electrician', label: 'AI Learning Tools' },
      { href: '/best-electrician-app', label: 'Best Electrician App Overview' },
    ],
  },
];

const faqs = [
  {
    question: 'Who is the Elec-Mate training hub for?',
    answer:
      'It is designed for electrical apprentices, newly qualified electricians, and experienced electricians doing CPD or specialist upskilling.',
  },
  {
    question: 'What can I learn here?',
    answer:
      'You can work through apprentice training, 18th Edition, AM2, inspection and testing, 2391, EPA preparation, and ongoing revision support.',
  },
  {
    question: 'Does training content connect back into the app?',
    answer:
      'Yes. Once you sign up, you can move from training into the Study Centre, calculators, certificates, and AI support inside Elec-Mate.',
  },
];

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'Electrical Training Hub',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/training',
};

export default function TrainingHubPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schemas: [collectionSchema, SEOSchemas.faqPage(faqs)],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Training', url: '/training' },
    ],
    dateModified: '2026-04-12',
    author: 'Elec-Mate Technical Team',
  });

  return (
    <PublicPageLayout>
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Training and Study</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Training for <span className="text-yellow-400">Apprentices and Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Find the right Elec-Mate training route for apprentice study, exam preparation, CPD,
            and skills refreshers. Everything here is designed to help you learn faster and keep
            progressing in the trade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#training-collections"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl transition-colors"
            >
              Browse Training Pages
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Training for every stage</h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            Whether you are starting out or topping up your knowledge, this hub ties together pages
            like{' '}
            <SEOInternalLink href="/training/18th-edition-course">18th Edition</SEOInternalLink>,{' '}
            <SEOInternalLink href="/training/am2-exam-preparation">AM2 preparation</SEOInternalLink>,{' '}
            <SEOInternalLink href="/training/city-guilds-2391">2391</SEOInternalLink>, and the{' '}
            <SEOInternalLink href="/study-centre">Study Centre</SEOInternalLink> so you can find the
            right learning path quickly.
          </p>
          <SEOFeatureGrid features={features} />
        </div>
      </section>

      <section id="training-collections" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Training collections</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {trainingCollections.map((collection) => (
              <div
                key={collection.heading}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{collection.heading}</h3>
                <div className="space-y-3">
                  {collection.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-white hover:border-yellow-500/30 hover:text-yellow-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-4 text-white leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Learn it, then use it</h2>
          <p>
            Training works best when it connects back to real jobs. If you are revising{' '}
            <SEOInternalLink href="/training/inspection-and-testing">
              inspection and testing
            </SEOInternalLink>
            , you can move straight into the{' '}
            <SEOInternalLink href="/tools/eicr-certificate">certificate workflow</SEOInternalLink>.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Training hub FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Study in one place and use it on the job"
        subheading="Move from revision and exam prep into certificates, calculators, and AI tools when you are ready to put the knowledge to work."
      />
    </PublicPageLayout>
  );
}
