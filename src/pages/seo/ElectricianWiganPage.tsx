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
  { label: 'Electrician in Wigan', href: '/electricians/wigan' },
];

const tocItems = [
  { id: 'overview', label: 'Wigan Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Wigan Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Wigan' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Wigan is in Greater Manchester, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Wigan Council Building Control.',
  'Electricity North West (ENW) is the Distribution Network Operator for Wigan and the wider Greater Manchester area. All new connections, supply upgrades, and G98/G99 generation notifications go through ENW.',
  'Wigan has a large and diverse housing stock including significant ex-mining community estates from the 1950s–1970s, Victorian terraces, and modern new-build development. Ageing wiring across the older stock generates strong rewiring and consumer unit upgrade demand.',
  "The town's position in the Greater Manchester conurbation, with good motorway access (M6, M58, M61), makes it an attractive market for electricians who can also serve the wider metropolitan area.",
  'Labour rates in Wigan are mid-range for Greater Manchester — typically £40 to £58 per hour for a qualified, registered electrician in 2026, slightly lower than Manchester city centre but comparable to nearby Bolton and Leigh.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Wigan?',
    answer:
      'Yes. Wigan is in England and Part P of the Building Regulations 2010 applies. Notifiable work — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Wigan Council Building Control before starting. A Part P compliance certificate and BS 7671 EIC must be issued on completion. Correct Part P documentation is essential for property sales.',
  },
  {
    question: 'Who is the DNO for Wigan?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Wigan and the wider Greater Manchester area. For new connections, supply upgrades (for EV chargers or heat pumps), and G98/G99 generation notifications for solar PV or battery storage, you deal with ENW. G98 notifications for systems up to 16A per phase are processed online. G99 applications for larger generation systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: 'How much does an EICR cost in Wigan?',
    answer:
      "An EICR in Wigan typically costs £145 to £250 for a standard residential property. This is broadly in line with neighbouring Greater Manchester towns. Wigan's large private rental sector generates consistent EICR demand from landlords, who must comply with The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — a valid EICR every five years, with C1/C2 defects remedied within 28 days. HMO EICRs cost more due to the larger number of circuits.",
  },
  {
    question: "What are the electrical challenges in Wigan's former mining community housing?",
    answer:
      'Wigan was historically a major coal mining town, and many of its residential areas were built to house mining families in the 1950s through 1970s. Areas such as Leigh, Atherton, Tyldesley, and Abram have large estates of this era with wiring that is now approaching or past its safe working life. Common issues include ageing PVC or rubber-insulated wiring, old fuse boards with rewirable fuses, poor earth bonding, limited socket provision, and occasional evidence of amateur wiring work carried out over the decades. EICRs in these properties often generate multiple C2 observations. Asbestos is a risk in pre-1980s properties — recommend surveys before invasive work.',
  },
  {
    question: 'What is the typical cost of a full house rewire in Wigan?',
    answer:
      'A full rewire for a standard 3-bedroom semi-detached house in Wigan typically costs £3,000 to £5,000, depending on the number of circuits, the condition of the existing wiring, and whether the property is occupied or vacant. Wigan rewire prices are broadly in line with the wider Greater Manchester area outside the city centre. Properties with asbestos, limited floor void access, or complex existing installations will cost more. Always conduct a thorough survey and allow contingency for older properties.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Wigan?',
    answer:
      'The requirements are standard for England. You need City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation), plus the 18th Edition (BS 7671:2018+A3:2024) certificate. For self-certification under Part P, NICEIC or NAPIT registration is required. Wigan and Leigh College offers electrical training programmes locally, and completing training in the area helps build contacts and a reputation in the Wigan market.',
  },
  {
    question: 'Is there demand for solar PV installations in Wigan?',
    answer:
      'Solar PV demand in Wigan is growing, particularly in private residential areas with detached and semi-detached houses offering suitable south- or east-facing roof space. The wider Borough of Wigan includes rural and semi-rural areas where solar is popular. All grid-tied solar PV installations require a G98 notification to ENW for systems up to 16A per phase. Battery storage paired with solar PV is increasingly popular. Solar PV installers must hold MCS (Microgeneration Certification Scheme) registration to access government incentives and customer trust, and MCS installation must comply with BS 7671 for the electrical installation elements.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Wigan.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'EICRs for Wigan landlords, letting agents, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: "Size cables for rewires and new circuits across Wigan's varied housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Wigan — ENW notification and supply upgrade guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Wigan pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing for domestic and commercial properties.',
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
    heading: 'Electrician in Wigan: What You Need to Know',
    content: (
      <>
        <p>
          Wigan is a metropolitan borough in Greater Manchester with a population of around 330,000.
          The town has a proud industrial and sporting heritage — as a former mining and
          manufacturing centre, and famously as a rugby league stronghold. Today, Wigan's economy is
          diverse, with strong retail, healthcare, education, and logistics sectors alongside
          continuing manufacturing.
        </p>
        <p>
          For electricians, Wigan offers a substantial residential market driven by the need to
          upgrade ageing wiring across large areas of 1950s–1970s housing, Victorian terraces, and
          converted properties, alongside a growing demand for EV chargers and renewable energy
          installations. The town's proximity to Manchester, Warrington, and the M6/M61 corridor
          gives Wigan-based electricians good access to a wide area.
        </p>
        <p>
          This guide covers the regulatory framework, DNO contacts, local property types, typical
          jobs, pricing, and practical advice for electricians working in and around Wigan.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Wigan',
    content: (
      <>
        <p>
          Wigan is in England and Part P of the Building Regulations 2010 applies to all domestic
          electrical work. Notifiable work must be handled through one of two routes:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — registered members of NICEIC,
                NAPIT, or ELECSA can self-certify notifiable work and issue a Part P compliance
                certificate directly. This is the standard route for registered electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — unregistered electricians must
                notify Wigan Council Building Control before starting notifiable work. The council
                inspects and issues a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with BS
                7671:2018+A3:2024. RCD protection is required for socket outlet circuits under
                regulation 411.3.3 and for circuits in kitchens, bathrooms, and outdoors. Consumer
                unit replacements must use an RCBO or dual-RCD board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — Wigan's private landlords must comply
                with The Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020. Valid EICRs every five years, with C1/C2 defects remedied within
                28 days of an unsatisfactory report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Wigan Property Types and Electrical Characteristics',
    content: (
      <>
        <p>
          Wigan's housing stock reflects its industrial heritage and post-war development patterns:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The town centre and areas such as Scholes, Newtown, and Pemberton have Victorian and
              Edwardian terrace properties. These commonly have old rubber-insulated wiring,
              inadequate consumer units, and poor earthing. Many have been converted to HMOs or
              bedsits. Full rewires and consumer unit upgrades are common.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Mining Community Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas such as Leigh, Atherton, Tyldesley, Hindley, and Abram have large post-war
              estates built in the 1950s–1970s, many originally for mining families. Wiring from
              this era is now approaching or past its safe life. Consumer unit upgrades and rewires
              are among the most common jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Private Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas such as Standish, Shevington, and Appley Bridge have modern private housing.
              Work here is primarily EV charger installations, additional circuits, kitchen and
              bathroom electrical work, and smart home systems. Customers expect professional
              documentation and a high-quality finish.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Retail</h3>
            <p className="text-white text-sm leading-relaxed">
              Wigan has retail parks, leisure facilities, and commercial premises that require
              commercial electrical work. The Galleries shopping centre and Grand Arcade retail area
              generate commercial EICR and maintenance work. EV charger installations in retail car
              parks are a growing market.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Wigan',
    content: (
      <>
        <p>The most in-demand electrical services in Wigan in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords</strong> — Wigan's active private rental market
                generates consistent EICR demand. Building relationships with local letting agents
                creates a reliable pipeline of landlord compliance work throughout the year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old fuse boards are extremely common
                across Wigan's older housing stock. Consumer unit upgrades are one of the most
                frequently requested jobs in the area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — Wigan's post-war and Victorian housing
                stock generates consistent rewiring work. Partial rewires following EICR C2
                observations are especially common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing across Wigan's residential and
                commercial sectors. ENW G98 notification is not required for standard EV charger
                circuits without generation or storage, but the installation must comply with BS
                7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Wigan',
    content: (
      <>
        <p>
          In Wigan, as across England, NICEIC or NAPIT registration is the key indicator of a
          qualified and compliant electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — search the public registers at
                niceic.com or napit.org.uk for Wigan electricians. Registration requires annual
                assessment and confirms Part P self-certification ability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct Part P documentation</strong> — for notifiable work, you should
                receive a Part P Building Regulations compliance certificate and a BS 7671 EIC. For
                an EICR, you should receive the full report with all observations and a clear
                overall result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotation</strong> — always get a detailed written quote before work
                starts. Good Wigan electricians will survey before quoting and provide a full cost
                breakdown including materials, labour, and certification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Wigan (2026)',
    content: (
      <>
        <p>
          Wigan electrician rates in 2026 are mid-range for Greater Manchester — slightly below
          Manchester city centre but broadly comparable to Bolton, Leigh, and St Helens:
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
                  <span className="font-semibold">£265 — £395</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£340 — £480</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£68 — £105/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£500 — £860</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£95 — £155</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£145 — £250</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£710 — £1,150</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Wigan's proximity to Manchester means some customers may seek quotes from Manchester-based
          electricians for comparison. Wigan-based electricians who are well-presented, responsive,
          and professional in their documentation often win on local knowledge, travel efficiency,
          and competitive pricing.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Wigan',
    content: (
      <>
        <p>
          Wigan is a solid and consistent market for electricians. The high volume of ageing housing
          stock generates reliable EICR and rewiring demand, the town's motorway connections give
          access to the wider Greater Manchester market, and the growing residential and commercial
          EV charger market adds new revenue streams.
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
                  site. Same-day documentation keeps Wigan landlords compliant and builds a
                  reputation for professionalism that generates referrals.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to accurately size cables for rewires across Wigan's varied housing stock.
                  Accurate voltage drop calculations prevent issues on long cable runs.
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
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional quotes to Wigan homeowners and landlords. Clear, itemised
                  quotes help win work in a competitive local market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Wigan electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the residential and rental electrical market in Wigan and Greater Manchester. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianWiganPage() {
  return (
    <GuideTemplate
      title="Electrician in Wigan | Local Electricians 2026"
      description="Find qualified electricians in Wigan. Part P compliance, NICEIC registered, EICR for landlords, consumer unit replacement, house rewiring, and local electrician rates for Wigan in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wigan"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Wigan: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Wigan's former mining community housing stock, Victorian terraces, and growing EV charger demand create a consistent market for qualified electricians with Part P compliance expertise and EICR knowledge."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Wigan"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Wigan Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the residential and rental electrical market in Wigan and the wider Greater Manchester area. 7-day free trial."
    />
  );
}
