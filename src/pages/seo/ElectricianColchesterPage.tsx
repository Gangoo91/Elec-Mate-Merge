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
  { label: 'Electrician in Colchester', href: '/electricians/colchester' },
];

const tocItems = [
  { id: 'overview', label: 'Colchester Overview' },
  { id: 'finding', label: 'Finding a Qualified Electrician' },
  { id: 'costs', label: 'Electrician Costs in Colchester' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and BS 7671' },
  { id: 'property-types', label: 'Colchester Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Colchester is in Essex in the South East, with electrician rates of £55 to £72 per hour reflecting the East of England premium market and proximity to London.',
  'UK Power Networks is the Distribution Network Operator for Colchester and the whole of Essex. All G98/G99 notifications for solar PV, battery storage, and EV chargers go through UK Power Networks.',
  "As Britain's oldest recorded town, Colchester has a significant stock of listed buildings and conservation areas. External electrical work on listed buildings requires listed building consent from Colchester City Council.",
  'The University of Essex and Colchester Garrison create strong demand for HMO electrical work — EICRs, fire alarms, and emergency lighting for student houses and military accommodation.',
  'All domestic electrical work in Colchester must comply with Part P of the Building Regulations. NICEIC and NAPIT registered electricians self-certify notifiable work automatically.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Colchester?',
    answer:
      'Colchester electrician rates in 2026 are at the South East level, typically £55 to £72 per hour for a qualified, registered electrician. Day rates range from £380 to £510. Emergency call-out rates are £90 to £130 per hour with a minimum call-out charge. Common fixed prices: consumer unit replacement £700 to £1,050, EICR for a 3-bed house £190 to £270, full rewire of a 3-bed semi £3,600 to £5,500, single socket addition £120 to £175, EV charger installation £800 to £1,200. Colchester rates are broadly in line with other South East towns of similar size and distance from London.',
  },
  {
    question: 'Who is the Distribution Network Operator for Colchester?',
    answer:
      'UK Power Networks (UKPN) is the DNO for Colchester and the whole of Essex. All DNO notifications for solar PV (G98/G99), battery storage, and EV chargers in Colchester go through UK Power Networks. The UKPN portal allows G98 notifications to be submitted online. For new supply connections, capacity upgrades, or the installation of large generation systems requiring G99 approval, contact UK Power Networks directly. G99 applications can take 8 to 12 weeks for approval.',
  },
  {
    question: 'What electrical work is most common in Colchester?',
    answer:
      "Common electrical jobs in Colchester include: consumer unit upgrades (many Victorian, Edwardian, and post-war properties have outdated fuse boards), landlord EICRs (Colchester has a large rental sector driven by the university and garrison), EV charger installations, solar PV and battery storage, HMO fire alarm and emergency lighting work, and full rewires of older properties. Listed building work is also common given Colchester's status as Britain's oldest recorded town — electrical work on listed buildings requires care to avoid damaging historical fabric.",
  },
  {
    question: 'Do I need listed building consent for electrical work in Colchester?',
    answer:
      'Listed building consent is required for any work that affects the character of a listed building, both internally and externally. In practice, this means external electrical work (EV chargers, external lighting, security cameras, visible cable routes) on listed buildings in Colchester requires consent from Colchester City Council planning department. Colchester has a significant number of listed buildings given its Roman, Norman, and medieval history. Always advise customers to check with the planning department before committing to external electrical work on listed or conservation area properties.',
  },
  {
    question: 'Does Part P apply in Colchester?',
    answer:
      'Yes. Part P of the Building Regulations applies in Colchester as throughout England. Notifiable electrical work in dwellings — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outside — must be self-certified by a registered competent person or notified to Colchester City Council building control before work starts. NICEIC and NAPIT registered electricians self-certify and notify the council automatically through their scheme.',
  },
  {
    question: 'How do I find a reputable electrician in Colchester?',
    answer:
      'Use the NICEIC or NAPIT contractor search on their respective websites, entering your Colchester postcode. Both registers only include electricians who have been assessed for technical competence and who carry appropriate insurance. You can also ask for recommendations from neighbours or use local review platforms. For listed building work, it is worth choosing an electrician with experience of working in heritage properties and the constraints involved.',
  },
  {
    question: 'What is the demand like for electricians in Colchester?',
    answer:
      "Demand for electricians in Colchester is strong and growing. The university and garrison create a large and stable rental market requiring ongoing EICR work. The town's expansion and new housing development on its fringes drives demand for new installations and EV charger work. The older housing stock in the town centre and surrounding villages requires periodic rewires and consumer unit upgrades. Commercial and military electrical work from the garrison is also significant.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Colchester landlords, HMOs, and university rental properties.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Electrical Installation Certificates for all notifiable work in Colchester and Essex.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables accurately for Colchester rewires, EV charger circuits, and listed building installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Colchester — UK Power Networks notifications and OZEV grant funding.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Colchester electrical jobs at accurate South East rates — send professional quotes on site.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 — essential for EICR and HMO inspection work in Colchester.',
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
    heading: 'Electrician in Colchester: What You Need to Know',
    content: (
      <>
        <p>
          Colchester is a city in north Essex and Britain's oldest recorded town, with a population
          of around 130,000. It combines a historic town centre with Roman walls, a Norman castle,
          and significant medieval architecture — alongside modern residential expansion, the
          University of Essex, and the Army Garrison at Colchester.
        </p>
        <p>
          For electricians, Colchester presents a varied and interesting market. The historic town
          centre has listed buildings and conservation areas that require careful electrical work.
          The large student and military populations drive strong demand for HMO EICRs, fire alarm
          work, and emergency lighting. The expanding residential estates on the town's fringes
          create ongoing demand for new installations and EV charger work. South East rates apply
          throughout.
        </p>
        <p>
          This guide covers finding a qualified electrician in Colchester, typical costs, common
          jobs, the regulatory requirements, and the specific considerations for electrical work in
          this historic Essex city.
        </p>
      </>
    ),
  },
  {
    id: 'finding',
    heading: 'Finding a Qualified Electrician in Colchester',
    content: (
      <>
        <p>
          To find a qualified and registered electrician in Colchester, use the official contractor
          search tools:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the NICEIC "find a contractor" search returns approved and
                assessed electricians covering Colchester and the surrounding Essex area. NICEIC
                contractors self-certify notifiable work and notify the local authority
                automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — NAPIT has strong coverage in Essex. Registered electricians
                carry out the same self-certification process under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building specialists</strong> — for electrical work on listed
                buildings in Colchester's historic centre, look for electricians with experience of
                working in heritage properties and familiarity with the listed building consent
                process.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Electrician Costs in Colchester (2026)',
    content: (
      <>
        <p>Colchester sits firmly in the South East pricing band. Typical 2026 rates:</p>
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
                  <span className="font-semibold">£700 — £1,050</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£190 — £270</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,600 — £5,500</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£120 — £175</span>
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
    heading: 'Common Electrical Jobs in Colchester',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Landlord and HMO EICRs</h3>
            <p className="text-white text-sm leading-relaxed">
              Colchester's large student and military populations create a substantial rental
              market. Landlord EICRs are legally required every 5 years. HMO properties near the
              University of Essex and Garrison also require fire alarms to BS 5839-6, emergency
              lighting, and sufficient socket provision for Colchester City Council's HMO licensing
              requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Many Victorian, Edwardian, and post-war properties in Colchester have outdated
              consumer units that lack adequate RCD protection. Upgrading to a modern unit with RCDs
              or RCBOs in compliance with BS 7671 is a common job — often prompted by a failed EICR
              or a conveyancing requirement.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Listed Building Electrical Work</h3>
            <p className="text-white text-sm leading-relaxed">
              Colchester's historic centre has a significant number of listed buildings dating from
              Roman, Norman, and medieval periods. Electrical work on these properties requires care
              to preserve historical fabric. External work requires listed building consent.
              Internal rewiring must avoid damaging original features and fabric.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Charger Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              EV charger installations are growing across Colchester's residential market. Home 7kW
              Type 2 chargers on dedicated circuits with UK Power Networks G98 notification are the
              standard installation. New residential developments on the town's fringes are required
              to include EV charger provision under building regulations.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and BS 7671 in Colchester',
    content: (
      <>
        <p>
          All domestic electrical work in Colchester must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — notifiable work must be self-certified by a
                registered competent person or notified to Colchester City Council building control.
                Registered electricians notify automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — BS 7671 requires RCD additional protection for
                socket outlets and all final circuits in new domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — BS 7671 Section 631 covers the requirements
                for periodic inspection. Rental properties require an EICR every 5 years by law.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Colchester Property Types and Electrical Considerations',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Historic Centre Listed Buildings</h3>
            <p className="text-white text-sm leading-relaxed">
              Properties within Colchester's Roman walls and medieval town centre, many of which are
              listed. External electrical work requires listed building consent. Solid stone or
              brick walls make internal cable routing more complex. Pre-1980s properties should be
              assessed for asbestos before invasive work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Victorian and Edwardian terraced housing in areas like St Botolphs, Greenstead, and
              New Town. Solid brick walls, ageing wiring in many properties. Consumer unit upgrades
              and rewires are common. Solid-wall properties require surface-mounted trunking or
              careful routing through floor voids.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War and Modern Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large post-war and modern estates in areas like Shrub End, Highwoods, and Stanway.
              Cavity wall construction, easier cable access. Older post-war properties may have
              consumer units approaching the end of their life. New-build estates have modern wiring
              and EV charger provision.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student and Military HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              Properties near the University of Essex (Wivenhoe Park) and Colchester Garrison let to
              students and military families. Regular EICRs, fire alarms to BS 5839-6, and emergency
              lighting are required for HMO licensing. A reliable and consistent revenue stream for
              electricians who serve this sector.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Colchester',
    content: (
      <>
        <p>
          Colchester offers a diverse and interesting workload for electricians — from challenging
          listed building work to volume HMO EICRs, residential rewires, and a growing EV charger
          market. South East rates apply, making it a rewarding area for well-qualified
          practitioners.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Efficient On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink>{' '}
                  and <SEOInternalLink href="/eic-certificate">EICs</SEOInternalLink> on your
                  phone using AI-assisted board scanning. Process high volumes of Colchester
                  landlord EICRs efficiently and issue certificates on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Professional Quoting in the South East
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional PDF quotes from Colchester surveys. Accurate South East rates
                  built in — close jobs faster by quoting on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Colchester electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for South East electricians working across Essex. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianColchesterPage() {
  return (
    <GuideTemplate
      title="Electrician in Colchester | Local Electricians 2026"
      description="Find qualified electricians in Colchester. NICEIC and NAPIT registered, Part P compliant. South East rates, EICRs, listed building work, HMO compliance, EV chargers, and consumer unit upgrades in Colchester 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Colchester"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Colchester:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Britain's oldest recorded town combines historic listed buildings, a large student and military rental sector, and expanding modern estates. Find NICEIC and NAPIT registered electricians in Colchester for all residential and commercial electrical work."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Colchester"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Colchester Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for South East electricians working across Essex. 7-day free trial."
    />
  );
}
