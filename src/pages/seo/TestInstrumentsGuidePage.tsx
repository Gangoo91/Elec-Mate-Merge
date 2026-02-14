import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Gauge,
  Wrench,
  Activity,
  Shield,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  BadgeCheck,
  Radio,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Test Instruments Guide | What You Need';
const PAGE_DESCRIPTION =
  'Complete guide to electrical test instruments for UK electricians. Multifunction tester, clamp meter, proving unit, socket tester, PAT tester, and calibration requirements. What you need, what it costs, and how to keep instruments compliant.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Test Instruments Guide', href: '/guides/test-instruments-guide' },
];

const tocItems = [
  { id: 'essential-instruments', label: 'Essential Test Instruments' },
  { id: 'multifunction-tester', label: 'Multifunction Tester (MFT)' },
  { id: 'clamp-meter', label: 'Clamp Meter' },
  { id: 'proving-unit', label: 'Proving Unit' },
  { id: 'socket-tester', label: 'Socket Tester' },
  { id: 'pat-tester', label: 'PAT Tester' },
  { id: 'voltage-indicator', label: 'Two-Pole Voltage Indicator' },
  { id: 'calibration', label: 'Calibration Requirements' },
  { id: 'choosing-instruments', label: 'Choosing the Right Instruments' },
  { id: 'elec-mate', label: 'Test Instruments with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A multifunction tester (MFT) is the single most important instrument — it performs continuity, insulation resistance, loop impedance, RCD, and polarity tests from one device.',
  'A two-pole voltage indicator and proving unit are essential for safe isolation — GS38 recommends a dedicated voltage indicator over a multimeter for proving circuits dead.',
  'Clamp meters measure load current non-invasively and are invaluable for diagnosing circuit issues, measuring maximum demand, and checking neutral currents on three-phase systems.',
  'All test instruments used for certification must be calibrated annually by a UKAS-accredited laboratory. Out-of-calibration instruments invalidate your test results and certificates.',
  'Elec-Mate records your instrument serial numbers and calibration dates on every certificate automatically, and reminds you when calibration is due.',
];

const faqs = [
  {
    question: 'What is the minimum set of test instruments I need as a domestic electrician?',
    answer:
      'As a minimum, a domestic electrician carrying out initial verification or periodic inspection and testing needs: a multifunction tester (MFT) capable of continuity, insulation resistance, earth fault loop impedance, RCD trip time, and prospective fault current measurements; a two-pole voltage indicator complying with GS38 for safe isolation; a proving unit to verify the voltage indicator works; and lock-off devices with padlocks for safe isolation. Optional but strongly recommended instruments include a clamp meter for measuring load current, a socket tester for quick visual checks, and a PAT tester if you carry out portable appliance testing. The MFT is by far the most expensive item — expect to pay between 500 and 1,500 pounds depending on the brand and model.',
  },
  {
    question: 'How often do electrical test instruments need to be calibrated?',
    answer:
      'Test instruments used for electrical testing and certification should be calibrated at least every 12 months by a UKAS-accredited calibration laboratory. This is not a legal requirement per se, but it is an industry-standard requirement enforced by all competent person scheme providers (NICEIC, NAPIT, ELECSA, etc.). If your instruments are out of calibration, any test results you record and any certificates you issue during that period could be challenged. Calibration typically costs between 50 and 150 pounds per instrument and takes 5 to 10 working days. Many suppliers offer loan instruments while yours is being calibrated. Always keep your calibration certificates — they must be available for audit by your scheme provider.',
  },
  {
    question: 'Can I use a multimeter instead of a multifunction tester?',
    answer:
      'A standard multimeter cannot replace a multifunction tester for BS 7671 testing. An MFT is specifically designed to perform the tests required by BS 7671 — continuity at the correct test voltage (4-24V DC), insulation resistance at 250V, 500V, and 1000V DC, earth fault loop impedance (both no-trip and standard modes), RCD trip time measurement, and prospective fault current calculation. A multimeter can measure voltage, current, and basic resistance, but it cannot perform insulation resistance tests at the required test voltages, cannot measure loop impedance, and cannot test RCD trip times. A multimeter is a useful supplementary instrument for diagnostics and fault finding, but it is not a substitute for an MFT.',
  },
  {
    question: 'What is the difference between a socket tester and proper testing?',
    answer:
      'A socket tester (also called a plug-in tester) is a simple device that plugs into a 13A socket outlet and uses indicator lights or a display to show basic wiring conditions — correct polarity, presence of earth, and sometimes a rough indication of loop impedance and RCD function. Socket testers are useful for quick visual checks and fault finding, but they are not a substitute for proper testing with a multifunction tester. A socket tester cannot measure insulation resistance, cannot verify continuity of protective conductors, cannot measure actual loop impedance values, and cannot measure actual RCD trip times. The results from a socket tester should never be recorded on a certificate. IET guidance is clear: socket testers supplement but do not replace proper instrument-based testing.',
  },
  {
    question: 'Do I need a separate insulation resistance tester if I have an MFT?',
    answer:
      'No. Modern multifunction testers include insulation resistance testing at 250V, 500V, and 1000V DC, which covers all the test voltages required by BS 7671 for standard installations. A standalone insulation resistance tester (megger) is only needed if you require test voltages above 1000V DC — for example, 2500V or 5000V testing on high-voltage equipment or long cable runs. For domestic and most commercial electrical work, the insulation resistance function on your MFT is sufficient.',
  },
  {
    question: 'What CAT rating should my test instruments have?',
    answer:
      'CAT (category) ratings define the level of transient overvoltage protection built into the instrument. For UK electrical work: CAT II is suitable for testing appliances and equipment connected to socket outlets. CAT III is suitable for testing at distribution board level — this is the minimum for an MFT used for standard electrical testing. CAT IV is suitable for testing at the origin of the installation (before the main switch) and for supply-side work. Most professional MFTs are rated CAT III 300V or CAT III 600V. For safe isolation voltage indicators, GS38 recommends at least CAT III for distribution-level work and CAT IV for origin-level work. Always check the CAT rating marked on the instrument — using an instrument at a higher category than it is rated for is dangerous.',
  },
  {
    question: 'How does Elec-Mate work with my test instruments?',
    answer:
      'Elec-Mate does not connect to your test instruments directly — you enter test results into the app manually (by typing, using voice entry, or using the board scanner for circuit data). The app then auto-validates every value against BS 7671 limits for the protective device on that circuit. Your instrument serial numbers and calibration dates are stored in the app and automatically printed on every certificate you issue. Elec-Mate also sends you a reminder when your calibration is approaching expiry, so you never accidentally issue a certificate with out-of-calibration instruments.',
  },
];

const sections = [
  {
    id: 'essential-instruments',
    heading: 'Essential Test Instruments for UK Electricians',
    content: (
      <>
        <p>
          Every electrician carrying out testing and certification needs the right instruments for
          the job. The specific instruments you need depend on the type of work you do, but the core
          set is the same for domestic, commercial, and industrial electricians. This guide covers
          each instrument, what it does, what to look for when buying, and the approximate cost.
        </p>
        <p>
          All test instruments used for certification must comply with the relevant British or
          European standards and must be calibrated by a UKAS-accredited laboratory. Using
          non-compliant or out-of-calibration instruments is a serious issue — your scheme provider
          can revoke your registration, and any certificates you have issued with non-compliant
          instruments could be challenged.
        </p>
        <p>
          The instruments covered here are those required for the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            BS 7671 testing sequence
          </SEOInternalLink>{' '}
          — the dead and live tests that form the basis of initial verification and periodic
          inspection.
        </p>
      </>
    ),
  },
  {
    id: 'multifunction-tester',
    heading: 'Multifunction Tester (MFT)',
    content: (
      <>
        <p>
          The multifunction tester is the single most important instrument for an electrician
          carrying out testing and certification. It combines multiple test functions into one
          instrument: continuity (low-resistance ohmmeter), insulation resistance at 250V, 500V, and
          1000V DC, earth fault loop impedance (Zs and Ze), RCD trip time measurement, and
          prospective fault current (PFC/PSCC/PEFC) calculation.
        </p>
        <p>
          Major brands include Megger (MFT1741, MFT1845), Fluke (1664FC, 1662), Kewtech (KT66DL,
          KT65DL), and Metrel (MI 3152). Prices range from approximately 500 pounds for entry-level
          models to 1,500 pounds for top-of-range instruments with Bluetooth connectivity and
          enhanced features. When choosing an MFT, key considerations include: BS EN 61557
          compliance, CAT III or CAT IV rating, no-trip loop impedance mode (essential for testing
          circuits protected by RCDs without nuisance tripping), auto-ranging insulation resistance,
          and Bluetooth/data download capability for transferring results to software.
        </p>
        <p>
          An MFT must comply with BS EN 61557 parts 1 through 7, which specify the requirements for
          each test function. This ensures the instrument applies the correct test voltages, uses
          the correct measurement techniques, and provides readings within acceptable accuracy
          limits.
        </p>
        <SEOAppBridge
          title="Record MFT results by voice on site"
          description="With probes in one hand, use Elec-Mate's voice entry to speak your test results directly into the schedule of tests. Say the circuit number and reading — the app fills in the rest. No clipboard juggling."
          icon={Radio}
        />
      </>
    ),
  },
  {
    id: 'clamp-meter',
    heading: 'Clamp Meter',
    content: (
      <>
        <p>
          A clamp meter measures current flowing through a conductor without breaking the circuit.
          The jaw of the instrument clamps around a single conductor, and the built-in current
          transformer measures the magnetic field produced by the current flow. This gives a
          non-invasive reading of the load current.
        </p>
        <p>
          Clamp meters are invaluable for several tasks: measuring load current on individual
          circuits to assess maximum demand, checking balanced loading across phases on three-phase
          installations, measuring neutral current on three-phase systems (high neutral current
          indicates load imbalance or harmonic issues), diagnosing tripping issues by measuring the
          actual current drawn by a circuit, and identifying circuits by clamping around individual
          cables at the distribution board and switching loads on and off.
        </p>
        <p>
          When choosing a clamp meter, look for: AC and DC current measurement, true RMS measurement
          (essential for accurate readings on non-linear loads), a jaw size large enough to fit
          around the conductors you commonly test, and a minimum resolution of 0.01A for detecting
          small leakage currents. Prices range from approximately 50 pounds for basic models to 400
          pounds for professional-grade instruments.
        </p>
      </>
    ),
  },
  {
    id: 'proving-unit',
    heading: 'Proving Unit',
    content: (
      <>
        <p>
          A proving unit is a battery-powered device that outputs a known voltage — typically 230V
          or 400V — to verify that your voltage indicator is working correctly. It is an essential
          component of the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          (prove-test-prove method).
        </p>
        <p>
          Without a proving unit, you would need to find another known live source (such as another
          energised circuit) to prove your voltage indicator works before and after testing the
          isolated circuit. A proving unit provides a convenient, portable, and reliable known
          voltage source that you can use anywhere on site.
        </p>
        <p>
          Major brands include Martindale, Kewtech, and Megger. Prices are typically between 30 and
          80 pounds. Most proving units are powered by a 9V battery and generate a simulated output
          voltage. Some models also include a test for the voltage indicator fuses, confirming that
          the fuses in the test leads have not blown.
        </p>
        <p>
          HSE Guidance Note GS38 strongly recommends using a proving unit as part of the
          prove-test-prove procedure. While it is theoretically possible to use another known live
          circuit for proving, a dedicated proving unit is more reliable and more convenient.
        </p>
      </>
    ),
  },
  {
    id: 'socket-tester',
    heading: 'Socket Tester',
    content: (
      <>
        <p>
          A socket tester is a plug-in device that checks the basic wiring condition of a 13A socket
          outlet using indicator lights or a display. Most socket testers check for correct polarity
          (L, N, E all connected to the correct terminals), reversed polarity, missing earth, and
          missing neutral. Advanced models may also include a rough indication of loop impedance and
          an RCD trip button.
        </p>
        <p>
          Socket testers are useful as a quick first-check tool — they can rapidly identify gross
          wiring errors before you set up your MFT for full testing. They are particularly useful
          during preliminary inspection on an EICR, where they can help you identify problem
          circuits that need closer attention.
        </p>
        <p>
          However, socket testers have significant limitations. They cannot measure actual values —
          only indicate pass or fail. They cannot detect all wiring faults — for example, they may
          not detect a borrowed neutral, a cross-connected CPC, or a high-resistance connection.
          They cannot replace instrument-based testing for certification purposes. IET guidance is
          clear that socket tester results should never be recorded on a certificate as a substitute
          for proper testing.
        </p>
        <p>
          Prices are typically between 10 and 50 pounds. Popular models include the Martindale
          EZ150, Kewtech EZYPAT, and the Socket & See SOK40.
        </p>
      </>
    ),
  },
  {
    id: 'pat-tester',
    heading: 'PAT Tester',
    content: (
      <>
        <p>
          A portable appliance tester (PAT tester) is used for testing portable electrical equipment
          and appliances. PAT testing is not a BS 7671 requirement — it falls under the Electricity
          at Work Regulations 1989 and IET Code of Practice for In-service Inspection and Testing of
          Electrical Equipment. However, many electricians offer{' '}
          <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT testing</SEOInternalLink> as an
          additional service.
        </p>
        <p>
          A PAT tester typically performs: earth continuity testing (confirming the earth connection
          between the plug earth pin and the appliance metalwork), insulation resistance testing at
          500V DC, earth leakage testing, and flash testing (dielectric strength testing) on some
          models. Results are recorded for each appliance along with a unique asset number and
          pass/fail status.
        </p>
        <p>
          PAT testers range from simple pass/fail instruments (approximately 100 to 200 pounds) to
          advanced download-capable instruments with barcode scanning (approximately 300 to 800
          pounds). For electricians offering PAT testing as a service, a mid-range instrument with
          data download capability is recommended.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-indicator',
    heading: 'Two-Pole Voltage Indicator',
    content: (
      <>
        <p>
          A two-pole voltage indicator is a dedicated instrument for detecting the presence or
          absence of voltage. It is the primary instrument used during{' '}
          <SEOInternalLink href="/guides/how-to-do-safe-isolation">safe isolation</SEOInternalLink>{' '}
          to prove that a circuit is dead before work begins. GS38 recommends a dedicated two-pole
          voltage indicator over a multimeter for this purpose because it is simpler, more reliable,
          and does not rely on batteries for its basic function.
        </p>
        <p>
          Key GS38 requirements for voltage indicators include: the instrument must be clearly
          marked with its voltage and CAT rating, test leads must be fused (maximum 500mA), test
          probes must have finger guards with spring-loaded tips (maximum 4mm exposed metal), and
          the instrument should conform to BS EN 61243-3. CAT III is the minimum for
          distribution-level work; CAT IV is required for origin-level testing.
        </p>
        <p>
          Popular models include the Fluke T150, Martindale VT28, Kewtech KT1780, and Megger TPT420.
          Prices range from approximately 80 to 250 pounds. Always buy from a reputable supplier and
          ensure the instrument is genuine — counterfeit test instruments are a known safety risk.
        </p>
      </>
    ),
  },
  {
    id: 'calibration',
    heading: 'Calibration Requirements',
    content: (
      <>
        <p>
          All test instruments used for electrical testing and certification must be calibrated at
          regular intervals by a UKAS-accredited calibration laboratory. The industry standard is
          annual calibration (every 12 months), although some scheme providers may accept longer
          intervals for instruments that are lightly used.
        </p>
        <p>
          Calibration verifies that the instrument is measuring accurately and within its specified
          tolerances. Over time, instruments can drift — electronic components age, mechanical parts
          wear, and environmental factors (temperature extremes, vibration, drops) can affect
          accuracy. Calibration identifies any drift and, where possible, adjusts the instrument
          back to within tolerance.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Calibration Key Points</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Frequency:</strong> Every 12 months is the
                industry standard. Mark your calibration due date in your calendar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Cost:</strong> Typically 50 to 150 pounds per
                instrument. Some suppliers include free calibration with the purchase price for the
                first year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Turnaround:</strong> Usually 5 to 10 working
                days. Many suppliers offer loan instruments while yours is being calibrated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Records:</strong> Keep all calibration
                certificates. They must be available for audit by your competent person scheme
                provider.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your instrument fails calibration (i.e., it is found to be outside tolerance), the
          calibration laboratory will advise whether it can be adjusted back into tolerance. If it
          cannot be adjusted, you may need to consider whether any test results recorded since the
          last successful calibration are still valid. This is a significant issue — discuss it with
          your scheme provider.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-instruments',
    heading: 'Choosing the Right Test Instruments',
    content: (
      <>
        <p>
          When building your instrument kit, consider the type of work you do most often. A domestic
          electrician doing initial verification and EICRs needs a different kit from a commercial
          electrician working on three-phase distribution systems. The core instruments (MFT,
          voltage indicator, proving unit) are the same, but additional instruments vary.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Domestic Electrician Kit</h3>
                <p className="text-white text-sm leading-relaxed">
                  MFT (Megger 1741 or equivalent), two-pole voltage indicator (Fluke T150 or
                  equivalent), proving unit, clamp meter, socket tester, lock-off kit. Total
                  approximate cost: 800 to 1,800 pounds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Commercial/Industrial Kit</h3>
                <p className="text-white text-sm leading-relaxed">
                  All of the above, plus: three-phase rotation tester, high-current clamp meter,
                  power quality analyser (for larger installations), thermal imaging camera
                  (optional). Total approximate cost: 1,500 to 4,000 pounds.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          The{' '}
          <SEOInternalLink href="/guides/fluke-vs-megger">
            Fluke vs Megger comparison
          </SEOInternalLink>{' '}
          covers the two most popular MFT brands in detail, including model comparisons, pricing,
          and user experience.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Test Instruments with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate stores your instrument details — make, model, serial number, and calibration
          expiry date — and prints them automatically on every certificate you issue. When your
          calibration is approaching expiry, the app sends you a reminder so you never accidentally
          issue a certificate with out-of-calibration instruments.
        </p>
        <SEOAppBridge
          title="Instrument details auto-printed on every certificate"
          description="Enter your MFT and voltage indicator details once. Elec-Mate prints the make, model, serial number, and calibration date on every EIC, EICR, and Minor Works certificate automatically. Update the calibration date after recalibration and all future certificates reflect the new date."
          icon={BadgeCheck}
        />
        <p>
          The app's{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            70+ electrical calculators
          </SEOInternalLink>{' '}
          help you verify your instrument readings against BS 7671 limits in real time on site.
          Every test result is auto-validated against the maximum permitted values for the
          protective device on that circuit, so you know immediately if a reading fails.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/fluke-vs-megger',
    title: 'Fluke vs Megger',
    description:
      'Detailed comparison of the two most popular MFT brands. Model comparison, pricing, features, and user experience.',
    icon: Gauge,
    category: 'Comparison',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description:
      'The correct dead and live testing order per GN3. Know which instrument to use for each test.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'The prove-test-prove method using your voltage indicator and proving unit.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'How to use the IR function on your MFT. Test voltages, minimum values, and troubleshooting low readings.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated test results, instrument details, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description:
      'Zs verification, cable sizing, voltage drop, PFC, and dozens more. Verify your instrument readings on site.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TestInstrumentsGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-05-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Equipment Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Test Instruments: <span className="text-yellow-400">What You Need</span>
        </>
      }
      heroSubtitle="The complete guide to test instruments for UK electricians. Multifunction tester, clamp meter, proving unit, socket tester, PAT tester, and calibration requirements. What to buy, what it costs, and how to stay compliant."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Record instrument details on every certificate automatically"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Instrument details, calibration dates, and auto-validated test results. 7-day free trial, cancel anytime."
    />
  );
}
