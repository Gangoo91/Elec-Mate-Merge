import { Helmet } from 'react-helmet';
import { RecentReviews } from '@/components/seo/RecentReviews';
import PFCCalculator from '@/components/apprentice/calculators/PFCCalculator';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Smartphone,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BookOpen,
  Zap,
  Users,
  CircuitBoard,
  Gauge,
  Activity,
  FileCheck2,
} from 'lucide-react';

const PAGE_TITLE = 'Prospective Fault Current Calculator | PSCC & PEFC | Elec-Mate';
const PAGE_DESCRIPTION =
  'Calculate prospective fault current (PSCC + PEFC) on your phone. Verify breaking capacity, BS 7671 Reg 434.5.1, plus 70 calculators. Start free.';

const faqs = [
  {
    question: 'What is the difference between PSCC and PEFC?',
    answer:
      'PSCC (Prospective Short-Circuit Current) is the maximum fault current that would flow if a short circuit occurred between live conductors (line-to-line or line-to-neutral) at a given point in the installation. PEFC (Prospective Earth Fault Current) is the fault current that would flow if a fault occurred between a line conductor and earth at a given point. PSCC is always higher than PEFC because the earth fault loop has additional impedance from the protective conductors. In practice, the term "Prospective Fault Current" (PFC or Ipf) is often used as a general term, and when a single value is given on a test instrument it is usually the higher of the two — the PSCC. BS 7671 requires that the prospective fault current is determined at every relevant point in the installation, and that the breaking capacity of protective devices is adequate for the highest prospective fault current that could occur at their location.',
  },
  {
    question: 'How do you calculate prospective fault current?',
    answer:
      'Prospective fault current is calculated using the formula Ipf = Uo / Zs (or Uo / Zf for short-circuit current using the relevant loop impedance). Uo is the nominal line voltage to earth (230 V in the UK). Zs is the earth fault loop impedance at the point of measurement. For prospective short-circuit current between line and neutral, the impedance is Zf (the line-neutral loop impedance). In practice, electricians use a multifunction tester that measures the impedance and calculates the fault current automatically. The instrument displays the prospective fault current directly. For design calculations (before the installation exists), the impedance is calculated by adding the supply impedance (Ze) to the impedance of the circuit conductors, using the tabulated resistance values from BS 7671 or cable manufacturer data.',
  },
  {
    question: 'Why does prospective fault current matter for protective device selection?',
    answer:
      'Every protective device (MCB, RCBO, fuse, MCCB) has a rated breaking capacity — the maximum fault current it can safely interrupt. If the prospective fault current at the point where the device is installed exceeds its breaking capacity, the device may fail catastrophically during a fault, potentially causing an arc flash, fire, or explosion. BS 7671 Reg 434.5.1 requires that every protective device capable of protecting against both overload and fault current is able to break any overcurrent up to and including the maximum prospective fault current at its point of installation. For example, a standard domestic MCB typically has a breaking capacity of 6 kA. If the prospective fault current at the consumer unit is 4.5 kA, the MCB is suitable. If the PFC is 8 kA, a device with a higher breaking capacity (10 kA or 16 kA) must be used, or the combined short-circuit protection permitted by Reg 434.5.1 must be applied — an upstream device of adequate breaking capacity, with the coordination between the two devices demonstrated to the manufacturers’ instructions in line with Section 536.',
  },
  {
    question: 'What is a typical prospective fault current in a domestic installation?',
    answer:
      'Typical prospective fault current values in domestic installations vary depending on the supply type, the cable length from the transformer, and the cross-sectional area of the supply cables. For a modern domestic installation with a TN-C-S (PME) supply, PSCC at the origin is commonly in the range of 2 kA to 8 kA, with most falling between 3 kA and 6 kA. Urban properties close to a substation may see values towards the higher end, while rural properties at the end of long overhead lines may see values as low as 0.5 kA to 1.5 kA. For TN-S supplies (with a separate neutral and earth), values are similar. For TT supplies (with a local earth electrode), PEFC can be very low — often below 200 A — because the earth return path has high impedance through the ground. The PSCC (line-to-neutral fault) remains similar to TN supplies because it does not depend on the earth path.',
  },
  {
    question: 'Can I measure prospective fault current with a standard multifunction tester?',
    answer:
      'Yes. All modern multifunction testers (such as the Megger MFT1741, Metrel MI 3152, or Fluke 1664FC) include a prospective fault current measurement function. The instrument is connected between line and neutral (for PSCC) or line and earth (for PEFC) at the point of interest, typically at the origin of the installation (the incoming supply) and at each distribution board. The tester injects a small test current, measures the loop impedance, and calculates the prospective fault current using Ipf = Uo/Zs. The displayed value is the fault current in kA. The measurement takes a fraction of a second and is done live (with the supply energised). Both PSCC and PEFC should be recorded on the electrical installation certificate or condition report.',
  },
  {
    question: 'What if the prospective fault current exceeds the MCB breaking capacity?',
    answer:
      'If the prospective fault current at a distribution board exceeds the breaking capacity of the MCBs installed in it, there are several options. First, you can replace the MCBs with devices that have a higher breaking capacity — some manufacturers offer MCBs rated at 10 kA or 16 kA instead of the standard 6 kA. Second, BS 7671 Reg 434.5.1 permits a downstream device with a lower rated breaking capacity than the prospective short-circuit current at its point of installation under specific conditions — combined short-circuit protection — provided an upstream device has adequate breaking capacity and the coordination between the two devices is demonstrated using the instructions of the manufacturer of the downstream device (derived from tests to the relevant product standards such as BS EN 60898-1 and BS EN 60947-2). Where no such manufacturer information is available, combined short-circuit protection must not be used and each device must have the full breaking capability at its point of installation. Third, you can install a current-limiting device upstream to reduce the fault current reaching the board. The electrician must verify the coordination and document it.',
  },
];

const howToSteps = [
  {
    name: 'Open the PFC calculator',
    text: 'Launch Elec-Mate and navigate to the calculators section. Tap "Prospective Fault Current" from the list of 70 available calculators. The calculator opens with fields for the input values.',
  },
  {
    name: 'Enter the supply voltage',
    text: 'Enter the nominal supply voltage (Uo). For UK single-phase supplies this is 230 V. For three-phase calculations, you may need to use the line-to-line voltage (400 V) depending on the fault type being calculated.',
  },
  {
    name: 'Enter the loop impedance',
    text: 'Enter the measured or calculated loop impedance (Zs for earth fault current, or the line-neutral impedance for short-circuit current). If you have measured Ze at the origin and know the circuit conductor impedances (R1+R2 or R1+Rn), you can enter these separately and the calculator adds them.',
  },
  {
    name: 'View the calculated fault current',
    text: 'The calculator instantly displays the prospective fault current in amperes and kA. It also shows whether the value exceeds common protective device breaking capacities (6 kA, 10 kA, 16 kA) to help you verify device suitability.',
  },
  {
    name: 'Check against your protective device',
    text: 'Compare the calculated fault current against the breaking capacity of the protective device at that point in the installation. The app flags whether the device is suitable or whether a higher-rated device is needed.',
  },
  {
    name: 'Save or export the result',
    text: 'Save the calculation to your project records or export it as part of your certificate documentation. The calculated value can be carried directly into your EICR or EIC test results.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant PFC Calculation',
    description:
      'Enter impedance and voltage, get prospective fault current instantly. Both PSCC and PEFC calculated simultaneously.',
  },
  {
    icon: Gauge,
    title: 'Breaking Capacity Check',
    description:
      'Automatically compares the calculated fault current against standard MCB, RCBO, and fuse breaking capacities. Flags any under-rated devices.',
  },
  {
    icon: Activity,
    title: 'PSCC & PEFC Separately',
    description:
      'Calculate prospective short-circuit current and prospective earth fault current independently using the appropriate impedance values.',
  },
  {
    icon: CircuitBoard,
    title: 'Impedance Input Options',
    description:
      'Enter total loop impedance directly, or enter Ze plus R1+R2/R1+Rn separately. The calculator handles both methods.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Reg 434.5.1',
    description:
      'Designed around the BS 7671:2018+A4:2026 requirement to verify that protective device breaking capacity meets or exceeds the prospective fault current.',
  },
  {
    icon: Smartphone,
    title: '70 Calculators in One App',
    description:
      'PFC is one of 70 electrical calculators in Elec-Mate — 56 technical and 14 business calculators, all on your phone.',
  },
  {
    icon: FileCheck2,
    title: 'Certificate Integration',
    description:
      'Calculated values integrate directly with EICR, EIC, and Minor Works certificates. No re-keying between calculator and certificate.',
  },
  {
    icon: BookOpen,
    title: 'Worked Examples Built In',
    description:
      'Access worked examples for domestic TN-C-S, TN-S, and TT installations showing how PFC is determined and applied in practice.',
  },
  {
    icon: Clock,
    title: 'Offline Capable',
    description:
      'All calculators work offline. Calculate fault currents in basements, plant rooms, and other areas with no mobile signal.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Prospective Fault Current Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://www.elec-mate.com/tools/prospective-fault-current-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
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
  name: 'How to Calculate Prospective Fault Current Using Elec-Mate',
  description:
    'A step-by-step guide to calculating prospective fault current (PSCC and PEFC) and verifying protective device breaking capacity using the Elec-Mate app.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function ProspectiveFaultCurrentCalculatorPage() {
  useSEO({
    title: 'Prospective Fault Current Calculator | PSCC & PEFC',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
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

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              BS 7671:2018+A4:2026 Regulation 434.5.1
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            <span className="text-yellow-400">Prospective Fault Current</span> Calculator for
            Electricians
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-4">
            Prospective fault current (Ipf) is calculated as Uo &divide; Zloop — for UK single-phase
            this is 230&nbsp;V divided by the measured loop impedance in ohms. BS&nbsp;7671
            Reg&nbsp;434.5.1 requires every protective device to have a breaking capacity at least
            equal to the prospective fault current at its point of installation. BS&nbsp;7671
            Reg&nbsp;643.7.3.201 requires that this value is measured, calculated or determined at
            the origin and at every other relevant point.
          </p>
          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Calculate PSCC and PEFC instantly on your phone. Verify protective device breaking
            capacity, check compliance with BS&nbsp;7671, and access 70 electrical calculators — all
            in one app.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Live calculator — free, no signup, BS 7671:2018+A4:2026 compliant */}
      <section id="calculator" className="px-5 pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <PFCCalculator />
        </div>
      </section>

      {/* What is Prospective Fault Current */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is Prospective Fault Current?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Prospective fault current (PFC) is the maximum current that would flow at a given
              point in an electrical installation if a fault of negligible impedance occurred at
              that point. It is a theoretical maximum — the worst-case fault current that the
              installation could produce if everything went wrong. Understanding and calculating
              this value is fundamental to safe electrical installation design because it determines
              what the protective devices must be capable of handling.
            </p>
            <p>
              There are two types of prospective fault current that electricians need to consider.
              Prospective short-circuit current (PSCC) is the fault current that would flow between
              line and neutral conductors if they were short-circuited. Prospective earth fault
              current (PEFC) is the fault current that would flow between a line conductor and earth
              if a fault to earth occurred. PSCC is always the higher of the two because the
              line-neutral loop has lower impedance than the earth fault loop (the earth path
              includes the resistance of the protective conductors, which adds impedance).
            </p>
            <p>
              The value of prospective fault current at any point in an installation depends on the
              source impedance (how stiff the supply is), the impedance of the cables between the
              supply and the point of interest, and the nominal voltage. A property close to a
              distribution transformer on thick cables will have a high prospective fault current. A
              property at the end of a long overhead line on thin conductors will have a low
              prospective fault current.
            </p>
            <p>
              BS&nbsp;7671 Reg&nbsp;643.7.3.201 requires that the prospective short-circuit current
              and prospective earth fault current are measured, calculated or determined by another
              method at the origin of every installation and at every other relevant point, with
              further guidance on determination given in Appendix&nbsp;14. Reg&nbsp;434.5.1
              separately requires that the breaking capacity of
              every protective device is not less than the prospective fault current at its point of
              installation. Both measurements and device checks are mandatory parts of initial
              verification and periodic inspection, and the values must be recorded on the
              electrical installation certificate or condition report. Use the{' '}
              <SEOInternalLink href="/tools/earth-fault-loop-impedance-calculator">
                earth fault loop impedance calculator
              </SEOInternalLink>{' '}
              to determine Zs at each point, the{' '}
              <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                adiabatic equation calculator
              </SEOInternalLink>{' '}
              to verify conductor sizing under fault conditions, the{' '}
              <SEOInternalLink href="/tools/voltage-drop-calculator">
                voltage drop calculator
              </SEOInternalLink>{' '}
              for a complete circuit assessment, and the{' '}
              <SEOInternalLink href="/tools/cable-sizing-calculator">
                cable sizing calculator
              </SEOInternalLink>{' '}
              to size conductors correctly.
            </p>
          </div>
        </div>
      </section>

      {/* The Calculation */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Prospective Fault Current Is Calculated
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The calculation is based on a simple application of Ohm's law. For a fault of
              negligible impedance, the fault current is limited only by the impedance of the supply
              and the conductors in the fault loop. The formula is:
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-yellow-500/20 p-6 my-6 text-center">
            <p className="text-2xl sm:text-3xl font-mono font-bold text-yellow-400 mb-3">
              Ipf = Uo / Zloop
            </p>
            <div className="space-y-1 text-white text-sm">
              <p>
                <strong>Ipf</strong> = Prospective fault current (amperes)
              </p>
              <p>
                <strong>Uo</strong> = Nominal voltage to earth (230 V in the UK)
              </p>
              <p>
                <strong>Zloop</strong> = Total loop impedance of the fault path (ohms)
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              For <strong>prospective earth fault current (PEFC)</strong>, Zloop is the earth fault
              loop impedance (Zs), which consists of the impedance of the source (transformer
              winding), the line conductor from the source to the point of the fault, and the return
              path through the protective conductor and the earthing arrangement back to the source.
              This is the impedance measured by a loop impedance tester connected between line and
              earth.
            </p>
            <p>
              For <strong>prospective short-circuit current (PSCC)</strong>, Zloop is the impedance
              of the line-neutral fault loop, which consists of the source impedance, the line
              conductor to the fault point, and the neutral conductor back to the source. This
              impedance is lower than the earth fault loop because the neutral conductor typically
              has lower resistance than the earth return path, so PSCC is always higher than PEFC.
            </p>
          </div>

          {/* Worked Examples */}
          <h3 className="text-xl font-bold text-white mt-8 mb-4">Worked Examples</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h4 className="font-bold text-white mb-3">Domestic TN-C-S (PME) Supply</h4>
              <div className="space-y-1.5 text-white text-sm">
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">Ze (earth loop, at origin)</span>
                  <span className="font-mono">0.20 Ω</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">Line-neutral impedance</span>
                  <span className="font-mono">0.12 Ω</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">PEFC = 230 ÷ 0.20</span>
                  <span className="font-mono font-bold text-yellow-400">1,150 A (1.15 kA)</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">PSCC = 230 ÷ 0.12</span>
                  <span className="font-mono font-bold text-yellow-400">1,917 A (1.92 kA)</span>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-green-900/30 border border-green-700/40 px-3 py-2 text-sm text-white">
                A standard 6 kA MCB is more than adequate for this installation.
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h4 className="font-bold text-white mb-3">Commercial Unit Near a Transformer</h4>
              <div className="space-y-1.5 text-white text-sm">
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">Ze (earth loop, at origin)</span>
                  <span className="font-mono">0.08 Ω</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">Line-neutral impedance</span>
                  <span className="font-mono">0.03 Ω</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">PEFC = 230 ÷ 0.08</span>
                  <span className="font-mono font-bold text-yellow-400">2,875 A (2.88 kA)</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-1.5">
                  <span className="text-white/70">PSCC = 230 ÷ 0.03</span>
                  <span className="font-mono font-bold text-yellow-400">7,667 A (7.67 kA)</span>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-orange-900/30 border border-orange-700/40 px-3 py-2 text-sm text-white">
                A 6 kA MCB is NOT adequate. Use 10 kA devices, or verify combined short-circuit
                protection under Reg&nbsp;434.5.1.
              </div>
            </div>
          </div>
          {/* GN3 0.8 temperature correction note */}
          <div className="rounded-2xl bg-yellow-500/[0.06] border border-yellow-500/20 p-5 mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-white text-sm leading-relaxed">
                <p className="font-semibold text-yellow-400">
                  Important: The 0.8 Temperature Correction Factor
                </p>
                <p>
                  The worked examples above show Ipf calculated from a measured impedance. When
                  comparing a measured Zs (taken at ambient temperature) against the maximum
                  tabulated Zs values in BS&nbsp;7671, the conductor resistance will be higher at
                  full operating temperature than when measured cold on site. Appendix&nbsp;3 of
                  BS&nbsp;7671 covers measurement of earth fault loop impedance, and the widely used
                  industry rule of thumb (set out in IET Guidance Note&nbsp;3) is that the measured Zs
                  satisfies:
                </p>
                <p className="font-mono font-bold text-yellow-300">
                  Zs(measured) &le; 0.8 &times; Zs(table)
                </p>
                <p>
                  Equivalently, divide the tabulated maximum Zs by 0.8 to get the maximum
                  permissible measured value — or confirm that your measured value is no more than
                  80% of the table limit. If your measured Zs is within this limit you can be
                  confident compliance is maintained at operating temperature. Instruments that
                  apply this correction automatically will indicate a pass/fail against the adjusted
                  limit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Prospective Fault Current Matters
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Prospective fault current is not an abstract theoretical concept — it has direct,
              practical consequences for the safety of every electrical installation. The primary
              reason it matters is the selection of protective devices with adequate breaking
              capacity.
            </p>
            <p>
              Every circuit breaker, fuse, and RCBO has a rated breaking capacity — the maximum
              fault current it can safely interrupt. If a fault occurs and the prospective fault
              current exceeds the device's breaking capacity, the device may not be able to clear
              the fault. The consequences can be severe: the contacts may weld together, the arc may
              not be extinguished, and the device may rupture, potentially causing an arc flash,
              fire, or explosion. This is not a theoretical risk — it happens in practice when
              installations are designed without properly considering the prospective fault current.
            </p>
            <p>
              Two separate regulations govern this. Reg&nbsp;434.5.1 requires that every protective
              device providing protection against both overload and fault current shall be capable
              of breaking any overcurrent up to and including the maximum prospective fault current
              at the point where the device is installed. Reg&nbsp;643.7.3.201 (Part 6) carries the
              determination obligation: the prospective short-circuit current and prospective earth
              fault current shall be measured, calculated or determined at the origin of the
              installation and at every other relevant point. Both requirements are mandatory — one
              governs device selection, the other governs measurement and verification during
              initial verification and periodic inspection (EICR).
            </p>
            <p>
              In domestic installations, the prospective fault current at the consumer unit rarely
              exceeds 6 kA, so standard domestic MCBs (rated 6 kA) are usually adequate. But in
              commercial and industrial installations, or in domestic properties very close to a
              transformer, the PFC can exceed 6 kA. In these cases, MCBs with higher breaking
              capacities (10 kA, 16 kA, or even 25 kA) or moulded-case circuit breakers (MCCBs) are
              required.
            </p>
          </div>

          {/* Breaking capacity reference — visual table */}
          <h3 className="text-xl font-bold text-white mt-8 mb-4">
            Common Device Breaking Capacities
          </h3>
          <p className="text-white text-sm leading-relaxed mb-4">
            The rated breaking capacity (Icn for circuit-breakers to BS&nbsp;EN&nbsp;60898, or the
            breaking capacity for fuses to BS&nbsp;88) must be at least equal to the prospective
            fault current at the device’s point of installation. Common values you will meet on UK
            jobs:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="font-mono font-bold text-yellow-400 text-lg">6 kA</p>
              <p className="text-white text-sm mt-1">
                Standard domestic MCB / RCBO. Adequate for most dwellings.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="font-mono font-bold text-yellow-400 text-lg">10 kA</p>
              <p className="text-white text-sm mt-1">
                Used where PFC exceeds 6 kA — properties near substations, light commercial.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="font-mono font-bold text-yellow-400 text-lg">16 / 25 kA</p>
              <p className="text-white text-sm mt-1">
                Commercial distribution boards and higher fault-level locations.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="font-mono font-bold text-yellow-400 text-lg">36–50 kA+</p>
              <p className="text-white text-sm mt-1">
                MCCBs and ACBs at industrial main boards and dedicated transformer supplies.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="font-mono font-bold text-yellow-400 text-lg">80 kA+</p>
              <p className="text-white text-sm mt-1">
                HRC fuses to BS&nbsp;88, often used as the high-rupturing protection at the origin.
              </p>
            </div>
            <div className="rounded-2xl bg-yellow-500/[0.06] border border-yellow-500/20 p-4">
              <p className="font-semibold text-yellow-400 text-sm">Rule</p>
              <p className="text-white text-sm mt-1">
                Always: device breaking capacity ≥ measured PFC at that point (Reg&nbsp;434.5.1).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Helps */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Makes Fault Current Calculations Easy
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              While the PFC formula is simple, getting the input values right and checking the
              results against protective device specifications requires attention to detail.
              Elec-Mate's prospective fault current calculator handles the arithmetic and the
              compliance check in one step.
            </p>
            <p>
              Enter the measured impedance (or Ze plus conductor impedances if you prefer to
              calculate from components), and the calculator gives you both PSCC and PEFC instantly.
              It compares the results against standard MCB breaking capacities and flags any devices
              that would be under-rated. The calculated values can be carried directly into your
              EICR, EIC, or Minor Works certificate without re-keying.
            </p>
            <p>
              The PFC calculator is one of 70 electrical calculators available in Elec-Mate — 56
              technical calculators covering cable sizing, voltage drop, maximum demand, diversity,
              conduit fill, trunking fill, adiabatic equation, disconnection times, and more, plus
              14 business calculators for quoting, pricing, and job costing. All work offline on
              your phone or tablet.
            </p>
            <p>
              Combined with 16 certificate types, 8 Elec-AI agents, 12 AI tools, 46+ training
              courses, and integration with Xero and QuickBooks, Elec-Mate is the complete platform
              for UK electricians.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Calculate Prospective Fault Current Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to calculate prospective fault current and verify protective device
            breaking capacity using the Elec-Mate app.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic vs Commercial */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Prospective Fault Current: Domestic vs Commercial Installations
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The prospective fault current varies enormously between different types of
              installation, and this variation has direct implications for protective device
              selection and installation design. The table below shows indicative ranges only —
              actual values depend on the supply, the cable run and the distribution network, and
              must be measured or determined on site, never assumed.
            </p>
          </div>

          {/* Typical PFC by installation type — visual table */}
          <div className="overflow-hidden rounded-2xl border border-white/10 mt-6 mb-6">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="bg-white/[0.06] text-left">
                  <th className="p-3 font-semibold">Installation type</th>
                  <th className="p-3 font-semibold">Typical PFC at the board</th>
                  <th className="p-3 font-semibold">Usual device rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10 bg-green-900/20">
                  <td className="p-3">Rural domestic, long service cable</td>
                  <td className="p-3 font-mono">~0.5 kA – 1.5 kA</td>
                  <td className="p-3">6 kA MCB</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3">Typical domestic (TN-C-S / TN-S)</td>
                  <td className="p-3 font-mono">~2 kA – 6 kA</td>
                  <td className="p-3">6 kA MCB</td>
                </tr>
                <tr className="border-t border-white/10 bg-yellow-900/20">
                  <td className="p-3">Domestic close to substation</td>
                  <td className="p-3 font-mono">may exceed 6 kA</td>
                  <td className="p-3">10 kA device, or verify</td>
                </tr>
                <tr className="border-t border-white/10 bg-orange-900/20">
                  <td className="p-3">Commercial, three-phase main board</td>
                  <td className="p-3 font-mono">~10 kA – 25 kA+</td>
                  <td className="p-3">10–25 kA MCB / MCCB</td>
                </tr>
                <tr className="border-t border-white/10 bg-red-900/30">
                  <td className="p-3">Industrial / dedicated transformer</td>
                  <td className="p-3 font-mono">up to 50 kA+</td>
                  <td className="p-3">MCCB / ACB / HRC fuse</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white leading-relaxed">
            <p>
              In <strong>domestic installations</strong>, the supply is typically a 100 A
              single-phase supply via a service cable from the nearest substation. The impedance of
              this service cable, combined with the transformer impedance, usually results in a
              prospective fault current between 2 kA and 6 kA at the consumer unit. Standard
              domestic MCBs with a 6 kA breaking capacity are adequate for the vast majority of
              domestic installations. The main areas of concern are properties very close to
              substations (where PFC can exceed 6 kA) and properties at the end of very long service
              cables (where PFC may be low enough to affect disconnection times).
            </p>
            <p>
              In <strong>commercial installations</strong>, the picture is different. Three-phase
              supplies with larger transformer capacities and shorter, thicker cables to the
              transformer can produce prospective fault currents of 10 kA to 25 kA or more at the
              main distribution board. Sub-distribution boards further from the origin will have
              lower PFC due to the impedance of the submain cables. In these installations, the
              designer must carefully select protective devices at each level of distribution,
              considering both the prospective fault current at that point and the coordination with
              upstream and downstream devices.
            </p>
            <p>
              In <strong>industrial installations</strong>, particularly those with large motor
              loads or connection to high-voltage supplies via dedicated transformers, prospective
              fault currents can reach 50 kA or more. These installations require specialist design
              and the use of MCCBs, ACBs, or HRC fuses with appropriately high breaking capacities.
              Fault level studies are often carried out as part of the design process to ensure all
              equipment is rated correctly.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Working Electricians */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Working Electricians
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed by electricians for electricians. The prospective fault current
              calculator is one of 70+ calculators that work the way you actually need them to on
              site — fast, accurate, and available on your phone even without a signal. Enter your
              measured values, get the answer, move on.
            </p>
            <p>
              The platform also includes 16 certificate types (EICR, EIC, Minor Works, emergency
              lighting, fire alarm, EV charger, PAT testing, and solar PV), 8 Elec-AI agents, 12 AI
              tools, and 46+ training courses. Xero and QuickBooks integration means you can manage
              your jobs, certificates, and invoicing all from one app.
            </p>
          </div>
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-8 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="Elec-Mate Includes All the Electrical Calculators You Need"
            description="Elec-Mate includes all the electrical calculators you need — use them on any job, on any device."
            ctaText="Try Elec-Mate free"
            ctaHref="/auth/signup"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Prospective Fault Current
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-semibold text-left touch-manipulation min-h-[44px]">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-yellow-400 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-white text-sm leading-relaxed">{faq.answer}</div>
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

      <SEOCTASection
        heading="Calculate fault current in seconds, not minutes"
        subheading="Join 1,000+ UK electricians using 70 professional calculators on their phone. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
