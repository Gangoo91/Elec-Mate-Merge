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
  Users,
  Building2,
  Landmark,
  Home,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Liverpool', href: '/guides/electrician-liverpool' },
];

const tocItems = [
  { id: 'overview', label: 'Liverpool Overview' },
  { id: 'dno', label: 'SP Energy Networks' },
  { id: 'regeneration', label: 'Dock Area Regeneration' },
  { id: 'conservation', label: 'Conservation Areas' },
  { id: 'property-types', label: 'Liverpool Property Types' },
  { id: 'hmos', label: 'HMOs and Student Properties' },
  { id: 'pricing', label: 'Electrician Rates in Liverpool' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SP Energy Networks (SPEN) is the Distribution Network Operator for Liverpool and Merseyside. All new connections, capacity upgrades, and generation notifications go through SPEN.',
  'Liverpool dock area and waterfront regeneration is generating significant demand for commercial and residential electrical work, from high-specification apartment fit-outs to retail and hospitality installations.',
  'Liverpool has extensive conservation areas, including the former UNESCO World Heritage Site waterfront. The Beatles Quarter (Mathew Street area) and Georgian Quarter have strict planning controls that affect visible electrical installations.',
  'The city has a large terraced housing stock, particularly in L8 (Toxteth), L15 (Wavertree), and L7 (Edge Hill). These Victorian and Edwardian terraces form the core of domestic electrical work in Liverpool — rewires, consumer unit replacements, and landlord compliance.',
  'Liverpool has two major universities (University of Liverpool and Liverpool John Moores University) driving strong HMO demand. Liverpool City Council operates mandatory and additional HMO licensing with strict electrical safety requirements.',
];

const faqs = [
  {
    question: 'Who is the DNO for Liverpool?',
    answer:
      'SP Energy Networks (SPEN) is the Distribution Network Operator for Liverpool and the wider Merseyside region. SPEN also covers North Wales, Cheshire, and parts of Greater Manchester. For new connections, capacity upgrades, generation connections (solar PV, battery storage), and EV charger notifications, you deal with SPEN. Their connection application process uses the SPEN connections portal. G98 notifications for small-scale generation (up to 16A per phase) are straightforward. G99 applications for larger systems require prior approval — processing times can be 8 to 14 weeks depending on network capacity in the area.',
  },
  {
    question: 'How much does an electrician charge in Liverpool?',
    answer:
      'Liverpool electrician rates in 2026 typically range from £38 to £55 per hour for a qualified, registered electrician. Day rates range from £260 to £380 for a sole trader and £350 to £480 for a firm. Emergency call-out rates are £70 to £100 per hour with a minimum charge of £90 to £150. Common fixed-price jobs: consumer unit replacement £550 to £950, single socket addition £100 to £160, full house rewire (3-bed terrace) £3,800 to £6,000, EICR £180 to £300, EV charger installation £750 to £1,200. Liverpool rates are lower than London, Bristol, or Edinburgh but reflect the local cost of living and strong competition among local electricians.',
  },
  {
    question: 'What HMO regulations apply in Liverpool?',
    answer:
      'Liverpool City Council operates a mandatory HMO licensing scheme for properties with 5 or more occupants from 2 or more households, plus additional licensing schemes in specific wards with high HMO concentrations (including areas around both universities). HMO licensing requires: a satisfactory EICR with no C1 or C2 codes (renewed every 5 years), fire detection to BS 5839-6 (Grade D LD2 minimum, Grade A LD2 for larger HMOs), emergency lighting on escape routes, and adequate socket provision (minimum 4 double sockets per bedroom). Liverpool City Council has been active in HMO enforcement, with a dedicated team that conducts regular inspections.',
  },
  {
    question: 'Is there demand for electrical work in the Liverpool dock area?',
    answer:
      'The Liverpool dock area regeneration is one of the largest urban regeneration projects in the UK. Liverpool Waters (a multi-billion pound development by Peel Holdings) is transforming the northern docks into a mixed-use area with residential apartments, offices, hotels, and leisure facilities. The Baltic Triangle has already been transformed from a derelict industrial area into a thriving creative and digital quarter with bars, restaurants, offices, and apartments. For electricians, this means demand for commercial fit-outs, high-specification apartment installations, smart home systems, EV charging infrastructure in new car parks, and ongoing maintenance contracts for completed developments.',
  },
  {
    question: 'Do conservation areas affect electrical work in Liverpool?',
    answer:
      'Liverpool has 36 conservation areas covering significant portions of the city centre, waterfront, and inner suburbs. The most relevant for electricians are: the Castle Street/Dale Street area (commercial buildings with heritage restrictions), the Ropewalks area (warehouse conversions), the Georgian Quarter around Canning Street and Falkner Square (Georgian townhouses with strict controls), and the Mathew Street area (Beatles Quarter). In conservation areas, external electrical work — EV charger installations, external cable routes, security lighting, meter box replacements — may require planning permission. Listed building consent is always required for work affecting the character of a listed building. The number of listed buildings in Liverpool city centre means this is a frequent consideration.',
  },
  {
    question: 'What qualifications do I need for electrical work in Liverpool?',
    answer:
      'Liverpool is in England, so Part P of the Building Regulations applies. The standard qualifications are: City and Guilds 2365 or 2357 (or NVQ Level 3 in Electrical Installation) as the core qualification, BS 7671 18th Edition Wiring Regulations certification, and registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or Stroma) to self-certify notifiable work. For the Liverpool HMO market, C&G 2391 (Inspection and Testing) is particularly valuable as it qualifies you to carry out EICRs. For fire alarm work in HMOs, qualifications in fire detection and alarm system design and installation (such as FIA Unit 1 and 2) are recommended.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for Liverpool domestic and commercial work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Liverpool rental properties, HMO licensing compliance, and landlord certification.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for terraced house rewires, commercial fit-outs, and EV charger installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Liverpool — terraced property challenges and SPEN DNO notifications.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and commercial fit-outs with accurate Liverpool pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — essential for the Liverpool HMO and landlord certification market.',
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
    heading: 'Electrician in Liverpool: What You Need to Know',
    content: (
      <>
        <p>
          Liverpool is a city of contrasts for electricians. The historic waterfront, dock
          regeneration, and city centre commercial developments offer high-value commercial and
          residential electrical work. Meanwhile, the extensive terraced housing stock in inner
          suburbs provides a steady stream of domestic rewires, consumer unit upgrades, and landlord
          compliance work.
        </p>
        <p>
          The city has two major universities driving a significant HMO market, 36 conservation
          areas requiring sensitive electrical work, and one of the UK's most ambitious regeneration
          programmes transforming the dock area. Liverpool electricians who can work across this
          range — from a terraced house rewire in Wavertree to a commercial fit-out in the Baltic
          Triangle — have excellent earning potential.
        </p>
        <p>
          This guide covers the DNO details, regeneration opportunities, conservation area
          considerations, property-specific challenges, HMO requirements, pricing, and practical
          advice for electricians working in Liverpool.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SP Energy Networks: Liverpool DNO',
    content: (
      <>
        <p>
          <strong>SP Energy Networks (SPEN)</strong> is the DNO for Liverpool and the wider
          Merseyside region. SPEN is part of the Scottish Power group and covers Merseyside,
          Cheshire, North Wales, and parts of Greater Manchester.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, capacity upgrades
                (single-phase to three-phase, 60A to 100A for EV chargers or heat pumps), and
                service cable replacements go through the SPEN connections portal. Standard domestic
                upgrades typically take 6 to 10 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation equipment must be notified to SPEN. G98 (up to 16A per phase) is a
                notification — submit and proceed. G99 for larger systems requires prior approval
                and can take 8 to 14 weeks. Network capacity constraints in some areas of Liverpool
                can delay G99 approvals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Liverpool properties are predominantly
                TN-C-S (PME) in newer areas and TN-S in older areas. Victorian terraces may have TT
                earthing or rely on lead water pipes. Always verify the earthing arrangement —
                Liverpool Water has replaced many lead water pipes in recent years, potentially
                removing the earth electrode in TT/water pipe installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cut-out access</strong> — SPEN cut-outs in Liverpool are standard design.
                For consumer unit replacements, you need to work with SPEN if the main fuse needs
                replacing or the tails need upgrading. SPEN offer a pre-arranged disconnection
                service — book at least 5 working days in advance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regeneration',
    heading: 'Liverpool Dock Area Regeneration',
    content: (
      <>
        <p>
          Liverpool's waterfront and dock area regeneration is one of the largest in Europe, and it
          creates significant electrical work opportunities. The key developments:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Liverpool Waters</h3>
            <p className="text-white text-sm leading-relaxed">
              A 60-hectare, multi-billion pound development by Peel Holdings transforming the
              Central and Northern Docks into a mixed-use neighbourhood. Residential towers, Grade A
              offices, hotels, cruise terminal, and public spaces. Electrical work ranges from
              large-scale commercial installations to high-specification apartment fit-outs. Ongoing
              for 20+ years with continuous opportunities.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Baltic Triangle</h3>
            <p className="text-white text-sm leading-relaxed">
              Already transformed from derelict warehouses to a thriving creative quarter.
              Electrical work includes warehouse conversions to apartments and offices, bar and
              restaurant fit-outs, co-working spaces, and event venues. The mix of heritage
              buildings and new-build creates varied work. The area continues to expand with new
              residential and commercial developments.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Knowledge Quarter</h3>
            <p className="text-white text-sm leading-relaxed">
              The area around Paddington Village, the Royal Liverpool University Hospital, and the
              University of Liverpool is undergoing major development. Science and technology
              buildings, student accommodation, and healthcare facilities. Electrical work is
              predominantly commercial — three-phase installations, data cabling, emergency systems,
              and specialist healthcare electrical requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Residential Conversions</h3>
            <p className="text-white text-sm leading-relaxed">
              Across the city centre, former commercial buildings — offices, warehouses, churches —
              are being converted to residential use. These conversions require full electrical
              installations in new apartment configurations within existing building shells. The
              work combines commercial-scale distribution (three-phase risers, sub-mains) with
              domestic apartment fit-outs.
            </p>
          </div>
        </div>
        <p>
          For electricians looking to move into commercial work, Liverpool's regeneration projects
          offer an entry point. Start with smaller commercial fit-outs in the Baltic Triangle and
          build relationships with developers and main contractors working on larger projects.
        </p>
      </>
    ),
  },
  {
    id: 'conservation',
    heading: 'Conservation Areas and Heritage Work',
    content: (
      <>
        <p>
          Liverpool has 36 conservation areas and a significant number of listed buildings,
          particularly in the city centre. The waterfront was a UNESCO World Heritage Site until
          2021, and heritage considerations remain important. Key areas for electricians:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Georgian Quarter</strong> — the Canning Street, Falkner Square, and Hope
                Street area contains some of the finest Georgian townhouses outside London. Many are
                listed (Grade I and II). Electrical work requires listed building consent for any
                external alterations and careful internal routing to avoid damaging original
                plasterwork, joinery, and decorative features.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Beatles Quarter (Mathew Street)</strong> — the area around Mathew Street and
                the Cavern Quarter is a conservation area with significant tourism importance.
                External electrical work on commercial premises (signage, lighting, security) may
                require planning permission. The council is protective of the area's character.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ropewalks</strong> — the area around Bold Street and Seel Street is a
                conservation area with a mix of Georgian, Victorian, and Edwardian commercial
                buildings. Many are being converted to residential and mixed-use. Electrical work in
                these conversions must respect the building fabric while meeting current standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical impact</strong> — when quoting for work in conservation areas or
                on listed buildings, always advise the customer to check whether consent is needed.
                Factor additional time into quotes for heritage work. Build relationships with the
                Liverpool City Council conservation team — they can advise on acceptable approaches
                before you commit to a cable route or equipment location.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Liverpool Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Liverpool's housing stock is dominated by terraced houses, which form the core of domestic
          electrical work in the city. Understanding the common property types:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The dominant housing type across L8 (Toxteth), L15 (Wavertree), L7 (Edge Hill), L6
              (Everton/Tuebrook), and L4 (Walton/Anfield). Solid brick walls, suspended timber
              floors, lath-and-plaster ceilings. Many have original rubber or lead-sheathed wiring
              that is well beyond its useful life. Full rewires are common and straightforward in
              terraces — typical 3-bed rewire: £3,800 to £6,000. These properties are the
              bread-and-butter of Liverpool domestic electrical work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Georgian Townhouses</h3>
            <p className="text-white text-sm leading-relaxed">
              Found in the Georgian Quarter and parts of the city centre. Grand proportions, high
              ceilings, ornamental plasterwork, and period features. Many divided into flats.
              Rewiring requires sensitive cable routing — surface-mounted mini-trunking is sometimes
              necessary to avoid damaging original features. Listed building consent may be
              required. Premium pricing: £5,000 to £9,000 for a large townhouse flat.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Post-War Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Semi-detached houses in areas like Childwall, West Derby, Allerton, and Woolton.
              Cavity brick walls, timber or concrete suspended floors. Wiring from the 1930s to
              1960s often includes rubber-insulated cables, round-pin sockets, and consumer units
              with rewirable fuses. These properties are due for full rewires or significant
              upgrades.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              New developments in areas like Norris Green, Stonebridge Cross, and the dock area.
              Built to current standards with modern consumer units and structured cabling. Work is
              typically additions and modifications — EV charger installations, garden room
              supplies, smart home systems, and snagging list items on new builds.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'HMOs and Student Properties in Liverpool',
    content: (
      <>
        <p>
          Liverpool has two major universities — the University of Liverpool and Liverpool John
          Moores University (LJMU) — with a combined student population of over 55,000. This,
          combined with a significant private rental sector, drives a large HMO market concentrated
          in L3 (city centre), L6 (Kensington), L7 (Edge Hill), L8 (Toxteth), and L15 (Wavertree).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory and additional licensing</strong> — Liverpool City Council
                operates mandatory HMO licensing for properties with 5+ occupants from 2+
                households, plus additional licensing in designated areas. The council's Landlord
                Licensing scheme (a broader selective licensing scheme) also requires electrical
                safety compliance for all rental properties in licensed areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirements</strong> — a satisfactory{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is required
                for HMO licensing and for the broader selective licensing scheme. No C1 or C2
                observations. Renewed every 5 years. With thousands of licensed properties in
                Liverpool, EICR work alone represents a significant market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection and emergency lighting</strong> — HMOs require fire detection
                to BS 5839-6 (Grade D LD2 minimum) and emergency lighting on escape routes.
                Liverpool City Council enforcement team conducts regular inspections and issues
                improvement notices for non-compliant properties. Fire alarm installation and annual
                testing is reliable, recurring work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket provision</strong> — Liverpool Council requires adequate socket
                provision in HMO bedrooms to reduce the use of multi-way adaptors. The typical
                standard is a minimum of 4 double sockets per bedroom. Adding sockets to existing
                circuits (or new radial circuits for bedrooms) is frequent work in HMO upgrades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Liverpool landlord and letting agent community is well-established. Building
          relationships with agents such as those on Smithdown Road, Lodge Lane, and in the city
          centre creates a pipeline of EICR, fire alarm, and remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Liverpool (2026)',
    content: (
      <>
        <p>
          Liverpool electrician rates are competitive, reflecting the local cost of living and a
          healthy supply of qualified electricians. Typical rates in 2026:
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
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£350 — £480</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£70 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£100 — £160</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£3,800 — £6,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£180 — £300</span>
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
          Commercial rates in the dock area and city centre developments are higher — day rates of
          £400 to £550 are typical for commercial fit-out work. Georgian Quarter heritage work also
          commands a premium. Volume EICR work for landlords can be priced competitively (£150 to
          £200 per unit) if you are servicing a portfolio and can batch inspections efficiently.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Liverpool',
    content: (
      <>
        <p>
          Liverpool offers a broad range of electrical work, from high-volume domestic rewires and
          landlord compliance to prestigious commercial fit-outs in the regeneration areas.
          Electricians who can service both the domestic and commercial markets have the strongest
          earning potential.
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
                  site with AI-assisted board scanning. The Liverpool HMO and landlord market
                  demands fast, professional certification — deliver EICRs from your phone and email
                  to the landlord before you leave.
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
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for terraced house rewires, commercial fit-outs, and sub-main calculations in
                  apartment conversions. Get the cable size right on the survey and include it in
                  your quote.
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
                  Price Liverpool jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . From a standard terraced house rewire to a Baltic Triangle commercial fit-out,
                  itemise materials, labour, testing, and certification. Professional PDF quotes
                  give you the edge in a competitive Liverpool market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Liverpool electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Liverpool's terraced houses, HMO market, and regeneration projects. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianLiverpoolPage() {
  return (
    <GuideTemplate
      title="Electrician in Liverpool | Qualified Electricians 2026"
      description="Find qualified electricians in Liverpool. SP Energy Networks DNO, dock area regeneration, conservation areas, terraced house rewiring, HMO compliance, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Liverpool"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Liverpool:{' '}
          <span className="text-yellow-400">Qualified Electricians 2026</span>
        </>
      }
      heroSubtitle="From Victorian terraces in Wavertree to Baltic Triangle commercial fit-outs and Liverpool Waters regeneration — Liverpool offers diverse electrical work with strong demand across domestic, commercial, and heritage sectors."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Liverpool Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Liverpool's terraced housing, HMO market, and dock area regeneration. 7-day free trial."
    />
  );
}
