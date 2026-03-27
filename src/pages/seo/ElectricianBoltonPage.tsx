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
  { label: 'Electrician in Bolton', href: '/electricians/bolton' },
];

const tocItems = [
  { id: 'overview', label: 'Bolton Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Bolton' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Bolton Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Bolton electricians must be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify notifiable electrical work under Part P of the Building Regulations.',
  'Bolton falls within the Electricity North West distribution network area. All DNO notifications for EV chargers, solar PV, and battery storage go through Electricity North West.',
  'Labour rates in Bolton are lower than the national average, typically £35 to £50 per hour, reflecting the North West cost of living and competitive local market.',
  'Bolton has a significant stock of Victorian and Edwardian terraced housing. Rewiring these properties often involves solid-wall cable routing and may require asbestos checks in pre-1980s homes.',
  'All new domestic electrical circuits and consumer unit replacements in England and Wales require notification under Part P. A registered competent person can self-certify without involving the local authority.',
];

const faqs = [
  {
    question: 'How do I find a qualified electrician in Bolton?',
    answer:
      'The safest way to find a qualified electrician in Bolton is to use the NICEIC or NAPIT contractor search on their websites. Both organisations maintain registers of approved contractors who have been assessed for technical competence and who carry appropriate insurance. You can also ask for recommendations from neighbours or check review platforms. Always ask to see the electrician\'s competent person scheme registration card before work begins. A registered electrician will self-certify their work and issue you with an Electrical Installation Certificate (EIC) or Minor Works Certificate as evidence that the work meets BS 7671.',
  },
  {
    question: 'How much does an electrician charge in Bolton?',
    answer:
      'Bolton electrician rates in 2026 typically range from £35 to £50 per hour for a qualified, registered electrician — lower than the national average and significantly lower than London or the South East. Day rates are typically £250 to £350 for a sole trader. Emergency call-out rates range from £60 to £90 per hour with a minimum call-out charge. Common fixed prices: consumer unit replacement £550 to £850, EICR for a 3-bed house £150 to £220, full rewire of a 3-bed terrace £2,800 to £4,500, single socket addition £80 to £130, EV charger installation £600 to £900.',
  },
  {
    question: 'What is Part P and does it apply in Bolton?',
    answer:
      'Part P of the Building Regulations applies throughout England, including Bolton. It requires that notifiable electrical work in dwellings is either carried out by a registered competent person (who can self-certify) or notified to the local authority building control department before work starts. Notifiable work includes new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside. Bolton Council building control handles notifications for non-registered electricians. Using a NICEIC or NAPIT registered electrician is the standard approach — they self-certify the work and notify the local authority automatically.',
  },
  {
    question: 'Do I need an EICR for a rental property in Bolton?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private landlords in Bolton must have a valid Electrical Installation Condition Report (EICR) for their rental properties. EICRs must be carried out by a qualified person and repeated at least every 5 years (or sooner if the report specifies). A copy of the EICR must be provided to existing tenants within 28 days of the inspection and to new tenants before they move in. Bolton Council can impose financial penalties on landlords who fail to comply.',
  },
  {
    question: 'Who is the Distribution Network Operator for Bolton?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Bolton and the wider Greater Manchester area. If you are installing solar PV, a battery storage system, or an EV charger that requires a DNO notification, this goes through Electricity North West. G98 notifications (for generation systems up to 16A per phase) can be submitted online through the ENW portal. G99 applications for larger systems require prior approval and can take 8 to 12 weeks. For new supply connections or capacity upgrades, contact Electricity North West directly.',
  },
  {
    question: 'What electrical work is most common in Bolton?',
    answer:
      'The most common electrical jobs for Bolton electricians include: consumer unit (fuse board) upgrades to meet current BS 7671 requirements, EICRs for landlords and homebuyers, rewiring of Victorian and Edwardian terraced houses (which make up a large proportion of Bolton\'s housing stock), additional sockets and lighting circuits for home improvements, EV charger installations (growing rapidly), and fault finding and repairs. Commercial work is also strong given Bolton\'s industrial heritage, with factory and warehouse electrical maintenance being a significant part of the local market.',
  },
  {
    question: 'How long does a consumer unit replacement take in Bolton?',
    answer:
      'A straightforward consumer unit replacement in a 3-bedroom house in Bolton typically takes 4 to 6 hours for a single electrician. The work involves isolating the supply, replacing the old fuse board with a modern consumer unit fitted with RCDs and/or RCBOs in compliance with BS 7671, testing all circuits, completing the Electrical Installation Certificate, and notifying the local authority through the competent person scheme. Complications such as a large number of circuits, old rubber-insulated wiring, or access difficulties can extend the job.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Bolton rental properties — complete on site and issue instantly.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone for all notifiable work in Bolton.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables accurately for Bolton terraced house rewires and new circuit installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Install EV chargers in Bolton — DNO notifications, Electricity North West requirements, and grant funding.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EICRs with accurate Bolton pricing built in.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules and practice questions.',
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
    heading: 'Electrician in Bolton: What You Need to Know',
    content: (
      <>
        <p>
          Bolton is a large town in Greater Manchester with a population of around 285,000.
          Historically a mill town, Bolton has a diverse economy and a large stock of Victorian
          and Edwardian terraced housing that generates consistent demand for electrical
          rewiring, consumer unit upgrades, and periodic inspection work.
        </p>
        <p>
          The town falls within the Electricity North West distribution area and is subject to
          Part P of the Building Regulations, as with all of England. Bolton electricians serve
          a mix of domestic, commercial, and light industrial customers — from landlord EICRs
          in the terraced streets of Farnworth and Great Lever to commercial fit-outs in the
          town centre and industrial maintenance on the surrounding business parks.
        </p>
        <p>
          This guide covers everything homeowners and electricians need to know about electrical
          work in Bolton — from finding a registered electrician and understanding typical costs
          to the regulatory requirements and property-specific challenges of the local area.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Bolton',
    content: (
      <>
        <p>
          When looking for an electrician in Bolton, the most important thing to check is
          whether they are registered with a competent person scheme. The main schemes are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the largest electrical contractor certification scheme
                in the UK. NICEIC-registered electricians in Bolton are assessed annually for
                technical competence and can self-certify their work under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — a UK-wide accreditation scheme covering electrical,
                heating, and plumbing. NAPIT-registered Bolton electricians can also self-certify
                notifiable electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — an electrical competent person scheme owned by NAPIT.
                Particularly common for solar PV and EV charger installers in the North West.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA members</strong> — the Electrical Contractors' Association represents
                larger electrical contracting firms. ECA members in Bolton typically handle
                commercial and industrial projects.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always ask for proof of registration before agreeing to work. A registered electrician
          will issue you with the correct certificates on completion, notify the local authority
          automatically, and carry liability insurance. Working with unregistered electricians
          creates problems when selling your property or making an insurance claim.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Bolton (2026)',
    content: (
      <>
        <p>
          Bolton has competitive electrician rates compared to the national average, reflecting
          the North West cost of living and the strong local supply of qualified tradespeople.
          Typical rates in 2026:
        </p>
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
                  <span className="font-semibold">£250 — £350</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£60 — £90/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£550 — £850</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£150 — £220</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terrace)</span>
                  <span className="font-semibold">£2,800 — £4,500</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£80 — £130</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£600 — £900</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Prices can vary depending on the age and condition of the property, ease of access,
          and the complexity of the job. Victorian terraced houses in Bolton often have solid
          brick walls (no cavity), which makes cable routing more difficult and time-consuming
          than in modern properties. Always get two or three quotes for larger jobs.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Bolton',
    content: (
      <>
        <p>
          Bolton electricians handle a broad range of domestic, commercial, and industrial
          work. The most frequently requested jobs in the area are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Many older Bolton properties still have outdated fuse boards with rewirable fuses
              or early MCB boards that do not provide adequate RCD protection. Upgrading to a
              modern consumer unit with RCDs or
              RCBOs improves safety and is often required when selling a property or raising
              a mortgage.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EICRs for Landlords</h3>
            <p className="text-white text-sm leading-relaxed">
              Bolton has a large private rented sector. Landlord EICRs are mandatory every
              5 years under the 2020 Electrical Safety Regulations. The EICR assesses the
              condition of the fixed wiring and consumer unit against BS 7671, identifies any
              C1 (danger present), C2 (potentially dangerous), or C3 (improvement recommended)
              defects, and must be carried out by a qualified person.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Full Rewires</h3>
            <p className="text-white text-sm leading-relaxed">
              Bolton's Victorian and Edwardian terraced houses frequently need full rewires
              when the original wiring reaches the end of its serviceable life. Signs include
              rubber-insulated cables, a lack of earthing to sockets, and no RCD protection.
              Full rewires in solid-wall terraces take longer than in cavity-wall properties
              due to the difficulty of routing cables.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              EV charger installations are growing rapidly in Bolton as electric vehicle
              adoption increases. Most home charger installations involve a dedicated 7kW
              Type 2 charger, a dedicated circuit from the consumer unit, and a G98 or DNO
              notification to Electricity North West. OZEV-approved installers can access
              grant funding for eligible customers.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P Compliance and BS 7671 in Bolton',
    content: (
      <>
        <p>
          All electrical work in Bolton dwellings must comply with <strong>Part P of the
          Building Regulations</strong> and the current edition of <strong>BS 7671:2018
          (18th Edition) including Amendment 3:2024</strong>. The key requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — new circuits, consumer unit replacements,
                and work in kitchens, bathrooms, and outside must be notified. Registered
                electricians self-certify; unregistered electricians must notify Bolton Council
                building control before starting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 requires RCD additional protection
                for socket outlets in domestic premises, and for
                all final circuits in new domestic installations. Modern consumer units use
                RCBOs or dual RCD arrangements to satisfy this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 sets out the
                requirements for periodic inspection and testing. The recommended interval for
                domestic properties is every 10 years (or on change of occupancy). Rental
                properties require an EICR every 5 years by law.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — on completion of notifiable work, a registered
                electrician issues an Electrical Installation Certificate (EIC) or Minor Works
                Certificate. These documents prove the work has been inspected and tested to
                BS 7671 and must be kept for the life of the installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Bolton Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Understanding Bolton's property stock helps electricians quote accurately and plan
          jobs effectively:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The dominant property type in areas like Farnworth, Great Lever, Halliwell, and
              Daubhill. Solid brick walls, no cavity, often 2 or 3 storeys. Rewiring involves
              surface-mounted trunking or careful routing through floor voids. Pre-1980s
              properties may contain asbestos in floor tiles, artex, and pipe lagging — an
              asbestos survey is advisable before invasive work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Semi-Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              1950s and 1960s semi-detached houses in areas like Heaton, Lostock, and Bromley
              Cross. Cavity walls make cable routing easier than Victorian terraces. Many of
              these properties still have original wiring that is approaching the end of its
              serviceable life and benefit from consumer unit upgrades or partial rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build and recent development in areas like Westhoughton and Horwich. Standard
              cavity wall construction, modern consumer units, and good cable access. Work is
              typically additions, EV charger installations, and solar PV rather than rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Bolton has significant commercial and light industrial premises, particularly
              around the town centre and the surrounding business parks. Commercial electrical
              work — including three-phase supplies, distribution boards, emergency lighting,
              and fire alarm systems — is a strong part of the local market for larger
              electrical contractors.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Bolton',
    content: (
      <>
        <p>
          Bolton offers a steady and varied workload for electricians. The large terrace housing
          stock generates consistent demand for rewires and consumer unit upgrades, while the
          growing rental sector creates ongoing EICR work. EV charger installations are an
          increasingly important revenue stream.
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
                  on site with AI-assisted board scanning and voice test entry. Issue
                  professional certificates from your phone before you leave Bolton jobs —
                  no paperwork delays.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Terraced Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for accurate voltage drop calculations on Bolton terraced house rewires.
                  Long cable runs in solid-wall properties are common — get the sizing right
                  first time.
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
                  Win more Bolton jobs with professional PDF quotes from the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Accurate pricing for the North West market built in — quote on site and
                  send before you drive away.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Bolton electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the realities of Bolton's terraced housing stock. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBoltonPage() {
  return (
    <GuideTemplate
      title="Electrician in Bolton | Local Electricians 2026"
      description="Find qualified electricians in Bolton. NICEIC and NAPIT registered, Part P compliant. Typical costs, consumer unit upgrades, EICRs, rewires, and EV chargers in Bolton 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Bolton"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Bolton:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Bolton's large stock of Victorian terraced housing and growing rental sector creates strong demand for rewires, EICRs, consumer unit upgrades, and EV charger installations. Find NICEIC and NAPIT registered electricians in Bolton."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Bolton"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Bolton Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the realities of Bolton's housing stock and the North West market. 7-day free trial."
    />
  );
}
