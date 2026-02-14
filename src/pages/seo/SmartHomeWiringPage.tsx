import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wifi,
  Cable,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Lightbulb,
  Home,
  GraduationCap,
  ClipboardCheck,
  Router,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smart Home Wiring', href: '/guides/smart-home-wiring' },
];

const tocItems = [
  { id: 'overview', label: 'Smart Home Wiring Overview' },
  { id: 'cat6-cabling', label: 'Cat 6 Structured Cabling' },
  { id: 'smart-switches', label: 'Smart Switches and Neutral Wire' },
  { id: 'wifi-access-points', label: 'Wi-Fi Access Points' },
  { id: 'containment', label: 'Containment and Cable Management' },
  { id: 'future-proofing', label: 'Future-Proofing the Installation' },
  { id: 'power-requirements', label: 'Power Requirements for Smart Systems' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Structured Cat 6 cabling to every room provides a reliable backbone for smart home systems — Wi-Fi access points, CCTV, video doorbells, and wired devices all benefit from a hardwired data network.',
  'Smart switches that require a neutral wire need a neutral conductor at the switch position — this must be planned during the first fix and is not always present in older installations.',
  'Ceiling-mounted Wi-Fi access points connected via Cat 6 cable provide far better coverage than a single router, especially in larger or multi-storey properties.',
  'Containment (trunking, conduit, and cable basket) must be designed to accommodate both power and data cables with appropriate segregation to avoid electromagnetic interference.',
  'Future-proofing means installing containment with spare capacity, using Cat 6a or Cat 7 where budget allows, and ensuring every room has both a data point and adequate power sockets for smart devices.',
];

const faqs = [
  {
    question: 'Do I need a neutral wire for smart switches?',
    answer:
      'Most smart switches require a permanent live, a switched live, and a neutral conductor at the switch position. The neutral provides a continuous power supply to the smart switch electronics, allowing it to maintain Wi-Fi or Zigbee/Z-Wave connectivity when the light is turned off. In newer installations wired to current standards, a neutral conductor is present at the switch (BS 7671 Regulation 559.5.1.208 recommends provision for electronic switching devices). In older installations, the switch may only have a permanent live and a switched live — no neutral. In this case, you have three options: run a neutral conductor to the switch position, use a "no-neutral" smart switch (available from some manufacturers but with limited compatibility), or use a smart relay module at the light fitting instead of the switch. Running a neutral to the switch position during a first fix or rewire is the best long-term solution.',
  },
  {
    question: 'What Cat cable should I use for smart home wiring?',
    answer:
      'Cat 6 is the minimum recommended standard for smart home installations. Cat 6 supports 1 Gbps speeds at distances up to 100 metres and 10 Gbps at distances up to 55 metres. For future-proofing, Cat 6a is the better choice — it supports 10 Gbps at the full 100-metre distance. Cat 7 and Cat 8 offer higher specifications but are more expensive, harder to terminate, and rarely necessary for domestic applications. Use solid-core cable (not stranded) for permanent installations — solid core provides better performance over long runs and terminates more reliably in wall-mounted sockets. For the buried section of an underground run (for example, to a garden office), use external-grade Cat 6 or run the cable through a protective duct.',
  },
  {
    question: 'How many data points does a house need?',
    answer:
      'A good starting point is one double data point (two Cat 6 connections) in every habitable room — bedrooms, living room, kitchen, home office, and any utility or garage space. High-demand areas (home office, media room) benefit from additional data points. In addition, install Cat 6 cables to the ceiling positions for Wi-Fi access points — typically one on each floor for a multi-storey house. CCTV camera positions, video doorbell locations, and any dedicated smart home hub locations should also have Cat 6 runs. For a typical 3-bedroom house, this means 8 to 12 Cat 6 cable runs terminating at a central patch panel. The incremental cost of running extra cables during the first fix is minimal compared to retrofitting later, so it is always better to install more runs than you think you need.',
  },
  {
    question: 'Where should Wi-Fi access points be positioned?',
    answer:
      'Ceiling-mounted Wi-Fi access points provide the best coverage because they radiate signal downwards and outwards in a dome pattern. The optimal position is centrally on the ceiling of each floor, avoiding positions directly above or below metal ducting, foil-backed insulation, or large water tanks (which block or attenuate the signal). For a two-storey house, one access point on the ground floor ceiling and one on the first floor ceiling typically provides full coverage. For larger properties, add access points as needed — a site survey with a Wi-Fi analyser app can identify dead spots. Power the access points using PoE (Power over Ethernet) wherever possible — this eliminates the need for a separate power supply at the ceiling position. A PoE switch at the patch panel location powers all access points via the Cat 6 cables.',
  },
  {
    question: 'Do data cables need to be separated from power cables?',
    answer:
      'Yes. Electromagnetic interference (EMI) from power cables can degrade data signal quality. BS 5733 and good practice require separation between power and data cables. The recommended minimum separation is 50mm for unscreened Cat 6 cable running parallel to power cables, or 25mm if the cables cross at right angles. In containment systems, use separate compartments for power and data, or use separate trunking/conduit runs. Cat 6 cable has some built-in interference rejection, and Cat 6a and Cat 7 have better shielding, but maintaining physical separation is still best practice. In practice, running data cables through the same stud wall as power cables is acceptable provided the cables are not bundled together — maintain the minimum separation and cross at right angles where paths intersect.',
  },
  {
    question: 'Is smart home wiring notifiable under Part P?',
    answer:
      'The data cabling itself is extra-low voltage and is not notifiable under Part P. However, any new power circuits added as part of the smart home installation (for example, new lighting circuits for smart switches, dedicated circuits for server racks or home automation hubs) are notifiable if they involve new circuits in a dwelling. Adding a smart switch to an existing lighting circuit is non-notifiable maintenance — replacing like for like. Running a new lighting circuit or adding circuits to a kitchen or bathroom is notifiable work. In practice, a comprehensive smart home wiring project during a new build or renovation will include both notifiable electrical work (new circuits, consumer unit modifications) and non-notifiable data cabling. The electrician should certify the electrical work with an EIC and document the data cabling separately.',
  },
  {
    question: 'What is the best smart home hub or platform?',
    answer:
      'The choice of smart home platform is the homeowner decision, but electricians should understand the main options to advise on wiring requirements. Matter is the newest industry-standard protocol — it works over Wi-Fi, Thread, and Ethernet, and is supported by Apple, Google, Amazon, and Samsung. It requires an IP network (which the structured cabling provides). Zigbee and Z-Wave are mesh networking protocols that require a dedicated hub (such as a SmartThings hub or Home Assistant). Thread is a low-power mesh protocol built into many newer devices. For the electrician, the key implication is that all these platforms require a reliable IP network — which is why structured Cat 6 cabling and good Wi-Fi coverage are the foundation of any smart home. Do not specify or recommend a particular hub unless you are confident in its long-term support.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size power cables for smart home circuits, dedicated equipment feeds, and PoE switch power supplies.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on dedicated circuits for smart home hubs and server equipment.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/garden-office-electrics',
    title: 'Garden Office Electrics',
    description:
      'Data cabling and Wi-Fi access points for garden offices — same structured cabling principles apply.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for smart home rewires and new circuit installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units — relevant when adding circuits for smart home systems.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/loft-conversion-electrics',
    title: 'Loft Conversion Electrics',
    description:
      'First-fix wiring for smart home infrastructure in loft conversions and new rooms.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: "Smart Home Wiring: An Electrician's Perspective",
    content: (
      <>
        <p>
          Smart home technology is no longer a niche — it is becoming a standard expectation in new
          builds and high-end renovations. From voice-controlled lighting and automated heating to
          whole-house audio and integrated security systems, smart homes depend on reliable
          electrical infrastructure.
        </p>
        <p>
          The role of the electrician in smart home installations is fundamental. No matter how
          advanced the technology, it all runs on two things: power and data. Structured Cat 6
          cabling, correctly wired lighting circuits with neutral conductors, ceiling-mounted Wi-Fi
          access points, and well-designed containment are the foundation that makes everything else
          work.
        </p>
        <p>
          This guide covers the electrical infrastructure for smart homes from an electrician's
          perspective — the cabling, the switching, the access points, the containment, and the
          future-proofing that ensures the installation remains useful for years to come. The
          electrical work must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          for power circuits and BS 5733 for cable management and segregation.
        </p>
      </>
    ),
  },
  {
    id: 'cat6-cabling',
    heading: 'Cat 6 Structured Cabling',
    content: (
      <>
        <p>
          Structured cabling is the backbone of a smart home network. Every data point, Wi-Fi access
          point, CCTV camera, and wired smart device connects back to a central location (typically
          a network cabinet or patch panel in a utility room, loft, or under-stairs cupboard) via a
          Cat 6 cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat 6 specification</strong> — solid-core, unshielded twisted pair (UTP) for
                internal runs. Cat 6 supports 1 Gbps at up to 100 metres. For higher performance,
                Cat 6a supports 10 Gbps at 100 metres. Use LSZH (Low Smoke Zero Halogen) sheathing
                for installations in occupied buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star topology</strong> — every data point has a dedicated cable run back to
                the central patch panel. Do not daisy-chain data cables. Each cable run is
                independent, which means a fault on one cable does not affect others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination</strong> — terminate on a patch panel at the central location
                and on a flush-mounted RJ45 module or data socket at the room end. Use the T568B
                wiring standard consistently throughout the installation. Test every cable with a
                cable tester to verify continuity, pair mapping, and performance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central location</strong> — the patch panel, network switch, router, and any
                smart home hub are co-located in a ventilated cabinet. Provide at least a double
                socket (dedicated circuit recommended) for powering network equipment. A small
                wall-mounted 6U or 9U network cabinet keeps everything tidy and accessible.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a typical 3-bedroom house, plan for 10 to 16 Cat 6 cable runs: one or two per
          habitable room, one for each Wi-Fi access point position, and additional runs for CCTV,
          video doorbell, and smart hub locations. The cable is cheap; the labour is in the first
          fix. Always run more cables than the homeowner thinks they need — it costs almost nothing
          extra during the first fix and is extremely expensive to retrofit.
        </p>
      </>
    ),
  },
  {
    id: 'smart-switches',
    heading: 'Smart Switches and the Neutral Wire Question',
    content: (
      <>
        <p>
          Smart light switches are one of the most popular smart home devices. They replace standard
          mechanical switches with Wi-Fi, Zigbee, or Z-Wave enabled switches that can be controlled
          via an app, voice assistant, or automation rules. However, most smart switches have a
          critical requirement: a neutral conductor at the switch position.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why is a neutral needed?</strong> — a smart switch contains electronics
                (Wi-Fi radio, processor, relay) that need a constant power supply. In a standard
                mechanical switch, when the switch is off, no current flows — the circuit is broken.
                A smart switch needs to remain powered even when the light is off, so it can receive
                commands and maintain connectivity. The neutral conductor provides the return path
                for this standby current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations</strong> — always run a neutral conductor to every switch
                position. BS 7671 Regulation 559.6.1.1 recommends provision for electronic switching
                devices, and this is standard practice in new builds and rewires. Use
                3-core-and-earth cable for single switches (line, switched live, neutral, earth) and
                4-core-and-earth for two-way circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing installations without neutral</strong> — three options: (1) run a
                neutral conductor to the switch (disruptive but permanent), (2) use a "no-neutral"
                smart switch (limited range, may require a bypass module at the fitting), (3)
                install a smart relay module at the ceiling rose or light fitting instead (the
                neutral is available at the fitting, and the existing switch sends a signal to the
                relay via the switched live).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Two-way and intermediate switching with smart switches requires careful planning. Some
          smart switch systems use a "master and slave" arrangement (one smart switch controls the
          circuit, with wired or wireless auxiliary switches at other positions). Others use
          wireless switches that communicate directly with the smart hub, eliminating the need for
          multi-way wiring entirely. Discuss the homeowner preferred brands and platforms before
          designing the lighting circuit wiring.
        </p>
      </>
    ),
  },
  {
    id: 'wifi-access-points',
    heading: 'Wi-Fi Access Points: Reliable Coverage',
    content: (
      <>
        <p>
          A single Wi-Fi router in the hallway does not provide reliable coverage for a smart home.
          Smart devices throughout the property — thermostats, cameras, door locks, lighting, audio
          — all compete for bandwidth and need a strong signal. The solution is dedicated Wi-Fi
          access points connected via Cat 6 cabling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Router className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling-mounted access points</strong> — the optimal position is centrally
                on the ceiling, which provides a dome-shaped coverage pattern. One access point per
                floor is typically sufficient for a standard house. Larger properties may need
                additional units. Mount the access point on a standard ceiling back box — it looks
                clean and professional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Router className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PoE (Power over Ethernet)</strong> — use PoE-capable access points powered
                via the Cat 6 cable from a PoE switch at the central location. This eliminates the
                need for a power socket at the ceiling position — the Cat 6 cable carries both data
                and power. A PoE switch with 4 to 8 PoE ports is usually sufficient for a domestic
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Router className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brands</strong> — Ubiquiti UniFi, TP-Link Omada, and Ruckus are popular
                choices for domestic and small commercial installations. UniFi is the most widely
                used by electricians and integrators due to its ease of setup, reliability, and
                affordable price point.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Run a Cat 6 cable to each access point position during the first fix. If the homeowner is
          not ready to install access points immediately, cap the cable at a blank plate — the
          infrastructure is in place for future installation. This is one of the highest-value items
          an electrician can offer during a rewire or new build.
        </p>
      </>
    ),
  },
  {
    id: 'containment',
    heading: 'Containment and Cable Management',
    content: (
      <>
        <p>
          Smart home installations involve significantly more cable than a standard domestic
          installation. Power cables, data cables, CCTV cables, and specialist cables (audio, HDMI
          over Cat 6, etc.) all need to be routed, supported, and segregated correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Segregation</strong> — power cables and data cables must be separated to
                prevent electromagnetic interference. Use separate containment for power and data,
                or compartmentalised trunking with a divider. Minimum separation of 50mm for
                parallel runs of unscreened Cat 6 and power cables. Cross at right angles where
                paths intersect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable basket and tray</strong> — in loft spaces and voids, cable basket
                provides easy access and good ventilation. Use separate baskets for power and data.
                Cable tray is suitable for horizontal runs in accessible voids.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit for first fix</strong> — in new builds and renovations, install
                conduit (20mm or 25mm) to key positions before the walls are closed up. This allows
                cables to be pulled or replaced in the future without opening walls. Use draw wires
                in any conduit run for future cable pulling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back boxes</strong> — use deep back boxes (47mm or 55mm) at data points and
                smart switch positions. Standard 25mm back boxes do not provide enough space for
                smart switch modules or data cable terminations. Specify deep boxes in the first fix
                to avoid problems at second fix.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Good containment design during the first fix is what separates a professional smart home
          installation from a messy retrofit. Plan the cable routes, specify the containment, and
          install it before any cables are pulled. The time investment during first fix pays off
          enormously at second fix and for future maintenance.
        </p>
      </>
    ),
  },
  {
    id: 'future-proofing',
    heading: 'Future-Proofing the Smart Home Installation',
    content: (
      <>
        <p>
          Smart home technology evolves rapidly. The devices and protocols popular today may be
          superseded within 5 years. The one thing that does not change is the physical
          infrastructure — the cabling, containment, and power supply. A well-designed
          infrastructure outlasts multiple generations of smart home devices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Run more cables than needed</strong> — the labour of running one more Cat 6
                cable during the first fix is minimal. The cost of retrofitting one cable after the
                walls are closed is significant. Run spare cables to every location where a smart
                device might be needed in the future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use Cat 6a where budget allows</strong> — Cat 6a supports 10 Gbps at 100
                metres, compared to Cat 6 which supports 10 Gbps at only 55 metres. The price
                difference is modest and the cable is only slightly larger. For a premium
                installation, Cat 6a is the better long-term choice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Install containment with spare capacity</strong> — use trunking and conduit
                that is no more than 45% filled. This leaves room for additional cables in the
                future. A 25mm conduit that is full of cables today is useless for adding a cable
                tomorrow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral wires at every switch</strong> — even if the homeowner chooses
                standard switches now, having a neutral at every switch position allows smart
                switches to be installed in the future without rewiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adequate power at the network cabinet</strong> — the central network
                location will house a router, switch, patch panel, and possibly a NAS (Network
                Attached Storage), smart home hub, and UPS. Provide a dedicated circuit with
                multiple sockets and consider a small UPS to maintain network connectivity during
                short power outages.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best smart home installation is one where the homeowner can upgrade devices and add
          new ones without calling the electrician back to run cables. That is the mark of a
          future-proofed installation.
        </p>
      </>
    ),
  },
  {
    id: 'power-requirements',
    heading: 'Power Requirements for Smart Home Systems',
    content: (
      <>
        <p>
          Smart home devices add to the overall electrical load of the property. While individual
          devices consume very little power (a smart switch draws 1 to 3 watts in standby), the
          cumulative load from dozens of smart devices, network equipment, and always-on systems is
          worth considering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Network equipment</strong> — router (10 to 20W), PoE switch (30 to 100W
                depending on the number of ports and PoE load), NAS (30 to 80W). A dedicated circuit
                for the network cabinet is recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV system</strong> — a PoE NVR (Network Video Recorder) draws 20 to 50W,
                and each camera draws 5 to 15W via PoE. A 4-camera system with NVR draws
                approximately 70 to 110W continuously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart lighting</strong> — individual smart bulbs and switches draw minimal
                power (1 to 3W standby). However, if the property has 20 to 30 smart switches, the
                cumulative standby draw is 30 to 90W — not negligible over 24 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS (Uninterruptible Power Supply)</strong> — a small UPS at the network
                cabinet maintains internet connectivity and smart home control during short power
                outages. A 600VA to 1000VA UPS is sufficient for domestic network equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Include the smart home equipment load in the maximum demand calculation when designing the
          installation. While the individual loads are small, they are continuous (24/7) and
          cumulative. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          can help with dedicated circuit sizing for network cabinets and equipment rooms.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The power circuits in a smart home installation must be tested and certified in accordance
          with BS 7671. The data cabling should be tested separately to verify performance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical testing (BS 7671)</strong> — all new power circuits must be
                tested: continuity, insulation resistance, polarity, earth fault loop impedance,
                prospective fault current, and RCD operation. An{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                must be issued for all new circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data cable testing</strong> — each Cat 6 run should be tested with a cable
                tester or certification tool to verify wire map, continuity, length, and ideally
                performance (insertion loss, crosstalk, return loss). A simple wire map and
                continuity test is the minimum; full Cat 6 certification testing is the gold
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — provide the homeowner with a complete documentation
                pack: EIC for electrical work, data cabling test results, a cable schedule
                (identifying each cable run, its endpoints, and the patch panel port), and network
                equipment details. This documentation is invaluable for future maintenance and
                upgrades.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Certify the electrical work on your phone"
          description="Complete the EIC on site with Elec-Mate. AI board scanner reads the consumer unit, voice test entry fills in results while you test. Export as PDF and send to the homeowner. Professional certification in minutes."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The Smart Home Opportunity',
    content: (
      <>
        <p>
          Smart home wiring is a premium service that commands premium pricing. A structured cabling
          package for a 3-bedroom house (Cat 6 to every room, Wi-Fi access point positions, patch
          panel, and network cabinet) adds £2,000 to £5,000 to a rewire or new-build electrical
          package. Combined with smart lighting, dedicated circuits, and commissioning, the total
          smart home electrical package can exceed £10,000.
        </p>
        <p>
          Homeowners building or renovating want an electrician who understands smart home
          infrastructure — not just power circuits. Offering structured cabling, Wi-Fi design, and
          smart switch installation as part of your service differentiates you from electricians who
          only do traditional domestic work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size dedicated circuits for network cabinets, equipment rooms, and smart home hubs
                  with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Automatic derating and voltage drop checks for every circuit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote smart home packages with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Structured cabling, containment, access points, smart switches, network
                  equipment, labour, and testing — all itemised with your margins. Professional PDF
                  quote sent on the spot.
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
                  Complete the Electrical Installation Certificate for smart home rewires and new
                  circuit installations. AI board scanning, voice test entry, and instant PDF
                  export. Certify the work professionally on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify smart home installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for smart home electrical work. 7-day free trial."
          icon={Wifi}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartHomeWiringPage() {
  return (
    <GuideTemplate
      title="Smart Home Wiring Guide | Electrician's Perspective"
      description="Complete guide to smart home wiring for UK electricians. Cat 6 structured cabling, smart switches with neutral wire, Wi-Fi access points, containment design, future-proofing, and certification requirements."
      datePublished="2025-09-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wifi}
      heroTitle={
        <>
          Smart Home Wiring:{' '}
          <span className="text-yellow-400">An Electrician's Guide to Getting It Right</span>
        </>
      }
      heroSubtitle="Every smart home starts with good electrical infrastructure. Cat 6 cabling, neutral wires at every switch, ceiling-mounted Wi-Fi access points, and well-designed containment. This guide covers the electrician's role in smart home installations."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart Home Wiring"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Smart Home Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates. Everything you need for smart home electrical work. 7-day free trial, cancel anytime."
    />
  );
}
