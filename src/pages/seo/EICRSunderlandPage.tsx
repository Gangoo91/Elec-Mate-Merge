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
  Search,
  Clock,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Sunderland', href: '/eicr-sunderland' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in Sunderland' },
  { id: 'sunderland-enforcement', label: 'Sunderland City Council Enforcement' },
  { id: 'eicr-costs-sunderland', label: 'EICR Costs in Sunderland' },
  { id: 'inspection-frequency', label: 'How Often Is an EICR Required?' },
  { id: 'common-findings', label: 'Common EICR Findings in Sunderland' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Sunderland' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Sunderland private landlords to hold a valid EICR and provide it to tenants before a new tenancy and at least every five years.',
  'Sunderland City Council enforces the 2020 Regulations and can impose civil penalties of up to £30,000 per breach on non-compliant landlords.',
  'EICR costs in Sunderland typically range from £150 to £280 for a standard two-bedroom property, reflecting North East labour rates.',
  'Sunderland has a large stock of older terraced housing, ex-local authority properties, and student accommodation around the University of Sunderland — all common sources of EICR demand.',
  'Landlords must complete all remedial work identified by C1 or C2 observations within 28 days of the EICR or sooner if the inspector specifies.',
];

const faqs = [
  {
    question: 'Is an EICR a legal requirement for landlords in Sunderland?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply throughout England, including Sunderland. Private landlords must arrange for the electrical installation to be inspected and tested by a qualified person and obtain an EICR at least every five years, or before a new tenancy begins. A copy must be provided to tenants within 28 days and to Sunderland City Council within seven days if requested.',
  },
  {
    question: 'How much does an EICR cost in Sunderland?',
    answer:
      'EICR costs in Sunderland typically range from £150 to £180 for a one-bedroom flat, £180 to £260 for a two-bedroom property, £220 to £300 for a three-bedroom house, and £300 to £500 for larger properties or HMOs. North East labour rates are generally lower than national averages. Always obtain quotes from NICEIC or NAPIT registered electricians to ensure the report will be accepted for compliance purposes.',
  },
  {
    question: 'What happens if a Sunderland rental property fails its EICR?',
    answer:
      'If the EICR contains C1 or C2 observations, the report is classified as Unsatisfactory. The landlord must complete all required remedial work within 28 days of the inspection, or sooner if the report specifies. Written confirmation of the completed work must be provided to the tenant and to Sunderland City Council. Failing to complete the remedial work is itself a breach of the regulations and can attract a further penalty of up to £30,000.',
  },
  {
    question: 'Can Sunderland City Council fine landlords for EICR non-compliance?',
    answer:
      'Yes. Sunderland City Council is the local housing authority with power to impose civil financial penalties of up to £30,000 per breach of the 2020 Regulations. Each separate failure — not obtaining an EICR, not providing it to tenants, not supplying it to the council on request, and not completing remedial work — constitutes its own breach and may attract its own penalty.',
  },
  {
    question: 'Do I need an EICR for a student let near the University of Sunderland?',
    answer:
      'Yes. Student lets are private rented sector properties and are subject to the same 2020 Regulations as any other rental property. Student properties near the University of Sunderland, particularly those operated as HMOs, also require a valid HMO licence from Sunderland City Council, for which a current EICR is a mandatory condition. Student tenants are increasingly aware of their rights and may request to see the EICR before moving in.',
  },
  {
    question: 'How long is an EICR valid in Sunderland?',
    answer:
      'An EICR for a rental property is valid for five years or until the next recommended inspection date if the inspector specifies a shorter interval. For HMO licensed properties in Sunderland, the licence conditions may specify a shorter period. Once the EICR expires, or when a new tenancy begins and the existing EICR is close to expiry, a new inspection is required.',
  },
  {
    question: 'What qualifications should an EICR inspector have in Sunderland?',
    answer:
      'The inspector must be a qualified and competent person. For landlord compliance purposes this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA. The inspector should hold City and Guilds 2391 (Inspection and Testing) or equivalent and a current 18th Edition BS 7671 qualification (C&G 2382). Registration can be verified on the NICEIC and NAPIT websites.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties across England.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what landlords must do.',
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
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician after inspecting and testing the fixed electrical installation in a
          property. The inspection covers the consumer unit, all circuits, wiring, earthing,
          bonding, sockets, and light fittings. The report is produced in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 18th Edition
          </SEOInternalLink>
          , the national wiring regulations standard.
        </p>
        <p>
          Each observation in an EICR is given a classification code that indicates the severity of
          the issue:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present:</strong> Immediate risk of injury. Remedial action must
                be taken urgently. The inspector may recommend isolating the affected circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous:</strong> Not immediately dangerous but requires
                urgent remedial action. Under the 2020 Regulations, landlords must complete
                rectification within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended:</strong> Does not meet current standards but
                is not classified as dangerous. No mandatory action under the regulations, but
                advisable to address over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation:</strong> An issue exists but cannot be fully
                assessed without additional investigation. Should be arranged promptly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR containing only C3 observations (or no observations) is classified as
          Satisfactory. An EICR with any C1 or C2 observations is Unsatisfactory and requires the
          landlord to arrange remedial work before they are compliant with the 2020 Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICR in Sunderland',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          came into force for new tenancies on 1 June 2020 and for all existing tenancies on 1 April
          2021. All private landlords in Sunderland are legally required to comply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-year maximum:</strong> The electrical installation must be inspected
                and tested at intervals of no more than five years. If the current EICR is older
                than five years, a new inspection is required before continuing the tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New tenancies:</strong> A valid EICR must be provided to new tenants before
                they take occupation of the property. If no valid EICR exists, one must be obtained
                before the tenancy begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants:</strong> A copy of the EICR must be supplied to all
                existing tenants within 28 days of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council requests:</strong> If Sunderland City Council requests the EICR, the
                landlord must provide it within seven days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to assured shorthold tenancies and assured tenancies. Owner-occupied
          properties, social housing, and lodger arrangements where the landlord is resident are
          outside the scope of the regulations.
        </p>
      </>
    ),
  },
  {
    id: 'sunderland-enforcement',
    heading: 'Sunderland City Council Enforcement',
    content: (
      <>
        <p>
          Sunderland City Council is the local housing authority responsible for enforcing the 2020
          Regulations across the Sunderland City Council area, which includes Sunderland city
          centre, Washington, Houghton-le-Spring, and surrounding areas. The council's housing
          enforcement team investigates complaints about rented property conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000:</strong> Each breach of the regulations
                attracts a separate civil penalty. Failing to obtain an EICR, failing to share it
                with tenants, and failing to complete remedial work are each separate breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices:</strong> The council can serve a remedial notice on a
                non-compliant landlord. If the landlord fails to carry out the work, the council can
                arrange for it to be done and recover the costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restriction:</strong> A landlord who has not provided the tenant
                with a valid EICR cannot serve a valid Section 21 notice for possession. This is a
                significant practical consequence for Sunderland landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HHSRS assessments:</strong> The council also enforces the Housing Health and
                Safety Rating System (HHSRS), under which electrical hazards can trigger improvement
                or prohibition orders independently of the 2020 Regulations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with student properties in the SR1 and SR2 postcodes near the University of
          Sunderland should be aware that the council pays close attention to the student rental
          market. Tenant complaints in this area are taken seriously and investigated promptly.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-costs-sunderland',
    heading: 'EICR Costs in Sunderland (2026 Prices)',
    content: (
      <>
        <p>
          Sunderland benefits from North East labour rates, which are generally lower than the
          national average, making EICRs more affordable than in cities such as London or Bristol.
          Prices vary based on property size, age, circuit complexity, and the electrician's
          qualifications and registration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £180. Typical for purpose-built flats in
                the city centre or Roker area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £180 to £260. Most common rental type in
                Sunderland. Older terraces in Pallion or Ford may attract higher prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £220 to £300. Semi-detached or terraced
                properties in Washington or Houghton-le-Spring typically fall in this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or four-bedroom plus</strong> — £300 to £500+. Multiple consumer units
                and additional circuits significantly increase inspection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspection and report are covered by these prices. Remedial work is quoted and charged
          separately. Many Sunderland electricians offer to quote the remedial work immediately
          after completing the inspection, which can save landlords time when working to the 28-day
          remedial deadline.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-frequency',
    heading: 'How Often Is an EICR Required in Sunderland?',
    content: (
      <>
        <p>
          The required frequency of EICR inspections depends on the type of property and occupancy.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rental properties:</strong> At least every five years under the 2020
                Regulations. A new inspection is required when a new tenancy begins if the existing
                EICR has expired or is close to expiry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMOs:</strong> Sunderland City Council HMO licence conditions typically
                require inspection at intervals stated in the licence. Check specific licence
                conditions, as some require inspection every five years and others every three.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied properties:</strong> No legal requirement, but the IET
                recommends inspection every ten years. An EICR is strongly recommended before
                purchasing an older property in Sunderland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>After significant electrical work:</strong> Following any major installation
                or rewiring, an Electrical Installation Certificate (EIC) should be issued. A new
                EICR will be needed when the EIC period expires.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Sunderland Properties',
    content: (
      <>
        <p>
          Sunderland has a substantial stock of Victorian, Edwardian, and post-war housing, along
          with ex-local authority properties. These property types frequently generate specific EICR
          findings that Sunderland landlords and electricians should be aware of.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old consumer units without RCD protection:</strong> Properties with
                rewirable fuse boards or early MCB boards without RCDs are very common in
                Sunderland's older housing stock. Absence of RCD protection on socket circuits is
                typically recorded as a C2, requiring consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring:</strong> Pre-1970 rubber-insulated wiring and
                fabric-sheathed cables are frequently found in older Sunderland terraces and
                semi-detached properties. These attract C1 or C2 observations where insulation has
                cracked or perished.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate bonding:</strong> Missing or undersized main protective bonding
                conductors to gas and water services are common in ex-local authority and older
                terraced properties. This is a frequent C2 finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits:</strong> In student HMOs and converted properties,
                circuits are sometimes extended beyond their original design capacity. Evidence of
                overloading, such as overheating at accessories, attracts C1 or C2 observations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Sunderland',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) are common in Sunderland, particularly in areas
          surrounding the University of Sunderland and the city centre. Landlords of HMOs in
          Sunderland face additional obligations beyond the standard 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing:</strong> Properties with five or more occupants in
                two or more households require a mandatory HMO licence from Sunderland City Council.
                A current EICR is a mandatory condition of the licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems:</strong> HMOs require interlinked fire detection and
                alarm systems. The fire alarm system is part of the fixed electrical installation
                and forms part of the EICR inspection scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting:</strong> Where required under licence conditions,
                emergency lighting is also included in the EICR inspection. Landlords should confirm
                with Sunderland City Council whether their HMO requires emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMOs:</strong> Operating an unlicensed HMO in Sunderland is a
                criminal offence that can result in prosecution, an unlimited fine, and a banning
                order preventing the landlord from letting property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Sunderland',
    content: (
      <>
        <p>
          Sunderland's private rented sector — including a significant number of student lets, HMOs,
          and older terrace properties — creates strong demand for EICR inspections and associated
          remedial work. Electricians in Sunderland and the wider North East who invest in
          inspection and testing qualifications can build a reliable income stream from this market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Sunderland</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full report on your phone while still on site. AI board scanning,
                  voice test entry, and instant PDF export mean you hand the landlord a compliant
                  PDF before you leave — no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Remedial Work in Sunderland</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C2 findings such as unprotected consumer units come up — which is common in
                  Sunderland's older housing stock — quote the remedial work immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Landlords under the 28-day clock almost always proceed with the electrician who
                  inspected the property.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EICR business in Sunderland with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to complete EICRs on site, scan boards with AI, and export instant PDFs. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRSunderlandPage() {
  return (
    <GuideTemplate
      title="EICR Sunderland | Electrical Inspection Sunderland"
      description="EICR requirements for Sunderland landlords and homeowners. Legal obligations under the 2020 Regulations, Sunderland City Council enforcement, costs £150–300, HMO requirements, and finding qualified electricians in Sunderland."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Sunderland:{' '}
          <span className="text-yellow-400">Electrical Inspection Requirements</span>
        </>
      }
      heroSubtitle="Everything Sunderland landlords and homeowners need to know about EICR — legal requirements under the 2020 Regulations, Sunderland City Council enforcement, inspection costs, common findings in Sunderland's housing stock, and HMO obligations."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR in Sunderland"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Site — Anywhere in the North East"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
