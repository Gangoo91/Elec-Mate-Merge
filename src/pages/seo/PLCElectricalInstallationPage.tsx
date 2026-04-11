import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cpu,
  Shield,
  AlertTriangle,
  Settings,
  FileCheck2,
  Zap,
  Activity,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'PLC Electrical Installation', href: '/plc-electrical-installation' },
];

const tocItems = [
  { id: 'plc-panel-design', label: 'PLC Panel Design Basics' },
  { id: 'power-supply', label: 'Power Supply and Distribution' },
  { id: 'wiring-inputs', label: 'Wiring Digital Inputs (24 VDC)' },
  { id: 'wiring-outputs', label: 'Wiring Outputs: Relay, Transistor & Triac' },
  { id: 'earthing-noise', label: 'Earthing for Noise Immunity' },
  { id: 'cable-segregation', label: 'Cable Segregation' },
  { id: 'documentation', label: 'Documentation Requirements' },
  { id: 'commissioning', label: 'Testing and Commissioning' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'PLC panels must comply with BS EN 61439 (low-voltage switchgear and controlgear assemblies) for panel construction and BS 7671 for the fixed installation connecting the panel.',
  'Digital inputs are typically 24 VDC sourcing or sinking — the wiring polarity depends on the PLC input module type (PNP or NPN) and must match the field device output type.',
  'Relay outputs are the most versatile but slowest output type; transistor outputs (PNP or NPN) switch faster; triac outputs suit AC loads and avoid the contact life limitation of relays.',
  'Earthing the PLC correctly is critical for noise immunity — use a star-point earth bar at the panel, bond all cable screens at the panel end, and keep signal cable screens continuous to the field device.',
  'Power conductors (mains voltage), 24 VDC I/O wiring, and communications cables (Profibus, Ethernet, DeviceNet) must be segregated in separate cable ducts or trays to prevent noise coupling.',
  'Every PLC installation must be accompanied by I/O schedule, panel drawings, program backup, and network configuration file — without these, fault diagnosis and future modifications become extremely difficult.',
];

const faqs = [
  {
    question: 'What voltage are PLC digital inputs typically wired at?',
    answer:
      '24 VDC is the dominant standard for digital inputs in UK industrial PLC installations. 24 VDC PELV (Protective Extra Low Voltage) circuits are safe, compatible with most field sensors (proximity switches, photoelectric sensors, limit switches), and immune to most electromagnetic interference. Some older installations use 110 VAC inputs, particularly in process industries. 240 VAC input modules exist but are rare in new installations. Always verify the input voltage range and current draw from the PLC module data sheet before wiring.',
  },
  {
    question: 'What is the difference between PNP and NPN PLC inputs?',
    answer:
      'PNP inputs (sourcing inputs) expect a positive signal — the field device switches the 24 VDC positive rail to the input terminal. NPN inputs (sinking inputs) expect the field device to switch the 0 V rail (common) to the input terminal. European industrial practice predominantly uses PNP sensors and sourcing inputs, while some Asian-origin equipment uses NPN. Mixing PNP and NPN in the same system requires care — always check the PLC module specification and match the field device output type. Mismatched wiring typically results in an input that is permanently ON or permanently OFF.',
  },
  {
    question: 'When should I use relay outputs versus transistor outputs?',
    answer:
      'Use relay outputs when you need to switch different voltages on different outputs (the relay contact is a volt-free contact), when switching AC loads, when switching inductive loads that may generate voltage spikes, or when electrical isolation between the PLC and the field device is required. Relay outputs are limited to approximately 2 A and 10 to 30 million operations. Use transistor outputs (24 VDC solid-state) when high switching speed is required (servo drives, step motor drives, pulse outputs), when you need high cycle rates, or when the load is always 24 VDC. Transistor outputs are polarity-specific (PNP or NPN) and more susceptible to damage from inductive loads without a free-wheel diode.',
  },
  {
    question: 'How should analogue signal cables be wired to prevent noise?',
    answer:
      'Analogue signals (4–20 mA, 0–10 V, thermocouple, RTD) are the most noise-sensitive wiring in a PLC system. Use individually screened twisted pair cables (e.g., Belden 8762 or equivalent). Connect the screen at the panel end to the analogue earth bar (which may be separate from the power earth); leave the screen floating at the field device end to prevent earth loop currents. Run analogue cables in a separate cable tray or duct from power cables, maintaining at least 150 mm separation. Never run analogue and power cables in the same conduit. Use 4–20 mA rather than 0–10 V where possible — current loops are inherently more noise-immune.',
  },
  {
    question: 'What communications cables are used in PLC systems and how are they wired?',
    answer:
      'Common PLC fieldbus and networking standards used in UK industrial installations include: Profibus DP (RS-485, violet cable, 9-pin D-sub connectors, terminators required at both ends of the bus), EtherNet/IP and Profinet (standard Cat5e or Cat6 screened STP cable, RJ45, often on a managed industrial Ethernet switch), Modbus RTU (RS-485, twisted pair, terminators required), and DeviceNet (specific round cable with male/female Micro or Mini connectors, colour-coded, drop cables limited in length). All fieldbus cables must be segregated from power wiring. Screen connections for fieldbus cables follow specific rules for each protocol — consult the network specification.',
  },
  {
    question: 'What documentation must be produced for a PLC installation?',
    answer:
      'At minimum: panel general arrangement drawing, panel wiring diagram (showing every termination), I/O schedule (listing every I/O point, address, description, signal type, field device tag), cable schedule, network topology drawing, PLC program backup (in manufacturer-specific format and ideally exported to PDF/printout), network configuration files, and FAT (Factory Acceptance Test) and SAT (Site Acceptance Test) records. An Electrical Installation Certificate (EIC) is required for the electrical installation work under BS 7671. The documentation set should be handed to the client in both electronic and hard copy format.',
  },
  {
    question: 'Does a PLC panel installation require Building Regulations notification?',
    answer:
      'PLC panel installations in commercial and industrial premises are not subject to Part P of the Building Regulations (which applies to dwellings). However, all electrical installation work must comply with BS 7671 and, if carried out in a factory, with the Electricity at Work Regulations 1989. An Electrical Installation Certificate must be issued for new circuits. The panel enclosure itself must comply with BS EN 61439. If the installation affects an existing distribution board or final circuit, the work must be certified accordingly. For new panel installations, always check whether the client requires compliance with their specific industry standards (e.g., ATEX for hazardous areas, FDA for food processing).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/motor-starters-installation',
    title: 'Motor Starter Installation',
    description:
      'DOL, star-delta, and VFD starters — wiring, overload protection, and control circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/industrial-earthing-systems',
    title: 'Industrial Earthing Systems',
    description:
      'TN-S, TN-C-S, and TT earthing for industrial premises, EMC earthing, and testing.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/power-factor-correction',
    title: 'Power Factor Correction',
    description:
      'Capacitor banks, harmonic detuning, and payback calculation for industrial users.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description: 'Complete EICs on your phone and export PDF instantly for panel installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'plc-panel-design',
    heading: 'PLC Panel Design Basics',
    content: (
      <>
        <p>
          A PLC (Programmable Logic Controller) panel is a purpose-built electrical enclosure that
          houses the PLC processor, I/O modules, power supplies, safety relays, and associated
          wiring. Panel design is governed by BS EN 61439 (low-voltage switchgear and controlgear
          assemblies), and all electrical installation work connecting the panel to the fixed
          installation must comply with BS 7671. Good panel design reduces installation time, makes
          fault-finding straightforward, and ensures the system can be safely modified in the
          future.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIN rail layout</strong> — arrange components on steel DIN rail (35 mm × 7.5
                mm to BS EN 60715) in a logical sequence: incoming isolator and MCBs at the top, PLC
                rack in the middle, I/O terminal strips at the bottom. Allow a minimum 25 mm gap
                between rows for cable access and ventilation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable duct sizing</strong> — allow at least 40% spare capacity in cable
                ducts for future modifications. Use separate ducts for power (mains voltage), 24 VDC
                I/O, and communications/analogue signals. Lid-off ducts are preferred over solid
                ducts for ease of routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal management</strong> — calculate the total heat dissipation of all
                components (from data sheets). If the panel ambient temperature would exceed 35°C at
                maximum ambient, specify a panel air conditioner or heat exchanger. PLC
                manufacturers specify maximum ambient temperature for each CPU and I/O module.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating</strong> — minimum IP54 for dusty industrial environments, IP65
                for washdown areas. The panel door gasket and cable entry glands must maintain the
                rated IP. Use IP-rated cable glands (to BS EN 62444) for all cable entries.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply and Distribution',
    content: (
      <>
        <p>
          PLC systems require at least two voltage levels: mains voltage (240 V AC single phase or
          400 V AC three phase) for power to the panel and for output loads, and 24 VDC for the PLC
          itself, I/O modules, and field devices. The 24 VDC power supply must be a DIN-rail-mounted
          switched-mode unit rated for the total 24 VDC current consumption plus a minimum 25%
          margin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains incoming supply</strong> — main isolator (rotary cam switch or moulded
                case circuit breaker with lockable handle) at the top of the panel provides safe
                isolation. Individual MCBs protect each mains voltage circuit (motor supplies,
                heaters, lighting, 240 V socket for laptop).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>24 VDC distribution</strong> — use a 24 VDC busbar or terminal block
                distribution for positive (+24 V) and 0 V rails. Add individual miniature fuses (1 A
                or 2 A) per I/O group or field circuit segment to limit fault current and aid fault
                location. Electronic fuses (eFuse modules) provide resettable protection and fault
                indication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS for critical systems</strong> — where a mains failure must not cause a
                dangerous process state, fit a 24 VDC UPS module (capacitor-based for a few seconds,
                battery-based for minutes) to maintain PLC power during transition. The UPS also
                protects against mains voltage dips that could cause the PLC to reset.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power supply redundancy</strong> — for high-availability systems, use two 24
                VDC power supplies with a diode OR module (prevents back-feed between PSUs) feeding
                the same busbar. If one PSU fails, the other maintains the load without interruption
                and a fault alarm is generated.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-inputs',
    heading: 'Wiring Digital Inputs (24 VDC)',
    content: (
      <>
        <p>
          Digital inputs connect field devices (pushbuttons, limit switches, proximity sensors,
          photoelectric sensors, pressure switches, flow switches) to the PLC. Each digital input
          module has a defined input voltage range (typically 15–30 VDC), input current (typically
          4–8 mA), and input impedance. The field device must be capable of sinking or sourcing the
          required input current reliably.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PNP (sourcing) wiring</strong> — most common in UK/European systems. The 24
                V positive rail is switched to the PLC input terminal by the field device or sensor.
                The 0 V common is connected to the PLC input common terminal. PNP proximity sensors
                and pushbuttons with normally open contacts are wired this way.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Input addressing</strong> — clearly mark every input terminal on the
                terminal strip with the PLC address (e.g., I0.0, %IX0.0, X000) matching the I/O
                schedule. Use engraved or printed terminal markers, not handwritten labels. The
                field cable core must be identified at both ends with the same address reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable length and voltage drop</strong> — long cable runs increase voltage
                drop and may cause input under-voltage. For runs over 100 m, use 1.5 mm² cores and
                check that 24 VDC minus the cable volt drop (at input current) remains above the
                input ON threshold. Use 4–20 mA analogue signals rather than digital 24 VDC for very
                long runs where possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety inputs</strong> — E-stop buttons, light curtains, and safety gate
                switches connected to safety PLC inputs (or safety relay modules) must be wired with
                redundant channels and cable monitoring (OSSD outputs from safety devices). Follow
                the specific safety device wiring instructions and functional safety requirements
                (BS EN ISO 13849, BS EN 62061).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-outputs',
    heading: 'Wiring Outputs: Relay, Transistor, and Triac',
    content: (
      <>
        <p>
          PLC output modules switch field loads (contactors, solenoid valves, indicator lamps,
          heaters, alarms). The correct output type depends on the load voltage, switching speed,
          and required isolation. Output wiring is more complex than input wiring because outputs
          drive loads that can generate transients, particularly inductive loads.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relay outputs</strong> — volt-free contacts rated typically 2 A at 240 VAC
                or 24 VDC. Fit a suppression diode (1N4004 or equivalent) across DC inductive loads
                (solenoid valves, relay coils) to clamp the back-EMF on de-energisation. For AC
                loads, fit an RC snubber (typically 0.1 µF + 100 Ω) across the load. Relay outputs
                have finite contact life (10–30 million operations) — check against the cycle rate
                requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transistor outputs (24 VDC)</strong> — PNP transistor outputs switch +24 V
                to the load, current returns through 0 V common. Rated typically 0.5–2 A per
                channel. Used for servo drive enable signals, high-speed pulse outputs, and 24 VDC
                loads with high cycle rates. Always fit a free-wheel diode across inductive 24 VDC
                loads (the output module may have internal protection, but external diodes provide
                extra safety margin).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Triac outputs (AC)</strong> — semiconductor AC switches rated typically
                0.5–1 A at 240 VAC. No contact wear. Suited to AC solenoid valves and AC motor
                starters in high cycle rate applications. Triacs have a small leakage current when
                OFF (typically 1–5 mA) which can maintain coil voltage in sensitive applications —
                fit a bleed resistor across the load if required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Output fusing</strong> — protect each output or output group with a fuse or
                electronic fuse sized to the output module's maximum current rating. A shorted load
                without fusing can destroy the entire output module. Use individual fuses per output
                channel for critical or complex systems, common group fuses for simple applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-noise',
    heading: 'Earthing for Noise Immunity',
    content: (
      <>
        <p>
          Poor earthing is the most common cause of intermittent PLC faults in industrial
          installations. Electromagnetic interference (EMI) from VFDs, contactors, and power cables
          couples into signal wiring and analogue inputs, causing spurious inputs, corrupted
          communications, and programme faults. Correct earthing eliminates or greatly reduces these
          problems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-point earth bar</strong> — use a single copper earth bar (star point)
                in the panel connected to the installation earth via a low-impedance conductor
                (minimum 16 mm²). All panel component earths, cable screen terminations, and the DIN
                rail earth connection radiate from this single point to prevent earth current loops
                between devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable screen termination</strong> — terminate screened cable screens at the
                panel using EMC cable glands that provide 360° screen bonding (not pigtail
                connections, which have high inductance at RF frequencies). The screen must be
                bonded at the panel end; leave floating at the field device end unless the field
                device is part of the same earth reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>VFD earthing</strong> — VFD motor cables must use screened cable (SY or SWA
                with separate screen) with the screen bonded at both the VFD and the motor terminal
                box using EMC glands. The VFD chassis must be bonded to the panel earth bar. Failure
                to do this causes high-frequency common-mode currents that corrupt all analogue and
                communications wiring in the panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate analogue earth</strong> — in systems with mixed digital I/O and
                analogue signals, consider using a separate analogue earth bar connected to the main
                earth at a single point. This prevents digital switching noise on the common earth
                reference from affecting analogue measurements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-segregation',
    heading: 'Cable Segregation (Power vs Signal vs Communications)',
    content: (
      <>
        <p>
          Cable segregation is a fundamental requirement for reliable PLC operation. The objective
          is to prevent electromagnetic coupling between high-power conductors (which carry large,
          rapidly-changing currents) and low-level signal conductors (which carry small currents or
          voltages). BS EN 61000-5-2 provides guidance on cable segregation for EMC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 1 — Power cables</strong> — mains voltage (230/400 V AC) cables to
                motors, heaters, transformers, and main distribution. Run in steel cable tray or
                conduit. Maintain minimum 300 mm separation from Category 3 cables (or separate by a
                grounded metallic barrier where separation is not possible).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 2 — 24 VDC I/O cables</strong> — digital input and output cables.
                Can share a tray with other 24 VDC wiring. Maintain at least 150 mm from Category 1
                power cables. Use screened cable for runs over 30 m or in areas of high electrical
                noise (near VFDs or large contactors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 3 — Analogue and communications cables</strong> — 4–20 mA, 0–10 V,
                thermocouple, RTD, Profibus, Modbus RTU, and Ethernet cables. Always use
                individually screened twisted pair. Maintain minimum 300 mm from Category 1 cables
                or separate by a grounded metallic partition. Never bundle analogue and power cables
                together, even for short runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VFD motor cables</strong> — treat VFD output cables (PWM waveform) as the
                highest noise category. Run in separate steel conduit or armoured cable separate
                from all other cables. Never run VFD motor cables parallel to signal cables in the
                same tray.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Requirements for PLC Installations',
    content: (
      <>
        <p>
          A PLC installation without comprehensive documentation is a liability — for the installer,
          the client, and anyone who must maintain or modify the system in the future. BS EN 61082
          governs the preparation of documents used in electrical work, and IEC 81346 provides rules
          for reference designation systems. In practice, the minimum documentation set for a PLC
          installation comprises the following.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel general arrangement (GA) drawing</strong> — plan view showing
                component positions, door cut-outs (HMI, operator panel), cable entry areas, and
                dimensional information. Used for fabrication and future reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit diagrams (schematic diagrams)</strong> — power schematic (showing
                all mains voltage circuits) and control schematic (24 VDC and I/O circuits), drawn
                to BS EN 61082. All components referenced by unique tag numbers matching the panel
                component labelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>I/O schedule</strong> — spreadsheet or table listing every I/O point: PLC
                address, tag name, description, signal type (DI/DO/AI/AO), field device tag, cable
                number, terminal number, and notes (e.g., "normally closed in safe state"). The I/O
                schedule is the master reference for commissioning and fault-finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Program backup and documentation</strong> — PLC program saved in
                manufacturer format (e.g., .zap15 for Siemens TIA Portal, .ACD for Allen-Bradley
                Studio 5000). Provide a PDF/printout of the program with comments on all rungs and
                function blocks. Record firmware versions for all PLC components.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'Testing and Commissioning',
    content: (
      <>
        <p>
          PLC system commissioning is a structured process that verifies the electrical installation
          before power is applied, then systematically confirms that every I/O point functions
          correctly. A Factory Acceptance Test (FAT) is carried out at the panel builder's workshop,
          and a Site Acceptance Test (SAT) is carried out after installation at the client's
          premises.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-power checks</strong> — insulation resistance test on all field cables
                (to BS 7671, minimum 1 MΩ at 500 VDC), continuity of all earth conductors,
                verification of fuse ratings, and visual inspection of all terminations. Disconnect
                PLC modules and sensitive electronics before insulation resistance testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>I/O loop check</strong> — with the PLC program loaded and powered,
                systematically operate each field device (or apply a test signal at the terminal
                strip) and verify the correct PLC input address illuminates. For each output, force
                the output ON in the PLC diagnostic display and verify the field device operates.
                Record all results in the commissioning test sheet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional test</strong> — run through all control sequences defined in the
                functional design specification. Test all normal operating modes, interlocks,
                alarms, and safety functions. Test the E-stop circuit and confirm safe state is
                achieved within the required time. Document any non-conformances and their
                resolution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety function testing</strong> — all safety functions (E-stop, safety
                guard interlock, two-hand control) must be tested in accordance with the applicable
                functional safety standard (BS EN ISO 13849 or BS EN 62061) and the results
                recorded. This is a legal requirement under the Machinery Directive and the UK
                equivalent post-Brexit (UK MD S.I. 2008/1597).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: PLC Installation Work',
    content: (
      <>
        <p>
          PLC installation work is one of the higher-value specialisms available to UK industrial
          electricians. Combining electrical installation skills with PLC knowledge and
          commissioning experience commands significantly higher day rates than standard
          installation work. An Electrical Installation Certificate is required for all fixed
          installation work associated with a PLC panel.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate on your phone after
                  commissioning the PLC panel. Record insulation resistance results, circuit
                  details, and test engineer information — then export a professional PDF before you
                  leave site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate PLC installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, commissioning test records, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PLCElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="PLC Electrical Installation UK | Programmable Logic Controller Wiring"
      description="Complete guide to PLC electrical installation in the UK. Panel design, 24 VDC input wiring, relay and transistor outputs, earthing for noise immunity, cable segregation, documentation requirements, and BS 7671 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Cpu}
      heroTitle={
        <>
          PLC Electrical Installation UK:{' '}
          <span className="text-yellow-400">Wiring, Earthing &amp; Documentation</span>
        </>
      }
      heroSubtitle="Comprehensive guide to PLC panel design and electrical installation — 24 VDC input wiring, relay and transistor outputs, earthing for noise immunity, cable segregation between power and signal cables, and documentation requirements for BS 7671 compliance."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About PLC Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Industrial EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site electrical installation certification, test result recording, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
