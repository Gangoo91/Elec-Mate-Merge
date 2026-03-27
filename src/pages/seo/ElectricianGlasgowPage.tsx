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
  Snowflake,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-glasgow' },
  { label: 'Glasgow', href: '/guides/electrician-glasgow' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Glasgow' },
  { id: 'scottish-regulations', label: 'Scottish Building Standards (Not Part P)' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Glasgow' },
  { id: 'property-types', label: 'Glasgow Property Types' },
  { id: 'dno-spen', label: 'SPEN and the Scottish Grid' },
  { id: 'select-trade-body', label: 'SELECT: Scotland\'s Electrical Trade Body' },
  { id: 'for-electricians', label: 'For Electricians in Glasgow' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Scotland has DIFFERENT building regulations from England and Wales. Part P does NOT apply in Scotland. Instead, electrical work is covered by the Scottish Building Standards (Section 4: Safety), and all electrical installation work must comply with BS 7671 and be certified.',
  'SELECT is Scotland\'s trade body for electrical contractors — equivalent to NICEIC/NAPIT in England. While NICEIC and NAPIT also operate in Scotland, SELECT is the predominant body and many Scottish customers specifically look for SELECT-registered electricians.',
  'SP Energy Networks (SPEN, part of ScottishPower) is the Distribution Network Operator for Glasgow and the west of Scotland. All new connections, supply upgrades, and generation notifications go through SPEN.',
  'Glasgow has a distinctive property stock dominated by sandstone tenements (typically 4-storey blocks built between 1870 and 1920), which present unique rewiring challenges due to thick stone walls, shared closes, and lath-and-plaster ceilings.',
  'Scottish landlord electrical safety requirements differ from England — the Repairing Standard (Housing (Scotland) Act 2006) requires a valid EICR for all rented properties, with inspections at least every 5 years.',
];

const faqs = [
  {
    question: 'Does Part P apply to electrical work in Glasgow?',
    answer:
      'No. Part P of the Building Regulations applies in England and Wales only. Scotland has its own building regulations under the Building (Scotland) Act 2003, enforced by local authority building standards departments (not building control, which is the English/Welsh term). In Scotland, electrical work must comply with BS 7671 (the IET Wiring Regulations), and the Scottish Building Standards require that electrical installations are designed, installed, inspected, and tested by competent persons. While there is no direct equivalent of the Part P competent person self-certification scheme in Scotland, electricians who are members of SELECT, NICEIC, or NAPIT can certify their work against BS 7671. For building warrant applications (the Scottish equivalent of building regulations approval), the local authority will accept certification from a registered electrician.',
  },
  {
    question: 'How much does an electrician charge in Glasgow?',
    answer:
      'Glasgow electrician day rates typically range from £200 to £320 per day for a qualified electrician. Hourly rates are usually £30 to £50 per hour, with emergency call-outs at £55 to £90 per hour. Specific job costs in Glasgow: a full rewire of a 2-bed tenement flat costs £3,500 to £6,000 (tenement flats are more complex than they appear due to high ceilings, thick stone walls, and lath-and-plaster), a consumer unit replacement is £400 to £650, an EICR is £140 to £250, and an EV charger installation is £600 to £1,100. Glasgow prices are comparable to Leeds and slightly below Manchester, reflecting the Scottish market.',
  },
  {
    question: 'What is SELECT and why does it matter?',
    answer:
      'SELECT is the trade association for the electrical contracting industry in Scotland. Founded in 1900, it is the Scottish equivalent of the ECA (Electrical Contractors Association) in England and has a unique role in the Scottish electrical industry. SELECT members undergo regular assessment of their work, must carry appropriate insurance, and adhere to a code of practice. While NICEIC and NAPIT also operate in Scotland, SELECT is the most recognised body among Scottish customers and is the preferred certification route for many Scottish local authorities. If you are looking for an electrician in Glasgow, checking for SELECT membership is the Scottish equivalent of checking for NICEIC or NAPIT registration in England.',
  },
  {
    question: 'Who is the DNO for Glasgow?',
    answer:
      'SP Energy Networks (SPEN, part of ScottishPower) is the Distribution Network Operator for Glasgow and the west of Scotland. SPEN owns and maintains the electricity network from high-voltage substations to the service cable entering your property. Contact SPEN for new connections, supply upgrades, meter relocations, and reporting power cuts (call 105 or visit spenergynetworks.co.uk). Your electrician submits G98/G99 notifications to SPEN when installing solar PV, battery storage, or EV chargers. SSEN (Scottish and Southern Electricity Networks) covers the north of Scotland (Highlands, Islands, Aberdeenshire) — Glasgow is firmly within the SPEN distribution area.',
  },
  {
    question: 'Do Glasgow landlords need an EICR?',
    answer:
      'Yes, but under different legislation than in England. In Scotland, the Repairing Standard (part of the Housing (Scotland) Act 2006, as amended) requires landlords to ensure the electrical installation is in a reasonable state of repair and in proper working order. Since December 2015, the Scottish Government has required landlords to have an Electrical Installation Condition Report (EICR) carried out at least every 5 years. The EICR must show the installation is satisfactory or identify any deficiencies. Landlords must provide a copy to tenants before the start of the tenancy. Glasgow City Council environmental health officers can request sight of the EICR and take enforcement action against landlords who fail to comply.',
  },
  {
    question: 'How long does a Glasgow tenement rewire take?',
    answer:
      'A full rewire of a typical 2-bedroom Glasgow tenement flat takes 5 to 8 working days with a team of two electricians. Glasgow tenements present specific challenges: the sandstone external walls are extremely thick (600mm or more) and cannot be chased, so cables must be routed through the internal walls (which are typically lath-and-plaster on timber studs), through floor voids, or surface-mounted in trunking. High ceilings (3 metres or more) require tower access or scaffolding. Many tenements have shared closes (communal stairwells) where the electrical supply enters, and work affecting the shared supply requires coordination with neighbours and potentially the factor (property manager). Lath-and-plaster ceilings are fragile and can collapse during cable pulling if not handled carefully.',
  },
  {
    question: 'Are there cold climate considerations for electrical work in Glasgow?',
    answer:
      'Yes. Glasgow has a maritime climate with cold, wet winters (average winter temperatures of 1 to 5 degrees Celsius) and significant rainfall. This affects electrical installations in several ways: external installations (EV chargers, garden lighting, security systems) must have appropriate IP ratings for the wetter climate, cable runs through unheated spaces (loft conversions, external walls) should account for condensation risk, outdoor junction boxes and connection points need to be weatherproof, and heat pump installations (increasingly common) must account for lower ambient temperatures affecting COP (coefficient of performance). Electricians working in Glasgow should be familiar with the specific requirements for installations in exposed locations and cold climates.',
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
    description: 'Full guide to consumer unit upgrades including compliance and certification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Part P applies in England and Wales — see how it compares to Scottish standards.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'NICEIC operates in Scotland alongside SELECT — understand the options.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for domestic and commercial installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes with accurate pricing for Glasgow customers.',
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
    heading: 'Finding a Qualified Electrician in Glasgow',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city, with over 300,000 households and a wider Greater
          Glasgow area of over 600,000 homes. The electrical contracting market serves a distinctive
          property stock — from sandstone tenements built in the Victorian era to modern riverside
          apartments along the Clyde — and operates under Scottish building regulations, which
          differ significantly from England and Wales.
        </p>
        <p>
          The most important thing to understand about electrical work in Glasgow is that{' '}
          <strong>Scotland has its own building regulations</strong>. Part P of the Building
          Regulations does not apply north of the border. Instead, the Building (Scotland) Act 2003
          and the Scottish Building Standards govern electrical installation work. This has
          practical implications for how work is certified, notified, and inspected.
        </p>
        <p>
          In Scotland, the primary trade body for electrical contractors is SELECT, which has been
          representing Scottish electricians since 1900. While{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink> and NAPIT
          also operate in Scotland, SELECT membership is the most recognised mark of quality among
          Scottish customers and is preferred by many Scottish local authorities for building
          warrant applications.
        </p>
      </>
    ),
  },
  {
    id: 'scottish-regulations',
    heading: 'Scottish Building Standards: Not Part P',
    content: (
      <>
        <p>
          This is the single most important difference between hiring an electrician in Glasgow
          versus anywhere in England or Wales.{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          does not apply in Scotland. The regulatory framework is different:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building (Scotland) Act 2003</strong> — this is the primary legislation
                governing building work in Scotland, including electrical installation work. The
                Scottish Building Standards (Technical Handbooks) set out the requirements.
                Section 4 (Safety) covers electrical installations and requires compliance with
                BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building warrants</strong> — in Scotland, a building warrant (equivalent to
                building regulations approval in England) is required for certain types of
                electrical work, including new installations, rewires, and significant alterations.
                Your electrician or architect applies to Glasgow City Council building standards
                department for the warrant before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificates</strong> — after work is complete, a completion
                certificate is submitted to the local authority. The authority may inspect the work
                before accepting the certificate. This is different from the Part P self-
                certification model in England where registered electricians notify and certify
                simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>No competent person scheme equivalent</strong> — Scotland does not have a
                direct equivalent of the England/Wales competent person self-certification scheme.
                Instead, membership of SELECT, NICEIC, or NAPIT demonstrates competence, and the
                local authority building standards department assesses compliance based on the
                electrician's certification and, where appropriate, site inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, the outcome is similar — electrical work must comply with BS 7671, must be
          tested and certificated, and must be notified to the local authority. But the process and
          terminology differ, and electricians moving between Scotland and England need to
          understand both systems.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'How to Verify an Electrician\'s Qualifications in Scotland',
    content: (
      <>
        <p>
          The verification process in Scotland is broadly similar to England, with one key
          difference — SELECT membership is the primary mark of quality:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT membership</strong> — check the SELECT website (select.org.uk) to
                verify membership. SELECT members are assessed regularly, must carry appropriate
                insurance, and comply with a code of practice. SELECT also offers a consumer
                protection guarantee for work carried out by its members.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — these England-based schemes also
                operate in Scotland. If your Glasgow electrician is NICEIC or NAPIT registered
                rather than SELECT, this is still a valid mark of competence. Verify on the
                respective websites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SJIB (Scottish Joint Industry Board) card</strong> — the Scottish equivalent
                of the ECS card. A SJIB Electrician card (blue) or Installation Electrician card
                confirms the holder's qualifications. The SJIB grading card system is well
                established in Scotland and widely recognised by Scottish employers and customers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £1 million cover, ideally
                £2 million. Tenement properties (where damage to one flat can affect neighbouring
                flats) make adequate insurance cover particularly important in Glasgow.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Glasgow (2026 Prices)',
    content: (
      <>
        <p>
          Glasgow electrical prices are broadly comparable to Leeds and other northern English
          cities — lower than London and the South East, but competitive for skilled work. Here
          are realistic 2026 prices for common domestic electrical work in Glasgow:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (2-bed tenement flat)</strong> — £3,500 to £6,000 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and
                certification. Tenement flats with high ceilings, thick sandstone external walls,
                and lath-and-plaster are more complex (and therefore more expensive) than they
                appear from the outside.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed semi-detached)</strong> — £4,000 to £6,500 including
                all circuits, consumer unit, testing, and certification. Post-war semis in areas
                like Knightswood, Cardonald, and Clarkston are more straightforward than tenements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £400 to £650 including isolation,
                new compliant unit, testing, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £140 to £250 depending on property size and age. Older
                tenement flats with original or partially updated wiring take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £600 to £1,100 for a 7kW home charger.
                Properties with driveways (typically suburban Glasgow) are straightforward.
                Tenement properties without off-street parking present challenges.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £90 to £160 for the first hour including
                travel, plus £35 to £55 per additional hour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices vary across Glasgow. The West End (Hillhead, Partick, Hyndland) and the Southside
          (Shawlands, Pollokshields) tend to be at the higher end. East Glasgow (Dennistoun,
          Bridgeton, Parkhead) and outer areas are at the lower end. Always get three written quotes.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Glasgow Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Glasgow's property stock is dominated by one building type that is relatively rare
          elsewhere in the UK — the sandstone tenement. Understanding tenement construction is
          essential for any electrician working in Glasgow.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sandstone Tenements</h3>
            <p className="text-white text-sm leading-relaxed">
              Glasgow's defining building type — typically 3 to 4 storey sandstone blocks with 2 to
              3 flats per landing, accessed from a shared close (communal stairwell). Built between
              1870 and 1920, they have thick sandstone external walls (600mm or more) that cannot be
              chased, internal walls of lath-and-plaster on timber studs, high ceilings (3 metres
              or more), and original timber floors with useful void space for cable routing. The
              electricity supply typically enters through the close and is metered in a shared
              cupboard. Rewiring requires creative cable routing — primarily through the lath-and-
              plaster internal walls, floor voids, and surface trunking where concealment is not
              possible.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Council Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Large areas of Glasgow were rebuilt with council housing in the 1950s to 1970s —
              tower blocks (Sighthill, Red Road, the Gorbals), four-in-a-block cottages, and
              terraced houses. Many have been transferred to housing associations and refurbished,
              but some retain original wiring. These properties typically have concrete construction
              (in tower blocks) or non-traditional construction methods that affect cable routing.
              Asbestos is commonly found in meter cupboards, ceiling tiles, and around heating
              systems in this era — an asbestos survey before electrical work is essential.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">West End and Southside Conversions</h3>
            <p className="text-white text-sm leading-relaxed">
              Many larger Glasgow tenement flats — particularly in the West End (Hillhead, Dowanhill,
              Hyndland) and the Southside (Shawlands, Pollokshields, Queens Park) — have been
              subdivided or reconfigured over the years. This creates complex electrical layouts
              where circuits may not follow logical room boundaries, shared risers serve multiple
              properties, and previous electrical work may not be documented. A thorough initial
              survey (ideally an EICR) before any additional work is strongly recommended.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build apartments and houses along the Clyde waterfront (Pacific Quay, Finnieston),
              in the Merchant City, and in suburban areas (Newton Mearns, East Kilbride, Bishopbriggs)
              have modern compliant installations. Electrical work in these properties is typically
              additions and upgrades — EV chargers, home offices, garden electrics, and smart home
              systems.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-spen',
    heading: 'SPEN and the Scottish Electricity Grid',
    content: (
      <>
        <p>
          SP Energy Networks (SPEN, part of ScottishPower) is the Distribution Network
          Operator for Glasgow and the west and central belt of Scotland. SSEN (Scottish and
          Southern Electricity Networks) covers the north of Scotland — the Highlands, Islands,
          and Aberdeenshire. Glasgow is firmly within the SPEN distribution area.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your DNO is SPEN</strong> — SP Energy Networks (part of ScottishPower) is
                the DNO for Glasgow. Contact SPEN for new connections, supply upgrades, and fault
                reporting. You can verify your DNO using the Energy Networks Association postcode
                checker at energynetworks.org.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — apply through your DNO's website. Glasgow lead
                times are typically 4 to 8 weeks for standard domestic connections. Three-phase
                upgrades (for heat pumps, large EV chargers) may take longer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — required for solar PV, battery storage, and
                generation equipment. Submit to SPEN. G98 covers systems up to
                16A per phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement shared supplies</strong> — in older Glasgow tenements, the
                electricity supply arrangement can be complex. The main supply enters through the
                close and is distributed to individual flats from a shared meter cupboard. Work
                affecting the shared infrastructure requires coordination with the factor (property
                manager) and potentially all flat owners.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'select-trade-body',
    heading: 'SELECT: Scotland\'s Electrical Trade Body',
    content: (
      <>
        <p>
          SELECT (The Scottish Electrical Contractors' Association) is the trade body for the
          electrical contracting industry in Scotland. Established in 1900, SELECT plays a central
          role in the Scottish electrical industry that has no direct equivalent in England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What SELECT membership means</strong> — SELECT members must demonstrate
                technical competence, carry appropriate insurance, use qualified electricians
                (SJIB grading), and comply with SELECT's code of practice. Members' work is
                regularly assessed through site inspections. SELECT offers a consumer guarantee
                scheme that protects customers if a member firm ceases trading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finding a SELECT member</strong> — use the online search tool at
                select.org.uk to find registered electrical contractors in the Glasgow area. You
                can search by postcode and type of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT vs NICEIC/NAPIT in Scotland</strong> — all three bodies operate in
                Scotland and all provide valid quality assurance. However, SELECT has the strongest
                brand recognition in Scotland and is preferred by many Scottish local authorities
                and customers. If you are specifically looking for a Glasgow-based electrician,
                SELECT membership is the primary marker to check.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians from England working in Scotland (or vice versa), it is important to
          understand the different regulatory frameworks. SELECT provides guidance on working across
          the border, and many larger firms hold both SELECT and NICEIC/NAPIT registrations to
          cover work in both jurisdictions.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The Glasgow Market',
    content: (
      <>
        <p>
          Glasgow is the largest electrical market in Scotland, with strong demand across domestic,
          commercial, and industrial sectors. The city's distinctive tenement stock creates
          specialist skills requirements that not all electricians possess, and those with
          tenement experience command a premium.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Key Opportunities</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tenement rewiring is specialist work with steady demand — many Glasgow tenements
                  are being upgraded as the property market strengthens. Landlord compliance (EICRs,
                  fire detection) is a large market given Glasgow's high proportion of private
                  rented accommodation. Heat pump installations are growing as Scotland pushes
                  ahead with net-zero targets. Commercial work in the city centre and along the
                  Clyde waterfront is strong.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Snowflake className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cold Climate Expertise</h4>
                <p className="text-white text-sm leading-relaxed">
                  Glasgow's climate creates specific requirements for external installations,
                  heat pump systems, and insulation. Electricians with expertise in heat pump
                  electrical connections, underfloor heating controls, and weatherproof external
                  installations have a growing niche in the Glasgow market as energy efficiency
                  retrofitting accelerates under Scottish Government programmes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Glasgow letting agents and factors manage large portfolios of tenement flats.
                  They need certificates quickly and in digital format. Complete your{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> on your
                  phone, send the PDF on the day, and build a reputation for fast, professional
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Glasgow electrical business"
          description="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Complete EICRs and EICs on site, send instant PDFs to Glasgow factors and letting agents. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianGlasgowPage() {
  return (
    <GuideTemplate
      title="Electrician in Glasgow | Qualified Electricians 2026"
      description="Find qualified, registered electricians in Glasgow. Scottish Building Standards (not Part P), SELECT trade body, SPEN connections, tenement rewiring, Glasgow pricing guide, and Scotland-specific electrical regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Glasgow:{' '}
          <span className="text-yellow-400">Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Glasgow, with critical information about Scottish building regulations (Part P does NOT apply in Scotland), SELECT membership, SPEN connections, tenement rewiring challenges, and realistic local pricing."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site and send instant PDFs to Glasgow factors and letting agents. 7-day free trial."
    />
  );
}
