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
  ThermometerSun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Edinburgh', href: '/guides/electrician-edinburgh' },
];

const tocItems = [
  { id: 'overview', label: 'Edinburgh Overview' },
  { id: 'regulations', label: 'Scottish Building Standards' },
  { id: 'dno', label: 'SPEN Distribution Network' },
  { id: 'listed-buildings', label: 'Listed Buildings and Conservation Areas' },
  { id: 'property-types', label: 'Edinburgh Property Types' },
  { id: 'festival-installations', label: 'Festival Temporary Installations' },
  { id: 'pricing', label: 'Electrician Rates in Edinburgh' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Scotland uses Scottish Building Standards (Technical Handbook Section 4: Safety) instead of Part P of the Building Regulations. Electrical work must comply with BS 7671 but the notification and certification route differs from England and Wales.',
  'SPEN (SP Energy Networks) is the Distribution Network Operator for Edinburgh. DNO notification for generation, EV chargers, and battery storage goes through SPEN.',
  'Edinburgh Old Town and New Town are UNESCO World Heritage Sites with strict planning and conservation rules. Listed building consent is often required for visible external electrical work including EV charger installations and external cable routes.',
  'Stone tenement rewiring is a significant part of Edinburgh electrical work. Solid stone walls require surface-mounted trunking or careful chasing, and asbestos surveys may be needed in pre-1980s properties.',
  'The Edinburgh Festival season (August) creates demand for temporary electrical installations at Fringe venues, requiring compliance with BS 7909 for temporary electrical systems in entertainment.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Edinburgh?',
    answer:
      'No. Part P of the Building Regulations applies only to England and Wales. In Scotland, electrical installations are governed by Scottish Building Standards, specifically Section 4 (Safety) of the Technical Handbook — Domestic. The electrical installation must comply with BS 7671:2018+A3:2024, and a building warrant may be required for certain types of work (new installations, rewires, consumer unit replacements). The building warrant is obtained from the City of Edinburgh Council Building Standards department before work begins. An Electrical Installation Certificate (EIC) is still required as evidence of compliance with BS 7671.',
  },
  {
    question: 'Who is the DNO for Edinburgh?',
    answer:
      'SPEN (SP Energy Networks) is the Distribution Network Operator for Edinburgh and most of Scotland south of the central belt. For new connections, increased capacity, generation connections (solar PV, battery storage), and EV charger notifications, you deal with SPEN. Their connection application process is similar to other DNOs — G98 notification for small-scale generation up to 16A per phase, G99 application for larger systems. SPEN customer service is generally responsive but processing times for G99 applications can be 6 to 12 weeks.',
  },
  {
    question: 'What are the challenges of rewiring Edinburgh tenements?',
    answer:
      'Edinburgh tenements are typically Victorian or Edwardian stone-built properties with solid walls (no cavities), lath-and-plaster ceilings, and shared common stairwells. Rewiring challenges include: the inability to run cables through solid stone walls without surface-mounted trunking or mini-trunking, the risk of disturbing asbestos in pre-1980s ceiling and floor materials, the need for an asbestos survey before any invasive work, limited access to common areas (stairwell lighting and distribution boards often serve multiple flats and require factor or owner agreement to modify), and heritage restrictions if the building is listed. Surface-mounted wiring in mini-trunking is the standard approach for tenement rewires, as chasing solid stone is impractical and destructive.',
  },
  {
    question: 'Do I need listed building consent for electrical work in Edinburgh?',
    answer:
      'Listed building consent is required for any work that affects the character of a listed building — both internally and externally. In practice, this means that any visible external electrical work (EV charger mounting, external cable routes, external lighting, security cameras) on a listed building requires consent from the City of Edinburgh Council planning department. Internal work such as rewiring is generally permitted provided it does not damage or alter significant features (ornamental plasterwork, original fittings). Edinburgh has over 4,700 listed buildings, and much of the city centre falls within conservation areas, so this is a frequent consideration for Edinburgh electricians.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Edinburgh?',
    answer:
      'The qualifications required are the same as elsewhere in the UK: City & Guilds 2365 or 2357 (or NVQ Level 3 in Electrical Installation) as the core qualification, plus BS 7671 (18th Edition Wiring Regulations) certification. To self-certify work and issue certificates, you need to be registered with a competent person scheme such as NICEIC, NAPIT, or SELECT. SELECT is Scotland specific — the trade association for the electrical, plumbing, and renewables industries in Scotland. Many Edinburgh electricians choose SELECT registration because of its strong reputation in Scotland and its understanding of Scottish Building Standards.',
  },
  {
    question: 'How much does an electrician charge in Edinburgh?',
    answer:
      'Edinburgh electrician rates in 2026 typically range from £45 to £65 per hour for a qualified, registered electrician. Day rates range from £300 to £450 for a sole trader and £400 to £550 for a firm with overheads. Emergency call-out rates are £80 to £120 per hour with a minimum charge of £120 to £180. Common fixed-price jobs: consumer unit replacement £650 to £1,100, single socket addition £120 to £180, full house rewire (3-bed tenement) £4,500 to £7,500, EICR £220 to £350. Edinburgh rates are among the highest in Scotland, reflecting the cost of living, parking costs in the city centre, and the complexity of working in period properties.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone — required for all notifiable work in Scotland.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Edinburgh rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for tenement rewires, new circuits, and long cable runs in Edinburgh properties.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Edinburgh — including listed building and conservation area considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote tenement rewires, consumer unit upgrades, and EV charger installations with accurate Edinburgh pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering inspection and testing procedures.',
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
    heading: 'Electrician in Edinburgh: What You Need to Know',
    content: (
      <>
        <p>
          Edinburgh is Scotland's capital and one of the UK's most architecturally distinctive
          cities. For electricians, working in Edinburgh means understanding Scottish Building
          Standards (not Part P), navigating conservation area and listed building restrictions,
          and dealing with a property stock that ranges from 18th-century Georgian townhouses in
          the New Town to stone tenements in Marchmont and Bruntsfield, Victorian villas in
          Morningside, and modern new-build estates in areas like Craigmillar and Granton.
        </p>
        <p>
          The city has a strong and growing demand for electrical services. The Edinburgh rental
          market requires regular EICRs, the council's net zero ambitions are driving EV charger
          and heat pump installations, and the Festival season creates seasonal demand for
          temporary electrical installations. Edinburgh electricians who understand the local
          regulations, property types, and DNO requirements can build a profitable and varied
          practice.
        </p>
        <p>
          This guide covers the regulatory framework, DNO details, property-specific challenges,
          pricing, and practical advice for electricians working in Edinburgh.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Scottish Building Standards (Not Part P)',
    content: (
      <>
        <p>
          One of the most important differences for electricians working in Scotland is that Part P
          of the Building Regulations does not apply. Scotland has its own regulatory framework:
          the{' '}
          <strong>Scottish Building Standards</strong>, administered under the Building (Scotland)
          Act 2003.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical Handbook Section 4 (Safety)</strong> — this is the Scottish
                equivalent of Part P. It requires electrical installations to comply with BS 7671
                and to be designed, installed, inspected, and tested by a competent person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building warrants</strong> — a building warrant is required for new
                electrical installations, rewires, and consumer unit replacements in Scotland. The
                warrant must be obtained from the City of Edinburgh Council Building Standards
                department before work starts. This is different from England, where competent
                person scheme members can self-certify without prior notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificates</strong> — after the work is finished, a completion
                certificate must be submitted to the council with the EIC as evidence of
                compliance. The council may inspect the work before accepting the completion
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT registration</strong> — SELECT is Scotland's trade association for
                the electrical industry. SELECT-registered contractors can use the SELECT
                Certification Services scheme to certify work, which simplifies the building
                warrant process. Many Edinburgh customers specifically look for SELECT-registered
                electricians.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical impact is that electricians moving from England to Scotland (or taking on
          Scottish work) need to understand the building warrant process. The electrical
          installation standards are the same (BS 7671), but the compliance and certification
          route is different.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SPEN: Edinburgh Distribution Network Operator',
    content: (
      <>
        <p>
          <strong>SPEN (SP Energy Networks)</strong> is the DNO for
          Edinburgh and the surrounding Lothians region. All DNO-related work in Edinburgh goes
          through SPEN:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, increased capacity
                (for example, upgrading from 60A to 100A for an EV charger or heat pump), and
                service cable upgrades are requested through the SPEN connections portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation equipment must be notified to SPEN. G98 (up to 16A per phase) is a
                simple notification. G99 (larger systems) requires prior approval and can take 6 to
                12 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Edinburgh properties are predominantly
                TN-C-S (PME) or TN-S. Older tenements may have TT earthing, particularly if the
                original lead sheath cable has been replaced. Always verify the earthing
                arrangement at the supply intake and confirm with SPEN if unclear.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Looped services in tenements</strong> — some Edinburgh tenements have
                shared or looped service cables, particularly in older buildings. This can affect
                maximum demand calculations and must be considered when adding high-power loads
                such as EV chargers or heat pumps.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SPEN's service area covers Edinburgh, the Lothians, the Scottish Borders, and the
          Highlands and Islands. Their head office is in Perth, but local operations cover the
          Edinburgh area well. Keep SPEN's emergency number (105) and connections team contact
          details readily available.
        </p>
      </>
    ),
  },
  {
    id: 'listed-buildings',
    heading: 'Listed Buildings and Conservation Areas',
    content: (
      <>
        <p>
          Edinburgh has one of the highest concentrations of listed buildings in the UK. The Old
          Town and New Town together form a UNESCO World Heritage Site, and much of the city centre
          is covered by conservation areas. This has direct implications for electrical work:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent</strong> — any work that alters the character of a
                listed building requires consent. This includes external EV charger installations,
                external cable routes, new meter boxes, security lighting, and even changes to
                existing external fittings. Internal rewiring is usually acceptable if it does not
                damage original features, but surface-mounted trunking in prominent rooms may be
                questioned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — in conservation areas, even
                unlisted buildings face restrictions on external alterations. Planning permission
                may be required for visible external electrical equipment. EV charger installations
                on front elevations are particularly scrutinised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical approach</strong> — when quoting for work on listed or
                conservation area properties, always flag the potential need for consent. Advise the
                customer to check with the City of Edinburgh Council planning department before
                committing. Factor additional time into quotes for properties where consent may be
                needed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Edinburgh World Heritage Trust can provide guidance on acceptable approaches for
          electrical work in heritage properties. Building a good working relationship with the
          council planning department is valuable for electricians who regularly work in the city
          centre.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Edinburgh Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Edinburgh's housing stock presents a range of electrical challenges. Understanding the
          common property types helps with accurate quoting and efficient installations:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Stone Tenements</h3>
            <p className="text-white text-sm leading-relaxed">
              The defining property type of Edinburgh. Typically 3 to 5 storeys, solid stone
              walls, shared stairwells, and individual flats. Rewiring requires surface-mounted
              trunking or careful routing through floor voids. Asbestos surveys are essential in
              pre-1980s properties. Consumer units are often in hallways or cupboards with limited
              space. Common stairwell lighting is a shared responsibility, usually managed by a
              property factor. Areas: Marchmont, Bruntsfield, Morningside, Leith, Stockbridge.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Georgian and Victorian Townhouses</h3>
            <p className="text-white text-sm leading-relaxed">
              The New Town and surrounding areas feature grand Georgian townhouses, many now divided
              into flats. These properties have high ceilings (3m+), ornamental plasterwork, and
              original features that must be preserved. Cable routes need careful planning to avoid
              damaging cornices and ceiling roses. Many have been converted multiple times, with
              complex existing wiring. Areas: New Town, West End, Dean Village, Stockbridge.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern New Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              Edinburgh has significant new-build development in areas like Granton Waterfront,
              Craigmillar, and South East Edinburgh. These properties are built to current
              standards with cavity walls, standard cable routes, and modern consumer units. Work
              is typically additions and modifications rather than rewires. EV charger installation
              is common in new-build estates.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HMOs and Student Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Edinburgh has a large student population (University of Edinburgh, Heriot-Watt,
              Edinburgh Napier) and a significant HMO market. HMO licensing requires regular EICRs,
              fire alarm systems to BS 5839-6, emergency lighting, and adequate socket provision.
              The City of Edinburgh Council HMO team is active in enforcement. Areas: Newington,
              Polwarth, Dalry, Gorgie.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'festival-installations',
    heading: 'Edinburgh Festival Temporary Electrical Installations',
    content: (
      <>
        <p>
          Every August, Edinburgh hosts the world's largest arts festival — the Edinburgh
          International Festival and the Edinburgh Fringe. Hundreds of temporary venues pop up
          across the city, from converted churches and warehouses to purpose-built structures in
          public spaces. Each of these venues requires temporary electrical installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7909 compliance</strong> — temporary electrical installations in
                entertainment venues must comply with BS 7909 (Code of Practice for Temporary
                Electrical Systems in Entertainment). This covers supply arrangements, distribution,
                RCD protection, cable management, earthing, and inspection regimes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator installations</strong> — many temporary venues use diesel
                generators as the primary or backup supply. Generator installations require
                appropriate earthing (often TT with an earth rod), overcurrent protection,
                and clear isolation arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council licensing</strong> — the City of Edinburgh Council requires
                electrical safety certificates for all temporary venues. Certificates must be
                submitted as part of the venue licensing application, and the council may inspect
                installations before granting the licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal opportunity</strong> — the Festival season (July setup through
                September takedown) is a significant revenue opportunity for Edinburgh electricians.
                Rates for temporary installation work are typically 20% to 30% above standard
                rates, and the work is concentrated in a short period. Building relationships with
                venue operators and production companies leads to repeat work each year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians looking to enter the Festival market should familiarise themselves with BS
          7909 and build connections with production companies and venue operators well before the
          Festival season. The work is intense, time-pressured, and well-paid.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Edinburgh (2026)',
    content: (
      <>
        <p>
          Edinburgh is one of the higher-paying areas in Scotland for electrical work, reflecting
          the cost of living, city centre parking costs, and the complexity of working in period
          properties. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£45 — £65</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£300 — £450</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£400 — £550</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£80 — £120/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£650 — £1,100</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£120 — £180</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed tenement)</span>
                  <span className="font-semibold">£4,500 — £7,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£220 — £350</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£850 — £1,400</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Tenement rewires in Edinburgh command a premium over standard house rewires due to the
          solid stone walls, access difficulties, and asbestos considerations. Always survey the
          property before quoting — a tenement rewire that looks straightforward from the outside
          can have hidden complications including shared services, lack of floor void access, and
          asbestos in unexpected locations.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh offers excellent opportunities for electricians who understand the local
          market. The combination of period properties, a thriving rental sector, new-build
          development, and seasonal Festival work creates a diverse and profitable workload.
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
                  on site with AI-assisted board scanning and voice test entry. Scottish building
                  warrant compliance requires professional documentation — deliver it from your
                  phone before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Tenement Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for long cable runs in tenement properties. Surface-mounted trunking routes in
                  tenements often result in longer cable runs than cavity-wall properties —
                  accurate voltage drop calculations prevent problems.
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
                  Price Edinburgh jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Account for the higher material costs and labour times associated with
                  tenement and period property work. Send professional PDF quotes to Edinburgh
                  customers from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Edinburgh electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the challenges of Edinburgh's property stock. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianEdinburghPage() {
  return (
    <GuideTemplate
      title="Electrician in Edinburgh | Local Electricians 2026"
      description="Find qualified electricians in Edinburgh. Scottish Building Standards, SPEN DNO, listed building work, tenement rewiring, Edinburgh Festival installations, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Edinburgh"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Edinburgh:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Edinburgh's unique property stock — from stone tenements and Georgian townhouses to UNESCO World Heritage Sites — demands electricians who understand Scottish Building Standards, SPEN connections, and heritage property challenges."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Edinburgh Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the realities of Edinburgh's tenements, listed buildings, and Scottish regulations. 7-day free trial."
    />
  );
}
