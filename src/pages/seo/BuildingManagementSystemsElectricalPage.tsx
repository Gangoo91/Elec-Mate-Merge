import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Wrench,
  Server,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Building Management Systems Electrical', href: '/guides/building-management-systems-bms-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'bms-architecture', label: 'BMS Architecture' },
  { id: 'protocols', label: 'Protocols: BACnet, Modbus, KNX, LON' },
  { id: 'cibse-tm47', label: 'CIBSE TM47 Guidance' },
  { id: 'electrical-integration', label: 'Integration with Electrical Systems' },
  { id: 'bs-en-iso-16484', label: 'BS EN ISO 16484 BMS Standards' },
  { id: 'career-path', label: 'Career Path: Electrician to BMS Engineer' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A Building Management System (BMS) is an integrated computer-based control system that monitors and controls mechanical and electrical equipment in a building — HVAC, lighting, power, fire, and security systems. It provides energy optimisation, fault detection, and remote management capabilities.',
  'BMS architecture consists of three levels: field level (sensors, actuators, and terminal controllers — DDC units); automation level (supervisory controllers that manage groups of field devices); and management level (the central SCADA-style supervisory interface that operators interact with).',
  'The four main BMS communication protocols used in the UK are BACnet (the dominant open standard for HVAC and building automation), Modbus (widely used for power metering and industrial integration), KNX (the European standard for building automation wiring and devices), and LONworks (legacy protocol still widespread in existing installations).',
  'CIBSE TM47 (Metering for Energy Management in Buildings) provides guidance on the sub-metering hierarchy and metering specification for commercial buildings. It is directly relevant to the electrical metering and monitoring elements of BMS installations.',
  'BS EN ISO 16484 is the international standard for building automation and control systems (BACS). It is a multi-part standard covering system structure, functions, and data communication. Part 5 covers the data communication protocol (which is aligned with BACnet).',
];

const faqs = [
  {
    question: 'What is a BMS and what does it control?',
    answer:
      'A Building Management System (BMS) — also called a Building Automation System (BAS) or Building Energy Management System (BEMS) — is a centralised computer-based system that monitors, controls, and optimises the mechanical and electrical systems in a building. Systems typically controlled by a BMS include: HVAC (heating, ventilation, and air conditioning) — the largest and most complex BMS application. Zone temperature control, AHU (air handling unit) control, chiller plant optimisation, boiler plant control, heat recovery. Electrical systems — sub-metering for energy management, power factor correction, UPS status monitoring, generator monitoring and test scheduling, DALI lighting control integration. Fire and safety — BMS typically interfaces with the fire alarm panel but does not control it (fire systems have their own autonomous control). The BMS may monitor fire panel status and integrate fire mode into HVAC control (for example, smoke extract activation). Security — access control and CCTV status can be integrated into the BMS supervisory interface. Lifts — elevator status monitoring. The BMS does not replace these individual control systems but provides a single supervisory interface and enables integration between them.',
  },
  {
    question: 'What is a DDC controller and what does it do?',
    answer:
      'A DDC (Direct Digital Controller) is the field-level controller in a BMS. It is a programmable microprocessor-based controller that reads inputs from sensors (temperature, pressure, flow, CO2, occupancy) and drives outputs to actuators (valve actuators, variable speed drives, damper actuators, fan starters). Each DDC manages a specific plant item or zone — for example, one DDC might control an air handling unit, managing supply fan speed, heating/cooling coil valve positions, damper positions, and supply temperature. The DDC communicates with the supervisory controller above it using a BMS communication protocol (typically BACnet over MS/TP or Ethernet). DDCs contain their own local logic — they can operate autonomously (maintaining zone temperature without supervisory communication) but report status and receive setpoint changes from the supervisory level. For electricians transitioning into BMS work, understanding DDC input/output wiring — connecting sensors, actuators, and power supplies to the controller — is the most immediately relevant skill.',
  },
  {
    question: 'What is BACnet and why is it the dominant BMS protocol?',
    answer:
      'BACnet (Building Automation and Control networks) is an open-standard data communication protocol developed by ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) and standardised as ANSI/ASHRAE Standard 135. It is now also incorporated into ISO 16484-5. BACnet was designed specifically for building automation applications and uses object-oriented data modelling — every device in a BACnet network is described as a collection of standardised objects (Analog Input, Binary Output, Schedule, Trend Log, etc.) with standardised properties. This means that a BACnet supervisory controller from one manufacturer can read data from a DDC from a different manufacturer without custom integration work. This interoperability is the primary reason BACnet has become the dominant protocol for new BMS installations. BACnet can run over multiple physical layers: BACnet MS/TP (a token-passing network over twisted pair, typically at 76.8kbps, used at field level); BACnet IP (over standard Ethernet, used at the automation and management levels); BACnet Ethernet (direct Ethernet without IP, less common). For electricians, the physical wiring of BACnet MS/TP networks — two-core shielded twisted pair (typically Belden 9841 or equivalent), end-of-line termination resistors, and screening connections — is the relevant installation knowledge.',
  },
  {
    question: 'What does CIBSE TM47 cover and why is it relevant to electricians?',
    answer:
      'CIBSE TM47 (Metering for Energy Management in Buildings) was published by the Chartered Institution of Building Services Engineers and provides guidance on the design and specification of energy metering and sub-metering systems for commercial buildings. It is relevant to electricians because: the sub-metering hierarchy (whole building, major plant, HVAC zones, tenant supplies, lighting circuits) defines where electrical meters must be installed and what they must measure; meter selection (accuracy class, CT ratio, pulse output vs Modbus vs MBus) affects the installation requirements; the electrical connections from revenue-grade meters to the BMS communications network require the electrician to understand both the electrical metering installation and the BMS integration requirements; in buildings targeting BREEAM Excellence or Outstanding certification, a specific sub-metering strategy is required as assessed credit, which drives the meter installation specification. The electrician on a BMS project typically installs the sub-meters, current transformers (CTs), and the power supplies for BMS panels and communications networks — not the BMS programming — but understanding TM47 helps them appreciate why the metering is being installed and what it must achieve.',
  },
  {
    question: 'What does BS EN ISO 16484 cover?',
    answer:
      'BS EN ISO 16484 (Building automation and control systems — BACS) is the international standard for building automation systems. It is a multi-part standard: Part 1 covers project specification and implementation. Part 2 covers hardware. Part 3 covers functions. Part 5 covers the data communication protocol (which is essentially BACnet — ASHRAE 135 and ISO 16484-5 are maintained in alignment). Part 6 covers data communication compliance testing. For electrical engineers and BMS engineers, Part 5 is the most directly relevant — it defines the BACnet protocol in its international standardised form. For specifying engineers, Part 1 and Part 3 provide the framework for writing BMS specifications that define the scope, functionality, and acceptance testing criteria for a BMS installation. In the UK, BMS specifications on large commercial projects typically reference both CIBSE TM47 (for metering) and BS EN ISO 16484 (for the BMS itself) alongside the project brief.',
  },
  {
    question: 'What is the salary range for a BMS engineer in the UK?',
    answer:
      'BMS engineering is one of the better-paid electrical career paths, particularly for those who develop both the electrical installation background and the software/programming skills. Salary ranges in the UK: BMS Commissioning Engineer (field-based, setting up and commissioning DDC controllers): £35,000–£50,000. BMS Engineer (site-based, project delivery): £40,000–£55,000. Senior BMS Engineer (system design, project management, client interface): £50,000–£65,000. BMS Applications Engineer / Programmer (developing graphics, writing control sequences, BACnet integration): £45,000–£65,000. BMS Project Manager / Design Engineer: £55,000–£75,000. BMS Consultant (specifying engineer, design lead): £60,000–£80,000+. The highest salaries are in London and the South East and in data centre, pharmaceutical, and hospital sectors where BMS complexity and criticality is greatest. Contractors (self-employed BMS engineers) can earn significantly more — £350–£600/day is typical for experienced BMS commissioning engineers on infrastructure projects.',
  },
  {
    question: 'How does DALI integrate with the BMS and what does the electrician need to know?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is the international standard for digital lighting control (IEC 62386). DALI allows individual dimming, switching, and status monitoring of each lighting circuit or luminaire. In BMS integration, a DALI gateway (a device that bridges between the DALI bus and the BMS network, typically using BACnet or Modbus) reports lighting status and occupancy data to the BMS and receives lighting control commands. For the electrician, DALI installation requires: a two-core bus cable (DALI is polarity-insensitive — no need to distinguish live and neutral, though the cable must be rated for the DALI bus voltage of 16V DC); addressing each DALI device using a DALI commissioning tool; and understanding that the DALI bus current is limited to 250mA maximum per segment (this limits the number of devices per segment and the cable length). The integration between DALI lighting control and the BMS for energy management (monitoring energy consumption by zone, controlling lighting based on occupancy from BMS-connected occupancy sensors) is a key energy efficiency measure required by Part L of the Building Regulations for larger new commercial buildings.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/data-centre-electrical-installation',
    title: 'Data Centre Electrical Installation',
    description:
      'Data centres use sophisticated DCIM systems that parallel BMS. Critical power monitoring and DALI lighting integration.',
    icon: Server,
    category: 'Guide',
  },
  {
    href: '/guides/clean-room-electrical-installation',
    title: 'Clean Room Electrical Installation',
    description:
      'BMS controls the environmental conditions in pharmaceutical clean rooms. Understand IQ/OQ/PQ documentation.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'BMS systems on large campuses interface with HV switchgear monitoring and generator management.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete EIC certificates for BMS panel power supplies and DALI wiring installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for BMS panel power supplies, DDC controller feeds, and DALI bus wiring.',
    icon: Gauge,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 provides the inspection and testing foundation for BMS electrical commissioning.',
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
    heading: 'Building Management Systems and Electrical Engineering',
    content: (
      <>
        <p>
          Building Management Systems (BMS) sit at the intersection of electrical engineering,
          mechanical engineering, and software. For electricians with the ambition to develop beyond
          traditional installation work, BMS engineering offers a clear career path from hands-on
          wiring to high-value engineering and project management roles — with salaries of
          £45,000 to £65,000 and contractor day rates of £350 to £600 for experienced engineers.
        </p>
        <p>
          The BMS integrates and controls virtually all of a building's mechanical and electrical
          systems from a single platform. As buildings increasingly target energy efficiency
          credentials (BREEAM, EPC ratings, net zero targets), the BMS becomes more central to
          building operation — and the engineers who can design, install, commission, and programme
          these systems become more valuable.
        </p>
        <p>
          This guide covers BMS architecture (DDC controllers, supervisory level, management
          interface), the four main protocols (BACnet, Modbus, KNX, LON), CIBSE TM47 guidance on
          metering, the integration of DALI lighting and electrical sub-metering, the BS EN ISO 16484
          standard series, and the career path from electrical installation into BMS engineering.
        </p>
      </>
    ),
  },
  {
    id: 'bms-architecture',
    heading: 'BMS Architecture: DDC Controllers, Sensors, and Supervisory Level',
    content: (
      <>
        <p>
          A BMS is structured in three levels, each with a specific role:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Field Level</h3>
            <p className="text-white text-sm leading-relaxed">
              Sensors (temperature, pressure, flow, CO2, occupancy) and actuators (valve actuators,
              VSDs, damper motors) connected to DDC (Direct Digital Controllers). Each DDC manages
              a specific plant item or building zone. Communicates with supervisory level via BACnet
              or Modbus.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Automation Level</h3>
            <p className="text-white text-sm leading-relaxed">
              Supervisory controllers aggregate data from multiple DDCs. Plant optimisation
              algorithms run here — chiller sequencing, heating/cooling switchover, demand control
              ventilation. Communication typically BACnet IP over Ethernet LAN.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Management Level</h3>
            <p className="text-white text-sm leading-relaxed">
              The central SCADA-style interface — typically web-based — that facilities managers
              use to monitor building conditions, adjust setpoints, view alarms, and analyse
              energy data. May be cloud-hosted or on a local server.
            </p>
          </div>
        </div>
        <p>
          For electricians transitioning into BMS work, the field level is the entry point — wiring
          sensors, actuators, DDC power supplies, and communications cables. Understanding the
          three-level architecture helps you see where your wiring fits into the bigger system.
        </p>
      </>
    ),
  },
  {
    id: 'protocols',
    heading: 'BMS Protocols: BACnet, Modbus, KNX, and LON',
    content: (
      <>
        <p>
          Four main protocols are used in UK BMS installations. Understanding them helps electricians
          select the correct cables and understand the wiring and termination requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BACnet MS/TP</strong> — the dominant open standard for HVAC and building
                automation. Token-ring network over two-core shielded twisted pair (Belden 9841 or
                equivalent). Max 76.8kbps. Up to 127 devices per segment, end-of-line resistors
                required. Linear topology (no star connections). IEC 62386 / ISO 16484-5.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modbus RTU</strong> — widely used for power metering and industrial
                equipment integration. Two-core shielded twisted pair (RS-485). Master-slave
                architecture. Commonly used to integrate electricity meters, sub-meters, and
                power quality analysers into the BMS energy management system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>KNX</strong> — European standard (EN 50090 / IEC 14543) for building
                automation wiring and devices. Two-core KNX twisted pair (YCYM 2×2×0.8 or similar).
                Used for lighting control, blind control, and HVAC interfacing in commercial and
                high-end residential buildings. Each KNX device has an individual address programmed
                using ETS software.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LONworks (LON)</strong> — a legacy protocol (ANSI/EIA-709.1) widely used in
                existing BMS installations in the UK from the 1990s and 2000s. Still in service on
                many large commercial buildings. Electricians working on BMS upgrades to existing
                buildings will frequently encounter LON networks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cibse-tm47',
    heading: 'CIBSE TM47: Metering for Energy Management',
    content: (
      <>
        <p>
          CIBSE Technical Memorandum TM47 (Metering for Energy Management in Buildings) provides
          guidance on the specification and installation of energy metering systems that integrate
          with the BMS for energy management. Key principles relevant to electrical engineers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Metering hierarchy:</strong> TM47 defines a hierarchy — whole building, major plant (chillers, boilers, AHUs), tenant supplies, lighting, small power — and specifies which levels of metering are required for different building types and BREEAM credits.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Meter accuracy:</strong> Revenue-grade meters (Class 1 or better per IEC 62053) are required at the building intake. Sub-metering can use Class 2 meters. The accuracy class affects CT selection and meter specification.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Communication:</strong> TM47 recommends Modbus or MBus as the communication protocol for meter data transmission to the BMS. Pulse output (S0) meters are the simplest but provide only energy totals, not real-time power or power factor.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>CT sizing:</strong> The current transformer (CT) ratio must be selected to match the circuit being metered. Oversized CTs reduce accuracy at low loads; undersized CTs saturate and give incorrect readings at high loads.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-integration',
    heading: 'Integration with Electrical Systems: DALI, Metering, and Sub-Metering',
    content: (
      <>
        <p>
          The BMS integrates directly with electrical systems through several interfaces:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI lighting control</strong> — a DALI gateway bridges the DALI bus
                (IEC 62386) to the BMS (typically BACnet or Modbus). The BMS can monitor energy
                consumption by lighting zone, control lighting scenes, and integrate occupancy data
                from BMS occupancy sensors with DALI lighting control. DALI bus wiring is two-core
                (typically 1.5mm² or 2.5mm²) and is polarity-insensitive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical sub-metering</strong> — per CIBSE TM47, sub-meters on major
                electrical loads (chillers, AHUs, lighting distribution boards, EV chargers) report
                energy data to the BMS via Modbus. The electrician installs the meters, CTs, and
                the Modbus wiring from meter to BMS panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator and UPS monitoring</strong> — generator controllers and UPS
                management systems typically provide Modbus or BACnet interfaces. The BMS monitors
                generator status, fuel level, and run hours, and schedules automatic load testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable speed drives (VSDs)</strong> — VSDs on fan and pump motors provide
                Modbus interfaces for speed control, energy monitoring, and fault reporting. BMS
                integration allows the BMS to optimise fan speed based on building conditions
                rather than using fixed speed settings.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Certify the electrical elements of BMS installations"
          description="Elec-Mate's EIC certificate tools handle the electrical certification for BMS panel power supplies, DALI wiring, and sub-metering installations. Complete on site, export professional PDF."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'bs-en-iso-16484',
    heading: 'BS EN ISO 16484: Building Automation and Control Systems',
    content: (
      <>
        <p>
          BS EN ISO 16484 (Building automation and control systems — BACS) is the international
          standard framework for BMS. The key parts for engineers and specifiers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO 16484-1:</strong> Project specification and implementation. Provides the framework for writing BMS specifications and managing BMS projects, including acceptance testing criteria.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO 16484-3:</strong> Functions. Describes the standard functional modules that a BMS should provide — setpoint management, scheduling, alarms, trending, energy reporting.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO 16484-5:</strong> Data communication protocol. The BACnet standard in its international form. Maintained in alignment with ASHRAE Standard 135. Defines how BMS devices communicate, how objects and properties are structured, and the conformance classes that devices must meet.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ISO 16484-6:</strong> Data communication compliance testing. Defines how BACnet devices are tested for conformance to the standard, which underpins the BACnet Testing Laboratories (BTL) mark that compliant devices carry.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'career-path',
    heading: 'Career Path: From Electrical Installation to BMS Engineer',
    content: (
      <>
        <p>
          The BMS engineering career path is one of the most accessible high-value career
          transitions for qualified electricians. The electrical installation background is a genuine
          advantage — BMS engineers who understand how the electrical systems they are integrating
          actually work are more effective than those who come from a pure software or IT background.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 1 — BMS installation electrician (£35–£45k):</strong> Work on BMS cable installation projects. Learn to install DDC panels, sensor wiring, communications cabling, and BMS panel power supplies. Understand the physical installation and work with BMS engineers on commissioning.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 2 — BMS commissioning engineer (£40–£55k):</strong> Learn to set up DDC controllers, address BACnet and DALI devices, configure points lists, and perform functional testing. Attend BACnet training — IBMS (Institute of Building Management Systems) runs short courses.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 3 — BMS engineer / applications engineer (£50–£65k):</strong> Develop programming skills in BMS software environments (Trend IQ, Tridium Niagara, Siemens Desigo CC, Honeywell EBI). Design graphics, write control sequences, integrate third-party systems.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 4 — Senior engineer / consultant (£60–£80k+):</strong> System design, specification writing, project management. CIBSE membership and Chartered Engineer status add credibility and earnings potential.</span>
            </li>
          </ul>
        </div>
        <p>
          Major BMS specialist contractors in the UK include Schneider Electric (EcoStruxure),
          Siemens Smart Infrastructure, Honeywell Building Technologies, Johnson Controls, Trend
          Control Systems, and Tridium. All regularly recruit from electrical installation backgrounds
          for commissioning and field engineer roles.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BuildingManagementSystemsElectricalPage() {
  return (
    <GuideTemplate
      title="Building Management Systems (BMS) Electrical Guide UK | BACnet, KNX, DALI"
      description="Complete guide to building management systems for UK electricians. BMS architecture (DDC controllers, sensors, actuators), BACnet, Modbus, KNX, LON protocols, CIBSE TM47 metering, DALI integration, BS EN ISO 16484, and career path from electrician to BMS engineer (£45–65k)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Server}
      heroTitle={
        <>
          Building Management Systems:{' '}
          <span className="text-yellow-400">BACnet, DALI, and the BMS Career Path for Electricians</span>
        </>
      }
      heroSubtitle="BMS engineering pays £45–65k in employment or £350–600/day as a contractor. This guide covers BMS architecture, BACnet and Modbus protocols, CIBSE TM47 metering, DALI and sub-metering integration, BS EN ISO 16484, and the career transition from electrical installation to BMS engineer."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Building Management Systems and Electrical Engineering"
      relatedPages={relatedPages}
      ctaHeading="Certify BMS Electrical Installations with Elec-Mate"
      ctaSubheading="Complete EIC certificates for BMS panel power supplies, DALI wiring, and sub-metering installations. Professional PDF output. 7-day free trial."
    />
  );
}
