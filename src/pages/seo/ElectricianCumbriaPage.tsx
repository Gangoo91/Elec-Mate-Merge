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
];

const tocItems = [
  { id: 'overview', label: 'Cumbria Overview' },
  { id: 'nuclear', label: 'Sellafield and Nuclear Site Work' },
  { id: 'regulations', label: 'BS 7671 and Nuclear Codes' },
  { id: 'dno', label: 'Electricity North West (ENW)' },
  { id: 'areas', label: 'Key Towns and Areas' },
  { id: 'pricing', label: 'Electrician Rates in Cumbria' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Cumbria has one of the UK's most unusual electrical labour markets, shaped by Sellafield — one of the largest nuclear sites in Europe — which employs thousands of workers and attracts electricians with specialist nuclear site clearances and skills.",
  'Electricians working on nuclear licensed sites in Cumbria must meet Nuclear Site Licence conditions, hold appropriate security vetting, and work to IEC 60364 and nuclear industry codes alongside BS 7671:2018+A3:2024.',
  'Electricity North West (ENW) is the Distribution Network Operator for Cumbria. All DNO notifications for generation, EV chargers, and battery storage go through ENW.',
  'Labour rates in Cumbria are typically £35–55/hr for standard domestic and commercial work — lower than major cities. Nuclear and specialist industrial rates are significantly higher, commonly £60–90+/hr.',
  "Barrow-in-Furness has a distinct industrial character centred on BAE Systems's submarine facility. Carlisle is the county's commercial hub and has strong cross-border trade links with Dumfries and south-west Scotland.",
  'Coastal industrial towns including Workington and Whitehaven have chemical, manufacturing, and offshore-adjacent electrical work, including compliance with the Electricity at Work Regulations 1989 in industrial settings.',
];

const faqs = [
  {
    question: 'What makes working as an electrician in Cumbria different from the rest of England?',
    answer:
      'The most significant difference is the nuclear industry. Sellafield, operated by Nuclear Waste Services and Sellafield Ltd, is one of the largest employers in the county. Electricians working on the licensed nuclear site must hold appropriate security clearance (typically Baseline Personnel Security Standard or higher), comply with Nuclear Site Licence conditions, and work to IEC 60364, nuclear industry codes such as those published by the Nuclear Decommissioning Authority, and the SQEP (Suitably Qualified and Experienced Person) framework — in addition to BS 7671. This specialist market commands significantly higher rates than standard domestic or commercial work.',
  },
  {
    question: 'Do I need special qualifications to work at Sellafield?',
    answer:
      "Yes. Working at Sellafield requires a valid Sellafield site pass (obtained through the site security vetting process), compliance with the site's permit-to-work system, and relevant SQEP evidence for the type of electrical work undertaken. Many electrical roles also require Competent Person status under the site's Electrical Safety Rules. The Electricity at Work Regulations 1989 apply throughout, and site-specific procedures often exceed general industry standards. Many Cumbrian electricians build careers primarily around nuclear site contract work, as the day rates are substantially higher than standard commercial work.",
  },
  {
    question: 'Who is the DNO for Cumbria?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Cumbria and the wider North West of England. All DNO notifications — including G98 notifications for solar PV and small-scale generation up to 16A per phase, G99 applications for larger systems, new connection requests, and supply capacity upgrades — go through ENW. Their connections portal handles most applications online. ENW also has a dedicated team for large industrial and generation connections, which is relevant for the significant renewable energy development across Cumbria including wind farms in the upland areas.',
  },
  {
    question: 'What are typical electrician day rates in Cumbria?',
    answer:
      'Standard domestic and commercial electrician rates in Cumbria are typically £35–55/hr, with day rates of £250–380 for a sole trader. These are notably lower than rates in London or major northern cities, reflecting the rural and semi-rural character of much of the county and lower average living costs. However, nuclear and specialist industrial site rates are a completely different market: contract electricians working at Sellafield or BAE Systems through specialist agencies typically earn £60–90+/hr, and some highly specialist roles command more. Emergency call-out rates for domestic work are typically £60–90/hr with a minimum charge.',
  },
  {
    question: 'Is there demand for renewable energy electrical work in Cumbria?',
    answer:
      'Yes, substantially. Cumbria has significant wind energy development in the upland areas of the Lake District fringes and Eden Valley, as well as solar installations across the county. The county also has a higher-than-average proportion of rural properties off the gas grid, making air source heat pump installations (and associated electrical upgrades) a growing market. EV charger installations are growing in line with the national trend. Electricians with renewables experience — particularly MCS accreditation for solar PV and heat pumps — can build a strong specialism in Cumbria.',
  },
  {
    question: 'What electrical certificates are required for Cumbria rental properties?',
    answer:
      'Cumbrian landlords are subject to the same requirements as the rest of England: an Electrical Installation Condition Report (EICR) is required for all private rented properties under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. EICRs must be carried out by a qualified person, renewed at a maximum of five years (or at change of tenancy if sooner), and the report provided to tenants within 28 days. New circuit installations require an Electrical Installation Certificate (EIC) per BS 7671 Section 631. Consumer unit replacements require an EIC and must be notified under Part P of the Building Regulations in England.',
  },
  {
    question: 'Are there any specific challenges for electricians in rural Cumbria?',
    answer:
      'Rural Cumbria presents several practical challenges. Many properties are TT earthed (using an earth electrode rod) rather than TN-C-S, as overhead distribution lines are common in rural areas and a reliable metallic return path is not available. TT systems require RCD protection on all circuits under BS 7671 regulation 411.3.3, and earth electrode testing is essential. Long cable runs between properties and distribution points require careful voltage drop calculations. Some agricultural properties have three-phase supplies requiring different installation approaches. Travel times between jobs are longer than in urban areas, and material supply chains may add lead times for specialist items.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
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
      'Electrical Installation Condition Reports for Cumbria rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables accurately for rural Cumbria properties with long cable runs and TT earthing systems.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Cumbria — including rural supply upgrades and DNO notifications through ENW.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Cumbrian electrical jobs accurately — including rural travel time and specialist industrial work.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules including TT earthing system testing.',
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
    heading: 'Electrician in Cumbria: What You Need to Know',
    content: (
      <>
        <p>
          Cumbria is one of England's largest counties by area and one of its most distinctive
          electrical markets. The county stretches from the Scottish border in the north to
          Morecambe Bay in the south, encompassing the Lake District National Park, the coastal
          industrial towns of Whitehaven and Workington, the commercial centre of Carlisle, and the
          shipbuilding town of Barrow-in-Furness.
        </p>
        <p>
          What sets Cumbria apart from virtually every other county in England is the presence of
          Sellafield — one of Europe's largest and most complex nuclear sites — on the west coast.
          Sellafield shapes the local electrical labour market profoundly: it attracts specialist
          electricians from across the UK, supports a significant contractor ecosystem, and creates
          a two-tier rate structure where nuclear site work commands substantially higher pay than
          standard domestic and commercial work.
        </p>
        <p>
          Beyond nuclear, Cumbria has a varied electrical market: rural agricultural properties with
          TT earthing systems, a growing renewables sector, the BAE Systems submarine facility in
          Barrow, cross-border commercial work with Scotland from Carlisle, and a healthy domestic
          and commercial market across the county's towns and villages.
        </p>
        <p>
          This guide covers the key considerations for electricians working in Cumbria, including
          nuclear site requirements, the ENW distribution network, area-specific characteristics,
          and local rates.
        </p>
      </>
    ),
  },
  {
    id: 'nuclear',
    heading: 'Sellafield and the Nuclear Electrical Labour Market',
    content: (
      <>
        <p>
          Sellafield is the dominant economic force in west Cumbria and one of the most significant
          nuclear sites in the world. The site encompasses nuclear fuel reprocessing, waste
          treatment and storage, and decommissioning operations, employing approximately 11,000
          direct and contractor staff. For electricians, it represents both a major employer and a
          specialist market requiring specific qualifications, clearances, and working practices.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear Site Licence conditions</strong> — Sellafield operates under a
                Nuclear Site Licence issued by the Office for Nuclear Regulation (ONR). Licence
                Conditions (LCs) govern how activities on site must be managed, including electrical
                work. LC 28 (examination, inspection, maintenance, and testing) is particularly
                relevant, requiring that safety-related electrical systems are maintained to
                documented standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security vetting</strong> — access to Sellafield requires a valid site pass.
                Most contractor roles require Baseline Personnel Security Standard (BPSS) as a
                minimum, with higher-sensitivity areas requiring Counter Terrorist Check (CTC) or
                Security Check (SC) vetting. The vetting process can take several weeks and must be
                initiated through the site operator or principal contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>SQEP framework</strong> — Sellafield requires electricians to demonstrate
                they are Suitably Qualified and Experienced Persons (SQEP) for the work undertaken.
                This typically requires documented evidence of qualifications, experience, and
                competency assessments. Ad hoc access is not possible — all electrical workers must
                be assessed against site-specific SQEP criteria before undertaking work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60364 and nuclear codes</strong> — while BS 7671 provides the baseline,
                nuclear sites also apply IEC 60364 (the international standard underpinning BS 7671)
                and nuclear industry-specific guidance published by the Nuclear Decommissioning
                Authority (NDA) and other bodies. Electricians must understand both the general
                wiring regulations and the additional requirements applicable in nuclear
                environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit-to-work systems</strong> — all electrical work at Sellafield is
                managed under a formal permit-to-work (PTW) system. Electricians must understand and
                comply with the site's Electrical Safety Rules, isolation procedures, and PTW
                requirements. Working without a valid permit is a serious safety and regulatory
                violation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians looking to enter the nuclear market, the typical pathway is: obtain core
          electrical qualifications (C&G 2365 or NVQ Level 3), gain several years of industrial
          experience, apply for security clearance, and engage with principal contractors operating
          at Sellafield such as Jacobs, Cavendish Nuclear, or Morgan Sindall Infrastructure. Many
          specialist nuclear electrician roles are filled through agencies with established
          relationships on site.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'BS 7671, IEC 60364, and Nuclear Industry Codes',
    content: (
      <>
        <p>
          Electrical work in Cumbria is subject to the same regulatory framework as the rest of
          England, with significant additional requirements for those working on nuclear licensed
          sites. Understanding the layered regulatory picture is essential:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024 (18th Edition)</strong> — the baseline standard for all
                electrical installations in England. All domestic and commercial work must comply,
                with an Electrical Installation Certificate (EIC) required for new installations and
                a Periodic Inspection Report (EICR) for assessments of existing installations per
                Section 631.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P Building Regulations</strong> — applies in England. Consumer unit
                replacements, new circuits, and other notifiable work must be notified to the local
                authority or self-certified through a competent person scheme (NICEIC, NAPIT, or
                similar). RCD protection requirements under regulation 411.3.3 apply across all
                notifiable domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — applies to all electrical
                work in the workplace. Particularly important in Cumbria's industrial and nuclear
                sectors. Regulation 4 requires that electrical systems are of adequate construction
                and maintained to prevent danger. Regulation 16 requires that persons working on
                electrical systems are competent to do so.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60364</strong> — the international standard for low-voltage electrical
                installations, upon which BS 7671 is based. Nuclear sites and some large industrial
                facilities reference IEC 60364 directly, particularly for design and documentation
                purposes. Understanding IEC 60364 alongside BS 7671 is valuable for industrial and
                nuclear electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear industry codes and standards</strong> — the NDA and site operators
                publish technical standards and codes of practice for nuclear facilities. These
                cover topics including electrical isolation, testing regimes, documentation
                requirements, and the management of safety-related electrical systems. These codes
                sit above BS 7671 and impose additional requirements specific to the nuclear
                environment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For standard domestic and commercial work in Cumbria, the regulatory picture is identical
          to elsewhere in England. The nuclear layer is additional — it does not replace BS 7671 but
          adds significant further requirements on top of it.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: "Electricity North West: Cumbria's DNO",
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the Distribution Network Operator for
          Cumbria and the wider North West of England. All DNO-related work in Cumbria goes through
          ENW:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, capacity upgrades (for
                example, from 60A to 100A for EV chargers or heat pumps), and service cable
                replacements are managed through ENW's connections team. Rural Cumbria has a higher
                proportion of overhead distribution lines than urban areas, which affects connection
                and upgrade timelines.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, wind turbines,
                and other generation equipment must be notified to ENW. Cumbria has significant wind
                and solar generation, and ENW handles a large volume of G99 applications for rural
                and agricultural installations. G99 applications for larger systems typically take
                4–10 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — rural Cumbria has a higher-than-average
                proportion of properties with TT earthing, served by overhead distribution lines. TT
                systems require all circuits to have RCD protection (BS 7671 regulation 411.3.3) and
                earth electrode testing. Always verify the earthing arrangement at the intake before
                quoting or starting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large industrial and nuclear connections</strong> — Sellafield and BAE
                Systems are among ENW's largest industrial customers. Their supply arrangements are
                managed separately through ENW's major connections team. Contractors working on
                these sites generally deal with the site operator's internal electrical engineering
                team rather than ENW directly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          ENW's 24-hour fault line is 105 (the national number for electricity network faults). For
          connections and technical queries, ENW's North West connections portal is the primary
          route. Keep ENW's emergency and connections contact details available — response times in
          rural Cumbria can be longer than in urban areas due to the travel distances involved.
        </p>
      </>
    ),
  },
  {
    id: 'areas',
    heading: 'Key Towns and Areas in Cumbria',
    content: (
      <>
        <p>Cumbria's main towns each have distinct electrical market characteristics:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Carlisle</h3>
            <p className="text-white text-sm leading-relaxed">
              The county town and commercial hub of Cumbria. Carlisle is 34 miles from Dumfries and
              has strong cross-border trade links with south-west Scotland. The city has a mixed
              commercial and domestic electrical market, a city centre with some older building
              stock, and growing retail and logistics development around the M6 corridor. Carlisle
              electricians often serve a wide rural hinterland to the east and south.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Barrow-in-Furness</h3>
            <p className="text-white text-sm leading-relaxed">
              Dominated by BAE Systems's Barrow Shipyard — the UK's largest naval shipbuilding
              facility, building Astute-class and Dreadnought-class nuclear submarines. Defence and
              marine electrical work, specialist clearances, and high-value industrial contracts are
              central to the local electrical market. Domestic work serves a working-class town with
              older housing stock requiring periodic updates.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Whitehaven and Workington</h3>
            <p className="text-white text-sm leading-relaxed">
              Coastal industrial towns with chemical, manufacturing, and port-related industries.
              Close proximity to Sellafield makes these towns a centre for nuclear contractor
              accommodation and support services. Offshore-adjacent work including marine and
              coastal installation work is present. The housing stock includes a mix of Victorian
              terraces, inter-war social housing, and post-war development.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Cumbria</h3>
            <p className="text-white text-sm leading-relaxed">
              Farms, holiday lets, rural cottages, and Lake District tourism properties make up a
              significant portion of the Cumbrian electrical market. TT earthing systems, long cable
              runs, off-gas-grid properties (driving heat pump installations), and agricultural
              three-phase supplies are all common. Holiday let landlords require regular EICRs and
              are a reliable repeat-business source.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Cumbria (2026)',
    content: (
      <>
        <p>
          Cumbrian rates reflect the county's geography and its dual labour market — standard
          domestic and commercial work at regional rates, and nuclear or specialist industrial work
          at significantly higher contract rates. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Standard Domestic / Commercial</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£35 — £55</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£250 — £380</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£60 — £90/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed house)</span>
                  <span className="font-semibold">£3,500 — £6,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£180 — £280</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Nuclear / Specialist Industrial</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Sellafield contract rate</span>
                  <span className="font-semibold">£60 — £90+/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>BAE Systems / defence</span>
                  <span className="font-semibold">£55 — £85+/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Industrial / chemical sites</span>
                  <span className="font-semibold">£50 — £75/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,200</span>
                </li>
                <li className="flex justify-between">
                  <span>Solar PV (per panel)</span>
                  <span className="font-semibold">£200 — £280</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Rural Cumbrian jobs typically require a travel time premium — factor travel costs and time
          into quotes for properties in the Lake District, Eden Valley, or the Solway Plain. Many
          rural Cumbrian electricians operate a minimum call-out charge of £80–120 to cover travel
          costs on isolated jobs.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Cumbria',
    content: (
      <>
        <p>
          Cumbria offers a genuinely varied electrical market, from standard domestic work to some
          of the most technically demanding and well-paid nuclear and defence electrical roles in
          the UK. Understanding both sides of this market is key to building a successful electrical
          business in the county.
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
                  site with AI-assisted board scanning. Holiday let and rental property EICRs are a
                  reliable revenue stream in Cumbria — deliver professional documentation from your
                  phone before you leave site.
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
                  for long rural cable runs and TT earthed properties. Accurate voltage drop
                  calculations are essential when serving remote farmhouses and rural cottages with
                  long distribution runs.
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
                  Price Cumbrian jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Factor travel time premiums for rural jobs, material lead times for remote
                  sites, and specialist rates for industrial work. Send professional PDF quotes to
                  clients from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Cumbria electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the realities of rural Cumbria, nuclear-adjacent work, and industrial sites. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCumbriaPage() {
  return (
    <GuideTemplate
      title="Electrician in Cumbria | Local Electricians 2026"
      description="Find qualified electricians in Cumbria. Sellafield nuclear site requirements, BS 7671 and IEC 60364, Electricity North West DNO, Carlisle, Barrow, Whitehaven, Workington, and Cumbria electrician rates 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cumbria"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Cumbria: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Cumbria has one of the UK's most distinctive electrical labour markets, shaped by Sellafield nuclear site, BAE Systems's submarine facility in Barrow, and a vast rural county with TT earthing systems and growing renewables demand."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Cumbria"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Cumbria Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the realities of Cumbria's nuclear sites, rural properties, and coastal industrial work. 7-day free trial."
    />
  );
}
