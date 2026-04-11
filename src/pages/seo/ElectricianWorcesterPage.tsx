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
  { label: 'Electrician in Worcester', href: '/electricians/worcester' },
];

const tocItems = [
  { id: 'overview', label: 'Worcester Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'NGED Distribution Network' },
  { id: 'property-types', label: 'Worcester Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Worcester' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Worcester is in England (Worcestershire) — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to Worcester City Council Building Control.',
  'National Grid Electricity Distribution (NGED) is the DNO for Worcester and the West Midlands. G98/G99 notifications for generation equipment and new connection applications go through NGED.',
  'Worcester has a mix of medieval timber-framed buildings in the city centre, Victorian and Edwardian terraces, interwar semis, and modern new-build development in the south and east of the city.',
  'The city sits on the River Severn and is subject to regular flooding — a consideration for electrical installations in flood-risk zones, particularly ground floor circuits and consumer unit locations.',
  "Worcester's proximity to Birmingham and the growing West Midlands economy means competitive but sustainable electrician rates, with healthy demand from both the domestic and commercial sectors.",
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Worcester?',
    answer:
      'Yes. Worcester is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and issue Building Regulations compliance certificates to customers. Unregistered electricians must notify Worcester City Council Building Control before starting notifiable work.',
  },
  {
    question: 'Who is the DNO for Worcester?',
    answer:
      'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the Distribution Network Operator for Worcester, Worcestershire, and the wider West Midlands region. All connection applications, G98 notifications for solar PV and battery storage, G99 applications for larger generation systems, and EV charger capacity notifications go through NGED.',
  },
  {
    question: 'How much does an electrician cost in Worcester?',
    answer:
      'Worcester electrician rates in 2026 are mid-range for England. Typical rates: hourly rate £38 to £55 for a qualified, registered electrician; day rate £260 to £370. Common fixed-price jobs: consumer unit replacement £520 to £880, full rewire (3-bed semi) £3,200 to £5,300, EICR (3-bed house) £160 to £260, single socket addition £95 to £145, EV charger installation £700 to £1,100.',
  },
  {
    question: 'What are the most common electrical jobs in Worcester?',
    answer:
      'Consumer unit replacements on pre-1990s housing, full rewires on Victorian terraces and post-war estates, EICRs for rental properties, socket and lighting additions, EV charger installations, and commercial electrical work for the city centre and business parks. The large stock of Victorian and Edwardian terraces in areas such as St Johns, Rainbow Hill, and Barbourne means rewire and upgrade work is consistently available.',
  },
  {
    question: 'Are there flood-related electrical considerations in Worcester?',
    answer:
      "Yes. Worcester sits on the River Severn and is one of England's most flood-prone cities. Electricians working in flood-risk areas (particularly Diglis, Battenhall, and riverside properties) should consider: consumer unit position (raised above likely flood level), use of waterproof electrical accessories in vulnerable areas, appropriate IP-rated fittings in locations prone to inundation, and the need for full testing after any flood event before reinstatement. Installing consumer units above ground floor level (first floor or high on the ground floor wall) is strongly recommended in flood-risk properties.",
  },
  {
    question: 'How often do Worcester rental properties need an EICR?',
    answer:
      'Every five years, or at the start of each new tenancy, under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Worcester has a significant student rental market (University of Worcester) and a broader private rented sector in inner-city terraces. Landlords must provide tenants with a copy of the EICR, and any C1 or C2 items must be remediated within 28 days.',
  },
  {
    question: 'What qualifications do Worcester electricians need?',
    answer:
      'City & Guilds 2365 (or NVQ Level 3 in Electrical Installation), the 18th Edition BS 7671 certificate, and competent person scheme registration (NICEIC, NAPIT, or ELECSA) to self-certify Part P work. The City & Guilds 2391 Inspection and Testing qualification is required to issue EICRs. Electricians targeting the EV charger market should register with an OZEV-approved installer scheme to offer customers the government grant.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Worcester rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Worcester.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for rewires and new circuits in Worcester's varied housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Step-by-step guide to replacing old fuse boards with modern RCD-protected consumer units.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and consumer unit replacements in Worcester.',
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
    heading: 'Electrician in Worcester: What You Need to Know',
    content: (
      <>
        <p>
          Worcester is the county town of Worcestershire, situated on the east bank of the River
          Severn in the West Midlands region, with a population of around 100,000. The city has a
          rich history — its medieval cathedral dominates the skyline, and the city centre contains
          numerous listed buildings and a conservation area centred on the high street and
          riverside.
        </p>
        <p>
          For electricians, Worcester offers a broad and varied workload: Victorian and Edwardian
          terraces needing upgrade and rewire, a growing student population (University of
          Worcester) driving rental property EICR demand, commercial work in the city centre and
          business parks, and residential development in the south and east of the city (Kempsey,
          Whittington, and Norton). The city's Severn location also creates flood-specific
          electrical considerations that local electricians need to understand.
        </p>
        <p>
          This guide covers Part P compliance, the local DNO (NGED), flood-related electrical
          considerations, pricing, and practical advice for electricians building a practice in
          Worcester.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Worcester',
    content: (
      <>
        <p>Worcester is in England, so Part P of the Building Regulations applies:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                allows self-certification of Part P notifiable work without prior council
                notification. The scheme notifies Worcester City Council Building Control and issues
                the compliance certificate to the customer.
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
                private rented properties under the Electrical Safety Standards in the Private
                Rented Sector (England) Regulations 2020. Periodic inspection methodology follows
                Section 631 of BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'National Grid Electricity Distribution: Worcester DNO',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution (NGED)</strong> is the DNO for Worcester
          and Worcestershire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — apply through NGED's connections portal.
                Essential for EV charger installations where supply capacity may need upgrading, and
                for heat pump installations on larger properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 for generation</strong> — solar PV and battery storage
                notifications. G98 online for systems up to 16A per phase. G99 pre-approval for
                larger systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency number</strong> — 105 for power cuts and emergencies across the
                NGED network area.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Worcester Property Types and Electrical Challenges',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              St Johns, Rainbow Hill, Barbourne, and Arboretum areas. Solid or partial cavity brick
              walls, ageing wiring, rewirable fuse boards in many. Rewires and consumer unit
              replacements are common. Asbestos surveys recommended for pre-1985 properties. Some
              riverside properties in Diglis and Battenhall are in flood-risk zones.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Interwar and Post-War Semis</h3>
            <p className="text-white text-sm leading-relaxed">
              Dines Green, Warndon, and Ronkswood estates. Cavity brick construction, more standard
              cable routing. Consumer unit replacements and EICRs are primary work. University of
              Worcester student accommodation in these areas drives rental EICR demand.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Kempsey, Whittington, and areas south of the city are seeing ongoing new-build
              residential development. Modern cavity-wall construction with current consumer units
              and EV charger provisions. Additions, modifications, and EV charger installation are
              the primary work.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">City Centre Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              The historic city centre has retail, hospitality, and office properties, including
              listed buildings. Commercial electrical work, emergency lighting, fire alarm systems,
              and periodic inspection of commercial premises are common in this area.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Worcester',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — very common on Worcester's large stock
                of pre-1990s housing. Upgrading rewirable fuse boards to modern RCD or RCBO consumer
                units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewires</strong> — Victorian terraces and older estates. Allow extra
                time for asbestos checks and routing in solid-wall properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — driven by student accommodation and private
                rented sector. Five-yearly obligation under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flood remediation and prevention</strong> — after flood events, testing and
                reinstatement work. Proactive flood protection installations (raised consumer units,
                waterproof accessories) in flood-risk areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Worcester (2026)',
    content: (
      <>
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
                  <span className="font-semibold">£260 — £370</span>
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
                  <span className="font-semibold">£520 — £880</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,200 — £5,300</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£160 — £260</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Worcester',
    content: (
      <>
        <p>
          Worcester offers a well-rounded market for qualified electricians. The combination of
          historic housing needing upgrades, a significant rental sector, growing new-build
          development, and the flood-specific niche creates a sustainable and varied practice.
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
                  site. Get landlords their compliance documents before you leave the property.
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
                  Stand out in Worcester with the{' '}
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
          title="Professional electrical tools for Worcester electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across Worcestershire and the West Midlands. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianWorcesterPage() {
  return (
    <GuideTemplate
      title="Electrician in Worcester | Local Electricians 2026"
      description="Find qualified electricians in Worcester. Part P compliance, NGED DNO, NICEIC and NAPIT registered electricians, EICR for landlords, flood-zone electrical work, and Worcester electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Worcester"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Worcester: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Worcester's Victorian terraces, large rental sector, and River Severn flood-risk zones create a distinctive market for qualified electricians. Find NICEIC and NAPIT registered electricians in Worcester and Worcestershire."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Worcester"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Worcester Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Worcestershire and the West Midlands. 7-day free trial."
    />
  );
}
