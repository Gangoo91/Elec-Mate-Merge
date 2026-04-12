import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  Home,
  ShieldCheck,
  PoundSterling,
  Wifi,
  Car,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Garden Room Guides', href: '/garden-room-electrical' },
  { label: 'Garden Room Electrical Installation', href: '/garden-room-electrical' },
];

const tocItems = [
  { id: 'dedicated-circuit-or-sub-board', label: 'Dedicated Circuit or Sub-Board?' },
  { id: 'cable-sizing-for-distance', label: 'Cable Sizing for Distance' },
  { id: 'ev-charging', label: 'EV Charging Consideration' },
  { id: 'internet-and-data', label: 'Internet and Data Infrastructure' },
  { id: 'insulation-and-consumer-unit', label: 'Insulation and Consumer Unit Options' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A garden room used as a home office or studio requires a properly designed electrical installation — not a socket from the house on an extension lead. SWA armoured cable must be buried in a trench between the house and the garden room.',
  'For garden rooms up to approximately 30 metres from the house with modest electrical loads (lighting, sockets, no heavy heating), 6mm² three-core SWA is typically the correct cable. Beyond 30 metres, 10mm² or larger is required to keep voltage drop within BS 7671 limits.',
  'If EV charging is planned at the garden room (for example, in a driveway adjacent to the garden room), this must be included in the electrical design from the start — a 7kW EV charger requires a dedicated 32A circuit and significantly increases the cable and sub-board specification.',
  'Internet connectivity for a garden room home office should be planned at first fix — CAT6 ethernet cable and conduit for future cabling runs cost very little when installed during the electrical first fix but are expensive and disruptive to add retrospectively.',
  'All garden room electrical installation work is notifiable under Part P of the Building Regulations 2010. A TT earthing system with a local earth electrode is required in virtually all cases, and an Electrical Installation Certificate (EIC) must be issued on completion.',
];

const faqs = [
  {
    question: 'Do I need a sub-board in my garden room?',
    answer:
      'If the garden room has more than one circuit — for example, separate lighting and socket circuits — a sub-distribution board (consumer unit) in the garden room is required. The sub-board provides a local main isolator, individual circuit protection, and RCD protection for each circuit. It also makes fault-finding and maintenance much simpler. For a very simple garden room with only one circuit (for example, a single lighting and socket circuit on one MCB with RCD protection), a single-way consumer unit or a fused connection unit with RCD is technically acceptable, but a proper sub-board is always the better solution.',
  },
  {
    question: 'How far can electricity travel to a garden room without voltage drop issues?',
    answer:
      'The maximum permissible voltage drop from the consumer unit to any point in a circuit is 3% for lighting and 5% for power under BS 7671 Section 525. In practice, for a 6mm² cable feeding a garden room sub-board with a 32A protective device, the maximum run before voltage drop becomes an issue is approximately 35 metres. For longer runs, 10mm² or 16mm² cable is required. Your electrician will calculate the correct cable size for your specific installation based on the distance, the load, and the protective device rating.',
  },
  {
    question: 'Can I add an EV charger to my garden room electrical installation?',
    answer:
      'Yes, but it must be planned from the start. A 7kW EV charger draws up to 32A continuously, which is a significant load. The SWA cable from the house must be sized to supply both the garden room loads and the EV charger — this typically means 16mm² or 25mm² SWA rather than 6mm². The EV charger requires a dedicated 32A circuit with its own RCBO in the garden room sub-board. EV charger installations are also subject to BS 7671 Section 722 (Electric Vehicle Charging Installations) and must comply with The Electric Vehicles (Smart Charge Points) Regulations 2021.',
  },
  {
    question: 'What internet connection options work for a garden room home office?',
    answer:
      'The most reliable option is a hardwired ethernet connection — CAT6 cable run in conduit alongside or within the SWA cable trench. At the house end, the cable connects to the router or a network switch. At the garden room end, it terminates in a standard ethernet socket. This provides gigabit-speed internet without the reliability issues of Wi-Fi. Wi-Fi extenders and powerline adapters are alternatives but are less reliable for video conferencing and large file transfers. Run the CAT6 conduit during electrical first fix — it costs very little extra.',
  },
  {
    question: 'Do I need planning permission to wire a garden room?',
    answer:
      'The electrical installation is controlled by Part P of the Building Regulations, not planning permission. Whether the garden room structure itself requires planning permission depends on its size, height, proximity to boundaries, and whether the property is in a conservation area or has Article 4 directions in force. Many garden rooms are permitted development. The electrical installation requires Part P notification regardless of whether planning permission was needed for the building.',
  },
  {
    question: 'Can I use a normal extension lead to power my garden room temporarily?',
    answer:
      'No — not even temporarily. Extension leads are not designed for permanent outdoor use, are not compliant with BS 7671 for fixed installations, and present a real fire and electric shock risk. A temporary supply while the garden room is being built can be provided using a properly terminated outdoor socket on the house, but this must be a fixed outdoor socket, not a socket extended into the garden via a cable run across the ground. The permanent installation must be completed before the garden room is occupied.',
  },
  {
    question: 'What is the best consumer unit for a garden room?',
    answer:
      'A modern metal consumer unit with RCBO protection for each circuit (rather than a dual-RCD board) is the best choice for a garden room. RCBOs provide individual RCD and overcurrent protection per circuit — if one circuit trips, the rest of the board remains live. This is particularly useful in a home office where a fault in the electric heater should not also take out the lighting and computer circuits. The consumer unit must have a non-combustible enclosure under Regulation 421.1.201 of BS 7671 — metal is the standard choice.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/outbuilding-electrical-installation',
    title: 'Outbuilding Electrical Installation',
    description: 'SWA armoured cable, trench depth, sub-board, and TT earthing for outbuildings.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/garage-conversion-electrical',
    title: 'Garage Conversion Electrical Work',
    description: 'Upgrading from garage supply to habitable room standard — full wiring guide.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/house-extension-electrical-guide',
    title: 'House Extension Electrical Guide',
    description: 'Circuit planning, consumer unit checks, Part P, and EIC for house extensions.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current wiring regulations for UK electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'dedicated-circuit-or-sub-board',
    heading: 'Dedicated Circuit from the House or Sub-Board in the Garden Room?',
    content: (
      <>
        <p>
          The first design decision for a garden room electrical installation is whether to run a
          single circuit from the house to the garden room (powering everything from one protective
          device) or to install a sub-board in the garden room with individual circuits for
          lighting, sockets, and heating.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated single circuit — when appropriate</strong> — for a very small
                garden room (a simple writing shed or storage room with minimal electrical
                requirements), a single circuit with RCD protection feeding one or two sockets and a
                lighting point may be sufficient. However, this is the minimum acceptable solution
                and limits future flexibility significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-board — the recommended approach</strong> — for any garden room intended
                as a home office, studio, or habitable space, a sub-board is the correct solution.
                It provides individual circuit protection (so a heater fault does not take out the
                lighting), a local main isolator, and room to add circuits in the future without
                returning to the house consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical circuits in a garden room sub-board</strong> — a well-specified
                garden room installation includes: one lighting circuit, one or two socket-outlet
                circuits, a dedicated heating circuit (for electric panel heaters or underfloor
                heating), and a spare way for future use. If an EV charger is planned, an additional
                32A circuit is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The sub-board in the garden room must be protected by the main protective device in the
          house consumer unit. The SWA cable feeding the sub-board must be rated to carry the total
          maximum demand of all circuits in the garden room simultaneously, with the rating
          determined by the cable's current-carrying capacity under BS 7671 Appendix 4.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing-for-distance',
    heading: 'Cable Sizing for Distance: Getting the Voltage Drop Right',
    content: (
      <>
        <p>
          Voltage drop is the reduction in voltage that occurs as current flows through a cable. In
          a long cable run from the house to a garden room, voltage drop can reduce the voltage at
          the garden room to below the acceptable minimum, causing equipment to operate
          inefficiently or fail to start.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 voltage drop limits</strong> — under Section 525 of BS 7671, the
                voltage drop from the origin of the installation (the main consumer unit) to any
                point must not exceed 3% (6.9V) for lighting circuits and 5% (11.5V) for power
                circuits. For a garden room sub-board, the 5% limit applies to the SWA feed cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical cable sizes by distance</strong> — for a typical garden room with
                a 32A sub-board feed (lighting, sockets, heating), the minimum cable sizes are
                approximately: up to 20 metres — 6mm² SWA; 20 to 35 metres — 10mm² SWA; 35 to 60
                metres — 16mm² SWA. These are indicative values — your electrician must calculate
                the exact voltage drop for the specific installation load and cable route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance</strong> — as well as voltage drop, the cable
                length affects the earth fault loop impedance. For longer runs, the measured Zs may
                exceed the maximum permitted for the protective device in the house consumer unit.
                Where this is the case, the protective device rating or cable size must be adjusted,
                or a local RCD relied upon for additional protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging Consideration for Garden Rooms',
    content: (
      <>
        <p>
          Many garden room installations are adjacent to a driveway, and homeowners increasingly
          want to combine the garden room electrical installation with an electric vehicle charging
          point. Planning for EV charging at the design stage is far more cost-effective than adding
          it retrospectively.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load impact</strong> — a 7kW single-phase EV charger draws up to 32A
                continuously. Adding this to a garden room installation that also has lighting,
                sockets, and heating significantly increases the total load. The SWA cable from the
                house must be sized for the combined maximum demand — typically 16mm² or 25mm²
                rather than 6mm².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the EV charger requires a dedicated 32A circuit
                from the garden room sub-board (or from the house consumer unit if the charger is
                closer to the house). Under BS 7671 Section 722, the circuit must include
                appropriate overcurrent protection, and the charger must comply with The Electric
                Vehicles (Smart Charge Points) Regulations 2021, which requires smart charging
                capability (load management and remote control).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger earthing</strong> — under BS 7671 Regulation 722.411.4, EV
                charger installations require a protective earth connection and may require a
                Protective Earth-Neutral (PEN) fault protection device. For TT-earthed garden room
                installations, a separate RCD on the EV charger circuit provides the required
                protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If EV charging is a future possibility, ask your electrician to install a 25mm² SWA feed
          cable and a sub-board with a spare 32A way at the initial installation. The additional
          cost is modest compared to the cost of replacing a correctly sized cable later.
        </p>
      </>
    ),
  },
  {
    id: 'internet-and-data',
    heading: 'Internet and Data Infrastructure for Garden Room Home Offices',
    content: (
      <>
        <p>
          For a garden room used as a home office, reliable internet connectivity is as important as
          the electrical supply. Planning data infrastructure at the same time as the electrical
          installation saves significant money and disruption.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6 ethernet — the reliable option</strong> — a CAT6 ethernet cable run in
                conduit alongside or within the SWA cable trench provides a permanent, gigabit-speed
                internet connection. At the house end, the cable connects to the router or a network
                switch. At the garden room end, a flush-mounted ethernet socket provides a clean
                installation. This is the recommended solution for anyone working from home who
                relies on video conferencing or large file transfers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit for future cabling</strong> — even if a CAT6 cable is not installed
                immediately, run an empty 32mm conduit in the trench. This allows future data cables
                (or additional ethernet cables) to be pulled through without excavating the garden
                again. The cost of the conduit is negligible; the cost of re-excavating the garden
                is not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wi-Fi mesh systems</strong> — for shorter cable runs or where a CAT6 cable
                is not practical, a dedicated outdoor Wi-Fi access point mounted on the house or a
                pole can provide reliable garden room coverage. However, this requires a power
                supply to the access point and does not match the reliability or speed of a wired
                connection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'insulation-and-consumer-unit',
    heading: 'Insulation Requirements and Consumer Unit Options',
    content: (
      <>
        <p>
          The thermal performance of the garden room and the specification of the consumer unit are
          closely linked — poor insulation means higher heating loads, which affects the electrical
          circuit requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation and heating load</strong> — a well-insulated garden room (75mm
                wall insulation, 100mm roof insulation, double-glazed windows) may need only 1kW of
                electric heating to maintain a comfortable temperature. A poorly insulated room may
                need 3kW or more. Higher heating loads require larger dedicated circuits and a
                higher-rated SWA feed cable. Investing in good insulation reduces the electrical
                specification and running costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO consumer unit — the best choice</strong> — a metal consumer unit with
                individual RCBOs for each circuit is the optimal solution for a garden room. Each
                RCBO provides both overcurrent protection and 30mA RCD protection for its circuit. A
                fault on one circuit (for example, the heater) does not affect the other circuits
                (lighting, sockets, computer). Under Regulation 421.1.201 of BS 7671, the enclosure
                must be non-combustible — metal is the standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating for the consumer unit position</strong> — if the consumer unit is
                positioned where it could be exposed to moisture (near a door, in an unheated area,
                or where condensation is possible), the enclosure must have an appropriate IP
                rating. For most garden room interiors, IP2X is acceptable. Where the unit is in a
                porch or unheated lobby, IP44 or higher is preferred.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification and Building Regulations',
    content: (
      <>
        <p>
          Garden room electrical installation work — including the cable from the house, the
          sub-board, and all circuits within the garden room — is notifiable under Part P of the
          Building Regulations 2010. There are no exemptions for garden rooms or outbuildings.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — use a NICEIC, NAPIT, or ELECSA registered
                electrician to self-certify the work. They notify the scheme on completion, and you
                receive a notification certificate. No separate building control inspection of the
                electrical work is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — an Electrical Installation Certificate (EIC)
                covering the entire installation — SWA cable, sub-board, all circuits, earthing
                system, and test results — must be issued on completion. Use the{' '}
                <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                to complete and issue the EIC on site, including the earth electrode resistance
                measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sale implications</strong> — when the property is sold, the buyer's
                solicitor will ask for evidence that the garden room electrical installation is
                compliant. Without an EIC and Part P notification, the sale may be delayed or an
                indemnity insurance policy required. A properly certified installation adds value;
                an uncertified one creates doubt.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garden Room Electrical Installations',
    content: (
      <>
        <p>
          Garden room and garden office installations are among the most enjoyable domestic
          electrical jobs — a complete new installation from scratch, with interesting design
          decisions, testing, and full certification. With the growth in home working, demand for
          quality garden room electrical work continues to increase.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete the EIC With Earth Test Results
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to record all test results on site, including the TT earth electrode resistance.
                  Generate a professional PDF and send it to the client before you leave. Many
                  electricians omit the earth electrode test result — don't be one of them.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Upsell EV and Data Infrastructure</h4>
                <p className="text-white text-sm leading-relaxed">
                  When quoting a garden room installation, always discuss EV charging and data
                  infrastructure. A client who is not planning an EV now may be planning one in two
                  years — upsizing the cable now costs little but saves them thousands later. Use
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce clear alternative quotes for standard, EV-ready, and full-spec options.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage garden room electrical jobs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EIC certificates, quoting, and job management. Complete more jobs with less paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GardenRoomElectricalPage() {
  return (
    <GuideTemplate
      title="Garden Room Electrical Installation UK | Home Office Wiring"
      description="Complete guide to garden room electrical installation. Dedicated circuit or sub-board, cable sizing for distance, EV charging considerations, internet and data infrastructure, insulation requirements, consumer unit options, and Part P compliance under BS 7671."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wifi}
      heroTitle={
        <>
          Garden Room Electrical Installation:{' '}
          <span className="text-yellow-400">Home Office Wiring Guide UK</span>
        </>
      }
      heroSubtitle="Everything you need to know about wiring a garden room or home office — dedicated circuit vs sub-board, cable sizing for long runs, EV charging integration, internet and data infrastructure, insulation considerations, consumer unit options, and Part P compliance."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garden Room Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Garden Room EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
