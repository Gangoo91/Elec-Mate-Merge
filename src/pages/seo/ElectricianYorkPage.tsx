import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Building2,
  Droplets,
  Landmark,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Location Guides', href: '/guides/electrician-near-me' },
  { label: 'York', href: '/guides/electrician-york' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Work in York' },
  { id: 'dno', label: 'Northern Powergrid DNO' },
  { id: 'listed-buildings', label: 'Listed Buildings & Conservation' },
  { id: 'flood-risk', label: 'Flood Risk & Electrical Safety' },
  { id: 'tourism-hospitality', label: 'Tourism & Hospitality Work' },
  { id: 'pricing', label: 'Pricing Guide' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'York is served by Northern Powergrid as the Distribution Network Operator (DNO). All new connections, service upgrades, and G98/G99 notifications go through Northern Powergrid — not National Grid or UKPN.',
  'The medieval city centre and York Minster close are within conservation areas with strict planning controls. Electrical work on listed buildings requires Listed Building Consent for any alterations that affect character — including surface-mounted trunking, external cable routes, and meter positions.',
  'York has a significant flood risk, particularly in the Foss Basin, Hungate, and Ouse riverside areas. Electricians working in flood-affected properties must follow IET guidance on electrical installations after flooding, including full insulation resistance testing and potential consumer unit replacement.',
  'The tourism and hospitality sector drives substantial commercial electrical work — hotels, restaurants, and visitor attractions require periodic inspection, emergency lighting testing, and fire alarm maintenance to Part 5 standards.',
  'Typical domestic rewire rates in York range from £3,500 to £6,000 for a 3-bedroom terraced house, with listed building work attracting a 20% to 40% premium due to heritage constraints and specialist fixings.',
];

const faqs = [
  {
    question: 'Who is the DNO for York?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for York and the surrounding area. They manage the electricity distribution network from 132kV down to 230V. All new connections, disconnections, service upgrades, meter relocations, and G98/G99 notifications for solar PV or battery storage must go through Northern Powergrid. Their contact centre handles new connection applications and fault reporting. The Northern Powergrid network covers most of Yorkshire, the North East, and parts of Lincolnshire and Derbyshire.',
  },
  {
    question: 'Do I need Listed Building Consent for electrical work in York?',
    answer:
      'If the building is Grade I or Grade II listed, you need Listed Building Consent for any electrical work that alters the character or appearance of the building. This includes surface-mounted trunking or conduit on original walls, new cable routes through original fabric (chasing into historic plaster or stonework), relocating the meter position or consumer unit, installing external floodlighting or security lighting, and any work affecting original features such as cornices, panelling, or lime plaster. In practice, most rewiring in listed buildings requires consent. Apply through City of York Council planning portal. The Minster close area and many streets within the city walls are in conservation areas where additional external appearance restrictions apply.',
  },
  {
    question: 'What should electricians do after a flood in York?',
    answer:
      'After floodwater has receded and the property has been dried out, the electrical installation must be thoroughly inspected and tested before re-energisation. The IET publishes specific guidance on electrical installations affected by flooding. Key steps include: visual inspection for silt, corrosion, and water damage to the consumer unit, accessories, and wiring; insulation resistance testing of all circuits (any reading below 1 megohm indicates compromised insulation); replacement of any equipment that has been submerged (consumer units, socket outlets at low level, and any accessories below the flood line); and an Electrical Installation Condition Report (EICR) documenting the condition of the full installation. In many cases, a complete rewire of ground floor circuits is necessary. The consumer unit should be relocated above the known flood level where possible.',
  },
  {
    question: 'How much does a rewire cost in York?',
    answer:
      'A full domestic rewire in York typically costs £3,500 to £6,000 for a standard 3-bedroom terraced house, including a new consumer unit, full circuit rewire, testing, certification, and making good. For larger properties (4 to 5 bedrooms), expect £5,500 to £9,000. Listed buildings attract a premium of 20% to 40% due to heritage constraints — the need for concealed routing, specialist fixings that do not damage original fabric, and the time required for careful installation through lime plaster and historic structures. Victorian terraces in areas like Bishopthorpe Road, The Groves, and Heworth are common rewire jobs, many still running original VIR or early PVC wiring from the 1950s and 1960s.',
  },
  {
    question: 'What commercial electrical work is available in York?',
    answer:
      'York has a strong commercial electrical market driven by tourism, hospitality, education, and the growing tech and biotech sectors at York Science Park. Hotels and restaurants in the city centre require periodic EICR inspections (typically every 5 years for commercial premises), emergency lighting testing, fire alarm installation and maintenance, and kitchen extract and ventilation system wiring. The University of York and York St John University generate ongoing maintenance and fit-out work. Retail units on Coney Street, Parliament Street, and the Shambles area require regular electrical maintenance. New-build commercial work is concentrated at Monks Cross, Clifton Moor, and the York Central development site.',
  },
  {
    question: 'Which competent person scheme is best for electricians working in York?',
    answer:
      "All the major competent person schemes — NICEIC, NAPIT, and ELECSA — are equally recognised in York and across England. The choice comes down to cost, assessment style, and the markets you serve. NICEIC is the most widely recognised brand, which can be helpful when marketing to York's landlords, estate agents, and commercial clients. NAPIT tends to be more cost-effective for smaller businesses and sole traders. ELECSA (operated by NICEIC Group) is also well regarded. Whichever scheme you choose, registration is essential for self-certifying notifiable electrical work under Part P of the Building Regulations. York City Council Building Control does not accept self-certification from unregistered electricians. For electricians targeting the York commercial market, check that your scheme covers the full range of electrical work you undertake, including specialist categories such as EV charging installations if relevant to your business.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site. Essential for post-flood inspections in York.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for rewires in York period properties. Automatic derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for new circuits and rewires directly from your phone.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-guide',
    title: 'EICR Guide',
    description:
      'Complete guide to Electrical Installation Condition Reports — inspection intervals, coding, and reporting.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, EICRs, and commercial work with professional PDF quotes sent from site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
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
    heading: 'Electrical Work in York: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          York presents a unique combination of challenges and opportunities for electricians. The
          medieval city centre, with over 2,000 listed buildings and extensive conservation areas,
          demands specialist knowledge of heritage electrical work. At the same time, York is a
          growing city with new housing developments at Monks Cross, Huntington, and the major York
          Central regeneration project on the former railway lands.
        </p>
        <p>
          The city sits at the confluence of the River Ouse and River Foss, making flooding a
          recurring risk that directly affects electrical installations. The devastating floods of
          2015 submerged hundreds of properties and created months of remedial electrical work
          across the city.
        </p>
        <p>
          Tourism is a major economic driver — York attracts over 8 million visitors per year,
          supporting a large hospitality sector that requires ongoing electrical maintenance,
          periodic inspection, and emergency lighting compliance. The University of York and York St
          John University add further demand for commercial and institutional electrical work.
        </p>
        <p>
          This guide covers the DNO arrangements, listed building requirements, flood risk
          considerations, commercial opportunities, and realistic pricing for electricians working
          in York and the surrounding area.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Northern Powergrid: Your DNO in York',
    content: (
      <>
        <p>
          York and the wider Yorkshire region are served by <strong>Northern Powergrid</strong> as
          the Distribution Network Operator. Northern Powergrid manages the electricity network from
          132kV substations down to the 230V supply entering domestic and commercial premises.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key DNO Information for York</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>DNO:</strong> Northern Powergrid (Northeast) plc
            </p>
            <p>
              <strong>MPAN prefix:</strong> 22 (Northeast region)
            </p>
            <p>
              <strong>New connections:</strong> Apply via Northern Powergrid connections portal for
              new supplies, upgrades from single-phase to three-phase, service alterations, and
              temporary builder supplies.
            </p>
            <p>
              <strong>G98/G99 notifications:</strong> Solar PV, battery storage, and EV charger
              installations that export to the grid require G98 (up to 16A per phase) or G99 (larger
              systems) notification to Northern Powergrid before energisation.
            </p>
            <p>
              <strong>Earthing:</strong> Most of York is PME (TN-C-S) earthing. Some older
              properties in the city centre, particularly those not upgraded since the 1960s, may
              still have TT earthing requiring an earth electrode. Check the supply earthing
              arrangement at the service head before commencing work.
            </p>
          </div>
        </div>
        <p>
          When working on properties in York, always confirm the DNO earthing arrangement at the
          intake position. PME restrictions apply for certain installations — particularly
          outbuildings, caravan supplies, and swimming pools — where a TT earthing arrangement with
          an earth electrode may be required regardless of the incoming supply type.
        </p>
      </>
    ),
  },
  {
    id: 'listed-buildings',
    heading: 'Listed Buildings and Conservation Areas in York',
    content: (
      <>
        <p>
          York has over 2,000 listed buildings and 35 conservation areas — more than almost any
          other city in England. The entire city centre within the medieval walls is a conservation
          area, and the York Minster close (the area immediately surrounding York Minster) has some
          of the strictest planning controls in the country.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent (LBC)</strong> — required for any work that alters
                the character of a listed building. For electrical work, this includes
                surface-mounted trunking or conduit on original walls, chasing into original plaster
                or masonry, relocating meters or consumer units, external lighting, and any work
                affecting original features. Apply through City of York Council. Allow 8 to 12 weeks
                for determination — factor this into project timelines.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed routing</strong> — in listed buildings, cables should be routed
                through existing voids (under floorboards, through ceiling voids, within existing
                trunking routes) wherever possible. Where cables must cross original walls, use
                existing service holes or drill through mortar joints — never through historic
                stonework or original brickwork. Lime plaster must not be chased; use skirting
                trunking or route cables behind original dado rails where they exist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>York Minster close</strong> — properties within the Minster close are
                subject to additional oversight from the Minster Chapter. External works (satellite
                dishes, external lighting, cable routes) are typically refused. Internal works
                require particular sensitivity to the historic fabric. Some properties in this area
                date to the 14th and 15th centuries and have timber-framed construction where fire
                safety and cable routing require specialist attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist fixings</strong> — in listed buildings, avoid plastic trunking
                where possible. Heritage-style metal conduit, brass accessories, and
                period-appropriate light fittings are often required by the conservation officer.
                Use brass screws rather than steel in visible locations. These specialist materials
                add cost but are essential for LBC compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Working on listed buildings in York is a specialist skill that commands premium rates.
          Build relationships with local conservation officers and heritage architects — they will
          refer electricians they trust for sensitive work. The{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            correct certification
          </SEOInternalLink>{' '}
          is essential, and your documentation should note any heritage constraints that affected
          the installation method.
        </p>
      </>
    ),
  },
  {
    id: 'flood-risk',
    heading: 'Flood Risk and Electrical Safety in York',
    content: (
      <>
        <p>
          York has a well-documented flood risk. The River Ouse and River Foss regularly flood,
          affecting properties in the Foss Basin, Hungate, Skeldergate, King Street, Water End, and
          low-lying areas of Bishopthorpe and Fulford. The 2015 Boxing Day floods caused over £45
          million of damage and affected more than 600 properties.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-flood inspection</strong> — after floodwater recedes and the property
                has dried out, the full electrical installation must be inspected and tested before
                re-energisation. This is not optional — it is a safety requirement. Any equipment
                that has been submerged must be assumed compromised until proven otherwise by
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit relocation</strong> — in flood-prone properties, relocate the
                consumer unit above the known flood level where the building permits. This prevents
                the most expensive single item from being destroyed in future flooding events. If
                relocation is not possible, fit a consumer unit that can be quickly disconnected and
                removed when flood warnings are issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet height</strong> — in properties at risk of repeat flooding,
                consider installing ground floor socket outlets at 1,200mm rather than the standard
                450mm. This keeps the sockets above typical flood levels and reduces the scope of
                damage. The customer should be advised of this option and the reasoning documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> — flood-damaged cables may show acceptable
                insulation resistance when dry but fail under load or in damp conditions. Test at
                500V DC and record results. If readings are marginal (1 to 2 megohm on a circuit),
                recommend replacement rather than reinstatement — the insulation has been
                contaminated and will degrade further over time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Post-flood electrical work is a significant market in York. Register with local insurance
          companies and loss adjusters as an approved electrical contractor for flood remediation.
          The <SEOInternalLink href="/tools/eicr-certificate">EICR certificate app</SEOInternalLink>{' '}
          is essential for documenting the condition of flood-affected installations and recording
          your test results.
        </p>
      </>
    ),
  },
  {
    id: 'tourism-hospitality',
    heading: 'Tourism and Hospitality Electrical Work in York',
    content: (
      <>
        <p>
          York's tourism economy supports hundreds of hotels, bed and breakfasts, restaurants, pubs,
          cafes, and visitor attractions. Each of these requires regular electrical maintenance and
          periodic inspection to meet licensing, insurance, and fire safety requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR inspections</strong> — commercial premises require an{' '}
                <SEOInternalLink href="/guides/eicr-guide">EICR</SEOInternalLink> typically every 5
                years. Hotels and guest houses with sleeping accommodation are treated as special
                locations under BS 7671 and may require more frequent inspection. Many insurers
                require a satisfactory EICR as a condition of cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — all commercial premises with public access
                require emergency lighting that complies with BS 5266. Monthly functional tests and
                annual 3-hour duration tests must be documented. Hotels, restaurants, and visitor
                attractions in York need maintained emergency lighting systems with a clear
                servicing contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems</strong> — commercial premises require fire alarm systems
                designed and installed to BS 5839. The system category (L1 to L5 for life
                protection, P1 to P2 for property protection) depends on the building use and risk
                assessment. Hotels and guest houses typically require Category L1 (full coverage).
                Weekly testing and quarterly servicing must be documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen extract and commercial cooking</strong> — restaurant and hotel
                kitchens require specialist electrical work including three-phase supplies for
                commercial cooking equipment, extract fan wiring, interlock systems between gas
                supply and extract ventilation, and dedicated circuits for walk-in cold rooms and
                freezers. The Shambles, Fossgate, and Micklegate areas have particularly high
                concentrations of restaurants.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building ongoing maintenance contracts with York's hospitality businesses provides stable,
          recurring revenue. A typical hotel maintenance contract covering EICR, emergency lighting
          testing, fire alarm servicing, and reactive call-outs is worth £3,000 to £8,000 per year
          depending on the property size.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Pricing Guide for York',
    content: (
      <>
        <p>
          Pricing in York sits between the national average and northern city rates. The strong
          tourism economy, university presence, and affluent suburbs (such as Bishopthorpe,
          Heslington, and Strensall) support healthy rates for quality electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Domestic Rewire (3-bed)</h4>
                <p className="text-white text-2xl font-bold">£3,500 – £6,000</p>
                <p className="text-white text-sm mt-1">Standard terraced or semi-detached</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Listed Building Rewire</h4>
                <p className="text-white text-2xl font-bold">£5,000 – £9,000</p>
                <p className="text-white text-sm mt-1">20–40% premium for heritage constraints</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Consumer Unit Upgrade</h4>
                <p className="text-white text-2xl font-bold">£450 – £750</p>
                <p className="text-white text-sm mt-1">Dual RCD or RCBO board, testing, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EICR (Domestic)</h4>
                <p className="text-white text-2xl font-bold">£180 – £300</p>
                <p className="text-white text-sm mt-1">3-bed property, full report</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EV Charger Install</h4>
                <p className="text-white text-2xl font-bold">£800 – £1,400</p>
                <p className="text-white text-sm mt-1">Supply and fit, DNO notification</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Day Rate</h4>
                <p className="text-white text-2xl font-bold">£250 – £350</p>
                <p className="text-white text-sm mt-1">Qualified electrician, York area</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          These rates are indicative for 2026 and will vary based on property access, complexity,
          and material costs. Flood-affected property work and listed building work command the
          highest premiums. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
          produce accurate, itemised quotes that reflect the true cost of specialist work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your Business in York',
    content: (
      <>
        <p>
          York is a strong market for electricians who position themselves correctly. The
          combination of heritage work, flood remediation, tourism and hospitality maintenance, and
          new-build development at York Central and Monks Cross provides diverse revenue streams.
        </p>
        <p>
          To succeed in the York market, you need to quote accurately, certify professionally, and
          build a reputation for quality work on period and listed properties. Here is how Elec-Mate
          helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs on site</SEOInternalLink>{' '}
                  for post-flood inspections, commercial periodic testing, and landlord compliance.
                  AI-assisted observation coding and instant PDF export.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size cables for rewires in York's period properties with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Factor in derating for thermal insulation in loft spaces and limited route
                  options in listed buildings.
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
                  Price heritage rewires, flood remediation, and commercial maintenance contracts
                  with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemised PDF quotes with your branding, sent from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional certification for York electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Everything you need for domestic, commercial, and heritage electrical work. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianYorkPage() {
  return (
    <GuideTemplate
      title="Electrician in York | Local Electrical Guide"
      description="Complete guide for electricians working in York. Northern Powergrid DNO, listed building electrical work, flood risk safety, tourism and hospitality electrical maintenance, and realistic York pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in York:{' '}
          <span className="text-yellow-400">Local Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="York's medieval city centre, flood-prone riverside areas, and thriving tourism sector create unique challenges and opportunities. This guide covers the DNO, listed building requirements, flood safety, commercial work, and realistic pricing for electricians in York."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work in York"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Electrical Work in York — On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Heritage work, flood remediation, or new builds — certify it all on site. 7-day free trial."
    />
  );
}
