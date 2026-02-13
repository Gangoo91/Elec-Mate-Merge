import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Brain,
  Activity,
  ListOrdered,
  Gauge,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'Electrical Testing Sequence | GN3 Order Explained | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to the correct electrical testing sequence from IET Guidance Note 3 (9th Edition). Continuity, insulation resistance, polarity, loop impedance, PFC, and RCD testing explained.';

const faqs = [
  {
    question: 'Why does the testing sequence matter?',
    answer:
      'The testing sequence matters because each test builds on the results of the previous test and, critically, each test relies on the safety conditions established by the previous test. For example, you must confirm that the insulation resistance is satisfactory (test 3) before you energise the circuit to carry out earth fault loop impedance testing (test 5). If you performed loop impedance testing without first verifying insulation resistance, you could energise a circuit with a fault to earth, causing a dangerous short circuit, damaging the test instrument, or injuring yourself. Similarly, you must verify continuity of the protective conductor (test 1) before relying on the earth path for loop impedance testing. The IET Guidance Note 3 (GN3) specifies the testing sequence precisely because it is the safe order — deviating from it introduces risk to both the electrician and the installation.',
  },
  {
    question: 'What is the difference between R1+R2 and R2 continuity tests?',
    answer:
      'The R1+R2 test measures the total resistance of the line conductor and the circuit protective conductor (CPC) of a circuit, connected together at the furthest point. This test serves two purposes: it verifies the continuity of the protective conductor (confirming there is a complete earth path from the furthest point back to the consumer unit), and the measured R1+R2 value is used to calculate the expected earth fault loop impedance (Zs) by adding it to the external earth fault loop impedance (Ze). The R2-only test measures the resistance of the circuit protective conductor alone, from the distribution board to the furthest point. This is used for some circuit types and in situations where you need to confirm the CPC is continuous independently of the line conductor. Both tests are carried out with the circuit de-energised using a low-reading ohmmeter (typically the continuity function on a multifunction tester) at a test voltage between 4 and 24 V DC.',
  },
  {
    question: 'What is the minimum acceptable insulation resistance?',
    answer:
      'BS 7671 Table 61 specifies the minimum insulation resistance values. For installations operating at voltages up to and including 500V AC (which covers all standard domestic and commercial installations at 230V and 400V), the test voltage is 500V DC and the minimum acceptable insulation resistance is 1.0 megohm (1 MΩ). For SELV and PELV circuits (separated extra-low voltage and protective extra-low voltage, typically 12V or 24V circuits), the test voltage is 250V DC and the minimum acceptable insulation resistance is 0.5 megohm (500 kΩ). In practice, the insulation resistance of a healthy circuit in good condition is typically much higher than the minimum — readings of 50 MΩ to 200 MΩ or more are common for new installations. Low but passing readings (for example, 2-5 MΩ) may indicate deteriorating insulation that should be monitored. Readings below 1 MΩ are failures that must be investigated and rectified before the circuit is energised.',
  },
  {
    question: 'Can I use a multifunction tester for all seven tests?',
    answer:
      'A modern multifunction test instrument (MFT) can perform all of the primary tests in the GN3 sequence: continuity (using the low-reading ohmmeter function), insulation resistance (using the insulation resistance function at 250V or 500V DC), polarity (confirmed during continuity testing and visual inspection), earth fault loop impedance (using the loop impedance function), prospective fault current (calculated automatically from the loop impedance measurement or measured directly), and RCD testing (using the RCD test function at various multiples of the rated current). You will also need a voltage indicator (sometimes called a proving unit or voltage tester) that complies with HSE Guidance Note GS38 for proving circuits dead before testing. This is not a function of the MFT — it is a separate instrument that is essential for safe isolation. Some tests, such as earth electrode resistance on TT systems using the fall-of-potential method, may require a dedicated earth electrode resistance tester, though the MFT loop impedance function can provide a working value.',
  },
  {
    question: 'What prospective fault current values make an installation unacceptable?',
    answer:
      'There is no single "unacceptable" prospective fault current value — the requirement is that the prospective fault current at every relevant point in the installation must not exceed the rated breaking capacity of the protective devices installed. If the prospective fault current exceeds the breaking capacity of a device, the device may not be able to safely interrupt the fault, potentially resulting in an explosion or fire. Standard domestic MCBs to BS EN 60898 have a rated breaking capacity of 6 kA (6,000 amps) — a minimum. Some have higher ratings of 10 kA or 15 kA. For most domestic installations, the prospective fault current at the consumer unit is typically between 1 kA and 4 kA, well within the 6 kA rating. However, installations close to the supply transformer or with very short mains tails can have much higher prospective fault currents — occasionally exceeding 6 kA. In these cases, devices with higher breaking capacity ratings (10 kA or 16 kA) must be installed. On an EICR, the measured prospective fault current (Ipf) is compared against the breaking capacity of every protective device to verify compliance.',
  },
  {
    question: 'How do I test a ring final circuit for continuity?',
    answer:
      'Ring final circuit continuity testing has three stages. First, measure the end-to-end resistance of each conductor in the ring: Line-to-Line (r1), Neutral-to-Neutral (rn), and CPC-to-CPC (r2). For a healthy ring with no cross-connections or breaks, r1 and rn should be approximately equal (since the conductors are the same size), and r2 may be different if the CPC is a different size (for example, 1.5mm squared CPC in 2.5mm squared twin-and-earth cable). Second, cross-connect the Line and Neutral conductors at one end of the ring (connecting L1 to N2 and N1 to L2, where subscripts indicate the two ends) and measure the resistance between Line and Neutral at each socket outlet on the ring. The readings should form a consistent pattern, rising to a maximum at the midpoint of the ring and then falling back — this is the figure-of-eight test. The maximum reading should be approximately (r1 + rn) / 4. Third, cross-connect the Line and CPC conductors and repeat the measurements at each socket outlet. The maximum reading should be approximately (r1 + r2) / 4. This final set of readings gives you the R1+R2 value at the furthest point of the ring for Zs calculation purposes.',
  },
];

const features = [
  {
    icon: ListOrdered,
    title: 'Guided Testing Sequence',
    description:
      'The app guides you through the correct GN3 testing sequence step by step. Never miss a test or do them in the wrong order again.',
  },
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Zs verification, prospective fault current checks, voltage drop, cable sizing, and dozens more. All built to BS 7671:2018+A3:2024.',
  },
  {
    icon: ClipboardCheck,
    title: 'Digital Test Result Entry',
    description:
      'Enter test results directly into the schedule of test results on your EIC or EICR. Results are validated against BS 7671 limits automatically.',
  },
  {
    icon: Brain,
    title: '8 AI Agents + 12 AI Tools',
    description:
      'Ask the AI about test procedures, pass/fail criteria, or troubleshooting unexpected results. Get instant, regulation-referenced answers on site.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Record test results even without signal. Data saves locally and syncs to the cloud automatically when connectivity returns.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'All test limits, Zs values, and compliance checks are built to the current 18th Edition including Amendment 3. Always up to date.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2025-03-15',
  dateModified: '2026-02-10',
  author: {
    '@type': 'Organization',
    name: 'Elec-Mate',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://elec-mate.com/guides/testing-sequence-guide',
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

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://elec-mate.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Testing Sequence Guide', item: 'https://elec-mate.com/guides/testing-sequence-guide' },
  ],
};

export default function TestingSequenceGuidePage() {
  useSEO({
    title: 'Electrical Testing Sequence | GN3 Order Explained',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...articleSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            IET Guidance Note 3 (9th Edition)
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Testing Sequence
            <span className="block text-yellow-400 mt-1">The GN3 Order Explained</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete guide to the correct testing sequence from IET Guidance Note 3. Why the order matters, what each test proves, pass/fail criteria, common mistakes, and equipment needed.
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
              href="#testing-sequence"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See the Sequence
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Testing Order Matters */}
      <section id="testing-sequence" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ListOrdered className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why the Testing Order Matters</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The electrical testing sequence is not arbitrary — it follows a logical and safety-critical order defined in IET Guidance Note 3: Inspection and Testing (currently the 9th Edition, aligned with the 18th Edition of BS 7671). Each test in the sequence serves a specific purpose, and many tests depend on the satisfactory completion of previous tests to be both safe and meaningful.
            </p>
            <p>
              The fundamental principle is that dead tests (carried out with the installation de-energised) must be completed before live tests (carried out with the installation energised). This is because the dead tests verify the basic integrity of the wiring — continuity, insulation, and polarity — before you apply mains voltage to the circuits. If you energised a circuit without first checking its insulation resistance, you could be applying 230V to a circuit with a short-circuit or earth fault, with potentially catastrophic results.
            </p>
            <p>
              The sequence also follows a logical progression from the simplest tests to the most complex. Continuity testing requires only a low-voltage ohmmeter. Insulation resistance testing requires a 500V DC test voltage. Earth fault loop impedance testing requires the circuit to be energised at mains voltage. RCD testing requires both mains voltage and a specific test current. Each step introduces more energy into the system, and the preceding tests ensure that the system is safe to receive that energy.
            </p>
          </div>
        </div>
      </section>

      {/* The Seven Tests */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Seven Tests in Order</h2>
          </div>

          {/* Test 1 */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">1</span>
              </div>
              <h3 className="font-bold text-white text-xl">Continuity of Protective Conductors</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That the circuit protective conductor (CPC) — the earth wire — is continuous from the distribution board to the furthest point of every circuit. This confirms that in the event of an earth fault, there is a complete low-impedance path for fault current to flow back to the source, allowing the protective device to operate.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> Using a low-reading ohmmeter (the continuity function on a multifunction tester), measure the resistance between the earth terminal at the distribution board and the earth terminal at each point on the circuit. For radial circuits, the measurement is made at the last accessory. For ring circuits, an end-to-end test is carried out first. The test is carried out with the circuit de-energised and all loads disconnected.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> The measured resistance must be consistent with the expected value based on the cable length, conductor size, and conductor material. There is no single pass/fail value — the reading must make sense for the circuit. A reading of infinity (open circuit) indicates a break in the CPC. An unexpectedly high reading may indicate a loose connection or damaged conductor. The measured R1+R2 value is recorded and used later to verify the earth fault loop impedance (Zs).
              </p>
              <p>
                <strong className="text-yellow-400">Why it is first:</strong> The earth path must be confirmed before any other test because the earth path is the primary safety mechanism. If the earth path is broken, the installation is immediately dangerous.
              </p>
            </div>
          </div>

          {/* Test 2 */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">2</span>
              </div>
              <h3 className="font-bold text-white text-xl">Continuity of Ring Final Circuit Conductors</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That the ring final circuit is a complete ring — that is, all three conductors (line, neutral, and CPC) leave the distribution board, travel around the ring, and return to the distribution board without any breaks. It also identifies any cross-connections (interconnections or spurs incorrectly tapping into the ring at more than one point) and confirms that the ring is correctly wired.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> The three-step method: (1) Measure end-to-end resistance of each conductor (r1, rn, r2). (2) Cross-connect line and neutral at one end, measure at each socket — readings should form a consistent pattern with a maximum of approximately (r1+rn)/4. (3) Cross-connect line and CPC at one end, measure at each socket — the maximum reading gives the R1+R2 value at the furthest point. Anomalous readings indicate breaks, cross-connections, or spurs.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> r1 and rn should be approximately equal (same conductor size). r2 may differ if the CPC is a different size. Cross-connected readings should follow a predictable pattern. Any readings that deviate significantly from the expected pattern require investigation.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is second:</strong> Ring circuit testing is an extension of protective conductor continuity testing and is still a dead test. It must be completed before insulation resistance testing because a break in the ring could be masked by insulation that appears satisfactory when tested from one end only.
              </p>
            </div>
          </div>

          {/* Test 3 */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">3</span>
              </div>
              <h3 className="font-bold text-white text-xl">Insulation Resistance</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That the insulation between live conductors and between live conductors and earth is in good condition and can withstand the normal operating voltage without allowing leakage current to flow. Poor insulation can cause earth leakage (tripping RCDs), short circuits (tripping MCBs), electric shock hazards, and fire risk from tracking currents through damp or damaged insulation.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> Using an insulation resistance tester set to 500V DC (for circuits up to 500V), measure the insulation resistance between all live conductors connected together and earth (Line+Neutral to Earth), and between live conductors (Line to Neutral). All switches should be closed (ON position), all loads disconnected, and all lamps removed. Electronic equipment, SPDs, and RCDs may need to be disconnected or bypassed to prevent damage from the 500V test voltage.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> Minimum acceptable value: 1.0 MΩ (megohm) for circuits up to 500V. Typical values for healthy circuits: 50 MΩ to 200+ MΩ. Values between 1 MΩ and 2 MΩ pass but indicate deteriorating insulation that should be monitored. Values below 1 MΩ are failures requiring investigation and remediation.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is third:</strong> Insulation resistance must be verified before any live tests are carried out. If insulation is compromised and you energise the circuit, fault current will flow — potentially damaging equipment, tripping devices unexpectedly, or creating a shock hazard. The 500V DC test voltage is safe to apply to a circuit whose conductors have been confirmed continuous by the previous tests.
              </p>
            </div>
          </div>

          {/* Test 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">4</span>
              </div>
              <h3 className="font-bold text-white text-xl">Polarity</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That all single-pole switching devices (light switches, MCBs, fuse carriers) are connected in the line conductor only, that socket outlets are correctly wired (line to the right terminal, neutral to the left, earth to the top), and that the centre contact of Edison-screw lampholders is connected to the line conductor. Incorrect polarity can leave metalwork live when a switch is turned off, or make an MCB ineffective because it is in the neutral rather than the line.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> Polarity is largely verified as part of the continuity tests — by measuring the continuity between specific conductors, you confirm which conductor is connected to which terminal. It is also confirmed by visual inspection (checking wiring at accessories) and, on energised circuits, by using a voltage indicator to verify that the line terminal is live and the neutral terminal is at earth potential.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> All single-pole devices must be in the line conductor. All socket outlets must have correct L-N-E connections. All Edison-screw lampholders must have line to centre contact. Any incorrect polarity is a failure that must be corrected.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is fourth:</strong> Polarity verification bridges the dead tests and the live tests. Much of the polarity confirmation comes from the continuity tests already completed, but final verification may require energising the circuit briefly — which is safe to do because insulation resistance has already been confirmed satisfactory.
              </p>
            </div>
          </div>

          {/* Test 5 */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">5</span>
              </div>
              <h3 className="font-bold text-white text-xl">Earth Fault Loop Impedance</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That the total impedance of the earth fault loop (from the point of the fault, through the CPC, through the main earthing terminal, through the external earth path back to the transformer, and through the transformer winding back to the point of the fault) is low enough for the protective device to operate within the required disconnection time. This is the Zs test — the single most important electrical safety verification.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> Using a loop impedance tester (the Zs function on a multifunction tester), connect to the circuit at the furthest point from the distribution board (the point with the highest expected impedance). The instrument applies a brief test current and measures the voltage drop to calculate the impedance. The measured Zs is compared against the maximum permitted value from BS 7671 tables for the type and rating of the protective device on that circuit. The external earth fault loop impedance (Ze) is measured at the origin with the main earthing conductor disconnected from the main earthing terminal.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> The measured Zs must not exceed the maximum value tabulated in BS 7671 for the protective device. For example, a B32 MCB has a maximum Zs of 1.37 ohms at the design stage. In practice, the rule of thumb is that the measured Zs should not exceed 80% of the tabulated maximum (to allow for temperature rise during normal operation). Values exceeding the tabulated maximum are failures.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is fifth:</strong> This is a live test — the circuit must be energised. It can only be performed safely after continuity (confirming the earth path exists), insulation resistance (confirming there are no faults), and polarity (confirming the circuit is correctly wired) have all been verified satisfactory.
              </p>
            </div>
          </div>

          {/* Test 6 */}
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">6</span>
              </div>
              <h3 className="font-bold text-white text-xl">Prospective Fault Current</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That the maximum fault current that could flow under a short-circuit or earth fault condition does not exceed the rated breaking capacity (kA rating) of the protective devices installed. If the prospective fault current exceeds the device rating, the device may not be able to safely interrupt the fault, potentially causing the device to explode or catch fire.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> Prospective fault current (Ipf) is measured or calculated at the origin of the installation (typically at the consumer unit). Many multifunction testers calculate Ipf automatically from the loop impedance measurement. Ipf is derived from the supply voltage divided by the loop impedance: for a line-earth fault, Ipf = Uo/Zs; for a line-neutral short circuit, Ipf = Uo/Zline-neutral. The highest value (typically the line-neutral short circuit) is the one that must not exceed the device breaking capacity.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> The prospective fault current must not exceed the rated breaking capacity of the protective device. Standard domestic MCBs have a minimum breaking capacity of 6 kA. If the measured Ipf exceeds 6 kA, higher-rated devices must be installed. This is recorded on the EIC or EICR.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is sixth:</strong> It follows naturally from the loop impedance test — in many cases, the Ipf is calculated from the same measurements. It is a live test and requires the circuit to be energised.
              </p>
            </div>
          </div>

          {/* Test 7 */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                <span className="font-bold text-yellow-400">7</span>
              </div>
              <h3 className="font-bold text-white text-xl">RCD Operation</h3>
            </div>
            <div className="space-y-3 text-white text-sm leading-relaxed pl-13">
              <p>
                <strong className="text-yellow-400">What it proves:</strong> That every RCD in the installation (RCCBs, RCBOs, and socket-outlet RCDs) operates correctly — tripping at the correct current and within the required time. This is the final safety verification, confirming that the additional protection against electric shock provided by RCDs is functional.
              </p>
              <p>
                <strong className="text-yellow-400">Method:</strong> For each RCD, carry out the following tests using the RCD test function on the multifunction tester: Push-button test (mechanical function check), half-rated current test at 0.5x IΔn on both half-cycles (must NOT trip), full rated current test at 1x IΔn on both half-cycles (must trip within 300 ms for general type, 130-500 ms for Type S), and five-times rated current test at 5x IΔn on both half-cycles (must trip within 40 ms for general type, 50-200 ms for Type S). Record the worst-case trip time from both half-cycles for each test.
              </p>
              <p>
                <strong className="text-yellow-400">Pass/fail:</strong> At 0.5x IΔn — must NOT trip. At 1x IΔn — must trip within 300 ms (general type) or 130-500 ms (Type S). At 5x IΔn — must trip within 40 ms (general type) or 50-200 ms (Type S). Failure at any stage requires investigation and may require device replacement.
              </p>
              <p>
                <strong className="text-yellow-400">Why it is last:</strong> RCD testing is the final test because it requires the circuit to be energised and draws a significant test current through the earth path. All previous tests must have confirmed that the earth path is continuous (test 1), the ring is complete (test 2), the insulation is sound (test 3), the polarity is correct (test 4), the loop impedance is acceptable (test 5), and the fault current is within device ratings (test 6). Only then is it safe to deliberately inject a fault current to test the RCD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Testing Mistakes</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Skipping the half-rated RCD test</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Some electricians skip the 0.5x IΔn test and go straight to the 1x test. This means an overly sensitive RCD (one that trips below its rated current) would not be detected. An overly sensitive RCD is a nuisance tripping risk — the occupant may disable it in frustration, leaving the circuit unprotected.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Testing loop impedance before insulation resistance</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Performing the Zs test before verifying insulation resistance means energising a circuit that may have a fault to earth. This could cause a short circuit, trip protective devices, damage the test instrument, or — in the worst case — cause an electric shock or arc flash.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Not disconnecting loads for insulation resistance testing</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Leaving appliances connected during insulation resistance testing can give misleadingly low readings (the appliance impedance is in parallel with the cable insulation). It can also damage sensitive electronic equipment — the 500V DC test voltage can destroy electronic controllers, LED drivers, and other electronic loads.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Using an uncalibrated test instrument</h3>
                  <p className="text-white text-sm leading-relaxed">
                    All test instruments must be calibrated and within their calibration date. Using an uncalibrated instrument means your test results cannot be relied upon — they may pass circuits that should fail, or fail circuits that should pass. Calibration is typically required annually. The calibration date should be recorded on the EIC or EICR.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Not testing RCDs on both half-cycles</h3>
                  <p className="text-white text-sm leading-relaxed">
                    RCDs must be tested on both positive (0 degrees) and negative (180 degrees) half-cycles of the supply waveform. An RCD that passes on one half-cycle but fails on the other has failed the test and must be replaced. The worst-case (longest) trip time from either half-cycle is the value that should be recorded on the certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Needed */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Gauge className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Equipment Needed for the Full Test Sequence</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              To carry out the complete GN3 testing sequence, you need the following equipment at minimum.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-white text-lg mb-2">Multifunction Tester (MFT)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The primary test instrument for all seven tests. Must be capable of: low-reading ohmmeter function for continuity (4-24V DC), insulation resistance testing at 250V and 500V DC, earth fault loop impedance (both Ze and Zs), prospective fault current measurement or calculation, and RCD testing at 0.5x, 1x, and 5x IΔn on both half-cycles. Major brands include Megger, Metrel, Fluke, Kewtech, and Seaward. Must be calibrated annually.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-white text-lg mb-2">GS38 Voltage Indicator</h3>
                <p className="text-white text-sm leading-relaxed">
                  A dedicated voltage indicator (not a multimeter) that complies with HSE Guidance Note GS38. Used for safe isolation — proving that circuits are dead before beginning work and testing. Must have: clearly marked voltage ratings, integral test probes with finger guards, fused test leads, and a proving unit or known live source to verify the indicator works correctly before and after use. This is a safety-critical instrument that protects your life.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-white text-lg mb-2">Test Leads and Accessories</h3>
                <p className="text-white text-sm leading-relaxed">
                  GS38-compliant test leads with fused probes, crocodile clips for continuity testing, a wander lead for testing at remote points, and a distribution board test adaptor (plug-in device that connects to the busbar and allows testing of all circuits from one point). Spare fuses for test leads are essential — a blown fuse in a test lead can give a false open-circuit reading.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-white text-lg mb-2">Safe Isolation Kit</h3>
                <p className="text-white text-sm leading-relaxed">
                  Padlocks and lock-off devices for securing isolation points, warning labels ("Danger — Do Not Switch On"), and a personal padlock with a unique key. Safe isolation is a prerequisite for all dead tests and must be carried out before any work begins on the installation.
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
            Why Electricians Choose Elec-Mate for Testing
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Record test results digitally, validate against BS 7671 limits, and produce professional certificates — all from your phone.
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

      {/* CTA */}
      <SEOCTASection
        heading="Record Test Results Digitally"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
