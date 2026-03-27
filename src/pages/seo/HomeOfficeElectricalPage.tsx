import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Monitor,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  Lightbulb,
  ClipboardCheck,
  Wifi,
  Usb,
  BatteryCharging,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Home Office Electrical Setup', href: '/guides/home-office-electrical-setup' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit' },
  { id: 'socket-layout', label: 'Socket Layout and Positioning' },
  { id: 'data-cabling', label: 'Data Cabling' },
  { id: 'usb-charging', label: 'USB-C Charging Points' },
  { id: 'lighting', label: 'Smart Lighting' },
  { id: 'ups', label: 'UPS Considerations' },
  { id: 'broadband', label: 'Broadband Backup Power' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'tools-materials', label: 'Tools and Materials' },
  { id: 'costs', label: 'Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A dedicated circuit for the home office prevents nuisance tripping from other household loads and provides a clean power supply for sensitive IT equipment. A 20A radial circuit in 2.5mm² with an RCBO is the standard approach.',
  'Socket positioning at desk height (approximately 700mm) eliminates trailing cables and makes connecting and disconnecting equipment safe and convenient. Plan the socket layout around the desk position, not the room walls.',
  'Cat6 or Cat6a data cabling provides reliable, high-speed networking that Wi-Fi cannot match — essential for video conferencing, large file transfers, and working with cloud-based applications. A single Cat6a run from the router to the office is a significant upgrade.',
  'USB-C charging sockets (built into the wall plate) provide convenient charging for laptops, phones, and tablets without dedicated charger plugs occupying socket outlets. Specify USB-C PD (Power Delivery) sockets that support up to 30W for laptop charging.',
  'Smart lighting with adjustable colour temperature (2700K warm to 5000K cool) supports productivity — cooler light for focused work, warmer light for video calls and evening hours. Dimming capability reduces eye strain during screen work.',
];

const faqs = [
  {
    question: 'Do I need a dedicated circuit for a home office?',
    answer:
      'A dedicated circuit is not a regulatory requirement, but it is strongly recommended. A home office typically runs a computer, monitor(s), printer, desk lamp, phone charger, and potentially a laser printer or other high-power peripherals. On a shared ring final circuit, a large appliance switching on elsewhere in the house (kettle, vacuum, hair dryer) can cause momentary voltage dips or nuisance RCD trips — both of which can disrupt work, cause data loss, and interrupt video calls. A dedicated 20A radial circuit from the consumer unit to the office provides a clean, reliable power supply. The cost is modest (£150 to £300 for the circuit alone) and the benefit to someone working from home full-time is significant.',
  },
  {
    question: 'Is Cat6 or Cat6a data cabling worth it for a home office?',
    answer:
      'Yes, if the home office is a permanent or semi-permanent setup. Wi-Fi is convenient but suffers from interference, congestion, and variable speeds — all of which are problematic during video conferences or large file transfers. A single Cat6 cable from the router to the office provides a reliable gigabit connection with consistent latency. Cat6a supports 10 gigabit ethernet and is recommended for future-proofing — the cost difference between Cat6 and Cat6a cable is small. The cable route is typically from the router position (usually the living room or hallway) through the loft or under the floor to the office. A wall-mounted RJ45 data plate in the office and another at the router end provides a clean, permanent installation.',
  },
  {
    question: 'What sockets should I put in a home office?',
    answer:
      'For a single-desk home office, provide a minimum of 3 double socket outlets at desk height (approximately 700mm from floor level, to align with the back of the desk). This gives 6 socket positions for: desktop computer or laptop charger, monitor(s), printer, desk lamp, phone charger, and a spare. Add a USB-C charging socket (either integrated into the wall plate or as a separate USB socket) for convenient device charging. At floor level, provide 1 to 2 additional double sockets for items like a paper shredder, heater, or UPS. If the office has a second desk or workstation, replicate the provision at that position.',
  },
  {
    question: 'Do I need Part P notification for home office electrical work?',
    answer:
      'It depends on the scope. Adding a spur to an existing ring final circuit for an extra socket is not notifiable (provided it does not involve a special location such as a kitchen or bathroom). However, installing a new dedicated circuit from the consumer unit is notifiable under Part P because it involves work at the consumer unit. If the work includes a new circuit, a registered electrician should carry it out and self-certify, or you must notify Building Control. In practice, most home office electrical upgrades involve at least one new circuit or consumer unit modification, making them notifiable.',
  },
  {
    question: 'What is the best lighting for a home office?',
    answer:
      'The ideal home office lighting combines natural light with adjustable artificial lighting. Position the desk perpendicular to the window to avoid glare and reflections on the screen. For artificial lighting, LED downlights or a surface-mounted LED panel providing 300 to 500 lux at desk level is the target. Use tuneable white LED fittings that allow colour temperature adjustment — cooler light (4000K to 5000K) for focused morning work, warmer light (2700K to 3000K) for video calls and evening sessions. A dedicated task light at the desk provides additional focused illumination without overhead glare. Dimming is essential — working at a screen in a brightly lit room causes eye strain. Install a dimmer switch or use smart dimmable fittings.',
  },
  {
    question: 'Should I install a UPS for my home office?',
    answer:
      'A UPS (Uninterruptible Power Supply) provides backup power during short outages and protects equipment from power surges and voltage dips. For a home office with a desktop computer, a 600VA to 1000VA line-interactive UPS provides 10 to 20 minutes of runtime — enough to save work and shut down gracefully. For a laptop-based setup, the laptop battery provides natural UPS functionality. The UPS plugs into a standard socket outlet and is not part of the fixed installation — no special electrical work is needed. However, the electrician should ensure the home office circuit has SPD (Surge Protective Device) protection at the consumer unit to complement the UPS surge protection.',
  },
  {
    question: 'How much does a home office electrical setup cost?',
    answer:
      'A basic home office electrical upgrade — additional sockets at desk height, USB-C charging point, and a task lighting point — costs £200 to £500 if the work is a simple extension of an existing circuit. A comprehensive setup — dedicated circuit from the consumer unit, 6+ sockets at desk height, Cat6a data run, smart dimmable lighting, and USB-C charging — costs £800 to £1,500. At the top end, a fully specified home office in a converted room — new circuit, multiple data points, smart lighting system, electric panel heater, and integrated USB-C charging throughout — can cost £1,200 to £1,500. These prices include materials, labour, and any required certification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the dedicated office circuit with automatic derating and voltage drop calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on the office circuit — particularly for longer runs to upstairs rooms.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue an Electrical Installation Certificate or Minor Works Certificate for the new circuit.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Price home office electrical upgrades with itemised materials and labour costs.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/garage-conversion-electrics',
    title: 'Garage Conversion Electrics',
    description:
      'Converting a garage to a home office? Full guide to electrical requirements for habitable rooms.',
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
    heading: 'Home Office Electrical Setup: What You Need to Know',
    content: (
      <>
        <p>
          The shift to remote and hybrid working has made the home office one of the most common
          electrical upgrade requests in UK domestic work. Homeowners who previously made do with a
          laptop on the kitchen table now want a properly equipped, permanent workspace with reliable
          power, good lighting, and wired networking.
        </p>
        <p>
          A well-designed home office electrical setup makes a real difference to productivity,
          comfort, and equipment reliability. It also adds value to the property — estate agents
          increasingly list a dedicated home office as a selling point. The work ranges from a simple
          socket upgrade (£200) to a comprehensive room fit-out with dedicated circuits, data
          cabling, smart lighting, and integrated charging (£1,500).
        </p>
        <p>
          This guide covers the electrical requirements for a home office, from dedicated circuits
          and socket layout to data cabling, USB-C charging, smart lighting, and UPS considerations.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit for the Home Office',
    content: (
      <>
        <p>
          A dedicated circuit from the consumer unit to the home office is the foundation of a
          reliable setup. The benefits are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation from household loads</strong> — a kettle, vacuum cleaner, or hair
                dryer switching on elsewhere in the house cannot cause a voltage dip or RCD trip on
                the office circuit. This prevents unexpected shutdowns, data loss, and interrupted
                video calls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adequate capacity</strong> — a modern home office can draw 500W to 1500W
                continuously (desktop computer, monitors, printer, desk lamp, phone charger, heater
                in winter). A dedicated 20A radial in 2.5mm² provides ample capacity without loading
                a shared ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD protection</strong> — the dedicated circuit can have Surge Protective
                Device (SPD) protection at the consumer unit, providing an additional layer of
                protection for sensitive IT equipment against transient overvoltages.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The circuit is typically a 20A radial in 2.5mm² twin and earth, protected by an RCBO at
          the consumer unit. If the consumer unit has no spare ways, a new RCBO way can usually be
          added, or the consumer unit may need upgrading. The cable route depends on the office
          location — typically through the loft and down through the wall, or under the floor from
          the consumer unit.
        </p>
      </>
    ),
  },
  {
    id: 'socket-layout',
    heading: 'Socket Layout and Ergonomic Positioning',
    content: (
      <>
        <p>
          Socket positioning is the single most impactful design decision in a home office
          installation. Standard sockets at 300mm from the floor are poorly suited to a desk
          environment — they force cables behind the desk, require bending to plug and unplug, and
          create a tangle of trailing leads.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Desk-height sockets (700mm)</strong> — install 2 to 3 double socket outlets
                at approximately 700mm from floor level, aligned with the back edge of the desk.
                This puts the sockets at the same height as the desk surface, making them accessible
                without moving the desk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor-level sockets</strong> — provide 1 to 2 double sockets at standard
                height (300mm) for items stored under or beside the desk — UPS, paper shredder,
                heater, or vacuum charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan around the desk</strong> — ask the customer where the desk will be
                positioned before installing sockets. The socket cluster should be directly behind
                the desk, not on a different wall requiring extension leads across the room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum provision</strong> — 3 double sockets at desk height (6 positions)
                plus 1 double at floor level. This accommodates: computer/laptop charger, monitor(s),
                printer, desk lamp, phone charger, and a spare.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'data-cabling',
    heading: 'Data Cabling (Cat6 / Cat6a)',
    content: (
      <>
        <p>
          Wired ethernet is a significant upgrade over Wi-Fi for anyone working from home full-time.
          Wi-Fi is affected by interference from neighbouring networks, microwave ovens, Bluetooth
          devices, and structural elements in the building. A wired Cat6 or Cat6a connection provides
          consistent speed, low latency, and zero dropouts.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cat6</h3>
            <p className="text-white text-sm leading-relaxed">
              Supports gigabit ethernet (1 Gbps) at up to 100 metres. Adequate for current broadband
              speeds and local network file transfers. Lower cost than Cat6a. The standard choice for
              most home office installations.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cat6a</h3>
            <p className="text-white text-sm leading-relaxed">
              Supports 10 gigabit ethernet (10 Gbps) at up to 100 metres. Future-proofs the
              installation for faster broadband and local network speeds. The cable is slightly
              thicker and stiffer but the cost difference is modest — typically £10 to £20 more per
              run. Recommended for new installations.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route</strong> — typically from the router position (living room, hallway, or
                under the stairs) through the loft or under the floor to the office. Avoid running
                data cable parallel to mains cable in the same void — maintain at least 50mm
                separation or use crossovers at 90 degrees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination</strong> — wall-mounted RJ45 data plates at both ends. Use a
                keystone jack module in a standard back box for a clean finish. Terminate to T568B
                standard at both ends. Test with a cable tester to verify all 8 wires are correctly
                paired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple runs</strong> — if the customer has two desks or wants a network
                point for a NAS (Network Attached Storage) or IP phone, run two or three Cat6a cables
                in the same route. The incremental cost of additional cables during installation is
                small compared to retrofitting later.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'usb-charging',
    heading: 'USB-C Charging Points',
    content: (
      <>
        <p>
          USB-C charging sockets integrated into the wall plate are a practical addition to any home
          office. They provide convenient charging for phones, tablets, and even laptops without
          occupying a standard socket outlet with a charger plug.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Usb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB-C PD (Power Delivery)</strong> — specify USB-C sockets that support Power
                Delivery at 30W or higher. This is enough to charge a phone quickly and can slow-
                charge most laptops. Standard USB-A outlets (5V, 2.1A) are adequate for phones but
                cannot charge laptops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Usb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined socket plates</strong> — double socket outlets with integrated USB-C
                ports are available from most accessory manufacturers. These fit in a standard double
                back box and provide two 13A sockets plus USB-C charging in a single face plate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Usb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Positioning</strong> — install USB-C sockets at desk height alongside the
                standard socket outlets. This places the charging point where the phone or tablet
                naturally rests during work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Smart Lighting for Productivity',
    content: (
      <>
        <p>
          Lighting has a measurable impact on productivity, concentration, and wellbeing. A well-
          designed home office lighting scheme goes beyond a single ceiling pendant:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tuneable white LED</strong> — fittings with adjustable colour temperature
                (2700K to 5000K) allow the light to match the time of day and task. Cooler light
                (4000K to 5000K) promotes alertness during morning focus work. Warmer light (2700K to
                3000K) is more comfortable for video calls and evening sessions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimming</strong> — essential for a room with a screen. Full brightness
                overhead lighting causes eye strain when working at a monitor. A dimmer allows the
                user to set the ambient light level to complement the screen brightness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Task lighting point</strong> — provide a switched socket or fused spur at
                desk height for a desk lamp. A good desk lamp with adjustable brightness and colour
                temperature is the single most effective lighting addition for screen work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Video call lighting</strong> — for regular video conferencing, position a
                light source in front of the user (behind the screen, not behind the user). A wall-
                mounted LED panel or a switched socket for a ring light at the desk provides
                consistent, flattering illumination on camera.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ups',
    heading: 'UPS Considerations',
    content: (
      <>
        <p>
          A UPS (Uninterruptible Power Supply) provides short-term battery backup during power cuts
          and protection against surges and voltage dips. For home office users, the UPS is a
          plug-in device rather than part of the fixed installation, but the electrician should
          advise on it:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Desktop PC users</strong> — a 600VA to 1000VA line-interactive UPS provides
                10 to 20 minutes of runtime for a desktop computer and monitor. This is enough to
                save work and shut down gracefully during a power cut. Cost: £60 to £120.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Laptop users</strong> — the laptop battery provides natural UPS functionality.
                A UPS is less critical but still useful for the monitor, router, and peripherals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD at the consumer unit</strong> — complement any plug-in UPS with a Type 2
                Surge Protective Device (SPD) at the consumer unit on the office circuit. This
                provides whole-circuit protection against transient overvoltages from lightning or
                switching surges on the grid.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'broadband',
    heading: 'Broadband Backup Power',
    content: (
      <>
        <p>
          A power cut does not just affect the computer — it also kills the broadband router, ending
          internet access immediately. For home workers who rely on cloud-based tools and video
          conferencing, maintaining broadband during a short outage is as important as keeping the
          computer running.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Router on UPS</strong> — the simplest approach is to plug the broadband
                router into the UPS alongside the computer. A typical router draws 10W to 20W, adding
                minimal load to the UPS but extending broadband availability for hours during a power
                cut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated router socket</strong> — if the router is not in the office, the
                electrician can install a socket at the router position on the same dedicated office
                circuit (or a separate dedicated circuit) so the router benefits from the same SPD
                protection and can share a UPS at that location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mobile hotspot fallback</strong> — for truly business-critical connectivity,
                advise the customer to have a 4G/5G mobile hotspot or phone tethering as a backup.
                This is a user-level solution rather than an electrical installation, but it
                completes the resilience picture.
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
          If the home office work involves a new circuit from the consumer unit, it is notifiable
          under Part P and requires certification. The appropriate certificate depends on the scope:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuit from consumer unit</strong> — an{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                or{' '}
                <SEOInternalLink href="/tools/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>{' '}
                is required. Test continuity, insulation resistance, polarity, earth fault loop
                impedance, RCD operation, and prospective fault current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional sockets on existing circuit</strong> — if the work is limited to
                adding sockets to an existing circuit (no consumer unit work), a Minor Works
                Certificate is appropriate. Test the existing circuit to confirm it remains compliant
                after the alteration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data cabling</strong> — data cabling is not covered by BS 7671 (it is extra-
                low voltage), but it should be tested with a cable tester to verify all 8 wires are
                correctly terminated and paired. Provide the customer with a test report for the data
                runs.
              </span>
            </li>
          </ul>
        </div>
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
              <li>Drill and bits (wood and masonry)</li>
              <li>Cable detector</li>
              <li>Cable strippers and cutters</li>
              <li>Fish tape / draw wire</li>
              <li>Multimeter and continuity tester</li>
              <li>Insulation resistance tester</li>
              <li>RCD tester</li>
              <li>RJ45 crimping tool and punch-down tool</li>
              <li>Network cable tester</li>
              <li>Hole saw (for back boxes)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Materials Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>2.5mm² twin and earth cable (for dedicated circuit)</li>
              <li>RCBO for consumer unit</li>
              <li>Double socket outlets with USB-C (desk height)</li>
              <li>Standard double socket outlets (floor level)</li>
              <li>Metal back boxes (35mm or 47mm depth)</li>
              <li>Cat6a data cable</li>
              <li>RJ45 keystone jack modules</li>
              <li>Data face plates</li>
              <li>LED downlights (dimmable, tuneable white)</li>
              <li>Dimmer switch (trailing-edge LED compatible)</li>
              <li>Cable clips, trunking, and conduit</li>
              <li>SPD (Type 2) if not already fitted at consumer unit</li>
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
        <p>
          Home office electrical costs vary with the scope of work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic upgrade</strong> — 2 additional double sockets at desk height on
                existing circuit: £200 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard setup</strong> — dedicated 20A circuit, 3 doubles at desk height
                with USB-C, 1 double at floor level, single Cat6a data run: £600 to £900.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Comprehensive setup</strong> — dedicated circuit, 4+ doubles with USB-C,
                multiple Cat6a runs, smart dimmable lighting, SPD at consumer unit: £900 to £1,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add-ons</strong> — Cat6a data run (per point): £80 to £150. USB-C PD socket
                upgrade (per double): £15 to £30 premium over standard. Smart dimmer switch: £30 to
                £60. Consumer unit upgrade (if no spare ways): £300 to £500.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Home Office Work Is Steady and Profitable',
    content: (
      <>
        <p>
          Home office electrical upgrades are high-volume, quick-turnaround domestic work. The
          average job takes half a day and is worth £400 to £1,000. The customer base is large and
          growing — millions of UK workers now work from home at least part-time, and many want a
          professional electrical setup.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quick Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the home office setup with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Dedicated circuit, sockets, data cabling, lighting — all itemised. Send a
                  professional PDF quote from the survey visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works or EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Minor Works Certificate or EIC on site after testing. Instant PDF
                  export. Send the certificate to the customer before you leave. Professional
                  documentation builds trust and generates referrals.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify home office electrical work"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting and on-site certification. Quick, clean documentation for domestic electrical upgrades. 7-day free trial."
          icon={Monitor}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HomeOfficeElectricalPage() {
  return (
    <GuideTemplate
      title="Home Office Electrical Setup | Wiring & Power Guide"
      description="Complete guide to home office electrical setup in the UK. Dedicated circuits, ergonomic socket placement, Cat6/Cat6a data cabling, USB-C charging points, smart lighting, UPS considerations, and broadband backup power with 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Monitor}
      heroTitle={
        <>
          Home Office Electrical Setup:{' '}
          <span className="text-yellow-400">Wiring and Power Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about home office electrical installations — dedicated circuits, desk-height sockets, Cat6a data cabling, USB-C charging, smart lighting, UPS, and broadband backup power. Realistic 2026 UK pricing from £200 to £1,500."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home Office Electrical Setup"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Home Office Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional quoting and on-site certification. 7-day free trial, cancel anytime."
    />
  );
}
