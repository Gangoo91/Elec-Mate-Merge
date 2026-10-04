import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { GUIDES_INDEX } from '@/data/guidesIndex';

const guidesByLetter = GUIDES_INDEX.reduce<Record<string, typeof GUIDES_INDEX>>((acc, guide) => {
  const letter = /^[0-9]/.test(guide.title) ? '0-9' : guide.title[0].toUpperCase();
  (acc[letter] ??= [] as unknown as typeof GUIDES_INDEX).push(guide);
  return acc;
}, {});
const indexLetters = Object.keys(guidesByLetter).sort((a, b) =>
  a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b)
);

const PAGE_TITLE = 'UK Electrical Guides: BS 7671 & Compliance';
const PAGE_DESCRIPTION =
  'Elec-Mate electrical guides: BS 7671, inspection + testing, Part P, earthing, consumer units, EV charging, solar PV, practical workflows.';

const guideCollections = [
  {
    heading: 'BS 7671 and compliance',
    links: [
      { href: '/guides/bs-7671-18th-edition-guide', label: 'BS 7671 18th Edition Guide' },
      { href: '/bs7671-observation-codes', label: 'BS 7671 Observation Codes' },
      { href: '/part-p-building-regulations', label: 'Part P Building Regulations' },
      { href: '/consumer-unit-regulations', label: 'Consumer Unit Regulations' },
      { href: '/guides/earthing-systems-tns-tncs-tt-explained', label: 'Earthing Arrangements' },
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
        href: '/guides/afdd-hmo-care-home-a4-2026',
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
      { href: '/how-to-fill-in-eicr', label: 'How to Fill in an EICR' },
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

  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = q
    ? GUIDES_INDEX.filter((g) => g.title.toLowerCase().includes(q)).slice(0, 30)
    : [];

  // Volt rebuild (4 Oct 2026): search first — 1,000+ guides is a library, and
  // a library you can't search is a wall. No icon pills, no feature grid,
  // no boxed link rows; panels and rules like the rest of the app.
  return (
    <PublicPageLayout>
      <section className="px-5 pb-10 pt-10 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            Free guides · {GUIDES_INDEX.length} and counting
          </p>
          <h1 className="mt-3 max-w-[20ch] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[52px]">
            Electrical guides for{' '}
            <span className="text-elec-yellow">electricians and apprentices.</span>
          </h1>
          <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.6] text-white">
            BS 7671, inspection and testing, earthing, consumer units, EV and solar, exams and
            pricing — written for the job, cited to the source.
          </p>

          <div className="mt-8 max-w-[40rem]">
            <label htmlFor="guide-search" className="text-[12px] font-medium text-white">
              Search the guides
            </label>
            <input
              id="guide-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Zs values, AFDD, EICR codes"
              autoComplete="off"
              enterKeyHint="search"
              className="input-underline mt-1 h-14 w-full rounded-none border-0 border-b border-white/[0.2] bg-transparent px-1 text-[18px] font-medium text-white caret-elec-yellow placeholder:font-normal placeholder:text-white/30 focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
            />
            {q && (
              <div className="mt-2" aria-live="polite">
                {results.length ? (
                  <ul className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
                    {results.map((g) => (
                      <li key={g.slug}>
                        <Link
                          to={`/guides/${g.slug}`}
                          className="flex min-h-[52px] items-center text-[16px] font-medium text-white hover:text-elec-yellow touch-manipulation"
                        >
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-[15px] text-white">
                    No guide matches “{query}”. Try a shorter word, or ask Elec-AI in the app.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="guide-collections" className="scroll-mt-20 px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[32px]">
            Start here
          </h2>
          <p className="mt-2 max-w-[44rem] text-[15px] leading-relaxed text-white">
            The most-used guides, by topic. Need a quick answer on{' '}
            <SEOInternalLink href="/part-p-building-regulations">Part P</SEOInternalLink>,{' '}
            <SEOInternalLink href="/guides/earthing-systems-tns-tncs-tt-explained">
              earthing
            </SEOInternalLink>{' '}
            or <SEOInternalLink href="/how-to-fill-in-eicr">filling in an EICR</SEOInternalLink>?
            It’s below.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guideCollections.map((collection) => (
              <div
                key={collection.heading}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_8%)] p-5 sm:p-6"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/50 to-elec-yellow/0"
                />
                <h3 className="text-[17px] font-bold text-white">{collection.heading}</h3>
                <ul className="mt-3 divide-y divide-white/[0.08] border-t border-white/[0.08]">
                  {collection.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="flex min-h-[46px] items-center text-[15px] text-white transition-colors hover:text-elec-yellow touch-manipulation"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="all-guides" className="scroll-mt-20 px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[32px]">
            Every guide, A to Z
          </h2>
          <p className="mt-2 text-[15px] text-white">
            All {GUIDES_INDEX.length} guides. Looking for city-specific costs and rules? See the{' '}
            <SEOInternalLink href="/locations">local guides by city</SEOInternalLink>.
          </p>
          {/* Letter jump bar — sticks under the nav so 1,000 rows stay navigable. */}
          <nav
            aria-label="Jump to letter"
            className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-30 -mx-5 mt-6 overflow-x-auto border-y border-white/[0.08] bg-background/95 px-5 backdrop-blur-md lg:-mx-8 lg:px-8"
          >
            <ul className="flex gap-1 py-2">
              {indexLetters.map((letter) => (
                <li key={letter}>
                  <a
                    href={`#letter-${letter}`}
                    className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg px-2 text-[14px] font-semibold text-white hover:bg-white/[0.06] hover:text-elec-yellow touch-manipulation"
                  >
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {indexLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mt-8 scroll-mt-36">
              <h3 className="mb-2 border-b border-white/[0.08] pb-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                {letter}
              </h3>
              <ul className="gap-x-8 sm:columns-2 lg:columns-3">
                {guidesByLetter[letter].map((guide) => (
                  <li key={guide.slug} className="break-inside-avoid">
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="flex min-h-[40px] items-center text-[14.5px] text-white hover:text-elec-yellow touch-manipulation"
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

      <section className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[32px]">
            About the guides
          </h2>
          <dl className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08] lg:mt-0">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <dt className="text-[16px] font-semibold text-white">{faq.question}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-white">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SEOCTASection
        heading="Get the answer, then carry on with the work"
        subheading="Read the guide, then do the job in Elec-Mate — certificates, quotes, calculators and Elec-AI for electricians; courses and AM2 prep for apprentices."
      />
    </PublicPageLayout>
  );
}
