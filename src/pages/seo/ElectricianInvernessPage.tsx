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
  Landmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Inverness', href: '/electricians/inverness' },
];

const tocItems = [
  { id: 'overview', label: 'Inverness Overview' },
  { id: 'regulations', label: 'Scottish Building Standards' },
  { id: 'dno', label: 'SSEN Distribution Network' },
  { id: 'property-types', label: 'Inverness Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Inverness' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Inverness is in Scotland. Part P of the Building Regulations does NOT apply. Electrical work is governed by Scottish Building Standards (Technical Handbook Section 4: Safety). Building warrants are required for notifiable work. BS 7671 applies UK-wide as the technical standard.',
  'Scottish and Southern Electricity Networks (SSEN) is the DNO for Inverness and the Highlands. SSEN manages one of the most geographically challenging network areas in the UK, covering rural and remote areas with ageing infrastructure.',
  'Many rural and croft properties in the Inverness area have TT earthing systems using earth rods, rather than the TN-C-S (PME) systems typical in urban England. This affects earthing design and RCD requirements.',
  "SELECT (the Electrical Contractors' Association of Scotland) is the primary trade and certification body for Scottish electricians. SELECT registration is valued by Highland Council and Scottish landlords.",
  'Labour rates in Inverness are below the Scottish central belt average but above comparable rural English rates, reflecting remoteness premiums and travel time to surrounding rural areas.',
];

const faqs = [
  {
    question: 'Does Part P apply in Inverness?',
    answer:
      'No. Part P of the Building Regulations applies only in England and Wales. Inverness is in Scotland, where electrical work is governed by Scottish Building Standards under the Building (Scotland) Act 2003. The relevant section is Technical Handbook Section 4 (Safety). Electrical installations must comply with BS 7671:2018+A3:2024, and a building warrant is typically required for notifiable work (new installations, rewires, consumer unit replacements). The warrant is obtained from Highland Council Building Standards before work starts. An Electrical Installation Certificate (EIC) is required as evidence of BS 7671 compliance.',
  },
  {
    question: 'Who is the DNO for Inverness?',
    answer:
      "Scottish and Southern Electricity Networks (SSEN) is the Distribution Network Operator for Inverness and the wider Highlands and Islands. SSEN manages one of the UK's most geographically challenging network areas, covering sparsely populated rural terrain with significant lengths of overhead line network. For new connections, supply upgrades, and G98/G99 generation notifications for solar PV or battery storage, you deal with SSEN. G98 notifications (up to 16A per phase) are straightforward. G99 applications for larger systems can take longer than in urban areas due to the challenges of the Highland network.",
  },
  {
    question: 'What is the earthing arrangement in Inverness properties?',
    answer:
      'Urban Inverness properties are predominantly TN-C-S (PME) supplied by SSEN, similar to most urban UK properties. However, rural properties, crofts, and older properties in the Highlands frequently have TT earthing systems, where the earth connection is provided by a local earth electrode (earth rod) rather than the supply network. TT systems require appropriate RCD protection on all circuits — typically a 30mA RCD at the origin to protect all circuits, or RCBO protection per circuit. Always verify the earthing arrangement at the intake before starting work, particularly on rural and older properties.',
  },
  {
    question: 'What qualifications should an Inverness electrician have?',
    answer:
      "The core qualifications are City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation) and the 18th Edition (BS 7671:2018+A3:2024) wiring regulations certificate. In Scotland, SELECT registration is highly valued — SELECT is the Electrical Contractors' Association of Scotland and operates a certification scheme that works with Highland Council's building warrant process. NICEIC and NAPIT also operate in Scotland and can certify work for building warrant purposes. SELECT registration gives access to the SELECT Certification Services scheme, which is well-understood by Highland Council Building Standards.",
  },
  {
    question: 'How much does an electrician charge in Inverness?',
    answer:
      'Inverness electrician rates in 2026 typically range from £42 to £62 per hour for a qualified, registered electrician. Day rates are £280 to £420 for a sole trader. Emergency call-out rates are £75 to £115 per hour. Common fixed-price jobs: consumer unit replacement £600 to £1,000, full house rewire (3-bed detached) £3,800 to £6,500, EICR £180 to £300, EV charger installation £800 to £1,300. Rural and remote work commands a significant premium — travel time to villages and rural properties around Inverness adds substantially to costs, and jobs are often priced on a day-rate basis.',
  },
  {
    question: 'Is solar PV viable in Inverness?',
    answer:
      'Solar PV is viable in Inverness, though irradiance levels are lower than southern England. The Highlands receives approximately 800 to 900 kWh/kWp per year compared to 1,000 to 1,100 in the south. However, electricity prices are the same or higher, so payback periods are reasonable, particularly for rural properties with high electricity consumption for heating. Grid connection (G98 notification to SSEN) is required for all grid-tied solar installations. Battery storage is popular in the Highlands due to the rural grid infrastructure and the risk of power cuts. Demand for solar PV and battery storage installations around Inverness is growing.',
  },
  {
    question: 'What are the building warrant requirements for electrical work in Inverness?',
    answer:
      'Under Scottish Building Standards, a building warrant is required from Highland Council for new electrical installations, rewires, and consumer unit replacements in domestic properties. The warrant must be obtained before work starts. On completion, a completion certificate must be submitted to the council, accompanied by the Electrical Installation Certificate (EIC) as evidence of BS 7671 compliance. The council may inspect before accepting the completion certificate. SELECT-registered electricians can use the SELECT Certification Services scheme, which provides a streamlined route through the building warrant process. Failure to obtain the required warrants can affect property sales.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required evidence for Scottish building warrant completion in Inverness.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Inverness and Highland landlords, letting agents, and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rural Highland properties with long cable runs and TT earthing systems.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Inverness — SSEN notification and Highland rural connection guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Highland jobs with travel time allowances and accurate Inverness labour rates.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing procedures for TT and TN-C-S systems.',
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
    heading: 'Electrician in Inverness: What You Need to Know',
    content: (
      <>
        <p>
          Inverness is the capital of the Scottish Highlands and the administrative centre for
          Highland Council — the UK's largest local authority by area. For electricians, Inverness
          presents a unique combination of urban residential and commercial work in the city itself
          alongside significant rural work across a vast surrounding area that stretches to some of
          the UK's most remote locations.
        </p>
        <p>
          The electrical market in Inverness is shaped by Scottish Building Standards (not Part P),
          a DNO (SSEN) managing one of the UK's most challenging rural networks, a mix of urban and
          rural property types, and a growing demand for renewable energy — solar PV, heat pumps,
          and battery storage are particularly popular in the Highlands, where high electricity
          consumption and grid reliability concerns make energy independence attractive.
        </p>
        <p>
          This guide covers the Scottish regulatory framework, SSEN DNO requirements, local property
          types, typical jobs, pricing, and practical advice for electricians working in and around
          Inverness.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Scottish Building Standards: The Framework in Inverness',
    content: (
      <>
        <p>
          Inverness is in Scotland. Part P of the Building Regulations does NOT apply. Electrical
          work in Inverness is regulated under Scottish Building Standards:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical Handbook Section 4 (Safety)</strong> — this is the Scottish
                equivalent of Part P. Electrical installations must comply with BS 7671 and be
                designed, installed, inspected, and tested by a competent person. BS 7671 applies
                UK-wide as the technical standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building warrants</strong> — a building warrant from Highland Council is
                required before starting notifiable electrical work (new installations, rewires,
                consumer unit replacements). This is different from England, where registered
                electricians can self-certify without prior notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificates</strong> — after completing notifiable work, a
                completion certificate with the EIC must be submitted to Highland Council. The
                council may inspect before accepting the completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT registration</strong> — SELECT (Electrical Contractors' Association
                of Scotland) is the primary trade body for Scottish electricians. SELECT
                registration is well-recognised by Highland Council Building Standards and Scottish
                landlords, and simplifies the building warrant process.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians who move from England to work in Inverness must understand the building
          warrant process. The BS 7671 technical standards are the same, but the compliance and
          certification route through Highland Council is quite different from the English competent
          person self-certification model.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN: The Inverness Distribution Network Operator',
    content: (
      <>
        <p>
          <strong>Scottish and Southern Electricity Networks (SSEN)</strong> is the DNO for
          Inverness and the entire Highlands and Islands. SSEN manages one of the most
          geographically challenging distribution networks in the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies and supply upgrades
                (for EV chargers, heat pumps, or increased demand) are requested through SSEN's
                connections portal. In rural Highland areas, connection timescales can be longer and
                costs higher than in urban areas, due to the length of network involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV and battery storage systems must
                be notified to SSEN. G98 (up to 16A per phase) is a simple notification. G99
                requires prior approval. Rural Highland areas can have constrained grid capacity,
                which may affect the ability to export power from large systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead line network</strong> — the Highland network uses a high proportion
                of overhead lines, which are vulnerable to weather events. Rural properties are more
                prone to power cuts than urban properties. This drives demand for battery storage
                and backup systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing prevalence</strong> — SSEN supplies many rural Highland
                properties via TT earthing (no earth connection in the supply cable, requiring a
                local earth electrode). Always verify the earthing arrangement before starting work
                and ensure appropriate RCD protection is in place.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Inverness and Highland Property Types',
    content: (
      <>
        <p>
          The property mix in and around Inverness ranges from modern city-centre developments to
          traditional Highland stone cottages and rural crofts:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Inverness</h3>
            <p className="text-white text-sm leading-relaxed">
              The Merkinch, Crown, and Old Town areas have Victorian and Edwardian stone-built
              properties. Solid granite and sandstone walls require surface-mounted trunking for
              rewires. Old rubber-insulated wiring is common. Asbestos surveys before invasive work
              are essential in pre-1980s properties.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern City-Centre Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Inverness has seen significant modern development, particularly to the east (Culloden,
              Balloch) and south (Slackbuie). These properties are built to current standards with
              cavity walls and modern consumer units. EV charger installations and smart home
              upgrades are the most common jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Highland Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Villages and rural properties throughout the Highlands frequently have TT earthing,
              ageing wiring, and limited network capacity. Rewires, consumer unit upgrades, and
              renewable energy installations are common. Travel time from Inverness can be
              significant — pricing must account for this.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Crofts and Traditional Cottages</h3>
            <p className="text-white text-sm leading-relaxed">
              Traditional stone-built cottages and crofts are common across the Highlands. These
              properties often have basic wiring installations, TT earthing with ageing earth rods,
              and limited socket provision. Full rewires are often needed when these properties are
              renovated or sold. Solar PV with battery storage is popular for energy independence.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Inverness',
    content: (
      <>
        <p>The most in-demand electrical services in Inverness and the Highlands in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs</strong> — Scottish landlords are required to have EICRs carried out
                every five years. Highland Council actively enforces this under the Housing
                (Scotland) Act 2006. Satisfactory EICRs are a condition of HMO and letting property
                licences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renewable energy installations</strong> — solar PV, battery storage, and
                heat pump electrical connections are growing rapidly in the Highlands. SSEN G98/G99
                notifications are required. Battery storage is particularly popular given the
                reliability of the rural Highland network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewires and consumer unit upgrades</strong> — older Highland properties
                frequently have wiring that needs full replacement. Consumer unit upgrades from old
                fuse boards to modern RCD/RCBO boards are common, particularly when an EICR
                identifies C1 or C2 defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tourism and hospitality electrical work</strong> — Inverness and the
                Highlands have a significant hospitality and tourism economy. Hotels, B&Bs, and
                visitor attractions require regular EICRs, fire alarm maintenance, and commercial
                electrical work. This sector provides consistent work for Inverness electricians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Inverness (2026)',
    content: (
      <>
        <p>
          Inverness electrician rates in 2026 are below the Scottish central belt average but above
          comparable rural English market rates, reflecting the remoteness of the Highlands and the
          cost of travel to rural jobs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£42 — £62</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£280 — £420</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£360 — £500</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£75 — £115/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£600 — £1,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£110 — £170</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed detached)</span>
                  <span className="font-semibold">£3,800 — £6,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£180 — £300</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£800 — £1,300</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Rural and remote jobs in the Highlands should always include a travel allowance. Day-rate
          pricing is standard for jobs that require more than 30 minutes of travel from Inverness.
          Overnight stays may be necessary for very remote locations, and this should be factored
          into quotes.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Inverness and the Highlands',
    content: (
      <>
        <p>
          Inverness offers a strong market for electricians prepared to work across a wide
          geographical area. The combination of urban residential work in the city, rural property
          rewires, renewable energy installations, and hospitality sector electrical work provides a
          varied and profitable workload.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. Scottish building warrants require a professional EIC as evidence of BS 7671
                  compliance — issue it from your phone before you leave the job.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Rural Properties</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for voltage drop calculations on long cable runs in rural Highland properties. TT
                  earthing systems require careful earth fault loop impedance calculations to
                  confirm RCD disconnection times.
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
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional quotes with travel allowances built in. Send PDF quotes to
                  Highland landlords and homeowners from the site survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Inverness and Highland electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Scottish Building Standards and the realities of Highland electrical work. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianInvernessPage() {
  return (
    <GuideTemplate
      title="Electrician in Inverness | Local Electricians 2026"
      description="Find qualified electricians in Inverness. Scottish Building Standards (not Part P), SSEN DNO, TT earthing, Highland property rewires, EICRs, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Inverness"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Inverness: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Inverness is in Scotland — Part P does not apply. Electrical work is governed by Scottish Building Standards and SSEN manages one of the UK's most geographically challenging distribution networks across the Highlands."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Inverness"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Inverness and Highland Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Scottish Building Standards, TT earthing, and the scale of Highland electrical work. 7-day free trial."
    />
  );
}
