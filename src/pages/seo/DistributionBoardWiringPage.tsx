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
  Home,
  LayoutGrid,
  ClipboardList,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'Distribution Board Wiring', href: '/guides/distribution-board-wiring' },
];

const tocItems = [
  { id: 'distribution-board-basics', label: 'Distribution Board Basics' },
  { id: 'board-types', label: 'Split Load, Dual RCD & RCBO Boards' },
  { id: 'circuit-arrangement', label: 'Circuit Arrangement and Allocation' },
  { id: 'labelling-requirements', label: 'Labelling Requirements' },
  { id: 'type-testing', label: 'Type Testing (BS EN 61439)' },
  { id: 'main-switch', label: 'Main Switch and Isolation' },
  { id: 'spd-installation', label: 'SPD Installation in the Board' },
  { id: 'wiring-best-practice', label: 'Wiring Best Practice' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'RCBO boards provide individual RCD and overcurrent protection per circuit, eliminating the nuisance tripping and loss-of-supply issues that affect split-load and dual-RCD configurations.',
  'All consumer units in domestic premises must be constructed from non-combustible material (typically metal) under Amendment 3 of BS 7671:2018.',
  'Circuit labelling must be clear, permanent, and durable — Regulation 514.9.1 requires a chart or table at or near the distribution board identifying each circuit and the area it serves.',
  'Consumer units must be type-tested assemblies complying with BS EN 61439-3 — assembling a consumer unit from separate components (a "mix and match" approach) does not meet this requirement unless the assembly is verified by the manufacturer.',
  "Elec-Mate's AI circuit designer generates a complete circuit schedule with suggested board layout, circuit allocation, and cable sizing for any domestic or commercial installation.",
];

const faqs = [
  {
    question: 'What is the difference between a split-load board and an RCBO board?',
    answer:
      'A split-load consumer unit has a main switch and one or two RCDs, each protecting a group of MCBs. All circuits on one side of the board share a single RCD. If one circuit develops an earth fault, the RCD trips and disconnects all circuits on that side — you lose power to multiple rooms or areas. An RCBO (Residual Current circuit Breaker with Overcurrent protection) board uses individual RCBOs for every circuit. Each RCBO combines RCD and MCB functions in a single device. If one circuit develops a fault, only that circuit trips — all other circuits continue to operate normally. RCBO boards eliminate nuisance tripping affecting multiple circuits, provide better fault discrimination, and make fault-finding easier because the tripped RCBO identifies exactly which circuit has the problem. The main disadvantage is cost: RCBOs are more expensive than MCBs, so an RCBO board costs more than a split-load board. However, the operational advantages make RCBO boards the preferred choice for most modern domestic installations.',
  },
  {
    question: 'Do all consumer units need to be metal?',
    answer:
      'Yes, in domestic premises. Amendment 1 of BS 7671:2018 (Regulation 421.1.201) requires consumer units and similar switchgear assemblies in domestic premises to comply with BS EN 61439-3 and be constructed from non-combustible material. In practice, this means metal (steel) consumer units. Plastic consumer units are no longer permitted for new installations or replacements in domestic premises. The requirement was introduced following research showing that fires originating from consumer units were a significant risk, and that metal enclosures provide better containment of any internal fault or arc. For non-domestic premises (commercial, industrial), the enclosure material depends on the installation type and fire risk assessment — metal is still preferred but not mandated in the same way.',
  },
  {
    question: 'How should circuits be arranged in a consumer unit?',
    answer:
      'Circuit arrangement in a consumer unit should follow a logical pattern that balances the load across phases (for three-phase boards) or across RCDs (for split-load boards). In a split-load or dual-RCD board, circuits should be divided between the two RCDs so that if one RCD trips, essential services remain on the other side. The IET Guidance Note 1 recommends separating lighting and socket circuits across different RCDs so that if one trips, the building is not left in complete darkness. A typical arrangement puts smoke alarm circuits, some lighting circuits, and the cooker on one RCD, with the remaining lighting, sockets, and shower on the other. In an RCBO board, the arrangement is less critical because each circuit has independent protection, but a logical grouping (upstairs circuits, downstairs circuits, dedicated circuits) still makes maintenance and fault-finding easier.',
  },
  {
    question: 'What are the labelling requirements for a consumer unit?',
    answer:
      'BS 7671 Regulation 514.9.1 requires a durable notice or chart to be provided at or near the distribution board. The chart must identify each circuit by circuit number, describe the area served (e.g., "ground floor sockets"), state the protective device type and rating (e.g., "32A Type B RCBO"), and note the cable size. The labelling must be accurate, legible, and durable — handwritten labels that fade over time do not meet the standard. The Electrical Safety First Best Practice Guide recommends that labels should be printed, laminated, and fixed to the inside of the consumer unit door or mounted adjacent to the board. For an EICR, the inspector will check that the schedule is present, accurate, and matches the actual circuit arrangement. Missing or inaccurate labelling is a C3 (Improvement Recommended) observation on an EICR.',
  },
  {
    question: 'Do I need to install an SPD in the consumer unit?',
    answer:
      'BS 7671:2018+A3:2024 requires a risk assessment for surge protection (Regulation 443) on all new installations and alterations. If the consequence of a transient overvoltage would be serious — for example, in installations where loss of life, loss of public services, loss of IT equipment, or loss of high-value equipment would result — a surge protective device (SPD) must be installed. In most domestic installations, the risk assessment will conclude that an SPD is required, because modern homes contain sensitive electronic equipment (computers, smart home devices, AV systems) that can be damaged by transient overvoltages. A Type 2 SPD is installed at the consumer unit on the supply side of the protective devices. Some consumer unit manufacturers now offer boards with integrated SPD mounting positions. The SPD must be installed with appropriate overcurrent protection (a dedicated MCB or fuse) and a disconnector to indicate SPD failure.',
  },
  {
    question: 'Can I mix MCBs and RCBOs in the same consumer unit?',
    answer:
      "It depends on the consumer unit design. Some manufacturer consumer units are designed to accept both MCBs and RCBOs in the same enclosure — this is common in split-load boards where some circuits are on an RCD-protected MCB bank and others use individual RCBOs. However, you must use MCBs and RCBOs from the same manufacturer and range as the consumer unit enclosure. Mixing components from different manufacturers is not permitted because the assembly would not be type-tested under BS EN 61439-3. The consumer unit manufacturer specifies which devices are compatible with their enclosure. Always check the manufacturer's product compatibility guide. Using incompatible devices can cause poor connection, overheating, and failure to meet the type-testing requirement.",
  },
  {
    question: 'What is type testing and why does it matter?',
    answer:
      'Type testing (BS EN 61439) is a set of tests performed by the manufacturer to verify that a consumer unit or switchgear assembly meets safety and performance standards. The tests include temperature rise (verifying the assembly does not overheat under rated load), dielectric withstand (verifying insulation integrity), short-circuit performance (verifying the assembly can withstand fault currents without dangerous failure), mechanical operation (verifying switches and devices operate correctly within the enclosure), and IP rating (verifying the degree of protection against ingress). A type-tested assembly has been verified as a complete system — the enclosure, busbars, and protective devices work together safely. An untested or mixed assembly has no such verification. BS 7671 Regulation 132.1.1 requires that every installation uses equipment that complies with the relevant product standard — for consumer units, this is BS EN 61439-3. Using non-type-tested assemblies fails this requirement.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Generate a complete circuit schedule with board layout, circuit allocation, and cable sizing for any installation.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate cable sizes for all circuits in the distribution board with correction factors and voltage drop.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Detailed guide to consumer unit change regulations, metal enclosure requirements, and Part P notification.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/radial-circuit-explained',
    title: 'Radial Circuit Explained',
    description:
      'How radial circuits work and when to use them — the standard circuit type in modern distribution boards.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/spd-surge-protection',
    title: 'SPD Surge Protection Guide',
    description:
      'When surge protection is required, SPD types, installation at the consumer unit, and risk assessment.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description:
      'Type AC, Type A, and Type F RCDs — which type is required for each circuit application.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'distribution-board-basics',
    heading: 'What Is a Distribution Board?',
    content: (
      <>
        <p>
          A distribution board (commonly called a consumer unit in domestic installations) is the
          central point where the incoming electrical supply is split into individual circuits that
          serve different areas and appliances throughout the building. It houses the main switch,
          the protective devices (MCBs, RCBOs, or RCDs), and in modern installations, the surge
          protective device (SPD).
        </p>
        <p>
          The distribution board is arguably the most important component in any electrical
          installation. It provides overcurrent protection for every circuit cable, earth fault
          protection via RCDs or RCBOs, a means of isolation for the entire installation and for
          individual circuits, and a central point for circuit identification and labelling.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , domestic consumer units must be constructed from non-combustible material (metal), must
          be type-tested assemblies complying with BS EN 61439-3, and must be installed by a
          competent person. Replacing or upgrading a consumer unit is notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          and requires an{' '}
          <SEOInternalLink href="/guides/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'board-types',
    heading: 'Split Load, Dual RCD and RCBO Boards Compared',
    content: (
      <>
        <p>
          The three main configurations for domestic consumer units are split-load, dual-RCD, and
          full RCBO boards. Each has advantages and drawbacks.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <LayoutGrid className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Split-Load Board</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main switch + one RCD protecting a group of MCBs + a group of MCBs without RCD
                  protection (typically for the non-RCD-required circuits like the cooker). The
                  simplest and cheapest option, but offers limited protection — if the RCD trips,
                  all circuits on that side lose power. Less common in new installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <LayoutGrid className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Dual-RCD Board</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main switch + two RCDs, each protecting a separate group of MCBs. Circuits are
                  divided between the two RCDs so that if one trips, essential services remain on
                  the other side. Better protection than split-load, but a fault on one circuit
                  still trips all circuits on the same RCD. The most common domestic configuration
                  before RCBO boards became affordable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <LayoutGrid className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Full RCBO Board</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main switch + individual RCBOs for every circuit. Each RCBO provides both
                  overcurrent and 30mA RCD protection for its circuit independently. A fault on one
                  circuit trips only that RCBO — all other circuits remain live. The best protection
                  and discrimination. Higher cost but increasingly the standard choice for new
                  installations and consumer unit upgrades.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The trend in the UK is strongly towards full RCBO boards. The cost premium over dual-RCD
          boards has reduced significantly as RCBO prices have fallen. For new installations and
          consumer unit replacements, an RCBO board provides the best combination of safety,
          reliability, and fault discrimination.
        </p>
        <SEOAppBridge
          title="Design the board layout with AI"
          description="Elec-Mate's AI circuit designer generates a complete circuit schedule with suggested board layout and circuit allocation. Enter the property details and let the AI handle the design."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'circuit-arrangement',
    heading: 'Circuit Arrangement and Allocation',
    content: (
      <>
        <p>
          How circuits are arranged within the distribution board affects fault discrimination,
          maintenance, and safety. The key principles are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate lighting and power across RCDs.</strong> In dual-RCD boards, put at
                least one lighting circuit on each RCD so that if one trips, the building is not
                left in complete darkness. This is a recommendation from the IET Guidance Note 1 and
                is considered best practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarm on a dedicated circuit or the lighting circuit.</strong> The
                smoke alarm supply should be on a circuit that is unlikely to be switched off
                accidentally. Some electricians put it on its own dedicated 6A MCB. Others connect
                it to a lighting circuit — BS 5839-6 permits this, but the circuit must not be
                shared with a dimmer switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits for high-current appliances.</strong>{' '}
                <SEOInternalLink href="/guides/cooker-circuit-guide">Cookers</SEOInternalLink>,{' '}
                <SEOInternalLink href="/guides/electric-shower-installation">
                  electric showers
                </SEOInternalLink>
                , immersion heaters,{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV chargers
                </SEOInternalLink>
                , and other high-current loads must have dedicated radial circuits — they should not
                share a circuit with general socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Logical grouping.</strong> Group circuits by area (upstairs/downstairs) or
                by function (lighting/power/dedicated) for easy identification and maintenance. The
                circuit schedule should make it immediately obvious which circuit serves which area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a typical 3-bedroom house, a standard circuit schedule might include: 2 lighting
          circuits (upstairs/downstairs), 2 socket circuits (upstairs/downstairs), 1 cooker circuit,
          1 shower circuit, 1 smoke alarm circuit, and 1 or 2 spare ways for future additions. A
          modern RCBO board with 12 to 16 ways accommodates this comfortably.
        </p>
      </>
    ),
  },
  {
    id: 'labelling-requirements',
    heading: 'Labelling Requirements Under BS 7671',
    content: (
      <>
        <p>
          Correct labelling is not optional — it is a regulation requirement and a practical
          necessity for safe operation and maintenance of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit chart (Regulation 514.9.1)</strong> — a durable chart or table must
                be provided at or near the distribution board. It must identify each circuit by
                number, describe the area or function served, state the protective device type and
                rating, and record the cable type and size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning notices (Regulation 514.12)</strong> — the following notices must be
                permanently fixed at the consumer unit: "SAFETY ELECTRICAL CONNECTION — DO NOT
                REMOVE" (at the main earthing terminal), dual supply warning (if applicable), RCD
                test notice ("This installation, or part of it, is protected by a device which
                automatically switches off the supply if an earth fault develops. Test quarterly by
                pressing the button marked 'T' or 'Test'").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD notice</strong> — if an SPD is installed, a notice should indicate its
                presence and the action required if the SPD status indicator shows a fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          During an{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR inspection</SEOInternalLink>, the
          inspector will check that all labelling is present, accurate, and legible. Missing or
          incorrect labelling is a C3 (Improvement Recommended) observation. Illegible or faded
          labels should be replaced — Elec-Mate can generate professional printed circuit schedules
          from the circuit data entered during an inspection.
        </p>
      </>
    ),
  },
  {
    id: 'type-testing',
    heading: 'Type Testing: What BS EN 61439 Means for You',
    content: (
      <>
        <p>
          BS EN 61439-3 is the product standard for distribution boards (low-voltage switchgear and
          controlgear assemblies used by ordinary persons). Consumer units installed in domestic
          premises must comply with this standard, which requires the assembly to be type-tested by
          the manufacturer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What type testing covers</strong> — temperature rise verification,
                dielectric properties, short-circuit withstand, effectiveness of protective
                circuits, clearances and creepage distances, mechanical operation, and degree of
                protection (IP rating).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What this means in practice</strong> — you must use a complete consumer unit
                system from a single manufacturer. The enclosure, busbars, MCBs, RCBOs, and RCDs
                must all be from the same manufacturer's range and verified as compatible. You
                cannot mix devices from different manufacturers because the resulting assembly would
                not be type-tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of non-compliance</strong> — installing a non-type-tested
                consumer unit fails BS 7671 Regulation 132.1.1. It may be identified during an EICR
                and could result in a C2 (Potentially Dangerous) or C3 observation depending on the
                nature of the non-compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The major UK consumer unit manufacturers (Hager, Wylex, MK, Schneider Electric, BG) all
          offer type-tested ranges. When ordering, confirm that the MCBs or RCBOs you specify are
          from the same range as the enclosure.
        </p>
      </>
    ),
  },
  {
    id: 'main-switch',
    heading: 'Main Switch and Isolation',
    content: (
      <>
        <p>
          The main switch provides a means of isolating the entire installation from the supply. It
          must be a double-pole switch (disconnecting both line and neutral) rated for the maximum
          demand of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rating</strong> — typically 100A for a domestic installation with a standard
                single-phase 100A supply. For larger properties or three-phase supplies, the main
                switch rating must match the supply capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessibility</strong> — the main switch must be readily accessible for
                emergency switching. BS 7671 recommends that the consumer unit be installed at a
                height between 450mm and 1350mm from the finished floor level (the accessible zone).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locking</strong> — the main switch should be lockable in the off position
                for{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                during maintenance. Many modern consumer units include a padlock facility on the
                main switch.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In a dual-RCD or RCBO board, the main switch is upstream of all other devices. In some
          configurations, the main switch also serves as the RCD (a main switch RCD or RCCB), but
          this is less common in modern boards because a fault on any circuit would trip the main
          switch and disconnect the entire installation.
        </p>
      </>
    ),
  },
  {
    id: 'spd-installation',
    heading: 'Installing an SPD in the Distribution Board',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/spd-surge-protection">
            Surge protective devices (SPDs)
          </SEOInternalLink>{' '}
          are now required in most new domestic installations under BS 7671:2018+A3:2024 (Regulation
          443). The SPD is installed at the distribution board to protect against transient
          overvoltages caused by lightning strikes, switching surges, and other disturbances on the
          supply network.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 SPD</strong> — the standard choice for domestic installations.
                Installed at the consumer unit on the supply side of the circuit protective devices.
                Protects against surges on the supply network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD overcurrent protection</strong> — the SPD must have its own overcurrent
                protection, typically a dedicated MCB rated between 20A and 40A (check the SPD
                manufacturer's instructions). The SPD MCB should not be RCD-protected because SPD
                operation can cause nuisance RCD tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable length</strong> — the total cable length from the supply terminals,
                through the SPD, to the earth terminal should not exceed 500mm (0.5m) for maximum
                effectiveness. Keep the SPD cables as short and direct as possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Status indicator</strong> — the SPD must have a visible status indicator
                showing whether it is operational or has failed. A notice should be provided
                explaining the indicator and the action required if it shows a fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Some consumer unit manufacturers offer boards with integrated SPD mounting positions,
          which simplify installation and help keep cable lengths short. If using a separate SPD
          module, position it as close to the supply terminals as possible.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-best-practice',
    heading: 'Distribution Board Wiring Best Practice',
    content: (
      <>
        <p>
          The quality of the wiring inside and around the distribution board reflects the quality of
          the entire installation. Neat, well-organised wiring makes maintenance easier, fault
          finding faster, and inspections smoother.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable entry</strong> — use cable glands or grommets at the entry points.
                Cables should enter the board neatly and be dressed (arranged) to follow the inside
                of the enclosure to their respective devices. Avoid crossing cables unnecessarily.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stripping and termination</strong> — strip the correct length of insulation
                (not too much, not too little). The conductor should be fully inserted into the
                terminal with no bare copper visible outside the terminal housing. Tighten terminal
                screws to the manufacturer's torque specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth and neutral connections</strong> — earth conductors to the earth bar,
                neutral conductors to the neutral bar. For RCBO boards, the neutral for each circuit
                connects to the RCBO, not to the main neutral bar. Double-check this — connecting
                the neutral to the wrong device is a common error.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC sleeving</strong> — all circuit protective conductors (bare copper earth
                wires) must be sleeved with green/yellow striped sleeving from the point where they
                become accessible. This is a basic but frequently overlooked requirement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Take pride in your board wiring. A well-wired consumer unit is a calling card for your
          workmanship. A poorly wired board — crossed cables, exposed copper, loose terminals — will
          be photographed and shared by the next electrician who opens it.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Distribution Board Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixing devices from different manufacturers.</strong> Using MCBs or RCBOs
                from a different manufacturer than the consumer unit enclosure. The assembly is not
                type-tested and fails BS EN 61439-3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>All lighting on one RCD in a dual-RCD board.</strong> If that RCD trips, the
                entire property is in darkness. Split lighting circuits across both RCDs or use an
                RCBO board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing circuit schedule or warning notices.</strong> The circuit chart, RCD
                test notice, and earthing label are regulation requirements — not optional extras.
                Missing labels are a C3 observation on every EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral connected to wrong RCBO.</strong> In an RCBO board, each circuit's
                neutral must connect to its own RCBO, not to the main neutral bar. A crossed neutral
                will cause the RCBO to trip immediately on load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate prospective fault current rating.</strong> The consumer unit and
                its protective devices must be rated for the{' '}
                <SEOInternalLink href="/guides/prospective-fault-current-calculator">
                  prospective fault current (PSCC)
                </SEOInternalLink>{' '}
                at the origin. If the PSCC exceeds the rated short-circuit capacity of the devices,
                they may not disconnect safely under fault conditions. Always measure PSCC and check
                against the device ratings.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Certify consumer unit changes on your phone"
          description="Elec-Mate generates the Electrical Installation Certificate (EIC) for consumer unit changes on your phone. AI board scanner reads the new board, voice test entry captures results, and the certificate is ready before you leave the property."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DistributionBoardWiringPage() {
  return (
    <GuideTemplate
      title="Distribution Board Wiring Guide | Consumer Unit Layout"
      description="Complete guide to distribution board wiring and consumer unit layout in the UK. Split load vs dual RCD vs RCBO boards, circuit arrangement, labelling requirements, type testing under BS EN 61439, SPD installation, and common mistakes."
      datePublished="2025-08-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={CircuitBoard}
      heroTitle={
        <>
          Distribution Board Wiring Guide:{' '}
          <span className="text-yellow-400">Consumer Unit Layout</span>
        </>
      }
      heroSubtitle="The distribution board is the heart of every electrical installation. This guide covers split load vs dual RCD vs RCBO board configurations, circuit arrangement and allocation, BS 7671 labelling requirements, type testing under BS EN 61439, SPD installation, wiring best practice, and the common mistakes found during EICR inspections."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Distribution Board Wiring"
      relatedPages={relatedPages}
      ctaHeading="Design and Certify Board Changes on Your Phone"
      ctaSubheading="Elec-Mate's AI circuit designer generates board layouts, the cable sizing calculator verifies every circuit, and the EIC app certifies the finished work. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
