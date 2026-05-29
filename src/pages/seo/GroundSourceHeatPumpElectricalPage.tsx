import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Wind,
  PoundSterling,
  Layers,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Ground Source Heat Pump Electrical',
    href: '/guides/ground-source-heat-pump-electrical',
  },
];

const tocItems = [
  { id: 'overview', label: 'GSHP Electrical Overview' },
  { id: 'power-demands', label: 'Power Demands and Supply' },
  { id: 'three-phase', label: 'Three-Phase Requirements' },
  { id: 'circulation-pumps', label: 'Circulation Pump Wiring' },
  { id: 'zone-controls', label: 'Zone Valve and Controller Wiring' },
  { id: 'buffer-tank', label: 'Buffer Tank and Immersion Heater' },
  { id: 'ground-loop', label: 'Ground Loop Isolation Considerations' },
  { id: 'mcs-certification', label: 'MCS Certification' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ground source heat pumps (GSHPs) typically have higher power demands than air source units — domestic systems range from 6 to 16kW electrical input, with larger properties often requiring three-phase supplies.',
  'Three-phase supply is commonly needed for GSHPs above 10kW. A DNO application for a three-phase supply upgrade can take 8 to 16 weeks and should be initiated at the earliest project stage.',
  'GSHPs require additional electrical circuits for circulation pumps (ground loop and heating circuits), zone valves, buffer tank immersion heaters, and the main compressor unit.',
  'Ground loop isolation must be considered carefully — the ground loop is in contact with earth, and bonding the metalwork of the heat pump to the main earthing terminal is essential to prevent touch voltages. Reg 411.3.1.1 requires extraneous-conductive-parts (including central heating and heat pump metalwork) to be connected to the MET.',
  'MCS certification is mandatory for the installer to access the Boiler Upgrade Scheme (BUS) grant, which provides up to £7,500 for ground source heat pump installations.',
];

const faqs = [
  {
    question: 'Why do ground source heat pumps need more electrical power than air source?',
    answer:
      'Ground source heat pumps extract heat from the ground via a buried loop of pipe, which operates at a more stable temperature than air. While this makes them more efficient (higher COP), domestic GSHP units are typically sized at 8 to 16kW thermal output to heat larger properties (GSHPs are less common in small homes because the borehole or trench cost makes them uneconomical for smaller heat demands). The electrical input to achieve this thermal output is typically 3 to 6kW for the compressor, plus 0.5 to 1.5kW for circulation pumps. The total electrical demand often exceeds what a standard 60A single-phase supply can comfortably accommodate alongside existing household loads.',
  },
  {
    question: 'Is a three-phase supply always required for a ground source heat pump?',
    answer:
      'Not always, but it is common. Single-phase GSHPs are available up to about 10kW electrical input, suitable for smaller installations. For larger systems (12kW and above), three-phase models are standard because distributing the compressor load across three phases reduces the current per phase and avoids excessive voltage drop and starting current issues. Even for a 10kW single-phase GSHP, check that the existing supply has sufficient spare capacity — the compressor starting current (3 to 5 times running current) can cause voltage dips that affect other equipment. A maximum demand assessment is essential during the site survey.',
  },
  {
    question: 'What circuits are needed for a ground source heat pump installation?',
    answer:
      'A typical domestic GSHP installation requires: a dedicated circuit for the compressor unit (32A to 63A depending on the model, three-phase if applicable), a circuit for the ground loop circulation pump (typically 3A to 5A, often supplied from the heat pump controller), circuits for heating zone valves (230V motorised valves), a circuit for the buffer tank or hot water cylinder immersion heater (16A to 20A), and a power supply to the heat pump controller. Some systems also require a circuit for a supplementary electric heater. The exact requirements depend on the system design — always follow the manufacturer installation manual.',
  },
  {
    question: 'How does the ground loop affect electrical safety?',
    answer:
      'The ground loop consists of HDPE pipe buried in the ground, filled with a water-glycol mixture. While the pipe itself is non-conductive, the fluid is in thermal contact with the earth, and the metalwork of the heat pump (heat exchanger, compressor casing) is connected to this fluid circuit. This creates a path to earth that must be addressed. The metalwork of the heat pump must be bonded to the main earthing terminal (MET) as an extraneous conductive part. If the system uses a metallic manifold or buffer vessel, these must also be bonded. Regulation 411.3.1.1 requires extraneous-conductive-parts — including central heating and heat pump metalwork — to be connected to the main earthing terminal (MET) via protective bonding conductors.',
  },
  {
    question: 'What is a buffer tank and does it need its own circuit?',
    answer:
      'A buffer tank is a thermal store that sits between the heat pump and the heating distribution system. It prevents short-cycling of the compressor (where the heat pump turns on and off frequently because the heating demand is lower than the minimum heat pump output). Most buffer tanks include one or two immersion heater elements for backup heating. Each immersion heater (typically 3kW) requires a dedicated circuit — 16A or 20A MCB with 2.5mm cable. The buffer tank may also have a circulation pump that requires a power supply, typically from the heat pump controller circuit.',
  },
  {
    question: 'How much does the electrical work for a GSHP installation cost?',
    answer:
      'The electrical cost for a ground source heat pump installation is typically £1,000 to £2,500 — higher than air source because of the more complex wiring, potential three-phase supply, multiple circulation pump circuits, and larger cable sizes. If a three-phase supply upgrade is needed, add £1,500 to £3,000 for the DNO connection and consumer unit upgrade. The electrical work is a significant component of the overall GSHP installation cost (which is typically £20,000 to £35,000 including the ground loop, heat pump, and distribution system).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/air-source-heat-pump-electrical',
    title: 'Air Source Heat Pump Electrical',
    description:
      'Air source heat pumps are simpler electrically — compare the requirements with ground source.',
    icon: Wind,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for heat pump compressor circuits and circulation pump circuits.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on longer cable runs to plant rooms and outdoor equipment.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for heat pump installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/three-phase-installation',
    title: 'Three-Phase Installation Guide',
    description: 'Many GSHPs require three-phase supplies — review the installation requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
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
    heading: 'Ground Source Heat Pump Electrical Work: What Electricians Need to Know',
    content: (
      <>
        <p>
          Ground source heat pumps (GSHPs) extract heat from the ground via a buried loop of pipe
          and use a compressor to upgrade that heat to a temperature suitable for space heating and
          hot water. They are the most efficient heat pump type (with a COP of 3.5 to 5.0), but the
          installation cost is significantly higher than air source due to the ground loop (borehole
          or trench).
        </p>
        <p>
          GSHPs are typically installed in larger properties with sufficient land for the ground
          loop — detached houses, rural properties, and new-build developments. The electrical
          installation is more complex than air source because of higher power demands, multiple
          circulation pumps, three-phase supply requirements, and the ground loop isolation
          considerations.
        </p>
        <p>
          This guide covers the electrical supply requirements, three-phase considerations,
          circulation pump and zone valve wiring, buffer tank circuits, ground loop isolation, MCS
          certification, and the relevant BS 7671 regulations.
        </p>
      </>
    ),
  },
  {
    id: 'power-demands',
    heading: 'Power Demands and Supply Requirements',
    content: (
      <>
        <p>
          Ground source heat pumps have higher electrical demands than air source units because they
          are typically sized for larger properties. The electrical load includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compressor</strong> — the main power consumer. A domestic GSHP compressor
                typically draws 3 to 8kW electrical input. Starting current is 3 to 5 times the
                running current (some units have soft-start to reduce inrush).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ground loop circulation pump</strong> — pumps the water-glycol mixture
                through the buried ground loop. Typically 100 to 500W depending on the loop length
                and pump type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating circulation pump</strong> — distributes heated water to the
                radiators or underfloor heating. Typically 50 to 200W for domestic systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heaters</strong> — backup heating in the buffer tank or hot water
                cylinder. Typically 3kW each, with some systems having two (upper and lower).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Controller and ancillaries</strong> — zone valves, outdoor sensor, room
                thermostats, and the control panel. Typically 50 to 100W total.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total electrical demand for a typical domestic GSHP installation is 5 to 12kW. Carry out a
          thorough{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            maximum demand assessment
          </SEOInternalLink>{' '}
          to determine whether the existing supply can cope.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Supply: When and Why',
    content: (
      <>
        <p>
          Three-phase supply is commonly needed for ground source heat pump installations. The key
          triggers for a three-phase upgrade are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>GSHP rated above 10kW electrical input</strong> — most manufacturers only
                offer three-phase models at this power level. The compressor motor is three-phase
                for smoother operation and lower starting currents per phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient single-phase supply capacity</strong> — if the existing 60A or
                80A single-phase supply cannot accommodate the GSHP plus existing loads, a
                three-phase supply provides 3 times the capacity (3 x 100A is typical).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop concerns</strong> — on long cable runs (common in rural
                properties where the GSHP plant room may be some distance from the supply intake),
                three-phase reduces the current per conductor and therefore the voltage drop.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A three-phase supply upgrade requires a DNO application and typically takes 8 to 16 weeks.
          The cost is £1,500 to £3,000 depending on the distance from the existing supply point.
          Apply to the DNO immediately after the site survey — this is usually the critical path
          item that determines the overall project timeline.
        </p>
        <p>
          The three-phase consumer unit (or distribution board) must be designed to balance the load
          across the three phases. The GSHP compressor takes the three-phase supply; single-phase
          circuits (immersion heaters, circulation pumps, lighting) are distributed across the
          phases.
        </p>
      </>
    ),
  },
  {
    id: 'circulation-pumps',
    heading: 'Circulation Pump Wiring',
    content: (
      <>
        <p>
          A GSHP system has at least two circulation pumps — one for the ground loop and one for the
          heating distribution. Larger systems may have additional pumps for separate heating zones
          or a dedicated hot water cylinder pump.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ground loop pump</strong> — typically powered from the heat pump controller
                (which manages the pump speed via a 0-10V signal or PWM control). The electrical
                connection is usually a 3-pin plug or hardwired connection to the controller
                terminal strip. Rated at 100 to 500W.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating circuit pump</strong> — distributes heated water from the buffer
                tank to the heating system. May be controlled by the GSHP controller or by a
                separate heating controller. Typically 50 to 200W, powered from a fused spur or the
                controller.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring</strong> — follow the manufacturer wiring diagram for pump
                connections. Most pumps are 230V single-phase with a standard 3-core flex. Variable
                speed pumps may require an additional signal cable from the controller. Route pump
                cables away from power cables to avoid interference with speed control signals.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            Cable Segregation: Power vs Signal Cables
          </h4>
          <p className="text-white text-sm leading-relaxed">
            A common site mistake is routing 230 V power cables alongside low-voltage signal cables
            (0–10 V pump speed, PWM control, room thermostat wiring, outdoor sensor).
            Electromagnetic interference from the power cables can cause erratic pump speeds, false
            thermostat readings, and nuisance controller faults. BS 7671 Reg 444.4.2 requires
            segregation, screening, or other mitigation measures where EMI could affect equipment
            operation. In practice: run power and signal cables in separate conduit or cable
            trunking, or maintain a minimum 50 mm separation. Where crossing is unavoidable, cross
            at 90&deg;.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'zone-controls',
    heading: 'Zone Valve and Controller Wiring',
    content: (
      <>
        <p>
          The GSHP controller manages heating zones, hot water production, and weather compensation.
          The electrical wiring for the controller and zone valves follows the same principles as{' '}
          <SEOInternalLink href="/guides/air-source-heat-pump-electrical">
            air source heat pump installations
          </SEOInternalLink>
          , but GSHP systems often have more zones due to the larger property size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone valves</strong> — 230V motorised valves that control the flow of heated
                water to different zones (ground floor, first floor, hot water cylinder). Each valve
                has live, neutral, earth, and a switched live return. Wire to the controller wiring
                centre per the manufacturer diagram.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Room thermostats</strong> — one per heating zone, wired or wireless. Wired
                thermostats use a 2-core cable to the controller. Wireless thermostats need a
                receiver at the controller, which requires a power supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor sensor</strong> — mounted on a north-facing wall and wired to the
                controller for weather compensation. 2-core signal cable, typically up to 50m run.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buffer tank sensors</strong> — temperature sensors in the buffer tank wired
                to the controller. These are low-voltage signal connections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'buffer-tank',
    heading: 'Buffer Tank and Immersion Heater Circuits',
    content: (
      <>
        <p>
          A buffer tank is almost always required with a GSHP to prevent compressor short-cycling.
          The buffer tank stores thermal energy and decouples the heat pump output from the heating
          demand. Most buffer tanks include one or two immersion heater elements for backup heating.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater circuits</strong> — each 3kW immersion heater requires a
                dedicated 16A or 20A circuit with 2.5mm cable and a local double-pole switch or FCU.
                If the buffer tank has two immersion heaters (upper and lower), they may need
                separate circuits unless interlocked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot water cylinder</strong> — if the system uses a separate hot water
                cylinder (in addition to the buffer tank), it may also have its own immersion heater
                requiring a dedicated circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control</strong> — immersion heaters are typically controlled by the GSHP
                controller (energised only when the heat pump cannot maintain the required
                temperature). The controller activates the immersion heater circuit via a relay or
                contactor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ground-loop',
    heading: 'Ground Loop Isolation Considerations',
    content: (
      <>
        <p>
          The ground loop introduces a unique electrical safety consideration. The loop pipe is
          buried in direct contact with the earth, and the water-glycol mixture inside the loop is
          in thermal contact with the ground. While HDPE pipe is non-conductive, the metalwork of
          the heat pump (heat exchanger, compressor casing, manifold connections) is connected to
          the fluid circuit.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding requirement</strong> — Regulation 411.3.1.1 requires
                extraneous-conductive-parts, including the metallic casings of heat exchangers,
                compressor units, manifolds, and buffer vessels, to be connected to the main
                earthing terminal (MET) via protective bonding conductors complying with Chapter 54.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extraneous conductive parts</strong> — metallic manifolds, buffer vessels,
                and pipework connected to the ground loop may be classified as extraneous conductive
                parts and must be bonded to the MET. Assess each installation individually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — in rural properties with TT earthing (common
                for properties that need GSHPs), the earth fault loop impedance may be higher.
                Verify that the protective devices will disconnect within the required time. RCD
                protection is essential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-certification',
    heading: 'MCS Certification for Ground Source Heat Pumps',
    content: (
      <>
        <p>
          As with air source heat pumps, MCS certification is mandatory for the lead installer to
          access the Boiler Upgrade Scheme (BUS) grant. The grant provides up to £7,500 towards the
          cost of a GSHP installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS for GSHP</strong> — the MCS standard for ground source heat pumps is MIS
                3005. It covers system design (including ground loop sizing), installation,
                commissioning, and handover. The MCS installer is responsible for the overall system
                design and performance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical subcontractor</strong> — electricians working as subcontractors
                to an MCS-certified installer do not need their own MCS certification for the
                electrical work. However, the electrical work must comply with BS 7671 and be
                covered by an EIC. The EIC is part of the MCS documentation package.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards',
    content: (
      <>
        <p>
          The electrical installation must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          . The same regulations that apply to air source heat pumps also apply to ground source,
          with additional considerations for the ground loop:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.1.1</strong> — extraneous-conductive-parts liable to
                introduce a dangerous potential difference (including central heating systems, heat
                pump metalwork, metallic pipework, and buffer vessels) shall be connected to the
                main earthing terminal by protective bonding conductors complying with Chapter 54.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.1.2</strong> — sets the maximum disconnection times from
                Table 41.1 for final circuits rated up to 63 A with socket-outlets, and up to 32 A
                supplying only fixed equipment. Compressor circuits above 32 A are assessed against
                Regulation 411.4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 537.3</strong> — every circuit shall be capable of being
                isolated. The GSHP compressor circuit, immersion heater circuits, and circulation
                pump circuits each require a local means of isolation to permit safe servicing
                without de-energising unrelated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.7</strong> — recommends arc fault detection devices (AFDDs)
                on AC final circuits. Where a GSHP supply upgrade triggers new circuits or rewires
                in domestic premises, AFDD installation is recommended on those circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.4 (A4:2026)</strong> — within domestic (household)
                premises, AC final circuits supplying luminaires shall have additional protection by
                a 30 mA RCD. Where new lighting circuits are added as part of a GSHP supply upgrade,
                this requirement applies.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
            BS 7671:2018+A4:2026 Updates Relevant to GSHP Installations
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li>
              <strong>AFDD — Reg 421.1.7:</strong> Where a GSHP supply upgrade involves adding new
              circuits or rewiring in domestic premises, arc fault detection devices (AFDDs) are
              recommended on those AC final circuits. GSHP control electronics are sensitive to
              supply-side arc faults; AFDDs provide an additional layer of protection.
            </li>
            <li>
              <strong>30 mA RCD on lighting — Reg 411.3.4:</strong> New domestic lighting circuits
              added as part of a GSHP supply upgrade shall have additional protection by a 30 mA
              RCD. This A4:2026 addition is mandatory for new circuits in household premises.
            </li>
            <li>
              <strong>SPDs for GSHP control electronics:</strong> GSHP controllers, inverter drives,
              and outdoor sensors are sensitive to transient overvoltages. Where the risk assessment
              indicates exposure (Reg 443.4), surge protective devices (SPDs) should be installed at
              the distribution board supplying the GSHP to protect sensitive control electronics.
            </li>
          </ul>
        </div>
        <p>
          The work is notifiable under Part P of the Building Regulations. Notify through your
          competent person scheme or via Building Control.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The GSHP Opportunity',
    content: (
      <>
        <p>
          Ground source heat pump installations are high-value projects. The electrical package
          alone is typically worth £1,000 to £2,500, and the overall project values are £20,000 to
          £35,000. Building relationships with MCS-certified GSHP installers provides a steady
          stream of well-paid work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the compressor circuit, circulation pump circuits, and immersion heater
                  circuits with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Three-phase calculations included.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price GSHP electrical work with Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink>.
                  Compressor circuit, three-phase supply, circulation pumps, zone valves, immersion
                  heaters — all itemised.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC for GSHP circuits on site. AI board scanning, voice test entry,
                  and instant PDF export for the MCS documentation package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">
                Verification Checklist for GSHP Circuits
              </h4>
              <ul className="text-white text-sm space-y-2">
                <li>
                  <strong>Zs verification — GN3 0.8 factor:</strong> On long compressor cable runs
                  (plant room to supply intake), apply the GN3 Appendix 3 acceptance criterion:
                  measured Zs shall not exceed 0.8 &times; the tabulated maximum for the protective
                  device type and rating. This accounts for conductor temperature at full load.
                </li>
                <li>
                  <strong>Insulation resistance:</strong> Carry out IR testing (500 V d.c.) on all
                  GSHP circuits before energising. Disconnect the GSHP controller and electronic
                  components — these are not rated for 500 V test voltage. Test each circuit with
                  associated equipment disconnected; minimum 1 M&ohm; per Reg 643.3.
                </li>
                <li>
                  <strong>RCD trip time:</strong> Verify that any 30 mA RCDs protecting GSHP-related
                  circuits trip within 40 ms at I&Delta;n (per Table 3A of GN3). Test using a
                  calibrated RCD tester at 1 &times; and 5 &times; rated tripping current; record
                  results on the Schedule of Test Results.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify GSHP electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification."
          icon={Layers}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GroundSourceHeatPumpElectricalPage() {
  return (
    <GuideTemplate
      title="Ground Source Heat Pump Electrical | Wiring Guide UK"
      description="Complete guide to ground source heat pump electrical installation in the UK. Covers power demands, three-phase supply, circuit wiring, earthing, and BS 7671:2018+A4:2026 compliance."
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Renewables"
      badgeIcon={Layers}
      heroTitle={
        <>
          Ground Source Heat Pump Electrical:{' '}
          <span className="text-yellow-400">Wiring Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Ground source heat pumps have higher electrical demands than air source — often requiring three-phase supplies, multiple circulation pump circuits, and careful earthing around the ground loop. This guide covers everything an electrician needs to know."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About GSHP Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify GSHP Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for ground source heat pump installations. 7-day free trial, cancel anytime."
    />
  );
}
