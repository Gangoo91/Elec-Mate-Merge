import { Helmet } from 'react-helmet';
import { RecentReviews } from '@/components/seo/RecentReviews';
import EarthFaultLoopCalculator from '@/components/apprentice/calculators/EarthFaultLoopCalculator';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { Calculator, Shield, BookOpen, BarChart3, Thermometer, CircuitBoard } from 'lucide-react';
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
    text: 'Multiply the calculated Zs by the appropriate correction factor to account for conductor resistance at operating temperature. GN3 (Chapter 5) notes that where reduced csa protective conductors are used, maximum EFLIs may need further reduction; the general temperature correction requirement stems from the fact that the tabulated Zs values in BS 7671 Tables 41.2–41.4 (and GN3 Tables B1–B6) are based on conductors at their maximum normal operating temperature, not at the ambient temperature at which site measurements are taken. The correction factors commonly used on site are 1.20 for thermoplastic (PVC) insulated cables and 1.28 for thermosetting (XLPE) cables — verify the precise values for your measurement conditions against GN3 9th Ed Table B2. Using the previous example with 1.20: 1.21 x 1.20 = 1.45 ohms at operating temperature.',
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
      'Automatically applies the correct temperature correction factor for thermoplastic and thermosetting cables.',
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
    title: 'BS 7671:2018+A4:2026 Compliant',
    description:
      'All maximum Zs values verified against the current 18th Edition wiring regulations including Amendment 4. Updated tables for all protective device types.',
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
  url: 'https://www.elec-mate.com/tools/earth-loop-impedance-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £12.99/month',
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
    'Step-by-step guide to calculating and verifying earth fault loop impedance for electrical installations in the UK using BS 7671 tables and the Zs = Ze +…',
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
      'Calculate earth fault loop impedance (Zs) to BS 7671. Verify Ze + R1+R2, check maximum Zs values for MCBs and RCBOs, temperature correction.',
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
            Part of 70 Electrical Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Earth Loop Impedance Calculator
            <span className="block text-yellow-400 mt-1">Zs to BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate earth fault loop impedance (Zs) using Ze + R1+R2. Instantly check compliance
            with BS 7671 maximum Zs values for MCBs, RCBOs, and fuses with automatic temperature
            correction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Try the Calculator Free
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Direct-answer block — targets featured-snippet position */}
      <section className="px-5 pb-4">
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
          <p className="text-white leading-relaxed">
            <strong className="text-yellow-400">What is Zs?</strong> Zs is the total earth fault
            loop impedance — the complete impedance of the fault current path from the point of
            fault, through the circuit protective conductor (CPC), back to the supply transformer
            and return via the line conductor. It is calculated using the formula{' '}
            <strong className="text-yellow-400">Zs = Ze + (R1 + R2)</strong>, where Ze is the
            external impedance supplied by the network and R1 + R2 is the combined resistance of the
            line conductor and CPC within the installation. To verify BS 7671 compliance, the
            corrected Zs (adjusted to conductor operating temperature) must not exceed the maximum
            values in{' '}
            <strong className="text-yellow-400">BS 7671:2018+A4:2026 Tables 41.2–41.4</strong> for
            the protective device fitted — confirming that automatic disconnection of supply will
            operate within the required disconnection time (GN3 9th Ed, Chapter 8).
          </p>
        </div>
      </section>

      {/* Live calculator — free, no signup, BS 7671:2018+A4:2026 compliant */}
      <section id="calculator" className="px-5 pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <EarthFaultLoopCalculator />
        </div>
      </section>

      {/* What Is Earth Fault Loop Impedance */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is Earth Fault Loop Impedance?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Earth fault loop impedance, commonly written as Zs, is the total impedance of the path
              that fault current takes when a line conductor comes into contact with an earthed part
              of an electrical installation. It is one of the most critical measurements in
              electrical testing because it determines whether the protective device — the MCB,
              RCBO, or fuse — can disconnect the supply quickly enough to prevent electric shock in
              the event of an earth fault.
            </p>
            <p>
              The concept is rooted in a fundamental principle of electrical safety: automatic
              disconnection of supply. BS 7671 Regulation 411.3.2 requires that, in the event of a
              fault between a line conductor and an exposed-conductive-part connected to the
              protective earthing, the protective device must disconnect the faulty circuit within a
              specified time. Under Reg 411.3.1.2, the 0.4 second disconnection time applies to two
              categories of final circuit: (i) final circuits rated up to 32 A that supply only
              fixed connected current-using equipment, and (ii) final circuits rated up to 63 A that
              include one or more socket-outlets. For distribution circuits and other final circuits
              not falling within those two categories, the maximum disconnection time is 5 seconds.
              The lower the earth fault loop impedance, the higher the fault current, and the faster
              the protective device will operate.
            </p>
            <p>
              If the earth fault loop impedance is too high, the fault current will be insufficient
              to trip the protective device within the required time. This leaves the faulty circuit
              energised, creating a serious risk of electric shock and fire. This is why verifying
              Zs is a mandatory part of initial verification and periodic inspection under BS 7671
              and the IET Guidance Note 3.
            </p>
            <p>
              In practical terms, earth fault loop impedance testing is performed on every circuit
              during initial verification (when a new installation is being commissioned) and during
              periodic inspection and testing (EICR). The results are recorded on Schedule of Test
              Results forms and compared against the maximum values published in BS 7671 Tables
              41.2, 41.3, and 41.4. Use the{' '}
              <SEOInternalLink href="/tools/disconnection-time-calculator">
                disconnection time calculator
              </SEOInternalLink>{' '}
              to verify 0.4s and 5s compliance, and the{' '}
              <SEOInternalLink href="/tools/eicr-certificate">
                EICR certificate tool
              </SEOInternalLink>{' '}
              to record your test results digitally.
            </p>
          </div>
        </div>
      </section>

      {/* The Fault Loop Path */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Earth Fault Loop Path</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              To understand earth fault loop impedance, you need to understand the path that fault
              current takes. When a line conductor touches an earthed enclosure (an earth fault),
              current flows in a complete loop — the earth fault loop. This loop consists of several
              elements, each contributing impedance:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 my-6">
              <ol className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    1
                  </span>
                  <span>
                    <strong className="text-yellow-400">
                      Supply transformer secondary winding
                    </strong>{' '}
                    — the source of the supply voltage. This has a very low impedance, typically a
                    fraction of an ohm.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong className="text-yellow-400">
                      Line conductor from transformer to the fault
                    </strong>{' '}
                    — the distributor's supply cable (line) from the transformer to the origin of
                    the installation, plus the installation's line conductor from the origin to the
                    point of the fault.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong className="text-yellow-400">The fault itself</strong> — the point where
                    the line conductor contacts the earthed enclosure. This is assumed to have
                    negligible impedance in the calculation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong className="text-yellow-400">Circuit protective conductor (CPC)</strong>{' '}
                    — from the fault point back to the main earthing terminal of the installation.
                    This is the R2 component.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                    5
                  </span>
                  <span>
                    <strong className="text-yellow-400">Return path to the transformer</strong> —
                    from the installation's main earthing terminal back to the star point of the
                    supply transformer. For TN-S systems this is the cable sheath; for TN-C-S (PME)
                    this is the combined neutral/earth (PEN) conductor; for TT systems this is the
                    general mass of earth.
                  </span>
                </li>
              </ol>
            </div>
            <p>
              The total impedance of this complete loop is Zs. It is split into two components for
              practical measurement purposes: Ze (the external part, from the transformer through
              the supply cables and back) and R1+R2 (the internal part, the line conductor and CPC
              within the installation).
            </p>
          </div>
        </div>
      </section>

      {/* The Zs Formula */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Zs Formula and Worked Examples
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>The fundamental formula for earth fault loop impedance is straightforward:</p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Zs = Ze + (R1 + R2)
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p>
                  <strong className="text-yellow-400">Zs</strong> = total earth fault loop impedance
                  in ohms
                </p>
                <p>
                  <strong className="text-yellow-400">Ze</strong> = external earth fault loop
                  impedance in ohms
                </p>
                <p>
                  <strong className="text-yellow-400">R1</strong> = resistance of the line conductor
                  from origin to fault point
                </p>
                <p>
                  <strong className="text-yellow-400">R2</strong> = resistance of the CPC from
                  origin to fault point
                </p>
              </div>
            </div>

            {/* Worked Example 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 1: Domestic Ring Final Circuit
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A domestic ring final circuit is protected by a 32 A Type B MCB. The supply is
                  TN-C-S with a measured Ze of 0.25 ohms. The R1+R2 of the ring at the furthest
                  point is 0.72 ohms, measured at an ambient temperature of 20 degrees C.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.25 + 0.72 ={' '}
                  <strong className="text-yellow-400">0.97 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 0.97 x 1.20 ={' '}
                  <strong className="text-yellow-400">1.16 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 32 A Type B MCB (0.4 s
                  disconnection) is <strong className="text-yellow-400">1.37 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 1.16 ohms is within the
                  1.37 ohms limit.
                </p>
              </div>
            </div>

            {/* Worked Example 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 2: Lighting Circuit on TN-S Supply
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A lighting circuit is protected by a 6 A Type B MCB. The supply is TN-S with a
                  measured Ze of 0.62 ohms. The R1+R2 measured at the furthest luminaire is 1.85
                  ohms at ambient temperature.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.62 + 1.85 ={' '}
                  <strong className="text-yellow-400">2.47 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 2.47 x 1.20 ={' '}
                  <strong className="text-yellow-400">2.96 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 6 A Type B MCB (0.4 s disconnection)
                  is <strong className="text-yellow-400">7.28 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-green-400">PASS</strong> — 2.96 ohms is well
                  within the 7.28 ohms limit.
                </p>
              </div>
            </div>

            {/* Worked Example 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Example 3: Long Radial Circuit — Borderline Case
              </h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  A 20 A radial circuit supplies socket outlets in a workshop. It is protected by a
                  20 A Type B MCB on a TN-S supply with Ze = 0.72 ohms. The circuit is wired in 2.5
                  mm² twin and earth cable (1.0 mm² CPC) running 38 metres. The measured R1+R2 at
                  the furthest socket is 1.22 ohms.
                </p>
                <p className="font-mono text-white">
                  Zs at ambient = 0.72 + 1.22 ={' '}
                  <strong className="text-yellow-400">1.94 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Zs corrected = 1.94 x 1.20 ={' '}
                  <strong className="text-yellow-400">2.33 ohms</strong>
                </p>
                <p>
                  From BS 7671 Table 41.2, the maximum Zs for a 20 A Type B MCB (0.4 s
                  disconnection) is <strong className="text-yellow-400">2.19 ohms</strong>.
                </p>
                <p>
                  Result: <strong className="text-red-400">FAIL</strong> — 2.33 ohms exceeds the
                  2.19 ohms limit. Solutions: increase cable size to 4 mm² (which reduces R1+R2),
                  shorten the cable run, or add RCD protection (which gives a maximum Zs of 1667
                  ohms for a 30 mA RCD, easily achieved).
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Temperature Correction for Zs Measurements
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              When you measure earth fault loop impedance on site, the cable conductors are at
              ambient temperature — perhaps 15 to 25 degrees Celsius on a typical UK day. However,
              the maximum Zs values given in BS 7671 Tables 41.2, 41.3, and 41.4 are calculated at
              the maximum conductor operating temperature: 70 degrees C for thermoplastic (PVC)
              insulated cables and 90 degrees C for thermosetting (XLPE) insulated cables.
            </p>
            <p>
              Conductor resistance increases with temperature. Copper has a positive temperature
              coefficient of resistance — approximately 0.4% per degree Celsius. This means that a
              cable at 70 degrees C has significantly higher resistance than the same cable at 20
              degrees C. As a result, the Zs of a circuit under full load (when cables are hot) will
              be higher than the Zs you measure on a cold, unloaded circuit.
            </p>
            <p>There are two accepted methods for accounting for this:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-white text-lg mb-2">Method 1: The Rule of Thumb</h3>
                <p className="text-white text-sm leading-relaxed">
                  Compare your measured Zs against 80% of the tabulated maximum Zs. If your measured
                  value (at ambient) is no more than 80% of the BS 7671 maximum, the circuit
                  complies. This is the quick method used by most electricians on site. For example,
                  if the maximum Zs for a 32 A Type B MCB is 1.37 ohms, then 80% is 1.10 ohms — your
                  measured Zs must be 1.10 ohms or less.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-white text-lg mb-2">Method 2: Correction Factor</h3>
                <p className="text-white text-sm leading-relaxed">
                  Multiply your measured Zs by a correction factor to obtain the estimated Zs at
                  operating temperature. For 70 degrees C thermoplastic cables, the factor commonly
                  applied on site is approximately 1.20; for 90 degrees C thermosetting cables,
                  approximately 1.28. The corrected value is then compared directly against the BS
                  7671 maximum. GN3 9th Ed Tables B1–B6 tabulate maximum Zs values at a reference
                  temperature of 10 °C; consult GN3 9th Ed Table B2 for the precise correction
                  factors applicable to your measurement conditions and cable type.
                </p>
              </div>
            </div>
            <p>
              The Elec-Mate calculator applies the correction factor automatically. Enter your
              measured values, select the cable insulation type, and the calculator shows both the
              ambient and corrected Zs alongside the BS 7671 maximum for your protective device.
            </p>
          </div>
        </div>
      </section>

      {/* Maximum Zs Tables */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Maximum Zs Values from BS 7671
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 provides maximum earth fault loop impedance values in Tables 41.2, 41.3, and
              41.4 for circuit breakers to BS EN 60898 and RCBOs to BS EN 61009. These values ensure
              the protective device will disconnect the circuit within 0.4 seconds (for final
              circuits up to 32 A) or 5 seconds (for distribution circuits). Below are the commonly
              referenced values for each MCB type.
            </p>
          </div>

          {/* Type B Table */}
          <div className="mt-8 mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">
              Table 41.2 — Type B MCBs (0.4 s disconnection)
            </h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  MCB Rating (A)
                </div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  Max Zs (ohms)
                </div>
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
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                    {row.rating} A
                  </div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Type C Table */}
          <div className="mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">
              Table 41.3 — Type C MCBs (0.4 s disconnection)
            </h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  MCB Rating (A)
                </div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  Max Zs (ohms)
                </div>
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
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                    {row.rating} A
                  </div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Type D Table */}
          <div className="mb-6">
            <h3 className="font-bold text-yellow-400 text-lg mb-4">
              Table 41.4 — Type D MCBs (0.4 s disconnection)
            </h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  MCB Rating (A)
                </div>
                <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                  Max Zs (ohms)
                </div>
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
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                    {row.rating} A
                  </div>
                  <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.zs} ohms</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed">
            These values are from{' '}
            <strong className="text-yellow-400">BS 7671:2018+A4:2026 Tables 41.2–41.4</strong> and
            represent the maximum Zs at conductor operating temperature. Cross-referenced against{' '}
            <strong className="text-yellow-400">
              GN3 9th Ed (2022, incorporating A4) Tables B1–B6
            </strong>
            , which present maximum Zs values at a reference temperature of 10 °C and provide the
            correction factors required for site measurements taken at ambient temperature. When
            comparing against site measurements, use the 80% rule or apply the appropriate
            correction factor from GN3 9th Ed Table B2 as described above.
          </p>
        </div>
      </section>

      {/* RCD Protection and the 1667 Ohm Limit */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RCD-Protected Circuits and the 1667 Ohm Limit
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Residual current devices (RCDs) operate on a fundamentally different principle from
              overcurrent devices. An RCD detects an imbalance between the current flowing in the
              line conductor and the current returning through the neutral. When some current leaks
              to earth through a fault (or through a person), the RCD senses the difference and
              disconnects the supply — typically within 30 to 40 milliseconds for a 30 mA device.
            </p>
            <p>
              Because the RCD operates on differential current rather than magnitude of fault
              current, it does not require a high fault current to trip. The maximum earth fault
              loop impedance for an RCD-protected circuit is calculated from the formula:
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Zs = 50 / I<sub>delta n</sub>
              </p>
              <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                <p>
                  <strong className="text-yellow-400">50</strong> = maximum touch voltage in volts
                  (from BS 7671 Regulation 411.3.2.1)
                </p>
                <p>
                  <strong className="text-yellow-400">
                    I<sub>delta n</sub>
                  </strong>{' '}
                  = rated residual operating current of the RCD in amperes
                </p>
              </div>
            </div>
            <p>
              For a 30 mA (0.03 A) RCD: Zs = 50 / 0.03 ={' '}
              <strong className="text-yellow-400">1667 ohms</strong>. For a 100 mA (0.10 A) RCD: Zs
              = 50 / 0.10 = <strong className="text-yellow-400">500 ohms</strong>. For a 300 mA
              (0.30 A) RCD: Zs = 50 / 0.30 = <strong className="text-yellow-400">167 ohms</strong>.
            </p>
            <p>
              The 1667 ohm limit for 30 mA RCDs is so generous that virtually any circuit within a
              building will meet it. This is why RCD protection is so valuable on TT installations
              (where Ze can be very high due to the earth electrode resistance) and as a solution
              for circuits where the Zs is too high for the OCPD alone to disconnect within time.
            </p>
            <p>
              However, it is important to note that even on RCD-protected circuits, you should still
              verify that the overcurrent protective device can disconnect a line-to-earth fault. If
              the RCD fails (sticks), the OCPD is the backup. BS 7671 recommends (but does not
              require for all cases) that the Zs still permits the OCPD to operate within 5 seconds
              as a secondary measure. The Elec-Mate calculator checks both the RCD limit and the
              OCPD limit, flagging any discrepancies.
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 mt-4">
              <h3 className="font-bold text-yellow-400 text-lg mb-2">
                TT Systems — Earth Electrode Resistance (Ra)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                On TT installations, the return path from the installation earth back to the supply
                transformer is through the general mass of earth rather than a metallic conductor.
                The resistance of this path — the earth electrode resistance, Ra — can be 20 ohms or
                more, making Zs far too high for any overcurrent protective device to clear a fault
                within the required disconnection time. This is why BS 7671 Regulation 411.5
                requires TT installations to use RCD protection: Regulation 411.6.5(b) states that
                the condition Ra &#215; I &#8804; 50 V must be satisfied (where Ra is the sum of the
                resistances of the earth electrode and the protective conductor, and I is the
                current causing automatic disconnection). Because RCDs operate on differential
                current rather than fault-current magnitude, even a very high Ra will not prevent
                disconnection — the 1667 ohm limit for a 30 mA RCD easily encompasses any practical
                TT Ze value.
              </p>
              <p className="text-white text-sm leading-relaxed mt-2">
                Ra is measured on site using a proprietary earth electrode resistance tester (or the
                3-terminal fall-of-potential method). BS 7671 Regulation 643.7.3 requires that where
                the earthing system incorporates an earth electrode, the electrode resistance to
                earth (Ra) shall be measured and recorded. Typical TT Ze values obtained from the
                distributor or measured on site should be used for design verification; on-site
                measurement is required if the distributed value is unavailable or suspect (OSG Reg
                1.3).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prospective Fault Current (Ipf) */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Prospective Fault Current (Ipf) and the Schedule of Test Results
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Alongside Zs, BS 7671 Regulation 643.7.3.201 requires that the{' '}
              <strong className="text-yellow-400">
                prospective short-circuit current and prospective earth fault current
              </strong>{' '}
              shall be measured, calculated, or determined at the origin of the installation and at
              other relevant points. This is a mandatory requirement for initial verification — not
              an optional check. The prospective fault current (commonly written as Ipf or PSCC at
              the origin) must be recorded on the Schedule of Test Results and on the Electrical
              Installation Certificate (EIC).
            </p>
            <p>
              Ipf is related to Zs but is a separate quantity. While Zs tells you whether a fault
              will be cleared quickly enough, Ipf tells you how severe the fault current could be at
              a given point. All protective devices (MCBs, fuses, RCBOs) have a rated short-circuit
              capacity (Ics or Icn) — the maximum fault current they can safely interrupt. If Ipf
              exceeds the device's rated breaking capacity, the device may fail catastrophically
              during a fault. BS 7671 Appendix 14 provides further guidance on determination of
              prospective fault current.
            </p>
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-white text-base mb-2">
                Ipf at the origin — quick formula
              </h3>
              <p className="text-sm text-white leading-relaxed">
                Ipf (prospective earth fault current) = Uo ÷ Zs, where Uo is the nominal
                line-to-earth voltage (230 V). Prospective short-circuit current (line-to-line) uses
                the line-to-line voltage (400 V) and the relevant loop impedance. For typical TN-C-S
                supplies with Ze of 0.35 ohms, Ipf at the origin is approximately 230 ÷ 0.35 ≈{' '}
                <strong className="text-yellow-400">657 A</strong> — well within the 6 kA breaking
                capacity of standard domestic MCBs. On installations with very low Ze (close to a
                substation), Ipf can be significantly higher.
              </p>
            </div>
            <p>
              The OSG (On-Site Guide, Reg 1.2.7) confirms that installers shall document
              verification of prospective fault current on installation records, certificates, and
              schedules of tests to demonstrate compliance. When completing an EICR, the maximum Ipf
              recorded at the time of original installation should be checked against device
              ratings; a code C2 or C3 may be appropriate if devices with insufficient breaking
              capacity are found.
            </p>
          </div>
        </div>
      </section>

      {/* A4:2026 Changes Relevant to Zs Planning */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/30">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">
              BS 7671 A4:2026 — Key Changes for Zs Planning
            </h2>
            <div className="space-y-4 text-white leading-relaxed text-sm">
              <div>
                <h3 className="font-bold text-white mb-1">
                  Reg 411.3.4 — Mandatory RCD protection on domestic lighting circuits
                </h3>
                <p>
                  Amendment 4 adds Regulation 411.3.4, which requires that AC final circuits
                  supplying luminaires within domestic (household) premises shall be provided with
                  additional protection by an RCD with a rated residual operating current not
                  exceeding 30 mA. This directly affects Zs planning on lighting circuits (such as
                  Example 2 above): the circuit must now have a 30 mA RCD regardless of whether the
                  Zs easily meets the OCPD limit. The 1667 ohm RCD Zs limit will always be
                  satisfied, but the presence of the mandatory RCD must be reflected on the Schedule
                  of Test Results and the EICR.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">
                  Reg 421.1.7 — AFDD recommendation for AC final circuits
                </h3>
                <p>
                  Regulation 421.1.7 recommends the installation of arc fault detection devices
                  (AFDDs) in AC final circuits of a fixed installation to mitigate the risk of fire
                  due to arc fault currents. The wording is recommendatory (not mandatory with
                  'shall'), but specifiers and assessors should consider AFDDs — particularly on
                  socket-outlet circuits — when planning protection at design stage. AFDDs combine
                  OCPD and RCD functions with arc detection; their Zs requirements follow the
                  integrated OCPD type fitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Measuring Ze and R1+R2 */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Measure Ze and R1+R2
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Measuring Ze:</strong> The external earth fault
              loop impedance is measured at the origin of the installation. Disconnect the main
              earthing conductor from the earthing terminal (this isolates the installation's earth
              from the supply earth). Connect your loop impedance tester between the incoming line
              terminal and the disconnected earthing conductor. The reading is Ze. On a TN-C-S (PME)
              supply, you should expect a Ze of 0.35 ohms or less. On a TN-S supply with a cable
              sheath earth, typical values are 0.80 ohms or less. On a TT system, Ze depends on the
              resistance of the earth electrode and can be 20 ohms or more.
            </p>
            <p>
              <strong className="text-yellow-400">Measuring R1+R2:</strong> The resistance of the
              line conductor and CPC combined is measured using the long lead method (also called
              the wandering lead method). At the distribution board, temporarily link the line and
              CPC of the circuit together. Then, using a low-resistance ohmmeter, measure the
              resistance from the line terminal at the distribution board to the line and CPC linked
              together at each point on the circuit. The reading at the furthest point is the R1+R2
              value.
            </p>
            <p>
              The long lead method effectively measures the resistance of a conductor loop
              consisting of the line conductor going out to the point and the CPC coming back. This
              is why the value is called R1+R2 — it is the sum of the line conductor resistance (R1)
              and the CPC resistance (R2) over the length of the circuit.
            </p>
            <p>
              Common R1+R2 values for domestic circuits depend on the cable size and length. Always
              obtain the precise mΩ/m figures from GN3 Table B1 (copper conductors at 20 °C) — the
              full table must be used because fragmentary extracts can be misleading. Note that
              25.51 mΩ/m refers to aluminium 2.5 mm² conductors, not copper twin and earth; verify
              the correct copper 2.5 mm²/1.0 mm² CPC value from Table B1 before use in calculations.
            </p>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Calculate Zs — Step by Step
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
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use the Elec-Mate Zs Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Faster and more reliable than
            flipping through tables on site.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="Earth Fault Loop Impedance Calculator (Zs) - BS 7671"
            description="Free Zs calculator: Zs = Ze + (R1+R2). Check earth fault loop impedance against the maximum for your device and disconnection time, to BS 7671."
            ctaText="Try Elec-Mate free"
            ctaHref="/auth/signup"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20"></div>
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
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Verified App Store reviews — policy-safe SoftwareApplication aggregateRating */}
      <section className="px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <RecentReviews />
        </div>
      </section>

      {/* Related calculators — peer surface for internal-link health.
          Topic-matched via token-Jaccard against the broader SEO corpus. */}
      <section className="px-5 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Related electrical calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
              Earth Fault Loop Impedance Explained
            </SEOInternalLink>
            <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
              Earth Fault Loop Impedance Calculation
            </SEOInternalLink>
            <SEOInternalLink href="/guides/earth-fault-loop-impedance-testing">
              Earth Fault Loop Impedance Testing
            </SEOInternalLink>
            <SEOInternalLink href="/guides/earth-loop-impedance-too-high">
              Earth Loop Impedance Too High
            </SEOInternalLink>
            <SEOInternalLink href="/guides/earth-fault-loop-impedance-too-high">
              Earth Fault Loop Impedance Too High
            </SEOInternalLink>
            <SEOInternalLink href="/loop-impedance-testing-guide">
              Loop Impedance Testing Guide
            </SEOInternalLink>
            <SEOInternalLink href="/guides/earth-electrode-testing">
              Earth Electrode Testing
            </SEOInternalLink>
            <SEOInternalLink href="/earth-electrode-testing">
              Earth Electrode Testing Guide UK
            </SEOInternalLink>
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Calculate Zs in Seconds on Site"
        subheading="Join 1,000+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
