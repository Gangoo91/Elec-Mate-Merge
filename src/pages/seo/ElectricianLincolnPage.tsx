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
  { label: 'Electrician in Lincoln', href: '/electricians/lincoln' },
];

const tocItems = [
  { id: 'overview', label: 'Lincoln Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'Northern Powergrid DNO' },
  { id: 'property-types', label: 'Lincoln Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Lincoln' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lincoln is in England (Lincolnshire) — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to City of Lincoln Council Building Control.',
  'Northern Powergrid is the Distribution Network Operator for Lincoln and the wider Lincolnshire area. G98/G99 notifications for generation equipment and new connection applications go through Northern Powergrid.',
  'Lincoln has a distinctive two-level geography — Uphill (the medieval hilltop city around the cathedral and castle) and Downhill (the modern commercial and residential lower city). Property types and electrical challenges differ significantly between the two areas.',
  'The University of Lincoln has significantly grown the city\'s student population over the past two decades, creating strong rental EICR demand and boosting the city\'s economy.',
  'Lincoln has a significant agricultural and food processing economy in the surrounding county. Commercial and industrial electrical work from this sector supplements domestic work in the city itself.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Lincoln?',
    answer:
      'Yes. Lincoln is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work and issue Building Regulations compliance certificates. Unregistered electricians must notify City of Lincoln Council Building Control before starting notifiable work.',
  },
  {
    question: 'Who is the DNO for Lincoln?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Lincoln and Lincolnshire. All connection applications, G98 notifications for solar PV and battery storage (up to 16A per phase), G99 applications for larger generation systems, and EV charger capacity notifications go through Northern Powergrid. Their connections portal handles applications online.',
  },
  {
    question: 'How much does an electrician cost in Lincoln?',
    answer:
      'Lincoln electrician rates in 2026 are at the lower-to-mid range for England. Typical rates: hourly rate £35 to £50 for a qualified, registered electrician; day rate £240 to £345. Common fixed-price jobs: consumer unit replacement £490 to £830, full rewire (3-bed semi) £3,000 to £4,900, EICR (3-bed house) £150 to £245, EV charger installation £660 to £1,000.',
  },
  {
    question: 'What are the most common electrical jobs in Lincoln?',
    answer:
      'Consumer unit replacements on Lincoln\'s large stock of pre-1990s housing, full rewires on Victorian terraces and post-war estates, EICRs for the student and private rental market, EV charger installations, socket and lighting additions, and commercial electrical work for city centre premises and the growing Brayford Waterfront development. The medieval Uphill area has listed buildings requiring careful handling for external electrical work.',
  },
  {
    question: 'What is the difference between Uphill and Downhill Lincoln for electrical work?',
    answer:
      'Lincoln\'s "Uphill" area — the medieval hilltop city centred on Lincoln Cathedral and Lincoln Castle — has a high concentration of listed buildings and conservation areas. External electrical work (EV chargers, external lighting, security cameras) on listed properties requires listed building consent from City of Lincoln Council planning. Internal rewiring must preserve original features. "Downhill" Lincoln — the lower city, Brayford Waterfront, and surrounding residential areas — has standard modern properties without heritage restrictions, and is where the bulk of domestic rewire, consumer unit replacement, and EICR work takes place.',
  },
  {
    question: 'How does the University of Lincoln affect the local electrical market?',
    answer:
      'The University of Lincoln has grown rapidly since its founding in 1996, and now has over 18,000 students. This has created a large student rental market in areas such as Sincil Bank, West End, and the city centre. Student HMO properties require regular EICRs, fire alarm systems to BS 5839-6, emergency lighting, and adequate socket provision. Many HMO landlords in Lincoln need to renew EICRs, making this a consistent and repeatable revenue stream for electricians.',
  },
  {
    question: 'Are there specific electrical considerations for Lincolnshire\'s agricultural sector?',
    answer:
      'Lincolnshire is one of England\'s most productive agricultural counties, and the Lincoln area has a significant food processing and agricultural machinery sector. Commercial and industrial electrical work in this sector includes three-phase distribution, motor control for processing equipment, agricultural building wiring (BS 7671 Section 705 applies to agricultural premises), and solar PV installations on farm buildings. Electricians with experience of agricultural premises can command higher rates for this specialist work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Lincoln rental and student properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Lincoln.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for rewires and new circuits in Lincoln\'s varied housing stock.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Replace old fuse boards with modern RCD-protected consumer units — step by step.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and EV charger installations in Lincoln.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — the qualification required to carry out and issue EICRs.',
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
    heading: 'Electrician in Lincoln: What You Need to Know',
    content: (
      <>
        <p>
          Lincoln is a historic cathedral city in the East Midlands region, with a population of
          around 100,000. The city is defined by its dramatic hilltop setting — Lincoln Cathedral
          and Lincoln Castle dominate the skyline from miles around — and its unique two-level
          geography, which divides Uphill (the medieval heritage city) from Downhill (the modern
          commercial and residential lower city).
        </p>
        <p>
          The University of Lincoln, established in 1996, has transformed the city's economy and
          demographics, bringing a large student population and significant investment in the
          Brayford Waterfront area. The surrounding county is one of England's most productive
          agricultural regions, and food processing, logistics, and agricultural engineering are
          major employers.
        </p>
        <p>
          For electricians, Lincoln offers a varied workload: domestic upgrade and rewire work on
          the substantial pre-1990s housing stock, consistent EICR demand from the student and
          private rental market, commercial work in the city centre and Brayford area, and
          specialist agricultural and industrial work in the county. This guide covers the
          regulatory framework, local DNO, property types, pricing, and practical advice for
          electricians working in Lincoln.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Lincoln',
    content: (
      <>
        <p>
          Lincoln is in England, so Part P of the Building Regulations applies to notifiable
          electrical work in dwellings:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                enables self-certification. The scheme notifies City of Lincoln Council Building
                Control and issues the compliance certificate to the customer within 30 days
                of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS 7671:2018+A3:2024.
                RCD protection under Regulation 411.3.3 is mandatory for socket outlets up to 32A
                and for circuits in locations of increased shock risk (kitchens, bathrooms, outdoors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent for Uphill properties</strong> — external electrical
                work on listed buildings requires consent from City of Lincoln Council planning.
                Lincoln Cathedral and many Uphill properties are listed. Always check before
                quoting external work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for rental properties</strong> — five-yearly EICRs required for all
                private rented properties under the Electrical Safety Standards in the Private
                Rented Sector (England) Regulations 2020. Section 631 of BS 7671 covers
                periodic inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Northern Powergrid: Lincoln DNO',
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> is the DNO for Lincoln and Lincolnshire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — apply through Northern Powergrid's
                connections portal. Essential for EV charger installations requiring capacity
                upgrades and new supplies for development.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99</strong> — solar PV and battery storage. G98 online notification
                for systems up to 16A per phase. G99 pre-approval for larger systems (common in
                the agricultural sector, where large roof areas suit high-capacity solar arrays).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency number</strong> — 105 for power cuts and emergencies across
                the Northern Powergrid network.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Lincoln Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Lincoln's distinctive geography creates two quite different electrical markets:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Uphill Listed Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Medieval and Georgian properties around the cathedral and castle. Many are listed
              buildings with conservation area restrictions. External electrical work requires
              listed building consent. Internal rewiring must preserve original features. Premium
              rates justified by the complexity and care required.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces (Downhill)</h3>
            <p className="text-white text-sm leading-relaxed">
              Sincil Bank, West End, and areas around the city centre. Solid or cavity brick
              terraces with ageing wiring. Rewires and consumer unit replacements are common.
              Strong demand from the student rental market for EICRs and upgrades.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War and Modern Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              North Hykeham, Skellingthorpe, and suburban areas south and west of the city.
              Cavity brick semis and modern new-builds. Consumer unit replacements, EV charger
              installations, and EICRs are primary work in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Agricultural and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Rural Lincolnshire surrounding the city. Farm buildings, food processing facilities,
              and agricultural machinery operations. BS 7671 Section 705 applies to agricultural
              premises. Three-phase distribution, motor control, and large-scale solar PV are
              common. Higher rates reflect specialist knowledge required.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Lincoln',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — consistent demand across Lincoln's
                large pre-1990s housing stock. Victorian terraces in Sincil Bank and West End
                frequently have outdated fuse boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student and rental property EICRs</strong> — the University of Lincoln
                student population drives consistent five-yearly EICR demand. HMO properties
                also require fire alarm and emergency lighting upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewires</strong> — Victorian terraces in the city centre and older
                estates. Asbestos surveys recommended for pre-1985 properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agricultural solar PV</strong> — Lincolnshire's large farm buildings
                are well-suited to solar PV arrays. G99 applications to Northern Powergrid for
                systems above 16A per phase are common on farm installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Lincoln (2026)',
    content: (
      <>
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
                  <span className="font-semibold">£240 — £345</span>
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
                  <span className="font-semibold">£490 — £830</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £4,900</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£150 — £245</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£660 — £1,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Agricultural and specialist industrial work commands a premium over standard domestic
          rates. Uphill listed property work also attracts a premium reflecting the care and
          expertise required.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Lincoln',
    content: (
      <>
        <p>
          Lincoln provides a well-rounded electrical market. The combination of domestic upgrade
          work, a large student rental sector generating consistent EICR demand, specialist Uphill
          heritage property work, and agricultural and industrial opportunity in the wider county
          creates a diverse and sustainable practice.
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
                  on site. Get landlords their compliance documents the same day.
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
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for long cable runs in agricultural buildings and domestic rewires in
                  Lincoln's larger Victorian properties.
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
                  Win Lincoln jobs with the{' '}
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
          title="Professional electrical tools for Lincoln electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across Lincolnshire and the East Midlands. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianLincolnPage() {
  return (
    <GuideTemplate
      title="Electrician in Lincoln | Local Electricians 2026"
      description="Find qualified electricians in Lincoln. Part P compliance, Northern Powergrid DNO, NICEIC and NAPIT registered electricians, EICR for rental and student properties, and Lincoln electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Lincoln"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Lincoln:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Lincoln's unique Uphill and Downhill geography, large student rental market, and surrounding agricultural county create a distinctive and varied electrical market. Find NICEIC and NAPIT registered electricians in Lincoln and Lincolnshire."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Lincoln"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Lincoln Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Lincolnshire and the East Midlands. 7-day free trial."
    />
  );
}
