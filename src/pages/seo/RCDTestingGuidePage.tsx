import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Timer,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the maximum permitted trip time for a 30 mA RCD at rated current?',
    answer:
      'At the rated residual operating current (IΔn) — which is 30 mA for a standard domestic RCD — the device must trip within 300 milliseconds. This is the "1x" test. At five times the rated current (5× IΔn = 150 mA), the RCD must trip within 40 milliseconds. These times are specified in BS EN 61008 and BS EN 61009 for RCCBs and RCBOs respectively. During the half-rated current test (½× IΔn = 15 mA), the RCD must NOT trip — this confirms the device is not overly sensitive. All three tests must be carried out during periodic inspection and testing as part of the EICR process.',
  },
  {
    question: 'Do I need to test an RCD on both positive and negative half-cycles?',
    answer:
      'Yes. BS 7671 and the IET Guidance Note 3 (GN3) require that RCDs are tested on both the positive (0°) and negative (180°) half-cycles of the supply waveform. This is because an earth fault could occur at any point in the AC cycle, and the RCD must operate correctly regardless. Modern multifunction test instruments (MFTs) have a switch or setting to select the test phase angle. You should record the worst-case (longest) trip time from both half-cycles. If the device trips within the required time on one half-cycle but not the other, the RCD has failed and should be replaced.',
  },
  {
    question: 'What is the difference between a Type AC and a Type A RCD?',
    answer:
      'A Type AC RCD detects and responds to sinusoidal AC residual currents only. This is the traditional type that has been in use for decades. A Type A RCD detects sinusoidal AC residual currents AND pulsating DC residual currents — the kind produced by equipment with single-phase rectifiers such as computers, EV chargers, washing machines with variable-speed drives, and many modern electronic loads. BS 7671 Regulation 531.3.3 now requires Type A (or better) RCDs for circuits supplying equipment that is likely to produce DC fault currents. In practice, this means Type A is now the standard choice for most new domestic and commercial installations.',
  },
  {
    question: 'Can I use the push-button test on an RCD as a substitute for instrument testing?',
    answer:
      'No. The integral push-button (or "T" button) on an RCD is a functional test only. It confirms that the mechanical trip mechanism works — that is, the button creates an artificial imbalance and the contacts open. However, it does NOT verify that the device will trip within the required time at the correct fault current. Only a calibrated test instrument can measure the actual trip time in milliseconds and confirm compliance with BS EN 61008/61009 limits. The push-button test should be carried out by the user periodically (the IET recommends quarterly) as a basic functional check, but it is not a substitute for the formal RCD tests required during inspection and testing.',
  },
  {
    question: 'Why might an RCD fail to trip during testing?',
    answer:
      'There are several reasons an RCD might fail to trip during instrument testing. The most common is a high earth electrode resistance on TT systems — if the earth resistance is too high, insufficient current flows through the test instrument to reach the trip threshold. Loose connections in the RCD or at the earth bar can also prevent adequate fault current. Mechanical failure of the trip mechanism is another cause, particularly in older devices that have not been exercised regularly with the push-button. Contact welding can occur in devices that have been subjected to high inrush currents. Incorrect wiring — such as a borrowed neutral from another circuit — can also bypass the current transformer and prevent the RCD from detecting the imbalance. Finally, the RCD may simply be faulty or have degraded over time, which is why regular testing is essential.',
  },
];

const howToSteps = [
  {
    name: 'Visual inspection and push-button test',
    text: 'Before carrying out instrument tests, visually inspect the RCD for damage, overheating marks, or loose connections. Then press the integral push-button (T button) to confirm the mechanical trip operates correctly. If the push-button does not trip the device, the RCD has failed and must be replaced before proceeding with further tests.',
  },
  {
    name: 'Connect the test instrument',
    text: 'Connect your multifunction test instrument (MFT) to a socket outlet or accessory on the circuit protected by the RCD. Set the instrument to the RCD test function and select the correct rated residual operating current (typically 30 mA for domestic installations). Ensure the instrument is calibrated and within its calibration date.',
  },
  {
    name: 'Perform the half-rated current test (no trip)',
    text: 'Set the instrument to ½× IΔn (15 mA for a 30 mA device). Run the test on both the positive (0°) and negative (180°) half-cycles. The RCD must NOT trip at half the rated current. If it does trip, the device is overly sensitive and should be replaced. Record the result as "Did not trip" for both half-cycles.',
  },
  {
    name: 'Perform the 1× rated current test',
    text: 'Set the instrument to 1× IΔn (30 mA for a 30 mA device). Run the test on both half-cycles. The RCD must trip within 300 milliseconds. Record the worst-case (longest) trip time from either half-cycle. For a general-purpose (non-time-delayed) RCD, the maximum permitted trip time is 300 ms.',
  },
  {
    name: 'Perform the 5× rated current test',
    text: 'Set the instrument to 5× IΔn (150 mA for a 30 mA device). Run the test on both half-cycles. The RCD must trip within 40 milliseconds. This fast-trip test confirms the device can disconnect rapidly under a more severe fault condition. Record the worst-case trip time from either half-cycle.',
  },
  {
    name: 'Record results and assess compliance',
    text: 'Enter all trip times into the schedule of test results on the EICR or EIC form. Elec-Mate validates your entries against BS 7671 maximum permitted values automatically. If any test fails — the device trips at ½× IΔn, or exceeds the maximum trip time at 1× or 5× — record the observation and classify it as C1 or C2 as appropriate.',
  },
];

const features = [
  {
    icon: Timer,
    title: 'RCD Trip Time Validation',
    description:
      'Enter your measured trip times and the app instantly checks them against BS 7671 maximum permitted values for 30 mA, 100 mA, and 300 mA devices.',
  },
  {
    icon: Calculator,
    title: '50+ Electrical Calculators',
    description:
      'Beyond RCD testing, access cable sizing, voltage drop, maximum demand, Zs verification, prospective fault current, and dozens more calculations.',
  },
  {
    icon: ClipboardCheck,
    title: 'Digital EICR Forms',
    description:
      'Record RCD test results directly into the schedule of test results on your digital EICR. No double-handling from paper to computer.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Compliant',
    description:
      'Built to BS 7671:2018 + Amendment 2:2022. All test limit values, observation codes, and form structures follow the current 18th Edition standard.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Start certificates and record test results even without signal. Data saves locally and syncs to the cloud automatically when connectivity returns.',
  },
  {
    icon: Activity,
    title: 'Smart Observation Coding',
    description:
      'When a test result exceeds BS 7671 limits, the app suggests the appropriate observation code (C1, C2, C3, or FI) and the relevant regulation reference.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate RCD Testing Tools',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Complete RCD testing tools for UK electricians. Trip time validation, EICR test result recording, and BS 7671 compliance checking. Part of 50+ electrical calculators.',
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
  name: 'How to Test an RCD — Step-by-Step Procedure',
  description:
    'Step-by-step guide to testing Residual Current Devices (RCDs) using a multifunction test instrument, covering push-button test, half-rated, 1x rated, and 5x rated current tests.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function RCDTestingGuidePage() {
  useSEO({
    title: 'RCD Testing Guide | Procedures & Pass/Fail Criteria',
    description:
      'Complete guide to RCD testing procedures for UK electricians. Type AC, A, B, F devices. Trip times, test currents, and BS 7671 requirements. 50+ electrical calculators included.',
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
            <ShieldCheck className="w-4 h-4" />
            50+ Electrical Calculators Included
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            RCD Testing Guide
            <span className="block text-yellow-400 mt-1">Procedures &amp; Pass/Fail Criteria</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete guide to RCD testing for UK electricians. Understand trip times, test currents, device types, and BS 7671 requirements. Record results digitally with Elec-Mate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See Test Procedure
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What is an RCD */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is an RCD and How Does It Work?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A Residual Current Device (RCD) is a protective device designed to disconnect the supply automatically when it detects an imbalance between the live and neutral conductors. Under normal operating conditions, the current flowing through the live conductor into a circuit is exactly equal to the current returning through the neutral conductor. If some current leaks to earth — through a person touching a live part, through damaged insulation, or through a fault in an appliance — the outgoing and returning currents are no longer equal. The RCD detects this imbalance and trips, disconnecting the circuit within milliseconds.
            </p>
            <p>
              The operating principle relies on a current transformer, commonly called a toroidal core or toroid. Both the live and neutral conductors pass through the centre of this ring-shaped core. Under normal conditions, the magnetic fields created by the live and neutral currents cancel each other out because the currents are equal and opposite. When a residual current exists — meaning some current is flowing to earth instead of returning through the neutral — the magnetic fields no longer cancel. This net magnetic flux induces a small voltage in a sensing coil wound around the toroid. When this voltage reaches a threshold corresponding to the rated residual operating current (IΔn), it energises a trip coil that mechanically opens the main contacts, disconnecting the circuit.
            </p>
            <p>
              The entire trip sequence — from fault detection through to contact separation — happens extremely quickly. A standard 30 mA RCD must operate within 300 milliseconds at its rated current and within 40 milliseconds at five times its rated current (150 mA). This speed is critical because the severity of an electric shock depends on both the magnitude of the current passing through the body and the duration of exposure. At 30 mA, the threshold of ventricular fibrillation is approximately 500 milliseconds for most adults, so the 300 ms trip time provides a safety margin.
            </p>
            <p>
              It is important to understand that an RCD does not protect against all types of electric shock. It will not operate if a person touches both live and neutral simultaneously (because the current still returns through the neutral and no earth leakage occurs). It also provides no protection against overcurrent — that is the job of the MCB (Miniature Circuit Breaker) or fuse. An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions in a single device, providing protection against both earth leakage and overcurrent.
            </p>
          </div>
        </div>
      </section>

      {/* Types of RCD */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Types of RCD — AC, A, B, and F Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Not all residual currents are pure sinusoidal AC. Modern electronic equipment — including EV chargers, variable-speed drives, photovoltaic inverters, and switch-mode power supplies — can produce residual currents with DC components or mixed frequencies. Different types of RCD are designed to detect different waveforms of residual current. Selecting the correct type is a BS 7671 requirement and getting it wrong can leave circuits unprotected.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">AC</span>
                <h3 className="font-bold text-white text-lg">Type AC</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Detects sinusoidal AC residual currents only. This is the most basic type. It was the standard for decades but is now largely superseded by Type A in new installations. Type AC cannot detect DC fault currents, so it must not be used where electronic equipment could produce pulsating DC residual currents. Identified by the symbol showing a sine wave on the device front plate.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">A</span>
                <h3 className="font-bold text-white text-lg">Type A</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Detects sinusoidal AC residual currents AND pulsating DC residual currents. This is now the standard type for most domestic and commercial circuits under BS 7671 Regulation 531.3.3. Pulsating DC residual currents are produced by equipment with single-phase rectifiers — washing machines, dishwashers, computers, LED drivers, and EV chargers in Mode 2 charging. The symbol shows a sine wave with a pulsating DC waveform beneath it.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">B</span>
                <h3 className="font-bold text-white text-lg">Type B</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Detects sinusoidal AC, pulsating DC, AND smooth (pure) DC residual currents. Type B RCDs are required where equipment uses three-phase rectifiers that can produce smooth DC fault currents — for example, some EV chargers (Mode 3 and Mode 4), variable-frequency drives (VFDs), and certain industrial equipment. They are significantly more expensive than Type A devices but are essential where the fault current may have a DC component that Type A cannot detect.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">F</span>
                <h3 className="font-bold text-white text-lg">Type F</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Detects sinusoidal AC, pulsating DC, AND composite residual currents that include mixed frequencies generated by single-phase variable-speed drives. Type F is designed specifically for circuits supplying frequency-controlled equipment such as heat pumps, air conditioning units, and washing machines with inverter motors. It fills the gap between Type A and Type B — it can handle the complex waveforms from single-phase inverters without the cost of a full Type B device.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Selecting the correct RCD type is not optional — it is a requirement of BS 7671. Regulation 531.3.3 states that the type of RCD shall be selected taking into account the waveform of the residual current likely to occur under fault conditions. Installing a Type AC where a Type A or Type B is required means the device may not trip under a fault, leaving the circuit and its users unprotected. When specifying RCDs on an EIC or as part of a design, always consider the equipment that will be connected to the circuit.
            </p>
          </div>
        </div>
      </section>

      {/* Where RCDs are Required */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Where RCDs Are Required by BS 7671</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 Regulation 411.3.3 sets out the circumstances where additional protection by means of an RCD with a rated residual operating current not exceeding 30 mA is required. The requirements have expanded significantly with each amendment to the standard and now cover most circuits in a typical domestic or commercial installation.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Circuits Requiring 30 mA RCD Protection (Regulation 411.3.3)</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Socket outlets rated up to 32 A</strong> — All socket outlets with a rated current not exceeding 32 A must be protected by a 30 mA RCD, regardless of location. This covers all standard 13 A sockets, 16 A industrial sockets, and 32 A sockets for appliances such as cookers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Mobile equipment up to 32 A outdoors</strong> — Any circuit supplying mobile equipment intended for use outdoors must be RCD-protected. This includes garden lighting supplies, external socket outlets, and circuits for equipment used in garages, sheds, and outbuildings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Cables concealed in walls or partitions at a depth of less than 50 mm</strong> — Unless the cable has an earthed metallic covering (such as SWA or MICC) or is enclosed in earthed metallic trunking or conduit, cables installed in walls at shallow depth must be on RCD-protected circuits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Cables in walls or partitions containing metallic parts</strong> — Where the construction includes metallic elements (such as metal stud partitions), cables must be RCD-protected unless they have an earthed metallic covering or are at a depth exceeding 50 mm.</span>
                </li>
              </ul>
            </div>
            <p>
              Beyond these specific requirements, many installers now provide RCD protection for all circuits as a matter of good practice. The use of RCBOs (one per circuit) provides individual RCD protection without the nuisance tripping that can affect shared RCDs on split-load consumer units. This approach also provides better discrimination, as a fault on one circuit does not trip the RCD protecting multiple other circuits.
            </p>
          </div>
        </div>
      </section>

      {/* RCD Test Procedures */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">RCD Test Procedures and Pass/Fail Criteria</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              RCD testing forms a mandatory part of both initial verification (when certifying new work with an EIC) and periodic inspection and testing (when producing an EICR). The test procedure involves a series of tests at different multiples of the rated residual operating current, each with specific pass/fail criteria defined by BS EN 61008 (for RCCBs) and BS EN 61009 (for RCBOs).
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Standard RCD Test Sequence (General Type, Non-Delayed)</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-yellow-400">Test 1:</span>
                    <span className="font-bold text-white">Push-Button Test</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">Press the integral test button on the RCD. The device must trip mechanically. This confirms the trip mechanism is functional. It does NOT verify trip time or sensitivity — it is a functional check only. Reset the device after the test.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-yellow-400">Test 2:</span>
                    <span className="font-bold text-white">Half-Rated Current (½× IΔn) — Must NOT Trip</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">Apply a test current of half the rated residual operating current (15 mA for a 30 mA device). Test on both positive and negative half-cycles. The RCD must NOT trip. If it trips at half-rated current, the device is overly sensitive and requires replacement. This test confirms the device will not nuisance trip under normal leakage conditions.</p>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-yellow-400">Test 3:</span>
                    <span className="font-bold text-white">Rated Current (1× IΔn) — Must Trip Within 300 ms</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">Apply a test current equal to the rated residual operating current (30 mA for a 30 mA device). Test on both positive and negative half-cycles. The RCD must trip within 300 milliseconds. Record the worst-case (longest) trip time. This is the primary sensitivity test.</p>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-yellow-400">Test 4:</span>
                    <span className="font-bold text-white">Five-Times Rated Current (5× IΔn) — Must Trip Within 40 ms</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">Apply a test current of five times the rated residual operating current (150 mA for a 30 mA device). Test on both positive and negative half-cycles. The RCD must trip within 40 milliseconds. This fast-trip test confirms the device can disconnect rapidly under a severe fault. Record the worst-case trip time.</p>
                </div>
              </div>
            </div>
            <p>
              For time-delayed (Type S or selective) RCDs, the maximum permitted trip times are different. At 1× IΔn, a Type S RCD must trip between 130 ms and 500 ms (it has a deliberate delay to allow a downstream non-delayed RCD to trip first). At 5× IΔn, it must trip between 50 ms and 200 ms. This selective behaviour is used to achieve discrimination between RCDs in series — for example, a 100 mA Type S RCD at the main switch with 30 mA non-delayed RCDs downstream.
            </p>
          </div>
        </div>
      </section>

      {/* RCD Ratings */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">30 mA vs 100 mA vs 300 mA — RCD Ratings and Applications</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              RCDs are manufactured with different rated residual operating currents (IΔn) for different applications. The three most common ratings in UK installations are 30 mA, 100 mA, and 300 mA. Each serves a specific purpose, and using the wrong rating can compromise safety or cause nuisance tripping.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">30 mA</h3>
                <h4 className="font-bold text-white mb-3">Additional Protection</h4>
                <p className="text-white text-sm leading-relaxed">
                  The standard rating for additional protection against electric shock. Required by BS 7671 Regulation 411.3.3 for socket outlets up to 32 A, mobile equipment outdoors, and cables in walls at shallow depth. The 30 mA threshold is below the level that causes ventricular fibrillation in most adults, making it effective at preventing fatal electric shock from contact with live parts.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">100 mA</h3>
                <h4 className="font-bold text-white mb-3">Fire Protection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Used primarily for fire protection rather than personal protection. A 100 mA RCD can detect earth leakage currents that are too small to trip an MCB but large enough to generate heat and potentially start a fire — especially in deteriorated wiring or damp conditions. Often used as the main switch RCD in a split-load consumer unit, providing fire protection for circuits that do not require 30 mA additional protection.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">300 mA</h3>
                <h4 className="font-bold text-white mb-3">Fire Protection (Larger Installations)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Also used for fire protection, typically in larger commercial or industrial installations where the total standing earth leakage from multiple pieces of equipment would cause nuisance tripping of a 100 mA device. Regulation 422.3.9 requires RCD protection with a rated residual operating current not exceeding 300 mA for installations in locations with a risk of fire. Not suitable for personal protection against electric shock.
                </p>
              </div>
            </div>
            <p>
              The selection between these ratings must be based on the specific protection requirements identified during the design stage. A 30 mA RCD provides both personal protection and fire protection. A 100 mA or 300 mA device provides fire protection only. Where BS 7671 requires additional protection (30 mA), a higher-rated device cannot be substituted regardless of other considerations.
            </p>
          </div>
        </div>
      </section>

      {/* Time-Delayed RCDs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Time-Delayed (Type S) RCDs and Selectivity</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A time-delayed RCD, identified as Type S (or selective), has a built-in delay before it trips. This delay is not about slowing down protection — it is about achieving discrimination (selectivity) between RCDs installed in series. Without selectivity, a fault on a single circuit could trip an upstream RCD and disconnect the entire installation, rather than just the affected circuit.
            </p>
            <p>
              Consider a typical domestic consumer unit with a 100 mA Type S RCCB as the main switch and individual 30 mA RCBOs protecting each circuit. If an earth fault occurs on the kitchen socket circuit, the 30 mA RCBO on that circuit should trip first, disconnecting only the kitchen sockets. The 100 mA Type S main switch should remain closed, keeping the rest of the installation energised. This is achieved because: (a) the 30 mA device is more sensitive than the 100 mA device, and (b) the Type S delay ensures the main switch does not trip before the downstream device has had time to operate.
            </p>
            <p>
              For a Type S RCD, the maximum permitted trip times at 1× IΔn are between 130 ms and 500 ms (compared to 300 ms maximum for a non-delayed type). At 5× IΔn, the limits are 50 ms to 200 ms (compared to 40 ms for non-delayed). These wider time bands accommodate the intentional delay while still ensuring the device trips within a safe timeframe.
            </p>
            <p>
              When testing a Type S RCD, you must use the correct time-delayed settings on your test instrument. Most modern MFTs have a specific "Type S" or "selective" test mode. If you test a Type S device in non-delayed mode, you will record trip times that appear to exceed the non-delayed limits, which could lead you to incorrectly fail a device that is actually performing within its design parameters. Always check the device front plate for the Type S symbol (the letter "S" inside a box) before selecting your test parameters.
            </p>
          </div>
        </div>
      </section>

      {/* RCD Testing as Part of EICR */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">RCD Testing as Part of the EICR Process</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              RCD testing is a mandatory part of every Electrical Installation Condition Report (EICR). The schedule of test results on the EICR form includes dedicated columns for recording RCD test data: the device type, rated residual operating current (IΔn), and the measured operating time at the test currents applied.
            </p>
            <p>
              During a periodic inspection, every RCD in the installation must be tested. This includes RCCBs (residual current circuit breakers without overcurrent protection), RCBOs (residual current circuit breakers with overcurrent protection), and any other devices that incorporate residual current sensing — such as socket outlets with built-in RCD protection (SRCD sockets) and RCD-protected connection units.
            </p>
            <p>
              For each RCD, you must carry out the push-button test, the half-rated current test, the 1× IΔn test, and the 5× IΔn test. Record the worst-case trip time from both half-cycles for each current level. If any device fails any of the tests, you must record an observation on the EICR with the appropriate classification code. A device that fails to trip at 1× or 5× rated current would typically be classified as C1 (Danger Present) or C2 (Potentially Dangerous) depending on the circumstances. A device that trips at half-rated current would be C2, as it indicates the device is likely to nuisance trip and could be disconnected by the occupant in frustration, leaving the circuit without RCD protection.
            </p>
            <p>
              Elec-Mate makes this process faster by letting you record RCD test results directly into the digital EICR form as you test each device. The app automatically validates trip times against the correct limits for the device type (general or time-delayed) and highlights any failures for immediate attention. This eliminates the common problem of transcription errors when transferring handwritten results from site notes to a desktop certificate package.
            </p>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common RCD Testing Faults and Troubleshooting</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              RCD testing does not always go smoothly. Understanding the common faults and their causes helps you troubleshoot efficiently on site instead of wasting time or incorrectly condemning a perfectly functional device.
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">RCD will not trip at rated current</strong> — Check for high earth electrode resistance (TT systems), loose connections at the earth bar, or a faulty device. On TT systems, the earth electrode resistance may be too high for the test instrument to deliver sufficient test current. Verify the Ze and earth electrode resistance before condemning the RCD.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">RCD trips at half-rated current</strong> — The device may be overly sensitive due to internal degradation, or there may be existing earth leakage on the circuit from connected equipment. Disconnect all loads and retest. If the device still trips at half-rated current with no load, it should be replaced.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Trip times vary significantly between half-cycles</strong> — A large difference in trip time between the positive and negative half-cycles can indicate a partially damaged toroidal core or a problem with the sensing circuitry. If one half-cycle passes and the other fails, the device must be treated as failed and replaced.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Borrowed neutral preventing trip</strong> — If a neutral conductor from another circuit passes through the RCD toroid, the currents will not balance correctly. This is a wiring fault, not a device fault. Check for cross-connected neutrals, particularly in older installations or where previous work has been done.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Nuisance tripping in service</strong> — Persistent nuisance tripping is often caused by excessive standing earth leakage from connected equipment (particularly older appliances, outdoor lighting, or long cable runs in damp environments). It can also be caused by a Type AC RCD on a circuit supplying equipment that produces DC residual currents — upgrading to a Type A or Type F device often resolves the issue.
                </span>
              </li>
            </ul>
            <p>
              Elec-Mate includes troubleshooting guidance within the app. When you record a failed RCD test result, the app can suggest possible causes and recommend next steps, helping less experienced electricians diagnose problems more efficiently on site.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Test an RCD — Step by Step</h2>
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
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Testing
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Record RCD test results, validate against BS 7671 limits, and export professional certificates — all from your phone.
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

      {/* CTA */}
      <SEOCTASection
        heading="Record RCD Test Results Digitally"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
