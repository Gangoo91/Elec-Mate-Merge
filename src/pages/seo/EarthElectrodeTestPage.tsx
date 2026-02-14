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
  Layers,
  ShieldCheck,
  Calculator,
  GraduationCap,
  Mic,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Earth Electrode', href: '/guides/earth-electrode-testing' },
];

const tocItems = [
  { id: 'what-is-earth-electrode', label: 'What Is an Earth Electrode?' },
  { id: 'when-to-test', label: 'When to Test' },
  { id: 'fall-of-potential', label: 'Fall of Potential Method' },
  { id: 'three-pin-method', label: '3-Pin Method' },
  { id: 'acceptable-values', label: 'Acceptable Resistance Values' },
  { id: 'instrument-setup', label: 'Instrument Setup' },
  { id: 'common-errors', label: 'Common Errors and Pitfalls' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth electrode resistance testing is essential for every TT earthing system to confirm the earth path is effective and protective devices will operate within disconnection times.',
  'The fall of potential method (using two temporary test spikes) is the standard measurement technique specified in BS 7671 and GN3.',
  'For a TT system protected by a 30 mA RCD, the maximum earth electrode resistance (RA) is 1667 ohms — but in practice, values below 200 ohms are preferred for reliability.',
  'Test spike placement matters: the current spike should be at least 30 metres from the electrode under test, with the potential spike at 62% of that distance.',
  'Elec-Mate lets you record earth electrode test results by voice while your hands stay on the instrument leads — no putting probes down to type.',
];

const faqs = [
  {
    question: 'What is the maximum acceptable earth electrode resistance for a TT system?',
    answer:
      'The maximum earth electrode resistance depends on the protective device. For a TT system protected by a 30 mA RCD (the most common arrangement in domestic properties), the maximum RA is calculated as RA x Ia less than or equal to 50 V. With a 30 mA RCD, that gives RA = 50 / 0.03 = 1667 ohms. However, this is the absolute maximum — in practice, earth electrode resistance values below 200 ohms are strongly preferred. A high resistance near the theoretical limit means the RCD is the sole line of defence, with very little margin. If the earth electrode resistance is consistently above 200 ohms, consider driving the electrode deeper, using a longer electrode, adding a second electrode in parallel, or treating the surrounding soil to reduce resistivity (for example, adding bentonite or moisture). BS 7671 Regulation 411.5.1 and Table 41.5 set out the disconnection time requirements for TT systems.',
  },
  {
    question: 'Can I test an earth electrode with a standard multifunction tester?',
    answer:
      'Most multifunction testers (such as the Megger MFT1741 or Fluke 1664 FC) include an earth electrode resistance test mode, but they typically perform a simplified two-wire or stakeless measurement. For a proper fall of potential test, you need a dedicated earth electrode tester (such as the Megger DET4TC2, Fluke 1625-2, or Kewtech KEW4105A) that supplies a test current between the electrode under test and a remote current spike, and measures the voltage drop at an intermediate potential spike. The dedicated instrument gives you a true resistance reading that accounts for soil resistivity and electrode contact resistance. If you only have a multifunction tester, the stakeless (clamp-on) method can give an indicative reading on a TT system where the electrode is bonded to a metallic water pipe, but it is not a substitute for a proper fall of potential measurement when commissioning a new installation or investigating a problem.',
  },
  {
    question: 'How far apart should the test spikes be from the earth electrode?',
    answer:
      'For the standard fall of potential method, the current spike (C) should be driven into the ground at least 30 metres from the earth electrode under test (E). The potential spike (P) is placed at 62% of the distance between E and C — so if C is 30 metres from E, P should be approximately 18.6 metres from E. This 62% rule places the potential spike in the "flat" part of the voltage gradient curve, where the reading is least affected by the resistance zones around either E or C. If space is limited, you can reduce the distances, but the accuracy of the measurement decreases. In confined sites, some testers offer a stakeless (clamp-on) method that avoids test spikes entirely — but this only works where there is a parallel earth path (such as a metallic water pipe). GN3 (Guidance Note 3: Inspection and Testing) provides detailed diagrams of spike placement for different site configurations.',
  },
  {
    question: 'Why does the earth electrode resistance change with the weather?',
    answer:
      'Earth electrode resistance is heavily influenced by soil moisture content and temperature. In dry summer conditions, the soil around the electrode dries out, and resistivity increases — sometimes dramatically. A reading of 50 ohms in winter can rise to 200 or 300 ohms in a dry August. Conversely, waterlogged soil in winter can give misleadingly low readings. This is why BS 7671 and GN3 recommend testing under the worst-case conditions (typically late summer when the soil is driest) or applying a seasonal correction factor if testing at other times. If the electrode resistance is borderline, test again during a dry period to check the worst-case value. For critical installations, consider a longer electrode or a second electrode in parallel to reduce the sensitivity to seasonal variation. Clay soils generally give lower and more stable electrode resistance values than sandy or rocky soils.',
  },
  {
    question: 'Do I need to disconnect the earth electrode before testing?',
    answer:
      'For a true fall of potential measurement, the earth electrode under test should be disconnected from the installation earthing conductor. This is because you want to measure the resistance of the electrode itself, not the parallel path through the installation. If the electrode is left connected, the measurement may include other earth paths (such as a metallic water pipe or the neutral-earth connection at the supply transformer), giving a misleadingly low reading. Disconnect the main earthing conductor at the earth electrode connection point before testing. Make sure the installation is safely isolated before disconnecting the earthing conductor — removing the earth from a live installation is extremely dangerous. After testing, reconnect the earthing conductor securely and check the connection is tight. If you cannot safely disconnect the electrode (for example, in an occupied property where you cannot isolate the supply), the stakeless clamp-on method can give an indicative reading without disconnection.',
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
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT systems — how each earthing arrangement works and when you encounter them.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description:
      'How Zs values relate to disconnection times and what to do when readings are too high.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'How to perform IR testing at 500 V DC and interpret the results for EICR and EIC certificates.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
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
    id: 'what-is-earth-electrode',
    heading: 'What Is an Earth Electrode and Why Does It Matter?',
    content: (
      <>
        <p>
          An earth electrode is a conductor (usually a copper-clad steel rod) driven into the ground
          to provide a connection between the electrical installation's earthing system and the
          general mass of earth. It is the foundation of the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-explained">
            TT earthing system
          </SEOInternalLink>
          , where the electricity supplier does not provide an earth terminal and the installation
          must create its own earth path.
        </p>
        <p>
          TT systems are common in rural areas, overhead supply lines, older properties, and
          installations where the supplier's earth is unreliable or has been removed. They are also
          used for temporary installations, construction sites, and caravan parks. In a TT system,
          the earth fault current must flow through the soil to reach the supply transformer neutral
          — and the resistance of that path depends entirely on the earth electrode.
        </p>
        <p>
          If the earth electrode resistance is too high, protective devices (particularly RCDs) may
          not operate fast enough to clear a fault within the disconnection times required by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>. This
          means the installation is unsafe. Testing the earth electrode resistance is therefore a
          critical part of both initial verification and periodic inspection for any TT system.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-test',
    heading: 'When Is Earth Electrode Testing Required?',
    content: (
      <>
        <p>Earth electrode resistance must be tested in the following situations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Initial verification of a new TT installation.</strong> Before the
                installation is energised, the earth electrode resistance must be measured and
                confirmed to be within acceptable limits. This is part of the test sequence in
                Chapter 61 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection of an existing TT system.</strong> Every{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> for a
                property with a TT earthing arrangement should include an earth electrode resistance
                measurement. The value is recorded on the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After installing or replacing an earth electrode.</strong> Any new or
                replacement electrode must be tested before the earthing conductor is connected and
                the installation is energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Investigating a fault or high Zs reading.</strong> If earth fault loop
                impedance readings on a TT system are unexpectedly high, testing the earth electrode
                separately helps isolate whether the electrode resistance or the installation wiring
                is the problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal verification.</strong> Where a borderline earth electrode
                resistance was recorded, a follow-up test during dry conditions confirms the
                worst-case value.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For TN-S and TN-C-S systems, earth electrode testing is not normally required because the
          earth path is provided by the supply network (the cable sheath or combined neutral-earth
          conductor). Earth electrode testing is specifically a TT system requirement.
        </p>
      </>
    ),
  },
  {
    id: 'fall-of-potential',
    heading: 'The Fall of Potential Method: Step by Step',
    content: (
      <>
        <p>
          The fall of potential method is the standard technique for measuring earth electrode
          resistance. It is described in GN3 (Guidance Note 3: Inspection and Testing) and is the
          method required by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> for
          accurate electrode resistance measurement. Here is how it works:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Disconnect the earth electrode</strong> from the installation earthing
              conductor. The installation must be safely isolated first — never disconnect the earth
              from a live installation. Perform{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation
              </SEOInternalLink>{' '}
              before touching the earthing conductor.
            </li>
            <li>
              <strong>Drive the current spike (C)</strong> into the ground at least 30 metres from
              the earth electrode under test (E). The current spike should be driven firmly into the
              soil — at least 300 mm deep — to make good contact.
            </li>
            <li>
              <strong>Drive the potential spike (P)</strong> into the ground at 62% of the distance
              between E and C. If C is 30 metres from E, place P at approximately 18.6 metres from E
              (in a straight line towards C).
            </li>
            <li>
              <strong>Connect the instrument leads.</strong> Connect the E terminal of the earth
              electrode tester to the electrode under test. Connect the P terminal to the potential
              spike. Connect the C terminal to the current spike.
            </li>
            <li>
              <strong>Take the reading.</strong> Press the test button. The instrument injects a
              test current between E and C, and measures the voltage drop between E and P. It
              calculates the resistance as R = V / I and displays the result in ohms.
            </li>
            <li>
              <strong>Verify with the 62% check.</strong> Move the potential spike to 52% and then
              72% of the E-to-C distance and take readings at each position. If the three readings
              are within 5% of each other, the 62% reading is valid. If they differ significantly,
              the current spike is not far enough away — increase the E-to-C distance and repeat.
            </li>
          </ol>
        </div>
        <p>
          The 62% rule is based on the mathematics of the voltage gradient around a hemisphere
          electrode in uniform soil. At 62% of the distance between E and C, the potential spike
          sits in the "flat zone" of the voltage curve where the reading is least sensitive to exact
          spike placement. This gives the most accurate result.
        </p>
      </>
    ),
  },
  {
    id: 'three-pin-method',
    heading: 'The 3-Pin Method Explained',
    content: (
      <>
        <p>
          The 3-pin method is another name for the fall of potential technique described above. The
          "3 pins" refer to the three connections: the earth electrode under test (E), the potential
          spike (P), and the current spike (C). Some texts call it the "3-terminal method" or
          "3-pole method" — they all describe the same measurement.
        </p>
        <p>
          The key difference between the 3-pin method and simpler 2-wire measurements is accuracy. A
          2-wire measurement (connecting the instrument between the electrode under test and a
          single remote spike) includes the resistance of both the electrode and the test spike in
          the reading. The 3-pin method separates the measurement: the current path goes through E
          and C, while the voltage measurement is taken independently at P. This eliminates the test
          spike resistance from the reading.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white">
              <strong>Site access tip:</strong> On confined sites where you cannot achieve 30 metres
              between E and C, try to get the maximum distance possible and use the 52%/62%/72%
              verification readings to check accuracy. If the three readings do not converge, note
              the limitation on the{' '}
              <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> and record
              the best reading you could achieve with a note about the constraint.
            </p>
          </div>
        </div>
        <p>
          Some modern instruments also offer a "stakeless" or "clamp-on" method that does not
          require test spikes at all. This works by injecting a signal through a clamp placed around
          the earthing conductor and measuring the return current through an existing parallel earth
          path (such as a metallic water pipe). The stakeless method is useful for quick checks on
          existing systems, but it is not a substitute for the 3-pin method when commissioning a new
          electrode.
        </p>
        <SEOAppBridge
          title="Record earth electrode results by voice"
          description="Probes in hand? Speak your earth electrode reading — 'RA 47 ohms' — and Elec-Mate fills in the schedule of test results. No putting instruments down to type on your phone."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'acceptable-values',
    heading: 'Acceptable Earth Electrode Resistance Values',
    content: (
      <>
        <p>
          The maximum acceptable earth electrode resistance depends on the type of protective device
          and its rated residual operating current. The fundamental requirement from BS 7671
          Regulation 411.5.1 for TT systems is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="text-white font-mono text-lg text-center mb-4">RA x I&#916;n &le; 50 V</p>
          <p className="text-white text-sm">
            Where RA is the earth electrode resistance (in ohms) and I&#916;n is the rated residual
            operating current of the RCD (in amps). 50 V is the touch voltage limit for normal dry
            conditions.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Maximum RA by RCD Rating</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA RCD:</strong> RA = 50 / 0.03 = 1667 ohms maximum
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>100 mA RCD:</strong> RA = 50 / 0.1 = 500 ohms maximum
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>300 mA RCD:</strong> RA = 50 / 0.3 = 167 ohms maximum
              </span>
            </li>
          </ul>
        </div>
        <p>
          While the calculated maximums seem generous (especially for 30 mA RCDs), there are
          practical reasons to aim for much lower values. An earth electrode with RA below 200 ohms
          provides a good margin of safety and ensures the RCD operates reliably under all soil
          conditions. Electrodes in the range of 20 to 100 ohms are common in clay and loam soils.
          Sandy, rocky, or chalk soils may produce higher values that require longer electrodes or
          multiple rods in parallel.
        </p>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/earth-loop-impedance-calculator">
            earth loop impedance calculator
          </SEOInternalLink>{' '}
          in Elec-Mate to check whether your measured RA value meets the disconnection time
          requirements for each circuit.
        </p>
      </>
    ),
  },
  {
    id: 'instrument-setup',
    heading: 'Instrument Setup and Lead Connections',
    content: (
      <>
        <p>
          Setting up the earth electrode tester correctly is essential for accurate results. Here is
          the procedure for common instruments:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Megger DET4TC2 / DET4TD2</h4>
                <p className="text-white text-sm leading-relaxed">
                  Select the 3-pole earth test mode. Connect the green lead (E) to the electrode
                  under test. Connect the yellow lead (P) to the potential spike. Connect the red
                  lead (C) to the current spike. Set the test frequency to avoid mains interference
                  (the instrument auto-selects on later models). Press TEST and wait for a stable
                  reading. The instrument displays RA in ohms. Check the noise indicator — if mains
                  interference is high, the reading may be unreliable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fluke 1625-2 / 1623-2</h4>
                <p className="text-white text-sm leading-relaxed">
                  Select 3-pole mode on the rotary switch. Connect H (current) to the current spike,
                  S (potential) to the potential spike, and E (earth) to the electrode under test.
                  The Fluke 1625-2 also supports stakeless testing using the included clamp
                  accessories. For the 3-pole method, press TEST and read the resistance in ohms
                  from the display. The instrument filters out mains noise automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Kewtech KEW4105A</h4>
                <p className="text-white text-sm leading-relaxed">
                  A compact and affordable dedicated earth tester. Select the 3-wire mode. Connect
                  the E, P, and C leads to the electrode, potential spike, and current spike
                  respectively. Press MEASURE. The display shows resistance in ohms with automatic
                  range selection. The KEW4105A also supports 2-wire simplified measurement for
                  quick checks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Before testing, check that the test leads are in good condition, the spikes are clean
          (free from paint or corrosion), and the soil at the spike locations is damp enough to make
          contact. Dry, hard ground may give erratic readings — pour a small amount of water around
          each spike to improve soil contact if needed.
        </p>
      </>
    ),
  },
  {
    id: 'common-errors',
    heading: 'Common Errors and Pitfalls',
    content: (
      <>
        <p>
          Earth electrode testing seems straightforward, but several common mistakes can produce
          inaccurate or misleading results:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not disconnecting the electrode.</strong> Testing with the electrode still
                connected to the installation measures the parallel combination of the electrode and
                any other earth paths. The reading will be lower than the true electrode resistance,
                giving false confidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test spikes too close together.</strong> If the resistance zones around E,
                P, and C overlap, the readings are inaccurate. Always aim for at least 30 metres
                between E and C, and verify with the 52%/62%/72% check.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing in wet conditions only.</strong> A reading taken after heavy rain
                may be significantly lower than the worst-case dry-season value. If the reading is
                borderline, return during dry weather or apply a seasonal correction factor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor spike contact.</strong> Spikes driven into dry, stony, or tarmacked
                ground may not make adequate soil contact. Use water to dampen the soil around each
                spike and ensure the spike is driven deep enough.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring mains interference.</strong> High levels of stray earth current
                from nearby power lines or substations can affect the reading. Use an instrument
                with automatic noise rejection, or test at a different frequency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you get an unexpectedly high or unstable reading, work through these checks
          systematically before recording the result. An accurate earth electrode reading is
          essential for confirming that the TT system is safe.
        </p>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Results on the EICR or EIC',
    content: (
      <>
        <p>
          The earth electrode resistance value (RA) is recorded on the schedule of test results for
          the <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. It should be entered
          in the "Earth electrode resistance" field in the supply characteristics section of the
          certificate.
        </p>
        <p>When recording the result, note the following:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the value in ohms</strong> — for example, "RA = 47 ohms."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note the test method used</strong> — "fall of potential (3-pin)" or
                "stakeless clamp" if applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note weather and soil conditions</strong> — "tested in dry conditions" or
                "tested after prolonged rain." This provides context for the reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note any limitations</strong> — if test spike distances were restricted,
                record the actual distances used and any uncertainty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the earth electrode resistance exceeds the maximum permitted value for the installed
          protective devices, record an observation code. A dangerously high RA that prevents
          disconnection within the required time is a C2 (Potentially Dangerous) defect. The
          remedial action is to reduce the electrode resistance (longer rod, additional electrodes,
          soil treatment) or install additional RCD protection.
        </p>
        <SEOAppBridge
          title="Complete the EICR on site with Elec-Mate"
          description="Record earth electrode results, Zs values, IR readings, and RCD trip times — all by voice. The schedule of test results fills itself in while you work. Export a professional PDF certificate before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthElectrodeTestPage() {
  return (
    <GuideTemplate
      title="Earth Electrode Testing | TT System Guide UK"
      description="Complete guide to earth electrode resistance testing for TT systems. Fall of potential method, 3-pin test procedure, acceptable RA values, instrument setup, and how to record results on EICR and EIC certificates."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Earth Electrode Testing:{' '}
          <span className="text-yellow-400">TT System Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Every TT installation depends on its earth electrode. If the resistance is too high, the RCD cannot disconnect the supply fast enough to prevent injury. This guide covers the fall of potential method, acceptable values, instrument setup, and how to record results on your EICR or EIC."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earth Electrode Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Earth Electrode Results by Voice"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to complete EICR and EIC certificates on site. Voice test entry, AI defect coding, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
