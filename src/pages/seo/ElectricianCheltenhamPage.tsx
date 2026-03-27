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
  Landmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Cheltenham', href: '/electricians/cheltenham' },
];

const tocItems = [
  { id: 'overview', label: 'Cheltenham Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'Western Power Distribution DNO' },
  { id: 'regency', label: 'Regency Properties and Conservation Areas' },
  { id: 'property-types', label: 'Cheltenham Property Types' },
  { id: 'pricing', label: 'Electrician Rates in Cheltenham' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cheltenham is in England (Gloucestershire) — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to Cheltenham Borough Council Building Control.',
  'National Grid Electricity Distribution (formerly Western Power Distribution) is the DNO for Cheltenham and the South West and West Midlands. G98/G99 notifications and new connection applications go through NGED.',
  'Cheltenham has an exceptionally high concentration of Regency architecture — terraces, crescents, and villas from the 1820s–1840s. Many are listed buildings in conservation areas, requiring listed building consent for external electrical work.',
  'The cyber security and GCHQ presence in Cheltenham creates a well-paid professional population with high expectations for quality electrical work, smart home installations, and premium kitchen and bathroom electrical fit-outs.',
  'Cheltenham\'s Regency properties have high ceilings, ornate plasterwork, and solid masonry walls. Rewiring and new installations require careful planning to preserve original features — this commands a premium over standard rates.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Cheltenham?',
    answer:
      'Yes. Cheltenham is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and issue Building Regulations compliance certificates. Unregistered electricians must notify Cheltenham Borough Council Building Control before starting notifiable work.',
  },
  {
    question: 'Who is the DNO for Cheltenham?',
    answer:
      'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the Distribution Network Operator for Cheltenham, Gloucestershire, and the wider South West and West Midlands region. All connection applications, G98 notifications for solar PV and battery storage, G99 applications for larger systems, and EV charger capacity notifications go through NGED.',
  },
  {
    question: 'Do I need listed building consent for electrical work in Cheltenham?',
    answer:
      'It depends on the work and the property. Cheltenham has over 5,000 listed buildings, concentrated in the central Regency areas — Montpellier, Pittville, and the Promenade. Listed building consent is required for any work that affects the character of a listed building. This includes external electrical installations (EV chargers, external lighting, security cameras with visible cabling), new meter boxes, and significant internal alterations. Internal rewiring is generally permitted if carried out carefully without damaging original features such as cornices, ceiling roses, and dado rails. Always advise customers to check with Cheltenham Borough Council planning before committing to external work on listed properties.',
  },
  {
    question: 'How much does an electrician cost in Cheltenham?',
    answer:
      'Cheltenham electrician rates in 2026 are above the national average, reflecting the area\'s affluence and the premium for working in period properties. Typical rates: hourly rate £45 to £65 for a qualified, registered electrician; day rate £300 to £450 for a sole trader. Common fixed-price jobs: consumer unit replacement £600 to £1,000, full rewire (3-bed Regency terrace) £5,000 to £8,500, EICR £200 to £320, EV charger installation £850 to £1,350. Listed property and conservation area work commands a further premium.',
  },
  {
    question: 'What are the challenges of rewiring Regency properties in Cheltenham?',
    answer:
      'Cheltenham\'s Regency terraces and villas — built in the 1820s–1850s — present significant electrical challenges. Walls are solid masonry, making concealed wiring impractical without major plaster damage. High ceilings (3.5m+) and ornate cornices and ceiling roses must be preserved. Rewiring typically involves surface-mounted mini-trunking routed carefully to minimise visual impact, or running cables through floor voids between floors where accessible. Original features such as dado rails, picture rails, and skirting boards offer opportunities for discreet cable routes. An experienced electrician can produce a rewire that is both fully compliant and sympathetic to the original architecture.',
  },
  {
    question: 'Is there demand for smart home electrical installations in Cheltenham?',
    answer:
      'Yes. Cheltenham\'s large professional population — many working in cyber security, financial services, and related sectors — drives significant demand for smart home systems, multi-room audio, enhanced socket provision, dedicated home office circuits, and EV charger installations. This is a higher-value market segment where quality of work and professional approach are more important than being the cheapest quote. Smart lighting control, CAT6 data cabling, and whole-home electrical upgrades are common add-ons to standard rewire and upgrade projects.',
  },
  {
    question: 'How often do Cheltenham rental properties need an EICR?',
    answer:
      'Every five years, or at the start of each new tenancy, under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Cheltenham has a significant rental market, particularly around the university areas and in converted Regency properties let as flats. EICRs on converted Victorian and Regency properties often reveal C2 defects — particularly inadequate earthing, absence of RCD protection, and ageing wiring — requiring remediation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Cheltenham rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Cheltenham.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires and new circuits in Cheltenham\'s Regency and Victorian properties.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Cheltenham — including listed building and conservation area considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Regency property rewires, consumer unit upgrades, and smart home work with Cheltenham pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering EICR procedures.',
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
    heading: 'Electrician in Cheltenham: What You Need to Know',
    content: (
      <>
        <p>
          Cheltenham is a spa town in Gloucestershire with a population of around 120,000.
          Known for its exceptional Regency architecture, the Cheltenham Gold Cup and Festival,
          and as the home of GCHQ, Cheltenham has a distinctly affluent character that is
          reflected in its property market and the demand for electrical services.
        </p>
        <p>
          For electricians, Cheltenham offers a premium market. The Regency townhouses and
          terraces that define the centre — Montpellier, Pittville, the Promenade, and the
          Suffolks — are among the finest examples of Regency architecture in England and require
          a careful, experienced approach to electrical work. Beyond the heritage core,
          Cheltenham has Victorian and Edwardian suburbs, post-war estates, and modern
          new-build development in areas such as West Cheltenham (the Cyber Central garden town
          development around GCHQ) and South Cheltenham.
        </p>
        <p>
          This guide covers Part P compliance, the local DNO (National Grid Electricity
          Distribution), heritage property considerations, pricing, and practical advice for
          electricians working in Cheltenham.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham is in England, so Part P of the Building Regulations applies to notifiable
          electrical work in dwellings:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                enables self-certification. The scheme notifies Cheltenham Borough Council
                Building Control and issues the compliance certificate to the customer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS 7671:2018+A3:2024.
                RCD additional protection is mandatory for socket outlets
                in dwellings and for circuits in locations of increased shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent</strong> — required for external electrical work
                on listed buildings. Cheltenham Borough Council planning department handles consent
                applications. Always check the listing status before quoting for external work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for rental properties</strong> — five-yearly EICRs required under
                the Electrical Safety Standards in the Private Rented Sector (England) Regulations
                2020. Section 631 of BS 7671 governs the periodic inspection methodology.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'National Grid Electricity Distribution: Cheltenham DNO',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution (NGED)</strong>, formerly Western
          Power Distribution, is the DNO for Cheltenham and Gloucestershire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — apply through NGED's connections portal
                for new supplies, service upgrades, and generation connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99</strong> — solar PV and battery storage. G98 for systems up
                to 16A per phase is an online notification. G99 for larger systems requires
                NGED pre-approval, typically taking several weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing</strong> — most Cheltenham properties are supplied on TN-C-S
                (PME) systems. Older Regency properties in the town centre may have TN-S earthing
                from original supply cables. Always confirm the earthing arrangement at the intake.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regency',
    heading: 'Regency Properties and Conservation Areas in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham's Regency heritage is one of the finest in England and has direct implications
          for electrical work in the town centre and surrounding areas:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over 5,000 listed buildings</strong> — Cheltenham has one of the highest
                concentrations of listed buildings in England. Montpellier, Pittville, and the
                Promenade are among the most significant. Many residential streets in the centre
                are entirely listed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>External work requires consent</strong> — EV charger mounting, external
                lighting, security cameras with visible cabling, and new meter box locations on
                listed buildings all require listed building consent from Cheltenham Borough Council.
                This applies regardless of how minor the work appears.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — even unlisted buildings in
                conservation areas may require permission for visible external alterations. The
                six Cheltenham conservation areas cover much of the town centre. Check with
                Cheltenham Borough Council planning before quoting external work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal rewiring approach</strong> — preserve ornamental plasterwork,
                cornices, and ceiling roses. Route cables through floor voids wherever possible.
                Use mini-trunking behind skirting boards and behind dado rails. Never cut through
                significant plasterwork without explicit customer consent and structural advice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Cheltenham Property Types',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Regency Terraces and Villas</h3>
            <p className="text-white text-sm leading-relaxed">
              The defining property type of central Cheltenham. High ceilings (3.5m+), solid
              masonry walls, ornate plasterwork, original features. Rewires require surface-mounted
              trunking or careful floor void routing. Listed building considerations throughout
              the central conservation areas.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Suburbs</h3>
            <p className="text-white text-sm leading-relaxed">
              St Paul's, Leckhampton, and Charlton Kings have solid Victorian and Edwardian
              housing. Cavity or solid brick walls, with rewires and consumer unit replacements
              common. Not listed in most cases, so more flexibility for cable routing than
              the Regency core.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Hesters Way, Springbank, and Up Hatherley. Cavity brick construction, standard
              cable routing. Consumer unit replacements and five-yearly EICRs are the primary
              work in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">West Cheltenham (Cyber Central)</h3>
            <p className="text-white text-sm leading-relaxed">
              The major new development around GCHQ's Benhall site. Modern cavity-wall new
              builds with current standards and smart home provisions. EV charger demand is
              high in this area. Commercial cyber and tech offices offer commercial electrical
              opportunity.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Cheltenham (2026)',
    content: (
      <>
        <p>
          Cheltenham rates are above the national average, reflecting the area's affluence and
          the premium for heritage property work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£45 — £65</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£300 — £450</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£80 — £115/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£600 — £1,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (Regency terrace)</span>
                  <span className="font-semibold">£5,000 — £8,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£200 — £320</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£850 — £1,350</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Regency property rewires command a significant premium over standard properties due
          to the care required, the need to preserve original features, and the time involved
          in planning sympathetic cable routes.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham is an excellent market for skilled electricians. The affluent customer base,
          heritage property challenges, and growing Cyber Central development create a premium,
          varied workload. Electricians who invest in professional documentation, a smart
          presentation, and genuine expertise in period property work can build highly profitable
          practices in Cheltenham.
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
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  on site. Cheltenham customers expect professionalism — deliver it from your phone.
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
                  Win premium Cheltenham jobs with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes on survey day that reflect the quality of your work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Cheltenham electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working in period properties and premium markets. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCheltenhamPage() {
  return (
    <GuideTemplate
      title="Electrician in Cheltenham | Local Electricians 2026"
      description="Find qualified electricians in Cheltenham. Part P compliance, NGED DNO, listed building consent, Regency property rewiring, EICR costs, and Cheltenham electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cheltenham"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Cheltenham:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Cheltenham's exceptional Regency architecture, conservation area restrictions, and affluent professional population demand electricians with heritage property expertise and a premium approach. Find NICEIC and NAPIT registered electricians in Cheltenham."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Cheltenham"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Cheltenham Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working in heritage properties and premium markets. 7-day free trial."
    />
  );
}
