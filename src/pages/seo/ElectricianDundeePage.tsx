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
  { label: 'Electrician in Dundee', href: '/electricians/dundee' },
];

const tocItems = [
  { id: 'overview', label: 'Dundee Overview' },
  { id: 'regulations', label: 'Scottish Building Standards' },
  { id: 'dno', label: 'SSEN Distribution Network' },
  { id: 'property-types', label: 'Dundee Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Dundee' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Dundee is in Scotland — Part P of the Building Regulations does not apply. Electrical work is governed by Scottish Building Standards (Technical Handbook Section 4: Safety). Building warrants are required for notifiable work. BS 7671 applies UK-wide.',
  'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Dundee and the Tayside area. G98/G99 notifications for generation equipment and new connection applications go through SSEN.',
  'Dundee has a significant stock of 1950s–1980s local authority housing — multi-storey flats, maisonettes, and cottage flats — alongside Victorian stone tenements in the city centre and suburbs.',
  'Dundee\'s ongoing city centre regeneration, including the waterfront development and V&A Museum area, is creating consistent demand for commercial electrical work alongside domestic upgrades.',
  'SELECT registration is the recommended trade body for Dundee electricians, offering a certification route that simplifies the Scottish building warrant process.',
];

const faqs = [
  {
    question: 'Does Part P apply to electrical work in Dundee?',
    answer:
      'No. Part P of the Building Regulations applies only to England and Wales. Dundee is in Scotland, where electrical work in dwellings is regulated under Scottish Building Standards — specifically Section 4 (Safety) of the Technical Handbook — Domestic, administered under the Building (Scotland) Act 2003. A building warrant is required from Dundee City Council Building Standards before starting notifiable electrical work. The electrical installation must comply with BS 7671:2018+A3:2024, and an Electrical Installation Certificate (EIC) is required on completion as evidence of compliance.',
  },
  {
    question: 'Who is the DNO for Dundee?',
    answer:
      'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Dundee and the wider Tayside and Angus area. All connection applications, G98 notifications (for generation systems up to 16A per phase), and G99 applications (for larger systems) go through SSEN. EV charger notifications above 7.4 kW single-phase are also handled by SSEN.',
  },
  {
    question: 'How much does an electrician cost in Dundee?',
    answer:
      'Dundee electrician rates in 2026 are mid-range for Scotland. Typical rates: hourly rate £40 to £60 for a qualified, registered electrician; day rate £270 to £400 for a sole trader. Common fixed-price jobs: consumer unit replacement £600 to £950, full rewire (3-bed semi or flat) £3,500 to £5,500, EICR £170 to £280, single socket addition £100 to £150, EV charger installation £800 to £1,200. Emergency call-out rates are £75 to £110 per hour.',
  },
  {
    question: 'What are the main types of electrical work in Dundee?',
    answer:
      'Common electrical work in Dundee includes consumer unit replacements (upgrading pre-2000 fuse boards in social housing and private properties), full rewires on 1950s–1970s local authority housing, EICRs for the large rental market, EV charger installations in suburban areas, socket and lighting additions, and commercial fit-outs in the waterfront regeneration area. Multi-storey flat electrical work presents specific challenges including common area wiring, access restrictions, and the need to coordinate with property managers.',
  },
  {
    question: 'Do Dundee electricians need SELECT registration?',
    answer:
      'SELECT registration is strongly recommended for electricians working in Dundee and the rest of Scotland. SELECT is Scotland\'s principal trade association for the electrical industry, and SELECT-registered contractors can use the SELECT Certification Services scheme to certify work, simplifying the building warrant process. Many Dundee customers, letting agents, and housing associations specifically request SELECT registration. NICEIC and NAPIT are also accepted in Scotland but are less widely recognised in the local market.',
  },
  {
    question: 'Are there any challenges specific to Dundee\'s multi-storey flats?',
    answer:
      'Dundee has a number of surviving multi-storey tower blocks and high-density housing from the 1960s and 1970s. Electrical work in these properties presents several challenges: common area wiring (stairwells, lifts, fire alarms) is managed by Dundee City Council or a housing association; individual flats have limited consumer unit space; asbestos is likely in pre-1985 buildings and must be surveyed before invasive work; and access for materials and equipment requires coordination. Electricians should allow additional time and cost for multi-storey flat work.',
  },
  {
    question: 'How does the building warrant process work for electrical work in Dundee?',
    answer:
      'For notifiable electrical work in Dundee, a building warrant must be obtained from Dundee City Council Building Standards before work begins. The application requires a description of the proposed work and payment of a fee based on the value of the work. On completion, a completion certificate is submitted with the EIC as evidence of compliance. SELECT-registered contractors can use the SELECT Certification Services scheme, which streamlines this process. The council may inspect completed work before accepting the completion certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site — required for building warrant completion in Dundee.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Dundee rental properties and periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for rewires and new circuits in Dundee\'s varied housing stock.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Replace old fuse boards with modern RCD-protected consumer units — compliant with BS 7671.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and EV charger installations in Dundee.',
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
    heading: 'Electrician in Dundee: What You Need to Know',
    content: (
      <>
        <p>
          Dundee is Scotland's fourth-largest city, with a population of around 150,000 on the
          north bank of the Firth of Tay. Once known as the "three Js" (jute, jam, and journalism),
          Dundee has reinvented itself as a hub for life sciences, gaming technology (Rockstar North
          grew out of Dundee's DMA Design), and creative industries. The waterfront regeneration —
          including the V&A Dundee museum and ongoing commercial development — is transforming the
          city centre.
        </p>
        <p>
          For electricians, Dundee offers a broad workload: a substantial social housing stock
          requiring upgrades, an active private rental market needing EICRs, growing commercial
          demand from the waterfront and business parks, and new-build residential development in
          the suburbs. The city is more affordable than Aberdeen or Edinburgh, which makes it
          attractive for early-career electricians building their first practice.
        </p>
        <p>
          This guide covers Scottish Building Standards (not Part P), the local DNO (SSEN),
          Dundee's property types, pricing, and practical advice for electricians working in the city.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Scottish Building Standards in Dundee',
    content: (
      <>
        <p>
          All electrical work in Dundee is regulated under Scottish Building Standards, not the
          Building Regulations for England and Wales. The key points for electricians:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No Part P in Scotland</strong> — the Scottish Technical Handbook Section 4
                (Safety) sets the regulatory requirement. The electrical standard is the same
                (BS 7671:2018+A3:2024), but the certification and compliance route is through
                building warrants, not the Part P competent person scheme self-certification model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building warrants from Dundee City Council</strong> — required before
                starting notifiable work. Applications are submitted to the Building Standards
                team online or in person. A fee is payable based on the estimated cost of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — the Electrical Installation Certificate issued
                on completion is submitted with the building completion certificate as evidence of
                compliance with BS 7671. RCD protection under Regulation 411.3.3 must be provided
                for socket outlets up to 32A and for circuits in locations of increased shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT certification</strong> — SELECT-registered electricians can
                certify work through SELECT Certification Services, streamlining the completion
                certificate process. Recommended for all Dundee electricians doing domestic work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN: Dundee Distribution Network Operator',
    content: (
      <>
        <p>
          <strong>SSEN (Scottish and Southern Electricity Networks)</strong> is the DNO for
          Dundee and Tayside. Key contacts for Dundee electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections</strong> — new supplies, service upgrades, and diversity
                of supply queries for multi-occupancy properties. Apply through the SSEN
                connections portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage</strong> — G98 notification for systems
                up to 16A per phase (online, no prior approval needed). G99 application for
                larger systems, typically taking several weeks for approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger notifications</strong> — chargers above 7.4 kW single-phase
                require SSEN notification. Standard 7.4 kW domestic chargers typically fall under
                G98 as a generation notification is not required, but supply capacity must be
                confirmed before installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Dundee Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Dundee has a diverse housing stock reflecting the city's industrial and post-war history:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Stone Tenements</h3>
            <p className="text-white text-sm leading-relaxed">
              Stone-built tenements in areas such as Lochee, Hilltown, and the West End. Solid
              walls require surface-mounted trunking for rewires. Pre-1985 properties may contain
              asbestos. Common stairwell wiring is a shared responsibility. EICRs on these
              properties frequently reveal C2 items needing remediation.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Local Authority Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Large post-war estates in Whitfield, Kirkton, and Fintry. 1950s–1970s properties
              often have original wiring needing replacement, rewirable fuse boards, and asbestos
              risks. Multi-storey flats in these areas require coordination with the council or
              housing association for common area access.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Suburban Semis and Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              More recent housing in Broughty Ferry, Barnhill, and Monifieth (just outside the
              city) is cavity-wall construction. These are more amenable to concealed wiring and
              represent a higher-value market. EV charger demand is strong in these areas.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Waterfront Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              The Dundee Waterfront regeneration area — including the V&A, hotels, and commercial
              offices — offers commercial electrical work. New-build commercial fit-outs, temporary
              installations for events, and ongoing maintenance contracts for businesses in the
              waterfront zone.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Dundee',
    content: (
      <>
        <p>
          The most in-demand electrical services in Dundee reflect both the age of the housing
          stock and the growing rental and commercial market:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — upgrading rewirable fuse boards in
                older housing to modern RCD or RCBO consumer units. A building warrant is required
                for this work in Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewires</strong> — essential on pre-1970s local authority housing
                and older tenement flats. Allow additional time for surface-mounted trunking
                work in solid-wall properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for the rental market</strong> — Dundee has a large student
                population (University of Dundee, Abertay University) and a substantial HMO
                market. EICRs are in consistent demand from private landlords and HMO licence holders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing demand in suburban areas.
                SSEN notification required where supply capacity is upgraded.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Dundee (2026)',
    content: (
      <>
        <p>
          Dundee rates are mid-range for Scotland — higher than smaller towns but lower than
          Aberdeen or Edinburgh. Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£40 — £60</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£270 — £400</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£75 — £110/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£600 — £950</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed property)</span>
                  <span className="font-semibold">£3,500 — £5,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£170 — £280</span>
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
    id: 'for-electricians',
    heading: 'For Electricians: Working in Dundee',
    content: (
      <>
        <p>
          Dundee is a growing market for qualified electricians, with the combination of
          regeneration-driven commercial work, steady domestic demand from an ageing housing stock,
          and a large rental sector needing regular EICRs.
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
                  on site. Scottish building warrant completion requires professional
                  documentation — issue it from your phone before leaving the property.
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
                  for rewires in Dundee's older tenements and social housing where surface-mounted
                  routes create longer cable runs.
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
                  Win Dundee jobs with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes to customers and landlords from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Dundee electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Scottish Building Standards compliance. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianDundeePage() {
  return (
    <GuideTemplate
      title="Electrician in Dundee | Local Electricians 2026"
      description="Find qualified electricians in Dundee. Scottish Building Standards, SSEN DNO, SELECT registration, tenement and social housing rewiring, EICR costs, and Dundee electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Dundee"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Dundee:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Dundee's mix of Victorian tenements, post-war social housing, and a growing waterfront commercial district creates steady demand for rewires, EICRs, and commercial electrical work. Find SELECT and NICEIC registered electricians in Dundee."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Dundee"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Dundee Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Scottish Building Standards and the challenges of Dundee's housing stock. 7-day free trial."
    />
  );
}
