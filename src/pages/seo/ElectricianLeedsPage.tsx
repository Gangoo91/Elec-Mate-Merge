import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  PoundSterling,
  Building2,
  AlertTriangle,
  Users,
  Zap,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-leeds' },
  { label: 'Leeds', href: '/guides/electrician-leeds' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Leeds' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Leeds' },
  { id: 'property-types', label: 'Leeds Property Types' },
  { id: 'dno-regulations', label: 'Northern Powergrid and Regulations' },
  { id: 'hmo-student', label: 'Student HMOs in Headingley and Hyde Park' },
  { id: 'commercial', label: 'Commercial Work in Leeds City Centre' },
  { id: 'for-electricians', label: 'For Electricians in Leeds' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always verify your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme. Check registration numbers online before work starts.',
  'Leeds electrician rates are slightly below the national average — typically £200 to £320 per day — reflecting lower operating costs compared to London and the South East while still attracting skilled tradespeople.',
  'Northern Powergrid is the Distribution Network Operator for Leeds and the wider Yorkshire region. All new connections, supply upgrades, and generation notifications go through Northern Powergrid.',
  'Leeds has a distinctive property mix including Yorkshire stone-built back-to-back terraces (unique to the region), Victorian through-terraces in Headingley and Chapel Allerton, city centre apartments, and new-build estates in the suburbs.',
  'Headingley, Hyde Park, and Woodhouse have the highest concentration of student HMOs in Leeds, with strict licensing and electrical compliance requirements enforced by Leeds City Council.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Leeds?',
    answer:
      'Leeds electrician day rates typically range from £200 to £320 per day for a qualified electrician. Hourly rates are usually £30 to £50 per hour, with emergency call-outs at £55 to £90 per hour. Specific job costs in Leeds: a full rewire of a 3-bed stone terrace is £4,000 to £6,500, a consumer unit replacement is £400 to £650, an EICR is £140 to £260, and an EV charger installation is £600 to £1,100. Prices are slightly lower than Manchester and significantly lower than London. Affluent suburbs like Roundhay, Alwoodley, and Harrogate Road tend to command rates at the higher end.',
  },
  {
    question: 'How do I find a registered electrician in Leeds?',
    answer:
      'Search the NICEIC, NAPIT, or ELECSA websites using your Leeds postcode to find registered electricians in your area. NAPIT has a particularly strong presence in Yorkshire. You can also check Checkatrade, MyBuilder, and Google Business reviews for local feedback. Leeds has active community groups on Facebook (Headingley Residents, Chapel Allerton Chat, Horsforth Community) where residents regularly share recommendations. The Leeds branch of the ECA (Electrical Contractors Association) can also recommend member contractors for commercial or larger residential projects.',
  },
  {
    question: 'Who is the electricity DNO for Leeds?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Leeds and the wider Yorkshire and North East England region. Northern Powergrid owns and maintains the electricity infrastructure — the cables, substations, and network that deliver electricity to your property. Contact Northern Powergrid for new connections, supply upgrades, meter relocations, and reporting power cuts (call 105 or visit northernpowergrid.com). Your electrician submits G98/G99 notifications to Northern Powergrid when installing solar PV, battery storage, or EV chargers. Northern Powergrid is separate from your electricity supplier (the company you pay your bills to).',
  },
  {
    question: 'How long does a rewire take in a Leeds stone terrace?',
    answer:
      'A full rewire of a typical 2 to 3 bedroom Leeds stone-built terrace takes 5 to 8 working days with a team of two. Yorkshire stone terraces present specific challenges: the thick stone walls (often 400mm or more) make chasing difficult and time-consuming, requiring a heavy-duty chasing machine or surface-mounted alternatives in some areas. Many Leeds terraces have cellars, which provide useful cable routing under the ground floor and can reduce the amount of wall work needed. Back-to-back terraces (common in areas like Harehills, Beeston, and parts of Armley) share walls with neighbours, limiting cable routes. Allow 1 to 2 additional days for testing, certification, and making good.',
  },
  {
    question: 'Do I need an EICR for my Leeds rental property?',
    answer:
      'Yes. All landlords in England — including Leeds — must have a valid Electrical Installation Condition Report (EICR) for rented properties, carried out at least every 5 years or at change of tenancy. Leeds City Council actively enforces this requirement, particularly in areas with high concentrations of rental properties such as Headingley, Hyde Park, Woodhouse, Harehills, and the city centre. An EICR in Leeds typically costs £140 to £260 depending on property size. Failure to comply can result in civil penalties of up to £30,000. Leeds City Council has a dedicated private rented sector enforcement team.',
  },
  {
    question: 'What are the HMO electrical requirements in Leeds?',
    answer:
      'Houses in Multiple Occupation in Leeds must meet both national HMO regulations and Leeds City Council specific licensing conditions. Electrical requirements include: a valid EICR (maximum 5-year interval), LD2 grade fire detection (mains-wired interlinked smoke and heat detectors with battery backup to BS 5839-6), emergency lighting in escape routes for properties of 3 or more storeys, and adequate socket provision (to reduce reliance on extension leads and adaptors). Leeds City Council operates mandatory HMO licensing for properties with 5 or more occupants in 2 or more households. The council also operates selective licensing in specific areas. Headingley and Hyde Park have the highest density of student HMOs in Leeds.',
  },
  {
    question: 'Can I get a three-phase supply installed at my Leeds property?',
    answer:
      'Yes, Northern Powergrid can upgrade your property from single-phase to three-phase supply. This is increasingly requested in Leeds for properties with EV chargers (22kW chargers require three-phase), heat pumps, home workshops, and large extensions. The process involves an application to Northern Powergrid, a site survey, and installation of a new three-phase service cable and meter. The cost varies significantly depending on the distance from the existing three-phase network — from £2,000 to £8,000 or more. Lead times are typically 6 to 10 weeks. Your electrician can advise whether three-phase is necessary for your planned work or whether single-phase is adequate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on your phone with AI-assisted testing.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-guide',
    title: 'Consumer Unit Replacement Guide',
    description: 'Full guide to consumer unit upgrades including Part P notification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Understand which electrical work is notifiable and what compliance means.',
    icon: ShieldCheck,
    category: 'Guide',
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
    description: 'Create professional quotes with accurate pricing for Leeds customers.',
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
    heading: 'Finding a Qualified Electrician in Leeds',
    content: (
      <>
        <p>
          Leeds is the largest city in West Yorkshire with over 340,000 households, and the wider
          Leeds City Region (including Bradford, Wakefield, and Harrogate) has over 1.2 million
          homes. The electrical contracting market serves a diverse range of properties — from
          Yorkshire stone terraces built in the 1800s to modern city centre apartments and suburban
          new-build estates.
        </p>
        <p>
          The Leeds economy has grown significantly in recent years, with the financial and legal
          services sectors driving commercial office development in the city centre, and a strong
          residential market fuelling new-build construction, buy-to-let investment, and property
          refurbishment. This creates steady demand for electrical contractors across domestic,
          commercial, and industrial sectors.
        </p>
        <p>
          For any notifiable electrical work in Leeds, you need an electrician registered with a{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          competent person scheme. The main schemes are{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>, NAPIT, and
          ELECSA. NAPIT has a particularly strong presence across Yorkshire, with many local
          electricians registered under this scheme.
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
          Before hiring an electrician in Leeds, carry out these checks to protect yourself and your
          property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                or ELECSA registration number. Verify it on the scheme provider's website. This
                confirms they are qualified to self-certify notifiable work under Part P and their
                work is periodically assessed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications and competence. A gold card indicates a fully qualified
                electrician. Ask to see it — any reputable electrician will be happy to show you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £1 million cover, ideally £2
                million. Higher cover is advisable for work in period properties where accidental
                damage to original features could be expensive to repair. Ask for a copy of the
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local recommendations</strong> — check Google Business, Checkatrade, and
                Trustpilot reviews. Leeds community Facebook groups (Chapel Allerton Community,
                Roundhay Residents, Horsforth Forum) frequently have threads recommending local
                electricians. Word-of-mouth is particularly strong in the Leeds trades community.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Leeds (2026 Prices)',
    content: (
      <>
        <p>
          Leeds electrical prices are slightly below the national average, reflecting lower
          operating costs (cheaper parking, lower insurance premiums, shorter travel times) compared
          to southern cities. Here are realistic 2026 prices for common domestic work in Leeds:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed stone terrace)</strong> — £4,000 to £6,500 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Stone-built terraces with thick walls are at the upper end due to the
                difficulty of chasing through Yorkshire stone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £400 to £650 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £140 to £260 depending on property size. A 2-bed flat is
                typically £140 to £180; a 3 to 4 bed house is £180 to £260. Older Leeds terraces
                with extensive original wiring take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket</strong> — £80 to £140 per single socket from an existing
                circuit. Surface-mounted options are cheaper in stone-walled properties where
                flush-mounting would require extensive stone chasing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £600 to £1,100 for a 7kW home charger.
                Suburban Leeds properties with driveways (Roundhay, Horsforth, Guiseley) are
                straightforward. Terraced properties in inner Leeds may need creative cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £90 to £160 for the first hour including
                travel, plus £35 to £55 per additional hour. Evening and weekend surcharges of 30%
                to 50% are standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always get three written quotes. Prices vary across Leeds — Roundhay, Alwoodley, and
          Chapel Allerton are at the higher end; Harehills, Beeston, and Armley are at the lower
          end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Leeds Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Leeds has a property mix that is distinctly Yorkshire. The stone-built terraces, the
          back-to-back houses, and the Victorian through-terraces create specific electrical
          challenges that electricians from other regions may not have encountered.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Yorkshire Stone Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Leeds' signature property type — stone-built terraces with thick masonry walls, found
              across Headingley, Chapel Allerton, Meanwood, and Harehills. The stone walls
              (typically 350mm to 500mm thick) make cable chasing extremely difficult and slow. Many
              electricians working in these properties use a combination of chasing in plaster
              (where it exists), surface-mounted mini-trunking in less visible areas, and cable
              routing through cellars and loft spaces to minimise stone cutting. Rewires take longer
              and cost more than equivalent brick-built properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Back-to-Back Houses</h3>
            <p className="text-white text-sm leading-relaxed">
              Leeds has the largest remaining stock of back-to-back houses in the UK. These compact
              terraces (common in Harehills, Beeston, Armley, and Holbeck) share three walls with
              neighbours, leaving only the front elevation for windows and access. This severely
              limits cable routes — cables can only enter through the front wall or from above. Many
              back-to-backs have no cellar, further reducing routing options. Electrical work
              requires creative solutions and often more surface-mounted wiring than would be
              typical in a through-terrace.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">City Centre Apartments</h3>
            <p className="text-white text-sm leading-relaxed">
              Leeds city centre has seen major apartment development since 2000, with large
              complexes along the waterfront, in Holbeck Urban Village, and around the station.
              These modern builds typically have compliant electrical installations, but work within
              them requires coordination with building management (access to risers, fire stopping
              requirements, noise restrictions). Common electrical work includes upgrades to kitchen
              circuits, home office installations, and EV charger circuits in basement car parks.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Suburban New-Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build estates in areas like Garforth, Rothwell, Guiseley, and Yeadon have modern
              installations with compliant consumer units and well-documented circuits. Electrical
              work here is typically additions — EV charger circuits, garden electrics, home office
              circuits, lighting upgrades, and smart home installations. The original builder's EIC
              provides a baseline for any additional work.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'Northern Powergrid and Local Regulations',
    content: (
      <>
        <p>
          Northern Powergrid is the Distribution Network Operator for Leeds, West Yorkshire, and the
          wider Yorkshire and North East England region. Northern Powergrid owns and maintains the
          electricity network infrastructure — cables, substations, and the service to your
          property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — apply through Northern Powergrid's
                website (northernpowergrid.com) for new electricity supplies, single-phase to
                three-phase upgrades, and increased capacity. Standard domestic applications in
                Leeds typically have a 4 to 8 week lead time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — required for solar PV, battery storage, and
                generation equipment. Your electrician submits these to Northern Powergrid. G98
                (systems up to 16A per phase) is processed within 10 working days. Northern
                Powergrid has an online portal for G98 submissions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Looped service cables</strong> — many older Leeds properties, particularly
                terraces, have looped service cables (where the incoming supply passes through one
                property to reach the next). This is important for electricians to identify during
                an EICR or before any work near the incoming supply, as isolating one property's
                supply may affect a neighbour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Leeds is overseen by Leeds City Council building
          control or an approved inspector. If your electrician is registered with a competent
          person scheme, they handle the notification directly.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-student',
    heading: 'Student HMOs in Headingley, Hyde Park and Woodhouse',
    content: (
      <>
        <p>
          Leeds is home to the University of Leeds and Leeds Beckett University, with a combined
          student population of over 60,000. The traditional student areas — Headingley, Hyde Park,
          Woodhouse, and Burley — have some of the highest concentrations of HMOs in the city. These
          properties have specific electrical requirements that landlords must meet.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirement</strong> — all HMOs in Leeds must have a valid{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> with a
                maximum 5-year interval. Leeds City Council is proactive in enforcement and
                regularly inspects licensed HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>LD2 fire detection</strong> — licensable HMOs must have mains-wired
                interlinked fire detection to LD2 standard (BS 5839-6). Heat detectors in kitchens,
                smoke detectors in hallways, landings, living rooms, and bedrooms, all interlinked
                with battery backup. This is specialist electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — HMOs of 3 or more storeys typically require
                emergency lighting in escape routes. Non-maintained emergency light fittings in
                hallways, landings, and stairwells, tested annually and with 3-hour battery backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leeds selective licensing</strong> — Leeds City Council operates selective
                licensing in specific areas. Check whether your property falls within a selective
                licensing area, as this extends HMO-style conditions to standard rental properties
                in those zones.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The summer turnaround period (July to September) is extremely busy for electrical work in
          Leeds student areas. Landlords should book electrical work well in advance of this period
          to ensure compliance before new tenants move in.
        </p>
      </>
    ),
  },
  {
    id: 'commercial',
    heading: 'Commercial Electrical Work in Leeds City Centre',
    content: (
      <>
        <p>
          Leeds has one of the strongest commercial property markets outside London, with major
          office developments along Wellington Street, in the South Bank regeneration area, and
          around the financial district. The city's growing tech sector, legal and financial
          services industry, and retail sector all generate significant demand for commercial
          electrical contractors.
        </p>
        <p>
          Commercial electrical work in Leeds includes office fit-outs and Cat A/Cat B
          installations, retail electrical installations (the Victoria Quarter, Trinity Leeds, White
          Rose Shopping Centre), industrial installations on the surrounding business parks,
          hospitality sector work (Leeds has a growing hotel and restaurant market), and data centre
          and communications infrastructure.
        </p>
        <p>
          Electricians moving into commercial work in Leeds need additional competencies beyond
          domestic qualifications: C&G 2391 for inspection and testing, familiarity with three-phase
          distribution, commercial fire alarm systems (BS 5839-1), emergency lighting to BS 5266,
          and CSCS cards for construction sites.
        </p>
        <SEOAppBridge
          title="Manage your Leeds electrical business from one app"
          description="Elec-Mate helps Leeds electricians quote, schedule, and certify jobs across domestic and commercial work. Professional certificates completed on site, instant PDF delivery to clients."
          icon={Building2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The Leeds Market',
    content: (
      <>
        <p>
          Leeds offers a stable and growing market for electricians. The combination of a large
          Victorian and Edwardian housing stock needing upgrades, a busy student rental sector
          driving compliance work, strong commercial property development, and a growing suburban
          new-build market creates consistent demand across all types of electrical work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Key Opportunities</h4>
                <p className="text-white text-sm leading-relaxed">
                  HMO compliance work (EICRs, fire detection, emergency lighting) provides a steady
                  base of repeat work — especially during the summer turnaround. Stone terrace
                  rewires are a specialist skill that commands a premium. EV charger installations
                  are growing in suburban Leeds. The South Bank regeneration and city centre
                  commercial development offer opportunities for electricians with commercial
                  experience.
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
                  Leeds letting agents manage large portfolios of student and professional rental
                  properties. They need certificates fast and in digital format. Complete your{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> on your
                  phone, email the PDF on the day, and stand out from competitors still posting
                  paper copies.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Leeds electrical business"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Complete EICRs and EICs on site, send instant PDFs to Leeds letting agents and landlords. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianLeedsPage() {
  return (
    <GuideTemplate
      title="Electrician in Leeds | Local Electricians 2026"
      description="Find qualified, registered electricians in Leeds. 2026 pricing guide, NICEIC/NAPIT verification, Yorkshire stone terrace rewiring, Northern Powergrid connections, student HMO compliance in Headingley and Hyde Park."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Leeds: <span className="text-yellow-400">Local Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Leeds, realistic local pricing, and the specific challenges of Yorkshire stone terraces and back-to-backs. Covers Northern Powergrid connections, student HMO compliance, Part P, and the commercial market."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site and send instant PDFs to Leeds letting agents and landlords. 7-day free trial."
    />
  );
}
