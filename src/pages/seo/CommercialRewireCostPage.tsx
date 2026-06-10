import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Building2,
  AlertTriangle,
  FileCheck2,
  Wrench,
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
  'An Electrical Installation Certificate (EIC) must be issued on completion, covering the full installation to BS 7671:2018+A4:2026.',
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
      'An Electrical Installation Certificate (EIC) must be issued on completion of a commercial rewire, covering the full installation to BS 7671:2018+A4:2026. The EIC must be signed by the designer, installer, and inspector/tester. For commercial work, Part P notification is not required (Part P applies to domestic dwellings only), but the installation must still comply with the Building Regulations and the Electricity at Work Regulations 1989. Separate commissioning certificates are required for fire alarm (BS 5839-1) and emergency lighting (BS 5266-1) systems.',
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
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote commercial rewires with itemised materials, labour, and professional PDF output.',
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
          A commercial rewire is a fundamentally different undertaking to a domestic rewire. The
          scale of distribution, the containment requirements, the regulatory framework, and the
          ancillary systems involved — fire alarm, emergency lighting, data infrastructure — mean
          that commercial electrical projects demand a different approach to pricing and project
          management.
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
        <p className="text-sm text-white/60 border-l-2 border-yellow-400/40 pl-3 mt-2">
          Written by a qualified electrician and reviewed against BS 7671:2018+A4:2026.
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
          Commercial electrical installations are typically priced per square metre of gross
          internal floor area. The rate varies significantly depending on the specification level
          and building complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="font-bold text-white text-lg">Per Square Metre Rates (2026)</h3>
            <p className="text-white/60 text-xs mt-1">
              Indicative UK market guidance — not a quote. Rates cover supply, install, test and
              certification.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="p-5 bg-green-500/[0.06]">
              <div className="text-xs font-semibold uppercase tracking-wide text-green-300/80">
                Basic
              </div>
              <div className="text-2xl font-bold text-white mt-1">£30–£45/m²</div>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Standard office rewire with power, lighting and basic containment. No fire alarm or
                emergency lighting in scope. Single distribution board replacement. Suits small
                refurbishments under 300m².
              </p>
            </div>
            <div className="p-5 bg-yellow-500/[0.06]">
              <div className="text-xs font-semibold uppercase tracking-wide text-yellow-300/80">
                Mid · Most common
              </div>
              <div className="text-2xl font-bold text-white mt-1">£45–£60/m²</div>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Full rewire with 3-phase distribution, sub-distribution boards, structured data
                cabling, fire alarm (Category L2 to BS 5839-1), emergency lighting (BS 5266-1) and
                dado or floor-box containment.
              </p>
            </div>
            <div className="p-5 bg-blue-500/[0.06]">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-300/80">
                High spec
              </div>
              <div className="text-2xl font-bold text-white mt-1">£60–£80/m²</div>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                MCCB panel board, multiple sub-distribution boards, high-density power and data,
                addressable fire alarm, maintained emergency lighting, DALI lighting control, BMS
                integration and UPS provisions. Corporate offices, medical centres, high-end retail.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="px-5 py-3 border-b border-white/10">
            <h3 className="font-bold text-white text-base">Worked Examples by Floor Area</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-white/60 text-xs uppercase tracking-wide">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-semibold">Floor area</th>
                <th className="px-5 py-3 font-semibold">Specification</th>
                <th className="px-5 py-3 font-semibold text-right">Indicative cost</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5">
                <td className="px-5 py-3">200m²</td>
                <td className="px-5 py-3 text-white/80">Basic office</td>
                <td className="px-5 py-3 text-right font-medium">£6,000–£9,000</td>
              </tr>
              <tr className="border-b border-white/5 bg-yellow-500/[0.04]">
                <td className="px-5 py-3">500m²</td>
                <td className="px-5 py-3 text-white/80">Mid spec</td>
                <td className="px-5 py-3 text-right font-medium">£22,500–£30,000</td>
              </tr>
              <tr>
                <td className="px-5 py-3">1,000m²</td>
                <td className="px-5 py-3 text-white/80">High spec fit-out</td>
                <td className="px-5 py-3 text-right font-medium">£60,000–£80,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These figures include materials, labour, containment, testing and certification. They
          exclude specialist systems such as access control or CCTV unless specifically scoped, and
          assume a vacant or partly occupied building. Always treat per-m² rates as a starting point
          for a measured estimate, not a fixed price — the factors covered further down this guide
          can move the rate by a factor of two.
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
          Almost all commercial premises operate on a 3-phase supply. The{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution architecture
          </SEOInternalLink>{' '}
          is the backbone of the installation and must be designed to accommodate the assessed load
          with appropriate diversity applied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="px-5 py-3 border-b border-white/10">
            <h3 className="font-bold text-white text-base">Distribution Equipment Costs</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-white/60 text-xs uppercase tracking-wide">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-semibold">Item</th>
                <th className="px-5 py-3 font-semibold text-right">Supply &amp; install</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5 align-top">
                <td className="px-5 py-3">
                  <strong>3-phase main distribution board (TPN)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    An 18-way TPN board with MCCB incomer is roughly £3,500 installed; rate scales
                    with rating and number of ways.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£2,000–£6,000</td>
              </tr>
              <tr className="border-b border-white/5 align-top">
                <td className="px-5 py-3">
                  <strong>Sub-distribution board (each)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Each floor or zone typically has its own board fed from the main board via a
                    submain cable.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£800–£2,500</td>
              </tr>
              <tr className="border-b border-white/5 align-top">
                <td className="px-5 py-3">
                  <strong>Submain cables (per metre)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Depends on CSA. A 4-core 25mm² SWA floor submain is roughly £25/m installed
                    including containment and termination.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£15–£60/m</td>
              </tr>
              <tr className="align-top bg-blue-500/[0.04]">
                <td className="px-5 py-3">
                  <strong>Surge protection (SPD)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Type 1+2 at the main board £300–£600 installed; Type 2 at sub-boards £150–£300
                    each. See the regulations section for when these are required.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£150–£600</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Phase balancing is critical in commercial installations. The design should distribute
          single-phase loads evenly across the three phases to avoid excessive neutral current and
          voltage imbalance. This must be verified during commissioning.
        </p>
        <p>
          Commercial fit-outs increasingly include EV charging provision. BS 7671:2018+A4:2026
          Section 722 covers electric vehicle charging installations, and Regulation 722.311.201
          permits load curtailment — load reduction or disconnection, automatic or manual — to be
          taken into account when determining the maximum demand of the installation. This means
          that multiple EV charging points can often be accommodated on an existing incoming supply
          provided a suitable load management system is specified, without requiring a costly DNO
          supply upgrade. Designers must document the curtailment assumptions used in the demand
          calculation. Budget an additional £800 to £2,500 per charge point installed, plus
          allowance for the load management controller where multiple points are provided.
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
              in offices. Floor trunking and floor boxes (£80 to £200 per floor box installed) serve
              open-plan areas. Steel conduit (£8 to £18/m installed) is used in exposed areas and
              where mechanical protection is needed.
            </p>
          </div>
        </div>
        <p>
          Containment typically accounts for 25% to 40% of the total electrical installation cost in
          commercial buildings. Getting the containment design right at tender stage is critical —
          underestimating containment is one of the most common causes of losses on commercial
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
          A commercial rewire scope frequently includes structured data cabling, fire alarm systems,
          and emergency lighting. These are often the responsibility of the electrical contractor
          even though they require specialist design competence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="px-5 py-3 border-b border-white/10">
            <h3 className="font-bold text-white text-base">Ancillary System Costs</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-white/60 text-xs uppercase tracking-wide">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-semibold">System</th>
                <th className="px-5 py-3 font-semibold text-right">Indicative cost</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5 align-top">
                <td className="px-5 py-3">
                  <strong>Structured data cabling (Cat6A point)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Includes patch-panel termination and testing. A typical desk needs 2 points.
                    Fibre backbone between comms rooms: £500–£1,500 per link.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">
                  £80–£150/point
                </td>
              </tr>
              <tr className="border-b border-white/5 align-top">
                <td className="px-5 py-3">
                  <strong>Fire alarm to BS 5839-1 (Category L2, addressable)</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Detectors, manual call points, sounders, interface units and an addressable
                    panel. Design must be by a competent fire alarm designer.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£6–£12/m²</td>
              </tr>
              <tr className="align-top">
                <td className="px-5 py-3">
                  <strong>Emergency lighting to BS 5266-1</strong>
                  <span className="block text-white/60 text-xs mt-1">
                    Maintained or non-maintained luminaires on escape routes, open areas and
                    high-risk task areas. 3-hour duration is standard for most commercial premises.
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">£3–£6/m²</td>
              </tr>
            </tbody>
          </table>
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
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">Building type and access</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              A vacant shell with clear ceiling voids is far cheaper to wire than an occupied
              building with limited access, asbestos risks and out-of-hours working.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">Specification density</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Outlet density varies hugely. A basic warehouse office might have 1 double socket per
              10m²; a trading floor might have 4 doubles per desk at 6m² per desk.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">Working-hours restrictions</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Occupied buildings may need evening and weekend working, adding 25% to 50% to labour
              costs through overtime rates and reduced productivity.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">Asbestos and legacy services</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Pre-2000 buildings often contain asbestos. Removal or encapsulation is the client's
              cost but causes programme delays that affect the electrical contractor.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">Location</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              London rates are 20% to 40% higher than regional rates due to labour costs, parking,
              congestion charge and site-access restrictions.
            </p>
          </div>
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
            BS 7671:2018+A4:2026
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
          Surge protection is a key consideration on commercial rewires. BS 7671:2018+A4:2026
          redrafted Regulation 443.4, and Regulation 443.4.1 now requires protection against
          transient overvoltages where the consequence of an overvoltage could result in:
        </p>
        <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-5 my-4">
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold shrink-0">(a)</span>
              <span>serious injury to, or loss of, human life;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold shrink-0">(b)</span>
              <span>deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023);</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold shrink-0">(c)</span>
              <span>significant financial or data loss.</span>
            </li>
          </ul>
          <p className="text-white/70 text-xs mt-3 leading-relaxed">
            For all other cases, protection against transient overvoltages shall be provided unless
            the owner of the installation declares it is not required due to any loss or damage
            being tolerable and they accept the risk of damage to equipment and any consequential
            loss. Limb (b) of Regulation 443.4.1 was deleted by the BS 7671:2018+A2:2022 Corrigendum
            (May 2023).
          </p>
        </div>
        <p>
          On most commercial premises the "significant financial or data loss" condition is readily
          met, so in practice a Type 1+2{' '}
          <SEOInternalLink href="/guides/spd-surge-protection">SPD</SEOInternalLink> at the main
          distribution board is specified on the large majority of commercial rewires. Where SPDs
          are used they must be selected and
          erected to Section 534. If the protective distance between an SPD and the equipment it
          protects exceeds 10 metres, Regulation 534.4.4.2 warns that oscillations can lift the
          voltage at the equipment terminals to up to twice the SPD's voltage protection level —
          so additional coordinated Type 2 SPDs are typically fitted closer to downstream
          sub-distribution boards and sensitive equipment.
        </p>
        <p>
          Additional protection by a 30mA RCD is required for socket-outlets with a rated current
          not exceeding 32A under Regulation 411.3.3 of BS 7671. In commercial installations this is
          typically delivered by RCBOs on individual circuits rather than bank RCDs, so that a fault
          on one circuit does not take out several others — the same approach the regulations
          encourage to avoid unwanted tripping.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
                  build itemised schedules of containment, distribution equipment, and final
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
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>. A 500m² commercial
                  installation might take 2 to 3 days to test and certify properly. Do not squeeze
                  this into the last afternoon of the contract.
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
          description="Elec-Mate's quoting app handles itemised commercial tenders with distribution equipment, containment schedules, and final circuit costing."
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
      title="Commercial Rewire Cost UK 2026: Per m² Price Guide"
      description="Commercial rewire costs £30–£80 per m² in 2026. Per square metre pricing for 3-phase distribution, containment, data cabling, fire alarm, and BS 7671:2018+A4:2026 compliance."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
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
      answerBox={{
        question: 'How much does a commercial rewire cost per square metre in the UK?',
        answer:
          'A commercial rewire typically costs £30 to £80 per square metre in 2026. Basic office work sits at £30 to £45/m²; a mid-spec rewire with 3-phase distribution, fire alarm and emergency lighting runs £45 to £60/m²; and a high-spec corporate fit-out reaches £60 to £80/m². Figures include containment, cabling, distribution, testing and certification to BS 7671:2018+A4:2026.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Commercial Rewires with Itemised Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for commercial quoting with distribution schedules, containment costing, and AI cost engineering. 7-day free trial."
    />
  );
}
