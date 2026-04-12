import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  PoundSterling,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR for Student Houses', href: '/eicr-for-student-houses' },
];

const tocItems = [
  { id: 'legal-requirement', label: 'Legal Requirement for Student HMOs' },
  { id: 'five-year-cycle', label: 'Five-Year Inspection Cycle' },
  { id: 'common-defects', label: 'Common Defects in Student Houses' },
  { id: 'after-c2', label: 'What to Do After a C2 Finding' },
  { id: 'enforcement', label: 'Local Authority Enforcement' },
  { id: 'costs', label: 'EICR Costs for Student Houses' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Student houses that meet the definition of a House in Multiple Occupation (HMO) — three or more tenants forming two or more households sharing facilities — must have an EICR every 5 years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'Mandatory licensing for larger HMOs (five or more tenants in three or more storeys) requires an EICR as a condition of the licence. Some local authorities apply additional licensing to smaller HMOs including typical student houses (three or four tenants).',
  'The most common EICR findings in student houses are missing or inadequate RCD protection, overloaded ring circuits (from extensive use of extension leads), outdated consumer units without RCDs, and poor earthing on old metal consumer units.',
  'After a C2 (potentially dangerous) finding, the landlord must arrange for remedial work to be completed within 28 days (or the period specified by the EICR) and provide written confirmation of completion to the tenant and the local authority.',
  'EICR costs for a typical student house (3 to 5 bedrooms) in a university city range from \u00a3150 to \u00a3350 depending on the number of circuits. HMOs with complex installations or fire alarm systems may cost more.',
];

const faqs = [
  {
    question: 'Do student houses need an EICR?',
    answer:
      'Yes. Student houses that are let to three or more tenants forming two or more separate households are classified as Houses in Multiple Occupation (HMOs) under the Housing Act 2004. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all privately rented properties in England — including student HMOs — must have a valid EICR conducted by a qualified person every 5 years. Some universities and student accommodation portals require landlords to provide a current EICR as a condition of listing.',
  },
  {
    question: 'How often does a student house need an electrical inspection?',
    answer:
      'The minimum requirement under the 2020 Regulations is every 5 years, or more frequently if the EICR specifies. In practice, many HMO licences require an EICR at every renewal (every 5 years for mandatory licences, or more frequently under additional licensing schemes). If the property changes hands or the tenancy ends and a new set of tenants moves in, a current EICR (valid within 5 years) must be provided. If an EICR expires during a tenancy, the landlord must obtain a new one before it expires.',
  },
  {
    question: 'What is the most common electrical fault found in student houses?',
    answer:
      'The most common findings in student house EICRs are: (1) lack of RCD protection on socket circuits — older properties with single fuse boards may have no RCDs protecting any circuit; (2) overloaded ring circuits — student tenants frequently use multiple extension leads and multi-way adapters, creating overloading risks; (3) damaged socket outlets and switches from heavy use and poor maintenance; (4) deteriorated wiring in older terrace properties that may not have been rewired since original construction; and (5) missing or inadequate earth bonding in bathrooms and kitchens.',
  },
  {
    question: 'Can a landlord do an EICR themselves on a student house?',
    answer:
      'No. The Electrical Safety Standards Regulations require the inspection to be carried out by a "qualified person" — defined as someone competent to undertake inspection and testing in accordance with BS 7671 and the associated IET Guidance Note 3. In practice, this means a qualified electrician with appropriate inspection and testing qualifications (such as City and Guilds 2391 or equivalent). A landlord cannot carry out their own EICR unless they hold the relevant electrical qualifications.',
  },
  {
    question: 'What happens if a student house EICR has a C2 finding?',
    answer:
      'A C2 (potentially dangerous) observation on an EICR means the electrician has identified a condition that, while not requiring immediate danger-of-life intervention, poses a risk if left unaddressed. The landlord must arrange remedial work within 28 days of receiving the EICR report (or within the period specified in the report if shorter). Once the remedial work is complete, the electrician must issue a Minor Works Certificate or a new EIC for any new circuits. The landlord must then provide written confirmation of completion to the tenant and the local authority within 28 days.',
  },
  {
    question: 'What does the local authority check for in a student HMO?',
    answer:
      'Local authority HMO officers inspect student houses for compliance with the HMO Management Regulations (SI 2006/372) and the licensing conditions specific to the local authority. Electrical checks typically focus on whether a current EICR exists, whether the consumer unit is modern and has adequate RCD protection, whether smoke and heat detectors are correctly installed and in working order, whether emergency lighting exists in larger HMOs, and whether electrical equipment supplied by the landlord is safe under the Electrical Equipment (Safety) Regulations 2016.',
  },
  {
    question: 'How much does an EICR cost for a student house?',
    answer:
      "For a typical 3 to 5 bedroom student house, an EICR costs between \u00a3150 and \u00a3350. The price depends on the number of circuits (each circuit must be tested individually), the accessibility of wiring, the age of the installation, and the electrician's location. University cities with high demand (Leeds, Manchester, Sheffield, Nottingham, Birmingham) may have competitive pricing. Always obtain at least two quotes and confirm the electrician holds appropriate inspection and testing qualifications.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrician-staffordshire',
    title: 'Find an Electrician in Staffordshire',
    description: 'Staffordshire electricians — NICEIC registered, Part P certified.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'RCD protection, socket positions, and cooker circuits in shared kitchens.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete student house EICRs on your phone with AI board scanning.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'legal-requirement',
    heading: 'Legal Requirement for Student Houses — The 2020 Regulations',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          (SI 2020/312) impose a statutory duty on landlords to ensure that the electrical
          installation in rented properties is inspected and tested at least every 5 years by a
          qualified person. This applies to all privately rented residential properties in England,
          including student accommodation.
        </p>
        <p>
          Student houses that meet the definition of an HMO under the Housing Act 2004 are subject
          to the 2020 Regulations plus additional HMO licensing requirements from their local
          authority. The combination of these two regulatory regimes means that student HMO
          landlords face the most comprehensive electrical compliance obligations of any residential
          landlord category.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>When is a student house an HMO?</strong> — a property is an HMO when it is
                occupied by three or more people forming two or more households who share basic
                amenities (kitchen, bathroom, WC). Most student houses of three or more tenants
                qualify. Two-person households with two students are not HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory licensing threshold:</strong> HMOs of five or more tenants in a
                building of three or more storeys require a mandatory HMO licence from the local
                authority. The EICR is a condition of this licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing:</strong> many local authorities in university cities
                have introduced additional (selective) HMO licensing schemes that apply to smaller
                student houses of three or four tenants. Check with the relevant council whether
                additional licensing applies in your area.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'five-year-cycle',
    heading: 'The Five-Year EICR Inspection Cycle',
    content: (
      <>
        <p>
          The 2020 Regulations require EICRs at intervals not exceeding 5 years. The clock starts
          from the date of the most recent EICR — not from the start of any particular tenancy. This
          means a landlord with a valid 2021 EICR must obtain a new one by 2026, regardless of how
          many tenants have come and gone in the interim.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New tenants:</strong> the landlord must provide a copy of the current EICR
                to each new tenant before or at the commencement of their tenancy. For student
                houses where groups change annually, this means providing the EICR to each incoming
                cohort at the start of the academic year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants:</strong> if an EICR is obtained during an existing tenancy
                (for example, as the first EICR under the 2020 Regulations), a copy must be provided
                to current tenants within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority copies:</strong> the local authority can request a copy of
                the EICR at any time. The landlord must supply it within 7 days of the request.
                Failure to do so can result in a remedial notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter intervals:</strong> where the EICR specifies a shorter interval (for
                example, "next inspection in 3 years" due to the age of the wiring), the shorter
                period overrides the 5-year default. Always check the recommendation on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found in Student Houses',
    content: (
      <>
        <p>
          Student houses are typically in the older part of a town or city's housing stock
          (Victorian and Edwardian terraces near universities) and are subject to intensive
          occupation by tenants with little incentive to report maintenance issues. This combination
          produces a predictable set of recurring defects on EICRs.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Most Frequent C2 Findings in Student Houses
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — properties with older
                consumer units (single-fuse boards or older split-load boards without RCDs on socket
                circuits) fail to meet Regulation 411.3.3 of BS 7671. This is the single most common
                C2 in student house EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded ring circuits</strong> — student tenants often use multiple
                extension leads and multi-way adapters in bedrooms (for phone chargers, laptops,
                gaming equipment, mini-fridges). This does not typically cause an immediate C1
                finding but contributes to circuit loading concerns and damaged socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing bathroom supplementary bonding</strong> — older bathroom
                installations may lack supplementary bonding of metallic bath, basin, pipework, and
                heating (if present). Where the main protective bonding is also deficient, this can
                be a C1 finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged wiring accessories</strong> — cracked or broken socket outlets,
                light switches with exposed conductors, and damaged flex at light fittings are
                commonly found in student houses. These are typically C2 (potentially dangerous) if
                conductors are exposed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old consumer units without RCDs</strong> — rewirable fuse boards and early
                MCB boards without RCDs are still found in older student house stock. Replacement
                with a modern RCBO board is typically required to achieve satisfactory status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated insulation</strong> — rubber-insulated cables from pre-1960s
                installations may show evidence of insulation cracking or deterioration,
                particularly on buried or underfloor cable routes. These installations typically
                require full or partial rewiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-c2',
    heading: 'What Landlords Must Do After a C2 Finding',
    content: (
      <>
        <p>
          A C2 observation code (potentially dangerous) on an EICR requires the landlord to take
          remedial action. The 2020 Regulations prescribe a specific process that must be followed.
          Failure to comply can result in enforcement action by the local authority.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Commission remedial work:</strong> arrange for a qualified
                electrician to carry out the remedial work identified in the EICR within 28 days of
                receiving the report (or within the period specified in the EICR if shorter). A C1
                (danger present) observation requires immediate action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Obtain confirmation:</strong> once remedial work is completed, the
                electrician must issue either a new EICR (if a full inspection was required) or an
                Electrical Installation Certificate or Minor Works Certificate for the remedial
                works. This written confirmation is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Provide confirmation to tenant:</strong> within 28 days of
                receiving the written confirmation, provide a copy to each tenant of the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Provide confirmation to local authority:</strong> if the local
                authority has requested a copy of the EICR or evidence of remediation, provide it
                within 28 days. The 2020 Regulations require landlords to supply this evidence to
                local authorities on request.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 findings (improvement recommended):</strong> a C3 observation does not
                require remedial action under the 2020 Regulations — it is a recommendation only.
                However, many landlords choose to address C3 items proactively to avoid them
                becoming C2 items at the next inspection. Common C3 findings include lack of SPD
                (surge protection device) and absence of arc fault detection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink
            href="/guides/eicr-observation-codes-explained"
            label="EICR observation codes guide"
          />{' '}
          for a full explanation of C1, C2, C3, and FI codes.
        </p>
      </>
    ),
  },
  {
    id: 'enforcement',
    heading: 'Local Authority Enforcement',
    content: (
      <>
        <p>
          Local authorities are responsible for enforcing the Electrical Safety Standards
          Regulations in their area. For student house landlords, this enforcement typically comes
          through the council's housing or private sector housing team, often the same team that
          processes HMO licence applications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices:</strong> where the council is satisfied that a landlord
                has not complied with the 2020 Regulations, it can issue a remedial notice requiring
                specified works to be completed within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalty notices:</strong> where a landlord fails to comply with a
                remedial notice, the local authority can arrange for the works to be carried out and
                recover the cost from the landlord, or impose a civil penalty of up to \u00a330,000
                per breach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence conditions:</strong> for licensed HMOs, non-compliance with the
                EICR requirement can be grounds for refusing to grant or renew the licence, or for
                adding conditions that restrict occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant complaints:</strong> tenants or their representatives (including
                university accommodation offices) can report non-compliance to the local authority.
                Councils have a duty to investigate such complaints.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs for Student Houses',
    content: (
      <>
        <p>
          The cost of an EICR for a student house depends primarily on the number of circuits (each
          circuit requires individual testing), the size of the property, and the electrician's
          location. University cities vary significantly in their EICR pricing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-bedroom student house (6 to 8 circuits):</strong> \u00a3150 to \u00a3250
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4 to 5 bedroom student HMO (8 to 12 circuits):</strong> \u00a3200 to
                \u00a3350
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6+ bedroom large HMO:</strong> \u00a3300 to \u00a3500 — larger boards, more
                circuits, potential fire alarm system testing adds cost
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (C2 remediation):</strong> \u00a3500 to
                \u00a31,200 for a modern RCBO board including installation and a new EICR
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partial rewire (C2 old wiring remediation):</strong> \u00a3800 to
                \u00a33,000 depending on extent and access
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with multiple student properties can often negotiate reduced EICR rates with
          electricians for block bookings — typically arranged at the end of the academic year when
          properties are vacant between tenancies. This is also the most practical time to carry out
          any remedial work identified.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Student House EICRs with Elec-Mate',
    content: (
      <>
        <p>
          Student house EICRs are high-volume, time-sensitive work — particularly in university
          cities during the summer tenancy changeover period. Elec-Mate is designed to help
          electricians complete EICRs efficiently on-site and deliver professional PDF reports to
          landlords immediately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — complete
                student house EICRs on your phone. AI board scanning identifies circuit types and
                auto-populates the schedule of circuits. Observations with C1/C2/C3/FI codes,
                recommendations, and limitation fields all included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/eic-certificate" label="EIC Certificate" /> — issue EICs
                for remedial works including consumer unit replacements and new circuits installed
                to address C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink
                  href="/guides/eicr-observation-codes-explained"
                  label="EICR observation codes reference"
                />{' '}
                — quick reference for grading observations during student house inspections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForStudentHousesPage() {
  return (
    <GuideTemplate
      title="EICR for Student Houses — HMO Electrical Inspection Guide 2024"
      description="EICR requirements for student houses and HMOs: 5-year mandatory inspection cycle, local authority enforcement, common defects (missing RCDs, old consumer units), costs (\u00a3150\u2013\u00a3350), and landlord obligations after a C2 finding."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          EICR for Student Houses{' '}
          <span className="text-yellow-400">— HMO Electrical Inspection Guide</span>
        </>
      }
      heroSubtitle="The complete guide to EICR requirements for student houses and HMOs: mandatory 5-year inspection cycle, the most common defects found in student accommodation, what landlords must do after a C2 finding, and realistic costs."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="EICR for Student Houses — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Complete student house EICRs faster with Elec-Mate"
      ctaSubheading="AI board scanning, instant PDF reports, and compliant certificates delivered to landlords on the same day. Start your free 7-day trial."
    />
  );
}
