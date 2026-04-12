import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  Building2,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Home,
  Users,
  Landmark,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Cumbria', href: '/electricians/cumbria' },
  { label: 'Electrician in Carlisle', href: '/electricians/carlisle' },
];

const tocItems = [
  { id: 'overview', label: 'Carlisle Overview' },
  { id: 'regulations', label: 'Regulations and Compliance' },
  { id: 'dno', label: 'Electricity North West (ENW)' },
  { id: 'cross-border', label: 'Cross-Border Work with Scotland' },
  { id: 'property-types', label: 'Property Types and Challenges' },
  { id: 'pricing', label: 'Electrician Rates in Carlisle' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Carlisle is the commercial and administrative centre of Cumbria, 34 miles from Dumfries in Scotland. Many Carlisle electricians serve both sides of the border, requiring awareness of both Part P (England) and Scottish Building Standards.',
  'The city has a varied property stock from Victorian terraces and Georgian townhouses in the city centre to post-war social housing estates, modern new builds on the city fringe, and rural properties in the surrounding Eden Valley and Solway Plain.',
  'Electricity North West (ENW) is the Distribution Network Operator. Rural properties on the outskirts often have TT earthing systems requiring RCD protection on all circuits under BS 7671 regulation 411.3.3.',
  "Carlisle's commercial sector includes retail, logistics (M6 corridor), and public sector buildings. The city has a University of Cumbria campus and several large NHS sites requiring specialist electrical maintenance.",
  'Labour rates in Carlisle are typically £38–55/hr — competitive within the North of England but significantly lower than the nuclear site contractor rates available to Cumbrian electricians at Sellafield (45 miles south-west).',
  'The city experienced severe flooding in 2005 and 2015. Flood-affected properties require particular attention to rewiring standards and installation heights under BS 7671 requirements for areas at risk of flooding.',
];

const faqs = [
  {
    question: 'Do I need to know Scottish Building Standards to work from Carlisle?',
    answer:
      "If you work only within England (south of the Scottish border), Part P of the Building Regulations applies. However, many Carlisle-based electricians regularly take on work in Dumfries (34 miles north), Gretna, Longtown, or other locations just over the border — in which case Scottish Building Standards apply instead. In Scotland, a building warrant is required for notifiable electrical work (rewires, consumer unit replacements, new installations) from the local authority. The electrical installation must still comply with BS 7671, but the certification and notification route differs. If you regularly cross the border, consider SELECT registration (Scotland's trade association) as an additional scheme alongside your NICEIC or NAPIT membership.",
  },
  {
    question: 'Who is the DNO for Carlisle?',
    answer:
      "Electricity North West (ENW) is the Distribution Network Operator for Carlisle and the wider Cumbria region. New connections, capacity upgrades, G98/G99 notifications for solar PV and battery storage, and fault reports all go through ENW. The national fault number is 105. For connections enquiries, ENW's online connections portal is the primary route. Properties in the rural areas east and north of Carlisle, particularly those served by overhead lines on the Solway Plain and towards the Pennines, are more likely to have TT earthing systems than city centre properties.",
  },
  {
    question: 'What are the most common types of electrical work in Carlisle?',
    answer:
      'The Carlisle electrical market is broadly similar to other medium-sized northern English cities: consumer unit replacements, socket and lighting additions, periodic inspection reports (EICRs) for the rental sector, rewires of older Victorian and inter-war properties, EV charger installations, and commercial maintenance for retail and office buildings. The M6 logistics corridor around Junction 44 has significant warehouse and distribution centre development. The NHS North Cumbria Integrated Care Board operates several large sites including Cumberland Infirmary, which requires specialist electrical maintenance contractors. The University of Cumbria campus at Fusehill Street is another significant institutional client.',
  },
  {
    question: "What are the challenges of rewiring Carlisle's older housing stock?",
    answer:
      'Carlisle has a significant stock of Victorian and Edwardian terraced housing, particularly in areas such as Denton Holme, Botcherby, and around the city centre. These properties typically have solid brick walls (no cavities in older stock), limited ceiling void access, and original electrical systems that may include rubber-insulated wiring, lead-sheathed cables, or early plastic-insulated wiring from the 1950s and 1960s. Challenges include routing cables through solid walls (requiring surface trunking or limited chasing), asbestos risk in properties built before 1980, and the difficulty of identifying circuit configurations in systems that have been added to over many decades without proper documentation.',
  },
  {
    question: 'How has flooding affected electrical work in Carlisle?',
    answer:
      'Carlisle experienced major flooding in 2005 (Storm Desmond) and 2015, affecting thousands of properties in areas including Caldewgate, Currock, and along the River Eden. Flood-damaged properties require complete rewiring where circuits have been submerged, with particular attention to: installation heights for socket outlets and switched outlets (which should be raised above anticipated flood levels where practicable), the condition of earthing systems following prolonged submersion, and the integrity of consumer units and distribution equipment. The Electricity at Work Regulations 1989 require electrical systems to be maintained to prevent danger — flood-damaged systems that have been informally dried out without inspection should be treated with significant caution.',
  },
  {
    question: 'What is the demand for EV charger installations in Carlisle?',
    answer:
      'Demand for EV charger installations in Carlisle is growing in line with the national trend, driven by increasing EV adoption and the expansion of EV company car schemes. The majority of installations are 7kW single-phase units at domestic properties. The OZEV grant scheme (where applicable) can reduce costs for eligible customers. In Carlisle, ENW handles the DNO notification for EV chargers. Most domestic EV charger installations are straightforward — the key considerations are the existing supply capacity (many older properties have 60A supplies that can accommodate a 7kW charger with managed charging enabled), the routing of the cable from consumer unit to the charging point, and the earthing system (PME earthing prohibits using the PME earth terminal for EV charger earth where touch voltage risks apply — a supplementary earth electrode is required in these cases).',
  },
  {
    question: 'How much does an electrician charge in Carlisle?',
    answer:
      'Carlisle electrician rates in 2026 typically range from £38–55/hr for a qualified, registered electrician. Day rates are £260–380 for a sole trader. Emergency call-out rates are £65–95/hr with a minimum charge of £80–120. Common fixed-price jobs: consumer unit replacement £580–980, single socket addition £110–160, full rewire (3-bed terraced house) £3,800–6,200, EICR £180–270, EV charger installation £750–1,200. Rates in Carlisle are broadly comparable to other northern English cities of similar size. Rural premium applies for properties more than 15–20 miles from the city.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone — required for all notifiable work in England.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Carlisle rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Carlisle property rewires and long rural cable runs on the Solway Plain.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Carlisle — PME earthing, ENW notifications, and OZEV grant guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electricians/cumbria',
    title: 'Electrician in Cumbria',
    description:
      'County overview — nuclear site requirements, Sellafield, ENW, and Cumbria electrician rates.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Carlisle electrical jobs accurately — from city centre consumer unit replacements to rural rewires.',
    icon: Wrench,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician in Carlisle: What You Need to Know',
    content: (
      <>
        <p>
          Carlisle is the county town and commercial hub of Cumbria, situated at the northern end of
          the M6 motorway, 10 miles south of the Scottish border. With a population of around 75,000
          in the city itself and a much larger catchment across north Cumbria and south-west
          Scotland, Carlisle punches above its weight as a commercial centre.
        </p>
        <p>
          For electricians, Carlisle offers a varied market: Victorian and Edwardian residential
          housing requiring periodic updates and rewires, a growing new-build sector on the city
          fringe, a healthy commercial and retail sector, institutional work at the Cumberland
          Infirmary and University of Cumbria, and an interesting cross-border dimension with
          Dumfries and the Scottish Borders. The city's flood history also creates periodic demand
          for rewiring of affected properties.
        </p>
        <p>
          Carlisle is not a nuclear site city in the way that Whitehaven and Workington are —
          Sellafield is 45 miles to the south-west — but some Carlisle-based electricians do commute
          to Sellafield for contract work, particularly on day shifts. The city's position on the M6
          and A74(M) makes it well-connected for wider Cumbrian and cross-border work.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Compliance in Carlisle',
    content: (
      <>
        <p>Electrical work in Carlisle is subject to the standard English regulatory framework:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P Building Regulations</strong> — applies to all notifiable domestic
                electrical work in England. Consumer unit replacements, new circuits, and rewires
                must be either notified to Cumberland Council (the unitary authority for most of
                Cumbria) or self-certified through a competent person scheme such as NICEIC or
                NAPIT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — the 18th Edition Wiring Regulations apply to
                all installations. RCD protection requirements under regulation 411.3.3 apply to
                circuits in domestic premises. All new work requires an Electrical Installation
                Certificate (EIC), and periodic inspections require an EICR under Section 631.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cumberland Council</strong> — the unitary authority created in 2023 covering
                Carlisle (and most of former Cumbria county). Building control, planning, and Part P
                notifications go through Cumberland Council. Note: Westmorland and Furness is the
                separate unitary authority covering the south of the county (Barrow, Kendal, South
                Lakeland).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish work</strong> — if you regularly work across the border in Dumfries
                and Galloway or the Scottish Borders, Scottish Building Standards apply. Building
                warrants are required for notifiable work, obtained from the relevant Scottish local
                authority. An EIC is still required as evidence of BS 7671 compliance. SELECT
                registration simplifies the process for Scottish work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: "Electricity North West: Carlisle's DNO",
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the Distribution Network Operator for
          Carlisle and the wider North West of England. Key points for Carlisle electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — managed through ENW's connections
                portal. Supply capacity upgrades are commonly required for EV charger installations
                at properties with 60A or older 80A supplies, and for heat pump installations with
                high electrical demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV and battery storage systems must
                be notified to ENW. G98 (up to 16A per phase) is a straightforward online
                notification. G99 applications for larger systems require prior approval and take
                4–10 weeks to process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing in rural areas</strong> — city centre Carlisle properties are
                predominantly TN-C-S (PME). Rural properties east of the city (Eden Valley,
                Pennines) and north on the Solway Plain are more likely to have TT earthing via
                overhead distribution lines. Always confirm the earthing arrangement at the intake
                before designing or quoting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cross-border note</strong> — SP Energy Networks (SPEN) is the DNO for
                Scotland, including Dumfries and the Scottish Borders. Work carried out north of the
                border requires SPEN notifications rather than ENW. Keep both DNOs' contact details
                if you work cross-border regularly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cross-border',
    heading: 'Cross-Border Work with Scotland',
    content: (
      <>
        <p>
          Carlisle's proximity to Scotland — 10 miles from the border, 34 miles from Dumfries —
          means that many Carlisle electricians regularly work across the border. This creates a
          need to understand both regulatory systems:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Building Standards vs Part P</strong> — in Scotland, Part P does
                not apply. Instead, the Technical Handbook Section 4 (Safety) governs electrical
                installations. A building warrant from the Scottish local authority is required for
                notifiable work (rewires, consumer unit replacements, new circuits) before work
                starts. The completion certificate must be submitted after the work is finished with
                the EIC as evidence of compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT registration</strong> — SELECT is the trade association for the
                electrical industry in Scotland. SELECT-registered contractors can use SELECT
                Certification Services to streamline the building warrant process. This is worth
                considering if you take on regular Scottish work from Carlisle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO notification</strong> — Scottish electrical work requires SPEN
                notification rather than ENW. Keep SPEN's contacts available for cross-border
                generation and connection applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical note</strong> — the electrical installation standards (BS 7671)
                are the same on both sides of the border. The difference is purely in the regulatory
                compliance and notification route. Electricians who understand both systems have a
                genuine competitive advantage in the Carlisle market.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Carlisle Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Carlisle's housing stock spans several centuries, creating a varied range of electrical
          challenges:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Solid brick-built terraces in areas such as Denton Holme, Caldewgate, and Botcherby
              are the most common older property type. Solid walls mean no cavity for cables —
              surface trunking or chasing is required. Pre-1980 properties have potential asbestos
              in ceiling and floor materials. Old rubber-insulated wiring (TRS or VIR) is still
              found in unmodernised properties and requires full rewire.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Flood-Affected Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Carlisle's 2005 and 2015 floods caused extensive damage in low-lying areas near the
              River Eden and River Caldew. Flood-damaged electrical installations require complete
              inspection and often full rewire. Socket outlets in refurbished flood-affected
              properties should be positioned at a raised height (450mm above floor level minimum,
              higher where flood risk persists). All earthing must be verified after flooding.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Social Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Carlisle has significant post-war council-built housing stock in areas such as
              Harraby, Raffles, and Morton. These properties were built to the standards of their
              era and many now require consumer unit replacement and circuit updates to meet current
              requirements. Properties of this type often have single RCD protection or no RCD
              protection at all, requiring upgrade to meet current standards when work is carried
              out.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New Builds and Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              Carlisle has ongoing new-build residential development on the eastern and southern
              fringes of the city, and commercial development along the M6 corridor at Kingstown and
              Durranhill. New-build residential is standard cavity-wall construction with modern
              installations. Commercial logistics and industrial units often require three-phase
              supplies and specialist electrical fit-out work.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Carlisle (2026)',
    content: (
      <>
        <p>
          Carlisle electrician rates are competitive with other northern English cities of similar
          size. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£38 — £55</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£260 — £380</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £95/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£580 — £980</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£110 — £160</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed house)</span>
                  <span className="font-semibold">£3,800 — £6,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£180 — £270</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£750 — £1,200</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          For work in rural areas north and east of Carlisle, apply a travel time premium of £20–40
          per round trip above approximately 15 miles from the city centre. Cross-border Scottish
          work may also require additional time for building warrant administration — factor this
          into your project quotations.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Carlisle',
    content: (
      <>
        <p>
          Carlisle offers a solid, varied electrical market for sole traders and small firms. The
          combination of residential rewire work, a commercial and institutional sector, growing EV
          and renewable energy demand, and cross-border opportunities with Scotland creates a
          well-rounded workload.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site with AI-assisted board scanning. The Carlisle rental market requires regular
                  EICRs — deliver professional certificates from your phone before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Carlisle Properties</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for rewires in solid-brick Victorian terraces and long cable runs in rural
                  properties. Accurate voltage drop calculations prevent problems on jobs with
                  complex routing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price Carlisle and north Cumbria jobs accurately with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for travel time premiums on rural jobs and building warrant
                  administration time on cross-border Scottish work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Carlisle electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Carlisle's Victorian terraces, cross-border work, and rural Cumbrian properties. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCarlislePage() {
  return (
    <GuideTemplate
      title="Electrician in Carlisle | Local Electricians 2026"
      description="Find qualified electricians in Carlisle, Cumbria. Part P, cross-border Scottish work, Electricity North West DNO, flood-affected properties, Victorian terraces, and Carlisle electrician rates 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Carlisle"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Carlisle: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Carlisle is the commercial hub of Cumbria and 34 miles from the Scottish border. Working here means understanding both English Part P regulations and Scottish Building Standards, alongside the practical challenges of Victorian terraces, flood-affected properties, and a wide rural catchment."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Carlisle"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Carlisle Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Carlisle's Victorian terraces, cross-border Scottish work, and rural Cumbrian properties. 7-day free trial."
    />
  );
}
