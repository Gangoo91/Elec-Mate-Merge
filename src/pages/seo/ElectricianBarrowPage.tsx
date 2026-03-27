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
  { label: 'Electrician in Barrow-in-Furness', href: '/electricians/barrow-in-furness' },
];

const tocItems = [
  { id: 'overview', label: 'Barrow-in-Furness Overview' },
  { id: 'bae', label: 'BAE Systems and Defence Electrical Work' },
  { id: 'nuclear-defence', label: 'Nuclear and Marine Electrical Requirements' },
  { id: 'dno', label: 'Electricity North West (ENW)' },
  { id: 'property-types', label: 'Property Types and Challenges' },
  { id: 'pricing', label: 'Electrician Rates in Barrow' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Barrow-in-Furness is dominated by BAE Systems\'s Barrow Shipyard — the UK\'s largest naval shipbuilding facility and the sole builder of the Royal Navy\'s nuclear submarine fleet (Astute-class and Dreadnought-class). Defence and marine electrical work is central to the local economy.',
  'Electricians working at BAE Systems Barrow require security clearance (typically SC or DV level for submarine work), and must work to defence and marine electrical standards including DEF STAN 08-series, alongside BS 7671.',
  'Barrow\'s location on the Furness Peninsula creates geographic isolation — the town is effectively a peninsula with limited road access. This shapes the local electrical market, with a self-contained community and less competition from outside contractors than comparable towns.',
  'Electricity North West (ENW) is the Distribution Network Operator. The Walney offshore wind farms (visible from Barrow) are connected to the ENW network and represent a significant local renewable energy infrastructure.',
  'Labour rates in Barrow are £35–52/hr for standard domestic work. BAE Systems and defence contractor rates are substantially higher — £55–85+/hr — reflecting the security clearance and specialist skills required.',
  'Barrow has a high proportion of older industrial and residential housing stock — Victorian terraces, inter-war social housing, and post-war estates. Consumer unit replacement, rewiring, and EICR work are the backbone of the domestic electrical market.',
];

const faqs = [
  {
    question: 'What makes BAE Systems Barrow so significant for the local electrical market?',
    answer:
      'BAE Systems\'s Barrow Shipyard is the UK\'s largest naval shipbuilding facility and the only place in the country where nuclear submarines are built. The Astute-class attack submarines and the Dreadnought-class ballistic missile submarines (replacing the Vanguard class as the UK\'s nuclear deterrent) are both built here. The shipyard employs approximately 10,000 people directly, with thousands more in the supply chain. For electricians, the shipyard represents a major source of defence and marine electrical contract work — but one that requires high-level security clearance (Security Check or Developed Vetting), specialist marine electrical knowledge, and compliance with defence standards. This is not casual contract work — it is highly regulated, well-paid, and requires a significant investment in clearance and qualification.',
  },
  {
    question: 'What security clearance is needed to work at BAE Systems Barrow?',
    answer:
      'Working at BAE Systems Barrow requires security clearance appropriate to the sensitivity of the work. For general shipyard access, Security Check (SC) clearance is typically required. For work on nuclear propulsion systems or in more sensitive areas of the submarine programme, Developed Vetting (DV) clearance may be required. The clearance process is significantly more involved than the nuclear site BPSS or CTC vetting required for Sellafield — DV clearance involves a detailed background investigation, interviews, and can take many months. Access to BAE Systems work is typically through the company\'s own recruitment process or through approved defence supply chain contractors. The clearance investment is substantial but the contract rates reflect this.',
  },
  {
    question: 'What electrical standards apply to submarine construction at Barrow?',
    answer:
      'Naval shipbuilding electrical work is governed by defence standards (DEF STAN) rather than — or in addition to — civilian standards. The DEF STAN 08 series covers marine engineering for naval vessels, including electrical installations. Marine electrical work must also comply with Lloyd\'s Register or other classification society rules for the vessel type. Nuclear propulsion system electrical work is additionally governed by nuclear safety standards and MoD nuclear safety regulations. BS 7671 provides a baseline but is generally supplemented or replaced by the more demanding defence and marine standards for direct shipyard work. Electricians entering this market need to develop familiarity with the applicable defence standards through their employer or principal contractor.',
  },
  {
    question: 'Is Barrow geographically isolated, and how does this affect the electrical market?',
    answer:
      'Yes. Barrow-in-Furness is situated at the tip of the Furness Peninsula, effectively surrounded by Morecambe Bay and the Irish Sea on three sides. Road access to the rest of Cumbria requires a significant detour around the bay (Ulverston is 10 miles north, Carlisle is 65 miles). This geographic isolation means that the local electrical market is largely self-contained — outside contractors are less likely to travel to Barrow than to a comparably sized town with better road connections. For locally based electricians, this reduces competition from outside firms. The same isolation affects material supply chains — allow additional lead time for specialist materials that need to be delivered to the Furness Peninsula.',
  },
  {
    question: 'What is the Walney offshore wind connection to Barrow?',
    answer:
      'The Walney offshore wind farm, visible from Barrow and the Furness coast, is one of the UK\'s largest offshore wind installations. The onshore cable landfall and grid connection infrastructure is near Barrow, and ENW manages the distribution network that connects this generation capacity. Offshore wind maintenance technicians (a separate specialist discipline from onshore electricians) operate from Barrow Docks. For onshore electricians, the wind farm creates some local substation and grid connection work, and the renewable energy focus in the area drives domestic solar PV, battery storage, and heat pump demand among the local population.',
  },
  {
    question: 'What types of domestic electrical work are common in Barrow?',
    answer:
      'The domestic electrical market in Barrow mirrors that of other post-industrial northern towns with older housing stock. Consumer unit replacements are the most common single job — the town has a high proportion of 1960s–1980s consumer units without adequate RCD protection, and a significant number of properties with older rewirable fuse boards still in service. Full rewires of Victorian terraces and inter-war housing are a regular source of work. EICR inspections are growing for the rental sector under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. EV charger installations are growing as BAE Systems employees and others adopt electric vehicles. Lighting upgrades to LED are common in both domestic and commercial properties.',
  },
  {
    question: 'How much does an electrician charge in Barrow-in-Furness?',
    answer:
      'Standard domestic and commercial electrician rates in Barrow-in-Furness in 2026 are typically £35–52/hr. Day rates are £240–360 for a sole trader. Emergency call-out rates are £60–90/hr with a minimum of £75–110. Common fixed-price jobs: consumer unit replacement £550–920, rewire (3-bed Victorian terrace) £3,500–5,800, EICR £170–260, EV charger installation £700–1,150. Defence and marine contract rates at BAE Systems and through the defence supply chain are substantially higher — £55–85+/hr — reflecting the clearance overhead and specialist skills required. Travel premiums apply for the more remote parts of the Furness Peninsula and the rural areas towards Ulverston and the Lake District.',
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
      'Electrical Installation Condition Reports for Barrow rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Barrow Victorian terraces and Furness Peninsula rural properties with longer cable runs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Barrow-in-Furness — ENW notifications, PME earthing, and coastal guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electricians/cumbria',
    title: 'Electrician in Cumbria',
    description:
      'County overview — Sellafield nuclear requirements, ENW, BAE Systems, and Cumbria electrician rates.',
    icon: MapPin,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing qualifications valued by defence and industrial contractors.',
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
    heading: 'Electrician in Barrow-in-Furness: What You Need to Know',
    content: (
      <>
        <p>
          Barrow-in-Furness is an industrial town at the tip of the Furness Peninsula in
          south-west Cumbria, separated from the rest of England by Morecambe Bay. With a
          population of around 70,000 in the wider Barrow area, it is the largest settlement
          in the Westmorland and Furness unitary authority and one of the most distinctive
          industrial towns in England.
        </p>
        <p>
          The town's entire economic character is shaped by BAE Systems's Barrow Shipyard —
          the UK's largest naval shipbuilding facility and the sole manufacturer of Britain's
          nuclear submarines. The shipyard directly employs around 10,000 people and supports
          a large supply chain, making it the dominant influence on the local labour market,
          including the electrical trades.
        </p>
        <p>
          For electricians, Barrow presents a dual market. The domestic and commercial sector
          is a typical northern post-industrial town with older housing stock, a growing rental
          market, and increasing demand for EV chargers and renewables. Alongside this is the
          defence and marine sector — high-value, highly regulated, requiring specialist
          clearances and qualifications, but offering some of the best electrical contractor
          rates in the region.
        </p>
        <p>
          The town's geographic isolation (limited road access, effectively a peninsula) means
          the local electrical market is more self-contained than most, with less competition
          from outside contractors than similarly sized towns with better transport links.
        </p>
      </>
    ),
  },
  {
    id: 'bae',
    heading: 'BAE Systems Barrow Shipyard and Defence Electrical Work',
    content: (
      <>
        <p>
          BAE Systems's Barrow Shipyard is the defining economic institution of Barrow-in-Furness.
          The yard is currently building the Astute-class nuclear attack submarines and the
          Dreadnought-class ballistic missile submarines — the replacement for the Vanguard-class
          vessels that form the UK's nuclear deterrent. This creates a sustained, long-term
          demand for specialist electrical contractors on site.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security clearance</strong> — Security Check (SC) clearance is required
                for general access to BAE Systems Barrow. Some roles involving nuclear
                propulsion systems or classified areas require Developed Vetting (DV) — the
                highest level of UK government security clearance. Both processes are sponsored
                by BAE Systems or an approved supply chain contractor and can take months to
                complete. DV clearance involves an in-depth background investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Defence standards</strong> — naval shipbuilding electrical work is
                governed by DEF STAN (Defence Standards), particularly the DEF STAN 08 series
                covering marine engineering. These standards impose requirements that differ
                from and are generally more demanding than civilian BS 7671. Electricians
                working in this environment must develop familiarity with the applicable
                defence and marine standards through their employer or principal contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marine electrical systems</strong> — submarine electrical systems are
                fundamentally different from land-based installations. They operate on DC bus
                systems as well as AC, with redundancy built into critical systems. The
                propulsion, weapons, navigation, and life support systems all have electrical
                elements with exceptional reliability requirements. This is specialist work
                that requires specific training and experience alongside civilian electrical
                qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply chain opportunities</strong> — not all defence-related electrical
                work at Barrow takes place inside the shipyard. The defence supply chain
                includes facilities, maintenance, and support services that employ electricians
                with lower clearance levels. MRO (maintenance, repair, and overhaul) facilities,
                defence logistics sites, and BAE Systems-adjacent offices and facilities all
                require electrical maintenance and installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nuclear-defence',
    heading: 'Nuclear Propulsion and Specialist Clearances',
    content: (
      <>
        <p>
          While Sellafield (north Cumbria) handles nuclear waste processing and reprocessing,
          Barrow's nuclear connection is through the propulsion systems of Royal Navy submarines.
          Nuclear submarine construction and maintenance creates a specific regulatory and
          compliance environment for electrical work:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>MoD nuclear safety regulations</strong> — the Ministry of Defence has
                its own nuclear safety regulatory framework governing nuclear propulsion
                in naval vessels. Electricians working on or near nuclear propulsion systems
                must comply with MoD nuclear safety requirements in addition to any civilian
                standards. The MoD Defence Nuclear Safety Regulator (DNSR) is the relevant
                authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60364 in the defence context</strong> — IEC 60364, the international
                standard for electrical installations, is referenced in defence standards as
                well as BS 7671. Understanding IEC 60364 alongside BS 7671 is valuable for
                electricians working in high-specification industrial and defence environments
                where IEC standards are applied directly rather than through the BS 7671
                interpretation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competence documentation</strong> — both the Electricity at Work
                Regulations 1989 (Regulation 16) and defence procurement standards require
                that persons working on electrical systems are demonstrably competent. In the
                defence sector, this typically means formal SQEP assessment or equivalent
                competency frameworks. Maintain comprehensive records of qualifications,
                training, and experience — they will be required for access to defence work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most locally based electricians, defence and marine work at BAE Systems is
          accessed through a career of building qualifications and industrial experience,
          then entering the BAE Systems supply chain through a cleared contractor. The
          investment in clearance and specialist training is significant but the career
          trajectory and rates can be exceptional.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Electricity North West: Barrow\'s DNO',
    content: (
      <>
        <p>
          <strong>Electricity North West (ENW)</strong> is the Distribution Network Operator
          for Barrow-in-Furness and the wider Furness Peninsula. Key points for Barrow
          electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — managed through ENW's
                connections portal. The Furness Peninsula's geographic position means that
                supply upgrades for high-power loads (EV chargers, heat pumps) may have
                longer lead times than in better-connected areas, as network reinforcement
                may be needed on the peninsula.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Walney offshore wind connection</strong> — the Walney offshore wind
                farm is connected to the ENW network via landfall infrastructure near Barrow.
                ENW manages the network that balances this significant generation capacity.
                Local electricians may encounter ENW's network reinforcement and upgrade
                activity in the Barrow area related to offshore wind connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and
                other generation must be notified to ENW. G98 (up to 16A per phase) is a
                straightforward online notification. G99 applications take 4–10 weeks to
                process. The Furness coast has a good renewable energy resource and
                growing domestic generation adoption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing systems</strong> — Barrow town properties are predominantly
                TN-C-S (PME). Rural properties on the Furness Peninsula and Walney Island
                may have TT earthing via overhead lines. Always verify earthing type at the
                intake. Walney Island properties accessible via the Jubilee Bridge should be
                specifically checked — coastal island locations can have varied earthing
                arrangements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Barrow Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Barrow's housing stock reflects the town's Victorian industrial origins and subsequent
          development as a company town built around the shipyard:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Industrial Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The majority of Barrow's older housing stock comprises Victorian brick-built
              terraces built for shipyard workers in areas such as Barrow Island, Hindpool,
              and Ormsgill. Solid walls, no cavity, pre-1980 asbestos risk, and dated
              electrical systems are all common features. Full rewires and consumer unit
              upgrades are a regular source of domestic work. Asbestos surveys are essential
              before any invasive work in properties built before 1985.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Social Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Barrow has extensive post-war social housing in areas such as Ormsgill, Parkside,
              and Hawcoat. Properties from the 1950s–1980s typically have dated consumer units
              with no or inadequate RCD protection, limited socket provision, and wiring at
              or approaching the end of its service life. Consumer unit replacement is the
              most common job type in these areas, alongside socket circuit additions.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Walney Island Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Walney Island, connected to Barrow by the Jubilee Bridge, has its own residential
              community. The island's coastal position and wind exposure make external
              electrical installations particularly demanding — IP65+ fittings, sealed cable
              entries, and corrosion-resistant fixings are essential. Walney is also home
              to the wind farm visitor centre and operational infrastructure.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Beyond BAE Systems, Barrow has commercial retail, leisure, and service businesses.
              The Furness General Hospital is a major institutional client for specialist
              healthcare electrical work. Retail parks and commercial developments on the
              outskirts of the town require standard commercial electrical fit-out and
              maintenance. Industrial units on the dockside and in the Devonshire Road area
              have three-phase supply requirements.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Barrow-in-Furness (2026)',
    content: (
      <>
        <p>
          Barrow rates reflect the town's geographic isolation and its dual market of standard
          domestic work and high-value defence and marine contracts. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Standard Domestic / Commercial</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£35 — £52</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£240 — £360</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£60 — £90/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £920</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£3,500 — £5,800</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£170 — £260</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,150</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Defence / Marine Contract</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>BAE Systems / defence rate</span>
                  <span className="font-semibold">£55 — £85+/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>SC clearance (general access)</span>
                  <span className="font-semibold">Lower tier</span>
                </li>
                <li className="flex justify-between">
                  <span>DV clearance (nuclear/classified)</span>
                  <span className="font-semibold">Premium tier</span>
                </li>
              </ul>
              <p className="text-white text-xs leading-relaxed pt-2">
                Defence contract rates reflect the significant clearance and qualification
                investment required. The premium over standard domestic work is substantial
                and sustained over the multi-decade submarine build programme.
              </p>
            </div>
          </div>
        </div>
        <p>
          The geographic isolation of Barrow generally reduces price competition from outside
          contractors — a benefit for locally based electricians. For rural jobs on the
          Furness Peninsula beyond Ulverston, apply a travel premium to cover the additional
          distance and time.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Barrow-in-Furness',
    content: (
      <>
        <p>
          Barrow offers a self-contained domestic and commercial electrical market, enhanced
          by the high-value defence and marine sector for those who invest in the necessary
          clearances and specialist skills. The town's geographic isolation reduces outside
          competition — a genuine advantage for locally established electricians.
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
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  on site with AI-assisted board scanning. The Barrow rental market and
                  growing BAE Systems employee owner-occupier market both need regular
                  professional documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Rewires and Rural Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for Victorian terrace rewires and longer cable runs in rural Furness Peninsula
                  properties. Accurate voltage drop calculations prevent issues in solid-walled
                  properties where routing adds cable length.
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
                  Price Barrow jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for asbestos survey costs on pre-1985 properties, Walney Island
                  coastal installation premiums, and travel time for rural Furness Peninsula
                  jobs. Send professional PDF quotes to clients from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Barrow-in-Furness electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Barrow's Victorian terraces, defence-adjacent work, and Furness Peninsula rural properties. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBarrowPage() {
  return (
    <GuideTemplate
      title="Electrician in Barrow-in-Furness | Local Electricians 2026"
      description="Find qualified electricians in Barrow-in-Furness, Cumbria. BAE Systems submarine facility, defence and marine electrical work, security clearances, Electricity North West DNO, and Barrow electrician rates 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Barrow-in-Furness"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Barrow-in-Furness:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Barrow-in-Furness is home to BAE Systems's shipyard — the UK's sole builder of nuclear submarines. The local electrical market is unlike anywhere else in England: a self-contained peninsula community where defence and marine electrical work, specialist clearances, and standard domestic rewires exist side by side."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Barrow-in-Furness"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Barrow Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Barrow's Victorian terraces, defence-adjacent industrial work, and Furness Peninsula rural properties. 7-day free trial."
    />
  );
}
