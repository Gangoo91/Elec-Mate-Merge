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
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  Ruler,
  Layers,
  Box,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the 45% fill rule for trunking?',
    answer:
      'The 45% fill rule states that the total cross-sectional area of all cables installed in trunking must not exceed 45% of the internal cross-sectional area of the trunking. This rule comes from BS 7671:2018+A3:2024 and the IET Guidance Note 1. The remaining 55% of the trunking space is needed for heat dissipation (cables generate heat when carrying current, and the air space allows this heat to escape), ease of installation (cables need room to be laid in and arranged without bending them too tightly or forcing them into position), and future expansion (leaving spare capacity for additional circuits that may be needed later). The 45% limit applies to all types of cable trunking — PVC, metal, dado, skirting, and mini-trunking — regardless of whether the cables are single-core or multicore.',
  },
  {
    question: 'How do I calculate the cross-sectional area of a cable for trunking fill?',
    answer:
      'To calculate the cross-sectional area (CSA) of a cable for trunking fill purposes, you need the overall diameter of the cable — not the conductor size. The overall diameter includes the conductor, the insulation, any sheath, and any armour. For round cables, the CSA is pi times the radius squared: CSA = pi x (d/2) squared, where d is the overall diameter. For flat cables (like twin and earth), the CSA is approximately width x height. The overall dimensions are listed in the manufacturer\'s data sheets and in the IET tables. For example, a 2.5 mm² twin and earth flat cable has an overall diameter of approximately 11.5 mm x 6.9 mm, giving a CSA of approximately 79.35 mm² — much larger than the 2.5 mm² conductor cross-section. The Elec-Mate trunking fill calculator has all common cable dimensions built in, so you simply select the cable type and size.',
  },
  {
    question: 'What standard trunking sizes are available?',
    answer:
      'Standard PVC and metal cable trunking is available in a range of rectangular sizes. Common sizes include: 16 x 16 mm (internal CSA 256 mm², 45% usable: 115 mm²), 25 x 16 mm (400 mm², 180 mm²), 38 x 16 mm (608 mm², 274 mm²), 38 x 25 mm (950 mm², 428 mm²), 50 x 25 mm (1250 mm², 563 mm²), 50 x 50 mm (2500 mm², 1125 mm²), 75 x 50 mm (3750 mm², 1688 mm²), 75 x 75 mm (5625 mm², 2531 mm²), 100 x 50 mm (5000 mm², 2250 mm²), 100 x 75 mm (7500 mm², 3375 mm²), 100 x 100 mm (10000 mm², 4500 mm²), 150 x 50 mm (7500 mm², 3375 mm²), 150 x 75 mm (11250 mm², 5063 mm²), 150 x 100 mm (15000 mm², 6750 mm²), and 150 x 150 mm (22500 mm², 10125 mm²). Metal trunking is also available in larger sizes for industrial installations. The internal dimensions are slightly smaller than the external dimensions due to the wall thickness.',
  },
  {
    question: 'Can I mix different cable types in the same trunking?',
    answer:
      'Yes, you can install different cable types and sizes in the same trunking, provided the total cross-sectional area of all cables does not exceed 45% of the trunking\'s internal cross-sectional area. However, you must also consider grouping factors for current-carrying capacity. When multiple circuits share the same trunking, the current rating of each cable must be reduced by a grouping factor to account for the mutual heating effect. The grouping factors depend on the number of circuits and the installation method. Additionally, cables from different voltage bands (such as mains voltage and extra-low voltage) should be segregated — either by using compartmentalised trunking with a fixed divider, or by using a physical barrier that provides the same level of insulation as the cable insulation. BS 7671 Regulation 528.1 specifies the segregation requirements.',
  },
  {
    question: 'What is compartmentalised trunking and when should I use it?',
    answer:
      'Compartmentalised trunking has internal dividers (baffles) that create separate channels within the trunking. Each compartment is isolated from the others, allowing cables from different systems or voltage bands to be installed in the same trunking run without physical contact. The most common application is separating mains voltage circuits (230 V / 400 V) from extra-low voltage circuits (data cables, fire alarm cables, emergency lighting cables, telecommunications) as required by BS 7671 Regulation 528.1. Compartmentalised trunking is also used to separate circuits of different voltage bands, to provide additional fire resistance between cable groups, and to make it easier to add or remove cables from one system without disturbing others. The 45% fill rule applies to each compartment independently — you cannot use space in one compartment to compensate for overfilling another.',
  },
  {
    question: 'Does the 45% rule apply to mini-trunking?',
    answer:
      'Yes, the 45% fill rule applies to all forms of trunking, including mini-trunking (also called micro-trunking). Mini-trunking is the small trunking — typically 16 x 16 mm, 25 x 16 mm, or 38 x 16 mm — used on wall surfaces for individual circuits or small groups of cables. Because mini-trunking has a small internal cross-sectional area, the 45% limit is reached quickly. For example, 16 x 16 mm mini-trunking has an internal CSA of approximately 256 mm². At 45%, the usable space is only 115 mm². A single 2.5 mm² twin and earth cable (CSA approximately 79 mm²) already fills 69% of the usable space, leaving room for only one additional cable of similar size. This is why mini-trunking is typically used for single circuits — a socket radial or a lighting circuit — rather than for bundling multiple circuits together.',
  },
];

const howToSteps = [
  {
    name: 'List all cables to be installed in the trunking',
    text: 'Identify every cable that will be routed through the trunking run. For each circuit, note the cable type (flat twin and earth, single core, multicore armoured, data cable, etc.) and the conductor cross-sectional area. Remember to count every cable individually — if a circuit uses a separate line, neutral, and earth (singles in trunking), count each conductor separately.',
  },
  {
    name: 'Look up the overall cable dimensions',
    text: 'For each cable, find the overall diameter (for round cables) or the overall width and height (for flat cables). These values are in the manufacturer\'s data sheet or the IET tables. Do not use the conductor CSA — the overall cable dimension includes the insulation and sheath, which is much larger. The Elec-Mate calculator has all common UK cable dimensions built in.',
  },
  {
    name: 'Calculate the cross-sectional area of each cable',
    text: 'For round cables: CSA = pi x (overall diameter / 2) squared. For flat cables: CSA = overall width x overall height. Sum the cross-sectional areas of all cables to get the total cable CSA. For example, 3 cables with CSAs of 79 mm², 50 mm², and 50 mm² give a total of 179 mm².',
  },
  {
    name: 'Determine the trunking internal cross-sectional area',
    text: 'Look up the internal dimensions of the trunking. For rectangular trunking: internal CSA = internal width x internal height. For the common 100 x 50 mm trunking, the internal CSA is approximately 5000 mm². Calculate 45% of this value: 5000 x 0.45 = 2250 mm². This is the maximum total cable CSA permitted.',
  },
  {
    name: 'Compare and select the trunking size',
    text: 'If the total cable CSA is less than or equal to 45% of the trunking internal CSA, the cables fit. If not, select a larger trunking size. For the example above (total cable CSA 179 mm²), the minimum trunking internal CSA would be 179 / 0.45 = 398 mm². A 25 x 16 mm trunking (internal CSA 400 mm²) is the minimum, but 38 x 16 mm (608 mm²) would be a better choice to allow for future expansion.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Trunking Size Selection',
    description:
      'Enter the number and type of cables, and the calculator recommends the minimum trunking size. Supports all standard UK trunking sizes from 16 x 16 mm to 150 x 150 mm.',
  },
  {
    icon: Layers,
    title: 'Mixed Cable Types',
    description:
      'Handles any combination of cable types in the same trunking — flat twin and earth, singles, multicore, data cables. Each cable type uses its actual overall dimensions for accurate fill calculation.',
  },
  {
    icon: Ruler,
    title: 'Compartment Mode',
    description:
      'Calculate fill for compartmentalised trunking. Define each compartment separately and check the 45% rule independently. Ensures segregation requirements are met.',
  },
  {
    icon: BarChart3,
    title: 'Fill Percentage Display',
    description:
      'Shows the fill percentage as a visual gauge. Colour-coded: green for comfortable fill, amber for approaching the 45% limit, red for exceeding it.',
  },
  {
    icon: Box,
    title: 'Mini-Trunking Support',
    description:
      'Includes all standard mini-trunking sizes. Quickly check whether a single circuit or pair of circuits will fit in the mini-trunking size you plan to use.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'All cable dimensions and fill limits verified against BS 7671:2018+A3:2024 and the IET Guidance Note 1. Part of 70 electrical calculators built for UK electricians.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Trunking Fill Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate trunking fill to the 45% rule from BS 7671. Check cable CSA against trunking capacity for all standard sizes, mixed cable types, and compartmentalised trunking.',
  url: 'https://elec-mate.com/tools/trunking-fill-calculator',
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

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Calculate Trunking Fill Using the 45% Rule',
  description:
    'Step-by-step guide to calculating trunking fill for electrical installations in the UK using the 45% maximum fill rule from BS 7671.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function TrunkingFillCalculatorPage() {
  useSEO({
    title: 'Trunking Fill Calculator | 45% Fill Rule BS 7671',
    description:
      'Calculate trunking fill to the 45% rule from BS 7671. Check cable CSA against trunking capacity for all standard UK sizes, mixed cable types, and compartmentalised trunking.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
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
            Trunking Fill Calculator
            <span className="block text-yellow-400 mt-1">45% Fill Rule to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate trunking fill using the 45% maximum fill rule. Check any combination of cables against any trunking size, with compartment mode for segregated installations.
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

      {/* What Is Trunking Fill */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Trunking Fill and the 45% Rule?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Trunking fill refers to the proportion of a cable trunking's internal cross-sectional area that is occupied by cables. BS 7671:2018+A3:2024 and the IET Guidance Note 1 state that the total cross-sectional area of all cables installed in trunking must not exceed 45% of the trunking's internal cross-sectional area. This is known as the 45% fill rule, and it applies to all types of cable trunking — PVC, galvanised steel, stainless steel, aluminium, dado, skirting, and mini-trunking.
            </p>
            <p>
              <strong className="text-yellow-400">Why 45% and not more?</strong> The 45% limit exists for three reasons. First, heat dissipation: when current flows through cables, the conductors generate heat. The air space inside the trunking acts as a cooling medium, allowing heat to transfer from the cable surface to the trunking walls and then to the surrounding environment. If the trunking is packed too tightly, the temperature inside rises, potentially exceeding the cable insulation's rated temperature and causing degradation or failure.
            </p>
            <p>
              Second, installation practicality: cables need to be laid into the trunking without excessive bending or forcing. They must be arranged neatly to avoid crossing over each other, which creates pressure points that can damage insulation over time. A 45% fill leaves enough space for cables to be routed neatly with gentle bends at fittings and junctions.
            </p>
            <p>
              Third, future capacity: good design practice — and many specifications — require spare capacity for additional circuits. Building use changes over time, and new circuits are frequently needed for additional power points, data outlets, or replacement of existing services. A trunking system designed to 45% fill on day one has no spare capacity; designing to 30 to 35% fill on day one leaves room for growth.
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Total cable CSA ≤ 45% of trunking internal CSA
              </p>
              <p className="mt-3 text-sm text-white">The fundamental trunking fill rule from BS 7671</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cable CSA Calculation */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Calculating Cable Cross-Sectional Area</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The most common mistake in trunking fill calculations is confusing the conductor cross-sectional area with the overall cable cross-sectional area. When you say "2.5 mm² cable", the 2.5 mm² refers to the cross-section of the copper conductor only. The actual space the cable occupies in the trunking is much larger because it includes the PVC insulation around each conductor, the sheath around the cable, and — for flat cables — the shape of the overall profile.
            </p>
            <p>
              <strong className="text-yellow-400">For round cables</strong> (such as single-core PVC insulated cables drawn into trunking), the cable cross-sectional area for fill purposes is calculated from the overall diameter: CSA = pi x (d/2)². A 2.5 mm² single has an overall diameter of approximately 4.6 mm, giving a CSA of pi x 2.3² = 16.6 mm². This is over six times the conductor cross-section.
            </p>
            <p>
              <strong className="text-yellow-400">For flat cables</strong> (such as twin and earth), the cable CSA for fill purposes is the overall width multiplied by the overall height. A 2.5 mm² twin and earth cable is approximately 11.5 mm wide by 6.9 mm high, giving a CSA of 79.4 mm² — over 30 times the conductor cross-section. This is why trunking fill calculations must always use the overall cable dimensions, never the conductor size.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-4 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Type</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Overall Size (mm)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable CSA (mm²)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Typical Use</div>
            </div>
            {[
              { type: '1.0 mm² T&E flat', size: '9.0 x 5.5', csa: '49.5', use: 'Lighting' },
              { type: '1.5 mm² T&E flat', size: '10.0 x 6.1', csa: '61.0', use: 'Lighting' },
              { type: '2.5 mm² T&E flat', size: '11.5 x 6.9', csa: '79.4', use: 'Socket circuits' },
              { type: '4.0 mm² T&E flat', size: '12.5 x 7.6', csa: '95.0', use: 'Cooker, shower' },
              { type: '6.0 mm² T&E flat', size: '14.0 x 8.5', csa: '119.0', use: 'Shower, sub-main' },
              { type: '1.5 mm² single', size: '3.9 dia', csa: '11.9', use: 'Lighting in trunking' },
              { type: '2.5 mm² single', size: '4.6 dia', csa: '16.6', use: 'Sockets in trunking' },
              { type: 'Cat6 data cable', size: '6.0 dia', csa: '28.3', use: 'Data, comms' },
            ].map((row) => (
              <div key={row.type} className="grid grid-cols-4 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.type}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.size}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.csa}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.use}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Trunking Sizes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Ruler className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Standard Trunking Sizes and Capacity</h2>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-3 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Trunking Size (mm)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Internal CSA (mm²)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">45% Usable (mm²)</div>
            </div>
            {[
              { size: '16 x 16', csa: '256', usable: '115' },
              { size: '25 x 16', csa: '400', usable: '180' },
              { size: '38 x 16', csa: '608', usable: '274' },
              { size: '38 x 25', csa: '950', usable: '428' },
              { size: '50 x 25', csa: '1,250', usable: '563' },
              { size: '50 x 50', csa: '2,500', usable: '1,125' },
              { size: '75 x 50', csa: '3,750', usable: '1,688' },
              { size: '75 x 75', csa: '5,625', usable: '2,531' },
              { size: '100 x 50', csa: '5,000', usable: '2,250' },
              { size: '100 x 100', csa: '10,000', usable: '4,500' },
              { size: '150 x 50', csa: '7,500', usable: '3,375' },
              { size: '150 x 150', csa: '22,500', usable: '10,125' },
            ].map((row) => (
              <div key={row.size} className="grid grid-cols-3 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.size}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.csa}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.usable}</div>
              </div>
            ))}
          </div>

          <p className="text-white text-sm leading-relaxed mt-4">
            The sizes above are nominal external dimensions. The internal dimensions are slightly smaller due to wall thickness — typically 1 to 2 mm per side for PVC trunking and 1 mm per side for metal trunking. The Elec-Mate calculator uses the actual internal dimensions for accurate fill calculations.
          </p>
        </div>
      </section>

      {/* Compartmentalised Trunking */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Box className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Compartmentalised Trunking and Segregation</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 Regulation 528.1 requires that cables of different voltage bands are segregated from each other unless they are all insulated for the highest voltage present. In practice, this means that mains voltage cables (230 V / 400 V) must be physically separated from extra-low voltage cables (data, telecommunications, fire alarm, emergency lighting control) within any shared containment system.
            </p>
            <p>
              <strong className="text-yellow-400">Compartmentalised trunking</strong> provides this segregation by including fixed internal dividers that create separate channels. A two-compartment trunking has one divider creating two channels; a three-compartment version has two dividers. Each compartment must be treated independently for fill calculations — the 45% rule applies to each compartment separately.
            </p>
            <p>
              For example, a 100 x 50 mm three-compartment trunking might divide into one 50 x 50 mm power compartment and one 50 x 50 mm data compartment (the third compartment is sometimes a narrower ELV channel). The power compartment has an internal CSA of approximately 2,500 mm², giving a 45% usable area of 1,125 mm². The data compartment has the same capacity. You cannot add the two compartments together — each is assessed against its own 45% limit.
            </p>
            <p>
              When specifying compartmentalised trunking, always check the internal dimensions of each compartment from the manufacturer's data, as the dividers reduce the usable space. A 100 x 50 mm trunking divided into two equal compartments does not provide two 50 x 50 mm channels — the divider itself occupies space, and the two channels may be closer to 48 x 48 mm each.
            </p>
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Worked Examples</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 1: Socket Circuits in 50 x 50 mm Trunking</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  Four ring final circuits use 2.5 mm² T&E flat cable. Each ring has two cables in the trunking run (outgoing and return legs of the ring). Total: 8 cables of 2.5 mm² T&E.
                </p>
                <p className="font-mono text-white">
                  Cable CSA per cable = 11.5 x 6.9 = <strong className="text-yellow-400">79.4 mm²</strong>
                </p>
                <p className="font-mono text-white">
                  Total cable CSA = 8 x 79.4 = <strong className="text-yellow-400">635.2 mm²</strong>
                </p>
                <p className="font-mono text-white">
                  Trunking 45% capacity = 2,500 x 0.45 = <strong className="text-yellow-400">1,125 mm²</strong>
                </p>
                <p>
                  Result: <strong className="text-green-400">635.2 ≤ 1,125 — PASS</strong>. Fill percentage is 25.4%, leaving good spare capacity for future circuits.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 2: Mixed Cables in Mini-Trunking</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  An electrician wants to run one 2.5 mm² T&E (socket circuit) and one 1.5 mm² T&E (lighting circuit) through 25 x 16 mm mini-trunking.
                </p>
                <p className="font-mono text-white">
                  2.5 mm² T&E CSA = 79.4 mm²
                </p>
                <p className="font-mono text-white">
                  1.5 mm² T&E CSA = 61.0 mm²
                </p>
                <p className="font-mono text-white">
                  Total cable CSA = 79.4 + 61.0 = <strong className="text-yellow-400">140.4 mm²</strong>
                </p>
                <p className="font-mono text-white">
                  Trunking 45% capacity = 400 x 0.45 = <strong className="text-yellow-400">180 mm²</strong>
                </p>
                <p>
                  Result: <strong className="text-green-400">140.4 ≤ 180 — PASS</strong>. However, the fill is 78% of the usable space (35.1% of total), which is tight. No room for additional cables. Consider upgrading to 38 x 16 mm (45% capacity: 274 mm²) to allow for future expansion.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 3: Over-Filled Trunking</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A trunking run carries 6 cables of 4.0 mm² T&E and 4 cables of 2.5 mm² T&E in 50 x 25 mm trunking.
                </p>
                <p className="font-mono text-white">
                  4.0 mm² T&E CSA: 6 x 95.0 = 570.0 mm²
                </p>
                <p className="font-mono text-white">
                  2.5 mm² T&E CSA: 4 x 79.4 = 317.6 mm²
                </p>
                <p className="font-mono text-white">
                  Total cable CSA = 570.0 + 317.6 = <strong className="text-yellow-400">887.6 mm²</strong>
                </p>
                <p className="font-mono text-white">
                  Trunking 45% capacity = 1,250 x 0.45 = <strong className="text-yellow-400">562.5 mm²</strong>
                </p>
                <p>
                  Result: <strong className="text-red-400">887.6 &gt; 562.5 — FAIL</strong>. The 50 x 25 mm trunking is too small. Upgrade to 50 x 50 mm trunking (45% capacity: 1,125 mm²), which gives 887.6 ≤ 1,125 — PASS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Calculate Trunking Fill — Step by Step</h2>
          </div>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white leading-relaxed text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use the Elec-Mate Trunking Fill Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Eliminates manual CSA lookups and ensures your trunking is correctly sized every time.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Size Trunking Correctly Every Time"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
