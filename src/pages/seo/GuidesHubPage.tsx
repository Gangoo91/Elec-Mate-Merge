import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  BookOpen,
  ClipboardCheck,
  FileSearch,
  Home,
  Shield,
  SunMedium,
  Zap,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical Guides Hub | BS 7671, Testing, Compliance and Installation Guides';
const PAGE_DESCRIPTION =
  'Browse Elec-Mate electrical guides covering BS 7671, inspection and testing, Part P, earthing, consumer units, EV charging, solar PV, and practical electrician workflows.';

const features = [
  {
    icon: Shield,
    title: 'Regulations and compliance',
    description:
      'Public guidance on BS 7671, Part P, observation codes, and the compliance questions electricians search for most.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection and testing',
    description:
      'Testing sequence, safe isolation, EICR workflows, and fault-finding pages for practical site work.',
  },
  {
    icon: Home,
    title: 'Real-world job scenarios',
    description:
      'Guides around consumer units, landlord work, domestic jobs, and common installation scenarios.',
  },
  {
    icon: SunMedium,
    title: 'Modern installation topics',
    description:
      'EV charging, solar PV, battery storage, and the newer areas where demand continues to grow.',
  },
  {
    icon: FileSearch,
    title: 'Problem-solving search intent',
    description:
      'Use guide pages to check wiring rules, understand procedures, and solve problems with more confidence.',
  },
  {
    icon: Zap,
    title: 'Useful next steps',
    description:
      'Move from reading the guidance into the right certificate, calculator, AI tool, or training page when you are ready.',
  },
];

const guideCollections = [
  {
    heading: 'Regs and compliance',
    links: [
      { href: '/guides/bs7671-observation-codes', label: 'BS 7671 Observation Codes' },
      { href: '/guides/part-p-building-regulations', label: 'Part P Building Regulations' },
      { href: '/guides/consumer-unit-regulations', label: 'Consumer Unit Regulations' },
      { href: '/guides/earthing-arrangements', label: 'Earthing Arrangements' },
    ],
  },
  {
    heading: 'Inspection, testing, and certificates',
    links: [
      { href: '/guides/testing-sequence-guide', label: 'Testing Sequence Guide' },
      { href: '/guides/safe-isolation-procedure', label: 'Safe Isolation Procedure' },
      { href: '/guides/how-to-fill-in-eicr', label: 'How to Fill in an EICR' },
      { href: '/tools/eicr-certificate', label: 'EICR Certificate App' },
    ],
  },
  {
    heading: 'Installation topics',
    links: [
      { href: '/guides/ev-charger-installation', label: 'EV Charger Installation' },
      { href: '/guides/solar-panel-installation', label: 'Solar Panel Installation' },
      { href: '/guides/how-to-size-cables-bs-7671', label: 'How to Size Cables' },
      { href: '/tools/cable-sizing-calculator', label: 'Cable Sizing Calculator' },
    ],
  },
];

const faqs = [
  {
    question: 'What kind of guides are included here?',
    answer:
      'This hub brings together wiring regulations, inspection and testing guidance, certificate help, installation topics, and practical electrician reference pages.',
  },
  {
    question: 'Are these pages written for electricians or homeowners?',
    answer:
      'The core focus is electricians, apprentices, and electrical businesses, but some pages also answer homeowner and landlord searches where those topics support Elec-Mate visibility.',
  },
  {
    question: 'Can I move from a guide into the right tool?',
    answer:
      'Yes. Many guides link directly into related certificates, calculators, AI tools, or training pages so you can go from reference to action quickly.',
  },
];

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'Electrical Guides Hub',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/guides',
};

export default function GuidesHubPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schemas: [collectionSchema, SEOSchemas.faqPage(faqs)],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
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
            <span className="text-sm font-medium text-yellow-400">Electrical Guide Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Guides for <span className="text-yellow-400">UK Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Browse practical electrical guides covering BS 7671, inspection and testing, earthing,
            consumer units, EV charging, solar PV, and the everyday questions electricians need to
            answer on the job.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#guide-collections"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl transition-colors"
            >
              Browse Guides
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Guidance for real electrical work</h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            If you need a quick answer on{' '}
            <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>,{' '}
            <SEOInternalLink href="/guides/earthing-arrangements">earthing arrangements</SEOInternalLink>,{' '}
            <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>,
            or <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR workflows</SEOInternalLink>,
            this page gives you a clear route into the right guide without digging through unrelated
            pages.
          </p>
          <SEOFeatureGrid features={features} />
        </div>
      </section>

      <section id="guide-collections" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Guide collections</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {guideCollections.map((collection) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white">From guidance to action</h2>
          <p>
            Good guidance should help you do the next part of the job as well. Someone reading
            about{' '}
            <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>{' '}
            should be able to move into the{' '}
            <SEOInternalLink href="/tools/electrical-testing-calculators">calculator suite</SEOInternalLink>.
            Someone reading about EICR completion should be able to move into the{' '}
            <SEOInternalLink href="/tools/digital-certificates-app">certificate workflow</SEOInternalLink>.
          </p>
          <p>
            That way the guides stay genuinely useful instead of ending at the article itself.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Guides hub FAQs</h2>
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
        heading="Get the answer, then carry on with the work"
        subheading="Use the guides for reference, then move into certificates, calculators, AI tools, or training when you need the next step."
      />
    </PublicPageLayout>
  );
}
