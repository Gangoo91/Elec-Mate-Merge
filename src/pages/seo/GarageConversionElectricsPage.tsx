import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Warehouse,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  Lightbulb,
  Thermometer,
  ClipboardCheck,
  Fan,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Garage Conversion Electrics', href: '/guides/garage-conversion-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'building-regs', label: 'Building Regulations' },
  { id: 'consumer-unit', label: 'Consumer Unit Design' },
  { id: 'lighting', label: 'Lighting Design' },
  { id: 'socket-layout', label: 'Socket Layout' },
  { id: 'heating-ventilation', label: 'Heating and Ventilation' },
  { id: 'fire-safety', label: 'Fire Safety and Separation' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'step-by-step', label: 'Step-by-Step Approach' },
  { id: 'tools-materials', label: 'Tools and Materials' },
  { id: 'costs', label: 'Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A garage conversion is notifiable under Part P of the Building Regulations. The electrical work must be carried out by a registered electrician or notified to Building Control. Building Regulations approval (separate from planning permission) is also required for the structural conversion itself.',
  'The existing garage electrical installation is rarely adequate for a habitable room. At minimum, the lighting must meet Part L energy efficiency standards, socket outlet provision must match the room use, and all circuits must have RCD protection.',
  'The decision between extending the existing house consumer unit and installing a new consumer unit depends on spare capacity, cable routes, and whether the garage already has its own sub-panel from when it was a garage.',
  'Heating circuits are almost always required — garages are typically uninsulated before conversion. Electric panel heaters, underfloor heating, or a heat pump circuit will be needed. Factor this load into the design from the start.',
  'Ventilation must meet Building Regulations Part F. Mechanical extract ventilation (MEV) is often required in converted garages, particularly if the room will be used as a bedroom or kitchen.',
];

const faqs = [
  {
    question: 'Do I need Building Regulations approval for a garage conversion?',
    answer:
      'Yes. A garage conversion from a non-habitable space to a habitable room requires Building Regulations approval in the UK. This covers structural changes (floor insulation, damp proofing, insulated walls and ceiling), fire safety (fire separation from the main house if the garage was integral), thermal performance (Part L), ventilation (Part F), and electrical safety (Part P). The electrical work is one component of the overall Building Regulations approval. If you use a registered electrician (NICEIC, NAPIT, etc.), the electrical work is self-certified under Part P. The structural and other elements are inspected by Building Control or an Approved Inspector.',
  },
  {
    question: 'Can I keep the existing garage electrics after conversion?',
    answer:
      'It depends on the condition and specification. A typical garage has a single fluorescent light and possibly one socket — this is not adequate for a habitable room. The existing wiring must be inspected and tested. If the cables are in good condition and meet current standards, they can be reused as part of the new design. However, the lighting must be upgraded to meet Part L energy efficiency requirements, additional sockets are needed for the room use, and all circuits must have RCD protection. In practice, most garage conversions require a significant rewire of the garage space even if the supply and sub-main from the house are reusable.',
  },
  {
    question: 'Should I extend the house consumer unit or install a new one?',
    answer:
      'If the house consumer unit has spare ways and adequate capacity, extending it is the simpler and cheaper option — run new circuits from the house CU to the converted garage. If the garage already has its own sub-panel (common in integral garages), upgrade or replace it with a modern RCBO board. Install a new consumer unit in the garage only if the house CU has no spare capacity, the cable route from the house CU is impractical, or the garage conversion has a high electrical load (e.g. kitchen, electric heating, EV charger) that warrants a separate sub-main and local distribution.',
  },
  {
    question: 'What lighting is required in a garage conversion?',
    answer:
      'The lighting must meet Part L of the Building Regulations for energy efficiency. At least 75% of the light fittings must be low-energy (LED or equivalent). In practice, LED downlights or surface-mounted LED panels are the standard choice. The lighting design should provide adequate illumination for the room use — 150 to 300 lux for a bedroom, 300 to 500 lux for a home office or kitchen. Include a switching arrangement at the door entrance. For bedrooms, include a two-way switching arrangement (door and bed position). If the room has no natural light (common in garage conversions where the garage door is bricked up), provide generous lighting levels and consider a dimming circuit for comfort.',
  },
  {
    question: 'Do I need ventilation in a garage conversion?',
    answer:
      'Yes. Part F of the Building Regulations requires adequate ventilation in habitable rooms. For a garage conversion, this typically means trickle vents in any new windows, a mechanical extract fan if the room is a kitchen or bathroom (or if natural ventilation is inadequate), and background ventilation provision. If the garage door has been bricked up and replaced with a solid wall, natural ventilation may be limited — a mechanical ventilation with heat recovery (MVHR) unit or a continuous mechanical extract ventilation (MEV) system may be required. Building Control will assess the ventilation provision as part of the overall approval.',
  },
  {
    question: 'How much does a garage conversion cost for electrics only?',
    answer:
      'The electrical work for a garage conversion typically costs between £1,500 and £4,000 depending on the specification. A basic conversion to a bedroom or playroom (lighting, sockets, heating circuit, smoke detection) is at the lower end — £1,500 to £2,000. A conversion to a home office or gym with more sockets, data cabling, and dedicated power circuits is £2,000 to £3,000. A conversion to a kitchen or utility room (cooker circuit, extract fan, additional socket circuits, plumbing proximity considerations) is £3,000 to £4,000. These prices include materials, labour, and the Electrical Installation Certificate.',
  },
  {
    question: 'Do I need fire separation between the garage conversion and the house?',
    answer:
      'If the garage was integral (attached to the house with an internal door), fire separation requirements apply. The wall between the garage and the house must provide 30-minute fire resistance (this wall may already exist). Any penetrations through this wall for cables or services must be fire-stopped to maintain the fire rating. Smoke detection must be installed — interconnected smoke alarms on the escape route and in habitable rooms. These fire requirements are covered by Part B of the Building Regulations and will be inspected by Building Control.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for heating circuits, cooker circuits, and sub-mains in garage conversions.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on circuits running from house consumer unit to the converted garage.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for garage conversions on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description: 'Price garage conversion electrical packages with itemised materials and labour.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/shed-electrical-installation',
    title: 'Shed Electrical Installation',
    description:
      'Similar principles for outbuilding supply — SWA cable, sub-panels, and TT earthing options.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with modules covering domestic installation testing and certification.',
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
    heading: 'Garage Conversion Electrics: What Electricians Need to Know',
    content: (
      <>
        <p>
          Garage conversions are one of the most popular home improvement projects in the UK. They
          add liveable space without extending the footprint of the property, and the electrical
          work is a significant part of the project. Whether the customer is converting to a
          bedroom, home office, gym, playroom, or even a kitchen, the electrical design must meet
          the requirements for a habitable room — which is a substantial step up from a typical
          garage installation.
        </p>
        <p>
          This guide covers the electrical requirements for garage conversions, including Building
          Regulations compliance, consumer unit design, lighting, socket layout, heating and
          ventilation circuits, fire safety, and the testing and certification process.
        </p>
        <p>
          The work is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . A registered electrician can self-certify the electrical work, but the overall garage
          conversion also requires Building Regulations approval for the structural, thermal, fire
          safety, and ventilation elements.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations for Garage Conversions',
    content: (
      <>
        <p>
          A garage conversion must comply with multiple parts of the Building Regulations. The
          electrical work falls under Part P, but the electrician should be aware of the other
          requirements that affect the electrical design:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P (Electrical safety)</strong> — all new circuits, alterations to
                existing circuits, and consumer unit work are notifiable. A registered electrician
                self-certifies via their competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L (Energy efficiency)</strong> — lighting must meet energy efficiency
                requirements. At least 75% of light fittings must be low-energy (LED). The
                insulation and heating design affects the electrical load calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part B (Fire safety)</strong> — fire separation from the main house,
                interconnected smoke detection, and fire-stopping of cable penetrations. The
                electrician is responsible for the smoke detection and fire-stopping elements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part F (Ventilation)</strong> — mechanical extract ventilation may be
                required, which needs an electrical supply. Factor this into the circuit design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Design',
    content: (
      <>
        <p>
          The consumer unit arrangement depends on the existing setup and the scope of the
          conversion. There are three common approaches:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extend the house consumer unit</strong> — if the house CU has spare ways and
                the cable route to the garage is short, add new circuits directly from the house CU.
                This is the simplest and cheapest approach for basic conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upgrade existing garage sub-panel</strong> — if the garage already has a
                sub-panel (common in integral garages), replace it with a modern RCBO board. Reuse
                the existing sub-main if it has adequate capacity for the new load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New sub-main and consumer unit</strong> — for high-demand conversions
                (kitchen, heating, EV charger), run a new sub-main from the house CU and install a
                dedicated consumer unit in the converted space. Size the sub-main for the total
                maximum demand.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A typical garage conversion to a bedroom or office requires 4 to 6 circuits: lighting (x1
          or x2), socket outlets (x1 or x2), heating circuit, smoke detection, and possibly an
          extract fan. A conversion to a kitchen adds a cooker circuit, additional socket circuits,
          and potentially a dedicated appliance circuit (washing machine, dishwasher).
        </p>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Lighting Design',
    content: (
      <>
        <p>
          Garage conversions often have limited natural light — particularly if the garage door has
          been bricked up and replaced with a solid wall or a window smaller than the original
          opening. The lighting design is critical to making the space feel like a proper room
          rather than a converted garage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General lighting</strong> — LED downlights (6W to 10W each) are the standard
                choice. Space at approximately 1.2m centres for even coverage. A 5m x 3m garage
                typically needs 6 to 8 downlights for 300 lux at floor level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Task lighting</strong> — for home offices, provide additional lighting at
                desk positions (wall lights or under-cabinet strips). For kitchens, under-cabinet
                LED strips on the worktop circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching</strong> — switch at the entrance door. For bedrooms, provide
                two-way switching (door and bedside). For larger spaces, consider a dimmer circuit
                for comfort and energy saving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L compliance</strong> — at least 75% of fittings must be low-energy.
                With LED throughout, this is automatically satisfied.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'socket-layout',
    heading: 'Socket Layout',
    content: (
      <>
        <p>
          Socket outlet provision should match the intended room use. BS 7671 does not specify a
          minimum number of sockets, but the IET On-Site Guide and industry best practice provide
          guidance:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bedroom / Playroom</h3>
            <p className="text-white text-sm leading-relaxed">
              Minimum 4 double socket outlets. Position on at least two walls. Include sockets at
              bed-head height (600mm) for phone charging and bedside lights. Consider a USB-C
              charging socket at the bed position.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Home Office</h3>
            <p className="text-white text-sm leading-relaxed">
              Minimum 6 double socket outlets. Cluster sockets at the desk position — at least 2
              doubles at desk height (700mm) for monitor, computer, printer, and peripherals.
              Include a dedicated data point (Cat6) at the desk if wired networking is required.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Kitchen / Utility</h3>
            <p className="text-white text-sm leading-relaxed">
              Worktop sockets above the countertop (minimum 300mm above worktop surface). Dedicated
              circuits for cooker (32A or 45A), washing machine, and dishwasher. Fused spur for
              extract fan. Socket outlets on ring or radial circuits — minimum 6 doubles for a
              kitchen.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Gym / Games Room</h3>
            <p className="text-white text-sm leading-relaxed">
              4 to 6 double socket outlets. Position away from equipment zones to avoid trip
              hazards. Include a socket for a wall-mounted TV or screen. Consider a dedicated 20A
              radial for heavy gym equipment (treadmill, rowing machine).
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'heating-ventilation',
    heading: 'Heating and Ventilation Circuits',
    content: (
      <>
        <p>
          Garages are typically uninsulated before conversion. Even after insulation is added to
          walls, floor, and ceiling as part of the conversion, the space usually needs its own
          heating circuit. The electrical options are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric panel heaters</strong> — simplest option. One or two wall-mounted
                panel heaters (1kW to 2kW each) on a dedicated radial circuit. Low installation cost
                but higher running cost than heat pumps or gas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating</strong> — popular in garage conversions because
                the floor is typically insulated and re-screeded as part of the structural work.
                Install heating mats or cables under the new floor finish. Requires a dedicated
                circuit (typically 16A to 20A) and a floor thermostat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump feed</strong> — if the conversion is substantial, a
                small air source heat pump may be specified by the M&E designer. The electrician
                provides the dedicated supply circuit (typically 20A to 32A) and the controls
                wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical extract ventilation</strong> — if the room has limited natural
                ventilation, a continuous or intermittent extract fan is needed. Wire from a fused
                spur (3A). For bathrooms or kitchens, link to the light switch with an overrun
                timer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-safety',
    heading: 'Fire Safety and Separation',
    content: (
      <>
        <p>
          Fire safety in a garage conversion has direct implications for the electrical
          installation:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire separation</strong> — the wall between an integral garage and the main
                house must provide 30-minute fire resistance. Any cable penetrations through this
                wall must be fire-stopped with intumescent sealant or fire-rated collars to maintain
                the fire rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke detection</strong> — interconnected smoke alarms must be installed on
                the escape route and in the converted room. Mains-powered with battery backup is the
                standard. Wire on a dedicated lighting circuit or a dedicated alarm circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit enclosure</strong> — if the consumer unit is in the converted
                space, it must be in a non-combustible (metal) enclosure or mounted on a
                non-combustible surface. A documented risk assessment is required if a non-ferrous
                alternative is used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency egress lighting</strong> — not typically required for domestic
                garage conversions, but if the room has no windows and no natural light, consider
                providing a maintained emergency light fitting above the door for safety.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          is required for the garage conversion electrical work. The scope of testing includes all
          new and altered circuits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors on all new circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Ring final circuit continuity (if ring circuits are used)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance on all new circuits (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at every termination point</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) on every circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation on all RCD/RCBO protected circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current at the origin</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Functional testing of smoke alarms (interconnection, battery backup)</span>
            </li>
          </ul>
        </div>
        <p>
          The EIC is submitted to Building Control (via the competent person scheme) as part of the
          overall Building Regulations sign-off. The homeowner receives a copy for their records,
          and it becomes part of the property file for future sale.
        </p>
      </>
    ),
  },
  {
    id: 'step-by-step',
    heading: 'Step-by-Step Approach',
    content: (
      <>
        <p>
          The electrical work in a garage conversion must be coordinated with the other trades. The
          typical sequence is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Site survey and design</strong> — assess the existing installation, determine
              consumer unit approach, design the circuit layout, and produce a quote.
            </li>
            <li>
              <strong>First fix</strong> — run cables in walls, floor, and ceiling before
              plasterboard goes up. Install back boxes, cable routes for lighting, and any conduit
              for future services. Coordinate with the plasterer and insulation contractor.
            </li>
            <li>
              <strong>Fire stopping</strong> — seal all cable penetrations through the fire-rated
              wall with intumescent sealant before plasterboard covers the openings.
            </li>
            <li>
              <strong>Consumer unit work</strong> — install or modify the consumer unit. Connect the
              sub-main if applicable. Install MCBs/RCBOs for all new circuits.
            </li>
            <li>
              <strong>Second fix</strong> — after plastering and decoration, fit switches, sockets,
              light fittings, and smoke alarms. Connect heating controls and extract fans.
            </li>
            <li>
              <strong>Testing and certification</strong> — test all circuits, complete the EIC, and
              submit to the competent person scheme for Building Control notification.
            </li>
          </ol>
        </div>
        <p>
          Timing is critical — the first fix must happen before insulation and plasterboard, and the
          second fix after decoration. Coordinate with the main contractor to avoid delays.
        </p>
      </>
    ),
  },
  {
    id: 'tools-materials',
    heading: 'Tools and Materials Checklist',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tools Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Insulated screwdriver set</li>
              <li>Torque screwdriver</li>
              <li>Drill and bits (masonry and wood)</li>
              <li>Cable detector</li>
              <li>Cable strippers and cutters</li>
              <li>Multimeter and continuity tester</li>
              <li>Insulation resistance tester (500V)</li>
              <li>Earth fault loop impedance tester</li>
              <li>RCD tester</li>
              <li>Hole saw set (for downlights)</li>
              <li>Fish tape / draw wire</li>
              <li>Crimping tool and ferrule kit</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Materials Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Consumer unit or RCBOs (if upgrading)</li>
              <li>Twin and earth cable (1.0mm², 1.5mm², 2.5mm², 6.0mm²)</li>
              <li>Metal back boxes and dry-lining boxes</li>
              <li>Socket outlets and switches</li>
              <li>LED downlights or panel lights</li>
              <li>Interconnected mains smoke alarms</li>
              <li>Intumescent fire-stop sealant</li>
              <li>Cable clips, trunking, and conduit</li>
              <li>Heating equipment (panel heaters / UFH mats)</li>
              <li>Extract fan and ductwork (if required)</li>
              <li>Thermostat and controls</li>
              <li>Sub-main cable (if new sub-panel needed)</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs (2026 UK Pricing)',
    content: (
      <>
        <p>Garage conversion electrical costs depend on the room use and specification:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedroom / playroom</strong> — lighting, 4-6 sockets, heating circuit, smoke
                detection: £1,500 to £2,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home office</strong> — enhanced lighting, 6-8 sockets, data cabling,
                heating, dedicated circuits: £2,000 to £3,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen / utility room</strong> — cooker circuit, multiple socket circuits,
                extract fan, lighting, heating, appliance circuits: £3,000 to £4,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add-ons</strong> — consumer unit upgrade at house: £300 to £500. New
                sub-main: £200 to £500. Underfloor heating: £400 to £800. Data cabling (Cat6): £80
                to £150 per point.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Garage Conversion Work',
    content: (
      <>
        <p>
          Garage conversions are high-value domestic jobs with repeat referral potential — a
          satisfied customer tells their neighbours. The electrical package is typically £1,500 to
          £4,000, and the work spans first fix and second fix phases over 1 to 3 weeks.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the complete electrical package with Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . First fix, second fix, consumer unit, lighting, sockets, heating, smoke
                  detection, testing — all itemised. Send a professional PDF quote that wins work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site after final testing. AI
                  board scanning, voice test entry, and instant PDF export. The certificate is ready
                  for Building Control sign-off before you leave the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify garage conversion electrics"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. Everything you need for garage conversion electrical packages. 7-day free trial."
          icon={Warehouse}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageConversionElectricsPage() {
  return (
    <GuideTemplate
      title="Garage Conversion Electrics | Electrical Guide UK 2026"
      description="Complete guide to garage conversion electrics in the UK. Building regulations, consumer unit design, lighting, socket layout, heating circuits, ventilation, fire safety, and Part P certification with 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Warehouse}
      heroTitle={
        <>
          Garage Conversion Electrics:{' '}
          <span className="text-yellow-400">Complete Electrical Guide UK 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about the electrical work in a garage conversion — Building Regulations, consumer unit design, lighting, socket layout, heating and ventilation circuits, fire safety, and realistic 2026 pricing."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garage Conversion Electrics"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Garage Conversions on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
