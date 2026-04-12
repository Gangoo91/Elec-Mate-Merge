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
  { label: 'Clamp Meter Guide', href: '/guides/clamp-meter-guide-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'What is a Clamp Meter?' },
  { id: 'ac-vs-dc', label: 'AC Clamp vs DC Clamp Meters' },
  { id: 'accuracy', label: 'Accuracy Considerations' },
  { id: 'when-to-use', label: 'When to Use a Clamp Meter' },
  { id: 'harmonics', label: 'Harmonic Assessment and Power Quality' },
  { id: 'leakage', label: 'Leakage Current Measurement' },
  { id: 'best-clamp-meters', label: 'Best Clamp Meters 2026' },
  { id: 'for-electricians', label: 'Using Elec-Mate with Your Clamp Meter' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A clamp meter measures current by induction — the jaws clamp around a conductor and detect the magnetic field produced by current flow. No circuit break is required, making it the safest and most practical tool for measuring live circuit currents.',
  'AC clamp meters work by electromagnetic induction and can only measure AC current directly. DC clamp meters use Hall-effect sensors and can measure both AC and DC current — essential for solar PV, EV charging, and battery storage work.',
  'Accuracy on clamp meters is typically ±2–3% of reading. At low currents (below 10% of full scale), accuracy degrades significantly. For low-current measurements, use a multimeter in series or a flexible Rogowski coil clamp.',
  'Clamp meters are the tool of choice for load measurement on live circuits, identifying unbalanced loads in three-phase systems, assessing harmonic distortion, and measuring leakage current for RCD pre-testing.',
  'The Fluke 376 FC and Megger DCM305E are the leading professional clamp meters for UK electrical installation and maintenance work in 2026.',
];

const faqs = [
  {
    question: 'Can a standard AC clamp meter measure DC current?',
    answer:
      'No. A standard AC clamp meter works by electromagnetic induction — it detects the changing magnetic field produced by an alternating current. DC current produces a static magnetic field that the inductive clamp jaw cannot detect. To measure DC current non-intrusively, you need a Hall-effect clamp meter (commonly called a DC clamp meter or AC/DC clamp meter). Hall-effect clamps contain a semiconductor sensor in the jaw gap that responds to both static and alternating magnetic fields. DC clamp capability is increasingly important as solar PV arrays, battery storage systems, EV chargers, and DC lighting circuits become more common in UK electrical installations.',
  },
  {
    question: 'How accurate is a clamp meter compared to a series ammeter?',
    answer:
      'Professional clamp meters achieve ±1.5–3% of reading accuracy under ideal conditions. However, clamp meter accuracy degrades at low currents — below 10% of the full-scale range, the reading may be unreliable. A 400A range clamp meter measuring 5A current may have errors of 10% or more. For accurate low-current measurements, use a multimeter in series (connecting it into the circuit) or use a clamp meter with a lower current range specifically suited to the measurement. Flexible Rogowski coil clamps offer excellent accuracy across a wide dynamic range and can clamp around irregularly shaped conductors or conductor bundles. For precision laboratory measurements, a series ammeter with calibration certification is required. For on-site electrical installation and maintenance work, a good clamp meter is entirely adequate.',
  },
  {
    question: 'What is harmonic current and why does it matter for electricians?',
    answer:
      'Harmonic currents are multiples of the fundamental supply frequency (50Hz in the UK). They are produced by non-linear loads — variable speed drives, UPS systems, LED drivers, and switch-mode power supplies — that draw current in pulses rather than as a smooth sine wave. These harmonic currents flow in the neutral conductor and can cause it to carry more current than any individual phase conductor — a particular hazard in three-phase systems where the neutral may be undersized. Harmonics also cause additional heating in cables and transformers, voltage distortion, nuisance tripping of RCDs, and interference with electronic equipment. A clamp meter with harmonic measurement capability (or a dedicated power quality analyser) can measure total harmonic distortion (THD) and the individual harmonic components. This information is required when sizing neutral conductors and when investigating overheating of cables or transformers in commercial buildings.',
  },
  {
    question: 'What is leakage current and how do I measure it with a clamp meter?',
    answer:
      'Leakage current (also called earth leakage or protective conductor current) is a small current that flows through the protective earth conductor or insulation of an electrical system under normal operating conditions. It arises from the capacitance of long cable runs, EMC filters in variable speed drives, and imperfect insulation. Excessive leakage current causes nuisance tripping of RCDs — the RCD detects the leakage current as an imbalance between line and neutral and trips unnecessarily. To measure leakage current with a clamp meter, you need a clamp with a low-current range — typically a 200mA or 40mA range. Clamp around all conductors of the circuit together (line and neutral in a single-phase circuit, or all three phases plus neutral in three-phase). The algebraic sum of currents in a healthy circuit is zero. Any imbalance displayed is the leakage current. Pre-testing leakage current before connecting a new RCD can confirm whether the protected circuits are likely to cause nuisance tripping.',
  },
  {
    question:
      'Can I use a clamp meter to measure the current in all conductors of a multi-core cable?',
    answer:
      'If you clamp around all conductors of a circuit together — line and neutral for single phase, or all three phases and neutral for three phase — the magnetic fields cancel and the meter reads approximately zero (any non-zero reading is leakage current, as described above). To measure the load current in a multi-core cable, you must either split the cable and clamp around individual conductors, or clamp around the cable where it splits into individual cores at a joint or termination. Some clamp meters come with clamp jaw adapters or flex-jaw probes to reach into tight termination boxes. Where cables cannot be physically separated, consider installing a temporary split-core current transformer on a single conductor during load measurements.',
  },
  {
    question: 'What is the Fluke 376 FC and is it worth the price?',
    answer:
      'The Fluke 376 FC is a CAT III 1000V / CAT IV 600V True RMS AC/DC clamp meter with Fluke Connect wireless data logging via Bluetooth. It measures AC current up to 1000A and DC current up to 1400A using a iFlex flexible Rogowski coil accessory. The iFlex accessory is particularly useful for clamping around large conductors or cables that are too large for the standard 40mm jaw. The FC (Fluke Connect) wireless logging allows you to record readings remotely on your phone — useful for load monitoring over time without attending site continuously. At approximately £350–£400, it is a significant investment but represents the leading professional tool for UK electricians who regularly work on three-phase industrial installations, HV/LV switchgear, or large distribution systems. For domestic and light commercial work, the Fluke 323 or 325 at half the price is entirely adequate.',
  },
  {
    question: 'How do I measure the current draw of a three-phase motor with a clamp meter?',
    answer:
      'Clamp the meter jaws around a single phase conductor (L1, L2, or L3 individually) at the motor terminal box or in the cable run near the motor. Record the current on each phase. For a balanced three-phase motor operating normally, all three phase currents should be within approximately 5% of each other. Significant imbalance (one phase carrying noticeably more or less current than the others) indicates a problem — either a supply imbalance, a winding fault, or a high-resistance connection on one phase. Also compare the measured current against the motor nameplate full-load current (FLC). Current significantly above FLC indicates overloading or a mechanical fault. Current significantly below FLC on a loaded motor may indicate a voltage imbalance causing the motor to draw more current on two phases and less on the affected phase.',
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
    href: '/guides/multifunction-tester-buying-guide',
    title: 'Multifunction Tester Buying Guide',
    description: 'Choose the right MFT for Zs, Rcd, insulation resistance, and continuity.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/how-to-test-insulation-resistance',
    title: 'How to Test Insulation Resistance',
    description: 'Step-by-step insulation resistance testing procedure for fixed wiring.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables correctly for any circuit — domestic, commercial, or industrial.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training covering all test instruments.',
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
    heading: 'What is a Clamp Meter and How Does It Work?',
    content: (
      <>
        <p>
          A clamp meter measures electrical current without breaking the circuit. The hinged jaw
          clamps around a single conductor, and the meter detects the magnetic field generated by
          current flowing through that conductor. By applying Faraday's law of electromagnetic
          induction, the meter converts the detected magnetic field into a current reading.
        </p>
        <p>
          The key advantage over a series ammeter (measuring current by inserting the meter into the
          circuit) is safety and convenience. There is no need to isolate the circuit, break a
          connection, or expose live terminals to insert test leads. The clamp meter jaws simply
          clip around the conductor in the cable run, at the circuit breaker termination, or at the
          motor terminal box.
        </p>
        <p>
          Clamp meters are indispensable for load measurement on live circuits, identifying
          overloaded circuits, assessing three-phase load balance, measuring harmonic distortion,
          and detecting leakage currents that cause nuisance RCD tripping. Combined with a standard
          multimeter for voltage and resistance measurements, the clamp meter completes the
          essential two-tool kit for electrical installation and maintenance work.
        </p>
      </>
    ),
  },
  {
    id: 'ac-vs-dc',
    heading: 'AC Clamp Meters vs DC Clamp Meters',
    content: (
      <>
        <p>
          The type of measurement technology inside the clamp jaw determines whether the meter can
          measure AC only, or both AC and DC:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AC Clamp (Inductive)</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Uses electromagnetic induction in the clamp jaw transformer core. The changing
              magnetic field produced by AC current induces a proportional current in the clamp jaw
              winding. Only works with alternating current — DC produces a static field that the
              inductive clamp cannot detect.
            </p>
            <p className="text-white text-sm leading-relaxed">
              Suitable for: mains circuit load measurement, three-phase current balance, motor
              current, neutral current.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AC/DC Clamp (Hall-Effect)</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              A Hall-effect semiconductor sensor in the jaw gap responds to both static (DC) and
              alternating (AC) magnetic fields. Measures true AC and DC current. Generally higher
              cost and requires zeroing (pressing the zero button with jaws open) before each DC
              measurement to cancel any residual offset.
            </p>
            <p className="text-white text-sm leading-relaxed">
              Essential for: solar PV DC current measurement, battery storage, EV charger DC
              circuits, DC motor drives, telecomms/data centre DC supplies.
            </p>
          </div>
        </div>
        <p>
          For UK electricians working exclusively on mains AC installations, an AC clamp meter is
          sufficient. For any work involving solar PV, battery storage, EV charging, or DC control
          circuits, an AC/DC Hall-effect clamp is required. Given the rapid growth of these
          technologies in UK electrical work, an AC/DC capable clamp is increasingly the recommended
          default purchase.
        </p>
      </>
    ),
  },
  {
    id: 'accuracy',
    heading: 'Accuracy Considerations for Clamp Meters',
    content: (
      <>
        <p>
          Clamp meter accuracy is more complex than multimeter accuracy because it is affected by
          conductor position within the jaw, jaw alignment, nearby magnetic fields, and the current
          level relative to the clamp's rated range.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor position:</strong> For best accuracy, centre the conductor in the
                jaw opening. Conductors pressed against the jaw wall can read 1–2% low. Modern
                professional clamp meters compensate for off-centre conductors using multiple
                sensors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Jaw gap:</strong> Ensure the jaw closes fully and cleanly. Any debris,
                paint, or damage to the jaw mating surfaces creates a gap in the magnetic circuit
                and reduces measurement accuracy. Keep jaw contact surfaces clean.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low-current accuracy:</strong> At currents below 10% of full scale, accuracy
                degrades significantly. A 400A range meter measuring 5A may have errors exceeding
                10%. Use a meter with an appropriate low-current range or place 10 turns of the
                conductor through the jaw and divide the reading by 10 (the conductor-turns method).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adjacent conductors:</strong> Strong magnetic fields from adjacent current-
                carrying conductors can add to the clamp's reading. Where possible, keep the
                measured conductor separated from other conductors by at least one conductor
                diameter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonics and waveform:</strong> Use a True RMS clamp meter for circuits
                with non-linear loads. Average-sensing clamps read incorrectly on distorted
                waveforms common in circuits feeding VSDs, LED drivers, and IT equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-use',
    heading: 'When to Use a Clamp Meter',
    content: (
      <>
        <p>
          The clamp meter is the correct tool for the following situations in electrical
          installation and maintenance work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load measurement on live circuits:</strong> Verify actual current draw
                against the design value. Identify overloaded circuits before they cause breaker
                trips or cable damage. Document actual loading for energy surveys.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase load balance:</strong> Measure current on each phase of a
                three-phase distribution board. Identify imbalanced loading and redistribute
                circuits to equalise phase currents and reduce neutral current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor starting current:</strong> Many clamp meters have a peak hold function
                that captures the brief but high starting current of an induction motor. Useful for
                verifying motor starter settings and checking for locked-rotor conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral current in three-phase systems:</strong> In a system with
                significant harmonic loading, the neutral conductor may carry current exceeding the
                phase conductors. Clamp the neutral to verify it is not overloaded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth/leakage current:</strong> Clamp around all circuit conductors together
                to measure imbalance (leakage current). Used for RCD pre-testing and investigating
                nuisance tripping. Requires a low-current clamp range (40mA or 200mA).
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Log clamp meter readings with AI assistance"
          description="Tell the Elec-Mate AI your clamp meter readings and circuit details. Get instant analysis of load imbalance, overloading risk, harmonic concerns, and recommended next steps."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'harmonics',
    heading: 'Harmonic Assessment and Power Quality',
    content: (
      <>
        <p>
          Harmonic assessment is increasingly important in UK commercial and industrial electrical
          installations. The proliferation of variable speed drives, LED lighting, UPS systems, and
          EV chargers creates significant harmonic currents that can cause cable overheating,
          neutral overloading, transformer heating, voltage distortion, and interference with
          sensitive electronic equipment.
        </p>
        <p>
          A clamp meter with harmonic measurement capability can display total harmonic distortion
          (THD) as a percentage of the fundamental, and some models display the individual harmonic
          components (3rd, 5th, 7th harmonic). Key indicators that a harmonic survey is warranted
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                Neutral conductor carrying current equal to or exceeding a phase conductor
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Unexplained overheating of cables, transformers, or distribution boards</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>RCDs tripping without apparent earth fault</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Distorted waveform visible on an oscilloscope or power quality analyser</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                Significant difference between average-sensing and True RMS current readings
                (indicating non-sinusoidal current)
              </span>
            </li>
          </ul>
        </div>
        <p>
          For detailed harmonic analysis, a dedicated power quality analyser (such as the Fluke 435
          or Megger MPQ2000) is required. The clamp meter provides a useful initial screening tool.
        </p>
      </>
    ),
  },
  {
    id: 'leakage',
    heading: 'Leakage Current Measurement — Pre-Testing for RCDs',
    content: (
      <>
        <p>
          Leakage current measurement with a clamp meter is a valuable technique before connecting a
          new RCD or investigating nuisance tripping of an existing RCD. The technique measures the
          imbalance between the line and neutral conductors in a single-phase circuit (or all phase
          conductors and neutral in three-phase).
        </p>
        <p>To measure leakage current:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              Select a clamp meter with a 40mA or 200mA range (standard current ranges are too
              coarse for leakage measurement).
            </li>
            <li>
              Clamp around all circuit conductors simultaneously — line and neutral for single
              phase; all three phases and neutral for three phase. Do NOT include the protective
              earth conductor.
            </li>
            <li>Energise the circuit with all connected loads switched on.</li>
            <li>
              Read the displayed current. In a perfectly balanced circuit this would be zero; in
              practice, values below 1mA are normal. Values above 5–10mA may cause a 30mA RCD to
              trip, particularly when the circuit also carries leakage from other sources.
            </li>
            <li>
              Identify and isolate individual loads to find the primary source of leakage if the
              total is excessive.
            </li>
          </ol>
        </div>
        <p>
          Type A RCDs (standard 30mA devices) detect sinusoidal AC leakage. Type F and Type B RCDs
          also detect pulsating DC and smooth DC leakage respectively — important for EV chargers
          and inverter-driven equipment where the leakage current may have DC components.
        </p>
      </>
    ),
  },
  {
    id: 'best-clamp-meters',
    heading: 'Best Clamp Meters for Electricians 2026',
    content: (
      <>
        <p>
          The professional clamp meter market in 2026 offers excellent options across the full price
          spectrum. Here are the top recommendations for UK electricians:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Fluke 376 FC</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Professional AC/DC Clamp — ~£350
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT III 1000V / CAT IV 600V. True RMS. AC/DC current to 1000A AC / 1400A DC (with
              iFlex Rogowski coil accessory). Fluke Connect Bluetooth wireless logging. Measures
              voltage, resistance, frequency, and capacitance in addition to current. The iFlex coil
              allows measurement on conductors too large for the standard 40mm jaw. The benchmark
              professional AC/DC clamp meter for UK electricians.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Megger DCM305E</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best UK Brand AC/DC Clamp — ~£200
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT III 600V / CAT IV 300V. True RMS. AC/DC current measurement. 1000A AC / 600A DC
              range. Inrush capture function for motor starting current. Large backlit display.
              Megger is a trusted UK test instrument brand with a strong service and calibration
              network. Excellent value for a full AC/DC professional clamp meter.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Fluke 323 / 325</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Value Professional AC Clamp — ~£100–£140
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT III 600V / CAT IV 300V. True RMS (325 model). AC current to 400A. Compact, robust,
              and straightforward. The 323 is average-sensing; spend slightly more for the 325 with
              True RMS. Ideal for domestic electricians who need current measurement as a secondary
              function alongside their multimeter. The go-to recommendation for first clamp meter
              purchase.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-1">UNI-T UT210E</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Budget Option — ~£35
            </p>
            <p className="text-white text-sm leading-relaxed">
              CAT III 300V. True RMS. AC/DC current to 100A. Surprisingly capable mini clamp meter
              at a fraction of professional prices. Suitable as a backup tool or for apprentices
              learning. The lower CAT rating (300V vs 600V) means it should not be used at main
              distribution board level — restrict use to sub-board and downstream circuit level.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Using Elec-Mate Alongside Your Clamp Meter',
    content: (
      <>
        <p>
          Clamp meter readings feed directly into the certification and fault analysis workflow that
          Elec-Mate supports:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Load Survey Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record clamp meter load measurements against circuit schedule entries in your{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> or EICR.
                  Document actual demand for distribution board design verification.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fault Finding with AI Analysis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Share your clamp meter readings with the Elec-Mate AI assistant. Describe the
                  symptoms and the measured currents on each phase. The AI provides structured
                  fault-finding analysis and recommended next steps.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Diversity and Load Calculations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use measured actual demand values in the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to verify cables are correctly rated. Actual measured current is more accurate
                  than calculated design current for existing installations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document load measurements and certify installations"
          description="Join 1,000+ UK electricians using Elec-Mate for load survey documentation, EIC and EICR certification, and AI fault-finding support. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ClampMeterGuideElectriciansPage() {
  return (
    <GuideTemplate
      title="Clamp Meter Guide for Electricians UK 2026 | AC vs DC, Accuracy, Best Meters"
      description="Complete clamp meter guide for UK electricians. AC vs DC clamp meters, accuracy considerations, harmonic assessment, leakage current measurement, and the best clamp meters in 2026 including Fluke 376 FC and Megger DCM305E."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tools & Equipment Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Clamp Meter Guide for Electricians:{' '}
          <span className="text-yellow-400">AC vs DC, Accuracy, and Best Meters 2026</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about clamp meters — how inductive and Hall-effect clamps work, accuracy limitations, harmonic assessment, leakage current pre-testing, and the best clamp meters for professional electrical work in 2026."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Clamp Meters for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Record Load Measurements and Certify Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for load survey documentation, EIC and EICR certificates, and AI fault-finding support on site. 7-day free trial, cancel anytime."
    />
  );
}
