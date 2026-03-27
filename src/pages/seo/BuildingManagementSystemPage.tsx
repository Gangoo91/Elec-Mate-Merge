import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  Settings,
  Zap,
  PoundSterling,
  Wifi,
  FileCheck2,
  ClipboardCheck,
  Lock,
  AlertTriangle,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Building Systems', href: '/building-systems' },
  { label: 'Building Management Systems', href: '/building-management-system' },
];

const tocItems = [
  { id: 'what-bms-does', label: 'What a BMS Does' },
  { id: 'hvac-integration', label: 'HVAC Integration' },
  { id: 'metering', label: 'Energy Metering' },
  { id: 'lighting-control', label: 'Lighting Control Integration' },
  { id: 'access-control', label: 'Access Control Integration' },
  { id: 'protocols', label: 'BACnet & Modbus Protocols' },
  { id: 'energy-monitoring', label: 'Energy Monitoring' },
  { id: 'commissioning', label: 'Commissioning Process' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A Building Management System (BMS) — also called a Building Automation System (BAS) or Building Controls System — is a computer-based control system installed in buildings that monitors and controls the building\'s mechanical and electrical services: HVAC, lighting, power, access control, and fire systems.',
  'BACnet (ISO 16484-5) is the dominant open-protocol standard for BMS in the UK commercial market. Modbus is widely used for sub-metering, energy monitoring, and integration with legacy equipment. Both protocols allow equipment from different manufacturers to communicate on the same network.',
  'Energy metering via a BMS can identify where and when energy is being wasted — typically revealing that 20–40% of a building\'s energy is consumed outside occupied hours by equipment left in standby or HVAC running unnecessarily.',
  'Access control systems, CCTV, and intruder alarms can all be integrated into a BMS, providing a unified view of building operations and enabling automated responses — for example, switching off HVAC and lighting automatically when the last person leaves.',
  'BMS commissioning involves three stages: point-to-point testing (verifying every sensor and actuator signal), functional testing (verifying control sequences operate correctly), and witnessed commissioning (client acceptance testing). Detailed commissioning records are required for handover.',
];

const faqs = [
  {
    question: 'What is a Building Management System (BMS)?',
    answer:
      'A Building Management System (BMS) — also known as a Building Automation System (BAS) or Building Controls System — is a centralised computer system that monitors and controls a building\'s mechanical and electrical services. A BMS typically controls HVAC (heating, ventilation, and air conditioning), lighting, electrical power, lifts, and fire and security systems. It provides a graphical interface (SCADA or web dashboard) showing the real-time status of all controlled systems, alerts for faults and alarms, and logging of all data for energy analysis and compliance reporting. BMS are standard in commercial buildings over approximately 2,000m² and are increasingly being retrofitted to smaller buildings as part of energy efficiency programmes.',
  },
  {
    question: 'What is BACnet and why is it the standard protocol?',
    answer:
      'BACnet (Building Automation and Control Networks) is an open data communication protocol for building automation and control systems, standardised as ISO 16484-5 and ASHRAE 135. It defines how building automation devices communicate with each other over various network types (BACnet/IP over Ethernet, BACnet MS/TP over RS-485). Because BACnet is an open standard, equipment from different manufacturers can communicate on the same BMS network, avoiding vendor lock-in. BACnet is the dominant protocol for new commercial BMS installations in the UK. Most major BMS manufacturers (Siemens, Johnson Controls, Honeywell, Schneider Electric, Trend) support BACnet natively.',
  },
  {
    question: 'What is the difference between BACnet and Modbus?',
    answer:
      'BACnet is a full-featured building automation protocol with device discovery, object-oriented data model, alarm management, and trending. It is complex but powerful. Modbus is a much simpler serial communication protocol originally developed for industrial PLCs. Modbus is widely used for integrating sub-meters, variable speed drives (VSDs), UPS units, and other equipment that predates BACnet or is too simple to justify BACnet implementation. A typical BMS will use BACnet as its primary protocol for HVAC controllers and lighting controllers, with Modbus gateways to communicate with sub-meters and legacy equipment.',
  },
  {
    question: 'Can a BMS integrate with access control and CCTV?',
    answer:
      'Yes. Modern BMS platforms support integration with access control systems, CCTV, and intruder alarms through IP-based interfaces, BACnet, or direct API integration. Common integration scenarios include: occupancy signals from access control determining HVAC and lighting zones; last-person-out events from access control triggering HVAC setback and lighting off; intruder alarm activation triggering CCTV recording and lighting; and energy reporting combining electrical sub-meter data with occupancy data from access control. Full integration requires coordination between the BMS engineer, access control installer, and CCTV contractor during the design phase.',
  },
  {
    question: 'How long does BMS commissioning take?',
    answer:
      'BMS commissioning duration depends on system size and complexity. A small commercial building (10,000m², 500 BMS points) typically requires 2–4 weeks of commissioning by a specialist BMS commissioning engineer. A large commercial building (50,000m², 5,000 BMS points) may require 3–6 months. Commissioning involves point-to-point testing of every sensor and actuator, functional testing of all control sequences, integration testing with connected systems, operator training, and witnessed commissioning with the client. Allocate adequate commissioning time in the project programme — rushing commissioning produces a poorly performing system and expensive post-completion rectification.',
  },
  {
    question: 'What energy savings can a BMS deliver?',
    answer:
      'A well-commissioned and actively managed BMS typically reduces a commercial building\'s energy consumption by 15–30% compared to a building without automation. Savings come from several areas: HVAC scheduling (not running heating or cooling in unoccupied spaces or outside occupied hours), demand-controlled ventilation (reducing fan speeds when CO2 levels are low), lighting control (occupancy sensing and daylight harvesting), and fault detection (identifying equipment running inefficiently or outside normal parameters). Buildings where the BMS has been poorly commissioned or is not actively managed often see much lower savings or no benefit at all.',
  },
  {
    question: 'What qualifications are needed to work on a BMS?',
    answer:
      'BMS engineering is a specialist discipline. BMS design and commissioning engineers typically have a background in building services engineering, electrical or mechanical engineering, or controls engineering. Many major BMS manufacturers offer proprietary training and certification programmes (e.g., Trend Controls, Siemens Climatix, Honeywell). For the electrical installation elements — field wiring, panel wiring, sub-metering, sensor installation — a qualified electrician working under BS 7671 is required. The CIBSE (Chartered Institution of Building Services Engineers) publishes guidance on BMS design and commissioning (CIBSE AM16).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/smart-lighting-control',
    title: 'Smart Lighting Control Systems',
    description: 'DALI, KNX, and Lutron — scene setting, occupancy sensors, and BMS integration.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/data-cabling-installation',
    title: 'Data Cabling Installation',
    description: 'CAT6, structured cabling, and network infrastructure for BMS and smart buildings.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/access-control-installation',
    title: 'Access Control Installation',
    description: 'Door entry systems — keypad, fob, biometric, and video intercom.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/cctv-installation-electrical',
    title: 'CCTV Installation Electrical Requirements',
    description: 'PoE, CAT6, IP ratings, and power requirements for commercial CCTV.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote BMS electrical installation and controls work accurately.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-bms-does',
    heading: 'What a BMS Does',
    content: (
      <>
        <p>
          A Building Management System (BMS) is the central nervous system of a modern commercial
          building. It connects sensors, controllers, and actuators throughout the building to a
          supervisory computer system that monitors, controls, and logs the building's mechanical
          and electrical services.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monitoring and visualisation</strong> — the BMS provides a graphical
                display (SCADA interface or web dashboard) showing the real-time state of all
                controlled systems: room temperatures, air handling unit (AHU) status, chiller
                plant operation, lighting zone states, electrical sub-meter readings, and
                occupied/unoccupied status. Operators can view the building's systems from
                a single screen or remotely via a web browser.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic control</strong> — the BMS implements control sequences that
                operate the building's systems automatically in response to conditions. Examples:
                varying AHU supply air temperature based on outdoor temperature (weather
                compensation), switching to economy mode at night and weekends, modulating
                variable speed drives (VSDs) on pumps and fans based on demand, and controlling
                chiller sequencing to match cooling load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm management</strong> — the BMS monitors all points for alarm
                conditions (high/low temperature, equipment failure, sensor fault) and alerts
                the facilities management team via on-screen alarm, email, or SMS. Alarm
                management records help identify recurring faults and justify maintenance
                investment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data logging and reporting</strong> — the BMS logs all points at
                configurable intervals (typically every 5–15 minutes). Historical data is used
                for energy auditing, MEES compliance reporting, NABERS UK ratings, and fault
                analysis. Data logging is a mandatory requirement for buildings subject to
                energy-related legislation such as the Energy Savings Opportunity Scheme (ESOS).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hvac-integration',
    heading: 'HVAC Integration',
    content: (
      <>
        <p>
          HVAC control is typically the primary function of a BMS and represents the largest
          energy-saving opportunity. HVAC accounts for 40–60% of a commercial building's total
          energy consumption.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air handling units (AHUs)</strong> — the BMS controls AHU supply air
                temperature, fan speed (via VSD), heating and cooling coil valves, humidification,
                and heat recovery. Occupancy scheduling switches the AHU to minimum ventilation
                rate outside occupied hours. Demand-controlled ventilation uses CO2 sensors to
                modulate fresh air supply based on actual occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chiller plant</strong> — the BMS sequences multiple chillers to match
                the building's cooling load — running one chiller at high efficiency rather than
                two at partial load. Chiller sequencing and differential pressure control on
                chilled water circuits are programmed in the BMS controller.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Boiler plant</strong> — lead/lag boiler sequencing, weather compensation
                of flow temperature, and optimum start (starting the boiler the minimum time
                before occupancy to reach setpoint by start time) are all standard BMS functions
                that reduce gas consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VAV and FCU control</strong> — variable air volume (VAV) boxes and fan
                coil units (FCUs) in individual zones are controlled by local direct digital
                controllers (DDCs) that report to the BMS. Room temperature setpoints can be
                adjusted from the BMS supervisory interface without visiting each room.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metering',
    heading: 'Energy Metering',
    content: (
      <>
        <p>
          Sub-metering is the practice of installing electrical (and sometimes gas and water) meters
          at sub-distribution level to measure the energy consumption of individual systems,
          floors, or tenants. BMS integration of sub-meter data provides real-time energy visibility
          across the building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-metering strategy</strong> — as a minimum, meter the HVAC plant,
                lighting, and general power as separate circuits. For multi-tenant buildings,
                each tenant's supply should be separately metered. For MEES compliance and energy
                certification, meter by end use and by zone. The CIBSE TM39 guide provides
                detailed sub-metering strategy guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modbus sub-meters</strong> — most electrical sub-meters communicate via
                Modbus RTU over RS-485 or Modbus TCP over Ethernet. The BMS polls each meter
                at regular intervals (typically every 5–15 minutes) to retrieve kWh, kW, power
                factor, voltage, and current readings. Specify Modbus TCP (Ethernet) meters for
                new installations — simpler wiring and higher data reliability than RS-485.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-hourly data</strong> — for buildings with a maximum demand over
                100kVA, the Distribution Network Operator (DNO) requires half-hourly metering
                at the supply point. The BMS can integrate with the half-hourly data stream
                to monitor demand against the agreed capacity and implement demand management
                strategies to avoid peak demand charges.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting-control',
    heading: 'Lighting Control Integration',
    content: (
      <>
        <p>
          Smart lighting control systems (DALI, KNX, relay-based scene control) can be integrated
          into the BMS to provide a unified view of lighting status alongside HVAC and energy
          metering. The BMS can trigger lighting scenes based on occupancy, time of day, or
          external events.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI to BMS integration</strong> — a DALI gateway translates DALI status
                (luminaire levels, sensor outputs, fault conditions) into BACnet or Modbus
                objects readable by the BMS. The BMS can issue lighting commands (scene recall,
                group on/off) via the gateway. Luminaire fault alarms appear in the BMS alarm
                list alongside HVAC and metering alarms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupancy-driven HVAC and lighting coordination</strong> — where occupancy
                sensors drive both lighting and HVAC, the BMS integrates both signals. When a
                meeting room is unoccupied, the BMS can simultaneously switch off lighting and
                set the HVAC to setback temperature — maximising energy savings rather than having
                the two systems operate independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting monitoring</strong> — DALI Part 202 emergency drivers
                report their test results and battery status to the DALI controller. Via the
                BMS gateway, this data appears in the BMS — providing automated emergency
                lighting test records and immediate fault alerts without manual testing
                walkabouts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/smart-lighting-control">
            smart lighting control guide
          </SEOInternalLink>{' '}
          for a full explanation of DALI, KNX, and Lutron systems and their integration
          requirements.
        </p>
      </>
    ),
  },
  {
    id: 'access-control',
    heading: 'Access Control Integration',
    content: (
      <>
        <p>
          Integrating the access control system with the BMS enables occupancy-driven building
          automation — the building responds automatically to people entering and leaving,
          rather than relying on time-of-day schedules alone.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-in/last-out signals</strong> — the access control system sends a
                signal to the BMS when the first person enters the building in the morning
                (triggering HVAC and lighting start-up) and when the last person leaves
                (triggering HVAC setback, lighting off, and security mode). More reliable than
                fixed time schedules for buildings with variable occupancy patterns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone occupancy</strong> — in larger buildings, access control per floor
                or zone provides zone-level occupancy signals to the BMS. The HVAC system
                responds to actual zone occupancy rather than treating the whole building as
                occupied if any one person is present.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integration method</strong> — most modern access control systems provide
                an API or BACnet/Modbus interface for BMS integration. Alternatively, a dry
                contact relay output from the access control panel (triggered by first-in/last-out
                events) can be wired to a BMS digital input. The relay method is simpler but
                provides less granularity than a protocol-based integration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/access-control-installation">
            access control installation guide
          </SEOInternalLink>{' '}
          for a full explanation of access control system types and installation requirements.
        </p>
      </>
    ),
  },
  {
    id: 'protocols',
    heading: 'BACnet and Modbus Protocols',
    content: (
      <>
        <p>
          BACnet and Modbus are the two primary communication protocols used in UK building
          management systems. Understanding both is essential for specifying and commissioning
          BMS integrations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BACnet/IP</strong> — BACnet over Ethernet/IP is the standard for new
                commercial BMS installations. BACnet devices (DDCs, gateways, workstations)
                communicate over the building's IT network or a dedicated BMS IP network. BACnet
                supports device discovery (Who-Is/I-Am), object subscriptions (COV — Change of
                Value), and alarm notifications without polling. Specify a dedicated VLAN for
                the BMS network, separated from general IT traffic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BACnet MS/TP</strong> — BACnet over RS-485 serial bus. Used for field-level
                controllers (DDCs) that are too simple or too remote for Ethernet connectivity.
                A BACnet router bridges the MS/TP bus to BACnet/IP. Maximum bus length 1,200m
                at 76,800 baud; up to 128 devices per bus segment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modbus RTU (RS-485)</strong> — a simple master/slave serial protocol
                widely used for sub-meters, VSDs, UPS units, and other equipment. The BMS
                acts as the Modbus master and polls each slave device at regular intervals.
                RS-485 bus wiring: use 120-ohm termination resistors at each end of the bus;
                use a twisted-pair screened cable (Belden 9841 or equivalent); maximum bus
                length 1,200m.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modbus TCP</strong> — Modbus over Ethernet. Simpler to wire and more
                reliable than RS-485 for new installations. Most modern sub-meters and
                equipment support Modbus TCP. Preferred over Modbus RTU for new installations
                where Ethernet infrastructure is already present.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/data-cabling-installation">
            data cabling installation guide
          </SEOInternalLink>{' '}
          for structured cabling requirements that support BACnet/IP and Modbus TCP networks.
        </p>
      </>
    ),
  },
  {
    id: 'energy-monitoring',
    heading: 'Energy Monitoring and Reporting',
    content: (
      <>
        <p>
          Energy monitoring via the BMS provides the data needed for energy management, regulatory
          compliance, and carbon reduction reporting. Without reliable sub-meter data, energy
          management is guesswork.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Real-time energy dashboard</strong> — the BMS displays real-time power
                consumption (kW) and cumulative energy (kWh) by system and zone. Energy intensity
                (kWh/m² or kWh/occupant) can be displayed to normalise consumption for
                comparison across buildings or over time. Anomaly detection alerts the facilities
                team when consumption exceeds a baseline threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic reporting</strong> — the BMS scheduler generates monthly
                energy reports automatically, showing kWh by system, cost analysis (applying
                electricity tariffs to meter readings), and comparison to previous periods.
                Reports can be emailed to facility managers and uploaded to ESOS, SECR, or
                NABERS UK reporting platforms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault detection and diagnostics (FDD)</strong> — advanced BMS platforms
                include FDD algorithms that compare actual system performance to expected
                performance models. Faults such as a stuck heating valve (heating and cooling
                simultaneously), a faulty temperature sensor, or a chiller running below optimal
                coefficient of performance (COP) are identified automatically and flagged for
                investigation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'BMS Commissioning Process',
    content: (
      <>
        <p>
          BMS commissioning is a structured process that verifies every aspect of the system from
          individual field devices to the overall building control strategy. It is a specialist
          activity requiring experienced BMS commissioning engineers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 1: Point-to-point (P2P) testing</strong> — every sensor, actuator,
                and field device is tested individually. Temperature sensors are verified against
                a calibrated reference; valve actuators are stroked full open and full closed;
                fan status signals are verified. P2P test results are documented in a schedule
                with pass/fail status for each point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 2: Functional testing</strong> — control sequences are tested
                end-to-end. The commissioning engineer simulates conditions (overriding sensor
                inputs) to verify the BMS responds correctly — for example, a simulated high
                room temperature causes the cooling valve to open and the heating valve to close.
                Time schedules, alarms, and interlocks are all tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 3: Witnessed commissioning</strong> — the client or their appointed
                representative witnesses key functional tests. The commissioning report is signed
                off. As-built documentation, operator training, and O&amp;M manuals are provided.
                A post-commissioning monitoring period (typically 3–6 months for large systems)
                identifies issues that only become apparent under seasonal or varied occupancy
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal commissioning</strong> — for HVAC systems, full performance
                can only be verified under both heating and cooling conditions. A system
                commissioned in winter must be re-verified for cooling performance in summer.
                Allow for a seasonal commissioning visit in the contract, particularly for
                chiller plant and economiser control sequences.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: BMS Electrical Installation Work',
    content: (
      <>
        <p>
          Electricians play a key role in BMS projects — the electrical installation of field
          devices, control panels, BMS cabinets, sub-metering, and power supplies is electrical
          contracting work. Understanding the BMS context helps electricians work effectively
          alongside BMS engineers.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote BMS Electrical Work Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build accurate quotes for BMS electrical installation — sensor wiring,
                  BMS panel installation, sub-meter installation, Modbus RS-485 cable runs,
                  and power supply circuits. Include cable, containment, and commissioning
                  support in a professional PDF quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build M&E Contractor Relationships</h4>
                <p className="text-white text-sm leading-relaxed">
                  BMS projects are typically led by mechanical and electrical (M&E) contractors or
                  specialist BMS companies. Positioning your business as the preferred electrical
                  subcontractor for BMS and smart building projects — alongside{' '}
                  <SEOInternalLink href="/data-cabling-installation">
                    data cabling
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/smart-lighting-control">
                    lighting control
                  </SEOInternalLink>{' '}
                  work — increases average contract value significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage BMS and smart building projects with Elec-Mate"
          description="Quote, invoice, and track BMS electrical installation alongside your electrical contracting work. Professional PDF quotes and job management for UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BuildingManagementSystemPage() {
  return (
    <GuideTemplate
      title="Building Management Systems (BMS) UK | Electrical Integration Guide"
      description="Building Management Systems guide for UK electricians and building managers. What a BMS does, HVAC integration, energy metering, lighting control, access control integration, BACnet and Modbus protocols, energy monitoring, and commissioning process."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Building Systems Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Building Management Systems (BMS) UK:{' '}
          <span className="text-yellow-400">Electrical Integration Guide</span>
        </>
      }
      heroSubtitle="The complete UK guide to Building Management Systems — HVAC integration, energy sub-metering, smart lighting control, access control integration, BACnet and Modbus protocols, energy monitoring and reporting, and the BMS commissioning process."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Building Management Systems"
      relatedPages={relatedPages}
      ctaHeading="Quote BMS and Smart Building Electrical Work with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote and manage BMS, metering, and smart building electrical installations. Professional quotes in minutes. 7-day free trial."
    />
  );
}
