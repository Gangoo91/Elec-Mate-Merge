import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  PoundSterling,
  AlertTriangle,
  Zap,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Landmark,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-belfast' },
  { label: 'Belfast', href: '/guides/electrician-belfast' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Belfast' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Belfast' },
  { id: 'ni-regulations', label: 'Northern Ireland Regulations (NOT Part P)' },
  { id: 'dno-regulations', label: 'NIE Networks DNO' },
  { id: 'property-types', label: 'Belfast Property Challenges' },
  { id: 'titanic-quarter', label: 'Titanic Quarter Regeneration' },
  { id: 'for-electricians', label: 'For Electricians Working in Belfast' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CRITICAL: Northern Ireland does NOT use Part P of the Building Regulations. Electrical work in Belfast is governed by the Building Regulations (Northern Ireland) 2012, specifically Technical Booklet P. The competent person self-certification scheme does not operate in Northern Ireland in the same way as England and Wales.',
  'NIE Networks is the sole electricity distributor for Northern Ireland, including Belfast. All new connections, supply upgrades, meter relocations, and network matters go through NIE Networks — not UKPN, SSEN, or any other DNO.',
  "Belfast has a large stock of Victorian and Edwardian terraces in South Belfast (Stranmillis, the Holylands, Ormeau Road) with original or ageing wiring. Many of these are student HMOs serving Queen's University Belfast.",
  'The Titanic Quarter is one of the largest urban regeneration projects in Europe, creating significant demand for commercial and residential electrical installations in new-build apartments, offices, hotels, and cultural venues.',
  'Electricians in Northern Ireland must be registered with a recognised body. The main registration bodies are NICEIC, NAPIT, and the Electrical Contractors Association (ECA). Registration demonstrates competence but the self-certification process differs from England and Wales.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Belfast?',
    answer:
      'Belfast electrician day rates typically range from £250 to £350 per day for a qualified electrician, with hourly rates of £35 to £50 per hour. Common job prices include: full rewire of a 3-bed Victorian terrace £3,800 to £5,500, consumer unit replacement £400 to £650, electrical condition report £160 to £260, EV charger installation £700 to £1,100, and additional socket from existing circuit £90 to £150. Belfast prices are generally lower than London and the South East but competitive for Northern Ireland. Titanic Quarter and city centre commercial work commands premium rates. Always get at least three written quotes.',
  },
  {
    question: 'How do I check if a Belfast electrician is properly qualified?',
    answer:
      'Ask for their registration number with NICEIC, NAPIT, or the ECA and verify it online. In Northern Ireland, there is no direct equivalent of the Part P competent person self-certification scheme that operates in England and Wales. However, registration with a recognised body demonstrates that the electrician has been assessed and their work is periodically inspected. Also check for a valid ECS (Electrotechnical Certification Scheme) card, public liability insurance (minimum £2 million recommended), and recent references from Belfast customers.',
  },
  {
    question: 'Who is the DNO for Belfast and Northern Ireland?',
    answer:
      'NIE Networks is the sole electricity distribution network operator for all of Northern Ireland. They own and maintain the transmission and distribution network that delivers electricity to approximately 900,000 customers across Northern Ireland. For new connections, supply upgrades, or meter relocations in Belfast, apply through NIE Networks (nienetworks.co.uk). For power cuts, call the NIE Networks emergency line on 03457 643 643. When completing electrical certificates in Belfast, reference NIE Networks as the distributor.',
  },
  {
    question: 'How do Northern Ireland electrical regulations differ from England and Wales?',
    answer:
      'Northern Ireland has its own Building Regulations separate from England and Wales. Electrical work is governed by the Building Regulations (Northern Ireland) 2012, Technical Booklet P (Electrical Safety). The key differences are: there is no direct equivalent of the Part P competent person self-certification scheme, building control notification requirements differ, the local authority building control function is delivered through district councils (Belfast City Council for Belfast), and some certification processes operate differently. BS 7671 (the IET Wiring Regulations) still applies as the technical standard for electrical installations throughout the UK including Northern Ireland. Always check the specific Northern Ireland requirements rather than assuming England and Wales rules apply.',
  },
  {
    question: 'What electrical work is needed in Titanic Quarter developments?',
    answer:
      'The Titanic Quarter regeneration includes new-build apartments, office blocks, hotels, cultural venues (including Titanic Belfast), and mixed-use developments. Electrical work ranges from standard domestic installations in the apartment blocks to complex commercial fit-outs. Common requirements include complete new installations per dwelling with EIC certification, communal area lighting with emergency lighting to BS 5266, fire detection systems to BS 5839, three-phase supplies for commercial units, and EV charging infrastructure in car parks. The scale and variety of work in the Titanic Quarter makes it one of the most significant electrical opportunities in Belfast.',
  },
  {
    question: 'What are the HMO electrical requirements in Belfast?',
    answer:
      "Belfast has a large HMO market concentrated around Queen's University in the Holylands, Stranmillis, and lower Ormeau Road. Belfast City Council requires HMO properties to meet specific fire safety standards. This typically includes interlinked fire detection (usually LD2 grade to BS 5839-6), emergency lighting on escape routes, and a satisfactory electrical condition report. Belfast City Council Environmental Health officers inspect HMO properties and can require improvements. The specific requirements may differ from those applied in England and Wales under the Housing Act — always check the Northern Ireland HMO regulations and Belfast City Council licensing conditions.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site for Belfast rental and HMO properties.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-guide',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Full guide to consumer unit upgrades including regulatory notification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for new installations and Titanic Quarter projects.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'How to become NICEIC registered and what it means for your electrical business.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for domestic and commercial installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes for Belfast customers with accurate local pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Finding a Qualified Electrician in Belfast',
    content: (
      <>
        <p>
          Belfast is the capital and largest city in Northern Ireland, with a population of
          approximately 345,000 in the city and over 670,000 in the wider Belfast Metropolitan Area.
          The city has undergone remarkable transformation over the past two decades, with major
          regeneration projects including the Titanic Quarter, the Cathedral Quarter, and ongoing
          investment in housing and infrastructure.
        </p>
        <p>
          The electrical contracting market in Belfast is driven by several factors: a substantial
          stock of Victorian and Edwardian terraces in South Belfast requiring modernisation, the
          Titanic Quarter creating demand for new-build residential and commercial installations, a
          busy student HMO market around Queen's University, and steady domestic demand for consumer
          unit upgrades, EV chargers, and condition reports.
        </p>
        <p>
          <strong>Important:</strong> Northern Ireland has its own regulatory framework for
          electrical work, separate from England and Wales. The Building Regulations (Northern
          Ireland) 2012 and Technical Booklet P govern electrical safety — not Part P of the
          Building Regulations (England and Wales). Electricians and homeowners in Belfast must be
          aware of these differences. However, BS 7671 (the IET Wiring Regulations) applies as the
          technical standard across the entire UK, including Northern Ireland.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications",
    content: (
      <>
        <p>
          Before hiring any electrician in Belfast, verify their credentials. The registration
          landscape in Northern Ireland differs slightly from England and Wales. Here is what to
          check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registration body membership</strong> — ask for their NICEIC, NAPIT, or ECA
                registration number. Search it online on the body's website to confirm it is
                current. Registration means the electrician's work is regularly assessed. Note that
                the self-certification process in Northern Ireland operates differently from the
                Part P competent person scheme in England and Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications and competence level. A gold ECS card indicates a
                qualified electrician (typically holding C&G 2365/2357 and C&G 2391 or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. For commercial and Titanic Quarter work, £5
                million is advisable. Ask for a copy of the insurance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Belfast customers, or check verified reviews on Checkatrade, Trustpilot, or
                Google Business. Look for reviews mentioning similar work to yours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of electricians who cannot provide a registration number, offer significantly
          below-market rates, refuse to provide a written quote, or pressure you to pay cash without
          an invoice.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Belfast (2026 Prices)',
    content: (
      <>
        <p>
          Belfast electrical work is generally more affordable than London, the South East, and most
          of mainland Britain. However, the cost of materials and specialist equipment is similar
          across the UK. Here are realistic Belfast prices for common domestic electrical work in
          2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £3,800 to £5,500 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and
                certification. Victorian terraces in South Belfast with lath-and-plaster walls and
                high ceilings are at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £400 to £650 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and appropriate
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical condition report</strong> — £160 to £260 for a house, £140 to
                £220 for a flat. Essential for rental properties, HMO licensing, and property
                transactions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £90 to £150 per single
                socket, depending on cable run and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,100 for a 7kW home charger
                including supply, installation, earthing, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £110 to £190 for the first hour including
                travel, plus £40 to £60 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. Titanic Quarter and city centre commercial work is
          priced separately and typically commands a premium. Always get at least three written
          quotes for significant work.
        </p>
      </>
    ),
  },
  {
    id: 'ni-regulations',
    heading: 'Northern Ireland Electrical Regulations (NOT Part P)',
    content: (
      <>
        <p>
          This is the single most important difference for anyone involved in electrical work in
          Belfast compared to the rest of the UK. Northern Ireland has its own Building Regulations
          and its own approach to electrical safety compliance.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations (NI) 2012, Technical Booklet P</strong> — this is the
                regulatory framework for electrical safety in Northern Ireland. It is NOT Part P of
                the Building Regulations (England and Wales). The scope, notification requirements,
                and enforcement mechanisms differ. Do not assume that rules applying in England and
                Wales automatically apply in Northern Ireland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>No Part P competent person self-certification</strong> — the competent
                person self-certification scheme that allows registered electricians in England and
                Wales to self-certify notifiable work does not operate in the same way in Northern
                Ireland. Building control notification requirements differ. Check the specific
                Northern Ireland requirements with Belfast City Council Building Control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 still applies</strong> — the technical standard for electrical
                installations (BS 7671, the IET Wiring Regulations, currently 18th Edition with
                Amendment 2) applies across the entire United Kingdom including Northern Ireland.
                The wiring itself must comply with the same technical standards. It is the
                regulatory and notification framework around it that differs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Belfast City Council Building Control</strong> — for notifiable electrical
                work in Belfast, the local authority building control function is delivered by
                Belfast City Council. Their requirements and fees may differ from those of English
                and Welsh local authorities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are an electrician moving to Belfast from England, Wales, or Scotland, do not
          assume the regulatory framework is identical. Familiarise yourself with the Building
          Regulations (Northern Ireland) 2012 and Technical Booklet P before carrying out notifiable
          work.
        </p>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: "NIE Networks: Belfast's Electricity Distributor",
    content: (
      <>
        <p>
          NIE Networks is the sole electricity distribution network operator for all of Northern
          Ireland. Unlike mainland Great Britain where there are multiple regional DNOs, Northern
          Ireland has a single distributor. Any work affecting the electricity supply to your
          Belfast property involves NIE Networks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply through NIE Networks
                (nienetworks.co.uk). New domestic connections in Belfast typically take 4 to 8
                weeks. For three-phase supplies or larger upgrades, allow 8 to 12 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NIE
                Networks to disconnect and reconnect the supply. Your electrician installs the new
                meter tails; NIE Networks handles the meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — solar PV, battery storage, or generator
                installations require notification to NIE Networks. The G98 (up to 16A per phase)
                and G99 (larger systems) notification process applies in Northern Ireland as in the
                rest of the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cuts</strong> — report via NIE Networks on 03457 643 643. Belfast's
                older areas, particularly those with ageing underground infrastructure, can
                experience occasional supply interruptions during severe weather.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When completing electrical certificates in Belfast, reference NIE Networks as the
          distributor. The earthing arrangement in most Belfast properties is TN-C-S (PME), though
          some older properties may have TN-S earthing.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Belfast Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Belfast has a varied property stock, from grand Victorian terraces in South Belfast to
          post-war housing estates, modern Titanic Quarter apartments, and everything in between.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Victorian Terraces (South Belfast)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Stranmillis, the Holylands, University Street, and the lower Ormeau Road area contain
              dense rows of Victorian and Edwardian terraces, many converted to student HMOs.
              Challenges include lath-and-plaster walls, high ceilings, multiple previous partial
              rewires, and in some cases original lead-sheathed cabling. Many of these properties
              have been subdivided into flats or HMO rooms with complex metering arrangements.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs (Queen's Quarter)</h3>
            <p className="text-white text-sm leading-relaxed">
              Queen's University Belfast drives a large student rental market in the Holylands,
              Stranmillis, Botanic, and lower Lisburn Road. HMO properties require interlinked fire
              detection (LD2 to BS 5839-6), emergency lighting on escape routes, RCD protection on
              all circuits, and a satisfactory electrical condition report. Belfast City Council
              actively enforces HMO standards.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large housing estates built from the 1950s onwards in areas like Andersonstown,
              Poleglass, Dundonald, and Newtownabbey often have original or early wiring with
              rewirable fuses, no RCD protection, and outdated consumer units. These properties
              represent a significant volume of consumer unit upgrade and rewiring work.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Heritage Buildings (Cathedral Quarter)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The Cathedral Quarter and parts of central Belfast contain listed and heritage
              buildings being repurposed for hospitality, offices, and residential use. Electrical
              work in listed buildings requires careful routing of cables, sympathetic accessory
              choices, and coordination with the local planning authority regarding any changes
              affecting the building's character.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'titanic-quarter',
    heading: 'Titanic Quarter Regeneration',
    content: (
      <>
        <p>
          The Titanic Quarter is one of the largest urban regeneration projects in Europe, covering
          185 acres of the former Harland and Wolff shipyard. The development includes residential
          apartments, office complexes, hotels, the Titanic Belfast museum, film studios, and
          educational facilities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-build residential</strong> — apartment blocks in the Titanic Quarter
                require standard domestic installations per dwelling plus communal area systems
                including emergency lighting to BS 5266, fire detection to BS 5839, and landlord
                distribution boards. Each dwelling requires an Electrical Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial fit-outs</strong> — office and hospitality spaces require
                three-phase supplies, sub-distribution boards, structured cabling for data networks,
                and lighting control systems. The specification level in Titanic Quarter commercial
                properties is typically higher than average Belfast commercial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Waterfront considerations</strong> — as a docklands development, the Titanic
                Quarter is exposed to coastal conditions. External installations should use IP65 or
                higher rated accessories, stainless steel fixings, and marine-grade enclosures where
                appropriate. Car park EV charging infrastructure is increasingly standard in new
                developments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scale of opportunity</strong> — the Titanic Quarter masterplan envisages up
                to 7,500 new homes and 23,000 office workers at full build-out. This represents one
                of the most significant long-term electrical contracting opportunities in Northern
                Ireland for the coming decades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Securing work in the Titanic Quarter typically requires commercial contracting experience,
          appropriate insurance levels (£5 million to £10 million public liability is common for
          main contractor requirements), and the ability to manage larger project timelines.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Belfast Market',
    content: (
      <>
        <p>
          Belfast offers a growing and diversifying electrical market. The combination of Titanic
          Quarter regeneration, Cathedral Quarter renovation, student HMO compliance, domestic
          rewiring of the city's older housing stock, and increasing EV charger demand creates
          varied opportunities for electrical contractors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Know the NI Regulations</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you have worked in England or Wales, do not assume the same regulatory
                  framework applies. Building Regulations (NI) 2012 and Technical Booklet P govern
                  electrical work in Belfast. The competent person self-certification scheme does
                  not operate the same way. Familiarise yourself with the NI-specific requirements
                  before taking on notifiable work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Belfast landlords, developers, and commercial clients expect professional
                  certificates. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site demonstrates
                  professionalism and saves hours of admin.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Belfast electrical business from your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional EICRs, EICs, and Minor Works certificates completed on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBelfastPage() {
  return (
    <GuideTemplate
      title="Electrician in Belfast | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Belfast. Realistic 2026 pricing, NIE Networks DNO, Northern Ireland Building Regulations (NOT Part P), Titanic Quarter developments, Victorian terrace rewiring, and student HMO compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Belfast:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Belfast, what to expect on pricing, and the unique regulatory landscape for electrical work in Northern Ireland. Covers NIE Networks, Building Regulations (NI), Titanic Quarter regeneration, student HMOs, and Victorian terrace rewiring."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Belfast"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Belfast and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
