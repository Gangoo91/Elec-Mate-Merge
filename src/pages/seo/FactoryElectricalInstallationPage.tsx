import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  Settings,
  FileCheck2,
  Activity,
  ClipboardCheck,
  PoundSterling,
  Layers,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Electrical', href: '/industrial-electrical-installation' },
  { label: 'Factory Electrical Installation', href: '/factory-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'three-phase-supplies', label: 'Three-Phase Supplies' },
  { id: 'motor-control-centres', label: 'Motor Control Centres' },
  { id: 'power-factor-correction', label: 'Power Factor Correction' },
  { id: 'protection-devices', label: 'HRC Fuses & Circuit Breakers' },
  { id: 'ip-ratings', label: 'IP Ratings for Industrial Environments' },
  { id: 'atex-zones', label: 'ATEX Zone Classification' },
  { id: 'cable-management', label: 'Cable Management' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Factory electrical installations in the UK must comply with BS 7671:2018+A3:2024, the Electricity at Work Regulations 1989, and where applicable, the Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) for ATEX hazardous area classification.',
  'Three-phase 400V TN-S or TN-C-S supplies are standard for factory installations. Large motor loads may require a dedicated high-fault-level supply with appropriate switchgear rated for the available prospective short-circuit current.',
  'Motor control centres (MCCs) consolidate motor starters, variable frequency drives, protective relays, and power factor correction equipment into a structured, maintainable enclosure. MCCs in factories are designed and built to BS EN 61439.',
  'HRC (High Rupturing Capacity) fuses to BS 88 are specified in factory environments where high fault levels demand fast, reliable protection that current limiting MCBs may not provide.',
  'The Electricity at Work Regulations 1989 require all persons working on or near factory electrical systems to be competent for the work they carry out. Regulation 4(3) specifically requires live working to be prevented where possible.',
];

const faqs = [
  {
    question: 'What electrical standards apply to factory installations in the UK?',
    answer:
      'Factory electrical installations must comply with BS 7671:2018+A3:2024 (the IET Wiring Regulations) as the primary electrical installation standard, and the Electricity at Work Regulations 1989 as the primary statutory instrument. Where hazardous areas exist, DSEAR 2002 (implementing the ATEX Directive) applies to zone classification and the selection of equipment for use in those zones. The Health and Safety at Work etc. Act 1974 also places general duties on employers for the safe management of electrical systems. For specific types of factory equipment, additional product standards such as BS EN 60204-1 (Safety of Machinery — Electrical Equipment of Machines) apply.',
  },
  {
    question: 'What is a Motor Control Centre (MCC) and when is one required?',
    answer:
      'A Motor Control Centre (MCC) is a factory-assembled switchboard containing motor starters, variable frequency drives (VFDs), protective devices, and control equipment for a group of electric motors or other electrical loads. MCCs are used in factories where multiple motors are controlled from a centralised location, such as pump stations, HVAC plant rooms, conveyor systems, and process lines. They are built to BS EN 61439-2 (Low-voltage switchgear and controlgear assemblies) and factory-tested before delivery. MCCs provide a safer, more maintainable arrangement than individually mounted starters and allow motor data to be integrated into SCADA and BMS systems.',
  },
  {
    question: 'What is power factor correction and why is it important in factories?',
    answer:
      'Power factor is the ratio of active power (kW, which does useful work) to apparent power (kVA, drawn from the supply). Motor-heavy factory installations typically have a power factor of 0.7 to 0.85 lagging due to the inductive nature of motor windings. A low power factor means the utility supply must deliver more current than strictly necessary to provide the required active power, resulting in higher cable losses, larger cable and switchgear sizes, and utility reactive power charges. Power factor correction is achieved by installing capacitor banks (fixed or automatically switched) to supply reactive power locally, improving the power factor at the point of metering to typically 0.95 or above and eliminating reactive power charges.',
  },
  {
    question: 'What IP rating is required for electrical equipment in factories?',
    answer:
      'The Ingress Protection (IP) rating required for factory electrical equipment depends on the specific environment. BS EN 60529 defines the IP rating system. For general factory floors with dust and splashing water, IP54 is commonly specified for enclosures and motors. Wet areas such as food processing or wash-down areas require IP65 or IP66 (dust-tight, strong jet water protection). Submerged pump applications require IP68. Outdoor equipment typically requires IP55 as a minimum. Within the factory office or control room, IP20 or IP21 may be adequate. The IP rating must be selected to match the actual environmental conditions at each specific location.',
  },
  {
    question: 'What are ATEX zones and how do they affect electrical installation in factories?',
    answer:
      'ATEX zone classification under DSEAR 2002 identifies areas of a factory where flammable gases, vapours, mists, or dusts may be present in sufficient quantities to present an explosion risk. Zone 0 (or Zone 20 for dust) is where an explosive atmosphere is present continuously or for long periods. Zone 1 (Zone 21) is where it is likely to occur in normal operation. Zone 2 (Zone 22) is where it is not likely to occur in normal operation but may occur occasionally. All electrical equipment installed in an ATEX zone must be selected and installed in accordance with BS EN 60079 (for gases) or BS EN 60079-10-2 (for dusts), must carry the Ex marking, and must be appropriate for the specific zone category and gas/dust group.',
  },
  {
    question: 'How are HRC fuses different from standard MCBs in factory applications?',
    answer:
      'High Rupturing Capacity (HRC) fuses to BS 88 are current-limiting devices that can interrupt extremely high fault currents (up to 80 kA or more) very rapidly, typically within one half-cycle. In a factory with a large transformer and short cable runs to the distribution board, the prospective short-circuit current can be very high — potentially exceeding the rated breaking capacity of standard miniature circuit breakers (MCBs). HRC fuses provide reliable protection at these high fault levels without the risk of rupture or damage to the switchboard. They also provide time-current characteristics (particularly in the HRC type gG and aM categories) well suited to motor starting, where the initial inrush current is 6 to 8 times the full-load current.',
  },
  {
    question: 'What cable management systems are typical in UK factory electrical installations?',
    answer:
      'Factory cable management typically uses a combination of: cable trays (perforated or ladder type) in ceiling voids and along structural steelwork for power distribution cables; cable trunking for control and instrumentation cables in plant rooms and along walls; conduit (steel or PVC) for final connections to individual machines, luminaires, and sockets where mechanical protection is required; and mineral-insulated copper-clad (MICC) or fire-resistant cables for essential circuits and circuits in high-temperature environments. Cable routes should be designed to maintain segregation between power and data/control cables (minimum 300mm separation without screening) to prevent electromagnetic interference.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/warehouse-electrical-installation',
    title: 'Warehouse Electrical Installation',
    description: 'HV LED lighting, three-phase distribution, EV charging, and energy management.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/manufacturing-plant-electrical',
    title: 'Manufacturing Plant Electrical',
    description: 'Motor starters, VFDs, PLC integration, emergency stop systems, and power quality.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/data-centre-electrical-installation',
    title: 'Data Centre Electrical Installation',
    description: 'UPS systems, N+1 redundancy, TN-S earthing, and critical power for data centres.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote factory and industrial electrical projects with instant PDF proposals.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Factory Electrical Installation in the UK',
    content: (
      <>
        <p>
          Factory electrical installation encompasses the design, installation, and maintenance of
          electrical systems in manufacturing, processing, and industrial production facilities.
          The complexity of factory installations ranges from light engineering workshops with
          single-phase supplies to heavy process plants requiring high-voltage distribution,
          large motor drives, and sophisticated control systems.
        </p>
        <p>
          Factory installations present unique challenges that are not found in commercial or
          domestic work: high fault currents from large transformers, significant motor loads with
          inrush current demands, harsh environmental conditions requiring appropriate IP protection,
          potential ATEX hazardous areas, and 24/7 operational requirements that constrain
          maintenance windows. The Electricity at Work Regulations 1989 impose strict duties on
          factory occupiers to maintain safe electrical systems.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key standards:</strong> BS 7671:2018+A3:2024, Electricity at Work Regulations
                1989, DSEAR 2002 (ATEX), BS EN 61439 (switchgear assemblies), BS EN 60204-1 (machine
                electrical equipment), BS EN 60529 (IP ratings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competence requirement:</strong> The Electricity at Work Regulations 1989
                Regulation 16 requires that no person shall engage in work on electrical systems
                unless they are competent to prevent danger or injury from the work. Industrial
                electrical installation is a high-risk activity requiring appropriate qualifications
                and experience.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase-supplies',
    heading: 'Three-Phase Supplies in Factory Installations',
    content: (
      <>
        <p>
          The majority of factory electrical power is distributed as three-phase 400V AC.
          Three-phase supplies are required for most industrial motor loads and are more efficient
          than single-phase for high-power applications, using less conductor material for the
          same power transfer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV/LV transformers:</strong> Most factories receive an 11kV (or 33kV) HV
                supply from the utility network, transformed to 400V LV by a dedicated on-site
                transformer. Common transformer ratings for factory use range from 315 kVA to 2,500
                kVA. The transformer impedance and rating determine the available prospective
                short-circuit current at the LV terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S earthing:</strong> Factory installations commonly use TN-S earthing
                with a separate PE conductor throughout. This minimises earth fault loop impedance,
                allowing fast disconnection by overcurrent protective devices, and keeps the
                neutral conductor free from earth fault current. Where TN-C-S supply is used,
                the PME earth should be segregated from sensitive control and instrumentation
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase balance:</strong> Single-phase loads (lighting, small power) in
                factories must be distributed evenly across all three phases to maintain balance.
                A phase imbalance exceeding 5 per cent at the main switchboard causes overheating
                of three-phase motor windings, increased neutral current, and transformer
                inefficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop:</strong> Cable sizing for factory circuits must ensure
                voltage drop stays within the limits of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Appendix 12
                </SEOInternalLink>
                . For motor circuits, excessive voltage drop can prevent the motor starting under
                load and cause overheating. A maximum voltage drop of 5 per cent from the origin
                to the point of use is a typical design requirement for industrial motor circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'motor-control-centres',
    heading: 'Motor Control Centres (MCCs)',
    content: (
      <>
        <p>
          A Motor Control Centre is a factory-assembled, type-tested switchboard that provides a
          centralised and structured approach to controlling and protecting groups of electric motors.
          MCCs are the standard solution in factories with more than a handful of motor loads.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct on-line (DOL) starters:</strong> The simplest motor starter.
                Connects the motor directly to the full supply voltage on starting. Suitable for
                small motors (typically up to 7.5 kW) where the starting current surge (typically
                6 to 8 times full-load current) is acceptable to the supply system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-delta starters:</strong> A traditional reduced-voltage starting method
                for motors above 7.5 kW. The motor starts connected in star (reducing starting
                current to approximately one-third of DOL) and transfers to delta when it approaches
                full speed. Requires a three-winding motor with six terminal connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable Frequency Drives (VFDs):</strong> Modern factories increasingly
                use VFDs (also called inverters or variable speed drives) for all but the simplest
                motor applications. VFDs provide smooth soft starting, precise speed control,
                significant energy savings at partial loads (fans and pumps can save 50 per cent
                or more), and reduced mechanical stress on driven equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor protection:</strong> Each motor feeder within the MCC should include
                overload protection (electronic overload relay or thermal overload relay), short-
                circuit protection (HRC fuse or MCCB), phase failure protection, thermistor relay
                for motor winding temperature, and earth fault protection appropriate to the
                installation earthing system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-factor-correction',
    heading: 'Power Factor Correction in Factory Installations',
    content: (
      <>
        <p>
          Power factor correction (PFC) is one of the most cost-effective electrical improvements
          a factory can make. UK utility tariffs for industrial customers typically include a
          reactive power charge (sometimes expressed as a maximum demand charge or kVAr charge)
          when the power factor falls below 0.95 lagging.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed capacitor banks:</strong> For loads that are relatively constant
                (base-load motors, transformers), fixed capacitor banks are connected permanently
                to the busbar. They provide a fixed reactive power injection and are the simplest
                and most reliable PFC option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic PFC panels:</strong> For factories with variable loads, automatic
                power factor correction (APFC) panels switch capacitor stages in and out as the
                load varies, maintaining the power factor within a target band (typically 0.95 to
                0.99). A power factor controller monitors the busbar and operates contactors on
                individual capacitor banks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonic detuned filters:</strong> Factories with large VFD installations
                generate significant harmonic currents (5th, 7th, 11th harmonics). Plain capacitor
                banks can resonate with these harmonics, causing overheating and failure. Harmonic-
                detuned PFC uses reactors in series with each capacitor bank tuned to avoid
                resonance, typically at 189 Hz (detuning factor p = 7%).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'protection-devices',
    heading: 'HRC Fuses and Circuit Breakers for Factory Installations',
    content: (
      <>
        <p>
          Protection device selection in factories must account for the potentially very high
          prospective short-circuit currents (PSCCs) available from large transformers, the high
          starting currents of motors, and the need for reliable discrimination between devices
          at different levels of the distribution hierarchy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 88 HRC fuses:</strong> High Rupturing Capacity fuses to BS 88 are
                current-limiting devices capable of safely interrupting fault currents up to
                80 kA. The gG (general purpose) type protects cables and equipment against
                overload and short-circuit. The aM (motor) type provides short-circuit protection
                only, designed to withstand motor starting surges without operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moulded Case Circuit Breakers (MCCBs):</strong> MCCBs provide adjustable
                overcurrent protection and are resettable after operation. Industrial MCCBs are
                rated from 100A to 1,600A with breaking capacities of 25 kA to 150 kA. Electronic
                trip units allow separate adjustment of overload (Ir), short-time delay (Isd),
                and instantaneous (Ii) settings for precise discrimination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discrimination (selectivity):</strong> A fundamental requirement of factory
                distribution design is that a fault on any final circuit causes only the nearest
                upstream device to operate, leaving the rest of the distribution system energised.
                Discrimination must be verified by time-current characteristic overlays or
                manufacturer discrimination tables during the design stage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Industrial Environments',
    content: (
      <>
        <p>
          The Ingress Protection (IP) rating system defined in BS EN 60529 specifies the degree of
          protection provided by electrical enclosures against solid particles (first digit) and
          liquids (second digit). Selecting the correct IP rating for each location in a factory
          is essential for equipment longevity and safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 — General factory:</strong> Protection against solid objects greater
                than 1mm and splashing water from any direction. Suitable for general factory floor
                areas with light dust and occasional water splashing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP54 / IP55 — Dusty or wet areas:</strong> IP54 provides dust protection
                (ingress not completely prevented but not enough to interfere with operation) and
                water jet protection. IP55 adds protection against low-pressure jets of water from
                any direction. Suitable for most factory floor environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65 / IP66 — Food & beverage / wash-down:</strong> IP65 is dust-tight
                and protects against low-pressure water jets. IP66 adds protection against powerful
                water jets. Required in food processing, pharmaceuticals, and any area subject to
                regular high-pressure wash-down with cleaning chemicals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IK ratings:</strong> In addition to IP ratings, industrial enclosures in
                areas subject to mechanical impact (e.g. forklift traffic, vibration) should be
                specified with an IK impact protection rating to BS EN 62262. IK08 (5 joule impact
                resistance) is a common minimum for factory environments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'atex-zones',
    heading: 'ATEX Zone Classification in Factories',
    content: (
      <>
        <p>
          Factories that handle flammable gases, vapours, liquids, or combustible dusts must
          carry out an explosion risk assessment and zone classification under the Dangerous
          Substances and Explosive Atmospheres Regulations 2002 (DSEAR). All electrical equipment
          installed in classified zones must be selected and installed in accordance with
          BS EN 60079 series.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas and vapour zones:</strong> Zone 0 (continuous presence), Zone 1
                (likely in normal operation), Zone 2 (unlikely in normal operation). Common in
                paint spraying areas, fuel storage, solvent handling, and chemical processing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dust zones:</strong> Zone 20 (continuous), Zone 21 (likely in normal
                operation), Zone 22 (unlikely but possible). Common in grain handling, woodworking,
                plastics processing, and metal powder manufacturing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment selection:</strong> Ex-rated equipment must carry the Ex marking
                and be appropriate for the equipment category (1G, 2G, or 3G for gas; 1D, 2D, or
                3D for dust) and gas group. Common protection concepts include flameproof enclosure
                (Ex d), increased safety (Ex e), intrinsic safety (Ex i), and pressurised
                enclosure (Ex p).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer competence:</strong> Installation, inspection, and maintenance
                of Ex-rated equipment requires specific competence. The CompEx scheme (Competency
                for Ex) provides the recognised UK qualification framework for hazardous area
                workers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Management in Factory Installations',
    content: (
      <>
        <p>
          Effective cable management in a factory is essential for safety, maintainability, and
          future flexibility. Factory environments expose cables to mechanical damage, chemical
          attack, thermal stress, and electromagnetic interference, all of which must be considered
          in the cable management design.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable trays and ladders:</strong> Perforated cable tray or cable ladder is
                used for main distribution routes along structural steelwork. Cable ladder provides
                better support for heavy armoured cables. Tray fill should not exceed 40 per cent
                of the tray cross-section area to allow for heat dissipation and future additions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel conduit:</strong> Steel conduit provides mechanical protection for
                cables in areas where impact or abrasion is likely, or where chemical exposure
                requires a robust enclosure. Hot-dip galvanised or stainless steel conduit is
                used in corrosive environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Segregation:</strong> Power cables (especially VFD output cables) generate
                high-frequency electromagnetic interference. A minimum separation of 300mm must
                be maintained between power and data/control cables, or segregation screens must
                be installed. VFD output cables should use screened cable with the screen earthed
                at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection:</strong> Armoured cables (SWA — Steel Wire Armoured) are
                standard for factory power distribution. The armour provides mechanical protection
                and can serve as the circuit protective conductor if suitably sized. XLPE insulation
                is specified for environments with elevated temperatures or where chemical resistance
                is required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Factory and Industrial Electrical Work',
    content: (
      <>
        <p>
          Factory and industrial electrical work is one of the most technically rewarding and well-
          remunerated specialisms in the UK electrical industry. The combination of complex systems,
          tight operational constraints, and high safety standards means that experienced industrial
          electricians are consistently in high demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Safe Isolation is Non-Negotiable</h4>
                <p className="text-white text-sm leading-relaxed">
                  The Electricity at Work Regulations 1989 Regulation 13 requires that all electrical
                  equipment shall be made dead before any work is carried out, unless it is
                  unreasonable to do so. In factories this means following a formal safe isolation
                  procedure: identify, isolate, secure, test, and earth. Never assume a circuit is
                  dead without testing with an approved voltage indicator.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification and Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  All new factory electrical work must be certified with an Electrical Installation
                  Certificate or Minor Works Certificate. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete all certificates and test schedules on site with instant PDF delivery
                  to the factory maintenance team.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage factory electrical projects with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site certification, quoting, and project management. Complete EICs and EICRs on your phone with instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FactoryElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Factory Electrical Installation UK | Industrial Wiring Guide"
      description="Complete guide to factory electrical installation in the UK. Three-phase supplies, motor control centres, power factor correction, HRC fuses, IP ratings, ATEX zone classification, cable management, and Electricity at Work Regulations 1989."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Electrical Guide"
      badgeIcon={Settings}
      heroTitle={
        <>
          Factory Electrical Installation UK:{' '}
          <span className="text-yellow-400">Industrial Wiring Guide</span>
        </>
      }
      heroSubtitle="The complete technical guide to factory electrical installation in the UK — covering three-phase supplies, motor control centres, power factor correction, HRC fuses, IP ratings for industrial environments, ATEX zone classification, and cable management."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Factory Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Factory Electrical Projects with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site certification, quoting, and project management in industrial environments. 7-day free trial, cancel anytime."
    />
  );
}
