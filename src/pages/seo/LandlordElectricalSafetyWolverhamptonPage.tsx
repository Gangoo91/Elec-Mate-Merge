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
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  {
    label: 'Landlord Electrical Safety Wolverhampton',
    href: '/landlord-electrical-safety-wolverhampton',
  },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'wolverhampton-enforcement', label: 'Wolverhampton Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Wolverhampton' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Wolverhampton to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'City of Wolverhampton Council is the local housing authority responsible for enforcement. Civil penalties of up to £30,000 per breach can be imposed on non-compliant landlords.',
  'Wolverhampton has a substantial private rented sector and a high concentration of older terraced housing stock that commonly presents C2 observations on inspection, including absent RCD protection and deteriorated wiring.',
  'HMOs in Wolverhampton require a valid EICR as a mandatory condition of licensing under both mandatory and additional HMO licensing schemes operated by the council.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete all remedial work within 28 days or sooner if the inspector specifies.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Wolverhampton?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Wolverhampton. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an Electrical Installation Condition Report (EICR) before a new tenancy begins and at least every five years. A copy must be provided to tenants within 28 days of the inspection and to City of Wolverhampton Council within seven days if requested. Penalties for non-compliance can reach £30,000 per breach.',
  },
  {
    question: 'How does City of Wolverhampton Council enforce electrical safety?',
    answer:
      'City of Wolverhampton Council enforces the 2020 Regulations through its housing and environmental health teams. Enforcement is largely complaint-driven — when a tenant reports concerns, the council can request the EICR from the landlord. If the landlord cannot produce a valid report, the council can issue a remedial notice and subsequently impose civil penalties. The council also enforces as part of its HMO licensing function, checking EICR compliance at application and renewal.',
  },
  {
    question: 'What is the most common EICR finding in Wolverhampton rental properties?',
    answer:
      'Wolverhampton has a high proportion of older terraced houses built before modern wiring standards. Common C2 observations include absence of RCD protection on socket-outlet circuits (required under Regulation 411.3.3 of BS 7671), deteriorated rubber or fabric-insulated cables, unsleeved earth conductors, and inadequate earthing and bonding. Properties with original consumer units lacking RCD protection will almost always receive an Unsatisfactory EICR requiring consumer unit replacement.',
  },
  {
    question: 'Do I need an EICR for my Wolverhampton HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Wolverhampton. Mandatory licensing applies to properties with five or more occupants in two or more households. The council also operates additional licensing covering smaller HMOs. The EICR must cover all fixed electrical installations including communal areas, fire alarm circuits, and emergency lighting. Many HMO licence conditions in Wolverhampton require EICRs every three to five years.',
  },
  {
    question: 'How much does a landlord EICR cost in Wolverhampton?',
    answer:
      'Wolverhampton EICR costs are broadly in line with the West Midlands average. A one-bedroom flat typically costs £100 to £180, a two-bedroom property £150 to £250, a three-bedroom terraced house £180 to £320, and an HMO £300 to £600 depending on size and the number of consumer units. Prices for older properties with complex or deteriorated wiring may be higher due to extended testing time.',
  },
  {
    question: 'What happens if my Wolverhampton rental property fails the EICR?',
    answer:
      'If the EICR contains C1 (danger present) or C2 (potentially dangerous) observations it is classified as Unsatisfactory. Under the 2020 Regulations, the landlord must complete all remedial work within 28 days of the inspection date. The work must be carried out by a qualified electrician. Written confirmation of the completed work must be provided to the tenant and to the council within 28 days of completion. Failure to complete remedial work is a separate breach attracting its own penalty of up to £30,000.',
  },
  {
    question: 'Can a Wolverhampton tenant request an EICR?',
    answer:
      "Yes. Tenants have the right to request a copy of the current EICR from their landlord. If the landlord cannot provide one, the tenant can report this to City of Wolverhampton Council's environmental health or private rented sector team. The council can require the landlord to arrange an inspection. If the landlord fails to comply with a remedial notice, the council can arrange for the work to be done and recover costs from the landlord.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Wolverhampton?',
    answer:
      'The inspector must be a qualified and competent person. In practice this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA, and holding City and Guilds 2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification (C&G 2382 18th Edition). Experience with older West Midlands housing stock — particularly pre-1970s wiring — is also important when inspecting Wolverhampton rental properties.',
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
    description: 'What to do when a rented property receives an Unsatisfactory EICR.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/landlord-electrical-safety-birmingham',
    title: 'Landlord Electrical Safety Birmingham',
    description: 'Birmingham landlord EICR requirements, council enforcement, and HMO rules.',
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
          are the primary legislation governing landlord electrical safety obligations in
          Wolverhampton. These regulations came into force on 1 June 2020 for new tenancies and 1
          April 2021 for all existing tenancies. Every private landlord in Wolverhampton must
          comply, regardless of when the tenancy began.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                The EICR is documented in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to
                existing tenants within 28 days of the inspection. New tenants must receive a copy
                before they move in. Prospective tenants can request a copy within 28 days of making
                that request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to City of Wolverhampton Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who is
                qualified and competent. For practical purposes this means a person registered with
                a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent).
              </span>
            </li>
          </ul>
        </div>
        <p>
          These regulations apply to all assured shorthold tenancies, assured tenancies, and
          regulated tenancies in England. They do not apply to social housing (which has separate
          obligations) or lodger arrangements where the landlord lives in the same property.
        </p>
      </>
    ),
  },
  {
    id: 'wolverhampton-enforcement',
    heading: 'Wolverhampton Council Enforcement',
    content: (
      <>
        <p>
          City of Wolverhampton Council is the local housing authority responsible for enforcing the
          2020 Regulations across the city. The council's housing and environmental health teams
          handle complaints about private rented sector conditions and have the power to
          investigate, issue remedial notices, and impose civil financial penalties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven enforcement</strong> — enforcement in Wolverhampton is
                primarily triggered by tenant complaints. When a tenant raises concerns about
                electrical safety, the council can request the EICR from the landlord. If the
                landlord cannot produce a valid report within the required period, the council can
                issue a remedial notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing checks</strong> — EICR compliance is checked as part of HMO
                licence applications and renewals. A landlord applying for a new or renewed HMO
                licence without a valid EICR will not meet the mandatory licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action powers</strong> — if a landlord fails to comply with a
                remedial notice, the council can arrange for the work to be carried out and recover
                costs from the landlord. This power exists alongside the power to impose civil
                financial penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum penalty</strong> — City of Wolverhampton Council can impose civil
                penalties of up to £30,000 per breach. Each failure — failing to obtain an EICR,
                failing to provide it to the tenant, failing to complete remedial work — is a
                separate breach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Wolverhampton landlords should note that the West Midlands Combined Authority and national
          government have both signalled an intention to increase enforcement activity in the
          private rented sector. Proactive compliance is significantly less costly than responding
          to enforcement action.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Wolverhampton',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) in Wolverhampton face additional electrical safety
          requirements beyond the standard 2020 Regulations. Wolverhampton has a significant HMO
          sector, particularly around the city centre and university areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a mandatory licence
                condition. The report must cover all fixed electrical installations including
                communal areas, fire alarm systems, and emergency lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — City of Wolverhampton Council may operate
                additional HMO licensing schemes covering smaller HMOs not caught by mandatory
                licensing. Check with the council whether your property requires a licence under any
                additional scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety integration</strong> — HMO fire alarm systems (Grade A or D,
                typically LD2 or LD1 systems) and emergency lighting form part of the fixed
                electrical installation. The EICR inspector must test these systems. RCD protection
                under Regulation 411.3.3 of BS 7671 is especially important in HMOs where multiple
                households share circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — HMO licence conditions in Wolverhampton may
                require EICRs more frequently than the standard five-year maximum. Review your
                specific licence conditions for the required interval.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Wolverhampton is a criminal offence that can result in
          prosecution and an unlimited fine, in addition to civil penalties for breach of the
          electrical safety regulations. The council has powers to inspect properties suspected of
          operating without a licence.
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
          The 2020 Regulations give City of Wolverhampton Council the power to impose civil
          financial penalties for non-compliance. The maximum penalty is £30,000 per breach, and
          each failure to comply constitutes a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the council on request, and
                failing to complete remedial work are each separate breaches. A landlord who has
                never obtained an EICR and ignores a remedial notice could face multiple penalties
                significantly exceeding £30,000 in aggregate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice unless they have provided the tenant with a copy of the
                current EICR. Non-compliance with electrical safety obligations can therefore
                prevent landlords from recovering possession of their property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action costs</strong> — where the council arranges remedial work
                after a landlord's failure to comply, it can recover the full cost of that work from
                the landlord. This is in addition to any civil penalty imposed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — many landlord insurance policies require
                the property to meet current statutory requirements. A property without a valid EICR
                may not be covered by the landlord's buildings or contents insurance in the event of
                an electrical fire or fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of obtaining an EICR in Wolverhampton — typically £100 to £320 for standard
          properties — is trivial compared to the financial and legal consequences of
          non-compliance. Wolverhampton landlords should treat electrical safety as a mandatory
          operating cost, not an optional expense.
        </p>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights Under the Regulations',
    content: (
      <>
        <p>
          The 2020 Regulations give tenants in Wolverhampton specific rights regarding electrical
          safety in their rented property. Tenants should be aware of these rights and how to
          exercise them.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a copy
                within 28 days of the inspection. New tenants must receive a copy before moving in.
                If you have not received one, request it in writing from your landlord or letting
                agent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your landlord has not obtained
                an EICR or has not completed required remedial work, report this to City of
                Wolverhampton Council's environmental health or housing team. The council has the
                power to investigate and take enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies urgent safety
                issues (C1 or C2 observations), the landlord must arrange remedial work within 28
                days. If the landlord fails to act, the council can arrange for the work to be done.
                The tenant must not be charged for this work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without having provided the EICR to the tenant. The
                Deregulation Act 2015 also provides protection from retaliatory eviction where a
                tenant has raised a legitimate complaint about the property's condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Wolverhampton tenants can contact the council's environmental health team, Shelter, or
          Citizens Advice for guidance on exercising these rights. The council's housing enforcement
          team can be contacted directly to report non-compliant landlords.
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
          When an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), the
          landlord is legally required to complete remedial work within strict timescales under the
          2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR date, unless the inspector specifies a shorter timeframe. The
                28-day clock starts from the date of the inspection, not the date the report is
                received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — where a C1 (danger present)
                observation is recorded, the inspector may recommend immediate disconnection of the
                affected circuit. Landlords should arrange emergency remedial work immediately
                rather than waiting the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete, the
                landlord must obtain written confirmation from a qualified person that the work has
                been done satisfactorily. This confirmation must be provided to the tenant and to
                the council within 28 days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Wolverhampton remedial work</strong> — typical remedial work in
                Wolverhampton rental properties includes installing RCD protection (Regulation
                411.3.3), replacing older consumer units, upgrading earthing and bonding, replacing
                deteriorated rubber-insulated cables, and addressing overloaded circuits in
                converted properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Wolverhampton landlords with portfolios of older terraced properties should budget for
          consumer unit upgrades as a routine capital expenditure. Establishing a relationship with
          a reliable local electrician who can respond quickly when remedial work is required will
          help ensure compliance within the 28-day window.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton and the wider West Midlands have a good number of qualified electricians
          capable of carrying out landlord EICRs. However, experience with older housing stock is
          particularly important given the age and condition of much of the city's rental property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for Wolverhampton-based inspectors. Registration with a scheme
                provides assurance of qualifications, current insurance, and regular third-party
                assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with pre-1970s wiring systems common in
                Wolverhampton properties is important for accurate reporting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — verify that the inspector carries professional
                indemnity insurance. This is a requirement of competent person scheme membership and
                protects both parties if an error is identified on the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio pricing</strong> — landlords with multiple Wolverhampton
                properties should negotiate portfolio pricing with a local electrician. Block
                bookings of five or more EICRs can reduce the per-property cost and simplify
                compliance management.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Wolverhampton (2026 Prices)',
    content: (
      <>
        <p>
          Wolverhampton EICR costs are generally lower than in London or the South East, reflecting
          the city's lower labour rates and living costs. However, older properties with
          deteriorated wiring may take longer to inspect, increasing the cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £100 to £180. Typically 3 to 5 circuits with a
                single consumer unit. Modern purpose-built flats are quicker to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £150 to £250. Pre-war and post-war terraced
                houses are common in Wolverhampton and may take longer due to older wiring and
                earthing systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £320. Larger properties, particularly
                those with fabric or rubber-insulated wiring, can extend the inspection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £300 to £600+. Multiple consumer units, fire alarm systems,
                and emergency lighting circuits significantly increase the inspection scope and
                cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Any remedial work identified during the
          EICR is quoted and charged separately. Some Wolverhampton electricians offer combined EICR
          and remedial packages at a reduced total cost for landlords, particularly where consumer
          unit replacement is anticipated.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton's private rented sector — which accounts for a substantial proportion of the
          city's housing — creates steady demand for landlord EICRs. Electricians who specialise in
          inspection and testing can build a reliable pipeline of work from landlord contracts,
          particularly given the volume of older properties requiring consumer unit upgrades
          alongside the initial EICR.
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
                  to complete the report on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export mean no evening paperwork. Send the report to
                  the landlord before you leave the property.
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
                  When C1 or C2 observations are found — and in Wolverhampton's older housing stock
                  this is common — quote the remedial work immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days. The electrician who quotes on the day of the
                  EICR almost always wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyWolverhamptonPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Wolverhampton | EICR West Midlands"
      description="Landlord electrical safety requirements in Wolverhampton. The 2020 Regulations explained, City of Wolverhampton Council enforcement, HMO requirements, penalties up to £30,000, tenant rights, remedial timescales, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Wolverhampton:{' '}
          <span className="text-yellow-400">EICR West Midlands 2026</span>
        </>
      }
      heroSubtitle="Everything Wolverhampton landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement, HMO requirements, penalties of up to £30,000, tenant rights, remedial timescales, and finding qualified inspectors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Wolverhampton"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
