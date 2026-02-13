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
  Activity,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question:
      'What is the relationship between line voltage and phase voltage in a three-phase system?',
    answer:
      'In a star (wye) connected three-phase system, the line voltage (measured between any two phases) is equal to the phase voltage (measured between a phase and the star point/neutral) multiplied by the square root of 3 (approximately 1.732). In the UK, the standard phase voltage is 230 V, giving a line voltage of 230 x 1.732 = 400 V. In a delta connected system, the line voltage equals the phase voltage, but the line current is the phase current multiplied by the square root of 3.',
  },
  {
    question: 'How do I calculate power in a balanced three-phase load?',
    answer:
      'For a balanced three-phase load where all three phases carry equal current at the same power factor, use the formula: P = square root of 3 x VL x IL x cos phi, where VL is the line voltage (400 V in the UK), IL is the line current in amps, and cos phi is the power factor. For example, a balanced load drawing 50 A per phase at a power factor of 0.85 gives: P = 1.732 x 400 x 50 x 0.85 = 29,444 W or approximately 29.4 kW.',
  },
  {
    question: 'What is the difference between star and delta connections?',
    answer:
      'In a star (wye) connection, one end of each winding is connected to a common star point (which becomes the neutral). The line voltage is root 3 times the phase voltage, and the line current equals the phase current. In a delta connection, the windings form a closed triangle with no neutral point. The line voltage equals the phase voltage, but the line current is root 3 times the phase current. Star connection gives access to two voltages (230 V and 400 V in the UK) and is used for distribution. Delta connection is commonly used for motor windings and transformer secondaries.',
  },
  {
    question: 'When do electricians encounter three-phase installations?',
    answer:
      'Three-phase supplies are standard in commercial and industrial premises where the total load exceeds the capacity of a single-phase supply (typically above 15-20 kW). Common three-phase applications include: commercial distribution boards and sub-mains, three-phase motor supplies (lifts, air conditioning, industrial machinery), large EV charging installations (22 kW or 50 kW+ chargers), commercial solar PV inverters above 3.6 kW, electric heating systems in larger buildings, and any installation where load balancing across phases is required. Many newer domestic properties with heat pumps and EV chargers are also being connected to three-phase supplies.',
  },
  {
    question: 'How do I handle an unbalanced three-phase load?',
    answer:
      'When a three-phase load is unbalanced (different current or power on each phase), you cannot use the single balanced formula. Instead, calculate the power on each phase separately using P = VP x IP x cos phi, where VP is the phase voltage (230 V) and IP is the current on that specific phase. The total power is the sum of all three phases. The neutral current in an unbalanced star-connected system is the vector sum of the three phase currents, which can be significant in heavily unbalanced installations. This is why BS 7671 requires the neutral conductor to be sized appropriately in three-phase systems.',
  },
  {
    question: 'What power factor should I use for three-phase calculations?',
    answer:
      'The power factor depends on the type of load. Resistive loads (heaters, kettles) have a power factor of 1.0. Induction motors typically have a power factor of 0.8 to 0.9 at full load, dropping to 0.3 to 0.5 at light load. LED lighting with power factor correction is typically 0.95 or above. Fluorescent lighting with magnetic ballasts is around 0.5 without correction. If the power factor is unknown, a value of 0.8 is commonly used as a conservative estimate for mixed commercial loads. Power factor correction equipment can improve the overall power factor to 0.95 or above, reducing the current drawn from the supply.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Balanced & Unbalanced Modes',
    description:
      'Switch between balanced three-phase calculations (single formula) and per-phase unbalanced calculations. Enter individual phase currents or a single balanced value.',
  },
  {
    icon: Activity,
    title: 'Star & Delta Configurations',
    description:
      'Automatically handles the voltage and current relationships for both star (wye) and delta connected loads. Select the configuration and the correct formulas are applied.',
  },
  {
    icon: Zap,
    title: 'Power Triangle Display',
    description:
      'Shows real power (kW), reactive power (kVAr), and apparent power (kVA) with power factor. Understand the full power picture for any three-phase installation.',
  },
  {
    icon: BarChart3,
    title: 'Phase Balance Indicator',
    description:
      'For unbalanced loads, shows the current on each phase and the neutral current. Highlights imbalances that could cause problems with voltage regulation or neutral overloading.',
  },
  {
    icon: Settings,
    title: 'Motor Starting Calculations',
    description:
      'Calculate motor starting current (typically 6-8 times full load current) to check voltage drop and protective device suitability during direct-on-line starting.',
  },
  {
    icon: Shield,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'All calculations follow the current 18th Edition wiring regulations including Amendment 3. Three-phase voltage drop uses the correct three-phase mV/A/m values from Appendix 4.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Three Phase Power Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate three-phase power, current, and voltage for balanced and unbalanced loads. Star and delta configurations for commercial and industrial electrical work.',
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

export default function ThreePhasePowerCalculatorPage() {
  useSEO({
    title: 'Three Phase Power Calculator | Electrical Power Calculations',
    description:
      'Calculate three-phase power, current, and voltage for balanced and unbalanced loads. Star and delta configurations. Essential for commercial and industrial electrical work.',
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
            Three Phase Power Calculator
            <span className="block text-yellow-400 mt-1">Star, Delta & Power Factor</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate three-phase power, current, and voltage for balanced and unbalanced loads.
            Handles star and delta configurations with full power triangle analysis.
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

      {/* What Is Three-Phase Power */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is Three-Phase Power?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Three-phase power is a method of alternating current (AC) electrical power generation,
              transmission, and distribution that uses three conductors, each carrying an
              alternating current of the same frequency and amplitude but displaced from one another
              by 120 degrees (one-third of a cycle). This phase separation is what gives three-phase
              power its key advantages over single-phase: higher power density, constant power
              delivery (no zero-crossing moments), and more efficient use of conductors.
            </p>
            <p>
              In the UK, the standard three-phase supply provides 400 V between any two line
              conductors and 230 V between any line conductor and neutral. This is because the line
              voltage equals the phase voltage multiplied by the square root of 3 (approximately
              1.732): 230 V x 1.732 = 398.4 V, rounded to 400 V. The nominal voltage tolerance is
              +10% / -6%, giving an actual range of 216.2 V to 253 V phase-to-neutral and 376 V to
              440 V line-to-line.
            </p>
            <p>
              Every electrician working on commercial and industrial installations needs to
              understand three-phase power calculations. Whether sizing cables for a three-phase
              sub-main, calculating the load on a three-phase distribution board, determining the
              current draw of a motor, or assessing voltage drop on a long cable run, the
              three-phase formulas are essential. The key difference from single-phase is the
              presence of the square root of 3 factor in the power and voltage/current
              relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Star vs Delta */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Star vs Delta Configurations
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Three-phase loads and generators can be connected in two fundamental configurations:
              star (also called wye, symbol Y) and delta (symbol triangle). The choice of
              configuration determines the relationship between line and phase voltages and
              currents.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">Star (Wye) Connection</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      V<sub>L</sub> = V<sub>P</sub> x root 3
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      I<sub>L</sub> = I<sub>P</sub>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Neutral point available (4-wire system)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Two voltages: 230 V and 400 V</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Used for: distribution, mixed loads</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">Delta Connection</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      V<sub>L</sub> = V<sub>P</sub>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      I<sub>L</sub> = I<sub>P</sub> x root 3
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>No neutral point (3-wire system)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Single voltage: 400 V only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Used for: motors, transformers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Three-Phase Power Formulas
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>The fundamental power formula for a balanced three-phase load is:</p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                P = root 3 x V<sub>L</sub> x I<sub>L</sub> x cos phi
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p>
                  <strong className="text-yellow-400">P</strong> = total three-phase real power in
                  watts
                </p>
                <p>
                  <strong className="text-yellow-400">
                    V<sub>L</sub>
                  </strong>{' '}
                  = line-to-line voltage (400 V in UK)
                </p>
                <p>
                  <strong className="text-yellow-400">
                    I<sub>L</sub>
                  </strong>{' '}
                  = line current in amperes
                </p>
                <p>
                  <strong className="text-yellow-400">cos phi</strong> = power factor (0 to 1)
                </p>
              </div>
            </div>
            <p>To find the line current when you know the power:</p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                I<sub>L</sub> = P / (root 3 x V<sub>L</sub> x cos phi)
              </p>
            </div>
            <p>
              For apparent power (kVA) and reactive power (kVAr), the power triangle relationships
              apply. Apparent power S = root 3 x V<sub>L</sub> x I<sub>L</sub> (without the power
              factor). Reactive power Q = S x sin phi. Real power P = S x cos phi. These three
              quantities form a right-angled triangle where S is the hypotenuse, P is the adjacent
              side, and Q is the opposite side.
            </p>
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section id="how-it-works" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Worked Examples</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 1: Balanced Three-Phase Motor
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A three-phase induction motor has a rated output of 15 kW with an efficiency of
                  90% and a power factor of 0.85. Calculate the line current drawn from a 400 V
                  supply.
                </p>
                <p className="font-mono text-white">Input power = 15,000 / 0.9 = 16,667 W</p>
                <p className="font-mono text-white">
                  I<sub>L</sub> = 16,667 / (1.732 x 400 x 0.85) = 16,667 / 588.9 ={' '}
                  <strong className="text-yellow-400">28.3 A</strong>
                </p>
                <p>
                  The motor draws 28.3 A per phase from the supply. This determines the cable size,
                  protective device rating, and contactor size needed.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 2: Unbalanced Three-Phase Distribution Board
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A three-phase distribution board in a small office has the following loads: L1 =
                  35 A, L2 = 28 A, L3 = 42 A. All loads are resistive (power factor 1.0). Calculate
                  the total power and assess the phase balance.
                </p>
                <p className="font-mono text-white">
                  P<sub>L1</sub> = 230 x 35 x 1.0 = 8,050 W
                </p>
                <p className="font-mono text-white">
                  P<sub>L2</sub> = 230 x 28 x 1.0 = 6,440 W
                </p>
                <p className="font-mono text-white">
                  P<sub>L3</sub> = 230 x 42 x 1.0 = 9,660 W
                </p>
                <p className="font-mono text-white">
                  Total = 8,050 + 6,440 + 9,660 ={' '}
                  <strong className="text-yellow-400">24,150 W (24.15 kW)</strong>
                </p>
                <p>
                  The imbalance between L2 (28 A) and L3 (42 A) is 14 A. The sub-main cable must be
                  sized for the highest phase current (42 A) plus the neutral current arising from
                  the imbalance. Good practice is to redistribute circuits to achieve better
                  balance.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 3: Three-Phase EV Charging Installation
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A 22 kW three-phase EV charger operates at 400 V with a power factor of 0.99.
                  Calculate the line current and determine the cable and protective device size.
                </p>
                <p className="font-mono text-white">
                  I<sub>L</sub> = 22,000 / (1.732 x 400 x 0.99) = 22,000 / 685.9 ={' '}
                  <strong className="text-yellow-400">32.1 A</strong>
                </p>
                <p>
                  A 32 A Type C MCB and 6 mm² 5-core SWA cable would be appropriate (subject to
                  voltage drop and derating calculations). The high power factor of 0.99 means the
                  current draw is close to the minimum possible for this power level.
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
            Why Use Elec-Mate's Three Phase Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working on commercial and industrial three-phase
            installations.
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
        heading="Calculate Three-Phase Power in Seconds"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
