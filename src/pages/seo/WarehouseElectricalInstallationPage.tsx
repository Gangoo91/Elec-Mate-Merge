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
  Car,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Electrical', href: '/industrial-electrical-installation' },
  { label: 'Warehouse Electrical Installation', href: '/warehouse-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'hv-led-lighting', label: 'High-Bay LED Lighting Design' },
  { id: 'three-phase-distribution', label: 'Three-Phase Distribution' },
  { id: 'ev-charging', label: 'EV Charging Infrastructure' },
  { id: 'energy-management', label: 'Energy Management & Metering' },
  { id: 'fire-detection', label: 'Fire Detection Integration' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'earthing-bonding', label: 'Earthing & Bonding' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Warehouse LED high-bay lighting design must achieve the required maintained average illuminance (typically 200 to 300 lux at floor level for general storage, 500 lux for picking aisles) in accordance with the CIBSE Lighting Guide LG1 for industrial premises.',
  'Three-phase 400V distribution is standard for warehouse installations. Sub-main circuits to distribution boards within the warehouse should be sized for the connected load plus 25 per cent spare capacity for future tenant fit-out.',
  'EV charging infrastructure for warehouses with large vehicle fleets must include load management systems to prevent demand charges from overloading the incoming supply. BS 7671 Section 722 and the Electric Vehicles (Smart Charge Points) Regulations 2021 apply.',
  'Fire detection systems in warehouses are closely integrated with the electrical installation — fire alarm wiring must use fire-resistant cable (Regulation 521.10 of BS 7671) and the system must comply with BS 5839-1 for design, installation, commissioning, and maintenance.',
  'The Electricity at Work Regulations 1989 apply to all warehouse electrical systems. Warehouse operators must maintain all electrical equipment in a safe condition and ensure competent persons carry out all electrical work.',
];

const faqs = [
  {
    question: 'What illuminance level is required for warehouse lighting in the UK?',
    answer:
      'The CIBSE Lighting Guide LG1 (Industrial Lighting) and the HSE guidance on lighting at work both provide recommendations for warehouse illuminance levels. General storage areas require a maintained average illuminance of 100 to 200 lux at floor level. Active picking and order assembly areas require 300 to 500 lux. Offices within warehouse buildings require 500 lux at desk level. The Workplace (Health, Safety and Welfare) Regulations 1992 require sufficient lighting for the tasks carried out. LED high-bay luminaires with appropriate optics can achieve these levels efficiently, and a dialux or similar photometric design should be carried out before specifying the lighting installation.',
  },
  {
    question: 'What three-phase supply size is typically required for a warehouse?',
    answer:
      'The supply size depends on the warehouse size, occupancy, and intended use. A typical 5,000 m² logistics warehouse with LED lighting, office facilities, dock levellers, and a modest EV charging provision might require a 630 kVA or 800 kVA transformer. A large fulfilment centre with extensive conveyor systems, refrigeration, and significant EV charging might require 2 MVA or more. A load schedule must be prepared at the design stage, accounting for connected loads, diversity factors, and future growth. The electricity distributor (DNO) must be notified of the intended demand to confirm the available supply capacity.',
  },
  {
    question: 'What electrical regulations apply to EV charging in warehouses?',
    answer:
      'EV charging installations in warehouses must comply with: BS 7671:2018+A3:2024 Section 722 (Supplies for Electric Vehicles); the Electric Vehicles (Smart Charge Points) Regulations 2021 (which require smart charge point functionality for new private charge points); and PAS 1899:2022 (the British Standard for electric vehicle smart charging). Where the EV charging demand is significant (more than 50 kW total), a dynamic load management system is strongly recommended to prevent simultaneous charging from overloading the incoming supply. All EV charge points must be protected by a 30mA Type B RCD (or Type A where the charge point manufacturer confirms no DC residual current above 6mA will flow).',
  },
  {
    question: 'How should fire detection cables be installed in a warehouse electrical installation?',
    answer:
      'Fire detection cabling in warehouses must use fire-resistant cable in accordance with Regulation 521.10 of BS 7671 and the requirements of BS 5839-1. The cable must maintain circuit integrity in fire conditions for a period appropriate to the evacuation requirements of the building — typically 30 or 60 minutes. Enhanced fire-resistant cables (such as Pyrotenax MICC or equivalent) are used where longer survival times are required. Fire alarm cables must be segregated from general wiring. Cables must not pass through fire compartment walls without appropriate fire stopping to maintain the fire compartmentation of the building.',
  },
  {
    question: 'What is the minimum emergency lighting requirement for a warehouse?',
    answer:
      'Emergency lighting in warehouses must comply with BS 5266-1 (Emergency Lighting) and Regulation 560.7 of BS 7671. Escape route lighting must provide a minimum horizontal illuminance of 1 lux at floor level along the centreline of the escape route, with a minimum uniformity ratio of 1:40. Anti-panic lighting in open areas must provide a minimum of 0.5 lux at floor level. The duration of emergency lighting must be a minimum of 1 hour for escape routes and 3 hours for high-risk task areas. In large warehouses, the route to exits can be long and complex, requiring careful emergency luminaire placement to ensure all escape routes are adequately lit.',
  },
  {
    question: 'What energy metering is required for UK warehouses?',
    answer:
      'All new commercial buildings over 1,000 m² in the UK are required to install sub-metering in accordance with Part L of the Building Regulations. For warehouses, this typically means separate metering for: lighting, HVAC (heating, ventilation, and air conditioning), small power (sockets and equipment), and any significant process loads. EV charging should be sub-metered separately to allow occupiers to monitor and manage EV energy costs. The Energy Savings Opportunity Scheme (ESOS) requires organisations employing more than 250 people or with a turnover above €50 million to carry out a detailed energy audit every four years. Sub-metering data is essential for completing an ESOS audit.',
  },
  {
    question: 'How is earthing and bonding carried out in a warehouse?',
    answer:
      'Warehouse earthing follows the requirements of BS 7671 Chapter 54. The main earthing terminal (MET) is located at the main distribution board, connected to the earth electrode system and (where a PME supply is used) to the incoming neutral. Main protective bonding conductors connect the MET to all metallic services entering the building (gas pipes, water pipes, structural steelwork). Within the warehouse, supplementary bonding may be required in wet areas. Tall metal racking systems and conveyor steel structures should be connected to the earthing system to prevent dangerous static electricity accumulation, particularly in dry environments handling plastic packaging or granular materials.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/factory-electrical-installation',
    title: 'Factory Electrical Installation',
    description: 'Three-phase supplies, motor control centres, HRC fuses, and ATEX zones.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/manufacturing-plant-electrical',
    title: 'Manufacturing Plant Electrical',
    description: 'Motor starters, VFDs, PLC integration, and emergency stop systems.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/office-electrical-fit-out',
    title: 'Office Electrical Fit Out',
    description: 'Power distribution, data points, lighting design, and emergency lighting.',
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
    description: 'Quote warehouse and industrial electrical projects with instant PDF proposals.',
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
    heading: 'Warehouse Electrical Installation in the UK',
    content: (
      <>
        <p>
          Warehouse and logistics facility electrical installation is a major and growing specialism
          for UK electrical contractors. The rapid expansion of e-commerce, supply chain
          infrastructure, and cold-chain logistics has driven significant demand for new-build and
          refurbishment electrical work in warehousing and distribution centres.
        </p>
        <p>
          Modern warehouses are far more electrically complex than their predecessors. High-bay LED
          lighting with smart controls, large-scale EV charging infrastructure for delivery fleets,
          solar PV installations, battery energy storage, sophisticated conveyor and automation
          systems, and advanced fire detection all create substantial electrical design and
          installation requirements. Electricians and contractors specialising in warehouse work
          must be familiar with all of these systems and with the regulatory frameworks that govern
          them.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key regulations:</strong> BS 7671:2018+A3:2024, Electricity at Work
                Regulations 1989, Building Regulations Part L (energy efficiency), Part B (fire
                safety), BS 5839-1 (fire detection and alarm systems), BS 5266-1 (emergency
                lighting), Electric Vehicles (Smart Charge Points) Regulations 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market context:</strong> The UK logistics and distribution sector operates
                approximately 600 million square metres of warehouse floor space. The BREEAM
                (Building Research Establishment Environmental Assessment Method) scheme is widely
                applied to new warehouse construction and places demands on energy management,
                sub-metering, and lighting controls.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hv-led-lighting',
    heading: 'High-Bay LED Lighting Design for Warehouses',
    content: (
      <>
        <p>
          LED high-bay luminaires have transformed warehouse lighting. Modern LED high-bays offer
          efficacies of 150 to 200 lumens per watt, compared to 80 to 100 lm/W for legacy
          metal halide or high-pressure sodium fittings. For a large warehouse, switching to LED
          typically reduces lighting energy consumption by 60 to 70 per cent.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photometric design:</strong> A DIALux or Relux photometric design study
                should be carried out for all warehouse lighting installations. The design must
                demonstrate that the specified luminaires achieve the required maintained average
                illuminance (Em), uniformity ratio (Uo), and glare rating (UGR) in accordance
                with CIBSE LG1 and the task requirements of the specific warehouse operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Controls:</strong> DALI (Digital Addressable Lighting Interface) or
                wireless lighting control systems allow individual luminaire addressing, daylight
                dimming, occupancy-based switching, and zone control. BREEAM and Part L of the
                Building Regulations require automatic lighting controls in warehouses, with
                automatic switching or dimming in response to occupancy and daylighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit design:</strong> High-bay lighting circuits in warehouses are
                typically single-phase final circuits, each serving a row or zone of luminaires.
                Circuit loading should not exceed 80 per cent of the protective device rating.
                Where DALI control is used, a separate 2-wire DALI bus circuit is required in
                addition to the power circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained illuminance:</strong> LED luminaire manufacturers provide a
                maintenance factor (typically 0.85 to 0.90 for LED in clean environments) which
                accounts for lumen depreciation over the rated life. The design must achieve the
                required Em using this maintenance factor to ensure the installation meets the
                specification throughout its lifetime.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase-distribution',
    heading: 'Three-Phase Distribution in Warehouses',
    content: (
      <>
        <p>
          Large warehouses require well-designed three-phase distribution systems to supply power
          efficiently across the building footprint. Poor distribution design leads to excessive
          voltage drop, oversized cables, and difficulty managing future load growth.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main distribution board (MDB):</strong> The MDB receives the incoming LV
                supply and distributes it to zone distribution boards throughout the warehouse.
                The MDB should include main incomer protection (typically a motorised circuit
                breaker or air circuit breaker), metering, power factor correction, and outgoing
                MCCB-protected feeders to zone boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone distribution boards:</strong> Sub-main feeder cables distribute power
                from the MDB to zone boards within each warehouse bay. Zone boards serve lighting,
                small power (sockets), dock levellers, and EV charging in that zone. This
                arrangement limits the length of final circuit cable runs and simplifies fault
                finding and isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Busbar trunking systems:</strong> For large warehouses with high power
                requirements, overhead busbar trunking (busway) provides a flexible distribution
                method. Tap-off boxes can be installed at any point along the busway to provide
                a supply, and repositioned as the warehouse layout changes. Busway eliminates
                the need for extensive cable tray runs and is particularly suited to warehouses
                with regularly changing layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop:</strong> In a large warehouse the distance from the MDB to
                the furthest distribution board can be 150 metres or more. Cable sizing must ensure
                that voltage drop from the origin to the furthest point of use does not exceed
                the limits of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Appendix 12
                </SEOInternalLink>{' '}
                — typically 3 per cent on sub-main circuits and 5 per cent total from the origin
                of the installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging Infrastructure for Warehouses',
    content: (
      <>
        <p>
          EV charging is rapidly becoming one of the most significant electrical requirements for
          new warehouse construction and refurbishment. Logistics operators are electrifying their
          delivery van and HGV fleets, and warehouse employees increasingly need workplace charging.
          The electrical infrastructure must be designed to accommodate very large future EV charging
          demands without requiring costly supply upgrades.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Section 722:</strong> All EV charging installations must comply
                with Section 722 of BS 7671, which specifies requirements for supplies for electric
                vehicles including RCD protection (30mA Type B, or Type A where no DC residual
                current exceeds 6mA), earthing arrangements, and the requirements for mode of
                charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charge points:</strong> The Electric Vehicles (Smart Charge Points)
                Regulations 2021 require all new private charge points to be smart charge points
                capable of responding to off-peak signals and supporting demand management. For
                warehouse operators, smart charging allows EV charging to be scheduled during
                periods of low tariff rates and managed to prevent demand peaks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load management:</strong> A dynamic load management (DLM) or energy
                management system (EMS) is essential for large warehouse EV charging installations.
                The DLM monitors the available supply headroom and allocates charging power to
                each charge point, preventing the aggregate EV charging demand from exceeding
                the available supply capacity. This allows a much larger number of charge points
                to be installed without upgrading the incoming supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Infrastructure-ready provisions:</strong> For cost efficiency, PAS 1899
                and BREEAM recommend installing ducting and distribution boards for future EV
                charging during the initial construction, even if charge points are not installed
                immediately. This avoids disruptive and costly groundworks when EV adoption
                accelerates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'energy-management',
    heading: 'Energy Management and Sub-Metering',
    content: (
      <>
        <p>
          Energy management and sub-metering are increasingly important requirements for warehouse
          operators, driven by Building Regulations Part L, BREEAM assessments, ESOS obligations,
          and the desire to reduce energy costs and carbon emissions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L sub-metering:</strong> Building Regulations Part L2A (new
                non-domestic buildings) requires sub-metering of significant energy uses. For
                warehouses this means separate metering for: lighting, heating and cooling, small
                power, and any significant process loads (conveyor systems, refrigeration, EV
                charging). Metering data must be accessible to building operators.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-hourly metering:</strong> Warehouse operators with a maximum demand
                above 100 kW are required to have a half-hourly electricity meter. This data
                allows the operator to manage demand charges (capacity unit charges applied by
                utilities to maximum demand) and identify energy waste.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power quality monitoring:</strong> Warehouses with large VFD installations,
                UPS systems, or EV charging can experience power quality issues including harmonic
                distortion, voltage fluctuations, and poor power factor. Power quality monitors at
                the main incomer can identify these issues before they cause equipment damage or
                utility penalty charges.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-detection',
    heading: 'Fire Detection Integration in Warehouse Electrical Installations',
    content: (
      <>
        <p>
          Warehouses are high-risk environments for fire due to the concentration of combustible
          goods, the height of racking (which delays detection and suppression), and the potential
          for fork-lift truck impacts on electrical equipment. The electrical installation plays
          a critical role in the fire detection and suppression systems.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5839-1 compliance:</strong> The fire detection and alarm system must
                be designed, installed, commissioned, and maintained in accordance with BS 5839-1.
                For large warehouses, Category L2 (automatic detection in areas of highest fire
                risk) or L1 (full automatic detection throughout) is typically specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-resistant cable:</strong> Regulation 521.10 of BS 7671 requires that
                wiring systems supplying fire safety equipment (fire alarms, emergency lighting,
                sprinkler system pumps, smoke ventilation) must maintain circuit integrity in
                fire conditions. Fire-resistant cable complying with BS EN 50200 or BS 7629 must
                be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical integration:</strong> The fire alarm panel must interface with
                the building's electrical systems to trigger automatic actions on fire detection,
                including: shutting down air handling units (to prevent smoke spread), releasing
                magnetic door holders (to close fire doors), activating smoke extraction systems,
                and signalling to the local fire brigade monitoring service.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Warehouses',
    content: (
      <>
        <p>
          Emergency lighting in a warehouse must ensure that all occupants can safely evacuate
          the building in the event of a mains power failure. The large floor area, complex racking
          layouts, and multiple exit routes of a warehouse create significant emergency lighting
          design challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266-1 requirements:</strong> Emergency luminaires must be positioned
                at all changes of direction, at every exit door, at stairways, and to illuminate
                every exit sign. The minimum maintained illuminance on escape routes is 1 lux at
                floor level along the centreline. Anti-panic lighting in the body of the warehouse
                requires 0.5 lux minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-hour duration:</strong> For large warehouses classified as high-risk
                task areas, emergency lighting must maintain illumination for three hours. Self-
                contained maintained luminaires (combining normal and emergency operation) with
                battery backup, or a central battery system supplying dedicated emergency
                luminaires, are both acceptable approaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and records:</strong> Emergency lighting must be tested monthly
                (brief functional test) and annually (full rated duration test). Test results must
                be recorded in a log book as required by BS 5266-1. The Regulatory Reform (Fire
                Safety) Order 2005 requires the responsible person to ensure emergency lighting
                is maintained in working order.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Bonding in Warehouses',
    content: (
      <>
        <p>
          Correct earthing and bonding in a warehouse protects personnel from electric shock,
          ensures that protective devices operate correctly under fault conditions, and prevents
          dangerous static electricity accumulation in dry goods storage environments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding:</strong> All metallic services entering the
                warehouse (gas, water, oil pipelines, structural steelwork) must be connected
                by main protective bonding conductors to the main earthing terminal in accordance
                with Regulation 411.3.1.2 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural steelwork bonding:</strong> The structural steel frame of a
                warehouse should be connected to the earthing system. This provides an additional
                earth electrode effect, improves the reliability of fault protection, and prevents
                the steel frame from floating at a dangerous potential if it contacts a live
                conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Static bonding for racking:</strong> Metal racking systems in dry
                warehouses handling plastic packaging, granular materials, or powders can
                accumulate dangerous electrostatic charges. Earth bonding straps connecting
                racking sections to the building earth system dissipate these charges safely.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Warehouse Electrical Contracting',
    content: (
      <>
        <p>
          Warehouse electrical contracting is a substantial and growing market for UK electrical
          contractors. New logistics parks, distribution centre refurbishments, and the retrofit
          of EV charging and LED lighting in existing warehouses all generate significant contract
          opportunities.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Testing and Commissioning Records</h4>
                <p className="text-white text-sm leading-relaxed">
                  Large warehouse installations require extensive testing and commissioning
                  documentation. Emergency lighting duration tests, fire detection system
                  commissioning, EV charger commissioning, and full EICR documentation must all
                  be provided to the client on completion. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete all certificates on site with instant PDF delivery.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Large Projects Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Warehouse projects involve large cable quantities, significant containment systems,
                  and multiple sub-systems. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build detailed, professional proposals with accurate material takeoffs and
                  labour calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage warehouse electrical projects with Elec-Mate"
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

export default function WarehouseElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Warehouse Electrical Installation UK | Industrial Lighting & Power"
      description="Complete guide to warehouse electrical installation in the UK. High-bay LED lighting design, three-phase distribution, EV charging infrastructure, energy management, fire detection integration, emergency lighting, and earthing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Electrical Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Warehouse Electrical Installation UK:{' '}
          <span className="text-yellow-400">Industrial Lighting & Power Guide</span>
        </>
      }
      heroSubtitle="The complete technical guide to warehouse and logistics facility electrical installation — covering high-bay LED lighting design, three-phase distribution, EV charging infrastructure, energy management, fire detection integration, and emergency lighting."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Warehouse Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Warehouse Electrical Projects with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site certification, quoting, and project management. 7-day free trial, cancel anytime."
    />
  );
}
