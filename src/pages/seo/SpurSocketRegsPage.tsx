import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CircuitBoard,
  Wrench,
  FileCheck2,
  GraduationCap,
  Home,
  Plug,
  PlugZap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'Spur Socket', href: '/guides/spur-socket-regulations' },
];

const tocItems = [
  { id: 'what-is-spur', label: 'What Is a Spur?' },
  { id: 'fused-vs-unfused', label: 'Fused vs Unfused Spurs' },
  { id: 'when-to-use', label: 'When to Use Each Type' },
  { id: 'connection-methods', label: 'Connection Methods' },
  { id: 'cable-sizes', label: 'Cable Sizes for Spurs' },
  { id: 'spurs-from-rings', label: 'Spurs from Ring Circuits' },
  { id: 'spurs-from-radials', label: 'Spurs from Radial Circuits' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'certification', label: 'Certification Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A spur is a branch cable that extends from an existing circuit to supply one or more additional outlets — it can be fused (via a fused connection unit) or unfused (direct connection).',
  'An unfused spur from a ring circuit must supply no more than one single or one twin socket outlet, or one item of permanently connected equipment.',
  'A fused spur can supply multiple outlets because the fuse in the FCU limits the current independently of the main circuit protection.',
  'The cable from a fused connection unit to the load can be reduced in size (e.g., 1.0mm\u00B2 or 1.5mm\u00B2) because the 3A or 13A fuse in the FCU provides overload protection for the smaller cable.',
  "Elec-Mate's cable sizing calculator confirms the correct cable size for spurs and checks that the protective device coordination is correct under BS 7671.",
];

const faqs = [
  {
    question: 'Can I add a spur to a ring circuit without notifying Building Control?',
    answer:
      'Adding a spur to an existing ring circuit is generally classed as minor electrical work and does not require Building Control notification under Part P of the Building Regulations, provided the work is not in a special location (such as a bathroom or within 3 metres of a swimming pool) and does not involve work on the consumer unit. However, a Minor Works Certificate should always be issued for the completed work, regardless of whether Building Control notification is required. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work. If you are not registered, and the work is in a special location, you must either use a registered electrician or notify Building Control before starting the work.',
  },
  {
    question: 'How many spurs can I have on a ring circuit?',
    answer:
      'BS 7671 does not set a specific maximum number of spurs on a ring circuit. The On-Site Guide states that the total number of non-fused spurs should not exceed the total number of socket outlets and items of stationary equipment connected directly in the ring. In practice, this means you can have a reasonable number of spurs without issue, but each non-fused spur is limited to supplying one single or one twin socket outlet, or one item of fixed equipment. Fused spurs are more flexible — each fused spur can supply multiple outlets because the fuse in the FCU limits the current. If you find yourself adding many spurs to a ring circuit, it may be more appropriate to install an additional circuit from the distribution board.',
  },
  {
    question: 'What is the difference between a fused spur and an unfused spur?',
    answer:
      'An unfused spur is a direct cable connection from the ring or radial circuit to an additional outlet, with no separate fuse protecting the spur cable. The spur cable must be the same size as the circuit cable because it relies on the main circuit protective device (MCB) for overcurrent protection. An unfused spur from a ring circuit can only supply one single or one twin socket outlet, or one item of fixed equipment. A fused spur uses a fused connection unit (FCU) — a device containing a BS 1362 cartridge fuse (typically 3A or 13A) — at the point where the spur connects to the circuit. The fuse protects the spur cable independently, so the cable after the FCU can be smaller than the circuit cable. A fused spur can supply multiple outlets or items of equipment, up to the rating of the fuse.',
  },
  {
    question: 'Can I spur off a spur?',
    answer:
      'No. BS 7671 and the IET On-Site Guide do not permit a non-fused spur to be taken from another non-fused spur (a "spur off a spur" or "double spur"). This is because the cable on the original spur was sized to supply only its intended outlet, and adding a further spur increases the load beyond what the cable was designed to carry. However, you can take a fused spur from any point on a circuit, including from a socket that is itself on a non-fused spur. The fuse in the FCU provides independent overcurrent protection for the new spur cable. If you need to add outlets and have already spurred from the nearest socket, the correct approach is either to use a fused connection unit or to run a new spur from a socket or junction box that is connected directly in the ring or radial circuit.',
  },
  {
    question: 'What cable size should I use for a spur?',
    answer:
      'For an unfused spur from a ring circuit or radial circuit, the spur cable must be the same cross-sectional area as the circuit cable — typically 2.5mm\u00B2 twin and earth for a 32A ring circuit or 20A radial. For a fused spur, the cable after the fused connection unit can be reduced in size because the fuse provides independent overcurrent protection. A 13A fused spur can use 2.5mm\u00B2 cable. A 3A fused spur (for small fixed loads like LED drivers, extractor fans, or clock points) can use 1.0mm\u00B2 or 1.5mm\u00B2 cable. In all cases, you must also check that the voltage drop at the furthest point on the spur does not exceed the BS 7671 limit and that the earth fault loop impedance allows disconnection within the required time.',
  },
  {
    question: 'How do I identify if a socket is on a spur or on the ring?',
    answer:
      'During testing, you can identify whether a socket is on a spur or part of the ring by performing a ring circuit continuity test. The three-step test (measuring end-to-end resistance of each conductor, then cross-connecting and measuring at each socket) will show whether each socket has two cables (part of the ring) or one cable (on a spur). A socket on a non-fused spur will have only one cable entering the back of the socket. A socket on the ring will have two cables — one arriving from each leg of the ring. A socket on a spur fed via a junction box will also have one cable, but the junction box itself will be in the ring. Visual inspection during an EICR should note the circuit arrangement and identify any spurs.',
  },
  {
    question: 'Is a fused connection unit the same as a switched fused spur?',
    answer:
      'The terms are often used interchangeably, but technically a fused connection unit (FCU) is the device itself — a plate containing a BS 1362 cartridge fuse. A switched fused spur (or switched FCU) is an FCU that also includes a double-pole switch, allowing the connected equipment to be isolated without removing the fuse. Switched FCUs are preferred for most fixed appliances because they provide a visible and accessible means of isolation. Unswitched FCUs are used where the appliance has its own integral switch or where a separate isolator is provided nearby. Both types are available with or without a flex outlet and a neon indicator.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for spurs with BS 7671 correction factors and fuse coordination check.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/radial-circuit-explained',
    title: 'Radial Circuit Explained',
    description:
      'How radial circuits work, when to choose radial over ring, and cable sizing for all common applications.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-calculator',
    title: 'Ring Circuit Calculator',
    description:
      'Ring circuit testing calculations, R1+R2 values, and the three-step continuity test explained.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description:
      'When to issue a Minor Works Certificate for spur additions and how to complete it correctly.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Which electrical work requires Building Control notification and which is exempt.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/distribution-board-wiring',
    title: 'Distribution Board Wiring',
    description:
      'Consumer unit layout, circuit arrangement, and split load vs RCBO board configurations.',
    icon: CircuitBoard,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-spur',
    heading: 'What Is a Spur in Electrical Wiring?',
    content: (
      <>
        <p>
          A spur is a branch cable that extends from an existing circuit to supply one or more
          additional outlets or items of equipment. It connects to the main circuit at a socket
          outlet, junction box, or the terminals of a fused connection unit (FCU), and runs to the
          new outlet or appliance.
        </p>
        <p>
          Spurs are the most common method of adding socket outlets or fixed equipment connections
          to an existing{' '}
          <SEOInternalLink href="/guides/ring-circuit-calculator">ring circuit</SEOInternalLink> or{' '}
          <SEOInternalLink href="/guides/radial-circuit-explained">radial circuit</SEOInternalLink>{' '}
          without running a completely new circuit from the distribution board. They are quick to
          install, require minimal disruption, and — when done correctly — are fully compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
        </p>
        <p>
          There are two fundamental types: fused spurs and unfused spurs. The rules governing each
          type are different, and getting them wrong is one of the most common errors found during{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR inspections</SEOInternalLink>.
          Understanding the difference is essential for every electrician.
        </p>
      </>
    ),
  },
  {
    id: 'fused-vs-unfused',
    heading: 'Fused vs Unfused Spurs: The Key Differences',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Unfused Spur</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Direct cable connection — no separate fuse</li>
              <li>Cable must be same size as circuit cable</li>
              <li>From ring circuit: max 1 single or 1 twin socket, or 1 fixed item</li>
              <li>Cannot spur from another unfused spur</li>
              <li>Protected by the main circuit MCB only</li>
              <li>Simplest and fastest to install</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Fused Spur</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Connected via a fused connection unit (FCU)</li>
              <li>Cable after FCU can be smaller than circuit cable</li>
              <li>Can supply multiple outlets or equipment</li>
              <li>Can be taken from any point on the circuit</li>
              <li>Fuse in FCU provides independent protection</li>
              <li>3A or 13A BS 1362 cartridge fuse</li>
            </ul>
          </div>
        </div>
        <p>
          The critical distinction is protection. An unfused spur relies entirely on the main
          circuit protective device (the MCB at the distribution board) for overcurrent protection.
          This means the spur cable must be capable of carrying the full rating of the MCB without
          damage — so it must be the same size as the circuit cable. A fused spur has its own
          overcurrent protection (the fuse in the FCU), which means the cable after the FCU only
          needs to be rated for the fuse size, not the full circuit MCB rating.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-use',
    heading: 'When to Use a Fused Spur vs an Unfused Spur',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use an unfused spur</strong> when you need to add a single socket outlet
                (single or twin) to an existing ring or radial circuit and the cable route from the
                existing socket to the new outlet is short and straightforward. This is the simplest
                and cheapest option. The existing socket you spur from must be on the ring (not
                itself on a spur).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a fused spur</strong> when you need to supply a fixed appliance
                (extractor fan, heated towel rail, waste disposal unit, boiler, LED driver, outdoor
                lighting) or when you need to supply multiple outlets from a single connection
                point. Also use a fused spur when the cable after the connection point needs to be a
                smaller size than the circuit cable — for example, 1.0mm{'\u00B2'} flex to a
                wall-mounted appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always use a fused spur</strong> when connecting to an appliance that uses
                flex rather than cable, when the appliance is permanently connected (no plug and
                socket), when you need to provide a local means of isolation for the appliance, or
                when you are feeding a circuit in an outbuilding from a domestic ring or radial.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A common scenario: a homeowner wants a new double socket in a bedroom. If there is an
          existing socket on the ring circuit in the same room, an unfused spur using 2.5mm
          {'\u00B2'}
          cable from that socket to the new double socket is the simplest solution. But if the
          homeowner also wants a permanently connected towel rail in the en-suite, a fused spur via
          a switched FCU with a 3A fuse is the correct approach.
        </p>
      </>
    ),
  },
  {
    id: 'connection-methods',
    heading: 'Connection Methods for Spurs',
    content: (
      <>
        <p>A spur can be connected to the existing circuit at three points:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At an existing socket outlet.</strong> The spur cable connects to the
                terminals of an existing socket on the ring or radial circuit. The socket must have
                spare terminal capacity — most modern socket outlets have terminals that accept two
                cables. The existing socket must be on the ring (not itself on an unfused spur) if
                you are adding an unfused spur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At a junction box in the circuit cable.</strong> A 30A-rated junction box is
                inserted into the ring or radial cable, and the spur cable connects to the spare
                terminal. The junction box must be accessible for inspection after installation (not
                buried behind plasterboard without an access panel). Maintenance-free junction boxes
                may be used if BS 7671 Regulation 526.3 is met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At a fused connection unit.</strong> An FCU is installed at the connection
                point (either replacing an existing socket or installed alongside one) and the spur
                cable runs from the load side of the FCU to the new outlet or appliance. This method
                provides independent overcurrent protection for the spur.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For all connection methods, the cable connections must be mechanically sound and
          electrically reliable. Use the correct terminal screws, strip the correct length of
          conductor insulation, and ensure no bare copper is visible outside the terminal. If using
          Wago connectors or similar maintenance-free connectors, ensure they are rated for the
          circuit current and installed in an accessible enclosure.
        </p>
        <SEOAppBridge
          title="Issue a Minor Works Certificate on site"
          description="Added a spur? Elec-Mate generates the Minor Works Certificate on your phone. Enter the test results, describe the work, and send the certificate to the customer as a professional PDF before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'cable-sizes',
    heading: 'Cable Sizes for Spurs',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">cable size</SEOInternalLink>{' '}
          for a spur depends on whether it is fused or unfused, and the rating of the fuse (if
          fused).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Spur Cable Size Reference</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unfused spur from 32A ring circuit</strong> — 2.5mm{'\u00B2'} twin and earth
                (same as ring cable). Must match the ring cable cross-sectional area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unfused spur from 20A radial</strong> — 2.5mm{'\u00B2'} twin and earth (same
                as radial cable).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>13A fused spur</strong> — 2.5mm{'\u00B2'} twin and earth from FCU to load.
                Suitable for socket outlets and higher-power fixed appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3A fused spur</strong> — 1.0mm{'\u00B2'} or 1.5mm{'\u00B2'} twin and earth
                or flex from FCU to load. Suitable for low-power fixed appliances: extractor fans,
                LED drivers, clocks, shavers, towel rails up to 700W.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unfused spur from 32A radial</strong> — 4mm{'\u00B2'} twin and earth (same
                as radial cable).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember: the cable from the circuit to the FCU (the supply side) must be the same size as
          the circuit cable. Only the cable from the FCU to the load (the load side) can be reduced
          because the fuse provides independent protection for that section. Always check{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">voltage drop</SEOInternalLink>{' '}
          for the total cable length from the distribution board through the circuit cable and spur
          cable to the load.
        </p>
      </>
    ),
  },
  {
    id: 'spurs-from-rings',
    heading: 'Spurs from Ring Final Circuits',
    content: (
      <>
        <p>
          The rules for spurs from ring circuits are set out in the IET On-Site Guide and Guidance
          Note 1. The key rules are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-fused spurs</strong> — each non-fused spur must be connected to the ring
                at a socket outlet or junction box that is part of the ring. An unfused spur can
                supply one single or one twin socket outlet, or one item of permanently connected
                equipment. You cannot take a non-fused spur from another non-fused spur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of non-fused spurs</strong> — the total number should not exceed the
                total number of socket outlets and fixed items connected directly in the ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused spurs</strong> — a fused spur can be connected at any socket outlet,
                junction box, or point in the ring. The FCU can supply multiple outlets or items of
                equipment. There is no limit on the number of fused spurs, provided the total
                circuit load remains within the rating of the ring circuit protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable size</strong> — the cable from the ring to the spur (non-fused) must
                be 2.5mm{'\u00B2'} minimum for a 32A ring. The cable from a fused spur depends on
                the fuse rating as described above.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before adding a spur to a ring circuit, you should verify that the circuit is a correctly
          wired ring (not a radial mistakenly identified as a ring) and that the socket you are
          spurring from is part of the ring, not already on a spur. A ring circuit continuity test
          will confirm this.
        </p>
      </>
    ),
  },
  {
    id: 'spurs-from-radials',
    heading: 'Spurs from Radial Circuits',
    content: (
      <>
        <p>
          Spurs from{' '}
          <SEOInternalLink href="/guides/radial-circuit-explained">radial circuits</SEOInternalLink>{' '}
          follow the same principles as spurs from ring circuits. The key considerations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unfused spurs</strong> — must use the same cable size as the radial circuit
                cable. The spur should supply no more than one single or one twin socket outlet, or
                one item of fixed equipment — the same rule as for ring circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused spurs</strong> — can be connected at any point on the radial circuit
                via an FCU. The cable after the FCU can be reduced in size according to the fuse
                rating. Fused spurs are particularly useful on radial circuits for supplying fixed
                appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total load</strong> — when adding spurs to a radial circuit, consider the
                total load on the circuit including the spur. A 20A radial on 2.5mm{'\u00B2'} cable
                has less spare capacity than a 32A ring circuit, so additional loads must be
                carefully assessed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, electricians adding spurs to radial circuits often prefer fused spurs because
          they provide clear overcurrent protection for the spur cable and allow the use of smaller
          cable sizes for the branch run. This is especially common when feeding fixed appliances
          such as outside lights, garage equipment, or garden installations from an existing socket
          circuit.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Spur Wiring Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spur off a spur (double spur).</strong> Taking a non-fused spur from a
                socket that is already on a non-fused spur. This is the single most common spur
                wiring error found during EICR inspections and would be coded C2 (Potentially
                Dangerous) or C3 (Improvement Recommended) depending on the cable sizes involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized cable on unfused spur.</strong> Using 1.5mm{'\u00B2'} cable for
                an unfused spur from a 32A ring circuit. Without a fuse to protect the smaller
                cable, the 32A MCB will not disconnect before the cable overheats in an overload
                condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong fuse rating in FCU.</strong> Using a 13A fuse in an FCU that feeds a
                1.0mm{'\u00B2'} cable. A 13A fuse does not protect 1.0mm{'\u00B2'} cable from
                overload — a 3A fuse is the correct rating for this cable size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple sockets on unfused spur.</strong> Feeding two or more double
                sockets from a single unfused spur. An unfused spur from a ring circuit should
                supply no more than one single or one twin socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inaccessible junction boxes.</strong> Burying junction boxes behind
                plasterboard or under floorboards without an access panel. Junction boxes must
                remain accessible for inspection and maintenance unless they are maintenance-free
                connectors complying with Regulation 526.3.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These mistakes are regularly found during{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR inspections
          </SEOInternalLink>{' '}
          and result in observation codes that make the report Unsatisfactory. Avoid them by
          following the rules above and always testing the completed work before issuing a
          certificate.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification Requirements for Spur Additions',
    content: (
      <>
        <p>
          Every spur addition must be tested and certified. The type of certificate depends on the
          scope of the work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>
                </strong>{' '}
                — the correct certificate for adding a spur to an existing circuit. It covers the
                new work only and requires completion of the relevant tests (continuity, insulation
                resistance, polarity, earth fault loop impedance, and RCD operation if applicable).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/eic-certificate">
                    Electrical Installation Certificate (EIC)
                  </SEOInternalLink>
                </strong>{' '}
                — required if the work involves a new circuit from the distribution board rather
                than a spur from an existing circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate generates both Minor Works Certificates and EICs on your phone. Enter the test
          results, describe the work carried out, and send the certificate to the customer as a
          professional PDF — all from site.
        </p>
        <SEOAppBridge
          title="Certify spur additions in minutes"
          description="Elec-Mate's Minor Works Certificate captures your test results, describes the work, and generates a professional PDF. Send it to the customer by email or WhatsApp before you pack up your tools. No desk time required."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SpurSocketRegsPage() {
  return (
    <GuideTemplate
      title="Spur Socket Regulations | Fused Spur Guide UK"
      description="Complete guide to spur socket regulations in the UK. Fused vs unfused spurs, when to use each type, connection methods, cable sizes, common mistakes, and certification requirements under BS 7671."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Plug}
      heroTitle={
        <>
          Spur Socket Regulations:{' '}
          <span className="text-yellow-400">Fused and Unfused Spur Guide UK</span>
        </>
      }
      heroSubtitle="Spurs are the fastest way to add socket outlets and fixed equipment connections to existing circuits. But the rules for fused and unfused spurs are different, and getting them wrong is one of the most common EICR defects. This guide explains when to use each type, correct cable sizes, connection methods, and the mistakes that cost electricians time and money."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Spur Socket Regulations"
      relatedPages={relatedPages}
      ctaHeading="Cable Sizing and Certificates on Your Phone"
      ctaSubheading="Elec-Mate's cable sizing calculator checks your spur design against BS 7671, and the Minor Works Certificate app lets you certify the work on site. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
