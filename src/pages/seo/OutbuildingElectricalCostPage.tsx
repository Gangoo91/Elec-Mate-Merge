import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  Wrench,
  ShieldCheck,
  Cable,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'Outbuilding Electrical Cost', href: '/outbuilding-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'typical-costs', label: 'Typical Costs by Outbuilding Type' },
  { id: 'supply-options', label: 'Supply Options: Underground vs Overhead' },
  { id: 'subboard', label: 'Sub-Board & Consumer Unit' },
  { id: 'garden-office', label: 'Garden Office Electrical Requirements' },
  { id: 'trenching-costs', label: 'Trenching Costs' },
  { id: 'building-regs', label: 'Building Regulations & Part P' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An outbuilding electrical supply and installation typically costs £800 to £3,000, with the primary cost driver being the length of the underground armoured cable run and the complexity of the trenching route.',
  'All underground supplies to outbuildings require SWA (Steel Wire Armoured) cable buried at a minimum of 500mm depth, with sand bedding and cable covers — adding £20 to £50 per metre to the installation cost.',
  'A dedicated sub-board (consumer unit) inside the outbuilding is required under BS 7671 and provides local overcurrent protection and isolation for the circuits within the outbuilding.',
  'Garden offices with data points, multiple circuits, air conditioning, and high-speed internet connections cost more to wire than a simple garden shed — budget £1,500 to £3,000 for a well-specified garden office.',
  'All outbuilding electrical work is notifiable under Part P of the Building Regulations. A competent person scheme electrician self-certifies and provides the required EIC and compliance certificate.',
];

const faqs = [
  {
    question: 'How much does it cost to get electricity to an outbuilding?',
    answer:
      'The total cost of supplying electricity to an outbuilding depends on the distance from the house and the complexity of the route. A typical 15-metre run through a garden to a garden shed or summerhouse costs £800 to £1,400. A 25-metre run to a garden office with a full electrical installation costs £1,500 to £2,500. A 40-metre or longer run, or one that crosses hard landscaping, can cost £2,500 to £3,000 or more. These prices include the armoured cable, trenching, sub-board, and internal wiring.',
  },
  {
    question: 'What cable is used for an outbuilding supply?',
    answer:
      'The underground supply from the house to an outbuilding must use SWA (Steel Wire Armoured) cable. The cable size depends on the load required: 6mm² two-core SWA is suitable for most domestic outbuildings (lighting, sockets, small appliances). Where an air conditioning unit, workshop machinery, or EV charger is planned, 10mm² or larger may be required. The cable must be buried at 500mm minimum depth in a garden, with sand bedding and yellow cable covers.',
  },
  {
    question: 'Does outbuilding electrical work need Building Regulations approval?',
    answer:
      'Yes. Installing a new electrical supply and circuits in an outbuilding is notifiable under Part P of the Building Regulations. A competent person scheme electrician (NICEIC, NAPIT, ELECSA) self-certifies the work and issues the Part P compliance certificate. You also receive an Electrical Installation Certificate (EIC). These documents are important for property sale conveyancing.',
  },
  {
    question: 'What is a sub-board and do I need one for my outbuilding?',
    answer:
      'A sub-board (also called a distribution board or local consumer unit) is a small consumer unit installed inside the outbuilding at the point where the armoured cable enters the building. It provides overcurrent protection and RCD protection for all circuits within the outbuilding, and a local means of isolation. A sub-board is required by BS 7671 where the supply enters a building at a point remote from the main consumer unit. A simple 4-way sub-board costs £250 to £450 fitted.',
  },
  {
    question: 'Can I use a plug-in extension lead to power my garden office?',
    answer:
      'No. A plug-in extension lead dragged from the house to an outbuilding is not a safe or legal permanent solution. Extension leads are designed for temporary use and are not weatherproof. Using one as a permanent supply creates a fire risk, a shock risk, and will not pass any electrical inspection. A properly installed armoured cable supply with a sub-board and internal wiring is the only compliant solution.',
  },
  {
    question: 'How long does outbuilding electrical work take?',
    answer:
      'A straightforward outbuilding supply with a short cable run typically takes one to two days. A garden office with a longer cable run, trenching through a garden, and a more complex internal installation may take two to three days. Complex routes under driveways or through tree roots can add additional time. Trenching is usually done by hand for shorter runs; a mini-digger is cost-effective for runs over 20 metres.',
  },
  {
    question: 'Do I need planning permission for electricity to an outbuilding?',
    answer:
      'Generally, no. Connecting electricity to an existing outbuilding does not require planning permission. However, if the outbuilding itself requires planning permission (for example, a large garden room over the permitted development size limits), that is a separate issue. The electrical installation requires Part P Building Regulations notification, not planning permission. Always check with your local planning authority if the outbuilding is new and you are unsure about its planning status.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/garage-electrical-cost',
    title: 'Garage Electrical Installation Cost',
    description:
      'Detached and integral garage wiring costs, armoured cable, and EV charger add-ons.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Single and double-storey house extension electrical installation costs.',
    icon: Home,
    category: 'Cost Guide',
  },
  {
    href: '/guides/garden-electrical-wiring',
    title: 'Garden Electrical Wiring Guide',
    description: 'Safe zones, cable types, and regulations for garden electrical installations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional outbuilding electrical quotes from your phone.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Outbuilding Electrical Supply — What Is Involved',
    content: (
      <>
        <p>
          Supplying electricity to a garden office, workshop, summerhouse, or outbuilding is one of
          the most common domestic electrical jobs. It transforms a cold storage space into a
          productive, comfortable work or leisure area. The cost depends primarily on the distance
          from the house, the nature of the ground between the two buildings, and the scope of the
          internal electrical installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden shed or summerhouse (simple)</strong> — £800 to £1,400. SWA cable,
                short garden run, small sub-board, lighting and socket circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden office or workshop (medium)</strong> — £1,500 to £2,500. Longer cable
                run, more circuits, data points, heating circuit, and sub-board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large outbuilding or annexe (complex)</strong> — £2,500 to £3,500+. Long
                cable run, trenching under hard landscaping, larger sub-board, multiple circuits,
                and potentially a three-phase supply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs by Outbuilding Type',
    content: (
      <>
        <p>
          The internal electrical fit-out varies significantly depending on how the outbuilding will
          be used.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden shed</strong> — £800 to £1,200 total. Typically one lighting circuit,
                four double socket outlets, and a consumer unit. Armoured cable run of up to 15
                metres assumed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summerhouse or leisure room</strong> — £1,000 to £1,800. Lighting, multiple
                socket outlets, electric heater circuit, and data point for Wi-Fi extender or Cat6
                data cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden office (home working)</strong> — £1,500 to £2,500. Multiple power
                circuits, dedicated data points (Cat6), USB outlets, electric panel heater or air
                source heat pump connection, exterior security light.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workshop or hobby room</strong> — £1,500 to £2,800. Dedicated circuits for
                power tools and machinery, stronger overhead lighting (fluorescent or LED strips),
                potentially three-phase supply for larger machinery.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supply-options',
    heading: 'Supply Options: Underground vs Overhead',
    content: (
      <>
        <p>
          There are two routes for supplying electricity from the house to an outbuilding —
          underground or overhead. Both require SWA armoured cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground (preferred)</strong> — SWA cable buried at 500mm depth in a
                garden, on a bed of sharp sand with cable covers above. Invisible once reinstated.
                Requires trenching which adds £15 to £50 per metre depending on surface type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead catenary</strong> — SWA cable suspended on a catenary wire between
                the house and outbuilding. Minimum height of 3.5 metres above ground (5.2 metres
                over vehicle routes). Cheaper than going under a concrete driveway but visually
                intrusive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted on fence or wall</strong> — SWA cable clipped to a fence or
                wall surface is acceptable in some situations and avoids both trenching and aerial
                installation. Must be protected from mechanical damage at low level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The IET On-Site Guide and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          Appendix 4 provide the reference method and correction factors for armoured cable in
          various installation conditions. Burial depth correction factors must be applied to the
          cable's current-carrying capacity.
        </p>
      </>
    ),
  },
  {
    id: 'subboard',
    heading: 'Sub-Board and Consumer Unit in the Outbuilding',
    content: (
      <>
        <p>
          A sub-board (local consumer unit or distribution board) is installed inside the
          outbuilding at the point where the armoured cable enters. It is required by BS 7671 and
          provides local protection and isolation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-way split-load board</strong> — £250 to £400 fitted. Two MCB slots each
                side of a dual RCD. Suitable for shed or simple garden room (lighting + sockets).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6–8 way RCBO board</strong> — £350 to £550 fitted. Individual RCBO per
                circuit for better discrimination. Preferred for garden offices where a single fault
                should not cut power to everything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation facility</strong> — the main switch on the sub-board must be
                lockable or the sub-board door must be lockable, to satisfy the requirements of
                Regulation 537.2 (isolation and switching) of BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'garden-office',
    heading: 'Garden Office Electrical Requirements',
    content: (
      <>
        <p>
          A well-specified garden office requires more than a simple power circuit. Working from
          home means reliable power, good data connectivity, adequate lighting, and comfortable
          heating year-round. Planning the electrical installation carefully from the outset avoids
          expensive remedial work later.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data connectivity</strong> — Cat6 data cable from the house router or a
                dedicated Wi-Fi access point. Running a single Cat6 cable underground in the same
                trench as the power cable adds very little cost at the installation stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating</strong> — electric panel heater (500W to 2kW depending on floor
                area), infrared heating, or air source heat pump. Dedicated circuit per heater.
                Smart thermostat and timer strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power circuits</strong> — minimum of six double socket outlets in a typical
                home office, plus USB outlets. Separate circuit for IT equipment (computers,
                monitors, printers) is good practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — LED downlights or a high-quality LED strip for even task
                lighting. Bias lighting behind monitors reduces eye strain. External security light
                with PIR sensor at the outbuilding entrance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'trenching-costs',
    heading: 'Trenching Costs for Outbuilding Supplies',
    content: (
      <>
        <p>
          Trenching is frequently the most variable cost element in an outbuilding electrical
          installation. The ground conditions, surface type, and length of the run all affect the
          price significantly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Through lawn or garden (per metre)</strong> — £15 to £25 per metre,
                including digging, cable laying, sand bedding, cable covers, and reinstatement. A
                15-metre run adds £225 to £375.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Through block paving (per metre)</strong> — £25 to £40 per metre. Blocks
                must be carefully lifted, stored, and relaid. More labour-intensive than grass
                reinstatement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under concrete or tarmac driveway (per metre)</strong> — £40 to £60 per
                metre. Requires breaking out, core drilling, or boring. Concrete reinstatement adds
                significant materials and labour cost. Consider an overhead alternative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mini-digger hire (long runs)</strong> — for runs over 20 metres through a
                lawn, hiring a mini-digger for half a day (£150 to £300) can reduce labour time
                significantly and produce a cleaner trench.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations and Part P',
    content: (
      <>
        <p>
          Installing a new electrical supply to an outbuilding is notifiable electrical work under
          Part P of the Building Regulations (England and Wales). This applies to all new
          outbuilding supplies, regardless of the size or type of outbuilding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — a registered NICEIC, NAPIT,
                or ELECSA electrician notifies building control and issues the Part P compliance
                certificate without a separate building control application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> documents the
                full installation including the supply cable, sub-board, and all circuits. Essential
                for property sale conveyancing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing</strong> — the outbuilding must have its own earth electrode (earth
                rod) if the supply protective conductor (earth) cannot be confirmed as effective at
                the outbuilding. This is assessed at the time of installation and tested with an
                earth rod resistance test.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outbuilding Electrical Jobs',
    content: (
      <>
        <p>
          Outbuilding supplies are a consistently popular domestic job. The scope is well-defined,
          the work is satisfying, and there are natural upsell opportunities (data cable, security
          light, EV charger) that add value without significantly extending the installation time.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Trenching Separately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always quote trenching as a separate, itemised line. Surface type (lawn, block
                  paving, concrete) makes an enormous difference to cost. Customers understand why a
                  run under their concrete driveway costs more when it is clearly explained and
                  priced transparently.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wifi className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Offer Data Cable in the Trench</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always offer to pull a Cat6 data cable in the same trench as the armoured power
                  cable. The materials cost is minimal, the trench is already open, and the customer
                  saves significant money versus having it done separately. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to add it as an optional extra.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote outbuilding electrical installations professionally with Elec-Mate"
          description="Create itemised outbuilding electrical quotes with armoured cable, trenching, sub-board, and optional extras. Issue EICs on site. Join 1,000+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutbuildingElectricalCostPage() {
  return (
    <GuideTemplate
      title="Outbuilding Electrical Installation Cost UK 2025 | Garden Office Wiring"
      description="Outbuilding electrical installation costs in the UK for 2025. Garden shed and office wiring from £800–£3,000. SWA armoured cable, trenching costs, sub-board, garden office requirements, and Part P compliance explained."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Outbuilding Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Garden Office Wiring Prices</span>
        </>
      }
      heroSubtitle="Detailed breakdown of outbuilding electrical installation costs in the UK for 2025 — garden shed wiring from £800, garden office from £1,500, SWA armoured cable and trenching costs, sub-board requirements, and Part P compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outbuilding Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Outbuilding Electrical Installation in Minutes"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to create professional outbuilding electrical quotes with armoured cable, trenching, and optional extras clearly priced. 7-day free trial, cancel anytime."
    />
  );
}
