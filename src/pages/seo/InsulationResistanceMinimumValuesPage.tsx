import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Gauge,
  Activity,
  Zap,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  ThermometerSun,
  Ruler,
  Search,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Insulation Resistance Minimum Values | BS 7671 Guide';
const PAGE_DESCRIPTION =
  'Complete guide to insulation resistance minimum values per BS 7671 Table 61. 1 megohm minimum, test voltage by circuit voltage, what affects readings, troubleshooting low IR values. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Insulation Resistance Minimum Values',
    href: '/guides/insulation-resistance-minimum-values',
  },
];

const tocItems = [
  { id: 'what-is-insulation-resistance', label: 'What Is Insulation Resistance?' },
  { id: 'minimum-values', label: 'Minimum Values (Table 61)' },
  { id: 'test-voltage-by-circuit', label: 'Test Voltage by Circuit Voltage' },
  { id: 'one-megohm-rule', label: 'The 1 Megohm Minimum' },
  { id: 'what-affects-readings', label: 'What Affects IR Readings' },
  { id: 'troubleshooting-low-ir', label: 'Troubleshooting Low IR Values' },
  { id: 'three-phase-testing', label: 'Three-Phase IR Testing' },
  { id: 'recording-results', label: 'Recording IR Results' },
  { id: 'elec-mate', label: 'IR Testing with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The minimum acceptable insulation resistance value per BS 7671 Table 61 is 1.0 megohm for all circuit voltages. Any reading below 1 megohm is a failure.',
  'The test voltage depends on the circuit voltage: 250V DC for SELV and PELV circuits (up to 50V), 500V DC for circuits up to and including 500V (standard 230V circuits), and 1000V DC for circuits above 500V.',
  'Insulation resistance readings are affected by temperature, humidity, cable age, contamination, and cable length. Hot, humid conditions give lower readings — always note the environmental conditions.',
  'Low IR readings can be caused by moisture ingress, damaged cable insulation, contaminated accessories, over-long cable runs, or connected equipment with low insulation resistance.',
  'Elec-Mate auto-validates every insulation resistance reading against the BS 7671 minimum of 1 megohm and flags any reading below this threshold instantly.',
];

const faqs = [
  {
    question: 'What is the minimum insulation resistance value per BS 7671?',
    answer:
      'The minimum insulation resistance value per BS 7671 Table 61 is 1.0 megohm (1 MΩ). This applies to all circuit voltages — whether you are testing a SELV circuit at 12V or a 400V three-phase circuit, the minimum acceptable insulation resistance is 1.0 megohm between all live conductors and earth, and between all live conductors. A reading below 1.0 megohm indicates a fault in the insulation and requires investigation. In practice, new installations typically produce readings of 200 megohms or higher — readings in the low single digits (1 to 10 megohms) warrant investigation even though they technically pass.',
  },
  {
    question: 'Why is the test voltage different for different circuit voltages?',
    answer:
      'The test voltage is scaled to the circuit voltage to apply a proportional stress to the insulation without exceeding what the insulation is rated for. A 500V DC test voltage is used for standard 230V circuits because this is approximately double the operating voltage, applying sufficient stress to detect weakened insulation without damaging insulation that is in good condition. For SELV and PELV circuits (up to 50V), a 250V DC test voltage is used because these circuits use lighter insulation rated for low voltages. For circuits above 500V, a 1000V DC test voltage is used to stress-test the heavier insulation used on higher-voltage cables. Using too high a test voltage on low-voltage-rated insulation could damage it; using too low a test voltage on high-voltage cables would not adequately stress-test the insulation.',
  },
  {
    question: 'What conductor combinations must I test for insulation resistance?',
    answer:
      'For insulation resistance testing, you must test between all live conductors connected together and earth (L+N to E), and between all live conductors (L to N). The first test (L+N to E) checks the insulation between the live conductors and the protective conductor/earthed metalwork. The second test (L to N) checks the insulation between the line and neutral conductors. For three-phase circuits, you must also test between all phase combinations: L1 to L2, L1 to L3, L2 to L3, and each phase to neutral. All tests must produce a reading of at least 1.0 megohm. Before testing, all loads must be disconnected, lamps removed or switched off, and electronic equipment disconnected to prevent damage from the DC test voltage.',
  },
  {
    question: 'Why are my insulation resistance readings lower on older installations?',
    answer:
      'Insulation resistance naturally decreases over time as cable insulation ages and degrades. The main factors that cause insulation to deteriorate with age are: heat (cables in warm environments or cables that have been overloaded accelerate insulation degradation), UV exposure (cables exposed to sunlight, especially PVC-sheathed cables in loft spaces near rooflights), chemical exposure (cables in contact with chemicals, solvents, or certain types of expanded polystyrene insulation), and mechanical damage (cables that have been nicked, kinked, or compressed during installation or subsequent building work). On an older installation, IR readings in the range of 2 to 50 megohms are common and still pass. Readings below 1 megohm require investigation.',
  },
  {
    question: 'Do I need to disconnect equipment before insulation resistance testing?',
    answer:
      'Yes. You must disconnect all equipment and loads from the circuit before carrying out insulation resistance testing. The 500V DC test voltage can damage or destroy sensitive electronic equipment including LED drivers, dimmer switches, PIR sensors, programmable thermostats, USB socket outlets, and any equipment with electronic control circuits. Lamps should be removed from their holders or the lighting circuit switched off. Disconnect equipment by removing plug-in leads from sockets, switching off fused spurs supplying fixed equipment, and removing connections from terminal blocks where necessary. If equipment cannot be disconnected, it must be excluded from the test — note this on the schedule of test results and test the rest of the circuit.',
  },
  {
    question: 'What does a reading of 0.00 megohms mean?',
    answer:
      'A reading of 0.00 megohms (zero insulation resistance) indicates a dead short circuit between the conductors being tested. This means there is a direct electrical connection between the conductors with negligible resistance — the insulation has completely failed at some point. Common causes include: cables that have been nailed or screwed through (the fixing has bridged the conductors), cables that have been damaged by rodents (exposed conductors are touching), water ingress into a junction box or accessory causing a conductive path, and manufacturing defects in cables or accessories. A 0.00 reading requires immediate investigation — the circuit must not be energised until the fault is found and rectified.',
  },
  {
    question: 'How does cable length affect insulation resistance readings?',
    answer:
      'Insulation resistance decreases with cable length because the total leakage path is proportional to the surface area of the insulation, which increases with length. Think of it as many small leakage resistances in parallel — each metre of cable adds another parallel leakage path, reducing the overall measured resistance. For short circuits (under 20 metres), this effect is negligible. For long cable runs (50+ metres), it can reduce readings significantly. As a rough guide, halving the cable length doubles the IR reading. This is why very long circuits on commercial or industrial installations may produce lower IR readings than short domestic circuits — it does not necessarily indicate a fault, just a longer cable run. However, readings below 1 megohm still fail regardless of cable length.',
  },
];

const sections = [
  {
    id: 'what-is-insulation-resistance',
    heading: 'What Is Insulation Resistance?',
    content: (
      <>
        <p>
          Insulation resistance (IR) is a measurement of how effectively the insulation material
          around electrical conductors prevents current leakage between them. In a perfect cable,
          the insulation would have infinite resistance — no current would leak between conductors.
          In practice, all insulation materials allow a tiny amount of leakage current, and this
          leakage increases as the insulation ages, gets damaged, or is exposed to moisture and
          contaminants.
        </p>
        <p>
          The insulation resistance test applies a DC voltage between the conductors and measures
          the resulting leakage current. From Ohm's law (R = V/I), the instrument calculates the
          insulation resistance in megohms (MΩ). A high reading indicates good insulation; a low
          reading indicates that the insulation is compromised and current is leaking.
        </p>
        <p>
          Insulation resistance testing is test number two in the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 testing sequence
          </SEOInternalLink>
          , carried out after{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">
            continuity testing
          </SEOInternalLink>{' '}
          and before live tests. It is performed with the circuit de-energised and all loads
          disconnected.
        </p>
      </>
    ),
  },
  {
    id: 'minimum-values',
    heading: 'Minimum Values — BS 7671 Table 61',
    content: (
      <>
        <p>
          BS 7671 Table 61 (Table 61.1 in the 18th Edition) sets out the minimum insulation
          resistance values. The table is straightforward:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            BS 7671 Table 61 — Minimum Insulation Resistance Values
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <Ruler className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-bold">
                    SELV and PELV circuits (nominal voltage up to and including 50V)
                  </p>
                  <p className="text-white text-sm mt-1">
                    Test voltage: <strong className="text-yellow-400">250V DC</strong> | Minimum IR:{' '}
                    <strong className="text-yellow-400">0.5 MΩ</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <Ruler className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-bold">
                    Up to and including 500V (e.g. standard 230V and 400V circuits)
                  </p>
                  <p className="text-white text-sm mt-1">
                    Test voltage: <strong className="text-yellow-400">500V DC</strong> | Minimum IR:{' '}
                    <strong className="text-yellow-400">1.0 MΩ</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <Ruler className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-bold">Above 500V</p>
                  <p className="text-white text-sm mt-1">
                    Test voltage: <strong className="text-yellow-400">1000V DC</strong> | Minimum
                    IR: <strong className="text-yellow-400">1.0 MΩ</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          Note that the minimum for SELV/PELV circuits is 0.5 MΩ, but for all standard circuits
          (230V and 400V), the minimum is 1.0 MΩ. In everyday domestic and commercial testing, you
          will almost always be testing at 500V DC with a minimum of 1.0 MΩ.
        </p>
      </>
    ),
  },
  {
    id: 'test-voltage-by-circuit',
    heading: 'Test Voltage by Circuit Voltage',
    content: (
      <>
        <p>
          Selecting the correct test voltage is critical. Using too high a test voltage on a circuit
          rated for lower voltages can damage the insulation. Using too low a test voltage will not
          adequately stress-test the insulation and may miss defects.
        </p>
        <p>
          For standard domestic and commercial work in the UK, the vast majority of circuits operate
          at 230V single-phase or 400V three-phase. These all fall in the "up to and including 500V"
          category and are tested at 500V DC.
        </p>
        <p>
          SELV (Separated Extra-Low Voltage) and PELV (Protective Extra-Low Voltage) circuits are
          tested at 250V DC. These include doorbell transformers, LED strip driver outputs, garden
          lighting transformers, and bathroom shaver socket SELV supplies. Always check the circuit
          voltage before selecting the test voltage on your MFT.
        </p>
        <p>
          Before testing, ensure all electronic equipment is disconnected. The DC test voltage can
          damage LED drivers, dimmer modules, PIR sensors, smart thermostats, USB sockets, and
          similar electronic devices. Remove these from the circuit or isolate them before testing.
        </p>
        <SEOAppBridge
          title="Auto-validates every IR reading on site"
          description="Enter your insulation resistance reading into Elec-Mate and the app instantly validates it against the BS 7671 minimum of 1 MΩ. Any reading below the threshold is flagged in red. The test voltage is recorded alongside the result on the schedule of tests."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'one-megohm-rule',
    heading: 'The 1 Megohm Minimum',
    content: (
      <>
        <p>
          The 1 megohm minimum is the absolute floor for insulation resistance on standard circuits.
          Any reading of 0.99 MΩ or below is a fail. However, treating 1 megohm as a "target" would
          be a mistake — it is the minimum acceptable value, not a good value.
        </p>
        <p>
          For context, new PVC-insulated cable typically produces insulation resistance readings of
          200 MΩ or higher per circuit. A brand-new installation that produces readings of only 2 or
          3 megohms would technically pass but should raise serious questions about the quality of
          the installation. Similarly, an existing installation that has dropped from 50 MΩ at the
          last EICR to 2 MΩ at this one shows a significant trend of deterioration that warrants
          investigation even though the absolute value still passes.
        </p>
        <p>
          IET guidance recommends investigating any reading below 2 MΩ, even though the minimum is 1
          MΩ. A reading between 1 and 2 MΩ passes but indicates that the insulation is close to
          failure and may fail at the next periodic inspection. Recording this as a C3 (improvement
          recommended) on an EICR is common practice.
        </p>
      </>
    ),
  },
  {
    id: 'what-affects-readings',
    heading: 'What Affects Insulation Resistance Readings',
    content: (
      <>
        <p>
          Several factors affect insulation resistance readings beyond the actual condition of the
          cable insulation. Understanding these factors helps you interpret your results correctly
          and avoid false failures.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Temperature</h3>
                <p className="text-white text-sm leading-relaxed">
                  Insulation resistance decreases as temperature increases. For every 10 degrees
                  Celsius rise in temperature, IR approximately halves. Testing on a hot summer day
                  will give lower readings than testing in winter. Always record the ambient
                  temperature alongside your IR results.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Humidity and Moisture</h3>
                <p className="text-white text-sm leading-relaxed">
                  High humidity and moisture reduce IR readings. Water is a conductor — even small
                  amounts of moisture on cable surfaces, in accessories, or in junction boxes can
                  create leakage paths that dramatically reduce the measured IR. Damp environments
                  (basements, bathrooms, outdoor installations) consistently produce lower readings.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Cable Length</h3>
                <p className="text-white text-sm leading-relaxed">
                  Longer cables produce lower IR readings because the total leakage surface area is
                  greater. Each metre of cable adds a parallel leakage path. Very long circuits
                  (100+ metres) may produce readings that appear low but are within expected values
                  for the cable length.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Connected Equipment</h3>
                <p className="text-white text-sm leading-relaxed">
                  Equipment left connected during testing can dramatically reduce IR readings.
                  Electronic devices often have surge protection components (MOVs, TVS diodes) that
                  have low insulation resistance by design. Always disconnect all loads before
                  testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'troubleshooting-low-ir',
    heading: 'Troubleshooting Low Insulation Resistance Values',
    content: (
      <>
        <p>
          When you get a low IR reading (below 2 MΩ), systematic troubleshooting is needed to
          identify the cause. The process involves progressively isolating sections of the circuit
          to narrow down where the fault is.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Troubleshooting Process</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1:</strong> Confirm all loads and equipment
                are disconnected. Re-test. If the reading improves, a connected device was the
                cause.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2:</strong> Disconnect the circuit at the
                midpoint (or at junction boxes). Test each half separately. This halves the problem
                — the low-reading half contains the fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 3:</strong> Continue subdividing the faulty
                section until you isolate the specific cable run, junction box, or accessory causing
                the low reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 4:</strong> Inspect the faulty section
                visually — look for moisture, physical damage, scorching, contamination, or
                deteriorated insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 5:</strong> Rectify the fault (replace
                damaged cable, dry out moisture, replace contaminated accessories) and re-test the
                complete circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common causes of low IR include: water ingress into buried or concealed cables (especially
          after heavy rain or plumbing leaks), nails or screws through cables behind plasterboard,
          rodent damage to cable insulation, thermal degradation in overheated cable runs (behind
          radiators, in insulated ceiling voids), and deteriorated rubber insulation on pre-1970
          wiring systems.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-testing',
    heading: 'Three-Phase Insulation Resistance Testing',
    content: (
      <>
        <p>
          Three-phase circuits require additional conductor combinations to be tested. As well as
          the standard all-live-to-earth and live-to-live tests, you must test between each phase
          combination.
        </p>
        <p>
          The full set of tests for a three-phase, four-wire circuit is: L1+L2+L3+N to E (all live
          conductors to earth), L1 to L2, L1 to L3, L2 to L3, L1 to N, L2 to N, L3 to N. All
          readings must be at least 1.0 MΩ. In practice, many electricians use the "all connected
          together" method — connect all live conductors together and test to earth in one go, then
          separate them and test between each pair. The first test confirms the cable-to-earth
          insulation; the individual tests confirm the inter-conductor insulation.
        </p>
        <p>
          For three-phase motors, the motor windings themselves have their own insulation resistance
          that is tested separately from the cable. Motor winding IR testing is beyond the scope of
          standard BS 7671 testing and is covered by BS EN 60034-1. However, if a three-phase
          circuit feeding a motor produces a low IR reading, disconnecting the motor and re-testing
          will clarify whether the problem is in the cable or the motor.
        </p>
        <p>
          For more on testing{' '}
          <SEOInternalLink href="/guides/testing-three-phase-installation">
            three-phase installations
          </SEOInternalLink>
          , see our dedicated three-phase testing guide.
        </p>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Insulation Resistance Results',
    content: (
      <>
        <p>
          Insulation resistance results are recorded on the schedule of test results on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. For each circuit,
          record the IR value in megohms, the test voltage used (250V, 500V, or 1000V), and the
          conductor combination tested.
        </p>
        <p>
          Where the instrument displays a reading greater than its maximum range (e.g., "&gt; 200
          MΩ" or "&gt; 999 MΩ"), record the value as shown — for example, "&gt; 200" in the IR
          column. This indicates excellent insulation. Do not record it as "pass" or "OK" — the
          actual value (or the maximum displayed value) must be recorded.
        </p>
        <p>
          If any circuit produces a reading below 1.0 MΩ, the circuit fails and the fault must be
          investigated and rectified. On an EICR, a failing IR reading is recorded as an observation
          with the appropriate{' '}
          <SEOInternalLink href="/guides/bs7671-observation-codes">
            observation code
          </SEOInternalLink>
          . On an EIC, the certificate should not be issued until the insulation fault is rectified.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Insulation Resistance Testing with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate auto-validates every insulation resistance reading as you enter it. Any reading
          below 1.0 MΩ is flagged immediately in the schedule of tests, and the app prompts you to
          record an observation with the appropriate code. Readings between 1 and 2 MΩ trigger a
          warning suggesting further investigation.
        </p>
        <SEOAppBridge
          title="Instant IR validation on site"
          description="Enter your insulation resistance readings and Elec-Mate validates each one against the BS 7671 minimum of 1 MΩ. Failures are flagged in red. Borderline readings (1-2 MΩ) get an amber warning. Voice entry lets you speak results while holding your test probes."
          icon={Gauge}
        />
        <p>
          The app records the test voltage alongside each IR value and includes the{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            complete schedule of tests
          </SEOInternalLink>{' '}
          with auto-validated IR, R1+R2, Zs, and RCD results — all cross-referenced against BS 7671
          limits for the protective device on each circuit.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'Full IR testing procedure — how to perform the test, conductor combinations, equipment disconnection.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'Test number one in the sequence. R1+R2 measurement, long lead method, ring circuit testing.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3. IR testing is test number two.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-three-phase-installation',
    title: 'Testing Three-Phase Installations',
    description:
      'IR testing on three-phase circuits, plus phase rotation, loop impedance, and PFC on all phases.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated IR results, observation codes, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description:
      'Zs verification, cable sizing, voltage drop, PFC, and dozens more. All built to BS 7671.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InsulationResistanceMinimumValuesPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-03-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Insulation Resistance Minimum Values:{' '}
          <span className="text-yellow-400">BS 7671 Guide</span>
        </>
      }
      heroSubtitle="Complete guide to insulation resistance minimum values per BS 7671 Table 61. The 1 megohm minimum, test voltage selection by circuit voltage, factors that affect IR readings, and how to troubleshoot low values."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Auto-validate every IR reading on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Instant BS 7671 validation for insulation resistance, Zs, R1+R2, and RCD results. 7-day free trial, cancel anytime."
    />
  );
}
