import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { FileCheck2, Zap, ClipboardCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

// -------------------------------------------------------------------
// Shared classes
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 mt-6 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const plainCardCn =
  '-mx-4 mt-6 rounded-none border-y border-white/10 bg-white/[0.04] p-4 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 mt-6 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'px-4 py-3 text-left text-[13px] font-semibold text-white whitespace-nowrap';
const tdCn = 'px-4 py-3 align-top text-sm text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Polarity Testing Guide', href: '/polarity-test-guide' },
];

const tocItems = [
  { id: 'what-reg-643-6-requires', label: 'What Reg 643.6 Requires' },
  { id: 'why-polarity-matters', label: 'Why Polarity Matters' },
  { id: 'what-to-check', label: 'What to Check, Point by Point' },
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
  'BS 7671 Regulation 643.6 requires three things to be verified: (a) every fuse and single-pole control and protective device is connected in the line conductor only; (b) except for E14 and E27 lampholders to BS EN 60238, centre contact bayonet and Edison screw lampholders have the outer or screwed contact connected to the neutral; and (c) wiring has been correctly connected throughout the installation.',
  'Polarity of the supply at the origin shall be verified before the installation is energised. Regulation 643.1 puts polarity last in the pre-energisation order: 643.2 continuity, 643.3 insulation resistance, 643.4 SELV/PELV or electrical separation, 643.5 floors and walls, then 643.6 polarity.',
  'The principal danger of incorrect polarity is that a luminaire, appliance or socket-outlet stays live when the switch controlling it is off. Regulation 132.14.1 requires a single-pole fuse, switch or circuit-breaker to be inserted in the line conductor only, and Regulation 530.3.3 forbids a switching device in the neutral conductor alone.',
  'The bell and battery (or buzzer) method is the traditional dead polarity test — a low-voltage continuity indication between two conductors, used to trace their route without applying mains voltage. A low-resistance continuity tester or multifunction instrument does the same job with a numerical reading.',
  'Polarity is checked at the origin, at every socket-outlet, every switch position, every luminaire and every fixed appliance connection. On periodic inspection, Regulation 651.2 requires the inspection to be supplemented by appropriate tests from Chapter 64 — polarity among them.',
];

const faqs = [
  {
    question: 'Why is polarity testing required?',
    answer:
      'Incorrect polarity creates shock and fire hazards, so BS 7671 Regulation 643.6 requires polarity to be verified as part of initial verification, and Regulation 651.2 requires periodic inspection to be supplemented by the appropriate tests from Chapter 64. A single-pole switch or fuse in the neutral rather than the line conductor leaves the connected luminaire or appliance at line potential when it is switched off — the load is dead but the wiring is not. On a reversed socket-outlet, an appliance whose own switch or internal fuse sits in what it believes is the line conductor is left permanently energised inside. These hazards can exist for years without being apparent during normal use, because everything still works.',
  },
  {
    question: 'What is the bell and battery polarity test?',
    answer:
      'The bell and battery (or buzzer) test is a traditional dead polarity test method. A low-voltage battery and a buzzer or bell are connected in series, with the two free ends used as test probes. When the probes are connected to two conductors that share a continuous path, the circuit is complete and the buzzer sounds. The method is used to trace which conductor at one point corresponds to which conductor at another point — for example, to verify that the brown conductor at a socket-outlet connects back to the line busbar at the consumer unit. Modern instruments are more reliable and are now preferred: Regulation 643.1 requires measuring instruments to be chosen in accordance with the relevant parts of BS EN 61557, or to provide no lesser degree of performance and safety.',
  },
  {
    question: 'What must be checked during a polarity test?',
    answer:
      'Regulation 643.6 sets out the checks. First, where relevant, the polarity of the supply at the origin of the installation shall be verified before the installation is energised, and where single-pole switching devices are not permitted in the neutral conductor a test shall be made to verify that all such devices are connected in the line conductor(s) only. Then, during the polarity test it shall be verified that: (a) every fuse and single-pole control and protective device is connected in the line conductor only; (b) except for E14 and E27 lampholders complying with BS EN 60238, in circuits having an earthed neutral conductor, centre contact bayonet and Edison screw lampholders have the outer or screwed contacts connected to the neutral conductor; and (c) wiring has been correctly connected throughout the installation. Item (c) is what takes you round every socket-outlet, switch, luminaire and fixed appliance connection.',
  },
  {
    question: 'Can you check polarity with the installation live?',
    answer:
      'Polarity can be confirmed live using a voltage indicator or a multifunction tester in voltage measurement mode — measuring between a terminal and a known earth reference tells you which conductor is at line potential. But Regulation 643.1 places the polarity test in the group of tests to be carried out before the installation is energised, so on initial verification the dead continuity method comes first and live checks confirm it afterwards. On an EICR, where the installation is already in service, a combination of dead and live methods is normal, with the extent and any limitations agreed and recorded in the report.',
  },
  {
    question: 'What are the most common polarity errors?',
    answer:
      'The most common polarity errors are: line and neutral transposed at a socket-outlet (brown into the neutral terminal, blue into the line terminal); a single-pole switch or fuse wired in the neutral conductor rather than the line conductor, contrary to Regulations 132.14.1 and 530.3.3; reversed connections at the consumer unit, where line conductors land on the neutral bar and neutrals feed the protective devices; line and neutral transposed at a junction box, affecting every accessory downstream of it; and, at a ceiling rose, the permanent line and the switch wire transposed so the lamp sits between the switched conductor and the line rather than between the switched conductor and the neutral.',
  },
  {
    question: 'How do you trace a polarity fault?',
    answer:
      'Start at the consumer unit and work outwards. With the installation isolated and proved dead, confirm that the brown (or red on older installations) conductors connect to the line terminals of the protective devices and the blue (or black) conductors connect to the neutral bar. Then work circuit by circuit: at the first accessory on each circuit, confirm line and neutral are correctly identified. If a reversal is found, disconnect and re-check the preceding junction to locate where the reversal occurred. Marking each conductor as it is proved, with coloured tape at the board, stops you re-testing the same conductor twice.',
  },
  {
    question: 'Does polarity testing apply to three-phase installations?',
    answer:
      'Yes. On a three-phase installation, polarity verification under Regulation 643.6 confirms that each line conductor connects to the correct protective device and that line, neutral and CPC are correctly connected at every distribution board, three-phase accessory and motor connection. Phase sequence is a separate test with its own regulation: Regulation 643.9 requires that, for polyphase circuits, it shall be verified that the phase sequence is maintained at all relevant points throughout the installation. The two are not the same — polarity confirms conductor identity at every point, whilst phase sequence confirms the cyclic order of the three lines, which is what determines the direction of rotation of a motor. For the loop impedance side of three-phase testing, see the loop impedance testing guide.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing Guide',
    description:
      'Test voltages, minimum values, disconnecting components, and interpreting IR results.',
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
    description:
      'Verifying RCD operation under Reg 643.8 with test equipment to BS EN 61557-6, and what A4:2026 changed.',
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
    description: 'Overview of the wiring regulations and key changes in Amendment 4.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-reg-643-6-requires',
    heading: 'What Reg 643.6 Requires',
    content: (
      <>
        <p>
          Polarity is not a general instruction to &ldquo;check the wiring&rdquo;. It is three
          specific verifications, plus a check at the origin.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          Regulation 643.6 first requires that, where relevant, the polarity of the supply at the
          origin of the installation is verified before the installation is energised, and that
          where single-pole switching devices are not permitted in the neutral conductor, a test is
          made to verify all such devices are connected in the line conductor(s) only. It then lists
          what must be verified during the test itself.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>643.6</th>
                <th className={thCn}>What must be verified</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className={`${tdCn} font-semibold`}>(a)</td>
                <td className={tdCn}>
                  Every fuse and single-pole control and protective device is connected in the line
                  conductor only.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={`${tdCn} font-semibold`}>(b)</td>
                <td className={tdCn}>
                  In circuits having an earthed neutral conductor, centre contact bayonet and Edison
                  screw lampholders have the outer or screwed contacts connected to the neutral
                  conductor — except for E14 and E27 lampholders complying with BS&nbsp;EN&nbsp;60238.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>(c)</td>
                <td className={tdCn}>
                  Wiring has been correctly connected throughout the installation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <h3 className="text-sm font-semibold text-white">
            Where polarity sits in the test sequence
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            Regulation 643.1 requires the tests of Regulations 643.2 to 643.6, where relevant, to be
            carried out in that order before the installation is energised — 643.2 continuity of
            conductors, 643.3 insulation resistance, 643.4 protection by SELV, PELV or by electrical
            separation, 643.5 insulation resistance/impedance of floors and walls, and 643.6
            polarity. Polarity is therefore the last of the five dead tests. Where the installation
            incorporates an earth electrode, the test of Regulation 643.7.2 is also carried out
            before energising.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'why-polarity-matters',
    heading: 'Why Polarity Matters — The Safety Case',
    content: (
      <>
        <p>
          Getting polarity wrong is not an administrative error. Regulation 132.14.1 requires a
          single-pole fuse, switch or circuit-breaker to be inserted in the line conductor only, and
          Regulation 530.3.3 states that a switching device shall not be inserted in the neutral
          conductor alone. Breach either and the installation still works — which is precisely what
          makes it dangerous.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Switch in the neutral — live when off.</strong> A single-pole switch wired in
              the neutral conductor will switch the load off, because no current flows, but leaves
              the whole circuit at line potential. The luminaire or appliance is live even with the
              switch in the off position. Anyone changing a lamp or touching the centre contact of a
              lampholder can receive a fatal shock.
            </li>
            <li>
              <strong>Reversed socket-outlet.</strong> If line and neutral are transposed at a
              socket-outlet, everything plugged in still runs. But any appliance whose own switch,
              fuse or thermal cut-out sits in the conductor it treats as line now has that device in
              the neutral instead — so the appliance stays energised internally when it is switched
              off at its own control. On a BS 1363 outlet the line and neutral apertures are the
              same size, so nothing about the reversal is visible.
            </li>
            <li>
              <strong>Lampholders.</strong> Regulation 559.5.1.206 requires that, in circuits of a
              TN or TT system, the outer contact of every Edison screw or single centre bayonet cap
              type lampholder is connected to the neutral conductor. That way the threaded shell a
              user touches when changing a lamp is at neutral potential rather than line potential.
              The regulation also applies to track-mounted systems. E14 and E27 lampholders
              complying with BS&nbsp;EN&nbsp;60238 are excepted.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check, Point by Point',
    content: (
      <>
        <p>
          Regulation 643.6(c) — &ldquo;wiring has been correctly connected throughout the
          installation&rdquo; — is what takes you round the whole job rather than just the board.
          This is the working list.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>Point</th>
                <th className={thCn}>What must be true</th>
                <th className={thCn}>Reg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className={tdCn}>Origin of the installation</td>
                <td className={tdCn}>
                  Supply polarity verified before the installation is energised.
                </td>
                <td className={tdCn}>643.6</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={tdCn}>Consumer unit / distribution board</td>
                <td className={tdCn}>
                  Line conductors on the line bus feeding the protective devices, neutrals on the
                  neutral bar, CPCs on the earth bar. A reversal here affects every circuit.
                </td>
                <td className={tdCn}>643.6(c)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={tdCn}>Fuses, MCBs and RCBOs</td>
                <td className={tdCn}>
                  Single-pole device in the line conductor only; never a switching device in the
                  neutral alone.
                </td>
                <td className={tdCn}>132.14.1; 530.3.3; 643.6(a)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={tdCn}>Lighting switches</td>
                <td className={tdCn}>
                  The single-pole switch interrupts the line conductor only. The switch wire is at
                  line potential when the switch is on.
                </td>
                <td className={tdCn}>132.14.1; 643.6(a)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={tdCn}>Socket-outlets</td>
                <td className={tdCn}>
                  Line, neutral and CPC each at their own terminal. On a BS 1363 outlet, line is the
                  right-hand terminal facing the socket, neutral the left-hand, earth the top.
                </td>
                <td className={tdCn}>643.6(c)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className={tdCn}>ES and centre-contact BC lampholders</td>
                <td className={tdCn}>
                  Outer (screwed) contact connected to the neutral conductor. E14 and E27
                  lampholders to BS&nbsp;EN&nbsp;60238 excepted.
                </td>
                <td className={tdCn}>559.5.1.206; 643.6(b)</td>
              </tr>
              <tr>
                <td className={tdCn}>Fixed appliance connections</td>
                <td className={tdCn}>
                  Line at the terminal the manufacturer marks as line — cookers, water heaters,
                  showers, controls. Check the data plate or instructions.
                </td>
                <td className={tdCn}>643.6(c)</td>
              </tr>
            </tbody>
          </table>
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
          The bell and battery (or buzzer) method is the original dead polarity test technique, used
          by electricians for decades before multifunction test instruments became standard. It
          remains a valid way of proving which conductor is which, and is useful where a dedicated
          continuity instrument is not to hand.
        </p>
        <div className={plainCardCn}>
          <ol className="list-inside list-decimal space-y-4 text-white">
            <li>
              <strong>Assemble the test circuit.</strong> Connect a low-voltage battery (typically
              4.5&nbsp;V or 9&nbsp;V) in series with a buzzer, bell or indicator lamp. The two free
              ends are the test probes. Bridge a continuous conductor with them and the indicator
              sounds or illuminates.
            </li>
            <li>
              <strong>Isolate the installation.</strong> The test is dead. Switch off, isolate,
              secure the isolation, and prove dead with an approved voltage indicator.
            </li>
            <li>
              <strong>Separate the conductors at the board.</strong> Disconnect the outgoing circuit
              conductors from the protective devices and the neutral bar so each conductor can be
              identified individually.
            </li>
            <li>
              <strong>Test at each accessory.</strong> Put one probe on the conductor at the board
              and the other on the terminal at the socket-outlet, switch or luminaire. Continuity
              confirms the conductor identity; no continuity where you expected it means a
              transposition somewhere between the two points.
            </li>
            <li>
              <strong>Mark conductors as they are proved.</strong> Tag each confirmed conductor at
              the board so you never test the same one twice.
            </li>
          </ol>
        </div>
        <div className={plainCardCn}>
          <h3 className="text-sm font-semibold text-white">Why low voltage</h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            The test voltage is far below mains, so it can be applied to a de-energised circuit
            without shock risk, will not damage connected electronics, and can be used with
            accessories left in place.
          </p>
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
          A low-resistance continuity tester, or a multifunction instrument in continuity mode, is
          the modern equivalent of the bell and battery. It is faster, and it gives a numerical
          resistance reading rather than a pass/fail beep. Regulation 643.1 requires instruments to
          be chosen in accordance with the relevant parts of BS&nbsp;EN&nbsp;61557, or to provide no
          lesser degree of performance and safety.
        </p>
        <div className={plainCardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Null the lead resistance.</strong> Short the leads together and null or record
              the reading before testing. On short runs the leads can be a large share of the total.
            </li>
            <li>
              <strong>Wander lead technique.</strong> Run a long wander lead from the board to the
              accessory. One instrument terminal stays at the board on the known line conductor; the
              other is taken to the accessory and tested against each terminal in turn.
            </li>
            <li>
              <strong>Prove each terminal.</strong> At the accessory, continuity back to the line
              conductor at the board confirms the line connection. Repeat for neutral and CPC so all
              three are positively identified, not assumed by colour.
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
          Once the dead test is complete and the installation energised, live checks confirm the
          switching actually behaves as the dead test predicted. This matters most on two-way and
          intermediate arrangements, where the wiring is easiest to get wrong.
        </p>
        <div className={plainCardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>The switched conductor.</strong> With the switch on, measure between the
              switch wire and earth: it should sit at nominal line voltage (230&nbsp;V to earth on a
              single-phase supply). With the switch off it should be at or near zero. Voltage still
              present with the switch off means the switch is in the neutral.
            </li>
            <li>
              <strong>ES lampholder.</strong> With the lamp out and the switch off, measure from the
              centre contact to earth and from the outer shell to earth. Both should be at or near
              zero. A live centre contact with the switch off means the switch is in the neutral.
            </li>
            <li>
              <strong>Socket-outlet.</strong> A plug-in socket tester gives a fast indication at
              every outlet; confirm anything doubtful with a voltage indicator. Line should be the
              right-hand slot on a BS 1363 outlet, neutral the left-hand, earth the top.
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
          Knowing where reversals normally hide shortens the inspection and the fault find. These
          are the ones that turn up repeatedly in UK domestic and commercial work.
        </p>
        <div className={plainCardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Transposed at a socket-outlet.</strong> Brown into the neutral terminal, blue
              into the line terminal. The outlet works normally, so it is only found by test.
              Typical where an outlet has been replaced or added by someone unqualified.
            </li>
            <li>
              <strong>Switch in the neutral.</strong> Common in loop-in ceiling rose wiring, where
              the permanent line, the switch wire and the neutral all meet in one accessory, and
              where a switch has been added to an existing circuit without proving which conductor
              is the line.
            </li>
            <li>
              <strong>Transposed at the consumer unit.</strong> Line conductors landed on the
              neutral bar and neutrals feeding the protective devices. This is a whole-board
              reversal affecting every circuit, and it happens when a board is changed and
              conductors are re-terminated without identification.
            </li>
            <li>
              <strong>Common and strapper transposed in two-way switching.</strong> Swapping the two
              strappers alone only inverts which switch position is on. The genuine polarity fault
              is putting the feed or the switch wire on a strapper terminal instead of the common —
              the lighting may still appear to work from one switch, but the switch is no longer
              interrupting the line conductor as Regulation 132.14.1 requires.
            </li>
            <li>
              <strong>Spur or junction added with line and neutral crossed.</strong> A joint made
              without identifying the conductors reverses everything downstream of it while
              everything upstream tests correct — which is why a reversal at one accessory always
              means testing the next one along.
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
          When a reversal shows up at an accessory, work backwards through the circuit to find where
          it starts. Regulation 643.1 also requires that if any test indicates a failure to comply,
          that test — and any preceding test whose results the fault may have influenced — is
          repeated after the fault has been rectified.
        </p>
        <div className={plainCardCn}>
          <ol className="list-inside list-decimal space-y-4 text-white">
            <li>
              <strong>Confirm the reversal is real.</strong> Re-test with a second instrument or a
              different method. A socket tester plus an independent voltage indicator is a quick
              cross-check against instrument or lead error.
            </li>
            <li>
              <strong>Check the preceding junction.</strong> Work back to the last joint box,
              ceiling rose or accessory on the circuit and test there. Correct at the junction but
              reversed at the accessory puts the fault in the final connection.
            </li>
            <li>
              <strong>Check the board.</strong> If polarity is already reversed at the first
              accessible point on the circuit, the terminations at the consumer unit are the next
              place to look.
            </li>
            <li>
              <strong>Look before you test.</strong> A brown conductor in a terminal marked N, or a
              conductor with no identification sleeve where one is needed, is often visible before
              an instrument is picked up.
            </li>
            <li>
              <strong>Record the location and the remedy.</strong> Note where the fault was and what
              was done. On an EICR, a polarity reversal left in service is an observation with a
              classification code and a description of its location.
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
          Polarity is recorded as a confirmation, not a measurement — there is no reading to enter.
          It goes on the schedule of test results accompanying the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate or EICR
          </SEOInternalLink>
          . Amendment 4 redrafted this schedule: the single-page generic schedule is now split into
          a separate schedule of circuit details and a separate schedule of test results.
        </p>
        <div className={plainCardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Per circuit.</strong> Confirm polarity for each circuit tested, alongside
              confirmation of supply polarity at the origin.
            </li>
            <li>
              <strong>Limitations.</strong> Record any circuit or accessory where polarity could not
              be fully verified — a permanently connected appliance you could not gain access to,
              for example — and state why.
            </li>
            <li>
              <strong>Observations.</strong> Any polarity fault found and not put right during the
              visit is recorded as an observation with a classification code, a description and its
              location, so the person ordering the report can act on it.
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Polarity Test Explained: How & Why (BS 7671)"
          description="Polarity testing made simple: what it proves, how to carry it out, and the dead and live tests required by BS 7671 Part 6."
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
          Polarity is often the first test an apprentice learns and the one most easily rushed. A
          methodical route — origin, board, then circuit by circuit outwards — means nothing is
          missed and any reversal is easy to locate afterwards.
        </p>
        <div className={cardCn}>
          <h3 className="text-sm font-semibold text-white">Log polarity per circuit</h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            Use the{' '}
            <SEOInternalLink href="/tools/eicr-certificate">
              Elec-Mate schedule of tests
            </SEOInternalLink>{' '}
            to confirm polarity as you verify each circuit. If you find a reversal, log it as an
            observation with the accessory location straight away — before moving to the next
            circuit, while you can still remember which cupboard it was in.
          </p>
        </div>
        <div className={plainCardCn}>
          <h3 className="text-sm font-semibold text-white">Cross-check with a socket tester</h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            A plug-in socket tester speeds up the check at every outlet on a large installation, but
            it indicates function rather than proving the conductor path, and it cannot distinguish
            every combination of fault. Use it alongside the continuity method, not instead of it.
          </p>
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
      title="Polarity Test: Line Not Neutral, Reg 643.6"
      description="A polarity test proves fuses, switches and socket-outlets are in the line, not the neutral (Reg 643.6). Bell and battery, continuity and live methods."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CheckCircle2}
      heroTitle={
        <>
          Polarity Testing Guide:{' '}
          <span className="text-elec-yellow">Electrical Polarity Test Methods</span>
        </>
      }
      heroSubtitle="The UK electrician's guide to polarity testing — what Regulation 643.6 actually requires, the bell and battery dead test, using a continuity tester, live verification at switch positions, and the reversals that turn up most often."
      readingTime={11}
      answerBox={{
        question: 'What is a polarity test?',
        answer:
          'A polarity test verifies that (a) every fuse and single-pole control and protective device is connected in the line conductor only, (b) except for E14 and E27 lampholders to BS EN 60238, centre contact bayonet and Edison screw lampholders have the outer or screwed contacts connected to the neutral conductor, and (c) wiring has been correctly connected throughout the installation. BS 7671 Regulation 643.6 also requires the polarity of the supply at the origin to be verified before the installation is energised. It is the last of the dead tests in the Regulation 643.1 sequence.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Polarity Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Polarity Test Results On Site with Elec-Mate"
      ctaSubheading="Confirm polarity per circuit and log observations against a specific accessory. Export a compliant EICR PDF before you leave site. 7-day free trial."
    />
  );
}
