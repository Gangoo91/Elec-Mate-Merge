import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Home,
  Users,
  Leaf,
  Building2,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Bristol', href: '/guides/electrician-bristol' },
];

const tocItems = [
  { id: 'overview', label: 'Bristol Overview' },
  { id: 'regulations', label: 'Part P and Building Control' },
  { id: 'dno', label: 'Western Power Distribution' },
  { id: 'property-types', label: 'Bristol Property Types' },
  { id: 'eco-retrofit', label: 'Eco-Retrofit and Green Capital Legacy' },
  { id: 'hmos', label: 'HMOs and Student Properties' },
  { id: 'pricing', label: 'Electrician Rates in Bristol' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Western Power Distribution (now National Grid Electricity Distribution) is the DNO for Bristol and the wider South West. All new connections, capacity upgrades, and generation notifications go through WPD/NGED.',
  'Bristol has a large stock of Georgian and Victorian properties, particularly in Clifton, Redland, Cotham, and Montpelier. These present challenges including lath-and-plaster walls, lead pipe earthing, and outdated wiring concealed behind period features.',
  'Bristol was the European Green Capital in 2015, and the city retains strong demand for eco-retrofit work including solar PV, battery storage, EV chargers, and heat pump installations. Bristol City Council offers incentives for energy efficiency upgrades.',
  'The city has a significant HMO market driven by the University of Bristol and UWE. HMO licensing in Bristol requires EICRs, fire detection to BS 5839-6, and emergency lighting — creating regular repeat work for local electricians.',
  'Harbour-side and Temple Quarter regeneration projects are generating demand for commercial and residential electrical work in new-build developments, offering higher-value contracts alongside the traditional domestic market.',
];

const faqs = [
  {
    question: 'Who is the DNO for Bristol?',
    answer:
      'Western Power Distribution (WPD) is the DNO for Bristol, now operating under the National Grid Electricity Distribution (NGED) brand following the 2024 acquisition. For practical purposes, the WPD name and systems are still widely used. All new connections, capacity upgrades, generation connections (solar PV, battery storage), and EV charger notifications go through WPD/NGED. Their South West region covers Bristol, Somerset, Devon, Cornwall, and parts of Dorset and Wiltshire. WPD/NGED are generally well-regarded for response times and connection processing.',
  },
  {
    question: 'What are the challenges of working in Clifton and Redland properties?',
    answer:
      'Clifton and Redland contain some of Bristol most desirable — and most challenging — properties for electrical work. Georgian and Victorian townhouses and villas with solid stone or brick walls, lath-and-plaster ceilings, high ceilings (3m+), and ornamental features. Cable routing requires careful planning to avoid damaging cornices, ceiling roses, and picture rails. Many properties have been converted into flats, with complex existing wiring from multiple conversion phases. Lead water pipes used as the earth electrode are still found in some older properties — these must be identified and supplementary earthing provided. The Clifton and Hotwells area includes several conservation areas where external work may require planning permission.',
  },
  {
    question: 'How much does an electrician charge in Bristol?',
    answer:
      'Bristol electrician rates in 2026 typically range from £42 to £60 per hour for a qualified, registered electrician. Day rates range from £280 to £420 for a sole trader and £380 to £520 for a firm. Emergency call-out rates are £75 to £110 per hour with a minimum charge of £100 to £160. Common fixed-price jobs: consumer unit replacement £600 to £1,000, single socket addition £110 to £170, full house rewire (3-bed Victorian) £4,200 to £7,000, EICR £200 to £320, EV charger installation £800 to £1,300. Bristol rates are comparable to other major UK cities outside London and are influenced by the strong local economy and high property values in areas like Clifton, Redland, and Bishopston.',
  },
  {
    question: 'What HMO regulations apply to electricians in Bristol?',
    answer:
      'Bristol City Council operates a mandatory HMO licensing scheme for properties with 5 or more occupants from 2 or more households, and an additional licensing scheme that covers smaller HMOs in some areas. HMO licensing requires: a satisfactory EICR (no C1 or C2 codes), fire detection to BS 5839-6 (Grade D LD2 minimum for most HMOs, Grade A LD2 for larger properties), emergency lighting on escape routes, and adequate socket provision (minimum 4 double sockets per bedroom is the Bristol standard). EICRs must be renewed every 5 years, and fire alarm systems require annual servicing. This creates reliable repeat work for electricians who build relationships with landlords and letting agents.',
  },
  {
    question: 'Is there demand for eco-retrofit electrical work in Bristol?',
    answer:
      'Bristol has some of the strongest demand for eco-retrofit electrical work in the UK. The city European Green Capital status in 2015 created lasting momentum, and Bristol City Council One City Climate Strategy targets carbon neutrality by 2030. Practical demand includes: solar PV installations (Bristol has above-average solar irradiance for the UK), battery storage systems (particularly with time-of-use tariffs), EV charger installations (Bristol has expanding clean air zones), heat pump electrical supplies (requiring consumer unit upgrades and dedicated circuits), and LED lighting upgrades. Bristol Energy Cooperative and community energy schemes also generate work. Electricians with MCS certification and heat pump experience are particularly well-positioned in the Bristol market.',
  },
  {
    question: 'Do I need Part P registration to work as an electrician in Bristol?',
    answer:
      'Bristol is in England, so Part P of the Building Regulations applies to all notifiable domestic electrical work. To self-certify notifiable work (new circuits, consumer unit replacements, bathroom and outdoor work), you must be registered with a competent person scheme such as NICEIC, NAPIT, ELECSA, or Stroma. If you are not registered with a competent person scheme, the householder must apply to Bristol City Council Building Control for a building notice before work starts, and the council will inspect the work — which adds cost and delay. Registration with a competent person scheme is strongly recommended for any electrician working regularly in Bristol.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone for Bristol domestic and commercial work.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Bristol rental properties and HMO licensing compliance.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Victorian property rewires, EV charger circuits, and heat pump installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Bristol — clean air zone considerations and WPD DNO notifications.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Installation',
    description:
      'Battery storage guide for Bristol eco-retrofit projects — sizing, inverters, and MCS certification.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all inspection and testing procedures.',
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
    heading: 'Electrician in Bristol: What You Need to Know',
    content: (
      <>
        <p>
          Bristol is one of the UK's most vibrant and fastest-growing cities, with a population of
          over 470,000 and a diverse property stock that ranges from Georgian crescents in Clifton
          to Victorian terraces in Bedminster, Edwardian villas in Redland, post-war estates in
          Hartcliffe, and modern harbour-side apartments.
        </p>
        <p>
          For electricians, Bristol offers a strong and varied market. The city's commitment to
          sustainability (it was the European Green Capital in 2015) drives demand for solar PV,
          battery storage, and EV charger installations. The large student population and active HMO
          market create steady demand for EICRs and fire alarm work. The ongoing regeneration of
          Temple Quarter and the harbour-side generates commercial and new-build residential
          opportunities.
        </p>
        <p>
          This guide covers the regulatory framework, DNO details, property-specific challenges, the
          eco-retrofit market, HMO requirements, pricing, and practical advice for electricians
          working in Bristol.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Building Control in Bristol',
    content: (
      <>
        <p>
          Bristol is in England, so{' '}
          <SEOInternalLink href="/guides/part-p-electrical-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          applies to all notifiable domestic electrical work. The key points for Bristol
          electricians:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — NICEIC, NAPIT, ELECSA, or
                Stroma registration allows you to self-certify notifiable work without involving
                building control. This is the standard approach for most Bristol electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol City Council Building Control</strong> — if you are not registered
                with a competent person scheme, the householder must apply to Bristol City Council
                Building Control for a building notice before notifiable work begins. The council
                will inspect the work and charge a fee (typically £250 to £400). This route is
                slower and more expensive than self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — new circuits, consumer unit replacements,
                additions or alterations in bathrooms and wet rooms, outdoor electrical
                installations, and work in special locations (swimming pools, saunas) are all
                notifiable under Part P. An{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> must be issued
                for all notifiable work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Western Power Distribution: Bristol DNO',
    content: (
      <>
        <p>
          <strong>Western Power Distribution (WPD)</strong>, now part of National Grid Electricity
          Distribution (NGED), is the DNO for Bristol and the wider South West region. All
          DNO-related work goes through WPD/NGED:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, capacity upgrades (for
                EV chargers, heat pumps), and service cable replacements are requested through the
                WPD/NGED connections portal. Processing times are typically 4 to 8 weeks for
                standard domestic upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation equipment must be notified to WPD/NGED. G98 notifications (up to 16A per
                phase) are straightforward and do not require prior approval. G99 applications for
                larger systems require approval before connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Bristol properties are predominantly TN-C-S
                (PME) in newer areas and TN-S in older areas. Some Victorian and Edwardian
                properties may have TT earthing or rely on lead water pipes as the earth electrode —
                these must be identified and addressed. WPD/NGED can confirm the earthing
                arrangement at the supply point if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low carbon technology connections</strong> — WPD/NGED have a specific
                process for notifying EV charger and heat pump installations. While not all
                installations require a formal connection application, WPD/NGED request notification
                so they can manage network capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Bristol Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Bristol's property stock is diverse, and each area presents different electrical
          challenges. Understanding the local property types helps with accurate quoting and
          efficient installations:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Clifton Georgian and Victorian</h3>
            <p className="text-white text-sm leading-relaxed">
              Grand Georgian crescents and Victorian villas with solid stone walls, high ceilings,
              ornamental plasterwork, and period features. Many divided into flats with complex
              existing wiring. Cable routing must avoid damaging cornices and ceiling roses.
              Conservation area restrictions apply to much of Clifton. Lead water pipe earthing
              still found in some properties. Full rewires are premium jobs — £6,000 to £10,000 for
              a large Clifton flat.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Redland and Cotham Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian and Edwardian terraced houses, many converted into flats or HMOs. Typical
              features include brick cavity walls (earlier properties may be solid), suspended
              timber floors, and original consumer units in understair cupboards. These properties
              are bread-and-butter domestic electrical work — rewires, consumer unit upgrades,
              additional circuits, and EV charger installations. Strong HMO market in these areas.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Harbour-Side New Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              Modern apartments and townhouses in the harbour-side, Temple Quarter, and Finzels
              Reach developments. Built to current standards with modern consumer units and cable
              infrastructure. Work is typically additions, modifications, smart home installations,
              and EV charger connections in underground car parks. Higher-value customers willing to
              pay for quality work and professional service.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bedminster and Southville</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian terraces undergoing gentrification. A mix of original condition properties
              needing full rewires and recently renovated homes wanting upgrades — EV chargers,
              smart home wiring, garden office supplies. The eco-conscious demographic in Southville
              (nicknamed "Southville Republic" for its green credentials) drives strong demand for
              solar PV and energy efficiency upgrades.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'eco-retrofit',
    heading: 'Eco-Retrofit: Bristol Green Capital Legacy',
    content: (
      <>
        <p>
          Bristol was awarded European Green Capital status in 2015, and the city has maintained its
          commitment to sustainability through the One City Climate Strategy, which targets carbon
          neutrality by 2030. For electricians, this translates into strong demand for low-carbon
          electrical work:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV</strong> — Bristol has above-average solar irradiance for the UK
                (approximately 1,050 kWh/m per year). Demand for domestic solar PV is strong,
                particularly in south-facing Victorian terraces. A typical 4kWp domestic system
                installation is worth £5,000 to £8,000 including electrical connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage</strong> — pairing{' '}
                <SEOInternalLink href="/guides/battery-storage-installation">
                  battery storage
                </SEOInternalLink>{' '}
                with solar PV is increasingly popular in Bristol. Time-of-use tariffs make battery
                storage financially attractive even without solar PV. The electrical package for a
                battery installation is worth £3,000 to £6,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargers</strong> — Bristol's expanding clean air zone and high EV
                adoption rate drive demand for domestic{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charger installations
                </SEOInternalLink>
                . Terraced properties in areas like Redland and Cotham present challenges with cable
                routes from the consumer unit to the parking location, often requiring runs through
                garages or along external walls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump electrical supplies</strong> — air source heat pumps require
                dedicated circuits, often a 32A or 40A supply from the consumer unit. Many older
                Bristol properties need a consumer unit upgrade or main supply capacity increase to
                accommodate a heat pump alongside existing loads. This work is typically worth
                £1,500 to £3,000 for the electrical package.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Bristol Energy Cooperative and community energy schemes also commission electrical work
          for community solar projects. Electricians with MCS certification and experience in
          renewable energy installations are well-positioned to benefit from Bristol's green
          economy.
        </p>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'HMOs and Student Properties in Bristol',
    content: (
      <>
        <p>
          Bristol has two major universities — the University of Bristol and the University of the
          West of England (UWE) — with a combined student population of over 60,000. This drives a
          large HMO market, concentrated in Stokes Croft, Cotham, Redland, Fishponds, and the
          streets surrounding both campuses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — Bristol City Council requires HMO
                licences for properties with 5 or more occupants from 2 or more separate households.
                Additional licensing schemes may extend this to smaller HMOs in certain wards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirements</strong> — a satisfactory{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> with no C1 or
                C2 observations is required for HMO licensing and must be renewed every 5 years.
                This creates predictable repeat work for electricians who maintain a portfolio of
                HMO clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection</strong> — HMOs must have fire detection to BS 5839-6. Most
                Bristol HMOs require Grade D LD2 (mains-powered smoke alarms in escape routes and
                principal habitable rooms) as a minimum. Larger HMOs and higher-risk properties may
                require Grade A LD2 with a panel. The Bristol HMO team is strict on fire detection
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — emergency lighting on escape routes is
                required in all licensed HMOs. Self-contained maintained or non-maintained
                luminaires on escape routes, tested in accordance with BS 5266-1.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building relationships with Bristol landlords, letting agents, and property management
          companies is one of the most effective ways to build a steady workload. Offer a managed
          EICR and fire alarm testing service with annual reminders to create reliable recurring
          revenue.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Bristol (2026)',
    content: (
      <>
        <p>
          Bristol electrician rates reflect the city's strong economy, high property values, and
          demand for skilled tradespeople. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£42 — £60</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£280 — £420</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£380 — £520</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£75 — £110/hr</span>
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
                  <span>Full rewire (3-bed Victorian)</span>
                  <span className="font-semibold">£4,200 — £7,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£200 — £320</span>
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
          Rates in premium areas such as Clifton, Redland, and Bishopston tend to be at the higher
          end of these ranges. Period property rewires in Clifton command a significant premium due
          to the complexity of working around heritage features and the expectations of the customer
          base.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Bristol',
    content: (
      <>
        <p>
          Bristol is one of the best cities in the UK for electricians. The combination of a strong
          local economy, diverse property stock, active rental market, and leading-edge demand for
          green energy installations creates a broad and profitable workload.
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
                  site with AI-assisted board scanning. HMO compliance, landlord certificates, and
                  new installation documentation — all from your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Period Properties</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for rewires in Bristol's Victorian and Georgian properties. Longer cable routes
                  around solid walls and period features require accurate voltage drop calculations.
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
                  Price Bristol jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemise materials, labour, testing, and certification for everything from
                  consumer unit upgrades to full eco-retrofit packages. Professional PDF quotes
                  build trust with Bristol's quality-conscious customers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Bristol electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the demands of Bristol's diverse property market. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBristolPage() {
  return (
    <GuideTemplate
      title="Electrician in Bristol | Find Electricians 2026"
      description="Find qualified electricians in Bristol. WPD DNO, Georgian and Victorian properties in Clifton and Redland, eco-retrofit demand, HMO compliance, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Bristol"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Bristol: <span className="text-yellow-400">Find Electricians 2026</span>
        </>
      }
      heroSubtitle="Bristol's mix of Georgian elegance, Victorian terraces, harbour-side new builds, and the UK's strongest eco-retrofit market makes it one of the most rewarding cities for electricians. From Clifton rewires to Southville solar PV."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Bristol Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Bristol's Victorian terraces, HMO market, and green energy demand. 7-day free trial."
    />
  );
}
