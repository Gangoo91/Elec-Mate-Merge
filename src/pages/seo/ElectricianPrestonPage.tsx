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
  { label: 'Electrician in Preston', href: '/electricians/preston' },
];

const tocItems = [
  { id: 'overview', label: 'Preston Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Preston Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Preston' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Preston is the county town of Lancashire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Preston City Council Building Control.',
  'Electricity North West (ENW) is the DNO for Preston and the surrounding area. All new connections, supply upgrades, and G98/G99 generation notifications go through ENW.',
  'Preston has a large and diverse housing stock ranging from Victorian terraces in areas like Deepdale and Ribbleton to large post-war estates in Ingol and Lea and modern new-build developments around the city.',
  'The University of Central Lancashire (UCLan) creates significant student HMO demand, making EICRs and HMO compliance a key part of the local electrician\'s workload.',
  'Labour rates in Preston are mid-range for Lancashire — typically £40 to £58 per hour for a qualified, registered electrician in 2026.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Preston?',
    answer:
      'Yes. Preston is in England and Part P of the Building Regulations 2010 applies. Notifiable work — new circuits, consumer unit replacements, work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Preston City Council Building Control before work starts. A Part P compliance certificate and BS 7671 EIC must be issued on completion. These documents are needed when selling a property.',
  },
  {
    question: 'Who is the DNO for Preston?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Preston and the wider Lancashire area. For new connections, supply upgrades (for EV chargers or heat pumps), and G98/G99 generation notifications for solar PV or battery storage, you deal with ENW. G98 notifications for systems up to 16A per phase are processed online and are straightforward. G99 applications for larger systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: 'What are the HMO electrical requirements in Preston?',
    answer:
      'Preston has a significant HMO market, driven partly by UCLan students and partly by a large private rental sector. HMO landlords must comply with The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — a valid EICR every five years with remedial work within 28 days of an unsatisfactory result. HMO licensing conditions set by Preston City Council also require fire alarm systems to BS 5839-6 at the appropriate category, emergency lighting in common areas for larger HMOs, adequate socket provision per room, and appropriate RCD protection under BS 7671 regulation 411.3.3.',
  },
  {
    question: 'How much does an EICR cost in Preston?',
    answer:
      'An EICR in Preston typically costs £150 to £260 for a standard residential property. HMO EICRs cost more due to the larger number of circuits. Preston rates are broadly in line with other Lancashire towns — slightly higher than Blackpool, similar to Burnley and Accrington, and lower than Manchester city centre. The competitive local market keeps prices reasonable. Landlords should budget for remedial work costs on top of the EICR fee, particularly in Preston\'s older Victorian and post-war housing stock.',
  },
  {
    question: 'What is the typical cost of a consumer unit replacement in Preston?',
    answer:
      'A consumer unit replacement in Preston typically costs £500 to £880, including a new RCBO or dual-RCD board, all testing, and the EIC and Part P compliance certificate. The exact cost depends on the number of circuits and whether remedial work is required at the same time. Preston prices are broadly in line with the rest of Lancashire — competitive but reflecting the cost of proper materials and qualified labour.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Preston?',
    answer:
      'The requirements are standard for England. You need City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation), plus the 18th Edition (BS 7671:2018+A3:2024) certificate. For self-certification under Part P without notifying Building Control on every job, you must be registered with NICEIC, NAPIT, or ELECSA. Electricians working in Preston\'s HMO and student rental market should also consider qualifications in fire alarm systems (BS 5839) and emergency lighting (BS 5266).',
  },
  {
    question: 'Is there good demand for electricians in Preston?',
    answer:
      'Yes. Preston has a strong and varied electrical market. The city\'s significant rental sector (driven by UCLan students, the public sector workforce, and general private renters) generates consistent EICR demand. The older housing stock produces a steady flow of rewiring and consumer unit upgrade work. Preston is also a Lancashire hub with good access to surrounding towns, and many electricians based in Preston serve a wide area including Leyland, Chorley, Longridge, and the Ribble Valley. The city\'s location on the M6 and M55 motorways gives good access to the wider region.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Preston.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Preston landlords, HMOs, letting agents, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires, new circuits, and EV charger installations across Preston\'s housing stock.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Preston — ENW notification requirements and supply upgrade guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, HMO electrical upgrades, and consumer unit replacements with Preston pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing for domestic and HMO properties in Preston.',
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
    heading: 'Electrician in Preston: What You Need to Know',
    content: (
      <>
        <p>
          Preston is Lancashire's county town and a city with a diverse economy spanning higher
          education, public sector employment, manufacturing, and retail. The University of Central
          Lancashire (UCLan) is one of the UK's largest universities, with a large student population
          that creates significant HMO and student rental demand. For electricians, this translates
          into a strong and consistent market for EICR work, HMO compliance, consumer unit upgrades,
          and residential rewires.
        </p>
        <p>
          Preston's housing stock is varied: Victorian and Edwardian terraces in areas like Deepdale,
          Ribbleton, and Ashton-on-Ribble; large post-war estates in Ingol, Lea, and Brookfield;
          inter-war semis in Fulwood and Penwortham; and modern new-build development around the
          city's edges. Each era of housing has its own electrical characteristics and compliance
          challenges.
        </p>
        <p>
          This guide covers the regulatory framework, DNO contacts, local property types, typical
          jobs, pricing, and practical advice for electricians working in and around Preston.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Preston',
    content: (
      <>
        <p>
          Preston is in England and Part P of the Building Regulations 2010 applies to all domestic
          electrical work. Notifiable work must be handled through one of two routes:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — registered members of NICEIC,
                NAPIT, or ELECSA can self-certify notifiable work and issue a Part P compliance
                certificate directly, without notifying Building Control on each job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — unregistered electricians must
                notify Preston City Council Building Control before starting notifiable work. The
                council inspects the completed work and issues a completion certificate.
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
                <strong>Landlord EICR requirements</strong> — Preston's large private rental
                sector is subject to The Electrical Safety Standards in the Private Rented Sector
                (England) Regulations 2020. Landlords must have a valid EICR every five years,
                with C1/C2 defects remedied within 28 days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Preston Property Types and Electrical Characteristics',
    content: (
      <>
        <p>
          Preston's housing stock spans several eras with distinct electrical profiles:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Deepdale, Ribbleton, and Ashton areas have Victorian and Edwardian terrace properties.
              These commonly have old rubber-insulated wiring, inadequate consumer units, and poor
              earth bonding. Many have been converted to HMOs or student lets. Full rewires and
              consumer unit upgrades are frequent in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large estates in Ingol, Lea, Brookfield, and Larches were built in the 1950s through
              1970s. Wiring from this era includes ageing PVC and early rubber-insulated cables.
              Consumer units are often inadequate. EICRs regularly generate C2 observations requiring
              remedial work or full rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Modern Suburbs</h3>
            <p className="text-white text-sm leading-relaxed">
              Fulwood, Penwortham, and Longton have inter-war semis and modern private
              development. Wiring is generally better than in the older stock, but consumer
              unit upgrades and EV charger installations are the primary job types. New-build
              estates around the city's edges require smart home and EV charger work.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student and HMO Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              UCLan's large student population concentrates in areas around the university campus
              and city centre. HMO properties here require regular EICRs, fire alarm systems,
              and adequate electrical provision per room. Preston City Council's HMO licensing
              team actively enforces compliance.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Preston',
    content: (
      <>
        <p>
          The most in-demand electrical services in Preston in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords and HMOs</strong> — Preston's large rental market and
                significant HMO stock drive consistent EICR demand. Building relationships with
                Preston letting agents can generate a reliable pipeline of landlord compliance work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — Preston's older housing stock has
                a high proportion of inadequate consumer units. Consumer unit upgrades are one
                of the most common jobs across all areas of the city.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — demand is growing across Preston's
                modern estates and commercial sector. ENW G98 notification is required for
                home EV charger circuits. Commercial EV charger work in car parks and
                business premises is an expanding market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewires and partial rewires</strong> — Preston's Victorian terraces and
                post-war estates generate consistent rewiring work. Partial rewires following
                EICR C2 observations are among the most frequently undertaken jobs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Preston',
    content: (
      <>
        <p>
          In Preston, as across England, NICEIC or NAPIT registration is the key indicator of
          a qualified and compliant electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — search the public registers at
                niceic.com or napit.org.uk for Preston electricians. Registration requires annual
                assessment and confirms the ability to self-certify under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct documentation</strong> — for notifiable work, you should receive
                a Part P Building Regulations compliance certificate and a BS 7671 EIC. For an
                EICR, you should receive the full condition report with all observations and an
                overall satisfactory or unsatisfactory result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotation</strong> — always get a detailed written quote before
                committing to any work. Reputable Preston electricians will survey and provide
                a full cost breakdown before starting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Preston (2026)',
    content: (
      <>
        <p>
          Preston electrician rates in 2026 are mid-range for Lancashire — slightly above Blackpool
          and Burnley, broadly comparable to Blackburn, and below Manchester city centre:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£40 — £58</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£270 — £400</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£340 — £480</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£70 — £105/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£500 — £880</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£95 — £155</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,100 — £5,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£150 — £260</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£720 — £1,150</span>
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
    heading: 'For Electricians: Working in Preston',
    content: (
      <>
        <p>
          Preston is a strong market for electricians who can serve the rental sector, work across
          a variety of housing types, and offer a full range of compliance documentation. The city's
          position as Lancashire's county town gives good access to surrounding areas.
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
                  on site. Same-day documentation impresses Preston landlords and helps win
                  repeat business.
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
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional quotes to Preston homeowners and landlords. Clear quotes
                  with itemised costs stand out in a competitive local market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Preston electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Part P compliance and the rental and residential market in Preston. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianPrestonPage() {
  return (
    <GuideTemplate
      title="Electrician in Preston | Local Electricians 2026"
      description="Find qualified electricians in Preston. Part P compliance, NICEIC registered, EICR for HMO landlords, consumer unit replacement, rewiring, and local electrician rates for Preston in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Preston"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Preston:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Preston's large student population, Victorian terrace stock, and growing EV charger demand creates consistent work for qualified electricians with expertise in Part P compliance, HMO electrical standards, and EICR documentation."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Preston"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Preston Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the rental, HMO, and residential market in Preston. 7-day free trial."
    />
  );
}
