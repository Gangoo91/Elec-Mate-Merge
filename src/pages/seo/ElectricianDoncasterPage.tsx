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
  { label: 'Electrician in Doncaster', href: '/electricians/doncaster' },
];

const tocItems = [
  { id: 'overview', label: 'Doncaster Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Doncaster Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Doncaster' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Doncaster is in South Yorkshire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to City of Doncaster Council Building Control.',
  'Northern Powergrid (NPG) is the Distribution Network Operator for Doncaster and the wider Yorkshire region. All new connections, supply upgrades, and G98/G99 generation notifications go through NPG.',
  'Doncaster has a large social housing and ex-mining community housing stock, much of which has ageing wiring from the 1960s and 1970s. This generates substantial rewiring and consumer unit upgrade work.',
  'The town has undergone significant economic transformation since the coal industry declined, with new logistics, retail, and commercial development. Doncaster Sheffield Airport\'s development at Waypoint creates additional commercial electrical opportunity.',
  'Labour rates in Doncaster are among the more affordable in England — typically £38 to £54 per hour for a qualified, registered electrician in 2026, reflecting the South Yorkshire regional labour market.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Doncaster?',
    answer:
      'Yes. Doncaster is in England and Part P of the Building Regulations 2010 applies. Notifiable work — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to City of Doncaster Council Building Control before starting. A Part P compliance certificate and BS 7671 EIC must be issued on completion. These documents are important when selling a property.',
  },
  {
    question: 'Who is the DNO for Doncaster?',
    answer:
      'Northern Powergrid (NPG) is the Distribution Network Operator for Doncaster, South Yorkshire, and the wider Yorkshire and North East regions. For new connections, supply upgrades (for EV chargers, heat pumps, or increased demand), and G98/G99 generation notifications for solar PV or battery storage, you deal with NPG. G98 notifications for systems up to 16A per phase are processed online. G99 applications for larger systems require prior approval and typically take 8 to 12 weeks.',
  },
  {
    question: 'How much does an EICR cost in Doncaster?',
    answer:
      'An EICR in Doncaster typically costs £130 to £230 for a standard residential property, making it one of the more affordable parts of England for EICR work. The town\'s large private rental sector generates consistent EICR demand from landlords, who must comply with The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. EICRs must be carried out every five years, with C1/C2 defects remedied within 28 days of an unsatisfactory report.',
  },
  {
    question: 'What are the electrical challenges in Doncaster\'s mining community estates?',
    answer:
      'Many of Doncaster\'s former coal mining communities — areas such as Armthorpe, Conisbrough, Bentley, and Edlington — have large housing estates built in the 1950s to 1970s to house mining families. These properties commonly contain ageing PVC wiring or earlier rubber-insulated wiring, inadequate consumer units with rewirable fuses, poor earth bonding, and limited socket provision. EICRs in this housing stock frequently generate multiple C2 (potentially dangerous) observations. Full rewires and consumer unit upgrades are common in these areas. Asbestos is also a significant risk in pre-1980s properties — always recommend an asbestos survey before starting invasive work.',
  },
  {
    question: 'What is the typical cost of rewiring a Doncaster house?',
    answer:
      'A full rewire for a standard 3-bedroom semi-detached house in Doncaster typically costs £2,600 to £4,500, depending on the number of circuits, access to the property, and whether the property is occupied or vacant. Doncaster rewire prices are at the lower end of the England range, reflecting the regional labour market. Properties with asbestos, no floor void access, or very old wiring (rubber-insulated or even earlier) will cost more. Always survey thoroughly before quoting and include provision for unforeseen complications.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Doncaster?',
    answer:
      'The requirements are standard for England. You need City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation), plus the 18th Edition (BS 7671:2018+A3:2024) certificate. For self-certification under Part P, NICEIC or NAPIT registration is required. Doncaster College and DN Colleges Group offer electrical training and apprenticeship programmes locally. Completing training locally can be an advantage when building a reputation in the Doncaster market.',
  },
  {
    question: 'Is there demand for EV charger installations in Doncaster?',
    answer:
      'Yes, and it is growing. While Doncaster historically has had high car ownership driven by the lack of a heavy rail commuter network into Sheffield and Leeds, EV charger demand has been growing as EV adoption increases across all income levels. The commercial sector — particularly logistics parks and retail developments — is a significant EV charger market. Residential EV charger demand is strongest in Doncaster\'s more affluent private residential areas (Tickhill, Rossington, Barnby Dun). Northern Powergrid G98 notification is required if the EV charger installation includes solar or battery storage.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Doncaster.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Doncaster landlords, social housing, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires and new circuits in Doncaster\'s varied housing stock.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Doncaster — Northern Powergrid notification guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with Doncaster pricing.',
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
    heading: 'Electrician in Doncaster: What You Need to Know',
    content: (
      <>
        <p>
          Doncaster is a large town in South Yorkshire with a population of around 310,000. Once
          at the heart of the Yorkshire coalfields, the town has undergone significant economic
          transformation since the closure of its collieries, and today has a diverse economy
          encompassing logistics (benefiting from its position at the junction of the M1, M18,
          and A1M), retail, manufacturing, and public sector employment.
        </p>
        <p>
          For electricians, Doncaster offers a substantial residential market dominated by the
          need to upgrade ageing wiring in the town's former mining community estates and Victorian
          terraces, alongside a growing commercial sector driven by logistics and retail development.
          EICR demand is strong across the town's large private rental sector, and EV charger
          installations are growing in both residential and commercial settings.
        </p>
        <p>
          This guide covers the regulatory framework, DNO contacts, local property types, typical
          jobs, pricing, and practical advice for electricians working in and around Doncaster.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Doncaster',
    content: (
      <>
        <p>
          Doncaster is in England and Part P of the Building Regulations 2010 applies to all
          domestic electrical work. Notifiable work must be handled through one of two routes:
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
                notify City of Doncaster Council Building Control before starting notifiable work.
                The council inspects and issues a completion certificate.
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
                <strong>Landlord EICR requirements</strong> — Doncaster's private landlords are
                subject to The Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020. EICRs must be renewed every five years, with C1/C2 defects
                remedied within 28 days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Doncaster Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Doncaster's housing stock reflects its industrial heritage and post-war development:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Town Centre Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The town centre and areas such as Balby, Hexthorpe, and Hyde Park have Victorian
              and Edwardian terraced properties. These commonly have old rubber-insulated wiring,
              inadequate consumer units, and poor earthing. Many have been converted to HMOs.
              Full rewires and consumer unit upgrades are frequent. Asbestos surveys are
              essential in pre-1980s properties.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Former Mining Community Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large estates in Armthorpe, Conisbrough, Bentley, and Edlington were built for
              mining families in the 1950s–1970s. Wiring from this era is now ageing and often
              approaching or past its safe life. Consumer unit upgrades and full rewires are
              extremely common in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Private Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas such as Bessacarr, Cantley, and Auckley have modern private housing built
              from the 1980s onwards. This stock has better wiring but EV charger installation,
              consumer unit upgrades, and additional circuits for kitchen extensions are the
              most common jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Logistics</h3>
            <p className="text-white text-sm leading-relaxed">
              Doncaster's position at the M1/M18/A1M junction has made it a logistics hub.
              Commercial electrical work in distribution centres, retail parks, and logistics
              facilities provides opportunities for electricians with three-phase and commercial
              experience.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Doncaster',
    content: (
      <>
        <p>
          The most in-demand electrical services in Doncaster in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords</strong> — Doncaster has a large private rental
                market. EICRs every five years are a legal requirement for landlords. Building
                relationships with local letting agents generates consistent work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old fuse boards are extremely
                common across Doncaster's older housing stock. Consumer unit upgrades are one
                of the most frequently requested jobs in the area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — Doncaster's 1950s–1970s housing
                stock generates the highest volume of rewiring work. Many properties have wiring
                that is decades old and in need of full replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing across Doncaster's residential
                and commercial sectors. Commercial EV charger installations in logistics parks
                and retail developments are an expanding market.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Doncaster',
    content: (
      <>
        <p>
          In Doncaster, as across England, NICEIC or NAPIT registration is the key indicator of
          a qualified and compliant electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — search the public registers at
                niceic.com or napit.org.uk for Doncaster-based electricians. Registration
                confirms annual technical assessment and Part P self-certification ability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct Part P documentation</strong> — for notifiable work, you should
                receive a Part P compliance certificate and a BS 7671 EIC. Always keep these
                documents for property sale purposes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotation</strong> — always get a written quote before committing
                to work. Good Doncaster electricians will survey the property and provide a
                detailed cost breakdown.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Doncaster (2026)',
    content: (
      <>
        <p>
          Doncaster electrician rates in 2026 are at the affordable end of the England range,
          reflecting the South Yorkshire regional labour market:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£38 — £54</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£255 — £370</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£320 — £460</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£470 — £820</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£88 — £145</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£2,600 — £4,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£130 — £230</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£690 — £1,100</span>
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
    heading: 'For Electricians: Working in Doncaster',
    content: (
      <>
        <p>
          Doncaster offers a solid and consistent market for electricians. The high volume of
          ageing housing stock generates reliable rewiring and EICR work, and the growing
          commercial sector provides higher-value opportunities for electricians with commercial
          experience.
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
                  on site. Professional documentation builds credibility with Doncaster landlords
                  and generates referrals.
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
                  to send professional quotes. In Doncaster's competitive market, clear and
                  detailed quotes that include compliance documentation stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Doncaster electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the residential and commercial electrical market in Doncaster. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianDoncasterPage() {
  return (
    <GuideTemplate
      title="Electrician in Doncaster | Local Electricians 2026"
      description="Find qualified electricians in Doncaster. Part P compliance, NICEIC registered, EICR for landlords, consumer unit replacement, house rewiring, and local electrician rates for Doncaster in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Doncaster"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Doncaster:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Doncaster's large stock of former mining community estates and Victorian terraces creates strong demand for qualified electricians with EICR expertise, consumer unit upgrade skills, and Part P compliance knowledge."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Doncaster"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Doncaster Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the residential and rental electrical market in Doncaster. 7-day free trial."
    />
  );
}
