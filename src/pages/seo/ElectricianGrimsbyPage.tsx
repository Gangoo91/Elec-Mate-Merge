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
  { label: 'Electrician in Grimsby', href: '/electricians/grimsby' },
];

const tocItems = [
  { id: 'overview', label: 'Grimsby Overview' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Grimsby' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Grimsby Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Grimsby and Cleethorpes form the urban core of North East Lincolnshire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to North East Lincolnshire Council Building Control.',
  'Northern Powergrid (NPG) is the Distribution Network Operator for Grimsby and the surrounding area. All new connections, supply upgrades, and G98/G99 generation notifications go through NPG.',
  'Grimsby is one of the UK\'s premier offshore wind energy hubs, with the Humber offshore wind cluster being one of the largest in the world. This creates significant commercial and industrial electrical opportunities for qualified electricians with offshore or industrial experience.',
  'The housing stock includes large areas of 1930s–1960s terraces and council housing, alongside coastal properties in Cleethorpes. EICRs and consumer unit upgrades are in consistent demand across the older housing stock.',
  'Labour rates in Grimsby are among the most affordable in England — typically £36 to £52 per hour for a qualified, registered electrician in 2026, reflecting the North East Lincolnshire regional market.',
];

const faqs = [
  {
    question: 'How do I find a reliable electrician in Grimsby?',
    answer:
      'The most reliable way to find a qualified electrician in Grimsby is to use the NICEIC contractor search at niceic.com or the NAPIT register at napit.org.uk, entering your Grimsby or Cleethorpes postcode. Both registers include only electricians assessed annually for technical competence and carrying appropriate insurance. NICEIC and NAPIT registered electricians can self-certify notifiable work under Part P, issuing valid compliance certificates without involving North East Lincolnshire Council. Always request a written survey and quote before work starts, and confirm you will receive a BS 7671 EIC and Part P compliance certificate on completion.',
  },
  {
    question: 'Do I need Part P certification for electrical work in Grimsby?',
    answer:
      'Yes. Grimsby is in England (North East Lincolnshire Council area) and Part P of the Building Regulations 2010 applies to all domestic electrical work. Notifiable work — new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to North East Lincolnshire Council Building Control before work begins. On completion, a Part P compliance certificate and BS 7671 EIC must be issued. These documents are essential for landlord compliance records and property sales.',
  },
  {
    question: 'Who is the DNO for Grimsby and Cleethorpes?',
    answer:
      'Northern Powergrid (NPG) is the Distribution Network Operator for Grimsby, Cleethorpes, and the wider Humber area. For new connections, supply upgrades, and G98/G99 generation notifications for solar PV, battery storage, or wind generation installations in the Grimsby area, you deal directly with NPG. G98 notifications for systems up to 16A per phase are submitted online. G99 applications for larger generation — including for commercial wind-adjacent installations — require prior approval. Given the offshore wind industry presence, NPG is a significant partner for commercial electricians in the area.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Grimsby?',
    answer:
      'A consumer unit replacement in Grimsby typically costs £450 to £780, including a new dual-RCD or RCBO board, all testing, and the EIC and Part P compliance certificate. Grimsby and North East Lincolnshire prices are at the affordable end of the England range. The exact cost depends on the number of circuits and the condition of existing wiring. Always obtain a fixed-price quote after a survey — avoid verbal quotes given without seeing the installation.',
  },
  {
    question: 'What are the EICR requirements for Grimsby landlords?',
    answer:
      "Grimsby's landlords must comply with The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. This requires a valid EICR every five years for all privately rented domestic properties. Any C1 (danger present) or C2 (potentially dangerous) observations must be remedied within 28 days of an unsatisfactory report. The EICR must be carried out by a qualified and competent person — in practice this means an electrician with C&G 2391 or equivalent inspection and testing qualification. Copies of the EICR must be provided to tenants within 28 days and to North East Lincolnshire Council on request.",
  },
  {
    question: 'Is there offshore wind electrical work available in the Grimsby area?',
    answer:
      'Yes. Grimsby is the operational and maintenance hub for a significant proportion of the UK\'s offshore wind capacity, including major wind farms in the Humber cluster. Commercial and industrial electrical work in this sector — on-shore substation maintenance, cable installation and testing, switchgear maintenance, and EV charger infrastructure for the growing offshore wind workforce — requires significant commercial and industrial electrical experience. Relevant additional qualifications include CompEx (hazardous areas), GWO (Global Wind Organisation) training, and offshore electrical installation experience. Major employers in the sector typically contract through formal procurement processes.',
  },
  {
    question: 'What is the typical cost of an EICR in Grimsby?',
    answer:
      'An EICR for a standard 3-bedroom residential property in Grimsby typically costs £125 to £210 — among the most affordable EICR prices in England. The Grimsby and Cleethorpes rental market generates consistent EICR demand from landlords. HMO EICRs and commercial periodic inspections cost more due to the greater number of circuits and the longer time required. Always use a NICEIC or NAPIT registered electrician with C&G 2391 or equivalent inspection and testing qualifications for EICR work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Grimsby.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Grimsby and Cleethorpes landlords, letting agents, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables for rewires and new circuits across Grimsby's varied residential and commercial stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Grimsby — Northern Powergrid notification and supply guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Grimsby pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing for domestic and commercial properties in Grimsby.',
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
    heading: 'Electrician in Grimsby: What You Need to Know',
    content: (
      <>
        <p>
          Grimsby (officially Great Grimsby) and its neighbouring town Cleethorpes together form the
          urban centre of North East Lincolnshire, with a combined population of around 165,000. A
          historic fishing port that transitioned into a major food processing centre, Grimsby is now
          also at the heart of the UK's offshore wind energy industry — the Humber offshore wind
          cluster is one of the largest concentrations of offshore wind capacity in the world, and
          Grimsby's port and quayside are home to the operations and maintenance bases for multiple
          large-scale wind farms.
        </p>
        <p>
          For electricians, Grimsby and Cleethorpes offer a substantial residential market with
          consistent demand for EICRs, consumer unit upgrades, and rewires across a largely
          affordable housing stock. The offshore wind sector and the town's substantial industrial
          and food processing base create commercial and industrial electrical opportunities for
          suitably qualified contractors. Cleethorpes' coastal and tourist economy adds a
          commercial strand with hotels, leisure facilities, and seasonal businesses.
        </p>
        <p>
          This guide covers finding a qualified electrician in Grimsby, typical costs, what
          qualifications matter, common jobs, and the regulatory framework that applies across
          North East Lincolnshire.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Grimsby',
    content: (
      <>
        <p>
          To find a reliable and qualified electrician in Grimsby or Cleethorpes, follow these steps:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the NICEIC or NAPIT register</strong> — search at niceic.com or
                napit.org.uk with your Grimsby or Cleethorpes postcode. Registration means the
                electrician has been assessed annually and can self-certify notifiable work under
                Part P, issuing valid compliance certificates without involving North East
                Lincolnshire Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask to see the scheme card</strong> — NICEIC and NAPIT registered
                electricians carry a registration card. The card number can be checked online
                to confirm current registration before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insist on a survey and written quote</strong> — for rewires, consumer
                unit replacements, and any significant electrical work, a reputable Grimsby
                electrician will visit to assess the existing installation before providing
                a fixed-price quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm documentation on completion</strong> — after notifiable work you
                must receive a Part P compliance certificate and a BS 7671 EIC. For an EICR, you
                must receive the full inspection report with each observation individually
                classified as C1, C2, C3, or FI.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In the Grimsby market, local reputation matters. Ask neighbours and trades contacts for
          recommendations — an electrician who is well known and trusted in the area will generally
          provide the most reliable service.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Grimsby (2026)',
    content: (
      <>
        <p>
          Grimsby electrician rates are among the most affordable in England in 2026, reflecting the
          North East Lincolnshire regional labour market:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£36 — £52</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£240 — £355</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£315 — £440</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£60 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£450 — £780</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£82 — £138</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£2,600 — £4,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£125 — £210</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£660 — £1,020</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Commercial and industrial electrical work — particularly in the offshore wind sector,
          food processing, and port-related industries — commands significantly higher rates than
          domestic work, reflecting the qualifications, experience, and risk management required.
          Always obtain a fixed-price quote after a proper survey for any domestic job.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Grimsby and Cleethorpes',
    content: (
      <>
        <p>
          The most in-demand electrical services across Grimsby and Cleethorpes in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords</strong> — Grimsby and Cleethorpes have active
                private rental markets. Landlords must comply with The Electrical Safety Standards
                in the Private Rented Sector (England) Regulations 2020. Building relationships
                with local letting agents creates a consistent EICR pipeline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — old fuse boards are common across
                Grimsby's 1930s–1960s housing stock. Consumer unit upgrades to dual-RCD or RCBO
                boards are consistently among the most requested domestic jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full and partial rewires</strong> — ageing wiring in Grimsby's
                inter-war and post-war housing stock generates rewiring work. Partial rewires
                following EICR C2 observations are common in properties where the full
                installation is not yet beyond economic repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — growing in residential areas, and
                particularly in the commercial and logistics sectors associated with the port
                and offshore wind industry workforce. Northern Powergrid notifications apply
                for solar PV; EV charger installations comply with BS 7671 and Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offshore wind and industrial</strong> — on-shore electrical work related
                to the Humber offshore wind cluster, including substation maintenance, cable
                installation and testing, and industrial premises maintenance. Requires commercial
                and industrial electrical qualifications and experience.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Grimsby',
    content: (
      <>
        <p>
          All domestic electrical work in Grimsby must comply with Part P of the Building Regulations
          and BS 7671:2018+A3:2024. The local authority is North East Lincolnshire Council:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — NICEIC, NAPIT, or ELECSA
                registered electricians self-certify notifiable work and issue Part P compliance
                certificates directly. This is the standard route for registered Grimsby electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>North East Lincolnshire Building Control</strong> — unregistered
                electricians must notify NELC Building Control before starting notifiable work.
                The council inspects and issues a completion certificate. This route is slower
                and involves a council fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024 compliance</strong> — all electrical installations
                must comply with the current edition. RCD protection is required under Regulation
                411.3.3 for all socket outlet circuits up to 32A and for circuits in kitchens,
                bathrooms, and outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — private landlords in Grimsby
                must comply with The Electrical Safety Standards in the Private Rented Sector
                (England) Regulations 2020. Valid EICRs every five years, with C1/C2 defects
                remedied within 28 days of an unsatisfactory report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Grimsby Property Types and Electrical Characteristics',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Post-War Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              The majority of Grimsby's residential stock was built between the 1920s and 1970s.
              Areas including Nunsthorpe, Scartho, and East Marsh have large amounts of
              inter-war semi-detached and terrace housing. Wiring from the 1930s–1960s is
              now at or past its expected service life. Consumer unit upgrades and full rewires
              are among the most common jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cleethorpes Coastal Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Cleethorpes has a mix of Victorian and Edwardian seafront properties, holiday
              accommodation, and modern residential areas. Seafront and coastal properties
              are subject to the damp and salt-spray environment of the Lincolnshire coast —
              electrical installations in these properties require appropriate IP-rated equipment
              and more frequent inspection to check for corrosion and moisture damage.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Private Development</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas including Laceby Acres, Waltham, and New Waltham on the southern edge of
              Grimsby have modern private housing built to current standards. Work here focuses
              on EV charger installations, additional circuits, and kitchen and bathroom
              electrical work. Customers expect professional documentation and a clean finish.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial and Industrial</h3>
            <p className="text-white text-sm leading-relaxed">
              Grimsby's port, food processing plants, and offshore wind operational base create
              substantial commercial and industrial electrical demand. Alexandra Dock and
              Grimsby Docks area hosts operations and maintenance facilities for multiple
              offshore wind operators. Commercial EICR, distribution board maintenance, and
              cable installation work are significant markets for commercial electricians.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Grimsby',
    content: (
      <>
        <p>
          Grimsby provides a consistent residential market for domestic electricians, with reliable
          demand from landlords, homeowners with ageing wiring, and a growing EV charger market.
          For electricians with commercial and industrial qualifications, the offshore wind and food
          processing sectors offer significant additional opportunity. Cleethorpes' coastal
          commercial sector adds a further strand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  directly from your phone on Grimsby and Cleethorpes jobs. Same-day documentation
                  sent to landlords keeps them compliant and builds a professional reputation.
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
                  to send professional, detailed quotes to Grimsby homeowners and landlords.
                  Itemised quotes with accurate local pricing win more work in a competitive
                  and price-sensitive market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to accurately size cables for rewires across Grimsby's inter-war and post-war
                  housing. Accurate voltage drop calculations are important on long cable runs
                  in the larger semi-detached properties.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Grimsby electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the residential and commercial electrical market in Grimsby and Cleethorpes. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianGrimsbyPage() {
  return (
    <GuideTemplate
      title="Electrician Grimsby | Find Electricians in Grimsby & Cleethorpes"
      description="Find qualified electricians in Grimsby and Cleethorpes. NICEIC and NAPIT registered, Part P compliant. EICRs for landlords, consumer unit replacement, house rewiring, EV charger installation, and local electrician rates for Grimsby 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Grimsby"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Grimsby:{' '}
          <span className="text-yellow-400">Find Electricians in Grimsby & Cleethorpes</span>
        </>
      }
      heroSubtitle="Grimsby's large inter-war housing stock, active rental market, and position as the UK's leading offshore wind hub create diverse demand for qualified electricians. Find NICEIC and NAPIT registered electricians across Grimsby, Cleethorpes, and North East Lincolnshire."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Grimsby"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Grimsby Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the residential and commercial electrical market in Grimsby and Cleethorpes. 7-day free trial."
    />
  );
}
