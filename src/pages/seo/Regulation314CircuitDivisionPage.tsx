import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  CircuitBoard,
  Layers,
  Building,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Regulation 314', href: '/guides/regulation-314-division-of-circuits' },
];

const tocItems = [
  { id: 'overview', label: 'Division of Circuits Overview' },
  { id: 'regulation-314-1', label: 'Regulation 314.1 — The Core Requirement' },
  { id: 'regulation-314-3', label: 'Regulation 314.3 — Avoiding Danger' },
  { id: 'maximum-demand', label: 'Maximum Demand Per Circuit' },
  { id: 'ring-vs-radial', label: 'Ring vs Radial: When to Use Each' },
  { id: 'circuit-separation', label: 'Circuit Separation Requirements' },
  { id: 'domestic-design', label: 'Practical Design: Domestic Installations' },
  { id: 'commercial-design', label: 'Practical Design: Commercial Installations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Regulation 314.1 requires that every installation shall be divided into circuits as necessary to avoid danger and minimise inconvenience in the event of a fault. This is not a suggestion — it is a mandatory design requirement.',
  'Regulation 314.3 requires that separate circuits are provided for parts of the installation that need to be separately controlled, so that a fault on one circuit does not affect the operation of other circuits. This prevents a single fault from disabling the entire installation.',
  'The number of final circuits is determined by the maximum demand per circuit, the diversity of the load, the need for separate control, and the requirement to limit the consequences of a single fault (Regulation 314.2).',
  'Ring final circuits are standard for 13A socket outlets in domestic installations (BS 7671 Appendix 15). Radial circuits are preferred for dedicated loads (cooker, shower, immersion heater) and where the cable run is too long for a ring. Both are equally valid — the choice depends on the application.',
  'Circuit separation between lighting and power is essential in domestic installations. Regulation 314.3 effectively requires that at least one lighting circuit is on a separate protective device from the socket-outlet circuits, so that a trip on the socket circuit does not leave the occupants in darkness.',
];

const faqs = [
  {
    question: 'What does Regulation 314.1 actually require?',
    answer:
      'Regulation 314.1 requires that every electrical installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault. The regulation also requires that the number and type of circuits is determined by considering: the maximum demand of the installation, the nature of the loads, the need for separate control of circuits, and the need to minimise the possibility of unwanted tripping of RCDs. In practice, this means that a single circuit supplying the entire installation is not acceptable. The installation must be divided into multiple circuits so that a fault or overload on one circuit does not affect others, and so that circuits can be individually isolated for maintenance.',
  },
  {
    question: 'How many circuits does a domestic installation need?',
    answer:
      'BS 7671 does not specify a minimum number of circuits, but the On-Site Guide and Appendix 15 provide guidance. A typical modern domestic installation (3-bedroom house) would have as a minimum: 2 ring final circuits for socket outlets (upstairs and downstairs, or front and back), 2 lighting circuits (upstairs and downstairs), 1 dedicated cooker circuit (typically 32A radial), 1 dedicated shower circuit (if electric shower — typically 40A or 50A radial), 1 dedicated immersion heater circuit, 1 dedicated circuit for a smoke/fire alarm system, and possibly dedicated circuits for EV charger, heat pump, or other high-demand fixed equipment. This gives a minimum of approximately 8 to 12 circuits for a standard house. Larger properties, or those with more electrical equipment, will need more.',
  },
  {
    question: 'When should I use a ring final circuit instead of a radial?',
    answer:
      'A ring final circuit is the standard arrangement for 13A socket outlets in domestic installations in the UK. It uses 2.5mm squared cable in a ring (from the consumer unit, around the sockets, and back to the consumer unit) protected by a 32A MCB. The ring arrangement effectively halves the impedance at the mid-point of the ring, giving lower voltage drop and lower Zs compared to a single radial of the same length. Use a ring circuit when: the circuit serves multiple general-purpose socket outlets in a defined area (up to 100 square metres floor area per Appendix 15), the socket outlets are distributed around the room(s) so that the ring route is practical, and the cable can be routed in a continuous ring without excessive detours. Use a radial circuit when: the circuit serves a dedicated load (cooker, shower, immersion), the floor area is small (a 20A radial in 2.5mm squared serves up to 50 square metres), or the cable routing makes a ring impractical.',
  },
  {
    question: 'Can I put lighting and sockets on the same circuit?',
    answer:
      'Technically, BS 7671 does not prohibit lighting and socket outlets on the same circuit. However, it is strongly discouraged and would fail the requirements of Regulation 314.3 in most cases. If lighting and sockets are on the same circuit and that circuit trips (due to a fault on an appliance plugged into a socket), the occupants are left in darkness — which is a danger, particularly on stairways. Regulation 314.3 requires separate circuits where necessary to avoid danger, and the loss of all lighting due to a socket-circuit fault is precisely the scenario the regulation aims to prevent. Always provide separate lighting circuits.',
  },
  {
    question: 'What is the maximum floor area for a ring final circuit?',
    answer:
      'Appendix 15 of BS 7671 recommends that a ring final circuit serves a floor area not exceeding 100 square metres. This is guidance, not a hard limit — but exceeding it significantly increases the cable length and therefore the R1+R2 and Zs values, which may compromise ADS compliance. For large open-plan areas (kitchens, living rooms), it is often better to use two ring circuits or a combination of ring and radial circuits. The 100 square metre limit also helps with load distribution — in a typical domestic installation, 100 square metres of floor area represents a manageable number of socket outlets and a predictable maximum demand.',
  },
  {
    question: 'Do I need a dedicated circuit for a dishwasher or washing machine?',
    answer:
      'BS 7671 does not specifically require dedicated circuits for dishwashers or washing machines in domestic premises. These appliances are typically connected via a 13A plug to a socket on the ring final circuit. However, there are practical reasons to consider a dedicated circuit: a faulty appliance trips only its own circuit (not the entire ring); the appliance earth leakage does not contribute to accumulated leakage on the shared RCD; and the RCBO type can be matched to the appliance (Type A or Type F for inverter-driven washing machines). Whether a dedicated circuit is provided depends on the client brief, the budget, and the installation design. For new installations, providing dedicated RCBO-protected circuits for major appliances is considered best practice.',
  },
  {
    question: 'How does circuit division affect RCD arrangements?',
    answer:
      'Regulation 314.2 requires that the division of circuits considers the need to minimise the possibility of unwanted tripping of RCDs due to normal (non-fault) earth leakage currents. This directly influences how circuits are distributed across RCDs in a split-load consumer unit, or whether individual RCBOs are used. If too many circuits share a single RCD, the accumulated standing earth leakage from all the connected equipment may approach the 30mA trip threshold, causing nuisance tripping. The solution is to limit the number of circuits per RCD or to use individual RCBOs. This is one of the strongest practical arguments for RCBO boards in modern installations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/regulation-411-automatic-disconnection',
    title: 'Regulation 411 — ADS Explained',
    description: 'How circuit design affects earth fault loop impedance and ADS compliance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/regulation-418-supplementary-protection',
    title: 'Regulation 418 — Supplementary Protection',
    description: 'RCD arrangements and how circuit division affects nuisance tripping.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size ring and radial circuits with automatic voltage drop and Zs verification.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record circuit details, protective devices, and test results on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study circuit design principles, ring circuit testing, and radial circuit verification.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Division of Installation Into Circuits',
    content: (
      <>
        <p>
          Section 314 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          sets out the requirements for dividing an electrical installation into circuits. This is
          the foundation of circuit design — it determines how many circuits the installation needs,
          what type of circuits to use, and how to arrange them to provide safe and reliable
          operation.
        </p>
        <p>
          Circuit division is not just about calculating cable sizes and protective device ratings.
          It is about designing an installation that limits the consequences of a fault, allows safe
          maintenance, provides operational flexibility, and minimises nuisance tripping. A
          well-designed circuit arrangement means a fault on one circuit does not plunge the house
          into darkness, does not disable the fire alarm, and does not defrost the freezer.
        </p>
        <p>
          This guide covers the regulatory requirements, the practical decisions (ring vs radial,
          how many circuits, what goes on each), and design approaches for both domestic and
          commercial installations.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-314-1',
    heading: 'Regulation 314.1 — Every Installation Shall Be Divided',
    content: (
      <>
        <p>
          Regulation 314.1 is clear: every installation shall be divided into circuits as necessary
          to avoid danger and minimise inconvenience in the event of a fault. The regulation also
          lists the factors that determine the number and type of circuits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduction of the effects of electromagnetic interference (EMI)</strong> —
                circuits supplying equipment sensitive to EMI (such as data and communications
                equipment) should be separated from circuits supplying equipment that generates EMI
                (such as motors, welders, and fluorescent lighting).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazards from failure of a single circuit</strong> — the installation must be
                designed so that a fault on one circuit does not cause danger. This means critical
                circuits (fire alarm, emergency lighting, medical equipment) must be on separate
                circuits from general loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimising inconvenience</strong> — beyond safety, the regulation recognises
                that loss of an entire installation due to a single circuit fault is unacceptable.
                Even if not dangerous, losing all power because one appliance faults is an
                inconvenience that proper circuit division prevents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unwanted tripping of RCDs</strong> — Regulation 314.2 specifically requires
                that circuits are divided so as to minimise the possibility of unwanted tripping of
                RCDs due to normal (non-fault) earth leakage. This drives the decision between
                split-load RCD boards and individual RCBO boards.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulation-314-3',
    heading: 'Regulation 314.3 — Separate Circuits to Avoid Danger',
    content: (
      <>
        <p>
          Regulation 314.3 reinforces the safety requirement: separate circuits shall be provided
          for parts of the installation that need to be separately controlled so that a fault on one
          circuit does not affect the safe operation of other circuits. The regulation identifies
          specific circumstances where separate circuits are essential:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting vs power</strong> — lighting and socket-outlet circuits must be on
                separate protective devices. A fault on a socket circuit must not extinguish the
                lighting. This is the most fundamental circuit separation in any installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety services</strong> — fire alarm systems, emergency lighting, and smoke
                detection must be on dedicated circuits, separate from all other loads. These
                circuits must not be affected by faults elsewhere in the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-current dedicated loads</strong> — equipment with high current demand
                (cooker, electric shower, immersion heater, EV charger) must have dedicated
                circuits. Sharing a circuit between a high-demand load and other equipment causes
                voltage fluctuations and nuisance tripping.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulation does not prescribe exactly how to divide circuits — it sets the objectives
          (avoid danger, minimise inconvenience) and leaves the specific design to the competent
          electrician. This is where professional judgement and design skill are essential.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-demand',
    heading: 'Maximum Demand Per Circuit',
    content: (
      <>
        <p>
          Each circuit must be designed to carry the maximum demand of the connected load. The
          protective device rating and cable size are selected based on the design current (Ib) of
          the circuit — the maximum current expected in normal operation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Typical Circuit Design Currents (Domestic)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Circuit</th>
                  <th className="text-left py-2 pr-4">Design Current</th>
                  <th className="text-left py-2 pr-4">MCB Rating</th>
                  <th className="text-left py-2">Cable Size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Ring final circuit (sockets)</td>
                  <td className="py-2 pr-4">Varies (diversity)</td>
                  <td className="py-2 pr-4">32A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">20A radial (sockets)</td>
                  <td className="py-2 pr-4">Up to 20A</td>
                  <td className="py-2 pr-4">20A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Lighting circuit</td>
                  <td className="py-2 pr-4">Up to 6A</td>
                  <td className="py-2 pr-4">6A</td>
                  <td className="py-2">1.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cooker (12kW)</td>
                  <td className="py-2 pr-4">Approx 30A (with diversity)</td>
                  <td className="py-2 pr-4">32A</td>
                  <td className="py-2">6.0mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Electric shower (9.5kW)</td>
                  <td className="py-2 pr-4">Approx 41A</td>
                  <td className="py-2 pr-4">45A</td>
                  <td className="py-2">10.0mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Immersion heater (3kW)</td>
                  <td className="py-2 pr-4">Approx 13A</td>
                  <td className="py-2 pr-4">16A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">EV charger (7.4kW)</td>
                  <td className="py-2 pr-4">Approx 32A</td>
                  <td className="py-2 pr-4">32A</td>
                  <td className="py-2">6.0mm sq</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-3">
            Cable sizes assume standard installation method (clipped direct or enclosed in conduit).
            Always verify using the{' '}
            <SEOInternalLink href="/tools/cable-sizing-calculator">
              cable sizing calculator
            </SEOInternalLink>{' '}
            with the actual installation method, cable run length, and derating factors.
          </p>
        </div>
        <p>
          Diversity is applied to the total installation demand (at the main switch and supply
          level), not to individual circuit design. Each circuit must be designed to carry its full
          maximum demand — diversity is used when calculating the total demand on the main supply to
          determine the supply cable size and main fuse rating.
        </p>
      </>
    ),
  },
  {
    id: 'ring-vs-radial',
    heading: 'Ring vs Radial Circuits: When to Use Each',
    content: (
      <>
        <p>
          The choice between ring and radial circuits is one of the most common design decisions for
          UK electricians. Both are equally compliant with BS 7671 — the choice depends on the
          application, cable routing, and floor area.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-blue-400" />
              Ring Final Circuit
            </h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>
                Cable runs in a ring from the consumer unit, around the socket outlets, and back to
                the consumer unit. Both ends of the line, neutral, and earth are connected to the
                same terminals.
              </p>
              <p>
                <strong>Protection:</strong> 32A MCB
              </p>
              <p>
                <strong>Cable:</strong> 2.5mm sq (copper, twin and earth)
              </p>
              <p>
                <strong>Maximum floor area:</strong> 100 sq m (Appendix 15)
              </p>
              <p>
                <strong>Advantages:</strong> Lower Zs at mid-point (halved impedance), lower voltage
                drop, can supply multiple 13A sockets over a large area
              </p>
              <p>
                <strong>Use when:</strong> Multiple general-purpose socket outlets serving a room or
                area up to 100 sq m
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-green-400" />
              Radial Circuit
            </h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>
                Cable runs from the consumer unit to the load(s) in a single direction. No return
                path to the consumer unit — the cable terminates at the last point on the circuit.
              </p>
              <p>
                <strong>Protection:</strong> Varies (20A, 32A, or matched to load)
              </p>
              <p>
                <strong>Cable:</strong> Sized for the design current and length
              </p>
              <p>
                <strong>Maximum floor area:</strong> 50 sq m for 20A/2.5mm sq, 75 sq m for 32A/4.0mm
                sq
              </p>
              <p>
                <strong>Advantages:</strong> Simpler cable routing, ideal for dedicated loads, no
                ring continuity issues
              </p>
              <p>
                <strong>Use when:</strong> Dedicated load (cooker, shower, EV charger), small area,
                or where ring routing is impractical
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Common mistake:</strong> Spurs on ring circuits are often misunderstood. A
              non-fused spur from a ring final circuit may supply one single or one twin socket
              outlet only. Multiple spurs from the same point on the ring are not permitted. If you
              need to supply multiple additional sockets, either extend the ring or use a fused
              connection unit to create a fused spur.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-separation',
    heading: 'Circuit Separation Requirements',
    content: (
      <>
        <p>
          Beyond ring vs radial, the design must consider which loads go on which circuits. Proper
          circuit separation ensures safety, reliability, and ease of maintenance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — must be separate from socket-outlet circuits.
                Provide at least two lighting circuits in any dwelling (upstairs and downstairs, or
                front and back). This ensures that a fault on one lighting circuit does not leave
                the entire property in darkness. Each lighting circuit is typically protected by a
                6A MCB with 1.5mm sq cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet circuits</strong> — provide at least two ring or radial
                circuits for general socket outlets. Distribute them so that a trip on one circuit
                does not remove all socket power (for example, one circuit for upstairs, one for
                downstairs; or one for the kitchen/utility and one for living areas).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits</strong> — the following loads should always have
                dedicated circuits: cooker, electric shower, immersion heater, electric vehicle
                charger, heat pump, fire alarm system, security system, and any other load exceeding
                2kW or requiring specific control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor circuits</strong> — outdoor socket outlets, garden lighting, and
                outbuilding supplies should be on separate circuits from indoor circuits. This
                limits the impact of outdoor faults (which are more common due to weather exposure)
                on the indoor installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'domestic-design',
    heading: 'Practical Design Approach: Domestic Installations',
    content: (
      <>
        <p>
          Here is a practical circuit design for a typical 3-bedroom semi-detached house. This is a
          starting point — adjust based on the specific property, customer requirements, and
          installed equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Typical Domestic Circuit Schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Circuit</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Protection</th>
                  <th className="text-left py-2">Cable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Downstairs sockets</td>
                  <td className="py-2 pr-4">Ring</td>
                  <td className="py-2 pr-4">32A RCBO Type A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Upstairs sockets</td>
                  <td className="py-2 pr-4">Ring</td>
                  <td className="py-2 pr-4">32A RCBO Type A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Kitchen sockets</td>
                  <td className="py-2 pr-4">Ring</td>
                  <td className="py-2 pr-4">32A RCBO Type A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Downstairs lighting</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">6A RCBO Type A</td>
                  <td className="py-2">1.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Upstairs lighting</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">6A RCBO Type A</td>
                  <td className="py-2">1.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cooker</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">32A RCBO Type A</td>
                  <td className="py-2">6.0mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Electric shower</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">45A RCBO Type A</td>
                  <td className="py-2">10.0mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Immersion heater</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">16A RCBO Type A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Smoke/fire alarm</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">6A MCB Type B</td>
                  <td className="py-2">1.5mm sq</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Outdoor socket</td>
                  <td className="py-2 pr-4">Radial</td>
                  <td className="py-2 pr-4">20A RCBO Type A</td>
                  <td className="py-2">2.5mm sq</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-3">
            Add dedicated circuits for EV charger (32A/6.0mm sq), heat pump, or other high-demand
            equipment as required. Consumer unit should accommodate spare ways for future additions.
          </p>
        </div>
        <SEOAppBridge
          title="Design circuit schedules with AI assistance"
          description="Elec-Mate's AI circuit designer generates circuit schedules based on property type, room layout, and equipment. Professional schedules with cable sizes, protective devices, and cable routes — ready for your EIC certificate."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'commercial-design',
    heading: 'Practical Design Approach: Commercial Installations',
    content: (
      <>
        <p>
          Commercial installations follow the same principles as domestic but with additional
          considerations for three-phase supplies, larger load diversity, and more complex circuit
          arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase balancing</strong> — in three-phase installations, circuits must be
                distributed across the three phases to balance the load. Unbalanced loads cause
                excessive neutral current and voltage imbalance. Allocate single-phase circuits
                approximately equally across L1, L2, and L3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution</strong> — large commercial installations use
                sub-distribution boards to reduce cable lengths and improve discrimination. The main
                distribution board supplies sub-boards via sub-main cables, and the sub-boards
                supply final circuits. Each sub-board serves a defined area or function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential and non-essential loads</strong> — commercial installations often
                separate essential loads (servers, fire alarms, emergency lighting, security) from
                non-essential loads (general lighting, socket outlets, HVAC). Essential loads may be
                supplied from a UPS or generator, requiring separate distribution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical plant circuits</strong> — HVAC equipment, lifts, and other
                mechanical plant require dedicated circuits with specific protective devices. These
                circuits often use Type C or D MCBs due to the inductive loads and high starting
                currents.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The design process for a commercial installation typically starts with a load schedule
          (listing every item of equipment and its power demand), followed by a diversity assessment
          (applying diversity factors from BS 7671 Appendix 4), then circuit allocation (deciding
          which loads go on which circuits), and finally cable sizing and protective device
          selection for each circuit. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          handles the cable sizing and protective device verification for each individual circuit.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Regulation314CircuitDivisionPage() {
  return (
    <GuideTemplate
      title="Regulation 314 | Division of Installation Into Circuits"
      description="Complete guide to Regulation 314 of BS 7671 — division of installation into circuits. Circuit design principles, ring vs radial decisions, maximum demand, circuit separation for lighting and power, and practical circuit schedules for domestic and commercial installations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Regulation 314:{' '}
          <span className="text-yellow-400">Division of Installation Into Circuits</span>
        </>
      }
      heroSubtitle="Every installation must be divided into circuits to avoid danger and minimise inconvenience. This guide covers the regulatory requirements, ring vs radial decisions, circuit separation, maximum demand, and practical circuit schedules for domestic and commercial installations."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Circuit Division and Design"
      relatedPages={relatedPages}
      ctaHeading="Design Circuit Schedules and Size Cables on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-assisted circuit design, cable sizing, and on-site EIC certificates with professional schedules. 7-day free trial, cancel anytime."
    />
  );
}
