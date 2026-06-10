import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  CircuitBoard,
  CookingPot,
  Cable,
  BookOpen,
  Home,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'Kitchen Wiring', href: '/guides/kitchen-wiring-guide' },
];

const tocItems = [
  { id: 'kitchen-overview', label: 'Kitchen Wiring Overview' },
  { id: 'number-of-circuits', label: 'How Many Circuits?' },
  { id: 'ring-vs-radial', label: 'Ring vs Radial for Kitchen Sockets' },
  { id: 'dedicated-circuits', label: 'Dedicated Appliance Circuits' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'zone-restrictions', label: 'Zone Restrictions Near Water' },
  { id: 'worktop-sockets', label: 'Worktop Socket Positioning' },
  { id: 'lighting', label: 'Kitchen Lighting Circuits' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A modern kitchen typically requires 5-8 separate circuits: ring or radial for worktop sockets, cooker circuit, hob circuit (if separate), dishwasher, washing machine, fridge/freezer, extractor fan, and lighting.',
  'Dedicated circuits for high-power appliances (cooker, hob, dishwasher, washing machine) prevent nuisance tripping and ensure adequate current capacity — do not share a circuit between a cooker and anything else.',
  'All socket outlets in a kitchen require 30mA RCD protection under BS 7671 Regulation 411.3.3. Using individual RCBOs prevents a fault on one circuit tripping the entire kitchen.',
  'Under A4:2026 Regulation 411.3.4, every AC lighting circuit in a domestic kitchen must have 30mA RCD protection — a mandatory addition introduced by the 18th Edition Amendment 4.',
  'The fridge/freezer should be on a non-RCD circuit or a separate RCBO — if an RCD protecting multiple circuits trips, the fridge/freezer will defrost, potentially spoiling food without the occupant noticing.',
  "Elec-Mate's AI circuit designer creates complete kitchen wiring schedules — enter the appliance list and it allocates circuits, sizes cables, and selects protective devices automatically.",
];

const faqs = [
  {
    question: 'How many circuits does a kitchen need?',
    answer:
      'A well-designed modern kitchen typically needs 5 to 8 circuits. At a minimum: one ring or radial circuit for worktop sockets, one dedicated circuit for the cooker (typically 32A or 45A depending on the cooker rating), one dedicated circuit for the hob if it is separate from the oven, one dedicated circuit for the dishwasher (via a fused spur or dedicated socket), one dedicated circuit for the washing machine (via a fused spur or dedicated socket), one circuit for the fridge/freezer (ideally on a separate RCBO or non-RCD circuit), one switched fused spur for the extractor fan, and one lighting circuit. Larger kitchens with additional appliances (wine cooler, boiling water tap, waste disposal unit, under-cabinet lighting) may need additional circuits. The key principle is that high-power appliances should each have their own dedicated circuit to prevent overloading and nuisance tripping.',
  },
  {
    question: 'Should kitchen sockets be on a ring or radial circuit?',
    answer:
      'Both ring and radial circuits are acceptable under BS 7671. A ring final circuit uses 2.5mm2 cable protected by a 30A or 32A device; the informative guidance in Appendix 15 notes a historical floor-area limit of 100m2. A radial circuit uses 2.5mm2 cable with a 20A device (historically limited to 50m2) or 4.0mm2 cable with a 32A device where more capacity is wanted. The governing rule is Regulation 433.1.204 — the load in any part of the circuit must be unlikely to exceed the cable current-carrying capacity for long periods. For a kitchen, a radial on 4.0mm2 cable with a 32A RCBO is often the better choice: simpler to install (one cable run rather than a loop), easier to test, and with fewer potential fault points than a ring. If using a ring, it must serve only the kitchen sockets — do not extend a ring final circuit from another room into the kitchen.',
  },
  {
    question: 'What size cable do I need for a cooker circuit?',
    answer:
      "The cable size for a cooker circuit depends on the cooker rating. Most domestic cookers are rated between 8kW and 14kW. A 6.0mm2 Twin and Earth cable protected by a 32A MCB is suitable for cookers rated up to approximately 13.5kW (assuming a short cable run and no significant derating factors). For higher-rated cookers (14kW and above) or longer cable runs where voltage drop is a concern, use 10.0mm2 cable with a 45A MCB. The cooker control unit is typically a 45A switch with a 13A socket outlet (for a kettle or other small appliance near the cooker). Use Elec-Mate's cable sizing calculator to verify the cable size for the specific cooker rating, cable length, and installation method — it applies all the BS 7671 correction factors automatically.",
  },
  {
    question: 'Do I need RCD protection on every kitchen circuit?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket outlets rated up to 32A. This covers all kitchen socket circuits, including the worktop sockets, dishwasher socket, washing machine socket, and any other socket outlets. Under A4:2026 Regulation 411.3.4, all AC final circuits supplying luminaires within domestic premises must also have 30mA RCD protection — so the kitchen lighting circuit requires an RCD or RCBO. The cooker circuit (connected via a cooker control unit, not a socket) does not require RCD protection under Regulation 411.3.3, but Regulation 522.6.202 requires RCD protection where a cable is concealed in a wall or partition within a prescribed zone (within 150mm of the top of the wall, within 150mm of a corner between two adjoining walls, or running horizontally/vertically to or from an accessory). In practice, most modern consumer units use RCBOs on every circuit. The key consideration is the fridge/freezer — it should be on a separate RCBO so that a fault on another kitchen circuit does not trip the fridge/freezer circuit.',
  },
  {
    question: 'Where should kitchen worktop sockets be positioned?',
    answer:
      'Worktop sockets should be positioned at a convenient height above the worktop surface — typically 150mm to 200mm above the worktop. This places them at approximately 1050mm to 1100mm from the finished floor level (assuming a standard 900mm worktop height). Sockets should be positioned between appliance locations, not behind appliances (where they would be inaccessible). Allow at least 300mm from the edge of the hob or any heat source. Do not position sockets directly above the sink or draining board. The number of worktop sockets depends on the kitchen size and customer requirements — a minimum of 4 to 6 socket outlets above the worktop is typical for a medium kitchen. Consider USB sockets for charging devices. All worktop sockets must be accessible without moving appliances or reaching over the hob.',
  },
  {
    question: 'Is a kitchen a special location under BS 7671?',
    answer:
      'A kitchen is not classified as a "special location" under BS 7671 Part 7 (unlike a bathroom, which has specific zone restrictions). However, certain provisions do apply. Socket outlets should not be installed within 300mm of the sink — while BS 7671 does not define specific zones in kitchens as it does in bathrooms, good practice and manufacturer guidance recommend keeping sockets away from direct splash areas. Cables should follow safe zone routes in kitchen walls to avoid damage from fixings during kitchen unit installation. The extractor fan connection may be in a zone affected by heat from the hob — ensure the cable rating accounts for elevated ambient temperature. Under Part P of the Building Regulations, adding a new circuit in a kitchen is notifiable work if it involves a new circuit from the consumer unit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for cooker circuits, hob circuits, and kitchen radials with all BS 7671 correction factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Design complete kitchen wiring layouts with AI-assisted circuit allocation and cable sizing.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/guides/ring-main-explained',
    title: 'Ring Main Explained',
    description:
      'Understand how ring final circuits work, how to test them, and when to use radials instead.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit requirements including RCBO selection and circuit protection for kitchen circuits.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue EIC certificates for kitchen installations with the full schedule of test results.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/second-fix-electrical',
    title: 'Second Fix Electrical',
    description:
      'Guide to fitting kitchen accessories, consumer unit wiring, and initial verification testing.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'kitchen-overview',
    heading: 'Kitchen Wiring: Why It Matters',
    content: (
      <>
        <p>
          The kitchen is the most electrically demanding room in a typical dwelling. It contains
          more high-power fixed appliances than any other room — cooker, hob, dishwasher, washing
          machine, fridge/freezer, extractor fan, and multiple small appliances plugged into worktop
          sockets. Getting the wiring right is essential for safety, convenience, and compliance
          with <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
        </p>
        <p>
          A poorly designed kitchen wiring layout causes problems that occupants notice every day:
          not enough sockets, nuisance tripping when the kettle and toaster are used at the same
          time, the fridge/freezer defrosting when an RCD trips on a shared circuit, or a cooker
          circuit that cannot handle the full output of a modern range cooker. These problems are
          expensive to fix after the kitchen is fitted because the cables are behind the units and
          the worktop.
        </p>
        <p>
          The solution is to design the kitchen wiring properly from the start — dedicated circuits
          for high-power appliances, adequate socket provision above the worktop, correct RCD
          protection, and cable sizes that match the actual appliance ratings. This guide covers
          every aspect of kitchen wiring for both{' '}
          <SEOInternalLink href="/guides/new-build-electrical">new builds</SEOInternalLink> and
          kitchen rewires.
        </p>
      </>
    ),
  },
  {
    id: 'number-of-circuits',
    heading: 'How Many Circuits Does a Kitchen Need?',
    content: (
      <>
        <p>
          The number of circuits in a kitchen depends on the number and rating of the appliances.
          As a minimum, a modern kitchen should have the following circuits. The schedule below is a
          typical starting point — always confirm cable size against the actual appliance rating,
          cable length, and installation method.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10 text-xs font-semibold text-white/60 uppercase tracking-wide">
            <div className="col-span-3">Circuit</div>
            <div className="col-span-3">Typical protection</div>
            <div className="col-span-2">Cable</div>
            <div className="col-span-4">Connection / notes</div>
          </div>
          {[
            {
              circuit: 'Cooker / oven',
              device: '32A or 45A',
              cable: '6.0mm² or 10.0mm²',
              notes: 'Via a cooker control unit (45A switch with 13A socket). 45A/10mm² for higher-rated cookers.',
            },
            {
              circuit: 'Hob (if separate)',
              device: '32A',
              cable: '6.0mm²',
              notes: 'Modern induction hobs can draw 7kW (~30A). Connect via a cooker switch or flex outlet plate.',
            },
            {
              circuit: 'Worktop sockets',
              device: '32A (ring/radial) or 20A',
              cable: '2.5mm² or 4.0mm²',
              notes: 'Ring (2.5mm², 32A), 32A radial (4.0mm²) or 20A radial (2.5mm²). Serves all general-purpose worktop sockets.',
            },
            {
              circuit: 'Dishwasher',
              device: '16A or 20A',
              cable: '2.5mm²',
              notes: 'Dedicated 13A fused spur or dedicated socket. Isolation point kept accessible, not behind the appliance.',
            },
            {
              circuit: 'Washing machine',
              device: '16A or 20A',
              cable: '2.5mm²',
              notes: 'Dedicated 13A fused spur or dedicated socket — same arrangement as the dishwasher.',
            },
            {
              circuit: 'Fridge / freezer',
              device: 'Own RCBO',
              cable: '2.5mm²',
              notes: 'Dedicated socket on a separate RCBO so it keeps running if another kitchen circuit trips.',
            },
            {
              circuit: 'Extractor fan',
              device: 'Switched fused spur (3A)',
              cable: '1.5mm²',
              notes: 'Add a separate isolator if the fan is not accessible for switching.',
            },
            {
              circuit: 'Lighting',
              device: 'RCBO (30mA)',
              cable: '1.0mm² or 1.5mm²',
              notes: 'LED downlights are standard. Domestic lighting circuits now require 30mA RCD protection (411.3.4).',
            },
          ].map((row) => (
            <div
              key={row.circuit}
              className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 px-4 py-3 border-b border-white/5 last:border-b-0 text-sm"
            >
              <div className="sm:col-span-3 font-semibold text-white">{row.circuit}</div>
              <div className="sm:col-span-3 text-yellow-300">{row.device}</div>
              <div className="sm:col-span-2 text-white/80">{row.cable}</div>
              <div className="sm:col-span-4 text-white/70">{row.notes}</div>
            </div>
          ))}
        </div>
        <p>
          Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            max demand calculator
          </SEOInternalLink>{' '}
          to calculate the total kitchen demand with diversity factors applied. This helps determine
          whether the existing consumer unit has capacity for the kitchen circuits or whether an
          upgrade is needed.
        </p>
      </>
    ),
  },
  {
    id: 'ring-vs-radial',
    heading: 'Ring vs Radial for Kitchen Socket Circuits',
    content: (
      <>
        <p>
          The choice between a ring final circuit and a radial circuit for kitchen worktop sockets
          is one of the most discussed topics in domestic electrical work. Both are fully compliant
          with BS 7671, but they have different characteristics.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ring Final Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              Uses 2.5mm2 cable in a loop from the consumer unit, around all socket positions, and
              back to the consumer unit. Protected by a 32A MCB. Can serve an unlimited number of
              sockets within 100m2 floor area. Each socket can supply up to 13A via the plug fuse.
              The ring topology means current can flow in both directions, effectively halving the
              current in each leg of the ring under normal conditions. However, rings are more
              complex to test (the{' '}
              <SEOInternalLink href="/guides/ring-main-explained">
                figure-of-eight test
              </SEOInternalLink>{' '}
              is required) and faults such as broken rings or spurs from the wrong point are harder
              to detect.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Radial Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              Uses a single cable run from the consumer unit to each socket in sequence. A 2.5mm²
              radial on a 20A device has historically been limited to a 50m² floor area; a 4.0mm²
              radial on a 32A device is the common choice where more capacity is wanted. Simpler to
              install and test — no ring continuity test needed — and easier to extend in future.
              The larger 4.0mm² conductor also gives a lower R1+R2 value, which improves earth fault
              loop impedance and voltage-drop performance.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10 text-xs font-semibold text-white/60 uppercase tracking-wide">
            <div>Arrangement</div>
            <div>Cable</div>
            <div>Protective device</div>
            <div>Floor-area convention</div>
          </div>
          {[
            ['Ring final circuit', '2.5mm²', '30A or 32A', 'Historically up to 100m²'],
            ['Radial (smaller)', '2.5mm²', '20A', 'Historically up to 50m²'],
            ['Radial (larger)', '4.0mm²', '32A', 'Common where more load is needed'],
          ].map(([arr, cable, device, area]) => (
            <div
              key={arr}
              className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-white/5 last:border-b-0 text-sm"
            >
              <div className="font-semibold text-white">{arr}</div>
              <div className="text-white/80">{cable}</div>
              <div className="text-yellow-300">{device}</div>
              <div className="text-white/70">{area}</div>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-xs my-2">
          Floor-area figures are long-standing design conventions from the informative guidance in
          BS 7671 Appendix 15, not absolute limits — the governing requirement is Regulation
          433.1.204, that the load current in any part of the circuit is unlikely to exceed the
          cable&rsquo;s current-carrying capacity for long periods.
        </p>
        <p>
          For most kitchen installations a 32A radial on 4.0mm² cable is increasingly the preferred
          choice among experienced electricians: simpler to install, simpler to test, and reliable
          across the relatively small floor area of a kitchen. Either approach is fully compliant —
          see our{' '}
          <SEOInternalLink href="/guides/ring-main-explained">
            ring main guide
          </SEOInternalLink>{' '}
          for the full continuity-testing method.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuits',
    heading: 'Dedicated Circuits for Kitchen Appliances',
    content: (
      <>
        <p>
          High-power kitchen appliances must have their own dedicated circuits. Sharing a circuit
          between a cooker and a dishwasher, or between a washing machine and worktop sockets, risks
          overloading the circuit and causing nuisance tripping.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric cooker (8-14kW)</strong> — dedicated 32A or 45A circuit. Cable:
                6.0mm2 for cookers up to approximately 13.5kW, 10.0mm2 for higher ratings. Via a 45A
                cooker control unit positioned within 2m of the cooker but not directly above it.
                The cooker control unit includes a 13A socket for a kettle or similar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Induction hob (3-7kW)</strong> — if separate from the oven, the hob needs
                its own dedicated circuit. A 7kW induction hob draws approximately 30A — use 6.0mm2
                cable with a 32A RCBO. Connect via a 45A cooker switch or a flex outlet plate behind
                the hob unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dishwasher (1.8-2.4kW)</strong> — dedicated circuit via a switched fused
                spur with a 13A fuse, or a dedicated unswitched socket behind the appliance. 2.5mm2
                cable, 16A or 20A RCBO. The fused spur should be accessible (not behind the
                appliance) for isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Washing machine (2.0-2.5kW)</strong> — same arrangement as the dishwasher.
                Dedicated fused spur or dedicated socket. 2.5mm2 cable, 16A or 20A RCBO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fridge/freezer (0.1-0.3kW)</strong> — low power, but should be on its own
                circuit (separate RCBO) to prevent loss of power if another circuit trips. An
                unswitched socket behind the unit is standard — the plug provides the means of
                disconnection.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size every kitchen circuit correctly"
          description="Elec-Mate's cable sizing calculator handles cooker circuits, hob circuits, and kitchen radials."
          icon={Calculator}
        />
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
            A4:2026 — Arc Fault Detection Devices (AFDDs)
          </h4>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            BS 7671:2018+A4:2026 Regulation 421.1.7 introduces an AFDD requirement that depends on
            the premises type. For single-phase AC final circuits supplying socket outlets rated up
            to 32A, AFDDs conforming to BS EN 62606 are <strong>mandatory</strong> in four
            building types, and <strong>recommended</strong> in all others — which includes an
            ordinary dwelling kitchen. Where used, the AFDD must be placed at the origin of the
            circuit it protects.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-red-900/30 border border-red-700/40 p-4">
              <p className="text-xs font-semibold text-red-300 uppercase tracking-wide mb-2">
                AFDD mandatory (shall)
              </p>
              <ul className="text-white/80 text-sm space-y-1">
                <li>High-rise residential buildings (over 18m / six storeys)</li>
                <li>Houses in multiple occupation (HMOs)</li>
                <li>Purpose-built student accommodation</li>
                <li>Care homes</li>
              </ul>
            </div>
            <div className="rounded-xl bg-blue-900/30 border border-blue-700/40 p-4">
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2">
                AFDD recommended
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                All other premises, including a standard domestic kitchen. The high density of
                high-power circuits and concealed cable runs behind fitted units make a kitchen a
                strong candidate. Where specified, AFDDs fit in place of standard MCBs or RCBOs in
                most modern consumer units.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Kitchen Circuits',
    content: (
      <>
        <p>
          RCD protection in the kitchen requires careful consideration. BS 7671 Regulation 411.3.3
          requires 30mA RCD protection for all socket outlets rated up to 32A. This covers every
          kitchen socket — worktop sockets, dishwasher sockets, washing machine sockets, and the
          fridge/freezer socket.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Kitchen RCD Strategy</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Use individual RCBOs on each kitchen circuit. This provides the best discrimination
                — a fault on the dishwasher does not trip the fridge/freezer or the worktop sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The fridge/freezer circuit must be on a separate RCBO, not shared with other kitchen
                circuits under a group RCD. If a group RCD trips, the fridge/freezer will defrost —
                and the occupant may not notice until the food is spoiled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The cooker circuit requires RCD protection where its cable is concealed in a wall
                within a prescribed zone — defined by Regulation 522.6.202 as within 150mm of the
                top of a wall or partition, within 150mm of a corner between two adjoining walls, or
                running horizontally or vertically to or from any accessory. The threshold for
                additional protection at depths less than 50mm is set by Table 52.1. In most kitchen
                installations the cooker cable runs through the wall behind the cooker position — an
                RCBO is therefore standard practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Avoid placing all kitchen circuits under a single group RCD. A nuisance trip loses
                power to every kitchen appliance simultaneously — cooker, hob, dishwasher mid-cycle,
                and fridge/freezer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'zone-restrictions',
    heading: 'Zone Restrictions Near Water Sources',
    content: (
      <>
        <p>
          Unlike bathrooms, kitchens do not have formally defined zones under BS 7671 Part 7.
          However, common sense and good practice dictate certain restrictions near the kitchen sink
          and any other water sources.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No sockets directly above the sink</strong> — do not position socket outlets
                or fused spurs directly above the sink or draining board where water splashes could
                reach them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>300mm minimum clearance</strong> — good practice is to maintain at least
                300mm horizontal distance between the edge of the sink/drainer and any socket
                outlet. This is not a BS 7671 requirement for kitchens, but it is a sensible
                minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switches near the sink</strong> — light switches should not be positioned
                where they can be operated with wet hands while standing at the sink. A pull cord or
                a switch positioned away from the sink is preferable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-sink connections</strong> — waste disposal units and instant hot water
                taps are often connected under the sink. Use a switched fused spur positioned above
                the worktop (accessible for isolation) with the cable running down to the appliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'worktop-sockets',
    heading: 'Worktop Socket Positioning and Quantity',
    content: (
      <>
        <p>
          Worktop socket provision is one of the most common customer complaints with kitchen
          electrical work. Too few sockets means extension leads on the worktop — which is both
          unsightly and a safety hazard. Too many sockets in the wrong positions means some are
          hidden behind appliances and never used.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 my-4">
          {[
            { label: 'Above worktop', value: '150–200mm', sub: 'from the worktop surface' },
            { label: 'From floor', value: '~1050–1100mm', sub: 'with a standard 900mm worktop' },
            { label: 'Minimum provision', value: '4–6 doubles', sub: 'for a medium kitchen' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center"
            >
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-yellow-400">{s.value}</p>
              <p className="text-xs text-white/60 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum provision</strong> — at least 4 to 6 double socket outlets above the
                worktop for a medium kitchen. Larger kitchens with more worktop area need more
                sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Height</strong> — 150mm to 200mm above the worktop surface. This is
                approximately 1050mm to 1100mm from the finished floor level with a standard 900mm
                worktop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spacing</strong> — distribute sockets evenly along the worktop between
                appliance positions. Avoid clustering all sockets in one area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB sockets</strong> — consider fitting combination sockets with USB-A and
                USB-C ports at key positions for charging phones, tablets, and other devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Splashback coordination</strong> — agree socket positions with the kitchen
                fitter before{' '}
                <SEOInternalLink href="/guides/first-fix-electrical">first fix</SEOInternalLink>.
                Glass or tiled splashbacks require precise back box positioning — adjustment after
                the splashback is fitted is not possible without removing and replacing it.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Kitchen Lighting Circuits',
    content: (
      <>
        <p>
          Kitchen lighting is typically more complex than other rooms because kitchens need good
          task lighting over worktop areas as well as general ambient lighting. A well-lit kitchen
          is both safer and more pleasant to work in.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General lighting</strong> — LED downlights or a central pendant fitting.
                Downlights should be fire-rated where they penetrate a fire barrier (such as a
                first-floor ceiling). LED drivers should be accessible for replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-cabinet lighting</strong> — LED strip lighting or individual LED spot
                fittings under wall units. Connected via a switched fused spur (3A or 5A fuse).
                Often on a separate switch from the main lighting for independent control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimming</strong> — LED dimmers provide atmosphere control. Ensure the dimmer
                is compatible with the LED fittings — not all LED drivers work with all dimmers.
                Check manufacturer compatibility lists.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-5 my-4">
          <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            A4:2026 — Regulation 411.3.4: RCD on Lighting Circuits
          </h4>
          <p className="text-white text-sm leading-relaxed">
            BS 7671:2018+A4:2026 Regulation 411.3.4 introduces a mandatory requirement: within
            domestic (household) premises, all AC final circuits supplying luminaires shall have
            additional protection by an RCD with a rated residual operating current not exceeding
            30&nbsp;mA. This applies to the kitchen lighting circuit regardless of whether the cable
            is concealed or surface-run. Compliance requires that the protective device for the
            kitchen lighting circuit is an RCBO (or that the circuit sits under a 30&nbsp;mA RCD in
            the consumer unit). This requirement was absent in the 17th and pre-A4 18th Editions and
            is one of the most commonly missed points on new domestic installations.
          </p>
        </div>
        <p>
          Kitchen lighting should be on a separate lighting circuit from the general house lighting
          or on its own dedicated circuit. This ensures that a fault on the kitchen lighting does
          not affect lighting in other rooms, and vice versa.
        </p>
        <SEOAppBridge
          title="Design complete kitchen wiring with AI"
          description="Elec-Mate's AI circuit designer creates full kitchen wiring schedules from your appliance list."
          icon={CircuitBoard}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function KitchenWiringGuidePage() {
  return (
    <GuideTemplate
      title="Kitchen Wiring Guide | Circuits, RCDs & Regulations"
      description="Complete guide to kitchen wiring in the UK. Number of circuits needed, ring vs radial, dedicated appliance circuits, RCD protection, zone restrictions…"
      datePublished="2025-08-15"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={CookingPot}
      heroTitle={
        <>
          Kitchen Wiring Guide:{' '}
          <span className="text-yellow-400">Circuits, RCDs, and Regulations</span>
        </>
      }
      heroSubtitle="The kitchen is the most electrically demanding room in the house. Multiple high-power appliances, worktop sockets, dedicated circuits, and specific RCD protection requirements all need careful design. This guide covers everything from circuit allocation to socket positioning."
      readingTime={12}
      answerBox={{
        question: 'How many circuits does a kitchen need?',
        answer:
          'A modern UK kitchen typically needs 5 to 8 separate circuits: a ring or radial for worktop sockets, a dedicated cooker circuit (32A or 45A), a separate hob circuit if the hob is not part of the oven, dedicated supplies for the dishwasher and washing machine, a fridge/freezer circuit on its own RCBO, an extractor-fan spur, and a lighting circuit. High-power appliances each get their own circuit to avoid overload and nuisance tripping.',
        detail:
          'Under BS 7671:2018+A4:2026, every socket outlet up to 32A needs 30mA RCD protection (Regulation 411.3.3) and every AC lighting final circuit in a dwelling now needs 30mA RCD protection too (Regulation 411.3.4).',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Kitchen Wiring"
      relatedPages={relatedPages}
      ctaHeading="Design Kitchen Wiring Layouts Professionally"
      ctaSubheading="Elec-Mate's AI circuit designer, cable sizing calculator, and quoting app help you design, size, and price kitchen wiring jobs accurately. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
