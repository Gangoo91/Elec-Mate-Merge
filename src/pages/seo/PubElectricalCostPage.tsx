import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Tv,
  Beer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'Pub Electrical Cost', href: '/pub-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Licensed Premises Electrical Overview' },
  { id: 'cellar-cooling', label: 'Cellar Cooling & Bar Equipment' },
  { id: 'gaming-machines', label: 'Gaming Machines & FOBT' },
  { id: 'emergency-lighting', label: 'Emergency Lighting (BS 5266)' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'cctv-security', label: 'CCTV & Security' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'eicr', label: 'EICR for Licensed Premises' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full electrical installation or major refurbishment for a UK pub or licensed premises typically costs £12,000 to £35,000 depending on size, cellar specification, and gaming machine provision.',
  'Cellar cooling compressors require dedicated circuits; many modern pub cellars run multiple cooling systems totalling 5–15kW, requiring careful load balancing across phases.',
  'Gaming machines (AWP, SWP, FOBTs) each need a dedicated 13A circuit with RCD protection. A typical pub with 3–5 machines requires individual fused spur outlets and tamper-evident documentation.',
  'Emergency lighting to BS 5266-1 is mandatory in all licensed premises. The licence itself may be revoked by the licensing authority if life-safety systems are found to be non-functional during a visit.',
  'An EICR is required at least every five years for commercial premises. Many pub companies require EICRs on change of tenancy and include EICR compliance as a condition of the lease agreement.',
];

const faqs = [
  {
    question: 'How much does a pub electrical installation cost in the UK?',
    answer:
      'A complete electrical installation or major refurbishment for a UK pub costs £12,000 to £35,000 depending on the size of the premises, cellar specification, gaming machine provision, kitchen equipment, and whether a 3-phase supply upgrade is required. A small community pub with a basic cellar, 3 gaming machines, and a simple food-service kitchen sits at the lower end. A large managed house with a full commercial kitchen, extensive cellar cooling, multiple gaming positions, and sophisticated AV systems will reach £30,000–£35,000 or more.',
  },
  {
    question: 'Does a pub need a 3-phase electrical supply?',
    answer:
      'Most pubs with commercial kitchens and significant cellar cooling loads benefit from a 3-phase 400V supply. A typical managed house may have combined loads of 40–80kW across kitchen equipment, cellar cooling, gaming machines, and general power. Cellar cooling compressors, commercial dishwashers, and cooking equipment all contribute significant demands. Where only a bar (no full kitchen) is served, a large single-phase service may suffice, but 3-phase provides headroom for future expansion.',
  },
  {
    question: 'What electrical requirements apply to pub gaming machines?',
    answer:
      'Gaming machines (Amusement With Prizes/AWP, Skill With Prizes/SWP, and Fixed Odds Betting Terminals/FOBTs) must each be supplied from a dedicated 13A circuit with RCD protection. Individual fused spurs with RCD protection are the preferred wiring method. Each outlet position must be documented and circuits tested. The machine positions are typically specified by the pub company or brewery and must match the premises licence conditions regarding number and category of machines.',
  },
  {
    question: 'How often does a pub need an EICR?',
    answer:
      'Commercial premises including pubs require an EICR at least every five years or on change of occupancy. However, many pub company leases and tenancy agreements require an EICR on each change of tenant. Licensing authorities and fire safety officers may also request evidence of a current satisfactory EICR during routine inspections. An unsatisfactory EICR can threaten the continuation of the premises licence if life-safety systems are found to be inadequate.',
  },
  {
    question: 'What fire alarm system does a pub need?',
    answer:
      'The fire alarm category for a pub is specified by the fire risk assessment, which is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005. Most pubs require at minimum a Category M (manual detection only) system with manual call points at all exits. Pubs with sleeping accommodation (letting rooms) require automatic detection to BS 5839-1 Category L3 or higher. The fire alarm system wiring must be carried out to BS 5839-1 and documented with a commissioning certificate.',
  },
  {
    question: 'Does a pub cellar need special electrical installation?',
    answer:
      'Yes. Pub cellars are classed as restrictive conductive locations under BS 7671 Section 706. All metalwork is bonded, socket outlets must have RCD protection, and IP-rated fittings are required in areas subject to water ingress from cleaning. Cellar cooling compressors must have isolators within sight of each unit. CO₂ and N₂ gas detection systems (for draught beer dispensing) also require electrical supply and should have a low-level alarm wired to an audible/visual indicator at the bar.',
  },
  {
    question: 'What CCTV is required in a pub?',
    answer:
      'Many pub licensing conditions require CCTV as a condition of the licence under the Licensing Act 2003. Typical requirements include coverage of the main entrance, exit, bar area, and any gaming machine positions. CCTV footage is typically required to be retained for 28–31 days. The electrical installation covers the NVR/DVR supply circuit, PoE switch for IP cameras, and conduit routes for cabling. CCTV installation typically costs £300–£800 in electrical works alone.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/restaurant-electrical-cost',
    title: 'Restaurant Electrical Installation Cost',
    description: 'Full cost guide for commercial kitchen electrical, 3-phase supply, gas interlocks, and emergency lighting.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/care-home-electrical-cost',
    title: 'Care Home Electrical Installation Cost',
    description: 'Nurse call, emergency lighting, fire alarms, and healthcare-grade electrical for care homes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation-cost',
    title: 'Commercial Electrical Installation Cost',
    description: 'Complete UK commercial electrical cost guide for all building types.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on site with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Licensed Premises Electrical Installation: Key Considerations',
    content: (
      <>
        <p>
          Electrical installations in pubs, bars, and other licensed premises combine the demands
          of a commercial food and drink environment with the specific requirements of a licensed
          venue — gaming machine circuits, cellar cooling, CO₂ detection, extensive AV systems,
          and the highest standards of life-safety electrical systems because of the concentration
          of public patrons.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Beer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar and dispense systems</strong> — cooling compressors, CO₂/N₂
                detection, glycol cooler circuits, and cellar lighting (IP-rated in wet areas).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Beer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bar and gaming</strong> — dedicated circuits for gaming machines, POS
                systems, card payment terminals, chilled display cabinets, glasswashers, and
                coffee machines.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Beer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Life-safety systems</strong> — emergency lighting to{' '}
                <SEOInternalLink href="/guides/emergency-lighting-bs5266">
                  BS 5266-1
                </SEOInternalLink>
                , fire alarm wiring to BS 5839-1, and CO₂ gas detection alarm systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Beer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Entertainment and AV</strong> — sports TV screens (commercial display
                circuits), audio amplifier rack supplies, outdoor sound system wiring, quiz
                machine circuits, and external lighting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All electrical work must comply with BS 7671:2018+A3:2024. Cellar areas are subject
          to Section 706 (restrictive conductive locations). The premises licence under the
          Licensing Act 2003 may impose specific electrical requirements as licence conditions.
        </p>
      </>
    ),
  },
  {
    id: 'cellar-cooling',
    heading: 'Cellar Cooling, Bar Equipment, and Dispense Systems',
    content: (
      <>
        <p>
          The cellar is one of the highest electrical load areas in a pub. Multiple cooling
          compressors, glycol coolers, and beer line refrigeration units all run continuously,
          creating a constant base load that must be properly designed into the distribution
          system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar cooling units</strong> — cellar coolers for ale and lager typically
                draw 0.5–2.5kW each. A pub running 4–6 cooling units has a continuous cellar
                cooling load of 3–12kW. Each unit requires a dedicated circuit with an isolator
                within sight of the unit, as required by BS 7671 Regulation 462.1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CO₂ and N₂ gas detection</strong> — cellar CO₂ and nitrogen gas detection
                systems are required by HSE guidance where gas cylinders are stored (HSG187).
                The gas detection panel requires a dedicated mains supply and must trigger
                audible/visual alarms at the bar level. This wiring is typically small in scope
                (£300–£600) but must not be omitted — CO₂ build-up in an unventilated cellar
                is a serious risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar IP ratings</strong> — cellar areas that are hosed down require IP44
                minimum for socket outlets and IP44 or higher for light fittings. All metallic
                services in the cellar (cooling pipes, gas lines, structural metalwork) must be
                bonded to the main earthing terminal under BS 7671 Regulation 411.3.1.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bar back equipment</strong> — undercounter bottle coolers, glasswashers
                (3–6kW), coffee machines (2–3.5kW), and chilled display cabinets all require
                individual circuits. A typical bar with full back-bar equipment has 8–16 dedicated
                circuits. Individual isolators or lockable fused spurs are recommended for each
                piece of equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gaming-machines',
    heading: 'Gaming Machines and Fixed Odds Betting Terminals',
    content: (
      <>
        <p>
          Gaming machine electrical installations in pubs must comply with the Gambling Act 2005
          (which governs the number and category of machines permitted), the premises licence
          conditions, and BS 7671 for the electrical supply to each machine.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tv className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit requirements</strong> — each gaming machine position requires a
                dedicated 13A outlet with RCD protection. Shared circuits between gaming machines
                are not acceptable. The outlet must be a switched fused spur with the fuse rating
                matching the machine's maximum draw (typically 5A or 13A).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tv className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — machine positions must be documented in the
                premises licence or ancillary schedule. The electrician should confirm that the
                number of wired positions does not exceed the licence allowance. Any changes to
                machine positions require the landlord/licensee to notify the licensing authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tv className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FOBTs in betting-licensed pubs</strong> — where a pub holds an ancillary
                betting licence permitting Fixed Odds Betting Terminals, machine positions require
                additional network connectivity (typically Cat6 or fibre) in addition to the
                electrical supply. The electrician may be asked to install containment for the
                data cabling as part of the electrical works.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting to BS 5266-1',
    content: (
      <>
        <p>
          Emergency lighting in pubs and bars is a legal requirement under the Regulatory Reform
          (Fire Safety) Order 2005 and the Licensing Act 2003. Inadequate emergency lighting
          is one of the most common reasons for licensing authority enforcement action.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage requirements</strong> — emergency lighting must cover all escape
                routes (corridors, stairways leading to exits), each final exit door, changes of
                direction, and the cellar (if it has a separate exit). Bar areas over 60m² require
                anti-panic open-area emergency lighting at 0.5 lux minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Letting rooms</strong> — pubs with upstairs letting rooms or staff
                accommodation require emergency lighting to BS 5266-1 in all sleeping areas,
                corridors, and common areas, with duration increased to 3 hours where sleeping
                accommodation is above ground floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and log books</strong> — the premises licence responsible person
                must maintain an emergency lighting log book. Monthly function tests and an annual
                full discharge test are required. Self-test luminaires compliant with BS EN 62034
                automate the test cycle and are increasingly specified for pub refurbishments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation costs</strong> — emergency lighting for a typical community
                pub (ground floor only): £900–£2,500. A larger two-floor managed house with
                letting rooms: £2,500–£5,500. Self-test fittings add 20–35% to supply cost but
                reduce annual maintenance cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems for Licensed Premises',
    content: (
      <>
        <p>
          The fire alarm system category for a pub is determined by the fire risk assessment
          (a legal obligation under the Regulatory Reform (Fire Safety) Order 2005). Wiring
          is governed by BS 5839-1. The licensing authority and fire safety officer both have
          powers to require specific fire alarm provisions as conditions of the licence.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category M (manual only)</strong> — a basic pub without sleeping
                accommodation may require only a manual system with break-glass call points at
                all exits, connected to a panel and alarm sounders. Cost: £1,200–£3,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category L3/L2 (automatic detection)</strong> — pubs with sleeping
                accommodation require automatic detection in high-risk areas (kitchen, plant
                rooms) and all escape routes. An addressable or conventional panel with heat
                and smoke detectors, beam detectors in large open spaces, and duct detectors
                in HVAC systems is typical. Cost: £3,000–£9,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen detection</strong> — standard ionisation or optical smoke detectors
                are not suitable for kitchens. BS 5839-1 requires either rate-of-rise heat
                detectors or fixed temperature heat detectors in kitchen areas to avoid false
                alarms. Multi-sensor or specialist kitchen-grade detectors are available.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cctv-security',
    heading: 'CCTV and Security Systems',
    content: (
      <>
        <p>
          CCTV is frequently a condition of the premises licence under the Licensing Act 2003,
          particularly in premises located in Cumulative Impact Zones (CIZs) or with a history
          of licensing concerns. The licensing authority specifies the coverage requirements
          in the licence conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard licence CCTV requirements</strong> — main entrance (internal
                and external), bar area covering all points of sale, gaming machine positions,
                and exit doors. Footage retention typically 28–31 days as specified by the
                licensing authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation</strong> — NVR/DVR supply circuit (typically
                5A or 13A fused spur), PoE switch for IP cameras, cable containment for Cat6
                cabling, and outdoor camera weatherproof conduit routes. Estimated electrical
                cost: £350–£900 for a typical pub.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access control</strong> — larger managed houses may require electronic
                access control to cellar, safe room, and staff areas. Door access controllers
                require a 12–24V DC supply from a dedicated access control panel with battery
                backup. Electrical costs: £200–£600 per door depending on controller type.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Pub Electrical Installation Cost Breakdown 2025',
    content: (
      <>
        <p>
          The following cost estimates reflect 2025 UK rates including labour and materials but
          excluding VAT. London rates are typically 15–25% higher.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main distribution board (3-phase, 100–200A TPN)</strong> — £1,000–£3,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar electrical installation</strong> — £1,500–£4,000. Includes cooling
                unit circuits, CO₂ detection supply, IP-rated lighting, bonding, and isolators.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bar and back-bar circuits</strong> — £1,200–£3,500. Glasswasher, bottle
                coolers, coffee machine, fridges, POS systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gaming machine circuits (per machine)</strong> — £120–£250. RCD-protected
                fused spur, outlet, and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting to BS 5266-1</strong> — £900–£5,500 depending on
                floor area and whether letting rooms are present.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> — £1,200–£9,000 depending on category and
                addressable versus conventional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General lighting, power and kitchen</strong> — £3,000–£10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV electrical supply</strong> — £350–£900.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total new pub fit-out or full refurbishment</strong> —{' '}
                <strong>£12,000–£35,000</strong>. A small community pub: £12,000–£18,000. A
                large managed house with full kitchen, letting rooms, and extensive gaming:
                £28,000–£35,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR Requirements for Licensed Premises',
    content: (
      <>
        <p>
          Pubs and licensed premises have multiple parties with an interest in the EICR —
          the pub company or freeholder, the tenant or leaseholder, the insurer, and the
          licensing authority. Understanding who requires what, and when, avoids compliance gaps.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-year maximum</strong> — commercial EICR maximum interval is five
                years. Pub company leases typically require an EICR on each change of tenant,
                meaning the interval is often driven by tenant turnover rather than the five-year
                limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance requirements</strong> — pub insurers frequently require a
                satisfactory EICR as a condition of cover, particularly for fire-related coverage.
                An unsatisfactory or expired EICR may invalidate the policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licensing authority</strong> — the licensing authority and fire safety
                officer can request the EICR and emergency lighting certification during routine
                inspections or following an incident. Failure to produce current satisfactory
                documentation may result in a review of the premises licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR costs for a pub</strong> — a typical pub EICR costs £350–£900
                depending on size, number of distribution boards, and the scope of life-safety
                systems to be tested. Pubs with extensive cellar installations and multiple
                sub-boards are at the upper end.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Pub and Licensed Premises Electrical Work',
    content: (
      <>
        <p>
          Licensed premises electrical work is high-value and generates reliable repeat business
          — EICR cycles, emergency lighting maintenance contracts, reactive call-outs, and gaming
          machine position additions when licence conditions change. Electricians who understand
          licensing conditions and life-safety system requirements are highly valued by pub
          operators.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  from your phone while still on site. Pub operators need documentation fast —
                  licensing visits can happen with short notice.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage pub electrical contracts with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for commercial quoting, EIC and EICR completion, and emergency lighting certification. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PubElectricalCostPage() {
  return (
    <GuideTemplate
      title="Pub Electrical Installation Cost UK 2025 | Licensed Premises Electrical"
      description="Pub electrical installation costs UK 2025. Cellar cooling circuits, gaming machine wiring, emergency lighting to BS 5266-1, fire alarms, CCTV, and EICR requirements for licensed premises. Typical pub fit-out £12,000–£35,000."
      datePublished="2025-01-01"
      dateModified="2025-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Cost Guide"
      badgeIcon={Beer}
      heroTitle={
        <>
          Pub Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Licensed Premises Guide</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK pub and licensed premises electrical installations. Cellar cooling, gaming machine circuits, emergency lighting to BS 5266-1, fire alarm systems, CCTV, and EICR compliance. Typical fit-out £12,000–£35,000."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Pub Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certificate Pub Electrical Work on Site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for commercial quotes, EIC and EICR completion, and emergency lighting log books. 7-day free trial, cancel anytime."
    />
  );
}
