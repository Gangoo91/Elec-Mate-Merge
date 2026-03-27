import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Network,
  Building2,
  BarChart3,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'PoE Lighting', href: '/guides/poe-lighting-installation' },
];

const tocItems = [
  { id: 'overview', label: 'What Is PoE Lighting?' },
  { id: 'ieee-standard', label: 'IEEE 802.3bt (90W)' },
  { id: 'advantages', label: 'Advantages Over Traditional Lighting' },
  { id: 'cabling', label: 'Cat6/Cat6a Cabling Requirements' },
  { id: 'poe-switches', label: 'PoE Switches and Power Budget' },
  { id: 'commercial-applications', label: 'Commercial Applications' },
  { id: 'energy-monitoring', label: 'Energy Monitoring and Smart Building' },
  { id: 'bs7671', label: 'BS 7671 Considerations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Power over Ethernet (PoE) lighting delivers both power and data to LED luminaires via standard Ethernet cables (Cat6/Cat6a), eliminating the need for separate mains wiring to each light fitting.',
  'IEEE 802.3bt (Type 4) supports up to 90W per port — sufficient for most commercial LED luminaires which typically draw 15 to 60W. This standard uses all four pairs in the Ethernet cable.',
  'PoE lighting enables per-luminaire control, real-time energy monitoring, occupancy sensing, daylight harvesting, and integration with building management systems — all over the same cable.',
  'Cat6 cable supports PoE up to 100m (the standard Ethernet distance limit). Cat6a is recommended for new installations to provide headroom for higher power levels and future standards.',
  'BS 7671 applies to the mains power supply to the PoE switch/midspan, the earthing of network equipment, and the separation requirements between power and data circuits. The low-voltage PoE cabling itself operates at SELV levels.',
];

const faqs = [
  {
    question: 'What is Power over Ethernet (PoE) lighting?',
    answer:
      'PoE lighting is a system where LED luminaires receive both their electrical power and their control data over standard Ethernet cables (Cat6 or Cat6a). Instead of each light fitting being wired with mains voltage cable back to a lighting circuit in the distribution board, each luminaire connects to a PoE network switch via an Ethernet cable. The switch provides up to 90W of DC power per port, which is more than enough for most LED luminaires. The same cable carries data — allowing individual control of each luminaire, occupancy sensing, daylight harvesting, and real-time energy monitoring.',
  },
  {
    question: 'How much power can PoE deliver to a light fitting?',
    answer:
      'The latest PoE standard, IEEE 802.3bt (also called PoE++ or Type 4), delivers up to 90W per port. This uses all four twisted pairs in the Ethernet cable. Earlier standards delivered less: IEEE 802.3af (Type 1) provides up to 15.4W, IEEE 802.3at (Type 2, PoE+) provides up to 30W, and IEEE 802.3bt Type 3 provides up to 60W. For lighting, most commercial LED luminaires draw 15 to 60W, so IEEE 802.3bt Type 3 or Type 4 covers the vast majority of applications. Some higher-output luminaires or luminaires with integrated sensors may need the full 90W.',
  },
  {
    question: 'What type of cable is needed for PoE lighting?',
    answer:
      'Cat6 cable is the minimum for PoE lighting installations. Cat6 supports Gigabit Ethernet and PoE at up to 100 metres. Cat6a is recommended for new installations — it supports 10 Gigabit Ethernet and has better thermal performance when carrying higher PoE power levels (the cable heats up when carrying power, and Cat6a handles this better due to its larger conductor gauge and better shielding). Cat5e can technically carry PoE, but it is not recommended for new lighting installations due to thermal limitations at higher power levels. Always use solid-core cable for permanent installations (not stranded/patch cable).',
  },
  {
    question: 'Do I need to be an electrician to install PoE lighting?',
    answer:
      'The mains power supply to the PoE switch (and any associated distribution equipment) must be installed by a qualified electrician in compliance with BS 7671. The low-voltage Ethernet cabling from the switch to the luminaires operates at SELV (Safety Extra-Low Voltage) levels — typically 50 to 57V DC — and does not require a qualified electrician under the Electricity at Work Regulations. However, the structured cabling installation should be carried out by a competent data cabling installer to ensure performance standards are met. In practice, many PoE lighting projects are delivered by teams that include both electricians (for the mains supply and earthing) and data cabling specialists (for the structured cabling). Electricians who also hold data cabling qualifications are well-positioned for this market.',
  },
  {
    question: 'What is a PoE switch and how do you size it?',
    answer:
      'A PoE switch is a network switch that provides power to connected devices (in this case, luminaires) via the Ethernet ports. Each port can deliver a certain wattage (depending on the PoE standard supported). The key sizing consideration is the total power budget — the switch must have a power budget sufficient to power all connected luminaires simultaneously at their maximum draw. For example, 48 luminaires drawing 30W each need a switch with at least 1,440W total PoE budget. Switches are available in 8, 12, 24, and 48-port configurations with PoE budgets ranging from 120W to over 2,000W. The switch itself needs a mains power supply — typically a dedicated circuit from the distribution board.',
  },
  {
    question: 'How does PoE lighting integrate with building management systems?',
    answer:
      'Because every luminaire is an IP-addressable device on the network, PoE lighting integrates natively with building management systems (BMS) and smart building platforms. Each luminaire can report its status, power consumption, and sensor data (occupancy, light level, temperature) to the BMS in real time. The BMS can send commands to individual luminaires or groups — adjusting brightness, colour temperature, and scheduling. Common integration protocols include BACnet/IP, DALI-2, and RESTful APIs. This level of integration is extremely difficult with traditional mains-wired lighting and is one of the key advantages of PoE for commercial buildings.',
  },
  {
    question: 'What are the BS 7671 requirements for PoE installations?',
    answer:
      'BS 7671 applies to the mains supply side of the PoE installation — the circuits feeding the PoE switches, the earthing and bonding of the network equipment cabinets, and the separation of mains and data cabling. Regulation 528.3 requires separation of power and communications cables to reduce electromagnetic interference. Regulation 414.1 addresses protection by SELV and PELV, which applies to low-voltage PoE cabling. Functional earthing of network equipment is covered under Section 542. The low-voltage PoE cabling (50 to 57V DC) is classified as SELV and does not require the same level of protection as mains circuits, but the structured cabling must still be installed to the relevant data cabling standards (BS EN 50173, BS EN 50174).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-lighting',
    title: 'Commercial Lighting Guide',
    description: 'Traditional commercial lighting installation — compare with PoE approaches.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/data-cabling-installation',
    title: 'Data Cabling Installation',
    description: 'Structured cabling fundamentals that underpin PoE lighting installations.',
    icon: Network,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the mains supply circuits to PoE switches and network equipment.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for the mains supply to PoE equipment.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/smart-home-wiring',
    title: 'Smart Home Wiring Guide',
    description: 'PoE is increasingly used in residential smart home installations too.',
    icon: Wifi,
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
    heading: 'Power over Ethernet Lighting: What Electricians Need to Know',
    content: (
      <>
        <p>
          Power over Ethernet (PoE) lighting is transforming commercial and high-end residential
          lighting installations. Instead of running mains-voltage cables from a distribution board
          to each luminaire, PoE delivers both power and data to LED light fittings over standard
          Ethernet cables connected to network switches.
        </p>
        <p>
          This approach eliminates the need for traditional lighting circuits, dimmer modules, and
          separate control wiring. Every luminaire becomes an individually addressable, network-
          connected device — capable of being controlled, monitored, and managed from a software
          platform. Occupancy sensing, daylight harvesting, scheduling, energy monitoring, and
          integration with building management systems are all built in.
        </p>
        <p>
          For electricians, PoE lighting represents both a challenge and an opportunity. The mains
          supply to the network equipment still requires a qualified electrician, and understanding
          the technology positions you as a specialist in a growing market. This guide covers the
          standards, cabling, switches, applications, and the BS 7671 considerations.
        </p>
      </>
    ),
  },
  {
    id: 'ieee-standard',
    heading: 'IEEE 802.3bt: The 90W Standard',
    content: (
      <>
        <p>
          Power over Ethernet has evolved through several IEEE standards, each increasing the power
          available per port:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="overflow-x-auto">
            <div className="space-y-3 text-white">
              <div className="grid grid-cols-3 gap-4 font-bold border-b border-white/10 pb-2">
                <span>Standard</span>
                <span>Max Power</span>
                <span>Common Name</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span>IEEE 802.3af</span>
                <span>15.4W</span>
                <span>PoE (Type 1)</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span>IEEE 802.3at</span>
                <span>30W</span>
                <span>PoE+ (Type 2)</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span>IEEE 802.3bt</span>
                <span>60W</span>
                <span>PoE++ (Type 3)</span>
              </div>
              <div className="grid grid-cols-3 gap-4 font-bold text-yellow-400">
                <span>IEEE 802.3bt</span>
                <span>90W</span>
                <span>PoE++ (Type 4)</span>
              </div>
            </div>
          </div>
        </div>
        <p>
          IEEE 802.3bt Type 4 (90W) uses all four twisted pairs in the Ethernet cable to deliver
          power. At the Powered Device (PD) end — the luminaire — the available power is slightly
          less than 90W due to cable losses (typically 71W at the device for a Type 4 connection at
          100m). For most commercial LED luminaires drawing 15 to 60W, Type 3 or Type 4 provides
          ample power.
        </p>
        <p>
          The voltage on the cable is typically 50 to 57V DC — classified as Safety Extra-Low Voltage
          (SELV). This is a key safety advantage over mains-voltage lighting: there is no risk of
          lethal electric shock from the lighting cables, and the cabling does not require the same
          level of protection as mains circuits.
        </p>
      </>
    ),
  },
  {
    id: 'advantages',
    heading: 'Advantages Over Traditional Lighting',
    content: (
      <>
        <p>
          PoE lighting offers significant advantages in commercial environments:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced installation cost</strong> — Ethernet cable is cheaper to install
                than mains-voltage cable. No conduit, no fire-rated enclosures for the low-voltage
                cabling, no separate dimming or control wiring. In new-build commercial projects,
                PoE lighting can reduce total lighting installation costs by 20% to 40%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexibility</strong> — luminaires can be moved, added, or reconfigured by
                simply plugging into a different Ethernet port. No rewiring needed. This is
                particularly valuable in offices where layouts change frequently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-luminaire control</strong> — every luminaire is individually controllable
                from the network. Dimming, colour temperature, scheduling, scene setting, and
                emergency mode — all managed per fitting without additional wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integrated sensors</strong> — PoE luminaires can include occupancy sensors,
                ambient light sensors, and even Bluetooth beacons for indoor positioning. The sensor
                data travels over the same Ethernet cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy monitoring</strong> — real-time power consumption data per luminaire.
                Building managers can see exactly how much energy each light uses and optimise
                schedules and dimming profiles to reduce consumption. Typical energy savings of 50%
                to 75% compared to traditional fluorescent lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety</strong> — SELV voltage on the lighting cables means no risk of
                lethal shock. Cables can be handled safely without isolation. This reduces risk
                during installation, maintenance, and reconfiguration.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cabling',
    heading: 'Cat6/Cat6a Cabling Requirements',
    content: (
      <>
        <p>
          The structured cabling is the backbone of a PoE lighting installation. Cable selection and
          installation quality directly affect both performance and safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 vs Cat6a</strong> — Cat6 supports PoE at up to 100m and is adequate for
                most installations. Cat6a is recommended for new projects because it has larger
                conductors (23 AWG vs 24 AWG in some Cat6), better shielding, and lower resistance
                — which means less heat generation when carrying PoE power and less voltage drop
                over long runs. Cat6a also supports 10 Gigabit Ethernet for future-proofing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solid core</strong> — always use solid-core cable for permanent installations
                (not stranded patch cable). Solid core has lower DC resistance and better PoE
                performance. Stranded cable is for patch leads only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable bundling</strong> — when many PoE cables are bundled together (in cable
                trays or conduit), the current flowing through the cables generates heat. This
                increases the cable resistance and can reduce the available power at the luminaire.
                Limit bundle sizes or derate for bundling. Cat6a handles bundling better than Cat6
                due to its lower resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum distance</strong> — 100m from switch to luminaire (the standard
                Ethernet limit). This includes any patch leads. For larger buildings, multiple
                switches or intermediate distribution frames may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation standards</strong> — install to BS EN 50174 (information
                technology — cabling installation). Observe bend radius limits (4x cable diameter
                for Cat6, 8x for some Cat6a), avoid kinks, and do not exceed the maximum pull
                tension.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'poe-switches',
    heading: 'PoE Switches and Power Budget',
    content: (
      <>
        <p>
          The PoE switch is the power source for the lighting system. Selecting the right switch
          involves matching the port count, PoE standard, and total power budget to the luminaire
          requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Port count</strong> — switches are available in 8, 12, 24, and 48-port
                configurations. Each luminaire uses one port. Plan the port count with 20% spare
                capacity for future additions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total power budget</strong> — the switch has a maximum total PoE power
                budget. A 48-port switch with 30W per port needs a 1,440W budget. Check that the
                switch power budget exceeds the total simultaneous power draw of all connected
                luminaires (at maximum brightness, not just average).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Managed vs unmanaged</strong> — managed switches allow per-port power
                control, VLAN configuration, QoS, and integration with the lighting management
                platform. Always use managed switches for PoE lighting installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply</strong> — the switch itself needs a mains power supply. A
                48-port switch with a 1,440W PoE budget plus its own operating power may draw 7 to
                8A at 230V. This requires a dedicated circuit from the distribution board — sized
                and protected per BS 7671.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For larger installations, multiple switches are distributed across the building in
          intermediate distribution frames (IDFs) to keep cable runs within the 100m limit. Each IDF
          needs a mains supply — plan these during the building design phase.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-applications',
    heading: 'Commercial Applications',
    content: (
      <>
        <p>
          PoE lighting is most cost-effective in commercial environments where the benefits of
          individual control, energy monitoring, and flexibility are highest:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Offices</h3>
            <p className="text-white text-sm leading-relaxed">
              The primary market for PoE lighting. Open-plan offices benefit from per-desk lighting
              control, occupancy-based dimming (lights dim when desks are unoccupied), and daylight
              harvesting (lights reduce output when natural light is sufficient). Reconfiguration
              is easy when office layouts change — just move the Ethernet cable.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Retail</h3>
            <p className="text-white text-sm leading-relaxed">
              Retail environments use PoE lighting for dynamic scene setting — adjusting lighting
              colour temperature and intensity by zone throughout the day. Combined with Bluetooth
              beacons in the luminaires, PoE enables indoor positioning for customer analytics and
              wayfinding.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Healthcare</h3>
            <p className="text-white text-sm leading-relaxed">
              Hospitals and care homes use PoE for circadian lighting (adjusting colour temperature
              to support patient sleep patterns), nurse call integration, and asset tracking via
              Bluetooth beacons. The SELV voltage also reduces shock risk in patient areas.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Education</h3>
            <p className="text-white text-sm leading-relaxed">
              Schools and universities use PoE lighting for per-classroom control, exam mode
              (consistent lighting levels across exam halls), and energy reporting against carbon
              reduction targets. The flexibility of PoE supports room reconfiguration without
              rewiring.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'energy-monitoring',
    heading: 'Energy Monitoring and Smart Building Integration',
    content: (
      <>
        <p>
          One of the most compelling advantages of PoE lighting is the ability to monitor energy
          consumption per luminaire in real time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-luminaire metering</strong> — the PoE switch knows exactly how much
                power each port is delivering. This data is available in real time via the switch
                management interface or API, enabling per-luminaire energy accounting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupancy data</strong> — luminaires with integrated occupancy sensors
                report room utilisation data. This is valuable for facility managers — identifying
                underused spaces, optimising cleaning schedules, and informing space planning
                decisions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BMS integration</strong> — PoE lighting platforms integrate with building
                management systems via BACnet/IP, MQTT, or REST APIs. The lighting system becomes
                part of the building intelligence layer — coordinating with HVAC, blinds, and
                access control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon reporting</strong> — real-time energy data enables accurate carbon
                reporting for ESG compliance and BREEAM certification. Organisations can demonstrate
                quantified lighting energy reductions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671',
    heading: 'BS 7671 Considerations for PoE Installations',
    content: (
      <>
        <p>
          While the PoE cabling operates at SELV levels, BS 7671 applies to several aspects of the
          installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 528.3</strong> — requires separation of power and communications
                cables to reduce electromagnetic interference and ensure safety. Maintain the
                specified separation distances between mains cables and data cables in offices, data
                centres, and commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 414.1</strong> — addresses SELV/PELV protection requirements and
                functional earthing requirements for data and signalling circuits to prevent mains-
                derived touch voltages and mitigate shock risk to equipment users and maintenance
                staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 418.2.1</strong> — different circuit types and connected equipment
                (lighting, power, data) must be considered as potentially exposed or extraneous
                conductive parts. Segregation, insulation, and bonding decisions depend on the
                specific circuit and equipment context.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply to switches</strong> — the PoE switches require mains power
                circuits sized and protected per BS 7671. These circuits must have appropriate
                overcurrent protection, RCD protection where required, and clear labelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing of network equipment</strong> — PoE switches and network cabinets
                must be earthed to the main earthing terminal. Functional earth connections may also
                be required for shielded cabling systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The PoE cabling itself (Cat6/Cat6a carrying SELV voltage) does not require the same level
          of protection as mains circuits, but the installation must still comply with the relevant
          data cabling standards (BS EN 50173, BS EN 50174) and any fire performance requirements
          for cables in specific building types.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Getting Into PoE Lighting',
    content: (
      <>
        <p>
          PoE lighting is a growing market, particularly in commercial new-build and refurbishment
          projects. Electricians who understand both the mains supply and the data networking aspects
          are valuable to PoE lighting contractors and building services consultants.
        </p>
        <p>
          To enter this market, consider adding data cabling qualifications to your skillset (City
          and Guilds 3667, or vendor-specific certifications from Panduit, Leviton, or CommScope).
          Understanding networking fundamentals (IP addressing, VLANs, PoE switch configuration)
          also differentiates you from traditional electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the mains supply circuits to PoE switches and network equipment with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  .
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
                  Quote PoE lighting electrical work with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Mains supply circuits, switch installation, containment, and testing — all
                  itemised.
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
                  Complete the EIC for the mains supply circuits on site. AI board scanning, voice
                  test entry, and instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify PoE lighting mains supply"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Position yourself in the growing PoE lighting market. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PoELightingGuidePage() {
  return (
    <GuideTemplate
      title="Power over Ethernet Lighting | PoE Installation Guide"
      description="Complete guide to Power over Ethernet (PoE) lighting installation. IEEE 802.3bt (90W), Cat6/Cat6a cabling, PoE switches, commercial applications, energy monitoring, smart building integration, and BS 7671 considerations for data cabling."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emerging Technology"
      badgeIcon={Network}
      heroTitle={
        <>
          Power over Ethernet Lighting:{' '}
          <span className="text-yellow-400">PoE Installation Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="PoE lighting delivers power and data to LED luminaires over Ethernet cables. This guide covers IEEE 802.3bt, Cat6/Cat6a cabling, PoE switches, commercial applications, energy monitoring, smart building integration, and BS 7671 considerations."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About PoE Lighting"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify PoE Lighting Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates. Position yourself in the growing PoE lighting market. 7-day free trial, cancel anytime."
    />
  );
}
