import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Mic,
  Camera,
  Gauge,
  Activity,
  ThermometerSun,
  Cable,
  Search,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Insulation Resistance Testing | How to Test & Minimum Values';
const PAGE_DESCRIPTION =
  'Complete guide to insulation resistance testing for UK electricians. Test voltages, BS 7671 Table 61 minimum values (1 MΩ), conductor combinations (L-N, L-E, N-E), how to perform the test, typical good values, causes of low readings, three-phase testing. Record results digitally with Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Insulation Resistance Testing', href: '/guides/insulation-resistance-testing' },
];

const tocItems = [
  { id: 'what-is-ir', label: 'What Is Insulation Resistance?' },
  { id: 'test-voltage', label: 'Test Voltage & Minimum Values' },
  { id: 'how-to-test', label: 'How to Perform the Test' },
  { id: 'conductor-combinations', label: 'Conductor Combinations' },
  { id: 'typical-values', label: 'Typical Good Values' },
  { id: 'low-ir-causes', label: 'Causes of Low Insulation Resistance' },
  { id: 'three-phase', label: 'Three-Phase Testing' },
  { id: 'elec-mate', label: 'Record Results with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Insulation resistance measures the quality of insulation between conductors and earth — it confirms current cannot leak where it should not, preventing shock, fire, and nuisance RCD tripping.',
  'The standard test voltage for circuits up to 500 V (all domestic and most commercial installations) is 500 V DC, with a minimum acceptable reading of 1 MΩ per BS 7671 Table 61.',
  'You must test three conductor combinations: line-to-neutral (L-N), line-to-earth (L-E), and neutral-to-earth (N-E) — or link L+N together and test to earth as a combined first step.',
  'New installations should return readings of 200 MΩ or higher. Older wiring in good condition typically reads above 2 MΩ. Anything below 1 MΩ is a failure requiring investigation.',
  'Elec-Mate auto-validates insulation resistance readings against the 1 MΩ minimum and supports voice-to-test-results so you can speak values while holding probes on site.',
];

const faqs = [
  {
    question: 'What is the minimum insulation resistance value per BS 7671?',
    answer:
      'BS 7671 Table 61 specifies the minimum insulation resistance values based on the circuit voltage. For circuits operating at up to and including 500 V AC (which covers all standard domestic and commercial installations at 230 V single-phase and 400 V three-phase), the test voltage is 500 V DC and the minimum acceptable insulation resistance is 1.0 megohm (1 MΩ). For SELV and PELV circuits operating at up to 50 V, the test voltage is 250 V DC and the minimum is 0.5 MΩ. For circuits operating above 500 V, the test voltage is 1000 V DC and the minimum is 1.0 MΩ. In practice, a healthy circuit in good condition should return readings significantly higher than these minimums — new installations typically read 200 MΩ or more.',
  },
  {
    question: 'Why is insulation resistance tested with DC and not AC?',
    answer:
      'Insulation resistance must be tested using direct current (DC) because the test is designed to measure the true resistance of the insulating material, not capacitive or inductive effects. If alternating current (AC) were used, the capacitance between conductors and between conductors and earth would allow current to flow through the capacitive reactance, producing a misleadingly low reading that does not represent the actual condition of the insulation. With DC, once the initial charging current has subsided (typically within two to three seconds), only genuine leakage current through the insulation remains. This gives an accurate measurement of the insulation quality and its ability to prevent dangerous current leakage under normal operating conditions.',
  },
  {
    question: 'What should I do if the insulation resistance reading is below 1 MΩ?',
    answer:
      'A reading below 1 MΩ is a failure under BS 7671, but before condemning the circuit you should investigate systematically. First, ensure all equipment and accessories are disconnected — appliances, luminaires, LED drivers, dimmer switches, SPDs, and any electronic devices can reduce readings significantly by providing parallel leakage paths. If the reading is still low after full disconnection, split the circuit into sections by disconnecting at junction boxes or accessory positions. Test each section individually to isolate the fault location. Common causes include moisture ingress (particularly in outdoor or bathroom circuits), heat-damaged insulation near downlighters or immersion heaters, rodent damage, mechanically damaged cables from nails or screws, and aged PVC insulation that has become brittle. Once the faulty section is identified, inspect the cable visually before deciding whether to repair or replace.',
  },
  {
    question: 'Do I need to disconnect all equipment before testing insulation resistance?',
    answer:
      'Yes, you must disconnect all current-using equipment from the circuit before performing an insulation resistance test. The test applies a DC voltage of 250 V, 500 V, or 1000 V between conductors and between conductors and earth. This voltage can damage sensitive electronic equipment including LED drivers, dimmer switches, RCDs, SPDs (surge protective devices), PIR sensors, smart thermostats, EV charger controllers, and any equipment containing semiconductors. Furthermore, connected equipment provides parallel paths that reduce the measured insulation resistance, giving a falsely low reading that does not reflect the true condition of the cable insulation. Lamps should be removed or switches turned off. Two-way switching circuits should have switches positioned so that line and neutral are not connected through any lamp filament or LED driver. Failure to disconnect equipment is one of the most common causes of unnecessary low readings.',
  },
  {
    question: 'How do temperature and humidity affect insulation resistance readings?',
    answer:
      'Temperature and humidity have a significant effect on insulation resistance measurements. As a widely accepted rule of thumb, insulation resistance approximately halves for every 10 degrees Celsius increase in temperature. A cable that reads 200 MΩ at 20 degrees Celsius might read only 100 MΩ at 30 degrees Celsius. This occurs because higher temperatures increase the mobility of charge carriers within the insulating material, allowing more leakage current to flow. Humidity also reduces insulation resistance because moisture on cable surfaces and within terminations creates conductive leakage paths. If you obtain borderline readings on a hot or humid day, consider noting the conditions and retesting under more favourable circumstances before condemning the installation. BS 7671 does not specify temperature correction factors for insulation resistance, but experienced electricians always account for environmental conditions when interpreting results.',
  },
  {
    question:
      'What is the difference between insulation resistance testing and continuity testing?',
    answer:
      'These are fundamentally different tests that measure opposite properties. Continuity testing verifies that conductors are connected end-to-end with low resistance — it confirms that current CAN flow where it should (through the protective conductor, the line conductor, or the neutral conductor). Insulation resistance testing verifies that insulation is intact and current CANNOT flow where it should not (between live conductors and earth, or between line and neutral through the insulation). Continuity uses a low test voltage (typically 4 to 24 V DC) and measures resistance in milliohms or ohms — you want LOW readings indicating good connections. Insulation resistance uses a high test voltage (250 V, 500 V, or 1000 V DC) and measures resistance in megohms — you want HIGH readings indicating good insulation. Both tests are mandatory during initial verification and periodic inspection under BS 7671.',
  },
  {
    question: 'Can I test insulation resistance on a three-phase circuit?',
    answer:
      'Yes, three-phase circuits require insulation resistance testing between all conductor combinations. The standard approach is to first link all live conductors together (L1, L2, L3, and N) and test to earth — this checks all conductors to earth in a single measurement. If this combined test passes, you then test between individual conductors: L1-L2, L1-L3, L2-L3, L1-N, L2-N, and L3-N. This gives a total of seven tests for a full three-phase-and-neutral circuit. The same minimum value of 1 MΩ applies to each individual measurement. If the combined test fails, you must test each combination individually to identify which conductor pair has the fault. Three-phase motors and drives must be disconnected before testing, as they will provide parallel paths that reduce readings and could be damaged by the test voltage.',
  },
];

const howToSteps = [
  {
    name: 'Isolate the circuit and verify dead',
    text: 'Follow the safe isolation procedure per HSE GS 38. Identify the circuit at the distribution board, switch off and lock off the MCB or remove the fuse, and verify the circuit is dead at the point of work using a voltage indicator that has been proved before and after use. Safe isolation is mandatory before any insulation resistance testing.',
  },
  {
    name: 'Disconnect all equipment and accessories',
    text: 'Remove all lamps, disconnect appliances, and remove any electronic devices from the circuit. Disconnect SPDs, RCDs (if testing individual circuits), dimmer switches, and any equipment containing semiconductors — the 500 V DC test voltage can damage these components. For socket circuits, ensure nothing is plugged in. For lighting circuits, turn switches off to prevent testing through lamp filaments.',
  },
  {
    name: 'Select the correct test voltage on your instrument',
    text: 'Set your insulation resistance tester or multifunction tester to the correct test voltage: 250 V DC for SELV/PELV circuits (up to 50 V), 500 V DC for standard circuits up to and including 500 V (all domestic installations), or 1000 V DC for circuits above 500 V. The vast majority of testing uses 500 V DC.',
  },
  {
    name: 'Test between live conductors and earth (L+N to E)',
    text: 'Link all line and neutral conductors together at the distribution board. Connect one test lead to the linked L+N conductors and the other to the main earthing terminal or CPC. Apply the test voltage and hold until the reading stabilises (usually two to three seconds). The reading must be at least 1 MΩ. This checks for insulation breakdown between current-carrying conductors and the protective conductor.',
  },
  {
    name: 'Test between line and neutral (L to N)',
    text: 'Remove the link between line and neutral. Connect one test lead to the line conductor and the other to the neutral conductor. Apply the test and hold until stable. The reading must again be at least 1 MΩ. This checks for insulation breakdown between the two current-carrying conductors — a fault here would cause a short circuit under normal operation.',
  },
  {
    name: 'Record the results on the schedule of test results',
    text: 'Enter the measured insulation resistance values in megohms on the schedule of test results. Record the test voltage used and note ambient conditions. Elec-Mate automatically validates readings against BS 7671 Table 61 minimum values and highlights any failures. If a reading is below the minimum, record an observation with the appropriate classification code (C1, C2, or C3) on the EICR.',
  },
];

const sections = [
  {
    id: 'what-is-ir',
    heading: 'What Is Insulation Resistance?',
    content: (
      <>
        <p>
          Insulation resistance (IR) is the measure of how effectively the insulating material
          surrounding electrical conductors prevents current from leaking where it should not flow.
          Every cable in an electrical installation has conductors (copper or aluminium) surrounded
          by insulation (typically PVC or XLPE). The insulation resistance test verifies that this
          insulating material is in good condition and providing adequate separation between live
          conductors and earth, and between the live conductors themselves.
        </p>
        <p>
          When insulation deteriorates — through age, heat, moisture, mechanical damage, or chemical
          attack — current begins to leak through the insulation. This leakage current is dangerous
          for three reasons. First, it creates a risk of electric shock: if current leaks to the
          metallic enclosure of an appliance or accessory, anyone touching that metalwork could
          receive a shock. Second, leakage current generates heat at the point of insulation
          breakdown, which can ignite surrounding materials and cause fire. Third, persistent
          leakage causes nuisance tripping of{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCDs</SEOInternalLink>, disrupting
          the supply to the installation and frustrating occupants.
        </p>
        <p>
          Insulation resistance testing is mandatory during both initial verification (when a new
          installation or alteration is completed) and{' '}
          <SEOInternalLink href="/tools/eicr-certificate">periodic inspection</SEOInternalLink>{' '}
          (EICR). It is test number three in the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 testing sequence
          </SEOInternalLink>
          , carried out after continuity testing but before any live tests. The circuit must be
          de-energised and isolated before testing.
        </p>
      </>
    ),
  },
  {
    id: 'test-voltage',
    heading: 'Test Voltage and Minimum Values — BS 7671 Table 61',
    content: (
      <>
        <p>
          The test voltage and minimum acceptable insulation resistance value are specified in BS
          7671 Table 61, based on the nominal circuit voltage. Using the wrong test voltage produces
          invalid results and does not comply with the standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            BS 7671 Table 61 — Minimum Insulation Resistance
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">SELV/PELV (up to 50 V):</strong> Test at 250 V
                DC — minimum 0.5 MΩ. Used for separated extra-low voltage and protective extra-low
                voltage circuits such as bathroom shaver supplies, garden lighting transformers, and
                specialist ELV equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Up to 500 V (standard circuits):</strong> Test
                at 500 V DC — minimum 1.0 MΩ. This covers all standard domestic and commercial
                installations operating at 230 V single-phase and 400 V three-phase. This is the
                test voltage you will use for the vast majority of insulation resistance testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Above 500 V:</strong> Test at 1000 V DC —
                minimum 1.0 MΩ. Used for high-voltage distribution systems and certain industrial
                installations. Less common in everyday domestic work.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Important: 1 MΩ is the bare minimum</h4>
              <p className="text-white text-sm leading-relaxed">
                While 1 MΩ is the minimum pass value, a healthy new installation should typically
                return readings of 200 MΩ or higher. Readings between 2 MΩ and 10 MΩ, while
                technically above the minimum, suggest significant insulation deterioration and
                should be investigated. A reading that has dropped substantially since the last
                periodic inspection — even if still above 1 MΩ — may indicate progressive
                degradation.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Auto-validated insulation resistance readings"
          description="Enter your IR readings into Elec-Mate's schedule of tests and the app instantly validates them against BS 7671 Table 61 minimum values. Failures are highlighted automatically with the appropriate observation code. No need to memorise the table."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'how-to-test',
    heading: 'How to Perform an Insulation Resistance Test',
    content: (
      <>
        <p>
          Insulation resistance testing follows a specific procedure. Before starting, you must have
          completed{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          per HSE GS 38 — this is non-negotiable. The circuit must be de-energised, locked off with
          your personal padlock, and proved dead at the point of work with a voltage indicator that
          has been proved before and after use.
        </p>
        <p>
          Once the circuit is confirmed dead, disconnect all current-using equipment. This includes
          lamps, appliances, electronic devices, SPDs, dimmer switches, PIR sensors, LED drivers,
          and any equipment containing semiconductors. The 500 V DC test voltage can damage these
          components and connected equipment will provide parallel paths that give falsely low
          readings.
        </p>
        <p>
          Set your insulation resistance tester (or the insulation resistance function on your
          multifunction tester) to 500 V DC for standard circuits. Connect one test lead to the
          conductor under test and the other to the reference conductor (earth or the other live
          conductor). Apply the test voltage and hold until the reading stabilises — this usually
          takes two to three seconds as the cable capacitance charges. Record the stabilised reading
          in megohms.
        </p>
        <p>
          If the initial reading is low, wait for the cable capacitance to fully discharge before
          reconnecting or retesting. Large cable runs can store significant charge from the 500 V DC
          test voltage. Your instrument should have a discharge function — use it.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak values while holding probes"
          description="On site with probes in hand? Just speak: 'Ring 1, insulation resistance 200 meg.' Elec-Mate fills in the schedule of test results for you. Hands-free data entry designed for how electricians actually work."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'conductor-combinations',
    heading: 'Conductor Combinations to Test',
    content: (
      <>
        <p>
          Insulation resistance testing involves checking the insulation between specific conductor
          combinations. For a single-phase circuit, there are three possible combinations. In
          practice, the standard method combines two of these into a single measurement for
          efficiency.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">
                1
              </span>
              <h3 className="font-bold text-white text-lg">L+N Combined to Earth</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Link all line and neutral conductors together at the distribution board. Connect one
              test lead to the linked L+N and the other to the CPC or main earthing terminal. This
              single measurement checks for insulation breakdown between both current-carrying
              conductors and earth simultaneously. It detects faults such as cables pinched by
              fixings, moisture ingress at junction boxes, or heat damage near downlighters.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">
                2
              </span>
              <h3 className="font-bold text-white text-lg">Line to Neutral</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Remove the link between line and neutral. Connect one test lead to the line conductor
              and the other to the neutral conductor. This checks for insulation breakdown between
              the two current-carrying conductors — a fault here would cause a short circuit under
              normal operation. On two-way lighting circuits, position switches so that L and N are
              not connected through any lamp filament or LED driver.
            </p>
          </div>
        </div>
        <p>
          If the combined L+N to earth test gives a low reading, you must then separate the
          conductors and test line-to-earth (L-E) and neutral-to-earth (N-E) individually to
          identify which conductor has the fault. For{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            three-phase circuits
          </SEOInternalLink>
          , all live conductors (L1, L2, L3, N) should be linked together for the first test to
          earth, then individual conductor-to-conductor tests should be carried out: L1-L2, L1-L3,
          L2-L3, L1-N, L2-N, and L3-N.
        </p>
      </>
    ),
  },
  {
    id: 'typical-values',
    heading: 'Typical Good Values for Insulation Resistance',
    content: (
      <>
        <p>
          Understanding what constitutes a "good" reading — beyond simply meeting the 1 MΩ minimum —
          helps you assess the overall condition of an installation and identify circuits that may
          need attention in the future, even if they currently pass.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Insulation Resistance — Expected Readings by Installation Age
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Gauge className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">New installations (less than 5 years):</strong>{' '}
                Typically 200 MΩ or higher. Readings below 50 MΩ on a new installation should prompt
                investigation — they may indicate installation damage to cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  Established installations (5 to 25 years):
                </strong>{' '}
                Typically 20 MΩ to 200 MΩ depending on cable type, environment, and loading history.
                Readings in this range indicate insulation in good condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Older installations (over 25 years):</strong>{' '}
                Readings above 2 MΩ are typical for aged wiring in reasonable condition. PVC
                insulation degrades over decades, particularly in warm environments. Readings
                between 1 MΩ and 2 MΩ suggest monitoring is needed — the insulation is close to the
                failure threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Below 1 MΩ:</strong> Failure. The circuit must
                not be energised until the fault is identified and rectified. Investigate by
                splitting the circuit into sections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Trend analysis is valuable during periodic inspections. If a circuit read 150 MΩ five
          years ago and now reads 15 MΩ, the insulation is deteriorating rapidly even though both
          readings are above the minimum. This trend should be noted on the EICR as it may indicate
          an underlying problem such as persistent moisture ingress or overheating.
        </p>
      </>
    ),
  },
  {
    id: 'low-ir-causes',
    heading: 'Common Causes of Low Insulation Resistance',
    content: (
      <>
        <p>
          A low insulation resistance reading does not always mean the cable itself is permanently
          damaged. Understanding the common causes helps you troubleshoot efficiently and avoid
          unnecessary replacement work.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Moisture ingress</h3>
                <p className="text-white text-sm leading-relaxed">
                  Water in junction boxes, back boxes, or conduit systems is one of the most common
                  causes. Particularly prevalent in outdoor circuits, bathroom installations, and
                  circuits running through unheated spaces such as lofts or garages. Drying out the
                  affected area and resealing enclosures often restores acceptable readings.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Heat-damaged insulation</h3>
                <p className="text-white text-sm leading-relaxed">
                  Cables routed too close to recessed downlighters, immersion heaters, heating
                  pipes, or flue pipes can suffer insulation degradation. The PVC sheathing becomes
                  brittle, cracks, and may develop carbonised tracking paths. Common on older
                  lighting circuits with halogen downlighters.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Carbonised insulation</h3>
                <p className="text-white text-sm leading-relaxed">
                  Over time, insulation that has been subjected to persistent overheating or arcing
                  can become carbonised. Carbonised insulation is partially conductive, providing a
                  tracking path for leakage current. This is a serious fire risk and the cable must
                  be replaced — it cannot be repaired.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Mechanical damage to cables</h3>
                <p className="text-white text-sm leading-relaxed">
                  Nails, screws, or staples driven through cables during construction or DIY work.
                  The conductor may still function but the insulation is compromised, creating a
                  leakage path to earth through the metallic fixing. Rodent damage is also common in
                  loft and floor void installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Connected equipment not disconnected</h3>
                <p className="text-white text-sm leading-relaxed">
                  Electronic devices, LED drivers, dimmer modules, neon indicator lamps in switches,
                  and even SPDs provide parallel paths that reduce the measured insulation
                  resistance. Always ensure all equipment is fully disconnected before testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Insulation Resistance Testing',
    content: (
      <>
        <p>
          Three-phase circuits require more conductor combinations than single-phase circuits. The
          principle is the same — you are checking that insulation between every pair of conductors
          and between all conductors and earth is adequate — but with four conductors (L1, L2, L3,
          and N) there are more combinations to test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Three-Phase Testing Sequence</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1 — All live conductors to earth:</strong>{' '}
                Link L1, L2, L3, and N together. Test to earth. This is the quickest check — if this
                passes with a high reading, all four conductors have good insulation to earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2 — Between conductors:</strong> Remove the
                links. Test L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N. Each must read at least 1 MΩ.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Three-phase motors:</strong> Disconnect all
                three-phase motors, drives, and inverters before testing. These provide
                low-impedance parallel paths and can be damaged by the test voltage. Test the motor
                windings separately if required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The same minimum value of 1 MΩ per BS 7671 Table 61 applies to every individual
          measurement. For large commercial or industrial installations with many three-phase
          circuits, systematic recording of results is essential. Elec-Mate's schedule of tests
          handles single-phase and three-phase circuits, recording all conductor combinations per
          circuit.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Record Insulation Resistance Results with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate is built for on-site electrical testing and certification. When it comes to
          insulation resistance testing, the app provides several features that save time and reduce
          errors.
        </p>
        <SEOAppBridge
          title="Schedule of tests with auto-validation"
          description="Enter insulation resistance readings into the schedule of test results and Elec-Mate instantly validates them against the BS 7671 Table 61 minimum of 1 MΩ. Failures are flagged automatically — no need to memorise the tables or check values manually."
          icon={ClipboardCheck}
        />
        <p>
          The <SEOInternalLink href="/tools/eicr-certificate">EICR form</SEOInternalLink> records
          insulation resistance results per circuit, alongside{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">R1+R2 values</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            Zs readings
          </SEOInternalLink>
          , and{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD trip times</SEOInternalLink>.
          Voice-to-test-results lets you speak values while holding probes — just say the circuit
          number and the reading, and the app fills in the schedule. The board scanner photographs
          your distribution board and populates the circuit list automatically using AI.
        </p>
        <SEOAppBridge
          title="Board scanner — photograph the board, populate the schedule"
          description="Point your phone at the distribution board and Elec-Mate's AI reads MCB/RCBO ratings, circuit details, and board layout. Start the schedule of tests with the data already filled in. No more squinting at faded labels."
          icon={Camera}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'How to test protective conductor continuity, long lead method, and using R1+R2 to verify Zs.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description:
      'Ze, Zs, maximum permitted values, temperature correction, and TN-S vs TT systems.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description: 'Full RCD test procedure — trip times, half-cycle testing, Type S RCDs.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description:
      'The correct dead and live testing order per GN3. Why insulation resistance is test 3.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated test results, digital signatures, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description:
      'Zs lookup, R1+R2, cable sizing, voltage drop, PFC, and dozens more built-in calculators.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InsulationResistanceTestPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-10-20"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Insulation Resistance Testing:{' '}
          <span className="text-yellow-400">How to Test and Minimum Values</span>
        </>
      }
      heroSubtitle="The complete guide to insulation resistance testing for UK electricians. What insulation resistance is, test voltages per BS 7671 Table 61, minimum values (1 MΩ), how to perform the test, conductor combinations (L-N, L-E, N-E), typical good values by installation age, common causes of low readings, and three-phase testing."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Test Insulation Resistance — Step by Step"
      howToDescription="Step-by-step insulation resistance testing procedure per BS 7671, from safe isolation through to recording results on the schedule of test results."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Auto-validate insulation resistance readings on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Voice test entry, auto BS 7671 validation, board scanner, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
