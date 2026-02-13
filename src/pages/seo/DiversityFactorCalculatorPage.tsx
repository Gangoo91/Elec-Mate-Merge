import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Shield,
  Lightbulb,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Home,
  Gauge,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is a diversity factor in electrical installations?',
    answer:
      'A diversity factor is a percentage allowance applied to the connected load of an electrical installation, reflecting the fact that not all loads will be operating simultaneously at their maximum rating. For example, in a domestic property, the oven, kettle, immersion heater, and all socket outlets are unlikely to all be drawing full current at the same time. Diversity allows the electrician to reduce the calculated maximum demand so that cables, protective devices, and the incoming supply are not oversized.',
  },
  {
    question: 'Where are diversity allowances published?',
    answer:
      'The IET publishes diversity allowances in the On-Site Guide, Table 1A (for individual domestic and small commercial installations) and Table 1B (for blocks of flats and other grouped installations). These tables give the recommended diversity percentages for each type of load: lighting, heating, cooking appliances, socket outlets, water heaters, showers, and electric vehicle charge points. The values are based on decades of recorded usage patterns in UK properties.',
  },
  {
    question: 'Can I apply diversity to every circuit?',
    answer:
      'No. Certain loads must always be taken at their full rated current with no diversity applied. These include electric showers (100%), immersion heaters (100%), storage heating (100%), and electric vehicle charge points (100% for the first, with possible diversity for additional units in multi-charger installations). The IET On-Site Guide Table 1A specifies exactly which circuits can have diversity applied and which must be taken at full load.',
  },
  {
    question: 'How does diversity affect cable sizing and supply?',
    answer:
      'Without diversity, the total connected load of a typical 3-bed house might exceed 30 kW, requiring a 125 A supply and very large main tails. With diversity correctly applied, the maximum demand typically comes down to 12-18 kW (around 50-80 A), which matches the standard 100 A DNO supply cut-out. Diversity therefore determines whether the existing supply is adequate or whether an upgrade is needed, and it directly affects the size of the main tails, meter tails, and distribution board main switch.',
  },
  {
    question: 'Is diversity the same as demand factor?',
    answer:
      'They are closely related but not identical. Diversity factor is the ratio of actual maximum demand to the total connected load, always less than 1. Demand factor is sometimes used interchangeably in UK practice, particularly in the IET On-Site Guide. In some international standards, demand factor refers to the ratio for a single load, while diversity factor refers to the combined effect across a group of loads. In UK electrical work to BS 7671, the IET On-Site Guide Table 1A terminology is used.',
  },
  {
    question: 'Do I apply diversity when completing an EICR or EIC?',
    answer:
      'Yes. When completing the maximum demand section of an Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR), you should apply diversity in accordance with IET On-Site Guide Table 1A. The assessed maximum demand figure is entered on the certificate and is used to verify that the incoming supply is adequate for the installation. Elec-Mate calculates this automatically when you enter the circuit details.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Diversity Calculation',
    description:
      'Enter your connected loads by type — lighting, sockets, cookers, showers, EV chargers — and get the diversified maximum demand calculated instantly to IET On-Site Guide rules.',
  },
  {
    icon: Home,
    title: 'Domestic & Commercial Templates',
    description:
      'Pre-built templates for typical domestic installations (1-bed flat to 5-bed house) and small commercial units. Start from a template and adjust to match the actual installation.',
  },
  {
    icon: BookOpen,
    title: 'IET Table 1A Built In',
    description:
      'All diversity percentages from the IET On-Site Guide Table 1A are built into the calculator. No need to look up tables or remember which loads get 66% and which get 100%.',
  },
  {
    icon: Gauge,
    title: 'Supply Adequacy Check',
    description:
      'Automatically compares your diversified maximum demand against the DNO supply rating (60 A, 80 A, or 100 A) and warns if an upgrade is needed.',
  },
  {
    icon: BarChart3,
    title: 'Load Breakdown Charts',
    description:
      'Visual pie chart showing how each load type contributes to the total maximum demand. Instantly see which circuits are driving the demand.',
  },
  {
    icon: Shield,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'All diversity calculations follow the current 18th Edition wiring regulations including Amendment 3. Values verified against the IET On-Site Guide published tables.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Diversity Factor Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate diversity factors for electrical installations to BS 7671. Reduce maximum demand calculations with IET-approved diversity allowances for domestic and commercial loads.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
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

export default function DiversityFactorCalculatorPage() {
  useSEO({
    title: 'Diversity Factor Calculator | Maximum Demand BS 7671',
    description:
      'Calculate diversity factors for electrical installations to BS 7671:2018+A3:2024. Reduce maximum demand calculations with IET-approved diversity allowances for domestic and commercial loads.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Part of 70 Electrical Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Diversity Factor Calculator
            <span className="block text-yellow-400 mt-1">Maximum Demand to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate diversity factors for domestic and commercial electrical installations using
            IET On-Site Guide Table 1A allowances. Instantly determine whether the DNO supply is
            adequate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Try the Calculator Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Is Diversity */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Diversity?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Diversity is a fundamental concept in electrical installation design. It recognises a
              simple practical fact: not every electrical appliance in a building operates at the
              same time. In a typical domestic property, you would never simultaneously run the oven
              at full power, boil the kettle, heat water with the immersion heater, charge an
              electric vehicle, run the shower, and switch on every light and socket outlet. The
              probability of all loads drawing their full rated current simultaneously is
              effectively zero.
            </p>
            <p>
              Because of this, the IET Wiring Regulations and the associated On-Site Guide allow
              electricians to apply diversity allowances when calculating the maximum demand of an
              installation. Without diversity, a modern 3-bed house with electric cooking, a shower,
              an immersion heater, and an EV charger could have a total connected load of 30 kW or
              more. This would require a supply far larger than the standard 100 A single-phase
              supply provided by the Distribution Network Operator (DNO). With diversity correctly
              applied, the assessed maximum demand typically falls to 12-18 kW, which is well within
              the capability of the standard supply.
            </p>
            <p>
              Getting diversity right is critical. Apply too much diversity and the supply could be
              overloaded, causing the DNO fuse to blow or the main switch to trip. Apply too little
              diversity and the installation may require an unnecessarily expensive supply upgrade,
              larger main tails, and an oversized distribution board. The IET On-Site Guide Table 1A
              provides standardised diversity allowances based on decades of measured usage patterns
              in UK installations.
            </p>
          </div>
        </div>
      </section>

      {/* IET Diversity Allowances */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              IET On-Site Guide Table 1A Diversity Allowances
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The IET On-Site Guide, which accompanies BS 7671:2018+A3:2024, contains Table 1A
              setting out the recommended diversity allowances for individual domestic and similar
              installations. These are the values that every UK electrician should use when
              assessing maximum demand:
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
              <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  Load Type
                </div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  Diversity Allowance
                </div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Notes</div>
              </div>
              {[
                {
                  type: 'Lighting',
                  diversity: '66% of total connected load',
                  notes: 'First 2 kW at 100%, then 66% of remainder',
                },
                {
                  type: 'Socket Outlets',
                  diversity: 'First 10 A at 100% + 50% remainder',
                  notes: 'Based on ring or radial design current',
                },
                {
                  type: 'Cooking Appliances',
                  diversity: '10 A + 30% of remainder + 5 A if socket',
                  notes: 'First 10 A at 100%, then 30% above 10 A',
                },
                {
                  type: 'Electric Shower',
                  diversity: '100% (no diversity)',
                  notes: 'Full rated load, no reduction allowed',
                },
                {
                  type: 'Immersion Heater',
                  diversity: '100% (no diversity)',
                  notes: 'Full rated load, no reduction allowed',
                },
                {
                  type: 'Storage Heating',
                  diversity: '100% (no diversity)',
                  notes: 'Full rated load of all heaters',
                },
                {
                  type: 'EV Charge Point',
                  diversity: '100% (single unit)',
                  notes: 'Full rated load for single domestic charger',
                },
              ].map((row) => (
                <div key={row.type} className="grid grid-cols-3 gap-px bg-white/5">
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.type}</div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.diversity}</div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.notes}</div>
                </div>
              ))}
            </div>
            <p>
              It is essential to note that showers, immersion heaters, storage heaters, and EV
              charge points are always taken at their full rated current. These are high-power,
              long-duration loads that can realistically operate at full power for extended periods,
              so no diversity is allowed. Lighting and socket outlets, by contrast, are
              statistically unlikely to all be at full load simultaneously, which is why diversity
              can be applied.
            </p>
          </div>
        </div>
      </section>

      {/* How to Calculate */}
      <section id="how-it-works" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Calculate Diversity — Worked Example
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Let us work through a complete diversity calculation for a typical 3-bedroom
              semi-detached house. This is the most common type of domestic installation an
              electrician will encounter.
            </p>
            <h3 className="font-bold text-yellow-400 text-lg mt-6">Connected Loads</h3>
            <ul className="space-y-2 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Lighting:</strong> 12 light points totalling
                  1.8 kW (7.83 A at 230 V)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Socket Outlets:</strong> 2 ring final
                  circuits, each rated at 32 A = 64 A total
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Cooker:</strong> 12 kW (52.2 A) with socket
                  outlet on cooker unit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Electric Shower:</strong> 9.5 kW (41.3 A)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Immersion Heater:</strong> 3 kW (13 A)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">EV Charger:</strong> 7.4 kW (32 A)
                </span>
              </li>
            </ul>

            <h3 className="font-bold text-yellow-400 text-lg mt-6">
              Applying Diversity (Table 1A)
            </h3>
            <div className="space-y-3 my-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">Lighting: 66% allowance</p>
                <p className="font-mono text-white text-sm">
                  7.83 A total. First 2 kW (8.7 A) at 100% but load is less, so: 7.83 A x 0.66 ={' '}
                  <strong className="text-yellow-400">5.17 A</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">
                  Socket Outlets: First 10 A at 100%, then 50%
                </p>
                <p className="font-mono text-white text-sm">
                  10 A + (64 - 10) x 0.5 = 10 + 27 ={' '}
                  <strong className="text-yellow-400">37 A</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">
                  Cooker: 10 A + 30% of remainder + 5 A socket
                </p>
                <p className="font-mono text-white text-sm">
                  10 + (52.2 - 10) x 0.3 + 5 = 10 + 12.66 + 5 ={' '}
                  <strong className="text-yellow-400">27.66 A</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">Electric Shower: 100% (no diversity)</p>
                <p className="font-mono text-white text-sm">
                  <strong className="text-yellow-400">41.3 A</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">Immersion Heater: 100% (no diversity)</p>
                <p className="font-mono text-white text-sm">
                  <strong className="text-yellow-400">13 A</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="font-bold text-white mb-1">EV Charger: 100% (no diversity)</p>
                <p className="font-mono text-white text-sm">
                  <strong className="text-yellow-400">32 A</strong>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-sm text-white mb-2">Total Diversified Maximum Demand</p>
              <p className="text-3xl font-bold text-yellow-400 mb-1">156.13 A</p>
              <p className="text-sm text-white mb-4">
                Without diversity: 210.33 A total connected load
              </p>
              <p className="text-sm text-white">
                At 156 A, this installation{' '}
                <strong className="text-yellow-400">exceeds the standard 100 A supply</strong>. The
                EV charger and shower combined push the demand beyond a single-phase 100 A supply.
                Options: upgrade to three-phase, install a load management system for the EV
                charger, or apply for a DNO supply upgrade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Diversity Matters */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Diversity Matters for Cable and Supply Sizing
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Diversity directly determines two critical aspects of every electrical installation:
              the size of the incoming supply and the size of the main tails. If the diversified
              maximum demand exceeds the rating of the DNO supply cut-out (typically 60 A or 100 A
              for domestic single-phase), the electrician must either apply for a supply upgrade or
              redesign the installation to reduce the maximum demand.
            </p>
            <p>
              The main tails — the cables connecting the meter to the consumer unit — must be sized
              to carry the assessed maximum demand. For a 100 A supply, 25 mm² meter tails are
              standard. If diversity calculations show the maximum demand is only 60 A, 16 mm² tails
              may be sufficient, saving material cost. Conversely, if the assessed demand is 120 A,
              the standard tails are inadequate and must be upgraded.
            </p>
            <p>
              In modern installations, the addition of electric vehicle charge points (typically 7.4
              kW / 32 A) and heat pumps has significantly increased maximum demand in domestic
              properties. Many existing 60 A or 80 A supplies are no longer adequate when these
              loads are added. The diversity calculation is the tool that quantifies this and
              determines whether an upgrade is needed. Elec-Mate performs this calculation
              automatically, saving time and eliminating arithmetic errors.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use Elec-Mate's Diversity Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians assessing maximum demand to IET On-Site Guide
            standards.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Calculate Diversity Factors in Seconds"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site maximum demand calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
