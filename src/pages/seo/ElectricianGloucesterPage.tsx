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
  { label: 'Electrician in Gloucester', href: '/electricians/gloucester' },
];

const tocItems = [
  { id: 'overview', label: 'Gloucester Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'NGED Distribution Network' },
  { id: 'property-types', label: 'Gloucester Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Gloucester' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Gloucester is in England (Gloucestershire) — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to Gloucester City Council Building Control.',
  'National Grid Electricity Distribution (NGED) is the DNO for Gloucester and the South West. G98/G99 notifications for generation equipment and new connection applications go through NGED.',
  'Gloucester has a wide range of housing — from Victorian terraces and Georgian properties near the docks to post-war council estates and modern new-build development in Quedgeley and Longford.',
  'The Gloucester Docks regeneration has transformed the historic Victorian docklands into a mixed residential, retail, and commercial quarter, creating electrical work opportunities in converted warehouses and new-build apartments.',
  'Gloucester is more affordable than nearby Cheltenham, offering electricians competitive rates with strong demand from a substantial rental market and an ageing housing stock needing upgrades.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Gloucester?',
    answer:
      'Yes. Gloucester is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and issue Building Regulations compliance certificates. Unregistered electricians must notify Gloucester City Council Building Control before starting notifiable work and pay an inspection fee.',
  },
  {
    question: 'Who is the DNO for Gloucester?',
    answer:
      'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the Distribution Network Operator for Gloucester, Gloucestershire, and the wider South West region. All connection applications, G98 notifications for solar PV and battery storage, G99 applications for larger systems, and new service connections go through NGED. The emergency number is 105.',
  },
  {
    question: 'How much does an electrician cost in Gloucester?',
    answer:
      'Gloucester electrician rates in 2026 are slightly lower than nearby Cheltenham, reflecting the different market. Typical rates: hourly rate £36 to £52 for a qualified, registered electrician; day rate £245 to £360. Common fixed-price jobs: consumer unit replacement £490 to £840, full rewire (3-bed semi) £3,000 to £5,000, EICR (3-bed house) £155 to £250, EV charger installation £680 to £1,050.',
  },
  {
    question: 'What are the most common electrical jobs in Gloucester?',
    answer:
      'Consumer unit replacements on pre-1990s housing, full rewires on Victorian terraces and post-war estates, EICRs for the large private rental market (including student accommodation), EV charger installations, socket and lighting additions, and commercial electrical work in the docks regeneration area. Converted warehouse apartments in the docks often require specialist work — older buildings with unusual service arrangements and high-specification fit-out requirements.',
  },
  {
    question: 'How does the Gloucester Docks regeneration affect electrical work?',
    answer:
      'The Gloucester Docks area has been extensively regenerated over the past 20 years. Victorian warehouses have been converted to apartments and offices, and new apartment blocks have been built. Electrical work in converted warehouse apartments requires careful planning: existing structural features must be preserved, cable routes through original masonry walls are restricted, and the high-specification finish expected by buyers and tenants means cable management and fitting quality must be excellent. Commercial premises in the docks (restaurants, shops, offices) also generate electrical maintenance and fit-out work.',
  },
  {
    question: 'Are there flood risks in Gloucester that affect electrical work?',
    answer:
      'Yes. Gloucester, like Worcester, is on the River Severn and is subject to periodic flooding. The Westgate and Kingsholm areas in particular have experienced significant flood events. Electricians working in flood-risk areas should consider consumer unit positioning (above likely flood level), waterproof fittings in vulnerable ground floor areas, and appropriate IP-rated accessories. After a flood event, a full EICR-style assessment is required before reinstatement of the electrical installation.',
  },
  {
    question: 'How often do Gloucester rental properties need an EICR?',
    answer:
      'Every five years, or at the start of each new tenancy, under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Gloucester has a significant private rented sector and a growing student rental market (University of Gloucestershire campus is in Cheltenham, but many students live in Gloucester). Landlords must provide tenants with a copy of the EICR and remediate any C1 or C2 defects within 28 days.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Gloucester rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Gloucester.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for rewires and new circuits across Gloucester's varied housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description: 'Replace old fuse boards with modern RCD-protected consumer units — step by step.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and EV charger installations in Gloucester.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 — the qualification required to carry out and issue EICRs.',
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
    heading: 'Electrician in Gloucester: What You Need to Know',
    content: (
      <>
        <p>
          Gloucester is an historic cathedral city in Gloucestershire, on the River Severn, with a
          population of around 135,000. The city has a proud Roman and medieval heritage — the
          cathedral is one of England's finest — and a Victorian industrial legacy centred on the
          docks, which were once the largest inland docks in England.
        </p>
        <p>
          Today, Gloucester is undergoing sustained regeneration. The docks area has been
          transformed into a mixed residential, retail, and leisure destination. The city centre
          benefits from investment, and residential development continues in Quedgeley, Longford,
          and the A40 corridor. The economy is diverse, with logistics, retail, public sector, and
          growing professional services.
        </p>
        <p>
          For electricians, Gloucester offers consistent demand across domestic and commercial
          sectors. The large stock of Victorian terraces in inner-city areas needs regular upgrade
          work. The private rental market generates EICR demand. The docks regeneration creates
          specialist high-specification conversion and new-build electrical work. And flood-risk
          considerations add a specific dimension that local electricians need to understand.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Gloucester',
    content: (
      <>
        <p>Gloucester is in England, so Part P of the Building Regulations applies:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                enables self-certification of Part P notifiable work. The scheme notifies Gloucester
                City Council Building Control on the electrician's behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS
                7671:2018+A3:2024. RCD protection under Regulation 411.3.3 is mandatory for socket
                outlets up to 32A and for circuits in locations of increased shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for rental properties</strong> — five-yearly EICRs required for all
                private rented properties under the 2020 Regulations. Section 631 of BS 7671 governs
                periodic inspection methodology.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'National Grid Electricity Distribution: Gloucester DNO',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution (NGED)</strong> is the DNO for Gloucester
          and the wider South West:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — apply through NGED's connections portal for new
                supplies, service upgrades, and temporary construction supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99</strong> — solar PV and battery storage notifications. G98 for
                systems up to 16A per phase online. G99 pre-approval for larger systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing</strong> — most Gloucester properties are supplied on TN-C-S (PME)
                systems. Older city centre properties may have TN-S from original lead service
                cables. Always confirm at the intake before specifying work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Gloucester Property Types and Electrical Challenges',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Inner-city terraced streets in Kingsholm, Barton, and Tredworth. Older wiring,
              rewirable fuse boards, and limited socket provision are common. Full rewires and
              consumer unit replacements are frequently needed. Some riverside properties in
              Westgate are in flood-risk zones.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Docks Conversions</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian warehouses in the docks converted to apartments and offices. Specialist
              electrical work required — preserved structural features, high-specification fit-out,
              complex building management systems. Higher daily rates justified by the complexity
              and finish standard expected.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War and Modern Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Quedgeley, Longlevens, and Hucclecote. Cavity brick semis and modern new-builds.
              Standard cable routing, consumer unit replacements, and EV charger installations are
              the primary work. Good market for EICR on 1970s–1990s properties.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial City Centre</h3>
            <p className="text-white text-sm leading-relaxed">
              Retail, hospitality, and offices in the city centre and Kings Square regeneration
              area. Commercial electrical maintenance, emergency lighting, fire alarm systems, and
              fit-out work for new restaurants, bars, and offices.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Gloucester',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — high demand on Gloucester's older
                housing stock. Upgrading to modern RCD or RCBO consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewires</strong> — Victorian terraces in Kingsholm and Barton. Allow
                extra time for asbestos assessment in pre-1985 properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — large and growing demand from Gloucester's
                rental sector. Five-yearly obligation under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Docks specialist work</strong> — high-specification electrical fit-out in
                converted apartments and commercial premises in the regenerated docks area.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Gloucester (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£36 — £52</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£245 — £360</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£68 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£490 — £840</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£155 — £250</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£680 — £1,050</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Docks conversion work commands a premium over standard domestic rates. Specialist
          high-specification electrical work in converted warehouses typically attracts rates 10% to
          20% above standard domestic pricing.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Gloucester',
    content: (
      <>
        <p>
          Gloucester offers a well-rounded market for qualified electricians. The combination of
          Victorian housing requiring upgrades, an active rental market, docks regeneration
          specialist work, and growing new-build development creates varied and sustainable demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. Get landlords their compliance documents the same day.
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
                  Win Gloucester jobs with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes on survey day.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Gloucester electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across Gloucestershire and the South West. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianGloucesterPage() {
  return (
    <GuideTemplate
      title="Electrician in Gloucester | Local Electricians 2026"
      description="Find qualified electricians in Gloucester. Part P compliance, NGED DNO, NICEIC and NAPIT registered electricians, EICR for landlords, docks conversion electrical work, and Gloucester electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Gloucester"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Gloucester:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Gloucester's Victorian terraces, docks regeneration, and large rental sector create diverse demand for rewires, EICRs, and specialist electrical work. Find NICEIC and NAPIT registered electricians in Gloucester and Gloucestershire."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Gloucester"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Gloucester Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Gloucestershire and the South West. 7-day free trial."
    />
  );
}
