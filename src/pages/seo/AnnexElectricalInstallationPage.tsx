import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  Lightbulb,
  Thermometer,
  ClipboardCheck,
  Bath,
  CookingPot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Annex Electrical Installation', href: '/guides/annex-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'supply-options', label: 'Supply Options' },
  { id: 'consumer-unit', label: 'Consumer Unit Design' },
  { id: 'kitchen-circuits', label: 'Kitchen Circuits' },
  { id: 'bathroom-circuits', label: 'Bathroom Circuits' },
  { id: 'heating', label: 'Heating and Hot Water' },
  { id: 'fire-separation', label: 'Fire Separation and Smoke Detection' },
  { id: 'building-control', label: 'Building Control and Part P' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'tools-materials', label: 'Tools and Materials' },
  { id: 'costs', label: 'Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A granny annex is a self-contained dwelling unit and requires its own consumer unit with full RCD protection. The decision between a separate metered supply from the DNO and a sub-main from the main house depends on the annex status (independent dwelling vs ancillary accommodation).',
  'The electrical installation must comply with BS 7671 in full, including all special location requirements for bathrooms (Section 701) and kitchens. The annex is effectively a complete domestic installation in miniature.',
  'Building Control approval is required for the annex construction. The electrical work is notifiable under Part P. Fire separation between the annex and the main house (if attached) requires fire-stopping of all cable penetrations.',
  'Meter considerations are significant: if the annex is intended as a separate dwelling (for rental or sale), it needs its own electricity meter and a separate DNO connection. If it is ancillary to the main house (for a family member), it can be supplied from the main house.',
  'Budget £3,000 to £8,000 for the electrical installation depending on the annex size, specification, and whether a new DNO connection is required. The electrical package for a well-specified one-bedroom annex is typically £4,000 to £6,000.',
];

const faqs = [
  {
    question: 'Does a granny annex need its own electricity meter?',
    answer:
      'It depends on the annex status. If the annex is ancillary to the main house (used by a family member, not rented out, not a separate Council Tax dwelling), it can be supplied from the main house via a sub-main cable and does not need its own meter. If the annex is intended as a separate dwelling (for rental, or as an independent living unit), it should have its own electricity meter and a separate DNO connection. This ensures the annex occupant pays their own electricity bills and the supply is independent of the main house. The DNO connection can take 6 to 12 weeks and costs £500 to £2,000+ depending on the distance from the existing supply. Check with the local planning authority — the annex planning condition often specifies whether it is ancillary or independent.',
  },
  {
    question: 'What consumer unit do I need for a granny annex?',
    answer:
      'A granny annex needs its own consumer unit with full RCD protection. A typical one-bedroom annex requires an 8 to 12 way consumer unit to accommodate: lighting circuits (x2), socket circuits (x2), cooker circuit, shower circuit (if electric shower), immersion heater or heating circuit, smoke detection circuit, and spare ways for future additions. Use an RCBO board for individual circuit protection without the risk of one fault tripping unrelated circuits. The consumer unit must comply with Amendment 3 requirements for non-combustible enclosures.',
  },
  {
    question: 'Does a granny annex need Building Control sign-off?',
    answer:
      'Yes. A granny annex requires full Building Regulations approval covering structural integrity, thermal performance (Part L), fire safety (Part B), ventilation (Part F), drainage, and electrical safety (Part P). The electrical work is one component of the overall approval. If a registered electrician carries out the work, the Part P element is self-certified through the competent person scheme. The structural and other elements are inspected by Building Control or an Approved Inspector. Building Control will want to see the Electrical Installation Certificate as part of the final sign-off.',
  },
  {
    question: 'What cable do I run from the house to the annex?',
    answer:
      'If the annex is supplied from the main house, a sub-main cable is run from the house consumer unit (or a separate switch-fuse adjacent to the meter) to the annex consumer unit. SWA (Steel Wire Armoured) cable is the standard choice for an underground run. For a typical one-bedroom annex with electric heating, a 60A to 80A supply is appropriate — use 16.0mm² or 25.0mm² SWA cable depending on the run length and maximum demand. For a detached annex with a long cable run (30m+), voltage drop is the critical factor — use the cable sizing calculator to determine the correct size. Burial requirements are the same as for shed installations: 500mm minimum depth, sand bed, warning tape.',
  },
  {
    question: 'Does the annex need special locations compliance for the bathroom?',
    answer:
      'Yes. The bathroom in the annex must comply with Section 701 of BS 7671 (Requirements for Special Locations — Rooms Containing a Bath or Shower). This includes zoning (Zones 0, 1, 2, and outside zones), IP rating requirements for equipment in each zone (minimum IPX4 in Zone 1, IPX4 in Zone 2), supplementary bonding (or confirmation that disconnection times are met without it), 30mA RCD protection for all circuits in the bathroom, and restrictions on socket outlet positions (no sockets in Zones 0, 1, or 2 — sockets must be 3m horizontal from Zone 1 unless supplied via a shaver unit or SELV transformer).',
  },
  {
    question: 'How long does the electrical installation take for a granny annex?',
    answer:
      'A typical one-bedroom annex electrical installation takes 3 to 5 days of electrician time, split across first fix and second fix phases. First fix (running cables in walls, floor, and ceiling before plasterboard) takes 1.5 to 2 days. Second fix (fitting accessories, making connections, testing) takes 1.5 to 2 days. There is usually a gap of 2 to 4 weeks between first fix and second fix while the plasterer, decorator, and kitchen/bathroom fitters complete their work. If a new DNO connection is required, allow 6 to 12 weeks lead time for the application and installation.',
  },
  {
    question: 'Can I extend the PME earth from the house to the annex?',
    answer:
      'The same considerations apply as for any outbuilding on a PME (TN-C-S) supply. BS 7671 Regulation 9.2 requires a risk assessment for extending PME to an outbuilding. For a detached annex, a TT earthing arrangement (local earth rod at the annex) is often the safer option, particularly if the annex has a bathroom with metallic pipework or an outdoor area with metallic structures. If the annex is attached to the main house (e.g. a converted extension), extending the PME earth is more straightforward because the annex shares the same building structure.',
  },
  {
    question: 'What fire safety requirements apply to a granny annex?',
    answer:
      'Fire safety requirements depend on whether the annex is attached to or detached from the main house. For an attached annex, 30-minute fire separation is required between the annex and the main house (fire-rated walls, doors, and fire-stopping of all service penetrations). For all annexes, interconnected mains-powered smoke alarms with battery backup must be installed in the hallway/landing, living room, kitchen (heat alarm), and bedroom. If the annex has two storeys, smoke alarms are required on each level. The electrical installation must include a dedicated circuit for the smoke detection system.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size sub-main cables from house to annex with voltage drop and derating calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Critical for long sub-main runs to detached annexes — check voltage drop before ordering cable.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for annex installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/garage-conversion-electrics',
    title: 'Garage Conversion Electrics',
    description:
      'Similar domestic conversion project — Building Regulations, consumer unit design, and fire safety.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/shed-electrical-installation',
    title: 'Shed Electrical Installation',
    description:
      'SWA cable routing, burial depth, and TT earthing — the same principles apply to annex sub-mains.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with modules covering special locations and domestic installation testing.',
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
    heading: 'Granny Annex Electrical Installation: Complete Guide',
    content: (
      <>
        <p>
          Granny annexes — self-contained living spaces built in the garden or attached to the main
          house — are one of the fastest-growing areas of domestic construction in the UK. They
          provide independent accommodation for elderly relatives, adult children, or rental income,
          and they require a complete electrical installation equivalent to a small flat or bungalow.
        </p>
        <p>
          Unlike a shed or garage conversion, a granny annex typically includes a kitchen, bathroom,
          living area, and bedroom. This means the electrical installation must cover every aspect of
          domestic wiring: general power and lighting, cooking circuits, bathroom special location
          requirements, heating, hot water, smoke detection, and potentially a separate metered
          supply.
        </p>
        <p>
          This guide covers the complete electrical installation process from supply design through
          to certification, with practical guidance on the decisions that affect cost and complexity.
        </p>
      </>
    ),
  },
  {
    id: 'supply-options',
    heading: 'Supply Options: Separate Meter vs Extension of Main',
    content: (
      <>
        <p>
          The most important design decision for an annex electrical installation is the supply
          arrangement. There are two options:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sub-Main from the House</h3>
            <p className="text-white text-sm leading-relaxed">
              The annex is supplied via a sub-main cable from the house consumer unit or a dedicated
              switch-fuse adjacent to the meter. This is the simpler and cheaper option. It is
              appropriate when the annex is ancillary to the main house (used by a family member, not
              separately metered or billed). The sub-main cable must be sized for the annex maximum
              demand — typically 16.0mm² or 25.0mm² SWA for a one-bedroom annex. The annex
              electricity cost is included in the main house bill.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Separate DNO Connection</h3>
            <p className="text-white text-sm leading-relaxed">
              The annex has its own electricity meter and a separate connection from the Distribution
              Network Operator (DNO). This is required when the annex is a separate dwelling (for
              rental, sale, or independent occupancy). The DNO installs a new service cable, cut-out,
              and meter. The electrician provides the meter tails and consumer unit. Lead time is
              typically 6 to 12 weeks. Cost is £500 to £2,000+ depending on the distance from the
              existing network and any excavation required.
            </p>
          </div>
        </div>
        <p>
          Check the planning conditions for the annex — they often specify whether the annex is
          ancillary (tied to the main house) or independent. This determines the supply arrangement,
          Council Tax liability, and whether a separate meter is required.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Design',
    content: (
      <>
        <p>
          The annex requires its own consumer unit with full RCD protection. A typical one-bedroom
          annex needs 8 to 12 ways:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits (x2)</strong> — separate circuits for bedrooms/living area
                and kitchen/bathroom. 6A MCB/RCBO, 1.0mm² or 1.5mm² twin and earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket circuits (x2)</strong> — one for the living area and bedroom, one for
                the kitchen. 32A ring final circuit or 20A radial in 2.5mm².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker circuit</strong> — 32A or 45A radial in 6.0mm² or 10.0mm², depending
                on the cooker rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shower circuit</strong> — if an electric shower is specified, 40A to 50A
                radial in 10.0mm². Consider the total demand — an electric shower on a sub-main may
                require a larger sub-main cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating circuit</strong> — dedicated circuit for panel heaters, underfloor
                heating, or heat pump. Size depends on heating type and load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater</strong> — 16A radial in 2.5mm² if the hot water is provided
                by an immersion heater in a cylinder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke detection</strong> — dedicated circuit or fed from the lighting circuit
                depending on the alarm type and Building Control preference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare ways (x2 minimum)</strong> — always provide spare ways for future
                additions (EV charger, additional appliances, external lighting).
              </span>
            </li>
          </ul>
        </div>
        <p>
          An RCBO board is the recommended approach — it provides individual RCD and overcurrent
          protection for each circuit without the risk of one fault tripping unrelated circuits. This
          is particularly important in a self-contained dwelling where losing all power to a fault on
          one circuit affects an elderly or vulnerable occupant.
        </p>
      </>
    ),
  },
  {
    id: 'kitchen-circuits',
    heading: 'Kitchen Circuits',
    content: (
      <>
        <p>
          The annex kitchen requires the same electrical provision as a kitchen in a house:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker circuit</strong> — a dedicated radial circuit for the cooker. For a
                standard domestic electric cooker, 32A in 6.0mm² is usually adequate (applying
                diversity). For a large range cooker, 45A in 10.0mm² may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — worktop sockets must be at least 300mm above the
                worktop surface. Provide a minimum of 4 double sockets above the worktop for small
                appliances. No sockets within the zone directly above the hob.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated appliance points</strong> — fused spurs or dedicated sockets for
                washing machine, dishwasher, fridge-freezer, and boiler (if an electric combi-boiler
                is used).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CookingPot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extract fan</strong> — a cooker hood or extract fan is required in kitchens
                for Part F ventilation compliance. Wire from a fused spur (3A or 5A).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bathroom-circuits',
    heading: 'Bathroom Circuits (Section 701)',
    content: (
      <>
        <p>
          The annex bathroom is a special location under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Section 701
          </SEOInternalLink>
          . The key requirements are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bath className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zoning</strong> — Zone 0 (inside the bath/shower tray), Zone 1 (above the
                bath/shower to 2.25m height), Zone 2 (0.6m horizontal from Zone 1), and outside
                zones. Equipment must be rated for the zone in which it is installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bath className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP ratings</strong> — minimum IPX7 in Zone 0, IPX4 in Zone 1, IPX4 in Zone
                2. Light fittings in Zone 1 must be rated IPX4 and suitable for the zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bath className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — no sockets permitted in Zones 0, 1, or 2. Sockets
                must be at least 3m horizontal from Zone 1, or supplied via a shaver supply unit
                conforming to BS EN 61558-2-5.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bath className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all circuits in the bathroom must have 30mA RCD
                protection. No exceptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bath className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> — supplementary bonding may be omitted if the
                protective device disconnection times are met (verified by measurement) and all
                circuits are RCD protected. Otherwise, bond all simultaneously accessible
                extraneous-conductive-parts and exposed-conductive-parts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For an electric shower, the pull-cord switch must be outside Zone 1 (typically ceiling-
          mounted outside the shower area). The shower circuit requires a dedicated MCB/RCBO sized
          for the shower unit rating — typically 40A to 50A for a 9kW to 10.8kW electric shower.
        </p>
      </>
    ),
  },
  {
    id: 'heating',
    heading: 'Heating and Hot Water',
    content: (
      <>
        <p>
          Annexes need their own heating and hot water system. The electrical requirements depend on
          the system chosen:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric panel heaters</strong> — the simplest option. Wall-mounted heaters
                (1kW to 2kW each) on a dedicated radial circuit per room or a shared circuit.
                Modern smart heaters with individual room thermostats are popular for annexes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating</strong> — excellent for annexes built on a new
                concrete slab. Install heating mats under the floor finish with zone thermostats.
                Requires dedicated circuits (typically one per room, 16A to 20A each).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump</strong> — increasingly common in new-build annexes for
                Part L compliance. The electrician provides the outdoor unit supply (typically 20A to
                32A), indoor unit wiring, and controls. A separate circuit for the heat pump is
                essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot water</strong> — if the annex has its own hot water cylinder, provide a
                dedicated 16A circuit for the immersion heater. If using an electric combi-boiler or
                instantaneous water heater, the supply requirements vary by unit — check the
                manufacturer data.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-separation',
    heading: 'Fire Separation and Smoke Detection',
    content: (
      <>
        <p>
          Fire safety in an annex has direct implications for the electrical installation:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire separation (attached annex)</strong> — if the annex is attached to the
                main house, a 30-minute fire-rated wall is required between the two. All cable
                penetrations must be fire-stopped with intumescent sealant or fire collars. The
                sub-main cable entry is a common point that must be fire-stopped.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and heat detection</strong> — mains-powered interconnected alarms with
                battery backup. Install smoke alarms in the hallway/circulation area, living room,
                and bedroom. Install a heat alarm in the kitchen (smoke alarms are unsuitable in
                kitchens due to cooking fumes). All alarms must be interconnected so they all sound
                when any one is triggered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — not typically required for a domestic annex, but
                consider a maintained emergency bulkhead at the entrance for elderly or disabled
                occupants who may need illuminated escape during a power failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'Building Control and Part P',
    content: (
      <>
        <p>
          The annex requires full Building Regulations approval. The electrical work is notifiable
          under Part P and must be either:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certified</strong> — by a registered electrician (NICEIC, NAPIT, ELECSA,
                etc.) who submits the EIC to Building Control via their competent person scheme. This
                is the standard approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — if the electrician is not registered,
                the homeowner must apply to Building Control before work starts. Building Control
                will inspect the work at first fix and final fix stages and charge an inspection fee.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building Control will want to see the{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          as part of the overall sign-off. The EIC must cover all circuits in the annex and the
          sub-main (if applicable). Ensure the certificate is completed before the Building Control
          final inspection.
        </p>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The annex installation must be fully tested and an EIC issued. The testing scope covers
          every circuit in the annex:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors on all circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Ring final circuit continuity (if ring circuits are used)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance on all circuits (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at every termination point</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth electrode resistance (if TT earthing with earth rod)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) on every circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation on all RCD/RCBO protected circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current at the annex consumer unit origin</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Functional testing of smoke/heat alarms, heating controls, and extract fans</span>
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
              <li>SWA cable cutters and gland kit</li>
              <li>Drill and bits (masonry, wood, hole saws)</li>
              <li>Cable detector and fish tape</li>
              <li>Cable strippers and cutters</li>
              <li>Crimping tool and ferrule kit</li>
              <li>Multimeter and continuity tester</li>
              <li>Insulation resistance tester (500V)</li>
              <li>Earth fault loop impedance tester</li>
              <li>Earth electrode resistance tester</li>
              <li>RCD tester</li>
              <li>Shovel or mini-digger (if trenching for sub-main)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Materials Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>SWA cable for sub-main (16.0mm² to 25.0mm²)</li>
              <li>Consumer unit (8 to 12 way RCBO board)</li>
              <li>Twin and earth cable (1.0mm², 1.5mm², 2.5mm², 6.0mm², 10.0mm²)</li>
              <li>Metal back boxes and dry-lining boxes</li>
              <li>Socket outlets, switches, dimmers</li>
              <li>LED downlights and bathroom-rated fittings (IPX4)</li>
              <li>Cooker switch and connection unit</li>
              <li>Shower pull-cord switch (45A/50A)</li>
              <li>Interconnected mains smoke/heat alarms</li>
              <li>Intumescent fire-stop sealant</li>
              <li>Earth rod and clamp (if TT arrangement)</li>
              <li>Underground ducting and warning tape</li>
              <li>SWA glands</li>
              <li>Heating equipment (heaters, UFH mats, thermostats)</li>
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
          Annex electrical installation costs depend on the size, specification, and supply
          arrangement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio annex (open plan, no kitchen)</strong> — lighting, sockets, heating,
                shower circuit, smoke detection: £3,000 to £4,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom annex (standard spec)</strong> — full kitchen, bathroom, living
                area, bedroom, heating: £4,000 to £6,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom annex (high spec)</strong> — two bathrooms, large kitchen, UFH,
                air source heat pump feed, data cabling: £6,000 to £8,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add-ons</strong> — new DNO connection: £500 to £2,000+. Earth rod
                installation: £80 to £150. Sub-main trench (per metre): £15 to £30. EV charger
                circuit: £300 to £600. Data cabling (Cat6 per point): £80 to £150.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Annex Installations Are Premium Work',
    content: (
      <>
        <p>
          Annex electrical installations are the highest-value domestic job type after full house
          rewires. A typical one-bedroom annex is worth £4,000 to £6,000 for the electrical package
          alone, and the work spans 3 to 5 days over a 4 to 8 week build programme. These are
          premium customers building substantial extensions — they value quality, professionalism,
          and certification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the complete annex electrical package with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Sub-main, consumer unit, all circuits, heating, testing, and certification — all
                  itemised with your margins. A professional PDF quote wins the job against
                  competitors who send a text message with a single number.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site. AI board scanning
                  captures every RCBO in seconds. Voice test entry for the schedule of results.
                  Instant PDF export for Building Control sign-off.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify annex electrics"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. Everything you need for annex electrical installations. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AnnexElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Granny Annex Electrical Installation | Wiring Guide UK"
      description="Complete guide to granny annex electrical installation in the UK. Separate supply vs extension, consumer unit design, kitchen and bathroom circuits, heating, fire separation, Building Control, and Part P certification with 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Granny Annex Electrical Installation:{' '}
          <span className="text-yellow-400">Complete Wiring Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about wiring a granny annex — separate supply vs sub-main, consumer unit design, kitchen and bathroom circuits, heating, fire separation, Building Control approval, and realistic 2026 pricing from £3,000 to £8,000."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Annex Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Annex Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certificates for annex installations. 7-day free trial, cancel anytime."
    />
  );
}
