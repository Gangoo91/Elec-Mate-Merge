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
  Building2,
  Car,
  Layers,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/commercial-electrical-installation' },
  { label: 'Office Electrical Fit Out', href: '/office-electrical-fit-out' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'power-distribution', label: 'Power Distribution' },
  { id: 'data-av-points', label: 'Data & AV Points' },
  { id: 'lighting-design', label: 'Office Lighting Design' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'fire-alarm', label: 'Fire Alarm Integration' },
  { id: 'ev-charging', label: 'EV Charging' },
  { id: 'energy-metering', label: 'Energy Metering & Part L' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Office electrical fit-outs must comply with BS 7671:2018+A3:2024, Building Regulations Part L (energy efficiency) and Part B (fire safety), BS 5839-1 (fire detection and alarm), and BS 5266-1 (emergency lighting). Planning permission may be required for Category B fit-outs in leased premises.',
  'UK office lighting design should target 300 to 500 lux maintained average illuminance at the working plane (0.7m above floor) in accordance with CIBSE Lighting Guide LG7 (Offices). Automatic daylight dimming and occupancy control are required by Part L of the Building Regulations.',
  'Emergency lighting in offices must comply with BS 5266-1 and provide a minimum of 1 lux on escape routes and 0.5 lux in open areas for a minimum duration of 1 hour (or 3 hours for certain high-risk areas).',
  'All new office small power socket outlets must be protected by 30mA RCDs in accordance with Regulation 411.3.3 of BS 7671. Type A RCDs are suitable for most office circuits; Type B RCDs are required where equipment with DC residual current components may be connected.',
  'Part L of the Building Regulations requires sub-metering of significant energy uses in office buildings. Energy Performance Certificates (EPCs) are required for offices offered for sale or letting, and Display Energy Certificates (DECs) are required for public buildings over 250 m².',
];

const faqs = [
  {
    question: 'What regulations apply to an office electrical fit-out in the UK?',
    answer:
      "An office electrical fit-out must comply with multiple overlapping regulatory requirements. BS 7671:2018+A3:2024 (the IET Wiring Regulations) provides the primary electrical installation standard. Building Regulations Part L2B (energy efficiency for existing buildings other than dwellings) applies to the lighting and electrical services installation. Part B (fire safety) applies to all fire-related systems. The Electricity at Work Regulations 1989 impose duties on the occupier to maintain electrical systems safely. Where the tenant is taking a Category B fit-out in a leased building, the landlord's fit-out guide will specify additional requirements for the electrical installation that must be met alongside the statutory standards.",
  },
  {
    question: 'How many power outlets are needed in an office electrical fit-out?',
    answer:
      'There is no statutory minimum number of outlets for office use, but CIBSE guidance and good practice suggest a minimum of 2 twin socket outlets per workstation for a standard office layout. Open-plan offices typically have a floor socket arrangement with a perimeter and column trunking strategy providing flexible socket coverage. High-density offices with hot-desking may require higher outlet densities. In addition to workstation power, separate circuits should be provided for: kitchen and breakout areas, AV and presentation equipment, server room or comms room, and building management systems. All socket outlets must be protected by 30mA RCDs per Regulation 411.3.3 of BS 7671.',
  },
  {
    question: 'What illuminance level is required for office lighting in the UK?',
    answer:
      'CIBSE Lighting Guide LG7 (Offices) recommends a maintained average illuminance (Em) of 300 to 500 lux at the working plane (0.7m above floor level) for general office tasks. Screen-based tasks require careful glare control — the Unified Glare Rating (UGR) must not exceed 19 for computer-dominated offices to prevent reflections on screens. Part L of the Building Regulations requires that office lighting achieves a minimum lighting efficacy (the LENI — Lighting Energy Numeric Indicator) target, which is met by using LED luminaires with automatic controls (daylight dimming and presence detection). Compliance with LG7 and Part L must be demonstrated by a photometric design study (DIALux or equivalent).',
  },
  {
    question: 'What fire alarm category is required for an office building?',
    answer:
      'The fire alarm category for an office building is determined by the fire risk assessment carried out in accordance with the Regulatory Reform (Fire Safety) Order 2005. For most office buildings, a Category L2 or L3 automatic fire detection system is specified (automatic detection in defined areas of highest risk, with manual call points and sounders throughout). The fire alarm system must comply with BS 5839-1 for design, installation, commissioning, and maintenance. Category M systems (manual alarm only, no automatic detection) are only appropriate for small offices where all occupants can observe a fire as it starts. The fire risk assessment will determine the category required for each specific building.',
  },
  {
    question: 'Is EV charging required for new office developments in the UK?',
    answer:
      'Building Regulations Part S (Infrastructure for the Charging of Electric Vehicles, applicable in England) requires that new office buildings with more than 10 car parking spaces must provide at least one active EV charge point and cable routes for at least one in five of all remaining spaces. For major refurbishments of existing buildings with more than 10 spaces, at least one active charge point and cable routes for one in five remaining spaces must be provided. The EV charge points must comply with BS 7671 Section 722 and the Electric Vehicles (Smart Charge Points) Regulations 2021 (smart functionality required for all new private charge points). Scotland and Wales have their own equivalent regulations.',
  },
  {
    question: 'What sub-metering is required in an office fit-out under Part L?',
    answer:
      "Building Regulations Part L2B (existing non-domestic buildings) requires that where more than 1,000 m² of the building is being renovated, sub-metering must be provided so that energy use can be monitored and managed. For office fit-outs this typically requires separate energy meters for: lighting, small power (sockets and equipment), heating and cooling, and any significant process loads. Where an office building has multiple tenants, sub-metering is required to allow each tenant's energy consumption to be separately measured. Automatic Meter Reading (AMR) systems that automatically collect and transmit meter data are preferred for buildings above a certain size to facilitate compliance with the Energy Savings Opportunity Scheme (ESOS).",
  },
  {
    question: 'What is a Category A and Category B office fit-out?',
    answer:
      "In UK commercial property, office fit-out is typically described in two categories. A Category A (Cat A) fit-out is the base building finish provided by the landlord before a tenant takes occupation. It typically includes: raised access floors, suspended ceilings, basic mechanical and electrical services (lighting, ventilation, perimeter power trunking), and decorated walls. The electrical installation at Cat A stage will have a main distribution board, perimeter power trunking, basic general lighting, emergency lighting, and fire alarm with detector heads in the ceiling void. A Category B (Cat B) fit-out is the tenant's own fit-out of their space, adding workstation power, data and AV installations, feature lighting, kitchen and breakout areas, and any specialist systems such as a secure server room or AV conference suite.",
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
    href: '/hospital-electrical-installation',
    title: 'Hospital Electrical Installation',
    description: 'Healthcare electrical systems, IEC 60364-7-710, and HTM 06-01.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-commercial-property',
    title: 'Commercial EICR Guide',
    description: 'Periodic inspection and testing requirements for commercial premises.',
    icon: ClipboardCheck,
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
    description: 'Quote office fit-out electrical projects with instant PDF proposals.',
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
    heading: 'Office Electrical Fit-Out in the UK',
    content: (
      <>
        <p>
          Office electrical fit-outs represent a significant and consistent market for UK electrical
          contractors. Every office lease event — a new building completion, a tenant change, or a
          refurbishment — generates substantial electrical work. The rise of hybrid working has also
          driven a wave of office redesigns, from traditional cellular layouts to open-plan
          collaborative environments, each with different power, data, and lighting requirements.
        </p>
        <p>
          Office electrical fit-outs involve a wide range of systems: power distribution from the
          incoming supply to individual workstations, structured data cabling and AV systems,
          high-quality LED lighting with daylight and occupancy controls, emergency lighting, fire
          alarm integration, EV charging in the car park, and energy metering for Part L compliance.
          Co-ordination between the electrical contractor, mechanical contractor, data/AV
          specialist, and fire alarm specialist is essential.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key regulations:</strong> BS 7671:2018+A3:2024, Electricity at Work
                Regulations 1989, Building Regulations Parts B, L, and S, BS 5839-1 (fire
                detection), BS 5266-1 (emergency lighting), CIBSE LG7 (office lighting), Electric
                Vehicles (Smart Charge Points) Regulations 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification:</strong> All office electrical fit-out work must be notified
                to Building Control and certified with an Electrical Installation Certificate on
                completion. Where the electrical contractor is registered with a competent person
                scheme (NICEIC, NAPIT, ELECSA), self-certification is available without separate
                Building Control notification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-distribution',
    heading: 'Power Distribution in Office Fit-Outs',
    content: (
      <>
        <p>
          Power distribution in an office fit-out must supply workstation power, kitchen and
          breakout areas, AV and presentation equipment, server and comms rooms, and building
          services — all from a distribution system that is flexible enough to accommodate future
          layout changes without major rewiring.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution boards:</strong> A sub-main distribution board serves each
                floor or zone of the office. Sub-main cables from the main distribution board feed
                these zone boards, which house the MCBs protecting individual final circuits. Zone
                boards should include spare ways (minimum 25 per cent) for future additions and
                should be located in accessible positions, typically within server/comms rooms or
                dedicated electrical risers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Perimeter trunking:</strong> In Cat A office fit-outs, perimeter trunking
                (three-compartment: power, data, and open) is typically installed around the office
                perimeter at desk height. Each trunking section is supplied by a radial final
                circuit, and socket outlets and data outlets can be added or relocated by the tenant
                during their Cat B fit-out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor boxes:</strong> Open-plan office layouts use floor boxes in the raised
                access floor to provide power and data at workstations in the centre of the floor
                plate (away from perimeter trunking). Floor boxes must be rated for the load they
                carry and must be sealed against the ingress of water during floor cleaning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> All socket outlet circuits in the office must be
                protected by 30mA RCDs in accordance with Regulation 411.3.3 of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                . RCBOs (combined MCB and RCD) are commonly used in office distribution boards to
                provide individual circuit RCD protection without shared tripping of multiple
                circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'data-av-points',
    heading: 'Data and AV Points in Office Fit-Outs',
    content: (
      <>
        <p>
          Although structured data cabling is typically a separate specialist trade, the electrical
          contractor must co-ordinate closely with the data installer to ensure containment, power
          supplies, and earthing arrangements are correctly provided. AV systems in conference rooms
          and presentation areas also require specialist electrical provisions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured cabling:</strong> Cat6A or Cat6 structured cabling is the
                standard for new office data installations in the UK, supporting 10 Gigabit Ethernet
                to the desktop. Optical fibre (OS2 single-mode or OM4 multimode) is used for
                backbone connections between communication rooms. The electrical contractor provides
                the containment (cable tray, trunking, conduit) and the data contractor pulls and
                terminates the cabling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power over Ethernet (PoE):</strong> IP phones, wireless access points, CCTV
                cameras, and access control readers increasingly use PoE (Power over Ethernet) for
                both power and data via a single Cat6A cable. The network switch provides the PoE
                power. The electrical contractor must ensure the switch cabinet (patch cabinet) has
                adequate power supply (typically a dedicated 16A or 32A circuit) to support the PoE
                budget of all connected devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conference room AV:</strong> Conference rooms require a dedicated power zone
                for AV equipment including projectors, large-format displays, videoconferencing
                systems, and audio amplifiers. AV equipment should be on a separate circuit from
                general power to prevent interference from other loads. Floor boxes or wall outlets
                for AV should be positioned to avoid cable trip hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Server/comms room:</strong> The IT comms room requires a dedicated power
                supply (often a UPS-protected circuit), adequate electrical capacity for current and
                future rack power densities, precision air conditioning, and appropriate fire
                suppression. The electrical installation in the comms room should be designed to the
                same principles as a small data centre.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting-design',
    heading: 'Office Lighting Design',
    content: (
      <>
        <p>
          High-quality lighting is one of the most visible and occupant-affecting aspects of an
          office fit-out. Good lighting design improves productivity, reduces eye strain, and
          creates the right environment for different types of work. UK offices must comply with
          CIBSE LG7 and Part L of the Building Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illuminance levels:</strong> CIBSE LG7 specifies 300 to 500 lux maintained
                average at the working plane for general office work. Task areas, drawing offices,
                and precision work may require up to 750 lux. Circulation areas and corridors
                require 100 to 150 lux. Reception areas typically require 200 to 300 lux.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glare control:</strong> Computer screen glare is a major comfort issue in
                offices. LED luminaires must be specified with a UGR (Unified Glare Rating) not
                exceeding 19 for screen-based work environments. Indirect or semi-indirect
                luminaires (uplighting or louvre fittings) are preferred over direct recessed
                downlighters in open-plan offices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting controls:</strong> Part L of the Building Regulations requires
                automatic lighting controls in offices, including: presence detection (switching off
                lights in unoccupied areas automatically), daylight dimming (dimming or switching
                lights near windows in response to available daylight), and local manual override.
                DALI control systems are widely used for office lighting, allowing individual
                luminaire addressing and integration with the BMS.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tunable white lighting:</strong> Human-centric lighting (HCL) systems that
                vary the colour temperature of the office lighting throughout the day (cooler, bluer
                light in the morning to promote alertness; warmer light in the afternoon to reduce
                fatigue) are increasingly specified in high-quality office fit-outs. These systems
                require DALI or DALI-2 control with tunable white (Tw) luminaires.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Office Buildings',
    content: (
      <>
        <p>
          Emergency lighting in offices must ensure that all occupants can safely evacuate the
          building in the event of a mains power failure, and that security and safety systems can
          continue to operate. BS 5266-1 and Regulation 560.7 of BS 7671 govern the design,
          installation, and testing of emergency lighting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting:</strong> Escape route luminaires must provide a
                minimum maintained illuminance of 1 lux at floor level along the centreline of the
                escape route, with a uniformity ratio (minimum to average) of not less than 1:40.
                Luminaires must be positioned at every change of direction, at every exit door, at
                stairways (at each landing and at each change of direction), and at every fire call
                point and first-aid station.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anti-panic lighting:</strong> In open-plan office areas (open areas greater
                than 60 m²), anti-panic lighting must provide a minimum of 0.5 lux at floor level
                throughout the area (avoiding fixed obstacles) so that occupants can safely move
                towards escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> Emergency lighting in offices must maintain the required
                illuminance for a minimum duration of one hour. Where the premises are used for
                entertainment or public gatherings, a minimum of three hours is required.
                Self-contained maintained luminaires with integrated batteries, or a central battery
                system, are both acceptable approaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automated testing:</strong> BS 5266-1 requires monthly functional testing
                and annual full-duration testing of emergency lighting. Automated self-testing
                emergency luminaires (addressable self-test systems) simplify compliance by
                automatically performing tests and generating electronic records, reducing the
                labour cost of manual testing in large office buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Integration in Office Fit-Outs',
    content: (
      <>
        <p>
          The fire alarm installation is closely integrated with the office electrical fit-out.
          Electrical contractors must understand the interface between the fire alarm system and the
          building's electrical services, even where the fire alarm installation itself is carried
          out by a specialist contractor.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-resistant cable:</strong> Fire alarm cabling must use fire-resistant
                cable complying with BS 7629 or equivalent, maintaining circuit integrity in fire
                conditions. Regulation 521.10 of BS 7671 requires fire-resistant wiring systems for
                safety services. In an office fit-out, the fire alarm contractor typically supplies
                and installs the fire alarm cable; the electrical contractor provides the power
                supply circuit to the fire alarm control panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical interfaces:</strong> The fire alarm system typically interfaces
                with the building's electrical services to trigger automatic actions on detection,
                including: releasing fire door magnetic holders, activating smoke extraction fans,
                shutting down air handling units (to prevent smoke spread), and sending signals to
                lifts to call them to the ground floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power supply to the fire alarm panel:</strong> The fire alarm panel must be
                supplied from a dedicated circuit taken directly from the distribution board,
                protected by a dedicated MCB clearly labelled "FIRE ALARM — DO NOT SWITCH OFF". This
                circuit must not be connected to a general power distribution circuit that could be
                switched off by a building occupant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging in Office Car Parks',
    content: (
      <>
        <p>
          Building Regulations Part S requires EV charging provision for new office buildings and
          major refurbishments with car parking. Even where Part S does not apply, office occupiers
          increasingly demand EV charging as a workplace benefit, and it is becoming a standard
          element of office fit-outs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part S requirements:</strong> For new office buildings with more than 10 car
                parking spaces, Building Regulations Part S (England) requires at least one active
                EV charge point and cable routes suitable for charge points for at least one in five
                of all remaining spaces. The active charge point must be smart (complying with the
                Electric Vehicles (Smart Charge Points) Regulations 2021).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Section 722:</strong> EV charging installations must comply with
                Section 722 of BS 7671. Key requirements include: 30mA Type B RCD protection for
                each charge point (or Type A where the manufacturer confirms no DC residual current
                exceeds 6mA); an isolating switch for each charge point; and appropriate earthing
                arrangements, including protective earth monitoring where required by the charge
                point manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load management:</strong> Where multiple charge points are installed, a
                dynamic load management system should be provided to prevent the aggregate EV
                charging demand from overloading the office building's incoming supply. The load
                management system monitors available capacity headroom and distributes charging
                power among active charge points.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'energy-metering',
    heading: 'Energy Metering and Part L Compliance',
    content: (
      <>
        <p>
          Energy efficiency and sub-metering requirements for office electrical fit-outs are
          governed by Part L of the Building Regulations. Compliance must be demonstrated at the
          design stage and verified on completion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L2B sub-metering:</strong> Where more than 1,000 m² of a building is
                being renovated, Part L2B requires sub-meters for lighting, small power, HVAC, and
                any significant process loads. In a Cat B office fit-out, the tenant should install
                sub-metering that allows their energy use to be separately measured from the base
                building energy (landlord's common areas and services).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting energy:</strong> Part L requires that office lighting achieves a
                target LENI (Lighting Energy Numeric Indicator) value. The LENI is calculated by the
                lighting designer using a standardised methodology and must meet the target value
                specified in Part L. LED luminaires with automatic controls (presence detection and
                daylight dimming) are essential for meeting LENI targets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy Performance Certificates:</strong> An EPC is required for any office
                building offered for sale or let (since October 2008). The EPC rating (A++ to G) is
                based on the asset rating of the building's fixed services, including the electrical
                installation and lighting. From April 2023, office buildings with an EPC rating
                below E cannot be let (MEES — Minimum Energy Efficiency Standards). From 2027, the
                minimum will rise to D, and from 2030 to C.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Office Electrical Fit-Out Contracting',
    content: (
      <>
        <p>
          Office electrical fit-out is a consistently active market for UK electrical contractors.
          The regular churn of office leases, the expansion of new office developments in UK cities,
          and the wave of post-pandemic office redesigns all generate significant contracting
          opportunities.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Working in Occupied Buildings</h4>
                <p className="text-white text-sm leading-relaxed">
                  Office refurbishments are frequently carried out in occupied buildings, requiring
                  work to be phased to minimise disruption to tenants. Safe isolation procedures are
                  particularly important in occupied buildings — always confirm the exact circuit to
                  be isolated with the building manager before switching off, and use lockout
                  devices to prevent inadvertent re-energisation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Certification on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Office fit-out projects require comprehensive electrical certification on
                  completion. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete Electrical Installation Certificates, test schedules, and Minor Works
                  Certificates on site, with instant PDF delivery to the main contractor and client.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage office fit-out electrical projects with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certification, quoting, and project management. Complete EICs and EICRs on your phone with instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OfficeElectricalFitOutPage() {
  return (
    <GuideTemplate
      title="Office Electrical Fit Out UK | Commercial Office Wiring"
      description="Complete guide to office electrical fit-out in the UK. Power distribution, data points, office lighting design to CIBSE LG7, emergency lighting, fire alarm integration, EV charging to BS 7671 Section 722, and energy metering for Part L compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Electrical Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Office Electrical Fit Out UK:{' '}
          <span className="text-yellow-400">Commercial Office Wiring Guide</span>
        </>
      }
      heroSubtitle="The complete technical guide to office electrical fit-out in the UK — covering power distribution, data and AV points, office lighting design to CIBSE LG7, emergency lighting to BS 5266-1, fire alarm integration, EV charging, and energy metering for Building Regulations Part L compliance."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Office Electrical Fit Out"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Office Fit-Out Projects with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site certification, quoting, and project management. Complete EICs and EICRs on your phone. 7-day free trial, cancel anytime."
    />
  );
}
