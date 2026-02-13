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
  Thermometer,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the cable factor method for conduit fill?',
    answer:
      'The cable factor method is the standard BS 7671 approach for determining whether a given number of cables will fit inside a conduit of a specific size. Each cable size has a "cable factor" — a dimensionless number that represents the relative space the cable occupies. Each conduit size has a "conduit factor" that represents the available space inside the conduit. To check whether the cables fit, you multiply the cable factor for each cable by the number of cables of that size, sum all the results, and compare the total against the conduit factor. If the sum of cable factors is less than or equal to the conduit factor, the cables will fit. If it exceeds the conduit factor, you need a larger conduit.',
  },
  {
    question: 'What is the maximum fill ratio for conduit?',
    answer:
      'BS 7671 does not state an explicit percentage fill limit for conduit in the same way it does for trunking. Instead, the cable factor method inherently limits the fill to approximately 40% of the internal cross-sectional area of the conduit. This 40% figure accounts for the space needed to physically draw the cables through the conduit without damaging them, the air gaps required for heat dissipation, and the fact that cables do not pack perfectly due to their circular cross-section. The conduit factors published in the tables are calculated on this basis. For trunking, the rule is more explicit: the total cross-sectional area of all cables must not exceed 45% of the internal cross-sectional area of the trunking.',
  },
  {
    question: 'How do bends affect conduit fill calculations?',
    answer:
      'Bends in a conduit run increase the friction when pulling cables through, making it harder to install them without damage. BS 7671 and the IET On-Site Guide recommend that the conduit factor should be reduced when the run includes bends. A straight run with no bends can use the full conduit factor. For runs with one or two bends (up to 90 degrees each), a reduction of approximately 10 to 15% is recommended. For runs with three or more bends, or runs longer than 10 metres, the conduit factor should be reduced by 20 to 30%, or a draw-in box should be installed to break the run into shorter, straighter sections. The Elec-Mate calculator allows you to specify the number of bends and automatically adjusts the conduit factor accordingly.',
  },
  {
    question: 'What is the difference between conduit fill and trunking fill?',
    answer:
      'Conduit fill uses the cable factor method — a dimensionless number system where you compare the sum of cable factors against the conduit factor. Trunking fill uses the cross-sectional area method — you calculate the actual cross-sectional area of each cable in square millimetres, sum them, and check that the total does not exceed 45% of the internal cross-sectional area of the trunking. The 45% limit for trunking is explicit in BS 7671 and the IET Guidance Note 1. For conduit, the approximately 40% limit is built into the cable factor tables. The two methods exist because conduit and trunking have different installation challenges: conduit requires cables to be pulled through a tube (friction is the main constraint), while trunking has a removable lid allowing cables to be laid in (packing density is the main constraint).',
  },
  {
    question: 'Can I mix different cable sizes in the same conduit?',
    answer:
      'Yes, you can install different cable sizes in the same conduit, and the cable factor method is specifically designed to handle this. Simply add the cable factor for each individual cable (not per circuit — per conductor). For example, if you have three 2.5 mm² singles (cable factor 30 each) and two 1.5 mm² singles (cable factor 22 each), the total cable factor is (3 x 30) + (2 x 22) = 90 + 44 = 134. You then check this against the conduit factor for your chosen conduit size. A 20 mm conduit (straight run) has a conduit factor of 460, so 134 is well within capacity. Remember that grouping correction factors for current-carrying capacity must also be applied when multiple circuits share a conduit.',
  },
];

const howToSteps = [
  {
    name: 'Identify all cables to be installed',
    text: 'List every cable that will be drawn into the conduit. For each circuit, count the individual conductors — for example, a single-phase circuit in singles requires a line conductor and a neutral conductor (and a CPC if required). Note the cross-sectional area of each conductor (1.0 mm², 1.5 mm², 2.5 mm², 4 mm², etc.).',
  },
  {
    name: 'Look up the cable factor for each conductor',
    text: 'From the cable factor table, find the factor for each conductor size. Common values are: 1.0 mm² = 22, 1.5 mm² = 22, 2.5 mm² = 30, 4 mm² = 43, 6 mm² = 58, 10 mm² = 105, 16 mm² = 145. These factors apply to single-core PVC insulated cables (BS 6004 singles).',
  },
  {
    name: 'Calculate the total cable factor',
    text: 'Multiply the cable factor for each size by the number of conductors of that size, then sum all the results. For example, if you have 4 conductors of 2.5 mm² and 2 conductors of 1.5 mm²: total = (4 x 30) + (2 x 22) = 120 + 44 = 164.',
  },
  {
    name: 'Determine the conduit factor',
    text: 'Look up the conduit factor for the conduit size you plan to use. Standard conduit factors for straight runs are: 16 mm = 290, 20 mm = 460, 25 mm = 800, 32 mm = 1400, 40 mm = 2100, 50 mm = 3500. If the conduit run includes bends, reduce the factor according to the difficulty — typically 10% per bend or use the reduced factors from the tables.',
  },
  {
    name: 'Compare and select the conduit size',
    text: 'If the total cable factor is less than or equal to the conduit factor, the cables will fit. If not, try the next larger conduit size. For the example above (total factor 164), a 16 mm conduit (factor 290) is sufficient. Always leave some spare capacity for future cables if the installation design permits it.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Conduit Size Selection',
    description:
      'Enter the number and size of cables, and the calculator recommends the minimum conduit size. Supports 16 mm to 50 mm conduit and all standard cable sizes.',
  },
  {
    icon: Layers,
    title: 'Mixed Cable Sizes',
    description:
      'Handles any combination of cable sizes in the same conduit. Add 1.0 mm² through to 16 mm² singles in any quantity, and the total cable factor is calculated automatically.',
  },
  {
    icon: Ruler,
    title: 'Bend Adjustment',
    description:
      'Specify the number of bends in the conduit run, and the calculator reduces the conduit factor accordingly. Flags runs that need draw-in boxes to remain practical.',
  },
  {
    icon: BarChart3,
    title: 'Fill Percentage Display',
    description:
      'Shows the fill percentage as a visual gauge. Colour-coded: green for comfortable fill, amber for approaching the limit, red for exceeding the conduit factor.',
  },
  {
    icon: Thermometer,
    title: 'Trunking Fill Mode',
    description:
      'Switch between conduit fill (cable factor method) and trunking fill (45% area method). Calculate trunking fill for all standard trunking sizes.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 Compliant',
    description:
      'All cable factors and conduit factors verified against BS 7671:2018+A2:2022 and the IET On-Site Guide. Values match the published tables.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Conduit Fill Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate conduit fill using the cable factor method to BS 7671. Check maximum cables per conduit size, supports 16 mm to 50 mm, all standard cable types.',
  url: 'https://elec-mate.com/tools/conduit-fill-calculator',
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
  name: 'How to Calculate Conduit Fill Using the Cable Factor Method',
  description:
    'Step-by-step guide to calculating conduit fill for electrical installations in the UK using the cable factor method from BS 7671.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function ConduitFillCalculatorPage() {
  useSEO({
    title: 'Conduit Fill Calculator | Cable Factor Method BS 7671',
    description:
      'Calculate conduit fill using the cable factor method to BS 7671. Check maximum cables per conduit size, supports 16mm to 50mm, all standard cable types.',
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
            Part of 50+ Electrical Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Conduit Fill Calculator
            <span className="block text-yellow-400 mt-1">Cable Factor Method to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate conduit fill using the cable factor method. Instantly determine the right conduit size for any combination of cables, with bend adjustments and trunking fill mode included.
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

      {/* What Is Conduit Fill */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Conduit Fill and Why Does It Matter?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Conduit fill refers to the proportion of a conduit's internal space that is occupied by cables. Getting this right is critical for three reasons: heat dissipation, pulling tension during installation, and future capacity for additional cables.
            </p>
            <p>
              <strong className="text-yellow-400">Heat dissipation:</strong> When current flows through a cable, the conductor generates heat due to its resistance. This heat must be dissipated through the cable insulation, through the air space inside the conduit, through the conduit wall, and finally to the surrounding environment. If the conduit is packed too tightly with cables, the air space is insufficient, and the cables overheat. Overheating degrades the insulation over time, reducing the cable's lifespan and eventually causing insulation failure, short circuits, and potentially fire. The cable factor tables account for this by limiting the fill to approximately 40% of the conduit's internal cross-sectional area.
            </p>
            <p>
              <strong className="text-yellow-400">Pulling tension:</strong> Cables must be drawn through conduit during installation. The friction between the cable sheaths and the conduit wall, and between adjacent cables, determines how much force is needed to pull them through. If the conduit is overfilled, the pulling tension becomes excessive, risking damage to the cable insulation — particularly at bends where the cables are pressed against the conduit wall. Damaged insulation can lead to earth faults, short circuits, and reduced insulation resistance readings during testing.
            </p>
            <p>
              <strong className="text-yellow-400">Future capacity:</strong> Good installation practice and BS 7671 encourage leaving spare capacity in conduit systems to accommodate future circuit additions. An installation that is filled to maximum capacity on day one leaves no room for the additional circuits that building alterations, extensions, or technology upgrades may require. Many specifications call for conduit to be no more than 30 to 35% full to allow for future growth.
            </p>
            <p>
              For these reasons, conduit fill calculations are a fundamental part of electrical design. They should be performed before any conduit is installed, and the results documented as part of the design records. Guessing conduit sizes based on experience alone often leads to under-sized conduit that causes problems during cable pulling, or over-sized conduit that wastes material and installation time.
            </p>
          </div>
        </div>
      </section>

      {/* The Cable Factor Method */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Cable Factor Method Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The cable factor method is the standard approach in the UK for calculating conduit fill. It uses a system of dimensionless "factors" — one for each cable size and one for each conduit size — that make the calculation simple without needing to work with actual cross-sectional areas in square millimetres.
            </p>
            <p>
              The principle is straightforward: each cable has a cable factor that represents the space it occupies. Each conduit has a conduit factor that represents the space available. If the sum of all cable factors is less than or equal to the conduit factor, the cables will fit with adequate clearance for heat dissipation and pulling.
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Sum of cable factors ≤ Conduit factor
              </p>
              <p className="mt-3 text-sm text-white">If this condition is met, the cables fit. If not, use a larger conduit.</p>
            </div>
            <p>
              The cable factors are derived from the overall diameter of each cable (including insulation), and the conduit factors are derived from the usable internal cross-sectional area of each conduit size, reduced to approximately 40% to allow for air space and pulling clearance. This means the factor system already has the safety margin built in — you do not need to apply an additional reduction.
            </p>
          </div>
        </div>
      </section>

      {/* Cable Factor Tables */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Cable Factor Tables</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The table below shows the cable factors for the most common sizes of single-core PVC insulated cables (to BS 6004) used in conduit installations. These are the "singles" — individual conductors with PVC insulation but no sheath — that are drawn into conduit for wiring circuits.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-3 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Conductor CSA</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Factor</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Typical Use</div>
            </div>
            {[
              { size: '1.0 mm²', factor: '22', use: 'Lighting circuits' },
              { size: '1.5 mm²', factor: '22', use: 'Lighting circuits' },
              { size: '2.5 mm²', factor: '30', use: 'Socket outlets, radials' },
              { size: '4.0 mm²', factor: '43', use: 'High-power radials' },
              { size: '6.0 mm²', factor: '58', use: 'Cooker, shower circuits' },
              { size: '10 mm²', factor: '105', use: 'Sub-mains, large loads' },
              { size: '16 mm²', factor: '145', use: 'Sub-mains, distribution' },
            ].map((row) => (
              <div key={row.size} className="grid grid-cols-3 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.size}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.factor}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.use}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white leading-relaxed mt-6">
            <p>
              Note that 1.0 mm² and 1.5 mm² cables have the same cable factor (22) because their overall diameters (including insulation) are very similar. The difference in conductor cross-section is small at these sizes, and the insulation thickness is the dominant dimension.
            </p>
          </div>
        </div>
      </section>

      {/* Conduit Factor Tables */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Ruler className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Conduit Factor Tables</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The conduit factors below are for standard round PVC conduit (heavy gauge, to BS EN 61386). The factor depends on the conduit size and the length and complexity of the run. Straight runs and runs with gentle bends have higher factors (more capacity), while runs with multiple tight bends have lower factors.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-4 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Conduit Size</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Straight Run</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">With Bends</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Internal Diameter</div>
            </div>
            {[
              { size: '16 mm', straight: '290', bends: '200', id: '15.2 mm' },
              { size: '20 mm', straight: '460', bends: '320', id: '19.1 mm' },
              { size: '25 mm', straight: '800', bends: '560', id: '24.1 mm' },
              { size: '32 mm', straight: '1400', bends: '980', id: '30.8 mm' },
              { size: '40 mm', straight: '2100', bends: '1500', id: '38.4 mm' },
              { size: '50 mm', straight: '3500', bends: '2450', id: '48.4 mm' },
            ].map((row) => (
              <div key={row.size} className="grid grid-cols-4 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.size}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.straight}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.bends}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.id}</div>
              </div>
            ))}
          </div>

          <p className="text-white text-sm leading-relaxed mt-4">
            The "With Bends" column shows a reduced conduit factor for runs containing two or more bends. For runs with a single bend, use a value between the straight and bends columns. The Elec-Mate calculator adjusts the factor automatically based on the number of bends you specify.
          </p>
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
            {/* Example 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 1: Singles in 20 mm Conduit (Straight Run)</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A conduit run carries two lighting circuits. Each circuit requires one 1.5 mm² line conductor and one 1.5 mm² neutral conductor, plus a shared 1.5 mm² CPC. Total conductors: 5 singles of 1.5 mm².
                </p>
                <p className="font-mono text-white">
                  Total cable factor = 5 x 22 = <strong className="text-yellow-400">110</strong>
                </p>
                <p>
                  Conduit factor for 20 mm (straight run) = <strong className="text-yellow-400">460</strong>
                </p>
                <p>
                  Result: <strong className="text-green-400">110 ≤ 460 — PASS</strong>. Plenty of room. You could fit up to 20 conductors of 1.5 mm² in a 20 mm straight run (20 x 22 = 440 ≤ 460).
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 2: Mixed Sizes in 25 mm Conduit (With Bends)</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A conduit run with two 90-degree bends carries one 2.5 mm² radial circuit (line, neutral, CPC = three 2.5 mm² singles) and two 1.5 mm² lighting circuits (line, neutral each = four 1.5 mm² singles, plus one shared 1.5 mm² CPC = five 1.5 mm² singles).
                </p>
                <p className="font-mono text-white">
                  Cable factor for 2.5 mm² singles: 3 x 30 = 90
                </p>
                <p className="font-mono text-white">
                  Cable factor for 1.5 mm² singles: 5 x 22 = 110
                </p>
                <p className="font-mono text-white">
                  Total cable factor = 90 + 110 = <strong className="text-yellow-400">200</strong>
                </p>
                <p>
                  Conduit factor for 25 mm (with bends) = <strong className="text-yellow-400">560</strong>
                </p>
                <p>
                  Result: <strong className="text-green-400">200 ≤ 560 — PASS</strong>. A 25 mm conduit is adequate. A 20 mm conduit with bends (factor 320) would also work: 200 ≤ 320.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 3: Heavy Run — Checking a 20 mm Conduit</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  An electrician wants to run three 2.5 mm² radial circuits and one 4 mm² cooker circuit through a single 20 mm conduit with three bends. Each 2.5 mm² circuit has 3 conductors; the 4 mm² circuit has 3 conductors.
                </p>
                <p className="font-mono text-white">
                  Cable factor for 2.5 mm² singles: 9 x 30 = 270
                </p>
                <p className="font-mono text-white">
                  Cable factor for 4.0 mm² singles: 3 x 43 = 129
                </p>
                <p className="font-mono text-white">
                  Total cable factor = 270 + 129 = <strong className="text-yellow-400">399</strong>
                </p>
                <p>
                  Conduit factor for 20 mm with bends = <strong className="text-yellow-400">320</strong>
                </p>
                <p>
                  Result: <strong className="text-red-400">399 &gt; 320 — FAIL</strong>. The 20 mm conduit is too small. Upgrading to 25 mm conduit with bends (factor 560) solves the problem: 399 ≤ 560. Alternatively, install a draw-in box to split the run and use the straight-run factor for 20 mm (460), which also works: 399 ≤ 460.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bends and Long Runs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Ruler className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Bends, Long Runs, and Difficulty Factors</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The number of bends in a conduit run has a significant impact on cable pulling difficulty. Each bend increases friction between the cables and the conduit wall, and the cables press against each other at bend points, increasing the pulling tension required. Excessive pulling tension can stretch conductors, damage insulation, and even pull cables off their terminations.
            </p>
            <p>
              As a general rule, a conduit run should not contain more than two 90-degree bends (or the equivalent) between draw-in points. If the run requires more bends, a draw-in box or inspection tee should be installed to break the run into manageable sections. Each section is then treated as an independent run for the purposes of conduit fill calculations.
            </p>
            <p>
              Long straight runs also present challenges. Friction accumulates over length, and a 15-metre straight run requires more pulling force than a 5-metre run. For runs exceeding 10 metres without a bend, some specifications recommend reducing the conduit factor by 10% to account for the additional friction. The Elec-Mate calculator allows you to input the run length and automatically flags long runs that may benefit from intermediate draw-in points.
            </p>
            <p>
              Cable lubricant (sometimes called "cable wax" or "pulling compound") can significantly reduce friction during installation and is recommended for any run that is near the conduit factor limit or contains multiple bends. This does not change the conduit factor calculation, but it makes the practical installation easier and reduces the risk of cable damage.
            </p>
          </div>
        </div>
      </section>

      {/* Trunking Fill */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trunking Fill — The 45% Rule</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              While conduit fill uses the cable factor method, trunking fill uses a direct cross-sectional area calculation. The rule from BS 7671 and the IET Guidance Note 1 is that the total cross-sectional area of all cables installed in trunking must not exceed 45% of the internal cross-sectional area of the trunking.
            </p>
            <p>
              To perform a trunking fill calculation, you need the overall diameter of each cable (including insulation and sheath for multicore cables, or insulation only for singles). The cross-sectional area of each cable is calculated as pi times the radius squared. Sum the areas of all cables, then compare against 45% of the trunking's internal cross-sectional area (width x height for rectangular trunking).
            </p>
            <p>
              For example, consider a 100 mm x 50 mm trunking. The internal cross-sectional area is 100 x 50 = 5000 mm². 45% of 5000 = 2250 mm². If the total cross-sectional area of all cables is 2000 mm², the trunking is adequate: 2000 ≤ 2250.
            </p>
            <p>
              The 45% limit is more generous than the approximately 40% limit for conduit because trunking has a removable lid — cables are laid in from the top rather than pulled through, so the friction and pulling tension constraints are less severe. However, the heat dissipation requirement still applies, which is why the fill is limited to less than half.
            </p>
            <p>
              The Elec-Mate calculator includes a trunking fill mode alongside the conduit fill mode. Select the trunking dimensions, add the cables, and the calculator shows the fill percentage with a pass/fail indication against the 45% limit.
            </p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Calculate Conduit Fill — Step by Step</h2>
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
            Why Use the Elec-Mate Conduit Fill Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Eliminates guesswork and ensures your conduit is correctly sized every time.
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
        heading="Size Conduit Correctly Every Time"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
