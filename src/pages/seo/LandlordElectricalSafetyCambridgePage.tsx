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
  { label: 'Landlord Electrical Safety Cambridge', href: '/landlord-electrical-safety-cambridge' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'cambridge-enforcement', label: 'Cambridge City Council Enforcement' },
  { id: 'student-hmo-requirements', label: 'Student Rentals and HMOs' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Cambridge' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Cambridge private landlords to obtain an EICR before a new tenancy and at least every five years thereafter.',
  'Cambridge has one of the highest concentrations of student HMO properties in England. South Cambridgeshire District Council and Cambridge City Council both operate HMO licensing schemes that require a valid EICR as a licence condition.',
  'Cambridge landlords serving the student rental market must be aware that term-time tenancies beginning in September create a concentrated demand for EICR inspections over a short window each summer.',
  'Civil penalties for non-compliance can reach £30,000 per breach under the 2020 Regulations. Cambridge City Council has an active private rented sector enforcement team.',
  'Older terraced housing stock in areas such as Romsey, Coleridge, and Cherry Hinton frequently presents C2 observations for absent RCD protection and deteriorated wiring — common findings in Cambridge EICRs.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety rules in Cambridge?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Cambridge. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an Electrical Installation Condition Report (EICR) before a new tenancy begins and at least every five years. A copy must be provided to the tenant within 28 days of inspection and to Cambridge City Council within seven days if requested. Civil penalties of up to £30,000 apply for non-compliance.',
  },
  {
    question: 'Do Cambridge student rentals need an EICR?',
    answer:
      'Yes. All privately rented properties in Cambridge, including those let to students, must comply with the 2020 Regulations. Properties let to three or more students from different households are likely to be HMOs and require HMO licensing, which in turn requires a valid EICR. Many student properties in Cambridge are Victorian terraced houses with old wiring, making EICR compliance particularly important.',
  },
  {
    question: 'What is an HMO and do Cambridge student houses need one?',
    answer:
      'A House in Multiple Occupation (HMO) is a property occupied by three or more people forming two or more households who share facilities such as a kitchen or bathroom. Most Cambridge student houses qualify as HMOs. Properties with five or more occupants in two or more households require mandatory HMO licensing from Cambridge City Council. Smaller HMOs may require a licence under additional or selective licensing schemes. A valid EICR is a standard licence condition in all cases.',
  },
  {
    question: 'How often does a Cambridge HMO need an EICR?',
    answer:
      'The 2020 Regulations require an EICR at least every five years. However, Cambridge City Council HMO licence conditions may require a shorter interval — commonly every three years or at each licence renewal. Landlords should check the specific conditions attached to their HMO licence. Properties with a previous Unsatisfactory EICR may be required to carry out more frequent inspections.',
  },
  {
    question: 'What happens if a Cambridge rental property fails its EICR?',
    answer:
      'An EICR is classed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. The landlord must complete all required remedial work within 28 days (or sooner if specified by the inspector) and obtain written confirmation from a qualified electrician. Failure to do so is a separate breach of the regulations and can attract additional penalties of up to £30,000. The landlord must also provide the written confirmation to the tenant and to Cambridge City Council.',
  },
  {
    question: 'How much does an EICR cost in Cambridge?',
    answer:
      'Cambridge EICR costs are broadly in line with East of England rates. A one-bedroom flat typically costs £120 to £200, a two-bedroom property £160 to £280, and a three-bedroom terraced house £220 to £380. Student HMOs with multiple consumer units, fire alarm systems, and emergency lighting cost more — typically £350 to £600 depending on size and complexity. Victorian properties with old wiring may take longer to inspect and cost more.',
  },
  {
    question: 'Can a Cambridge tenant report their landlord for electrical safety issues?',
    answer:
      "Yes. Tenants can request a copy of the EICR from their landlord. If the landlord cannot provide one, the tenant can report this to Cambridge City Council's environmental health team, which has powers to investigate and impose civil penalties. Tenants in HMOs can also report concerns about electrical safety as part of the HMO licensing enforcement process.",
  },
  {
    question: 'What qualifications must an EICR inspector have?',
    answer:
      'For landlord compliance purposes, the inspector must be qualified and competent. In practice this means registration with a recognised competent person scheme such as NICEIC, NAPIT, or ELECSA, and holding relevant qualifications including City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382). They should carry professional indemnity insurance and have experience with the property types common in Cambridge.',
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
    href: '/landlord-electrical-safety-oxford',
    title: 'Landlord Electrical Safety Oxford',
    description: 'EICR requirements for Oxford landlords, student rentals, and HMO licensing.',
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
          are the primary legislation governing landlord electrical safety obligations in Cambridge.
          These regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for
          all existing tenancies. Every private landlord in Cambridge must comply, regardless of
          property size, age, or tenant type.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                The report is produced in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing requirements).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — existing tenants must receive a copy of the
                EICR within 28 days of the inspection. New tenants must receive a copy before they
                move in. Prospective tenants can request a copy within 28 days of their request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Cambridge City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who is
                qualified and competent, in practice meaning registration with a recognised
                competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent).
              </span>
            </li>
          </ul>
        </div>
        <p>
          These regulations apply to all assured shorthold tenancies, assured tenancies, and
          regulated tenancies in England, including all student lets and professional tenancies in
          Cambridge. They do not apply to social housing or lodger arrangements where the landlord
          lives in the property.
        </p>
      </>
    ),
  },
  {
    id: 'cambridge-enforcement',
    heading: 'Cambridge City Council Enforcement',
    content: (
      <>
        <p>
          Cambridge City Council is the local housing authority responsible for enforcing the 2020
          Regulations within the city. South Cambridgeshire District Council covers the surrounding
          rural and village areas. Both authorities have enforcement powers, though Cambridge City
          Council handles the vast majority of private rented sector enforcement due to the
          concentration of rental properties within the city.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented sector team</strong> — Cambridge City Council operates a
                dedicated private rented sector enforcement team that investigates complaints,
                inspects properties, and issues civil penalties. The large student rental market and
                high concentration of HMOs make this one of the more active enforcement authorities
                outside of London.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing enforcement</strong> — Cambridge operates mandatory HMO
                licensing as well as additional licensing schemes covering smaller HMOs in high
                density rental areas. Non-compliance with licence conditions, including EICR
                requirements, can result in licence revocation in addition to civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven investigations</strong> — many enforcement actions in
                Cambridge begin with tenant complaints. Students who discover their property lacks a
                valid EICR, or who raise concerns about electrical safety, can report this to the
                council's environmental health team, triggering a formal investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action powers</strong> — if a landlord fails to comply with a
                remedial notice issued by the council, the authority can arrange for the remedial
                work to be carried out and recover costs from the landlord, in addition to imposing
                financial penalties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cambridge landlords should maintain up-to-date records of all EICRs and remedial work for
          every property. The council can request these records at any time, and inability to
          produce a valid EICR is treated as evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'student-hmo-requirements',
    heading: 'Student Rentals and HMO Requirements in Cambridge',
    content: (
      <>
        <p>
          Cambridge's two universities — the University of Cambridge and Anglia Ruskin University —
          create one of the largest student rental markets in England. The majority of second-year
          and beyond students live in privately rented accommodation, most of it in shared houses
          that qualify as Houses in Multiple Occupation (HMOs). This makes HMO compliance a critical
          issue for Cambridge landlords.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR covering all fixed electrical
                installations including communal areas, fire alarms, and emergency lighting is a
                mandatory licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Cambridge City Council operates additional
                licensing covering smaller HMOs (three or four occupants) in parts of the city with
                high concentrations of student accommodation, including areas near the city centre
                and around Hills Road and Mill Road. Check with the council whether your property
                falls within a designated additional licensing area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals for HMOs</strong> — Cambridge HMO licence conditions
                typically require EICRs every three years or at each licence renewal (licences are
                normally issued for five years). Always check the specific conditions on your
                licence certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summer inspection window</strong> — the Cambridge student rental market runs
                on an academic year cycle, with most tenancies beginning in late June or September.
                Landlords should arrange EICRs in April or May to allow time for remedial work
                before the next tenancy begins. Leaving it until August risks delays if remedial
                work is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian property challenges</strong> — many student houses in Romsey,
                Coleridge, Cherry Hinton, and Mill Road areas are Victorian terraced properties with
                original or early-twentieth-century wiring. These properties commonly receive C2
                observations for absent RCD protection, deteriorated cables, and inadequate
                earthing. Landlords of older stock should budget for consumer unit upgrades as part
                of ongoing maintenance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Cambridge is a criminal offence that can result in
          prosecution and an unlimited fine, as well as civil penalties under the electrical safety
          regulations. Cambridge City Council actively prosecutes unlicensed HMO operators.
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
          constitutes a separate breach. Cambridge landlords with multiple non-compliant properties
          can face cumulative penalties well in excess of this figure.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the local authority on request,
                and failing to complete remedial work are each separate breaches. A landlord who
                ignores all obligations could face multiple penalties from a single property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence revocation</strong> — Cambridge City Council can revoke an HMO
                licence for persistent non-compliance with licence conditions. A revoked licence
                means the property cannot legally be operated as an HMO, which for Cambridge student
                landlords can mean losing several years of rental income while a new licence is
                sought.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice without having provided the tenant with a copy of the
                current EICR. This is a significant practical consequence for Cambridge landlords
                who wish to regain possession of their property at the end of a student tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMO prosecution</strong> — operating a licensable HMO without a
                licence is a criminal offence. Cambridge City Council has prosecuted landlords in
                the Magistrates' Court, with fines of up to £20,000 per offence plus costs, entirely
                separately from the electrical safety civil penalty regime.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of an EICR every five years (typically £150 to £400 in Cambridge) is negligible
          compared to the potential penalties. Cambridge landlords should treat electrical safety
          compliance as a non-negotiable part of operating a rental property.
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
          Tenants in Cambridge — including students in shared houses — have specific rights
          regarding electrical safety in their rented property. Students in particular are
          encouraged to be aware of these rights when signing a new tenancy agreement.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — new tenants must receive a copy
                before moving in. Existing tenants must receive a copy within 28 days of the
                inspection. Request the EICR in writing from your landlord or letting agent before
                signing a tenancy agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your Cambridge landlord cannot
                provide a valid EICR, you can report this to Cambridge City Council's environmental
                health team. The council can require the landlord to arrange an inspection and
                impose a penalty for non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work promptly. If the landlord
                fails to act, the council can arrange for the work to be done and recover costs from
                the landlord. Tenants should not be charged for any remedial work arising from
                electrical safety compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>University and student union support</strong> — Cambridge University
                Accommodation Service and both university student unions can provide guidance to
                students with concerns about landlord compliance. The Cambridge University Students'
                Union has published guidance on private rented sector rights.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cambridge tenants can also contact Citizens Advice Cambridge or Shelter for independent
          guidance on exercising their rights under the 2020 Regulations. Cambridge City Council's
          website has an online form for reporting private rented sector concerns.
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
          When a Cambridge EICR identifies C1 or C2 observations (classified under BS 7671 Section
          631), the landlord must complete remedial work within strict timescales set by the 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timeframe. The 28-day
                clock runs from the date of the inspection, not the date the landlord receives the
                report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — a C1 (danger present)
                observation may require immediate disconnection of the affected circuit. Cambridge
                landlords should treat C1 findings as emergencies and arrange remedial work within
                days, not weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete, the
                landlord must obtain written confirmation from a qualified electrician. This
                confirmation must be provided to the tenant and to Cambridge City Council within 28
                days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Cambridge remedial work</strong> — typical remedial work in Cambridge
                rental properties includes fitting RCD protection under Regulation 411.3.3 of BS
                7671, replacing deteriorated consumer units, upgrading earthing and bonding,
                replacing old rubber or PVC-insulated cables, and addressing overloaded circuits in
                converted Victorian properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cambridge landlords with student properties should aim to complete all EICR remedial work
          before the summer inspection window ends, well before the new academic year tenancies
          begin in September.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Cambridge',
    content: (
      <>
        <p>
          Cambridge has a reasonable pool of qualified electricians capable of carrying out EICRs,
          but demand peaks in the summer months as landlords prepare student properties for the new
          academic year. Landlords should book inspections early to avoid availability problems in
          July and August.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find Cambridge-based inspectors. Scheme registration confirms
                qualifications, insurance, and regular technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with Victorian terraced housing and HMOs is
                particularly valuable in Cambridge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book early</strong> — demand for EICR inspections in Cambridge peaks
                significantly in May to July. Landlords who leave booking until late summer risk
                being unable to get an inspection before the new tenancy begins, which itself
                constitutes a breach of the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance verification</strong> — confirm the inspector carries professional
                indemnity insurance. This is a requirement of competent person scheme membership and
                protects the landlord if an error appears on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Cambridge (2026 Prices)',
    content: (
      <>
        <p>
          Cambridge EICR costs are broadly in line with East of England rates, which are generally
          lower than London but higher than rural East Anglia. Prices reflect local labour rates,
          the prevalence of older housing stock, and seasonal demand peaks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £200. Modern purpose-built flats are
                typically quicker to inspect than converted Victorian properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom house</strong> — £180 to £320. Victorian terraced
                houses with older wiring take longer and may cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £300 to £500. Multiple
                consumer units, fire alarm systems, and emergency lighting increase the inspection
                scope and price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large HMO (seven or more bedrooms)</strong> — £450 to £700+. Larger
                properties with complex electrical installations and multiple distribution boards
                require longer inspection times.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted and charged
          separately. Landlords with multiple Cambridge properties may be able to negotiate block
          pricing with a local electrician, reducing the per-property cost.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Cambridge',
    content: (
      <>
        <p>
          Cambridge's large and continuously renewing student rental market creates sustained demand
          for landlord EICRs. Electricians who specialise in inspection and testing work can build
          strong relationships with Cambridge letting agents and landlords, generating regular
          annual income from EICR portfolios.
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
                  the Cambridge landlord or letting agent before you leave the property.
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
                  . Cambridge landlords must act within 28 days — the electrician who quotes on the
                  day of the EICR wins the work. With summer inspection pressure, landlords want one
                  trusted contractor for both the EICR and any remedials.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Cambridge landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day during the Cambridge summer rush. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyCambridgePage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Cambridge | EICR for Landlords Cambridge"
      description="Landlord electrical safety requirements in Cambridge. 2020 Regulations, Cambridge City Council enforcement, student HMO licensing, penalties up to £30,000, EICR costs, and finding qualified inspectors in Cambridge."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Cambridge:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Cambridge landlords need to know about electrical safety compliance — the 2020 Regulations, Cambridge City Council enforcement, student rental and HMO requirements, penalties of up to £30,000, EICR costs, and the summer inspection window."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Cambridge"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
