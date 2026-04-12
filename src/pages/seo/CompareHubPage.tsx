import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  BarChart3,
  BadgeCheck,
  Brain,
  FileCheck2,
  Receipt,
  Scale,
  Smartphone,
} from 'lucide-react';

const PAGE_TITLE = 'Compare Electrician Apps | Elec-Mate Comparisons and Alternatives';
const PAGE_DESCRIPTION =
  'Compare Elec-Mate against electrician apps and alternatives including iCertifi, CertsApp, Simply EICR, invoice tools, and AI tool options for UK electricians.';

const features = [
  {
    icon: Scale,
    title: 'Clear app comparisons',
    description:
      'Comparison pages help electricians understand where Elec-Mate differs on certificates, calculators, AI, training, quoting, and invoicing.',
  },
  {
    icon: FileCheck2,
    title: 'Certificate positioning',
    description:
      'These pages are important where users are actively evaluating certificate software and looking for a better fit.',
  },
  {
    icon: Receipt,
    title: 'Commercial comparisons',
    description:
      'The comparison hub also supports business-intent searches around invoicing, quoting, and broader workflow tools.',
  },
  {
    icon: Brain,
    title: 'AI differentiation',
    description:
      'AI is a strong differentiator for Elec-Mate, and comparison pages are where that advantage can be explained clearly.',
  },
  {
    icon: BadgeCheck,
    title: 'Trust and evaluation',
    description:
      'Users coming through comparison pages are often close to a decision, so these pages need clear value framing and a simple signup path.',
  },
  {
    icon: Smartphone,
    title: 'Best app discovery',
    description:
      'You can move from detailed comparisons into broader app roundups and product pages when you want a wider view.',
  },
];

const comparisonCollections = [
  {
    heading: 'Core competitor pages',
    links: [
      { href: '/compare/elec-mate-vs-icertifi', label: 'Elec-Mate vs iCertifi' },
      { href: '/compare/elec-mate-vs-certsapp', label: 'Elec-Mate vs CertsApp' },
      { href: '/compare/elec-mate-vs-simply-eicr', label: 'Elec-Mate vs Simply EICR' },
      { href: '/compare/elec-mate-vs-electrical-om', label: 'Elec-Mate vs Electrical OM' },
    ],
  },
  {
    heading: 'Best-of comparison pages',
    links: [
      { href: '/best-electrician-app', label: 'Best Electrician App' },
      { href: '/compare/best-invoice-app-electricians', label: 'Best Invoice App for Electricians' },
      { href: '/compare/best-ai-tool-electricians', label: 'Best AI Tool for Electricians' },
      { href: '/tools/digital-certificates-app', label: 'Digital Certificates App' },
    ],
  },
  {
    heading: 'Commercial follow-through',
    links: [
      { href: '/tools/electrical-quoting-app', label: 'Electrical Quoting App' },
      { href: '/tools/electrician-invoice-app', label: 'Electrician Invoice App' },
      { href: '/tools/ai-electrician', label: 'AI Electrician Tools' },
      { href: '/tools/employer-electrical-platform', label: 'Employer Electrical Platform' },
    ],
  },
];

const faqs = [
  {
    question: 'Why use a comparison page before choosing software?',
    answer:
      'Comparison pages help you see differences in workflow, features, pricing style, and overall fit before you commit to a new platform.',
  },
  {
    question: 'What can I compare here?',
    answer:
      'You can compare Elec-Mate with certificate apps, electrician software alternatives, invoice tools, and AI options depending on what you are currently using.',
  },
  {
    question: 'Do comparison pages only matter for certificates?',
    answer:
      'No. They also matter for invoicing, quoting, AI, training, and wider platform comparisons where Elec-Mate has a broader offer than narrower tools.',
  },
];

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'Electrician App Comparison Hub',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/compare',
};

export default function CompareHubPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schemas: [collectionSchema, SEOSchemas.faqPage(faqs)],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare' },
    ],
    dateModified: '2026-04-12',
    author: 'Elec-Mate Technical Team',
  });

  return (
    <PublicPageLayout>
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <BarChart3 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Software Comparisons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Compare <span className="text-yellow-400">Electrician Apps</span> and Alternatives
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Compare Elec-Mate with other electrician apps, software options, and specialist tools.
            Use these pages to see the differences clearly and decide what fits your workflow best.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#comparison-collections"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl transition-colors"
            >
              Browse Comparison Pages
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Choose the right platform for your work</h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            If you are already weighing up options, this page brings the main comparisons together
            in one place. Start with{' '}
            <SEOInternalLink href="/compare/elec-mate-vs-icertifi">Elec-Mate vs iCertifi</SEOInternalLink>{' '}
            and <SEOInternalLink href="/compare/elec-mate-vs-certsapp">Elec-Mate vs CertsApp</SEOInternalLink>{' '}
            or jump into broader pages like{' '}
            <SEOInternalLink href="/best-electrician-app">Best Electrician App</SEOInternalLink> and{' '}
            <SEOInternalLink href="/tools/digital-certificates-app">Digital Certificates</SEOInternalLink>.
          </p>
          <SEOFeatureGrid features={features} />
        </div>
      </section>

      <section id="comparison-collections" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Comparison collections</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {comparisonCollections.map((collection) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What to compare before you switch</h2>
          <p>
            Look at the practical differences in workflow, pricing model, certificates,
            calculators, AI support, training, and wider business tools. The right choice depends
            on whether you want a narrow single-purpose app or one platform that covers more of the
            job.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Comparison hub FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Compare properly before you commit"
        subheading="Use the comparison pages to see the differences clearly, then start a free trial if Elec-Mate looks like the better fit for your workflow."
      />
    </PublicPageLayout>
  );
}
