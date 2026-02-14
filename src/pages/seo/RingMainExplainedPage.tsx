import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  CircuitBoard,
  TestTube2,
  Search,
  BookOpen,
  Wrench,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'Ring Main', href: '/guides/ring-main-explained' },
];

const tocItems = [
  { id: 'what-is-ring', label: 'What Is a Ring Final Circuit?' },
  { id: 'how-ring-works', label: 'How a Ring Circuit Works' },
  { id: 'testing-ring', label: 'Testing Ring Final Circuits' },
  { id: 'max-demand', label: 'Max Demand and Diversity' },
  { id: 'common-faults', label: 'Common Ring Circuit Faults' },
  { id: 'ring-vs-radial', label: 'Ring vs Radial: The Debate' },
  { id: 'spurs', label: 'Spurs on Ring Circuits' },
  { id: 'when-to-use-ring', label: 'When to Use a Ring Circuit' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A ring final circuit uses 2.5mm2 cable in a loop from the consumer unit, around all socket outlets, and back to the consumer unit — protected by a 32A MCB and serving a maximum floor area of 100m2.',
  'Testing a ring circuit requires the figure-of-eight test (cross-connection method): measure R1, R2, and R1+R2 to verify the ring is complete, correctly connected, and has no breaks or interconnections.',
  'Common ring faults include broken rings (cable damage or disconnected core), spurs from the wrong point, and interconnections — all are invisible to the occupant but dangerous and must be found by testing.',
  'The ring vs radial debate continues, but radials on 4.0mm2 cable with a 32A MCB are increasingly preferred for new installations due to simpler installation, easier testing, and better fault loop impedance.',
  "Elec-Mate's EIC and EICR certificate apps include the full ring circuit test schedule — enter R1, R2, and R1+R2 values and the app validates the readings automatically.",
];

const faqs = [
  {
    question: 'What is a ring final circuit?',
    answer:
      'A ring final circuit (often called a "ring main" in everyday language, although technically that term refers to the DNO distribution network) is a wiring topology where a cable starts at the consumer unit, loops through all the socket outlets on the circuit, and returns to the same MCB at the consumer unit. Both ends of the cable — the outgoing leg and the return leg — are connected to the same terminals on the MCB, neutral bar, and earth bar. This creates a closed loop (ring) through which current can flow in both directions to reach any socket. The standard specification under BS 7671 is 2.5mm2 Twin and Earth cable protected by a 32A MCB (or RCBO), serving a maximum floor area of 100m2. The ring topology is unique to the UK and Ireland — most other countries use radial circuits exclusively.',
  },
  {
    question: 'How do I test a ring final circuit?',
    answer:
      'Testing a ring final circuit requires the cross-connection (figure-of-eight) method described in GN3 (Guidance Note 3: Inspection and Testing). Step 1: Identify the two ends of the ring at the consumer unit and disconnect them. Step 2: Measure the end-to-end resistance of the line conductor loop (r1) — connect the meter to one end of the outgoing L and one end of the return L. Step 3: Measure the end-to-end resistance of the neutral conductor loop (rn) — same method for the N conductors. Step 4: Measure the end-to-end resistance of the CPC loop (r2) — same method for the E conductors. r1 and rn should be approximately equal (both are the same cable size). r2 will be higher (the CPC is a smaller conductor). Step 5: Cross-connect L to L and N to N at the consumer unit end (creating a figure-of-eight). Measure the resistance at every socket outlet — the readings should all be approximately r1/4. Step 6: Cross-connect L to E and N to N. Measure at every socket — this gives the R1+R2 value at each point. The highest R1+R2 value is used for Zs calculations.',
  },
  {
    question: 'What is the maximum number of sockets on a ring circuit?',
    answer:
      'BS 7671 does not specify a maximum number of socket outlets on a ring final circuit. The only limit is the floor area served — a maximum of 100m2 for a ring on 2.5mm2 cable. In practice, you can have as many sockets as needed within that floor area. Each socket can supply up to 13A (limited by the plug fuse), and the 32A MCB protects the cable rather than limiting the total socket count. The diversity factor means that not all sockets will be fully loaded simultaneously, so the circuit will not normally exceed the 32A cable rating in domestic use. However, if you are designing a circuit for a location where many sockets will be heavily loaded simultaneously (such as a kitchen or workshop), a dedicated radial circuit or multiple circuits may be more appropriate.',
  },
  {
    question: 'What is a spur on a ring circuit?',
    answer:
      'A spur is a branch cable that extends from a socket on the ring to feed additional socket outlets or a fused connection unit. Under BS 7671, unfused spurs (non-fused) are permitted, but each unfused spur can only feed one single or one double socket outlet. The spur cable must be the same size as the ring cable (2.5mm2 for a standard ring). An unfused spur must be connected at a socket on the ring or at a junction box on the ring cable — not at another spur (no spur from a spur). Fused spurs (via a fused connection unit with a 13A or lower fuse) can feed multiple socket outlets, fixed appliances, or other loads because the fuse limits the current to the spur cable. The total number of unfused spurs should not exceed the number of sockets on the ring itself.',
  },
  {
    question: 'Why is the ring circuit unique to the UK?',
    answer:
      'The ring final circuit was introduced in the UK after World War II as a response to copper shortages. At the time, copper was rationed and expensive. The ring topology allowed the use of thinner cable (originally 1.5mm2, later 2.5mm2) to supply sockets at up to 13A, compared with the radial circuits used in other countries which required thicker cable to achieve the same current capacity. The ring works because current can flow in both directions around the loop, effectively halving the current in each leg — allowing thinner cable to be used safely. The 13A fused plug was introduced alongside the ring circuit to protect the thinner cable. Other countries did not adopt the ring system because they did not face the same copper shortage, or they already had established wiring practices using radial circuits with different plug and socket standards. Today, many UK electricians question whether the ring circuit is still the best approach, given that copper is no longer scarce and radial circuits are simpler to install and test.',
  },
  {
    question: 'Can I convert a ring circuit to a radial?',
    answer:
      'Yes, but it requires careful consideration. To convert a ring to a radial, you disconnect one leg of the ring at the consumer unit, effectively turning the ring into a single radial cable run. However, the resulting radial must comply with BS 7671 requirements for radial circuits. A 2.5mm2 radial can only be protected by a 20A MCB and serve a maximum floor area of 50m2. If the original ring served more than 50m2 or the sockets need more than 20A capacity, you would need to upgrade the cable to 4.0mm2 (allowing a 32A MCB and 75m2 floor area) or split the circuit into two separate radials. Before converting, verify that the cable route and all connections are suitable for radial operation — in a ring, both legs carry current, but in a radial, only one cable carries the full load current.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete ring circuit test schedules on your phone with voice entry and automatic validation of R1, R2, and R1+R2 readings.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'Step-by-step guide to the BS 7671 testing sequence including ring circuit continuity testing.',
    icon: TestTube2,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'Detailed guide to continuity testing including ring circuit cross-connection method and expected values.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/max-demand-calculator',
    title: 'Max Demand Calculator',
    description:
      'Calculate circuit loading and diversity factors to determine whether a ring or radial is appropriate.',
    icon: BarChart3,
    category: 'Calculator',
  },
  {
    href: '/guides/kitchen-wiring-guide',
    title: 'Kitchen Wiring Guide',
    description:
      'Guidance on ring vs radial for kitchen socket circuits, with dedicated appliance circuit design.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Verify cable sizes for ring and radial circuits with BS 7671 correction factors.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ring',
    heading: 'What Is a Ring Final Circuit?',
    content: (
      <>
        <p>
          A ring final circuit — commonly called a "ring main" in everyday conversation — is a
          wiring topology unique to the UK and Ireland. It consists of a cable that starts at the
          consumer unit, passes through all the socket outlets on the circuit in a loop, and returns
          to the same MCB at the consumer unit. Both the outgoing end and the return end of the
          cable are connected to the same MCB, neutral bar terminal, and earth bar terminal.
        </p>
        <p>
          The standard specification under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> is
          2.5mm2 Twin and Earth cable (to BS 6004) protected by a 32A Type B MCB, serving a maximum
          floor area of 100m2. There is no limit on the number of socket outlets on the ring — the
          only limit is the floor area.
        </p>
        <p>
          The ring circuit was introduced in the UK in the late 1940s as a response to post-war
          copper shortages. The ring topology allows thinner cable to be used safely because current
          can flow in both directions around the loop, effectively sharing the load between two
          parallel paths. This ingenious design saved copper at a time when it was rationed, but it
          introduced a testing complexity that single-path radial circuits do not have.
        </p>
      </>
    ),
  },
  {
    id: 'how-ring-works',
    heading: 'How a Ring Circuit Works',
    content: (
      <>
        <p>
          Understanding how a ring circuit distributes current is essential for testing and fault
          diagnosis. In a perfectly balanced ring with a single load connected at the midpoint,
          current flows equally in both legs of the ring — each leg carries half the total current.
          This is why 2.5mm2 cable (rated at approximately 27A when clipped direct) can be protected
          by a 32A MCB — the maximum current in each leg under balanced conditions does not exceed
          the cable rating.
        </p>
        <p>
          In practice, loads are not evenly distributed around the ring. When a load is connected
          near one end of the ring, more current flows through the shorter path and less through the
          longer path. The closer the load is to one end, the more unbalanced the current
          distribution becomes. This is normal and acceptable — the ring is designed to handle this
          variation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Key Ring Circuit Characteristics</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Current flows in both directions from the consumer unit to the load, taking the path
                of least resistance (which is proportional to cable length).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The maximum fault loop impedance (R1+R2) occurs at the midpoint of the ring — this
                is the point furthest from the consumer unit by both paths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Each socket can supply up to 13A (limited by the plug fuse). The 32A MCB protects
                the cable, not the individual socket load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the ring is broken (one leg disconnected), the circuit becomes a radial — all
                current flows through one path. The 2.5mm2 cable may be overloaded if the total load
                exceeds its single-path rating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-ring',
    heading: 'Testing Ring Final Circuits: R1, R2, and R1+R2',
    content: (
      <>
        <p>
          Testing a ring final circuit is one of the most important skills for any electrician
          carrying out initial verification or periodic inspection. The cross-connection
          (figure-of-eight) test method, described in{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">GN3</SEOInternalLink>, verifies
          that the ring is complete, correctly connected, and has no breaks, interconnections, or
          incorrectly connected spurs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Step-by-Step Ring Test Method</h4>
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Isolate the circuit</strong> and disconnect both legs of the ring at the
              consumer unit (line, neutral, and CPC from both the outgoing and return cables).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the line conductors (r1)</strong> — connect
              the low-resistance ohmmeter between the outgoing L and the return L. Record the value.
            </li>
            <li>
              <strong>Measure end-to-end resistance of the neutral conductors (rn)</strong> —
              connect between the outgoing N and the return N. The value should be approximately
              equal to r1 (both conductors are the same size — 2.5mm2).
            </li>
            <li>
              <strong>Measure end-to-end resistance of the CPC (r2)</strong> — connect between the
              outgoing E and the return E. This value will be higher than r1 because the CPC is a
              smaller conductor (1.5mm2 in standard T+E cable).
            </li>
            <li>
              <strong>Cross-connect the line conductors</strong> — join outgoing L to return L and
              outgoing N to return N at the consumer unit end. Measure at every socket outlet — each
              reading should be approximately r1/4 (within 0.05 ohms tolerance). Consistent readings
              confirm the ring is complete and correctly connected.
            </li>
            <li>
              <strong>Cross-connect line to CPC</strong> — join outgoing L to return E and outgoing
              E to return L. Measure at every socket outlet — this gives the R1+R2 value at each
              point. The highest value is used for Zs verification against BS 7671 maximum values.
            </li>
          </ol>
        </div>
        <p>
          The cross-connection test reveals faults that no other test can detect. A broken ring
          shows as inconsistent readings (gradually increasing resistance towards the break point).
          An interconnection between rings shows as an unexpectedly low reading at certain points. A
          spur connected from the wrong point shows as an anomalously high reading.
        </p>
        <SEOAppBridge
          title="Record ring test results by voice"
          description="Elec-Mate's voice test entry lets you speak R1, R2, and R1+R2 readings at each socket while your probes are in position. The app records the values, validates them against expected ranges, and flags any anomalies."
          icon={TestTube2}
        />
      </>
    ),
  },
  {
    id: 'max-demand',
    heading: 'Maximum Demand and Diversity on Ring Circuits',
    content: (
      <>
        <p>
          A 32A ring circuit can theoretically supply 32A x 230V = 7.36kW of power. In practice, the
          diversity factor means the actual maximum demand is significantly lower than the
          theoretical maximum. Not all sockets will be in use simultaneously, and not all appliances
          draw their maximum rated current continuously.
        </p>
        <p>
          The IET On-Site Guide provides diversity factors for different circuit types. For socket
          outlets (general use), the diversity factor is 100% of the largest point of utilisation
          plus 40% of the remaining points. In a typical domestic living room with a ring circuit
          serving 6 double sockets, the maximum demand after diversity is much lower than 32A.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Living room ring</strong> — TV, lamp, phone charger, laptop. Typical actual
                load: 3-5A. Well within the 32A ring capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/kitchen-wiring-guide">Kitchen</SEOInternalLink>{' '}
                  worktop ring
                </strong>{' '}
                — kettle (13A), toaster (8A), microwave (6A), food processor (5A). If the kettle and
                toaster are used simultaneously: 21A peak. This is within the ring capacity but
                approaches the single-leg cable rating if the ring is broken.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedroom ring</strong> — chargers, bedside lamps, TV, hair dryer (13A
                briefly). Typical actual load: 2-4A.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/max-demand-calculator">
            max demand calculator
          </SEOInternalLink>{' '}
          applies the correct diversity factors from the IET On-Site Guide to calculate the expected
          maximum demand on each circuit. This helps determine whether a single ring is sufficient
          or whether the load should be split across multiple circuits.
        </p>
      </>
    ),
  },
  {
    id: 'common-faults',
    heading: 'Common Ring Circuit Faults',
    content: (
      <>
        <p>
          Ring circuits are more susceptible to certain types of fault than radial circuits because
          of their looped topology. The dangerous aspect of ring circuit faults is that many are
          invisible to the occupant — the sockets continue to work normally even with a broken ring
          or an incorrectly connected spur. Only testing reveals the fault.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken ring</strong> — one conductor (line, neutral, or CPC) is disconnected
                or damaged, turning the ring into a radial. The sockets still work but the cable may
                be overloaded under high-demand conditions. The CPC break is particularly dangerous
                — earth fault protection is compromised for sockets beyond the break point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interconnected rings</strong> — two separate ring circuits are accidentally
                cross-connected, creating a larger ring or a figure-of-eight topology. This defeats
                the protection coordination because the effective cable length is longer than
                designed, increasing R1+R2 and potentially exceeding the maximum Zs for the
                protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spur from a spur</strong> — an unfused spur connected to another unfused
                spur rather than to a socket on the ring. This is a direct breach of BS 7671 and
                creates an extended cable run without adequate protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Too many unfused spurs</strong> — the number of unfused spurs should not
                exceed the number of sockets on the ring. Excessive spurs increase the total
                connected load beyond the circuit design and create more potential fault points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reversed polarity at a socket</strong> — line and neutral swapped at one or
                more sockets. This is detected by the polarity check during testing but is more
                common in rings because there are more terminations and more opportunities for
                error.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cross-connection ring test is the only reliable way to detect these faults. A simple
          continuity test or a visual inspection will not reveal a broken ring, an interconnection,
          or a spur from a spur. This is why GN3 specifies the full figure-of-eight test for every
          ring circuit during both initial verification and periodic inspection.
        </p>
      </>
    ),
  },
  {
    id: 'ring-vs-radial',
    heading: 'Ring vs Radial: The Ongoing Debate',
    content: (
      <>
        <p>
          The ring vs radial debate has been ongoing in the UK electrical industry for decades. The
          ring circuit was a brilliant solution to a specific problem (copper shortage in the
          1940s), but many electricians now question whether it remains the best approach when
          copper is abundant and radial circuits offer significant advantages.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Arguments for Rings</h3>
            <p className="text-white text-sm leading-relaxed">
              Rings use less copper (2.5mm2 vs 4.0mm2 for a 32A radial). They can serve a larger
              floor area (100m2 vs 75m2 for a 32A radial). They have lower voltage drop because
              current flows in two directions. They are the established UK convention and most
              existing installations use them. They allow an unlimited number of sockets within the
              floor area limit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Arguments for Radials</h3>
            <p className="text-white text-sm leading-relaxed">
              Radials are simpler to install (one cable run, not a loop). They are simpler and
              faster to test (no figure-of-eight test needed). They have fewer terminations and
              fewer potential fault points. A broken radial is immediately obvious (the sockets
              beyond the break stop working), whereas a broken ring continues to work but is
              potentially dangerous. Radials on 4.0mm2 cable have a lower R1+R2, giving better earth
              fault loop impedance. The 4.0mm2 cable has a higher single-fault rating. Radials are
              the global standard — the UK is the only country using rings.
            </p>
          </div>
        </div>
        <p>
          In practice, many electricians now use radials for new installations — particularly in
          kitchens (where a 32A radial on 4.0mm2 cable is common) and in rooms with a floor area
          well within the 75m2 radial limit. Rings remain common for larger areas (open-plan living
          spaces, large bedrooms) where the 100m2 limit is useful.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">AI circuit designer</SEOInternalLink>{' '}
          can recommend ring or radial for each room based on the floor area, socket count, and
          expected loading — helping you make the right choice for each circuit.
        </p>
      </>
    ),
  },
  {
    id: 'spurs',
    heading: 'Spurs on Ring Circuits: Rules and Limits',
    content: (
      <>
        <p>
          A spur is a branch cable that extends from a point on the ring to feed an additional
          socket or fixed appliance. Spurs are commonly used to add sockets without extending the
          ring cable itself. BS 7671 permits spurs on ring circuits, but with specific rules.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unfused spurs</strong> — can feed one single socket outlet or one double
                socket outlet (one accessory). The spur cable must be 2.5mm2 (same size as the
                ring). Connect at a socket on the ring or at a junction box on the ring cable. No
                spur from a spur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused spurs</strong> — a fused connection unit (FCU) with a 13A or lower
                fuse can feed multiple sockets, a fixed appliance, or other loads. The fuse protects
                the spur cable, so the spur cable can be smaller (e.g., 1.5mm2 for a 3A-fused spur
                feeding a clock or extractor fan). Fused spurs can be connected at any point on the
                ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum number</strong> — the total number of unfused spurs should not
                exceed the total number of sockets (or junction boxes) on the ring itself. This is a
                BS 7671 requirement to prevent excessive loading on the ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common error</strong> — connecting a spur at a socket that is already a spur
                (spur from a spur). This is a breach of BS 7671. During testing, check the cable
                count at each socket — two cables means it is on the ring (or one ring cable plus
                one spur), three cables means two spurs from the same socket (which is permitted),
                but a single cable at a socket that feeds another socket means spur from spur.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-use-ring',
    heading: 'When to Use a Ring Circuit Today',
    content: (
      <>
        <p>
          Despite the advantages of radial circuits, there are situations where a ring circuit
          remains the appropriate choice:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large floor areas</strong> — rooms or open-plan spaces exceeding 75m2
                require a ring (100m2 limit) or multiple radials. A single ring is simpler than two
                radials in this scenario.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs with voltage drop concerns</strong> — the ring topology
                reduces voltage drop because current flows in both directions. For long runs with
                high loads, the ring may achieve lower voltage drop than a radial of the same cable
                size. Check with Elec-Mate's{' '}
                <SEOInternalLink href="/guides/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing ring installations</strong> — when adding sockets or making
                alterations to an existing ring, it is often simpler to extend the ring rather than
                convert to a radial. Adding a spur is quicker than running a new radial cable back
                to the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Budget constraints</strong> — 2.5mm2 cable is less expensive than 4.0mm2
                cable. On a large installation with many circuits, the material cost saving from
                using rings can be significant. However, the additional testing time offsets some of
                this saving.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whatever your choice — ring or radial — the installation must comply with BS 7671, be
          properly tested, and be correctly certified. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC certificate app</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            minor works certificate
          </SEOInternalLink>{' '}
          to document the completed work with the full schedule of test results.
        </p>
        <SEOAppBridge
          title="Test and certify ring circuits on your phone"
          description="Elec-Mate's EICR and EIC apps include the complete ring circuit test schedule. Enter R1, R2, and R1+R2 values at each socket by voice — the app validates readings and flags anomalies automatically."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RingMainExplainedPage() {
  return (
    <GuideTemplate
      title="Ring Main Explained | Ring Final Circuit Guide UK"
      description="Complete guide to ring final circuits (ring mains) in the UK. How rings work, testing with R1, R2, and R1+R2, max demand, common faults, spurs, and the ring vs radial debate — all referenced to BS 7671."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Ring Main Explained:{' '}
          <span className="text-yellow-400">The Complete Ring Final Circuit Guide</span>
        </>
      }
      heroSubtitle="The ring final circuit is unique to the UK. This guide explains how ring circuits work, how to test them properly using the figure-of-eight method, common ring faults, the rules for spurs, and the ongoing ring vs radial debate."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Ring Final Circuits"
      relatedPages={relatedPages}
      ctaHeading="Test and Certify With Confidence"
      ctaSubheading="Elec-Mate's EICR and EIC apps include complete ring circuit test schedules with voice entry and automatic validation. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
