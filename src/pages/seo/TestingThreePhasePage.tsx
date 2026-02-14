import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Gauge,
  Activity,
  Shield,
  Zap,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  RotateCcw,
  ArrowRightLeft,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Testing a Three Phase Installation | Procedure Guide';
const PAGE_DESCRIPTION =
  'Complete guide to testing three-phase electrical installations. Phase rotation, voltage measurement, PFC on all phases, loop impedance, RCD testing, neutral-earth voltage. BS 7671 procedure for UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Testing Three Phase Installations',
    href: '/guides/testing-three-phase-installation',
  },
];

const tocItems = [
  { id: 'three-phase-overview', label: 'Three-Phase Testing Overview' },
  { id: 'phase-rotation', label: 'Phase Rotation Testing' },
  { id: 'voltage-measurement', label: 'Voltage Measurement' },
  { id: 'continuity-three-phase', label: 'Continuity Testing' },
  { id: 'insulation-resistance-three-phase', label: 'Insulation Resistance' },
  { id: 'loop-impedance', label: 'Loop Impedance on All Phases' },
  { id: 'pfc-all-phases', label: 'PFC on All Phases' },
  { id: 'rcd-testing-three-phase', label: 'RCD Testing on Three-Phase Systems' },
  { id: 'neutral-earth-voltage', label: 'Neutral-Earth Voltage' },
  { id: 'elec-mate', label: 'Three-Phase Testing with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Phase rotation must be checked before connecting any three-phase equipment — incorrect phase rotation can cause motors to run in reverse, which can be dangerous and damaging.',
  'Voltage measurements must be taken between all phase combinations (L1-L2, L1-L3, L2-L3) and each phase to neutral and earth. Line-to-line voltage should be approximately 400V; line-to-neutral approximately 230V.',
  'Loop impedance and prospective fault current must be measured on all three phases, not just one. Different phases can have significantly different impedance values depending on cable routing and connections.',
  'Neutral-earth voltage on a three-phase system should be less than approximately 5V under normal balanced loading. High neutral-earth voltage indicates load imbalance, neutral conductor issues, or harmonic problems.',
  'Elec-Mate supports three-phase circuit schedules with per-phase test results, auto-validates Zs and PFC for each phase, and generates professional three-phase certificates.',
];

const faqs = [
  {
    question: 'What is phase rotation and why does it matter?',
    answer:
      'Phase rotation (also called phase sequence) is the order in which the three phases reach their peak voltage. In the UK, the standard phase rotation is L1-L2-L3 (clockwise). Phase rotation matters because three-phase motors are directional — they rotate in the direction determined by the phase sequence. If the phase rotation is reversed (anti-clockwise), the motor will run backwards. For some equipment (pumps, fans, compressors), running backwards can cause damage to the equipment or create a safety hazard. Phase rotation is checked using a phase rotation tester, which is plugged into the three-phase supply and indicates whether the rotation is clockwise (correct) or anti-clockwise (reversed). If the rotation is reversed, swapping any two phases at the supply point will correct it.',
  },
  {
    question: 'Do I need to test loop impedance on all three phases?',
    answer:
      'Yes. You must measure earth fault loop impedance (Zs) on all three phases independently. Different phases can have different Zs values because the cables may take different routes, have different lengths of conductor between the source and the point of measurement, or have different connection resistances at terminals and busbars. If you only test one phase and assume the other two are the same, you could miss a high Zs value on another phase that exceeds the maximum permitted value. Record the Zs for each phase (L1, L2, L3) separately on the schedule of test results. The highest Zs value determines the worst-case disconnection time.',
  },
  {
    question: 'How do I test insulation resistance on a three-phase circuit?',
    answer:
      'For a three-phase circuit, insulation resistance must be tested between all conductor combinations. The full set of tests is: all live conductors connected together to earth (L1+L2+L3+N to E), then between each pair of live conductors individually (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N). All readings must be at least 1.0 megohm per BS 7671 Table 61 (at 500V DC test voltage for standard 400V circuits). Before testing, disconnect all three-phase equipment — motors, drives, control panels — as the 500V DC test voltage can damage sensitive electronics. In practice, many electricians first test all conductors to earth as a combined test, then test between each pair only if the combined test shows a lower-than-expected reading.',
  },
  {
    question: 'What is neutral-earth voltage and what level is acceptable?',
    answer:
      'Neutral-earth voltage (N-E voltage) is the voltage measured between the neutral conductor and the earthing terminal at the distribution board. On a perfectly balanced three-phase system with no load, the neutral-earth voltage would be 0V. In practice, load imbalance between the three phases causes current to flow in the neutral conductor, which creates a small voltage drop along the neutral. A neutral-earth voltage of less than 5V is generally acceptable for a balanced three-phase system. Higher readings indicate significant load imbalance, a high-resistance neutral connection, or harmonic currents on the neutral. A neutral-earth voltage above 10V warrants investigation. A very high N-E voltage (above 50V) could indicate a broken or disconnected neutral, which is extremely dangerous — the voltages on each phase will become unbalanced and equipment connected to the lightly loaded phases will receive dangerously high voltage.',
  },
  {
    question: 'Can I test RCDs on a three-phase system the same way as single-phase?',
    answer:
      'The basic RCD test procedure is the same — you use the RCD test function on your MFT to measure the trip time at 1x, 2x, and 5x the rated residual current (In). However, on a three-phase system there are additional considerations. If the RCD protects all three phases (a four-pole RCD), you must test on each phase separately to confirm the RCD trips from a fault on any phase. Some four-pole RCDs have different trip characteristics on different phases — testing all three phases ensures complete coverage. If the three-phase system uses individual single-pole RCDs or RCBOs on each phase, test each one individually as you would on a single-phase system. For three-phase RCDs with a common neutral, ensure the neutral is properly connected before testing — a disconnected neutral can prevent the RCD from detecting faults correctly.',
  },
  {
    question: 'What should the line-to-line and line-to-neutral voltages be?',
    answer:
      'On a standard UK three-phase supply, the line-to-line voltage should be approximately 400V (+/- 10%, so 360V to 440V is acceptable per BS EN 50160). The line-to-neutral voltage should be approximately 230V (+/- 10%, so 207V to 253V is acceptable). All three line-to-line voltages should be approximately equal — a significant difference between them indicates a supply problem or an open-circuit phase. Similarly, all three line-to-neutral voltages should be approximately equal. Large imbalances (more than approximately 3-5% difference between the highest and lowest phase voltages) warrant investigation. Measure all voltages under load conditions for the most representative results.',
  },
  {
    question: 'How does Elec-Mate handle three-phase test results?',
    answer:
      'Elec-Mate supports three-phase circuit schedules with separate columns for L1, L2, and L3 test results. When you add a three-phase circuit to the schedule of tests, the app creates fields for Zs on each phase, PFC on each phase, and IR between all conductor combinations. Each value is auto-validated against BS 7671 limits independently. The app also records phase rotation, supply voltages, and neutral-earth voltage. Three-phase EICRs and EICs are generated with the full per-phase test data formatted correctly on the certificate.',
  },
];

const sections = [
  {
    id: 'three-phase-overview',
    heading: 'Three-Phase Testing Overview',
    content: (
      <>
        <p>
          Testing a three-phase electrical installation follows the same{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            BS 7671 testing sequence
          </SEOInternalLink>{' '}
          as single-phase testing — dead tests first (continuity, insulation resistance, polarity),
          then live tests (loop impedance, PFC, RCD trip times). However, three-phase systems
          require additional measurements and considerations that single-phase systems do not.
        </p>
        <p>
          The key differences are: you must test on all three phases rather than just one, you need
          to check phase rotation, you must measure voltages between all phase combinations, and you
          should check neutral-earth voltage for signs of imbalance. Each of these additional tests
          is covered in detail below.
        </p>
        <p>
          Three-phase testing requires the same core instruments as single-phase work — a
          multifunction tester, voltage indicator, and proving unit — plus a phase rotation tester.
          Some MFTs (such as the{' '}
          <SEOInternalLink href="/guides/fluke-vs-megger">Megger MFT1845</SEOInternalLink>) include
          a phase rotation test function, eliminating the need for a separate instrument.
        </p>
      </>
    ),
  },
  {
    id: 'phase-rotation',
    heading: 'Phase Rotation Testing',
    content: (
      <>
        <p>
          Phase rotation testing determines the order in which the three phases of the supply reach
          their peak voltage. The standard rotation in the UK is L1-L2-L3 (clockwise). Correct phase
          rotation is critical for three-phase motors — a motor connected to a supply with reversed
          phase rotation will run in reverse.
        </p>
        <p>
          Phase rotation is tested using a dedicated phase rotation tester or the phase rotation
          function on a suitable multifunction tester. The instrument is connected to all three
          phases and indicates whether the rotation is clockwise (correct) or anti-clockwise
          (reversed). If the rotation is reversed, swapping any two of the three phase connections
          at the supply point will correct it.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Phase Rotation Key Points</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <RotateCcw className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Standard rotation:</strong> L1-L2-L3 (clockwise)
                is the UK standard. This is the direction three-phase motors are designed to run.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">When to test:</strong> Always test phase
                rotation before connecting any three-phase motor, pump, compressor, or equipment
                with a directional requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Correcting reversed rotation:</strong> Swap any
                two phases at the supply point. For example, swap L1 and L2. Do not swap at the
                motor terminals unless you intend to reverse the motor direction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Phase rotation testing is particularly important after any work that involves
          disconnecting and reconnecting three-phase supplies — for example, after a changeover from
          temporary supply, after replacing a distribution board, or after work by the DNO on the
          supply.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-measurement',
    heading: 'Voltage Measurement on Three-Phase Systems',
    content: (
      <>
        <p>
          On a three-phase system, you must measure voltage between all conductor combinations to
          confirm the supply is correct and balanced. The full set of measurements is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Voltage Measurements</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L1 to L2:</strong> Should be approximately 400V
                (360-440V acceptable per BS EN 50160)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L1 to L3:</strong> Should be approximately 400V
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L2 to L3:</strong> Should be approximately 400V
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L1 to N:</strong> Should be approximately 230V
                (207-253V acceptable)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L2 to N:</strong> Should be approximately 230V
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">L3 to N:</strong> Should be approximately 230V
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">N to E:</strong> Should be less than
                approximately 5V under normal balanced loading
              </span>
            </li>
          </ul>
        </div>
        <p>
          Significant voltage imbalance between the three line-to-line readings or the three
          line-to-neutral readings indicates a supply problem. Mild imbalance (under 3%) is normal;
          imbalance over 5% should be investigated.
        </p>
      </>
    ),
  },
  {
    id: 'continuity-three-phase',
    heading: 'Continuity Testing on Three-Phase Circuits',
    content: (
      <>
        <p>
          Continuity testing (R1+R2) on three-phase circuits follows the same principles as
          single-phase — the long lead method is used to measure the combined resistance of the
          phase conductor and CPC. However, you must measure R1+R2 on each phase separately because
          the cable routing may differ and the connection resistances at terminals may vary.
        </p>
        <p>
          For a three-phase circuit with a four-core (or five-core) cable, connect the long lead
          between each phase conductor and the CPC in turn. Record R1+R2 for L1, L2, and L3
          separately. The readings should be approximately equal for all three phases if the cable
          is symmetrical (which it should be for a multi-core cable). Significant differences
          between phases indicate a problem — possibly a high-resistance connection on one phase
          terminal.
        </p>
        <p>
          For three-phase systems using single-core cables (for example, SWA singles in trefoil),
          the cable lengths for each phase may genuinely differ slightly depending on the routing,
          so small differences in R1+R2 between phases are expected.
        </p>
      </>
    ),
  },
  {
    id: 'insulation-resistance-three-phase',
    heading: 'Insulation Resistance on Three-Phase Circuits',
    content: (
      <>
        <p>
          Insulation resistance testing on three-phase circuits requires testing between all
          conductor combinations. The minimum acceptable value remains 1.0 MΩ per BS 7671 Table 61
          at 500V DC test voltage for standard 400V circuits.
        </p>
        <p>
          The full test set is: all live conductors connected together to earth (L1+L2+L3+N to E),
          then between each pair of live conductors (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N). All
          three-phase equipment must be disconnected before testing — motors, variable speed drives,
          contactors with electronic coils, and control panel electronics.
        </p>
        <p>
          For more detail on insulation resistance values, test voltages, and troubleshooting, see
          the{' '}
          <SEOInternalLink href="/guides/insulation-resistance-minimum-values">
            insulation resistance minimum values guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'loop-impedance',
    heading: 'Loop Impedance on All Phases',
    content: (
      <>
        <p>
          Earth fault loop impedance (Zs) must be measured on each phase of a three-phase system
          independently. Connect your MFT to each phase in turn and measure Zs. The measured value
          on each phase must not exceed the{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs
          </SEOInternalLink>{' '}
          for the protective device on that circuit.
        </p>
        <p>
          Different phases can have different Zs values, particularly on installations where the
          phase conductors take different routes or where the connections at distribution boards
          have different resistances. The highest Zs value across the three phases is the worst case
          and determines whether the circuit passes.
        </p>
        <p>
          Use the no-trip loop impedance mode on your MFT when testing circuits protected by RCDs or
          RCBOs. Standard loop impedance testing injects a small current that can trip an RCD. The
          no-trip mode uses a much lower test current that does not trigger the RCD but still
          provides a valid Zs measurement.
        </p>
        <p>
          Record the Zs for each phase (L1, L2, L3) separately on the schedule of test results. The
          Ze value is measured once and is common to all phases. The expected Zs for each phase can
          be calculated as Ze + R1+R2 for that phase.
        </p>
      </>
    ),
  },
  {
    id: 'pfc-all-phases',
    heading: 'Prospective Fault Current on All Phases',
    content: (
      <>
        <p>
          Prospective fault current (PFC) — comprising both prospective short-circuit current (PSCC)
          and prospective earth fault current (PEFC) — must be measured or calculated at the origin
          of the installation. On a three-phase system, PFC should be checked on each phase because
          the fault current available may differ between phases.
        </p>
        <p>
          The highest PFC across all phases and all fault types (line-neutral, line-earth, and
          line-line) determines the minimum breaking capacity required for the protective devices.
          All MCBs, RCBOs, and fuses must have a breaking capacity equal to or greater than the
          highest PFC measured at their location.
        </p>
        <p>
          For three-phase systems, the highest PFC is typically the line-to-line fault current,
          which is higher than the line-to-neutral or line-to-earth fault current because the
          available voltage driving the fault is 400V rather than 230V. Modern MFTs calculate PFC
          automatically from the loop impedance measurement — ensure you test on all three phases
          and record the highest value.
        </p>
        <SEOAppBridge
          title="Per-phase PFC and Zs validation"
          description="Elec-Mate records Zs and PFC for each phase independently. The app validates each value against BS 7671 limits and flags any phase that exceeds the maximum permitted Zs or has a PFC above the device breaking capacity."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'rcd-testing-three-phase',
    heading: 'RCD Testing on Three-Phase Systems',
    content: (
      <>
        <p>
          RCD testing on three-phase systems follows the same principles as single-phase — measure
          the trip time at the rated residual current (In) and at 5x In. However, on a three-phase
          system you must consider which type of RCD is protecting the circuit and test accordingly.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Four-pole RCD</h3>
                <p className="text-white text-sm leading-relaxed">
                  A four-pole RCD protects all three phases and neutral. Test on each phase
                  separately (L1-E, L2-E, L3-E) to confirm the RCD trips from a fault on any phase.
                  All trip times must be within BS 7671 limits. Also perform the RCD test button
                  functional check.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Individual RCBOs per phase</h3>
                <p className="text-white text-sm leading-relaxed">
                  If each phase has its own RCBO, test each device individually as you would on a
                  single-phase system. Each RCBO must trip within BS 7671 limits independently.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Type B RCDs for VSD/inverter circuits</h3>
                <p className="text-white text-sm leading-relaxed">
                  Circuits feeding variable speed drives (VSDs) and inverters may produce DC
                  components in the residual current. Standard Type A RCDs may not detect these
                  correctly. BS 7671 requires Type B RCDs for circuits where DC fault currents may
                  occur. Test Type B RCDs using a suitable instrument that can test DC residual
                  current sensitivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'neutral-earth-voltage',
    heading: 'Neutral-Earth Voltage',
    content: (
      <>
        <p>
          Neutral-earth voltage is a particularly important measurement on three-phase systems
          because it reveals information about load balance, neutral conductor integrity, and
          harmonic content. Measure the voltage between the neutral bar and the main earthing
          terminal at the distribution board using a standard voltmeter function on your MFT.
        </p>
        <p>
          On a perfectly balanced three-phase system with no load, the neutral current is zero and
          the neutral-earth voltage is zero. In practice, loads are never perfectly balanced, so
          there is always some neutral current and some neutral-earth voltage. The key thresholds
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <ArrowRightLeft className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">0 to 5V:</strong> Normal. Minor load imbalance
                is expected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRightLeft className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">5 to 10V:</strong> Moderate imbalance.
                Investigate load distribution. Check neutral connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRightLeft className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">10 to 50V:</strong> Significant issue. Possible
                high-resistance neutral connection, severe load imbalance, or harmonic currents.
                Investigate urgently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Above 50V:</strong> Potentially dangerous. May
                indicate a broken or disconnected neutral. Phase voltages will be unbalanced and
                equipment on lightly loaded phases will receive dangerously high voltage. Treat as
                an emergency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A broken neutral on a three-phase system is one of the most dangerous faults in electrical
          installations. Without the neutral to hold the star point at 0V, the phase voltages become
          unbalanced — lightly loaded phases can rise to well above 230V (potentially up to 400V),
          destroying connected equipment and creating a serious electric shock risk.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Three-Phase Testing with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate fully supports three-phase installations. When creating a certificate for a
          three-phase system, the app generates per-phase fields in the schedule of tests for Zs,
          PFC, and IR. Each value is auto-validated against BS 7671 limits independently for each
          phase.
        </p>
        <SEOAppBridge
          title="Full three-phase support built in"
          description="Elec-Mate handles three-phase certificates with per-phase test results, phase rotation recording, supply voltage documentation, and neutral-earth voltage. The schedule of tests auto-validates every value on every phase. Generate professional three-phase EICRs and EICs with one tap."
          icon={Zap}
        />
        <p>
          The{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            three-phase power calculator
          </SEOInternalLink>{' '}
          and the PFC calculator both support three-phase values. The board scanner can read
          three-phase distribution boards, populating the circuit schedule with per-phase device
          ratings and circuit references automatically.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/insulation-resistance-minimum-values',
    title: 'Insulation Resistance Minimum Values',
    description:
      'BS 7671 Table 61 minimum IR values, test voltages, and troubleshooting low readings on all circuit types.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description:
      'The correct dead and live testing order per GN3. Same sequence applies to three-phase work.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'R1+R2 measurement including per-phase testing on three-phase circuits.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description: 'RCD trip time testing including four-pole RCDs and Type B RCDs for VSD circuits.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional three-phase EICRs with per-phase test results and auto-validation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description: 'Three-phase power calculator, PFC calculator, Zs verification, and dozens more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TestingThreePhasePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-08"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Testing a Three-Phase Installation:{' '}
          <span className="text-yellow-400">Procedure Guide</span>
        </>
      }
      heroSubtitle="The complete guide to testing three-phase electrical installations for UK electricians. Phase rotation, voltage measurement, per-phase loop impedance and PFC, RCD testing on three-phase systems, and neutral-earth voltage checks."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Three-phase certificates with per-phase validation"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Full three-phase support with per-phase auto-validation. 7-day free trial, cancel anytime."
    />
  );
}
