import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  Info,
  CircleDot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Continuity Testing Guide', href: '/continuity-testing-guide' },
];

const tocItems = [
  { id: 'what-is-continuity-testing', label: 'What Is Continuity Testing?' },
  { id: 'ring-final-test-1', label: 'Ring Final: End-to-End Test' },
  { id: 'ring-final-test-2', label: 'Ring Final: Cross-Connected Test' },
  { id: 'r1-rn-r2-values', label: 'r1, rn, and r2 Values Explained' },
  { id: 'cpc-continuity', label: 'CPC Continuity Testing' },
  { id: 'bonding-conductors', label: 'Bonding Conductor Continuity' },
  { id: 'test-method', label: 'Test Method and Instrument Use' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Continuity testing verifies that all conductors are connected end-to-end with no open circuits, and that protective conductors (CPCs) provide an unbroken path back to the main earthing terminal.',
  'Ring final circuit testing requires two stages: an end-to-end resistance test of each conductor leg, followed by a cross-connected test to derive r1+rn (or r1+r2) at each socket outlet.',
  'For a ring final circuit, the maximum r1+rn value at any outlet should not exceed 0.05Ω more than the value at the consumer unit end. A higher value indicates a spur rather than a ring, or an incorrect connection.',
  'CPC continuity must be tested on every circuit. The measured r2 value (resistance of the CPC from the consumer unit to the furthest point) is used to derive Zs (total earth loop impedance) without applying live voltage.',
  'Bonding conductor continuity testing (main and supplementary bonding) requires the bonding conductor to be temporarily disconnected from the earthed metalwork at one end to avoid the instrument current flowing through the general mass of earth.',
];

const faqs = [
  {
    question: 'What is continuity testing and why is it required?',
    answer:
      'Continuity testing verifies that all conductors in a circuit are intact — that there are no open circuits, broken connections, or missing conductor runs. It is a mandatory test under BS 7671 Chapter 61 for all new installations and forms part of the periodic inspection (EICR). The test confirms that line, neutral, and protective conductors are all connected end-to-end. For ring final circuits, it additionally verifies the integrity of the ring — confirming that the circuit forms a complete loop and has not been incorrectly wired as a spur.',
  },
  {
    question: 'How do you test a ring final circuit for continuity?',
    answer:
      'Ring final circuit continuity requires two tests. First, the end-to-end test: disconnect the ring at the consumer unit and measure the resistance of the complete loop of each conductor — line, neutral, and CPC. Both ends of each conductor are measured with the meter connected end-to-end. Second, the cross-connected test: reconnect the ring at the consumer unit but transpose the connections (cross the line of one leg with the neutral of the other, and vice versa). Then measure resistance from the line to neutral at each outlet. This gives the r1+rn value at each point. For a true ring, the resistance at each outlet should be approximately one quarter of the total ring resistance and should be similar at all outlets.',
  },
  {
    question: 'What are r1, rn, and r2 values?',
    answer:
      'r1 is the resistance of the line conductor from the consumer unit to the furthest point on the circuit. rn is the resistance of the neutral conductor over the same route. r2 is the resistance of the CPC (circuit protective conductor) from the consumer unit to the furthest point. These values are measured during the cross-connected ring final test and recorded on the schedule of test results. The r1+r2 value at the furthest point is used to calculate Zs (total earth loop impedance) without live testing: Zs = Ze + (r1+r2), where Ze is the external earth loop impedance.',
  },
  {
    question: 'How do you test CPC continuity?',
    answer:
      'CPC continuity is tested by disconnecting one end of the CPC from the main earthing terminal (or the earth bar at the consumer unit) and connecting the instrument between the disconnected end and the other end of the CPC at the furthest point of the circuit. For a ring final circuit, the cross-connected test gives the r2 value directly. For a radial circuit, measure the resistance from the consumer unit earth bar to the earth terminal of the furthest accessory on the circuit. The value obtained (r2) must not be so high that Zs would exceed the maximum permitted value for the protective device.',
  },
  {
    question: 'What resistance value should continuity tests give?',
    answer:
      'Continuity testing does not have a single prescribed pass/fail resistance value. The result must be low enough that the CPC will permit sufficient fault current to flow to operate the protective device within the required disconnection time. The r2 value combined with Ze must give a Zs value within the maximum permitted for the protective device (per BS 7671 Appendix 3). For main and supplementary bonding conductors, the resistance should be very low — typically below 0.05Ω for main equipotential bonding conductors.',
  },
  {
    question: 'Why must bonding conductors be disconnected at one end before testing?',
    answer:
      'Main and supplementary bonding conductors connect metallic parts of the installation to the main earthing terminal. If you test a bonding conductor while both ends are connected, the instrument current has a parallel path through the general mass of earth. This gives an unreliably low reading that does not reflect the resistance of the bonding conductor itself. Disconnect the bonding conductor at one end (typically at the metalwork or pipework clamp), measure the resistance of the conductor, then reconnect it. Always verify continuity is restored after reconnection.',
  },
  {
    question: 'What does a high continuity reading indicate?',
    answer:
      'A higher than expected continuity reading indicates increased resistance in the conductor path. Common causes include: a loose or corroded connection at an accessory or junction; undersized conductors (the resistance increases with smaller cross-sectional area and greater length); a broken or partially broken conductor; a spur connection that was incorrectly identified as part of a ring; incorrect polarity of connections causing extra resistance through additional terminations; or a high-resistance joint caused by overheating or mechanical damage.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/insulation-resistance-testing-guide',
    title: 'Insulation Resistance Testing Guide',
    description: 'Test voltages, minimum values, disconnecting components, and interpreting IR results.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/loop-impedance-testing-guide',
    title: 'Loop Impedance Testing Guide',
    description: 'Ze, Zs, and prospective fault current testing explained.',
    icon: CircleDot,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Half-rated, rated, and 5× current RCD test procedures.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/polarity-test-guide',
    title: 'Polarity Testing Guide',
    description: 'Polarity test methods, common errors, and how to trace them.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-continuity-testing',
    heading: 'What Is Continuity Testing?',
    content: (
      <>
        <p>
          Continuity testing is the verification that all conductors in an electrical installation
          are intact and properly connected — that current can flow unimpeded from one end of a
          conductor to the other with no open circuits or high-resistance joints. It is a mandatory
          test under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Chapter 61 and must be carried out on all circuits during initial verification of a new
          installation (EIC) and during every periodic inspection (EICR).
        </p>
        <p>
          Continuity tests cover three separate requirements:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring final circuit continuity</strong>: Verifying that socket outlet circuits
                wired as a ring form a complete loop with no spurious spurs or incorrectly wired
                connections (Regulation 612.2.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC continuity</strong>: Confirming that every circuit has an unbroken
                protective conductor connecting all exposed-conductive-parts to the main earthing
                terminal (Regulation 612.2.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding conductor continuity</strong>: Verifying that main
                equipotential bonding conductors and supplementary bonding conductors are intact and
                properly connected (Regulation 612.2.2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Continuity tests are performed with the installation de-energised using a low-resistance
          ohmmeter (often a combined multifunction test instrument). The instrument injects a test
          current and measures the voltage drop, deriving the resistance of the conductor path.
        </p>
      </>
    ),
  },
  {
    id: 'ring-final-test-1',
    heading: 'Ring Final Circuit Test 1 — End-to-End Resistance',
    content: (
      <>
        <p>
          The first stage of ring final circuit testing measures the total loop resistance of each
          conductor, confirming that the ring is complete and giving reference values for the
          cross-connected test that follows.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Isolate the circuit</strong>: Switch off and isolate the circuit at the
              consumer unit. Prove dead at the consumer unit terminals.
            </li>
            <li>
              <strong>Disconnect the ring at the consumer unit</strong>: Disconnect both ends of
              the line conductor from the MCB (or fuse), both ends of the neutral from the neutral
              bar, and both ends of the CPC from the earth bar. You now have two separate legs of
              the ring — leg A and leg B.
            </li>
            <li>
              <strong>Measure end-to-end resistance of the line conductor</strong>: Join one end of
              leg A to one end of leg B (link the two line conductor ends together at the consumer
              unit). Connect the instrument between the remaining free ends of the line conductor
              loop. The reading is the total resistance of the line conductor around the full ring.
              Record this as R1 (line total).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the neutral conductor</strong>: Repeat the
              same process with the neutral conductors. Record as Rn (neutral total).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the CPC</strong>: Repeat with the CPCs.
              Record as R2 (CPC total).
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Expected values</strong>: For a 2.5mm² line and neutral conductor (typical for
              a 32A ring final circuit in flat twin-and-earth cable), expect approximately 7.41Ω per
              km (at 20°C) for copper conductor resistance. A 30-metre ring (60m of cable length
              total) would give a loop resistance of approximately 0.44Ω for the line conductor.
              Values significantly higher than expected for the cable run length indicate a fault.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ring-final-test-2',
    heading: 'Ring Final Circuit Test 2 — Cross-Connected Test',
    content: (
      <>
        <p>
          The cross-connected test is the definitive ring final circuit check. It derives the r1+rn
          value at every socket outlet on the ring, confirming that every outlet is genuinely on the
          ring and not a spur, and that connections are correct throughout.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Cross-connect at the consumer unit</strong>: Take one end of the line conductor
              (leg A) and connect it together with the opposite leg's neutral conductor (leg B
              neutral). Take the other line conductor end (leg B) and connect it with leg A neutral.
              This transposition means the instrument now sees the line of one ring leg in series
              with the neutral of the other.
            </li>
            <li>
              <strong>Do the same for the CPC if testing r1+r2</strong>: Cross-connect the two CPC
              ends together at the consumer unit (join leg A CPC end to leg B CPC end). This gives
              r1+r2 at each outlet when testing between line and earth.
            </li>
            <li>
              <strong>Test at each outlet</strong>: At every socket outlet on the ring, connect the
              instrument between line and neutral terminals. Record the resistance. This is the r1+rn
              value at that outlet.
            </li>
            <li>
              <strong>Test r1+r2 at each outlet</strong>: Connect the instrument between line and
              earth at each outlet. This gives r1+r2, which combined with Ze gives Zs.
            </li>
          </ol>
        </div>
        <p>
          For a correctly wired ring, the r1+rn value at every outlet should be approximately equal
          to one quarter of the sum of R1 and Rn (the end-to-end totals from Test 1). Outlets
          directly connected as spurs will show a higher reading. Outlets at opposite ends of the
          ring will show a reading close to R1+Rn divided by 4; outlets near the consumer unit will
          show a lower reading.
        </p>
      </>
    ),
  },
  {
    id: 'r1-rn-r2-values',
    heading: 'r1, rn, and r2 Values Explained',
    content: (
      <>
        <p>
          The lowercase notation (r1, rn, r2) refers to the resistance of the relevant conductor
          from the origin of the circuit to the point being tested — not the full loop resistance.
          These are the values recorded on the schedule of test results.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>r1</strong>: Resistance of the line conductor from the consumer unit to the
                furthest point on the circuit. For a ring, derived from the cross-connected test
                (r1 = measured r1+rn value ÷ 2 if line and neutral have equal resistance). For a
                radial, measured directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>rn</strong>: Resistance of the neutral conductor from the consumer unit to
                the furthest point. Derived from the cross-connected test. For standard flat
                twin-and-earth cable where line and neutral are the same size, r1 and rn are equal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>r2</strong>: Resistance of the CPC from the consumer unit to the furthest
                point. This is the most critical value. Combined with Ze, it gives Zs without
                applying live voltage: Zs = Ze + (r1 + r2). This calculated Zs must not exceed
                the maximum Zs for the protective device.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Note on CPC size</strong>: In flat twin-and-earth cable, the CPC is typically
              smaller than the line and neutral conductors (1.0mm² CPC in 1.5mm² T&E, 1.5mm² CPC
              in 2.5mm² T&E). This means r2 is higher than r1 and rn, and the r1+r2 value will be
              higher than the r1+rn value at the same point on the ring. This is normal and expected.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cpc-continuity',
    heading: 'CPC Continuity Testing',
    content: (
      <>
        <p>
          Circuit protective conductor (CPC) continuity must be verified for every circuit in the
          installation — not just ring final circuits. This test confirms that there is an unbroken
          earth path from every exposed-conductive-part back to the main earthing terminal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radial circuit method</strong>: Disconnect the CPC at the consumer unit
                earth bar. Use a long wander lead to connect from the disconnected CPC end at the
                consumer unit to the test instrument's one terminal. Connect the other terminal to
                the earth terminal at the furthest accessory on the circuit. The reading is r2
                for that circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alternative method using instrument leads</strong>: Where a long wander lead
                is not available, the instrument can be "zeroed" with the leads joined, then the
                leads extended to reach the distant point. Some instruments allow lead resistance to
                be nulled out of the reading. Always null or compensate for lead resistance,
                particularly on short runs where lead resistance may be significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What constitutes a CPC?</strong>: On modern installations, the CPC is
                usually the bare or green-and-yellow conductor in the cable sheath. On older
                installations, conduit, trunking, or armour may serve as the CPC. Test the actual
                protective conductor, not just a parallel path that may be present.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bonding-conductors',
    heading: 'Bonding Conductor Continuity Testing',
    content: (
      <>
        <p>
          Main equipotential bonding conductors connect extraneous-conductive-parts (gas, water,
          and oil pipework; structural metalwork entering or passing through the building) to the
          main earthing terminal. Supplementary bonding connects simultaneously accessible parts
          in special locations (such as bathrooms). Both must be verified for continuity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnect at one end before testing</strong>: This is essential. If both
                ends of the bonding conductor remain connected, the test current flows through the
                general mass of earth and the general bonding network rather than through the
                conductor itself. The result is unreliably low and meaningless. Disconnect the
                bonding conductor at the metalwork clamp (not at the main earthing terminal, as
                this is more difficult to access safely).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Expected resistance values</strong>: Main equipotential bonding conductors
                are short and of large cross-sectional area (minimum 6mm² copper for TN systems
                per BS 7671 Table 54.8). The resistance should be very low — typically 0.05Ω or
                less. Higher values indicate a poor connection at a clamp, a corroded conductor, or
                a join in the bonding conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reconnect and verify</strong>: After testing, reconnect the bonding conductor
                and test again with both ends connected to confirm continuity is restored. Never leave
                bonding conductors disconnected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-method',
    heading: 'Test Method and Instrument Use',
    content: (
      <>
        <p>
          Continuity testing requires a low-resistance ohmmeter capable of passing a test current
          of at least 200mA (as specified in BS EN 61557-4). This distinguishes a proper
          continuity test from a simple resistance measurement — the higher current helps identify
          high-resistance joints that may pass at low test currents but fail under load.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Null the lead resistance</strong>: Before any continuity test, short the
                instrument leads together and record or null the lead resistance. On modern
                multifunction instruments this is done automatically. On analogue instruments,
                adjust the zero setting. Failing to null lead resistance causes every reading to be
                higher than the true conductor resistance by the lead resistance value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a wander lead for distant tests</strong>: A wander lead (a long
                single-conductor test lead, typically 10m to 25m) allows one instrument terminal
                to remain at the consumer unit while the other is taken to the furthest point of
                the circuit. Factor the wander lead resistance into the null reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instrument calibration</strong>: The continuity test instrument must be
                calibrated to a traceable standard and within its calibration period. Record the
                instrument make, model, serial number, and calibration expiry date on the
                certificate or test schedule.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Results on the Schedule of Test Results',
    content: (
      <>
        <p>
          Continuity test results are recorded on the Schedule of Test Results, which forms part of
          the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate or EICR
          </SEOInternalLink>
          . The following information must be recorded for each circuit:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>r1+rn (MΩ)</strong>: The measured r1+rn resistance at the furthest point
                of the circuit, in ohms. For ring final circuits, this is the value at the furthest
                outlet derived from the cross-connected test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>r1+r2 (Ω)</strong>: The measured r1+r2 resistance at the furthest point of
                the circuit. This is used to calculate Zs without live testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring final continuity</strong>: For ring final circuits, record the
                end-to-end values (R1, Rn, R2) from Test 1, and the r1+rn and r1+r2 values from
                the cross-connected test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding conductor continuity</strong>: Record the measured resistance of
                each bonding conductor tested. Note where the bonding conductor was disconnected
                for the test.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Enter test results on site — no evening paperwork"
          description="The Elec-Mate testing app records r1+rn, r1+r2, and ring final continuity results on your phone. Auto-populates the schedule of test results and exports a compliant PDF. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Continuity Testing Efficiently',
    content: (
      <>
        <p>
          Continuity testing, done methodically, takes a few minutes per circuit. The steps are
          straightforward but must be followed in order — particularly the nulling of lead resistance
          and the disconnection of bonding conductors before testing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Test Schedules On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate schedule of tests
                  </SEOInternalLink>{' '}
                  to enter continuity, IR, loop impedance, and RCD results on your phone as you
                  test. The schedule auto-populates and the PDF is ready before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Derive Zs Without Live Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Recording accurate r1+r2 values during the continuity test means you can calculate
                  Zs for every circuit without applying a live loop impedance test. Particularly
                  useful where live testing is not practical or where RCDs prevent accurate live
                  loop impedance measurement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ContinuityTestingGuidePage() {
  return (
    <GuideTemplate
      title="Continuity Testing Guide UK | Ring Final Circuit & CPC Testing"
      description="Complete guide to continuity testing for UK electricians. Ring final circuit end-to-end and cross-connected tests, r1+rn and r2 values, CPC continuity, bonding conductor testing, and recording results."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CheckCircle2}
      heroTitle={
        <>
          Continuity Testing Guide:{' '}
          <span className="text-yellow-400">Ring Final Circuit & CPC Testing</span>
        </>
      }
      heroSubtitle="The complete UK electrician's guide to continuity testing — ring final circuit end-to-end and cross-connected tests, r1+rn, r2, and r1+r2 values, CPC continuity, bonding conductor testing, and recording results on the schedule of test results."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Continuity Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Continuity Test Results On Site with Elec-Mate"
      ctaSubheading="Enter ring final circuit, CPC, and bonding continuity results on your phone. Auto-populates the schedule of test results and exports a compliant PDF. 7-day free trial."
    />
  );
}
