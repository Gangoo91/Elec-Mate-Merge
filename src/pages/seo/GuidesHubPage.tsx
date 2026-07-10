import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { BookOpen, ClipboardCheck, FileSearch, Home, Shield, SunMedium, Zap } from 'lucide-react';
import { GUIDES_INDEX } from '@/data/guidesIndex';

const guidesByLetter = GUIDES_INDEX.reduce<Record<string, typeof GUIDES_INDEX>>((acc, guide) => {
  const letter = /^[0-9]/.test(guide.title) ? '0-9' : guide.title[0].toUpperCase();
  (acc[letter] ??= [] as unknown as typeof GUIDES_INDEX).push(guide);
  return acc;
}, {});
const indexLetters = Object.keys(guidesByLetter).sort((a, b) =>
  a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b)
);

const PAGE_TITLE = 'UK Electrical Guides | BS 7671, Testing, Compliance';
const PAGE_DESCRIPTION =
  'Elec-Mate electrical guides: BS 7671, inspection + testing, Part P, earthing, consumer units, EV charging, solar PV, practical workflows.';

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
    heading: 'BS 7671 and compliance',
    links: [
      { href: '/guides/bs-7671-18th-edition-guide', label: 'BS 7671 18th Edition Guide' },
      { href: '/bs7671-observation-codes', label: 'BS 7671 Observation Codes' },
      { href: '/guides/part-p-building-regulations', label: 'Part P Building Regulations' },
      { href: '/consumer-unit-regulations', label: 'Consumer Unit Regulations' },
      { href: '/guides/earthing-arrangements', label: 'Earthing Arrangements' },
      { href: '/guides/special-locations-part-7-bs-7671', label: 'Special Locations (Part 7)' },
      { href: '/guides/appendix-4-tables-bs-7671', label: 'Appendix 4 Tables' },
    ],
  },
  {
    heading: 'Amendment 4:2026',
    links: [
      { href: '/guides/bs-7671-amendment-4-2026', label: 'Amendment 4 (2026) Overview' },
      { href: '/guides/bs-7671-a4-2026-afdd-changes', label: 'A4:2026 AFDD Changes' },
      {
        href: '/guides/afdd-mandatory-hmo-care-home-a4-2026',
        label: 'AFDDs in HMOs and Care Homes',
      },
      { href: '/guides/spd-chapter-443-a4-2026', label: 'SPDs and Chapter 443' },
      { href: '/guides/section-722-ev-charging-complete-guide', label: 'Section 722 EV Charging' },
    ],
  },
  {
    heading: 'Inspection and testing',
    links: [
      { href: '/guides/testing-sequence-guide', label: 'Testing Sequence Guide' },
      { href: '/guides/safe-isolation-procedure', label: 'Safe Isolation Procedure' },
      { href: '/guides/how-to-fill-in-eicr', label: 'How to Fill in an EICR' },
      { href: '/loop-impedance-testing-guide', label: 'Ze vs Zs: Loop Impedance Testing' },
      { href: '/guides/ze-values-uk', label: 'Maximum Ze Values' },
      { href: '/polarity-test-guide', label: 'Polarity Testing' },
      { href: '/continuity-testing-guide', label: 'Continuity Testing' },
      {
        href: '/guides/insulation-resistance-testing-bs7671',
        label: 'Insulation Resistance Testing',
      },
      { href: '/guides/gs-38-proving-dead', label: 'GS38 and Proving Dead' },
    ],
  },
  {
    heading: 'EICR and certification',
    links: [
      { href: '/guides/eicr-cost-uk', label: 'EICR Cost UK' },
      { href: '/guides/eicr-code-c1-danger-present', label: 'EICR Code C1' },
      { href: '/guides/eicr-code-c2-potentially-dangerous', label: 'EICR Code C2' },
      { href: '/guides/eicr-code-c3-improvement-recommended', label: 'EICR Code C3' },
      { href: '/guides/eicr-code-fi-further-investigation', label: 'EICR Code FI' },
      { href: '/guides/eicr-for-landlords', label: 'EICR for Landlords' },
      { href: '/guides/commercial-eicr-guide', label: 'Commercial EICR Guide' },
      { href: '/tools/eicr-certificate', label: 'EICR Certificate App' },
      { href: '/tools/electrical-certificate-software', label: 'Electrical Certificate Software' },
    ],
  },
  {
    heading: 'Calculators and reference',
    links: [
      { href: '/tools/cable-sizing-calculator', label: 'Cable Sizing Calculator' },
      { href: '/tools/voltage-drop-calculator', label: 'Voltage Drop Calculator' },
      { href: '/tools/adiabatic-equation-calculator', label: 'Adiabatic Equation Calculator' },
      { href: '/tools/disconnection-time-calculator', label: 'Disconnection Time Calculator' },
      { href: '/tools/earth-loop-impedance-calculator', label: 'Earth Loop Impedance Calculator' },
      { href: '/tools/busbar-sizing-calculator', label: 'Busbar Sizing Calculator' },
      { href: '/tools/conduit-fill-calculator', label: 'Conduit Fill Calculator' },
      { href: '/tools/power-factor-calculator', label: 'Power Factor Calculator' },
      { href: '/guides/max-demand-calculation-guide', label: 'Maximum Demand and Diversity' },
      { href: '/guides/maximum-zs-values-bs-7671', label: 'Maximum Zs Values Table' },
    ],
  },
  {
    heading: 'Apprentices and exams',
    links: [
      { href: '/mock-exams', label: 'Free Mock Exams' },
      { href: '/guides/am2-exam-tips', label: 'AM2 Exam Tips' },
      { href: '/guides/18th-edition-exam-tips', label: '18th Edition Exam Tips' },
      { href: '/guides/apprentice-electrician-salary', label: 'Apprentice Electrician Pay' },
      { href: '/guides/electrician-salary-uk', label: 'Electrician Salary UK' },
      { href: '/guides/jib-pay-scales-2026', label: 'JIB Pay Scales 2026' },
      { href: '/guides/nvq-level-3-electrical', label: 'NVQ Level 3 Electrical' },
      { href: '/guides/electrical-apprenticeship-guide', label: 'Electrical Apprenticeship Guide' },
      { href: '/guides/electrical-apprentice-year-1-revision-plan', label: 'Year 1 Revision Plan' },
    ],
  },
  {
    heading: 'Qualification guides',
    links: [
      { href: '/guides/2365-02-complete-guide', label: 'C&G 2365 Level 2 Guide' },
      { href: '/guides/2365-03-complete-guide', label: 'C&G 2365 Level 3 Guide' },
      { href: '/guides/2357-complete-guide', label: 'C&G 2357 NVQ Guide' },
      { href: '/guides/5357-complete-guide', label: 'C&G 5357 Apprenticeship Guide' },
      { href: '/guides/2346-03-complete-guide', label: 'C&G 2346 Experienced Worker Guide' },
      { href: '/guides/5393-03-complete-guide', label: 'C&G 5393 Dwellings Guide' },
      { href: '/guides/8202-complete-guide', label: 'C&G 8202 T Level Guide' },
      {
        href: '/guides/eal-level-3-electrotechnical-complete-guide',
        label: 'EAL Level 3 Electrotechnical Guide',
      },
      { href: '/guides/cg-2365-vs-5357-vs-2366', label: '2365 vs 5357 vs 2366 Compared' },
      { href: '/guides/city-and-guilds-vs-eal', label: 'City & Guilds vs EAL' },
    ],
  },
  {
    heading: 'Pricing and business',
    links: [
      {
        href: '/guides/pricing-electrical-work-per-point',
        label: 'Pricing Electrical Work Per Point',
      },
      { href: '/guides/how-to-price-eicr-as-an-electrician', label: 'How to Price an EICR' },
      { href: '/guides/electrician-day-rates-uk', label: 'Electrician Day Rates UK' },
      {
        href: '/guides/starting-an-electrical-business',
        label: 'Starting an Electrical Business',
      },
      { href: '/guides/electrician-insurance-uk', label: 'Electrician Insurance UK' },
      { href: '/compare/best-invoice-app-electricians', label: 'Best Invoice Apps Compared' },
    ],
  },
  {
    heading: 'EV, solar, and smart homes',
    links: [
      { href: '/guides/ev-charger-installation', label: 'EV Charger Installation' },
      { href: '/guides/iet-code-of-practice-ev', label: 'IET Code of Practice (EV)' },
      { href: '/guides/solar-panel-installation', label: 'Solar Panel Installation' },
      { href: '/guides/battery-storage-installation', label: 'Battery Storage Installation' },
      { href: '/solar-pv-system-design', label: 'Solar PV System Design' },
      { href: '/guides/smart-home-wiring-cost', label: 'Smart Home Wiring Cost' },
    ],
  },
  {
    heading: 'Wiring and circuits',
    links: [
      { href: '/guides/electrical-symbols-chart', label: 'Electrical Symbols Chart' },
      { href: '/guides/ring-vs-radial-circuits', label: 'Ring vs Radial Circuits' },
      { href: '/guides/radial-circuit-explained', label: 'Radial Circuits Explained' },
      { href: '/bonding-conductors-guide', label: 'Bonding Conductors' },
      { href: '/guides/cable-sizing-guide-bs-7671', label: 'Cable Sizing to BS 7671' },
      { href: '/guides/consumer-unit-upgrade', label: 'Consumer Unit Upgrades' },
      { href: '/guides/electric-shower-installation', label: 'Electric Shower Installation' },
      { href: '/guides/cooker-circuit-guide', label: 'Cooker Circuits' },
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
  url: 'https://www.elec-mate.com/guides',
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
    dateModified: '2026-05-18',
    author: 'Andrew Moore',
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Guidance for real electrical work
          </h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            If you need a quick answer on{' '}
            <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>,{' '}
            <SEOInternalLink href="/guides/earthing-arrangements">
              earthing arrangements
            </SEOInternalLink>
            ,{' '}
            <SEOInternalLink href="/guides/testing-sequence-guide">
              testing sequence
            </SEOInternalLink>
            , or{' '}
            <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR workflows</SEOInternalLink>,
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

      <section id="all-guides" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Every guide, A to Z</h2>
          <p className="text-white/60 text-[14px] mb-8">
            The full library — all {GUIDES_INDEX.length} guides, in one index. Looking for
            city-specific costs and rules? See the{' '}
            <SEOInternalLink href="/locations">local guides by city</SEOInternalLink>.
          </p>
          {indexLetters.map((letter) => (
            <div key={letter} className="mt-7 first:mt-0">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 border-b border-white/10 pb-2 mb-3">
                {letter}
              </h3>
              <ul className="columns-2 md:columns-3 lg:columns-4 gap-x-6">
                {guidesByLetter[letter].map((guide) => (
                  <li key={guide.slug} className="break-inside-avoid">
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="block py-1 text-[13px] leading-snug text-white/70 hover:text-yellow-300 transition-colors touch-manipulation"
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-4 text-white leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">From guidance to action</h2>
          <p>
            Good guidance should help you do the next part of the job as well. Someone reading about{' '}
            <SEOInternalLink href="/guides/testing-sequence-guide">
              testing sequence
            </SEOInternalLink>{' '}
            should be able to move into the{' '}
            <SEOInternalLink href="/tools/electrical-testing-calculators">
              calculator suite
            </SEOInternalLink>
            . Someone reading about EICR completion should be able to move into the{' '}
            <SEOInternalLink href="/tools/digital-certificates-app">
              certificate workflow
            </SEOInternalLink>
            .
          </p>
          <p>That way the guides stay genuinely useful instead of ending at the article itself.</p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Guides hub FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
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
