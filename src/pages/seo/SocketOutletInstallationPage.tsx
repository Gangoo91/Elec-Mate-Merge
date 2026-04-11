import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  PoundSterling,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Socket Outlet Installation', href: '/socket-outlet-installation' },
];

const tocItems = [
  { id: 'ring-vs-radial', label: 'Ring Main vs Radial Circuits' },
  { id: 'spur-rules', label: 'Spur Rules — One Socket per Spur' },
  { id: 'ring-floor-area', label: 'Maximum Floor Area for Ring Circuits' },
  { id: 'usb-sockets', label: 'USB Sockets' },
  { id: 'outdoor-sockets', label: 'Outdoor Socket Requirements' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'costs', label: 'Typical Costs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A ring final circuit in a domestic property may serve a floor area not exceeding 100m² under BS 7671. Above this, additional circuits should be provided. The ring circuit uses 2.5mm² twin and earth cable on a 32A protective device.',
  'A spur from a ring final circuit is permitted to supply only one single or one double socket outlet (or one fused connection unit). You cannot spur another spur — a spur must originate from a ring cable, a junction box on the ring, or a socket on the ring, not from another spur.',
  'Outdoor socket outlets must have a minimum IP44 rating and must be protected by a 30mA RCD under BS 7671 Regulation 411.3.3. Weatherproof socket outlets used in locations where water jets may be used (hosepipe areas) should have IP55 or better.',
  'USB socket outlets are classed as accessories for the purposes of BS 7671 and should comply with BS 1363 as socket outlets. The USB ports themselves are not covered by BS 7671 as electrical accessories — they are low-voltage data/charging connections. However, the socket unit as a whole must be installed in compliance with the wiring regulations for the circuit it is connected to.',
  'Adding a new socket outlet in a domestic kitchen, garage, or external location is notifiable under Part P of the Building Regulations in England. Work in bedrooms, hallways, and living rooms (other than special locations) adding new sockets is not generally notifiable if it extends an existing circuit rather than adding a new one.',
];

const faqs = [
  {
    question: 'Can I add a socket outlet as a spur from a ring main?',
    answer:
      'Yes, but with strict limitations. A spur from a ring final circuit may supply only one fused connection unit, one single socket outlet, or one double socket outlet. You cannot add a double socket and then spur again from it — a spur must originate from the ring cable itself or from a ring socket, not from another spur. The number of spurs on a ring circuit must not exceed the number of socket outlets or connection units already on the ring.',
  },
  {
    question: 'What cable do I use for a new socket outlet?',
    answer:
      '2.5mm² two-core and earth (twin and earth, T&E) cable to BS 6004 is the standard for socket outlet circuits in domestic premises. This must run on a 32A protective device (MCB or RCBO). Where the cable is buried in a wall within 50mm of the surface without mechanical protection, it must be RCD protected — which is normally already the case for domestic socket circuits under Regulation 411.3.3. If the cable runs in a defined zone (vertically or horizontally from an accessory, within 150mm of an angle), the zone rules apply under Regulation 522.6.',
  },
  {
    question: 'How many sockets should a bedroom have?',
    answer:
      'There is no minimum legal requirement for the number of socket outlets in a bedroom. Building Regulations Approved Document P does not specify a minimum. As a practical guide, a double bedroom should have at least four double socket outlets — two on each side of where the bed will be. Modern bedrooms with smart devices, phone chargers, televisions, and dressing table lighting have higher demands than older properties were designed for. Where there is insufficient capacity, adding sockets from the existing ring or adding a new radial circuit is the correct approach.',
  },
  {
    question: 'Do outdoor sockets need RCD protection?',
    answer:
      'Yes. Under BS 7671 Regulation 411.3.3, all socket outlets rated up to 32A that may be used to supply portable equipment outdoors must be protected by a 30mA RCD. This applies regardless of where the socket outlet is mounted — whether on an external wall, in a garage, shed, or carport. The socket outlet itself must have a minimum IP44 rating (splash-proof) to be suitable for external installation. In locations where direct water jets may be present, IP55 or IP65 is more appropriate.',
  },
  {
    question: 'Is adding a socket outlet notifiable under Part P?',
    answer:
      'Adding socket outlets in certain locations is notifiable under Part P of the Building Regulations in England. Notifiable locations include: kitchens, bathrooms, gardens, garages, sheds, and outbuildings. Adding a socket outlet in a kitchen (even on an existing ring) is notifiable. Adding a socket in a bedroom or living room on an existing ring circuit is generally not notifiable — but adding a new circuit to any location is notifiable. Always check current Building Regulations guidance and your competent person scheme requirements.',
  },
  {
    question: 'What is the maximum number of sockets on a ring main?',
    answer:
      "BS 7671 does not set a maximum number of socket outlets on a ring final circuit — instead it limits the floor area served (100m² maximum) and requires that the circuit's design current does not exceed the device's rated current under assessed loading. In practice, a typical domestic ring circuit might serve 10 to 20 socket outlets. The practical limit is not the number of sockets but the assessed maximum demand — if many high-load appliances are likely to run simultaneously, additional circuits should be provided.",
  },
  {
    question: 'Can I fit a socket outlet in a bathroom?',
    answer:
      'Standard 13A socket outlets (BS 1363) are not permitted in a bathroom or room containing a bath or shower under BS 7671 Section 701. The exception is shaver supply units complying with BS EN 61558-2-5 (which use an isolating transformer) — these are permitted outside Zone 1 in a bathroom. A socket outlet may be installed outside the bathroom in an adjacent corridor or bedroom where it is not in the same room as the bath or shower.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/rcbo-installation-guide',
    title: 'RCBO Installation Guide',
    description:
      'Types A, B, and F RCBOs, nuisance tripping on LED circuits, and BS 7671 Regulation 531.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Socket positions, cooker circuits, RCD protection, and Part P for kitchens.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ring-vs-radial',
    heading: 'Ring Main vs Radial Circuits for Socket Outlets',
    content: (
      <>
        <p>
          Socket outlet circuits in domestic premises in the UK are typically wired as either ring
          final circuits or radial circuits. Both are permitted under BS 7671, but they have
          different cable sizing, protective device ratings, and maximum floor area limitations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring final circuit</strong> — 2.5mm² twin and earth cable, 32A MCB or RCBO.
                The circuit starts at the consumer unit, loops around the floor serving multiple
                socket outlets, and returns to the same way in the consumer unit. Maximum floor area
                100m². The ring configuration means that current flows in both directions around the
                ring, halving the effective current in each cable leg and allowing a smaller cable
                than a radial of equivalent capacity would require.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radial circuit (up to 20A)</strong> — 2.5mm² twin and earth cable, 20A MCB.
                A single cable run from the consumer unit to the final socket outlet. Maximum floor
                area 50m². Used for smaller areas such as a single room or where a ring is
                impractical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radial circuit (up to 32A)</strong> — 4mm² twin and earth cable, 32A MCB.
                Maximum floor area 75m². Used for larger areas where a ring circuit would be
                impractical — common in commercial and industrial settings but less common in
                domestic work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When adding socket outlets to an existing installation, confirm which type of circuit is
          already in place before making additions. Adding to a ring is different from adding a spur
          from a radial, and the rules for spurs only apply to ring final circuits.
        </p>
      </>
    ),
  },
  {
    id: 'spur-rules',
    heading: 'Spur Rules — One Socket Outlet per Spur',
    content: (
      <>
        <p>
          A spur is a branch cable taken from a ring final circuit to supply a socket outlet or
          fused connection unit (FCU) that is not on the main ring. Spurs are a common way to add
          socket outlets without rewiring the ring, but the rules are strict and frequently
          misapplied.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>One socket per spur</strong> — a spur from a ring may supply only one single
                socket outlet, one twin socket outlet, or one FCU. It cannot supply two socket
                outlets or another ring of sockets. This is because the spur cable (2.5mm²) is
                protected by the ring's 32A device — a spur to two sockets could allow a total load
                that the spur cable cannot safely carry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No spurs from spurs</strong> — a spur must originate from a point on the
                ring: a socket on the ring, a junction box connected to the ring cable, or the
                consumer unit. You cannot take a spur from an existing spur socket — the spur socket
                is not part of the ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum number of spurs</strong> — the number of spurs must not exceed the
                number of socket outlets and FCUs already wired as part of the ring. So if the ring
                already has eight sockets directly on it, a maximum of eight spurs are permitted. In
                practice, this limit is rarely reached in domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify the ring first</strong> — before adding a spur, verify that the
                circuit is genuinely a ring and not a radial. An R1+R2 test or continuity test at
                each socket will confirm whether the circuit loops back to the consumer unit.
                Spurring from what turns out to be a radial creates an overloaded and potentially
                dangerous installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record your socket outlet additions with a Minor Works Certificate"
          description="Elec-Mate generates Minor Electrical Installation Works Certificates on your phone at the job. PDF in seconds, stored in the cloud."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'ring-floor-area',
    heading: 'Maximum Floor Area for Ring Final Circuits',
    content: (
      <>
        <p>
          BS 7671 limits the floor area that a ring final circuit may serve to 100m². This limit is
          set not because a larger ring is inherently dangerous, but because above this area the
          assessed maximum demand becomes unpredictable and the risk of overloading the ring
          increases.
        </p>
        <p>
          In a typical three-bedroom semi-detached property of approximately 90m², a single ring
          final circuit for the ground floor and a separate ring for the first floor is standard
          practice. Each floor ring remains well within the 100m² limit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-plan properties</strong> — large open-plan living areas or properties
                exceeding 100m² per floor may require two or more ring circuits per floor.
                Alternatively, a 32A radial circuit using 4mm² cable may serve up to 75m² as a
                partial solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen circuits</strong> — the kitchen is typically served by its own ring
                or radial circuit due to the high load of kitchen appliances. This is in addition to
                any whole-floor ring and does not count against the kitchen area for the purpose of
                the 100m² calculation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'usb-sockets',
    heading: 'Installing USB Socket Outlets',
    content: (
      <>
        <p>
          USB socket outlets — socket accessories that incorporate one or more USB charging ports
          alongside standard 13A sockets — are increasingly specified in domestic installations.
          They are installed in exactly the same way as standard socket outlets and are subject to
          the same BS 7671 requirements for the circuit they are connected to.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB-A vs USB-C</strong> — USB-A ports (the rectangular type) have been the
                standard in socket accessories for a decade. USB-C socket outlets are now widely
                available and are more appropriate given that modern devices predominantly use USB-C
                for charging. Specify the port type based on the client's likely device usage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charging current rating</strong> — USB ports in socket accessories are rated
                in amps (typically 2.4A to 5A per port) or watts. A higher charging current allows
                faster charging for compatible devices. Check the accessory manufacturer's datasheet
                for port ratings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat output</strong> — USB charging circuits generate heat within the socket
                accessory. Ensure the accessory is installed in a suitable backbox with adequate
                ventilation (metal backboxes dissipate heat better than plastic) and that the
                accessory is not installed in an enclosed space without airflow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compatibility with surge protection</strong> — properties with SPDs (Surge
                Protective Devices) installed at the consumer unit do not require additional surge
                protection at USB outlets. Where no SPD is present, some premium USB socket
                accessories incorporate integral surge protection for the USB ports.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-sockets',
    heading: 'Outdoor Socket Requirements — IP Rating and RCD Protection',
    content: (
      <>
        <p>
          Outdoor socket outlets are subject to specific requirements under BS 7671 relating to
          their ingress protection (IP) rating and their RCD protection. These requirements exist
          because outdoor environments expose socket outlets to rain, condensation, dirt, and
          insects, and because portable equipment used outdoors significantly increases the risk of
          electric shock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum IP44 for outdoor sockets</strong> — a minimum ingress protection
                rating of IP44 (protected against solid objects greater than 1mm and protected
                against water splashing from any direction) is required for socket outlets installed
                outdoors. This is achieved with a weatherproof socket outlet complete with a
                self-closing lid or cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP55 or IP65 where water jets may be present</strong> — in garden areas
                where hosepipes or pressure washers may be used near the socket, an IP55 (protected
                against water jets) or IP65 (protected against dust and water jets) rated socket is
                more appropriate. IP65 socket outlets are suitable for most garden applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD protection required — BS 7671 Regulation 411.3.3</strong> — all
                socket outlet circuits rated up to 32A that may supply portable equipment for use
                outdoors must be protected by a 30mA RCD. This applies both to sockets installed
                outdoors and to indoor sockets from which outdoor extension leads are commonly used.
                An RCBO on the consumer unit circuit or a dedicated outdoor socket RCD unit
                satisfies this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cable for outbuilding sockets</strong> — where a socket outlet
                is to be installed in a garden, shed, or garage served by a cable buried
                underground, the cable must either be armoured (SWA) or a suitably rated outdoor
                cable buried at a safe depth (minimum 500mm for SWA, with mechanical protection
                markers at a shallower depth). Underground cables must be recorded on a circuit
                chart or schedule provided to the client.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Socket Outlet Installation',
    content: (
      <>
        <p>
          Part P of the Building Regulations applies to electrical work in dwellings in England. Not
          all socket outlet work is notifiable, but work in certain locations always requires
          notification or self-certification through a registered competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always notifiable</strong> — installing a new circuit anywhere in a
                dwelling. Carrying out any electrical work in a kitchen, bathroom, or other special
                location. Installing socket outlets outdoors or in a garage. Adding a socket outlet
                in a garden outbuilding or shed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generally not notifiable</strong> — adding a socket outlet on an existing
                ring final circuit in a bedroom, hallway, or living room (not a kitchen or special
                location). Like-for-like replacement of a socket outlet in any location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — registered electricians working through
                NICEIC, NAPIT, Elecsa, or other approved schemes can self-certify notifiable work.
                The scheme notifies building control on the electrician's behalf and issues a
                Building Regulations compliance certificate. Always issue a Minor Electrical
                Installation Works Certificate or EIC in addition to the Part P certificate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> to
          generate your Minor Works Certificates and EICs on site, ensuring every socket outlet
          addition is properly documented regardless of whether Part P notification is required.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs for Adding Socket Outlets',
    content: (
      <>
        <p>
          The cost of adding socket outlets varies depending on the location, the route of the
          cable, the type of finish (surface-mounted or flush-mounted), and whether Part P
          notification is required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single socket outlet addition (spur, surface mount)</strong> — £80 to £150
                including labour, materials, and Minor Works Certificate. Surface mounting avoids
                plastering costs but is less aesthetically finished.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single socket outlet addition (spur, flush mount)</strong> — £120 to £220
                including labour, materials, chasing, making good, and Minor Works Certificate.
                Flush mounting requires chasing the wall and making good the plaster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor socket outlet (weatherproof, RCD protected)</strong> — £150 to £350
                depending on cable run length, whether a new circuit is required, and the IP rating
                of the socket. Includes Part P compliance where applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New ring final circuit (e.g. for a new room)</strong> — £300 to £700
                depending on the length of the ring, number of socket outlets, and whether the
                consumer unit has a spare way. Includes EIC and Part P compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SocketOutletInstallationPage() {
  return (
    <GuideTemplate
      title="Socket Outlet Installation Guide — Ring Main, Spurs, Outdoor, USB | Elec-Mate"
      description="Complete UK guide to adding socket outlets. Ring main vs radial circuits, spur rules, one socket per spur from a ring, maximum floor area, USB socket outlets, outdoor IP44 requirements, BS 7671 Regulation 411.3.3, Part P notification, and typical costs."
      datePublished="2024-07-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Socket Outlet Installation{' '}
          <span className="text-yellow-400">— Ring Main, Spurs, and Outdoor</span>
        </>
      }
      heroSubtitle="Adding socket outlets is one of the most common domestic electrical jobs. Ring main vs radial, the one-socket-per-spur rule, outdoor IP ratings, USB sockets, Part P notification — this guide covers everything electricians and homeowners need to know."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Socket Outlet Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate your socket outlet work on site"
      ctaSubheading="Minor Works Certificates, EICs, and EICRs generated from your phone. PDF in seconds, stored in the cloud."
    />
  );
}
