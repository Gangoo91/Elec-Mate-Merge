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
  Landmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Canterbury', href: '/electricians/canterbury' },
];

const tocItems = [
  { id: 'overview', label: 'Canterbury Overview' },
  { id: 'heritage', label: 'Heritage and Listed Buildings' },
  { id: 'costs', label: 'Electrician Costs in Canterbury' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Canterbury Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Canterbury is a UNESCO World Heritage City in Kent in the South East, with electrician rates of £55 to £75 per hour reflecting the heritage city premium and South East location.',
  'Canterbury has an exceptionally high concentration of listed buildings and conservation areas. External electrical work on listed buildings requires listed building consent from Canterbury City Council.',
  'UK Power Networks is the Distribution Network Operator for Canterbury and all of Kent. All G98/G99 notifications for solar PV and EV chargers go through UK Power Networks.',
  'Canterbury\'s three universities (University of Kent, Canterbury Christ Church University, and University for the Creative Arts) create a very large student rental market with ongoing HMO EICR and fire alarm requirements.',
  'All domestic electrical work in Canterbury must comply with Part P of the Building Regulations. NICEIC and NAPIT registered electricians self-certify notifiable work automatically.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Canterbury?',
    answer:
      'Canterbury electrician rates in 2026 are at the South East level, typically £55 to £75 per hour for a qualified, registered electrician. Day rates range from £385 to £530. Emergency call-out rates are £90 to £135 per hour with a minimum charge. Common fixed prices: consumer unit replacement £700 to £1,100, EICR for a 3-bed house £195 to £280, full rewire of a 3-bed Victorian terrace £3,800 to £5,800, single socket addition £120 to £180, EV charger installation £800 to £1,200. Listed building work commands a premium due to the additional care, planning, and time involved.',
  },
  {
    question: 'Do I need listed building consent for electrical work in Canterbury?',
    answer:
      'Listed building consent is required for any work that affects the character of a listed building, internally or externally. Canterbury has a very high density of listed buildings — the city centre is almost entirely within conservation areas and includes numerous Grade I and Grade II listed properties. External electrical work (EV chargers, external lighting, visible cable routes) on listed buildings requires consent from Canterbury City Council planning department. Internal rewiring in listed buildings requires care to avoid damaging original features. Always advise customers to seek planning advice before committing to external electrical work on heritage properties.',
  },
  {
    question: 'Who is the DNO for Canterbury?',
    answer:
      'UK Power Networks (UKPN) is the Distribution Network Operator for Canterbury and the whole of Kent. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers go through UK Power Networks. The UKPN online portal handles G98 notifications for systems up to 16A per phase. G99 applications for larger systems require prior approval and typically take 8 to 12 weeks. For new connections or capacity upgrades, contact UK Power Networks directly.',
  },
  {
    question: 'What electrical work is most common in Canterbury?',
    answer:
      'Canterbury electricians handle a mix of heritage property work, student HMO compliance, and standard domestic and commercial jobs. The most common work includes: landlord and HMO EICRs for the large student rental sector, consumer unit upgrades in Victorian and post-war properties, rewires of Canterbury\'s older housing stock, listed building electrical work requiring care around heritage fabric, EV charger installations for the commuter population, and commercial electrical work for the city centre retail and tourism sector.',
  },
  {
    question: 'Does Part P apply in Canterbury?',
    answer:
      'Yes. Part P of the Building Regulations applies in Canterbury as throughout England. Notifiable electrical work in dwellings — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Canterbury City Council building control before work starts. A NICEIC or NAPIT registered electrician self-certifies the work and notifies the council automatically through their scheme.',
  },
  {
    question: 'How strong is demand for electricians in Canterbury?',
    answer:
      'Demand for electricians in Canterbury is very strong. The city has three universities with large student populations creating significant HMO rental demand — this means ongoing EICR, fire alarm, and emergency lighting work. The large number of listed and heritage properties requiring specialist electrical work creates demand for experienced electricians. The tourism and hospitality sector generates commercial electrical work. Canterbury is also a popular retirement destination, and older properties occupied by downsizers often require consumer unit upgrades and rewires.',
  },
  {
    question: 'What earthing arrangements are common in Canterbury properties?',
    answer:
      'Most post-war Canterbury properties are TN-C-S (PME earthing), where the combined neutral and earth is provided by UK Power Networks at the supply intake. Some older properties in the city centre may be TN-S (separate earth in the service cable) and a small number of rural properties in the surrounding Canterbury district will be TT earthed. Always verify the earthing arrangement at the supply intake before carrying out work that affects the earthing system. In listed buildings, the original supply cable and intake arrangement may be non-standard and should be carefully assessed.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Canterbury student HMOs and landlords — complete on site.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Canterbury and Kent.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Canterbury historic property rewires and EV charger circuit installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Canterbury — UK Power Networks notifications and listed building considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Canterbury electrical jobs at accurate South East rates — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — essential for EICR work in Canterbury\'s large student rental sector.',
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
    heading: 'Electrician in Canterbury: What You Need to Know',
    content: (
      <>
        <p>
          Canterbury is a UNESCO World Heritage City in east Kent with a population of around
          60,000 in the city itself and over 170,000 in the wider Canterbury district. Home
          to Canterbury Cathedral, St Augustine's Abbey, and St Martin's Church — all World
          Heritage Sites — the city has one of the densest concentrations of historic buildings
          in England.
        </p>
        <p>
          For electricians, Canterbury is a fascinating and rewarding market. The heritage
          buildings and conservation areas require specialist knowledge of listed building
          requirements. The three universities create a very large student population,
          generating constant demand for HMO EICRs, fire alarm work, and emergency lighting.
          The tourism and hospitality sector is one of the strongest in Kent, creating
          commercial electrical demand. South East rates apply throughout.
        </p>
        <p>
          This guide covers finding a qualified electrician in Canterbury, typical costs,
          the listed building requirements, common jobs, and the specific characteristics
          of this unique historic city market.
        </p>
      </>
    ),
  },
  {
    id: 'heritage',
    heading: 'Heritage Buildings and Listed Building Consent in Canterbury',
    content: (
      <>
        <p>
          Canterbury's status as a UNESCO World Heritage City means that electrical work
          in and around historic buildings requires particular care and planning:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent</strong> — any work that affects the character
                of a listed building requires listed building consent from Canterbury City
                Council planning department. This includes all external electrical work (EV
                charger mounting, external lighting, visible cables) and internal work that
                damages or alters original features.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — almost all of Canterbury city
                centre is within a conservation area. Even unlisted buildings face restrictions
                on external alterations. EV charger installations visible from the street in
                conservation areas may require planning permission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal rewiring in listed buildings</strong> — rewiring in listed
                buildings must avoid damaging original fabric. Surface-mounted trunking in
                appropriate materials (often painted to match the wall), careful routing
                through existing voids, and the use of slim-profile accessories help minimise
                visual impact and preserve the historic character.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos and older materials</strong> — properties in Canterbury city
                centre may include buildings from multiple periods. Pre-1980s properties should
                be assessed for asbestos in floor tiles, artex, and pipe lagging before any
                invasive work. Some very old buildings may have unusual construction materials
                requiring specialist assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Canterbury City Council's conservation and planning team can provide guidance on
          the requirements for specific properties. Electricians who build a working relationship
          with the planning team and understand the listed building consent process will be
          better positioned to advise customers and manage the consent process efficiently.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Canterbury (2026)',
    content: (
      <>
        <p>
          Canterbury rates reflect the South East location and the heritage city premium.
          Typical 2026 rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£55 — £75</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£385 — £530</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£90 — £135/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£195 — £280</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed Victorian)</span>
                  <span className="font-semibold">£3,800 — £5,800</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£120 — £180</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£800 — £1,200</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Listed building and heritage property work typically commands a premium of 20% to
          40% above standard rates, reflecting the additional care, time, and planning involved.
          Always survey heritage properties in person before quoting.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Canterbury',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMO EICRs</h3>
            <p className="text-white text-sm leading-relaxed">
              Canterbury's three universities generate a very large student rental market.
              HMO landlords require EICRs every 5 years, fire alarm systems to BS 5839-6,
              emergency lighting, and adequate socket provision. Canterbury City Council's
              HMO licensing team enforces these requirements and checks for valid certificates
              at licence renewal.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Listed Building Rewires</h3>
            <p className="text-white text-sm leading-relaxed">
              Rewiring listed and heritage properties in Canterbury city centre requires
              specialist knowledge. Surface-mounted trunking in appropriate materials,
              careful routing, and the preservation of original features are the priorities.
              Premium rates are justified by the skill and care involved.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Tourism Sector</h3>
            <p className="text-white text-sm leading-relaxed">
              Canterbury is a major tourist destination with hotels, restaurants, pubs, and
              retail businesses requiring commercial electrical maintenance, emergency lighting
              testing, and periodic inspection. The hospitality sector is a consistent
              commercial client for Canterbury electricians.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Canterbury's commuter population drives demand for home EV charger installations.
              Installations on listed buildings or in conservation areas require careful
              planning around visibility and listed building consent. UK Power Networks G98
              notification is required for all home charger installations.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Canterbury',
    content: (
      <>
        <p>
          All domestic electrical work in Canterbury must comply with Part P and BS 7671:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work must be self-certified
                by a registered competent person or notified to Canterbury City Council building
                control. Registered electricians notify automatically through their scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 requires RCD additional protection
                for socket outlets and all final circuits in new
                domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 covers periodic
                inspection. Rental properties must have an EICR every 5 years. HMO properties
                must maintain valid EICRs as a condition of their Canterbury City Council
                HMO licence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Canterbury Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">City Centre Heritage Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Medieval and Tudor timber-framed buildings, Georgian townhouses, and Victorian
              commercial conversions within the city walls. Many are Grade I or Grade II listed.
              External electrical work requires listed building consent. Internal rewiring must
              preserve original fabric and features.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian and Edwardian terraced housing in areas like St Dunstan's, Wincheap,
              and North Lane. Solid brick walls in many properties. Consumer unit upgrades
              and full rewires are common. Pre-1980s properties should be assessed for
              asbestos before invasive work.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMO Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Student houses concentrated near the University of Kent (on the hill north of
              the city), Canterbury Christ Church University, and UCA. Regular EICRs, fire
              alarms, and emergency lighting work. Reliable repeat clients for electricians
              who serve this sector efficiently.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Residential Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build estates in areas like Thanington, Sturry, and on the fringes of the
              Canterbury district. Modern wiring and consumer units. EV charger installations
              and solar PV are the most common jobs in this property type.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Canterbury',
    content: (
      <>
        <p>
          Canterbury offers a uniquely varied market — heritage listed building work, volume
          student HMO EICRs, and a growing EV charger and renewable energy sector, all at
          South East rates. Electricians who invest in understanding the heritage requirements
          and build relationships with the student landlord market will find Canterbury
          a very rewarding place to work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">High-Volume EICR Processing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Process Canterbury's large volume of student landlord{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  efficiently using AI-assisted board scanning. Issue certificates on site
                  and move straight to the next job — maximise your daily throughput.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Heritage and Standard Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional PDF quotes from Canterbury surveys. Quote heritage
                  property rewires at the appropriate premium, and standard domestic work
                  at South East rates. Send quotes before you leave site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Canterbury electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for South East electricians working across Kent and Canterbury. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCanterburyPage() {
  return (
    <GuideTemplate
      title="Electrician in Canterbury | Local Electricians 2026"
      description="Find qualified electricians in Canterbury. NICEIC and NAPIT registered, Part P compliant. South East rates, listed building work, student HMO EICRs, EV chargers, and consumer unit upgrades in Canterbury 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Canterbury"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Canterbury:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Canterbury's UNESCO World Heritage status, concentration of listed buildings, three universities, and South East location create a uniquely varied and rewarding market for registered electricians. Find NICEIC and NAPIT approved electricians in Canterbury."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Canterbury"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Canterbury Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for South East electricians working across Canterbury and Kent. 7-day free trial."
    />
  );
}
