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
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Landlord Electrical Safety Reading', href: '/landlord-electrical-safety-reading' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'reading-enforcement', label: 'Reading Borough Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Reading' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Reading' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Reading private landlords to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Reading Borough Council enforces the 2020 Regulations with civil penalties of up to £30,000 per breach. The council has an active environmental health team that investigates tenant complaints and conducts licensing inspections.',
  "Reading has a large private rented sector driven by the University of Reading, Reading's status as a major Thames Valley technology and financial services hub, and proximity to London. Both student and professional rental demand is high.",
  'Reading Borough Council operates mandatory HMO licensing and additional licensing schemes. A valid EICR is required for all HMO licences, with many requiring inspections every three years.',
  'Post-war and 1960s housing stock in Reading presents specific EICR challenges, including original wiring, older consumer unit designs, and absent RCD protection on socket circuits under BS 7671 Regulation 411.3.3.',
];

const faqs = [
  {
    question: 'What are the electrical safety rules for Reading landlords?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Reading private landlords to have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days of inspection and supplied to Reading Borough Council within seven days if requested. Penalties of up to £30,000 per breach apply for non-compliance.',
  },
  {
    question: 'Does Reading Borough Council actively enforce landlord electrical safety?',
    answer:
      "Yes. Reading Borough Council's environmental health team investigates tenant complaints about electrical safety and conducts inspections of licensed HMOs. The council has powers to impose civil penalties of up to £30,000 per breach, arrange remedial work at the landlord's expense, and revoke HMO licences for persistent non-compliance. Reading's large private rented sector means enforcement activity is ongoing.",
  },
  {
    question: 'Do Reading student properties need an EICR?',
    answer:
      'Yes. All privately rented properties in Reading must comply with the 2020 Regulations, including student lets. Properties occupied by three or more students from different households qualify as HMOs and may require licensing from Reading Borough Council, with a valid EICR as a mandatory condition. Areas around the University of Reading in Earley, Whiteknights, and Tilehurst have high concentrations of student HMOs.',
  },
  {
    question: 'How often does a Reading HMO need an EICR?',
    answer:
      'The 2020 Regulations require an EICR at least every five years. Reading Borough Council HMO licence conditions may require more frequent inspections — commonly every three to five years. Check the specific conditions on your HMO licence. Properties that have previously received an Unsatisfactory EICR may require more frequent follow-up inspections as a licence condition.',
  },
  {
    question: 'What happens if a Reading rental fails its EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations under BS 7671 Section 631. The landlord must complete all required remedial work within 28 days (or sooner as specified) and obtain written confirmation from a qualified electrician. The confirmation must be provided to the tenant and to Reading Borough Council. Failure to act is a separate breach carrying its own penalty.',
  },
  {
    question: 'How much does an EICR cost in Reading?',
    answer:
      'Reading EICR costs reflect Thames Valley labour rates, which are above the national average but below central London levels. A one-bedroom flat typically costs £110 to £200, a two to three-bedroom property £180 to £320, and a student HMO £280 to £500 depending on size and complexity. Post-war properties with original wiring may require more thorough inspection and cost slightly more than modern properties.',
  },
  {
    question: 'What are common EICR findings in Reading rental properties?',
    answer:
      "Common EICR findings in Reading rental properties include absent RCD protection on socket-outlet circuits (C2 under BS 7671 Regulation 411.3.3), older consumer unit designs without adequate circuit protection, deteriorated insulation on post-war wiring, and inadequate main bonding. Reading's mix of 1950s to 1980s housing stock alongside Victorian terraces means inspectors encounter a wide range of wiring ages and conditions.",
  },
  {
    question: 'Can Reading tenants report their landlord for electrical safety issues?',
    answer:
      "Yes. Tenants have the right to receive a copy of the current EICR — new tenants before moving in, existing tenants within 28 days of inspection. If the landlord cannot provide a valid EICR, the tenant can report this to Reading Borough Council's environmental health team. The council can require the landlord to arrange an inspection, issue a remedial notice, and impose civil penalties for non-compliance.",
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
    title: 'EICR Observation Codes',
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
    href: '/landlord-electrical-safety-brighton',
    title: 'Landlord Electrical Safety Brighton',
    description:
      'EICR requirements for Brighton landlords, HMO licensing, and converted property challenges.',
    icon: Building2,
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
    id: 'regulations-overview',
    heading:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety obligations in Reading.
          These regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for
          all existing tenancies. Every private landlord in Reading must comply, regardless of
          property age, type, or tenant category.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                The report is produced under{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing requirements).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — existing tenants must receive a copy within
                28 days of the inspection. New tenants must receive a copy before moving in.
                Prospective tenants can request a copy within 28 days of their request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Reading Borough Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who is
                qualified and competent, meaning registration with a recognised competent person
                scheme (NICEIC, NAPIT, ELECSA, or equivalent).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all assured shorthold tenancies, assured tenancies, and regulated
          tenancies in England, including all student lets and professional tenancies across
          Reading, Earley, Caversham, and the surrounding borough. They do not apply to social
          housing or lodger arrangements where the landlord lives in the property.
        </p>
      </>
    ),
  },
  {
    id: 'reading-enforcement',
    heading: 'Reading Borough Council Enforcement',
    content: (
      <>
        <p>
          Reading Borough Council is the local housing authority responsible for enforcing the 2020
          Regulations within Reading. The council's environmental health team handles private rented
          sector complaints and licensing inspections. Wokingham Borough Council and West Berkshire
          District Council cover the surrounding areas beyond the Reading borough boundary.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental health team</strong> — Reading Borough Council's environmental
                health team investigates tenant complaints about electrical safety, conducts HMO
                licensing inspections, and issues civil penalties for non-compliance. Reading's
                large private rented sector generates a significant volume of enforcement activity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing enforcement</strong> — a valid EICR is a mandatory condition
                of HMO licences issued by Reading Borough Council. The council can refuse to grant
                or renew a licence where an EICR cannot be provided and can revoke a licence for
                persistent non-compliance with electrical safety conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven investigations</strong> — many Reading enforcement actions
                begin with tenant complaints. Tenants who discover their property lacks a valid EICR
                can report this to the council, triggering a formal investigation. Reading's active
                student population means awareness of housing rights is high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial powers</strong> — where a landlord fails to comply with a remedial
                notice, the council can arrange for the work to be carried out and recover costs
                from the landlord, alongside imposing civil penalties of up to £30,000 per breach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Reading landlords with properties across the borough boundary should note that Wokingham
          and West Berkshire have their own enforcement teams and may operate different licensing
          schemes. Compliance must be verified separately for each local authority area.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Reading',
    content: (
      <>
        <p>
          Reading has a substantial HMO market driven by the University of Reading, Reading's role
          as a major Thames Valley employment centre, and its position as an affordable alternative
          to London for commuters and young professionals. Areas around Whiteknights, Earley,
          Tilehurst, and the town centre contain high concentrations of HMO properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is required, covering all
                fixed electrical installations, communal areas, fire alarm systems, and emergency
                lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional HMO licensing</strong> — Reading Borough Council has operated
                additional licensing schemes covering smaller HMOs in designated areas. Landlords
                should check with the council whether their property falls within an additional
                licensing designation and what specific conditions apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals for HMOs</strong> — Reading HMO licence conditions
                commonly require EICRs every three to five years. Always check the conditions
                specified on your licence certificate. Properties that have received Unsatisfactory
                EICRs previously may face more frequent inspection requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war housing stock</strong> — a significant proportion of Reading's HMOs
                are in post-war terraced and semi-detached houses originally built for single-family
                occupation. Conversion to multi-occupancy use, combined with original 1950s to 1970s
                wiring, frequently results in C2 observations for absent RCD protection and
                overloaded circuits. Consumer unit replacement is commonly required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Reading is a criminal offence. Reading Borough Council
          actively investigates unlicensed HMOs, and landlords face prosecution and unlimited fines
          in addition to civil penalties under the electrical safety regulations.
        </p>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          The 2020 Regulations give Reading Borough Council the power to impose civil penalties of
          up to £30,000 per breach. Non-compliance creates multiple separate offences, each carrying
          its own potential penalty.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to tenants, failing to supply it to the council on request, and failing
                to complete remedial work within 28 days are each separate breaches. A Reading
                landlord ignoring all obligations on a single property could face combined penalties
                exceeding this figure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence revocation</strong> — persistent non-compliance with EICR
                conditions can lead to licence revocation. For Reading landlords operating student
                or professional HMOs, losing a licence means the property cannot legally be occupied
                as an HMO while a new application is processed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice without having provided the current EICR to the tenant.
                Reading landlords relying on Section 21 to regain possession at the end of
                professional or student tenancies must have EICR documentation in order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offence escalation</strong> — Reading Borough Council maintains
                enforcement records. Repeat breaches can result in higher penalties and more
                frequent compliance inspections across a landlord's portfolio.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A Reading EICR every five years — typically £150 to £350 — represents a very small cost
          compared to the maximum penalties or the consequences of losing an HMO licence. Reading
          landlords should budget for regular electrical safety inspections as a routine operating
          cost.
        </p>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights Under the 2020 Regulations',
    content: (
      <>
        <p>
          Reading tenants — whether students, young professionals, or long-term residents — have
          specific statutory rights regarding electrical safety in their rented property. Awareness
          of these rights has grown significantly since the 2020 Regulations came into force.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to receive the EICR</strong> — new tenants must receive a copy before
                moving in. Existing tenants must receive a copy within 28 days of the inspection.
                Always request the EICR from your Reading landlord or letting agent before signing a
                tenancy agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your Reading landlord cannot
                provide a valid EICR, report this to Reading Borough Council's environmental health
                team. The University of Reading Students' Union can also assist student tenants with
                housing complaints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work within 28 days. If the
                landlord fails to act, the council can arrange the work and recover costs. Tenants
                must not be charged for any remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015
                additionally protects tenants who raise legitimate complaints about property
                conditions from retaliatory eviction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Reading tenants can seek further advice from Citizens Advice Reading, Shelter, or Reading
          Borough Council's housing team. The council provides an online form for reporting private
          rented sector concerns.
        </p>
      </>
    ),
  },
  {
    id: 'remedial-timescales',
    heading: 'Remedial Work Timescales',
    content: (
      <>
        <p>
          When a Reading EICR identifies C1 or C2 observations (classified under BS 7671 Section
          631), landlords must complete remedial work within the strict timescales set by the 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timeframe. The 28-day
                period runs from the date of the inspection, not when the report is received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — a C1 (danger present) finding
                may require immediate disconnection of the affected circuit. Reading landlords must
                treat C1 observations as urgent and arrange emergency remedial work as soon as
                possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete,
                written confirmation from a qualified electrician must be obtained and provided to
                the tenant and to Reading Borough Council within 28 days of the work being
                completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Reading remedial work</strong> — typical remedial work includes
                fitting RCD protection on socket circuits (Regulation 411.3.3 of BS 7671), replacing
                older consumer units, upgrading main bonding, replacing deteriorated cables in
                post-war properties, and rectifying overloaded circuits in converted HMOs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Reading landlords should maintain relationships with reliable local electricians who can
          respond promptly to remedial notices. Delays beyond 28 days are a separate breach of the
          regulations and can attract additional penalties.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Reading',
    content: (
      <>
        <p>
          Reading and the wider Thames Valley area have a good supply of qualified electricians
          experienced in EICR work. Demand increases in the summer as landlords prepare student
          properties for the new academic year. Booking inspections in advance is advisable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find qualified Reading-based inspectors. Scheme registration confirms
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector must hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with post-war housing stock and HMOs common in
                the Reading area is valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book ahead of summer</strong> — demand peaks in June and July for student
                properties. Booking in April or May ensures availability and allows time for
                remedial work before September tenancy start dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance verification</strong> — confirm the inspector carries professional
                indemnity insurance. This is required by all recognised competent person schemes and
                protects both parties if an error appears on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Reading (2026 Prices)',
    content: (
      <>
        <p>
          Reading EICR costs reflect Thames Valley labour rates — higher than the national average
          but below central London levels. Costs vary with property age, size, and installation
          complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £110 to £200. Modern flats with straightforward
                installations are typically quicker and less expensive to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom house</strong> — £180 to £320. Post-war terraced and
                semi-detached houses with older wiring may take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £280 to £500. Fire alarm
                systems, emergency lighting, and multiple consumer units increase inspection scope
                and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large HMO (seven or more bedrooms)</strong> — £450 to £750+. Larger
                properties with complex electrical installations require proportionally longer
                inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted and charged
          separately. Reading landlords with multiple properties may benefit from negotiating block
          pricing with a trusted local electrician to reduce the cost per inspection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Reading',
    content: (
      <>
        <p>
          Reading's combination of a large student population, a major professional workforce drawn
          by the Thames Valley technology and financial sectors, and significant post-war housing
          stock creates strong and consistent demand for landlord EICRs. The prevalence of older
          wiring in converted HMOs means remedial work opportunities are frequent and valuable.
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
                  to complete the full report on your phone while on site in Reading. AI board
                  scanning, voice test entry, and instant PDF export mean the landlord or letting
                  agent has their report before you leave. No evening paperwork, more jobs per day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C2 observations are found in a Reading HMO with old wiring, quote the
                  consumer unit replacement or RCD upgrade immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Reading landlords must act within 28 days — the electrician who quotes on the
                  day consistently wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Reading landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more Reading EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyReadingPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Reading | EICR for Landlords Reading"
      description="Landlord electrical safety requirements in Reading. 2020 Regulations, Reading Borough Council enforcement, HMO licensing, penalties up to £30,000, post-war property EICR challenges, and 2026 costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Reading:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Reading landlords need to know about electrical safety compliance — the 2020 Regulations, Reading Borough Council enforcement, HMO licensing, student and professional rental requirements, penalties of up to £30,000, and 2026 EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Reading"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
