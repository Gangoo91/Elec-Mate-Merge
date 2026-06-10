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
  'Test spike placement matters: industry guidance (IET Guidance Note 3) recommends placing the current spike well clear of the electrode under test and the potential spike at approximately 62% of the electrode-to-current-spike distance, in the flat part of the voltage gradient.',
  'Regulation 643.7.2 (Chapter 64 of BS 7671:2018+A4:2026) requires that, where the earthing system incorporates an earth electrode, the electrode resistance to Earth shall be measured — this verifies TT system compliance with Regulation 411.5 at both initial verification and periodic inspection. Where measuring RA is not practicable, the external earth fault loop impedance may be used instead.',
  'Elec-Mate lets you record earth electrode test results by voice while your hands stay on the instrument leads — no putting probes down to type.',
];

const faqs = [
  {
    question: 'What is the maximum acceptable earth electrode resistance for a TT system?',
    answer:
      'The maximum earth electrode resistance depends on the protective device. For a TT system protected by a 30 mA RCD (the most common arrangement in domestic properties), the maximum RA is calculated as RA x Ia less than or equal to 50 V. With a 30 mA RCD, that gives RA = 50 / 0.03 = 1667 ohms. However, this is the absolute maximum — in practice, earth electrode resistance values below 200 ohms are strongly preferred. A high resistance near the theoretical limit means the RCD is the sole line of defence, with very little margin. If the earth electrode resistance is consistently above 200 ohms, consider driving the electrode deeper, using a longer electrode, adding a second electrode in parallel, or treating the surrounding soil to reduce resistivity (for example, adding bentonite or moisture). BS 7671 Regulation 411.5.3 gives the condition RA x IΔn ≤ 50 V, and Table 41.5 lists the maximum earth fault loop impedance for each RCD rating, with disconnection within the times of Table 41.1. Note 2 to Table 41.5 adds that a resistance exceeding 200 ohms may not be stable (see Regulation 542.2.4).',
  },
  {
    question: 'Can I test an earth electrode with a standard multifunction tester?',
    answer:
      'Most multifunction testers (such as the Megger MFT1741 or Fluke 1664 FC) include an earth electrode resistance test mode, but they typically perform a simplified two-wire or stakeless measurement. For a proper fall of potential test, you need a dedicated earth electrode tester (such as the Megger DET4TC2, Fluke 1625-2, or Kewtech KEW4105A) that supplies a test current between the electrode under test and a remote current spike, and measures the voltage drop at an intermediate potential spike. The dedicated instrument gives you a true resistance reading that accounts for soil resistivity and electrode contact resistance. If you only have a multifunction tester, the stakeless (clamp-on) method can give an indicative reading on a TT system where the electrode is bonded to a metallic water pipe, but it is not a substitute for a proper fall of potential measurement when commissioning a new installation or investigating a problem.',
  },
  {
    question: 'How far apart should the test spikes be from the earth electrode?',
    answer:
      'Industry guidance (IET Guidance Note 3) is that the current spike (C) should be placed well clear of the electrode under test — a common rule of thumb is at least ten times the maximum dimension of the electrode system, so for a standard 1.2 m rod allow plenty of distance, and more again for longer or multiple-rod arrays. The potential spike (P) is then placed at approximately 62% of the electrode-to-current-spike distance. This 62% rule places the potential spike in the "flat" part of the voltage gradient curve, where the reading is least affected by the resistance zones around either the electrode or the current spike. If space is limited, reduce distances as far as necessary and verify accuracy using the 52%/62%/72% check — if the three readings converge within about 5%, the result is valid. GN3 provides detailed diagrams of spike placement for different site configurations.',
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
  {
    question: 'Where should an earth electrode be installed and how deep should it be driven?',
    answer:
      'Earth electrodes should be installed in a location where the soil remains moist throughout the year — away from paths, driveways, and areas with good drainage. They should be located as close as practical to the main earthing terminal of the installation to minimise the length of the earthing conductor. In terms of depth, a standard 1.2-metre earth rod is suitable for many domestic and small commercial TT installations, but for higher-resistance soils (sandy, gravelly, or chalk soils), deeper electrodes or multiple rods in parallel may be required. The electrode should be driven vertically and the head should be accessible for testing and reconnection. Where multiple electrodes are installed in parallel to reduce resistance, they should be spaced at least twice their length apart — otherwise the resistance zones around each electrode overlap and the benefit of parallelism is reduced.',
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
    href: '/guides/earthing-arrangements',
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
          <SEOInternalLink href="/guides/earthing-arrangements">TT earthing system</SEOInternalLink>, where
          the electricity supplier does not provide an earth terminal and the installation must
          create its own earth path.
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
                confirmed to be within acceptable limits. Regulation 643.7.2 (Chapter 64 of BS 7671)
                requires that, where the earthing system incorporates an earth electrode, the
                electrode resistance to Earth is measured — verifying compliance with Regulation
                411.5 before the installation is put into service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection of an existing TT system.</strong> Every{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> for a
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
          description="Probes in hand? Speak your earth electrode reading — 'RA 47 ohms' — and Elec-Mate fills in the schedule of test results."
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
          and its rated residual operating current. The fundamental condition for TT systems comes
          from BS 7671 Regulation 411.5.3:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="text-white font-mono text-lg text-center mb-4">RA x I&#916;n &le; 50 V</p>
          <p className="text-white text-sm">
            Where RA is the sum of the resistances of the earth electrode and the protective
            conductor connecting it to the exposed-conductive-parts (in ohms), and I&#916;n is the
            rated residual operating current of the RCD (in amps). 50 V is the touch voltage limit
            for normal dry conditions. Regulation 411.5.3 also confirms the requirement is met where
            the earth fault loop impedance meets Table 41.5.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-hidden">
          <h3 className="font-bold text-white text-lg mb-1">
            Maximum Earth Fault Loop Impedance (Z<sub>s</sub>) by RCD Rating
          </h3>
          <p className="text-white/60 text-xs mb-4">
            BS 7671 Table 41.5 — non-delayed and time-delayed &lsquo;S&rsquo; type RCDs to BS EN
            61008-1 / 61009-1, U<sub>0</sub> = 230 V. Disconnection within the times of Table 41.1.
          </p>
          <div className="grid grid-cols-3 text-sm">
            <div className="bg-white/[0.06] border-b border-white/10 px-3 py-2 font-semibold text-white">
              RCD rating (I&#916;n)
            </div>
            <div className="bg-white/[0.06] border-b border-white/10 px-3 py-2 font-semibold text-white">
              Max Z<sub>s</sub> (ohms)
            </div>
            <div className="bg-white/[0.06] border-b border-white/10 px-3 py-2 font-semibold text-white">
              RA = 50 / I&#916;n
            </div>

            <div className="bg-green-900/30 border-b border-white/10 px-3 py-2 text-white font-medium">
              30 mA
            </div>
            <div className="bg-green-900/30 border-b border-white/10 px-3 py-2 text-white">1667*</div>
            <div className="bg-green-900/30 border-b border-white/10 px-3 py-2 text-white/70">
              1667 &Omega;
            </div>

            <div className="bg-blue-900/30 border-b border-white/10 px-3 py-2 text-white font-medium">
              100 mA
            </div>
            <div className="bg-blue-900/30 border-b border-white/10 px-3 py-2 text-white">500*</div>
            <div className="bg-blue-900/30 border-b border-white/10 px-3 py-2 text-white/70">
              500 &Omega;
            </div>

            <div className="bg-amber-900/30 border-b border-white/10 px-3 py-2 text-white font-medium">
              300 mA
            </div>
            <div className="bg-amber-900/30 border-b border-white/10 px-3 py-2 text-white">167</div>
            <div className="bg-amber-900/30 border-b border-white/10 px-3 py-2 text-white/70">
              167 &Omega;
            </div>

            <div className="bg-red-900/30 px-3 py-2 text-white font-medium">500 mA</div>
            <div className="bg-red-900/30 px-3 py-2 text-white">100</div>
            <div className="bg-red-900/30 px-3 py-2 text-white/70">100 &Omega;</div>
          </div>
          <p className="text-white/70 text-xs mt-4">
            * Note 2 to Table 41.5: the resistance of the installation earth electrode should be as
            low as practicable — a value exceeding 200 &Omega; may not be stable (see Regulation
            542.2.4). So although the arithmetic limit for a 30 mA RCD is 1667 &Omega;, the practical
            target is far lower.
          </p>
        </div>
        <p>
          While the tabulated maximums look generous (especially for 30 mA RCDs), there are good
          reasons to aim much lower. An earth electrode with RA comfortably below 200 ohms provides a
          margin of safety and keeps the reading stable across the seasons. Electrodes in the range
          of 20 to 100 ohms are common in clay and loam soils; sandy, rocky, or chalk soils may
          produce higher values that need longer electrodes or multiple rods in parallel. Regulation
          542.2.4 also requires the type and embedded depth of the electrode to be chosen so that
          soil drying and freezing will not raise its resistance above the required value.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-1">Clay &amp; loam</h4>
            <p className="text-white text-sm leading-relaxed">
              Lowest and most stable resistivity. A single 1.2 m rod will often read well within
              limits and hold its value through dry spells.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h4 className="font-bold text-white mb-1">Sandy &amp; gravelly</h4>
            <p className="text-white text-sm leading-relaxed">
              Higher resistivity and drains quickly, so readings swing with the weather. Expect to
              need a longer rod or two rods in parallel.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-1">Chalk &amp; rock</h4>
            <p className="text-white text-sm leading-relaxed">
              Highest resistivity and hardest to drive into. Multiple electrodes, deep driving, or
              an earth mat with conductive backfill may be required.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-1">Parallel rods</h4>
            <p className="text-white text-sm leading-relaxed">
              Space rods at least twice their driven length apart — closer than that and the
              resistance zones overlap, so the second rod adds little benefit.
            </p>
          </div>
        </div>
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
          <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>. It should be entered in
          the "Earth electrode resistance" field in the supply characteristics section of the
          certificate.
        </p>
        <p>
          Regulation 643.7.2 (Chapter 64 of BS 7671) requires that, where the earthing system
          incorporates an earth electrode, the electrode resistance to Earth is measured — this
          verifies TT system compliance with Regulation 411.5. Where measuring RA is not
          practicable, the standard permits the measured external earth fault loop impedance to be
          used instead. When recording the result, note the following:
        </p>
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
                <strong>Record the electrode type and location.</strong> Good practice (and IET
                Guidance Note 3) is to record the type (e.g. copper-clad rod, plate), location (e.g.
                "front garden, 1.2 m from consumer unit"), and measured resistance or soil
                conditions as appropriate.
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
          description="Record earth electrode results, Zs values, IR readings, and RCD trip times — all by voice. The schedule of test results fills itself in while you work."
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
      description="Complete guide to earth electrode resistance testing for TT systems. Fall of potential method, 3-pin test procedure, acceptable RA values…"
      datePublished="2025-06-15"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Gauge}
      answerBox={{
        question: 'How do you test an earth electrode and what resistance is acceptable?',
        answer:
          'Disconnect the electrode from the installation earthing conductor, then use the fall of potential (3-pin) method: drive a current spike well clear of the electrode and a potential spike at 62% of that distance, and read RA in ohms. Under BS 7671 Regulation 411.5.3, RA x IΔn must not exceed 50 V; for a 30 mA RCD that is 1667 ohms maximum, but aim well below 200 ohms for stability.',
      }}
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
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to complete EICR and EIC certificates on site. Voice test entry, AI defect coding, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
