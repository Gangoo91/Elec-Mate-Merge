import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Settings,
  Building2,
  PoundSterling,
  Shield,
  FileCheck2,
  ClipboardCheck,
  Wifi,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Systems', href: '/electrical-systems' },
  { label: 'Smart Lighting Control', href: '/smart-lighting-control' },
];

const tocItems = [
  { id: 'dali', label: 'DALI (Digital Addressable Lighting Interface)' },
  { id: 'knx', label: 'KNX Systems' },
  { id: 'lutron', label: 'Lutron Caseta & RA2' },
  { id: 'scene-setting', label: 'Scene Setting' },
  { id: 'occupancy-sensors', label: 'Occupancy Sensors & Daylight Harvesting' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Integration' },
  { id: 'retrofit-vs-newbuild', label: 'Retrofit vs New Build' },
  { id: 'costs', label: 'Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'DALI (Digital Addressable Lighting Interface, IEC 62386) is the open-protocol standard for intelligent lighting control in commercial buildings. Each DALI device has a unique address and can be individually dimmed, grouped, and monitored over a two-wire bus.',
  'KNX is a building automation standard (ISO/IEC 14543) that integrates lighting with HVAC, blind control, access control, and metering on a single bus. More complex to commission than DALI but provides whole-building integration.',
  'Lutron Caseta is the leading retrofit smart lighting system for domestic and small commercial applications; Lutron RadioRA 2 and RA 3 serve larger residential and boutique commercial projects where a proprietary but highly reliable system is preferred.',
  'Emergency lighting must not be controlled by scene or occupancy switching — BS 5266-1 requires maintained and non-maintained emergency luminaires to be independently wired and operational regardless of the smart lighting control system state.',
  'Daylight harvesting — reducing artificial light output as natural light increases — can reduce lighting energy consumption by 20–50% in buildings with good natural light. Requires a photocell (daylight sensor) correctly positioned to measure the relevant daylight contribution.',
];

const faqs = [
  {
    question: 'What is DALI and why is it used in commercial buildings?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is an open-protocol digital communication standard for lighting control defined in IEC 62386. Each DALI device (ballast, LED driver, sensor, or switch) has a unique digital address on a two-wire bus that carries both power and data. The DALI controller can individually address, dim, group, and monitor every device on the bus. Unlike analogue dimming (0–10V), DALI provides two-way communication — the controller can query a device\'s current level, fault status, and lamp hours. DALI is preferred for commercial buildings because it is open-protocol (not tied to a single manufacturer), scalable, and integrates easily with building management systems.',
  },
  {
    question: 'What is the difference between DALI and KNX?',
    answer:
      'DALI is a lighting-specific protocol. A DALI system controls luminaires, sensors, and switches within a lighting installation but does not natively integrate with HVAC, blinds, or access control. KNX is a whole-building automation protocol (ISO/IEC 14543) that integrates lighting alongside heating, ventilation, air conditioning, blind and shutter control, energy metering, and security systems on a single bus. A KNX system can control DALI lighting via a KNX-DALI gateway. For a pure lighting control project, DALI is simpler and more cost-effective. For a fully integrated building automation project, KNX (with DALI integration) is the preferred solution.',
  },
  {
    question: 'Is Lutron suitable for commercial buildings or just homes?',
    answer:
      'Lutron Caseta is designed for domestic and small commercial applications (up to about 75 devices). Lutron RadioRA 2 and the newer RA 3 are suitable for larger residential projects — hotels, high-end apartments, luxury retail — with up to 200 devices per system. For large commercial buildings, Lutron Vive is a scalable wireless lighting control platform designed for offices and commercial spaces. Lutron EcoSystem is Lutron\'s commercial DALI-compatible protocol used in larger installations. Lutron systems are proprietary but have an excellent reputation for reliability and support.',
  },
  {
    question: 'How does occupancy-based lighting control work?',
    answer:
      'Occupancy-based control uses PIR (Passive Infrared) or microwave sensors to detect the presence of people in a space and automatically switch or dim lights accordingly. When no occupancy is detected for a preset time-out period (typically 5–30 minutes), the system dims or switches off the lights. Some systems use a two-stage approach — dimming to 10–20% on no occupancy for a further timeout period before switching off completely. The sensors must be positioned to provide full coverage of the space, avoiding blind spots behind furniture or partitions. Occupancy control reduces lighting energy consumption in intermittently used spaces such as meeting rooms, toilets, and corridors.',
  },
  {
    question: 'What happens to emergency lighting when a smart control system switches off the lights?',
    answer:
      'Emergency lighting operates independently of the smart lighting control system. Under BS 5266-1, maintained emergency luminaires must remain illuminated whenever the building is occupied, and non-maintained emergency luminaires must operate automatically on mains failure regardless of the control system state. Smart lighting control must never be able to switch off emergency luminaires — these must be wired on a dedicated circuit that bypasses the control system entirely. A common installation error is connecting emergency luminaires to a DALI or relay-switched circuit — this is non-compliant and dangerous.',
  },
  {
    question: 'What is daylight harvesting and how is it commissioned?',
    answer:
      'Daylight harvesting is a control strategy that reduces artificial lighting output as natural daylight increases, maintaining a constant target illuminance level on the working plane. A photocell (daylight sensor) measures the combined natural and artificial light level. The control system calculates the artificial light required to maintain the target lux level (e.g., 500 lux for office work per BS EN 12464-1) and dims the luminaires accordingly. Commissioning requires setting the target lux level, calibrating the photocell position (it must measure the actual daylight contribution, not the direct artificial light output), and verifying the response across the dimming range. Re-commissioning may be needed seasonally as daylight angles change.',
  },
  {
    question: 'Can smart lighting be retrofitted to an existing building?',
    answer:
      'Yes, though the cost and complexity depend on the existing installation. Wireless systems (Lutron Caseta, Philips Hue for commercial, DALI wireless) can be retrofitted without new wiring — wireless controls replace existing switches and DALI LED drivers replace existing ballasts. Wired DALI systems require a two-wire DALI bus to each luminaire, which may mean significant rewiring in existing buildings. Relay-based scene control (replacing manual switches with smart relays in the distribution board) is a lower-cost retrofit option that allows basic on/off and scene control without replacing luminaires or running new data cables.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/building-management-system',
    title: 'Building Management Systems',
    description: 'BMS integration with lighting control, HVAC, metering, and access control.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/data-cabling-installation',
    title: 'Data Cabling Installation',
    description: 'CAT6, structured cabling standards, and network infrastructure for smart buildings.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-bs-5266',
    title: 'Emergency Lighting Guide (BS 5266)',
    description: 'Emergency lighting requirements, maintained vs non-maintained, testing schedules.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote smart lighting control jobs with the Elec-Mate quoting tool.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'The wiring regulations — key requirements for commercial lighting installations.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'dali',
    heading: 'DALI — Digital Addressable Lighting Interface',
    content: (
      <>
        <p>
          DALI (Digital Addressable Lighting Interface) is the open international standard for
          intelligent lighting control in commercial buildings, defined in IEC 62386. It has
          largely replaced analogue 0–10V dimming in new commercial lighting installations and is
          the protocol of choice for offices, retail, education, and healthcare.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How DALI works</strong> — a two-wire DALI bus (non-polarised, typically
                running on existing lighting wiring) connects all DALI devices (LED drivers,
                ballasts, sensors, switches, and relays). The DALI controller addresses each
                device individually using a unique address (0–63 per bus segment). Commands
                can target individual devices, groups of devices (up to 16 groups per bus),
                or all devices simultaneously. Each DALI bus segment supports up to 64 devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI-2 (IEC 62386 Part 2)</strong> — the updated standard that introduces
                mandatory interoperability testing. DALI-2 devices from different manufacturers
                are certified to work together, eliminating the interoperability issues occasionally
                seen with first-generation DALI products. Specify DALI-2 certified products for
                all new installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring and commissioning</strong> — the DALI bus can be wired in any
                topology (star, bus, ring, tree) up to a maximum cable length of approximately
                300 metres total bus length at 1.5mm² cable. The DALI bus runs at 16V DC with
                a maximum current of 250mA — it is a safety extra low voltage (SELV) circuit.
                Commissioning involves addressing each device, assigning groups and scenes, and
                configuring sensor thresholds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integration with BMS</strong> — DALI controllers can be integrated with
                a{' '}
                <SEOInternalLink href="/building-management-system">
                  Building Management System
                </SEOInternalLink>{' '}
                via BACnet, Modbus, or a gateway device. This allows lighting to be controlled
                as part of the overall building energy management strategy, with occupancy and
                lighting data visible in the BMS dashboard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'knx',
    heading: 'KNX Building Automation',
    content: (
      <>
        <p>
          KNX is the international open standard for home and building automation (ISO/IEC 14543),
          originally developed as EIB (European Installation Bus) in the 1990s. It integrates
          lighting, HVAC, shading, metering, and security systems on a single two-wire bus or
          IP backbone.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>KNX bus</strong> — a two-wire twisted pair bus (KNX TP) runs throughout
                the building, carrying both power (24V DC, 640mA per segment) and data. KNX
                devices (actuators, sensors, dimmers, switches) connect to the bus in any
                topology. A KNX installation can have up to 57,375 devices across multiple
                bus segments connected by line couplers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ETS software</strong> — KNX systems are configured using ETS (Engineering
                Tool Software), a proprietary tool supplied by the KNX Association. ETS is used
                to program group addresses, define device parameters, and download configurations
                to devices. KNX programming requires specialist training — the KNX Association
                offers a certification programme (KNX Basic, KNX Advanced).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>KNX IP</strong> — KNX over IP (KNXnet/IP) allows KNX devices to
                communicate over an Ethernet/IP backbone, which is useful for connecting
                KNX segments in different buildings or across large campuses. A KNX IP router
                bridges the TP bus to the IP network. Remote access and monitoring can be
                provided via a KNX IP interface and visualisation software.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to specify KNX</strong> — KNX is most cost-effective on large
                projects where whole-building integration is required from the outset. For a
                lighting-only project, DALI is simpler and more cost-effective. KNX's strength
                is integrating lighting with heating, cooling, shading, and metering in a
                single programmable system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lutron',
    heading: 'Lutron Caseta and RadioRA 2',
    content: (
      <>
        <p>
          Lutron is a US-based manufacturer with a strong reputation in the UK market for reliable,
          aesthetically refined lighting control systems. Unlike DALI and KNX (which are open
          protocols), Lutron systems are proprietary — all devices must be Lutron.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lutron Caseta</strong> — a wireless system for domestic and small
                commercial applications. Caseta uses Lutron's Clear Connect RF protocol for
                reliable wireless communication between dimmers, switches, sensors, and the
                SmartBridge hub. Caseta integrates with Amazon Alexa, Google Home, and Apple
                HomeKit. Maximum 75 devices per SmartBridge. Simple to install — retrofit
                existing switch positions without new wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lutron RadioRA 2</strong> — a larger residential and boutique commercial
                system supporting up to 200 devices per main repeater. Used in high-end
                residential, hotels, restaurants, and boutique retail. Supports complex scene
                programming, motorised shade integration, and third-party integration via
                IP/RS-232. Programming is carried out using Lutron's Designer software.
                Requires Lutron-authorised installer training.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lutron Vive</strong> — Lutron's commercial wireless lighting control
                platform for offices, education, and healthcare. Vive uses wireless area
                controllers and plug-load controllers to provide occupancy sensing, daylight
                harvesting, and scene control without new wiring. Suitable for open-plan offices
                and retrofits where wired control is not cost-effective.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scene-setting',
    heading: 'Scene Setting',
    content: (
      <>
        <p>
          Scene setting (or preset control) allows multiple luminaires to be set to predetermined
          levels with a single button press. Scenes transform a space for different activities
          without manual adjustment of individual luminaires.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common scene presets</strong> — meeting (full brightness on all zones),
                presentation (ambient low, projector screen area off), after-hours (perimeter
                security lighting only), cleaning (full brightness all zones), and off. Each
                scene stores a dimming level (0–100%) for each luminaire or group. DALI stores
                up to 16 scenes per bus segment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fade time</strong> — scenes transition with a fade time (typically
                0.7–5 seconds) to avoid harsh switching. A slow fade to a warmer evening scene
                improves occupant comfort. Most DALI and KNX controllers allow individual fade
                times per scene per group.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time-based scene scheduling</strong> — scenes can be triggered
                automatically at preset times via the controller's internal clock — for example,
                full morning brightness at 07:00, daylight harvesting mode at 09:00, evening
                mode at 18:00, and security mode at 22:00. Scheduling reduces reliance on
                occupants operating the system correctly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'occupancy-sensors',
    heading: 'Occupancy Sensors and Daylight Harvesting',
    content: (
      <>
        <p>
          Occupancy sensing and daylight harvesting are the two most impactful energy-saving
          strategies in a smart lighting installation. Together they can reduce lighting energy
          consumption by 30–60% in typical commercial buildings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PIR sensors</strong> — detect movement via changes in infrared radiation
                from body heat. Suitable for spaces where occupants move frequently (open offices,
                corridors, toilets). Coverage range: 6–12 metres diameter for ceiling-mounted
                sensors at 2.4 metres height. Avoid mounting near heat sources or air vents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Microwave/ultrasonic sensors</strong> — detect minor movements (typing,
                reading) that PIR sensors may miss. Better for spaces where occupants are
                stationary for long periods (private offices, meeting rooms). Higher false-alarm
                rate in spaces with HVAC air movement — adjust sensitivity accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daylight harvesting setup</strong> — position the photocell to measure
                the daylight contribution to the working plane, not the luminaire output directly
                above the sensor. In open-plan offices, position the photocell on the ceiling
                mid-zone between the perimeter (high daylight) and core (low daylight) areas.
                Set the target illuminance per BS EN 12464-1 (500 lux for general office work,
                750 lux for technical drawing, 300 lux for corridors).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Integration',
    content: (
      <>
        <p>
          Emergency lighting is a life-safety system governed by BS 5266-1 and must operate
          independently of the smart lighting control system. Understanding the boundary between
          the systems is critical for both compliance and commissioning.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency luminaires — independent wiring</strong> — emergency luminaires
                (maintained or non-maintained) must be wired on a dedicated circuit that is not
                controlled by any smart lighting system relay, DALI driver, or scene controller.
                The circuit must be live whenever the building is occupied (for maintained
                luminaires) and operational on mains failure (for non-maintained).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI emergency (IEC 62386 Part 202)</strong> — DALI Part 202 provides
                a framework for emergency luminaires within a DALI system. DALI emergency
                drivers include an integral battery, self-test capability, and can report their
                status (battery health, test result) to the DALI controller. The DALI emergency
                driver operates independently on mains failure — the DALI bus command cannot
                override emergency operation. This is the only compliant way to include emergency
                luminaires within a DALI system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery systems</strong> — larger buildings may use a central
                battery system (CBS) to power emergency luminaires. The CBS is completely
                independent of the normal lighting distribution. Where DALI is used for normal
                lighting, the emergency luminaires on the CBS circuit must not be connected to
                any DALI control output.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always include emergency luminaire wiring in the design at the start of the project —
          retrofitting emergency lighting into a completed smart lighting installation is costly
          and disruptive.
        </p>
      </>
    ),
  },
  {
    id: 'retrofit-vs-newbuild',
    heading: 'Retrofit vs New Build — System Selection',
    content: (
      <>
        <p>
          The choice of smart lighting system depends significantly on whether the building is
          new construction or a retrofit of an existing installation. Each scenario has different
          constraints and cost profiles.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New build — wired DALI or KNX</strong> — new construction allows wired
                systems to be installed before plastering and finishing. DALI is the standard
                choice for commercial lighting control. KNX is specified where whole-building
                automation is required. Run the DALI bus cable alongside the lighting circuit
                cable in the same containment. Budget for commissioning time — DALI and KNX
                commissioning is a significant element of the project programme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit — wireless systems or relay-based control</strong> — in occupied
                buildings, wireless systems (Lutron Vive, DALI wireless, Casambi) avoid the
                disruption of running new cables. Wireless DALI sensors replace wired sensors
                and communicate with DALI bus-connected wireless receivers. Relay-based scene
                control replaces existing switches with smart relays in the distribution board
                for basic on/off and scene control without replacing luminaires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire replacement</strong> — retrofitting smart control often
                provides the opportunity to replace existing luminaires with LED equivalents
                incorporating DALI drivers. Combining a LED retrofit with smart control delivers
                the highest energy savings — LED reduces consumption by 60–80% over fluorescent,
                and smart control delivers a further 20–50% reduction on the reduced LED baseline.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Smart Lighting Control Costs (2026)',
    content: (
      <>
        <p>
          Smart lighting control costs vary widely with protocol choice, number of devices,
          commissioning complexity, and whether the project is new build or retrofit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic scene control (relay-based)</strong> — £500–£2,000 for a small
                commercial space with push-button scene selection and time scheduling. Does not
                require DALI-compatible luminaires. Suitable for meeting rooms, reception areas,
                and small offices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI system</strong> — £50–£150 per luminaire for DALI driver, DALI bus
                cable, sensors, and commissioning. A 50-luminaire open-plan office system
                typically costs £5,000–£12,000 for a complete DALI installation including
                commissioning. Software and ongoing support may carry an annual licence fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>KNX system</strong> — £80–£200 per device plus £2,000–£5,000 for
                engineering and commissioning on a typical project. KNX is more expensive than
                DALI for lighting-only projects but provides whole-building integration value
                on larger commercial projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lutron Caseta (domestic/small commercial)</strong> — £60–£120 per
                dimmer or switch, plus £100–£300 for the SmartBridge hub. A four-room domestic
                system with 12 devices typically costs £800–£1,500 supplied and installed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smart Lighting Control Work',
    content: (
      <>
        <p>
          Smart lighting control is a growth area for UK electricians. Clients — commercial
          building owners, property developers, and facilities managers — are increasingly
          specifying intelligent lighting to meet energy efficiency targets and improve occupant
          experience.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Smart Lighting Projects Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build detailed quotes for DALI, KNX, and scene control installations.
                  Include DALI drivers, sensors, control panels, commissioning time, and
                  software licences in a professional PDF quote with accurate materials pricing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Upsell BMS Integration</h4>
                <p className="text-white text-sm leading-relaxed">
                  Smart lighting projects often lead naturally to wider{' '}
                  <SEOInternalLink href="/building-management-system">
                    Building Management System
                  </SEOInternalLink>{' '}
                  integration. Position yourself as the go-to contractor for intelligent building
                  systems — lighting, HVAC control, metering, and access control on a single
                  integrated platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your smart lighting and building controls business with Elec-Mate"
          description="Quote, invoice, and manage DALI, KNX, and smart lighting control projects with Elec-Mate. Accurate materials pricing and professional PDF quotes. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartLightingControlPage() {
  return (
    <GuideTemplate
      title="Smart Lighting Control Systems UK | DALI, KNX & Lutron Guide"
      description="Smart lighting control systems guide for the UK. DALI (IEC 62386), KNX, and Lutron Caseta/RA2 explained. Scene setting, occupancy sensors, daylight harvesting, emergency lighting integration under BS 5266, retrofit vs new build options, and costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Lighting Systems Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Smart Lighting Control Systems UK:{' '}
          <span className="text-yellow-400">DALI, KNX & Lutron Guide</span>
        </>
      }
      heroSubtitle="The complete UK guide to intelligent lighting control — DALI (IEC 62386), KNX, and Lutron systems explained. Scene setting, occupancy sensing, daylight harvesting, emergency lighting integration under BS 5266, retrofit vs new build options, and 2026 costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart Lighting Control Systems"
      relatedPages={relatedPages}
      ctaHeading="Quote Smart Lighting and Controls Projects with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote and manage DALI, KNX, and smart lighting installations. Professional PDF quotes in minutes. 7-day free trial."
    />
  );
}
