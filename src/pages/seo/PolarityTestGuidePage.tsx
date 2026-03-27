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
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Polarity Testing Guide', href: '/polarity-test-guide' },
];

const tocItems = [
  { id: 'why-polarity-matters', label: 'Why Polarity Matters' },
  { id: 'what-to-check', label: 'What to Look For' },
  { id: 'bell-and-battery-method', label: 'Bell and Battery Method (Dead Test)' },
  { id: 'continuity-tester-method', label: 'Using a Continuity Tester' },
  { id: 'switch-positions', label: 'Live Verification at Switch Positions' },
  { id: 'common-errors', label: 'Common Polarity Errors' },
  { id: 'tracing-faults', label: 'Tracing Polarity Faults' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Polarity testing verifies that all single-pole protective and switching devices are connected in the line conductor only, and that all accessories are wired with correct line and neutral connections. This is required by BS 7671 Regulation 612.6.',
  'The principal danger of incorrect polarity is that a luminaire, appliance, or socket outlet may be live even when the switch controlling it is in the off position. A reversed socket outlet has the live pin where the neutral should be, creating a shock risk when inserting a plug.',
  'The bell and battery (or buzzer) method is the traditional dead polarity test — it uses a low-voltage continuity indication between two conductors to trace their route without applying mains voltage. Modern continuity testers achieve the same result more reliably.',
  'Polarity must be checked at every socket outlet, every switch position, every luminaire, and every fixed appliance connection point. The test is performed dead (installation isolated) for the initial verification.',
  'Common causes of polarity reversal include: conductors transposed at the consumer unit, brown and blue reversed at a socket or junction box, and incorrect connection of intermediate or two-way switching conductors.',
];

const faqs = [
  {
    question: 'Why is polarity testing required?',
    answer:
      'BS 7671 Regulation 612.6 requires polarity to be verified during the initial verification of a new installation and during every periodic inspection and test. Incorrect polarity creates shock and fire hazards: a single-pole switch in the neutral rather than the line conductor leaves the connected luminaire or appliance at line potential when switched off. A reversed socket outlet has the line conductor connected to the larger neutral pin, potentially energising a double-insulated appliance chassis. These hazards can exist for years without being apparent during normal use.',
  },
  {
    question: 'What is the bell and battery polarity test?',
    answer:
      'The bell and battery (or buzzer) test is a traditional dead polarity test method. A low-voltage battery and a buzzer or bell are connected in series, with the two terminals used as test probes. When the probes are connected to two conductors that share a continuous path, the circuit is complete and the buzzer sounds. The method is used to trace which conductor at one point corresponds to which conductor at another point — for example, to verify that the brown conductor at a socket outlet connects back to the line busbar at the consumer unit. Modern instruments (multifunction testers, continuity testers) are more reliable and are now preferred.',
  },
  {
    question: 'What must be checked during a polarity test?',
    answer:
      'BS 7671 requires polarity to be verified for: all single-pole switching and protective devices (MCBs, fuses, switches — these must all be in the line conductor); all socket outlets (line must be at the correct terminal, neutral at the correct terminal, and earth at the correct terminal); all luminaire connections (centre contact of ES lamp holders must be connected to line); all fixed appliance connections; and the line and neutral at the consumer unit busbars (line bus must feed MCBs, neutral bus must be connected to neutral conductors only).',
  },
  {
    question: 'Can you check polarity with the installation live?',
    answer:
      'Polarity can be verified live using a voltage indicator or a multifunction tester in voltage measurement mode. Measuring between the line terminal and a known earth reference confirms which terminal is live. However, initial polarity verification (for an Electrical Installation Certificate) should be carried out dead using a continuity test method, as live testing at every socket and switch position while working on an energised installation increases risk. On EICR work, a combination of dead and live methods is acceptable.',
  },
  {
    question: 'What are the most common polarity errors?',
    answer:
      'The most common polarity errors are: line and neutral transposed at a socket outlet (brown to neutral terminal, blue to line terminal); a single-pole switch wired in the neutral conductor rather than the line conductor (the switched circuit remains live when the switch is off); reversed connections at the consumer unit (line conductors connected to the neutral bar, neutral conductors to MCBs); line and neutral transposed at a junction box (affecting all accessories downstream); and incorrect wiring of intermediate switching strapping conductors.',
  },
  {
    question: 'How do you trace a polarity fault?',
    answer:
      'Start at the consumer unit and work outwards. With the installation isolated and proved dead, confirm that the brown (or red on older installations) conductors connect to the line terminals of the MCBs/fuses and the blue (or black) conductors connect to the neutral bar. Then work circuit by circuit: at the first accessory on each circuit, confirm line and neutral are correctly identified. If a reversal is found, disconnect and re-check the preceding junction to locate where the reversal occurred. A colour-coded schedule of the installation helps locate reversals efficiently.',
  },
  {
    question: 'Does polarity testing apply to three-phase installations?',
    answer:
      'Yes. For three-phase installations, polarity testing verifies that each phase conductor (L1, L2, L3) connects to the correct MCB or fuse, and that phase, neutral, and earth are correctly connected at all three-phase accessories, distribution boards, and motor connections. Phase rotation (the sequence in which L1, L2, L3 cycle) is separately tested to verify correct motor direction of rotation. The polarity test for three-phase focuses on correct conductor identification at each point rather than specifically line/neutral.',
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
    href: '/continuity-testing-guide',
    title: 'Continuity Testing Guide',
    description: 'Ring final circuit, CPC, and bonding conductor continuity test methods.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Half-rated, rated, and 5 times current RCD test procedures.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/loop-impedance-testing-guide',
    title: 'Loop Impedance Testing Guide',
    description: 'Ze, Zs, and prospective fault current testing explained.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Overview of the wiring regulations and key changes in Amendment 3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-polarity-matters',
    heading: 'Why Polarity Matters — The Safety Case',
    content: (
      <>
        <p>
          Polarity is the correct assignment of line and neutral conductors throughout an electrical
          installation. Getting it wrong is not simply an administrative error — incorrect polarity
          creates real and potentially lethal hazards.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>{' '}
          Regulation 612.6 makes polarity verification mandatory at initial installation and at
          every periodic inspection.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch in the neutral — live when off</strong>: A single-pole switch wired
                in the neutral conductor rather than the line conductor will switch the circuit off
                (no current flows) but leaves the entire circuit wiring at line potential. The
                luminaire or appliance is live even when the switch is in the off position. Anyone
                changing a lamp or touching the centre contact of an ES (Edison Screw) lamp holder
                could receive a fatal shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reversed socket outlet</strong>: If line and neutral are transposed at a
                socket outlet, the line conductor is connected to the larger neutral slot. A
                double-insulated appliance plugged into a reversed socket will function normally in
                many cases, but the internal wiring is energised with reversed polarity. With some
                appliances (particularly older ones or those with a thermal fuse in the neutral),
                the chassis or heater element may be permanently live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>ES lamp holders</strong>: The centre contact of an ES lamp holder must be
                connected to the line conductor. This ensures that when the lamp is unscrewed, the
                outer threaded part (which users inevitably touch) is at neutral potential. A
                reversed ES lamp holder has the outer shell at line potential — a hidden shock hazard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check During a Polarity Test',
    content: (
      <>
        <p>
          A thorough polarity verification covers every point in the installation where a polarity
          error could exist. This means checking at the consumer unit, at every accessory on every
          circuit, and at every fixed appliance connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit / distribution board</strong>: Confirm that line conductors
                from the supply connect to the line bus (feeding the MCBs or fuses). Confirm that
                neutral conductors connect to the neutral bar. Confirm that CPCs connect to the
                earth bar. A polarity reversal at the consumer unit affects the entire installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong>: Verify that the line conductor connects to the
                line terminal (right-hand terminal on a BS 1363 socket when facing the socket),
                neutral to the neutral terminal (left-hand), and earth to the earth terminal (top).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting switches</strong>: Verify that the single-pole switch interrupts
                the line conductor only. The switch wire (typically brown, or an appropriately
                sleeved conductor) should be line at the switch and line at the luminaire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire connections</strong>: At every fixed luminaire connection, confirm
                line to line terminal and neutral to neutral terminal. For ES lamp holders, confirm
                the centre contact is connected to line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed appliance connections</strong>: Cookers, water heaters, showers, and
                other fixed appliances must have line at the correct terminal. Check the appliance
                data plate or installation instructions for the correct termination.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bell-and-battery-method',
    heading: 'Bell and Battery Method — The Traditional Dead Polarity Test',
    content: (
      <>
        <p>
          The bell and battery (or buzzer) method is the original dead polarity test technique,
          used by electricians for decades before multifunction test instruments became standard.
          It remains valid and is useful in situations where a dedicated continuity instrument is
          not available.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Assemble the test circuit</strong>: Connect a low-voltage battery (typically
              4.5V or 9V) in series with a buzzer, bell, or indicator lamp. The two free ends of
              this circuit are the test probes. When the probes are connected across a continuous
              conductor, the circuit is complete and the indicator sounds or illuminates.
            </li>
            <li>
              <strong>Isolate the installation</strong>: The test must be performed dead. Switch off
              and isolate the supply, prove dead with an approved voltage indicator.
            </li>
            <li>
              <strong>Disconnect at the consumer unit</strong>: Disconnect all outgoing circuit
              conductors from the MCBs and neutral bar at the consumer unit. This allows each
              conductor to be individually identified.
            </li>
            <li>
              <strong>Test at each accessory</strong>: At each socket outlet, switch, or luminaire
              connection, use one probe at the consumer unit end of the conductor and the other
              probe at the accessory terminal. Continuity confirms the conductor identity.
              Non-continuity between the expected pairs indicates a transposition.
            </li>
            <li>
              <strong>Mark conductors as identified</strong>: Mark each confirmed conductor with
              coloured tape at the consumer unit to prevent confusion.
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Why low voltage?</strong> The bell and battery method uses a voltage far
              lower than mains supply — safe to use on a de-energised circuit without risk of
              shock. The instrument does not damage electronic components and can be used with
              accessories left in place.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'continuity-tester-method',
    heading: 'Using a Continuity Tester for Polarity Testing',
    content: (
      <>
        <p>
          A low-resistance continuity tester (or a multifunction test instrument in continuity
          mode) is the modern equivalent of the bell and battery. It is faster, more accurate,
          and provides a numerical resistance reading rather than a simple pass/fail indication.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Null the lead resistance</strong>: Short the instrument leads together and
                null or record the lead resistance before testing. This is particularly important
                on short runs where lead resistance may represent a significant proportion of the
                total reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wander lead technique</strong>: Run a long wander lead from the consumer
                unit to each accessory being tested. One instrument terminal stays at the consumer
                unit, connected to the known line busbar conductor. The other terminal is taken to
                the accessory and tested against each conductor terminal. Continuity to the line
                conductor confirms correct line connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Polarity at each accessory</strong>: At each socket outlet, test between
                the line terminal and the conductor connected to the consumer unit line busbar
                (via the wander lead). Continuity confirms correct polarity. Repeat for neutral
                and earth terminals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'switch-positions',
    heading: 'Live Verification at Switch Positions',
    content: (
      <>
        <p>
          After the dead polarity test has been completed and the installation energised, a live
          verification can confirm correct polarity and switching function at switch positions.
          This is particularly important for two-way and intermediate switching arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the switched conductor is live</strong>: With the switch in the on
                position, measure between the switch terminal connecting to the luminaire (the
                switch wire) and earth. This conductor must be at line potential (230V to earth).
                With the switch in the off position, this conductor must be at neutral or near-zero
                potential. A voltage present at the switch terminal with the switch off indicates
                the switch is in the neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ES lamp holder live verification</strong>: With the lamp removed and the
                switch in the off position, measure between the centre contact of the ES holder and
                earth. This must be at or near zero potential. Measure between the outer threaded
                shell and earth — this must also be at or near zero potential when off. If the
                centre contact is live with the switch off, the switch is in the neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet live check</strong>: Use a socket tester (a plug-in device
                with indicator lights) or a voltage indicator at the socket. Confirm line is at the
                correct terminal (right-hand slot on BS 1363), neutral at the left-hand slot, and
                earth at the top. A socket tester provides a quick indication; confirm with a
                voltage indicator on any doubtful results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-errors',
    heading: 'Common Polarity Errors',
    content: (
      <>
        <p>
          Understanding where polarity errors typically occur helps focus the inspection and
          speeds up fault finding. These are the most frequently encountered polarity errors in
          UK domestic and commercial installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposed at a socket outlet</strong>: Brown (line) connected to neutral
                terminal, blue (neutral) connected to line terminal. The socket functions normally
                for most equipment but reversed polarity creates shock risk. Common where a socket
                was replaced or added by an unqualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch in the neutral</strong>: Particularly common in older loop-in
                ceiling rose wiring where brown and blue conductors are close together and easy
                to transpose. Also found where a lighting switch was added to an existing circuit
                without checking which conductor is the line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposed at the consumer unit</strong>: Line conductors connected to
                the neutral bar and neutral conductors connected to MCBs. This is a whole-board
                reversal — every circuit is affected. Can occur when a consumer unit is replaced
                and conductors are re-terminated without adequate identification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strapping conductors reversed in two-way switching</strong>: The two
                strapping conductors between two-way switches can be reversed, causing the switching
                to operate correctly but with incorrect conductor identification throughout the
                switch circuit. While the switching still functions, the switch wire may be at
                neutral potential when the switch is in the off position, leaving the luminaire
                connected directly to the line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extension lead or spur added with reversed polarity</strong>: A DIY-added
                socket or extension connected via a junction box, with line and neutral transposed
                at the junction. Affects only the added accessories but may not be immediately
                apparent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tracing-faults',
    heading: 'Tracing Polarity Faults',
    content: (
      <>
        <p>
          When a polarity fault is found at an accessory during the test, work backwards through
          the circuit to locate the source. The following systematic approach minimises the time
          spent on fault finding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Confirm the reversal is real</strong>: Re-test with a second instrument or a
              different method to eliminate instrument error. A socket tester and an independent
              voltage indicator provide a cross-check.
            </li>
            <li>
              <strong>Check the preceding junction</strong>: Work back to the last junction box,
              ceiling rose, or intermediate accessory on the circuit. Test polarity there. If correct
              at the junction but reversed at the accessory, the reversal is in the final connection
              — at the accessory itself.
            </li>
            <li>
              <strong>Check the consumer unit</strong>: If polarity is reversed at the first
              accessible point on the circuit, work back to the consumer unit and check the circuit
              terminations there. A reversal at the consumer unit affects all accessories on that
              circuit.
            </li>
            <li>
              <strong>Inspect accessible wiring</strong>: Look for obvious visual clues — a brown
              conductor in a blue terminal, or conductor identification sleeves missing from
              conductors that should be coloured.
            </li>
            <li>
              <strong>Document the location and remedy</strong>: Record the location of the fault
              and the corrective action taken. On an EICR, a polarity reversal at a switch position
              or socket outlet is a C2 observation (potentially dangerous) and must be remedied.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Polarity Test Results',
    content: (
      <>
        <p>
          Polarity test results are recorded on the Schedule of Test Results as part of the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate or EICR
          </SEOInternalLink>
          . BS 7671 requires confirmation that polarity has been verified — not the detailed
          continuity readings from the polarity test (those are captured in the continuity test
          column).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass/Fail per circuit</strong>: Record a tick (pass) or cross (fail) in
                the polarity column of the schedule for each circuit tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations</strong>: Note any circuits or accessories where polarity
                could not be fully verified — for example, a permanently wired appliance where
                access was not possible. State the reason.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observations</strong>: Any polarity fault found and not immediately
                remedied during the inspection must be recorded as an observation (C1, C2, or C3)
                with a description and location. A switch in the neutral is C2 (potentially
                dangerous). A reversed socket outlet is C2.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record polarity test results on site with Elec-Mate"
          description="The Elec-Mate testing app lets you tick off polarity verification per circuit and log observations against specific accessories with their location. Export a compliant EICR PDF before you leave site. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Polarity Testing in Practice',
    content: (
      <>
        <p>
          Polarity testing is often the first test electricians learn — but it is one of the most
          important. A methodical approach, starting at the consumer unit and working outwards
          circuit by circuit, ensures nothing is missed and findings are easy to trace.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Log Polarity Results Per Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate schedule of tests
                  </SEOInternalLink>{' '}
                  to tick polarity as you verify each circuit. If you find a reversal, log it as
                  an observation immediately with the accessory location — before moving to the
                  next circuit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cross-Check with a Socket Tester</h4>
                <p className="text-white text-sm leading-relaxed">
                  A plug-in socket tester (around £5 to £15) gives a rapid indication of polarity
                  at every socket outlet and speeds up the polarity check significantly on larger
                  installations. Use it alongside the continuity method — the socket tester confirms
                  function, the continuity test confirms the conductor path.
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

export default function PolarityTestGuidePage() {
  return (
    <GuideTemplate
      title="Polarity Testing Guide UK | Electrical Polarity Test Method"
      description="Complete guide to electrical polarity testing for UK electricians. Why polarity matters, bell and battery method, continuity tester method, live verification at switch positions, common polarity errors and how to trace them."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CheckCircle2}
      heroTitle={
        <>
          Polarity Testing Guide:{' '}
          <span className="text-yellow-400">Electrical Polarity Test Methods</span>
        </>
      }
      heroSubtitle="The complete UK electrician's guide to polarity testing — why polarity matters, the bell and battery dead test method, using a continuity tester, live verification at switch positions, common polarity errors, and how to trace and correct them."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Polarity Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Polarity Test Results On Site with Elec-Mate"
      ctaSubheading="Log polarity verification per circuit and record observations against specific accessories. Export a compliant EICR PDF before you leave site. 7-day free trial."
    />
  );
}
