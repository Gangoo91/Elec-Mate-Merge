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
  {
    label: 'Landlord Electrical Safety Southampton',
    href: '/landlord-electrical-safety-southampton',
  },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'southampton-enforcement', label: 'Southampton Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Southampton' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Southampton to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Southampton City Council is the local housing authority responsible for enforcing the 2020 Regulations. Landlords in breach face civil penalties of up to £30,000 per breach.',
  'Southampton has a substantial student rental market centred on Portswood and Swaythling, driven by the University of Southampton and Southampton Solent University. HMOs in these areas face mandatory licensing and EICR compliance obligations.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'RCD protection is required on socket-outlet circuits under Regulation 411.3.3 of BS 7671. Many older Southampton terraced rental properties in Portswood and St Denys lack RCD protection, making C2 findings common in periodic inspections.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Southampton?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Southampton. Landlords must have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Southampton City Council within seven days if requested. The council can impose civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'Does Southampton City Council actively enforce landlord electrical safety?',
    answer:
      'Yes. Southampton City Council operates a private rented sector enforcement team that investigates tenant complaints and carries out proactive inspections, particularly in areas with high concentrations of student HMOs such as Portswood, Swaythling, and St Denys. The council operates mandatory HMO licensing and additional licensing in designated areas. Landlords operating unlicensed HMOs face prosecution as well as civil penalties.',
  },
  {
    question: 'What happens if my Southampton rental property fails the EICR?',
    answer:
      'An EICR is assessed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. The work must be carried out by a qualified electrician and confirmed in writing. Failure to complete remedial work is a separate breach that can attract its own civil penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my Southampton student HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of both mandatory HMO licensing (properties with five or more occupants in two or more households) and any additional licensing schemes operated by Southampton City Council. Student HMOs in Portswood and Swaythling are subject to active licensing enforcement. Many Southampton HMO licence conditions specify EICR inspection intervals shorter than five years.',
  },
  {
    question: 'How much does a landlord EICR cost in Southampton?',
    answer:
      'Southampton EICR costs are broadly in line with the national average for English cities outside London, with some upward pressure from proximity to the South East. A one-bedroom flat typically costs £150 to £230, a two-bedroom house £200 to £320, a three-bedroom terraced house £260 to £420, and a student HMO £380 to £680 or more depending on the number of consumer units and circuits.',
  },
  {
    question: 'Can a Southampton tenant request an electrical safety check?',
    answer:
      "Yes. Tenants have the right to request a copy of the current EICR from their landlord. If the landlord cannot provide one, the tenant can report this to Southampton City Council's housing enforcement team, which can require the landlord to arrange an inspection. If the landlord fails to comply with a remedial notice, the council can arrange for the work to be done and recover costs from the landlord.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Southampton?',
    answer:
      'For landlord compliance, the inspector must be a qualified and competent person. In practice this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA, holding City and Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification (C&G 2382). They should also carry professional indemnity insurance.',
  },
  {
    question: 'Are older Southampton terraced houses more likely to fail an EICR?',
    answer:
      'Yes. Many rental properties in Portswood, St Denys, and Shirley are Victorian or Edwardian terraced houses with ageing electrical installations. Common findings include absence of RCD protection (a C2 under Regulation 411.3.3 of BS 7671), deteriorated rubber or fabric insulation, inadequate earthing and bonding, and overloaded circuits. Southampton landlords acquiring older properties should budget for potential remedial work following the first EICR.',
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
          are the primary legislation governing landlord electrical safety obligations in
          Southampton. These regulations came into force on 1 June 2020 for new tenancies and 1
          April 2021 for all existing tenancies. Every private landlord in Southampton must comply.
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
                EICR to Southampton City Council within seven days if requested.
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
          regulated tenancies in England. They do not apply to social housing or lodger arrangements
          where the landlord lives in the same property.
        </p>
      </>
    ),
  },
  {
    id: 'southampton-enforcement',
    heading: 'Southampton City Council Enforcement',
    content: (
      <>
        <p>
          Southampton City Council is the local housing authority responsible for enforcing the 2020
          Regulations across Southampton. The council's housing enforcement team investigates tenant
          complaints and carries out proactive inspections, particularly in areas with high
          concentrations of HMOs serving Southampton's large student population.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student rental hotspots</strong> — Portswood, Swaythling, St Denys, and
                Shirley have large concentrations of student rental properties and HMOs. The council
                enforcement team is active in these areas, and landlords operating unlicensed HMOs
                face prosecution as well as civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Southampton City Council operates mandatory HMO
                licensing for properties with five or more occupants in two or more households. A
                valid EICR is a condition of the licence. The council also has powers to operate
                additional licensing in designated areas covering smaller HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven enforcement</strong> — when tenants report absent or
                out-of-date EICRs, the council triggers formal enforcement action. The council can
                require the landlord to provide the EICR, issue a remedial notice where problems are
                found, and impose a civil penalty for non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action powers</strong> — if a landlord fails to comply with a
                remedial notice, Southampton City Council can arrange for the work to be carried out
                and recover costs from the landlord in addition to imposing a civil penalty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Southampton landlords with properties that cross into Eastleigh or Test Valley boroughs
          should note that those council areas are separately enforced. Compliance in Southampton
          does not cover neighbouring authority areas.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Southampton',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) in Southampton face additional electrical safety
          requirements beyond the standard 2020 Regulations. Southampton is home to the University
          of Southampton and Southampton Solent University, creating strong demand for shared
          housing particularly in Portswood and Swaythling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a condition of the
                licence, covering all fixed electrical installations including communal areas, fire
                alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter inspection intervals</strong> — many Southampton HMO licence
                conditions require EICRs at intervals shorter than the standard five years. Check
                your specific licence conditions carefully and diarise renewal dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety integration</strong> — HMO fire alarm systems and emergency
                lighting are part of the fixed electrical installation and must be tested as part of
                the EICR. Grade D LD2 interlinked systems are typically required in Southampton
                HMOs, with Grade A systems required for larger or higher-risk properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket-outlet circuits rated up to 32A. Many older Southampton
                terraced HMOs lack this protection, making C2 findings very common during first
                inspections of older Portswood properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Southampton is a criminal offence. Southampton City Council
          has been active in pursuing unlicensed HMO operators, and prosecution in the Magistrates'
          Court can result in an unlimited fine in addition to civil penalties.
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
          The 2020 Regulations give Southampton City Council the power to impose civil penalties for
          non-compliance. The maximum penalty is £30,000 per breach, and each failure to comply
          constitutes a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to Southampton City Council on
                request, and failing to complete remedial work are each separate breaches. Multiple
                failures can result in cumulative penalties well in excess of £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offences</strong> — local authorities can impose higher penalties for
                repeat non-compliance. Southampton City Council maintains records of previous
                breaches and may escalate penalties for landlords with a history of non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice if they have not provided the tenant with a copy of the
                current EICR. This is a significant practical consequence for Southampton landlords
                seeking possession of their property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial cost recovery</strong> — if a landlord fails to complete remedial
                work following a remedial notice, the council can arrange for the work to be done
                and recover the full cost from the landlord in addition to imposing a financial
                penalty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of a five-yearly EICR is a fraction of the potential penalties. Southampton
          landlords should treat EICR renewals as a routine operating cost and maintain records of
          every inspection and remedial work completion.
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
          The 2020 Regulations give tenants in Southampton specific rights regarding electrical
          safety. Students — who form a large proportion of Southampton's rental market — should be
          particularly aware of these rights when signing tenancy agreements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a copy
                within 28 days of the inspection. New tenants must receive a copy before moving in.
                Request it in writing from your landlord or letting agent if you have not received
                one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your landlord has not obtained
                an EICR or has not completed required remedial work, report this to Southampton City
                Council's housing enforcement team. The council has the power to investigate and
                take enforcement action including civil penalties against the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies urgent safety
                issues (C1 or C2 observations), the landlord must arrange remedial work promptly. If
                the landlord fails to act, the council can arrange for the work to be done. Tenants
                must not be charged for any remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015 also
                provides protection from retaliatory eviction where a tenant has raised a legitimate
                complaint about property conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Southampton tenants can contact Southampton City Council's housing team, Shelter, or
          Citizens Advice for guidance. The University of Southampton and Southampton Solent
          University both provide accommodation advice services for students experiencing problems
          with private rented housing.
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
                possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, the landlord
                must obtain written confirmation from a qualified person that the work has been done
                satisfactorily. This must be provided to the tenant and to Southampton City Council
                within 28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Southampton remedial work</strong> — typical remedial work in
                Southampton rental properties includes fitting RCD protection (Regulation 411.3.3),
                replacing deteriorated consumer units in older terraced properties, upgrading
                earthing and bonding, and addressing overloaded circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Southampton landlords should establish a relationship with a reliable local electrician
          who can respond promptly when remedial work is needed. Delays in completing remedial work
          are a separate breach of the regulations and can attract their own penalty.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Southampton',
    content: (
      <>
        <p>
          Southampton and the wider Hampshire area have a well-established electrical contracting
          sector. Landlords should verify qualifications and registration before commissioning an
          EICR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for Southampton-based inspectors. Registration provides assurance
                of qualifications, insurance, and regular assessment by the scheme body.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with older terraced properties common in
                Portswood and St Denys is important.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — verify that the inspector carries professional
                indemnity insurance. This is a requirement of competent person scheme membership and
                protects both parties if an error is made on the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid suspiciously cheap quotes</strong> — a thorough EICR for a Southampton
                property takes 2 to 4 hours and requires calibrated test instruments. Quotes
                significantly below £150 should raise concerns about the thoroughness of the
                inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Southampton (2026 Prices)',
    content: (
      <>
        <p>
          Southampton EICR costs are slightly above the national average for English provincial
          cities, reflecting the city's proximity to the South East and the mix of terraced houses,
          converted flats, and purpose-built student accommodation in the local rental stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £230. Typically 3 to 5 circuits with a
                single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom house</strong> — £200 to £320. Common in Portswood and St Denys.
                Older terraced houses may take longer due to non-standard wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £260 to £420. Victorian and
                Edwardian properties with ageing wiring installations often require more time for
                thorough testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO</strong> — £380 to £680+. Multiple consumer units, fire alarm
                systems, and emergency lighting increase inspection scope and time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Some Southampton electricians offer combined EICR
          and remedial packages, which can save landlords time and reduce overall costs.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Southampton',
    content: (
      <>
        <p>
          Southampton's private rented sector — with its large student population and concentration
          of older terraced housing — creates strong demand for landlord EICRs. Electricians who
          build relationships with Southampton letting agents and student landlord portfolios can
          develop a reliable stream of inspection and testing work throughout the year.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
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

export default function LandlordElectricalSafetySouthamptonPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Southampton | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Southampton. 2020 Regulations explained, Southampton City Council enforcement, HMO requirements for student properties, penalties up to £30,000, tenant rights, remedial timescales, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Southampton:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Southampton landlords need to know about electrical safety compliance — the 2020 Regulations, Southampton City Council enforcement, HMO requirements for student properties, penalties of up to £30,000, tenant rights, and EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
