import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Building2,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Cable,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Commercial Rewire Cost', href: '/guides/commercial-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'What Does a Commercial Rewire Involve?' },
  { id: 'cost-per-m2', label: 'Cost Per Square Metre Breakdown' },
  { id: 'three-phase', label: '3-Phase Supply and Distribution' },
  { id: 'containment', label: 'Containment and Cable Management' },
  { id: 'data-fire-emergency', label: 'Data, Fire Alarm and Emergency Lighting' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Commercial Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial rewire costs in the UK typically range from £30 to £80 per square metre depending on specification, building complexity, and the scope of ancillary systems such as fire alarm and emergency lighting.',
  'Three-phase distribution is standard in commercial premises. A new 3-phase distribution board with MCCB panel costs £2,000 to £6,000 depending on the number of ways and rating.',
  'Containment (cable tray, trunking, conduit) often accounts for 25% to 40% of the total rewire cost in commercial buildings — significantly more than domestic work.',
  'Fire alarm systems to BS 5839-1 and emergency lighting to BS 5266-1 are typically included in the scope and must be designed, installed, and commissioned by competent persons.',
  'An Electrical Installation Certificate (EIC) must be issued on completion, covering the full installation to BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does a commercial rewire cost per square metre in 2026?',
    answer:
      'Commercial rewire costs typically range from £30 to £80 per square metre in 2026. A basic office refurbishment with standard power and lighting might sit at £30 to £45 per square metre, whilst a high-specification fit-out with 3-phase distribution, structured data cabling, fire alarm, emergency lighting, and BMS integration can reach £60 to £80 per square metre or more. These figures include containment, cabling, distribution, final circuits, and basic commissioning but typically exclude specialist systems such as access control or CCTV unless specified.',
  },
  {
    question: 'Does a commercial rewire need a 3-phase supply?',
    answer:
      'Most commercial premises already have a 3-phase supply, and a commercial rewire will typically involve 3-phase distribution. Even smaller commercial units such as retail shops or restaurants often have a 3-phase incoming supply. If the existing supply is single-phase and the load assessment shows it is inadequate, an application to the DNO for a 3-phase supply upgrade will be required — this can take 8 to 12 weeks and costs £1,500 to £5,000 depending on the work the DNO needs to carry out.',
  },
  {
    question: 'What containment systems are used in commercial rewires?',
    answer:
      'Commercial rewires use a combination of cable tray, cable basket, steel trunking, PVC trunking, and steel conduit. Cable tray and basket are used for primary distribution routes above suspended ceilings. Dado trunking provides power and data outlets at desk height in offices. Steel conduit is used in exposed or industrial areas. The choice depends on the building type, fire rating requirements, aesthetic considerations, and budget. Containment typically accounts for 25% to 40% of the total electrical installation cost.',
  },
  {
    question: 'Is fire alarm installation included in a commercial rewire?',
    answer:
      'Fire alarm installation is frequently included in the scope of a commercial rewire, particularly where the existing system is being replaced or the building use is changing. The fire alarm system must be designed and installed to BS 5839-1. The category of system (L1, L2, L3, L4, or M) depends on the risk assessment and building use. A typical Category L2 fire alarm installation in a 500 square metre office costs £3,000 to £8,000 for detection, sounders, interface units, and a conventional or addressable panel.',
  },
  {
    question: 'What certification is required for a commercial rewire?',
    answer:
      'An Electrical Installation Certificate (EIC) must be issued on completion of a commercial rewire, covering the full installation to BS 7671:2018+A3:2024. The EIC must be signed by the designer, installer, and inspector/tester. For commercial work, Part P notification is not required (Part P applies to domestic dwellings only), but the installation must still comply with the Building Regulations and the Electricity at Work Regulations 1989. Separate commissioning certificates are required for fire alarm (BS 5839-1) and emergency lighting (BS 5266-1) systems.',
  },
  {
    question: 'How long does a commercial rewire take?',
    answer:
      'A commercial rewire duration depends heavily on the floor area, specification level, and whether the building is occupied during the works. A 200 square metre office might take 2 to 3 weeks with a team of 2 to 3 electricians. A 1,000 square metre unit with full fire alarm, emergency lighting, and data cabling could take 6 to 10 weeks. Phased rewires in occupied buildings take longer due to out-of-hours working and the need to maintain power to operational areas. Always build a realistic programme with the client before starting.',
  },
  {
    question: 'Do I need asbestos checks before a commercial rewire?',
    answer:
      'Yes. Any commercial building built or refurbished before 2000 may contain asbestos in ceiling tiles, floor tiles, pipe lagging, or cable containment. The Control of Asbestos Regulations 2012 requires the duty holder to provide an asbestos management survey or refurbishment/demolition survey before intrusive works begin. As an electrical contractor, you must not disturb any material that may contain asbestos without a survey. If asbestos is found, a licensed removal contractor must deal with it before electrical work proceeds in that area.',
  },
  {
    question: 'What is the difference between a Cat 5 and Cat 6 commercial rewire?',
    answer:
      'Cat 5 and Cat 6 refer to the specification level of the electrical installation rather than data cable categories — though the terms are sometimes confused. In commercial rewiring, the specification is usually defined by the level of containment, density of power and data outlets, quality of distribution equipment, and inclusion of ancillary systems. A basic Cat A specification covers the base build (distribution, containment routes, floor boxes), whilst a Cat B fit-out adds the final wiring to individual workstations, meeting rooms, and specialist areas.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Domestic Rewire Cost UK 2026',
    description: 'Full house rewire costs for comparison with commercial rates.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/warehouse-lighting-cost',
    title: 'Warehouse Lighting Cost',
    description: 'High bay LED lighting installation costs for industrial premises.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote commercial rewires with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Does a Commercial Rewire Involve?',
    content: (
      <>
        <p>
          A commercial rewire is a fundamentally different undertaking to a domestic rewire. The scale
          of distribution, the containment requirements, the regulatory framework, and the ancillary
          systems involved — fire alarm, emergency lighting, data infrastructure — mean that
          commercial electrical projects demand a different approach to pricing and project management.
        </p>
        <p>
          Commercial rewires typically involve replacing the entire electrical installation from the
          incoming supply through to final circuits. This includes 3-phase distribution boards,
          sub-distribution, containment systems (cable tray, trunking, conduit), power circuits,
          lighting circuits, small power, and often fire alarm and emergency lighting systems.
        </p>
        <p>
          Whether you are a building owner planning a refurbishment, a project manager tendering the
          electrical package, or an electrical contractor pricing a commercial rewire, this guide
          provides realistic per-square-metre costs based on current UK market rates.
        </p>
      </>
    ),
  },
  {
    id: 'cost-per-m2',
    heading: 'Cost Per Square Metre Breakdown',
    content: (
      <>
        <p>
          Commercial electrical installations are typically priced per square metre of gross internal
          floor area. The rate varies significantly depending on the specification level and building
          complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Per Square Metre Rates (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic specification (£30 to £45/m²)</strong> — Standard office rewire with
                power, lighting, and basic containment. No fire alarm or emergency lighting in scope.
                Single distribution board replacement. Suitable for small office refurbishments
                under 300m².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid specification (£45 to £60/m²)</strong> — Full rewire with 3-phase
                distribution, sub-distribution boards, structured data cabling, fire alarm (Category
                L2 to BS 5839-1), emergency lighting (to BS 5266-1), and dado or floor box
                containment. The most common specification for medium-sized commercial
                refurbishments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High specification (£60 to £80/m²)</strong> — Full rewire with MCCB panel
                board, multiple sub-distribution boards, high-density power and data (1 double per
                desk position), addressable fire alarm, maintained emergency lighting, lighting
                control systems (DALI), BMS integration, and UPS provisions. Typical for corporate
                offices, medical centres, and high-end retail.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a typical 500m² commercial office at mid specification, the electrical installation
          cost would be £22,500 to £30,000. A 1,000m² high-specification fit-out would be £60,000
          to £80,000. These figures include materials, labour, containment, testing, and
          certification.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: '3-Phase Supply and Distribution',
    content: (
      <>
        <p>
          Almost all commercial premises operate on a 3-phase supply. The distribution architecture
          is the backbone of the installation and must be designed to accommodate the assessed load
          with appropriate diversity applied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Distribution Equipment Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase main distribution board (TPN)</strong> — £2,000 to £6,000 supply
                and install depending on rating and number of ways. An 18-way TPN board with MCCB
                incomer costs approximately £3,500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards</strong> — £800 to £2,500 each supply and install.
                Each floor or zone typically has its own sub-distribution board fed from the main
                board via a submain cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submain cables</strong> — £15 to £60 per metre installed depending on CSA.
                A 4-core 25mm² SWA cable for a floor sub-distribution costs approximately £25 per
                metre installed including containment and termination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD protection</strong> — Required under BS 7671:2018+A3:2024 Regulation
                443.4. Type 1+2 SPDs at the main board cost £300 to £600 installed. Type 2 SPDs at
                sub-distribution boards cost £150 to £300 each.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Phase balancing is critical in commercial installations. The design should distribute
          single-phase loads evenly across the three phases to avoid excessive neutral current and
          voltage imbalance. This must be verified during commissioning.
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
          Containment is one of the biggest cost drivers in commercial electrical work. Unlike
          domestic installations where cables are clipped or run in the building fabric, commercial
          work requires engineered containment routes that provide access, support, and fire
          protection.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cable Tray and Basket</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable tray (£8 to £15/m installed) and cable basket (£6 to £12/m installed) are the
              primary containment for distribution routes above suspended ceilings. Medium-duty
              cable tray is used for power cables; cable basket is often used for data cables. Fire
              barriers must be installed where tray passes through compartment walls.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Trunking and Conduit</h3>
            <p className="text-white text-sm leading-relaxed">
              Dado trunking (£12 to £25/m installed) provides power and data outlets at desk height
              in offices. Floor trunking and floor boxes (£80 to £200 per floor box installed)
              serve open-plan areas. Steel conduit (£8 to £18/m installed) is used in exposed
              areas and where mechanical protection is needed.
            </p>
          </div>
        </div>
        <p>
          Containment typically accounts for 25% to 40% of the total electrical installation cost
          in commercial buildings. Getting the containment design right at tender stage is critical
          — underestimating containment is one of the most common causes of losses on commercial
          electrical contracts.
        </p>
      </>
    ),
  },
  {
    id: 'data-fire-emergency',
    heading: 'Data, Fire Alarm, and Emergency Lighting',
    content: (
      <>
        <p>
          A commercial rewire scope frequently includes structured data cabling, fire alarm
          systems, and emergency lighting. These are often the responsibility of the electrical
          contractor even though they require specialist design competence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured data cabling</strong> — Cat6A data point: £80 to £150 per point
                installed (including patch panel termination and testing). A typical office desk
                position requires 2 data points. Fibre backbone between comms rooms: £500 to
                £1,500 per link.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm to BS 5839-1</strong> — A Category L2 addressable fire alarm
                system costs £6 to £12 per square metre. This includes detectors, manual call
                points, sounders, interface units, and an addressable panel. Design must be by a
                competent fire alarm designer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting to BS 5266-1</strong> — £3 to £6 per square metre for a
                maintained or non-maintained system. This includes emergency luminaires on escape
                routes, open areas, and high-risk task areas. 3-hour duration is standard for most
                commercial premises.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a 500m² office, ancillary systems might add £8,000 to £15,000 to the base electrical
          installation cost. These systems require separate design, commissioning certificates, and
          ongoing maintenance contracts.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Commercial Rewire Price',
    content: (
      <>
        <p>
          The per-square-metre rate can vary by a factor of two or more depending on these key
          variables:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building type and access</strong> — A vacant shell with clear ceiling voids
                is far cheaper to wire than an occupied building with limited access, asbestos
                risks, and out-of-hours working requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specification density</strong> — Power and data outlet density varies
                hugely. A basic warehouse office might have 1 double socket per 10m². A trading
                floor might have 4 doubles per desk position at 6m² per desk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working hours restrictions</strong> — Occupied buildings may require
                evening and weekend working, adding 25% to 50% to labour costs through overtime
                rates and reduced productivity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos and legacy services</strong> — Pre-2000 buildings often contain
                asbestos. Removal or encapsulation costs are borne by the client but cause
                programme delays that affect the electrical contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — London rates are 20% to 40% higher than regional rates
                due to labour costs, parking, congestion charge, and site access restrictions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          Commercial electrical installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the Electricity at Work Regulations 1989. Unlike domestic work, Part P of the Building
          Regulations does not apply to commercial premises — but the installation must still comply
          with the relevant parts of the Building Regulations, particularly Part B (fire safety).
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued on completion, signed by the
          designer, installer, and inspector/tester. For larger installations, the testing and
          inspection may be split across multiple schedules of test results.
        </p>
        <p>
          RCD protection is required for socket outlets up to 32A per Regulation 411.3.3 of BS 7671.
          In commercial installations, this is typically provided by RCBOs on individual circuits
          rather than bank RCDs, to avoid nuisance tripping affecting multiple circuits.
        </p>
        <p>
          Fire alarm systems must be designed and installed to BS 5839-1, with a separate
          commissioning certificate. Emergency lighting must comply with BS 5266-1. Both systems
          require ongoing periodic testing and maintenance.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Commercial Rewires',
    content: (
      <>
        <p>
          Commercial rewires are high-value contracts with significant profit potential — but also
          significant risk if priced incorrectly. Here are practical tips for quoting commercial
          electrical work:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Measure Containment First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Walk the building and measure every containment route before pricing anything
                  else. Containment is the biggest variable cost. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised schedules of containment, distribution equipment, and final
                  circuits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include All Certification Costs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Allow adequate time for testing and completing the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. A 500m²
                  commercial installation might take 2 to 3 days to test and certify properly. Do
                  not squeeze this into the last afternoon of the contract.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Programme and Prelims</h4>
                <p className="text-white text-sm leading-relaxed">
                  Include programme-related costs (prelims): site supervision, welfare, temporary
                  lighting, tool hire, waste disposal, and site access. On a 6-week commercial
                  contract, prelims can add 8% to 12% to the direct costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote commercial rewires with confidence"
          description="Elec-Mate's quoting app handles itemised commercial tenders with distribution equipment, containment schedules, and final circuit costing. AI cost engineering validates your rates against current market data."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommercialRewireCostPage() {
  return (
    <GuideTemplate
      title="Commercial Rewire Cost 2026 | UK Per m² Price Guide"
      description="How much does a commercial rewire cost in 2026? UK per square metre pricing for 3-phase distribution, containment, data cabling, fire alarm, and emergency lighting. £30-80/m² with realistic breakdowns."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Commercial Rewire Cost:{' '}
          <span className="text-yellow-400">UK Per m² Price Guide 2026</span>
        </>
      }
      heroSubtitle="What does a commercial rewire really cost? This guide covers per-square-metre pricing for 3-phase distribution, containment systems, data cabling, fire alarm, and emergency lighting — with realistic figures for electricians pricing commercial contracts."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Commercial Rewires with Itemised Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for commercial quoting with distribution schedules, containment costing, and AI cost engineering. 7-day free trial."
    />
  );
}
