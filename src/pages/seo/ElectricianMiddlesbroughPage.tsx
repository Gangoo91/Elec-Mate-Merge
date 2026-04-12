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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Middlesbrough', href: '/electricians/middlesbrough' },
];

const tocItems = [
  { id: 'overview', label: 'Middlesbrough Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'Northern Powergrid DNO' },
  { id: 'property-types', label: 'Middlesbrough Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Middlesbrough' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Middlesbrough is in England — Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA registration allows self-certification without prior notification to Middlesbrough Council Building Control.',
  'Northern Powergrid is the Distribution Network Operator for Middlesbrough and the wider Tees Valley. G98/G99 notifications for solar PV and battery storage, and all new connection applications, go through Northern Powergrid. The 105 number covers power cut reporting across the area.',
  'Middlesbrough has three distinct housing eras: Victorian and Edwardian terraces in central areas such as Linthorpe and Newport; 1960s–1970s council estates across Berwick Hills, Park End, Pallister, and Ormesby (many now privately owned, often with original rewirable fuse boards); and newer private estates in Coulby Newham, Nunthorpe, and Hemlington built from the 1980s onwards.',
  'The South Tees Development Corporation — covering the former SSI steelworks site at Redcar, one of the largest industrial regeneration projects in the UK — is generating substantial electrical infrastructure work through 2025–2030. Industrial corridor employers including SABIC, Huntsman, and Nufarm on the Teesside chemical complex, plus PD Ports/Teesport, also create consistent commercial and industrial demand.',
  'Middlesbrough College is the primary apprentice training provider for the Tees Valley, offering the Level 3 Electrical Installation apprenticeship. Apprentices gain site experience across Teesside before qualifying into a market with strong EICR and consumer unit upgrade demand driven by the large private rented sector and ageing housing stock.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Middlesbrough?',
    answer:
      'Yes. Middlesbrough is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and the scheme notifies Middlesbrough Council Building Control automatically. Unregistered electricians must notify Middlesbrough Council Building Control before starting notifiable work and pay an inspection fee. This applies whether you are working in a Victorian terrace in Linthorpe, a 1970s semi in Acklam, or a new-build in Coulby Newham.',
  },
  {
    question: 'Who is the DNO for Middlesbrough?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Middlesbrough, Teesside, and the wider North East and Yorkshire region. All connection applications, G98 notifications for solar PV and battery storage systems up to 16A per phase, and capacity upgrade requests go through Northern Powergrid. The emergency number for power cuts anywhere in the Tees Valley is 105. Electricians working on the South Tees Development Corporation site or on the Teesside industrial corridor should note that some large industrial connections involve separate Northern Powergrid industrial connections teams.',
  },
  {
    question: 'How much does an electrician cost in Middlesbrough?',
    answer:
      'Middlesbrough electrician rates in 2026 sit at the lower end of the North East range, reflecting local labour market conditions. Typical rates: hourly rate £34 to £48 for a qualified, registered electrician; day rate £230 to £330. Common fixed-price jobs: consumer unit replacement £480 to £820, full rewire (3-bed semi) £3,000 to £4,800, EICR (3-bed house) £145 to £235, EV charger installation £660 to £1,000. Rates for specialist industrial electrical work — including CompEx-qualified electricians for SABIC or Huntsman sites on the Teesside chemical corridor — are significantly higher.',
  },
  {
    question: 'What are the most common electrical jobs in Middlesbrough?',
    answer:
      "Consumer unit replacements are the single most common job, driven by the large stock of 1960s and 1970s council-built properties in Berwick Hills, Park End, Pallister, and Ormesby — many now privately owned but still fitted with the original rewirable fuse boards. Full house rewires on pre-1970s Victorian and Edwardian terraces in Linthorpe, Newport, and Gresham are also very common. Rental property EICRs generate consistent year-round income given Middlesbrough's large private rented sector. EV charger installations are growing in the newer private estates of Coulby Newham, Nunthorpe, and Hemlington. Commercial and industrial work is increasingly available through the South Tees Development Corporation regeneration zone.",
  },
  {
    question: 'What qualifications do electricians in Middlesbrough need?',
    answer:
      'City & Guilds 2365 (or NVQ Level 3 in Electrical Installation), the 18th Edition BS 7671 certificate, and competent person scheme registration (NICEIC, NAPIT, or ELECSA). The City & Guilds 2391 qualification is required to carry out and issue EICRs. Middlesbrough College is the main training provider for the Level 3 Electrical Installation apprenticeship in the Tees Valley. Electricians targeting industrial work on the Teesside chemical corridor — sites operated by SABIC, Huntsman, or Nufarm — will benefit from CompEx certification for working in potentially explosive atmospheres. Teesside University also offers higher-level electrical engineering pathways for those moving into design and project management roles.',
  },
  {
    question: 'How often do rental properties in Middlesbrough need an EICR?',
    answer:
      'Every five years, or at the start of each new tenancy, under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Middlesbrough has a significant private rented sector, concentrated particularly in the terraced streets of Linthorpe, Newport, and Gresham, and in the former council estates of Berwick Hills, Park End, and Ormesby. Landlords must provide tenants with a copy of the EICR. C1 and C2 items must be remediated within 28 days and evidence provided to the tenant and, on request, to Middlesbrough Council.',
  },
  {
    question: 'Are there asbestos risks in Middlesbrough properties?',
    answer:
      "Yes. Middlesbrough's substantial stock of 1960s and 1970s council-built housing — across Berwick Hills, Park End, Pallister, and Ormesby — may contain asbestos in textured ceiling coatings (artex), floor tiles, insulating board around pipe runs, and ceiling tiles. Many of these properties have since been sold under right-to-buy and are now privately owned or let. Pre-1985 properties anywhere in Middlesbrough should be treated as potentially containing asbestos. An asbestos survey is recommended before any invasive electrical work. If asbestos is discovered during electrical work, stop immediately, seal the area, and contact a licensed asbestos removal contractor before proceeding.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Middlesbrough rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Middlesbrough.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for rewires across Middlesbrough's varied housing stock, from Linthorpe terraces to Coulby Newham new-builds.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Replace rewirable fuse boards with modern RCD-protected consumer units — step by step.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and consumer unit replacements across Teesside.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — the qualification needed to carry out and issue EICRs in Middlesbrough and across the Tees Valley.',
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
    heading: 'Electrician in Middlesbrough: What You Need to Know',
    content: (
      <>
        <p>
          Middlesbrough is a unitary authority on the south bank of the Tees, at the centre of the
          Tees Valley Combined Authority area alongside Stockton, Redcar and Cleveland, Hartlepool,
          and Darlington. With a population of around 140,000, it covers a wide range of
          neighbourhoods — from the Victorian terraced streets of Linthorpe and Newport in the
          centre, through the large post-war estates of Berwick Hills, Park End, Pallister, and
          Ormesby to the east, to the more affluent suburban areas of Acklam, Marton, and Nunthorpe
          to the south, and the planned private estates of Coulby Newham and Hemlington further out.
        </p>
        <p>
          Born of the Industrial Revolution as a centre for iron and steel, Middlesbrough is now
          undergoing one of the most significant industrial regeneration projects in the UK through
          the South Tees Development Corporation (STDC). The STDC site covers the former SSI
          steelworks at Redcar and extends across thousands of acres of ex-industrial land — with a
          pipeline of energy, advanced manufacturing, and logistics investment running through 2025
          to 2030. This is creating substantial demand for electrical infrastructure work at a scale
          rarely seen outside major city centres.
        </p>
        <p>
          Beyond the STDC zone, the Teesside industrial corridor — home to SABIC, Huntsman, and
          Nufarm chemical plants, PD Ports and Teesport, and the NHS's James Cook University
          Hospital (the largest hospital in the North East) — sustains a year-round commercial and
          industrial electrical workload. Teesside University adds further institutional demand. For
          domestic electricians, Middlesbrough's large rental market, high proportion of pre-1970s
          housing, and Redcar's proximity to developing offshore wind infrastructure create a
          well-rounded and consistent workload.
        </p>
        <p>
          This guide covers Part P compliance, the local DNO (Northern Powergrid), Middlesbrough's
          property types and key neighbourhoods, pricing, and practical advice for electricians
          working across the Tees Valley.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Middlesbrough',
    content: (
      <>
        <p>
          Middlesbrough is in England, so Part P of the Building Regulations applies to all
          notifiable electrical work in dwellings:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                allows self-certification. The scheme notifies Middlesbrough Council Building
                Control on the electrician's behalf and issues a compliance certificate to the
                customer. This applies to work in all Middlesbrough neighbourhoods, from a consumer
                unit replacement in Berwick Hills to a rewire in Coulby Newham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS
                7671:2018+A3:2024. RCD protection under Regulation 411.3.3 is required for socket
                outlets up to 32A and for circuits in locations of increased shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — five-yearly EICRs required under the
                Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
                Periodic inspection follows Section 631 of BS 7671. Given Middlesbrough's large
                private rented sector — concentrated in the terraced streets of Linthorpe, Newport,
                and Gresham, and across the former council estates — EICR demand is consistently
                high.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Northern Powergrid: Middlesbrough DNO',
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> is the DNO for Middlesbrough, the Tees Valley, and the
          wider North East and Yorkshire region:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — apply through Northern Powergrid's connections
                portal for new supplies, service upgrades, and temporary supplies for construction.
                Electricians working on the South Tees Development Corporation site or on commercial
                premises in Teesside should note that large-scale industrial connections involve
                Northern Powergrid's dedicated industrial connections team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV and battery storage. G98 for
                systems up to 16A per phase is processed online and is increasingly relevant as
                solar installations grow in the suburban areas of Nunthorpe, Marton, and Coulby
                Newham. G99 for larger systems requires pre-approval. The Tees Valley's proximity to
                Redcar's offshore wind development is also accelerating local interest in battery
                storage and EV infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power outages</strong> — report and track power cuts on the Northern
                Powergrid website or by calling 105. Emergency number covers all Middlesbrough
                postcodes and the wider Tees Valley area.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Middlesbrough Property Types',
    content: (
      <>
        <p>
          Middlesbrough's housing reflects over 150 years of industrial growth, post-war
          development, and more recent suburban expansion:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Central neighbourhoods including Linthorpe, Newport, and Gresham contain a dense stock
              of Victorian and Edwardian terraced housing. These properties typically have ageing
              wiring — rubber-insulated cable and rewirable fuse boards are still regularly found.
              Limited socket provision, mixed partial rewires, and no RCD protection are common
              findings on EICRs. Full rewires and consumer unit replacements are the
              bread-and-butter jobs in these areas.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1960s–1970s Council Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Berwick Hills, Park End, Pallister, Ormesby, and parts of Hemlington were built as
              large council estates in the 1960s and 1970s. Many have since been sold under
              right-to-buy and are now owner-occupied or privately let. The original consumer units
              — often rewirable fuse boards — remain in a significant number of these properties.
              Potential asbestos in textured ceiling coatings (artex) and floor tiles requires care
              during invasive electrical work.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Interwar and Suburban Semis</h3>
            <p className="text-white text-sm leading-relaxed">
              Acklam and Marton have substantial interwar and post-war semi-detached stock. Coulby
              Newham and Nunthorpe feature larger private estates built from the 1980s onwards —
              generally in better electrical condition but increasingly requiring consumer unit
              upgrades to accommodate EV chargers, solar PV, and additional circuits. Higher-value
              properties in Nunthorpe and Marton support premium rates for quality domestic
              electrical work.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Industrial and Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              The South Tees Development Corporation zone, the Teesside chemical corridor (SABIC,
              Huntsman, Nufarm), PD Ports and Teesport, James Cook University Hospital, and Teesside
              University all generate commercial and industrial electrical demand. CompEx
              certification is required for work in hazardous areas on the chemical sites.
              Three-phase supplies, motor control, and industrial standards knowledge is an
              advantage for any electrician targeting this sector.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Middlesbrough',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — the highest-volume domestic job in
                Middlesbrough. Driven by the large stock of 1960s and 1970s properties in Berwick
                Hills, Park End, Pallister, and Ormesby still fitted with original rewirable fuse
                boards. Many are triggered by EICR C2 findings on landlord inspections or by
                homeowners preparing to sell or remortgage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full house rewires</strong> — essential on pre-1970s Victorian and Edwardian
                terraces in Linthorpe, Newport, and Gresham. Mixed wiring from successive partial
                rewires is common and complicates assessment. Rubber-insulated cable is still found
                in some properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — consistent demand throughout the year from
                Middlesbrough's large private rented sector. Five-yearly obligation under the 2020
                Regulations. Landlords in the terraced streets of Linthorpe and the former council
                estates of Berwick Hills and Ormesby are the primary client base.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing demand in the suburban areas of
                Nunthorpe, Marton, Coulby Newham, and Acklam. Northern Powergrid notification
                required where supply capacity needs upgrading. The Tees Valley's offshore wind
                investment is supporting broader EV infrastructure growth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South Tees Development Corporation work</strong> — the STDC regeneration
                zone is creating substantial electrical infrastructure demand through 2025–2030. New
                industrial units, energy infrastructure, and logistics facilities all require
                electrical installation and commissioning. This is the largest single source of new
                industrial electrical work in the Tees Valley.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>James Cook University Hospital and NHS estates</strong> — the largest
                hospital in the North East is a major employer of directly contracted electrical
                contractors and M&amp;E firms. Ongoing maintenance and upgrade work runs year-round.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Middlesbrough (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£34 — £48</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£230 — £330</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £95/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>CompEx industrial rate</span>
                  <span className="font-semibold">£55 — £80/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£480 — £820</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £4,800</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£145 — £235</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£660 — £1,000</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-white text-sm mt-4 leading-relaxed">
            Rates in Middlesbrough sit at the lower end of the North East range, reflecting local
            labour market conditions. Premium rates apply for specialist industrial work on the
            Teesside chemical corridor and the South Tees Development Corporation site. Higher-value
            suburban areas such as Nunthorpe and Marton support slightly better domestic rates than
            central and eastern Middlesbrough.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Middlesbrough',
    content: (
      <>
        <p>
          Middlesbrough provides steady, reliable work for qualified electricians. The combination
          of an ageing housing stock concentrated in Berwick Hills, Park End, Pallister, Ormesby,
          Linthorpe, and Newport; a large private rented sector requiring five-yearly EICRs; and the
          significant commercial and industrial opportunity of the South Tees Development
          Corporation regeneration creates a well-rounded workload across domestic, commercial, and
          industrial sectors.
        </p>
        <p>
          Middlesbrough College is the primary training provider for the Level 3 Electrical
          Installation apprenticeship in the Tees Valley, and the local apprentice pipeline feeds
          directly into this market. Experienced electricians with CompEx certification can access
          higher rates on the SABIC, Huntsman, and Nufarm chemical sites on the Teesside industrial
          corridor, or through the growing project pipeline at the STDC site.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. Get professional documentation to Middlesbrough landlords and customers the
                  same day — particularly useful when working through a busy EICR schedule across
                  the rental terraces of Linthorpe and Newport.
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
                  Stand out with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes to Middlesbrough customers before a competitor does
                  — useful for rewire estimates in the older terraced streets and consumer unit
                  replacements across the Tees Valley.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Middlesbrough electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across Teesside and the North East. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianMiddlesbroughPage() {
  return (
    <GuideTemplate
      title="Electrician in Middlesbrough | Local Electricians 2026"
      description="Find qualified electricians in Middlesbrough. Part P compliance, Northern Powergrid DNO, NICEIC and NAPIT registered electricians, EICR for landlords, consumer unit replacement, and Middlesbrough electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Middlesbrough"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Middlesbrough:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="From the Victorian terraces of Linthorpe and Newport to the 1970s estates of Berwick Hills, Park End, and Ormesby, and the South Tees Development Corporation regeneration zone — Middlesbrough's ageing housing stock, large rental sector, and major industrial pipeline create steady demand for rewires, EICRs, and consumer unit upgrades. Find NICEIC and NAPIT registered electricians across the Tees Valley."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Middlesbrough"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Middlesbrough Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Teesside and the North East. 7-day free trial."
    />
  );
}
