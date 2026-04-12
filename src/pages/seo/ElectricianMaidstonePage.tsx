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
  { label: 'Electrician in Maidstone', href: '/electricians/maidstone' },
];

const tocItems = [
  { id: 'overview', label: 'Maidstone Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Maidstone' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Maidstone Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Maidstone is the county town of Kent in the South East, with electrician rates of £55 to £72 per hour reflecting the South East premium market and London commuter belt position.',
  'UK Power Networks is the Distribution Network Operator for Maidstone and the whole of Kent. All G98/G99 notifications for solar PV, battery storage, and EV chargers go through UK Power Networks.',
  'Maidstone has a large stock of Victorian and Edwardian terraced housing alongside significant rural and village properties in the surrounding Kent countryside.',
  'The town has a busy commercial sector including the county court, county council headquarters, and numerous professional services firms — generating commercial electrical work alongside the residential market.',
  'All domestic electrical work in Maidstone must comply with Part P of the Building Regulations. NICEIC and NAPIT registered electricians can self-certify notifiable work.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Maidstone?',
    answer:
      'Maidstone electrician rates in 2026 are at the South East level, typically £55 to £72 per hour for a qualified, registered electrician. Day rates range from £380 to £510. Emergency call-out rates are £90 to £130 per hour with a minimum charge. Common fixed prices: consumer unit replacement £690 to £1,050, EICR for a 3-bed house £185 to £265, full rewire of a 3-bed semi £3,500 to £5,400, single socket addition £115 to £170, EV charger installation £800 to £1,200. Rates in rural Kent villages surrounding Maidstone may be slightly higher due to travel time.',
  },
  {
    question: 'Who is the Distribution Network Operator for Maidstone?',
    answer:
      'UK Power Networks (UKPN) is the DNO for Maidstone and the whole of Kent. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers in Maidstone go through UK Power Networks. For rural properties in the surrounding Kent countryside, some areas may have TT earthing — always verify the earthing arrangement at the supply intake. For new connections or capacity upgrades, use the UKPN connections portal.',
  },
  {
    question: 'What electrical work is most common in Maidstone?',
    answer:
      'The most common electrical jobs in Maidstone include: consumer unit upgrades (many Victorian and post-war properties have outdated fuse boards), landlord EICRs (Maidstone has a significant rented sector), EV charger installations (strong commuter demand), full rewires of Victorian terraced properties, additional circuits for home offices and kitchen extensions, and commercial electrical maintenance in the town centre professional services sector. Rural properties in the surrounding Kent countryside also generate solar PV and battery storage work due to good south-facing roof space and rural electricity costs.',
  },
  {
    question: 'Does Part P apply in Maidstone?',
    answer:
      'Yes. Part P of the Building Regulations applies in Maidstone as throughout England. Notifiable electrical work in dwellings — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Maidstone Borough Council building control before work starts. NICEIC and NAPIT registered electricians self-certify and notify the council automatically through their scheme.',
  },
  {
    question: 'How do I find a qualified electrician in Maidstone?',
    answer:
      'Use the NICEIC or NAPIT contractor search on their websites, entering your Maidstone postcode to find assessed and approved electricians in the area. Both registers only include electricians who have been regularly assessed for technical competence and who carry appropriate insurance. For rural properties in the surrounding Kent countryside, check that the electrician covers your area — some Maidstone-based contractors work across a wide area of Mid Kent.',
  },
  {
    question: 'Are there any special considerations for rural Kent properties near Maidstone?',
    answer:
      'Rural properties in the Kent countryside surrounding Maidstone may have TT earthing systems (requiring an earth electrode rather than relying on the DNO combined neutral and earth). TT systems require a whole-installation RCD at the supply intake and careful design of the earthing arrangement. Some rural properties also have older supplies and may benefit from capacity upgrades to accommodate EV chargers or heat pumps. Always verify the earthing arrangement and supply capacity before quoting for major electrical work in rural Kent locations.',
  },
  {
    question: 'What is the demand like for electricians in Maidstone?',
    answer:
      'Demand for electricians in Maidstone is consistent and growing. The large Victorian housing stock requires ongoing maintenance and periodic rewires. The commuter population drives EV charger demand. The county town commercial sector generates commercial electrical work. The surrounding rural Kent villages and market towns create additional residential demand. South East rates make Maidstone a rewarding market for well-qualified, registered electricians who present themselves professionally.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Maidstone landlords — complete on site and issue instantly.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Maidstone and Kent.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Maidstone rewires, EV charger circuits, and rural Kent property installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Maidstone — UK Power Networks notifications and OZEV grant funding.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Maidstone electrical jobs at South East rates — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 — essential for EICR work across Maidstone and Mid Kent.',
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
    heading: 'Electrician in Maidstone: What You Need to Know',
    content: (
      <>
        <p>
          Maidstone is the county town of Kent with a population of around 180,000. Located in the
          Medway Valley in Mid Kent, Maidstone is a major commercial centre for the county — home to
          the Kent County Council headquarters, Maidstone Crown and County Courts, and a thriving
          professional services sector.
        </p>
        <p>
          For electricians, Maidstone provides access to a wide variety of work. The town's
          Victorian terraced housing stock generates demand for consumer unit upgrades and rewires.
          The large commuter population drives EV charger installations. The surrounding Kent
          countryside — with its farmhouses, oast houses, and village properties — provides varied
          rural electrical work. South East rates apply throughout.
        </p>
        <p>
          This guide covers finding a qualified electrician in Maidstone, typical costs, common
          jobs, regulatory requirements, and the specific characteristics of the local market.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Maidstone',
    content: (
      <>
        <p>
          To find a qualified and registered electrician in Maidstone and the surrounding Mid Kent
          area:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the NICEIC "find a contractor" search is the best starting
                point for domestic work. NICEIC approved contractors in Maidstone are assessed
                annually and can self-certify all notifiable domestic electrical work under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — NAPIT has strong coverage across Kent. Registered
                electricians self-certify and notify Maidstone Borough Council automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural specialists</strong> — for properties in the Kent countryside around
                Maidstone, look for electricians familiar with TT earthing systems, rural supply
                characteristics, and solar PV installations in rural settings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Maidstone (2026)',
    content: (
      <>
        <p>Maidstone rates reflect the South East location. Typical 2026 rates:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£55 — £72</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£380 — £510</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£90 — £130/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£690 — £1,050</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£185 — £265</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,500 — £5,400</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£115 — £170</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£800 — £1,200</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Maidstone',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Maidstone's Victorian and post-war housing stock contains many outdated consumer units
              that lack the RCD protection required by BS 7671 Regulation 411.3.3. Consumer unit
              upgrades are triggered by EICRs, property sales, and EV charger installations that
              require a spare way in the consumer unit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Landlord EICRs</h3>
            <p className="text-white text-sm leading-relaxed">
              Maidstone has a significant private rented sector. Landlord EICRs are legally required
              every 5 years under the 2020 Electrical Safety Regulations. Any C1 or C2 defects
              identified must be remedied within 28 days. Maidstone Borough Council enforces these
              requirements actively.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Maidstone's position as a London commuter town and the growth of electric vehicle
              ownership create strong demand for home EV charger installations. UK Power Networks
              G98 notification is required. OZEV-approved installers can access grant funding for
              eligible customers.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Kent Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The villages and rural areas surrounding Maidstone — including the Weald, the North
              Downs, and the Medway villages — have older rural properties requiring periodic
              rewires and solar PV installations. Some have TT earthing and older single-phase
              supplies. Rural electrical work commands a travel premium.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Maidstone',
    content: (
      <>
        <p>All domestic electrical work in Maidstone must comply with Part P and BS 7671:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work must be self-certified by a
                registered competent person or notified to Maidstone Borough Council building
                control. Registered electricians notify automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 Regulation 411.3.3 requires RCD protection
                for all socket outlets up to 32A and all final circuits in new domestic
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 covers periodic
                inspection requirements. Rental properties must have an EICR every 5 years by law.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Maidstone Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian terraced properties are common in the Fant, Tovil, and Park Wood areas of
              Maidstone. Solid brick walls require surface-mounted trunking or floor-void routing
              for rewires. Pre-1980s properties should be checked for asbestos before invasive work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Semi-Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              1950s and 1960s semi-detached houses in areas like Shepway, Senacre, and Loose. Cavity
              wall construction — easier cable routing than Victorian terraces. Many have outdated
              consumer units approaching the end of their serviceable life.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Kent Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Farmhouses, oast houses, and village properties in the Mid Kent countryside. May have
              TT earthing, overhead service cables, and older single-phase supplies with limited
              capacity. Solar PV is popular on south-facing farm and rural properties. Always survey
              before quoting rural jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build estates in areas like Langley Park, Kings Hill (nearby), and on the fringes
              of Maidstone. Modern wiring, consumer units, and EV charger provision in many new
              builds. Work is typically additions and EV charger installations rather than rewires.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Maidstone',
    content: (
      <>
        <p>
          Maidstone is a strong South East market offering varied work across residential, rural,
          and commercial sectors. The county town status brings professional services commercial
          work alongside the residential market — and South East rates make the area financially
          rewarding for well-qualified electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink>{' '}
                  and <SEOInternalLink href="/eic-certificate">EICs</SEOInternalLink> from
                  your phone on Maidstone and Kent jobs. Issue certificates on site — no delays,
                  professional documentation every time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Win Kent Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional PDF quotes for Maidstone and surrounding Kent customers at
                  accurate South East rates. Quote on site and close more jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Maidstone electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for South East electricians working across Kent. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianMaidstonePage() {
  return (
    <GuideTemplate
      title="Electrician in Maidstone | Local Electricians 2026"
      description="Find qualified electricians in Maidstone. NICEIC and NAPIT registered, Part P compliant. South East rates, EICRs, consumer unit upgrades, EV chargers, rural Kent properties in Maidstone 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Maidstone"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Maidstone: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Maidstone's South East location, Victorian housing stock, commuter population, and surrounding Kent countryside create a varied and rewarding market for registered electricians. Find NICEIC and NAPIT approved electricians in Maidstone."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Maidstone"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Maidstone Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for South East electricians working across Kent. 7-day free trial."
    />
  );
}
