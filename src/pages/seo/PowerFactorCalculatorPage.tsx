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
  Gauge,
  TrendingUp,
  PoundSterling,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is power factor and why does it matter?',
    answer:
      'Power factor is the ratio of real power (kW) to apparent power (kVA) in an AC electrical system. It is expressed as a number between 0 and 1, or as a percentage between 0% and 100%. A power factor of 1.0 (unity) means all the power drawn from the supply is being used to do useful work. A low power factor — typically below 0.85 — means a significant portion of the current drawn from the supply is not performing useful work but is instead sustaining the magnetic fields in inductive loads such as motors, transformers, and fluorescent lighting ballasts. This wasted current still flows through the cables, switchgear, and transformer, causing additional I squared R losses (heating), requiring larger cable sizes, and reducing the effective capacity of the installation. Electricity suppliers penalise low power factor because it means they must supply more current (and therefore more apparent power) to deliver the same amount of real power to the customer.',
  },
  {
    question: 'How do I calculate power factor from kW and kVA?',
    answer:
      'Power factor equals real power (kW) divided by apparent power (kVA). For example, if a motor draws 15 kVA from the supply and delivers 12 kW of useful mechanical work, the power factor is 12 / 15 = 0.80 (or 80%). You can also calculate power factor from voltage and current measurements: apparent power (kVA) = voltage x current / 1000 for single-phase, or voltage x current x 1.732 / 1000 for three-phase. If you know the kW and kVAr (reactive power), use the formula: power factor = kW / sqrt(kW squared + kVAr squared). The Elec-Mate power factor calculator handles all three methods and lets you convert between kW, kVA, and kVAr instantly.',
  },
  {
    question: 'What size capacitor bank do I need for power factor correction?',
    answer:
      'The capacitor bank size in kVAr equals the real power (kW) multiplied by the difference between the tangent of the original power factor angle and the tangent of the target power factor angle. For example, to correct a 100 kW load from 0.75 to 0.95: the original angle is arccos(0.75) = 41.41 degrees, so tan(41.41) = 0.8819. The target angle is arccos(0.95) = 18.19 degrees, so tan(18.19) = 0.3287. The required kVAr = 100 x (0.8819 - 0.3287) = 55.32 kVAr. You would select a standard capacitor bank of 50 or 60 kVAr. The Elec-Mate calculator performs this calculation automatically, including recommending standard capacitor bank sizes available from UK suppliers.',
  },
  {
    question: 'What are the penalties for low power factor in the UK?',
    answer:
      "UK electricity suppliers typically charge reactive power penalties when a site's power factor falls below 0.95 or 0.90, depending on the tariff. The penalty is usually applied as a reactive power charge in pence per kVAr per month, or as a maximum demand charge calculated on kVA rather than kW. For a site consuming 200 kW at a power factor of 0.70, the apparent power is 200 / 0.70 = 286 kVA. If the supplier charges based on kVA, the customer is paying for 286 kVA rather than the 200 kW they actually use — a 43% surcharge. Additionally, low power factor means higher current flows through the supply cables and transformer, increasing distribution losses and reducing the available capacity for other loads. Large industrial and commercial sites can save thousands of pounds per year by installing power factor correction equipment to bring their power factor above 0.95.",
  },
  {
    question: 'What is the difference between leading and lagging power factor?',
    answer:
      'A lagging power factor occurs when the current waveform lags behind the voltage waveform. This is caused by inductive loads — motors, transformers, solenoids, fluorescent lighting with magnetic ballasts, and welding equipment. The vast majority of industrial and commercial loads are inductive, so most installations have a lagging power factor. A leading power factor occurs when the current waveform leads the voltage waveform. This is caused by capacitive loads — power factor correction capacitors, long runs of lightly loaded cable, and some electronic power supplies. Over-correction with capacitors can push the power factor to a leading value, which is equally undesirable because it can cause voltage rise, resonance issues, and interference with sensitive equipment. The target is to correct to a slightly lagging value of 0.95 to 0.98, never to unity or beyond.',
  },
  {
    question: 'Can power factor correction damage my installation?',
    answer:
      'Power factor correction is safe when properly designed and installed, but there are risks if done incorrectly. Over-correction (installing too many capacitors) can push the power factor to a leading value, causing voltage rise at the point of connection and potentially damaging voltage-sensitive equipment. Harmonic resonance is a more serious risk: if the installation has significant harmonic distortion (from variable speed drives, LED drivers, UPS systems, or IT equipment), the capacitor bank can resonate with the supply inductance at a harmonic frequency, amplifying the harmonics and causing overheating, capacitor failure, or even equipment damage. To avoid this, a harmonic survey should be conducted before installing capacitor banks on sites with significant non-linear loads, and detuned or active harmonic filter solutions should be used where necessary. The Elec-Mate calculator includes a harmonic risk assessment to flag when specialist design is needed.',
  },
];

const howToSteps = [
  {
    name: 'Measure or identify the existing power factor',
    text: 'Use a power quality analyser or clamp meter with power factor measurement capability to measure the existing power factor of the installation or individual loads. Alternatively, read the power factor from the electricity bill — many commercial and industrial bills show the average power factor or the ratio of kW to kVA. If you only have voltage and current readings, calculate apparent power (kVA) and compare with the known real power (kW) of the load.',
  },
  {
    name: 'Determine the real power (kW) of the load',
    text: 'Identify the total real power consumption of the installation in kilowatts. This is the actual useful power that performs work — running motors, heating elements, lighting, and so on. You can find this from the electricity meter readings, the supply agreement, or by measuring with a power analyser. For a single load, the nameplate rating in kW is often sufficient.',
  },
  {
    name: 'Set the target power factor',
    text: 'The typical target is 0.95 lagging. This provides a good balance between cost savings and safety margin. Some suppliers require 0.95 or above to avoid reactive power charges; others set the threshold at 0.90. Never target unity (1.0) or leading power factor, as this risks over-correction. A target of 0.95 to 0.98 lagging is standard practice in the UK.',
  },
  {
    name: 'Calculate the required capacitor bank size',
    text: 'Use the formula: kVAr required = kW x (tan(arccos(existing PF)) - tan(arccos(target PF))). For example, 150 kW load at 0.78 PF corrected to 0.95: kVAr = 150 x (tan(38.74) - tan(18.19)) = 150 x (0.8028 - 0.3287) = 150 x 0.4741 = 71.1 kVAr. Select the nearest standard capacitor bank size — in this case, 75 kVAr.',
  },
  {
    name: 'Select the correction equipment type',
    text: 'Choose between fixed capacitor banks (for constant loads), automatic capacitor banks with stepped switching (for variable loads), or active power factor correction units (for installations with high harmonic content). For most commercial and light industrial sites, an automatic stepped capacitor bank is the best choice. The Elec-Mate calculator recommends the appropriate type based on your load profile.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'kW / kVA / kVAr Converter',
    description:
      'Enter any two values and the calculator computes the third. Convert between real power, apparent power, and reactive power instantly with the power triangle relationships.',
  },
  {
    icon: Gauge,
    title: 'Capacitor Bank Sizing',
    description:
      'Calculate the exact kVAr capacity needed to correct from your existing power factor to your target. Recommends standard capacitor bank sizes available from UK suppliers.',
  },
  {
    icon: PoundSterling,
    title: 'Cost Savings Estimator',
    description:
      'Enter your electricity tariff details and the calculator shows the annual savings from power factor correction. Includes reactive power charge reduction and maximum demand savings.',
  },
  {
    icon: TrendingUp,
    title: 'Power Triangle Visualisation',
    description:
      'See the power triangle graphically — real power, reactive power, and apparent power shown to scale. Watch the triangle change as you adjust the power factor.',
  },
  {
    icon: BarChart3,
    title: 'Harmonic Risk Assessment',
    description:
      'Answer a few questions about your connected loads, and the calculator flags whether harmonic resonance is a risk. Recommends detuned reactors or active filters where needed.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'All calculations align with BS 7671:2018+A3:2024 and the IET Code of Practice for energy efficiency. Part of 70 electrical calculators built for UK electricians.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Power Factor Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate power factor, convert between kW kVA and kVAr, size capacitor banks for PF correction. Built for UK electricians to BS 7671:2018+A3:2024.',
  url: 'https://elec-mate.com/tools/power-factor-calculator',
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
  name: 'How to Calculate Power Factor and Size Correction Capacitors',
  description:
    'Step-by-step guide to calculating power factor, determining capacitor bank size for PF correction, and estimating cost savings for UK electrical installations.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function PowerFactorCalculatorPage() {
  useSEO({
    title: 'Power Factor Calculator | kW kVA kVAr Correction',
    description:
      'Calculate power factor, convert between kW kVA and kVAr, size capacitor banks for PF correction. Free calculator built for UK electricians to BS 7671.',
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
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
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
            Power Factor Calculator
            <span className="block text-yellow-400 mt-1">kW kVA kVAr Correction to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate power factor, convert between real, apparent, and reactive power, and size
            capacitor banks for correction. See exactly how much low power factor is costing your
            clients — and how to fix it.
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

      {/* What Is Power Factor */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Gauge className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Power Factor?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Power factor is a measure of how efficiently an electrical installation converts the
              current it draws from the supply into useful work. In an ideal world, every ampere of
              current drawn would contribute directly to powering the load — turning a motor shaft,
              heating an element, or producing light. In reality, most electrical loads are not
              purely resistive: they contain inductive or capacitive elements that cause the current
              waveform to shift out of phase with the voltage waveform.
            </p>
            <p>
              When the current and voltage are perfectly in phase, the power factor is 1.0 — also
              called unity power factor. All the power drawn from the supply is real power (measured
              in kilowatts, kW) and performs useful work. When the current lags or leads the
              voltage, only a portion of the apparent power (measured in kilovolt-amperes, kVA) is
              real power. The remainder is reactive power (measured in kilovolt-amperes reactive,
              kVAr), which oscillates between the supply and the load without doing any useful work
              but still causes current to flow through the cables and switchgear.
            </p>
            <p>
              <strong className="text-yellow-400">The power triangle</strong> is the fundamental
              relationship that links these three quantities. Real power (kW) forms the horizontal
              leg, reactive power (kVAr) forms the vertical leg, and apparent power (kVA) is the
              hypotenuse. The angle between real power and apparent power is called the phase angle
              (phi), and the cosine of this angle is the power factor: PF = cos(phi) = kW / kVA.
            </p>
            <p>
              Understanding power factor matters because it directly affects installation sizing,
              energy costs, and equipment lifespan. A poor power factor means the installation draws
              more current than necessary, which requires larger cables, larger switchgear, and a
              larger transformer — all of which cost more to install and maintain. It also means
              higher losses in the distribution system and, for commercial and industrial customers,
              additional charges from the electricity supplier.
            </p>
          </div>
        </div>
      </section>

      {/* True, Apparent, and Reactive Power */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              True Power, Apparent Power, and Reactive Power
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Real (true) power (kW)</strong> is the power that
              actually performs useful work. It heats elements, turns motor shafts, and produces
              light. Real power is what you pay for on a domestic electricity bill and what the load
              actually consumes. It is measured in kilowatts (kW) or watts (W).
            </p>
            <p>
              <strong className="text-yellow-400">Apparent power (kVA)</strong> is the total power
              that the supply must deliver to the installation. It is the product of the RMS voltage
              and the RMS current: for single-phase, kVA = V x I / 1000; for three-phase, kVA = V x
              I x 1.732 / 1000. Apparent power is what the supply cables, switchgear, transformer,
              and generator must be rated for. It is always equal to or greater than the real power.
            </p>
            <p>
              <strong className="text-yellow-400">Reactive power (kVAr)</strong> is the power that
              oscillates between the supply and the load, sustaining the magnetic and electric
              fields in inductive and capacitive components. It does no useful work, but it is
              essential for the operation of motors, transformers, and other electromagnetic
              devices. Reactive power is measured in kilovolt-amperes reactive (kVAr). For inductive
              loads, the reactive power is positive (lagging); for capacitive loads, it is negative
              (leading).
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                kVA = sqrt(kW² + kVAr²)
              </p>
              <p className="mt-3 text-sm text-white">
                The power triangle: apparent power is always the hypotenuse
              </p>
            </div>
            <p>
              The relationship between these three quantities is always governed by the power
              triangle. If you know any two, you can calculate the third. This is what the Elec-Mate
              power factor calculator does: enter any two of kW, kVA, or kVAr, and it instantly
              computes the third, along with the power factor, the phase angle, and the current
              drawn from the supply.
            </p>
          </div>
        </div>
      </section>

      {/* Why Low PF Costs Money */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <PoundSterling className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Low Power Factor Costs Money
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Low power factor has both direct and indirect costs. The direct costs are the reactive
              power charges levied by the electricity supplier. Most commercial and industrial
              tariffs in the UK include a reactive power charge — typically measured in pence per
              kVAr per month — that is applied when the site's average power factor falls below a
              threshold, usually 0.90 or 0.95. Some suppliers calculate maximum demand charges based
              on kVA rather than kW, which penalises low power factor even more heavily.
            </p>
            <p>
              <strong className="text-yellow-400">Example:</strong> A factory draws 200 kW at a
              power factor of 0.70. The apparent power is 200 / 0.70 = 285.7 kVA, and the reactive
              power is sqrt(285.7² - 200²) = 204.1 kVAr. If the supplier charges based on kVA, the
              factory is paying for 285.7 kVA of capacity when it only needs 200 kW. If the maximum
              demand charge is £5 per kVA per month, the factory is paying £1,428.50 per month
              instead of £1,000 — an excess of £428.50 per month, or £5,142 per year. Correcting the
              power factor to 0.95 would reduce the kVA to 210.5, cutting the excess charge to just
              £52.50 per month.
            </p>
            <p>
              The indirect costs are equally significant. Higher current flow means higher I²R
              losses in the distribution cables, which appear as wasted heat. The cables,
              switchgear, and transformer run hotter, reducing their lifespan and increasing the
              risk of failure. The available capacity of the installation is reduced: a 500 kVA
              transformer supplying a load at 0.70 power factor can only deliver 350 kW of useful
              power, whereas the same transformer at 0.95 PF can deliver 475 kW. Improving power
              factor effectively increases the available capacity of existing infrastructure without
              any physical upgrade.
            </p>
            <p>
              For electricians working on commercial and industrial sites, understanding power
              factor and being able to recommend correction solutions is a valuable skill that can
              generate additional revenue. A power factor survey followed by a correction
              installation is a high-value service that pays for itself through energy savings,
              often within 12 to 18 months.
            </p>
          </div>
        </div>
      </section>

      {/* PF Correction with Capacitors */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Power Factor Correction with Capacitors
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The most common method of power factor correction is the installation of capacitor
              banks. Capacitors generate leading reactive power (negative kVAr), which cancels out
              the lagging reactive power drawn by inductive loads. The net reactive power at the
              point of supply is reduced, bringing the power factor closer to unity.
            </p>
            <p>
              <strong className="text-yellow-400">Fixed capacitor banks</strong> are used where the
              load is constant or near-constant — for example, a single large motor that runs
              continuously. A fixed capacitor is wired in parallel with the load and provides a
              constant amount of kVAr correction. The capacitor size is calculated to correct the
              load's specific power factor to the target value.
            </p>
            <p>
              <strong className="text-yellow-400">Automatic capacitor banks</strong> are used where
              the load varies throughout the day. An automatic unit contains multiple capacitor
              stages (steps), each with its own contactor, controlled by a power factor controller.
              The controller continuously monitors the power factor at the incoming supply and
              switches capacitor stages in and out to maintain the target power factor. This
              prevents over-correction when the load drops and under-correction when the load
              increases.
            </p>
            <p>
              <strong className="text-yellow-400">Detuned capacitor banks</strong> include series
              reactors that shift the resonant frequency of the capacitor bank away from common
              harmonic frequencies. This prevents harmonic resonance — a dangerous condition where
              the capacitor bank amplifies harmonic currents instead of correcting the power factor.
              Detuned banks are essential on any site with significant harmonic-producing loads such
              as variable speed drives, LED lighting, IT equipment, or UPS systems.
            </p>
            <p>
              The sizing formula is: kVAr required = kW x (tan(arccos(existing PF)) -
              tan(arccos(target PF))). The Elec-Mate calculator performs this calculation
              automatically and recommends the nearest standard capacitor bank size.
            </p>
          </div>
        </div>
      </section>

      {/* Industrial Tariff Penalties */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Industrial Tariff Penalties and Savings
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              UK electricity suppliers use several mechanisms to penalise sites with poor power
              factor. Understanding these mechanisms allows electricians to calculate the payback
              period for correction equipment and present a compelling financial case to their
              clients.
            </p>
            <p>
              <strong className="text-yellow-400">Reactive power charges:</strong> Many half-hourly
              metered tariffs include a charge for reactive power consumption above a threshold. The
              threshold is usually defined as a power factor below 0.95 or a reactive power
              exceeding 33% of the real power (which corresponds to a power factor of 0.95). The
              charge is typically between 0.3p and 1.5p per kVAr per half-hour period, which can add
              up to several thousand pounds per year for large sites.
            </p>
            <p>
              <strong className="text-yellow-400">Maximum demand charges based on kVA:</strong> Some
              tariffs calculate the monthly maximum demand charge based on kVA rather than kW. Since
              kVA is always higher than kW when the power factor is below unity, the customer pays a
              premium for every kVA above the kW value. The excess kVA represents the reactive power
              component and is entirely avoidable with correction.
            </p>
            <p>
              <strong className="text-yellow-400">Capacity charges:</strong> The agreed supply
              capacity (ASC) determines the maximum power a site can draw. If the ASC is defined in
              kVA, a site with poor power factor reaches its capacity limit at a lower kW level,
              potentially requiring a costly supply upgrade. Improving power factor increases the
              usable kW capacity within the existing ASC.
            </p>
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
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 1: Single Motor Correction
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A 30 kW three-phase induction motor has a power factor of 0.78 at full load.
                  Calculate the capacitor size needed to correct to 0.95.
                </p>
                <p className="font-mono text-white">
                  Existing angle = arccos(0.78) = 38.74 degrees, tan(38.74) ={' '}
                  <strong className="text-yellow-400">0.8028</strong>
                </p>
                <p className="font-mono text-white">
                  Target angle = arccos(0.95) = 18.19 degrees, tan(18.19) ={' '}
                  <strong className="text-yellow-400">0.3287</strong>
                </p>
                <p className="font-mono text-white">
                  kVAr required = 30 x (0.8028 - 0.3287) = 30 x 0.4741 ={' '}
                  <strong className="text-yellow-400">14.2 kVAr</strong>
                </p>
                <p>
                  Result: Install a <strong className="text-green-400">15 kVAr capacitor</strong> at
                  the motor terminals. The corrected apparent power drops from 38.5 kVA to 31.6 kVA,
                  reducing the current by 18%.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 2: Factory Main Incomer Correction
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A factory draws 250 kW at a power factor of 0.72 from a 400 kVA transformer. The
                  supplier charges £4.50 per kVA per month for maximum demand. Calculate the savings
                  from correcting to 0.95.
                </p>
                <p className="font-mono text-white">
                  Before correction: kVA = 250 / 0.72 ={' '}
                  <strong className="text-yellow-400">347.2 kVA</strong>
                </p>
                <p className="font-mono text-white">
                  After correction: kVA = 250 / 0.95 ={' '}
                  <strong className="text-yellow-400">263.2 kVA</strong>
                </p>
                <p className="font-mono text-white">
                  Monthly saving = (347.2 - 263.2) x £4.50 = 84 x £4.50 ={' '}
                  <strong className="text-yellow-400">£378 per month</strong>
                </p>
                <p className="font-mono text-white">
                  Annual saving = £378 x 12 ={' '}
                  <strong className="text-green-400">£4,536 per year</strong>
                </p>
                <p>
                  kVAr required = 250 x (tan(43.95) - tan(18.19)) = 250 x (0.9646 - 0.3287) ={' '}
                  <strong className="text-yellow-400">158.9 kVAr</strong>. Install a 150 kVAr
                  automatic capacitor bank. Typical cost: £4,000 to £6,000 installed. Payback
                  period: 10 to 16 months.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 3: Power Triangle Conversion
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A three-phase supply reads 415 V and 120 A per phase. The real power measured is
                  72 kW. Calculate the apparent power, reactive power, and power factor.
                </p>
                <p className="font-mono text-white">
                  Apparent power = 415 x 120 x 1.732 / 1000 ={' '}
                  <strong className="text-yellow-400">86.2 kVA</strong>
                </p>
                <p className="font-mono text-white">
                  Reactive power = sqrt(86.2² - 72²) = sqrt(7430.44 - 5184) = sqrt(2246.44) ={' '}
                  <strong className="text-yellow-400">47.4 kVAr</strong>
                </p>
                <p className="font-mono text-white">
                  Power factor = 72 / 86.2 ={' '}
                  <strong className="text-yellow-400">0.835 lagging</strong>
                </p>
                <p>
                  Result: The power factor is <strong className="text-red-400">below 0.90</strong> —
                  this site would attract reactive power penalties. Correction to 0.95 would require
                  72 x (0.6609 - 0.3287) = <strong className="text-green-400">23.9 kVAr</strong> of
                  capacitors.
                </p>
              </div>
            </div>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Calculate Power Factor and Size Capacitors — Step by Step
            </h2>
          </div>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
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
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use the Elec-Mate Power Factor Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working on commercial and industrial installations.
            Calculate, correct, and save your clients money.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
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
        heading="Calculate Power Factor in Seconds"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
