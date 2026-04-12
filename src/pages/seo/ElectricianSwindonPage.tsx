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
  { label: 'Electrician in Swindon', href: '/electricians/swindon' },
];

const tocItems = [
  { id: 'overview', label: 'Swindon Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Swindon' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Swindon Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Swindon electricians are regulated by Part P of the Building Regulations and must comply with BS 7671:2018+A3:2024. NICEIC and NAPIT registered electricians in Swindon can self-certify notifiable domestic work.',
  'Western Power Distribution (now National Grid Electricity Distribution, NGED) is the Distribution Network Operator for Swindon. All DNO notifications for solar PV, battery storage, and EV chargers go through NGED.',
  'Swindon has a large stock of modern housing — including extensive post-millennium new-build estates — as well as the Great Western Designer Outlet and a significant commercial and industrial sector.',
  "Labour rates in Swindon are mid-range for the South West, typically £45 to £60 per hour, reflecting the town's mix of commuter population and local industry.",
  "Swindon's rapid population growth has driven strong demand for EV charger installations, solar PV, and battery storage, making renewable electrical installations a growing part of the local market.",
];

const faqs = [
  {
    question: 'How much does an electrician charge in Swindon?',
    answer:
      'Swindon electrician rates in 2026 typically range from £45 to £60 per hour for a qualified, registered electrician. Day rates are around £320 to £430. Emergency call-out rates range from £75 to £110 per hour with a minimum charge. Common fixed prices: consumer unit replacement £620 to £950, EICR for a 3-bed house £170 to £250, full rewire of a 3-bed semi £3,200 to £5,000, single socket addition £90 to £150, EV charger installation £700 to £1,000. Swindon rates sit between the lower Midlands rates and the higher London and South East rates.',
  },
  {
    question: 'Who is the Distribution Network Operator for Swindon?',
    answer:
      'National Grid Electricity Distribution (NGED) — formerly Western Power Distribution — is the DNO for Swindon and Wiltshire. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers in Swindon go through NGED. G98 notifications for generation systems up to 16A per phase can be submitted online through the NGED portal. For new connections or capacity upgrades, contact NGED directly.',
  },
  {
    question: 'What is Part P and does it apply in Swindon?',
    answer:
      'Part P of the Building Regulations applies in Swindon as it does throughout England. Notifiable electrical work in dwellings — including new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be either carried out by a registered competent person or notified to Swindon Borough Council building control before work starts. A NICEIC or NAPIT registered electrician self-certifies the work and notifies the council automatically — this is the standard and most practical approach.',
  },
  {
    question: 'Do landlords in Swindon need an EICR?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Swindon to have a valid EICR for their properties. EICRs must be carried out at least every 5 years (or sooner if the report specifies) by a qualified person. Landlords must provide a copy of the EICR to existing tenants within 28 days and to new tenants before they move in. Swindon Borough Council can impose financial penalties on non-compliant landlords.',
  },
  {
    question: 'What electrical work is most common in Swindon?',
    answer:
      "In Swindon, the most common electrical jobs include: consumer unit upgrades (many properties from the 1980s and 1990s have outdated boards), EICRs for landlords and homebuyers, EV charger installations (growing rapidly due to the commuter population and Honda's legacy of green transport culture), solar PV and battery storage installations, additional circuits for home offices and extensions, and rewiring of older properties. Commercial and industrial work — particularly on Swindon's extensive business parks — is also significant.",
  },
  {
    question: 'Is there good demand for electricians in Swindon?',
    answer:
      "Yes. Swindon has one of the fastest-growing populations of any UK town outside London, driven by its position between London and Bristol on the M4 corridor. This growth has driven consistent demand for new electrical installations, EV chargers, and solar PV in new-build and existing properties. The town's strong commercial and logistics sector also generates good commercial electrical work. Electricians with renewable energy installation experience (solar PV, EV chargers, battery storage) are particularly well-positioned in the Swindon market.",
  },
  {
    question: 'What qualifications do I need to work as an electrician in Swindon?',
    answer:
      'The qualifications are the same as elsewhere in England: City & Guilds 2365 or NVQ Level 3 in Electrical Installation as the core trade qualification, plus BS 7671 (18th Edition Wiring Regulations) certification. To self-certify work under Part P and issue certificates, you must be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. For EV charger installations, OZEV-approved installer status is required to access grant funding for eligible customers.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Swindon landlords — complete on site and issue instantly.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for all notifiable work in Swindon and Wiltshire.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables accurately for Swindon new-build and rewire projects with correct voltage drop calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Swindon — NGED notifications, OZEV grant funding, and installation requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Swindon electrical jobs accurately with the right South West pricing — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — structured training modules covering inspection and testing of electrical installations.',
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
    heading: 'Electrician in Swindon: What You Need to Know',
    content: (
      <>
        <p>
          Swindon is a large town in Wiltshire with a population of around 230,000. Located on the
          M4 corridor between London and Bristol, Swindon has grown rapidly over the past four
          decades and has one of the most modern housing stocks of any UK town. It is home to major
          employers in automotive, logistics, technology, and financial services.
        </p>
        <p>
          For electricians, Swindon offers a strong and varied workload. The large new-build housing
          stock requires ongoing maintenance, EV charger installations, and solar PV work. Older
          properties in the original town centre and Victorian areas like Old Town and Rodbourne
          need consumer unit upgrades and rewires. The extensive commercial and industrial sector on
          Swindon's business parks generates commercial electrical work for larger contractors.
        </p>
        <p>
          This guide covers finding a qualified electrician in Swindon, typical costs, regulatory
          requirements, and the key characteristics of the local market.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Swindon',
    content: (
      <>
        <p>
          To find a qualified and registered electrician in Swindon, use the official contractor
          search tools on the main competent person scheme websites:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — use the NICEIC "find a contractor" search with your
                Swindon postcode to find annually assessed, approved electrical contractors in the
                area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — the NAPIT contractor search returns registered electricians
                in Swindon and the surrounding Wiltshire area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — particularly relevant for solar PV and EV charger
                installers in the Swindon area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always ask to see the electrician's competent person scheme registration card before
          agreeing to work. A registered electrician will issue you with an Electrical Installation
          Certificate or EICR on completion and notify Swindon Borough Council automatically through
          their scheme.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Swindon (2026)',
    content: (
      <>
        <p>
          Swindon electrician rates in 2026 sit in the mid-range for England — higher than the North
          but below London and the South East coast. Typical rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£45 — £60</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£320 — £430</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£75 — £110/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£620 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£170 — £250</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,200 — £5,000</span>
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
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Swindon',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Swindon has a large number of properties built in the 1980s and 1990s with outdated
              consumer units. Upgrading to a modern unit with RCDs or RCBOs to meet BS 7671
              Regulation 411.3.3 is one of the most common jobs in the area, typically triggered by
              a failed EICR, a property sale, or an EV charger installation requiring a spare way.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solar PV and Battery Storage</h3>
            <p className="text-white text-sm leading-relaxed">
              Swindon's modern housing stock and southerly aspect make it well-suited to solar PV.
              Battery storage installations are growing as prices fall. NGED G98/G99 notifications
              are required, and MCS certification is needed for installations eligible for the Smart
              Export Guarantee (SEG) tariff.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              With a large commuter population and good motorway access, EV adoption in Swindon is
              strong. Home 7kW Type 2 charger installations on dedicated circuits with NGED G98
              notification are a growing and profitable part of the local market. OZEV approved
              installer status is required to access OZEV grant funding.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Landlord EICRs</h3>
            <p className="text-white text-sm leading-relaxed">
              Swindon has a significant private rented sector, particularly in the areas surrounding
              the town centre and near the railway station. Landlord EICRs are legally required
              every 5 years under the 2020 Electrical Safety Regulations — a consistent and reliable
              revenue stream for Swindon electricians.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P Compliance and BS 7671 in Swindon',
    content: (
      <>
        <p>
          All domestic electrical work in Swindon must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024. The key requirements:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — new circuits, consumer unit replacements, and
                work in kitchens, bathrooms, and outside must be notified. NICEIC or NAPIT
                registered electricians self-certify and notify Swindon Borough Council
                automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 Regulation 411.3.3 requires RCD protection
                for all socket outlets up to 32A and all final circuits in new domestic
                installations. Modern consumer units in Swindon must be fitted with RCDs or RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 sets out the requirements
                for periodic inspection and testing. Rental properties must have an EICR every 5
                years; owner-occupied properties are recommended every 10 years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Swindon Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large areas of Swindon — Tadpole Garden Village, Wichelstowe, Kingsdown — consist of
              post-millennium new-build houses and flats. These properties have modern consumer
              units, cavity walls, and straightforward cable access. Work is typically additions, EV
              charger installations, and solar PV rather than rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1980s and 1990s Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large residential estates built during Swindon's rapid expansion period. Cavity wall
              construction, but many properties have outdated consumer units and wiring that is
              approaching the end of its serviceable life. Consumer unit upgrades and EICRs are
              common in this property type.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Old Town Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Swindon Old Town has a stock of Victorian and Edwardian properties that are older than
              the more modern parts of the town. These may have solid walls and older wiring that
              requires full rewires. Old Town also has some conservation area properties where
              visible external changes may require planning consideration.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Business Parks</h3>
            <p className="text-white text-sm leading-relaxed">
              Swindon's extensive business parks — including the Great Western Way, Greenbridge, and
              Dorcan — host logistics, manufacturing, and office occupiers. Commercial electrical
              maintenance, distribution board work, and emergency lighting testing are regular
              requirements for electricians serving this sector.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Swindon',
    content: (
      <>
        <p>
          Swindon's combination of a modern and growing housing stock, a large commercial sector,
          and strong demand for EV chargers and solar PV makes it an excellent area for
          electricians. The mid-range rates are sustainable for most business models, and the volume
          of work is consistent.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> from
                  your phone on Swindon jobs. AI-assisted board scanning speeds up schedule of test
                  entry — spend less time on paperwork and more time on the tools.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win More Swindon Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send professional PDF quotes from site using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Accurate pricing for the Swindon market — quote consumer unit upgrades, EV
                  chargers, and rewires and win work before the competition.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Swindon electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians across Swindon and Wiltshire. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSwindonPage() {
  return (
    <GuideTemplate
      title="Electrician in Swindon | Local Electricians 2026"
      description="Find qualified electricians in Swindon. NICEIC and NAPIT registered, Part P compliant. Typical costs, EICRs, consumer unit upgrades, EV chargers, and solar PV in Swindon 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Swindon"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Swindon: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Swindon's modern housing stock, large commercial sector, and growing demand for EV chargers and solar PV create excellent opportunities for registered electricians. Find NICEIC and NAPIT approved contractors in Swindon."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Swindon"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Swindon Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Swindon, Wiltshire, and the M4 corridor. 7-day free trial."
    />
  );
}
