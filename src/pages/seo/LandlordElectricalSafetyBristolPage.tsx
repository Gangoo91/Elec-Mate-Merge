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
  { label: 'Landlord Electrical Safety Bristol', href: '/guides/landlord-electrical-safety-bristol' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'bristol-enforcement', label: 'Bristol Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Bristol' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Bristol' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Bristol to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Bristol City Council enforces these regulations with civil penalties of up to £30,000 per breach. Bristol has an active private rented sector enforcement team and operates selective licensing schemes in several neighbourhoods.',
  'HMOs in Bristol face additional requirements — a valid EICR is a mandatory condition of both mandatory and additional HMO licensing schemes operated by Bristol City Council.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'RCD protection is required on socket-outlet circuits under Regulation 411.3.3 of BS 7671. Many of Bristol\'s older terraced and Victorian properties lack adequate RCD protection, making this a common C2 finding.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Bristol?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Bristol. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Bristol City Council within seven days if requested. The council can impose penalties of up to £30,000 per breach for non-compliance.',
  },
  {
    question: 'How active is Bristol City Council in enforcing electrical safety?',
    answer:
      'Bristol City Council operates an active private rented sector team and has used its enforcement powers under the 2020 Regulations. Bristol operates selective licensing in a number of neighbourhoods, meaning landlords must hold a property licence — and EICR compliance is a standard licence condition. The council also enforces mandatory and additional HMO licensing across the city.',
  },
  {
    question: 'What happens if my Bristol rental property fails the EICR?',
    answer:
      'An EICR is classified as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. A qualified electrician must confirm the work in writing. Failure to complete remedial work is a separate breach, attracting its own penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my Bristol HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Bristol. Mandatory licensing applies to properties with five or more occupants in two or more households. Bristol City Council also operates an additional HMO licensing scheme covering smaller HMOs. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting.',
  },
  {
    question: 'How much does a landlord EICR cost in Bristol?',
    answer:
      'Bristol EICR costs reflect the city\'s elevated labour rates. A one-bedroom flat typically costs £140 to £240. A two-bedroom flat costs £200 to £360. A three-bedroom house runs from £280 to £480. HMOs cost £380 to £750 or more depending on circuits and systems. These prices cover inspection and report only — remedial work is quoted separately.',
  },
  {
    question: 'Can a Bristol tenant request an electrical safety check?',
    answer:
      'Yes. Tenants have the right to request a copy of the current EICR. If the landlord cannot provide one, the tenant can report this to Bristol City Council\'s private rented sector team. The council can require the landlord to arrange an inspection. If the landlord fails to comply with a remedial notice, the council can arrange the work and recover costs from the landlord.',
  },
  {
    question: 'What qualifications must an EICR inspector have in Bristol?',
    answer:
      'For landlord compliance, the inspector must be a qualified and competent person — in practice meaning registration with NICEIC, NAPIT, or ELECSA, and holding City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382 18th Edition). Professional indemnity insurance is also required.',
  },
  {
    question: 'What is Regulation 411.3.3 and why does it matter for Bristol landlords?',
    answer:
      'Regulation 411.3.3 of BS 7671 requires RCD protection with a rated residual operating current not exceeding 30 mA for socket-outlet circuits rated up to 32 A. Many older Bristol rental properties — particularly in Easton, Bedminster, and Totterdown — lack RCD protection, making this a C2 observation that renders the EICR Unsatisfactory. Landlords must then install RCD protection, typically by upgrading the consumer unit.',
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
    heading: 'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety in Bristol. These
          regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for all
          existing tenancies. Every private landlord in Bristol must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must obtain an Electrical Installation
                Condition Report before a new tenancy begins and at least every five years. The
                EICR is documented in accordance with{' '}
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
                before they move in. Prospective tenants can request a copy within 28 days of
                their request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Bristol City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who
                is qualified and competent, in practice registered with NICEIC, NAPIT, ELECSA, or
                equivalent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bristol-enforcement',
    heading: 'Bristol City Council Enforcement',
    content: (
      <>
        <p>
          Bristol City Council is the local housing authority responsible for enforcing the 2020
          Regulations across the city. Bristol has a large and growing private rented sector and
          an active enforcement approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Bristol City Council operates selective
                licensing in several neighbourhoods including parts of Easton, Lawrence Hill,
                and Bedminster. Landlords in these areas must hold a property licence, and EICR
                compliance is a standard licence condition. Licensing schemes expand periodically —
                check whether your property falls within a current scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented sector team</strong> — Bristol City Council's environmental
                health and private rented sector team investigates complaints about property
                conditions including electrical safety. When a tenant reports concerns, the council
                can request the EICR and take enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action power</strong> — if a landlord fails to comply with a
                remedial notice, Bristol City Council can arrange for the work to be carried out
                and recover costs from the landlord. This power exists alongside civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section
                21 (no-fault eviction) notice without providing the tenant with a copy of the
                current EICR. This is a significant practical consequence for Bristol landlords
                seeking possession.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Bristol',
    content: (
      <>
        <p>
          Bristol has a large HMO sector, particularly in areas such as Clifton, Redland, Bishopston,
          and Cotham, driven by the student population at the University of Bristol and UWE Bristol.
          Bristol City Council operates both mandatory and additional HMO licensing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a condition of the
                licence. The EICR must cover all fixed electrical installations including communal
                areas, fire alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Bristol City Council operates additional
                HMO licensing covering smaller HMOs. Check whether your property falls within the
                additional licensing area, as EICR compliance is equally required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter inspection intervals</strong> — Bristol HMO licence conditions
                typically require EICRs every three to five years. Check your specific licence
                conditions rather than assuming the standard five-year interval applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMO consequences</strong> — operating an unlicensed HMO in
                Bristol is a criminal offence and can result in prosecution, an unlimited fine,
                and civil penalties. Bristol City Council has an active HMO licensing enforcement
                programme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance in Bristol',
    content: (
      <>
        <p>
          The 2020 Regulations give Bristol City Council the power to impose civil penalties for
          non-compliance. The maximum penalty is £30,000 per breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing
                to provide it to the tenant, failing to supply it to the council on request, and
                failing to complete remedial work are each separate breaches. Multiple penalties
                can be imposed on the same landlord for the same property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid
                Section 21 notice without providing the tenant with a copy of the current EICR.
                Non-compliance can prevent a landlord from regaining possession of their property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licence implications</strong> — landlords operating within selective
                licensing areas or running HMOs can lose their licence for persistent non-compliance,
                making it unlawful to continue letting the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — where a landlord commits certain housing
                offences (such as operating an unlicensed HMO), tenants can apply to the
                First-tier Tribunal (Property Chamber) for a rent repayment order of up to 12
                months' rent.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of compliance — an EICR every five years, typically £200 to £480 in Bristol
          — is far less than the potential penalties for non-compliance. Electrical safety should
          be treated as a non-negotiable operating cost for Bristol landlords.
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
          The 2020 Regulations give Bristol tenants specific rights regarding electrical safety
          in their rented property.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a
                copy within 28 days of the inspection. New tenants must receive a copy before
                moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — tenants can report to Bristol
                City Council's environmental health or private rented sector team if the landlord
                has not obtained an EICR or completed required remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies urgent safety
                issues (C1 or C2), the landlord must arrange remedial work promptly. If the
                landlord fails, the council can arrange the work and recover costs from the
                landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015
                also provides protection against retaliatory eviction where a tenant has raised
                a legitimate complaint.
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
          When an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631),
          Bristol landlords must complete remedial work within the timescales set by the 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timescale. The 28-day
                clock starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — where a C1 (danger present)
                observation is recorded, the inspector may recommend immediate disconnection of
                the affected circuit. Landlords should arrange emergency remedial work without
                waiting the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete,
                a qualified person must confirm in writing that the work has been done
                satisfactorily. This must be provided to the tenant and to the council within
                28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Bristol remedial work</strong> — typical remedial work in Bristol
                rental properties includes fitting RCD protection (Regulation 411.3.3), replacing
                plastic consumer units with metal enclosures (Regulation 421.1.201), upgrading
                earthing and bonding, and replacing deteriorated cables in Victorian and Edwardian
                properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Bristol',
    content: (
      <>
        <p>
          Bristol has a good supply of qualified electricians for landlord EICR work. Verify
          qualifications and registration before commissioning an inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, or ELECSA registration</strong> — search the scheme's
                online register for Bristol-based inspectors. Scheme membership provides assurance
                of qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing), a current BS 7671 qualification (C&G 2382 18th Edition), and experience
                with Bristol's housing stock including Victorian terraces and Edwardian semis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — verify that the inspector
                carries appropriate professional indemnity insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid unusually cheap quotes</strong> — a thorough EICR for a Bristol
                two-bedroom flat requires 2 to 4 hours and calibrated equipment. Quotes
                substantially below £140 may indicate inadequate testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Bristol (2026 Prices)',
    content: (
      <>
        <p>
          Bristol EICR costs reflect the city's elevated labour rates and strong trade demand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £140 to £240. Typically 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £200 to £360. Usually 5 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £280 to £480. Victorian terraces may take
                longer due to aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £380 to £750+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover inspection and report only. Some Bristol electricians offer combined
          EICR and remedial packages at a reduced total cost for landlords with multiple properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Bristol',
    content: (
      <>
        <p>
          Bristol's large and growing private rented sector — driven by two universities and a
          booming tech and creative economy attracting young professionals — creates strong demand
          for landlord EICRs. Electricians who build relationships with Bristol letting agents and
          property management companies can develop a reliable pipeline of work.
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
                  to complete the report on your phone while still on site. AI board scanning,
                  voice test entry, and instant PDF export mean no evening paperwork. Send the
                  report to the landlord before you leave.
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
                  When C1 or C2 observations are found, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Bristol landlords must act within 28 days — the electrician who quotes on
                  the day of the EICR wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business in Bristol with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyBristolPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Bristol | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Bristol. 2020 Regulations explained, Bristol City Council enforcement, HMO requirements, penalties up to £30,000, tenant rights, remedial timescales, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Bristol:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Bristol landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement, HMO requirements, penalties of up to £30,000, tenant rights, remedial work timescales, and finding qualified inspectors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
