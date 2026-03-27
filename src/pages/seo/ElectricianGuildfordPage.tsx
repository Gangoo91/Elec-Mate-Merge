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
  { label: 'Electrician in Guildford', href: '/electricians/guildford' },
];

const tocItems = [
  { id: 'overview', label: 'Guildford Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Guildford' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Guildford Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Guildford is in Surrey in the South East, with some of the highest electrician rates in England outside London — typically £60 to £80 per hour — reflecting the very high cost of living and affluent customer base.',
  'UK Power Networks is the Distribution Network Operator for Guildford and Surrey. All G98/G99 notifications for solar PV, battery storage, and EV chargers in Guildford go through UK Power Networks.',
  'Guildford has a large stock of expensive detached and semi-detached houses, many of which are Victorian and Edwardian. Full rewires of these large properties command premium prices.',
  'The University of Surrey creates significant demand for HMO electrical work — fire alarms, emergency lighting, and EICRs for student houses in Onslow Village and Park Barn.',
  'Guildford Borough Council enforces the private rented sector Electrical Safety Regulations actively. All landlords must have a valid EICR and address any C1 or C2 defects within 28 days.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Guildford?',
    answer:
      'Guildford electrician rates in 2026 are among the highest in England outside London, typically £60 to £80 per hour for a qualified, registered electrician. Day rates range from £420 to £580. Emergency call-out rates are £100 to £150 per hour with a minimum charge of £150 to £200. Common fixed prices: consumer unit replacement £750 to £1,200, EICR for a 3-bed house £220 to £320, full rewire of a large detached house £6,000 to £10,000, single socket addition £130 to £200, EV charger installation £900 to £1,400. Guildford\'s high property values mean customers are used to paying premium rates for quality tradespeople.',
  },
  {
    question: 'Who is the Distribution Network Operator for Guildford?',
    answer:
      'UK Power Networks (UKPN) is the DNO for Guildford and the whole of Surrey. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers in Guildford go through UK Power Networks. For new supply connections or capacity upgrades — for example, upgrading to a 100A supply for a large EV charger or heat pump in a large detached house — contact UK Power Networks directly through their connections portal.',
  },
  {
    question: 'Do I need Part P certification for electrical work in Guildford?',
    answer:
      'Yes. Part P of the Building Regulations applies throughout England including Guildford. Notifiable electrical work — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Guildford Borough Council building control before work starts. NICEIC or NAPIT registered electricians self-certify and notify the council automatically. Guildford customers are often knowledgeable and will expect to receive the correct certificates on completion.',
  },
  {
    question: 'What are typical jobs for electricians in Guildford?',
    answer:
      'Guildford electricians handle a premium domestic market — large detached and semi-detached houses, many of which are Victorian or Edwardian and require periodic rewires or consumer unit upgrades. EV charger installations are very common due to the affluent commuter population. Solar PV and battery storage installations are popular in the large detached houses with good roof space. HMO electrical work (fire alarms, emergency lighting, EICRs) for student properties near the University of Surrey is also a significant part of the local market.',
  },
  {
    question: 'How do I find a reputable electrician in Guildford?',
    answer:
      'Use the NICEIC or NAPIT contractor search with your Guildford postcode to find assessed and approved electricians in the area. In the Guildford market, it is also worth asking for recommendations from neighbours or your estate agent. Always ask to see the electrician\'s competent person scheme card before agreeing to work, and ask to see examples of their recent certificates. In a premium market like Guildford, quality matters — look for electricians who issue digital certificates promptly and communicate professionally.',
  },
  {
    question: 'Is Guildford a good area for electricians?',
    answer:
      'Guildford is one of the best areas in England for electricians. The combination of very high property values, an affluent and demanding customer base, strong demand for EV chargers, solar PV, and home automation work, a significant student HMO market, and premium South East rates makes it an excellent market for well-qualified, professional electricians. Competition is strong, so electricians who present themselves well — with professional quotes, prompt certificates, and clear communication — win repeat business and referrals.',
  },
  {
    question: 'What earthing arrangements are common in Guildford properties?',
    answer:
      'Most modern and post-war Guildford properties are TN-C-S (PME earthing), where the earth is provided by UK Power Networks via the combined neutral and earth at the supply intake. Some Victorian and Edwardian properties and rural properties in the Guildford Borough may be TN-S (separate earth conductor in the service cable) or TT (earth rod required). Always verify the earthing arrangement at the supply intake before undertaking work that affects the earthing system, and confirm with UK Power Networks if the arrangement is unclear.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Guildford landlords and HMO properties — complete on site.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Guildford and Surrey.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for large Guildford detached house rewires and EV charger installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Guildford — UK Power Networks notifications, OZEV grants, and installation guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote premium Guildford electrical jobs at South East rates — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — essential for EICR and HMO inspection work in Guildford.',
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
    heading: 'Electrician in Guildford: What You Need to Know',
    content: (
      <>
        <p>
          Guildford is the county town of Surrey, with a population of around 80,000 and one
          of the highest average house prices of any town in England. Located 28 miles south
          west of London on the A3, Guildford is a prosperous commuter town with a historic
          high street, the University of Surrey, and a thriving economy centred on financial
          services, professional services, and technology.
        </p>
        <p>
          For electricians, Guildford represents a premium market. The large Victorian and
          Edwardian housing stock, substantial detached houses in the surrounding villages,
          and affluent customer base create demand for high-quality electrical work at premium
          rates. EV charger installations, solar PV, battery storage, and home automation work
          are particularly strong in this market. The University of Surrey also creates a
          significant HMO market requiring regular EICRs and fire alarm work.
        </p>
        <p>
          This guide covers finding a qualified electrician in Guildford, typical costs,
          common jobs, and the regulatory requirements for electrical work in the area.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Guildford',
    content: (
      <>
        <p>
          In Guildford's premium market, customers expect quality and professionalism. The
          key registration schemes to look for are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC Approved Contractor</strong> — the most widely recognised
                scheme in the domestic market. Search by postcode on the NICEIC website to
                find assessed, approved electricians covering Guildford and the surrounding
                Surrey area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT registered</strong> — NAPIT has good coverage in Surrey. Registered
                electricians can self-certify notifiable work under Part P and notify Guildford
                Borough Council automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Which? Trusted Traders</strong> — popular in the Guildford market,
                where customers use review platforms and recommendation services. Which? Trusted
                Traders independently vet electricians and display verified reviews.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Guildford, word of mouth and personal recommendation carry significant weight.
          An electrician who does excellent work in a street of large Victorian houses will
          often get referrals to multiple neighbours. Building a reputation for quality,
          punctuality, and professional documentation pays dividends in this market.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Guildford (2026)',
    content: (
      <>
        <p>
          Guildford rates are among the highest in England outside London. Typical 2026 rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£60 — £80</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£420 — £580</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£100 — £150/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£750 — £1,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£220 — £320</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (large detached)</span>
                  <span className="font-semibold">£6,000 — £10,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£130 — £200</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£900 — £1,400</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Large Victorian and Edwardian detached properties in Guildford command particularly
          high rewire prices — these houses often have 8 to 12 bedrooms spread across three
          or four floors, requiring extensive cable routes, multiple consumer unit positions,
          and careful preservation of original features. Always survey before quoting.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Guildford',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Large House Rewires</h3>
            <p className="text-white text-sm leading-relaxed">
              Guildford has a large stock of Victorian and Edwardian detached and semi-detached
              houses that periodically require full rewires. These are high-value jobs —
              large property, premium rates, and customers who value quality. Cable routes
              in these properties require care around original features and ornamental plasterwork.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Guildford's affluent commuter population is one of the strongest EV charger
              markets in England. Premium EV chargers — including smart chargers with solar
              divert capability and load balancing — are popular. UK Power Networks G98
              notification is required for most installations.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HMO Electrical Compliance</h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Surrey attracts a large student population. Student HMOs
              in Onslow Village, Park Barn, and Stoughton require regular EICRs, fire alarm
              systems to BS 5839-6, emergency lighting, and sufficient socket provision.
              Guildford Borough Council HMO licensing requires up-to-date electrical certificates.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Solar PV and Battery Storage</h3>
            <p className="text-white text-sm leading-relaxed">
              Guildford's large detached houses with good south-facing roof space are ideal
              for solar PV. Battery storage is increasingly popular as prices fall. MCS
              certification is required for installations eligible for the Smart Export
              Guarantee tariff. UK Power Networks G98/G99 notifications must be submitted
              before commissioning.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Guildford',
    content: (
      <>
        <p>
          All domestic electrical work in Guildford must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work must be self-certified
                by a registered competent person or notified to Guildford Borough Council
                building control. Registered electricians notify automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 Regulation 411.3.3 requires RCD
                protection for all socket outlets up to 32A and all final circuits in new
                domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 covers periodic
                inspection requirements. Rental properties require an EICR every 5 years.
                HMO properties must have current EICRs to maintain their HMO licence from
                Guildford Borough Council.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Guildford Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              Large detached and semi-detached properties in areas like Merrow, Onslow Village,
              and Park Barn. High-value properties with complex rewire requirements. Often have
              multiple floors, solid internal walls, and original features requiring careful
              cable routing. Premium rewire prices justified by the complexity and value.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Surrey Village Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The villages surrounding Guildford — Shere, Bramley, Godalming, Cranleigh — have
              older rural properties, some in the Surrey Hills Area of Outstanding Natural Beauty.
              Some rural properties are TT earthed. External electrical work visible from the
              road in AONB or conservation areas may require planning consideration.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern New Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build developments in areas like Ash, Normandy, and on the edges of Guildford.
              Standard cavity wall construction, modern consumer units, and good cable access.
              Work is typically additions, EV charger installations, and smart home systems
              rather than rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              Student properties near the University of Surrey require ongoing electrical
              compliance work. HMO licences from Guildford Borough Council require up-to-date
              EICRs, fire alarms to BS 5839-6, and emergency lighting. These are reliable repeat
              clients for electricians who service the student rental market.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Guildford',
    content: (
      <>
        <p>
          Guildford is one of the most lucrative markets in England for electricians. High
          rates, complex and interesting work, and an affluent customer base who value quality
          make it an excellent area to build a practice. Professional presentation —
          including prompt, well-formatted certificates — is essential to win referrals in
          this market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  from your phone before leaving Guildford jobs. Premium customers expect
                  documentation to match the quality of the work — deliver it on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Premium Surrey Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional PDF quotes at Surrey premium rates. Quote large
                  house rewires, EV chargers, and solar PV installations — send the quote
                  before leaving the survey and close jobs faster.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Guildford electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the premium South East market. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianGuildfordPage() {
  return (
    <GuideTemplate
      title="Electrician in Guildford | Local Electricians 2026"
      description="Find qualified electricians in Guildford. NICEIC and NAPIT registered, Part P compliant. Premium Surrey rates, large house rewires, EICRs, HMO work, EV chargers, and solar PV in Guildford 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guildford"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Guildford:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Guildford's premium Surrey market, large Victorian housing stock, University of Surrey HMO sector, and affluent commuter population create excellent opportunities for well-qualified electricians. Find NICEIC and NAPIT approved electricians in Guildford."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Guildford"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Guildford Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the premium South East and Surrey market. 7-day free trial."
    />
  );
}
