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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Basingstoke', href: '/electricians/basingstoke' },
];

const tocItems = [
  { id: 'overview', label: 'Basingstoke Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Basingstoke' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Basingstoke Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Basingstoke is in Hampshire in the South East, commanding premium electrician rates of £55 to £75 per hour due to the high cost of living, commuter belt location, and strong corporate demand.',
  'UK Power Networks is the Distribution Network Operator for Basingstoke and most of Hampshire. All G98/G99 notifications for solar PV and EV chargers go through UK Power Networks.',
  "Basingstoke has a large stock of 1960s, 1970s, and 1980s housing — much of it built during the town's designation as a London overspill town — with a significant proportion of consumer units requiring upgrade.",
  'The town has a major corporate and business park sector, including the headquarters of AA, Motorola, and other large companies. Commercial electrical work is a significant part of the local market.',
  'NICEIC and NAPIT registered electricians in Basingstoke can self-certify all notifiable domestic work under Part P of the Building Regulations.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Basingstoke?',
    answer:
      "Basingstoke electrician rates in 2026 are at the premium South East level, typically £55 to £75 per hour for a qualified, registered electrician. Day rates range from £380 to £520. Emergency call-out rates are £90 to £130 per hour with a minimum charge. Common fixed prices: consumer unit replacement £700 to £1,100, EICR for a 3-bed house £190 to £270, full rewire of a 3-bed semi £3,800 to £5,800, single socket addition £120 to £180, EV charger installation £800 to £1,200. Basingstoke's position in the South East commuter belt means rates are similar to those in other premium Hampshire and Surrey towns.",
  },
  {
    question: 'Who is the Distribution Network Operator for Basingstoke?',
    answer:
      'UK Power Networks (UKPN) is the DNO for Basingstoke and the majority of Hampshire. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers go through UK Power Networks. For new supply connections or capacity upgrades — for example, upgrading from a 60A to 100A supply for an EV charger or heat pump — contact UK Power Networks directly through their connections portal.',
  },
  {
    question: 'What electrical work is most common in Basingstoke?',
    answer:
      'The most common electrical jobs in Basingstoke include: consumer unit upgrades (the large stock of 1960s—1980s properties has many outdated fuse boards), EICRs for landlords and for properties being sold, EV charger installations (very strong demand from the commuter population), solar PV and battery storage, additional circuits for home offices and extensions, and full rewires of older properties. Commercial electrical work on the many business parks — distribution board upgrades, emergency lighting, and office fit-out wiring — is also a significant part of the local market.',
  },
  {
    question: 'Do I need Part P certification for electrical work in Basingstoke?',
    answer:
      'Yes. Part P of the Building Regulations applies in Basingstoke as it does throughout England. Notifiable electrical work in dwellings — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Basingstoke and Deane Borough Council building control before work starts. A NICEIC or NAPIT registered electrician self-certifies the work and notifies the council automatically.',
  },
  {
    question: 'Is there strong demand for electricians in Basingstoke?',
    answer:
      "Yes. Basingstoke has a large and growing population, a high proportion of homeowners (which drives demand for home improvement electrical work and EV chargers), a significant private rented sector (which generates EICR demand), and a major business park sector (which generates commercial electrical work). The town's position in the South East commuter belt means that rates are high and customers expect professional service — making it an excellent market for well-qualified, registered electricians who present themselves professionally.",
  },
  {
    question: 'What types of property are most common in Basingstoke?',
    answer:
      "Basingstoke was designated as a London overspill town in the 1960s and expanded rapidly. The housing stock is dominated by properties built between the 1960s and 1990s — mostly cavity-wall semi-detached and terraced houses on large residential estates. These properties frequently have outdated consumer units and wiring approaching the end of its serviceable life, creating strong demand for consumer unit upgrades and periodic inspection work. Newer developments around the town's edges have modern wiring and consumer units.",
  },
  {
    question: 'How long does an EICR take in Basingstoke?',
    answer:
      'An EICR for a typical 3-bedroom semi-detached house in Basingstoke takes 3 to 5 hours for a single electrician. The inspection covers the condition of the consumer unit, fixed wiring, earthing and bonding, and all accessible wiring and accessories. The inspector carries out dead and live tests on the installation and records the results in the EICR schedule. Any C1 (danger present) or C2 (potentially dangerous) defects are noted and must be remedied before the EICR can be issued as satisfactory.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Basingstoke landlords and homebuyers — complete on site.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Basingstoke and Hampshire.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Basingstoke rewires, EV charger circuits, and new installations with accurate calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Basingstoke — UK Power Networks notifications and OZEV grant funding.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Basingstoke electrical jobs with South East pricing — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      "Study for C&G 2391 — essential for EICR work in Basingstoke's large residential sector.",
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
    heading: 'Electrician in Basingstoke: What You Need to Know',
    content: (
      <>
        <p>
          Basingstoke is a large town in Hampshire with a population of around 180,000. A planned
          overspill town for London in the 1960s, Basingstoke expanded rapidly and now has a diverse
          economy centred on business services, pharmaceuticals, logistics, and retail. It is
          well-connected to London and the South Coast via the M3 motorway and mainline rail.
        </p>
        <p>
          For electricians, Basingstoke offers a premium South East market with consistent demand
          across both domestic and commercial sectors. The large stock of post-war housing creates
          ongoing demand for consumer unit upgrades, EICRs, and rewires. The significant business
          park and corporate sector — including major employers such as the AA, Motorola, and many
          pharmaceutical companies — generates commercial and industrial electrical work for larger
          contractors.
        </p>
        <p>
          This guide covers finding a qualified electrician in Basingstoke, typical costs, common
          jobs, and the regulatory framework for electrical work in the area.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Basingstoke',
    content: (
      <>
        <p>
          For residential work in Basingstoke, the best approach is to use a NICEIC or NAPIT
          registered electrician. Both schemes require contractors to be assessed for technical
          competence and to carry appropriate insurance:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC Approved Contractor</strong> — search by postcode on the NICEIC
                website to find assessed and approved electricians in Basingstoke. NICEIC
                contractors self-certify their work under Part P and notify the local authority
                automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT registered</strong> — NAPIT offers a similar scheme with strong
                coverage in Hampshire. Use the NAPIT website to find registered contractors near
                your Basingstoke address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA member (commercial)</strong> — for commercial projects on Basingstoke's
                business parks, look for ECA members with relevant commercial and industrial
                experience.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In the South East market, it is common to receive quotes from multiple electricians for
          larger jobs. Always compare like for like — a cheaper quote that does not include
          certificates, VAT, or the cost of notifying the local authority is not a fair comparison
          with a fully inclusive quote from a registered contractor.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Basingstoke (2026)',
    content: (
      <>
        <p>
          Basingstoke rates reflect its South East location and premium market position. Typical
          2026 rates:
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
                  <span className="font-semibold">£380 — £520</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£90 — £130/hr</span>
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
                  <span className="font-semibold">£190 — £270</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
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
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Basingstoke',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Basingstoke's large stock of 1960s—1980s housing means many properties still have
              outdated fuse boards. Upgrading to a modern consumer unit with RCDs or RCBOs to comply
              with BS 7671 Regulation 411.3.3 is one of the most requested jobs in the area — often
              prompted by a failed EICR or a conveyancing requirement.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Landlord EICRs</h3>
            <p className="text-white text-sm leading-relaxed">
              Basingstoke has a substantial private rented sector. Landlord EICRs are legally
              required every 5 years. The EICR must be carried out by a qualified person and any C1
              or C2 defects remedied within 28 days. Basingstoke and Deane Borough Council enforces
              the Electrical Safety Regulations actively.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Basingstoke's commuter population and relatively affluent demographics make it a
              strong market for EV charger installations. Home 7kW Type 2 chargers on dedicated
              circuits are the most common installation, with a UK Power Networks G98 notification
              required in most cases.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Electrical Work</h3>
            <p className="text-white text-sm leading-relaxed">
              The business parks north and east of Basingstoke — including Chineham Park, Basing
              View, and the Festival Place retail complex — generate significant commercial
              electrical work. Three-phase installations, distribution board maintenance, emergency
              lighting, and data cabling work are common in this sector.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Basingstoke',
    content: (
      <>
        <p>
          All domestic electrical work in Basingstoke must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work requires self-certification
                by a registered competent person or notification to Basingstoke and Deane Borough
                Council building control before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 Regulation 411.3.3 requires RCD protection
                for all socket outlets up to 32A and all final circuits in new domestic
                installations. Modern consumer units must be fitted with RCDs or RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 sets out the requirements
                for periodic inspection. Rental properties must have an EICR every 5 years by law.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Basingstoke Property Types and Electrical Challenges',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1960s—1980s Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              The dominant property type in Basingstoke. Cavity wall semi-detached and terraced
              houses built during the town's expansion as a London overspill. Many have outdated
              consumer units and wiring from the original construction. Consumer unit upgrades and
              EICRs are the most common jobs in these properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              Newer estates in areas like Brighton Hill, Popley, and the rural fringes have modern
              wiring and consumer units. Work tends to be additions, EV charger installations, and
              solar PV rather than rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Old Basing and Village Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The villages surrounding Basingstoke — including Old Basing, Sherborne St John, and
              Hook — have older rural properties, some of which are TT earthed (requiring an earth
              electrode rather than relying on the DNO neutral). Always check the earthing
              arrangement before undertaking work in rural Hampshire properties.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Premises</h3>
            <p className="text-white text-sm leading-relaxed">
              Basingstoke's business parks and retail sector generate strong commercial demand.
              Distribution board maintenance, three-phase supplies, and emergency lighting testing
              are regular requirements. The Festival Place shopping centre and its surrounding
              retail parks are significant commercial electrical clients.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Basingstoke',
    content: (
      <>
        <p>
          Basingstoke is a premium South East market with consistent demand across residential and
          commercial sectors. Electricians who can serve both markets, present themselves
          professionally, and complete certification efficiently are well-positioned here.
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
                  your phone on Basingstoke jobs. South East customers expect professional
                  documentation — deliver it on site before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Win South East Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional PDF quotes for Basingstoke customers. Quote accurately at
                  South East rates and send quotes before you leave the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Basingstoke electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the South East market. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBasingstokePage() {
  return (
    <GuideTemplate
      title="Electrician in Basingstoke | Local Electricians 2026"
      description="Find qualified electricians in Basingstoke. NICEIC and NAPIT registered, Part P compliant. South East rates, EICRs, consumer unit upgrades, EV chargers, and commercial electrical work in Basingstoke 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Basingstoke"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Basingstoke:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Basingstoke's South East location, large 1960s—1980s housing stock, and major business park sector create strong demand for consumer unit upgrades, EICRs, EV chargers, and commercial electrical work. Find NICEIC and NAPIT approved electricians in Basingstoke."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Basingstoke"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Basingstoke Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the South East market. 7-day free trial."
    />
  );
}
