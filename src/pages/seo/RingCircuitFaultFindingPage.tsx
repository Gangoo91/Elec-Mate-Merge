import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  Brain,
  Activity,
  Cable,
  CircleDot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Ring Circuit Faults', href: '/guides/ring-circuit-fault-finding' },
];

const tocItems = [
  { id: 'ring-circuit-basics', label: 'Ring Circuit Basics' },
  { id: 'open-ring', label: 'Open Ring Fault' },
  { id: 'bridged-ring', label: 'Bridged Ring Fault' },
  { id: 'borrowed-neutral', label: 'Borrowed Neutral' },
  { id: 'interconnected-rings', label: 'Interconnected Rings' },
  { id: 'r1-r2-analysis', label: 'R1 R2 R1+R2 Test Analysis' },
  { id: 'step-by-step', label: 'Step-by-Step Fault Finding' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A ring circuit forms a complete loop from the consumer unit, around all the sockets, and back to the consumer unit — both the line and neutral conductors must form continuous rings.',
  'The most common ring circuit faults are open rings (a break in the ring), bridged rings (a shortcut across the ring), borrowed neutrals (a neutral conductor shared between circuits), and interconnected rings.',
  'The R1+R2 cross-connection test at the consumer unit is the primary method for confirming ring continuity — measure at each socket and the readings should follow a predictable pattern.',
  'If the R1+R2 readings at the consumer unit are significantly different from the expected value (approximately one quarter of the end-to-end resistance), a ring fault is present.',
  "Elec-Mate's testing calculators and voice test entry let you record R1, R2, and R1+R2 readings circuit by circuit while your hands stay on the test leads.",
];

const faqs = [
  {
    question: 'How do you test if a ring circuit is complete?',
    answer:
      'To test if a ring circuit is complete, carry out the R1+R2 cross-connection test at the consumer unit. First, disconnect both ends of the line conductor (L1 and L2) at the consumer unit. Measure the resistance between L1 and L2 — this is the end-to-end resistance of the line ring (R1). Then disconnect both ends of the neutral conductor (N1 and N2) and measure the end-to-end resistance of the neutral ring (R2). Then disconnect both ends of the earth conductor (CPC1 and CPC2) and measure the end-to-end resistance of the CPC ring. Next, cross-connect L1 to N2 and L2 to N1 (connecting the start of the line ring to the end of the neutral ring, and vice versa). Now measure the resistance between L and N at each socket around the ring. If the ring is complete, the reading at each socket should be approximately the same — around one quarter of (R1 + R2). If any socket gives a reading significantly different from the others, there is a fault in the ring near that socket.',
  },
  {
    question: 'What is an open ring and why is it dangerous?',
    answer:
      'An open ring occurs when there is a break in one or both of the ring conductors — meaning the ring is no longer a complete loop. Instead, it functions as a radial circuit from one end of the break. The danger is that the full load current of the ring now flows through a single cable path instead of being shared between two paths. A ring circuit is designed so that the load current divides between the two legs of the ring — each leg carrying roughly half the total current. If the ring is broken, one leg carries the full load, which can exceed the cable current-carrying capacity. A 32A MCB protects the ring circuit, but if the open ring leaves a single 2.5mm² cable carrying 32A, the cable may overheat — especially if it is clipped, in insulation, or in a confined space where its current-carrying capacity is derated.',
  },
  {
    question: 'What causes a bridged ring?',
    answer:
      'A bridged ring occurs when a connection creates a shortcut across part of the ring, bypassing some of the sockets. The most common cause is incorrect wiring at a junction box or socket — for example, where a cable that should continue around the ring is instead connected back to an earlier point in the ring, creating a smaller loop within the main ring. This can happen during alterations, extensions, or repair work if the electrician does not correctly identify which cables belong to which leg of the ring. A bridged ring is problematic because the section of cable forming the bridge carries a disproportionate share of the load current (since it provides a shorter path). This can cause overheating in the bridged section. The R1+R2 readings at sockets will reveal a bridged ring — sockets within the bridged section will give different readings from sockets outside it.',
  },
  {
    question: 'What is a borrowed neutral on a ring circuit?',
    answer:
      "A borrowed neutral occurs when a neutral conductor from one circuit is incorrectly connected to a different circuit. On ring circuits, this typically happens when a cable is mis-identified during work at a junction box or socket — the neutral from a lighting circuit or another ring circuit is connected into the ring neutral. The result is that the ring's R2 (neutral) value does not match the R1 (line) value, because the neutral path includes a conductor that is not part of the ring. A borrowed neutral is dangerous because it can result in a neutral conductor carrying current from two circuits simultaneously, potentially exceeding its current-carrying capacity. It also means that isolating the ring circuit at the MCB does not fully isolate the neutral — it remains connected to the other circuit and may still be live. This is a C2 (Potentially Dangerous) defect.",
  },
  {
    question: 'How do I interpret R1+R2 readings on a ring circuit?',
    answer:
      'After cross-connecting the conductors at the consumer unit (L1 to N2, L2 to N1), you measure L-N resistance at each socket. On a healthy ring, every socket should give approximately the same reading — around one quarter of (R1 + R2), where R1 is the end-to-end line resistance and R2 is the end-to-end neutral resistance. In practice, the readings at sockets near the middle of the ring will be slightly higher than those near the consumer unit, forming a gentle curve. If the readings are uniform, the ring is healthy. If one or more sockets give significantly higher readings, there is a high-resistance joint or break near those sockets. If one group of sockets gives consistently lower readings than another group, there may be a bridged ring. If R1 and R2 are significantly different from each other (they should be similar if both conductors are the same size and length), suspect a borrowed neutral or a break in one conductor.',
  },
  {
    question: 'Can a spur cause ring circuit test results to look wrong?',
    answer:
      'Spurs themselves should not affect the R1+R2 readings taken around the ring, because a spur is a branch off the ring, not part of the ring itself. When you measure at a socket on a spur, the reading will be slightly higher than the reading at the socket where the spur originates (because you are measuring through the spur cable as well as the ring). This is normal and expected. However, problems arise if a spur has been incorrectly connected. A "double spur" (a spur taken from another spur) is not permitted under BS 7671, and an unfused spur feeding a double socket means the spur cable may be overloaded. If a spur has been connected with incorrect conductor sizes, or if the spur neutral has been borrowed from another circuit, the readings will be abnormal. Always identify which sockets are on spurs (by checking which cables enter each socket back box) and consider the spur arrangement when interpreting your test results.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/intermittent-electrical-faults',
    title: 'Intermittent Electrical Faults',
    description:
      'Systematic approach to finding temperature-dependent, vibration, and loose connection faults.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/overloaded-circuit-signs',
    title: 'Overloaded Circuit Signs',
    description:
      'How to recognise circuit overload, maximum demand calculation, and when to add new circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell from Socket',
    description:
      'Loose connections, arcing, and overheated terminals — causes, dangers, and emergency actions.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/calculators/ring-circuit',
    title: 'Ring Circuit Calculator',
    description:
      'Calculate expected R1, R2, and R1+R2 values for ring circuits based on cable size and length.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ring-circuit-basics',
    heading: 'Ring Circuit Basics',
    content: (
      <>
        <p>
          A ring final circuit (commonly called a "ring main") is the standard method of wiring
          socket outlets in UK domestic installations. The circuit uses 2.5mm² cable protected by a
          32A MCB, and the cable forms a complete loop — starting at the consumer unit, passing
          through each socket outlet in turn, and returning to the consumer unit. Both the line,
          neutral, and CPC (circuit protective conductor) must form continuous rings.
        </p>
        <p>
          The ring arrangement is specified in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Appendix 15
          </SEOInternalLink>{' '}
          and allows a 32A MCB to be used with 2.5mm² cable because the load current is shared
          between the two legs of the ring. At any point on the ring, the current divides between
          the shorter path and the longer path, so no single section of cable carries the full 32A.
        </p>
        <p>
          This design works well when the ring is intact. But when the ring has a fault — an open
          ring, a bridge, or a borrowed conductor — the current distribution changes and sections of
          cable can carry more current than they are rated for. This is why ring circuit testing is
          a critical part of every{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> and why
          understanding ring circuit faults is essential for every inspector.
        </p>
      </>
    ),
  },
  {
    id: 'open-ring',
    heading: 'Open Ring: A Break in the Loop',
    content: (
      <>
        <p>
          An open ring occurs when one or more of the ring conductors is broken — the loop is no
          longer complete. The circuit still works (sockets still have power) because current can
          still reach each socket from one direction, but it is now operating as a radial circuit
          rather than a ring.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">Common causes of open rings</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                A cable disconnected at a junction box during previous work and not reconnected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>A conductor broken by a nail or screw driven through the cable route.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                A loose terminal at a socket outlet where the conductor has fallen out of the
                terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Rodent damage to the cable sheath and conductors.</span>
            </li>
          </ul>
        </div>
        <p>
          <strong>How to detect:</strong> Measure the end-to-end resistance of each conductor at the
          consumer unit. If either L1-L2, N1-N2, or CPC1-CPC2 shows open circuit (infinite
          resistance), that conductor ring is broken. If the ring shows continuity but the R1+R2
          readings at sockets are not uniform (one group of sockets gives much higher readings),
          there may be a high-resistance joint that is effectively an "almost open" ring.
        </p>
        <p>
          An open ring is typically classified as a C2 (Potentially Dangerous) defect on the EICR
          because the cable may be overloaded under normal use. If the open ring has caused
          overheating or visible damage, it may be classified as C1.
        </p>
      </>
    ),
  },
  {
    id: 'bridged-ring',
    heading: 'Bridged Ring: A Shortcut in the Loop',
    content: (
      <>
        <p>
          A bridged ring occurs when a connection creates a shortcut across part of the ring. This
          means some sockets are bypassed — the ring still appears to be complete when tested at the
          consumer unit, but part of the ring carries a disproportionate share of the load.
        </p>
        <p>
          Bridges are usually caused by incorrect wiring at a socket or junction box during
          alterations. For example, if an electrician adds a socket to an existing ring but
          mistakenly connects both new cables to the same leg of the ring (instead of one to each
          leg), a bridge is created.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">How to detect a bridged ring</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Carry out the R1+R2 cross-connection test and measure at every socket. On a healthy
                ring, the readings follow a smooth curve — lowest at the ends (near the consumer
                unit) and highest in the middle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                On a bridged ring, the readings will show an abnormal pattern — a group of sockets
                with lower readings (within the bridged section) and another group with higher
                readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the R1 and R2 end-to-end readings are equal but the R1+R2 socket readings do not
                follow the expected pattern, investigate the sockets where the pattern breaks down.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A bridged ring may not cause immediate problems if the load is low, but it reduces the
          current-carrying capacity of part of the ring and should be corrected. It is typically
          classified as a C3 (Improvement Recommended) or C2 depending on the severity and the load
          on the affected section.
        </p>
      </>
    ),
  },
  {
    id: 'borrowed-neutral',
    heading: 'Borrowed Neutral: A Conductor from Another Circuit',
    content: (
      <>
        <p>
          A borrowed neutral occurs when the neutral conductor from one circuit is incorrectly
          connected into another circuit's ring. This is most commonly found where wiring
          alterations have been carried out at a shared junction box or where cables from different
          circuits pass through the same back box.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to detect:</strong> Measure R1 (end-to-end line ring) and R2 (end-to-end
                neutral ring) separately. On a healthy ring, R1 and R2 should be approximately equal
                (since both conductors are the same size and follow the same route). If R2 is
                significantly different from R1, the neutral ring includes a conductor that does not
                belong — a borrowed neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it is dangerous:</strong> The borrowed neutral may carry current from
                both circuits simultaneously, potentially exceeding its current-carrying capacity.
                Additionally, isolating the ring circuit at the MCB does not disconnect the borrowed
                neutral — it remains connected to the other circuit and may still carry current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Classification:</strong> A borrowed neutral is typically classified as C2
                (Potentially Dangerous) because of the risk of neutral overloading and the inability
                to fully isolate the circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To locate the borrowed neutral, disconnect the neutral conductors at the consumer unit and
          carry out continuity tests to trace which conductor goes where. Opening each socket around
          the ring and identifying the cables will eventually reveal where the foreign neutral
          enters the ring. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          can help you classify this fault correctly and generate the appropriate observation for
          the EICR.
        </p>
      </>
    ),
  },
  {
    id: 'interconnected-rings',
    heading: 'Interconnected Rings: Two Rings Joined Together',
    content: (
      <>
        <p>
          Interconnected rings occur when two separate ring circuits are connected together at one
          or more points. This can happen when a socket on one ring is inadvertently connected to a
          cable from another ring, or when cables from different rings are terminated in the same
          junction box.
        </p>
        <p>
          The result is a larger, irregular ring with an unpredictable current distribution. Some
          sections of cable may carry current from both circuits, exceeding the cable's
          current-carrying capacity. The MCBs for the two circuits no longer provide independent
          protection for their respective cables.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to detect:</strong> When you disconnect the ring at the consumer unit
                and carry out end-to-end resistance tests, you may find that one ring appears to
                have a very low resistance (because it is connected to the other ring, providing
                parallel paths). Alternatively, when testing R1+R2 at each socket, you may find
                sockets that give unexpectedly low readings because current is flowing through the
                other ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to confirm:</strong> Disconnect one ring circuit completely at the
                consumer unit (all conductors). Now test the other ring. If the other ring still
                shows continuity to sockets that should be on the disconnected circuit, the two
                rings are interconnected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Interconnected rings are typically classified as C2 (Potentially Dangerous) and require
          the circuits to be separated. This usually involves tracing the cables at the point of
          interconnection and reconnecting them to the correct circuit.
        </p>
        <SEOAppBridge
          title="Record ring circuit test results by voice"
          description="Testing a ring circuit? Speak your R1, R2, and R1+R2 readings and Elec-Mate fills in the schedule of test results while your hands stay on the probes. Test faster, document everything, and spot faults from the data patterns."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'r1-r2-analysis',
    heading: 'R1 R2 R1+R2 Test Analysis: What the Numbers Tell You',
    content: (
      <>
        <p>
          Understanding the expected values and patterns in ring circuit test results is the key to
          diagnosing faults. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1 and R2 should be approximately equal.</strong> Both the line and neutral
                conductors are the same size (2.5mm²) and follow the same route, so their end-to-end
                resistances should be very similar. For a typical domestic ring of approximately 50
                metres of cable, expect R1 and R2 to be around 0.35 to 0.55 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 at the consumer unit should be approximately (R1 + R2) / 4.</strong>{' '}
                After cross-connecting, the reading at the consumer unit should be about one quarter
                of the sum of R1 and R2. This is because the cross-connection creates two parallel
                paths, halving the resistance, and the measurement includes both L and N conductors,
                halving it again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 at each socket should follow a curve.</strong> The lowest readings are
                at sockets near the consumer unit (both ends of the ring). The highest reading is at
                the socket electrically in the middle of the ring. The variation should be smooth
                and gradual.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC end-to-end should be higher than R1 or R2.</strong> If the CPC is 1.5mm²
                (common in older 2.5/1.5 cable), its end-to-end resistance will be approximately
                1.67 times the R1 value. If the CPC is 1.0mm², it will be approximately 2.5 times
                R1.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators/ring-circuit">
            ring circuit calculator
          </SEOInternalLink>{' '}
          calculates the expected R1, R2, and R1+R2 values based on the cable size and estimated
          ring length, giving you a reference to compare your measured values against. Any
          significant deviation from the expected values points to a fault.
        </p>
      </>
    ),
  },
  {
    id: 'step-by-step',
    heading: 'Step-by-Step Ring Circuit Fault Finding',
    content: (
      <>
        <p>
          When your ring circuit test results indicate a fault, follow this systematic process to
          locate it:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Confirm safe isolation.</strong> Isolate the ring circuit at the MCB and
              confirm dead using a voltage indicator and proving unit per{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                GS38 safe isolation procedure
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Disconnect the ring at the consumer unit.</strong> Remove all six conductors
              (L1, L2, N1, N2, CPC1, CPC2) from the consumer unit terminals.
            </li>
            <li>
              <strong>Measure end-to-end resistances.</strong> Test L1-L2 (R1), N1-N2 (R2), and
              CPC1-CPC2. Record the values. If any show open circuit, that conductor is broken.
            </li>
            <li>
              <strong>Cross-connect and measure.</strong> Cross-connect L1-N2 and L2-N1. Measure L-N
              at the consumer unit and at every socket around the ring. Record all readings.
            </li>
            <li>
              <strong>Analyse the pattern.</strong> Compare your readings against expected values.
              Look for the abnormalities described above (uneven readings, unexpected lows or
              highs).
            </li>
            <li>
              <strong>Locate the fault.</strong> The fault is usually near the socket where the
              readings become abnormal. Open that socket and the adjacent sockets, inspect the
              terminals and cables, and carry out continuity tests on individual cable sections.
            </li>
            <li>
              <strong>Repair and re-test.</strong> Once the fault is found, repair it (re-terminate,
              replace cable, separate circuits) and repeat the full ring test to confirm the ring is
              now healthy.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="EICR certificate with ring circuit results"
          description="Elec-Mate's EICR app includes the complete schedule of test results with dedicated fields for ring circuit R1, R2, R1+R2, and Zs values. Record by voice, verify with calculators, and export as a professional PDF."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes When Testing Ring Circuits',
    content: (
      <>
        <p>
          Even experienced electricians can make mistakes when testing ring circuits. Here are the
          most common pitfalls:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not testing at every socket.</strong> Only testing at the consumer unit and
                one or two sockets can miss a bridged ring or an open ring that only affects part of
                the circuit. You must test at every socket to see the full pattern.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting to test the CPC ring.</strong> The CPC must also form a complete
                ring. A broken CPC ring means some sockets have no earth fault path, which is a
                serious safety defect (C1 or C2).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confusing spurs with ring faults.</strong> A spur socket will give a higher
                R1+R2 reading than the socket it branches from. This is normal — it does not
                indicate a ring fault. Identify spurs before interpreting results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not nulling the test leads.</strong> Always null (zero) your low-resistance
                ohmmeter before taking continuity readings. Lead resistance of 0.1 to 0.3 ohms can
                significantly affect ring circuit readings where total values may be less than 1
                ohm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assuming the ring is correct because it "works".</strong> A ring circuit can
                supply power to all sockets even if it has an open ring, a bridged ring, or a
                borrowed neutral. Functional sockets do not mean a healthy ring. Only the test
                results tell the truth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            Inspection & Testing training courses
          </SEOInternalLink>{' '}
          cover ring circuit testing in detail, including worked examples of fault analysis from
          R1+R2 readings. Perfect for C&G 2391 exam preparation.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RingCircuitFaultFindingPage() {
  return (
    <GuideTemplate
      title="Ring Circuit Fault Finding | Step-by-Step Guide"
      description="Step-by-step guide to ring circuit fault finding. Covers open rings, bridged rings, borrowed neutrals, interconnected rings, and how to analyse R1, R2, and R1+R2 test results to locate faults."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CircleDot}
      heroTitle={
        <>
          Ring Circuit Fault Finding: <span className="text-yellow-400">A Step-by-Step Guide</span>
        </>
      }
      heroSubtitle="Ring circuits are unique to UK wiring practice and their faults require a specific testing approach. This guide covers open rings, bridged rings, borrowed neutrals, interconnected rings, and how to analyse R1, R2, and R1+R2 readings to locate the fault."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Ring Circuit Faults"
      relatedPages={relatedPages}
      ctaHeading="Test Smarter with Elec-Mate"
      ctaSubheading="Voice test entry, ring circuit calculator, AI defect coding, and professional EICR certificates — all from your phone. Test ring circuits faster and document every result. 7-day free trial."
    />
  );
}
