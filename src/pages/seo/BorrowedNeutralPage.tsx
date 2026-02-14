import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Search,
  Cable,
  FileText,
  Gauge,
  Wrench,
  Unplug,
  GitBranch,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Borrowed Neutral | What It Is & How to Find It';
const PAGE_DESCRIPTION =
  'What is a borrowed neutral fault and how do you find it? Complete guide covering what happens when a neutral from one circuit connects to another circuit, how it causes RCD tripping, symptoms, how to identify by disconnecting neutrals at the DB and resistance testing, how to fix by tracing and reconnecting, and why it matters for safety and test accuracy.';

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'Borrowed Neutral', href: '/guides/borrowed-neutral-explained' },
];

const tocItems = [
  { id: 'what-is-borrowed', label: 'What Is a Borrowed Neutral?' },
  { id: 'how-it-happens', label: 'How It Happens' },
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'how-to-identify', label: 'How to Identify' },
  { id: 'how-to-fix', label: 'How to Fix' },
  { id: 'why-it-matters', label: 'Why It Matters' },
  { id: 'elec-mate', label: 'Document with Elec-Mate' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  "A borrowed neutral occurs when the neutral conductor from one circuit is connected to the neutral of a different circuit — current flows out on one circuit's live but returns on a different circuit's neutral, creating an imbalance that trips RCDs.",
  'The classic symptom is RCD tripping that only occurs when specific combinations of circuits are in use simultaneously — for example, the RCD trips when the kitchen lights and lounge sockets are both on, but holds when either is used alone.',
  "To identify a borrowed neutral, disconnect all neutrals at the distribution board and use resistance testing (continuity) to verify that each circuit's neutral returns to its own neutral terminal, not to another circuit's terminal.",
  'The fix is straightforward in principle but can be labour-intensive: trace the borrowed neutral to the point where it crosses circuits (usually a junction box, back box, or ceiling rose) and reconnect it to the correct circuit neutral.',
  "Elec-Mate's ring circuit calculator identifies ring circuit continuity faults including borrowed neutrals, and the AI Fault Diagnosis tool explains the symptoms and guides the diagnostic process.",
];

const faqs = [
  {
    question: 'What exactly is a borrowed neutral?',
    answer:
      "A borrowed neutral is a wiring fault where the neutral conductor from one electrical circuit has been connected to the neutral conductor (or neutral bar connection) of a different circuit. In a correctly wired installation, every circuit has its own dedicated live conductor and its own dedicated neutral conductor, both connected to the same circuit breaker or RCBO at the distribution board. Current flows out through the live conductor and returns through that circuit's own neutral conductor. When a neutral is \"borrowed\", the current still flows out on the correct live conductor, but some or all of the return current travels through a different circuit's neutral conductor. This creates an imbalance in the current monitored by any RCD protecting either circuit — the RCD sees current going out on one circuit but not all of it coming back on that circuit's neutral, so it interprets this as earth leakage and trips.",
  },
  {
    question: 'Why does a borrowed neutral only trip the RCD when both circuits are in use?',
    answer:
      "An RCD monitors the balance between the current flowing out through the live conductor and the current returning through the neutral conductor. With a borrowed neutral, when only one circuit is in use, all the current still passes through the RCD's toroidal core (even though it returns on the wrong neutral) because both circuits pass through the same RCD on a split-load board. However, when both circuits are energised and carrying load simultaneously, the neutral current from circuit A returns through circuit B's neutral. The RCD monitoring circuit A sees current going out on circuit A's live but only a fraction returning on circuit A's neutral — it interprets the difference as earth leakage. The tripping is triggered by the specific combination of loads on both circuits. If the circuits are on different RCDs, the problem is more apparent: the RCD on circuit A trips because it sees current flowing out but not returning.",
  },
  {
    question: 'How common are borrowed neutral faults in UK homes?',
    answer:
      'Borrowed neutrals are more common than many electricians expect. They are found most frequently in older properties (pre-1990s wiring) where multiple modifications, extensions, and alterations have been carried out over the decades — often by different electricians or by unqualified persons. Common scenarios include: a lighting circuit extended into an extension using the nearest available neutral rather than running a new cable back to the distribution board; a socket outlet spurred from one circuit but with the neutral taken from a nearby junction box belonging to a different circuit; junction boxes in loft spaces where cables from multiple circuits converge and neutrals are incorrectly cross-connected; and DIY modifications where the installer did not understand the importance of neutral integrity. When a split-load consumer unit or RCBO board is retrofitted onto an older installation, previously invisible borrowed neutrals suddenly become apparent because the RCD protection now detects the current imbalance.',
  },
  {
    question: 'Can a borrowed neutral give false test results?',
    answer:
      "Yes, a borrowed neutral can produce misleading test results during inspection and testing. Ring circuit continuity testing (the figure-of-eight test per GN3) will produce incorrect R1, Rn, and R2 values if the ring neutral includes a connection to another circuit's neutral. The measured Rn will not match the expected value and the r1, rn, r2 values at each socket will not follow the expected pattern. Insulation resistance testing can also be affected because disconnecting one circuit at the distribution board may not fully isolate it if its neutral is connected to another circuit that is still energised. Earth fault loop impedance (Zs) readings may also be affected if the neutral return path is through a different circuit's conductor, which may have different impedance characteristics. Always perform a visual inspection and neutral continuity verification before relying on test results from circuits suspected of having shared neutrals.",
  },
  {
    question: 'How do I find the exact point where the neutral is borrowed?',
    answer:
      "Finding the exact crossover point requires methodical tracing. Start at the distribution board: disconnect all neutrals and verify each circuit's neutral conductor returns to its own neutral terminal using a low-resistance ohmmeter or continuity tester. Identify which two circuits share a neutral connection — one circuit's neutral will show continuity to the wrong neutral terminal. Next, visually inspect all junction boxes, ceiling roses, back boxes, and connection points where cables from both circuits converge. The crossover is almost always at a shared junction box or ceiling rose where cables from multiple circuits pass through the same enclosure. In older properties, check loft-mounted junction boxes carefully — these are the most common location for borrowed neutrals because multiple circuits are often brought together in the loft for distribution. If the crossover cannot be found by visual inspection, use a toner/tracer tool to follow the neutral conductor from the distribution board to its termination point.",
  },
  {
    question: 'Can a borrowed neutral be dangerous even without RCD protection?',
    answer:
      "Yes, a borrowed neutral presents safety risks beyond just tripping RCDs. First, if one circuit's neutral is disconnected at the distribution board (for example, during maintenance or testing), any appliance on that circuit that is using the borrowed neutral will still have a return path through the other circuit — but the neutral connection is now indirect and may not provide a reliable low-impedance return. In some configurations, this can result in the neutral floating at an elevated voltage, creating a shock risk. Second, the borrowed neutral carries current from two circuits, which can exceed the current rating of the conductor if both circuits are under load — creating an overheating and fire risk. Third, protective devices (MCBs, fuses) on either circuit cannot properly protect the shared neutral section because they do not see the combined current. For these reasons, a borrowed neutral should always be classified as at least a C2 (potentially dangerous) defect on an EICR.",
  },
];

const sections = [
  {
    id: 'what-is-borrowed',
    heading: 'What Is a Borrowed Neutral?',
    content: (
      <>
        <p>
          A borrowed neutral — also called a shared neutral, cross-connected neutral, or neutral
          swap — is a wiring fault where the neutral conductor from one circuit has been connected
          to the neutral conductor or neutral terminal of a different circuit. Instead of each
          circuit having its own independent live and neutral pair, two circuits share part or all
          of a neutral return path.
        </p>
        <p>
          In a correctly wired installation, current flows out through a circuit's live conductor,
          through the load (appliance, light fitting, etc.), and returns through that same circuit's
          neutral conductor. The current flowing out on the live equals the current returning on the
          neutral. An RCD monitors this balance — if the currents are equal, the RCD remains closed.
          If they differ by more than 30 mA, the RCD trips.
        </p>
        <p>
          When a neutral is borrowed, current from circuit A flows out on circuit A's live but
          returns (wholly or partially) on circuit B's neutral. Circuit A's RCD sees current going
          out but not all of it coming back — it interprets this as earth leakage and trips.
          Meanwhile, circuit B's neutral is carrying current from both circuits, which it was not
          designed to do.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Simple Example</h4>
              <p className="text-white text-sm leading-relaxed">
                Imagine a kitchen light fitting where the lighting circuit cable and a socket
                circuit cable both pass through the same ceiling rose or junction box. During
                installation or modification, the neutral from the socket circuit cable was
                connected to the lighting circuit's neutral terminal (or vice versa). When both the
                kitchen light and a socket on the socket circuit are in use, the RCD detects an
                imbalance and trips. When only one is in use, the RCD may hold because all the
                current still passes through the same RCD on a split-load board.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'how-it-happens',
    heading: 'How Does a Borrowed Neutral Happen?',
    content: (
      <>
        <p>
          Borrowed neutrals rarely happen in brand-new installations by competent electricians. They
          are almost always the result of modifications, extensions, or DIY work carried out after
          the original installation.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                1. Older Installations with Multiple Modifications
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The most common scenario. A property originally wired in the 1960s or 1970s has had
              multiple modifications over the decades — rooms converted, extensions added, new
              circuits run, old circuits extended. At some point, a neutral was connected to the
              nearest available neutral terminal in a shared junction box rather than traced back to
              the correct circuit at the distribution board. This was not always considered a
              problem before RCD protection became standard, because without an RCD there was no
              device to detect the imbalance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">2. DIY Work</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Unqualified persons adding light fittings, sockets, or extending circuits may not
              understand the importance of neutral integrity. A common mistake is connecting a new
              light fitting to the nearest available neutral in a junction box without verifying
              that the neutral belongs to the same circuit as the live feed. The new fitting works
              perfectly — the light turns on and off — so the mistake is not apparent until RCD
              protection is installed or until inspection and testing reveals the fault.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">3. Extension of Circuits</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              When a circuit is extended into a new room or extension, the cable must be run from an
              appropriate point on the existing circuit. If the extension cable's neutral is
              connected at a junction box where another circuit is also present, there is a risk of
              cross-connection. This is particularly common in loft spaces where multiple circuits
              converge — lighting circuits, smoke detector circuits, and sometimes socket circuits
              all pass through the same loft void, and junction boxes containing cables from
              multiple circuits are a frequent source of borrowed neutrals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Unplug className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">4. Revealed by Consumer Unit Upgrade</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Many borrowed neutral faults have existed for years or decades without causing any
              problems — because the original consumer unit had no RCD protection. The fault only
              becomes apparent when the consumer unit is upgraded to include RCDs or RCBOs.
              Suddenly, the device detects the current imbalance that has always existed, and the
              RCD trips. This is one of the most common post-installation complaints after a
              consumer unit upgrade, and the electrician must be prepared to diagnose and rectify
              borrowed neutrals discovered during or after the upgrade.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'symptoms',
    heading: 'Symptoms of a Borrowed Neutral',
    content: (
      <>
        <p>
          Borrowed neutral faults produce a distinctive set of symptoms that, once you know what to
          look for, are quite different from other causes of RCD tripping.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                RCD trips when specific combinations of circuits are used.
              </strong>{' '}
              The RCD holds when circuit A is used alone and holds when circuit B is used alone, but
              trips when both are used simultaneously. This pattern is the hallmark of a borrowed
              neutral — the imbalance only occurs when current flows through both circuits.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                RCD trips immediately after a consumer unit upgrade.
              </strong>{' '}
              The installation worked fine with the old fuse board (no RCD protection), but the new
              board with RCDs trips repeatedly. This strongly suggests a pre-existing borrowed
              neutral that was invisible before RCD protection was installed.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                Incorrect test results on ring circuit testing.
              </strong>{' '}
              When performing the ring circuit continuity test (figure-of-eight method per GN3), the
              measured Rn (neutral ring resistance) does not match the expected value for the cable
              type and length. The r1, rn, and r2 values at individual socket outlets do not follow
              the expected pattern.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Insulation resistance test anomalies.</strong> A
              circuit shows unexpected continuity between its neutral and another circuit's neutral
              when it should be isolated. Or a circuit appears to be live (voltage present on the
              neutral) even after its MCB has been switched off, because the neutral is connected to
              another live circuit.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                Tripping is not related to weather or appliances.
              </strong>{' '}
              Unlike moisture-related tripping (correlates with rain) or nuisance tripping
              (correlates with the number of appliances), borrowed neutral tripping follows a
              circuit-combination pattern. It happens regardless of weather, time of day, or which
              specific appliances are plugged in — it depends only on which circuits are energised.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="AI Fault Diagnosis"
          description="Describe the tripping pattern to Elec-Mate's AI diagnostic agent — which circuits are in use when it trips, whether it correlates with specific circuit combinations — and the AI identifies the borrowed neutral pattern and guides you through the diagnostic process step by step."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'how-to-identify',
    heading: 'How to Identify a Borrowed Neutral',
    content: (
      <>
        <p>
          Confirming a borrowed neutral requires systematic testing at the distribution board. The
          process involves disconnecting neutrals and using continuity testing to verify that each
          circuit's neutral returns to its own neutral terminal.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              1
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Isolate the supply and prove dead.</strong> Follow the{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation procedure
              </SEOInternalLink>
              . Switch off the main switch and lock off. Verify dead at the distribution board
              terminals.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              2
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                Disconnect all neutral conductors at the distribution board.
              </strong>{' '}
              Carefully label each neutral conductor with the circuit number it is supposed to
              belong to (matching the live/MCB position). Remove all neutrals from the neutral bar
              so that no circuit neutrals are connected at the board.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              3
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                Test continuity between each circuit's live and neutral at the DB.
              </strong>{' '}
              With all neutrals disconnected and all switches/accessories on the circuit turned off,
              test continuity between the circuit's live conductor (at the MCB) and the circuit's
              neutral conductor (disconnected from the neutral bar). There should be no continuity
              (open circuit) because the circuit has no load connected.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              4
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Test for cross-connections between neutrals.</strong>{' '}
              Test continuity between each disconnected neutral conductor and every other
              disconnected neutral conductor. If two neutrals from different circuits show
              continuity, they are connected somewhere in the installation — this confirms a
              borrowed neutral between those two circuits.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              5
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Locate the crossover point.</strong> Once you know
              which two circuits share a neutral, visually inspect every junction box, ceiling rose,
              back box, and connection point where cables from both circuits are present. The
              crossover is almost always at a shared junction box or fitting. In older properties,
              check loft-mounted junction boxes first — they are the most common location.
            </p>
          </div>
        </div>
        <p>
          For ring circuits, the{' '}
          <SEOInternalLink href="/tools/ring-circuit-calculator">
            ring circuit continuity test
          </SEOInternalLink>{' '}
          (figure-of-eight method) will reveal abnormal Rn values if the ring neutral includes a
          connection to another circuit. If the measured Rn differs significantly from the expected
          value for the cable type and length, suspect a borrowed neutral.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-fix',
    heading: 'How to Fix a Borrowed Neutral',
    content: (
      <>
        <p>
          The fix for a borrowed neutral is conceptually simple: trace the incorrectly connected
          neutral conductor to the point where it crosses circuits and reconnect it to the correct
          circuit's neutral. In practice, this can range from a quick five-minute job (if the
          crossover is at an accessible junction box) to a longer exercise involving cable tracing
          through concealed routes.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">At an Accessible Junction Box</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If the crossover is at a junction box in the loft, under the floor, or behind an
              accessible panel, the fix is straightforward. Open the junction box, identify which
              neutral conductor belongs to which circuit (use a toner/tracer or continuity testing
              from the distribution board), disconnect the borrowed neutral, and reconnect it to the
              correct circuit's neutral terminal. Ensure all connections are tight and the junction
              box is properly enclosed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">At a Ceiling Rose or Accessory</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Ceiling roses are a common location for borrowed neutrals because multiple cables
              (feed, switch wire, loop to next fitting) converge in a single enclosure. Remove the
              ceiling rose, identify all conductors using a toner or continuity testing, reconnect
              the borrowed neutral to the correct circuit, and refit the ceiling rose. The same
              approach applies to back boxes where spur cables from different circuits share the
              same enclosure.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Running a New Neutral</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              In some cases, the crossover occurs at an inaccessible point or the original cable
              route makes it impossible to simply swap neutrals at a junction box. The solution may
              be to run a new neutral conductor from the distribution board to the point where the
              circuit needs its own neutral. This is more labour-intensive but ensures a clean
              separation of circuits. The new neutral must be of the same cross-sectional area as
              the existing circuit conductors and must be installed in accordance with BS 7671.
            </p>
          </div>
        </div>
        <p>After fixing the borrowed neutral, retest the affected circuits:</p>
        <ul className="space-y-2 my-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              Verify neutral continuity from each circuit's neutral terminal at the DB to each
              accessory on that circuit
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              Confirm no cross-continuity between neutrals of different circuits
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              Re-perform{' '}
              <SEOInternalLink href="/guides/insulation-resistance-testing">
                insulation resistance testing
              </SEOInternalLink>{' '}
              on both affected circuits
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              Test the RCD — energise both circuits simultaneously and confirm the RCD holds
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              For ring circuits, re-perform the ring circuit continuity test to verify correct Rn
              values
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why a Borrowed Neutral Matters',
    content: (
      <>
        <p>
          A borrowed neutral is not just an inconvenience that trips the RCD — it creates several
          safety risks that make it a serious defect requiring remediation.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">RCD Protection Is Compromised</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The primary concern. A borrowed neutral means the RCD cannot correctly monitor earth
              leakage on the affected circuits. Current from one circuit returning on another
              circuit's neutral creates a standing imbalance that may cause the RCD to trip
              (inconvenient) or may partially desensitise the RCD to genuine earth faults
              (dangerous). Either way, the RCD protection is not functioning as designed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">False Test Results</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              As described in the symptoms section, a borrowed neutral produces misleading test
              results for ring circuit continuity, insulation resistance, and earth fault loop
              impedance. An electrician relying on these false results may certify an installation
              as compliant when it is not, or may misdiagnose other faults because the test data is
              corrupted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Overloaded Neutral</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The shared neutral section carries current from two circuits simultaneously. If both
              circuits are under heavy load, the neutral current can exceed the conductor's rated
              capacity, causing overheating. Unlike the live conductors, the neutral is not
              protected by an MCB or fuse — there is no overcurrent protection on the neutral in a
              standard installation. This creates a genuine fire risk.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Shock Risk When Isolating Circuits</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If an electrician isolates one circuit at the distribution board (switching off the
              MCB) for maintenance, the neutral of that circuit may still be energised because it is
              connected to another circuit that remains live. This creates a shock risk for anyone
              working on the supposedly dead circuit and undermines the safe isolation procedure.
            </p>
          </div>
        </div>
        <p>
          For these reasons, a borrowed neutral should be classified as at least a Code C2
          (potentially dangerous) defect on an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>, with a
          recommendation for immediate investigation and rectification.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Document Borrowed Neutral Faults with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides several features that help electricians identify, diagnose, and
          document borrowed neutral faults.
        </p>
        <SEOAppBridge
          title="Ring Circuit Calculator"
          description="Elec-Mate's ring circuit calculator helps identify ring circuit faults including borrowed neutrals. Enter your measured R1, Rn, and R2 values and the app flags any anomalies that suggest a neutral connection to another circuit. Expected values are calculated based on cable type and length for comparison."
          icon={Calculator}
        />
        <SEOAppBridge
          title="Defect Code AI"
          description="Describe the borrowed neutral finding to the Defect Code AI and it classifies the severity, assigns the appropriate observation code, and recommends the remedial action for the EICR. It considers factors such as the number of circuits affected, the earthing arrangement, and the type of RCD protection in place."
          icon={Search}
        />
        <p>
          The <SEOInternalLink href="/guides/eicr-certificate">EICR form</SEOInternalLink> records
          the finding with the observation code, recommended remedial action, and priority. The
          certificate provides the client with clear documentation of the fault and the reason for
          the recommended work, supporting your quotation for the repair.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/nuisance-tripping-rcd',
    title: 'Nuisance Tripping',
    description:
      'When the RCD trips for no apparent reason — differentiate from borrowed neutrals.',
    icon: AlertTriangle,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Complete guide to all causes of RCD tripping including shared neutral faults.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/circuit-breaker-keeps-tripping',
    title: 'Circuit Breaker Keeps Tripping',
    description:
      'MCB tripping vs RCD tripping — when the problem is overcurrent, not neutral faults.',
    icon: Zap,
    category: 'Troubleshooting',
  },
  {
    href: '/tools/ring-circuit-calculator',
    title: 'Ring Circuit Calculator',
    description:
      'Verify ring circuit continuity and identify neutral faults with r1, rn, r2 values.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate',
    description: 'Record borrowed neutral findings with observation codes on the EICR.',
    icon: FileText,
    category: 'Certification',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'Verify circuit integrity after fixing a borrowed neutral fault.',
    icon: Gauge,
    category: 'Testing',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BorrowedNeutralPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-11-01"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Cable}
      heroTitle={
        <>
          Borrowed Neutral Fault?
          <br />
          <span className="text-yellow-400">How to Find and Fix It</span>
        </>
      }
      heroSubtitle="A borrowed neutral is a wiring fault where the neutral from one circuit is connected to another circuit's neutral. It causes unexplained RCD tripping, false test results, and safety risks. This guide covers what it is, how it happens, the telltale symptoms, how to find the crossover point, and how to fix it."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Identify Wiring Faults Faster with Elec-Mate"
      ctaSubheading="Ring circuit calculator, AI fault diagnosis, defect code AI, and digital EICR forms. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
