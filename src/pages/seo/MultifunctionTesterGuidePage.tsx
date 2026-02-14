import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  Zap,
  Activity,
  FileCheck2,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Settings,
  ShieldCheck,
  GraduationCap,
  Mic,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Multifunction Tester', href: '/guides/multifunction-tester-guide' },
];

const tocItems = [
  { id: 'what-is-mft', label: 'What Is a Multifunction Tester?' },
  { id: 'test-modes', label: 'Test Modes Explained' },
  { id: 'lead-connections', label: 'Lead Connections for Each Test' },
  { id: 'common-instruments', label: 'Common MFT Instruments' },
  { id: 'calibration', label: 'Calibration and Accuracy' },
  { id: 'test-procedures', label: 'Test Procedures with an MFT' },
  { id: 'tips-for-efficiency', label: 'Tips for Faster Testing' },
  { id: 'recording-with-elecmate', label: 'Recording Results with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A multifunction tester (MFT) combines continuity, insulation resistance, earth fault loop impedance, RCD, and prospective fault current testing in one instrument.',
  'Lead connections change between test modes — using the wrong terminals is the most common cause of incorrect readings and blown fuses inside the instrument.',
  'Calibration must be current (typically every 12 months) for test results to be accepted on EICR and EIC certificates.',
  'Modern MFTs from Megger, Fluke, Metrel, and Kewtech cover all tests required by BS 7671 Chapter 61 for initial verification and periodic inspection.',
  'Elec-Mate pairs with your MFT workflow — speak your readings as you test and the schedule of test results fills in automatically.',
];

const faqs = [
  {
    question: 'Which multifunction tester should I buy?',
    answer:
      'The best MFT depends on your budget and the work you do. The Megger MFT1741 and MFT1845 are the most widely used in the UK and are the instruments most training centres use for C&G 2391 courses. The Fluke 1664 FC offers Bluetooth connectivity for wireless data transfer. The Metrel MI 3152 EurotestXC is popular in commercial and industrial settings. The Kewtech KT65DL is a cost-effective option for domestic electricians. All of these instruments cover the core tests required by BS 7671: continuity, insulation resistance, earth fault loop impedance, RCD, and prospective fault current. When choosing, consider: test speed (some instruments measure Zs and PSCC in a single test), display readability in bright sunlight, battery life on a full day of testing, lead quality and connection reliability, and whether the instrument comes with a calibration certificate. Expect to pay between £500 and £1,200 for a quality MFT. Buying second-hand is fine as long as the instrument is in good condition and has a current calibration certificate.',
  },
  {
    question: 'How often does my MFT need calibrating?',
    answer:
      'The standard recommendation is annual calibration — every 12 months. This is not a legal requirement, but it is a requirement of most competent person schemes (NICEIC, NAPIT, ELECSA) and is expected by scheme assessors when they review your test equipment. If your calibration has lapsed, any test results recorded with that instrument may be challenged. The calibration certificate should show the date of calibration, the next due date, the serial number of the instrument, and confirmation that the instrument meets its published accuracy specifications. Calibration can be done by the instrument manufacturer (Megger, Fluke, etc.) or by an accredited calibration laboratory. The cost is typically £60 to £120 depending on the instrument and turnaround time. Some suppliers offer calibration with a loan instrument while yours is being calibrated. Keep your calibration certificate with your instrument — you may need to show it to the client, the scheme assessor, or the local authority building control.',
  },
  {
    question: 'What are the correct lead connections for insulation resistance testing?',
    answer:
      'For insulation resistance testing on most MFTs, connect one lead to the LINE terminal and the other to the EARTH terminal on the instrument. On the circuit side, connect between line and earth, between neutral and earth, and between line and neutral (with the neutral link removed at the board or with all loads disconnected). The test voltage is 500 V DC for standard circuits (230 V / 400 V installations), 250 V DC for SELV/PELV circuits, and 1000 V DC for circuits operating above 500 V. Before testing, ensure all loads are disconnected, all electronic devices are removed or bypassed, all switches are on, and all lamps are removed from their holders (or the lamp circuits are isolated). The 500 V DC test voltage can damage electronic equipment — dimmers, USB sockets, smart switches, and smoke detectors must be disconnected. On a Megger MFT, select the insulation resistance mode (the omega symbol with the arrow) and choose the correct test voltage.',
  },
  {
    question: 'Why does my MFT give different Zs readings each time I test?',
    answer:
      'Slight variation in earth fault loop impedance readings between tests is normal and expected. The main causes are: supply voltage fluctuation (the mains voltage varies throughout the day as load changes), temperature changes in cable conductors (resistance increases with temperature), contact resistance at the test point (dirty or corroded socket contacts), and measurement noise from other loads on the supply. Modern MFTs use averaging and noise-rejection algorithms to minimise variation, but readings can still differ by 5 to 10% between consecutive tests. This is why BS 7671 applies a correction factor (Rule of Thumb: measured Zs must be less than 80% of the maximum tabulated value) to account for temperature rise from ambient to operating temperature. If your readings vary by more than 10%, check the test lead connections, clean the socket contacts, and try testing at a different time of day. If the readings are consistently erratic, the instrument may need calibration or the leads may be damaged.',
  },
  {
    question: 'Can I use my MFT to test earth electrodes?',
    answer:
      'Most multifunction testers include a basic earth electrode test mode, but it performs a simplified 2-wire measurement rather than the full 3-wire fall of potential method required by BS 7671 for accurate electrode resistance measurement. The 2-wire mode on an MFT measures the combined resistance of the electrode under test and the test spike, which can overestimate the true electrode resistance. For commissioning a new TT installation or investigating a problem, you need a dedicated earth electrode tester (such as the Megger DET4TC2 or Fluke 1625-2) that performs the proper 3-wire fall of potential measurement. However, the MFT earth electrode mode can be useful for quick verification checks on existing TT systems during periodic inspections, provided you understand its limitations. See the earth electrode testing guide for the full fall of potential procedure.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The full dead and live test sequence for initial verification and periodic inspection.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'How to measure R1+R2 values and what the readings mean for fault protection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'Performing IR tests at 500 V DC and interpreting minimum megohm values.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description: 'Understanding Zs values, maximum permitted values, and disconnection times.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete digital EICR certificates with voice test entry and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-mft',
    heading: 'What Is a Multifunction Tester?',
    content: (
      <>
        <p>
          A multifunction tester (MFT) is the primary instrument used by electricians for testing
          electrical installations in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>. It
          combines multiple test functions into a single handheld instrument, replacing the need to
          carry separate instruments for each type of test.
        </p>
        <p>
          A typical MFT can perform the following tests: continuity of protective conductors
          (R1+R2), insulation resistance (IR), earth fault loop impedance (Zs and Ze), prospective
          fault current (PSCC and PEFC), RCD trip time and trip current, and polarity verification.
          Some models also include earth electrode resistance testing, phase sequence indication,
          and voltage measurement.
        </p>
        <p>
          The MFT is essential for both{' '}
          <SEOInternalLink href="/guides/dead-vs-live-testing">
            dead and live testing
          </SEOInternalLink>
          . Continuity and insulation resistance are dead tests (performed with the supply
          isolated), while Zs, PSCC, and RCD testing are live tests (performed with the supply
          energised). The instrument switches between modes, and the lead connections may change
          depending on the test being performed.
        </p>
        <p>
          For anyone preparing for the{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">C&G 2391</SEOInternalLink> inspection and
          testing qualification, mastering the MFT is fundamental. The practical exam requires you
          to demonstrate competent use of a multifunction tester on a real installation.
        </p>
      </>
    ),
  },
  {
    id: 'test-modes',
    heading: 'Test Modes Explained',
    content: (
      <>
        <p>
          Every MFT has a mode selector — either a rotary dial or electronic menu — that switches
          between test functions. Understanding what each mode does and when to use it is essential.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Continuity (Low Resistance Ohmmeter)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measures resistance in ohms using a small DC test current (typically 200 mA). Used
                  for{' '}
                  <SEOInternalLink href="/guides/continuity-testing-r1-r2">
                    R1+R2 testing
                  </SEOInternalLink>
                  , ring circuit continuity, and bonding conductor continuity. Null the leads before
                  testing (short them together and press the null/zero button). Readings are
                  typically 0.01 to 2.0 ohms for most domestic circuits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Insulation Resistance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Applies a DC test voltage (250 V, 500 V, or 1000 V) and measures resistance in
                  megohms. Used for{' '}
                  <SEOInternalLink href="/guides/insulation-resistance-testing">
                    insulation resistance testing
                  </SEOInternalLink>{' '}
                  between conductors. Select 500 V for standard circuits. Minimum acceptable value
                  is 1.0 megohm. Disconnect all electronic equipment before testing — the high DC
                  voltage will damage dimmers, USB sockets, and smart devices.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Earth Fault Loop Impedance (Zs)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measures the total impedance of the earth fault loop at each circuit end-point.
                  This is a live test — the circuit must be energised. The MFT briefly draws a test
                  current and calculates impedance from the voltage drop. Some MFTs offer a
                  "no-trip" or "2-wire" Zs mode that avoids tripping RCDs during testing. The
                  measured value must be below the maximum Zs in BS 7671 Table 41.2/41.3/41.4 for
                  the protective device type and rating.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Prospective Fault Current (PFC)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Calculates the maximum fault current that would flow during a short circuit (PSCC)
                  or earth fault (PEFC). Measured at the origin of the installation. The MFT derives
                  PFC from its impedance measurements. The result must not exceed the breaking
                  capacity of the protective devices (typically 6 kA or 10 kA for domestic MCBs).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RCD Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Injects a calibrated earth leakage current and measures how long the RCD takes to
                  trip. Tests at x1 (rated current) and x5 (five times rated current). For a 30 mA
                  RCD: x1 = 30 mA (must trip within 300 ms), x5 = 150 mA (must trip within 40 ms).
                  Also includes a ramp test that gradually increases current until the RCD trips,
                  confirming the actual trip current.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'lead-connections',
    heading: 'Lead Connections for Each Test',
    content: (
      <>
        <p>
          One of the most common causes of incorrect readings (and blown instrument fuses) is using
          the wrong lead connections. The terminals on an MFT typically include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity testing:</strong> Use the dedicated continuity leads (usually red
                and black). Connect between the two conductors you are testing (for example, line at
                the board and CPC at the socket for R1+R2). Both leads go into the ohms/continuity
                terminals on the instrument.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance:</strong> Same terminals as continuity on most
                instruments, but the mode is switched to IR. Connect between the conductors being
                tested (line-earth, line-neutral, neutral-earth). Some MFTs have a guard terminal
                for noise rejection on long cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs):</strong> Use the mains test lead (a 3-pin
                plug lead or probe set). Connect to a socket outlet on the circuit under test. The
                instrument needs line, neutral, and earth connections to perform the measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing:</strong> Same mains test lead as Zs testing. Connect to a
                socket on the RCD-protected circuit. The instrument injects a controlled earth
                leakage current through the line-earth path and times the RCD trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective fault current:</strong> Same mains test lead as Zs. Measured at
                the origin of the installation (incoming supply point or main distribution board).
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white">
              <strong>Lead care:</strong> Always use leads that comply with GS38 requirements —
              fused, with shrouded probes and limited exposed conductor length. Check leads for
              damage before every use. Damaged or non-compliant leads are a safety hazard and a
              common reason for scheme assessment failures.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-instruments',
    heading: 'Common MFT Instruments Used in the UK',
    content: (
      <>
        <p>
          The UK market is dominated by a handful of trusted MFT manufacturers. Here are the most
          popular instruments and their key features:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Megger MFT1741 / MFT1845</h4>
                <p className="text-white text-sm leading-relaxed">
                  The industry standard in the UK. The MFT1741 is the most common instrument on C&G
                  2391 courses. The newer MFT1845 adds Bluetooth connectivity, faster test speeds,
                  and a colour display. Both cover all BS 7671 tests. Megger instruments are known
                  for robustness and reliability on site. Calibration is widely available through
                  Megger service centres and independent calibration labs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fluke 1664 FC</h4>
                <p className="text-white text-sm leading-relaxed">
                  Fluke's flagship MFT with wireless Bluetooth connectivity via Fluke Connect.
                  Allows wireless data logging and transfer to the Fluke Connect app. The 1664 FC is
                  popular with electricians who want to transfer test data digitally. It covers all
                  BS 7671 tests and includes automatic test sequencing. Known for excellent display
                  visibility in outdoor conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Metrel MI 3152 EurotestXC</h4>
                <p className="text-white text-sm leading-relaxed">
                  A feature-rich MFT popular in commercial and industrial environments. The MI 3152
                  includes automatic test sequencing, memory storage for test results, and PC
                  connectivity. It offers a wide range of test modes including line impedance, true
                  RMS voltage, and frequency measurement alongside the standard BS 7671 tests.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Kewtech KT65DL / KT66DL</h4>
                <p className="text-white text-sm leading-relaxed">
                  A cost-effective range from Kewtech that covers all BS 7671 test requirements. The
                  KT65DL is a popular entry-level MFT for domestic electricians. The KT66DL adds
                  Bluetooth and data logging. Kewtech instruments offer good value and are widely
                  available from UK electrical wholesalers. Calibration is available through
                  Kewtech's service centre.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Regardless of which instrument you use, the testing principles and procedures are
          identical. The instrument is a tool — what matters is that you understand the test, know
          the correct lead connections, and can interpret the results against BS 7671 requirements.
        </p>
      </>
    ),
  },
  {
    id: 'calibration',
    heading: 'Calibration: Why It Matters and When to Do It',
    content: (
      <>
        <p>
          Calibration confirms that your MFT is measuring accurately within its published
          specifications. An instrument that is out of calibration may give readings that are too
          high or too low — leading to circuits being passed that should fail, or circuits being
          failed that are actually compliant.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency:</strong> Calibrate every 12 months. This is the standard interval
                accepted by NICEIC, NAPIT, and other scheme providers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a drop or damage:</strong> If the instrument is dropped from height or
                shows signs of physical damage, have it recalibrated before using it for testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping:</strong> Keep the calibration certificate with the
                instrument. Record the calibration date and next due date on each certificate you
                issue. Scheme assessors will check this during periodic assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> Typically £60 to £120 depending on the instrument and
                turnaround time. Some suppliers offer express next-day calibration for an additional
                fee.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Calibration is performed by the instrument manufacturer or by an accredited laboratory
          (UKAS accredited is the gold standard). The calibration process involves testing the
          instrument against reference standards of known accuracy and adjusting or certifying that
          the readings fall within the instrument's specified tolerance.
        </p>
      </>
    ),
  },
  {
    id: 'test-procedures',
    heading: 'Test Procedures with an MFT',
    content: (
      <>
        <p>
          Here is how to perform the core tests using your MFT, following the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            BS 7671 test sequence
          </SEOInternalLink>
          :
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Null the continuity leads.</strong> Short the leads together, press the null
              button. The instrument stores the lead resistance and subtracts it from subsequent
              continuity readings.
            </li>
            <li>
              <strong>Continuity of R1+R2.</strong> Connect one lead to line at the distribution
              board, the other to the CPC at the furthest point on the circuit. Record the R1+R2
              value. Repeat for each circuit. See the{' '}
              <SEOInternalLink href="/guides/continuity-testing-r1-r2">
                R1+R2 continuity guide
              </SEOInternalLink>{' '}
              for the full method.
            </li>
            <li>
              <strong>Insulation resistance.</strong> Switch to IR mode, select 500 V DC. Test
              between line and earth, neutral and earth, and line and neutral. Minimum value is 1.0
              megohm. Disconnect electronic equipment first. See the{' '}
              <SEOInternalLink href="/guides/insulation-resistance-testing">
                insulation resistance guide
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Re-energise the circuit.</strong> After dead tests pass, restore the supply.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs).</strong> Switch to Zs mode. Connect the mains
              test lead to a socket on the circuit. Record the Zs reading. Compare against the
              maximum permitted value from BS 7671 tables (applying the 80% rule for temperature
              correction).
            </li>
            <li>
              <strong>RCD trip time.</strong> Switch to RCD mode. Select the correct RCD rating (30
              mA, 100 mA, 300 mA). Test at x1 and x5. Record the trip times. A 30 mA RCD must trip
              within 300 ms at x1 and within 40 ms at x5.
            </li>
            <li>
              <strong>Prospective fault current.</strong> Switch to PFC mode. Test at the origin of
              the installation. Record both PSCC and PEFC. Confirm the breaking capacity of the
              protective devices is adequate.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Speak your MFT readings into Elec-Mate"
          description="Probes in hand? Say 'Ring 1, R1+R2 0.32, insulation 200 meg, Zs 0.87, RCD 19 milliseconds' and the schedule of test results fills in automatically. No putting the instrument down to type."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'tips-for-efficiency',
    heading: 'Tips for Faster, More Efficient Testing',
    content: (
      <>
        <p>
          Testing speed directly affects profitability. A typical domestic EICR takes 2 to 4 hours
          on site — and most of that time is spent testing. Here are practical tips to work faster
          without cutting corners:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prepare your leads before arriving.</strong> Check leads for damage, null
                continuity leads, and confirm the instrument battery is charged. Running out of
                battery mid-test wastes time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do all dead tests on all circuits first, then all live tests.</strong>{' '}
                Switching between dead and live modes repeatedly wastes time changing leads.
                Isolate, do all continuity and IR tests across all circuits, then re-energise and do
                all Zs, RCD, and PFC tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use voice entry to record results as you go.</strong> The biggest time sink
                is putting the instrument down to write or type results. Speak them into Elec-Mate
                while your hands stay on the probes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photograph the board before testing.</strong> Use Elec-Mate's{' '}
                <SEOInternalLink href="/tools/eicr-certificate">AI board scanner</SEOInternalLink>{' '}
                to read circuit details from the consumer unit label. This pre-fills circuit
                descriptions on the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry spare fuses for your instrument.</strong> A blown instrument fuse
                mid-test is a common cause of wasted time. Keep HBC fuses in your test kit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-with-elecmate',
    heading: 'Recording MFT Results with Elec-Mate',
    content: (
      <>
        <p>
          The traditional workflow is: take a reading on the MFT, put the probes down, write the
          result on paper or type it into a phone, pick the probes back up, move to the next test.
          This cycle adds minutes to every circuit and hours to every job.
        </p>
        <p>
          Elec-Mate eliminates the bottleneck. With voice test entry, you speak your readings as you
          take them. The app understands electrical test terminology and populates the schedule of
          test results in real time. Here is how it works with your MFT:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Mic className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Say "Circuit 3, lighting, R1+R2 0.54, insulation 200 megohms" and the values
                  appear on the schedule. Say "Zs 1.12, RCD 22 milliseconds" and the live test
                  results populate alongside the dead test values. The app automatically compares
                  your readings against BS 7671 maximum values and flags failures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Defect Code Suggestion</h4>
                <p className="text-white text-sm leading-relaxed">
                  When a reading exceeds the maximum permitted value, the AI suggests the correct
                  observation code and the matching BS 7671 regulation. For example, a Zs reading
                  that exceeds the maximum for a B32 MCB would trigger a C2 suggestion with
                  Regulation 411.3.2 referenced. See the{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation codes guide
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Pair your MFT with Elec-Mate for faster certificates"
          description="Voice-enter test results as you work. AI flags failures and suggests observation codes. Export a professional EICR or EIC certificate before you leave site. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MultifunctionTesterGuidePage() {
  return (
    <GuideTemplate
      title="Multifunction Tester Guide | How to Use MFT"
      description="Complete guide to using a multifunction tester (MFT) for electrical testing. Test modes, lead connections, calibration, common instruments (Megger, Fluke, Kewtech), and step-by-step test procedures for BS 7671 compliance."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Multifunction Tester Guide:{' '}
          <span className="text-yellow-400">How to Use Your MFT for Every BS 7671 Test</span>
        </>
      }
      heroSubtitle="Your MFT is the most important instrument in your kit. It performs continuity, insulation resistance, earth fault loop impedance, RCD, and fault current tests — all from one device. This guide covers every test mode, the correct lead connections, calibration requirements, and how to record results efficiently."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Multifunction Testers"
      relatedPages={relatedPages}
      ctaHeading="Voice-Enter MFT Results into Your Certificate"
      ctaSubheading="Elec-Mate turns your MFT readings into professional EICR and EIC certificates. Voice entry, AI defect coding, and instant PDF export. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
