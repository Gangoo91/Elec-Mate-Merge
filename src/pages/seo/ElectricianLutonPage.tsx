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
  { label: 'Electrician in Luton', href: '/electricians/luton' },
];

const tocItems = [
  { id: 'overview', label: 'Luton Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Luton Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Luton' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Luton is in Bedfordshire, England. Part P of the Building Regulations applies to all domestic electrical work. Notifiable work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Luton Borough Council Building Control.',
  'UK Power Networks (UKPN) Eastern is the Distribution Network Operator for Luton. All new connections, supply upgrades, and G98/G99 generation notifications go through UKPN.',
  'Luton has a large and diverse housing stock, including significant social housing estates from the 1960s and 1970s, Victorian terraces, and newer private development. Post-war housing often contains wiring that is approaching or past its safe working life.',
  'The town has a strong demand for EICR work driven by a large private rental sector, a significant HMO market, and the Renters (Reform) Act requirements.',
  "Luton electrician rates are in the lower-mid range for the South East and East of England — typically £45 to £65 per hour in 2026, reflecting the town's position between London and the lower-cost Midlands.",
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Luton?',
    answer:
      'Yes. Luton is in England and Part P of the Building Regulations 2010 applies. Notifiable electrical work — new circuits, consumer unit replacements, work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Luton Borough Council Building Control before starting. A Part P compliance certificate and an Electrical Installation Certificate (EIC) under BS 7671 must be issued on completion. These documents are important for property sales.',
  },
  {
    question: 'Who is the DNO for Luton?',
    answer:
      "UK Power Networks (UKPN) Eastern is the Distribution Network Operator for Luton and the surrounding Bedfordshire area. For new connections, supply upgrades (for EV chargers, heat pumps, or increased demand), and G98/G99 generation notifications for solar PV or battery storage, you deal with UKPN. G98 notifications for systems up to 16A per phase are processed online. G99 applications for larger systems require prior approval, typically taking 8 to 12 weeks. UKPN's online portal is generally straightforward for standard connection applications.",
  },
  {
    question: 'How much does an EICR cost in Luton?',
    answer:
      "An EICR in Luton typically costs £170 to £290 for a standard residential property. HMO properties cost more, reflecting the larger number of circuits and the time required. Luton rates are broadly in line with the wider Bedfordshire and South East Midlands area. The town's large private rental sector generates strong and consistent EICR demand — landlords are required to have a valid EICR every five years, with remedial work completed within 28 days of an unsatisfactory report.",
  },
  {
    question: "What are the electrical challenges in Luton's post-war housing estates?",
    answer:
      'Luton has a significant number of post-war housing estates — including large estates in areas such as Marsh Farm, Farley Hill, and Stopsley — built in the 1950s through to the 1970s. These properties frequently contain ageing PVC wiring from the 1960s and 1970s, rubber-insulated wiring in earlier properties, inadequate consumer units with rewirable fuses, poor earth bonding, and limited socket provision. EICRs in these properties commonly generate multiple C2 (potentially dangerous) observations, requiring either remedial work or full rewires. Asbestos is also a risk in pre-1980s properties, particularly in ceiling tiles, pipe lagging, and artex coatings.',
  },
  {
    question: 'Does Luton Airport proximity affect electrical work?',
    answer:
      "Luton Airport's proximity does not directly affect most residential electrical work. However, commercial electrical work near the airport, on airport-related developments, or for businesses in the airport supply chain will have its own procurement and compliance requirements. Electricians who want to work on airport-related commercial projects typically need to be on approved contractor lists and may require specific security clearance. For residential work in areas close to the airport (such as Stopsley and Wigmore), standard Part P and BS 7671 requirements apply.",
  },
  {
    question: 'What is the typical cost of a consumer unit replacement in Luton?',
    answer:
      'A consumer unit replacement in Luton typically costs £550 to £950, including a new RCBO or dual-RCD consumer unit, all necessary testing, and the EIC and Part P compliance certificate. The exact price depends on the number of circuits, ease of access, and whether remedial work is needed. Luton prices are broadly in line with the wider Bedfordshire and South East Midlands market — slightly higher than the East Midlands but lower than central London.',
  },
  {
    question: 'How do I find a NICEIC-registered electrician in Luton?',
    answer:
      'Use the NICEIC\'s public "Find a Contractor" search at niceic.com, entering your Luton postcode. NAPIT also maintains a public register at napit.org.uk. Both registers confirm that the electrician has been assessed for technical competence and can self-certify notifiable work under Part P. Always ask to see the electrician\'s registration card or check the register directly, and ask for written quotations before work starts. References from previous Luton customers are a good indicator of local knowledge and reliability.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for all Part P notifiable work in Luton.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Luton landlords, letting agents, HMOs, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables for rewires, new circuits, and EV charger installations across Luton's varied housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Luton — UKPN notification and supply upgrade guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Luton pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured modules covering inspection and testing for all property types.',
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
    heading: 'Electrician in Luton: What You Need to Know',
    content: (
      <>
        <p>
          Luton is a large town in Bedfordshire with a population of around 220,000. It has a
          diverse economy centred on Luton Airport (one of the UK's busiest airports),
          manufacturing, retail, and a growing service sector. For electricians, Luton offers a
          substantial and varied workload: residential rewires and upgrades across a large and
          diverse housing stock, significant EICR demand from a busy private rental market,
          commercial electrical work in retail parks and industrial estates, and growing demand for
          EV chargers and solar PV.
        </p>
        <p>
          The town's housing stock ranges from Victorian and Edwardian terraces in areas like Bury
          Park and High Town to large post-war estates in Marsh Farm, Stopsley, and Farley Hill, and
          modern private development in areas such as Wigmore and Barton Hills. Each part of the
          stock presents different electrical characteristics and challenges.
        </p>
        <p>
          This guide covers the regulatory requirements, DNO contacts, local property types, typical
          jobs, pricing, and practical advice for electricians working in and around Luton.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Luton',
    content: (
      <>
        <p>
          Luton is in England and Part P of the Building Regulations 2010 applies to all domestic
          electrical work. Notifiable work must be handled through one of two routes:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — registered members of NICEIC,
                NAPIT, or ELECSA can self-certify notifiable work and issue a compliance certificate
                directly. This is the standard route for registered electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — unregistered electricians must
                notify Luton Borough Council Building Control before starting notifiable work. The
                council inspects the completed work and issues a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with BS
                7671:2018+A3:2024. RCD protection is mandatory for socket outlet circuits under
                regulation 411.3.3 and for circuits in kitchens, bathrooms, and outdoors. Consumer
                unit replacements require a modern RCBO or dual-RCD board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — Luton's large private rental sector is
                subject to The Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020. Landlords must have a valid EICR every five years, with C1/C2
                defects remedied within 28 days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Luton Property Types and Electrical Characteristics',
    content: (
      <>
        <p>
          Luton's housing stock is diverse, with each era of development presenting different
          electrical characteristics:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Bury Park, High Town, and parts of the town centre have Victorian and Edwardian
              terraced properties. These commonly contain old rubber-insulated wiring, inadequate
              earth bonding, and fuse boards. Many have been converted to HMOs or multi-occupancy
              flats. Full rewires are common in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates (1950s–1970s)</h3>
            <p className="text-white text-sm leading-relaxed">
              Marsh Farm, Farley Hill, Lewsey Farm, and Stopsley have large council estates built
              between 1950 and 1975. Wiring from this era ranges from early PVC to rubber-insulated.
              Consumer units are often inadequate. EICRs in these properties frequently identify
              multiple C2 observations.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1980s–2000s Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              Luton has significant development from the 1980s through to the early 2000s in areas
              such as Wigmore, Barton Hills, and Limbury. This stock has modern cavity walls and
              generally better wiring, but may have outdated consumer units that need upgrading to
              meet current BS 7671 standards.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Luton has significant commercial and industrial premises around the airport and in
              areas such as Kimpton Road and Chaul End. Commercial electrical work requires
              appropriate qualifications and understanding of BS 7671 and other applicable
              standards. EV charger installation in car parks and commercial premises is growing.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Luton',
    content: (
      <>
        <p>The most in-demand electrical services in Luton in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords and HMOs</strong> — Luton's large private rental sector
                generates consistent EICR demand. Electricians who work with local letting agents
                can build a regular pipeline of landlord compliance work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old fuse boards across Luton's
                post-war housing stock generate significant demand for consumer unit upgrades. Most
                EICR defect remedials in older properties include a consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — Luton's proximity to the M1 and London
                commuter routes drives demand for home EV chargers. Commercial EV charger
                installations at the airport, retail parks, and car parks are a growing market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — Luton's Victorian and post-war housing
                stock generates consistent rewiring work. Partial rewires following EICR
                observations are especially common in the town's 1950s–1970s estates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Luton',
    content: (
      <>
        <p>
          In Luton, as across England, the key indicators of a compliant, qualified electrician are
          scheme registration and the ability to issue correct Part P documentation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — use the public registers at niceic.com
                or napit.org.uk to find registered electricians in Luton. Registration confirms
                annual technical competency assessment and ability to self-certify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct Part P documentation</strong> — after notifiable work, you should
                receive a Part P compliance certificate and a BS 7671 EIC. For an EICR, you should
                receive the full report including all observations, test results, and an overall
                satisfactory or unsatisfactory result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotations</strong> — always get a detailed written quotation before
                work starts. Reputable Luton electricians will survey before quoting and will
                clearly state all costs including materials, labour, and certification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Luton (2026)',
    content: (
      <>
        <p>
          Luton electrician rates in 2026 are in the lower-mid range for the South East, higher than
          comparable towns in the East Midlands but below central London rates:
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
                  <span className="font-semibold">£300 — £440</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£380 — £520</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£75 — £115/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£110 — £170</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,300 — £5,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£170 — £290</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£750 — £1,200</span>
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
    heading: 'For Electricians: Working in Luton',
    content: (
      <>
        <p>
          Luton offers a strong and consistent market for electricians. The large private rental
          sector provides reliable EICR demand, the ageing housing stock generates rewiring and
          consumer unit upgrade work, and the proximity to London creates demand for higher-end
          residential and commercial electrical work.
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
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. For Luton's busy landlord market, delivering documentation on the day of the
                  job builds trust and generates referrals.
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
                  to send professional quotes to Luton landlords and homeowners. Clear, itemised
                  quotes win work in a competitive market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Luton electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Part P compliance and the realities of Luton's diverse housing stock. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianLutonPage() {
  return (
    <GuideTemplate
      title="Electrician in Luton | Local Electricians 2026"
      description="Find qualified electricians in Luton. Part P compliance, NICEIC registered, EICR for landlords and HMOs, consumer unit replacement, and local electrician rates for Luton in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Luton"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Luton: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Luton's diverse housing stock — from Victorian terraces and post-war estates to modern developments — creates strong demand for qualified electricians with Part P compliance expertise, EICR knowledge, and EV charger installation skills."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Luton"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Luton Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Part P compliance and the demands of Luton's busy rental and residential market. 7-day free trial."
    />
  );
}
