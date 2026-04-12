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
  { label: 'Electrician in Hull', href: '/electricians/hull' },
];

const tocItems = [
  { id: 'overview', label: 'Hull Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'Northern Powergrid and HUMBER DNO' },
  { id: 'property-types', label: 'Hull Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Hull' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hull (Kingston upon Hull) is in England — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to Hull City Council Building Control.',
  'Northern Powergrid is the Distribution Network Operator for Hull and the East Riding of Yorkshire. All DNO notifications for generation, EV chargers, and new connections go through Northern Powergrid.',
  'Hull has a large stock of Victorian terraced housing in the city centre and inner suburbs, alongside post-war council estates in areas such as Bransholme. Many of these properties have ageing electrical installations needing upgrade.',
  "Hull's wind energy sector — with major offshore wind farms in the Humber Estuary — creates specialist demand for qualified electricians in wind turbine manufacturing and offshore support roles.",
  'Electrician rates in Hull are among the lowest in England, but consistent demand from the rental market and ageing housing stock provides steady work for qualified practitioners.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Hull?',
    answer:
      'Yes. Hull is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. Notifiable work includes new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and issue Building Regulations compliance certificates. Unregistered electricians must notify Hull City Council Building Control before starting work.',
  },
  {
    question: 'Who is the DNO for Hull?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Hull and the surrounding East Riding of Yorkshire. All connection applications, G98 notifications for solar PV and battery storage, and G99 applications for larger generation systems go through Northern Powergrid. Their connections process is online, and G98 notifications for systems up to 16A per phase are processed within five working days.',
  },
  {
    question: 'How much does an electrician cost in Hull?',
    answer:
      'Hull electrician rates in 2026 are at the lower end of the national range. Typical rates: hourly rate £33 to £48 for a qualified, registered electrician; day rate £220 to £330. Common fixed-price jobs: consumer unit replacement £450 to £800, full rewire (3-bed terrace) £2,800 to £4,500, EICR (3-bed house) £140 to £230, single socket addition £85 to £130, EV charger installation £650 to £1,000.',
  },
  {
    question: 'What are the most common electrical jobs in Hull?',
    answer:
      'The most common electrical jobs in Hull include consumer unit replacements (upgrading old rewirable fuse boards to modern RCD-protected units), full house rewires on Victorian terraces and post-war housing, EICRs for the large rental sector, socket and lighting additions, and EV charger installations. The Bransholme and Orchard Park estates have large stocks of 1960s–1970s housing where consumer unit upgrades are frequently needed.',
  },
  {
    question: 'What qualifications do Hull electricians need?',
    answer:
      'The same qualifications as elsewhere in England: City & Guilds 2365 (or NVQ Level 3 in Electrical Installation), the 18th Edition (BS 7671:2018+A3:2024) certificate, and registration with a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify Part P work. The City & Guilds 2391 Inspection and Testing qualification is required to issue EICRs. Electricians working in the offshore wind sector will also need GWO (Global Wind Organisation) basic safety training.',
  },
  {
    question: "Are there any specific electrical challenges in Hull's Victorian terraces?",
    answer:
      "Hull's Victorian terraced streets in areas such as Newland Avenue, Avenues, and Holderness Road have solid brick walls (partial or full), lath-and-plaster ceilings, and original Victorian wiring in many cases. Rewiring these properties requires careful cable routing — through floor voids where accessible, or surface-mounted mini-trunking where not. Asbestos may be present in pre-1985 ceiling coatings, floor tiles, and insulating board. An asbestos survey is recommended before invasive work on pre-1985 properties.",
  },
  {
    question: 'How often do Hull rental properties need an EICR?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private rented properties in Hull must have a valid EICR at least every five years, or at the start of each new tenancy if the property is not recently inspected. Hull has a significant buy-to-let market, particularly in inner-city terraced areas. Any C1 or C2 defects must be remediated within 28 days, with evidence provided to the tenant and the council if requested.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Hull rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Hull.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for rewires in Hull's Victorian terraces and post-war housing.",
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
      'Send professional PDF quotes for rewires, EICRs, and consumer unit replacements in Hull.',
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
    heading: 'Electrician in Hull: What You Need to Know',
    content: (
      <>
        <p>
          Kingston upon Hull — universally known as Hull — is a city and unitary authority on the
          north bank of the Humber Estuary in East Yorkshire, with a population of around 260,000.
          The city has a proud maritime history and was UK City of Culture in 2017. Today, Hull's
          economy is driven by the port, offshore wind energy (the Siemens Gamesa blade
          manufacturing plant in Alexandra Dock is one of the largest in the world), food
          processing, and a growing retail and services sector.
        </p>
        <p>
          For electricians, Hull offers a broad workload. The city has one of the UK's highest
          proportions of pre-war housing, with extensive Victorian and Edwardian terraces requiring
          upgrade and rewire work. The large private rental sector creates consistent EICR demand,
          and the offshore wind industry creates specialist opportunities for qualified electricians
          with additional certifications.
        </p>
        <p>
          This guide covers Part P compliance, the local DNO (Northern Powergrid), Hull's property
          stock, pricing, and practical advice for electricians building a practice in the city.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Hull',
    content: (
      <>
        <p>
          Hull is in England, so Part P of the Building Regulations applies to all notifiable
          electrical work in dwellings. The compliance framework:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                allows self-certification of Part P work. The electrician issues a Building
                Regulations compliance certificate to the homeowner within 30 days of completion.
                The scheme notifies Hull City Council Building Control on behalf of the electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS
                7671:2018+A3:2024. RCD protection under Regulation 411.3.3 is mandatory for socket
                outlets up to 32A in dwellings and for circuits in locations of increased shock risk
                (bathrooms, kitchens, outdoors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for rental properties</strong> — the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020 require five-yearly EICRs on all
                private rented properties. Periodic inspection follows Section 631 of BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: "Northern Powergrid: Hull's Distribution Network Operator",
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> serves Hull and the East Riding of Yorkshire. All DNO
          interactions for Hull electricians go through Northern Powergrid:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and capacity upgrades</strong> — online application through
                Northern Powergrid's connections portal. Essential for EV charger installations
                where the existing supply may need upgrading, and for heat pump installations on
                larger properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 for solar PV and battery storage</strong> — G98 notification for
                systems up to 16A per phase is processed online within five working days. G99
                applications for larger systems require pre-approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing in Hull properties</strong> — most Hull properties are supplied on
                TN-C-S (PME) systems. Some older properties, particularly in the city centre and
                near the docks, may have TN-S earthing from the original lead-sheathed supply.
                Always confirm at the intake.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Hull Property Types and Electrical Challenges',
    content: (
      <>
        <p>Hull's housing stock is predominantly pre-war and post-war brick construction:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Extensive Victorian terraced housing in areas such as Avenues, Newland Avenue, and
              Holderness Road. Solid or partial cavity brick walls, lath-and-plaster ceilings, and
              often original or early-replacement wiring. Rewires are common. Asbestos surveys
              recommended in pre-1985 properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Council Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large 1960s–1980s estates in Bransholme, Orchard Park, and Longhill. Cavity brick
              construction, standard cable routing. Consumer unit replacements and rewires are
              common on these properties. Asbestos textured coatings (artex) may be present on
              pre-1985 ceilings.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern New Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              New residential development in areas such as Kingswood and on the eastern outskirts.
              Modern cavity-wall construction, current consumer units, and EV charger provisions.
              Work is typically additions and EV charger installation.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Port</h3>
            <p className="text-white text-sm leading-relaxed">
              Hull's port complex, the Siemens wind turbine plant, and commercial premises in the
              city centre and retail parks offer commercial electrical work. Three-phase supplies,
              industrial wiring, and specialist installations are common in this sector.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Hull',
    content: (
      <>
        <p>The most in-demand electrical services in Hull:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — the single most common job in Hull.
                Huge numbers of properties still have rewirable fuse boards or early MCB boards
                without RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewires</strong> — extensive demand on pre-war and 1960s housing.
                Victorian terrace rewires require care with solid-wall cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — Hull has a large private rented sector.
                Landlords must provide a valid EICR under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing in suburban new-build areas.
                Northern Powergrid notification required where supply capacity is a concern.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Hull (2026)',
    content: (
      <>
        <p>
          Hull sits at the lower end of England's electrician rate range. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£33 — £48</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£220 — £330</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £95/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£450 — £800</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£2,800 — £4,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£140 — £230</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£650 — £1,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Material costs are the same nationally regardless of location. Hull electricians who
          invest in professional documentation, fast turnaround, and scheme registration can build
          strong customer loyalty in a competitive market.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Hull',
    content: (
      <>
        <p>
          Hull provides consistent work for qualified electricians willing to engage with the local
          market. The ageing housing stock, large rental sector, and growing EV and wind energy
          demand create a varied and sustainable workload.
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
                  site. Landlords need compliant EICR documents quickly — deliver them from your
                  phone before leaving the property.
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
                  Win work in Hull's competitive market with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes on the day of the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Hull electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working in Yorkshire and the Humber. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianHullPage() {
  return (
    <GuideTemplate
      title="Electrician in Hull | Local Electricians 2026"
      description="Find qualified electricians in Hull. Part P compliance, Northern Powergrid DNO, NICEIC and NAPIT registered electricians, EICR for landlords, consumer unit replacement, and Hull electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hull"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Hull: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Hull's extensive Victorian terraces, large rental sector, and growing offshore wind industry create consistent demand for rewires, EICRs, and consumer unit upgrades. Find NICEIC and NAPIT registered electricians in Kingston upon Hull."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Hull"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Hull Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Yorkshire and the Humber. 7-day free trial."
    />
  );
}
