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
  { label: 'Landlord Electrical Safety Newcastle', href: '/landlord-electrical-safety-newcastle' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'newcastle-enforcement', label: 'Newcastle Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Newcastle' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Newcastle upon Tyne to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Newcastle City Council is one of the busier local authorities for EICR enforcement following the 2020 Regulations — particularly in HMO-dense areas such as Jesmond, Heaton, and Sandyford. Landlords in breach face civil penalties of up to £30,000 per breach.',
  "Newcastle and Northumbria Universities together generate one of the UK's largest student HMO markets. Jesmond, Heaton, and Sandyford carry especially high concentrations of student rental properties, and the council's HMO licensing team is active in all three areas.",
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  "Newcastle's older housing stock — particularly Tyneside flats from the 1880s–1920s and Victorian terraces in Heaton and Byker — commonly presents absent RCDs (Regulation 411.3.3), rubber-insulated wiring, and outdated TN-S earthing arrangements. C2 findings on first EICRs are very common.",
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Newcastle?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Newcastle upon Tyne. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Newcastle City Council within seven days if requested. The council can impose civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'Does Newcastle City Council actively enforce landlord electrical safety?',
    answer:
      'Yes. Newcastle City Council has been named as one of the more active councils for EICR enforcement following the 2020 Regulations. The council operates a private rented sector enforcement team and a dedicated HMO licensing team that investigates tenant complaints and carries out proactive inspections. Jesmond, Heaton, and Sandyford — where Newcastle University and Northumbria University students concentrate — receive particular attention. Landlords operating unlicensed HMOs face criminal prosecution as well as civil penalties.',
  },
  {
    question: 'What happens if my Newcastle rental property fails the EICR?',
    answer:
      'An EICR is assessed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. The work must be carried out by a qualified electrician and confirmed in writing. Failure to complete remedial work is a separate breach that can attract its own civil penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my Newcastle HMO?',
    answer:
      "Yes. A valid EICR is a mandatory condition of both mandatory HMO licensing (properties with five or more occupants in two or more households) and any additional licensing schemes operated by Newcastle City Council. Student HMOs in Jesmond, Heaton, and Sandyford are subject to active licensing enforcement from the council's dedicated HMO team. Many Newcastle HMO licence conditions specify EICR intervals shorter than five years — check your specific licence.",
  },
  {
    question: 'How much does a landlord EICR cost in Newcastle?',
    answer:
      'Expect to pay £180–£450 for most Newcastle landlord EICRs in 2026. Costs sit slightly below London rates but above the national average due to strong local demand driven by the student HMO market. A one-bedroom flat typically costs £180–£240, a two-bedroom terraced house £220–£320, a three-bedroom house £280–£450, and a student HMO £380–£700 or more depending on the number of consumer units and circuits.',
  },
  {
    question: 'Can a Newcastle tenant request an electrical safety check?',
    answer:
      "Yes. Tenants have the right to request a copy of the current EICR from their landlord. If the landlord cannot provide one, the tenant can report this to Newcastle City Council's environmental health or housing team, which can require the landlord to arrange an inspection. If the landlord fails to comply with a remedial notice, the council can arrange for the work to be done and recover costs from the landlord.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Newcastle?',
    answer:
      'For landlord compliance, the inspector must be a qualified and competent person. In practice this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA, holding City and Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification (C&G 2382). They should also carry professional indemnity insurance. Northern Powergrid is the DNO for Newcastle — inspectors familiar with Northern Powergrid TN-S and PME earthing arrangements are well placed to assess older Tyneside stock.',
  },
  {
    question: 'Are Tyneside flats more likely to fail an EICR?',
    answer:
      'Yes. Tyneside flats — the distinctive two-flat format unique to Newcastle and the North East, typically built between the 1880s and 1920s — present particular challenges. Many have rubber-insulated wiring, shared or outdated consumer units, and TN-S earthing arrangements that may not meet current standards. Common findings include absent RCD protection (a C2 under Regulation 411.3.3 of BS 7671), deteriorated rubber or fabric insulation, no supplementary bonding in bathrooms, and inadequate earthing. Landlords buying Tyneside flats should budget for potential remedial work after the first EICR.',
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
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations explained — what changed and what it means for landlord compliance.',
    icon: Scale,
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
          are the primary legislation governing landlord electrical safety obligations in Newcastle
          upon Tyne. These regulations came into force on 1 June 2020 for new tenancies and 1 April
          2021 for all existing tenancies. Every private landlord in Newcastle must comply.
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
                EICR to Newcastle City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who is
                qualified and competent. For practical purposes this means a person registered with
                a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent). Northern Powergrid
                is the local Distribution Network Operator for Newcastle — inspectors should be
                familiar with Northern Powergrid earthing arrangements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These regulations apply to all assured shorthold tenancies, assured tenancies, and
          regulated tenancies in England. They do not apply to social housing or lodger arrangements
          where the landlord lives in the same property.
        </p>
      </>
    ),
  },
  {
    id: 'newcastle-enforcement',
    heading: 'Newcastle City Council Enforcement',
    content: (
      <>
        <p>
          Newcastle City Council is the local housing authority responsible for enforcing the 2020
          Regulations across Newcastle upon Tyne. The council has been identified as one of the more
          active councils for EICR enforcement following the introduction of the Regulations,
          running both a private rented sector enforcement team and a dedicated HMO licensing team.
          Proactive inspections are concentrated in areas with high densities of private rented
          stock — particularly where Newcastle University and Northumbria University students live.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student rental focus</strong> — Jesmond, Heaton, and Sandyford house the
                majority of Newcastle's student HMO stock. The council's HMO licensing team pays
                close attention to all three areas. Landlords operating unlicensed HMOs in these
                postcodes face criminal prosecution as well as civil penalties under the 2020
                Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Newcastle City Council operates mandatory HMO
                licensing for properties with five or more occupants in two or more households. A
                valid EICR is a condition of the licence. The council cross-references HMO licence
                applications against EICR records, so landlords without valid reports face immediate
                licence refusal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven enforcement</strong> — tenants who report absent or
                out-of-date EICRs to the council trigger formal enforcement action. The council can
                require the landlord to provide the EICR within a fixed period, issue a remedial
                notice if problems are found, and ultimately impose a financial penalty of up to
                £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action powers</strong> — if a landlord fails to comply with a
                remedial notice, Newcastle City Council can arrange for the work to be carried out
                and recover all costs from the landlord, in addition to imposing a civil penalty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Newcastle landlords with portfolios across Gateshead, North Tyneside, or South Tyneside
          should note that each council area is separately enforced. Compliance with Newcastle City
          Council does not guarantee compliance checks will not occur in neighbouring authorities.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Newcastle',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) in Newcastle face additional electrical safety
          requirements beyond the standard 2020 Regulations. Newcastle University and Northumbria
          University together generate one of the largest student HMO markets in the UK, with
          Jesmond, Heaton, and Sandyford as the primary rental zones. The density of student HMO
          stock in these three areas makes Newcastle's HMO licensing and EICR enforcement among the
          most active of any English city outside London.
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
                <strong>Shorter inspection intervals</strong> — many Newcastle HMO licence
                conditions require EICRs at intervals shorter than the standard five years. Check
                your specific licence conditions carefully and diarise renewal dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tyneside flat considerations</strong> — the Tyneside flat — a two-flat
                format unique to Newcastle and the wider North East — is a common HMO conversion.
                Many Tyneside flats share consumer units between upper and lower flats, and the
                original TN-S earthing from the 1880s–1920s construction period is frequently found
                to be inadequate on inspection. Inspectors must assess both flats' electrical
                systems and communal connections carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection in HMOs</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket-outlet circuits rated up to 32A. In HMOs with multiple
                households sharing circuits, absence of RCD protection is a C2 finding that makes
                the EICR Unsatisfactory and requires urgent remedial work. This is particularly
                common in Tyneside flats and pre-war terraces throughout Heaton and Byker.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Newcastle is a criminal offence that can result in
          prosecution and an unlimited fine. Newcastle City Council cross-references HMO licensing
          applications with EICR records, so landlords without valid reports face immediate licence
          refusal.
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
          The 2020 Regulations give Newcastle City Council the power to impose civil penalties for
          non-compliance. The maximum penalty is £30,000 per breach, and each failure to comply
          constitutes a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to Newcastle City Council on request,
                and failing to complete remedial work are each separate breaches. A landlord who has
                never obtained an EICR and ignores a remedial notice could face multiple penalties
                totalling well over £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offences</strong> — Newcastle City Council maintains records of
                previous breaches and may escalate penalties for landlords with a history of
                non-compliance. The council's active enforcement posture means repeat offenders are
                more likely to face the upper end of the penalty range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice if they have not provided the tenant with a copy of the
                current EICR. This is a significant practical consequence for Newcastle landlords
                seeking possession of their property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial cost recovery</strong> — if a landlord fails to complete remedial
                work following a remedial notice, the council can arrange for the work to be done
                and recover the full cost from the landlord, in addition to imposing a financial
                penalty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of compliance — an EICR every five years at £180 to £450 depending on property
          size — is trivial compared to the potential penalties for non-compliance. Newcastle
          landlords should treat electrical safety compliance as a routine operating cost.
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
          The 2020 Regulations give tenants in Newcastle specific rights regarding electrical safety
          in their rented property. Students renting in Jesmond, Heaton, and Sandyford — who make up
          an unusually large proportion of Newcastle's private rental market — should be
          particularly aware of these rights given the age and condition of much of the local stock.
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
                an EICR or has not completed required remedial work, report this to Newcastle City
                Council's housing enforcement team. The council has the power to investigate and
                take enforcement action including civil penalties against the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies urgent safety
                issues (C1 or C2 observations), the landlord must arrange remedial work promptly. If
                the landlord fails to act, the council can arrange for the work to be done. The
                tenant should not be charged for any remedial work.
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
          Newcastle tenants can contact Newcastle City Council's housing team, Shelter, or Citizens
          Advice for guidance. Newcastle University and Northumbria University both provide
          accommodation advice services for students experiencing problems with private rented
          housing.
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
          landlord is legally required to complete remedial work within strict timescales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — the landlord must ensure all remedial work is
                completed within 28 days of the EICR, unless the inspector specifies a shorter
                timeframe. The 28-day clock starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — where a C1 (danger present)
                observation is recorded, the inspector may recommend immediate disconnection of the
                affected circuit. Landlords should arrange emergency remedial work as soon as
                possible, not wait the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, the landlord
                must obtain written confirmation from a qualified person that the work has been done
                satisfactorily. This must be provided to the tenant and to Newcastle City Council
                within 28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Newcastle remedial work</strong> — typical remedial work in Newcastle
                rental properties includes fitting RCD protection (Regulation 411.3.3), replacing
                rubber-insulated wiring in Tyneside flats, upgrading outdated consumer units,
                addressing TN-S earthing deficiencies, adding supplementary bonding in bathrooms,
                and remedying overloaded circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Newcastle landlords should establish a relationship with a reliable local electrician who
          can respond promptly when remedial work is needed. Delays in completing remedial work are
          a separate breach of the regulations.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Newcastle',
    content: (
      <>
        <p>
          Newcastle and the wider North East has a well-established electrical contracting sector.
          However, not all electricians are equally experienced in inspection and testing —
          particularly in the older Tyneside flat and Victorian terrace stock that dominates the
          local rental market. Landlords should verify qualifications and experience before
          commissioning an EICR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for Newcastle-based inspectors. Registration provides assurance of
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with Tyneside flats and Victorian terraces in
                Heaton, Byker, and Jesmond is particularly important given the rubber-insulated
                wiring and TN-S earthing arrangements commonly found.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Powergrid familiarity</strong> — Northern Powergrid is the
                Distribution Network Operator (DNO) serving Newcastle. Inspectors should be familiar
                with Northern Powergrid supply arrangements and earthing systems, as PME and TN-S
                configurations each have different bonding requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid suspiciously cheap quotes</strong> — a thorough EICR for a Newcastle
                two-bedroom terraced house takes 2 to 4 hours and requires calibrated test
                instruments. Quotes significantly below £180 should raise concerns about the quality
                and thoroughness of the inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Newcastle (2026 Prices)',
    content: (
      <>
        <p>
          Newcastle EICR costs run slightly below London rates but above the national average,
          reflecting strong demand from the student HMO market and the additional inspection time
          required by the city's older housing stock. Tyneside flats and Victorian terraces with
          non-standard wiring routinely take longer to inspect thoroughly than modern builds, which
          is reflected in pricing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat (including Tyneside flat lower/upper)</strong> — £180 to
                £240. Shared consumer units or TN-S earthing in Tyneside flats can add time and
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £220 to £320. Common in Heaton and
                Sandyford. Victorian properties with original wiring take longer to inspect and may
                command higher fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £280 to £450. Properties in Jesmond,
                Gosforth, and Fenham vary widely depending on age, wiring condition, and number of
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO</strong> — £380 to £700+. Multiple consumer units, fire alarm
                systems, emergency lighting, and communal circuits increase inspection scope and
                time significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Some Newcastle electricians offer combined EICR and
          remedial packages, which can save landlords time and reduce overall costs.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Newcastle',
    content: (
      <>
        <p>
          Newcastle's private rented sector — driven by two major universities and one of the UK's
          largest student HMO concentrations in Jesmond, Heaton, and Sandyford — creates consistent
          year-round demand for landlord EICRs. The prevalence of Tyneside flats and Victorian
          terraces means many properties have rubber-insulated wiring or TN-S earthing issues,
          making C2 findings — and the remedial work that follows — very common. Electricians who
          build relationships with local letting agents and landlord portfolios can develop a
          sustainable stream of inspection, testing, and remedial work.
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
                  When C1 or C2 observations are found, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — the electrician who quotes on the day of the
                  EICR wins the work.
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

export default function LandlordElectricalSafetyNewcastlePage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Newcastle | EICR for Landlords Newcastle"
      description="Landlord electrical safety requirements in Newcastle upon Tyne. 2020 Regulations explained, Newcastle City Council enforcement, HMO requirements for student properties, Tyneside flat wiring issues, Northern Powergrid earthing, penalties up to £30,000, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Newcastle:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Newcastle landlords need to know about electrical safety compliance — the 2020 Regulations, Newcastle City Council enforcement, HMO requirements in Jesmond, Heaton, and Sandyford, Tyneside flat wiring issues, penalties of up to £30,000, tenant rights, and EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
