import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  Shield,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Thermometer,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  CircuitBoard,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze is the external earth fault loop impedance — the impedance of the fault loop path outside the installation, measured at the origin with the main earthing conductor disconnected. It includes the impedance of the supply transformer winding, the line conductor from the transformer to the origin, and the return path through earth or the neutral. Zs is the total earth fault loop impedance at a specific point in the circuit, calculated as Zs = Ze + (R1 + R2), where R1 is the resistance of the line conductor from the origin to the point and R2 is the resistance of the circuit protective conductor (CPC) over the same length. Ze is a property of the supply; Zs is a property of the individual circuit.',
  },
  {
    question: 'Why do measured Zs values need temperature correction?',
    answer:
      'When you measure Zs on site using a loop impedance tester, the cables are at ambient temperature — typically around 10 to 25 degrees Celsius. However, the maximum Zs values in BS 7671 Tables 41.2 to 41.4 assume the conductors are at their maximum operating temperature (70 degrees C for thermoplastic insulation, 90 degrees C for thermosetting). Since conductor resistance increases with temperature, the measured Zs at ambient will be lower than the actual Zs at full load. To verify compliance, you must either correct your measured value upward using a multiplier (typically 1.20 for thermoplastic cables) or compare against the 80% rule — your measured Zs should not exceed 80% of the tabulated maximum Zs. GN3 (Guidance Note 3: Inspection and Testing) provides the correction factors and explains both methods.',
  },
  {
    question: 'What is the maximum Zs for a 30mA RCD?',
    answer:
      'For a 30 mA RCD, the maximum earth fault loop impedance is 1667 ohms. This is derived from the formula Zs = 50 / (I delta n), where 50 V is the touch voltage limit and I delta n is the rated residual operating current (0.03 A). The calculation gives 50 / 0.03 = 1667 ohms. In practice, this value is so high that almost any circuit will meet it, which is one reason RCDs are so effective as additional protection. However, the RCD must still disconnect within 40 milliseconds at five times its rated residual current (150 mA for a 30 mA device), and you must also verify that the OCPD (MCB or fuse) can still clear a line-to-earth fault within the required time — so the Zs must also satisfy the OCPD requirements in Tables 41.2 to 41.4.',
  },
  {
    question: 'How do I measure Ze on site?',
    answer:
      'Ze is measured at the origin of the installation with the main earthing conductor disconnected from the means of earthing (the earthing terminal). This isolates the installation earth so you are measuring only the external fault loop impedance of the supply. Connect your loop impedance tester between the incoming line terminal and the earthing terminal (with the main earth disconnected). The reading you obtain is Ze. Typical Ze values are: TN-C-S (PME) supply — 0.35 ohms or less; TN-S (cable sheath earth) — 0.80 ohms or less; TT (earth rod) — typically 20 ohms or more (but these circuits must have RCD protection). Always ensure the installation is safe and isolated before disconnecting the main earth, as this temporarily removes the earth path for the entire installation.',
  },
  {
    question: 'Can I use the R1+R2 values from the continuity test to calculate Zs?',
    answer:
      'Yes, and this is the preferred method described in GN3 (Guidance Note 3). During initial verification, you measure the continuity of the circuit protective conductor using the long lead method (also called the wandering lead method). This test gives you the R1+R2 value for the circuit at ambient temperature. You can then calculate Zs by adding Ze to R1+R2. If both values were measured at ambient temperature, you should apply a temperature correction factor (multiply by 1.20 for thermoplastic cables) to obtain the expected Zs at conductor operating temperature, then compare against the BS 7671 maximum Zs values. This calculated method is considered more accurate than a direct Zs measurement because it avoids the influence of parallel earth paths through bonding conductors, gas pipes, and water pipes that can give a falsely low direct reading.',
  },
];

const howToSteps = [
  {
    name: 'Measure or obtain the Ze value',
    text: 'Determine the external earth fault loop impedance (Ze) at the origin of the installation. This can be measured with a loop impedance tester at the incoming supply with the main earthing conductor disconnected, or obtained from the electricity distributor. Typical values are 0.35 ohms for TN-C-S (PME) supplies and 0.80 ohms for TN-S supplies.',
  },
  {
    name: 'Measure R1+R2 for the circuit',
    text: 'Perform a continuity test on the circuit using the long lead method. Connect a long test lead between the line and CPC at the distribution board, then measure the resistance at each point on the circuit. The reading at the furthest point gives the R1+R2 value in ohms at ambient temperature.',
  },
  {
    name: 'Calculate Zs = Ze + (R1 + R2)',
    text: 'Add the Ze value to the R1+R2 value to obtain the total earth fault loop impedance (Zs) at ambient temperature. For example, if Ze = 0.35 ohms and R1+R2 = 0.86 ohms, then Zs = 0.35 + 0.86 = 1.21 ohms at ambient.',
  },
  {
    name: 'Apply temperature correction',
    text: 'Multiply the calculated Zs by the appropriate correction factor to account for conductor resistance at operating temperature. For thermoplastic (PVC) insulated cables, multiply by 1.20. For thermosetting (XLPE) cables, multiply by 1.28. Using the previous example: 1.21 x 1.20 = 1.45 ohms at operating temperature.',
  },
  {
    name: 'Compare against BS 7671 maximum Zs',
    text: 'Look up the maximum permitted Zs from BS 7671 Tables 41.2 (Type B MCBs), 41.3 (Type C MCBs), or 41.4 (Type D MCBs) for the protective device rating and disconnection time. If your corrected Zs is less than or equal to the tabulated maximum, the circuit complies. If it exceeds the maximum, you must reduce the impedance by increasing the cable size, reducing the cable length, or adding RCD protection.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Zs Calculation',
    description:
      'Enter Ze and R1+R2 values and get the total earth fault loop impedance instantly. Automatic pass/fail check against BS 7671 maximum Zs tables.',
  },
  {
    icon: Thermometer,
    title: 'Temperature Correction Built In',
    description:
      'Automatically applies the correct temperature correction factor for thermoplastic and thermosetting cables. No need to remember the 1.20 or 1.28 multipliers.',
  },
  {
    icon: Shield,
    title: 'All MCB Types Covered',
    description:
      'Maximum Zs lookup for Type B, Type C, and Type D MCBs from BS 7671 Tables 41.2, 41.3, and 41.4. Also covers RCBOs and fuse types to BS 88 and BS 3036.',
  },
  {
    icon: BarChart3,
    title: 'Visual Pass/Fail Display',
    description:
      'Clear colour-coded result showing whether your circuit meets the BS 7671 maximum Zs requirement. Green for pass, red for fail, with the margin shown.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671:2018+A2:2022 Compliant',
    description:
      'All maximum Zs values verified against the current 18th Edition wiring regulations including Amendment 2. Updated tables for all protective device types.',
  },
  {
    icon: CircuitBoard,
    title: 'Works Offline on Site',
    description:
      'All calculation logic and BS 7671 tables run locally on your device. Calculate Zs on site with no internet connection — results sync when you reconnect.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Earth Loop Impedance Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate earth fault loop impedance (Zs) to BS 7671. Verify Ze + R1+R2, check maximum Zs values for MCBs and RCBOs, temperature correction.',
  url: 'https://elec-mate.com/tools/earth-loop-impedance-calculator',
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
  name: 'How to Calculate Earth Fault Loop Impedance (Zs) to BS 7671',
  description:
    'Step-by-step guide to calculating and verifying earth fault loop impedance for electrical installations in the UK using BS 7671 tables and the Zs = Ze + (R1+R2) formula.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function EarthLoopImpedanceCalculatorPage() {
  useSEO({
    title: 'Earth Loop Impedance Calculator (Zs) | BS 7671',
    description:
      'Calculate earth fault loop impedance (Zs) to BS 7671. Verify Ze + R1+R2, check maximum Zs values for MCBs and RCBOs, temperature correction. Part of 50+ electrical calculators.',
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
            Earth Loop Impedance Calculator
            <span className="block text-yellow-400 mt-1">Zs to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate earth fault loop impedance (Zs) using Ze + R1+R2. Instantly check compliance with BS 7671 maximum Zs values for MCBs, RCBOs, and fuses with automatic temperature correction.
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

      {/* What Is Earth Fault Loop Impedance */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CircuitBoard className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Earth Fault Loop Impedance?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Earth fault loop impedance, commonly written as Zs, is the total impedance of the path that fault current takes when a line conductor comes into contact with an earthed part of an electrical installation. It is one of the most critical measurements in electrical testing because it determines whether the protective device — the MCB, RCBO, or fuse — can disconnect the supply quickly enough to prevent electric shock in the event of an earth fault.
            </p>
            <p>
              The concept is rooted in a fundamental principle of electrical safety: automatic disconnection of supply. BS 7671 Regulation 411.3.2 requires that, in the event of a fault between a line conductor and an exposed-conductive-part connected to the protective earthing, the protective device must disconnect the faulty circuit within a specified time. For final circuits not exceeding 32 A, the maximum disconnection time is 0.4 seconds. For distribution circuits and final circuits exceeding 32 A, the maximum time is 5 seconds. The lower the earth fault loop impedance, the higher the fault current, and the faster the protective device will operate.
            </p>
            <p>
              If the earth fault loop impedance is too high, the fault current will be insufficient to trip the protective device within the required time. This leaves the faulty circuit energised, creating a serious risk of electric shock and fire. This is why verifying Zs is a mandatory part of initial verification and periodic inspection under BS 7671 and the IET Guidance Note 3.
            </p>
            <p>
              In practical terms, earth fault loop impedance testing is performed on every circuit during initial verification (when a new installation is being commissioned) and during periodic inspection and testing (EICR). The results are recorded on Schedule of Test Results forms and compared against the maximum values published in BS 7671 Tables 41.2, 41.3, and 41.4.
            </p>
          </div>
        </div>
      </section>

      {/* The Fault Loop Path */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Earth Fault Loop Path</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              To understand earth fault loop impedance, you need to understand the path that fault current takes. When a line conductor touches an earthed enclosure (an earth fault), current flows in a complete loop — the earth fault loop. This loop consists of several elements, each contributing impedance:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 my-6">
              <ol className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">1</span>
                  <span><strong className="text-yellow-400">Supply transformer secondary winding</strong> — the source of the supply voltage. This has a very low impedance, typically a fraction of an ohm.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">2</span>
                  <span><strong className="text-yellow-400">Line conductor from transformer to the fault</strong> — the distributor's supply cable (line) from the transformer to the origin of the installation, plus the installation's line conductor from the origin to the point of the fault.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">3</span>
                  <span><strong className="text-yellow-400">The fault itself</strong> — the point where the line conductor contacts the earthed enclosure. This is assumed to have negligible impedance in the calculation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">4</span>
                  <span><strong className="text-yellow-400">Circuit protective conductor (CPC)</strong> — from the fault point back to the main earthing terminal of the installation. This is the R2 component.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">5</span>
                  <span><strong className="text-yellow-400">Return path to the transformer</strong> — from the installation's main earthing terminal back to the star point of the supply transformer. For TN-S systems this is the cable sheath; for TN-C-S (PME) this is the combined neutral/earth (PEN) conductor; for TT systems this is the general mass of earth.</span>
                </li>
              </ol>
            </div>
            <p>
              The total impedance of this complete loop is Zs. It is split into two components for practical measurement purposes: Ze (the external part, from the transformer through the supply cables and back) and R1+R2 (the internal part, the line conductor and CPC within the installation).
            </p>
          </div>
        </div>
      </section>

      {/* The Zs Formula */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Zs Formula and Worked Examples</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The fundamental formula for earth fault loop impedance is straightforward:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Zs = Ze + (R1 + R2)
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p><strong className="text-yellow-400">Zs</strong> = total earth fault loop impedance in ohms</p>
                <p><strong className="text-yellow-400">Ze</strong> = external earth fault loop impedance in ohms</p>
                <p><strong className="text-yellow-400">R1</strong> = resistance of the line conductor from origin to fault point</p>
                <p><strong className="text-yellow-400">R2</strong> = resistance of the CPC from origin to fault point</p>
              </div>
            </div>

            {/* Worked Example 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 1: Domestic Ring Final Circuit</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A domestic ring final circuit is protected by a 32 A Type B MCB. The supply is TN-C-S with a measured Ze of 0.25 ohms. The R1+R2 of the ring at the furthest point is 0.72 ohms, measured at an ambient temperature of 20 degrees C.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.25 + 0.72 = <strong className="text-yellow-400">0.97 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 0.97 x 1.20 = <strong className="text-yellow-400">1.16 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 32 A Type B MCB (0.4 s disconnection) is <strong className="text-yellow-400">1.37 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 1.16 ohms is within the 1.37 ohms limit.
                </p>
              </div>
            </div>

            {/* Worked Example 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 2: Lighting Circuit on TN-S Supply</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A lighting circuit is protected by a 6 A Type B MCB. The supply is TN-S with a measured Ze of 0.62 ohms. The R1+R2 measured at the furthest luminaire is 1.85 ohms at ambient temperature.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.62 + 1.85 = <strong className="text-yellow-400">2.47 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 2.47 x 1.20 = <strong className="text-yellow-400">2.96 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 6 A Type B MCB (0.4 s disconnection) is <strong className="text-yellow-400">7.28 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 2.96 ohms is well within the 7.28 ohms limit.
                </p>
              </div>
            </div>

            {/* Worked Example 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 3: Long Radial Circuit — Borderline Case</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A 20 A radial circuit supplies socket outlets in a workshop. It is protected by a 20 A Type B MCB on a TN-S supply with Ze = 0.72 ohms. The circuit is wired in 2.5 mm² twin and earth cable (1.0 mm² CPC) running 38 metres. The measured R1+R2 at the furthest socket is 1.22 ohms.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.72 + 1.22 = <strong className="text-yellow-400">1.94 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 1.94 x 1.20 = <strong className="text-yellow-400">2.33 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 20 A Type B MCB (0.4 s disconnection) is <strong className="text-yellow-400">2.19 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-red-400">FAIL</strong> — 2.33 ohms exceeds the 2.19 ohms limit. Solutions: increase cable size to 4 mm² (which reduces R1+R2), shorten the cable run, or add RCD protection (which gives a maximum Zs of 1667 ohms for a 30 mA RCD, easily achieved).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temperature Correction */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Thermometer className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Temperature Correction for Zs Measurements</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              When you measure earth fault loop impedance on site, the cable conductors are at ambient temperature — perhaps 15 to 25 degrees Celsius on a typical UK day. However, the maximum Zs values given in BS 7671 Tables 41.2, 41.3, and 41.4 are calculated at the maximum conductor operating temperature: 70 degrees C for thermoplastic (PVC) insulated cables and 90 degrees C for thermosetting (XLPE) insulated cables.
            </p>
            <p>
              Conductor resistance increases with temperature. Copper has a positive temperature coefficient of resistance — approximately 0.4% per degree Celsius. This means that a cable at 70 degrees C has significantly higher resistance than the same cable at 20 degrees C. As a result, the Zs of a circuit under full load (when cables are hot) will be higher than the Zs you measure on a cold, unloaded circuit.
            </p>
            <p>
              There are two accepted methods for accounting for this:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-white text-lg mb-2">Method 1: The Rule of Thumb</h3>
                <p className="text-white text-sm leading-relaxed">
                  Compare your measured Zs against 80% of the tabulated maximum Zs. If your measured value (at ambient) is no more than 80% of the BS 7671 maximum, the circuit complies. This is the quick method used by most electricians on site. For example, if the maximum Zs for a 32 A Type B MCB is 1.37 ohms, then 80% is 1.10 ohms — your measured Zs must be 1.10 ohms or less.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-white text-lg mb-2">Method 2: Correction Factor</h3>
                <p className="text-white text-sm leading-relaxed">
                  Multiply your measured Zs by a correction factor to obtain the estimated Zs at operating temperature. For 70 degrees C thermoplastic cables measured at 10 to 20 degrees C ambient, the factor is approximately 1.20. For 90 degrees C thermosetting cables, the factor is approximately 1.28. The corrected value is then compared directly against the BS 7671 maximum. This method is more precise and is described in GN3.
                </p>
              </div>
            </div>
            <p>
              The Elec-Mate calculator applies the correction factor automatically. Enter your measured values, select the cable insulation type, and the calculator shows both the ambient and corrected Zs alongside the BS 7671 maximum for your protective device.
            </p>
          </div>
        </div>
      </section>

      {/* Maximum Zs Tables */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Maximum Zs Values from BS 7671</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 provides maximum earth fault loop impedance values in Tables 41.2, 41.3, and 41.4 for circuit breakers to BS EN 60898 and RCBOs to BS EN 61009. These values ensure the protective device will disconnect the circuit within 0.4 seconds (for final circuits up to 32 A) or 5 seconds (for distribution circuits). Below are the commonly referenced values for each MCB type.
            </p>
          </div>

          {/* Type B Table */}
          <div className="mt-8 mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">Table 41.2 — Type B MCBs (0.4 s disconnection)</h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">MCB Rating (A)</div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Max Zs (ohms)</div>
              </div>
              {[
                { rating: '6', zs: '7.28' },
                { rating: '10', zs: '4.37' },
                { rating: '16', zs: '2.73' },
                { rating: '20', zs: '2.19' },
                { rating: '32', zs: '1.37' },
                { rating: '40', zs: '1.09' },
                { rating: '50', zs: '0.87' },
              ].map((row) => (
                <div key={row.rating} className="grid grid-cols-2 gap-px bg-white/5">
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.rating} A</div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Type C Table */}
          <div className="mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">Table 41.3 — Type C MCBs (0.4 s disconnection)</h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">MCB Rating (A)</div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Max Zs (ohms)</div>
              </div>
              {[
                { rating: '6', zs: '3.64' },
                { rating: '10', zs: '2.19' },
                { rating: '16', zs: '1.37' },
                { rating: '20', zs: '1.09' },
                { rating: '32', zs: '0.68' },
                { rating: '40', zs: '0.55' },
                { rating: '50', zs: '0.44' },
              ].map((row) => (
                <div key={row.rating} className="grid grid-cols-2 gap-px bg-white/5">
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.rating} A</div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Type D Table */}
          <div className="mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">Table 41.4 — Type D MCBs (0.4 s disconnection)</h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">MCB Rating (A)</div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Max Zs (ohms)</div>
              </div>
              {[
                { rating: '6', zs: '1.82' },
                { rating: '10', zs: '1.09' },
                { rating: '16', zs: '0.68' },
                { rating: '20', zs: '0.55' },
                { rating: '32', zs: '0.34' },
                { rating: '40', zs: '0.27' },
                { rating: '50', zs: '0.22' },
              ].map((row) => (
                <div key={row.rating} className="grid grid-cols-2 gap-px bg-white/5">
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.rating} A</div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed">
            These values are from BS 7671:2018+A2:2022 and represent the maximum Zs at conductor operating temperature. When comparing against site measurements taken at ambient temperature, use the 80% rule or apply the appropriate correction factor as described above.
          </p>
        </div>
      </section>

      {/* RCD Protection and the 1667 Ohm Limit */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">RCD-Protected Circuits and the 1667 Ohm Limit</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Residual current devices (RCDs) operate on a fundamentally different principle from overcurrent devices. An RCD detects an imbalance between the current flowing in the line conductor and the current returning through the neutral. When some current leaks to earth through a fault (or through a person), the RCD senses the difference and disconnects the supply — typically within 30 to 40 milliseconds for a 30 mA device.
            </p>
            <p>
              Because the RCD operates on differential current rather than magnitude of fault current, it does not require a high fault current to trip. The maximum earth fault loop impedance for an RCD-protected circuit is calculated from the formula:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Zs = 50 / I<sub>delta n</sub>
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p><strong className="text-yellow-400">50</strong> = maximum touch voltage in volts (from BS 7671 Regulation 411.3.2.1)</p>
                <p><strong className="text-yellow-400">I<sub>delta n</sub></strong> = rated residual operating current of the RCD in amperes</p>
              </div>
            </div>
            <p>
              For a 30 mA (0.03 A) RCD: Zs = 50 / 0.03 = <strong className="text-yellow-400">1667 ohms</strong>. For a 100 mA (0.10 A) RCD: Zs = 50 / 0.10 = <strong className="text-yellow-400">500 ohms</strong>. For a 300 mA (0.30 A) RCD: Zs = 50 / 0.30 = <strong className="text-yellow-400">167 ohms</strong>.
            </p>
            <p>
              The 1667 ohm limit for 30 mA RCDs is so generous that virtually any circuit within a building will meet it. This is why RCD protection is so valuable on TT installations (where Ze can be very high due to the earth electrode resistance) and as a solution for circuits where the Zs is too high for the OCPD alone to disconnect within time.
            </p>
            <p>
              However, it is important to note that even on RCD-protected circuits, you should still verify that the overcurrent protective device can disconnect a line-to-earth fault. If the RCD fails (sticks), the OCPD is the backup. BS 7671 recommends (but does not require for all cases) that the Zs still permits the OCPD to operate within 5 seconds as a secondary measure. The Elec-Mate calculator checks both the RCD limit and the OCPD limit, flagging any discrepancies.
            </p>
          </div>
        </div>
      </section>

      {/* Measuring Ze and R1+R2 */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Measure Ze and R1+R2</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Measuring Ze:</strong> The external earth fault loop impedance is measured at the origin of the installation. Disconnect the main earthing conductor from the earthing terminal (this isolates the installation's earth from the supply earth). Connect your loop impedance tester between the incoming line terminal and the disconnected earthing conductor. The reading is Ze. On a TN-C-S (PME) supply, you should expect a Ze of 0.35 ohms or less. On a TN-S supply with a cable sheath earth, typical values are 0.80 ohms or less. On a TT system, Ze depends on the resistance of the earth electrode and can be 20 ohms or more.
            </p>
            <p>
              <strong className="text-yellow-400">Measuring R1+R2:</strong> The resistance of the line conductor and CPC combined is measured using the long lead method (also called the wandering lead method). At the distribution board, temporarily link the line and CPC of the circuit together. Then, using a low-resistance ohmmeter, measure the resistance from the line terminal at the distribution board to the line and CPC linked together at each point on the circuit. The reading at the furthest point is the R1+R2 value.
            </p>
            <p>
              The long lead method effectively measures the resistance of a conductor loop consisting of the line conductor going out to the point and the CPC coming back. This is why the value is called R1+R2 — it is the sum of the line conductor resistance (R1) and the CPC resistance (R2) over the length of the circuit.
            </p>
            <p>
              Common R1+R2 values for domestic circuits depend on the cable size and length. For example, a 2.5 mm² twin and earth cable (with 1.0 mm² CPC) has a combined R1+R2 of approximately 25.51 milliohms per metre at 20 degrees C. A 20-metre run would give R1+R2 of about 0.51 ohms. A 1.5 mm² cable (with 1.0 mm² CPC) has approximately 30.20 milliohms per metre, so a 25-metre lighting circuit would give about 0.76 ohms.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Calculate Zs — Step by Step</h2>
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
            Why Use the Elec-Mate Zs Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Faster and more reliable than flipping through tables on site.
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
        heading="Calculate Zs in Seconds on Site"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
