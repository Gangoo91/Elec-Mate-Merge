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
  { label: 'Electrician in Harrogate', href: '/electricians/harrogate' },
];

const tocItems = [
  { id: 'overview', label: 'Harrogate Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Harrogate' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Harrogate Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Harrogate is a prosperous spa town in North Yorkshire, with electrician rates of £42 to £58 per hour — above the Yorkshire average, reflecting the town's affluent demographics and premium residential market.",
  'Northern Powergrid is the Distribution Network Operator for Harrogate and Yorkshire. All G98/G99 notifications for solar PV, battery storage, and EV chargers in Harrogate go through Northern Powergrid.',
  'Harrogate has an exceptional stock of Victorian and Edwardian hotels, guest houses, and residential properties — many of them listed — creating demand for sensitive electrical work in heritage settings.',
  "The Harrogate Convention Centre and the town's large conference and exhibition industry generate significant commercial electrical demand, including temporary power and event electrical installations.",
  'All domestic electrical work in Harrogate must comply with Part P of the Building Regulations. NICEIC and NAPIT registered electricians self-certify notifiable work automatically.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Harrogate?',
    answer:
      'Harrogate electrician rates in 2026 are above the Yorkshire average, typically £42 to £58 per hour for a qualified, registered electrician. Day rates range from £300 to £410. Emergency call-out rates are £70 to £100 per hour with a minimum charge. Common fixed prices: consumer unit replacement £600 to £920, EICR for a 3-bed house £160 to £240, full rewire of a 3-bed semi £3,000 to £4,800, single socket addition £90 to £150, EV charger installation £700 to £1,000. Harrogate rates are higher than most of Yorkshire due to the affluent customer base and premium residential market, but well below London and South East rates.',
  },
  {
    question: 'Who is the Distribution Network Operator for Harrogate?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Harrogate and the wider Yorkshire area. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers in Harrogate go through Northern Powergrid. G98 notifications for generation systems up to 16A per phase can be submitted online through the Northern Powergrid portal. G99 applications for larger systems require prior approval and typically take 8 to 12 weeks. For new connections or capacity upgrades, contact Northern Powergrid directly.',
  },
  {
    question: 'What electrical work is most common in Harrogate?',
    answer:
      "Common electrical jobs in Harrogate include: consumer unit upgrades in the large stock of Victorian and Edwardian properties, landlord EICRs for the town's rental sector, EV charger installations (strong demand from the affluent owner-occupier population), solar PV and battery storage in the large detached houses with good roof space, rewires of period properties, and commercial electrical work for the hotels, conference facilities, and healthcare sector. Listed building electrical work is also common given the concentration of Victorian heritage in Harrogate.",
  },
  {
    question: 'Does Part P apply in Harrogate?',
    answer:
      'Yes. Part P of the Building Regulations applies in Harrogate as throughout England. Notifiable electrical work in dwellings — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Harrogate Borough Council (part of North Yorkshire Council) building control before work starts. A NICEIC or NAPIT registered electrician self-certifies the work and notifies the council automatically through their scheme.',
  },
  {
    question: 'Are there listed building requirements for electrical work in Harrogate?',
    answer:
      "Harrogate has a significant number of listed buildings, particularly in the Victorian spa town centre and the surrounding residential areas developed during the town's 19th-century heyday. Listed building consent is required for external electrical work on listed properties — including EV charger mounting, external lighting, and visible cable routes. Internal rewiring in listed buildings must avoid damaging original features. Harrogate conservation areas (covering much of the Victorian town centre) also impose restrictions on external alterations to unlisted buildings.",
  },
  {
    question: 'How do I find a qualified electrician in Harrogate?',
    answer:
      "Use the NICEIC or NAPIT contractor search on their respective websites, entering your Harrogate postcode. Both registers include only electricians who have been assessed for technical competence and who carry appropriate insurance. In Harrogate's premium market, word of mouth and personal recommendation are also important — ask neighbours, friends, or your estate agent for recommendations. Always ask to see the electrician's scheme registration card before agreeing to work.",
  },
  {
    question: 'What are typical earthing arrangements in Harrogate properties?',
    answer:
      'Most modern Harrogate residential properties are TN-C-S (PME earthing), with the combined neutral and earth provided by Northern Powergrid at the supply intake. Older Victorian and Edwardian properties may have TN-S earthing (separate earth conductor in the service cable) or, in some cases, older arrangements that have been modified over time. Some rural properties in the wider Harrogate district will have TT earthing. Always verify the earthing arrangement at the supply intake before undertaking work affecting the earthing system.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Harrogate landlords and period properties — complete on site.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Harrogate and North Yorkshire.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Harrogate Victorian property rewires and EV charger installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Harrogate — Northern Powergrid notifications and listed building considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Harrogate electrical jobs at accurate Yorkshire premium rates — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      "Study for C&G 2391 — essential for EICR work in Harrogate's period property market.",
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
    heading: 'Electrician in Harrogate: What You Need to Know',
    content: (
      <>
        <p>
          Harrogate is a prosperous spa town in North Yorkshire with a population of around 80,000.
          Famous for its Victorian architecture, beautiful gardens, and the Harrogate Convention
          Centre, the town developed as a fashionable spa destination in the 19th century and
          retains a distinctive character of fine Victorian and Edwardian hotels, townhouses, and
          residential streets.
        </p>
        <p>
          For electricians, Harrogate is one of the most attractive markets in Yorkshire. The
          affluent owner-occupier population invests in quality electrical work — EV chargers, solar
          PV, consumer unit upgrades, and full rewires of period properties. The large hotel and
          conference sector generates commercial electrical work. The concentration of listed and
          heritage buildings creates demand for electricians with experience of working sensitively
          in historic properties.
        </p>
        <p>
          This guide covers finding a qualified electrician in Harrogate, typical costs, common
          jobs, regulatory requirements, and the specific characteristics of the Harrogate market.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Harrogate',
    content: (
      <>
        <p>
          To find a qualified and registered electrician in Harrogate, use the official scheme
          search tools:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the NICEIC "find a contractor" search returns assessed and
                approved electricians covering Harrogate and North Yorkshire. NICEIC approved
                contractors are assessed annually and self-certify notifiable work under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — NAPIT has strong coverage across Yorkshire. Registered
                electricians self-certify and notify the local authority automatically through their
                scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Period property experience</strong> — for Victorian and listed building
                work, look for electricians who specifically mention heritage property experience.
                The challenges of rewiring period Harrogate properties are distinct from modern
                cavity-wall construction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Harrogate's premium market, reputation matters greatly. Word of mouth between
          neighbours in the town's residential streets carries significant weight. An electrician
          who does meticulous work in a Victorian townhouse will often receive referrals to multiple
          properties in the same street.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Harrogate (2026)',
    content: (
      <>
        <p>Harrogate commands above-average Yorkshire rates. Typical 2026 rates:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£42 — £58</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£300 — £410</span>
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
                  <span className="font-semibold">£600 — £920</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£160 — £240</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £4,800</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£90 — £150</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Victorian and listed building rewires in Harrogate command a premium due to the complexity
          of working in solid-wall period properties with original features to preserve. Large
          Victorian townhouses with multiple floors and extensive runs can cost significantly more
          than a standard semi-detached rewire.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Harrogate',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Property Rewires</h3>
            <p className="text-white text-sm leading-relaxed">
              Harrogate has an exceptional stock of Victorian and Edwardian townhouses, many of
              which require periodic rewires. Solid stone or brick walls require surface-mounted
              trunking or careful routing through floor voids. Pre-1980s properties should be
              assessed for asbestos. Large Harrogate townhouses can take 5 to 10 days for a full
              rewire.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Many Harrogate properties have outdated consumer units that do not provide adequate
              RCD protection as required by BS 7671 Regulation 411.3.3. Consumer unit upgrades are
              commonly requested following a failed EICR, a property sale, or when customers are
              aware that their fuse board is outdated.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Harrogate's affluent population is one of the stronger EV adopter markets in
              Yorkshire. Home 7kW Type 2 charger installations with Northern Powergrid G98
              notification are the standard. Premium smart chargers with solar divert and load
              management are popular in the higher-value properties.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hotel and Conference Sector</h3>
            <p className="text-white text-sm leading-relaxed">
              Harrogate's large hotel and conference industry — centred on the Harrogate Convention
              Centre and the town's many hotels — generates significant commercial electrical work.
              Emergency lighting testing, distribution board maintenance, and periodic inspection of
              commercial premises are regular requirements.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Harrogate',
    content: (
      <>
        <p>
          All domestic electrical work in Harrogate must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work must be self-certified by a
                registered competent person or notified to North Yorkshire Council building control
                (Harrogate area) before work starts. Registered electricians notify automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 Regulation 411.3.3 requires RCD protection
                for all socket outlets up to 32A and all final circuits in new domestic
                installations. Consumer units in Harrogate properties must satisfy this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 covers periodic
                inspection requirements. Rental properties must have a valid EICR every 5 years by
                law. Owner-occupied properties are recommended every 10 years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Harrogate Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Victorian and Edwardian Townhouses
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The defining property type of Harrogate — grand stone-built townhouses on leafy
              streets in areas like Duchy, Oatlands, and Bilton. Solid stone walls, multiple floors,
              and original features. Rewiring requires surface-mounted trunking or careful routing
              through floor voids. Asbestos surveys essential in pre-1980s properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Converted Hotels and Guest Houses</h3>
            <p className="text-white text-sm leading-relaxed">
              Many of Harrogate's Victorian hotels and guest houses have been converted to flats or
              residential use. These properties have complex histories of electrical modifications.
              Full surveys before quoting are essential — original commercial wiring may have been
              partially replaced over multiple decades.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War and Modern Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              1950s and 1960s semi-detached houses in areas like Starbeck and Knaresborough Road,
              and modern developments on the outskirts. Cavity wall construction — easier cable
              access. Consumer unit upgrades and EV charger installations are the most common work
              in these properties.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural North Yorkshire Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The villages and rural areas surrounding Harrogate — including Knaresborough, Ripon,
              and the Nidderdale AONB — have older rural properties and farms. Some have TT
              earthing. Overhead service cables are common in rural areas. Solar PV is popular on
              south-facing farm buildings and rural properties.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Harrogate',
    content: (
      <>
        <p>
          Harrogate is one of the most rewarding markets in Yorkshire for electricians.
          Above-average rates, an affluent and quality-conscious customer base, interesting period
          property work, and a strong commercial hotel and conference sector combine to create an
          excellent local market for well-qualified, professional electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> from
                  your phone on Harrogate jobs. Harrogate customers expect professional
                  documentation to match the quality of the work — deliver it on site before you
                  leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Harrogate Jobs Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional PDF quotes for Harrogate customers. Quote Victorian
                  property rewires, EV charger installations, and consumer unit upgrades at accurate
                  North Yorkshire rates — send quotes before you leave the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Harrogate electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across Harrogate and North Yorkshire. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianHarrogatePage() {
  return (
    <GuideTemplate
      title="Electrician in Harrogate | Local Electricians 2026"
      description="Find qualified electricians in Harrogate. NICEIC and NAPIT registered, Part P compliant. Yorkshire rates, Victorian property rewires, EICRs, EV chargers, and hotel electrical work in Harrogate 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Harrogate"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Harrogate: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Harrogate's exceptional Victorian architecture, affluent residential market, and thriving hotel and conference sector create a rewarding and varied market for registered electricians. Find NICEIC and NAPIT approved electricians in Harrogate and North Yorkshire."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Harrogate"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Harrogate Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Harrogate and North Yorkshire. 7-day free trial."
    />
  );
}
