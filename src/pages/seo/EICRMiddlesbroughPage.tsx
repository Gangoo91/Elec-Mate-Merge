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
  { label: 'EICR Guides', href: '/tools/eicr-certificate' },
  { label: 'EICR Middlesbrough', href: '/eicr-middlesbrough' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'middlesbrough-regulations', label: 'Middlesbrough Regulations' },
  { id: 'landlord-duties', label: 'Landlord Duties' },
  { id: 'common-findings', label: 'Common Findings in Middlesbrough' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'costs', label: 'EICR Costs in Middlesbrough' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Middlesbrough to hold a valid EICR and renew it at least every five years.',
  'Middlesbrough Council is the local housing authority responsible for enforcement and can impose civil penalties of up to £30,000 per breach.',
  'Middlesbrough has a significant proportion of pre-1960s terraced and semi-detached housing — many properties in Pallister, Berwick Hills, Grove Hill, and North Ormesby present C2 EICR findings including absent RCD protection and deteriorated wiring.',
  'C1 (danger present) and C2 (potentially dangerous) observations under BS 7671 Section 631 render an EICR Unsatisfactory, requiring all remedial work to be completed within 28 days.',
  'Middlesbrough offers some of the most competitive EICR prices in England due to low local labour rates and compact geography, typically £100 to £180 for a two-bedroom property.',
];

const faqs = [
  {
    question: 'Is an EICR legally required in Middlesbrough?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Middlesbrough. Landlords must obtain an EICR before each new tenancy and renew it at least every five years. Middlesbrough Council enforces these regulations and can issue fines of up to £30,000 per breach.',
  },
  {
    question: 'How much does an EICR cost in Middlesbrough?',
    answer:
      'Middlesbrough EICR prices are among the most affordable in England. A one-bedroom flat typically costs £90 to £150, a two-bedroom property £100 to £180, a three-bedroom house £160 to £270, and a larger or HMO property £250 to £420. Prices depend on property size, the number of circuits, and the age and complexity of the installation. Tees Valley labour rates are significantly lower than London or South East England.',
  },
  {
    question: 'What are the most common EICR failures in Middlesbrough?',
    answer:
      'The most common C2 findings in Middlesbrough properties are: absent RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), missing or inadequate main protective bonding to gas and water services (Regulation 544.1), degraded wiring insulation in properties with original 1950s and 1960s PVC cabling, and consumer units in combustible plastic enclosures. Many Middlesbrough terraced properties were built between 1900 and 1960 and have never had a full rewire.',
  },
  {
    question: 'How long does an EICR take in Middlesbrough?',
    answer:
      'A typical domestic EICR in Middlesbrough takes two to four hours for a terraced house or semi-detached property. Smaller flats may take two hours; larger HMOs with multiple consumer units and fire alarm circuits can require a full day. The inspector must carry out dead tests (insulation resistance, continuity) and live tests (earth fault loop impedance, RCD operation) on every circuit in the property.',
  },
  {
    question: 'What happens if my Middlesbrough property fails the EICR?',
    answer:
      'An EICR is graded Unsatisfactory where C1 or C2 observations are present. The landlord must arrange all remedial work within 28 days of the inspection date. For C1 (danger present) items the inspector may recommend immediate disconnection of the affected circuit. Written confirmation of completed remedial work must be provided to the tenant and to Middlesbrough Council within 28 days of the work being finished.',
  },
  {
    question: 'Do Middlesbrough HMOs need an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Middlesbrough. Middlesbrough Council operates mandatory HMO licensing for larger properties. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting. Middlesbrough has a high proportion of purpose-converted and older HMO stock, which tends to require more complex and time-consuming inspections.',
  },
  {
    question: 'Who can carry out an EICR in Middlesbrough?',
    answer:
      "The inspector must be a qualified and competent person — in practice, someone registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme. They should hold City and Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671 18th Edition qualification (C&G 2382). Always verify the electrician's registration on the scheme's public register before booking.",
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
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a thorough inspection and test of a property's fixed
          electrical installation. The inspection assesses wiring, consumer units, earthing and
          bonding, sockets, switches, and all fixed electrical equipment against the requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition IET Wiring Regulations), which is the standard adopted across England,
          Scotland, and Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory</strong> — the installation is in an acceptable condition for
                continued use. No urgent remedial action is required. A recommended re-inspection
                date is recorded on the report (typically five years for rented properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory</strong> — the inspection has found C1 (danger present) or C2
                (potentially dangerous) observations. Landlords must arrange all remedial work
                within 28 days. The property cannot be let, or a new tenancy cannot continue,
                without evidence that the necessary work is underway or complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR replaces the older Periodic Inspection Report (PIR) format. It is the document
          required by the 2020 private rented sector regulations and by HMO licensing schemes
          administered by Middlesbrough Council.
        </p>
      </>
    ),
  },
  {
    id: 'middlesbrough-regulations',
    heading: 'EICR Regulations in Middlesbrough',
    content: (
      <>
        <p>
          Middlesbrough is an English local authority and is subject to the Electrical Safety
          Standards in the Private Rented Sector (England) Regulations 2020. Middlesbrough Council
          is the local housing authority responsible for enforcement across the borough, which
          covers the town and surrounding areas including Acklam, Marton, Nunthorpe, and the
          Teesside University district.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must comply</strong> — all private landlords letting under assured
                shorthold tenancies, assured tenancies, or regulated tenancies in the Middlesbrough
                Council area. Social housing and live-in landlord arrangements are excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — before each new tenancy and at least every
                five years. The inspector may recommend a shorter reinspection period on the EICR
                itself where the installation's condition warrants it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document distribution</strong> — copies must be given to existing tenants
                within 28 days, to new tenants before they move in, and to Middlesbrough Council
                within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Middlesbrough Council can issue fines of up to
                £30,000 per breach. Each failure to comply constitutes a separate breach, so a
                landlord without an EICR who also fails to complete remedial work faces multiple
                penalties.
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
          The 2020 Regulations impose clear, actionable duties on Middlesbrough landlords.
          Compliance is straightforward for landlords who plan ahead and maintain a relationship
          with a qualified local electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain a valid EICR</strong> from a qualified and competent person.
                Commission the inspection before each new tenancy begins and ensure the existing
                EICR does not expire during the tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribute the report</strong> — to existing tenants within 28 days of the
                inspection, to new tenants before they take up occupation, and to Middlesbrough
                Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work within 28 days</strong> — if the EICR is
                Unsatisfactory. C1 findings may require immediate action. All remedial work must be
                carried out by a competent electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide written confirmation of remedial completion</strong> to the tenant
                and council within 28 days of the work being finished.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Middlesbrough landlords who have not provided an EICR to their tenant cannot serve a valid
          Section 21 (no-fault eviction) notice. This is a practical compliance incentive in
          addition to the risk of civil penalties.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Middlesbrough Properties',
    content: (
      <>
        <p>
          Middlesbrough's housing stock includes a high proportion of Victorian, Edwardian, and
          post-war terraced properties in areas such as Pallister Park, Berwick Hills, Grove Hill,
          North Ormesby, and Linthorpe. Many of these properties have partially updated electrical
          installations that present recurring inspection findings. The following are the most
          frequent Unsatisfactory observations in local EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires 30mA
                RCD protection on all socket-outlet circuits rated up to 32A. Consumer units
                replaced without RCD-protected ways are common in older Middlesbrough terraces. This
                is typically coded C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate or missing protective bonding</strong> — Regulation 544.1
                requires main protective bonding conductors to connect gas, water, and other
                extraneous conductive parts to the main earthing terminal. Older properties
                frequently have absent or undersized bonding, coded C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring insulation</strong> — properties with rubber-sheathed
                wiring from the 1940s and 1950s, or early PVC wiring from the 1960s, frequently fail
                insulation resistance testing (minimum 1MΩ per BS 7671 Section 612). Hardened or
                cracked insulation represents a shock and fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer unit enclosures</strong> — consumer units installed
                in combustible plastic enclosures after 2016 do not meet the requirements
                incorporated into BS 7671:2018 (derived from Amendment 3 to the 17th Edition). These
                are recorded as C2 where the enclosure presents a fire risk.
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
          When an EICR issued for a Middlesbrough property identifies C1 or C2 observations, the
          2020 Regulations impose strict legal timescales for completing remedial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days from the inspection date</strong> — all remedial work must be
                completed within 28 days of the EICR. The clock starts from the inspection date, not
                when the landlord receives the written report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 items — immediate action</strong> — where a C1 (danger present)
                observation is recorded the inspector may recommend disconnection of the affected
                circuit or equipment. Landlords should not wait the full 28 days for these items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation of completion</strong> — once remedial work is done,
                the landlord must obtain written confirmation from the competent electrician and
                distribute it to the tenant and to Middlesbrough Council within 28 days of
                completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing the deadline is a separate breach</strong> — failure to complete
                remedial work within the 28-day window constitutes an independent breach of the
                regulations with its own potential £30,000 penalty.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Middlesbrough (2026 Prices)',
    content: (
      <>
        <p>
          Middlesbrough and the wider Tees Valley area offer some of the most competitive EICR
          prices in England. Low local labour rates and the compact geography of the town keep costs
          significantly below those in London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £90 to £150. Typically 3 to 5 circuits.
                Inspection usually completed in under three hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £100 to £180. The most common property type
                in Middlesbrough's private rented sector. Older terraces may have more complex
                inspection requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £160 to £270. Victorian and Edwardian
                terraced properties in North Ormesby and Pallister often take longer due to the
                complexity of older or partially rewired installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO / large property</strong> — £250 to £420 or more. Multiple consumer
                units, fire alarm systems, and emergency lighting increase the inspection scope and
                price.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work identified during the
          EICR (consumer unit upgrades, RCD installation, rewiring) is quoted and charged
          separately. Some Middlesbrough electricians offer a package rate when they can see
          remedial work will be required.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Middlesbrough',
    content: (
      <>
        <p>
          The 2020 Regulations require EICRs to be carried out by a qualified and competent person.
          An EICR from an unqualified inspector has no legal standing and will not satisfy the
          landlord regulations or HMO licensing conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Search official registers</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find qualified electricians operating in Middlesbrough and the Tees
                Valley. Registration confirms qualifications, insurance, and regular quality
                assessment by the scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) or the equivalent Level 3 Award in Inspection and Testing, plus a current
                BS 7671 18th Edition qualification (C&G 2382). Experience with Tees Valley property
                types — especially older terraced stock — is beneficial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — always confirm that the
                electrician holds professional indemnity insurance. This is a condition of competent
                person scheme membership and protects both parties in the event of an error on the
                report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated test instruments</strong> — a valid EICR requires calibrated
                multifunction testers. Ask when the electrician's equipment was last calibrated.
                Reputable inspectors will have current calibration certificates available on
                request.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an EICR Business in Middlesbrough',
    content: (
      <>
        <p>
          Middlesbrough's large private rented sector — driven by affordable property prices,
          student demand from Teesside University, and high rental yields — creates consistent,
          recurring demand for EICR work. Landlords owning multiple older terraced properties across
          Pallister Park, Berwick Hills, and North Ormesby often consolidate their inspection work
          with a single trusted electrician.
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
                  eliminate evening admin and let you take on more work each day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, raise a remedial quote immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Middlesbrough landlords must act within 28 days — the electrician who quotes on
                  inspection day wins the remedial contract.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work across Middlesbrough with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more inspections per day and convert findings to remedial quotes on the spot. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRMiddlesbroughPage() {
  return (
    <GuideTemplate
      title="EICR Middlesbrough | Electrical Installation Condition Report"
      description="EICR Middlesbrough — landlord regulations, inspection costs in the Tees Valley, common findings in older terraced properties, qualified electrician requirements, and enforcement by Middlesbrough Council. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Middlesbrough:{' '}
          <span className="text-yellow-400">Electrical Inspection & Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything landlords and electricians need to know about Electrical Installation Condition Reports in Middlesbrough — legal requirements under the 2020 Regulations, costs in the Tees Valley, common findings in older terraced properties, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Middlesbrough"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location in Middlesbrough"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
