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
  { label: 'Electrician in Blackpool', href: '/electricians/blackpool' },
];

const tocItems = [
  { id: 'overview', label: 'Blackpool Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Blackpool Property Types' },
  { id: 'illuminations', label: 'Blackpool Illuminations' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Blackpool' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Blackpool is in Lancashire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Blackpool Council Building Control.',
  'Electricity North West (ENW) is the DNO for Blackpool. All new connections, supply upgrades, and G98/G99 generation notifications go through ENW.',
  'Blackpool has one of the highest concentrations of HMOs, guesthouses, and holiday accommodation in the UK. This drives significant EICR and commercial electrical compliance work.',
  'The town\'s Victorian and Edwardian guest house stock is a key market for electricians. Many properties have ageing wiring and require upgrading to meet current BS 7671 standards and satisfy licensing requirements.',
  'Labour rates in Blackpool are among the lower end for the North West — typically £38 to £55 per hour for a qualified registered electrician in 2026, reflecting the local economy.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Blackpool?',
    answer:
      'Yes. Blackpool is in England and Part P of the Building Regulations 2010 applies. Notifiable work — new circuits, consumer unit replacements, work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Blackpool Council Building Control before starting. An Electrical Installation Certificate (EIC) under BS 7671 and a Part P compliance certificate must be issued on completion.',
  },
  {
    question: 'What are the electrical requirements for Blackpool guesthouses and HMOs?',
    answer:
      'Guesthouses and HMOs in Blackpool must comply with both the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 and Blackpool Council\'s HMO licensing conditions. Requirements include: a valid EICR every five years (or at change of tenancy), fire alarm systems to BS 5839-6 at the appropriate category for the size and risk level of the property, emergency lighting in common areas for larger HMOs, adequate socket provision per room, and appropriate RCD protection under BS 7671 regulation 411.3.3. Blackpool Council actively enforces HMO licensing conditions — non-compliance can result in fines and licence revocation.',
  },
  {
    question: 'Who is the DNO for Blackpool?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Blackpool and the wider Lancashire coast. For new connections, supply upgrades (for EV chargers or heat pumps), and G98/G99 generation notifications for solar PV or battery storage, you deal with ENW. ENW\'s online connections portal handles most application types. G98 notifications are straightforward; G99 applications for larger generation systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: 'How much does an EICR cost in Blackpool?',
    answer:
      'An EICR in Blackpool typically costs £130 to £230 for a standard residential property. Guesthouse and HMO EICRs cost more, reflecting the larger number of circuits and the time required for a thorough inspection. Blackpool has some of the lowest EICR prices in the North West, reflecting the competitive local market and the high volume of EICR work available. Landlords and guesthouse operators should budget for remedial work costs on top of the EICR fee.',
  },
  {
    question: 'What is the typical cost of rewiring a Blackpool guesthouse?',
    answer:
      'Rewiring a typical Blackpool guesthouse (6 to 10 bedrooms over 3 to 4 storeys) typically costs £8,000 to £18,000, depending on the number of rooms, the complexity of the existing wiring, and whether fire alarm and emergency lighting systems are included. Victorian guest house properties have solid walls, multiple storeys, and complex cable routes — the work is significantly more involved than a standard domestic rewire. Always conduct a detailed survey and allow substantial contingency for older guesthouses where the full extent of the electrical installation may not be visible until the work is underway.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Blackpool?',
    answer:
      'The requirements are standard across England. You need City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation), plus the 18th Edition (BS 7671:2018+A3:2024) certificate. For self-certification under Part P, NICEIC or NAPIT registration is required. Electricians working on Blackpool\'s commercial guesthouse and hospitality sector should also consider additional qualifications in fire alarm systems (BS 5839) and emergency lighting (BS 5266) to offer a complete compliance service to commercial customers.',
  },
  {
    question: 'Is there a market for electrical work related to the Blackpool Illuminations?',
    answer:
      'The Blackpool Illuminations are operated by Blackpool Council and maintained by specialist contractors. The core illuminations electrical work is contracted out through council procurement processes. However, the Illuminations season (September to November) brings increased footfall and commercial activity to the town, creating demand for electrical work in hotels, guesthouses, bars, and entertainment venues. Electricians who establish relationships with the hospitality sector can benefit from this seasonal increase in commercial electrical demand.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Blackpool.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Blackpool guesthouses, HMO landlords, and residential properties.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for guesthouse rewires and new circuits in Blackpool\'s multi-storey Victorian properties.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Blackpool — ENW notification and supply upgrade guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote guesthouse rewires, HMO electrical upgrades, and consumer unit replacements in Blackpool.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — covering inspection and testing for domestic and commercial properties.',
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
    heading: 'Electrician in Blackpool: What You Need to Know',
    content: (
      <>
        <p>
          Blackpool is the UK's most visited seaside resort, with a distinctive economy built
          around tourism, entertainment, and hospitality. For electricians, this creates a unique
          market dominated by the guesthouse and HMO sector alongside standard residential work.
          The town has one of the highest concentrations of guest accommodation in the UK —
          hundreds of Victorian and Edwardian guesthouses, hotels, and holiday lets, many with
          ageing electrical installations that need upgrading to meet current standards and
          satisfy council licensing requirements.
        </p>
        <p>
          Blackpool also has significant areas of deprived residential housing, with older
          wiring stock that generates consistent demand for rewiring, consumer unit upgrades,
          and EICR remedial work. The town's regeneration programme has brought some new
          residential and commercial development, adding further variety to the local
          electrician's workload.
        </p>
        <p>
          This guide covers the regulatory requirements, DNO contacts, local property types,
          typical jobs, pricing, and practical advice for electricians working in and around
          Blackpool.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Blackpool',
    content: (
      <>
        <p>
          Blackpool is in England and Part P of the Building Regulations 2010 applies to all
          domestic electrical work. For guesthouses, HMOs, and commercial premises, additional
          licensing and compliance requirements also apply:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P — domestic electrical work</strong> — notifiable work must be
                self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or
                notified to Blackpool Council Building Control. An EIC and Part P compliance
                certificate are required on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Blackpool Council's HMO licensing conditions
                require a valid EICR every five years, appropriate fire alarm and emergency
                lighting systems, and adequate socket provision. Blackpool has mandatory HMO
                licensing for properties occupied by five or more people from two or more
                households.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with BS
                7671:2018+A3:2024. RCD protection is required for socket outlet circuits under
                regulation 411.3.3 and for circuits in kitchens, bathrooms, and outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — private landlords in Blackpool
                must have a valid EICR every five years under The Electrical Safety Standards
                in the Private Rented Sector (England) Regulations 2020, with any C1/C2 defects
                remedied within 28 days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Blackpool Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Blackpool's property stock is distinctive and presents specific electrical challenges:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Guesthouses</h3>
            <p className="text-white text-sm leading-relaxed">
              The large Victorian and Edwardian terraces along and near the promenade were
              originally built as guesthouses and holiday accommodation. Many still operate as
              such. These multi-storey properties have complex electrical installations serving
              multiple bedrooms, communal areas, and commercial kitchens. Ageing wiring is
              common. Full rewires are significant projects requiring careful planning.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HMO and Bedsit Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Blackpool has a high concentration of HMOs and bedsit conversions, particularly
              in the South Shore and Bloomfield areas. These properties require regular EICRs,
              fire alarm systems, and adequate electrical provision per room. Non-compliance
              with Blackpool Council HMO licensing conditions can result in enforcement action.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Residential Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Away from the tourist areas, Blackpool has extensive residential terraced streets
              in areas such as Layton, Marton, and Bispham. These properties range from
              Victorian to inter-war and post-war construction. Consumer unit upgrades, rewires,
              and EICR compliance work are the primary job types.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hotels and Entertainment Venues</h3>
            <p className="text-white text-sm leading-relaxed">
              Blackpool's hotels, theatres, entertainment venues, and amusement arcades require
              commercial electrical work to appropriate standards. The Winter Gardens and Pleasure
              Beach are major venues with specialist electrical requirements. Commercial work
              requires appropriate qualifications and understanding of BS 7671 Part 7 special
              locations.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'illuminations',
    heading: 'The Blackpool Illuminations and Seasonal Electrical Demand',
    content: (
      <>
        <p>
          The Blackpool Illuminations (September to November) is one of the world's largest light
          shows, stretching 6 miles along the Promenade. While the core illuminations are operated
          and maintained by Blackpool Council's specialist teams, the Illuminations season
          significantly affects the electrical market in Blackpool:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increased hospitality demand</strong> — the Illuminations period brings
                large numbers of visitors and increases commercial activity across the town.
                Hotels, guesthouses, bars, and restaurants often use the summer period to
                carry out electrical maintenance, upgrades, and compliance work before the
                busy Illuminations season.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Festive and temporary lighting</strong> — commercial premises often
                commission additional external lighting and festive installations for the
                Illuminations period. Temporary outdoor lighting must comply with BS 7671
                requirements for outdoor installations, including appropriate weatherproofing
                and RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year-round ENW collaboration</strong> — the Illuminations require a
                substantial and reliable power supply. Electricians working on commercial
                premises near the Promenade should be aware of the DNO's infrastructure in
                the area and factor in any planned maintenance work when scheduling jobs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Blackpool',
    content: (
      <>
        <p>
          The most in-demand electrical services in Blackpool in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for guesthouses, HMOs, and landlords</strong> — this is the
                core of the Blackpool electrician's workload. The enormous volume of rental
                and holiday accommodation creates consistent and year-round EICR demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guesthouse and HMO rewires</strong> — many of Blackpool's guesthouses
                and HMOs have electrical installations that are decades old and in need of
                full replacement. These are large and complex projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old fuse boards are extremely
                common across Blackpool's residential and commercial property stock. Consumer
                unit upgrades are among the most frequently requested jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm installations and maintenance</strong> — Blackpool's
                guesthouse and HMO market requires fire alarm systems to BS 5839-6. Installation
                and annual maintenance contracts are a significant revenue stream for Blackpool
                electricians who hold the relevant qualifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Blackpool (2026)',
    content: (
      <>
        <p>
          Blackpool electrician rates in 2026 are at the lower end of the North West range,
          reflecting the local economy and competitive market:
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
                  <span className="font-semibold">£255 — £380</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£330 — £470</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£490 — £850</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£90 — £150</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£3,000 — £4,800</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£130 — £230</span>
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
          Commercial guesthouse and hotel electrical work commands a premium over domestic
          rates, reflecting the scale and complexity of the installations. Multi-storey guesthouse
          rewires are typically priced on a day-rate basis following a detailed survey.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Blackpool',
    content: (
      <>
        <p>
          Blackpool offers a distinctive market for electricians with strong guesthouse, HMO, and
          commercial sector expertise. The high volume of EICR and compliance work provides a
          consistent base, and the guesthouse rewire market offers higher-value projects.
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
                  on site. For Blackpool's high volume of guesthouse and HMO work, delivering
                  documentation the same day keeps landlords and operators compliant.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting for Guesthouses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce detailed quotes for Blackpool guesthouse rewires and HMO upgrades.
                  Professional quotes help win higher-value commercial jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Blackpool electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the guesthouse, HMO, and rental market in Blackpool. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBlackpoolPage() {
  return (
    <GuideTemplate
      title="Electrician in Blackpool | Local Electricians 2026"
      description="Find qualified electricians in Blackpool. Part P compliance, NICEIC registered, EICR for guesthouses and HMOs, guesthouse rewiring, consumer unit replacement, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Blackpool"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Blackpool:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Blackpool's unique mix of Victorian guesthouses, HMOs, and a huge hospitality economy demands electricians with expertise in EICR compliance, guesthouse rewiring, fire alarm systems, and Part P documentation."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Blackpool"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Blackpool Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the guesthouse, HMO, and rental market that defines Blackpool's electrical industry. 7-day free trial."
    />
  );
}
