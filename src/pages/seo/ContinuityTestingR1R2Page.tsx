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
  Cable,
  BookOpen,
  CircleDot,
  Link2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Continuity Testing R1+R2 | How to Test Protective Conductors';
const PAGE_DESCRIPTION =
  'Complete guide to continuity testing R1+R2 for UK electricians. What R1+R2 is, why it matters for Zs calculation (Zs = Ze + R1+R2), how to perform the test using the long lead method, acceptable values, ring circuit continuity testing, common mistakes. BS 7671 compliant. Record results with Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Continuity Testing R1+R2', href: '/guides/continuity-testing-r1-r2' },
];

const tocItems = [
  { id: 'what-is-r1r2', label: 'What Is R1+R2?' },
  { id: 'why-it-matters', label: 'Why R1+R2 Matters' },
  { id: 'how-to-test', label: 'How to Perform the Test' },
  { id: 'long-lead-method', label: 'Long Lead Method' },
  { id: 'reading-results', label: 'Reading and Recording Results' },
  { id: 'acceptable-values', label: 'Acceptable Values' },
  { id: 'ring-circuit', label: 'Ring Circuit Continuity Testing' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'elec-mate', label: 'R1+R2 with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'R1+R2 is the combined resistance of the phase conductor (R1) and the circuit protective conductor (R2) measured from the distribution board to the furthest point of the circuit.',
  'The R1+R2 value is critical because it is used to calculate the total earth fault loop impedance: Zs = Ze + (R1+R2). This determines whether the protective device will disconnect within the required time.',
  'The long lead method is the standard technique — connect a long test lead between the line bar and earth bar at the DB, then measure at the furthest point of each circuit.',
  'Ring circuit continuity testing uses a different three-stage method involving end-to-end resistance and cross-connection (figure-of-eight) tests to verify the ring is complete.',
  'Elec-Mate has a dedicated R1+R2 calculator and auto-validates every value in the schedule of tests. The Zs calculator uses your R1+R2 values to verify measured loop impedance readings.',
];

const faqs = [
  {
    question: 'What is the difference between R1+R2 and R2 continuity tests?',
    answer:
      'The R1+R2 test measures the total resistance of the line conductor (R1) and the circuit protective conductor (R2) connected together at the furthest point. This is done by linking the line and earth bars at the distribution board with a temporary lead, then measuring between line and earth at the furthest accessory — the current flows up through R1 and back through R2, giving the combined value. The R2-only test measures the resistance of the circuit protective conductor alone, from the distribution board to the furthest point. This is used where you need to confirm the CPC is continuous independently of the line conductor, or for circuit types where R1+R2 is not applicable. Both tests use a low-reading ohmmeter (typically the continuity function on a multifunction tester) at a test voltage between 4 and 24 V DC.',
  },
  {
    question: 'Why is R1+R2 used to calculate Zs?',
    answer:
      'The earth fault loop impedance (Zs) is the total impedance of the path that fault current takes when a line-to-earth fault occurs. This path goes from the source (transformer), through the line conductor to the fault point (resistance R1), through the fault itself, back through the CPC to the distribution board (resistance R2), through the main earthing terminal, and back to the source through the external earth path (impedance Ze). Therefore Zs = Ze + (R1+R2). By measuring R1+R2 during the dead tests and Ze during the live tests, you can calculate the expected Zs and compare it against the measured Zs. If the measured Zs is significantly higher than Ze + (R1+R2), there may be a high-resistance connection in the earth path that was not detected during continuity testing.',
  },
  {
    question: 'What is the long lead method for continuity testing?',
    answer:
      'The long lead method is the standard technique for measuring R1+R2 on radial circuits. You connect a temporary test lead (the "long lead") between the line busbar and the earth bar at the distribution board. This creates a series circuit: current from the test instrument flows from the line terminal of the accessory under test, back through the line conductor (R1) to the DB, across the temporary link, down through the CPC (R2) to the accessory, and back to the instrument. The instrument reading is R1+R2. Before using the long lead, you must null it (zero the instrument with the lead connected but not touching the circuit) to subtract the lead resistance from your readings. The long lead should be clearly identifiable and must be removed after testing.',
  },
  {
    question: 'What are acceptable R1+R2 values?',
    answer:
      'There is no single maximum R1+R2 value in BS 7671. The acceptable value depends on the cable length, conductor cross-sectional area, and conductor material. What matters is whether the resulting Zs (Ze + R1+R2) is within the maximum permitted Zs for the protective device. For example, a B32 MCB has a maximum Zs of 1.37 ohms. If Ze is 0.35 ohms, then R1+R2 must not exceed approximately 1.02 ohms (before temperature correction). In practice, you check R1+R2 against the expected value calculated from the cable data: resistance per metre from BS 7671 tables multiplied by the cable length. If the measured value significantly exceeds the calculated value, there may be a high-resistance joint or damaged conductor.',
  },
  {
    question: 'How do I test continuity on a ring circuit?',
    answer:
      'Ring circuit continuity testing has three stages, which differ from the simple long lead method used for radial circuits. Stage 1: measure end-to-end resistance of each conductor by disconnecting both ends of the ring at the DB — measure r1 (line-to-line), rn (neutral-to-neutral), and r2 (CPC-to-CPC). For a healthy ring, r1 and rn should be approximately equal. Stage 2: cross-connect line and neutral at one end of the ring (L1 to N2 and N1 to L2) and measure between L and N at each socket. Readings should rise to a maximum at the midpoint of approximately (r1+rn)/4. Stage 3: cross-connect line and CPC, then measure at each socket. The maximum reading gives the R1+R2 at the furthest point, approximately (r1+r2)/4. Anomalies in the readings indicate breaks, cross-connections, or bootleg spurs.',
  },
  {
    question: 'What does a high R1+R2 reading indicate?',
    answer:
      'A higher-than-expected R1+R2 reading can indicate several issues. First, check for high-resistance joints — loose connections at terminals, junction boxes, or maintenance loops add resistance to the circuit. Second, check for damaged conductors — a partially severed cable (for example, nicked by a plasterer or kinked during installation) has a reduced cross-sectional area at that point, increasing resistance. Third, verify that the cable size matches what is expected — if 1.0 mm squared cable was used instead of 2.5 mm squared, the resistance will be significantly higher. Fourth, consider whether the cable run is longer than expected — cables may take indirect routes through walls and floor voids. A high R1+R2 directly increases Zs, which may push the earth fault loop impedance above the maximum permitted value for the protective device, resulting in a failure.',
  },
  {
    question: 'Do I need to null the test leads before continuity testing?',
    answer:
      'Yes, you must null (zero) the test leads before continuity testing. The resistance of the test leads themselves is added to every measurement you take. For short circuits with low R1+R2 values, the lead resistance can be a significant proportion of the total reading. To null the leads, connect them together (or touch the probes) and use the null/zero function on your multifunction tester. The instrument stores this resistance and subtracts it from all subsequent readings. You must re-null whenever you change leads, change the lead configuration, or if leads become damaged during use. Failure to null leads gives artificially high readings, which could cause circuits to appear to fail when they actually pass — or could give an incorrectly high R1+R2 that produces an incorrect Zs calculation.',
  },
];

const howToSteps = [
  {
    name: 'Isolate the circuit and verify dead',
    text: 'Follow the safe isolation procedure per HSE GS 38. Identify the circuit at the distribution board, switch off and lock off the MCB (or remove the fuse), and verify the circuit is dead at the point of work using a proved voltage indicator. Safe isolation is mandatory before continuity testing.',
  },
  {
    name: 'Connect the long lead at the distribution board',
    text: 'Connect a temporary test lead between the line busbar (or the line terminal of the circuit MCB) and the earth bar at the distribution board. This creates the series path through R1 and R2. The long lead must be clearly identifiable and of adequate length to reach comfortably.',
  },
  {
    name: 'Null the test instrument',
    text: 'With the long lead connected and the multifunction tester in continuity mode, touch the probes together and press the null/zero button. This subtracts the resistance of the test leads and the long lead from all subsequent readings. Verify the instrument displays 0.00 ohms after nulling.',
  },
  {
    name: 'Measure R1+R2 at the furthest point of each circuit',
    text: 'At each circuit endpoint (the furthest socket, light fitting, or accessory), measure between line and earth terminals. The reading is the R1+R2 value for that circuit. Record it on the schedule of test results. For radial circuits, measure at the last accessory on the circuit.',
  },
  {
    name: 'Compare against expected values',
    text: 'Calculate the expected R1+R2 from the cable data: multiply the resistance per metre (from BS 7671 tables) by the cable length for both R1 and R2 conductors. The measured value should be close to the calculated value. A significantly higher reading indicates a problem. Use the R1+R2 to verify Zs: Zs should approximately equal Ze + (R1+R2).',
  },
  {
    name: 'Remove the long lead and record results',
    text: 'After testing all circuits, remove the temporary long lead from the distribution board. Record all R1+R2 values on the schedule of test results. Elec-Mate auto-validates each value and uses it in the Zs calculation to verify your live loop impedance measurements.',
  },
];

const sections = [
  {
    id: 'what-is-r1r2',
    heading: 'What Is R1+R2?',
    content: (
      <>
        <p>
          R1+R2 is the combined resistance of two conductors measured in series: R1 is the
          resistance of the line (phase) conductor from the distribution board to the furthest point
          of the circuit, and R2 is the resistance of the circuit protective conductor (CPC — the
          earth wire) over the same path. When you measure R1+R2, you are measuring the total
          resistance of the outgoing line conductor and the return earth conductor connected
          together at the far end.
        </p>
        <p>
          This measurement is one of the most important values recorded during electrical testing
          because it directly feeds into the calculation of earth fault loop impedance. The formula
          Zs = Ze + (R1+R2) means that your R1+R2 measurement, combined with the external earth
          fault loop impedance (Ze), gives you the expected total earth fault loop impedance (Zs).
          This is the value that determines whether the protective device (MCB, RCBO, or fuse) will
          disconnect the supply quickly enough to prevent electric shock in the event of an earth
          fault.
        </p>
        <p>
          Continuity testing is test number one in the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 testing sequence
          </SEOInternalLink>{' '}
          — it is the very first electrical test carried out on an installation, performed with the
          circuit de-energised. This is because the integrity of the earth path must be confirmed
          before any other test can be relied upon.
        </p>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why R1+R2 Matters for Electrical Safety',
    content: (
      <>
        <p>
          The R1+R2 value is not just a number on a certificate — it represents the actual
          resistance of the fault current path. When an earth fault occurs (for example, a live
          conductor touches a metallic enclosure), fault current flows from the supply, through the
          line conductor (R1) to the fault point, through the fault, and back through the CPC (R2)
          to the distribution board. The total impedance of this path determines how much fault
          current flows, which in turn determines how quickly the protective device operates.
        </p>
        <p>
          If R1+R2 is too high, the fault current will be too low to trip the protective device
          within the required disconnection time. BS 7671 requires disconnection within 0.4 seconds
          for final circuits supplying socket outlets and within 5 seconds for distribution
          circuits. The{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs values
          </SEOInternalLink>{' '}
          in BS 7671 Tables 41.2, 41.3, and 41.4 are calculated to ensure these disconnection times
          are achieved.
        </p>
        <p>
          Measuring R1+R2 also serves as a verification tool. After measuring Zs during live
          testing, you can check that Zs is approximately equal to Ze + (R1+R2). If the measured Zs
          is significantly higher than this calculated value, there may be a high-resistance
          connection in the earth path that was not detected during the continuity test — for
          example, a loose main earthing terminal connection or a corroded earth clamp.
        </p>
        <SEOAppBridge
          title="R1+R2 calculator built into the app"
          description="Elec-Mate's R1+R2 calculator lets you look up expected values by cable size and length. Compare your measured R1+R2 against the calculated value to identify anomalies. The Zs calculator then uses your R1+R2 to verify your live loop impedance readings."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'how-to-test',
    heading: 'How to Perform R1+R2 Continuity Testing',
    content: (
      <>
        <p>
          There are two main methods for measuring R1+R2: the long lead method and the temporary
          link method. Both achieve the same result — measuring the series resistance of R1 and R2 —
          but the long lead method is more commonly used in practice because it allows you to test
          multiple circuits from a single setup at the distribution board.
        </p>
        <p>
          Before testing, you must have completed{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>.
          The circuit must be de-energised, locked off, and proved dead. All loads should be
          disconnected from the circuit to prevent parallel paths affecting your readings.
        </p>
        <p>
          Select the continuity function on your multifunction tester (MFT). This applies a low test
          voltage of between 4 and 24 V DC and measures resistance in ohms. The instrument should
          comply with BS EN 61557-4 for low-resistance measurement.
        </p>
      </>
    ),
  },
  {
    id: 'long-lead-method',
    heading: 'The Long Lead Method Explained',
    content: (
      <>
        <p>
          The long lead method is the standard technique for R1+R2 measurement on radial circuits.
          The procedure is as follows:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Long Lead Method — Step by Step</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1:</strong> Connect a temporary test lead
                (the "long lead") between the line terminal of the circuit MCB (or the line busbar)
                and the earth bar at the distribution board. This bridges R1 and R2 at the supply
                end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2:</strong> Null the test instrument —
                touch the probes together and press the zero/null button. This subtracts the
                resistance of the test leads and the long lead itself from all subsequent readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 3:</strong> Go to the furthest point of the
                circuit. Measure between the line terminal and the earth terminal at the accessory.
                The current path is: probe → line terminal → R1 (back to DB) → long lead → R2 (out
                to accessory) → earth terminal → probe. The reading is R1+R2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 4:</strong> Record the reading. Repeat at
                every accessory on the circuit if required, or at the furthest point only for the
                schedule of test results.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The temporary link method is an alternative where you create a temporary link between line
          and earth at the furthest point of the circuit (for example, by connecting a short lead
          between the L and E terminals at the last socket), then measure at the distribution board.
          This is less commonly used because it requires someone at the far end of the circuit to
          make the connection.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak R1+R2 values on site"
          description="With probes in one hand and the instrument in the other, use Elec-Mate's voice entry: 'Ring 1, R1+R2 0.32 ohms.' The app fills in the schedule of test results for you. No juggling clipboards."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'reading-results',
    heading: 'Reading and Recording R1+R2 Results',
    content: (
      <>
        <p>
          The R1+R2 reading is recorded in ohms (not megohms — that is insulation resistance). For
          most domestic circuits, R1+R2 values are typically between 0.1 and 2.0 ohms. The exact
          value depends on the cable length, the cross-sectional area of the conductors, and whether
          the CPC is the same size as the line conductor.
        </p>
        <p>
          The value is recorded in the R1+R2 column of the schedule of test results on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. It is used alongside
          the Ze measurement to calculate the expected Zs: Zs = Ze + (R1+R2). This calculated value
          is compared against the measured Zs obtained during live testing — the two should be
          approximately equal. Any significant discrepancy indicates a problem that requires
          investigation.
        </p>
        <p>
          When recording results, ensure you note which method was used (long lead or temporary
          link), confirm the leads were nulled, and record the value to two decimal places. The
          instrument should display readings to at least 0.01 ohm resolution.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-values',
    heading: 'Acceptable R1+R2 Values',
    content: (
      <>
        <p>
          BS 7671 does not specify a single maximum R1+R2 value. Instead, the acceptability of R1+R2
          depends entirely on the resulting Zs value for the circuit. The key question is: when you
          add R1+R2 to Ze, does the resulting Zs fall within the{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs
          </SEOInternalLink>{' '}
          for the protective device?
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Expected R1+R2 by Cable Size — Approximate Guide
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">1.0/1.0 mm² (L/CPC):</strong> Approximately 36.2
                mΩ/m combined. A 20 m cable run gives R1+R2 of approximately 0.72 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">1.5/1.0 mm² (L/CPC):</strong> Approximately 30.2
                mΩ/m combined. A 20 m cable run gives R1+R2 of approximately 0.60 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">2.5/1.5 mm² (L/CPC):</strong> Approximately
                19.51 mΩ/m combined. A 30 m cable run gives R1+R2 of approximately 0.59 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">4.0/1.5 mm² (L/CPC):</strong> Approximately
                16.71 mΩ/m combined. A 30 m cable run gives R1+R2 of approximately 0.50 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">6.0/2.5 mm² (L/CPC):</strong> Approximately
                10.49 mΩ/m combined. A 40 m cable run gives R1+R2 of approximately 0.42 ohms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your measured R1+R2 is significantly higher than the calculated expected value, this
          indicates a problem — typically a high-resistance joint, a damaged conductor, or a longer
          cable run than expected. If R1+R2 is lower than expected, check that the leads were
          properly nulled and that there are no parallel earth paths providing a lower-resistance
          route.
        </p>
      </>
    ),
  },
  {
    id: 'ring-circuit',
    heading: 'Ring Circuit Continuity Testing',
    content: (
      <>
        <p>
          Ring final circuit continuity testing follows a fundamentally different procedure from
          radial circuit testing. You cannot simply use the long lead method on a ring because both
          ends of the ring connect to the distribution board. The ring circuit test is a three-stage
          process that verifies the ring is complete, identifies faults, and provides the R1+R2
          value at the furthest point.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Ring Circuit Three-Stage Test</h3>
          <ul className="space-y-4 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-yellow-400">Stage 1 — End-to-end resistance:</strong>
                <p className="mt-1">
                  Disconnect both ends of the ring at the DB. Measure the resistance of each
                  conductor separately: r1 (line-to-line), rn (neutral-to-neutral), r2 (CPC-to-CPC).
                  For a healthy ring with no breaks, r1 and rn should be approximately equal (since
                  L and N are the same conductor size). r2 may differ if the CPC is a different size
                  (for example, 1.5 mm² CPC in 2.5 mm² twin-and-earth).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-yellow-400">
                  Stage 2 — Cross-connect L and N (figure-of-eight):
                </strong>
                <p className="mt-1">
                  Cross-connect the line and neutral conductors at one end of the ring — connect L1
                  to N2 and N1 to L2, where subscripts indicate the two ends. Measure between line
                  and neutral at each socket outlet on the ring. Readings should rise to a maximum
                  at the midpoint of approximately (r1+rn)/4, then fall back symmetrically. This
                  confirms the ring is intact with no breaks or cross-connections.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-yellow-400">Stage 3 — Cross-connect L and CPC:</strong>
                <p className="mt-1">
                  Cross-connect the line and CPC conductors and repeat the measurements at each
                  socket outlet. The maximum reading at the midpoint gives the R1+R2 value at the
                  furthest point of the ring, approximately (r1+r2)/4. This is the value recorded on
                  the schedule of test results and used for Zs verification.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Anomalies in the readings indicate specific faults: readings that do not rise and fall
          symmetrically suggest cross-connections between two rings; a very high reading at one
          socket suggests a high-resistance joint; readings that plateau rather than peaking suggest
          an interconnection; and readings that jump abruptly suggest a break in one leg of the ring
          operating as two radials.
        </p>
        <SEOAppBridge
          title="Board scanner populates your circuit list automatically"
          description="Point your phone at the distribution board and Elec-Mate's AI reads the MCB/RCBO ratings, circuit references, and board layout. Start the schedule of tests with the circuit data already filled in — no more typing out 20 circuits manually."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Continuity Testing Mistakes',
    content: (
      <>
        <p>
          Continuity testing appears simple but several common mistakes can produce incorrect
          results and lead to errors on the certificate.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not nulling the test leads</h3>
                <p className="text-white text-sm leading-relaxed">
                  Failing to null (zero) the leads before testing adds the lead resistance to every
                  reading. For short circuits with low R1+R2 values, this can be a significant error
                  — a 0.2 ohm lead resistance added to a 0.3 ohm circuit gives a 0.5 ohm reading, a
                  67% error. Always null before testing and re-null if leads are changed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Testing at the wrong point</h3>
                <p className="text-white text-sm leading-relaxed">
                  The R1+R2 value must be measured at the furthest point of the circuit, not the
                  nearest. Testing at the first socket on a radial gives a low R1+R2 that does not
                  represent the worst case. The schedule of test results requires the value at the
                  furthest point because this gives the highest R1+R2 and therefore the highest Zs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Forgetting to remove the long lead</h3>
                <p className="text-white text-sm leading-relaxed">
                  Leaving the temporary long lead connected between line and earth bars at the DB
                  after testing creates a direct short circuit path. When the circuit is
                  re-energised, the long lead will carry fault current and the MCB will trip
                  immediately — or worse, the lead may overheat. Always remove the long lead after
                  testing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Parallel earth paths on ring circuits</h3>
                <p className="text-white text-sm leading-relaxed">
                  If metallic services (gas pipes, water pipes) are bonded to the earthing system,
                  they provide parallel paths that can reduce R1+R2 readings and mask genuine
                  faults. For accurate ring circuit testing, supplementary bonding connections
                  should ideally be disconnected during testing, though this is not always
                  practical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'R1+R2 Testing with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides several tools specifically for continuity testing and R1+R2 recording.
          The schedule of tests auto-validates every R1+R2 value by comparing the resulting Zs (Ze +
          R1+R2) against the{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs
          </SEOInternalLink>{' '}
          for the protective device on that circuit. If the calculated Zs exceeds the BS 7671 limit,
          the app flags it immediately.
        </p>
        <SEOAppBridge
          title="Zs calculator uses your R1+R2 values"
          description="Enter your measured R1+R2 and Ze values, and Elec-Mate calculates the expected Zs automatically. Compare against your measured Zs to verify consistency. The app also looks up the maximum permitted Zs for the protective device type and rating."
          icon={Calculator}
        />
        <p>
          Voice-to-test-results lets you speak R1+R2 values while on site — just say the circuit
          number and reading. The{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing">
            insulation resistance
          </SEOInternalLink>{' '}
          readings,{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            Zs values
          </SEOInternalLink>
          , and{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD trip times</SEOInternalLink> are
          all recorded in the same digital schedule of tests with automatic BS 7671 validation
          across every value.
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
      'Test voltages, minimum values, conductor combinations, causes of low readings, three-phase testing.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description: 'Ze, Zs, how R1+R2 feeds into Zs calculation, maximum permitted values.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Complete table of maximum Zs values by MCB type and rating, 0.8 correction factor.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3. Continuity is test number one.',
    icon: ClipboardCheck,
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
    description: 'R1+R2 calculator, Zs lookup, cable sizing, voltage drop, PFC, and dozens more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ContinuityTestingR1R2Page() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-10-25"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Continuity Testing R1+R2:{' '}
          <span className="text-yellow-400">How to Test Protective Conductors</span>
        </>
      }
      heroSubtitle="The complete guide to R1+R2 continuity testing for UK electricians. What R1+R2 is, why it matters for Zs calculation, the long lead method, ring circuit continuity testing, acceptable values, and common mistakes to avoid. BS 7671 compliant."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Test R1+R2 — Step by Step"
      howToDescription="Step-by-step R1+R2 continuity testing procedure using the long lead method, per BS 7671 and IET Guidance Note 3."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Auto-validate R1+R2 and Zs values on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. R1+R2 calculator, Zs lookup, voice test entry, board scanner. 7-day free trial, cancel anytime."
    />
  );
}
