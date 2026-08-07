import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Calculator,
  GraduationCap,
  FileCheck2,
  Brain,
  CircleDot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — cards go edge-to-edge on phones
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const tableCardCn = `${cardCn} overflow-x-auto`;

const thCn = 'py-3 pr-5 text-left font-semibold whitespace-nowrap';
const tdCn = 'py-3 pr-5 align-top';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Ring Circuit Faults', href: '/guides/ring-circuit-fault-finding' },
];

const tocItems = [
  { id: 'ring-circuit-basics', label: 'Ring Circuit Basics' },
  { id: 'reading-patterns', label: 'Expected Readings & Fault Patterns' },
  { id: 'open-ring', label: 'Open Ring Fault' },
  { id: 'bridged-ring', label: 'Bridged Ring Fault' },
  { id: 'borrowed-neutral', label: 'Borrowed Neutral' },
  { id: 'interconnected-rings', label: 'Interconnected Rings' },
  { id: 'r1-r2-analysis', label: 'Why the Readings Behave That Way' },
  { id: 'step-by-step', label: 'Step-by-Step Fault Finding' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A ring final circuit forms a complete loop from the consumer unit, around all the sockets and back to the consumer unit. The line, neutral and CPC must all form continuous rings — the CPC ring is a requirement of Regulation 543.2.9.',
  'Regulation 643.2.1(b) is what obliges you to test it: in the case of ring final circuits, the continuity of the live conductors shall be verified by a measurement of resistance.',
  'The most common ring circuit faults are open rings (a break in the ring), bridged rings (a shortcut across the ring), borrowed neutrals (a neutral conductor shared with another circuit) and interconnected rings.',
  'The three-step test proves the ring: measure r1, rn and r2 end-to-end, then cross-connect line to neutral, then line to CPC — measuring at every socket each time.',
  'On a healthy ring the Step 3 line-to-CPC readings are approximately (r1 + r2) / 4 and barely vary between sockets. A reading that climbs or jumps points at an open leg, a spur mistaken for the ring, or an interconnection.',
  "Elec-Mate's testing calculators and voice test entry let you record R1, R2 and R1+R2 readings circuit by circuit while your hands stay on the test leads.",
];

const faqs = [
  {
    question: 'How do you test if a ring circuit is complete?',
    answer:
      'The ring continuity test runs in three steps, and the two cross-connections do different jobs. Step 1: disconnect all six ring conductors at the consumer unit and measure each loop end-to-end — line to line (r1), neutral to neutral (rn) and CPC to CPC (r2). Step 2: cross-connect line to neutral (L1 to N2, and L2 to N1) and measure line-to-neutral at every socket. Every reading should be substantially the same, at approximately (r1 + rn) / 4. This step proves the line and neutral legs. Step 3: remove the Step 2 links, then cross-connect line to CPC (L1 to CPC2, and L2 to CPC1) and measure line-to-CPC at every socket. This reading is the R1+R2 for that outlet, and it is the value the Schedule of Test Results wants and the value that feeds Zs. Note the notation: R2 is the resistance of the circuit protective conductor, never the neutral. Calling the neutral R2 is a common slip — the neutral loop is rn. BS 7671 Regulation 643.2.1(b) requires the continuity of the live conductors of a ring final circuit to be verified by a measurement of resistance; the three-step method is the standard way of doing it.',
  },
  {
    question:
      'Step 2 line-to-neutral reads 0.3 ohms at a socket but Step 3 line-to-CPC gives no reading. Why?',
    answer:
      'A normal Step 2 reading proves the line and neutral legs of the ring are intact and correctly cross-connected at that socket, so the fault is in the protective conductor. If only that one socket reads open at Step 3, the CPC is not connected at that outlet — a conductor out of the earth terminal, a broken CPC in the back box, or a cut CPC in the final section of cable. If every socket reads open at Step 3, the fault is back at the board: either the line-to-CPC links (L1 to CPC2, L2 to CPC1) have not actually been made, or the CPC ring itself is broken — and in that case the Step 1 end-to-end r2 measurement will also read open circuit. Either way, a socket with no earth continuity has no fault path for automatic disconnection, and the CPC of a ring final circuit is required by Regulation 543.2.9 to be run as a ring with both ends at the origin earthing terminal.',
  },
  {
    question: 'What is an open ring and why is it dangerous?',
    answer:
      'An open ring occurs when there is a break in one or both of the ring conductors — meaning the ring is no longer a complete loop. Instead, it functions as a radial circuit from one end of the break. The danger is that the full load current of the ring now flows through a single cable path instead of being shared between two paths. A ring circuit is designed so that the load current divides between the two legs of the ring — each leg carrying roughly half the total current. Regulation 433.1.204 only deems the arrangement to comply with the overload rules if the current-carrying capacity of the cable is not less than 20 A and the load current in any part of the circuit is unlikely to exceed that capacity for long periods. If the ring is broken, one leg carries the full load, and a 2.5mm² cable behind a 32A device may overheat — especially where it is clipped over insulation, buried in insulation, or in a confined space where its current-carrying capacity is derated.',
  },
  {
    question: 'What causes a bridged ring?',
    answer:
      'A bridged ring occurs when a connection creates a shortcut across part of the ring, bypassing some of the sockets. The most common cause is incorrect wiring at a junction box or socket — for example, where a cable that should continue around the ring is instead connected back to an earlier point in the ring, creating a smaller loop within the main ring. This can happen during alterations, extensions or repair work if the electrician does not correctly identify which cables belong to which leg of the ring. A bridged ring is problematic because the section of cable forming the bridge carries a disproportionate share of the load current (since it provides a shorter path). This can cause overheating in the bridged section. The R1+R2 readings at sockets will reveal a bridged ring — sockets within the bridged section will give different readings from sockets outside it, and the smooth progression you expect around a healthy ring breaks down.',
  },
  {
    question: 'What is a borrowed neutral on a ring circuit?',
    answer:
      "A borrowed neutral occurs when a neutral conductor from one circuit is incorrectly connected to a different circuit. On ring circuits, this typically happens when a cable is mis-identified during work at a junction box or socket — the neutral from a lighting circuit or another ring circuit is connected into the ring neutral. The result is that the ring's end-to-end neutral reading (rn) does not match the end-to-end line reading (r1), because the neutral path includes a conductor that is not part of the ring. A borrowed neutral is dangerous because it can result in a neutral conductor carrying current from two circuits simultaneously, potentially exceeding its current-carrying capacity. It also means that isolating the ring circuit at its protective device does not fully isolate the neutral — it remains connected to the other circuit and may still be live. On an EICR this is normally coded C2 (potentially dangerous), though the code is the inspector's judgement on the installation in front of them.",
  },
  {
    question: 'How do I interpret R1+R2 readings on a ring circuit?',
    answer:
      'After the Step 3 cross-connection — line to CPC (L1 to CPC2, L2 to CPC1) — you measure line-to-CPC at each socket. On a healthy ring, every socket should give substantially the same reading, around one quarter of (r1 + r2), where r1 is the end-to-end line resistance and r2 is the end-to-end CPC resistance. Where the CPC is smaller than the line conductor, readings at sockets near the electrical middle of the ring sit slightly higher than those near the consumer unit, forming a gentle curve of only a few per cent. If one or more sockets give significantly higher readings, there is a high-resistance joint or break near those sockets. If one group of sockets gives consistently lower readings than another group, there may be a bridged ring. If r1 and rn differ significantly from each other, suspect a borrowed neutral or a break in one conductor. Critically, the highest R1+R2 reading from any point on the circuit (including spurs) is the value you record on the Schedule of Test Results and add to Ze for the Zs check — recording a lower or average value understates the worst-case loop impedance and can hide a non-compliance.',
  },
  {
    question: 'Can a spur cause ring circuit test results to look wrong?',
    answer:
      'Spurs do not change the readings taken around the ring itself, because a spur is a branch off the ring rather than part of it. When you measure at a socket on a spur, the reading is higher than at the socket the spur originates from, by the resistance of the spur cable — that is normal and expected. Problems arise when a spur is misidentified as part of the ring, or connected badly. BS 7671 Appendix 15 (informative) shows the deemed-to-comply arrangement for Regulation 433.1.204: an unfused spur should feed one single or one twin socket-outlet only, and may be taken from the ring or from the origin of the circuit at the board. A single unfused 2.5mm² spur to a twin socket is therefore a perfectly normal arrangement — the note to Appendix 15 assumes the total design current of a twin BS 1363-2 socket-outlet does not exceed 20 A. What falls outside that arrangement is a spur taken from another spur, an unfused spur feeding several outlets, or a spur run in undersized cable. Always identify which sockets are on spurs — by checking how many cables enter each back box — before you interpret the readings.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ring-circuit-calculator',
    title: 'Ring Circuit Calculator',
    description:
      'Calculate expected R1, R2 and R1+R2 values for ring circuits based on cable size and length.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/intermittent-electrical-faults',
    title: 'Intermittent Electrical Faults',
    description:
      'Systematic approach to finding temperature-dependent, vibration and loose connection faults.',
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
      'Loose connections, arcing and overheated terminals — causes, dangers and emergency actions.',
    icon: AlertTriangle,
    category: 'Guide',
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
    href: '/inspection-testing-course',
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
          socket outlets in UK domestic installations. BS 7671 defines it simply: a final circuit
          arranged in the form of a ring and connected to a single point of supply. The cable
          forms a complete loop — starting at the consumer unit, passing through each socket outlet
          in turn, and returning to the consumer unit. The line, neutral and CPC conductors must all
          form continuous rings.
        </p>
        <p>
          The arrangement is set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Regulation 433.1.204. Accessories to BS 1363 may be supplied through a ring final circuit,
          with or without unfused spurs, protected by a 30 A or 32 A protective device — so a 32 A
          MCB is the usual choice, but not the only compliant one. The circuit is wired in copper
          with line and neutral conductors of at least 2.5mm² (1.5mm² for two-core mineral insulated
          cable to BS EN 60702-1). Such circuits are deemed to satisfy the overload rules of
          Regulation 433.1.1 if the current-carrying capacity of the cable is not less than 20 A and
          the load current in any part of the circuit is unlikely to exceed that capacity for long
          periods.
        </p>
        <p>
          Two further points do the real work in fault finding. Regulation 543.2.9 requires the CPC
          of every ring final circuit to be run in the form of a ring with both ends connected to
          the earthing terminal at the origin — the only exception being where the CPC is formed by
          a metal covering or enclosure containing all the conductors of the ring, such as steel
          conduit. And Regulation 643.2.1(b) requires that, in the case of ring final circuits, the
          continuity of the live conductors is verified by a measurement of resistance. That is the
          regulation behind the three-step test, and it is why ring testing is part of every{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
        </p>
        <p>
          This design works well when the ring is intact. When the ring has a fault — an open ring,
          a bridge, or a borrowed conductor — the current distribution changes and sections of cable
          can carry more current than they are rated for.
        </p>
      </>
    ),
  },
  {
    id: 'reading-patterns',
    heading: 'Expected Readings and Fault Patterns',
    content: (
      <>
        <p>
          Start here. Compare what your instrument is showing against the two tables below before
          you open a single back box — the readings will usually name the fault for you.
        </p>

        <h3 className="mt-6 mb-2 text-[15px] font-semibold tracking-tight text-white">
          What a healthy ring reads
        </h3>
        <div className={tableCardCn}>
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className={thCn}>Measurement</th>
                <th className={thCn}>Taken how</th>
                <th className={thCn}>Healthy result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className={tdCn}>
                  <strong>r1</strong> — end-to-end line
                </td>
                <td className={tdCn}>L1 to L2 at the board, ring disconnected</td>
                <td className={tdCn}>Matches rn to within a few per cent</td>
              </tr>
              <tr>
                <td className={tdCn}>
                  <strong>rn</strong> — end-to-end neutral
                </td>
                <td className={tdCn}>N1 to N2 at the board</td>
                <td className={tdCn}>Matches r1 to within a few per cent</td>
              </tr>
              <tr>
                <td className={tdCn}>
                  <strong>r2</strong> — end-to-end CPC
                </td>
                <td className={tdCn}>CPC1 to CPC2 at the board</td>
                <td className={tdCn}>
                  About 1.67 × r1 for 2.5/1.5mm² twin and earth (the 2.5:1.5 CSA ratio); about
                  2.5 × r1 where the CPC is 1.0mm²
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  <strong>Step 2</strong> — line to neutral
                </td>
                <td className={tdCn}>Link L1–N2 and L2–N1, measure at every socket</td>
                <td className={tdCn}>
                  Substantially the same at every socket, at about (r1 + rn) / 4
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  <strong>Step 3</strong> — line to CPC
                </td>
                <td className={tdCn}>Link L1–CPC2 and L2–CPC1, measure at every socket</td>
                <td className={tdCn}>
                  About (r1 + r2) / 4 at every socket. This is R1+R2 — record the highest value
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 mb-2 text-[15px] font-semibold tracking-tight text-white">
          What each fault pattern means
        </h3>
        <div className={tableCardCn}>
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className={thCn}>What you measured</th>
                <th className={thCn}>Most likely cause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className={tdCn}>
                  Step 1: one of r1, rn or r2 reads open circuit
                </td>
                <td className={tdCn}>
                  Open ring in that conductor — a break, a disconnected joint or a conductor out of
                  a terminal
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  Step 2 normal (say 0.3 Ω) but Step 3 gives no reading at{' '}
                  <strong>one socket</strong>
                </td>
                <td className={tdCn}>
                  The CPC is not connected at that outlet. Line and neutral are proved intact by
                  Step 2, so the break is in the protective conductor at that point
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  Step 2 normal but Step 3 gives no reading at <strong>every socket</strong>
                </td>
                <td className={tdCn}>
                  The Step 3 links have not been made at the board, or the CPC ring is open — the
                  Step 1 r2 measurement will confirm which
                </td>
              </tr>
              <tr>
                <td className={tdCn}>rn significantly higher or lower than r1</td>
                <td className={tdCn}>
                  Borrowed or foreign neutral, or a high-resistance joint in the neutral leg
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  One socket reads noticeably higher than its neighbours at Steps 2 and 3
                </td>
                <td className={tdCn}>
                  That outlet is on a spur, not on the ring — the extra resistance is the spur
                  cable. Confirm by counting the cables in the back box
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  A group of sockets sits outside the smooth progression around the ring
                </td>
                <td className={tdCn}>
                  Bridged ring — a shortcut has been created across part of the loop
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  End-to-end values unexpectedly low, and socket readings low with them
                </td>
                <td className={tdCn}>
                  Interconnection with another ring providing parallel paths. Disconnect the other
                  circuit completely and re-test
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  Readings rise gently towards the middle of the ring and fall again
                </td>
                <td className={tdCn}>
                  Normal. The electrical mid-point socket reads highest — that is the value to record
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <div className={cardCn}>
          <h4 className="mb-3 text-base font-bold text-white">Common causes of open rings</h4>
          <ul className="list-disc space-y-2 pl-5 text-white marker:text-white">
            <li>
              A cable disconnected at a junction box during previous work and not reconnected.
            </li>
            <li>A conductor broken by a nail or screw driven through the cable route.</li>
            <li>
              A loose terminal at a socket outlet where the conductor has fallen out of the terminal.
            </li>
            <li>Rodent damage to the cable sheath and conductors.</li>
          </ul>
        </div>
        <p>
          <strong>How to detect it.</strong> Measure the end-to-end resistance of each conductor at
          the consumer unit. If L1–L2, N1–N2 or CPC1–CPC2 shows open circuit, that conductor ring is
          broken. If all three show continuity but the R1+R2 readings at sockets are not consistent
          — one group of sockets much higher than the rest — you are looking at a high-resistance
          joint, an "almost open" ring that behaves the same way under load.
        </p>
        <p>
          <strong>Why it matters.</strong> Regulation 433.1.204 only deems the ring arrangement to
          satisfy the overload rules while the load current in any part of the circuit stays within
          the cable's current-carrying capacity, which must be at least 20 A. Break the ring and one
          leg can be asked to carry the full circuit load behind a 32 A device.
        </p>
        <p>
          An open ring is normally coded C2 (potentially dangerous) on an EICR because the cable may
          be overloaded under normal use, and C1 where it has already caused overheating or visible
          damage — but the code is a judgement about the installation in front of you, not an
          automatic classification.
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
          A bridged ring occurs when a connection creates a shortcut across part of the ring. Some
          sockets are bypassed — the ring still appears complete when tested end-to-end at the
          consumer unit, but part of it carries a disproportionate share of the load.
        </p>
        <p>
          Bridges are usually caused by incorrect wiring at a socket or junction box during
          alterations. If an electrician adds a socket to an existing ring but mistakenly connects
          both new cables to the same leg of the ring instead of one to each leg, a bridge is
          created.
        </p>
        <div className={cardCn}>
          <h4 className="mb-3 text-base font-bold text-white">How to detect a bridged ring</h4>
          <ul className="list-disc space-y-3 pl-5 text-white marker:text-white">
            <li>
              Carry out the Step 3 line-to-CPC cross-connection and measure at every socket. On a
              healthy ring the readings sit within a few per cent of each other, lowest near the
              consumer unit and highest at the electrical mid-point.
            </li>
            <li>
              On a bridged ring the pattern breaks — a group of sockets inside the bridged section
              reads lower, and the smooth progression around the loop disappears.
            </li>
            <li>
              If r1, rn and r2 all look right end-to-end but the socket readings do not follow the
              expected pattern, start at the sockets where the pattern breaks down and work
              outwards.
            </li>
          </ul>
        </div>
        <p>
          A bridged ring may not cause immediate problems if the load is low, but it reduces the
          effective current-carrying capacity of part of the ring and should be corrected. Coding
          typically falls between C3 (improvement recommended) and C2, depending on the severity and
          the load on the affected section.
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
          connected into another circuit's ring. It is most commonly found where wiring alterations
          have been carried out at a shared junction box, or where cables from different circuits
          pass through the same back box.
        </p>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">How to detect it</dt>
              <dd className="mt-1">
                Measure r1 (end-to-end line ring) and rn (end-to-end neutral ring) separately. On a
                healthy ring, r1 and rn should be near-identical, because both conductors are the
                same size and follow the same route. If rn differs significantly from r1, the
                neutral ring includes a conductor that does not belong.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Why it is dangerous</dt>
              <dd className="mt-1">
                The borrowed neutral may carry current from both circuits at once, potentially
                exceeding its current-carrying capacity. Isolating the ring at its protective device
                does not disconnect it either — it stays connected to the other circuit and may
                still be live.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Typical coding</dt>
              <dd className="mt-1">
                Normally C2 (potentially dangerous), on the grounds of neutral overloading and the
                inability to isolate the circuit fully.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          To locate it, disconnect the neutral conductors at the consumer unit and carry out
          continuity tests to trace which conductor goes where. Opening each socket around the ring
          and identifying the cables will reveal where the foreign neutral enters. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          can help you classify the fault and generate the observation for the EICR.
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
          or more points — a socket on one ring wired to a cable from another, or cables from
          different rings terminated in the same junction box.
        </p>
        <p>
          The result is a larger, irregular ring with an unpredictable current distribution. Some
          sections of cable may carry current from both circuits, exceeding the cable's
          current-carrying capacity, and the two protective devices no longer provide independent
          protection for their respective cables.
        </p>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">How to detect it</dt>
              <dd className="mt-1">
                With the ring disconnected at the consumer unit, one ring may show an unexpectedly
                low end-to-end resistance because the other ring is providing parallel paths.
                Likewise, sockets may give unexpectedly low R1+R2 readings.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">How to confirm it</dt>
              <dd className="mt-1">
                Disconnect one ring circuit completely at the consumer unit — all six conductors —
                then test the other ring. If the second ring still shows continuity to sockets that
                belong to the disconnected circuit, the two rings are interconnected.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Interconnected rings are normally coded C2 (potentially dangerous) and require the
          circuits to be separated. That usually means tracing the cables at the point of
          interconnection and reconnecting them to the correct circuit.
        </p>
        <SEOAppBridge
          title="R1 R2 Calculation Ring Circuit Testing"
          description="R1 R2 calculation for ring circuits: record resistance readings in seconds, spot faults faster, comply with BS 7671:2018+A4:2026. Voice-logged test data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'r1-r2-analysis',
    heading: 'Why the Readings Behave That Way',
    content: (
      <>
        <p>
          The tables above tell you what to look for. This section explains why, which is what lets
          you reason about a reading the tables do not cover.
        </p>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Why r1 and rn should match</dt>
              <dd className="mt-1">
                The line and neutral conductors are the same size and follow the same route, so
                their end-to-end resistances are the same to within measurement tolerance. As an
                indication only, a typical domestic ring of roughly 50 metres of 2.5mm² cable gives
                r1 and rn in the region of 0.35 to 0.55 ohms — but work the expected value out from
                your actual cable length rather than treating that band as a limit.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Why Step 3 reads (r1 + r2) / 4</dt>
              <dd className="mt-1">
                Cross-connecting L1 to CPC2 and L2 to CPC1 turns the ring into two paths in parallel
                between the line and CPC terminals of whichever socket you are at. The two paths
                always add up to r1 + r2, so at the electrical mid-point each path is (r1 + r2) / 2
                and the pair in parallel gives (r1 + r2) / 4.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Why the readings barely move around the ring</dt>
              <dd className="mt-1">
                Where the CPC is the same size as the line conductor — singles in steel conduit, for
                example — the Step 3 reading is identical at every point on the ring. With 2.5/1.5mm²
                twin and earth the two parallel paths are slightly unequal away from the mid-point,
                so the readings at the ends of the ring sit about six per cent below the mid-point
                value. That gentle curve is normal; a jump is not.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Why r2 is higher than r1</dt>
              <dd className="mt-1">
                In 2.5/1.5mm² twin and earth the CPC is the smallest conductor in the cable, so its
                end-to-end resistance is about 1.67 times r1 — the ratio of the cross-sectional
                areas, 2.5 to 1.5. In older cable with a 1.0mm² CPC alongside a 2.5mm² line
                conductor, expect roughly 2.5 times r1.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Why you record the highest reading</dt>
              <dd className="mt-1">
                The highest R1+R2 measured anywhere on the circuit, spurs included, is the value
                that goes on the Schedule of Test Results and gets added to the measured Ze to give
                Zs. Recording an average or a lower reading understates the worst-case loop
                impedance and can hide a circuit that does not meet its disconnection time.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ring-circuit-calculator">
            ring circuit calculator
          </SEOInternalLink>{' '}
          works out the expected R1, R2 and R1+R2 values from the cable size and ring length, giving
          you a reference to compare your measured values against.
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
          When your test results point at a fault, work through this sequence rather than opening
          accessories at random.
        </p>
        <div className={cardCn}>
          <ol className="list-decimal space-y-4 pl-5 text-white marker:font-semibold marker:text-white">
            <li>
              <strong>Confirm safe isolation.</strong> Isolate the ring circuit at its protective
              device and prove dead following the{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation procedure
              </SEOInternalLink>
              , using a voltage indicator and proving unit meeting HSE guidance note GS38.
            </li>
            <li>
              <strong>Disconnect the ring at the consumer unit.</strong> Remove all six conductors
              (L1, L2, N1, N2, CPC1, CPC2) from the consumer unit terminals, and identify which is
              which.
            </li>
            <li>
              <strong>Null the leads and prove the instrument.</strong> Zero the low-resistance
              ohmmeter on the leads you are about to use, and confirm the instrument reads correctly
              before you start.
            </li>
            <li>
              <strong>Step 1 — measure end-to-end resistances.</strong> Test L1–L2 (r1), N1–N2 (rn)
              and CPC1–CPC2 (r2). Record all three. Any open circuit here means that conductor's
              ring is broken.
            </li>
            <li>
              <strong>Step 2 — cross-connect line to neutral.</strong> Link L1 to N2 and L2 to N1,
              then measure line-to-neutral at every socket. Every reading should be substantially
              the same, at about (r1 + rn) / 4. This proves the line and neutral legs, and is where
              a borrowed neutral or a crossed leg shows itself.
            </li>
            <li>
              <strong>Step 3 — cross-connect line to CPC.</strong> Remove the Step 2 links, then
              link L1 to CPC2 and L2 to CPC1 and measure line-to-CPC at every socket. These are the
              R1+R2 values, about (r1 + r2) / 4. The highest reading — normally the socket
              electrically furthest from the consumer unit, or the end of a spur — is the value
              recorded on the Schedule of Test Results and added to Ze to give Zs.
            </li>
            <li>
              <strong>Analyse the pattern.</strong> Take your readings back to the fault-pattern
              table above before you touch anything.
            </li>
            <li>
              <strong>Locate the fault.</strong> It is usually at or next to the socket where the
              readings turn abnormal. Open that socket and its neighbours, inspect the terminals and
              cables, and test individual cable sections.
            </li>
            <li>
              <strong>Repair, restore and re-test.</strong> Correct the fault, reconnect the ring as
              found at the board, and repeat the full three-step test to prove the ring is now
              healthy.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="EICR certificate with ring circuit results"
          description="Elec-Mate's EICR app includes the complete schedule of test results with dedicated fields for ring circuit R1, R2, R1+R2, and Zs values."
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
          Even experienced electricians make these. Every one of them produces a result that looks
          like a fault, or hides one.
        </p>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Not testing at every socket</dt>
              <dd className="mt-1">
                Testing at the board and one or two outlets can miss a bridged ring or an open ring
                that only affects part of the circuit. The pattern is the evidence, and you only see
                the pattern if you measure at every point.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Forgetting the CPC ring</dt>
              <dd className="mt-1">
                Regulation 543.2.9 requires the CPC of every ring final circuit to be run in the
                form of a ring, with both ends connected to the earthing terminal at the origin of
                the circuit. The only exception is where the CPC is formed by a metal covering or
                enclosure containing all of the conductors of the ring — steel conduit, for example.
                If the CPC ring is broken, sockets are left without an earth fault path.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Confusing spurs with ring faults</dt>
              <dd className="mt-1">
                A spur socket reads higher than the socket it branches from, by the resistance of
                the spur cable. That is normal. Identify the spurs — by counting cables in each back
                box — before you interpret anything.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Calling the neutral loop "R2"</dt>
              <dd className="mt-1">
                R2 is the resistance of the circuit protective conductor. The end-to-end neutral is
                rn. Mixing the two up turns a healthy set of readings into an imaginary fault, and
                it is a reliable way to lose marks in a C&amp;G 2391 paper.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Not nulling the leads</dt>
              <dd className="mt-1">
                Always null the low-resistance ohmmeter before taking continuity readings. Lead
                resistance of 0.1 to 0.3 ohms matters a great deal when the values you are
                comparing are below one ohm.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Not proving the instrument before and after</dt>
              <dd className="mt-1">
                Nulling the leads only removes lead resistance — it does not prove the instrument is
                reading accurately. Prove it before you start and again after the test series.
                Chasing a "fault" that turns out to be a failing meter is avoidable.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Assuming the ring is correct because it works</dt>
              <dd className="mt-1">
                A ring can supply every socket perfectly well with an open ring, a bridge or a
                borrowed neutral. Working sockets prove nothing. Only the readings do.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/inspection-testing-course">
            Inspection &amp; Testing training courses
          </SEOInternalLink>{' '}
          cover ring circuit testing in detail, including worked examples of fault analysis from
          R1+R2 readings.
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
      title="Ring Main R1+R2 Test & Fault Finding: (r1+r2)/4"
      description="Healthy ring main: R1+R2 at every socket ≈ (r1+r2)/4, with r1 ≈ rn. Readings that climb or jump mean an open ring, bridged ring or borrowed neutral."
      datePublished="2025-10-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CircleDot}
      heroTitle={
        <>
          Ring Circuit Fault Finding: <span className="text-yellow-400">A Step-by-Step Guide</span>
        </>
      }
      heroSubtitle="Ring circuits are unique to UK wiring practice and their faults require a specific testing approach. This guide covers open rings, bridged rings, borrowed neutrals, interconnected rings, and how to analyse r1, rn, r2 and R1+R2 readings to locate the fault."
      readingTime={12}
      answerBox={{
        question: 'How do you find a fault on a ring final circuit?',
        answer:
          'Use the three-step continuity test from the board. Step 1: with the ring disconnected, measure end-to-end line (r1), neutral (rn) and CPC (r2). Step 2: link L1–N2 and L2–N1 and measure line-to-neutral at every socket — expect (r1 + rn) / 4 throughout. Step 3: swap to L1–CPC2 and L2–CPC1 and measure line-to-CPC — expect (r1 + r2) / 4 throughout. That last figure is R1+R2.',
        detail:
          'The pattern names the fault. An open circuit at Step 1 is a broken ring. A normal Step 2 with no Step 3 reading at one socket means the CPC is not connected at that outlet. rn well away from r1 points at a borrowed neutral. A group of sockets outside the smooth progression is a bridged ring. Regulation 643.2.1(b) of BS 7671:2018+A4:2026 requires the continuity of the live conductors of a ring final circuit to be verified by a measurement of resistance.',
      }}
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
