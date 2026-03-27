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
  { label: 'Landlord Electrical Safety London', href: '/guides/landlord-electrical-safety-london' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'london-enforcement', label: 'London Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in London' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in London to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'London borough councils enforce these regulations with civil penalties of up to £30,000 per breach. Boroughs such as Newham, Tower Hamlets, Hackney, and Lambeth have dedicated enforcement teams actively pursuing non-compliant landlords.',
  'HMOs in London face additional requirements — a valid EICR is a mandatory condition of both mandatory and additional HMO licensing schemes operated by London boroughs.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'RCD protection is required on socket-outlet circuits under Regulation 411.3.3 of BS 7671. Absence of RCD protection is one of the most common C2 findings in older London rental properties.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in London?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in London. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to the local council within seven days if requested. London borough councils enforce these regulations and can impose fines of up to £30,000 per breach.',
  },
  {
    question: 'Which London boroughs are most active in enforcing electrical safety?',
    answer:
      'Newham, Tower Hamlets, Hackney, Lambeth, and Southwark have been among the most proactive London boroughs in enforcing the 2020 Regulations. These boroughs have dedicated private rented sector enforcement teams, operate selective and additional HMO licensing schemes, and have issued significant civil penalties to non-compliant landlords. However, all 32 London boroughs plus the City of London Corporation have enforcement powers.',
  },
  {
    question: 'What happens if my London rental property fails the EICR?',
    answer:
      'An EICR is assessed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. The work must be carried out by a qualified electrician and confirmed in writing. Failure to complete remedial work is a separate breach that can attract its own penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my London HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of both mandatory HMO licensing (properties with five or more occupants in two or more households) and additional licensing schemes operated by many London boroughs. HMOs also have additional fire safety requirements including fire alarm systems and emergency lighting, which form part of the EICR inspection scope. Many London boroughs require EICRs for HMOs every three years rather than five.',
  },
  {
    question: 'How much does a landlord EICR cost in London?',
    answer:
      'London EICR costs are higher than the national average due to elevated labour rates, congestion charges, and parking costs. A one-bedroom flat typically costs £150 to £250, a two-bedroom flat £200 to £350, a three-bedroom house £300 to £500, and an HMO £400 to £800 or more depending on the number of consumer units and circuits. Inner London prices tend to be 15 to 25 per cent higher than outer London.',
  },
  {
    question: 'Can a London tenant request an electrical safety check?',
    answer:
      'Yes. Tenants have the right to request a copy of the current EICR from their landlord. If the landlord cannot provide one, the tenant can report this to the local London borough council, which can require the landlord to arrange an inspection. If the landlord fails to comply with a remedial notice, the council can arrange for the work to be done and recover costs from the landlord.',
  },
  {
    question: 'What qualifications must an EICR inspector have in London?',
    answer:
      'For landlord compliance, the inspector must be a qualified and competent person. In practice this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA, and holding appropriate qualifications including City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382). They should also carry professional indemnity insurance.',
  },
  {
    question: 'What is Regulation 411.3.3 and why does it matter for landlords?',
    answer:
      'Regulation 411.3.3 of BS 7671 requires RCD (Residual Current Device) protection with a rated residual operating current not exceeding 30mA for socket-outlet circuits rated up to 32A. Many older London rental properties lack RCD protection on socket circuits, which is recorded as a C2 observation making the EICR Unsatisfactory. Landlords must then install RCD protection as part of the remedial work, typically by upgrading the consumer unit.',
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
    href: '/guides/eicr-london',
    title: 'EICR London',
    description: 'Full London EICR guide with costs, borough enforcement, and Victorian wiring challenges.',
    icon: Building2,
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
          are the primary legislation governing landlord electrical safety obligations in London.
          These regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for
          all existing tenancies. Every private landlord in London must comply.
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
                before they move in. Prospective tenants can request a copy within 28 days of their
                request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to the local London borough council within seven days if requested.
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
    id: 'london-enforcement',
    heading: 'London Council Enforcement',
    content: (
      <>
        <p>
          Each of London's 32 borough councils plus the City of London Corporation is the local
          housing authority responsible for enforcing the 2020 Regulations in their area. Enforcement
          varies significantly between boroughs, but London overall has some of the most active
          enforcement in England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive boroughs</strong> — Newham, Tower Hamlets, Hackney, Lambeth,
                Southwark, and Waltham Forest have large private rented sectors and dedicated
                enforcement teams. These boroughs actively investigate tenant complaints, conduct
                property inspections, and issue civil penalties. Newham pioneered borough-wide
                selective licensing and has issued more civil penalties than most other London
                boroughs combined.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — several London boroughs operate selective
                licensing schemes requiring landlords to obtain a property licence. EICR compliance
                is a standard licence condition. Boroughs with selective licensing include Newham,
                Waltham Forest, Brent, Croydon, and parts of Barking and Dagenham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven enforcement</strong> — in boroughs without selective
                licensing, enforcement is primarily complaint-driven. When a tenant reports concerns
                about electrical safety, the council can request the EICR from the landlord. If the
                landlord cannot provide a valid report, the council can issue a remedial notice and
                ultimately impose a financial penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action</strong> — if a landlord fails to comply with a remedial
                notice, the local authority can arrange for the work to be carried out and recover
                costs from the landlord. This power exists alongside (not instead of) the power to
                impose civil penalties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          London landlords with properties across multiple boroughs should not assume that a
          relaxed approach in one borough means the same will apply elsewhere. The safest strategy
          is full compliance across all properties.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in London',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) in London face additional electrical safety
          requirements beyond the standard 2020 Regulations. London has one of the highest
          concentrations of HMOs in England, and many boroughs operate both mandatory and additional
          licensing schemes.
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
                <strong>Additional licensing</strong> — many London boroughs (including Camden,
                Islington, Haringey, Lewisham, and Wandsworth) operate additional HMO licensing
                that covers smaller HMOs not caught by mandatory licensing. EICR compliance is
                a standard condition of these licences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter inspection intervals</strong> — many London borough HMO licence
                conditions require EICRs every three years rather than the standard five years.
                Check your specific borough's licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety integration</strong> — HMO fire alarm systems (Grade A, D, or
                LD systems depending on the property) and emergency lighting are part of the fixed
                electrical installation. The EICR inspector must test these systems. RCD protection
                under Regulation 411.3.3 is particularly important in HMOs where multiple
                households share circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in London is a criminal offence that can result in
          prosecution and an unlimited fine, in addition to civil penalties for breach of the
          electrical safety regulations. London boroughs have been increasingly aggressive in
          pursuing unlicensed HMOs.
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
          The 2020 Regulations give local authorities the power to impose civil penalties for
          non-compliance. The maximum penalty is £30,000 per breach, and each failure to comply
          constitutes a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the local authority on request,
                and failing to complete remedial work are each separate breaches. A landlord who
                has never obtained an EICR and ignores a remedial notice could face multiple
                penalties totalling well over £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offences</strong> — local authorities can impose higher penalties
                for repeat non-compliance. London boroughs with active enforcement teams maintain
                records of previous breaches and escalate penalties accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — tenants can apply to the First-tier
                Tribunal (Property Chamber) for a rent repayment order of up to 12 months' rent
                where a landlord has committed certain housing offences. While the electrical safety
                regulations themselves do not directly trigger rent repayment orders, related
                offences (such as operating an unlicensed HMO) can.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice if they have not provided the tenant with a copy of the
                current EICR. This is a significant practical consequence for London landlords
                seeking possession of their property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of compliance (an EICR every five years, typically £200 to £500) is trivial
          compared to the potential penalties for non-compliance. London landlords should treat
          electrical safety compliance as a non-negotiable operating cost.
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
          The 2020 Regulations give tenants in London specific rights regarding electrical safety
          in their rented property. Tenants should be aware of these rights and how to exercise
          them.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a
                copy within 28 days of the inspection. New tenants must receive a copy before
                moving in. If you have not received one, request it in writing from your landlord
                or letting agent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your landlord has not obtained
                an EICR or has not completed required remedial work, report this to your local
                London borough council's environmental health or private rented sector team. The
                council has the power to investigate and take enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies urgent safety
                issues (C1 or C2 observations), the landlord must arrange remedial work promptly.
                If the landlord fails to act, the council can arrange for the work to be done and
                recover costs from the landlord. The tenant should not be charged for any of this
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015 also
                provides protection from retaliatory eviction where a tenant has raised a legitimate
                complaint about the condition of the property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Tenants in London can contact their borough council's environmental health team, Shelter,
          or Citizens Advice for guidance on exercising these rights. Many London boroughs have
          online reporting forms for private rented sector complaints.
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
          When an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631),
          the landlord is legally required to complete remedial work within strict timescales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — the landlord must ensure all remedial work is
                completed within 28 days of the EICR, unless the inspector specifies a shorter
                timeframe. The 28-day clock starts from the date of the inspection, not the date
                the landlord receives the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — where a C1 (danger present)
                observation is recorded, the inspector may recommend immediate disconnection of
                the affected circuit. The landlord should arrange emergency remedial work as soon
                as possible, not wait the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, the
                landlord must obtain written confirmation from a qualified person that the work
                has been done satisfactorily. This confirmation must be provided to the tenant and
                to the local authority within 28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common London remedial work</strong> — typical remedial work in London
                rental properties includes fitting RCD protection (Regulation 411.3.3), replacing
                deteriorated consumer units, upgrading earthing and bonding, replacing damaged
                cables, and addressing overloaded circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords in London should establish a relationship with a reliable local electrician
          who can respond quickly when remedial work is needed. Delays in completing remedial work
          are a separate breach of the regulations and can attract their own penalty.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in London',
    content: (
      <>
        <p>
          London has a large pool of qualified electricians capable of carrying out EICRs. However,
          not all electricians are equally experienced in inspection and testing work. Landlords
          should verify qualifications and registration before commissioning an EICR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for London-based inspectors. Registration with a competent person
                scheme provides assurance of qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and
                Guilds 2391 (Inspection and Testing) or equivalent, plus a current BS 7671
                qualification (C&G 2382 18th Edition). Experience with London property types
                (Victorian terraces, purpose-built flats, HMOs) is also important.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — verify that the inspector carries professional
                indemnity insurance. This is a requirement of competent person scheme membership
                and protects both parties if an error is made on the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid suspiciously cheap quotes</strong> — an EICR for a London two-bedroom
                flat priced below £150 should raise concerns. A thorough inspection takes 2 to 4
                hours and requires calibrated instruments. Extremely low prices may indicate rushed
                work or inadequate testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in London (2026 Prices)',
    content: (
      <>
        <p>
          London EICR costs are consistently higher than the national average, reflecting elevated
          labour rates, congestion zone and ULEZ charges, parking costs, and longer travel times
          in inner London.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £250. The most common EICR in London.
                Typically 3 to 5 circuits with a single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £200 to £350. Usually 5 to 8 circuits.
                Purpose-built flats are generally quicker than converted Victorian houses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £300 to £500. Victorian terraced houses
                in inner London often cost more due to aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £400 to £800+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Some London electricians offer combined EICR and
          remedial packages at a reduced total cost, which can save landlords time and money.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in London',
    content: (
      <>
        <p>
          London's massive private rented sector (approximately 27 per cent of all households)
          creates enormous demand for landlord EICRs. Electricians who specialise in inspection
          and testing work can build a sustainable business from landlord EICR contracts alone.
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
                  report to the landlord before you leave the property.
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
                  . Landlords must act within 28 days — the electrician who quotes on the day of
                  the EICR wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business with Elec-Mate"
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

export default function LandlordElectricalSafetyLondonPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety London | EICR Requirements 2026"
      description="Landlord electrical safety requirements in London. 2020 Regulations explained, London borough enforcement, HMO requirements, penalties up to £30,000, tenant rights, remedial timescales, finding inspectors, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety London:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything London landlords need to know about electrical safety compliance — the 2020 Regulations, borough enforcement, HMO requirements, penalties of up to £30,000, tenant rights, remedial work timescales, and finding qualified inspectors."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in London"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
