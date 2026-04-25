import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Brain,
  Calculator,
  FileCheck2,
  GraduationCap,
  Receipt,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical Tools Hub | Certificates, Calculators, AI and Business Tools';
const PAGE_DESCRIPTION =
  'Explore Elec-Mate electrical tools for UK electricians: digital certificates, BS 7671 calculators, AI tools, quoting, invoicing, RAMS, training, and employer oversight.';

const features = [
  {
    icon: FileCheck2,
    title: 'Digital Certificates',
    description:
      'EICR, EIC, Minor Works, EV, Solar PV, Fire Alarm, Emergency Lighting, PAT, and the wider certificate suite in one workflow.',
  },
  {
    icon: Calculator,
    title: 'BS 7671 Calculators',
    description:
      'Cable sizing, voltage drop, earth loop impedance, max demand, prospective fault current, and the broader calculator estate.',
  },
  {
    icon: Brain,
    title: 'AI Electrician Tools',
    description:
      'Use Elec-AI for fault finding, cost estimation, design support, health and safety, and faster on-site decision making.',
  },
  {
    icon: Receipt,
    title: 'Business Workflow',
    description:
      'Quote jobs, issue invoices, generate RAMS, and run the commercial side of the business without leaving the platform.',
  },
  {
    icon: GraduationCap,
    title: 'Study and CPD',
    description:
      'Keep courses, revision, and CPD close to the tools you use day to day on site.',
  },
  {
    icon: Users,
    title: 'Team Oversight',
    description:
      'Employer-facing oversight for certificates, workflows, and team visibility where businesses need more than solo use.',
  },
];

const toolCollections = [
  {
    heading: 'Certificates and testing',
    description: 'Create, complete, sign, and send the certification documents electricians use most.',
    links: [
      { href: '/tools/digital-certificates-app', label: 'Digital Certificates App' },
      { href: '/tools/eicr-certificate', label: 'EICR Certificate' },
      { href: '/tools/eic-certificate', label: 'EIC Certificate' },
      { href: '/tools/minor-works-certificate', label: 'Minor Works Certificate' },
    ],
  },
  {
    heading: 'Calculators and reference tools',
    description: 'Check figures quickly and work with current BS 7671-based calculator tools.',
    links: [
      { href: '/tools/electrical-testing-calculators', label: 'Electrical Testing Calculators' },
      { href: '/tools/cable-sizing-calculator', label: 'Cable Sizing Calculator' },
      { href: '/tools/voltage-drop-calculator', label: 'Voltage Drop Calculator' },
      { href: '/tools/earth-loop-impedance-calculator', label: 'Earth Loop Impedance Calculator' },
    ],
  },
  {
    heading: 'AI, quoting, and invoicing',
    description: 'Move from technical work into pricing, paperwork, and faster admin.',
    links: [
      { href: '/tools/ai-electrician', label: 'AI Electrician Tools' },
      { href: '/tools/electrical-quoting-app', label: 'Electrical Quoting App' },
      { href: '/tools/electrician-invoice-app', label: 'Electrician Invoice App' },
      { href: '/tools/rams-generator', label: 'RAMS Generator' },
    ],
  },
  {
    heading: 'Learning and company tools',
    description: 'Support apprentices, teams, and wider business workflows from the same platform.',
    links: [
      { href: '/study-centre', label: 'Study Centre' },
      { href: '/training/electrical-apprentice', label: 'Electrical Apprentice Training' },
      { href: '/tools/employer-electrical-platform', label: 'Employer Electrical Platform' },
      { href: '/best-electrician-app', label: 'Why Electricians Choose Elec-Mate' },
    ],
  },
];

const faqs = [
  {
    question: 'What tools does Elec-Mate include for electricians?',
    answer:
      'Elec-Mate combines digital certificates, BS 7671 calculators, AI electrician tools, quoting, invoicing, RAMS, training, and employer oversight into one platform.',
  },
  {
    question: 'Do I need to sign up before I can browse these tools?',
    answer:
      'No. You can browse the tool pages first, see what each workflow does, and then decide whether to start a free trial.',
  },
  {
    question: 'Which Elec-Mate tools are used most often?',
    answer:
      'The most popular starting points are usually certificates, calculators, quoting, invoicing, AI tools, and training because they cover the day-to-day jobs electricians do most often.',
  },
];

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'Electrical Tools Hub',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools',
};

export default function ToolsHubPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schemas: [collectionSchema, SEOSchemas.faqPage(faqs)],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Tools', url: '/tools' },
    ],
    dateModified: '2026-04-12',
    author: 'Elec-Mate Technical Team',
  });

  return (
    <PublicPageLayout>
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Wrench className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">All Elec-Mate Tools</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Tools for <span className="text-yellow-400">UK Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Find the right Elec-Mate tool for certificates, testing, calculations, quoting,
            invoicing, AI support, and training. Everything here is designed to help electricians
            work faster, stay organised, and send professional documents from one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#tool-collections"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl transition-colors"
            >
              Explore Tool Categories
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Everything in one place</h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            Whether you need an{' '}
            <SEOInternalLink href="/tools/eicr-certificate">EICR certificate</SEOInternalLink>, a{' '}
            <SEOInternalLink href="/tools/cable-sizing-calculator">cable sizing calculator</SEOInternalLink>,
            an <SEOInternalLink href="/tools/ai-electrician">AI assistant</SEOInternalLink>, or a{' '}
            <SEOInternalLink href="/tools/electrical-quoting-app">quoting workflow</SEOInternalLink>,
            this page helps you get to the right part of Elec-Mate quickly.
          </p>
          <SEOFeatureGrid features={features} />
        </div>
      </section>

      <section id="tool-collections" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Browse by tool category</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {toolCollections.map((collection) => (
              <div
                key={collection.heading}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">{collection.heading}</h3>
                <p className="text-white leading-relaxed mb-4">{collection.description}</p>
                <div className="space-y-3">
                  {collection.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-white hover:border-yellow-500/30 hover:text-yellow-300 transition-colors"
                    >
                      <span>{link.label}</span>
                      <Sparkles className="w-4 h-4 text-yellow-400" />
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for the full job</h2>
          <p>
            Elec-Mate is not just one tool. You can move from{' '}
            <SEOInternalLink href="/tools/digital-certificates-app">digital certificates</SEOInternalLink>{' '}
            into <SEOInternalLink href="/tools/electrical-testing-calculators">calculators</SEOInternalLink>,{' '}
            <SEOInternalLink href="/tools/electrical-quoting-app">quoting</SEOInternalLink>,{' '}
            <SEOInternalLink href="/tools/electrician-invoice-app">invoicing</SEOInternalLink>, and{' '}
            <SEOInternalLink href="/study-centre">training</SEOInternalLink> without jumping across
            separate apps.
          </p>
          <p>
            That makes it useful for sole traders, growing firms, and teams that want one system
            for site work, client documents, and day-to-day business admin.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tools hub FAQs</h2>
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
        heading="Start with the Elec-Mate tools that save the most time"
        subheading="Move from certificates and calculators into AI, quoting, invoicing, training, and wider business workflow from one account."
      />
    </PublicPageLayout>
  );
}
