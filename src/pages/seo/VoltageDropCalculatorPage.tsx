import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  Cable,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Shield,
  Lightbulb,
  Ruler,
  HelpCircle,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the maximum voltage drop allowed under BS 7671?',
    answer:
      'BS 7671 Table 4Ab sets the maximum voltage drop limits for installations supplied directly from a public low-voltage distribution system. For lighting circuits, the limit is 3% of the nominal supply voltage (6.9 V on a 230 V supply). For all other circuits including power and socket outlets, the limit is 5% of the nominal supply voltage (11.5 V on a 230 V supply). These limits apply from the origin of the installation to the most distant point of the circuit.',
  },
  {
    question: 'How do I calculate voltage drop for a cable run?',
    answer:
      'Use the formula: Voltage Drop (V) = mV/A/m × Ib × L ÷ 1000. First, look up the mV/A/m value from BS 7671 Table 4D1B to 4J4B for your specific cable type and installation method. Then multiply by the design current (Ib) in amps and the cable length (L) in metres. Divide by 1000 to convert millivolts to volts. For three-phase circuits, use the three-phase mV/A/m columns from the tables.',
  },
  {
    question: 'Where do I find mV/A/m values for cables?',
    answer:
      'The mV/A/m (millivolts per ampere per metre) values are found in the current-carrying capacity tables in Appendix 4 of BS 7671. For thermoplastic (PVC) cables, refer to Tables 4D1A/4D1B (single-core) and 4D2A/4D2B (multicore). For thermosetting (XLPE/SWA) cables, refer to Tables 4E1A/4E1B through 4E4A/4E4B. The "B" tables contain the voltage drop values, while the "A" tables contain the current ratings. Always use the correct table for your cable type, conductor material (copper or aluminium), and installation method.',
  },
  {
    question: 'Does temperature affect voltage drop calculations?',
    answer:
      'Yes. The mV/A/m values in the BS 7671 tables are given at the conductor operating temperature, not ambient temperature. When a cable is lightly loaded, it runs cooler and its resistance is lower, meaning the actual voltage drop will be less than the tabulated figure. You can apply a correction using the formula in BS 7671 Appendix 4, which accounts for the difference between the tabulated conductor operating temperature and the actual conductor temperature. This correction can be beneficial on long cable runs where voltage drop is marginal.',
  },
  {
    question: 'What is the difference between voltage drop for single-phase and three-phase circuits?',
    answer:
      'For single-phase circuits, you use the single-phase mV/A/m column (labelled "2-core cable, single-phase a.c. or d.c." in the tables). For three-phase circuits, you use the three-phase mV/A/m column (labelled "3-core or 4-core cable, three-phase a.c."). The three-phase values are lower because of the way voltage is distributed across the phases. The formula is the same in both cases: Voltage Drop = mV/A/m × Ib × L ÷ 1000. For single-phase, the result is compared against the percentage of 230 V. For three-phase, it is compared against the percentage of 400 V.',
  },
];

const howToSteps = [
  {
    name: 'Determine the circuit parameters',
    text: 'Identify the design current (Ib) of the circuit in amps, the length of the cable run (L) in metres from the distribution board to the furthest point, and whether the circuit is single-phase or three-phase. Also note the type of circuit: lighting (3% limit) or power (5% limit).',
  },
  {
    name: 'Select the cable type and installation method',
    text: 'Determine the cable type you are using (e.g. twin and earth 6242Y, SWA, singles in conduit) and the installation method (clipped direct, in trunking, buried, etc.). This determines which table in BS 7671 Appendix 4 you will reference.',
  },
  {
    name: 'Look up the mV/A/m value',
    text: 'Open the appropriate voltage drop table in BS 7671 (Tables 4D1B through 4J4B). Find the row matching your cable cross-sectional area (e.g. 2.5 mm², 4 mm², 6 mm²) and read off the mV/A/m value for your circuit type (single-phase or three-phase).',
  },
  {
    name: 'Apply the voltage drop formula',
    text: 'Calculate: Voltage Drop = mV/A/m × Ib × L ÷ 1000. For example, a 2.5 mm² twin and earth cable carrying 20 A over 30 metres with a tabulated value of 18 mV/A/m gives: 18 × 20 × 30 ÷ 1000 = 10.8 V.',
  },
  {
    name: 'Check against the BS 7671 limit',
    text: 'Compare your calculated voltage drop against the maximum allowed: 6.9 V for lighting (3% of 230 V) or 11.5 V for power (5% of 230 V). If the voltage drop exceeds the limit, you must either increase the cable size, reduce the cable run length, or split the circuit.',
  },
  {
    name: 'Consider correction factors if needed',
    text: 'If the voltage drop is marginal, consider applying the conductor temperature correction factor from Appendix 4 of BS 7671. When the cable is not fully loaded, the actual voltage drop will be lower than the tabulated value. This correction can sometimes allow a smaller cable size to be used.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Voltage Drop Calculation',
    description:
      'Enter your cable size, length, and load current. Get the voltage drop in volts and as a percentage instantly with pass/fail indication against BS 7671 limits.',
  },
  {
    icon: Cable,
    title: 'All UK Cable Types',
    description:
      'Supports twin and earth (6242Y), SWA armoured, singles in conduit/trunking, XLPE, MI, and flexible cables. Copper and aluminium conductors covered.',
  },
  {
    icon: Ruler,
    title: 'Maximum Cable Length',
    description:
      'Automatically calculates the maximum cable run length for your chosen cable size and load before exceeding BS 7671 voltage drop limits.',
  },
  {
    icon: BarChart3,
    title: 'Visual Compliance Indicator',
    description:
      'Clear pass/fail display showing your calculated voltage drop against the 3% lighting and 5% power limits. Colour-coded for instant assessment on site.',
  },
  {
    icon: BookOpen,
    title: 'Built-in mV/A/m Tables',
    description:
      'All BS 7671 Appendix 4 voltage drop tables built in. No need to carry the regulation book — select your cable and the correct value is looked up automatically.',
  },
  {
    icon: Shield,
    title: 'BS 7671:2018+A2:2022 Compliant',
    description:
      'All calculations follow the current 18th Edition wiring regulations including Amendment 2. Values verified against the published tables in Appendix 4.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Voltage Drop Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate voltage drop to BS 7671 limits. Check maximum cable run lengths, verify compliance with 3% lighting and 5% power limits.',
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
  name: 'How to Calculate Voltage Drop to BS 7671',
  description:
    'Step-by-step guide to calculating voltage drop for electrical installations in the UK using BS 7671 tables and the standard formula.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function VoltageDropCalculatorPage() {
  useSEO({
    title: 'Voltage Drop Calculator UK | BS 7671 Compliant',
    description:
      'Calculate voltage drop to BS 7671 limits. Check maximum cable run lengths, verify compliance with 3% lighting and 5% power limits. Part of 50+ free electrical calculators.',
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
            Voltage Drop Calculator
            <span className="block text-yellow-400 mt-1">BS 7671 Compliant</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate voltage drop for any cable type and installation method. Instantly check compliance with the 3% lighting and 5% power limits from BS 7671 Table 4Ab.
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

      {/* What Is Voltage Drop */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Voltage Drop?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Voltage drop is the reduction in electrical potential (voltage) along a conductor as current flows through it. Every cable has resistance, and when current passes through that resistance, some of the supply voltage is lost as heat in the cable itself. The voltage available at the load end of the cable is therefore lower than the voltage at the supply end.
            </p>
            <p>
              In practical terms, excessive voltage drop means that the equipment connected at the far end of a cable run does not receive its full rated voltage. For lighting circuits, this causes lamps to produce less light and can lead to visible flickering, particularly with LED drivers. For motors and other power equipment, low voltage causes higher current draw, reduced efficiency, overheating, and premature failure. On very long cable runs — such as those found in commercial buildings, farms, and industrial sites — voltage drop is often the factor that determines the minimum cable size rather than the current-carrying capacity alone.
            </p>
            <p>
              The amount of voltage drop depends on three main factors: the resistance of the cable per unit length (determined by its cross-sectional area and conductor material), the current flowing through it, and the length of the cable run. Copper conductors have lower resistance than aluminium for the same cross-sectional area, and larger cables have lower resistance than smaller ones. This is why increasing the cable size is one of the primary methods of reducing voltage drop.
            </p>
          </div>
        </div>
      </section>

      {/* BS 7671 Limits */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">BS 7671 Voltage Drop Limits</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671:2018+A2:2022, the 18th Edition of the IET Wiring Regulations, sets out the maximum permitted voltage drop for electrical installations in the United Kingdom. These limits are defined in <strong className="text-yellow-400">Regulation 525.1</strong> and quantified in <strong className="text-yellow-400">Table 4Ab</strong>.
            </p>
            <p>
              For installations supplied directly from a public low-voltage distribution system (i.e. most domestic and commercial properties connected to the DNO network), the limits in Table 4Ab are:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Lighting Circuits</h3>
                </div>
                <p className="text-3xl font-bold text-yellow-400 mb-1">3%</p>
                <p className="text-white text-sm">of nominal voltage = 6.9 V on a 230 V supply</p>
              </div>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Power Circuits</h3>
                </div>
                <p className="text-3xl font-bold text-yellow-400 mb-1">5%</p>
                <p className="text-white text-sm">of nominal voltage = 11.5 V on a 230 V supply</p>
              </div>
            </div>
            <p>
              For installations supplied from a private LV supply (such as a generator or transformer), the permitted voltage drop is higher: 6% for lighting and 8% for other uses. This is because the supply point is typically closer to the installation and the electrician has more control over the supply characteristics.
            </p>
            <p>
              It is important to note that these percentage limits apply from the origin of the installation (the supply terminals) to the most distant point of the circuit. If an installation has sub-distribution boards, the voltage drop accumulates along the entire path from the main incoming supply through any sub-mains to the final circuit. The total voltage drop across all sections of cable must remain within the limit.
            </p>
          </div>
        </div>
      </section>

      {/* The Formula */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Voltage Drop Formula</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The standard voltage drop formula used with BS 7671 tables is straightforward:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                VD = (mV/A/m × I<sub>b</sub> × L) ÷ 1000
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p><strong className="text-yellow-400">VD</strong> = voltage drop in volts</p>
                <p><strong className="text-yellow-400">mV/A/m</strong> = millivolts per ampere per metre (from BS 7671 tables)</p>
                <p><strong className="text-yellow-400">I<sub>b</sub></strong> = design current of the circuit in amperes</p>
                <p><strong className="text-yellow-400">L</strong> = length of the cable run in metres</p>
              </div>
            </div>
            <p>
              The mV/A/m value is the key figure. It represents the voltage drop per ampere of current per metre of cable length, expressed in millivolts. This value is specific to each cable type, conductor material, cross-sectional area, and whether the circuit is single-phase or three-phase. These values are tabulated in BS 7671 Appendix 4, in the "B" series of tables (4D1B, 4D2B, 4E1B, etc.).
            </p>
            <p>
              For example, a 2.5 mm² copper twin and earth cable (flat thermoplastic, Table 4D5B) has a tabulated voltage drop of 18 mV/A/m for single-phase circuits. If this cable carries 20 A over a length of 25 metres, the voltage drop is:
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <p className="font-mono text-white">VD = 18 × 20 × 25 ÷ 1000 = <strong className="text-yellow-400">9.0 V</strong></p>
              <p className="text-white text-sm mt-2">
                This is 3.91% of 230 V — which passes the 5% power limit (11.5 V) but would <strong className="text-yellow-400">fail</strong> the 3% lighting limit (6.9 V). If this were a lighting circuit, you would need to increase the cable to 4 mm².
              </p>
            </div>
            <p>
              The division by 1000 is necessary because the tabulated values are in millivolts, and we need the result in volts. Always remember to express the final answer as a percentage of the nominal supply voltage to compare against the BS 7671 limit: (VD ÷ 230) × 100 for single-phase, or (VD ÷ 400) × 100 for three-phase.
            </p>
          </div>
        </div>
      </section>

      {/* Looking Up mV/A/m Values */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Look Up mV/A/m Values</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The voltage drop per ampere per metre values are found in the "B" series of current-carrying capacity tables in Appendix 4 of BS 7671. Each table covers a specific cable construction. The most commonly used tables for UK domestic and commercial installations are:
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Table 4D5B</strong> — Flat twin and earth cable (6242Y), clipped direct or in thermal insulation. This is the most common domestic cable type.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Table 4D1B</strong> — Single-core non-armoured thermoplastic (PVC) cables, for singles in conduit or trunking installations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Table 4D2B</strong> — Multicore non-armoured thermoplastic cables, such as 3-core flex or submain cables.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Table 4E1B to 4E4B</strong> — Thermosetting (XLPE) and SWA armoured cables, commonly used for sub-mains and external cable runs.
                </span>
              </li>
            </ul>
            <p>
              Within each table, find the row for your cable cross-sectional area (1.0 mm², 1.5 mm², 2.5 mm², 4 mm², 6 mm², 10 mm², 16 mm², 25 mm², etc.). Then read across to the column for your circuit type: "2-core cable, single-phase a.c. or d.c." or "3-core or 4-core cable, three-phase a.c.". Some tables split the value into separate resistive (r) and reactive (x) components for larger cables where reactance becomes significant.
            </p>
            <p>
              The Elec-Mate voltage drop calculator has all of these tables built in. Simply select your cable type and cross-sectional area, and the correct mV/A/m value is automatically applied to the calculation. This eliminates manual table look-up errors and saves considerable time when designing circuits or verifying installations on site.
            </p>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Calculate Voltage Drop — Step by Step</h2>
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

      {/* Worked Examples */}
      <section className="py-16 px-5 bg-white/[0.02]">
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
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 1: Ring Final Circuit (Sockets)</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A ring final circuit supplies socket outlets in a domestic kitchen. The circuit is wired in 2.5 mm² flat twin and earth cable (Table 4D5B). The total cable length of the ring is 50 metres. The design current is 30 A (though the ring is protected by a 32 A MCB). What is the voltage drop?
                </p>
                <p>
                  For a ring circuit, the effective length used in the volt drop calculation is one quarter of the total ring length (because current flows in both directions around the ring). Effective length = 50 ÷ 4 = 12.5 m.
                </p>
                <p className="font-mono text-white">
                  VD = 18 × 30 × 12.5 ÷ 1000 = <strong className="text-yellow-400">6.75 V</strong> (2.93%)
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 6.75 V is within the 11.5 V (5%) limit for power circuits.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 2: Lighting Circuit in a Workshop</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A lighting circuit in a large workshop runs 45 metres from the consumer unit to the furthest luminaire. The circuit is wired in 1.5 mm² flat twin and earth cable (Table 4D5B, mV/A/m = 29). The design current is 8 A.
                </p>
                <p className="font-mono text-white">
                  VD = 29 × 8 × 45 ÷ 1000 = <strong className="text-yellow-400">10.44 V</strong> (4.54%)
                </p>
                <p>
                  Result: <strong className="text-red-400">FAIL</strong> — 10.44 V exceeds the 6.9 V (3%) limit for lighting circuits. The cable must be increased to 2.5 mm² (mV/A/m = 18), giving: 18 × 8 × 45 ÷ 1000 = 6.48 V (2.82%) — <strong className="text-green-400">PASS</strong>.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 3: Three-Phase Sub-Main</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A three-phase SWA sub-main cable runs 60 metres from the main switchboard to a sub-distribution board. The cable is 25 mm² 4-core copper XLPE SWA (Table 4E4B, three-phase mV/A/m = 1.50). The design current is 80 A per phase.
                </p>
                <p className="font-mono text-white">
                  VD = 1.50 × 80 × 60 ÷ 1000 = <strong className="text-yellow-400">7.2 V</strong> (1.8% of 400 V)
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 7.2 V is within the 20 V (5% of 400 V) limit for a three-phase power circuit. However, remember that the voltage drop in the final circuits downstream of the sub-distribution board must also be added, and the total must remain within 5%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use the Elec-Mate Voltage Drop Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Faster and more accurate than manual table look-ups.
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

      {/* Common Cable mV/A/m Reference */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Cable className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Cable Voltage Drop Values</h2>
          </div>
          <p className="text-white mb-6 leading-relaxed">
            Below are the most commonly referenced mV/A/m values from BS 7671 Table 4D5B for flat twin and earth cable (copper conductors, single-phase). These are the cables used in the vast majority of domestic and small commercial installations.
          </p>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Size</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">mV/A/m (1-phase)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Typical Use</div>
            </div>
            {[
              { size: '1.0 mm²', mvam: '44', use: 'Lighting' },
              { size: '1.5 mm²', mvam: '29', use: 'Lighting' },
              { size: '2.5 mm²', mvam: '18', use: 'Sockets / radials' },
              { size: '4.0 mm²', mvam: '11', use: 'Cooker / shower' },
              { size: '6.0 mm²', mvam: '7.3', use: 'Cooker / shower' },
              { size: '10 mm²', mvam: '4.4', use: 'Sub-main / EV charger' },
              { size: '16 mm²', mvam: '2.8', use: 'Sub-main' },
            ].map((row) => (
              <div key={row.size} className="grid grid-cols-3 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.size}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.mvam}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.use}</div>
              </div>
            ))}
          </div>
          <p className="text-white text-sm mt-4 leading-relaxed">
            These values are extracted from BS 7671:2018+A2:2022, Table 4D5B (Reference Method C — clipped direct). Always verify against the current edition of the regulations for your specific installation method.
          </p>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Calculate Voltage Drop in Seconds"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
