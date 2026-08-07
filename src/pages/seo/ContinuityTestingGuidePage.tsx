import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  CircleDot,
  Calculator,
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
  { id: 'r1-rn-r2-values', label: 'r1, rn, r2 and R1+R2 Explained' },
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
  'Ring final circuit testing requires two stages: an end-to-end resistance test of each conductor loop (r1, rn, r2), followed by a cross-connected test to derive R1+Rn (or R1+R2) at each socket outlet.',
  'For a ring final circuit, GN3 states the cross-connected readings taken at every socket outlet on the ring should be substantially the same, at approximately one quarter of the sum of the end-to-end values — R1+Rn ≈ (r1+rn)/4. A noticeably higher reading indicates a spur rather than a point on the ring, or an incorrect connection.',
  'CPC continuity must be tested on every circuit. The R1+R2 value measured at the furthest point — or, on a ring final circuit, the highest reading found around the circuit — is added to Ze to give Zs (total earth fault loop impedance) without applying live voltage.',
  'Bonding conductor continuity testing (main and supplementary bonding) requires the bonding conductor to be temporarily disconnected from the earthed metalwork at one end to avoid the instrument current flowing through the general mass of earth.',
];

const faqs = [
  {
    question: 'What is continuity testing and why is it required?',
    answer:
      'Continuity testing verifies that all conductors in a circuit are intact — that there are no open circuits, broken connections, or missing conductor runs. It is a mandatory test under BS 7671 Chapter 64 (Reg 643.2.1) for all new installations and forms part of the periodic inspection (EICR). The test confirms that line, neutral, and protective conductors are all connected end-to-end. For ring final circuits, it additionally verifies the integrity of the ring — confirming that the circuit forms a complete loop and has not been incorrectly wired as a spur.',
  },
  {
    question: 'How do you test a ring final circuit for continuity?',
    answer:
      'Ring final circuit continuity requires two tests. First, the end-to-end test: disconnect the ring at the consumer unit and measure the resistance of the complete loop of each conductor — line, neutral, and CPC. These end-to-end readings are recorded as r1, rn and r2. Second, the cross-connected test: reconnect the ring at the consumer unit but transpose the connections (cross the line of one leg with the neutral of the other, and vice versa). Then measure resistance from the line to neutral at each outlet. This gives the R1+Rn value at each point. For a true ring, the reading at each outlet should be approximately one quarter of the sum of the end-to-end line and neutral readings — (r1+rn)/4 — and GN3 states the readings at each socket outlet should be substantially the same.',
  },
  {
    question: 'What are r1, rn, and r2 values?',
    answer:
      'In the GN3 ring final circuit procedure the lowercase values are the end-to-end (open loop) readings taken at step 1: r1 is the resistance of the complete line conductor loop, rn the complete neutral loop, and r2 the complete CPC loop, each measured with the ring disconnected at the consumer unit. The uppercase values are what the cross-connected test gives you at each outlet: R1+Rn between line and neutral, and R1+R2 between line and earth. R1+R2 is the value recorded on the schedule of test results, and it is used to calculate Zs (total earth fault loop impedance) without live testing: Zs = Ze + (R1+R2), where Ze is the external earth fault loop impedance.',
  },
  {
    question: 'How do you test CPC continuity?',
    answer:
      'CPC continuity is tested by disconnecting one end of the CPC from the main earthing terminal (or the earth bar at the consumer unit) and connecting the instrument between the disconnected end and the other end of the CPC at the furthest point of the circuit. For a ring final circuit, the cross-connected test gives R1+R2 directly at each outlet. For a radial circuit, measure the resistance from the consumer unit earth bar to the earth terminal of the furthest accessory on the circuit. The value obtained (R2) must not be so high that Zs would exceed the maximum permitted value for the protective device.',
  },
  {
    question: 'What resistance value should continuity tests give?',
    answer:
      'Continuity testing does not have a single prescribed pass/fail resistance value. Regulation 643.2.1 requires the measurement but states no numeric maximum. The result must be low enough that the CPC will permit sufficient fault current to flow to operate the protective device within the required disconnection time. The R1+R2 value combined with Ze must give a Zs value within the maximum permitted for the protective device — the maximum earth fault loop impedance tables are BS 7671 Tables 41.2 to 41.5. For main and supplementary bonding conductors, the resistance should be very low — a working figure of 0.05Ω or less is commonly used in the trade for main protective bonding, though BS 7671 itself does not prescribe one.',
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
    href: '/guides/earth-fault-loop-impedance-calculation',
    title: 'Earth Fault Loop Impedance Calculation',
    description:
      'The Zs = Ze + (R1+R2) formula step by step — temperature correction, maximum values and worked examples.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing Guide',
    description:
      'Test voltages, minimum values, disconnecting components, and interpreting IR results.',
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
    description:
      'The current RCD test procedure to BS 7671 and the maximum operating times that apply.',
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
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Chapter 64 (Reg 643.2.1) and must be carried out on all circuits during initial
          verification of a new installation (EIC) and during every periodic inspection (EICR).
        </p>
        <p>Continuity tests cover three separate requirements:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Ring final circuit continuity</strong>: Verifying that socket outlet
                circuits wired as a ring form a complete loop with no spurious spurs or incorrectly
                wired connections (Regulation 643.2.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>CPC continuity</strong>: Confirming that every circuit has an unbroken
                protective conductor connecting all exposed-conductive-parts to the main earthing
                terminal (Regulation 643.2.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Equipotential bonding conductor continuity</strong>: Verifying that main
                equipotential bonding conductors and supplementary bonding conductors are intact and
                properly connected (Regulation 643.2.1).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note that Reg 643.2.1 requires live conductor (line and neutral) resistance measurement
          specifically for ring final circuits. For radial circuits, only the CPC continuity
          measurement is required under this regulation — there is no BS 7671 requirement to measure
          the resistance of the line and neutral conductors of a radial circuit as a separate
          continuity test.
        </p>
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
              <strong>Disconnect the ring at the consumer unit</strong>: Disconnect both ends of the
              line conductor from the MCB (or fuse), both ends of the neutral from the neutral bar,
              and both ends of the CPC from the earth bar. You now have two separate legs of the
              ring — leg A and leg B.
            </li>
            <li>
              <strong>Measure end-to-end resistance of the line conductor</strong>: Join one end of
              leg A to one end of leg B (link the two line conductor ends together at the consumer
              unit). Connect the instrument between the remaining free ends of the line conductor
              loop. The reading is the total resistance of the line conductor around the full ring.
              Record this as r1 (line end-to-end).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the neutral conductor</strong>: Repeat the
              same process with the neutral conductors. Record as rn (neutral end-to-end).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the CPC</strong>: Repeat with the CPCs.
              Record as r2 (CPC end-to-end).
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <span className="text-white">
              <strong>Expected values</strong>: For a 2.5mm² line and neutral conductor (typical for
              a 32A ring final circuit in flat twin-and-earth cable), copper conductor resistance is
              7.41 mΩ/m — 7.41Ω per km — at 20°C (GN3 Appendix B). A ring with 60m of cable in the
              loop would give an end-to-end r1 of approximately 0.44Ω. Values significantly higher
              than expected for the cable run length indicate a high-resistance joint; a reading
              significantly <em>lower</em> than expected suggests the circuit is not a true ring —
              see the figure-of-eight note below.
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
          The cross-connected test is the definitive ring final circuit check. It derives the R1+Rn
          value at every socket outlet on the ring, confirming that every outlet is genuinely on the
          ring and not a spur, and that connections are correct throughout.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Cross-connect at the consumer unit</strong>: Take one end of the line
              conductor (leg A) and connect it together with the opposite leg's neutral conductor
              (leg B neutral). Take the other line conductor end (leg B) and connect it with leg A
              neutral. This transposition means the instrument now sees the line of one ring leg in
              series with the neutral of the other.
            </li>
            <li>
              <strong>Do the same for the CPC if testing R1+R2</strong>: Cross-connect the line and
              CPC ends of opposite legs at the consumer unit. This gives R1+R2 at each outlet when
              testing between line and earth.
            </li>
            <li>
              <strong>Test at each outlet</strong>: At every socket outlet on the ring, connect the
              instrument between line and neutral terminals. Record the resistance. This is the
              R1+Rn value at that outlet.
            </li>
            <li>
              <strong>Test R1+R2 at each outlet</strong>: Connect the instrument between line and
              earth at each outlet. This gives R1+R2, which combined with Ze gives Zs. GN3 requires
              the highest R1+R2 found on the circuit — usually at a socket wired as a spur — to be
              the value recorded on the schedule of test results and used for the Zs calculation.
            </li>
          </ol>
        </div>
        <p>
          For a correctly wired ring, the R1+Rn value at every outlet should be approximately equal
          to one quarter of the sum of r1 and rn (the end-to-end totals from Test 1) — R1+Rn ≈
          (r1+rn)/4 — and GN3 states the readings taken at each socket outlet on the ring should be
          substantially the same. That consistency is the point of the test: a reading that climbs
          towards the middle of the ring and falls away again indicates the line and neutral have
          not been cross-connected to opposite legs. Outlets connected as spurs will show a higher
          reading than the rest of the ring.
        </p>
        <p>
          The line-to-earth readings behave slightly differently. Where the CPC is a smaller
          cross-sectional area than the line conductor — as in standard flat twin-and-earth — the
          R1+R2 readings will not be identical around the ring, and GN3 tabulates the expected
          spread between the lowest and highest reading for common conductor pairings.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <div className="flex items-start gap-3">
            <span className="text-white">
              <strong>Figure-of-eight fault</strong>: GN3 identifies this as a specific diagnostic
              outcome of the three-step ring test. A figure-of-eight occurs when the ring cable is
              cut and rejoined incorrectly at an intermediate point, so the circuit appears
              continuous but the conductors are actually looped back on themselves. It shows up
              first in Test 1: the end-to-end reading comes out <em>lower</em> than the value you
              would expect from the cable length and cross-sectional area, because the measurement
              is no longer following the full route. GN3 then directs you to confirm the suspicion
              with the cross-connected line-to-neutral measurement and by visually inspecting the
              wiring for misconnections. This is also why line, neutral and CPC must be measured
              separately in Test 1 — measuring them together can mask the fault.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'r1-rn-r2-values',
    heading: 'r1, rn, r2 and R1+R2 Explained',
    content: (
      <>
        <p>
          The case of the letter matters, and getting it the wrong way round is a common source of
          confusion. In the GN3 ring final circuit procedure, the <strong>lowercase</strong> values
          are the end-to-end (open loop) readings taken at step 1, with the ring split at the
          consumer unit. The <strong>uppercase</strong> values are the circuit values the
          cross-connected test produces at each outlet, and R1+R2 is what goes on the schedule of
          test results.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>r1</strong>: End-to-end resistance of the complete line conductor loop of
                the ring, measured in Test 1 with both ends free at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>rn</strong>: End-to-end resistance of the complete neutral loop. For
                standard flat twin-and-earth cable, where line and neutral are the same size, r1 and
                rn should come out substantially equal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>r2</strong>: End-to-end resistance of the complete CPC loop. In flat
                twin-and-earth the CPC is a smaller size than the line and neutral, so r2 is
                correspondingly higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>R1+Rn</strong>: The line-to-neutral reading at each socket outlet during the
                cross-connected test. For a correctly wired ring it is approximately (r1+rn)/4 and
                is substantially the same at every outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>R1+R2</strong>: The line-to-earth reading at each socket outlet, and the
                most important value on the test sheet. Combined with Ze it gives Zs without
                applying live voltage: Zs = Ze + (R1 + R2) — see our{' '}
                <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                  earth fault loop impedance calculation guide
                </SEOInternalLink>{' '}
                for the full method. This calculated Zs must not exceed the maximum Zs for the
                protective device. GN3 requires the highest R1+R2 found on the circuit to be the one
                recorded and used.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <div className="flex items-start gap-3">
            <span className="text-white">
              <strong>Note on CPC size</strong>: In flat twin-and-earth cable, the CPC is typically
              smaller than the line and neutral conductors (1.0mm² CPC in 1.5mm² T&E, 1.5mm² CPC in
              2.5mm² T&E). This means r2 is higher than r1 and rn, and the R1+R2 value will be
              higher than the R1+Rn value at the same point on the ring. This is normal and
              expected. GN3 also notes that with an unequal CPC the R1+R2 readings will not be
              identical at every outlet, and tabulates the expected spread around the ring.
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
              <span>
                <strong>Radial circuit method</strong>: Disconnect the CPC at the consumer unit
                earth bar. Use a long wander lead to connect from the disconnected CPC end at the
                consumer unit to the test instrument's one terminal. Connect the other terminal to
                the earth terminal at the furthest accessory on the circuit. The reading is R2 for
                that circuit. GN3 requires the measurement to be repeated at each utilisation point,
                switch and termination, not taken once.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Alternative method using instrument leads</strong>: Where a long wander lead
                is not available, the instrument can be "zeroed" with the leads joined, then the
                leads extended to reach the distant point. Some instruments allow lead resistance to
                be nulled out of the reading. Always null or compensate for lead resistance,
                particularly on short runs where lead resistance may be significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
          Main equipotential bonding conductors connect extraneous-conductive-parts (gas, water, and
          oil pipework; structural metalwork entering or passing through the building) to the main
          earthing terminal. Supplementary bonding connects simultaneously accessible parts in
          special locations (such as bathrooms). Both must be verified for continuity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Disconnect at one end before testing</strong>: This is essential. If both
                ends of the bonding conductor remain connected, the test current flows through the
                general mass of earth and the general bonding network rather than through the
                conductor itself. The result is unreliably low and meaningless. Disconnect the
                bonding conductor at the metalwork clamp (not at the main earthing terminal, as this
                is more difficult to access safely).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Expected resistance values</strong>: Main equipotential bonding conductors
                are short and of large cross-sectional area. Under BS 7671 Reg 544.1.1 / Table 54.8,
                where the supply PEN conductor is 35mm² or less (the normal domestic TN-C-S case),
                the minimum copper main protective bonding conductor is 10mm². The resistance should
                be very low — typically 0.05Ω or less. Higher values indicate a poor connection at a
                clamp, a corroded conductor, or a join in the bonding conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Reconnect and verify</strong>: After testing, reconnect the bonding
                conductor and test again with both ends connected to confirm continuity is restored.
                Never leave bonding conductors disconnected.
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
          Continuity testing is carried out with a low-resistance ohmmeter. GN3 recommends a test
          source with a no-load voltage between 4V and 24V and a short-circuit current of not less
          than 200mA, and states that an instrument conforming to BS EN IEC 61557-4 will meet those
          requirements. This distinguishes a proper continuity test from a simple resistance
          measurement — the higher current helps identify high-resistance joints that may pass at
          low test currents but fail under load.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Null the lead resistance</strong>: Before any continuity test, short the
                instrument leads together and record or null the lead resistance. On modern
                multifunction instruments this is done automatically. On analogue instruments,
                adjust the zero setting. Failing to null lead resistance causes every reading to be
                higher than the true conductor resistance by the lead resistance value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Use a wander lead for distant tests</strong>: A wander lead (a long
                single-conductor test lead, typically 10m to 25m) allows one instrument terminal to
                remain at the consumer unit while the other is taken to the furthest point of the
                circuit. Factor the wander lead resistance into the null reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span>
                <strong>R1+Rn (Ω)</strong>: The measured line-to-neutral resistance from the
                cross-connected test, in ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>R1+R2 (Ω)</strong>: The measured line-to-earth resistance. Record the
                highest value found on the circuit — on a radial that is normally the furthest
                point, and on a ring it is usually a socket wired as a spur. This is the value used
                to calculate Zs without live testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Ring final continuity</strong>: For ring final circuits, record the
                end-to-end values (r1, rn, r2) from Test 1, and the R1+Rn and R1+R2 values from the
                cross-connected test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Bonding conductor continuity</strong>: Record the measured resistance of
                each bonding conductor tested. Note where the bonding conductor was disconnected for
                the test.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Continuity Testing (R1+R2): Acceptable Results (BS 7671)"
          description="How to test CPC continuity (R1+R2) and what results are acceptable. Step-by-step method, expected values and pass or fail criteria to BS 7671."
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
          straightforward but must be followed in order — particularly the nulling of lead
          resistance and the disconnection of bonding conductors before testing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
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
              <div>
                <h4 className="font-bold text-white mb-1">Derive Zs Without Live Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Recording accurate R1+R2 values during the continuity test means you can calculate
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
      title="R1+R2 & CPC Continuity: Ring R1+Rn = (r1+rn)/4"
      description="Acceptable R1+R2: no single pass value — Zs (Ze+R1+R2) must stay under the BS 7671 Table 41.2–41.5 maximum. Ring R1+Rn ≈ (r1+rn)/4 at every outlet."
      datePublished="2026-03-27"
      dateModified="2026-07-02"
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
      heroSubtitle="The complete UK electrician's guide to continuity testing — ring final circuit end-to-end and cross-connected tests, r1, rn and r2, R1+Rn and R1+R2 values, CPC continuity, bonding conductor testing, and recording results on the schedule of test results."
      readingTime={13}
      answerBox={{
        question: 'What is an acceptable R1+R2 reading?',
        answer:
          'There is no single pass or fail figure for R1+R2 — the measured value must be low enough that Zs (Ze + R1+R2) stays within the maximum for the protective device in BS 7671 Tables 41.2 to 41.5. Compare your reading against the expected R1+R2 for the cable type and length; a much higher value points to a loose or high-resistance connection.',
      }}
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
