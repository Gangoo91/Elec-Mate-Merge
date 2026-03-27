import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Calculator,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Multifunction Tester Buying Guide', href: '/guides/multifunction-tester-buying-guide' },
];

const tocItems = [
  { id: 'overview', label: 'What is a Multifunction Tester?' },
  { id: 'what-mft-measures', label: 'What an MFT Measures' },
  { id: 'cat-rating', label: 'CAT IV 300V Minimum Requirement' },
  { id: 'key-features', label: 'Key Features to Look For' },
  { id: 'best-mfts', label: 'Best MFTs for Electricians 2026' },
  { id: 'certification', label: 'MFT Calibration and Certification' },
  { id: 'for-electricians', label: 'Recording MFT Results with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A multifunction tester (MFT) is a single instrument that performs all the electrical tests required to complete an Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR) to BS 7671:2018+A3:2024.',
  'The five core MFT functions are: earth fault loop impedance (Zs and Ze), RCD test (trip time at 100%, 150%, and 500% of rated current), insulation resistance (250V, 500V, and 1000V DC), continuity (low-resistance ohmmeter), and prospective fault current (PFC).',
  'For distribution board testing, CAT IV 300V is the minimum safe rating. The measurement environment at a consumer unit includes CAT IV transients — using a CAT III instrument at the origin of the installation is unsafe.',
  'The Megger MFT1741, Fluke 1664 FC, Kewtech KT64 DL, and Metrel MI3102H are the leading MFTs for UK electricians in 2026, covering a range of budgets and capability levels.',
  'MFTs must be calibrated at least annually (or per the manufacturer recommendation) to maintain the accuracy required for BS 7671 compliance testing. A calibration certificate is required for legal defensibility of test results.',
];

const faqs = [
  {
    question: 'Do I need a separate insulation resistance tester (megger) if I have an MFT?',
    answer:
      'Not for standard domestic and commercial installation testing. A modern MFT includes an insulation resistance test function with selectable test voltages of 250V, 500V, and 1000V DC — sufficient for all fixed wiring insulation resistance tests required by BS 7671. The term "megger" refers generically to an insulation resistance tester (after the brand Megger that pioneered the instrument). A dedicated insulation resistance tester may be preferred for specialist applications — testing large motors, high-voltage cables, or transformer windings — where a wider voltage range (up to 5kV or 10kV) or higher resolution at very high resistance values is needed. For standard electrical installation verification work, the MFT insulation resistance function is entirely adequate.',
  },
  {
    question: 'What CAT rating do I need for testing at the consumer unit?',
    answer:
      'CAT IV 300V minimum. The consumer unit (or any measurement at the origin of the installation, including the meter tails and service head) is a CAT IV environment because it is directly connected to the incoming supply where the most severe transient overvoltages occur. CAT III 600V is appropriate for measurements within the building at fixed wiring level (distribution boards, circuits, motor terminals) but is not sufficient at the point of supply. Many older MFTs are rated CAT III 600V only — these should not be used for Ze (external earth fault loop impedance) measurements at the meter tails. Check the instrument CAT rating label before use. Professional MFTs from Megger, Kewtech, Fluke, and Metrel are all rated CAT IV 300V as standard.',
  },
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth fault loop impedance) is the impedance of the earth fault loop external to the installation — from the supply, through the earth return path of the distribution network, back to the source. Ze is measured at the origin of the installation, typically at the incoming terminals of the consumer unit with all circuits disconnected, or from the DNO supply fuse terminals with the permission of the DNO. Zs (earth fault loop impedance) is the total earth fault loop impedance at a specific point in the installation — Ze plus the impedance of the phase and protective conductors from the consumer unit to that point (R1 + R2). Zs is what determines whether a protective device will disconnect the circuit in the required time when an earth fault occurs. BS 7671 Table 41.2 gives maximum permitted Zs values for different protective devices and ratings.',
  },
  {
    question: 'What is the no-trip RCD test and when do I use it?',
    answer:
      'Some MFTs offer a no-trip RCD test function — it applies a test current below the RCD\'s tripping threshold (typically 50% of rated residual operating current) to verify that the RCD does not trip spuriously at half its rated current. This test is useful in situations where tripping the RCD would cause disruption — for example, when circuits supply refrigeration, medical equipment, or alarm systems that must remain energised. The no-trip test does NOT verify that the RCD will trip when required — it only confirms the RCD does not trip prematurely. A full trip test at 100% and 150% of rated current is still required to verify correct operation. The no-trip test is typically used as a preliminary check or for periodic verification of RCDs in sensitive applications between full trip tests.',
  },
  {
    question: 'Can I use an MFT to test RCBOs?',
    answer:
      'Yes. An RCBO (Residual Current Circuit Breaker with Overcurrent protection) combines the functions of an MCB and an RCD in a single device. It has a rated residual operating current (IΔn) and a rated trip time, exactly like a standalone RCD. The MFT RCD test function applies the test current and measures the trip time in the same way as for a standalone RCD. The RCBO trip time limits are the same as for equivalent RCDs — a general-purpose (non-time-delayed) 30mA RCBO at the distribution board must trip in ≤300ms at IΔn and ≤40ms at 5×IΔn.',
  },
  {
    question: 'What insulation resistance values are acceptable for fixed wiring?',
    answer:
      'BS 7671 Table 61 specifies minimum insulation resistance values. For circuits rated up to 500V (which includes all standard domestic and commercial mains circuits), the test voltage is 500V DC and the minimum insulation resistance is 1MΩ. In practice, new fixed wiring should show insulation resistance in the hundreds of megaohms or gigaohms range. Values between 1MΩ and 2MΩ indicate deteriorated insulation that should be investigated further. The 250V DC test voltage is used for circuits containing electronic components (SELV and PELV circuits, circuits with electronic dimmers) where 500V may damage the components — but the minimum acceptable insulation resistance remains 1MΩ at 250V. For circuits rated above 500V, the test voltage is 1000V DC with a minimum insulation resistance of 1MΩ.',
  },
  {
    question: 'How often does an MFT need to be calibrated?',
    answer:
      'Most MFT manufacturers recommend annual calibration. The calibration certificate provides traceability to national standards (UKAS accredited calibration in the UK) and confirms the instrument is measuring within its stated accuracy specification. An annual calibration cycle is the accepted industry norm for UK electrical testing instruments. If an instrument is dropped, submerged, or otherwise subjected to physical shock, it should be sent for calibration before further use — the calibration may have been disturbed. Keep the calibration certificate with the instrument or in your test record file. When your test results are used as evidence of compliance (for building control, insurance, or legal purposes), the calibration certificate provides essential corroboration that the measurements are reliable.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/multimeter-guide-electricians',
    title: 'Multimeter Guide for Electricians',
    description: 'CAT ratings, True RMS, and the best digital multimeters for professional use.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-test-insulation-resistance',
    title: 'How to Test Insulation Resistance',
    description: 'Step-by-step insulation resistance testing procedure for fixed wiring.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Condition reports with AI board scanning and schedule of test results.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Verify maximum Zs compliance using measured Ze and R1+R2 values.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured modules covering all MFT functions.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is a Multifunction Tester?',
    content: (
      <>
        <p>
          A multifunction tester (MFT) is the primary instrument for electrical installation testing
          in the UK. It combines all the measurement functions required by BS 7671:2018+A3:2024 into
          a single instrument: earth fault loop impedance, RCD testing, insulation resistance,
          continuity, and prospective fault current. Without an MFT, completing an Electrical
          Installation Certificate (EIC) or Electrical Installation Condition Report (EICR) to the
          required standard is not possible.
        </p>
        <p>
          Before MFTs became standard in the 1990s, electricians carried separate instruments for
          each test: a dedicated insulation resistance tester (the original "megger"), a loop
          impedance tester, and a separate continuity tester. The MFT consolidates these into one
          instrument — reducing the equipment carried to site and ensuring all tests are conducted
          with instruments of consistent calibration and quality.
        </p>
        <p>
          This guide covers what an MFT measures, the CAT rating requirements for safe use at
          distribution boards, key features to look for when buying, and the best MFTs available for
          UK electricians in 2026.
        </p>
      </>
    ),
  },
  {
    id: 'what-mft-measures',
    heading: 'What an MFT Measures: The Five Core Functions',
    content: (
      <>
        <p>
          A professional MFT performs five core measurement functions required for BS 7671
          installation verification and periodic inspection:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-5">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              1. Earth Fault Loop Impedance (Ze and Zs)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Ze (external loop impedance) is measured at the origin of the installation. Zs (total
              loop impedance) is measured at any point in the installation. Zs values must not exceed
              the maximum values in BS 7671 Table 41.2 for the protective device in the circuit.
              MFTs measure loop impedance by injecting a test current and measuring the resulting
              voltage drop — a live test performed with the circuit energised.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              2. RCD Test (Residual Current Device)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Tests RCD trip time at 50%, 100%, and 500% of the rated residual operating current
              (IΔn). A general-purpose 30mA RCD must trip in ≤300ms at IΔn and ≤40ms at 5×IΔn.
              The MFT injects a test current through the protected circuit and measures how long the
              RCD takes to trip. Many MFTs also offer a ramp test (gradually increasing current until
              trip) and a no-trip pre-test at 50% IΔn. Both positive and negative half-cycle tests
              are required for a complete RCD verification.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              3. Insulation Resistance
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Tests the resistance of cable insulation between live conductors (L-N) and between live
              conductors and earth (L-E, N-E). Performed on de-energised, isolated circuits with a DC
              test voltage of 250V, 500V, or 1000V depending on the circuit voltage rating and
              whether electronic components are connected. Minimum acceptable insulation resistance
              for 230V circuits is 1MΩ at 500V DC (BS 7671 Table 61).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              4. Continuity (Low-Resistance Ohmmeter)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Measures resistance of protective conductors, ring final circuit continuity (R1, Rn,
              R2 values), and bonding conductors. The MFT continuity function injects a test current
              of at least 200mA (per BS 7671) to ensure the reading reflects actual conductor
              resistance rather than oxide layer effects on connections. The null lead resistance
              can be zeroed before measurement.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-400" />
              5. Prospective Fault Current (PFC)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Calculates the prospective short-circuit current at the test point. Derived from the
              measured loop impedance. PFC values must not exceed the rated breaking capacity of the
              protective devices at the distribution board. Required for EIC completion and essential
              for verifying switchgear suitability in commercial and industrial installations.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cat-rating',
    heading: 'CAT IV 300V Minimum: Why It Matters for Distribution Board Testing',
    content: (
      <>
        <p>
          The CAT (Measurement Category) rating system defined in IEC 61010-1 specifies the transient
          overvoltage environment in which an instrument can safely operate. When testing at the
          consumer unit — particularly when measuring Ze at the origin of the installation — you are
          in a CAT IV environment.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT IV environment</strong> — measurements at the origin of the installation:
                meter tails, service head, the supply cable from the street. The most severe transient
                overvoltage environment in a building. A CAT IV 300V instrument must withstand a
                8kV transient. A CAT III 600V instrument must only withstand 6kV. Use a CAT III
                instrument at the service head and a severe transient may cause a catastrophic arc
                inside the instrument, potentially killing the operator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>All modern professional MFTs are CAT IV 300V rated</strong> — Megger,
                Kewtech, Metrel, and Fluke all rate their current MFT ranges at CAT IV 300V minimum.
                If you have an older instrument (pre-2010), check the label. If it is only rated
                CAT III, do not use it for Ze measurements at the origin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test lead CAT rating must also match</strong> — the test leads, probes, and
                any adapters used with the MFT must also be rated to at least CAT IV 300V. A CAT IV
                instrument used with CAT II test leads provides only CAT II protection. Always use
                manufacturer-supplied or rated third-party test leads.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'key-features',
    heading: 'Key Features to Look for When Buying an MFT',
    content: (
      <>
        <p>
          Beyond the core measurement functions and CAT rating, the following features distinguish
          a good professional MFT from a basic instrument:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Memory and data logging:</strong> Store test results in the instrument and
                download to PC via USB or Bluetooth. Essential for efficient certification — no
                manual transcription of readings. The Kewtech KT64 DL and Metrel MI3102H both offer
                memory with PC download.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-current continuity test:</strong> Minimum 200mA test current for
                continuity per BS 7671. Some budget instruments use a lower current that may give
                optimistic readings through poor connections. Check the specification carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low Zs measurement mode (2-wire or 3-wire):</strong> For accurately measuring
                loop impedance on circuits protected by RCDs, a 3-wire or no-trip loop test is
                needed. Standard 2-wire loop tests trip the RCD. Look for a "no-trip" or "2-wire
                loop" function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature compensation:</strong> Resistance measurements vary with
                temperature. An MFT with temperature compensation or the ability to enter conductor
                temperature allows correction of measured Zs values to the standard reference
                temperature (20°C), ensuring correct comparison against BS 7671 maximum Zs values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery life and charging:</strong> Long battery life and rechargeable battery
                (USB or mains) avoids the frustration of depleted batteries on site. The Megger
                MFT1741 has a rechargeable NiMH battery pack with USB charging capability.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'best-mfts',
    heading: 'Best Multifunction Testers for Electricians 2026',
    content: (
      <>
        <p>
          The UK MFT market in 2026 offers a clear hierarchy of instruments from capable budget
          options to full-featured professional instruments with wireless data logging:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Megger MFT1741</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Overall Professional MFT — ~£450
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT IV 300V / CAT III 600V. All five core functions plus ISOL (insulation) autosequence,
              PFC, and voltage/frequency measurement. Rechargeable NiMH battery with USB charging.
              500-reading memory with MFT-Link PC software. Bluetooth option available on MFT1741+.
              Megger is the original name in UK electrical testing — the MFT1741 is the industry
              benchmark for professional installation testing. 12-month manufacturer warranty with
              UKAS-accredited calibration available.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Fluke 1664 FC</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best for Wireless Logging — ~£600
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT IV 300V / CAT III 600V. All standard functions plus Fluke Connect wireless data
              logging via Bluetooth to the Fluke Connect app. The FC (Fluke Connect) system allows
              real-time sharing of test results with office staff and integration with Fluke's asset
              management platform. Ideal for electrical contractors who need to send test results
              to the office immediately. Large colour display with intuitive interface.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Kewtech KT64 DL</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Value with Data Logging — ~£320
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT IV 300V / CAT III 600V. All standard functions, 1000-reading memory, and USB data
              download. Kewtech is a well-regarded UK brand for test instruments. The KT64 DL
              provides excellent data logging capability at a more accessible price than Megger or
              Fluke equivalents. Compatible with Kewtech's Report Pro PC software for generating
              test reports. Solid choice for sole traders and small contractors.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Metrel MI3102H</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best for Advanced Users — ~£550
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT IV 300V / CAT III 600V. Full MFT functions plus advanced RCD testing (Type A, B,
              F, and S RCDs), power quality measurement, and Bluetooth. The MI3102H supports testing
              of the full range of modern RCD types encountered in commercial and industrial
              installations including EV charger Type B RCDs. The Metrel Eurolink PC software
              provides comprehensive report generation. Favoured by electrical testing specialists
              and inspection firms.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Enter MFT test results directly into your EIC or EICR"
          description="Elec-Mate's schedule of test results accepts Ze, Zs, RCD trip times, insulation resistance, and continuity readings. Voice entry on site, instant PDF certificate. No transcription errors."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'MFT Calibration and Certification',
    content: (
      <>
        <p>
          An MFT used for BS 7671 compliance testing must be calibrated at regular intervals. Annual
          calibration is the accepted industry norm. The calibration process verifies that each
          measurement function is within the manufacturer's stated accuracy specification, using
          reference standards traceable to national measurement standards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKAS-accredited calibration</strong> — the highest level of calibration
                traceability available in the UK. UKAS (United Kingdom Accreditation Service)
                accredits calibration laboratories to ISO/IEC 17025. A UKAS calibration certificate
                provides legally defensible evidence that the instrument was calibrated by a
                competent laboratory. Megger, Fluke, and Kewtech all offer UKAS calibration services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration interval:</strong> Most manufacturers recommend 12-month
                calibration. Some contractors calibrate every 6 months if the instrument is in heavy
                daily use or has been subjected to physical shock. Check the instrument's calibration
                due date before each job — an out-of-calibration instrument should not be used for
                compliance testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-shock calibration:</strong> If an MFT is dropped from height, submerged
                in water, or otherwise physically damaged, remove it from service immediately and send
                it for calibration before further use. Physical shock can shift the calibration of
                precision measurement circuits without any visible external damage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Recording MFT Results with Elec-Mate',
    content: (
      <>
        <p>
          The MFT produces the measurements. Elec-Mate provides the certification workflow to record,
          verify, and certify them professionally:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Schedule of Test Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter Ze, Zs, RCD trip times, insulation resistance, and continuity values into the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC schedule of test results
                  </SEOInternalLink>{' '}
                  on your phone. Voice entry allows hands-free recording while holding the MFT.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Zs Compliance Check</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate compares your measured Zs values against the BS 7671 Table 41.2 maximum
                  Zs for the protective device and current rating. Out-of-compliance circuits are
                  flagged immediately — before the certificate is issued.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Board Scanner with AI Recognition</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the distribution board and let the AI populate the circuit schedule
                  automatically — MCB ratings, types, and descriptions. Then add your MFT readings
                  to each circuit row. Cuts schedule completion time significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EIC and EICR certificates with MFT results on your phone"
          description="Join 430+ UK electricians using Elec-Mate for MFT result entry, automatic Zs compliance checking, and professional EIC and EICR certification. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MFTBuyingGuidePage() {
  return (
    <GuideTemplate
      title="Multifunction Tester Buying Guide UK 2026 | Best MFTs for Electricians"
      description="Complete guide to choosing a multifunction tester (MFT) for UK electricians. What an MFT measures, CAT IV rating requirements, key features, and the best MFTs in 2026 — Megger MFT1741, Fluke 1664 FC, Kewtech KT64 DL, and Metrel MI3102H."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tools & Equipment Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Multifunction Tester Buying Guide:{' '}
          <span className="text-yellow-400">Best MFTs for UK Electricians 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know before buying an MFT — what it measures, CAT IV safety rating requirements, key features, calibration, and the best multifunction testers for professional electrical installation testing in 2026."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Multifunction Testers"
      relatedPages={relatedPages}
      ctaHeading="Record MFT Test Results and Issue EIC Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to enter MFT readings into EIC and EICR schedules, auto-check Zs compliance, and generate professional certificates on site. 7-day free trial."
    />
  );
}
