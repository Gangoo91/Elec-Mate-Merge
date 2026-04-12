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
  { label: 'Electrician in Sunderland', href: '/electricians/sunderland' },
];

const tocItems = [
  { id: 'overview', label: 'Sunderland Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Sunderland Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Sunderland' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Sunderland is in England — Part P of the Building Regulations applies. Notifiable electrical work must be either certified by a competent person scheme member (NICEIC, NAPIT) or notified to Sunderland City Council Building Control before work begins.',
  'The Northern Powergrid is the Distribution Network Operator (DNO) for Sunderland. DNO notifications for solar PV, battery storage, EV chargers, and new connections go through Northern Powergrid.',
  'Sunderland has a large stock of 1950s–1980s social housing and post-war semi-detached properties. Rewiring these properties often uncovers aluminium wiring, rubber-insulated cables, and asbestos in ceiling and floor materials.',
  'The private rental sector in Sunderland requires five-yearly EICRs under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'Labour rates in Sunderland are among the lower end of the North East range, but material costs are standard. Electricians who work efficiently and deliver professional documentation can build strong margins.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Sunderland?',
    answer:
      'Yes. Sunderland is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. Notifiable work includes new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors. Electricians registered with a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify their work and issue a Building Regulations compliance certificate directly. Unregistered electricians must notify Sunderland City Council Building Control before starting work and pay an inspection fee.',
  },
  {
    question: 'Who is the DNO for Sunderland?',
    answer:
      'Northern Powergrid is the Distribution Network Operator covering Sunderland and the wider North East of England. All DNO-related applications — new connections, capacity upgrades, G98/G99 notifications for solar PV and battery storage, and EV charger notifications above 7.4 kW — go through Northern Powergrid. Their connections team handles applications online, and response times for G98 notifications are typically within five working days.',
  },
  {
    question: 'How much does an electrician cost in Sunderland?',
    answer:
      'Sunderland electrician rates in 2026 typically range from £35 to £50 per hour for a qualified, registered sole trader. Day rates run from £240 to £350. Common fixed-price jobs: consumer unit replacement £500 to £850, full house rewire (3-bed semi) £3,000 to £5,000, EICR for a 3-bed house £150 to £250, single socket addition £90 to £140, EV charger installation £700 to £1,100. Rates are lower than major cities such as London or Edinburgh, but the cost of materials is the same nationally.',
  },
  {
    question: 'What electrical work is most common in Sunderland?',
    answer:
      'The most common electrical jobs in Sunderland include consumer unit replacements (upgrading from old rewirable fuse boards to modern RCD-protected units), full house rewires on post-war and pre-1970s properties, EICRs for rental properties under the 2020 Regulations, socket and lighting additions, EV charger installations as electric vehicle uptake grows, and fault-finding. The large social housing stock in areas such as Pennywell, Farringdon, and Ford means there is consistent demand for upgrade and maintenance work.',
  },
  {
    question: 'What qualifications do electricians in Sunderland need?',
    answer:
      'The required qualifications are the same across England: City & Guilds 2365 (or equivalent NVQ Level 3 in Electrical Installation) as the core qualification, plus the 18th Edition Wiring Regulations (BS 7671:2018+A3:2024) certificate. To self-certify work under Part P, registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA is required. Many Sunderland electricians also hold the City & Guilds 2391 Inspection and Testing qualification, which is needed to issue EICRs.',
  },
  {
    question: 'How often do rental properties in Sunderland need an EICR?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private rented properties in Sunderland must have a valid EICR carried out at least every five years, or at the start of each new tenancy if the property has not been inspected recently. Landlords must provide a copy of the EICR to tenants and to Sunderland City Council if requested. A satisfactory EICR (coded C1, C2, or FI items must be remediated) is required to comply with the Regulations.',
  },
  {
    question: 'Are there any local considerations for electrical work in Sunderland?',
    answer:
      'Several factors are specific to Sunderland. The Wearside industrial legacy means some older commercial and former industrial properties may have unusual supply arrangements or legacy three-phase wiring. Properties in conservation areas such as parts of the East End require care with external installations. Post-war prefab and non-traditional construction properties (Airey houses, BISF steel-framed houses) present specific rewiring challenges, including the need to treat the metal structure carefully when running cables and earthing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Sunderland rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Sunderland.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for rewires and new circuits in Sunderland's post-war housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Step-by-step guide to replacing old fuse boards with modern RCD-protected consumer units.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and consumer unit replacements in Sunderland.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules covering EICR procedures.',
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
    heading: 'Electrician in Sunderland: What You Need to Know',
    content: (
      <>
        <p>
          Sunderland is a city in Tyne and Wear in the North East of England, with a population of
          around 300,000. Once a major shipbuilding and industrial centre, the city has undergone
          significant regeneration, with Nissan's Sunderland plant, the booming Vaux development,
          and ongoing residential and commercial construction creating consistent demand for
          electrical work.
        </p>
        <p>
          For electricians, Sunderland offers a broad mix of work: post-war social housing requiring
          upgrades and rewires, a growing private rental sector needing regular EICRs, new-build
          developments in areas such as Seaham Harbour and the Riverside Sunderland zone, and
          commercial and light industrial premises across the Wearside business parks. Labour rates
          are competitive within the North East, and an electrician with strong technical skills and
          professional documentation can build a thriving practice.
        </p>
        <p>
          This guide covers the regulatory framework (Part P), the local DNO, property-specific
          challenges, typical costs, and practical advice for electricians working in Sunderland.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Sunderland',
    content: (
      <>
        <p>
          Sunderland falls under the Building Regulations for England, which means Part P applies to
          all notifiable electrical work in dwellings. The requirements are straightforward:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — NICEIC, NAPIT, or ELECSA
                registration allows electricians to self-certify Part P work and issue compliance
                certificates directly to the homeowner. This avoids the need for Building Control
                notification and inspection fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical installations must comply with
                BS 7671:2018+A3:2024 (the 18th Edition Wiring Regulations). RCD protection under
                Regulation 411.3.3 is required for all socket outlets up to 32A in dwellings, and
                for circuits in locations of increased shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — every new installation or significant
                alteration requires an Electrical Installation Certificate (EIC) as evidence of
                compliance. The EIC must be issued to the customer and a copy retained by the
                installing electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — EICRs follow Section 631 of BS 7671. Rental
                properties require an EICR every five years under the 2020 Regulations.
                Owner-occupied properties are recommended every ten years or on change of occupancy.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Sunderland City Council Building Control handles notifications for non-scheme work. The
          fee and inspection process can add cost and delay — another reason most Sunderland
          electricians choose competent person scheme registration.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Sunderland Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Sunderland's housing stock is predominantly post-war, with a mix of council-built semis,
          terraced streets, and more recent new-build estates. Understanding the property types
          helps with accurate quoting and planning:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Council Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Large estates built in the 1950s and 1960s across Pennywell, Farringdon, Thorney
              Close, and Ford. These properties often retain original wiring — rubber-insulated
              cables, rewirable fuse boards, and inadequate earthing. Consumer unit replacements and
              full rewires are common. Always check for aluminium wiring in properties of this era.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Found in Roker, Fulwell, and the Hendon area. Older wiring, solid walls in some
              properties, and potentially asbestos in ceiling materials (pre-1985 properties).
              Rewires in terraced properties require careful cable routing. EICRs often reveal C2
              items needing remediation.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              Sunderland's Riverside regeneration zone and Seaham Harbour are producing modern
              new-build properties. These are built to current standards with cavity walls, modern
              consumer units, and EV charger provisions. Work tends to be additions and
              modifications, plus EV charger installation as standard.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              The Wearside and International Advanced Manufacturing Park (IAMP) business parks
              feature modern industrial units. Legacy commercial properties in the city centre and
              Washington New Town offer maintenance and upgrade work. Three-phase supplies and
              industrial wiring standards apply.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Sunderland',
    content: (
      <>
        <p>
          The most in-demand electrical services in Sunderland reflect the age of the property stock
          and the growing private rental market:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — replacing old rewirable fuse boards
                and early MCB boards with modern dual RCD or RCBO consumer units. One of the most
                common jobs on post-war Sunderland housing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full house rewires</strong> — common on pre-1970s properties. Old rubber or
                lead-sheathed cables, inadequate socket provision, and no RCD protection make full
                rewires necessary and often urgent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for rental properties</strong> — a large and growing revenue stream.
                Sunderland has a significant buy-to-let market in areas such as Millfield, Pallion,
                and Hendon. Five-yearly EICRs are a legal requirement for all private landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing rapidly as EV ownership
                increases. Northern Powergrid G98 notification required for most domestic chargers.
                OZEV-approved installer registration needed for grant-assisted installs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional sockets and circuits</strong> — kitchen and bathroom upgrades,
                home office circuits, and garden power are common addition jobs in owner-occupied
                properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Sunderland (2026)',
    content: (
      <>
        <p>
          Sunderland sits at the lower end of North East England electrician rates, which in turn
          are lower than the national average. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£35 — £50</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£240 — £350</span>
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
                  <span className="font-semibold">£500 — £850</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£150 — £250</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£90 — £140</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Material costs are the same nationally. Sunderland electricians can compete effectively by
          offering fast turnaround, professional documentation, and reliable service — qualities
          that command a premium even in a price-sensitive market.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Sunderland',
    content: (
      <>
        <p>
          Sunderland offers solid, consistent work for qualified electricians. The combination of an
          ageing housing stock requiring upgrades, a large rental market needing EICRs, and growing
          new-build and commercial activity makes for a varied and reliable pipeline.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. Landlords in Sunderland need compliant EICRs quickly — issue them from your
                  phone before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for rewires in Sunderland's older housing. Correct sizing for voltage drop and
                  thermal constraints is critical in properties with long cable runs.
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
                  Win more work with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes to Sunderland homeowners and landlords from the
                  survey — before a competitor can.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Sunderland electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the realities of North East housing. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSunderlandPage() {
  return (
    <GuideTemplate
      title="Electrician in Sunderland | Local Electricians 2026"
      description="Find qualified electricians in Sunderland. Part P compliance, Northern Powergrid DNO, NICEIC and NAPIT registered electricians, EICR costs, consumer unit replacement, and Sunderland electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Sunderland"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Sunderland:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Sunderland's post-war housing stock and large rental sector create consistent demand for rewires, consumer unit upgrades, and five-yearly EICRs. Find NICEIC and NAPIT registered electricians who understand the local market."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Sunderland"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Sunderland Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for North East electricians working in post-war housing and rental properties. 7-day free trial."
    />
  );
}
