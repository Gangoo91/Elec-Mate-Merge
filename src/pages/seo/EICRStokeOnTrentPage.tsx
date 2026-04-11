import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Scale,
  Building2,
  Zap,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-explained' },
  { label: 'EICR Stoke-on-Trent', href: '/eicr-stoke-on-trent' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'stoke-regulations', label: 'Stoke-on-Trent Regulations' },
  { id: 'landlord-duties', label: 'Landlord Duties' },
  { id: 'common-findings', label: 'Common Findings in Stoke-on-Trent' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'costs', label: 'EICR Costs in Stoke-on-Trent' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Stoke-on-Trent to obtain a valid EICR and renew it at least every five years.',
  'Stoke-on-Trent City Council is the local housing authority responsible for enforcement and can issue civil penalties of up to £30,000 per breach.',
  'Stoke-on-Trent has a large proportion of pre-1960s terraced housing across its six towns — Burslem, Fenton, Hanley, Longton, Stoke, and Tunstall — which frequently present C2 EICR findings including absent RCD protection and deteriorated wiring.',
  'C1 and C2 observations under BS 7671 Section 631 render an EICR Unsatisfactory, requiring landlords to complete all remedial work within 28 days.',
  'EICR prices in Stoke-on-Trent are among the more affordable in England, typically £120 to £180 for a two-bedroom terraced house.',
];

const faqs = [
  {
    question: 'Is an EICR legally required in Stoke-on-Trent?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Stoke-on-Trent. Landlords must obtain an EICR before each new tenancy and at least every five years. Stoke-on-Trent City Council enforces these regulations and can impose fines of up to £30,000 per breach for non-compliance.',
  },
  {
    question: 'How much does an EICR cost in Stoke-on-Trent?',
    answer:
      'Stoke-on-Trent EICR prices are typically £100 to £160 for a one-bedroom flat, £120 to £200 for a two-bedroom terraced house, £180 to £300 for a three-bedroom house, and £250 to £450 for larger or HMO properties. Prices depend on property size, the number of circuits, and the age and condition of the installation. The six-towns area generally offers competitive rates compared to larger cities.',
  },
  {
    question: 'What are the most common EICR failures in Stoke-on-Trent?',
    answer:
      "The most common C2 findings in Stoke-on-Trent properties are: absence of RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), inadequate or missing main protective bonding to gas and water services (Regulation 544.1), degraded wiring insulation in properties with original 1960s PVC cabling, and non-compliant consumer units housed in combustible plastic enclosures. Many of the six towns' terraced properties have never been comprehensively rewired.",
  },
  {
    question: 'How long does an EICR take in Stoke-on-Trent?',
    answer:
      'A typical domestic EICR in Stoke-on-Trent takes two to four hours for a standard terraced house. A one-bedroom flat may take two hours; a large HMO with multiple consumer units and fire alarm circuits may require a full day. The inspector must complete insulation resistance tests and earth fault loop impedance tests on every circuit, which cannot be rushed without compromising accuracy.',
  },
  {
    question: 'What happens if my Stoke-on-Trent property fails the EICR?',
    answer:
      'An Unsatisfactory EICR means C1 or C2 observations were found. Landlords must arrange all remedial work within 28 days (or sooner for C1 danger-present items). The remedial work must be carried out by a competent electrician. Written confirmation of completion must be provided to the tenant and Stoke-on-Trent City Council within 28 days of the work being finished.',
  },
  {
    question: 'Do HMOs in Stoke-on-Trent need an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Stoke-on-Trent. Stoke-on-Trent City Council operates mandatory licensing for larger HMOs. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting. Some HMO licence conditions specify an inspection interval shorter than five years.',
  },
  {
    question: 'Who is qualified to carry out an EICR in Stoke-on-Trent?',
    answer:
      "The inspector must be a qualified and competent person — in practice, someone registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme. They should hold City and Guilds 2391 (Inspection and Testing) or equivalent and a current BS 7671 18th Edition qualification (C&G 2382). Always verify registration on the scheme's public register before commissioning.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description: 'What to do when a rented property receives an unsatisfactory EICR.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an Electrical Installation Condition Report?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a document produced following a
          thorough inspection and test of a property's fixed electrical installation by a qualified
          electrician. The inspection assesses wiring, consumer units, earthing and bonding,
          sockets, switches, light fittings, and all fixed electrical equipment against the
          requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition IET Wiring Regulations).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory outcome</strong> — the installation meets the standard required
                for continued safe use. No urgent remedial action is required. A recommended
                re-inspection date is recorded (typically five years for rented properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory outcome</strong> — C1 (danger present) or C2 (potentially
                dangerous) observations have been found. The landlord must arrange remedial work
                within 28 days. The property cannot be let without evidence that remedial work is
                underway or complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR supersedes the older Periodic Inspection Report (PIR) format. It is the document
          required by both the 2020 private rented sector regulations and by HMO licensing schemes
          operated by Stoke-on-Trent City Council.
        </p>
      </>
    ),
  },
  {
    id: 'stoke-regulations',
    heading: 'EICR Regulations in Stoke-on-Trent',
    content: (
      <>
        <p>
          Stoke-on-Trent is an English local authority area and is therefore subject to the
          Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
          Stoke-on-Trent City Council is the local housing authority responsible for enforcement.
          The regulations have applied to all tenancies since 1 April 2021.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — applies to all assured shorthold tenancies, assured
                tenancies, and regulated tenancies in the Stoke-on-Trent city council area. Social
                housing has separate requirements. Excluded: properties where the landlord is a
                resident landlord sharing the property with the tenant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency</strong> — an EICR must be obtained before each new tenancy and
                renewed at least every five years. Earlier reinspection may be recommended on the
                EICR itself for older or more complex installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution</strong> — landlords must provide a copy to existing tenants
                within 28 days, to new tenants before they move in, and to the council within seven
                days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement</strong> — Stoke-on-Trent City Council can issue civil penalties
                of up to £30,000 per breach. Each individual failure (no EICR, failure to provide
                copy, failure to complete remedial work) is a separate breach.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-duties',
    heading: 'Landlord Duties: What Stoke-on-Trent Landlords Must Do',
    content: (
      <>
        <p>
          Stoke-on-Trent landlords have a clearly defined set of legal obligations. Compliance
          protects both the tenant and the landlord from potentially costly enforcement action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain a valid EICR</strong> from a qualified and competent electrician
                before beginning a new tenancy and at least every five years. Retain copies of all
                previous EICRs as a record of the property's electrical history.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide copies promptly</strong> — to existing tenants within 28 days of the
                inspection, to new tenants before they occupy the property, and to Stoke-on-Trent
                City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work within 28 days</strong> if the EICR is
                Unsatisfactory. C1 (danger present) items may require immediate disconnection and
                repair. All remedial work must be carried out by a competent electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain and distribute written confirmation</strong> — once remedial work is
                complete, obtain written confirmation from the electrician and provide copies to the
                tenant and council within 28 days of completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Non-compliance also prevents a landlord from serving a valid Section 21 (no-fault
          eviction) notice. Stoke-on-Trent landlords who have not provided the EICR to their tenant
          cannot regain possession through this route.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Stoke-on-Trent Properties',
    content: (
      <>
        <p>
          Stoke-on-Trent's housing stock is characterised by a high density of 19th and early 20th
          century terraced properties across the six towns. Many of these properties retain original
          or partially updated electrical installations. The following are the most frequent
          Unsatisfactory findings recorded during local EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — Regulation 411.3.3 of BS
                7671 requires 30mA RCD protection on all socket-outlet circuits up to 32A. Many
                Stoke properties have older consumer units without RCD-protected ways, typically
                recorded as C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or inadequate protective bonding</strong> — Regulation 544.1
                requires main protective bonding conductors connected to the main earthing terminal.
                Terraced properties in Burslem, Hanley, and Longton often have bonding conductors
                that are absent, corroded, or significantly undersized.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Degraded insulation resistance</strong> — insulation resistance testing (per
                BS 7671 Section 612) on circuits with aged PVC or rubber-sheathed cabling frequently
                reveals values below the required 1MΩ minimum, indicating insulation breakdown and
                potential shock or fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer units</strong> — consumer units installed or replaced
                before 2016 may be housed in combustible plastic enclosures. Since Amendment 3 to
                the 17th Edition (now consolidated in BS 7671:2018), consumer units in domestic
                premises must be housed in non-combustible enclosures.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'remedial-timescales',
    heading: 'Remedial Work Timescales',
    content: (
      <>
        <p>
          When an EICR identifies C1 or C2 observations, the 2020 Regulations impose strict
          timescales on landlords for completing remedial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days from the inspection date</strong> — all remedial work must be
                completed within 28 days of the EICR. The clock starts from the date of the
                inspection, not the date the landlord receives the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — immediate action</strong> — danger-present observations may lead the
                inspector to recommend immediate disconnection of the affected circuit or item.
                Landlords should not wait the full 28 days for C1 items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation of completion</strong> — once remedial work is done,
                the landlord must obtain written confirmation from the competent electrician and
                provide this to the tenant and to the council within 28 days of the work being
                completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure to complete is a separate breach</strong> — missing the 28-day
                deadline is an independent breach of the regulations, carrying its own potential
                penalty of up to £30,000.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Stoke-on-Trent (2026 Prices)',
    content: (
      <>
        <p>
          Stoke-on-Trent is one of the more affordable areas in England for EICR work. The
          relatively low local labour rates and compact geography of the six towns keep costs
          competitive. The following price ranges are typical for 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £100 to £160. Typically 3 to 4 circuits.
                Inspection usually completed in two to three hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £120 to £200. The most common property
                type in Stoke-on-Trent's private rented sector. Older properties may take longer due
                to complex or partial rewiring histories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £300. Victorian terraces in Longton,
                Burslem, and Tunstall can present more complex installations requiring additional
                inspection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO / large property</strong> — £250 to £450 or more. Multiple consumer
                units, fire alarm systems, and emergency lighting extend the inspection scope and
                cost significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Any remedial work — consumer unit
          upgrades, RCD installation, rewiring of circuits — is quoted separately. Some Stoke
          electricians offer a package rate when they know remedial work will be required.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Stoke-on-Trent',
    content: (
      <>
        <p>
          The 2020 Regulations require that the inspection is carried out by a qualified and
          competent person. An EICR produced by an unqualified inspector has no legal standing and
          will not satisfy either the landlord regulations or HMO licensing requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use official scheme registers</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for electricians operating in the Stoke-on-Trent area. Registration
                provides assurance of qualifications, professional indemnity insurance, and regular
                quality assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or the equivalent Level 3 Award in Inspection and
                Testing, plus a current BS 7671 18th Edition qualification (C&G 2382). Experience
                with older Staffordshire and Potteries-area property types is advantageous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated instruments</strong> — insulation resistance, earth fault loop
                impedance, and RCD testing require calibrated multifunction testers. Ask whether the
                electrician's instruments have current calibration certificates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid unusually low prices</strong> — an EICR priced well below the local
                market rate may indicate rushed testing or inadequate inspection. The savings are
                not worth the risk of an invalid report or missed findings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an EICR Business in Stoke-on-Trent',
    content: (
      <>
        <p>
          Stoke-on-Trent's large and affordable private rented sector — driven by relatively low
          property prices and strong rental demand across the six towns — provides steady, recurring
          work for electricians specialising in inspection and testing. Landlords with multiple
          properties across Burslem, Fenton, Hanley, Longton, Stoke, and Tunstall often prefer to
          use a single trusted electrician across their portfolio.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete and sign off the full condition report on your phone while still in
                  the property. AI board scanning, voice-entry test results, and instant PDF export
                  eliminate evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Convert Findings to Quotes Immediately
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are recorded, quote the remedial work on the day using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Stoke landlords must act within 28 days — quoting on the inspection day
                  maximises your chance of winning the remedial contract.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work across Stoke-on-Trent with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more inspections per day and convert findings to quotes on the spot. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRStokeOnTrentPage() {
  return (
    <GuideTemplate
      title="EICR Stoke-on-Trent | Electrical Inspection Stoke"
      description="EICR Stoke-on-Trent — landlord regulations, inspection costs, common findings in the six towns' older terraced properties, qualified electrician requirements, and enforcement by Stoke-on-Trent City Council. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Stoke-on-Trent:{' '}
          <span className="text-yellow-400">Electrical Inspection & Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything landlords and electricians need to know about Electrical Installation Condition Reports in Stoke-on-Trent — legal requirements, costs in the six towns, common findings in older terraced properties, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Stoke-on-Trent"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location Across Stoke-on-Trent"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
