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
  { label: 'EICR Wolverhampton', href: '/eicr-wolverhampton' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'wolverhampton-regulations', label: 'Wolverhampton Regulations' },
  { id: 'landlord-duties', label: 'Landlord Duties' },
  { id: 'common-findings', label: 'Common Findings in Wolverhampton' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'costs', label: 'EICR Costs in Wolverhampton' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Wolverhampton to hold a valid EICR and renew it at least every five years.',
  'City of Wolverhampton Council enforces the 2020 Regulations and can issue civil penalties of up to £30,000 per breach for non-compliant landlords.',
  'Wolverhampton has a significant proportion of pre-1960s housing stock, including older terraced properties in Bilston, Willenhall, and Wednesfield — these properties frequently present C2 findings relating to earthing, bonding, and outdated wiring.',
  'C1 (danger present) and C2 (potentially dangerous) observations under BS 7671 Section 631 result in an Unsatisfactory EICR, requiring landlords to complete all remedial work within 28 days.',
  'Electricians carrying out EICRs in Wolverhampton must be qualified and competent — registration with NICEIC, NAPIT, or ELECSA is the recognised standard.',
];

const faqs = [
  {
    question: 'Are EICRs legally required in Wolverhampton?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Wolverhampton. Landlords must obtain an EICR before a new tenancy begins and at least every five years thereafter. City of Wolverhampton Council enforces these regulations and can issue fines of up to £30,000 for non-compliance.',
  },
  {
    question: 'How much does an EICR cost in Wolverhampton?',
    answer:
      'EICR prices in Wolverhampton are typically £120 to £200 for a one-bedroom flat, £150 to £250 for a two-bedroom property, £200 to £350 for a three-bedroom house, and £300 to £500 for larger four-bedroom or HMO properties. Prices vary depending on the number of circuits, access to consumer units, and the age and complexity of the installation. Wolverhampton rates are generally below those in London and other major cities.',
  },
  {
    question: 'What happens if an EICR fails in Wolverhampton?',
    answer:
      'An EICR is assessed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. The landlord must arrange all remedial work within 28 days of the inspection (or sooner if the inspector specifies). Written confirmation of completed remedial work must be provided to the tenant and to City of Wolverhampton Council within 28 days of completion. Failure to act is a separate breach carrying its own penalty.',
  },
  {
    question: 'What are the most common EICR failures in Wolverhampton?',
    answer:
      'In Wolverhampton\'s older housing stock the most common C2 findings are: absence of RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), inadequate main protective bonding to gas and water services (Regulation 544.1), aged rubber or cloth-insulated wiring presenting insulation breakdown risks, and deteriorated or non-compliant consumer units. Properties built before 1966 are particularly likely to contain aluminium wiring or single-core PVC cables without an earth.',
  },
  {
    question: 'How long does an EICR take in Wolverhampton?',
    answer:
      'A typical domestic EICR in Wolverhampton takes between two and five hours depending on the size of the property and the number of circuits. A one-bedroom flat may take around two to three hours, whilst a large detached house or HMO with multiple consumer units may take a full day. The inspector must carry out dead tests (insulation resistance, continuity) and live tests (earth fault loop impedance, RCD operation) on every circuit.',
  },
  {
    question: 'Do I need an EICR for my Wolverhampton HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Wolverhampton. City of Wolverhampton Council operates mandatory HMO licensing for properties with five or more occupants in two or more households. The EICR must cover all fixed electrical installations including fire alarm systems and emergency lighting. Many HMO licence conditions specify a maximum inspection interval of three years rather than five.',
  },
  {
    question: 'Who can carry out an EICR in Wolverhampton?',
    answer:
      'The inspector must be a qualified and competent person. For landlord compliance this means a person registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme, holding City and Guilds 2391 (Inspection and Testing) or equivalent and a current BS 7671 qualification (C&G 2382 18th Edition). Always verify registration on the scheme\'s online register before commissioning work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a thorough inspection and test of a property's fixed
          electrical installation. The inspection assesses the condition of all wiring, consumer
          units, earthing, bonding, sockets, light fittings, and associated equipment against the
          requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition Wiring Regulations).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory</strong> — the installation is in an acceptable condition. No
                urgent remedial action is required. A new inspection date is recommended (typically
                five years for rented properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory</strong> — the installation contains C1 (danger present) or
                C2 (potentially dangerous) observations. Remedial work is legally required within
                28 days. The landlord must not begin or continue a tenancy without confirming
                remedial work is completed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR replaces the older Periodic Inspection Report (PIR) and follows the format set
          out in BS 7671 Section 631. It is the document required by the 2020 private rented sector
          electrical safety regulations and by HMO licensing schemes operated by City of
          Wolverhampton Council.
        </p>
      </>
    ),
  },
  {
    id: 'wolverhampton-regulations',
    heading: 'EICR Regulations in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton falls within England and is therefore subject to the Electrical Safety
          Standards in the Private Rented Sector (England) Regulations 2020. City of Wolverhampton
          Council is the local housing authority responsible for enforcement. The regulations came
          into force on 1 June 2020 for new tenancies and 1 April 2021 for all existing tenancies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must comply</strong> — all private landlords letting properties in
                Wolverhampton under assured shorthold tenancies, assured tenancies, or regulated
                tenancies. Social housing has separate obligations. Lodger arrangements where the
                landlord lives in the property are excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — a valid EICR must be obtained before a new
                tenancy begins and at least every five years thereafter. Some HMO licence conditions
                specify a shorter interval. The inspection date on the EICR itself may recommend an
                earlier re-inspection where the installation's condition warrants it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant and authority copies</strong> — a copy of the EICR must be provided
                to existing tenants within 28 days and to new tenants before they move in. The
                council can request a copy at any time; the landlord must supply it within seven days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — City of Wolverhampton Council can issue civil penalties
                of up to £30,000 per breach. Each failure to comply (no EICR, failure to provide to
                tenant, failure to complete remedial work) is a separate breach.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-duties',
    heading: 'Landlord Duties Under the 2020 Regulations',
    content: (
      <>
        <p>
          Wolverhampton landlords have a clear set of legal duties under the 2020 Regulations.
          Meeting these duties protects tenants and avoids civil penalties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission an EICR</strong> from a qualified and competent person before a
                new tenancy begins and at least every five years. Keep copies of all previous EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribute copies</strong> — provide the EICR to existing tenants within 28
                days, to new tenants before occupancy, and to City of Wolverhampton Council within
                seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work</strong> — if the EICR is Unsatisfactory, arrange
                all remedial work by a competent electrician within 28 days (or the shorter period
                specified by the inspector for C1 findings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm completion in writing</strong> — obtain written confirmation from
                the electrician that remedial work is complete and distribute this to tenants and
                the council within 28 days of completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords who fail to comply cannot serve a valid Section 21 (no-fault eviction) notice.
          This is a significant practical consequence for Wolverhampton landlords seeking possession
          of their property.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Wolverhampton Properties',
    content: (
      <>
        <p>
          Wolverhampton's housing stock includes a high proportion of Victorian and Edwardian
          terraced properties, particularly in areas such as Bilston, Wednesfield, Willenhall, and
          Whitmore Reans. Many of these properties have electrical installations that have never
          been comprehensively rewired. The following are the most frequent C1 and C2 observations
          recorded in local EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absence of RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires
                RCD protection (≤30mA) on all socket-outlet circuits rated up to 32A. Older
                properties with consumer units replaced piecemeal but without RCD-protected ways
                are common in Wolverhampton. This is typically a C2 finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate main protective bonding</strong> — Regulation 544.1 requires
                main protective bonding conductors to connect gas, water, and other extraneous
                conductive parts to the main earthing terminal. Older properties often have missing
                or undersized bonding conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring insulation</strong> — properties with 1960s-era
                PVC-insulated wiring may show hardened, cracked, or degraded insulation. Insulation
                resistance tests (IR tests per BS 7671 Section 612) will reveal circuits below the
                minimum 1MΩ threshold, resulting in C1 or C2 observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer units</strong> — plastic consumer units replaced
                after 2016 must be housed in a non-combustible enclosure under Amendment 3 to the
                17th Edition (now incorporated into BS 7671:2018). Older plastic enclosures without
                metal blanking plates present a fire risk and are recorded as C2.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes: C1, C2, C3 and FI',
    content: (
      <>
        <p>
          Every observation recorded on a Wolverhampton EICR is assigned a classification code
          under BS 7671 Section 631. Understanding these codes helps landlords, tenants, and
          electricians assess the urgency of remedial action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger Present</strong>: Risk of injury is present. Immediate remedial
                action is required. The inspector may recommend disconnection of the affected
                circuit. The installation cannot be confirmed as Satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially Dangerous</strong>: A fault or deficiency exists that
                could become dangerous. Urgent remedial action is required. The overall EICR
                outcome is Unsatisfactory. Landlords must complete all C2 work within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement Recommended</strong>: The installation does not meet the
                current edition of BS 7671 but does not present an immediate or potential danger.
                The EICR can still be Satisfactory with only C3 observations. C3 items do not
                legally require immediate remedial action but should be addressed when practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further Investigation Required</strong>: The inspector was unable to
                fully investigate a particular item. Further investigation is required before an
                assessment can be made. FI observations result in an Unsatisfactory EICR until
                resolved.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a full explanation of how observation codes affect landlord compliance obligations,
          see our{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Wolverhampton (2026 Prices)',
    content: (
      <>
        <p>
          EICR prices in Wolverhampton and the wider West Midlands are generally more affordable
          than in London and the South East, reflecting lower local labour rates and reduced
          travelling costs. Prices vary depending on property size, number of circuits, and the
          condition and complexity of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £200. Typically 3 to 5 circuits with
                a single consumer unit. Allow 2 to 3 hours inspection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £150 to £250. The most common property type
                in the Wolverhampton private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £350. Victorian terraced houses in
                Bilston and Willenhall may take longer due to the age and complexity of the
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO / large house</strong> — £300 to £500 or more. Multiple consumer
                units, fire alarm circuits, and emergency lighting increase inspection time
                and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Any remedial work identified during
          the EICR (upgrading consumer units, fitting RCD protection, replacing wiring) is quoted
          and charged separately. Some Wolverhampton electricians offer a combined EICR and remedial
          package at a reduced total cost.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Wolverhampton',
    content: (
      <>
        <p>
          When commissioning an EICR in Wolverhampton, landlords should verify the electrician's
          qualifications and registration before booking. An EICR carried out by an unqualified
          person has no legal standing under the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check scheme registration</strong> — use the NICEIC, NAPIT, or ELECSA
                online registers to find Wolverhampton-based electricians. Registration confirms
                qualifications, insurance, and regular third-party assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) or equivalent, plus a current BS 7671 (C&G 2382 18th Edition)
                qualification. Experience with older West Midlands property types is valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — always confirm the electrician
                holds professional indemnity insurance. This is a condition of competent person
                scheme membership and protects both parties if an error is made on the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated test equipment</strong> — a valid EICR requires calibrated
                instruments. Ask the electrician when their equipment was last calibrated. Reputable
                inspectors will have current calibration certificates for their multifunction testers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your EICR Business in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton's large private rented sector — particularly the concentration of older
          terraced housing across Bilston, Wednesfield, Whitmore Reans, and the town centre — creates
          strong, consistent demand for landlord EICRs. Electricians who build a reputation for
          thorough, reliable inspection work can develop a substantial repeat-client base.
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
                  to complete the full condition report on your phone while still in the property.
                  AI board scanning, voice-entry test results, and instant PDF export mean no
                  evening paperwork. Send the report to the landlord before leaving the job.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are recorded, quote the remedial work on the day
                  using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Wolverhampton landlords must act within 28 days — the electrician who quotes
                  on the inspection day wins the remedial contract.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work in Wolverhampton with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and convert findings to remedial quotes on the spot. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRWolverhamptonPage() {
  return (
    <GuideTemplate
      title="EICR Wolverhampton | Electrical Installation Condition Report"
      description="EICR Wolverhampton — landlord regulations, costs, common findings in older West Midlands properties, qualified electrician requirements, observation codes, and enforcement by City of Wolverhampton Council. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Wolverhampton:{' '}
          <span className="text-yellow-400">Electrical Inspection & Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything you need to know about Electrical Installation Condition Reports in Wolverhampton — legal requirements under the 2020 Regulations, costs, common findings in older West Midlands properties, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Wolverhampton"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location in Wolverhampton"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
